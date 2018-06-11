var OrgCode = '';
var BusinessKey = '';
var activityId = '';
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    OrgCode = parameters.OrgCode == null ? '' : parameters.OrgCode;
    BusinessKey = parameters.BusinessKey == null ? '' : parameters.BusinessKey;
    activityId = parameters.activityId == null ? '' : parameters.activityId;
}
Ext.onReady(function () {

    Ext.QuickTips.init();

    var treeStore= Ext.create("Ext.data.TreeStore", {
        storeId : 'treeStore',
        autoLoad : false,
        fields: ['sid', 'text', 'parentid', 'craftcode', 'craftname','expanded','leaf','finishflag']
    });

    var treepanel=Ext.create('Ext.tree.Panel',{
        id:'tree',
        region:'west',
        width:'50%',
        store:treeStore,
        rootVisible:false,
        autoScroll: true,
        listeners:{
            itemdblclick:TreeChecked
        }
    });

    var grid = Ext.create('Ext.grid.Panel', {
        region:'center',
        width: '100%',
        height:'50%',
        columnLines: true,
        columns: [{
            text: '人员编码',
            dataIndex: 'id',
            width: 200,
            align: 'center',
            renderer: AddLeft
        }, {
            text: '人员名称',
            dataIndex: 'name',
            width: 200,
            align: 'center',
            renderer: AddLeft
        },{
            text: '岗位名称',
            dataIndex: 'name',
            width: 200,
            align: 'center',
            renderer: AddLeft
        }]
    });

    Ext.create('Ext.container.Viewport', {
        id : "id",
        layout: 'border',
        items: [treepanel, grid]
    });



    QueryTree();
});


//树查询
function QueryTree(){

    Ext.getCmp('tree').store.setProxy({
        type : 'ajax',
        actionMethods : {
            read : 'POST'
        },
        url : AppUrl + 'Activiti/PRO_BASE_DEPT_TREE',
        reader : {
            type : 'json'
        async : false,
        },
        root : {
            expanded : true
        },
        extraParams : {
            V_V_DEPTCODE :OrgCode
        }
    });
    Ext.getCmp('tree').store.load();

}

function QueryGrid(){

}

function TreeChecked(){

}

function AddLeft(value) {
    return '<div style="text-align:left;" data-qtip="' + value
        + '" >' + value + '</div>';
}