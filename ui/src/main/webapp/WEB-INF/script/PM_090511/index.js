var V_V_JXGX_CODE = '';
var V_ORDERGUID = '';
var V_DEPTCODE='';
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    V_V_JXGX_CODE = parameters.V_V_JXGX_CODE == null ? '' : parameters.V_V_JXGX_CODE;
    V_ORDERGUID = parameters.V_ORDERGUID == null ? '' : parameters.V_ORDERGUID;
    V_DEPTCODE = parameters.redept == null ? '' : parameters.redept;
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
            'V_DE',
            'V_WORKTYPE'
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

    var gridSelStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        id: 'gridSelStore',
        fields: ['I_ID',
            'V_DE',
            'V_JXGX_CODE',
            'V_PERCODE',
            'V_PERCODE_DE',
            'V_PERNAME',
            'V_PERNAME_DE',
            'V_PERNUM',
            'V_PERTYPE_DE',
            'V_TIME',
            'V_TS',
            'V_WORKTYPE'
        ],
        proxy : {
            type : 'ajax',
            async : false,
            url : AppUrl + 'cjy/PM_1917_JXGX_PER_DATA_SELBYG',
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
                V_V_DEPTCODE :'',
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
                if(node.data.leaf==true){
                    QueryGrid(node.data.sid);
                    QuerySelGrid();
                }

            }
        }
    });

    var grid = Ext.create('Ext.grid.Panel', {
        title:'人员选择',
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
            text: '工种编码',
            dataIndex: 'V_CRAFTCODE',
            align: 'center',
            flex: 1
        }, {
            text: '工种名称',
            dataIndex: 'V_WORKNAME',
            align: 'center',
            flex: 1
        }, {
            text: '工种定额',
            dataIndex: 'V_DE',
            align: 'center',
            flex: 1
        }, {
            text: '工种等级',
            dataIndex: 'V_WORKTYPE',
            align: 'center',
            flex: 1
        }],
        listeners : {
            itemclick : griditemclick
        }
    });
    var SelGrid = Ext.create('Ext.grid.Panel', {
        id:'SelGrid',
        title:'已选择',
        region:'south',
        width: '100%',
        height:'50%',
        store: gridSelStore,
        frame:true,
        autoScroll: true,
        columnLines: true,
        plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1})],
        columns: [{
            text: '人员名称',
            dataIndex: 'V_PERNAME',
            align: 'center',
            flex: 1
        }, {
            text: '工种名称',
            dataIndex: 'V_PERNAME_DE',
            align: 'center',
            flex: 1
        }, {
            text: '工种台时',
            align: 'center',
            dataIndex: 'V_TS',
            renderer: AtEdit,
            flex: 1,
            editor: {
                xtype: 'numberfield'
            }
        },{
            text: '操作',
            flex: 1,
            align: 'center',
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href=javascript:_delete(\''  + record.data.V_PERCODE + '\')>' + '删除' + '</a>';
            }
        }]
    });


    var gridPanel= Ext.create('Ext.panel.Panel', {
        region: 'center',
        layout:'border',
        border:false,
        frame:true,
        width: '50%',
        items:[   {
            xtype : 'panel', border : false, region : 'north', layout : 'column', frame: true,
            defaults: { style: { margin: '5px 0px 5px 10px'}, labelAlign: 'right'},
            items: [
                { xtype: 'button', text: '确认', handler: select,  icon: imgpath + '/saved.png', style: { margin: ' 5px 0 5px 10px'}},
            ]
        },grid,SelGrid]

    });
    Ext.create('Ext.container.Viewport', {
        id : "id",
        layout: 'border',
        items: [tree, gridPanel]
    });



    QueryTree();
    QuerySelGrid();


    Ext.data.StoreManager.lookup('gridStore').on('load',function(){
        if(Ext.data.StoreManager.lookup('gridStore').data.length==1){
            SavePer();
        }
    });
});


