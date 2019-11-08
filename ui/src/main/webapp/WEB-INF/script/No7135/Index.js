var materialcode = '';
var wgridStore = Ext.create("Ext.data.Store", {
    autoLoad : false,
    storeId : 'wgridStore',
    pageSize : 50,
    fields : [ 'MATERIALCODE','MATERIALNAME','MATERIALETALON','UNIT','F_PRICE'],
    proxy : {
        type : 'ajax',
        async : false,
        url : AppUrl + 'Zyk/PRO_RUN7134_GETBJLIST',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        }
    },
    listeners:{
        beforeload:beforeload_wgridStore
    }
});

var egridStore = Ext.create("Ext.data.Store", {
    autoLoad : false,
    storeId : 'egridStore',
    pageSize : 50,
    fields : [ 'V_DEPTNAME',
        'EQU_DESC',
        'SITE_DESC',
        'BJ_AMOUNT'
    ],
    proxy : {
        type : 'ajax',
        async : false,
        url : AppUrl + 'Zyk/PRO_RUN7134_GETSITELIST',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        }
    },
    listeners:{
        beforeload:beforeload_egridStore
    }
});


var panel = Ext.create('Ext.form.Panel', {
    id : 'panel',
    style : 'margin:5px 0px 2px 2px',
    region : 'north',
    layout : 'vbox',
    width : '100%',
    items : [{
        xtype : 'panel',
        region : 'north',
        layout : 'column',
        baseCls: 'my-panel-no-border',
        items : [{ id: 'equipcode', xtype: 'textfield', fieldLabel:'备件编码',
            labelAlign: 'right', style: 'margin:5px 0px 5px 5px',
            width: 240
        },{
            id: 'equipname', xtype: 'textfield', fieldLabel:'备件名称',
            labelAlign: 'right', style: 'margin:5px 0px 5px 5px',width: 240
        }]
    }, {
        xtype : 'panel',
        region : 'north',
        layout : 'column',
        baseCls: 'my-panel-no-border',
        items : [{
            xtype : 'button',
            text : '查询',
            //icon : imgpath + '/search.png',
            width : 100,
            handler : wquery,
            style : {
                margin : '5px 0 5px 30px'
            }
        } ,
            {
                xtype : 'button',
                text : '导出Excel',
                width : 100,
                handler : OnButtonExportClicked,
                style : {
                    margin : '5px 0px 5px 20px'
                }
            }]
    }]
});

var wgrid = Ext.create("Ext.grid.Panel", {
    xtype : 'gridpanel',
    id : 'wgrid',
    region : 'center',
    height : 400,
    columnLines : true,
    title : '重点备件表',
    store : wgridStore,
    selType : 'checkboxmodel',
    autoScroll : true,
    columns : [
        {
            text : '备件编码',
            dataIndex : 'MATERIALCODE',
            align : 'center',
            labelAlign : 'right',
            width : 100
        }, {
            text : '备件名称',
            dataIndex : 'MATERIALNAME',
            align : 'center',
            width : 150
        }, {
            text : '计量单位',
            dataIndex : 'UNIT',
            align : 'center',
            width : 120
        }, {
            text : '计划单价',
            dataIndex : 'F_PRICE',
            align : 'center',
            width : 150
        }, {
            text : '安装位置',
            dataIndex : '',
            align : 'center',
            width : 100,
            renderer : look
        }]
    ,
    bbar: ['->',{ xtype: 'pagingtoolbar',
        id:'wpagingtoolbar',
        dock: 'bottom',
        displayInfo: true,
        displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
        emptyMsg: '没有记录',
        store: 'wgridStore'  }
    ]
});

var egrid = Ext.create("Ext.grid.Panel", {
    xtype : 'gridpanel',
    id : 'egrid',
    region : 'east',
    columnLines : true,
    width : 600,
    height : 400,
    title : '备件安装位置字典',
    store : egridStore,
    split : true,
    collapsible : true,
    collapseMode : 'mini',
    hideCollapseTool : true,
    autoScroll : true,
    columns : [
        {
            text : '作业区',
            dataIndex : 'V_DEPTNAME',
            align : 'center',
            labelAlign : 'right',
            width : 100
        }, {
            text : '设备',
            dataIndex : 'EQU_DESC',
            align : 'center',
            width : 150
        }, {
            text : '安装位置',
            dataIndex : 'SITE_DESC',
            align : 'center',
            width : 120
        }, {
            text : '使用数量',
            dataIndex : 'BJ_AMOUNT',
            align : 'center',
            width : 150
        }]
    ,
    bbar: ['->',{ xtype: 'pagingtoolbar',
        id:'epagingtoolbar',
        dock: 'bottom',
        displayInfo: true,
        displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
        emptyMsg: '没有记录',
        store: 'egridStore'  }
    ]
});


Ext.onReady(function() {
    Ext.create('Ext.container.Viewport', {
        id : "id",
        layout : 'border',
        items : [ panel, wgrid,egrid]
    });
    wquery();

});

// 查询
function beforeload_wgridStore(store){
    store.proxy.extraParams, {
        A_MAT_NO: Ext.getCmp('equipcode').getValue(),
        A_MAT_DESC: Ext.getCmp('equipname').getValue()
    }
}

function wquery() {
    Ext.data.StoreManager.lookup('wgridStore').load({
        params: {
            A_MAT_NO: Ext.getCmp('equipcode').getValue(),
            A_MAT_DESC: Ext.getCmp('equipname').getValue()
        }
    });
}
function beforeload_egridStore(store){
    store.proxy.extraParams, {
        A_MAT_NO: materialcode
    }
}
// 查询
function equery() {
    var seldata = Ext.getCmp('wgrid').getSelectionModel().getSelection();
    materialcode = seldata[0].data.MATERIALCODE;
    Ext.data.StoreManager.lookup('egridStore').load({
        params: {
            A_MAT_NO: materialcode
        }
    });
}

//导出excel
function OnButtonExportClicked() {
    document.location.href = AppUrl + 'Zyk/PG_RUN7134_GETBJLIST_TABLE?A_MAT_NO='+ excelCS(Ext.getCmp('equipcode').getValue()) +
        '&A_MAT_DESC=' + excelCS(Ext.getCmp('equipname').getValue()) ;
}

function excelCS(str) {
    if(str==undefined) return '';
    if(str==null) return '';
    if(str=='') return '';
    return str;
}

function look(){
    return '<div><a href="javascript:equery()">查看</a></div> '
}
