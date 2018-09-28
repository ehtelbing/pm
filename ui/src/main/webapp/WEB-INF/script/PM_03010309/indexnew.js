var date=new Date();

var cmItems = [];
var ganttdata = [];
var cmItems2 = [];
var ganttdata2 = [];
var cmItems3 = [];
var ganttdata3 = [];

var vStart = '';
var vEnd = '';
var vStart2 = '';
var vEnd2 = '';
var vStart3 = '';
var vEnd3 = '';

var vsMonth = '';
var veMonth = '';
var vsMonth2 = '';
var veMonth2 = '';
var vsMonth3 = '';
var veMonth3 = '';

var vsDate = '';
var veDate = '';
var vsDate2 = '';
var veDate2 = '';
var vsDate3 = '';
var veDate3 = '';

var  starttime='';
var endtime='';
var  starttime2='';
var endtime2='';
var  starttime3='';
var endtime3='';

var today = new Date(Ext.Date.format(new Date(), 'Y-m-d'));
var month = today.getMonth() + 1;

var usercode='';

if (location.href.split('?')[1] != undefined) {
    usercode = Ext.urlDecode(location.href.split('?')[1]).usercode;
}

if(usercode!=''){
    OnPageMMLogin();
}



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
        fields:['V_GUID','V_WEEKID','V_ORGCODE','V_ORGNAME','V_DEPTCODE','V_DEPTNAME','V_EQUTYPECODE',
            'V_EQUCODE','V_EQUNAME','V_CONTENT','V_ENDTIME','V_STARTTIME','V_FLOWNAME','V_STATENAME',
            'V_MAIN_DEFECT','V_EXPECT_AGE', 'V_REPAIR_PER','expanded','leaf']
        //fields: ['V_YEAR','V_MONTH','V_WEEK','V_ORGCODE','V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME','V_EQUTYPECODE','V_EQUCODE', 'V_EQUNAME', 'V_CONTENT',
        //    'V_ENDTIME', 'V_STARTTIME', 'V_MAIN_DEFECT', 'V_EXPECT_AGE', 'V_REPAIR_PER', 'V_FLOWNAME', 'V_STATENAME']
    });
    var treeStore2 = Ext.create('Ext.data.TreeStore', {
        storeId: 'treeStore2',
        autoLoad: false,
        root: {
            expanded: true,
            text: "My Root"
        },
        fields:['V_YEAR','V_MONTH','V_WEEK','V_ORGCODE','V_DEPTCODE','V_EQUTYPECODE','V_EQUCODE',
            'V_CONTENT','V_EQUIP_NAME','V_ENDTIME','V_STARTTIME','V_MAIN_DEFECT','V_EXPECT_AGE',
            'V_REPAIR_PER','expanded','leaf']
        //fields: ['V_YEAR','V_MONTH','V_WEEK','V_ORGCODE','V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME','V_EQUTYPECODE','V_EQUCODE', 'V_EQUNAME', 'V_CONTENT',
        //    'V_ENDTIME', 'V_STARTTIME', 'V_MAIN_DEFECT', 'V_EXPECT_AGE', 'V_REPAIR_PER', 'V_FLOWNAME', 'V_STATENAME','V_EQUIP_NAME']
    });
    var treeStore3 = Ext.create('Ext.data.TreeStore', {
        storeId: 'treeStore3',
        autoLoad: false,
        root: {
            expanded: true,
            text: "My Root"
        },
        fields:['V_TYPE','V_ID','V_ORGCODE','V_ORGNAME','V_DEPTCODE','V_DEPTNAME','V_EQUCODE',
            'V_EQUNAME', 'V_CONTENT', 'V_ENDTIME', 'V_STARTTIME','V_MAIN_DEFECT','V_EXPECT_AGE'
            ,'V_REPAIR_PER','expanded','leaf']
        //fields: ['V_YEAR','V_MONTH','V_WEEK','V_ORGCODE','V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME','V_EQUTYPECODE','V_EQUCODE', 'V_EQUNAME', 'V_CONTENT',
        //    'V_ENDTIME', 'V_STARTTIME', 'V_MAIN_DEFECT', 'V_EXPECT_AGE', 'V_REPAIR_PER', 'V_FLOWNAME', 'V_STATENAME']
    });

    var northPanel = Ext.create('Ext.panel.Panel', {
        title: '<h3 style="font-size:16px !important;">周计划查询</h3>',
        titleAlign: 'center',
        region: 'north',
        frame: true,
        layout: 'column',
        defaults: {labelAlign: 'right'},
        items: [
            {xtype: 'datefield',id: 'sdate',format: 'Y-m-d',value: new Date(),fieldLabel: '开始时间',editable : false, margin: '5 0 0 5',labelWidth: 80, width: 200},
            {xtype: 'datefield',id: 'edate',format: 'Y-m-d',value: new Date(),fieldLabel: '结束时间',editable : false, margin: '5 0 0 5',labelWidth: 80, width: 200},
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
              {text: '周检修计划信息',
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
        title:'周检修计划',
        layout:'border',
        width: '100%',
        frame:true,
        items:[treegrid,ganttpanel]
    });
    var treegrid2 = Ext.create('Ext.tree.Panel', {
        id: 'treegrid2',
        store: treeStore2,
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
            {text: '周检修生产',
                columns: [{xtype: 'treecolumn', text: '设备名称', dataIndex: 'V_EQUIP_NAME', width: 180, align: 'center', renderer: AtleftN},
                    {text: '计划内容', dataIndex: 'V_CONTENT', width: 260, align: 'center', renderer: AtLeft},
                    {text: '参与人数', dataIndex: 'V_REPAIR_PER', width: 120, align: 'center', renderer: AtLeft}]}]
    });

    //甘特图 面板定义
    var ganttpanel2 = Ext.create('Ext.panel.Panel', {
        id: 'ganttpanel2',
        width: "64%",
        height: "100%",
        region: 'center',
        layout: 'border',
        items: []
    });
    var gantt2=Ext.create('Ext.panel.Panel',{
        region:'center',
        title:'周检修写实',
        layout:'border',
        width: '100%',
        frame:true,
        items:[treegrid2,ganttpanel2]
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
            {text: '周检修生产',
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
        title:'周检修生产',
        layout:'border',
        width: '100%',
        frame:true,
        items:[treegrid3,ganttpanel3]
    });

    var tabPanel=Ext.create('Ext.tab.Panel',{
        region:'center',
        frame:true,
        width:'100%',
        items:[gantt,gantt2,gantt3]
    });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [northPanel,tabPanel]
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
    QueryData2();
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
            V_V_SDATE: Ext.Date.format(Ext.getCmp('sdate').getValue(), 'Y/m/d'),
            V_V_EDATE: Ext.Date.format(Ext.getCmp('edate').getValue(), 'Y/m/d'),
            V_V_ORGCODE:Ext.getCmp('jhck').getValue(),
            V_V_DEPTCODE:Ext.getCmp('jhzyq').getValue()
        }
    });
    Ext.getCmp('treegrid').store.load();
    loadGantt();
}
function QueryData2(){

    Ext.getCmp('ganttpanel2').removeAll();

    Ext.getCmp('treegrid2').store.setProxy({
        type: 'ajax',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json'
        },
        url: AppUrl + 'cjy/PRO_WEEKPLAN_WORKORDER_GAUNTT',
        extraParams: {
            V_V_SDATE: Ext.Date.format(Ext.getCmp('sdate').getValue(), 'Y/m/d'),
            V_V_EDATE: Ext.Date.format(Ext.getCmp('edate').getValue(), 'Y/m/d'),
            V_V_ORGCODE:Ext.getCmp('jhck').getValue(),
            V_V_DEPTCODE:Ext.getCmp('jhzyq').getValue()
        }
    });
    Ext.getCmp('treegrid2').store.load();
    loadGantt2();
}
function loadGantt2(){

    ganttdata2 = [];

    Ext.Ajax.request({
        url: AppUrl + 'cjy/PRO_WEEKPLAN_WORKORDER_GAUNTT',
        method: 'POST',
        async: false,
        params: {
            V_V_SDATE: Ext.Date.format(Ext.getCmp('sdate').getValue(), 'Y/m/d'),
            V_V_EDATE: Ext.Date.format(Ext.getCmp('edate').getValue(), 'Y/m/d'),
            V_V_ORGCODE:Ext.getCmp('jhck').getValue(),
            V_V_DEPTCODE:Ext.getCmp('jhzyq').getValue()
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            ganttdata2 = resp;
            if (ganttdata2.length > 0) {
                createGantt2();
            }
        }
    });
}
function createGantt2(){

    cmItems2 = [];

    for (var i = 0; i < ganttdata2.length; i++) {
        if (i == 0) {
            starttime2 = new Date(ganttdata2[i].V_STARTTIME.split(" ")[0]+" 00:00:00");
            endtime2 = new Date(ganttdata2[i].V_ENDTIME.split(" ")[0]+" 23:59:59");
        } else {
            if(starttime2>new Date(ganttdata2[i].V_STARTTIME)){
                starttime2=new Date(ganttdata2[i].V_STARTTIME.split(" ")[0]+" 00:00:00");
            }
            if(endtime2<new Date(ganttdata2[i].V_ENDTIME)){
                endtime2=new Date(ganttdata2[i].V_ENDTIME.split(" ")[0]+" 23:59:59");
            }
        }
    }

    vStart2 = starttime2;
    vEnd2 = endtime2;

    vsMonth2=vStart2.getMonth()+1;
    veMonth2=vEnd2.getMonth()+1;

    vsDate2=vStart2.getDate();
    veDate2=vEnd2.getDate();

    var dateItems = [];

    for(var i=0;i<24;i++){
        dateItems.push({
            text: i,
            width: 40
        });
    }

    if(vsMonth2==veMonth2){

        for(var i=vsDate2;i<=veDate2;i++){
            cmItems2.push({
                text:vsMonth2+ '月'+i+"日",
                columns: dateItems
            });
        }

    }else{

        var lastDay=Ext.Date.getLastDateOfMonth(vStart2);

        for(var i=vsDate;i<=lastDay.getDate();i++){
            cmItems2.push({
                text:vsMonth2+ '月'+i+"日",
                columns: dateItems
            });
        }

        for(var i=vsMonth2+1;i<veMonth2;i++){
            var lastDay=getMonthDays(vStart2.getYear(),i);
            for(var j=0;j<lastDay;j++){
                cmItems2.push({
                    text:i+ '月'+(j+1)+"日",
                    columns: dateItems,
                    renderer: changeColor
                });
            }
        }

        for(var i=1;i<=veDate2;i++){
            cmItems2.push({
                text:veMonth2+ '月'+i+"日",
                columns: dateItems
            });
        }

    }

    cmItems2.push({
        text: '',
        width: 0,
        //dataIndex: 'MYCOLOR',
        renderer: pageFunction.IndexShow2
    });

    var ganttStore2 = Ext.create("Ext.data.Store", {
        storeId: 'ganttStore2',
        fields:['V_YEAR','V_MONTH','V_WEEK','V_ORGCODE','V_DEPTCODE','V_EQUTYPECODE','V_EQUCODE',
            'V_CONTENT','V_EQUIP_NAME','V_ENDTIME','V_STARTTIME','V_MAIN_DEFECT','V_EXPECT_AGE',
            'V_REPAIR_PER','expanded','leaf'],
        //fields:['V_YEAR','V_MONTH','V_WEEK','V_ORGCODE','V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME','V_EQUTYPECODE','V_EQUCODE', 'V_EQUNAME', 'V_CONTENT',
        //    'V_ENDTIME', 'V_STARTTIME', 'V_MAIN_DEFECT', 'V_EXPECT_AGE', 'V_REPAIR_PER', 'V_FLOWNAME', 'V_STATENAME', 'MYCOLOR','V_GUID','V_WEEKID','V_EQUIP_NAME'],
        data: ganttdata2,//ganttdata3,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    });

    var ganttgrid2 = Ext.create('Ext.grid.Panel', {
        id: 'ganttgrid2',
        region:'center',
        store: ganttStore2,
        columnLines: true,
        columns: cmItems2
    });

    Ext.getCmp('ganttpanel2').add(ganttgrid2);
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
            V_V_SDATE: Ext.Date.format(Ext.getCmp('sdate').getValue(), 'Y/m/d'),
            V_V_EDATE: Ext.Date.format(Ext.getCmp('edate').getValue(), 'Y/m/d'),
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
            V_V_SDATE: Ext.Date.format(Ext.getCmp('sdate').getValue(), 'Y/m/d'),
            V_V_EDATE: Ext.Date.format(Ext.getCmp('edate').getValue(), 'Y/m/d'),
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
            var temstarttime3 = ganttdata3[i].V_STARTTIME.split(',');
            var temendtime3 = ganttdata3[i].V_ENDTIME.split(',');
            for (var j = 0; j < temstarttime3.length; j++) {
                if (j == 0) {
                    starttime3 = new Date(temstarttime3[j].split(" ")[0] + " 00:00:00");
                    endtime3 = new Date(temendtime3[j].split(" ")[0] + " 23:59:59");
                } else {
                    if (starttime3 > new Date(temstarttime3[j])) {
                        starttime3 = new Date(temstarttime3[j].split(" ")[0] + " 00:00:00");
                    }
                    if (endtime3 < new Date(temendtime3[j])) {
                        endtime3 = new Date(temendtime3[j].split(" ")[0] + " 23:59:59");
                    }
                }
            }
        } else {
            var temstarttime3 = ganttdata3[i].V_STARTTIME.split(',');
            var temendtime3 = ganttdata3[i].V_ENDTIME.split(',');
            for (var j = 0; j < temstarttime3.length; j++) {

                if (starttime3 > new Date(temstarttime3[j])) {
                    starttime3 = new Date(temstarttime3[j].split(" ")[0] + " 00:00:00");
                }
                if (endtime3 < new Date(temendtime3[j])) {
                    endtime3 = new Date(temendtime3[j].split(" ")[0] + " 23:59:59");
                }

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
                columns: dateItems,
                renderer: changeColor
            });
        }

    }else{

        var lastDay=Ext.Date.getLastDateOfMonth(vStart3);

        for(var i=vsDate;i<=lastDay.getDate();i++){
            cmItems3.push({
                text:vsMonth3+ '月'+i+"日",
                columns: dateItems,
                renderer: changeColor
            });
        }

        for(var i=vsMonth3+1;i<veMonth3;i++){
            var lastDay=getMonthDays(vStart3.getYear(),i);
            for(var j=0;j<lastDay;j++){
                cmItems3.push({
                    text:i+ '月'+(j+1)+"日",
                    columns: dateItems,
                    renderer: changeColor
                });
            }
        }

        for(var i=1;i<=veDate3;i++){
            cmItems3.push({
                text:veMonth3+ '月'+i+"日",
                columns: dateItems,
                renderer: changeColor
            });
        }

    }

    cmItems3.push({
        text: '',
        width: 0,
        //dataIndex: 'MYCOLOR',
        renderer: pageFunction.IndexShow3
    });

    var ganttStore3 = Ext.create("Ext.data.Store", {
        storeId: 'ganttStore3',
        fields:['V_TYPE','V_ID','V_ORGCODE','V_ORGNAME','V_DEPTCODE','V_DEPTNAME','V_EQUCODE',
            'V_EQUNAME', 'V_CONTENT', 'V_ENDTIME', 'V_STARTTIME','V_MAIN_DEFECT','V_EXPECT_AGE'
            ,'V_REPAIR_PER','expanded','leaf'],
        //fields:['V_YEAR','V_MONTH','V_WEEK','V_ORGCODE','V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME','V_EQUTYPECODE','V_EQUCODE', 'V_EQUNAME', 'V_CONTENT',
        //    'V_ENDTIME', 'V_STARTTIME', 'V_MAIN_DEFECT', 'V_EXPECT_AGE', 'V_REPAIR_PER', 'V_FLOWNAME', 'V_STATENAME', 'MYCOLOR','V_GUID','V_WEEKID'],
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
        //columnLines: true,
        viewConfig:{getRowClass:changeRowClass},
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
            V_V_SDATE: Ext.Date.format(Ext.getCmp('sdate').getValue(), 'Y/m/d'),
            V_V_EDATE: Ext.Date.format(Ext.getCmp('edate').getValue(), 'Y/m/d'),
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

        for(var i=vsMonth+1;i<veMonth;i++){
            var lastDay=getMonthDays(vStart.getYear(),i);
            for(var j=0;j<lastDay;j++){
                cmItems.push({
                    text:i+ '月'+(j+1)+"日",
                    columns: dateItems,
                    renderer: changeColor
                });
            }
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
        //dataIndex: 'MYCOLOR',
        renderer: pageFunction.IndexShow
    });

    var ganttStore = Ext.create("Ext.data.Store", {
        storeId: 'ganttStore',
        fields:['V_GUID','V_WEEKID','V_ORGCODE','V_ORGNAME','V_DEPTCODE','V_DEPTNAME','V_EQUTYPECODE',
            'V_EQUCODE','V_EQUNAME','V_CONTENT','V_ENDTIME','V_STARTTIME','V_FLOWNAME','V_STATENAME',
            'V_MAIN_DEFECT','V_EXPECT_AGE', 'V_REPAIR_PER','expanded','leaf'],
        //fields:['V_YEAR','V_MONTH','V_WEEK','V_ORGCODE','V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME','V_EQUTYPECODE','V_EQUCODE', 'V_EQUNAME', 'V_CONTENT',
        //'V_ENDTIME', 'V_STARTTIME', 'V_MAIN_DEFECT', 'V_EXPECT_AGE', 'V_REPAIR_PER', 'V_FLOWNAME', 'V_STATENAME', 'MYCOLOR','V_GUID','V_WEEKID'],
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

        var gtt = '<div style="left:' + vleft.toString() + 'px;height:22px;width:' + vwidth.toString() + 'px;background-color:red;" class="sch-event" onmouseover="a1(\'' + record.data.V_GUID + '\')" onmouseout="a2(\'' + record.data.V_GUID + '\')"><div class="sch-event-inner" >' + record.data.V_CONTENT + '</div></div>' +
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
    /**构造显示结构2*/
    IndexShow2: function (value, metaData, record) {
        var stime2 = [];
        var etime2 = [];
        stime2 = record.data.V_STARTTIME.split(',');
        etime2 = record.data.V_ENDTIME.split(',');

        var gtt='';
        for (var i = 0; i < stime2.length; i++) {

            var stimei=stime2[i];
            var etimei=etime2[i];
            var startd = new Date(stimei.split(".0")[0].replace(/-/g, "/"));
            var endd = new Date(etimei.split(".0")[0].replace(/-/g, "/"));

            var vleft = ((startd.getTime() - vStart2.getTime()) / (3600 * 1000)) * 40;
            var vwidth = ((endd.getTime() - startd.getTime()) / (3600 * 1000)) * 40;

            /*gtt += '<div style="left:' + vleft.toString() + 'px;height:26px;width:' + vwidth.toString()
             + 'px;background-color:red;" class="sch-event" onmouseover="a1(\'' + record.data.V_GUID + '\')" onmouseout="a2(\'' + record.data.V_GUID + '\')"><div class="sch-event-inner" >'
             + record.data.V_CONTENT + '</div></div>'
             +'<div class="lxm"  id="' + record.data.V_GUID + '" style="display:none; position:absolute; z-index:9999; border:1px solid #666;">开始时间：'
             + stime.split('.0')[0] + '<br>' + '结束时间：' + etime[i].split('.0')[0] + '<br>' + '主要缺陷：' + record.data.V_MAIN_DEFECT + '<br>'
             + '预计寿命：' + record.data.V_EXPECT_AGE + '<br>' + '维修人数：' + record.data.V_REPAIR_PER + '<br>';*/
            gtt += '<div style="left:' + vleft.toString() + 'px;height:22px;width:' + vwidth.toString()
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

    },
    /**构造显示结构3*/
    IndexShow3: function (value, metaData, record) {
        var stime3 = [];
        var etime3 = [];
        stime3 = record.data.V_STARTTIME.split(',');
        etime3 = record.data.V_ENDTIME.split(',');

        var gtt='';
        for (var i = 0; i < stime3.length; i++) {

            var stimei=stime3[i];
            var etimei=etime3[i];
            var startd = new Date(stimei.split(".0")[0].replace(/-/g, "/"));
            var endd = new Date(etimei.split(".0")[0].replace(/-/g, "/"));

            var vleft = 0;vleft=((startd.getTime() - vStart3.getTime()) / (3600 * 1000)) * 40;
            var vwidth = 0;vwidth=((endd.getTime() - startd.getTime()) / (3600 * 1000)) * 40;
            /*gtt += '<div style="left:' + vleft.toString() + 'px;height:26px;width:' + vwidth.toString()
                + 'px;background-color:red;" class="sch-event" onmouseover="a1(\'' + record.data.V_GUID + '\')" onmouseout="a2(\'' + record.data.V_GUID + '\')"><div class="sch-event-inner" >'
                + record.data.V_CONTENT + '</div></div>'
                +'<div class="lxm"  id="' + record.data.V_GUID + '" style="display:none; position:absolute; z-index:9999; border:1px solid #666;">开始时间：'
                + stime.split('.0')[0] + '<br>' + '结束时间：' + etime[i].split('.0')[0] + '<br>' + '主要缺陷：' + record.data.V_MAIN_DEFECT + '<br>'
                + '预计寿命：' + record.data.V_EXPECT_AGE + '<br>' + '维修人数：' + record.data.V_REPAIR_PER + '<br>';*/
            gtt += '<div style="left:' + vleft.toString() + 'px;height:22px;width:' + vwidth.toString()
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
//传入年份和月份 获取该年对应月份的天数
function getMonthDays(year,month){
    var thisDate = new Date(year,month,0); //当天数为0 js自动处理为上一月的最后一天
    return thisDate.getDate();
}
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

function changeColor(value, metaData, record, rowIndex, colIndex, store) {

        metaData.style = "color:#00FF00";
        return value;

};

function changeRowClass(record, rowIndex, rowParams, store){
        return "x-grid-record-green";
}