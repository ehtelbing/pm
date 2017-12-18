Ext.onReady(function () {
    var gridStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'gridStore',
        fields: ['RECORD_STATUS', 'RECORD_STATUS_DESC'],
        proxy: {
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            url: AppUrl + 'zpf/pro_sy105_recordstatuslist',
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        }
    });
    var grid = Ext.create('Ext.grid.Panel', {
        region: 'center',
        id: 'grid',
        title: '试验记录状态查询',
        columnLines: true,
        style: 'margin: 5px 0px 0px 0px',
        width: '100%',
        autoScroll: true,
        store: gridStore,
        columns: [{
            text: '序号',
            dataIndex: 'NUMBER',
            xtype: 'rownumberer',
            width: 70,
            align: 'center'
        }, {
            text: '状态编码',
            dataIndex: 'RECORD_STATUS',
            align: 'center',
            width: 200
        }, {
            text: '状态描述',
            align: 'center',
            dataIndex: 'RECORD_STATUS_DESC',
            width: 200
        }]
    });
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [grid]
    });
})