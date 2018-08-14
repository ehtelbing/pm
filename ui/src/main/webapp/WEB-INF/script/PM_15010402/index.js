var ORGCODE = Ext.util.Cookies.get('v_orgCode');
var ORGNAME = Ext.util.Cookies.get('v_orgname2');
var DEPTCODE = Ext.util.Cookies.get('v_deptcode');


var DEPARTCODE_IN = '';
var DJCODE_IN = '';
var DJNAME_IN = '';
var CONTEXT_IN = '';
var BEGINDATE_IN = '';
var ENDDATE_IN = '';
var TOPLANTCODE_IN = '';
var CONFIRM_FLAG_IN = '0';
var ckStoreLoad=false;
var deptStoreLoad=false;

Ext.onReady(function () {
    Ext.getBody().mask('<p>正在载入中...</p>');

    //部门Store
    var deptStore = Ext.create('Ext.data.Store', {
        id: 'deptStore',
        autoLoad: true,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_12/PRO_BASE_DEPT_VIEW',

            actionMethods: {
                read: 'POST'
            },
            reader: {
                root: 'list'
            },
            extraParams: {
                'IS_V_DEPTCODE': ORGCODE,
                'IS_V_DEPTTYPE': '[主体作业区]'
            }
        },
        listeners: {
            load: function (store, records) {
                store.insert(0, {
                    'V_DEPTCODE': '%',
                    'V_DEPTNAME': '全部'
                });
                deptStoreLoad = true;
                Ext.getCmp('APPLY_PLANT').select(store.first());
                _init();
            }
        }

    });

    //接收厂矿
    var ckStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'ckStore',
        fields: ['MENDDEPT_CODE', 'MENDDEPT_NAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/PRO_DJ401_MENDPLANT',
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
                    'MENDDEPT_CODE': '%',
                    'MENDDEPT_NAME': '全部'
                });
                ckStoreLoad=true;
                Ext.getCmp('JS_CK').select(store.first());

            }
        }
    });

    //工单查询Store
    var gdCheckStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'gdCheckStore',
        pageSize: 200,
        fields: ['APPLY_ID', 'ORDERID', 'MENDDEPT_NAME', 'DJ_NAME', 'DJ_UQ_CODE', 'MEND_CONTEXT', 'INSERT_USERNAME', 'PLAN_BEGINDATE', 'PLAN_ENDDATE', 'REMARK', 'REC_PLANT', 'REC_FLAG'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/PRO_DJ402_APPLYLIST',
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
                xtype: 'textfield',
                id: 'CK',
                fieldLabel: '厂矿',
                value: ORGNAME,
                readonly: true,
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'

            }, {
                id: 'APPLY_PLANT',
                xtype: 'combo',
                store: deptStore,
                editable: false,
                fieldLabel: '部门',
                labelWidth: 80,
                width: 250,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'DJ_CODE',
                fieldLabel: '电机编号',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'

            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'DJ_NAME',
                fieldLabel: '电机名称',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'

            }, {
                id: 'MEND_CONTEXT',
                xtype: 'textfield',
                fieldLabel: '检修内容',
                width: 500,
                labelWidth: 80,
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
                id: 'JS_CK',
                xtype: 'combo',
                store: ckStore,
                editable: false,
                fieldLabel: '接收厂矿',
                labelWidth: 80,
                width: 250,
                displayField: 'MENDDEPT_NAME',
                valueField: 'MENDDEPT_CODE',
                queryMode: 'local',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'button',
                text: '查询',
                style: ' margin: 5px 0px 5px 30px',
                icon: imgpath + '/search.png',
                handler: _selectList
            }, {
                xtype: 'button',
                text: '导出到Excel',
                style: ' margin: 5px 0px 5px 60px',
                icon: imgpath + '/excel.gif',
                handler: _exportExcel
            }]
        }]
    });


