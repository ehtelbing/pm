var date = new Date();
//var date=new Date(addDate(new Date('2017-12-24'),7));//当前月7天后
var V_WEEKPLAN_GUID = '';
var V_WEEKPLAN_TYPE = '';
var processKey = '';
var V_STEPNAME = '';
var V_NEXT_SETP = '';
//年份
var years = [];
var url_guid = '';
var url_deptcode;
var url_zy;
if (location.href.split('?')[1] != undefined) {
    url_guid = Ext.urlDecode(location.href.split('?')[1]).v_guid_dx;
    url_deptcode = Ext.urlDecode(location.href.split('?')[1]).v_deptcode;
    url_zy = Ext.urlDecode(location.href.split('?')[1]).v_specialty;
}
for (var i = date.getFullYear() - 4; i <= date.getFullYear() + 1; i++) {
    years.push({displayField: i, valueField: i});
}
var flowtype = "";
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
for (var i = 1; i <= 5; i++) {
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

//--上报人
var inperList=[];
inperList.push({V_PERSCODE:Ext.util.Cookies.get('v_personcode'),V_PERSNAME:decodeURI(Ext.util.Cookies.get('v_personname'))});
inperList.push({V_PERSCODE:"%",V_PERSNAME:"全部"});
var insertPerStore=Ext.create('Ext.data.Store',{
    storeId:'insertPerStore',
    fields:['V_PERSNAME', 'V_PERSCODE'],
    data:inperList,
    proxy:{
        type:'memory',
        reader:{type:'json'}
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
        'V_WEEKID',
        'V_STATUSNAME', 'V_GUID','V_STATE','V_STATENAME', 'V_INPERNAME', 'V_FLOWNAME',
        'V_MAIN_DEFECT',
        'V_EXPECT_AGE',
        'V_REPAIR_PER','V_SGWAY','V_SGWAYNAME','WORKORDERNUM'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PRO_PM_03_PLAN_WEEK_VIEW_IN',
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
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_YEAR: Ext.getCmp('nf').getValue(),
            V_V_MONTH: Ext.getCmp('yf').getValue(),
            V_V_WEEK: Ext.getCmp('zhou').getValue(),
            V_V_ORGCODE: Ext.getCmp('jhck').getValue(),
            V_V_DEPTCODE: Ext.getCmp('jhzyq').getValue(),
            V_V_ZY: Ext.getCmp('zy').getValue(),
            V_V_EQUTYPE: Ext.getCmp('sblx').getValue(),
            V_V_EQUCODE: Ext.getCmp('sbmc').getValue(),
            V_V_CONTENT: Ext.getCmp('content').getValue(),
            V_V_STATE: Ext.getCmp('state').getValue(),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize,
            V_V_INPER:Ext.getCmp('instPer').getValue()
        }
    });

    _selectNextSprStore();
}

