var V_V_PLANTCODE = '';
var V_V_DEPTCODE = '';
var A_EQUID = '';
var A_BEGINDATE = '';
var A_ENDDATE = '';
var V_BEGINDATE = '';
var V_ENDDATE = '';
var A_BJ_UNIQUE_CODE = '';
var ckStoreLoad = false;
var deptStoreLoad = false;
var sbStoreLoad = false;
var V_BJ_UNIQUE_CODE='';
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
                //store.insert(0, {
                //    'V_DEPTCODE': '%',
                //    'V_DEPTNAME': '全部'
                //});
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

    //设备备件历史Store
    var equHistoryStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        pageSize: 20,
        storeId: 'equHistoryStore',
        fields: ['BJ_UNIQUE_CODE', 'MATERIALCODE', 'MATERIALNAME', 'UNIT', 'SITE_DESC', 'CHANGEDATE', 'BJ_STATUS',
            'DEPARTNAME', 'EQU_NAME', 'SUPPLY_NAME', 'SITE_ID'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/PRO_RUN_BJ_USE_ALL',
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

    //查询更换情况Store
    var changeConditionStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        pageSize: 10,
        storeId: 'changeConditionStore',
        fields: ['CHANGEDATE', 'BJ_UNIQUE_CODE', 'MATERIALNAME', 'UNIT', 'CHANGE_EQUNAME', 'CHANGE_SITE_DESC', 'SUPPLY_NAME', 'DIRECTION',
            'REMARK'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/PRO_RUN_BJ_CHANGE_LOG_ALL',//'ml/PRO_RUN_SITE_BJ_CHANGE_LOG_ALL',
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
                fieldLabel: '选择设备',
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
                xtype: 'textfield',
                id: 'SIGN',
                queryMode: 'local',
                fieldLabel: '唯一标识',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 0px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '查询',
                style: ' margin: 5px 0px 5px 20px',
                icon: imgpath + '/search.png',
                handler: _selectHistory
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
    var yeildGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'yeildGridPanel',
        store: equHistoryStore,
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
            text: '最近更换日期',
            dataIndex: 'CHANGEDATE',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '唯一标识',
            dataIndex: 'BJ_UNIQUE_CODE',
            align: 'center',
            width: 220,
            renderer: atright
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
            width: 220,
            renderer: atleft
        }, {
            text: '计量单位',
            dataIndex: 'UNIT',
            align: 'center',
            width: 80,
            renderer: atright
        }, {
            text: '备件状态',
            dataIndex: 'BJ_STATUS',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '当前设备',
            dataIndex: 'EQU_NAME',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '设备位置',
            dataIndex: 'SITE_DESC',
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
            text: '作业区',
            dataIndex: 'DEPARTNAME',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '详细更换历史',
            align: 'center',
            width: 120,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href="#" onclick="_checkHistory(\'' + record.data.BJ_UNIQUE_CODE + '\')">' + '查看' + '</a>';//'<a href="#" onclick="_checkHistory(\'' + record.data.SITE_ID + '\')">' + '查看' + '</a>';
            }
        }],
        bbar: [{
            id: 'gpage',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            width: '100%',
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: equHistoryStore
        }]
    });

    //查看详细更换面板
    var checkHistoryPanel = Ext.create('Ext.form.Panel', {
        id: 'checkHistoryPanel',
        region: 'fit',
        width: '100%',
        frame: true,
        layout: 'column',
        items: [{
            xtype: 'button',
            text: '导出到Excel',
            handler: _exportHistoryExcel,
            style: ' margin: 5px 0px 5px 10px',
            icon: imgpath + '/excel.gif'
        }]
    });

    //详细更换面板显示grid
    var checkHistoryGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'checkHistoryGridPanel',
        store: changeConditionStore,
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
            text: '更换日期',
            dataIndex: 'CHANGEDATE',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '唯一标识',
            dataIndex: 'BJ_UNIQUE_CODE',
            align: 'center',
            width: 240,
            renderer: atright
        }, {
            text: '物资描述',
            dataIndex: 'MATERIALNAME',
            align: 'center',
            width: 250,
            renderer: atleft
        }, {
            text: '计量单位',
            dataIndex: 'UNIT',
            align: 'center',
            width: 80,
            renderer: atright
        }, {
            text: '设备',
            dataIndex: 'CHANGE_EQUNAME',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '设备位置',
            dataIndex: 'CHANGE_SITE_DESC',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '更换方向',
            dataIndex: 'DIRECTION',
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
            text: '备注',
            dataIndex: 'REMARK',
            align: 'center',
            width: 120,
            renderer: atleft
        }],
        bbar: [{
            id: 'gpage1',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            //width: '100%',
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: changeConditionStore
        }]
    });

    //弹出框容器
    var checkHistoryWindow = Ext.create('Ext.window.Window', {
        id: 'checkHistoryWindow',
        title: '<div align="center"> 详细更换历史</div>',
        width: 1000,
        height: 400,
        modal: true,
        plain: true,
        closable: true,
        closeAction: 'close',
        model: true,
        layout: 'border',
        frame: true,
        items: [{
            region: 'north',
            border: false,
            items: [checkHistoryPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [checkHistoryGridPanel]
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

});

//初始化
function _init() {

    if (ckStoreLoad && sbStoreLoad && deptStoreLoad) {
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


//查询备件历史更换台账
function _selectHistory() {
    V_V_PLANTCODE = Ext.getCmp('ckName').getValue();
    V_V_DEPTCODE = Ext.getCmp('zyqName').getValue();
    A_EQUID = Ext.getCmp('EQU_DESC').getValue();
    A_BEGINDATE = Ext.getCmp('A_BEGINDATE').getSubmitValue();
    A_ENDDATE = Ext.getCmp('A_ENDDATE').getSubmitValue();
    A_BJ_UNIQUE_CODE = Ext.getCmp('SIGN').getValue();

    var equHistoryStore = Ext.data.StoreManager.lookup('equHistoryStore');

    equHistoryStore.proxy.extraParams = {
        A_PLANTCODE: V_V_PLANTCODE,
        A_DEPARTCODE: V_V_DEPTCODE,
        A_EQUID: A_EQUID,
        A_BJ_UNIQUE_CODE: A_BJ_UNIQUE_CODE,
        A_BEGINDATE: A_BEGINDATE,
        A_ENDDATE: A_ENDDATE
    };
    equHistoryStore.load();
};

//查看详细更换历史
function _checkHistory(SITE_ID) {
    //V_BEGINDATE = Ext.util.Format.date(Ext.getCmp('A_BEGINDATE').getSubmitValue(), 'Ymd');
    //V_ENDDATE = Ext.util.Format.date(Ext.getCmp('A_ENDDATE').getSubmitValue(), 'Ymd');
    V_BJ_UNIQUE_CODE = SITE_ID;
    Ext.getCmp('checkHistoryWindow').show();

    var changeConditionStore = Ext.data.StoreManager.lookup('changeConditionStore');

    changeConditionStore.proxy.extraParams = {
        A_BJ_UNIQUE_CODE:V_BJ_UNIQUE_CODE
        //V_SITE_ID: V_SITE_ID,
        //V_BEGINDATE: V_BEGINDATE,
        //V_ENDDATE: V_ENDDATE
    };
    changeConditionStore.load();
};


function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
};

//导出设备备件Excel
function _exportExcel() {
    document.location.href = AppUrl + 'ml/PRO_RUN_BJ_USE_ALL_EXCEL?A_PLANTCODE=' + encodeURI(encodeURI(V_V_PLANTCODE)) +
    '&A_DEPARTCODE=' + encodeURI(encodeURI(V_V_DEPTCODE)) + '&A_BJ_UNIQUE_CODE=' + encodeURI(encodeURI(A_BJ_UNIQUE_CODE)) + '&A_EQUID=' + encodeURI(encodeURI(A_EQUID)) +
    '&A_BEGINDATE=' + A_BEGINDATE + '&A_ENDDATE=' + A_ENDDATE;
};

//导出更换历史Excel
function _exportHistoryExcel() {
    document.location.href = AppUrl + 'ml/PRO_RUN_BJ_CHANGE_LOG_ALL_EXCEL?A_BJ_UNIQUE_CODE=' + encodeURI(encodeURI(V_BJ_UNIQUE_CODE)) ;
    //document.location.href = AppUrl + 'ml/PRO_RUN_SITE_BJ_CHANGE_LOG_ALL_EXCEL?V_SITE_ID=' + encodeURI(encodeURI(V_SITE_ID)) +
    //'&V_BEGINDATE=' + V_BEGINDATE + '&V_ENDDATE=' + V_ENDDATE;
}


