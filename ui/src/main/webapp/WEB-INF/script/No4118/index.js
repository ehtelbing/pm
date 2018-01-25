var tabtool=true;
var querytool=true;
Ext.onReady(function() {

    var gridStore = Ext.create('Ext.data.Store', {
        id : 'gridStore',
        pageSize : 15,
        autoLoad : false,
        fields : [ 'V_ORDERGUID', 'V_ORDERID', 'V_SHORT_TXT', 'V_EQUIP_NO',
            'V_EQUIP_NAME', 'V_EQUSITENAME', 'V_SPARE', 'V_ORGNAME',
            'V_DEPTNAME', 'V_PERSONNAME', 'D_ENTER_DATE',
            'V_DEPTNAMEREPARIR', 'V_ORDER_TYP_TXT', 'V_STATENAME','WORKORDERNUM' ],

        proxy : {
            type : 'ajax',
            async : false,
            url : AppUrl + 'WorkOrder/PRO_PM_WORKORDER_SELECT_ADMIN',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list',
                total: 'total'
            }
        }
    });

    var sgdzt = Ext.create("Ext.data.Store", {
        autoLoad : false,
        storeId : 'sgdzt',
        fields : [ 'V_STATECODE', 'V_STATENAME' ],
        proxy : {
            type : 'ajax',
            async : false,
            url : AppUrl + 'WorkOrder/PRO_PM_WORKORDER_STATE_VIEW',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            }
        }
    });

    var panel =Ext.create('Ext.panel.Panel',{
        id : 'panellow',
        region : 'north',
        layout : 'column',
        frame:true,
        defaults: {
            style: 'margin:5px 0px 5px 5px',
            labelAlign: 'right'
        },
        items : [{id : 'gdzt',xtype : 'combo',store : sgdzt,editable : false, fieldLabel : '工单状态',labelWidth : 80,displayField : 'V_STATENAME', valueField : 'V_STATECODE', queryMode : 'local', baseCls : 'margin-bottom'},
                {id : 'query',xtype : 'button', icon : '../../images/gif/search.png',text : '查询', width : 80,listeners: {click: QueryGrid}},
                { xtype : 'button',text : '导出excel',icon : '../../images/gif/grid.png',width : 85, listeners : { click : OnClickExcelButton}},
                { xtype : 'hidden',id : 'tabid'}]
        });

    var grid = Ext.create('Ext.grid.Panel', {
        xtype : 'gridpanel',
        id : 'grid',
        region : 'center',
        columnLines : true,
        width : '100%',
        store : gridStore,
        autoScroll : true,
        style : ' margin: 5px 0px 5px 5px',
        columns : [ {
            xtype : 'rownumberer',
            width : 30,
            sortable : false
        }, {
            text : '工单GUID(隐藏)',
            dataIndex : 'V_ORDERGUID',
            align : 'center',
            hidden : true
        }, {
            text : '工单号',
            dataIndex : 'V_ORDERID',
            width : 100,
            align : 'center',
            renderer : left
        },  {
            text : '子工单数量',
            dataIndex : 'WORKORDERNUM',
            width : 100,
            align : 'center',
            renderer : left,
            renderer : rendererZGD
        }, {
            text : '工单描述',
            dataIndex : 'V_SHORT_TXT',
            width : 300,
            align : 'center',
            renderer : left,
            renderer : CreateGridColumnTd
        }, {
            text : '设备编号（隐藏）',
            dataIndex : 'V_EQUIP_NO',
            align : 'center',
            hidden : true
        }, {
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
        } ],
        listeners : {
            itemdblclick : itemClick
        },
        bbar : [ {
            xtype : 'pagingtoolbar',
            dock : 'bottom',
            id : 'page',
            displayInfo : true,
            displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg : '没有记录',
            store : 'gridStore'
        } ]
    });
    var tabpanel = Ext.create("Ext.tab.Panel", {
        id: 'tabpanel',
        region: 'center',
        activeTab: 0,
        listeners: {
            tabchange: function () {
                if (querytool) {
                    Ext.ComponentManager.get("tabid").setValue(Ext
                        .getCmp('tabpanel').getActiveTab().down("hidden")
                        .getValue());
                    Ext.getCmp('page').store.currentPage = 1;
                    Ext.data.StoreManager.lookup('gridStore').load();
                } else {
                    Ext.ComponentManager.get("tabid").setValue(Ext
                        .getCmp('tabpanel').getActiveTab().down("hidden")
                        .getValue());

                }
            }
        }
    });
    Ext.QuickTips.init();
    Ext.create('Ext.container.Viewport', {
        id : "id",
        layout : 'border',
        items : [panel,grid]
    });
    QueryGrid();


    Ext.data.StoreManager.lookup('sgdzt').load({});

    Ext.data.StoreManager.lookup('sgdzt').on("load", function() {
        Ext.ComponentManager.get('gdzt').store.insert(0, {
            'V_STATECODE' : '%',
            'V_STATENAME' : '全部'
        });
        Ext.getCmp("gdzt").select(Ext.data.StoreManager.lookup('sgdzt').getAt(0));
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_D_ENTER_DATE_B : '%',
            V_D_ENTER_DATE_E : '%',
            V_V_ORGCODE : '%',
            V_V_DEPTCODE : '%',
            V_V_DEPTCODEREPARIR :'',
            V_V_STATECODE : Ext.getCmp( "gdzt").getValue(),
            V_EQUTYPE_CODE : '%',
            V_EQU_CODE : '%',
            V_DJ_PERCODE :Ext.util.Cookies.get('v_personcode'),
            V_V_SHORT_TXT : '%',
            V_V_BJ_TXT : '%',
            V_V_ORDER_TYP : '%',
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    });

});
function OnSearch() {
    querytool = false;
    Ext.ComponentManager.get('tabpanel').removeAll();

    Ext.ComponentManager.get('tabpanel').removeAll();
    Ext.Ajax.request({
        url : AppUrl + 'WorkOrder/PRO_PM_WORKTYPCOUNT_ADMIN',
        async : false,
        method : 'POST',
        params : {
            V_D_ENTER_DATE_B : '%',//Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(), 'Y-m-d'),
            V_D_ENTER_DATE_E:'%',//Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y-m-d'),
            V_V_ORGCODE:'%',//Ext.ComponentManager.get("ck").getValue(),
            V_V_DEPTCODE:'%',//Ext.ComponentManager.get("zyq").getValue(),
            V_V_DEPTCODEREPARIR:'',
            V_V_STATECODE:   Ext.ComponentManager.get("gdzt").getValue(),
            V_EQUTYPE_CODE:    '%',//Ext.ComponentManager.get("sblx").getValue(),
            V_EQU_CODE:    '%',//Ext.ComponentManager.get("sbmc").getValue(),
            V_DJ_PERCODE:    Ext.util.Cookies.get('v_personcode'),//Ext.ComponentManager.get("djy").getValue(),
            V_V_SHORT_TXT:   '%',//Ext.ComponentManager.get("selshortTxt").getValue(),
            V_V_BJ_TXT:   '%',//Ext.ComponentManager.get("selmatDesc").getValue()
        },
        success : function(ret) {
            var respRoot = Ext.JSON.decode(ret.responseText);
            var resp = respRoot.list;
            var tabdata=[];
            for (var i = 0; i < resp.length; i++) {
                Ext.getCmp('tabpanel').add({
                    id : resp[i].ORDER_TYP,
                    title: resp[i].ORDER_TYP_TXT,
                    items: [{
                        xtype: 'hidden',
                        value: resp[i].ORDER_TYP
                    }]
                });
            }
            Ext.getCmp('tabpanel').setActiveTab(0);
            querytool = true;
        }
    });

}
function QueryGrid() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_D_ENTER_DATE_B : '%',
            V_D_ENTER_DATE_E : '%',
            V_V_ORGCODE : '%',
            V_V_DEPTCODE : '%',
            V_V_DEPTCODEREPARIR :'',
            V_V_STATECODE : Ext.getCmp( "gdzt").getValue(),
            V_EQUTYPE_CODE : '%',
            V_EQU_CODE : '%',
            V_DJ_PERCODE :Ext.util.Cookies.get('v_personcode'),
            V_V_SHORT_TXT : '%',
            V_V_BJ_TXT : '%',
            V_V_ORDER_TYP : '%',
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    });
}
function rendererZGD(a, value, metaData){
    return '<a href="javascript:goToZGD(\'' + metaData.data.V_ORDERGUID + '\')">' + a + '</a>';
}
function goToZGD(V_ORDERGUID){
    window.open(AppUrl + "page/No4117/Index.html?V_ORDERGUID="
        + V_ORDERGUID,
        "", "dialogHeight:700px;dialogWidth:1100px");

}
function OnClickExcelButton(){
    document.location.href=AppUrl + 'excel/GDCX_EXCEL?V_D_ENTER_DATE_B='+'0'//Ext.Date.format(Ext.getCmp( "begintime").getValue(), 'Y-m-d')
        +'&V_D_DEFECTDATE_E='+'0'//Ext.Date.format(Ext.getCmp( "endtime").getValue(), 'Y-m-d')
        +'&V_V_ORGCODE='+''//Ext.ComponentManager.get("ck").getValue()
        +'&V_V_DEPTCODE='+''//Ext.ComponentManager.get("zyq").getValue()
        +'&V_V_DEPTCODEREPARIR='+ ''
        +'&V_V_STATECODE='+encodeURI(Ext.ComponentManager.get("gdzt").getValue())
        +'&V_EQUTYPE_CODE='+'0'//encodeURI(Ext.ComponentManager.get("sblx").getValue())
        +'&V_EQU_CODE='+'0'//encodeURI(Ext.ComponentManager.get("sbmc").getValue())
        +'&V_DJ_PERCODE='+ Ext.util.Cookies.get('v_personcode')//encodeURI(Ext.ComponentManager.get("djy").getValue())
        +'&V_V_SHORT_TXT='+ ''//Ext.ComponentManager.get("selshortTxt").getValue()
        +'&V_V_BJ_TXT='+''//Ext.ComponentManager.get("selmatDesc").getValue()
        +'&V_V_ORDER_TYP='+Ext.getCmp('tabpanel').getActiveTab().id
        +'&V_V_PAGE='+ Ext.getCmp('page').store.currentPage
        +'&V_V_PAGESIZE='+ Ext.getCmp('page').store.pageSize;
}

