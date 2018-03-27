var date = new Date();
var V_MONTHPLAN_GUID = '';
var processKey = '';
var V_STEPNAME = '';
var V_NEXT_SETP = '';
var V_JXMX_CODE = null;
var V_JXGX_CODE = null;
var V_PLANCODE = null;
var V_PLANTYPE = null;
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
//小时
var hours = [];
for (var i = 0; i < 24; i++) {
    if (i < 10) {
        i = '0' + i;
    } else {
        i = '' + i;
    }
    hours.push({displayField: i, valueField: i});
}
var hourStore = Ext.create("Ext.data.Store", {
    storeId: 'hourStore',
    fields: ['displayField', 'valueField'],
    data: hours,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});

//分钟
var minutes = [];
for (var i = 0; i < 60; i++) {
    if (i < 10) {
        i = '0' + i;
    } else {
        i = '' + i;
    }
    minutes.push({displayField: i, valueField: i});
}
var minuteStore = Ext.create("Ext.data.Store", {
    storeId: 'minuteStore',
    fields: ['displayField', 'valueField'],
    data: minutes,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});

Ext.define('Ext.grid.column.LineBreakColumn', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.linebreakcolumn',
    initComponent: function () {
        var me = this,
        // 定义customerRenderer变量，保存用户配置的renderer
            customerRenderer = me.renderer;
        if (customerRenderer) {
            // 如果用户配置了renderer，则限制性用户配置的renderer，然后执行默认的内容换行renderer
            me.renderer = function (value, metadata, record, rowIndex, columnIndex, store) {
                value = customerRenderer(value, metadata, record, rowIndex, columnIndex, store);
                value = me.defaultRenderer(value, metadata, record, rowIndex, columnIndex, store);
                return value;
            };
        }
        me.callParent(arguments);
    },
    defaultRenderer: function (value, metadata, record, rowIndex, columnIndex, store) {
        metadata.style = 'white-space: normal; overflow: visible; word-break: break-all;';
        return value;
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

var nextSprStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'nextSprStore',
    fields: ['V_PERSONCODE', 'V_PERSONNAME', 'V_V_NEXT_SETP', 'V_V_FLOW_STEPNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'hp/PM_ACTIVITI_PROCESS_PER_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {}
    },
    listeners: {
        load: function (store, records, success, eOpts) {
            processKey = store.getProxy().getReader().rawData.RET;
            V_STEPNAME = store.getAt(0).data.V_V_FLOW_STEPNAME;
            V_NEXT_SETP = store.getAt(0).data.V_V_NEXT_SETP;

            Ext.getCmp('nextPer').select(store.first());

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
//设备类型
var sblxStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'sblxStore',
    fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
//设备名称
var sbmcStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'sbmcStore',
    fields: ['V_EQUCODE', 'V_EQUNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_06/pro_get_deptequ_per',
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
var stateStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'stateStore',
    fields: ['V_BASECODE', 'V_BASENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PM_03_PLAN_STATE_SEL',
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
        'V_GUID',
        'V_MONTHPLAN_GUID',
        'V_YEAR',
        'V_MONTH',
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
        'V_MONTHID',
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
        'V_STATUSNAME',
        'V_FLOWNAME',
        'V_INPERNAME',
        'V_STATENAME'
    ,'V_STATE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'hp/PM_03_MONTH_PLAN_BYPER_SEL',
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
//grid显示
function query() {
    Ext.data.StoreManager.lookup('gridStore').load();
    _selectNextSprStore();
    /*Ext.data.StoreManager.lookup('gridStore').load({
     params: {

     V_V_YEAR: Ext.getCmp('nf').getValue(),
     V_V_MONTH: Ext.getCmp('yf').getValue(),
     V_V_ORGCODE: Ext.getCmp('jhck').getValue(),
     V_V_DEPTCODE: Ext.getCmp('jhzyq').getValue(),
     V_V_EQUTYPE: Ext.getCmp('sblx').getValue(),
     V_V_EQUCODE: Ext.getCmp('sbmc').getValue(),
     V_V_ZY:Ext.getCmp('zy').getValue(),
     V_V_PEROCDE: Ext.util.Cookies.get('v_personcode')
     }
     });*/
}

var northPanel = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: true,
    border: false,
    layout: 'column',
    frame: true,
    //baseCls: 'my-panel-no-border',
    defaults: {labelAlign: 'right'},
    items: [
        {
            xtype: 'combo',
            id: 'nf',
            fieldLabel: '年份',
            editable: false,
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 250,
            displayField: 'displayField',
            valueField: 'valueField',
            value: '',
            store: yearStore,
            labelAlign: 'right',
            queryMode: 'local'
        },
        {
            xtype: 'combo',
            id: 'yf',
            fieldLabel: '月份',
            editable: false,
            margin: '5 0 5 5',
            labelAlign: 'right',
            labelWidth: 80,
            width: 250,
            displayField: 'displayField',
            valueField: 'valueField',
            value: '',
            store: monthStore,
            queryMode: 'local'
        }, {
            xtype: 'combo',
            id: 'jhck',
            fieldLabel: '计划厂矿',
            editable: false,
            labelAlign: 'right',
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 250,
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
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 250,
            value: '',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            store: jhzyqStore,
            labelAlign: 'right',
            queryMode: 'local'
        },
        {
            xtype: 'combo',
            id: 'sblx',
            fieldLabel: '设备类型',
            editable: false,
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 250,
            value: '',
            displayField: 'V_EQUTYPENAME',
            valueField: 'V_EQUTYPECODE',
            store: sblxStore,
            labelAlign: 'right',
            queryMode: 'local'
        },
        {
            xtype: 'combo',
            id: 'sbmc',
            fieldLabel: '设备名称',
            editable: false,
            labelAlign: 'right',
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 250,
            value: '',
            displayField: 'V_EQUNAME',
            valueField: 'V_EQUCODE',
            store: sbmcStore,
            queryMode: 'local'
        },
        {
            xtype: 'combo',
            id: 'zy',
            fieldLabel: '专业',
            labelAlign: 'right',
            editable: false,
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 250,
            value: '',
            displayField: 'V_BASENAME',
            valueField: 'V_SPECIALTYCODE',
            store: zyStore,
            queryMode: 'local'
        }, {
            xtype: 'combo',
            id: 'state',
            fieldLabel: '状态',
            labelAlign: 'right',
            editable: false,
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 250,
            value: '',
            displayField: 'V_BASENAME',
            valueField: 'V_BASECODE',
            store: stateStore,
            queryMode: 'local'
        }, {
            xtype: 'textfield',
            id: 'content',
            fieldLabel: '检修内容',
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 250
        }, {
            xtype: 'combo',
            id: 'nextPer',
            labelAlign: 'right',
            fieldLabel: '下一步接收人',
            editable: false,
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 250,
            value: '',
            displayField: 'V_PERSONNAME',
            valueField: 'V_PERSONCODE',
            store: nextSprStore,
            queryMode: 'local'
        },
        {
            xtype: 'displayfield',
            id: 'endtime',
            labelAlign: 'right',
            fieldLabel: '截止时间',
            readOnly: true,
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 250,
            value: ''
        },
        {
            xtype: 'button',
            text: '查询',
            margin: '5 0 5 5',
            icon: imgpath + '/search.png',
            handler: function () {
                query();
            }
        },
        {
            xtype: 'button',
            text: '添加',
            margin: '5 0 5 5',
            icon: imgpath + '/add.png',
            handler: OnButtonAddClicked
        },
        {
            xtype: 'button',
            text: '模型选择',
            margin: '5 0 5 5',
            icon: imgpath + '/add.png',
            handler: OnButtonSelectClicked
        },
        {
            xtype: 'button',
            text: '修改',
            margin: '5 0 5 5',
            icon: imgpath + '/edit.png',
            handler: OnButtonEditClicked
        }/*,
        {
            xtype: 'button',
            text: '作废',
            margin: '5 0 5 5',
            icon: imgpath + '/delete1.png',
            handler: OnButtonDelete
        }*/,
        {
            xtype: 'button',
            text: '删除',
            margin: '5 0 5 5',
            icon: imgpath + '/delete1.png',
            handler: OnButtonDelete
        },
        {
            xtype: 'button',
            text: '上报',
            margin: '5 0 5 5',
            icon: imgpath + '/accordion_collapse.png',
            handler: OnButtonUp
        }
    ]
});

var gridPanel = Ext.create('Ext.grid.Panel', {
    id: 'gridPanel',
    region: 'center',
    border: true,
    columnLines: true,
    store: 'gridStore',
    selType: 'checkboxmodel',
    columns: [
        {text: '序号', align: 'center', width: 50, xtype: 'rownumberer'},
        {
            text: '详细',
            dataIndex: 'V_ORDERID',
            width: 55,
            align: 'center',
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href="#" onclick="_preViewProcess(\'' + record.data.V_GUID + '\')">' + '详细' + '</a>';
            }
        },
        /*{text: '流程步骤', align: 'center', width: 150, dataIndex: 'V_FLOWNAME', renderer: rendererStep},*/
        {text: '厂矿', align: 'center', width: 100, dataIndex: 'V_ORGNAME'},
        {text: '车间名称', align: 'center', width: 150, dataIndex: 'V_DEPTNAME'},
        {text: '专业', align: 'center', width: 100, dataIndex: 'V_REPAIRMAJOR_CODE'},
        {text: '设备名称', align: 'center', width: 100, dataIndex: 'V_EQUNAME'},
        {xtype: 'linebreakcolumn', text: '检修内容', align: 'center', width: 280, dataIndex: 'V_CONTENT'},
        {
            text: '计划停机日期',
            align: 'center',
            width: 200,
            dataIndex: 'V_STARTTIME',
            renderer: rendererTime/*Ext.util.Format.dateRenderer('Y-m-d H:m:s')*/
        },
        {
            text: '计划竣工日期',
            align: 'center',
            width: 200,
            dataIndex: 'V_ENDTIME',
            renderer: rendererTime/*Ext.util.Format.dateRenderer('Y-m-d H:m:s')*/
        },
        {text: '计划工期（小时）', align: 'center', width: 150, dataIndex: 'V_HOUR'},

        {text: '录入人', align: 'center', width: 100, dataIndex: 'V_INPERNAME'},
        {
            text: '录入时间', align: 'center', width: 200, dataIndex: 'V_INDATE',
            renderer: rendererTime/*Ext.util.Format.dateRenderer('Y-m-d H:m:s')*/
        },
        {text: '计划状态', align: 'center', width: 100, dataIndex: 'V_STATENAME'}
    ],
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
        }
    ]
});
Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [northPanel, gridPanel]
    });
    Ext.getCmp('yf').select(getMonth());

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
    });
    //计划厂矿更改时
    Ext.getCmp('jhck').on('select', function () {
        Ext.data.StoreManager.lookup('jhzyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('jhck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });

        query();
    });

    //加载专业
    Ext.data.StoreManager.lookup('zyStore').load({
        params: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTNEXTCODE: Ext.getCmp('jhzyq').getValue()
        }
    });


    //作业区改变
    Ext.getCmp('jhzyq').on('change', function () {
        Ext.data.StoreManager.lookup('zyStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTNEXTCODE: Ext.getCmp('jhzyq').getValue()
            }
        });
        Ext.data.StoreManager.lookup('sblxStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp('jhzyq').getValue()
            }
        });

        query();
    });

    Ext.getCmp('sblx').on('change', function () {
        Ext.data.StoreManager.lookup('sbmcStore').load({
            params: {
                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                v_v_deptcodenext: Ext.getCmp('jhzyq').getValue(),
                v_v_equtypecode: Ext.getCmp('sblx').getValue()
            }
        });

        query();
    });
    Ext.data.StoreManager.lookup('stateStore').load({
        params: {}
    });


    //设备类型加载监听
    Ext.data.StoreManager.lookup('sblxStore').on('load', function () {
        Ext.getCmp("sblx").select(Ext.data.StoreManager.lookup('sblxStore').getAt(0));
    });
    //设备名称加载监听
    Ext.data.StoreManager.lookup('sbmcStore').on('load', function () {
        Ext.getCmp("sbmc").select(Ext.data.StoreManager.lookup('sbmcStore').getAt(0));
        query();
    });
    Ext.data.StoreManager.lookup('zyStore').on('load', function () {
        Ext.getCmp("zy").select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
    });

    Ext.data.StoreManager.lookup('stateStore').on('load', function () {
        Ext.data.StoreManager.lookup('stateStore').insert(0, {V_BASENAME: '全部', V_BASECODE: '%'});
        Ext.getCmp("state").select(Ext.data.StoreManager.lookup('stateStore').getAt(0));

        Ext.data.StoreManager.lookup('gridStore').load();
    });
    Queryendtime();
    Ext.getCmp('nf').on('select', function () {
        Queryendtime();
        query();
    });
    Ext.getCmp('yf').on('select', function () {
        Queryendtime();
        query();
    });

    Ext.getCmp('sbmc').on('select', function () {
        query();
    });

    Ext.getCmp('zy').on('select', function () {
        query();
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {

        store.proxy.extraParams = {
            V_V_YEAR: Ext.getCmp('nf').getValue(),
            V_V_MONTH: Ext.getCmp('yf').getValue(),
            V_V_ORGCODE: Ext.getCmp('jhck').getValue(),
            V_V_DEPTCODE: Ext.getCmp('jhzyq').getValue(),
            V_V_EQUTYPE: Ext.getCmp('sblx').getValue(),
            V_V_EQUCODE: Ext.getCmp('sbmc').getValue(),
            V_V_ZY: Ext.getCmp('zy').getValue(),
            V_V_CONTENT: Ext.getCmp('content').getValue(),
            V_V_STATECODE: Ext.getCmp('state').getValue(),
            V_V_PEROCDE: Ext.util.Cookies.get('v_personcode'),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize

        }
    });


});

