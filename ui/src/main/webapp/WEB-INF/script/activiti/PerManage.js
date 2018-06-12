var OrgCode = '';
var BusinessKey = '';
var ActivitiId = '';
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    OrgCode = parameters.OrgCode == null ? '' : parameters.OrgCode;
    BusinessKey = parameters.BusinessKey == null ? '' : parameters.BusinessKey;
    ActivitiId = parameters.ActivitiId == null ? '' : parameters.ActivitiId;
}
Ext.onReady(function () {

    Ext.QuickTips.init();
    var gridStore = Ext.create('Ext.data.Store', {
        fields: ['ActivityId',
            'ActivityName',
            'ActivityType',
            'Assignee',
            'AssigneeName',
            'EndTime',
            'Id',
            'StartTime',
            'post'],
        autoLoad: false,
        id: 'gridStore',
        proxy: {
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            url: AppUrl + 'cjy/getNextPerson'
        }
    });
    var treeStore = Ext.create('Ext.data.TreeStore', {
        storeId: 'treeStore',
        autoLoad: false,
        fields: ['sid', 'text', 'parentid', 'craftcode', 'craftname'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'cjy/selectPersonTreeFromDept',
            extraParams: {
                V_V_DEPTCODE : '',
                V_V_DEPTTYPE : '',
                V_V_FLAG : ''
            },
            reader: {
                type: 'json',
                root: 'children'
            },
            root: {
                text: 'root',
                expanded: true
            }
        },
        listeners: {
            'beforeexpand': function (node, eOpts) {
                //点击父亲节点的菜单会将节点的id通过ajax请求，将到后台
                this.proxy.extraParams.V_V_DEPTCODE = node.raw.id;
                this.proxy.extraParams.V_V_FLAG = 'false';
            }
        }
    });

    var tree = Ext.create('Ext.tree.Panel', {
        id: 'tree',
        width: '35%',
        store: treeStore,
        region: 'west',
        animate: true,//开启动画效果
        rootVisible: false,
        hideHeaders: true,//是否隐藏表头,默认为false
        frame:true,
        columns: [{
            xtype: 'treecolumn',
            dataIndex: 'text',
            flex: 1
        }],
        listeners: {
            itemclick: function (view, node) {
                if (node.data.leaf == true) {
                    Ext.Msg.confirm("警告", "是否替换为" + node.data.text,
                        function (button) {
                            if (button != "yes") {
                                return;
                            }
                            var nper=[];
                            nper.push( node.data.sid);
                            Ext.Ajax.request({
                                url: AppUrl + 'cjy/setNextPerson',
                                type: 'ajax',
                                method: 'POST',
                                params: {
                                    businessKey:BusinessKey,
                                    ActivitiId: ActivitiId,
                                    newperson: nper
                                },
                                success: function (response) {
                                    var resp = Ext.decode(response.responseText);

                                    if(resp.msg=="success"){
                                        QueryGrid();
                                    }
                                }
                            });

                        });
                }

            }
        }
    });

    var grid = Ext.create('Ext.grid.Panel', {
        region:'center',
        width: '50%',
        height:'50%',
        store: gridStore,
        frame:true,
        columnLines: true,
        columns: [{
            text: '人员编码',
            dataIndex: 'Assignee',
            width: 200,
            align: 'center',
            renderer: AddLeft
        }, {
            text: '人员名称',
            dataIndex: 'AssigneeName',
            width: 200,
            align: 'center',
            renderer: AddLeft
        },{
            text: '岗位名称',
            dataIndex: 'post',
            width: 200,
            align: 'center',
            renderer: AddLeft
        }]
    });

    Ext.create('Ext.container.Viewport', {
        id : "id",
        layout: 'border',
        items: [tree, grid]
    });



    QueryTree();

    QueryGrid();
});


//树查询
function QueryTree(){

    var treeStore = Ext.data.StoreManager.lookup('treeStore');
    treeStore.proxy.extraParams = {
        V_V_DEPTCODE: OrgCode,
        V_V_FLAG: 'true'
    };
    treeStore.currentPage = 1;
    treeStore.load();


}

function QueryGrid(){
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        businessKey: BusinessKey,
        ActivitiId:ActivitiId
    };
    gridStore.load();
}

function TreeChecked(){

}

function AddLeft(value) {
    return '<div style="text-align:left;" data-qtip="' + value
        + '" >' + value + '</div>';
}