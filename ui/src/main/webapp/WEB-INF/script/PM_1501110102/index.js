var globl_code = '';
var userid = Ext.util.Cookies.get('v_personcode');
var username = Ext.util.Cookies.get('v_personname2');
var gridStoreLoad = false;
Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
    var xmlxStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'xmlxStore',
        fields: ['ITEMTYPE', 'ITEMTYPE_DESC'],
        proxy: {
            type: 'ajax',
            url: AppUrl + '/yjn/PRO_SY102_ITEMTYPELIST',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        listeners: {
            load: function () {
                Ext.getCmp("itemtype").select(xmlxStore.getAt(0));
            }
        }
    });

    var gridStore = Ext.create('Ext.data.Store',
        {
            storeId: 'gridStore',
            autoLoad: true,
            fields: ['ITEM_CODE', 'ITEM_NAME', 'ITEM_STATUS',
                'ITEM_INSERTDATE', 'ITEM_USERNAME', 'ITEM_TABLENAME'
                , 'ITEM_URL', 'ITEMTYPE', 'ITEM_OPURL', 'ITEMTYPE_DESC'],
            proxy: {
                type: 'ajax',
                url: AppUrl + '/yjn/PRO_SY102_ITEMLIST',
                actionMethods: {
                    read: 'POST'
                },
                reader: {
                    type: 'json',
                    root: 'list'
                }
            },
            listeners: {
                load: function (store, records) {
                    gridStoreLoad = true;
                    _init();
                }
            }
        });

    var panel = Ext.create('Ext.panel.Panel', {
        title: '试验项目数据设置',
        titleAlign: 'left',
        region: 'north',
        layout: 'column',
        frame: true,
        items: [{
            xtype: 'button',
            id: 'add',
            text: '新增',
            icon: imgpath + '/add.png',
            style: ' margin: 5px 0px 5px 5px',
            listeners: {
                click: OnClickAdd
            }
        }, {
            xtype: 'button',
            text: '修改',
            icon: imgpath + '/edit.png',
            style: ' margin: 5px 0px 5px 5px',
            listeners: {
                click: OnClickEdit
            }
        }, {
            xtype: 'button',
            text: '删除',
            icon: imgpath + '/delete.png',
            style: ' margin: 5px 0px 5px 5px',
            listeners: {
                click: OnClickSubmitDelete
            }
        }]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        store: 'gridStore',
        id: 'grid',
        columnLines: true,
        region: 'center',
        autoScroll: true,
        selType: 'checkboxmodel',
        selModel: {
            mode: 'SIMPLE'
        },
        columns: [{
            text: '项目编号',
            align: 'center',
            width: 120,
            dataIndex: 'ITEM_CODE'
        }, {
            text: '项目名称',
            align: 'center',
            width: 120,
            dataIndex: 'ITEM_NAME'
        }, {
            text: '使用状态',
            align: 'center',
            dataIndex: 'ITEM_STATUS',
            width: 80,
            renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                if (value ==1) {
                    return '启用';
                }else if (value ==0) {
                    return '停用';
                }
                return null;
            }
        }, {
            text: '录入时间',
            align: 'center',
            width: 120,
            dataIndex: 'ITEM_INSERTDATE',
            renderer: Ext.util.Format.dateRenderer('Y-m-d')
        }, {
            text: '录入人',
            align: 'center',
            width: 80,
            dataIndex: 'ITEM_USERNAME'
        }, {
            text: '默认记录表名',
            align: 'center',
            width: 120,
            dataIndex: 'ITEM_TABLENAME'
        }, {
            text: '默认打印URL',
            align: 'center',
            width: 120,
            dataIndex: 'ITEM_URL'
        }, {
            text: '默认操作URL',
            align: 'center',
            width: 120,
            dataIndex: 'ITEM_OPURL'
        }, {
            text: '项目类型',
            align: 'center',
            width: 80,
            dataIndex: 'ITEMTYPE_DESC'
        }, {
            text: '启用',
            align: 'center',
            width: 80,
            renderer: renderer_start
        }, {
            text: '停用',
            align: 'center',
            width: 80,
            renderer: renderer_stop
        }],
        dockedItems: [panel]
    });

    var dialogAdd = Ext.create('Ext.window.Window', {
        id: 'dialogAdd',
        closeAction: 'hide',
        title: '新增',
        width: 300,
        height: 350,
        modal: true,
        frame: true,
        layout: 'vbox',
        items: [{
            xtype: 'textfield',
            labelAlign: 'right',
            style: 'margin: 20px 0px 5px 10px',
            fieldLabel: '项目编号',
            id: 'item_code',
            labelWidth: 80
        }, {
            xtype: 'textfield',
            labelAlign: 'right',
            style: 'margin: 10px 0px 5px 10px',
            fieldLabel: '项目名称',
            id: 'item_name',
            labelWidth: 80
        }, {
            xtype: 'textfield',
            labelAlign: 'right',
            style: 'margin: 10px 0px 5px 10px',
            fieldLabel: '默认表名',
            id: 'item_tablename',
            labelWidth: 80
        }, {
            xtype: 'textfield',
            labelAlign: 'right',
            style: 'margin: 10px 0px 5px 10px',
            fieldLabel: '默认打印URL',
            id: 'item_url',
            labelWidth: 80
        }, {
            xtype: 'textfield',
            labelAlign: 'right',
            style: 'margin: 10px 0px 5px 10px',
            fieldLabel: '默认操作URL',
            id: 'item_opurl',
            labelWidth: 80
        }, {
            xtype: 'combo',
            labelAlign: 'right',
            style: 'margin: 10px 0px 5px 10px',
            fieldLabel: '项目类型',
            editable: false,
            queryMode: 'local',
            displayField: 'ITEMTYPE_DESC',
            valueField: 'ITEMTYPE',
            id: 'itemtype',
            labelWidth: 80,
            store: xmlxStore
        }],
        buttons: [{
            id: 'submitadd',
            text: '保存',
            icon: imgpath + '/filesave.png',
            width: 60,
            listeners: {
                click: OnClickSubmitAdd
            }
        }]
    });

    var dialogEdit = Ext.create('Ext.window.Window', {
        id: 'dialogEdit',
        closeAction: 'hide',
        title: '修改',
        width: 300,
        height: 350,
        modal: true,
        frame: true,
        layout: 'vbox',
        items: [{
            xtype: 'textfield',
            labelAlign: 'right',
            readOnly: true,
            style: 'margin: 20px 0px 5px 10px',
            fieldLabel: '项目编号',
            id: 'item_code_edit',
            labelWidth: 80
        }, {
            xtype: 'textfield',
            labelAlign: 'right',
            style: 'margin: 10px 0px 5px 10px',
            fieldLabel: '项目名称',
            id: 'item_name_edit',
            labelWidth: 80
        }, {
            xtype: 'textfield',
            labelAlign: 'right',
            style: 'margin: 10px 0px 5px 10px',
            fieldLabel: '默认表名',
            id: 'item_tablename_edit',
            labelWidth: 80
        }, {
            xtype: 'textfield',
            labelAlign: 'right',
            style: 'margin: 10px 0px 5px 10px',
            fieldLabel: '默认打印URL',
            id: 'item_url_edit',
            labelWidth: 80
        }, {
            xtype: 'textfield',
            labelAlign: 'right',
            style: 'margin: 10px 0px 5px 10px',
            fieldLabel: '默认操作URL',
            id: 'item_opurl_edit',
            labelWidth: 80
        }, {
            xtype: 'combo',
            labelAlign: 'right',
            editable: false,
            style: 'margin: 10px 0px 5px 10px',
            fieldLabel: '项目类型',
            queryMode: 'local',
            displayField: 'ITEMTYPE_DESC',
            valueField: 'ITEMTYPE',
            id: 'itemtype_edit',
            labelWidth: 80,
            store: xmlxStore
        }],
        buttons: [{
            id: 'sureedit',
            text: '保存',
            icon: imgpath + '/filesave.png',
            width: 60,
            listeners: {
                click: OnClickSubmitEdit
            }
        }]
    });

    Ext.create('Ext.container.Viewport', {
        layout: 'fit',
        items: [grid]
    });
    _init();
});

