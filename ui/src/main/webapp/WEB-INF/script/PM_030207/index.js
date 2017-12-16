var date=new Date();
var V_YEARPLAN_GUID='';
//年份
var years=[];
for (var i =date.getFullYear()-4; i <=date.getFullYear()+1; i++){
	years.push({ displayField: i, valueField: i });
}
var yearStore=Ext.create("Ext.data.Store", {
	storeId: 'yearStore',
	fields: ['displayField','valueField'],
	data: years,
	proxy: {
		type: 'memory',
		reader: {type: 'json'}
	}
});
//计划厂矿
var jhckStore=Ext.create("Ext.data.Store", {
	storeId: 'jhckStore',
	autoLoad: true,
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
//专业
var zyStore = Ext.create('Ext.data.Store', {
	autoLoad: false,
	storeId: 'zyStore',
	fields: ['V_SPECIALTYCODE', 'V_BASENAME'],
	proxy: {
		type: 'ajax',
		async: false,
		url: AppUrl + 'basic/PRO_BASE_SPECIALTY_DEPT_SPECIN',
		actionMethods: {
			read: 'POST'
		},
		reader: {
			type: 'json',
			root: 'list'
		}
	}
});
//页面表格信息加载
var gridStore = Ext.create('Ext.data.Store', {
	id : 'gridStore',
	pageSize : 15,
	autoLoad : false,
	fields :['I_ID',
	'V_YEARPLAN_GUID',
	'V_YEAR',
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
	'V_STATUSNAME'],
	proxy : {
		type : 'ajax',
		async : false,
		url : AppUrl + 'PM_03/PRO_PM_03_PLAN_YEAR_VIEW',
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
var northPanel = Ext.create('Ext.form.Panel', {
	region: 'north',
	border: false,
	items: [
		{layout: 'column',  defaults: { style : 'margin:5px 0px 5px 5px',labelAlign: 'right'},frame:true,border: false,
			items: [
				{xtype: 'combo',id:'nf',fieldLabel: '年份',editable: false,labelWidth:80,width:260,displayField: 'displayField',valueField: 'valueField',value:'',store:yearStore,queryMode: 'local'},
				{xtype: 'combo',id:'jhck',fieldLabel: '计划厂矿',editable: false,labelWidth:80,width:260, displayField: 'V_DEPTNAME',valueField: 'V_DEPTCODE',value: '',store:jhckStore,queryMode: 'local'},
				{xtype: 'combo',id:'jhzyq',fieldLabel: '作业区', editable: false,labelWidth:80,width:260, displayField: 'V_DEPTNAME',valueField: 'V_DEPTCODE',value: '',store:jhzyqStore,queryMode: 'local'},
				{xtype: 'combo',id:'zy',fieldLabel: '专业', editable: false,labelWidth:80,width:260, displayField: 'V_BASENAME',valueField: 'V_SPECIALTYCODE',value: '',store:zyStore,queryMode: 'local'},
				{hidden:true,xtype: 'displayfield',fieldLabel: '截止上报时间',readOnly: true,labelWidth:80,width:260, value: ''},
				{xtype: 'button', text: '查询', icon:imgpath + '/search.png', handler:QueryGrid},
				//{xtype: 'button', text: '添加', margin: '10 0 5 10',icon: imgpath +'/add.png', handler:OnButtonAddClicked},
				//{xtype: 'button', text: '修改', margin: '10 0 5 10',icon: imgpath + '/edit.png',handler:OnButtonEditClicked},
				//{xtype: 'button', text: '删除', margin: '10 0 5 10',icon: imgpath + '/delete1.png',handler:OnButtonDelete},
				{xtype: 'button', text: '通过',icon: imgpath + '/saved.png',handler:OnButtonPassClicked},
				{xtype: 'button', text: '驳回',icon: imgpath + '/cross.png',handler:OnButtonBackClicked},
				{xtype: 'button', text: '导出Excel', icon: imgpath + '/grid.png',handler:OnButtonExcelClicked}
			]
		}
	]
});

var gridPanel= Ext.create('Ext.grid.Panel', {
	id:'gridPanel',
	region: 'center',
	border: false,
	store:'gridStore',
	selType:'checkboxmodel',
	columns:[
		{text: '序号', align: 'center', width: 50,xtype: 'rownumberer'},
		{text: '计划状态', align: 'center', width: 100, dataIndex: 'V_STATUSNAME'},
		{text: '设备名称', align: 'center', width: 100, dataIndex: 'V_EQUNAME'},
		{text: '专业', align: 'center', width: 100, dataIndex: 'V_REPAIRMAJOR_CODE'},
		{text: '检修内容', align: 'center', width: 100, dataIndex: 'V_CONTENT'},
		{text: '计划内容', align: 'center', width: 100, dataIndex: 'V_TEL'},
		{text: '检修模型', align: 'center', width: 100, dataIndex: 'V_EQUTYPENAME'},
		{text: '计划停机日期', align: 'center', width: 150,renderer: Ext.util.Format.dateRenderer('Y-m-d H:i'), dataIndex: 'V_STARTTIME'},
		{text: '计划竣工日期', align: 'center', width: 150,renderer: Ext.util.Format.dateRenderer('Y-m-d H:i'), dataIndex: 'V_ENDTIME'},
		{text: '计划工期（小时）', align: 'center', width: 150, dataIndex: 'V_HOUR'},
		{text: '厂矿', align: 'center', width: 100, dataIndex: 'V_DEPTNAME'},
		{text: '车间名称', align: 'center', width: 100, dataIndex: 'V_ORGNAME'},
		{text: '录入人', align: 'center', width: 100, dataIndex: 'V_PERSONNAME'},
		{text: '录入时间', align: 'center', width: 100, dataIndex: 'V_INDATE'}
	],
	bbar:["->",
		{
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

Ext.onReady(function () {
	Ext.create('Ext.container.Viewport', {
		layout:'border',
		items: [northPanel,gridPanel]
	});
	Ext.getCmp('nf').setValue(new Date().getFullYear());//年份默认值
	//计划厂矿加载时
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
	//计划厂矿更改时加载作业区
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
	//作业区
	Ext.data.StoreManager.lookup('jhzyqStore').on('load', function () {
		Ext.getCmp("jhzyq").select(Ext.data.StoreManager.lookup('jhzyqStore').getAt(0));
		Ext.data.StoreManager.lookup('zyStore').load({
			params: {
				V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
				V_V_DEPTNEXTCODE: Ext.getCmp('jhzyq').getValue()
			}
		});
	});
	Ext.data.StoreManager.lookup('zyStore').on('load', function () {
		Ext.getCmp("zy").select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
	});
	Ext.getCmp('zyq').on('select', function () {
		Ext.data.StoreManager.lookup('zyStore').load({
			params: {
				V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
				V_V_DEPTNEXTCODE: Ext.getCmp('jhzyq').getValue()
			}
		});
	});
});
//查询
function QueryGrid() {
	Ext.data.StoreManager.lookup('gridStore').load({
		params: {
			V_V_INPER:Ext.util.Cookies.get('v_personcode'),
			V_V_YEAR:Ext.getCmp('nf').getValue(),
			V_V_ORGCODE:Ext.getCmp('jhck').getValue(),
			V_V_DEPTCODE:Ext.getCmp('jhzyq').getValue(),
			V_V_REPAIRMAJOR_CODE:Ext.getCmp('zy').getValue(),
			V_V_PLANTYPE:'YEAR'
		}
	});
}
//添加
function OnButtonAddClicked() {
	//var ret = window.open(AppUrl + 'page/PM_030209/index.html?V_YEARPLAN_GUID=0'+ "&year="+ Ext.getCmp("year").getValue()+"&V_ORGCODE="+Ext.getCmp("ck").getValue() + "&V_DEPTCODE="
	//+ Ext.getCmp("zyq").getValue() + "&V_DEPTNEXTCODE="+ V_DEPTNEXTCODE+'&V_STATUSCODE=0', '','height=600px,width=1200px,top=50px,left=100px,resizable=yes');

	V_YEARPLAN_GUID = '0';
	var ret = window.open(AppUrl + 'page/PM_030209/index.html?V_YEARPLAN_GUID=' + V_YEARPLAN_GUID +
	"&YEAR=" + Ext.getCmp("nf").getValue() +
	"&V_ORGCODE=" + Ext.getCmp("jhck").getValue() +
	"&V_DEPTCODE=" + Ext.getCmp("jhzyq").getValue(), '', 'height=600px,width=1200px,top=50px,left=100px,resizable=yes');
}
//修改
function OnButtonEditClicked(){
	var seldata=Ext.getCmp('gridPanel').getSelectionModel().getSelection();
	if(seldata.length!=1){
		Ext.Msg.alert('操作信息', '请选择一条信息进行修改');
		return false;
	}
	V_YEARPLAN_GUID=seldata[0].data.V_YEARPLAN_GUID;
	var ret = window.open(AppUrl + 'page/PM_030209/index.html?V_YEARPLAN_GUID='+V_YEARPLAN_GUID,'','height=600px,width=1200px,top=50px,left=100px,resizable=yes');
}
//删除
function OnButtonDelete(){
	var length = Ext.getCmp('gridPanel').getSelectionModel().getSelection().length;
	if(length==0) {
		Ext.Msg.alert('操作信息','请选择信息进行删除');
		return false;
	}
	var i_err=0;
	for(var i=0;i<length;i++){
		Ext.Ajax.request({
			url: AppUrl + 'PM_03/PRO_PM_03_PLAN_YEAR_DEL',
			method: 'POST',
			async : false,
			params:{
				V_V_YEARPLAN_GUID : Ext.getCmp('gridPanel').getSelectionModel().getSelection()[i].data.V_YEARPLAN_GUID
			},
			success:function(resp){
				i_err++;
			}
		});
	}
	if(i_err==length){
		Ext.Msg.alert('操作信息', '删除成功');
	}else{
		Ext.Msg.alert('操作信息', '删除失败');
	}
	QueryGrid();
}
//通过
function OnButtonPassClicked(){
	var selectedRecords=Ext.getCmp('gridPanel').getSelectionModel().getSelection();
	var length = selectedRecords.length;
	if(length==0){
		Ext.Msg.alert('操作信息', '请选择信息进行通过');
		return false;
	}
	var i_err=0;
	for(var i=0;i<length;i++) {
		Ext.Ajax.request({
			url: AppUrl + 'PM_03/PRO_PM_03_PLAN_YEAR_SEND',
			method : 'POST',
			async : false,
			params : {
				V_V_YEARPLAN_GUID:selectedRecords[i].data.V_YEARPLAN_GUID,
				V_V_ORGCODE:selectedRecords[i].data.V_ORGCODE,
				V_V_DEPTCODE:selectedRecords[i].data.V_DEPTCODE,
				V_V_FLOWCODE:selectedRecords[i].data.V_FLOWCODE,
				V_V_PLANTYPE:"YEAR",
				V_V_FLOWSTATE:"通过",
				V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode')
			},
			success : function(response) {
				var response = Ext.decode(response.responseText);
				if (response.V_INFO != '成功') {
					Ext.Msg.alert('操作信息', '通过失败');
				}else{
					i_err++;
				}
			}
		});
	}
	if(i_err==length){
		Ext.Msg.alert('操作信息', '通过成功');
	}
	QueryGrid();
}
//驳回
function OnButtonBackClicked() {
	var selectedRecords=Ext.getCmp('gridPanel').getSelectionModel().getSelection();
	var length = selectedRecords.length;
	if(length==0){
		Ext.Msg.alert('操作信息', '请选择信息进行驳回');
		return false;
	}
	var i_err=0;
	for(var i=0;i<length;i++) {
		Ext.Ajax.request({
			url: AppUrl + 'PM_03/PRO_PM_03_PLAN_YEAR_SEND',
			method : 'POST',
			async : false,
			params : {
				V_V_YEARPLAN_GUID:selectedRecords[i].data.V_YEARPLAN_GUID,
				V_V_ORGCODE:selectedRecords[i].data.V_ORGCODE,
				V_V_DEPTCODE:selectedRecords[i].data.V_DEPTCODE,
				V_V_FLOWCODE:selectedRecords[i].data.V_FLOWCODE,
				V_V_PLANTYPE:"YEAR",
				V_V_FLOWSTATE:"驳回",
				V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode')
			},
			success : function(response) {
				var response = Ext.decode(response.responseText);
				if (response.V_INFO != '成功') {
					Ext.Msg.alert('操作信息', '驳回失败');
				}else{
					i_err++;
				}
			}
		});
	}
	if(i_err==length){
		Ext.Msg.alert('操作信息', '驳回成功');
	}
	QueryGrid();
}
function OnButtonExcelClicked(){
	document.location.href=AppUrl + 'excel/YSCBSP_EXCEL?V_V_INPER='+Ext.util.Cookies.get('v_personcode')+
	'&V_V_YEAR='+Ext.getCmp('nf').getValue()+
	'&V_V_ORGCODE='+Ext.getCmp('jhck').getValue()+
	'&V_V_DEPTCODE='+ Ext.getCmp('jhzyq').getValue()+
	'&V_V_REPAIRMAJOR_CODE='+Ext.getCmp('zy').getValue()+
	'&V_V_PLANTYPE='+'YEAR';
}