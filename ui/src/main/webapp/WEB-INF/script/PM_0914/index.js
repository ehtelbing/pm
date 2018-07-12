var pageSize = 20;
var currentPage = 1;
var PM_220103URL = '/PM_220103/index.html';
var checktabid=0;
var ckload = false;
var zyqload  = false;
var sblxload = false;
var sbmcload = false;
var djyload = false;
var initload = true;

Ext.define('Ext.ux.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    async: true,
    doRequest: function (operation, callback, scope) {
        var writer = this.getWriter(),
            request = this.buildRequest(operation);
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        Ext.apply(request, {
            async: this.async,
            binary: this.binary,
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, callback, scope),
            method: this.getMethod(request),
            disableCaching: false
        });
        Ext.Ajax.request(request);
        return request;
    }
});
Ext.onReady(function () {
    //Ext.QuickTips.init();
    var ckstore = Ext.create("Ext.data.Store", {
        autoLoad : true,
        storeId : 'ckstore',
        fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
        proxy : Ext.create("Ext.ux.data.proxy.Ajax",{
            type : 'ajax',
            async : false,
            url : AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            },
            extraParams : {
                V_V_PERSONCODE:   Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE:    Ext.util.Cookies.get('v_orgCode'),
                V_V_DEPTCODENEXT:    Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE:   '[基层单位]'
            }
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('ck').select(store.first());
                Ext.getCmp("gdzt").select('4');
                ckload =true;
                OnPageLoad();
            }
        }
    });

    var zyqstore = Ext.create("Ext.data.Store", {
        autoLoad : false,
        storeId : 'zyqstore',
        fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
        proxy :Ext.create("Ext.ux.data.proxy.Ajax", {
            type : 'ajax',
            async : false,
            url : AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            }
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('zyq').select(store.first());
                zyqload =true;
                OnPageLoad();
            }
        }
    });

    var ssblx = Ext.create('Ext.data.Store', {
        autoLoad : false,
        storeId : 'ssblx',
        fields : [ 'V_EQUTYPECODE', 'V_EQUTYPENAME' ],
        proxy :Ext.create("Ext.ux.data.proxy.Ajax", {
            type : 'ajax',
            async : false,
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            }
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('sblx').select('%');
                sblxload =true;
                OnPageLoad();
            }
        }
    });

    var ssbmc = Ext.create('Ext.data.Store', {
        autoLoad : false,
        storeId : 'ssbmc',
        fields : [ 'V_EQUCODE', 'V_EQUNAME' ],
        proxy : Ext.create("Ext.ux.data.proxy.Ajax",{
            type : 'ajax',
            async : false,
            url: AppUrl + 'PM_06/pro_get_deptequ_per',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            }
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('sbmc').select(store.first());
                sbmcload =true;
                Ext.getCmp("testPanel").add(tabpanel);
                OnPageLoad();
            }
        }
    });

    var sdjy = Ext.create('Ext.data.Store', {
        autoLoad : false,
        storeId : 'sdjy',
        fields : [ 'V_PERSONCODE', 'V_PERSONNAME' ],
        proxy : Ext.create("Ext.ux.data.proxy.Ajax",{
            type : 'ajax',
            async : false,
            url : AppUrl + 'No4120/PRO_BASE_PERSON_VIEW_ROLE',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            }
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('djy').select(store.first());
                djyload =true;
                OnPageLoad();
            }
        }
    });
    var gridStore = Ext.create('Ext.data.Store', {
        id : 'gridStore',
        pageSize : 15,
        autoLoad : false,
        fields : [ 'V_ORDERGUID', 'V_ORDERID', 'V_SHORT_TXT',
            'V_EQUIP_NO', 'V_EQUIP_NAME', 'V_EQUSITENAME',
            'V_SPARE', 'V_ORGNAME', 'V_DEPTNAME', 'V_PERSONNAME',
            'D_ENTER_DATE', 'V_DEPTNAMEREPARIR', 'V_ORDER_TYP_TXT',
            'V_STATENAME' ],

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
                total : 'total'
            }
        }
    });

    var gridWinStore = Ext.create('Ext.data.Store', {
        id: 'gridWinStore',
        pageSize: 20,
        autoLoad: false,
        fields: [
            'V_PERSONNAME',
            'I_ID',
            'V_ORDERID',
            'V_DBGUID',
            'V_FLOWSTEP',
            'I_STATUS',
            'V_PERCODE',
            'V_IDEA',
            'V_DATE',
            'V_TS',
            'V_FLOWTYPE',
            'V_FLOWCODE',
            'V_FLOWNAME',
            'V_URL',
            'V_FLOWSTEPCODE',
            'D_ENTER_DATE'
        ],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'basic/PRO_WO_FLOW_DATA_DETAIL_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        }
    });
    var tabpanel = Ext.create("Ext.tab.Panel", {
        id: 'tabpanel',
        region: 'center',
        activeTab: 0,
        listeners: {
            tabchange: function () {
                /*Ext.getCmp('gdh').hide();*/

                Ext.ComponentManager.get("tabid").setValue(Ext
                    .getCmp('tabpanel').getActiveTab().down("hidden")
                    .getValue());
                Ext.getCmp('page').store.currentPage = 1;
                gridStore.load({
                    params: {
                        V_D_ENTER_DATE_B : Ext.Date.format(Ext.ComponentManager .get("begintime").getValue(), 'Y-m-d'),
                        V_D_ENTER_DATE_E :  Ext.Date.format(Ext.ComponentManager .get("endtime").getValue(), 'Y-m-d'/*+ ' 23:59:59'*/),
                        V_V_ORGCODE :Ext.getCmp("ck").getValue() ,
                        V_V_DEPTCODE :Ext.getCmp("zyq").getValue() ,
                        V_V_DEPTCODEREPARIR : '',
                        V_V_STATECODE : Ext.getCmp("gdzt").getValue() ,
                        V_EQUTYPE_CODE :Ext.getCmp("sblx").getValue() ,
                        V_EQU_CODE :Ext.getCmp("sbmc").getValue() ,
                        V_DJ_PERCODE :Ext.getCmp("djy").getValue() ,
                        V_V_SHORT_TXT :Ext.getCmp("selshortTxt").getValue() ,
                        V_V_BJ_TXT :Ext.getCmp("selmatDesc").getValue() ,
                        V_V_ORDER_TYP : Ext.ComponentManager.get("tabid").getValue(),
                        V_V_PAGE: Ext.getCmp('page').store.currentPage,
                        V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
                    }
                });
            }
        }
    });


    var panel = Ext.create('Ext.panel.Panel', {
        id: 'panellow',
        region: 'north',
        layout: 'column',
        border:false,
        frame:true,
        defaults : {style : 'margin:5px 0px 5px 5px', labelAlign : 'right'},
        items: [
            //{
            //xtype: 'panel',region:'north', layout: 'column',border:false,
            //items: [
                {
                id : 'begintime',
                xtype : 'datefield',
                editable : false,
                format : 'Y/m/d',
                value : new Date(new Date().getFullYear() + '/'
                    + (new Date().getMonth() + 1) + '/' + 1),
                fieldLabel : '时间段选择',
                labelWidth : 80,
                baseCls : 'margin-bottom'
            },
                {
                    id : 'endtime',
                    xtype : 'datefield',
                    editable : false,
                    format : 'Y/m/d',
                    value : new Date(),
                    fieldLabel : '至',
                    labelWidth : 80
                },
                {
                    id : 'ck',
                    xtype : 'combo',
                    store : ckstore,
                    editable : false,
                    fieldLabel : '厂矿',
                    labelWidth : 80,
                    displayField : 'V_DEPTNAME',
                    valueField : 'V_DEPTCODE',
                    queryMode : 'local',
                    baseCls : 'margin-bottom',
                    listeners: {
                        change: function (field, newValue, oldValue) {
                            _ck_zyqload();
                            _zyq_sblx();
                            _zyq_sbmc();
                            _zyq_djy();

                        }
                    }
                },
                {
                    id : 'zyq',
                    xtype : 'combo',
                    store : zyqstore,
                    editable : false,
                    fieldLabel : '作业区',
                    labelWidth : 80,
                    displayField : 'V_DEPTNAME',
                    valueField : 'V_DEPTCODE',
                    queryMode : 'local',
                    baseCls : 'margin-bottom',
                    listeners: {
                        select: function (field, newValue, oldValue) {
                            // _zyq_jxdw();
                            _zyq_sblx();
                            _zyq_sbmc();
                            _zyq_djy();
                           // tabload();
                        }
                    }
                },
                {
                    id : 'gdzt',
                    xtype : 'combo',
                    store : [ [ '4', '已验收' ] ],
                    editable : false,
                    fieldLabel : '工单状态',
                    labelWidth : 80,
                    displayField : 'V_STATENAME',
                    valueField : 'V_STATECODE',
                    queryMode : 'local',
                    baseCls : 'margin-bottom'
                },
                {
                    id : 'sblx',
                    xtype : 'combo',
                    store : ssblx,
                    editable : false,
                    fieldLabel : '设备类型',
                    labelWidth : 80,
                    displayField : 'V_EQUTYPENAME',
                    valueField : 'V_EQUTYPECODE',
                    queryMode : 'local',
                    baseCls : 'margin-bottom',
                    listeners: {
                        select: function (field, newValue, oldValue) {
                            _zyq_sbmc();
                           // tabload();
                        }
                    }
                },
                {
                    id : 'sbmc',
                    xtype : 'combo',
                    store : ssbmc,
                    editable : false,
                    fieldLabel : '设备名称',
                    labelWidth : 80,
                    displayField : 'V_EQUNAME',
                    valueField : 'V_EQUCODE',
                    queryMode : 'local',
                    baseCls : 'margin-bottom',
                    listeners: {
                        select: function (field, newValue, oldValue) {
                            //tabload();
                        }
                    }
                },
                {
                    id : 'djy',
                    xtype : 'combo',
                    store : sdjy,
                    editable : false,
                    fieldLabel : '点检员',
                    labelWidth : 80,
                    displayField : 'V_PERSONNAME',
                    valueField : 'V_PERSONCODE',
                    queryMode : 'local',
                    baseCls : 'margin-bottom'
                },
                {
                    id : 'selshortTxt',
                    xtype : 'textfield',
                    width : 158,
                    margin:'5px 0px 5px 90px',
                    emptyText : '按工单描述模糊搜索'
                },
                {
                    id : 'selmatDesc',
                    xtype : 'textfield',
                    width : 158,
                    margin:'5px 0px 5px 90px',
                    emptyText : '按使用物料模糊搜索'
                },
                {
                    id : 'query',
                    xtype : 'button',
                    icon: imgpath + '/search.png',
                    text : '查询',
                    width : 80,
                    listeners: {click: QueryGrid}
                    /*handler : function() {
                        Ext.ComponentManager.get('tabpanel')
                            .removeAll();

                        addTab();
                    }*/
                }, {
                    xtype: 'hidden',
                    id: 'tabid'
                }
        //    ]
        //},
        //    tabpanel
        ]
    });


    var win = Ext.create('Ext.window.Window', {
        closeAction: 'show',
        closable: true,// 是否有关闭
        id: 'win',
        height: 300,
        width: 800,
        modal: true,
        frame: true,
        region: 'center',
        title: '查看流程',
        layout: 'fit',
        items: [
            {
                xtype: 'grid',
                id: 'grid1',
                store: gridWinStore,
                height: "100%",
                border: true,
                columnLines: true,
                region: 'center',
                width: '100%',
                columns: [

                    {
                        xtype: 'rownumberer',
                        width: 35,
                        text: '序号',
                        sortable: false
                    }, {
                        text: '流程步骤',
                        width: '23%',
                        dataIndex: 'V_FLOWSTEP',
                        align: 'center'
                    }, {
                        text: '操作人',
                        width: '23%',
                        dataIndex: 'V_PERSONNAME',
                        align: 'center'
                    }, {
                        text: '审批意见',
                        width: '23%',
                        dataIndex: 'V_IDEA',
                        align: 'center'
                    }, {
                        text: '审批时间',
                        width: '24%',
                        dataIndex: 'V_DATE',
                        align: 'center'
                    }

                ]
            }

        ]

    });

    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        store: gridStore,
        height: "90%",
        border: true,
        columnLines: true,
        region: 'center',
        width: '100%',
        columns: [
            {
                xtype: 'rownumberer',
                width: 35,
                text: '序号',
                sortable: false
            },{
                text : '退回',
                align : 'center',
                width : 45,
                renderer : function() {
                    return "<img src='../../images/gif/undo.png' style='cursor:pointer' onclick='BackClicked()' />";
                }
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
            },  {
                text : '备件消耗',
                dataIndex : 'V_SPARE',
                width : 300,
                align : 'center',
                renderer : left,
                renderer : CreateGridColumnTd
            },  {
                text : '委托单位',
                dataIndex : 'V_DEPTNAME',
                width : 150,
                align : 'center',
                renderer : left,
                renderer : CreateGridColumnTd
            },  {
                text : '委托人',
                dataIndex : 'V_PERSONNAME',
                width : 100,
                align : 'center',
                renderer : left
            },{
                text : '委托时间',
                dataIndex : 'D_ENTER_DATE',
                width : 140,
                align : 'center',
                renderer : left,
                renderer : CreateGridColumnTd
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
            }],
        listeners : {
            itemdblclick : itemClick
        },
        bbar: [{
            width: "100%",
            id: 'page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });
    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel,  {
            xtype: 'panel',
            region: 'center',
            id: 'testPanel',
            height: 40,
            frame: true,
            region: 'north',
            layout: 'border'
        }, grid]
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams.V_D_ENTER_DATE_B = Ext.Date.format(Ext.getCmp( "begintime").getValue(), 'Y-m-d');
        store.proxy.extraParams.V_D_ENTER_DATE_E = Ext.Date.format(Ext.getCmp( "endtime").getValue(), 'Y-m-d');
        store.proxy.extraParams.V_V_ORGCODE = Ext.getCmp( "ck").getValue();
        store.proxy.extraParams.V_V_DEPTCODE = Ext.getCmp( "zyq").getValue();
        store.proxy.extraParams.V_V_DEPTCODEREPARIR ='';
        store.proxy.extraParams.V_V_STATECODE = Ext.getCmp( "gdzt").getValue();
        store.proxy.extraParams.V_EQUTYPE_CODE = Ext.getCmp( "sblx").getValue();
        store.proxy.extraParams.V_EQU_CODE = Ext.getCmp( "sbmc").getValue();
        store.proxy.extraParams.V_DJ_PERCODE =Ext.getCmp( "djy").getValue();
        store.proxy.extraParams.V_V_SHORT_TXT = Ext.getCmp( "selshortTxt").getValue();
        store.proxy.extraParams.V_V_BJ_TXT = Ext.getCmp("selmatDesc").getValue();
        store.proxy.extraParams.V_V_ORDER_TYP = Ext.ComponentManager.get("tabid").getValue();
        store.proxy.extraParams.V_V_PAGE= Ext.getCmp('page').store.currentPage;
        store.proxy.extraParams.V_V_PAGESIZE= Ext.getCmp('page').store.pageSize;
    });

    OnPageLoad();
});


