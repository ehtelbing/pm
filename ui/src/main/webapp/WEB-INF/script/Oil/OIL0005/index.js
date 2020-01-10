var win;//父窗口对象，由子窗口调用
var returnValue;//父窗口对象，由子窗口调用

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

Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');

    var ftyStore = Ext.create('Ext.data.Store', {
        storeId: 'ftyStore',
        autoLoad: true,//true为自动加载
        loading: true,//自动加载时必须为true
        pageSize: -1,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            type: 'ajax',
            async: true,//false=同步
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                V_V_DEPTCODENEXT: '%',
                V_V_DEPTTYPE: '基层单位'
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        },
        listeners: {
            load: function (store, records, successful, eOpts) {
                _init();//自动加载时必须调用
            }
        }
    });

    var deptStore = Ext.create('Ext.data.Store', {
        storeId: 'deptStore',
        autoLoad: false,
        loading: false,
        pageSize: -1,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            type: 'ajax',
            async: false,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }),
        listeners: {
            load: function (store, records, successful, eOpts) {
                Ext.getCmp('DEPT_CODE_').select(store.first());
            }
        }
    });

    var productLineStore = Ext.create('Ext.data.Store', {
        storeId: 'productLineStore',
        autoLoad: false,
        loading: false,
        pageSize: -1,
        fields: ['V_CXCODE', 'V_CXNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            url: AppUrl + 'oil/selectProductLine',
            type: 'ajax',
            async: false,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }),
        listeners: {
            load: function (store, records, successful, eOpts) {
                store.insert(0, {
                    V_CXCODE: '%',
                    V_CXNAME: '--全部--'
                });
                Ext.getCmp('V_V_CXCODE').select(store.first());
            }
        }
    });

    var equipTypeStore = Ext.create('Ext.data.Store', {
        storeId: 'equipTypeStore',
        autoLoad: false,
        loading: false,
        pageSize: -1,
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            url: AppUrl + 'oil/selectEquipType',
            type: 'ajax',
            async: false,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }),
        listeners: {
            load: function (store, records, successful, eOpts) {
                store.insert(0, {
                    V_EQUTYPECODE: '%',
                    V_EQUTYPENAME: '--全部--'
                });
                Ext.getCmp('equipType').select(store.first());
            }
        }
    });

    var standardFactInfoStore = Ext.create('Ext.data.Store', { //grid数据的store
        storeId: 'standardFactInfoStore',
        autoLoad: false,
        loading: false,
        pageSize: 10,
        fields: ['I_ID', 'V_GUID', 'V_PLAN_TIME', 'V_FACT_TIME', 'V_DEPTNAME', 'V_EQUTYPENAME', 'V_GGXH', 'V_EQUCODE', 'V_EQUNAME', 'V_GNWZ', 'V_LOC_NAME', 'V_PARTNAME', 'V_OIL_COUNT', 'V_OIL_TYPE', 'V_OIL_SIGN', 'V_FACT_OIL_SIGN', 'V_OIL_NUM', 'V_FACT_OIL_NUM', 'V_ZXR'],
        proxy: {
            url: AppUrl + 'oil/selectStandardFactInfo',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        id: 'buttonPanel',
        defaults: {
            style: 'margin: 2px;'
        },
        items: [{
            xtype: 'button',
            text: '编辑',
            handler: _edit
        }, {
            xtype: 'button',
            text: '修改',
            handler: _update
        }, {
            xtype: 'button',
            text: '查询',
            handler: _select
        }]
    });

    var formPanel = Ext.create('Ext.form.Panel', {
        id: 'formPanel',
        layout: 'column',
        frame: true,
        autoScroll: true,
        style: {
            border: 0
        },
        defaults: {
            labelAlign: 'right',
            labelWidth: 100,
            inputWidth: 140,
            margin: '4'
        },
        items: [{
            xtype: 'combo',
            id: 'FTY_CODE_',
            name: 'FTY_CODE_',
            store: ftyStore,
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            editable: false,
            forceSelection: true,
            fieldLabel: '厂矿',
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        _selectDept();
                        _selectProductLine();
                        _selectEquipType();
                    }
                }
            }
        }, {
            xtype: 'combo',
            id: 'DEPT_CODE_',
            name: 'DEPT_CODE_',
            store: deptStore,
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            editable: false,
            forceSelection: true,
            fieldLabel: '作业区',
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        _selectProductLine();
                        _selectEquipType();
                    }
                }
            }
        }, {
            xtype: 'combo',
            id: 'V_V_CXCODE',
            name: 'V_V_CXCODE',
            store: productLineStore,
            queryMode: 'local',
            valueField: 'V_CXCODE',
            displayField: 'V_CXNAME',
            editable: false,
            forceSelection: true,
            fieldLabel: '产线',
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        _selectEquipType();
                    }
                }
            }
        }, {
            xtype: 'combo',
            id: 'equipType',
            name: 'equipType',
            store: equipTypeStore,
            queryMode: 'local',
            valueField: 'V_EQUTYPECODE',
            displayField: 'V_EQUTYPENAME',
            editable: false,
            forceSelection: true,
            fieldLabel: '设备类型'
        }, {
            xtype: 'datefield',
            id: 'planTime',
            format: 'Y-m-d',
            submitFormat: 'Y-m-d',
            fieldLabel: '计划时间',
            editable: false,
            value: new Date()
        }, {
            xtype: 'textfield',
            name: 'equipCode',
            id: 'equipCode',
            fieldLabel: '设备编码'
        }, {
            xtype: 'textfield',
            name: 'equipName',
            id: 'equipName',
            fieldLabel: '设备名称'
        }]
    });

    var standardFactInfoPanel = Ext.create('Ext.grid.Panel', {
        id: 'standardFactInfoPanel',
        store: standardFactInfoStore    ,
        title: '润滑实绩录入',
        columnLines: true,
        frame: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns: [{
            text: '序号',
            xtype: "rownumberer",
            width: '100px'
        }, {
            text : 'I_ID',
            dataIndex : 'I_ID',
            style : 'text-align: center;',
            flex : 1,
            hidden: true
        }, {
            text : 'V_GUID',
            dataIndex : 'V_GUID',
            style : 'text-align: center;',
            flex : 1,
            hidden: true
        }, {
            text : '计划润滑时间',
            dataIndex : 'V_PLAN_TIME',
            style : 'text-align: center;',
            flex : 1
        }, {
            text : '实际润滑时间',
            dataIndex : 'V_FACT_TIME',
            style : 'text-align: center;',
            flex : 1
        }, {
            text : '部门',
            dataIndex : 'V_DEPTNAME',
            style : 'text-align: center;',
            flex : 1
        }, {
            text : '设备类型',
            dataIndex : 'V_EQUTYPENAME',
            style : 'text-align: center;',
            flex : 1
        }, {
            text : '规格型号',
            dataIndex : 'V_GGXH',
            style : 'text-align: center;',
            flex : 1
        }, {
            text : '设备编码',
            dataIndex : 'V_EQUCODE',
            style : 'text-align: center;',
            flex : 1
        }, {
            text : '设备名称',
            dataIndex : 'V_EQUNAME',
            style : 'text-align: center;',
            flex : 1
        }, {
            text : '功能位置',
            dataIndex : 'V_GNWZ',
            style : 'text-align: center;',
            flex : 1
        }, {
            text : '给油脂位置',
            dataIndex : 'V_LOC_NAME',
            style : 'text-align: center;',
            flex : 1
        }, {
            text : '部件名称',
            dataIndex : 'V_PARTNAME',
            style : 'text-align: center;',
            flex : 1
        }, {
            text : '润滑点数',
            dataIndex : 'V_OIL_COUNT',
            style : 'text-align: center;',
            flex : 1
        }, {
            text : '润滑方式',
            dataIndex : 'V_OIL_TYPE',
            style : 'text-align: center;',
            flex : 1
        }, {
            text : '用油品牌',
            dataIndex : 'V_OIL_SIGN',
            style : 'text-align: center;',
            flex : 1
        }, {
            text : '实际用油品牌',
            dataIndex : 'V_FACT_OIL_SIGN',
            style : 'text-align: center;',
            flex : 1
        }, {
            text : '实际用油量(KG)',
            dataIndex : 'V_FACT_OIL_NUM',
            style : 'text-align: center;',
            flex : 1
        }, {
            text : '执行人',
            dataIndex : 'V_ZXR',
            style : 'text-align: center;',
            flex : 1
        } ],
        viewConfig: {
            emptyText: '<div style="text-align: center; padding-top: 50px; font: italic bold 20px Microsoft YaHei;">没有数据</div>',
            enableTextSelection: true
        },
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            store: standardFactInfoStore,
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
        }]
    });

    Ext.create('Ext.container.Viewport', {
        layout: {
            type: 'border',
            regionWeights: {
                west: -1,
                north: 1,
                south: 1,
                east: -1
            }
        },
        defaults: {
            border: false
        },
        items: [{
            region: 'north',
            items: [buttonPanel, formPanel]
        }, {
            region: 'center',
            layout: 'fit',
            items: [standardFactInfoPanel]
        }]
    });

    _init();
})

