//作业区
var depart = '';
if (location.href.split('?')[1] != undefined) {
	depart = Ext.urlDecode(location.href.split('?')[1]).depart;
}
// 设备ID
var equid = '';
if (location.href.split('?')[1] != undefined) {
	equid = Ext.urlDecode(location.href.split('?')[1]).equid;
}
// 物资编码
var matcode = '';
if (location.href.split('?')[1] != undefined) {
	matcode = Ext.urlDecode(location.href.split('?')[1]).matcode;
}

// 物资编码
var wzbm = '';
if (location.href.split('?')[1] != undefined) {
	wzbm = Ext.urlDecode(location.href.split('?')[1]).wzbm;
}

// 物资名称
var wzmc = '';
if (location.href.split('?')[1] != undefined) {
	wzmc = Ext.urlDecode(location.href.split('?')[1]).wzmc;
}
var golid = '';
var materialcode = '';
var orderId = '';
var siteFlag = '';
// 设备选择STORE
var sbxzStore = Ext.create('Ext.data.Store', {
	autoLoad : false,
	storeId : 'sbxzStore',
	fields : [ 'EQU_DESC', 'EQU_ID' ],
	proxy : {
		type : 'ajax',
		async : false,
		url: AppUrl + 'cjy/pro_run7111_equlist',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		}
	}
});
var faultReasonData = [{CODE:'正常磨损',NAME:'正常磨损'}, {CODE:'质量问题',NAME:'质量问题'},{CODE:'其他',NAME:'其他'}];
var faultReasonStore = Ext.create('Ext.data.Store', {
	autoLoad : true,
	storeId : 'moneyTypeStore',
	fields : [ 'CODE', 'NAME' ],
	data : faultReasonData,
	proxy : {
		type : 'memory',
		render : {
			type : 'json'
		}
	}
});

var gzpalceStore = Ext.create('Ext.data.Store', {
	autoLoad : true,
	storeId : 'gzpalceStore',
	fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
	proxy : {
		type : 'ajax',
		async : false,
		url: AppUrl + 'No4120/PRO_PM_REPAIRDEPT_TODEPT',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		},
		extraParams : {
			V_REPAIRDEPTCODE:Ext.util.Cookies.get('v_deptcode'),
			V_PERSONCODE:Ext.util.Cookies.get('v_orgCode')
		}
	}
});

var siteStore = Ext.create('Ext.data.Store', {
	autoLoad : false,
	storeId : 'siteStore',
	fields : [ 'SITE_ID', 'SITE_DESC','BJ_AMOUNT','CHANGEDATE','INSERT_VALUE','BJ_UNIQUE_CODE' ],
	proxy : {
		type : 'ajax',
		async : false,
		url :AppUrl + 'cjy/PRO_RUN_SITE_BJ_ALL',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		}
	}
});
var supplyStore = Ext.create('Ext.data.Store', {
	autoLoad : false,
	storeId : 'supplyStore',
	fields : [ 'SUPPLY_CODE', 'SUPPLY_NAME' ],
	proxy : {
		type : 'ajax',
		async : false,
		url :AppUrl + 'cjy/pro_run7110_sitesupplylist',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		}
	}
});
var sbgrid = Ext.create('Ext.grid.Panel', {
	id : 'sbgrid',
	region : 'center',
	columnLines : true,
	width : '100%',
	store : {
		id : 'sbgridStore',
		autoLoad : false,
		fields : [ 'EQU_ID', 'EQU_DESC' ],
		proxy : {
			type : 'ajax',
			async : false,
			url :AppUrl + 'cjy/pro_run7111_equlist',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list',
				total : 'total'
			}
		},
		listeners : {
			beforeload : beforeloadStore
		}
	},
	autoScroll : true,
	selModel : {
		selType : 'checkboxmodel',
		mode : 'SINGLE'
	},
	height : 400,
	columns : [ {
		width : 150,
		dataIndex : 'EQU_ID',
		align : 'center',
		renderer : atleft,
		hidden : true
	}, {
		text : '设备名称',
		width : 150,
		dataIndex : 'EQU_DESC',
		align : 'center',
		renderer : atleft,
		flex : 1
	} ]
});
var changeSiteSearchPanel = Ext.create('Ext.panel.Panel', {
	style : 'margin:5px 0px 2px 2px',
	region : 'north',
//	baseCls : 'my-panel-no-border',
	defaults : {
		labelAlign : 'right'
	},
	id : 'changeSiteSearchPanel',
	width : '100%',
	layout : 'hbox',
	frame : true,
	items : [ {
		xtype : 'textfield',
		id : 'changeSiteEqusite',
		fieldLabel : '设备位置',
		labelWidth : 76,
		style : 'margin:5px 0px 0px 10px'
	}, {
		id : 'changeSiteEqusiteSearchBtn',
		xtype : 'button',
		text : '查询',
		width : 80,
		style : ' margin: 5px 0px 0px 10px',
		handler : changeSiteEqusiteSearch
	} ]
});

