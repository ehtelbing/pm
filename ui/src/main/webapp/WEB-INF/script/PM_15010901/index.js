/**
 * Created by LL on 2017/12/11.
 */
var userId = Ext.util.Cookies.get("v_personcode");
var userName = Ext.util.Cookies.get("v_personname2");
var orderId;

Ext.onReady(function () {
    var billStateStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'billStateStore',
        fields: ['ORDER_STATUS', 'ORDER_STATUS_DESC'],
        proxy: {
            type: 'ajax',
            async: true,
            url: AppUrl + 'LL/PRO_DJ901_ORDERSTATU_END',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'USERCODE_IN': userId
            }
        },
        listeners: {
            'load': function (store) {
                Ext.getCmp('state').select(store.first());
            }
        }
    });

    var checkPlantStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'checkPlantStore',
        fields: ['MENDDEPT_CODE', 'MENDDEPT_NAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'LL/PRO_DJ602_MENDDEPT_POWER',
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
            'load': function (store) {
                store.insert(0, {
                    'MENDDEPT_CODE': '%',
                    'MENDDEPT_NAME': '全部'
                });
                Ext.getCmp('plant').select(store.first());
            },
            'beforeload': checkPlantload
        }
    });

    var gridStore = Ext.create('Ext.data.Store', {
        storeId: 'gridStore',
        pageSize: 20,
        fields: ['ORDERID', 'APPLY_ID', 'DJ_UQ_CODE', 'DJ_NAME', 'MEND_CONTEXT', 'PLANTCODE', 'DEPARTCODE', 'MENDDEPT_CODE', 'MENDDEPT_NAME', 'MEND_USERID', 'MEND_USERNAME', 'PLAN_BEGINDATE', 'PLAN_ENDDATE', 'INSERTDATE', 'INSERT_USERID', 'INSERT_USERNAME', 'ACT_BEGINDATE', 'ACT_ENDDATE', 'EXA_FLAG', 'EXA_USERID', 'EXA_USERNAME', 'EXA_RESULT', 'ORDER_STATUS'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'LL/PRO_DJ901_SELECTORDERLIST',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        }
    });

    var gridStore2 = Ext.create('Ext.data.Store', {
        storeId: 'gridStore2',
        fields: ['ID', 'ORDERID', 'COST_ITEM', 'COST_MONEY', 'INSERT_USERNAME', 'INSERT_USERID', 'INSERTDATE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'LL/PRO_DJ901_COSTLIST',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var inputPanel = Ext.create('Ext.panel.Panel', {
        titleAlign: 'left',
        region: 'north',
        layout: 'vbox',
        frame: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            baseCls: 'my-panel-noborder',
            layout: 'hbox',
            items: [{
                id: 'billcode',
                align: 'left',
                xtype: 'textfield',
                fieldLabel: '工单号',
                style: ' margin: 10px 0px 0px 20px',
                labelAlign: 'right',
                labelWidth: 80
            }, {
                id: 'begindate',
                xtype: 'datefield',
                align: 'left',
                fieldLabel: '起始日期',
                format: 'Y-m-d',
                value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                editable: false,
                style: ' margin: 10px 0px 0px 20px',
                labelAlign: 'right',
                labelWidth: 80
            }, {
                id: 'enddate',
                xtype: 'datefield',
                align: 'left',
                fieldLabel: '结束日期',
                format: 'Y-m-d',
                value: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
                editable: false,
                style: ' margin: 10px 0px 0px 20px',
                labelAlign: 'right',
                labelWidth: 80
            }]
        }, {
            xtype: 'panel',
            region: 'center',
            baseCls: 'my-panel-noborder',
            layout: 'hbox',
            items: [{
                id: 'state',
                xtype: 'combo',
                align: 'left',
                fieldLabel: '工单状态',
                store: billStateStore,
                editable: false,
                displayField: 'ORDER_STATUS_DESC',
                valueField: 'ORDER_STATUS',
                queryMode: 'local',
                style: ' margin: 10px 0px 0px 20px',
                labelAlign: 'right',
                labelWidth: 80,
                listeners: {
                    change: function (store, newValue, oldValue, eOpts) {
                        if (oldValue == '' || oldValue == null) {
                            Ext.data.StoreManager.lookup('checkPlantStore').load();
                        } else {
                            Ext.data.StoreManager.lookup('checkPlantStore').load();
                        }
                    }
                }
            },
                {
                    id: 'plant',
                    xtype: 'combo',
                    fieldLabel: '检修单位',
                    align: 'left',
                    store: checkPlantStore,
                    editable: false,
                    displayField: 'MENDDEPT_NAME',
                    valueField: 'MENDDEPT_CODE',
                    queryMode: 'local',
                    style: ' margin: 10px 0px 0px 20px',
                    labelAlign: 'right',
                    labelWidth: 80
                },
                {
                    id: 'djcode',
                    xtype: 'textfield',
                    align: 'left',
                    fieldLabel: '电机编号',
                    style: ' margin: 10px 0px 0px 20px',
                    labelAlign: 'right',
                    labelWidth: 80
                }]
        }, {
            xtype: 'panel',
            region: 'west',
            baseCls: 'my-panel-noborder',
            layout: 'hbox',
            items: [{
                xtype: 'textfield',
                style: ' margin: 10px 0px 0px 20px',
                value: '',
                fieldLabel: '电机名称',
                id: 'djname',
                labelAlign: 'right',
                labelWidth: 80
            }, {
                xtype: 'button',
                id: 'search',
                text: '查  询',
                width: '60',
                icon: imgpath + '/search.png',
                style: ' margin: 10px 0px 10px 45px',
                handler: OnClickSearch
            }, {
                xtype: 'button',
                id: 'toExcel',
                text: '导出Excel',
                width: '100',
                icon: imgpath + '/excel.gif',
                style: ' margin: 10px 0px 10px 10px',
                handler: OnClickOutExcel
            }]
        }]
    });

    var gridPanel = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel',
        region: 'center',
        columnLines: true,
        width: '100%',
        autoScroll: true,
        store: gridStore,
        dufaults: {
            width: 120
        },
        columns: [{
            text: '录入费用',
            align: 'center',
            width: 100,
            renderer: inputMore
        }, {
            text: '工单号',
            dataIndex: 'ORDERID',
            align: 'center',
            width: 100,
            renderer: left
        }, {
            text: '检修单位名',
            dataIndex: 'MENDDEPT_NAME',
            align: 'center',
            width: 170,
            renderer: left
        }, {
            text: '检修内容',
            dataIndex: 'MEND_CONTEXT',
            align: 'center',
            width: 160,
            renderer: left
        }, {
            text: '录入人',
            dataIndex: 'INSERT_USERNAME',
            align: 'center',
            width: 130,
            renderer: left
        }, {
            text: '录入时间',
            dataIndex: 'INSERTDATE',
            align: 'center',
            width: 120,
            renderer: atleft1
        }, {
            text: '电机编号',
            dataIndex: 'DJ_UQ_CODE',
            align: 'center',
            width: 110,
            renderer: left
        }, {
            text: '电机名称',
            dataIndex: 'DJ_NAME',
            align: 'center',
            width: 110,
            renderer: left
        }],
        bbar: ['->', {
            xtype: 'pagingtoolbar',
            id: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }],
        dockedItems: [inputPanel]
    });

    var inputPanel1 = Ext.create('Ext.panel.Panel', {
        id: 'inputPanel1',
        xtype: 'panel',
        region: 'north',
        frame: true,
        layout: {
            type: 'vbox'
        },
        defaults: {
            baseCls: 'my-panel-noborder'
        },
        margin: 1,
        items: [{
            xtype: 'textfield',
            fieldLabel: '工单号',
            id: 'ORDERID',
            readOnly: true,
            style: ' margin: 10px 0px 0px 20px'
        }, {
            xtype: 'textfield',
            fieldLabel: '费用项目',
            style: ' margin: 10px 0px 0px 20px',
            id: 'COST_ITEM'
        }, {
            xtype: 'numberfield',
            fieldLabel: '费用',
            style: ' margin: 10px 0px 0px 20px',
            id: 'COST_MONEY'
        }]
    });

    var panelCenter1 = Ext.create('Ext.grid.Panel', {
        id: 'panelCenter1',
        columnLines: true,
        width: '100%',
        region: 'center',
        store: gridStore2,
        autoScroll: true,
        features: {
            ftype: 'summary'
        },
        frame: true,
        defaults: {
            baseCls: 'my-panel-noborder'
        },
        columns: [{
            text: '项目名称',
            dataIndex: 'COST_ITEM',
            align: 'center',
            width: 170,
            renderer:left
        }, {
            text: '费用金额',
            dataIndex: 'COST_MONEY',
            align: 'center',
            width: 170,
            summaryType: 'sum',
            summaryRenderer: function (value, metaData,summaryData, dataIndex) {
                metaData.style = "text-align:right;";
                return "合计：" + Ext.util.Format.number(value, '0.00');
            },
            renderer: right
        }, {
            text: '录入人',
            dataIndex: 'INSERT_USERNAME',
            align: 'center',
            width: 130,
            renderer:left
        }, {
            text: '录入时间',
            dataIndex: 'INSERTDATE',
            align: 'center',
            width: 120,
            renderer:atleft1
        }, {
            text: '删除',
            align: 'center',
            width: 60,
            renderer: deleteMore
        }],
        dockedItems: [inputPanel1]
    });

    var dialog = Ext.create('Ext.window.Window', {
        id: 'dialog',
        title: '录入工单费用',
        width: 750,
        height: 400,
        modal: true,
        plain: true,
        closable: true,
        closeAction: 'hide',
        model: true,
        layout: 'border',
        frame: true,
        items: [{
            region: 'center',
            layout: 'fit',
            border: false,
            items: [panelCenter1]
        }],
        buttons: [{
            text: '录入',
            margin: '0px 0px 0px 10px',
            icon: imgpath + '/add.png',
            handler: _save
        }, {
            text: '取 消',
            icon: imgpath + '/cross.png',
            margin: '0px 0px 0px 10px',
            handler: _delete
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
            region: 'center',
            layout: 'fit',
            border: false,
            items: [gridPanel]
        }]
    });
});