function _init() {
    if (gridStoreLoad) {
        Ext.getBody().unmask();//去除页面笼罩
    }

}

function OnClickAdd() {
    Ext.getCmp('item_code').reset();
    Ext.getCmp('item_name').reset();
    Ext.getCmp('item_tablename').reset();
    Ext.getCmp('item_url').reset();
    Ext.getCmp('item_opurl').reset();
    Ext.getCmp("itemtype").select(Ext.data.StoreManager.lookup('xmlxStore').first());
    Ext.getCmp('dialogAdd').show();
}

function OnClickEdit() {
    var selectModel = Ext.getCmp("grid").getSelectionModel().getSelection();
    if (selectModel.length > 1) {
        Ext.Msg.alert('提示', '不能同时修改多条记录！');
    }
    else if (selectModel.length > 0) {
        globl_code = selectModel[0].data.ITEM_CODE;
        Ext.getCmp('item_code_edit').setValue(
            selectModel[0].data.ITEM_CODE);
        Ext.getCmp('item_name_edit').setValue(
            selectModel[0].data.ITEM_NAME);
        Ext.getCmp('item_tablename_edit').setValue(
            selectModel[0].data.ITEM_TABLENAME);
        Ext.getCmp('item_url_edit').setValue(
            selectModel[0].data.ITEM_URL);
        Ext.getCmp('item_opurl_edit').setValue(
            selectModel[0].data.ITEM_OPURL);
        Ext.getCmp("itemtype_edit").select(selectModel[0].data.ITEMTYPE_DESC);
        Ext.getCmp('dialogEdit').show();
    } else {
        Ext.Msg.alert('提示', '请选择一条记录！');
    }

}

