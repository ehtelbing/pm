var typecode='';
var typename='';
var txcode='';
var txname='';
if(location.href.split('?')[1]!=null&&location.href.split('?')[1]!=''){
	typecode=Ext.urlDecode(location.href.split('?')[1]).typecode;
	typename=Ext.urlDecode(location.href.split('?')[1]).typename;
	txcode=Ext.urlDecode(location.href.split('?')[1]).txcode;
	txname=Ext.urlDecode(location.href.split('?')[1]).txname;
}
Ext.onReady(function() {
	var panel=Ext.create('Ext.panel.Panel',{
		id:'panel',
		frame:true,
		width:'100%',
		region:'center',
		layout:'vbox',
		items:[{xtype:'textfield',id:'lxbm',fieldLabel:'设备类型编码',width:360,labelAlign:'right',labelWidh:100,style: ' margin: 5px 0px 0px 20px',readOnly:true,value:typecode},
		       {xtype:'textfield',id:'lxmc',fieldLabel:'设备类型名称',width:360,labelAlign:'right',labelWidh:100,style: ' margin: 5px 0px 0px 20px',readOnly:true,value:typename},
		       {xtype:'textfield',id:'txmc',fieldLabel:'特性名称',width:360,labelAlign:'right',labelWidh:100,style: ' margin: 5px 0px 0px 20px',value:txname}],
		       buttons:[{text:'保存',style: ' margin: 5px 0px 0px 20px',icon: imgpath +'/saved.png',listeners:{click:OnBtnSaveClicked}},
		                {text:'关闭',style: ' margin: 5px 0px 0px 10px',handler:function(){window.close();}}]
	});
	
	Ext.create('Ext.container.Viewport', {
		id : "id",
		layout : 'border',
		items : [panel]
	});
	
	
});

function OnBtnSaveClicked(){
	if(Ext.getCmp('txmc').getValue()==''){
		Ext.MessageBox.alert('提示信息', '特性名称不能为空！');
	}else{
		Ext.Ajax.request({
	        url: AppUrl + 'pm_19/PRO_SAP_EQU_TYPE_TX_SET',
	        method: 'POST',
	        params:{
				V_V_EQUTYPECODE:typecode,
				V_V_EQUTYPETXCODE:txcode,
				V_V_EQUTYPETXNAME:Ext.getCmp('txmc').getValue(),
				V_V_EQUTYPETXCHAR:'CHAR',
				V_V_EQUTYPETXLEN:'500'
	        },
	        success:function(resp){
	        	var resp = Ext.decode(resp.responseText);
	        	if(resp.V_CURSOR=='成功'){
	        		window.opener.SecondGrid();
	        		window.close();
	        	}else{
	        		Ext.MessageBox.alert('提示信息', '保存失败！');
	        	}
	        }
		});
	}
}
