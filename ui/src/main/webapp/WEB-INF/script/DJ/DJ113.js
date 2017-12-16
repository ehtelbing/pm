Ext.onReady(function() {
	var fylxStore = Ext.create('Ext.data.Store', {
		autoLoad : true,
		storeId : 'fylxStore',
		fields : [ 'MONEY_CLASS', 'MONEY_CLASS_DESC' ],
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj104_moneyclass_able',
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
	var fyStore = Ext.create('Ext.data.Store', {
		autoLoad : false,
		storeId : 'fyStore',
		fields : [ 'MONEY_TYPE', 'MONEY_TYPE_DESC' ],
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj105_moneytype_able',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			}
		}
	});
	var fyStore_add = Ext.create('Ext.data.Store', {
		autoLoad : false,
		storeId : 'fyStore_add',
		fields : [ 'MONEY_TYPE', 'MONEY_TYPE_DESC' ],
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj105_moneytype_able',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
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
	var gridStore = Ext.create('Ext.data.Store', {
		storeId : 'gridStore',
		autoLoad : false,
		fields : [ 'PROJTYPE_ID', 'PROJTYPE_DESC', 'REMARK', 'MONEY_TYPE',
			'F_PRICE', 'MENDTYPE', 'MONEY_TYPE_DESC', 'MENDTYPE_DESC' ],
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj113_selectdjmendprice_p',
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
			frame : true,
			baseCls : 'my-panel-noborder',
			layout : 'hbox',
			items : [ {
				xtype : 'combo',
				labelAlign : 'right',
				style : ' margin: 0px 0px 0px 20px',
				fieldLabel : '费用类型',
				editable : false,
				//readOnly : true,
				queryMode : 'local',
				displayField : 'MONEY_CLASS_DESC',
				valueField : 'MONEY_CLASS',
				id : 'fylxtype',
				labelWidth : 80,
				store : 'fylxStore',
				//width : 120
			},
				{
					xtype : 'combo',
					labelAlign : 'right',
					style : ' margin: 0px 0px 0px 20px',
					fieldLabel : '费用分类',
					editable : false,
					queryMode : 'local',
					displayField : 'MONEY_TYPE_DESC',
					valueField : 'MONEY_TYPE',
					id : 'moneytype',
					labelWidth : 80,
					store : 'fyStore'
				},
				{
					xtype : 'textfield',
					labelAlign : 'right',
					style : ' margin: 0px 0px 0px 20px',
					value : '',
					fieldLabel : '工程类型名称',
					id : 'gclx_desc',
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
		autoScroll : true,
		selType : 'checkboxmodel',
		selModel : {
			showHeaderCheckbox : false
		},
		columns : [ {
			text : '工程类型名称',
			align : 'center',
			width : 100,
			dataIndex : 'PROJTYPE_DESC'
		}, {
			text : '修理类别',
			align : 'center',
			width : 100,
			dataIndex : 'MENDTYPE_DESC'
		}, {
			text : '费用分类',
			align : 'center',
			width : 100,
			dataIndex : 'MONEY_TYPE_DESC'
		}, {
			text : '价格',
			align : 'center',
			dataIndex : 'F_PRICE',
			width : 100
		}, {
			text : '备注',
			align : 'center',
			dataIndex : 'REMARK',
			width : 300
		}, {
			text : '修改',
			align : 'center',
			width : 80,
			renderer : renderer_edit
		} ],
		dockedItems : [ panel ]
	});
	var window = Ext.create('Ext.window.Window', {
		id : 'dialogAdd',
		closeAction : 'hide',
		title : '增加',
		width : 550,
		height : 320,
		modal : true,
		frame : true,
		layout : 'vbox',
		items : [ {
			xtype : 'panel',
			frame : true,
			baseCls : 'my-panel-noborder',
			layout : 'hbox',
			items : [ {
				xtype : 'textfield',
				labelAlign : 'right',
				style : ' margin: 20px 0px 0px 0px',
				value : '',
				fieldLabel : '工程类型名称',
				id : 'gclx_add',
				labelWidth : 80,
				width : 430
			} ]
		}, {
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
					style : ' margin: 20px 0px 0px 0px',
					fieldLabel : '费用分类',
					editable : false,
					queryMode : 'local',
					displayField : 'MONEY_TYPE_DESC',
					valueField : 'MONEY_TYPE',
					id : 'moneytype_add',
					labelWidth : 80,
					store : 'fyStore_add'
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
				style : ' margin: 20px 0px 0px 0px',
				fieldLabel : '备注',
				labelAlign : 'right',
				width : 430,
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
		width : 550,
		height : 320,
		modal : true,
		frame : true,
		layout : 'vbox',
		items : [ {
			xtype : 'panel',
			frame : true,
			baseCls : 'my-panel-noborder',
			layout : 'hbox',
			items : [ {
				xtype : 'textfield',
				labelAlign : 'right',
				style : ' margin: 20px 0px 0px 0px',
				value : '',
				fieldLabel : '工程类型名称',
				id : 'gclx_edit',
				width : 435,
				labelWidth : 80
			} ]
		}, {
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
					style : ' margin: 20px 0px 0px 0px',
					fieldLabel : '修理类别',
					editable : false,
					queryMode : 'local',
					displayField : 'MENDTYPE_DESC',
					valueField : 'MENDTYPE',
					id : 'mendtype_edit',
					labelWidth : 80,
					store : 'xllbStore_add'
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
					style : ' margin: 20px 0px 0px 0px',
					fieldLabel : '费用分类',
					editable : false,
					queryMode : 'local',
					displayField : 'MONEY_TYPE_DESC',
					valueField : 'MONEY_TYPE',
					id : 'moneytype_edit',
					labelWidth : 80,
					store : 'fyStore_add'
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
				width : 430,
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
	Ext.data.StoreManager.lookup('fylxStore').on('load', function(me) {
		//Ext.getCmp("fylxtype").select(me.findRecord('MONEY_CLASS', '工程'));
		Ext.getCmp("fylxtype").select(me.first());
		money_load();
	});
	Ext.data.StoreManager.lookup('fyStore').on('load', function(me) {
		me.insert(0, {
			'MONEY_TYPE_DESC' : '全部',
			'MONEY_TYPE' : '%'
		});
		Ext.getCmp("moneytype").select(me.first());
	});
	Ext.data.StoreManager.lookup('fyStore_add').on('load', function(me) {
		Ext.getCmp("moneytype_add").select(me.first());
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
	Ext.create('Ext.container.Viewport', {
		layout : 'fit',
		items : [ grid ]
	});
});
function money_load() {
	Ext.data.StoreManager.lookup('fyStore').load({
		params : {
			money_class_in: Ext.getCmp('fylxtype').getValue()
		}
	});
	Ext.data.StoreManager.lookup('fyStore_add').load({
		params : {
			money_class_in: Ext.getCmp('fylxtype').getValue()
		}
	});
}
function OnClickSearch() {
	Ext.data.StoreManager.lookup('gridStore').load(
		{
			params : {
				money_type_in:Ext.getCmp('moneytype').getValue(),
				projtype_desc_in:Ext.getCmp('gclx_desc').getValue(),
				mendtype_in:Ext.getCmp('mendtype').getValue()
			}
		});
}
function OnClickAdd() {
	Ext.getCmp('gclx_add').setValue("");
	Ext.getCmp('price_add').setValue("");
	Ext.getCmp('remark_add').setValue("");
	Ext.getCmp('dialogAdd').show();
}
function OnClickEdit() {
	var selectModel = Ext.getCmp("grid").getSelectionModel().getSelection();
	if (selectModel.length > 0) {
		Ext.getCmp('moneytype_edit').select(selectModel[0].data.MONEY_TYPE);
		Ext.getCmp('mendtype_edit').select(selectModel[0].data.MENDTYPE);
		Ext.getCmp('gclx_edit').setValue(selectModel[0].data.PROJTYPE_DESC);
		Ext.getCmp('price_edit').setValue(selectModel[0].data.F_PRICE);
		Ext.getCmp('remark_edit').setValue(selectModel[0].data.REMARK);
		Ext.getCmp('dialogEdit').show();
	} else {
		Ext.Msg.alert('提示', '请选择一条记录！');
	}
}
function OnClickDelete() {
	Ext.Msg.confirm('提示', '是否删除?', function(button) {
		if (button == "yes") {
			OnClickSubmitDelete();
		}
	});
}
function OnClickSubmitAdd() {
	if (Ext.getCmp('gclx_add').getValue() == '') {
		Ext.Msg.alert('错误操作', '工程类型不能为空!')
	} else if (Ext.getCmp('price_add').getValue() == '') {
		Ext.Msg.alert('错误操作', '价格不能为空!')
	} else if (Ext.getCmp('remark_add').getValue() == '') {
		Ext.Msg.alert('错误操作', '备注不能为空!')
	} else {
		Ext.Ajax.request({
			url: AppUrl + 'DJ/pro_dj113_adddjmendprice_p',
			method : 'post',
			async:false,
			params : {
				PROJTYPE_DESC_id:Ext.getCmp('gclx_add').getValue(),
				REMARK_in:Ext.getCmp('remark_add').getValue(),
				MONEY_TYPE_in:Ext.getCmp('moneytype_add').getValue(),
				F_PRICE_in:Ext.getCmp('price_add').getValue(),
				MENDTYPE_in:Ext.getCmp('mendtype_add').getValue()

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
function OnClickSubmitEdit() {
	if (Ext.getCmp('gclx_edit').getValue() == '') {
		Ext.Msg.alert('错误操作', '工程类型不能为空!')
	} else if (Ext.getCmp('price_edit').getValue() == '') {
		Ext.Msg.alert('错误操作', '价格不能为空!')
	} else if (Ext.getCmp('remark_edit').getValue() == '') {
		Ext.Msg.alert('错误操作', '备注不能为空!')
	} else {

		Ext.Ajax.request({
			url: AppUrl + 'DJ/pro_dj113_updatedjmendprice_p',
			method : 'post',
			async:false,
			params : {
				PROJTYPE_ID_in:Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.PROJTYPE_ID,
				PROJTYPE_DESC_in:Ext.getCmp('gclx_edit').getValue(),
				REMARK_in:Ext.getCmp('remark_edit').getValue(),
				MONEY_TYPE_in:Ext.getCmp('moneytype_edit').getValue(),
				F_PRICE_in:Ext.getCmp('price_edit').getValue(),
				MENDTYPE_in:Ext.getCmp('mendtype_edit').getValue()

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
function OnClickSubmitDelete() {
	var i_err = 0;
	var length = Ext.getCmp('grid').getSelectionModel().getSelection().length;
	if (length == 0) {
		Ext.Msg.alert('操作信息', '请选择需要删除的数据');
	} else {
		for ( var i = 0; i < length; i++) {

			Ext.Ajax.request({
				url: AppUrl + 'DJ/pro_dj113_deletedjmendprice_p',
				method : 'post',
				async:false,
				params : {
					projtype_id_in:Ext.getCmp('grid').getSelectionModel()
						.getSelection()[i].data.PROJTYPE_ID
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
	};
}
function OnClickOutExcel() {
	var money_type_in=Ext.getCmp('moneytype').getValue()=='%'?'0':Ext.getCmp('moneytype').getValue();
	var mendtype_in=Ext.getCmp('mendtype').getValue()=='%'?'0':Ext.getCmp('mendtype').getValue();
	document.location.href=AppUrl + 'DJ/DJ113EXCEL?money_type_in='+money_type_in+
		'&projtype_desc_in='+Ext.getCmp('gclx_desc').getValue()+
		'&mendtype_in='+mendtype_in;

	/*var tableName = [ "序号", "工程类型名称", "修理类别", "费用分类", "价格", "备注" ];
	 var tableKey = [ 'PROJTYPE_DESC', 'MENDTYPE_DESC', 'MONEY_TYPE_DESC',
	 'F_PRICE', 'REMARK' ];

	 parName = [ 'money_type_in', 'projtype_desc_in', 'mendtype_in' ];
	 var parType = [ 's', 's', 's' ];
	 var parVal = [ IsNull(Ext.getCmp('moneytype').getValue()),
	 IsNull(Ext.getCmp('gclx_desc').getValue()),
	 IsNull(Ext.getCmp('mendtype').getValue()) ];
	 var proName = 'PRO_DJ113_SELECTDJMENDPRICE_P';
	 var ExcelName = 'Excel';
	 var cursorName = 'RET';

	 var returnStr = [ 'null' ];
	 var returnStrName = [ 'null' ];
	 var returnStrType = [ 'null' ];

	 submitData("ModelExcelTotal", tableName, tableKey, parName, parType,
	 parVal, proName, returnStr, returnStrType, returnStrName,
	 cursorName, "tital", "工程维修价格管理表");*/
}
function IsNull(value) {
	if (value == "" || value == null) {
		return 'null'
	} else {
		return value;
	}
}
function renderer_edit(value, metaData, record, rowIdx, colIdx, store, view) {
	return "<img src='" + imgpath
		+ "/edit.png' style='cursor:pointer' onclick='OnClickEdit(\""
		+ record.data.MONEY_TYPE + "\")' />"
}