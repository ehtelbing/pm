var date=new Date();

var cmItems = [];
var ganttdata = [];
var cmItems3 = [];
var ganttdata3 = [];

var vStart = '';
var vEnd = '';
var vStart3 = '';
var vEnd3 = '';

var vsMonth = '';
var veMonth = '';
var vsMonth3 = '';
var veMonth3 = '';

var vsDate = '';
var veDate = '';
var vsDate3 = '';
var veDate3 = '';

var  starttime='';
var endtime='';
var  starttime3='';
var endtime3='';

var today = new Date(Ext.Date.format(new Date(), 'Y-m-d'));
var month = today.getMonth() + 1;

//年份
var years=[];
for (var i =date.getFullYear()-4; i <=date.getFullYear()+1; i++){
    years.push({ displayField: i, valueField: i });
}
var yearStore=Ext.create("Ext.data.Store", {
    storeId: 'yearStore',
    fields: ['displayField','valueField'],
    data: years,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});
//月份
var months=[];
for (var i =1; i <=12; i++){
    months.push({ displayField: i, valueField: i });
}
var monthStore=Ext.create("Ext.data.Store", {
    storeId: 'monthStore',
    fields: ['displayField','valueField'],
    data: months,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});
//周
var weeks=[];
for (var i =1; i <=6; i++){
    weeks.push({ displayField: i, valueField: i });
}

var weekStore=Ext.create("Ext.data.Store", {
    storeId: 'weekStore',
    fields: ['displayField','valueField'],
    data: weeks,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});

