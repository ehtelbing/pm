var plantStoreLoad = false;
var equTypeStoreLoad = false;
var A_PLANTCODE = "";
var A_DEPARTCODE = '';
var A_EQUTYPE = '';
var A_EQUIP_NO = '';
var A_PART_NO = '';
var A_BEGINDATE = '';
var A_ENDDATE = '';

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

    var equTypeStore = Ext.create('Ext.data.Store', {
        storeId: 'equTypeStore',
        autoLoad: true,
        pageSize: -1,
        fields: ['TYPE_CODE', 'TYPE_DESC'],
        proxy: {
            url: AppUrl + 'mwd/GET_EQU_TYPE_LIST_ABLE',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'RET'
            }
        },
        listeners: {
            load: function (store, records) {
                equTypeStoreLoad = true;
                store.insert(0, {
                    'TYPE_CODE': '%',
                    'TYPE_DESC': '全部'
                });
                Ext.getCmp('A_EQUTYPE').select(store.first());
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

    var equStore = Ext.create('Ext.data.Store', {
        storeId: 'equStore',
        autoLoad: false,
        pageSize: -1,
        fields: ['EQUIP_NO', 'EQUIP_DESC'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            url: AppUrl + 'mwd/GET_EQU_LIST',
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
        }),
        listeners: {
            load: function (store, records) {
                /*store.insert(0, {
                    'EQUIP_NO': '%',
                    'EQUIP_DESC': '全部'
                });*/
                Ext.getCmp('A_EQUIP_NO').select(store.first());
            }
        }
    });

    var partStore = Ext.create('Ext.data.Store', {
        storeId: 'partStore',
        autoLoad: false,
        pageSize: -1,
        fields: ['PART_NO', 'PART_DESC'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            url: AppUrl + 'mwd/GET_PART_LIST',
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
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('A_PART_NO').select(store.first());
            }
        }
    });

    var equPartDrawStore = Ext.create('Ext.data.Store', {
        storeId: 'equPartDrawStore',
        autoLoad: false,
        pageSize: 100,
        fields: ['INST_EQUIP_CODE', 'INST_EQUIP_NAME', 'USE_AMOUNT'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            url: AppUrl + 'mwd/GET_EQU_PART_DRAW',
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
        })
    });

    var equPartDrawChart = Ext.create('Ext.chart.Chart', {
        id: 'equPartDrawChart',
        store: equPartDrawStore,
        title: '年预算分解情况',
        frame: true,
        animate: true,
        shadow: true,
        axes: [{
            type: 'Numeric',//Numeric轴来展示区域序列数据
            position: 'left',//numeric轴放在图表左侧
            fields: ['USE_AMOUNT'],
            title: '消耗量',
            label: {
                renderer: Ext.util.Format.numberRenderer('0,0')
            },
            grid: true,//category和numeric轴都有grid集合,水平线和垂直线会覆盖图表的背景
            minimum: 0
        }, {
            type: 'Category',//Category轴来显示数据节点的名字
            position: 'bottom',//category轴放在图表下部
            fields: ['INST_EQUIP_NAME'],
            title: '部位油品消耗情况',
            minimum: 1
        }],
        series: [{
            type: 'column',//显示图形类型- line：则线图；column：柱形图；radar：雷达图
            axis: 'left',
            highlight: true,//如果设置为真，当鼠标移动到上面时，高亮。
            //style: { width: 40 },//设置柱状宽度大小
            tips: {//为可视化标记添加工具栏
                trackMouse: true,
                width: 150,
                height: 25,
                renderer: function (storeItem, item) {
                    this.setTitle(item.value[0] + ': ' + item.value[1]/*Ext.util.Format.numberRenderer(item.value[1])*/);
                }
            },
            label: {
                display: 'insideEnd',//指定饼图标签的位置。包括"rotate", "middle", "insideStart", "insideEnd", "outside", "over", "under", 或者 "none"可以用来渲染标签。
                field: 'USE_AMOUNT',//标签要展示的字段的名称。
                renderer: Ext.util.Format.numberRenderer('0'),
                orientation: 'vertical',//"horizontal" 或者 "vertical"
                color: '#333'
            },
            xField: 'INST_EQUIP_NAME',
            yField: 'USE_AMOUNT'
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
            }, {
                xtype: 'combo',
                id: 'A_EQUTYPE',
                store: equTypeStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '设备类型',
                displayField: 'TYPE_DESC',
                valueField: 'TYPE_CODE',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectEqu();
                    }
                }
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
                xtype: 'combo',
                id: 'A_EQUIP_NO',
                store: equStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '主机名称',
                displayField: 'EQUIP_DESC',
                valueField: 'EQUIP_NO',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectPart();
                    }
                }
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'combo',
                id: 'A_PART_NO',
                store: partStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '选择部位',
                displayField: 'PART_DESC',
                valueField: 'PART_NO',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '查询',
                align: 'center',
                handler: _selectEquPartDraw,
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
            items: [equPartDrawChart]
        }]
    });

    _init();
});

function _init() {
    if (plantStoreLoad && equTypeStoreLoad) {

        //_selectEquPartDraw();
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

function _selectEqu() {
    var equStore = Ext.data.StoreManager.lookup('equStore');
    equStore.proxy.extraParams = {
        A_EQUTYPE: Ext.getCmp('A_EQUTYPE').getValue()
    };
    equStore.load();

}

function _selectPart() {
    var partStore = Ext.data.StoreManager.lookup('partStore');
    partStore.proxy.extraParams = {
        'A_EQUIP_NO': Ext.getCmp('A_EQUIP_NO').getValue(),
        'A_MAT_NO': '%'
    };

    partStore.load();
}

function _selectEquPartDraw() {
    A_PLANTCODE = Ext.getCmp('A_PLANTCODE').getValue();
    A_DEPARTCODE = Ext.getCmp('A_DEPARTCODE').getValue();
    A_EQUTYPE = Ext.getCmp('A_EQUTYPE').getValue();
    A_EQUIP_NO = Ext.getCmp('A_EQUIP_NO').getValue();
    A_PART_NO = Ext.getCmp('A_PART_NO').getValue();
    A_BEGINDATE = Ext.getCmp('A_BEGINDATE').getSubmitValue();
    A_ENDDATE = Ext.getCmp('A_ENDDATE').getSubmitValue();

    var equPartDrawStore = Ext.data.StoreManager.lookup('equPartDrawStore');
    equPartDrawStore.proxy.extraParams = {
        A_PLANTCODE: A_PLANTCODE,
        A_DEPARTCODE: A_DEPARTCODE,
        A_EQUTYPE: A_EQUTYPE,
        A_EQUIP_NO: A_EQUIP_NO,
        A_PART_NO: A_PART_NO,
        A_BEGINDATE: A_BEGINDATE,
        A_ENDDATE: A_ENDDATE

    };
    equPartDrawStore.load();
}