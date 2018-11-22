var V_V_YEAR = '';
var V_V_ORGCODE = '';
var V_V_DEPTCODE = '';
var V_V_EQUTYPE = '';
var V_V_EQUCODE = '';
var V_V_ZY = '';
var V_V_JXNR = '';
if (location.href.split('?')[1] != undefined) {
    V_V_YEAR = Ext.urlDecode(location.href.split('?')[1]).V_V_YEAR;
}
if (location.href.split('?')[1] != undefined) {
    V_V_ORGCODE = Ext.urlDecode(location.href.split('?')[1]).V_V_ORGCODE=='0'?'%':Ext.urlDecode(location.href.split('?')[1]).V_V_ORGCODE;
}
if (location.href.split('?')[1] != undefined) {
    V_V_DEPTCODE = Ext.urlDecode(location.href.split('?')[1]).V_V_DEPTCODE=='0'?'%':Ext.urlDecode(location.href.split('?')[1]).V_V_DEPTCODE;
}if (location.href.split('?')[1] != undefined) {
    V_V_EQUTYPE = Ext.urlDecode(location.href.split('?')[1]).V_V_EQUTYPE=='0'?'%':Ext.urlDecode(location.href.split('?')[1]).V_V_EQUTYPE;
}
if (location.href.split('?')[1] != undefined) {
    V_V_EQUCODE = Ext.urlDecode(location.href.split('?')[1]).V_V_EQUCODE=='0'?'%':Ext.urlDecode(location.href.split('?')[1]).V_V_EQUCODE;
}
if (location.href.split('?')[1] != undefined) {
    V_V_ZY = Ext.urlDecode(location.href.split('?')[1]).V_V_ZY;}
if (location.href.split('?')[1] != undefined) {
    V_V_JXNR = Ext.urlDecode(location.href.split('?')[1]).V_V_JXNR;
}
var years = [];
var dt = new Date();
var thisYear = dt.getFullYear();
for (var i = 2014; i <= thisYear + 1; i++) years.push([i,i]);
//计划类型
var jhlxData = [{'displayField': '年计划', 'valueField': 'YEAR'}, {'displayField': '季度计划', 'valueField': 'QUARTER'},{'displayField': '月计划', 'valueField': 'MONTH'}];
var jhlxStore = Ext.create("Ext.data.Store", {
    storeId: 'planTypeStore',
    fields: ['displayField', 'valueField'],
    data: jhlxData,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});
//页面表格信息加载
var gridStore = Ext.create('Ext.data.Store', {
    id : 'gridStore',
    pageSize : 15,
    autoLoad : false,
    fields :['I_ID',
        'V_GUID',
        'V_YEAR',
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
        'V_STARTTIME',
        'V_ENDTIME',
        'V_HOUR',
        'V_REPAIRDEPT_CODE',
        'V_REPAIRDEPT_NAME',
        'V_INDATE',
        'V_INPER',
        'INPERNAME',
        'V_FLOWCODE',
        'V_FLOWORDER',
        'V_FLOWTYPE',
        'V_JHMX_GUID',
        'V_BZ'],
    proxy : {
        type : 'ajax',
        async : false,
        url: AppUrl + 'PM_03/PM_03_PLAN_SEL',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list',
            total : 'total'
        }
    }
});
var gridYearStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridYearStore',
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
var treeStore = Ext.create('Ext.data.TreeStore', {
    storeId: 'treeStore',
    autoLoad: false,
    root: {
        expanded: true,
        text: "My Root"
    },
    fields: ['V_BUILD_DEPT', 'V_BULID_PERSON', 'V_CONTENT', 'V_DATE_B', 'V_DATE_E', 'V_GUID',
        'V_GUID_FXJH', 'V_PROJECT_CODE_FXJH', 'V_PROJECT_NAME', 'V_SPECIALTY', 'V_PLAN_MONEY', 'V_GUID_P'],
    proxy: {
        type: 'ajax',
        url: AppUrl + 'gantt/PRO_PM_EQUREPAIRPLAN_TREE',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json'
        },
        extraParams: {
            V_V_GUID_FXJH: "",
            V_BY1: "",
            V_BY2: "",
            V_BY3: ""
        }
    },
    listeners: {
        load: function (store, records,success,eOpts) {
            records.childNodes.pop();
        }
    }
});
//grid显示
function query() {

    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_YEAR: V_V_YEAR,
            V_V_QUARTER: '%',
            V_V_MONTH: '%',
            V_V_PLANTYPE: 'MONTH',
            V_V_ORGCODE: V_V_ORGCODE,

            V_V_DEPTCODE: V_V_DEPTCODE,
            V_V_EQUTYPE: V_V_EQUTYPE,
            V_V_EQUCODE: V_V_EQUCODE,
            V_V_ZY: V_V_ZY,
            V_V_CONTENT: '',//V_V_JXNR,
            V_V_PEROCDE: Ext.util.Cookies.get('v_personcode'),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    });
}

