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
var url_guid = '';
var pername="";
if (location.href.split('?')[1] != undefined) {
    url_guid = Ext.urlDecode(location.href.split('?')[1]).v_guid_dx;
    pername=Ext.urlDecode(location.href.split("?")[1]).v_pername;
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
                _selectOverhaulApply();
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
        fields: ['D_DEFECTDATE', 'V_DEFECTLIST', 'V_EQUNAME','V_DEPTCODE',
            'V_EQUSITE', 'V_DEPTNAME', 'V_PERNAME', 'V_IDEA',
            'V_STATENAME', 'V_SOURCENAME', 'V_SOURCEID',
            'D_INDATE', 'V_PERCODE', 'V_GUID', 'V_STATECODE',
            'V_STATECOLOR', 'V_ORDERID', 'V_EQUTYPECODE', 'V_SOURCECODE',
            'D_BE_SJ', 'D_EN_SJ','V_SOURCE_GRADE','WBSCODE','WBSNAME'],

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
        title: '缺陷处理',
        titleAlign: 'center',
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
            ,listeners: {
                select: function (field, newValue, oldValue) {
                    _selectOverhaulApply2();
                }
            }
        }, {xtype:'textfield',
            id:'fzr2',
            fieldLabel:"人员岗位",
            allowBlank:true,
            labelWidth: 70,
            value:pername,//Ext.util.Cookies.get('v_personname'),
            width:180
            ,listeners: {
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
        }, {
            xtype: 'button',
            text: '生成工单',
            icon: imgpath + '/accordion_collapse.png',
            handler: createWorkorder
        },{
                xtype: 'button',
                text: '缺陷修改',
                icon: imgpath + '/edit.png',
                handler: updateDefData
            },{
                xtype: 'button',
                text: '缺陷导出',
                icon: imgpath + '/edit.png',
                handler: expExcelDefData
            }
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
        },
           /* {
            text: '手工消缺',
            id: 'sgxq',
            xtype: 'templatecolumn',
            align: 'center',
            width: 100,
            hidden:true,
            tpl: '<a href="#" onClick="OnBtnSxQx()">手工消缺</a>'
        }, */
            {
            text: 'WBS编码',
            dataIndex: 'WBSCODE',
            align: 'center',
            width: 160,
            renderer: CreateGridColumnTd
        },{
            text: '维修工程项目名称',//WBS名称',
            dataIndex: 'WBSNAME',
            align: 'center',
            width: 180,
            renderer: CreateGridColumnTd
        },{
            text: '设备名称',
            dataIndex: 'V_EQUNAME',
            align: 'center',
            width: 160,
            renderer: CreateGridColumnTd
        },  {
            text: '缺陷状态',
            dataIndex: 'V_STATENAME',
            align: 'center',
            width: 70,
            renderer: CreateGridColumnTd
        },  {
            text: '缺陷日期',
            dataIndex: 'D_DEFECTDATE',
            align: 'center',
            width: 180,
            renderer: CreateGridColumnTime
        }, {
            text:'缺陷等级',
            dataIndex:'V_SOURCE_GRADE',
            align:'center',
            width:60,
            renderer:AtRight
        },{
            text: '缺陷明细',
            dataIndex: 'V_DEFECTLIST',
            align: 'center',
            width: 300,
            renderer: CreateGridColumnTd
        }, {
            text: '处理意见',
            dataIndex: 'V_IDEA',
            align: 'center',
            width:200,
            renderer: CreateGridColumnTd
        }, {
            text: '作业区',
            dataIndex: 'V_DEPTNAME',
            align: 'center',
            width: 100,
            renderer: CreateGridColumnTd
        },{
            text: '缺陷类型',
            dataIndex: 'V_SOURCENAME',
            align: 'center',
            width: 100,
            renderer: CreateGridColumnTd
        },  {
            text: '负责人',
            dataIndex: 'V_PERNAME',
            align: 'center',
            width: 100,
            renderer: CreateGridColumnTd
        }
            ,  {
                text: '作业区编码',
                dataIndex: 'V_DEPTCODE',
                align: 'center',
                width: 100,
                hidden:true,
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
        }]
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_V_STATECODE: Ext.ComponentManager.get("qxzt").getValue(),
            X_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            PUT_PERNAME:Ext.getCmp('fzr').getValue()==""?"%":Ext.getCmp("fzr").getValue().toString(),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize,
            V_SIGN:1
        }
    });

    _init()
    // _selectOverhaulApply();

    var windowEqu = Ext.create('Ext.window.Window', {
        id: 'windowEqu',
        width: 400,
        height: 500,
        title: '手工消缺',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        region: 'center',
        layout: 'vbox',
        items:[{
            xtype: 'textfield',
            id: 'qxly',
            fieldLabel: '缺陷来源',
            margin: '5 0 2 10',
            labelWidth: 80,
            labelAlign: 'right',
            width: 300
        }, {
            xtype: 'textfield',
            id: 'qxrq',
            fieldLabel: '缺陷日期',
            margin: '5 0 2 10',
            labelWidth: 80,
            labelAlign: 'right',
            width: 300
        },{
            xtype: 'textfield',
            id: 'fzr',
            fieldLabel: '负责人姓名',
            margin: '5 0 2 10',
            labelWidth: 80,
            labelAlign: 'right',
            width: 300
        },{
            xtype: 'textfield',
            id: 'dw',
            fieldLabel: '单位',
            margin: '5 0 2 10',
            labelWidth: 80,
            labelAlign: 'right',
            width: 300
        },{
            xtype: 'textareafield',
            id: 'qxmx',
            fieldLabel: '缺陷明细',
            margin: '5 0 2 10',
            labelWidth: 80,
            labelAlign: 'right',
            width: 300
        },{
            xtype: 'textfield',
            id: 'sb',
            fieldLabel: '设备',
            margin: '5 0 2 10',
            labelWidth: 80,
            labelAlign: 'right',
            width: 300
        },
            {
                xtype: 'textfield',
                id: 'sbwz',
                fieldLabel: '设备位置',
                margin: '5 0 2 10',
                labelWidth: 80,
                labelAlign: 'right',
                width: 300
            }, {
                xtype: 'textfield',
                id: 'clyj',
                fieldLabel: '处理意见',
                margin: '5 0 2 10',
                labelWidth: 80,
                labelAlign: 'right',
                width: 300
            }, {
                xtype: 'textfield',
                id: 'qxzt1',
                fieldLabel: '缺陷状态',
                margin: '5 0 2 10',
                labelWidth: 80,
                labelAlign: 'right',
                width: 300
            }, {
                xtype: 'textareafield',
                fieldLabel:'消缺原因(*)',
                labelWidth: 80,
                width: 300,
                labelStyle:'color:#ff0000',
                margin:'5 0 2 10',
                id: 'xqyy',
                labelAlign: 'right',
                style:'color:red'
            }
        ],
        buttons: [
            {
                text: '确定',
                width: 70,
                listeners: {
                    click: OnSaveButtonClicked
                }
            }, {
                text: '返回',
                width: 70,
                listeners: {
                    click: OnBackButtonClicked
                }
            }]
    });


});

