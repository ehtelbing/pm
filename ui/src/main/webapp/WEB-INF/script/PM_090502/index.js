var V_ORDERID = '';
var V_DBGUID = '';
if (location.href.split('?')[1] != undefined) {
    V_ORDERID = Ext.urlDecode(location.href.split('?')[1]).V_ORDERID;
    V_DBGUID = Ext.urlDecode(location.href.split('?')[1]).V_DBGUID;
    V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
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

var gridWinStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridWinStore',
    fields: ['V_FLOWSTEP','V_PERSONCODE','V_PERSONCODE','V_FLOWCODE','V_FLOWNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url:   AppUrl + 'WorkOrder/PM_WORKORDER_FLOW_PER_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
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
                fieldLabel : '审批意见',
                labelAlign : 'right',
                labelWidth :60,
                width : 260,
                style : ' margin: 5px 0px 5px 10px'
            },
            {
                xtype : 'button',
                id : 'btnAgree',
                text : '同意',
                icon: imgpath + '/saved.png',
                //width : 100,
                style : 'margin: 5px 0px 5px 10px',
                listeners : {
                    click : OnButtonAgreeClicked
                }
            },
            {
                xtype : 'button',
                id : 'btnPrint',
                text : '不同意',
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

    var win=Ext.create('Ext.window.Window', {
        id: 'win',
        width: 400,
        height: 300,
        title: '审批人员选择',
        modal: true,
        frame: true,
        closeAction: 'hide',
        closable: true,
        layout: 'border',
        items: [{xtype:'panel',region:'north',frame:true,widtt:'100%', baseCls: 'my-panel-no-border',layout:'column',
            items:[{xtype:'button', margin: '5px 0px 5px 5px',text:'选择',icon: imgpath + '/add.png',handler: checkPer}]},
            {xtype: 'gridpanel', region: 'center', columnLines: true, id: 'gridWin', store: 'gridWinStore', selType: 'checkboxmodel',
                columns: [
                    {xtype: 'rownumberer', text: '序号', width: 60, align: 'center' },
                    {text: '流程步骤名称', align: 'center', width: 150, dataIndex: 'V_FLOWSTEP'},
                    {text: '审批人', align: 'center', width: 150, dataIndex: 'V_PERSONCODE'}]
            }]
    });
    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel,grid]
    });
    Ext.data.StoreManager.lookup('gridWinStore').on('load',function(){
        if(Ext.data.StoreManager.lookup('gridWinStore').data.items.length==0){
            Ext.Ajax.request({
                url: AppUrl + 'zdh/PRO_WO_FLOW_AGREE',
                method: 'POST',
                async: false,
                params: {
                    V_V_ORDERID:V_ORDERGUID,
                    V_V_DBGUID:V_DBGUID,
                    V_V_IDEA:Ext.getCmp('spyj').getValue(),
                    V_V_FLOWSTEP:Ext.getCmp('grid').getStore().getAt(0).data.V_FLOWSTEP
                },
                success: function (ret) {
                    var resp = Ext.JSON.decode(ret.responseText);
                    if(resp.V_INFO=='success'){
                        Ext.ComponentManager.get('grid').getStore().load();
                        alert('审批成功！');
                        window.close();
                    }else{
                        alert('fail！');
                    }
                }
            });

        }else{
            Ext.getCmp('win').show();
        }
    });
});

function checkPer(){
    var sumpercode="";
    var seldata = Ext.getCmp('gridWin').getSelectionModel().getSelection();
    if (seldata.length <=0) {
        alert('请选择审批人员！');
        return false;
    }else{
        for(var i=0;i<seldata.length;i++){
            if(i==0){
                sumpercode=seldata[i].data.V_PERSONCODE;
            }else{
                sumpercode=sumpercode+","+seldata[i].data.V_PERSONCODE;
            }
        }
        Ext.Ajax.request({
            url: AppUrl + 'zdh/PRO_WO_FLOW_AGREE',
            method: 'POST',
            async: false,
            params: {
                V_V_ORDERID:V_ORDERGUID,
                V_V_DBGUID:V_DBGUID,
                V_V_IDEA:Ext.getCmp('spyj').getValue(),
                V_V_FLOWSTEP:Ext.getCmp('grid').getStore().getAt(0).data.V_FLOWSTEP
            },
            success: function (ret) {
                var resp = Ext.JSON.decode(ret.responseText);
                if(resp.V_INFO=='success'){
                    Ext.ComponentManager.get('grid').getStore().load();
                    Ext.Ajax.request({
                        url : AppUrl + 'WorkOrder/PRO_WO_FLOW_DB_INSERT',
                        type : 'post',
                        async : false,
                        params : {
                            V_V_ORDERID: V_ORDERGUID,
                            V_V_FLOWSTEP: seldata[0].data.V_FLOWSTEP,
                            V_V_STATUS: '0',
                            V_V_PERCODE: sumpercode,
                            V_V_FLOWTYPE: 'WORK',
                            V_V_FLOWCODE: seldata[0].data.V_FLOWCODE,
                            V_V_FLOWNAME: seldata[0].data.V_FLOWNAME
                        },
                        success : function(response) {
                            var resp = Ext.decode(response.responseText);
                            if (resp.RET=='success'){
                                alert('审批成功！')
                                window.close();
                            }
                        }
                    });
                }
            }
        });


    }
}
function QueryPer(){
    Ext.data.StoreManager.lookup('gridWinStore').load({
        params:{
            V_V_DEPTCODE: Ext.util.Cookies.get('v_deptcode'),
            V_V_DEPTCODEREPARIR:'%',
            V_V_GUID:V_ORDERGUID,
            V_V_FLOWTYPE:'WORK'
        }
    })
}
function OnButtonAgreeClicked(){
    QueryPer();

}
function OnButtonRejectClicked(){
    Ext.Ajax.request({
        url: AppUrl + 'zdh/PRO_WO_FLOW_EQU_DISAGREE',
        method: 'POST',
        async: false,
        params: {
            V_V_ORDERID:V_ORDERGUID,
            V_V_DBGUID:V_DBGUID,
            V_V_IDEA:Ext.getCmp('spyj').getValue(),
            V_V_FLOWSTEP:Ext.getCmp('grid').getStore().getAt(0).data.V_FLOWSTEP
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if(resp.V_INFO=='success'){

                Ext.ComponentManager.get('grid').getStore().load();
                alert('审批成功！')
            }
        }
    });
}
