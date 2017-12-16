/**
 * Created by lxm on 2017/8/9.
 * upadate by hp on 2017/9/9
 */
/**
 * Created by lxm on 2017/8/9.
 * upadate by hp on 2017/9/9
 */
var fxjhbm = null;
var genre = null;
var fxjhmc = null;
var fxjhguid = null;
var type = null;
var deptcode = null;
var sjgcbm = null;
var sjgcmc = null;
var sjgcguid = null;
var treeguid = null;
var zhugener = null;
var zigener = null;
var rownumber = null;
if (location.href.split('?')[1] != undefined) {
    fxjhbm = Ext.urlDecode(location.href.split('?')[1]).fxjhbm;
    fxjhmc = Ext.urlDecode(location.href.split('?')[1]).fxjhmc;
    fxjhguid = Ext.urlDecode(location.href.split('?')[1]).fxjhguid;
    type = Ext.urlDecode(location.href.split('?')[1]).type;
    deptcode = Ext.urlDecode(location.href.split('?')[1]).deptcode;
    genre = Ext.urlDecode(location.href.split('?')[1]).genre;
    sjgcbm = Ext.urlDecode(location.href.split('?')[1]).sjgcbm;
    sjgcmc = Ext.urlDecode(location.href.split('?')[1]).sjgcmc;
    sjgcguid = Ext.urlDecode(location.href.split('?')[1]).sjgcguid;
    treeguid = Ext.urlDecode(location.href.split('?')[1]).treeguid;
    rownumber = Ext.urlDecode(location.href.split('?')[1]).rownumber;
}
var dt = new Date();
var thisYear = dt.getFullYear();
var years = [];