function _init() {
    if (zyStoreload) {
        zyStoreload = false;
        Ext.getBody().unmask();//去除页面笼罩
    }
}


function _selectOverhaulApply() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    Ext.getCmp('page').store.currentPage = 1;
    gridStore.proxy.extraParams = {
        V_V_STATECODE: Ext.ComponentManager.get("qxzt").getValue(),
        X_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        PUT_PERNAME:Ext.getCmp('fzr2').getValue()==""?"%":Ext.getCmp("fzr2").getValue().toString(),//"",
        V_V_PAGE: Ext.getCmp('page').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('page').store.pageSize,
        V_SIGN:0

    };
    gridStore.load();
}
function _selectOverhaulApply2() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    Ext.getCmp('page').store.currentPage = 1;
    gridStore.proxy.extraParams = {
        V_V_STATECODE: Ext.ComponentManager.get("qxzt").getValue(),
        X_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        PUT_PERNAME:Ext.getCmp('fzr2').getValue()==""?"%":Ext.getCmp("fzr2").getValue().toString(),
        V_V_PAGE: Ext.getCmp('page').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('page').store.pageSize,
        V_SIGN:1
    };
    gridStore.load();
}


var GUID;

function OnBtnSxQx() {
    var length = Ext.getCmp('overhaulApplyPanel').getSelectionModel().getSelection().length;
    if (length != 1) {
        alert('请选择一条数据进行修改');
    } else {
        GUID = Ext.getCmp('overhaulApplyPanel').getSelectionModel().getSelection()[0].data.V_GUID;
        var owidth = window.document.body.offsetWidth - 700;
        var oheight = window.document.body.offsetHeight - 500;
        Ext.getCmp('windowEqu').show();
        bind(GUID);
    }
}



