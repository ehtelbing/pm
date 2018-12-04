/**
 * Created by lxm on 2017/8/14.
 */
var date = new Date();
var dt = new Date();
var thisYear = dt.getFullYear();
var years = [];
var weeks=[];
for (var i=1;i<=6;i++) weeks.push({displayField:i,valueField:i});
var yearStore = Ext.create("Ext.data.Store", {
    storeId: 'yearStore',
    fields: ['displayField', 'valueField'],
    data: years,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});
for (var i = 2014; i <= thisYear + 1; i++) years.push({displayField:i,valueField:i});
var months=[];
var monthStore = Ext.create("Ext.data.Store", {
    storeId: 'monthStore',
    fields: ['displayField', 'valueField'],
    data: months,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});
for (var i = 1; i <= 12; i++) months.push({displayField:i,valueField:i});
var weekStore = Ext.create("Ext.data.Store", {
    storeId: 'weekStore',
    fields: ['displayField', 'valueField'],
    data: weeks,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});
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
    var ztstore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'ztstore',
        fields: ['V_BASECODE', 'V_BASENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl +'lxm/pro_pm_basedic_zy',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'V_V_PLAN': 'PLAN/WORK'
            }
        }
    });

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
    var gridStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'gridStore',
        pageSize: 20,
        fields: [
            'I_ID',
            'V_GUID',
            'V_YEAR',
            'V_MONTH',
            'V_WEEK',
            'V_ORGCODE',
            'V_ORGNAME',
            'V_DEPTCODE',
            'V_DEPTNAME',
            'V_EQUTYPECODE',
            'V_EQUTYPENAME',
            'V_EQUCODE',
            'V_EQUNAME',
            'V_REPAIRMAJOR_CODE',
            'V_CONTENT',
            'V_ENDTIME',
            'V_STARTTIME',
            'V_HOUR',
            'V_REPAIRDEPT_CODE',
            'V_REPAIRDEPT_NAME',
            'V_MANNAME',
            'V_TEL',
            'V_INDATE',
            'V_INPER',
            'V_INPERNAME',
            'V_FLOWCODE',
            'V_FLOWORDER',
            'V_FLOWTYPE',
            'V_ORDER',
            'V_BZ',
            'V_JHMX_GUID',
            'V_OTHERPLAN_GUID',
            'V_OTHERPLAN_TYPE',
            'V_WEEKID',
            'V_STATE',
            'V_WORKFLAG_NAME',
            'V_STATENAME'

        ],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PM_03_PLAN_WEEK_SEL2',
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
        id: 'panellow',
        region: 'north',
        defaults: {
            style: 'margin:5px 0px 5px 5px',
            labelAlign: 'right'
        },
        layout: {
            type: 'column'
        },
        frame:true,
        items: [
            {id:'year',xtype:'combo',labelWidth: 80,
                labelAlign:'right',fieldLabel:'年份',
                store:yearStore,displayField:'Item1',valueField:'Item2',
                value:'',editable:false,queryMode:'local'},
            {id: 'month', store: monthStore, xtype: 'combo', fieldLabel: '月份',
                value: '',labelWidth: 80,
                labelAlign:'right', editable: false,
                displayField: 'displayField', valueField: 'valueField'},
            {id: 'week', store: weekStore, xtype: 'combo', fieldLabel: '周',
                value: '',labelWidth: 80,
                labelAlign:'right', editable: false,
                displayField: 'displayField', valueField: 'valueField'},
            // {xtype : 'displayfield', id : 'zks', fieldLabel : '本周开始时间', labelWidth : 80, width:243,labelAlign : 'right'},
            // {xtype : 'displayfield', id : 'zjs', fieldLabel : '本周结束时间', labelWidth : 80, width:243,labelAlign : 'right'},
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
                    mixWidth:120
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
            }, {
                id: 'zt',
                xtype: 'combo',
                store: ztstore,
                editable: false,
                fieldLabel: '状态',
                labelWidth: 80,
                hidden:true,
                displayField: 'V_BASENAME',
                valueField: 'V_BASECODE',
                queryMode: 'local',
                baseCls: 'margin-bottom'
            }, {
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
                handler:QueryGrid,
                margin:'5px 0px 5px 50px'
            }
        ]
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
        selModel:{
            //mode:'singel',
            selType:'checkboxmodel'
        },
        columns:[
            { xtype : 'rownumberer',
                text : '序号',
                width : 50,
                align : 'center' },
            { text: '计划状态',width:200,dataIndex:'V_STATENAME', align: 'center',renderer:Atleft },
            { text: '设备名称',width:200,dataIndex:'V_EQUTYPENAME', align: 'center',renderer:Atleft },
            { text: '专业',width:200,dataIndex:'V_REPAIRMAJOR_CODE', align: 'center',renderer:Atleft },
            { text: '检修内容',width:200,dataIndex:'V_CONTENT', align: 'center',renderer:Atleft },
            { text: '计划停机日期',width:200,dataIndex:'V_ENDTIME', align: 'center',renderer:rendererTime },
            { text: '计划竣工日期',width:200,dataIndex:'V_STARTTIME', align: 'center',renderer:rendererTime },
            { text: '计划工期',width:200,dataIndex:'V_HOUR', align: 'center',renderer:Atleft },
            { text: '厂矿',width:200,dataIndex:'V_ORGNAME', align: 'center',renderer:Atleft },
            { text: '车间名称',width:200,dataIndex:'V_DEPTNAME', align: 'center',renderer:Atleft },
            { text: '录入人',width:200,dataIndex:'V_INPERNAME', align: 'center',renderer:Atleft },
            { text: '录入时间',width:200,dataIndex:'V_INDATE', align: 'center',renderer:rendererTime }
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

    Ext.getCmp('week').select(getWeekOfMonth());
    ckstore.on("load", function () {
        // if(url_deptcode!=undefined){
        //     Ext.getCmp("ck").select(url_deptcode.substring(0,4));
        // }else{
            Ext.getCmp("ck").select(ckstore.getAt(0));
        // }


    });
    ztstore.on("load", function () {
        Ext.getCmp("zt").select(ztstore.getAt(0));
    });

    Ext.ComponentManager.get("ck").on("change", function () {
        Ext.ComponentManager.get('zyq').getStore().removeAll();
        zyqstore.load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE: '[主体作业区]'
            }
        });
    });

    zyqstore.on("load", function () {
        // if(url_deptcode!=undefined){
        //     Ext.data.StoreManager.lookup('zyqstore').insert(0,{V_DEPTNAME:'全部',V_DEPTCODE:'%'});
        //     Ext.getCmp("zyq").select(url_deptcode);
        // }else{
            Ext.data.StoreManager.lookup('zyqstore').insert(0,{V_DEPTNAME:'全部',V_DEPTCODE:'%'});
            Ext.getCmp("zyq").select(zyqstore.getAt(0));
        // }
    });

    Ext.getCmp('zyq').on('change', function () {
        Ext.data.StoreManager.lookup('sblxStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
            }
        });

    });

    Ext.getCmp('sblx').on('change', function () {
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
    });
    //设备名称加载监听
    Ext.data.StoreManager.lookup('sbmcStore').on('load', function () {
        Ext.getCmp("sbmc").select(Ext.data.StoreManager.lookup('sbmcStore').getAt(0));
    });
    zyStore.load({
        params:{

        }
    });
    Ext.data.StoreManager.lookup('zyStore').on('load', function(){
        Ext.data.StoreManager.lookup('zyStore').insert(0,{V_MAJOR_CODE:'全部',V_MAJOR_NAME:'%'});
        // if(url_zy!=undefined){
        //     Ext.getCmp('zy').select(url_zy);
        // }else{
            Ext.getCmp('zy').select(Ext.data.StoreManager.lookup('zyStore').getAt(0));

        // }

    });
    // Ext.getCmp('zks').setValue(getWeekStartDate());
    // Ext.getCmp('zjs').setValue(getWeekEndDate());
    Ext.getCmp('year').on('select', function () {
    //     Ext.getCmp('zks').setValue(getWeekStartDate());
    //     Ext.getCmp('zjs').setValue(getWeekEndDate());
        QueryGrid();
    });
    Ext.getCmp('month').on('select', function () {
    //     Ext.getCmp('zks').setValue(getWeekStartDate());
    //     Ext.getCmp('zjs').setValue(getWeekEndDate());
        QueryGrid();
    });
    Ext.getCmp('week').on('select', function () {
    //     Ext.getCmp('zks').setValue(getWeekStartDate());
    //     Ext.getCmp('zjs').setValue(getWeekEndDate());
        QueryGrid();
    });
    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_V_YEAR:Ext.getCmp('year').getValue(),
            V_V_MONTH:Ext.getCmp('month').getValue(),
            V_V_WEEK:Ext.getCmp('week').getValue(),
            V_V_ORGCODE:Ext.getCmp('ck').getValue(),
            V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),
            V_V_ZY:Ext.getCmp('zy').getValue(),
            V_V_EQUTYPE:Ext.getCmp('sblx').getValue(),
            V_V_EQUCODE:Ext.getCmp('sbmc').getValue(),
            V_V_CONTENT:Ext.getCmp('seltext').getValue()==""?"%":Ext.getCmp('seltext').getValue(),
            V_V_FLOWTYPE:'WORK',
            V_V_STATE:'30,31',//审批完成，已下票
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
    Ext.data.StoreManager.get('gridStore').load();
}