function addTab(){
    Ext.ComponentManager.get('tabpanel').removeAll();
    Ext.Ajax.request({
            url : AppUrl + 'WorkOrder/PRO_PM_WORKTYPCOUNT_ADMIN',
            async : false,
            method : 'POST',
            params : {
                V_D_ENTER_DATE_B : '%',//Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(), 'Y-m-d'),
                V_D_ENTER_DATE_E:'%',//Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y-m-d'),
                V_V_ORGCODE:'%',//Ext.ComponentManager.get("ck").getValue(),
                V_V_DEPTCODE:'%',//Ext.ComponentManager.get("zyq").getValue(),
                V_V_DEPTCODEREPARIR:'',
                V_V_STATECODE:   Ext.ComponentManager.get("gdzt").getValue(),
                V_EQUTYPE_CODE:    '%',//Ext.ComponentManager.get("sblx").getValue(),
                V_EQU_CODE:    '%',//Ext.ComponentManager.get("sbmc").getValue(),
                V_DJ_PERCODE:    Ext.util.Cookies.get('v_personcode'),//Ext.ComponentManager.get("djy").getValue(),
                V_V_SHORT_TXT:   '%',//Ext.ComponentManager.get("selshortTxt").getValue(),
                V_V_BJ_TXT:   '%',//Ext.ComponentManager.get("selmatDesc").getValue()
            },
            success : function(ret) {
                var respRoot = Ext.JSON.decode(ret.responseText);
                var resp = respRoot.list;
                var tabdata=[];
                for (var i = 0; i < resp.length; i++) {
                    Ext.getCmp('tabpanel').add({
                        id : resp[i].ORDER_TYP,
                        title: resp[i].ORDER_TYP_TXT,
                        items: [{
                            xtype: 'hidden',
                            value: resp[i].ORDER_TYP
                        }]
                    });
                }
                Ext.getCmp('tabpanel').setActiveTab(0);
            }
        });
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

function itemClick(s, record, item, index, e, eOpts) {

    Ext.Ajax.request({
        url:AppUrl+'mm/GetBillMaterialByOrder',
        type:'post',
        async:false,
        params:{
            V_V_ORDERID:Ext.getStore("gridStore").getAt(index).get("V_ORDERID"),
            V_V_ORDERGUID:Ext.getStore("gridStore").getAt(index).get("V_ORDERGUID"),
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode')
        },
        success:function(response){
            var resp=Ext.decode(response.responseText);
            if(resp.ret=='Success'){
                //alert("工单创建成功");
            }else{
                //alert("接口调用失败");
            }
        }
    });
    try {
        window.parent.append('090901', '检修工单验收明细', AppUrl + 'page/PM_090901/index.html?V_GUID='
            + Ext.getStore("gridStore").getAt(index).get("V_ORDERGUID")
            + '');
    } catch (e) {
        window.open(AppUrl + "page/PM_090901/index.html?V_GUID="
            + Ext.getStore("gridStore").getAt(index).get("V_ORDERGUID"),
            "", "dialogHeight:700px;dialogWidth:1100px");
    }

}