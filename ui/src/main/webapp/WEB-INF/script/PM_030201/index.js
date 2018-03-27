var date = new Date();
var V_MONTHPLAN_GUID = '';
var processKey = '';
var V_STEPNAME = '';
var V_NEXT_SETP = '';
var ckStoreLoad = false;
var zyqStoreLoad = false;
var zyStoreLoad = false;
var sblxStoreLoad = false;
var sbmcStoreLoad = false;
var ztStoreLoad = false;
var initLoad = true;
var months = [];
var hours = [];
var minutes = [];
for (var m = 1; m <= 12; m++) {
    if (m < 10) {
        months.push({displayField: ("0" + "" + m), valueField: m});
    } else {
        months.push({displayField: m, valueField: m});
    }

}
var V_V_GUID = Ext.data.IdGenerator.get('uuid').generate();
for (var j = 0; j <= 23; j++) {
    if (j< 10) {
        j = '0' + j;
    } else {
        j = '' + j;
    }
    hours.push({displayField: j, valueField: j});
}
for (var k = 0; k <= 59; k++) {
    if (k< 10) {
        k = '0' + k;
    } else {
        k = '' + k;
    }
    minutes.push({displayField: k, valueField: k});
}

//var V_V_GUID = Ext.data.IdGenerator.get('uuid').generate();

var today = new Date();

Ext.define('Ext.ux.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    async: true,
    doRequest: function (operation, callback, scope) {
        var writer = this.getWriter(),
            request = this.buildRequest(operation);
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        Ext.apply(request, {
            async: this.async,
            binary: this.binary,
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, callback, scope),
            method: this.getMethod(request),
            disableCaching: false
        });
        Ext.Ajax.request(request);
        return request;
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

var dt = new Date();
var thisYear = dt.getFullYear();
var years = [];
for (var i = 2013; i <= thisYear + 1; i++) years.push({displayField: i, valueField: i});

Ext.onReady(function () {
   // Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
    Ext.QuickTips.init();
    var dt = new Date();
    var thisYear = dt.getFullYear();
    var years = [];

    //从2013循环开始年到当前年的下一年
    for (var i = 2013; i <= thisYear + 1; i++) years.push({displayField: i, valueField: i});

    //厂矿计划数据加载
    var ckStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'ckStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
        })/*,
        listeners: {
            load: function (store, records) {

                Ext.getCmp('ck').select(store.first());
                ckStoreLoad = true;
                _init();
            }
        }*/
    });

    //作业区加载
    var zyqStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyqStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
        })/*,
        listeners: {
            load: function (store, records) {
                Ext.getCmp('zyq').select(store.first());
                zyqStoreLoad = true;
                _init();
            }
        }*/
    });

    var zyStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyStore',
        fields: ['V_SPECIALTYCODE', 'V_BASENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
        })/*,
        listeners: {
            load: function (store, records) {
                Ext.getCmp('zy').select(store.first());
                zyStoreLoad = true;
                _init();
            }
        }*/
    });

    var sbmcStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'sbmcStore',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
        })/*,
        listeners: {
            load: function (store, records) {
                Ext.getCmp('sbmc').select(store.first());
                sbmcStoreLoad = true;
                _init();
            }
        }*/
    });

    var sblxStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'sblxStore',
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
        })/*,
        listeners: {
            load: function (store, records) {
                Ext.getCmp('sblx').select(store.first());
                sblxStoreLoad = true;
                _init();
            }
        }*/
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

    //状态
    var stateStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
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
        }/*,
        listeners: {
            load: function (store, records) {
                store.insert(0, {
                    'V_BASECODE': '%',
                    'V_BASENAME': '-全部-'
                });
                Ext.getCmp('state').select(store.first());
                ztStoreLoad = true;

                _init();
            }
        }*/
    });

    //表格信息加载
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['I_ID',
            'V_GUID',
            'V_YEAR',
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
            'V_REPAIRDEPT_NAME',
            'V_INDATE',
            'V_INPER',
            'INPERNAME',
            'V_FLOWCODE',
            'V_FLOWORDER',
            'V_FLOWTYPE',
            'V_JHMX_GUID',
            'V_BZ',
            'V_REPAIR_PERNAME',
            'V_YEARID',
            'V_STATE',
            'V_STATENAME',
            'V_FLOWNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'cjy/PRO_PM_03_PLAN_YEAR_VIEW',
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

    var panel = Ext.create('Ext.Panel', {
        id: 'panel',
        region: 'north',
        width: '100%',
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
            value: new Date().getFullYear()+1,
            labelWidth: 80,
            width: 250,
            labelAlign: 'right',
            editable: false,
            displayField: 'displayField',
            valueField: 'valueField',
            listeners: {
                select: function (field, newValue, oldValue) {
                    OnButtonQueryClicked();
                }
            }
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
            width: 250/*,
            listeners: {
                change: function (field, newValue, oldValue) {
                    _ck_zyqload();
                    // _zyq_jxdw();
                    _zyq_zy();
                    _zyq_sblx();
                    _zyq_sbmc();
                }
            }*/
        }, {
            xtype: 'combo',
            id: "zyq",
            store: zyqStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '作业区',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            labelWidth: 80,
            width: 250/*,
            listeners: {
                select: function (field, newValue, oldValue) {
                    // _zyq_jxdw();
                    _zyq_zy();
                    _zyq_sblx();
                    _zyq_sbmc();
                    OnButtonQueryClicked();
                }
            }*/
        }, {
            xtype: 'combo',
            id: "zy",
            store: zyStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '专业',
            displayField: 'V_BASENAME',
            valueField: 'V_SPECIALTYCODE',
            labelWidth: 80,
            width: 250/*,
            listeners: {
                select: function (field, newValue, oldValue) {
                    OnButtonQueryClicked();
                }
            }*/
        }, {
            xtype: 'combo',
            id: "sblx",
            store: sblxStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '设备类型',
            displayField: 'V_EQUTYPENAME',
            valueField: 'V_EQUTYPECODE',
            labelWidth: 80,
            width: 250/*,
            listeners: {
                select: function (field, newValue, oldValue) {
                    _zyq_sbmc();
                    OnButtonQueryClicked();
                }
            }*/
        }, {
            xtype: 'combo',
            id: "sbmc",
            store: sbmcStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '设备名称',
            displayField: 'V_EQUNAME',
            valueField: 'V_EQUCODE',
            labelWidth: 80,
            width: 250/*,
            listeners: {
                select: function (field, newValue, oldValue) {
                    OnButtonQueryClicked();
                }
            }*/
        }, {
            xtype: 'combo',
            id: 'state',
            fieldLabel: '状态',
            editable: false,
            labelWidth: 80,
            width: 250,
            displayField: 'V_BASENAME',
            valueField: 'V_BASECODE',
            store: stateStore,
            queryMode: 'local'/*,
            listeners: {
                select: function (field, newValue, oldValue) {
                    OnButtonQueryClicked();
                }
            }*/
        }, {
            xtype: 'textfield',
            id: "jxnr",
            //store: sbmcStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '检修内容',
            // displayField: 'V_EQUNAME',
            //valueField: 'V_EQUCODE',
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
        }, {
            xtype: 'button',
            text: '查询',
            style: ' margin: 5px 0px 0px 10px',
            icon: imgpath + '/search.png',
            listeners: {click: OnButtonQueryClicked}
        },
            {
                xtype: 'button',
                text: '添加',
                icon: imgpath + '/add.png',
                listeners: {click: OnButtonAddClicked}
            },
            {
                xtype: 'button',
                text: '模型选择',
                icon: imgpath + '/add.png',
                listeners: {click: OnButtonSelectClicked}
            },
            {
                xtype: 'button',
                text: '修改',
                icon: imgpath + '/edit.png',
                listeners: {click: OnButtonEditClicked}
            },
            {
                xtype: 'button',
                text: '作废',
                icon: imgpath + '/delete1.png',
                listeners: {click: OnButtonDelClicked}
            },
            {
                xtype: 'button',
                text: '上报',
                icon: imgpath + '/accordion_collapse.png',
                listeners: {click: OnButtonUpClicked}
            }
        ]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        region: 'center',
        width: '100%',
        pageSize: 5,
        columnLines: true,
        store: gridStore,
        autoScroll: true,
        selType: 'checkboxmodel',
        style: 'text-align:center',
        height: 400,
        selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [{xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text: '计划状态', width: 70, dataIndex: 'V_STATENAME', align: 'center'/*, renderer: atleft*/},
            {
                text: '详细',
                dataIndex: 'V_ORDERID',
                width: 55,
                align: 'center',
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return '<a href="#" onclick="_preViewProcess(\'' + record.data.V_GUID + '\')">' + '详细' + '</a>';
                }
            },
            {text: '设备名称', width: 140, dataIndex: 'V_EQUNAME', align: 'center'},
            {text: '专业', width: 70, dataIndex: 'V_REPAIRMAJOR_CODE', align: 'center'},
            {xtype: 'linebreakcolumn', text: '检修内容', width: 250, dataIndex: 'V_CONTENT', align: 'center'},
            {
                text: '计划停工时间', width: 170, dataIndex: 'V_STARTTIME', align: 'center',
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                    //metaData.tdStyle = 'vertical-align:middle;';
                    var index = gridStore.find('V_STARTTIME', value);
                    if (index != -1) {
                        return gridStore.getAt(index).get('V_STARTTIME').substring(0, 19);
                    }
                    return null;
                }
            },
            {
                text: '计划竣工时间', width: 170, dataIndex: 'V_ENDTIME', align: 'center',
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                    var index = gridStore.find('V_ENDTIME', value);
                    if (index != -1) {
                        return gridStore.getAt(index).get('V_ENDTIME').substring(0, 19);
                    }
                    return null;
                }
            },
            {text: '计划工期(小时)', width: 100, dataIndex: 'V_HOUR', align: 'center'},
            {text: '厂矿', width: 140, dataIndex: 'V_DEPTNAME', align: 'center'},
            {text: '车间名称', width: 100, dataIndex: 'V_ORGNAME', align: 'center'},
            {text: '录入人', width: 100, dataIndex: 'INPERNAME', align: 'center'},
            {
                text: '录入时间', width: 160, dataIndex: 'V_INDATE', align: 'center',
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                    var index = gridStore.find('V_INDATE', value);
                    if (index != -1) {
                        return gridStore.getAt(index).get('V_INDATE').substring(0, 19);
                    }
                    return null;
                }
            }/*,
            {text: '流程步骤', align: 'center', width: 140, dataIndex: 'V_FLOWNAME', renderer: rendererStep}*/],
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
        items: [panel, grid]
    });

