var tabpage="";
var tabturn="";
var gridStore = Ext.create('Ext.data.Store', {
    id: 'gridStore',
    pageSize: 50,
    autoLoad: false,
    fields: ['MONTHDAY', 'ALLDECTNUM', 'HANDDECTNUM', 'OTHERDECTNUM'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'dxfile/PM_07_DEFECT_STAT',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list',
            total: 'total'
        }
    }
});

var npanel=Ext.create('Ext.panel.Panel',{
    id:'npanel',
    region:'north',
    hidden:true,
    frame:true,
    border:false,
    items:[{xtype: 'hidden', id: 'tabid'}]

});
var cpanel = Ext.create("Ext.tab.Panel", {
    id: 'cpanel',
    region: 'north',
    autoScroll:true,
    listeners: {
        tabchange: function () {
            tabpage = Ext.getCmp('cpanel').getActiveTab().id;
            tabturn=tabpage;
            Ext.ComponentManager.get("tabid").setValue(Ext.getCmp('cpanel').getActiveTab().id);
            QueryGrid();
        }
    }
});
var grid=Ext.create('Ext.grid.Panel',{
    store: gridStore,
    id: 'grid',
    frame: true,
    region:'center',
    columnLines: true,
    autoScroll: true,
    columns: [{
        xtype: 'rownumberer',
        text: '序号',
        width: 40,
        align: 'center'
    },
        {text: '月份',dataIndex: 'MONTHDAY',align: 'center',width: 150},
        {text: '缺陷总数',dataIndex: 'ALLDECTNUM',align: 'center',width: 150},
        {text: '手工录入缺陷',dataIndex: 'HANDDECTNUM',align: 'center',width: 150},
        {text: '其他缺陷',dataIndex: 'OTHERDECTNUM',align: 'center',width: 150}

    ]
});

// var framePanel=Ext.create('Ext.panel.Panel',{
//     id:'framePanel',
//     region:'center',
//     layout:'border',
//     frame:true,
//     border:false,
//     autoScroll: true,
//     items:[npanel,cpanel,grid]
// });
Ext.onReady(function(){
    Ext.create('Ext.container.Viewport',{
        id:'main',
        layout:'border',
        // items:[framePanel]
        items:[npanel,cpanel,grid]
    });
    QueryTab();
    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_YEAR:'',
            V_CKCODE:tabpage,
            V_PERCODE: Ext.util.Cookies.get('v_personcode')
        }
    });
});

function QueryTab() {
    Ext.ComponentManager.get("cpanel").removeAll();
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PRO_SELECT_ORG_BYPERCODE',
        type: 'ajax',
        method: 'POST',
        params: {
            V_PERCODE: Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.list.length > 0) {
                for (var i = 0; i < resp.list.length; i++) {
                    Ext.ComponentManager.get("cpanel").add({
                        id: resp.list[i].V_DEPTCODE,
                        title: resp.list[i].V_DEPTNAME
                    });
                    tabturn =resp.list[0].V_DEPTCODE
                }
                if(tabpage==""){
                    Ext.ComponentManager.get("cpanel").setActiveTab(tabpage= tabturn);
                }
                else{
                    Ext.ComponentManager.get("cpanel").setActiveTab(tabpage = tabturn);
                }


            }
        }
    });
}

function QueryGrid(){
    Ext.data.StoreManager.lookup("gridStore").load({
        V_YEAR:'',
        V_CKCODE:tabpage,
        V_PERCODE: Ext.util.Cookies.get('v_personcode')
    });
}