var addtemp;
var today = new Date();
var Hours = [];
for (var i = 0; i <= 23; i++)Hours.push({displayField: i, valueField: i});

var Minutes = [];
for (var i = 0; i <= 59; i++)Minutes.push({displayField: i, valueField: i});

var hoursStore = Ext.create('Ext.data.Store', {
    id: 'hoursStore',
    autoLoad: true,
    fields: ['displayField', 'valueField'],
    data: Hours,
    proxy: {
        type: 'memory',
        render: {
            type: 'json'
        }
    }
});

var minuteStore = Ext.create('Ext.data.Store', {
    id: 'minuteStore',
    autoLoad: true,
    fields: ['displayField', 'valueField'],
    data: Minutes,
    proxy: {
        type: 'memory',
        render: {
            type: 'json'
        }
    }
});

var ckstore = Ext.create("Ext.data.Store",{
    autoLoad : true,
    storeId : 'ckstore',
    fields : ['V_DEPTNAME','V_DEPTCODE'],
    proxy : {
        type : 'ajax',
        url : AppUrl + 'sg/PRO_BASE_DEPT_SEL',
        async : false,
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        },
        extraParams : {
            V_V_DEPTCODE : '',
            V_V_DEPTNAME : '',
            V_V_DEPTTYPE : '[基层单位]'
        }

    }
});

var lxstore = Ext.create("Ext.data.Store",{
    autoLoad : true,
    storeId : 'lxstore',
    fields : ['V_TYPE_CODE','V_TYPE_NAME'],
    proxy : {
        type : 'ajax',
        url : AppUrl + 'sg/SG_INF_TYPE_SEL',
        async : false,
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        },
        extraParams : {

        }
    }
});

var yystore = Ext.create("Ext.data.Store",{
    autoLoad : true,
    storeId : 'yystore',
    fields : ['V_YY_CODE','V_YY_NAME'],
    proxy : {
        type : 'ajax',
        url : AppUrl + 'sg/SG_INF_REASON_SEL',
        async : false,
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        },
        extraParams : {

        }
    }
});

var winckstore = Ext.create("Ext.data.Store",{
    autoLoad : true,
    storeId : 'winckstore',
    fields : ['V_DEPTNAME','V_DEPTCODE'],
    proxy : {
        type : 'ajax',
        url : AppUrl + 'sg/PRO_BASE_DEPT_SEL',
        async : false,
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        },
        extraParams : {
            V_V_DEPTCODE : '',
            V_V_DEPTNAME : '',
            V_V_DEPTTYPE : '[基层单位]'
        }

    }
});

var wjgridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'wjgridStore',
    pageSize: 20,
    fields: ['I_ID',
        'V_SG_GUID',
        'V_FILE_GUID',
        'V_FILE_NAME',
        'V_FILE_TYPE',
        'V_FILE_PER',
        'V_FILE_TIME'
    ],
    //data : testdata,
    //proxy : {
    //    type : 'memory',
    //    render : {
    //        type : 'json'
    //    }
    //}
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'sg/SG_INF_FILE_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var fjgrid = Ext.create("Ext.grid.Panel", {
    xtype: 'gridpanel',
    id: 'fjgrid',
    region: 'center',
    height: 100,
    width: 415,
    columnLines: true,
    store: wjgridStore,
    autoScroll: true,
    margin: '10px 0 0 140px',
    colspan: 3,
    columns: [{
        text: '附件名称',
        flex: 0.7,
        align: 'center',
        dataIndex : "V_FILE_NAME",
        renderer : downloadRander
    }, {
        text: '操作',
        flex: 0.3,
        align: 'center',
        renderer : delRander
    }]
});

