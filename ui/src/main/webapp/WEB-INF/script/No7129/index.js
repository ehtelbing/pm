var departStoreLoad = false;
var cycleStoreLoad = false;
var BOOLEAN = true;
var BOOLEAN1 = true;
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
                Ext.getCmp('V_DEPARTCODE').select(store.first());
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
                Ext.getCmp('A_EQUID').select(store.first());
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
                Ext.getCmp('A_CYCLE_ID').select(store.first());
                _init();
            }
        }
    });

    //查询
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

    //设备在库备件统计
    var selectKCStore = Ext.create('Ext.data.Store', {
        storeId: 'selectKCStore',
        autoLoad: false,
        pageSize: -1,
        fields: ['KC_ID', 'MATERIALCODE', 'MATERIALNAME', 'UNIT', 'ELATON', 'F_PRICE', 'KCAMOUNT', 'KC_MONEY',
            'PLANTCODE', 'PLANTNAME', 'DEPARTCODE', 'DEPARTNAME', 'STOREID', 'STORENAME', 'INSERTDATE'],
        proxy: {
            url: AppUrl + 'PM_12/PRO_RUN7127_SELECTKC',
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

    //报警信息统计
    var select7115Store = Ext.create('Ext.data.Store', {
        storeId: 'select7115Store',
        autoLoad: false,
        pageSize: -1,
        fields: ['BJ_DESC', 'BJ_UNIQUECODE', 'ALERT_CONTEXT', 'ALERT_STATUS',
            'HANDLE_CONTEXT', 'ALERT_ID', 'HANDLE_USERNAME', 'HANDLE_DATE',
            'INSERTDATE', 'EQU_DESC', 'USERNAME', 'STATUS', 'SITE_DESC',
            'UPDATEPERSON', 'MEND_DEPART', 'MEND_PERSON', 'REMARK',
            'HANDLE_USERID'],
        proxy: {
            url: AppUrl + 'PM_12/PRO_RUN7115_SELECT',
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

    //各位置更换时间统计
    var bjUseAllStore = Ext.create('Ext.data.Store', {
        storeId: 'bjUseAllStore',
        autoLoad: false,
        pageSize: -1,
        fields: ['CHANGEDATE', 'BJ_UNIQUE_CODE',
            'MATERIALCODE', 'MATERIALNAME',
            'UNIT', 'BJ_STATUS', 'EQU_NAME',
            'SITE_DESC', 'DEPARTNAME',
            'SUPPLY_CODE', 'SUPPLY_NAME'],
        proxy: {
            url: AppUrl + 'PM_12/PRO_RUN_BJ_USE_ALL',
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
        id: 'chart',
        //style: 'background:#fff',
        animate: true,
        shadow: true,
        store: equBJAlertStore,
        width: window.screen.width - 280,
        height: window.screen.height / 3 - 50,
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
            grid: true//category和numeric轴都有grid集合,水平线和垂直线会覆盖图表的背景
            //title: 'SUM_YEILD'//category和numeric轴都有grid集合,水平线和垂直线会覆盖图表的背景
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
            //style: { width: 60 },//设置柱状宽度大小,
            tips: {//为可视化标记添加工具栏
                trackMouse: true,
                width: 130,
                height: 25,
                renderer: function (storeItem, item) {
                    if (item.yField == 'ALERT_VALUE') {
                        this.setTitle('报警值: ' + item.value[1]);
                    } else {
                        this.setTitle('作业量: ' + item.value[1]);
                    }
                }
            },
            label: {
                display: 'insideEnd',//指定饼图标签的位置。包括"rotate", "middle", "insideStart", "insideEnd", "outside", "over", "under", 或者 "none"可以用来渲染标签。
                field: ['ALERT_VALUE', 'SUM_YEILD'],//标签要展示的字段的名称。
                renderer: Ext.util.Format.numberRenderer('0'),
                orientation: 'vertical',//"horizontal" 或者 "vertical"
                color: '#444'
            },
            xField: 'SITE_DESC',
            yField: ['ALERT_VALUE', 'SUM_YEILD'],//x与y轴的数据声明
            title: ['报警值', '作业量']
            //此渲染器的存在能够使每条柱子的颜色，与上方声明的颜色数组相同
            /*renderer: function (sprite, storeItem, barAttr, i, store) {
                barAttr.fill = colors[i % 2];
                return barAttr;
                *//*if (BOOLEAN && BOOLEAN1) {
                 alert('两个都开启');
                 barAttr.fill = colors[i % 2];
                 return barAttr;
                 } else {
                 if (BOOLEAN) {
                 alert('报警值:' + colors[0])
                 barAttr.fill = colors[0];
                 return barAttr;
                 } else if (BOOLEAN1) {
                 alert('作业量:' + colors[1]);
                 barAttr.fill = colors[1];
                 return barAttr;
                 }
                 }*//*
            }*/
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
            }, {
                xtype: 'button',
                text: '在用备件VG监控',
                align: 'center',
                handler: _selectEquVGUrl,
                icon: imgpath + '/gears.png',
                width: 120,
                style: {
                    margin: '5px 0px 5px 10px'
                }
            }]
        }]
    });

    var gridPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel1',
        title: '<div align="center">设备在库备件统计</div>',
        store: selectKCStore,
        frame: true,
        columnLines: true,
        /*selModel: {
         selType: 'checkboxmodel',
         mode: 'SINGLE'
         },*/
        columns: [{
            text: '物料号',
            dataIndex: 'MATERIALCODE',
            align: 'center',
            //width: 120,
            flex: 1,
            renderer: atleft
        }, {
            text: '物料描述',
            dataIndex: 'MATERIALNAME',
            align: 'center',
            //width: 120,
            flex: 1,
            renderer: atleft
        }, {
            text: '库存数量',
            dataIndex: 'KCAMOUNT',
            align: 'center',
            //width: 80,
            flex: 1,
            renderer: atleft
        }]
    });

    var gridPanel2 = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel2',
        title: '<div align="center">报警信息统计</div>',
        store: select7115Store,
        frame: true,
        columnLines: true,
        /*selModel: {
         selType: 'checkboxmodel',
         mode: 'SINGLE'
         },*/
        columns: [{
            text: '位置',
            dataIndex: 'SITE_DESC',
            align: 'center',
            //width: 120,
            flex: 1,
            renderer: atleft
        }, {
            text: '备件描述',
            dataIndex: 'BJ_DESC',
            align: 'center',
            //width: 120,
            flex: 1,
            renderer: atleft
        }, {
            text: '报警内容',
            dataIndex: 'ALERT_CONTEXT',
            align: 'center',
            //width: 120,
            flex: 1,
            renderer: atleft
        }]
    });


    var gridPanel3 = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel3',
        title: '<div align="center">各位置更换时间统计</div>',
        store: bjUseAllStore,
        frame: true,
        columnLines: true,
        /*selModel: {
         selType: 'checkboxmodel',
         mode: 'SINGLE'
         },*/
        columns: [{
            text: '设备位置',
            dataIndex: 'SITE_DESC',
            align: 'center',
            //width: 120,
            flex: 1,
            renderer: atleft
        }, {
            text: '物资描述',
            dataIndex: 'MATERIALNAME',
            align: 'center',
            //width: 120,
            flex: 1,
            renderer: atleft
        }, {
            text: '更换时间',
            dataIndex: 'CHANGEDATE',
            align: 'center',
            //width: 120,
            flex: 1,
            renderer: atleft
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
            items: [buttonPanel, chart]
        }, {
            region: 'center',
            border: false,
            layout: {
                type: 'column'
            },
            defaults: {
                columnWidth: 0.333,
                height: window.screen.height / 3
            },
            items: [gridPanel1, gridPanel2, gridPanel3]
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
        'V_V_DEPTCODE': Ext.getCmp('V_DEPARTCODE').getValue()
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

    _selectKC();
    _select7115();
    _selectBJUseAll();
}

function _selectKC() {
    var selectKCStore = Ext.data.StoreManager.lookup('selectKCStore');
    selectKCStore.proxy.extraParams = {
        'V_PLANTCODE': Ext.util.Cookies.get('v_orgCode'),
        'V_DEPARTCODE': Ext.getCmp('V_DEPARTCODE').getValue(),
        'V_EQU_ID': Ext.getCmp('A_EQUID').getValue()
    };

    selectKCStore.load();
}

function _select7115() {
    var select7115Store = Ext.data.StoreManager.lookup('select7115Store');
    select7115Store.proxy.extraParams = {
        'V_V_DEPARTCODE': Ext.getCmp('V_DEPARTCODE').getValue(),
        'V_V_PLANTCODE': Ext.util.Cookies.get('v_orgCode'),
        'V_V_BJ_ID': Ext.getCmp('A_EQUID').getValue(),
        'V_V_USERID': Ext.util.Cookies.get('v_personcode')
    };

    select7115Store.load();
}

function _selectBJUseAll() {

    var bjUseAllStore = Ext.data.StoreManager.lookup('bjUseAllStore');
    bjUseAllStore.proxy.extraParams = {
        A_PLANTCODE: Ext.util.Cookies.get('v_orgCode'),
        A_DEPARTCODE: Ext.getCmp('V_DEPARTCODE').getValue(),
        A_EQUID: Ext.getCmp('A_EQUID').getValue(),
        A_BJ_UNIQUE_CODE: '',
        A_BEGINDATE: Ext.Date.format(new Date(new Date().getFullYear(), 0, 1), 'Y-m-d'),
        A_ENDDATE: Ext.Date.format(new Date(), 'Y-m-d')
    };

    bjUseAllStore.load();
}

function _selectEquVGUrl() {
    Ext.Ajax.request({
        url: AppUrl + 'PM_12/PRO_RUN7129_EQUVGURL',
        type: 'ajax',
        method: 'POST',
        params: {
            V_EQU_ID: Ext.getCmp('A_EQUID').getValue()
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET != "") {
                window.open(data.RET, '', 'height=800px,width=600px,top=50px,left=100px,resizable=yes');
            } else {
                Ext.Msg.alert('操作信息', '没有找到相应VG监控');
            }

        },
        failure: function (response) {//访问到后台时执行的方法。
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            })
        }

    });

}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}