//显示面板
    var gdCheckGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'supplyListGridPanel',
        store: gdCheckStore,
        width: '100%',
        region: 'sourth',
        border: false,
        columnLines: true,
        /* selModel: {
         selType: 'checkboxmodel',
         mode: 'SINGLE'
         },*/
        columns: [{
            text: '详细信息',
            id: 'detail',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href="#" onclick="_checkDetail(\'' + record.data.APPLY_ID + '\')">' + '查看' + '</a>';
            }
        }, {
            text: '工单号',
            dataIndex: 'ORDERID',
            align: 'center',
            width: 120,
            renderer: atright
        }, {
            text: '电机编号',
            dataIndex: 'DJ_UQ_CODE',
            align: 'center',
            width: 120,
            renderer: atright
        }, {
            text: '电机名称',
            dataIndex: 'DJ_NAME',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '检修内容',
            dataIndex: 'MEND_CONTEXT',
            align: 'center',
            width: 180,
            renderer: atleft
        }, {
            text: '录入人',
            dataIndex: 'INSERT_USERNAME',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '计划开始时间',
            dataIndex: 'PLAN_BEGINDATE',
            align: 'center',
            width: 120,
            renderer: rendererTime
        }, {
            text: '计划完成时间',
            dataIndex: 'PLAN_ENDDATE',
            align: 'center',
            width: 120,
            renderer: rendererTime
        }, {
            text: '备注',
            dataIndex: 'REMARK',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '接收厂矿',
            dataIndex: 'REC_PLANT',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '接收状态',
            dataIndex: 'REC_FLAG',
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
            store: gdCheckStore
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
            items: [gdCheckGridPanel]
        }]

    });

    _init();

})
//初始化
function _init() {

    if (ckStoreLoad&&deptStoreLoad) {
        Ext.getBody().unmask();//去除页面笼罩
    }
}

//查询工单列表
function _selectList() {

    DEPARTCODE_IN = Ext.getCmp('APPLY_PLANT').getValue();
    DJCODE_IN = Ext.getCmp('DJ_CODE').getValue();
    DJNAME_IN = Ext.getCmp('DJ_NAME').getValue();
    CONTEXT_IN = Ext.getCmp('MEND_CONTEXT').getValue();
    BEGINDATE_IN = Ext.getCmp('A_BEGINDATE').getSubmitValue();
    ENDDATE_IN = Ext.getCmp('A_ENDDATE').getSubmitValue();
    TOPLANTCODE_IN = Ext.getCmp('JS_CK').getValue();

    var gdCheckStore = Ext.data.StoreManager.lookup('gdCheckStore');

    gdCheckStore.proxy.extraParams = {
        'PLANTCODE_IN': ORGCODE,
        DEPARTCODE_IN: DEPARTCODE_IN,
        DJCODE_IN: DJCODE_IN,
        DJNAME_IN: DJNAME_IN,
        CONTEXT_IN: CONTEXT_IN,
        BEGINDATE_IN: BEGINDATE_IN,
        ENDDATE_IN: ENDDATE_IN,
        TOPLANTCODE_IN: TOPLANTCODE_IN,
        CONFIRM_FLAG_IN: CONFIRM_FLAG_IN

    };
    gdCheckStore.load();
};


//修改工单
function _checkDetail(APPLY_ID) {
    var returnVal = window.open(AppUrl + 'page/PM_1501040201/index.html?APPLY_ID=' + APPLY_ID, window, "dialogWidth=800px;dialogHeight=550px");
    if (returnVal != null) {
        _selectList();
    }
};

function rendererTime(value, metaData) {
    metaData.style = "text-align:left";
    return '<div data-qtip="' + value.substring(0, 10) + '" >' + value.substring(0, 10) + '</div>';
    //return '<div data-qtip="' + value.split('.0')[0] + '" >' + value.split('.0')[0] + '</div>';
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
    document.location.href = AppUrl + 'ml/PRO_DJ402_APPLYLIST_EXCEL?PLANTCODE_IN=' + ORGCODE +
    '&DEPARTCODE_IN=' + encodeURI(encodeURI(DEPARTCODE_IN)) + '&DJCODE_IN=' + DJCODE_IN + '&DJNAME_IN=' + DJNAME_IN +
    '&CONTEXT_IN=' + CONTEXT_IN + '&BEGINDATE_IN=' + BEGINDATE_IN + '&ENDDATE_IN=' + ENDDATE_IN + '&TOPLANTCODE_IN=' + encodeURI(encodeURI(TOPLANTCODE_IN)) +
    '&CONFIRM_FLAG_IN=' + CONFIRM_FLAG_IN;
}