function OnSaveButtonClicked() {
    var id = GUID;
    if (Ext.ComponentManager.get("xqyy").getValue() != '') {
        Ext.Ajax.request({
            url: AppUrl + 'qx/PRO_PM_07_DEFECT_SET_XQ',
            params: {
                V_V_GUID: id,
                V_V_PERCODE: Ext.util.Cookies.get("v_personcode"),
                V_V_XQYY: Ext.getCmp('xqyy').getValue()
            },
            success: function (resp) {
                var resp = Ext.JSON.decode(resp.responseText);
                if (resp.list[0].V_INFO == "成功") {
                    alert("保存成功");
                    //window.opener.getReturnValue("yes");
                    Ext.getCmp('windowEqu').hide();
                    _selectOverhaulApply();
                    // window.close();
                    // window.opener._selectOverhaulApply();
                } else {
                    Ext.Msg.alert('提示', '保存失败');
                }
            },
            failure: function () {
                Ext.Msg.alert('提示', '保存失败');
            }

        });
    } else {
        Ext.Msg.alert('提示', '录入内容不能为空，请重新输入!');
    }
}

function OnBackButtonClicked() {
    Ext.getCmp('windowEqu').hide();
}

function bind() {
    var id = GUID;
    if (id != "") {
        Ext.Ajax.request({
            url: AppUrl + 'qx/PRO_PM_07_DEFECT_GET',
            // url: '/NO210201/PRO_PM_DEFECT_GET',
            method: 'POST',
            params: {
                V_V_GUID: id
            },
            success: function (ret) {
                var resp = Ext.JSON.decode(ret.responseText);

                resp = resp.list;

                Ext.ComponentManager.get("qxly")
                    .setValue(resp[0].V_SOURCENAME);// 缺陷来源
                Ext.ComponentManager.get("qxrq")
                    .setValue(resp[0].D_DEFECTDATE);// 缺陷日期
                Ext.ComponentManager.get("fzr")
                    .setValue(resp[0].V_PERNAME);// 负责人
                Ext.ComponentManager.get("qxmx")
                    .setValue(resp[0].V_DEFECTLIST);// 缺陷明细
                Ext.ComponentManager.get("dw")
                    .setValue(resp[0].V_DEPTNAME);// 单位
                Ext.ComponentManager.get("sb")
                    .setValue(resp[0].V_EQUNAME);// 设备
                Ext.ComponentManager.get("sbwz")
                    .setValue(resp[0].V_EQUSITE);// 设备位置
                Ext.ComponentManager.get("clyj")
                    .setValue(resp[0].V_IDEA);// 处理意见
                Ext.ComponentManager.get("qxzt1")
                    .setValue(resp[0].V_STATENAME);// 缺陷状态

            }
        });
    }
}

