var equTypeLoad = false;
var deptLoad = false;


var V_JXGX_CODE = null;
var V_ORGCODE = null;
var V_DEPTCODE = null;
var V_EQUTYPE = null;
var V_EQUCODE = null;
var V_GUID = null;
if (location.href.split('?')[1] != undefined) {
    V_JXGX_CODE = Ext.urlDecode(location.href.split('?')[1]).V_JXGX_CODE;
    V_ORGCODE = Ext.urlDecode(location.href.split('?')[1]).V_ORGCODE;
    V_DEPTCODE = Ext.urlDecode(location.href.split('?')[1]).V_DEPTCODE;
    V_EQUTYPE = Ext.urlDecode(location.href.split('?')[1]).V_EQUTYPE;
    V_EQUCODE = Ext.urlDecode(location.href.split('?')[1]).V_EQUCODE;
    V_GUID = Ext.urlDecode(location.href.split('?')[1]).V_GUID;
}

Ext.onReady(function () {
    //Ext.getBody().mask('<p>页面载入中...</p>');

    var gridStore = Ext.create('Ext.data.Store', {
        storeId: 'gridStore',
        autoLoad: false,
     //   pageSize : 100,
        fields: ['I_ID',
            'V_MX_CODE',
            'V_MX_NAME',
            'V_GX_CODE',
            'V_ORGCODE',
            'V_DEPTCODE',
            'V_EQUTYPE',
            'V_EQUCODE',
            'V_EQUCODE_CHILD',
            'V_BZ',
            'V_IN_DATE',
            'V_IN_PER','V_BB'],
        proxy: {
            url: AppUrl + 'basic/PM_1917_JXMX_DATA_SEL',//'PM_03/PM_03_JXMX_DATA_SEL',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var grid7Store=Ext.create('Ext.data.Store',{
        id : 'grid7Store',
        pageSize : 20,
        autoLoad : false,
        fields : [ 'I_ID',
            'V_MX_CODE',
            'V_MX_NAME',
            'V_GX_CODE',
            'V_ORGCODE',
            'V_DEPTCODE',
            'V_EQUTYPE',
            'V_EQUCODE',
            'V_EQUCODE_CHILD',
            'V_BZ',
            'V_IN_DATE',
            'V_IN_PER','V_BB'],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'cjy/PM_PROJECT_DX_MX_SEL',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list',
                total : 'total'
            }
        },
        listeners: {
            beforeload: beforeGrid7Store
        }
    });

    var gridRGStore=Ext.create('Ext.data.Store',{
        id : 'gridRGStore',
        pageSize : 20,
        autoLoad : false,
        fields : ['V_PERCODE_DE',
            'V_PERNAME_DE',
            'V_PERTYPE_DE',
            'RGNUM'

        ],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'cjy/PM_PROJECT_DX_MX_RG_SEL',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list',
                total : 'total'
            }
        },
        listeners: {
            beforeload: beforeGridRGStore
        }
    });
    var gridJJStore=Ext.create('Ext.data.Store',{
        id : 'gridJJStore',
        pageSize : 20,
        autoLoad : false,
        fields : ['V_JJ_CODE',
            'V_JJ_NAME',
            'JJNUM',
            'V_JJ_TYPE'
        ],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'cjy/PM_PROJECT_DX_MX_JJ_SEL',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list',
                total : 'total'
            }
        },
        listeners: {
            beforeload: beforeGridJJStore
        }
    });
    var gridBJStore=Ext.create('Ext.data.Store',{
        id : 'gridBJStore',
        pageSize : 20,
        autoLoad : false,
        fields : ['V_WLCODE',
            'V_WLSM',
            'V_JLDW',
            'V_GGXH',
            'BJNUM',
            'BJPRICE'

        ],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'cjy/PM_PROJECT_DX_MX_BJ_SEL',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list',
                total : 'total'
            }
        },
        listeners: {
            beforeload: beforeGridBJStore
        }
    });

    var topPanel = Ext.create('Ext.form.Panel', {
        border: false,
        region: 'north',
        items: [{
            layout: 'column',
            border: false,
            frame: true,
            defaults: {
                xtype: 'button',
                labelAlign: 'right',
                margin: '5px 0px 5px 10px',
                width: 200
            },
            items: [ {
                xtype: 'textfield',
                id: 'jxequipname',
                fieldLabel: '检修模型名称',
                emptyText: '缺陷明细模糊搜索',
                width: 240,
                margin: '5 0 5 20px'
            }, {
                text: '查询',
                width : 60,
                icon: imgpath + '/search.png',
                handler: function () {
                    query();
                }
            }, {
                text: '确认返回',
                width : 80,
                icon: imgpath + '/add.png',
                handler: function () {
                    var seldata = Ext.getCmp('gridPanel').getSelectionModel().getSelection();
                    if (seldata.length == 0) {
                        alert('请至少选择一条数据！');
                    }else{
                        Ext.Msg.confirm("提示", "确定要选择？", function (button) {
                            if(button == 'yes'){
                                btn_select();
                            }
                        })
                    }
                }
            }]
        }]

    });

    var gridPanel = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel',
        title:'模型选择',
        store: gridStore,
        border: false,
        width:'100%',
        height:'50%',
        columnLines: true,
        region: 'north',
        selType: 'checkboxmodel',
        selModel: {
            mode: 'SINGLE'
        },
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '检修模型编码',
            dataIndex: 'V_MX_CODE',
            align: 'center',
            width: 150, renderer: atleft
        }, {
            text: '检修模型名称',
            dataIndex: 'V_MX_NAME',
            align: 'center',
            width: 150, renderer: atleft
        }, {
            text: '工序详情',
            align: 'center',
            width: 150,
            renderer : detail
        }, {
            text: '备注',
            dataIndex: 'V_BZ',
            align: 'center',
            width: 150, renderer: atleft
        }, {
            text: '版本号',
            dataIndex: 'V_BB',
            align: 'center',
            width: 100, renderer: atright
        }
        ],
        bbar: [{
            id: 'gpage',
            xtype: 'pagingtoolbar',
            pageSize:100,
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }],
        listeners : {
            itemclick : itemclick
        }

    });
    var selectPanel = Ext.create('Ext.grid.Panel', {
        id:'selectPanel',width:'100%',store:grid7Store,columnLines: true,selType: 'checkboxmodel',autoScroll: true,region:'center',/*title:'模型列表',*///height:200,
        columns:[{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '检修模型编码',
            dataIndex: 'V_MX_CODE',
            align: 'center',
            width: 150, renderer: atleft
        }, {
            text: '检修模型名称',
            dataIndex: 'V_MX_NAME',
            align: 'center',
            width: 150, renderer: atleft
        },   {
            text: '工序详情',
            align: 'center',
            width: 150,
            renderer : detail
        }, {
            text: '备注',
            dataIndex: 'V_BZ',
            align: 'center',
            width: 150, renderer: atleft
        }, {
            text: '版本号',
            dataIndex: 'V_BB',
            align: 'center',
            width: 100, renderer: atright
        }],
        bbar: [{
            id:'grid7page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'grid7Store'
        }]
    });
    var westpanel=Ext.create('Ext.panel.Panel',{
        id:'westpanel',
        region:'west',
        layout:'border',
        width:'50%',
        //autoScroll : true,
        items:[gridPanel,
            {xtype:'panel', region:'center',width:'100%',layout:'border',frame:true,title:'已选择',autoScroll : true,
            items:[{xtype:'panel', width:'100%', height:50,region:'north',layout:'hbox',frame:true,//baseCls: 'my-panel-no-border',
                items:[
                    {
                        xtype: 'button',
                        text: '删除',
                        icon: imgpath + '/delete.png',
                        handler: _delete,
                        style: 'margin: 5px 0px 0px 10px'
                    }]},selectPanel
            ]}

        ]
    });
    var rgPanel = Ext.create('Ext.grid.Panel', {
        id: 'rgPanel',
        title:'人工',
        store: gridRGStore,
        border: false,
        width:'100%',
        height:'33%',
        columnLines: true,
        region: 'north',
        columns:[{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '工种编码',
            dataIndex: 'V_PERCODE_DE',
            align: 'center',
            width: 150, renderer: atleft
        }, {
            text: '工种名称',
            dataIndex: 'V_PERNAME_DE',
            align: 'center',
            width: 150, renderer: atleft
        },  {
            text: '工种类型',
            dataIndex: 'V_PERTYPE_DE',
            align: 'center',
            width: 150, renderer: atleft
        },  {
            text: '台时',
            dataIndex: 'RGNUM',
            align: 'center',
            width: 150, renderer: atright
        }],
        bbar: [{
            id:'rgpage',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridRGStore'
        }]
    });
    var jjPanel = Ext.create('Ext.grid.Panel', {
        id: 'jjPanel',
        title:'机具',
        store: gridJJStore,
        border: false,
        width:'100%',
        height:'33%',
        columnLines: true,
        region: 'center',
        columns:[{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '机具编码',
            dataIndex: 'V_JJ_CODE',
            align: 'center',
            width: 150, renderer: atleft
        }, {
            text: '机具名称',
            dataIndex: 'V_JJ_NAME',
            align: 'center',
            width: 150, renderer: atleft
        },  {
            text: '机具类型',
            dataIndex: 'V_JJ_TYPE',
            align: 'center',
            width: 150, renderer: atleft
        },  {
            text: '台时',
            dataIndex: 'JJNUM',
            align: 'center',
            width: 150, renderer: atright
        }],
        bbar: [{
            id:'jjpage',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridJJStore'
        }]
    });
    var bjPanel = Ext.create('Ext.grid.Panel', {
        id: 'bjPanel',
        title:'备件',
        store: gridBJStore,
        border: false,
        width:'100%',
        height:'33%',
        columnLines: true,
        region: 'south',
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '物料编码',
            dataIndex: 'V_WLCODE',
            align: 'center',
            width: 150, renderer: atleft
        }, {
            text: '物料描述',
            dataIndex: 'V_WLSM',
            align: 'center',
            width: 150, renderer: atleft
        }, {
            text: '规格型号',
            dataIndex: 'V_GGXH',
            align: 'center',
            width: 150, renderer: atleft
        }, {
            text: '计量单位',
            dataIndex: 'V_JLDW',
            align: 'center',
            width: 150, renderer: atleft
        }, {
            text: '使用数量',
            dataIndex: 'BJNUM',
            align: 'center',
            width: 150, renderer: atright
        }, {
            text: '单价',
            dataIndex: 'BJPRICE',
            align: 'center',
            width: 150, renderer: atright
        }],
        bbar: [{
            id:'bjpage',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridBJStore'
        }]
    });

    var centerpanel=Ext.create('Ext.panel.Panel',{
        id:'centerpanel',
        region:'center',
        layout:'border',
        width:'50%',
        autoScroll : true,
        items:[rgPanel,jjPanel,bjPanel
        ]
    });
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        border:false,
        items: [topPanel,westpanel,centerpanel]
    });
    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_V_ORGCODE: V_ORGCODE,
            V_V_DEPTCODE: V_DEPTCODE,
            V_V_EQUTYPE: V_EQUTYPE,
            V_V_EQUCODE: V_EQUCODE,
            V_V_EQUCHILD_CODE: '%',
            V_V_JXMX_NAME: Ext.getCmp('jxequipname').getValue(),
            V_V_PAGE: Ext.getCmp('gpage').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('gpage').store.pageSize
        }
    });
    query();
    QueryGrid7();
    queryRG();
    queryJJ();
    queryBJ();

});

