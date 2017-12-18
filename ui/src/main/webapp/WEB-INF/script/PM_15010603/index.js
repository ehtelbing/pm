/**
 * Created by Yjn on 2017/12/13.
 */

var orderStateStoreLoad = false;
var checkPlantStoreLoad = false;
Ext.onReady(function () {
    Ext.getBody().mask('<p>正在载入中...</p>');

    var orderStateStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'orderStateStore',
        fields: ['ORDER_STATUS', 'ORDER_STATUS_DESC'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'yjn/PRO_DJ_ORDERSTATUS',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }, listeners: {
            load: function (store, records) {
                orderStateStoreLoad = true;
                orderStateStore.sort('ORDER_STATUS', 'ASC');
                orderStateStore.insert(0, {
                    ORDER_STATUS: '%',
                    ORDER_STATUS_DESC: '全部'
                });
                Ext.getCmp('state').select(orderStateStore.getAt(0));
                _init();
            }
        }
    });

    var checkPlantStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'checkPlantStore',
        fields: ['MENDDEPT_CODE', 'MENDDEPT_NAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'yjn/PRO_DJ603_MENDDEPT',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                USERCODE_IN: Ext.util.Cookies.get("v_orgCode"),
                PLANTCODE_IN: Ext.util.Cookies.get("v_deptcode")
            }
        },
        listeners: {
            load: function (store, records) {
                checkPlantStoreLoad = true;
                Ext.getCmp('plant').select(checkPlantStore.getAt(0));
                _init();
            }
        }
    });

    var gridStore = Ext.create('Ext.data.Store', {
        storeId: 'gridStore',
        autoLoad: false,
        pageSize: 200,
        fields: ['APPLY_DEPART', 'APPLY_DEPARTNAME', 'APPLY_ID', 'APPLY_PLANT', 'APPLY_PLANTNAME', 'DJ_NAME', 'DJ_UQ_CODE',
            'FLAG', 'INSERTDATE', 'INSERT_USERID', 'INSERT_USERNAME', 'MEND_CONTEXT', 'ORDERID', 'ORDER_FLAG', 'PLAN_BEGINDATE',
            'PLAN_ENDDATE', 'REC_DEPART', 'REC_FLAG', 'REC_PLANT', 'REC_USERID', 'REC_USERNAME', 'REMARK', 'NEXT_STATUS',
            'ORDER_STATUS1', 'MEND_USERNAME', 'MENDDEPT_NAME', 'DJ_VOL', 'F_MONEY', 'APPLYORDERID', 'APPLYPLANTNAME', 'MEND_TYPE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'yjn/PRO_DJ603_SELECTORDERLIST',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        },
        listeners: {
            beforeload: function (store, options) {
                gridStore.proxy.extraParams = {
                    MENDDEPT_CODE_in: Ext.getCmp('plant').getValue(),
                    DJ_UQ_CODE_in: Ext.getCmp('djcode').getValue(),
                    DJ_NAME_in: Ext.getCmp('djname').getValue(),
                    startDate: Ext.util.Format.date(Ext.getCmp('begindate').getValue(), 'Y-m-d'),
                    endDate: Ext.util.Format.date(Ext.getCmp('enddate').getValue(), 'Y-m-d') + ' 23:59:59',
                    ORDERID_in: Ext.getCmp('billcode').getValue(),
                    ORDER_STATUS_in: Ext.getCmp('state').getValue(),
                    person_in: Ext.util.Cookies.get('v_personcode'),
                    dj_vol_in: '%'
                }
            }
        }
    });

    var tablePanel = Ext.create('Ext.panel.Panel', {
        id: 'tablePanel',
        region: 'north',
        bodyStyle: {background: 'none'},
        border: 0,
        defaults: {
            labelAlign: 'right',
            labelWidth: 60
        },
        items: [{
            frame: true,
            style: 'margin-bottom:1px',
            defaults: {
                labelAlign: 'right',
                labelWidth: 60
            },
            layout: {
                type: 'table',
                columns: 3
            }
            , style: ' margin: 5px 0px 5px 5px',
            items: [
                {
                    id: 'plant',
                    xtype: 'combobox',
                    fieldLabel: '检修单位',
                    store: checkPlantStore,
                    editable: false,
                    displayField: 'MENDDEPT_NAME',
                    valueField: 'MENDDEPT_CODE',
                    queryMode: 'local',
                    style: ' margin: 5px 0px 5px 5px'
                },
                {
                    id: 'djcode',
                    xtype: 'textfield',
                    fieldLabel: '电机编号',
                    style: ' margin: 5px 0px 5px 5px'
                },
                {
                    id: 'djname',
                    xtype: 'textfield',
                    fieldLabel: '电机名称',
                    style: ' margin: 5px 0px 5px 5px'
                },
                {
                    id: 'begindate',
                    xtype: 'datefield',
                    editable: false,
                    fieldLabel: '起始日期',
                    format: 'Y-m-d',
                    value: getDate(),
                    style: ' margin: 5px 0px 5px 5px'
                },
                {
                    id: 'enddate',
                    xtype: 'datefield',
                    editable: false,
                    fieldLabel: '结束日期',
                    format: 'Y-m-d',
                    value: getDate("end"),
                    style: ' margin: 5px 0px 5px 5px'
                },
                {
                    id: 'billcode',
                    xtype: 'textfield',
                    fieldLabel: '工单号',
                    style: ' margin: 5px 0px 5px 5px'
                },
                {
                    id: 'state',
                    xtype: 'combobox',
                    fieldLabel: '工单状态',
                    store: orderStateStore,
                    editable: false,
                    displayField: 'ORDER_STATUS_DESC',
                    valueField: 'ORDER_STATUS',
                    queryMode: 'local',
                    style: ' margin: 5px 0px 5px 5px'
                },
                {
                    colspan: 3, layout: 'column', border: 0, bodyStyle: 'background:none',
                    items: [
                        {
                            xtype: 'button',
                            text: '查询',
                            id: 'query',
                            margin: '0px 0px 0px 10px',
                            icon: imgpath + '/search.png',
                            style: ' margin: 5px 0px 5px 5px',
                            handler: function () {
                                Ext.data.StoreManager.lookup('gridStore').load();
                            }
                        },
                        {
                            xtype: 'button',
                            text: '导出到Excel',
                            id: 'excel',
                            margin: '0px 0px 0px 10px',
                            icon: imgpath + '/311.gif',
                            style: ' margin: 5px 0px 5px 5px',
                            handler: expExcel
                        }
                    ]
                }
            ]
        }
        ]
    });

    var gridPanel = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel',
        region: 'center',
        columnLines: true,
        autoScroll: true,
        store: gridStore,
        columns: [
            {
                text: '工单', align: 'center', width: 60,
                renderer: function (value, meta, record) {
                    return '<a href="javascript:detail(\'' + record.data.ORDERID + '\');">打印</a>';
                }
            },
            {
                text: '委修票', align: 'center', width: 60,
                renderer: function (value, meta, record) {
                    return '<a href="javascript:bill(\'' + record.data.ORDERID + '\');">打印</a>';
                }
            },
            {
                text: '工单号',
                dataIndex: 'ORDERID',
                align: 'center',
                width: 100,
                renderer: left
            },
            {
                text: '电机编号',
                dataIndex: 'DJ_UQ_CODE',
                align: 'center',
                width: 80
            },
            {
                text: '电机名称',
                dataIndex: 'DJ_NAME',
                align: 'center',
                width: 120,
                renderer: left
            },
            {
                text: '申请厂矿',
                dataIndex: 'APPLYPLANTNAME',
                align: 'center',
                width: 100,
                renderer: left
            },
            {
                text: '维修内容',
                dataIndex: 'MEND_CONTEXT',
                align: 'center',
                width: 200,
                renderer: left
            },
            {
                text: '检修班组',
                dataIndex: 'MENDDEPT_NAME',
                align: 'center',
                width: 110,
                renderer: left
            },
            {
                text: '负责人',
                dataIndex: 'MEND_USERNAME',
                align: 'center',
                width: 110,
                renderer: left
            },
            {
                text: '工单状态',
                dataIndex: 'ORDER_STATUS1',
                align: 'center', width: 80,
                renderer: left
            },
            {
                text: '下一状态',
                dataIndex: 'NEXT_STATUS',
                align: 'center',
                width: 80,
                renderer: left
            }
        ],
        bbar: [
            {
                xtype: 'pagingtoolbar',
                id: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true,
                displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                emptyMsg: '没有记录',
                store: gridStore
            }
        ]
    });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        autoScroll: true,
        items: [tablePanel, gridPanel]
    });

});