var refreshgrid = Ext.create('Ext.grid.Panel', {
	id : 'refreshgrid',
	region : 'center',
	columnLines : true,
	width : '100%',
	store : siteStore,
	autoScroll : true,
	selModel : {
		selType : 'checkboxmodel'
	},
	plugins : [ {
		ptype : 'cellediting',
		clicksToEdit : 1
	} ],
	listeners : {
		edit : function(editor, e) {
			e.record.commit();
		},
		'cellclick' : function(grid, rowIndex, columnIndex, e) {
			siteFlag = grid.getSelectionModel().getSelection()[0].index;
		}
	},
	columns : [ {
		text : '上传图片',
		width : 60,
		dataIndex : 'BJ_UNIQUE_CODE',
		align : 'center',
		renderer:function(value,metadata,record){
			if(value!='')
			{
				return '<div><a href="javascript:OnClickDeleteLink(\''+ value + '\')">上传</a></div>';
			}
			else{
				return null;
			}
		}
	},{
		text : '唯一标识',
		width : 100,
		dataIndex : 'UCODE',
		align : 'center',
		field : {
			xtype : 'textfield'
		}
	}, {
		text : '名称',
		width : 150,
		dataIndex : 'SITE_DESC',
		align : 'center',
		renderer : atleft,
		flex : 1
	}, {
		text : '上机时间',
		width : 100,
		dataIndex : 'CHANGEDATE',
		align : 'center',
		renderer : function(value){return value.split(' ')[0];},
		flex : 1
	}, {
		text : '运行时间(h)',
		width : 100,
		dataIndex : 'INSERT_VALUE',
		align : 'center',
		renderer : atleft,
		flex : 1
	}, {
		text : '更换数量',
		width : 60,
		dataIndex : 'BJ_AMOUNT',
		align : 'center',
		field : {
			xtype : 'numberfield',
			disabled :true
		}

	} ]
});

var equBarGrid = Ext.create('Ext.grid.Panel', {
	id : 'equBarGrid',
	region : 'center',
	columnLines : true,
	width : '100%',
	store : {
		id : 'equBarStore',
		autoLoad : false,
		fields : [ 'BARCODE', 'BARID' ],
		proxy : {
			type : 'ajax',
			async : false,
			url: AppUrl + 'cjy/pg_run7113_getordermatbarcode',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list',
				total : 'total'
			}
		},
		listeners : {
			beforeload : beforeGridStoreLoad
		}
	},
	autoScroll : true,

	listeners : {
		'cellclick' : function(grid, rowIndex, columnIndex, e) {
			if(Ext.data.StoreManager.lookup('siteStore').find('UCODE',e.data.BARCODE)>=0){
				Ext.Msg.alert('提示','该条码已被使用');
			}
			else{var rec = Ext.data.StoreManager.lookup('siteStore').getAt(
				siteFlag);
				rec.set('UCODE', e.data.BARCODE);
				rec.commit();
				siteFlag = '';
			}
		}
	},
	columns : [ {
		text : '唯一标识',
		width : 150,
		dataIndex : 'BARCODE',
		align : 'center',
		field : {
			xtype : 'textfield'
		}
	}, {
		text : '条码ID',
		width : 150,
		dataIndex : 'BARID',
		align : 'center',
		renderer : atleft,
		flex : 1
	} ]
});

