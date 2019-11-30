var mingtian = new Date();
mingtian.setDate(mingtian.getDate() + 1);
var V_GUID = "";
var zyStoreload = false;
var dt = new Date();
var thisYear = dt.getFullYear();
var tomorrowYear = dt.getFullYear() + 1;
var years = [];
for (var i = 2012; i <= tomorrowYear; i++)
    years.push({
        displayField: i,
        valueField: i
    });
var v_workorder_guid = '';
var pername = "";
if (location.href.split('?')[1] != undefined) {
    v_workorder_guid = Ext.urlDecode(location.href.split('?')[1]).v_workorder_guid;
    // pername = Ext.urlDecode(location.href.split("?")[1]).v_pername;
}
var stateData = [{displayField: '全部', valueField: '%'}, {displayField: '编辑', valueField: '编辑'}, {
    displayField: '审批中',
    valueField: '审批中'
}, {displayField: '审批通过', valueField: '审批通过'}, {displayField: '审批驳回', valueField: '审批驳回'}];

Ext.define('Ext.ux.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    async: true,
    doRequest: function (operation, callback, scope) {
        var writer = this.getWriter(),
            request = this.buildRequest(operation);
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        Ext.apply(request, {
            async: this.async,
            binary: this.binary,
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, callback, scope),
            method: this.getMethod(request),
            disableCaching: false
        });
        Ext.Ajax.request(request);
        return request;
    }
});

