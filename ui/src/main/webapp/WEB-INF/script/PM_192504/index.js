﻿/// <reference path="../Shared/ext-all-debug-w-comments.js" />
//Ext.BLANK_IMAGE_URL = '../../resources/themes/images/Default/tree/s.gif';
var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var menuTreeLoad = true;
Ext.define('Ext.ux.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    async:true,
    doRequest: function(operation, callback, scope) {
        var writer  = this.getWriter(),
            request = this.buildRequest(operation);
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        Ext.apply(request, {
            async         : this.async,
            binary        : this.binary,
            headers       : this.headers,
            timeout       : this.timeout,
            scope         : this,
            callback      : this.createRequestCallback(request, operation, callback, scope),
            method        : this.getMethod(request),
            disableCaching: false
        });
        Ext.Ajax.request(request);
        return request;
    }
});

var deptStore = Ext.create('Ext.data.Store', {
    autoLoad : true,
    storeId : 'selPlantstore',
    fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
    proxy : {
        type : 'ajax',
        async : false,
        url : AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        },
        extraParams : {
            V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
            V_V_DEPTCODENEXT:Ext.util.Cookies.get('v_deptcode'),
            V_V_DEPTTYPE:'[基层单位]'
        }
    }
});

var ckstore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'ckstore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy:Ext.create("Ext.ux.data.proxy.Ajax",  {
        type: 'ajax',
        async: false,
        url: AppUrl +'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
        // url: 'PRO_BASE_DEPT_VIEW_ROLE',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            'V_V_PERSONCODE': V_V_PERSONCODE,
            'V_V_DEPTCODE': V_V_DEPTCODE,
            'V_V_DEPTCODENEXT': '%',
            'V_V_DEPTTYPE': '基层单位'
        }
    }),
    listeners: {
        load: function (store, records) {
            Ext.getCmp('ck').select(store.first());
        }
    }
});
var gridStore = Ext.create('Ext.data.Store', {
    id: 'gridStore',
    autoLoad: false,
    fields : [ 'I_ROLEID', 'V_ROLECODE', 'V_ROLENAME', 'V_ROLETYPE', 'V_DEPTCODE','V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'hp/PRO_BASE_PERSONROLE_VIEW_NEW',
        // url: 'PM_14_FAULT_ITEM_SEL',
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
    id : 'gridPanel',
    region:'center',
    loadMask : true,
    frame : false,
    border : false,
    listeners : {
        itemclick : OnClickGridPanel
    },
    store: gridStore,
    columns : [ {
        xtype : 'rownumberer',
        width : 30
    }, {
        ID : 'V_ROLECODE',
        text : "角色编码",
        dataIndex : 'V_ROLECODE'
    }, {
        ID : 'V_ROLENAME',
        text : "角色名称",
        dataIndex : 'V_ROLENAME'
    }, {
        ID : 'V_ROLETYPE',
        text : "角色类型",
        dataIndex : 'V_ROLETYPE'
    }, {
        ID : 'V_DEPTNAME',
        text : "部门",
        width : 150,
        dataIndex : 'V_DEPTNAME'
    }]
});
var westPanel= Ext.create('Ext.panel.Panel', {
    flex: 2,
    border: false,
    layout: 'border',
    items: [{
        xtype : 'panel',
        region:'north',
        layout : 'column',
        frame:true,
        items : [{
            id: 'ck',
            xtype: 'combo',
            store: ckstore,
            fieldLabel: '厂矿',
            editable: false,
            labelWidth: 50,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 5px 10px',
            labelAlign: 'right',
            width: 200,
            listeners: {
                select: function (field, newValue, oldValue) {
                    init();
                }
            }
        }, {
            text : '新增',
            itemId : 'create',
            xtype : 'button',
            icon: imgpath +'/add.png',
            style : 'margin:5px 0px 5px 15px',
            listeners : {
                click : OnClickAddButton
            }
        }, {
            text : '修改',
            itemId : 'update',
            xtype : 'button',
            icon: imgpath +'/edit.png',
            style : 'margin:5px 0px 5px 5px',
            listeners : {
                click : OnClickUpdateButton
            }
        }, {
            text : '删除',
            itemId : 'delete',
            xtype : 'button',
            icon: imgpath +'/delete1.png',
            style : 'margin:5px 0px 5px 5px',
            listeners : {
                click : OnClickDeleteButton
            }
        } ]
    },GridPanel ]
});



var MenuTreeStore = Ext.create('Ext.data.TreeStore',{
    id : 'MenuTreeStore',
    autoLoad : false,
    fields : [ 'id', 'text', 'parentid'],
    autoDestroy : true,
    checked:true,
    listeners: {
        load: function (store, records) {
            menuTreeLoad = true;
        }
    }
});

var MenuTree = Ext.create('Ext.tree.Panel', {
    flex : 1,
    id : 'MenuTree',
    rootVisible : false,
    border : false,
    autoScroll : true,
    store:MenuTreeStore
});

var RoleTree = Ext.create('Ext.tree.Panel', {
    flex : 1,
    id : 'RoleTree',
    rootVisible : false,
    border : false,
    autoScroll : true,
    store : Ext.create('Ext.data.TreeStore', {
        id : 'roletreestore',
        autoLoad : false,
        checked:false,
        fields : [ 'id', 'text', 'parentid' ],
        autoDestroy : true
    })
});

Ext.onReady(function() {

    Ext.create('Ext.container.Viewport', {
        xtype : 'panel',
        layout : {
            type : 'hbox',
            align : 'stretch'
        },
        items : [ westPanel, MenuTree, RoleTree ]
    });
    MenuTree.on('checkChange', function(node, checked,eOpts) {
        OnClickMenu(node, checked, eOpts);

    }, MenuTree);


    Ext.create('Ext.window.Window', {
        id : 'Dialog',
        height : 300,
        minHeight : 250,
        width : 400,
        closable : true,
        closeAction : 'hide',
        layout : {
            align : 'stretch',
            pack : 'center',
            padding : 20,
            type : 'vbox'
        },
        items : [ {
            xtype : 'hiddenfield',
            value : '',
            id : 'V_I_ROLEID',
            name : 'V_I_ROLEID',
            fieldLabel : '角色ID',
            hideLabel : true
        }, {
            xtype : 'hiddenfield',
            value : '',
            id : 'V_V_ROLECODE',
            name : 'V_V_ROLECODE',
            fieldLabel : '角色编码',
            hideLabel : true
        }, {
            xtype : 'textfield',
            height : 25,
            maxHeight : 25,
            id : 'V_V_ROLENAME',
            name : 'V_V_ROLENAME',
            fieldLabel : '角色名称'
        }, {
            xtype : 'textfield',
            height : 25,
            maxHeight : 25,
            id : 'V_V_ROLEMEMO',
            name : 'V_V_ROLEMEMO',
            fieldLabel : '备注'
        }, {
            xtype : 'textfield',
            height : 25,
            maxHeight : 25,
            id : 'V_V_ROLETYPE',
            name : 'V_V_ROLETYPE',
            fieldLabel : '角色类型'
        }, {
            id : 'V_V_DEPTCODE',
            name : 'V_V_DEPTCODE',
            xtype : 'combo',
            fieldLabel : '部门',
            height : 25,
            maxHeight : 25,
            store: deptStore,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local'
        }, {
            xtype : 'textfield',
            flex : 1,
            height : 25,
            maxHeight : 25,
            id : 'V_I_ORDERID',
            name : 'V_I_ORDERID',
            fieldLabel : '排序'
        } ],
        buttons : [
            {text : '保存',
                handler : function() {
                    alert(Ext.getCmp('V_V_DEPTCODE').value);
                    Ext.Ajax.request({
                        url : AppUrl + 'pm_19/PRO_BASE_PERSONROLE_SET',
                        params : {
                            V_V_ROLECODE : Ext.getCmp('V_V_ROLECODE').value,
                            V_V_ROLENAME : Ext.getCmp('V_V_ROLENAME').value,
                            V_V_ROLEMEMO : Ext.getCmp('V_V_ROLEMEMO').value,
                            V_V_ROLETYPE : Ext.getCmp('V_V_ROLETYPE').value,
                            V_I_ORDERID :  Ext.getCmp('V_I_ORDERID').value,
                            V_V_DEPTCODE : Ext.getCmp('V_V_DEPTCODE').value
                        },
                        success : function(response) {
                            var resp = Ext.JSON.decode(response.responseText);
                            Ext.MessageBox.alert('操作信息', "成功",
                                function() {
                                    Ext.getCmp('Dialog').hide();
                                    Ext.getCmp('gridPanel').store.load();
                                });
                        }
                    });
                    Ext.getCmp('Dialog').hide();
                }
            }, {
                text : '关闭',
                handler : function() {
                    Ext.getCmp('Dialog').hide();
                }
            } ]
    });
    deptStore.on("load", function () {
        Ext.getCmp("V_V_DEPTCODE").select(deptStore.getAt(0));
    });

    init();
});

function init()
{
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        V_V_DEPTCODE: Ext.getCmp('ck').getValue()
    };
    gridStore.load();
}