var equBarSearchPanel = Ext.create('Ext.panel.Panel', {
	style : 'margin:5px 0px 2px 2px',
	region : 'north',
//	baseCls : 'my-panel-no-border',
	defaults : {
		labelAlign : 'right'
	},
	id : 'equBarSearchPanel',
	width : '100%',
	layout : 'hbox',
	frame : true,
	items : [ {
		xtype : 'textfield',
		id : 'equBarCode',
		fieldLabel : '条码',
		labelWidth : 50,
		width:100,
		style : 'margin:5px 0px 0px 5px'
	}, {
		xtype : 'textfield',
		id : 'equBarId',
		fieldLabel : '条码id',
		labelWidth : 50,
		width:100,
		style : 'margin:5px 0px 0px 5px',
		hidden:true
	}, {
		id : 'equBarSearchBtn',
		xtype : 'button',
		text : '查询',
		width : 60,
		style : ' margin: 5px 0px 0px 5px',
		handler : equBarSearch
	} ]
});
var changeSitePanel = Ext.create('Ext.panel.Panel', {
	style : 'margin:5px 0px 2px 2px',
	region : 'west',
	title:'备件安装位置表',
	//baseCls : 'my-panel-no-border',
	defaults : {
		labelAlign : 'right'
	},
	id : 'changeSitePanel',
	width : '60%',
	layout : 'border',
	frame : true,
	items : [ changeSiteSearchPanel, refreshgrid ]
});
var equBarPanel = Ext.create('Ext.panel.Panel', {
	style : 'margin:5px 0px 2px 2px',
	region : 'east',
	title:'出库条件表',
	//baseCls : 'my-panel-no-border',
	defaults : {
		labelAlign : 'right'
	},
	id : 'equBarPanel',
	width : '40%',
	layout : 'border',
	frame : true,
	items : [ equBarSearchPanel, equBarGrid ]
});
var change_op_panel = Ext.create('Ext.panel.Panel', {
	style : 'margin:5px 0px 2px 2px',
	region : 'north',
	title:'操作面板',
	defaults : {
		labelAlign : 'right'
	},
	id : 'change_op_panel',
	height:100,
	layout : 'column',
	frame : true,
	items : [{
		xtype : 'combo',
		id : 'supply',
		store : supplyStore,
		editable : false,
		queryMode : 'local',
		fieldLabel : '供应商',
		displayField : 'SUPPLY_NAME',
		valueField : 'SUPPLY_CODE',
		hidden:true,
		labelWidth : 70,
		width : 200,
		style : ' margin: 5px 0px 5px 10px'
	}, {
		xtype : 'datefield',
		fieldLabel : '更换日期',
		id : 'changeDate',
		format : 'Y/m/d',
		editable : false,
		labelWidth : 70,
		width : 200,
		style : ' margin: 5px 0px 5px 10px'
	},{
		xtype : 'combo',
		id : 'faultReason',
		store : faultReasonStore,
		editable : false,
		queryMode : 'local',
		fieldLabel : '故障原因',
		displayField : 'NAME',
		valueField : 'CODE',
		labelWidth : 70,
		width : 200,
		value:'正常磨损',
		style : ' margin: 5px 0px 5px 10px'
	}, {
		xtype : 'textfield',
		id : "gzsm",
		fieldLabel : '更换备件评价',
		emptyText : '请输入对更换备件的评价内容',
		labelWidth : 100,
		width : 620,
		style : ' margin: 5px 0px 5px 10px'
	}]
});
var refreshWin = Ext.create('Ext.window.Window', {
	width : 800,
	height : 500,
	title : '位置选择',
	layout : 'border',
	id : 'refreshWin',
	closeAction : 'hide',
	items : [change_op_panel,changeSitePanel,equBarPanel],
	buttons : [{
		id : 'changeBtn',
		xtype : 'button',
		text : '确定更换',
		style : ' margin: 5px 0px 0px 10px',
		width : 80,
		handler : siteChange
	},{
		text : '取 消',
		handler : function() {
			Ext.getCmp('refreshWin').hide();
		}
	}]
});