function checkPlantload(store) {
    store.proxy.extraParams = {
        'USERCODE_IN': userId,
        'ORDER_STATUS_IN': Ext.getCmp("state").getValue()
    }
}
function OnClickSearch() {
    var proxy = Ext.data.StoreManager.lookup('gridStore').getProxy();
    proxy.extraParams.ORDERID_IN = Ext.getCmp('billcode').getValue();
    proxy.extraParams.STARTDATE_IN = Ext.util.Format.date(Ext.getCmp('begindate').getValue(), 'Y-m-d');
    proxy.extraParams.ENDDATE_IN = Ext.util.Format.date(Ext.getCmp('enddate').getValue(), 'Y-m-d');
    proxy.extraParams.ORDER_STATUS_IN = Ext.getCmp('state').getValue();
    proxy.extraParams.MENDDEPT_CODE_IN = Ext.getCmp('plant').getValue();
    proxy.extraParams.DJ_UQ_CODE_IN = Ext.getCmp('djcode').getValue();
    proxy.extraParams.DJ_NAME = Ext.getCmp('djname').getValue();
    Ext.data.StoreManager.lookup('gridStore').currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore').load();
}
function OnClickOutExcel() {
    document.location.href = AppUrl + '/LL/No15010901Excel?ORDERID_IN=' + Ext.getCmp('billcode').getValue()
    + '&&STARTDATE_IN=' + Ext.util.Format.date(Ext.getCmp('begindate').getValue(), 'Y-m-d')
    + '&&ENDDATE_IN=' + Ext.util.Format.date(Ext.getCmp('enddate').getValue(), 'Y-m-d')
    + '&&ORDER_STATUS_IN=' + Ext.getCmp('state').getValue()
    + '&&MENDDEPT_CODE_IN=' + encodeURI(encodeURI(Ext.getCmp('plant').getValue()))
    + '&&DJ_UQ_CODE_IN=' + Ext.getCmp('djcode').getValue()
    + '&&DJ_NAME=' + Ext.getCmp('djname').getValue()
    + '&&VTITLE=工单维修费用管理';
}
function inputMore(value, metaData, record, rowIdx, colIdx, store, view) {
    return "<a onclick='OnOpen(\"" + rowIdx + "\")' style='color:blue'>录入</a>";
}
function OnOpen(rowIdx) {
    orderId = Ext.data.StoreManager.lookup('gridStore').data.getAt(rowIdx).data.ORDERID;
    Ext.getCmp('dialog').show();
    Ext.getCmp('ORDERID').setValue(orderId);
    OnClickSearch1();
}
function deleteMore(value, metaData, record, rowIdx, colIdx, store, view) {
    return "<a onclick='openDelete(\"" + rowIdx + "\")' style='color:blue'>删除</a>";
}
function openDelete(rowIdx) {
    var id = Ext.data.StoreManager.lookup('gridStore2').data.getAt(rowIdx).data.ID;
    Ext.Msg.confirm("提示", "确定要删除吗？", function (button) {
        if (button != "yes") {
            return;
        }
        Ext.Ajax.request({
            url: AppUrl + 'LL/PRO_DJ901_DELETECOST',
            type: 'ajax',
            async: false,
            method: 'POST',
            params: {
                'ID_IN': id
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);
                if (data.RET == "Success") {
                    OnClickSearch1();
                } else {
                    Ext.Msg.alert('提示', "操作失败！");
                }
            }
        });
    });
}
function OnClickSearch1() {
    Ext.data.StoreManager.lookup('gridStore2').load({
        params: {
            'ORDERID_IN': orderId
        }
    })
}
function _save() {
    Ext.Ajax.request({
        url: AppUrl + 'LL/PRO_DJ901_INPUTCOST',
        method: 'POST',
        params: {
            'ORDERID_IN': orderId,
            'COST_ITEM_IN': Ext.getCmp('COST_ITEM').getValue(),
            'COST_MONEY_IN': Ext.getCmp('COST_MONEY').getValue(),
            'INSERT_USERID_IN': userId,
            'INSERT_USERNAME_IN': userName
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.RET == "Success") {
                Ext.getCmp('COST_ITEM').reset();
                Ext.getCmp('COST_MONEY').reset();
                OnClickSearch1();
            } else {
                Ext.Msg.alert('提示', "操作失败！");
            }
        }
    });
}
function _delete() {
    Ext.getCmp("dialog").hide();
}
function left(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}

function right(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}
function atleft1(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value.split(' ')[0];
}