var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_PERSONNAME = Ext.util.Cookies.get('v_personname2');
var mendDeptStoreLoad = false;

Ext.onReady(function () {
    Ext.getBody().mask('<p>正在载入中...</p>');

    //检修单位
    var mendDeptStore = Ext.create('Ext.data.Store', {
        id: 'mendDeptStore',
        autoLoad: true,
        fields: ['MENDDEPT_CODE', 'MENDDEPT_NAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'mwd/PRO_DJ601_MENDDEPT_DEPT_USER',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                USERCODE_IN: V_V_PERSONCODE
            },
            reader: {
                type: 'json',
                root: 'RET'
            }
        },
        listeners: {
            load: function (store, records) {
                mendDeptStoreLoad = true;
                Ext.getCmp('PLANTCODE_IN').select(store.first());
                _init();
            }
        }

    });

    //检修申请查询
    var waitApplyListStore = Ext.create("Ext.data.Store", {
        storeId: 'waitApplyListStore',
        autoLoad: false,
        pageSize: 200,
        fields: ['ORDERID', 'DJ_UQ_CODE', 'DJ_NAME', 'APPLY_PLANTNAME', 'MEND_CONTEXT', 'INSERTDATE', 'REMARK',
            'APPLY_ID', 'MEND_CODE', 'DJ_SERIES_CLASS', 'DJ_VOL', 'MEND_TYPE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'mwd/PRO_DJ601_WAITAPPLYLIST',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'RET',
                total: 'total'
            }
        }

    });

    //待下达工单查询
    var orderListWaitStore = Ext.create("Ext.data.Store", {
        storeId: 'orderListWaitStore',
        autoLoad: false,
        pageSize: 200,
        fields: ['ORDERID', 'DJ_UQ_CODE', 'DJ_NAME', 'PLANTCODE', 'APPLY_PLANTNAME', 'MEND_CONTEXT', 'MENDDEPT_NAME',
            'MEND_USERNAME', 'MEND_TYPE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'mwd/PRO_DJ601_ORDERLIST_WAIT',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'RET',
                total: 'total'
            }
        }

    });

    var tablePanel = Ext.create('Ext.panel.Panel', {
        id: 'tablePanel',
        region: 'north',
        layout: 'vbox',
        frame: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'PLANTCODE_IN',
                xtype: 'combo',
                store: mendDeptStore,
                editable: false,
                fieldLabel: '检修单位',
                labelWidth: 80,
                width: 220,
                displayField: 'MENDDEPT_NAME',
                valueField: 'MENDDEPT_CODE',
                queryMode: 'local',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                id: 'DJ_UQ_CODE_IN',
                xtype: 'textfield',
                fieldLabel: '电机编号',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                id: 'DJ_NAME_IN',
                xtype: 'textfield',
                fieldLabel: '电机名称',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                id : 'ORDERID_IN',
                xtype : 'textfield',
                fieldLabel : '检修编号',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right',
                emptyText:'仅对检修申请查询时有效'
            }, {
                xtype: 'button',
                text: '查询',
                style: ' margin: 5px 0px 5px 10px',
                icon: imgpath + '/search.png',
                handler: _select
            }]
        }]
    });

    var waitApplyGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'waitApplyGridPanel',
        title: '检修申请',
        store: waitApplyListStore,
        width: '100%',
        height: window.screen.height / 2 - 200,
        border: false,
        columnLines: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINPLE'
        },
        columns: [{
            text: '创建工单',
            align: 'center',
            width : 70,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href=javascript:dealWith(\'</a><a href="#" onclick="_create(\'' + record.data.APPLY_ID + '\'' +
                    ',\'' + record.data.DJ_UQ_CODE + '\',\'' + record.data.DJ_NAME + '\',\'' + record.data.MEND_CONTEXT + '\'' +
                    ',\'' + record.data.MEND_CODE + '\')">' + '创建' + '</a>';
            }
        }, {
            text: '检修编号',
            dataIndex: 'MEND_CODE',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '电机编号',
            dataIndex: 'DJ_UQ_CODE',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '电机名称',
            dataIndex: 'DJ_NAME',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '电机容量',
            dataIndex: 'DJ_VOL',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '申请厂矿',
            dataIndex: 'APPLY_PLANTNAME',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '维修类型',
            dataIndex: 'MEND_TYPE',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '维修内容',
            dataIndex: 'MEND_CONTEXT',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '录入时间',
            dataIndex: 'INSERTDATE',
            align: 'center',
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return Ext.util.Format.date(new Date(value), 'Y-m-d');
            }
        }, {
            text: '备注',
            dataIndex: 'REMARK',
            align: 'center',
            flex: 1,
            renderer: atleft
        }],
        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: waitApplyListStore,
            dock: 'bottom',
            displayInfo: true
        }]
    });

    var orderListWaitGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'orderListWaitGridPanel',
        title: '待下达工单',
        store: orderListWaitStore,
        width: '100%',
        border: false,
        columnLines: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINPLE'
        },
        columns: [{
            text: '下达工单',
            align: 'center',
            width : 70,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href=javascript:dealWith(\'</a><a href="#" style="cursor:pointer;text-decoration:underline; color:#00F"; onclick="_downLoad(\'' + record.data.ORDERID + '\')">' + '下达' + '</a>';
            }
        }, {
            text: '编辑修改',
            align: 'center',
            width : 70,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href=javascript:dealWith(\'</a><a href="#" style="cursor:pointer;text-decoration:underline; color:#00F"; onclick="_edit(\'' + record.data.ORDERID + '\',\'' + record.data.MEND_CONTEXT + '\')">' + '编辑' + '</a>';
            }
        }, {
            text: '工单号',
            dataIndex: 'ORDERID',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '电机编号',
            dataIndex: 'DJ_UQ_CODE',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '电机名称',
            dataIndex: 'DJ_NAME',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '电机名称',
            dataIndex: 'DJ_NAME',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '申请厂矿',
            dataIndex: 'APPLY_PLANTNAME',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '维修类型',
            dataIndex: 'MEND_TYPE',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '维修内容',
            dataIndex: 'MEND_CONTEXT',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '检修班组',
            dataIndex: 'MENDDEPT_NAME',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '负责人',
            dataIndex: 'MEND_USERNAME',
            align: 'center',
            flex: 1,
            renderer: atleft
        }],
        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: orderListWaitStore,
            dock: 'bottom',
            displayInfo: true
        }]
    });

    var tabPanel = Ext.create('Ext.tab.Panel', {
        id: 'tabPanel',
        region: 'center',
        layout: 'border',
        items: [waitApplyGridPanel, orderListWaitGridPanel]
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
            items: [tablePanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [tabPanel]
        }]

    });

    _init();
});