Ext.onReady(function () {
    Ext.QuickTips.init();
    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果

    var sqxzt = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'sqxzt',
        fields: ['I_ID',
            'V_SOURCECODE',
            'V_SOURCENAME',
            'V_SOURCETABLE',
            'V_SOURCEREMARK',
            'I_ORDER'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'qx/PRO_PM_07_DEFECT_SOURCE_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        },
        listeners: {
            load: function (store, records) {
                Ext.ComponentManager.get("qxzt").store.insert(0, {
                    'V_SOURCECODE': '%',
                    'V_SOURCENAME': '全部'
                });
                Ext.getCmp('qxzt').select('%');
                zyStoreload = true;
                _init();
                _selectOverhaulApply2();
            }
        }
    });
    // sqxzt.on('load', function () {
    //     Ext.ComponentManager.get("qxzt").store.insert(0, {
    //         'V_SOURCECODE': '%',
    //         'V_SOURCENAME': '全部'
    //     })
    // });
    // Ext.getCmp('qxzt').select(sqxzt.getAt(0));

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 50,
        autoLoad: false,
        fields: ['D_DEFECTDATE', 'V_DEFECTLIST', 'V_EQUNAME', 'V_DEPTCODE',
            'V_EQUSITE', 'V_DEPTNAME', 'V_PERNAME', 'V_IDEA',
            'V_STATENAME', 'V_SOURCENAME', 'V_SOURCEID',
            'D_INDATE', 'V_PERCODE', 'V_GUID', 'V_STATECODE',
            'V_STATECOLOR', 'V_ORDERID', 'V_EQUTYPECODE', 'V_SOURCECODE',
            'D_BE_SJ', 'D_EN_SJ', 'V_SOURCE_GRADE', 'WBSCODE', 'WBSNAME'],

        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'cjy/PRO_PM_07_DEFECT_VIEW_BYROLE2',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        }
    });
    var defectGridStore = Ext.create('Ext.data.Store', {
        id: 'defectGridStore',
        pageSize: 50,
        autoLoad: false,
        fields: ['D_DEFECTDATE', 'V_DEFECTLIST', 'V_EQUNAME', 'V_DEPTCODE',
            'V_EQUSITE', 'V_DEPTNAME', 'V_PERNAME', 'V_IDEA',
            'V_STATENAME', 'V_SOURCENAME', 'V_SOURCEID',
            'D_INDATE', 'V_PERCODE', 'V_GUID', 'V_STATECODE',
            'V_STATECOLOR', 'V_ORDERID', 'V_EQUTYPECODE', 'V_SOURCECODE',
            'D_BE_SJ', 'D_EN_SJ', 'V_SOURCE_GRADE', 'WBSCODE', 'WBSNAME'],

        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PRO_PM_DEFECT_SEL_FROM_WORK',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        }
    });
    // Ext.data.StoreManager.lookup('gridStore').load({
    //     params:{
    //         V_V_STATECODE: Ext.ComponentManager.get("qxzt").getValue(),
    //         X_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
    //         PUT_PERNAME:"",
    //         V_V_PAGE: Ext.getCmp('page').store.currentPage,
    //         V_V_PAGESIZE: Ext.getCmp('page').store.pageSize,
    //         V_SIGN:0
    //     }
    // });
    var inputPanel = Ext.create('Ext.Panel', {
        id: 'inputPanel',
        border: true,
        title: '关联缺陷',
        frame: true,
        layout: 'column',
        defaults: {
            labelAlign: 'right',
            //labelWidth : 100,
            //inputWidth : 240,
            margin: '4,0,0,0'
        },
        items: [{
            id: 'qxzt',
            xtype: 'combo',
            store: sqxzt,
            editable: false,
            fieldLabel: '缺陷类型',
            labelWidth: 70,
            width: 180,
            displayField: 'V_SOURCENAME',
            valueField: 'V_SOURCECODE',
            queryMode: 'local',
            baseCls: 'margin-bottom'
            , listeners: {
                select: function (field, newValue, oldValue) {
                    _selectOverhaulApply2();
                }
            }
        }, {
            xtype: 'textfield',
            id: 'fzr2',
            fieldLabel: "人员名",
            allowBlank: true,
            labelWidth: 70,
            value: pername,//Ext.util.Cookies.get('v_personname'),
            width: 180
            , listeners: {
                renderer: function (e) {
                    var keynum;
                    if (window.event) // IE
                    {
                        keynum = e.keyCode;
                    } else if (e.which) // Netscape/Firefox/Opera
                    {
                        keynum = e.which;
                    }
                    if (keynum == 13) {
                        _selectOverhaulApply2();
                    }
                }
            }
        },
            {
                xtype: 'button',
                text: '查询',
                icon: imgpath + '/search.png',
                handler: _selectOverhaulApply2
            },{
                xtype: 'button',
                text: '关联缺陷',
                icon: imgpath + '/add.png',
                handler: saveDefaut
            }/*, {
                xtype: 'button',
                text: '生成工单',
                icon: imgpath + '/accordion_collapse.png',
                handler: createWorkorder
            }, {
                xtype: 'button',
                text: '缺陷修改',
                icon: imgpath + '/edit.png',
                handler: updateDefData
            }, {
                xtype: 'button',
                text: '缺陷导出',
                icon: imgpath + '/edit.png',
                handler: expExcelDefData
            }*/
        ]
    });

    var overhaulApplyPanel = Ext.create('Ext.grid.Panel', {
        id: 'overhaulApplyPanel',
        store: gridStore,
        frame: true,
        border: false,
        columnLines: true,
        /*selModel : {
         selType : 'checkboxmodel',
         mode : 'SINGLE'
         },*/
        selType: 'checkboxmodel',
        columns: [{
            text: '序号',
            xtype: 'rownumberer',
            width: 50,
            sortable: false
        },{
            text: 'WBS编码',
            dataIndex: 'WBSCODE',
            align: 'center',
            width: 160,
            renderer: CreateGridColumnTd
        }, {
            text: '维修工程项目名称',//WBS名称',
            dataIndex: 'WBSNAME',
            align: 'center',
            width: 180,
            renderer: CreateGridColumnTd
        },
           {
                text: '设备名称',
                dataIndex: 'V_EQUNAME',
                align: 'center',
                width: 160,
                renderer: CreateGridColumnTd
            }, {
                text: '缺陷状态',
                dataIndex: 'V_STATENAME',
                align: 'center',
                width: 70,
                renderer: CreateGridColumnTd
            }, {
                text: '缺陷日期',
                dataIndex: 'D_DEFECTDATE',
                align: 'center',
                width: 180,
                renderer: CreateGridColumnTime
            }, {
                text: '缺陷等级',
                dataIndex: 'V_SOURCE_GRADE',
                align: 'center',
                width: 60,
                renderer: AtRight
            }, {
                text: '缺陷明细',
                dataIndex: 'V_DEFECTLIST',
                align: 'center',
                width: 300,
                renderer: CreateGridColumnTd
            }, {
                text: '处理意见',
                dataIndex: 'V_IDEA',
                align: 'center',
                width: 200,
                renderer: CreateGridColumnTd
            }, {
                text: '作业区',
                dataIndex: 'V_DEPTNAME',
                align: 'center',
                width: 100,
                renderer: CreateGridColumnTd
            }, {
                text: '缺陷类型',
                dataIndex: 'V_SOURCENAME',
                align: 'center',
                width: 100,
                renderer: CreateGridColumnTd
            }, {
                text: '负责人',
                dataIndex: 'V_PERNAME',
                align: 'center',
                width: 100,
                renderer: CreateGridColumnTd
            }
            , {
                text: '作业区编码',
                dataIndex: 'V_DEPTCODE',
                align: 'center',
                width: 100,
                hidden: true,
                renderer: CreateGridColumnTd
            }
        ],
        listeners: {
            itemdblclick: itemclick
        },
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });
    var defectPanel = Ext.create('Ext.grid.Panel', {
        id: 'defectPanel',
        store: defectGridStore,
        frame: true,
        border: false,
        columnLines: true,
        height:300,
        title:'已关联的缺陷',
        /*selModel : {
         selType : 'checkboxmodel',
         mode : 'SINGLE'
         },*/
        selType: 'checkboxmodel',
        columns: [{
            text: '序号',
            xtype: 'rownumberer',
            width: 50,
            sortable: false
        },{
            text: 'WBS编码',
            dataIndex: 'WBSCODE',
            align: 'center',
            width: 160,
            renderer: CreateGridColumnTd
        }, {
            text: '维修工程项目名称',//WBS名称',
            dataIndex: 'WBSNAME',
            align: 'center',
            width: 180,
            renderer: CreateGridColumnTd
        },
            {
                text: '设备名称',
                dataIndex: 'V_EQUNAME',
                align: 'center',
                width: 160,
                renderer: CreateGridColumnTd
            }, {
                text: '缺陷状态',
                dataIndex: 'V_STATENAME',
                align: 'center',
                width: 70,
                renderer: CreateGridColumnTd
            }, {
                text: '缺陷日期',
                dataIndex: 'D_DEFECTDATE',
                align: 'center',
                width: 180,
                renderer: CreateGridColumnTime
            }, {
                text: '缺陷等级',
                dataIndex: 'V_SOURCE_GRADE',
                align: 'center',
                width: 60,
                renderer: AtRight
            }, {
                text: '缺陷明细',
                dataIndex: 'V_DEFECTLIST',
                align: 'center',
                width: 300,
                renderer: CreateGridColumnTd
            }, {
                text: '处理意见',
                dataIndex: 'V_IDEA',
                align: 'center',
                width: 200,
                renderer: CreateGridColumnTd
            }, {
                text: '作业区',
                dataIndex: 'V_DEPTNAME',
                align: 'center',
                width: 100,
                renderer: CreateGridColumnTd
            }, {
                text: '缺陷类型',
                dataIndex: 'V_SOURCENAME',
                align: 'center',
                width: 100,
                renderer: CreateGridColumnTd
            }, {
                text: '负责人',
                dataIndex: 'V_PERNAME',
                align: 'center',
                width: 100,
                renderer: CreateGridColumnTd
            }
            , {
                text: '作业区编码',
                dataIndex: 'V_DEPTCODE',
                align: 'center',
                width: 100,
                hidden: true,
                renderer: CreateGridColumnTd
            }
        ],
        /*listeners: {
            itemdblclick: itemclick
        },*/
        bbar: [{
            id: 'page2',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'defectGridStore'
        }]
    });
    Ext.create('Ext.container.Viewport', {
        layout: {
            type: 'border',
            regionWeights: {
                west: -1,
                north: 1,
                south: 1,
                east: -1
            }
        },
        items: [{
            region: 'north',
            border: false,
            items: [inputPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [overhaulApplyPanel]
        }, {
            region: 'south',
            layout: 'fit',
            border: false,
            items: [defectPanel]
        }]
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_V_STATECODE: Ext.ComponentManager.get("qxzt").getValue(),
            X_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            PUT_PERNAME: Ext.getCmp('fzr2').getValue() == "" ? "%" : Ext.getCmp("fzr2").getValue().toString(),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize,
            V_SIGN: 1
        }
    });
    Ext.data.StoreManager.lookup('defectGridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_WORK_GUID: v_workorder_guid

        }
    });
    _init();
    // _selectOverhaulApply();

});

