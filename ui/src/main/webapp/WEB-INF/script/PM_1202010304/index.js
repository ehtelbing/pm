var imgid = '';
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

var gridStore = Ext.create("Ext.data.Store", {
	autoLoad : false,
	storeId : 'gridStore',
	pageSize : 20,
	fields : [ 'CHECKDATE', 'BJ_DESC', 'SITE_DESC', 'EQU_NAME', 'CONTEXT',
			'CHECK_USERNAME', 'DEPARTNAME', 'TAG_VALUE', 'DESC_UNIT' ],
	proxy : {
		type : 'ajax',
		async : false,
		url : AppUrl + 'PM_12/PRO_RUN7112_CHECKLOGLIST',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		}
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
		layout : 'column',
		baseCls : 'my-panel-no-border',
		width : '100%',
		items : [ {
			xtype : 'combo',
			id : 'zyq',
			labelAlign : 'right',
			store : 'gzpalceStore',
			fieldLabel : '作业区 ',
			editable : false,
			style : 'margin:5px 0px 5px 5px',
			labelWidth : 80,
			queryMode : 'local',
			valueField : 'V_DEPTCODE',
			displayField : 'V_DEPTNAME'
		}, {
			xtype : 'combo',
			id : 'xzsb',
			labelAlign : 'right',
			store : 'sbxzStore',
			fieldLabel : '选择设备 ',
			editable : false,
			style : 'margin:5px 0px 5px 5px',
			labelWidth : 80,
			queryMode : 'local',
			valueField : 'EQU_ID',
			displayField : 'EQU_DESC'
		}, {
			xtype : 'textfield',
			id : 'sbwybs',
			fieldLabel : '备件唯一标识',
			labelAlign : 'right',
			labelWidth : 100,
			style : 'margin: 5px 0px 5px 5px'
		} ]
	}, {
		xtype : 'panel',
		layout : 'column',
		baseCls : 'my-panel-no-border',
		width : '100%',
		items : [ {
			xtype : 'datefield',
			format : 'Y年m月d日',
			fieldLabel : '起始日期',
			editable : false,
			labelAlign : 'right',
			labelWidth : 80,
			id : 'startTime',
			value : new Date(),
			style : 'margin: 5px 0px 5px 5px'
		}, {
			xtype : 'datefield',
			format : 'Y年m月d日',
			fieldLabel : '结束日期',
			editable : false,
			labelAlign : 'right',
			labelWidth : 80,
			id : 'endTime',
			value : new Date(),
			style : 'margin: 5px 0px 5px 5px'
		}, {
			xtype : 'button',
			text : '查询',
			icon : imgpath + '/search.png',
			width : 80,
			handler : query,
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
	autoScroll : true,
	height : 400,
	listeners : {
		itemclick : findcode
	},
	columns : [
			{
				text : '查看检查图片 ',
				align : 'center',
				width : 80,
				renderer : function(value, metaData, record) {
					return '<div><a href="javascript:OnClickDeleteLink(\'' + value + '\')">查看</a></div>';
				}
			}, {
				text : '检查时间',
				dataIndex : 'CHECKDATE',
				align : 'center',
				labelAlign : 'right',
				width : 80,
				renderer : RenderDateLeft
			}, {
				text : '设备名称 ',
				dataIndex : 'EQU_NAME',
				align : 'center',
				width : 150,
				renderer : RenderFontLeft
			}, {
				text : '备件安装位置 ',
				dataIndex : 'SITE_DESC',
				align : 'center',
				width : 100,
				renderer : RenderFontLeft
			}, {
				text : '备件名称 ',
				dataIndex : 'BJ_DESC',
				align : 'center',
				width : 100,
				renderer : RenderFontLeft
			}, {
				text : '指标描述 ',
				dataIndex : 'DESC_UNIT',
				align : 'center',
				width : 80,
				renderer : RenderFontLeft
			}, {
				text : '指标值 ',
				dataIndex : 'TAG_VALUE',
				align : 'center',
				width : 80,
				renderer : RenderFontLeft
			},

			{
				text : '检查内容 ',
				dataIndex : 'CONTEXT',
				align : 'center',
				width : 150,
				renderer : RenderFontLeft
			}, {
				text : '检查人 ',
				dataIndex : 'CHECK_USERNAME',
				align : 'center',
				width : 80,
				renderer : RenderFontLeft
			}, {
				text : '作业区 ',
				dataIndex : 'DEPARTNAME',
				align : 'center',
				width : 100,
				renderer : RenderFontLeft
			} ]
});

// 查看窗体
var rrwidow = Ext.create('Ext.window.Window', {
	title : '检查图片',
	height : 450,
	width : 600,
	layout : 'fit',
	closeAction : 'hide',
	autoShow : false,
	modal : true,
	id : 'win1',
	closeAction : 'hide'
});

Ext.onReady(function() {
	Ext.create('Ext.container.Viewport', {
		id : "id",
		layout : 'border',
		items : [ creatpanel1, grid ]
	});

	Ext.data.StoreManager.lookup('sbxzStore').on('load', function() {
		Ext.getCmp('xzsb').store.insert(0, {
			'EQU_ID' : '%',
			'EQU_DESC' : '全部'
		});
		Ext.getCmp('xzsb').select(Ext.data.StoreManager.lookup('sbxzStore').getAt(0));
	});

	Ext.data.StoreManager.lookup('gzpalceStore').on('load', function() {
		//Ext.getCmp('zyq').store.insert(0, {
		//	'V_DEPTCODE' : '%',
		//	'V_DEPTNAME' : '全部'
		//});
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
					V_V_PLANTCODE: Ext.util.Cookies.get('v_orgCode'),
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
				V_V_PLANTCODE: Ext.util.Cookies.get('v_orgCode'),
				V_V_DEPTCODE:Ext.getCmp('zyq').getValue()
			}
		});
	});
	query();
});
// 查询
function query() {
	Ext.data.StoreManager.lookup('gridStore').load({
		params : {
			V_V_EQUCODE:Ext.getCmp('xzsb').getValue(),
			V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),
			V_V_PLANTCODE:Ext.util.Cookies.get('v_orgCode'),
			V_V_ID:Ext.getCmp('sbwybs').getValue(),
			V_V_BTIME:Ext.util.Format.date(Ext.getCmp('startTime').getValue(), 'Y-m-d'),
			V_V_ETIME:Ext.util.Format.date(Ext.getCmp('endTime').getValue(), 'Y-m-d')
		}
	});
}

function RenderDateLeft(value, metaData) {
	metaData.style = 'text-align: left';
	value = value.split(' ')[0];
	return value;
}

function RenderFontLeft(value, metaData) {
	metaData.style = 'text-align: left';
	return value;
}

function findcode(a, record, item, index, e, eOpts) {
	imgid = record.raw.LOGID;
}
function OnClickDeleteLink() {
	Ext.getCmp('win1').removeAll();
	var asd = {
		xtype : 'image',
		region : 'center',
		src :  AppUrl + 'PM_12/ImgDownLoad?V_V_ID=' + imgid
	};
	Ext.getCmp('win1').add(asd);
	Ext.getCmp('win1').show();
}
