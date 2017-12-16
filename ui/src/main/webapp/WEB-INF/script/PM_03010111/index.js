var date = new Date();
var V_QUARTERPLAN_GUID = '';
//年份
var years = [];
for (var i = date.getFullYear() - 4; i <= date.getFullYear() + 1; i++) {
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
//季度
var quarters = [{displayField: '春季', valueField: '1'}, {displayField: '夏季', valueField: '2'}, {
    displayField: '秋季',
    valueField: '3'
}, {displayField: '冬季', valueField: '4'}];
var quarterStore = Ext.create("Ext.data.Store", {
    storeId: 'quarterStore',
    fields: ['displayField', 'valueField'],
    data: quarters,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});
//计划厂矿
var jhckStore = Ext.create("Ext.data.Store", {
    storeId: 'jhckStore',
    autoLoad: true,
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
//作业区
var jhzyqStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'jhzyqStore',
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
//专业
var zyStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'zyStore',
    fields: ['V_SPECIALTYCODE', 'V_BASENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'basic/PRO_BASE_SPECIALTY_DEPT_SPECIN',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
//状态
var ztStore = Ext.create('Ext.data.Store', {
    autoLoad: true,
    storeId: 'ztStore',
    fields: ['I_BASEID', 'V_EDIT_GUID', 'V_BASENAME', 'D_DATE_EDITTIME', 'V_BASEMEMO', 'V_BASETYPE', 'V_BASECODE', 'I_ORDERID'],
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
        },
        extraParams: {
            IS_V_BASETYPE: 'PLAN/FLOW'
        }
    }
});
//页面表格信息加载
var gridStore = Ext.create('Ext.data.Store', {
    id: 'gridStore',
    pageSize: 15,
    autoLoad: false,
    fields: ['I_ID',
        'V_QUARTERPLAN_GUID',
        'V_YEAR',
        'V_QUARTER',
        'V_ORGCODE',                          //厂矿
        'V_ORGNAME',
        'V_DEPTCODE',                         //作业区
        'V_DEPTNAME',
        'V_EQUTYPECODE',                     //设备类型
        'V_EQUTYPENAME',
        'V_EQUCODE',
        'V_EQUNAME',
        'V_REPAIRMAJOR_CODE',
        'V_CONTENT',
        'V_STARTTIME',
        'V_ENDTIME',
        'V_HOUR',
        'V_REPAIRDEPT_CODE',
        'V_MANNAME',
        'V_TEL',
        'V_INDATE',
        'V_INPER',
        'V_PERSONNAME',
        'V_FLOWCODE',
        'V_JXMX_CODE',
        'V_JXGX_CODE',
        'V_STATUSNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PRO_PM_03_PLAN_QUARTER_VIEW1',
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

//判断当前月份是什么季度
function getQuarterOfMonth() {
    var currMonth = new Date().getMonth() + 1;
    var quarter = '0';
    if (3 <= currMonth && currMonth <= 5) {
        quarter = '1';
    }
    if (6 <= currMonth && currMonth <= 8) {
        quarter = '2';
    }
    if (9 <= currMonth && currMonth <= 11) {
        quarter = '3';
    }
    if (currMonth == 12 || currMonth == 1 || currMonth == 2) {
        quarter = '4';
    }
    return quarter;
}

var northPanel = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: true,
    border: false,
    //baseCls: 'my-panel-no-border',
    margin: '0 0 0 0',
    items: [
        {
            layout: 'column',
            defaults: {labelAlign: 'right'},
            frame: true,
            border: false,
            baseCls: 'my-panel-no-border',
            items: [
                {
                    xtype: 'combo',
                    id: 'nf',
                    fieldLabel: '年份',
                    editable: false,
                    margin: '10 0 0 5',
                    labelWidth: 30,
                    width: 130,
                    displayField: 'displayField',
                    valueField: 'valueField',
                    value: '',
                    store: yearStore,
                    queryMode: 'local'
                },
                {
                    xtype: 'combo',
                    id: 'jd',
                    fieldLabel: '季度',
                    editable: false,
                    margin: '10 0 0 20',
                    labelWidth: 30,
                    width: 130,
                    displayField: 'displayField',
                    valueField: 'valueField',
                    value: '',
                    store: quarterStore,
                    queryMode: 'local'
                },
                {
                    xtype: 'combo',
                    id: 'jhck',
                    fieldLabel: '计划厂矿',
                    editable: false,
                    margin: '10 0 0 20',
                    labelWidth: 55,
                    width: 205,
                    displayField: 'V_DEPTNAME',
                    valueField: 'V_DEPTCODE',
                    value: '',
                    store: jhckStore,
                    queryMode: 'local'
                },
                {
                    xtype: 'combo',
                    id: 'jhzyq',
                    fieldLabel: '作业区',
                    editable: false,
                    margin: '10 0 0 20',
                    labelWidth: 45,
                    width: 195,
                    displayField: 'V_DEPTNAME',
                    valueField: 'V_DEPTCODE',
                    value: '',
                    store: jhzyqStore,
                    queryMode: 'local'
                },
                {
                    xtype: 'combo',
                    id: 'zy',
                    fieldLabel: '专业',
                    editable: false,
                    margin: '10 0 0 20',
                    labelWidth: 30,
                    width: 180,
                    value: '',
                    displayField: 'V_BASENAME',
                    valueField: 'V_SPECIALTYCODE',
                    store: zyStore,
                    queryMode: 'local'
                },
                {
                    xtype: 'combo',
                    id: 'zt',
                    store: ztStore,
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '状态',
                    displayField: 'V_BASENAME',
                    valueField: 'V_BASECODE',
                    labelWidth: 30,
                    style: ' margin: 10px 0px 0px 20px',
                    labelAlign: 'right'
                },
                {xtype: 'textfield', id: 'nr', emptyText: '按检修内容查询', margin: '10 0 0 20', value: ''},
                {xtype: 'button', text: '查询', margin: '10 0 5 10', icon: imgpath + '/search.png', handler: queryGrid},
                {
                    xtype: 'button',
                    text: '导出Excel',
                    margin: '10 0 5 10',
                    icon: imgpath + '/grid.png',
                    handler: OnButtonExcel
                }
            ]
        }
    ]
});

var gridPanel = Ext.create('Ext.grid.Panel', {
    id: 'gridPanel',
    region: 'center',
    border: false,
    store: 'gridStore',
    selType: 'checkboxmodel',
    columns: [
        {text: '序号', align: 'center', width: 50, xtype: 'rownumberer'},
        {text: '计划状态', align: 'center', width: 150, dataIndex: 'V_STATUSNAME'},
        {text: '设备名称', align: 'center', width: 150, dataIndex: 'V_EQUNAME'},
        {text: '专业', align: 'center', width: 100, dataIndex: 'V_REPAIRMAJOR_CODE'},
        {text: '检修内容', align: 'center', width: 300, dataIndex: 'V_CONTENT'},
        {
            text: '计划停机日期',
            align: 'center',
            width: 150,
            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i'),
            dataIndex: 'V_STARTTIME'
        },
        {
            text: '计划竣工日期',
            align: 'center',
            width: 150,
            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i'),
            dataIndex: 'V_ENDTIME'
        },
        {text: '计划工期（小时）', align: 'center', width: 100, dataIndex: 'V_HOUR'},
        {text: '厂矿', align: 'center', width: 150, dataIndex: 'V_DEPTNAME'},
        {text: '车间名称', align: 'center', width: 150, dataIndex: 'V_ORGNAME'},
        {text: '录入人', align: 'center', width: 100, dataIndex: 'V_PERSONNAME'},
        {text: '录入时间', align: 'center', width: 180, dataIndex: 'V_INDATE'}
    ],
    bbar: ["->",
        {
            xtype: 'pagingtoolbar',
            store: gridStore,
            width: '100%',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
        }
    ]
});

Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [northPanel, gridPanel]
    });
    Ext.getCmp('nf').setValue(new Date().getFullYear());//年份默认值
    Ext.getCmp('jd').select(getQuarterOfMonth());		//季度默认值
    //计划厂矿加载时
    Ext.data.StoreManager.lookup('jhckStore').on('load', function () {
        Ext.getCmp('jhck').select(Ext.data.StoreManager.lookup('jhckStore').getAt(0));
        Ext.data.StoreManager.lookup('jhzyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('jhck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });
    //计划厂矿更改时加载作业区
    Ext.getCmp('jhck').on('select', function () {
        Ext.data.StoreManager.lookup('jhzyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('jhck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });
    //作业区
    Ext.data.StoreManager.lookup('jhzyqStore').on('load', function () {
        Ext.getCmp("jhzyq").select(Ext.data.StoreManager.lookup('jhzyqStore').getAt(0));
        //加载专业
        Ext.data.StoreManager.lookup('zyStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTNEXTCODE: Ext.getCmp('jhzyq').getValue()
            }
        });
    });
    //作业区改变
    Ext.getCmp('jhzyq').on('select', function () {
        Ext.data.StoreManager.lookup('zyStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTNEXTCODE: Ext.getCmp('jhzyq').getValue()
            }
        });
    });
    Ext.data.StoreManager.lookup('zyStore').on('load', function () {
        Ext.getCmp("zy").select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
    });
    Ext.data.StoreManager.lookup('ztStore').on('load', function () {
        Ext.ComponentManager.get('zt').store.insert(0, {'V_BASECODE': '%', 'V_BASENAME': '全部'});
        Ext.getCmp("zt").select(Ext.data.StoreManager.lookup('ztStore').getAt(0));
    });
});

