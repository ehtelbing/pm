

var workguid="";
if(Ext.urlDecode(location.href.split("?")[1])!=undefined){
    workguid=Ext.urlDecode(location.href.split('?')[1]).V_GUID==null?"":Ext.urlDecode(location.href.split('?')[1]).V_GUID;
}

Ext.onReady(function(){
    Ext.QuickTips.init();
    var gridStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'gridStore',
        fields: ['FILEGUID', 'FILENAME', 'FILETYPECODE', 'FINTIME', 'FINPER','FPAGESIGN'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/WORK_FILE_SELECT',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                V_WOEKGUID: workguid,
                 V_PERCODE:Ext.util.Cookies.get("v_personcode")
            },
            reader: {
                type: 'json',
                root: 'list'
            }

        }
    });


    var gridPanel=Ext.create('Ext.grid.Panel',{
        id:'gridPanel',
        frame:true,
        border:false,
        columnLines:true,
        store:gridStore,
        region:'center',
        // selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
        //     selType: 'checkboxmodel',
        //     mode: 'SIMPLE'
        // },
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            //{text: '附件编码', width: 250, dataIndex: 'FILEGUID', align: 'center', renderer: atleft},
            {text: '附件名称', width: 250, dataIndex: 'FILENAME', align: 'center', renderer: atleft},
            //{text: '附件类型', width: 250, dataIndex: 'FILETYPECODE', align: 'center', renderer: atleft},
            {text: '附件时间', width: 250, dataIndex: 'FINTIME', align: 'center', renderer: timelfet},
            //{text: '上传人', width: 250, dataIndex: 'FINPER', align: 'center', renderer: atleft},
            {text: '工厂单位', width: 250, dataIndex: 'FPAGESIGN', align: 'center', renderer: atleft},
            {text: '附件下载', width: 250,  align: 'center', renderer: xiazai}
        ]
        /*,
       bbar: [{
           id: 'page',
           xtype: 'pagingtoolbar',
           dock: 'bottom',
           displayInfo: true,
           displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
           emptyMsg: '没有记录',
           store: 'gridStore'
       }]*/
    });
    Ext.create('Ext.container.Viewport',{
        id:'main',
        layout:'border',
        items:[gridPanel]
    });
});

function OnPageLoad() {
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/WORK_FILE_SELECT',
        method: 'POST',
        async: false,
        params: {
            V_GUID: V_V_GUID
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.list.length > 0) {
                for (var i = 0; i < resp.list.length; i++) {
                    NTKOATTACH_OCX.AddServerFile(AppUrl + 'dx_file/WORK_FILE_DOWN?V_FILEGUID=' + resp.list[i].FILEGUID, resp.list[i].FILENAME,  resp.list[i].FINTIME);
                }
            }
        }
    });
}



function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
function timelfet(value, metaDate, record, rowIndex, colIndex, store){
    metaDate.style="text-align:center;";
    //return '<div date-qtip="'+value.toString().substring(0,10) + '" >' +value.toString().substring(0,10)+ '</div>';
    return '<div data-qtip="' + value.split('.0')[0] + '" >' + value.split('.0')[0] + '</div>';
}
function xiazai(value, metaData, record) {
    return '<a href="javascript:writeIn(\'' + record.data.FILEGUID + '\')" >下载</a>';
}
function writeIn(fileid) {
    location.href = AppUrl + 'defect/WORK_FILE_DOWN?V_FILEGUID=' + fileid;

}