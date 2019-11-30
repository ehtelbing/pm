var V_ORDERGUID='';
var V_MODEL='';

if (location.href.split('?')[1] != undefined) {
	V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
	V_MODEL = Ext.urlDecode(location.href.split('?')[1]).V_MODEL;
}

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
		id : 'sgmx',
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
	if(Ext.getCmp('sgmx').getValue()==''){
		Ext.MessageBox.show({
			title: '提示',
			msg: '请填写模板名称',
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.WARNING
		});
		return false;
	}
	Ext.Ajax.request({
		url:AppUrl + 'cxy/PM_FAULT_BUG_MODEL',
		methon:'POST',
		async:false,
		params:{

            V_V_ORDERGUID:V_ORDERGUID,
			V_V_MODEL_STYLE:V_MODEL,
			V_V_MODEL_MANE:Ext.getCmp('sgmx').getValue(),
			V_V_USERCODE:Ext.util.Cookies.get('v_personcode')
		},
		success:function (resp) {
			var res=Ext.decode(resp.responseText);
            if (res.RET != "" && res.RET == 'Success') {
				Ext.MessageBox.show({
					title: '提示',
					msg: '成功生成模板!',
					buttons: Ext.MessageBox.OK,
					fn: function () {
						window.opener._seltctFault();
						window.close();
					}
				});
            }else{
				Ext.MessageBox.show({
					title: '提示',
					msg: res.RET ,
					buttons: Ext.MessageBox.OK,
					fn: function () {
						window.opener._seltctFault();
						window.close();
					}
				});
			}
        }
	});


}

function OnClickCancelButton() {
	window.close();
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