var formpanel = Ext.create('Ext.form.Panel', {
    frame : true,
    id : 'formpanel',
    region : 'north',
    layout : 'column',
    fileUpload:true,
    baseCls: 'my-panel-no-border',
    enctype :"multipart/form-data",
    items : [ {
        xtype: 'filefield',
        id : 'upload',
        name : 'upload',
        enctype :"multipart/form-data",
        fieldLabel: '检修附件',
        buttonText: '选择文件',
        labelAlign : 'right',
        labelWidth: 100,
        width : 450,
        margin: '10px 0 0 35px'
    },{
        xtype: 'button',
        text: '上传',
        width: 60,
        handler: uploadfile,
        margin : '10px 0 0 10px'
    },
        {xtype:'hidden',name:'V_V_GUID',id:'V_V_GUID'},
        {xtype:'hidden',name:'V_V_FILEGUID',id:'V_V_FILEGUID'},
        {xtype:'hidden',name:'V_V_FILETYPE',id:'V_V_FILETYPE'},
        {xtype:'hidden',name:'V_V_FILEPER',id:'V_V_FILEPER'},
        {xtype:'hidden',name:'V_V_FILETIME',id:'V_V_FILETIME'},
        {xtype:'hidden',name:'V_V_FILENAME',id:'V_V_FILENAME'}
    ]
});

var addwindow = Ext.create('Ext.window.Window', {
    id : 'addwindow',
    width : 650,
    height : 620,
    layout : 'vbox',
    title : '事故检修信息录入',
    modal : true,
    frame : true,
    closeAction : 'hide',
    closable : true,
    items : [{
        xtype : 'textfield',
        id : 'entrymc',
        fieldLabel : '事故名称',
        labelAlign : 'right',
        labelWidth : 100,
        width : 520,
        margin : '30px 0 0 35px',
        readOnly :true
    },{
        xtype : 'panel',
        region : 'north',
        layout : 'column',
        baseCls: 'my-panel-no-border',
        items : [{
            xtype : 'textfield',
            id : 'entryfssj',
            fieldLabel : '事故发生时间',
            labelAlign : 'right',
            labelWidth : 100,
            width : 520,
            editable : false,
            value : today,
            format : 'Y-m-d',
            margin : '10px 0 0 35px',
            readOnly :true
        }]
    },{
        xtype : 'panel',
        region : 'north',
        layout : 'column',
        baseCls: 'my-panel-no-border',
        items : [{
            xtype : 'combo',
            id : 'entryfsdw',
            fieldLabel : '事故发生单位',
            labelAlign : 'right',
            labelWidth : 100,
            width : 260,
            store : ckstore,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            editable: false,
            margin : '10px 0 0 35px',
            readOnly :true
        },{
            xtype: 'combo',
            id: 'entrylx',
            store : lxstore,
            fieldLabel: '事故类型',
            labelAlign: 'right',
            labelWidth: 100,
            width : 260,
            displayField: 'V_TYPE_NAME',
            valueField: 'V_TYPE_CODE',
            queryMode: 'local',
            editable: false,
            margin: '10px 0 0 0',
            readOnly :true
        }]
    },{
        xtype : 'textfield',
        id : 'entryfsdd',
        fieldLabel : '事故发生地点',
        labelAlign : 'right',
        labelWidth : 100,
        width : 520,
        margin : '10px 0 0 35px',
        readOnly :true
    },{
        xtype : 'textfield',
        id : 'entrysb',
        fieldLabel : '事故设备',
        labelAlign : 'right',
        labelWidth : 100,
        width : 520,
        margin : '10px 0 0 35px',
        readOnly :true
    },{
        xtype : 'panel',
        region : 'north',
        layout : 'column',
        baseCls: 'my-panel-no-border',
        items : [{
            xtype: 'datefield',
            id: 'entryjxkssj',
            fieldLabel: '检修开始时间',
            labelAlign: 'right',
            labelWidth: 100,
            width : 310,
            format : 'Y-m-d',
            margin: '10px 0 0 35px',
            editable : false
        },{
            xtype : 'combo',
            id : 'entryshour',
            store : hoursStore,
            fieldLabel : '小时',
            labelAlign : 'right',
            labelWidth : 40,
            width : 100,
            format : 'H',
            margin : '10px 0 0 5px',
            displayField: 'displayField',
            valueField: 'valueField',
            queryMode: 'local',
            editable: false
        },{
            xtype : 'combo',
            id : 'entrysminute',
            store : minuteStore,
            fieldLabel : '分钟',
            labelAlign : 'right',
            labelWidth : 40,
            width : 100,
            format : 'i',
            margin : '10px 0 0 5px',
            displayField: 'displayField',
            valueField: 'valueField',
            queryMode: 'local',
            editable: false
        }]
    },{
        xtype : 'panel',
        region : 'north',
        layout : 'column',
        baseCls: 'my-panel-no-border',
        items : [{
            xtype: 'datefield',
            id: 'entryjxjssj',
            fieldLabel: '检修结束时间',
            labelAlign: 'right',
            labelWidth: 100,
            width : 310,
            format : 'Y-m-d',
            margin: '10px 0 0 35px',
            editable : false
        },{
            xtype : 'combo',
            id : 'entryehour',
            store : hoursStore,
            fieldLabel : '小时',
            labelAlign : 'right',
            labelWidth : 40,
            width : 100,
            format : 'H',
            margin : '10px 0 0 5px',
            displayField: 'displayField',
            valueField: 'valueField',
            queryMode: 'local',
            editable: false
        },{
            xtype : 'combo',
            id : 'entryeminute',
            store : minuteStore,
            fieldLabel : '分钟',
            labelAlign : 'right',
            labelWidth : 40,
            width : 100,
            format : 'i',
            margin : '10px 0 0 5px',
            displayField: 'displayField',
            valueField: 'valueField',
            queryMode: 'local',
            editable: false
        }]
    },{
        xtype : 'panel',
        region : 'north',
        layout : 'column',
        baseCls: 'my-panel-no-border',
        items : [{
            xtype : 'textfield',
            id : 'entryjxhj',
            fieldLabel : '检修合计(小时)',
            labelAlign : 'right',
            labelWidth : 120,
            width : 310,
            margin : '10px 0 0 15px'
        },{
            xtype : 'displayfield',
            fieldLabel : '小时',
            labelWidth : 40,
            width : 100,
            margin : '10px 0 0 5px',
            labelSeparator : ""
        }]
    },{
        xtype: 'combo',
        id: 'entryjxdw',
        fieldLabel: '检修单位',
        labelAlign : 'right',
        store : winckstore,
        labelWidth : 100,
        width : 520,
        margin : '10px 0 0 35px',
        displayField: 'V_DEPTNAME',
        valueField: 'V_DEPTCODE',
        queryMode: 'local',
        editable: false,
        margin : '10px 0 0 35px'
    },{
        xtype : 'textarea',
        id : 'entryjxbz',
        fieldLabel : '检修备注',
        labelAlign : 'right',
        labelWidth : 100,
        width : 520,
        margin : '10px 0 0 35px'
    },formpanel,fjgrid,{
        xtype : 'panel',
        region : 'north',
        layout : 'column',
        baseCls: 'my-panel-no-border',
        items : [{
            xtype : 'button',
            text : '提交',
            width : '80',
            handler : onBtnSubmit,
            margin : '30px 0 0 230px'
        },{
            xtype : 'button',
            text : '返回',
            width : '80',
            handler : onBtnCancel,
            margin : '30px 0 0 150px'
        }]
    }]
});

