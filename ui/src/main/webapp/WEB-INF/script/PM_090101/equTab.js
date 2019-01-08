//作业区
var V_DEPTCODE =null;
if (location.href.split('?')[1] != undefined) {
    V_DEPTCODE = Ext.urlDecode(location.href.split('?')[1]).V_DEPTCODE;
}

var treeStore=Ext.create('Ext.data.TreeStore', {
    id : 'treeStore',
    autoLoad : true,
    autoDestroy : true,
    fields : ['id', 'text', 'parentid','V_EQUSITE','V_EQUSITENAME'],
    proxy : {
        type : 'ajax',
        async : false,
        url: AppUrl + 'WorkOrder/PRO_BASE_DEPT_TREE',
        extraParams : {
            V_V_DEPTCODE:V_DEPTCODE
        },
        actionMethods : {
            read : 'POST'
        }
    },
    reader : {
        type : 'json',
        root : 'children'
    },
    root : {
        text : 'root',
        expanded : true
    }
});
var treeALLStore=Ext.create('Ext.data.TreeStore', {
    id : 'treeALLStore',
    autoLoad : true,
    autoDestroy : true,
    fields : ['id', 'text', 'parentid','V_EQUSITE','V_EQUSITENAME'],
    proxy : {
        type : 'ajax',
        async : false,
        url: AppUrl + 'WorkOrder/PRO_BASE_DEPT_TREE',
        extraParams : {
            V_V_DEPTCODE:V_DEPTCODE.substr(0,4)
        },
        actionMethods : {
            read : 'POST'
        }
    },
    reader : {
        type : 'json',
        root : 'children'
    },
    root : {
        text : 'root',
        expanded : true
    }
});
var gridStore =Ext.create('Ext.data.Store', {
    id : 'gridStore',
    autoLoad : false,
    fields : ['V_EQUTYPENAME', 'V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_EQUSITENAME'],
    proxy : {
        type : 'ajax',
        url: AppUrl + 'WorkOrder/PRO_SAP_EQU_VIEW',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        }
    }
});

var layoutPanel = {
    region : 'center',
    xtype : 'panel',
    layout : 'border',
    draggable:true,
    items : [ {
        xtype : 'gridpanel',
        id : 'grid',
        region : 'center',
         store : gridStore,
        columnLines : true,
        selType: 'checkboxmodel',
        plugins : [ Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit : 1
        }) ],
        columns : [ {
            text : '设备分类',
            dataIndex : 'V_EQUTYPENAME',
            align : 'center',
            width : 100
        }, {
            text : '设备编号',
            dataIndex : 'V_EQUCODE',
            align : 'center',
            width : 100
        }, {
            text : '设备名称',
            dataIndex : 'V_EQUNAME',
            align : 'center',
            width : 100
        }, {
            text : '设备位置编码',
            dataIndex : 'V_EQUSITE',
            align : 'center',
            width : 100
        }, {
            text : '设备位置',
            dataIndex : 'V_EQUSITENAME',
            align : 'center',
            width : 200
        }],
        dockedItems : [ {
            xtype : 'form',
            border:false,
            margin:'5px',
            items : [{
                xtype : 'button',
                text : '确定完成',
                icon: imgpath + '/search.png',
                style : 'margin:5px 0px 5px 20px',
                width : 100,
                listeners : {
                    click : OnClickSavedButton
                }
            }]
        } ]
    }
    // ,{
    //     xtype : 'treepanel',
    //     id : 'sectTree',
    //     region : 'west',
    //     width : 200,
    //     store : treeStore,
    //     rootVisible : false,
    //     listeners : {
    //         itemclick : OnClickTreeItem
    //     }
    // }
    ]
};

var tabPanel=Ext.create('Ext.tab.Panel',{
   id:'tabPanel',
   region:'west',
   width:350,

    defaults:{autoScroll:true},
    activeTab:0,
    enableTabScroll:true,
    items:[{
       id:'tab0',
        title:'我的设备',
        border:false,
        items:[{
            xtype: 'treepanel',
            id: 'sectTree',
            region: 'west',
            width: 200,
            store: treeStore,
            border:false,
            rootVisible: false,
            listeners: {
                itemclick: OnClickTreeItem
            }
        }],
        listeners: { activate: actionO }
    },{
        id:'tab1',
        title:'所有设备',
        items:[{
            xtype: 'treepanel',
            id: 'selAllTree',
            region: 'west',
            width: 200,
            store: treeALLStore,
            rootVisible: false,
            listeners: {
                itemclick: OnClickTreeItem
            }
        }],
        listeners: { activate: action1 }
    },{
        id:'tab2',
        title:'常用设备',
        items:[{
            xtype: 'treepanel',
            id: 'selUseTree',
            region: 'west',
            width: 200,
            store: treeALLStore,
            rootVisible: false,
            listeners: {
                itemclick: OnClickTreeItem
            }
        }],
        listeners: { activate: action2 }
    }]


});
function OnClickTreeItem(aa, record, item, index, e, eOpts) {
    if (record.data.leaf == true) {
        gridStore.proxy.extraParams.V_V_PERSONCODE =Ext.util.Cookies.get('v_personcode');
        gridStore.proxy.extraParams.V_V_DEPTCODE =V_DEPTCODE.substr(0,4);
        gridStore.proxy.extraParams.V_V_DEPTNEXTCODE =V_DEPTCODE;//车间编码
        gridStore.proxy.extraParams.V_V_EQUTYPECODE =record.parentNode.data.id;//设备类型编码
        gridStore.proxy.extraParams.V_V_EQUCODE =record.data.id;//设备编码
        Ext.getCmp('grid').getStore().load();
    }
}

