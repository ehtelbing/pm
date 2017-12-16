var sgtype = "";
var guid = "";
var add_id ="";
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

var winlxstore = Ext.create("Ext.data.Store",{
    autoLoad : true,
    storeId : 'winlxstore',
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

var winyystore = Ext.create("Ext.data.Store",{
    autoLoad : true,
    storeId : 'winyystore',
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

var wjgridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'wjgridStore',
    pageSize: 20,
    fields: ['I_ID',
        'V_SG_GUID',
        'V_FILE_GUID',
        'V_FILE_NAME',
        'V_FILE_TYPE',
        'V_PERCODE',
        'V_DATE_IN'
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
        fieldLabel: '整改附件',
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
    height : 550,
    layout : 'vbox',
    title : '事故信息录入',
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
        margin : '30px 0 0 35px'
    },{
        xtype : 'panel',
        region : 'north',
        layout : 'column',
        baseCls: 'my-panel-no-border',
        items : [{
            xtype : 'datefield',
            id : 'entrysj1',
            fieldLabel : '事故发生时间',
            labelAlign : 'right',
            labelWidth : 100,
            width : 310,
            editable : false,
            value : today,
            format : 'Y-m-d',
            margin : '10px 0 0 35px'
        },{
            xtype : 'combo',
            id : 'entryhour',
            store : hoursStore,
            fieldLabel : '小时',
            labelAlign : 'right',
            labelWidth : 40,
            width : 100,
            value : today.getHours(),
            format : 'H',
            margin : '10px 0 0 5px',
            displayField: 'displayField',
            valueField: 'valueField',
            queryMode: 'local',
            editable: false
        },{
            xtype : 'combo',
            id : 'entryminute',
            store : minuteStore,
            fieldLabel : '分钟',
            labelAlign : 'right',
            labelWidth : 40,
            width : 100,
            value : today.getMinutes(),
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
            xtype : 'combo',
            id : 'entryfsdw',
            fieldLabel : '事故发生单位',
            labelAlign : 'right',
            labelWidth : 100,
            width : 260,
            store : winckstore,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            editable: false,
            margin : '10px 0 0 35px'
        },{
            xtype: 'combo',
            id: 'entrylx',
            store : winlxstore,
            fieldLabel: '事故类型',
            labelAlign: 'right',
            labelWidth: 100,
            width : 260,
            displayField: 'V_TYPE_NAME',
            valueField: 'V_TYPE_CODE',
            queryMode: 'local',
            editable: false,
            margin: '10px 0 0 0'
        }]
    },{
        xtype : 'textfield',
        id : 'entryfsdd',
        fieldLabel : '事故发生地点',
        labelAlign : 'right',
        labelWidth : 100,
        width : 520,
        margin : '10px 0 0 35px'
    },{
        xtype : 'textfield',
        id : 'entrydsr',
        fieldLabel : '事故当事人',
        labelAlign : 'right',
        labelWidth : 100,
        width : 520,
        margin : '10px 0 0 35px'
    },{
        xtype : 'panel',
        region : 'north',
        layout : 'column',
        baseCls: 'my-panel-no-border',
        items : [{
            xtype : 'textfield',
            id : 'entrysb',
            fieldLabel : '事故设备',
            labelAlign : 'right',
            labelWidth : 100,
            readOnly : true,
            width : 480,
            margin : '10px 0 0 35px'
        },{
            xtype : 'hidden',
            id : 'entrysbbm'
        }, {
            xtype: 'button',
            text: '...',
            width: 30,
            handler: onEquipSel,
            margin : '10px 0 0 10px'
        }]
    },{
        xtype: 'combo',
        id: 'entryfsyy',
        store : winyystore,
        fieldLabel: '事故发生原因',
        labelAlign: 'right',
        labelWidth: 100,
        width : 520,
        displayField: 'V_YY_NAME',
        valueField: 'V_YY_CODE',
        queryMode: 'local',
        editable: false,
        margin: '10px 0 0 35px'
    },{
        xtype : 'textfield',
        id : 'entryjg',
        fieldLabel : '事故简要经过',
        labelAlign : 'right',
        labelWidth : 100,
        width : 520,
        margin : '10px 0 0 35px'
    },formpanel,fjgrid,
        {
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

//var testdata = [{V_SG_TIEM : 1},{V_SG_TIEM : 2},{V_SG_TIEM : 3}];
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
        'V_SG_NAME'
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
                },{
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
            }, {
                        xtype: 'button',
                        text: '查询',
                        icon : imgpath + '/search.png',
                        width: 60,
                        handler: query
                    }, {
                        xtype: 'button',
                        text: '事故信息录入',
                        width: 120,
                        handler: onBtnEntry,
                        icon : imgpath + '/add.png'
                    }, {
                        xtype: 'button',
                        text: '删除',
                        width: 60,
                        handler: onBtnDel,
                        icon : imgpath + '/delete.png'
                    }
                ]
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
    selType : 'checkboxmodel',
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

    //panel
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

    //window
    Ext.data.StoreManager.lookup('winckstore').on('load',function()
    {
        Ext.getCmp('entryfsdw').select(Ext.data.StoreManager.
            lookup('winckstore').getAt(0));
    });

    Ext.data.StoreManager.lookup('winlxstore').on('load',function()
    {
        Ext.getCmp('entrylx').select(Ext.data.StoreManager.
            lookup('winlxstore').getAt(0));
    });

    Ext.data.StoreManager.lookup('winyystore').on('load',function()
    {
        Ext.getCmp('entryfsyy').select(Ext.data.StoreManager.
            lookup('winyystore').getAt(0));
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

function onBtnEntry(){
    sgtype = 'add';
    add_id = "-1";
    Ext.getCmp('entrymc').setValue('');
    Ext.getCmp('entryfsdd').setValue('');
    Ext.getCmp('entrydsr').setValue('');
    Ext.getCmp('entrysb').setValue('');
    Ext.getCmp('entrysb').setValue('');
    Ext.getCmp('entryjg').setValue('');
    addwindow.show();
}

// 附件查询
function filequery(guid) {
    Ext.data.StoreManager.lookup('wjgridStore').load({
        params: {
            V_V_GUID : guid,
            V_V_FILETYPE : "整改"
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
    if(sgtype == 'add'){
        guid = "";
        for ( var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
                guid += "-";
        }
    }
    Ext.Ajax.request({
        url: AppUrl + 'sg/SG_INF_DATA_ITEM_SAVE',
        method: 'POST',
        async: false,
        params: {
            V_V_ID : add_id,
            V_V_GUID : guid,
            V_V_SG_NAME : Ext.getCmp('entrymc').getValue(),
            V_V_SG_TIME : Ext.util.Format.date(Ext.getCmp('entrysj1').getValue(),'Y-m-d')+" "+
            Ext.getCmp('entryhour').getValue()+":"+Ext.getCmp('entryminute').getValue()+":00",
            V_V_SG_DEPTCODE : Ext.getCmp('entryfsdw').getValue(),
            V_V_SG_PLACE : Ext.getCmp('entryfsdd').getValue(),
            V_V_SG_TYPECODE : Ext.getCmp('entrylx').getValue(),
            V_V_SG_PER : Ext.getCmp('entrydsr').getValue(),
            V_V_SG_EQUCODE : Ext.getCmp('entrysbbm').getValue(),
            V_V_SG_YY : Ext.getCmp('entryfsyy').getValue(),
            V_V_SG_JG : Ext.getCmp('entryjg').getValue()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
        }
    });
    addwindow.hide();
    query();
}

function onBtnCancel(){
    addwindow.hide();
}

function detail(a,value,record){

    return '<div><a href="javascript:onDetail()">编辑</a></div>'
}

function onDetail(){
    sgtype = 'edit';
    add_id = "";
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    guid = seldata[0].data.V_GUID;
    Ext.Ajax.request({
        url: AppUrl + 'sg/SG_INF_DATA_ITEM_SELBYGUID',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID : seldata[0].data.V_GUID
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);

            Ext.getCmp('entrymc').setValue(resp.list[0].V_SG_NAME);
            Ext.getCmp('entrysj1').setValue(resp.list[0].V_SG_TIEM.split(' ')[0]);
            Ext.getCmp('entryhour').setValue(resp.list[0].V_SG_TIEM.split(' ')[1].split(':')[0]);
            Ext.getCmp('entryminute').setValue(resp.list[0].V_SG_TIEM.split(' ')[1].split(':')[1]);
            Ext.getCmp('entryfsdw').setValue(resp.list[0].V_DEPTCODE);
            Ext.getCmp('entryfsdd').setValue(resp.list[0].V_SG_DD);
            Ext.getCmp('entrylx').setValue(resp.list[0].V_SG_TYPE);


            Ext.getCmp('entrydsr').setValue(resp.list[0].V_SG_PER);
            Ext.getCmp('entrysb').setValue(resp.list[0].V_SG_EQU);
            Ext.getCmp('entryfsyy').setValue(resp.list[0].V_SG_YY);
            Ext.getCmp('entryjg').setValue(resp.list[0].V_SG_JG);

        }
    });
    addwindow.show();
}


function renderTime(value, metaData, record, rowIdx,
                               colIdx, store, view) {
    return Ext.util.Format.date(value, 'Y-m-d H:i');
}

//设备选择
function onEquipSel() {
    var owidth = window.document.body.offsetWidth-200;
    var oheight = window.document.body.offsetHeight-100 ;
    var ret = window.open(AppUrl+'page/No410601/Index.html?DEPTCODE=' + Ext.getCmp('entryfsdw').getValue() + '', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}

function getEquipReturnValue(ret){
    var str = [];
    str = ret.split('^');
    Ext.getCmp('entrysbbm').setValue(str[0]);
    Ext.getCmp('entrysb').setValue(str[1]);
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
        Ext.getCmp('V_V_FILETYPE').setValue("整改");
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