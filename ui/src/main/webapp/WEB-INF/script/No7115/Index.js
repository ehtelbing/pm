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
            IS_V_DEPTCODE : Ext.util.Cookies.get('v_orgCode'),
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
		url : AppUrl + 'cjy/pro_run7111_equlist',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		}
	}
});
// 负责人store
var fzrStore = Ext.create('Ext.data.Store', {
	autoLoad : false,
	storeId : 'fzrStore',
	fields : [ 'USERID', 'USERNAME' ],
	proxy : {
		type : 'ajax',
		async : false,
		url : AppUrl + 'PM_12/pro_run7115_personlist',
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
	fields : [ 'BJ_DESC', 'BJ_UNIQUECODE', 'ALERT_CONTEXT', 'ALERT_STATUS',
		'HANDLE_CONTEXT', 'ALERT_ID', 'HANDLE_USERNAME', 'HANDLE_DATE',
		'INSERTDATE', 'EQU_DESC', 'USERNAME', 'STATUS', 'SITE_DESC',
		'UPDATEPERSON', 'MEND_DEPART', 'MEND_PERSON', 'REMARK',
		'HANDLE_USERID' ],
	proxy : {
		type : 'ajax',
		async : false,
		url : AppUrl + 'PM_12/PRO_RUN7115_SELECT',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		}
	}
});

