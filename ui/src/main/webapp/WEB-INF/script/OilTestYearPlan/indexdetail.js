var orgcode='';
var year='';
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    year = parameters.V_YEAR == null ? '' : parameters.V_YEAR;
    orgcode = parameters.V_ORGCODE == null ? '' : parameters.V_ORGCODE;
}
Ext.onReady(function () {
    Ext.QuickTips.init();


    //表格信息加载
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 5,
        autoLoad: false,
        fields: ['V_ID','V_YEAR','V_ORGCODE','V_ORGNAME','V_DEPTCODE',
            'V_DEPTNAME','V_SPECIALTYMANCODE','V_SPECIALTYMAN','V_STATE','V_STATUS','V_REMARK'
        ],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'drawingManage/PRO_OIL_YEAR_PLAN_APPROVAL_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        }
        //listeners: {
        //    beforeload: beforeloadStore
        //}
    });
    var detailGridStore = Ext.create('Ext.data.Store', {
        id: 'detailGridStore',
        pageSize: 20,
        autoLoad: false,
        fields: ['V_ID','V_YEAR','V_ORGCODE','V_ORGNAME','V_DEPTCODE','V_DEPTNAME','V_EQUCODE',
            'V_EQUNAME','V_EQUTYPECODE','V_EQUTYPENAME','V_OILTYPECODE',
            'V_OILTYPENAME','V_OILBRAND','V_PROJECTCODE','V_PROJECTNAME'
        ],
        proxy: {
            type: 'ajax',
            //async: false,
            url: AppUrl + 'drawingManage/PRO_OIL_YEAR_PLAN_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        }
        //listeners: {
        //    beforeload: beforeloadDetailStore
        //}
    });


    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        region: 'north',
        width: '100%',
        columnLines: true,
        store: gridStore,
        autoScroll: true,
        selType: 'checkboxmodel',
        style: 'text-align:center',
        height: '30%',
        columns: [{xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text: '厂区', width: 140, dataIndex: 'V_DEPTNAME', align: 'center', renderer: atleft},
            {text: '负责人', width: 200, dataIndex: 'V_SPECIALTYMAN', align: 'center', renderer: atleft},
            {text: '状态', width: 140, dataIndex: 'V_STATUS', align: 'center', renderer: atleft},
            {text: '备注', width: 140, dataIndex: 'V_REMARK', align: 'center', renderer: atleft}
            ],
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
    var detailGrid = Ext.create('Ext.grid.Panel', {
        id: 'detailGrid',
        region: 'center',
        width: '100%',
        //columnLines: true,
        store: detailGridStore,
        autoScroll: true,
        selType: 'checkboxmodel',
        //style: 'text-align:center',
        height: '70%',
        columns: [{xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text: '厂区', width: 140, dataIndex: 'V_PROJECTNAME', align: 'center', renderer: atleft},
            {text: '设备名称', width: 100, dataIndex: 'V_EQUNAME', align: 'center', renderer: atleft},
            {text: '设备编号', width: 80, dataIndex: 'V_EQUCODE', align: 'center', renderer: atleft},
            {text: '设备类型', width: 200, dataIndex: 'V_EQUTYPENAME', align: 'center', renderer: atleft},
            {text: '油类型', width: 200, dataIndex: 'V_OILTYPENAME', align: 'center', renderer: atleft},
            {text: '使用品牌', width: 200, dataIndex: 'V_OILBRAND', align: 'center', renderer: atleft}
        ],
        bbar: [{
            id: 'page2',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'detailGridStore'
        }]
    });
    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [grid,detailGrid]
    });
    QueryGrid();
    QueryDetailGrid();
});

function QueryGrid(){
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.currentPage = 1;
    gridStore.proxy.extraParams = {
        V_V_YEAR: year,
        V_V_ORGCODE:orgcode,
        V_V_PAGE : Ext.getCmp('page').store.currentPage,
        V_V_PAGESIZE : Ext.getCmp('page').store.pageSize
    };
    gridStore.load();

}
function QueryDetailGrid(){
    var detailGridStore = Ext.data.StoreManager.lookup('detailGridStore');
    detailGridStore.currentPage = 1;
    detailGridStore.proxy.extraParams = {
        V_V_YEAR: year,
        V_V_ORGCODE:orgcode,
        V_V_PAGE : Ext.getCmp('page2').store.currentPage,
        V_V_PAGESIZE : Ext.getCmp('page2').store.pageSize
    };
    detailGridStore.load();

}
function beforeloadStore(store) {
    store.proxy.extraParams.V_V_YEAR = year;
    store.proxy.extraParams.V_ORGCODE = orgcode;
    store.proxy.extraParams.V_V_PAGE = Ext.getCmp('page').store.currentPage;
    store.proxy.extraParams.V_V_PAGESIZE = Ext.getCmp('page').store.pageSize;
}
//
//function beforeloadDetailStore(store) {
//    store.proxy.extraParams.V_V_YEAR = year;
//    store.proxy.extraParams.V_ORGCODE = orgcode;
//    store.proxy.extraParams.V_V_PAGE = Ext.getCmp('page2').store.currentPage;
//    store.proxy.extraParams.V_V_PAGESIZE = Ext.getCmp('page2').store.pageSize;
//}


function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