function _init() {
    if (orderStateStoreLoad && checkPlantStoreLoad) {
        Ext.data.StoreManager.lookup('gridStore').load();
        Ext.getBody().unmask();//去除页面笼罩
    }
}

function expExcel() {
    document.location.href = AppUrl + 'yjn/ORDER_LIST_EXCEL?MENDDEPT_CODE_in=' + encodeURI(Ext.getCmp('plant').getValue()) +
    '&DJ_UQ_CODE_in=' + encodeURI(Ext.getCmp('djcode').getValue()) +
    '&DJ_NAME_in=' + encodeURI(encodeURI(Ext.getCmp('djname').getValue())) +
    '&startDate=' + encodeURI(encodeURI(Ext.util.Format.date(Ext.getCmp('begindate').getValue(), 'Y-m-d'))) +
    '&endDate=' + encodeURI(encodeURI(Ext.util.Format.date(Ext.getCmp('enddate').getValue(), 'Y-m-d')) + ' 23:59:59') +
    '&ORDERID_in=' + encodeURI(encodeURI(Ext.getCmp('billcode').getValue())) +
    '&ORDER_STATUS_in=' + encodeURI(encodeURI(Ext.getCmp('state').getValue())) +
    '&person_in=' + encodeURI(encodeURI(Ext.util.Cookies.get('v_personcode'))) +
    '&dj_vol_in=' + encodeURI(encodeURI('%'))

}

function getDate(type) {
    var d = new Date();
    var month = d.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var date = '';
    if (type == null) {
        date = d.getFullYear() + "-" + month + "-01";
    } else {
        var days = new Date(d.getFullYear(), d.getMonth() + 1, 0);
        date = days.getDate();
    }
    return date;
}


function left(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}


function detail(value) {
    window.open(AppUrl + "page/PM_15010603/orderInfo.html?orderid=" + value, null, "dialogWidth=1200px;dialogHeight=550px");
}

function bill(value) {
    window.open(AppUrl + "page/PM_15010603/billDetail.html?orderid=" + value, null, "dialogWidth=1200px;dialogHeight=550px");
}