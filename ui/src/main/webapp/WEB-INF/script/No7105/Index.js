// Ext.Loader.setConfig({
//     enabled : true
// });
// Ext.Loader.setPath({
//     "com.data" : "../../com/data",
//     "com.store" : "../../com/store",
//     "com.view" : "../../com/view",
//     "com.util" : "../../com/util"
// });
//
// Ext.require([ 'com.data.Manage', 'com.store.GridStore' ])
Ext.onReady(function () {
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: true,
        fields: ['CYCLE_ID', 'CYCLE_DESC', 'CYCLE_UNIT'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'LL/PRO_RUN_CYCLE_ALL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    var grid = Ext.create(
        'Ext.grid.Panel',
        {
            id: 'grid',
            region: 'center',
            columnLines: true,
            width: '100%',
            selType: 'checkboxmodel',
            columns: [{
                xtype: 'rownumberer',
                text: '序号',
                width: 50,
                align: 'center'
            }, {
                text: '周期描述',
                dataIndex: 'CYCLE_DESC',
                align: 'center',
                width: 120,
                renderer: left
            }, {
                text: '计算单位123',
                dataIndex: 'CYCLE_UNIT',
                align: 'center',
                width: 120,
                renderer: left
            }, {
                text: "选中",
                id: 'xz',
                xtype: 'templatecolumn',
                tpl: '<a href="#" id="xz">选中</a>',
                align: 'center',
                width: 60
            }],
            store: gridStore,
            autoScroll: true,
            dockedItems: [
                {
                    xtype: 'panel',
                    defaults: {
                        labelAlign: 'right',
                        style: 'margin:3px 0px 2px 5px'
                    },
                    //baseCls: 'my-panel-no-border',
                    layout: 'column',
                    bodyPadding: 3,
                    items: [
                        {
                            id: 'zqms',
                            xtype: 'textfield',
                            fieldLabel: '周期描述',
                            labelWidth: 55
                        },
                        {
                            id: 'jsdw',
                            xtype: 'textfield',
                            fieldLabel: '计算单位',
                            labelWidth: 55
                        },
                        {
                            id: 'sel',
                            xtype: 'button',
                            text: '查询',
                            icon: imgpath + '/search.png',
                            handler: function () {
                                gridStore.load({
                                    params: {}
                                });
                            }
                        },
                        {
                            id: 'add',
                            xtype: 'button',
                            text: '添加',
                            icon: imgpath + '/add.png',
                            handler: function () {
                                if (Ext.ComponentManager.get('zqms').getValue() == "" || Ext.ComponentManager.get('jsdw').getValue() == "") {
                                    Ext.example.msg('操作信息', '{0}', '请填写周期描述和计算单位');
                                    return false;
                                } else {
                                    Ext.Ajax.request({
                                        url: AppUrl + 'LL/PRO_RUN_CYCLE_ADD',
                                        method: 'POST',
                                        params: {
                                            A_CYCLE_DESC: Ext.ComponentManager.get('zqms').getValue(),// 周期描述
                                            A_CYCLE_UNIT: Ext.ComponentManager.get('jsdw').getValue()// 计算单位
                                        },
                                        success: function (ret) {
                                            var resp = Ext.JSON.decode(ret.responseText);
                                            if (resp.RET == "Success") {
                                                Ext.example.msg('操作信息', '操作成功');
                                                Ext.data.StoreManager.lookup('gridStore').load({
                                                    params: {}
                                                });
                                            } else {
                                                Ext.example.msg('操作信息', '操作失败');
                                            }
                                        }
                                    });
                                }
                            }
                        },
                        {
                            id: 'update',
                            xtype: 'button',
                            text: '修改',
                            icon: imgpath + '/edit.png',
                            handler: function () {
                                if (Ext.ComponentManager.get('updateid').getValue() == "") {
                                    Ext.example.msg('操作信息', '{0}', '请点击选中选择一条数据进行修改');
                                    return;
                                } else if (Ext.ComponentManager.get('zqms').getValue() == "" || Ext.ComponentManager.get('jsdw').getValue() == "") {
                                    Ext.example.msg('操作信息', '{0}', '请填写周期描述和计算单位');
                                    return false;
                                } else {
                                    Ext.Ajax.request({
                                        url: AppUrl + 'LL/PRO_RUN_CYCLE_UPDATE',
                                        method: 'POST',
                                        params: {
                                            A_CYCLE_ID: Ext.ComponentManager.get('updateid').getValue(),// id
                                            A_CYCLE_DESC: Ext.ComponentManager.get('zqms').getValue(),// 周期描述
                                            A_CYCLE_UNIT: Ext.ComponentManager.get('jsdw').getValue()// 计算单位
                                        },
                                        success: function (response) {
                                            var resp = Ext.JSON.decode(response.responseText);
                                            if (resp.RET == "Success") {
                                                Ext.example.msg('操作信息', '操作成功');
                                                gridStore.load({
                                                    params: {}
                                                });
                                            } else {
                                                Ext.example.msg('操作信息', '操作失败');
                                            }
                                        }
                                    });
                                    Ext.ComponentManager.get('updateid').setValue("");
                                    Ext.ComponentManager.get('zqms').setValue("");// 周期描述
                                    Ext.ComponentManager.get('jsdw').setValue('');// 计算单位
                                }
                            }
                        },
                        {
                            id: 'delete',
                            xtype: 'button',
                            text: '删除',
                            icon: imgpath + '/delete1.png',
                            handler: function () {
                                var selectModel = Ext.getCmp("grid").getSelectionModel();
                                var id = Ext.getCmp('grid').getSelectionModel().getSelection().length;
                                if (id == '0') {
                                    Ext.example.msg('操作信息', '{0}', '请选择数据进行删除');
                                    return;
                                } else {
                                    Ext.Msg.confirm("警告", "确定要删除吗？",
                                        function (button) {
                                            if (button != "yes") {
                                                return;
                                            }
                                            for (i = 0; i < Ext.getCmp('grid').getSelectionModel().getSelection().length; i++) {
                                                Ext.Ajax.request({
                                                    url: AppUrl + 'LL/PRO_RUN_CYCLE_DELETE',
                                                    method: 'POST',
                                                    params: {
                                                        A_CYCLE_ID: selectModel.getSelection()[i].data.CYCLE_ID
                                                    },
                                                    success: function (response) {
                                                        var resp = Ext.JSON.decode(response.responseText);
                                                        if (resp.RET == "Success") {
                                                            Ext.example.msg('操作信息', '操作成功');
                                                            gridStore.load({
                                                                params: {}
                                                            });
                                                        } else if (resp.RET == 'Fail') {
                                                            Ext.example.msg('操作信息', "正在被使用无法删除");
                                                        }
                                                    }
                                                });
                                            }
                                        });
                                }
                            }
                        }]
                }, {
                    id: 'updateid',
                    xtype: 'hidden'
                }]
        });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [grid]
    });
    Ext.ComponentManager.get('xz').on("click", function (view, rowIndex, colIndex, item, e) {
        Ext.ComponentManager.get('zqms').setValue(Ext.getStore("gridStore").getAt(colIndex).get('CYCLE_DESC'));// 周期描述
        Ext.ComponentManager.get('jsdw').setValue(Ext.getStore("gridStore").getAt(colIndex).get('CYCLE_UNIT'));// 计算单位
        Ext.ComponentManager.get('updateid').setValue(Ext.getStore("gridStore").getAt(colIndex).get('CYCLE_ID'));// id
    });
})

function left(value, metaData) {
    metaData.style = "text-align:left";
    return value;
}