//月共几天
function getDaysOfMonth(year,month){
    var month = parseInt(month, 10);
    var d= new Date(year, month, 0);
    return d.getDate();
}

// //本周开始时间
// function getWeekStartDate() {
//     var year=Ext.getCmp('year').getValue();
//     var month=Ext.getCmp('month').getValue();
//     var week=Ext.getCmp('week').getValue();
//     var dat=new Date(year,month-1,1);
//     var day=dat.getDay();
//     var date=dat.getDate()+(week-1)*7;
//     var hao=dat.getDate();
//     var days=getDaysOfMonth(year,month-1);//上月有几天
//     if(day==0){
//         day=7;
//     }
//     if(date<day){
//         hao=date+days-day+1;
//     }else{
//         hao=date-day+1;
//     }
//     var yue=dat.getMonth();
//     if(date<day){
//         yue=yue-1;
//     }
//     var nian=dat.getFullYear();
//     if(yue<0){
//         nian=nian-1;
//         yue=yue+12;
//     }
//     if(hao>getDaysOfMonth(year,month)){
//         hao=hao-getDaysOfMonth(year,month);
//         yue=yue+1;
//     }
//     if(yue>11){
//         nian==nian+1;
//     }
//     return nian+"-"+(yue+1)+"-"+hao;
// }
// //本周结束时间
// function getWeekEndDate(){
//     var year=Ext.getCmp('year').getValue();
//     var month=Ext.getCmp('month').getValue();
//     var week=Ext.getCmp('week').getValue();
//     var dat=new Date();
//     var dat=new Date(year,month-1,1);
//     var day=dat.getDay();
//     var date=dat.getDate()+(week-1)*7;
//     var hao=dat.getDate();
//     var days=getDaysOfMonth(year,month);//本月有几天
//     if(day==0){
//         day=7;
//     }
//     hao=date+(7-day);
//     var yue=dat.getMonth();
//     if(hao>days){
//         hao=hao-days;
//         yue=yue+1;
//     }
//     var nian=dat.getFullYear();
//     if(yue>11){
//         yue=yue-12;
//         nian=nian+1;
//     }
//     return nian+"-"+(yue+1)+"-"+hao;
// }
