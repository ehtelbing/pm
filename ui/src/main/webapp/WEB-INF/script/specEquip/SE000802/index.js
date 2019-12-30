var statusList = [{
    I_ISUSE_NAME: '是',
    I_ISUSE: '1'
}, {
    I_ISUSE_NAME: '否',
    I_ISUSE: '0'
}];

Ext.define('Ext.ux.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    async: true,
    doRequest: function (operation, callback, scope) {
        var writer = this.getWriter(),
            request = this.buildRequest(operation);
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        Ext.apply(request, {
            async: this.async,
            binary: this.binary,
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, callback, scope),
            method: this.getMethod(request),
            disableCaching: false
        });
        Ext.Ajax.request(request);
        return request;
    }
});

Ext.onReady(function () {
    Ext.getBody().mask('页面加载中...');

    var attachmentTypeStore = Ext.create('Ext.data.Store', {
        storeId: 'attachmentTypeStore',
        autoLoad: true,//true为自动加载
        loading: true,//自动加载时必须为true
        fields: ['V_ATTACHNAME', 'V_EQUTYPE', 'I_ISUSE', 'I_ORDERID', 'I_ID',],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'specEquip/selectAttachmentType',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {},
        }),
        listeners: {
            load: function (store, records, successful, eOpts) {
                //    Ext.getCmp("I_ISUSE").select(store.first());
                _init();//自动加载时必须调用
            }
        }
    });


    var isUseStore = Ext.create("Ext.data.Store", {
        storeId: 'isUseStore',
        fields: ['I_ISUSE_NAME', 'I_ISUSE'],
        data: statusList,
        proxy: {
            async: true,//false=同步
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'statusList',
            }
        }
    });

    var but = Ext.create('Ext.Panel', {
        id: 'but',
        border: false,
        items: [{
            xtype: 'button',
            text: '保存',
            handler: _insert
        }]
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        id: 'buttonPanel',
        frame: true,
        defaults: {
            style: 'margin: 2px;'
        },
        items: [{
            xtype: 'button',
            text: '刷新',
            handler: _refresh
        }, {
            xtype: 'button',
            text: '新增',
            handler: _newAdd
        }, {
            xtype: 'button',
            text: '修改',
            handler: _update
        }, {
            xtype: 'button',
            text: '删除',
            handler: _delete
        }]
    });

    var formPanel = Ext.create('Ext.form.Panel', {
        id: 'formPanel',
        name: 'formPanel',
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
            xtype: 'textfield',
            id: 'I_ID',
            name: 'I_ID',
            fieldLabel: 'ID',
            maxLength: 20,
            hidden: true
        }, {
            xtype: 'textfield',
            id: 'V_V_PERSONCODE',
            name: 'V_V_PERSONCODE',
            fieldLabel: 'V_V_PERSONCODE',
            maxLength: 20,
            hidden: true
        }, {
            xtype: 'textfield',
            id: 'V_V_ATTACHNAME',
            name: 'V_V_ATTACHNAME',
            fieldLabel: '附件类型',
            maxLength: 20,
            allowBlank: false
        }, {
            xtype: 'combo',
            id: 'V_V_EQUTYPE',
            name: 'V_V_EQUTYPE',
            store: attachmentTypeStore,
            queryMode: 'local',//获取本地数据
            valueField: 'V_EQUTYPE',
            displayField: 'V_EQUTYPE',
            editable: false,
            forceSelection: true,//输入错误，会显示一个最接近的值
            fieldLabel: '所属设备类型'
        }, {
            xtype: 'combo',
            id: 'I_I_ISUSE',
            name: 'I_I_ISUSE',
            store: isUseStore,
            queryMode: 'local',//获取本地数据
            valueField: 'I_ISUSE',
            displayField: 'I_ISUSE_NAME',
            editable: false,
            forceSelection: true,//输入错误，会显示一个最接近的值
            fieldLabel: '是否使用'

        }, {
            xtype: 'numberfield',
            id: 'I_I_ORDERID',
            name: 'I_I_ORDERID',
            fieldLabel: '排序id',
            maxLength: 20,
            allowBlank: false
        }, {
            items: [but],
            border: false
        }]
    });

    var selectPanel = Ext.create('Ext.grid.Panel', {
        id: 'selectPanel',
        store: attachmentTypeStore,
        title: '设备移装申请',
        columnLines: true,
        frame: true,
        style: {
            border: 0
        },
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns: [{
            text: '序号',
            xtype: "rownumberer",
            width: '100px'
        }, {
            text: '附件类型',
            dataIndex: 'V_ATTACHNAME',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '所属设备类型',
            dataIndex: 'V_EQUTYPE',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '是否使用',
            dataIndex: 'I_ISUSE',
            style: 'text-align: center;',
            flex: 1,
            renderer: function (value) {
                return (value != null && value != '') ? isUseStore.findRecord('I_ISUSE', new RegExp('^' + value + '$')).get('I_ISUSE_NAME') : value;
            }
        }, {
            text: '排序id',
            dataIndex: 'I_ORDERID',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: 'ID',
            dataIndex: 'I_ID',
            style: 'text-align: center;',
            flex: 1
        }],
        viewConfig: {
            emptyText: '<div style="text-align: center; padding-top: 50px; font: italic bold 20px Microsoft YaHei;">没有数据</div>',
            enableTextSelection: true
        }
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
            items: [buttonPanel, formPanel]
        }, {
            region: 'center',
            layout: 'fit',
            items: [selectPanel]
        }]
    });

    _init();

});