function OnPageLoad() {

   if(ckload && zyqload && sblxload && sbmcload && djyload && initload)
   {
       initload = false;
       Ext.ComponentManager.get('tabpanel').removeAll();
       Ext.Ajax.request({
           url: AppUrl + 'WorkOrder/PRO_PM_WORKTYPCOUNT_ADMIN',
           method: 'POST',
           async: false,
           params: {
               V_D_ENTER_DATE_B : Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(), 'Y-m-d'),
               V_D_ENTER_DATE_E:Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y-m-d'/*+ ' 23:59:59'*/),
               V_V_ORGCODE:Ext.ComponentManager.get("ck").getValue(),
               V_V_DEPTCODE:Ext.ComponentManager.get("zyq").getValue(),
               V_V_DEPTCODEREPARIR:'',
               V_V_STATECODE:   Ext.ComponentManager.get("gdzt").getValue(),
               V_EQUTYPE_CODE:    Ext.ComponentManager.get("sblx").getValue(),
               V_EQU_CODE:    Ext.ComponentManager.get("sbmc").getValue(),
               V_DJ_PERCODE:    Ext.ComponentManager.get("djy").getValue(),
               V_V_SHORT_TXT:   Ext.ComponentManager.get("selshortTxt").getValue(),
               V_V_BJ_TXT:   Ext.ComponentManager.get("selmatDesc").getValue()
           },
           success: function (ret) {
               var resp = Ext.JSON.decode(ret.responseText);

               resp = resp.list;

               for (i = 0; i < resp.length; i++) {
                   Ext.ComponentManager.get("tabpanel").add({
                       id :resp[i].ORDER_TYP,
                       title: resp[i].ORDER_TYP_TXT,
                       items: [{
                           xtype: 'hidden',
                           value: resp[i].ORDER_TYP
                       }]
                   });
               }
               Ext.ComponentManager.get("tabpanel").setActiveTab(checktabid);
           }
       });

   }




}

