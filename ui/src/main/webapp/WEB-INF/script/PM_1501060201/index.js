var ORDERID = '';
if (location.href.split('?')[1] != null) {
    ORDERID = Ext.urlDecode(location.href.split('?')[1]).ORDERID;
}

var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_PERSONNAME = Ext.util.Cookies.get('v_personname2');
var etStoreLoad = false;
var ET_ID_IN;

Ext.onReady(function () {
    Ext.getBody().mask('<p>正在载入中...</p>');

    //查询
    var etStore = Ext.create("Ext.data.Store", {
        storeId: 'etStore',
        autoLoad: true,
        pageSize: 200,
        fields: ['ET_NO', 'ET_CONTEXT', 'PLAN_WORKTIME', 'PLAN_PERSON', 'BEGINDATE',
            'END_FLAG', 'ENDDATE', 'PRE_ET_ID', 'START_FLAG', 'ET_ID'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'mwd/PRO_DJ602_ETLIST',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                'ORDERID_IN': ORDERID
            },
            reader: {
                type: 'json',
                root: 'RET',
                total: 'total'
            }
        },
        listeners: {
            load: function (store, records) {
                etStoreLoad = true;
                _init();
            }
        }

    });

    var inputPanel = Ext.create('Ext.panel.Panel', {
        id: 'inputPanel',
        region: 'north',
        layout: 'vbox',
        border: false,
        frame: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'billcode',
                fieldLabel: '工单号',
                labelWidth: 70,
                width: 200,
                value: ORDERID,
                readOnly: true,
                style: ' margin: 5px 0px 5px -10px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'DJ_NAME_IN',
                fieldLabel: '电机名称',
                labelWidth: 70,
                width: 200,
                readOnly: true,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'DJ_TYPE_IN',
                fieldLabel: '电机型号',
                labelWidth: 70,
                width: 200,
                readOnly: true,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'DJ_VOL_IN',
                fieldLabel: '容量',
                labelWidth: 70,
                width: 200,
                readOnly: true,
                style: ' margin: 5px 0px 5px -10px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'DJ_V_IN',
                fieldLabel: '电压',
                labelWidth: 70,
                width: 200,
                readOnly: true,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'LOC_PLANTNAME_IN',
                fieldLabel: '送修单位',
                labelWidth: 70,
                width: 200,
                readOnly: true,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'MENDDEPT_CODE_IN',
                fieldLabel: '检修班组',
                labelWidth: 70,
                width: 200,
                readOnly: true,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }]
        }]
    });

    var etGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'etGridPanel',
        store: etStore,
        width: '100%',
        border: false,
        columnLines: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINPLE'
        },
        columns: [{
            text: '工序号',
            dataIndex: 'ET_NO',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '工序内容',
            dataIndex: 'ET_CONTEXT',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '计划工时',
            dataIndex: 'PLAN_WORKTIME',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '计划人数',
            dataIndex: 'PLAN_PERSON',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '开始时间',
            dataIndex: 'BEGINDATE',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '完成状态',
            dataIndex: 'END_FLAG',
            align: 'center',
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                if (value == 0) {
                    return '未完成';
                } else {
                    return '已完成';
                }
            }
        }, {
            text: '完成时间',
            dataIndex: 'ENDDATE',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '前置工序',
            dataIndex: 'PRE_ET_ID',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '完成工序',
            align: 'center',
            width: 70,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                if (record.data.START_FLAG == '1' && record.data.END_FLAG == '0') {
                    return '<a href=javascript:dealWith(\'</a><a href="#" onclick="_show(\'' + record.data.ET_ID + '\')">' + '完成' + '</a>';
                } else {
                    return '<a style="cursor:pointer;">完成</a>';
                }
            }
        }],
        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: etStore,
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
            items: [inputPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [etGridPanel]
        }]

    });

    var finishWindow = Ext.create('Ext.window.Window', {
        id: 'finishWindow',
        title: '<div align="center">完成工序</div>',
        width: 340,
        height: 200,
        modal: true,
        plain: true,
        closable: true,
        closeAction: 'hide',
        layout: 'vbox',
        frame: true,
        items: [{
            xtype: 'panel',
            baseCls: 'my-panel-no-border',
            style: 'margin-top:20px',
            items: [{
                xtype: 'numberfield',
                id: 'ACT_PERSON_IN',
                fieldLabel: '实际人数',
                labelWidth: 90,
                width: 300,
                minValue: 0,
                value: 0,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'numberfield',
                id: 'ACT_WORKTIME_IN',
                fieldLabel: '实际工时',
                labelWidth: 90,
                width: 300,
                minValue: 0,
                value: 0,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'button',
                text: '保存',
                style: ' margin: 5px 0px 5px 250px',
                icon: imgpath + '/filesave.png',
                handler: _save
            }]
        }]
    });

    _init();
});

//初始化
function _init() {
    if (etStoreLoad) {

        _orderMessage();
        Ext.getBody().unmask();//去除页面笼罩
    }
}

function _orderMessage() {

    Ext.Ajax.request({
        url: AppUrl + 'mwd/PRO_DJ601_ORDERMESSAGE',
        type: 'ajax',
        method: 'POST',
        params: {
            'ORDERID_IN': ORDERID
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.RET.length > 0) {
                Ext.getCmp('DJ_NAME_IN').setValue(data.RET[0].DJ_NAME);//电机名称
                Ext.getCmp('DJ_TYPE_IN').setValue(data.RET[0].DJ_TYPE);//规格型号
                Ext.getCmp('DJ_VOL_IN').setValue(data.RET[0].DJ_VOL);//电机容量
                Ext.getCmp('DJ_V_IN').setValue(data.RET[0].DJ_V);//电机电压
                Ext.getCmp('LOC_PLANTNAME_IN').setValue(data.RET[0].LOC_PLANTNAME);//送修单位
                Ext.getCmp('MENDDEPT_CODE_IN').setValue(data.RET[0].MENDDEPT_NAME); //检修班组

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

function _show(ET_ID) {
    ET_ID_IN = ET_ID;
    Ext.getCmp('ACT_PERSON_IN').reset();
    Ext.getCmp('ACT_WORKTIME_IN').reset();
    Ext.getCmp('finishWindow').show();
}

function _save() {

    Ext.Ajax.request({
        url: AppUrl + 'mwd/PRO_DJ602_FINISHET',
        type: 'ajax',
        method: 'POST',
        params: {
            'ORDERID_IN': ORDERID,
            'ET_ID_IN': ET_ID_IN,
            'ACT_PERSON_IN': Ext.getCmp('ACT_PERSON_IN').getSubmitValue(),
            'ACT_WORKTIME_IN': Ext.getCmp('ACT_WORKTIME_IN').getSubmitValue(),
            'INSERT_USERID_IN': V_V_PERSONCODE,
            'INSERT_USERNAME_IN': V_V_PERSONNAME
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.RET == 'Success') {
                Ext.data.StoreManager.lookup('etStore').currentPage = 1;
                Ext.data.StoreManager.lookup('etStore').load();
                Ext.getCmp('finishWindow').hide();
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
