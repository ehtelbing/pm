var date = new Date();
var V_WEEKPLAN_GUID = '';
var V_WEEKPLAN_TYPE = '';

var usercode = '';

if (location.href.split('?')[1] != undefined) {
    usercode = Ext.urlDecode(location.href.split('?')[1]).usercode;
}

if (usercode != '') {
    OnPageMMLogin();
}


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
var inputer = [];
inputer.push({v_code: '%', v_name: '全部'});
inputer.push({v_code: Ext.util.Cookies.get('v_personcode'), v_name: decodeURI(Ext.util.Cookies.get('v_personname'))});
var inputerStore = Ext.create("Ext.data.Store", {
    storeId: 'inputerStore',
    fields: ['v_code', 'v_name'],
    data: inputer,
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
        'V_STATUSNAME', 'V_GUID', 'V_STATENAME', 'V_INPERNAME', 'V_FLOWNAME',
        'V_MAIN_DEFECT',
        'V_EXPECT_AGE',
        'V_REPAIR_PER',
        'V_OTHERPLAN_GUID','V_OTHERPLAN_TYPE','WORKORDERNUM','DRSIGN','V_WEEKID'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'dxfile/PRO_PM_03_PLAN_WEEK_VIEW2',
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
    Ext.data.StoreManager.lookup('gridStore').currentPage = 1;
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
            V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTTYPE:'主体作业区',
            V_V_INPER:Ext.getCmp('lrr').getValue(),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    });
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
            margin: '5 0 0 5',
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
            margin: '5 0 0 5',
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
            margin: '5 0 0 5',
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
            margin: '5 0 0 5',
            labelWidth: 80,
            width: 230,
            labelAlign: 'right'
        },
        {
            xtype: 'displayfield',
            id: 'zjs',
            fieldLabel: '本周结束时间',
            margin: '5 0 0 5',
            labelWidth: 80,
            width: 230,
            labelAlign: 'right'
        },
        {
            xtype: 'combo',
            id: 'jhck',
            fieldLabel: '计划厂矿',
            editable: false,
            margin: '5 0 0 5',
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
            margin: '5 0 0 5',
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
            margin: '5 0 0 5', labelWidth: 80, width: 230,
            value: '',
            displayField: 'V_EQUTYPENAME',
            valueField: 'V_EQUTYPECODE',
            store: sblxStore,
            queryMode: 'local'
        },
        {
            xtype: 'combo',
            id: 'sbmc',
            fieldLabel: '设备名称',
            editable: false,
            labelAlign: 'right',
            margin: '5 0 0 5', labelWidth: 80, width: 230,
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
            editable: false,
            margin: '5 0 0 5', labelWidth: 80, width: 230,
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
            margin: '5 0 0 5', labelWidth: 80, width: 230,
            value: '',
            displayField: 'V_BASENAME',
            valueField: 'V_BASECODE',
            store: stateStore,
            queryMode: 'local'
        }, {
            xtype: 'textfield',
            id: 'content',
            fieldLabel: '检修内容',
            margin: '5 0 0 5',
            labelWidth: 80,
            width: 230
        },{
            xtype: 'combo',
            id: 'lrr',
            fieldLabel: '录入人',
            editable: false,
            margin: '5 25 0 5',
            labelWidth: 80,
            width: 230,
            labelAlign: 'right',
            value: '',
            displayField: 'v_name',
            valueField: 'v_code',
            store: inputerStore,
            queryMode: 'local'
        },
        /*{xtype: 'displayfield',id:'starttime',fieldLabel: '上报开始时间',readOnly: true,  margin: '5 0 0 5',labelWidth:80,width:230, value: ''},
        {xtype: 'displayfield',id:'endtime',fieldLabel: '上报截止时间',readOnly: true, margin: '5 0 0 5',labelWidth:80,width:230,value: ''},*/
        {
            xtype: 'button', text: '查询', margin: '5 0 5 20', icon: imgpath + '/search.png',
            handler: function () {
                query();
            }
        }, {
            xtype: 'button',
            text: '导出excel',
            style: ' margin: 5px 0px 5px 5px',
            icon: imgpath + '/excel.gif',
            width: 100,
            listeners: {
                click: OnClickExcelButton
            }
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
        {text: '计划状态', align: 'center', width: 100, dataIndex: 'V_STATENAME', renderer: dataCss},
        {
            text: '审批详情',
            dataIndex: 'V_ORDERID',
            width: 100,
            align: 'center',
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                // if(record.get('DRSIGN')=="1") {
                //     metaData.style = "background-color: yellow";
                // }
                return '<a href="#" onclick="_preViewProcess(\'' + record.data.V_GUID + '\')">' + '详细' + '</a>';
            }
        },{
            text: '工单详情',
            dataIndex: 'WORKORDERNUM',
            width: 100,
            align: 'center',
            renderer: function (value, metaData, record) {
                // if(record.get('DRSIGN')=="1") {
                //     metaData.style = "background-color: yellow";
                // }
                // return '<a href="#" onclick="OnClickGrid(\'' + record.data.V_GUID + '\')">' + '工单详情' + '</a>';
                return '<a href="#" onclick="OnClickGrid(\'' + record.data.V_GUID + '\')">' + value + '</a>';
            }
        },
        {
            text:'关联计划',
            dataIndex:'',
            width:100,
            align:'center',
            renderer:function(value,metaData,record){
                // if(record.get('DRSIGN')=="1") {
                //     metaData.style = "background-color: yellow";
                // }
                if(record.data.V_OTHERPLAN_GUID!=""){
                    return '<a href="#" onclick="OnClickOtherGrid(\''+record.data.V_OTHERPLAN_GUID+'\',\''+record.data.V_OTHERPLAN_TYPE+'\')">'+'关联计划'+'</a>';
                }else{
                    return '<a href="#" onclick="OnClickOtherGrid(\''+record.data.V_OTHERPLAN_GUID+'\',\''+record.data.V_OTHERPLAN_TYPE+'\')">'+''+'</a>';
                }

            }
        },
        {text: '周单号', align: 'center', width: 100, dataIndex: 'V_WEEKID',renderer: dataCss },
        {text: '厂矿', align: 'center', width: 100, dataIndex: 'V_ORGNAME', renderer: dataCss},
        {text: '车间名称', align: 'center', width: 100, dataIndex: 'V_DEPTNAME', renderer: dataCss},
        {text: '专业', align: 'center', width: 100, dataIndex: 'V_REPAIRMAJOR_CODE', renderer: dataCss},
        {text: '设备名称', align: 'center', width: 100, dataIndex: 'V_EQUNAME', renderer: dataCss},
        {text: '计划内容', align: 'center', width: 280, dataIndex: 'V_CONTENT', renderer: dataCss},
        {text: '检修模型', align: 'center', width: 100, dataIndex: 'V_EQUTYPENAME', renderer: dataCss},
        {text: '计划停机日期', align: 'center', width: 150, dataIndex: 'V_STARTTIME', renderer: rendererTime},
        {text: '计划竣工日期', align: 'center', width: 150, dataIndex: 'V_ENDTIME', renderer: rendererTime},
        {text: '计划工期（小时）', align: 'center', width: 150, dataIndex: 'V_HOUR', renderer: dataCss},
        {text: '录入人', align: 'center', width: 100, dataIndex: 'V_INPERNAME', renderer: dataCss},
        {text: '主要缺陷', align: 'center', width: 100, dataIndex: 'V_MAIN_DEFECT', renderer: dataCss},
        {text: '预计寿命', align: 'center', width: 100, dataIndex: 'V_EXPECT_AGE', renderer: dataCss},
        {text: '维修人数', align: 'center', width: 100, dataIndex: 'V_REPAIR_PER', renderer: dataCss},
        {text: '录入时间', align: 'center', width: 100, dataIndex: 'V_INDATE', renderer: rendererTime}
        ,{text:'导入标示符',align:'center',width:150,dataIndex:'DRSIGN',hidden:true}
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
    Ext.QuickTips.init();
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [northPanel, gridPanel]
    });
    Ext.getCmp('nf').select(new Date().getFullYear());
    Ext.getCmp('yf').select(new Date().getMonth() + 1);
    Ext.getCmp('zhou').select(getWeekOfMonth());
    //计划厂矿加载监听
    Ext.data.StoreManager.lookup('jhckStore').on('load', function () {
        if(Ext.util.Cookies.get('v_deptcode').substring(0,4)=="9900"){
            Ext.data.StoreManager.lookup('jhckStore').insert(0,{V_DEPTCODE:'%',V_DEPTNAME:'全部' });
            Ext.getCmp('jhck').select(Ext.data.StoreManager.lookup('jhckStore').getAt(0));
        }
        else{
            Ext.getCmp('jhck').select(Ext.data.StoreManager.lookup('jhckStore').getAt(0));
        }

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
        Ext.data.StoreManager.lookup('jhzyqStore').insert(0,{V_DEPTCODE:'%',V_DEPTNAME:'全部' });
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
    });

    Ext.getCmp('sblx').on('change', function () {
        Ext.data.StoreManager.lookup('sbmcStore').load({
            params: {
                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                v_v_deptcodenext: Ext.getCmp('jhzyq').getValue(),
                v_v_equtypecode: Ext.getCmp('sblx').getValue()
            }
        });
    });

    Ext.data.StoreManager.lookup('stateStore').load({
        params: {}
    });
    //设备类型加载监听
    Ext.data.StoreManager.lookup('sblxStore').on('load', function () {
        Ext.getCmp("sblx").select('%');
    });
    //设备名称加载监听
    Ext.data.StoreManager.lookup('sbmcStore').on('load', function () {
        Ext.getCmp("sbmc").select(Ext.data.StoreManager.lookup('sbmcStore').getAt(0));
        query();
    });
    Ext.data.StoreManager.lookup('zyStore').on('load', function () {
        Ext.data.StoreManager.lookup('zyStore').insert(0, {V_BASENAME: '全部', V_SPECIALTYCODE: '%'});
        Ext.getCmp("zy").select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
    });
    Ext.data.StoreManager.lookup('stateStore').on('load', function () {
        Ext.data.StoreManager.lookup('stateStore').insert(0, {V_BASENAME: '全部', V_BASECODE: '%'});
        Ext.getCmp("state").select(Ext.data.StoreManager.lookup('stateStore').getAt(0));

        query();
    });
    //Querytime();
    Ext.getCmp('zks').setValue(getWeekStartDate());
    Ext.getCmp('zjs').setValue(getWeekEndDate());
    Ext.getCmp('nf').on('select', function () {
        Ext.getCmp('zks').setValue(getWeekStartDate());
        Ext.getCmp('zjs').setValue(getWeekEndDate());
        //Querytime();
    });
    Ext.getCmp('yf').on('select', function () {
        Ext.getCmp('zks').setValue(getWeekStartDate());
        Ext.getCmp('zjs').setValue(getWeekEndDate());
        //Querytime();
    });
    Ext.getCmp('zhou').on('select', function () {
        Ext.getCmp('zks').setValue(getWeekStartDate());
        Ext.getCmp('zjs').setValue(getWeekEndDate());
        //Querytime();
    });
    Ext.getCmp('lrr').select(Ext.data.StoreManager.lookup('inputerStore').getAt(0));
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
            V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTTYPE:'主体作业区',
            V_V_INPER:Ext.getCmp('lrr').getValue(),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    });
});

