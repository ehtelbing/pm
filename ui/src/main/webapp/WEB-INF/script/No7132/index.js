var V_V_PLANTCODE = Ext.util.Cookies.get('v_orgCode');//厂矿编码
var IS_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');//作业区编码

var V_V_PLANT = '';
var V_V_DEPTCODE = '';
var V_V_EQUIP_NO = '';
var V_V_ORDERGUID = '';
var V_V_MATERIALCODE = '';
var V_V_MATERIALNAME = '';
var V_D_FACT_START_DATE = '';
var V_D_FACT_FINISH_DATE = '';

var ckStoreLoad = false;
var sbStoreLoad = false;
var deptStoreLoad = false;

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
                    'V_DEPTCODE': '%',
                    'V_DEPTNAME': '全部'
                });
                Ext.getCmp('zyqName').select(store.first());
                deptStoreLoad = true;
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
                store.insert(0, {
                    'EQU_ID': '%',
                    'EQU_DESC': '全部'
                });
                Ext.getCmp('EQU_DESC').select(store.first());
                sbStoreLoad = true;
                _init()
            }
        }
    });

    //备件跟踪部门情况统计Store
    var bjTotalStore = Ext.create("Ext.data.Store", {
        id: 'bjTotalStore',
        autoLoad: false,
        pageSize: 100,
        fields: ['V_DEPTNAME', 'ORDERAMOUNT', 'ORDERACTU', 'I_ACTUALAMOUNT', 'EXECUTERATE'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'ml/PRO_NO7132_DEPARTMATLIST',
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

    //备件跟踪使用明细Store
    var bjDetailStore = Ext.create("Ext.data.Store", {
        id: 'bjDetailStore',
        autoLoad: false,
        pageSize: 100,
        fields: ['V_ORDERID', 'V_MATERIALCODE', 'V_MATERIALNAME', 'V_UNIT', 'ORDERAMOUNT', 'ORDERACTU', 'I_ACTUALAMOUNT',
            'D_FACT_FINISH_DATE', 'V_SHORT_TXT', 'V_EQUIP_NAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'ml/PRO_RUN7132_ORDERMATLIST',
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
                id: 'A_BEGINDATE',
                xtype: 'datefield',
                editable: false,
                format: 'Y/m/d',
                submitFormat: 'Y-m-d',
                labelAlign: 'right',
                value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                fieldLabel: '起始日期',
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
                fieldLabel: '结束日期',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
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
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'EQU_DESC',
                xtype: 'combo',
                store: sbStore,
                fieldLabel: '设备',
                labelWidth: 80,
                width: 250,
                displayField: 'EQU_DESC',
                valueField: 'EQU_ID',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'CASE_ID',
                queryMode: 'local',
                fieldLabel: '工单号',
                emptyText: '请输入工单号',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 0px 0px',
                labelAlign: 'right'
            }, {
                id: 'zyqName',
                xtype: 'combo',
                store: deptStore,
                fieldLabel: '部门',
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
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'MATERIAL_CODE',
                queryMode: 'local',
                fieldLabel: '物资编码',
                emptyText: '请输入物资编码',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 0px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'MATERIAL_NAME',
                queryMode: 'local',
                fieldLabel: '物资名称',
                emptyText: '请输入物资名称',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 0px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '查询',
                style: ' margin: 5px 0px 5px 50px',
                icon: imgpath + '/search.png',
                handler: _selectTotal
            }, {
                xtype: 'button',
                text: '导出到Excel',
                handler: _exportTotalExcel,
                style: ' margin: 5px 0px 5px 5px',
                icon: imgpath + '/excel.gif'

            }]
        }]

    });

    //备件跟踪部门情况面板
    var traceTotalGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'traceTotalGridPanel',
        title: '备件跟踪部门情况统计',
        store: bjTotalStore,
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
            text: '部门名称',
            dataIndex: 'V_DEPTNAME',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '实际使用备件数量',
            dataIndex: 'ORDERAMOUNT',
            align: 'center',
            width: 120,
            renderer: atright
        }, {
            text: '已更换备件数量',
            dataIndex: 'ORDERACTU',
            align: 'center',
            width: 120,
            renderer: atright
        }, {
            text: '未更换备件数量',
            dataIndex: 'I_ACTUALAMOUNT',
            align: 'center',
            width: 120,
            renderer: atright
        }, {
            text: '备件更换执行率',
            dataIndex: 'EXECUTERATE',
            align: 'center',
            width: 120,
            renderer: atright
        }]
    });

    //备件跟踪使用明细表
    var traceDetailGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'traceDetailGridPanel',
        title: '备件跟踪使用明细',
        store: bjDetailStore,
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
            text: '工单号',
            dataIndex: 'V_ORDERID',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '物料编码',
            dataIndex: 'V_MATERIALCODE',
            align: 'center',
            width: 120,
            renderer: atright
        }, {
            text: '物料名称',
            dataIndex: 'V_MATERIALNAME',
            align: 'center',
            width: 180,
            renderer: atleft
        }, {
            text: '计量单位',
            dataIndex: 'V_UNIT',
            align: 'center',
            width: 80,
            renderer: atright
        }, {
            text: '实际领用数量',
            dataIndex: 'ORDERAMOUNT',
            align: 'center',
            width: 120,
            renderer: atright
        }, {
            text: '已更换数量',
            dataIndex: 'ORDERACTU',
            align: 'center',
            width: 120,
            renderer: atright
        }, {
            text: '未更换数量',
            dataIndex: 'I_ACTUALAMOUNT',
            align: 'center',
            width: 120,
            renderer: atright
        }, {
            text: '工单结束日期',
            dataIndex: 'D_FACT_FINISH_DATE',
            align: 'center',
            width: 120,
            renderer: rendererTime
        }, {
            text: '工单描述',
            dataIndex: 'V_SHORT_TXT',
            align: 'center',
            width: 360,
            renderer: atleft
        }, {
            text: '所属设备',
            dataIndex: 'V_EQUIP_NAME',
            align: 'center',
            width: 120,
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
            store: bjDetailStore
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
            region: 'north',
            height:'40%',
            border: false,
            items: [traceTotalGridPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [traceDetailGridPanel]
        }]
    });

    _init();

});

