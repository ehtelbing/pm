
var I_ID = -1;
var V_ORDERGUID = "";
var V_MATERIALGUID = "";
if (location.href.split('?')[1] != undefined) {
    V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
}

if (location.href.split('?')[1] != undefined) {
    V_MATERIALGUID = Ext.urlDecode(location.href.split('?')[1]).V_MATERIALGUID;
}

var fjgridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'fjgridStore',
    pageSize: 20,
    fields: ['I_ID',
        'V_ORDERGUID',
        'V_MATERIALGUID',
        'V_FILE_GUID',
        'V_FILE_NAME',
        'V_FILE_TYPE',
        'V_PERCODE',
        'V_DATE_IN',
        'V_FILE_TIME',
        'V_FILE_PER'
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
        url: AppUrl + 'zdh/WX_INF_FILE_SEL',
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
    region: 'north',
    height: 150,
    width: 415,
    columnLines: true,
    store: fjgridStore,
    autoScroll: true,
    margin: '10px 0 0 140px',
    colspan : 2,
    columns: [{
        text: '附件名称',
        flex: 0.3,
        align: 'center',
        dataIndex : "V_FILE_NAME"
    },{
        text: '上传人',
        flex: 0.2,
        align: 'center',
        dataIndex : "V_FILE_PER"
    },{
        text: '上传时间',
        flex: 0.3,
        align: 'center',
        dataIndex : "V_FILE_TIME"
    },{
        text: '下载',
        flex: 0.1,
        align: 'center',
        renderer : downloadRander
    }, {
        text: '删除',
        flex: 0.1,
        align: 'center',
        renderer : delRander
    }]
});

var formpanel = Ext.create('Ext.form.Panel', {
    frame : true,
    id : 'formpanel',
    region : 'center',
    layout :{
        type : 'table',
        columns : 2
    },
    fileUpload:true,
    enctype :"multipart/form-data",
    defults : {
    },
    items : [ {
        xtype: 'filefield',
        id : 'upload',
        name : 'upload',
        enctype :"multipart/form-data",
        fieldLabel: '附件名称',
        buttonText: '浏览',
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
    },fjgrid,
        {xtype:'hidden',name:'V_V_ORDERGUID',id:'V_V_ORDERGUID'},
        {xtype:'hidden',name:'V_V_MATERIALGUID',id:'V_V_MATERIALGUID'},
        {xtype:'hidden',name:'V_V_FILEGUID',id:'V_V_FILEGUID'},
        {xtype:'hidden',name:'V_V_FILETYPE',id:'V_V_FILETYPE'},
        {xtype:'hidden',name:'V_V_FILEPER',id:'V_V_FILEPER'},
        {xtype:'hidden',name:'V_V_FILETIME',id:'V_V_FILETIME'},
        {xtype:'hidden',name:'V_V_FILENAME',id:'V_V_FILENAME'}
    ]
});



// 附件查询
function filequery() {
    Ext.data.StoreManager.lookup('fjgridStore').load({
        params: {
            V_V_ORDERGUID : V_ORDERGUID,
            V_V_MATERIALGUID : V_MATERIALGUID,
            V_V_FILENAME : '%'
        }
    });
}

Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [formpanel]
    });
    filequery();
});

function delRander(a, value, metaData) {
    return '<a href="javascript:onDel(\'' + metaData.data.V_FILE_GUID + '\')"><img src= "'+imgpath +'/delete1.png"></a>';
}

function downloadRander(a,value,metaData){
    return '<a href="javascript:onDownload(\'' + metaData.data.V_FILE_GUID + '\',\'' + metaData.data.V_FILE_NAME + '\')"><img src= "'+imgpath +'/saved.png"></a>';
}

function onDel(fileguid){
    Ext.Ajax.request({
        url: AppUrl + 'zdh/WX_ORDER_FILE_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_FILEGUID : fileguid
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            filequery();
        }
    });
}

function onDownload(fileguid,filename){
    var form = Ext.getCmp('formpanel');
    Ext.getCmp('V_V_FILEGUID').setValue(fileguid);
    Ext.getCmp('V_V_FILENAME').setValue(filename);
    form.submit({
        url: AppUrl + 'zdh/downloadFile',
        async: false,
        //waitMsg: '上传中...',
        method: 'POST',
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
        }
    });
}

function uploadfile(){
    var fileguid = "";
    for ( var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        fileguid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            fileguid += "-";
    }
    var form = Ext.getCmp('formpanel');
    if (Ext.getCmp('upload').getValue() != "") {
        Ext.getCmp('V_V_ORDERGUID').setValue(V_ORDERGUID);
        Ext.getCmp('V_V_MATERIALGUID').setValue(V_MATERIALGUID);
        Ext.getCmp('V_V_FILEGUID').setValue(fileguid);
        Ext.getCmp('V_V_FILEPER').setValue(Ext.util.Cookies.get('v_personcode'));
        Ext.getCmp('V_V_FILETIME').setValue(Ext.util.Format.date(new Date(),'Y-m-d'));
        form.submit({
            url: AppUrl + 'zdh/uploadFile',
            async: false,
            waitMsg: '上传中...',
            method: 'POST',
            success: function (ret) {
                var resp = Ext.JSON.decode(ret.responseText);
                filequery();
            }
            //failure: function (resp) {
            //    Ext.Msg.alert('提示信息', '上传失败');
            //}
        });
    }
}