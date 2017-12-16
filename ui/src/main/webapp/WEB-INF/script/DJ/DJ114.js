var globl_code = '';

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
	var gsStore = Ext.create('Ext.data.Store', {
		autoLoad : true,
		storeId : 'gsStore',
		fields : [ 'GS_TYPE', 'GS_TYPE_DESC' ],
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj103_gstype_able',
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
	var gsStore_add = Ext.create('Ext.data.Store', {
		autoLoad : true,
		storeId : 'gsStore_add',
		fields : [ 'GS_TYPE', 'GS_TYPE_DESC' ],
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj103_gstype_able',
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
	var zjStore = Ext.create('Ext.data.Store', {
		autoLoad : true,
		storeId : 'zjStore',
		fields : [ 'SET_ID', 'SET_DESC' ],
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj115_setclass_able',
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
	var zjStore_add = Ext.create('Ext.data.Store', {
		autoLoad : true,
		storeId : 'zjStore_add',
		fields : [ 'SET_ID', 'SET_DESC' ],
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj115_setclass_able',
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

	var xhStore_add = Ext.create('Ext.data.Store', {
		autoLoad : false,
		storeId : 'xhStore_add',
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
		fields : [ 'ID', 'DJ_TYPE', 'DJ_TYPE_CODE', 'DJ_VOL', 'DJ_V',
			'DJ_CS', 'DJ_DXTYPE', 'DJ_WEIGHT', 'MENDTYPE','GS_TYPE',
			'GS_PRICE', 'MONEY_TYPE', 'MOENY_PRICE', 'SERIES_CLASS',
			'SET_ID', 'MONEY_TYPE_DESC', 'MENDTYPE_DESC', 'GS_TYPE_DESC',
			'SET_DESC'],
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj114_selectdjdingecost',
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
				style : ' margin: 0px 0px 0px 10px',
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
				id : 'djxh',
				labelWidth : 80
			}, {
				xtype : 'combo',
				labelAlign : 'right',
				style : ' margin: 0px 0px 0px 20px',
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
				xtype : 'combo',
				labelAlign : 'right',
				style : ' margin: 5px 0px 0px 10px',
				fieldLabel : '费用类型',
				editable : false,
				//readOnly : true,
				queryMode : 'local',
				displayField : 'MONEY_CLASS_DESC',
				valueField : 'MONEY_CLASS',
				id : 'fylxtype',
				labelWidth : 80,
				store : 'fylxStore',
				width : 160
			}, {
				xtype : 'combo',
				labelAlign : 'right',
				style : ' margin: 5px 0px 0px 20px',
				fieldLabel : '费用分类',
				editable : false,
				queryMode : 'local',
				displayField : 'MONEY_TYPE_DESC',
				valueField : 'MONEY_TYPE',
				id : 'moneytype',
				labelWidth : 80,
				store : 'fyStore'
			}, {
				xtype : 'combo',
				labelAlign : 'right',
				style : ' margin: 5px 0px 0px 20px',
				fieldLabel : '工时分类',
				editable : false,
				queryMode : 'local',
				displayField : 'GS_TYPE_DESC',
				valueField : 'GS_TYPE',
				id : 'gstype',
				labelWidth : 80,
				store : 'gsStore'
			}, {
				xtype : 'combo',
				labelAlign : 'right',
				style : ' margin: 5px 0px 0px 20px',
				fieldLabel : '组件类型',
				editable : false,
				queryMode : 'local',
				displayField : 'SET_DESC',
				valueField : 'SET_ID',
				id : 'zjtype',
				labelWidth : 80,
				store : 'zjStore'
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
			text : '电机型号',
			align : 'center',
			width : 100,
			dataIndex : 'DJ_TYPE'
		}, {
			text : '编号',
			align : 'center',
			width : 100,
			dataIndex : 'DJ_TYPE_CODE'
		}, {
			text : '容量',
			align : 'center',
			width : 80,
			dataIndex : 'DJ_VOL'
		}, {
			text : '电压',
			align : 'center',
			dataIndex : 'DJ_V',
			width : 80
		}, {
			text : '槽数',
			align : 'center',
			dataIndex : 'DJ_CS',
			width : 80
		}, {
			text : '导线规格',
			align : 'center',
			dataIndex : 'DJ_DXTYPE',
			width : 120
		}, {
			text : '重量',
			align : 'center',
			dataIndex : 'DJ_WEIGHT',
			width : 80
		}, {
			text : '组件类型',
			align : 'center',
			dataIndex : 'SET_DESC',
			width : 150
		}, {
			text : '修理类别',
			align : 'center',
			dataIndex : 'MENDTYPE_DESC',
			width : 80
		}, {
			text : '工时定额分类',
			align : 'center',
			dataIndex : 'GS_TYPE_DESC',
			width : 150
		}, {
			text : '工时价格',
			align : 'center',
			dataIndex : 'GS_PRICE',
			width : 80
		}, {
			text : '费用分类',
			align : 'center',
			dataIndex : 'MONEY_TYPE_DESC',
			width : 150
		}, {
			text : '费用价格',
			align : 'center',
			dataIndex : 'MOENY_PRICE',
			width : 80
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
		width : 560,
		height : 400,
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
					style : ' margin: 20px 0px 0px 0px',
					fieldLabel : '系列分类',
					editable : false,
					queryMode : 'local',
					displayField : 'SERIES_CLASS_DESC',
					valueField : 'SERIES_CLASS',
					id : 'seriestype_add',
					labelWidth : 80,
					store : 'xlStore_add'
				}, {
					xtype : 'textfield',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					value : '',
					fieldLabel : '编号',
					id : 'djxhbh_add',
					labelWidth : 80
				}, {
					xtype : 'textfield',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					value : '',
					fieldLabel : '电压',
					id : 'v_add',
					labelWidth : 80
				}, {
					xtype : 'textfield',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					value : '',
					fieldLabel : '导线规格',
					id : 'dxgg_add',
					labelWidth : 80
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
					xtype : 'combo',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					fieldLabel : '工时分类',
					editable : false,
					queryMode : 'local',
					displayField : 'GS_TYPE_DESC',
					valueField : 'GS_TYPE',
					id : 'gstype_add',
					labelWidth : 80,
					store : 'gsStore_add'
				}, {
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
			}, {
				xtype : 'panel',
				frame : true,
				baseCls : 'my-panel-noborder',
				layout : 'vbox',
				items : [ {
					xtype : 'combo',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					fieldLabel : '电机型号',
					editable : false,
					queryMode : 'local',
					displayField : 'DJ_TYPE',
					valueField : 'DJ_TYPE',
					id : 'djxh_add',
					labelWidth : 80,
					store : 'xhStore_add'
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
					fieldLabel : '重量',
					id : 'zl_add',
					labelWidth : 80
				}, {
					xtype : 'combo',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					fieldLabel : '组件类型',
					editable : false,
					queryMode : 'local',
					displayField : 'SET_DESC',
					valueField : 'SET_ID',
					id : 'zjtype_add',
					labelWidth : 80,
					store : 'zjStore_add'
				}, {
					xtype : 'textfield',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					value : '',
					fieldLabel : '工时价格',
					id : 'gsjg_add',
					labelWidth : 80
				}, {
					xtype : 'textfield',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					value : '',
					fieldLabel : '费用价格',
					id : 'fyjg_add',
					labelWidth : 80
				} ]
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
		height : 400,
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
					style : ' margin: 20px 0px 0px 0px',
					fieldLabel : '系列分类',
					editable : false,
					queryMode : 'local',
					displayField : 'SERIES_CLASS_DESC',
					valueField : 'SERIES_CLASS',
					id : 'seriestype_edit',
					labelWidth : 80,
					store : 'xlStore_add'
				}, {
					xtype : 'textfield',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					value : '',
					fieldLabel : '编号',
					id : 'djxhbh_edit',
					labelWidth : 80
				}, {
					xtype : 'textfield',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					value : '',
					fieldLabel : '电压',
					id : 'v_edit',
					labelWidth : 80
				}, {
					xtype : 'textfield',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					value : '',
					fieldLabel : '导线规格',
					id : 'dxgg_edit',
					labelWidth : 80
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
					store : 'xllbStore_add'
				}, {
					xtype : 'combo',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					fieldLabel : '工时分类',
					editable : false,
					queryMode : 'local',
					displayField : 'GS_TYPE_DESC',
					valueField : 'GS_TYPE',
					id : 'gstype_edit',
					labelWidth : 80,
					store : 'gsStore_add'
				}, {
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
			}, {
				xtype : 'panel',
				frame : true,
				baseCls : 'my-panel-noborder',
				layout : 'vbox',
				items : [ {
					xtype : 'combo',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					fieldLabel : '电机型号',
					editable : false,
					queryMode : 'local',
					displayField : 'DJ_TYPE',
					valueField : 'DJ_TYPE',
					id : 'djxh_edit',
					labelWidth : 80,
					store : 'xhStore_add'
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
					fieldLabel : '重量',
					id : 'zl_edit',
					labelWidth : 80
				}, {
					xtype : 'combo',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					fieldLabel : '组件类型',
					editable : false,
					queryMode : 'local',
					displayField : 'SET_DESC',
					valueField : 'SET_ID',
					id : 'zjtype_edit',
					labelWidth : 80,
					store : 'zjStore_add'
				}, {
					xtype : 'textfield',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					value : '',
					fieldLabel : '工时价格',
					id : 'gsjg_edit',
					labelWidth : 80
				}, {
					xtype : 'textfield',
					labelAlign : 'right',
					style : ' margin: 20px 0px 0px 0px',
					value : '',
					fieldLabel : '费用价格',
					id : 'fyjg_edit',
					labelWidth : 80
				} ]
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
	Ext.data.StoreManager.lookup('fylxStore').on('load', function(me) {
		//Ext.getCmp("fylxtype").select(me.findRecord('MONEY_CLASS_DESC', '维修'));
		Ext.getCmp("fylxtype").select(me.first());
		money_load();
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
	Ext.data.StoreManager.lookup('fyStore').on('load', function(me) {
		me.insert(0, {
			'MONEY_TYPE_DESC' : '全部',
			'MONEY_TYPE' : '%'
		});
		Ext.getCmp("moneytype").select(me.first());
	});
	Ext.data.StoreManager.lookup('gsStore').on('load', function(me) {
		me.insert(0, {
			'GS_TYPE_DESC' : '全部',
			'GS_TYPE' : '%'
		});
		Ext.getCmp("gstype").select(me.first());
	});
	Ext.data.StoreManager.lookup('gsStore_add').on('load', function(me) {
		Ext.getCmp("gstype_add").select(me.first());
	});
	Ext.data.StoreManager.lookup('zjStore').on('load', function(me) {
		me.insert(0, {
			'SET_DESC' : '全部',
			'SET_ID' : '%'
		});
		Ext.getCmp("zjtype").select(me.first());
	});
	Ext.data.StoreManager.lookup('zjStore_add').on('load', function(me) {
		Ext.getCmp("zjtype_add").select(me.first());
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
	Ext.getCmp('seriestype_add').on('change', function(me) {
		Ext.data.StoreManager.lookup('xhStore_add').load({
			params : {
				dj_type_in:Ext.getCmp('seriestype_add').getValue()
			}
		})
	});
	Ext.getCmp('seriestype_edit').on('change', function(me) {
		Ext.data.StoreManager.lookup('xhStore_add').load({
			params : {
				dj_type_in:Ext.getCmp('seriestype_edit').getValue()
			}
		})
	});
	Ext.data.StoreManager.lookup('xhStore_add').on('load', function(me) {
		Ext.getCmp("djxh_add").select(me.first());
		var item = me.findRecord('DJ_TYPE', globl_code);
		if (item == null) {
			Ext.getCmp("djxh_edit").select(me.first());
		} else {
			Ext.getCmp("djxh_edit").select(
				me.findRecord('DJ_TYPE', globl_code));
		}
	});
});
function money_load() {
	Ext.data.StoreManager.lookup('fyStore').load({
		params : {
			money_class_in:Ext.getCmp('fylxtype').getValue()
		}
	});
	Ext.data.StoreManager.lookup('fyStore_add').load({
		params : {
			money_class_in:Ext.getCmp('fylxtype').getValue()
		}
	});
}
function OnClickSearch() {
	Ext.data.StoreManager.lookup('gridStore').load(
		{
			params : {
				money_type_in:Ext.getCmp('moneytype').getValue(),
				mendtype_in:Ext.getCmp('mendtype').getValue(),
				gs_type_in:Ext.getCmp('gstype').getValue(),
				set_id_in:Ext.getCmp('zjtype').getValue(),
				series_class_in:Ext.getCmp('seriestype').getValue(),
				dj_type_in:Ext.getCmp('djxh').getValue()

			}
		});
}
function OnClickAdd() {
	Ext.getCmp('djxhbh_add').setValue("");
	Ext.getCmp('v_add').setValue("");
	Ext.getCmp('dxgg_add').setValue("");
	Ext.getCmp('rl_add').setValue("");
	Ext.getCmp('cs_add').setValue("");
	Ext.getCmp('zl_add').setValue("");
	Ext.getCmp('gsjg_add').setValue("");
	Ext.getCmp('fyjg_add').setValue("");
	Ext.getCmp('dialogAdd').show();
}
function OnClickEdit() {
	var selectModel = Ext.getCmp("grid").getSelectionModel().getSelection();
	if (selectModel.length > 0) {
		globl_code = selectModel[0].data.DJ_TYPE;
		Ext.getCmp('djxhbh_edit').setValue(selectModel[0].data.DJ_TYPE_CODE);
		Ext.getCmp('v_edit').setValue(selectModel[0].data.DJ_V);
		Ext.getCmp('dxgg_edit').setValue(selectModel[0].data.DJ_DXTYPE);
		Ext.getCmp('rl_edit').setValue(selectModel[0].data.DJ_VOL);
		Ext.getCmp('cs_edit').setValue(selectModel[0].data.DJ_CS);
		Ext.getCmp('zl_edit').setValue(selectModel[0].data.DJ_WEIGHT);
		Ext.getCmp('gsjg_edit').setValue(selectModel[0].data.GS_PRICE);
		Ext.getCmp('fyjg_edit').setValue(selectModel[0].data.MOENY_PRICE);
		Ext.getCmp('seriestype_edit').select(selectModel[0].data.SERIES_CLASS);
		Ext.getCmp('mendtype_edit').select(selectModel[0].data.MENDTYPE);
		Ext.getCmp('gstype_edit').select(selectModel[0].data.GS_TYPE);
		Ext.getCmp('zjtype_edit').select(selectModel[0].data.SET_ID);
		Ext.getCmp('moneytype_edit').select(selectModel[0].data.MONEY_TYPE);
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
	if (Ext.getCmp('djxhbh_add').getValue() == '') {
		Ext.Msg.alert('错误操作', '编号不能为空!')
	} else if (Ext.getCmp('v_add').getValue() == '') {
		Ext.Msg.alert('错误操作', '电压不能为空!')
	} else if (Ext.getCmp('dxgg_add').getValue() == '') {
		Ext.Msg.alert('错误操作', '导线规格不能为空!')
	} else if (Ext.getCmp('rl_add').getValue() == '') {
		Ext.Msg.alert('错误操作', '容量不能为空!')
	} else if (Ext.getCmp('cs_add').getValue() == '') {
		Ext.Msg.alert('错误操作', '槽数不能为空!')
	} else if (Ext.getCmp('zl_add').getValue() == '') {
		Ext.Msg.alert('错误操作', '重量不能为空!')
	} else if (Ext.getCmp('gsjg_add').getValue() == '') {
		Ext.Msg.alert('错误操作', '工时价格不能为空!')
	} else if (Ext.getCmp('fyjg_add').getValue() == '') {
		Ext.Msg.alert('错误操作', '费用价格不能为空!')
	} else {

		Ext.Ajax.request({
			url: AppUrl + 'DJ/pro_dj114_adddjdingecost',
			method : 'post',
			async:false,
			params : {

				DJ_TYPE_CODE_in:Ext.getCmp('djxhbh_add').getValue(),
				DJ_TYPE_in:Ext.getCmp('djxh_add').getValue(),
				DJ_VOL_in:Ext.getCmp('rl_add').getValue(),
				DJ_V_in:Ext.getCmp('v_add').getValue(),
				DJ_CS_in:Ext.getCmp('cs_add').getValue(),
				DJ_DXTYPE_in:Ext.getCmp('dxgg_add').getValue(),
				DJ_WEIGHT_in:Ext.getCmp('zl_add').getValue(),
				MENDTYPE_in:Ext.getCmp('mendtype_add').getValue(),
				GS_TYPE_in:Ext.getCmp('gstype_add').getValue(),
				GS_PRICE_in:Ext.getCmp('gsjg_add').getValue(),
				MONEY_TYPE_in:Ext.getCmp('moneytype_add').getValue(),
				MOENY_PRICE_in:Ext.getCmp('fyjg_add').getValue(),
				SERIES_CLASS_in:Ext.getCmp('seriestype_add').getValue(),
				SET_ID_in:Ext.getCmp('zjtype_add').getValue()

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
	if (Ext.getCmp('djxhbh_edit').getValue() == '') {
		Ext.Msg.alert('错误操作', '编号不能为空!')
	} else if (Ext.getCmp('v_edit').getValue() == '') {
		Ext.Msg.alert('错误操作', '电压不能为空!')
	} else if (Ext.getCmp('dxgg_edit').getValue() == '') {
		Ext.Msg.alert('错误操作', '导线规格不能为空!')
	} else if (Ext.getCmp('rl_edit').getValue() == '') {
		Ext.Msg.alert('错误操作', '容量不能为空!')
	} else if (Ext.getCmp('cs_edit').getValue() == '') {
		Ext.Msg.alert('错误操作', '槽数不能为空!')
	} else if (Ext.getCmp('zl_edit').getValue() == '') {
		Ext.Msg.alert('错误操作', '重量不能为空!')
	} else if (Ext.getCmp('gsjg_edit').getValue() == '') {
		Ext.Msg.alert('错误操作', '工时价格不能为空!')
	} else if (Ext.getCmp('fyjg_edit').getValue() == '') {
		Ext.Msg.alert('错误操作', '费用价格不能为空!')
	} else {

		Ext.Ajax.request({
			url: AppUrl + 'DJ/pro_dj114_updatedjdingecost',
			method : 'post',
			async:false,
			params : {
				ID_in:Ext.getCmp('grid').getSelectionModel()
					.getSelection()[0].data.ID,
				DJ_TYPE_CODE_in:Ext.getCmp('djxhbh_edit').getValue(),
				DJ_TYPE_in:Ext.getCmp('djxh_edit').getValue(),
				DJ_VOL_in:Ext.getCmp('rl_edit').getValue(),
				DJ_V_in:Ext.getCmp('v_edit').getValue(),
				DJ_CS_in:Ext.getCmp('cs_edit').getValue(),
				DJ_DXTYPE_in:Ext.getCmp('dxgg_edit').getValue(),
				DJ_WEIGHT_in:Ext.getCmp('zl_edit').getValue(),
				MENDTYPE_in:Ext.getCmp('mendtype_edit').getValue(),
				GS_TYPE_in:Ext.getCmp('gstype_edit').getValue(),
				GS_PRICE_in:Ext.getCmp('gsjg_edit').getValue(),
				MONEY_TYPE_in:Ext.getCmp('moneytype_edit').getValue(),
				MOENY_PRICE_in:Ext.getCmp('fyjg_edit').getValue(),
				SERIES_CLASS_in:Ext.getCmp('seriestype_edit').getValue(),
				SET_ID_in:Ext.getCmp('zjtype_edit').getValue()

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
				url: AppUrl + 'DJ/pro_dj114_deletedingecost',
				method : 'post',
				async:false,
				params : {
					id_in: Ext.getCmp('grid').getSelectionModel()
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
function OnClickOutExcel() {
	var money_type_in=Ext.getCmp('moneytype').getValue()=='%'?'0':Ext.getCmp('moneytype').getValue();
	var mendtype_in=Ext.getCmp('mendtype').getValue()=='%'?'0':Ext.getCmp('mendtype').getValue();
	var gs_type_in=Ext.getCmp('gstype').getValue()=='%'?'0':Ext.getCmp('gstype').getValue();
	var set_id_in=Ext.getCmp('zjtype').getValue()=='%'?'0':Ext.getCmp('zjtype').getValue();
	var series_class_in=Ext.getCmp('seriestype').getValue()=='%'?'0':Ext.getCmp('seriestype').getValue();

	document.location.href=AppUrl + 'DJ/DJ114EXCEL?money_type_in='+money_type_in+
		'&mendtype_in='+mendtype_in+
		'&gs_type_in='+gs_type_in+
		'&set_id_in='+set_id_in+
		'&series_class_in='+series_class_in+
		'&dj_type_in='+Ext.getCmp('djxh').getValue();
	/*var tableName = [ "序号", "电机型号", "编号", "容量", "电压", "槽数",
	 "导线规格", "重量", "组件类型", "修理类别", "工时定额分类", "工时价格",
	 "费用分类", "费用价格"];
	 var tableKey = [ 'DJ_TYPE', 'DJ_TYPE_CODE', 'DJ_VOL', 'DJ_V',
	 'DJ_CS', 'DJ_DXTYPE', 'DJ_WEIGHT', 'SET_DESC', 'MENDTYPE_DESC',
	 'GS_TYPE_DESC', 'GS_PRICE', 'MONEY_TYPE_DESC', 'MOENY_PRICE',];
	 parName = [ 'money_type_in', 'mendtype_in','gs_type_in',
	 'set_id_in','series_class_in','dj_type_in' ];
	 var parType = [ 's', 's', 's', 's', 's', 's' ];
	 var parVal = [ IsNull(Ext.getCmp('moneytype').getValue()),
	 IsNull(Ext.getCmp('mendtype').getValue()),
	 IsNull(Ext.getCmp('gstype').getValue()),
	 IsNull(Ext.getCmp('zjtype').getValue()),
	 IsNull(Ext.getCmp('seriestype').getValue()),
	 IsNull(Ext.getCmp('djxh').getValue()) ];
	 var proName = 'PRO_DJ114_SELECTDJDINGECOST';
	 var ExcelName = 'Excel';
	 var cursorName = 'RET';

	 var returnStr = [ 'null' ];
	 var returnStrName = [ 'null' ];
	 var returnStrType = [ 'null' ];

	 submitData("ModelExcelTotal", tableName, tableKey, parName, parType,
	 parVal, proName, returnStr, returnStrType, returnStrName,
	 cursorName, "tital", "电机修理定额成本管理表");*/
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