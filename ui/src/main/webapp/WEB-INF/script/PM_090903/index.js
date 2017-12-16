Ext.onReady(function () {
    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        region: 'center',
        columnLines: true,
        width: '100%',
        store: {
            id: 'gridStore',
            autoLoad: true,
            fields: ['I_ID', 'V_ACTIVITY', 'V_MATERIALCODE', 'V_MATERIALNAME', 'V_UNIT', 'I_ACTUALAMOUNT', 'I_BACK', 'I_JIIP', 'I_NUMBER_FACT'],
            proxy: {
                type: 'ajax',
                async: false,
                url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_FK_JIP_VIEW',
                actionMethods: {
                    read: 'POST'
                },

                extraParams: {
                    V_V_ORDERGUID:Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID
                },
                reader: {
                    type: 'json',
                    root: 'list'
                }
            }
        },
        autoScroll: true,
        height: 400,
        columns: [
                { xtype: 'rownumberer', text: '序号', width: 40, align: 'center' },
                { text: '工序', dataIndex: 'V_ACTIVITY', align: 'center', renderer: left },
                { text: '物料编码', dataIndex: 'V_MATERIALCODE', align: 'center', renderer: left },
                { text: '物料描述', dataIndex: 'V_MATERIALNAME', width: '17%', align: 'center', renderer: left },
                { text: '单位', dataIndex: 'V_UNIT', align: 'center', renderer: left },
                { text: '出库数量', dataIndex: 'I_ACTUALAMOUNT', align: 'center', renderer: left },
                { text: '回库数量', dataIndex: 'I_BACK', algin: 'center', renderer: left },
                { text: '机旁暂存', dataIndex: 'I_JIIP', align: 'center', renderer: left },
                { text: '实际消耗数量', dataIndex: 'I_NUMBER_FACT', align: 'center', renderer: left }
        ]
    });

    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [grid]
    });

});





function left(value, metaData) {
    metaData.style = "text-align:left"; return value;
}



