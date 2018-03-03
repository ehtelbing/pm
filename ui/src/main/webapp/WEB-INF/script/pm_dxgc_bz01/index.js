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
        {name: 'mycolor'},
        {name: 'money'}
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
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*'
]);

var ckStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'ckStore',
    fields: ['V_DEPTCODE','V_DEPTNAME' ],
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
    fields: ['V_DEPTCODE','V_DEPTNAME' ],
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
    fields: ['V_MAJOR_CODE','V_MAJOR_NAME' ],
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
        'V_PERNAME_INPUT',
        'V_ROWNUMBER'


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
    region:'north',
    id : 'panel',
    width : '100%',
    defaults : {
        labelWidth : 35,
        labelAlign : 'right'
    },
    items : [{id:'year',xtype:'combo',width:130,fieldLabel:'年份',
        store:years,displayField:'Item1',valueField:'Item2',
        value:thisYear,editable:false,queryMode:'local'},
        {id: 'month',hidden:true, store: Ext.create("Ext.data.Store", {
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
        { xtype: 'combo', hidden:true, fieldLabel: '厂矿', labelWidth: 40, id: 'ck', store: 'ckStore', editable: false, displayField: 'V_DEPTNAME', valueField: 'V_DEPTCODE', queryMode: 'local' },
        { xtype: 'combo', hidden:true, fieldLabel: '专业', labelWidth: 40, id: 'zy', store: 'zyStore', editable: false, displayField: 'V_MAJOR_CODE', valueField: 'V_MAJOR_NAME', queryMode: 'local' },
        { xtype:'textfield',hidden:true, id:'gcbm',fieldLabel:'工程编码',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 65,width:200},
        { xtype:'textfield',hidden:true, id:'gcmc',fieldLabel:'工程名称',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 65,width:200},
        { xtype:'textfield',hidden:true, id:'gcnr',fieldLabel:'工程内容',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 65,width:200},
        { xtype : 'button',text : '查询',style : { margin : '0px 0px 0px 10px' },icon : imgpath + '/search.png',handler:QueryGrid},
        { xtype : 'button',text : '导入',style : { margin : '0px 0px 0px 10px' },handler:DAO}
    ]
});

function DAO() {
    window.open(AppUrl + 'page/pm_dxgc_bz01/index_01.html?V_DEPTCODE=' + V_DEPTCODE, '_blank', 'width=900,height=600,resizable=yes,scrollbars=yes');
}

var panel1 = Ext.create('Ext.panel.Panel',{
    frame : true,
    layout:'column',
    bodyPadding : 5,
    id : 'panel1',
    width : '100%',
    height:35,
    baseCls:'my-panel-noborder',
    defaults : {
        labelWidth : 35,
        labelAlign : 'right'
    },
    items:[
        { xtype : 'button',text : '添加主项',style : { margin : '0px 0px 0px 10px' },icon : imgpath + '/add.png',handler:OnBtnAdd2},
        { xtype : 'button',text : '添加子项',style : { margin : '0px 0px 0px 10px' },icon : imgpath + '/add.png',handler:OnBtnAdd},
        { xtype : 'button',text : '修改',style : { margin : '0px 0px 0px 10px' },icon : imgpath + '/edit.png',handler:OnBtnUpdate},
        { xtype : 'button',text : '删除',style : { margin : '0px 0px 0px 10px' },icon : imgpath + '/delete.png',handler:OnBtnDelete},
        {xtype:'displayfield',fieldLabel:'详情',id:'detail',hidden:true,style:'margin:0px 0px 0px 10px',labelAlign:'right',
            labelWidth : 40,width:400},
        {xtype:'displayfield',fieldLabel:'汇总信息',id:'tj',style:'margin:0px 0px 0px 10px',labelAlign:'right',
            labelWidth : 80,width:700}
    ]
});

var panelpic = Ext.create('Ext.panel.Panel',{
    frame : true,
    layout:'vbox',
    region:'center',
    bodyPadding : 5,
    id : 'panelpic',
    width : '100%',
    defaults : {
        labelWidth : 35,
        labelAlign : 'right'
    },
    items:[panel1]
});
var grid1=Ext.create('Ext.grid.Panel',{
    region:'center',
    store:gridStore,
    id:'grid1',
    style:'margin:0px 0px 0px 0px',
    //columnLines: true,
    //autoScroll:true,
    //baseCls:'my-panel-noborder',
    columns:[
        {text: '序号', align: 'center', width: 50, xtype: 'rownumberer'},
        { text: '专业',width:200,dataIndex:'V_MAJOR_NAME', align: 'center',renderer:Atleft },
        { text: '工程编码',width:200,dataIndex:'V_PROJECT_CODE', align: 'center',renderer:Atleft },
        { text: '工程名称',width:200,dataIndex:'V_PROJECT_NAME', align: 'center',renderer:Atleft },
        { text: '年度投资（万元）',width:200,dataIndex:'V_BUDGET_MONEY', align: 'center',renderer:Atleft },
        { text: '放行计划主要内容',width:200,dataIndex:'V_CONTENT', align: 'center',renderer:Atleft },
        { text: 'WBS',width:200,dataIndex:'V_WBS_CODE', align: 'center',renderer:Atleft },
        { text: '开工时间',width:200,dataIndex:'V_DATE_B', align: 'center',renderer:Atleft },
        { text: '竣工时间',width:200,dataIndex:'V_DATE_E', align: 'center',renderer:Atleft },
        { text: '建设单位',width:200,dataIndex:'V_BUILD_DEPT', align: 'center',renderer:Atleft },
        { text: '建设单位工程负责人',width:200,dataIndex:'V_BULID_PERSON', align: 'center',renderer:Atleft }
    ],
    listeners:{
        'itemdblclick':function(a,b,c){

            var owidth = 593;
            var oheight = 796;
            var w=screen.availWidth-10;
            var h=screen.availHeight-30;
            var objwin = window.open(AppUrl + 'page/pm_dxgc_bz01/index_detail.html?guid='+b.data.V_GUID
                + "&V_PROJECT_NAME=" + encodeURI(b.data.V_PROJECT_NAME)
                + "&V_PROJECT_CODE=" + encodeURI(b.data.V_PROJECT_CODE),"win","fullscreen=yes,toolbar=1,location=1,directories=1,status=1,menubar=1,scrollbars=1,resizable=1,width=" + w + ",height=" + h + ",top=0,left=0",true);

            return ;

            guid= b.data.V_GUID;
            Ext.Ajax.request({
                url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_TREE_TJ',
                method: 'POST',
                async : false,
                params:{
                    V_V_GUID_FXJH:guid,
                    V_BY1:'',
                    V_BY2:'',
                    V_BY3:''
                },
                success:function(resp){
                    var resp = Ext.decode(resp.responseText);
                    var tj="";
                    Ext.getCmp('tj').show();
                    if(resp.list==null){
                        tj='无';
                    }else{
                        tj="金额:"+resp.list[0].F_BUDGET_MONEY+" 子项目数:"+resp.list[0].F_ITEMNUM+' 人工:'
                            +resp.list[0].F_PERNUM+" 工时:"+resp.list[0].F_WORKTIME+" 物料消耗金额:"+resp.list[0].F_WLMONEY;
                    }
                    Ext.getCmp('tj').setValue(tj);

                }
            });
            Ext.getCmp('win').setTitle('工程分解-'+ b.data.V_PROJECT_NAME+'('+ b.data.V_PROJECT_CODE+')');
            Ext.data.StoreManager.lookup('ganttStore').load({
                params: {
                    V_V_GUID_FXJH:guid,
                    V_BY1: "",
                    V_BY2: "",
                    V_BY3:""
                }
            });
            jhygs=[];jhwls=[];jjpbs=[];zynrs=[];
            Ext.Ajax.request({
                url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_YG_VIEW',
                method: 'POST',
                async : false,
                params:{
                    V_V_GUID:guid
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
                    V_V_GUID:guid
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
                    V_V_GUID:guid
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
            Ext.getCmp('win').show();

        }
    }
});

var panelup = Ext.create('Ext.panel.Panel',{
    //frame : true,
    layout:'border',
    region:'center',
    baseCls:'my-panel-noborder',
    //bodyPadding : 5,
    id : 'panelup',
    width : '100%',
    height:'100%',
    defaults : {
        labelWidth : 35,
        labelAlign : 'right'
    },
    items:[panel,grid1]
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
        { text: '说明',width:200,dataIndex:'sm', align: 'center',renderer:Atleft }
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
        { text: '数量',width:100,dataIndex:'sl', align: 'center',renderer:AtRight }
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
        { text: '数量',width:80,dataIndex:'sl', align: 'center',renderer:AtRight }
    ]
});
var tabpanel = Ext.create('Ext.tab.Panel', {
    id : 'tabpanel',
    // region:'center',
    width : '100%',
    height:window.innerHeight/2,
    items : [
        {
            title : '计划用工',
            id : 'ygtab',
            layout : 'vbox',
            frame:true,
            border : false,
            items : [jhyggrid ]
        }, {
            title : '计划物料',
            id : 'wltab',
            layout : 'vbox',
            frame:true,
            border : false,
            items : [jhwlgrid ]
        }, {
            title : '机具配备',
            id : 'jjtab',
            layout : 'vbox',
            frame:true,
            border : false,
            items : [ jjpbgrid]
        }, {
            title : '安全对策',
            id : 'aqtab',
            layout : 'vbox',
            frame:true,
            border : false,
            items : [
                { xtype:'textarea',id:'sgyc',editable:false,readOnly:true,style:'margin:5px 5px 5px 5px',fieldLabel:'事故预测',labelAlign:'right',labelWidth : 80,width:530,height:80},
                { xtype:'textarea',id:'aqdc',editable:false,readOnly:true,style:'margin:5px 5px 5px 5px',fieldLabel:'安全对策',labelAlign:'right',labelWidth : 80,width:530,height:80}
            ]}]
});
var windowPanel = Ext.create('Ext.window.Window', {
    id : 'win',
    closeAction : 'hide',
    width : window.innerWidth,
    height: window.innerHeight,
    modal : true,
    frame : true,
    layout : 'vbox',
    items : [ panelpic ,tabpanel ]
});


Ext.onReady(function() {
    //Ext.QuickTips.init();

    Ext.create('Ext.container.Viewport', {
        layout : 'border',
        items : [panelup]
    });
    QueryGrid();
    Ext.data.StoreManager.lookup('ckStore').on('load', function(){
        Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));

    });
    Ext.data.StoreManager.lookup('zyStore').on('load', function(){
        Ext.getCmp('zy').select(Ext.data.StoreManager.lookup('zyStore').getAt(0));

    });
    zyStore.load({
        params:{

        }
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
            myData.push('r' + (i + 1), records.get('V_DATE_B'), records.get('V_DATE_E'), records.get('V_PROJECT_NAME'), '#CC3333',records.get('V_GUID'),records.get('V_PROJECT_CODE'),records.get('V_GUID_P'),records.get('V_CONTENT'),records.get('V_ROWNUMBER'),records.get('V_PLAN_MONEY'));
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
                {name: 'pid'},
                {name: 'memo'},
                {name: 'rownumber'},
                {name: 'money'}
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

        },{
            text: '开始时间',
            locked: true,
            width: 140,
            dataIndex: 'StartDate'

        },{
            text: '费用',
            locked: true,
            width: 100,
            dataIndex: 'money'

        });
        var vTmpDate = new Date(vStart.getFullYear(), vStart.getMonth(), vStart.getDate());
        var dateItems = [];
        var vmonth = vTmpDate.getMonth();
        var vTmpMonth;

        while (vTmpDate < vEnd) {
            vTmpMonth = vTmpDate.getMonth();
            var vzm = '';
            if (vTmpDate.getDay() == 0 || vTmpDate.getDay() == 6) {

                vzm = 'color:#CCCCCC';
            }

            if (vTmpMonth == vmonth) {
                dateItems.push({text: vTmpDate.getDate().toString(), style: vzm, width: 40});
            } else {
                var vyear = vTmpDate.getFullYear();
                if (vmonth == 11) {
                    vyear -= 1;
                }
                cmItems.push({text: vyear.toString() + '年' + (vmonth + 1).toString() + '月', columns: dateItems});
                vmonth = vTmpMonth;
                dateItems = [];
                dateItems.push({text: vTmpDate.getDate().toString(), style: vzm, width: 40});
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
                    var vleft = (dif / (86400 * 1000)) * 40;
                    dif = endd.getTime() - startd.getTime();
                    var vwidth = (dif / (86400 * 1000)) * 40;
                    var gtt = '<div style="left:' + vleft.toString() + 'px;height:21px;width:' + vwidth.toString() + 'px;background-color:A6FFA6;" class="sch-event" onmouseover="a1(\''+record.data['id']+'\')" onmouseout="a2(\''+record.data['id']+'\')"><div class="sch-event-inner" >' + record.data['Name'] + '</div></div><div class="lxm"  id="'+record.data['id']+'" style="display:none; position:absolute; z-index:9999; border:1px solid #666;">开始时间：'+record.data['StartDate']+'<br>' +
                        '结束时间：'+record.data['EndDate']+'<br>';
                    var cont=record.data['memo'].split(',');
                    var contt='内容：';
                    for(var i=0;i<cont.length;i++){
                        if(i==0){
                            contt=contt+cont[i]+'<br>';
                        }else{
                            contt=contt+cont[i]+'<br>';
                        }
                    }
                    gtt=gtt+contt+'</div>';
                    return gtt;
                }
                if (today <= startd) {

                    var dif = startd.getTime() - vStart.getTime();
                    var vleft = (dif / (86400 * 1000)) * 40;
                    dif = endd.getTime() - startd.getTime();
                    var vwidth = (dif / (86400 * 1000)) * 40;
                    var gtt = '<div style="left:' + vleft.toString() + 'px;height:21px;width:' + vwidth.toString() + 'px;background-color:' + record.data['mycolor'] + ';" class="sch-event" onmouseover="a1(\''+record.data['id']+'\')" onmouseout="a2(\''+record.data['id']+'\')"><div  class="sch-event-inner">' + record.data['Name'] + '</div></div><div class="lxm"  id="'+record.data['id']+'" style="display:none; position:absolute; z-index:9999; border:1px solid #666;">开始时间：'+record.data['StartDate']+'<br>' +
                        '结束时间：'+record.data['EndDate']+'<br>';
                    var cont=record.data['memo'].split(',');
                    var contt='内容：';
                    for(var i=0;i<cont.length;i++){
                        if(i==0){
                            contt=contt+cont[i]+'<br>';
                        }else{
                            contt=contt+cont[i]+'<br>';
                        }
                    }
                    gtt=gtt+contt+'</div>';
                    return gtt;
                }

                if (startd < today && today < endd) {
                    var nowtime2 = Ext.Date.format(new Date(), 'Y-m-d 00:00:00')
                    var dif = startd.getTime() - vStart.getTime();
                    var vleft = (dif / (86400 * 1000)) * 40;
                    dif = today.getTime() - startd.getTime();
                    var vwidth1 = (dif / (86400 * 1000)) * 40;
                    dif = endd.getTime() - today.getTime();
                    var vwidth2 = (dif / (86400 * 1000)) * 40;
                    dif = endd.getTime() - startd.getTime();
                    var vwidth = (dif / (86400 * 1000)) * 40;

                    var bfb = Math.round(((vwidth1 / vwidth)*100),0);
                    var gtt = '<div style="left:' + vleft.toString() + 'px;height:21px;width:' + vwidth.toString() + 'px;" class = "sch-event" onmouseover="a1(\''+record.data['id']+'\')" onmouseout="a2(\''+record.data['id']+'\')"><div style="width:' + vwidth1.toString() + 'px;border:0px;height:21px;margin:0px;background-color:#99CC66;" class = "sch-event">' +   ' 完成度' + bfb + '%</div><div class="sch-event-inner" style="float:right;width:' + vwidth2.toString() + 'px;height:21px;border:0px;margin:0px;background-color:' + record.data['mycolor'] + ';">'+ record.data['Name'] + '</div></div><div class="lxm"  id="'+record.data['id']+'" style="display:none; position:absolute; z-index:9999; border:1px solid #666;">开始时间：'+record.data['StartDate']+'<br>' +
                        '结束时间：'+record.data['EndDate']+'<br>';
                    var cont=record.data['memo'].split(',');
                    var contt='内容：';
                    for(var i=0;i<cont.length;i++){
                        if(i==0){
                            contt=contt+cont[i]+'<br>';
                        }else{
                            contt=contt+cont[i]+'<br>';
                        }
                    }
                    gtt=gtt+contt+'</div>';
                    return gtt;
                }

            }
        });
        grid = Ext.create('Ext.grid.Panel', {
            id: 'grid',
            store: store,
            columnLines: true,
            columns: cmItems,
            height: (window.innerHeight/2) - 50,
            width: '100%',
            renderTo: Ext.getBody(),
            listeners:{
                'itemclick':function(a,b,c){
                    jhygs=[];jhwls=[];jjpbs=[];zynrs=[];
                    Ext.Ajax.request({
                        url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_YG_VIEW',
                        method: 'POST',
                        async : false,
                        params:{
                            V_V_GUID:b.data.id
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
                            V_V_GUID:b.data.id
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
                            V_V_GUID:b.data.id
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
                            V_V_GUID:b.data.id,
                            V_BY1:"",
                            V_BY2:"",
                            V_BY3:""
                        },
                        success:function(resp){
                            var resp = Ext.decode(resp.responseText);
                            Ext.getCmp('sgyc').setValue(resp.list[0].V_SGYC);
                            Ext.getCmp('aqdc').setValue(resp.list[0].V_AQDC);

                        }
                    });

                }
            }
        });
        Ext.getCmp('panelpic').add(grid);
        Ext.getCmp('panelpic').doLayout();

    });
});

