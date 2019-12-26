var checkOverRange;

Ext.onReady(function () {
    Ext.getBody().mask('加载中...');

    Ext.Ajax.request({//加载被修改对象
        url: AppUrl + 'specEquip/loadCheckOverRange',
        async: false,
        method: 'POST',
        params: {},
        callback: function (options, success, response) {
            if (success) {
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success) {
                    checkOverRange = resp.checkOverRange;
                }
            }
        }
    });

    var formPanel = Ext.create('Ext.form.Panel', {
        id: 'formPanel',
        layout: 'column',
        frame: true,
        autoScroll: true,
        defaults: {
            labelAlign: 'right',
            labelWidth: 100,
            inputWidth: 140,
            margin: '4'
        },
        items: [{
            xtype: 'numberfield',
            id: 'V_V_OVERDAY',
            name: 'V_V_OVERDAY',
            fieldLabel: '设定报警周期(天)',
            maxLength: 20,
            allowBlank: false
        }]
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        id: 'buttonPanel',
        defaults: {
            style: 'margin: 2px;'
        },
        items: [{
            xtype: 'button',
            text: '保存',
            handler: _insert
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
        defaults: {
            border: false
        },
        items: [{
            region: 'north',
            items: [buttonPanel]
        }, {
            region: 'center',
            layout: 'fit',
            items: [formPanel]
        }]
    });

    _init();
})

function _init() {
    for (var i = 0; i < Ext.data.StoreManager.getCount(); i++) {
        if (Ext.data.StoreManager.getAt(i).isLoading()) {
            return;
        }
    }

    if (checkOverRange == null) {
        Ext.MessageBox.alert('警告，加载数据失败', Ext.MessageBox.ERROR);
        return;
    }

    var form = Ext.getCmp('formPanel').getForm();
    form.findField("V_V_OVERDAY").setValue(checkOverRange.V_RET);
    Ext.getBody().unmask();
}

function _insert() {
    Ext.getCmp('formPanel').getForm().submit({
        url: AppUrl + 'specEquip/setCheckOverRange',
        method: 'POST',
        submitEmptyText: false,
        waitMsg: '处理中...',
        success: function (form, action) {
            var data = action.result;
            parent.returnValue = data.data.V_INFO;
            _close();
        },
        failure: function (form, action) {
            Ext.MessageBox.alert('提示', '保存失败！');
            return;
        }
    });
}

function _close() {
    parent.win.close();
}