var northPanel = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: true,
    border: false,
   // baseCls: 'my-panel-no-border',
    margin: '0 0 5 0',
    items: [
        {layout: 'column', defaults: {labelAlign: 'right'},frame:true,border: false,baseCls: 'my-panel-no-border',
            items: [
                /*{
                    xtype: 'combo',
                    id: 'jhlx',
                    fieldLabel: '计划类型',
                    editable: false,
                    margin: '10 0 0 5',
                    labelWidth: 75,
                    width: 165,
                    displayField: 'displayField',
                    valueField: 'valueField',
                    value: '',
                    store: jhlxStore,
                    queryMode: 'local'
                },*/
                {xtype: 'textfield',id:'jhmc',fieldLabel: '计划名称',editable: false, margin: '10 0 0 5',labelWidth:55,width:205,value:''},
                {xtype: 'button', text: '查询', margin: '10 0 5 10',icon:imgpath + '/search.png',handler:query},
                {xtype: 'button', text: '选择', margin: '10 0 5 10',icon: imgpath +'/add.png', handler:select}
            ]
        }
    ]
});

var gridPanel = Ext.create('Ext.grid.Panel', {
    id:'gridPanel',
    region: 'center',
    border: false,
    store:'gridStore',
    selType:'checkboxmodel',
    columns:[

        {text: '序号', align: 'center', width: 50, xtype: 'rownumberer'},
        {text: '厂矿', align: 'center', width: 100, dataIndex: 'V_ORGNAME'},
        {text: '车间名称', align: 'center', width: 100, dataIndex: 'V_DEPTNAME'},
        {text: '专业', align: 'center', width: 100, dataIndex: 'V_REPAIRMAJOR_CODE'},
        {text: '设备名称', align: 'center', width: 100, dataIndex: 'V_EQUNAME'},
        {text: '检修内容', align: 'center', width: 100, dataIndex: 'V_CONTENT'},
        {text: '计划停机日期', align: 'center', width: 100, dataIndex: 'V_STARTTIME',
            renderer: rendererTime},
        {text: '计划竣工日期', align: 'center', width: 100, dataIndex: 'V_ENDTIME',
            renderer: rendererTime},
        {text: '计划工期（小时）', align: 'center', width: 100, dataIndex: 'V_HOUR'}
    ],
    bbar:["->",
        {
            id:'page',
            xtype: 'pagingtoolbar',
            store:gridStore,
            width:'100%',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
        }
    ]
});
var monthpanel=Ext.create('Ext.panel.Panel',{
    id:'monthpanel',
    title:'月计划',
    region:'center',
    layout:'border',
    items:[northPanel,gridPanel]
});

