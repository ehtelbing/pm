var plantStoreLoad = false;

Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果

    var plantStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'plantStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/plant_sel',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                IS_V_DEPTCODE: "",
                IS_V_DEPTTYPE: '[基层单位]'
            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('A_PLANTCODE').select(store.first());
                plantStoreLoad = true;
                _init();
            }
        }
    });

    var departStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'departStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/plant_sel',
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
                Ext.getCmp('A_DEPARTCODE').select(store.first());
            }
        }
    });

    var oilPriceDrawStore = Ext.create('Ext.data.Store', {
        storeId: 'oilPriceDrawStore',
        autoLoad: false,
        pageSize: 100,
        fields: ['PRICE_DESC', 'OIL_AMOUNT'],
        proxy: {
            url: AppUrl + 'mwd/GET_OIL_PRICE_DRAW',
            async: false,
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'RET'
            }
        }
    });

    var oilPriceDrawChart = Ext.create('Ext.chart.Chart', {
        id: 'oilPriceDrawChart',
        store: oilPriceDrawStore,
        //title: '年预算分解情况',
        frame: true,
        animate: true,
        shadow: true,
        axes: [{
            type: 'Numeric',//Numeric轴来展示区域序列数据
            position: 'left',//numeric轴放在图表左侧
            fields: ['OIL_AMOUNT'],
            title: '消耗量',
            label: {
                renderer: Ext.util.Format.numberRenderer('0,0')
            },
            grid: true,//category和numeric轴都有grid集合,水平线和垂直线会覆盖图表的背景
            minimum: 0
        }, {
            type: 'Category',//Category轴来显示数据节点的名字
            position: 'bottom',//category轴放在图表下部
            fields: ['PRICE_DESC'],
            title: '油品单价消耗情况',
            minimum: 1
        }],
        series: [{
            type: 'column',//显示图形类型- line：则线图；column：柱形图；radar：雷达图
            axis: 'left',
            highlight: true,//如果设置为真，当鼠标移动到上面时，高亮。
            style: { width: 60 },//设置柱状宽度大小
            tips: {//为可视化标记添加工具栏
                trackMouse: true,
                width: 120,
                height: 25,
                renderer: function (storeItem, item) {
                    this.setTitle(item.value[0] + ': ' + item.value[1]/*Ext.util.Format.numberRenderer(item.value[1])*/);
                }
            },
            label: {
                display: 'insideEnd',//指定饼图标签的位置。包括"rotate", "middle", "insideStart", "insideEnd", "outside", "over", "under", 或者 "none"可以用来渲染标签。
                field: 'OIL_AMOUNT',//标签要展示的字段的名称。
                renderer: Ext.util.Format.numberRenderer('0'),
                orientation: 'vertical',//"horizontal" 或者 "vertical"
                color: '#333'
            },
            xField: 'PRICE_DESC',
            yField: 'OIL_AMOUNT'
        }]
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        border: false,
        frame: true,
        region: 'north',
        //title: '<div align="center"></div>',
        width: '100%',
        //height: 50,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'combo',
                id: 'A_PLANTCODE',
                store: plantStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '厂矿名称',
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectDepart();
                    }
                }
            }, {
                xtype: 'combo',
                id: 'A_DEPARTCODE',
                store: departStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '部门名称',
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 5px',
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
                format: 'Y-m-d',
                value : new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                fieldLabel: '起始日期',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                id: 'A_ENDDATE',
                xtype: 'datefield',
                editable: false,
                format: 'Y-m-d',
                value: new Date(),
                fieldLabel: '结束日期',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '查询',
                align: 'center',
                handler: _selectOilPriceDraw,
                width: 80,
                style: ' margin: 5px 5px 5px 30px',
                icon: imgpath + '/search.png'
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
            region: 'north',
            border: false,
            items: [buttonPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [oilPriceDrawChart]
        }]
    });

    _init();
});

function _init() {
    if (plantStoreLoad) {

        Ext.getBody().unmask();//去除页面笼罩
    }

}

function _selectDepart() {
    var departStore = Ext.data.StoreManager.lookup('departStore');
    departStore.proxy.extraParams = {
        IS_V_DEPTCODE: Ext.getCmp('A_PLANTCODE').getValue(),
        IS_V_DEPTTYPE: '[主体作业区]'
    };
    departStore.load();

}

function _selectOilPriceDraw() {

    var oilPriceDrawStore = Ext.data.StoreManager.lookup('oilPriceDrawStore');
    oilPriceDrawStore.proxy.extraParams = {
        A_PLANTCODE: Ext.getCmp('A_PLANTCODE').getValue(),
        A_DEPARTCODE: Ext.getCmp('A_DEPARTCODE').getValue(),
        A_BEGINDATE: Ext.getCmp('A_BEGINDATE').getSubmitValue(),
        A_ENDDATE: Ext.getCmp('A_ENDDATE').getSubmitValue()

    };
    oilPriceDrawStore.load();
}