var STATUS_ID = "";
var globl_code = '';
var globl_xl_code = '';
Ext.onReady(function() {
	var byqxlSStore = Ext.create('Ext.data.Store', {
		autoLoad : true,
		storeId : 'byqxlSStore',
		fields : [ 'BYQ_SERIES_CLASS', 'BYQ_SERIES_CLASS_DESC' ],
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj108_byqseries_able',
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

	var byqxladdStore = Ext.create('Ext.data.Store', {
		autoLoad : false,
		storeId : 'byqxladdStore',
		fields : [ 'BYQ_SERIES_CLASS', 'BYQ_SERIES_CLASS_DESC' ],
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj108_byqseries_able',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			}
		}
	});
	var byqxleditStore = Ext.create('Ext.data.Store', {
		autoLoad : false,
		storeId : 'byqxleditStore',
		fields : [ 'BYQ_SERIES_CLASS', 'BYQ_SERIES_CLASS_DESC' ],
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj108_byqseries_able',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			}
		}
	});
	var xllbSStore = Ext.create('Ext.data.Store', {
		autoLoad : true,
		storeId : 'xllbSStore',
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
	var byqxhStore = Ext.create('Ext.data.Store', {
		autoLoad : false,
		storeId : 'byqxhStore',
		fields : [ 'BYQ_TYPE', 'BYQ_TYPE' ],
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj109_byqtype_able',
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
		fields : [ 'ID', 'BYQ_TYPE', 'BYQ_VOL', 'BYQ_XS', 'BYQ_V', 'MENDTYPE',
				'F_PRICE', 'REMARK', 'BYQ_SERIES', 'MENDTYPE_DESC',
				'BYQ_SERIES_CLASS_DESC', 'BYQ_SERIES_CLASS' ],
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj110_selectbyqmendprice',
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
				displayField : 'BYQ_SERIES_CLASS_DESC',
				valueField : 'BYQ_SERIES_CLASS',
				id : 'seriestype',
				labelWidth : 80,
				store : 'byqxlSStore'
			}, {
				xtype : 'textfield',
				labelAlign : 'right',
				style : ' margin: 0px 0px 0px 20px',
				value : '',
				fieldLabel : '变压器型号',
				id : 'byq_desc',
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
				store : 'xllbSStore'
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
					click : Query
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
			dataIndex : 'BYQ_TYPE'
		}, {
			text : '容量',
			align : 'center',
			width : 100,
			dataIndex : 'BYQ_VOL'
		}, {
			text : '相数',
			align : 'center',
			width : 100,
			dataIndex : 'BYQ_XS'
		}, {
			text : '电压',
			align : 'center',
			dataIndex : 'BYQ_V',
			width : 100
		}, {
			text : '修理类别',
			align : 'center',
			dataIndex : 'MENDTYPE_DESC',
			width : 150
		}, {
			text : '结算价格',
			align : 'center',
			dataIndex : 'F_PRICE',
			width : 100
		}, {
			text : '备注',
			align : 'center',
			dataIndex : 'REMARK',
			width : 300
		}, {
			text : '系列分类',
			align : 'center',
			dataIndex : 'BYQ_SERIES_CLASS_DESC',
			width : 150
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
		height : 350,
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
					displayField : 'BYQ_SERIES_CLASS_DESC',
					valueField : 'BYQ_SERIES_CLASS',
					id : 'seriestype_add',
					labelWidth : 80,
					store : 'byqxladdStore'
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
					store : 'xllbStore'
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
					fieldLabel : '变压器型号',
					editable : false,
					queryMode : 'local',
					displayField : 'BYQ_TYPE',
					valueField : 'BYQ_TYPE',
					id : 'byqtype_add',
					labelWidth : 80,
					store : 'byqxhStore'
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
					fieldLabel : '电压',
					id : 'v_add',
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
		height : 350,
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
					displayField : 'BYQ_SERIES_CLASS_DESC',
					valueField : 'BYQ_SERIES_CLASS',
					id : 'seriestype_edit',
					labelWidth : 80,
					store : 'byqxleditStore'
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
					store : 'xllbStore'
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
					fieldLabel : '变压器型号',
					editable : false,
					queryMode : 'local',
					displayField : 'BYQ_TYPE',
					valueField : 'BYQ_TYPE',
					id : 'byqtype_edit',
					labelWidth : 80,
					store : 'byqxhStore'
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
					fieldLabel : '电压',
					id : 'v_edit',
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
			id : 'sureedit',
			text : '保存',
			width : 60,
			listeners : {
				click : OnClickSubmitEdit
			}
		} ]
	});
	Ext.data.StoreManager.lookup('byqxlSStore').on('load', function(me) {
		me.insert(0, {
			'BYQ_SERIES_CLASS_DESC' : '全部',
			'BYQ_SERIES_CLASS' : '%'
		});
		Ext.getCmp("seriestype").select(me.first());
	});

	Ext.data.StoreManager.lookup('xllbSStore').on('load', function(me) {
		me.insert(0, {
			'MENDTYPE_DESC' : '全部',
			'MENDTYPE' : '%'
		});
		Ext.getCmp("mendtype").select(me.first());
	});


	Ext.data.StoreManager.lookup('xllbStore').on('load', function(me) {
		Ext.getCmp("mendtype_add").select(me.first());
	});
	Ext.data.StoreManager.lookup('byqxhStore').on('load', function(me) {
		Ext.getCmp("byqtype_add").select(me.first());
	});

	Ext.data.StoreManager.lookup('byqxladdStore').on('load', function(me) {
		Ext.getCmp("seriestype_add").select(Ext.data.StoreManager.lookup('byqxladdStore').getAt(0));

		Ext.data.StoreManager.lookup('byqxhStore').load({
			params : {
				byq_type_in: Ext.getCmp('seriestype_add').getValue()
			}
		});
	});

	Ext.getCmp('seriestype_add').on('change', function(me) {
		Ext.data.StoreManager.lookup('byqxhStore').load({
			params : {
				byq_type_in:Ext.getCmp('seriestype_add').getValue()
			}
		});
	});

	Ext.data.StoreManager.lookup('byqxhStore').on(
			'load',
			function(me) {
				var item = me.findRecord('BYQ_TYPE', globl_code);
				if (item == null) {
					Ext.getCmp("byqtype_edit").select(me.first());
				} else {
					Ext.getCmp("byqtype_edit").select(
							me.findRecord('BYQ_TYPE', globl_code));
				}
			});

	Ext.getStore("byqxleditStore").on("load", function() {
		Ext.data.StoreManager.lookup('byqxhStore').load({
			params : {
				byq_type_in: Ext.getCmp('seriestype_edit').getValue()
			}
		});
	});
	Ext.getCmp('seriestype_edit').on('change', function(me) {
		Ext.data.StoreManager.lookup('byqxhStore').load({
			params : {
				byq_type_in: Ext.getCmp('seriestype_edit').getValue()
			}
		});
	});
	Ext.create('Ext.container.Viewport', {
		layout : 'fit',
		items : [ grid ]
	});

});
function loadbyqxladdStore(){
	Ext.data.StoreManager.lookup('byqxladdStore').load({
		params : {
		}
	});
}
function loadbyqxleditStore(){
	Ext.data.StoreManager.lookup('byqxleditStore').load({
		params : {
		}
	});
}
function Query() {
	Ext.data.StoreManager.lookup('gridStore')
			.load(
					{
						params : {

							byq_series_in:Ext.getCmp('seriestype').getValue(),
							byq_type_in:Ext.getCmp('byq_desc').getValue(),
							mendtype_in:Ext.getCmp('mendtype').getValue()

						}
					});
}
function OnClickAdd() {
	loadbyqxladdStore();

	Ext.getCmp('xs_add').setValue("");
	Ext.getCmp('price_add').setValue("");
	Ext.getCmp('rl_add').setValue("");
	Ext.getCmp('v_add').setValue("");
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
	loadbyqxleditStore();
	var selectModel = Ext.getCmp("grid").getSelectionModel().getSelection();
	if (selectModel.length > 1) {
		Ext.Msg.alert('提示', '不能同时修改多条记录！');
	} else if (selectModel.length > 0) {
		globl_code = selectModel[0].data.BYQ_TYPE;
		globl_xl_code = selectModel[0].data.BYQ_SERIES_CLASS;
		Ext.getCmp('seriestype_edit').select(globl_xl_code);
		Ext.getCmp('mendtype_edit').setValue(selectModel[0].data.MENDTYPE);
		Ext.getCmp('xs_edit').setValue(selectModel[0].data.BYQ_XS);
		Ext.getCmp('price_edit').setValue(selectModel[0].data.F_PRICE);
		Ext.getCmp('rl_edit').setValue(selectModel[0].data.BYQ_VOL);
		Ext.getCmp('v_edit').setValue(selectModel[0].data.BYQ_V);
		Ext.getCmp('remark_edit').setValue(selectModel[0].data.REMARK);
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
	if (Ext.getCmp('xs_add').getValue() == '') {
		Ext.Msg.alert('错误操作', '相数不能为空!')
	} else if (Ext.getCmp('price_add').getValue() == '') {
		Ext.Msg.alert('错误操作', '价格不能为空!')
	} else if (Ext.getCmp('rl_add').getValue() == '') {
		Ext.Msg.alert('错误操作', '容量不能为空!')
	} else if (Ext.getCmp('v_add').getValue() == '') {
		Ext.Msg.alert('错误操作', '电压不能为空!')
	} else if (Ext.getCmp('remark_add').getValue() == '') {
		Ext.Msg.alert('错误操作', '备注不能为空!')
	} else {

		Ext.Ajax.request({
			url: AppUrl + 'DJ/pro_dj110_addbyqmendprice',
			method : 'post',
			async:false,
			params : {
				BYQ_SERIES_in:Ext.getCmp('seriestype_add').getValue(),
				BYQ_TYPE_in:Ext.getCmp('byqtype_add').getValue(),
				MENDTYPE_in:Ext.getCmp('mendtype_add').getValue(),
				BYQ_VOL_in:Ext.getCmp('rl_add').getValue(),
				BYQ_XS_in:Ext.getCmp('xs_add').getValue(),
				BYQ_V_in:Ext.getCmp('v_add').getValue(),
				F_PRICE_in:Ext.getCmp('price_add').getValue(),
				REMARK_in:Ext.getCmp('remark_add').getValue()
			},
			success : function(response) {
				var resp=Ext.decode(response.responseText);
				if (resp.ret == 'Success') {
					alert('操作成功！');
					Ext.getCmp('dialogAdd').hide();
					Query();
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
				url: AppUrl + 'DJ/pro_dj110_deletebyqmendprice',
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
			Ext.Msg.alert('操作信息', '操作失败');
		} else {
			Query();
		}
	};
}
function OnClickSubmitEdit() {
	if (Ext.getCmp('xs_edit').getValue() == '') {
		Ext.Msg.alert('错误操作', '相数不能为空!')
	} else if (Ext.getCmp('price_edit').getValue() == '') {
		Ext.Msg.alert('错误操作', '价格不能为空!')
	} else if (Ext.getCmp('rl_edit').getValue() == '') {
		Ext.Msg.alert('错误操作', '容量不能为空!')
	} else if (Ext.getCmp('v_edit').getValue() == '') {
		Ext.Msg.alert('错误操作', '电压不能为空!')
	} else if (Ext.getCmp('remark_edit').getValue() == '') {
		Ext.Msg.alert('错误操作', '备注不能为空!')
	} else {

		Ext.Ajax.request({
			url: AppUrl + 'DJ/pro_dj110_updatebyqmendprice',
			method : 'post',
			async:false,
			params : {
				ID_in:Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.ID,
				BYQ_SERIES_in:Ext.getCmp('seriestype_edit').getValue(),
				BYQ_TYPE_in:Ext.getCmp('byqtype_edit').getValue(),
				MENDTYPE_in:Ext.getCmp('mendtype_edit').getValue(),
				BYQ_VOL_in:Ext.getCmp('rl_edit').getValue(),
				BYQ_XS_in:Ext.getCmp('xs_edit').getValue(),
				BYQ_V_in:Ext.getCmp('v_edit').getValue(),
				F_PRICE_in:Ext.getCmp('price_edit').getValue(),
				REMARK_in:Ext.getCmp('remark_edit').getValue()
			},
			success : function(response) {
				var resp=Ext.decode(response.responseText);
				if (resp.ret == 'Success') {
					alert('操作成功！');
					Ext.getCmp('dialogEdit').hide();
					Query();
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
	var byq_series_in=Ext.getCmp('seriestype').getValue()=='%'?'0':Ext.getCmp('seriestype').getValue();
	var mendtype_in=Ext.getCmp('mendtype').getValue()=='%'?'0':Ext.getCmp('seriestype').getValue();
	document.location.href=AppUrl + 'DJ/DJ110EXCEL?byq_series_in='+byq_series_in+
		'&byq_type_in='+Ext.getCmp('byq_desc').getValue()+
		'&mendtype_in='+mendtype_in;

	/*var tableName = [ "序号","型号", "容量", "相数", "电压", "修理类别", "结算价格", "备注", "系列分类" ];
	var tableKey = [ 'BYQ_TYPE', 'BYQ_VOL', 'BYQ_XS', 'BYQ_V', 'MENDTYPE_DESC',
			'F_PRICE', 'REMARK', 'BYQ_SERIES_CLASS_DESC' ];

	parName = [ 'byq_series_in', 'byq_type_in', 'mendtype_in' ];
	var parType = [ 's', 's', 's' ];
	var parVal = [ IsNull(Ext.getCmp('seriestype').getValue()),
			IsNull(Ext.getCmp('byq_desc').getValue()),
			IsNull(Ext.getCmp('mendtype').getValue()) ];
	var proName = 'PRO_DJ110_SELECTBYQMENDPRICE';
	var ExcelName = 'Excel';
	var cursorName = 'RET';

	var returnStr = [ 'null' ];
	var returnStrName = [ 'null' ];
	var returnStrType = [ 'null' ];

	submitData("ModelExcelTotal", tableName, tableKey, parName, parType,
			parVal, proName, returnStr, returnStrType, returnStrName,
			cursorName, "tital", "变压器修理价格管理表");*/
}
function IsNull(value) {
	if (value == "" || value == null) {
		return 'null'
	} else {
		return value;
	}
}