//查询
function queryGrid() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_YEAR: Ext.getCmp('nf').getValue(),
            V_V_QUARTER: Ext.getCmp('jd').getValue(),
            V_V_ORGCODE: Ext.getCmp('jhck').getValue(),
            V_V_DEPTCODE: Ext.getCmp('jhzyq').getValue(),
            V_V_REPAIRMAJOR_CODE: Ext.getCmp('zy').getValue(),
            V_V_FLOWCODE: Ext.getCmp('zt').getValue(),
            V_V_CONTENT: Ext.getCmp('nr').getValue()
        }
    });
}
//导出Excel
function OnButtonExcel() {
    document.location.href = AppUrl + 'excel/JDJXJH_EXCEL?V_V_YEAR=' + Ext.getCmp('nf').getValue() +
        '&V_V_QUARTER=' + Ext.getCmp('jd').getValue() +
        '&V_V_ORGCODE=' + Ext.getCmp('jhck').getValue() +
        '&V_V_DEPTCODE=' + encodeURI(Ext.getCmp('jhzyq').getValue()) +
        '&V_V_REPAIRMAJOR_CODE=' + encodeURI(Ext.getCmp('zy').getValue()) +
        '&V_V_FLOWCODE=' + encodeURI(Ext.getCmp('zt').getValue()) +
        '&V_V_CONTENT=' + Ext.getCmp('nr').getValue();
}