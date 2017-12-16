Ext.onReady(function() {
	var panelCenter = Ext.create('Ext.panel.Panel', {
		xtype : 'panel',
		region : 'center',
		frame : true,
		layout : 'vbox',
		items : [  {
			xtype : 'textfield',
			fieldLabel : '检修单位编码',
			id : 'menddeptcode'
		}, {
			xtype : 'textfield',
			fieldLabel : '检修单位名称',
			id : 'menddeptname'
		},{
			xtype : 'textfield',
			fieldLabel : '检修单位类型',
			id : 'menddatetype'
		}, {
			xtype : 'textfield',
			fieldLabel : '上级编码',
			id : 'supercode'
		}, {
			xtype : 'textfield',
			fieldLabel : '负责人ID',
			id : 'userID'
		}, {
			xtype : 'textfield',
			fieldLabel : '负责人名',
			id : 'username'
		} ],
		buttons:[{text:'确定',listeners : {click : onAdd}}]
	});

	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		autoScroll : true,
		items : [ panelCenter ]
	});

});

function onAdd() {

	Ext.Ajax.request({
		url : APP + '/ModelChange',
		params : {
			parName : [ 'MENDDEPT_NAME_IN', 'MENDDEPT_CODE_IN',
					'MENDDATE_TYPE_IN',

					'SUPER_CODE_IN', 'USERID_IN', 'USERNAME_IN' ],
			parType : [ 's', 's', 's', 's', 's', 's' ],
			parVal : [

			Ext.getCmp('menddeptname').getValue(),
					Ext.getCmp('menddeptcode').getValue(),
					Ext.getCmp('menddatetype').getValue(),
					Ext.getCmp('supercode').getValue(),
					Ext.getCmp('userID').getValue(),
					Ext.getCmp('username').getValue() ],
			proName : 'pro_dj701_insert',
			returnStr : [ 'RET' ],
			returnStrType : [ 's' ]
		},
		method : 'POST',
		success : function(response) {
			var resp = Ext.JSON.decode(response.responseText);
			if (resp[0] == "Success") {
				window.close();
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
