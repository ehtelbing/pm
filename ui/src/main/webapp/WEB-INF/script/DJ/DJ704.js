var type = 0;
var selectedRecord = '';
Ext.onReady(function() {

	function left(value, metaData, record, rowIndex, colIndex, store) {
		metaData.style = "text-align:left;";
		return value;
	}
	function right(value, metaData, record, rowIndex, colIndex, store) {
		metaData.style = "text-align:right;";
		return value;
	}

	var gridStore = Ext.create('Ext.data.Store', {

		storeId : 'gridStore',
		pageSize : 200,
		fields : [ 'TYPECODE', 'TYPENAME', 'STATUS', 'STATUS_DESC',
				'TYPE_PREFIX', 'TYPE_UNIT', 'REC_STATUS', 'REC_STATUS_DESC','I_INDEX' ],
		proxy : {
			type : 'ajax',
			async : false,
			url : APP + '/ModelSelect',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			}
		}
	});

	var list1 = Ext.create('Ext.panel.Panel', {
		region : 'north',
		bodyStyle : {
			background : 'none'
		},
		border : 0,
		defaults : {
			labelAlign : 'right',
			labelWidth : 60
		},
		items : [ {
			frame : true,
			style : 'margin-bottom:1px',
			defaults : {
				labelAlign : 'right',
				labelWidth : 60
			},
			layout : {
				type : 'table',
				columns : 5
			},
			items : [ {
				xtype : 'button',
				text : '新增',
				id : 'add',
				listeners : {
					click : OnAdd
				},
				margin : '0px 0px 4px 10px'
			}, {
				xtype : 'button',
				text : '查询',
				id : 'query',
				listeners : {
					click : OnClickSearch
				},
				margin : '0px 0px 4px 10px'
			}

			]
		} ]
	});

	var grid = Ext.create('Ext.grid.Panel', {
		id : 'grid',
		region : 'center',
		columnLines : true,
		selType : 'checkboxmodel',
		width : '100%',
		title : '检修单位配置',
		autoScroll : true,
		store : gridStore,
		dufaults : {
			width : 120
		},
		plugins : [ Ext.create('Ext.grid.plugin.CellEditing', {
			clicksToEdit : 1
		}) ],
		columns : [ {
			text : '顺序号',
			dataIndex : 'I_INDEX',
			align : 'center',
			width : 60
		},{
			text : '分类编号',
			dataIndex : 'TYPECODE',
			align : 'center',
			width : 130
		}, {
			text : '分类名',
			dataIndex : 'TYPENAME',
			align : 'center',
			width : 130
		}, {
			text : '使用状态',
			dataIndex : 'STATUS_DESC',
			align : 'center',
			width : 130
		}, {
			text : '分类物料编码前缀',
			dataIndex : 'TYPE_PREFIX',
			align : 'center',
			width : 180
		}, {
			text : '分类物料默认单位',
			dataIndex : 'TYPE_UNIT',
			align : 'center',
			width : 120
		}, {
			text : '回收状态',
			dataIndex : 'REC_STATUS_DESC',
			align : 'center',
			width : 180
		}, {
			text : '修改',
			align : 'center',
			renderer : LookMore
		/*
		 * ,handler : function() {OnUpdate();}
		 */}, {
			text : '删除',
			align : 'center',
			renderer : LookMore2
		}

		],
		bbar : [ '->', {
			xtype : 'pagingtoolbar',
			id : 'pagingtoolbar',
			dock : 'bottom',
			displayInfo : true,
			displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
			emptyMsg : '没有记录',
			store : 'gridStore'
		} ]

	});

	var rightPanel = Ext.create('Ext.panel.Panel', {
		region : 'center',
		layout : 'border',
		frame : true,
		autoScroll : true,
		items : [ list1, grid ]
	});

	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		autoScroll : true,
		items : [ rightPanel ]
	});
	OnClickSearch();
});

