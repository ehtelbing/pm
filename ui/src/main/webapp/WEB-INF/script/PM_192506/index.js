/// <reference path="../Shared/ext-all-debug-w-comments.js" />
//Ext.BLANK_IMAGE_URL = '../../resources/themes/images/Default/tree/s.gif';
var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var menuTreeLoad = true;
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

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: false,
        fields: ['I_MODULEID', 'V_MODULECODE', 'V_MODULENAME', 'V_ROLETYPE', 'V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PRO_BASE_MODULE_SEL',
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

    var GridPanel = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel',
        region: 'center',
        loadMask: true,
        frame: false,
        border: false,
        listeners: {
            itemclick: OnClickGridPanel
        },
        store: gridStore,
        columns: [{
            xtype: 'rownumberer',
            width: 60
        }, {
            ID: 'V_MODULECODE',
            text: "模块编码",
            dataIndex: 'V_MODULECODE'
        }, {
            ID: 'V_MODULENAME',
            text: "模块名称",
            dataIndex: 'V_MODULENAME'
        }]
    });
    var westPanel = Ext.create('Ext.panel.Panel', {
        flex: 2,
        border: false,
        layout: 'border',
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            frame: true,
            items: [{
                text: '新增',
                itemId: 'create',
                xtype: 'button',
                icon: imgpath + '/add.png',
                style: 'margin:5px 0px 5px 15px',
                listeners: {
                    click: OnClickAddButton
                }
            }, {
                text: '修改',
                itemId: 'update',
                xtype: 'button',
                icon: imgpath + '/edit.png',
                style: 'margin:5px 0px 5px 5px',
                listeners: {
                    click: OnClickUpdateButton
                }
            }, {
                text: '删除',
                itemId: 'delete',
                xtype: 'button',
                icon: imgpath + '/delete1.png',
                style: 'margin:5px 0px 5px 5px',
                listeners: {
                    click: OnClickDeleteButton
                }
            }]
        }, GridPanel]
    });

    var MenuTree = Ext.create('Ext.tree.Panel', {
        flex: 1,
        id: 'MenuTree',
        rootVisible: false,
        border: false,
        autoScroll: true,
        store: Ext.create('Ext.data.TreeStore', {
            id: 'menutreestore',
            autoLoad: false,
            fields: ['id', 'text', 'parentid'],
            autoDestroy: true,
            listeners: {
                load: function (store, records) {
                    menuTreeLoad = true;
                }
            }
        }),
        listeners: {
            checkchange: OnClickMenuCheckTree
        }
    });

    var RoleTree = Ext.create('Ext.tree.Panel', {
        flex: 1,
        id: 'RoleTree',
        rootVisible: false,
        border: false,
        autoScroll: true,
        store: Ext.create('Ext.data.TreeStore', {
            id: 'roletreestore',
            autoLoad: false,
            fields: ['id', 'text', 'parentid'],
            autoDestroy: true
        })
    });

    var modulePreAdd = Ext.create('Ext.window.Window', {
        id: 'modulePreAdd',
        height: 300,
        minHeight: 250,
        width: 400,
        closable: true,
        closeAction: 'hide',
        layout: {
            align: 'stretch',
            pack: 'center',
            padding: 20,
            type: 'vbox'
        },
        items: [{
            xtype: 'hiddenfield',
            value: '',
            id: 'I_MODULEID',
            name: 'I_MODULEID',
            fieldLabel: '模块ID',
            hideLabel: true
        }, {
            xtype: 'textfield',
            height: 25,
            maxHeight: 25,
            id: 'V_V_MODULECODE',
            name: 'V_V_MODULECODE',
            fieldLabel: '模块编码',
            allowBlank: false
        }, {
            xtype: 'textfield',
            height: 25,
            maxHeight: 25,
            id: 'V_V_MODULENAME',
            name: 'V_V_MODULENAME',
            fieldLabel: '模块名称',
            allowBlank: false
        }],
        buttons: [{
            xtype: 'button',
            text: '保存',
            width: 40,
            handler: function () {
                _save();
            }
        }, {
            xtype: 'button',
            text: '取消',
            width: 40,
            handler: function () {
                Ext.getCmp('modulePreAdd').hide();
            }
        }]
    });


    Ext.create('Ext.container.Viewport', {
        xtype: 'panel',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [westPanel, MenuTree, RoleTree]
    });


    init();
});

function init() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    /*gridStore.proxy.extraParams = {
     V_V_DEPTCODE: Ext.getCmp('ck').getValue()
     };*/
    gridStore.load();
}

