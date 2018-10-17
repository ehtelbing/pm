var V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');//作业区编码
var plantStoreLoad = false;
var cycleStoreLoad = false;

Ext.define('Ext.ux.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    async: true,
    doRequest: function (operation, callback, scope) {
        var writer = this.getWriter(),
            request = this.buildRequest(operation);
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        Ext.apply(request, {
            async: this.async,
            binary: this.binary,
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, callback, scope),
            method: this.getMethod(request),
            disableCaching: false
        });
        Ext.Ajax.request(request);
        return request;
    }
});

Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果

    var plantStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'plantStore',
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
                IS_V_DEPTCODE: "",
                IS_V_DEPTTYPE: '[基层单位]'
            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('V_PLANTCODE').select(store.first());
                plantStoreLoad = true;
                _init();
            }
        }
    });

    //作业区
    var departStore = Ext.create('Ext.data.Store', {
        storeId: 'departStore',
        autoLoad: false,
        pageSize: -1,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            url: AppUrl + 'PM_12/PRO_BASE_DEPT_VIEW',
            type: 'ajax',
            async: false,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list'
            }
        }),
        listeners: {
            load: function (store, records) {
                //Ext.getCmp('V_DEPARTCODE').select(store.first());
                Ext.getCmp('V_DEPARTCODE').setValue(V_DEPTCODE);
            }
        }
    });

    //设备
    var equStore = Ext.create('Ext.data.Store', {
        storeId: 'equStore',
        autoLoad: false,
        pageSize: -1,
        fields: ['EQU_ID', 'EQU_DESC'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            url: AppUrl + 'PM_12/PRO_RUN7111_EQULIST',
            async: false,
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list'
            }
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('V_EQU_ID').select(store.first());
            }
        }
    });

    //位置
    var siteStore = Ext.create('Ext.data.Store', {
        storeId: 'siteStore',
        autoLoad: false,
        pageSize: -1,
        fields: ['SITE_ID', 'SITE_DESC'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            url: AppUrl + 'PM_12/PRO_RUN_SITE_ALL',
            async: false,
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list'
            }
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('V_SITE_ID').select(store.first());
            }
        }
    });

    //周期类型
    var cycleStore = Ext.create('Ext.data.Store', {
        storeId: 'cycleStore',
        autoLoad: true,
        pageSize: -1,
        fields: ['CYCLE_ID', 'CYCLE_DESC'],
        proxy: {
            url: AppUrl + 'PM_12/PRO_RUN_CYCLE_ABLE',
            async: false,
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        listeners: {
            load: function (store, records) {
                cycleStoreLoad = true;
                Ext.getCmp('V_CYCLE_ID').select(store.first());
                _init();
            }
        }
    });

    var chartStore = Ext.create('Ext.data.Store', {
        storeId : 'chartStore',
        autoLoad : false,
        fields : [ 'SUPPLY_NAME', 'AVG_WORK_TIEM' ],
        proxy : {
            url : AppUrl + 'PM_12/PRO_RUN7131_SUPPLYBJAVG',
            async : false,
            type : 'ajax',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            }
        }
    });

    var supplyChart = Ext.create('Ext.chart.Chart', {
        id: 'supplyChart',
        store: chartStore,
        //title: '年预算分解情况',
        frame: true,
        animate: true,
        shadow: true,
        axes: [{
            type: 'Numeric',//Numeric轴来展示区域序列数据
            position: 'left',//numeric轴放在图表左侧
            fields: ['AVG_WORK_TIEM'],
            title: '平均作业量',
            label: {
                renderer: Ext.util.Format.numberRenderer('0,0')
            },
            grid: true,//category和numeric轴都有grid集合,水平线和垂直线会覆盖图表的背景
            minimum: 0
        }, {
            type: 'Category',//Category轴来显示数据节点的名字
            position: 'bottom',//category轴放在图表下部
            fields: ['SUPPLY_NAME'],
            title: '供应商备件平均寿命对比统计',
            minimum: 1
        }],
        series: [{
            type: 'column',//显示图形类型- line：则线图；column：柱形图；radar：雷达图
            axis: 'left',
            highlight: true,//如果设置为真，当鼠标移动到上面时，高亮。
            //style: { width: 60 },//设置柱状宽度大小
            tips: {//为可视化标记添加工具栏
                trackMouse: true,
                width: 160,
                height: 25,
                renderer: function (storeItem, item) {
                    this.setTitle(item.value[0] + ': ' + item.value[1]/*Ext.util.Format.numberRenderer(item.value[1])*/);
                }
            },
            label: {
                display: 'insideEnd',//指定饼图标签的位置。包括"rotate", "middle", "insideStart", "insideEnd", "outside", "over", "under", 或者 "none"可以用来渲染标签。
                field: 'AVG_WORK_TIEM',//标签要展示的字段的名称。
                renderer: Ext.util.Format.numberRenderer('0'),
                orientation: 'vertical',//"horizontal" 或者 "vertical"
                color: '#333'
            },
            xField: 'SUPPLY_NAME',
            yField: 'AVG_WORK_TIEM'
        }]
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        border: false,
        frame: true,
        region: 'north',
        //title: '<div align="center"></div>',
        width: '100%',
        height: 50,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'combo',
                id: 'V_PLANTCODE',
                store: plantStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '厂矿',
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 5px -20px',
                labelAlign: 'right',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectDepart();
                    }
                }
            }, {
                xtype: 'combo',
                id: 'V_DEPARTCODE',
                store: departStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '作业区',
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 5px -15px',
                labelAlign: 'right',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectEqu();
                    }
                }
            }, {
                xtype: 'combo',
                id: 'V_EQU_ID',
                store: equStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '设备',
                displayField: 'EQU_DESC',
                valueField: 'EQU_ID',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 5px -15px',
                labelAlign: 'right',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectSite();
                    }
                }
            }, {
                xtype: 'combo',
                id: 'V_SITE_ID',
                store: siteStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '位置',
                displayField: 'SITE_DESC',
                valueField: 'SITE_ID',
                labelWidth: 80,
                width: 650,
                style: ' margin: 5px 0px 5px -15px',
                labelAlign: 'right'
            }, {
                xtype: 'combo',
                id: 'V_CYCLE_ID',
                store: cycleStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '周期类型',
                displayField: 'CYCLE_DESC',
                valueField: 'CYCLE_ID',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px -15px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '查询',
                align: 'center',
                handler: _selectSupplyChart,
                width: 70,
                style: ' margin: 5px 5px 5px 20px',
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
            items: [supplyChart]
        }]
    });

    _init();
});

