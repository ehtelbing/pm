/**
 * Created by lxm on 2017/8/3.
 */
var cmItems=[];
var list=[];
var guid="";
var type="";
var treeguid="";
var today=new Date(Ext.Date.format(new Date(), 'Y-m-d'));
var stores= Ext.create('Ext.data.ArrayStore', {
    fields: [
        {name: 'ResourceId'},
        {name: 'StartDate'},
        {name: 'EndDate'},
        {name: 'Name'},
        {name: 'mycolor'}
    ],
    data: list

});


var dt = new Date();
var thisYear = dt.getFullYear();
var years = [];

for (var i = 2014; i <= thisYear + 1; i++) years.push([i,i]);
var months=[];
for (var i = 1; i <= 12; i++) months.push({ displayField: i, valueField: i });
var  yearmr=new Date().getFullYear();
var lastmonth=new Date().getMonth();
if (new Date().getMonth()+1==1)
{yearmr=yearmr-1;
    lastmonth=12;
}
var jhygs=[];
var jhygStore=Ext.create("Ext.data.Store", {
    id:'jhygStore',
    fields: ['gz', 'rs','gs','sm'],
    data: jhygs,
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});

var jhwls=[];
var jhwlStore=Ext.create("Ext.data.Store", {
    id:'jhwlStore',
    fields: ['wlbm', 'wlmc','jldw','sl','gg','dj'],
    data: jhwls,
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});
var jjpbs=[];
var jjpbStore=Ext.create("Ext.data.Store", {
    id:'jjpbStore',
    fields: ['jjbm', 'jjmc','jldw','sl'],
    data: jjpbs,
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*'
]);

var ckStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'ckStore',
    fields: ['V_DEPTCODE','V_DEPTNAME', ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_01/PRO_BASE_DEPT_VIEW_PER',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams:{
            V_DEPTCODE : Ext.util.Cookies.get('v_orgCode'),
            V_DEPTTYPE: '[基层单位]',
            V_V_PERSON : Ext.util.Cookies.get('v_personcode')
        }
    }
});
var zyqStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'zyqStore',
    fields: ['V_DEPTCODE','V_DEPTNAME', ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_01/PRO_BASE_DEPT_VIEW_PER',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams:{
            V_DEPTCODE : Ext.util.Cookies.get('v_orgCode'),
            V_DEPTTYPE: '[主体作业区]',
            V_V_PERSON : Ext.util.Cookies.get('v_personcode')
        }
    }
});
var ganttgrid = Ext.create('Ext.grid.Panel', {
    id:'ganttgrid',
    columnLines: true,
    store:stores,
    columns:cmItems,
    height: 350,
    width: 800,
    renderTo: Ext.getBody()
});
var zyqStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'zyqStore',
    fields: ['V_DEPTCODE','V_DEPTNAME', ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_01/PRO_BASE_DEPT_VIEW_PER',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }

    }
});

var zyStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'zyStore',
    fields: ['V_MAJOR_CODE','V_MAJOR_NAME', ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_01/PM_04_PROJECT_MAJOR_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    fields: [
        'I_ID',
        'V_ORGCODE',
        'V_ORGNAME',
        'V_DEPTCODE',
        'V_DEPTNAME',
        'V_TYPE_CODE',
        'V_TYPE_NAME',
        'V_MAJOR_NAME',
        'V_MAJOR_CODE',
        'V_PROJECT_CODE',
        'V_PROJECT_NAME',
        'V_WBS_CODE',
        'V_WBS_NAME',
        'V_CONTENT',
        'V_BUDGET_MONEY',
        'V_REPAIR_DEPTCODE',
        'V_REPAIR_DEPTNAME',
        'V_FZR',
        'V_DATE_B',
        'V_DATE_E',
        'V_BZ',
        'V_FLOW_STATE',
        'V_INPERCODE',
        'V_INPERNAME',
        'V_INTIEM',
        'V_FALG',
        'V_YEAR',
        'V_MONTH',
        'V_GUID'
    ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PRO_PM_04_PROJECT_DATA_ITEM_V',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var ganttStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'ganttStore',
    fields: [
        'I_ID',
        'V_ORGCODE',
        'V_DEPTCODE',
        'V_YEAR',
        'V_MONTH',
        'V_GUID',
        'V_PROJECT_CODE',
        'V_PROJECT_NAME',
        'V_PLAN_MONEY',
        'V_CONTENT',
        'V_DATE_DESIGN',
        'V_DATE_INVITE',
        'V_DATE_B',
        'V_DATE_E',
        'V_BUDGET_MONEY',
        'V_PROGRESS',
        'V_BUILD_NAMAGER',
        'V_BULID_PERSON',
        'V_DIRECT_PERSON',
        'V_EQUTYPECODE',
        'V_EQUCODE',
        'V_EQUNAME',
        'V_SPECIALTY',
        'V_BUILD_DEPT',
        'V_GUID_P',
        'V_PROJECT_CODE_P',
        'V_PROJECT_NAME_P',
        'V_GUID_FXJH',
        'V_PROJECT_CODE_FXJH',
        'V_PROJECT_NAME_FXJH',
        'D_DATE_INPUT',
        'V_PERCODE_INPUT',
        'V_PERNAME_INPUT'


    ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_01/PRO_PM_EQUREPAIRPLAN_TREE',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var panel = Ext.create('Ext.panel.Panel',{
    frame : true,
    layout:'column',
    title:'检修放行计划选择',
    region:'north',
    bodyPadding : 5,
    id : 'panel',
    width : '100%',
    height:70,
    defaults : {
        labelWidth : 35,
        labelAlign : 'right'
    },
    items : [{id:'year',xtype:'combo',width:100,fieldLabel:'年份',
        store:years,displayField:'Item1',valueField:'Item2',
        value:thisYear,editable:false,queryMode:'local'},
        {id: 'month', store: Ext.create("Ext.data.Store", {
            fields: ['displayField', 'valueField'],
            data: months,
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            }
        }), xtype: 'combo', fieldLabel: '月份',
            style: ' margin: 0px 0px 0px 20px',
            value: new Date().getMonth()+1,labelWidth: 30,
            labelAlign:'right', width: 90, editable: false,
            displayField: 'displayField', valueField: 'valueField'},
        { xtype: 'combo', fieldLabel: '厂矿', labelWidth: 40, id: 'ck', store: 'ckStore', editable: false, displayField: 'V_DEPTNAME', valueField: 'V_DEPTCODE', queryMode: 'local' },
        { xtype: 'combo', fieldLabel: '专业', labelWidth: 40, id: 'zy', store: 'zyStore', editable: false, displayField: 'V_MAJOR_CODE', valueField: 'V_MAJOR_NAME', queryMode: 'local' },
        { xtype:'textfield',id:'gcbm',fieldLabel:'工程编码',labelAlign:'right',labelWidth : 65,width:200},
        { xtype:'textfield',id:'gcmc',fieldLabel:'工程名称',labelAlign:'right',labelWidth : 65,width:200},
        { xtype:'textfield',id:'gcnr',fieldLabel:'工程内容',labelAlign:'right',labelWidth : 65,width:200},
        { xtype : 'button',text : '查询',style : { margin : '0px 0px 0px 10px' },icon : imgpath + '/search.png',handler:QueryGrid}
    ]
});
var jhyggrid=Ext.create('Ext.grid.Panel',{
    width:'100%',
    id:'jhyggrid',
    store:jhygStore,
    height:100,
    style:'margin:0px 0px 5px 0px',
    autoScroll: true,
    columnLines: true,
    columns:[
        { text: '工种',width:80,dataIndex:'gz', align: 'center',renderer:Atleft },
        { text: '人数',width:80,dataIndex:'rs', align: 'center',renderer:AtRight },
        { text: '工时',width:80,dataIndex:'gs', align: 'center',renderer:AtRight },
        { text: '说明',width:200,dataIndex:'sm', align: 'center',renderer:Atleft },
        { text: '操作',width:100,dataIndex:'sm',align: 'center',renderer:Delete }
    ]
});
var jhwlgrid=Ext.create('Ext.grid.Panel',{
    width:'100%',
    id:'jhwlgrid',
    store:jhwlStore,
    height:100,
    style:'margin:0px 0px 5px 0px',
    autoScroll: true,
    columnLines: true,
    columns:[
        { text: '物料编码',width:120,dataIndex:'wlbm', align: 'center',renderer:Atleft },
        { text: '物料名称',width:120,dataIndex:'wlmc', align: 'center',renderer:Atleft },
        { text: '规格',width:120,dataIndex:'gg', align: 'center',renderer:Atleft },
        { text: '计量单位',width:80,dataIndex:'jldw', align: 'center',renderer:Atleft },
        { text: '单价',width:80,dataIndex:'dj', align: 'center',renderer:AtRight },
        { text: '数量',width:80,dataIndex:'sl', align: 'center',renderer:AtRight },
        { text: '操作',width:80,align: 'center',renderer:Delete2 }
    ]
});
var jjpbgrid=Ext.create('Ext.grid.Panel',{
    width:'100%',
    id:'jjpbgrid',
    store:jjpbStore,
    height:100,
    style:'margin:0px 0px 5px 0px',
    autoScroll: true,
    columnLines: true,
    columns:[
        { text: '机具编码',width:120,dataIndex:'jjbm', align: 'center',renderer:Atleft },
        { text: '机具名称',width:120,dataIndex:'jjmc', align: 'center',renderer:Atleft },
        { text: '计量单位',width:80,dataIndex:'jldw', align: 'center',renderer:Atleft },
        { text: '数量',width:80,dataIndex:'sl', align: 'center',renderer:AtRight },
        { text: '操作',width:80,align: 'center',renderer:Delete3 }
    ]
});
var lrwindow=Ext.create('Ext.window.Window',{
    width:620,
    height: 670,
    title: '工程分解录入',
    layout: 'border',
    id: 'lrwindow',
    autoScroll:true,
    layout:'vbox',
    modal: true,
    closeAction: 'hide',
    items: [
        {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[{
            xtype:'textfield',
            id:'fxjhbm',
            fieldLabel:'放行计划编码',
            readOnly:true,
            labelAlign:'right',
            labelWidth : 80,
            width:260,
            style:'margin:15px 5px 5px 5px'
        },{
            xtype:'textfield',
            id:'fxjhmc',
            fieldLabel:'放行计划名称',
            labelAlign:'right',
            readOnly:true,
            labelWidth : 80,
            width:260,
            style:'margin:15px 5px 5px 5px'
        },{
            xtype:'textfield',
            hidden:true,
            id:'fxjhguid',
            fieldLabel:'放行计划guid',
            labelAlign:'right',
            labelWidth : 80,
            width:260
        }]},
        {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[{
            xtype:'textfield',
            id:'sjgcbm',
            fieldLabel:'上级工程编码',
            labelAlign:'right',
            labelWidth : 80,
            readOnly:true,
            width:260,
            style:'margin:5px 5px 5px 5px'
        },{
            xtype:'textfield',
            id:'sjgcmc',
            fieldLabel:'上级工程名称',
            labelAlign:'right',
            labelWidth : 80,
            readOnly:true,
            width:260,
            style:'margin:5px 5px 5px 5px'
        },{
            xtype:'textfield',
            hidden:true,
            id:'sjgcguid',
            fieldLabel:'上级工程guid',
            labelAlign:'right',
            labelWidth : 80,
            width:260
        }]},
        {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[{id:'wyear',
            xtype:'combo',
            width:260,
            fieldLabel:'年份',
            store:years,
            style:'margin:5px 5px 5px 5px',
            displayField:'Item1',
            valueField:'Item2',
            readOnly:true,
            value:thisYear,
            editable:false,
            labelAlign:'right',
            labelWidth : 80,
            queryMode:'local'},
            {id:'wmonth',
                xtype:'combo',
                width:260,
                fieldLabel:'月份',
                store:months,
                readOnly:true,
                style:'margin:5px 5px 5px 5px',
                labelAlign:'right',
                labelWidth : 80,
                displayField:'Item1',
                valueField:'Item2',
                value:new Date().getMonth()+1,
                editable:false,
                queryMode:'local'},{
            xtype:'textfield',
            hidden:true,
            id:'guid',
            fieldLabel:'guid',
            labelAlign:'right',
            labelWidth : 80,
            width:260
        }]},
        {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[
            { xtype: 'combo',readOnly:true, fieldLabel: '厂矿',style:'margin:5px 5px 5px 5px',labelWidth : 80,width:260, id: 'wck', store: 'ckStore', editable: false, displayField: 'V_DEPTNAME',labelAlign:'right', valueField: 'V_DEPTCODE', queryMode: 'local' },
            { xtype: 'combo',readOnly:true, fieldLabel: '作业区',style:'margin:5px 5px 5px 5px',labelWidth : 80,width:260, id: 'wzyq', store: 'zyqStore', editable: false, displayField: 'V_DEPTNAME',labelAlign:'right', valueField: 'V_DEPTCODE', queryMode: 'local' }
        ]},
        {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[
            { xtype:'textfield',readOnly:true,id:'wgcbm',style:'margin:5px 5px 5px 5px',fieldLabel:'工程项目编码',labelAlign:'right',labelWidth : 80,width:260},
            { xtype:'textfield',readOnly:true,id:'wgcmc',style:'margin:5px 5px 5px 5px',fieldLabel:'工程项目名称',labelAlign:'right',labelWidth : 80,width:260}
        ]},
        {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[
            { xtype:'textfield',readOnly:true,id:'wys',style:'margin:5px 5px 5px 5px',fieldLabel:'预算（万元）',labelAlign:'right',labelWidth : 80,width:260},
            { xtype: 'combo', readOnly:true,fieldLabel: '专业',style:'margin:5px 5px 5px 5px',labelWidth : 80,width:260, id: 'wzy', store: 'zyStore', editable: false, displayField: 'V_MAJOR_NAME',labelAlign:'right', valueField: 'V_MAJOR_CODE', queryMode: 'local' }
        ]},
        {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[
            { xtype:'textfield',readOnly:true,id:'wsbbm',style:'margin:5px 0px 5px 5px',fieldLabel:'设备编码',labelAlign:'right',labelWidth : 80,width:240},
            { xtype:'button',text:'..',style:'margin:5px 0px 5px 0px',handler:getEQU},
            { xtype:'textfield',readOnly:true,id:'wsbmc',style:'margin:5px 5px 5px 5px',fieldLabel:'设备名称',labelAlign:'right',labelWidth : 80,width:260}
        ]},
        {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[
            { xtype:'textfield',readOnly:true,id:'wjsdw',style:'margin:5px 5px 5px 5px',fieldLabel:'施工单位',labelAlign:'right',labelWidth : 80,width:260},
            { xtype:'textfield',readOnly:true,id:'wgcfzr',style:'margin:5px 5px 5px 5px',fieldLabel:'工程负责人',labelAlign:'right',labelWidth : 80,width:260}
        ]},
        {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[
            { xtype:'datefield',readOnly:true,id:'wkssj',format:'Y-m-d h:i:s',style:'margin:5px 5px 5px 5px',fieldLabel:'开始时间',value:new Date(),labelAlign:'right',labelWidth : 80,width:260},
            { xtype:'datefield',readOnly:true,id:'wjssj',format:'Y-m-d h:i:s',style:'margin:5px 5px 5px 5px',fieldLabel:'结束时间',value:new Date(),labelAlign:'right',labelWidth : 80,width:260}
        ]},
        {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[
            { xtype:'textarea',readOnly:true,id:'wgcnr',style:'margin:5px 5px 5px 5px',fieldLabel:'工程内容',labelAlign:'right',labelWidth : 80,width:530,height:80}
        ]},
        jhyggrid,
        jhwlgrid,
        jjpbgrid,
        {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[
            { xtype:'textarea',readOnly:true,id:'sgyc',style:'margin:5px 5px 5px 5px',fieldLabel:'事故预测',labelAlign:'right',labelWidth : 80,width:530,height:80}
        ]},
        {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[
            { xtype:'textarea',readOnly:true,id:'aqdc',style:'margin:5px 5px 5px 5px',fieldLabel:'安全对策',labelAlign:'right',labelWidth : 80,width:530,height:80}
        ]}
        ],
    buttons:[{
        text:'关闭',
        icon : imgpath + '/cross.png',
        handler:OnBtnClose
    }]
});
var panel1 = Ext.create('Ext.panel.Panel',{
    frame : true,
    layout:'column',
    bodyPadding : 5,
    id : 'panel1',
    width : '100%',
    baseCls:'my-panel-noborder',
    defaults : {
        labelWidth : 35,
        labelAlign : 'right'
    },
    items:[
        { xtype : 'button',text : '详情查看',style : { margin : '0px 0px 0px 10px' },icon : imgpath + '/edit.png',handler:OnBtnUpdate}
    ]
});
var panel2 = Ext.create('Ext.panel.Panel',{
    frame : true,
    layout:'column',
    baseCls:'my-panel-noborder',
    bodyPadding : 5,
    id : 'panel2',
    width : '100%',
    defaults : {
        labelWidth : 35,
        labelAlign : 'right'
    }
});
var panelpic = Ext.create('Ext.panel.Panel',{
    frame : true,
    layout:'vbox',
    title:'工程分解',
    region:'center',
    bodyPadding : 5,
    id : 'panelpic',
    width : '100%',
    height:500,
    defaults : {
        labelWidth : 35,
        labelAlign : 'right'
    },
    items:[panel1,panel2]
});
var grid1=Ext.create('Ext.grid.Panel',{
    region:'center',
    width:'100%',
    store:gridStore,
    id:'grid1',
    height:260,
    style:'margin:0px 0px 5px 0px',
    autoScroll: true,
    columnLines: true,
    selModel:{
        mode:'singel',
        selType:'checkboxmodel'
    },
    columns:[
        { text: '专业',width:200,dataIndex:'V_MAJOR_NAME', align: 'center',renderer:Atleft },
        { text: '工程项目编码',width:200,dataIndex:'V_PROJECT_CODE', align: 'center',renderer:Atleft },
        { text: '工程项目名称',width:200,dataIndex:'V_PROJECT_NAME', align: 'center',renderer:Atleft },
        { text: '年度投资（万元）',width:200,dataIndex:'V_BUDGET_MONEY', align: 'center',renderer:Atleft },
        { text: '工程主要内容',width:200,dataIndex:'V_CONTENT', align: 'center',renderer:Atleft },
        { text: 'WBS',width:200,dataIndex:'V_WBS_CODE', align: 'center',renderer:Atleft },
        { text: '开工时间',width:200,dataIndex:'V_DATE_B', align: 'center',renderer:Atleft },
        { text: '竣工时间',width:200,dataIndex:'V_DATE_E', align: 'center',renderer:Atleft },
        { text: '建设单位',width:200,dataIndex:'V_BUILD_DEPT', align: 'center',renderer:Atleft },
        { text: '建设单位工程负责人',width:200,dataIndex:'V_BULID_PERSON', align: 'center',renderer:Atleft }
    ],
    listeners:{
        'itemclick':function(a,b,c){
            guid= b.data.V_GUID;
            Ext.data.StoreManager.lookup('ganttStore').load({
                params: {
                    V_V_GUID_FXJH:guid,
                    V_BY1: "",
                    V_BY2: "",
                    V_BY3:""
                }
            });
        }
    }
});

