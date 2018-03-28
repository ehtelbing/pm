var mingtian = new Date();
mingtian.setDate(mingtian.getDate()+1);
var V_GUID = "" ;
var zyStoreload = false;
var dt = new Date();
var thisYear = dt.getFullYear();
var  tomorrowYear = dt.getFullYear() + 1;
var years = [];
for (var i = 2012; i <= tomorrowYear; i++)
    years.push({
        displayField : i,
        valueField : i
    });
var V_WEEKPLAN_GUID = null;
if (location.href.split('?')[1] != undefined) {
    V_WEEKPLAN_GUID = Ext.urlDecode(location.href.split('?')[1]).V_WEEKPLAN_GUID;
}
var V_PLANTYPE = null;
if (location.href.split('?')[1] != undefined) {
    V_PLANTYPE = Ext.urlDecode(location.href.split('?')[1]).V_PLANTYPE;
}
var YEAR = null;
if (location.href.split('?')[1] != undefined) {
    YEAR = Ext.urlDecode(location.href.split('?')[1]).YEAR;
}
var MONTH = null;
if (location.href.split('?')[1] != undefined) {
    MONTH = Ext.urlDecode(location.href.split('?')[1]).MONTH;
}
var WEEK = null;
if (location.href.split('?')[1] != undefined) {
    WEEK = Ext.urlDecode(location.href.split('?')[1]).WEEK;
}
var V_ORGCODE = null;
if (location.href.split('?')[1] != undefined) {
    V_ORGCODE = Ext.urlDecode(location.href.split('?')[1]).V_ORGCODE;
}
var V_DEPTCODE = null;
if (location.href.split('?')[1] != undefined) {
    V_DEPTCODE = Ext.urlDecode(location.href.split('?')[1]).V_DEPTCODE;
}
var stateData=[{ displayField:'全部', valueField:'%'},{ displayField:'编辑', valueField:'编辑'},{ displayField:'审批中', valueField:'审批中'},{ displayField:'审批通过', valueField:'审批通过'},{ displayField:'审批驳回', valueField:'审批驳回'}];


var V_JXMX_CODE = null;
var V_JXGX_CODE = null;

var V_PLANCODE = null;

var date = new Date();
//年份

for (var i = date.getFullYear() - 4; i <= date.getFullYear() + 1; i++) {
    years.push({displayField: i, valueField: i});
}
var yearStore = Ext.create("Ext.data.Store", {
    storeId: 'yearStore',
    fields: ['displayField', 'valueField'],
    data: years,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});
//月份
var months = [];
for (var i = 1; i <= 12; i++) {
    months.push({displayField: i, valueField: i});
}
var monthStore = Ext.create("Ext.data.Store", {
    storeId: 'monthStore',
    fields: ['displayField', 'valueField'],
    data: months,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});
//周
var weeks = [];
for (var i = 1; i <= 6; i++) {
    weeks.push({displayField: i, valueField: i});
}
var weekStore = Ext.create("Ext.data.Store", {
    storeId: 'weekStore',
    fields: ['displayField', 'valueField'],
    data: weeks,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});
//小时
var hours = [];
for (var i = 0; i < 24; i++) {
    if (i < 10) {
        i = '0' + i;
    } else {
        i = '' + i;
    }
    hours.push({displayField: i, valueField: i});
}
var hourStore = Ext.create("Ext.data.Store", {
    storeId: 'hourStore',
    fields: ['displayField', 'valueField'],
    data: hours,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});

//分钟
var minutes = [];
for (var i = 0; i < 60; i++) {
    if (i < 10) {
        i = '0' + i;
    } else {
        i = '' + i;
    }
    minutes.push({displayField: i, valueField: i});
}
var minuteStore = Ext.create("Ext.data.Store", {
    storeId: 'minuteStore',
    fields: ['displayField', 'valueField'],
    data: minutes,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});

