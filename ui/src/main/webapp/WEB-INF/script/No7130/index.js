var V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');//作业区编码
var V_DEPTNAME = Ext.util.Cookies.get('v_deptname2');//作业区名称
var V_V_PLANTCODE = '';
var V_V_DEPTCODE = '';
var V_SUPPLY_CODE = '';
var V_MATERIALNAME = '';
var D_BEGIN_DATE = '';
var D_END_DATE = '';
var V_CYCLE_ID = '';
var ckStoreLoad = false;
var deptStoreLoad = false;
var supplyStoreLoad = false;

Ext.onReady(function () {
    Ext.getBody().mask('<p>正在载入中...</p>');

    //厂矿
    var ckStore = Ext.create('Ext.data.Store', {
        id: 'ckStore',
        autoLoad: true,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_12/PRO_BASE_DEPT_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                IS_V_DEPTCODE: "",
                IS_V_DEPTTYPE: '[基层单位]'
            }
        },
        listeners: {
            load: function (store, records) {
                ckStoreLoad = true;
                Ext.getCmp('ckName').select(store.first());
                _init();
            }
        }
    });

    //作业区
    var deptStore = Ext.create('Ext.data.Store', {
        id: 'deptStore',
        autoLoad: false,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_12/PRO_BASE_DEPT_VIEW',
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
            load: function (store, records) {
                store.insert(0, {
                    'V_DEPTCODE': V_DEPTCODE,
                    'V_DEPTNAME': V_DEPTNAME
                });
                Ext.getCmp('zyqName').select(store.first());
                deptStoreLoad = true;
                _init();
            }
        }

    });

    //供应商Store
    var supplyStore = Ext.create("Ext.data.Store", {
        id: 'supplyStore',
        autoLoad: true,
        fields: ['SUPPLY_CODE', 'SUPPLY_NAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'ml/PRO_RUN7110_SITESUPPLYLIST',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'A_ID': '%',
                'A_MATERIALCODE': '%',
                'A_ORDERID': '%'
            }
        },
        listeners: {
            load: function (store, records) {
                store.insert(0, {
                    'SUPPLY_CODE': '%',
                    'SUPPLY_NAME': '全部'
                });
                Ext.getCmp('SUPPLY_NAME').select(store.first());
                supplyStoreLoad = true;
                _init();
            }
        }
    });

    //作业周期类型
    var zyCycleStore = Ext.create("Ext.data.Store", {
        id: 'zyCycleStore',
        autoLoad: true,
        pageSize: 100,
        fields: ['CYCLE_ID', 'CYCLE_DESC'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'ml/PRO_RUN_CYCLE_ABLE',
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
            load: function (store, records) {
                zyCycleStoreLoad = true;
                Ext.getCmp('CYCLE_TYPE').select(store.first());
                _init();
            }
        }

    });

    //备件寿命Store
    var bjTimeStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        pageSize: 100,
        storeId: 'bjTimeStore',
        fields: ['CHANGEDATE_S', 'CHANGEDATE_D', 'S_DAY', 'SITE_DESC', 'EQU_DESC', 'SUPPLY_NAME', 'MATERIALCODE',
            'MATERIALNAME', 'WORK_TIEM', 'REMARK'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/PRO_RUN7130_SELECTBJTIME',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            },
            extraParams: {}
        }

    });

    //菜单面板
    var tablePanel = Ext.create('Ext.panel.Panel', {
        //  title:'a',
        id: 'tablePanel',
        region: 'north',
        layout: 'vbox',
        frame: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'ckName',
                xtype: 'combo',
                store: ckStore,
                editable: false,
                fieldLabel: '厂矿',
                labelWidth: 80,
                width: 250,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectDeptName();
                    }
                }
            }, {
                id: 'zyqName',
                xtype: 'combo',
                store: deptStore,
                fieldLabel: '作业区',
                labelWidth: 80,
                width: 250,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                id: 'SUPPLY_NAME',
                xtype: 'combo',
                store: supplyStore,
                fieldLabel: '供应商',
                labelWidth: 80,
                width: 250,
                displayField: 'SUPPLY_NAME',
                valueField: 'SUPPLY_CODE',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                emptyText: '请输入物料描述',
                id: 'MATERIAL_DESC',
                queryMode: 'local',
                fieldLabel: '物料描述',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 0px 0px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'A_BEGINDATE',
                xtype: 'datefield',
                editable: false,
                format: 'Y/m/d',
                submitFormat: 'Y-m-d',
                labelAlign: 'right',
                value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                fieldLabel: '安装日期  从',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                id: 'A_ENDDATE',
                xtype: 'datefield',
                editable: false,
                format: 'Y/m/d',
                submitFormat: 'Y-m-d',
                value: Ext.util.Format.date(new Date(new Date(new Date().getUTCFullYear(), new Date().getMonth() + 1, 1) - 86400000), "Y-m-d"),
                fieldLabel: '到',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                id: 'CYCLE_TYPE',
                xtype: 'combo',
                store: zyCycleStore,
                fieldLabel: '周期类型',
                labelWidth: 80,
                width: 250,
                displayField: 'CYCLE_DESC',
                valueField: 'CYCLE_ID',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '查询',
                style: ' margin: 5px 0px 5px 30px',
                icon: imgpath + '/search.png',
                handler: _selectBJ
            }, {
                xtype: 'button',
                text: '导出到Excel',
                style: ' margin: 5px 0px 5px 5px',
                icon: imgpath + '/excel.gif',
                handler: _exportExcel
            }]
        }]
    });

    //显示面板
    var bjGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'bjGridPanel',
        store: bjTimeStore,
        width: '100%',
        region: 'sourth',
        border: false,
        columnLines: true,
        columns: [{
            text: '安装日期',
            dataIndex: 'CHANGEDATE_S',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '换下日期',
            dataIndex: 'CHANGEDATE_D',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '安装天数',
            dataIndex: 'S_DAY',
            align: 'center',
            width: 120,
            renderer: atright
        }, {
            text: '位置',
            dataIndex: 'SITE_DESC',
            align: 'center',
            width: 180,
            renderer: atleft
        }, {
            text: '设备',
            dataIndex: 'EQU_DESC',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '供应商',
            dataIndex: 'SUPPLY_NAME',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '物资编码',
            dataIndex: 'MATERIALCODE',
            align: 'center',
            width: 120,
            renderer: atright
        }, {
            text: '物资描述',
            dataIndex: 'MATERIALNAME',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '累计作业量',
            dataIndex: 'WORK_TIEM',
            align: 'center',
            width: 80,
            renderer: atright
        }, {
            text: '备注',
            dataIndex: 'REMARK',
            align: 'center',
            width: 120,
            renderer: atleft
        }],
        bbar: [{
            id: 'gpage',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            width: '100%',
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: bjTimeStore
        }]
    });

    //整体视图容器
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
        items: [{
            region: 'north',
            border: false,
            items: [tablePanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [bjGridPanel]
        }]

    });

    _init();

});

