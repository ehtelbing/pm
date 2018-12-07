/**
 * Created by lxm on 2017/8/14.
 */
var date = new Date();
var dt = new Date();
var thisYear = dt.getFullYear();
var years = [];
var weeks=[];
for (var i=1;i<=6;i++) weeks.push([i,i]);
for (var i = 2014; i <= thisYear + 1; i++) years.push([i,i]);
var months=[];
for (var i = 1; i <= 12; i++) months.push([i,i]);

var processKey = '';
var V_STEPNAME = '';
var V_NEXT_SETP = '';

// var url_guid='';
// var url_deptcode;
// var url_zy;
// if (location.href.split('?')[1] != undefined) {
//     url_guid = Ext.urlDecode(location.href.split('?')[1]).v_guid_dx;
//     url_deptcode = Ext.urlDecode(location.href.split('?')[1]).v_deptcode;
//     url_zy = Ext.urlDecode(location.href.split('?')[1]).v_specialty;
// }
Ext.onReady(function () {
    var ckstore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'ckstore',
        fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl +'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.util.Cookies.get('v_deptcode'),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '基层单位'
            }
        }
    });
    // var ztstore = Ext.create('Ext.data.Store', {
    //     autoLoad: false,
    //     storeId: 'ztstore',
    //     fields: ['V_BASECODE', 'V_BASENAME'],
    //     proxy: {
    //         type: 'ajax',
    //         async: false,
    //         url: AppUrl + 'PM_03/PM_03_PLAN_STATE_SEL',
    //         actionMethods: {
    //             read: 'POST'
    //         },
    //         reader: {
    //             type: 'json',
    //             root: 'list'
    //         }
    //     }
    // });

    var zyqstore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'zyqstore',
        fields:  ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
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

    //设备类型
    var sblxStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'sblxStore',
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
//设备名称
    var sbmcStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'sbmcStore',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/pro_get_deptequ_per',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    var nextSprStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'nextSprStore',
        fields: ['V_PERSONCODE', 'V_PERSONNAME', 'V_V_NEXT_SETP', 'V_V_FLOW_STEPNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PM_ACTIVITI_PROCESS_PER_SELSBB',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        }
        // ,listeners: {
        //     load: function (store, records, success, eOpts) {
        //         processKey = store.getProxy().getReader().rawData.RET;
        //         V_STEPNAME = store.getAt(0).data.V_V_FLOW_STEPNAME;
        //         V_NEXT_SETP = store.getAt(0).data.V_V_NEXT_SETP;
        //
        //         Ext.getCmp('nextPer').select(store.first());
        //
        //     }
        //
        // }
    });
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['I_ID',
            'V_WEEKPLAN_GUID',
            'V_YEAR',
            'V_MONTH',
            'V_WEEK',
            'V_ORGCODE',                          //厂矿
            'V_ORGNAME',
            'V_DEPTCODE',                         //作业区
            'V_DEPTNAME',
            'V_EQUTYPECODE',                     //设备类型
            'V_EQUTYPENAME',
            'V_EQUCODE',
            'V_EQUNAME',
            'V_REPAIRMAJOR_CODE',
            'V_CONTENT',
            'V_STARTTIME',
            'V_ENDTIME',
            'V_HOUR',
            'V_REPAIRDEPT_CODE',
            'V_MANNAME',
            'V_TEL',
            'V_INDATE',
            'V_INPER',
            'V_PERSONNAME',
            'V_FLOWCODE',
            'V_JXMX_CODE',
            'V_JXGX_CODE',
            'V_MONTHPLAN_CODE',
            'V_WEEKID',
            'V_STATE',
            'V_STATUSNAME', 'V_GUID', 'V_STATENAME', 'V_INPERNAME', 'V_FLOWNAME',
            'V_MAIN_DEFECT',
            'V_EXPECT_AGE',
            'V_REPAIR_PER',
        'V_SBB_GUID'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PRO_PM_03_PLAN_WEEK_VIEWSBB',
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

    var panel = Ext.create('Ext.form.Panel', {
        id:'panel',
        region: 'north',
        frame: true,
        border: false,
        layout: 'column',
        defaults: {style: 'margin:5px 0px 5px 5px',labelAlign: 'right'},
        items: [
            {id:'year',xtype:'combo',labelWidth: 80,
                labelAlign:'right',fieldLabel:'年份',
                store:years,displayField:'Item1',valueField:'Item2',
                value:'',editable:false,queryMode:'local'},
            {id: 'month', store: months, xtype: 'combo', fieldLabel: '月份',
                value: '',labelWidth: 80,
                labelAlign:'right', editable: false,
                displayField: 'displayField', valueField: 'valueField'},
            {id: 'week', store: weeks, xtype: 'combo', fieldLabel: '周',
                value: '',labelWidth: 80,
                labelAlign:'right', editable: false,
                displayField: 'displayField', valueField: 'valueField'},
            {
                id: 'ck',
                xtype: 'combo',
                store: ckstore,
                editable: false,
                fieldLabel: '厂矿',
                labelWidth: 80,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local',
                baseCls: 'margin-bottom'
            }, {
                id: 'zyq',
                xtype: 'combo',
                store: zyqstore,
                editable: false,
                fieldLabel: '作业区',
                labelWidth: 80,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local',
                baseCls: 'margin-bottom'
            }, {
                xtype: 'combo',
                id: 'sblx',
                fieldLabel: '设备类型',
                editable: false,
                labelWidth: 80,
                displayField: 'V_EQUTYPENAME',
                valueField: 'V_EQUTYPECODE',
                store: sblxStore,
                queryMode: 'local',
                listConfig:{
                    minWidth:120
                }
            },
            {
                xtype: 'combo',
                id: 'sbmc',
                fieldLabel: '设备名称',
                editable: false,
                labelAlign: 'right',
                labelWidth: 80,
                displayField: 'V_EQUNAME',
                valueField: 'V_EQUCODE',
                store: sbmcStore,
                queryMode: 'local'
            },{
                id: 'zy',
                xtype: 'combo',
                store: zyStore,
                editable: false,
                fieldLabel: '专业',
                labelWidth: 80,
                displayField: 'V_MAJOR_CODE',
                valueField: 'V_MAJOR_NAME',
                queryMode: 'local',
                baseCls: 'margin-bottom'
            },  {
                xtype: 'combo',
                id: 'nextPer',
                fieldLabel: '下一步接收人',
                editable: false,
                margin: '5 0 5 5',
                labelWidth: 80,
                width: 220,
                value: '',
                displayField: 'V_PERSONNAME',
                valueField: 'V_PERSONCODE',
                store: nextSprStore,
                queryMode: 'local'
            },
            // {
            //     xtype: 'combo',
            //     id: 'zt',
            //     fieldLabel: '状态',
            //     editable: false,
            //     margin: '5 0 5 5',
            //     labelWidth: 80,
            //     width: 230,
            //     value: '',
            //     displayField: 'V_BASENAME',
            //     valueField: 'V_BASECODE',
            //     store: ztstore,
            //     queryMode: 'local'
            // },
            {
                id: 'seltext',
                xtype: 'textfield',
                width: 158,
                emptyText: '检修明细模糊搜索',
                margin:'5px 0px 5px 90px'
            }, {
                id: 'query',
                xtype: 'button',
                icon: imgpath + '/search.png',
                text: '查询',
                width: 80,
                handler:QueryGrid
            }, {
                xtype: 'label',
                hidden:true,
                width:90,
                id: 'tabid'
            }, {
                xtype: 'button',
                text: '上报设备部',
                width: 90,
                icon: imgpath + '/accordion_collapse.png',
                handler: OnButtonUp
            }]
    });
    var grid=Ext.create('Ext.grid.Panel',{
        region:'center',
        width:'100%',
        store:gridStore,
        id:'grid',
        height:260,
        style:'margin:0px 0px 5px 0px',
        autoScroll: true,
        columnLines: true,
        // selModel:{
        //     //mode:'singel',
        //     selType:'checkboxmodel'
        // },
        columns:[
            { xtype : 'rownumberer',
                text : '序号',
                width : 50,
                align : 'center' },
            {text: '计划状态', align: 'center', width: 100, dataIndex: 'V_STATENAME'},
            { text: '厂矿',width:200,dataIndex:'V_ORGNAME', align: 'center',renderer:Atleft },
            { text: '机台（机组）名称',width:200,dataIndex:'V_EQUTYPENAME', align: 'center',renderer:Atleft },
            { text: '检修内容',width:200,dataIndex:'V_CONTENT', align: 'center',renderer:Atleft },
            { text: '检修开始时间',width:200,dataIndex:'V_ENDTIME', align: 'center',renderer:rendererTime },
            { text: '计划竣工日期',width:200,dataIndex:'V_STARTTIME', align: 'center',renderer:rendererTime },
            { text: '检修结束时间',width:200,dataIndex:'V_HOUR', align: 'center',renderer:Atleft },
            { text: '计划工时',width:200,dataIndex:'V_HOUR', align: 'center',renderer:Atleft },
            { text: '施工方式',width:200,dataIndex:'V_ORGNAME', align: 'center',renderer:Atleft },
            { text: '施工单位',width:200,dataIndex:'V_DEPTNAME', align: 'center',renderer:Atleft },
            { text: '检修负责人',width:200,dataIndex:'V_INPERNAME', align: 'center',renderer:Atleft },
            { text: '联系电话',width:200,dataIndex:'V_INDATE', align: 'center',renderer:rendererTime },
            { text: '施工准备是否已落实',width:200,dataIndex:'V_INPERNAME', align: 'center',renderer:Atleft },
            { text: '情况说明',width:200,dataIndex:'V_INDATE', align: 'center',renderer:rendererTime },
            { text: '新guid',width:200,dataIndex:'V_SBB_GUID', align: 'center',hidden:true,renderer:rendererTime }
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
    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel, grid]
    });

    Ext.data.StoreManager.lookup('nextSprStore').on('load', function (store, records, success, eOpts) {
            processKey = store.getProxy().getReader().rawData.RET;
            if(store.getAt(0)==undefined){
                V_STEPNAME ="";
                V_NEXT_SETP = "";return ;}
                else{
                V_STEPNAME = store.getAt(0).data.V_V_FLOW_STEPNAME;
                V_NEXT_SETP = store.getAt(0).data.V_V_NEXT_SETP;}

            if(V_STEPNAME!=""){Ext.getCmp('nextPer').select(store.first());}

            // Ext.getCmp('nextPer').select(store.first());
        }
    );
    // Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
    //     store.proxy.extraParams = {
    //         V_V_YEAR:Ext.getCmp('year').getValue(),
    //         V_V_MONTH:Ext.getCmp('month').getValue(),
    //         V_V_WEEK:Ext.getCmp('week').getValue(),
    //         V_V_ORGCODE:Ext.getCmp('ck').getValue(),
    //         V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),
    //         V_V_ZY:Ext.getCmp('zy').getValue(),
    //         V_V_EQUTYPE:Ext.getCmp('sblx').getValue(),
    //         V_V_EQUCODE:Ext.getCmp('sbmc').getValue(),
    //         V_V_CONTENT:Ext.getCmp('seltext').getValue()==""?"%":Ext.getCmp('seltext').getValue(),
    //         V_V_FLOWTYPE:'WORK',
    //         V_V_STATE:'30,31',//审批完成，已下票
    //         V_V_PAGE: Ext.getCmp('page').store.currentPage,
    //         V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
    //     }
    // });
    Ext.getCmp('week').select(getWeekOfMonth());

    ckstore.on("load", function () {
        // if(url_deptcode!=undefined){
        //     Ext.getCmp("ck").select(url_deptcode.substring(0,4));
        // }else{
       // ckstore.insert(0,{ V_DEPTNAME:'全部',V_DEPTCODE:'%'});
            Ext.getCmp("ck").select(ckstore.getAt(0));
        // }
        Ext.ComponentManager.get('zyq').getStore().removeAll();
        Ext.data.StoreManager.lookup('zyqstore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE: '[主体作业区]'
            }
        });
    });


    Ext.ComponentManager.get("ck").on("select", function () {
        Ext.ComponentManager.get('zyq').getStore().removeAll();
        Ext.data.StoreManager.lookup('zyqstore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE: '[主体作业区]'
            }
        });
    });

    Ext.data.StoreManager.lookup('zyqstore').on("load", function () {
        // if(url_deptcode!=undefined){
        //     Ext.data.StoreManager.lookup('zyqstore').insert(0,{V_DEPTNAME:'全部',V_DEPTCODE:'%'});
        //     Ext.getCmp("zyq").select(url_deptcode);
        // }else{
            Ext.data.StoreManager.lookup('zyqstore').insert(0,{V_DEPTNAME:'全部',V_DEPTCODE:'%'});
            Ext.getCmp("zyq").select(zyqstore.getAt(0));
        // }
        Ext.data.StoreManager.lookup('sblxStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
            }
        });
    });

    Ext.getCmp('zyq').on('select', function () {
        Ext.data.StoreManager.lookup('sblxStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
            }
        });
    });

    Ext.getCmp('sblx').on('select', function () {
        Ext.data.StoreManager.lookup('sbmcStore').load({
            params: {
                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                v_v_deptcodenext: Ext.getCmp('zyq').getValue(),
                v_v_equtypecode: Ext.getCmp('sblx').getValue()
            }
        });
    });

    //设备类型加载监听
    Ext.data.StoreManager.lookup('sblxStore').on('load', function () {
        Ext.getCmp("sblx").select('%');
        Ext.data.StoreManager.lookup('sbmcStore').load({
            params: {
                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                v_v_deptcodenext: Ext.getCmp('zyq').getValue(),
                v_v_equtypecode: Ext.getCmp('sblx').getValue()
            }
        });
    });
    //设备名称加载监听
    Ext.data.StoreManager.lookup('sbmcStore').on('load', function () {
        Ext.getCmp("sbmc").select(Ext.data.StoreManager.lookup('sbmcStore').getAt(0));
        zyStore.load({
            params:{

            }
        });
    });

    Ext.data.StoreManager.lookup('zyStore').on('load', function(){
        Ext.data.StoreManager.lookup('zyStore').insert(0,{V_MAJOR_CODE:'全部',V_MAJOR_NAME:'%'});
        // if(url_zy!=undefined){
        //     Ext.getCmp('zy').select(url_zy);
        //     // Ext.data.StoreManager.lookup('ztstore').load({
        //     //     params: {}
        //     // });
        // }else{
            Ext.getCmp('zy').select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
            // Ext.data.StoreManager.lookup('ztstore').load({
            //     params: {}
            // });
        // }
        QueryGrid();
    });
    // Ext.data.StoreManager.lookup('ztstore').on('load', function () {
    //     Ext.data.StoreManager.lookup('ztstore').insert(0, {V_BASENAME: '全部', V_BASECODE: '%'});
    //     Ext.getCmp("zt").select(Ext.data.StoreManager.lookup('ztstore').getAt(0));
    //     QueryGrid();
    // });
    // Ext.getCmp("zt").on('select', function () {
    //     QueryGrid();
    // });
    // Ext.getCmp('zks').setValue(getWeekStartDate());
    // Ext.getCmp('zjs').setValue(getWeekEndDate());
    Ext.getCmp('year').on('select', function () {
        // Ext.getCmp('zks').setValue(getWeekStartDate());
        // Ext.getCmp('zjs').setValue(getWeekEndDate());
        QueryGrid();
    });
    Ext.getCmp('month').on('select', function () {
        // Ext.getCmp('zks').setValue(getWeekStartDate());
        // Ext.getCmp('zjs').setValue(getWeekEndDate());
        QueryGrid();
    });
    Ext.getCmp('week').on('select', function () {
        // Ext.getCmp('zks').setValue(getWeekStartDate());
        // Ext.getCmp('zjs').setValue(getWeekEndDate());
        QueryGrid();
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_V_YEAR: Ext.getCmp('year').getValue(),
            V_V_MONTH: Ext.getCmp('month').getValue(),
            V_V_WEEK: Ext.getCmp('week').getValue(),
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
            V_V_ZY:Ext.getCmp('zy').getValue(),
            V_V_EQUTYPE: Ext.getCmp('sblx').getValue(),
            V_V_EQUCODE: Ext.getCmp('sbmc').getValue(),
            V_V_CONTENT: Ext.getCmp('seltext').getValue()==""?"%":Ext.getCmp('seltext').getValue(),
            V_V_STATE: "30",  //Ext.getCmp('zt').getValue(),设置查询查询状态默认为'审批完成'
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    });

});

