var STATUS_ID = "";
var globl_code = '';
var globl_xl_code = '';
Ext.onReady(function() {
	var xlStore = Ext.create('Ext.data.Store', {
		autoLoad : true,
		storeId : 'xlStore',
		fields : [ 'SERIES_CLASS', 'SERIES_CLASS_DESC' ],
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj106_djseries_able',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			},
			extraParams : {
			}
		}
	});
	var xlStore_add = Ext.create('Ext.data.Store', {
		autoLoad : true,
		storeId : 'xlStore_add',
		fields : [ 'SERIES_CLASS', 'SERIES_CLASS_DESC' ],
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj106_djseries_able',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			},
			extraParams : {
			}
		}
	});
	var xlStore_edit = Ext.create('Ext.data.Store', {
		autoLoad : true,
		storeId : 'xlStore_edit',
		fields : [ 'SERIES_CLASS', 'SERIES_CLASS_DESC' ],
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj106_djseries_able',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			},
			extraParams : {
			}
		}
	});
	var xllbStore = Ext.create('Ext.data.Store', {
		autoLoad : true,
		storeId : 'xllbStore',
		fields : [ 'MENDTYPE', 'MENDTYPE_DESC' ],
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj102_mendtype_able',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			},
			extraParams : {
			}
		}
	});
	var xllbStore_add = Ext.create('Ext.data.Store', {
		autoLoad : true,
		storeId : 'xllbStore_add',
		fields : [ 'MENDTYPE', 'MENDTYPE_DESC' ],
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj102_mendtype_able',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			},
			extraParams : {
			}
		}
	});
	var xllbStore_edit = Ext.create('Ext.data.Store', {
		autoLoad : true,
		storeId : 'xllbStore_edit',
		fields : [ 'MENDTYPE', 'MENDTYPE_DESC' ],
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj102_mendtype_able',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			},
			extraParams : {
			}
		}
	});
	var djxhStore_add = Ext.create('Ext.data.Store', {
		autoLoad : false,
		storeId : 'djxhStore_add',
		fields : [ 'DJ_TYPE', 'DJ_TYPE' ],
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj107_djtype_able',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			}
		}
	});
	var djxhStore_edit = Ext.create('Ext.data.Store', {
		autoLoad : false,
		storeId : 'djxhStore_edit',
		fields : [ 'DJ_TYPE', 'DJ_TYPE' ],
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj107_djtype_able',
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
		storeId : 'gridStore',
		autoLoad : false,
		fields : [ 'ID', 'DJ_TYPE', 'MENDTYPE', 'F_PRICE', 'DJ_VOL', 'DJ_SX',
			'DJ_CS', 'DJ_DZ_CS', 'DJ_ZZ_CS', 'SERIES_CLASS', 'REMARK',
			'SERIES_CLASS_DESC', 'MENDTYPE_DESC' ],
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj112_selectdjmendprice_jx',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			}
		}
	});

	var panel = Ext.create('Ext.panel.Panel', {
		style: 'background-color:#FFFFFF',
		baseCls: 'my-panel-no-border',
		padding: '10px 0px 10px 0px',
		titleAlign : 'left',
		region : 'north',
		layout : 'vbox',
		frame : true,
		items : [ {
			xtype : 'panel',
			region : 'west',
			frame : true,
			baseCls : 'my-panel-noborder',
			layout : 'hbox',
			items : [ {
				xtype : 'combo',
				labelAlign : 'right',
				style : ' margin: 0px 0px 0px 20px',
				fieldLabel : '系列分类',
				editable : false,
				queryMode : 'local',
				displayField : 'SERIES_CLASS_DESC',
				valueField : 'SERIES_CLASS',
				id : 'seriestype',
				labelWidth : 80,
				store : 'xlStore'
			}, {
				xtype : 'textfield',
				labelAlign : 'right',
				style : ' margin: 0px 0px 0px 20px',
				value : '',
				fieldLabel : '电机型号',
				id : 'dj_desc',
				labelWidth : 80
			}, {
				xtype : 'combo',
				labelAlign : 'right',
				style : ' margin: 00px 0px 0px 20px',
				fieldLabel : '修理类别',
				editable : false,
				queryMode : 'local',
				displayField : 'MENDTYPE_DESC',
				valueField : 'MENDTYPE',
				id : 'mendtype',
				labelWidth : 80,
				store : 'xllbStore'
			} ]
		}, {
			xtype : 'panel',
			region : 'west',
			frame : true,
			baseCls : 'my-panel-noborder',
			layout : 'hbox',
			items : [ {
				xtype : 'button',
				id : 'search',
				text : '查  询',
				width : '60',
				icon : imgpath + '/search.png',
				style : ' margin: 5px 0px 0px 45px',
				listeners : {
					click : OnClickSearch
				}
			}, {
				xtype : 'button',
				id : 'toExcel',
				text : '导出到Excel',
				width : '100',
				icon : imgpath + '/grid.png',
				style : ' margin: 5px 0px 0px 30px',
				listeners : {
					click : OnClickOutExcel
				}
			}, {
				xtype : 'button',
				id : 'delete',
				text : '删  除',
				width : '60',
				icon : imgpath + '/delete.png',
				style : ' margin: 5px 0px 0px 30px',
				listeners : {
					click : OnClickDelete
				}
			}, {
				xtype : 'button',
				id : 'add',
				text : '增  加',
				width : '60',
				icon : imgpath + '/add.png',
				style : ' margin: 5px 0px 0px 30px',
				listeners : {
					click : OnClickAdd
				}
			} ]
		} ]
	});
	var grid = Ext.create('Ext.grid.Panel', {
		store : 'gridStore',
		id : 'grid',
		columnLines : true,
		region : 'center',
		autoScroll : true,
		selType : 'checkboxmodel',
		selModel : {
			showHeaderCheckbox : false
		},
		columns : [ {
			text : '型号',
			align : 'center',
			width : 100,
			dataIndex : 'DJ_TYPE'
		}, {
			text : '修理类别',
			align : 'center',
			width : 120,
			dataIndex : 'MENDTYPE_DESC'
		}, {
			text : '结算价格',
			align : 'center',
			dataIndex : 'F_PRICE',
			width : 120
		}, {
			text : '容量',
			align : 'center',
			dataIndex : 'DJ_VOL',
			width : 100
		}, {
			text : '相数',
			align : 'center',
			dataIndex : 'DJ_SX',
			width : 100
		}, {
			text : '槽数',
			align : 'center',
			dataIndex : 'DJ_CS',
			width : 80
		}, {
			text : '定子槽数',
			align : 'center',
			dataIndex : 'DJ_DZ_CS',
			width : 80
		}, {
			text : '转子槽数',
			align : 'center',
			dataIndex : 'DJ_ZZ_CS',
			width : 80
		}, {
			text : '系列分类',
			align : 'center',
			dataIndex : 'SERIES_CLASS_DESC',
			width : 150
		}, {
			text : '备注',
			align : 'center',
			dataIndex : 'REMARK',
			width : 240
		}, {
			text : '修改',
			align : 'center',
			renderer : right,
			width : 80,
			renderer : renderer_edit
		} ],
		dockedItems : [ panel ]
	});
	var window = Ext.create('Ext.window.Window', {
		id : 'dialogAdd',
		closeAction : 'hide',
		title : '增加',
		width : 560,
		height : 420,
		modal : true,
		frame : true,
		layout : 'vbox',
		items : [ {
			xtype : 'panel',
			frame : true,
			baseCls : 'my-panel-noborder',
			layout : 'hbox',
			items : [ {
				xtype : 'panel',
				frame : true,
				baseCls : 'my-panel-noborder',
				layout : 'vbox',
				items : [ {
					xtype : 'combo',
					labelAlign : 'right',
					style : ' margin: 30px 0px 0px 0px',
					fieldLabel : '系列分类',
					editable : false,
					queryMode : 'local',
					displayField : 'SERIES_CLASS_DESC',
					valueField : 'SERIES_CLASS',
					id : 'seriestype_add',
					labelWidth : 80,
					store : 'xlStore_add'
				}, {
					xtype : 'combo',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					fieldLabel : '修理类别',
					editable : false,
					queryMode : 'local',
					displayField : 'MENDTYPE_DESC',
					valueField : 'MENDTYPE',
					id : 'mendtype_add',
					labelWidth : 80,
					store : 'xllbStore_add'
				}, {
					xtype : 'textfield',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					value : '',
					fieldLabel : '相数',
					id : 'xs_add',
					labelWidth : 80
				}, {
					xtype : 'textfield',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					value : '',
					fieldLabel : '定子槽数',
					id : 'dzcs_add',
					labelWidth : 80
				}, {
					xtype : 'textfield',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					value : '',
					fieldLabel : '结算价格',
					id : 'price_add',
					labelWidth : 80
				} ]
			}, {
				xtype : 'panel',
				frame : true,
				baseCls : 'my-panel-noborder',
				layout : 'vbox',
				items : [ {
					xtype : 'combo',
					labelAlign : 'right',
					style : ' margin: 30px 0px 0px 0px',
					fieldLabel : '电机型号',
					editable : false,
					queryMode : 'local',
					displayField : 'DJ_TYPE',
					valueField : 'DJ_TYPE',
					id : 'djtype_add',
					labelWidth : 80,
					store : 'djxhStore_add'
				}, {
					xtype : 'textfield',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					value : '',
					fieldLabel : '容量',
					id : 'rl_add',
					labelWidth : 80
				}, {
					xtype : 'textfield',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					value : '',
					fieldLabel : '槽数',
					id : 'cs_add',
					labelWidth : 80
				}, {
					xtype : 'textfield',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					value : '',
					fieldLabel : '转子槽数',
					id : 'zzcs_add',
					labelWidth : 80
				} ]
			} ]
		}, {
			xtype : 'panel',
			frame : true,
			baseCls : 'my-panel-noborder',
			layout : 'hbox',
			items : [ {
				xtype : 'textareafield',
				grow : true,
				id : 'remark_add',
				style : ' margin: 20px 0px 0px 5px',
				fieldLabel : '备注',
				labelAlign : 'right',
				width : 425,
				height : 60,
				labelWidth : 80
			} ]
		} ],
		buttons : [ {
			id : 'sureedit',
			text : '保存',
			width : 60,
			listeners : {
				click : OnClickSubmitAdd
			}
		} ]
	});
	var window = Ext.create('Ext.window.Window', {
		id : 'dialogEdit',
		closeAction : 'hide',
		title : '修改',
		width : 560,
		height : 420,
		modal : true,
		frame : true,
		layout : 'vbox',
		items : [ {
			xtype : 'panel',
			frame : true,
			baseCls : 'my-panel-noborder',
			layout : 'hbox',
			items : [ {
				xtype : 'panel',
				frame : true,
				baseCls : 'my-panel-noborder',
				layout : 'vbox',
				items : [ {
					xtype : 'combo',
					labelAlign : 'right',
					style : ' margin: 30px 0px 0px 0px',
					fieldLabel : '系列分类',
					editable : false,
					queryMode : 'local',
					displayField : 'SERIES_CLASS_DESC',
					valueField : 'SERIES_CLASS',
					id : 'seriestype_edit',
					labelWidth : 80,
					store : 'xlStore_edit'
				}, {
					xtype : 'combo',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					fieldLabel : '修理类别',
					editable : false,
					queryMode : 'local',
					displayField : 'MENDTYPE_DESC',
					valueField : 'MENDTYPE',
					id : 'mendtype_edit',
					labelWidth : 80,
					store : 'xllbStore_edit'
				}, {
					xtype : 'textfield',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					value : '',
					fieldLabel : '相数',
					id : 'xs_edit',
					labelWidth : 80
				}, {
					xtype : 'textfield',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					value : '',
					fieldLabel : '定子槽数',
					id : 'dzcs_edit',
					labelWidth : 80
				}, {
					xtype : 'textfield',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					value : '',
					fieldLabel : '结算价格',
					id : 'price_edit',
					labelWidth : 80
				} ]
			}, {
				xtype : 'panel',
				frame : true,
				baseCls : 'my-panel-noborder',
				layout : 'vbox',
				items : [ {
					xtype : 'combo',
					labelAlign : 'right',
					style : ' margin: 30px 0px 0px 0px',
					fieldLabel : '电机型号',
					editable : false,
					queryMode : 'local',
					displayField : 'DJ_TYPE',
					valueField : 'DJ_TYPE',
					id : 'djtype_edit',
					labelWidth : 80,
					store : 'djxhStore_edit'
				}, {
					xtype : 'textfield',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					value : '',
					fieldLabel : '容量',
					id : 'rl_edit',
					labelWidth : 80
				}, {
					xtype : 'textfield',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					value : '',
					fieldLabel : '槽数',
					id : 'cs_edit',
					labelWidth : 80
				}, {
					xtype : 'textfield',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					value : '',
					fieldLabel : '转子槽数',
					id : 'zzcs_edit',
					labelWidth : 80
				} ]
			} ]
		}, {
			xtype : 'panel',
			frame : true,
			baseCls : 'my-panel-noborder',
			layout : 'hbox',
			items : [ {
				xtype : 'textareafield',
				grow : true,
				id : 'remark_edit',
				style : ' margin: 20px 0px 0px 5px',
				fieldLabel : '备注',
				labelAlign : 'right',
				width : 425,
				height : 60,
				labelWidth : 80
			} ]
		} ],
		buttons : [ {
			text : '保存',
			width : 60,
			listeners : {
				click : OnClickSubmitEdit
			}
		} ]
	});
	Ext.data.StoreManager.lookup('xlStore').on('load', function(me) {
		me.insert(0, {
			'SERIES_CLASS_DESC' : '全部',
			'SERIES_CLASS' : '%'
		});
		Ext.getCmp("seriestype").select(me.first());
	});
	Ext.data.StoreManager.lookup('xlStore_add').on('load', function(me) {
		Ext.getCmp("seriestype_add").select(me.first());
	});
	Ext.data.StoreManager.lookup('xllbStore').on('load', function(me) {
		me.insert(0, {
			'MENDTYPE_DESC' : '全部',
			'MENDTYPE' : '%'
		});
		Ext.getCmp("mendtype").select(me.first());
	});
	Ext.data.StoreManager.lookup('xllbStore_add').on('load', function(me) {
		Ext.getCmp("mendtype_add").select(me.first());
	});
	Ext.getCmp('seriestype_add').on('change', function(me) {
		Ext.data.StoreManager.lookup('djxhStore_add').load({
			params : {
				dj_type_in:Ext.getCmp('seriestype_add').getValue()
			}
		});
	});
	Ext.data.StoreManager.lookup('djxhStore_add').on('load', function(me) {
		Ext.getCmp("djtype_add").select(me.first());
	});
	Ext.data.StoreManager.lookup('djxhStore_edit').on(
		'load',
		function(me) {
			var item = me.findRecord('DJ_TYPE', globl_code);
			if (item == null) {
				Ext.getCmp("djtype_edit").select(me.first());
			} else {
				Ext.getCmp("djtype_edit").select(
					me.findRecord('DJ_TYPE', globl_code));
			}
		});
	Ext.create('Ext.container.Viewport', {
		layout : 'fit',
		items : [ grid ]
	});
	Ext.getStore("xlStore_edit").on("load", function() {
		com_edit2();
	});
	Ext.getCmp('seriestype_edit').on('change', function(me) {
		com_edit2();
	});
});
function com_edit2() {
	Ext.data.StoreManager.lookup('djxhStore_edit').load({
		params : {
			dj_type_in:Ext.getCmp('seriestype_edit').getValue()
		}
	});
}
function OnClickSearch() {
	Ext.data.StoreManager.lookup('gridStore')
		.load(
		{
			params : {
				series_class_in:Ext.getCmp('seriestype').getValue(),
				dj_type_in:Ext.getCmp('dj_desc').getValue(),
				mendtype_in:Ext.getCmp('mendtype').getValue()
			}
		});
}
function OnClickAdd() {
	Ext.getCmp('price_add').setValue("");
	Ext.getCmp('rl_add').setValue("");
	Ext.getCmp('xs_add').setValue("");
	Ext.getCmp('cs_add').setValue("");
	Ext.getCmp('dzcs_add').setValue("");
	Ext.getCmp('zzcs_add').setValue("");
	Ext.getCmp('remark_add').setValue("");
	Ext.getCmp('dialogAdd').show();
}
function OnClickDelete() {
	Ext.Msg.confirm('提示', '是否删除?', function(button) {
		if (button == "yes") {
			OnClickSubmitDelete();
		}
	});
}
function OnClickEdit() {
	var selectModel = Ext.getCmp("grid").getSelectionModel().getSelection();
	if (selectModel.length > 1) {
		Ext.Msg.alert('提示', '不能同时修改多条记录！');
	} else if (selectModel.length > 0) {
		globl_code = selectModel[0].data.DJ_TYPE;
		globl_xl_code = selectModel[0].data.SERIES_CLASS;
		Ext.getCmp('seriestype_edit').select(globl_xl_code);
		Ext.getCmp('mendtype_edit').select(selectModel[0].data.MENDTYPE);
		Ext.getCmp('price_edit').setValue(selectModel[0].data.F_PRICE);
		Ext.getCmp('rl_edit').setValue(selectModel[0].data.DJ_VOL);
		Ext.getCmp('cs_edit').setValue(selectModel[0].data.DJ_CS);
		Ext.getCmp('xs_edit').setValue(selectModel[0].data.DJ_SX);
		Ext.getCmp('dzcs_edit').setValue(selectModel[0].data.DJ_DZ_CS);
		Ext.getCmp('zzcs_edit').setValue(selectModel[0].data.DJ_ZZ_CS);
		Ext.getCmp('remark_edit').setValue(selectModel[0].data.REMARK);
		Ext.getStore("xlStore_edit").load();
		Ext.getCmp('dialogEdit').show();
	} else {
		Ext.Msg.alert('提示', '请选择一条记录！');
	}
}
function atleft(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return value;
}
function right(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:right;";
	return value;
}
function OnClickSubmitAdd() {
	if (Ext.getCmp('price_add').getValue() == '') {
		Ext.Msg.alert('错误操作', '价格不能为空!')
	} else if (Ext.getCmp('rl_add').getValue() == '') {
		Ext.Msg.alert('错误操作', '容量不能为空!')
	} else if (Ext.getCmp('remark_add').getValue() == '') {
		Ext.Msg.alert('错误操作', '备注不能为空!')
	} else if (Ext.getCmp('cs_add').getValue() == '') {
		Ext.Msg.alert('错误操作', '槽数不能为空!')
	} else if (Ext.getCmp('dzcs_add').getValue() == '') {
		Ext.Msg.alert('错误操作', '定子槽数不能为空!')
	} else if (Ext.getCmp('zzcs_add').getValue() == '') {
		Ext.Msg.alert('错误操作', '转子槽数不能为空!')
	} else if (Ext.getCmp('xs_add').getValue() == '') {
		Ext.Msg.alert('错误操作', '相数不能为空!')
	} else {
		Ext.Ajax.request({
			url: AppUrl + 'DJ/pro_dj112_adddjmendprice_jx',
			method : 'post',
			async:false,
			params : {
				DJ_TYPE_in:Ext.getCmp('djtype_add').getValue(),
				MENDTYPE_in:Ext.getCmp('mendtype_add').getValue(),
				F_PRICE_in:Ext.getCmp('price_add').getValue(),
				DJ_VOL_in:Ext.getCmp('rl_add').getValue(),
				DJ_SX_in:Ext.getCmp('xs_add').getValue(),
				DJ_CS_in:Ext.getCmp('cs_add').getValue(),
				DJ_DZ_CS_in:Ext.getCmp('dzcs_add').getValue(),
				DJ_ZZ_CS_in:Ext.getCmp('zzcs_add').getValue(),
				SERIES_CLASS_in:Ext.getCmp('seriestype_add').getValue(),
				REMARK_in:Ext.getCmp('remark_add').getValue()

			},
			success : function(response) {
				var resp=Ext.decode(response.responseText);
				if (resp.ret == 'Success') {
					alert('操作成功！');
					Ext.getCmp('dialogAdd').hide();
					OnClickSearch();
				}else {
					alert('操作失败！');
				}
			}

		});

	}
}
function OnClickSubmitDelete() {
	var i_err = 0;
	var length = Ext.getCmp('grid').getSelectionModel().getSelection().length;
	if (length == 0) {
		Ext.Msg.alert('操作信息', '请选择需要删除的数据');
	} else {
		for ( var i = 0; i < length; i++) {

			Ext.Ajax.request({
				url: AppUrl + 'DJ/pro_dj112_deletedjmendprice_jx',
				method : 'post',
				async:false,
				params : {
					id_in:Ext.getCmp('grid').getSelectionModel()
						.getSelection()[i].data.ID
				},
				success : function(response) {
					var resp=Ext.decode(response.responseText);
					if (resp.ret == 'Success') {
						i_err++;
					}else {
					}
				}

			});
		}
		if (i_err == 0) {
			Ext.Msg.alert('操作信息', '删除失败');
		} else {
			OnClickSearch();
		}
	}
	;
}
function OnClickSubmitEdit() {
	if (Ext.getCmp('price_edit').getValue() == '') {
		Ext.Msg.alert('错误操作', '价格不能为空!')
	} else if (Ext.getCmp('rl_edit').getValue() == '') {
		Ext.Msg.alert('错误操作', '容量不能为空!')
	} else if (Ext.getCmp('remark_edit').getValue() == '') {
		Ext.Msg.alert('错误操作', '备注不能为空!')
	} else if (Ext.getCmp('cs_edit').getValue() == '') {
		Ext.Msg.alert('错误操作', '槽数不能为空!')
	} else if (Ext.getCmp('dzcs_edit').getValue() == '') {
		Ext.Msg.alert('错误操作', '定子槽数不能为空!')
	} else if (Ext.getCmp('zzcs_edit').getValue() == '') {
		Ext.Msg.alert('错误操作', '转子槽数不能为空!')
	} else if (Ext.getCmp('xs_edit').getValue() == '') {
		Ext.Msg.alert('错误操作', '相数不能为空!')
	} else {

		Ext.Ajax.request({
			url: AppUrl + 'DJ/pro_dj112_updatedjmendprice_jx',
			method : 'post',
			async:false,
			params : {
				ID_in:Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.ID,
				DJ_TYPE_in:Ext.getCmp('djtype_edit').getValue(),
				MENDTYPE_in:Ext.getCmp('mendtype_edit').getValue(),
				F_PRICE_in:Ext.getCmp('price_edit').getValue(),
				DJ_VOL_in:Ext.getCmp('rl_edit').getValue(),
				DJ_SX_in:Ext.getCmp('xs_edit').getValue(),
				DJ_CS_in:Ext.getCmp('cs_edit').getValue(),
				DJ_DZ_CS_in:Ext.getCmp('dzcs_edit').getValue(),
				DJ_ZZ_CS_in:Ext.getCmp('zzcs_edit').getValue(),
				SERIES_CLASS_in:Ext.getCmp('seriestype_edit').getValue(),
				REMARK_in:Ext.getCmp('remark_edit').getValue()

			},
			success : function(response) {
				var resp=Ext.decode(response.responseText);
				if (resp.ret == 'Success') {
					alert('操作成功！');
					Ext.getCmp('dialogEdit').hide();
					OnClickSearch();
				}else {
					alert('操作失败！');
				}
			}

		});
	}
}
function renderer_edit(value, metaData, record, rowIdx, colIdx, store, view) {
	return "<img src='" + imgpath
		+ "/edit.png' style='cursor:pointer' onclick='OnClickEdit(\""
		+ record.data.MONEY_TYPE + "\")' />"
}
function OnClickOutExcel() {

	var series_class_in=Ext.getCmp('seriestype').getValue()=='%'?'0':Ext.getCmp('seriestype').getValue();
	var mendtype_in=Ext.getCmp('mendtype').getValue()=='%'?'0':Ext.getCmp('mendtype').getValue();
	document.location.href=AppUrl + 'DJ/DJ112EXCEL?series_class_in='+series_class_in+
		'&dj_type_in='+Ext.getCmp('dj_desc').getValue()+
		'&mendtype_in='+mendtype_in;

	/*var tableName = [ "序号", "型号", "修理类别", "结算价格", "容量", "相数", "槽数", "定子槽数",
	 "转子槽数", "系列分类", "备注" ];
	 var tableKey = [ 'DJ_TYPE', 'MENDTYPE_DESC', 'F_PRICE', 'DJ_VOL', 'DJ_SX',
	 'DJ_CS', 'DJ_DZ_CS', 'DJ_ZZ_CS', 'SERIES_CLASS_DESC', 'REMARK', ];

	 parName = [ 'series_class_in', 'dj_type_in', 'mendtype_in' ];
	 var parType = [ 's', 's', 's' ];
	 var parVal = [ IsNull(Ext.getCmp('seriestype').getValue()),
	 IsNull(Ext.getCmp('dj_desc').getValue()),
	 IsNull(Ext.getCmp('mendtype').getValue()) ];
	 var proName = 'PRO_DJ112_SELECTDJMENDPRICE_JX';
	 var ExcelName = 'Excel';
	 var cursorName = 'RET';

	 var returnStr = [ 'null' ];
	 var returnStrName = [ 'null' ];
	 var returnStrType = [ 'null' ];

	 submitData("ModelExcelTotal", tableName, tableKey, parName, parType,
	 parVal, proName, returnStr, returnStrType, returnStrName,
	 cursorName, "tital", "电机（卷线部分）修理价格管理表");*/
}
function IsNull(value) {
	if (value == "" || value == null) {
		return 'null'
	} else {
		return value;
	}
}
