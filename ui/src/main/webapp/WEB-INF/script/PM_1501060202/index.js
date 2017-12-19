var ORDERID = '';
if (location.href.split('?')[1] != null) {
    ORDERID = Ext.urlDecode(location.href.split('?')[1]).ORDERID;
}

var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_PERSONNAME = Ext.util.Cookies.get('v_personname2');
var orderMatStoreLoad = false;
var I_ID;

Ext.onReady(function () {
    Ext.getBody().mask('<p>正在载入中...</p>');

    //物资类型
    var itypeStore = Ext.create('Ext.data.Store', {
        id: 'itypeStore',
        autoLoad: true,
        pageSize: 100,
        fields: ['CODE', 'NAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'ml/PRO_MM_ITYPE',
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
                Ext.getCmp('A_ITYPE').select(store.first());
            }
        }

    });

    //库存查询
    var kcStore = Ext.create('Ext.data.Store', {
        id: 'kcStore',
        autoLoad: false,
        pageSize: 100,
        fields: ['KCID', 'MATERIALCODE', 'MATERIALNAME', 'ETALON', 'UNIT', 'F_PRICE', 'KY_AMOUNT', 'STORE_DESC', 'NUM'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'mwd/GETMATKC',
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

    //查询所需物料表
    var orderMatStore = Ext.create('Ext.data.Store', {
        id: 'orderMatStore',
        autoLoad: true,
        pageSize: 200,
        fields: ['ID', 'ORDERID', 'MATERIALCODE', 'MATERIALNAME', 'ETALON', 'MAT_CL', 'UNIT',
            'F_PRICE', 'PLAN_AMOUNT', 'ACT_AMOUNT', 'ET_ID', 'SOURCE', 'KCID',
            'F_PLAN_MONEY', 'F_ACT_MONEY', 'INSERTDATE'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'mwd/PRO_DJ601_ORDERMAT',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                ORDERID_IN: ORDERID
            },
            reader: {
                type: 'json',
                root: 'RET',
                total: 'total'
            }
        },
        listeners: {
            load: function (store, records) {
                orderMatStoreLoad = true;
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
            }, {
                xtype: 'textfield',
                id: 'DJ_VOL_IN',
                fieldLabel: '容量',
                labelWidth: 70,
                width: 200,
                readOnly: true,
                style: ' margin: 5px 0px 5px 0px',
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
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'LOC_PLANTNAME_IN',
                fieldLabel: '送修单位',
                labelWidth: 70,
                width: 200,
                readOnly: true,
                style: ' margin: 5px 0px 5px -10px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'DJ_DEPARTNAME_IN',
                fieldLabel: '送修部门',
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
            }, {
                xtype: 'textfield',
                id: 'DJ_INSERTDATE_IN',
                fieldLabel: '入场时间',
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
            border: true,
            width: '100%',
            //baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'button',
                text: '追加物料',
                style: ' margin: 5px 0px 5px 20px',
                icon: imgpath + '/add.png',
                handler: _showMatWindow
            }]
        }]
    });

    var orderMatGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'orderMatGridPanel',
        //title: '所需供料表',
        store: orderMatStore,
        width: '100%',
        border: false,
        columnLines: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINPLE'
        },
        columns: [{
            xtype : 'rownumberer',
            align : 'center'
        }, {
            text: '物料编码',
            dataIndex: 'MATERIALCODE',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '物料名称',
            dataIndex: 'MATERIALNAME',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '规格型号',
            dataIndex: 'ETALON',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '材质',
            dataIndex: 'MAT_CL',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '计量单位',
            dataIndex: 'UNIT',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '单价',
            dataIndex: 'F_PRICE',
            align: 'center',
            flex: 1,
            renderer: atright
        }, {
            text: '计划数量',
            dataIndex: 'PLAN_AMOUNT',
            align: 'center',
            flex: 1,
            renderer: atright
        }, {
            text: '实际数量',
            dataIndex: 'ACT_AMOUNT',
            align: 'center',
            flex: 1,
            renderer: atright
        }, {
            text: '计划金额',
            dataIndex: 'F_PLAN_MONEY',
            align: 'center',
            flex: 1,
            renderer: atright
        }, {
            text: '实际金额',
            dataIndex: 'F_ACT_MONEY',
            align: 'center',
            flex: 1,
            renderer: atright
        }, {
            text: '物料来源',
            dataIndex: 'SOURCE',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '填写消耗数量',
            align: 'center',
            width: 70,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                if(record.data.MATERIALNAME == '合计'){
                    return value;
                }else{
                    return '<a href=javascript:dealWith(\'</a><a href="#" onclick="_showInputWindow(\'' + record.data.ID + '\')">' + '录入' + '</a>';
                }
            }
        }, {
            text: '录入时间',
            dataIndex: 'INSERTDATE',
            align: 'center',
            flex: 1,
            renderer: atleft
        }],
        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: orderMatStore,
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
            items: [orderMatGridPanel]
        }]

    });

    var inputWindow = Ext.create('Ext.window.Window', {
        id: 'inputWindow',
        title: '<div align="center">录入实际数量</div>',
        width: 340,
        height: 150,
        modal: true,
        plain: true,
        closable: true,
        closeAction: 'hide',
        layout: 'vbox',
        frame: true,
        items: [{
            xtype: 'panel',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            style: 'margin-top:20px',
            items: [{
                xtype: 'numberfield',
                id: 'ACT_AMOUNT',
                fieldLabel: '实际数量',
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
                text: '确认',
                style: ' margin: 5px 0px 5px 250px',
                icon: imgpath + '/saved.png',
                handler: _saveAmount
            }]
        }]
    });

    var matWindow = Ext.create('Ext.window.Window', {
        id: 'matWindow',
        title: '<div align="center">追加物料</div>',
        width: 340,
        height: 340,
        modal: true,
        plain: true,
        closable: true,
        closeAction: 'hide',
        layout: 'vbox',
        frame: true,
        items: [{
            xtype: 'panel',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            style: 'margin-top:20px',
            items: [{
                xtype: 'textfield',
                id: 'MATERIALCODE_IN',
                fieldLabel: '物料编码',
                labelWidth: 90,
                width: 255,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '选择',
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right',
                handler: _showKCWindow
            }]
        }, {
            xtype: 'panel',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'MATERIALNAME_IN',
                fieldLabel: '物料名称',
                labelWidth: 90,
                width: 300,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'ETALON_IN',
                fieldLabel: '规格型号',
                labelWidth: 90,
                width: 300,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'MAT_CL_IN',
                fieldLabel: '材质',
                labelWidth: 90,
                width: 300,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'numberfield',
                id: 'ACT_AMOUNT_IN',
                fieldLabel: '实际数量',
                labelWidth: 90,
                width: 300,
                minValue: 0,
                value: 0,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'numberfield',
                id: 'F_PRICE_IN',
                fieldLabel: '单价',
                labelWidth: 90,
                width: 300,
                minValue: 0,
                value: 0,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'SOURCE',
                fieldLabel: '物料来源',
                labelWidth: 90,
                width: 300,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'button',
                text: '保存',
                style: ' margin: 5px 0px 5px 250px',
                icon: imgpath + '/filesave.png',
                handler: _addMat
            }]
        }]
    });

    var kcGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'kcGridPanel',
        //title: '添加模型工序',
        store: kcStore,
        width: '100%',
        border: false,
        columnLines: true,
        plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })],
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINPLE'
        },
        columns: [{
            xtype: 'rownumberer',
            align: 'center'
        }, {
            text: '物资编码',
            dataIndex: 'MATERIALCODE',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '物资名称',
            dataIndex: 'MATERIALNAME',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '规格型号',
            dataIndex: 'ETALON',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '计量单位',
            dataIndex: 'UNIT',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '当前单价',
            dataIndex: 'F_PRICE',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '库存数量',
            dataIndex: 'KY_AMOUNT',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '所需数量',
            dataIndex: 'NUM',
            align: 'center',
            flex: 1,
            editor: {
                xtype: 'numberfield',
                allowBlank: false,
                allowDecimals: 3,
                minValue: 0
            },
            renderer: function (value, metaData) {
                metaData.style = "text-align:right;background:#FFFF99";
                return value;
            }
        }, {
            text: '添加',
            dataIndex: 'STORE_DESC',
            align: 'center',
            width: 60,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a  href="javascript:_saveMat(' + rowIdx + ')" >保存</a>';
            }
        }, {
            text: '库存位置描述',
            dataIndex: 'STORE_DESC',
            align: 'center',
            flex: 1,
            renderer: atleft
        }],
        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: kcStore,
            dock: 'bottom',
            displayInfo: true
        }]
    });

    var kcWindow = Ext.create('Ext.window.Window', {
        id: 'kcWindow',
        title: '<div align="center">库存查询</div>',
        width: 1200,
        height: 550,
        modal: true,
        plain: true,
        closable: true,
        closeAction: 'hide',
        model: true,
        layout: 'border',
        frame: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            style: 'background-color:#FFFFFF',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'A_ITYPE',
                xtype: 'combo',
                store: itypeStore,
                editable: false,
                fieldLabel: '物资分类',
                labelWidth: 90,
                width: 220,
                displayField: 'NAME',
                valueField: 'CODE',
                queryMode: 'local',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectKC();
                    }
                }
            }, {
                id: 'A_MATERIALCODE',
                xtype: 'textfield',
                fieldLabel: '物料编码',
                labelWidth: 90,
                width: 200,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                id: 'A_MATERIALNAME',
                xtype: 'textfield',
                fieldLabel: '物料名称',
                labelWidth: 90,
                width: 200,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                id: 'A_ETALON',
                xtype: 'textfield',
                fieldLabel: '规格型号',
                labelWidth: 90,
                width: 200,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '查询',
                style: 'margin:5px 0px 5px 10px',
                icon: imgpath + '/search.png',
                handler: _selectKC
            }]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [kcGridPanel]
        }]
    });

    _init();
});

