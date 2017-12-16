var materialcode = '';
var wgridStore = Ext.create("Ext.data.Store", {
	autoLoad : false,
	storeId : 'wgridStore',
	pageSize : 50,
	fields : [ 'MATERIALCODE','MATERIALNAME','MATERIALETALON','UNIT','F_PRICE'],
	proxy : {
		type : 'ajax',
		async : false,
		url: AppUrl + 'cjy/pg_run7134_getbjlist',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		}
	},
	listeners:{
		beforeload:beforeload_wgridStore
	}
});

var egridStore = Ext.create("Ext.data.Store", {
	autoLoad : false,
	storeId : 'egridStore',
	pageSize : 50,
	fields : [ 'V_DEPTNAME',
		'EQU_DESC',
		'SITE_DESC',
		'BJ_AMOUNT'
	],
	proxy : {
		type : 'ajax',
		async : false,
		url: AppUrl + 'cjy/pg_run7134_getsitelist',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		}
	},
	listeners:{
		beforeload:beforeload_egridStore
	}
});

//var test = [{MAT_NO : 1,MAT_DESC:2,LTEXT:3,PLAN_PRICE:4,UNIT:5},{MAT_NO : 11,MAT_DESC:22,LTEXT:33,PLAN_PRICE:44,UNIT:55}]
var searchgridStore = Ext.create("Ext.data.Store", {
	autoLoad : false,
	storeId : 'searchgridStore',
	pageSize : 50,
	fields : [ 'MAT_NO','MAT_DESC','LTEXT','PLAN_PRICE','UNIT'],
	proxy : {
		type : 'ajax',
		async : false,
		url: AppUrl + 'cjy/pg_run7134_getmatlist',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		}
	},
	listeners:{
		beforeload:beforeload_searchgridStore
	}
});

var addwindow = Ext.create('Ext.window.Window', {
	id : 'addwindow',
	width : 420,
	height : 300,
	layout : 'column',
	title : '新增重点设备',
	modal : true,
	frame : true,
	closeAction : 'hide',
	colspan : 2,
	closable : true,
	items : [{
		xtype : 'textfield',
		id : 'bjbm',
		fieldLabel : '备件编码',
		labelAlign : 'right',
		labelWidth : 100,
		width : 250,
		margin : '10px 0 0 35px'
	},{
		xtype : 'displayfield',
		labelWidth : 40,
		renderer : Select,
		margin : '10px 0 0 10px'
	},{
		xtype : 'textfield',
		id : 'bjmc',
		fieldLabel : '备件名称',
		labelAlign : 'right',
		labelWidth : 100,
		width : 250,
		margin : '10px 0 0 35px'
	},{
		xtype : 'textfield',
		id : 'ggxh',
		fieldLabel : '规格型号',
		labelAlign : 'right',
		labelWidth : 100,
		width : 250,
		margin : '10px 0 0 35px'
	},{
		xtype : 'textfield',
		id : 'jldw',
		fieldLabel : '计量单位',
		labelAlign : 'right',
		labelWidth : 100,
		width : 250,
		margin : '10px 0 0 35px'
	},{
		xtype : 'textfield',
		id : 'jhj',
		fieldLabel : '计划价',
		regex: /^\d+$/,
		labelAlign : 'right',
		labelWidth : 100,
		width : 250,
		margin : '10px 0 0 35px'
	},{
		xtype : 'displayfield',
		labelWidth : 100,
		style : "color:red",
		margin : '10px 0 0 10px',
		renderer : function(){
			return '<a style="color:red">*请填写数字</a>'
		}
	},{
		xtype : 'button',
		text : '保存',
		width : 100,
		handler : onBtnSave,
		margin : '10px 0 0 160px'
	}]
});

