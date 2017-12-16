/**
 * Created by lxm on 2017/8/7.
 */
var v_guid = null;
if (location.href.split('?')[1] != undefined) {
    v_guid = Ext.urlDecode(location.href.split('?')[1]).V_GUID;
}
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
var panel = Ext.create('Ext.panel.Panel',{
    frame : true,
    autoScroll:true,
    layout:'vbox',
    region:'north',
    bodyPadding : 15,
    //height:2000,
    id : 'panel',
    width : '100%',
    defaults : {
        labelWidth : 35,
        labelAlign : 'right'
    },
    items : [{xtype:'button',text:'关闭',style:'margin:15px 5px 5px 80px'},
        {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[{
        xtype:'textfield',
        id:'year',
        fieldLabel:'年份',
        readOnly:true,
        labelAlign:'right',
        labelWidth : 80,
        width:260,
        style:'margin:15px 5px 5px 5px'},
        {xtype:'textfield',
            id:'month',
            fieldLabel:'月份',
            labelAlign:'right',
            readOnly:true,
            labelWidth : 80,
            width:260,
            style:'margin:15px 5px 5px 5px'
        }]},
        {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[{
            xtype:'textfield',
            id:'dw',
            fieldLabel:'单位',
            readOnly:true,
            labelAlign:'right',
            labelWidth : 80,
            width:260,
            style:'margin:5px 5px 5px 5px'},
            {xtype:'textfield',
                id:'zyq',
                fieldLabel:'作业区',
                labelAlign:'right',
                readOnly:true,
                labelWidth : 80,
                width:260,
                style:'margin:5px 5px 5px 5px'
            }]},
        {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[{
            xtype:'textfield',
            id:'gclx',
            fieldLabel:'工程类型',
            readOnly:true,
            labelAlign:'right',
            labelWidth : 80,
            width:260,
            style:'margin:5px 5px 5px 5px'},
            {xtype:'textfield',
                id:'zy',
                fieldLabel:'专业',
                labelAlign:'right',
                readOnly:true,
                labelWidth : 80,
                width:260,
                style:'margin:5px 5px 5px 5px'
            }]},
        {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[{
            xtype:'textfield',
            id:'gcxmbm',
            fieldLabel:'工程项目编码',
            readOnly:true,
            labelAlign:'right',
            labelWidth : 80,
            width:530,
            style:'margin:5px 5px 5px 5px'}]},
        {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[{
            xtype:'textfield',
            id:'gcxmmc',
            fieldLabel:'工程项目名称',
            readOnly:true,
            labelAlign:'right',
            labelWidth : 80,
            width:530,
            style:'margin:5px 5px 5px 5px'}]},
        {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[{
            xtype:'textfield',
            id:'wbsbm',
            fieldLabel:'WBS编码',
            readOnly:true,
            labelAlign:'right',
            labelWidth : 80,
            width:530,
            style:'margin:5px 5px 5px 5px'}]},
        {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[{
            xtype:'textfield',
            id:'kgsj',
            fieldLabel:'预计开工时间',
            readOnly:true,
            labelAlign:'right',
            labelWidth : 80,
            width:260,
            style:'margin:5px 5px 5px 5px'},
            {xtype:'textfield',
                id:'jgsj',
                fieldLabel:'预计竣工时间',
                labelAlign:'right',
                readOnly:true,
                labelWidth : 80,
                width:260,
                style:'margin:5px 5px 5px 5px'
            }]},
        {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[
            { xtype:'textarea',id:'zyxlnr',style:'margin:5px 5px 5px 5px',fieldLabel:'主要修理内容',labelAlign:'right',labelWidth : 80,width:530,height:80}
        ]},
        {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[{
            xtype:'textfield',
            id:'sgdw',
            fieldLabel:'施工单位',
            readOnly:true,
            labelAlign:'right',
            labelWidth : 80,
            width:530,
            style:'margin:5px 5px 5px 5px'}]},
        {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[{
            xtype:'textfield',
            id:'xmfzr',
            fieldLabel:'项目负责人',
            readOnly:true,
            labelAlign:'right',
            labelWidth : 80,
            width:260,
            style:'margin:5px 5px 5px 5px'},
            {xtype:'textfield',
                id:'jhe',
                fieldLabel:'计划额(万元)',
                labelAlign:'right',
                readOnly:true,
                labelWidth : 80,
                width:260,
                style:'margin:5px 5px 5px 5px'
            }]},
        {xtype:'panel',layout:'hbox',baseCls:'my-panel-noborder',frame:true,items:[
            { xtype:'textarea',id:'bz',style:'margin:5px 5px 5px 5px',fieldLabel:'备注',labelAlign:'right',labelWidth : 80,width:530,height:80}
        ]},
        {xtype:'panel',id:'pnl',layout:'vbox',baseCls:'my-panel-noborder',frame:true,items:[]},
    ]
});
Ext.onReady(function() {
    Ext.QuickTips.init();
    Ext.create('Ext.container.Viewport', {
        layout: 'fit',
        id: 'viewport',
        items: [panel]
    });
    Init();
});
function Init(){
    Ext.Ajax.request({
        url: AppUrl + 'lxm/PRO_PM_04_PROJECT_DATA_ITEM_G',
        method: 'POST',
        async : false,
        params:{
            V_V_GUID:v_guid
        },
        success:function(resp){
            var resp = Ext.decode(resp.responseText);
            Ext.getCmp('year').setValue(resp.list[0].V_YEAR);
            Ext.getCmp('month').setValue(resp.list[0].V_MONTH);
            Ext.getCmp('dw').setValue(resp.list[0].V_ORGNAME);
            Ext.getCmp('zyq').setValue(resp.list[0].V_DEPTNAME);
            Ext.getCmp('gclx').setValue(resp.list[0].V_TYPE_NAME);
            Ext.getCmp('zy').setValue(resp.list[0].V_MAJOR_NAME);
            Ext.getCmp('gcxmbm').setValue(resp.list[0].V_PROJECT_CODE);
            Ext.getCmp('gcxmmc').setValue(resp.list[0].V_PROJECT_NAME);
            Ext.getCmp('wbsbm').setValue(resp.list[0].V_WBS_CODE);
            Ext.getCmp('kgsj').setValue(resp.list[0].V_DATE_B);
            Ext.getCmp('jgsj').setValue(resp.list[0].V_DATE_E);
            Ext.getCmp('zyxlnr').setValue(resp.list[0].V_CONTENT);
            Ext.getCmp('sgdw').setValue(resp.list[0].V_REPAIR_DEPT);
            Ext.getCmp('xmfzr').setValue(resp.list[0].V_FZR);
            Ext.getCmp('jhe').setValue(resp.list[0].V_BUDGET_MONEY);
            Ext.getCmp('bz').setValue(resp.list[0].V_BZ);
            Ext.Ajax.request({
                url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_GETGS',
                method: 'POST',
                async : false,
                params:{
                    V_V_PROJECTCODE_GS:resp.list[0].V_PROJECT_CODE
                },
                success:function(resp) {
                    var resp = Ext.decode(resp.responseText);
                    var fc=Ext.getCmp('pnl');
                    fc.removeAll();
                    var item={
                        xtype:'displayfield',
                        fieldLabel:'对应检修申请',
                        style:'margin:5px 5px 5px 5px',
                        labelAlign:'right',
                        labelWidth : 80,
                        width:90
                    };
                    fc.add(item);
                    for(var i=0;i<resp.list.length;i++){
                        item={
                            xtype:'displayfield',
                            value:'<a href='+AppUrl+'/page/pm_dxgc_wwjx_98/index.html?V_GUID='+resp.list[i].V_GUID+' style="color:blue;">'+resp.list[i].V_PROJECTNAME+'</a>',
                            style:'margin:5px 5px 5px 100px;color:blue;',
                            labelAlign:'right',
                            labelWidth : 80,
                            width:130
                        }
                        fc.add(item);
                    }
                    fc.doLayout();
                }
            });
        }
    });

}
function close(){
    window.close();
}