//计划厂矿加载监听
    Ext.data.StoreManager.lookup('ckStore').on('load', function () {
        Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });
    //计划作业区加载监听
    Ext.data.StoreManager.lookup('zyqStore').on('load', function () {
        Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
    });
    //计划厂矿更改时
    Ext.getCmp('ck').on('select', function () {
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });

    });

    //加载专业
    Ext.data.StoreManager.lookup('zyStore').load({
        params: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue()
        }
    });


    //作业区改变
    Ext.getCmp('zyq').on('change', function () {
        Ext.data.StoreManager.lookup('zyStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue()
            }
        });
        Ext.data.StoreManager.lookup('sblxStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
            }
        });

    });

    Ext.getCmp('sblx').on('change', function () {
        Ext.data.StoreManager.lookup('sbmcStore').load({
            params: {
                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                v_v_deptcodenext: Ext.getCmp('zyq').getValue(),
                v_v_equtypecode: Ext.getCmp('sblx').getValue()
            }
        });

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
        //query();
    });
    Ext.data.StoreManager.lookup('zyStore').on('load', function () {
        Ext.getCmp("zy").select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
    });

    Ext.data.StoreManager.lookup('stateStore').on('load', function () {
        Ext.data.StoreManager.lookup('stateStore').insert(0, {V_BASENAME: '全部', V_BASECODE: '%'});
        Ext.getCmp("state").select(Ext.data.StoreManager.lookup('stateStore').getAt(0));

        Ext.data.StoreManager.lookup('gridStore').load();
        _selectNextSprStore();
    });

    Ext.getCmp('year').on('select', function () {
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
            V_V_YEAR: Ext.getCmp('year').getValue(),
            V_V_PLANTYPE: 'YEAR',
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
            V_V_EQUTYPE: Ext.getCmp('sblx').getValue(),
            V_V_EQUCODE: Ext.getCmp('sbmc').getValue(),
            V_V_ZY: Ext.getCmp('zy').getValue(),
            V_V_CONTENT: Ext.getCmp('jxnr').getValue(),
            V_V_STATECODE: Ext.getCmp('state').getValue(),
            V_V_PEROCDE: Ext.util.Cookies.get('v_personcode'),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize

        }
    });
});

