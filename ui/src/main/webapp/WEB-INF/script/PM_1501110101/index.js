var globl_code = '';
var gridStoreLoad = false;
Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果

    var gridStore = Ext.create('Ext.data.Store', {
        storeId: 'gridStore',
        autoLoad: true,
        fields: ['ITEMTYPE', 'ITEMTYPE_DESC', 'ITEMTYPE_STATUS', 'ITEMTYPE_STATUSDESC'],
        proxy: {
            type: 'ajax',
            url: AppUrl + '/yjn/PRO_SY101_ITEMTYPELIST',
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
        title: '试验项目类型设置',
        titleAlign: 'left',
        region: 'north',
        layout: 'column',
        frame: true,
        items: [{
            xtype: 'button',
            id: 'add',
            text: '新增',
            width: '60',
            icon: imgpath + '/add.png',
            style: ' margin: 5px 0px 5px 5px',
            listeners: {
                click: OnClickAdd
            }
        }, {
            xtype: 'button',
            text: '修改',
            width: '60',
            icon: imgpath + '/edit.png',
            style: ' margin: 5px 0px 5px 5px',
            listeners: {
                click: OnClickEdit
            }
        }, {
            xtype: 'button',
            text: '删除',
            width: '60',
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
            text: '项目类型编号',
            align: 'center',
            width: 240,
            dataIndex: 'ITEMTYPE'
        }, {
            text: '项目类型描述',
            align: 'center',
            width: 320,
            dataIndex: 'ITEMTYPE_DESC'
        }, {
            text: '使用状态',
            align: 'center',
            dataIndex: 'ITEMTYPE_STATUSDESC',
            width: 80
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

var dialogAdd = Ext.create('Ext.window.Window', {
    id: 'dialogAdd',
    closeAction: 'hide',
    title: '新增',
    width: 300,
    height: 200,
    modal: true,
    frame: true,
    layout: 'vbox',
    items: [{
        xtype: 'textfield',
        labelAlign: 'right',
        style: ' margin: 20px 0px 5px 10px',
        fieldLabel: '项目类型编号',
        value: '',
        id: 'A_ITEMTYPE',
        labelWidth: 80
    }, {
        xtype: 'textfield',
        labelAlign: 'right',
        style: ' margin: 10px 0px 5px 10px',
        value: '',
        fieldLabel: '项目类型描述',
        id: 'A_ITEMTYPE_DESC',
        labelWidth: 80
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
    height: 200,
    modal: true,
    frame: true,
    layout: 'vbox',
    items: [{
        xtype: 'textfield',
        labelAlign: 'right',
        style: ' margin: 30px 0px 5px 30px',
        fieldLabel: '项目类型描述',
        id: 'E_ITEMTYPE_DESC',
        labelWidth: 80
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

function OnClickAdd() {
    Ext.getCmp('A_ITEMTYPE').reset();
    Ext.getCmp('A_ITEMTYPE_DESC').reset();
    Ext.getCmp('dialogAdd').show();
}

function OnClickEdit() {
    var selectModel = Ext.getCmp("grid").getSelectionModel().getSelection();
    if (selectModel.length > 1) {
        Ext.Msg.alert('提示', '不能同时修改多条记录！');
    }
    else if (selectModel.length > 0) {
        globl_code = selectModel[0].data.ITEMTYPE;
        Ext.getCmp('E_ITEMTYPE_DESC').setValue(
            selectModel[0].data.ITEMTYPE_DESC);
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
    })
}

function OnStartButtonClicked() {
    globl_code = Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.ITEMTYPE;
    Ext.Ajax.request({
        url: AppUrl + '/yjn/PRO_SY101_STARTITEMTYPE',
        method: 'POST',
        params: {
            ITEMTYPE: globl_code
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
    globl_code = Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.ITEMTYPE;
    Ext.Ajax.request({
        url: AppUrl + '/yjn/PRO_SY101_STOPITEMTYPE',
        method: 'POST',
        params: {
            ITEMTYPE: globl_code
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
    if (Ext.getCmp('E_ITEMTYPE_DESC').getValue() == '') {
        Ext.Msg.alert('错误操作', '项目类型描述不能为空!')
    } else {
        Ext.Ajax.request({
            url: AppUrl + '/yjn/PRO_SY101_UPDATEITEMTYPE',
            method: 'post',
            params: {
                ITEMTYPE: globl_code,
                ITEMTYPE_DESC: Ext.getCmp('E_ITEMTYPE_DESC').getValue()
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
    if (Ext.getCmp('A_ITEMTYPE').getValue() == '') {
        Ext.Msg.alert('错误操作', '项目类型编号不能为空!')
    } else if (Ext.getCmp('A_ITEMTYPE_DESC').getValue() == '') {
        Ext.Msg.alert('错误操作', '项目类型描述不能为空!')
    } else {
        Ext.Ajax.request({
            url: AppUrl + '/yjn/PRO_SY101_ADDITEMTYPE',
            method: 'post',
            params: {
                ITEMTYPE: Ext.getCmp('A_ITEMTYPE').getValue(),
                ITEMTYPE_DESC: Ext.getCmp('A_ITEMTYPE_DESC').getValue()
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);//后台返回的值
                if (data.RET == 'Success') {//成功，会传回true
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
    var records = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (records.length == 0) {
        Ext.Msg.alert('操作信息', '请选择需要删除的数据');
    }
    else {
        Ext.Msg.confirm('提示', '是否删除?', function (button) {
            if (button == "yes") {
                for (var i = 0; i < records.length; i++) {
                    Ext.Ajax.request({
                        url: AppUrl + '/yjn/PRO_SY101_DELETEITEMTYPE',
                        method: 'post',
                        async: false,
                        params: {
                            ITEMTYPE: records[i].data.ITEMTYPE
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
    var status = record.data.ITEMTYPE_STATUS;
    if (status == '0') {
        return "<img src='"
            + imgpath
            + "/flag1_16x16.gif' style='cursor:pointer' onclick='OnStartButtonClicked(\""
            + record.data.ITEMTYPE + "\")' />"
    }
    else {
        return '';
    }
}

function renderer_stop(value, metaData, record, rowIdx, colIdx, store, view) {
    var status = record.data.ITEMTYPE_STATUS;
    if (status == '0') {
        return '';
    }
    else {
        return "<img src='"
            + imgpath
            + "/flag2_16x16.gif' style='cursor:pointer' onclick='OnStopButtonClicked(\""
            + record.data.ITEMTYPE + "\")' />"
    }
}