function _init() {
    for (var i = 0; i < Ext.data.StoreManager.getCount(); i++) {
        if (Ext.data.StoreManager.getAt(i).isLoading()) {
            return;
        }
        var attachmentTypeStore = Ext.data.StoreManager.lookup('attachmentTypeStore');
        var isUseStore = Ext.data.StoreManager.lookup('isUseStore');
        var form = Ext.getCmp('formPanel').getForm();
        form.findField('V_V_PERSONCODE').setValue(Ext.util.Cookies.get('v_personcode'));
        form.findField('I_I_ISUSE').setValue('1');
        form.findField('V_V_EQUTYPE').setRawValue(" ");

    }

    form.isValid();//校验数据

    Ext.getBody().unmask();
}


//修改
function _update() {

    var records = Ext.getCmp('selectPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.Msg.alert('提示', '请选择一条数据！');
        return;
    } else {
        var form = Ext.getCmp('formPanel').getForm();

        form.findField('I_ID').setValue(records[0].get('I_ID'));
        form.findField('V_V_ATTACHNAME').setValue(records[0].get('V_ATTACHNAME'));
        form.findField('V_V_EQUTYPE').setValue(records[0].get('V_EQUTYPE'));
        form.findField('I_I_ISUSE').setValue((records[0].get('I_ISUSE')).toString() == '1' ? '1' : '0');
        form.findField('I_I_ORDERID').setValue(records[0].get('I_ORDERID'));
        form.findField('V_V_PERSONCODE').setValue(Ext.util.Cookies.get('v_personcode'));
    }

}

//刷新
function _refresh() {
    var attachmentTypeStore = Ext.data.StoreManager.lookup('attachmentTypeStore');
    attachmentTypeStore.load()
}

//新增
function _newAdd() {
    var attachmentTypeStore = Ext.data.StoreManager.lookup('attachmentTypeStore');
    var isUseStore = Ext.data.StoreManager.lookup('isUseStore');
    Ext.getCmp('V_V_ATTACHNAME').setValue('');
    Ext.getCmp('V_V_EQUTYPE').setRawValue(attachmentTypeStore.getById().get('V_EQUTYPE'));
    Ext.getCmp('I_I_ISUSE').setRawValue(isUseStore.getById().get('I_ISUSE_NAME'));
    Ext.getCmp('I_I_ORDERID').setValue('');

}

//删除
function _delete() {
    var records = Ext.getCmp('selectPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.Msg.alert('提示', '请选择一条数据！！！！');
        return;
    }

    Ext.MessageBox.show({
        title: '请确认',
        msg: '删除',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESTION,
        fn: function (btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    url: AppUrl + 'specEquip/deleteAttachmentType',
                    async: false,
                    params: {
                        'I_I_ID': records[0].get('I_ID')
                    },
                    callback: function (options, success, response) {
                        if (success) {
                            var data = Ext.decode(response.responseText);
                            if (data.data.V_INFO == '删除成功！') {
                                Ext.MessageBox.alert('删除成功', data.data.V_INFO);
                                Ext.data.StoreManager.lookup('attachmentTypeStore').remove(records[0]);//前台删除被删除数据
                                _refresh()
                            } else {
                                Ext.MessageBox.alert('删除失败', data.data.V_INFO);
                            }
                        } else {
                            Ext.MessageBox.alert('删除失败', '删除失败');
                        }
                    }
                });
            }
        }
    });
}

//保存
function _insert() {
    Ext.getCmp('formPanel').getForm().submit({
        url: AppUrl + 'specEquip/setAttachmentType',
        submitEmptyText: false,
        waitMsg: '<spring:message code="processing" />',
        success: function (form, action) {
            var resp = action.result;
            if (resp.data.V_INFO == '保存成功！') {
                Ext.MessageBox.alert('操作成功', resp.data.V_INFO);
            } else {
                Ext.MessageBox.alert('操作失败', '操作失败');
            }
            _refresh()
        },
        failure: function (form, action) {
            Ext.MessageBox.alert('操作失败', '操作失败');
        }
    });
}