function _init() {
    if (ckStoreLoad && zyqStoreLoad && zyStoreLoad && sblxStoreLoad && sbmcStoreLoad && ztStoreLoad && initLoad) {

        initLoad = false;
        Ext.getBody().unmask();//去除页面笼罩

    }
}

function beforeloadStore(store) {
    store.proxy.extraParams.parName = ['V_V_PERSONCODE', 'V_I_YEAR', 'V_V_DEPTCODE', 'V_V_DEPTNEXTCODE'];
    store.proxy.extraParams.parType = ['s', 's', 's', 's'];
    store.proxy.extraParams.parVal = [Ext.util.Cookies.get('v_personcode'), Ext.getCmp('year').getValue(),
        Ext.getCmp('ck').getValue(), Ext.getCmp('zyq').getValue()];
    store.proxy.extraParams.proName = 'PRO_PM_PLAN_YEAR_DJY_VIEW';
    store.proxy.extraParams.cursorName = 'V_CURSOR';
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function OnButtonAddClicked() {
    var owidth = 593;
    var oheight = 496;
    var V_V_GUID=Ext.data.IdGenerator.get('uuid').generate();
    var YEAR=  Ext.getCmp("year").getValue();
    var V_ORGCODE=Ext.getCmp("ck").getValue();
    var V_DEPTCODE=Ext.getCmp("zyq").getValue();

    var yearStore = Ext.create("Ext.data.Store", {
        storeId: 'yearStore',
        fields: ['displayField', 'valueField'],
        data: years,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });
    var sblxStore1 = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'sblxStore1',
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('sblx1').select(store.first());
            }
        }
    });

    var gridStore1 = Ext.create('Ext.data.Store', {
        id: 'gridStore1',
        pageSize: 15,
        autoLoad: false,
        fields: ['I_ID',
            'V_GUID',
            'V_YEAR',
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
            'V_REPAIRDEPT_NAME',
            'V_INDATE',
            'V_INPER',
            'INPERNAME',
            'V_FLOWCODE',
            'V_FLOWORDER',
            'V_FLOWTYPE',
            'V_JHMX_GUID',
            'V_BZ',
            'V_REPAIR_PERNAME',
            'V_YEARID',
            'V_STATE',
            'V_STATENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PRO_PM_03_PLAN_YEAR_GET',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        })
    });

    var sbmcStore1 = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'sbmcStore1',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('sbmc1').select(store.first());
            }
        }
    });

    var ckStore1 = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'ckStore1',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('ck1').select(store.first());
            }
        }
    });

    var zyStore1 = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyStore1',
        fields: ['V_SPECIALTYCODE', 'V_BASENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('zy1').select(store.first());
            }
        }
    });

    var zyqStore1 = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyqStore1',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('zyq1').select(store.first());
            }
        }
    });

    var monthStore = Ext.create("Ext.data.Store", {
        storeId: 'monthStore',
        autoLoad: true,
        fields: ['displayField', 'valueField'],
        data: months,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });

    var hourStore = Ext.create("Ext.data.Store", {
        storeId: 'hourStore',
        autoLoad: true,
        fields: ['displayField', 'valueField'],
        data: hours,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });

    var minuteStore = Ext.create("Ext.data.Store", {
        storeId: 'minuteStore',
        autoLoad: true,
        fields: ['displayField', 'valueField'],
        data: minutes,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });

    var windowEqu1 = Ext.create('Ext.window.Window', {
        id: 'windowEqu1',
        width: 600,
        height: 500,
        title : '年计划编辑',
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
                //autoScroll : true,
                items: [
                    {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [{
                            id: 'year1',
                            store: yearStore,
                            xtype: 'combo',
                            fieldLabel: '年份',
                            style: 'margin: 5px 0px 0px 0px',
                            labelWidth: 100,
                            labelAlign: 'right',
                            editable: false,
                            value:YEAR,
                            width: 250,
                            displayField: 'displayField',
                            valueField: 'valueField'
                        }, {
                            xtype: 'combo',
                            id: "ck1",
                            store: ckStore1,
                            editable: false,
                            queryMode: 'local',
                            fieldLabel: '计划厂矿',
                            displayField: 'V_DEPTNAME',
                            valueField: 'V_DEPTCODE',
                            labelWidth: 100,
                            style: ' margin: 5px 0px 0px 0px',
                            labelAlign: 'right',
                            width: 250,
                            listeners: {
                                change: function (field, newValue, oldValue) {
                                    _ck_zyqload();
                                    // _zyq_jxdw();
                                    _zyq_zy();
                                    _zyq_sblx();
                                    _zyq_sbmc();
                                }
                            }
                        }]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                xtype: 'combo',
                                id: "zyq1",
                                store: zyqStore1,
                                editable: false,
                                queryMode: 'local',
                                fieldLabel: '作业区',
                                displayField: 'V_DEPTNAME',
                                valueField: 'V_DEPTCODE',
                                labelWidth: 100,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                width: 250,
                                listeners: {
                                    select: function (field, newValue, oldValue) {
                                        // _zyq_jxdw();
                                        _zyq_zy();
                                        _zyq_sblx();
                                        _zyq_sbmc();
                                    }
                                }
                            }, {
                                xtype: 'combo',
                                id: "zy1",
                                store: zyStore1,
                                editable: false,
                                queryMode: 'local',
                                fieldLabel: '专业',
                                displayField: 'V_BASENAME',
                                valueField: 'V_SPECIALTYCODE',
                                labelWidth: 100,
                                width: 250,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right'
                            }]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                xtype: 'combo',
                                id: "sblx1",
                                store: sblxStore1,
                                editable: false,
                                queryMode: 'local',
                                fieldLabel: '设备类型',
                                displayField: 'V_EQUTYPENAME',
                                valueField: 'V_EQUTYPECODE',
                                labelWidth: 100,
                                width: 250,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                listeners: {
                                    change: function (field, newValue, oldValue) {
                                        _zyq_sbmc();
                                    }
                                }
                            }, {
                                xtype: 'combo',
                                id: "sbmc1",
                                store: sbmcStore1,
                                editable: false,
                                queryMode: 'local',
                                fieldLabel: '设备名称',
                                displayField: 'V_EQUNAME',
                                valueField: 'V_EQUCODE',
                                labelWidth: 100,
                                width: 250,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right'
                            }]
                    }, {
                        id: 'jxnr1',
                        xtype: 'textarea',
                        fieldLabel: '检修内容',
                        //fieldStyle: 'background-color: #FFEBCD; background-image: none;',
                        editable: false,
                        labelWidth: 100,
                        queryMode: 'local',
                        allowBlank: false,
                        //baseCls: 'margin-bottom',
                        style: ' margin: 5px 1000px 0px 0px',
                        width: 500,
                        labelAlign: 'right'
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                id: 'jhtgsj',
                                xtype: 'datefield',
                                editable: false,
                                format: 'Y-m-d',
                                //submitFormat: 'yyyy-mm-dd',
                                value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                                fieldLabel: '计划停工时间',
                                labelWidth: 100,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                width: 250,
                                // fieldStyle: 'background-color:#FFEBCD;background-image:none;',
                                baseCls: 'margin-bottom',
                                listeners: {
                                    select: function (field, newValue, oldValue) {
                                        Ext.getCmp('jhjgsj').setMinValue(Ext.getCmp('jhtgsj').getSubmitValue());
                                        _gongshiheji();
                                    }
                                }
                            }, {
                                xtype: 'combo',
                                id: "tghour",
                                store: hourStore,
                                editable: false,
                                queryMode: 'local',
                                fieldLabel: '小时',
                                value: '00',
                                displayField: 'displayField',
                                valueField: 'valueField',
                                labelWidth: 100,
                                width: 160,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                listeners: {
                                    select: function (field, newValue, oldValue) {
                                        _gongshiheji();
                                    }
                                }
                            }, {
                                xtype: 'combo',
                                id: "tgminute",
                                store: minuteStore,
                                editable: false,
                                queryMode: 'local',
                                fieldLabel: '分钟',
                                value: '00',
                                displayField: 'displayField',
                                valueField: 'valueField',
                                labelWidth: 30,
                                width: 90,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                listeners: {
                                    select: function (field, newValue, oldValue) {
                                        _gongshiheji();
                                    }
                                }
                            }]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                id: 'jhjgsj',
                                xtype: 'datefield',
                                editable: false,
                                format: 'Y-m-d',
                                //submitFormat: 'yyyy-mm-dd',
                                value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                                fieldLabel: '计划竣工时间',
                                labelWidth: 100,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                width: 250,
                                // fieldStyle: 'background-color:#FFEBCD;background-image:none;',
                                baseCls: 'margin-bottom',
                                listeners: {
                                    select: function (field, newValue, oldValue) {
                                        //Ext.getCmp('jhtgsj').setMaxValue(Ext.getCmp('jhjgsj').getSubmitValue());
                                        _gongshiheji();
                                    }
                                }
                            }, {
                                xtype: 'combo',
                                id: "jghour",
                                store: hourStore,
                                editable: false,
                                queryMode: 'local',
                                fieldLabel: '小时',
                                value: '00',
                                displayField: 'displayField',
                                valueField: 'valueField',
                                labelWidth: 100,
                                width: 160,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                listeners: {
                                    select: function (field, newValue, oldValue) {
                                        _gongshiheji();
                                    }
                                }
                            }, {
                                xtype: 'combo',
                                id: "jgminute",
                                store: minuteStore,
                                editable: false,
                                queryMode: 'local',
                                fieldLabel: '分钟',
                                value: '00',
                                displayField: 'displayField',
                                valueField: 'valueField',
                                labelWidth: 30,
                                width: 90,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                listeners: {
                                    select: function (field, newValue, oldValue) {
                                        _gongshiheji();
                                    }
                                }
                            }]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                id: 'jhgshj',
                                xtype: 'textfield',
                                editable: true,
                                fieldLabel: '计划工时合计',
                                labelWidth: 100,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                width: 250,
                                fieldStyle: 'background-color:#FFEBCD;background-image:none;',
                                baseCls: 'margin-bottom'
                            }]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                id: 'bz',
                                xtype: 'textarea',
                                fieldLabel: '备注 ',
                                // fieldStyle: 'background-color: #FFEBCD; background-image: none;',
                                editable: false,
                                labelWidth: 100,
                                queryMode: 'local',
                                //baseCls: 'margin-bottom',
                                style: ' margin: 5px 1000px 0px 0px',
                                width: 500,
                                labelAlign: 'right'
                            }]
                    }
                ]
            }
        ],
        buttons : [{
            text : '确定',
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

    Ext.getCmp('windowEqu1').show();
    _init1();
    Ext.getCmp('jhjgsj').setMinValue(Ext.getCmp('jhtgsj').getSubmitValue());
}
var UPDATELOAD;


function _init1() {
    _gongshiheji();
    UPDATELOAD = true;


}
var UPDATE;
function OnButtonEditClicked() {
    var records = Ext.getCmp('grid').getSelectionModel().getSelection();
    var length = records.length;


    if (length != '1') {
        Ext.Msg.alert('操作信息', '请选择一条信息进行修改');
    } else {

        if (records[0].get('V_STATE') == 10 || records[0].get('V_STATE') == 100) {
             V_V_GUID = Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.V_GUID;
            var owidth = 593;
            var oheight = 496;
            UPDATE = 'update';
            var YEAR =  Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.V_YEAR;

            var yearStore = Ext.create("Ext.data.Store", {
                storeId: 'yearStore',
                fields: ['displayField', 'valueField'],
                data: years,
                proxy: {
                    type: 'memory',
                    reader: {type: 'json'}
                }
            });
            var sblxStore1 = Ext.create('Ext.data.Store', {
                autoLoad: false,
                storeId: 'sblxStore1',
                fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
                proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
                }),
                listeners: {
                    load: function (store, records) {
                        Ext.getCmp('sblx1').select(store.first());
                    }
                }
            });

            var gridStore1 = Ext.create('Ext.data.Store', {
                id: 'gridStore1',
                pageSize: 15,
                autoLoad: false,
                fields: ['I_ID',
                    'V_GUID',
                    'V_YEAR',
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
                    'V_REPAIRDEPT_NAME',
                    'V_INDATE',
                    'V_INPER',
                    'INPERNAME',
                    'V_FLOWCODE',
                    'V_FLOWORDER',
                    'V_FLOWTYPE',
                    'V_JHMX_GUID',
                    'V_BZ',
                    'V_REPAIR_PERNAME',
                    'V_YEARID',
                    'V_STATE',
                    'V_STATENAME'],
                proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
                    type: 'ajax',
                    async: false,
                    url: AppUrl + 'hp/PRO_PM_03_PLAN_YEAR_GET',
                    actionMethods: {
                        read: 'POST'
                    },
                    reader: {
                        type: 'json',
                        root: 'list',
                        total: 'total'
                    }
                })
            });

            var sbmcStore1 = Ext.create('Ext.data.Store', {
                autoLoad: false,
                storeId: 'sbmcStore1',
                fields: ['V_EQUCODE', 'V_EQUNAME'],
                proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
                }),
                listeners: {
                    load: function (store, records) {
                        Ext.getCmp('sbmc1').select(store.first());
                    }
                }
            });

            var ckStore1 = Ext.create('Ext.data.Store', {
                autoLoad: true,
                storeId: 'ckStore1',
                fields: ['V_DEPTCODE', 'V_DEPTNAME'],
                proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
                }),
                listeners: {
                    load: function (store, records) {
                        Ext.getCmp('ck1').select(store.first());
                    }
                }
            });
            var zyStore1 = Ext.create('Ext.data.Store', {
                autoLoad: false,
                storeId: 'zyStore1',
                fields: ['V_SPECIALTYCODE', 'V_BASENAME'],
                proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
                }),
                listeners: {
                    load: function (store, records) {
                        Ext.getCmp('zy1').select(store.first());
                    }
                }
            });
            var zyqStore1 = Ext.create('Ext.data.Store', {
                autoLoad: false,
                storeId: 'zyqStore1',
                fields: ['V_DEPTCODE', 'V_DEPTNAME'],
                proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
                }),
                listeners: {
                    load: function (store, records) {
                        Ext.getCmp('zyq1').select(store.first());
                    }
                }
            });
            var monthStore = Ext.create("Ext.data.Store", {
                storeId: 'monthStore',
                autoLoad: true,
                fields: ['displayField', 'valueField'],
                data: months,
                proxy: {
                    type: 'memory',
                    reader: {type: 'json'}
                }
            });
            var hourStore = Ext.create("Ext.data.Store", {
                storeId: 'hourStore',
                autoLoad: true,
                fields: ['displayField', 'valueField'],
                data: hours,
                proxy: {
                    type: 'memory',
                    reader: {type: 'json'}
                }
            });
            var minuteStore = Ext.create("Ext.data.Store", {
                storeId: 'minuteStore',
                autoLoad: true,
                fields: ['displayField', 'valueField'],
                data: minutes,
                proxy: {
                    type: 'memory',
                    reader: {type: 'json'}
                }
            });
            var windowEqu1 = Ext.create('Ext.window.Window', {
                id: 'windowEqu1',
                width: 600,
                height: 500,
                title : '年计划编辑',
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
                        //autoScroll : true,
                        items: [
                            {
                                layout: 'column',
                                defaults: {labelAlign: 'right'},
                                frame: true,
                                border: false,
                                baseCls: 'my-panel-no-border',
                                items: [{
                                    id: 'year1',
                                    store: yearStore,
                                    xtype: 'combo',
                                    fieldLabel: '年份',
                                    style: 'margin: 5px 0px 0px 0px',
                                    labelWidth: 100,
                                    labelAlign: 'right',
                                    editable: false,
                                    value:YEAR,
                                    width: 250,
                                    displayField: 'displayField',
                                    valueField: 'valueField'
                                }, {
                                    xtype: 'combo',
                                    id: "ck1",
                                    store: ckStore1,
                                    editable: false,
                                    queryMode: 'local',
                                    fieldLabel: '计划厂矿',
                                    displayField: 'V_DEPTNAME',
                                    valueField: 'V_DEPTCODE',
                                    labelWidth: 100,
                                    style: ' margin: 5px 0px 0px 0px',
                                    labelAlign: 'right',
                                    width: 250,
                                    listeners: {
                                        change: function (field, newValue, oldValue) {
                                            _ck_zyqload();
                                            // _zyq_jxdw();
                                            _zyq_zy();
                                            _zyq_sblx();
                                            _zyq_sbmc();
                                        }
                                    }
                                }]
                            }, {
                                layout: 'column',
                                defaults: {labelAlign: 'right'},
                                frame: true,
                                border: false,
                                baseCls: 'my-panel-no-border',
                                items: [
                                    {
                                        xtype: 'combo',
                                        id: "zyq1",
                                        store: zyqStore1,
                                        editable: false,
                                        queryMode: 'local',
                                        fieldLabel: '作业区',
                                        displayField: 'V_DEPTNAME',
                                        valueField: 'V_DEPTCODE',
                                        labelWidth: 100,
                                        style: ' margin: 5px 0px 0px 0px',
                                        labelAlign: 'right',
                                        width: 250,
                                        listeners: {
                                            select: function (field, newValue, oldValue) {
                                                // _zyq_jxdw();
                                                _zyq_zy();
                                                _zyq_sblx();
                                                _zyq_sbmc();
                                            }
                                        }
                                    }, {
                                        xtype: 'combo',
                                        id: "zy1",
                                        store: zyStore1,
                                        editable: false,
                                        queryMode: 'local',
                                        fieldLabel: '专业',
                                        displayField: 'V_BASENAME',
                                        valueField: 'V_SPECIALTYCODE',
                                        labelWidth: 100,
                                        width: 250,
                                        style: ' margin: 5px 0px 0px 0px',
                                        labelAlign: 'right'
                                    }]
                            }, {
                                layout: 'column',
                                defaults: {labelAlign: 'right'},
                                frame: true,
                                border: false,
                                baseCls: 'my-panel-no-border',
                                items: [
                                    {
                                        xtype: 'combo',
                                        id: "sblx1",
                                        store: sblxStore1,
                                        editable: false,
                                        queryMode: 'local',
                                        fieldLabel: '设备类型',
                                        displayField: 'V_EQUTYPENAME',
                                        valueField: 'V_EQUTYPECODE',
                                        labelWidth: 100,
                                        width: 250,
                                        style: ' margin: 5px 0px 0px 0px',
                                        labelAlign: 'right',
                                        listeners: {
                                            change: function (field, newValue, oldValue) {
                                                _zyq_sbmc();
                                            }
                                        }
                                    }, {
                                        xtype: 'combo',
                                        id: "sbmc1",
                                        store: sbmcStore1,
                                        editable: false,
                                        queryMode: 'local',
                                        fieldLabel: '设备名称',
                                        displayField: 'V_EQUNAME',
                                        valueField: 'V_EQUCODE',
                                        labelWidth: 100,
                                        width: 250,
                                        style: ' margin: 5px 0px 0px 0px',
                                        labelAlign: 'right'
                                    }]
                            }, {
                                id: 'jxnr1',
                                xtype: 'textarea',
                                fieldLabel: '检修内容',
                                //fieldStyle: 'background-color: #FFEBCD; background-image: none;',
                                editable: false,
                                labelWidth: 100,
                                queryMode: 'local',
                                allowBlank: false,
                                //baseCls: 'margin-bottom',
                                style: ' margin: 5px 1000px 0px 0px',
                                width: 500,
                                labelAlign: 'right'
                            }, {
                                layout: 'column',
                                defaults: {labelAlign: 'right'},
                                frame: true,
                                border: false,
                                baseCls: 'my-panel-no-border',
                                items: [
                                    {
                                        id: 'jhtgsj',
                                        xtype: 'datefield',
                                        editable: false,
                                        format: 'Y-m-d',
                                        //submitFormat: 'yyyy-mm-dd',
                                        value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                                        fieldLabel: '计划停工时间',
                                        labelWidth: 100,
                                        style: ' margin: 5px 0px 0px 0px',
                                        labelAlign: 'right',
                                        width: 250,
                                        // fieldStyle: 'background-color:#FFEBCD;background-image:none;',
                                        baseCls: 'margin-bottom',
                                        listeners: {
                                            select: function (field, newValue, oldValue) {
                                                Ext.getCmp('jhjgsj').setMinValue(Ext.getCmp('jhtgsj').getSubmitValue());
                                                _gongshiheji();
                                            }
                                        }
                                    }, {
                                        xtype: 'combo',
                                        id: "tghour",
                                        store: hourStore,
                                        editable: false,
                                        queryMode: 'local',
                                        fieldLabel: '小时',
                                        value: '00',
                                        displayField: 'displayField',
                                        valueField: 'valueField',
                                        labelWidth: 100,
                                        width: 160,
                                        style: ' margin: 5px 0px 0px 0px',
                                        labelAlign: 'right',
                                        listeners: {
                                            select: function (field, newValue, oldValue) {
                                                _gongshiheji();
                                            }
                                        }
                                    }, {
                                        xtype: 'combo',
                                        id: "tgminute",
                                        store: minuteStore,
                                        editable: false,
                                        queryMode: 'local',
                                        fieldLabel: '分钟',
                                        value: '00',
                                        displayField: 'displayField',
                                        valueField: 'valueField',
                                        labelWidth: 30,
                                        width: 90,
                                        style: ' margin: 5px 0px 0px 0px',
                                        labelAlign: 'right',
                                        listeners: {
                                            select: function (field, newValue, oldValue) {
                                                _gongshiheji();
                                            }
                                        }
                                    }]
                            }, {
                                layout: 'column',
                                defaults: {labelAlign: 'right'},
                                frame: true,
                                border: false,
                                baseCls: 'my-panel-no-border',
                                items: [
                                    {
                                        id: 'jhjgsj',
                                        xtype: 'datefield',
                                        editable: false,
                                        format: 'Y-m-d',
                                        //submitFormat: 'yyyy-mm-dd',
                                        value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                                        fieldLabel: '计划竣工时间',
                                        labelWidth: 100,
                                        style: ' margin: 5px 0px 0px 0px',
                                        labelAlign: 'right',
                                        width: 250,
                                        // fieldStyle: 'background-color:#FFEBCD;background-image:none;',
                                        baseCls: 'margin-bottom',
                                        listeners: {
                                            select: function (field, newValue, oldValue) {
                                                //Ext.getCmp('jhtgsj').setMaxValue(Ext.getCmp('jhjgsj').getSubmitValue());
                                                _gongshiheji();
                                            }
                                        }
                                    }, {
                                        xtype: 'combo',
                                        id: "jghour",
                                        store: hourStore,
                                        editable: false,
                                        queryMode: 'local',
                                        fieldLabel: '小时',
                                        value: '00',
                                        displayField: 'displayField',
                                        valueField: 'valueField',
                                        labelWidth: 100,
                                        width: 160,
                                        style: ' margin: 5px 0px 0px 0px',
                                        labelAlign: 'right',
                                        listeners: {
                                            select: function (field, newValue, oldValue) {
                                                _gongshiheji();
                                            }
                                        }
                                    }, {
                                        xtype: 'combo',
                                        id: "jgminute",
                                        store: minuteStore,
                                        editable: false,
                                        queryMode: 'local',
                                        fieldLabel: '分钟',
                                        value: '00',
                                        displayField: 'displayField',
                                        valueField: 'valueField',
                                        labelWidth: 30,
                                        width: 90,
                                        style: ' margin: 5px 0px 0px 0px',
                                        labelAlign: 'right',
                                        listeners: {
                                            select: function (field, newValue, oldValue) {
                                                _gongshiheji();
                                            }
                                        }
                                    }]
                            }, {
                                layout: 'column',
                                defaults: {labelAlign: 'right'},
                                frame: true,
                                border: false,
                                baseCls: 'my-panel-no-border',
                                items: [
                                    {
                                        id: 'jhgshj',
                                        xtype: 'textfield',
                                        editable: true,
                                        fieldLabel: '计划工时合计',
                                        labelWidth: 100,
                                        style: ' margin: 5px 0px 0px 0px',
                                        labelAlign: 'right',
                                        width: 250,
                                        fieldStyle: 'background-color:#FFEBCD;background-image:none;',
                                        baseCls: 'margin-bottom'
                                    }]
                            }, {
                                layout: 'column',
                                defaults: {labelAlign: 'right'},
                                frame: true,
                                border: false,
                                baseCls: 'my-panel-no-border',
                                items: [
                                    {
                                        id: 'bz',
                                        xtype: 'textarea',
                                        fieldLabel: '备注 ',
                                        // fieldStyle: 'background-color: #FFEBCD; background-image: none;',
                                        editable: false,
                                        labelWidth: 100,
                                        queryMode: 'local',
                                        //baseCls: 'margin-bottom',
                                        style: ' margin: 5px 1000px 0px 0px',
                                        width: 500,
                                        labelAlign: 'right'
                                    }]
                            }
                        ]
                    }
                ],
                buttons : [{
                    text : '确定',
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

            Ext.getCmp('windowEqu1').show();
            _init1();
            Ext.getCmp('jhjgsj').setMinValue(Ext.getCmp('jhtgsj').getSubmitValue());

        } else {
            Ext.Msg.alert('操作信息', '该流程已上报，无法修改！');
        }

    }
}

