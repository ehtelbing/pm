var tabtool=true;
var querytool=true;
Ext.onReady(function() {

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['I_ID',
            'VCH_TICKET_NUMBER',
            'VCH_EQUMENTCODE',
            'I_EQU_NUMBER_JH',
            'I_CHECK_NUMBER_JH',
            'I_EQU_NUMBER_SJ',
            'I_CHECK_NUMBER_SJ',
            'VCH_JCFF',
            'VCH_YS',
            'VCH_SETNAME',
            'I_YEAR',
            'I_MONTH',
            'XL_PERSON',
            'CK_PERSON',
            'XC_PERSON',
            'DATETIME_BE_JH',
            'DATETIME_EN_JH',
            'DATETIME_BE_SJ',
            'DATETIME_EN_SJ',
            'VCH_MEMO',
            'MAIN_ID',
            'VCH_TYPE',
            'VCH_EQU_NAME',
            'I_STATUS',
            'EQUIPMENT_TYPE',
            'VCH_DEPARTNAME',
            'VCH_STATENAME',
            'VCH_GUID',
            'VCH_SETCODE',
            'VCH_DEPARTNAME_NEXT',
            'VCH_DEPARTCODE_NEXT',
            'D_SIGNDATE',
            'V_RESULT',
            'V_CONTENT',
            'I_INTERFACE',
            'I_EQUID',
            'ID_',
            'CREATETIME_',
            'RN'],

        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'cjy/PRO_JMDJ_VIEW_DATA_WORD_ITEM',
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
                {id : 'query',xtype : 'button', icon : '../../images/gif/search.png',text : '查询', width : 80,listeners: {click: QueryGrid}}]
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
            text : '工作票号',
            dataIndex : 'VCH_TICKET_NUMBER',
            width : 100,
            align : 'center',
            renderer : left
        }, {
            text : '单位',
            dataIndex : 'VCH_DEPARTNAME',
            width : 100,
            align : 'center',
            renderer : left
        },  {
            text : '作业区名称',
            dataIndex : 'VCH_DEPARTNAME_NEXT',
            width : 100,
            align : 'center',
            renderer : left
        }, {
            text : '设备名称',
            dataIndex : 'VCH_EQU_NAME',
            width : 100,
            align : 'center',
            renderer : left
        }, {
            text : '检测方法',
            dataIndex : 'VCH_JCFF',
            width : 100,
            align : 'center',
            renderer : left
        }, {
            text : '检测结果',
            dataIndex : 'V_RESULT',
            width : 130,
            align : 'center',
            renderer : left
        }, {
            text : '结果描述',
            dataIndex : 'V_CONTENT',
            width : 220,
            align : 'center',
            renderer : left
        }, {
            text : '现场验收',
            dataIndex : 'VCH_YS',
            width : 100,
            align : 'center',
            renderer : left
        }, {
            text : '检修协力故障诊断工程师',
            dataIndex : 'XL_PERSON',
            width : 160,
            align : 'center',
            renderer : left
        }, {
            text : '主体单位精密点检负责人',
            dataIndex : 'CK_PERSON',
            width : 160,
            align : 'center',
            renderer : left
        }, {
            text : '精密点检现场协同人员',
            dataIndex : 'XC_PERSON',
            width : 160,
            align : 'center',
            renderer : left
        }, {
            text : '开始检测时间',
            dataIndex : 'DATETIME_BE_SJ',
            width : 150,
            align : 'center',
            renderer : left
        }, {
            text : '结束检测时间',
            dataIndex : 'DATETIME_EN_SJ',
            width : 150,
            align : 'center',
            renderer : left
        }, {
            text : '状态',
            dataIndex : 'VCH_STATENAME',
            width : 65,
            align : 'center',
            renderer : left
        } ],
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    Ext.QuickTips.init();
    Ext.create('Ext.container.Viewport', {
        id : "id",
        layout : 'border',
        items : [panel,grid]
    });

    Ext.data.StoreManager.lookup('ckstore').on("load", function() {
        Ext.data.StoreManager.lookup('ckstore').insert(0,{V_DEPTNAME:'全部',V_DEPTCODE:'%'});
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

        Ext.data.StoreManager.lookup('zyqstore').insert(0,{V_DEPTNAME:'全部',V_DEPTCODE:'%'});
        Ext.getCmp("zyq").select(Ext.data.StoreManager.lookup('zyqstore').getAt(0));

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

      Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_D_ENTER_DATE_B: Ext.Date.format(Ext.getCmp("begintime").getValue(), 'Y-m-d'),
            V_D_ENTER_DATE_E: Ext.Date.format(Ext.getCmp("endtime").getValue(), 'Y-m-d'),
            V_V_ORGNAME: Ext.getCmp("ck").getRawValue() == '全部' ? '%' : Ext.getCmp("ck").getRawValue(),
            V_V_DEPTCODE: Ext.getCmp("zyq").getValue(),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    });
});

function QueryGrid() {

    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        V_D_ENTER_DATE_B:  Ext.Date.format(Ext.getCmp( "begintime").getValue(), 'Y-m-d'),
        V_D_ENTER_DATE_E :Ext.Date.format(Ext.getCmp( "endtime").getValue(), 'Y-m-d'),
        V_V_ORGNAME:Ext.getCmp("ck").getRawValue()=='全部'?'%':Ext.getCmp("ck").getRawValue(),
        V_V_DEPTCODE: Ext.getCmp( "zyq").getValue(),
        V_V_PAGE: Ext.getCmp('page').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('page').store.pageSize

    };
    gridStore.currentPage = 1;
    gridStore.load();

}
function rendererZGD(a, value, metaData){
    return '<a href="javascript:goToZGD(\'' + metaData.data.V_ORDERGUID + '\')">' + a + '</a>';
}
function goToZGD(V_ORDERGUID){
    window.open(AppUrl + "page/No4117/Index.html?V_ORDERGUID="
        + V_ORDERGUID,
        "", "dialogHeight:700px;dialogWidth:1100px");

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
