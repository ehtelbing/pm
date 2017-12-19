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
        autoLoad: false,
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

    var gridStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'gridStore',
        fields: ['EQU_ID', 'EQU_NAME', 'PLANTCODE', 'PLANTNAME',
            'DEPARTCODE', 'DEPARTNAME', 'EQU_STATUS', 'LOC_CODE',
            'LOC_DESC', 'EQU_STATUSDESC'],
        proxy: {
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            url: AppUrl + 'zpf/pro_sy104_equlist',
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
        frame: true,
        title: '试验设备设置',
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
                labelAlign: 'right',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectDepart();
                        _selectPlace();
                    }
                }
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
                labelAlign: 'right',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectPlace();
                    }
                }
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

    var grid = Ext.create('Ext.grid.Panel',
        {
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
                    text: '序号',
                    dataIndex: 'NUMBER',
                    xtype: 'rownumberer',
                    width: 70,
                    align: 'center'
                },
                {
                    text: '设备编号(ID)',
                    dataIndex: 'EQU_ID',
                    align: 'center',
                    width: 150
                },
                {
                    text: '设备名称',
                    align: 'center',
                    dataIndex: 'EQU_NAME',
                    width: 180
                },
                {
                    text: '厂矿名称',
                    align: 'center',
                    dataIndex: 'PLANTNAME',
                    width: 200
                },
                {
                    text: '部门名称',
                    align: 'center',
                    dataIndex: 'DEPARTNAME',
                    width: 200
                },
                {
                    text: '试验地点描述',
                    align: 'center',
                    dataIndex: 'LOC_DESC',
                    flex: 1
                },
                {
                    text: '使用状态',
                    align: 'center',
                    dataIndex: 'EQU_STATUS',
                    renderer: reStatus,
                    width: 100
                },
                {
                    text: '启用/停用',
                    align: 'center',
                    width: 100,
                    renderer: function (value, metaData, record,
                                        rowIdx, colIdx, store, view) {
                        if (Ext.getStore("gridStore").data
                                .getAt(rowIdx).data.EQU_STATUS == 1) {
                            return '<a href="javascript:stop(\''
                                + rowIdx + '\',0)">停用</a>';
                        } else {
                            return '<a href="javascript:start(\''
                                + rowIdx + '\',1)">启用</a>';
                        }
                    }
                }]
        });

    var addDialog = Ext.create('Ext.window.Window', {
        id: 'addDialog',
        closeAction: 'hide',
        columnLines: true,
        autoScroll: true,
        modal: true,
        title: '新增',
        width: 350,
        height: 150,
        layout: 'vbox',
        items: [{
            xtype: 'textfield',
            id: 'addId',
            style: 'margin: 5px 0px 0px 10px',
            fieldLabel: '设备编号（ID）',
            labelAlign: 'right',
            labelWidth: 100
        }, {
            xtype: 'textfield',
            id: 'addName',
            style: 'margin: 5px 0px 0px 10px',
            fieldLabel: '设备名称',
            labelAlign: 'right',
            labelWidth: 100
        }], buttons: [{
            text: '保存',
            icon: imgpath + '/filesave.png',
            width: 60,
            listeners: {
                click: Save
            }
        }]
    });
    var editDialog = Ext.create('Ext.window.Window', {
        id: 'editDialog',
        closeAction: 'hide',
        columnLines: true,
        autoScroll: true,
        modal: true,
        title: '修改',
        width: 350,
        height: 120,
        layout: 'vbox',
        items: [{
            xtype: 'textfield',
            id: 'editName',
            style: 'margin: 5px 0px 0px 10px',
            fieldLabel: '设备名称',
            labelAlign: 'right',
            labelWidth: 80
        }], buttons: [{
            text: '保存',
            icon: imgpath + '/filesave.png',
            width: 60,
            listeners: {
                click: SaveEdit
            }
        }]
    });
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [upPanel, grid]
    });

    Ext.data.StoreManager.lookup('ckStore').on('load', function (me) {
        Ext.getCmp('ck').select(me.first());
    });

    Ext.data.StoreManager.lookup('departStore').on('load', function (me) {
        Ext.getCmp('depart').select(me.first());
    });

    Ext.data.StoreManager.lookup('placeStore').on('load', function (me) {
        Ext.getCmp('place').select(me.first());
        Query();
    });

});