var sbQueryPanel = Ext.create('Ext.panel.Panel', {
	style : 'margin:5px 0px 2px 2px',
	region : 'north',
	defaults : {
		labelAlign : 'right'
	},
	id : 'sbQueryPanel',
	width : '100%',
	layout : 'hbox',
	frame : true,
	items : [ {
		xtype : 'textfield',
		id : 'sbname',
		fieldLabel : '设备名称',
		labelWidth : 76,
		style : 'margin:5px 0px 0px 10px'
	}, {
		id : 'sbquerybtn',
		xtype : 'button',
		text : '查询',
		width : 80,
		style : ' margin: 5px 0px 0px 10px',
		handler : sbquery
	} ]
});
var sbqueryWin = Ext.create('Ext.window.Window', {
	width : 430,
	height : 330,
	title : '设备选择',
	layout : 'border',
	id : 'sbqueryWin',
	closeAction : 'hide',
	modal : true,
	items : [ sbQueryPanel, sbgrid ],
	buttons : [ {
		text : '确 定',
		icon : imgpath + '/saved.png',
		handler : setsbname
	}, {
		text : '取 消',
		handler : function() {
			Ext.getCmp('sbqueryWin').hide();
		}
	} ]
});

var month = new Date().getMonth() + 1;
var panel = Ext.create('Ext.panel.Panel', {
	id : 'panellow',
	width : '100%',
	title : '工单备件更换管理',
	region : 'north',
	frame : true,
	layout : {
		type : 'vbox'
	},
	items : [ {
		xtype : 'panel',
		width : '100%',
		style: 'background-color:#FFFFFF',
		baseCls: 'my-panel-no-border',
		bodyBorder : false,
		layout : 'column',
		frame : true,
		items : [ {
			xtype : 'combo',
			id : "zyq",
			store : gzpalceStore,
			editable : false,
			readOnly : true,
			queryMode : 'local',
			fieldLabel : '作业区',
			displayField : 'V_DEPTNAME',
			valueField : 'V_DEPTCODE',
			labelWidth : 70,
			width : 200,
			style : ' margin: 5px 0px 5px 10px',
			labelAlign : 'right'
		}, {
			xtype : 'combo',
			id : "selEqu",
			store : Ext.data.StoreManager.lookup('sbxzStore'),
			editable : false,
			queryMode : 'local',
			fieldLabel : '设备',
			displayField : 'EQU_DESC',
			valueField : 'EQU_ID',
			labelWidth : 70,
			width : 200,
			style : ' margin: 5px 0px 5px 10px',
			labelAlign : 'right'
		}, {
			xtype : 'button',
			text : '设备查询',
			width : 80,
			style : ' margin: 5px 0px 0px 10px',
			handler : loadwinGridStore
		}, {
			xtype : 'textfield',
			id : "mCode",
			value : wzbm,
			labelWidth : 70,
			width : 200,
			fieldLabel : '物资编码',
			style : ' margin: 5px 0px 5px 10px',
			emptyText : '请输入物资编码'
		}, {
			xtype : 'textfield',
			id : "mName",
			value : wzmc,
			labelWidth : 70,
			width : 200,
			fieldLabel : '物资名称',
			style : ' margin: 5px 0px 5px 10px',
			emptyText : '请输入物资名称'
		}, {
			xtype : 'button',
			text : '查询',
			icon : imgpath + '/search.png',
			width : 80,
			style : ' margin: 5px 0px 0px 10px',
			handler : loadGridStore
		}, {
			id : 'delete',
			xtype : 'button',
			text : '导出Excel',
			style : ' margin: 5px 0px 0px 10px',
			width : 80,
			handler : OnButtonExportClicked
		} ]
	},{
		xtype : 'panel',
		style: 'background-color:#FFFFFF',
		baseCls: 'my-panel-no-border',
		bodyBorder : false,
		layout : 'column',
		defaults : {
			style : ' margin: 5px 0px 5px 10px',
			labelAlign : 'right'
		},
		width : '100%',
		frame : true,
		items : [{
			id : 'refresh',
			xtype : 'button',
			text : '更换',
			style : ' margin: 5px 0px 5px 10px',
			width : 80,
			handler : refresh
		}]
	}]
});