function OnButtonDelClicked() {
    var records = Ext.getCmp('grid').getSelectionModel().getSelection();//获取选中的数据
    if (records.length == 0) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

    /*var V_STATENAME_LIST = new Array();
     for (var i = 0; i < records.length; i++) {
     V_STATENAME_LIST.push(records[i].get('V_STATENAME'));
     if(records[i].get('V_STATENAME')!= '未发起')
     {
     Ext.Msg.alert('提示信息', '该计划已上报，无法作废！');
     return false;
     }
     }*/

    /*  var V_GUID_LIST = new Array();
     for (var i = 0; i < records.length; i++) {
     V_GUID_LIST.push(records[i].get('V_GUID'));
     }  */
    //V_GUID = records[0].get('V_GUID');

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
                        //url: AppUrl + 'hp/PRO_PM_03_PLAN_YEAR_DEL',
                        url: AppUrl + 'PM_03/PRO_PM_03_PLAN_YEAR_DEL',
                        type: 'ajax',
                        method: 'POST',
                        params: {
                            //V_V_GUID_LIST: V_GUID_LIST
                            V_V_GUID: records[i].get('V_GUID')
                        },
                        success: function (response) {
                            var data = Ext.decode(response.responseText);//后台返回的值
                            if (data.V_CURSOR == '成功') {//成功，会传回true
                                i_err++;
                                if (i_err == records.length) {
                                    OnButtonQueryClicked();
                                }
                            } else {
                                Ext.MessageBox.show({
                                    title: '错误',
                                    msg: data.V_CURSOR,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR,
                                    fn: function (btn) {
                                        OnButtonQueryClicked();
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
                                    OnButtonQueryClicked();
                                }
                            })
                        }

                    })
                }
            }
        }
    });
}