function rendererTime(value, metaData){

    return value.split(".")[0];
}
//第几周
function getWeekOfMonth() {//周一为起始
    var w = date.getDay()==0?7:date.getDay();//星期
    var d = date.getDate();//日期

    var week= Math.ceil((d + 7 - w) / 7);//向上取整

    if(week==getWeeks()){//为最后周
        if(date.getMonth() + 1==12){//为最后月，月份年份均变化
            Ext.getCmp('year').select(date.getFullYear()+1);
            Ext.getCmp('month').select(1);
        }else{//月份变化
            Ext.getCmp('year').select(date.getFullYear());
            Ext.getCmp('month').select(date.getMonth() + 2);
        }
        return 1;
    }else{
        Ext.getCmp('year').select(date.getFullYear());
        Ext.getCmp('month').select(date.getMonth() + 1);
        return week+1;
    }

}
//当前月有几周
function getWeeks(){
    var str=date;
    var year=str.getFullYear();
    var month=str.getMonth()+1;
    var lastday=new Date(year, month,0);

    var w = lastday.getDay()==0?7:lastday.getDay();//星期
    var d = lastday.getDate();//日期

    return Math.ceil((d + 7 - w) / 7);//向上取整

}

function Atleft(value, metaData) {
    metaData.style = 'text-align: left';
    return value;
}
function QueryGrid(){
    Ext.getCmp('page').store.currentPage = 1;
    //grid显示
        Ext.data.StoreManager.lookup('gridStore').load({
            params: {
                V_V_YEAR: Ext.getCmp('year').getValue(),
                V_V_MONTH: Ext.getCmp('month').getValue(),
                V_V_WEEK: Ext.getCmp('week').getValue(),
                V_V_ORGCODE: Ext.getCmp('ck').getValue(),
                V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
                V_V_ZY:Ext.getCmp('zy').getValue(),
                V_V_EQUTYPE: Ext.getCmp('sblx').getValue(),
                V_V_EQUCODE: Ext.getCmp('sbmc').getValue(),
                V_V_CONTENT: Ext.getCmp('seltext').getValue()==""?"%":Ext.getCmp('seltext').getValue(),
                V_V_STATE: "30",//Ext.getCmp('zt').getValue(),
                V_V_PAGE: Ext.getCmp('page').store.currentPage,
                V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
            }
        });
    _selectNextSprStore();

}


