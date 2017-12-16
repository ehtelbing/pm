var V_ORDERID = '';
var V_DBGUID = '';
if (location.href.split('?')[1] != undefined) {
    V_ORDERID = Ext.urlDecode(location.href.split('?')[1]).V_ORDERID;
    V_DBGUID = Ext.urlDecode(location.href.split('?')[1]).V_DBGUID;
}
var pageSize=20;
var currentPage=1;
//表格信息加载
var gridStore = Ext.create('Ext.data.Store', {
    id : 'gridStore',
    autoLoad : true,
    fields : [ 'I_ID',
        'V_ORDERID',
        'V_DBGUID',
        'V_FLOWSTEP',
        'I_STATUS',
        'V_PERCODE',
        'V_IDEA',
        'V_DATE',
        'V_JDY',
        'V_EQUIP_NO',
        'V_EQUIP_NAME',
        'V_SHORT_TXT',
        'V_SPARE',
        'RW'
    ],
    proxy : {
        type : 'ajax',
        async : false,
        url : AppUrl + 'zdh/PRO_WO_FLOW_DATA_VIEW',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list',
            total : 'total'
        },
        extraParams: {
            'V_V_DBGUID': V_DBGUID,
            'V_I_PAGE':currentPage,
            'V_I_PAGENUMBER':pageSize
        }
    }
});
Ext.onReady(function () {
    var panel = Ext.create('Ext.panel.Panel', {
        id : 'panellow',
        width : '100%',
        region : 'north',
        frame : true,
        layout : 'column',
        border:false,
        items : [
            {
                xtype : 'textfield',
                id : 'spyj',
                fieldLabel : '备注',
                labelAlign : 'right',
                labelWidth :60,
                width : 260,
                style : ' margin: 5px 0px 5px 10px'
            },
            {
                xtype : 'button',
                id : 'btnAgree',
                text : '重新发起',
                icon: imgpath + '/saved.png',
                //width : 100,
                style : 'margin: 5px 0px 5px 10px',
                handler: OnButtonAgreeClicked
            },
            {
                xtype : 'button',
                id : 'btnPrint',
                text : '取消业务',
                icon: imgpath + '/cross.png',
                //width : 100,
                style : 'margin: 5px 0px 5px 10px',
                listeners : {
                    click : OnButtonRejectClicked
                }
            }]
    });


    var grid = Ext.create('Ext.grid.Panel',{
        id : 'grid',
        region : 'center',
        columnLines : true,
        width : '100%',
        store : gridStore,
        autoScroll : true,
        //selType : 'checkboxmodel',
        height : 400,
        columns : [ {
            xtype : 'rownumberer',
            text : '序号',
            width : 50,
            align : 'center'
        },{
            text : '工单号',
            dataIndex : 'V_ORDERID',
            width : 150,
            align : 'center'
        }, {
            text : '工单描述',
            dataIndex : 'V_SHORT_TXT',
            width : 300,
            align : 'center'
        },{
            text : '设备名称',
            dataIndex : 'V_EQUIP_NAME',
            width : 150,
            align : 'center'
        },{
            text : '备件消耗',
            dataIndex : 'V_SPARE',
            width : 300,
            align : 'center'
        }, {
            text : '流程步骤',
            dataIndex : 'V_FLOWSTEP',
            width : 150,
            align : 'center'
        }, {
            text : '点检员',
            dataIndex : 'V_PERCODE',
            width : 150,
            align : 'center'
        }],
        bbar : [ {
            width:"100%",
            id : 'page',
            xtype : 'pagingtoolbar',
            dock : 'bottom',
            displayInfo : true,
            displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg : '没有记录',
            store : gridStore
        } ]
    });
    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel,grid]
    });
});

function OnButtonAgreeClicked(){
    Ext.Ajax.request({
        url: AppUrl + 'zdh/PRO_WO_FLOW_EQU_AGREE',
        method: 'POST',
        async: false,
        params: {
            V_V_ORDERID:V_ORDERID,
            V_V_DBGUID:V_DBGUID,
            V_V_IDEA:Ext.getCmp('spyj').getValue(),
            V_V_FLOWSTEP:Ext.getCmp('grid').getStore().getAt(0).data.V_FLOWSTEP
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if(resp.V_INFO=='success'){
                Ext.ComponentManager.get('grid').getStore().load();
            }
        }
    });
}
function OnButtonRejectClicked(){
    Ext.Ajax.request({
        url: AppUrl + 'zdh/PRO_WO_FLOW_EQU_CANCEL',
        method: 'POST',
        async: false,
        params: {
            V_V_ORDERID:V_ORDERID
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if(resp.V_INFO=='success'){
                Ext.ComponentManager.get('grid').getStore().load();
            }
        }
    });
}
