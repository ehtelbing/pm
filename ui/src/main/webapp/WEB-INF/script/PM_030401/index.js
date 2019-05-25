
var yearList=[];
var monthList=[];
var date=new Date();
var nowDate=date.getFullYear();
var nowMonth=date.getMonth();
for(var i=nowDate+1;i<nowDate-2;i--){
    yearList.push({id:i,value:i});
}
for(var m=1;m<12;m++){
    monthList.push({id:m,value:m});
}
var yearStore=Ext.create('Ext.data.Store',{
    id:'yearStore',
    fields:['id','value'],
    data:yearList,
    proxy:{
        type:'memory',
        reader:{type:'json'}
    }
});
var monthStore=Ext.create('Ext.data.Store',{
    id:'monthStore',
    fields:['id','value'],
    data:monthList,
    proxy:{
        type:'memory',
        reader:{type:'json'}
    }
});
Ext.onReady(function(){
    Ext.QuickTips.init();
    Ext.getBody().mask('<p>页面加载中...</p>');
    //厂矿计划数据加载
    var ckStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'ckStore',
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

    //作业区加载
    var zyqStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyqStore',
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
    //专业
    var zyStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyStore',
        fields: ['V_GUID', 'V_ZYMC','V_ZYJC','V_LX','V_ORDER'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_03/PM_03_PLAN_ZY_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    //下一步审批人
    var fzPerStore=  Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'fzPerStore',
        fields: ['V_PERSONCODE', 'V_PERSONNAME', 'V_V_NEXT_SETP', 'V_V_FLOW_STEPNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PM_ACTIVITI_PROCESS_PER_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        },
        listeners: {
            load: function (store, records, success, eOpts) {
                if( store.getAt(0)==undefined){
                    Ext.getCmp('fzPer').select(''); return;
                }else{
                    processKey = store.getProxy().getReader().rawData.RET;
                    V_STEPNAME = store.getAt(0).data.V_V_FLOW_STEPNAME;
                    V_NEXT_SETP = store.getAt(0).data.V_V_NEXT_SETP;
                    Ext.getCmp('fzPer').select(store.first());
                }

            }

        }
    });
    //表格信息加载
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 50,
        autoLoad: false,
        fields: ['I_ID','V_GUID','V_GUID_UP','V_YEAR','V_MONTH','V_ORGCODE','V_ORGNAME',
            'V_DEPTCODE','V_DEPTNAME','V_PORJECT_CODE','V_PORJECT_NAME','V_SPECIALTY','V_SPECIALTYNAME',
            'V_SPECIALTYMANCODE','V_SPECIALTYMAN','V_WXTYPECODE','V_WXTYPENAME','V_CONTENT','V_MONEYBUDGET',
            'V_REPAIRDEPTCODE','V_BDATE','V_EDATE','V_STATE','V_FLAG','V_INMAN','V_INMANCODE','V_INDATE','V_STATENAME','V_QSTEXT'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PRO_PM_03_PLAN_YEAR_VIEW_E',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        },
        listeners: {
            beforeload: beforeloadStore
        }
    });
    var toolPanel=Ext.create('Ext.panel.Panel',{
        id:'toolPanel',
        frame:true,
        border:false,
        defaults:{margin:'5 5 0 5',labelAlign:'right'},
        region:'north',
        layout:'column',
        items:[
            {
                id: 'year',
                store:yearStore,
                xtype: 'combo',
                fieldLabel: '年份',
                value: nowDate+1,
                labelWidth: 80,
                width: 250,
                labelAlign: 'right',
                editable: false,
                displayField: 'id',
                valueField: 'value'
            },{
                xtype: 'combo',
                id: "ck",
                store: ckStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '计划厂矿',
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                labelWidth: 80,
                width: 250
            }
            , {
                xtype: 'combo',
                id: "zyq",
                store: zyqStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '作业区',
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                labelWidth: 80,
                width: 250
            }
            , {
                xtype: 'combo',
                id: "zy",
                store: zyStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '专业',
                displayField: 'V_ZYMC',
                valueField: 'V_GUID',
                labelWidth: 80,
                width: 250
            }, {
                xtype: 'textfield',
                id: "gcqs",
                editable: false,
                queryMode: 'local',
                fieldLabel: '工程请示内容',
                labelWidth: 80,
                width: 250
            }, {
                xtype : 'combo',
                id:'fzPer',
                store:fzPerStore,
                editable : false,
                queryMode : 'local',
                fieldLabel : '下一步审批人',
                displayField: 'V_PERSONNAME',
                valueField: 'V_PERSONCODE',
                labelWidth :80,
                width:170,
                labelAlign : 'right'
            },{
                xtype: 'button',
                text: '查询',
                style: ' margin: 5px 0px 0px 10px',
                icon: imgpath + '/search.png',
                listeners: {click: OnButtonQuery}
            },{
                xtype: 'button',
                text: '新增工程项目',
                icon: imgpath + '/add.png',
                listeners: {click: OnButtonAdd}
            },
            {
                xtype: 'button',
                text: '编辑',
                icon: imgpath + '/edit.png',
                listeners: {click: OnButtonEdit}
            },
            {
                xtype: 'button',
                text: '删除工程项目',
                icon: imgpath + '/delete.png',
                listeners: {click: OnButtonDel}
            },
            {
                xtype: 'button',
                text: '导出',
                icon: imgpath + '/accordion_collapse.png',
                listeners: {click: OnButtonOut}
            },
            {
                xtype: 'button',
                text: '上报',
                icon: imgpath + '/accordion_collapse.png',
                id:'startFlow',
                handler:btnFlowStart
            }
            ,{
                xtype: 'button',
                text: '查看详情',
                icon: imgpath + '/accordion_collapse.png',
                id:'viewBtn',
                handler:btnView
            }
        ]
    });

    var mainpanel=Ext.create('Ext.grid.Panel',{
        id:'mainpanel',
        frame:true,
        border:false,
        columnLines:true,
        store:gridStore,
        region:'center',
        selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text: '工程状态', width: 140, dataIndex: 'V_STATENAME', align: 'center', renderer: atleft},
            {text: '工程编码', width: 200, dataIndex: 'V_PORJECT_CODE', align: 'center', renderer: atleft},
            {text: '工程名称', width: 200, dataIndex: 'V_PORJECT_NAME', align: 'center', renderer: atleft},
            {text: '专业', width: 100, dataIndex: 'V_SPECIALTYNAME', align: 'center', renderer: atleft},
            {text: '工程请示内容', width: 300, dataIndex: 'V_QSTEXT', align: 'center', renderer: atleft},
            {text: '开工时间', width: 140, dataIndex: 'V_BDATE', align: 'center', renderer: timelfet},
            {text: '竣工时间', width: 140, dataIndex: 'V_EDATE', align: 'center', renderer: timelfet},
            {text:'缺陷详情',width:140,dataIndex:'V_GUID',align:'center',renderer:OperaTion}
        ],
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
    Ext.create('Ext.container.Viewport',{
        id:'main',
        layout:'border',
        items:[toolPanel,mainpanel]
    });


    pageLoad();


});
function beforeloadStore(store) {
    store.proxy.extraParams.V_V_YEAR =Ext.getCmp('year').getValue();
    store.proxy.extraParams.V_V_ORGCODE = Ext.getCmp('ck').getValue();
    store.proxy.extraParams.V_V_DEPTCODE = ""; //Ext.getCmp('zyq').getValue();
    store.proxy.extraParams.V_V_ZY =  Ext.getCmp('zy').getValue();
    store.proxy.extraParams.V_V_QSTEXT = Ext.getCmp('gcqs').getValue();
    store.proxy.extraParams.V_V_PAGE =Ext.getCmp('page').store.currentPage;
    store.proxy.extraParams.V_V_PAGESIZE = Ext.getCmp('page').store.pageSize;
}
function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
function timelfet(value, metaDate, record, rowIndex, colIndex, store){
    metaDate.style="text-align:center;";
    return '<div date-qtip="'+value + '" >' +value.toString().substring(0,10)+ '</div>';
}
//缺陷详情
function OperaTion(value,metaDate,record,rowIndex,colIndex,store){
    metaDate.style="text-align:center;";
    return '<a href="#" onclick="_delDetail(\''+value+'\'">'+'缺陷详情'+'</a>';
}

