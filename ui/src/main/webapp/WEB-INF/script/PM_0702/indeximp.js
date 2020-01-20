Ext.onReady(function () {
    Ext.QuickTips.init();
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 50,
        autoLoad: false,
        fields: ['V_SYSTEM', 'V_I_ID', 'V_DEFECTLIST', 'V_DEFTYPE',
            'V_SOURCEID', 'D_DEFECTDATE', 'D_INDATE', 'V_PERCODE',
            'V_PERNAME', 'V_DEPTCODE', 'V_EQUCODE',
            'V_IDEA', 'V_EQUSITE', 'V_EQUCHILDCODE', 'V_INPERCODE',
            'V_INPERNAME', 'V_EQUTYPECODE', 'V_ORGCODE', 'V_BZ',
            'V_GUID', 'V_EDITTIME', 'V_TYPE', 'O_INFO'],

        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'cjy/PRO_DEFECT_IMPORT_DATA_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        }
    });


    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        region: 'center',
        width: '100%',
        columnLines: true,
        store: gridStore,
        autoScroll: true,
        height: 400,
        columns: [{
            text: '序号',
            xtype: 'rownumberer',
            width: 50,
            sortable: false
        }, {
            text: 'V_SYSTEM',
            dataIndex: 'V_SYSTEM',
            align: 'center',
            width: 160,
            renderer: AtLeft
        }, {
            text: 'V_I_ID',
            dataIndex: 'V_I_ID',
            align: 'center',
            width: 160,
            renderer: AtLeft
        }, {
            text: 'V_DEFECTLIST',
            dataIndex: 'V_DEFECTLIST',
            align: 'center',
            width: 160,
            renderer: AtLeft
        }, {
            text: 'V_DEFTYPE',
            dataIndex: 'V_DEFTYPE',
            align: 'center',
            width: 160,
            renderer: AtLeft
        }, {
            text: 'V_SOURCEID',
            dataIndex: 'V_SOURCEID',
            align: 'center',
            width: 160,
            renderer: AtLeft
        }, {
            text: 'D_DEFECTDATE',
            dataIndex: 'D_DEFECTDATE',
            align: 'center',
            width: 160,
            renderer: AtLeft
        }, {
            text: 'D_INDATE',
            dataIndex: 'D_INDATE',
            align: 'center',
            width: 160,
            renderer: AtLeft
        }, {
            text: 'V_PERCODE',
            dataIndex: 'V_PERCODE',
            align: 'center',
            width: 160,
            renderer: AtLeft
        }, {
            text: 'V_PERNAME',
            dataIndex: 'V_PERNAME',
            align: 'center',
            width: 160,
            renderer: AtLeft
        }, {
            text: 'V_DEPTCODE',
            dataIndex: 'V_DEPTCODE',
            align: 'center',
            width: 160,
            renderer: AtLeft
        }, {
            text: 'V_EQUCODE',
            dataIndex: 'V_EQUCODE',
            align: 'center',
            width: 160,
            renderer: AtLeft
        }, {
            text: 'V_IDEA',
            dataIndex: 'V_IDEA',
            align: 'center',
            width: 160,
            renderer: AtLeft
        }, {
            text: 'V_EQUSITE',
            dataIndex: 'V_EQUSITE',
            align: 'center',
            width: 160,
            renderer: AtLeft
        }, {
            text: 'V_EQUCHILDCODE',
            dataIndex: 'V_EQUCHILDCODE',
            align: 'center',
            width: 160,
            renderer: AtLeft
        }, {
            text: 'V_INPERCODE',
            dataIndex: 'V_INPERCODE',
            align: 'center',
            width: 160,
            renderer: AtLeft
        }, {
            text: 'V_INPERNAME',
            dataIndex: 'V_INPERNAME',
            align: 'center',
            width: 160,
            renderer: AtLeft
        }, {
            text: 'V_EQUTYPECODE',
            dataIndex: 'V_EQUTYPECODE',
            align: 'center',
            width: 160,
            renderer: AtLeft
        }, {
            text: 'V_ORGCODE',
            dataIndex: 'V_ORGCODE',
            align: 'center',
            width: 160,
            renderer: AtLeft
        }, {
            text: 'V_BZ',
            dataIndex: 'V_BZ',
            align: 'center',
            width: 160,
            renderer: AtLeft
        }, {
            text: 'V_GUID',
            dataIndex: 'V_GUID',
            align: 'center',
            width: 160,
            renderer: AtLeft
        }, {
            text: 'V_EDITTIME',
            dataIndex: 'V_EDITTIME',
            align: 'center',
            width: 160,
            renderer: AtLeft
        }, {
            text: 'V_TYPE',
            dataIndex: 'V_TYPE',
            align: 'center',
            width: 160,
            renderer: AtLeft
        }, {
            text: 'O_INFO',
            dataIndex: 'O_INFO',
            align: 'center',
            width: 160,
            renderer: AtLeft
        }],
        bbar: [{
            id: 'page',
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
        items: [grid]
    });

    QueryGrid();

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    });
});

function QueryGrid() {
    Ext.getCmp('page').store.currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore').load({
        params:{
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    });
}


function AtRight(value, metaData) {
    metaData.style = "text-align:right";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function AtLeft(value, metaData) {
    metaData.style = "text-align:left";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
