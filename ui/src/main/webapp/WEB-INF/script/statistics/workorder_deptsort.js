var main = '';
if (location.href.split('?')[1] != null) {
    main = Ext.urlDecode(location.href.split('?')[1]).main;
}
Ext.onReady(function() {
    Ext.QuickTips.init();

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['V_DEPTNAME', 'WR_OK', 'WR_TOTAL','RATE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PRO_PM_DEPT_SORT',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        }

    });

    var grid = Ext.create('Ext.grid.Panel', {
        id : 'grid',
        region : 'center',
        store : gridStore,
        columnLines : true,
        autoScroll : true,
        height : 400,
        columns : [ {
            xtype : 'rownumberer',
            width : 30,
            sortable : false
        }, {
            text : '作业区',
            width : 250,
            dataIndex : 'V_DEPTNAME',
            align : 'center',
            renderer:aleft
        }, {
            text : '验收工单数',
            width : 190,
            dataIndex : 'WR_OK',
            align : 'center',
            renderer:aleft
        }, {
            text : '未验收数量',
            width : 190,
            dataIndex : 'WR_TOTAL',
            align : 'center',
            renderer : receiveCenter
        }, {
            text : '工单总数',
            width : 190,
            dataIndex : 'WR_TOTAL',
            align : 'center',
            renderer:aleft
        }, {
            text : '工单执行率',
            width : 200,
            dataIndex : 'RATE',
            align : 'center',
            renderer:aleft

        } ]
    });

    var searchPanel = Ext.create('Ext.form.Panel', {
        id : 'searchPanel',

        style : 'margin:5px 0px 2px 2px',
        region : 'north',
        width : '100%',
        //baseCls : 'my-panel-no-border',
        defaults : {
            style : 'margin:5px 0px 5px 10px',
            labelAlign : 'right'
        },
        layout : {
            type : 'column'
        },
        items : [
            {
                id : 'begintime',
                xtype : 'datefield',
                editable : false,
                format : 'Y/m/d',
                value : new Date(new Date().getFullYear() + '/'
                    + (new Date().getMonth() + 1) + '/' + 1),
                fieldLabel : '时间段选择',
                labelWidth : 70,
                baseCls : 'margin-bottom'
            }, {
                id : 'endtime',
                xtype : 'datefield',
                editable : false,
                format : 'Y/m/d',
                value : new Date(),
                fieldLabel : '至',
                labelWidth : '15px'
            }, {
                id : 'query',
                xtype : 'button',
                icon: imgpath + '/search.png',
                style : ' margin: 5px 0px 0px 10px',
                text : '查询',
                width : 80,
                handler : queryGrid
            },
            {
                xtype: 'button',
                text: '导出excel',
                style: ' margin: 5px 0px 5px 5px',
                icon: imgpath + '/excel.gif',
                width: 100,
                listeners: {
                    click: OnClickExcelButton
                }
            }]
    });

    Ext.define('gridModel', {
        extend : 'Ext.data.Model',
        fields : [ {
            name : 'V_DEPTNAME',
            type : 'String'
        }, {
            name : 'WR_OK',
            type : 'float'
        }, {
            name : 'WR_TOTAL',
            type : 'float'
        }, {
            name : 'RATE',
            type : 'float'
        } ]
    });

    Ext.create('Ext.container.Viewport', {
        id : "id",
        layout : 'border',
        items : [ searchPanel, grid ]
    });
    queryGrid();

    Ext.data.StoreManager.lookup('gridStore').on('load', function() {
        GridSum(grid);
    });
});
function receiveCenter(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:center;";
    return "<a href=javascript:openReceive()>"
        + (parseFloat(value) - parseFloat(record.data.WR_OK)) + "</a>";
}
function atCenter(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:center;";
    return value;
}
function aleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
function rateCenter(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:center;";
    return value + '%';
}
function atRateCenter(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:center;";
    var result = parseFloat(record.data.WR_TOTAL) == 0 ? 0
        : parseFloat(record.data.WR_OK) / parseFloat(record.data.WR_TOTAL);
    return result;
}
function openReceive() {
    if (main) {
       window.parent.parent.append('4116', '检修工单查询（多条件）', AppUrl+ 'page/No4116/Index.html');
       //  window.open(AppUrl+ 'page/No4116/Index.html');
    } else {
       // window.parent.append('4116', '检修工单查询（多条件）', AppUrl+ 'page/No4116/Index.html');
       window.open(AppUrl+ 'page/No4116/Index.html');
    }
}

function queryGrid() {
    Ext.data.StoreManager.lookup('gridStore').load(
            {
                params : {
                    V_D_ENTER_DATE_B:Ext.Date.format(Ext.getCmp("begintime").getValue(), 'Y/m/d'),
                    V_D_ENTER_DATE_E:Ext.Date.format(Ext.getCmp("endtime").getValue(), 'Y/m/d'),
                    V_V_ORGCODE:Ext.util.Cookies.get('v_orgCode')
                }
            });
}

function GridSum(grid) {
    var ysSum = 0;
    var gdzsSum = 0;
    grid.store.each(function(record, index) {
        ysSum += Number(record.data.WR_OK);
        gdzsSum += Number(record.data.WR_TOTAL);
    });

    var n = grid.getStore().getCount();// 获得总行数

    var ins_rec = Ext.create('gridModel', {
        V_DEPTNAME : '合计',
        WR_OK : ysSum,
        WR_TOTAL : gdzsSum,
        // RATE : gdzsSum == 0 ? 0 : Math.round(ysSum / gdzsSum * 100) / 100
        RATE : gdzsSum == 0 ? 0 : Math.round(ysSum / gdzsSum * 100)
    });
    grid.store.insert(n, ins_rec);

}

function OnClickExcelButton(){

    document.location.href = AppUrl +'excel/GDZXQK_EXCEL?V_D_ENTER_DATE_B='+ Ext.Date.format(Ext.getCmp("begintime").getValue(), 'Y-m-d') +
        '&V_D_ENTER_DATE_E='+ Ext.Date.format(Ext.getCmp("endtime").getValue(), 'Y-m-d') +
        '&V_V_ORGCODE=' + Ext.util.Cookies.get('v_orgCode');

}