var northPanel = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: true,
    border: false,
    //baseCls: 'my-panel-no-border',
    layout: 'column',
    defaults: {labelAlign: 'right'},
    items: [
        {
            xtype: 'combo',
            id: 'nf',
            fieldLabel: '年份',
            editable: false,
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 230,
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
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 230,
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
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 230,
            displayField: 'displayField',
            valueField: 'valueField',
            value: '',
            store: weekStore,
            queryMode: 'local'
        },
        {
            xtype: 'displayfield',
            id: 'zks',
            fieldLabel: '本周开始时间',
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 230,
            labelAlign: 'right'
        },
        {
            xtype: 'displayfield',
            id: 'zjs',
            fieldLabel: '本周结束时间',
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 230,
            labelAlign: 'right'
        },
        {
            xtype: 'combo',
            id: 'jhck',
            fieldLabel: '计划厂矿',
            editable: false,
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 230,
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
            width: 230,
            value: '',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            store: jhzyqStore,
            queryMode: 'local'
        },
        {
            xtype: 'combo',
            id: 'sblx',
            fieldLabel: '设备类型',
            editable: false,
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 230,
            value: '',
            displayField: 'V_EQUTYPENAME',
            valueField: 'V_EQUTYPECODE',
            store: sblxStore,
            queryMode: 'local',
            listConfig: {
                minWidth: 270
            }
        },
        {
            xtype: 'combo',
            id: 'sbmc',
            fieldLabel: '设备名称',
            editable: false,
            labelAlign: 'right',
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 230,
            value: '',
            displayField: 'V_EQUNAME',
            valueField: 'V_EQUCODE',
            store: sbmcStore,
            queryMode: 'local', listConfig: {
                minWidth: 400
            }
        },
        {
            xtype: 'combo',
            id: 'zy',
            fieldLabel: '专业',
            editable: false,
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 230,
            value: '',
            displayField: 'V_BASENAME',
            valueField: 'V_SPECIALTYCODE',
            store: zyStore,
            queryMode: 'local'
        }, {
            xtype: 'combo',
            id: 'state',
            fieldLabel: '状态',
            editable: false,
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 230,
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
            width: 230
        }, {
            xtype: 'combo',
            id: 'instPer',
            fieldLabel: '上报人',
            editable: false,
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 220,
            value: '',
            displayField: 'V_PERSNAME',
            valueField: 'V_PERSCODE',
            store: insertPerStore,
            queryMode: 'local'
        },{
            xtype: 'combo',
            id: 'nextPer',
            fieldLabel: '下一步接收人',
            editable: false,
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 220,
            value: '',
            displayField: 'V_PERSONNAME',
            valueField: 'V_PERSONCODE',
            store: nextSprStore,
            queryMode: 'local'
        },
        {
            xtype: 'displayfield',
            id: 'starttime',
            fieldLabel: '上报开始时间',
            readOnly: true,
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 230,
            value: ''
        },
        {
            xtype: 'displayfield',
            id: 'endtime',
            fieldLabel: '上报截止时间',
            readOnly: true,
            margin: '5 0 0 5',
            labelWidth: 80,
            width: 230,
            value: ''
        },
        {
            xtype: 'button', text: '查询', margin: '5 0 5 5', icon: imgpath + '/search.png',
            handler: function () {
                query();
            }
        },
        {
            xtype: 'button',
            text: '从缺陷添加',
            margin: '5 0 5 5',
            icon: imgpath + '/add.png',
            handler: OnButtonDefectAddClicked
        },
        // {xtype: 'button', text: '手工添加', margin: '5 0 5 5', icon: imgpath + '/add.png',
        //     handler: OnButtonPlanAddClicked},
        {xtype: 'button', text: '添加', margin: '5 0 5 5', icon: imgpath + '/add.png',
            handler: OnButtonFromMonth},
        {
            xtype: 'button',
            text: '模型选择',
            margin: '5 0 5 5',
            icon: imgpath + '/add.png',
            handler: OnButtonSelectClicked
        },
        {xtype: 'button', text: '修改', margin: '5 0 5 5', icon: imgpath + '/edit.png', handler: OnButtonEditClicked},
        // {xtype: 'button', text: '作废', margin: '5 0 5 5', icon: imgpath + '/delete1.png', handler: OnButtonDelete},
        {xtype: 'button', text: '删除', margin: '5 0 5 5', icon: imgpath + '/delete1.png', handler: OnButtonDeleteData},
        {
            xtype: 'button',
            text: '上报',
            margin: '5 0 5 5',
            icon: imgpath + '/accordion_collapse.png',
            handler: OnButtonUp
        },
        {
            xtype: 'button',
            text: '生成工单',
            margin: '5 0 5 5',
            icon: imgpath + '/accordion_collapse.png',
            handler: createWorkorder
        }
    ]
});