var creatpanel1 = Ext.create('Ext.panel.Panel', {
	id : 'creatpanel1',
	style : 'margin:5px 0px 2px 2px',
	region : 'north',
	width : '100%',
	baseCls : 'my-panel-no-border',
	defaults : {
		// style : 'margin:5px 0px 5px 10px',
		labelAlign : 'right'
	},
	layout : {
		type : 'vbox'
	},
	items : [ {
		xtype : 'panel',
		region : 'center',
		layout : 'column',
		width : '100%',
		frame : true,
		items : [ {
			xtype : 'combo',
			id : 'zyq',
			store : 'gzpalceStore',
			fieldLabel : '作业区 ',
			editable : false,
			readOnly : true,
			style : 'margin:5px 10px 5px 5px',
			labelWidth : 50,
			queryMode : 'local',
			valueField : 'V_DEPTCODE',
			displayField : 'V_DEPTNAME'
		}, {
			xtype : 'combo',
			id : 'xzsb',
			store : 'sbxzStore',
			labelAlign : 'right',
			fieldLabel : '设备 ',
			editable : false,
			style : 'margin:5px 10px 5px 5px',
			labelWidth : 50,
			queryMode : 'local',
			valueField : 'EQU_ID',
			displayField : 'EQU_DESC'
		}, {
			xtype : 'combo',
			id : 'fzr',
			store : 'fzrStore',
			fieldLabel : '负责人 ',
			labelAlign : 'right',
			editable : false,
			style : 'margin:5px 10px 5px 5px',
			labelWidth : 50,
			queryMode : 'local',
			valueField : 'USERID',
			displayField : 'USERNAME'
		}, {
			xtype : 'button',
			text : '查询',
			icon : imgpath + '/search.png',
			width : 100,
			handler : query,
			style : {
				margin : '5px 0px 10px 40px'
			}
		}, ]
	}, {
		xtype : 'panel',
		region : 'center',
		layout : 'column',
		width : '100%',
		frame : true,
		items : [ {
			xtype : 'button',
			text : '导出Excel',
			width : 100,
			handler : OnButtonExportClicked,
			style : {
				margin : '5px 0px 10px 40px'
			}
		}, {
			xtype : 'button',
			text : '处理选中报警项',
			width : 130,
			handler : blowbtn,
			style : {
				margin : '5px 0px 10px 40px'
			}
		}

		]
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
	plugins : [ {
		ptype : 'cellediting',
		clicksToEdit : 1
	} ],
	selModel : {
		selType : 'checkboxmodel',
		mode : 'SINGLE'
	},
	columns : [ {
		text : '处理结果',
		dataIndex : 'HANDLE_CONTEXT',
		editor : {
			xtype : 'textfield'
		},
		align : 'center',
		labelAlign : 'right',
		width : 200,
		renderer : RenderFontLeft
	}, {
		text : '设备名称 ',
		dataIndex : 'EQU_DESC',
		align : 'center',
		width : 150,
		renderer : RenderFontLeft
	}, {
		text : '备件安装位置 ',
		dataIndex : 'SITE_DESC',
		align : 'center',
		width : 150,
		renderer : RenderFontLeft
	}, {
		text : '备件唯一编码 ',
		dataIndex : 'BJ_UNIQUECODE',
		align : 'center',
		width : 150,
		renderer : RenderFontLeft
	}, {
		text : '备件描述 ',
		dataIndex : 'BJ_DESC',
		align : 'center',
		width : 150,
		renderer : RenderFontLeft
	}, {
		text : '报警内容 ',
		dataIndex : 'ALERT_CONTEXT',
		align : 'center',
		width : 150,
		renderer : RenderFontLeft
	}, {
		text : '报警时间 ',
		dataIndex : 'HANDLE_DATE',
		align : 'center',
		width : 150,
		renderer : RenderFontLeft
	}, {
		text : '设备负责人 ',
		dataIndex : 'USERNAME',
		align : 'center',
		width : 150,
		renderer : RenderFontLeft
	} ]
});
Ext
	.onReady(function() {
		Ext.create('Ext.container.Viewport', {
			id : "id",
			layout : 'border',
			items : [ creatpanel1, grid ]
		});

		Ext.data.StoreManager
			.lookup('gzpalceStore')
			.on(
			'load',
			function() {
				Ext.getCmp('zyq').store.insert(0, {
					'V_DEPTCODE' : '%',
					'V_DEPTNAME' : '全部'
				});
				Ext.getCmp('zyq').select(
					Ext.data.StoreManager.lookup(
						'gzpalceStore').getAt(0));
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
			});
		Ext.data.StoreManager.lookup('sbxzStore').on(
			'load',
			function() {
				Ext.getCmp('xzsb').store.insert(0, {
					'EQU_ID' : '%',
					'EQU_DESC' : '全部'
				});
				Ext.getCmp('xzsb').select(
					Ext.data.StoreManager.lookup('sbxzStore')
						.getAt(0));
			});
		Ext.data.StoreManager.lookup('fzrStore').on(
			'load',
			function() {
				Ext.getCmp('fzr').store.insert(0, {
					'USERID' : '%',
					'USERNAME' : '全部'
				});
				Ext.getCmp('fzr').select(
					Ext.data.StoreManager.lookup('fzrStore').getAt(
						0));
			});
		Ext.data.StoreManager.lookup('gzpalceStore').on(
			'load',
			function() {
				Ext.getCmp('zyq').select(
					Ext.data.StoreManager.lookup('gzpalceStore').getAt(0));

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

				Ext.data.StoreManager.lookup('sbxzStore').load(
					{
						params : {
                            v_v_plantcode : Ext.util.Cookies.get('v_orgCode'),
                            v_v_deptcode:Ext.getCmp('zyq').getValue()
						}
					});
			});
		Ext.data.StoreManager.lookup('sbxzStore').on(
			'load',
			function() {
				Ext.getCmp('xzsb').select(
					Ext.data.StoreManager.lookup('sbxzStore')
						.getAt(0));
			});
		Ext.data.StoreManager.lookup('fzrStore').on(
			'load',
			function() {
				Ext.getCmp('fzr').select(
					Ext.data.StoreManager.lookup('fzrStore').getAt(
						0));
			});
		Ext.getCmp('zyq').on(
			'select',
			function() {
				Ext.data.StoreManager.lookup('sbxzStore').load(
					{
						params : {
							parVal : [
								Ext.util.Cookies
									.get('v_orgCode'),
								Ext.getCmp('zyq').getValue() ]
						}
					});
				Ext.data.StoreManager.lookup('fzrStore').load(
					{
						params : {
							parVal : [
								Ext.getCmp('zyq').getValue(),
								Ext.util.Cookies
									.get('v_orgCode'),
								Ext.getCmp('xzsb').getValue() ]
						}
					});
			});

		Ext.getCmp('xzsb').on(
			'select',
			function() {
				Ext.data.StoreManager.lookup('fzrStore').load(
					{
						params : {
							parVal : [
								Ext.getCmp('zyq').getValue(),
								Ext.util.Cookies
									.get('v_orgCode'),
								Ext.getCmp('xzsb').getValue() ]
						}
					});
			});
		query();
	});
// 查询
function query() {
	Ext.data.StoreManager.lookup('gridStore').load(
		{
			params : {
                V_V_DEPARTCODE : Ext.getCmp('zyq').getValue(),
                V_V_PLANTCODE : Ext.util.Cookies.get('v_orgCode'),
                V_V_BJ_ID : Ext.getCmp('xzsb').getValue(),
                V_V_USERID : Ext.getCmp('fzr').getValue()
			}
		});
}

function RenderFontLeft(value, metaData) {
	metaData.style = 'text-align: left';
	value = value.split(' ')[0];
	return value;
}

function findcode(a, record, item, index, e, eOpts) {
	imgid = record.raw.LOGID;
}
function blowbtn() {
	if (Ext.getCmp('grid').getSelectionModel().getSelection().length != 0) {
		if (Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.HANDLE_CONTEXT != '') {
			Ext.Ajax.request({
				url : APP + '/pro_run7115_handlealert',
				type : 'ajax',
				async : false,
				method : 'POST',
				params : {
					parVal : [
						Ext.getCmp('grid').getSelectionModel()
							.getSelection()[0].data.ALERT_ID,
						Ext.getCmp('grid').getSelectionModel()
							.getSelection()[0].data.HANDLE_CONTEXT,
						Ext.getCmp('grid').getSelectionModel()
							.getSelection()[0].data.HANDLE_USERID,
						Ext.getCmp('grid').getSelectionModel()
							.getSelection()[0].data.HANDLE_USERNAME ]
				},
				success : function(resp) {
					resp = Ext.decode(resp.responseText);
				}
			});
		} else {
			alert('处理结果不能为空！');
		}
	} else {
		alert('请选择一条进行操作！');
	}
}
function OnButtonExportClicked() {

	var tableName = ["处理结果", "设备名称", "备件安装位置", "备件唯一编码", "备件描述", "报警内容",
		"报警时间", "设备负责人" ];
	var tableKey = [ 'ALERT_CONTEXT', 'EQU_DESC', 'SITE_DESC', 'BJ_UNIQUECODE',
		'BJ_DESC', 'HANDLE_CONTEXT', 'HANDLE_DATE', 'USERNAME' ];

	var parName = [ 'V_V_DEPARTCODE', 'V_V_PLANTCODE', 'V_V_BJ_ID',
		'V_V_USERID' ];
	var parType = [ 's', 's', 's', 's' ];
	var parVal = [ excelCS(Ext.getCmp('zyq').getValue()),
		excelCS(Ext.util.Cookies.get('v_orgCode')),
		excelCS(Ext.getCmp('xzsb').getValue()),
		excelCS(Ext.getCmp('fzr').getValue())];
	var proName = 'pro_run7115_select';
	var ExcelName = '报警信息处理';

	var cursorName = 'V_CURSOR';
	var returnStr = [ 'null' ];
	var returnStrName = [ 'null' ];
	var returnStrType = [ 'null' ];


	submitData("ModelExcelTotal", tableName, tableKey, parName, parType,
		parVal, proName, returnStr, returnStrType, returnStrName,
		cursorName, "title", "报警信息处理");

//	location.href = "ModelExcelsite?" + "tableName=" + tableName.join(",")
//			+ "&tableKey=" + tableKey.join(",") + "&parName="
//			+ parName.join(",") + "&parType=" + parType.join(",") + "&parVal="
//			+ parVal.join(",") + "&proName=" + proName + "&ExcelName="
//			+ ExcelName + "";
}
function excelCS(str) {
	if(str==undefined) return 'null';
	if(str==null) return 'null';
	if(str=='') return 'null';
//	if(str=='%') return 'all';
	return str;
}
//function excelCS(str) {
//    if(str==undefined) return 'kong';
//	if(str==null) return 'kong';
//	if(str=='') return 'kong';
//	if(str=='%') return 'all';
//	return str;
//}
