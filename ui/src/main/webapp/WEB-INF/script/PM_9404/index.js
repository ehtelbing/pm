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
    region: 'west',
    width : '35%',
    listeners : {
        itemclick : OnClickGridPanel
    },
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
        margin:'5',
        items: [{
            id: 'ck',
            xtype: 'combo',
            store: ckstore,
            editable: false,
            fieldLabel: '厂矿',
            labelWidth: 60,
            labelAlign: 'right',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            baseCls: 'margin-bottom',
            margin: '5px 0px 5px 5px',
            listeners: {
                change: function () {
                    query();
                }
            }
        }]
    }]
});

var MenuTree = Ext.create('Ext.tree.Panel', {
	id : 'MenuTree',
	rootVisible : false,
	//border : false,
	autoScroll : true,
    region : 'center',
    //width : '30%',
	store : Ext.create('Ext.data.TreeStore', {
		id : 'menutreestore',
		autoLoad : false,
		fields : [ 'id', 'text', 'parentid' ],
		//autoDestroy : true,
		reader : {
			type : 'json'
		},
		root : {
			text : 'root',
			expanded : true
		}
	}),
	listeners : {
		checkchange : OnClickMenuCheckTree
	}
});


var MenuTreeSelected = Ext.create('Ext.tree.Panel', {
    id : 'MenuTreeSelected',
    rootVisible : false,
    //border : false,
    autoScroll : true,
    region : 'east',
    width : '30%',
    store : Ext.create('Ext.data.TreeStore', {
        id : 'menutreeselectedstore',
        autoLoad : false,
        fields : [ 'id', 'text', 'parentid' ],
        //autoDestroy : true,
        //proxy : {
        //    type : 'ajax',
        //    url : APP + '/NewMenuTree',
        //    actionMethods : {
        //        read : 'POST'
        //    }
        //},
        reader : {
            type : 'json'
        },
        root : {
            text : 'root',
            expanded : true
        }
    })
});


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
        items: [GridPanel,MenuTree,MenuTreeSelected]
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

    Ext.data.StoreManager.get('menutreestore').setProxy({
        type : 'ajax',
            url : AppUrl + 'tree/AllMenuTree',
            actionMethods : {
            read : 'POST'
        }
    });

    Ext.data.StoreManager.get('menutreeselectedstore').setProxy({
        type : 'ajax',
        url : AppUrl + 'tree/RoleMenuTree',
        actionMethods : {
            read : 'POST'
        }
    });

    Ext.data.StoreManager.get('menutreestore').load({
        params: {
            RoleCode : record.data.V_ROLECODE,
            DEPTCODE : record.data.V_DEPTCODE
        }
    });

    Ext.data.StoreManager.get('menutreeselectedstore').load({
        params: {
            RoleCode: record.data.V_ROLECODE,
            DEPTCODE : record.data.V_DEPTCODE
        }
    });

}

function OnClickMenuCheckTree(node, checked, eOpts) {

    var selectModel = Ext.getCmp('gridPanel').getSelectionModel();
    if (!selectModel.hasSelection()) {
        return;
    }
    var selectedModel = selectModel.getSelection()[0].data;

    if(node.data.leaf == true){

        if (checked == true){
            if(node.parentNode.data.checked == false){
                node.parentNode.set('checked',true);
                choosenode(selectedModel.V_ROLECODE,node.parentNode.data.id);
            }
            choosenode(selectedModel.V_ROLECODE,node.raw.id);
        }
        else{
            cancelnode(selectedModel.V_ROLECODE,node.raw.id);

            var temp = 0;

            for(var i=0;i<node.parentNode.childNodes.length;i++){
                if(node.parentNode.childNodes[i].data.checked == false){
                    temp++;
                }
            }

            if(temp == node.parentNode.childNodes.length){
                node.parentNode.set('checked',false);
                cancelnode(selectedModel.V_ROLECODE,node.parentNode.data.id);
            }
        }

    }
    else{
        if(checked == true){
            choosenode(selectedModel.V_ROLECODE,node.data.id);
            for(var i=0;i<node.childNodes.length;i++){
                node.childNodes[i].set('checked',true);
                choosenode(selectedModel.V_ROLECODE,node.childNodes[i].data.id);
            }
        }
        else{
            var temp = true;
            for(var i=0;i<node.childNodes.length;i++){
                if(node.childNodes[i].data.checked == false){
                    temp = false;
                    break;
                }
            }
            if(temp == false){
                node.set('checked',true);
                for(var i=0;i<node.childNodes.length;i++){
                    if(node.childNodes[i].data.checked == false){
                        node.childNodes[i].set('checked',true);
                        choosenode(selectedModel.V_ROLECODE,node.childNodes[i].data.id);
                    }
                }
            }
            else{
                cancelnode(selectedModel.V_ROLECODE,node.data.id);
                for(var i=0;i<node.childNodes.length;i++){
                    node.childNodes[i].set('checked',false);
                    cancelnode(selectedModel.V_ROLECODE,node.childNodes[i].data.id);
                }
            }
        }
    }

    Ext.data.StoreManager.get('menutreeselectedstore').load({
        params: {
            RoleCode: selectedModel.V_ROLECODE,
            DEPTCODE : selectedModel.V_DEPTCODE
        }
    });

}

function choosenode(rolecode,menucode){
    Ext.Ajax.request({
        url: AppUrl + 'basic/PRO_BASE_ROLETOMENU_SET',
        // url : 'PRO_BASE_ROLETOMENU_SET',
        type: 'ajax',
        async: false,
        method: 'POST',
        params: {
            V_V_ROLECODE : rolecode,
            V_V_MENUCODE : menucode,
            V_V_DEPTCODE :  Ext.getCmp('ck').getValue()
        }
    });
}

function cancelnode(rolecode,menucode){
    Ext.Ajax.request({
        url: AppUrl + 'basic/PRO_BASE_ROLETOMENU_DEL',
        // url : 'PRO_BASE_ROLETOMENU_SET',
        type: 'ajax',
        async: false,
        method: 'POST',
        params: {
            V_V_ROLECODE : rolecode,
            V_V_MENUCODE : menucode,
            V_V_DEPTCODE :  Ext.getCmp('ck').getValue()
        }
    });
}