function OnButtonUpClicked() {
    var records = Ext.getCmp('grid').getSelectionModel().getSelection();//获取选中的数据

    if (records.length == 0) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    var i_err = 0;
    for (var i = 0; i < records.length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'PM_03/PRO_PM_03_PLAN_YEAR_SEND',
            type: 'ajax',
            method: 'POST',
            async: false,
            params: {
                V_V_GUID: records[i].data.V_GUID,
                V_V_ORGCODE: records[i].get('V_ORGCODE'),
                V_V_DEPTCODE: records[i].get('V_DEPTCODE'),
                V_V_FLOWCODE: records[i].get('V_FLOWCODE'),
                V_V_PLANTYPE: "YEAR",
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode')
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);//后台返回的值
                if (resp.V_INFO == '成功') {
                    console.log("V_NEXT_SETP=" + V_NEXT_SETP);
                    console.log("processKey=" + processKey);
                    console.log("V_STEPNAME=" + V_STEPNAME);
                    Ext.Ajax.request({
                        url: AppUrl + 'Activiti/StratProcess',
                        async: false,
                        method: 'post',
                        params: {
                            parName: ["originator", "flow_businesskey", V_NEXT_SETP, "idea", "remark", "flow_code", "flow_yj","flow_type"],
                            parVal: [Ext.util.Cookies.get('v_personcode'), records[i].get('V_GUID'), Ext.getCmp('nextPer').getValue(), "请审批!", records[i].get('V_CONTENT'), records[i].get('V_YEARID'), "请审批！","YearPlan"],
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
                        OnButtonQueryClicked();
                    }
                } else {
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: resp.V_INFO,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR,
                        fn: function (btn) {
                            OnButtonQueryClicked();
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
                        OnButtonQueryClicked();
                    }
                })
            }

        })
    }
    //        }
    //    }
    //});
}

