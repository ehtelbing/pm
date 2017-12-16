Ext.onReady(function() {
	var panelCenter = Ext.create('Ext.panel.Panel', {
		xtype : 'panel',
		region : 'center',
		frame : true,
		layout : {
			type : 'table',
			columns : 2
		},
		items : [ {
			xtype : 'textfield',
			fieldLabel : '分类编号',
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
			text : '确定',
			listeners : {
				click : onAdd
			}
		} ]
	});

	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		autoScroll : true,
		items : [ panelCenter ]
	});

});

function onAdd() {
	if (Ext.getCmp('flbm').getValue() == ""
			|| Ext.getCmp('flbm').getValue().length > 8) {
		alert("分类编码最多可输入8个字符");
		return;
	}
	if (Ext.getCmp('flm').getValue().length > 8) {
		alert("分类编码最多可输入8个字符");
		return;
	}
	if (Ext.getCmp('bmqz').getValue().length > 8) {
		alert("分类编码最多可输入8个字符");
		return;
	}
	if (Ext.getCmp('mrdw').getValue().length > 8) {
		alert("分类编码最多可输入8个字符");
		return;
	}

	Ext.Ajax.request({
		url : APP + '/ModelChange',
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
					Ext.getCmp('sxh').getValue()					],
			proName : 'pg_dj704.additype',
			returnStr : [ 'ret', 'ret_msg' ],
			returnStrType : [ 's', 's' ]
		},
		method : 'POST',
		success : function(response) {
			var resp = Ext.JSON.decode(response.responseText);
			if (resp[0] == "Success") {
				Ext.example.msg('提示', "操作成功！");

			} else {
				Ext.example.msg('提示', "操作失败！");
			}
		}
	});
}
function newGuid() {
	var guid = "";
	for ( var i = 1; i <= 32; i++) {
		var n = Math.floor(Math.random() * 16.0).toString(16);
		guid += n;
		if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
			guid += "-";
	}
	return guid;
}
