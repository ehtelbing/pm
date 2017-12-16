
//123123
Ext.onReady(function () {
    var panel = Ext.create('Ext.panel.Panel', {
        id: 'panellow',
        width: '100%',
        title:'',
        region: 'north',
        frame: true,
        items: []
    });
    
    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        region: 'center',
        title : '详细更换历史',
        titleAlign : 'center',
        columnLines: true,
        width: '100%',
        store: {
            id: 'gridStore',
			pageSize:100,
            autoLoad: true,
            fields: ['CHANGEDATE','BJ_UNIQUE_CODE','MATERIALNAME','UNIT','CHANGE_EQUNAME', 'CHANGE_SITE_DESC','DIRECTION','REMARK',
                     'SUPPLY_CODE', 'SUPPLY_NAME','CHANGE_AMOUNT' ],
            proxy: {
                type: 'ajax',
                async: false,
                url: AppUrl + 'PM_12/PRO_RUN_BJ_CHANGE_LOG_ALL',
                actionMethods: {
                    read: 'POST'
                },
                reader: {
                    type: 'json',
                    root: 'list',
                    total: 'total'
                }
            },
            listeners: {
                beforeload: beforeloadStore
            }
        },
        autoScroll: true,
        selType: 'checkboxmodel',
        height: 400,
 
        columns: [

                { xtype: 'rownumberer', text: '序号', width: 35, sortable: false },
                { text: '更换日期', width: 120, dataIndex: 'CHANGEDATE', align: 'center', renderer: atleft },
                { text: '唯一标识', width: 100, dataIndex: 'BJ_UNIQUE_CODE', align: 'center', renderer: atleft },               
                { text: '物资描述', width: 150, dataIndex: 'MATERIALNAME', align: 'center' },
                { text: '计量单位', width: 80, dataIndex: 'UNIT', align: 'center', renderer: atleft },
				 { text: '更换数量', width: 80, dataIndex: 'CHANGE_AMOUNT', align: 'center' },
                { text: '设备', width: 120, dataIndex: 'CHANGE_EQUNAME', align: 'center', renderer: atleft },
                { text: '设备位置', width: 120, dataIndex: 'CHANGE_SITE_DESC', align: 'center', renderer: atleft },
                { text: '更换方向', width: 80, dataIndex: 'DIRECTION', align: 'center', renderer: atleft },
				{ text: '供应商', width: 120, dataIndex: 'SUPPLY_NAME', align: 'center', renderer: atleft },
                { text: '备注', width: 120, dataIndex: 'REMARK', align: 'center', renderer: atleft }                	
                ],
        bbar: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });
 

    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel, grid]
    });

function beforeloadStore(store) {
	store.proxy.extraParams.A_BJ_UNIQUE_CODE =Ext.urlDecode(location.href.split('?')[1]).nowDevice;
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;"; return value;
}
})
