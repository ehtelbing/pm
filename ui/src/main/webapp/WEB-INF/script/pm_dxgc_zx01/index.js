/**
 * Created by lxm on 2017/8/14.
 */
/**
 * Created by lxm on 2017/8/14.
 */
/**
 * Created by lxm on 2017/8/11.
 */
var dt = new Date();
var thisYear = dt.getFullYear();
var years = [];

for (var i = 2014; i <= thisYear + 1; i++) years.push([i,i]);
var months=[];
//for (var i = 1; i <= 12; i++) months.push({ displayField: i, valueField: i });
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
var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
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
        'V_SGYC',
        'V_AQDC',
        'V_MODEL_GUID',
        'V_ORGNAME',
        'V_DEPTNAME'

    ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_TREE_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var grid=Ext.create('Ext.grid.Panel',{
    region:'center',
    width:'100%',
    store:gridStore,
    id:'grid',
    height:260,
    style:'margin:0px 5px 5px 0px',
    autoScroll: true,
    columnLines: true,
    selModel:{
        mode:'singel',
        selType:'checkboxmodel'
    },
    columns:[
        { text: '放行工程编码',width:200,dataIndex:'V_PROJECT_CODE_FXJH', align: 'center',renderer:Atleft },
        { text: '放行工程名称',width:200,dataIndex:'V_PROJECT_NAME_FXJH', align: 'center',renderer:AtFxgc },
        { text: '工程项目编码',width:200,dataIndex:'V_PROJECT_CODE', align: 'center',renderer:Atgcxm },
        { text: '工程项目名称',width:200,dataIndex:'V_PROJECT_NAME', align: 'center',renderer:Atleft },
        { text: '计划投资（万元）',width:200,dataIndex:'V_PLAN_MONEY', align: 'center',renderer:Atleft },
        { text: '工程主要内容',width:200,dataIndex:'V_CONTENT', align: 'center',renderer:Atleft },
        { text: '开工时间',width:200,dataIndex:'V_DATE_B', align: 'center',renderer:Atleft },
        { text: '竣工时间',width:200,dataIndex:'V_DATE_E', align: 'center',renderer:Atleft },
        { text: '专业',width:200,dataIndex:'V_SPECIALTY', align: 'center',renderer:Atleft },
        { text: '设备名称',width:200,dataIndex:'V_EQUNAME', align: 'center',renderer:Atleft },
        { text: '建设单位',width:200,dataIndex:'V_BUILD_DEPT', align: 'center',renderer:Atleft },
        { text: '建设单位工程负责人',width:200,dataIndex:'V_BULID_PERSON', align: 'center',renderer:Atleft },
        { text: '作业区',width:200,dataIndex:'V_DEPTNAME', align: 'center',renderer:Atleft },
        { text: '上级工程编码',width:200,dataIndex:'V_PROJECT_CODE_P', align: 'center',renderer:Atsjgcxm },
        { text: '上级工程名称',width:200,dataIndex:'V_PROJECT_NAME_P', align: 'center',renderer:Atleft },
        { text: '录入人',width:200,dataIndex:'V_PERNAME_INPUT', align: 'center',renderer:Atleft },
        { text: '录入时间',width:200,dataIndex:'D_DATE_INPUT', align: 'center',renderer:Atleft }
    ]
});
var panel = Ext.create('Ext.panel.Panel',{
    frame : true,
    layout:'vbox',
    region:'north',
    bodyPadding : 5,
    style:'margin:0px 5px 5px 0px',
    id : 'panel',
    width : '100%',
    height:120,
    defaults : {
        labelWidth : 35,
        labelAlign : 'right'
    },
    items : [{xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[{id:'year',xtype:'combo',labelWidth: 30,
        labelAlign:'right', width: 100,fieldLabel:'年份',style: ' margin: 0px 3px 0px 60px',
        store:years,displayField:'Item1',valueField:'Item2',
        value:thisYear,editable:false,queryMode:'local'},
        {id: 'month', store: months, xtype: 'combo', fieldLabel: '月份',
            style: ' margin: 0px 0px 0px 20px',
            value: new Date().getMonth()+1,labelWidth: 30,
            labelAlign:'right', width: 90, editable: false,
            displayField: 'displayField', valueField: 'valueField'},
        { xtype: 'combo', fieldLabel: '厂矿', labelWidth: 40,labelAlign:'right', id: 'ck', store: 'ckStore', editable: false, displayField: 'V_DEPTNAME', valueField: 'V_DEPTCODE', queryMode: 'local' ,style:'margin:0px 5px 0px 15px'},
        { xtype: 'combo', fieldLabel: '作业区',style:'margin:px 5px px 5px',labelWidth : 50,width:200, id: 'zyq', store: 'zyqStore', editable: false, displayField: 'V_DEPTNAME',labelAlign:'right', valueField: 'V_DEPTCODE', queryMode: 'local' },
        { xtype: 'combo', fieldLabel: '专业', labelAlign:'right',labelWidth: 40, id: 'zy',style:'margin:px 5px px 15px', store: 'zyStore', editable: false, displayField: 'V_MAJOR_CODE', valueField: 'V_MAJOR_NAME', queryMode: 'local' },
        { xtype:'textfield',id:'sbmc',fieldLabel:'设备名称',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 65,width:200}
    ]},
        {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[
            { xtype:'textfield',id:'fxgcbm',style:'margin:10px 0px 5px 5px',fieldLabel:'放行工程编码',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 80,width:240},
            { xtype:'button',text:'..',style:'margin:10px 0px 5px 0px',handler:getFXGC},
            { xtype:'textfield',id:'wsbmc',style:'margin:10px 0px 5px 5px',fieldLabel:'放行工程名称',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 80,width:260},
            { xtype:'button',text:'..',style:'margin:10px 0px 5px 0px',handler:getFXGC},
            { xtype:'textfield',id:'gcbm',style : { margin : '10px 0px 0px 0px' },fieldLabel:'工程编码',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 65,width:200},
            { xtype:'textfield',id:'gcmc',style : { margin : '10px 0px 0px 0px' },fieldLabel:'工程名称',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 65,width:200},
            { xtype:'textfield',id:'gcnr',style : { margin : '10px 0px 0px 0px' },fieldLabel:'工程内容',fieldStyle : 'background-color:#FFFF99;background-image:none;',labelAlign:'right',labelWidth : 65,width:200}
        ]},
        {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[
            { xtype : 'button',text : '查询',style : { margin : '10px 0px 0px 10px' },icon : imgpath + '/search.png',handler:QueryGrid},
            { xtype : 'button',text : '主修工单下达',style : { margin : '10px 0px 0px 10px' },icon : imgpath + '/search.png',handler:OnBtnZx},
            { xtype : 'button',text : '随修工单下达(从缺陷)',style : { margin : '10px 0px 0px 10px' },icon : imgpath + '/search.png',handler:OnBtnSx},
            { xtype : 'button',text : '随修工单下达(从计划)',style : { margin : '10px 0px 0px 10px' },icon : imgpath + '/search.png',handler:OnBtnSxPlan},
            { xtype : 'button',text : '随修工单下达(生成缺陷)',style : { margin : '10px 0px 0px 10px' },icon : imgpath + '/search.png',handler:OnBtnSxQx}
        ]}
    ]
});
Ext.onReady(function() {
    Ext.QuickTips.init();
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        id: 'viewport',
        items: [panel,grid]
    });
    Ext.data.StoreManager.lookup('ckStore').on('load', function(){
        Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));

    });
    Ext.data.StoreManager.lookup('zyStore').on('load', function(){
        Ext.getCmp('zy').select(Ext.data.StoreManager.lookup('zyStore').getAt(0));

    });
    Ext.data.StoreManager.lookup('zyqStore').on('load', function(){
        Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));

    });
    Ext.data.StoreManager.lookup('zyStore').on('load', function(){
        Ext.getCmp('zy').select(Ext.data.StoreManager.lookup('zyStore').getAt(0));

    });
    zyStore.load({
        params:{

        }
    });
    Ext.getCmp('ck').on('change',function(){
        zyqStore.load({
            params:{
                V_DEPTCODE : Ext.getCmp('ck').getValue(),
                V_DEPTTYPE: '[主体作业区]',
                V_V_PERSON : Ext.util.Cookies.get('v_personcode')
            }
        });
    });
});
function Atleft(value, metaData) {
    metaData.style = 'text-align: left';
    return value;
}
function AtFxgc(value, metaData,record){
    metaData.style = 'text-align: left';
    return '<a href=javascript:goPagefx(\''+ record.data.V_GUID_FXJH + '\');>'+value+'</a>';
}
function Atgcxm(value, metaData,record){
    metaData.style = 'text-align: left';
    return '<a href=javascript:goPagegc(\''+ record.data.V_GUID + '\');>'+value+'</a>';
}
function Atsjgcxm(value, metaData,record){
    metaData.style = 'text-align: left';
    return '<a href=javascript:goPagesj(\''+ record.data.V_GUID_P + '\');>'+value+'</a>';
}
function goPagesj(guid){
    var owidth = window.document.body.offsetWidth-200;
    var oheight = window.document.body.offsetHeight-100 ;
    window.open(AppUrl+'page/pm_dxgc_bz0198/index.html?V_GUID=' + guid, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}
function goPagegc(guid){
    var owidth = window.document.body.offsetWidth-200;
    var oheight = window.document.body.offsetHeight-100 ;
    window.open(AppUrl+'page/pm_dxgc_bz0198/index.html?V_GUID=' + guid, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}
function goPagefx(guid){
    var owidth = window.document.body.offsetWidth-200;
    var oheight = window.document.body.offsetHeight-100 ;
    window.open(AppUrl+'page/pm_dxgc_bzfxjh0198/index.html?V_GUID='  + guid, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}
function getFXGC(){
    var owidth = window.document.body.offsetWidth-200;
    var oheight = window.document.body.offsetHeight-100 ;
    window.open(AppUrl+'page/pm_dxgc_zxfxjh0198/index.html?V_YEAR=' + Ext.getCmp('year').getValue()+'&&V_MONTH='+ Ext.getCmp('month').getValue()+'&&V_DEPTCODE='+ Ext.getCmp('ck').getValue()
        +'&&V_ZYQ='+ Ext.getCmp('zyq').getValue()+'&&V_ZY='+ Ext.getCmp('zy').getValue(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}
function QueryGrid(){

    if(Ext.getCmp('gcbm').getValue() =="" || Ext.getCmp('gcbm').getValue() == null){
        Ext.data.StoreManager.lookup('gridStore').load({
            params:{
                V_V_PERCODE:Ext.util.Cookies.get('v_personcode'),
                V_V_YEAR:Ext.getCmp('year').getValue(),
                V_V_MONTH:Ext.getCmp('month').getValue(),
                V_V_ORGCODE:Ext.getCmp('ck').getValue(),
                V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),
                V_V_SPECIALTY:Ext.getCmp('zy').getValue(),
                V_V_EQUNAME:Ext.getCmp('sbmc').getValue(),
                V_V_PROJECT_CODE:Ext.getCmp('gcbm').getValue(),
                V_V_PROJECT_NAME:Ext.getCmp('gcmc').getValue(),
                V_V_CONTENT:Ext.getCmp('gcnr').getValue(),
                V_BY1:"",
                V_BY2:"",
                V_BY3:""
            }
        });
    }else{
        Ext.data.StoreManager.lookup('gridStore').load({
            params:{
                V_V_PERCODE:Ext.util.Cookies.get('v_personcode'),
                V_V_YEAR:'%',
                V_V_MONTH:'%',
                V_V_ORGCODE:'%',
                V_V_DEPTCODE:'%',
                V_V_SPECIALTY:'%',
                V_V_EQUNAME:'%',
                V_V_PROJECT_CODE:Ext.getCmp('gcbm').getValue(),
                V_V_PROJECT_NAME:'%',
                V_V_CONTENT:'%',
                V_BY1:'%',
                V_BY2:'%',
                V_BY3:'%'
            }
        });
    }

}
function OnBtnZx(){
    var record=Ext.getCmp('grid').getSelectionModel().getSelection();
    if(record.length==0){
        alert('请选择一条记录，进行工单下达');
        return;
    }
    Ext.Ajax.request({
        url: AppUrl + 'str/PRO_PM_EQUREPAIRPLAN_TOWORK_C1',
        method: 'POST',
        async : false,
        params:{
            V_V_IP:GetIP().ip,
            V_V_PERCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_PERNAME:Ext.util.Cookies.get('v_personname'),
            V_V_GUID:record[0].data.V_GUID
        },
        success:function(resp){
            var resp = Ext.decode(resp.responseText);
            if(resp.v_info=='success'){
                var owidth = window.document.body.offsetWidth-200;
                var oheight = window.document.body.offsetHeight-100 ;
                window.open(AppUrl+'page/pm_dxgc_orderEdit/index.html?V_GUID=' + resp.list[0].V_ORDERGUID+'&&V_EQUTYPECODE='+record[0].data.V_EQUTYPECODE+'&&V_SOURCECODE=defct12', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
            }else{
                alert(resp.v_info)
            }
        }
    });

}
function OnBtnSx(){
    var record=Ext.getCmp('grid').getSelectionModel().getSelection();
    if(record.length==0){
        alert('请选择一条记录，进行工单下达');
        return;
    }
    var owidth = window.document.body.offsetWidth-200;
    var oheight = window.document.body.offsetHeight-100 ;
    window.open(AppUrl+'page/PM_0702/index.html?v_guid_dx=' + record[0].data.V_GUID+'&&v_deptcode='+record[0].data.V_DEPTCODE+'&&v_equtypecode='+record[0].data.V_EQUTYPECODE
        +'&&v_equcode='+record[0].data.V_EQUCODE, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

}
function OnBtnSxPlan(){
    var record=Ext.getCmp('grid').getSelectionModel().getSelection();
    if(record.length==0){
        alert('请选择一条记录，进行工单下达');
        return;
    }
    var owidth = window.document.body.offsetWidth-200;
    var oheight = window.document.body.offsetHeight-100 ;
    window.open(AppUrl+'page/PM_030111/index.html?v_guid_dx=' + record[0].data.V_GUID+'&&v_deptcode='+record[0].data.V_DEPTCODE+'&&v_specialty='+record[0].data.V_SPECIALTY, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}
function OnBtnSxQx(){
    var record=Ext.getCmp('grid').getSelectionModel().getSelection();
    if(record.length==0){
        alert('请选择一条记录，进行工单下达');
        return;
    }
    var owidth = 593;
    var oheight = 796 ;
    window.open(AppUrl+'page/pm_dxgc_zx0101/index.html?v_guid_dx=' + record[0].data.V_GUID+'&&v_deptcode='+record[0].data.V_DEPTCODE+'&&v_equtypecode='+record[0].data.V_EQUTYPECODE
        +'&&v_equcode='+record[0].data.V_EQUCODE+'&&v_specialty='+record[0].data.V_SPECIALTY+'&&ck='+record[0].data.V_ORGCODE, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}

function chuanzhi(V_PROJECT_CODE,V_PROJECT_NAME)
{
    Ext.getCmp('fxgcbm').setValue(V_PROJECT_CODE);
    Ext.getCmp('wsbmc').setValue(V_PROJECT_NAME);
}