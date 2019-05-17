﻿var dt = new Date();
var thisYear = dt.getFullYear();
var years = [];
var processKey="";
var V_STEPNAME ="";
var V_NEXT_SETP ="";
//年份
for (var i =thisYear - 4; i <= thisYear + 1; i++) {
    years.push({displayField: i, valueField: i});
}

var yearStore = Ext.create("Ext.data.Store", {
    storeId: 'yearStore',
    fields: ['displayField', 'valueField'],
    data: years,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});

Ext.onReady(function () {
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

    var wxlxStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'wxlxStore',
        fields: ['V_BASECODE', 'V_BASENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_PM_BASEDIC_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

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
            'V_REPAIRDEPTCODE','V_BDATE','V_EDATE','V_STATE','V_FLAG','V_INMAN','V_INMANCODE','V_INDATE','V_STATENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PRO_PM_03_PLAN_YEAR_VIEW_TB',
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

    var panel = Ext.create('Ext.Panel', {
        id: 'panel',
        region: 'north',
        width: '100%',
        frame: true,
        layout: 'column',
        defaults: {
            style: 'margin:5px 0px 5px 5px',
            labelAlign: 'right'
        },
        items: [{
            id: 'year',
            store: Ext.create("Ext.data.Store", {
                fields: ['displayField', 'valueField'],
                data: years,
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'json'
                    }
                }
            }),
            xtype: 'combo',
            fieldLabel: '年份',
            value: new Date().getFullYear()+1,
            labelWidth: 80,
            width: 250,
            labelAlign: 'right',
            editable: false,
            displayField: 'displayField',
            valueField: 'valueField'
        }, {
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
        ,{
            xtype: 'combo',
            id: "wxlx",
            store: wxlxStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '维修类型',
            displayField: 'V_BASENAME',
            valueField: 'V_BASECODE',
            labelWidth: 80,
            width: 250
        }, {
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
            id: "jxnr",
            editable: false,
            queryMode: 'local',
            fieldLabel: '检修内容',
            labelWidth: 80,
            width: 250
        }, {
                xtype : 'combo',
                id:'fzPer',
                store:fzPerStore,
                editable : false,
                queryMode : 'local',
                fieldLabel : '负责人',
                displayField: 'V_PERSONNAME',
                valueField: 'V_PERSONCODE',
                margin:'5 5 5 10',
                labelWidth :60,
                width:170,
                labelAlign : 'right'
            },{
            xtype: 'button',
            text: '查询',
            style: ' margin: 5px 0px 0px 10px',
            icon: imgpath + '/search.png',
            listeners: {click: OnButtonQuery}
        },/*{
            xtype: 'button',
            text: '获取年预算',
            style: ' margin: 5px 0px 0px 10px',
            icon: imgpath + '/search.png',
            listeners: {click: QueryBudget}
        },*/{
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
            //{
            //    xtype: 'button',
            //    text: '上报年计划',
            //    icon: imgpath + '/accordion_collapse.png',
            //    listeners: {click: OnButtonUp}
            //},
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
            // {
            //     xtype: 'button',
            //     text: '关联维修计划',//'导入放行计划',
            //     icon: imgpath + '/accordion_expand.png',
            //     listeners: {click: OnButtonDR}
            // }
            // ,{
            //     xtype: 'button',
            //     text: '新增2',
            //     icon: imgpath + '/add.png',
            //     listeners: {click: OnButtonAdd2}
            // },
            // {
            //     xtype: 'button',
            //     text: '编辑2',
            //     icon: imgpath + '/edit.png',
            //     listeners: {click: OnButtonEdit2}
            // }
            // ,{
            //     xtype:'button',
            //     text:'查看施工进度',
            //     listeners: {click: OnButtonSgjd}
            //
            // }
            // ,{
            //     xtype: 'button',
            //     text: '生成工单',
            //     // icon: imgpath + '/accordion_expand.png',
            //     listeners: {click: OnButtonWorkorder}
            // }
        ]
    });
    // var myMask = new Ext.LoadMask({
    //     msg    : 'Please wait...',
    //     target : panel
    // }).show();
    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        region: 'center',
        width: '100%',
        columnLines: true,
        store: gridStore,
        autoScroll: true,
        selType: 'checkboxmodel',
        style: 'text-align:center',
        height: 400,
        selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [{xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text: '工程状态', width: 140, dataIndex: 'V_STATENAME', align: 'center',renderer:atleft},
            {text: '工程编码', width: 200, dataIndex: 'V_PORJECT_CODE', align: 'center',renderer:atleft},
            {text: '工程名称', width: 200, dataIndex: 'V_PORJECT_NAME', align: 'center',renderer:atleft},
            {text: '维修类型', width: 100, dataIndex: 'V_WXTYPENAME', align: 'center',renderer:atleft},
            {text: '专业', width: 100, dataIndex: 'V_SPECIALTYNAME', align: 'center',renderer:atleft},
            {text: '维修内容', width: 300, dataIndex: 'V_CONTENT', align: 'center',renderer:atleft},
            {text: '维修费用（万元）', width: 120, dataIndex: 'V_MONEYBUDGET', align: 'center',renderer:atright},
            {text: '开工时间', width: 140, dataIndex: 'V_BDATE', align: 'center',renderer:timelfet},
            {text: '竣工时间', width: 140, dataIndex: 'V_EDATE', align: 'center',renderer:timelfet}],
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

    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel, grid]
    });

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
        Ext.data.StoreManager.lookup('wxlxStore').load({
            params:{
                IS_V_BASETYPE:'PM_DX/REPAIRTYPE'
            }
        });
    });

    Ext.data.StoreManager.lookup("zyqStore").on('load',function(){
        Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
        Ext.data.StoreManager.lookup('wxlxStore').load({
            params:{
                IS_V_BASETYPE:'PM_DX/REPAIRTYPE'
            }
        });
        QueryZyFzr();
    });

    Ext.data.StoreManager.lookup('wxlxStore').on('load',function(){
       Ext.getCmp('wxlx').select(Ext.data.StoreManager.lookup('wxlxStore').getAt(0));
       Ext.data.StoreManager.lookup('zyStore').load()
    });

    Ext.data.StoreManager.lookup('zyStore').on('load',function(){
        Ext.getCmp('zy').select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
        OnButtonQuery();
        Ext.getBody().unmask();
    });
    // Ext.getBody().unmask();


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

    Ext.getCmp('wxlx').on('select',function(){
        OnButtonQuery();
    });

    Ext.getCmp('zy').on('select',function(){
        OnButtonQuery();
    });

});
//加载专业负责人
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
}
function beforeloadStore(store) {
    store.proxy.extraParams.V_V_YEAR =Ext.getCmp('year').getValue();
    store.proxy.extraParams.V_V_ORGCODE = Ext.getCmp('ck').getValue();
    store.proxy.extraParams.V_V_DEPTCODE = ""; //Ext.getCmp('zyq').getValue();
    store.proxy.extraParams.V_V_ZY =  Ext.getCmp('zy').getValue();
    store.proxy.extraParams.V_V_WXLX = Ext.getCmp('wxlx').getValue();
    store.proxy.extraParams.V_V_CONTENT = Ext.getCmp('jxnr').getValue();
    store.proxy.extraParams.V_V_PAGE =Ext.getCmp('page').store.currentPage;
    store.proxy.extraParams.V_V_PAGESIZE = Ext.getCmp('page').store.pageSize;
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}


