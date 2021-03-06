﻿/** ****************变量及数据集******************* */

var gridStore = Ext.create('Ext.data.Store', {
	id : 'gridStore',
	autoLoad : false,
	fields : [ 'VG_DESC', 'URL', 'ID' ],
	proxy : {
		type : 'ajax',
		async : false,
		url : AppUrl + 'PM_12/PRO_RUN7122_SELECTVGLIST',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
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
	border:false,
	//baseCls : 'my-panel-no-border',
	items : [ {
		id : 'descQuery',
		xtype : 'textfield',
		fieldLabel : '描述',
		labelAlign: 'right',
		labelWidth : 55,
		margin:'5 0 0 10'
	}, {
		xtype : 'button',
		text : '查询',
		icon : imgpath + '/search.png',
		width : 80,
		style : ' margin: 5px 0px 0px 10px',
		handler : function() {
			query();
		}
	},{
		id : 'insert',
		xtype : 'button',
		text : '新增',
		icon : imgpath + '/add.png',
		width : 80,
		style : ' margin: 5px 0px 5px 10px',
		listeners : {
			click : function() {
				Ext.getCmp('operateWindow').show();
				Ext.getCmp('operateWindow').setTitle('新增');
				Ext.ComponentManager.get('equId').setReadOnly(false);
				Ext.ComponentManager.get('status').select(
					statusStore.getAt(1));
				Ext.ComponentManager.get('operateType').setValue(
					'create');
			}
		}
	},
		{
			id : 'delete',
			xtype : 'button',
			text : '删除',
			width : 80,
			style : ' margin: 5px 0px 5px 10px',
			icon : imgpath+'/delete1.png',
			handler : function() {
				var selection = Ext.getCmp('grid').getSelectionModel().getSelection();
				var length = selection.length;
				if (length == 0) {
					Ext.Msg.alert('操作信息', '请选择记录进行删除');
					return false;
				} else {
					deleteUrl();
				}
			}
		} ]
});

var buttonPanel = Ext.create('Ext.panel.Panel', {
	id : 'buttonPanel',
	width : '100%',
	region : 'north',
	frame : true,
	layout : 'column',
	border:false,
	baseCls : 'my-panel-no-border',
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
						Ext.getCmp('operateWindow').show();
						Ext.getCmp('operateWindow').setTitle('新增');
						Ext.ComponentManager.get('equId').setReadOnly(false);
						Ext.ComponentManager.get('status').select(
								statusStore.getAt(1));
						Ext.ComponentManager.get('operateType').setValue(
								'create');
					}
				}
			},
			{
				id : 'delete',
				xtype : 'button',
				text : '删除',
				width : 80,
				style : ' margin: 5px 0px 5px 10px',
				icon : imgpath+'/delete1.png',
				handler : function() {
					var selection = Ext.getCmp('grid').getSelectionModel().getSelection();
					var length = selection.length;
					if (length == 0) {
						Ext.Msg.alert('操作信息', '请选择记录进行删除');
						return false;
					} else {
						deleteUrl();
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
		text : 'VG图ID',
		width : 200,
		dataIndex : 'ID',
		align : 'center',
		editor : {
													xtype : 'textfield'
												},
		renderer : atleft
	},{
		text : '描述',
		width : 200,
		dataIndex : 'VG_DESC',
		align : 'center',
		renderer : atleft
	}, {
		text : '连接',
		width : 400,
		dataIndex : 'URL',
		align : 'center',
		renderer : atleft
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
		fieldLabel : '描述',
		id : 'desc',
		labelAlign : 'left',
		style : ' margin: 5px 0px 5px 10px',
		labelWidth : 50,
		width : 260
	}, {
		xtype : 'textfield',
		fieldLabel : '链接',
		id : 'url',
		labelAlign : 'left',
		style : ' margin: 5px 0px 5px 10px',
		labelWidth : 50,
		width : 400
	} ],
	buttons : [ {
		text : '保存',
		handler : function() {
			var desc = Ext.getCmp('desc').getValue();
			var url = Ext.getCmp('url').getValue();
			if (desc == "" || desc == null || url == "" || url == null) {
				Ext.Msg.alert('操作信息', '请填写描述和连接');
			} else {
				create();
			}
		}
	}, {
		text : '关闭',
		handler : function() {
			Ext.getCmp('operateWindow').hide();
		}
	} ]
});

var operateWindow = Ext.create('Ext.window.Window', {
	width : 450,
	height : 150,
	layout : 'fit',
	id : 'operateWindow',
	closeAction : 'hide',
	closable : true,
	listeners : {
		show : {// 窗口加载将窗口数据清空
			fn : function() {
				Ext.ComponentManager.get('desc').setValue('');
				Ext.ComponentManager.get('url').setValue('');
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
	items : [ queryPanel, grid ]
};

Ext.onReady(onPageLoaded);

/** ****************执行方法******************* */

/**
 * 初始加载页面
 */
function onPageLoaded() {
	// 显示整体布局
	Ext.create('Ext.container.Viewport', Layout);
	// 刷新
	query();

};

function query() {
	Ext.data.StoreManager.lookup('gridStore').load({
		params : {
			V_VG_DESC:Ext.getCmp('descQuery').getValue()
		}
	});
}

function create() {
	Ext.Ajax.request({
		url : AppUrl + 'PM_12/PRO_RUN7122_ADDVGURL',
		method : 'POST',
		async : false,
		params : {
			V_VG_DESC:Ext.getCmp('desc').getValue(),
			V_URL:Ext.getCmp('url').getValue()
		},
		success : function(resp) {
			resp = Ext.decode(resp.responseText);
			if (resp.OUT_RESULT== 'success') {
				Ext.Msg.alert('操作信息', '操作成功');
				Ext.getCmp('operateWindow').hide();
				query();
			} else {
				Ext.Msg.alert('操作信息', '操作失败');
			}
		}
	});

}

function deleteUrl() {
	var selection = Ext.getCmp('grid').getSelectionModel().getSelection();
	var length = selection.length;
	var i_err = 0;
	for ( var index = 0; index < length; index++) {
		Ext.Ajax.request({
			url : AppUrl + 'PM_12/PRO_RUN7122_DELETEVGURL',
			method : 'POST',
			async : false,
			params : {
				V_ID:selection[index].data.ID
			},
			success : function(resp) {
				resp = Ext.decode(resp.responseText);
				if (resp.OUT_RESULT!= 'success') {
					i_err++;
					Ext.Msg.alert('操作信息', '删除失败');
				}
			}
		});
	}
	if (i_err == 0) {
		Ext.example.msg('操作信息', '删除成功');
	}
	query();
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return value;
}