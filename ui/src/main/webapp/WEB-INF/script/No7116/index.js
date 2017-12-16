var V_V_PLANTCODE = Ext.util.Cookies.get('v_orgCode');
var IS_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var IS_V_DEPTTYPE = Ext.util.Cookies.get('v_deptname2');

var V_V_DEPTCODE = '';
var A_EQUID = '';
var A_BEGINDATE = '';
var A_ENDDATE = '';
var sbStoreLoad = false;
var deptStoreLoad = false;

Ext.onReady(function () {
    Ext.getBody().mask('<p>正在载入中...</p>');

    //作业区
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
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'IS_V_DEPTCODE': V_V_PLANTCODE,
                'IS_V_DEPTTYPE': '[主体作业区]'
            }
        },
        listeners: {
            load: function (store, records) {


                Ext.getCmp('zyqName').setValue(IS_V_DEPTCODE);
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
                sbStoreLoad = true;
                Ext.getCmp('EQU_DESC').select(store.first());
                _init();
            }
        }
    });

    //报警信息
    var alertStore = Ext.create("Ext.data.Store", {
        id: 'alertStore',
        autoLoad: false,
        pageSize: 100,
        fields: ['ALERT_STATUS', 'EQU_DESC', 'SITE_DESC', 'BJ_UNIQUECODE', 'BJ_DESC', 'ALERT_CONTEXT', 'INSERTDATE',
            'UPDATEPERSON', 'HANDLE_USERNAME', 'HANDLE_CONTEXT', 'HANDLE_DATE', 'STATUS_VALUE', 'USERNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'ml/PRO_RUN7116_SELECT',
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
                xtype: 'button',
                text: '查询',
                style: ' margin: 5px 0px 5px 30px',
                icon: imgpath + '/search.png',
                handler: _selectInfo
            }, {
                xtype: 'button',
                text: '导出Excel',
                handler: _exportExcel,
                width: 90,
                style: ' margin: 5px 0px 5px 5px',
                icon: imgpath + '/excel.gif'
            }]
        }]
    });

    //显示面板
    var alertGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'alertGridPanel',
        store: alertStore,
        width: '100%',
        region: 'sourth',
        border: false,
        columnLines: true,
        columns: [/*{
         xtype: 'rownumberer',
         text: '序号',
         width: 40,
         align: 'center'
         }, */{
            text: '状态',
            dataIndex: 'STATUS_VALUE',
            align: 'center',
            width: 120,
            renderer: _status
        }, {
            text: '设备名称',
            dataIndex: 'EQU_DESC',
            align: 'center',
            width: 150,
            renderer: atleft
        }, {
            text: '位置',
            dataIndex: 'SITE_DESC',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '备件唯一编码',
            dataIndex: 'BJ_UNIQUECODE',
            align: 'center',
            width: 120,
            renderer: atright
        }, {
            text: '备件描述',
            dataIndex: 'BJ_DESC',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '报警内容',
            dataIndex: 'ALERT_CONTEXT',
            align: 'center',
            width: 180,
            renderer: atleft
            //  renderer:rendererTime
        }, {
            text: '报警时间',
            dataIndex: 'INSERTDATE',
            align: 'center',
            width: 180,
            renderer: rendererTime
        }, {
            text: '设备负责人',
            dataIndex: 'USERNAME',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '处理人',
            dataIndex: 'HANDLE_USERNAME',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '处理结果',
            dataIndex: 'HANDLE_CONTEXT',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '处理时间',
            dataIndex: 'HANDLE_DATE',
            align: 'center',
            width: 180,
            renderer: rendererTime
        }],
        bbar: [{
            id: 'gpage',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            width: '100%',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: alertStore
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
            items: [alertGridPanel]
        }]

    });

    _init();

});

//初始化
function _init() {

    if (sbStoreLoad && deptStoreLoad) {
        Ext.getBody().unmask();//去除页面笼罩
    }
};

//查找设备
function _selectSBName() {

    var sbStore = Ext.data.StoreManager.lookup('sbStore');

    V_V_PLANTCODE = V_V_PLANTCODE;
    V_V_DEPTCODE = Ext.getCmp('zyqName').getValue();


    sbStore.proxy.extraParams = {
        V_V_PLANTCODE: V_V_PLANTCODE,
        V_V_DEPTCODE: V_V_DEPTCODE
    };
    sbStore.load();
};

//查询作业量列表
function _selectInfo() {

    V_V_PLANTCODE = V_V_PLANTCODE;
    V_V_DEPTCODE = Ext.getCmp('zyqName').getValue();
    A_BEGINDATE = Ext.getCmp('A_BEGINDATE').getSubmitValue();
    A_ENDDATE = Ext.getCmp('A_ENDDATE').getSubmitValue();
    V_V_BJ_ID = Ext.getCmp('EQU_DESC').getValue();

    var alertStore = Ext.data.StoreManager.lookup('alertStore');
    alertStore.proxy.extraParams = {
        V_V_DEPARTCODE: V_V_DEPTCODE,
        V_V_PLANTCODE: V_V_PLANTCODE,
        V_V_BJ_ID: V_V_BJ_ID,
        V_V_BEGIN_DATE: A_BEGINDATE,
        V_V_END_DATE: A_ENDDATE
    };
    alertStore.load();

};

function _status(value, metaData, record, rowIndex, colIndex, store) {

    if (value == '已处理') {
        metaData.style = "text-align:center;color:#00FF00";
        return '<div data-qtip="' + value + '" >' + value + '</div>';
    } else {
        metaData.style = "text-align:center;color:#FF0000";
        return '<div data-qtip="' + value + '" >' + value + '</div>';
    }

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
    document.location.href = AppUrl + 'ml/PRO_RUN7116_SELECT_EXCEL?V_V_DEPARTCODE=' + encodeURI(encodeURI(V_V_DEPTCODE))
    + '&V_V_PLANTCODE=' + encodeURI(encodeURI(V_V_PLANTCODE)) + '&V_V_BJ_ID=' + encodeURI(encodeURI(V_V_BJ_ID)) +
    '&V_V_BEGIN_DATE=' + A_BEGINDATE + '&V_V_END_DATE=' + A_ENDDATE;
}
