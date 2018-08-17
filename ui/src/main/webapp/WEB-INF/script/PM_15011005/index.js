var A_PLANTCODE = Ext.util.Cookies.get('v_orgCode');
var DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var A_BEGINDATE = '';
var A_ENDDATE = '';
var A_ITYPE = '';
var A_DEPARTCODE = '';
var A_MATERIALCODE = '';
var A_MATERIALNAME = '';

var deptStoreLoad = false;
var matTypeStoreLoad = false;

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
                'IS_V_DEPTCODE': A_PLANTCODE,
                'IS_V_DEPTTYPE': '[主体作业区]'
            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('bm').setValue(DEPTCODE);
                deptStoreLoad = true;

                _init();
            }
        }
    });

    //物资分类Store
    var matTypeStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'matTypeStore',
        fields: ['CODE', 'NAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/PRO_MM_ITYPE',
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
                    'CODE': '%',
                    'NAME': '全部'
                });
                matTypeStoreLoad = true;
                Ext.getCmp('wzfl').select(store.first());
                _init();
            }
        }
    });

    //收发存统计Store
    var totalStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'totalStore',
        pageSize: -1,
        fields: ['MATERIALCODE', 'MATERIALNAME', 'ETALON', 'UNIT', 'F_PRICE', 'QC_AMOUNT', 'QC_MONEY', 'IN_AMOUNT',
            'IN_MONEY', 'OUT_AMOUNT', 'OUT_MONEY', 'QM_AMOUNT', 'QM_MONEY'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/GETSFC',//PG_DJ1005.GETSFC
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
                // totalProperty: 'total'
            },
            extraParams: {}
        }
    });

    //菜单面板
    var tablePanel = Ext.create("Ext.panel.Panel", {
        region: 'north',
        frame: true,
        //baseCls : 'my-panel-noborder',
        layout: 'vbox',
        width: '100%',
        style: 'margin:5px 0px 5px 5px',
        items: [{
            xtype: 'panel',
            //frame: true,
            width: "100%",
            baseCls: 'my-panel-noborder',
            layout: 'hbox',
            items: [{
                id: 'beginDate',
                xtype: 'datefield',
                editable: false,
                format: 'Y/m/d',
                submitFormat: 'Y-m-d',
                value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),//每月的第一天
                fieldLabel: '起始日期',
                labelWidth: 90,
                width: 240,
                style: 'margin:5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                id: 'endDate',
                xtype: 'datefield',
                editable: false,
                format: 'Y/m/d',
                submitFormat: 'Y-m-d',
                value: Ext.util.Format.date(new Date(new Date(new Date().getUTCFullYear(), new Date().getMonth() + 1, 1) - 86400000), "Y-m-d"),
                fieldLabel: '结束日期',
                labelWidth: 90,
                width: 240,
                style: 'margin:5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'combo',
                id: 'bm',
                fieldLabel: '部门',
                labelAlign: 'right',
                editable: false,
                style: 'margin:5px 0px 5px 5px',
                labelWidth: 90,
                width: 240,
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                store: deptStore
            }]
        }, {
            xtype: 'panel',
            //frame: true,
            layout: 'hbox',
            width: "100%",
            baseCls: 'my-panel-noborder',
            items: [{
                xtype: 'combo',
                id: 'wzfl',
                fieldLabel: '物资分类',
                labelAlign: 'right',
                editable: false,
                style: 'margin:5px 0px 5px 5px',
                labelWidth: 90,
                width: 240,
                queryMode: 'local',
                valueField: 'CODE',
                displayField: 'NAME',
                store: matTypeStore
            }, {
                xtype: 'textfield',
                id: 'wzbh',
                fieldLabel: '物资编号',
                labelWidth: 90,
                width: 240,
                style: 'margin:5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'wzmc',
                fieldLabel: '物资名称',
                labelWidth: 90,
                width: 240,
                style: 'margin:5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            //frame: true,
            layout: 'hbox',
            width: "100%",
            baseCls: 'my-panel-noborder',
            items: [{
                xtype: 'button',
                text: '查询',
                style: 'margin:5px 0px 5px 40px',
                icon: imgpath + '/search.png',
                handler: _select
            }, {
                xtype: 'button',
                text: '导出Excel',
                style: 'margin:5px 0px 5px 10px',
                handler: _exportExcel,
                icon: imgpath + '/excel.gif'
            }]
        }]
    });

// 显示面板
    var gridPanel = Ext.create('Ext.grid.Panel', {
        frame: true,
        id: 'gridPanel',
        columnLines: true,
        autoScroll: true,
        features: [{
            ftype: 'summary'
        }],
        store: totalStore,
        columns: [
            {
                text: '序号',
                xtype: 'rownumberer',
                width: 40,
                align: 'center'
            }, {
                text: '物资编号',
                align: 'center',
                dataIndex: 'MATERIALCODE',
                width: 120,
                renderer: atright
            },
            {
                text: '物资名称',
                dataIndex: 'MATERIALNAME',
                align: 'center',
                width: 120,
                renderer: atleft,
                summaryRenderer: function (value, metadata) {
                    metadata.style = "text-align:left";
                    return '合计：';
                }
            },
            {
                text: '规格',
                align: 'center',
                dataIndex: 'ETALON',
                width: 80,
                renderer: atleft
            },
            {
                text: '单位',
                align: 'center',
                dataIndex: 'UNIT',
                width: 80,
                renderer: atleft
            },
            {
                text: '单价',
                align: 'center',
                dataIndex: 'F_PRICE',
                width: 80,
                renderer: _summary
            }, {
                text: '期初数量',
                align: 'center',
                dataIndex: 'QC_AMOUNT',
                width: 80,
                renderer: atright,
                summaryType: 'sum'// 求和
            }, {
                text: '期初金额',
                align: 'center',
                dataIndex: 'QC_MONEY',
                width: 120,
                renderer: atright,
                summaryType: 'sum',// 求和
                summaryRenderer: _summary
            }, {
                text: '收入数量',
                align: 'center',
                dataIndex: 'IN_AMOUNT',
                width: 80,
                renderer: atright,
                summaryType: 'sum'// 求和
            }, {
                text: '收入金额',
                align: 'center',
                dataIndex: 'IN_MONEY',
                width: 120,
                renderer: atright,
                summaryType: 'sum',// 求和
                summaryRenderer: _summary
            }, {
                text: '支出数量',
                align: 'center',
                dataIndex: 'OUT_AMOUNT',
                width: 80,
                renderer: atright,
                summaryType: 'sum'// 求和
            }, {
                text: '支出金额',
                align: 'center',
                dataIndex: 'OUT_MONEY',
                width: 120,
                renderer: atright,
                summaryType: 'sum',// 求和
                summaryRenderer: _summary
            }, {
                text: '期末数量',
                align: 'center',
                dataIndex: 'QM_AMOUNT',
                width: 80,
                renderer: atright,
                summaryType: 'sum'// 求和
            }, {
                text: '期末金额',
                align: 'center',
                dataIndex: 'QM_MONEY',
                width: 120,
                renderer: atright,
                summaryType: 'sum',// 求和
                summaryRenderer: _summary
            }]/*,
         bbar: [{
         id: 'gpage',
         xtype: 'pagingtoolbar',
         dock: 'bottom',
         width: '100%',
         displayInfo: true,
         displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
         emptyMsg: '没有记录',
         store: totalStore
         }]*/
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
            items: [gridPanel]
        }]
    });

    _init();

});