function detail(a, value, metaData) {
    return '<a href="javascript:ondetail(\'' + metaData.data.V_JXMX_CODE + '\')">' + a + '</a>';
}

function ondetail(a) {
    var V_JXGX_CODE = Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.V_JXGX_CODE;
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_030211/index.html?V_JXMX_CODE=' + a + '&V_JXGX_CODE=' + V_JXGX_CODE, '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,channelmode=yes,resizable=yes');
}
function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}


function OnButtonQueryClicked() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_YEAR: Ext.getCmp('year').getValue(),
            V_V_PLANTYPE: 'YEAR',
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
            V_V_EQUTYPE: Ext.getCmp('sblx').getValue(),
            V_V_EQUCODE: Ext.getCmp('sbmc').getValue(),
            V_V_ZY: Ext.getCmp('zy').getValue(),
            V_V_CONTENT: Ext.getCmp('jxnr').getValue(),
            V_V_STATECODE: Ext.getCmp('state').getValue(),
            V_V_PEROCDE: Ext.util.Cookies.get('v_personcode'),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    });


    _selectNextSprStore();
}

function OnButtonQueryClicked1() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_YEAR: Ext.getCmp('year1').getValue(),
            V_V_PLANTYPE: 'YEAR',
            V_V_ORGCODE: Ext.getCmp('ck1').getValue(),
            V_V_DEPTCODE: Ext.getCmp('zyq1').getValue(),
            V_V_EQUTYPE: Ext.getCmp('sblx1').getValue(),
            V_V_EQUCODE: Ext.getCmp('sbmc1').getValue(),
            V_V_ZY: Ext.getCmp('zy1').getValue(),
            V_V_CONTENT: Ext.getCmp('jxnr1').getValue(),
            V_V_STATECODE: Ext.getCmp('state').getValue(),
            V_V_PEROCDE: Ext.util.Cookies.get('v_personcode'),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    });


    _selectNextSprStore();
}