function _selectDepart() {
    var departStore = Ext.data.StoreManager.lookup('departStore');
    departStore.proxy.extraParams = {
        'A_PLANTCODE': Ext.getCmp('ck').getValue()
    };
    departStore.load();
}

function _selectPlace() {
    var placeStore = Ext.data.StoreManager.lookup('placeStore');
    placeStore.proxy.extraParams = {
        'plantcode_in': Ext.getCmp('ck').getValue(),
        'departcode_in': Ext.getCmp('depart').getValue()
    };
    placeStore.load();
}

function Query() {
    Ext.getStore("gridStore").load(
        {
            params: {
                plantcode_in: Ext.getCmp("ck").getValue(),
                departcode_in: Ext.getCmp("depart").getValue(),
                loccode_in: Ext.getCmp("place").getValue()
            }
        });
}

function add() {
    Ext.getCmp('addId').reset();
    Ext.getCmp('addName').reset();
    Ext.getCmp('addDialog').show();
}

function Save() {
    Ext.Ajax.request({
        url: AppUrl + 'zpf/pro_sy104_addequ',
        type: 'ajax',
        async: false,
        method: 'POST',
        params: {
            equcode_in: Ext.getCmp('addId').getValue(),
            equname_in: Ext.getCmp('addName').getValue(),
            plantcode_in: Ext.getCmp('ck').getValue(),
            plantname_in: Ext.getCmp('ck').getRawValue(),
            departcode_in: Ext.getCmp('depart').getValue(),
            departname_in: Ext.getCmp('depart').getRawValue(),
            loccode_in: Ext.getCmp('place').getValue(),
            locname_in: Ext.getCmp('place').getRawValue()
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.ret == "Failure") {
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
    Ext.Ajax.request({
        url: AppUrl + 'zpf/pro_sy104_updateequ',
        type: 'ajax',
        async: false,
        method: 'POST',
        params: {
            equcode_in: Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.EQU_ID,
            equname_in: Ext.getCmp('editName').getValue()
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.ret == "Failure") {
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
        Ext.getCmp('editName').reset();
        equipmentName = Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.EQU_NAME;
        equipmentId = Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.EQU_ID;
        Ext.getCmp("editName").setValue(equipmentName);
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
            equId = Ext.getCmp("grid").getSelectionModel().getSelection()[i].data.EQU_ID;
            Ext.Ajax.request({
                url: AppUrl + 'zpf/pro_sy104_deleteequ',
                params: {
                    equcode_in: Ext.getCmp("grid").getSelectionModel().getSelection()[i].data.EQU_ID
                },
                method: 'POST',
                async: false,
                success: function (resp) {
                    var resp = Ext.decode(resp.responseText);
                    if (resp.ret == 'Success') {
                        s = s + 1;
                    } else {

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
    var id = Ext.data.StoreManager.lookup('gridStore').data.getAt(rowIdx).data.EQU_ID;
    Ext.Ajax.request({
        url: AppUrl + 'zpf/pro_sy104_startequ',
        type: 'ajax',
        async: false,
        method: 'POST',
        params: {
            equcode_in: id
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.ret == "Success") {
                Ext.Msg.alert('提示', '操作成功！');
                Query();
            } else {
                Ext.Msg.alert('提示', '操作失败！');
            }
        }
    });
}

function stop(rowIdx, EQU_STATUS) {
    var id = Ext.data.StoreManager.lookup('gridStore').data.getAt(rowIdx).data.EQU_ID;
    Ext.Ajax.request({
        url: AppUrl + 'zpf/pro_sy104_stopequ',
        type: 'ajax',
        async: false,
        method: 'POST',
        params: {
            equcode_in: id
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.ret == "Success") {
                Ext.Msg.alert('提示', '操作成功！');
                Query();
            } else {
                Ext.Msg.alert('提示', '操作失败！');
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