Ext.onReady(function () {
    var gzpalceStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'gzpalceStore',
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
                IS_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                IS_V_DEPTTYPE: '[主体作业区]'
            }
        }
    });

// 设备选择STORE
    var sbxzStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'sbxzStore',
        fields: ['EQU_DESC', 'EQU_ID'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_12/PRO_RUN7111_EQULIST',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

// 位置
    var siteStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'siteStore',
        fields: ['SITE_ID', 'SITE_DESC'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_12/PRO_RUN_SITE_ALL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var chartStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'chartStore',
        fields: ['WORKDATE', 'INSERT_VALUE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_12/PRO_RUN7118_WORKTIMELIST',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var chart = Ext.create('Ext.chart.Chart', {
        id: 'chart',
        width: 500,
        height: 300,
        margin: '10 10 10 10',
        store: chartStore,
        axes: [{
            title: '作业时间',
            type: 'Numeric',
            position: 'left',
            fields: ['INSERT_VALUE'],
            minimum: 0,
            maximum: 30
        }, {
            title: '日期',
            type: 'Time',
            position: 'bottom',
            fields: ['WORKDATE'],
            dateFormat: 'y-m-d'
        }],
        series: [{
            type: 'line',
            axis: 'left',
            highlight: true,
            style: {
                fill: '#38B8BF',
                stroke: '#38B8BF',
                'stroke-width': 3
            },
            markerConfig: {
                type: 'circle',
                size: 4,
                radius: 4,
                'stroke-width': 0,
                fill: '#38B8BF',
                stroke: '#38B8BF'
            },
            xField: 'WORKDATE',
            yField: 'INSERT_VALUE'
        }]
    });

    var panel = Ext.create('Ext.panel.Panel', {
        id: 'panel',
       // width: '100%',
        region: 'north',
        frame: true,
        layout: 'column',
        items: [
            {
                xtype: 'combo',
                id: "zyq",
                store: gzpalceStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '作业区',
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                labelWidth: 60,
                style: ' margin: 5px 0px 0px 10px',
                labelAlign: 'right'
            }, {
                xtype: 'combo',
                id: "selEqu",
                store: sbxzStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '设备',
                displayField: 'EQU_DESC',
                valueField: 'EQU_ID',
                labelWidth: 60,
                style: ' margin: 5px 0px 0px 10px',
                labelAlign: 'right'
            }, {
                xtype: 'combo',
                id: "site",
                store: siteStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '备件安装位置',
                displayField: 'SITE_DESC',
                valueField: 'SITE_ID',
                labelWidth: 100,
                style: ' margin: 5px 0px 0px 10px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '查询当前作业情况',
                width: 150,
                icon: imgpath + '/search.png',
                style: ' margin: 5px 0px 0px 30px',
                handler: loadChartStore
            }]
    });

    var chartPanel = Ext.create('Ext.panel.Panel', {
        id: 'chartPanel',
        //width: '100%',
        autoScroll: true,
        height: 300,
        region: 'north',
        layout: 'border',
        frame: true,
        items: [chart]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        columnLines: true,
        autoScroll: true,
        region: 'center',
        height: '100%',
        store: {
            id: 'gridStore',
            autoLoad: false,
            fields: ['CHANGEDATE', 'BJ_UNIQUE_CODE', 'MATERIALNAME', 'DIRECTION', 'REMARK'],
            proxy: {
                type: 'ajax',
                async: false,
                url: AppUrl + 'PM_12/PRO_RUN_BJ_CHANGE_LOG_ALL',
                actionMethods: {
                    read: 'POST'
                },
                reader: {
                    type: 'json',
                    root: 'list',
                    total: 'total'
                }
            },
            listeners: {
                beforeload: beforeloadStore
            }
        },

        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 35,
            sortable: false
        }, {
            text: '更换日期',
            width: 150,
            dataIndex: 'CHANGEDATE',
            align: 'center',
            renderer: atleft
        }, {
            text: '当前设备唯一标识',
            width: 150,
            dataIndex: 'BJ_UNIQUE_CODE',
            align: 'center',
            renderer: atleft
        }, {
            text: '物资编码',
            width: 150,
            dataIndex: 'MATERIALNAME',
            align: 'center',
            renderer: atleft
        }, {
            text: '更换方向',
            width: 150,
            dataIndex: 'DIRECTION',
            align: 'center',
            renderer: atleft
        }, {
            text: '备注',
            flex: 1,
            width: 150,
            dataIndex: 'REMARK',
            align: 'center',
            renderer: atleft
        }]
// bbar: [{
// xtype: 'pagingtoolbar',
// dock: 'bottom',
// displayInfo: true,
// displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
// emptyMsg: '没有记录',
// store: 'gridStore'
// }]
    });

    var cPanel = Ext.create('Ext.panel.Panel', {
        id: 'cPanel',
        title: '备件更换历史',
        region: 'center',
        autoScroll: true,
        layout: 'border',
        frame: true,
        items: [
            {
                frame: true,
                region: 'north',
                layout: 'column',
                items: [
                    {
                        xtype: 'datefield',
                        fieldLabel: '起始日期',
                        id: 'startTime',
                        value: new Date(new Date().getFullYear() + "/"
                        + '01' + "/" + '01'),
                        format: 'Y/m/d',
                        editable: false,
                        labelAlign: 'right',
                        labelWidth: 70,
                        style: ' margin: 5px 0px 0px 10px'
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: '结束日期',
                        id: 'endTime',
                        value: Ext.Date.getLastDateOfMonth(new Date(
                            new Date().getFullYear() + "/" + '12' + "/"
                            + '1')),
                        format: 'Y/m/d',
                        editable: false,
                        labelAlign: 'right',
                        labelWidth: 70,
                        style: ' margin: 5px 0px 0px 10px'
                    }, {
                        xtype: 'button',
                        text: '查询更换情况',
                        width: 150,
                        icon: imgpath + '/search.png',
                        style: ' margin: 5px 0px 0px 30px',
                        handler: loadGridStore
                    }]
            }, grid]
    });

    Ext.data.StoreManager.lookup('gzpalceStore').on('load', function () {
        Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('gzpalceStore').getAt(0));

        // 默认当前登录用户工作区
        var storeDataList = Ext.data.StoreManager.lookup('gzpalceStore').data;
        var storeLength = storeDataList.length;
        for (var index = 0; index < storeLength; index++) {
            var storeItemData = storeDataList.items[index].data;
            if (storeItemData.V_DEPTCODE == Ext.util.Cookies.get('v_deptcode')) {
                Ext.getCmp("zyq").setValue(Ext.util.Cookies.get('v_deptcode'));
                break;
            }
        }

        Ext.data.StoreManager.lookup('sbxzStore').load({
            params: {
                V_V_PLANTCODE: Ext.util.Cookies.get('v_orgCode'),
                V_V_DEPTCODE: Ext.getCmp('zyq').getValue()
            }
        });
    });

    Ext.getCmp('zyq').on('select', function () {
        Ext.getCmp('selEqu').select('');
        Ext.data.StoreManager.lookup('sbxzStore').load({
            params: {
                V_V_PLANTCODE: Ext.util.Cookies.get('v_orgCode'),
                V_V_DEPTCODE: Ext.getCmp('zyq').getValue()
            }
        });
    });

    Ext.getCmp('selEqu').on('select', function () {
        Ext.getCmp('site').select('');
        Ext.data.StoreManager.lookup('siteStore').load({
            params: {
                A_EQU_ID: Ext.getCmp('selEqu').getValue()
            }
        });
    });

    Ext.data.StoreManager.lookup('sbxzStore').on('load', function () {
        Ext.getCmp('selEqu').select(Ext.data.StoreManager.lookup('sbxzStore').getAt(0));
        Ext.data.StoreManager.lookup('siteStore').load({
            params: {
                A_EQU_ID: Ext.getCmp('selEqu').getValue()
            }
        });
    });
    Ext.data.StoreManager.lookup('siteStore').on('load', function () {
        Ext.getCmp('site').select(Ext.data.StoreManager.lookup('siteStore').getAt(0));
    });
    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        autoScroll: true,
        items: [panel, chartPanel, cPanel]
    });
});

function OnClickDeleteLink() {
    var data = Ext.getCmp('grid').getSelectionModel().getSelection()[0].data;
    window.showModalDialog(AppUrl + '/' + data.url, null,
        "dialogWidth=650px;dialogHeight=400px");

}

function loadGridStore() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            A_BJ_UNIQUE_CODE: Ext.getCmp('site').getValue()
        }
    });
}

function loadChartStore() {
    Ext.data.StoreManager.lookup('chartStore').load({
        params: {
            V_V_SITE_ID: Ext.getCmp("site").getValue()
        }
    });
}

function beforeloadStore(store) {

}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}