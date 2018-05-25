/**
 * Created by Administrator on 2017/12/12 0012.
 */
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
        'V_GUID',
        'GDNUM',
        'CKDNUM',
        'WLNUM',
        'GZNUM',
        'JJNUM',
        'GJNUM',
        'HJNNUM'
    ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'cjy/PRO_PM_04_PROJECT_DATA_STATIST',
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
    items : [{
        id: 'begintime',
        xtype: 'datefield',
        editable: false,
        format: 'Y/m/d',
        value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        fieldLabel: '时间段选择',
        labelWidth: 100,
        baseCls: 'margin-bottom'
    }, {
        id: 'endtime',
        xtype: 'datefield',
        editable: false,
        format: 'Y/m/d',
        value: new Date(),
        fieldLabel: '至',
        labelWidth: 100
    }, { xtype : 'button',text : '查询',style : { margin : '0px 0px 0px 10px' },icon : imgpath + '/search.png',handler:QueryGrid}
    ]
});


var grid1=Ext.create('Ext.grid.Panel',{
    region:'center',
    store:gridStore,
    id:'grid1',
    style:'margin:0px 0px 0px 0px',
    columnLines: true,
    autoScroll:true,
    baseCls:'my-panel-noborder',
    columns:[
        {text: '序号', align: 'center', width: 50, xtype: 'rownumberer'},
        { text: '厂矿',width:200,dataIndex:'V_ORGNAME', align: 'center',renderer:Atleft },
        { text: '作业区',width:200,dataIndex:'V_DEPTNAME', align: 'center',renderer:Atleft },
        { text: '放行计划编码',width:200,dataIndex:'V_PROJECT_CODE', align: 'center',renderer:Atleft },
        { text: '放行计划名称',width:200,dataIndex:'V_PROJECT_NAME', align: 'center',renderer:Atleft },
        { text: '工单数量',width:200,dataIndex:'GDNUM', align: 'center',renderer:AtRight },
        { text: '出库单数量',width:200,dataIndex:'CKDNUM', align: 'center',renderer:AtRight },
        { text: '物料总金额',width:200,dataIndex:'WLNUM', align: 'center',renderer:AtRight },
        { text: '工种总金额',width:200,dataIndex:'GZNUM', align: 'center',renderer:AtRight },
        { text: '机具总金额',width:200,dataIndex:'JJNUM', align: 'center',renderer:AtRight },
        { text: '总计金额',width:200,dataIndex:'HJNNUM', align: 'center',renderer:AtRight }
    ],
    listeners:{
        'itemdblclick':function(a,b,c){
            var owidth = 593;
            var oheight = 796;
            var w=screen.availWidth-10;
            var h=screen.availHeight-30;
            var objwin = window.open(AppUrl + 'page/pm_dxgc_statistics/detail.html?guid='+b.data.V_GUID
                + "&V_PROJECT_NAME=" + b.data.V_PROJECT_NAME
                + "&V_PROJECT_CODE=" + b.data.V_PROJECT_CODE
                + "&D_DATE_B=" + Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(), 'Y/m/d')
                + "&D_DATE_E=" + Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y/m/d'),"win","fullscreen=yes,toolbar=1,location=1,directories=1,status=1,menubar=1,scrollbars=1,resizable=1,width=" + w + ",height=" + h + ",top=0,left=0",true);

        }
    }
});
var panelup = Ext.create('Ext.panel.Panel',{
    frame : true,
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


Ext.onReady(function() {
    Ext.QuickTips.init();

    Ext.create('Ext.container.Viewport', {
        layout : 'fit',
        id:'viewport',
        items : [panelup]
    });
    QueryGrid();

});
function QueryGrid(){
    Ext.data.StoreManager.lookup('gridStore').load({
        params:{
            V_D_DATE_B:Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(), 'Y/m/d'),
            V_D_DATE_E:Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y/m/d'),
        }
    });

}

function Atleft(value, metaData) {
    metaData.style = 'text-align: left';
    return value;
}
function AtRight(value, metaData) {
    metaData.style = 'text-align: right';
    return value;
}