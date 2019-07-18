var date = new Date();
var V_MONTHPLAN_GUID = '';
var processKey = '';
var V_STEPNAME = '';
var V_NEXT_SETP = '';
var V_PLANTYPE="";
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
        'V_REPAIR_PER','V_SGWAY','V_SGWAYNAME','V_WEEKNUM'],
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
            width: 230,
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
            width: 230,
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
            width: 230,
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
            width: 230,
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
            labelAlign: 'right',
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
            id: 'nextPer',
            labelAlign: 'right',
            fieldLabel: '下一步接收人',
            editable: false,
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 230,
            value: '',
            displayField: 'V_PERSONNAME',
            valueField: 'V_PERSONCODE',
            store: nextSprStore,
            queryMode: 'local'
        },
        {
            xtype: 'panel', frame: true, width: '100%', layout: 'column', colspan: 8, baseCls: 'my-panel-noborder',style: 'margin:5px 5px 0 5px',
            items: [
        {
            xtype: 'displayfield',
            id: 'endtime',
            labelAlign: 'right',
            fieldLabel: '截止时间',
            readOnly: true,
            margin: '5 0 5 5',
            labelWidth: 80,
            width: 230,
            value: ''
        },
        {
            xtype: 'button',
            text: '查询',
            margin: '5 0 5 45',
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
            // handler: OnButtonAddClicked --原手动添加
            handler:OnButtonAddFYear

        },
        {
            xtype: 'button',
            text: '从缺陷添加',
            margin: '5 0 5 5',
            icon: imgpath + '/add.png',
            handler: OnButtonDefectAddClicked
        },
        {
            xtype: 'button',
            text: '从备件添加',
            margin: '5 0 5 5',
            icon: imgpath + '/add.png',
            handler: OnButtonBJAddClicked
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
        // {
        //     xtype: 'button',
        //     text: '作废',
        //     margin: '5 0 5 5',
        //     icon: imgpath + '/delete1.png',
        //     handler: OnButtonDelete
        // },
        {
            xtype: 'button',
            text: '删除',
            margin: '5 0 5 5',
            icon: imgpath + '/delete1.png',
            handler: OnButtonDeleteData
        },
        {
            xtype: 'button',
            text: '上报',
            margin: '5 0 5 5',
            icon: imgpath + '/accordion_expand.png',
            handler: OnButtonUp
        }
        /*,{
            xtype: 'button',
            text: '导入放行计划',
            margin: '5 0 5 5',
            icon: imgpath + '/accordion_expand.png',
            listeners: {click: OnButtonDR}
        }*/
        /*,
        {
            xtype: 'button',
            text: '生成工单',
            margin: '5 0 5 5',
            icon: imgpath + '/accordion_collapse.png',
            handler: createWorkorder
        }*/

         ]
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
        {text: '流程详细', dataIndex: 'V_ORDERID', width: 90, align: 'center', renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {return '<a href="javascript:_preViewProcess(\'' + record.data.V_GUID + '\')" >' + '详细' + '</a>';}},
        {text: '缺陷详细', dataIndex: 'V_GUID', width: 90, align: 'center', renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {return '<a href="javascript:OnLookDefect(\'' + record.data.V_GUID + '\')">' + '详细' + '</a>';}},
        {text: '对应周计划', dataIndex: 'V_WEEKNUM', width: 100, align: 'center', renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {return record.data.V_WEEKNUM+' 条';}},
        {text: '厂矿', align: 'center', width: 100, dataIndex: 'V_ORGNAME'},
        {text: '车间名称', align: 'center', width: 150, dataIndex: 'V_DEPTNAME'},
        {text: '专业', align: 'center', width: 100, dataIndex: 'V_REPAIRMAJOR_CODE'},
        {text: '设备名称', align: 'center', width: 100, dataIndex: 'V_EQUNAME'},
        {xtype: 'linebreakcolumn', text: '检修内容', align: 'center', width: 280, dataIndex: 'V_CONTENT'},
        {text: '计划停机日期', align: 'center', width: 200, dataIndex: 'V_STARTTIME', renderer: rendererTime},
        {text: '计划竣工日期', align: 'center', width: 200, dataIndex: 'V_ENDTIME', renderer: rendererTime },
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
    Ext.getBody().mask();
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
        Ext.getBody().unmask();
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

function OnLookDefect(MonthGuid){
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    window.open(AppUrl + 'page/PM_03010201/LookDefet.html?V_V_GUID='+MonthGuid, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}

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
function OnButtonAddClicked() {
    if(Ext.getCmp("jhzyq").getValue()=="%"){
        alert("作业区不可以为全部，请重新选择"); return;
    }
    V_MONTHPLAN_GUID = '0';
    var ret = window.open(AppUrl + 'page/PM_03010208/index.html?V_MONTHPLAN_GUID=' + V_MONTHPLAN_GUID +
        "&YEAR=" + Ext.getCmp("nf").getValue() +
        "&MONTH=" + Ext.getCmp("yf").getValue() +
        "&V_ORGCODE=" + Ext.getCmp("jhck").getValue() +
        "&V_DEPTCODE=" + Ext.getCmp("jhzyq").getValue(), '', 'height=600px,width=1200px,top=50px,left=100px,resizable=yes');
}

function OnButtonSelectClicked() {
    var ret = window.open(AppUrl + 'page/PM_1922/index.html?YEAR=' + Ext.getCmp("nf").getValue() +
        "&QUARTER=0" +
        "&MONTH=" + Ext.getCmp("yf").getValue() +
        "&WEEK=0" +
        "&PLANTYPE=MONTH", '', 'height=600px,width=1200px,top=50px,left=100px,resizable=yes');
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
        V_MONTHPLAN_GUID = seldata[0].data.V_GUID;
        // var ret = window.open(AppUrl + 'page/PM_03010208/index.html?V_MONTHPLAN_GUID=' + V_MONTHPLAN_GUID, '', 'height=600px,width=1200px,top=50px,left=100px,resizable=no');
        var ret = window.open(AppUrl + 'page/PM_03010209/upMData.html?V_MONTHPLAN_GUID=' + V_MONTHPLAN_GUID+'&MainMONTH='+Ext.getCmp("yf").getValue()
            +'&MainYEAR='+Ext.getCmp("nf").getValue(), '', 'height=600px,width=1200px,top=50px,left=100px,resizable=yes');
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
    for (var i = 0; i < records.length; i++) {
        if (records[i].data.V_STATENAME != '未发起') {
            Ext.Msg.alert('提升信息', '只能删除未发起的数据');
            return false;
        }
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
        if (records[i].data.V_STATE != 100&&records[i].data.V_STATE != 10&&records[i].data.V_STATE != 99) {
            Ext.Msg.alert('提示信息', '只有作废、已驳回和未发起的数据可以删除');
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
                    //修改年计划添加未关联关联缺陷状态
                    Ext.Ajax.request({
                        url: AppUrl + 'dxfile/YEAR_TO_MONTH_DEL',
                        method: 'POST',
                        async: false,
                        params: {
                            V_YEARGUID:'',
                            V_MONTHGUID: records[i].get('V_GUID'),
                            V_DEFECTGUID:'',
                            V_PER_CODE:Ext.util.Cookies.get('v_personcode')
                        },
                        success: function (response) {
                            var resp = Ext.decode(response.responseText);//后台返回的值
                            if (resp.RET == 'SUCCESS') {

                            }
                        }
                    });

                    //月计划缺陷状态关联删除
                    Ext.Ajax.request({
                        url: AppUrl + 'dxfile/PRO_PM_DEL_MONTH_RE_DEF',
                        method: 'POST',
                        async: false,
                        params: {
                            V_V_GUID:records[i].get('V_GUID')
                        },
                        success: function (response) {
                            var resp = Ext.decode(response.responseText);//后台返回的值
                            if (resp.RET == 'SUCCESS') {

                            }
                        }
                    });

                    Ext.Ajax.request({
                        url: AppUrl + 'hp/PRO_PM_03_PLAN_MONTH_DELDATA',
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
    /* if (Ext.Date.format(new Date(Ext.getCmp('endtime').getValue()), 'Y/m/d') < Ext.Date.format(new Date(), 'Y/m/d')) {
         alert("已过上报时间，不能上报");
         return false;
     }
 */ if(Ext.getCmp('nextPer').getValue()==""){
        alert('下一步审批人不可以空，请重新选择');
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
                if (resp.V_INFO != 'Fail') {

                    Ext.Ajax.request({
                        url: AppUrl + 'Activiti/StratProcess',
                        async: false,
                        method: 'post',
                        params: {
                            parName: ["originator", "flow_businesskey", V_NEXT_SETP, "idea", "remark", "flow_code", "flow_yj","flow_type","zyName"],
                            parVal: [Ext.util.Cookies.get('v_personcode'), records[i].get('V_GUID'), Ext.getCmp('nextPer').getValue(), "请审批!", records[i].get('V_CONTENT'), records[i].get('V_MONTHID'), "请审批！","MonthPlan",records[i].get('V_REPAIRMAJOR_CODE')],
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
                    Ext.Msg.alert('提示', '上报失败！');
                }
            }
        });
    }

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
            V_V_TYPE: 'M',
            V_V_DEPTCODE:Ext.getCmp('jhck').getValue()
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
function _weekPlanDetail(monthGuid)
{


    var owidth = window.screen.availWidth-300;
    var oheight =  window.screen.availHeight - 500;
    var ret = window.open(AppUrl + 'page/PM_03010201/weekdetail.html?monthGuid='+monthGuid, '', 'height='+ oheight +'px,width= '+ owidth + 'px,top=50px,left=100px,resizable=yes');

}
//缺陷添加
function OnButtonDefectAddClicked() {
    // var weekguid=guid();
    // //清空表
    // Ext.Ajax.request({
    //     url: AppUrl + 'cjy/PRO_PM_03_PLAN_WEEK_DEFECT_DEL',
    //     method: 'POST',
    //     async: false,
    //     params: {
    //     },
    //     success: function (resp) {
    //         var resp = Ext.decode(resp.responseText);
    //         if (resp.V_INFO=='success') {
    //             Ext.Ajax.request({//新增空数据
    //                 url: AppUrl + 'cjy/PRO_PM_03_PLAN_WEEK_SET_GUID',
    //                 method: 'POST',
    //                 async: false,
    //                 params: {
    //                     V_V_GUID:weekguid,
    //                     V_V_ORGCODE: Ext.getCmp("jhck").getValue()
    //                 },
    //                 success: function (resp) {
    //                     var resp = Ext.decode(resp.responseText);
    //                     if (resp.V_INFO=='success') {
    //                         V_WEEKPLAN_GUID = 0;
    V_PLANTYPE = 'DEFECT';
    //                         if(Ext.getCmp("jhzyq").getValue()=="%"){
    //                             alert("作业区不可以为全部，请重新选择"); return;
    //                         }else {
    var ret = window.open(AppUrl + 'page/PM_03010218/index.html?Month=' + "" +
        "&V_PLANTYPE=" + V_PLANTYPE +
        "&YEAR=" + Ext.getCmp("nf").getValue() +
        "&MONTH=" + Ext.getCmp("yf").getValue() +
        "&V_ORGCODE=" + Ext.getCmp("jhck").getValue() +
        "&V_DEPTCODE=" + Ext.getCmp("jhzyq").getValue(), '', 'height=600px,width=1200px,top=50px,left=100px,resizable=yes');
    //                         }
    //                     } else {
    //                         alert("初始数据保存失败");
    //                     }
    //                 }
    //             });
    //         } else {
    //             alert("数据清理错误");
    //         }
    //     }
    // });


}
function createWorkorder() {
    var record = Ext.getCmp('gridPanel').getSelectionModel().getSelection();
    if (record.length == 0) {
        alert('请至少选择一条记录');
        return;
    }

    var V_GUIDList = '';
    for (var i = 0; i < record.length; i++) {
        if(record[i].data.V_STATE=='10'&&record[i].data.V_STATE=='100'&&record[i].data.V_STATE== '20'&&record[i].data.V_STATE== '99'){
            alert("该计划状态无法生成工单");
            return;
        }
        if (i == 0) {
            V_GUIDList = record[i].data.V_GUID;
        } else {
            V_GUIDList += ',' + record[i].data.V_GUID;
        }
    }

    Ext.Ajax.request({
        url: AppUrl + 'cjy/PM_03_PLAN_CREATE_WORKORDERMON',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID: V_GUIDList
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.v_info == "SUCCESS") {
                Ext.Ajax.request({
                    url: AppUrl + 'cjy/PM_03_PLAN_M_CREATE_WORKORDER',
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
                        Ext.Ajax.request({
                            url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_TOWORK_U',
                            type: 'post',
                            async: false,
                            params: {
                                V_V_IP: GetIP().ip,
                                V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
                                V_V_PERNAME: Ext.util.Cookies.get('v_personname'),
                                V_V_ORDERGUID: resp.list[0].V_ORDERGUID,
                                V_V_GUID: ''
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
                                                if(respm.V_INFO=='success'){

                                                }else{
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
function OnButtonDR(){
    Ext.getBody().mask('<p>放行月计划导入中...</p>');
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/DR_PM_03_PLAN_MONTH',
        method: 'POST',
        async: false,
        params: {
            V_V_YEAR: Ext.getCmp('nf').getValue(),
            V_V_MOUTH: Ext.getCmp('yf').getValue()
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if(resp.V_INFO=='SUCCESS'){
                alert('放行月计划导入成功');
                query();
                Ext.getBody().unmask();

            }else{
                alert('放行月计划导入失败');
                Ext.getBody().unmask();
            }
        },failure: function (response) {
            alert('放行月计划导入失败');
            Ext.getBody().unmask();
        }
    });

}
//从年计划添加
function OnButtonAddFYear(){
    var year=Ext.getCmp("nf").getValue();
    var owidth = window.document.body.offsetWidth - 600;
    var oheight = window.document.body.offsetHeight - 100;
    // window.open(AppUrl + 'page/PM_03010201/finishyear.html?MainMONTH='
    window.open(AppUrl + 'page/PM_03010201/newmadd.html?MainMONTH='
        + Ext.getCmp('yf').getValue()
        +"&MainYEAR=" + year
        + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes' );
}

//从备件添加缺陷
function OnButtonBJAddClicked(){


    V_PLANTYPE = 'BJ';
    var ret = window.open(AppUrl + 'page/PM_03010220/index.html?Month=' + "" +
        "&V_PLANTYPE=" + V_PLANTYPE +
        "&YEAR=" + Ext.getCmp("nf").getValue() +
        "&MONTH=" + Ext.getCmp("yf").getValue() +
        "&V_ORGCODE=" + Ext.getCmp("jhck").getValue() +
        "&V_DEPTCODE=" + Ext.getCmp("jhzyq").getValue(), '', 'height=600px,width=1200px,top=50px,left=100px,resizable=yes');
}