function getMonth(){
    if(date.getMonth()+1==12){
        Ext.getCmp('nf').select(date.getFullYear()+1);
        return 1;
    }else{
        var month=date.getMonth()+1;
        Ext.getCmp('nf').select(date.getFullYear());
        return month+1;
    }
}
function _selectNextSprStore() {
    var nextSprStore = Ext.data.StoreManager.lookup('nextSprStore');
    nextSprStore.proxy.extraParams = {
        V_V_ORGCODE: Ext.getCmp('jhck').getValue(),
        V_V_DEPTCODE: Ext.getCmp('jhzyq').getValue(),
        V_V_REPAIRCODE: '',
        V_V_FLOWTYPE: 'MonthPlan',
        V_V_FLOW_STEP: 'start',
        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_SPECIALTY: Ext.getCmp('zy').getValue(),
        V_V_WHERE: ''

    };
    nextSprStore.currentPage = 1;
    nextSprStore.load();
}

function rendererTime(value, metaData) {

    return value.split(".")[0];
}

function rendererStep(value, metaData, record, rowIndex, colIndex, store, view) {
    var stepValue = '';
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/GetActivitiStepFromBusinessId',
        type: 'ajax',
        method: 'POST',
        async: false,
        params: {
            businessKey: record.data.V_GUID
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);//后台返回的值
            if(data.msg == 'Ok'){
                stepValue = data.list.ActivityName;
            }else{
                stepValue = '起草';
            }

        },
        failure: function (response) {
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    })

    return stepValue;
}
//添加
var V_V_GUID;
var YEAR;
var MONTH;
var  V_ORGCODE;
var V_DEPTCODE;
function OnButtonAddClicked() {
    V_V_GUID = '0';
     YEAR= Ext.getCmp("nf").getValue();
     MONTH= Ext.getCmp("yf").getValue();
     V_ORGCODE= Ext.getCmp("jhck").getValue();
    V_DEPTCODE= Ext.getCmp("jhzyq").getValue();
    // var ret = window.open(AppUrl + 'page/PM_03010208/index.html?V_MONTHPLAN_GUID=' + V_MONTHPLAN_GUID +
    // "&YEAR=" + Ext.getCmp("nf").getValue() +
    // "&MONTH=" + Ext.getCmp("yf").getValue() +
    // "&V_ORGCODE=" + Ext.getCmp("jhck").getValue() +
    // "&V_DEPTCODE=" + Ext.getCmp("jhzyq").getValue(), '',
    // 'height=600px,width=1200px,top=50px,left=100px,resizable=no,toolbat=no,menubar=no,scrollbars=auto,location=no,status=no');
    Ext.getCmp('windowEqu').show();
    pageLoadInfo();
    Ext.getCmp('jhjgdate').setMinValue(Ext.getCmp('jhtgdate').getSubmitValue());
}
var windowEqu = Ext.create('Ext.window.Window', {
    id: 'windowEqu',
    width: 900,
    height: 500,
    title : '月检修计划添加',
    modal: true,//弹出窗口时后面背景不可编辑
    frame: true,
    closeAction: 'hide',
    closable: true,
    region:'center',
    layout : 'vbox',
    items: [
        {
            xtype: 'panel',
            layout: 'vbox',
            region: 'center',
            defaults: {labelAlign: 'right'},
            frame: true,
            border: false,
            baseCls: 'my-panel-no-border',
            margin: '0 0 0 0',
            autoScroll: true,
            items: [
                {
                    layout: 'hbox',
                    defaults: {labelAlign: 'right'},
                    frame: true,
                    border: false,
                    baseCls: 'my-panel-no-border',
                    items: [
                        {
                            xtype: 'combo',
                            id: 'year1',
                            fieldLabel: '年份',
                            editable: false,
                            margin: '10 0 5 5',
                            labelWidth: 80,
                            width: 280,
                            displayField: 'displayField',
                            valueField: 'valueField',
                            value: '',
                            store: yearStore,
                            queryMode: 'local'
                        },
                        {
                            xtype: 'combo',
                            id: 'month1',
                            fieldLabel: '月份',
                            editable: false,
                            margin: '10 0 5 5',
                            labelWidth: 70,
                            width: 255,
                            displayField: 'displayField',
                            valueField: 'valueField',
                            value: '',
                            store: monthStore,
                            queryMode: 'local'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {labelAlign: 'right'},
                    frame: true,
                    border: false,
                    baseCls: 'my-panel-no-border',
                    items: [
                        {
                            xtype: 'combo',
                            id: 'ck1',
                            fieldLabel: '计划厂矿',
                            editable: false,
                            margin: '5 0 5 5',
                            labelWidth: 80,
                            width: 280,
                            value: '',
                            displayField: 'V_DEPTNAME',
                            valueField: 'V_DEPTCODE',
                            store: jhckStore,
                            queryMode: 'local'
                        },
                        {
                            xtype: 'combo',
                            id: 'zyq1',
                            fieldLabel: '作业区',
                            editable: false,
                            margin: '5 0 5 5',
                            labelWidth: 70,
                            width: 255,
                            value: '',
                            displayField: 'V_DEPTNAME',
                            valueField: 'V_DEPTCODE',
                            store: jhzyqStore,
                            queryMode: 'local'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {labelAlign: 'right'},
                    frame: true,
                    border: false,
                    baseCls: 'my-panel-no-border',
                    items: [
                        {
                            xtype: 'combo',
                            id: 'zy1',
                            fieldLabel: '专业',
                            editable: false,
                            margin: '5 0 5 5',
                            labelWidth: 80,
                            width: 280,
                            value: '',
                            displayField: 'V_BASENAME',
                            valueField: 'V_SPECIALTYCODE',
                            store: zyStore,
                            queryMode: 'local'
                        },
                        {
                            xtype: 'combo',
                            id: 'sblx1',
                            fieldLabel: '设备类型',
                            editable: false,
                            margin: '5 0 5 5',
                            labelWidth: 70,
                            width: 255,
                            value: '',
                            displayField: 'V_EQUTYPENAME',
                            valueField: 'V_EQUTYPECODE',
                            store: sblxStore,
                            queryMode: 'local'
                        }
                    ]
                },
                {
                    xtype: 'combo',
                    id: 'sbmc1',
                    fieldLabel: '设备名称',
                    editable: false,
                    labelAlign: 'right',
                    margin: '5 0 5 5',
                    labelWidth: 80,
                    width: 280,
                    value: '',
                    displayField: 'V_EQUNAME',
                    valueField: 'V_EQUCODE',
                    store: sbmcStore,
                    queryMode: 'local'
                },
                {
                    xtype: 'textarea',
                    id: 'jxnr1',
                    fieldLabel: '检修内容',
                    labelAlign: 'right',
                    margin: '5 0 5 5',
                    labelWidth: 80,
                    width: 540,
                    value: ''
                },
                {
                    layout: 'hbox',
                    defaults: {labelAlign: 'right'},
                    frame: true,
                    border: false,
                    baseCls: 'my-panel-no-border',
                    items: [
                        {
                            xtype: 'datefield',
                            id: 'jhtgdate',
                            format: 'Y-m-d',
                            fieldLabel: '计划停工时间',
                            editable: false,
                            labelAlign: 'right',
                            margin: '5 0 5 5',
                            labelWidth: 80,
                            width: 280,
                            value: '',
                            listeners: {
                                select: function () {
                                    Ext.getCmp('jhjgdate').setMinValue(Ext.getCmp('jhtgdate').getSubmitValue());
                                    _gongshiheji();
                                }
                            }
                        },
                        {
                            xtype: 'combo',
                            id: 'jhtghour',
                            fieldLabel: '小时',
                            editable: false,
                            margin: '5 0 5 5',
                            labelWidth: 55,
                            width: 137,
                            value: '',
                            displayField: 'displayField',
                            valueField: 'valueField',
                            store: hourStore,
                            queryMode: 'local',
                            listeners: {
                                select: function (field, newValue, oldValue) {
                                    var date1 = Ext.getCmp('jhtgdate').getSubmitValue() + " " + Ext.getCmp('jhtghour').getValue() + ":" + Ext.getCmp('jhtgminute').getValue() + ":00";
                                    var date11 = new Date(date1);
                                    var date2 = Ext.getCmp('jhjgdate').getSubmitValue() + " " + Ext.getCmp('jhjghour').getValue() + ":" + Ext.getCmp('jhjgminute').getValue() + ":00";
                                    var date22 = new Date(date2);


                                    var gongshicha = date22.getTime() - date11.getTime();
                                    var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                                    if(gongshicha2 >= 0)
                                    {
                                        _gongshiheji();
                                    }else{
                                        Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                                        function callBack(id) {
                                            Ext.getCmp('jhtgdate').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                                            Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhjgdate').setValue(new Date());       //编辑窗口计划竣工时间默认值
                                            Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhgshj').setValue(0);
                                            return ;

                                        }

                                    }
                                }
                            }
                        },
                        {
                            xtype: 'combo',
                            id: 'jhtgminute',
                            fieldLabel: '分钟',
                            editable: false,
                            margin: '5 0 5 5',
                            labelWidth: 30,
                            width: 112,
                            value: '',
                            displayField: 'displayField',
                            valueField: 'valueField',
                            store: minuteStore,
                            queryMode: 'local',
                            listeners: {
                                select: function (field, newValue, oldValue) {
                                    var date1 = Ext.getCmp('jhtgdate').getSubmitValue() + " " + Ext.getCmp('jhtghour').getValue() + ":" + Ext.getCmp('jhtgminute').getValue() + ":00";
                                    var date11 = new Date(date1);
                                    var date2 = Ext.getCmp('jhjgdate').getSubmitValue() + " " + Ext.getCmp('jhjghour').getValue() + ":" + Ext.getCmp('jhjgminute').getValue() + ":00";
                                    var date22 = new Date(date2);


                                    var gongshicha = date22.getTime() - date11.getTime();
                                    var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                                    if(gongshicha2 >= 0)
                                    {
                                        _gongshiheji();
                                    }else{
                                        Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                                        function callBack(id) {
                                            Ext.getCmp('jhtgdate').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                                            Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhjgdate').setValue(new Date());       //编辑窗口计划竣工时间默认值
                                            Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhgshj').setValue(0);
                                            return ;

                                        }

                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {labelAlign: 'right'},
                    frame: true,
                    border: false,
                    baseCls: 'my-panel-no-border',
                    items: [
                        {
                            xtype: 'datefield',
                            id: 'jhjgdate',
                            format: 'Y-m-d',
                            fieldLabel: '计划竣工时间',
                            editable: false,
                            labelAlign: 'right',
                            margin: '5 0 5 5',
                            labelWidth: 80,
                            width: 280,
                            value: '',
                            listeners: {
                                select: function () {
                                    //Ext.getCmp('jhtgdate').setMaxValue(Ext.getCmp('jhjgdate').getSubmitValue());
                                    _gongshiheji();
                                }
                            }
                        },
                        {
                            xtype: 'combo',
                            id: 'jhjghour',
                            fieldLabel: '小时',
                            editable: false,
                            margin: '5 0 5 5',
                            labelWidth: 55,
                            width: 137,
                            value: '0',
                            displayField: 'displayField',
                            valueField: 'valueField',
                            store: hourStore,
                            queryMode: 'local',
                            listeners: {
                                select: function (field, newValue, oldValue) {
                                    var date1 = Ext.getCmp('jhtgdate').getSubmitValue() + " " + Ext.getCmp('jhtghour').getValue() + ":" + Ext.getCmp('jhtgminute').getValue() + ":00";
                                    var date11 = new Date(date1);
                                    var date2 = Ext.getCmp('jhjgdate').getSubmitValue() + " " + Ext.getCmp('jhjghour').getValue() + ":" + Ext.getCmp('jhjgminute').getValue() + ":00";
                                    var date22 = new Date(date2);


                                    var gongshicha = date22.getTime() - date11.getTime();
                                    var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                                    if(gongshicha2 >= 0)
                                    {
                                        _gongshiheji();
                                    }else{
                                        Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                                        function callBack(id) {
                                            Ext.getCmp('jhtgdate').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                                            Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhjgdate').setValue(new Date());       //编辑窗口计划竣工时间默认值
                                            Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhgshj').setValue(0);
                                            return ;

                                        }

                                    }
                                }
                            }
                        },
                        {
                            xtype: 'combo',
                            id: 'jhjgminute',
                            fieldLabel: '分钟',
                            editable: false,
                            margin: '5 0 5 5',
                            labelWidth: 30,
                            width: 112,
                            value: '0',
                            displayField: 'displayField',
                            valueField: 'valueField',
                            store: minuteStore,
                            queryMode: 'local',
                            listeners: {
                                select: function (field, newValue, oldValue) {
                                    var date1 = Ext.getCmp('jhtgdate').getSubmitValue() + " " + Ext.getCmp('jhtghour').getValue() + ":" + Ext.getCmp('jhtgminute').getValue() + ":00";
                                    var date11 = new Date(date1);
                                    var date2 = Ext.getCmp('jhjgdate').getSubmitValue() + " " + Ext.getCmp('jhjghour').getValue() + ":" + Ext.getCmp('jhjgminute').getValue() + ":00";
                                    var date22 = new Date(date2);


                                    var gongshicha = date22.getTime() - date11.getTime();
                                    var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                                    if(gongshicha2 >= 0)
                                    {
                                        _gongshiheji();
                                    }else{
                                        Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                                        function callBack(id) {
                                            Ext.getCmp('jhtgdate').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                                            Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhjgdate').setValue(new Date());       //编辑窗口计划竣工时间默认值
                                            Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhgshj').setValue(0);
                                            return ;

                                        }

                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    id: 'jhgshj',
                    fieldLabel: '计划工时合计',
                    labelAlign: 'right',
                    margin: '5 0 5 5',
                    labelWidth: 80,
                    width: 280,
                    value: 0,
                    listeners: {
                        select: function (field, newValue, oldValue) {
                            var date1 = Ext.getCmp('jhtgdate').getSubmitValue() + " " + Ext.getCmp('jhtghour').getValue() + ":" + Ext.getCmp('jhtgminute').getValue() + ":00";
                            var date11 = new Date(date1);
                            var date2 = Ext.getCmp('jhjgdate').getSubmitValue() + " " + Ext.getCmp('jhjghour').getValue() + ":" + Ext.getCmp('jhjgminute').getValue() + ":00";
                            var date22 = new Date(date2);


                            var gongshicha = date22.getTime() - date11.getTime();
                            var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                            if(gongshicha2 >= 0)
                            {
                                _gongshiheji();
                            }else{
                                Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                                function callBack(id) {
                                    Ext.getCmp('jhtgdate').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                                    Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                    Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                    Ext.getCmp('jhjgdate').setValue(new Date());       //编辑窗口计划竣工时间默认值
                                    Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                    Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                    Ext.getCmp('jhgshj').setValue(0);
                                    return ;

                                }

                            }
                        }
                    }
                },
                {
                    xtype: 'textarea',
                    id: 'bz',
                    fieldLabel: '备注',
                    margin: '5 0 10 5',
                    labelWidth: 80,
                    width: 540,
                    height: 80,
                    value: ''
                }
            ]
        }
    ],
    buttons : [
        {
            text : '计划选择',
            width : 70,
            listeners : {
                click : jhSelect
            }
        },{
            text : '保存',
            width : 70,
            listeners : {
                click : _save
            }
        }, {
            text : '关闭',
            width : 70,
            listeners : {
                click : _close
            }
        }]
});

function pageLoadInfo() {
    if (YEAR == null || YEAR == '') {
        Ext.getCmp('year1').setValue(new Date().getFullYear());
    } else {
        Ext.getCmp('year1').setValue(YEAR);
    }
    if (MONTH == null || MONTH == '') {
        Ext.getCmp('month1').setValue(new Date().getMonth() + 1);
    } else {
        Ext.getCmp('month1').setValue(MONTH);
    }
    Ext.getCmp('ck1').select(Ext.data.StoreManager.lookup('jhckStore').getAt(0));
    Ext.data.StoreManager.lookup('jhzyqStore').load({
        params: {
            'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
            'V_V_DEPTCODE': Ext.getCmp('ck1').getValue(),
            'V_V_DEPTCODENEXT': '%',
            'V_V_DEPTTYPE': '主体作业区'
        }
    });
    Ext.getCmp('ck1').on('change', function () {
        Ext.data.StoreManager.lookup('jhzyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck1').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });
    Ext.data.StoreManager.lookup('jhzyqStore').on('load', function () {
        if (V_DEPTCODE == null || V_DEPTCODE == '') {
            Ext.getCmp('zyq1').select(Ext.data.StoreManager.lookup('jhzyqStore').getAt(0));
        } else {
            var index = Ext.data.StoreManager.lookup('jhzyqStore').findBy(function (record, id) {
                return record.get('V_DEPTCODE') == V_DEPTCODE;
            });
            if (index == -1) {
                Ext.getCmp('zyq1').select(Ext.data.StoreManager.lookup('jhzyqStore').getAt(0));
            } else {
                Ext.getCmp('zyq1').select(V_DEPTCODE);
            }
        }
        //加载专业
        Ext.data.StoreManager.lookup('zyStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTNEXTCODE: Ext.getCmp('zyq1').getValue()
            }
        });
        //加载设备类型
        Ext.data.StoreManager.lookup('sblxStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp('zyq1').getValue()
            }
        });
    });
    //作业区改变
    Ext.getCmp('zyq1').on('change', function () {
        Ext.data.StoreManager.lookup('zyStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTNEXTCODE: Ext.getCmp('zyq1').getValue()
            }
        });
        Ext.data.StoreManager.lookup('sblxStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp('zyq1').getValue()
            }
        });
    });
    //设备类型改变
    Ext.getCmp('sblx1').on('change', function () {
        Ext.data.StoreManager.lookup('sbmcStore').load({
            params: {
                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                v_v_deptcodenext: Ext.getCmp('zyq1').getValue(),
                v_v_equtypecode: Ext.getCmp('sblx1').getValue()
            }
        });
    });
    //设备类型加载监听
    Ext.data.StoreManager.lookup('sblxStore').on('load', function () {
        Ext.getCmp("sblx1").select(Ext.data.StoreManager.lookup('sblxStore').getAt(0));
        Ext.data.StoreManager.lookup('sbmcStore').load({
            params: {
                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                v_v_deptcodenext: Ext.getCmp('zyq1').getValue(),
                v_v_equtypecode: Ext.getCmp('sblx1').getValue()
            }
        });
    });
    //设备名称加载监听
    Ext.data.StoreManager.lookup('sbmcStore').on('load', function () {
        Ext.getCmp("sbmc1").select(Ext.data.StoreManager.lookup('sbmcStore').getAt(0));
    });
    Ext.data.StoreManager.lookup('zyStore').on('load', function () {
        Ext.getCmp("zy1").select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
    });
    Ext.getCmp('jhtgdate').setValue(new Date()); 		//编辑窗口计划停工时间默认值
    Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
    Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
    Ext.getCmp('jhjgdate').setValue(new Date());       //编辑窗口计划竣工时间默认值
    Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
    Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
}


function OnButtonSelectClicked() {
    var ret = window.open(AppUrl + 'page/PM_1922/index.html?YEAR=' + Ext.getCmp("nf").getValue() +
    "&QUARTER=0" +
    "&MONTH=" + Ext.getCmp("yf").getValue() +
    "&WEEK=0" +
    "&PLANTYPE=MONTH", '', 'height=600px,width=1200px,top=50px,left=100px,resizable=no,toolbat=no,menubar=no,scrollbars=auto,location=no,status=no');
}
//修改
function OnButtonEditClicked() {
    var seldata = Ext.getCmp('gridPanel').getSelectionModel().getSelection();
    if (seldata.length != 1) {
        Ext.Msg.alert('操作信息', '请选择一条信息进行修改');
        return false;
    }
    console.log(seldata[0].data.V_STATE);
    if (seldata[0].data.V_STATE == 10 || seldata[0].data.V_STATE == 100) {
        V_V_GUID = seldata[0].data.V_GUID;
        // var ret = window.open(AppUrl + 'page/PM_03010208/index.html?V_MONTHPLAN_GUID=' + V_MONTHPLAN_GUID,
        //     '', 'height=600px,width=1200px,top=50px,left=100px,resizable=no');
        Ext.getCmp('windowEqu').show();
        pageLoadInfo();
        if (V_V_GUID == '0') {
            V_JXGX_CODE = guid();
        } else {
            Ext.Ajax.request({
                url: AppUrl + 'PM_03/PRO_PM_03_PLAN_MONTH_GET',
                method: 'POST',
                async: false,
                params: {
                    V_V_MONTHPLAN_GUID: V_V_GUID
                },
                success: function (resp) {
                    var resp = Ext.decode(resp.responseText);
                    if (resp.list.length == 1) {
                        V_JXGX_CODE = resp.list[0].V_JXGX_CODE;      //检修工序编码
                        V_JXMX_CODE = resp.list[0].V_JXMX_CODE;      //检修模型编码
                        var V_FLOWCODE = resp.list[0].V_FLOWCODE;        //流动编码
                        var V_YEARPLAN_CODE = resp.list[0].V_YEARPLAN_CODE; //年计划编码
                        var V_QUARTERPLAN_CODE = resp.list[0].V_QUARTERPLAN_CODE;//季度计划编码
                        var V_HOUR = resp.list[0].V_HOUR;
                        var V_BZ = resp.list[0].V_BZ;
                        V_YEAR = resp.list[0].V_YEAR;                 //年
                        V_MONTH = resp.list[0].V_MONTH;            //季度
                        V_ORGCODE = resp.list[0].V_ORGCODE;          //厂矿编码
                        V_DEPTCODE = resp.list[0].V_DEPTCODE;        //作业区编码
                        var V_REPAIRMAJOR_CODE = resp.list[0].V_REPAIRMAJOR_CODE;        //专业编码
                        var V_EQUTYPECODE = resp.list[0].V_EQUTYPECODE;        //设备类型编码
                        var V_EQUCODE = resp.list[0].V_EQUCODE;        //设备名称编码
                        var V_CONTENT = resp.list[0].V_CONTENT;        //检修内容
                        var V_JXMX_NAME = resp.list[0].V_MX_NAME;      //检修模型名称
                        var V_STARTTIME = resp.list[0].V_STARTTIME;     //开始时间
                        var V_STARTTIME_DATE = V_STARTTIME.split(" ")[0];
                        var V_STARTTIME_HOUR = V_STARTTIME.split(" ")[1].split(":")[0];
                        var V_STARTTIME_MINUTE = V_STARTTIME.split(" ")[1].split(":")[1];
                        var V_ENDTIME = resp.list[0].V_ENDTIME;         //结束时间
                        var V_ENDTIME_DATE = V_ENDTIME.split(" ")[0];
                        var V_ENDTIME_HOUR = V_ENDTIME.split(" ")[1].split(":")[0];
                        var V_ENDTIME_MINUTE = V_ENDTIME.split(" ")[1].split(":")[1];

                        Ext.getCmp('year1').select(V_YEAR); //年
                        Ext.getCmp('month1').select(V_MONTH);  //月
                        Ext.getCmp('ck1').select(V_ORGCODE);  //厂矿编码
                        Ext.getCmp('zyq1').select(V_DEPTCODE);  //作业区编码
                        Ext.getCmp('zy1').setValue(V_REPAIRMAJOR_CODE);  //专业编码
                        Ext.getCmp('sblx1').select(V_EQUTYPECODE);  //设备类型编码
                        Ext.getCmp('sbmc1').select(V_EQUCODE);  //设备名称编码
                        Ext.getCmp('jxnr1').setValue(V_CONTENT);  //检修内容
                        Ext.getCmp('jhtgdate').setValue(V_STARTTIME_DATE);  //停工时间
                        Ext.getCmp('jhtghour').select(V_STARTTIME_HOUR);  //停工时间小时
                        Ext.getCmp('jhtgminute').select(V_STARTTIME_MINUTE);  //停工时间分钟
                        Ext.getCmp('jhjgdate').setValue(V_ENDTIME_DATE);  //竣工时间
                        Ext.getCmp('jhjghour').select(V_ENDTIME_HOUR);  //竣工时间小时
                        Ext.getCmp('jhjgminute').select(V_ENDTIME_MINUTE);  //竣工时间分钟
                        Ext.getCmp('jhgshj').setValue(V_HOUR);  //竣工时间分钟
                        Ext.getCmp('bz').setValue(V_BZ);  //竣工时间分钟
                        if (V_YEARPLAN_CODE != '') {
                            V_PLANCODE = V_YEARPLAN_CODE;
                            V_PLANTYPE = 'YEAR';
                        } else if (V_QUARTERPLAN_CODE != '') {
                            V_PLANCODE = V_QUARTERPLAN_CODE;
                            V_PLANTYPE = 'QUARTER';
                        }
                    }
                }
            });
        }
        Ext.getCmp('jhjgdate').setMinValue(Ext.getCmp('jhtgdate').getSubmitValue());
    }else {
        Ext.Msg.alert('操作信息', '该流程已上报，无法修改！');
    }

}
//删除
function OnButtonDelete() {
    var records = Ext.getCmp('gridPanel').getSelectionModel().getSelection();//获取选中的数据
    if (records.length == 0) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    for (var i = 0; i < records.length; i++) {
        if (records[i].data.V_STATENAME != '未发起') {
            Ext.Msg.alert('提升信息', '只能删除未发起的数据');
            return false;
        }
    }

    Ext.MessageBox.show({
        title: '确认',
        msg: '您确定要删除吗？',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESION,
        fn: function (btn) {
            if (btn == 'yes') {
                var i_err = 0;
                for (var i = 0; i < records.length; i++) {
                    Ext.Ajax.request({
                        url: AppUrl + 'hp/PM_03_PLAN_MONTH_DEL',
                        method: 'POST',
                        async: false,
                        params: {
                            V_V_GUID: records[i].get('V_GUID')
                        },
                        success: function (response) {
                            var resp = Ext.decode(response.responseText);//后台返回的值
                            if (resp.V_INFO == 'success') {//成功，会传回true
                                i_err++;
                                if (i_err == records.length) {
                                    query();
                                }
                            } else {
                                Ext.MessageBox.show({
                                    title: '错误',
                                    msg: resp.V_INFO,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR,
                                    fn: function () {
                                        query();
                                    }
                                });
                            }
                        },
                        failure: function (response) {//访问到后台时执行的方法。
                            Ext.MessageBox.show({
                                title: '错误',
                                msg: response.responseText,
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR,
                                fn: function () {
                                    query();
                                }
                            })
                        }
                    });
                }
            }
        }
    });
}

function OnButtonUp() {
    if (Ext.Date.format(new Date(Ext.getCmp('endtime').getValue()), 'Y/m/d') < Ext.Date.format(new Date(), 'Y/m/d')) {
        alert("已过上报时间，不能上报");
        return false;
    }


    var records = Ext.getCmp('gridPanel').getSelectionModel().getSelection();
    if (records.length == 0) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    for (var i = 0; i < records.length; i++) {
        if (records[i].data.V_STATENAME == '审批中'|| records[i].data.V_STATENAME == '审批完成' || records[i].data.V_STATENAME == '已驳回') {
            Ext.Msg.alert('提升信息', '此计划状态不能上报');
            return false;
        }
    }


    var i_err = 0;
    for (var i = 0; i < records.length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'PM_03/PRO_PM_03_PLAN_MONTH_SEND',
            method: 'POST',
            async: false,
            params: {
                V_V_GUID: records[i].data.V_GUID,
                V_V_ORGCODE: records[i].data.V_ORGCODE,
                V_V_DEPTCODE: records[i].data.V_DEPTCODE,
                V_V_FLOWCODE: records[i].data.V_FLOWCODE,
                V_V_PLANTYPE: 'MONTH',
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode')
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText).list[0];
                if (resp.V_INFO == '成功') {
                    Ext.Ajax.request({
                        url: AppUrl + 'Activiti/StratProcess',
                        async: false,
                        method: 'post',
                        params: {
                            parName: ["originator", "flow_businesskey", V_NEXT_SETP, "idea", "remark", "flow_code", "flow_yj","flow_type"],
                            parVal: [Ext.util.Cookies.get('v_personcode'), records[i].get('V_GUID'), Ext.getCmp('nextPer').getValue(), "请审批!", records[i].get('V_CONTENT'), records[i].get('V_MONTHID'), "请审批！","MonthPlan"],
                            processKey: processKey,
                            businessKey: records[i].get('V_GUID'),
                            V_STEPCODE: 'Start',
                            V_STEPNAME: V_STEPNAME,
                            V_IDEA: '请审批！',
                            V_NEXTPER: Ext.getCmp('nextPer').getValue(),
                            V_INPER: Ext.util.Cookies.get('v_personcode')
                        },
                        success: function (response) {
                            if (Ext.decode(response.responseText).ret == 'OK') {

                            } else if (Ext.decode(response.responseText).error == 'ERROR') {
                                Ext.Msg.alert('提示', '该流程发起失败！');
                            }
                        }
                    });
                    i_err++;

                    if (i_err == records.length) {

                        query();
                    }
                } else {
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: resp.V_INFO,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR,
                        fn: function (btn) {
                            query();
                        }
                    });
                }
            },
            failure: function (response) {//访问到后台时执行的方法。
                Ext.MessageBox.show({
                    title: '错误',
                    msg: response.responseText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR,
                    fn: function (btn) {
                        query();
                    }
                })
            }
        });
    }


    //Ext.MessageBox.show({
    //    title: '确认',
    //    msg: '您确定要上报吗？',
    //    buttons: Ext.MessageBox.YESNO,
    //    icon: Ext.MessageBox.QUESION,
    //    fn: function (btn) {
    //        if (btn == 'yes') {

    //        }
    //    }
    //});
}
//截止上报时间
function Queryendtime() {
    Ext.Ajax.request({
        url: AppUrl + 'PM_03/PRO_PM_PLAN_LOCKING_DATE_GET',
        method: 'POST',
        async: false,
        params: {
            V_I_YEAR: Ext.getCmp('nf').getValue(),
            V_I_MONTH: Ext.getCmp('yf').getValue(),
            V_I_WEEKNUM: '0',
            V_V_TYPE: 'M'
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.list.length != 1) {
                Ext.getCmp('endtime').setValue('未设置');
            } else {
                Ext.getCmp('endtime').setValue(resp.list[0].D_DATE_E.split('.')[0]);
            }
        }
    });
}

