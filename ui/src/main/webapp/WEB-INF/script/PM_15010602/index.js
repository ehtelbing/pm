var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_PERSONNAME = Ext.util.Cookies.get('v_personname2');
var orderStatusStoreLoad = false;

Ext.onReady(function () {
    Ext.getBody().mask('<p>正在载入中...</p>');

    //工单状态
    var orderStatusStore = Ext.create('Ext.data.Store', {
        id: 'orderStatusStore',
        autoLoad: true,
        fields: ['ORDER_STATUS', 'ORDER_STATUS_DESC'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'mwd/PRO_DJ602_ORDERSTATUSLIST',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'RET'
            },
            extraParams: {
                USERCODE_IN: V_V_PERSONCODE
            }
        },
        listeners: {
            load: function (store, records) {
                orderStatusStoreLoad = true;
                Ext.getCmp('ORDER_STATUS_IN').select(store.first());
                _init();
            }
        }

    });

    //检修单位
    var mendDeptPowerStore = Ext.create('Ext.data.Store', {
        id: 'mendDeptPowerStore',
        autoLoad: false,
        fields: ['MENDDEPT_CODE', 'MENDDEPT_NAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'mwd/PRO_DJ602_MENDDEPT_POWER',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'RET'
            },
            extraParams: {}
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('MENDDEPT_CODE_IN').select(store.first());
            }
        }

    });

    var syResultStore = Ext.create("Ext.data.Store", {
        storeId: 'syResultStore',
        fields: [ 'SY_RESULT', 'SY_RESULT_DESC'],
        data: [
            {'SY_RESULT': '%', 'SY_RESULT_DESC': '全部'},
            {'SY_RESULT': '未试验', 'SY_RESULT_DESC': '未试验'},
            {'SY_RESULT': '通过', 'SY_RESULT_DESC': '通过'},
            {'SY_RESULT': '未通过', 'SY_RESULT_DESC': '未通过'}],
        proxy: {
            type: 'ajax',
            reader: {
                type: 'json'
            }
        }
    });

    //查询
    var orderListPowerStore = Ext.create("Ext.data.Store", {
        storeId: 'orderListPowerStore',
        autoLoad: false,
        pageSize: 200,
        fields: ['ORDERID', 'APPLY_ID', 'DJ_UQ_CODE', 'DJ_NAME', 'MEND_CONTEXT', 'PLANTCODE', 'DEPARTCODE',
            'MENDDEPT_CODE', 'MENDDEPT_NAME', 'MEND_USERID', 'MEND_USERNAME', 'PLAN_BEGINDATE', 'PLAN_ENDDATE',
            'INSERTDATE', 'INSERT_USERID', 'INSERT_USERNAME', 'ACT_BEGINDATE', 'ACT_ENDDATE', 'EXA_FLAG',
            'EXA_USERID', 'EXA_USERNAME', 'EXA_RESULT', 'ORDER_STATUS', 'DJ_CODE', 'DJ_TYPE', 'DJ_VOL', 'DJ_V',
        'PICCODE', 'PHONE_NUMBER', 'OP_PERSON', 'USE_LOC', 'REQ_TIME', 'PLAN_TIME', 'BUILD_REMARK', 'CHECK_LOG',
        'MEND_TYPE', 'CSY_RESULT', 'MENDDEPT_NAME', 'NEXT_STATUS', 'ORDER_STATUS_DESC', 'PLANTNAME', 'F_MONEY'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'mwd/PRO_DJ602_ORDERLIST_POWER',
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
            border: true,
            width: '100%',
            //baseCls: 'my-panel-no-border',
            items: [{
                id: 'ORDER_STATUS_IN',
                xtype: 'combo',
                store: orderStatusStore,
                editable: false,
                fieldLabel: '工单状态',
                labelWidth: 70,
                width: 200,
                displayField: 'ORDER_STATUS_DESC',
                valueField: 'ORDER_STATUS',
                queryMode: 'local',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectMendDept();
                    }
                }
            }, {
                id: 'MENDDEPT_CODE_IN',
                xtype: 'combo',
                store: mendDeptPowerStore,
                fieldLabel: '检修单位',
                labelWidth: 70,
                width: 200,
                displayField: 'MENDDEPT_NAME',
                valueField: 'MENDDEPT_CODE',
                queryMode: 'local',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                id: 'CSY_RESULT_IN',
                xtype: 'combo',
                store: syResultStore,
                fieldLabel: '试验结果',
                labelWidth: 70,
                width: 200,
                value: '%',
                displayField: 'SY_RESULT_DESC',
                valueField: 'SY_RESULT',
                queryMode: 'local',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'ORDERID_IN',
                fieldLabel: '工单号',
                labelWidth: 70,
                width: 200,
                style: ' margin: 5px 0px 5px -10px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '查询',
                style: ' margin: 5px 0px 5px 10px',
                icon: imgpath + '/search.png',
                handler: _selectOrder
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            border: true,
            width: '100%',
            //baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'REMARK_IN',
                fieldLabel: '备注',
                labelWidth: 70,
                width: 400,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '完成任务',
                style: ' margin: 5px 0px 5px 10px',
                icon: imgpath + '/tree_dnd_yes.png',
                handler: _finishTask
            }, {
                xtype: 'button',
                text: '退回到上一步',
                style: ' margin: 5px 0px 5px 10px',
                //icon: imgpath + '/level_up_16x16.gif',
                handler: _rollBack
            }]
        }]
    });

    var orderGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'orderGridPanel',
        store: orderListPowerStore,
        width: '100%',
        border: false,
        columnLines: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINPLE'
        },
        columns: [{
            text: '工序管理',
            align: 'center',
            width: 70,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href=javascript:dealWith(\'</a><a href="#" onclick="_billManage(\'' + record.data.ORDERID + '\')">' + '管理' + '</a>';
            }
        }, {
            text: '物料管理',
            align: 'center',
            width: 70,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href=javascript:dealWith(\'</a><a href="#" onclick="_matManage(\'' + record.data.ORDERID + '\')">' + '管理' + '</a>';
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
            text: '电机容量',
            dataIndex: 'DJ_VOL',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '申请厂矿',
            dataIndex: 'PLANTNAME',
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
            text: '消耗物资合计',
            dataIndex: 'F_MONEY',
            align: 'center',
            flex: 1,
            renderer: function (value, metaData, record, rowIndex, colIndex, store){
                metaData.style = "text-align:right;";
                return Ext.util.Format.usMoney(value);
            }
        }, {
            text: '负责人',
            dataIndex: 'MEND_USERNAME',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '下一状态',
            dataIndex: 'ORDER_STATUS_DESC',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '试验结果',
            dataIndex: 'CSY_RESULT',
            align: 'center',
            flex: 1,
            renderer: atleft
        }],
        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: orderListPowerStore,
            dock: 'bottom',
            displayInfo: true
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
            items: [tablePanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [orderGridPanel]
        }]

    });

    _init();
});

