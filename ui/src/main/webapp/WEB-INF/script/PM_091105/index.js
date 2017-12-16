Ext.onReady(function() {
	Ext.create('Ext.container.Viewport', {
		layout:'border',
		items : [ form ]
	});
});

var form = {
	xtype : 'panel',
	region : 'center',
	layout : 'vbox',
	title : '生成模型',
	margin:'5px',
	items : [ {
		xtype : 'textfield',
		fieldLabel : '生成模型:',
		id : 'scmx',
		labelAlign : 'right',
		style : 'margin:50px 0px 50px 20px',
		width : 450
	}, {
		xtype : 'panel',
		layout : 'column',
		border : false,
		items : [ {
			xtype : 'button',
			text : '确定',
			width : 60,
			style : 'margin:0px 0px 50px 200px',
			listeners : {
				click : OnClickSaveButton
			}
		}, {
			xtype : 'button',
			text : '取消',
			width : 60,
			style : 'margin:0px 0px 50px 30px',
			listeners : {
				click : OnClickCancelButton
			}
		}]
	} ]
};

function OnClickSaveButton() {
	Ext.Ajax.request({
		url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_MODEL_CREATE',
		method: 'POST',
		async: false,
		params : {
			V_V_ORDERGUID:Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID,
			V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
			V_V_PERSONNAME:Ext.util.Cookies.get('v_personname2'),
			V_V_MOD_NAME:Ext.getCmp('scmx').getValue()
		},
		success : function(resp) {
			var resp = Ext.JSON.decode(resp.responseText);
			if (resp.V_INFO == '成功') {
				Ext.Msg.alert('操作信息','添加成功');
				//Ext.example.msg('操作信息', '{0}', '添加成功');
			} else {
				Ext.Msg.alert('操作信息','添加失败');
				//Ext.example.msg('操作信息', '{0}', '添加失败');
			}
		}

	});
	window.close();
}

function OnClickCancelButton() {
	window.close();
}