function _preViewProcess(businessKey)
{

    var ProcessInstanceId='';
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/GetActivitiStepFromBusinessId',
        type: 'ajax',
        method: 'POST',
        async: false,
        params: {
            businessKey: businessKey
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);//后台返回的值
            if(data.msg == 'Ok'){
                ProcessInstanceId=data.InstanceId;
            }


        },
        failure: function (response) {
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    })

    var owidth = window.screen.availWidth;
    var oheight =  window.screen.availHeight - 50;
    var ret = window.open(AppUrl + 'page/PM_210301/index.html?ProcessInstanceId='
        +  ProcessInstanceId, '', 'height='+ oheight +'px,width= '+ owidth + 'px,top=50px,left=100px,resizable=yes');

}

function jhSelect() {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_03010217/index.html?V_V_YEAR=' + Ext.getCmp('year').getValue()
        + '&V_V_ORGCODE=' + Ext.getCmp('ck').getValue()
        + '&V_V_DEPTCODE=' + Ext.getCmp('zyq').getValue()
        + '&V_V_EQUTYPE=' + Ext.getCmp('sblx').getValue()
        + '&V_V_EQUCODE=' + Ext.getCmp('sbmc').getValue()
        + '&V_V_ZY=' + Ext.getCmp('zy').getValue()
        + '&V_V_JXNR=' + Ext.getCmp('jxnr').getValue()
        , '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}

function _close(){
    if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") !=-1) {
        window.location.href="http://localhost:8080/pm/app/pm/page/PM_03010201/index.html";
        window.close();
    } else {
        window.opener = null;
        window.open("", "_self");
        window.close();
    }
}
function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
function _save() {
    //计划停工时间
    var jhtghour = Ext.getCmp('jhtghour').getValue();
    var jhtgminute = Ext.getCmp('jhtgminute').getValue();
    var jhtgTime = Ext.Date.format(Ext.ComponentManager.get("jhtgdate").getValue(), 'Y-m-d') + " " + jhtghour + ":" + jhtgminute + ':00';
    //计划竣工时间
    var jhjghour = Ext.getCmp('jhjghour').getValue();
    var jhjgminute = Ext.getCmp('jhjgminute').getValue();
    var jhjgTime = Ext.Date.format(Ext.ComponentManager.get("jhjgdate").getValue(), 'Y-m-d') + " " + jhjghour + ":" + jhjgminute + ':00';
    //计划类型（年/季度）
    var V_YEARPLAN_CODE = "";
    var V_QUARTERPLAN_CODE = "";
    if (V_PLANTYPE == 'YEAR') {
        V_YEARPLAN_CODE = V_PLANCODE;
    } else if (V_PLANTYPE == 'QUARTER') {
        V_QUARTERPLAN_CODE = V_PLANCODE;
    }
    //模型
    V_JXMX_CODE = guid();
    //保存
    Ext.Ajax.request({
        url: AppUrl + 'basic/PRO_PM_03_PLAN_MONTH_SET',
        method: 'POST',
        params: {
            V_V_INPER: Ext.util.Cookies.get('v_personcode'),               //人员cookies                                    //人员编码
            V_V_GUID: V_V_GUID == '' ? '%' : V_V_GUID,                         //季度计划guid                                                      //计划GUID
            V_V_YEAR: Ext.getCmp('year1').getValue(),                        //年份                                            //年份
            V_V_MONTH: Ext.getCmp('month1').getValue(),                     //月份                                           //年份
            V_V_ORGCODE: Ext.getCmp('ck1').getValue(),                        //厂矿                                              //厂矿
            V_V_DEPTCODE: Ext.getCmp('zyq1').getValue(),                      //作业区
            V_V_EQUTYPECODE: Ext.getCmp('sblx1').getValue(),                  //设备类型                                              //设备类型编码
            V_V_EQUCODE: Ext.getCmp('sbmc1').getValue(),                     //设备名称
            V_V_REPAIRMAJOR_CODE: Ext.getCmp('zy1').getValue(),              //检修专业
            V_V_CONTENT: Ext.getCmp('jxnr1').getValue(),                     //检修内容
            V_V_STARTTIME: jhtgTime,                                       //开始时间
            V_V_ENDTIME: jhjgTime,                                          //结束时间
            V_V_OTHERPLAN_GUID: '',//V_JXGX_CODE,                                  //检修工序编码
            V_V_OTHERPLAN_TYPE: '',//V_JXMX_CODE,                                  //检修模型编码
            V_V_JHMX_GUID: '',                                          //检修标准
            V_V_HOUR: Ext.getCmp('jhgshj').getValue(),
            V_V_BZ: Ext.getCmp('bz').getValue()
        },
        success: function (ret) {
            var resp = Ext.decode(ret.responseText);
            if (resp.V_INFO == '成功') {
                query();
                _close();
            } else {
                Ext.Msg.alert('操作信息', resp.V_INFO);
            }

        }
    });
}