function beforeGrid7Store(store){
    store.proxy.extraParams.V_V_PROJECT_GUID = V_GUID;
    store.proxy.extraParams.V_V_PAGE = Ext.getCmp('grid7page').store.currentPage;
    store.proxy.extraParams.V_V_PAGESIZE = Ext.getCmp('grid7page').store.pageSize;

}
function beforeGridRGStore(store){
    store.proxy.extraParams.V_V_PROJECT_GUID = V_GUID;
    store.proxy.extraParams.V_V_PAGE = Ext.getCmp('rgpage').store.currentPage;
    store.proxy.extraParams.V_V_PAGESIZE = Ext.getCmp('rgpage').store.pageSize;

}
function beforeGridJJStore(store){
    store.proxy.extraParams.V_V_PROJECT_GUID = V_GUID;
    store.proxy.extraParams.V_V_PAGE = Ext.getCmp('jjpage').store.currentPage;
    store.proxy.extraParams.V_V_PAGESIZE = Ext.getCmp('jjpage').store.pageSize;

}
function beforeGridBJStore(store){
    store.proxy.extraParams.V_V_PROJECT_GUID = V_GUID;
    store.proxy.extraParams.V_V_PAGE = Ext.getCmp('bjpage').store.currentPage;
    store.proxy.extraParams.V_V_PAGESIZE = Ext.getCmp('bjpage').store.pageSize;

}
function query() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_ORGCODE: V_ORGCODE,
            V_V_DEPTCODE: V_DEPTCODE,
            V_V_EQUTYPE: V_EQUTYPE,
            V_V_EQUCODE: V_EQUCODE,
            V_V_EQUCHILD_CODE: '%',
            V_V_JXMX_NAME: Ext.getCmp('jxequipname').getValue(),
            V_V_PAGE: Ext.getCmp('gpage').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('gpage').store.pageSize
        }
    });
}
function queryRG() {
    var gridStore = Ext.data.StoreManager.lookup('gridRGStore');
    gridStore.proxy.extraParams = {
        V_V_PROJECT_GUID:V_GUID,
        V_V_PAGE: Ext.getCmp('rgpage').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('rgpage').store.pageSize

    };
    gridStore.currentPage = 1;
    gridStore.load();
}
function queryJJ() {
    var gridStore = Ext.data.StoreManager.lookup('gridJJStore');
    gridStore.proxy.extraParams = {
        V_V_PROJECT_GUID:V_GUID,
        V_V_PAGE: Ext.getCmp('jjpage').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('jjpage').store.pageSize

    };
    gridStore.currentPage = 1;
    gridStore.load();
}
function queryBJ() {
    var gridStore = Ext.data.StoreManager.lookup('gridBJStore');
    gridStore.proxy.extraParams = {
        V_V_PROJECT_GUID:V_GUID,
        V_V_PAGE: Ext.getCmp('bjpage').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('bjpage').store.pageSize

    };
    gridStore.currentPage = 1;
    gridStore.load();
}
function btn_select(){

   /* var seldata = Ext.getCmp('gridPanel').getSelectionModel().getSelection();
    if(seldata.length==0){
        alert("请至少选择一条数据");
        return false;
    }
    var num = 0;
    Ext.Ajax.request({
        url: AppUrl + 'cjy/PM_PROJECT_DX_MX_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_PROJECT_GUID: V_GUID
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.V_INFO == 'success') {

                for (var i = 0; i < seldata.length; i++) {
                    Ext.Ajax.request({
                        url: AppUrl + 'cjy/PM_PROJECT_DX_MX_SET',
                        method: 'POST',
                        async: false,
                        params: {
                            V_V_MX_GUID: seldata[i].data.V_MX_CODE,
                            V_V_PROJECT_GUID: V_GUID
                        },
                        success: function (resp) {
                            var resp = Ext.decode(resp.responseText);
                            if (resp.V_INFO == 'success') {
                                num++;
                            }

                        }
                    });
                }
            }else{
                alert("子数据清除错误");
            }

        }
    });

    if (num == seldata.length) {*/
        window.opener.getReturnMX();
        window.close();
    /*} else {
        alert("模型添加错误");
    }*/



}