function tabload()
{
    Ext.ComponentManager.get('tabpanel').removeAll();
    Ext.Ajax.request({
        url: AppUrl + 'WorkOrder/PRO_PM_WORKTYPCOUNT_ADMIN',
        method: 'POST',
        async: false,
        params: {
            V_D_ENTER_DATE_B : Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(), 'Y-m-d'),
            V_D_ENTER_DATE_E:Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y-m-d'/*+ ' 23:59:59'*/),
            V_V_ORGCODE:Ext.ComponentManager.get("ck").getValue(),
            V_V_DEPTCODE:Ext.ComponentManager.get("zyq").getValue(),
            V_V_DEPTCODEREPARIR:'',
            V_V_STATECODE:   Ext.ComponentManager.get("gdzt").getValue(),
            V_EQUTYPE_CODE:    Ext.ComponentManager.get("sblx").getValue(),
            V_EQU_CODE:    Ext.ComponentManager.get("sbmc").getValue(),
            V_DJ_PERCODE:    Ext.ComponentManager.get("djy").getValue(),
            V_V_SHORT_TXT:   Ext.ComponentManager.get("selshortTxt").getValue(),
            V_V_BJ_TXT:   Ext.ComponentManager.get("selmatDesc").getValue()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);

            resp = resp.list;

            for (i = 0; i < resp.length; i++) {
                Ext.ComponentManager.get("tabpanel").add({
                    id :resp[i].ORDER_TYP,
                    title: resp[i].ORDER_TYP_TXT,
                    items: [{
                        xtype: 'hidden',
                        value: resp[i].ORDER_TYP
                    }]
                });
            }
            Ext.ComponentManager.get("tabpanel").setActiveTab(checktabid);
        }
    });
}
function dealWith(URL, V_ORDERID, V_DBGUID, V_ORDERGUID, V_FLOWSTEP,V_FLOWTYPE) {
    checktabid=parseInt(Ext.getCmp('tabpanel').getActiveTab().id.substring(8));
    var owidth = window.document.body.offsetWidth - 800;
    var oheight = window.document.body.offsetHeight - 200;
    if (V_FLOWTYPE=='WORK'){
        window.open(AppUrl +"page"+ URL+"?V_ORDERID="+V_ORDERID+"&V_DBGUID="+V_DBGUID+"&V_ORDERGUID="+V_ORDERGUID+"&V_FLOWSTEP="+V_FLOWSTEP ,
            "", 'height=' + 600 + ',width=' + 1000 + ',top=10px,left=10px,resizable=no');
    }else{
        window.open(AppUrl + "page" + URL + "?V_GUID=" + V_ORDERGUID + '&random=' + Math.random(),
            "", 'height=' + 600 + ',width=' + 1000 + ',top=10px,left=10px,resizable=no');
    }


}
function addEdit(id) {

    Ext.data.StoreManager.lookup('gridWinStore').load({
        params: {
            V_V_ORDERID: id,
            V_V_DEPTCODE: Ext.util.Cookies.get('v_deptcode')
        }
    });
    Ext.getCmp('win').show();
}

