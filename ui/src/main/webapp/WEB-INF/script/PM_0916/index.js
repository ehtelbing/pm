Ext.onReady(function() {
    var gridStore = Ext.create('Ext.data.Store', {
        id : 'gridStore',
        pageSize : 15,
        autoLoad : false,
        fields : [ 'V_ORDERGUID', 'V_ORDERID', 'V_SHORT_TXT', 'V_EQUIP_NO',
            'V_EQUIP_NAME', 'V_EQUSITENAME', 'V_SPARE', 'V_ORGNAME',
            'V_DEPTNAME', 'V_PERSONNAME', 'D_ENTER_DATE',
            'V_DEPTNAMEREPARIR', 'V_ORDER_TYP_TXT', 'V_STATENAME' ],

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

    var ckstore = Ext.create("Ext.data.Store", {
        autoLoad : true,
        storeId : 'ckstore',
        fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            },
            extraParams : {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE':  Ext.util.Cookies.get('v_orgCode'),
                'V_V_DEPTCODENEXT': Ext.util.Cookies.get('v_deptcode'),
                'V_V_DEPTTYPE': '基层单位'
            }
        }
    });

    var zyqstore = Ext.create("Ext.data.Store", {
        autoLoad : false,
        storeId : 'zyqstore',
        fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            }
        }
    });

    var ssblx = Ext.create('Ext.data.Store', {
        autoLoad : false,
        storeId : 'ssblx',
        fields : [ 'V_EQUTYPECODE', 'V_EQUTYPENAME' ],
        proxy : {
            type : 'ajax',
            async : false,
            url : AppUrl + 'WorkOrder/PRO_GET_DEPTEQUTYPE_ADMIN',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            }
        }
    });

    var ssbmc = Ext.create('Ext.data.Store', {
        autoLoad : false,
        storeId : 'ssbmc',
        fields : [ 'V_EQUCODE', 'V_EQUNAME' ],
        proxy : {
            type : 'ajax',
            async : false,
            url : AppUrl + 'WorkOrder/PRO_GET_DEPTEQU_ADMIN',
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
        border:false,
        layout : 'column',
        border:false,
        defaults : { style : 'margin:5px 0px 5px 5px', labelAlign : 'right' },
        frame:true,
        items : [
                  {id : 'begintime',xtype : 'datefield',editable : false,format : 'Y/m/d',value : new Date(new Date().getFullYear() + '/'+ (new Date().getMonth() + 1) + '/' + 1),fieldLabel : '时间段选择',labelWidth : 80, baseCls : 'margin-bottom'},
                     { id : 'endtime',xtype : 'datefield',editable : false,format : 'Y/m/d',value : new Date(),fieldLabel : '至',labelWidth :80},
                     {id : 'ck',xtype : 'combo',store : ckstore,editable : false,fieldLabel : '厂矿',labelWidth : 80,displayField : 'V_DEPTNAME', valueField : 'V_DEPTCODE',queryMode : 'local', baseCls : 'margin-bottom' },
                     {id : 'zyq',xtype : 'combo',store : zyqstore,editable : false,fieldLabel : '作业区',labelWidth : 80, displayField : 'V_DEPTNAME',valueField : 'V_DEPTCODE',queryMode : 'local', baseCls : 'margin-bottom'},
                     {id : 'sblx',xtype : 'combo', store : ssblx,editable : false,fieldLabel : '设备类型', labelWidth : 80,displayField : 'V_EQUTYPENAME',valueField : 'V_EQUTYPECODE',queryMode : 'local', baseCls : 'margin-bottom'},
                     {id : 'sbmc',xtype : 'combo', store : ssbmc,editable : false,fieldLabel : '设备名称', labelWidth : 80,displayField : 'V_EQUNAME',valueField : 'V_EQUCODE',queryMode : 'local', baseCls : 'margin-bottom'},
                    {id : 'selshortTxt',xtype : 'textfield', width : 158,emptyText : '按工单描述模糊搜索',margin:'5px 0px 5px 90px'},
                    {id : 'selmatDesc',xtype : 'textfield', width : 158,emptyText : '按使用物料模糊搜索',margin:'5px 0px 5px 90px'},
                    {id : 'query',xtype : 'button', icon : imgpath+'/search.png',text : '查询',handler : function() {Ext.getCmp('tabpanel').removeAll();addTab(); }},
                    { xtype : 'button',text : '导出Excel',icon :imgpath+ '/grid.png',listeners : { click : OnClickExcelButton}},
                    { xtype : 'button',text : '转为正式工单',icon :imgpath+ '/add.png',listeners : { click : OnClickChangeButton}},
                    { xtype : 'hidden',id : 'tabid'}
            ]
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
        style : ' margin: 0px 0px 0px 0px',
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
            width : 250,
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
            width :150,
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

    Ext.QuickTips.init();
    Ext.create('Ext.container.Viewport', {
        id : "id",
        layout : 'border',
        items : [panel, {xtype:'panel',id:'apanel',region:'north',baseCls : 'my-panel-noborder',height:40},grid]
    });

    Ext.data.StoreManager.lookup('ckstore').on("load", function() {
        Ext.getCmp("ck").select(Ext.data.StoreManager.lookup('ckstore').getAt(0));
        Ext.data.StoreManager.lookup('zyqstore').load({
            params : {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE':   Ext.getCmp("ck").getValue(),
                'V_V_DEPTCODENEXT':  Ext.util.Cookies.get('v_deptcode'),
                'V_V_DEPTTYPE':'[主体作业区]'
            }
        });
    });

    Ext.data.StoreManager.lookup('zyqstore').on("load", function() {
        Ext.getCmp("zyq").select(Ext.data.StoreManager.lookup('zyqstore').getAt(0));
        Ext.data.StoreManager.lookup('ssblx').load({
            params : {
                V_V_DEPTCODENEXT:Ext.getCmp("zyq").getValue()
            }
        });
    });

    Ext.data.StoreManager.lookup('ssblx').on('load', function() {
        Ext.getCmp("sblx").select(Ext.data.StoreManager.lookup('ssblx').getAt(0));
        Ext.data.StoreManager.lookup('ssbmc').load({
            params : {
                V_V_DEPTCODENEXT :Ext.getCmp("zyq").getValue(),
                V_V_EQUTYPECODE : Ext.getCmp("sblx").getValue()
            }
        });

    });

    Ext.data.StoreManager.lookup('ssbmc').on('load', function() {
        Ext.getCmp("sbmc").select(Ext.data.StoreManager.lookup('ssbmc').getAt(0));
        addTab();
    });

    Ext.getCmp("ck").on("select",function() {
        Ext.getCmp('zyq').getStore().removeAll();
        Ext.data.StoreManager.lookup('zyqstore').load({
             params : {
                 V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                 V_V_DEPTCODE:Ext.getCmp("ck").getValue(),
                 V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode'),
                 V_V_DEPTTYPE:'[主体作业区]'
                }
            });
        });

    Ext.getCmp('zyq').on('select', function() {
        Ext.getCmp('sblx').getStore().removeAll();
        Ext.data.StoreManager.lookup('ssblx').load({
                params : {
                    V_V_DEPTCODENEXT : Ext.getCmp("zyq").getValue()
                }
            });
    });

    Ext.getCmp('sblx').on( 'select',function() {
        Ext.getCmp('sbmc').getStore().removeAll();
        Ext.data.StoreManager.lookup('ssbmc').load({
                params : {
                    V_V_DEPTCODENEXT :Ext.getCmp("zyq").getValue(),
                    V_V_EQUTYPECODE : Ext.getCmp("sblx").getValue()
                }
            });
        });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload',function(store) {
        store.proxy.extraParams.V_D_ENTER_DATE_B = Ext.Date.format(Ext.getCmp( "begintime").getValue(), 'Y-m-d');
        store.proxy.extraParams.V_D_ENTER_DATE_E = Ext.Date.format(Ext.getCmp( "endtime").getValue(), 'Y-m-d');
        store.proxy.extraParams.V_V_ORGCODE = Ext.getCmp( "ck").getValue();
        store.proxy.extraParams.V_V_DEPTCODE = Ext.getCmp( "zyq").getValue();
        store.proxy.extraParams.V_V_DEPTCODEREPARIR ='';
        store.proxy.extraParams.V_V_STATECODE = '30';
        store.proxy.extraParams.V_EQUTYPE_CODE = Ext.getCmp( "sblx").getValue();
        store.proxy.extraParams.V_EQU_CODE = Ext.getCmp( "sbmc").getValue();
        store.proxy.extraParams.V_DJ_PERCODE ='%';
        store.proxy.extraParams.V_V_SHORT_TXT = Ext.getCmp( "selshortTxt").getValue();
        store.proxy.extraParams.V_V_BJ_TXT = Ext.getCmp("selmatDesc").getValue();
        store.proxy.extraParams.V_V_ORDER_TYP = Ext.getCmp('tabpanel').getActiveTab().id;
        store.proxy.extraParams.V_V_PAGE= Ext.getCmp('page').store.currentPage;
        store.proxy.extraParams.V_V_PAGESIZE= Ext.getCmp('page').store.pageSize;
    });
});
function queryGrid(){
    Ext.getCmp('page').store.currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore').load();
    /*Ext.data.StoreManager.lookup('gridStore').load({
        params : {
            V_D_ENTER_DATE_B : Ext.Date.format(Ext.ComponentManager .get("begintime").getValue(), 'Y-m-d'),
            V_D_ENTER_DATE_E :  Ext.Date.format(Ext.ComponentManager .get("endtime").getValue(), 'Y-m-d'),
            V_V_ORGCODE :Ext.getCmp("ck").getValue() ,
            V_V_DEPTCODE :Ext.getCmp("zyq").getValue() ,
            V_V_DEPTCODEREPARIR : '',
            V_V_STATECODE : '30' ,
            V_EQUTYPE_CODE :Ext.getCmp("sblx").getValue() ,
            V_EQU_CODE :Ext.getCmp("sbmc").getValue() ,
            V_DJ_PERCODE : '%' ,
            V_V_SHORT_TXT :Ext.getCmp("selshortTxt").getValue() ,
            V_V_BJ_TXT :Ext.getCmp("selmatDesc").getValue() ,
            V_V_ORDER_TYP : Ext.getCmp('tabpanel').getActiveTab().id
        }
    });*/
}
function OnClickExcelButton(){
    document.location.href=AppUrl + 'excel/GDCX_EXCEL?V_D_ENTER_DATE_B='+Ext.Date.format(Ext.getCmp( "begintime").getValue(), 'Y-m-d')+
    '&V_D_DEFECTDATE_E='+Ext.Date.format(Ext.getCmp( "endtime").getValue(), 'Y-m-d')+
    '&V_V_ORGCODE='+Ext.ComponentManager.get("ck").getValue()+
    '&V_V_DEPTCODE='+Ext.ComponentManager.get("zyq").getValue()+
    '&V_V_DEPTCODEREPARIR='+ ''+
    '&V_V_STATECODE=30'+
    '&V_EQUTYPE_CODE='+encodeURI(Ext.ComponentManager.get("sblx").getValue())+
    '&V_EQU_CODE='+encodeURI(Ext.ComponentManager.get("sbmc").getValue())+
    '&V_DJ_PERCODE='+encodeURI('%')+
    '&V_V_SHORT_TXT='+ Ext.ComponentManager.get("selshortTxt").getValue()+
    '&V_V_BJ_TXT='+Ext.ComponentManager.get("selmatDesc").getValue()+
    '&V_V_ORDER_TYP='+ Ext.getCmp('tabpanel').getActiveTab().id;
}

