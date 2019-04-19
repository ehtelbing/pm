var Guid="";
var Defectguid="";
if(Ext.urlDecode(location.href.split("?")[1])!=null){
    Guid=Ext.urlDecode(location.href.split('?')[1]).guid==null?"":Ext.urlDecode(location.href.split('?')[1]).guid;
    Defectguid=Ext.urlDecode(location.href.split("?")[1]).Defectguid==null?"":Ext.urlDecode(location.href.split("?")[1]).Defectguid;
}
Ext.onReady(function(){
    var gridStore=Ext.create('Ext.data.Store',{
        id:'gridStore',
        fields:['INDATE','INPERCODE','V_PERSONNAME','PASS_STATE','PASS_STATENAME'],
        autoLoad:true,
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PM_DEFECT_LOG_FROMPRO_NEW_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'V_PROGUID':Guid,
                'V_DEFECTGUID':Defectguid
            }
        }
    });
    var girdPanel=Ext.create('Ext.grid.Panel',{
        id:'girdPanel',
        region:'center',
        columnLines:true,
        autoScroll:true,
        store:gridStore,
        columns:[
            {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text: '审批时间',width: 160, dataIndex: 'INDATE', align: 'center',renderer:timeTurn},
            {text: '审批人',width: 160, dataIndex: 'V_PERSONNAME', align: 'center'},
            {text: '审批状态',width: 160, dataIndex: 'PASS_STATENAME', align: 'center'}
        ]
    });
    Ext.create('Ext.container.Viewport',{
        id:'main',
        layout:'border',
        items:[girdPanel]
    });
});
function timeTurn(value,mateData,records){
    mateData.style="text-align:center";
    return value.toString().substring(0,11);
}