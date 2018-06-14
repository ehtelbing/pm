var V_V_JXGX_CODE = '';
var V_ORDERGUID = '';
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    V_V_JXGX_CODE = parameters.V_V_JXGX_CODE == null ? '' : parameters.V_V_JXGX_CODE;
    V_ORDERGUID = parameters.V_ORDERGUID == null ? '' : parameters.V_ORDERGUID;
}
Ext.onReady(function () {

    Ext.QuickTips.init();
    var gridStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        id: 'gridStore',
        fields: ['V_CRAFTCODE',
            'V_PERSONCODE',
            'D_DATE_EDITTIME',
            'V_EDIT_GUID',
            'V_WORKNAME',
            'V_PERSONNAME',
            'V_DE'
        ],
        proxy : {
            type : 'ajax',
            async : false,
            url : AppUrl + 'cjy/PRO_BASE_CRAFTTOPER_GETBYPER',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            }
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
                QueryGrid(node.data.sid);
            }
        }
    });

    var grid = Ext.create('Ext.grid.Panel', {
        title:'人员选择',
        region:'north',
        width: '100%',
        height:'50%',
        store: gridStore,
        frame:true,
        autoScroll: true,
        columnLines: true,
        columns: [{
            text: '人员名称',
            dataIndex: 'V_PERSONNAME',
            align: 'center',
            flex: 1
        }, {
            text: '工种名称',
            dataIndex: 'V_WORKNAME',
            align: 'center',
            flex: 1
        }, {
            text: '工种台时',
            align: 'center',
            dataIndex: 'V_TS',
            renderer: AtEdit,
            value:1,
            editor: {
                xtype: 'numberfield'
            }
        }]
    });
    var SelGrid = Ext.create('Ext.grid.Panel', {
        title:'已选择',
        region:'center',
        width: '100%',
        height:'50%',
        store: gridStore,
        frame:true,
        autoScroll: true,
        columnLines: true,
        columns: [{
            text: '人员名称',
            dataIndex: 'V_PERSONNAME',
            align: 'center',
            flex: 1
        }, {
            text: '工种名称',
            dataIndex: 'V_WORKNAME',
            align: 'center',
            flex: 1
        }, {
            text: '工种台时',
            align: 'center',
            dataIndex: 'V_TS',
            value:1,
            editor: {
                xtype: 'numberfield'
            }
        }]
    });


    var gridPanel= Ext.create('Ext.panel.Panel', {
        region: 'center',
        layout:'border',
        border:false,
        frame:true,
        width: '50%',
        items:[grid,SelGrid]

    });
    Ext.create('Ext.container.Viewport', {
        id : "id",
        layout: 'border',
        items: [tree, gridPanel]
    });



    QueryTree();

});


//树查询
function QueryTree(){

    var treeStore = Ext.data.StoreManager.lookup('treeStore');
    treeStore.proxy.extraParams = {
        V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
        V_V_FLAG: 'true'
    };
    treeStore.currentPage = 1;
    treeStore.load();


}

function QueryGrid(personcode){
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_PERSONCODE : personcode
        }
    });
}
function AtEdit(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = 'text-align: right;background-color:yellow';
    return value;
}
function AddLeft(value) {
    return '<div style="text-align:left;" data-qtip="' + value
        + '" >' + value + '</div>';
}