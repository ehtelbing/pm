/**
 * Created by LL on 2017/11/2.
 */
Ext.onReady(function () {

    var gridStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'gridStore',
        fields: ['V_ORDERID', 'V_ORDERGUID', 'V_YS_TIME', 'V_MATERIALCODE', 'V_MATERIALNAME', 'V_UNIT', 'F_UNITPRICE', 'I_PLANAMOUNT', 'F_PLANMONEY',
            'I_ACTUALAMOUNT', 'F_ACTUALMONEY', 'V_JJ_CODE', 'V_JJ_NAME', 'V_JJ_TS', 'V_JJ_DE', 'CARCOST', 'V_TS', 'V_DE', 'I_NUMBER_OF_PEOPLE',
            'PERSONCOST', 'TOTALPLANCOST', 'TOTALACTUALCOST'],
        proxy: {
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            url: AppUrl + 'YS/ys_charge_workorder_sel',
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        }
    });

    var gridPanel = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel',
        features: {
            ftype: 'summary'
        },
        columnLines: true,
        width: '100%',
        store: gridStore,
        selType: 'rowmodel',
        autoScroll: true,
        columns: [
            {
                xtype: 'rownumberer',
                width: 30,
                sortable: false
            },
            {
                text: '工单号',
                dataIndex: 'V_ORDERID',
                align: 'center',
                width: 120,
                renderer: left,
                summaryType: 'sum',
                summaryRenderer: function (value) {
                    return '总计:';
                }
            },
            {
                text: '验收日期',
                dataIndex: 'V_YS_TIME',
                align: 'center',
                width: 120,
                renderer: left
            }, {
                text: '物料使用情况',
                columns: [{
                    text: '物料名称',
                    dataIndex: 'V_MATERIALNAME',
                    align: 'center',
                    width: 120,
                    renderer: left
                }, {
                    text: '计量单位',
                    dataIndex: 'V_UNIT',
                    align: 'center',
                    width: 120,
                    renderer: left
                }, {
                    text: '单价(元)',
                    dataIndex: 'F_UNITPRICE',
                    align: 'center',
                    width: 120,
                    renderer: right
                }, {
                    text: '计划数量',
                    dataIndex: 'I_PLANAMOUNT',
                    align: 'center',
                    width: 120,
                    renderer: right
                }, {
                    text: '物料计划成本(元)',
                    dataIndex: 'F_PLANMONEY',
                    align: 'center',
                    summaryType: 'sum',
                    width: 120,
                    renderer: rights
                }, {
                    text: '实际数量',
                    dataIndex: 'I_ACTUALAMOUNT',
                    align: 'center',
                    width: 120,
                    renderer: right
                }, {
                    text: '物料实际成本(元)',
                    dataIndex: 'F_ACTUALMONEY',
                    align: 'center',
                    summaryType: 'sum',
                    width: 120,
                    renderer: rights
                }]
            }, {
                text: '人工工时使用情况',
                columns: [{
                    text: '检修台时',
                    dataIndex: 'V_TS',
                    align: 'center',
                    width: 120,
                    renderer: right
                }, {
                    text: '检修定额(元)',
                    dataIndex: 'V_DE',
                    align: 'center',
                    width: 120,
                    renderer: right
                }, {
                    text: '检修人数',
                    dataIndex: 'I_NUMBER_OF_PEOPLE',
                    align: 'center',
                    width: 120,
                    renderer: right
                }, {
                    text: '检修人工成本(元)',
                    dataIndex: 'PERSONCOST',
                    align: 'center',
                    summaryType: 'sum',
                    width: 120,
                    renderer: rights
                }]
            }, {
                text: '机具使用情况',
                columns: [{
                    text: '车辆名称',
                    dataIndex: 'V_JJ_NAME',
                    align: 'center',
                    width: 120,
                    renderer: right
                }, {
                    text: '检修台时',
                    dataIndex: 'V_JJ_TS',
                    align: 'center',
                    width: 120,
                    renderer: right
                }, {
                    text: '车辆定额(元)',
                    dataIndex: 'V_JJ_DE',
                    align: 'center',
                    width: 120,
                    renderer: right
                }, {
                    text: '检修机具成本(元)',
                    dataIndex: 'CARCOST',
                    summaryType: 'sum',
                    align: 'center',
                    width: 120,
                    renderer: rights
                }]
            },
            {
                text: '工单结算计划成本小计(元)',
                dataIndex: 'TOTALPLANCOST',
                summaryType: 'sum',
                align: 'center',
                width: 180,
                renderer: rights
            },
            {
                text: '工单结算实际成本小计(元)',
                dataIndex: 'TOTALACTUALCOST',
                summaryType: 'sum',
                align: 'center',
                width: 180,
                renderer: rights
            }
        ],
        dockedItems: [
            {
                xtype: 'panel',
                frame: true,
                layout: 'column',
                defaults: {
                    style: 'margin:10px 0px 20px 25px'
                },
                items: [{
                    xtype: 'textfield',
                    id: 'workorder',
                    emptyText: '输入工单号',
                    editable: false,
                    labelWidth: 90,
                    labelAlign: 'right',
                    queryMode: 'local',
                    width: 200
                }, {
                    xtype: 'button',
                    text: '生成检修结算单',
                    icon: imgpath + '/cog.png',
                    handler: _seek
                }]
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
            region: 'center',
            layout: 'fit',
            border: false,
            items: [gridPanel]
        }]
    });

});

function _seek() {
    var proxy = Ext.data.StoreManager.lookup('gridStore').getProxy();
    proxy.extraParams.V_V_ORDERID = Ext.getCmp('workorder').getSubmitValue();
    Ext.data.StoreManager.lookup('gridStore').load();
}

function left(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}
function right(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}
function rights(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return Ext.util.Format.number(value, '0.00');

}