var gridPanel = Ext.create('Ext.grid.Panel', {
    id: 'gridPanel',
    region: 'center',
    border: false,
    store: 'gridStore',
    columnLines: true,
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
        {
            text: '关联工单数量',
            dataIndex: 'WORKORDERNUM',
            width: 55,
            align: 'center'
        // ,renderer: function (value, metaData, record) {
        //         // return '<a href="#" onclick="OnClickGrid(\'' + record.data.V_GUID + '\')">' + '工单详情' + '</a>';
        //         return '<a href="#" onclick="OnClickGrid(\'' + record.data.V_GUID + '\')">' + value + '</a>';
        //     }
        },
        {text: '厂矿', align: 'center', width: 120, dataIndex: 'V_ORGNAME'},
        {text: '车间名称', align: 'center', width: 150, dataIndex: 'V_DEPTNAME'},
        {text: '专业', align: 'center', width: 100, dataIndex: 'V_REPAIRMAJOR_CODE'},
        {text: '设备名称', align: 'center', width: 180, dataIndex: 'V_EQUNAME'},
        {xtype: 'linebreakcolumn', text: '计划内容', align: 'center', width: 280, dataIndex: 'V_CONTENT'},
        {text: '检修模型', align: 'center', width: 100, dataIndex: 'V_EQUTYPENAME'},
        {
            text: '计划停机日期',
            align: 'center',
            width: 150,
            dataIndex: 'V_STARTTIME',
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                metaData.style = "text-align:center;";
                return value;
            }
            //renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')
        },
        {
            text: '计划竣工日期',
            align: 'center',
            width: 150,
            dataIndex: 'V_ENDTIME',
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                metaData.style = "text-align:center;";
                return value;
            }
            //renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')
        },
        {text: '计划工期（小时）', align: 'center', width: 150, dataIndex: 'V_HOUR'},
        {text: '录入人', align: 'center', width: 100, dataIndex: 'V_INPERNAME'},

        {text: '主要缺陷', align: 'center', width: 100, dataIndex: 'V_MAIN_DEFECT'},
        {text: '预计寿命', align: 'center', width: 100, dataIndex: 'V_EXPECT_AGE'},
        {text: '维修人数', align: 'center', width: 100, dataIndex: 'V_REPAIR_PER'},
        {text:'施工方式',align:'center',width:'70',dataIndex:'V_SGWAYNAME'},
        {
            text: '录入时间',
            align: 'center',
            width: 150,
            dataIndex: 'V_INDATE',
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                metaData.style = "text-align:center;";
                return value;
            }
            //renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')
        }/*,
        {text: '流程步骤', align: 'center', width: 150, dataIndex: 'V_FLOWNAME'},*/
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
    Ext.getBody().mask();
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [northPanel, gridPanel]
    });
    /*Ext.getCmp('nf').select(date.getFullYear());
    Ext.getCmp('yf').select(date.getMonth() + 1);*/
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
        //Ext.data.StoreManager.lookup('jhzyqStore').insert(0,{V_DEPTCODE:'%', V_DEPTNAME:'全部'});
        Ext.getCmp('jhzyq').select(Ext.data.StoreManager.lookup('jhzyqStore').getAt(0));
        Querytime();
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
        Querytime();
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
        Ext.getBody().unmask();
    });
    Ext.data.StoreManager.lookup('zyStore').on('load', function () {
        Ext.data.StoreManager.lookup('zyStore').insert(0, {V_BASENAME: '全部', V_SPECIALTYCODE: '%'});
        Ext.getCmp("zy").select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
    });
    Ext.data.StoreManager.lookup('stateStore').on('load', function () {
        Ext.data.StoreManager.lookup('stateStore').insert(0, {V_BASENAME: '全部', V_BASECODE: '%'});
        Ext.getCmp("state").select(Ext.data.StoreManager.lookup('stateStore').getAt(0));

        Ext.data.StoreManager.lookup('gridStore').load();

    });

    Ext.getCmp('zks').setValue(getWeekStartDate());
    Ext.getCmp('zjs').setValue(getWeekEndDate());
    Ext.getCmp('nf').on('select', function () {
        Ext.getCmp('zks').setValue(getWeekStartDate());
        Ext.getCmp('zjs').setValue(getWeekEndDate());
        Querytime();
        query();
    });
    Ext.getCmp('yf').on('select', function () {
        Ext.getCmp('zks').setValue(getWeekStartDate());
        Ext.getCmp('zjs').setValue(getWeekEndDate());
        Querytime();
        query();
    });
    Ext.getCmp('zhou').on('select', function () {
        Ext.getCmp('zks').setValue(getWeekStartDate());
        Ext.getCmp('zjs').setValue(getWeekEndDate());
        Querytime();
        query();
    });
    Ext.getCmp('sbmc').on('select', function () {
        query();
    });
    Ext.getCmp('zy').on('select', function () {
        query();
    });

    Ext.getCmp('instPer').select(Ext.data.StoreManager.lookup('insertPerStore').getAt(0));
    // _selectNextSprStore();

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_V_YEAR: Ext.getCmp('nf').getValue(),
            V_V_MONTH: Ext.getCmp('yf').getValue(),
            V_V_WEEK: Ext.getCmp('zhou').getValue(),
            V_V_ORGCODE: Ext.getCmp('jhck').getValue(),
            V_V_DEPTCODE: Ext.getCmp('jhzyq').getValue(),
            V_V_ZY: Ext.getCmp('zy').getValue(),
            V_V_EQUTYPE: Ext.getCmp('sblx').getValue(),
            V_V_EQUCODE: Ext.getCmp('sbmc').getValue(),
            V_V_CONTENT: Ext.getCmp('content').getValue(),
            V_V_STATE: Ext.getCmp('state').getValue(),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize,
            V_V_INPER: Ext.getCmp('instPer').getValue()
        }
    });


});

function _selectNextSprStore() {
    var nextSprStore = Ext.data.StoreManager.lookup('nextSprStore');
    nextSprStore.proxy.extraParams = {
        V_V_ORGCODE: Ext.getCmp('jhck').getValue(),
        V_V_DEPTCODE: Ext.getCmp('jhzyq').getValue(),
        V_V_REPAIRCODE: '',
        V_V_FLOWTYPE: 'WeekPlan',
        V_V_FLOW_STEP: 'start',
        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_SPECIALTY: Ext.getCmp('zy').getValue(),
        V_V_WHERE: ''

    };
    nextSprStore.currentPage = 1;
    nextSprStore.load();
}

//第几周
/*function getWeekOfMonth(string) {//周日为起始
    var date = new Date(string);
    var w = date.getDay();//星期
    var d = date.getDate();//日期
    return Math.ceil((d + 6 - w) / 7);//向上取整
};*/

//第几周
function getWeekOfMonth() {//周一为起始
    var w = date.getDay() == 0 ? 7 : date.getDay();//星期
    var d = date.getDate();//日期

    var week = Math.ceil((d + 7 - w) / 7);//向上取整

    if (week == getWeeks()) {//为最后周
        if (date.getMonth() + 1 == 12) {//为最后月，月份年份均变化
            Ext.getCmp('nf').select(date.getFullYear() + 1);
            Ext.getCmp('yf').select(1);
        } else {//月份变化
            Ext.getCmp('nf').select(date.getFullYear());
            Ext.getCmp('yf').select(date.getMonth() + 2);
        }
        return 1;
    } else {
        Ext.getCmp('nf').select(date.getFullYear());
        Ext.getCmp('yf').select(date.getMonth() + 1);
        return week + 1;
    }

};
//增加天后日期
//function addDate(date,days){
//    var d=new Date(date);
//    d.setDate(d.getDate()+days);
//    var m=d.getMonth()+1;
//    return d.getFullYear()+'-'+m+'-'+d.getDate();
//}
//当前月有几周
function getWeeks() {
    var str = date;
    var year = str.getFullYear();
    var month = str.getMonth() + 1;
    var lastday = new Date(year, month, 0);

    var w = lastday.getDay() == 0 ? 7 : lastday.getDay();//星期
    var d = lastday.getDate();//日期

    return Math.ceil((d + 7 - w) / 7);//向上取整

}