function rendererTime(value, metaData,record) {
    if(record.get('DRSIGN')=="1") {
        metaData.style = "background-color: yellow";
    }
    return '<div data-qtip="' + value.split(".")[0] + '" >' + value.split(".")[0] + '</div>';
}

//第几周
function getWeekOfMonth() {
    var date = new Date();
    var w = date.getDay();
    var d = date.getDate();
    return Math.ceil((d + 6 - w) / 7);
};

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
            V_V_DEPTCODE:Ext.getCmp('jhck').getValue()
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


function OnClickExcelButton() {

    var V_V_ZY = Ext.getCmp('zy').getValue() == '%' ? '0' : Ext.getCmp('zy').getValue();
    var V_V_EQUTYPE = Ext.getCmp('sblx').getValue() == '%' ? '0' : Ext.getCmp('sblx').getValue();
    var V_V_EQUCODE = Ext.getCmp('sbmc').getValue() == '%' ? '0' : Ext.getCmp('sbmc').getValue();
    var V_V_STATE = Ext.getCmp('state').getValue() == '%' ? '0' : Ext.getCmp('state').getValue();
    var V_V_V_ORGCODE = Ext.getCmp('jhck').getValue() == '%' ? '0' : Ext.getCmp('jhck').getValue();
    var V_V_V_DEPTCODE = Ext.getCmp('jhzyq').getValue() == '%' ? '0' : Ext.getCmp('jhzyq').getValue();

    document.location.href = AppUrl + 'excel/ZSCBSP_EXCEL?V_V_YEAR=' + Ext.getCmp('nf').getValue()
        + '&V_V_MONTH=' + Ext.getCmp('yf').getValue()
        + '&V_V_WEEK=' + Ext.getCmp('zhou').getValue()
        + '&V_V_ORGCODE=' + V_V_V_ORGCODE
        + '&V_V_DEPTCODE=' + V_V_V_DEPTCODE
        + '&V_V_ZY=' + V_V_ZY
        + '&V_V_EQUTYPE=' + V_V_EQUTYPE
        + '&V_V_EQUCODE=' + V_V_EQUCODE
        + '&V_V_CONTENT=' + Ext.getCmp('content').getValue()
        + '&V_V_STATE=' + V_V_STATE
        + '&V_V_PAGE=' + Ext.getCmp('page').store.currentPage
        + '&V_V_PAGESIZE=' + Ext.getCmp('page').store.pageSize;
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

function OnClickGrid(V_GUID) {
    var owidth = window.screen.availWidth;
    var oheight = window.screen.availHeight - 50;
    window.open(AppUrl + 'page/PM_0301030901/index.html?v_guid='
        + V_GUID, '', 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes');
}
function OnClickOtherGrid(otherguid,othertype){
    var owidth = window.screen.availWidth;
    var oheight = window.screen.availHeight - 50;
    if(othertype==""){
        alert('此计划没有关联项');return;
    }
    if (othertype=="MONTH"){
        window.open(AppUrl + 'page/PM_03010309/month_detail.html?monthguid='
            + otherguid, '', 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes');
    }
    if(othertype=="YEAR"){
        alert('该条计划关联年计划');
    }
// 年计划关联信息页面过程不可用
// if(othertype=="YEAR"){
//     window.open(AppUrl + 'page/PM_03010309/year_detail.html?yearguid='
//         + otherguid, '', 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes');
// }
}
function dataCss(value, metaData, record, rowIndex, colIndex, store){
    if(record.get('DRSIGN')=="1") {
        metaData.style = "background-color: yellow";
    }
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}