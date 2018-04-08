var date=new Date();
var V_QUARTERPLAN_GUID='';
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
//季度
var quarters=[{ displayField:'春季', valueField:'1'},{ displayField:'夏季', valueField:'2'},{ displayField:'秋季', valueField:'3'},{ displayField:'冬季', valueField:'4'}];
var quarterStore=Ext.create("Ext.data.Store", {
	storeId: 'quarterStore',
	fields: ['displayField','valueField'],
	data: quarters,
	proxy: {
		type: 'memory',
		reader: {type: 'json'}
	}
});
//计划厂矿
var ckStore=Ext.create("Ext.data.Store", {
	storeId: 'ckStore',
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
var zyqStore = Ext.create('Ext.data.Store', {
	autoLoad: false,
	storeId: 'zyqStore',
	fields: ['V_DEPTCODE', 'V_DEPTNAME'],
	proxy: {
		type: 'ajax',
		async: false,
		url: AppUrl + 'PM_03/PRO_BASE_DEPT_VIEW_ROLE_PLAN',
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
	fields :[
		'V_STATE_LOCK',
		'D_DATE_LOCK',
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
		'V_MANNAME',
		'V_TEL',
		'V_INDATE',
		'V_INPER',
		'V_INPERNAME',
		'V_FLOWCODE',
		'V_ORDER',
		'V_QUARTER',
		'V_BZ',
		'V_FLOWORDER',
		'V_FLOWTYPE',
		'V_JHMX_GUID',
		'V_OTHERPLAN_GUID',
		'V_OTHERPLAN_TYPE',
		'V_STATE',
		'V_QUARTERID',
		'V_REPAIRDEPT_NAME'
	],
	proxy : {
		type : 'ajax',
		async : false,
		url : AppUrl + 'PM_03/PRO_PM_PLAN_LOCKING_Q_VIEW',
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

//判断当前月份是什么季度
function getQuarterOfMonth(){
	var currMonth=new Date().getMonth()+1;
	var quarter='0';
	if(3<=currMonth&&currMonth<=5){
		quarter='1';
	}
	if(6<=currMonth&&currMonth<=8){
		quarter='2';
	}
	if(9<=currMonth&&currMonth<=11){
		quarter='3';
	}
	if(currMonth==12||currMonth==1||currMonth==2){
		quarter='4';
	}
	return quarter;
}

var northPanel = Ext.create('Ext.form.Panel', {
	region: 'north',
	frame: true,
	border: false,
	//baseCls: 'my-panel-no-border',
	margin: '0 0 0 0',
	items: [
		{layout: 'column', defaults: {labelAlign: 'right'},frame:true,border: false,baseCls: 'my-panel-no-border',
			items: [
				{xtype: 'combo',id:'year',fieldLabel: '年份',editable: false, margin: '5 0 5 5',labelWidth:60,width:210,displayField: 'displayField',valueField: 'valueField',value:'',store:yearStore,queryMode: 'local'},
				{xtype: 'combo',id:'quarter',fieldLabel: '季度',editable: false, margin: '5 0 5 5',labelWidth:60,width:210,displayField: 'displayField',valueField: 'valueField',value:'',store:quarterStore,queryMode: 'local'},
				{xtype: 'combo',id:'ck',fieldLabel: '计划厂矿',editable: false, margin: '5 0 5 5',labelWidth:60,width:210, displayField: 'V_DEPTNAME',valueField: 'V_DEPTCODE',value: '',store:ckStore,queryMode: 'local'},
				{xtype: 'combo',id:'zyq',fieldLabel: '作业区', editable: false,margin: '5 0 5 5',labelWidth:60,width:210, displayField: 'V_DEPTNAME',valueField: 'V_DEPTCODE',value: '',store:zyqStore,queryMode: 'local'},
				{xtype: 'textfield',id:'seltext',fieldLabel: '检修内容',labelWidth:60,width:210, margin: '5 0 5 5',value: ''},
				{xtype: 'button', text: '查询', margin: '5 0 5 5',icon:imgpath + '/search.png', handler:queryGrid},
				{xtype: 'button', text: '导出Excel', margin: '5 0 5 5',icon: imgpath + '/grid.png',handler:OnButtonExcel},
				{xtype: 'displayfield',id:'endtime',fieldLabel: '截止时间',readOnly: true, margin: '5 0 5 5',labelWidth:60,width:210,  value: ''},
				{xtype: 'button', text: '设置', margin: '5 0 5 5',icon: imgpath + '/cog.png',handler:OnSetUpClicked}
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
		{text : '超时步骤',width : 110,dataIndex : 'V_STATE_LOCK',align : 'center'},
		{text : '上报时间',width : 150,dataIndex : 'D_DATE_LOCK',align : 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')} ,
		{text : '计划单位',width : 110,dataIndex : 'V_DEPTNAME',align : 'center'} ,
		{text : '设备名称',width : 110,dataIndex : 'V_EQUNAME',align : 'center'} ,
		{text : '检修内容',width : 300,dataIndex : 'V_CONTENT',align : 'center'} ,
		{text : '计划开工时间',width : 150,dataIndex : 'V_STARTTIME',align : 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')} ,
		{text : '计划竣工时间',width : 150,dataIndex : 'V_ENDTIME',align : 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')} ,
		{text : '计划工时(小时)',width : 110,dataIndex : 'V_HOUR',align : 'center'} ,
		{text : '施工单位',width : 110,dataIndex : 'V_REPAIRDEPT_NAME',align : 'center'} ,
		{text : '检修负责人',width : 110,dataIndex : 'V_MANNAME',align : 'center'}
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
	Ext.getCmp('year').setValue(new Date().getFullYear());//年份默认值
	Ext.getCmp('quarter').select(getQuarterOfMonth());		//季度默认值
	//计划厂矿加载时
	Ext.data.StoreManager.lookup('ckStore').on('load', function () {
		Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
		Ext.data.StoreManager.lookup('zyqStore').load({
			params: {
				'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
				'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
				'V_V_DEPTCODENEXT': '%',
				'V_V_DEPTTYPE': '主体作业区'
			}
		});
	});
	//计划厂矿更改时加载作业区
	Ext.getCmp('ck').on('select', function () {
		Ext.data.StoreManager.lookup('zyqStore').load({
			params: {
				'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
				'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
				'V_V_DEPTCODENEXT': '%',
				'V_V_DEPTTYPE': '主体作业区'
			}
		});
	});
	//作业区
	Ext.data.StoreManager.lookup('zyqStore').on('load', function () {
		Ext.getCmp("zyq").select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
		queryGrid();
	});
	//作业区改变
	Ext.getCmp('zyq').on('select', function () {
		Ext.data.StoreManager.lookup('zyStore').load({
			params: {
				V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
				V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue()
			}
		});
	});
	Ext.getCmp('zyq').on('select',function(){
		queryGrid();
	});
	Ext.getCmp('year').on('select',function(){
		queryGrid();
	});
	Ext.getCmp('quarter').on('select',function(){
		queryGrid();
	});
	Ext.data.StoreManager.lookup('gridStore').on('load',function(){
		var time=Ext.data.StoreManager.get('gridStore').proxy.reader.rawData.V_D_DATE_E;
		Ext.getCmp('endtime').setValue(time);
	});
});
function atleft(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return '<div data-qtip="' + value + '" >' + value + '</div>';
}
//查询
function queryGrid() {
	Ext.data.StoreManager.lookup('gridStore').load({
		params: {
			'V_V_YEAR':Ext.getCmp('year').getValue(),
			'V_V_QUARTER':Ext.getCmp('quarter').getValue(),
			'V_V_ORGCODE':Ext.getCmp('ck').getValue(),
			'V_V_DEPTCODE':Ext.getCmp('zyq').getValue(),
			'V_V_CONTENT':Ext.getCmp('seltext').getValue()
		}
	});
}
//导出Excel
function OnButtonExcel(){
	document.location.href=AppUrl + 'excel/JDSDGL_EXCEL?V_V_YEAR='+Ext.getCmp('year').getValue()+
							'&V_V_QUARTER='+Ext.getCmp('quarter').getValue()+
							'&V_V_ORGCODE='+Ext.getCmp('ck').getValue()+
							'&V_V_DEPTCODE='+encodeURI(Ext.getCmp('zyq').getValue())+
							'&V_V_CONTENT='+Ext.getCmp('seltext').getValue();
}
//设置
function OnSetUpClicked(){
	var owidth = window.document.body.offsetWidth - 200;
	var oheight = window.document.body.offsetHeight - 100;
	var ret = window.open(AppUrl + 'page/PM_0301011001/index.html?V_YEAR=' +Ext.getCmp('year').getValue()
		+'&V_MONTH='+Ext.getCmp('quarter').getValue()
		+'&V_WEEK=0'
		+'&V_TYPE=Q', '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}