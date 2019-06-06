var dt = new Date();
var thisYear = dt.getFullYear();
var years = [];
//年份
for (var i = thisYear - 4; i <= thisYear + 1; i++) {
    years.push({displayField: i, valueField: i});
}

var yearStore = Ext.create("Ext.data.Store", {
    storeId: 'yearStore',
    fields: ['displayField', 'valueField'],
    data: years,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});

Ext.onReady(function () {
    Ext.QuickTips.init();

    //厂矿计划数据加载
    var ckStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'ckStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
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

    //作业区加载
    var zyqStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyqStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var wxlxStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'wxlxStore',
        fields: ['V_BASECODE', 'V_BASENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_PM_BASEDIC_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var zyStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyStore',
        fields: ['V_GUID', 'V_ZYMC', 'V_ZYJC', 'V_LX', 'V_ORDER'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_03/PM_03_PLAN_ZY_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    //表格信息加载
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 50,
        autoLoad: false,
        fields: ['I_ID','V_GUID','V_GUID_UP','V_YEAR','V_MONTH','V_ORGCODE','V_ORGNAME',
            'V_DEPTCODE','V_DEPTNAME','V_PORJECT_CODE','V_PORJECT_NAME','V_SPECIALTY','V_SPECIALTYNAME',
            'V_SPECIALTYMANCODE','V_SPECIALTYMAN','V_WXTYPECODE','V_WXTYPENAME','V_CONTENT','V_MONEYBUDGET',
            'V_REPAIRDEPTCODE','V_BDATE','V_EDATE','V_STATE','V_FLAG','V_INMAN','V_INMANCODE','V_INDATE',
            'V_STATENAME','V_QSTEXT','DEFNUM'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PRO_PM_03_PLAN_YEAR_VIEW_E',
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
    });

    var panel = Ext.create('Ext.Panel', {
        id: 'panel',
        region: 'north',
        width: '100%',
        titleAlign: 'center',
        frame: true,
        layout: 'column',
        defaults: {
            style: 'margin:5px 0px 5px 5px',
            labelAlign: 'right'
        },
        items: [{
            id: 'year',
            store: Ext.create("Ext.data.Store", {
                fields: ['displayField', 'valueField'],
                data: years,
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'json'
                    }
                }
            }),
            xtype: 'combo',
            fieldLabel: '年份',
            value: new Date().getFullYear() + 1,
            labelWidth: 80,
            width: 250,
            labelAlign: 'right',
            editable: false,
            displayField: 'displayField',
            valueField: 'valueField'
        }, {
            xtype: 'combo',
            id: "ck",
            store: ckStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '计划厂矿',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            labelWidth: 80,
            width: 250
        }, /*{
            xtype: 'label',
            id: "budget",
            style: ' margin: 8px 0px 0px 10px'
        },*/ {
            xtype: 'button',
            text: '查询',
            style: ' margin: 5px 0px 0px 10px',
            icon: imgpath + '/search.png',
            listeners: {click: OnButtonQuery}
        }, {
            xtype: 'button',
            text: '查看甘特图',
            icon: imgpath + '/search.png',
            listeners: {click: OnBtnGauntt}
        }, {
            xtype: 'button',
            text: '导出',
            icon: imgpath + '/accordion_collapse.png',
            listeners: {click: OnButtonOut}
        }
        ]
    });
    var panel2 = Ext.create('Ext.Panel', {
        id: 'panel2',
        region: 'north',
        width: '100%',
        titleAlign: 'center',
        frame: true,
        layout: 'column',
        defaults: {
            style: 'margin:3px 0px 5px 5px',
            labelAlign: 'right'
        },
        items: [{
            xtype: 'label',
            id: "budget",
            style: ' margin: 8px 0px 0px 20px'
        }]
    });
    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        region: 'center',
        width: '100%',
        columnLines: true,
        store: gridStore,
        autoScroll: true,
        selType: 'checkboxmodel',
        style: 'text-align:center',
        height: 400,
        columns: [{xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text: '工程状态', width: 140, dataIndex: 'V_STATENAME', align: 'center', renderer: atleft},
            {text: '工程编码', width: 200, dataIndex: 'V_PORJECT_CODE', align: 'center', renderer: atleft},
            {text: '工程名称', width: 200, dataIndex: 'V_PORJECT_NAME', align: 'center', renderer: atleft},
            {text: '维修类型', width: 100, dataIndex: 'V_WXTYPENAME', align: 'center', renderer: atleft},
            {text: '专业', width: 100, dataIndex: 'V_SPECIALTYNAME', align: 'center', renderer: atleft},
            {text: '维修内容', width: 300, dataIndex: 'V_CONTENT', align: 'center', renderer: atleft},
            {text: '维修费用', width: 100, dataIndex: 'V_MONEYBUDGET', align: 'center', renderer: atright},
            {text: '开工时间', width: 140, dataIndex: 'V_BDATE', align: 'center', renderer: timelfet},
            {text: '竣工时间', width: 140, dataIndex: 'V_EDATE', align: 'center', renderer: timelfet}],
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
        items: [panel,panel2, grid]
    });

    Ext.data.StoreManager.lookup('ckStore').on('load', function () {
        Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
        QueryBudget();
        OnButtonQuery();
    });


    Ext.getCmp('ck').on('select', function () {
        QueryBudget();
        OnButtonQuery();
    });

    Ext.getCmp('year').on('select', function () {
        QueryBudget();
        OnButtonQuery();
    })
});

