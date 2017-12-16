var V_GUID=null;
if (location.href.split('?')[1] != undefined) {
	V_GUID = Ext.urlDecode(location.href.split('?')[1]).V_GUID;
}

var selectID='';

var gridStore1 = Ext.create('Ext.data.Store', {
	storeId: 'gridStore1',
	autoLoad: true,
	fields: ['I_ID', 'V_GUID', 'V_GZ', 'V_NUM', 'V_TIME', 'V_MEMO'],
	proxy: {
		url: AppUrl + 'dx/PRO_PM_EQUREPAIRPLAN_YG_VIEW',
		type: 'ajax',
		actionMethods: {
			read: 'POST'
		},
		async: false,
		extraParams: {
			V_V_GUID:V_GUID
		},
		reader: {
			type: 'json',
			root: 'list'
		}
	}
});
var gridStore2 = Ext.create('Ext.data.Store', {
	storeId: 'gridStore2',
	autoLoad: true,
	fields: ['I_ID', 'V_GUID', 'V_WL_CODE', 'V_WL_NAME', 'V_JLDW', 'V_NUM','V_GGXH','V_DJ'],
	proxy: {
		url: AppUrl + 'dx/PRO_PM_EQUREPAIRPLAN_WL_VIEW',
		type: 'ajax',
		actionMethods: {
			read: 'POST'
		},
		async: false,
		extraParams: {
			V_V_GUID:V_GUID
		},
		reader: {
			type: 'json',
			root: 'list'
		}
	}
});
var gridStore3 = Ext.create('Ext.data.Store', {
	storeId: 'gridStore3',
	autoLoad: true,
	fields: ['I_ID', 'V_GUID', 'V_JJ_CODE', 'V_JJ_NAME', 'V_JLDW', 'V_NUM'],
	proxy: {
		url: AppUrl + 'dx/PRO_PM_EQUREPAIRPLAN_JJ_VIEW',
		type: 'ajax',
		actionMethods: {
			read: 'POST'
		},
		async: false,
		extraParams: {
			V_V_GUID:V_GUID
		},
		reader: {
			type: 'json',
			root: 'list'
		}
	}
});
var northPanel= Ext.create('Ext.form.Panel', {
	id : 'northPanel',
	region:'north',
	layout : 'vbox',
	frame : true,
	width:'100%',
	border: false,
	//baseCls: 'my-panel-no-border',
	margin:'0 0 0 5',
	items: [
		{layout: 'column', defaults: {labelAlign: 'right'},frame:true,border: false,baseCls: 'my-panel-no-border',
			items: [
				{xtype: 'button', text: '关闭', margin: '10 0 10 10',icon:imgpath + '/cross.png', handler:OnCloseClicked},
				{xtype: 'button', text: '打印', margin: '10 0 10 10',icon:imgpath + '/printer.png',handler:OnPrinterClicked}
			]
		},
		{layout: 'column', defaults: {labelAlign: 'right'},frame:true,border: false,baseCls: 'my-panel-no-border',
			items: [
				{xtype: 'textfield',id:'lxjhbm',fieldLabel: '放行计划编码',labelAlign: 'right',readOnly: true, margin: '5 0 5 5',labelWidth:80,width:280, value: ''},
				{xtype: 'textfield',id:'lxjhmc',fieldLabel: '放行计划名称',labelAlign: 'right',readOnly: true, margin: '5 0 5 5',labelWidth:80,width:280, value: ''},
				{xtype: 'textfield',id:'guidfxjh',margin: '5 0 5 5',width:540, value: '',readOnly: true,hidden:true}
			]
		},
		{layout: 'column', defaults: {labelAlign: 'right'},frame:true,border: false,baseCls: 'my-panel-no-border',
			items: [
				{xtype: 'textfield',id:'sjgcbm',fieldLabel: '上级工程编码',labelAlign: 'right',readOnly: true, margin: '5 0 5 5',labelWidth:80,width:280, value: ''},
				{xtype: 'textfield',id:'sjgcmc',fieldLabel: '上级工程名称',labelAlign: 'right',readOnly: true, margin: '5 0 5 5',labelWidth:80,width:280, value: ''},
				{xtype: 'textfield',id:'guidp',margin: '5 0 5 5',width:540, value: '',readOnly: true,hidden:true}
			]
		},
		{layout: 'column', defaults: {labelAlign: 'right'},frame:true,border: false,baseCls: 'my-panel-no-border',
			items: [
				{xtype: 'textfield',id:'year',fieldLabel: '年份',readOnly: true,margin: '5 0 5 5',labelWidth:80,width:280,value:''},
				{xtype: 'textfield',id:'month',fieldLabel: '月份',readOnly: true,margin: '5 0 5 5',labelWidth:80,width:280,value:''},
				{xtype: 'textfield',id:'guid',margin: '5 0 5 5',width:540, value: '',readOnly: true,hidden:true}
			]
		},
		{layout: 'column', defaults: {labelAlign: 'right'},frame:true,border: false,baseCls: 'my-panel-no-border',
			items: [
				{xtype: 'textfield',id: 'ck',fieldLabel: '计划厂矿',readOnly: true, margin: '5 0 5 5',labelWidth:80,width:280,value:''},
				{xtype: 'textfield',id:'zyq',fieldLabel: '作业区',readOnly: true, margin: '5 0 5 5',labelWidth:80,width:280,value:''}
			]
		},
		{layout: 'column', defaults: {labelAlign: 'right'},frame:true,border: false,baseCls: 'my-panel-no-border',
			items: [
				{xtype: 'textfield',id:'gcxmbm',fieldLabel: '工程项目编码',labelAlign: 'right',readOnly: true, margin: '5 0 5 5',labelWidth:80,width:280, value: ''},
				{xtype: 'textfield',id:'gcxmmc',fieldLabel: '工程项目名称',labelAlign: 'right',readOnly: true, margin: '5 0 5 5',labelWidth:80,width:280, value: ''}
			]
		},
		{layout: 'column', defaults: {labelAlign: 'right'},frame:true,border: false,baseCls: 'my-panel-no-border',
			items: [
				{xtype: 'textfield',id:'ys',fieldLabel: '预算（万元）',labelAlign: 'right', readOnly: true,margin: '5 0 5 5',labelWidth:80,width:280, value: ''},
				{xtype: 'textfield',id:'zy',fieldLabel: '专业',readOnly: true, margin: '5 0 5 5',labelWidth:80,width:280, value: ''}
			]
		},
		{layout: 'column', defaults: {labelAlign: 'right'},frame:true,border: false,baseCls: 'my-panel-no-border',
			items: [
				{xtype: 'textfield',id:'sbbm',fieldLabel: '设备编码',labelAlign: 'right',readOnly: true, margin: '5 0 5 5',labelWidth:80,width:280, value: ''},
				{xtype: 'textfield',id:'sbmc',fieldLabel: '设备名称',labelAlign: 'right',readOnly: true, margin: '5 0 5 5',labelWidth:80,width:280, value: ''}
			]
		},
		{layout: 'column', defaults: {labelAlign: 'right'},frame:true,border: false,baseCls: 'my-panel-no-border',
			items: [
				{xtype: 'textfield',id:'jsdw',fieldLabel: '建设单位',labelAlign: 'right', readOnly: true,margin: '5 0 5 5',labelWidth:80,width:280, value: ''},
				{xtype: 'textfield',id:'gcfzr',fieldLabel: '工程负责人',labelAlign: 'right',readOnly: true, margin: '5 0 5 5',labelWidth:80,width:280, value: ''}
			]
		},
		{layout: 'column', defaults: {labelAlign: 'right'},frame:true,border: false,baseCls: 'my-panel-no-border',
			items: [
				{xtype: 'textfield',id:'kssj',fieldLabel: '开始时间',readOnly: true,labelAlign: 'right', margin: '5 0 5 5',labelWidth:80,width:280,value:''},
				{xtype: 'textfield',id:'jssj',fieldLabel: '结束时间',readOnly: true,labelAlign: 'right', margin: '5 0 5 5',labelWidth:80,width:280,value:''}
			]
		},
		{xtype: 'textarea',id:'gcnr',fieldLabel: '工程内容',labelAlign: 'right',readOnly: true,margin: '5 0 0 5',labelWidth:80,width:565,height:80,value: ''}
		]
});
var gridPanel1= Ext.create('Ext.form.Panel', {
	id : 'gridPanel1',
	region:'north',
	layout : 'column',
	frame : true,
	border: false,
	//baseCls: 'my-panel-no-border',
	margin:'10 0 0 5',
	items: [
		{xtype:'form',defaults: {labelAlign: 'right'},frame:true,border: false,baseCls: 'my-panel-no-border',
			items: [
				{xtype: 'displayfield',fieldLabel: '计划用工',labelAlign: 'right',margin: '5 0 10 5',labelWidth:80}
			]
		},
		{xtype:'grid',id:'jhyg',height:200,width:480,store:gridStore1,autoScroll:true,
			columns: [
				{text: '序号', align: 'center', width: 50,xtype: 'rownumberer'},
				{text: '工种', align: 'center', width:100,dataIndex: 'V_GZ'},
				{text: '人数', align: 'center', width:60,dataIndex: 'V_NUM'},
				{text: '工时', align: 'center', width:60,dataIndex: 'V_TIME'},
				{text: '说明', align: 'center', width:200,dataIndex: 'V_MEMO'}
			]
		}
	]
});
var gridPanel2= Ext.create('Ext.form.Panel', {
	id : 'gridPanel2',
	region:'north',
	layout : 'column',
	frame : true,
	border: false,
	//baseCls: 'my-panel-no-border',
	margin:'10 0 0 5',
	items: [
		{xtype:'form',defaults: {labelAlign: 'right'},frame:true,border: false,baseCls: 'my-panel-no-border',
			items: [
				{xtype: 'displayfield',fieldLabel: '计划物料',labelAlign: 'right',margin: '5 0 10 5',labelWidth:80}
			]
		},
		{xtype:'grid',id:'jhwl',height:200,width:802,store:gridStore2,autoScroll:true,
			columns: [
				{text: '序号', align: 'center', width: 50,xtype: 'rownumberer'},
				{text: '物料编码', align: 'center', width:150,dataIndex: 'V_WL_CODE'},
				{text: '物料名称 ', align: 'center', width:200,dataIndex:'V_WL_NAME'},
				{text: '规格 ', align: 'center', width:100,dataIndex:'V_GGXH'},
				{text: '计量单位 ', align: 'center', width:100,dataIndex: 'V_JLDW'},
				{text: '单价 ', align: 'center', width:100,dataIndex: 'V_DJ'},
				{text: '数量 ', align: 'center', width:100,dataIndex: 'V_NUM'}
			]
		}
	]
});
var gridPanel3= Ext.create('Ext.form.Panel', {
	id : 'gridPanel3',
	region:'north',
	layout : 'column',
	frame : true,
	border: false,
	//baseCls: 'my-panel-no-border',
	margin:'10 0 0 5',
	items: [
		{xtype:'form',defaults: {labelAlign: 'right'},frame:true,border: false,baseCls: 'my-panel-no-border',
			items: [
				{xtype: 'displayfield',fieldLabel: '机具配备',labelAlign: 'right',margin: '5 0 10 5',labelWidth:80}
			]
		},
		{xtype:'grid',id:'jjpb',height:200,width:480,store:gridStore3,autoScroll:true,
			columns: [
				{text: '序号', align: 'center', width: 50,xtype: 'rownumberer'},
				{text: '机具编码', align: 'center', width:100,dataIndex: 'V_JJ_CODE'},
				{text: '机具名称 ', align: 'center', width:150,dataIndex:'V_JJ_NAME'},
				{text: '计量单位 ', align: 'center', width:100,dataIndex: 'V_JLDW'},
				{text: '数量 ', align: 'center', width:78,dataIndex: 'V_NUM'}
			]
		}
	]
});
var southPanel= Ext.create('Ext.form.Panel', {
	id : 'southPanel',
	region:'north',
	layout : 'vbox',
	frame : true,
	border: false,
	//baseCls: 'my-panel-no-border',
	margin:'5 0 0 5',
	items: [
		{xtype: 'textarea',id:'sgyc',fieldLabel: '事故预测',labelAlign: 'right',readOnly: true,margin: '5 0 5 5',labelWidth:80,width:565,height:80,value: ''},
		{xtype: 'textarea',id:'aqdc',fieldLabel: '安全对策',labelAlign: 'right',readOnly: true,margin: '5 0 5 5',labelWidth:80,width:565,height:80,value: ''}
	]
});
Ext.onReady(function () {
	Ext.create('Ext.container.Viewport', {
		layout: 'border',
		autoScroll : true,
		items: [northPanel,gridPanel1,gridPanel2,gridPanel3,southPanel]
	});
	if(V_GUID!=''&&V_GUID!=null){
		Ext.Ajax.request({
			url: AppUrl + 'dx/PRO_PM_EQUREPAIRPLAN_TREE_GET',
			method: 'POST',
			async: false,
			params: {
				V_V_GUID:V_GUID,
				V_BY1:'',
				V_BY2:'',
				V_BY3:''
			},
			success: function (resp) {
				var resp = Ext.decode(resp.responseText);
				if(resp.list.length==1){
					var V_PROJECT_CODE_FXJH=resp.list[0].V_PROJECT_CODE_FXJH;
					var V_PROJECT_NAME_FXJH=resp.list[0].V_PROJECT_NAME_FXJH;
					var V_PROJECT_CODE_P=resp.list[0].V_PROJECT_CODE_P;
					var V_PROJECT_NAME_P=resp.list[0].V_PROJECT_NAME_P;
					var V_YEAR=resp.list[0].V_YEAR;
					var V_MONTH=resp.list[0].V_MONTH;
					var V_ORGNAME=resp.list[0].V_ORGNAME;
					var V_DEPTNAME=resp.list[0].V_DEPTNAME;
					var V_PROJECT_CODE=resp.list[0].V_PROJECT_CODE;
					var V_PROJECT_NAME=resp.list[0].V_PROJECT_NAME;
					var V_PLAN_MONEY=resp.list[0].V_PLAN_MONEY;
					var V_SPECIALTY=resp.list[0].V_SPECIALTY;
					var V_EQUCODE=resp.list[0].V_EQUCODE;
					var V_EQUNAME=resp.list[0].V_EQUNAME;
					var V_BUILD_DEPT=resp.list[0].V_BUILD_DEPT;
					var V_BULID_PERSON=resp.list[0].V_BULID_PERSON;
					var V_DATE_B=resp.list[0].V_DATE_B;
					var V_DATE_E=resp.list[0].V_DATE_E;
					var V_CONTENT=resp.list[0].V_CONTENT;
					var V_GUID_FXJH=resp.list[0].V_GUID_FXJH;
					var V_GUID_P=resp.list[0].V_GUID_P;
					var V_GUID=resp.list[0].V_GUID;
                    var V_SGYC=resp.list[0].V_SGYC;
                    var V_AQDC=resp.list[0].V_AQDC;

					Ext.getCmp('lxjhbm').setValue(V_PROJECT_CODE_FXJH);
					Ext.getCmp('lxjhmc').setValue(V_PROJECT_NAME_FXJH);
					Ext.getCmp('sjgcbm').setValue(V_PROJECT_CODE_P);
					Ext.getCmp('sjgcmc').setValue(V_PROJECT_NAME_P);
					Ext.getCmp('year').setValue(V_YEAR);
					Ext.getCmp('month').setValue(V_MONTH);
					Ext.getCmp('ck').setValue(V_ORGNAME);
					Ext.getCmp('zyq').setValue(V_DEPTNAME);
					Ext.getCmp('gcxmbm').setValue(V_PROJECT_CODE);
					Ext.getCmp('gcxmmc').setValue(V_PROJECT_NAME);
					Ext.getCmp('ys').setValue(V_PLAN_MONEY);
					Ext.getCmp('zy').setValue(V_SPECIALTY);
					Ext.getCmp('sbbm').setValue(V_EQUCODE);
					Ext.getCmp('sbmc').setValue(V_EQUNAME);
					Ext.getCmp('jsdw').setValue(V_BUILD_DEPT);
					Ext.getCmp('gcfzr').setValue(V_BULID_PERSON);
					Ext.getCmp('kssj').setValue(V_DATE_B);
					Ext.getCmp('jssj').setValue(V_DATE_E);
					Ext.getCmp('gcnr').setValue(V_CONTENT);
					Ext.getCmp('guidfxjh').setValue(V_GUID_FXJH);
					Ext.getCmp('guidp').setValue(V_GUID_P);
					Ext.getCmp('guid').setValue(V_GUID);
					Ext.getCmp('sgyc').setValue(V_SGYC);
					Ext.getCmp('aqdc').setValue(V_AQDC);
				}
			}
		});
	}
});
//关闭
function OnCloseClicked(){
	window.close();
}
//打印
function OnPrinterClicked(){
	selectID=V_GUID;
	window.open(AppUrl + "page/pm_dxgc_bz0198_printer/index.html", selectID, "dialogHeight:700px;dialogWidth:1100px");
}