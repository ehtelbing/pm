var date = new Date();
var V_MONTHPLAN_GUID = '';
var processKey = '';
var V_STEPNAME = '';
var V_NEXT_SETP = '';
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
        ,'V_STATE',
        'V_MAIN_DEFECT',
        'V_EXPECT_AGE',
        'V_REPAIR_PER','V_SGWAY','V_SGWAYNAME'],
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
        // {
        //     xtype: 'displayfield',
        //     id: 'endtime',
        //     labelAlign: 'right',
        //     fieldLabel: '截止时间',
        //     readOnly: true,
        //     margin: '5 0 5 5',
        //     labelWidth: 80,
        //     width: 250,
        //     value: ''
        // },
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
            text: '修改',
            margin: '5 0 5 5',
            icon: imgpath + '/edit.png',
            handler: OnButtonEditClicked
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
        {text: '计划状态', align: 'center', width: 100, dataIndex: 'V_STATE',hidden:true},
        {text: '计划状态', align: 'center', width: 100, dataIndex: 'V_STATENAME'},
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
        {text: '主要缺陷', align: 'center', width: 100, dataIndex: 'V_MAIN_DEFECT'},
        {text: '预计寿命', align: 'center', width: 100, dataIndex: 'V_EXPECT_AGE'},
        {text: '维修人数', align: 'center', width: 100, dataIndex: 'V_REPAIR_PER'},
        {text:'施工方式',align:'center',width:70,dataIndex:'V_SGWAYNAME'},
        {
            text: '录入时间', align: 'center', width: 200, dataIndex: 'V_INDATE',
            renderer: rendererTime/*Ext.util.Format.dateRenderer('Y-m-d H:m:s')*/
        }
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
        Queryendtime();
    });
    //计划作业区加载监听
    Ext.data.StoreManager.lookup('jhzyqStore').on('load', function () {

        // Ext.data.StoreManager.lookup('jhzyqStore').insert(0,{ V_DEPTCODE:'%',V_DEPTNAME:'全部'});
        Ext.getCmp('jhzyq').select(Ext.data.StoreManager.lookup('jhzyqStore').getAt(0));
        query();
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
        Queryendtime();
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
        Ext.data.StoreManager.lookup('zyStore').insert(0,{V_SPECIALTYCODE:'%', V_BASENAME:'全部'});
        Ext.getCmp("zy").select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
    });

    Ext.data.StoreManager.lookup('stateStore').on('load', function () {
        Ext.data.StoreManager.lookup('stateStore').insert(0, {V_BASENAME: '全部', V_BASECODE: '%'});
        Ext.getCmp("state").select(Ext.data.StoreManager.lookup('stateStore').getAt(0));

        Ext.data.StoreManager.lookup('gridStore').load();
    });

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


//修改
function OnButtonEditClicked() {
    var seldata = Ext.getCmp('gridPanel').getSelectionModel().getSelection();
    if (seldata.length != 1) {
        Ext.Msg.alert('操作信息', '请选择一条信息进行修改');
        return false;
    }
    console.log(seldata[0].data.V_STATE);
    V_MONTHPLAN_GUID = seldata[0].data.V_GUID;
    var ret = window.open(AppUrl + 'page/PM_03010208/index.html?V_MONTHPLAN_GUID=' + V_MONTHPLAN_GUID, '', 'height=600px,width=1200px,top=50px,left=100px,resizable=no');


}

function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
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
    });

    var owidth = window.screen.availWidth;
    var oheight =  window.screen.availHeight - 50;
    var ret = window.open(AppUrl + 'page/PM_210301/index.html?ProcessInstanceId='
        +  ProcessInstanceId, '', 'height='+ oheight +'px,width= '+ owidth + 'px,top=50px,left=100px,resizable=yes');

}