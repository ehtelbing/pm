var uniqueid = '';
// 厂矿store
var ckStore = Ext.create('Ext.data.Store', {
	storeId : 'ckStore',
	autoLoad : true,
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
		},
		extraParams : {
			IS_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
			IS_V_DEPTTYPE:'[基层单位]'
		}
	}
});
// 工作地点数据
var gzpalceStore = Ext.create('Ext.data.Store', {
	autoLoad : true,
	storeId : 'gzpalceStore',
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
		},
		extraParams : {
			IS_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
			IS_V_DEPTTYPE:'[主体作业区]'
		}
	}
});
// 设备选择STORE
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

var bjztStore = Ext.create('Ext.data.Store', {
    autoLoad : true,
    storeId : 'bjztStore',
    fields : ['value'],
    data : [{'value':'在用'},{'value':'不在用'},{'value':'在修'}],
    proxy : {
	    type : 'memory',
	    render : {
		    type : 'json'
   	    }
    }
});


var gridStore = Ext.create("Ext.data.Store", {
	autoLoad : false,
	pageSize : 100,
	storeId : 'gridStore',
	fields : [ 'SITE_DESC', 'BJ_ID', 'BJ_UNIQUE_CODE', 'MATERIALCODE',
			'MATERIALNAME', 'UNIT', 'CHANGEDATE', 'BJ_STATUS','SUPPLY_NAME','SITE_ID' ],
	proxy : {
		type : 'ajax',
		async : false,
		url : AppUrl + 'PM_12/PRO_RUN_SITE_BJ_ALL',
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
var historygridStore = Ext.create("Ext.data.Store", {
	autoLoad : false,
	storeId : 'historygridStore',
	pageSize : 20,
	fields : [ 'CHANGE_SITE_DESC', 'CHANGE_EQUNAME', 'BJ_UNIQUE_CODE',
			'DIRECTION', 'MATERIALNAME', 'UNIT', 'CHANGEDATE', 'REMARK','SUPPLY_NAME' ],
	proxy : {
		type : 'ajax',
		async : false,
		url : AppUrl + 'PM_12/PRO_RUN_BJ_CHANGE_LOG_ALL',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		}
	},
	listeners: {
        beforeload: beforeloadStore
    }
});

var creatpanel1 = Ext.create('Ext.form.Panel', {
	id : 'creatpanel1',
	style : 'margin:5px 0px 2px 2px',
	region : 'north',
	width : '100%',
	//baseCls : 'my-panel-no-border',
	defaults : {
		style : 'margin:5px 0px 5px 10px',
		labelAlign : 'right'
	},
	layout : {
		type : 'vbox'
	},
	items : [ {
		xtype : 'panel',
		region : 'center',
		layout : 'column',
		baseCls : 'my-panel-no-border',
		defaults : {
		  style : 'margin:5px 0px 5px 10px',
		  width:220,
		  labelAlign : 'right'
	    },
		items : [ {
			xtype : 'combo',
			id : 'ck',
			store : 'ckStore',
			fieldLabel : '厂矿 ',
			editable : false,
			labelWidth : 80,
			queryMode : 'local',
			valueField : 'V_DEPTCODE',
			displayField : 'V_DEPTNAME'
		}, {
			xtype : 'combo',
			id : 'zyq',
			store : 'gzpalceStore',
			fieldLabel : '作业区 ',
			editable : false,
			labelWidth : 80,
			queryMode : 'local',
			valueField : 'V_DEPTCODE',
			displayField : 'V_DEPTNAME'
		}, {
			xtype : 'combo',
			id : 'bjzt',
			store : 'bjztStore',
			fieldLabel : '备件状态 ',
			editable : false,
			labelWidth : 80,
			queryMode : 'local',
			valueField :'value',
			displayField :'value'
		} ]
	},{
		xtype : 'panel',
		region : 'center',
		layout : 'column',
		baseCls : 'my-panel-no-border',
		defaults : {
		  style : 'margin:5px 0px 5px 10px',
		  width:220,
		  labelAlign : 'right'
	    },
		items : [  {
			xtype : 'combo',
			id : 'xzsb',
			store : 'sbxzStore',
			fieldLabel : '当前设备 ',
			editable : false,
			labelWidth : 80,
			queryMode : 'local',
			valueField : 'EQU_ID',
			displayField : 'EQU_DESC'
		},{
			xtype : 'textfield', //输入框
			id :'bjbm',
			fieldLabel : '备件编码',
			labelWidth : 80,
			emptyText : '请输入'
		},{
			xtype : 'textfield', //输入框
			id :'bjms',
			fieldLabel : '备件描述',
			labelWidth : 80,
			emptyText : '请输入'
		}]
	},{
		xtype : 'panel',
		region : 'center',
		layout : 'column',
		baseCls : 'my-panel-no-border',
		defaults : {
		  style : 'margin:5px 0px 5px 10px',
		  labelAlign : 'right'
	    },
		items : [ {
			xtype : 'button',
			text : '查询',
			icon : imgpath + '/search.png',
			width : 55,
			handler : query,
			style : {
				margin : '5px 0px 10px 40px'
			}
		}, {
			xtype : 'button',
			text : '导出Excel',
			width : 100,
			handler : exportexcel,
			icon : imgpath + '/grid.png',
			style : {
				margin : '5px 0px 10px 10px'
			}
		} ]
	} ]
});

var creatpanel2 = Ext.create('Ext.form.Panel', {
	id : 'creatpanel2',
	style : 'margin:5px 0px 2px 2px',
	region : 'north',
	width : '100%',
	baseCls : 'my-panel-no-border',
	defaults : {
		style : 'margin:5px 0px 5px 10px',
		labelAlign : 'right'
	},
	layout : {
		type : 'vbox'
	},
	items : [ {
		xtype : 'panel',
		region : 'center',
		layout : 'column',
		baseCls : 'my-panel-no-border',
		items : [ {
			xtype : 'datefield',
			format : 'Y年m月d日',
			fieldLabel : '起始日期：',
			labelAlign : 'left',
			labelWidth : 80,
			id : 'starttime',
			value : new Date(),
			style : 'margin: 5px 0px 0px 10px'
		}, {
			xtype : 'datefield',
			format : 'Y年m月d日',
			fieldLabel : '结束日期：',
			labelAlign : 'left',
			labelWidth : 80,
			id : 'finishtime',
			value : new Date(),
			style : 'margin: 5px 0px 0px 10px'
		}, {
			xtype : 'button',
			text : '查询更换情况',
			icon : imgpath + '/search.png',
			width : 120,
			handler : seeClick,
			style : {
				margin : '5px 0px 10px 40px'
			}
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
	height : 400,
	autoScroll : true,
	listeners : {
		itemclick : findcode
	},
	columns : [ {
		xtype : 'rownumberer',
		text : '序号',
		width : 35,
		sortable : false,
		align : 'center'
	}, {
		text : '备件安装位置',
		dataIndex : 'SITE_DESC',
		align : 'center',
		labelAlign : 'right',
		width : 200,
		renderer : RenderFontLeft
	}, {
		text : '当前备件唯一标识 ',
		dataIndex : 'BJ_UNIQUE_CODE',
		align : 'center',
		width : 150,
		renderer : RenderFontLeft
	}, {
		text : '物资编码 ',
		dataIndex : 'MATERIALCODE',
		align : 'center',
		width : 150,
		renderer : RenderFontLeft
	}, {
		text : '物资描述 ',
		dataIndex : 'MATERIALNAME',
		align : 'center',
		width : 150,
		renderer : RenderFontLeft
	}, {
		text : '计量单位 ',
		dataIndex : 'UNIT',
		align : 'center',
		width : 90,
		renderer : RenderFontLeft
	}, {
		text : '最近更换时间 ',
		dataIndex : 'CHANGEDATE',
		align : 'center',
		width : 90,
		renderer : RenderFontLeft
	}, 
	{
		text : '供应商 ',
		dataIndex : 'SUPPLY_NAME',
		align : 'center',
		width : 150,
		renderer : RenderFontLeft
	}	
	,		
	{
		text : '备件状态 ',
		dataIndex : 'BJ_STATUS',
		align : 'center',
		width : 70,
		renderer : RenderFontLeft
	}, {
		text : '备件更换历史',
		width : 90,
		align : 'center',
		renderer : function() {
			return '<div><a href="javascript:seeClick()">查看</a></div>';
		}
	},{
		text : 'VG图',
		width : 70,
		align : 'center',
		renderer : function() {
			return '<div><a href="javascript:VGShow()">显示</a></div>';
		}
	} ],
	bbar : [ '->',{
		id : 'gpage',
		xtype : 'pagingtoolbar',
		dock : 'bottom',
		displayInfo : true,
		displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
		emptyMsg : '没有记录',
		store : gridStore
	} ]
});
var historygrid = Ext.create("Ext.grid.Panel", {
	xtype : 'gridpanel',
	id : 'historygrid',
	region : 'center',
	columnLines : true,
	width : '100%',
	store : historygridStore,
	page : 20,
	autoScroll : true,
	height : 400,
	autoScroll : true,
	columns : [ {
		xtype : 'rownumberer',
		text : '序号',
		width : 35,
		sortable : false
	}, {
		text : '更换日期',
		dataIndex : 'CHANGEDATE',
		align : 'center',
		labelAlign : 'right',
		width : 200,
		renderer : RenderFontLeft
	}, {
		text : '当前备件唯一标识 ',
		dataIndex : 'BJ_UNIQUE_CODE',
		align : 'center',
		width : 150,
		renderer : RenderFontLeft
	}, {
		text : '物资描述 ',
		dataIndex : 'MATERIALNAME',
		align : 'center',
		width : 150,
		renderer : RenderFontLeft
	}, {
		text : '计量单位 ',
		dataIndex : 'UNIT',
		align : 'center',
		width : 150,
		renderer : RenderFontLeft
	}, {
		text : '设备 ',
		dataIndex : 'CHANGE_EQUNAME',
		align : 'center',
		width : 150,
		renderer : RenderFontLeft
	}, {
		text : '备件安装位置 ',
		dataIndex : 'CHANGE_SITE_DESC',
		align : 'center',
		width : 150,
		renderer : RenderFontLeft
	}, {
		text : '供应商',
		dataIndex : 'SUPPLY_NAME',
		align : 'center',
		width : 150,
		renderer : RenderFontLeft
	},{
		text : '更换方向 ',
		dataIndex : 'DIRECTION',
		align : 'center',
		width : 150,
		renderer : RenderFontLeft
	}, {
		text : '备注 ',
		dataIndex : 'REMARK',
		align : 'center',
		width : 150,
		renderer : RenderFontLeft
	}],
	bbar : [ '->',{
		id : 'page',
		xtype : 'pagingtoolbar',
		dock : 'bottom',
		displayInfo : true,
		displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
		emptyMsg : '没有记录',
		store : historygridStore
	} ]

});
// 备件更换历史
var historywin = Ext.create('Ext.window.Window', {
	title : '备件更换历史：',
	height : 400,
	width : 900,
	layout : 'border',
	closeAction : 'hide',
	autoShow : false,
	modal : true,
	id : 'win',
	closeAction : 'hide',
	items : [ creatpanel2, historygrid ]
});
Ext.onReady(function() {
	Ext.create('Ext.container.Viewport', {
		id : "id",
		layout : 'border',
		items : [ creatpanel1, grid ]
	});
	Ext.getCmp('bjzt').setValue('在用');

	Ext.data.StoreManager.lookup('gzpalceStore').on('load', function() {

	});
	Ext.data.StoreManager.lookup('sbxzStore').on('load', function() {
		Ext.getCmp('xzsb').store.insert(0, {
			'EQU_ID' : '%',
			'EQU_DESC' : '全部'
		});
		Ext.getCmp('xzsb').store.sort('EQU_ID', 'ASC');
		Ext.getCmp('xzsb').select(Ext.data.StoreManager.lookup('sbxzStore').getAt(0));
		query();
	});
	Ext.data.StoreManager.lookup('ckStore').on('load', function() {
		Ext.getCmp('ck').store.sort('V_DEPTCODE', 'ASC');
		Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));

	});

	Ext.data.StoreManager.lookup('gzpalceStore').on('load', function() {
		//Ext.getCmp('zyq').store.insert(0, {
		//	'V_DEPTCODE' : '%',
		//	'V_DEPTNAME' : '全部'
		//});
		Ext.getCmp('zyq').store.sort('V_DEPTCODE', 'ASC');
		Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('gzpalceStore').getAt(0));
		// 默认当前登录用户工作区
		var storeDataList = Ext.data.StoreManager.lookup('gzpalceStore').data;
		var storeLength = storeDataList.length;
		for ( var index = 0; index < storeLength; index++) {
			var storeItemData = storeDataList.items[index].data;
			if (storeItemData.V_DEPTCODE == Ext.util.Cookies.get('v_deptcode')) {
				Ext.getCmp("zyq").setValue(Ext.util.Cookies.get('v_deptcode'));
				break;
			}
		}
		Ext.data.StoreManager.lookup('sbxzStore').load({
			params : {
				V_V_PLANTCODE:Ext.util.Cookies.get('v_orgCode'),
				V_V_DEPTCODE:Ext.getCmp('zyq').getValue()
			}
		});
	});

	Ext.data.StoreManager.lookup('sbxzStore').on('load', function() {
		Ext.getCmp('xzsb').select(Ext.data.StoreManager.lookup('sbxzStore').getAt(0));
	});

	Ext.getCmp('zyq').on('select', function() {
		Ext.data.StoreManager.lookup('sbxzStore').load({
			params : {
				V_V_PLANTCODE:Ext.util.Cookies.get('v_orgCode'),
				V_V_DEPTCODE:Ext.getCmp('zyq').getValue()
			}
		});
	});

});
// 查询
function query() {
	Ext.data.StoreManager.lookup('gridStore').load({
		params : {
			IN_EQUID:Ext.getCmp('xzsb').getValue(),
			IN_PLANT:Ext.getCmp('ck').getValue(),
			IN_DEPART:Ext.getCmp('zyq').getValue(),
			IN_STATUS:Ext.getCmp('bjzt').getValue(),
			IN_BJCODE:Ext.getCmp('bjbm').getValue(),
			IN_BJDESC: Ext.getCmp('bjms').getValue()
		}
	});
}

function RenderFontLeft(value, metaData) {
	metaData.style = 'text-align: left';
	value = value.split(' ')[0];
	return value;
}

function findcode(a, record, item, index, e, eOpts) {
	uniqueid = record.raw.BJ_UNIQUE_CODE;
}
function seeClick() {
	Ext.data.StoreManager.lookup('historygridStore').load();
	Ext.getCmp('win').show();
}

function VGShow(a,b,c,d) {
	 Ext.Ajax.request({
		url : AppUrl + 'PM_12/PRO_RUN7119_SITEVGURL',
		method : 'POST',
		async : false,
		params : {
			V_SITE_ID:gridStore.getAt(0).get("SITE_ID")
		},
		success : function(response) {
			var resp = Ext.JSON.decode(response.responseText);
			if(resp.RET!=""){
				window.open(resp.RET,'','dialogWidth:800px;dialogHeight:420px');
			}else{
				Ext.Msg.alert('操作信息','没有找到相应VG图');
			}
		}
	});
}


function exportexcel() {
	document.location.href=AppUrl + 'excel/BJWZTZ_EXCEL?IN_EQUID='+encodeURI(Ext.getCmp('xzsb').getValue())+
	'&IN_PLANT='+Ext.getCmp('ck').getValue()+
	'&IN_DEPART='+encodeURI(Ext.getCmp('zyq').getValue())+
	'&IN_STATUS='+Ext.getCmp('bjzt').getValue()+
	'&IN_BJCODE='+Ext.getCmp('bjbm').getValue()+
	'&IN_BJDESC='+Ext.getCmp('bjms').getValue();
}
function beforeloadStore(store){
	store.proxy.extraParams.A_BJ_UNIQUE_CODE =uniqueid;
}
function loadgridStore(store){}