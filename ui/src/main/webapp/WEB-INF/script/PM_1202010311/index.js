var SITE_ID = '';
if (location.href.split('?')[1] != null) {
	SITE_ID = Ext.urlDecode(location.href.split('?')[1]).SITE_ID;
}
var ckStore = Ext.create('Ext.data.Store', {
	autoLoad : false,
	storeId : 'ckStore',
	fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
	proxy : {
		type : 'ajax',
		async : false,
		url : AppUrl + 'PM_12/PRO_BASE_DEPT_VIEW',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		}
	}
});

var zyqStore = Ext.create('Ext.data.Store', {
	autoLoad : false,
	storeId : 'zyqStore',
	fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
	proxy : {
		type : 'ajax',
		async : false,
		url : AppUrl + 'PM_12/PRO_BASE_DEPT_VIEW',
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
		url : AppUrl + 'PM_12/PRO_RUN7110_SITESUPPLYLIST',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		}
	}
});
var cycletypeStore = Ext.create('Ext.data.Store', {
	autoLoad : true,
	storeId : 'cycletypeStore',
	fields : [ 'CYCLE_ID', 'CYCLE_DESC' ],
	proxy : {
		type : 'ajax',
		async : false,
		url : AppUrl + 'PM_12/PRO_RUN_CYCLE_ABLE',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		},
		extraParams : {
			parVal : []
		}
	}
});
var gridStore = Ext.create("Ext.data.Store", {
	autoLoad : false,
	storeId : 'gridStore',
	pageSize : 100,
	fields : [ 'CHANGEDATE_S', 'CHANGEDATE_D', 'EQU_DESC', 'MATERIALCODE',
			'MATERIALNAME', 'REMARK', 'SITE_DESC', 'SUPPLY_NAME', 'S_DAY',
			'WORK_TIEM','BJ_UNQIUE_CODE','ORDERID_S','ORDERID_D','BJ_UNIQUE_CODE','CHANGE_AMOUNT' ],
	proxy : {
		type : 'ajax',
		async : false,
		url : AppUrl + 'PM_12/PRO_RUN7130_SELECTBJTIME',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		}
	},
	listeners: {
        beforeload:loadgridStore
    }
});

