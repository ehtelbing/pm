var V_YEAR=null;
if (location.href.split('?')[1] != undefined) {
	V_YEAR = Ext.urlDecode(location.href.split('?')[1]).V_YEAR;
}
var V_MONTH=null;
if (location.href.split('?')[1] != undefined) {
	V_MONTH = Ext.urlDecode(location.href.split('?')[1]).V_MONTH;
}
var V_WEEK=null;
if (location.href.split('?')[1] != undefined) {
	V_WEEK = Ext.urlDecode(location.href.split('?')[1]).V_WEEK;
}
var V_TYPE=null;
if (location.href.split('?')[1] != undefined) {
	V_TYPE = Ext.urlDecode(location.href.split('?')[1]).V_TYPE;
}
var centerPanel = Ext.create('Ext.form.Panel', {
	region: 'center',
	layout:'vbox',
	frame: true,
	border: false,
	//baseCls: 'my-panel-no-border',
	margin:'0 0 0 0',
	items: [
		{xtype:'displayfield',id:'jhlx', fieldLabel: '计划类型',labelAlign: 'right',labelWidth:90,margin:'5 0 0 5'},
		{xtype:'displayfield',id:'jhsj', fieldLabel: '计划时间',labelAlign: 'right',labelWidth:90,margin:'5 0 0 5'},
		{layout: 'column', defaults: {labelAlign: 'right'},frame:true,border: false,baseCls: 'my-panel-no-border',
			items: [
				{xtype:'datefield',fieldLabel:'上报开始时间',format : 'Y-m-d',editable : false,value:new Date(),id:'kssj',labelAlign:'right',labelWidth:90,style: ' margin: 5px 0px 0px 6px'},
				{xtype: 'numberfield',id: 'shour',labelAlign: 'right', value: 8, maxValue: 23, minValue: 00, labelWidth: 30, style: ' margin: 5px 0px 0px 6px', width: 70 },
				{xtype: 'label', text: '小时', style: ' margin: 8px 0px 0px 6px' },
				{xtype: 'numberfield', id: 'sminute',value: 0, maxValue: 59, minValue: 00, style: ' margin: 5px 0px 0px 6px', width: 70 },
				{xtype: 'label', text: '分', style: ' margin: 8px 0px 0px 6px' }
			]
		},
		{layout: 'column', defaults: {labelAlign: 'right'},frame:true,border: false,baseCls: 'my-panel-no-border',
			items: [
				{xtype:'datefield',fieldLabel:'上报结束时间',format : 'Y-m-d',editable : false,value:new Date(),id:'jssj',labelAlign:'right',labelWidth:90,style: ' margin: 5px 0px 0px 6px'},
				{xtype: 'numberfield',id: 'ehour',labelAlign: 'right', value: 8, maxValue: 23, minValue: 00, labelWidth: 30, style: ' margin: 5px 0px 0px 6px', width: 70 },
				{xtype: 'label', text: '小时', style: ' margin: 8px 0px 0px 6px' },
				{xtype: 'numberfield', id: 'eminute',value: 0, maxValue: 59, minValue: 00, style: ' margin: 5px 0px 0px 6px', width: 70 },
				{xtype: 'label', text: '分', style: ' margin: 8px 0px 0px 6px' }
			]
		},
		{layout: 'column', defaults: {labelAlign: 'right'},frame:true,border: false,baseCls: 'my-panel-no-border',
			items: [
				{xtype : 'checkboxgroup',fieldLabel : '解锁操作',labelAlign : 'right', margin:'5 0 0 5', labelWidth : 90,
					items: [{ boxLabel: '是否解锁', name: 'lock',id:'lock'}]
				}
			]
		}
	],
	buttons: [
		{ xtype: "button", text: "保存", handler: OnButtonSaveClicked},
		{ xtype: "button", text: "关闭", handler: OnButtonCancelClicked}
	]
});


Ext.onReady(function () {
	Ext.create('Ext.container.Viewport', {
		layout:'border',
		items: [centerPanel]
	});
	Ext.Ajax.request({
		url: AppUrl + 'PM_03/PRO_PM_PLAN_LOCKING_DATE_GET',
		method: 'POST',
		params:{
			V_I_YEAR:V_YEAR,
			V_I_MONTH:V_MONTH,
			V_I_WEEKNUM:V_WEEK,
			V_V_TYPE:V_TYPE
		},
		success: function (resp) {
			var resp = Ext.decode(resp.responseText);
			Ext.getCmp('jhlx').setValue(resp.list[0].V_TYPE);
			Ext.getCmp('jhsj').setValue(resp.list[0].V_PLANDATE);
			if(resp.list[0].I_LOCK=='0'){
				Ext.getCmp('lock').setValue(true);
			}else{
				Ext.getCmp('lock').setValue(false);
			}
			var strtime=resp.list[0].D_DATE_E;
			var strdate=strtime.split('.')[0].split(' ')[0];
			Ext.getCmp('kssj').setValue(strdate);
			Ext.getCmp('jssj').setValue(strdate);
			var ehour=strtime.split('.')[0].split(' ')[1].split(':')[0];
			var eminute=strtime.split('.')[0].split(' ')[1].split(':')[1];
			Ext.getCmp('ehour').setValue(ehour);
			Ext.getCmp('eminute').setValue(eminute);
		}
	});
});
//保存
function OnButtonSaveClicked(){
	var stime=Ext.getCmp('kssj').getSubmitValue()+' '+Ext.getCmp('shour').getValue()+':'+Ext.getCmp('sminute').getValue()+':'+'00';
	var etime=Ext.getCmp('jssj').getSubmitValue()+' '+Ext.getCmp('ehour').getValue()+':'+Ext.getCmp('eminute').getValue()+':'+'00';
	var yornlock='';
	if(Ext.getCmp('lock').checked==true){
		yornlock=0;
	}else if(Ext.getCmp('lock').checked==false){
		yornlock=1;
	}

	Ext.Ajax.request({
		url: AppUrl + 'PM_03/PRO_PM_PLAN_LOCKING_DATE_SET',
		method: 'POST',
		async: false,
		params:{
			'V_I_YEAR':V_YEAR,
			'V_I_MONTH':V_MONTH,
			'V_I_WEEKNUM':V_WEEK,
			'V_V_TYPE':V_TYPE,
			'V_D_DATE_E':etime,
			'V_I_LOCK':yornlock,
			'V_D_DATE_S':stime
		},
		success: function (resp) {
			var resp = Ext.decode(resp.responseText);
			if(resp.V_INFO=='成功'){
				window.opener.queryGrid();
				window.close();
			}else{
				Ext.Msg.alert('操作信息', '保存失败');
			}
		}
	});
}
function OnButtonCancelClicked() {
	window.opener.queryGrid();
	window.close();
}