
var date=new Date();
var years=[];
var months=[];
for(var i=date.getFullYear()-5;i<date.getFullYear()+3;i++){
    years.push({displayField:i+"年",valueField:i});
}
for(var j=1;j<=12;j++){
    months.push({displayField:j+'月',valueField:j});
}
var yearStore=Ext.create('Ext.data.Store',{
    id:'yearStore',
    fields:['displayField','valueField'],
    data:years,
    proxy:{type:'memory',
    reader:{type:'json'}
    }
});
var monthStore=Ext.create('Ext.data.Store',{
    id:'monthStore',
    fields:['displayField','valueField'],
    data:months,
    proxy:{type:'memory',
        reader:{type:'json'}
    }
});
// table01 store
var storeDate01= Ext.create('Ext.data.Store', {
    id: 'storeDate01',
    autoLoad: false,
    fields: ['ID', 'EOS_GUID', 'D_YEAR',"D_MONTH",'ORGCODE','ORGNAME','E_FAULT_PLAN','E_FAULT_HOUR',
        'E_FAULT_ACTUAL',
        'C_EQU_GOOD_PLAN',
        'C_EQU_GOOD_SNUM',
        'C_EQU_GOOD_CNUM',
        'C_EQU_GOOD_ACT',
        'CUSE_OPENR_PLAN',
        'CUSE_OPENR_ACTUAL',
        'DXPFINISH_PRO_PLAN',
        'DXPFINISH_PRO_ACTUAL',
        'DXPFINISH_PRO_RATE',
        'DXT_EXACT_HOUR_PLAN',
        'DXT_EXACT_HOUR_ACT',
        'DXT_EXACT_HOUR_RATE',
        'COPT_CSENERGY_PLAN',
        'COPT_CSENERGY_ACT',
        'XKOPT_CSENERGY_PLAN',
        'XKOPT_CSENERGY_ACT',
        'SJSYNTH_CSENERGY_PLAN',
        'SJSYNTH_CSENERGY_ACT',
        'QTSYNTH_CSENERGY_PLAN',
        'QTSYNTH_CSENERGY_ACT',
        'INERTDATE',
        'INSERT_PERCODE',
        'INSERT_PERNAME',
        'RELATE_GUID',
        'REMENK'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'dxfile/PM_MONTH_EQU_ORGCODE_SEL',
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
var storeDate02= Ext.create('Ext.data.Store', {
    id: 'storeDate02',
    autoLoad: false,
    fields: ['ID', 'V_GUID',
        'D_YEAR',"D_MONTH",
        'ORGCODE','ORGNAME',
        'INERTDATE','INSERT_PERCODE',
        'INSERT_PERNAME',
        'DQ_EGOOD_PLAN',
        'DQ_EGOOD_HNUM',
        'DQ_EGOOD_CNUM',
        'DQ_EGOOD_ACT',
        'DL_PLAN',
        'DL_ACTUAL',
        'GD_LOSS_PLAN',
        'GD_LOSS_ACT',
        'DX_FINISH_PLAN',
        'DX_FINISH_ACT',
        'DX_FINISH_RATE',
        'DX_TIME_PLAN',
        'DX_TIME_ACT',
        'DX_TIME_RATE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'dxfile/PM_MONTH_EQU_ORGCODE_SEL',
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
var storeDate03= Ext.create('Ext.data.Store', {
    id: 'storeDate03',
    autoLoad: false,
    fields: ['ID', 'V_GUID',
        'D_YEAR',"D_MONTH",
        'ORGCODE','ORGNAME',
        'INERTDATE','INSERT_PERCODE',
        'INSERT_PERNAME',
        'PRO_Q_PLAN',
        'PRO_Q_ACT',
        'RELACT_GUID',
        'RAMARK'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'dxfile/PM_MONTH_EQU_ORGCODE_SEL',
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
var npanel=Ext.create('Ext.panel.Panel',{
    id:'npanel' ,
    region:'north',
    layout:'column',
    frame:true,
    border:false,
    width:1920,
    height:50,
    autoScroll:true,
    items:[{
       xtype:'combobox',
        id:'yearid',
        store:yearStore,
        displayField:'displayField',
        valueField:'valueField',
        fieldLabel:'年份',
        editable:false,
        width:130,
        labelWidth:30,
        queryMode:'local',
        margin:'10px 0px 15px 50px'
    },
        {
            xtype: 'combobox',
            id: 'monthid',
            store: monthStore,
            displayField: 'displayField',
            valueField: 'valueField',
            fieldLabel: '月份',
            editable: false,
            width: 130,
            labelWidth: 30,
            queryMode: 'local',
            margin: '10px 0px 15px 50px'
        },{
            xtype:'button',
            id:'button01',
            width: 65,
            text:'查询',
            margin:'10px 50px 15px 50px',
            handler:Query
        },
        {
            xtype:'button',
            id:'exportEx',
            text:'导出',
            width:65,
            margin:'10px 0px 15px 0px',
            handler:onBtnExcel
        }
        ]
});

var gridPanelA=Ext.create('Ext.grid.GridPanel',{
    id:'gridPanelA',
    applyTo:'grid',
    region:'center',
    width:1920,
    height:820,
    frame:true,
    autoScroll:true,
    store:storeDate01,
    columnLines: true,
    columns: [
        {header: '唯一码', width: 100, dataIndex: 'EOS_GUID', align: 'center',editor: 'textfield',hidden:true},
        {header: '单位', width: 120, dataIndex: 'ORGCODE', align: 'center',hidden:true},
        {header: '单位', width: 180, dataIndex: 'ORGNAME', align: 'center'},
        {header: '年份', width: 80, dataIndex: 'D_YEAR', align: 'center'},
        {header: '月份', width: 80, dataIndex: 'D_MONTH', align: 'center'},
        {header:'设备故障率',columns:[
                {text: '计划率（%）', width: 80, dataIndex: 'E_FAULT_PLAN', align: 'center',flex: 1},
                {text: '故障时间（h)', width: 90, dataIndex: 'E_FAULT_HOUR', align: 'center',flex: 1},
                {text: '实际（%）', width: 80, dataIndex: 'E_FAULT_ACTUAL', align: 'center',flex: 1}
            ]},
        {header:'采矿单体设备完好率',columns:[
                {text: '计划（%）', width: 80, dataIndex: 'C_EQU_GOOD_PLAN', align: 'center',flex: 1},
                {text: '在册设备数量', width: 100, dataIndex: 'C_EQU_GOOD_SNUM', align: 'center',flex: 1},
                {text: '可开动设备数量', width: 100, dataIndex: 'C_EQU_GOOD_CNUM', align: 'center',flex: 1},
                {text: '实际（%）', width: 80, dataIndex: 'C_EQU_GOOD_ACT', align: 'center',flex: 1}
            ]},
        {header:'可开动率',columns:[
                {text: '计划（%）', width: 65, dataIndex: 'CUSE_OPENR_PLAN', align: 'center',flex: 1},
                {text: '实际（%）', width: 65, dataIndex: 'CUSE_OPENR_ACTUAL', align: 'center',flex: 1}
            ]},
        {header:'定修计划完成率',columns:[
                {text: '计划项目', width: 100, dataIndex: 'DXPFINISH_PRO_PLAN', align: 'center',flex: 1},
                {text: '实际完成项目', width: 100, dataIndex: 'DXPFINISH_PRO_ACTUAL', align: 'center',flex: 1},
                {text: '定修计划完成率（%）', width: 100, dataIndex: 'DXPFINISH_PRO_RATE', align: 'center',flex: 1 }
            ]},
        {header:'定修时间准确率',columns:[
                {text: '计划定修时间（h)', width: 100, dataIndex: 'DXT_EXACT_HOUR_PLAN', align: 'center',flex: 1},
                {text: '实际完成时间（h)', width: 100, dataIndex: 'DXT_EXACT_HOUR_ACT', align: 'center',flex: 1},
                {text: '定修时间准确率（%）', width: 100, dataIndex: 'DXT_EXACT_HOUR_RATE', align: 'center',flex: 1}
            ]},
        {header:'开矿工序能耗',columns:[
                {text: '计划', width: 65, dataIndex: 'COPT_CSENERGY_PLAN', align: 'center',flex: 1},
                {text: '实际', width: 65, dataIndex: 'COPT_CSENERGY_ACT', align: 'center',flex: 1}
            ]},
        {header:'选矿/精铁矿工序能耗',columns:[
                {text: '计划', width: 65, dataIndex: 'XKOPT_CSENERGY_PLAN', align: 'center',flex: 1},
                {text: '实际', width: 65, dataIndex: 'XKOPT_CSENERGY_ACT', align: 'center',flex: 1}
            ]},
        {header:'烧结综合能耗',columns:[
                {text: '计划', width: 65, dataIndex: 'SJSYNTH_CSENERGY_PLAN', align: 'center',flex: 1},
                {text: '实际', width: 65, dataIndex: 'SJSYNTH_CSENERGY_ACT', align: 'center',flex: 1}
            ]},
        {header:'球团综合能耗',columns:[
                {text: '计划', width: 65, dataIndex: 'QTSYNTH_CSENERGY_PLAN', align: 'center',flex: 1},
                {text: '实际', width: 65, dataIndex: 'QTSYNTH_CSENERGY_ACT', align: 'center',flex: 1}
            ]}
    ]
});
var gridPanelB=Ext.create('Ext.grid.GridPanel',{
    id:'gridPanelB',
    applyTo:'grid',
    region:'center',
    width:1920,
    height:820,
    frame:true,
    autoScroll:true,
    store:storeDate02,
    columnLines: true,
    columns: [
        {header: '唯一码', width: 100, dataIndex: 'V_GUID', align: 'center',editor: 'textfield',hidden:true},
        {header: '单位', width: 120, dataIndex: 'ORGCODE', align: 'center',hidden:true},
        {header:'单位', width:180, dataIndex: 'ORGNAME', align: 'center'},
        {header: '年份', width: 60, dataIndex: 'D_YEAR', align: 'center'},
        {header: '月份', width: 60, dataIndex: 'D_MONTH', align: 'center'},
        {header:'电气单体设备完好率',columns:[
                {text: '计划（%）', width: 80, dataIndex: 'DQ_EGOOD_PLAN', align: 'center',flex: 1},
                {text: '在册设备数量', width: 90, dataIndex: 'DQ_EGOOD_HNUM', align: 'center',flex: 1,

                },
                {text: '可开动设备数量', width: 90, dataIndex: 'DQ_EGOOD_CNUM', align: 'center',flex: 1},
                {text: '实际（%）', width: 80, dataIndex: 'DQ_EGOOD_ACT', align: 'center',flex: 1}
            ]},
        {header:'电网力率',columns:[
                {text: '计划（%）', width: 80, dataIndex: 'DL_PLAN', align: 'center',flex: 1},
                {text: '实际（%）', width: 100, dataIndex: 'DL_ACTUAL', align: 'center',flex: 1}
            ]},
        {header:'供电损失率（%）',columns:[
                {text: '计划', width: 65, dataIndex: 'GD_LOSS_PLAN', align: 'center',flex: 1},
                {text: '实际', width: 65, dataIndex: 'GD_LOSS_ACT', align: 'center',flex: 1}
            ]},
        {header:'定修计划完成率',columns:[
                {text: '计划项目', width: 100, dataIndex: 'DX_FINISH_PLAN', align: 'center',flex: 1},
                {text: '实际完成项目', width: 100, dataIndex: 'DX_FINISH_ACT', align: 'center',flex: 1},
                {text: '定修计划完成率（%）', width: 100, dataIndex: 'DX_FINISH_RATE', align: 'center',flex: 1}
            ]},
        {header:'定修时间准确率',columns:[
                {text: '计划定修时间（h)', width: 100, dataIndex: 'DX_TIME_PLAN', align: 'center',flex: 1},
                {text: '实际完成时间（h)', width: 100, dataIndex: 'DX_TIME_ACT', align: 'center',flex: 1},
                {text: '定修时间准确率（%）', width: 100, dataIndex: 'DX_TIME_RATE', align: 'center',flex: 1}
            ]}
    ]
});
var gridPanelC=Ext.create('Ext.grid.GridPanel',{
    id:'gridPanelC',
    applyTo:'grid',
    region:'center',
    width:1920,
    height:820,
    frame:true,
    autoScroll:true,
    store:storeDate03,
    columnLines: true,
    columns: [
        {header: '唯一码', width: 100, dataIndex: 'V_GUID', align: 'center',flex: 1,hidden:true},
        {header: '单位', width: 120, dataIndex: 'ORGCODE', align: 'center',flex: 1,hidden:true},
        {header:'单位', width:180, dataIndex: 'ORGNAME', align: 'center'},
        {header: '年份', width: 60, dataIndex: 'D_YEAR', align: 'center'},
        {header: '月份', width: 60, dataIndex: 'D_MONTH', align: 'center'},
        {header:'产品合格率（%）',width: 160,columns:[
                {text: '计划', width: 80, dataIndex: 'PRO_Q_PLAN', align: 'center',flex: 1},
                {text: '实际（%）', width: 80, dataIndex: 'PRO_Q_ACT', align: 'center',flex: 1}
            ]}
    ]
});
var tabPanel=Ext.create("Ext.tab.Panel",{
    id:'tabPanel',
    region:'center',
    width:1920,
    // defaults:{autoScroll:true},
    activeTab:0,
    enableTabScroll:true,
    items:[{
        id:'tab0',
        title:'统计表格1',
        border:false,
        items:[gridPanelA],
        listeners: { activate: action0 }
    },{
        id:'tab1',
        title:'统计表格2',
        border:false,
        items:[gridPanelB],
        listeners: { activate: action1 }
    },{
            id:'tab2',
            title:'统计表格3',
            border:false,
            items:[gridPanelC],
        listeners: { activate: action2 }
        }]

});
Ext.onReady(function(){

    Ext.create("Ext.container.Viewport",{
        layout:'border',
        id:'main',
        items:[npanel,tabPanel]
    });
    initLoad();
    Query();
});

function initLoad(){
    Ext.getCmp('yearid').select(date.getFullYear());
    Ext.getCmp('monthid').select(date.getMonth()+1);
}
function action0(tab){
    tab.on('activate',function(tab){
        // Query();
    });
    Query();
}
function action1(tab){
    tab.on('activate',function(tab){
        // Query();
    });
    Query();
}
function action2(tab){
    tab.on('activate',function(tab){
        // Query();
    });
    Query();
}

function Query(){
    if(Ext.getCmp('tabPanel').activeTab.id=='tab0'){
        Ext.data.StoreManager.lookup('storeDate01').load({
            params:{
                V_YEAR:Ext.getCmp('yearid').getValue(),
                V_MONTH:Ext.getCmp('monthid').getValue(),
                V_ORGCODE:Ext.util.Cookies.get('v_orgCode'),
                V_PERCODE:Ext.util.Cookies.get('v_personcode'),
                V_SIGN:'TAB1'
            }
        });
    }
    if(Ext.getCmp('tabPanel').activeTab.id=='tab1'){
        Ext.data.StoreManager.lookup('storeDate02').load({
            params:{
                V_YEAR:Ext.getCmp('yearid').getValue(),
                V_MONTH:Ext.getCmp('monthid').getValue(),
                V_ORGCODE:Ext.util.Cookies.get('v_orgCode'),
                V_PERCODE:Ext.util.Cookies.get('v_personcode'),
                V_SIGN:'TAB2'
            }
        });
    }
    if(Ext.getCmp('tabPanel').activeTab.id=='tab2'){
        Ext.data.StoreManager.lookup('storeDate03').load({
            params:{
                V_YEAR:Ext.getCmp('yearid').getValue(),
                V_MONTH:Ext.getCmp('monthid').getValue(),
                V_ORGCODE:Ext.util.Cookies.get('v_orgCode'),
                V_PERCODE:Ext.util.Cookies.get('v_personcode'),
                V_SIGN:'TAB3'
            }
        });
    }
}

function onBtnExcel(){
    if(Ext.getCmp('tabPanel').activeTab.id=='tab0') {
        document.location.href = AppUrl + 'dxfile/exportExDate01?'
            + 'V_YEAR=' + Ext.getCmp('yearid').getValue()
            + '&V_MONTH=' + Ext.getCmp('monthid').getValue()
            + '&V_ORGCODE=' + Ext.util.Cookies.get('v_orgCode')
            + '&V_PERCODE=' + Ext.util.Cookies.get('v_personcode')
            + '&V_SIGN=' + 'TAB1';
    }
    if(Ext.getCmp('tabPanel').activeTab.id=='tab1') {
        document.location.href = AppUrl + 'dxfile/exportExDate02?'
            + 'V_YEAR=' + Ext.getCmp('yearid').getValue()
        + '&V_MONTH=' + Ext.getCmp('monthid').getValue()
        + '&V_ORGCODE=' + Ext.util.Cookies.get('v_orgCode')
        + '&V_PERCODE=' + Ext.util.Cookies.get('v_personcode')
        + '&V_SIGN=' + 'TAB2';
    }
    if(Ext.getCmp('tabPanel').activeTab.id=='tab2') {
        document.location.href = AppUrl + 'dxfile/exportExDate03?'
            + 'V_YEAR=' + Ext.getCmp('yearid').getValue()
        + '&V_MONTH=' + Ext.getCmp('monthid').getValue()
        + '&V_ORGCODE=' + Ext.util.Cookies.get('v_orgCode')
        + '&V_PERCODE=' + Ext.util.Cookies.get('v_personcode')
        + '&V_SIGN=' + 'TAB3';
    }
}