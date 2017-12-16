var date = new Date();
var V_WEEKPLAN_GUID = '';
var V_WEEKPLAN_TYPE = '';
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
//月份
var months = [];
for (var i = 1; i <= 12; i++) {
    months.push({displayField: i, valueField: i});
}
var monthStore = Ext.create("Ext.data.Store", {
    storeId: 'monthStore',
    fields: ['displayField', 'valueField'],
    data: months,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});
//周
var weeks = [];
for (var i = 1; i <= 6; i++) {
    weeks.push({displayField: i, valueField: i});
}
var weekStore = Ext.create("Ext.data.Store", {
    storeId: 'weekStore',
    fields: ['displayField', 'valueField'],
    data: weeks,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});
//计划厂矿
var jhckStore = Ext.create('Ext.data.Store', {
    autoLoad: true,
    storeId: 'jhckStore',
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
//页面表格信息加载
var gridStore = Ext.create('Ext.data.Store', {
    id: 'gridStore',
    pageSize: 15,
    autoLoad: false,
    fields: ['I_ID',
        'V_WEEKPLAN_GUID',
        'V_YEAR',
        'V_MONTH',
        'V_WEEK',
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
        'V_MONTHPLAN_CODE',
        'V_STATUSNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PRO_PM_03_PLAN_WEEK_VIEW',
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
var northPanel = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: true,
    border: false,
   // baseCls: 'my-panel-no-border',
    margin: '0 0 5 0',
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
                    id: 'yf',
                    fieldLabel: '月份',
                    editable: false,
                    margin: '10 0 0 20',
                    labelWidth: 30,
                    width: 130,
                    displayField: 'displayField',
                    valueField: 'valueField',
                    value: '',
                    store: monthStore,
                    queryMode: 'local'
                },
                {
                    xtype: 'combo',
                    id: 'zhou',
                    fieldLabel: '周',
                    editable: false,
                    margin: '10 0 0 20',
                    labelWidth: 20,
                    width: 120,
                    displayField: 'displayField',
                    valueField: 'valueField',
                    value: '',
                    store: weekStore,
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
                    value: '',
                    displayField: 'V_DEPTNAME',
                    valueField: 'V_DEPTCODE',
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
                    value: '',
                    displayField: 'V_DEPTNAME',
                    valueField: 'V_DEPTCODE',
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
                    hidden: true,
                    xtype: 'displayfield',
                    fieldLabel: '上报开始时间',
                    readOnly: true,
                    margin: '10 0 0 5',
                    labelWidth: 78,
                    width: 180,
                    value: ''
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '上报截止时间',
                    readOnly: true,
                    margin: '10 0 0 20',
                    labelWidth: 78,
                    width: 180,
                    value: ''
                }
            ]
        },
        {
            layout: 'column',
            defaults: {labelAlign: 'right'},
            frame: true,
            border: false,
            baseCls: 'my-panel-no-border',
            items: [
                {
                    xtype: 'button', text: '查询', margin: '10 0 5 10', icon: imgpath + '/search.png',
                    handler: function () {
                        query();
                    }
                },
                {
                    xtype: 'button',
                    text: '通过',
                    margin: '10 0 5 10',
                    icon: imgpath + '/saved.png',
                    handler: OnButtonPassClicked
                },
                {
                    xtype: 'button',
                    text: '驳回',
                    margin: '10 0 5 10',
                    icon: imgpath + '/cross.png',
                    handler: OnButtonBackClicked
                },
                {
                    xtype: 'button',
                    text: '导出Excel',
                    margin: '10 0 5 10',
                    icon: imgpath + '/grid.png',
                    handler: OnButtonExcelClicked
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
        {text: '计划状态', align: 'center', width: 100, dataIndex: 'V_STATUSNAME'},
        {text: '设备名称', align: 'center', width: 100, dataIndex: 'V_EQUNAME'},
        {text: '专业', align: 'center', width: 100, dataIndex: 'V_REPAIRMAJOR_CODE'},
        {text: '检修内容', align: 'center', width: 100, dataIndex: 'V_CONTENT'},
        {text: '计划内容', align: 'center', width: 100, dataIndex: 'V_TEL'},
        {text: '检修模型', align: 'center', width: 100, dataIndex: 'V_EQUTYPENAME'},
        {
            text: '计划停机日期',
            align: 'center',
            width: 150,
            dataIndex: 'V_STARTTIME',
            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
        },
        {
            text: '计划竣工日期',
            align: 'center',
            width: 150,
            dataIndex: 'V_ENDTIME',
            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
        },
        {text: '计划工期（小时）', align: 'center', width: 150, dataIndex: 'V_HOUR'},
        {text: '厂矿', align: 'center', width: 100, dataIndex: 'V_DEPTNAME'},
        {text: '车间名称', align: 'center', width: 100, dataIndex: 'V_ORGNAME'},
        {text: '录入人', align: 'center', width: 100, dataIndex: 'V_PERSONNAME'},
        {text: '录入时间', align: 'center', width: 100, dataIndex: 'V_INDATE'}
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
    Ext.getCmp('nf').select(new Date().getFullYear());
    Ext.getCmp('yf').select(new Date().getMonth() + 1);
    Ext.getCmp('zhou').select(getWeekOfMonth());
    //计划厂矿加载监听
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
    //计划作业区加载监听
    Ext.data.StoreManager.lookup('jhzyqStore').on('load', function () {
        Ext.getCmp('jhzyq').select(Ext.data.StoreManager.lookup('jhzyqStore').getAt(0));
        //加载专业
        Ext.data.StoreManager.lookup('zyStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTNEXTCODE: Ext.getCmp('jhzyq').getValue()
            }
        });
    });
    //计划厂矿更改时
    Ext.getCmp('jhck').on('change', function () {
        Ext.data.StoreManager.lookup('jhzyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('jhck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });
    //计划厂矿更改时
    Ext.getCmp('jhzyq').on('change', function () {
        //加载专业
        Ext.data.StoreManager.lookup('zyStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTNEXTCODE: Ext.getCmp('jhzyq').getValue()
            }
        });
    });
    //专业加载监听
    Ext.data.StoreManager.lookup('zyStore').on('load', function () {
        Ext.getCmp('zy').select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
    });
});
//第几周
function getWeekOfMonth() {
    var date = new Date();
    var w = date.getDay();
    var d = date.getDate();
    return Math.ceil((d + 6 - w) / 7);
};
//查询
function query() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_INPER: Ext.util.Cookies.get('v_personcode'),
            V_V_YEAR: Ext.getCmp('nf').getValue(),
            V_V_MONTH: Ext.getCmp('yf').getValue(),
            V_V_WEEK: Ext.getCmp('zhou').getValue(),
            V_V_ORGCODE: Ext.getCmp('jhck').getValue(),
            V_V_DEPTCODE: Ext.getCmp('jhzyq').getValue(),
            V_V_REPAIRMAJOR_CODE: Ext.getCmp('zy').getValue(),
            V_V_PLANTYPE: 'WEEK'
        }
    });
}
//通过
function OnButtonPassClicked() {
    var selectedRecords = Ext.getCmp('gridPanel').getSelectionModel().getSelection();
    var length = selectedRecords.length;
    if (length == 0) {
        Ext.Msg.alert('操作信息', '请选择信息进行通过');
        return false;
    }
    var i_err = 0;
    for (var i = 0; i < length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'PM_03/PRO_PM_03_PLAN_WEEK_SEND',
            method: 'POST',
            async: false,
            params: {
                V_V_WEEKPLAN_GUID: selectedRecords[i].data.V_WEEKPLAN_GUID,
                V_V_ORGCODE: selectedRecords[i].data.V_ORGCODE,
                V_V_DEPTCODE: selectedRecords[i].data.V_DEPTCODE,
                V_V_FLOWCODE: selectedRecords[i].data.V_FLOWCODE,
                V_V_PLANTYPE: 'WEEK',
                V_V_FLOWSTATE: '通过',
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode')
            },
            success: function (response) {
                var response = Ext.decode(response.responseText);
                if (response.list[0].V_INFO != '成功') {
                    Ext.Msg.alert('操作信息', '通过失败');
                } else {
                    i_err++;
                }
            }
        });
        if (i_err == length) {
            Ext.Msg.alert('操作信息', '通过成功');
        }
        query();
    }
}
//驳回
function OnButtonBackClicked() {
    var selectedRecords = Ext.getCmp('gridPanel').getSelectionModel().getSelection();
    var length = selectedRecords.length;
    if (length == 0) {
        Ext.Msg.alert('操作信息', '请选择信息进行驳回');
        return false;
    }
    var i_err = 0;
    for (var i = 0; i < length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'PM_03/PRO_PM_03_PLAN_WEEK_SEND',
            method: 'POST',
            async: false,
            params: {
                V_V_WEEKPLAN_GUID: selectedRecords[i].data.V_WEEKPLAN_GUID,
                V_V_ORGCODE: selectedRecords[i].data.V_ORGCODE,
                V_V_DEPTCODE: selectedRecords[i].data.V_DEPTCODE,
                V_V_FLOWCODE: selectedRecords[i].data.V_FLOWCODE,
                V_V_PLANTYPE: "WEEK",
                V_V_FLOWSTATE: "驳回",
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode')
            },
            success: function (response) {
                var response = Ext.decode(response.responseText);
                if (response.list[0].V_INFO != '成功') {
                    Ext.Msg.alert('操作信息', '驳回失败');
                } else {
                    i_err++;
                }
            }
        });
    }
    if (i_err == length) {
        Ext.Msg.alert('操作信息', '驳回成功');
    }
    query();
}
function OnButtonExcelClicked() {
    document.location.href = AppUrl + 'excel/ZSCBSP_EXCEL?V_V_INPER=' + Ext.util.Cookies.get('v_personcode') +
        '&V_V_YEAR=' + Ext.getCmp('nf').getValue() +
        '&V_V_MONTH=' + Ext.getCmp('yf').getValue() +
        '&V_V_WEEK=' + Ext.getCmp('zhou').getValue() +
        '&V_V_ORGCODE=' + Ext.getCmp('jhck').getValue() +
        '&V_V_DEPTCODE=' + Ext.getCmp('jhzyq').getValue() +
        '&V_V_REPAIRMAJOR_CODE=' + Ext.getCmp('zy').getValue() +
        '&V_V_PLANTYPE=' + 'WEEK';
}