function _init() {
    if (zyStoreload) {
        zyStoreload = false;
        _selectDefect()
        Ext.getBody().unmask();//去除页面笼罩
    }
}


function _selectOverhaulApply2() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    Ext.getCmp('page').store.currentPage = 1;
    gridStore.proxy.extraParams = {
        V_V_STATECODE: Ext.ComponentManager.get("qxzt").getValue(),
        X_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        PUT_PERNAME: Ext.getCmp('fzr2').getValue() == "" ? "%" : Ext.getCmp("fzr2").getValue().toString(),//"",
        V_V_PAGE: Ext.getCmp('page').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('page').store.pageSize,
        V_SIGN: 0

    };
    gridStore.load();
}

function _selectDefect() {
    var defectGridStore = Ext.data.StoreManager.lookup('defectGridStore');
    Ext.getCmp('page').store.currentPage = 1;
    defectGridStore.proxy.extraParams = {
        V_WORK_GUID: v_workorder_guid
    };
    defectGridStore.load();
}



function saveDefaut() {
    var seldata = Ext.getCmp('overhaulApplyPanel').getSelectionModel().getSelection();
    if (seldata.length == 0) {
        Ext.Msg.alert('操作提示', '请选择一条数据！');
        return false;
    }

    /*  if (Ext.getCmp('qxzt').getValue() == 'defct02') {
          if (seldata.length != '1') {
              alert('请选择1条专业点检缺陷进行处理');
              return;
          } else {


              Ext.Ajax.request({
                  url: AppUrl + 'cjy/PRO_PM_WORKORDER_SELBYDEFECT',
                  method: 'POST',
                  async: false,
                  params: {
                      V_DEFECT_GUID: seldata[0].data.V_GUID
                  },
                  success: function (resp) {
                      var resp = Ext.decode(resp.responseText);
                      if (resp.list.length > 0) {
                          var V_ORDERGUID = resp.list[0].V_ORDERGUID;
                          var V_EQUTYPECODE = seldata[0].raw.V_EQUTYPECODE;
                          var V_SOURCECODE = seldata[0].raw.V_SOURCECODE;
                          var owidth = window.document.body.offsetWidth - 500;
                          var oheight = window.document.body.offsetHeight - 500;

                           window.open(AppUrl + 'page/PM_090201/index.html?V_GUID=' + V_ORDERGUID +
                              '&V_EQUTYPECODE=' + V_EQUTYPECODE +
                              "&V_SOURCECODE=" + V_SOURCECODE , '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
                      } else {
                          alert('创建工单失败');
                      }
                  }
              });
          }
      } else {*/
    var D_BE_SJ = seldata[0].data.D_BE_SJ;
    var D_EN_SJ = seldata[0].data.D_EN_SJ;
    var V_GUIDList = '';
    var wbs = "";

    var defectwbs="";
    var defectEquname="";
    var defectStore=Ext.getCmp('defectPanel').getStore();
    var defectCount=defectStore.getCount();
    if(defectCount>0){
        defectwbs=defectStore.getAt(0).get('WBSCODE');
        defectEquname=defectStore.getAt(0).get('V_EQUNAME');
    }

    for (var z = 0; z < seldata.length; z++) {

        if (seldata[z].data.WBSCODE != '') {
            if (wbs == '') {
                wbs = seldata[z].data.WBSCODE;
            } else {

                if (defectCount>0&&defectwbs != seldata[z].data.WBSCODE) {
                    alert("请选择同一WBS编码计划进行操作")
                    return;
                }

                if (wbs != seldata[z].data.WBSCODE) {
                    alert("请选择同一WBS编码计划进行操作")
                    return;
                }
            }
        }
    }

    for (var j = 0; j < seldata.length; j++) {

        if (defectCount>0&&defectEquname != seldata[j].data.V_EQUNAME) {
            alert("请选择同一设备缺陷");
            return;
        }
        if (seldata[0].data.V_EQUNAME != seldata[j].data.V_EQUNAME) {
            alert("请选择同一设备缺陷");
            return;
        }
        if (j == 0) {
            V_GUIDList = seldata[j].data.V_GUID;
        } else {
            V_GUIDList += ',' + seldata[j].data.V_GUID;
        }
    }

    Ext.Ajax.request({
        url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SET_WD',
        method: 'POST',
        async: false,
        params: {
            V_V_DEFECT_GUID: V_GUIDList,
            V_V_WORKORDER_GUID: v_workorder_guid
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.list.length > 0) {


            } else {
                alert('创建工单失败');
            }
        }
    });
    //}
}