function OnButtonQuery (){
    Ext.data.StoreManager.lookup('gridStore').currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore').load({
        params:{
            V_V_YEAR:Ext.getCmp('year').getValue(),
            V_V_ORGCODE:Ext.getCmp('ck').getValue(),
            V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),//"",
            V_V_ZY:Ext.getCmp('zy').getValue(),
            V_V_WXLX:Ext.getCmp('wxlx').getValue(),
            V_V_CONTENT:Ext.getCmp('jxnr').getValue(),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    })
}

function OnButtonOut(){
    document.location.href=AppUrl + 'cjy/YEAREXCEL?V_V_YEAR='+Ext.getCmp('year').getValue()+
        '&V_V_ORGCODE='+Ext.getCmp('ck').getValue()+
        '&V_V_DEPTCODE='+ ""+ //Ext.getCmp('zyq').getValue()+
        '&V_V_ZY='+Ext.getCmp('zy').getValue()+
        '&V_V_WXLX='+Ext.getCmp('wxlx').getValue()+
        '&V_V_CONTENT='+Ext.getCmp('jxnr').getValue();
}
function OnButtonAdd(){
    //if(Ext.getCmp("zyq").getValue()!="%"&&Ext.getCmp("zyq").getValue()!=""){
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
                    var oheight = window.document.body.offsetHeight - 100;
                    // window.open(AppUrl + 'page/PM_03020101/index.html?guid=' + resp.V_OUT_GUID + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
                    window.open(AppUrl + 'page/PM_03020101/newindex.html?guid=' + resp.V_OUT_GUID + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
                }else{
                    alert("添加失败");
                }
            }
        });
    // }
    // else{
    //     alert("作业区不可为空");
    // }



}

