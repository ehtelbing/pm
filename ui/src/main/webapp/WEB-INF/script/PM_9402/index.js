/// <reference path="../Shared/ext-all-debug-w-comments.js" />
//Ext.BLANK_IMAGE_URL = '../../resources/themes/images/Default/tree/s.gif';

var ckstore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'ckstore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'zdh/plant_sel',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            IS_V_DEPTCODE: "",
            IS_V_DEPTTYPE: '[基层单位]'
        }
    }
});

var GridPanel = Ext.create('Ext.grid.Panel', {
    id: 'gridPanel',
    border: false,
    region: 'center',
    store: Ext.create('Ext.data.Store', {
        id: 'gridstore',
        autoLoad: false,
        fields: ['I_ROLEID', 'V_ROLECODE', 'V_ROLENAME', 'V_ROLEMEMO',
            'V_ROLETYPE', 'I_ORDERID','V_DEPTCODE'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'basic/PRO_BASE_PERSONROLE_VIEW_NEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    }),
    columns: [{
        xtype: 'rownumberer',
        width: 30
    }, {
        ID: 'V_ROLECODE',
        text: "角色编码",
        dataIndex: 'V_ROLECODE'
    }, {
        ID: 'V_ROLENAME',
        text: "角色名称",
        dataIndex: 'V_ROLENAME'
    }, {
        ID: 'V_ROLETYPE',
        text: "角色类型",
        dataIndex: 'V_ROLETYPE'
    }],
    dockedItems: [{
        xtype: 'panel',
        layout: 'column',
        border:false,
        defaults : {
            style : 'margin:5px 0px 5px 5px',
            labelAlign : 'right'
        },
        margin:'5',
        items: [{
            id: 'ck',
            xtype: 'combo',
            store: ckstore,
            editable: false,
            fieldLabel: '厂矿',
            labelWidth: 60,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            baseCls: 'margin-bottom',
            listeners: {
                change: function () {
                    query();
                }
            }
        }, {
            text: '添加',
            itemId: 'create',
            xtype: 'button',
            listeners: {
                click: OnClickAddButton
            }
        }, {
            text: '修改',
            itemId: 'update',
            xtype: 'button',
            listeners: {
                click: OnClickUpdateButton
            }
        }, {
            text: '删除',
            itemId: 'delete',
            xtype: 'button',
            listeners: {
                click: OnClickDeleteButton
            }
        }]
    }]
});

//var MenuTree = Ext.create('Ext.tree.Panel', {
//	flex : 1,
//	id : 'MenuTree',
//	rootVisible : false,
//	border : false,
//	autoScroll : true,
//	store : Ext.create('Ext.data.TreeStore', {
//		id : 'menutreestore',
//		autoLoad : false,
//		fields : [ 'id', 'text', 'parentid' ],
//		autoDestroy : true,
//		proxy : {
//			type : 'ajax',
//			url : APP + '/NewMenuTree',
//			actionMethods : {
//				read : 'POST'
//			}
//		},
//		reader : {
//			type : 'json'
//		},
//		root : {
//			text : 'root',
//			expanded : true
//		}
//	}),
//	listeners : {
//		checkchange : OnClickMenuCheckTree
//	}
//});

//var RoleTree = Ext.create('Ext.tree.Panel', {
//	flex : 1,
//	id : 'RoleTree',
//	rootVisible : false,
//	border : false,
//	autoScroll : true,
//	store : Ext.create('Ext.data.TreeStore', {
//		id : 'roletreestore',
//		autoLoad : false,
//		fields : [ 'id', 'text', 'parentid' ],
//		autoDestroy : true,
//		proxy : {
//			type : 'ajax',
//			url : APP + '/NewRoleTree',
//			actionMethods : {
//				read : 'POST'
//			}
//		},
//		reader : {
//			type : 'json'
//		},
//		root : {
//			text : 'root',
//			expanded : true
//		}
//	})
//});

function query() {
    Ext.data.StoreManager.lookup('gridstore').load({
        params: {
            V_V_DEPTCODE: Ext.getCmp('ck').getValue()
        }
    });
}
Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [GridPanel]
    });

    Ext.data.StoreManager.lookup('ckstore').on('load', function () {
        Ext.getCmp('ck').select(Ext.data.StoreManager.
            lookup('ckstore').getAt(0));
    });

    Ext.create('Ext.window.Window', {
        id: 'Dialog',
        title: '角色管理',
        height: 250,
        minHeight: 220,
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
            id: 'V_V_ROLECODE',
            name: 'V_V_ROLECODE',
            fieldLabel: '角色编码',
            hideLabel: true
        }, {
            xtype: 'textfield',
            height: 25,
            maxHeight: 25,
            editable: false,
            readOnly: true,
            id: 'V_V_DEPT',
            name: 'V_V_DEPT',
            fieldLabel: '单位编码'
        }, {
            xtype: 'textfield',
            height: 25,
            maxHeight: 25,
            id: 'V_V_ROLENAME',
            name: 'V_V_ROLENAME',
            fieldLabel: '角色名称'
        }, {
            xtype: 'textfield',
            height: 25,
            maxHeight: 25,
            id: 'V_V_ROLEMEMO',
            name: 'V_V_ROLEMEMO',
            fieldLabel: '备注'
        }, {
            xtype: 'textfield',
            height: 25,
            maxHeight: 25,
            id: 'V_V_ROLETYPE',
            name: 'V_V_ROLETYPE',
            fieldLabel: '角色类型'
        }, {
            xtype: 'textfield',
            flex: 1,
            height: 25,
            maxHeight: 25,
            id: 'V_I_ORDERID',
            name: 'V_I_ORDERID',
            fieldLabel: '排序'
        }],
        buttons: [
            {
                text: '保存',
                handler: function () {
                    Ext.Ajax.request({
                        url: AppUrl + 'basic/PRO_BASE_PERSONROLE_SET_NEW',
                        // url : 'PRO_BASE_PERSONROLE_SET',
                        params: {
                            //parName : [ "V_V_ROLECODE", "V_V_ROLENAME",
                            //		"V_V_ROLEMEMO", "V_V_ROLETYPE",
                            //		"V_I_ORDERID" ],
                            //parType : [ "s", "s", "s", "s", "int" ],
                            //parVal : [ Ext.getCmp('V_V_ROLECODE').value,
                            //		Ext.getCmp('V_V_ROLENAME').value,
                            //		Ext.getCmp('V_V_ROLEMEMO').value,
                            //		Ext.getCmp('V_V_ROLETYPE').value,
                            //		Ext.getCmp('V_I_ORDERID').value ],
                            //proName : 'PRO_BASE_PERSONROLE_SET'
                            V_V_ROLECODE: Ext.getCmp('V_V_ROLECODE').value,
                            V_V_ROLENAME: Ext.getCmp('V_V_ROLENAME').value,
                            V_V_ROLEMEMO: Ext.getCmp('V_V_ROLEMEMO').value,
                            V_V_ROLETYPE: Ext.getCmp('V_V_ROLETYPE').value,
                            V_I_ORDERID: Ext.getCmp('V_I_ORDERID').value,
                            V_V_DEPTCODE: Ext.getCmp('ck').value
                        },
                        success: function (response) {
                            var resp = Ext.JSON
                                .decode(response.responseText);
                            //Ext.MessageBox.alert('操作信息', "成功",
                            //    function () {
                            //        Ext.getCmp('Dialog').hide();
                            //        Ext.getCmp('gridPanel').store
                            //            .load();
                            //    });
                            query();
                        }
                    });
                    Ext.getCmp('Dialog').hide();
                }
            }, {
                text: '关闭',
                handler: function () {
                    Ext.getCmp('Dialog').hide();
                }
            }]
    });
});