function QueryGrid() {
    //OnPageLoad();
    Ext.getCmp('page').store.currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore').load();
}
function rendererTime(value, metaData) {
    //return Ext.Date.format(value, 'Y-m-d');
    return value.split('.0')[0];
}

function _ck_zyqload() {
    var zyqstore = Ext.data.StoreManager.lookup('zyqstore');
    zyqstore.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
        'V_V_DEPTCODENEXT': '%',
        'V_V_DEPTTYPE': '主体作业区'
    };
    //matGroupSecondStore.currentPage = 1;
    zyqstore.load();

}

function _zyq_sblx() {
    var ssblx = Ext.data.StoreManager.lookup('ssblx');
    ssblx.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    ssblx.load();
}

function _zyq_sbmc() {
    var ssbmc = Ext.data.StoreManager.lookup('ssbmc');
    ssbmc.proxy.extraParams = {
        v_v_personcode: Ext.util.Cookies.get('v_personcode'),
        v_v_deptcodenext: Ext.getCmp('zyq').getValue(),
        v_v_equtypecode: Ext.getCmp('sblx').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    ssbmc.load();
    //Ext.getBody().unmask();//去除页面笼罩
}

function _zyq_djy() {
    var sdjy = Ext.data.StoreManager.lookup('sdjy');
    sdjy.proxy.extraParams = {
        V_V_DEPTCODE :Ext.getCmp("zyq").getValue(),
        V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
        V_V_ROLE: '01'
    };
    //matGroupSecondStore.currentPage = 1;
    sdjy.load();
    //Ext.getBody().unmask();//去除页面笼罩
}

function left(value, metaData) {
    metaData.style = "text-align:left";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    if(value == null)
    {
        value = "";

    }

    return '<div data-qtip="' + value + '" >' + value + '</div>';
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
        window.parent.append('411001', '检修工单验收明细', APP + '/page/No411001/Index'
            + Ext.util.Cookies.get('v_workcss') + '.html?V_GUID='
            + Ext.getStore("gridStore").getAt(index).get("V_ORDERGUID")
            + '');
    } catch (e) {
        var ret = window.showModalDialog(APP + "/page/No411001/Index"
            + Ext.util.Cookies.get('v_workcss') + ".html?V_GUID="
            + Ext.getStore("gridStore").getAt(index).get("V_ORDERGUID"),
            "", "dialogHeight:700px;dialogWidth:1100px");
    }

}