var creatpanel = Ext.create('Ext.form.Panel', {
	id : 'creatpanel',
	style : 'margin:5px 0px 2px 2px',
	region : 'north',
	width : '100%',
	frame : true,
	defaults : {
		// style : 'margin:5px 0px 5px 10px',
		labelAlign : 'right'
	},
	layout : {
		type : 'vbox'
	},
	items : [
			{
				xtype : 'panel',
				layout : 'column',
				baseCls : 'my-panel-noborder',
				width : '100%',
				items : [ {
					xtype : 'combo',
					id : 'ck',
					store : 'ckStore',
					labelAlign : 'right',
					fieldLabel : '厂矿 ',
					editable : false,
					style : 'margin:5px 0px 5px 5px',
					labelWidth : 80,
					queryMode : 'local',
					valueField : 'V_DEPTCODE',
					displayField : 'V_DEPTNAME'
				}, {
					xtype : 'combo',
					id : 'zyq',
					store : 'zyqStore',
					labelAlign : 'right',
					fieldLabel : '作业区 ',
					editable : false,
					style : 'margin:5px 0px 5px 5px',
					labelWidth : 60,
					queryMode : 'local',
					valueField : 'V_DEPTCODE',
					displayField : 'V_DEPTNAME'
				}, {
					xtype : 'combo',
					labelWidth : 80,
					id : 'supply',
					store : supplyStore,
					editable : false,
					queryMode : 'local',
					fieldLabel : '供应商',
					displayField : 'SUPPLY_NAME',
					valueField : 'SUPPLY_CODE',
					style : ' margin: 5px 0px 0px 5px',
					labelAlign : 'right'
				}, {
					xtype : 'textfield',
					fieldLabel : '物料描述',
					id : 'wlms',
					emptyText : '请输入物料描述',
					labelAlign : 'right',
					labelWidth : 90,
					style : ' margin: 5px 0px 0px 5px'
				} ]
			},
			{
				xtype : 'panel',
				layout : 'column',
				baseCls : 'my-panel-noborder',
				width : '100%',
				items : [
						{
							xtype : 'datefield',
							format : 'Y/m/d',
							labelAlign : 'right',
							fieldLabel : '起始日期',
							labelWidth : 80,
							id : 'startTime',
							editable : false,
							value : new Date(new Date().getFullYear(),
									new Date().getMonth(), 1),
							style : 'margin: 5px 0px 5px 5px'
						}, {
							xtype : 'datefield',
							format : 'Y/m/d',
							fieldLabel : '结束日期',
							labelAlign : 'left',
							labelWidth : 60,
							id : 'endTime',
						    editable : false,
							value : Ext.Date.getLastDateOfMonth(new Date()),
							style : 'margin: 5px 0px 5px 5px'
						}, {
							xtype : 'combo',
							labelWidth : 80,
							id : 'cycletype',
							store : cycletypeStore,
							editable : false,
							queryMode : 'local',
							fieldLabel : '周期类型',
							displayField : 'CYCLE_DESC',
							valueField : 'CYCLE_ID',
							style : ' margin: 5px 0px 0px 5px',
							labelAlign : 'right'
						}, {
							xtype : 'button',
							text : '查询',
							icon : imgpath + '/search.png',
							width : 80,
							handler : query,
							style : ' margin: 5px 0px 0px 30px'
						}, {
							xtype : 'button',
							text : '导出Excel',
							icon : imgpath + '/grid.png',
							width : 100,
							handler : OnButtonExportClicked,
							style : ' margin: 5px 0px 0px 30px'
						} ]
			} ]
});
var grid = Ext.create("Ext.grid.Panel", {
	xtype : 'gridpanel',
	id : 'grid',
	region : 'center',
	columnLines : true,
	width : '100%',
	store : gridStore,
	autoScroll : true,
	height : 400,
	columns : [ {
		text : '安装工单 ',
		dataIndex : 'ORDERID_S',
		align : 'center',
		width : 80,
		renderer : RenderFontLeft
	}, {
		text : '换下工单',
		dataIndex : 'ORDERID_D',
		align : 'center',
		labelAlign : 'right',
		width : 80,
		renderer : RenderFontLeft
	},{
		text : '安装日期 ',
		dataIndex : 'CHANGEDATE_S',
		align : 'center',
		width : 100,
		renderer : RenderFontLeft
	},{
		text : '更换数量 ',
		dataIndex : 'CHANGE_AMOUNT',
		align : 'center',
		width : 80
	}, {
		text : '换下日期',
		dataIndex : 'CHANGEDATE_D',
		align : 'center',
		labelAlign : 'right',
		width : 100,
		renderer : RenderFontLeft
	}, {
		text : '安装天数',
		dataIndex : 'S_DAY',
		align : 'center',
		width : 80
	}, {
		text : '备件安装位置 ',
		dataIndex : 'SITE_DESC',
		align : 'center',
		width : 100,
		renderer : RenderFontLeft
	}, {
		text : '设备 ',
		dataIndex : 'EQU_DESC',
		align : 'center',
		width : 100,
		renderer : RenderFontLeft
	}, {
		text : '供应商 ',
		dataIndex : 'SUPPLY_NAME',
		align : 'center',
		width : 80,
		renderer : RenderFontLeft
	}, {
		text : '物资编码 ',
		dataIndex : 'MATERIALCODE',
		align : 'center',
		width : 80,
		renderer : RenderFontLeft
	}, {
		text : '物资描述 ',
		dataIndex : 'MATERIALNAME',
		align : 'center',
		width : 100,
		renderer : RenderFontLeft
	}, {
		text : '累计作业量 ',
		dataIndex : 'WORK_TIEM',
		align : 'center',
		width : 80
	}, {
		text : '备注 ',
		dataIndex : 'REMARK',
		align : 'center',
		width : 150,
		renderer : RenderFontLeft
	}, {
		text : '唯一码',
		dataIndex : 'BJ_UNIQUE_CODE',
		align : 'center',
		width : 150,
		renderer : RenderFontLeft
	} ],
	bbar : [ '->', {
		xtype : 'pagingtoolbar',
		dock : 'bottom',
		displayInfo : true,
		displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
		emptyMsg : '没有记录',
		store : 'gridStore'
	} ]
});
Ext.onReady(function() {
	Ext.create('Ext.container.Viewport', {
		id : "id",
		layout : 'border',
		items : [ creatpanel, grid ]
	});
	Ext.data.StoreManager.lookup('ckStore').load({
		params : {
			IS_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
			IS_V_DEPTTYPE:'[基层单位]'
		}
	});
	Ext.data.StoreManager.lookup('ckStore').on('load',function() {
		Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
		Ext.data.StoreManager.lookup('zyqStore').load({
			params : {
				IS_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
				IS_V_DEPTTYPE:'[主体作业区]'
			}
		});
	});
	Ext.data.StoreManager.lookup('supplyStore').on('load', function() {
		Ext.getCmp('supply').store.insert(0, {
			'SUPPLY_CODE' : '%',
			'SUPPLY_NAME' : '全部'
		});
		Ext.getCmp('supply').select(Ext.data.StoreManager.lookup('supplyStore').getAt(0));
		Ext.data.StoreManager.lookup('cycletypeStore').load();
	});
	Ext.data.StoreManager.lookup('zyqStore').on('load',function() {
	      //Ext.getCmp('zyq').store.insert(0, {
			//		'V_DEPTCODE' : '%',
			//		'V_DEPTNAME' : '全部'
			//	});
	      Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
		  Ext.data.StoreManager.lookup('supplyStore').load({
			params : {
				//V_ID:SITE_ID
				A_ID:'',
				A_MATERIALCODE:'',
				A_ORDERID:''
			}
		});
	});
	Ext.data.StoreManager.lookup('cycletypeStore').on('load',function() {
	    Ext.getCmp('cycletype').select(Ext.data.StoreManager.lookup('cycletypeStore').getAt(0));
	    query();
	});
});
// 查询
function query() {
	Ext.data.StoreManager.lookup('gridStore').load();
}
function RenderFontLeft(value, metaData) {
	metaData.style = 'text-align: left';
	return value;
}
function OnButtonExportClicked() {
	document.location.href=AppUrl + 'excel/BJSMTJ_EXCEL?V_PLANTCODE='+Ext.getCmp('ck').getValue()+
	'&V_DEPARTCODE='+encodeURI(Ext.getCmp('zyq').getValue())+
	'&V_SUPPLY_CODE='+encodeURI(Ext.getCmp('supply').getValue())+
	'&V_MATERIALNAME='+Ext.getCmp('wlms').getValue()+
	'&D_BEGIN_DATE='+Ext.util.Format.date(Ext.getCmp('startTime').getValue(), 'Y-m-d')+
	'&D_END_DATE='+Ext.util.Format.date(Ext.getCmp('endTime').getValue(), 'Y-m-d')+
	'&V_CYCLE_ID='+Ext.getCmp('cycletype').getValue();
}
function loadgridStore(store){
	store.proxy.extraParams.V_PLANTCODE=Ext.getCmp('ck').getValue();
	store.proxy.extraParams.V_DEPARTCODE=Ext.getCmp('zyq').getValue();
	store.proxy.extraParams.V_SUPPLY_CODE=Ext.getCmp('supply').getValue();
	store.proxy.extraParams.V_MATERIALNAME=Ext.getCmp('wlms').getValue();
	store.proxy.extraParams.D_BEGIN_DATE=Ext.util.Format.date(Ext.getCmp('startTime').getValue(), 'Y-m-d');
	store.proxy.extraParams.D_END_DATE=Ext.util.Format.date(Ext.getCmp('endTime').getValue(), 'Y-m-d');
	store.proxy.extraParams.V_CYCLE_ID=Ext.getCmp('cycletype').getValue();
}