Ext.onReady(function() {
    Ext.create('Ext.container.Viewport', {
        layout : 'border',
        items : [tabPanel,layoutPanel ]
        // items:[tabPanel]
    });
    //点击加号加载
        Ext.getCmp("sectTree").on("beforeload",function(store,operation){
            if(operation.node.data.parentid==-1 ){
                Ext.apply(store.proxy.extraParams,{
                        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                        V_V_DEPTCODENEXT:operation.node.data.id
                    },
                    store.proxy.url=AppUrl + 'tree/PRO_GET_DEPTEQUTYPE_PER')
            }else{
                Ext.apply(store.proxy.extraParams,{
                        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                        V_V_DEPTCODENEXT:operation.node.data.parentid,//车间编码
                        V_V_EQUTYPECODE:operation.node.data.id //设备类型编码
                    },
                    store.proxy.url=AppUrl + 'tree/PRO_PM_07_DEPTEQU_PER_DROP')
            }
        });
    // }
    Ext.getCmp("selAllTree").on("beforeload",function(store,operation){
        if(operation.node.data.parentid==-1){
            Ext.apply(store.proxy.extraParams,{
                    V_V_DEPTCODENEXT:operation.node.data.id
                },
                store.proxy.url=AppUrl + 'tree/GET_ADMIN_DEPTEQUTYPE_ADMIN_TREE')
        }else{
            Ext.apply(store.proxy.extraParams,{
                    V_V_DEPTCODENEXT:operation.node.data.parentid,//车间编码
                    V_V_EQUTYPECODE:operation.node.data.id //设备类型编码
                },
                store.proxy.url=AppUrl + 'tree/GETADMIN_DEPTEQU_ADMIN_TREE')
        }
    });
   // }

   //
   //     Ext.getCmp("selUseTree").on("beforeload",function(store,operation){
   //         if(operation.node.data.parentid==-1){
   //             Ext.apply(store.proxy.extraParams,{
   //                     V_V_DEPTCODENEXT:operation.node.data.id
   //                 },
   //                 store.proxy.url=AppUrl + 'tree/GET_ADMIN_DEPTEQUTYPE_ADMIN_TREE')
   //         }else{
   //             Ext.apply(store.proxy.extraParams,{
   //                     V_V_DEPTCODENEXT:operation.node.data.parentid,//车间编码
   //                     V_V_EQUTYPECODE:operation.node.data.id //设备类型编码
   //                 },
   //                 store.proxy.url=AppUrl + 'tree/GETADMIN_DEPTEQU_ADMIN_TREE')
   //         }
   //     });
   //

});

function OnClickSavedButton() {
    var ret='';
    var selectRecordTree="";
    var selectRecordGrid = Ext.getCmp('grid').getSelectionModel().getSelection();
    if(Ext.getCmp('tabPanel').activeTab.id=="tab0"){
        if(Ext.getCmp('sectTree').getSelectionModel().getSelection().length!=0){
            selectRecordTree=Ext.getCmp('sectTree').getSelectionModel().getSelection();
        }
    }
    if(Ext.getCmp('tabPanel').activeTab.id=="tab1"){
        if(Ext.getCmp('selAllTree').getSelectionModel().getSelection().length!=0){
            selectRecordTree=Ext.getCmp('selAllTree').getSelectionModel().getSelection();
        }
    }
    if(Ext.getCmp('tabPanel').activeTab.id=="tab2") {
        if (Ext.getCmp('selUseTree').getSelectionModel().getSelection().length != 0) {
            selectRecordTree = Ext.getCmp('selUseTree').getSelectionModel().getSelection();
        }
    }
    if(selectRecordGrid.length==1){
        ret=selectRecordGrid[0].data.V_EQUCODE + '^' + selectRecordGrid[0].data.V_EQUNAME + '^'+selectRecordGrid[0].data.V_EQUSITE+'^'+selectRecordGrid[0].data.V_EQUSITENAME+'^'+selectRecordTree[0].data.parentid;
    }else if(selectRecordTree[0].data.leaf==true&&selectRecordTree.length==1){
        ret=selectRecordTree[0].data.id+ '^' + selectRecordTree[0].data.text + '^'+selectRecordTree[0].data.V_EQUSITE+'^'+selectRecordTree[0].data.V_EQUSITENAME+'^'+selectRecordTree[0].data.parentid;
    }else{
        alert('请选择一条记录或一个叶子目录进行操作!');
        return false;
    }

    window.opener.getEquipReturnValue(ret);
    window.close();
}

function actionO(tab){
    tab.on('activate',function(tab){

    });
}

function action1(tab){
    tab.on('activate',function(tab){

    });
}

function action2(tab){
    tab.on('activate',function(tab){

    });

}