//月共几天
function getDaysOfMonth(year,month){
    var month = parseInt(month, 10);
    var d= new Date(year, month, 0);
    return d.getDate();
}

//本周开始时间
function getWeekStartDate() {
    var year=Ext.getCmp('year').getValue();
    var month=Ext.getCmp('month').getValue();
    var week=Ext.getCmp('week').getValue();
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
    var year=Ext.getCmp('year').getValue();
    var month=Ext.getCmp('month').getValue();
    var week=Ext.getCmp('week').getValue();
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
function _selectNextSprStore() {
    var nextSprStore = Ext.data.StoreManager.lookup('nextSprStore');
    nextSprStore.proxy.extraParams = {
        V_V_ORGCODE: Ext.getCmp('ck').getValue(),
        V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
        V_V_REPAIRCODE: '',
        V_V_FLOWTYPE: 'WeekPlan01',
        V_V_FLOW_STEP: 'start',
        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_SPECIALTY: Ext.getCmp('zy').getValue(),
        V_V_WHERE: ''

    };
    nextSprStore.currentPage = 1;
    nextSprStore.load();
}
//上报
function OnButtonUp() {
    // var records = Ext.getCmp('grid').getSelectionModel().getSelection();
    // if (records.length == 0) {//判断是否选中数据
    //     Ext.MessageBox.show({
    //         title: '提示',
    //         msg: '请选择一条数据',
    //         buttons: Ext.MessageBox.OK,
    //         icon: Ext.MessageBox.WARNING
    //     });
    //     return false;
    // }
    if(Ext.getCmp('nextPer').getValue()==""){
        alert('下一步审批人为空，请从新选择'); return;
    }
    //Ext.MessageBox.show({
    //    title: '确认',
    //    msg: '您确定要上报吗？',
    //    buttons: Ext.MessageBox.YESNO,
    //    icon: Ext.MessageBox.QUESION,
    //    fn: function (btn) {
    //        if (btn == 'yes') {
//---new start 2018-09-17
    var i_err = 0;
    // for (var i = 0; i < records.length; i++) {
    //    if (Ext.Date.format(new Date(), 'Y-m-d H:i:s') >= Ext.getCmp("starttime").getValue() && Ext.Date.format(new Date(), 'Y-m-d H:i:s') <= Ext.getCmp("endtime").getValue()) {

    var records=Ext.data.StoreManager.lookup('gridStore').getProxy().getReader().rawData;
    for(var i=0;i<records.list.length;i++){
        if(records.list[i].V_STATE=="30"){
            Ext.Ajax.request({
                url: AppUrl + 'dxfile/PRO_PM_03_PLAN_WEEK_SEND2',
                method: 'POST',
                async: false,
                params: {
                    V_V_GUID: records.list[i].V_SBB_GUID,
                    V_V_ORGCODE: records.list[i].V_ORGCODE,
                    V_V_DEPTCODE: records.list[i].V_DEPTCODE,
                    V_V_FLOWCODE: '上报',
                    V_V_PLANTYPE: 'WEEK',
                    V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode')
                },
                success: function (resp) {
                    var resp = Ext.decode(resp.responseText).list[0];
                    // var new_businssflowkey=(parseInt(records.list[i].get('V_GUID'))+1).toString();

                    if (resp.V_INFO == '成功') {
                        Ext.Ajax.request({
                            url: AppUrl + 'Activiti/StratProcess',
                            async: false,
                            method: 'post',
                            params: {
                                parName: ["originator", "flow_businesskey", V_NEXT_SETP, "idea", "remark", "flow_code", "flow_yj", "flow_type"],
                                parVal: [Ext.util.Cookies.get('v_personcode'), records.list[i].V_SBB_GUID, Ext.getCmp('nextPer').getValue(), "请审批!", records.list[i].V_CONTENT, records.list[i].V_WEEKID, "请审批！", "WeekPlan01"],
                                processKey: processKey,
                                businessKey: records.list[i].V_SBB_GUID, // records[i].get('V_GUID'),
                                V_STEPCODE: 'Start',
                                V_STEPNAME: V_STEPNAME,
                                V_IDEA: '请审批！',
                                V_NEXTPER: Ext.getCmp('nextPer').getValue(),
                                V_INPER: Ext.util.Cookies.get('v_personcode')
                            },
                            success: function (response) {
                                if (Ext.decode(response.responseText).ret == 'OK') {
                                    QueryGrid();
                                } else if (Ext.decode(response.responseText).error == 'ERROR') {
                                    i_err++;
                                    Ext.Msg.alert('提示', '该流程发起失败'+i_err+'条数据!');
                                }
                            }
                        });
                        // i_err++;
                        //
                        // if (i_err == records.length) {
                        //     QueryGrid();
                        // }
                    } else {
                        Ext.MessageBox.show({
                            title: '错误',
                            msg: resp.V_INFO,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR,
                            fn: function (btn) {
                                QueryGrid();
                            }
                        });
                    }
                }
                ,
                failure: function (response) {
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: response.responseText,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR,
                        fn: function (btn) {
                            QueryGrid();
                        }
                    })
                }
            });
        }

    }

      //  }
      //   else {
      //       Ext.Msg.alert('提示', '该计划不在上报时间内！');
      //   }
    // }

}
