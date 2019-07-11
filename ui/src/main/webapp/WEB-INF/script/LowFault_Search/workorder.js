var tabtool=true;
var querytool=true;
var selectID = [];

var V_GUID='';

if (location.href.split('?')[1] != undefined) {
    V_GUID = Ext.urlDecode(location.href.split('?')[1]).V_GUID;
}

Ext.onReady(function() {

    var gridStore = Ext.create('Ext.data.Store', {
        id : 'gridStore',
        pageSize : 50,
        autoLoad : false,
        fields : [ 'V_ORDERGUID', 'V_ORDERID', 'V_SHORT_TXT', 'V_EQUIP_NO',
            'V_EQUIP_NAME', 'V_EQUSITENAME', 'V_SPARE', 'V_ORGNAME','V_ORGCODE','V_DEPTCODE',
            'V_DEPTNAME', 'V_PERSONNAME', 'D_ENTER_DATE',
            'V_DEPTNAMEREPARIR', 'V_ORDER_TYP_TXT', 'V_STATENAME','WORKORDERNUM','PLANTIME','FACTTIME'],

        proxy : {
            type : 'ajax',
            async : false,
            url : AppUrl + 'cxy/PM_GET_WORKORDER_BY_FAULT',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            }
        }
    });




    var grid = Ext.create('Ext.grid.Panel', {
        xtype : 'gridpanel',
        id : 'grid',
        region : 'center',
        columnLines : true,
        width : '100%',
        store : gridStore,
        autoScroll : true,
        selType : 'checkboxmodel',
        style : ' margin: 5px 0px 5px 5px',
        columns : [ {
            xtype : 'rownumberer',
            width : 30,
            sortable : false
        },  {
            text : '工单号',
            dataIndex : 'V_ORDERID',
            width : 100,
            align : 'center',
            renderer : left
        }, {
            text : '工单描述',
            dataIndex : 'V_SHORT_TXT',
            width : 300,
            align : 'center',
            renderer : left,
            renderer : CreateGridColumnTd
        },  {
            text : '设备名称',
            dataIndex : 'V_EQUIP_NAME',
            width : 130,
            align : 'center',
            renderer : left,
            renderer : CreateGridColumnTd
        }, {
            text : '设备位置',
            dataIndex : 'V_EQUSITENAME',
            width : 220,
            align : 'center',
            renderer : left,
            renderer : CreateGridColumnTd
        }, {
            text : '备件消耗',
            dataIndex : 'V_SPARE',
            width : 300,
            align : 'center',
            renderer : left,
            renderer : CreateGridColumnTd
        }, {
            text : '委托单位',
            dataIndex : 'V_DEPTNAME',
            width : 150,
            align : 'center',
            renderer : left,
            renderer : CreateGridColumnTd
        }, {
            text : '委托人',
            dataIndex : 'V_PERSONNAME',
            width : 100,
            align : 'center',
            renderer : left
        }, {
            text : '委托时间',
            dataIndex : 'D_ENTER_DATE',
            width : 140,
            align : 'center',
            renderer : left,
            renderer : rendererTime
        }, {
            text : '检修单位',
            dataIndex : 'V_DEPTNAMEREPARIR',
            width : 150,
            align : 'center',
            renderer : left,
            renderer : CreateGridColumnTd
        }, {
            text : '工单类型描述',
            dataIndex : 'V_ORDER_TYP_TXT',
            width : 100,
            align : 'center',
            renderer : left,
            renderer : CreateGridColumnTd
        }, {
            text : '工单状态',
            dataIndex : 'V_STATENAME',
            width : 65,
            align : 'center',
            renderer : left,
            renderer : CreateGridColumnTd
        } ,{
            text : '计划工时',
            dataIndex : 'PLANTIME',
            width : 100,
            align : 'center',
            renderer : left
        },{
            text : '实际工时',
            dataIndex : 'FACTTIME',
            width : 100,
            align : 'center',
            renderer : left
        } ],
        // listeners : {
        //     itemdblclick : itemClick
        // },
        // bbar : [ {
        //     xtype : 'pagingtoolbar',
        //     dock : 'bottom',
        //     id : 'page',
        //     displayInfo : true,
        //     displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
        //     emptyMsg : '没有记录',
        //     store : 'gridStore'
        // } ]
    });

    Ext.QuickTips.init();
    Ext.create('Ext.container.Viewport', {
        id : "id",
        layout : 'border',
        items : [grid]//{xtype:'panel',id:'testPanel',region:'north',height:40},
    });


    Ext.data.StoreManager.lookup('gridStore').on('beforeload',function(store) {
            store.proxy.extraParams.V_GUID = V_GUID;

        });
    QueryGrid();
});

function QueryGrid() {
    Ext.data.StoreManager.lookup('gridStore').load();
}

function left(value, metaData) {
    metaData.style = "text-align:left";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function rendererTime(value, metaData) {
    metaData.style = "text-align:left";
    return '<div data-qtip="' + value.split('.0')[0] + '" >' + value.split('.0')[0] + '</div>';
}

function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    var val=value==null?'':value;
    return '<div data-qtip="' + val + '" >' + val + '</div>';
}
