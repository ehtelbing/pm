/// <reference path="../Shared/ext-all-debug-w-comments.js" />

var V_ORGCODE = null;
var V_DEPTCODE = null;
var V_EQUTYPECODE = null;
var V_EQUCODE = null;
var V_EQUNAME = null;
if (location.href.split('?')[1] != undefined) {
    V_ORGCODE = Ext.urlDecode(location.href.split('?')[1]).V_ORGCODE;
    V_DEPTCODE = Ext.urlDecode(location.href.split('?')[1]).V_DEPTCODE;
    V_EQUTYPECODE = Ext.urlDecode(location.href.split('?')[1]).V_EQUTYPECODE;
    V_EQUCODE = Ext.urlDecode(location.href.split('?')[1]).V_EQUCODE;
    V_EQUNAME = Ext.urlDecode(location.href.split('?')[1]).V_EQUNAME;
}


var gridStore = Ext.create('Ext.data.Store', {
    id: 'gridStore',
    autoLoad: false,
    fields: ['V_EQUTYPENAME', 'V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_EQUSITENAME'],
    proxy: {
        type: 'ajax',
        url: AppUrl + 'PM_06/PRO_SAP_PM_EQU_P_GET',
        actionMethods: {read: 'POST'},
        reader: {
            type: 'json',
            root: 'list'
        }
    }

});
var V_ORDERGUID = null;
if (location.href.split('?')[1] != undefined) {
    V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).DEPTCODE;
}

//var root = new Ext.tree.TreeNode({
//    id : 'root',
//    text : V_EQUNAME,
//    //checked : true,
//    qtip : V_EQUCODE
//});

var PageLayout = {
    xtype: 'panel',
    layout: 'border',
    items: [
        {
            xtype: 'panel', region: 'west', width: 200,
            items: [
                {
                    xtype: 'treepanel',
                    region: 'west',
                    id: 'sectTree',
                    rootVisible: false,
                    //border: false,
                    autoScroll: true,
                    height: 500,
                    listeners: {itemclick: OnClickTreeItem},
                    store: Ext.create('Ext.data.TreeStore', {
                        id: 'treeStore',
                        fields: ['id', 'text', 'parentid'],
                        autoLoad: true,
                        proxy: {
                            type: 'ajax',
                            url: AppUrl + 'tree/EquTree',
                            extraParams: {
                                //V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                                //V_V_DEPTCODENEXT : "",
                                //V_V_DEPTCODE: V_ORDERGUID,
                                //V_V_TYPE : 'root'
                                V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                                V_V_DEPTCODE :V_ORGCODE,
                                V_V_DEPTNEXTCODE : V_DEPTCODE,
                                V_V_EQUTYPECODE : V_EQUTYPECODE,
                                V_V_EQUCODE:V_EQUCODE,
                                V_V_TYPE : V_EQUNAME
                            },
                            actionMethods: {read: 'POST'}
                        },
                        reader: {
                            type: 'json',
                            root: 'list'
                        },
                        root: {
                            expanded: true
                        }
                    })
                }
            ]
        }, {
            xtype: 'panel',
            region: 'center',
            layout: 'border',
            border:false,
            items: [
                {
                    xtype: 'gridpanel',
                    region: 'center',
                    id: 'grid',
                    selType: 'checkboxmodel',
                    border:false,
                    store: gridStore,
                    columns: [
                        {text: '设备分类', dataIndex: 'V_EQUTYPENAME', width: 120},
                        {text: '设备编号', dataIndex: 'V_EQUCODE', width: 140},
                        {text: '设备名称', dataIndex: 'V_EQUNAME', width: 160},
                        {text: '设备位置编码', dataIndex: 'V_EQUSITE', width: 200},
                        {text: '设备位置', dataIndex: 'V_EQUSITENAME', width: 420}
                    ]
                }, {
                    xtype: 'panel', layout: 'column', region: 'north', frame: true,
                    items: [
                        {
                            xtype: 'button',
                            id: 'btnSaved',
                            text: '确定完成',
                            icon: imgpath +'/saved.png',
                            style: 'margin:5px 0px 5px 20px',
                            width: 100,
                            listeners: {click: OnClickSavedButton}
                        }
                    ]
                }
            ]
        }
    ]
};

function OnClickTreeItem(aa, record, item, index, e, eOpts) {

    if (record.data.leaf == true) {

        Ext.data.StoreManager.lookup('gridStore').load({
            params : {
                V_V_EQUCODE : record.data.qtip
            }
        });
    }



}

function OnClickSavedButton() {
    var selectModel = Ext.getCmp('grid').getSelectionModel();

    if (Ext.getCmp('grid').getSelectionModel().getSelection().length > 1 || Ext.getCmp('grid').getSelectionModel().getSelection().length <= 0) {
        Ext.MessageBox.alert('操作信息', '请选择一条记录进行操作!');
    }
    else if(selectModel.getSelection()[0].data.V_EQUCODE =='%'){
        alert('不可以选择全部!');
    }
    else {
        for (var i = 0; i < Ext.getCmp('grid').getSelectionModel().getSelection().length; i++) {

            window.opener.getEquipReturnValue(selectModel.getSelection()[i].data.V_EQUCODE + '^' + selectModel.getSelection()[i].data.V_EQUNAME + '^' + selectModel.getSelection()[i].data.V_EQUSITE);
        }
        window.close();
    }
}


Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', PageLayout);

    //点击加号加载
    //Ext.getCmp("sectTree").on("beforeload", function (store, operation) {
    //
    //    //查询菜单
    //    Ext.apply(store.proxy.extraParams, {
    //        V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
    //        V_V_DEPTCODENEXT : operation.node.data.qtip,
    //        V_V_DEPTCODE: V_ORDERGUID,
    //        V_V_TYPE : 'leaf'
    //    })
    //})
});