function addTab(){
    Ext.Ajax.request({
            url : AppUrl + 'WorkOrder/PRO_PM_WORKTYPCOUNT_ADMIN',
            async : false,
            method : 'POST',
            params : {
                V_D_ENTER_DATE_B : Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(), 'Y-m-d'),
                V_D_ENTER_DATE_E:Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y-m-d'),
                V_V_ORGCODE:Ext.ComponentManager.get("ck").getValue(),
                V_V_DEPTCODE:Ext.ComponentManager.get("zyq").getValue(),
                V_V_DEPTCODEREPARIR:'',
                V_V_STATECODE: '30',
                V_EQUTYPE_CODE: Ext.ComponentManager.get("sblx").getValue(),
                V_EQU_CODE: Ext.ComponentManager.get("sbmc").getValue(),
                V_DJ_PERCODE: '%',
                V_V_SHORT_TXT: Ext.ComponentManager.get("selshortTxt").getValue(),
                V_V_BJ_TXT: Ext.ComponentManager.get("selmatDesc").getValue()
            },
            success : function(ret) {
                var respRoot = Ext.JSON.decode(ret.responseText);
                var resp = respRoot.list;
                var tabdata=[];
                for (var i = 0; i < resp.length; i++) {
                    tabdata.push({
                        id:resp[i].ORDER_TYP,
                        title: resp[i].ORDER_TYP_TXT,
                        items:[{
                            xtype : 'hidden',
                            value : resp[i].ORDER_TYP
                        }]
                    });
                }
                Ext.getCmp('apanel').removeAll();
                Ext.getCmp('apanel').add({
                    xtype : 'tabpanel',
                    baseCls : 'my-panel-noborder',
                    id : 'tabpanel',
                    listeners : {tabchange : OnChangeTab},items:tabdata});
                Ext.getCmp('tabpanel').setActiveTab(0);
                queryGrid();
            }
        });

}



function OnChangeTab(){
    queryGrid();
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
        window.parent.append('090901', '检修工单验收明细', AppUrl + 'page/PM_090901/index.html?V_GUID=' + Ext.getStore("gridStore").getAt(index).get("V_ORDERGUID") + '');
    } catch (e) {
        window.open(AppUrl + "page/PM_090901/index.html?V_GUID=" + Ext.getStore("gridStore").getAt(index).get("V_ORDERGUID"), "", "dialogHeight:700px;dialogWidth:1100px");
    }
}
function OnClickChangeButton(){
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    var length=seldata.length;
    if(length==0){
        Ext.Msg.alert("操作信息","请选择记录");
        return false;
    }
    for(var i=0;i<length;i++){
        Ext.Ajax.request({
            url: AppUrl + 'PM_09/PRO_WORKORDER_ZS_SET',
            async: false,
            method: 'POST',
            params: {
                V_V_ORDERGUID: seldata[i].data.V_ORDERGUID
            },
            success: function (ret) {
                var resp = Ext.JSON.decode(ret.responseText);
            }
        });
    }
    queryGrid();
}