function _save() {
    if (!_validate(Ext.getCmp('modulePreAdd'))) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请录入这些必填项',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }
    Ext.Ajax.request({
        url: AppUrl + 'hp/PRO_BASE_MODULE_SET',
        params: {
            V_V_MODULEID: Ext.getCmp('I_MODULEID').value,
            V_V_MODULECODE: Ext.getCmp('V_V_MODULECODE').value,
            V_V_MODULENAME: Ext.getCmp('V_V_MODULENAME').value
        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText);
            Ext.getCmp('modulePreAdd').hide();
            Ext.getCmp('gridPanel').store.load();
        }
    });
    Ext.getCmp('modulePreAdd').hide();
}


function OnClickGridPanel(pp, record, item, index, e, eOpts) {
    if (menuTreeLoad) {
        QueryMenuTree();
        QueryRoleTree();
    }


}

function OnClickMenuCheckTree(node, checked, eOpts) {
    var selectModel = Ext.getCmp('gridPanel').getSelectionModel();
    if (!selectModel.hasSelection()) {
        return;
    }
    var selectedModel = selectModel.getSelection()[0].data;

    if (checked == true) {
        Ext.Ajax.request({
            url: AppUrl + 'hp/PRO_BASE_MODULETOMENU_SET',
            type: 'ajax',
            async: false,
            method: 'POST',
            params: {
                V_V_FLAG: 1,
                V_V_MODULECODE: selectedModel.V_MODULECODE,
                V_V_MENUCODE: node.raw.id

            }
        });

    } else {
        Ext.Ajax.request({
            url: AppUrl + 'hp/PRO_BASE_MODULETOMENU_SET',
            type: 'ajax',
            async: false,
            method: 'POST',
            params: {
                V_V_FLAG: 0,
                V_V_MODULECODE: selectedModel.V_MODULECODE,
                V_V_MENUCODE: node.raw.id
            }
        });
    }
    QueryRoleTree();
}
function QueryMenuTree() {
    menuTreeLoad = false;
    var seldata = Ext.getCmp('gridPanel').getSelectionModel().getSelection();
    Ext.getCmp('MenuTree').store.setProxy({
        type: 'ajax',
        actionMethods: {
            read: 'POST'
        },
        async: false,
        url: AppUrl + 'hp/NewModuleMenuTree',
        reader: {
            type: 'json'
        },
        root: {
            expanded: true
        },
        extraParams: {
            V_V_MODULECODE: seldata[0].data.V_MODULECODE
        }
    });
    Ext.getCmp('MenuTree').store.load();
}
function QueryRoleTree() {
    var seldata = Ext.getCmp('gridPanel').getSelectionModel().getSelection();
    Ext.getCmp('RoleTree').store.setProxy({
        type: 'ajax',
        actionMethods: {
            read: 'POST'
        },
        async: false,
        url: AppUrl + 'hp/NewModuleRoleTree',
        reader: {
            type: 'json'
        },
        root: {
            expanded: true
        },
        extraParams: {
            V_V_MODULECODE: seldata[0].data.V_MODULECODE
        }
    });
    Ext.getCmp('RoleTree').store.load();
}

function OnClickAddButton() {
    Ext.getCmp('I_MODULEID').setValue('-1');
    Ext.getCmp('V_V_MODULECODE').setValue('');
    Ext.getCmp('V_V_MODULENAME').setValue('');
    Ext.getCmp('modulePreAdd').setTitle('新增');
    Ext.getCmp('modulePreAdd').show();
}

function OnClickUpdateButton() {
    var selectModel = Ext.getCmp('gridPanel').getSelectionModel();
    if (!selectModel.hasSelection()) {
        return;
    }
    var selectedModel = selectModel.getSelection()[0].data;
    Ext.getCmp('I_MODULEID').setValue(selectedModel.I_MODULEID);
    Ext.getCmp('V_V_MODULECODE').setValue(selectedModel.V_MODULECODE);
    Ext.getCmp('V_V_MODULENAME').setValue(selectedModel.V_MODULENAME);
    Ext.getCmp('modulePreAdd').setTitle('修改');
    Ext.getCmp('modulePreAdd').show();
}

function OnClickDeleteButton() {

    var selectModel = Ext.getCmp('gridPanel').getSelectionModel();
    if (!selectModel.hasSelection()) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条要删除的数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }
    var selectedModel = selectModel.getSelection()[0].data;

    Ext.Ajax.request({
        url: AppUrl + 'hp/PRO_BASE_MODULE_DEL',
        type: 'post',
        method: 'POST',
        params: {
            V_V_MODULEID: selectedModel.I_MODULEID
        },
        success: function (response) {
            Ext.getCmp('gridPanel').getStore().load();
        }
    });

    Ext.getCmp('modulePreAdd').hide();
}


function _validate(obj) {
    var valid = true;
    for (var i = 0; i < obj.items.length; i++) {
        if (obj.items.getAt(i).xtype != 'button' && obj.items.getAt(i).xtype != 'panel' && !obj.items.getAt(i).validate()) {
            valid = false;
        }
    }
    return valid;
}