function OnClickGridPanel(pp, record, item, index, e, eOpts) {

    if(menuTreeLoad)
    {
        QueryMenuTree();
        QueryRoleTree();
    }

}

function OnClickMenu(node, checked, eOpts){

    function ck(node, checked, eOpts) {
        Ext.Array.each(node.childNodes, function(item, index, allItems){
            item.set('checked', checked);
            onclick(item, checked, eOpts);
            if(!item.isLeaf() && node.hasChildNodes()){
                ck(item, checked, eOpts);
            }
        });

    }

    function rck(node, checked, eOpts) {
        if(checked){
            Ext.Array.each(node.parentNode.childNodes, function(item, index, allItems){
                item.parentNode.set('checked',checked);
                if(!item.parentNode.isRoot())
                  rck(item.parentNode);
            });
        }
    }
    if(!node.isLeaf() && node.hasChildNodes()){
        ck(node, checked, eOpts);
    }
    if(node.parentNode!=null){
        rck(node, checked, eOpts);
    }

    onclick(node, checked, eOpts);
    QueryRoleTree();

}

function onclick(node, checked, eOpts){
    var selectModel = Ext.getCmp('gridPanel').getSelectionModel();

    if (!selectModel.hasSelection()) {
        return;
    }
    var selectedModel = selectModel.getSelection()[0].data;

    if (checked == true) {
        Ext.Ajax.request({
            url : AppUrl + 'basic/PRO_BASE_ROLETOMENU_SET',
            type : 'ajax',
            async : false,
            method : 'POST',
            params : {
                V_V_ROLECODE : selectedModel.V_ROLECODE,
                V_V_MENUCODE : node.raw.id,
                V_V_DEPTCODE : selectedModel.V_DEPTCODE
            }
        });

    } else {
        Ext.Ajax.request({
            url : AppUrl + 'basic/PRO_BASE_ROLETOMENU_DEL',
            type : 'ajax',
            async : false,
            method : 'POST',
            params : {
                V_V_ROLECODE : selectedModel.V_ROLECODE,
                V_V_MENUCODE : node.raw.id,
                V_V_DEPTCODE : selectedModel.V_DEPTCODE
            }
        });
    }



}