function OnClickDelete() {
    Ext.Msg.confirm('提示', '是否删除?', function (button) {
        if (button == "yes") {
            OnClickSubmitDelete();
        }
    });
}

function OnStartButtonClicked() {
    Ext.Ajax.request({
        url: AppUrl + '/yjn/PRO_SY102_STARTITEM',
        method: 'POST',
        params: {
            ITEMCODE_IN: Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.ITEM_CODE
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.RET == 'Success') {
                Ext.data.StoreManager.lookup('gridStore').load();
                Ext.Msg.alert('操作信息', '启用成功');
            } else
                Ext.Msg.alert('操作信息', '启用失败');
        }
    });
}

function OnStopButtonClicked() {
    Ext.Ajax.request({
        url: AppUrl + '/yjn/PRO_SY102_STOPITEM',
        method: 'POST',
        params: {
            ITEMCODE_IN: Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.ITEM_CODE
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.RET == 'Success') {
                Ext.data.StoreManager.lookup('gridStore').load();
                Ext.Msg.alert('操作信息', '停用成功');
            } else
                Ext.Msg.alert('操作信息', '停用失败');
        }
    });
}

function OnClickSubmitEdit() {
    if (Ext.getCmp('item_code_edit').getValue() == '') {
        Ext.Msg.alert('错误操作', '项目编号不能为空!')
    } else if (Ext.getCmp('item_name_edit').getValue() == '') {
        Ext.Msg.alert('错误操作', '项目名称不能为空!')
    } else if (Ext.getCmp('item_tablename_edit').getValue() == '') {
        Ext.Msg.alert('错误操作', '默认表名不能为空!')
    } else if (Ext.getCmp('item_url_edit').getValue() == '') {
        Ext.Msg.alert('错误操作', '默认打印URL不能为空!')
    } else if (Ext.getCmp('item_opurl_edit').getValue() == '') {
        Ext.Msg.alert('错误操作', '默认操作URL不能为空!')
    } else {
        Ext.Ajax.request({
            url: AppUrl + '/yjn/PRO_SY102_UPDATEITEM',
            method: 'post',
            params: {
                ITEMCODE_IN: Ext.getCmp('item_code_edit').getValue(),
                ITEMNAME_IN: Ext.getCmp('item_name_edit').getValue(),
                TABLENAME_IN: Ext.getCmp('item_tablename_edit').getValue(),
                URL_IN: Ext.getCmp('item_url_edit').getValue(),
                OPURL_IN: Ext.getCmp('item_opurl_edit').getValue(),
                ITEMTYPECODE_IN: Ext.getCmp('itemtype_edit').getValue(),
                USERCODE_IN: userid,
                USERNAME_IN: username
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);//后台返回的值
                if (data.RET == 'Success') {//成功，会传回true
                    Ext.data.StoreManager.lookup('gridStore').load();
                    Ext.getCmp('dialogEdit').close();
                    Ext.MessageBox.alert('提示', data.RET_MSG);
                } else {
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: data.RET_MSG,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
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
}

function OnClickSubmitAdd() {
    if (Ext.getCmp('item_code').getValue() == '') {
        Ext.Msg.alert('错误操作', '项目编号不能为空!')
    } else if (Ext.getCmp('item_name').getValue() == '') {
        Ext.Msg.alert('错误操作', '项目名称不能为空!')
    } else if (Ext.getCmp('item_tablename').getValue() == '') {
        Ext.Msg.alert('错误操作', '默认表名不能为空!')
    } else if (Ext.getCmp('item_url').getValue() == '') {
        Ext.Msg.alert('错误操作', '默认打印URL不能为空!')
    } else if (Ext.getCmp('item_opurl').getValue() == '') {
        Ext.Msg.alert('错误操作', '默认操作URL不能为空!')
    } else {
        Ext.Ajax.request({
            url: AppUrl + '/yjn/PRO_SY102_ADDITEM',
            method: 'post',
            params: {
                ITEMCODE_IN: Ext.getCmp('item_code').getValue(),
                ITEMNAME_IN: Ext.getCmp('item_name').getValue(),
                TABLENAME_IN: Ext.getCmp('item_tablename').getValue(),
                URL_IN: Ext.getCmp('item_url').getValue(),
                OPURL_IN: Ext.getCmp('item_opurl').getValue(),
                ITEMTYPECODE_IN: Ext.getCmp('itemtype').getValue(),
                USERCODE_IN: userid,
                USERNAME_IN: username
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);//后台返回的值
                if (data.RET == 'Success') {//成功，会传回true
                    //_selectEquList();
                    Ext.data.StoreManager.lookup('gridStore').load();
                    Ext.getCmp('dialogAdd').close();
                    Ext.MessageBox.alert('提示', data.RET_MSG);
                } else {
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: data.RET_MSG,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
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
}

function OnClickSubmitDelete() {
    var i_err = 0;
    var msg;
    var records = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (records.length == 0) {
        Ext.Msg.alert('操作信息', '请选择需要删除的数据');
    }
    else {
        Ext.Msg.confirm('提示', '是否删除?', function (button) {
            if (button == "yes") {
                for (var i = 0; i < records.length; i++) {
                    Ext.Ajax.request({
                        url: AppUrl + '/yjn/PRO_SY102_DELETEITEM',
                        type: 'ajax',
                        method: 'post',
                        async: false,
                        params: {
                            ITEMCODE_IN: records[i].data.ITEM_CODE
                        },
                        success: function (response) {
                            var data = Ext.decode(response.responseText);
                            if (data.RET == 'Success') {
                                i_err++;
                            }
                        }
                    });
                }
                if (i_err == 0) {
                    Ext.Msg.alert('操作信息', '删除失败');
                }
                else {
                    Ext.data.StoreManager.lookup('gridStore').load();
                }
            }
        });
    }
}

function renderer_start(value, metaData, record, rowIdx, colIdx, store, view) {
    var status = record.data.ITEM_STATUS;
    if (status == '0') {
        return "<img src='"
            + imgpath
            + "/flag1_16x16.gif' style='cursor:pointer' onclick='OnStartButtonClicked(\""
            + record.data.ITEMTYPE + "\")' />";
    }
    else {
        return '';
    }
}

function renderer_stop(value, metaData, record, rowIdx, colIdx, store, view) {
    var status = record.data.ITEM_STATUS;
    if (status == '0') {
        return '';
    }
    else {
        return "<img src='"
            + imgpath
            + "/flag2_16x16.gif' style='cursor:pointer' onclick='OnStopButtonClicked(\""
            + record.data.ITEMTYPE + "\")' />";
    }
}