var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_PERSONNAME = Ext.util.Cookies.get('v_personname2');

Ext.onReady(function () {
    Ext.getBody().mask('<p>正在载入中...</p>');

    //查询
    var orderSYStore = Ext.create("Ext.data.Store", {
        storeId: 'orderSYStore',
        autoLoad: false,
        pageSize: 200,
        fields: ['ORDERID', 'DJ_NAME', 'BCSY_RESULT', 'CSY_RESULT', 'MEND_CONTEXT', 'MENDDEPT_NAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'mwd/GETORDERSY',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'RET',
                total: 'total'
            }
        }

    });

    var tablePanel = Ext.create('Ext.panel.Panel', {
        id: 'tablePanel',
        region: 'north',
        layout: 'vbox',
        frame: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            border: true,
            width: '100%',
            //baseCls: 'my-panel-no-border',
            items: [{
                id: 'MENDDEPT_CODE_IN',
                xtype: 'combo',
                store : {
                    fields : [ "MENDDEPT_CODE", "MENDDEPT_NAME" ],
                    data : [ {
                        MENDDEPT_CODE : Ext.util.Cookies.get('v_deptcode'),
                        MENDDEPT_NAME : Ext.util.Cookies.get('v_deptname2')
                    } ]
                },
                fieldLabel: '检修单位',
                labelWidth: 70,
                width: 200,
                value: Ext.util.Cookies.get('v_deptcode'),
                displayField: 'MENDDEPT_NAME',
                valueField: 'MENDDEPT_CODE',
                queryMode: 'local',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'ORDERID_IN',
                fieldLabel: '工单号',
                labelWidth: 70,
                width: 200,
                style: ' margin: 5px 0px 5px -10px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '查询',
                style: ' margin: 5px 0px 5px 10px',
                icon: imgpath + '/search.png',
                handler: _selectOrderSY
            }]
        }]
    });

    var orderSYGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'orderSYGridPanel',
        store: orderSYStore,
        width: '100%',
        border: false,
        columnLines: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINPLE'
        },
        columns: [{
            text: '试验',
            align: 'center',
            width: 70,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href=javascript:dealWith(\'</a><a href="#" onclick="_writeIn(\'' + record.data.ORDERID + '\')">' + '录入' + '</a>';
            }
        }, {
            text: '工单号',
            dataIndex: 'ORDERID',
            align: 'center',
            flex: 1,
            renderer: atleft
        },  {
            text: '电机名称',
            dataIndex: 'DJ_NAME',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '半成品试验结果',
            dataIndex: 'BCSY_RESULT',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '成品试验结果',
            dataIndex: 'CSY_RESULT',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '维修内容',
            dataIndex: 'MEND_CONTEXT',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '检修班组',
            dataIndex: 'MENDDEPT_NAME',
            align: 'center',
            flex: 1,
            renderer: atleft
        }],
        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: orderSYStore,
            dock: 'bottom',
            displayInfo: true
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
        items: [{
            region: 'north',
            border: false,
            items: [tablePanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [orderSYGridPanel]
        }]

    });

    _init();
});

//初始化
function _init() {
    if (true) {

        _selectOrderSY();
        Ext.getBody().unmask();//去除页面笼罩
    }
}

function _selectOrderSY() {
    var orderSYStore = Ext.data.StoreManager.lookup('orderSYStore');
    orderSYStore.proxy.extraParams = {
        A_PLANTCODE: Ext.util.Cookies.get('v_orgCode'),
        A_MENDDEPT: Ext.getCmp('MENDDEPT_CODE_IN').getSubmitValue(),
        A_ORDERID: Ext.getCmp('ORDERID_IN').getSubmitValue()
    };

    orderSYStore.currentPage = 1;
    orderSYStore.load();
}

function _writeIn(ORDERID) {
    window.open(AppUrl + 'page/PM_1501060501/index.html?ORDERID=' + ORDERID, '', 'height=700px,width=1100px,top=50px,left=100px,resizable=yes');
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}