function Querytime() {
    Ext.Ajax.request({
        url: AppUrl + 'PM_03/PRO_PM_PLAN_LOCKING_DATE_GET',
        method: 'POST',
        async: false,
        params: {
            V_I_YEAR: Ext.getCmp('nf').getValue(),
            V_I_MONTH: Ext.getCmp('yf').getValue(),
            V_I_WEEKNUM: Ext.getCmp('zhou').getValue(),
            V_V_TYPE: 'W',
            V_V_DEPTCODE: Ext.getCmp('jhck').getValue()
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.list.length != 1) {
                Ext.getCmp('endtime').setValue('未设置');
                Ext.getCmp('starttime').setValue('未设置');
            } else {
                Ext.getCmp('endtime').setValue(resp.list[0].D_DATE_E.split('.')[0]);
                Ext.getCmp('starttime').setValue(resp.list[0].D_DATE_S.split('.')[0]);
            }
        }
    });
}

//缺陷添加
function OnButtonDefectAddClicked() {
    var weekguid = guid();
    //清空表
    Ext.Ajax.request({
        url: AppUrl + 'cjy/PRO_PM_03_PLAN_WEEK_DEFECT_DEL',
        method: 'POST',
        async: false,
        params: {},
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.V_INFO == 'success') {
                Ext.Ajax.request({//新增空数据
                    url: AppUrl + 'cjy/PRO_PM_03_PLAN_WEEK_SET_GUID',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_GUID: weekguid,
                        V_V_ORGCODE: Ext.getCmp("jhck").getValue()
                    },
                    success: function (resp) {
                        var resp = Ext.decode(resp.responseText);
                        if (resp.V_INFO == 'success') {
                            V_WEEKPLAN_GUID = 0;
                            V_PLANTYPE = 'DEFECT';
                            if (Ext.getCmp("jhzyq").getValue() == "%") {
                                alert("作业区不可以为全部，请重新选择");
                                return;
                            } else {
                                var ret = window.open(AppUrl + 'page/PM_03010313/indexC.html?V_WEEKPLAN_GUID=' + weekguid +
                                    "&V_PLANTYPE=" + V_PLANTYPE +
                                    "&V_WEEKPLAN_TYPE=" + V_WEEKPLAN_TYPE +
                                    "&YEAR=" + Ext.getCmp("nf").getValue() +
                                    "&MONTH=" + Ext.getCmp("yf").getValue() +
                                    "&WEEK=" + Ext.getCmp("zhou").getValue() +
                                    "&V_ORGCODE=" + Ext.getCmp("jhck").getValue() +
                                    "&V_DEPTCODE=" + Ext.getCmp("jhzyq").getValue()+
                                    "&KSTIME="+Ext.getCmp("zks").getValue() , '', 'height=600px,width=1200px,top=50px,left=100px,resizable=yes');
                            }


                        } else {
                            alert("初始数据保存失败");
                        }
                    }
                });
            } else {
                alert("数据清理错误");
            }
        }
    });


}

//手工添加
function OnButtonPlanAddClicked() {
    if (Ext.getCmp("jhzyq").getValue() == "%") {
        alert("作业区不可以为全部，请重新选择");
        return;}
   else{
    V_WEEKPLAN_GUID = 0;
    V_PLANTYPE = 'DEFECT';
    //------update 2018-0907
    //  if(Ext.getCmp('starttime').getValue()<Ext.Date.format(new Date(),'Y-m-d H:i:s')){
    //---end update
    var ret = window.open(AppUrl + 'page/PM_03010310/index.html?V_WEEKPLAN_GUID=0&V_PLANTYPE=' + V_PLANTYPE +
        "&V_WEEKPLAN_TYPE=" + V_WEEKPLAN_TYPE +
        "&YEAR=" + Ext.getCmp("nf").getValue() +
        "&MONTH=" + Ext.getCmp("yf").getValue() +
        "&WEEK=" + Ext.getCmp("zhou").getValue() +
        "&V_ORGCODE=" + Ext.getCmp("jhck").getValue() +
        "&V_DEPTCODE=" + Ext.getCmp("jhzyq").getValue()
        //update start 20180907
        + "&startUpTime=" + Ext.getCmp("zks").getValue()
        + "&endUpTime=" + Ext.getCmp("zjs").getValue()
        //---update end
        , '','_blank', 'height=600px,width=1200px,top=50px,left=100px,resizable=yes');
    //------update 2018-0907
    // }else{
    //     alert("当前计划时间小于可上报时间，请重新修改");
    // }
    //---end update
    }
}