function QueryBudget() {
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PM_PLAN_BUDGETANDUSE_YEAR_SEL',
        method: 'POST',
        async: false,
        params: {
            V_V_YEAR: Ext.getCmp('year').getValue(),
            V_V_ORGCODE: Ext.getCmp('ck').getValue()
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.list != null) {
             //   Ext.getCmp('panel').setTitle(Ext.getCmp('year').getValue() + '年份' + Ext.getCmp('ck').rawValue + '大修年计划查询');
                Ext.getCmp('panel').setTitle(Ext.getCmp('year').getValue() + '年份大修年计划查询');
                Ext.getCmp('budget').setText('年预算费用：' + resp.list[0].V_BUDGET_CK + '万元；已用费用：' + resp.list[0].V_BUDGET_USE + '万元；剩余费用：' + resp.list[0].V_BUDGET_Y + '万元；')
            }
        }
    });
}

function beforeloadStore(store) {
    store.proxy.extraParams.V_V_YEAR = Ext.getCmp('year').getValue();
    store.proxy.extraParams.V_V_ORGCODE = Ext.getCmp('ck').getValue();
    store.proxy.extraParams.V_V_DEPTCODE = '%';
    store.proxy.extraParams.V_V_ZY = '%';
    store.proxy.extraParams.V_V_WXLX = '%';
    store.proxy.extraParams.V_V_CONTENT = '%';
    store.proxy.extraParams.V_V_PAGE = Ext.getCmp('page').store.currentPage;
    store.proxy.extraParams.V_V_PAGESIZE = Ext.getCmp('page').store.pageSize;
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}


function OnButtonQuery() {
    Ext.data.StoreManager.lookup('gridStore').currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_YEAR: Ext.getCmp('year').getValue(),
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),
            V_V_DEPTCODE: '%',
            V_V_ZY: '%',
            V_V_WXLX: '%',
            V_V_CONTENT: '%',
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    })
}

function OnBtnGauntt() {
}

function OnButtonOut() {
    var ck=Ext.getCmp('ck').getValue()=="%"?"0":Ext.getCmp('ck').getValue();
    var zyq=Ext.getCmp('zyq').getValue()=="%"?"0":Ext.getCmp('zyq').getValue();
    var zy=Ext.getCmp('zy').getValue()=="%"?"0":Ext.getCmp('zy').getValue();

    document.location.href=AppUrl + 'dxfile/WXEXPORTEXCEL?V_V_YEAR='+Ext.getCmp('year').getValue()+
        '&V_V_ORGCODE='+ck+
        '&V_V_DEPTCODE='+ zyq+
        '&V_V_ZY='+zy+
        '&V_V_QSTEXT='+Ext.getCmp('gcqs').getValue();


}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
function timelfet(value, metaDate, record, rowIndex, colIndex, store){
    metaDate.style="text-align:right;";
    return '<div date-qtip="'+value + '" >' +value.toString().substring(0,10)+ '</div>';
}