var departStoreLoad = false;
var cycleStoreLoad = false;

Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果

    //作业区
    var departStore = Ext.create('Ext.data.Store', {
        storeId: 'departStore',
        autoLoad: true,
        //pageSize: -1,
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
                Ext.getCmp('A_DEPTCODE').select(store.first());
                _init();
            }
        }
    });

    //设备
    var equStore = Ext.create('Ext.data.Store', {
        storeId: 'equStore',
        autoLoad: false,
        //pageSize: -1,
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
                Ext.getCmp('A_EQUID').select(store.first());
            }
        }
    });

    //周期类型
    var cycleStore = Ext.create('Ext.data.Store', {
        storeId: 'cycleStore',
        autoLoad: true,
        //pageSize: -1,
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
                Ext.getCmp('A_CYCLE_ID').select(store.first());
                _init();
            }
        }
    });

    //var equBJAlertStore = Ext.create('Ext.data.JsonStore', {
    //    id: 'equBJAlertStore',
    //    fields: ['name', '报警值', '作业量']
    //
    //});
    var equBJAlertStore = Ext.create('Ext.data.Store', {
        storeId: 'equBJAlertStore',
        autoLoad: false,
        pageSize: -1,
        fields: ['SITE_DESC', 'ALERT_VALUE', 'SUM_YEILD'],
        proxy: {
            url: AppUrl + 'PM_12/PRO_RUN_EQU_BJ_ALERT_ALL',
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
    var chart = Ext.create('Ext.chart.Chart', {
        style: 'background:#fff',
        animate: true,
        shadow: true,
        store: equBJAlertStore,
        region: 'center',
        legend: {
            position: 'right'
        },
        axes: [{
            /** x轴 */
            type: 'Numeric',//Numeric轴来展示区域序列数据
            position: 'bottom',//Numeric轴放在图表下部
            fields: ['ALERT_VALUE', 'SUM_YEILD'],
            minimum: 0,
            label: {
                renderer: Ext.util.Format.numberRenderer('0,0')
            },
            grid: true,
            title: '作业量'//category和numeric轴都有grid集合,水平线和垂直线会覆盖图表的背景
        }, {
            /** 左侧分类 - y轴 */
            type: 'Category',
            position: 'left',//category轴放在图表左部
            fields: ['SITE_DESC'],
            title: ''
        }],
        series: [{
            type: 'bar',
            axis: 'bottom',
            highlight: true,//如果设置为真，当鼠标移动到上面时，高亮。
            //style: { width: 60 },//设置柱状宽度大小
            tips: {//为可视化标记添加工具栏
                trackMouse: true,
                width: 130,
                height: 25,
                renderer: function (storeItem, item) {
                    this.setTitle(item.yField + ': ' + item.value[1]);
                }
            },
            label: {
                display: 'insideEnd',//指定饼图标签的位置。包括"rotate", "middle", "insideStart", "insideEnd", "outside", "over", "under", 或者 "none"可以用来渲染标签。
                fields: ['ALERT_VALUE', 'SUM_YEILD'],//标签要展示的字段的名称。
                renderer: Ext.util.Format.numberRenderer('0'),
                orientation: 'vertical',//"horizontal" 或者 "vertical"
                color: '#444'
            },
            xField: 'SITE_DESC',
            yField:  ['ALERT_VALUE', 'SUM_YEILD'],
            title: ['报警值', '作业量']
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
                id: 'A_DEPTCODE',
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
                id: 'A_EQUID',
                store: equStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '选择设备',
                displayField: 'EQU_DESC',
                valueField: 'EQU_ID',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 5px -5px',
                labelAlign: 'right'
            }, {
                xtype: 'combo',
                id: 'A_CYCLE_ID',
                store: cycleStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '周期类型',
                displayField: 'CYCLE_DESC',
                valueField: 'CYCLE_ID',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 5px -5px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '查询',
                align: 'center',
                handler: _selectEquBJAlert,
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
            items: [chart]
        }]
    });

    _init();
});

function _init() {
    if (departStoreLoad && cycleStoreLoad) {

        Ext.getBody().unmask();//去除页面笼罩
    }

}

function _selectEqu() {
    var equStore = Ext.data.StoreManager.lookup('equStore');
    equStore.proxy.extraParams = {
        'V_V_PLANTCODE': Ext.util.Cookies.get('v_orgCode'),
        'V_V_DEPTCODE': Ext.getCmp('A_DEPTCODE').getValue()
    };

    equStore.load();
}

function _selectEquBJAlert() {
    var equBJAlertStore = Ext.data.StoreManager.lookup('equBJAlertStore');
    equBJAlertStore.proxy.extraParams = {
        A_EQUID: Ext.getCmp('A_EQUID').getValue(),
        A_CYCLE_ID: Ext.getCmp('A_CYCLE_ID').getValue()
    };

    equBJAlertStore.load();
    //Ext.Ajax.request({
    //    url: AppUrl + 'PM_12/PRO_RUN_EQU_BJ_ALERT_ALL',
    //    type: 'ajax',
    //    method: 'POST',
    //    params: {
    //        A_EQUID: Ext.getCmp('A_EQUID').getValue(),
    //        A_CYCLE_ID: Ext.getCmp('A_CYCLE_ID').getValue()
    //    },
    //    success: function (response) {
    //        var resp = Ext.decode(response.responseText);//后台返回的值
    //        var data = [];
    //        Ext.Array.each(resp.list,
    //            function (name, index, countriesItSelf) {
    //                data.push({
    //                    name: name.SITE_DESC,
    //                    报警值: name.ALERT_VALUE,
    //                    作业量: name.SUM_YEILD
    //                })
    //            });
    //        Ext.data.StoreManager.lookup('equBJAlertStore').loadData(data);
    //
    //    },
    //    failure: function (response) {//访问到后台时执行的方法。
    //        Ext.MessageBox.show({
    //            title: '错误',
    //            msg: response.responseText,
    //            buttons: Ext.MessageBox.OK,
    //            icon: Ext.MessageBox.ERROR
    //        })
    //    }
    //
    //});

}