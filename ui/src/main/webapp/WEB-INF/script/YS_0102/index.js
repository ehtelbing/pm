/**
 * Created by LL on 2017/10/31.
 */


Ext.onReady(function () {
    var yeararr = [];
    for (var i = 2014; i <= new Date().getFullYear() + 1; i++) {
        yeararr.push({
            "code": i,
            "name": i
        });
    }

    var yearStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'yearStore',
        data: yeararr,
        fields: ['code', 'name'],
        proxy: {
            type: 'memory',
            async: false,
            render: {
                type: 'json'
            }
        }
    });

    var montharr = [];
    for (var i = 1; i <= 12; i++) {
        montharr.push({
            "code": i,
            "name": i
        });
    }

    var monthStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'monthStore',
        data: montharr,
        fields: ['code', 'name'],
        proxy: {
            type: 'memory',
            async: false,
            render: {
                type: 'json'
            }
        }
    });

    var ckStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'ckStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_12/PRO_BASE_DEPT_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'IS_V_DEPTCODE': '',
                'IS_V_DEPTTYPE': '[基层单位]'
            }
        },
        listeners: {
            load: function (store) {
                Ext.getCmp('ck').select(store.first());
            }
        }
    });

    var gridStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        pageSize: 20,
        storeId: 'gridStore',
        fields: ['I_ID', 'I_YEAR', 'I_MONTH', 'VCH_DEPTCODE2', 'VCH_DEPTCODE_CK', 'VCH_CHARGECODE', 'VCH_DEPTNAME2', 'VCH_DEPTNAME_CK', 'VCH_CHARGENAME','VCH_DEPTNAME_GS',
            'F_MONEY_PRIMARYBUD_YEAR', 'F_MONEY_BUD_YEAR', 'F_MONEY_BUD', 'F_MONEY_FACT', 'F_MONEY_MARGIN', 'F_MONEY_BUD_TOTAL', 'F_MONEY_YEAR', 'F_MONEY_MARGIN_TOTAL'],
        proxy: {
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            url: AppUrl + 'YS/ys_report_charge_sel',
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'

            },
            extraParams: {}
        }
    });

    var gridPanel = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel',
        columnLines: true,
        width: '100%',
        store: gridStore,
        selType: 'rowmodel',
        autoScroll: true,
        forceFit: true,
        columns: [
            {
                xtype: 'rownumberer',
                width: 35,
                sortable: false
            },
            {
                text: '费用名称',
                dataIndex: 'VCH_CHARGENAME',
                align: 'center',
                width: 120,
                renderer: left,
                summaryType: 'sum',
                summaryRenderer: function (value) {
                    return '总计:';
                }
            },{
                text: '所属部门',
                dataIndex: 'VCH_DEPTNAME_GS',
                align: 'center',
                width: 120,
                renderer: left
            },
            {
                text: '标准年预算(万元)',
                dataIndex: 'F_MONEY_PRIMARYBUD_YEAR',
                align: 'center',
                width: 120,
                renderer: right
            },
            {
                text: '执行年预算(万元)',
                dataIndex: 'F_MONEY_BUD_YEAR',
                align: 'center',
                width: 120,
                renderer: right
            },
            {
                text: '月预算(万元)',
                dataIndex: 'F_MONEY_BUD',
                align: 'center',
                width: 120,
                renderer: right
            },
            {
                text: '月实际(万元)',
                dataIndex: 'F_MONEY_FACT',
                align: 'center',
                width: 120,
                renderer: right
            }, {
                text: '月差异(超+降-)(万元)',
                dataIndex: 'F_MONEY_MARGIN',
                align: 'center',
                width: 150,
                renderer: rendValueColor
            }, {
                text: '月累计预算(万元)',
                dataIndex: 'F_MONEY_BUD_TOTAL',
                align: 'center',
                width: 120,
                renderer: right
            }, {
                text: '累计实际(万元)',
                dataIndex: 'F_MONEY_YEAR',
                align: 'center',
                width: 120,
                renderer: right
            }, {
                text: '预算余额(万元)',
                dataIndex: 'F_MONEY_MARGIN_TOTAL',
                align: 'center',
                width: 120,
                renderer: right
            }
        ],
        dockedItems: [
            {
                xtype: 'panel',
                frame: true,
                layout: 'vbox',
                defaults: {
                    style: 'margin:10px 0px 0px 5px'
                },
                items: [{
                    xtype: 'panel',
                    region: 'north',
                    layout: 'column',
                    baseCls: 'my-panel-no-border',
                    items: [{
                        xtype: 'combo',
                        id: 'year',
                        store: 'yearStore',
                        fieldLabel: '年 份',
                        labelAlign: 'right',
                        editable: false,
                        labelWidth: 90,
                        width: 200,
                        value: new Date().getFullYear(),
                        queryMode: 'local',
                        style: ' margin:10px 0px 20px -8px',
                        displayField: 'name',
                        valueField: 'code'
                    }, {
                        xtype: 'combo',
                        id: 'month',
                        store: 'monthStore',
                        fieldLabel: '月 份',
                        labelAlign: 'right',
                        editable: false,
                        labelWidth: 90,
                        width: 200,
                        value: new Date().getMonth() + 1,
                        queryMode: 'local',
                        style: ' margin:10px 0px 20px 7px',
                        displayField: 'name',
                        valueField: 'code'

                    }, {
                        xtype: 'combo',
                        id: "ck",
                        store: ckStore,
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '厂矿',
                        displayField: 'V_DEPTNAME',
                        valueField: 'V_DEPTCODE',
                        labelWidth: 55,
                        style: ' margin:10px 0px 20px 57px',
                        labelAlign: 'right'
                    },{
                        xtype: 'button',
                        text: '查 询',
                        icon: imgpath + '/search.png',
                        style: ' margin:10px 0px 20px 5px',
                        handler: _queryGrid
                    }
                    ]
                },{
                    xtype: 'panel',
                    region: 'south',
                    layout: 'column',
                    baseCls: 'my-panel-no-border',
                    items: [ {
                        xtype: 'displayfield',
                        id: 'SUM_MONEY_PRI_YEAR',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '标准年预算(万元)',
                        labelWidth: 120,
                        width: 200,
                        value: '0.0',
                        labelAlign: 'right',
                        style: 'margin:-10px 0px 0px 25px',
                        renderer: right
                    },{
                        xtype: 'displayfield',
                        id: 'SUM_MONEY_BUD_YEAR',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '执行年预算(万元)',
                        labelWidth: 120,
                        width: 200,
                        value: '0.0',
                        labelAlign: 'right',
                        style: 'margin:-10px 0px 0px 8px',
                        renderer: right
                    }, {
                        xtype: 'displayfield',
                        id: 'SUM_MONEY_BUD',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '月预算(万元)',
                        value: '0.0',
                        labelWidth: 120,
                        width: 200,
                        labelAlign: 'right',
                        style: 'margin:-10px 0px 0px 3px',
                        renderer: right
                    }, {
                        xtype: 'displayfield',
                        id: 'SUM_MONEY_FACT',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '月实际(万元)',
                        value: '0.0',
                        labelWidth: 120,
                        width: 200,
                        labelAlign: 'right',
                        style: 'margin:-10px 0px  0px 55px',
                        renderer: right
                    }]
                }, {
                    xtype: 'panel',
                    region: 'south',
                    layout: 'column',
                    baseCls: 'my-panel-no-border',
                    items: [ {
                        xtype: 'displayfield',
                        id: 'SUM_MONEY_MARGIN',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '月差异（超+降-）(万元)',
                        value: '0.0',
                        labelWidth: 130,
                        width: 200,
                        labelAlign: 'right',
                        style: 'margin:0px 0px 0px 47px',
                        renderer: rendValueColor
                    }, {
                        xtype: 'displayfield',
                        id: 'SUM_MONEY_BUD_TOTAL',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '月累计预算(万元)',
                        value: '0.0',
                        labelWidth: 120,
                        width: 200,
                        labelAlign: 'right',
                        style: 'margin:0px 0px 0px -17px',
                        renderer: right
                    },{
                        xtype: 'displayfield',
                        id: 'SUM_MONEY_YEAR',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '累计实际(万元)',
                        value: '0.0',
                        labelWidth: 120,
                        width: 200,
                        labelAlign: 'right',
                        style: 'margin:0px 0px 0px 17px',
                        renderer: right
                    },{
                        xtype: 'displayfield',
                        id: 'SUM_MONEY_MARGIN_TOTAL',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '预算余额(万元)',
                        value: '0.0',
                        labelWidth: 120,
                        width: 200,
                        labelAlign: 'right',
                        style: 'margin:0px 0px 0px 57px',
                        renderer: right
                    }]
                }]
            }],
        bbar: ["->",
            {
                xtype: 'pagingtoolbar',
                store: gridStore,
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
        items: [{
            region: 'center',
            layout: 'fit',
            border: false,
            items: [gridPanel]
        }]
    });

});
function _queryGrid(){
    _seek();
    _querySum();
}
function _seek() {
    var proxy = Ext.data.StoreManager.lookup('gridStore').getProxy();
    proxy.extraParams.V_I_YEAR = Ext.getCmp('year').getValue();
    proxy.extraParams.V_I_MONTH = Ext.getCmp('month').getValue();
    proxy.extraParams.V_DEPTCODE = Ext.getCmp('ck').getValue();
    Ext.data.StoreManager.lookup('gridStore').currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore').load();
}
function _querySum(){
    Ext.Ajax.request({
        url: AppUrl + 'YS/YS_REPORT_C_DEPT_TOTAL_SEL',
        async: false,
        method: 'POST',
        params: {
            'V_I_YEAR':  Ext.getCmp('year').getValue(),
            'V_I_MONTH': Ext.getCmp('month').getValue(),
            'V_DEPTCODE':Ext.getCmp('ck').getValue()
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);
            if (data.RET=="success") {
                Ext.getCmp('SUM_MONEY_PRI_YEAR').setValue(data.RET1);
                Ext.getCmp('SUM_MONEY_BUD_YEAR').setValue(data.RET2);
                Ext.getCmp('SUM_MONEY_BUD').setValue(data.RET3);
                Ext.getCmp('SUM_MONEY_FACT').setValue(data.RET4);
                Ext.getCmp('SUM_MONEY_MARGIN').setValue(data.RET5);
                Ext.getCmp('SUM_MONEY_BUD_TOTAL').setValue(data.RET6);
                Ext.getCmp('SUM_MONEY_YEAR').setValue(data.RET7);
                Ext.getCmp('SUM_MONEY_MARGIN_TOTAL').setValue(data.RET8);
            }
        }
    });
}
function left(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}
function right(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return Ext.util.Format.number(value, '0.00');

}
function rendValueColor(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    if (value <= 0) {
        return '<a style="color:red">' + Ext.util.Format.number(value, '0.00') + '</a>'
    } else {
        return '<a style="color:black" >' + Ext.util.Format.number(value, '0.00') + '</a>'
    }
}