var yearnpanel = Ext.create('Ext.panel.Panel',{
    frame : true,
    layout:'column',
    region:'north',
    id : 'yearnpanel',
    width : '100%',
    defaults : {
        labelWidth : 35,
        labelAlign : 'right'
    },
    items : [{id:'year',xtype:'combo',width:130,fieldLabel:'年份',style : { margin : '5px 0px 0px 10px' },
        store:years,displayField:'Item1',valueField:'Item2',
        value:thisYear,editable:false,queryMode:'local'},
        { xtype : 'button',text : '查询',style : { margin : '5px 0px 0px 10px' },icon : imgpath + '/search.png',handler:QueryGrid},
        {xtype: 'button', text: '选择', style : { margin : '5px 0px 0px 10px' }, icon: imgpath + '/add.png', handler: selectY}
    ]
});
var grid1=Ext.create('Ext.grid.Panel',{
    region:'center',
    store:gridYearStore,
    id:'grid1',
    height:'46%',
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
        'itemclick':function(a,b,c){
            Ext.data.StoreManager.lookup('treeStore').load({
                params:{
                    V_V_GUID_FXJH: b.data.V_GUID,
                    V_BY1: "",
                    V_BY2: "",
                    V_BY3: ""
                }
            });
        }
    }
});
var grid2=Ext.create('Ext.tree.Panel', {
    region:'south',
    store:treeStore,
    id:'grid2',
    height:'48%',
    useArrows: true,
    rootVisible: false,
    multiSelect: true,
    singleExpand: true,
    rowLines: true,
    columnLines: true,
    columns:[
        {xtype: 'rownumberer', width: 30, sortable: false},
        {
            xtype: 'treecolumn',
            text: '工程子项',
            dataIndex: 'V_PROJECT_NAME',
            width: 180,
            height: 60,
            field: {xtype: 'textfield'},
            align: 'center'
        },
        {
            text: '工程总费用',
            dataIndex: 'V_PLAN_MONEY',
            width: 120,
            height: 60,
            field: {xtype: 'numberfield'},
            align: 'center'
        },
        {text: '工程开始时间', dataIndex: 'V_DATE_B', width: 160, height: 60, align: 'center'},
        {text: '工程结束时间', dataIndex: 'V_DATE_E', width: 160, height: 60, align: 'center'}
    ]
});

var panelup = Ext.create('Ext.panel.Panel',{
    frame : true,
    title:'年计划',
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
    items:[yearnpanel,grid1,grid2]
});
var tabpanel = Ext.create('Ext.tab.Panel', {
    id:'tabpanel',
    frame:true,
    region : 'center',
    //layout : 'border',
    items: [ monthpanel,panelup
    ]
});

Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [tabpanel]
    });
    query();
    //Ext.getCmp('jhlx').select('YEAR');
});
function QueryGrid(){
    Ext.data.StoreManager.lookup('gridYearStore').load({
        params:{
            V_V_YEAR:Ext.getCmp('year').getValue(),
            V_V_MONTH:"",
            V_V_PERCODE:Ext.util.Cookies.get('v_personcode'),
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
function Atleft(value, metaData) {
    metaData.style = 'text-align: left';
    return value;
}
function select(){
    var seldata = Ext.getCmp('gridPanel').getSelectionModel().getSelection();
    if (seldata.length!=1) {
        Ext.Msg.alert('操作提示','请选择一条数据！');
        return false;
    }

    var retdata = seldata[0].data.V_GUID;
    var type = 'MONTH';
    window.opener.getReturnJHXZ(retdata,type);
    window.close();
}

function selectY(){
    var seldata = Ext.getCmp('grid1').getSelectionModel().getSelection();
    if (seldata.length!=1) {
        Ext.Msg.alert('操作提示','请选择一条数据！');
        return false;
    }

    var retdata = seldata[0].data.V_GUID;
    var type = 'YEAR';
    window.opener.getReturnJHXZ(retdata,type);
    window.close();
}
function rendererTime(value, metaData){

    return value.split(".")[0];
}