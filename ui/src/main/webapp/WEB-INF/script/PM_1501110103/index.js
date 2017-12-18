var globl_code = '';
var globl_plantcode = '';
var globl_departcode = '';
var palntStoreLoad = false;
var userid = Ext.util.Cookies.get('mm.userid');
var username = Ext.util.Cookies.get('mm.username');
Ext.onReady(function () {

    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
    var palntStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'palntStore',
        fields: ['DEPARTCODE', 'DEPARTNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + '/yjn/PRO_MM_PLANT',
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
                Ext.getCmp("cktype").select(palntStore.getAt(0));
                palntStoreLoad = true;
                _init();
            }
        }
    });

    var palntStore_Add = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'palntStore_Add',
        fields: ['DEPARTCODE', 'DEPARTNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + '/yjn/PRO_MM_PLANT',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var palntStore_Edit = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'palntStore_Edit',
        fields: ['DEPARTCODE', 'DEPARTNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + '/yjn/PRO_MM_PLANT',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var departStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'departStore',
        fields: ['DEPARTCODE', 'DEPARTNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + '/yjn/PRO_MM_DEPART',
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
                departStore.insert(0, {
                    'DEPARTNAME': '全部',
                    'DEPARTCODE': '%'
                });
                Ext.getCmp("bmtype").select(departStore.getAt(0));
                globl_plantcode = Ext.getCmp('cktype').getValue();
                globl_departcode = Ext.getCmp('bmtype').getValue();
            }
        }
    });

    var departStore_Add = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'departStore_Add',
        fields: ['DEPARTCODE', 'DEPARTNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + '/yjn/PRO_MM_DEPART',
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
                Ext.getCmp("bmtype_add").select(departStore_Add.getAt(0));
            }
        }
    });

    var departStore_Edit = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'departStore_Edit',
        fields: ['DEPARTCODE', 'DEPARTNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + '/yjn/PRO_MM_DEPART',
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
                var item = departStore_Edit.findRecord('DEPARTCODE', globl_departcode);
                if (item == null) {
                    Ext.getCmp("bmtype_edit").select(departStore_Edit.getAt(0));
                } else {
                    Ext.getCmp("bmtype_edit").select(item);
                }
            }
        }
    });

    var gridStore = Ext.create('Ext.data.Store',
        {
            storeId: 'gridStore',
            autoLoad: false,
            fields: ['LOC_CODE', 'LOC_DESC', 'PLANTNAME', 'DEPARTNAME'
                , 'LOC_STATUS', 'LOC_USERID', 'LOC_USERNAME', 'PLANTCODE', 'DEPARTCODE'],
            proxy: {
                type: 'ajax',
                url: AppUrl + '/yjn/PRO_SY103_LOCLIST',
                actionMethods: {
                    read: 'POST'
                },
                reader: {
                    type: 'json',
                    root: 'list'
                },
                listeners: {
                    beforeload: beforeloadStore
                }

            }
        });

    var panel = Ext.create('Ext.panel.Panel', {
        title: '试验地点设置',
        titleAlign: 'left',
        region: 'north',
        layout: 'vbox',
        frame: true,
        items: [{
            id: 'aa',
            xtype: 'panel',
            region: 'west',
            frame: true,
            baseCls: 'my-panel-noborder',
            layout: 'hbox',
            items: [{
                xtype: 'combo',
                labelAlign: 'right',
                style: ' margin: 5px 0px 5px 5px',
                fieldLabel: '厂矿',
                editable: false,
                queryMode: 'local',
                displayField: 'DEPARTNAME',
                valueField: 'DEPARTCODE',
                id: 'cktype',
                width: 230,
                labelWidth: 40,
                store: 'palntStore',
                listeners: {
                    change: function () {
                        Ext.data.StoreManager.lookup('departStore').load({
                            params: {
                                DEPARTCODE: Ext.getCmp('cktype').getValue()
                            }
                        });
                        OnClickSearch();
                    }
                }
            }, {
                xtype: 'combo',
                labelAlign: 'right',
                style: ' margin: 5px 0px 5px 5px',
                fieldLabel: '部门',
                editable: false,
                queryMode: 'local',
                displayField: 'DEPARTNAME',
                valueField: 'DEPARTCODE',
                id: 'bmtype',
                width: 230,
                labelWidth: 40,
                store: 'departStore',
                listeners: {
                    change: OnClickSearch
                }
            }]
        },
            {
                xtype: 'panel',
                region: 'west',
                frame: true,

                baseCls: 'my-panel-noborder',
                layout: 'hbox',
                items: [{
                    xtype: 'button',
                    text: '查询',
                    icon: imgpath + '/search.png',
                    style: ' margin: 5px 0px 5px 20px',
                    listeners: {
                        click: OnClickSearch
                    }
                }, {
                    xtype: 'button',
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
            text: '试验地点编号',
            align: 'center',
            width: 120,
            dataIndex: 'LOC_CODE'
        }, {
            text: '试验地点描述',
            align: 'center',
            width: 120,
            dataIndex: 'LOC_DESC'
        }, {
            text: '所属厂矿',
            align: 'center',
            dataIndex: 'PLANTNAME',
            width: 120
        }, {
            text: '所属部门',
            align: 'center',
            width: 180,
            dataIndex: 'DEPARTNAME'
        }, {
            text: '状态',
            align: 'center',
            width: 80,
            dataIndex: 'LOC_STATUS',
            renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                if (value ==1) {
                    return '启用';
                }else if (value ==0) {
                    return '停用';
                }
                return null;
            }
        }, {
            text: '负责人ID',
            align: 'center',
            width: 120,
            dataIndex: 'LOC_USERID'
        }, {
            text: '负责人姓名',
            align: 'center',
            width: 120,
            dataIndex: 'LOC_USERNAME'
        }, {
            text: '启用',
            align: 'center',
            width: 80,
            renderer: renderer_start
        }, {
            text: '停用',
            align: 'center',
            renderer: right,
            width: 80,
            renderer: renderer_stop
        }],
        dockedItems: [panel]
    });
    var dialogAdd = Ext.create('Ext.window.Window', {
        id: 'dialogAdd',
        closeAction: 'hide',
        title: '新增',
        width: 320,
        height: 360,
        modal: true,
        frame: true,
        layout: 'vbox',
        items: [{
            xtype: 'textfield',
            labelAlign: 'right',
            width: 270,
            style: 'margin: 25px 0px 5px 10px',
            fieldLabel: '试验地点编号',
            id: 'loc_code_add',
            labelWidth: 80
        }, {
            xtype: 'textfield',
            labelAlign: 'right',
            width: 270,
            style: 'margin: 10px 0px 5px 10px',
            fieldLabel: '试验地点描述',
            id: 'loc_desc_add',
            labelWidth: 80
        }, {
            xtype: 'combo',
            labelAlign: 'right',
            width: 270,
            style: 'margin: 10px 0px 5px 10px',
            fieldLabel: '所属厂矿',
            editable: false,
            queryMode: 'local',
            displayField: 'DEPARTNAME',
            valueField: 'DEPARTCODE',
            id: 'cktype_add',
            labelWidth: 80,
            store: palntStore_Add,
            listeners: {
                change: function () {
                    Ext.data.StoreManager.lookup('departStore_Add').load({
                        params: {
                            DEPARTCODE: [Ext.getCmp('cktype_add').getValue()]
                        }
                    });
                }
            }
        }, {
            xtype: 'combo',
            labelAlign: 'right',
            width: 270,
            style: 'margin: 10px 0px 5px 10px',
            fieldLabel: '所属部门',
            editable: false,
            queryMode: 'local',
            displayField: 'DEPARTNAME',
            valueField: 'DEPARTCODE',
            id: 'bmtype_add',
            labelWidth: 80,
            store: departStore_Add
        }, {
            xtype: 'textfield',
            labelAlign: 'right',
            width: 270,
            style: 'margin: 10px 0px 5px 10px',
            fieldLabel: '负责人ID',
            id: 'loc_userid_add',
            labelWidth: 80
        }, {
            xtype: 'textfield',
            labelAlign: 'right',
            width: 270,
            style: 'margin: 10px 0px 5px 10px',
            fieldLabel: '负责人姓名',
            id: 'loc_username_add',
            labelWidth: 80
        }],
        buttons: [{
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
        width: 320,
        height: 360,
        modal: true,
        frame: true,
        layout: 'vbox',
        items: [{
            xtype: 'textfield',
            labelAlign: 'right',
            width: 270,
            readOnly: true,
            style: 'margin: 25px 0px 5px 10px',
            fieldLabel: '试验地点编号',
            id: 'loc_code_edit',
            labelWidth: 80
        }, {
            xtype: 'textfield',
            labelAlign: 'right',
            width: 270,
            style: 'margin: 10px 0px 5px 10px',
            fieldLabel: '试验地点描述',
            id: 'loc_desc_edit',
            labelWidth: 80
        }, {
            xtype: 'combo',
            labelAlign: 'right',
            width: 270,
            style: 'margin: 10px 0px 5px 10px',
            fieldLabel: '所属厂矿',
            editable: false,
            queryMode: 'local',
            displayField: 'DEPARTNAME',
            valueField: 'DEPARTCODE',
            id: 'cktype_edit',
            labelWidth: 80,
            store: 'palntStore_Edit',
            listeners: {
                change: function () {
                    Ext.data.StoreManager.lookup('departStore_Edit').load({
                        params: {
                            DEPARTCODE: Ext.getCmp('cktype_edit').getValue()
                        }
                    });
                }
            }
        }, {
            xtype: 'combo',
            labelAlign: 'right',
            width: 270,
            style: 'margin: 10px 0px 5px 10px',
            fieldLabel: '所属部门',
            editable: false,
            queryMode: 'local',
            displayField: 'DEPARTNAME',
            valueField: 'DEPARTCODE',
            id: 'bmtype_edit',
            labelWidth: 80,
            store: 'departStore_Edit'
        }, {
            xtype: 'textfield',
            labelAlign: 'right',
            width: 270,
            style: 'margin: 10px 0px 5px 10px',
            fieldLabel: '负责人ID',
            id: 'loc_userid_edit',
            labelWidth: 80
        }, {
            xtype: 'textfield',
            labelAlign: 'right',
            width: 270,
            style: 'margin: 10px 0px 5px 10px',
            fieldLabel: '负责人姓名',
            id: 'loc_username_edit',
            labelWidth: 80
        }],
        buttons: [{
            id: 'sureedit',
            icon: imgpath + '/filesave.png',
            text: '保存',
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
    if (palntStoreLoad) {
        Ext.getBody().unmask();//去除页面笼罩
    }
}
function OnClickSearch() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            PLANTCODE_IN: Ext.getCmp('cktype').getValue(),
            DEPARTCODE_IN: Ext.getCmp('bmtype').getValue()
        }
    });
}
function OnClickAdd() {
    Ext.getCmp('loc_code_add').reset();
    Ext.getCmp('loc_desc_add').reset();
    Ext.getCmp('loc_userid_add').reset();
    Ext.getCmp('loc_username_add').reset();
    Ext.getCmp("cktype_add").select(Ext.data.StoreManager.lookup('palntStore_Add').first());
    Ext.getCmp("bmtype_add").select(Ext.data.StoreManager.lookup('departStore_Add').first());
    Ext.getCmp('dialogAdd').show();
}
function OnClickEdit() {
    var selectModel = Ext.getCmp("grid").getSelectionModel().getSelection();
    if (selectModel.length > 1) {
        Ext.Msg.alert('提示', '不能同时修改多条记录！');
    }
    else if (selectModel.length > 0) {
        globl_code = selectModel[0].data.LOC_CODE;
        globl_plantcode = selectModel[0].data.PLANTCODE;
        globl_departcode = selectModel[0].data.DEPARTCODE;
        Ext.getCmp('loc_code_edit').setValue(
            selectModel[0].data.LOC_CODE);
        Ext.getCmp('loc_desc_edit').setValue(
            selectModel[0].data.LOC_DESC);
        Ext.getCmp('loc_userid_edit').setValue(
            selectModel[0].data.LOC_USERID);
        Ext.getCmp('loc_username_edit').setValue(
            selectModel[0].data.LOC_USERNAME);
        Ext.getCmp('cktype_edit').setValue(globl_plantcode);
        Ext.getCmp('bmtype_edit').setValue(globl_departcode);
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
    // Ext.getCmp('dialogDelete').show();
}
function OnStartButtonClicked() {
    globl_code = Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.LOC_CODE;
    Ext.Ajax.request({
        url: AppUrl + '/yjn/PRO_SY103_STARTLOC',
        method: 'POST',
        params: {
            LOCCODE_IN: globl_code
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.RET == 'Success') {
                OnClickSearch();
                // Ext.data.StoreManager.lookup('gridStore').load();
                Ext.Msg.alert('操作信息', '启用成功');
            } else
                Ext.Msg.alert('操作信息', '启用失败');
        }
    });
}
function OnStopButtonClicked() {
    globl_code = Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.LOC_CODE;
    Ext.Ajax.request({
        url: AppUrl + '/yjn/PRO_SY103_STOPLOC',
        method: 'POST',
        params: {
            LOCCODE_IN: globl_code
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.RET == 'Success') {
                OnClickSearch();
                Ext.Msg.alert('操作信息', '停用成功');
            } else
                Ext.Msg.alert('操作信息', '停用失败');
        }
    });
}
function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}
function right(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}
function OnClickSubmitEdit() {
    if (Ext.getCmp('loc_code_edit').getValue() == '') {
        Ext.Msg.alert('错误操作', '试验地点编号不能为空!')
    } else if (Ext.getCmp('loc_desc_edit').getValue() == '') {
        Ext.Msg.alert('错误操作', '试验地点描述不能为空!')
    } else if (Ext.getCmp('loc_userid_edit').getValue() == '') {
        Ext.Msg.alert('错误操作', '负责人ID不能为空!')
    } else if (Ext.getCmp('loc_username_edit').getValue() == '') {
        Ext.Msg.alert('错误操作', '负责人姓名不能为空!')
    } else {
        Ext.Ajax.request({
            url: AppUrl + '/yjn/PRO_SY103_UPDATELOC',
            method: 'post',
            params: {
                LOCCODE_IN: Ext.getCmp('loc_code_edit').getValue(),
                LOCDESC_IN: Ext.getCmp('loc_desc_edit').getValue(),
                PLANTCODE_IN: Ext.getCmp('cktype_edit').getValue(),
                PLANTNAME_IN: Ext.getCmp('cktype_edit').getRawValue(),
                DEPARTCODE_IN: Ext.getCmp('bmtype_edit').getValue(),
                DEPARTNAME_IN: Ext.getCmp('bmtype_edit').getRawValue(),
                USERCODE_IN: Ext.getCmp('loc_userid_edit').getValue(),
                USERNAME_IN: Ext.getCmp('loc_username_edit').getValue()
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);//后台返回的值
                if (data.RET == 'Success') {//成功，会传回true
                    //_selectEquList();
                    OnClickSearch();
                    //Ext.data.StoreManager.lookup('gridStore').load();
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
    if (Ext.getCmp('loc_code_add').getValue() == '') {
        Ext.Msg.alert('错误操作', '试验地点编号不能为空!')
    } else if (Ext.getCmp('loc_desc_add').getValue() == '') {
        Ext.Msg.alert('错误操作', '试验地点描述不能为空!')
    } else if (Ext.getCmp('loc_userid_add').getValue() == '') {
        Ext.Msg.alert('错误操作', '负责人ID不能为空!')
    } else if (Ext.getCmp('loc_username_add').getValue() == '') {
        Ext.Msg.alert('错误操作', '负责人姓名不能为空!')
    } else {
        Ext.Ajax.request({
            url: AppUrl + '/yjn/PRO_SY103_ADDLOC',
            method: 'post',
            params: {
                LOCCODE_IN: Ext.getCmp('loc_code_add').getValue(),
                LOCDESC_IN: Ext.getCmp('loc_desc_add').getValue(),
                PLANTCODE_IN: Ext.getCmp('cktype_add').getValue(),
                PLANTNAME_IN: Ext.getCmp('cktype_add').getRawValue(),
                DEPARTCODE_IN: Ext.getCmp('bmtype_add').getValue(),
                DEPARTNAME_IN: Ext.getCmp('bmtype_add').getRawValue(),
                USERCODE_IN: Ext.getCmp('loc_userid_add').getValue(),
                USERNAME_IN: Ext.getCmp('loc_username_add').getValue()
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);//后台返回的值
                if (data.RET == 'Success') {//成功，会传回true
                    //_selectEquList();
                    OnClickSearch();
                    //Ext.data.StoreManager.lookup('gridStore').load();
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
                        url: AppUrl + '/yjn/PRO_SY103_DELETELOC',
                        type: 'ajax',
                        method: 'post',
                        async: false,
                        params: {
                            LOCCODE_IN: records[i].data.LOC_CODE
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
                    OnClickSearch();
                }
            }
        });
    }
    ;
}

function beforeloadStore(store) {
    store.proxy.extraParams.parVal = [globl_plantcode, globl_departcode];
}

function OnClickCancel() {
    Ext.getCmp('dialogDelete').hide();
}

function renderer_start(value, metaData, record, rowIdx, colIdx, store, view) {
    var status = record.data.LOC_STATUS;
    if (status == '0') {
        return "<img src='"
            + imgpath
            + "/flag1_16x16.gif' style='cursor:pointer' onclick='OnStartButtonClicked(\""
            + record.data.LOC_CODE + "\")' />";
    }
    else {
        return '';
    }
}

function renderer_stop(value, metaData, record, rowIdx, colIdx, store, view) {
    var status = record.data.LOC_STATUS;
    if (status == '0') {
        return '';
    }
    else {
        return "<img src='"
            + imgpath
            + "/flag2_16x16.gif' style='cursor:pointer' onclick='OnStopButtonClicked(\""
            + record.data.LOC_CODE + "\")' />";
    }
}