var panelup = Ext.create('Ext.panel.Panel',{
    frame : true,
    layout:'vbox',
    region:'center',
    baseCls:'my-panel-noborder',
    bodyPadding : 5,
    id : 'panelup',
    width : '100%',
    height:'40%',
    defaults : {
        labelWidth : 35,
        labelAlign : 'right'
    },
    items:[panel,grid1,panelpic]
});


Ext.onReady(function() {
    Ext.QuickTips.init();
    Ext.create('Ext.container.Viewport', {
        layout : 'border',
        id:'viewport',
        items : [panelup]
    });
    Ext.data.StoreManager.lookup('ckStore').on('load', function(){
        Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
        Ext.getCmp('wck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));

    });
    Ext.data.StoreManager.lookup('zyStore').on('load', function(){
        Ext.getCmp('zy').select(Ext.data.StoreManager.lookup('zyStore').getAt(0));

    });
    Ext.data.StoreManager.lookup('zyqStore').on('load', function(){
        Ext.getCmp('wzyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));

    });
    Ext.data.StoreManager.lookup('zyStore').on('load', function(){
        Ext.getCmp('wzy').select(Ext.data.StoreManager.lookup('zyStore').getAt(0));

    });
    zyStore.load({
        params:{

        }
    });
    Ext.getCmp('wck').on('change',function(){
        zyqStore.load({
            params:{
                V_DEPTCODE : Ext.getCmp('wck').getValue(),
                V_DEPTTYPE: '[主体作业区]',
                V_V_PERSON : Ext.util.Cookies.get('v_personcode')
            }
        });
    });
    Ext.data.StoreManager.lookup('ganttStore').on('load', function(a,b,c,d,e){
        Ext.getCmp('panelpic').remove(Ext.getCmp('grid'), true);
        Ext.getCmp('panelpic').doLayout();
        var record=Ext.data.StoreManager.lookup('ganttStore').data.items;
        var starttime='';
        var endtime='';
        for(var i=0;i<record.length;i++){
            if(i==0){
                starttime=record[0].data.V_DATE_B;
                endtime=record[0].data.V_DATE_E;
            }else{
                if(record[i].data.V_DATE_B<starttime){
                    starttime=record[i].data.V_DATE_B;
                }
                if(record[i].data.V_DATE_E>endtime){
                    endtime=record[i].data.V_DATE_E;
                }
            }
        }
        list=[];
        cmItems = [];
        var ganttStore = Ext.data.StoreManager.lookup('ganttStore');
        for (var i = 0; i < ganttStore.getCount(); i++) {
            var myData = new Array();
            var records = ganttStore.getAt(i);
            myData.push('r' + (i + 1), records.get('V_DATE_B').substring(0, 10), records.get('V_DATE_E').substring(0, 10), records.get('V_PROJECT_NAME'), '#FF00FF',records.get('V_GUID'),records.get('V_PROJECT_CODE'),records.get('V_GUID_P'));
            list.push(myData);
        }
        store = Ext.create('Ext.data.ArrayStore', {
            fields: [
                {name: 'ResourceId'},
                {name: 'StartDate'},
                {name: 'EndDate'},
                {name: 'Name'},
                {name: 'mycolor'},
                {name: 'id'},
                {name: 'Code'},
                {name: 'pid'}
            ],
            data: list
        });
        cmItems = [];
        var vStart = new Date(starttime);
        var vEnd = new Date(endtime);
        cmItems.push({
            text: '工程名称',
            locked: true,
            width: 200,
            dataIndex: 'Name'

        });
        var vTmpDate = new Date(vStart.getFullYear(), vStart.getMonth(), vStart.getDate());
        var dateItems = [];
        var vmonth = vTmpDate.getMonth();
        var vTmpMonth;

        while (vTmpDate < vEnd) {
            vTmpMonth = vTmpDate.getMonth();
            var vzm = '';
            if (vTmpDate.getDay() == 0 || vTmpDate.getDay() == 6) {

                vzm = 'background:#A6FFA6;';
            }

            if (vTmpMonth == vmonth) {
                dateItems.push({text: vTmpDate.getDate().toString(), style: vzm, width: 25});
            } else {
                var vyear = vTmpDate.getFullYear();
                if (vmonth == 11) {
                    vyear -= 1;
                }
                cmItems.push({text: vyear.toString() + '年' + (vmonth + 1).toString() + '月', columns: dateItems});
                vmonth = vTmpMonth;
                dateItems = [];
                dateItems.push({text: vTmpDate.getDate().toString(), style: vzm, width: 25});
            }
            vTmpDate = new Date((vTmpDate / 1000 + 86400) * 1000);
        }
        if (vTmpMonth == vmonth) {
            cmItems.push({
                text: vTmpDate.getFullYear().toString() + '年' + (vmonth + 1).toString() + '月',
                columns: dateItems
            });
        }

        cmItems.push({
            text: '',
            width: 0, dataIndex: 'mycolor',
            renderer: function (value, metaData, record) {

                var startd = new Date(record.data['StartDate']);
                var endd = new Date(record.data['EndDate']);
                if (startd < vStart) {
                    startd = new Date(vStart);
                }
                if (startd > vEnd) {
                    startd = new Date(vEnd);
                }
                if (endd < vStart) {
                    endd = new Date(vStart);
                }
                if (endd > vEnd) {
                    endd = new Date(vEnd);
                }
                if (endd < startd) {
                    endd = new Date(startd);
                }
                if (endd <= today) {

                    var dif = startd.getTime() - vStart.getTime();
                    var vleft = (dif / (86400 * 1000)) * 25;
                    dif = endd.getTime() - startd.getTime();
                    var vwidth = (dif / (86400 * 1000)) * 25;
                    var gtt = '<div style="left:' + vleft.toString() + 'px;height:21px;width:' + vwidth.toString() + 'px;background-color:green;" class="sch-event"><div  class="sch-event-inner">' + record.data['Name'] + '</div></div>';
                    return gtt;
                }
                if (today <= startd) {

                    var dif = startd.getTime() - vStart.getTime();
                    var vleft = (dif / (86400 * 1000)) * 25;
                    dif = endd.getTime() - startd.getTime();
                    var vwidth = (dif / (86400 * 1000)) * 25;
                    var gtt = '<div style="left:' + vleft.toString() + 'px;height:21px;width:' + vwidth.toString() + 'px;background-color:' + record.data['mycolor'] + ';" class="sch-event"><div  class="sch-event-inner">' + record.data['Name'] + '</div></div>';
                    return gtt;
                }

                if (startd < today && today < endd) {
                    var nowtime2 = Ext.Date.format(new Date(), 'Y-m-d 00:00:00')
                    var dif = startd.getTime() - vStart.getTime();
                    var vleft = (dif / (86400 * 1000)) * 25;
                    dif = today.getTime() - startd.getTime();
                    var vwidth1 = (dif / (86400 * 1000)) * 25;
                    dif = endd.getTime() - today.getTime();
                    var vwidth2 = (dif / (86400 * 1000)) * 25;
                    dif = endd.getTime() - startd.getTime();
                    var vwidth = (dif / (86400 * 1000)) * 25;

                    var bfb = Math.round(((vwidth1 / vwidth)*100),0);
                    var gtt = '<div style="left:' + vleft.toString() + 'px;height:21px;width:' + vwidth.toString() + 'px;" class = "event"><div style="width:' + vwidth1.toString() + 'px;border:0px;height:21px;margin:0px;background-color:green;" class = "event">' +   ' 完成度' + bfb + '%</div><div class="inner" style="float:right;width:' + vwidth2.toString() + 'px;height:21px;border:0px;margin:0px;background-color:' + record.data['mycolor'] + ';">'+ record.data['Name'] + '</div></div>';



                    return gtt;
                }

            }
        });
        grid = Ext.create('Ext.grid.Panel', {
            id: 'grid',
            store: store,
            columnLines: true,
            columns: cmItems,
            height: 500,
            width: '100%',
            renderTo: Ext.getBody()
        });
        Ext.getCmp('panelpic').add(grid);
        Ext.getCmp('panelpic').doLayout();

    });
});
function OnBtnAdd(){
    type="add";
    Ext.getCmp('fxjhbm').setValue("");
    Ext.getCmp('fxjhmc').setValue("");
    Ext.getCmp('fxjhguid').setValue("");
    Ext.getCmp('sjgcbm').setValue("");
    Ext.getCmp('sjgcmc').setValue("");
    Ext.getCmp('sjgcguid').setValue("");
    Ext.getCmp('guid').setValue("");
    Ext.getCmp('wgcbm').setValue("");
    Ext.getCmp('wgcmc').setValue("");
    Ext.getCmp('wys').setValue("");
    Ext.getCmp('wsbbm').setValue("");
    Ext.getCmp('wsbmc').setValue("");
    Ext.getCmp('wjsdw').setValue("");
    Ext.getCmp('wgcfzr').setValue("");
    Ext.getCmp('wkssj').setValue("");
    Ext.getCmp('wjssj').setValue("");
    Ext.getCmp('wgcnr').setValue("");
    Ext.getCmp('sgyc').setValue("");
    Ext.getCmp('aqdc').setValue("");
    Ext.getCmp('wgz').setValue("");
    Ext.getCmp('wrs').setValue("");
    Ext.getCmp('wgs').setValue("");
    Ext.getCmp('wsm').setValue("");
    Ext.getCmp('wwlbm').setValue("");
    Ext.getCmp('wwlmc').setValue("");
    Ext.getCmp('wjldw').setValue("");
    Ext.getCmp('wsl').setValue("");
    Ext.getCmp('wgg').setValue("");
    Ext.getCmp('wdj').setValue("");
    Ext.getCmp('wjjbm').setValue("");
    Ext.getCmp('wjjmc').setValue("");
    Ext.getCmp('wjldw2').setValue("");
    Ext.getCmp('wsl2').setValue("");
    jhygs=[];jhwls=[];jjpbs=[];
    Ext.data.StoreManager.lookup('jhygStore').loadData(jhygs);
    Ext.data.StoreManager.lookup('jhwlStore').loadData(jhwls);
    Ext.data.StoreManager.lookup('jjpbStore').loadData(jjpbs);
    var record=Ext.getCmp('grid1').getSelectionModel().getSelection();
    if(record.length==0){
        alert('请在上表选择放行计划');
        return;
    }
    var treenode=Ext.getCmp('grid').getSelectionModel().getSelection();
    if(treenode.length!=0){
        Ext.getCmp('sjgcguid').setValue(treenode[0].data.id);
        Ext.getCmp('sjgcmc').setValue(treenode[0].data.Name);
        Ext.getCmp('sjgcbm').setValue(treenode[0].data.Code);
    }else{
        Ext.getCmp('sjgcguid').setValue(-1);
    }
    Ext.Ajax.request({
        url: AppUrl + 'PM_01/PM_RET_DATETIME',
        method: 'POST',
        async : false,
        params:{
        },
        success:function(resp){
            var resp = Ext.decode(resp.responseText);
            Ext.getCmp('wyear').select(resp.list[0].V_YEAR);
            Ext.getCmp('wmonth').select(resp.list[0].V_MONTH);
            Ext.getCmp('wkssj').setValue(new Date(resp.list[0].V_DATE));
            Ext.getCmp('wjssj').setValue(new Date(resp.list[0].V_DATE));
        }
    });
    Ext.getCmp('fxjhbm').setValue(record[0].data.V_PROJECT_CODE);
    Ext.getCmp('fxjhmc').setValue(record[0].data.V_PROJECT_NAME);
    Ext.getCmp('fxjhguid').setValue(record[0].data.V_GUID);


    Ext.getCmp('lrwindow').show();
}
function OnBtnDelete(){
    var treenode=Ext.getCmp('grid').getSelectionModel().getSelection();
    if(treenode.length==0){
        alert('请选择要删除的工程');
        return;
    }
    Ext.Ajax.request({
        url: AppUrl + 'PM_01/PRO_PM_EQUREPAIRPLAN_TREE_DEL',
        method: 'POST',
        async : false,
        params:{
            V_V_IP:GetIP().ip,
            V_V_PERCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_PERNAME:Ext.util.Cookies.get('v_personname'),
            V_V_GUID:treenode[0].data.id
        },
        success:function(resp){
            var resp = Ext.decode(resp.responseText);
            if(resp.v_info=='success'){
                Ext.data.StoreManager.lookup('ganttStore').load({
                    params: {
                        V_V_GUID_FXJH:guid,
                        V_BY1: "",
                        V_BY2: "",
                        V_BY3:""
                    }
                });
            }else{
                alert(resp.v_info)
            }
        }
    });
}
function QueryGrid(){
    if(Ext.getCmp('gcbm').getValue() =="" || Ext.getCmp('gcbm').getValue() == null){
        Ext.data.StoreManager.lookup('gridStore').load({
            params:{
                V_V_YEAR:Ext.getCmp('year').getValue(),
                V_V_MONTH:Ext.getCmp('month').getValue(),
                V_V_PERCODE:Ext.util.Cookies.get('v_personcode'),
                V_V_ORGCODE:Ext.getCmp('ck').getValue(),
                V_V_SPECIALTY:Ext.getCmp('zy').getValue(),
                V_V_PROJECT_CODE:Ext.getCmp('gcbm').getValue(),
                V_V_PROJECT_NAME:Ext.getCmp('gcmc').getValue(),
                V_V_CONTENT:Ext.getCmp('gcnr').getValue(),
                V_V_BY1:"",
                V_V_BY2:""
            }
        });
    }else{
        Ext.data.StoreManager.lookup('gridStore').load({
            params:{
                V_V_YEAR:'%',
                V_V_MONTH:'%',
                V_V_PERCODE:'%',
                V_V_ORGCODE:'%',
                V_V_SPECIALTY:'%',
                V_V_PROJECT_CODE:Ext.getCmp('gcbm').getValue(),
                V_V_PROJECT_NAME:'%',
                V_V_CONTENT:'%',
                V_V_BY1:'%',
                V_V_BY2:'%'
            }
        });
    }

}
function Atleft(value, metaData) {
    metaData.style = 'text-align: left';
    return value;
}
function AtRight(value, metaData) {
    metaData.style = 'text-align: right';
    return value;
}
function Delete(value,metaData,record,rowIdx){
    metaData.style = 'text-align: center';
    return '<a href=javascript:OnBtnRemove(\''+ rowIdx + '\');>删除</a>';
}
function OnBtnRemove(idx){
    var data=[];
    if(type=='add'){
        for(var i=0;i<jhygs.length;i++){
            if(i!=idx){
                data.push(jhygs[i]);
            }
        }
        jhygs=[];
        jhygs=data;
        Ext.data.StoreManager.lookup('jhygStore').loadData(jhygs);
    }else if(type=='edit'){
        var id=jhygs[idx].id;
        var ygid=jhygs[idx].guid;
        Ext.Ajax.request({
            url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_YG_DEL',
            method: 'POST',
            async : false,
            params:{
                V_I_ID:id
            },
            success:function(resp){
                var resp = Ext.decode(resp.responseText);
                if(resp.success){
                    Ext.Ajax.request({
                        url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_YG_VIEW',
                        method: 'POST',
                        async : false,
                        params:{
                            V_V_GUID:ygid
                        },
                        success:function(resp){
                            var resp = Ext.decode(resp.responseText);
                            jhygs=[];
                            for(var i=0;i<resp.list.length;i++){
                                jhygs.push({
                                    gz:resp.list[i].V_GZ,
                                    rs:resp.list[i].V_NUM,
                                    gs:resp.list[i].V_TIME,
                                    sm:resp.list[i].V_MEMO,
                                    id:resp.list[i].I_ID,
                                    guid:resp.list[i].V_GUID
                                });
                            }
                            Ext.data.StoreManager.lookup('jhygStore').loadData(jhygs);
                        }
                    });
                }

            }
        });
    }

}
function Delete2(value,metaData,record,rowIdx){
    metaData.style = 'text-align: center';
    return '<a href=javascript:OnBtnRemove2(\''+ rowIdx + '\');>删除</a>';
}
function OnBtnRemove2(idx){
    var data=[];
    if(type=='add'){
        for(var i=0;i<jhwls.length;i++){
            if(i!=idx){
                data.push(jhwls[i]);
            }
        }
        jhwls=[];
        jhwls=data;
        Ext.data.StoreManager.lookup('jhwlStore').loadData(jhwls);
    }else if(type=='edit'){
        var id=jhwls[idx].id;
        var wlid=jhwls[idx].guid;
        Ext.Ajax.request({
            url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_WL_DEL',
            method: 'POST',
            async : false,
            params:{
                V_I_ID:id
            },
            success:function(resp){
                var resp = Ext.decode(resp.responseText);
                if(resp.success){
                    Ext.Ajax.request({
                        url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_WL_VIEW',
                        method: 'POST',
                        async : false,
                        params:{
                            V_V_GUID:wlid
                        },
                        success:function(resp){
                            var resp = Ext.decode(resp.responseText);
                            jhwls=[];
                            for(var i=0;i<resp.list.length;i++){
                                jhwls.push({
                                    wlbm:resp.list[i].V_WL_CODE,
                                    wlmc:resp.list[i].V_WL_NAME,
                                    jldw:resp.list[i].V_JLDW,
                                    sl:resp.list[i].V_NUM,
                                    gg:resp.list[i].V_GGXH,
                                    dj:resp.list[i].V_DJ,
                                    id:resp.list[i].I_ID,
                                    guid:resp.list[i].V_GUID

                                });
                            }
                            Ext.data.StoreManager.lookup('jhwlStore').loadData(jhwls);
                        }
                    });
                }

            }
        });
    }
}
function Delete3(value,metaData,record,rowIdx){
    metaData.style = 'text-align: center';
    return '<a href=javascript:OnBtnRemove3(\''+ rowIdx + '\');>删除</a>';
}
function OnBtnRemove3(idx){
    var data=[];
    if(type=='add'){
        for(var i=0;i<jjpbs.length;i++){
            if(i!=idx){
                data.push(jjpbs[i]);
            }
        }
        jjpbs=[];
        jjpbs=data;
        Ext.data.StoreManager.lookup('jjpbStore').loadData(jjpbs);
    }else if(type=='edit'){
        var id=jjpbs[idx].id;
        var jjid=jjpbs[idx].guid;
        Ext.Ajax.request({
            url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_JJ_DEL',
            method: 'POST',
            async : false,
            params:{
                V_I_ID:id
            },
            success:function(resp){
                var resp = Ext.decode(resp.responseText);
                if(resp.success){
                    Ext.Ajax.request({
                        url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_JJ_VIEW',
                        method: 'POST',
                        async : false,
                        params:{
                            V_V_GUID:jjid
                        },
                        success:function(resp){
                            var resp = Ext.decode(resp.responseText);
                            jjpbs=[];
                            for(var i=0;i<resp.list.length;i++){
                                jjpbs.push({
                                    jjbm:resp.list[i].V_JJ_CODE,
                                    jjmc:resp.list[i].V_JJ_NAME,
                                    jldw:resp.list[i].V_JLDW,
                                    sl:resp.list[i].V_NUM,
                                    id:resp.list[i].I_ID,
                                    guid:resp.list[i].V_GUID
                                });
                            }
                            Ext.data.StoreManager.lookup('jjpbStore').loadData(jjpbs);
                        }
                    });
                }

            }
        });
    }

}
function OnBtnClose(){
    Ext.getCmp('lrwindow').hide();
}
function OnBtnSave(){
    var groupguid='';
    var ygguid='';
    var wlguid='';
    var jjguid='';
    if(type=='add'){
        groupguid=-1;
    }else if(type=='edit'){
        groupguid=treeguid;
    }
    Ext.Ajax.request({
        url: AppUrl + 'PM_01/PRO_PM_EQUREPAIRPLAN_TREE_SET',
        method: 'POST',
        async : false,
        params:{
            V_V_IP:'127.0.0.1',
            V_V_PERCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_PERNAME:Ext.util.Cookies.get('v_personname'),
            V_V_GUID:groupguid,
            V_V_ORGCODE:Ext.getCmp('wck').getValue(),
            V_V_DEPTCODE:Ext.getCmp('wzyq').getValue(),
            V_V_YEAR:Ext.getCmp('wyear').getValue(),
            V_V_MONTH:Ext.getCmp('wmonth').getValue(),
            V_V_PROJECT_CODE:Ext.getCmp('wgcbm').getValue(),
            V_V_PROJECT_NAME:Ext.getCmp('wgcmc').getValue(),
            V_V_PLAN_MONEY:Ext.getCmp('wys').getValue(),
            V_V_DATE_DESIGN:Ext.getCmp('wgcmc').getValue(),
            V_V_CONTENT:Ext.getCmp('wgcnr').getValue(),
            V_V_DATE_DESIGN:"",
            V_V_DATE_INVITE:"",
            V_V_DATE_B:Ext.Date.format(Ext.getCmp('wkssj').getValue(),'Y-m-d H:i:s'),
            V_V_DATE_E:Ext.Date.format(Ext.getCmp('wjssj').getValue(),'Y-m-d H:i:s'),
            V_V_BUDGET_MONEY:"",
            V_V_PROGRESS:"",
            V_V_BUILD_NAMAGER:"",
            V_V_BULID_PERSON:Ext.getCmp('wgcfzr').getValue(),
            V_V_DIRECT_PERSON:"",
            V_V_EQUCODE:Ext.getCmp('wsbbm').getValue(),
            V_V_EQUNAME:Ext.getCmp('wsbmc').getValue(),
            V_V_SPECIALTY:Ext.getCmp('wzy').getValue(),
            V_V_BUILD_DEPT:Ext.getCmp('wjsdw').getValue(),
            V_V_GUID_P:Ext.getCmp('sjgcguid').getValue(),
            V_V_PROJECT_CODE_P:Ext.getCmp('sjgcbm').getValue(),
            V_V_PROJECT_NAME_P:Ext.getCmp('sjgcmc').getValue(),
            V_V_GUID_FXJH:Ext.getCmp('fxjhguid').getValue(),
            V_V_PROJECT_CODE_FXJH:Ext.getCmp('fxjhbm').getValue(),
            V_V_PROJECT_NAME_FXJH:Ext.getCmp('fxjhmc').getValue(),
            V_V_SGYC:Ext.getCmp('sgyc').getValue(),
            V_V_AQDC:Ext.getCmp('aqdc').getValue()
        },
        success:function(resp){
            var resp = Ext.decode(resp.responseText);
            if(resp.v_info=='success'){
                for(var i=0;i<jhygs.length;i++){
                    if(type=='add'){
                        ygguid=-1;
                    }else if(type=='edit'){
                        ygguid=jhygs[i].id;
                    }
                    Ext.Ajax.request({
                        url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_YG_SET',
                        method: 'POST',
                        async : false,
                        params:{
                            V_I_ID:ygguid,
                            V_V_GUID:resp.guid,
                            V_V_GZ:jhygs[i].gz,
                            V_V_NUM:jhygs[i].rs,
                            V_V_TIME:jhygs[i].gs,
                            V_V_MEMO:jhygs[i].sm
                        },
                        success:function(resp){
                            var resp = Ext.decode(resp.responseText);

                        }
                    });
                }
                for(var i=0;i<jhwls.length;i++){
                    if(type=='add'){
                        wlguid=-1;
                    }else if(type=='edit'){
                        wlguid=jhwls[i].id;
                    }
                    Ext.Ajax.request({
                        url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_WL_SET',
                        method: 'POST',
                        async : false,
                        params:{
                            V_I_ID:wlguid,
                            V_V_GUID:resp.guid,
                            V_V_WL_CODE:jhwls[i].wlbm,
                            V_V_WL_NAME:jhwls[i].wlmc,
                            V_V_JLDW:jhwls[i].jldw,
                            V_V_NUM:jhwls[i].sl,
                            V_V_GGXH:jhwls[i].gg,
                            V_V_DJ:jhwls[i].dj
                        },
                        success:function(resp){
                            var resp = Ext.decode(resp.responseText);

                        }
                    });
                }
                for(var i=0;i<jjpbs.length;i++){
                    if(type=='add'){
                        jjguid=-1;
                    }else if(type=='edit'){
                        jjguid=jjpbs[i].id;
                    }
                    Ext.Ajax.request({
                        url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_JJ_SET',
                        method: 'POST',
                        async : false,
                        params:{
                            V_I_ID:jjguid,
                            V_V_GUID:resp.guid,
                            V_V_JJ_CODE:jjpbs[i].jjbm,
                            V_V_JJ_NAME:jjpbs[i].jjmc,
                            V_V_JLDW:jjpbs[i].jldw,
                            V_V_NUM:jjpbs[i].sl
                        },
                        success:function(resp){
                            var resp = Ext.decode(resp.responseText);

                        }
                    });
                }
                Ext.data.StoreManager.lookup('ganttStore').load({
                    params: {
                        V_V_GUID_FXJH:guid,
                        V_BY1: "",
                        V_BY2: "",
                        V_BY3:""
                    }
                });
                Ext.getCmp('lrwindow').hide();
            }
        }
    });
}
function getEQU(){
    var owidth = window.document.body.offsetWidth-200;
    var oheight = window.document.body.offsetHeight-100 ;
    window.open(AppUrl+'page/PM_090101/index.html?V_DEPTCODE=' + Ext.util.Cookies.get('v_deptcode') , '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}
function getEquipReturnValue(ret){
    var str =ret.split('^');
    Ext.getCmp('wsbbm').setValue(str[0]);
    Ext.getCmp('wsbmc').setValue(str[1]);
}
function getMat(){
    var owidth = window.document.body.offsetWidth-200;
    var oheight = window.document.body.offsetHeight-100 ;
    window.open(AppUrl+'page/PM_090101/index.html?V_DEPTCODE=' + Ext.util.Cookies.get('v_deptcode') , '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}
function getEquipReturnValue(ret){
    var str =ret.split('^');
    Ext.getCmp('wsbbm').setValue(str[0]);
    Ext.getCmp('wsbmc').setValue(str[1]);
}
function addJHYG(){
    jhygs.push({
        gz:Ext.getCmp('wgz').getValue(),
        rs:Ext.getCmp('wrs').getValue(),
        gs:Ext.getCmp('wgs').getValue(),
        sm:Ext.getCmp('wsm').getValue()
    });
    Ext.data.StoreManager.lookup('jhygStore').loadData(jhygs);
}
function addJHWL(){
    jhwls.push({
        wlbm:Ext.getCmp('wwlbm').getValue(),
        wlmc:Ext.getCmp('wwlmc').getValue(),
        jldw:Ext.getCmp('wjldw').getValue(),
        sl:Ext.getCmp('wsl').getValue(),
        gg:Ext.getCmp('wgg').getValue(),
        dj:Ext.getCmp('wdj').getValue()
    });
    Ext.data.StoreManager.lookup('jhwlStore').loadData(jhwls);
}
function addJJPB(){
    jjpbs.push({
        jjbm:Ext.getCmp('wjjbm').getValue(),
        jjmc:Ext.getCmp('wjjmc').getValue(),
        jldw:Ext.getCmp('wjldw2').getValue(),
        sl:Ext.getCmp('wsl2').getValue()
    });
    Ext.data.StoreManager.lookup('jjpbStore').loadData(jjpbs);
}
function OnBtnUpdate(){
    var record=Ext.getCmp('grid1').getSelectionModel().getSelection();
    if(record.length==0){
        alert('请在上表选择放行计划');
        return;
    }
    var treenode=Ext.getCmp('grid').getSelectionModel().getSelection();
    if(treenode.length==0){
        alert('请选择工程');
        return;
    }
    type="edit";
    Ext.getCmp('fxjhbm').setValue("");
    Ext.getCmp('fxjhmc').setValue("");
    Ext.getCmp('fxjhguid').setValue("");
    Ext.getCmp('sjgcbm').setValue("");
    Ext.getCmp('sjgcmc').setValue("");
    Ext.getCmp('sjgcguid').setValue("");
    Ext.getCmp('guid').setValue("");
    Ext.getCmp('wgcbm').setValue("");
    Ext.getCmp('wgcmc').setValue("");
    Ext.getCmp('wys').setValue("");
    Ext.getCmp('wsbbm').setValue("");
    Ext.getCmp('wsbmc').setValue("");
    Ext.getCmp('wjsdw').setValue("");
    Ext.getCmp('wgcfzr').setValue("");
    Ext.getCmp('wkssj').setValue("");
    Ext.getCmp('wjssj').setValue("");
    Ext.getCmp('wgcnr').setValue("");
    Ext.getCmp('sgyc').setValue("");
    Ext.getCmp('aqdc').setValue("");
    jhygs=[];jhwls=[];jjpbs=[];
    treeguid=treenode[0].data.id;
    Ext.Ajax.request({
        url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_YG_VIEW',
        method: 'POST',
        async : false,
        params:{
            V_V_GUID:treenode[0].data.id
        },
        success:function(resp){
            var resp = Ext.decode(resp.responseText);
            for(var i=0;i<resp.list.length;i++){
                jhygs.push({
                    gz:resp.list[i].V_GZ,
                    rs:resp.list[i].V_NUM,
                    gs:resp.list[i].V_TIME,
                    sm:resp.list[i].V_MEMO,
                    id:resp.list[i].I_ID,
                    guid:resp.list[i].V_GUID
                });
            }
            Ext.data.StoreManager.lookup('jhygStore').loadData(jhygs);
        }
    });
    Ext.Ajax.request({
        url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_WL_VIEW',
        method: 'POST',
        async : false,
        params:{
            V_V_GUID:treenode[0].data.id
        },
        success:function(resp){
            var resp = Ext.decode(resp.responseText);
            for(var i=0;i<resp.list.length;i++){
                jhwls.push({
                    wlbm:resp.list[i].V_WL_CODE,
                    wlmc:resp.list[i].V_WL_NAME,
                    jldw:resp.list[i].V_JLDW,
                    sl:resp.list[i].V_NUM,
                    gg:resp.list[i].V_GGXH,
                    dj:resp.list[i].V_DJ,
                    id:resp.list[i].I_ID,
                    guid:resp.list[i].V_GUID
                });
            }
            Ext.data.StoreManager.lookup('jhwlStore').loadData(jhwls);
        }
    });
    Ext.Ajax.request({
        url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_JJ_VIEW',
        method: 'POST',
        async : false,
        params:{
            V_V_GUID:treenode[0].data.id
        },
        success:function(resp){
            var resp = Ext.decode(resp.responseText);
            for(var i=0;i<resp.list.length;i++){
                jjpbs.push({
                    jjbm:resp.list[i].V_JJ_CODE,
                    jjmc:resp.list[i].V_JJ_NAME,
                    jldw:resp.list[i].V_JLDW,
                    sl:resp.list[i].V_NUM,
                    id:resp.list[i].I_ID,
                    guid:resp.list[i].V_GUID
                });
            }
            Ext.data.StoreManager.lookup('jjpbStore').loadData(jjpbs);
        }
    });
    Ext.Ajax.request({
        url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_TREE_GET',
        method: 'POST',
        async : false,
        params:{
            V_V_GUID:treenode[0].data.id,
            V_BY1:"",
            V_BY2:"",
            V_BY3:""
        },
        success:function(resp){
            var resp = Ext.decode(resp.responseText);
            Ext.getCmp('fxjhbm').setValue(resp.list[0].V_PROJECT_CODE_FXJH);
            Ext.getCmp('fxjhmc').setValue(resp.list[0].V_PROJECT_NAME_FXJH);
            Ext.getCmp('fxjhguid').setValue(resp.list[0].V_GUID_FXJH);
            Ext.getCmp('sjgcbm').setValue(resp.list[0].V_PROJECT_CODE_P);
            Ext.getCmp('sjgcmc').setValue(resp.list[0].V_PROJECT_NAME_P);
            Ext.getCmp('sjgcguid').setValue(resp.list[0].V_GUID_P);
            Ext.getCmp('wyear').setValue(resp.list[0].V_YEAR);
            Ext.getCmp('wmonth').setValue(resp.list[0].V_MONTH);
            Ext.getCmp('guid').setValue(resp.list[0].V_GUID);
            Ext.getCmp('wck').select(resp.list[0].V_ORGCODE);
            Ext.getCmp('wzyq').select(resp.list[0].V_DEPTCODE);
            Ext.getCmp('wgcbm').setValue(resp.list[0].V_PROJECT_CODE);
            Ext.getCmp('wgcmc').setValue(resp.list[0].V_PROJECT_NAME);
            Ext.getCmp('wys').setValue(resp.list[0].V_PLAN_MONEY);
            Ext.getCmp('wzy').select(resp.list[0].V_SPECIALTY);
            Ext.getCmp('wsbbm').setValue(resp.list[0].V_EQUCODE);
            Ext.getCmp('wsbmc').setValue(resp.list[0].V_EQUNAME);
            Ext.getCmp('wjsdw').setValue(resp.list[0].V_BUILD_DEPT);
            Ext.getCmp('wgcfzr').setValue(resp.list[0].V_BULID_PERSON);
            Ext.getCmp('wkssj').setValue(new Date(resp.list[0].V_DATE_B));
            Ext.getCmp('wjssj').setValue(resp.list[0].V_DATE_E);
            Ext.getCmp('wgcnr').setValue(resp.list[0].V_CONTENT);
            Ext.getCmp('sgyc').setValue(resp.list[0].V_SGYC);
            Ext.getCmp('aqdc').setValue(resp.list[0].V_AQDC);

        }
    });
    Ext.getCmp('lrwindow').show();
}