function OnButtonEdit(){
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if(seldata.length!=1){
        alert('请选择一条数据进行修改！');
        return false;
    }else if(seldata[0].data.V_STATE=='99'){
        var owidth = window.document.body.offsetWidth - 600;
        var oheight = window.document.body.offsetHeight - 100;
        // window.open(AppUrl + 'page/PM_03020101/index.html?guid=' +seldata[0].data.V_GUID + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
        window.open(AppUrl + 'page/PM_03020101/newindex.html?guid=' +seldata[0].data.V_GUID + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
    }else{
        alert('非编辑状态不可修改');
        return false;
    }

}
//查看详情不可修改
function btnView(){
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if(seldata.length!=1){
        alert('请选择一条数据进行修改！');
        return;
    }else{
        var owidth = window.document.body.offsetWidth - 600;
        var oheight = window.document.body.offsetHeight - 100;
        // window.open(AppUrl + 'page/PM_03020101/index.html?guid=' +seldata[0].data.V_GUID + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
        window.open(AppUrl + 'page/PM_03020101/viewIndex.html?wxGuid=' +seldata[0].data.V_GUID + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
    }

}
function OnButtonAdd2(){
    //if(Ext.getCmp("zyq").getValue()!="%"&&Ext.getCmp("zyq").getValue()!=""){
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
                var oheight = window.document.body.offsetHeight - 100;
                // window.open(AppUrl + 'page/PM_03020101/index.html?guid=' + resp.V_OUT_GUID + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
                window.open(AppUrl + 'page/PM_03020102/newindex.html?guid=' + resp.V_OUT_GUID + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
            }else{
                alert("添加失败");
            }
        }
    });

}

