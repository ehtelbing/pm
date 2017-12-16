var V_V_PLANTCODE = '';
var V_V_DEPTCODE = '';
var A_EQUID = '';

var ckStoreLoad = false;
var deptStoreLoad = false;
var sbStoreLoad = false;
var zyCycleStoreLoad = false;

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
                deptStoreLoad = true;
                Ext.getCmp('zyqName').select(store.first());
                _init();
            }
        }

    });

    //设备Store
    var sbStore = Ext.create("Ext.data.Store", {
        id: 'sbStore',
        autoLoad: false,
        fields: ['EQU_ID', 'EQU_DESC'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_12/PRO_RUN7111_EQULIST',
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
                sbStoreLoad = true;
                Ext.getCmp('EQU_DESC').select(store.first());
                _init();
            }
        }
    });

    //作业周期类型
    var zyCycleStore = Ext.create("Ext.data.Store", {
        id: 'zyCycleStore',
        autoLoad: true,
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
                store.insert(0, {
                    'CYCLE_ID': '%',
                    'CYCLE_DESC': '全部'
                });
                zyCycleStoreLoad = true;
                Ext.getCmp('CYCLE_TYPE').select(store.first());
                _init();
            }
        }

    });

    //设备运行台账
    var equRunStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        pageSize: 100,
        storeId: 'equRunStore',
        fields: ['BJ_UNIQUE_CODE', 'ALERT_VALUE', 'OFFSET', 'ACT_ALERT_VALUE', 'SUM_YEILD', 'MATERIALCODE', 'MATERIALNAME',
            'UNIT', 'SITE_DESC', 'NEWOROLD', 'CHANGEDATE', 'BJ_STATUS', 'CYCLE_DESC'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/PRO_RUN_EQU_BJ_ALERT_ALL',
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
                fieldLabel: '厂' + '<a>&nbsp;&nbsp;</a>' + '矿',
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
                labelAlign: 'right',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectSBName();
                    }
                }
            }, {
                id: 'EQU_DESC',
                xtype: 'combo',
                store: sbStore,
                fieldLabel: '当前设备',
                labelWidth: 80,
                width: 250,
                displayField: 'EQU_DESC',
                valueField: 'EQU_ID',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
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
                style: ' margin: 5px 0px 5px 40px',
                icon: imgpath + '/search.png',
                handler: _selectEqu
            }, {
                xtype: 'button',
                text: '导出到Excel',
                handler: _exportExcel,
                style: ' margin: 5px 0px 5px 5px',
                icon: imgpath + '/excel.gif'
            }]
        }]
    });

    //显示面板
    var yeildGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'yeildGridPanel',
        store: equRunStore,
        width: '100%',
        region: 'sourth',
        border: false,
        columnLines: true,
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '设备位置',
            dataIndex: 'SITE_DESC',
            align: 'center',
            width: 180,
            renderer: atleft
        }, {
            text: '当前设备唯一标识',
            dataIndex: 'BJ_UNIQUE_CODE',
            align: 'center',
            width: 220,
            renderer: atleft
        }, {
            text: '物资编码',
            dataIndex: 'MATERIALCODE',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '物资描述',
            dataIndex: 'MATERIALNAME',
            align: 'center',
            width: 220,
            renderer: atleft
        }, {
            text: '计量单位',
            dataIndex: 'UNIT',
            align: 'center',
            width: 80,
            renderer: atright
        }, {
            text: '更换时间',
            dataIndex: 'CHANGEDATE',
            align: 'center',
            width: 120,
            renderer: rendererTime
        }, {
            text: '作业量',
            dataIndex: 'SUM_YEILD',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '周期类型',
            dataIndex: 'CYCLE_DESC',
            align: 'center',
            width: 180,
            renderer: atleft
        }, {
            text: '报警值',
            dataIndex: 'ALERT_VALUE',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '预警偏移量',
            dataIndex: 'OFFSET',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '备件状态',
            dataIndex: 'BJ_STATUS',
            align: 'center',
            width: 80,
            renderer: atleft
        }],
        bbar: [{
            id: 'gpage',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            width: '100%',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: equRunStore
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
            items: [yeildGridPanel]
        }]

    });

    _init();

})
//初始化
function _init() {

    if (ckStoreLoad && sbStoreLoad && deptStoreLoad && zyCycleStoreLoad) {
        Ext.getBody().unmask();//去除页面笼罩
    }
}

//查询作业区
function _selectDeptName() {
    var deptStore = Ext.data.StoreManager.lookup('deptStore');
    deptStore.proxy.extraParams = {
        'IS_V_DEPTCODE': Ext.getCmp('ckName').getValue(),
        'IS_V_DEPTTYPE': '[主体作业区]'

    };
    deptStore.load();
};

//查找设备
function _selectSBName() {

    var sbStore = Ext.data.StoreManager.lookup('sbStore');

    V_V_PLANTCODE = Ext.getCmp('ckName').getValue();
    V_V_DEPTCODE = Ext.getCmp('zyqName').getValue();

    sbStore.proxy.extraParams = {
        V_V_PLANTCODE: V_V_PLANTCODE,
        V_V_DEPTCODE: V_V_DEPTCODE
    };
    sbStore.load();
};


//查询设备运行台账
function _selectEqu() {
    A_EQUID = Ext.getCmp('EQU_DESC').getValue();
    A_CYCLE_ID = Ext.getCmp('CYCLE_TYPE').getValue();

    var equRunStore = Ext.data.StoreManager.lookup('equRunStore');
    equRunStore.proxy.extraParams = {
        A_EQUID: A_EQUID,
        A_CYCLE_ID: A_CYCLE_ID
    };
    equRunStore.load();
};

function rendererTime(value, metaData) {
    metaData.style = "text-align:left";
    return '<div data-qtip="' + value.substring(0, 10) + '" >' + value.substring(0, 10) + '</div>';
    //  return '<div data-qtip="' + value.split('.0')[0] + '" >' + value.split('.0')[0] + '</div>';
};

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
};

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
};

//导出Excel
function _exportExcel() {
    document.location.href = AppUrl + 'ml/PRO_RUN_EQU_BJ_ALERT_ALL_EXCEL?A_EQUID=' + encodeURI(encodeURI(A_EQUID)) +
    '&A_CYCLE_ID=' + encodeURI(encodeURI(A_CYCLE_ID));
}
