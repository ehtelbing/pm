var tabtool=true;
var querytool=true;
var selectID = [];

var usercode='';

if (location.href.split('?')[1] != undefined) {
    usercode = Ext.urlDecode(location.href.split('?')[1]).usercode;
}

if(usercode!=''){
    OnPageMMLogin();
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

    var sdjy = Ext.create('Ext.data.Store', {
        autoLoad : false,
        storeId : 'sdjy',
        fields : [ 'V_PERSONCODE', 'V_PERSONNAME' ],
        proxy : {
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
        items : [{id : 'begintime',xtype : 'datefield',editable : false,format : 'Y/m/d',value : new Date(new Date().getFullYear() + '/'+ (new Date().getMonth() + 1) + '/' + 1),fieldLabel : '时间段选择',labelWidth : 80, baseCls : 'margin-bottom'},
                 { id : 'endtime',xtype : 'datefield',editable : false,format : 'Y/m/d',value : new Date(),fieldLabel : '至',labelWidth : 80},
                 {id : 'ck',xtype : 'combo',store : ckstore,editable : false,fieldLabel : '厂矿',labelWidth : 80,displayField : 'V_DEPTNAME', valueField : 'V_DEPTCODE',queryMode : 'local', baseCls : 'margin-bottom' },
                 {id : 'zyq',xtype : 'combo',store : zyqstore,editable : false,fieldLabel : '作业区',labelWidth : 80, displayField : 'V_DEPTNAME',valueField : 'V_DEPTCODE',queryMode : 'local', baseCls : 'margin-bottom'},
                 {id : 'gdzt',xtype : 'combo',store : sgdzt,editable : false, fieldLabel : '工单状态',labelWidth : 80,displayField : 'V_STATENAME', valueField : 'V_STATECODE', queryMode : 'local', baseCls : 'margin-bottom'},
                 {id : 'sblx',xtype : 'combo', store : ssblx,editable : false,fieldLabel : '设备类型', labelWidth : 80,displayField : 'V_EQUTYPENAME',valueField : 'V_EQUTYPECODE',queryMode : 'local', baseCls : 'margin-bottom'},
                 {id : 'sbmc',xtype : 'combo', store : ssbmc,editable : false,fieldLabel : '设备名称', labelWidth : 80,displayField : 'V_EQUNAME',valueField : 'V_EQUCODE',queryMode : 'local',listConfig:{
                         minWidth:400
                     }, baseCls : 'margin-bottom'},
                 {id : 'djy',xtype : 'combo', store : sdjy,editable : false,fieldLabel : '点检员', labelWidth : 80,displayField : 'V_PERSONNAME',valueField : 'V_PERSONCODE',queryMode : 'local', baseCls : 'margin-bottom'},
                {id : 'selshortTxt',xtype : 'textfield', width : 158,emptyText : '按工单描述模糊搜索',margin:'5px 0px 5px 90px'},
                {id : 'selmatDesc',xtype : 'textfield', width : 158,emptyText : '按使用物料模糊搜索',margin:'5px 0px 5px 90px'},
                {id : 'query',xtype : 'button', icon : '../../images/gif/search.png',text : '查询', width : 80,listeners: {click: QueryGrid}}
                // { xtype : 'button',text : '导出excel',icon : '../../images/gif/grid.png',width : 85, listeners : { click : OnClickExcelButton}}

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
            text : '流程明细',
            dataIndex : 'V_ORDERGUID',
            width : 100,
            align : 'center',
            renderer : left,
            renderer : rendererFlow
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
        },{
            text: '关联事故',
            dataIndex: 'V_ORDERGUID',
            align: 'center',
            width: 100,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {

                return '<a href="#" onclick="_preViewFault(\'' +record.data.V_ORGCODE+ '\',\''+record.data.V_DEPTCODE+'\',\''+record.data.V_ORDERGUID+'\')">关联事故</a>';
            }
        } ],
        // listeners : {
        //     itemdblclick : itemClick
        // },
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
        items : [panel,grid]//{xtype:'panel',id:'testPanel',region:'north',height:40},
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

        /*Ext.ComponentManager.get('zyq').store.insert(0, {
            'V_DEPTCODE' : '%',
            'V_DEPTNAME' : '全部'
        });*/
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
        Ext.data.StoreManager.lookup('sdjy').load({
            params : {
                V_V_DEPTCODE :Ext.getCmp("zyq").getValue(),
                V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                V_V_ROLE: '01'
            }
        });
    });

    Ext.data.StoreManager.lookup('sdjy').on('load', function() {
        // Ext.ComponentManager.get("sdjy").store.insert(0,{
        //     'V_PERSONCODE':'%',
        //     'V_PERSONNAME':'全部'
        // });
        var lan=Ext.getStore('sdjy').data.length-1;
        Ext.getCmp('djy').select(Ext.data.StoreManager.lookup('sdjy').getAt(lan));
        Ext.data.StoreManager.lookup('sgdzt').load({});
    });

    Ext.data.StoreManager.lookup('sgdzt').on("load", function() {
        Ext.ComponentManager.get('gdzt').store.insert(0, {
            'V_STATECODE' : '%',
            'V_STATENAME' : '全部'
        });
        Ext.getCmp("gdzt").select(Ext.data.StoreManager.lookup('sgdzt').getAt(0));
        // Ext.getCmp("testPanel").add(tabpanel);
        // if(tabtool){
        //     addTab();
        // }

    });

    Ext.getCmp("ck").on("select",function() {
        tabtool=false;
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
        tabtool=false;
        Ext.getCmp('sblx').getStore().removeAll();
        Ext.getCmp('djy').getStore().removeAll();
        Ext.data.StoreManager.lookup('ssblx').load({
                params : {
                    V_V_DEPTCODENEXT : Ext.getCmp("zyq").getValue()
                }
            });

        Ext.data.StoreManager.lookup('sdjy').load({
                params : {
                    V_V_DEPTCODE : Ext.getCmp("zyq").getValue(),
                    V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                    V_V_ROLE :'01'
                }
            });
        });

    Ext.getCmp('sblx').on( 'select',function() {
        tabtool=false;
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
            store.proxy.extraParams.V_V_STATECODE = Ext.getCmp( "gdzt").getValue();
            store.proxy.extraParams.V_EQUTYPE_CODE = Ext.getCmp( "sblx").getValue();
            store.proxy.extraParams.V_EQU_CODE = Ext.getCmp( "sbmc").getValue();
            store.proxy.extraParams.V_DJ_PERCODE =Ext.getCmp( "djy").getValue();
            store.proxy.extraParams.V_V_SHORT_TXT = Ext.getCmp( "selshortTxt").getValue();
            store.proxy.extraParams.V_V_BJ_TXT = Ext.getCmp("selmatDesc").getValue();
            store.proxy.extraParams.V_V_ORDER_TYP = 'AK06';
            store.proxy.extraParams.V_V_PAGE= Ext.getCmp('page').store.currentPage;
            store.proxy.extraParams.V_V_PAGESIZE= Ext.getCmp('page').store.pageSize;
        });
    //addTab();
});