var searchpanel = Ext.create('Ext.form.Panel', {
	id : 'searchpanel',
	region : 'north',
	layout : 'column',
	width : '100%',
	style: 'background-color:#FFFFFF',
	baseCls: 'my-panel-no-border',
	items : [{ id: 'searchequipcode',
		xtype: 'textfield',
		fieldLabel:'备件编码',
		labelAlign: 'right',
		style: 'margin:5px 0px 5px 5px',
		width: 240
	},{
		id: 'searchequipname',
		xtype: 'textfield',
		fieldLabel:'备件名称',
		labelAlign: 'right',
		style: 'margin:5px 0px 5px 5px',
		width: 240
	},{
		xtype : 'button',
		text : '查询',
		icon : imgpath + '/search.png',
		width : 100,
		handler : searchquery,
		style : {
			margin : '5px 0 5px 30px'
		}
	}
	]
});

var searchgrid = Ext.create("Ext.grid.Panel", {
	xtype : 'gridpanel',
	id : 'searchgrid',
	region : 'center',
	columnLines : true,
	title : '物料搜索',
	store : searchgridStore,
	autoScroll : true,
	height : 400,
	columns : [{
		text : '选择',
		dataIndex : '',
		align : 'center',
		labelAlign : 'right',
		width : 100,
		renderer : searchSelect
	},{
		text : '备件编码',
		dataIndex : 'MAT_NO',
		align : 'center',
		labelAlign : 'right',
		width : 100
	}, {
		text : '备件名称',
		dataIndex : 'MAT_DESC',
		align : 'center',
		width : 150
	}, {
		text : '计量单位',
		dataIndex : 'LTEXT',
		align : 'center',
		width : 120
	}, {
		text : '计划单价',
		dataIndex : 'PLAN_PRICE',
		align : 'center',
		width : 150
	}, {
		text : '规格型号',
		dataIndex : 'UNIT',
		align : 'center',
		width : 100
	}],
	bbar: ['->',{ xtype: 'pagingtoolbar',
		id:'pagingtoolbar',
		dock: 'bottom',
		displayInfo: true,
		displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
		emptyMsg: '没有记录',
		store: 'searchgridStore'  }
	]
});

var searchwindow = Ext.create('Ext.window.Window', {
	id : 'searchwindow',
	width : 800,
	height : 400,
	layout : 'border',
	title : '物料搜索',
	modal : true,
	frame : true,
	closeAction : 'hide',
	closable : true,
	items : [searchpanel,searchgrid]
});


var panel = Ext.create('Ext.form.Panel', {
	id : 'panel',
	style : 'margin:5px 0px 2px 2px',
	region : 'north',
	layout : 'vbox',
	width : '100%',
	style: 'background-color:#FFFFFF',
	baseCls: 'my-panel-no-border',
	items : [{
		xtype : 'panel',
		region : 'north',
		layout : 'column',
		baseCls: 'my-panel-no-border',
		items : [{ id: 'equipcode', xtype: 'textfield', fieldLabel:'备件编码',
			labelAlign: 'right', style: 'margin:5px 0px 5px 5px',
			width: 240
		},{
			id: 'equipname', xtype: 'textfield', fieldLabel:'备件名称',
			labelAlign: 'right', style: 'margin:5px 0px 5px 5px',width: 240
		}]
	}, {
		xtype : 'panel',
		region : 'north',
		layout : 'column',
		baseCls: 'my-panel-no-border',
		items : [{
			xtype : 'button',
			text : '查询',
			//icon : imgpath + '/search.png',
			width : 100,
			handler : wquery,
			style : {
				margin : '5px 0 5px 30px'
			}
		} ,
			{
				xtype : 'button',
				text : '导出Excel',
				width : 100,
				handler : OnButtonExportClicked,
				style : {
					margin : '5px 0px 5px 20px'
				}
			}]
	}]
});