//初始化
function _init() {
    if (orderStatusStoreLoad) {

        Ext.getBody().unmask();//去除页面笼罩
    }
}

function _selectMendDept() {
    var mendDeptPowerStore = Ext.data.StoreManager.lookup('mendDeptPowerStore');
    mendDeptPowerStore.proxy.extraParams = {
        'USERCODE_IN': V_V_PERSONCODE,
        'ORDER_STATUS_IN': Ext.getCmp('ORDER_STATUS_IN').getValue()

    };
    mendDeptPowerStore.load();
}

function _selectOrder() {
    var orderListPowerStore = Ext.data.StoreManager.lookup('orderListPowerStore');
    orderListPowerStore.proxy.extraParams = {
        ORDER_STATUS_IN: Ext.getCmp('ORDER_STATUS_IN').getSubmitValue(),
        MENDDEPT_CODE_IN: Ext.getCmp('MENDDEPT_CODE_IN').getSubmitValue(),
        ORDERID_IN: Ext.getCmp('ORDERID_IN').getSubmitValue(),
        CSY_RESULT_IN: Ext.getCmp('CSY_RESULT_IN').getSubmitValue()
    };

    orderListPowerStore.currentPage = 1;
    orderListPowerStore.load();
}

function _billManage(ORDERID) {
    window.open(AppUrl + 'page/PM_1501060201/index.html?ORDERID=' + ORDERID, '', 'height=550px,width=1200px,top=50px,left=100px,resizable=yes');
}

function _matManage(ORDERID) {
    window.open(AppUrl + 'page/PM_1501060202/index.html?ORDERID=' + ORDERID, '', 'height=550px,width=1200px,top=50px,left=100px,resizable=yes');
}

//完成工单当前步骤
function _finishTask() {
    var records = Ext.getCmp('orderGridPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择工单',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }

    Ext.Ajax.request({
        url: AppUrl + 'mwd/PRO_DJ602_OVER',
        type: 'ajax',
        method: 'POST',
        params: {
            'ORDERID_IN': records[0].get('ORDERID'),
            'USERID_IN': V_V_PERSONCODE,
            'USERNAME_IN': V_V_PERSONNAME,
            'REMARK_IN': Ext.getCmp('REMARK_IN').getSubmitValue()
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.RET == 'Success') {
                _selectOrder();
                Ext.Msg.alert('提示信息', '操作成功');
            } else {
                Ext.Msg.alert('提示信息', '操作失败');
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

//退回到上一步
function _rollBack() {
    var records = Ext.getCmp('orderGridPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择工单',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }

    Ext.Ajax.request({
        url: AppUrl + 'mwd/ROLLBACKTOPRESTEP',
        type: 'ajax',
        method: 'POST',
        params: {
            'A_ORDERID': records[0].get('ORDERID'),
            'A_USERID': V_V_PERSONCODE,
            'A_USERNAME': V_V_PERSONNAME
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.RET == 'Success') {
                _selectOrder();
                Ext.Msg.alert('提示信息', '操作成功');
            } else {
                Ext.Msg.alert('提示信息', '操作失败');
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