//初始化
function _init() {
    if (orderMatStoreLoad) {

        _orderMessage();
        Ext.getBody().unmask();//去除页面笼罩
    }
}

function _selectKC() {
    var kcStore = Ext.data.StoreManager.lookup('kcStore');
    kcStore.proxy.extraParams = {
        'A_PLANTCODE': Ext.util.Cookies.get('v_orgCode'),
        'A_DEPARTCODE': Ext.util.Cookies.get('v_deptcode'),
        'A_ITYPE': Ext.getCmp('A_ITYPE').getValue(),
        'A_MATERIALCODE': Ext.getCmp('A_MATERIALCODE').getValue(),
        'A_MATERIALNAME': Ext.getCmp('A_MATERIALNAME').getValue(),
        'A_ETALON': Ext.getCmp('A_ETALON').getValue()
    };

    kcStore.load();
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
                Ext.getCmp('DJ_DEPARTNAME_IN').setValue(data.RET[0].MENDDEPT_NAME);//送修部门
                Ext.getCmp('MENDDEPT_CODE_IN').setValue(data.RET[0].MENDDEPT_NAME); //检修班组
                Ext.getCmp('DJ_INSERTDATE_IN').setValue(data.RET[0].INSERTDATE);//入场时间

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

function _showInputWindow(ID) {
    I_ID = ID;
    Ext.getCmp('ACT_AMOUNT').setValue(0);
    Ext.getCmp('inputWindow').show();
}

function _saveAmount() {

    Ext.Ajax.request({
        url: AppUrl + 'mwd/PRO_DJ602_CONFIRMMAT',
        type: 'ajax',
        method: 'POST',
        params: {
            'ID_IN': I_ID,
            'ACT_AMOUNT_IN': Ext.getCmp('ACT_AMOUNT').getSubmitValue()
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.RET == 'Success') {
                Ext.data.StoreManager.lookup('orderMatStore').currentPage = 1;
                Ext.data.StoreManager.lookup('orderMatStore').load();
                Ext.getCmp('inputWindow').hide();
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

function _showMatWindow() {
    Ext.getCmp('MATERIALCODE_IN').reset();
    Ext.getCmp('MATERIALNAME_IN').reset();
    Ext.getCmp('ETALON_IN').reset();
    Ext.getCmp('MAT_CL_IN').reset();
    Ext.getCmp('ACT_AMOUNT_IN').setValue(0);
    Ext.getCmp('F_PRICE_IN').setValue(0);
    Ext.getCmp('SOURCE').reset();
    Ext.getCmp('matWindow').show();
}

function _addMat() {

    Ext.Ajax.request({
        url: AppUrl + 'mwd/PRO_DJ602_ADDMAT',
        type: 'ajax',
        method: 'POST',
        params: {
            'ORDERID_IN': ORDERID,
            'MATERIALCODE_IN': Ext.getCmp('MATERIALCODE_IN').getSubmitValue(),
            'MATERIALNAME_IN': Ext.getCmp('MATERIALNAME_IN').getSubmitValue(),
            'ETALON_IN': Ext.getCmp('ETALON_IN').getSubmitValue(),
            'MAT_CL_IN': Ext.getCmp('MAT_CL_IN').getSubmitValue(),
            'F_PRICE_IN': Ext.getCmp('F_PRICE_IN').getSubmitValue(),
            'ACT_AMOUNT_IN': Ext.getCmp('ACT_AMOUNT_IN').getSubmitValue()
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.RET == 'Success') {
                Ext.data.StoreManager.lookup('orderMatStore').currentPage = 1;
                Ext.data.StoreManager.lookup('orderMatStore').load();
                Ext.getCmp('matWindow').hide();
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

function _showKCWindow() {
    _selectKC();
    Ext.getCmp('kcWindow').show();
}

function _saveMat(rowIdx) {
    var KY_AMOUNT = Ext.getStore('kcStore').data.items[rowIdx].data.KY_AMOUNT;
    var NUM = Ext.getStore('kcStore').data.items[rowIdx].data.NUM;

    if (NUM == '' && NUM == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '所需数量不能为空或零',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }

    if (KY_AMOUNT <= NUM) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '所需数量需大于库存数量',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }

    Ext.Ajax.request({
        url: AppUrl + 'mwd/PRO_DJ601_SAVEORDERMAT',
        type: 'ajax',
        method: 'POST',
        params: {
            'ORDERID_IN': ORDERID,
            'MATERIALCODE_IN': Ext.getStore('kcStore').data.items[rowIdx].data.MATERIALCODE,
            'MATERIALNAME_IN': Ext.getStore('kcStore').data.items[rowIdx].data.MATERIALNAME,
            'ETALON_IN': Ext.getStore('kcStore').data.items[rowIdx].data.ETALON,
            'MAT_CL_IN': '',//本页面没有材料参数，传空
            'F_PRICE_IN': Ext.getStore('kcStore').data.items[rowIdx].data.F_PRICE,
            'PLAN_AMOUNT_IN': Ext.getStore('kcStore').data.items[rowIdx].data.NUM,
            'USERCODE_IN': V_V_PERSONCODE,
            'USERNAME_IN': V_V_PERSONNAME,
            'KCID_IN': Ext.getStore('kcStore').data.items[rowIdx].data.KCID,
            'UNIT_IN': Ext.getStore('kcStore').data.items[rowIdx].data.UNIT
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.RET == 'Success') {
                Ext.Msg.alert('提示信息', '操作成功');
                Ext.getCmp('matWindow').hide();
                Ext.data.StoreManager.lookup('kcStore').load();
                Ext.data.StoreManager.lookup('orderMatStore').load();
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
