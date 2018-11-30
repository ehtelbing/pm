// 厂矿

var ckstore=Ext.create("Ext.data.Store", {
    storeId: 'ckstore',
    autoLoad: true,
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
            'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
            'V_V_DEPTCODENEXT': '%',
            'V_V_DEPTTYPE': '基层单位'
        }
    }
});

//作业区
var zyqstore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'zyqstore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
//设备类型
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
//设备名称
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
// griddata
var gridStore = Ext.create('Ext.data.Store', {
    id : 'gridStore',
    pageSize : 15,
    autoLoad : false,
    fields : [ 'V_MATERIALCODE', 'V_MATERIALNAME', 'V_SPEC', 'V_UNIT',
        'F_NUMBER', 'V_XGGD','D_FACT_FINISH_DATE'],
    proxy : {
        type : 'ajax',
        async : false,
        url : AppUrl + 'dxfile/PRO_SPARE_SELECT2',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list',
            total : 'total'
        }
    }
    //  listeners: { beforeload: OnGridBeforeLoad}
});
var date=new Date();
var starttime=new Date(date.getFullYear() + '-'+ (date.getMonth() + 1) + '-' + 1);
// 查询选项panel
var panel = Ext.create('Ext.form.Panel', {
    id : 'panellow',
    style : 'margin:5px 0px 2px 2px',
    region : 'north',
    width : '100%',
    baseCls : 'my-panel-no-border',
    defaults : {
        style : 'margin:5px 0px 5px 10px',
        labelAlign : 'right'
    },
    layout : {
        type : 'column'
    },
    items : [
        {id : 'begintime',xtype : 'datefield',editable : false,format : 'Y-m-d',value: starttime,
            fieldLabel : '更换时间',labelWidth : 60},//baseCls : 'margin-bottom'},
        {id : 'endtime',xtype : 'datefield',editable : false,format : 'Y-m-d',value : new Date(),fieldLabel : '至',labelWidth : '15px'},
        {id : 'ck',xtype : 'combo',store : ckstore,editable : false,fieldLabel : '厂矿',labelWidth : 65,
            displayField : 'V_DEPTNAME',valueField : 'V_DEPTCODE',queryMode : 'local',baseCls : 'margin-bottom'},
        {id : 'zyq',xtype : 'combo',store : zyqstore,editable : false,fieldLabel : '作业区',labelWidth : 65,
            displayField : 'V_DEPTNAME',valueField : 'V_DEPTCODE',queryMode : 'local',baseCls : 'margin-bottom'},
        {id : 'sblx',xtype : 'combo',store : ssblx,editable : false,fieldLabel : '设备类型',labelWidth : 65,
            displayField : 'V_EQUTYPENAME',valueField : 'V_EQUTYPECODE',queryMode : 'local',baseCls : 'margin-bottom'},
        {id : 'sbmc',xtype : 'combo',store : ssbmc,editable : false,fieldLabel : '设备名称',labelWidth : 65,
            displayField : 'V_EQUNAME',valueField : 'V_EQUCODE',queryMode : 'local',baseCls : 'margin-bottom'},
        {id:'bjmc',xtype:'textfield',width:150,emptyText:'备件名称模糊搜索'},
        {id : 'query',xtype : 'button',icon : '../../images/gif/search.png',style : ' margin: 5px 0px 0px 10px',
            text : '查询',width : 80,handler : query
        },
        {id:'downexcel',xtype:'button',style:'margin:5px 0px 0px 10px',text:'导出Excel',width:80,listeners: { click: OnDownExcelButtonClicked }}]
});