var grid = Ext.create('Ext.grid.Panel',{
	id : 'grid',
	region : 'center',
	columnLines : true,
	width : '100%',
	store : {
		id : 'gridStore',
		autoLoad : false,
		fields : [ 'I_ID', 'V_ORDERGUID', 'V_ORDERID','V_MATERIALCODE', 'V_MATERIALNAME', 'V_UNIT','I_ACTUALAMOUNT', 'D_FACT_FINISH_DATE','V_SHORT_TXT', 'CHANGE_STIEID','V_EQUIP_NO', 'OP_USERID', 'OP_USERNAME','V_DEPTCODE', 'V_WORK_AREA', 'D_DATE_EDITTIME' ],
		proxy : {
			type : 'ajax',
			async : false,
			url: AppUrl + 'cjy/pro_run7113_ordermatlist',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list',
				total : 'total'
			}
		},
		listeners : {
			beforeload : beforeloadStore
		}
	},
	autoScroll : true,
	selModel : {
		selType : 'checkboxmodel',
		mode : 'SINGLE'
	},
	height : 400,
	columns : [{
		xtype : 'rownumberer',
		text : '序号',
		width : 35,
		sortable : false
	},
		{
			text : '工单号',
			width : 150,
			dataIndex : 'V_ORDERID',
			align : 'center',
			renderer : atleft
		},
		{
			text : '物料编码',
			width : 150,
			dataIndex : 'V_MATERIALCODE',
			align : 'center',
			renderer : atleft
		},
		{
			text : '物料名称',
			width : 400,
			dataIndex : 'V_MATERIALNAME',
			align : 'center',
			renderer : atleft
		},
		{
			text : '计量单位',
			width : 90,
			dataIndex : 'V_UNIT',
			align : 'center',
			renderer : atleft
		},
		{
			text : '使用数量',
			width : 80,
			dataIndex : 'I_ACTUALAMOUNT',
			align : 'center'
		},
		{
			text : '工单结束日期',
			width : 150,
			dataIndex : 'D_FACT_FINISH_DATE',
			align : 'center'
		},
		{
			text : '工单描述',
			flex : 1,
			dataIndex : 'V_SHORT_TXT',
			align : 'center',
			renderer : atleft
		}
	]
});

//上传图片///////////////////////////
// 录入窗体
var rrwidow = Ext.create('Ext.window.Window',{
	title : '填写检查内容',
	height : 300,
	width : 400,
	layout : 'vbox',
	closeAction : 'hide',
	autoShow : false,
	modal : true,
	id : 'rrwidow',
	closeAction : 'hide',
	items : [{
		xtype : 'textfield',
		id : 'jcnr',
		width : 300,
		fieldLabel : '检查内容',
		labelAlign : 'left',
		labelWidth : 80,
		style : 'margin: 5px 0px 0px 10px'
	},{
		xtype : 'form',
		layout : 'column',
		baseCls : 'my-panel-no-border',
		frame : true,
		width : '100%',
		items : [{
			xtype : 'filefield',
			id : 'upload',
			name : 'upload',
			width : 300,
			msgTarget : 'side',
			allowBlank : true,
			anchor : '100%',
			buttonText : '浏览....',
			style : ' margin: 5px 0px 0px 10px'
		},
			{
				xtype : 'button',
				width : 60,
				text : '保存记录',
				style : ' margin: 5px 0px 0px 10px',
				handler : function() {
					if (Ext.getCmp('jcnr').getValue() == '') {
						Ext.example.msg('操作信息','{0}','请填写检查内容!');
					} else {
						if (Ext.getCmp('upload').getValue() != null|| Ext.getCmp('upload').getValue() != "") {
							var form = this.up('form').getForm();
							form.submit({url : APP+ '/uploadImageFile',
								async : false,
								waitMsg : '上传中...',
								params : {
									checktime : Ext.Date.format(Ext.getCmp('changeDate').getValue(),'Y-m-d'),
									checkcount : Ext.getCmp('jcnr').getValue(),
									bjcode : Ext.getCmp('refreshgrid').getSelectionModel().getSelection()[0].data.BJ_UNIQUE_CODE,
									usercode : Ext.util.Cookies.get('v_personcode'),
									uesrname : Ext.util.Cookies.get('v_personname2'),
									tagid : '-',
									siteid : Ext.getCmp('refreshgrid').getSelectionModel().getSelection()[0].data.SITE_ID,
									tagdesc : 0,
									tagunit : Ext.getCmp('refreshgrid').getSelectionModel().getSelection()[0].data.BJ_UNIQUE_CODE
								},
								success : function(resp) {
									Ext.example.msg('提示信息','保存成功！');
									Ext.getCmp('win1').rrwidow();
								},
								failure : function(form,action) {
									Ext.example.msg('提示信息','保存失败！');
								}
							});
						}
					}
				}
			} ]
	}

	]
});
/////////////////////////////////////				
Ext.onReady(function() {
	Ext.create('Ext.container.Viewport', {
		id : "id",
		layout : 'border',
		items : [ panel, grid ]
	});
	Ext.data.StoreManager.lookup('gzpalceStore').on('load',function() {
		if (depart == '') {
			Ext.getCmp('zyq').select(
				Ext.data.StoreManager.lookup(
					'gzpalceStore').getAt(0));
		} else {
			Ext.getCmp('zyq').select(depart);
		}
		// 默认当前登录用户工作区
		var storeLength = Ext.data.StoreManager
			.lookup('gzpalceStore').data.length;
		for ( var index = 0; index < storeLength; index++) {
			var storeItemData = Ext.data.StoreManager
				.lookup('gzpalceStore').data.items[index].data;
			if (storeItemData.V_DEPTCODE == Ext.util.Cookies
					.get('v_deptcode')) {
				Ext.getCmp("zyq").setValue(
					Ext.util.Cookies
						.get('v_deptcode'));
				break;
			}
		}
		Ext.data.StoreManager.lookup('sbxzStore').load({
			params : {
				v_v_plantcode:Ext.util.Cookies.get('v_orgCode'),
				v_v_deptcode:Ext.getCmp('zyq').getValue()
			}
		});
	});
	sbxzStore.on('load', function(me) {
		if(equid==''){
			Ext.getCmp('selEqu').select(me.first());
		}
		else{
			Ext.getCmp('selEqu').select(equid);
		}
		loadGridStore();
	});

	Ext.getCmp('zyq').on('select',function() {
		Ext.data.StoreManager.lookup('sbxzStore').load(
			{
				params : {
					v_v_plantcode:Ext.util.Cookies.get('v_orgCode'),
					v_v_deptcode:Ext.getCmp('zyq').getValue()
				}
			});
	});



	supplyStore.on('load', function() {
		Ext.getCmp('supply').select(supplyStore.getAt(0));
	});
	Ext.data.StoreManager.lookup('equBarStore').on("load", onEquBarLoad);


});