function _init() {
    for (var i = 0; i < Ext.data.StoreManager.getCount(); i++) {//检查是否所有自动加载数据全部加载完毕
        if (Ext.data.StoreManager.getAt(i).isLoading()) {
            return;
        }
    }

    Ext.getCmp('FTY_CODE_').setValue(Ext.util.Cookies.get('v_orgCode'));
    _selectDept();
    _selectProductLine();
    Ext.getCmp('V_V_CXCODE').select(Ext.data.StoreManager.lookup('productLineStore').first());
    _selectEquipType();

    _select();
    Ext.getBody().unmask();
}

function _selectProductLine() {
    var productLineStore = Ext.data.StoreManager.lookup('productLineStore');
    productLineStore.proxy.extraParams = {
        V_V_ORGCODE: Ext.getCmp('FTY_CODE_').getValue(),
        V_V_DEPTCODE: Ext.getCmp('DEPT_CODE_').getValue(),
        V_V_CXNAME: '%'
    };
    productLineStore.load();
}

function _selectDept() {
    var deptStore = Ext.data.StoreManager.lookup('deptStore');
    deptStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODE: Ext.getCmp('FTY_CODE_').getValue(),
        V_V_DEPTCODENEXT: '%',
        V_V_DEPTTYPE: '主体作业区'
    };
    deptStore.load();
}