function OnButtonSelectClicked() {
    var ret = window.open(AppUrl + 'page/PM_1922/index.html?YEAR=' + Ext.getCmp("nf").getValue() +
        "&QUARTER=0" +
        "&MONTH=" + Ext.getCmp("yf").getValue() +
        "&WEEK=" + Ext.getCmp("zhou").getValue() +
        "&PLANTYPE=WEEK&startUpTime="+Ext.getCmp("zks").getValue()+
        "&endUpTime="+ Ext.getCmp("zjs").getValue(), '', 'height=600px,width=1200px,top=50px,left=100px,resizable=no,toolbat=no,menubar=no,scrollbars=auto,location=no,status=no');
}

//修改
function OnButtonEditClicked() {
    var seldata = Ext.getCmp('gridPanel').getSelectionModel().getSelection();
    if (seldata.length != 1) {
        Ext.Msg.alert('操作信息', '请选择一条信息进行修改');
        return ;
    }
    if (seldata[0].data.V_INPER!=Ext.util.Cookies.get('v_personcode') && Ext.util.Cookies.get('v_rolecode')!='00'&& Ext.util.Cookies.get('v_rolecode')!='99'){
        Ext.Msg.alert('操作信息', '没有权限修改！');
        return ;
    }
    if (seldata[0].data.V_STATE == 10 || seldata[0].data.V_STATE == 100|| seldata[0].data.V_STATE == 99) {
        V_WEEKPLAN_GUID = seldata[0].data.V_GUID;
        // window.open(AppUrl + 'page/PM_03010310/index.html?V_WEEKPLAN_GUID=' + V_WEEKPLAN_GUID + "&startUpTime=" + Ext.getCmp("starttime").getValue()
        //     + "&endUpTime=" + Ext.getCmp("endtime").getValue()  +'&WSIGN='+1+'', 'height=450px,width=650px,top=50px,left=100px,resizable=yes');
        window.open(AppUrl + 'page/PM_03010318/index.html?V_WEEKPLAN_GUID=' + V_WEEKPLAN_GUID + "&startUpTime=" + Ext.getCmp("zks").getValue() //Ext.getCmp("starttime").getValue()
            + "&endUpTime=" + Ext.getCmp("zjs").getValue() //Ext.getCmp("endtime").getValue()
            +'&WSIGN='+1+'', 'height=450px,width=650px,top=50px,left=100px,resizable=yes');
    }else {
        Ext.Msg.alert('操作信息', '该流程已上报，无法修改！');
    }

}