function a1(id){
    var oson = document.getElementById(id);
    with(oson){
        oson.style.display = "block";
        oson.style.left = (window.event.clientX  -450)+'px';
        oson.style.top = (window.event.clientY  -138)+'px';
        oson.style.background='white';
    }
    /*Ext.Ajax.request({
     url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_TREE_GET',
     method: 'POST',
     async : false,
     params:{
     V_V_GUID:id,
     V_BY1:"",
     V_BY2:"",
     V_BY3:""
     },
     success:function(resp){
     var resp = Ext.decode(resp.responseText);
     if(resp.list.length!=0){
     var str='开始时间：'+resp.list[0].V_DATE_B+' 结束时间：'+resp.list[0].V_DATE_E+' 内容：'+resp.list[0].V_CONTENT;
     }
     Ext.getCmp('detail').setValue(str);
     }
     });
     Ext.getCmp('detail').show();*/
}
function a2(id){
    document.getElementById(id).style.display='none';
    /*
     Ext.getCmp('detail').hide();
     */
}


function loadGantt(gid){
    Ext.data.StoreManager.lookup('ganttStore').load({
        params: {
            V_V_GUID_FXJH:gid,
            V_BY1: "",
            V_BY2: "",
            V_BY3:""
        }
    });
}




function AtRight(value, metaData) {
    metaData.style = 'text-align: right';
    return value;
}