function _selectNextSprStore() {
    var nextSprStore = Ext.data.StoreManager.lookup('nextSprStore');
    nextSprStore.proxy.extraParams = {
        V_V_ORGCODE: Ext.getCmp('ck').getValue(),
        V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
        V_V_REPAIRCODE: '',
        V_V_FLOWTYPE: 'YearPlan',
        V_V_FLOW_STEP: 'start',
        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_SPECIALTY: Ext.getCmp('zy').getValue(),
        V_V_WHERE: ''

    };
    nextSprStore.currentPage = 1;
    nextSprStore.load();
}

function _zyq_jxdw() {

    var jxdwStore = Ext.data.StoreManager.lookup('jxdwStore');
    jxdwStore.proxy.extraParams = {
        V_V_DEPTCODE: Ext.getCmp('zyq').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    jxdwStore.load();


}
//模型选择
function OnButtonSelectClicked() {
    var ret = window.open(AppUrl + 'page/PM_1922/index.html?YEAR=' + Ext.getCmp("year").getValue() +
    "&QUARTER=0" +
    "&MONTH=0" +
    "&WEEK=0" +
    "&PLANTYPE=YEAR", '', 'height=600px,width=1200px,top=50px,left=100px,resizable=no,toolbat=no,menubar=no,scrollbars=auto,location=no,status=no');
}
function query() {
    OnButtonQueryClicked();
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

function _gongshiheji() {
    var date1 = Ext.getCmp('jhtgsj').getSubmitValue() + " " + Ext.getCmp('tghour').getValue() + ":" + Ext.getCmp('tgminute').getValue() + ":00";
    var date11 = new Date(date1);
    var date2 = Ext.getCmp('jhjgsj').getSubmitValue() + " " + Ext.getCmp('jghour').getValue() + ":" + Ext.getCmp('jgminute').getValue() + ":00";
    var date22 = new Date(date2);


    var gongshicha = date22.getTime() - date11.getTime();
    var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
    Ext.getCmp('jhgshj').setValue(gongshicha2);

}

function _save() {
    if (Ext.getCmp('jxnr1').getValue() == "") {
        Ext.MessageBox.alert('提示', '请先输入检修内容');
        return;
    }

    if (Ext.getCmp('jhgshj').getValue() < 0) {
        Ext.MessageBox.alert('提示', '竣工时间必须大于停工时间');

        return;
    }

    Ext.Ajax.request({
        url: AppUrl + 'hp/PRO_PM_03_PLAN_YEAR_SET',
        type: 'ajax',
        method: 'POST',
        params: {
            V_V_GUID: V_V_GUID,
            V_V_YEAR: Ext.getCmp('year1').getValue(),
            V_V_ORGCODE: Ext.getCmp('ck1').getValue(),
            V_V_DEPTCODE: Ext.getCmp('zyq1').getValue(),
            V_V_EQUTYPECODE: Ext.getCmp('sblx1').getValue(),
            V_V_EQUCODE: Ext.getCmp('sbmc1').getValue(),
            V_V_REPAIRMAJOR_CODE: Ext.getCmp('zy1').getValue(),
            V_V_CONTENT: Ext.getCmp('jxnr1').getValue(),
            V_V_STARTTIME: Ext.getCmp('jhtgsj').getSubmitValue() + " " + Ext.getCmp('tghour').getValue() + ":" + Ext.getCmp('tgminute').getValue() + ":00",
            V_V_ENDTIME: Ext.getCmp('jhjgsj').getSubmitValue() + " " + Ext.getCmp('jghour').getValue() + ":" + Ext.getCmp('jgminute').getValue() + ":00",
            V_V_SUMHOUR: Ext.getCmp('jhgshj').getValue(),
            V_V_BZ: Ext.getCmp('bz').getValue(),
            V_V_INPER: Ext.util.Cookies.get('v_personcode'),
            V_V_JHMX_GUID: ""

        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET=='成功') {//成功，会传回true
                OnButtonQueryClicked1();
                _close();


            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: data.RET,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        },
        failure: function (response) {//访问到后台时执行的方法。
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            })
        }

    })
}