//树查询
function QueryTree(){

    var treeStore = Ext.data.StoreManager.lookup('treeStore');
    treeStore.proxy.extraParams = {
        V_V_DEPTCODE: V_DEPTCODE,
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

function QuerySelGrid(){
    Ext.data.StoreManager.lookup('gridSelStore').load({
        params: {
            V_V_ORDERGUID : V_ORDERGUID
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
function griditemclick(s, record, item, index, e, eOpts){
    Ext.Ajax.request({
        url: AppUrl + 'cjy/PM_1917_JXGX_PER_DATA_SET_G',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID : V_ORDERGUID,
            V_V_PERCODE_DE : record.data.V_CRAFTCODE,
            V_V_PERNAME_DE : record.data.V_WORKNAME,
            V_V_TS :  '1',
            V_V_DE :  record.data.V_DE,
            V_V_PERTYPE_ED :  record.data.V_WORKTYPE,
            V_V_PERCODE :  record.data.V_PERSONCODE,
            V_V_PERNAME :  record.data.V_PERSONNAME
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);

            if(resp.V_INFO=='SUCCESS'){
                QuerySelGrid();
            }else{
                alert("操作失败！");
            }
        }
    });
}

function SavePer(){
    Ext.Ajax.request({
        url: AppUrl + 'cjy/PM_1917_JXGX_PER_DATA_SET_G',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID : V_ORDERGUID,
            V_V_PERCODE_DE : Ext.data.StoreManager.lookup('gridStore').data.items[0].data.V_CRAFTCODE,
            V_V_PERNAME_DE : Ext.data.StoreManager.lookup('gridStore').data.items[0].data.V_WORKNAME,
            V_V_TS :  '1',
            V_V_DE :  Ext.data.StoreManager.lookup('gridStore').data.items[0].data.V_DE,
            V_V_PERTYPE_ED :  Ext.data.StoreManager.lookup('gridStore').data.items[0].data.V_WORKTYPE,
            V_V_PERCODE :  Ext.data.StoreManager.lookup('gridStore').data.items[0].data.V_PERSONCODE,
            V_V_PERNAME :  Ext.data.StoreManager.lookup('gridStore').data.items[0].data.V_PERSONNAME
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);

            if(resp.V_INFO=='SUCCESS'){
                QuerySelGrid();
            }else{
                alert("操作失败！");
            }
        }
    });
}

function select(){
    var jjts=0;
    var gzts=0;
    var gridSel = Ext.data.StoreManager.lookup('gridSelStore');
    var records = gridSel.data.items;
    var retdata = [];
    for (var i = 0; i < records.length; i++) {
        Ext.Ajax.request({
            method: 'POST',
            async: false,
            url: AppUrl + 'cjy/PM_1917_JXGX_PER_DATA_SET_G',
            params: {
                V_V_GUID: V_ORDERGUID,
                V_V_PERCODE_DE: records[i].data.V_PERCODE_DE,
                V_V_PERNAME_DE: records[i].data.V_PERNAME_DE,
                V_V_TS: records[i].data.V_TS,
                V_V_DE: records[i].data.V_DE,
                V_V_PERTYPE_ED: records[i].data.V_WORKTYPE,
                V_V_PERCODE: records[i].data.V_PERCODE,
                V_V_PERNAME: records[i].data.V_PERNAME,
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                gzts+=parseInt(records[i].data.V_TS);
                if (i == 0) {
                    retdata.push(records[i].data.V_PERNAME);
                }
                else {
                    var tem = 0;
                    for (var j = 0; j < retdata.length; j++) {
                        if (retdata[j] != records[i].data.V_PERNAME) {
                            tem++
                        }
                    }
                    if (tem == retdata.length) {
                        retdata.push(records[i].data.V_PERNAME);
                    }

                }
            }
        });
    }

    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: AppUrl + 'pm_19/PRO_PM_19_CARDE_GXSEL',
        params: {
            V_V_JXGX_CODE: V_V_JXGX_CODE
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);

            for (var i = 0; i < resp.list.length; i++) {
                jjts+=parseInt(resp.list[i].V_JJ_TS);
            }

        }
    });
    window.opener.getPersonReturnValue(retdata,gzts+jjts);
    window.close();
}
function _delete(V_PERCODE_DE){
    Ext.Ajax.request({
        url: AppUrl + 'cjy/PM_1917_JXGX_PER_DATA_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID : V_ORDERGUID,
            V_V_PERCODE_DE : V_PERCODE_DE
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);

            if(resp.V_INFO=='Success'){
                QuerySelGrid();
            }else{
                alert("操作失败！");
            }
        }
    });
}