var window1 = Ext.create('Ext.window.Window', {
	id : 'window1',
	title : '修改',
	width : 400,
	height : 300,
	plain : true,
	modal : true,
	layout : {
		type : 'table',
		columns : 2,
		baseCls : 'my-panel-noborder'

	},
	defaults : {
		labelWidth : 90,
		labelAlign : 'right'
	},
	items : [ {
		xtype : 'textfield',
		fieldLabel : '分类编号',
		readOnly : true,
		id : 'flbm'
	}, {
		xtype : "label",
		text : "*最多可输入8个字符"
	}, {
		xtype : 'textfield',
		fieldLabel : '分类名',
		id : 'flm'
	}, {
		xtype : "label",
		text : "*最多可输入8个字符"
	}, {
		xtype : 'radiogroup',
		colspan : 2,
		width : 250,
		fieldLabel : '使用状态',
		id : 'syzt', // 后台返回的JSON格式，直接赋值；
		items : [ {
			boxLabel : '启用',
			name : 'syzt',
			checked : true,
			inputValue : 1
		}, {
			boxLabel : '停用',
			name : 'syzt',
			inputValue : 0
		} ]
	}, {
		xtype : 'textfield',
		fieldLabel : '编码前缀',
		id : 'bmqz'
	}, {
		xtype : "label",
		text : "*最多可输入8个字符"
	}, {
		xtype : 'textfield',
		fieldLabel : '默认单位',
		id : 'mrdw'
	}, {
		xtype : "label",
		text : "*最多可输入8个字符"
	}, {
		xtype : 'radiogroup',
		colspan : 2,
		width : 250,
		fieldLabel : '回收状态',
		id : 'hszt', // 后台返回的JSON格式，直接赋值；
		items : [ {
			boxLabel : '回收',
			name : 'hszt',
			checked : true,
			inputValue : 1
		}, {
			boxLabel : '不回收',
			name : 'hszt',
			inputValue : 0
		} ]
	},{
		xtype : 'numberfield',
		fieldLabel : '顺序号',
		id : 'sxh'
	}, {
		xtype : "label",
		text : "*只能输入数字"
	} ],
	buttons : [ {
		xtype : 'button',
		text : '修改',
		listeners : {
			click : OnSave
		}
	} ],
	closeAction : 'hide',
	model : true

});
function OnSave() {

	Ext.Ajax.request({
		url : APP + '/ModelChange',
		async : false,
		params : {
			parName : [ 'a_typecode', 'a_typename', 'a_status',
					'a_type_prefix', 'a_type_unit', 'a_rec_status', 'a_userid',
					'a_username','a_index' ],
			parType : [ 's', 's', 's', 's', 's', 's', 's', 's','i' ],
			parVal : [ Ext.getCmp('flbm').getValue(),
					Ext.getCmp('flm').getValue(),
					Ext.getCmp('syzt').getValue().syzt,
					Ext.getCmp('bmqz').getValue(),
					Ext.getCmp('mrdw').getValue(),
					Ext.getCmp('hszt').getValue().hszt,
					Ext.util.Cookies.get("mm.userid"),
					Ext.util.Cookies.get("mm.username"), 
					Ext.getCmp('sxh').getValue()],
			proName : 'pg_dj704.updteitype',
			returnStr : [ 'ret', 'ret_msg' ],
			returnStrType : [ 's', 's' ]
		},
		method : 'POST',
		success : function(response) {
			var resp = Ext.decode(response.responseText);
			if (resp[0] != "success") {
				Ext.example.msg('提示', "操作成功");
				window1.hide();
				OnClickSearch();
			} else {
				Ext.example.msg('提示', "操作失败");

			}
		}
	});
}
function OnConfirm() {
	Ext.getCmp('window1').show();
	selectedRecord = Ext.getCmp('grid').getSelectionModel().getSelection();
	Ext.getCmp('flbm').setValue(selectedRecord[0].data.TYPECODE);
	Ext.getCmp('flm').setValue(selectedRecord[0].data.TYPENAME);
	if (selectedRecord[0].data.STATUS == "1") {
		Ext.getCmp('syzt').items.get(0).setValue(true)
	} else {
		Ext.getCmp('syzt').items.get(1).setValue(true)
	}
	Ext.getCmp('bmqz').setValue(selectedRecord[0].data.TYPE_PREFIX);
	Ext.getCmp('mrdw').setValue(selectedRecord[0].data.TYPE_UNIT);
	Ext.getCmp('hszt').setValue(selectedRecord[0].data.REC_STATUS);
	Ext.getCmp('sxh').setValue(selectedRecord[0].data.I_INDEX);
	if (selectedRecord[0].data.REC_STATUS == "1") {
		Ext.getCmp('hszt').items.get(0).setValue(true)
	} else {
		Ext.getCmp('hszt').items.get(1).setValue(true)
	}

}
function OnUpdate() {
	var selectedRecord = Ext.getCmp('grid').getSelectionModel().getSelection();
	if (selectedRecord != null && selectedRecord != "") {
		if (selectedRecord.length == 1) {
			Ext.getCmp('window1').show();
			Ext.getCmp('menddept_name').setValue(
					selectedRecord[0].data.MENDDEPT_NAME);
			Ext.util.Cookies.get("mm.userid");
			Ext.util.Cookies.get("mm.username");

		} else {
			Ext.Msg.alert("提示", "只能选择一条记录修改");
		}
	} else {
		Ext.Msg.alert("提示", "至少选择一条记录");
	}
}

function OnClickSearch() {
	Ext.data.StoreManager.lookup('gridStore').setProxy({
		type : 'ajax',
		async : false,
		url : APP + '/ModelSelect',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		},
		extraParams : {
			parName : [],
			parType : [],
			parVal : [],
			proName : 'pg_dj704.getitypelist',
			cursorName : 'ret'
		}
	});

	Ext.data.StoreManager.lookup('gridStore').load();
}
function OnAdd() {
	var dialog = window.showModalDialog(AppUrl + "/DJ/DJ704add.jsp", null,
			"dialogHeight:500px;dialogWidth:650px");
}

function LookMore2(value, metaData, record, rowIdx, colIdx, store, view) {
	return "<a onclick='delFixContent(\"" + rowIdx.toString()
			+ "\")' style='color:blue'>删除</a>";
}
function LookMore(value, metaData, record, rowIdx, colIdx, store, view) {
	return '<a  onclick="OnConfirm()" style="color:blue">修改</a>';
}

function delFixContent(rowIdx) {
	var id = Ext.data.StoreManager.lookup('gridStore').data.getAt(rowIdx).data.TYPECODE;
	Ext.Ajax.request({
		url : APP + '/ModelChange',
		type : 'ajax',
		async : false,
		method : 'POST',
		params : {
			parName : [ 'a_typecode', 'a_userid', 'a_username' ],
			parType : [ 's', 's', 's' ],
			parVal : [ id, Ext.util.Cookies.get("mm.userid"),
					Ext.util.Cookies.get("mm.username") ],
			proName : 'pg_dj704.deleteitype',
			returnStr : [ 'ret', 'ret_msg' ],
			returnStrType : [ 's', 's' ]
		},
		success : function(response) {
			var resp = Ext.decode(response.responseText);
			if (resp[0] != "success") {
				Ext.example.msg('提示', "操作成功");
			} else {
				Ext.example.msg('提示', "操作失败");
			}
		}
	});
	OnClickSearch();
}