function OnClickGridPanel(pp, record, item, index, e, eOpts) {

    Ext.data.StoreManager.get('menutreestore').load({
        params: {
            role: record.data.V_ROLECODE
        }
    });

    Ext.data.StoreManager.get('roletreestore').load({
        params: {
            role: record.data.V_ROLECODE
        }
    });

}

function OnClickMenuCheckTree(node, checked, eOpts) {

    var selectModel = Ext.getCmp('gridPanel').getSelectionModel();
    if (!selectModel.hasSelection()) {
        return;
    }
    var selectedModel = selectModel.getSelection()[0].data;

    if (checked == true) {
        Ext.Ajax.request({
            url: APP + '/ModelChange',
            // url : 'PRO_BASE_ROLETOMENU_SET',
            type: 'ajax',
            async: false,
            method: 'POST',
            params: {
                parName: ["v_v_rolecode", "v_v_menucode"],
                parType: ["s", "s"],
                parVal: [selectedModel.V_ROLECODE, node.raw.id],
                proName: 'PRO_BASE_ROLETOMENU_SET'
                // v_v_rolecode : selectedModel.V_ROLECODE,
                // v_v_menucode : node.raw.id
            }
        });

    } else {
        Ext.Ajax.request({
            url: APP + '/ModelChange',
            // url : 'PRO_BASE_ROLETOMENU_DEL',
            type: 'ajax',
            async: false,
            method: 'POST',
            params: {
                parName: ["v_v_rolecode", "v_v_menucode"],
                parType: ["s", "s"],
                parVal: [selectedModel.V_ROLECODE, node.raw.id],
                proName: 'PRO_BASE_ROLETOMENU_DEL'

                // v_v_rolecode : selectedModel.V_ROLECODE,
                // v_v_menucode : node.raw.id
            }
        });
    }

    Ext.data.StoreManager.get('roletreestore').load({
        params: {
            role: selectedModel.V_ROLECODE
        }
    });

}