function CreateGridColumnTime(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;color:" + store.getAt(rowIndex).get('V_STATECOLOR');
    var time = value.split('.')[0];
    //return time;
    return '<div data-qtip="' + time + '" >' + time + '</div>';
}

function AtRight(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;color:" + store.getAt(rowIndex).get('V_STATECOLOR');
    var time = value.split('.')[0];
    //return time;
    return '<div data-qtip="' + time + '" >' + time + '</div>';
}


function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;color:" + store.getAt(rowIndex).get('V_STATECOLOR');
    if (value == null) {
        return '<div data-qtip="' + value + '" ></div>';
    }
    else {
        return '<div data-qtip="' + value + '" >' + value + '</div>';
    }
}

function ReadGD(value, metaData) {
    if (Ext.getCmp('tabid').getValue() == 'defct01') {

        Ext.getCmp('gdh').show();
        return '<div><a href="javascript:OnClickGD(\'' + value + '\')">' + value + '</a></div>';
    } else {
        Ext.getCmp('gdh').hide();
    }
}

function itemclick(s, record, item, index, e, eOpts) {
    //window.showModalDialog(AppUrl + "/No210302/Index.html?v_guid="
    //    + Ext.getStore("gridStore").getAt(index).get("V_GUID"), "",
    //    "dialogHeight:600px;dialogWidth:700px");
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + "page/PM_070301/index1.html?v_guid="
        + Ext.getStore("gridStore").getAt(index).get("V_GUID"), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

}

function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}



function getSel() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    Ext.getCmp('page').store.currentPage = 1;
    gridStore.proxy.extraParams = {
        V_V_STATECODE: Ext.ComponentManager.get("qxzt").getValue(),
        X_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        PUT_PERNAME: Ext.getCmp('fzr2').getValue() == "0" ? "%" : Ext.getCmp("fzr2").getValue().toString(),
        V_V_PAGE: Ext.getCmp('page').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('page').store.pageSize,
        V_SIGN: 1
    };
    gridStore.load();
}
