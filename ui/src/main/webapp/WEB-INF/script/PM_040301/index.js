//年份
var today = new Date();
var Year = [];
for (var i = today.getFullYear() - 1; i <= today.getFullYear() + 3; i++)Year.push({displayField: i, valueField: i});

var yearStore = Ext.create('Ext.data.Store', {
    id: 'yearStore',
    autoLoad: true,
    fields: ['displayField', 'valueField'],
    data: Year,
    proxy: {
        type: 'memory',
        render: {
            type: 'json'
        }
    }
});

//厂矿
var ckStore = Ext.create('Ext.data.Store', {
    autoLoad: true,
    storeId: 'ckStore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PROJECT/PRO_BASE_DEPT_VIEW_ROLE',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
            'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
            'V_V_DEPTCODENEXT': '%',
            'V_V_DEPTTYPE': '基层单位'
        }
    }
});
//类型
var lxStore = Ext.create('Ext.data.Store', {
    autoLoad: true,
    storeId: 'lxStore',
    fields: ['V_TYPE_CODE', 'V_TYPE_NAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PROJECT/PM_04_PROJECT_TYPE_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {}
    }
});
//专业
var zyStore = Ext.create('Ext.data.Store', {
    autoLoad: true,
    storeId: 'zyStore',
    fields: ['V_MAJOR_CODE', 'V_MAJOR_NAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PROJECT/PM_04_PROJECT_MAJOR_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {}
    }
});
//查询表格
var gridStore = Ext.create('Ext.data.Store', {
    id: 'gridStore',
    pageSize: 15,
    autoLoad: false,
    fields: ['I_ID',
        'V_ORGCODE',
        'V_ORGNAME',
        'V_DEPTCODE',
        'V_DEPTNAME',
        'V_TYPE_CODE',
        'V_TYPE_NAME',
        'V_MAJOR_CODE',
        'V_MAJOR_NAME',
        'V_PROJECT_CODE',
        'V_PROJECT_NAME',
        'V_WBS_CODE',
        'V_WBS_NAME',
        'V_CONTENT',
        'V_BUDGET_MONEY',
        'V_REPAIR_DEPTCODE',
        'V_REPAIR_DEPTNAME',
        'V_FZRCODE',
        'V_FZRNAME',
        'V_DATE_B',
        'V_DATE_E',
        'V_BZ',
        'V_FLOW_STATE',
        'V_INPERCODE',
        'V_INPERNAME',
        'V_INTIEM'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PROJECT/PM_04_PROJECT_DATA_ITEM_SEL',
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

var gridWinStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridWinStore',
    fields: [
        'I_ID',
        'V_ORGCODE',
        'V_ORGNAME',
        'V_DEPTCODE',
        'V_DEPTNAME',
        'V_TYPE_CODE',
        'V_TYPE_NAME',
        'V_MAJOR_NAME',
        'V_MAJOR_CODE',
        'V_PROJECT_CODE',
        'V_PROJECT_NAME',
        'V_WBS_CODE',
        'V_WBS_NAME',
        'V_CONTENT',
        'V_BUDGET_MONEY',
        'V_REPAIR_DEPTCODE',
        'V_REPAIR_DEPTNAME',
        'V_FZRCODE',
        'V_FZRNAME',
        'V_DATE_B',
        'V_DATE_E',
        'V_BZ',
        'V_FLOW_STATE',
        'V_INPERCODE',
        'V_INPERNAME',
        'V_INTIEM',
        'V_FALG',
        'V_YEAR',
        'V_MONTH',
        'V_PROJECT_CODE_UP',
        'V_PROJECT_NAME_UP',
        'V_WBS_CODE_UP',
        'RN'
    ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PROJECT/PM_04_PROJECT_PARENT_CHILDSEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var northPanel = Ext.create('Ext.panel.Panel', {
    border: false,
    region: 'north',
    items: [
        {
            layout: 'column',
            frame: true,
            border: false,
            defaults : {
                style : 'margin:5px 0px 5px 5px',
                labelAlign : 'right'
            },
            items: [
                {
                    xtype: 'combo',
                    id: 'year',
                    fieldLabel: '年份',
                    editable: false,
                    labelWidth: 50,
                    displayField: 'displayField',
                    valueField: 'valueField',
                    value: today.getFullYear(),
                    store: yearStore,
                    queryMode: 'local'
                },
                {
                    xtype: 'combo',
                    id: 'ck',
                    fieldLabel: '单位',
                    labelWidth: 50,
                    displayField: 'V_DEPTNAME',
                    valueField: 'V_DEPTCODE',
                    editable: false,
                    queryMode: 'local',
                    store: ckStore
                },
                {
                    xtype: 'combo',
                    id: 'lx',
                    fieldLabel: '类型',
                    labelWidth: 50,
                    displayField: 'V_TYPE_NAME',
                    valueField: 'V_TYPE_CODE',
                    editable: false,
                    queryMode: 'local',
                    store: lxStore
                },
                {
                    xtype: 'combo',
                    id: 'zy',
                    fieldLabel: '专业',
                    labelWidth: 50,
                    displayField: 'V_MAJOR_NAME',
                    valueField: 'V_MAJOR_CODE',
                    editable: false,
                    queryMode: 'local',
                    store: zyStore
                },
                {xtype: 'textfield', id: 'text',margin: '5 0 5 60',width:158, value: '', emptyText: '工程名称'},
                {xtype: 'button', text: '查询', icon: imgpath + '/search.png', handler: queryGrid}
            ]
        }
    ]
});
var gridPanel = Ext.create('Ext.grid.Panel', {
    id: 'grid',
    region: 'center',
    border: false,
    store: gridStore,
    //selType: 'checkboxmodel',
    columns: [
        {text: '序号', align: 'center', width: 50, xtype: 'rownumberer'},
        {text: '单位名称', align: 'center', width: 100, dataIndex: 'V_ORGNAME'},
        {text: '类型', align: 'center', width: 100, dataIndex: 'V_TYPE_NAME'},
        {text: '专业', align: 'center', width: 100, dataIndex: 'V_MAJOR_NAME'},
        {text: '工程编码', align: 'center', width: 150, dataIndex: 'V_PROJECT_CODE'},
        {text: '工程名称', align: 'center', width: 100, dataIndex: 'V_PROJECT_NAME'},
        {text: 'WBS编码', align: 'center', width: 150, dataIndex: 'V_WBS_CODE'},
        {text: '主要修理内容', align: 'center', width: 200, dataIndex: 'V_CONTENT'},
        {text: '实施计划额（万元）', align: 'center', width: 100, dataIndex: 'V_BUDGET_MONEY'},
        {text: '施工单位', align: 'center', width: 100, dataIndex: 'V_REPAIR_DEPTNAME'},
        {text: '项目负责人', align: 'center', width: 100, dataIndex: 'V_FZRNAME'},
        {
            text: '预计开工时间',
            align: 'center',
            width: 150,
            dataIndex: 'V_DATE_B',
            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
        },
        {
            text: '预计竣工时间',
            align: 'center',
            width: 150,
            dataIndex: 'V_DATE_E',
            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
        },
        {text: '备注', align: 'center', width: 200, dataIndex: 'V_BZ'}
    ],
    listeners: {
        itemdblclick: function (store, records) {
            queryDetail(records.data.V_PROJECT_CODE, records.data.V_WBS_CODE);
        }
    },
    bbar: ["->",
        {
            id: 'page',
            xtype: 'pagingtoolbar',
            store: gridStore,
            width: '100%',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
        }]


});

var win = Ext.create('Ext.window.Window', {
    id: 'win',
    width: 800,
    height: 500,
    title: '工程任务详细',
    modal: true,
    frame: true,
    closeAction: 'hide',
    closable: true,
    layout: 'border',
    items: [
        {
            xtype: 'gridpanel',
            region: 'center',
            columnLines: true,
            id: 'gridWin',
            store: 'gridWinStore',
            //selType: 'checkboxmodel',
            columns: [
                {text: '序号', align: 'center', width: 50, xtype: 'rownumberer'},
                {text: '单位名称', align: 'center', width: 100, dataIndex: 'V_ORGNAME'},
                {text: '作业区名称', align: 'center', width: 100, dataIndex: 'V_DEPTNAME'},
                {text: '工程编码', align: 'center', width: 150, dataIndex: 'V_PROJECT_CODE'},
                {text: '工程项目名称', align: 'center', width: 100, dataIndex: 'V_PROJECT_NAME'},
                {text: '主要修理内容', align: 'center', width: 200, dataIndex: 'V_CONTENT'},
                {text: '实施计划额（万元）', align: 'center', width: 100, dataIndex: 'V_BUDGET_MONEY'},
                {text: '施工单位', align: 'center', width: 100, dataIndex: 'V_REPAIR_DEPTNAME'},
                {text: '项目负责人名称', align: 'center', width: 100, dataIndex: 'V_FZRNAME'},
                {
                    text: '预计开工时间',
                    align: 'center',
                    width: 150,
                    dataIndex: 'V_DATE_B',
                    renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
                },
                {
                    text: '预计竣工时间',
                    align: 'center',
                    width: 150,
                    dataIndex: 'V_DATE_E',
                    renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
                },
                {text: '备注', align: 'center', width: 200, dataIndex: 'V_BZ'}
            ]
        }],
    bbar: ["->",
        {
            id: 'wpage',
            xtype: 'pagingtoolbar',
            store: gridWinStore,
            width: '100%',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
        }]
});
Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        title: "Viewport",
        layout: "border",
        items: [northPanel, gridPanel]
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_V_YEAR: Ext.getCmp('year').getValue(),
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),
            V_V_TYPE_CODE: Ext.getCmp('lx').getValue(),
            V_V_MAJOR_CODE: Ext.getCmp('zy').getValue(),
            V_V_TEXT: Ext.getCmp('text').getValue(),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize

        }
    });


    //厂矿加载监听
    Ext.data.StoreManager.lookup('ckStore').on('load', function () {
        Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
    });
    //类型加载监听
    Ext.data.StoreManager.lookup('lxStore').on('load', function () {
        Ext.getCmp('lx').select(Ext.data.StoreManager.lookup('lxStore').getAt(0));
    });
    //专业加载监听
    Ext.data.StoreManager.lookup('zyStore').on('load', function () {
        Ext.getCmp('zy').select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
    });
});

function queryGrid() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_YEAR: Ext.getCmp('year').getValue(),
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),
            V_V_TYPE_CODE: Ext.getCmp('lx').getValue(),
            V_V_MAJOR_CODE: Ext.getCmp('zy').getValue(),
            V_V_TEXT: Ext.getCmp('text').getValue(),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    });
}

function queryDetail(V_PROJECT_CODE, V_WBS_CODE) {
    Ext.data.StoreManager.lookup('gridWinStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_V_PROJECT_CODE: V_PROJECT_CODE,
            V_V_WBSCODE: V_WBS_CODE,
            V_V_PAGE: Ext.getCmp('wpage').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('wpage').store.pageSize

        }
    });
    Ext.data.StoreManager.lookup('gridWinStore').load({
        params: {
            V_V_PROJECT_CODE: V_PROJECT_CODE,
            V_V_WBSCODE: V_WBS_CODE,
            V_V_PAGE: Ext.getCmp('wpage').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('wpage').store.pageSize
        }
    });

    Ext.getCmp('win').show();

}