function OnButtonEdit2(){
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if(seldata.length!=1){
        alert('请选择一条数据进行修改！');
        return;
    }else{
        var owidth = window.document.body.offsetWidth - 600;
        var oheight = window.document.body.offsetHeight - 100;
        // window.open(AppUrl + 'page/PM_03020101/index.html?guid=' +seldata[0].data.V_GUID + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
        window.open(AppUrl + 'page/PM_03020102/newindex.html?guid=' +seldata[0].data.V_GUID + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
    }

}
function OnButtonDel(){
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if(seldata.length==0){
        alert('请选择数据进行删除！');
    }else{
        var num=0;
        for(var i=0;i<seldata.length;i++){
            Ext.Ajax.request({
                url: AppUrl + '/PM_03/PRO_PM_03_PLAN_YEAR_DEL',
                method: 'POST',
                async: false,
                params: {
                    V_V_GUID:seldata[i].data.V_GUID
                },
                success: function (resp) {
                    var resp=Ext.decode(resp.responseText);
                    if(resp.V_CURSOR=='SUCCESS'){
                       num++;
                    }
                }
            });

            if(num==seldata.length){
                OnButtonQuery();
            }
        }
    }
}

//查询年预算
function QueryBudget(){
    Ext.getBody().mask('<p>年预算获取中...</p>');
    Ext.Ajax.request({
        url: AppUrl + '/budget/budgetYear',
        method: 'POST',
        async: false,
        params: {
            V_V_YEAR: Ext.getCmp('year').getValue()
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if(resp.setret='SUCCESS'){
                alert('最新年预算获取成功');
                Ext.getBody().unmask();
            }
        }
    });
}

/*
* 像维修计划中传递年计划数据
* */
function OnButtonUp(){
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if(seldata.length==0){
        alert('请选择数据进行上传！');
    }else{
        Ext.getBody().mask('<p>年计划上传中...</p>');
        var guidData=[];
        for (var i = 0; i < seldata.length; i++) {
            guidData.push(seldata[i].data.V_GUID);
        }
        Ext.Ajax.request({
            url: AppUrl + '/project/YearDataSet',
            method: 'POST',
            async: false,
            params: {
                V_V_GUID:guidData
            },
            success: function (resp) {
                var resp=Ext.decode(resp.responseText);

            }
        });
    }
}
function OnButtonDR(){
    Ext.getBody().mask('<p>放行计划导入中...</p>');
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/DR_PM_03_PLAN_PROJECT',
        method: 'POST',
        async: false,
        params: {
            V_V_YEAR: Ext.getCmp('year').getValue()
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if(resp.V_INFO=='SUCCESS'){
                alert('放行年计划导入成功');
                OnButtonQuery();
                Ext.getBody().unmask();

            }else{
                alert('放行年计划导入失败');
                Ext.getBody().unmask();
            }
        },failure: function (response) {
            alert('放行年计划导入失败');
            Ext.getBody().unmask();
        }
    });

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
    metaDate.style="text-align:right;";
    return '<div date-qtip="'+value + '" >' +value.toString().substring(0,10)+ '</div>';
}

