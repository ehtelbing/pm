var departStoreLoad = false;
var V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');//作业区编码
Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果

    //作业区
    var departStore = Ext.create('Ext.data.Store', {
        storeId: 'departStore',
        autoLoad: true,
        pageSize: -1,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            url: AppUrl + 'PM_12/PRO_BASE_DEPT_VIEW',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                IS_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                IS_V_DEPTTYPE: '[主体作业区]'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        listeners: {
            load: function (store, records) {
                departStoreLoad = true;
                Ext.getCmp('V_V_DEPTCODE').setValue(V_DEPTCODE);
                //Ext.getCmp('V_V_DEPTCODE').select(store.first());
                _init();
            }
        }
    });

    //设备
    var equStore = Ext.create('Ext.data.Store', {
        storeId: 'equStore',
        autoLoad: false,
        pageSize: -1,
        fields: ['EQU_ID', 'EQU_DESC'],
        proxy: {
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
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('V_V_EQUCODE').select(store.first());
            }
        }
    });

    //位置
    var siteStore = Ext.create('Ext.data.Store', {
        storeId: 'siteStore',
        autoLoad: false,
        pageSize: -1,
        fields: ['SITE_ID', 'SITE_DESC'],
        proxy: {
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
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('V_V_SITE_ID').select(store.first());
            }
        }
    });

    //作业情况
    var workTimeStore = Ext.create('Ext.data.Store', {
        storeId: 'workTimeStore',
        autoLoad: false,
        pageSize: -1,
        fields: ['WORKDATE', 'INSERT_VALUE'],
        proxy: {
            url: AppUrl + 'PM_12/PRO_RUN7118_WORKTIMELIST',
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
        }
    });

    var bjChangeLogStore = Ext.create('Ext.data.Store', {
        storeId: 'bjChangeLogStore',
        autoLoad: false,
        pageSize: 10,
        fields: ['BJ_UNIQUE_CODE', 'CHANGEDATE', 'CHANGE_SITE_DESC', 'CHANGE_EQUNAME', 'DIRECTION', 'REMARK', 'MATERIALNAME', 'UNIT', 'CHANGE_AMOUNT'],
        proxy: {
            url: AppUrl + 'mwd/PRO_RUN_SITE_BJ_CHANGE_LOG_ALL',
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
        store: workTimeStore,
        //title: '作业量统计柱状图',
        width: window.screen.width - 280,
        height: window.screen.height / 3 - 50,
        frame: true,
        animate: true,
        shadow: true,
        axes: [{
            type: 'Numeric',//Numeric轴来展示区域序列数据
            position: 'left',//numeric轴放在图表左侧
            fields: ['INSERT_VALUE'],
            title: '作业量',
            label: {
                renderer: Ext.util.Format.numberRenderer('0,0')
            },
            grid: true,//category和numeric轴都有grid集合,水平线和垂直线会覆盖图表的背景
            minimum: 0
        }, {
            type: 'Category',//Category轴来显示数据节点的名字
            position: 'bottom',//category轴放在图表下部
            fields: ['WORKDATE'],
            title: '日期',
            minimum: 1.
        }],
        series: [{
            type: 'column',//显示图形类型- line：则线图；column：柱形图；radar：雷达图
            axis: 'left',
            highlight: true,//如果设置为真，当鼠标移动到上面时，高亮。
            //style: { width: 60 },//设置柱状宽度大小
            tips: {//为可视化标记添加工具栏
                trackMouse: true,
                width: 180,
                height: 25,
                renderer: function (storeItem, item) {
                    this.setTitle(item.value[0].substring(0, 4) + '-' + item.value[0].substring(4, 6) + '-' + item.value[0].substring(6, 8) + ' 作业量:' + item.value[1]/*Ext.util.Format.numberRenderer(item.value[1])*/);
                }
            },
            //label: {
            //    display: 'insideEnd',//指定饼图标签的位置。包括"rotate", "middle", "insideStart", "insideEnd", "outside", "over", "under", 或者 "none"可以用来渲染标签。
            //    field: 'INSERT_VALUE',//标签要展示的字段的名称。
            //    renderer: Ext.util.Format.numberRenderer('0'),
            //    orientation: 'vertical',//"horizontal" 或者 "vertical"
            //    color: '#333'
            //},
            xField: 'WORKDATE',
            yField: 'INSERT_VALUE'
        }]
    });

    var bjChangeLogGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'bjChangeLogGridPanel',
        //title: '<div align="center">备件更换历史</div>',
        store: bjChangeLogStore,
        frame: true,
        columnLines: true,
        /*selModel: {
         selType: 'checkboxmodel',
         mode: 'SINGLE'
         },*/
        columns: [{
            text: '更换日期',
            dataIndex: 'CHANGEDATE',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '当前备件唯一标识',
            dataIndex: 'BJ_UNIQUE_CODE',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '物资描述',
            dataIndex: 'MATERIALNAME',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '更换方向',
            dataIndex: 'DIRECTION',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '备注',
            dataIndex: 'REMARK',
            align: 'center',
            width: 120,
            renderer: atleft
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
                id: 'V_V_DEPTCODE',
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
                id: 'V_V_EQUCODE',
                store: equStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '选择设备',
                displayField: 'EQU_DESC',
                valueField: 'EQU_ID',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 5px -5px',
                labelAlign: 'right',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectSite();
                    }
                }
            }, {
                xtype: 'combo',
                id: 'V_V_SITE_ID',
                store: siteStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '位置',
                displayField: 'SITE_DESC',
                valueField: 'SITE_ID',
                labelWidth: 80,
                width: 700,
                style: ' margin: 5px 0px 5px -5px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '查询当前作业情况',
                align: 'center',
                //width: 70,
                handler: _selectWorkTime,
                style: ' margin: 5px 0px 5px 5px',
                icon: imgpath + '/search.png'
            }]
        }]
    });

    var partButtonPanel = Ext.create('Ext.Panel', {
        border: false,
        frame: true,
        region: 'north',
        //title: '<div align="center"></div>',
        width: '100%',
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'V_BEGINDATE',
                xtype: 'datefield',
                editable: false,
                format: 'Y-m-d',
                submitFormat: 'Ymd',
                value: new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate()),
                fieldLabel: '起始日期',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 5px -10px',
                labelAlign: 'right'
            }, {
                id: 'V_ENDDATE',
                xtype: 'datefield',
                editable: false,
                format: 'Y-m-d',
                submitFormat: 'Ymd',
                value: new Date(),
                fieldLabel: '结束日期',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 5px -5px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '查询更换情况',
                align: 'center',
                //width: 70,
                handler: _selectBJChangeLog,
                style: ' margin: 5px 0px 5px 5px',
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
            items: [buttonPanel, oilPriceDrawChart, partButtonPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [bjChangeLogGridPanel]
        }]
    });

    _init();
});