//var testdata = [{MATERIALCODE : 1},{MATERIALCODE : 2},{MATERIALCODE : 3}];
var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    pageSize: 20,
    fields: ['V_DEPTCODE',
        'V_DEPTNAME',
        'V_SG_TIEM',
        'V_SG_DD',
        'V_SG_EQU',
        'V_SG_TYPE',
        'V_TYPE_NAME',
        'V_SG_YY',
        'V_YY_NAME',
        'V_SG_JG',
        'V_GUID',
        'V_SG_PER',
        'V_SG_NAME',
        'V_JX_STIME',
        'V_JX_ETIME',
        'V_JX_TIME',
        'V_JX_MARK',
        'V_JX_DEPTCODE',
        'V_JX_DEPTNAME'
    ],
    //data : testdata,
    //proxy : {
    //    type : 'memory',
    //    render : {
    //        type : 'json'
    //    }
    //}
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'sg/SG_INF_DATA_ITEM_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var panel = Ext.create('Ext.form.Panel', {
    id: 'panel',
    region: 'north',
    layout: 'column',
    width: '100%',
    frame:true,
    defaults : {
        style : 'margin:5px 0px 5px 5px',
        labelAlign : 'right'
    },
    items: [
                {
                    id: 'mc',
                    xtype: 'textfield',
                    fieldLabel: '事故名称',
                    labelAlign: 'right',
                    labelWidth: 100,
                    width: 900
                },
                {
                    xtype: 'datefield',
                    id: 'stime',
                    fieldLabel: '事故发生时间',
                    labelAlign: 'right',
                    labelWidth: 100,
                    value:Ext.util.Format.date(Ext.Date.add(new Date(),Ext.Date.DAY,+1-today.getDate()),"Y-m-d"),
                    editable: false,
                    format : 'Y-m-d'
                }, {
                    xtype: 'datefield',
                    id: 'etime',
                    fieldLabel: '至',
                    labelAlign: 'right',
                    labelWidth: 100,
                    queryMode: 'local',
                    value : new Date(),
                    editable: false,
                    format : 'Y-m-d'
                }, {
                    xtype: 'combo',
                    id: 'ck',
                    fieldLabel: '事故厂矿',
                    store : ckstore,
                    labelAlign: 'right',
                    labelWidth: 100,
                    displayField: 'V_DEPTNAME',
                    valueField: 'V_DEPTCODE',
                    queryMode: 'local',
                    editable: false
                }, {
                    xtype: 'combo',
                    id: 'type',
                    store : lxstore,
                    fieldLabel: '事故类型',
                    labelAlign: 'right',
                    labelWidth: 100,
                    displayField: 'V_TYPE_NAME',
                    valueField: 'V_TYPE_CODE',
                    queryMode: 'local',
                    editable: false
                },
            {
                    xtype: 'combo',
                    id: 'reason',
                    store : yystore,
                    fieldLabel: '事故原因',
                    labelAlign: 'right',
                    labelWidth: 100,
                    displayField: 'V_YY_NAME',
                    valueField: 'V_YY_CODE',
                    queryMode: 'local',
                    editable: false
                },    {
                    xtype: 'button',
                    text: '查询',
                    icon : imgpath + '/search.png',
                    width: 60,
                    handler: query
                }, {
                    xtype: 'button',
                    text: '删除',
                    width: 60,
                    handler: onBtnDel,
                    icon : imgpath + '/delete.png'
                }]
});