function refresh() {
	var Selection = Ext.getCmp('grid').getSelectionModel().getSelection();
	if (Selection.length == 0) {
		Ext.Msg.alert('提示', '请选择一条记录');
		return;
	}
	if (Selection.length > 1) {
		Ext.Msg.alert('提示', '只能选择一条记录');
		return;
	}
	Ext.getCmp('refreshWin').show();

	materialcode = Selection[0].data.V_MATERIALCODE;
	orderId = Selection[0].data.V_ORDERID;
	golid = Selection[0].data.I_ID;
	Ext.data.StoreManager.lookup('siteStore').load({
		params : {
			IN_EQUID:Ext.getCmp('selEqu').getValue(),
			IN_PLANT:Ext.util.Cookies.get('v_orgCode'),
			IN_DEPART:Ext.getCmp('zyq').getValue(),
			IN_STATUS:'%',
			IN_BJCODE:materialcode,
			IN_BJDESC:'%'
		}
	});
	Ext.data.StoreManager.lookup('equBarStore').load();

	Ext.getCmp('changeDate').setValue(Selection[0].data.D_FACT_FINISH_DATE.split(' ')[0]);

	Ext.data.StoreManager.lookup('supplyStore').load({
		params : {
			a_id:golid,
			a_materailcode:materialcode,
			a_orderid:orderId
		}
	});
}
// 确定更换
function siteChange() {
	var data = Ext.getCmp('refreshgrid').getSelectionModel().getSelection();
	if (data.length == 0) {
		Ext.Msg.alert('提示', '请选择一条记录');
		return;
	} else {
		for ( var i = 0; i < data.length; i++) {

			var ucode = data[i].data.UCODE;
			var change_amount = data[i].data.BJ_AMOUNT;
			Ext.Ajax.request({
				url: AppUrl + 'cjy/pro_run7113_changeordermat',
				async: false,
				method: 'POST',
				params: {
					A_ID: golid,
					SITE_ID: data[i].data.SITE_ID,
					a_change_amount: change_amount,
					V_EQUIP_NO: Ext.getCmp('selEqu').getValue(),
					USERID: Ext.util.Cookies.get('v_personcode'),

					USERNAME: Ext.util.Cookies.get('v_personname'),
					PLANTCODE: Ext.util.Cookies.get('v_orgCode'),
					WORKAREA: Ext.getCmp('zyq').getValue(),
					CHANGETIME: Ext.util.Format.date(data.D_DATE_EDITTIME,"YYYY-mm-dd HH:ii:ss"),
					V_MATERIALCODE: materialcode,

					a_supplycode: Ext.getCmp('supply').getValue(),
					a_supplyname: Ext.getCmp('supply').getRawValue(),
					a_uniquecode: ucode,
					a_replacedate: Ext.getCmp('changeDate').getValue() == null ? "": Ext.Date.format(Ext.getCmp('changeDate').getValue(), 'Y-m-d'),
					a_faultreason: Ext.getCmp("faultReason").getValue(),

					A_REASON_REMARK: Ext.getCmp('gzsm').getValue()
				},
				success: function (ret) {
					var resp = Ext.JSON.decode(ret.responseText);
					if(resp.RET=="success"){
						Ext.Msg.alert('提示', '操作成功');
						loadGridStore();
						Ext.getCmp('refreshWin').hide();
					}else {
						Ext.Msg.alert('提示', '操作失败:'+resp);
					}
				}
			});
		}
	}
}