function QueryMenuTree(){
    menuTreeLoad = false;
    var seldata= Ext.getCmp('gridPanel').getSelectionModel().getSelection();
    Ext.getCmp('MenuTree').store.setProxy({
        type : 'ajax',
        actionMethods : {
            read : 'POST'
        },
        async : false,
        url : AppUrl + 'pm_19/NewMenuTree',
        reader : {
            type : 'json'
        },
        root : {
            expanded : true
        },
        extraParams : {
            role : seldata[0].data.V_ROLECODE,
            V_V_DEPTCODE:seldata[0].data.V_DEPTCODE
        }
    });
    Ext.getCmp('MenuTree').store.load();
}
function QueryRoleTree(){
    var seldata= Ext.getCmp('gridPanel').getSelectionModel().getSelection();
    Ext.getCmp('RoleTree').store.setProxy({
        type : 'ajax',
        actionMethods : {
            read : 'POST'
        },
        async : false,
        url : AppUrl + 'pm_19/NewRoleTree',
        reader : {
            type : 'json'
        },
        root : {
            expanded : true
        },
        extraParams : {
            role : seldata[0].data.V_ROLECODE,
            V_V_DEPTCODE:seldata[0].data.V_DEPTCODE
        }
    });
    Ext.getCmp('RoleTree').store.load();
}

function OnClickAddButton() {
    Ext.getCmp('V_V_ROLECODE').setValue('0');
    Ext.getCmp('V_V_ROLENAME').setValue('');
    Ext.getCmp('V_V_ROLEMEMO').setValue('');
    Ext.getCmp('V_V_ROLETYPE').setValue('');
    Ext.getCmp('V_I_ORDERID').setValue('');
    Ext.getCmp('Dialog').setTitle('新增');
    Ext.getCmp('Dialog').show();
}

function OnClickUpdateButton() {
    var selectModel = Ext.getCmp('gridPanel').getSelectionModel();
    if (!selectModel.hasSelection()) {
        return;
    }
    var selectedModel = selectModel.getSelection()[0].data;
    Ext.getCmp('V_I_ROLEID').setValue(selectedModel.I_ROLEID);
    Ext.getCmp('V_V_ROLECODE').setValue(selectedModel.V_ROLECODE);
    Ext.getCmp('V_V_ROLENAME').setValue(selectedModel.V_ROLENAME);
    Ext.getCmp('V_V_ROLEMEMO').setValue(selectedModel.V_ROLEMEMO);
    Ext.getCmp('V_V_ROLETYPE').setValue(selectedModel.V_ROLETYPE);
    Ext.getCmp('V_I_ORDERID').setValue(selectedModel.I_ORDERID);
    Ext.getCmp('V_V_DEPTCODE').select(selectedModel.V_DEPTCODE);
    Ext.getCmp('V_V_DEPTCODE').hide();
    Ext.getCmp('Dialog').setTitle('修改');
    Ext.getCmp('Dialog').show();
}

function OnClickDeleteButton() {

    var selectModel = Ext.getCmp('gridPanel').getSelectionModel();
    if (!selectModel.hasSelection()) {
        return;
    }
    var selectedModel = selectModel.getSelection()[0].data;

    Ext.Ajax.request({
        url : AppUrl + 'pm_19/PRO_BASE_PERSONROLE_DEL',
        type : 'post',
        method : 'POST',
        params : {
            V_V_ROLECODE:selectedModel.V_ROLECODE,
            V_V_DEPTCODE:selectedModel.V_DEPTCODE
        },
        success : function(response) {
            Ext.getCmp('gridPanel').getStore().load();
        }
    });

    Ext.getCmp('Dialog').hide();
}