var grid = Ext.create("Ext.grid.Panel", {
    xtype: 'gridpanel',
    id: 'grid',
    region: 'center',
    height: 500,
    width : '100%',
    columnLines: true,
    store: gridStore,
    autoScroll: true,
    columns: [
        {
            text: '序号',
            xtype : 'rownumberer',
            align: 'center',
            labelAlign: 'right',
            width: 100
        }, {
            text: '事故发生时间',
            dataIndex: 'V_SG_TIEM',
            align: 'center',
            width: 150,
            renderer : renderTime
        }, {
            text: '事故发生单位',
            dataIndex: 'V_DEPTNAME',
            align: 'center',
            width: 120
        }, {
            text: '事故发生地点',
            dataIndex: 'V_SG_DD',
            align: 'center',
            width: 150
        }, {
            text: '事故类型',
            dataIndex: 'V_TYPE_NAME',
            align: 'center',
            width: 100
        }, {
            text: '事故原因',
            dataIndex: 'V_YY_NAME',
            align: 'center',
            width: 100
        }, {
            text: '事故设备',
            dataIndex: 'V_SG_EQU',
            align: 'center',
            width: 100
        }, {
            text: '事故名称',
            dataIndex: 'V_SG_NAME',
            align: 'center',
            width: 100
        }, {
            text: '检修开始时间',
            dataIndex: 'V_JX_STIME',
            align: 'center',
            width: 150
        }, {
            text: '检修结束时间',
            dataIndex: 'V_JX_ETIME',
            align: 'center',
            width: 150
        }, {
            text: '检修单位',
            dataIndex: 'V_JX_DEPTNAME',
            align: 'center',
            width: 100
        }, {
            text: '检修合计(小时)',
            dataIndex: 'V_JX_TIME',
            align: 'center',
            width: 100
        }, {
            text: '详细',
            align: 'center',
            width: 60,
            renderer : detail
        }]
});


Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel, grid]
    });
    //query();

    Ext.data.StoreManager.lookup('ckstore').on('load',function()
    {
        Ext.getCmp('ck').store.insert(0, { 'V_DEPTCODE': '%', 'V_DEPTNAME': '全部' });
        Ext.getCmp('ck').select(Ext.data.StoreManager.
            lookup('ckstore').getAt(0));
    });

    Ext.data.StoreManager.lookup('lxstore').on('load',function()
    {
        Ext.getCmp('type').store.insert(0, { 'V_TYPE_CODE': '%', 'V_TYPE_NAME': '全部' });
        Ext.getCmp('type').select(Ext.data.StoreManager.
            lookup('lxstore').getAt(0));
    });

    Ext.data.StoreManager.lookup('yystore').on('load',function()
    {
        Ext.getCmp('reason').store.insert(0, { 'V_YY_CODE': '%', 'V_YY_NAME': '全部' });
        Ext.getCmp('reason').select(Ext.data.StoreManager.
            lookup('yystore').getAt(0));
    });

});