Ext.onReady(function () {

    Ext.QuickTips.init();

//计划厂矿
    var jhckStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'jhckStore',
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
    var jhzyqStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'jhzyqStore',
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

    var treeStore = Ext.create('Ext.data.TreeStore', {
        storeId: 'treeStore',
        autoLoad: false,
        root: {
            expanded: true,
            text: "My Root"
        },
        fields: ['V_YEAR','V_MONTH','V_WEEK','V_ORGCODE','V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME','V_EQUTYPECODE','V_EQUCODE', 'V_EQUNAME', 'V_CONTENT',
            'V_ENDTIME', 'V_STARTTIME', 'V_MAIN_DEFECT', 'V_EXPECT_AGE', 'V_REPAIR_PER', 'V_FLOWNAME', 'V_STATENAME']
    });
    var treeStore3 = Ext.create('Ext.data.TreeStore', {
        storeId: 'treeStore3',
        autoLoad: false,
        root: {
            expanded: true,
            text: "My Root"
        },
        fields: ['V_YEAR','V_MONTH','V_WEEK','V_ORGCODE','V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME','V_EQUTYPECODE','V_EQUCODE', 'V_EQUNAME', 'V_CONTENT',
            'V_ENDTIME', 'V_STARTTIME', 'V_MAIN_DEFECT', 'V_EXPECT_AGE', 'V_REPAIR_PER', 'V_FLOWNAME', 'V_STATENAME']
    });

    var northPanel = Ext.create('Ext.panel.Panel', {
        title: '<h3 style="font-size:16px !important;">周计划查询</h3>',
        titleAlign: 'center',
        region: 'north',
        frame: true,
        layout: 'column',
        defaults: {labelAlign: 'right'},
        items: [
            {xtype: 'combo',id:'nf',fieldLabel: '年份',editable: false, margin: '5 0 0 5',labelWidth:80,width:230,displayField: 'displayField',valueField: 'valueField',store:yearStore,queryMode: 'local',value:new Date().getFullYear()},
            {xtype: 'combo',id:'yf',fieldLabel: '月份',editable: false, margin: '5 0 0 5',labelWidth:80,width:230,displayField: 'displayField',valueField: 'valueField',store:monthStore,queryMode: 'local',value:new Date().getMonth()+1},
            {xtype: 'combo',id:'zhou',fieldLabel: '周',editable: false,  margin: '5 0 0 5',labelWidth:80,width:230,displayField: 'displayField',valueField: 'valueField',store:weekStore,queryMode: 'local',value:getWeekOfMonth()},
            {xtype: 'combo',id:'jhck',fieldLabel: '计划厂矿',editable: false, margin: '5 0 0 5',labelWidth:80,width:230, displayField: 'V_DEPTNAME',valueField: 'V_DEPTCODE',store: jhckStore,queryMode: 'local'},
            {xtype: 'combo',id:'jhzyq',fieldLabel: '作业区',editable: false,  margin: '5 0 0 5',labelWidth:80,width:230, displayField: 'V_DEPTNAME',valueField: 'V_DEPTCODE',store: jhzyqStore,queryMode: 'local'},
            {xtype: 'button', text: '查询', margin: '5 0 5 5',icon:imgpath + '/search.png',handler:function(){QuertBtn(); }  }
        ]
    });

    var treegrid = Ext.create('Ext.tree.Panel', {
        id: 'treegrid',
        store: treeStore,
        region: 'west',
        width: '36%',
        height: '100%',
        useArrows: true,
        rootVisible: false,
        multiSelect: true,
        singleExpand: true,
        rowLines: true,
        columnLines: true,
        columns: [{xtype: 'rownumberer', width: 50,  sortable: false,text:'序号'},
              {text: '月计划信息',
                columns: [{xtype: 'treecolumn', text: '设备名称', dataIndex: 'V_EQUNAME', width: 180, align: 'center', renderer: AtleftN},
                    {text: '计划内容', dataIndex: 'V_CONTENT', width: 260, align: 'center', renderer: AtLeft},
                    {text: '参与人数', dataIndex: 'V_REPAIR_PER', width: 120, align: 'center', renderer: AtLeft}]}]
    });

    //甘特图 面板定义
    var ganttpanel = Ext.create('Ext.panel.Panel', {
        id: 'ganttpanel',
        width: "64%",
        height: "100%",
        region: 'center',
        layout: 'border',
        items: []
    });

    var gantt=Ext.create('Ext.panel.Panel',{
        region:'center',
        title:'计划',
        layout:'border',
        width: '100%',
        frame:true,
        items:[treegrid,ganttpanel]
    });
    var gantt2=Ext.create('Ext.panel.Panel',{
        region:'center',
        title:'写实',
        layout:'border',
        width: '100%',
        frame:true,
        items:[]
    });

    var treegrid3 = Ext.create('Ext.tree.Panel', {
        id: 'treegrid3',
        store: treeStore3,
        region: 'west',
        width: '36%',
        height: '100%',
        useArrows: true,
        rootVisible: false,
        multiSelect: true,
        singleExpand: true,
        rowLines: true,
        columnLines: true,
        columns: [{xtype: 'rownumberer', width: 50,  sortable: false,text:'序号'},
            {text: '月计划信息',
                columns: [{xtype: 'treecolumn', text: '设备名称', dataIndex: 'V_EQUNAME', width: 180, align: 'center', renderer: AtleftN},
                    {text: '计划内容', dataIndex: 'V_CONTENT', width: 260, align: 'center', renderer: AtLeft},
                    {text: '参与人数', dataIndex: 'V_REPAIR_PER', width: 120, align: 'center', renderer: AtLeft}]}]
    });

    //甘特图 面板定义
    var ganttpanel3 = Ext.create('Ext.panel.Panel', {
        id: 'ganttpanel3',
        width: "64%",
        height: "100%",
        region: 'center',
        layout: 'border',
        items: []
    });
    var gantt3=Ext.create('Ext.panel.Panel',{
        region:'center',
        title:'生产',
        layout:'border',
        width: '100%',
        frame:true,
        items:[treegrid3,ganttpanel3]
    });

    var tabPanel=Ext.create('Ext.tab.Panel',{
        region:'center',
        frame:true,
        width:'100%',
        items:[gantt,gantt2,gantt3/*{title:'计划',id:'plan'},
         {title:'写实',id:'fact'},
         {title:'生产',id:'produce'}*/]
    });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [northPanel,tabPanel/*,gantt*/]
    });

    Ext.data.StoreManager.lookup('jhckStore').on('load', function () {
        Ext.getCmp('jhck').select(Ext.data.StoreManager.lookup('jhckStore').getAt(0));
        Ext.data.StoreManager.lookup('jhzyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('jhck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });

    Ext.getCmp('jhck').on('select', function () {
        Ext.data.StoreManager.lookup('jhzyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('jhck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });


    Ext.data.StoreManager.lookup('jhzyqStore').on('load', function () {
        Ext.getCmp('jhzyq').select(Ext.data.StoreManager.lookup('jhzyqStore').getAt(0));
    });

});
function QuertBtn(){
    QueryData();
    QueryData3();
}
function QueryData(){

    Ext.getCmp('ganttpanel').removeAll();

    Ext.getCmp('treegrid').store.setProxy({
        type: 'ajax',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json'
        },
        url: AppUrl + 'gantt/weekPlanSelTree',
        extraParams: {
            V_V_YEAR:Ext.getCmp('nf').getValue(),
            V_V_MONTH:Ext.getCmp('yf').getValue(),
            V_V_WEEK:Ext.getCmp('zhou').getValue(),
            V_V_ORGCODE:Ext.getCmp('jhck').getValue(),
            V_V_DEPTCODE:Ext.getCmp('jhzyq').getValue()
        }
    });
    Ext.getCmp('treegrid').store.load();
    loadGantt();
}

