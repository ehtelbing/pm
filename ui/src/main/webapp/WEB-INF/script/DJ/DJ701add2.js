var globalmenddept_code='';
if(location.href.split('?')[1]!=null){ 
	globalmenddept_code = Ext.urlDecode(location.href.split('?')[1]).MENDDEPT_CODE;
}
Ext.onReady(function() {
	var panelCenter = Ext.create('Ext.panel.Panel', {
		xtype : 'panel',
		region : 'center',
		frame : true,
		layout : {
			type : 'vbox',
			align : 'center',
			pack : 'center'
		},
		margin : 1,
		items : [{
				xtype:'textfield',
				fieldLabel:'人员编码',
				id:'userID'
			},{
				xtype:'textfield',
				fieldLabel:'人员名称',
				id:'username'
			},{
			xtype:'button',
			//id:'confirm',
			border:1,
			width:70,
			text:'确定',
			align:'left',
			handler:function(){
				onAdd();
			}
		}]
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
			parName : ['MENDDEPT_CODE_IN',
			           'USERNAME_IN', 
			            'USERID_IN' ],
			parType : [ 's', 's','s'],
			parVal : [globalmenddept_code,
					  Ext.getCmp('userID').getValue(),
					  Ext.getCmp('username').getValue() ],
			proName : 'pro_dj701_perinsert',
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