var wgrid = Ext.create("Ext.grid.Panel", {
	xtype : 'gridpanel',
	id : 'wgrid',
	region : 'center',
	height : 400,
	columnLines : true,
	title : '重点备件表',
	store : wgridStore,
	selType : 'checkboxmodel',
	autoScroll : true,
	columns : [
		{
			text : '备件编码',
			dataIndex : 'MATERIALCODE',
			align : 'center',
			labelAlign : 'right',
			width : 100
		}, {
			text : '备件名称',
			dataIndex : 'MATERIALNAME',
			align : 'center',
			width : 150
		}, {
			text : '计量单位',
			dataIndex : 'UNIT',
			align : 'center',
			width : 120
		}, {
			text : '计划单价',
			dataIndex : 'F_PRICE',
			align : 'center',
			width : 150
		}, {
			text : '安装位置',
			dataIndex : '',
			align : 'center',
			width : 100,
			renderer : look
		}]
	,
	bbar: ['->',{ xtype: 'pagingtoolbar',
		id:'wpagingtoolbar',
		dock: 'bottom',
		displayInfo: true,
		displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
		emptyMsg: '没有记录',
		store: 'wgridStore'  }
	]
});

var egrid = Ext.create("Ext.grid.Panel", {
	xtype : 'gridpanel',
	id : 'egrid',
	region : 'east',
	columnLines : true,
	width : 600,
	height : 400,
	title : '备件安装位置字典',
	store : egridStore,
	split : true,
	collapsible : true,
	collapseMode : 'mini',
	hideCollapseTool : true,
	autoScroll : true,
	columns : [
		{
			text : '作业区',
			dataIndex : 'V_DEPTNAME',
			align : 'center',
			labelAlign : 'right',
			width : 100
		}, {
			text : '设备',
			dataIndex : 'EQU_DESC',
			align : 'center',
			width : 150
		}, {
			text : '安装位置',
			dataIndex : 'SITE_DESC',
			align : 'center',
			width : 120
		}, {
			text : '使用数量',
			dataIndex : 'BJ_AMOUNT',
			align : 'center',
			width : 150
		}]
	,
	bbar: ['->',{ xtype: 'pagingtoolbar',
		id:'epagingtoolbar',
		dock: 'bottom',
		displayInfo: true,
		displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
		emptyMsg: '没有记录',
		store: 'egridStore'  }
	]
});


Ext.onReady(function() {
	Ext.create('Ext.container.Viewport', {
		id : "id",
		layout : 'border',
		items : [ panel, wgrid,egrid]
	});
	wquery();

});

// 查询
function beforeload_wgridStore(store){
	//pg_run7134_GETBJLIST
	store.proxy.extraParams.a_mat_no = Ext.getCmp('equipcode').getValue();
	store.proxy.extraParams.a_mat_desc = Ext.getCmp('equipname').getValue();
}
function wquery() {
	Ext.data.StoreManager.lookup('wgridStore').load();
}
function beforeload_egridStore(store){
	//PG_RUN7134_GETSITELIST
	store.proxy.extraParams.a_mat_no = materialcode;
}
// 查询
function equery() {
	var seldata = Ext.getCmp('wgrid').getSelectionModel().getSelection();
	materialcode = seldata[0].data.MATERIALCODE;
	Ext.data.StoreManager.lookup('egridStore').load();
}
function beforeload_searchgridStore(store){
	//pg_run7134_getmatlist
	store.proxy.extraParams.a_mat_no = Ext.getCmp('searchequipcode').getValue();
	store.proxy.extraParams.a_mat_desc = Ext.getCmp('searchequipname').getValue();
}
//物料查询
function searchquery() {

	Ext.data.StoreManager.lookup('searchgridStore').load();
}

