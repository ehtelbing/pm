var main = '';
if (location.href.split('?')[1] != null) {
    main = Ext.urlDecode(location.href.split('?')[1]).main;
}
Ext.onReady(function () {
    Ext.QuickTips.init();
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: false,
        fields: ['V_ORGCODE', 'V_ORGNAME', 'V_V_WYSNUM', 'V_V_SUMNUM', 'V_V_YSNUM', 'V_V_ZXL'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PRO_PM_ORG_SORT',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }

    });

    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        region: 'center',
        store: gridStore,
        columnLines: true,
        autoScroll: true,
        height: 400,
        features: [{
            ftype: 'summary'
        }],
        columns: [{
            xtype: 'rownumberer',
            width: 30,
            sortable: false
        }, {
            text: '厂矿',
            width: 250,
            dataIndex: 'V_ORGNAME',
            align: 'center',
            renderer: aleft
        }, {
            text: '验收工单数',
            width: 190,
            dataIndex: 'V_V_YSNUM',
            align: 'center',
            summaryType: 'sum',
            summaryRenderer: function (value, summaryData, dataIndex) {
                summaryData.style = "text-align:right;";
                return "合计：" + value;
            }
        }, {
            text: '未验收数量',
            width: 190,
            dataIndex: 'V_V_WYSNUM',
            align: 'center',
            summaryType: 'sum',
            summaryRenderer: function (value, summaryData, dataIndex) {
                summaryData.style = "text-align:right;";
                return "合计：" + value;
            }
        }, {
            text: '工单总数',
            width: 190,
            dataIndex: 'V_V_SUMNUM',
            align: 'center',
            summaryType: 'sum',
            summaryRenderer: function (value, summaryData, dataIndex) {
                summaryData.style = "text-align:right;";
                return "合计：" + value;
            }
        }, {
            text: '工单执行率',
            width: 200,
            dataIndex: 'V_V_ZXL',
            align: 'center',
            renderer: rateRight
        }]
    });

    var searchPanel = Ext.create('Ext.form.Panel', {
        id: 'searchPanel',
        style: 'margin:5px 0px 2px 2px',
        region: 'north',
        width: '100%',
        defaults: {
            style: 'margin:5px 0px 5px 10px',
            labelAlign: 'right'
        },
        layout: {
            type: 'column'
        },
        items: [
            {
                id: 'begintime',
                xtype: 'datefield',
                editable: false,
                format: 'Y/m/d',
                value: new Date(new Date().getFullYear() + '/'
                    + (new Date().getMonth() + 1) + '/' + 1),
                fieldLabel: '时间段选择',
                labelWidth: 70,
                baseCls: 'margin-bottom'
            }, {
                id: 'endtime',
                xtype: 'datefield',
                editable: false,
                format: 'Y/m/d',
                value: new Date(),
                fieldLabel: '至',
                labelWidth: '15px'
            }, {
                id: 'query',
                xtype: 'button',
                icon: imgpath + '/search.png',
                style: ' margin: 5px 0px 0px 10px',
                text: '查询',
                width: 80,
                handler: queryGrid
            }]
    });


    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [searchPanel, grid]
    });
    queryGrid();

});

function aleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function rateRight(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value + '%';
}

function queryGrid() {
    Ext.data.StoreManager.lookup('gridStore').load(
        {
            params: {
                V_D_ENTER_DATE_B: Ext.Date.format(Ext.getCmp("begintime").getValue(), 'Y/m/d'),
                V_D_ENTER_DATE_E: Ext.Date.format(Ext.getCmp("endtime").getValue(), 'Y/m/d')
            }
        });
}

function GridSum(grid) {
    var ysSum = 0;
    var gdzsSum = 0;
    grid.store.each(function (record, index) {
        ysSum += Number(record.data.WR_OK);
        gdzsSum += Number(record.data.WR_TOTAL);
    });

    var n = grid.getStore().getCount();// 获得总行数

    var ins_rec = Ext.create('gridModel', {
        V_ORGNAME: '合计',
        WR_OK: ysSum,
        WR_TOTAL: gdzsSum,
        RATE: gdzsSum == 0 ? 0 : Math.round(ysSum / gdzsSum * 100)
    });
    grid.store.insert(n, ins_rec);
}