function QueryGrid() {
    Ext.getCmp('page').store.currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore').load();
}
function rendererZGD(a, value, metaData){
    return '<a href="javascript:goToZGD(\'' + metaData.data.V_ORDERGUID + '\')">' + a + '</a>';
}


function goToZGD(V_ORDERGUID){
    window.open(AppUrl + "page/No4117/Index.html?V_ORDERGUID="
        + V_ORDERGUID,
        "", "dialogHeight:700px;dialogWidth:1100px");
}

function rendererFlow(a, value, metaData){
    return '<a href="javascript:goToFlow(\'' + metaData.data.V_ORDERGUID + '\')">查看</a>';
}

function goToFlow(V_ORDERGUID){
    var InstanceId='';
    Ext.Ajax.request({
        url : AppUrl + 'Activiti/GetActivitiStepFromBusinessId',
        async : false,
        method : 'POST',
        params : {
            businessKey : V_ORDERGUID
        },
        success : function(ret) {
            var respRoot = Ext.JSON.decode(ret.responseText);
            InstanceId=respRoot.InstanceId;
        }
    });
    var owidth = window.screen.availWidth;
    var oheight = window.screen.availHeight - 50;
    window.open(AppUrl + 'page/PM_210301/index.html?ProcessInstanceId='+ InstanceId , '', 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes');

}

function OnClickExcelButton(){
    document.location.href=AppUrl + 'excel/GDCX_EXCEL2?V_D_ENTER_DATE_B='+Ext.Date.format(Ext.getCmp( "begintime").getValue(), 'Y-m-d')+
        '&V_D_DEFECTDATE_E='+Ext.Date.format(Ext.getCmp( "endtime").getValue(), 'Y-m-d')+
        '&V_V_ORGCODE='+Ext.ComponentManager.get("ck").getValue()+
        '&V_V_DEPTCODE='+encodeURI(Ext.ComponentManager.get("zyq").getValue())+
        '&V_V_DEPTCODEREPARIR='+ ''+
        '&V_V_STATECODE='+encodeURI(Ext.ComponentManager.get("gdzt").getValue())+
        '&V_EQUTYPE_CODE='+encodeURI(Ext.ComponentManager.get("sblx").getValue())+
        '&V_EQU_CODE='+encodeURI(Ext.ComponentManager.get("sbmc").getValue())+
        '&V_DJ_PERCODE='+ encodeURI(Ext.ComponentManager.get("djy").getValue())+
        '&V_V_SHORT_TXT='+ Ext.ComponentManager.get("selshortTxt").getValue()+
        '&V_V_BJ_TXT='+Ext.ComponentManager.get("selmatDesc").getValue()+
        '&V_V_ORDER_TYP='+Ext.getCmp('tabpanel').getActiveTab().id
        /*+'&V_V_PAGE='+ Ext.getCmp('page').store.currentPage+
        '&V_V_PAGESIZE='+ Ext.getCmp('page').store.pageSize*/;
}

function addTab(){
    Ext.ComponentManager.get('tabpanel').removeAll();
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
                V_V_STATECODE:   Ext.ComponentManager.get("gdzt").getValue(),
                V_EQUTYPE_CODE:    Ext.ComponentManager.get("sblx").getValue(),
                V_EQU_CODE:    Ext.ComponentManager.get("sbmc").getValue(),
                V_DJ_PERCODE:    Ext.ComponentManager.get("djy").getValue(),
                V_V_SHORT_TXT:   Ext.ComponentManager.get("selshortTxt").getValue(),
                V_V_BJ_TXT:   Ext.ComponentManager.get("selmatDesc").getValue()
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



function _preViewFault(V_ORGCODE,V_DEPTCODE,V_ORDERGUID) {
    window.open(AppUrl + "page/No4124/fault.html?V_V_ORGCODE="+V_ORGCODE+'&V_V_DEPTCODE='+V_DEPTCODE+'&V_V_ORDERGUID='+V_ORDERGUID, '', "dialogHeight:500px;dialogWidth:900px");
}