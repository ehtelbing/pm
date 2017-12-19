var equipmentName = '';
var equipmentId = '';
Ext.onReady(function () {
    var ckStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'ckStore',
        fields: ['DEPARTCODE', 'DEPARTNAME', 'SAP_DEPARTCODE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zpf/PRO_MM_PLANT',
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
    var departStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'departStore',
        fields: ['DEPARTCODE', 'DEPARTNAME', 'SAP_DEPARTCODE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zpf/PRO_MM_DEPART',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    var placeStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'placeStore',
        fields: ['LOC_CODE', 'LOC_DESC', 'PLANTCODE', 'PLANTNAME',
            'DEPARTCODE', 'DEPARTNAME', 'LOC_STATUS', 'LOC_USERID',
            'LOC_USERNAME', 'LOC_STATUSDESC'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zpf/pro_sy103_loc_able',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    var editckStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'editckStore',
        fields: ['DEPARTCODE', 'DEPARTNAME', 'SAP_DEPARTCODE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zpf/PRO_MM_PLANT',
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
    var editdepartStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'editdepartStore',
        fields: ['DEPARTCODE', 'DEPARTNAME', 'SAP_DEPARTCODE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zpf/PRO_MM_DEPART',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    var editplaceStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'editplaceStore',
        fields: ['LOC_CODE', 'LOC_DESC', 'PLANTCODE', 'PLANTNAME',
            'DEPARTCODE', 'DEPARTNAME', 'LOC_STATUS', 'LOC_USERID',
            'LOC_USERNAME', 'LOC_STATUSDESC'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zpf/pro_sy103_loc_able',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    var gridStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'gridStore',
        fields: ['USER_CODE', 'USER_NAME', 'PLANTCODE', 'DEPTCODE',
            'LOC_CODE', 'STS', 'STS_DESC', 'DEPTNAME', 'LOC_NAME',
            'PLANTNAME'],
        proxy: {
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            url: AppUrl + 'zpf/pg_sy106_syuserlist',
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        }
    });
    var upPanel = Ext.create('Ext.panel.Panel', {
        id: 'upPanel',
        region: 'north',
        //style: 'margin: 5px 0px 0px 0px',
        frame: true,
        title: '试验人员管理',
        layout: 'vbox',
        items: [{
            xtype: 'panel',
            baseCls: 'my-panel-noborder',
            frame: true,
            layout: 'column',
            items: [{
                xtype: 'combo',
                store: ckStore,
                style: 'margin: 5px 0px 5px 0px',
                editable: false,
                queryMode: 'local',
                fieldLabel: '厂矿',
                id: 'ck',
                displayField: 'DEPARTNAME',
                valueField: 'DEPARTCODE',
                labelWidth: 60,
                width:220,
                labelAlign: 'right'
            }, {
                xtype: 'combo',
                store: departStore,
                style: 'margin: 5px 0px 5px 0px',
                editable: false,
                queryMode: 'local',
                fieldLabel: '部门',
                id: 'depart',
                displayField: 'DEPARTNAME',
                valueField: 'DEPARTCODE',
                labelWidth: 60,
                width:220,
                labelAlign: 'right'
            }, {
                xtype: 'combo',
                store: placeStore,
                style: 'margin: 5px 0px 5px 20px',
                editable: false,
                queryMode: 'local',
                fieldLabel: '试验地点',
                id: 'place',
                displayField: 'LOC_DESC',
                valueField: 'LOC_CODE',
                labelWidth: 60,
                width:220,
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            baseCls: 'my-panel-noborder',
            frame: true,
            layout: 'column',
            items: [{
                xtype: 'button',
                text: '查 询',
                style: ' margin: 5px 0px 5px 32px',
                icon: imgpath + '/search.png',
                handler: Query
            }, {
                xtype: 'button',
                text: '新增',
                style: ' margin: 5px 0px 5px 10px',
                icon: imgpath + '/add.png',
                handler: add
            }, {
                xtype: 'button',
                text: '修改',
                style: ' margin: 5px 0px 5px 10px',
                icon: imgpath + '/edit.png',
                handler: edit
            }, {
                xtype: 'button',
                text: '删除',
                style: ' margin: 5px 0px 5px 10px',
                icon: imgpath + '/delete.png',
                handler: del
            }]
        }]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        region: 'center',
        id: 'grid',
        columnLines: true,
        style: 'margin: 5px 0px 0px 0px',
        width: '100%',
        autoScroll: true,
        store: gridStore,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [
            {
                text: '用户编码',
                dataIndex: 'USER_CODE',
                align: 'center',
                width: 150
            },
            {
                text: '姓名',
                align: 'center',
                dataIndex: 'USER_NAME',
                width: 180
            },
            {
                text: '所属厂矿',
                align: 'center',
                dataIndex: 'PLANTNAME',
                width: 200
            },
            {
                text: '所属部门',
                align: 'center',
                dataIndex: 'DEPTNAME',
                width: 200
            },
            {
                text: '试验地点',
                align: 'center',
                dataIndex: 'LOC_NAME',
                flex: 1
            },
            {
                text: '状态',
                align: 'center',
                dataIndex: 'STS_DESC',
                width: 100
            },
            {
                text: '启用',
                align: 'center',
                width: 100,
                renderer: function (value, metaData, record, rowIdx,
                                    colIdx, store, view) {

                    return '<a href="javascript:start(\'' + rowIdx
                        + '\',1)">启用</a>';
                }
            },
            {
                text: '停用',
                align: 'center',
                width: 100,
                renderer: function (value, metaData, record, rowIdx,
                                    colIdx, store, view) {
                    return '<a href="javascript:stop(\'' + rowIdx
                        + '\',0)">停用</a>';
                }
            }]
    });
    var addPanel = Ext.create('Ext.form.Panel', {
        id: 'addPanel',
        region: 'north',
        frame: true,
        baseCls: 'my-panel-noborder',
        style: 'margin: 20px 0px 0px 10px',
        layout: {
            type: 'table',
            columns: 2
        },
        items: [{
            xtype: 'textfield',
            id: 'usercode',
            fieldLabel: '用户编码',
            inputAttrTpl: "maxLength=50",
            labelAlign: 'right',
            labelWidth: 100
        }, {
            xtype: 'label',
            text: '*最多可输入50个字符'
        }, {
            xtype: 'textfield',
            id: 'username',
            inputAttrTpl: "maxLength=50",
            fieldLabel: '姓名',
            labelAlign: 'right',
            labelWidth: 100
        }, {
            xtype: 'label',
            text: '*最多可输入50个字符'
        }, {
            xtype: 'combo',
            store: editckStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '厂矿',
            id: 'addck',
            colspan: 2,
            displayField: 'DEPARTNAME',
            valueField: 'DEPARTCODE',
            labelWidth: 100,
            labelAlign: 'right'
        }, {
            xtype: 'combo',
            store: editdepartStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '部门',
            id: 'adddepart',
            colspan: 2,
            displayField: 'DEPARTNAME',
            valueField: 'DEPARTCODE',
            labelWidth: 100,
            labelAlign: 'right'
        }, {
            xtype: 'combo',
            store: editplaceStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '试验地点',
            id: 'addplace',
            colspan: 2,
            displayField: 'LOC_DESC',
            valueField: 'LOC_CODE',
            labelWidth: 100,
            labelAlign: 'right'
        }, {
            xtype: 'button',
            style: 'margin: 5px 0px 0px 198px',
            text: '保存',
            handler: Save,
            icon: imgpath + '/filesave.png'
        }]
    });
    var editPanel = Ext.create('Ext.form.Panel', {
        id: 'editPanel',
        region: 'north',
        frame: true,
        baseCls: 'my-panel-noborder',
        style: 'margin: 20px 0px 0px 10px',
        layout: {
            type: 'table',
            columns: 2
        },
        items: [{
            xtype: 'textfield',
            id: 'editusercode',
            fieldLabel: '用户编码',
            labelAlign: 'right',
            labelWidth: 100
        }, {
            xtype: 'label',
            text: '*用户编码无法修改'
        }, {
            xtype: 'textfield',
            id: 'editusername',
            inputAttrTpl: "maxLength=50",
            fieldLabel: '姓名',
            labelAlign: 'right',
            labelWidth: 100
        }, {
            xtype: 'label',
            text: '*最多可输入50个字符'
        }, {
            xtype: 'combo',
            store: editckStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '厂矿',
            id: 'editck',
            colspan: 2,
            displayField: 'DEPARTNAME',
            valueField: 'DEPARTCODE',
            labelWidth: 100,
            labelAlign: 'right'
        }, {
            xtype: 'combo',
            store: editdepartStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '部门',
            id: 'editdepart',
            colspan: 2,
            displayField: 'DEPARTNAME',
            valueField: 'DEPARTCODE',
            labelWidth: 100,
            labelAlign: 'right'
        }, {
            xtype: 'combo',
            store: editplaceStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '试验地点',
            id: 'editplace',
            colspan: 2,
            displayField: 'LOC_DESC',
            valueField: 'LOC_CODE',
            labelWidth: 100,
            labelAlign: 'right'
        }, {
            xtype: 'button',
            style: 'margin: 5px 0px 0px 198px',
            text: '保存',
            handler: SaveEdit,
            icon: imgpath + '/filesave.png'
        }]
    });
    var addDialog = Ext.create('Ext.window.Window', {
        id: 'addDialog',
        closeAction: 'hide',
        columnLines: true,
        autoScroll: true,
        modal: true,
        title: '新增',
        titleAlign: 'center',
        width: 420,
        height: 270,
        items: [addPanel]
    });
    var editDialog = Ext.create('Ext.window.Window', {
        id: 'editDialog',
        closeAction: 'hide',
        columnLines: true,
        autoScroll: true,
        modal: true,
        title: '修改',
        titleAlign: 'center',
        width: 420,
        height: 270,
        items: [editPanel]
    });
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [upPanel, grid]
    });

    Ext.data.StoreManager.lookup('ckStore').on('load', function (me) {
        Ext.data.StoreManager.lookup('ckStore').insert(0, {'DEPARTCODE': '%', 'DEPARTNAME': '全部'});
        Ext.getCmp('ck').select(me.first());
    });

    Ext.getCmp('ck').on('change', function (me) {
        Ext.data.StoreManager.lookup('departStore').load({
            params: {
                'A_PLANTCODE': Ext.getCmp('ck').getValue()
            }
        })
    });

    Ext.getCmp('addck').on('change', function (me) {
        Ext.data.StoreManager.lookup('editdepartStore').load({
            params: {
                'A_PLANTCODE': Ext.getCmp('addck').getValue()
            }
        })
    });

    Ext.getCmp('editck').on('change', function (me) {
        Ext.data.StoreManager.lookup('editdepartStore').load({
            params: {
                'A_PLANTCODE': Ext.getCmp('editck').getValue()
            }
        })
    });

    Ext.data.StoreManager.lookup('departStore').on('load', function (me) {
        Ext.data.StoreManager.lookup('departStore').insert(0, {'DEPARTCODE': '%', 'DEPARTNAME': '全部'});
        Ext.getCmp('depart').select(me.first());
    });

    Ext.data.StoreManager.lookup('editckStore').on('load', function(me) {
        Ext.getCmp('addck').select(me.first());
    });

    Ext.data.StoreManager.lookup('editdepartStore').on('load', function(me) {
        Ext.getCmp('adddepart').select(me.first());
    });

    Ext.data.StoreManager.lookup('editplaceStore').on('load', function(me) {
        Ext.getCmp('addplace').select(me.first());
    });

    Ext.getCmp('depart').on('change', function (me) {
        Ext.data.StoreManager.lookup('placeStore').load(
            {
                params: {
                    'plantcode_in': Ext.getCmp('ck').getValue(),
                    'departcode_in': Ext.getCmp('depart').getValue()
                }
            });
    });

    Ext.getCmp('adddepart').on('change', function (me) {
        Ext.data.StoreManager.lookup('editplaceStore').load(
            {
                params: {
                    'plantcode_in': Ext.getCmp('addck').getValue(),
                    'departcode_in': Ext.getCmp('adddepart').getValue()
                }
            });
    });

    Ext.getCmp('editdepart').on('change', function (me) {
        Ext.data.StoreManager.lookup('editplaceStore').load(
            {
                params: {
                    'plantcode_in': Ext.getCmp('editck').getValue(),
                    'departcode_in': Ext.getCmp('editdepart').getValue()
                }
            });
    });

    Ext.data.StoreManager.lookup('placeStore').on('load', function (me) {
        Ext.data.StoreManager.lookup('placeStore').insert(0, {'LOC_CODE': '%', 'LOC_DESC': '全部'});
        Ext.getCmp('place').select(me.first());
        Query();
    });
})
function Query() {
    Ext.getStore("gridStore").load(
        {
            params: {
                a_plantcode: Ext.getCmp("ck").getValue(),
                a_departcode: Ext.getCmp("depart").getValue(),
                a_loc_code: Ext.getCmp("place").getValue()
            }
        });
}

function add() {
    Ext.getCmp('addPanel').getForm().reset();
    Ext.getCmp("addck").select(Ext.data.StoreManager.lookup('editckStore').first());
    Ext.getCmp("adddepart").select(Ext.data.StoreManager.lookup('editdepartStore').first());
    Ext.getCmp("addplace").select(Ext.data.StoreManager.lookup('editplaceStore').first());
    Ext.getCmp('addDialog').show();
}


function Save() {
    if (Ext.getCmp('usercode').getValue().length > 50
        || Ext.getCmp('usercode').getValue() == "") {
        Ext.Msg.alert('提示', '用户编码不能为空，最多输入50个字符！');
        return;
    }
    if (Ext.getCmp('username').getValue().length > 50
        || Ext.getCmp('username').getValue() == "") {
        Ext.Msg.alert('提示', '姓名不能为空，最多输入50个字符！');
        return;
    }
    Ext.Ajax.request({
        url: AppUrl + 'zpf/pg_sy106_addsyuser',
        type: 'ajax',
        async: false,
        method: 'POST',
        params: {
            a_usercode: Ext.getCmp('usercode').getValue(),
            a_username: Ext.getCmp('username').getValue(),
            a_plantcode: Ext.getCmp('addck').getValue(),
            a_deptcode: Ext.getCmp('adddepart').getValue(),
            a_loc_code: Ext.getCmp('addplace').getValue(),
            a_sts: '1',
            a_plantname: Ext.getCmp('addck').getRawValue(),
            a_deptname: Ext.getCmp('adddepart').getRawValue(),
            a_loc_name: Ext.getCmp('addplace').getRawValue()
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.ret != "Success") {
                Ext.Msg.alert('提示', '操作失败！');
            } else {
                Ext.Msg.alert('提示', '操作成功！');
                Query();
                Ext.getCmp('addDialog').hide();
            }
        }
    });
}

function SaveEdit() {
    if (Ext.getCmp('editusercode').getValue().length > 50
        || Ext.getCmp('editusercode').getValue() == "") {
        Ext.Msg.alert('提示', '用户编码不能为空，最多输入50个字符！');
        return;
    }
    if (Ext.getCmp('editusername').getValue().length > 50
        || Ext.getCmp('editusername').getValue() == "") {
        Ext.Msg.alert('提示', '姓名不能为空，最多输入50个字符！');
        return;
    }
    Ext.Ajax.request({
        url: AppUrl + 'zpf/pg_sy106_updatesyuser',
        type: 'ajax',
        async: false,
        method: 'POST',
        params: {
            a_usercode: Ext.getCmp('editusercode').getValue(),
            a_username: Ext.getCmp('editusername').getValue(),
            a_plantcode: Ext.getCmp('editck').getValue(),
            a_deptcode: Ext.getCmp('editdepart').getValue(),
            a_loc_code: Ext.getCmp('editplace').getValue(),
            a_sts: '1',
            a_plantname: Ext.getCmp('editck').getRawValue(),
            a_deptname: Ext.getCmp('editdepart').getRawValue(),
            a_loc_name: Ext.getCmp('editplace').getRawValue()
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.ret != "Success") {
                Ext.Msg.alert('提示', '操作失败！');
            } else {
                Ext.Msg.alert('提示', '操作成功！');
                Query();
                Ext.getCmp('editDialog').hide();
            }
        }
    });
}

function edit() {
    var id = Ext.getCmp('grid').getSelectionModel().getSelection().length;
    if (id < 1) {
        Ext.Msg.alert('提示', '没有选中的数据！');
        return false;
    } else if (id == 1) {
        Ext.getCmp('editPanel').getForm().reset();
        Ext.getCmp("editusercode").setValue(Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.USER_CODE);
        Ext.getCmp("editusername").setValue(Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.USER_NAME);
        Ext.getCmp("editck").setValue(Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.PLANTCODE);
        Ext.getCmp("editdepart").setValue(Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.DEPTCODE);
        Ext.getCmp("editplace").setValue(Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.LOC_CODE);
    } else {
        Ext.Msg.alert('提示', '只能操作一条数据！');
        return false;
    }
    Ext.getCmp('editDialog').show();
}
function del() {
    var selectModel = Ext.ComponentManager.get("grid").getSelectionModel();
    var id = Ext.getCmp('grid').getSelectionModel().getSelection().length;
    if (id == 0) {
        Ext.Msg.alert('提示', '没有选中的数据！');
        return false;
    } else {
        var s = 0;
        for (var i = 0; i < id; i++) {
            var USER_CODE = Ext.getCmp("grid").getSelectionModel()
                .getSelection()[i].data.USER_CODE;
            Ext.Ajax.request({
                url: AppUrl + 'zpf/pg_sy106_deletesyuser',
                params: {
                    a_usercode: Ext.getCmp("grid").getSelectionModel().getSelection()[i].data.USER_CODE
                },
                method: 'POST',
                async: false,
                success: function (resp) {
                    var resp = Ext.decode(resp.responseText);
                    if (resp.ret == 'Success') {
                        s = s + 1;
                    } else {
                        Ext.Msg.alert('提示', resp.ret_msg);
                    }
                }
            });
        }
    }
    if (s == 0) {
        Ext.Msg.alert('提示', '全部删除失败');
    } else if (s == id) {
        Ext.Msg.alert('提示', '全部删除成功');
    } else {
        Ext.Msg.alert('提示', '部分删除失败');
    }
    Query();
}
function start(rowIdx, EQU_STATUS) {
    var id = Ext.data.StoreManager.lookup('gridStore').data.getAt(rowIdx).data.USER_CODE;
    Ext.Ajax.request({
        url: AppUrl + 'zpf/pg_sy106_startsyuser',
        type: 'ajax',
        async: false,
        method: 'POST',
        params: {
            a_usercode: id
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.ret == "Success") {
                Ext.Msg.alert('提示', '操作成功！');
                Query();
            } else {
                Ext.Msg.alert('提示', resp.ret_msg);
            }
        }
    });
}
function stop(rowIdx, EQU_STATUS) {
    var id = Ext.data.StoreManager.lookup('gridStore').data.getAt(rowIdx).data.USER_CODE;
    Ext.Ajax.request({
        url: AppUrl + 'zpf/pg_sy106_stopsyuser',
        type: 'ajax',
        async: false,
        method: 'POST',
        params: {
            a_usercode: id
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.ret == "Success") {
                Ext.Msg.alert('提示', '操作成功！');
                Query();
            } else {
                Ext.Msg.alert('提示', resp.ret_msg);
            }
        }
    });
}
function reStatus(value) {
    if (value == 1) {
        return '启用';
    } else {
        return '停用';
    }
}