var ckStore = Ext.create('Ext.data.Store', {
    autoLoad: true,
    storeId: 'ckStore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
            'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
            'V_V_DEPTCODENEXT': '%',
            'V_V_DEPTTYPE': '基层单位'
        }
    }
});
//作业区
var zyqStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'zyqStore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
//专业
var zyStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'zyStore',
    fields: ['V_SPECIALTYCODE', 'V_BASENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'basic/PRO_BASE_SPECIALTY_DEPT_SPECIN',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
//设备类型
var sblxStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'sblxStore',
    fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
//设备名称
var sbmcStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'sbmcStore',
    fields: ['V_EQUCODE', 'V_EQUNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_06/pro_get_deptequ_per',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

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
            extraParams: {

            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('qxzt').select('defct01');
                zyStoreload = true;
                _init();
                _selectOverhaulApply();
            }
        }
    });





    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['D_DEFECTDATE', 'V_DEFECTLIST', 'V_EQUNAME',
            'V_EQUSITE', 'V_DEPTNAME', 'V_PERNAME', 'V_IDEA',
            'V_STATENAME', 'V_SOURCENAME', 'V_SOURCEID',
            'D_INDATE', 'V_PERCODE', 'V_GUID', 'V_STATECODE',
            'V_STATECOLOR', 'V_ORDERID','V_EQUTYPECODE','V_SOURCECODE'],

        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PRO_PM_07_DEFECT_VIEW_NEW',
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

    var inputPanel = Ext.create('Ext.Panel', {
        id : 'inputPanel',
        header : false,
        frame : true,
        layout : 'column',
        style: 'background-color:#FFFFFF',
        baseCls: 'my-panel-no-border',
        defaults : {
            labelAlign : 'right',
            //labelWidth : 100,
            //inputWidth : 240,
            margin : '4,0,0,0'
        },
        items : [ {
            id: 'qxzt',
            xtype: 'combo',
            store: sqxzt,
            editable: false,
            fieldLabel: '缺陷类型',
            labelWidth:70,
            width: 180,
            displayField: 'V_SOURCENAME',
            valueField: 'V_SOURCECODE',
            queryMode: 'local',
            baseCls: 'margin-bottom'
        },{
            xtype : 'button',
            text : '查询',
            handler : _selectOverhaulApply
        },{
            xtype: 'button',
            text: '选择',
            handler : Select
        } ]
    });

    var overhaulApplyPanel = Ext.create('Ext.grid.Panel', {
        id : 'overhaulApplyPanel',
        store : gridStore,
        frame : true,
        border: false,
        columnLines: true,
        /*selModel : {
         selType : 'checkboxmodel',
         mode : 'SINGLE'
         },*/
        selType: 'checkboxmodel',
        columns : [ {
            text : '序号',
            xtype : 'rownumberer',
            width : 50,
            sortable : false
        },{
            text : '手工消缺',
            id : 'sgxq',
            xtype : 'templatecolumn',
            align : 'center',
            width : 100,
            tpl : '<a href="#" onClick="OnBtnSxQx()">手工消缺</a>'
        }, {
            text : '单位',
            dataIndex : 'V_DEPTNAME',
            align : 'center',
            width : 100,
            renderer : CreateGridColumnTd
        }, {
            text : '缺陷状态',
            dataIndex : 'V_STATENAME',
            align : 'center',
            width : 100,
            renderer : CreateGridColumnTd
        }, {
            text : '缺陷类型',
            dataIndex : 'V_SOURCENAME',
            align : 'center',
            width : 100,
            renderer : CreateGridColumnTd
        }, {
            text : '缺陷日期',
            dataIndex : 'D_DEFECTDATE',
            align : 'center',
            width : 200,
            renderer : CreateGridColumnTime
        }, {
            text : '缺陷明细',
            dataIndex : 'V_DEFECTLIST',
            align : 'center',
            width : 700,
            renderer : CreateGridColumnTd
        }, {
            text : '设备',
            dataIndex : 'V_EQUNAME',
            align : 'center',
            width : 200,
            renderer : CreateGridColumnTd
        }, {
            text : '设备位置',
            dataIndex : 'V_EQUSITE',
            align : 'center',
            width : 300,
            renderer : CreateGridColumnTd
        }, {
            text : '负责人',
            dataIndex : 'V_PERNAME',
            align : 'center',
            width : 100,
            renderer : CreateGridColumnTd
        }, {
            text : '处理意见',
            dataIndex : 'V_IDEA',
            align : 'center',
            renderer : CreateGridColumnTd
        }],
        listeners : {
            itemdblclick : itemclick
        },
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }, {
            xtype: 'label',
            text: '已计划',
            style: ' margin: 0px 0px 0px 10px;color:#FFCC00'
        }, {
            xtype: 'label',
            text: '已接收',
            style: ' margin: 0px 0px 0px 10px;color:#009933'
        }, {
            xtype: 'label',
            text: '已反馈',
            style: ' margin: 0px 0px 0px 10px;color:#6666FF'
        }, {
            xtype: 'label',
            text: '已验收',
            style: ' margin: 0px 0px 0px 10px;color:#333300'
        }, {
            xtype: 'label',
            text: '遗留缺陷',
            style: ' margin: 0px 0px 0px 10px;color:#000000'
        }, {
            xtype: 'label',
            text: '工单驳回',
            style: ' margin: 0px 0px 0px 10px;color:#000000'
        }, {
            xtype: 'label',
            text: '未处理',
            style: ' margin: 0px 0px 0px 10px;color:#FF0000'
        }, {
            xtype: 'label',
            text: '已下票',
            style: ' margin: 0px 0px 0px 10px;color:#FF33CC'
        }, {
            xtype: 'label',
            text: '已消缺',
            style: ' margin: 0px 0px 0px 10px;color:#000000'
        }, {
            xtype: 'label',
            text: '手工消缺',
            style: ' margin: 0px 0px 0px 10px;color:#000000'
        }]
    });

    Ext.create('Ext.container.Viewport', {
        layout : {
            type : 'border',
            regionWeights : {
                west : -1,
                north : 1,
                south : 1,
                east : -1
            }
        },
        items : [ {
            region : 'north',
            border : false,
            items : [ inputPanel]
        }, {
            region : 'center',
            layout : 'fit',
            border : false,
            items : [ overhaulApplyPanel ]
        } ]
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_V_STATECODE : Ext.ComponentManager.get("qxzt").getValue(),
            X_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    });

    _init()
    // _selectOverhaulApply();
})

function _init() {
    if(zyStoreload)
    {
        zyStoreload = false;
        Ext.getBody().unmask();//去除页面笼罩
    }
}


function _selectOverhaulApply() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        V_V_STATECODE : Ext.ComponentManager.get("qxzt").getValue(),
        X_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
        V_V_PAGE: Ext.getCmp('page').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('page').store.pageSize

    };
    gridStore.currentPage = 1;
    gridStore.load();
}