// 查询
function query() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_SG_NAME : Ext.getCmp('mc').getValue(),
            V_V_SG_STIME : Ext.util.Format.date(Ext.getCmp('stime').getValue(), 'Y-m-d'),
            V_V_SG_ETIME : Ext.util.Format.date(Ext.getCmp('etime').getValue(), 'Y-m-d'),
            V_V_SG_DEPT : Ext.getCmp('ck').getValue(),
            V_V_SG_TYPE : Ext.getCmp('type').getValue(),
            V_V_SG_YY : Ext.getCmp('reason').getValue()
        }
    });
}

// 附件查询
function filequery(guid) {
    Ext.data.StoreManager.lookup('wjgridStore').load({
        params: {
            V_V_GUID : guid,
            V_V_FILETYPE : "检修"
        }
    });
}

function onBtnDel(){
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if(seldata.length <1){
        alert("请选择一条事故进行删除");
        return false;
    }
    for(var i=0;i<seldata.length;i++){
        Ext.Ajax.request({
            url: AppUrl + 'sg/SG_INF_DATA_ITEM_DEL',
            method: 'POST',
            async: false,
            params: {
                V_V_GUID : seldata[i].data.V_GUID
            },
            success: function (ret) {
                var resp = Ext.JSON.decode(ret.responseText);
            }
        });
    }
    query();
}

function onBtnSubmit(){
    infosave();
    //filesave();
}

function infosave(){
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    var guid = seldata[0].data.V_GUID;
    var v_id;
    if(addtemp == 0){
        v_id = -1;
    }
    else{
        v_id = addtemp;
    }
    Ext.Ajax.request({
        url: AppUrl + 'sg/SG_JX_INF_ITEM_EDIT',
        method: 'POST',
        async: false,
        params: {
            V_V_ID : v_id,
            V_V_GUID : guid,
            V_V_STIME : Ext.util.Format.date(Ext.getCmp('entryjxkssj').getValue(),'Y-m-d')+' '+
            Ext.getCmp('entryshour').getValue()+':'+Ext.getCmp('entrysminute').getValue()+':00',
            V_V_ETIME : Ext.util.Format.date(Ext.getCmp('entryjxjssj').getValue(),'Y-m-d')+' '+
            Ext.getCmp('entryehour').getValue()+':'+Ext.getCmp('entryeminute').getValue()+':00',
            V_V_ORG : Ext.getCmp('entryjxdw').getValue(),
            V_V_HJ : Ext.getCmp('entryjxhj').getValue(),
            V_V_BZ : Ext.getCmp('entryjxbz').getValue()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
        }
    });
    addwindow.hide();
    query();
}

function filesave(){

}
function onBtnCancel(){
    addwindow.hide();
}

function detail(){
    return '<div><a href="javascript:onDetail()">编辑</a></div>'
}