function OnClickDeleteLink() {
	var data = Ext.getCmp('grid').getSelectionModel().getSelection()[0].data;
	Ext.Ajax.request({
		url: AppUrl + 'cjy/pro_run7113_changecancel',
		async: false,
		method: 'POST',
		params: {
			V_I_ID: data.I_ID,
			V_SITE_ID: data.CHANGE_STIEID,
			V_EQUIP_NO: data.V_EQUIP_NO,
			V_USERID: data.V_WORK_AREA,
			V_USERNAME: data.V_DEPTCODE,

			V_PLANTCODE: data.OP_USERID,
			V_DEPARTCODE: data.OP_USERNAME,
			V_CHANGETIME: Ext.util.Format.date(data.D_DATE_EDITTIME,"YYYY-mm-dd HH:ii:ss")
		},
		success: function (ret) {
			var resp = Ext.JSON.decode(ret.responseText);
			if(resp.RET=="success"){
				Ext.Msg.alert('提示', '操作成功');
				loadGridStore();
			}
		}
	});
}

function OnButtonExportClicked() {

	document.location.href=AppUrl + 'cjy/No7113EXCEL?v_dept_code='+Ext.getCmp('zyq').getValue()+
		'&v_equip_code='+Ext.getCmp('selEqu').getValue()+
		'&v_materialcode='+Ext.getCmp('mCode').getValue()+
		'&v_materialname='+Ext.getCmp('mName').getValue();
	/*var tableName = [ "工单号", " 物料编码", "物料名称", "计量单位", "使用数量", "工单结束日期", "工单描述" ];
	var tableKey = [ 'V_ORDERID', 'V_MATERIALCODE', 'V_MATERIALNAME', 'V_UNIT','I_ACTUALAMOUNT', 'D_FACT_FINISH_DATE', 'V_SHORT_TXT' ];
	var parName = [ 'V_DEPT_CODE', 'V_EQUIP_CODE', 'V_MATERIALCODE','V_MATERIALNAME' ];
	var parType = [ 's', 's', 's', 's' ];
	var parVal = [ Ext.getCmp("zyq").getValue(),
		Ext.getCmp("selEqu").getValue(),
		Ext.getCmp("mCode").getValue(),
		Ext.getCmp("mName").getValue()];
	var proName = 'pro_run7113_ordermatlist';
	var ExcelName = 'Excel';
	var cursorName = 'content_cursor';
	location.href = "ModelExcelBZ?" +"tableName=" + tableName.join(",") + "&tableKey=" + tableKey.join(",")
		+ "&parName=" + parName.join(",") + "&parType=" + parType.join(",")
		+ "&parVal=" + parVal.join(",") + "&proName=" + proName
		+ "&ExcelName=" + ExcelName + "";*/
}

function loadGridStore() {
	Ext.data.StoreManager.lookup('gridStore').load({
		params : {
			v_dept_code: Ext.getCmp("zyq").getValue(),
			v_equip_code: Ext.getCmp("selEqu").getValue(),
			v_materialcode: Ext.getCmp("mCode").getValue(),
			v_materialname: Ext.getCmp("mName").getValue()
		}
	});
}