//初始化
function _init() {

    if (ckStoreLoad && supplyStoreLoad && deptStoreLoad && zyCycleStoreLoad) {
        Ext.getBody().unmask();//去除页面笼罩
    }
};

//查询作业区
function _selectDeptName() {
    var deptStore = Ext.data.StoreManager.lookup('deptStore');
    deptStore.proxy.extraParams = {
        'IS_V_DEPTCODE': Ext.getCmp('ckName').getValue(),
        'IS_V_DEPTTYPE': '[主体作业区]'

    };
    deptStore.currentPage = 1;
    deptStore.load();
};


//查询备件历史更换台账
function _selectBJ() {
    V_V_PLANTCODE = Ext.getCmp('ckName').getValue();
    V_V_DEPTCODE = Ext.getCmp('zyqName').getValue();
    V_SUPPLY_CODE = Ext.getCmp('SUPPLY_NAME').getValue();
    V_MATERIALNAME = Ext.getCmp('MATERIAL_DESC').getValue();
    D_BEGIN_DATE = Ext.getCmp('A_BEGINDATE').getSubmitValue();
    D_END_DATE = Ext.getCmp('A_ENDDATE').getSubmitValue();
    V_CYCLE_ID = Ext.getCmp('CYCLE_TYPE').getValue();


    var bjTimeStore = Ext.data.StoreManager.lookup('bjTimeStore');

    bjTimeStore.proxy.extraParams = {
        V_PLANTCODE: V_V_PLANTCODE,
        V_DEPARTCODE: V_V_DEPTCODE,
        V_SUPPLY_CODE: V_SUPPLY_CODE,
        V_MATERIALNAME: V_MATERIALNAME,
        D_BEGIN_DATE: D_BEGIN_DATE,
        D_END_DATE: D_END_DATE,
        V_CYCLE_ID: V_CYCLE_ID
    };
    bjTimeStore.load();

};

//时间显示
function rendererTime(value, metaData) {
    metaData.style = "text-align:right";
    return '<div data-qtip="' + value.substring(0, 10) + '" >' + value.substring(0, 10) + '</div>';
};


function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
};

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
};

//导出设备备件Excel
function _exportExcel() {
    document.location.href = AppUrl + 'ml/PRO_RUN7130_SELECTBJTIME_EXCEL?V_PLANTCODE=' + encodeURI(encodeURI(V_V_PLANTCODE)) + '&V_DEPARTCODE=' + encodeURI(encodeURI(V_V_DEPTCODE)) +
    '&V_SUPPLY_CODE=' + encodeURI(encodeURI(V_SUPPLY_CODE)) + '&V_MATERIALNAME=' + encodeURI(encodeURI(V_MATERIALNAME)) + '&V_CYCLE_ID=' + encodeURI(encodeURI(V_CYCLE_ID)) +
    '&D_BEGIN_DATE=' + D_BEGIN_DATE + '&D_END_DATE=' + D_END_DATE;
}



