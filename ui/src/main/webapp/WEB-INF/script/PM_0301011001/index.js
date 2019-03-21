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

var V_ORGCODE=null;
if (location.href.split('?')[1] != undefined) {
    V_ORGCODE = Ext.urlDecode(location.href.split('?')[1]).V_ORGCODE;
}
var nowdate=new Date();
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
				{xtype:'datefield',fieldLabel:'上报开始时间',format : 'Y-m-d',editable : true,/*value:new Date(),*/id:'kssj',labelAlign:'right',labelWidth:90,style: ' margin: 5px 0px 0px 6px'},
				{xtype: 'numberfield',id: 'shour',labelAlign: 'right', value: 8, maxValue: 23, minValue: 00, labelWidth: 30, style: ' margin: 5px 0px 0px 6px', width: 70 },
				{xtype: 'label', text: '小时', style: ' margin: 8px 0px 0px 6px' },
				{xtype: 'numberfield', id: 'sminute',value: 0, maxValue: 59, minValue: 00, style: ' margin: 5px 0px 0px 6px', width: 70 },
				{xtype: 'label', text: '分', style: ' margin: 8px 0px 0px 6px' }
			]
		},
		{layout: 'column', defaults: {labelAlign: 'right'},frame:true,border: false,baseCls: 'my-panel-no-border',
			items: [
				{xtype:'datefield',fieldLabel:'上报结束时间',format : 'Y-m-d',editable : true,/*value:new Date(),*/id:'jssj',labelAlign:'right',labelWidth:90,style: ' margin: 5px 0px 0px 6px'},
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
			V_V_TYPE:V_TYPE,
            V_V_DEPTCODE:V_ORGCODE
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
			if(resp.list[0].D_DATE_E)
			    // 获取开始时间
			var strtimee=resp.list[0].D_DATE_E;
			var strdatee=strtimee.split('.')[0].split(' ')[0];
            var ehour=strtimee.split('.')[0].split(' ')[1].split(':')[0];
            var eminute=strtimee.split('.')[0].split(' ')[1].split(':')[1];
			// 获取结束时间
            var strtimes=resp.list[0].D_DATE_S;
            var strdates=strtimes.split('.')[0].split(' ')[0];
            var shour=strtimes.split('.')[0].split(' ')[1].split(':')[0];
            var sminute=strtimes.split('.')[0].split(' ')[1].split(':')[1];

            var nowTime=Ext.Date.format(nowdate,'Y-m-d');
            if(strdatee==strdates&&strdates==nowTime){
               //开始时间
               //  Ext.getCmp('kssj').setValue(getWeekStartDate());
                Ext.getCmp('kssj').setValue(Ext.Date.format(new Date(getWeekStartDate()),'Y-m-d'));
                Ext.getCmp('shour').setValue("8");
                Ext.getCmp('sminute').setValue("00");

                //结束时间
                // Ext.getCmp('jssj').setValue(getWeekEndDate());
                Ext.getCmp('jssj').setValue(Ext.Date.format(new Date(getWeekEndDate()),'Y-m-d'));
                Ext.getCmp('ehour').setValue("12");
                Ext.getCmp('eminute').setValue("00");

            }else{
                //开始时间
                Ext.getCmp('kssj').setValue(strdates);
                Ext.getCmp('shour').setValue(shour);
                Ext.getCmp('sminute').setValue(sminute);
                //结束时间
                Ext.getCmp('jssj').setValue(strdatee);
                Ext.getCmp('ehour').setValue(ehour);
                Ext.getCmp('eminute').setValue(eminute);
            }
			// Ext.getCmp('jssj').setValue(strdatee);
			// var ehour=strtimee.split('.')[0].split(' ')[1].split(':')[0];
			// var eminute=strtimee.split('.')[0].split(' ')[1].split(':')[1];
			// Ext.getCmp('ehour').setValue(ehour);
			// Ext.getCmp('eminute').setValue(eminute);
            //
            //
			// Ext.getCmp('kssj').setValue(strdates);
			// var shour=strtimes.split('.')[0].split(' ')[1].split(':')[0];
			// var sminute=strtimes.split('.')[0].split(' ')[1].split(':')[1];
			// Ext.getCmp('shour').setValue(shour);
			// Ext.getCmp('sminute').setValue(sminute);
		}
	});
});
//保存
function OnButtonSaveClicked(){
	var stime=Ext.getCmp('kssj').getSubmitValue()+' '+Ext.getCmp('shour').getValue()+':'+Ext.getCmp('sminute').getValue()+':'+'00';
	var etime=Ext.getCmp('jssj').getSubmitValue()+' '+Ext.getCmp('ehour').getValue()+':'+Ext.getCmp('eminute').getValue()+':'+'00';
	if(new Date(stime)>new Date(etime)){
		alert("开始时间不能晚于结束时间");
		return;
	}
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
			'V_D_DATE_S':stime,
			'V_V_ORGCODE':V_ORGCODE
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
//月共几天
function getDaysOfMonth(year, month) {
    var month = parseInt(month, 10);
    var d = new Date(year, month, 0);
    return d.getDate();
}
//本周开始时间
function getWeekStartDate() {
    var year = parseInt(V_YEAR);
    var month = parseInt(V_MONTH);
    var week = parseInt(V_WEEK)-1;
    if(week==0){
        month=parseInt(V_MONTH)-1;
        week=5;
    }
    var dat = new Date(year, month - 1, 1);
    var day = dat.getDay();
    var date = dat.getDate() + (week - 1) * 7;
    var hao = dat.getDate();
    var days = getDaysOfMonth(year, month - 1);//上月有几天
    if (day == 0) {
        day = 7;
    }
    if (date < day) {
        hao = date + days - day + 1;
    } else {
        hao = date - day + 1;
    }
    var yue = dat.getMonth();
    if (date < day) {
        yue = yue - 1;
    }
    var nian = dat.getFullYear();
    if (yue < 0) {
        nian = nian - 1;
        yue = yue + 12;
    }
    if (hao > getDaysOfMonth(year, month)) {
        hao = hao - getDaysOfMonth(year, month);
        yue = yue + 1;
    }
    if (yue > 11) {
        nian == nian + 1;
    }
    return nian + "-" + (yue + 1) + "-" + hao;
}

//本周结束时间
function getWeekEndDate() {
    var year = parseInt(V_YEAR);
    var month = parseInt(V_MONTH);
    var week = parseInt(V_WEEK)-1;
    if(week==0){
        month=parseInt(V_MONTH)-1;
        week=5;
    }
    var dat = new Date();
    var dat = new Date(year, month - 1, 1);
    var day = dat.getDay();
    var date = dat.getDate() + (week - 1) * 7;
    var hao = dat.getDate();
    var days = getDaysOfMonth(year, month);//本月有几天
    if (day == 0) {
        // day = 7;
        day = 4;
    }
    // hao = date + (7 - day);
    hao = date + (4 - day);
    var yue = dat.getMonth();
    if (hao > days) {
        hao = hao - days;
        yue = yue + 1;
    }
    var nian = dat.getFullYear();
    if (yue > 11) {
        yue = yue - 12;
        nian = nian + 1;
    }
    return nian + "-" + (yue + 1) + "-" + hao;
}