function Atleft(value, metaData) {
    metaData.style = 'text-align: left';
    return value;
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

function OnBtnUpdate(){
    var record=Ext.getCmp('grid1').getSelectionModel().getSelection();
    if(record.length==0){
        alert('请在上表选择放行计划');
        return;
    }
    var treenode=Ext.getCmp('grid').getSelectionModel().getSelection();
    if(treenode.length==0){
        alert('请选择要修改的工程');
        return;
    }
    type="edit";
    treeguid=treenode[0].data.id;
    var owidth = window.document.body.offsetWidth-200;
    var oheight = window.document.body.offsetHeight-100 ;
    var genre="";
    var xmmc="";
    if(treenode[0].data.pid!=""){
        genre=2;
        xmmc=treenode[0].data.Name.split('(子)')[0];
    }else{
        genre=1;
        xmmc=treenode[0].data.Name.split('(主)')[0];
    }
    window.open(AppUrl+'page/pm_dxgc_bz01/edit.html?genre='+genre+'&&treeguid='+treeguid+'&&sjgcbm='+treenode[0].data.Code+'&&sjgcmc='+xmmc+"&&sjgcguid="+treenode[0].data.id+'&&fxjhbm=' +record[0].data.V_PROJECT_CODE+'&&fxjhmc='+record[0].data.V_PROJECT_NAME+'&&fxjhguid='+ record[0].data.V_GUID+'&&type=edit&&deptcode='+Ext.getCmp('ck').getValue()+'&&rownumber='+ treenode[0].data.rownumber, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

}

function OnBtnAdd(){
    type="add";
    var record=Ext.getCmp('grid1').getSelectionModel().getSelection();
    if(record.length==0){
        alert('请在上表选择放行计划');
        return;
    }
    var treenode=Ext.getCmp('grid').getSelectionModel().getSelection();
    if(treenode.length==0){
        alert('请在左表选择上级工程项目');
        return;
    }
    var owidth = window.document.body.offsetWidth-200;
    var oheight = window.document.body.offsetHeight-100 ;
    var genre = 2;
    console.log(treenode[0].data.rownumber);
    window.open(AppUrl+'page/pm_dxgc_bz01/edit.html?sjgcbm='+treenode[0].data.Code+'&&sjgcmc='+treenode[0].data.Name+"&&sjgcguid="+treenode[0].data.id+'&&fxjhbm=' +record[0].data.V_PROJECT_CODE+'&&fxjhmc='+record[0].data.V_PROJECT_NAME+'&&fxjhguid='+ record[0].data.V_GUID+'&&rownumber='+ treenode[0].data.rownumber+'&&type=add&&deptcode='+Ext.getCmp('ck').getValue()+'&&genre='+genre, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}
function OnBtnAdd2(){
    type="add";
    var record=Ext.getCmp('grid1').getSelectionModel().getSelection();
    if(record.length==0){
        alert('请在上表选择放行计划');
        return;
    }
    var owidth = window.document.body.offsetWidth-200;
    var oheight = window.document.body.offsetHeight-100 ;
    var genre = 1;
    window.open(AppUrl+'page/pm_dxgc_bz01/edit.html?fxjhbm=' +record[0].data.V_PROJECT_CODE+'&&fxjhmc='+record[0].data.V_PROJECT_NAME+'&&fxjhguid='+ record[0].data.V_GUID+'&&type=add&&deptcode='+Ext.getCmp('ck').getValue()+'&&genre='+genre, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}

function QueryGrid(){
    Ext.data.StoreManager.lookup('gridStore').load({
        params:{
            V_V_YEAR:Ext.getCmp('year').getValue(),
            V_V_MONTH:"",
            V_V_ORGCODE:"",
            V_V_SPECIALTY:"",
            V_V_PROJECT_CODE:"",
            V_V_PROJECT_NAME:"",
            V_V_CONTENT:"",
            V_V_BY1:"",
            V_V_BY2:""
        }
    });

}