function _selectEquipType() {
    var equipTypeStore = Ext.data.StoreManager.lookup('equipTypeStore');
    equipTypeStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_ORGCODE: Ext.getCmp('FTY_CODE_').getValue(),
        V_V_DEPTCODE: Ext.getCmp('DEPT_CODE_').getValue(),
        V_V_CXCODE: Ext.getCmp('V_V_CXCODE').getValue()
    };
    equipTypeStore.load();
}

//编辑按钮
function _edit() {
    
}

//修改按钮
function _update() {
    
}

//查询按钮
function _select() {
    var standardFactInfoStore = Ext.data.StoreManager.lookup('standardFactInfoStore');
    standardFactInfoStore.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_ORGCODE': Ext.getCmp("FTY_CODE_").getValue(),
        'V_V_DEPTCODE': Ext.getCmp("DEPT_CODE_").getValue(),
        'V_V_CXCODE': Ext.getCmp("V_V_CXCODE").getValue(),
        'V_V_EQUTYPECODE': Ext.getCmp("equipType").getRawValue(),
        'V_V_PLANTIME': Ext.getCmp("planTime").getSubmitValue(),
        'V_V_EQUCODE': Ext.getCmp("equipCode").getSubmitValue(),
        'V_V_EQUNAME': Ext.getCmp("equipName").getSubmitValue()
    }
    standardFactInfoStore.currentPage = 1;
    standardFactInfoStore.load();
}