function OnButtonWorkorder(){
    var chodata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if(chodata.length!=1){
        alert('请选择一条数据进行工单生成！');
        return;
    }else{
        var owidth = window.document.body.offsetWidth - 600;
        var oheight = window.document.body.offsetHeight - 100;
        window.open(AppUrl + 'page/pm_dxgc_orderEdit/dxWorkOrder.html?guid=' +chodata[0].data.V_GUID + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
    }
}
//
// function OnButtonSgjd(){
//     var chodata = Ext.getCmp('grid').getSelectionModel().getSelection();
//     if(chodata.length!=1){
//         alert('请选择一条数据进行查看！');
//         return;
//     }else{
//         var indate=(chodata[0].data.V_BDATE).toString().substring(0,10);
//         var enddate=(chodata[0].data.V_EDATE).toString().substring(0,10);
//         var owidth = 1370;//window.document.body.offsetWidth - 600;
//         var oheight =740;// window.document.body.offsetHeight - 100;
//         window.open(AppUrl + 'page/PM_030201/modelDetail.html?guid=' +chodata[0].data.V_GUID +'&indate='+indate+'&endate='+enddate+'&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
//     }
// }
function selectGridTurn(){
    OnButtonQuery();
}

//维修计划上报
function btnFlowStart() {
    var snum=0;
    var chodata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if(chodata.length<=0){
        alert('请选择至少一条数据进行查看！');
        return;
    }else {

        for (var k = 0; k < chodata.length; k++){
            //流程发起
            Ext.Ajax.request({
                url: AppUrl + 'Activiti/StratProcess',
                async: false,
                method: 'post',
                params: {
                    parName: ["originator", "flow_businesskey", V_NEXT_SETP, "idea", "remark", "flow_code", "flow_yj", "flow_type"],
                    parVal: [Ext.util.Cookies.get('v_personcode'), chodata[k].get("V_GUID"), Ext.getCmp('fzPer').getValue(), "请审批!", chodata[k].get('V_CONTENT'), chodata[k].get("V_PORJECT_CODE"), "请审批！", "MaintainPlan"],
                    processKey: processKey,
                    businessKey: chodata[k].get("V_GUID"),
                    V_STEPCODE: 'Start',
                    V_STEPNAME: V_STEPNAME,
                    V_IDEA: '请审批！',
                    V_NEXTPER: Ext.getCmp('fzPer').getValue(),
                    V_INPER: Ext.util.Cookies.get('v_personcode')
                },
                success: function (response) {
                    if (Ext.decode(response.responseText).ret == 'OK') {
                        //缺陷日志写入-new
                        var STAT = "SB";
                        newDefectLog(chodata[k].get("V_GUID"), STAT);
                        //缺陷日志写入-old
                        Ext.Ajax.request({
                            url: AppUrl + 'dxfile/PM_DEFECT_LOG_BY_PRO',
                            method: 'POST',
                            async: false,
                            params: {
                                V_PERCODE: Ext.util.Cookies.get('v_personcode'),
                                V_PERNAME: decodeURI(Ext.util.Cookies.get('v_personname')),
                                V_PROGUID: chodata[k].get("V_GUID")
                            },
                            success: function (resp) {
                                var resp = Ext.decode(resp.responseText);
                                if (resp.RET == 'SUCCESS') {
                                    // alert('保存成功！');
                                    // window.opener.selectGridTurn();
                                    // window.close();
                                }
                            }
                        });
                        Ext.Ajax.request({
                            url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_STATE_SEND',
                            method: 'POST',
                            async: false,
                            params: {
                                V_V_GUID: chodata[k].get("V_GUID"),
                                V_V_STATECODE: '1'
                            },
                            success: function (resp) {
                                var resp = Ext.decode(resp.responseText);
                                if (resp.V_INFO == 'SUCCESS') {
                                    Ext.Ajax.request({
                                        url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_FLOW_LOG_SET',
                                        method: 'POST',
                                        async: false,
                                        params: {
                                            V_V_GUID: chodata[k].get("V_GUID"),
                                            V_V_FLOWCODE: '1',
                                            V_V_FLOWNAME: '上报',
                                            V_V_IDEA: '请审批',
                                            V_V_INPERCODE: Ext.util.Cookies.get('v_personcode'),
                                            V_V_INPERNAME: Ext.util.Cookies.get('v_personname2'),
                                            V_V_NEXTPERCODE: '',
                                            V_V_NEXTPERNAME: ''
                                        },
                                        success: function (resp) {
                                            var resp = Ext.decode(resp.responseText);
                                            if (resp.V_INFO == 'SUCCESS') {
                                                snum++;

                                            }
                                        }
                                    });
                                }
                            }
                        });

                    } else if (Ext.decode(response.responseText).error == 'ERROR') {
                        Ext.Msg.alert('提示', '该流程发起失败！');
                    }
                }
            });
    }
    if(num==chodata.length){
        alert('上报成功！');
        OnButtonQuery();
    }
}
}

function newDefectLog(wxguid,STAT){

            Ext.Ajax.request({
                url: AppUrl + 'dxfile/PM_DEFECT_LOG_FROMPRO_PLIN',
                method: 'POST',
                async: false,
                params: {
                    V_WXGUID:wxguid,
                    V_PERCODE:Ext.util.Cookies.get('v_personcode'),
                    V_DEPTCODE:Ext.util.Cookies.get('v_deptcode'),
                    V_ORG:Ext.util.Cookies.get('v_orgCode'),
                    V_PASS_STAT:STAT,
                    V_DEFECTGUID:'',
                    V_DEF_TYPE:'',
                    V_DEF_LIST:'',
                    V_DEF_DATE:'',//records[i].get('D_DEFECTDATE').toString(),
                    V_BJ:'',
                    V_SOLVE:''
                },
                success: function (resp) {
                    var resp=Ext.decode(resp.responseText);
                    if(resp.RET=='SUCCESS'){
                        // alert('保存成功！');
                        // window.opener.selectGridTurn();
                        // window.close();
                    }
                }
            });
}