function pageLoad(){
    Ext.data.StoreManager.lookup('ckStore').on('load',function(){
        Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });
    Ext.data.StoreManager.lookup('zyStore').load();

    Ext.data.StoreManager.lookup("zyqStore").on('load',function(){
        Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
        QueryZyFzr();
    });


    Ext.data.StoreManager.lookup('zyStore').on('load',function(){
        Ext.getCmp('zy').select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
        OnButtonQuery();

    });


    Ext.getCmp('ck').on('select',function(){
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });
    // myMask.hide();
    Ext.getCmp('zyq').on('select',function(){
        OnButtonQuery();
        QueryZyFzr();
    });


    Ext.getCmp('zy').on('select',function(){
        OnButtonQuery();
    });
}
//负责人查找
function QueryZyFzr(){
    var nextSprStore = Ext.data.StoreManager.lookup('fzPerStore');
    nextSprStore.proxy.extraParams = {
        V_V_ORGCODE: Ext.getCmp('ck').getValue(),//OrgCode,
        V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),//Ext.util.Cookies.get('v_deptcode')
        V_V_REPAIRCODE: '',
        V_V_FLOWTYPE: 'MaintainPlan',
        V_V_FLOW_STEP: 'start',
        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_SPECIALTY: '',
        V_V_WHERE: ''

    };
    nextSprStore.currentPage = 1;
    nextSprStore.load();
    Ext.getBody().unmask();
}
//缺陷详情查找
function _delDetail(wxguid){

}
//查询
function OnButtonQuery (){

    Ext.data.StoreManager.lookup('gridStore').load({
        params:{
            V_V_YEAR:Ext.getCmp('year').getValue(),
            V_V_ORGCODE:Ext.getCmp('ck').getValue(),
            V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),//"",
            V_V_ZY:Ext.getCmp('zy').getValue(),
            V_V_QSTEXT:Ext.getCmp('gcqs').getValue(), //工程请示内容
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    });
    Ext.data.StoreManager.lookup('gridStore').currentPage = 1;
}
//添加
function OnButtonAdd(){
    if(Ext.getCmp("zyq").getValue()=="%"){
        alert('请选择一个作业区');
        return false;
    }
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PRO_PM_03_PLAN_YEAR_CREATE',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID:'-1',
            V_V_YEAR:Ext.getCmp("year").getValue(),
            V_V_ORGCODE:Ext.getCmp("ck").getValue(),
            V_V_DEPTCODE:"", // Ext.getCmp("zyq").getValue(),
            V_V_INPER:Ext.util.Cookies.get('v_personcode')
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.V_INFO=='成功'){
                var owidth = window.document.body.offsetWidth - 600;
                var oheight = window.document.body.offsetHeight + 100;
                // window.open(AppUrl + 'page/PM_03020101/index.html?guid=' + resp.V_OUT_GUID + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
                window.open(AppUrl + 'page/PM_03040101/index.html?guid=' + resp.V_OUT_GUID +'&year='+Ext.getCmp("year").getValue()+'&V_DEPTCODE=' + Ext.getCmp("zyq").getValue() + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
            }else{
                alert("添加失败");
            }
        }
    });

}
//编辑
function OnButtonEdit(){

}
//删除
function OnButtonDel(){

}
//导出
function OnButtonOut(){

}
//上报
function btnFlowStart(){

}
//查看详情
function btnView(){

}