//初始化
function _init() {
    if (mendDeptStoreLoad) {

        Ext.getCmp("tabPanel").on('tabchange', _select);
        _select();
        Ext.getBody().unmask();//去除页面笼罩
    }
}

function _select() {
    if (Ext.getCmp("tabPanel").activeTab.title == '检修申请') {
        var waitApplyListStore = Ext.data.StoreManager.lookup('waitApplyListStore');
        waitApplyListStore.proxy.extraParams = {
            PLANTCODE_IN: Ext.getCmp('PLANTCODE_IN').getSubmitValue(),
            DJ_UQ_CODE_IN: Ext.getCmp('DJ_UQ_CODE_IN').getSubmitValue(),
            DJ_NAME_IN: Ext.getCmp('DJ_NAME_IN').getSubmitValue(),
            ORDERID_IN: Ext.getCmp('ORDERID_IN').getSubmitValue(),
            USERCODE_IN: V_V_PERSONCODE

        };
        waitApplyListStore.currentPage = 1;
        waitApplyListStore.load();
    }
    else {
        var orderListWaitStore = Ext.data.StoreManager.lookup('orderListWaitStore');
        orderListWaitStore.proxy.extraParams = {
            MENDDEPT_CODE_IN: Ext.getCmp('PLANTCODE_IN').getSubmitValue(),
            DJ_UQ_CODE_IN: Ext.getCmp('DJ_UQ_CODE_IN').getSubmitValue(),
            DJ_NAME_IN: Ext.getCmp('DJ_NAME_IN').getSubmitValue(),
            USERCODE_IN: V_V_PERSONCODE

        };
        orderListWaitStore.currentPage = 1;
        orderListWaitStore.load();
    }
}

function _create(APPLY_ID, DJ_UQ_CODE, DJ_NAME, MEND_CONTEXT, MEND_CODE) {
    window.open(AppUrl + 'page/PM_1501060101/index.html?APPLY_ID=' + APPLY_ID + '&DJ_UQ_CODE=' + DJ_UQ_CODE + '&DJ_NAME=' + DJ_NAME + '&MEND_CONTEXT=' + MEND_CONTEXT + '&MENDDEPT=' + Ext.getCmp('PLANTCODE_IN').getSubmitValue() + '&MEND_CODE=' + MEND_CODE, '', 'height=600px,width=1200px,top=50px,left=100px,resizable=yes');
}

function _edit(ORDERID, MEND_CONTEXT) {
    window.open(AppUrl + 'page/PM_1501060102/index.html?ORDERID=' + ORDERID + '&MENDDEPT=' + Ext.getCmp('PLANTCODE_IN').getSubmitValue() + '&MEND_CONTEXT=' + MEND_CONTEXT, '', 'height=600px,width=1200px,top=50px,left=100px,resizable=yes');
}

function _downLoad(ORDERID) {

    Ext.Ajax.request({
        url: AppUrl + 'mwd/PRO_DJ601_ORDER_DOWNLOAD',
        type: 'ajax',
        method: 'POST',
        params: {
            'ORDERID_IN': ORDERID,
            'USERCODE_IN': V_V_PERSONCODE,
            'USERNAME_IN': V_V_PERSONNAME
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.RET == 'Success') {
                Ext.Msg.alert('操作信息', "操作成功");
                Ext.data.StoreManager.lookup('orderListWaitStore').load();
            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: data.message,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        },
        failure: function (response) {
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    });
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}