function _zyq_zy() {
    var zyStore1 = Ext.data.StoreManager.lookup('zyStore1');
    zyStore1.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTNEXTCODE: Ext.getCmp('zyq1').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    zyStore1.load();
}

function _ck_zyqload() {
    var zyqStore1 = Ext.data.StoreManager.lookup('zyqStore1');
    zyqStore1.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODE': Ext.getCmp('ck1').getValue(),
        'V_V_DEPTCODENEXT': '%',
        'V_V_DEPTTYPE': '主体作业区'
    };
    //matGroupSecondStore.currentPage = 1;
    zyqStore1.load();

}

function _zyq_sblx() {
    var sblxStore1 = Ext.data.StoreManager.lookup('sblxStore1');
    sblxStore1.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODENEXT: Ext.getCmp('zyq1').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    sblxStore1.load();
}

function _zyq_sbmc() {
    var sbmcStore1 = Ext.data.StoreManager.lookup('sbmcStore1');
    sbmcStore1.proxy.extraParams = {
        v_v_personcode: Ext.util.Cookies.get('v_personcode'),
        v_v_deptcodenext: Ext.getCmp('zyq1').getValue(),
        v_v_equtypecode: Ext.getCmp('sblx1').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    sbmcStore1.load();

    if (UPDATE == 'update' && UPDATELOAD) {
        var gridStore = Ext.data.StoreManager.lookup('gridStore');
        gridStore.proxy.extraParams = {
            V_V_GUID: V_V_GUID
        };
        //matGroupSecondStore.currentPage = 1;
        gridStore.load();


        Ext.getCmp('ck1').setValue(gridStore.getAt(0).get('V_ORGCODE'));
        Ext.getCmp('zyq1').setValue(gridStore.getAt(0).get('V_DEPTCODE'));
        Ext.getCmp('zy1').setValue(gridStore.getAt(0).get('V_REPAIRMAJOR_CODE'));
        Ext.getCmp('sblx1').setValue(gridStore.getAt(0).get('V_EQUTYPECODE'));
        Ext.getCmp('sbmc1').setValue(gridStore.getAt(0).get('V_EQUCODE'));
        Ext.getCmp('jxnr1').setValue(gridStore.getAt(0).get('V_CONTENT'));
        Ext.getCmp('jhtgsj').setValue(gridStore.getAt(0).get('V_STARTTIME').substring(0, 10));
        Ext.getCmp('tghour').setValue(gridStore.getAt(0).get('V_STARTTIME').substring(11, 13));
        Ext.getCmp('tgminute').setValue(gridStore.getAt(0).get('V_STARTTIME').substring(14, 16));
        Ext.getCmp('jhjgsj').setValue(gridStore.getAt(0).get('V_ENDTIME').substring(0, 10));
        Ext.getCmp('jghour').setValue(gridStore.getAt(0).get('V_ENDTIME').substring(11, 13));
        Ext.getCmp('jgminute').setValue(gridStore.getAt(0).get('V_ENDTIME').substring(14, 16));
        Ext.getCmp('jhgshj').setValue(gridStore.getAt(0).get('V_HOUR'));
        Ext.getCmp('bz').setValue(gridStore.getAt(0).get('V_BZ'));
        UPDATELOAD = false;

    }
}

function _close(){
    if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") !=-1) {
        window.location.href="http://localhost:8080/pm/app/pm/page/PM_030201/index.html";
        window.close();
    } else {
        window.opener = null;
        window.open("", "_self");
        window.close();
    }
}