Ext.onReady(function(){
    var grid = Ext.create('Ext.grid.Panel', {
        id : 'grid',
        columnLines : true,
        width : '100%',
        store : gridStore,
        region:'center',
        autoScroll : true,
        height : 400,
        columns : [{xtype : 'rownumberer',width : 30,sortable : false},
            {text : '物料编码',dataIndex : 'V_MATERIALCODE',width:150,align : 'center',renderer : left},
            {text : '物料名称',dataIndex : 'V_MATERIALNAME',width:300,align : 'center',renderer : left},
            {text : '规格型号',dataIndex : 'V_SPEC',width:130,align : 'center',renderer : left},
            {text : '计量单位',dataIndex : 'V_UNIT',width:100,align : 'center',renderer : left},
            {text : '数量',dataIndex : 'F_NUMBER',width:100,align : 'center',renderer : left},
            {text : '物料更换时间',dataIndex : 'D_FACT_FINISH_DATE',width:160,align : 'center',renderer : left},
            {text : '查看相关工单',dataIndex : 'V_XGGD',id:'xggd',width:100,align : 'center',renderer : center}
        ],
        bbar:[{xtype : 'pagingtoolbar',
            dock : 'bottom',
            id : 'page',
            displayInfo : true,
            displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg : '没有记录',
            store : 'gridStore'}]
    });
    Ext.create('Ext.container.Viewport', {
        id : "id",
        layout : 'border',
        items : [ panel,grid]
    });



//加载作业区
    Ext.data.StoreManager.lookup('ckstore').on('load', function () {
        Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckstore').getAt(0));
        Ext.data.StoreManager.lookup('zyqstore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });
// 厂矿选择时加载
    Ext.getCmp('ck').on('select', function () {
        Ext.data.StoreManager.lookup('zyqstore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });

// 加载设备类型
    Ext.data.StoreManager.lookup('zyqstore').on('load', function () {
        Ext.getCmp("zyq").select(Ext.data.StoreManager.lookup('zyqstore').getAt(0));
        Ext.data.StoreManager.lookup('ssblx').load({
            params : {
                V_V_DEPTCODENEXT:Ext.getCmp("zyq").getValue()
            }
        });
    });
//作业区选择时加载
    Ext.getCmp('zyq').on('select',function(){
        Ext.data.StoreManager.lookup('ssblx').load({
            params:{
                V_V_DEPTCODENEXT:Ext.getCmp("zyq").getValue()
            }
        })
    });
//设备类型加载
    Ext.data.StoreManager.lookup('ssblx').on('load', function() {
        Ext.getCmp("sblx").select(Ext.data.StoreManager.lookup('ssblx').getAt(0));
        Ext.data.StoreManager.lookup('ssbmc').load({
            params : {
                V_V_DEPTCODENEXT :Ext.getCmp("zyq").getValue(),
                V_V_EQUTYPECODE : Ext.getCmp("sblx").getValue()
            }
        });

    });
//设备名称加载
    Ext.data.StoreManager.lookup('ssbmc').on('load', function() {
        Ext.getCmp("sbmc").select(Ext.data.StoreManager.lookup('ssbmc').getAt(0));
        query;
    });

});

function query() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params:{
            V_D_ENTER_DATE_B:Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(),'Y-m-d'),
            V_D_ENTER_DATE_E:Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(),'Y-m-d'),
            V_V_DEPTCODE:Ext.getCmp('ck').getValue(),
            V_V_DEPTNEXTCODE:Ext.getCmp('zyq').getValue(),
            V_EQUTYPE_CODE:Ext.getCmp('sblx').getValue(),
            V_EQU_CODE:Ext.getCmp('sbmc').getValue(),
            V_V_SPARE:Ext.getCmp('bjmc').getValue()
        }
    });
}


function OnDownExcelButtonClicked(){
    var nzyq=Ext.getCmp('zyq').getValue()=='%'?"all":Ext.getCmp('zyq').getValue();
    var nsblx=Ext.getCmp('sblx').getValue()=='%'?"all":Ext.getCmp('sblx').getValue();
    var nsbmc=Ext.getCmp('sbmc').getValue()=='%'?"all":Ext.getCmp('sbmc').getValue();
    var nbjmc=Ext.getCmp('bjmc').getValue()==''?"k":Ext.getCmp('bjmc').getValue();
    document.location.href=AppUrl + 'dxfile/SPARESEL_EXCEL?V_D_ENTER_DATE_B='+ Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(),'Y-m-d')+
        '&V_D_ENTER_DATE_E='+Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(),'Y-m-d')+
        '&V_V_DEPTCODE='+Ext.getCmp('ck').getValue()+
        '&V_V_DEPTNEXTCODE='+nzyq+
        '&V_EQUTYPE_CODE='+nsblx+
        '&V_EQU_CODE='+nsbmc+
        '&V_V_SPARE='+nbjmc;

}
function left(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;"; return value;
}

function center(value, metaData, record, rowIndex, colIndex, store){
    metaData.style = "text-align:center;";
    return '<a href="#" onclick="searchMore()">'+value+'</a>';
}

function searchMore(){
    var asd = Ext.getCmp('grid').getSelectionModel().getSelection()[0].data;
    var a = Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(),'Y-m-d');
    var b = Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(),'Y-m-d');
    var c = Ext.getCmp('ck').getValue();
    var d = Ext.getCmp('zyq').getValue() == '%' ? 'ALL' : Ext.getCmp('zyq').getValue();
    var e = Ext.getCmp('sblx').getValue() == '%' ? 'ALL' : Ext.getCmp('sblx').getValue();
    var f = Ext.getCmp('sbmc').getValue() == '%' ? 'ALL' : Ext.getCmp('sbmc').getValue();
    var g = Ext.getCmp('bjmc').getValue() == '' ? 'K' : Ext.getCmp('bjmc').getValue();
    var h = asd.V_MATERIALCODE;
    var i = asd.V_MATERIALNAME;
    window.open(AppUrl + '/No810501/Index.html?V_D_ENTER_DATE_B=' + a + '&V_D_ENTER_DATE_E=' + b + '&V_V_DEPTCODE=' + c + '&V_V_DEPTNEXTCODE=' + d + '&V_EQUTYPE_CODE=' + e +'&V_EQU_CODE=' + f + '&V_V_SPARE=' + g + '&V_V_MATERIALCODE=' + h + '&V_V_MATERIALNAME=' + i);
}