function _init() {
    if (departStoreLoad) {

        //_selectEquList();
        Ext.getBody().unmask();//去除页面笼罩
    }

}

function _selectEqu() {
    var equStore = Ext.data.StoreManager.lookup('equStore');
    equStore.proxy.extraParams = {
        'V_V_PLANTCODE': Ext.util.Cookies.get('v_orgCode'),
        'V_V_DEPTCODE': Ext.getCmp('V_V_DEPTCODE').getValue()
    };

    equStore.load();
}

function _selectSite() {
    var siteStore = Ext.data.StoreManager.lookup('siteStore');
    siteStore.proxy.extraParams = {
        'A_EQU_ID': Ext.getCmp('V_V_EQUCODE').getValue()
    };

    siteStore.load();
}

function _selectWorkTime() {
    var workTimeStore = Ext.data.StoreManager.lookup('workTimeStore');
    workTimeStore.proxy.extraParams = {
        V_V_SITE_ID: Ext.getCmp('V_V_SITE_ID').getValue()
    };
    workTimeStore.load();
}

function _selectBJChangeLog() {
    var bjChangeLogStore = Ext.data.StoreManager.lookup('bjChangeLogStore');
    bjChangeLogStore.proxy.extraParams = {
        'V_SITE_ID': Ext.getCmp('V_V_SITE_ID').getValue(),
        'V_BEGINDATE': Ext.getCmp('V_BEGINDATE').getSubmitValue(),
        'V_ENDDATE': Ext.getCmp('V_ENDDATE').getSubmitValue()
    };
    bjChangeLogStore.load();
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}