var filter = function(record, id) {
	var sbname = Ext.getCmp('sbname').getValue();
	if (sbname == '' || sbname == null) {
		return true;
	} else {
		if (record.get("EQU_DESC")
			&& record.get("EQU_DESC").indexOf(sbname) >= 0)
			return true;
		else
			return false;
	}
};

var onStoreLoad = function(store, records, options) {
	store.filterBy(filter);
};

function loadwinGridStore() {
	Ext.data.StoreManager.lookup('sbgridStore').load(
		{
			params : {
				v_v_plantcode:Ext.util.Cookies.get('v_orgCode'),
				v_v_deptcode:Ext.getCmp('zyq').getValue()
			}
		});

	Ext.data.StoreManager.lookup('sbgridStore').on("load", onStoreLoad);

	sbqueryWin.show();
}
function beforeloadStore(store) {}
function atleft(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return value;
}
function setsbname() {
	var data = Ext.getCmp('sbgrid').getSelectionModel().getSelection()[0].data;
	Ext.data.StoreManager.lookup('sbxzStore').load(
		{
			params : {
				v_v_plantcode:Ext.util.Cookies.get('v_orgCode'),
				v_v_deptcode:Ext.getCmp('zyq').getValue()
			}
		});
	sbxzStore.on('load', function() {
		Ext.getCmp('selEqu').select(data.EQU_ID);
	});
	Ext.getCmp('sbqueryWin').hide();
}
function sbquery() {
	Ext.data.StoreManager.lookup('sbgridStore').load(
		{
			params : {
				v_v_plantcode:Ext.util.Cookies.get('v_orgCode'),
				v_v_deptcode:Ext.getCmp('zyq').getValue()
			}
		});
	Ext.data.StoreManager.lookup('sbgridStore').on("load", onStoreLoad);
}

function beforeGridStoreLoad(store) {
	store.proxy.extraParams.a_orderid = orderId;
	store.proxy.extraParams.a_materialcode =materialcode;
}

function equBarSearch() {
	Ext.data.StoreManager.lookup('equBarStore').load();

}
var onEquBarLoad = function(store, records, options) {
	store.filterBy(equBarFilter);
};
var equBarFilter = function(record, id) {
	var equBarCode = Ext.getCmp('equBarCode').getValue();
	var equBarId = Ext.getCmp('equBarId').getValue();
	if ((equBarCode == '' || equBarCode == null)&& (equBarId == '' || equBarId == null)) {
		return true;
	} else if (equBarCode != '' && equBarId == '') {
		if (record.get("BARCODE")&& record.get("BARCODE").indexOf(equBarCode) >= 0)
			return true;
		else
			return false;
	} else if (equBarId != '' && equBarCode == '') {
		if (record.get("BARID") && record.get("BARID").indexOf(equBarId) >= 0)
			return true;
		else
			return false;
	} else {
		if (record.get("BARCODE")&& record.get("BARCODE").indexOf(equBarCode) >= 0
			&& record.get("BARID")&& record.get("BARID").indexOf(equBarId) >= 0)
			return true;
		else
			return false;
	}
};

function changeSiteEqusiteSearch() {
	var Selection = Ext.getCmp('grid').getSelectionModel().getSelection();
	var materialcode = Selection[0].data.V_MATERIALCODE;
	Ext.data.StoreManager.lookup('siteStore').load(
		{
			params : {
				parVal : [ Ext.getCmp('selEqu').getValue(), Ext.util.Cookies.get('v_orgCode'), Ext.getCmp('zyq').getValue(), '%', materialcode, '%']
			}

		});
	Ext.data.StoreManager.lookup('siteStore').on("load",
		onChangeSiteEqusiteStoreLoad);
}
var changeSiteEqusiteFilter = function(record, id) {
	var changeSiteEqusite = Ext.getCmp('changeSiteEqusite').getValue();
	if (changeSiteEqusite == '' || changeSiteEqusite == null) {
		return true;
	} else {
		if (record.get("SITE_DESC")&&record.get("SITE_DESC").indexOf(changeSiteEqusite) >= 0)
			return true;
		else
			return false;
	}
};

var onChangeSiteEqusiteStoreLoad = function(store, records, options) {
	store.filterBy(changeSiteEqusiteFilter);
};

function OnClickDeleteLink() {
	Ext.getCmp('jcnr').setValue(Ext.getCmp("faultReason").getValue());
	Ext.getCmp('rrwidow').show();
}