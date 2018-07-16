/** ****************变量及数据集******************* */
var CREATE_WINDOW_TITLE = '新增设置';
var selPlantstore = Ext.create('Ext.data.Store', {
	autoLoad : true,
	storeId : 'selPlantstore',
	fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
	proxy : {
		type : 'ajax',
		async : false,
		url: AppUrl + 'No4120/PRO_BASE_DEPT_VIEW_ROLE',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		},
		extraParams : {
			V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
			V_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
			V_V_DEPTCODENEXT:Ext.util.Cookies.get('v_deptcode'),
			V_V_DEPTTYPE:'[基层单位]'
		}
	}
});

var selSectionstore = Ext.create('Ext.data.Store', {
	autoLoad : false,
	storeId : 'selSectionstore',
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
		}
	}
});

var gridStore = Ext.create('Ext.data.Store', {
	id : 'gridStore',
	pageSize : 15,
	autoLoad : false,
	fields : [ 'EQU_ID', 'EQU_DESC', 'VG_ID', 'VG_DESC', 'VG_URL' ],
	proxy : {
		type : 'ajax',
		async : false,
		url: AppUrl + 'cjy/pro_run7125_equvglist',
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

/** ****************页面布局******************* */

var queryPanel = Ext.create('Ext.panel.Panel', {
	id : 'queryPanel',
	width : '100%',
	region : 'north',
	frame : true,
	layout : 'column',
	items : [ {
		xtype : 'combo',
		id : "selPlant",
		store : selPlantstore,
		editable : false,
		queryMode : 'local',
		fieldLabel : '厂矿',
		displayField : 'V_DEPTNAME',
		valueField : 'V_DEPTCODE',
		labelWidth : 70,
		style : ' margin: 5px 0px 0px 10px',
		labelAlign : 'right'
	}, {
		xtype : 'combo',
		id : "selSection",
		store : selSectionstore,
		editable : false,
		queryMode : 'local',
		fieldLabel : '作业区',
		displayField : 'V_DEPTNAME',
		valueField : 'V_DEPTCODE',
		labelWidth : 60,
		style : ' margin: 5px 0px 5px 10px',
		labelAlign : 'right'
	}, {
		xtype : 'button',
		text : '查询',
		icon : imgpath + '/search.png',
		width : 80,
		style : ' margin: 5px 0px 0px 10px',
		handler : function() {
			query();
		}
	} ]
});

var buttonPanel = Ext.create('Ext.panel.Panel', {
	id : 'buttonPanel',
	width : '100%',
	region : 'north',
	frame : true,
	layout : 'column',
	items : [ {
		id : 'insert',
		xtype : 'button',
		text : '新增',
		icon : imgpath + '/add.png',
		width : 80,
		style : ' margin: 5px 0px 5px 10px',
		listeners : {
			click : function() {
				Ext.getCmp('operateWindow').show();
				Ext.getCmp('operateWindow').setTitle(CREATE_WINDOW_TITLE);
				Ext.ComponentManager.get('operateType').setValue('create');
			}
		}
	} ]
});

var grid = Ext.create('Ext.grid.Panel', {
	id : 'grid',
	region : 'center',
	columnLines : true,
	width : '100%',
	store : gridStore,
	autoScroll : true,
	selType : 'checkboxmodel',
	height : 400,
	columns : [ {
		xtype : 'rownumberer',
		text : '序号',
		width : 35,
		sortable : false
	}, {
		text : '设备ID',
		width : 200,
		dataIndex : 'EQU_ID',
		align : 'center',
		renderer : atleft
	}, {
		text : '设备名称',
		width : 200,
		dataIndex : 'EQU_DESC',
		align : 'center',
		renderer : atleft
	}, {
		text : 'VG图ID',
		width : 200,
		dataIndex : 'VG_ID',
		align : 'center',
		renderer : atleft
	}, {
		text : 'VG图描述',
		width : 200,
		dataIndex : 'VG_DESC',
		align : 'center',
		renderer : atleft
	}, {
		text : 'VG图连接',
		width : 200,
		dataIndex : 'VG_URL',
		align : 'center',
		renderer : atleft
	}, {
		text : '删除',
		width : 100,
		align : 'center',
		renderer : deleteRender
	} ],
	bbar : [ {
		xtype : 'pagingtoolbar',
		dock : 'bottom',
		displayInfo : true,
		displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
		emptyMsg : '没有记录',
		store : 'gridStore'
	} ]
});

var operateWindowPanel = Ext.create('Ext.panel.Panel', {
	frame : true,
	layout : {
		type : 'table',
		columns : 1
	},
	defaults : {
		bodyStyle : 'padding:20px'
	},
	items : [ {
		xtype : 'textfield',
		fieldLabel : '设备编码',
		id : 'equId',
		labelAlign : 'left',
		style : ' margin: 5px 0px 5px 10px',
		labelWidth : 100,
		width : 260
	}, {
		xtype : 'textfield',
		fieldLabel : 'VG图ID',
		id : 'vgId',
		labelAlign : 'left',
		style : ' margin: 5px 0px 5px 10px',
		labelWidth : 100,
		width : 260
	}, {
		xtype : 'hidden',
		id : 'operateType'
	} ],
	buttons : [ {
		text : '保存',
		handler : saveClick
	}, {
		text : '关闭',
		handler : function() {
			Ext.getCmp('operateWindow').hide();
		}
	} ]
});

var operateWindow = Ext.create('Ext.window.Window', {
	width : 400,
	height : 180,
	layout : 'fit',
	id : 'operateWindow',
	closeAction : 'hide',
	closable : true,
	listeners : {
		show : {// 窗口加载将窗口数据清空
			fn : function() {
				Ext.ComponentManager.get('equId').setValue('');
				Ext.ComponentManager.get('vgId').setValue('');
			}
		}
	},
	items : [ operateWindowPanel ]

});

/**
 * 整体布局
 */
var Layout = {
	id : "id",
	layout : 'border',
	items : [ queryPanel, buttonPanel, grid ]
};

Ext.onReady(onPageLoaded);

/** ****************执行方法******************* */

/**
 * 初始加载页面
 */
function onPageLoaded() {
	// 显示整体布局
	Ext.create('Ext.container.Viewport', Layout);

	Ext.data.StoreManager.lookup('selPlantstore')
			.on(
					"load",
					function() {
						Ext.getCmp("selPlant").select(
								Ext.data.StoreManager.lookup('selPlantstore')
										.getAt(0));

						Ext.data.StoreManager.lookup('selSectionstore').load(
								{
									params : {
										V_REPAIRDEPTCODE:Ext.util.Cookies.get('v_deptcode'),
										V_PERSONCODE:Ext.getCmp('selPlant').getValue()
									}
								});
					});
	Ext.data.StoreManager.lookup('selSectionstore').on(
			"load",
			function() {
				Ext.getCmp("selSection").select(
						Ext.data.StoreManager.lookup('selSectionstore')
								.getAt(0));
				// 刷新
				query();
			});
	Ext.getCmp('selPlant').on("change", function() {
		Ext.data.StoreManager.lookup('selSectionstore').removeAll();
		Ext.data.StoreManager.lookup('selSectionstore').load({
			params : {
				V_REPAIRDEPTCODE:Ext.util.Cookies.get('v_deptcode'),
				V_PERSONCODE:Ext.getCmp('selPlant').getValue()
			}
		});
	});

};

function query() {

	Ext.data.StoreManager.lookup('gridStore').load(
			{
				params : {
					V_PLANTCODE:Ext.getCmp('selPlant').getValue(),
					V_DEPARTCODE:Ext.getCmp('selSection').getValue()
				}
			});

}

function saveClick() {
	var equId = Ext.getCmp('equId').getValue();
	var vgId = Ext.getCmp('vgId').getValue();
	if (equId == "" || equId == null || vgId == "" || vgId == null) {
		Ext.example.msg('操作信息', '请填写设备编号和VG图ID');
	} else {
		if (!checkSize(equId, 80)) {
			Ext.example.msg('操作信息', '设备编号不能超过80个字符');
		} else if (!checkSize(vgId, 36)) {
			Ext.example.msg('操作信息', 'VG图ID不能超过36个字符');
		} else {
			if (Ext.ComponentManager.get('operateType').getValue() == 'create') {
				create();
			} else if (Ext.ComponentManager.get('operateType').getValue() == 'modify') {
				modify();
			}
		}
	}
}

function create() {
	Ext.Ajax.request({
		url: AppUrl + 'cjy/pro_run7125_addequvg',
		method : 'POST',
		params : {
			V_EQU_ID: Ext.getCmp('equId').getValue(),
			V_VG_ID:Ext.getCmp('vgId').getValue()
		},
		success : function(resp) {
			resp = Ext.decode(resp.responseText);
			if (resp[0] == 'success') {
				Ext.example.msg('操作信息', '操作成功');
				Ext.getCmp('operateWindow').hide();
				query();
			} else if (resp[0].indexOf('ORA-02291') != -1) {
				Ext.example.msg('操作信息', '设备编码或VG图ID不存在');
			} else {
				Ext.example.msg('操作信息', '操作失败');
			}
		}
	});
}

function deleteRecord(equId, vgId) {
	Ext.Ajax.request({
		url: AppUrl + 'cjy/pro_run7125_delequvg',
		async : false,
		method : 'POST',
		params : {
			V_EQU_ID: equId,
			V_VG_ID:vgId
		},
		success : function(resp) {
			resp = Ext.decode(resp.responseText);
			if (resp[0] == 'success') {
				query();
			}
		}
	});
}

function checkSize(item, size) {
	var flag = true;
	if (item.length > size) {
		flag = false;
	}
	return flag;
}

function deleteRender(value, metaData, record, rowIndex, colIndex, store) {
	return '<a href="javascript:deleteRecord(\'' + record.data.EQU_ID + '\',\''
			+ record.data.VG_ID + '\')">删除</a>';
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return value;
}