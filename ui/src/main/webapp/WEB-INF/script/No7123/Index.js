/** ****************变量及数据集******************* */
QueryCheckAlertMsg = "请填写当前设备";

var STATUS_ARR = [];
STATUS_ARR.push({
	"STATUS_CODE" : "0",
	"STATUS" : "停用"
});
STATUS_ARR.push({
	"STATUS_CODE" : "1",
	"STATUS" : "启用"
});

/**
 * 状态数据集
 */
var statusStore = Ext.create('Ext.data.Store', {
	fields : [ 'STATUS_CODE', 'STATUS' ],
	data : STATUS_ARR,
	proxy : {
		type : 'memory',
		reader : {
			type : 'json'
		}
	}
});

var selPlantstore = Ext.create('Ext.data.Store',
	{
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


var selSiteStore = Ext.create('Ext.data.Store', {
	autoLoad : false,
	storeId : 'selSiteStore',
	fields : [ 'SITE_ID', 'SITE_DESC', ],
	proxy : {
		type : 'ajax',
		async : false,
		url: AppUrl + 'cjy/PRO_RUN_SITE_ALL',
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
	fields : [ 'TAG_ID', 'SITE_ID', 'TAG_DESC', 'TAG_UNIT', 'STATUS' ],
	proxy : {
		type : 'ajax',
		async : false,
		url: AppUrl + 'cjy/pro_run7123_selectstlist',
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
	style: 'background-color:#FFFFFF',
	baseCls: 'my-panel-no-border',
	width : '100%',
	region : 'north',
	frame : true,
	layout : 'column',
	items : [
		{
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
		},
		{
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
		},
		{
			id : 'xzsb',
			xtype : 'textfield',
			fieldLabel : '选择设备',
			readOnly : true,
			labelWidth : 60,
			style : ' margin: 5px 0px 5px 10px',
			listeners : {
				click : {
					element : 'el',
					fn : function() {
						if(Ext.getCmp('selSection').getValue()=='%'){
							alert("请选择作业区");
						}else{
							var owidth = window.document.body.offsetWidth-200;
							var oheight = window.document.body.offsetHeight-100 ;
							var ret = window.open(AppUrl+'page/PM_090101/index.html?V_DEPTCODE=' + Ext.ComponentManager.get('selSection').getValue() , '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
						}

					}
				}
				/*focus : function() {
					var ret = window.showModalDialog(AppUrl
						+ '/No410601/Index.html?DEPTCODE='
						+ Ext.ComponentManager.get('selSection')
							.getValue() + '', '',
						'dialogHeight:500px;dialogWidth:800px');
					if (ret != "" && ret != null && ret != undefined) {
						var str = [];
						str = ret.split('^');
						Ext.ComponentManager.get('xzsb').setValue(str[1]);
						Ext.ComponentManager.get('equcode')
							.setValue(str[0]);
						Ext.data.StoreManager.lookup('selSiteStore').load({
							params : {
								A_EQU_ID:str[0]
							}
						});
					} else {
					}
					Ext.ComponentManager.get('selPlant').focus(false, 0);
				}*/
			}
		}, {
			xtype : 'combo',
			id : "selSite",
			store : selSiteStore,
			editable : false,
			queryMode : 'local',
			fieldLabel : '备件安装位置',
			displayField : 'SITE_DESC',
			valueField : 'SITE_ID',
			labelWidth : 100,
			style : ' margin: 5px 0px 5px 10px',
			labelAlign : 'right'
		}, {
			xtype : 'hidden',
			id : 'equcode'
		}, {
			xtype : 'hidden',
			id : 'nowDevice_Site'
		}, {
			xtype : 'button',
			text : '查询',
			icon : imgpath + '/search.png',
			width : 80,
			style : ' margin: 5px 0px 0px 10px',
			handler : function() {
				if (Ext.ComponentManager.get('xzsb').getValue() == "") {
					Ext.example.msg('操作信息', '{0}', '请点击选择设备进行查询');
				} else {
					query();
				}
			}
		} ]
});

var buttonPanel = Ext.create('Ext.panel.Panel',
	{
		id : 'buttonPanel',
		style: 'background-color:#FFFFFF',
		baseCls: 'my-panel-no-border',
		width : '100%',
		region : 'north',
		frame : true,
		layout : 'column',
		items : [
			{
				id : 'insert',
				xtype : 'button',
				text : '新增',
				icon : imgpath + '/add.png',
				width : 80,
				style : ' margin: 5px 0px 5px 10px',
				listeners : {
					click : function() {
						var site = Ext.getCmp('selSite').getValue();
						if (site == "" || site == null) {
							Ext.example.msg('操作信息', '请选择备件安装位置');
						} else {
							Ext.getCmp('operateWindow').show();
							Ext.getCmp('operateWindow').setTitle('新增');
							Ext.ComponentManager.get('status').select(
								statusStore.getAt(1));
							Ext.ComponentManager.get('operateType')
								.setValue('create');
						}
					}
				}
			},
			{
				id : 'modify',
				xtype : 'button',
				text : '修改',
				icon : imgpath + '/edit.png',
				width : 80,
				style : ' margin: 5px 0px 0px 10px',
				listeners : {
					click : function() {
						var selection = Ext.getCmp('grid')
							.getSelectionModel().getSelection();
						var length = selection.length;
						if (length != 1) {
							Ext.example.msg('操作信息', '请选择一条数据修改');
							return;
						} else {
							Ext.getCmp('operateWindow').show();

							var selectedRecord = selection[0].data;
							Ext.getCmp('tagId').setValue(
								selectedRecord.TAG_ID);
							Ext.getCmp('tagDesc').setValue(
								selectedRecord.TAG_DESC);
							Ext.getCmp('tagUnit').setValue(
								selectedRecord.TAG_UNIT);
							Ext.getCmp('status').setValue(
								selectedRecord.STATUS);
						}
						Ext.ComponentManager.get('operateType')
							.setValue('modify');
						Ext.getCmp('operateWindow').setTitle('修改');
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
		text : '指标名称',
		width : 100,
		dataIndex : 'TAG_DESC',
		align : 'center',
		renderer : atleft
	}, {
		text : '指标计量单位',
		width : 100,
		dataIndex : 'TAG_UNIT',
		type : 'date',
		renderer : atleft
	}, {
		text : '状态',
		width : 300,
		dataIndex : 'STATUS',
		align : 'center',
		renderer : changeStatusRender
	}, {
		dataIndex : 'ID',
		hidden : true
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
		fieldLabel : '指标名称',
		id : 'tagDesc',
		labelAlign : 'left',
		style : ' margin: 5px 0px 5px 10px',
		labelWidth : 100,
		width : 260
	}, {
		xtype : 'textfield',
		fieldLabel : '指标计量单位',
		id : 'tagUnit',
		labelAlign : 'left',
		style : ' margin: 5px 0px 5px 10px',
		labelWidth : 100,
		width : 260
	}, {
		xtype : 'combo',
		store : statusStore,
		fieldLabel : '状态',
		id : 'status',
		labelAlign : 'left',
		labelWidth : 100,
		width : 260,
		editable : false,
		style : ' margin: 5px 0px 5px 10px',
		queryMode : 'local',
		displayField : 'STATUS',
		valueField : 'STATUS_CODE'
	}, {
		xtype : 'hidden',
		id : 'operateType'
	}, {
		xtype : 'hidden',
		id : 'tagId'
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
	height : 280,
	layout : 'fit',
	id : 'operateWindow',
	closeAction : 'hide',
	closable : true,
	listeners : {
		show : {// 窗口加载将窗口数据清空
			fn : function() {
				Ext.ComponentManager.get('tagDesc').setValue('');
				Ext.ComponentManager.get('tagUnit').setValue('');
				Ext.ComponentManager.get('status').setValue('');
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

	Ext.data.StoreManager.lookup('selPlantstore').on(
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
		});
	Ext.getCmp('selPlant').on(
		"change",
		function() {
			Ext.data.StoreManager.lookup('selSectionstore')
				.removeAll();
			Ext.data.StoreManager.lookup('selSectionstore').load(
				{
					params : {
						V_REPAIRDEPTCODE:Ext.util.Cookies.get('v_deptcode'),
						V_PERSONCODE:Ext.getCmp('selPlant').getValue()
					}
				});
		});

	Ext.data.StoreManager.lookup('selSiteStore').on(
		"load",
		function() {
			Ext.getCmp("selSite").select(
				Ext.data.StoreManager.lookup('selSiteStore').getAt(0));
		});

};
function getEquipReturnValue(ret){
	var str =ret.split('^');

	Ext.ComponentManager.get('xzsb').setValue(str[1]);
	Ext.ComponentManager.get('equcode')
		.setValue(str[0]);
	Ext.data.StoreManager.lookup('selSiteStore').load({
		params : {
			A_EQU_ID:str[0]
		}
	});
}
function query() {

	Ext.data.StoreManager.lookup('gridStore').load({
		params : {
			V_SITE_ID:Ext.getCmp('selSite').getValue()
		}
	});

}

function saveClick() {
	var desc = Ext.getCmp('tagDesc').getValue();
	var unit = Ext.getCmp('tagUnit').getValue();
	if (desc == "" || desc == null || unit == "" || unit == null) {
		Ext.example.msg('操作信息', '请填写指标名称和指标计量单位');
	} else {
		if (Ext.ComponentManager.get('operateType').getValue() == 'create') {
			create();
		} else if (Ext.ComponentManager.get('operateType').getValue() == 'modify') {
			modify();
		}
	}
}

function create() {
	var desc = Ext.getCmp('tagDesc').getValue();
	var unit = Ext.getCmp('tagUnit').getValue();
	if (!checkDescSize(desc)) {
		Ext.example.msg('操作信息', '指标名称不能超过50个字符');
		// Ext.getCmp('tagDesc').setValue(desc.substring(0, 50));
	} else if (!checkUnitSize(unit)) {
		Ext.example.msg('操作信息', '指标计量单位不能超过8个字符');
		// Ext.getCmp('tagUnit').setValue(unit.substring(0, 8));
	} else {
		Ext.Ajax.request({
			url: AppUrl + 'cjy/pro_run7123_addst',
			async: false,
			method: 'POST',
			params: {
				V_SITE_ID: Ext.getCmp('selSite').getValue(),
				V_TAG_DESC: Ext.getCmp('tagDesc').getValue(),
				V_TAG_UNIT:Ext.getCmp('tagUnit').getValue(),
				V_STATUS: Ext.getCmp('status').getValue()
			},
			success: function (ret) {
				var resp = Ext.JSON.decode(ret.responseText);
				if(resp.OUT_RESULT=="success"){
					Ext.example.msg('操作信息', '操作成功');
					Ext.getCmp('operateWindow').hide();
					query();
				}else {
					Ext.example.msg('操作信息', '操作失败');
				}
			}
		});
	}
}

function modify() {
	var desc = Ext.getCmp('tagDesc').getValue();
	var unit = Ext.getCmp('tagUnit').getValue();
	if (!checkDescSize(desc)) {
		Ext.example.msg('操作信息', '指标名称不能超过50个字符');
		// Ext.getCmp('tagDesc').setValue(desc.substring(0, 50));
	} else if (!checkUnitSize(unit)) {
		Ext.example.msg('操作信息', '指标计量单位不能超过8个字符');
		// Ext.getCmp('tagUnit').setValue(unit.substring(0, 8));
	} else {
		Ext.Ajax.request({
			url: AppUrl + 'cjy/pro_run7123_updatest',
			async: false,
			method: 'POST',
			params: {
				V_TAG_ID: Ext.getCmp('tagId').getValue(),
				V_SITE_ID: Ext.getCmp('selSite').getValue(),
				V_TAG_DESC: Ext.getCmp('tagDesc').getValue(),
				V_TAG_UNIT:Ext.getCmp('tagUnit').getValue(),
				V_STATUS: Ext.getCmp('status').getValue()
			},
			success: function (ret) {
				var resp = Ext.JSON.decode(ret.responseText);
				if(resp.OUT_RESULT=="success"){
					Ext.example.msg('操作信息', '操作成功');
					Ext.getCmp('operateWindow').hide();
					query();
				}else {
					Ext.example.msg('操作信息', '操作失败');
				}
			}
		});
	}
}

function changeStatus(code, status) {
	var proName = '';
	if (status == '1') {
		Ext.Ajax.request({
			url: AppUrl + 'cjy/pro_run7123_stopst',
			async: false,
			method: 'POST',
			params: {
				V_TAG_ID: code
			},
			success: function (ret) {
				var resp = Ext.JSON.decode(ret.responseText);
				if(resp.OUT_RESULT=="success"){
					query();
				}else {
					Ext.example.msg('操作信息', '操作失败');
				}
			}
		});
	} else if (status == '0') {
		Ext.Ajax.request({
			url: AppUrl + 'cjy/pro_run7123_startst',
			async: false,
			method: 'POST',
			params: {
				V_TAG_ID: code
			},
			success: function (ret) {
				var resp = Ext.JSON.decode(ret.responseText);
				if(resp.OUT_RESULT=="success"){
					query();
				}else {
					Ext.example.msg('操作信息', '操作失败');
				}
			}
		});
	}
}

function checkUnitSize(unit) {
	var flag = true;
	if (unit.length > 8) {
		flag = false;
	}
	return flag;
}

function checkDescSize(desc) {
	var flag = true;
	if (desc.length > 50) {
		flag = false;
	}
	return flag;
}

function changeStatusRender(value, metaData, record, rowIndex, colIndex, store) {
	return '<a href="javascript:changeStatus(\'' + record.data.TAG_ID + '\',\''
		+ record.data.STATUS + '\')">' + (value == '0' ? "停用" : "启用")
		+ '</a>';
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return value;
}