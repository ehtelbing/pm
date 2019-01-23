Ext.onReady(function () {
    Ext.QuickTips.init();
    var noticeStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'noticeStore',
        fields: ['ID', 'TITLE', 'CONTENT', 'PERSONNAME', 'UPLOADTIME', 'DISPLAY', 'FILENAME', 'FILETYPE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'Wsy/PM_HOME_NOTICE_SEL',//需要存储过程！
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        }
        // listeners: {
        //     load: function () {
        //         notice();
        //     }
        // }
    });
    var gxgrid = Ext.create('Ext.grid.Panel', {
        region: 'center',
        id:'gxgrid',
        store:noticeStore,
        split: true,
        width:'100%',
        height:'100%',
        margin:'0px',
        columnLines: true,
        border: true,
        layout: 'column',
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text: '标题',width: 100, dataIndex: 'TITLE', align: 'center',renderer:atleft},
            {text: '内容',width: 300, dataIndex: 'CONTENT', align: 'center',renderer:atleft},
            {text: '编辑人',width: 90, dataIndex: 'PERSONNAME', align: 'center',renderer:atleft},
            {text: '上传时间',width: 160, dataIndex: 'UPLOADTIME', align: 'center',renderer:atleft},
            {text: '文件名称',width: 100, dataIndex: 'FILENAME', align: 'center',renderer:atleft}
        ]
    });
    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [gxgrid]
    });
});


function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}