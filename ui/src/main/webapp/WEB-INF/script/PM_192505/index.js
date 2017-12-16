var personname=Ext.util.Cookies.get('v_personname2');
var personcode=Ext.util.Cookies.get('v_personcode');
Ext.onReady(function () {
	var panel=Ext.create('Ext.panel.Panel',{
		id:'panel',
		region:'center',
		frame:true,
		width:'100%',
		layout:'vbox',
		items:[{xtype:'displayfield',id:'uname',fieldLabel: '用户名',labelAlign:'right',labelWidth:80,value:personname, style: ' margin: 7px 0px 0px 10px'},
		       {xtype:'textfield',id:'ymm', fieldLabel: '原密码',inputType:'password',labelAlign:'right',labelWidth:80, style: ' margin: 7px 0px 0px 10px'},
		       {xtype:'textfield',id:'xmm', fieldLabel: '新密码',inputType:'password',labelAlign:'right',labelWidth:80, style: ' margin: 7px 0px 0px 10px'},
		       {xtype:'textfield',id:'cfxma', fieldLabel: '重复新密码',inputType:'password',labelAlign:'right',labelWidth:80, style: ' margin: 7px 0px 0px 10px'},
		       {xtype:'button',text:'确定', icon: imgpath+'/saved.png', style: ' margin: 7px 0px 0px 170px',listeners:{click:OnButtonSaveClicked}}]
	});
	Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel]
    });
});

function OnButtonSaveClicked(){
	var ypassword=Ext.getCmp('ymm').getValue();
	var npassword=Ext.getCmp('xmm').getValue();
	var dpassword=Ext.getCmp('cfxma').getValue();
	
	if(ypassword==''){
		Ext.Msg.alert('操作信息', '原密码不能为空');
	}else{
		if(npassword==''){
			Ext.Msg.alert('操作信息', '新密码不能为空');
		}else{
			if(dpassword==''){
				Ext.Msg.alert('操作信息', '重复密码不能为空');
			}else if(npassword!=dpassword){
				Ext.Msg.alert('操作信息', '两次密码必须一致');
			}else{
				Ext.Ajax.request({
					url : AppUrl + 'pm_19/PRO_BASE_PERSON_PASS_EDIT',
					method : 'POST',
					async : false,
					params : {
						V_V_PERSONCODE:personcode,
						V_V_PASSWORD:ypassword,
						V_V_PASSWORD_NEW:npassword
					},
					success:function (resp){
						var resp = Ext.decode(resp.responseText);
						Ext.Msg.alert('操作信息',resp.V_CURSOR);
						Ext.getCmp('ymm').setValue('');
						Ext.getCmp('xmm').setValue('');
						Ext.getCmp('cfxma').setValue('');
					}
				});
			}
		}
	}
}