var GUID;
function OnBtnSxQx() {
    var length = Ext.getCmp('overhaulApplyPanel').getSelectionModel().getSelection().length;
    if (length != 1) {
        alert('请选择一条数据进行修改');
    } else {
         GUID = Ext.getCmp('overhaulApplyPanel').getSelectionModel().getSelection()[0].data.V_GUID;
        var owidth = window.document.body.offsetWidth - 200;
        var oheight = window.document.body.offsetHeight - 100;
        // var ret = window.open(AppUrl + "page/PM_070201/index.html?V_GUID=" + GUID, '',
        //     'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

        var windowEqu = Ext.create('Ext.window.Window', {
            id: 'windowEqu',
            width: 600,
            height: 500,
            title : '周计划添加',
            modal: true,//弹出窗口时后面背景不可编辑
            frame: true,
            closeAction: 'hide',
            closable: true,
            region:'center',
            layout : 'vbox',
            items:[{region:'center',
                layout : 'vbox',
                height : 440,
                border:false,
                baseCls: 'my-panel-no-border',
                frame:true,
                defaults: {labelAlign: 'right'},
                items : [
                    {
                        xtype : 'panel',
                        border : false,
                        layout : 'hbox',
                        margin : '15px 15px 0px 15px',
                        items : [
                            {xtype: 'textfield',
                                id: 'qxly',
                                fieldLabel: '缺陷来源',
                                margin: '5 0 5 5',
                                labelWidth: 80,
                                width: 230
                            },{xtype: 'textfield',
                                id: 'qxrq',
                                fieldLabel: '缺陷日期',
                                margin: '5 0 5 5',
                                labelWidth: 80,
                                width: 230
                            }]
                    }, {
                        xtype : 'panel',
                        border : false,
                        layout : 'hbox',
                        margin : '0px 15px 0px 15px',
                        items : [
                            {xtype: 'textfield',
                                id: 'fzr',
                                fieldLabel: '负责人',
                                margin: '5 0 5 5',
                                labelWidth: 80,
                                width: 230
                            },
                            {xtype: 'textfield',
                                id: 'dw',
                                fieldLabel: '单位',
                                margin: '5 0 5 5',
                                labelWidth: 80,
                                width: 230
                            }]
                    }, {
                        xtype : 'panel',
                        border : false,
                        layout : 'hbox',
                        margin : '0px 0px 0px 15px',
                        items : [
                            {xtype: 'textareafield',
                                id: 'qxmx',
                                fieldLabel: '缺陷明细',
                                margin: '5 0 5 5',
                                labelWidth: 80,
                                width: 600
                            }]
                    }, {
                        xtype : 'panel',
                        border : false,
                        layout : 'hbox',
                        margin : '0px 0px 0px 15px',
                        items : [
                            {xtype: 'textfield',
                                id: 'sb',
                                fieldLabel: '设备',
                                margin: '5 0 5 5',
                                labelWidth: 80,
                                width: 230
                            },
                            {xtype: 'textfield',
                                id: 'sbwz',
                                fieldLabel: '设备位置',
                                margin: '5 0 5 5',
                                labelWidth: 80,
                                width: 230
                            }]
                    }, {
                        xtype : 'panel',
                        border : false,
                        layout : 'hbox',
                        margin : '0px 0px 0px 15px',
                        items : [
                            {xtype: 'textfield',
                            id: 'clyj',
                            fieldLabel: '处理意见',
                            margin: '5 0 5 5',
                            labelWidth: 80,
                            width: 230
                        },{xtype: 'textfield',
                                id: 'qxzt1',
                                fieldLabel: '缺陷状态',
                                margin: '5 0 5 5',
                                labelWidth: 80,
                                width: 230
                            }]
                    }, {
                        xtype : 'panel',
                        border : false,
                        layout : 'hbox',
                        margin : '0px 0px 0px 15px',
                        items : [{
                            xtype : 'panel',
                            width : 120,
                            height : 120,
                            border : false,
                            baseCls : 'border_top5',
                            layout : 'fit',
                            items : [{
                                xtype : 'label',
                                text : '消缺原因：'
                            },{xtype:'label',text:'*',style:'color:red'}]
                        }, {
                            xtype : 'panel',
                            width : 720,
                            height : 120,
                            border : false,
                            baseCls : 'border_top6',
                            items : [{
                                xtype : 'textareafield',
                                height : 110,
                                width : 600,
                                id : 'xqyy'
                            }]
                        }]
                    }]
            }],
            buttons : [
                {
                    text : '确定',
                    width : 70,
                    listeners : {
                        click : OnSaveButtonClicked
                    }
                }, {
                    text : '返回',
                    width : 70,
                    listeners : {
                        click : OnBackButtonClicked
                    }
                }]
        });
        Ext.getCmp('windowEqu').show();
        bind();
    }
}
function createWorkorder(){

    var records = Ext.getCmp('overhaulApplyPanel').getSelectionModel().getSelection();//获取选中的数据

    if (records.length == 0) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }


    for (i = 0; i < records.length; i++) {

        console.log("V_GUID="+records[i].data.V_GUID);
        console.log("V_EQUTYPECODE="+records[i].data.V_EQUTYPECODE);
        console.log("V_SOURCECODE="+records[i].data.V_SOURCECODE);
        if(records[i].data.V_STATECODE=='10'){
            var param="";
            try {
                var owidth = window.document.body.offsetWidth-200;
                var oheight = window.document.body.offsetHeight-100 ;
                if(url_guid!=undefined){
                    param="&&url_guid="+url_guid;
                }else{
                    param="";
                }
                var ret = window.open(AppUrl+'page/PM_090201/index.html?V_GUID='
                    + records[i].data.V_GUID + '&V_EQUTYPECODE='+records[i].data.V_EQUTYPECODE+"&V_SOURCECODE="+records[i].data.V_SOURCECODE+param, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

            } catch (e) {
                var owidth = window.document.body.offsetWidth-200;
                var oheight = window.document.body.offsetHeight-100 ;
                if(url_guid!=undefined){
                    param="&&url_guid="+url_guid;
                }else{
                    param="";
                }
                var ret = window.open(AppUrl+'page/PM_090201/index.html?V_GUID='
                    + records[i].data.V_GUID+"&V_SOURCECODE="+records[i].data.V_SOURCECODE + ''+param, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

            }
        }else{
            Ext.MessageBox.alert('操作信息', '该缺陷已下票，请重新选择！');
            return;
        }
    }




}

function CreateGridColumnTime(value, metaData, record, rowIndex, colIndex, store) {
    var time=value.split('.')[0];
    return time;
}


function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;color:" + store.getAt(rowIndex).get('V_STATECOLOR');
    if(value == null){
        return '<div data-qtip="' + value + '" ></div>';
    }
    else{
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

var V_EQUTYPECODE;
var V_EQUCODE;

function Select(){
    var seldata = Ext.getCmp('overhaulApplyPanel').getSelectionModel().getSelection();
    if (seldata.length==0) {
        Ext.Msg.alert('操作提示','请选择一条数据！');
        return false;
    }

    for (var j = 0; j < seldata.length; j++) {
        if(seldata[0].data.V_EQUNAME!=seldata[j].data.V_EQUNAME){
            alert("请选择同一设备缺陷");
            return;

        }

    }
    var num = 0;
    Ext.Ajax.request({
        url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_WEEK_GUID: V_WEEKPLAN_GUID
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.V_INFO == 'success') {

                for (var i = 0; i < seldata.length; i++) {
                    Ext.Ajax.request({
                        url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SET',
                        method: 'POST',
                        async: false,
                        params: {
                            V_V_DEFECT_GUID: seldata[i].data.V_GUID,
                            V_V_WEEK_GUID: V_WEEKPLAN_GUID
                        },
                        success: function (resp) {
                            var resp = Ext.decode(resp.responseText);
                            if (resp.V_INFO == 'success') {
                                num++;
                            }

                        }
                    });
                }
            }else{
                alert("子数据清除错误");
            }

        }
    });

     V_EQUTYPECODE=seldata[0].raw.V_EQUTYPECODE;
     V_EQUCODE=seldata[0].raw.V_EQUCODE;
    if (num == seldata.length) {
        var owidth = window.document.body.offsetWidth - 200;
        var oheight = window.document.body.offsetHeight - 100;
        // var ret = window.open(AppUrl + "page/PM_03010315/index.html?V_WEEKPLAN_GUID=" + V_WEEKPLAN_GUID +
        //     "&V_PLANTYPE=" + V_PLANTYPE +
        //     "&YEAR=" + YEAR +
        //     "&MONTH=" + MONTH +
        //     "&WEEK=" + WEEK +
        //     "&V_ORGCODE=" + V_ORGCODE +
        //     "&V_DEPTCODE=" + V_DEPTCODE+
        //     "&V_EQUTYPECODE=" + V_EQUTYPECODE+
        //     "&V_EQUCODE=" + V_EQUCODE, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
        var windowEqu = Ext.create('Ext.window.Window', {
            id: 'windowEqu',
            width: 900,
            height: 500,
            title : '周计划添加',
            modal: true,//弹出窗口时后面背景不可编辑
            frame: true,
            closeAction: 'hide',
            closable: true,
            region:'center',
            layout : 'vbox',
            items: [
                {
                    layout: 'column',
                    defaults: {labelAlign: 'right'},
                    frame: true,
                    border: false,
                    baseCls: 'my-panel-no-border',
                    items: [
                        {
                            xtype: 'combo',
                            id: 'year',
                            readOnly:true,
                            fieldLabel: '年份',
                            editable: false,
                            margin: '10 0 5 5',
                            labelWidth: 80,
                            width: 280,
                            displayField: 'displayField',
                            valueField: 'valueField',
                            value: '',
                            store: yearStore,
                            queryMode: 'local'
                        },
                        {
                            xtype: 'combo',
                            id: 'month',
                            readOnly:true,
                            fieldLabel: '月份',
                            editable: false,
                            margin: '10 0 5 5',
                            labelWidth: 55,
                            width: 255,
                            displayField: 'displayField',
                            valueField: 'valueField',
                            value: '',
                            store: monthStore,
                            queryMode: 'local'
                        }
                    ]
                },
                {
                    layout: 'column',
                    defaults: {labelAlign: 'right'},
                    frame: true,
                    border: false,
                    baseCls: 'my-panel-no-border',
                    items: [
                        {
                            xtype: 'combo',
                            id: 'week',
                            readOnly:true,
                            fieldLabel: '周',
                            editable: false,
                            margin: '10 0 5 5',
                            labelWidth: 80,
                            width: 280,
                            displayField: 'displayField',
                            valueField: 'valueField',
                            value: '',
                            store: weekStore,
                            queryMode: 'local'
                        },
                        {
                            xtype: 'combo',
                            id: 'ck',
                            readOnly:true,
                            fieldLabel: '计划厂矿',
                            editable: false,
                            margin: '5 0 5 5',
                            labelWidth: 55,
                            width: 255,
                            value: '',
                            displayField: 'V_DEPTNAME',
                            valueField: 'V_DEPTCODE',
                            store: ckStore,
                            queryMode: 'local'
                        }
                    ]
                },
                {
                    layout: 'column',
                    defaults: {labelAlign: 'right'},
                    frame: true,
                    border: false,
                    baseCls: 'my-panel-no-border',
                    items: [
                        {
                            xtype: 'combo',
                            id: 'zyq',
                            readOnly:true,
                            fieldLabel: '作业区',
                            editable: false,
                            margin: '5 0 5 5',
                            labelWidth: 80,
                            width: 280,
                            value: '',
                            displayField: 'V_DEPTNAME',
                            valueField: 'V_DEPTCODE',
                            store: zyqStore,
                            queryMode: 'local'
                        },
                        {
                            xtype: 'combo',
                            id: 'zy',
                            fieldLabel: '专业',
                            editable: false,
                            margin: '5 0 5 5',
                            labelWidth: 55,
                            width: 255,
                            value: '',
                            displayField: 'V_BASENAME',
                            valueField: 'V_SPECIALTYCODE',
                            store: zyStore,
                            queryMode: 'local'
                        }
                    ]
                },
                {
                    layout: 'column',
                    defaults: {labelAlign: 'right'},
                    frame: true,
                    border: false,
                    baseCls: 'my-panel-no-border',
                    items: [
                        {
                            xtype: 'combo',
                            id: 'sblx',
                            readOnly:true,
                            fieldLabel: '设备类型',
                            editable: false,
                            margin: '5 0 5 5',
                            labelWidth: 80,
                            width: 280,
                            value: '',
                            displayField: 'V_EQUTYPENAME',
                            valueField: 'V_EQUTYPECODE',
                            store: sblxStore,
                            queryMode: 'local'
                        },
                        {
                            xtype: 'combo',
                            id: 'sbmc',
                            readOnly:true,
                            fieldLabel: '设备名称',
                            editable: false,
                            labelAlign: 'right',
                            margin: '5 0 5 5',
                            labelWidth: 55,
                            width: 255,
                            value: '',
                            displayField: 'V_EQUNAME',
                            valueField: 'V_EQUCODE',
                            store: sbmcStore,
                            queryMode: 'local'
                        }
                    ]
                },
                {
                    xtype: 'textarea',
                    id: 'jxnr',
                    fieldLabel: '检修内容',
                    labelAlign: 'right',
                    margin: '5 0 5 5',
                    labelWidth: 80,
                    width: 540,
                    value: ''
                },
                {
                    layout: 'column',
                    defaults: {labelAlign: 'right'},
                    frame: true,
                    border: false,
                    baseCls: 'my-panel-no-border',
                    items: [
                        {
                            xtype: 'datefield',
                            id: 'jhtgdate',
                            format: 'Y-m-d',
                            fieldLabel: '计划停工时间',
                            editable: false,
                            labelAlign: 'right',
                            margin: '5 0 5 5',
                            labelWidth: 80,
                            width: 280,
                            value: '',
                            listeners: {
                                select: function (field, newValue, oldValue) {
                                    var date1 = Ext.getCmp('jhtgdate').getSubmitValue() + " " + Ext.getCmp('jhtghour').getValue() + ":" + Ext.getCmp('jhtgminute').getValue() + ":00";
                                    var date11 = new Date(date1);
                                    var date2 = Ext.getCmp('jhjgdate').getSubmitValue() + " " + Ext.getCmp('jhjghour').getValue() + ":" + Ext.getCmp('jhjgminute').getValue() + ":00";
                                    var date22 = new Date(date2);


                                    var gongshicha = date22.getTime() - date11.getTime();
                                    var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                                    if(gongshicha2 >= 0)
                                    {
                                        _gongshiheji();
                                    }else{
                                        Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                                        function callBack(id) {
                                            Ext.getCmp('jhtgdate').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                                            Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhjgdate').setValue(new Date());       //编辑窗口计划竣工时间默认值
                                            Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhgshj').setValue(0);
                                            return ;

                                        }

                                    }
                                }
                            }
                        },
                        {
                            xtype: 'combo',
                            id: 'jhtghour',
                            fieldLabel: '小时',
                            editable: false,
                            margin: '5 0 5 5',
                            labelWidth: 55,
                            width: 137,
                            value: '',
                            displayField: 'displayField',
                            valueField: 'valueField',
                            store: hourStore,
                            queryMode: 'local',
                            listeners: {
                                select: function (field, newValue, oldValue) {
                                    var date1 = Ext.getCmp('jhtgdate').getSubmitValue() + " " + Ext.getCmp('jhtghour').getValue() + ":" + Ext.getCmp('jhtgminute').getValue() + ":00";
                                    var date11 = new Date(date1);
                                    var date2 = Ext.getCmp('jhjgdate').getSubmitValue() + " " + Ext.getCmp('jhjghour').getValue() + ":" + Ext.getCmp('jhjgminute').getValue() + ":00";
                                    var date22 = new Date(date2);


                                    var gongshicha = date22.getTime() - date11.getTime();
                                    var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                                    if(gongshicha2 >= 0)
                                    {
                                        _gongshiheji();
                                    }else{
                                        Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                                        function callBack(id) {
                                            Ext.getCmp('jhtgdate').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                                            Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhjgdate').setValue(new Date());       //编辑窗口计划竣工时间默认值
                                            Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhgshj').setValue(0);
                                            return ;

                                        }

                                    }
                                }
                            }
                        },
                        {
                            xtype: 'combo',
                            id: 'jhtgminute',
                            fieldLabel: '分钟',
                            editable: false,
                            margin: '5 0 5 5',
                            labelWidth: 30,
                            width: 112,
                            value: '',
                            displayField: 'displayField',
                            valueField: 'valueField',
                            store: minuteStore,
                            queryMode: 'local',
                            listeners: {
                                select: function (field, newValue, oldValue) {
                                    var date1 = Ext.getCmp('jhtgdate').getSubmitValue() + " " + Ext.getCmp('jhtghour').getValue() + ":" + Ext.getCmp('jhtgminute').getValue() + ":00";
                                    var date11 = new Date(date1);
                                    var date2 = Ext.getCmp('jhjgdate').getSubmitValue() + " " + Ext.getCmp('jhjghour').getValue() + ":" + Ext.getCmp('jhjgminute').getValue() + ":00";
                                    var date22 = new Date(date2);


                                    var gongshicha = date22.getTime() - date11.getTime();
                                    var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                                    if(gongshicha2 >= 0)
                                    {
                                        _gongshiheji();
                                    }else{
                                        Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                                        function callBack(id) {
                                            Ext.getCmp('jhtgdate').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                                            Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhjgdate').setValue(new Date());       //编辑窗口计划竣工时间默认值
                                            Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhgshj').setValue(0);
                                            return ;

                                        }

                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    layout: 'column',
                    defaults: {labelAlign: 'right'},
                    frame: true,
                    border: false,
                    baseCls: 'my-panel-no-border',
                    items: [
                        {
                            xtype: 'datefield',
                            id: 'jhjgdate',
                            format: 'Y-m-d',
                            fieldLabel: '计划竣工时间',
                            editable: false,
                            labelAlign: 'right',
                            margin: '5 0 5 5',
                            labelWidth: 80,
                            width: 280,
                            value: '',
                            listeners: {
                                select: function (field, newValue, oldValue) {
                                    var date1 = Ext.getCmp('jhtgdate').getSubmitValue() + " " + Ext.getCmp('jhtghour').getValue() + ":" + Ext.getCmp('jhtgminute').getValue() + ":00";
                                    var date11 = new Date(date1);
                                    var date2 = Ext.getCmp('jhjgdate').getSubmitValue() + " " + Ext.getCmp('jhjghour').getValue() + ":" + Ext.getCmp('jhjgminute').getValue() + ":00";
                                    var date22 = new Date(date2);


                                    var gongshicha = date22.getTime() - date11.getTime();
                                    var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                                    if(gongshicha2 >= 0)
                                    {
                                        _gongshiheji();
                                    }else{
                                        Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                                        function callBack(id) {
                                            Ext.getCmp('jhtgdate').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                                            Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhjgdate').setValue(new Date());       //编辑窗口计划竣工时间默认值
                                            Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhgshj').setValue(0);
                                            return ;

                                        }

                                    }
                                }
                            }
                        },
                        {
                            xtype: 'combo',
                            id: 'jhjghour',
                            fieldLabel: '小时',
                            editable: false,
                            margin: '5 0 5 5',
                            labelWidth: 55,
                            width: 137,
                            value: '0',
                            displayField: 'displayField',
                            valueField: 'valueField',
                            store: hourStore,
                            queryMode: 'local',
                            listeners: {
                                select: function (field, newValue, oldValue) {
                                    var date1 = Ext.getCmp('jhtgdate').getSubmitValue() + " " + Ext.getCmp('jhtghour').getValue() + ":" + Ext.getCmp('jhtgminute').getValue() + ":00";
                                    var date11 = new Date(date1);
                                    var date2 = Ext.getCmp('jhjgdate').getSubmitValue() + " " + Ext.getCmp('jhjghour').getValue() + ":" + Ext.getCmp('jhjgminute').getValue() + ":00";
                                    var date22 = new Date(date2);


                                    var gongshicha = date22.getTime() - date11.getTime();
                                    var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                                    if(gongshicha2 >= 0)
                                    {
                                        _gongshiheji();
                                    }else{
                                        Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                                        function callBack(id) {
                                            Ext.getCmp('jhtgdate').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                                            Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhjgdate').setValue(new Date());       //编辑窗口计划竣工时间默认值
                                            Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhgshj').setValue(0);
                                            return ;

                                        }

                                    }
                                }
                            }
                        },
                        {
                            xtype: 'combo',
                            id: 'jhjgminute',
                            fieldLabel: '分钟',
                            editable: false,
                            margin: '5 0 5 5',
                            labelWidth: 30,
                            width: 112,
                            value: '0',
                            displayField: 'displayField',
                            valueField: 'valueField',
                            store: minuteStore,
                            queryMode: 'local',
                            listeners: {
                                select: function (field, newValue, oldValue) {
                                    var date1 = Ext.getCmp('jhtgdate').getSubmitValue() + " " + Ext.getCmp('jhtghour').getValue() + ":" + Ext.getCmp('jhtgminute').getValue() + ":00";
                                    var date11 = new Date(date1);
                                    var date2 = Ext.getCmp('jhjgdate').getSubmitValue() + " " + Ext.getCmp('jhjghour').getValue() + ":" + Ext.getCmp('jhjgminute').getValue() + ":00";
                                    var date22 = new Date(date2);


                                    var gongshicha = date22.getTime() - date11.getTime();
                                    var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                                    if(gongshicha2 >= 0)
                                    {
                                        _gongshiheji();
                                    }else{
                                        Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                                        function callBack(id) {
                                            Ext.getCmp('jhtgdate').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                                            Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhjgdate').setValue(new Date());       //编辑窗口计划竣工时间默认值
                                            Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhgshj').setValue(0);
                                            return ;

                                        }

                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    id: 'jhgshj',
                    fieldLabel: '计划工时合计',
                    labelAlign: 'right',
                    margin: '5 0 5 5',
                    labelWidth: 80,
                    width: 280,
                    value: '0'
                },
                {
                    xtype: 'textarea',
                    id: 'bz',
                    fieldLabel: '备注',
                    margin: '5 0 10 5',
                    labelWidth: 80,
                    width: 540,
                    height: 80,
                    value: ''
                }
            ],
            buttons : [{
                text : '保存',
                width : 70,
                listeners : {
                    click : _save
                }
            }, {
                text : '关闭',
                width : 70,
                listeners : {
                    click : _close
                }
            }]
        });

        Ext.getCmp('windowEqu').show();
        pageLoadInfo();

        V_JXGX_CODE = guid();
        Ext.Ajax.request({
            url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SEL',
            method: 'POST',
            async: false,
            params: {
                V_V_WEEK_GUID: V_WEEKPLAN_GUID
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                if (resp.list.length >0) {
                    var str='';
                    for(var i=0;i<resp.list.length;i++){
                        if(i==0){
                            str=resp.list[i].V_DEFECTLIST;
                        }else{
                            str+=','+resp.list[i].V_DEFECTLIST
                        }


                    }
                    Ext.getCmp('jxnr').setValue(str);
                }

            }
        });

    } else {
        alert("缺陷添加错误");
    }




    /*window.opener.getReturnQXXZ(retdata);
    window.close();*/
}
function closeSelf(){
    window.close();
    window.opener.query();
}
function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function pageLoadInfo() {

    if (YEAR == null || YEAR == '') {
        Ext.getCmp('year').setValue(new Date().getFullYear());
    } else {
        Ext.getCmp('year').setValue(YEAR);
    }
    if (MONTH == null || MONTH == '') {
        Ext.getCmp('month').setValue(new Date().getMonth() + 1);
    } else {
        Ext.getCmp('month').setValue(MONTH);
    }
    if (WEEK == null || WEEK == '') {
        Ext.getCmp('week').setValue(getWeekOfMonth());
    } else {
        Ext.getCmp('week').setValue(WEEK);
    }
    Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
    Ext.data.StoreManager.lookup('zyqStore').load({
        params: {
            'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
            'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
            'V_V_DEPTCODENEXT': '%',
            'V_V_DEPTTYPE': '主体作业区'
        }
    });

   /* Ext.data.StoreManager.lookup('ckStore').on('load', function () {

        if (V_ORGCODE == null || V_ORGCODE == '') {
            Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
        } else {
            var index = Ext.data.StoreManager.lookup('ckStore').findBy(function (record, id) {
                return record.get('V_DEPTCODE') == V_ORGCODE;
            });
            if (index == -1) {
                Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
            } else {
                Ext.getCmp('ck').select(V_ORGCODE);
            }
        }


    });*/
    Ext.getCmp('ck').on('change', function () {
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });
    Ext.data.StoreManager.lookup('zyqStore').on('load', function () {

        if (V_DEPTCODE == null || V_DEPTCODE == '') {
            Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
        } else {
            var index = Ext.data.StoreManager.lookup('zyqStore').findBy(function (record, id) {
                return record.get('V_DEPTCODE') == V_DEPTCODE;
            });
            if (index == -1) {
                Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
            } else {
                Ext.getCmp('zyq').select(V_DEPTCODE);
            }
        }

        //加载专业
        Ext.data.StoreManager.lookup('zyStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue()
            }
        });
        //加载设备类型
        Ext.data.StoreManager.lookup('sblxStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
            }
        });
    });
    //作业区改变
    Ext.getCmp('zyq').on('change', function () {
        Ext.data.StoreManager.lookup('zyStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue()
            }
        });
        Ext.data.StoreManager.lookup('sblxStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
            }
        });
    });
    //设备类型改变
    Ext.getCmp('sblx').on('change', function () {
        Ext.data.StoreManager.lookup('sbmcStore').load({
            params: {
                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                v_v_deptcodenext: Ext.getCmp('zyq').getValue(),
                v_v_equtypecode: Ext.getCmp('sblx').getValue()
            }
        });
    });
    //设备类型加载监听
    Ext.data.StoreManager.lookup('sblxStore').on('load', function () {

        Ext.getCmp("sblx").select(V_EQUTYPECODE);

        Ext.data.StoreManager.lookup('sbmcStore').load({
            params: {
                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                v_v_deptcodenext: Ext.getCmp('zyq').getValue(),
                v_v_equtypecode: Ext.getCmp('sblx').getValue()
            }
        });
    });
    //设备名称加载监听
    Ext.data.StoreManager.lookup('sbmcStore').on('load', function () {

        Ext.getCmp("sbmc").select(V_EQUCODE);

    });
    Ext.data.StoreManager.lookup('zyStore').on('load', function () {

        Ext.getCmp("zy").select(Ext.data.StoreManager.lookup('zyStore').getAt(0));

    });

    Ext.getCmp('jhtgdate').setValue(new Date()); 		//编辑窗口计划停工时间默认值
    Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
    Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
    Ext.getCmp('jhjgdate').setValue(new Date());       //编辑窗口计划竣工时间默认值
    Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
    Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));

}