for (var i = 2014; i <= thisYear + 1; i++) years.push([i,i]);
var months=[];
for (var i = 1; i <= 12; i++) months.push([i,i]);
var  yearmr=new Date().getFullYear();
var lastmonth=new Date().getMonth();
if (new Date().getMonth()+1==1)
{yearmr=yearmr-1;
    lastmonth=12;
}
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
var zynrs=[];
var zynrStore=Ext.create("Ext.data.Store", {
    id:'zynrStore',
    fields: ['nr'],
    data: zynrs,
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});
var zynrgrid=Ext.create('Ext.grid.Panel',{
    width:'60%',
    id:'zynrgrid',
    store:zynrStore,
    height:200,
    style:'margin:0px 0px 5px 0px',
    autoScroll: true,
    columnLines: true,
    columns:[
        { xtype : 'rownumberer',
            text : '序号',
            width : 50,
            align : 'center' },
        { text: '主要内容',width:380,dataIndex:'nr', align: 'center',renderer:Atleft },
        { text: '操作',width:100,dataIndex:'sm',align: 'center',renderer:Delete4 }
    ]
});
var jhyggrid=Ext.create('Ext.grid.Panel',{
    width:'100%',
    id:'jhyggrid',
    store:jhygStore,
    height:300,
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
    height:300,
    style:'margin:0px 0px 5px 0px',
    autoScroll: true,
    columnLines: true,
    columns:[
        { text: '物料编码',width:150,dataIndex:'wlbm', align: 'center',renderer:Atleft },
        { text: '物料名称',width:150,dataIndex:'wlmc', align: 'center',renderer:Atleft },
        { text: '规格',width:120,dataIndex:'gg', align: 'center',renderer:Atleft },
        { text: '计量单位',width:120,dataIndex:'jldw', align: 'center',renderer:Atleft },
        { text: '单价',width:100,dataIndex:'dj', align: 'center',renderer:AtRight },
        { text: '数量',width:100,dataIndex:'sl', align: 'center',renderer:AtRight },
        { text: '操作',width:80,align: 'center',renderer:Delete2 }
    ]
});
var jjpbgrid=Ext.create('Ext.grid.Panel',{
    width:'100%',
    id:'jjpbgrid',
    store:jjpbStore,
    height:300,
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
var panel = Ext.create('Ext.panel.Panel',{
    frame : true,
    layout:'column',
    region:'north',
    bodyPadding : 5,
    id : 'panel',
    width : '100%',
    baseCls:'my-panel-noborder',
    defaults : {
        labelWidth : 35,
        labelAlign : 'right'
    },
    items:[
        { xtype : 'button',text : '保存',style : { margin : '0px 0px 0px 10px' },icon : imgpath + '/saved.png',handler:OnBtnSave},
        { xtype : 'button',text : '关闭',style : { margin : '0px 0px 0px 10px' },icon : imgpath + '/cross.png',handler:OnBtnClose}
    ]
});
var tabpanel = Ext.create('Ext.tab.Panel', {
    id : 'tabpanel',
    region:'center',
    width : '100%',
    items : [ {
        title : '基础信息',
        id : 'jcxxtab',
        layout : 'vbox',
        border : false,
        frame:true,
        items : [
            {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[
                {
                    xtype:'textfield',
                    id:'fxjhbm',
                    fieldLabel:'放行计划编码',
                    readOnly:true,
                    labelAlign:'right',
                    labelWidth : 80,
                    fieldStyle : 'background-color:#e0e0e0;background-image:none;',
                    width:260,
                    style:'margin:15px 5px 5px 5px'
                },{
                    xtype:'textfield',
                    id:'fxjhmc',
                    fieldLabel:'放行计划名称',
                    labelAlign:'right',
                    readOnly:true,
                    labelWidth : 80,
                    fieldStyle : 'background-color:#e0e0e0;background-image:none;',
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
                },
                {
                    xtype:'textfield',
                    id:'sjgcbm',
                    fieldLabel:'上级工程编码',
                    labelAlign:'right',
                    labelWidth : 80,
                    readOnly:true,
                    fieldStyle : 'background-color:#e0e0e0;background-image:none;',
                    width:260,
                    style:'margin:15px 5px 5px 5px'
                },
                {
                    xtype:'textfield',
                    id:'sjgcmc',
                    fieldLabel:'上级工程名称',
                    labelAlign:'right',
                    labelWidth : 80,
                    readOnly:true,
                    fieldStyle : 'background-color:#e0e0e0;background-image:none;',
                    width:260,
                    style:'margin:15px 5px 5px 5px'
                }
            ]},
            {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[
                {
                    xtype:'textfield',
                    hidden:true,
                    id:'sjgcguid',
                    fieldLabel:'上级工程guid',
                    labelAlign:'right',
                    labelWidth : 80,
                    width:260
                },
                {id:'wyear',
                    xtype:'combo',
                    width:260,
                    fieldLabel:'年份',
                    store:years,
                    style:'margin:5px 5px 5px 5px',
                    displayField:'Item1',
                    valueField:'Item2',
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
                },
                { xtype: 'combo', fieldLabel: '厂矿',style:'margin:5px 5px 5px 5px',labelWidth : 80,width:260, id: 'wck', store: 'ckStore', editable: false, displayField: 'V_DEPTNAME',labelAlign:'right', valueField: 'V_DEPTCODE', queryMode: 'local' },
                { xtype: 'combo', fieldLabel: '作业区',style:'margin:5px 5px 5px 5px',labelWidth : 80,width:260, id: 'wzyq', store: 'zyqStore', editable: false, displayField: 'V_DEPTNAME',labelAlign:'right', valueField: 'V_DEPTCODE', queryMode: 'local' }
            ]},
            {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[
                { xtype:'textfield',id:'wgcbm',style:'margin:5px 5px 5px 5px',fieldLabel:'工程项目编码',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 80,width:260},
                { xtype:'textfield',id:'wgcmc',style:'margin:5px 5px 5px 5px',fieldLabel:'工程项目名称',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 80,width:260},
                { xtype:'textfield',id:'wys',style:'margin:5px 5px 5px 5px',fieldLabel:'预算（万元）',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 80,width:260},
                { xtype: 'combo', fieldLabel: '专业',style:'margin:5px 5px 5px 5px',labelWidth : 80,width:260, id: 'wzy', store: 'zyStore', editable: false, displayField: 'V_MAJOR_NAME',labelAlign:'right', valueField: 'V_MAJOR_CODE', queryMode: 'local' }
            ]},
            {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[
                { xtype:'textfield',id:'wsbbm',style:'margin:5px 0px 5px 5px',fieldLabel:'设备编码',fieldStyle : 'background-color:#e0e0e0;background-image:none;',labelAlign:'right',labelWidth : 80,width:240},
                { xtype:'button',text:'..',style:'margin:5px 0px 5px 0px',handler:getEQU},
                { xtype:'textfield',id:'wsbmc',style:'margin:5px 5px 5px 5px',fieldLabel:'设备名称',fieldStyle : 'background-color:#e0e0e0;background-image:none;',labelAlign:'right',labelWidth : 80,width:260},
                { xtype:'textfield',id:'wjsdw',style:'margin:5px 5px 5px 5px',fieldLabel:'施工单位',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 80,width:260},
                { xtype:'textfield',id:'wgcfzr',style:'margin:5px 5px 5px 5px',fieldLabel:'工程负责人',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 80,width:260}

            ]},
            {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[
                { xtype:'datefield',id:'wksrq',format:'Y-m-d',style:'margin:5px 5px 5px 5px',fieldLabel:'开始日期',value:new Date(),fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 80,width:260},
                { xtype:'timefield',id:'wkssj',format:'H:i:s',style:'margin:5px 5px 5px 5px',fieldLabel:'开始时间',value:new Date(),fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 80,width:260},
                { xtype:'datefield',id:'wjsrq',format:'Y-m-d',style:'margin:5px 5px 5px 5px',fieldLabel:'结束日期',value:new Date(),fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 80,width:260},
                { xtype:'timefield',id:'wjssj',format:'H:i:s',style:'margin:5px 5px 5px 5px',fieldLabel:'结束时间',value:new Date(),fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 80,width:260}
            ]},
            {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[
                { xtype:'textfield',id:'wnr',style:'margin:5px 5px 5px 5px',fieldLabel:'主要修理内容',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 80,width:530},
                { xtype:'button',text:'添加',style:'margin:5px 5px 5px 5px',handler:addZYNR}
            ]},zynrgrid
        ]
    }, {
        title : '计划用工',
        id : 'ygtab',
        layout : 'vbox',
        frame:true,
        border : false,
        items : [{xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[
            { xtype:'textfield',emptyText:'工种',id:'wgz',style:'margin:5px 5px 5px 5px',fieldLabel:'计划用工',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 80,width:180},
            { xtype:'textfield',emptyText:'人数',id:'wrs',style:'margin:5px 5px 5px 5px',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 10,width:60},
            { xtype:'textfield',emptyText:'工时',id:'wgs',style:'margin:5px 5px 5px 5px',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 10,width:60},
            { xtype:'textfield',emptyText:'说明',id:'wsm',style:'margin:5px 5px 5px 5px',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 10,width:160},
            { xtype:'button',text:'添加',style:'margin:5px 5px 5px 5px',handler:addJHYG},
            { xtype:'button',text:'工种选择',style:'margin:5px 5px 5px 5px',handler:getGZ}
        ]},jhyggrid ]
    }, {
        title : '计划物料',
        id : 'wltab',
        layout : 'vbox',
        frame:true,
        border : false,
        items : [{xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[
            { xtype:'textfield',emptyText:'物料编码',id:'wwlbm',style:'margin:5px 5px 5px 5px',fieldLabel:'计划物料',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 80,width:180},
            { xtype:'textfield',emptyText:'物料名称',id:'wwlmc',style:'margin:5px 5px 5px 5px',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 10,width:80},
            { xtype:'textfield',emptyText:'规格',id:'wgg',style:'margin:5px 5px 5px 5px',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 10,width:80},
            { xtype:'textfield',emptyText:'计量单位',id:'wjldw',style:'margin:5px 5px 5px 5px',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 10,width:50},
            { xtype:'textfield',emptyText:'单价',id:'wdj',style:'margin:5px 5px 5px 5px',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 10,width:50},
            { xtype:'textfield',emptyText:'数量',id:'wsl',style:'margin:5px 5px 5px 5px',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 10,width:50},
            { xtype:'button',text:'添加',style:'margin:5px 5px 5px 5px',handler:addJHWL},
            { xtype:'button',text:'物料选择',style:'margin:5px 5px 5px 5px',handler:getWL}
        ]},jhwlgrid ]
    }, {
        title : '机具配备',
        id : 'jjtab',
        layout : 'vbox',
        frame:true,
        border : false,
        items : [ {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[
            { xtype:'textfield',emptyText:'机具编码',id:'wjjbm',style:'margin:5px 5px 5px 5px',fieldLabel:'机具配备',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 80,width:180},
            { xtype:'textfield',emptyText:'机具名称',id:'wjjmc',style:'margin:5px 5px 5px 5px',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 10,width:120},
            { xtype:'textfield',emptyText:'计量单位',id:'wjldw2',style:'margin:5px 5px 5px 5px',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 10,width:60},
            { xtype:'textfield',emptyText:'数量',id:'wsl2',style:'margin:5px 5px 5px 5px',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 10,width:60},
            { xtype:'button',text:'添加',style:'margin:5px 5px 5px 5px',handler:addJJPB},
            { xtype:'button',text:'机具选择',style:'margin:5px 5px 5px 5px',handler:getJJ}
        ]},jjpbgrid]
    }, {
        title : '安全对策',
        id : 'aqtab',
        layout : 'vbox',
        frame:true,
        border : false,
        items : [
            { xtype:'textarea',id:'sgyc',style:'margin:5px 5px 5px 5px',fieldLabel:'事故预测',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 80,width:530,height:80},
            { xtype:'textarea',id:'aqdc',style:'margin:5px 5px 5px 5px',fieldLabel:'安全对策',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 80,width:530,height:80}
        ]}],
    listeners : {
        tabchange : OnTabChanged
    }
});
Ext.onReady(function() {
    Ext.create('Ext.container.Viewport', {
        frame:true,
        height:'100%',
        layout: 'border',
        items: [panel,tabpanel]
    });
    Ext.data.StoreManager.lookup('ckStore').on('load', function(){
        Ext.getCmp('wck').select(deptcode);

    });
    Ext.data.StoreManager.lookup('zyqStore').on('load', function(){
        Ext.getCmp('wzyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));

    });
    zyStore.load({
        params:{

        }
    });
    Ext.data.StoreManager.lookup('zyStore').on('load', function(){
        Ext.getCmp('wzy').select(Ext.data.StoreManager.lookup('zyStore').getAt(0));

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
    Init();
});
function Init(){
    if(type=='add'){
        Ext.getCmp('fxjhbm').setValue(fxjhbm);
        Ext.getCmp('fxjhmc').setValue(fxjhmc);
        Ext.getCmp('fxjhguid').setValue(fxjhguid);
        Ext.getCmp('sjgcguid').setValue(sjgcguid);
        Ext.getCmp('sjgcbm').setValue(sjgcbm);
        Ext.getCmp('sjgcmc').setValue(sjgcmc);
        Ext.getCmp('wck').select(deptcode);
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
                Ext.getCmp('wkssj').setValue(new Date(resp.list[0].V_DATETIME));
                Ext.getCmp('wksrq').setValue(new Date(resp.list[0].V_DATETIME));
                Ext.getCmp('wjssj').setValue(new Date(resp.list[0].V_DATETIME));
                Ext.getCmp('wjsrq').setValue(new Date(resp.list[0].V_DATETIME));
            }
        });
    }else if(type=='edit'){
        jhygs=[];jhwls=[];jjpbs=[];zynrs=[];
        Ext.Ajax.request({
            url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_YG_VIEW',
            method: 'POST',
            async : false,
            params:{
                V_V_GUID:treeguid
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
                V_V_GUID:treeguid
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
                V_V_GUID:treeguid
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
            url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_NR_VIEW',
            method: 'POST',
            async : false,
            params:{
                V_V_GUID:treeguid
            },
            success:function(resp){
                var resp = Ext.decode(resp.responseText);
                for(var i=0;i<resp.list.length;i++){
                    zynrs.push({
                        nr:resp.list[i].V_MEMO,
                        id:resp.list[i].I_ID,
                        guid:resp.list[i].V_GUID
                    });
                }
                Ext.data.StoreManager.lookup('zynrStore').loadData(zynrs);
            }
        });
        Ext.Ajax.request({
            url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_TREE_GET',
            method: 'POST',
            async : false,
            params:{
                V_V_GUID:treeguid,
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
                if(genre==1){
                    Ext.getCmp('wgcmc').setValue(resp.list[0].V_PROJECT_NAME.split('(主)')[0]);
                }else{
                    Ext.getCmp('wgcmc').setValue(resp.list[0].V_PROJECT_NAME.split('(子)')[0]);
                }
                Ext.getCmp('wys').setValue(resp.list[0].V_PLAN_MONEY);
                Ext.getCmp('wzy').select(resp.list[0].V_SPECIALTY);
                Ext.getCmp('wsbbm').setValue(resp.list[0].V_EQUCODE);
                Ext.getCmp('wsbmc').setValue(resp.list[0].V_EQUNAME);
                Ext.getCmp('wjsdw').setValue(resp.list[0].V_BUILD_DEPT);
                Ext.getCmp('wgcfzr').setValue(resp.list[0].V_BULID_PERSON);
                Ext.getCmp('wksrq').setValue(Ext.Date.format(new Date(resp.list[0].V_DATE_B),'Y-m-d'));
                Ext.getCmp('wjsrq').setValue(Ext.Date.format(new Date(resp.list[0].V_DATE_E),'Y-m-d'));
                Ext.getCmp('wjssj').setValue(Ext.Date.format(new Date(resp.list[0].V_DATE_E),'H:i:s'));
                Ext.getCmp('wkssj').setValue(Ext.Date.format(new Date(resp.list[0].V_DATE_B),'H:i:s'));
                //  Ext.getCmp('wgcnr').setValue(resp.list[0].V_CONTENT);
                Ext.getCmp('sgyc').setValue(resp.list[0].V_SGYC);
                Ext.getCmp('aqdc').setValue(resp.list[0].V_AQDC);

            }
        });
    }

}
function OnTabChanged() {
    /*Ext.getCmp('tabid').setValue(Ext.getCmp('tabpanel').getActiveTab().id);
     if (Ext.getCmp('tabid').getValue() == 'jcxxtab') {
     } else {
     }*/
}
function getEQU(){
    var owidth = window.document.body.offsetWidth-200;
    var oheight = window.document.body.offsetHeight-100 ;
    window.open(AppUrl+'page/PM_090101/index.html?V_DEPTCODE=' + Ext.getCmp('wzyq').getValue() , '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}
function getEquipReturnValue(ret){
    var str =ret.split('^');
    Ext.getCmp('wsbbm').setValue(str[0]);
    Ext.getCmp('wsbmc').setValue(str[1]);
}
function getGZ(){
    var owidth = window.document.body.offsetWidth-200;
    var oheight = window.document.body.offsetHeight-100 ;
    window.open(AppUrl+'page/PM_190403/index.html' , '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}
function getReturnValue(obj){
    if(obj[0].data.V_WORKNAME!=undefined){
        Ext.getCmp('wgz').setValue(obj[0].data.V_WORKNAME);
    }
    if(obj[0].data.V_CARCODE!=undefined){
        Ext.getCmp('wjjbm').setValue(obj[0].data.V_CARCODE);
        Ext.getCmp('wjjmc').setValue(obj[0].data.V_CARNAME);
    }
    if(obj[0].data.VCH_SPAREPART_CODE!=undefined){
        Ext.getCmp('wwlbm').setValue(obj[0].data.VCH_SPAREPART_CODE);
        Ext.getCmp('wwlmc').setValue(obj[0].data.VCH_SPAREPART_NAME);
        Ext.getCmp('wgg').setValue(obj[0].data.VCH_TYPE);
        Ext.getCmp('wjldw').setValue(obj[0].data.VCH_UNIT);
        Ext.getCmp('wdj').setValue(obj[0].data.PRICE);
        Ext.getCmp('wsl').setValue(obj[0].data.ABLECOUNT);
    }
}
function getJJ(){
    var owidth = window.document.body.offsetWidth-200;
    var oheight = window.document.body.offsetHeight-100 ;
    window.open(AppUrl+'page/PM_190603/index.html' , '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}
function getWL(){
    var owidth = window.document.body.offsetWidth-200;
    var oheight = window.document.body.offsetHeight-100 ;
    window.open(AppUrl+'page/pm_wl_sel/index.html' , '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
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
function addZYNR(){
    zynrs.push({
        nr:Ext.getCmp('wnr').getValue()/*,
         id:-1,
         guid:treeguid==undefined?'':treeguid*/
    });
    Ext.data.StoreManager.lookup('zynrStore').loadData(zynrs);
}
function addJHYG(){
    jhygs.push({
        gz:Ext.getCmp('wgz').getValue(),
        rs:Ext.getCmp('wrs').getValue(),
        gs:Ext.getCmp('wgs').getValue(),
        sm:Ext.getCmp('wsm').getValue()/*,
         id:-1,
         guid:treeguid==undefined?'':treeguid*/
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
        dj:Ext.getCmp('wdj').getValue()/*,
         id:-1,
         guid:treeguid==undefined?'':treeguid*/
    });
    Ext.data.StoreManager.lookup('jhwlStore').loadData(jhwls);
}
function addJJPB(){
    jjpbs.push({
        jjbm:Ext.getCmp('wjjbm').getValue(),
        jjmc:Ext.getCmp('wjjmc').getValue(),
        jldw:Ext.getCmp('wjldw2').getValue(),
        sl:Ext.getCmp('wsl2').getValue()/*,
         id:-1,
         guid:treeguid==undefined?'':treeguid*/
    });
    Ext.data.StoreManager.lookup('jjpbStore').loadData(jjpbs);
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
function Delete4(value,metaData,record,rowIdx){
    metaData.style = 'text-align: center';
    return '<a href=javascript:OnBtnRemove4(\''+ rowIdx + '\');>删除</a>';
}
function OnBtnRemove4(idx){
    var data=[];
    if(type=='add'){
        for(var i=0;i<zynrs.length;i++){
            if(i!=idx){
                data.push(zynrs[i]);
            }
        }
        zynrs=[];
        zynrs=data;
        Ext.data.StoreManager.lookup('zynrStore').loadData(zynrs);
    }else if(type=='edit'){
        var id=zynrs[idx].id;
        var nrid=zynrs[idx].guid;
        Ext.Ajax.request({
            url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_NR_DEL',
            method: 'POST',
            async : false,
            params:{
                V_I_ID:id
            },
            success:function(resp){
                var resp = Ext.decode(resp.responseText);
                if(resp.success){
                    Ext.Ajax.request({
                        url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_NR_VIEW',
                        method: 'POST',
                        async : false,
                        params:{
                            V_V_GUID:nrid
                        },
                        success:function(resp){
                            var resp = Ext.decode(resp.responseText);
                            zynrs=[];
                            for(var i=0;i<resp.list.length;i++){
                                zynrs.push({
                                    nr:resp.list[i].V_MEMO,
                                    id:resp.list[i].I_ID,
                                    guid:resp.list[i].V_GUID
                                });
                            }
                            Ext.data.StoreManager.lookup('zynrStore').loadData(zynrs);
                        }
                    });
                }

            }
        });
    }

}
function OnBtnSave(){

    if(genre == 1)
    {
        Ext.Ajax.request({
            url: AppUrl + 'hp/PRO_PM_EQUREPAIRPLAN_SELMAX',
            type: 'ajax',
            method: 'POST',
            params: {
                V_V_GUID_FXJH: fxjhguid,
                V_V_ROWNUMBER: -1,
                STATE: '主项'
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);//后台返回的值
                if (data.success) {//成功，会传回true
                        zhugener = Math.floor(data.maxvalue);
                         zhuxiangadd();


                } else {
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: data.message,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            },
            failure: function (response) {//访问到后台时执行的方法。
                Ext.MessageBox.show({
                    title: '错误',
                    msg: response.responseText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                })
            }

        })
    }

    if(genre == 2)
    {
        Ext.Ajax.request({
            url: AppUrl + 'hp/PRO_PM_EQUREPAIRPLAN_SELMAX',
            type: 'ajax',
            method: 'POST',
            params: {
                V_V_GUID_FXJH: fxjhguid,
                V_V_ROWNUMBER: rownumber,
                STATE: '子项'
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);//后台返回的值
                if (data.success) {//成功，会传回true
                    zigener = parseFloat(data.maxvalue);
                    //console.log(zigener);
                    //console.log(parseFloat('66'));
                    console.log("zigener= "+zigener);
                    var weishu = data.weishu;
                    console.log(weishu);

                    if(weishu==1 && data.maxvalue != null)
                    {
                        zigener = (zigener + 0.1).toFixed(1);
                    }
                    if(weishu==2 && data.maxvalue != null)
                    {
                        zigener = (zigener + 0.01).toFixed(2);
                    }

                    if(weishu==3 && data.maxvalue != null)
                    {
                        zigener = (zigener + 0.001).toFixed(3);
                    }

                    if(weishu==4 && data.maxvalue != null)
                    {
                        zigener = (zigener + 0.0001).toFixed(4);
                    }

                    if(weishu==5 && data.maxvalue != null)
                    {
                        zigener = (zigener + 0.00001).toFixed(5);
                    }

                    if(weishu==0 && data.maxvalue == null)
                    {
                        zigener = (parseFloat(rownumber) + 0.1).toFixed(1);

                    }

                    if(weishu==1 && data.maxvalue == null)
                    {
                        zigener = (parseFloat(rownumber) + 0.01).toFixed(2);
                    }

                    if(weishu==2 && data.maxvalue == null)
                    {
                        zigener = (parseFloat(rownumber) + 0.001).toFixed(3);

                    }

                    if(weishu==3 && data.maxvalue == null)
                    {
                        zigener = (parseFloat(rownumber) + 0.0001).toFixed(4);
                    }

                    if(weishu==5 && data.maxvalue == null)
                    {
                        zigener = (parseFloat(rownumber) + 0.00001).toFixed(5);
                    }


                    zixiangadd();


                } else {
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: data.message,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            },
            failure: function (response) {//访问到后台时执行的方法。
                Ext.MessageBox.show({
                    title: '错误',
                    msg: response.responseText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                })
            }

        })
    }

}
function OnBtnClose(){
    window.close();
}

function zhuxiangadd()
{
    var groupguid='';
    var ygguid='';
    var wlguid='';
    var jjguid='';
    var nrguid='';
    if(type=='add'){
        groupguid=-1;
    }else if(type=='edit'){
        groupguid=treeguid;
    }
    var ctt='';
    for(var i=0;i<zynrs.length;i++){
        if(i==0){
            ctt=zynrs[i].nr;
        }else{
            ctt=ctt+','+zynrs[i].nr;
        }
    }
    Ext.Ajax.request({
        url: AppUrl + 'hp/PRO_PM_EQUREPAIRPLAN_TREE_SET',
        method: 'POST',
        async : false,
        params:{
            V_V_IP:GetIP().ip,
            V_V_PERCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_PERNAME:Ext.util.Cookies.get('v_personname'),
            V_V_GUID:groupguid,
            V_V_ORGCODE:Ext.getCmp('wck').getValue(),
            V_V_DEPTCODE:Ext.getCmp('wzyq').getValue(),
            V_V_YEAR:Ext.getCmp('wyear').getValue(),
            V_V_MONTH:Ext.getCmp('wmonth').getValue(),
            V_V_PROJECT_CODE:Ext.getCmp('wgcbm').getValue(),
            V_V_PROJECT_NAME:Ext.getCmp('wgcmc').getValue()+"(主)",
            V_V_PLAN_MONEY:Ext.getCmp('wys').getValue(),
            V_V_DATE_DESIGN:Ext.getCmp('wgcmc').getValue(),
            V_V_CONTENT:ctt,
            V_V_DATE_DESIGN:"",
            V_V_DATE_INVITE:"",
            V_V_DATE_B:Ext.Date.format(Ext.getCmp('wksrq').getValue(),'Y-m-d')+" "+Ext.Date.format(Ext.getCmp('wkssj').getValue(),'H:i:s'),
            V_V_DATE_E:Ext.Date.format(Ext.getCmp('wjsrq').getValue(),'Y-m-d')+" "+Ext.Date.format(Ext.getCmp('wjssj').getValue(),'H:i:s'),
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
            V_V_AQDC:Ext.getCmp('aqdc').getValue(),
            V_V_ROWNUMBER:zhugener+1,
            V_V_P_ROWNUMBER:"0"
        },
        success:function(resp){
            var resp = Ext.decode(resp.responseText);
            if(resp.v_info=='success'){
                for(var i=0;i<jhygs.length;i++){
                    if(type=='add'){
                        ygguid=-1;
                    }else if(type=='edit'){
                        ygguid=jhygs[i].id==undefined?-1:jhygs[i].id;
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
                        wlguid=jhwls[i].id==undefined?-1:jhwls[i].id;
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
                        jjguid=jjpbs[i].id==undefined?-1:jjpbs[i].id;
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
                for(var i=0;i<zynrs.length;i++){
                    if(type=='add'){
                        nrguid=-1;
                    }else if(type=='edit'){
                        nrguid=zynrs[i].id==undefined?-1:zynrs[i].id;
                    }
                    Ext.Ajax.request({
                        url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_NR_SET',
                        method: 'POST',
                        async : false,
                        params:{
                            V_I_ID:nrguid,
                            V_V_GUID:resp.guid,
                            V_V_MEMO:zynrs[i].nr
                        },
                        success:function(resp){
                            var resp = Ext.decode(resp.responseText);

                        }
                    });
                }
                window.opener.loadGantt(fxjhguid);
                window.close();
            }
        }
    });
}

function zixiangadd()
{
    var groupguid='';
    var ygguid='';
    var wlguid='';
    var jjguid='';
    var nrguid='';
    if(type=='add'){
        groupguid=-1;
    }else if(type=='edit'){
        groupguid=treeguid;
    }
    var ctt='';
    for(var i=0;i<zynrs.length;i++){
        if(i==0){
            ctt=zynrs[i].nr;
        }else{
            ctt=ctt+','+zynrs[i].nr;
        }
    }
    Ext.Ajax.request({
        url: AppUrl + 'hp/PRO_PM_EQUREPAIRPLAN_TREE_SET',
        method: 'POST',
        async : false,
        params:{
            V_V_IP:GetIP().ip,
            V_V_PERCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_PERNAME:Ext.util.Cookies.get('v_personname'),
            V_V_GUID:groupguid,
            V_V_ORGCODE:Ext.getCmp('wck').getValue(),
            V_V_DEPTCODE:Ext.getCmp('wzyq').getValue(),
            V_V_YEAR:Ext.getCmp('wyear').getValue(),
            V_V_MONTH:Ext.getCmp('wmonth').getValue(),
            V_V_PROJECT_CODE:Ext.getCmp('wgcbm').getValue(),
            V_V_PROJECT_NAME:Ext.getCmp('wgcmc').getValue()+"(子)",
            V_V_PLAN_MONEY:Ext.getCmp('wys').getValue(),
            V_V_DATE_DESIGN:Ext.getCmp('wgcmc').getValue(),
            V_V_CONTENT:ctt,
            V_V_DATE_DESIGN:"",
            V_V_DATE_INVITE:"",
            V_V_DATE_B:Ext.Date.format(Ext.getCmp('wksrq').getValue(),'Y-m-d')+" "+Ext.Date.format(Ext.getCmp('wkssj').getValue(),'H:i:s'),
            V_V_DATE_E:Ext.Date.format(Ext.getCmp('wjsrq').getValue(),'Y-m-d')+" "+Ext.Date.format(Ext.getCmp('wjssj').getValue(),'H:i:s'),
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
            V_V_AQDC:Ext.getCmp('aqdc').getValue(),
            V_V_ROWNUMBER:zigener,
            V_V_P_ROWNUMBER:rownumber
        },
        success:function(resp){
            var resp = Ext.decode(resp.responseText);
            if(resp.v_info=='success'){
                for(var i=0;i<jhygs.length;i++){
                    if(type=='add'){
                        ygguid=-1;
                    }else if(type=='edit'){
                        ygguid=jhygs[i].id==undefined?-1:jhygs[i].id;
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
                        wlguid=jhwls[i].id==undefined?-1:jhwls[i].id;
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
                        jjguid=jjpbs[i].id==undefined?-1:jjpbs[i].id;
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
                for(var i=0;i<zynrs.length;i++){
                    if(type=='add'){
                        nrguid=-1;
                    }else if(type=='edit'){
                        nrguid=zynrs[i].id==undefined?-1:zynrs[i].id;
                    }
                    Ext.Ajax.request({
                        url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_NR_SET',
                        method: 'POST',
                        async : false,
                        params:{
                            V_I_ID:nrguid,
                            V_V_GUID:resp.guid,
                            V_V_MEMO:zynrs[i].nr
                        },
                        success:function(resp){
                            var resp = Ext.decode(resp.responseText);

                        }
                    });
                }
                window.opener.loadGantt(fxjhguid);
                window.close();
            }
        }
    });
}