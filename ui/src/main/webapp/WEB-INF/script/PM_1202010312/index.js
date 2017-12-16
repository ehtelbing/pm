//厂矿
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
//作业区
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
//设备选择STORE
var sbxzStore = Ext.create('Ext.data.Store', {
	autoLoad : false,
	storeId : 'sbxzStore',
	fields : [ 'EQU_DESC', 'EQU_ID' ],
	proxy : {
		type : 'ajax',
		async : false,
		url : AppUrl + 'PM_12/PRO_RUN7111_EQULIST',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		}
	}
});

// 位置
var siteStore = Ext.create('Ext.data.Store', {
	autoLoad : false,
	storeId : 'siteStore',
	fields : [ 'SITE_ID', 'SITE_DESC' ],
	proxy : {
		type : 'ajax',
		async : false,
		url : AppUrl + 'PM_12/PRO_RUN_SITE_ALL',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		}
	}
});
//周期
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
var chartStore = Ext.create('Ext.data.Store', {
	autoLoad : false,
	storeId : 'chartStore',
	fields : [ 'SUPPLY_NAME', 'AVG_WORK_TIEM' ],
	proxy : {
		type : 'ajax',
		async : false,
		url : AppUrl + 'PM_12/PRO_RUN7131_SUPPLYBJAVG',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		}
	}
});
var chart = Ext.create('Ext.chart.Chart', {
	width : 500,
	height : 300,
	region : 'center',
	style: 'background:#FFFFFF; padding:10px;',
	margin : '10 10 10 10',
	store : chartStore,
	axes : [ {
		title : '平均作业量',
		type : 'Numeric',
		position : 'left',
		fields : ['AVG_WORK_TIEM'],
		minimum: 0
	}, {
		title : '供应商',
		type : 'Category',
		position : 'bottom',
		fields : ['SUPPLY_NAME']
	} ],
	series : [ {
		type: 'column',
	    axis: 'left',
	    highlight:true,
	    tips:{
	    	trackMouse:true,
	    	width:140,
	    	height:28,
	    	renderer:function(storeItem,item){
	    		this.setTitle(storeItem.get('SUPPLY_NAME')+':'+storeItem.get('AVG_WORK_TIEM'));
	    	}
	    },
		xField : 'SUPPLY_NAME',
		yField : 'AVG_WORK_TIEM'
	} ]
});
var creatpanel = Ext.create('Ext.form.Panel', {
	id : 'creatpanel',
	style : 'margin:5px 2px 2px 2px',
	region : 'north',
	width : '100%',
	//baseCls : 'my-panel-no-border',
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
				frame : true,
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
					labelWidth : 100,
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
					labelWidth : 80,
					queryMode : 'local',
					valueField : 'V_DEPTCODE',
					displayField : 'V_DEPTNAME'
				},{
					xtype : 'combo',
					id : "selEqu",
					store : 'sbxzStore',
					editable : false,
					queryMode : 'local',
					fieldLabel : '设备',
					displayField : 'EQU_DESC',
					valueField : 'EQU_ID',
					labelWidth : 60,
					style : 'margin:5px 0px 5px 5px',
					labelAlign : 'right'
				}]
			},
			{
				xtype : 'panel',
				layout : 'column',
				frame : true,
				baseCls : 'my-panel-noborder',
				width : '100%',
				items : [{
					xtype : 'combo',
					id : "site",
					store : siteStore,
					editable : false,
					queryMode : 'local',
					fieldLabel : '备件安装位置',
					displayField : 'SITE_DESC',
					valueField : 'SITE_ID',
					labelWidth : 100,
					style : 'margin:5px 0px 5px 5px',
					labelAlign : 'right'
				},{
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
						}]
			} ]
});
Ext.onReady(function() {
	Ext.create('Ext.container.Viewport', {
		id : "id",
		layout : 'border',
		items : [ creatpanel,chart ]
	});
	Ext.data.StoreManager.lookup('ckStore').load({
		params : {
			IS_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
			IS_V_DEPTTYPE:'[基层单位]'
		}
	});
	Ext.data.StoreManager.lookup('ckStore').on('load',function() {
		Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
	});
	Ext.data.StoreManager.lookup('zyqStore').load({
		params : {
			IS_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
			IS_V_DEPTTYPE:'[主体作业区]'
		}
	});
	Ext.data.StoreManager.lookup('zyqStore').on('load',function() {
		Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
		Ext.getCmp('zyq').store.insert(0, {
			'V_DEPTCODE' : '%',
			'V_DEPTNAME' : '全部'
		});
		Ext.data.StoreManager.lookup('sbxzStore').load({
			params : {
				V_V_PLANTCODE:Ext.util.Cookies.get('v_orgCode'),
				V_V_DEPTCODE:Ext.getCmp('zyq').getValue()
			}
		});
	});
	Ext.getCmp('zyq').on('select', function() {
		Ext.data.StoreManager.lookup('sbxzStore').load({
			params : {
				V_V_PLANTCODE:Ext.util.Cookies.get('v_orgCode'),
				V_V_DEPTCODE:Ext.getCmp('zyq').getValue()
			}
		});
	});
	Ext.data.StoreManager.lookup('sbxzStore').on('load',function() {
		Ext.getCmp('selEqu').select(Ext.data.StoreManager.lookup('sbxzStore').getAt(0));
		Ext.data.StoreManager.lookup('siteStore').load({
			params : {
				A_EQU_ID:Ext.getCmp('selEqu').getValue()
			}
		});
	});
	Ext.getCmp('selEqu').on('select', function() {
		Ext.data.StoreManager.lookup('siteStore').load({
			params : {
				A_EQU_ID:Ext.getCmp('selEqu').getValue()
			}
		});
	});
	Ext.data.StoreManager.lookup('siteStore').on('load',function() {
		Ext.getCmp('site').select(Ext.data.StoreManager.lookup('siteStore').getAt(0));
		query();
	});
	Ext.data.StoreManager.lookup('cycletypeStore').on('load',function() {
	    Ext.getCmp('cycletype').select(Ext.data.StoreManager.lookup('cycletypeStore').getAt(0));
	});
});
// 查询
function query() {
	Ext.data.StoreManager.lookup('chartStore').load({
		params : {
			V_PLANTCODE: Ext.getCmp('ck').getValue(),
			V_DEPARTCODE:Ext.getCmp('zyq').getValue(),
			V_EQU_ID:Ext.getCmp('selEqu').getValue(),
			V_SITE_ID: Ext.getCmp('site').getValue(),
			V_CYCLE_ID: Ext.getCmp('cycletype').getValue()
		}
	});
}