function onDetail(){
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    var guid = seldata[0].data.V_GUID;
    Ext.Ajax.request({
        url: AppUrl + 'sg/SG_INF_DATA_ITEM_SELBYGUID',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID : seldata[0].data.V_GUID
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            addtemp = resp.list[0].V_JX_ID;
            Ext.getCmp('entrymc').setValue(resp.list[0].V_SG_NAME);
            Ext.getCmp('entryfssj').setValue(resp.list[0].V_SG_TIEM);
            Ext.getCmp('entryfsdw').setValue(resp.list[0].V_DEPTNAME);
            Ext.getCmp('entryfsdd').setValue(resp.list[0].V_SG_DD);
            Ext.getCmp('entrysb').setValue(resp.list[0].V_SG_EQU);
            Ext.getCmp('entrylx').setValue(resp.list[0].V_SG_TYPE);

            if(resp.list[0].V_JX_STIME != null){
                Ext.getCmp('entryjxkssj').setValue(resp.list[0].V_JX_STIME.split(' ')[0]);
                Ext.getCmp('entryshour').setValue(resp.list[0].V_JX_STIME.split(' ')[1].split(':')[0]);
                Ext.getCmp('entrysminute').setValue(resp.list[0].V_JX_STIME.split(' ')[1].split(':')[1]);
                Ext.getCmp('entryjxjssj').setValue(resp.list[0].V_JX_ETIME.split(' ')[0]);
                Ext.getCmp('entryehour').setValue(resp.list[0].V_JX_ETIME.split(' ')[1].split(':')[0]);
                Ext.getCmp('entryeminute').setValue(resp.list[0].V_JX_ETIME.split(' ')[1].split(':')[1]);
            }
            Ext.getCmp('entryjxhj').setValue(resp.list[0].V_JX_TIME);
            Ext.getCmp('entryjxdw').setValue(resp.list[0].V_JX_DEPTCODE);
            Ext.getCmp('entryjxbz').setValue(resp.list[0].V_JX_MARK);

        }
    });
    filequery(guid);
    addwindow.show();
}


function renderTime(value, metaData, record, rowIdx,
                               colIdx, store, view) {
    return Ext.util.Format.date(value, 'Y-m-d H:i');
}

function uploadfile(){
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    var guid = seldata[0].data.V_GUID;
    var fileguid = "";
    for ( var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        fileguid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            fileguid += "-";
    }
    var form = Ext.getCmp('formpanel');
    if (Ext.getCmp('upload').getValue() != "") {
        Ext.getCmp('V_V_GUID').setValue(guid);
        Ext.getCmp('V_V_FILEGUID').setValue(fileguid);
        Ext.getCmp('V_V_FILETYPE').setValue("检修");
        Ext.getCmp('V_V_FILEPER').setValue(Ext.util.Cookies.get('v_personcode'));
        Ext.getCmp('V_V_FILETIME').setValue(Ext.util.Format.date(today,'Y-m-d'));
        form.submit({
            url: AppUrl + 'sg/uploadFile',
            async: false,
            waitMsg: '上传中...',
            method: 'POST',
            success: function (ret) {
                var resp = Ext.JSON.decode(ret.responseText);
                filequery(guid);
            }
            //failure: function (resp) {
            //    Ext.Msg.alert('提示信息', '上传失败');
            //}
        });
    }
}

function delRander(a, value, metaData) {
    return '<a href="javascript:onDel(\'' + metaData.data.V_FILE_GUID + '\')">删除</a>';
}

function downloadRander(a,value,metaData){
    return '<a href="javascript:onDownload(\'' + metaData.data.V_FILE_GUID + '\',\'' + metaData.data.V_FILE_NAME + '\')">'+a+'</a>';
}

function onDel(fileguid){
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    var guid = seldata[0].data.V_GUID;
    Ext.Ajax.request({
        url: AppUrl + 'sg/SG_INF_FILE_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_FILEGUID : fileguid
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            filequery(guid);
        }
    });
}

function onDownload(fileguid,filename){
    var form = Ext.getCmp('formpanel');
    Ext.getCmp('V_V_FILEGUID').setValue(fileguid);
    Ext.getCmp('V_V_FILENAME').setValue(filename);
    form.submit({
        url: AppUrl + 'sg/downloadFile',
        async: false,
        //waitMsg: '上传中...',
        method: 'POST',
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
        }
    });
}