function _init() {
    if (plantStoreLoad && cycleStoreLoad) {

        Ext.getBody().unmask();//去除页面笼罩
    }

}

function _selectDepart() {
    var departStore = Ext.data.StoreManager.lookup('departStore');
    departStore.proxy.extraParams = {
        IS_V_DEPTCODE: Ext.getCmp('V_PLANTCODE').getValue(),
        IS_V_DEPTTYPE: '[主体作业区]'
    };
    departStore.load();

}

function _selectEqu() {
    var equStore = Ext.data.StoreManager.lookup('equStore');
    equStore.proxy.extraParams = {
        'V_V_PLANTCODE': Ext.getCmp('V_PLANTCODE').getValue(),
        'V_V_DEPTCODE': Ext.getCmp('V_DEPARTCODE').getValue()
    };

    equStore.load();
}

function _selectSite() {
    var siteStore = Ext.data.StoreManager.lookup('siteStore');
    siteStore.proxy.extraParams = {
        'A_EQU_ID': Ext.getCmp('V_EQU_ID').getValue()
    };

    siteStore.load();
}

function _selectSupplyChart() {

    var chartStore = Ext.data.StoreManager.lookup('chartStore');
    chartStore.proxy.extraParams = {
        V_PLANTCODE: Ext.getCmp('V_PLANTCODE').getValue(),
        V_DEPARTCODE: Ext.getCmp('V_DEPARTCODE').getValue(),
        V_EQU_ID: Ext.getCmp('V_EQU_ID').getValue(),
        V_SITE_ID: Ext.getCmp('V_SITE_ID').getValue(),
        V_CYCLE_ID: Ext.getCmp('V_CYCLE_ID').getValue()

    };
    chartStore.load();
}