function QueryData3(){

    Ext.getCmp('ganttpanel3').removeAll();

    Ext.getCmp('treegrid3').store.setProxy({
        type: 'ajax',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json'
        },
        url: AppUrl + 'cjy/PRO_PM_03_PLAN_WEEK_GAUNTT_RUN',
        extraParams: {
            V_V_YEAR:Ext.getCmp('nf').getValue(),
            V_V_MONTH:Ext.getCmp('yf').getValue(),
            V_V_WEEK:Ext.getCmp('zhou').getValue(),
            V_V_ORGCODE:Ext.getCmp('jhck').getValue(),
            V_V_DEPTCODE:Ext.getCmp('jhzyq').getValue()
        }
    });
    Ext.getCmp('treegrid3').store.load();
    loadGantt3();
}
function loadGantt3(){

    ganttdata3 = [];

    Ext.Ajax.request({
        url: AppUrl + 'cjy/PRO_PM_03_PLAN_WEEK_GAUNTT_RUN',
        method: 'POST',
        async: false,
        params: {
            V_V_YEAR:Ext.getCmp('nf').getValue(),
            V_V_MONTH:Ext.getCmp('yf').getValue(),
            V_V_WEEK:Ext.getCmp('zhou').getValue(),
            V_V_ORGCODE:Ext.getCmp('jhck').getValue(),
            V_V_DEPTCODE:Ext.getCmp('jhzyq').getValue()
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            ganttdata3 = resp;
            if (ganttdata3.length > 0) {
                createGantt3();
            }
        }
    });
}

function createGantt3(){

    cmItems3 = [];

    for (var i = 0; i < ganttdata3.length; i++) {
        if (i == 0) {
            starttime3 = new Date(ganttdata3[i].V_STARTTIME.split(" ")[0]+" 00:00:00");
            endtime3 = new Date(ganttdata3[i].V_ENDTIME.split(" ")[0]+" 23:59:59");
        } else {
            if(starttime3>new Date(ganttdata3[i].V_STARTTIME)){
                starttime3=new Date(ganttdata3[i].V_STARTTIME.split(" ")[0]+" 00:00:00");
            }
            if(endtime3<new Date(ganttdata3[i].V_ENDTIME)){
                endtime3=new Date(ganttdata3[i].V_ENDTIME.split(" ")[0]+" 23:59:59");
            }
        }
    }

    vStart3 = starttime3;
    vEnd3 = endtime3;

    vsMonth3=vStart3.getMonth()+1;
    veMonth3=vEnd3.getMonth()+1;

    vsDate3=vStart3.getDate();
    veDate3=vEnd3.getDate();

    var dateItems = [];

    for(var i=0;i<24;i++){
        dateItems.push({
            text: i,
            width: 40
        });
    }

    if(vsMonth3==veMonth3){

        for(var i=vsDate3;i<=veDate3;i++){
            cmItems3.push({
                text:vsMonth3+ '月'+i+"日",
                columns: dateItems
            });
        }

    }else{

        var lastDay=Ext.Date.getLastDateOfMonth(vStart3);

        for(var i=vsDate;i<=lastDay.getDate();i++){
            cmItems3.push({
                text:vsMonth3+ '月'+i+"日",
                columns: dateItems
            });
        }

        for(var i=1;i<=veDate3;i++){
            cmItems3.push({
                text:veMonth3+ '月'+i+"日",
                columns: dateItems
            });
        }

    }

    cmItems3.push({
        text: '',
        width: 0,
        dataIndex: 'MYCOLOR',
        renderer: pageFunction.IndexShow3
    });

    var ganttStore3 = Ext.create("Ext.data.Store", {
        storeId: 'ganttStore3',
        fields:['V_YEAR','V_MONTH','V_WEEK','V_ORGCODE','V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME','V_EQUTYPECODE','V_EQUCODE', 'V_EQUNAME', 'V_CONTENT',
            'V_ENDTIME', 'V_STARTTIME', 'V_MAIN_DEFECT', 'V_EXPECT_AGE', 'V_REPAIR_PER', 'V_FLOWNAME', 'V_STATENAME', 'MYCOLOR','V_GUID','V_WEEKID'],
        data: ganttdata3,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    });

    var ganttgrid3 = Ext.create('Ext.grid.Panel', {
        id: 'ganttgrid3',
        region:'center',
        store: ganttStore3,
        columnLines: true,
        columns: cmItems3
    });

    Ext.getCmp('ganttpanel3').add(ganttgrid3);
}