function BackClicked() {
    var guid = Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.V_ORDERGUID;
    Ext.Ajax.request({
        url : APP + '/ModelChange',
        async : false,
        method : 'POST',
        params : {
            parName : [ 'V_V_PERCODE', 'V_V_PERNAME', 'V_V_ORDERGUID' ],
            parType : [ 's', 's', 's' ],
            parVal : [ Ext.util.Cookies.get('v_personcode'),
                Ext.util.Cookies.get('v_personname2'), guid ],
            proName : 'PRO_PM_WORKORDER_YS_BACK',
            returnStr : [ 'V_CURSOR' ],
            returnStrType : [ 's' ]
        },
        success : function(resp) {
            var resp = Ext.JSON.decode(resp.responseText);
            if (resp == '成功') {
                Ext.ComponentManager.get('tabpanel').removeAll();
                addTab();
                Ext.Ajax.request({
                    url : APP + 'mm/SetMatService',
                    type : 'post',
                    async : false,
                    data : {
                        V_V_ORDERGUID : guid
                    }
                });
                // 聚进接口
                otherServer(guid, "OPEN", "成功");
                // 小神探接口
                xstServer(guid, "OPEN", "成功");
            } else {
                Ext.example.msg('操作信息', resp);
            }
        }
    });
}

function QueryGrid() {
    //OnPageLoad();
    tabload();
    Ext.getCmp('page').store.currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore').load();
}