function detail(a,value,metaData){
    return '<a href="javascript:ondetail(\'' + metaData.data.V_GX_CODE + '\')">详情</a>';
}

function ondetail(a){
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_191711/index.html?V_MX_CODE=' + a , '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}

function itemclick(s, record, item, index, e, eOpts) {

    Ext.Ajax.request({
        url: AppUrl + 'cjy/PM_PROJECT_DX_MX_SET',
        method: 'POST',
        async: false,
        params: {
            V_V_MX_GUID: record.data.V_MX_CODE,
            V_V_PROJECT_GUID: V_GUID
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.V_INFO == 'success') {
                QueryGrid7();
                queryRG();
                queryJJ();
                queryBJ();
            }

        }
    });
}
function QueryGrid7(){
    var gridStore = Ext.data.StoreManager.lookup('grid7Store');
    gridStore.proxy.extraParams = {
        V_V_PROJECT_GUID:V_GUID,
        V_V_PAGE: Ext.getCmp('grid7page').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('grid7page').store.pageSize

    };
    gridStore.currentPage = 1;
    gridStore.load();


}

function _delete(){
    var seldata = Ext.getCmp('selectPanel').getSelectionModel().getSelection();
    if (seldata.length==0) {
        Ext.Msg.alert('操作提示','请至少选择一条数据！');
        return false;
    }
    var num = 0;

    for (var i = 0; i < seldata.length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'cjy/PM_PROJECT_DX_MX_DEL_BYPM',
            method: 'POST',
            async: false,
            params: {
                V_V_MX_GUID: seldata[i].data.V_MX_CODE,
                V_V_PROJECT_GUID: V_GUID
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                if (resp.V_INFO == 'success') {
                    num++;
                }

            }
        });
    }


    if (num == seldata.length) {
        QueryGrid7();
        queryRG();
        queryJJ();
        queryBJ();
    } else {
        alert("删除失败");
    }
}
function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>' ;
}
function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return '<div data-qtip="' + value + '" >' + value + '</div>' ;
}