function createWorkorder() {
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
        var wbs="";

        for(var z=0;z<seldata.length;z++){
            if(seldata[z].data.WBSCODE!=''){
                if(wbs==''){
                    wbs=seldata[z].data.WBSCODE;
                }else{
                    if(wbs!=seldata[z].data.WBSCODE){
                        alert("请选择同一WBS编码计划进行操作")
                        return;
                    }
                }
            }
        }

        for (var j = 0; j < seldata.length; j++) {
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
            url: AppUrl + 'cjy/PRO_PM_WORKORDER_DEFECT_NC',
            method: 'POST',
            async: false,
            params: {
                V_V_ORGCODE: Ext.util.Cookies.get('v_orgCode'),
                V_V_PERNAME: Ext.util.Cookies.get('v_personcode'),
                V_DEFECT_GUID: V_GUIDList
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                if (resp.list.length > 0) {
                    var V_ORDERGUID = resp.list[0].V_ORDERGUID;
                    var V_EQUTYPECODE = seldata[0].raw.V_EQUTYPECODE;
                    var V_SOURCECODE = seldata[0].raw.V_SOURCECODE;
                    var owidth = window.document.body.offsetWidth - 500;
                    var oheight = window.document.body.offsetHeight - 500;
                    if(Ext.util.Cookies.get("v_deptcode")=='99070205'||Ext.util.Cookies.get("v_deptcode")=='99070210'||Ext.util.Cookies.get("v_deptcode")=='99080206'||Ext.util.Cookies.get("v_deptcode")=='99080207'){
                        if(seldata[0].data.V_DEPTCODE!=Ext.util.Cookies.get("v_deptcode")){
                            var ret = window.open(AppUrl + 'page/dq0205/workorder_newWork.html?V_GUID=' + V_ORDERGUID +
                                '&V_EQUTYPECODE=' + V_EQUTYPECODE +
                                "&V_SOURCECODE=" + V_SOURCECODE +
                                "&D_BE_SJ=" + D_BE_SJ +
                                "&D_EN_SJ=" + D_EN_SJ, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
                        }
                        else{
                            var ret = window.open(AppUrl + 'page/PM_090201/index.html?V_GUID=' + V_ORDERGUID +
                                '&V_EQUTYPECODE=' + V_EQUTYPECODE +
                                "&V_SOURCECODE=" + V_SOURCECODE +
                                "&D_BE_SJ=" + D_BE_SJ +
                                "&D_EN_SJ=" + D_EN_SJ, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
                        }
                    }else{
                        var ret = window.open(AppUrl + 'page/PM_090201/index.html?V_GUID=' + V_ORDERGUID +
                            '&V_EQUTYPECODE=' + V_EQUTYPECODE +
                            "&V_SOURCECODE=" + V_SOURCECODE +
                            "&D_BE_SJ=" + D_BE_SJ +
                            "&D_EN_SJ=" + D_EN_SJ, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
                    }
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
function updateDefData(){
    var seldata = Ext.getCmp('overhaulApplyPanel').getSelectionModel().getSelection();
    if (seldata.length != 1) {
        Ext.Msg.alert('操作提示', '请选择一条数据！');
        return false;
    }
    else{
        var defguid=seldata[0].data.V_GUID;
        Ext.Ajax.request({
            url: AppUrl + 'PM_07/PRO_PM_07_DEFECT_UPDT_SEL',
            method: 'POST',
            async: false,
            params: {
                V_V_GUID: seldata[0].data.V_GUID
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                if (resp.list =='1') {
                    var owidth = window.document.body.offsetWidth - 200;
                    var oheight = window.document.body.offsetHeight - 100;
                    var ret = window.open(AppUrl + "page/PM_0702/indexUpdt.html?v_guid="
                        + defguid,'', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
                }
                /*else if(resp.RET =='1') {
                    alert("该缺陷不是手动录入或者状态不是未处理，故无法修改");
                }*/
            }
        });
    }

}
function getSel(){
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    Ext.getCmp('page').store.currentPage = 1;
    gridStore.proxy.extraParams = {
        V_V_STATECODE: Ext.ComponentManager.get("qxzt").getValue(),
        X_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        PUT_PERNAME:Ext.getCmp('fzr2').getValue()=="0"?"%":Ext.getCmp("fzr2").getValue().toString(),
        V_V_PAGE: Ext.getCmp('page').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('page').store.pageSize,
        V_SIGN:1
    };
    gridStore.load();
}

//导出缺陷处理
function expExcelDefData(){
    var V_V_STATECODE=Ext.ComponentManager.get("qxzt").getValue()=="%"?"0":Ext.ComponentManager.get("qxzt").getValue();
    var PUT_PERNAME=Ext.getCmp('fzr2').getValue()==""?"0":Ext.getCmp("fzr2").getValue().toString();
    document.location.href=AppUrl + 'excel/DEFCL_EXCEL?V_V_STATECODE='+V_V_STATECODE+
        '&X_PERSONCODE='+Ext.util.Cookies.get('v_personcode')+
        '&PUT_PERNAME='+PUT_PERNAME+
        '&V_SIGN='+1;
}