//初始化
function _init() {

    if (deptStoreLoad && matTypeStoreLoad) {
        Ext.getBody().unmask();//去除页面笼罩
    }
    _select();
}

//查询库存
function _select() {
    A_BEGINDATE = Ext.getCmp('beginDate').getSubmitValue();
    A_ENDDATE = Ext.getCmp('endDate').getSubmitValue();
    A_DEPARTCODE = Ext.getCmp('bm').getValue();
    A_ITYPE = Ext.getCmp('wzfl').getValue();
    A_MATERIALCODE = Ext.getCmp('wzbh').getValue();
    A_MATERIALNAME = Ext.getCmp('wzmc').getValue();
    var totalStore = Ext.data.StoreManager.lookup('totalStore');
    totalStore.proxy.extraParams = {
        'A_BEGINDATE': A_BEGINDATE,
        'A_ENDDATE': A_ENDDATE,
        'A_PLANTCODE': A_PLANTCODE,
        'A_DEPARTCODE': A_DEPARTCODE,
        'A_ITYPE': A_ITYPE,
        'A_CODE': A_MATERIALCODE,
        'A_NAME': A_MATERIALNAME
    };
    totalStore.load();
}

//导出Excel
function _exportExcel() {
    document.location.href = AppUrl + 'ml/GETSFC_EXCEL?A_BEGINDATE=' + A_BEGINDATE +
    '&A_ENDDATE=' + A_ENDDATE + '&A_PLANTCODE=' + A_PLANTCODE +
    '&A_DEPARTCODE=' + encodeURI(encodeURI(A_DEPARTCODE)) + '&A_ITYPE=' + encodeURI(encodeURI(A_ITYPE)) +
    '&A_CODE=' + A_MATERIALCODE + '&A_NAME=' + A_MATERIALNAME;
}

//时间格式
function rendererTime(value, metaData) {
    metaData.style = "text-align:left";
    return '<div data-qtip="' + value.split('.0')[0] + '" >' + value.split('.0')[0] + '</div>';
    //  return '<div data-qtip="' + value.substring(0, 10) + '" >' + value.substring(0, 10) + '</div>';
}

//数字格式
function _summary(value, metadata) {
    metadata.style = "text-align:right";
    return Ext.util.Format.number(value, '0,000.00');// 把数字value转换成‘o,ooo.oo’格式
}

/*//货币符号
 function _money(value, metadata) {
 metadata.style = "text-align:right";
 return Ext.util.Format.usMoney(value);
 }*/
function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}
