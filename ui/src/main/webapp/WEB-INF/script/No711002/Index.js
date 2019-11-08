var BJ_UNIQUE_CODE = null;
if (location.href.split('?')[1] != undefined) {
    BJ_UNIQUE_CODE = Ext.urlDecode(location.href.split('?')[1]).BJ_UNIQUE_CODE;
}

var win;
var returnValue;
Ext.onReady(function () {
    var zqlxStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'zqlxStore',
        fields: ['CYCLE_ID', 'CYCLE_DESC'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'LL/PRO_RUN_CYCLE_ABLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        }
    });

    var panel = Ext.create('Ext.panel.Panel', {
        id: 'panel',
        layout: 'column',
        frame: true,
        width: '100%',
        region: 'north',
        items: [{
            xtype: 'combo',
            id: 'zqlx',
            fieldLabel: '周期类型',
            store: zqlxStore,
            editable: false,
            displayField: 'CYCLE_DESC',
            valueField: 'CYCLE_ID',
            labelAlign: 'right',
            labelWidth: 70,
            style: 'margin:5px 0px 0px 10px'
        }, {
            xtype: 'textfield',
            id: 'bjz',
            fieldLabel: '报警值',
            labelAlign: 'right',
            labelWidth: 50,
            style: 'margin:5px 0px 0px 10px'
        }, {
            xtype: 'textfield',
            id: 'yjpyl',
            fieldLabel: '预警偏移量',
            labelAlign: 'right',
            labelWidth: 80,
            style: 'margin:5px 0px 0px 10px'
        }, {
            xtype: 'button',
            text: '添加（更新）预警设置',
            icon: imgpath + '/001.gif',
            width: 150,
            style: 'margin:8px 0px 0px 30px',
            listeners: {
                click: OnButtonAddUpdateYJSZClicked
            }
        }, {
            xtype: 'button',
            text: '关 闭',
            width: 60,
            icon: imgpath + '/application_go.png',
            style: 'margin:8px 0px 0px 20px',
            handler: function () {
                parent.returnValue = 'yes';
                _close();
            }
        }]
    });

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: true,
        fields: ['CYCLE_DESC', 'ALERT_VALUE', 'OFFSET'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'LL/PRO_RUN_BJ_CURRENT_ALERT',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                A_BJ_UNIQUE_CODE: BJ_UNIQUE_CODE
            }
        }
    });
    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        columnLines: true,
        region: 'center',
        width: '100%',
        store: gridStore,
        autoScroll: true,
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            sortable: false,
            align: 'center'
        }, {
            text: '周期类型',
            dataIndex: 'CYCLE_DESC',
            width: 200,
            align: 'center'
        }, {
            text: '报警值',
            dataIndex: 'ALERT_VALUE',
            width: 300,
            align: 'center'
        }, {
            text: '预警偏移量',
            dataIndex: 'OFFSET',
            width: 300,
            align: 'center'
        }]
    });

    zqlxStore.on("load", function () {
        Ext.getCmp("zqlx").select(Ext.data.StoreManager.lookup('zqlxStore').getAt(0));
    });

    Ext.create('Ext.container.Viewport', {
        split: true,
        layout: 'border',
        items: [panel, grid]
    });

});

function OnButtonAddUpdateYJSZClicked() {
    Ext.Ajax.request({
        url: AppUrl + 'LL/PRO_RUN_BJ_CURRENT_ALERT_SET',
        method: 'POST',
        params: {
            A_BJ_UNIQUE_CODE: BJ_UNIQUE_CODE,
            A_CYCLE_ID: Ext.getCmp('zqlx').getValue(),
            A_ALERT_VALUE: Ext.getCmp('bjz').getValue(),
            A_OFFSET: Ext.getCmp('yjpyl').getValue()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if (resp.RET == "Success") {
                Ext.example.msg('操作信息', '操作成功');
                Ext.data.StoreManager.lookup('gridStore').load({
                    params: {
                        A_BJ_UNIQUE_CODE: BJ_UNIQUE_CODE
                    }
                });
            } else {
                Ext.example.msg('操作信息', '操作失败');
            }
        }
    });
}

function _close() {
    parent.win.close();
}