function _close(){
    if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") !=-1) {
        //window.location.href="http://localhost:8080/pm/app/pm/page/PM_03010313/index.html";
        window.close();
    } else {
        window.opener = null;
        window.open("", "_self");
        window.close();
    }
}

function _save() {
    //计划停工时间
    var jhtghour = Ext.getCmp('jhtghour').getValue();
    var jhtgminute = Ext.getCmp('jhtgminute').getValue();
    //var jhtgTime=Ext.Date.format(Ext.ComponentManager.get("jhtgdate").getValue(), 'Y-m-d')+" "+jhtghour+":"+jhtgminute;
    var jhtgTime = Ext.getCmp("jhtgdate").getSubmitValue() + " " + jhtghour + ":" + jhtgminute + ":00";
    //计划竣工时间
    var jhjghour = Ext.getCmp('jhjghour').getValue();
    var jhjgminute = Ext.getCmp('jhjgminute').getValue();
    //var jhjgTime=Ext.Date.format(Ext.ComponentManager.get("jhjgdate").getValue(), 'Y-m-d')+" "+jhjghour+":"+jhjgminute;
    var jhjgTime = Ext.getCmp("jhjgdate").getSubmitValue() + " " + jhjghour + ":" + jhjgminute + ":00";
    //计划类型（月/缺陷）
    var V_MONTHPLAN_CODE = "";
    var V_DEFECTPLAN_CODE = "";
    if (V_PLANTYPE == 'PLAN') {
        V_MONTHPLAN_CODE = V_PLANCODE;
    } else if (V_PLANTYPE == 'DEFECT') {
        V_V_DEFECTPLAN_CODE = V_PLANCODE;
    }
    //模型
    V_JXMX_CODE = guid();
    //保存
    Ext.Ajax.request({
        url: AppUrl + 'basic/PRO_PM_03_PLAN_WEEK_SET',
        method: 'POST',
        params: {
            V_V_INPER: Ext.util.Cookies.get('v_personcode'),               //人员cookies                                    //人员编码
            V_V_GUID: V_WEEKPLAN_GUID,                         //季度计划guid                                                      //计划GUID
            V_V_YEAR: Ext.getCmp('year').getValue(),                        //年份                                            //年份
            V_V_MONTH: Ext.getCmp('month').getValue(),                     //月份                                           //年份
            V_V_WEEK: Ext.getCmp('week').getValue(),                      //周                                          //年份
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),                        //厂矿                                              //厂矿
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),                      //作业区
            V_V_EQUTYPECODE: Ext.getCmp('sblx').getValue(),                  //设备类型                                              //设备类型编码
            V_V_EQUCODE: Ext.getCmp('sbmc').getValue(),                     //设备名称
            V_V_REPAIRMAJOR_CODE: Ext.getCmp('zy').getValue(),              //检修专业
            V_V_CONTENT: Ext.getCmp('jxnr').getValue(),                     //检修内容
            V_V_STARTTIME: jhtgTime,                                       //开始时间
            V_V_ENDTIME: jhjgTime,                                          //结束时间
            V_V_OTHERPLAN_GUID: '',                                  //检修工序编码
            V_V_OTHERPLAN_TYPE: '',                                  //检修模型编码
            V_V_JHMX_GUID: '',                                          //检修标准
            V_V_HOUR: Ext.getCmp('jhgshj').getValue(),
            V_V_BZ: Ext.getCmp('bz').getValue(),
            V_V_DEFECTGUID: ''
        },
        success: function (ret) {
            var resp = Ext.decode(ret.responseText);
            if (resp.V_INFO == '成功') {
                var weekid='0';
                Ext.Ajax.request({//获取V_WEEKID
                    url: AppUrl + 'PM_03/PRO_PM_03_PLAN_WEEK_GET',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_WEEKPLAN_GUID: V_WEEKPLAN_GUID
                    },
                    success: function (resp) {
                        var resp = Ext.decode(resp.responseText);

                        if (resp.list.length == 1) {
                            weekid=resp.list[0].V_WEEKID;
                        }
                    }
                });

                Ext.Ajax.request({//获取所选缺陷GUID
                    url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SEL',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_WEEK_GUID: V_WEEKPLAN_GUID
                    },
                    success: function (resp) {
                        var respguid = Ext.decode(resp.responseText);

                        if (respguid.list.length >0) {

                            for(var i=0;i<respguid.list.length;i++)
                            {
                                Ext.Ajax.request({//保存缺陷详细日志
                                    url: AppUrl + 'cjy/PRO_PM_DEFECT_LOG_SET',
                                    method: 'POST',
                                    async: false,
                                    params: {
                                        V_V_GUID: respguid.list[i].V_DEFECT_GUID,
                                        V_V_LOGREMARK: Ext.util.Cookies.get('v_personname2')+':缺陷导入周计划（'+weekid+'）',
                                        V_V_FINISHCODE: '30',
                                        V_V_KEY:''//缺陷guid

                                    },
                                    success: function (ret) {
                                        var resp = Ext.decode(ret.responseText);
                                        if(resp.V_INFO=='成功'){
                                            //修改缺陷状态
                                            Ext.Ajax.request({
                                                url: AppUrl + 'cjy/PRO_PM_DEFECT_STATE_SET',
                                                method: 'POST',
                                                async: false,
                                                params: {
                                                    V_V_GUID: respguid.list[i].V_DEFECT_GUID,
                                                    V_V_STATECODE: '50',//已计划

                                                },
                                                success: function (ret) {
                                                    var resp = Ext.decode(ret.responseText);
                                                    if(resp.V_INFO=='success'){


                                                    }else{
                                                        alert("修改缺陷状态失败");
                                                    }

                                                }
                                            });

                                        }else{
                                            alert("缺陷日志记录失败");
                                        }

                                    }
                                });
                            }
                        }else{

                            alert("缺陷日志添加错误");
                        }
                    }
                });


                window.close();
                window.opener.closeSelf();
            } else {
                Ext.Msg.alert('操作信息', resp.V_INFO);
            }

        }
    });
}