function OnClickAddButton() {
    Ext.getCmp('V_V_DEPT').setValue(Ext.getCmp('ck').getRawValue());
    Ext.getCmp('V_V_ROLECODE').setValue('');
    Ext.getCmp('V_V_ROLENAME').setValue('');
    Ext.getCmp('V_V_ROLEMEMO').setValue('');
    Ext.getCmp('V_V_ROLETYPE').setValue('');
    Ext.getCmp('V_I_ORDERID').setValue('');

    Ext.getCmp('Dialog').show();
}

function OnClickUpdateButton() {
    var selectModel = Ext.getCmp('gridPanel').getSelectionModel();
    if (!selectModel.hasSelection()) {
        return;
    }
    var selectedModel = selectModel.getSelection()[0].data;
    Ext.getCmp('V_V_DEPT').setValue(Ext.getCmp('ck').getRawValue());
    Ext.getCmp('V_V_ROLECODE').setValue(selectedModel.V_ROLECODE);
    Ext.getCmp('V_V_ROLENAME').setValue(selectedModel.V_ROLENAME);
    Ext.getCmp('V_V_ROLEMEMO').setValue(selectedModel.V_ROLEMEMO);
    Ext.getCmp('V_V_ROLETYPE').setValue(selectedModel.V_ROLETYPE);
    Ext.getCmp('V_I_ORDERID').setValue(selectedModel.I_ORDERID);

    Ext.getCmp('Dialog').show();
}

function OnClickDeleteButton() {

    var selectModel = Ext.getCmp('gridPanel').getSelectionModel();
    if (!selectModel.hasSelection()) {
        return;
    }
    var selectedModel = selectModel.getSelection()[0].data;

    Ext.Ajax.request({
        url: AppUrl + 'basic/PRO_BASE_PERSONROLE_DEL_NEW',
        type: 'post',
        method: 'POST',
        params: {
            //parName: ["V_V_ROLECODE"],
            //parType: ["s"],
            //parVal: [selectedModel.V_ROLECODE],
            //proName: 'PRO_BASE_PERSONROLE_DEL',
            //returnStr: ["V_RET"],
            //returnStrType: ["s"]
            V_V_ROLECODE : selectedModel.V_ROLECODE,
            V_V_DEPTCODE : selectedModel.V_DEPTCODE
        },
        success: function (response) {
            query();
        }
    });

}