//作废
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
    Ext.MessageBox.show({
        title: '确认',
        msg: '您确定要作废吗？',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESION,
        fn: function (btn) {
            if (btn == 'yes') {
                var i_err = 0;
                for (var i = 0; i < records.length; i++) {
                    Ext.Ajax.request({
                        url: AppUrl + 'PM_03/PRO_PM_03_PLAN_WEEK_DEL',
                        method: 'POST',
                        async: false,
                        params: {
                            V_V_GUID: records[i].get('V_GUID')
                        },
                        success: function (response) {
                            var resp = Ext.decode(response.responseText);//后台返回的值
                            if (resp.V_INFO == '成功') {//成功，会传回true
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
//删除
function OnButtonDeleteData(){
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
        if (records[i].get('V_STATE') != 100) {
            alert('此计划非作废计划，无法删除');
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
                        url: AppUrl + 'PM_03/PRO_PM_03_PLAN_WEEK_DELDATA',
                        method: 'POST',
                        async: false,
                        params: {
                            V_V_GUID: records[i].get('V_GUID')
                        },
                        success: function (response) {
                            var resp = Ext.decode(response.responseText);//后台返回的值
                            if (resp.V_INFO == '成功') {//成功，会传回true
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
//上传
function OnButtonUp() {
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
    //Ext.MessageBox.show({
    //    title: '确认',
    //    msg: '您确定要上报吗？',
    //    buttons: Ext.MessageBox.YESNO,
    //    icon: Ext.MessageBox.QUESION,
    //    fn: function (btn) {
    //        if (btn == 'yes') {
//---new start 2018-09-17
    var i_err = 0;
    for (var i = 0; i < records.length; i++) {
        if (Ext.Date.format(new Date(), 'Y-m-d H:i:s') >= Ext.getCmp("starttime").getValue() && Ext.Date.format(new Date(), 'Y-m-d H:i:s') <= Ext.getCmp("endtime").getValue()) {
            Ext.Ajax.request({
                url: AppUrl + 'PM_03/PRO_PM_03_PLAN_WEEK_SEND',
                method: 'POST',
                async: false,
                params: {
                    V_V_GUID: records[i].data.V_GUID,
                    V_V_ORGCODE: records[i].data.V_ORGCODE,
                    V_V_DEPTCODE: records[i].data.V_DEPTCODE,
                    V_V_FLOWCODE: '上报',
                    V_V_PLANTYPE: 'WEEK',
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
                                parName: ["originator", "flow_businesskey", V_NEXT_SETP, "idea", "remark", "flow_code", "flow_yj", "flow_type","zyName"],
                                parVal: [Ext.util.Cookies.get('v_personcode'), records[i].get('V_GUID'), Ext.getCmp('nextPer').getValue(), "请审批!", records[i].get('V_CONTENT'), records[i].get('V_WEEKID'), "请审批！", "WeekPlan",records[i].get('V_REPAIRMAJOR_CODE')],
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
                failure: function (response) {
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
        else {
            Ext.Msg.alert('提示', '该计划不在上报时间内！');
        }
    }
    //--end update
    //-----old start
    // var i_err = 0;
    // for (var i = 0; i < records.length; i++) {
    //     Ext.Ajax.request({
    //         url: AppUrl + 'PM_03/PRO_PM_03_PLAN_WEEK_SEND',
    //         method: 'POST',
    //         async: false,
    //         params: {
    //             V_V_GUID: records[i].data.V_GUID,
    //             V_V_ORGCODE: records[i].data.V_ORGCODE,
    //             V_V_DEPTCODE: records[i].data.V_DEPTCODE,
    //             V_V_FLOWCODE: '上报',
    //             V_V_PLANTYPE: 'WEEK',
    //             V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode')
    //         },
    //         success: function (resp) {
    //             var resp = Ext.decode(resp.responseText).list[0];
    //
    //             if (resp.V_INFO == '成功') {
    //                 Ext.Ajax.request({
    //                     url: AppUrl + 'Activiti/StratProcess',
    //                     async: false,
    //                     method: 'post',
    //                     params: {
    //                         parName: ["originator", "flow_businesskey", V_NEXT_SETP, "idea", "remark", "flow_code", "flow_yj", "flow_type"],
    //                         parVal: [Ext.util.Cookies.get('v_personcode'), records[i].get('V_GUID'), Ext.getCmp('nextPer').getValue(), "请审批!", records[i].get('V_CONTENT'), records[i].get('V_WEEKID'), "请审批！", "WeekPlan"],
    //                         processKey: processKey,
    //                         businessKey: records[i].get('V_GUID'),
    //                         V_STEPCODE: 'Start',
    //                         V_STEPNAME: V_STEPNAME,
    //                         V_IDEA: '请审批！',
    //                         V_NEXTPER: Ext.getCmp('nextPer').getValue(),
    //                         V_INPER: Ext.util.Cookies.get('v_personcode')
    //                     },
    //                     success: function (response) {
    //                         if (Ext.decode(response.responseText).ret == 'OK') {
    //
    //                         } else if (Ext.decode(response.responseText).error == 'ERROR') {
    //                             Ext.Msg.alert('提示', '该流程发起失败！');
    //                         }
    //                     }
    //                 });
    //                 i_err++;
    //
    //                 if (i_err == records.length) {
    //                     query();
    //                 }
    //             } else {
    //                 Ext.MessageBox.show({
    //                     title: '错误',
    //                     msg: resp.V_INFO,
    //                     buttons: Ext.MessageBox.OK,
    //                     icon: Ext.MessageBox.ERROR,
    //                     fn: function (btn) {
    //                         query();
    //                     }
    //                 });
    //             }
    //         },
    //         failure: function (response) {
    //             Ext.MessageBox.show({
    //                 title: '错误',
    //                 msg: response.responseText,
    //                 buttons: Ext.MessageBox.OK,
    //                 icon: Ext.MessageBox.ERROR,
    //                 fn: function (btn) {
    //                     query();
    //                 }
    //             })
    //         }
    //     });
    // }
    //------old end
}

function getReturnQXXZ(retdata) {
    var num = 0;
    var message = '';
    for (var i = 0; i < retdata.length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'qx/PRO_PM_07_DEFECT_GET',
            method: 'POST',
            async: false,
            params: {
                V_V_GUID: retdata[i]
            },
            success: function (ret) {
                var resp = Ext.JSON.decode(ret.responseText);

                var list = resp.list;
                var V_V_GUID = list[0].V_GUID;
                var V_V_ORGCODE = list[0].V_ORGCODE;//厂矿
                var V_V_DEPTCODE = list[0].V_DEPTCODE;//作业区
                var V_V_EQUTYPECODE = list[0].V_EQUTYPECODE;//设备类型
                var V_V_EQUCODE = list[0].V_EQUCODE;//设备名称
                var V_V_REPAIRMAJOR_CODE = list[0].V_REPAIRMAJOR_CODE;//检修专业
                var V_V_CONTENT = list[0].V_DEFECTLIST;//检修内容//就是缺陷明细
                var V_V_STARTTIME = list[0].D_DEFECTDATE;
                var V_V_ENDTIME = list[0].D_DEFECTDATE;
                var V_V_HOUR = list[0].V_HOUR;
                var V_V_BZ = list[0].V_BZ;

                Ext.Ajax.request({
                    url: AppUrl + 'basic/PRO_PM_03_PLAN_WEEK_SET',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_INPER: Ext.util.Cookies.get('v_personcode'),               //人员cookies                                    //人员编码
                        V_V_GUID: '0',                         //季度计划guid                                                      //计划GUID
                        V_V_YEAR: Ext.getCmp('nf').getValue(),                        //年份                                            //年份
                        V_V_MONTH: Ext.getCmp('yf').getValue(),                     //月份                                           //年份
                        V_V_WEEK: Ext.getCmp('zhou').getValue(),                      //周                                          //年份
                        V_V_ORGCODE: V_V_ORGCODE,                        //厂矿                                              //厂矿
                        V_V_DEPTCODE: V_V_DEPTCODE,                      //作业区
                        V_V_EQUTYPECODE: V_V_EQUTYPECODE,                  //设备类型                                              //设备类型编码
                        V_V_EQUCODE: V_V_EQUCODE,                     //设备名称
                        V_V_REPAIRMAJOR_CODE: V_V_REPAIRMAJOR_CODE,              //检修专业
                        V_V_CONTENT: V_V_CONTENT,                     //检修内容
                        V_V_STARTTIME: V_V_STARTTIME,                                       //开始时间
                        V_V_ENDTIME: V_V_ENDTIME,                                          //结束时间
                        V_V_OTHERPLAN_GUID: '',                                  //检修工序编码
                        V_V_OTHERPLAN_TYPE: '',                                  //检修模型编码
                        V_V_JHMX_GUID: '',                                          //检修标准
                        V_V_HOUR: V_V_HOUR,
                        V_V_BZ: V_V_BZ,
                        V_V_DEFECTGUID: V_V_GUID
                    },
                    success: function (ret) {
                        var resp = Ext.decode(ret.responseText);
                        if (resp.V_INFO == '成功') {

                            num++;
                            //alert("成功");
                            //query();
                        } else {
                            //alert("失败");
                            message = resp.V_INFO;
                        }
                    }
                });

            }
        });
    }
    if (num != retdata.length) {
        alert(message);
    } else {
        alert("成功");
    }
    query();
}

//月共几天
function getDaysOfMonth(year, month) {
    var month = parseInt(month, 10);
    var d = new Date(year, month, 0);
    return d.getDate();
}

//本周开始时间
function getWeekStartDate() {
    var year = Ext.getCmp('nf').getValue();
    var month = Ext.getCmp('yf').getValue();
    var week = Ext.getCmp('zhou').getValue();
    var dat = new Date(year, month - 1, 1);
    var day = dat.getDay();
    var date = dat.getDate() + (week - 1) * 7;
    var hao = dat.getDate();
    var days = getDaysOfMonth(year, month - 1);//上月有几天
    if (day == 0) {
        day = 7;
    }
    if (date < day) {
        hao = date + days - day + 1;
    } else {
        hao = date - day + 1;
    }
    var yue = dat.getMonth();
    if (date < day) {
        yue = yue - 1;
    }
    var nian = dat.getFullYear();
    if (yue < 0) {
        nian = nian - 1;
        yue = yue + 12;
    }
    if (hao > getDaysOfMonth(year, month)) {
        hao = hao - getDaysOfMonth(year, month);
        yue = yue + 1;
    }
    if (yue > 11) {
        nian == nian + 1;
    }
    return nian + "-" + (yue + 1) + "-" + hao;
}

//本周结束时间
function getWeekEndDate() {
    var year = Ext.getCmp('nf').getValue();
    var month = Ext.getCmp('yf').getValue();
    var week = Ext.getCmp('zhou').getValue();
    var dat = new Date();
    var dat = new Date(year, month - 1, 1);
    var day = dat.getDay();
    var date = dat.getDate() + (week - 1) * 7;
    var hao = dat.getDate();
    var days = getDaysOfMonth(year, month);//本月有几天
    if (day == 0) {
        day = 7;
    }
    hao = date + (7 - day);
    var yue = dat.getMonth();
    if (hao > days) {
        hao = hao - days;
        yue = yue + 1;
    }
    var nian = dat.getFullYear();
    if (yue > 11) {
        yue = yue - 12;
        nian = nian + 1;
    }
    return nian + "-" + (yue + 1) + "-" + hao;
}

function createWorkorder() {
    var record = Ext.getCmp('gridPanel').getSelectionModel().getSelection();
    if (record.length == 0) {
        alert('请至少选择一条记录');
        return;
    }

    var V_GUIDList = '';
    for (var i = 0; i < record.length; i++) {
        if (record[i].data.V_STATE  == '10' && record[i].data.V_STATE == '100'&&record[i].data.V_STATE== '20'&&record[i].data.V_STATE== '99') {
            alert("该计划状态无法生成工单");
            return;
        }
        // if(record[i].get('V_INPER')!==Ext.util.Cookies.get('v_personcode')){
        //     alert("该计划录入人非本人，无法生成工单");
        //     return;
        // }
        if (i == 0) {
            V_GUIDList = record[i].data.V_GUID;
        } else {
            V_GUIDList += ',' + record[i].data.V_GUID;
        }
    }

    Ext.Ajax.request({
        url: AppUrl + 'lxm/PM_03_PLAN_CREATE_WORKORDERBEF',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID: V_GUIDList
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.v_info == "SUCCESS") {
                Ext.Ajax.request({
                    url: AppUrl + 'lxm/PM_03_PLAN_CREATE_WORKORDER',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_GUID: V_GUIDList,
                        V_V_PERCODE: Ext.util.Cookies.get('v_personcode')
                    },
                    success: function (resp) {
                        var resp = Ext.decode(resp.responseText);
                        var V_V_ORDERGUID = resp.V_V_ORDERGUID;
                        var V_V_SOURCECODE = resp.V_V_SOURCECODE;
                        var V_V_EQUTYPE = resp.V_V_EQUTYPE;
                        if (url_guid != undefined) {
                            Ext.Ajax.request({
                                url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_TOWORK_U',
                                type: 'post',
                                async: false,
                                params: {
                                    V_V_IP: GetIP().ip,
                                    V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
                                    V_V_PERNAME: Ext.util.Cookies.get('v_personname'),
                                    V_V_ORDERGUID: resp.list[0].V_ORDERGUID,
                                    V_V_GUID: url_guid
                                },
                                success: function (response) {
                                    var resp = Ext.decode(response.responseText);
                                    if (resp.v_info == "success") {
                                        for (var i = 0; i < record.length; i++) {//录入关系表
                                            Ext.Ajax.request({//
                                                method: 'POST',
                                                async: false,
                                                url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SET_W',
                                                params: {
                                                    V_V_WORKORDER_GUID: V_V_ORDERGUID,
                                                    V_V_WEEK_GUID: record[i].data.V_GUID
                                                },
                                                success: function (response) {
                                                    var respm = Ext.decode(response.responseText);
                                                    if (respm.V_INFO == 'success') {

                                                    } else {
                                                        alert("关系数据保存错误,工单生成失败");
                                                        return;
                                                    }

                                                }
                                            });

                                        }
                                        window.open(AppUrl + "page/pm_dxgc_orderEdit/index.html?V_V_ORDERGUID=" + V_V_ORDERGUID + "&V_V_SOURCECODE=" + V_V_SOURCECODE + '&V_V_EQUTYPE=' + V_V_EQUTYPE,
                                            "", "dialogHeight:700px;dialogWidth:1100px");
                                    }
                                }
                            });
                        } else {
                            alert(resp.v_info);
                        }
                    }
                });
            } else {
                alert(resp.v_info);
            }

        }
    });


}

function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function _preViewProcess(businessKey) {

    var ProcessInstanceId = '';
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
            if (data.msg == 'Ok') {
                ProcessInstanceId = data.InstanceId;
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
    var oheight = window.screen.availHeight - 50;
    var ret = window.open(AppUrl + 'page/PM_210301/index.html?ProcessInstanceId='
        + ProcessInstanceId, '', 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes');

}
// 添加、月计划选择
function OnButtonFromMonth(){
    var equtype=0;
    var equcode=0;
    var zy=0;
    if(Ext.getCmp("jhck").getValue()==""||Ext.getCmp("jhck").getValue()=="%"){
        alert('请先选择厂矿');
        return false;
    }
    if(Ext.getCmp("jhzyq").getValue()==""||Ext.getCmp("jhzyq").getValue()=="%"){
        alert('请先选择作业区');
        return false;
    }
    // if(Ext.getCmp("sblx").getValue()==""){
    //     alert('请先选择设备类型');
    //     return false;
    // }
    // if(Ext.getCmp("sbmc").getValue()==""||Ext.getCmp("sbmc").getValue()=="%"){
    //     alert('请先选择设备名称');
    //     return false;
    // }
    // if(Ext.getCmp("zy").getValue()==""||Ext.getCmp("zy").getValue()=="%"){
    //     alert('请先选择专业');
    //     return false;
    // }
    if(Ext.getCmp("sblx").getValue()=="%"){
        equtype=0;
    }
    if(Ext.getCmp("sbmc").getValue()=="%"){
        equcode=0;
    }
    if(Ext.getCmp("zy").getValue()=="%"){
        zy=0;
    }
    var owidth = window.screen.availWidth;
    var oheight = window.screen.availHeight - 50;
    var ret = window.open(AppUrl + 'page/PM_03010317/index.html?Oyear='
        + Ext.getCmp("nf").getValue()+'&Omonth='+Ext.getCmp('yf').getValue()
        +'&V_V_ORGCODE='+Ext.getCmp("jhck").getValue()
        +'&V_V_DEPTCODE='+Ext.getCmp("jhzyq").getValue()
        +'&V_V_EQUTYPE='+equtype
        +'&V_V_EQUCODE='+equcode
        +'&V_V_ZY='+zy
        +"&WEEK=" + Ext.getCmp("zhou").getValue()
        +'&startUpTime='+ Ext.getCmp("zks").getValue()
        +'&endUpTime='+Ext.getCmp("zjs").getValue(),'','_blank','height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes');
}