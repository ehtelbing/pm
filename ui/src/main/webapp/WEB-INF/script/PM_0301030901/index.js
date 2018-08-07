Ext.onReady(function () {
    if (location.href.split('?')[1] != undefined) {
        var id = Ext.urlDecode(location.href.split('?')[1]).v_guid;
    }

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: true,
        fields: ['V_ORDERGUID', 'V_ORDERID', 'V_SHORT_TXT', 'V_EQUIP_NO',
            'V_EQUIP_NAME', 'V_EQUSITENAME', 'V_SPARE', 'V_ORGNAME',
            'V_DEPTNAME', 'V_PERSONNAME', 'D_ENTER_DATE',
            'V_DEPTNAMEREPARIR', 'V_ORDER_TYP_TXT', 'V_STATENAME','WORKORDERNUM'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'zpf/PRO_PM_PLAN_WEEK_WORKORDER_GET',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                V_V_GUID: Ext.urlDecode(location.href.split('?')[1]).v_guid
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });


    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        region: 'center',
        store: gridStore,
        autoScroll: true,
        columnLines : true,
        columns: [{xtype: 'rownumberer', text: '序号', width: '3%', align: 'center', sortable: false},
            {text: '工单号', dataIndex: 'V_ORDERID', align: 'center',width : 100, renderer: left},
            {text: '工单描述', dataIndex: 'V_SHORT_TXT', align: 'center',width : 300, renderer: left},
            {text: '设备名称', dataIndex: 'V_EQUIP_NAME', align: 'center',width : 130, renderer: left},
            {text: '设备位置', dataIndex: 'V_EQUSITENAME', align: 'center',width : 220, renderer: left},
            {text: '备件消耗', dataIndex: 'V_SPARE', align: 'center',width : 300, renderer: left},
            {text: '委托单位', dataIndex: 'V_DEPTNAME', align: 'center',width : 150, renderer: left},
            {text: '委托人', dataIndex: 'V_PERSONNAME', align: 'center',width : 100, renderer: left},
            {text: '委托时间', dataIndex: 'D_ENTER_DATE', align: 'center',width : 140, renderer: left},
            {text: '检修单位', dataIndex: 'V_DEPTNAMEREPARIR', align: 'center',width : 150, renderer: left},
            {text: '工单类型描述', dataIndex: 'V_ORDER_TYP_TXT', align: 'center',width : 100, renderer: left},
            {text: '工单状态', dataIndex: 'V_STATENAME', align: 'center',width : 65, renderer: left}
        ]
    });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [grid]
    });
});

function left(value, metaData) {
    metaData.style = "text-align:left";
    return value;
}