//第几周
function getWeekOfMonth(){
    var date = new Date();
    var w = date.getDay();
    var d = date.getDate();
    return Math.ceil((d + 6 - w) / 7);
};

function AtLeft(value, metaData) {
    metaData.style = "text-align:left";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function AtleftN(value, metaData) {
    metaData.style = "text-align:left;";
    return value;
}

function loadGantt(){

    ganttdata = [];

    Ext.Ajax.request({
        url: AppUrl + 'gantt/weekPlanSelTree',
        method: 'POST',
        async: false,
        params: {
            V_V_YEAR:Ext.getCmp('nf').getValue(),
            V_V_MONTH:Ext.getCmp('yf').getValue(),
            V_V_WEEK:Ext.getCmp('zhou').getValue(),
            V_V_ORGCODE:Ext.getCmp('jhck').getValue(),
            V_V_DEPTCODE:Ext.getCmp('jhzyq').getValue()
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            ganttdata = resp;
            if (ganttdata.length > 0) {
                createGantt();
            }
        }
    });
}

function createGantt(){

    cmItems = [];

    for (var i = 0; i < ganttdata.length; i++) {
        if (i == 0) {
            starttime = new Date(ganttdata[i].V_STARTTIME.split(" ")[0]+" 00:00:00");
            endtime = new Date(ganttdata[i].V_ENDTIME.split(" ")[0]+" 23:59:59");
        } else {
            if(starttime>new Date(ganttdata[i].V_STARTTIME)){
                starttime=new Date(ganttdata[i].V_STARTTIME.split(" ")[0]+" 00:00:00");
            }
            if(endtime<new Date(ganttdata[i].V_ENDTIME)){
                endtime=new Date(ganttdata[i].V_ENDTIME.split(" ")[0]+" 23:59:59");
            }
        }
    }

    vStart = starttime;
    vEnd = endtime;

    vsMonth=vStart.getMonth()+1;
    veMonth=vEnd.getMonth()+1;

    vsDate=vStart.getDate();
    veDate=vEnd.getDate();

    var dateItems = [];

    for(var i=0;i<24;i++){
        dateItems.push({
            text: i,
            width: 40
        });
    }

    if(vsMonth==veMonth){

        for(var i=vsDate;i<=veDate;i++){
            cmItems.push({
                text:vsMonth+ '月'+i+"日",
                columns: dateItems
            });
        }

    }else{

        var lastDay=Ext.Date.getLastDateOfMonth(vStart);

        for(var i=vsDate;i<=lastDay.getDate();i++){
            cmItems.push({
                text:vsMonth+ '月'+i+"日",
                columns: dateItems
            });
        }

        for(var i=1;i<=veDate;i++){
            cmItems.push({
                text:veMonth+ '月'+i+"日",
                columns: dateItems
            });
        }

    }

    cmItems.push({
        text: '',
        width: 0,
        dataIndex: 'MYCOLOR',
        renderer: pageFunction.IndexShow
    });

    var ganttStore = Ext.create("Ext.data.Store", {
        storeId: 'ganttStore',
        fields:['V_YEAR','V_MONTH','V_WEEK','V_ORGCODE','V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME','V_EQUTYPECODE','V_EQUCODE', 'V_EQUNAME', 'V_CONTENT',
        'V_ENDTIME', 'V_STARTTIME', 'V_MAIN_DEFECT', 'V_EXPECT_AGE', 'V_REPAIR_PER', 'V_FLOWNAME', 'V_STATENAME', 'MYCOLOR','V_GUID','V_WEEKID'],
        data: ganttdata,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    });

    var ganttgrid = Ext.create('Ext.grid.Panel', {
        id: 'ganttgrid',
        region:'center',
        store: ganttStore,
        columnLines: true,
        columns: cmItems
    });

    Ext.getCmp('ganttpanel').add(ganttgrid);
}

var pageFunction = {

    /**构造显示结构*/
    IndexShow: function (value, metaData, record) {
        stime = record.data.V_STARTTIME;
        etime = record.data.V_ENDTIME;

        var startd = new Date(stime.split(".0")[0].replace(/-/g, "/"));
        var endd = new Date(etime.split(".0")[0].replace(/-/g, "/"));

        var vleft=((startd.getTime() - vStart.getTime()) / (3600 * 1000))* 40;
        var vwidth=((endd.getTime() - startd.getTime()) / (3600 * 1000)) * 40 ;

        var gtt = '<div style="left:' + vleft.toString() + 'px;height:26px;width:' + vwidth.toString() + 'px;background-color:red;" class="sch-event" onmouseover="a1(\'' + record.data.V_GUID + '\')" onmouseout="a2(\'' + record.data.V_GUID + '\')"><div class="sch-event-inner" >' + record.data.V_CONTENT + '</div></div>' +
            '<div class="lxm"  id="' + record.data.V_GUID + '" style="display:none; position:absolute; z-index:9999; border:1px solid #666;">开始时间：' + stime.split('.0')[0] + '<br>' + '结束时间：' + etime.split('.0')[0] + '<br>'+ '主要缺陷：' + record.data.V_MAIN_DEFECT + '<br>'+ '预计寿命：' + record.data.V_EXPECT_AGE + '<br>'+ '维修人数：' + record.data.V_REPAIR_PER + '<br>';

        var cont = record.data.V_CONTENT.split(',');
        var contt = '内容：';
        for (var i = 0; i < cont.length; i++) {
            if (i == 0) {
                contt = contt + cont[i] + '<br>';
            } else {
                contt = contt + cont[i] + '<br>';
            }
        }

        gtt = gtt + contt + '</div>';
        return gtt;

    },

    /**构造显示结构3*/
    IndexShow3: function (value, metaData, record) {
        var stime3 = [];
        var etime3 = [];
        stime3 = record.data.V_STARTTIME.split(',');
        etime3 = record.data.V_ENDTIME.split(',');
       /* var gtt = '<div style="left:30px;height:26px;width:150px;background:red;"class="sch-event" onmouseover="a1(1)"><div  class="sch-event-inner" >'
            + 'content</div></div>'
            + '<div class="lxm" id="1" style="display:none; position:absolute; z-index:9999; border:1px solid #666;">开始时间：'
            + 'stime' + '<br>' + '结束时间etime：' + '<br>' + '主要缺陷：V_MAIN_DEFECT' + '<br>'
            + '预计寿命：V_EXPECT_AGE' + '<br>' + '维修人数：V_REPAIR_PER' + '<br>' + '</div>'
            + '<div style="left:190px;height:26px;width:50px;background:red;"class="sch-event" onmouseover="a1(1)"><div  class="sch-event-inner" >'
            + 'content</div></div>'
            + '<div class="lxm" id="1" style="display:none; position:absolute; z-index:9999; border:1px solid #666;">开始时间：'
            + 'stime' + '<br>' + '结束时间etime：' + '<br>' + '主要缺陷：V_MAIN_DEFECT' + '<br>'
            + '预计寿命：V_EXPECT_AGE' + '<br>' + '维修人数：V_REPAIR_PER' + '<br>' + '</div>';*/
        var gtt='';
        for (var i = 0; i < stime3.length; i++) {

            var stimei=stime3[i];
            var etimei=etime3[i];
            var startd = new Date(stimei.split(".0")[0].replace(/-/g, "/"));
            var endd = new Date(etimei.split(".0")[0].replace(/-/g, "/"));

            var vleft = ((startd.getTime() - vStart3.getTime()) / (3600 * 1000)) * 40;
            var vwidth = ((endd.getTime() - startd.getTime()) / (3600 * 1000)) * 40;

            /*gtt += '<div style="left:' + vleft.toString() + 'px;height:26px;width:' + vwidth.toString()
                + 'px;background-color:red;" class="sch-event" onmouseover="a1(\'' + record.data.V_GUID + '\')" onmouseout="a2(\'' + record.data.V_GUID + '\')"><div class="sch-event-inner" >'
                + record.data.V_CONTENT + '</div></div>'
                +'<div class="lxm"  id="' + record.data.V_GUID + '" style="display:none; position:absolute; z-index:9999; border:1px solid #666;">开始时间：'
                + stime.split('.0')[0] + '<br>' + '结束时间：' + etime[i].split('.0')[0] + '<br>' + '主要缺陷：' + record.data.V_MAIN_DEFECT + '<br>'
                + '预计寿命：' + record.data.V_EXPECT_AGE + '<br>' + '维修人数：' + record.data.V_REPAIR_PER + '<br>';*/
            gtt += '<div style="left:' + vleft.toString() + 'px;height:26px;width:' + vwidth.toString()
                + 'px;background-color:red;" class="sch-event" onmouseover="a1(\'' + i + '\')" onmouseout="a2(\'' + i + '\')"><div class="sch-event-inner" >'
                + record.data.V_CONTENT + '</div></div>'
                +'<div class="lxm"  id="' + i + '" style="display:none; position:absolute; z-index:9999; border:1px solid #666;">开始时间：'
                + stimei + '<br>' + '结束时间：' + etimei + '<br>' + '主要缺陷：' + record.data.V_MAIN_DEFECT + '<br>'
                + '预计寿命：' + record.data.V_EXPECT_AGE + '<br>' + '维修人数：' + record.data.V_REPAIR_PER + '<br>';


            var cont = record.data.V_CONTENT.split(',');
            var contt = '内容：';
            for (var j = 0; j < cont.length; j++) {
                if (j == 0) {
                    contt = contt + cont[j] + '<br>';
                } else {
                    contt = contt + cont[j] + '<br>';
                }
            }

            gtt = gtt + contt + '</div>';
        }

        return gtt;

    }
};

//月共几天
function getDaysOfMonth(year,month){
    var month = parseInt(month, 10);
    var d= new Date(year, month, 0);
    return d.getDate();
}

//本周开始时间
function getWeekStartDate() {
    var year=Ext.getCmp('nf').getValue();
    var month=Ext.getCmp('yf').getValue();
    var week=Ext.getCmp('zhou').getValue();
    var dat=new Date(year,month-1,1);
    var day=dat.getDay();
    var date=dat.getDate()+(week-1)*7;
    var hao=dat.getDate();
    var days=getDaysOfMonth(year,month-1);//上月有几天
    if(day==0){
        day=7;
    }
    if(date<day){
        hao=date+days-day+1;
    }else{
        hao=date-day+1;
    }
    var yue=dat.getMonth();
    if(date<day){
        yue=yue-1;
    }
    var nian=dat.getFullYear();
    if(yue<0){
        nian=nian-1;
        yue=yue+12;
    }
    if(hao>getDaysOfMonth(year,month)){
        hao=hao-getDaysOfMonth(year,month);
        yue=yue+1;
    }
    if(yue>11){
        nian==nian+1;
    }
    return nian+"-"+(yue+1)+"-"+hao;
}
//本周结束时间
function getWeekEndDate(){
    var year=Ext.getCmp('nf').getValue();
    var month=Ext.getCmp('yf').getValue();
    var week=Ext.getCmp('zhou').getValue();
    var dat=new Date();
    var dat=new Date(year,month-1,1);
    var day=dat.getDay();
    var date=dat.getDate()+(week-1)*7;
    var hao=dat.getDate();
    var days=getDaysOfMonth(year,month);//本月有几天
    if(day==0){
        day=7;
    }
    hao=date+(7-day);
    var yue=dat.getMonth();
    if(hao>days){
        hao=hao-days;
        yue=yue+1;
    }
    var nian=dat.getFullYear();
    if(yue>11){
        yue=yue-12;
        nian=nian+1;
    }
    return nian+"-"+(yue+1)+"-"+hao;
}

function a1(id) {
    var oson = document.getElementById(id);
    with (oson) {
        oson.style.display = "block";
        oson.style.left = (window.event.clientX - 450) + 'px';
        oson.style.top = (window.event.clientY - 138) + 'px';
        oson.style.background = 'white';
    }

}

function a2(id) {
    document.getElementById(id).style.display = 'none';

}