function RenderFontLeft(value, metaData) {
	metaData.style = 'text-align: left';
	value = value.split(' ')[0];
	return value;
}
//导出excel
function OnButtonExportClicked() {
	document.location.href=AppUrl + 'cjy/No7134EXCEL?a_mat_no='+Ext.getCmp('equipcode').getValue()+
		'&a_mat_desc='+Ext.getCmp('equipname').getValue();
	/*var tableName = ["备件编码", "备件名称", "计量单位", "计划价" ];
	var tableKey = [ 'MATERIALCODE', 'MATERIALNAME', 'UNIT', 'F_PRICE' ];

	var parName = [ 'A_MAT_NO', 'A_MAT_DESC' ];
	var parType = [ 's', 's', 's', 's' ];
	var parVal = [ excelCS(Ext.getCmp('equipcode').getValue()),
		excelCS(Ext.getCmp('equipname').getValue())];
	var proName = 'pg_run7134.GETBJLIST';
	var ExcelName = '重点备件字典设置';

	var cursorName = 'ret';
	var returnStr = [ 'null' ];
	var returnStrName = [ 'null' ];
	var returnStrType = [ 'null' ];


	submitData("ModelExcelTotal", tableName, tableKey, parName, parType,
		parVal, proName, returnStr, returnStrType, returnStrName,
		cursorName, "title", "重点备件字典设置");*/

}

function excelCS(str) {
	if(str==undefined) return 'null';
	if(str==null) return 'null';
	if(str=='') return 'null';
//	if(str=='%') return 'all';
	return str;
}

function onBtnAdd(){
	Ext.getCmp('bjbm').setValue('');
	Ext.getCmp('bjmc').setValue('');
	Ext.getCmp('ggxh').setValue('');
	Ext.getCmp('jldw').setValue('');
	Ext.getCmp('jhj').setValue('');
	addwindow.show();
}

function onBtnDel(){
	var seldata = Ext.getCmp('wgrid').getSelectionModel().getSelection();
	if (seldata.length == 0) {
		alert('请至少选择一条数据进行删除！');
		return false;
	}
	for ( var i = 0; i < seldata.length; i++){
		Ext.Ajax.request({
			url: APP + '/ModelChange',
			method: 'POST',
			params: {
				parName: ['A_MAT_NO'],
				parType: ['s'],
				parVal: [seldata[i].data.MATERIALCODE],
				proName: 'pg_run7134.deletebj',
				returnStr: ['ret_msg','ret'],
				returnStrType: ['s','s']
			},
			success: function (resp) {

			}
		});
	}
	wquery();
}

function look(){
	return '<div><a href="javascript:equery()">查看</a></div> '
}

function Select(){
	return '<div><a href="javascript:OnBtnSelect()">选择</a></div>';
}

function OnBtnSelect(){
	searchwindow.show();
}

function onBtnSave(){

	Ext.Ajax.request({
		url: APP + '/ModelChange',
		method: 'POST',
		params: {
			parName: ['A_MAT_NO','A_MAT_DESC','A_ETALON','A_UNIT','A_PRICE'],
			parType: ['s','s','s','s','s'],
			parVal: [Ext.getCmp('bjbm').getValue(),
				Ext.getCmp('bjmc').getValue(),
				Ext.getCmp('ggxh').getValue(),
				Ext.getCmp('jldw').getValue(),
				Ext.getCmp('jhj').getValue()],
			proName: 'pg_run7134.addbj',
			returnStr: ['ret_msg','ret'],
			returnStrType: ['s','s']
		},
		success: function (resp) {

		}
	});

	Ext.getCmp('addwindow').hide();
	wquery();
}

function searchSelect(){
	return '<div><a href="javascript:OnBtnSearchSelect()">选择</a></div>';
}

function OnBtnSearchSelect(){
	var seldata = Ext.getCmp('searchgrid').getSelectionModel().getSelection();
	Ext.getCmp('bjbm').setValue(seldata[0].data.MAT_NO);
	Ext.getCmp('bjmc').setValue(seldata[0].data.MAT_DESC);
	Ext.getCmp('ggxh').setValue(seldata[0].data.UNIT);
	Ext.getCmp('jldw').setValue(seldata[0].data.LTEXT);
	Ext.getCmp('jhj').setValue(seldata[0].data.PLAN_PRICE);
	Ext.getCmp('searchwindow').hide();
}