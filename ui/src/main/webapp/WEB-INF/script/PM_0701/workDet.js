

var defguid="";
if(Ext.urlDecode(location.href.split("?")[1])!=undefined){
    defguid=Ext.urlDecode(location.href.split('?')[1]).V_GUID==null?"":Ext.urlDecode(location.href.split('?')[1]).V_GUID;
}

Ext.onReady(function(){

    var gridStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'gridStore',
        fields: ['I_ID',
            'V_ORDERGUID',
            'V_ORDERID',
            'V_ORDER_TYP',
            'V_ORDER_TYP_TXT',
            'V_FUNC_LOC',
            'V_EQUIP_NO',
            'V_EQUIP_NAME',
            'V_PLANT',
            'V_IWERK',
            'D_START_DATE',
            'D_FINISH_DATE',
            'V_ACT_TYPE',
            'V_PLANNER',
            'V_WORK_CTR',
            'V_SHORT_TXT',
            'V_GSBER',
            'V_GSBER_TXT',
            'V_WORK_AREA',
            'V_WBS',
            'V_WBS_TXT',
            'V_ENTERED_BY',
            'D_ENTER_DATE',
            'V_SYSTEM_STATUS',
            'V_SYSNAME',
            'V_DEPTCODE',
            'V_DEPTCODEREPARIR',
            'V_DEFECTGUID',
            'V_STATECODE',
            'D_FACT_START_DATE',
            'D_FACT_FINISH_DATE',
            'V_WPCODE',
            'V_MODELNUMBER',
            'V_SEND_STATE',
            'D_DATE_EDITTIME',
            'V_EDIT_GUID',
            'D_RECEIVE_DATE',
            'V_SEND_JX',
            'V_JXCLASS_CODE',
            'V_WXPERSON',
            'V_WXTEAM',
            'V_WXPLANTCODE',
            'V_STATE',
            'V_SENDMATERIAL',
            'V_ORDERGUID_UP',
            'V_GUID_DX',
            'V_PROJECT_CODE',
            'V_PROJECT_NAME',
            'V_SUM_REPAIR',
            'V_SUM_MONEY',
            'V_TYPE_S',
            'V_MONEY',
            'V_GL_FAULT',
            'V_EQUSITENAME',
            'V_ORGNAME',
            'V_DEPTNAME',
            'V_PERSONNAME',
            'V_DEPTNAMEREPARIR',
            'PLANTIME',
            'FACTTIME','V_STATENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PRO_PM_WORKORDER_SEL_FROM_DEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams:{
                V_DEL_GUID:defguid
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

        columns: [
            {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text: '工单号', width: 140, dataIndex: 'V_ORDERID', align: 'center', renderer: atleft},
            {text: '工单描述', width: 250, dataIndex: 'V_SHORT_TXT', align: 'center', renderer: atleft},
            {text: '备件消耗', width: 120, dataIndex: 'V_EQUSITENAME', align: 'center', renderer: atleft},
            {text: '委托单位', width: 200, dataIndex: 'V_DEPTNAME', align: 'center', renderer: atleft},
            {text: '委托人', width: 120, dataIndex: 'V_PERSONNAME', align: 'center', renderer: atleft},
            {text: '委托时间', width: 120, dataIndex: 'D_ENTER_DATE', align: 'center', renderer: timelfet},
            {text: '检修单位', width: 150, dataIndex: 'V_DEPTNAMEREPARIR', align: 'center', renderer: atleft},
            {text: '工单类型描述', width: 90, dataIndex: 'V_ORDER_TYP_TXT', align: 'center', renderer: atleft},
            {text: '工单状态', width: 120, dataIndex: 'V_STATENAME', align: 'center', renderer: atleft},
            {text: '计划工时', width: 120, dataIndex: 'PLANTIME', align: 'center', renderer: atleft},
            {text: '实际工时', width: 150, dataIndex: 'FACTTIME', align: 'center', renderer: atleft}
        ]

    });
    Ext.create('Ext.container.Viewport',{
        id:'main',
        layout:'border',
        items:[gridPanel]
    });
});

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
function timelfet(value, metaDate, record, rowIndex, colIndex, store){
    metaDate.style="text-align:center;";
    return '<div date-qtip="'+value + '" >' +value.toString().substring(0,10)+ '</div>';
}