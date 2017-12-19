var A_KCID = '';
var detailStoreLoad = false;
if (location.href.split('?')[1] != null) {
    A_KCID = Ext.urlDecode(location.href.split('?')[1]).KCID;
}

Ext.onReady(function () {

    Ext.getBody().mask('<p>正在载入中...</p>');

    //消耗明细Store
    var detailStore = Ext.create('Ext.data.Store', {
        id: 'detailStore',
        autoLoad: true,
        fields: ['MATERIALCODE', 'MATERIALNAME', 'ETALON', 'UNIT', 'F_PRICE', 'PLAN_AMOUNT', 'F_MONEY', 'ORDERID', 'INSERTDATE'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'ml/GETCONSUMEDETAIL',//PG_DJ1002.GETCONSUMEDETAIL

            actionMethods: {
                read: 'POST'
            },

            extraParams: {
                'A_KCID': A_KCID
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        },
        listeners: {
            load: function (store, records) {
                detailStoreLoad = true;
                _init();
            }
        }

    });

    // 显示面板
    var gridPanel = Ext.create('Ext.grid.Panel', {
        frame: true,
        id: 'gridPanel',
        columnLines: true,
        autoScroll: true,
        store: detailStore,
        features : [ {
            ftype : 'summary'
        } ],
        /* selModel: {
         selType: 'checkboxmodel',
         mode: 'SIMPLE'
         },*/
        columns: [
            /*{
             text: '序号',
             xtype: 'rownumberer',
             width: 40,
             align: 'center'
             }, */{
                text: '物资编号',
                align: 'center',
                dataIndex: 'MATERIALCODE',
                width: 150,
                renderer: atright
            },
            {
                text: '物资名称',
                dataIndex: 'MATERIALNAME',
                align: 'center',
                width: 120,
                summaryType: 'sum',//求和
                summaryRenderer: function (value, metadata) {
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
                renderer: atright
            }, {
                text: '数量',
                align: 'center',
                dataIndex: 'PLAN_AMOUNT',
                width: 80,
                summaryType: 'sum',//求和
                summaryRenderer: function (value, metadata) {
                    return '<div >' +Ext.util.Format.number(value, '0,000.00')+ '</div>';
                    //return Ext.util.Format.number(value, '0,000.00');//把数字value转换成‘o,ooo.oo’格式
                }
            }, {
                text: '金额',
                align: 'center',
                dataIndex: 'F_MONEY',
                width: 100,
                summaryType : 'sum',//求和
                summaryRenderer: function (value, metadata) {
                    return '<div >' +Ext.util.Format.number(value, '0,000.00')+ '</div>';
                    //return Ext.util.Format.number(value, '0,000.00');//把数字value转换成‘o,ooo.oo’格式
                }
            }, {
                text: '消耗时间',
                align: 'center',
                dataIndex: 'INSERTDATE',
                width: 150,
                renderer: rendererTime
            }, {
                text: '检修单号',
                align: 'center',
                dataIndex: 'ORDERID',
                width: 120,
                renderer: atright
            }
        ]/*,
         bbar: [{
         id: 'gpage',
         xtype: 'pagingtoolbar',
         dock: 'bottom',
         width: '100%',
         displayInfo: true,
         displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
         emptyMsg: '没有记录',
         store: detailStore
         }]*/
    })


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
            region: 'center',
            layout: 'fit',
            border: false,
            items: [gridPanel]
        }]

    });

    _init();

})

//初始化
function _init() {

    if (detailStoreLoad) {
        Ext.getBody().unmask();//去除页面笼罩
    }
}

function rendererTime(value, metaData) {
    metaData.style = "text-align:left";
    return '<div data-qtip="' + value.split('.0')[0] + '" >' + value.split('.0')[0] + '</div>';
//return '<div data-qtip="' + value.substring(0, 10) + '" >' + value.substring(0, 10) + '</div>';
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
};

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
};