function bind() {
   var id = GUID;
    if (id != "") {
        Ext.Ajax.request({
            url : AppUrl + 'qx/PRO_PM_07_DEFECT_GET',
            // url: '/NO210201/PRO_PM_DEFECT_GET',
            method : 'POST',
            params : {
                V_V_GUID: id
            },
            success : function(ret) {
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

function OnBackButtonClicked() {
    window.close();
}

function OnSaveButtonClicked() {
    var id = GUID;
    if (Ext.ComponentManager.get("xqyy").getValue() != '') {
        Ext.Ajax.request({
            url : AppUrl + 'qx/PRO_PM_07_DEFECT_SET_XQ',
            params : {
                V_V_GUID : id,
                V_V_PERCODE : Ext.util.Cookies.get("v_personcode"),
                V_V_XQYY : Ext.getCmp('xqyy').getValue()
            },
            success : function(resp) {
                var resp = Ext.JSON.decode(resp.responseText);
                if (resp.list[0].V_INFO == "成功") {
                    alert("保存成功");
                    //window.opener.getReturnValue("yes");
                    window.close();
                    window.opener._selectOverhaulApply();
                } else {
                    Ext.Msg.alert('提示', '保存失败');
                }
            },
            failure : function() {
                Ext.Msg.alert('提示', '保存失败');
            }

        });
    } else {
        Ext.Msg.alert('提示', '录入内容不能为空，请重新输入!');
    }
}