//初始化
function _init() {

    if (ckStoreLoad && sbStoreLoad && deptStoreLoad) {
        Ext.getBody().unmask();//去除页面笼罩
    }
};

//查询部门
function _selectDeptName() {
    var deptStore = Ext.data.StoreManager.lookup('deptStore');
    deptStore.proxy.extraParams = {
        'IS_V_DEPTCODE': Ext.getCmp('ckName').getValue(),
        'IS_V_DEPTTYPE': '[主体作业区]'

    };
    deptStore.currentPage = 1;
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

//查找备件跟踪部门情况统计
function _selectTotal() {

    V_V_PLANTCODE = Ext.getCmp('ckName').getValue();
    V_V_DEPTCODE = Ext.getCmp('zyqName').getValue();
    V_V_EQUIP_NO = Ext.getCmp('EQU_DESC').getValue();
    V_V_ORDERGUID = Ext.getCmp('CASE_ID').getValue();
    V_V_MATERIALCODE = Ext.getCmp('MATERIAL_CODE').getValue();
    V_V_MATERIALNAME = Ext.getCmp('MATERIAL_NAME').getValue();
    V_D_FACT_START_DATE = Ext.getCmp('A_BEGINDATE').getSubmitValue();
    V_D_FACT_FINISH_DATE = Ext.getCmp('A_ENDDATE').getSubmitValue();

    var bjTotalStore = Ext.data.StoreManager.lookup('bjTotalStore');

    bjTotalStore.proxy.extraParams = {
        V_V_PLANT: V_V_PLANTCODE,
        V_V_DEPTCODE: V_V_DEPTCODE,
        V_V_EQUIP_NO: V_V_EQUIP_NO,
        V_V_ORDERGUID: V_V_ORDERGUID,
        V_V_MATERIALCODE: V_V_MATERIALCODE,
        V_V_MATERIALNAME: V_V_MATERIALNAME,
        V_D_FACT_START_DATE: V_D_FACT_START_DATE,
        V_D_FACT_FINISH_DATE: V_D_FACT_FINISH_DATE

    };

    _selectDetail();
    bjTotalStore.load();

};

//查找备件跟踪使用明细
function _selectDetail() {

    var bjDetailStore = Ext.data.StoreManager.lookup('bjDetailStore');
    bjDetailStore.proxy.extraParams = {
        V_V_PLANT: V_V_PLANTCODE,
        V_V_DEPTCODE: V_V_DEPTCODE,
        V_V_EQUIP_NO: V_V_EQUIP_NO,
        V_V_ORDERGUID: V_V_ORDERGUID,
        V_V_MATERIALCODE: V_V_MATERIALCODE,
        V_V_MATERIALNAME: V_V_MATERIALNAME,
        V_D_FACT_START_DATE: V_D_FACT_START_DATE,
        V_D_FACT_FINISH_DATE: V_D_FACT_FINISH_DATE

    };
    bjDetailStore.load();

};

function rendererTime(value, metaData) {
    metaData.style = "text-align:left";
    return '<div data-qtip="' + value.substring(0, 10) + '" >' + value.substring(0, 10) + '</div>';
    // return '<div data-qtip="' + value.split('.0')[0] + '" >' + value.split('.0')[0] + '</div>';
};

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
};

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
};

function _exportTotalExcel() {

    document.location.href = AppUrl + 'ml/EXCEL?V_V_PLANT=' + V_V_PLANTCODE +
    '&V_V_DEPTCODE=' + encodeURI(encodeURI(V_V_DEPTCODE)) + '&V_V_EQUIP_NO=' + encodeURI(encodeURI(V_V_EQUIP_NO)) + '&V_V_ORDERGUID=' + encodeURI(encodeURI(V_V_ORDERGUID)) + '&V_V_MATERIALCODE=' + encodeURI(encodeURI(V_V_MATERIALCODE))
    + '&V_V_MATERIALNAME=' + encodeURI(encodeURI(V_V_MATERIALNAME)) + '&V_D_FACT_START_DATE=' + V_D_FACT_START_DATE +
    '&V_D_FACT_FINISH_DATE=' + V_D_FACT_FINISH_DATE;

};
