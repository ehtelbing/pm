var code='';
var name='';
if(location.href.split('?')[1]!=null&&location.href.split('?')[1]!=''){
	code=Ext.urlDecode(location.href.split('?')[1]).code;
	name=Ext.urlDecode(location.href.split('?')[1]).name;
}
Ext.onReady(function() {
	Ext.QuickTips.init();
	
	var gridStore=Ext.create('Ext.data.Store',{
		id : 'gridStore',
		pageSize : 20,
		autoLoad : false,
		fields : [ 'I_ID','V_EQUCODE','V_SPCODE','V_SPNAME','V_SPTYPE','V_SPCODE_OLD','V_NUMBER','V_MEMO'],
		proxy : {
			type : 'ajax',
			async : false,
			url : AppUrl + 'pm_19/PRO_SAP_EQU_BOM_VIEW',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list',
				total : 'total'
			}
		},
        listeners: {
        	beforeload: beforeGridStore
        }
	});
	
	var panel=Ext.create('Ext.panel.Panel',{
		id:'panel',
		frame:true,
		width:'100%',
		region:'north',
		layout:'column',
		items:[{xtype:'textfield',id:'sbbm',fieldLabel:'设备编码',width:300,labelAlign:'right',labelWidh:70,style: ' margin: 5px 0px 0px 20px',readOnly:true,value:code},
			   {xtype:'textfield',id:'sbmc',fieldLabel:'设备名称',width:300,labelAlign:'right',labelWidh:70,style: ' margin: 5px 0px 0px 20px',readOnly:true,value:name},
			   {xtype:'button',text:'添加',style: ' margin: 5px 0px 0px 20px',icon: imgpath +'/add.png',listeners:{click:OnBtnAddClick}}]
	});
	
	var grid=Ext.create('Ext.grid.Panel',{
		id:'grid',
		 store: gridStore,
		 columnLines : true,
		 autoScroll : true,
		 width:'100%',
		 region:'center',
		 height:400,
		 columns:[{ xtype: 'rownumberer', width: 30, sortable: false },
                  { text: '备件编码', dataIndex: 'V_SPCODE', width: 200 ,renderer : CreateGridColumnTd},
                  { text: '备件名称', dataIndex: 'V_SPNAME', width: 200 ,renderer : CreateGridColumnTd},
                  { text: '数量', dataIndex: 'V_NUMBER', width: 80 ,renderer : CreateGridColumnTd},
                  { text: '备注', dataIndex: 'V_MEMO', width: 300 ,renderer : CreateGridColumnTd},
                  { text: '修改', width: 80,
                	  renderer : function() {return "<img src='"+ imgpath+"/edit.png' style='cursor:pointer' onclick='EditClick()' />"}},
                  { text: '删除',width: 80,
                	  renderer : function() {return "<img src='"+ imgpath+"/delete1.png' style='cursor:pointer' onclick='DelClick()' />"}}],
                  bbar: [{
                	      id:'page',
                	      xtype: 'pagingtoolbar',
                	      dock: 'bottom',
                	      displayInfo: true,
                	      displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                	      emptyMsg: '没有记录',
                	      store: 'gridStore'
                	       }]
	});
	
	var window=Ext.create('Ext.window.Window',{
		id:'dialog',closeAction: 'hide', width: 400, height: 260,layout:'vbox',
		items:[{xtype:'textfield',id:'bjbm',fieldLabel:'备件编码',labelAlign:'right',labelWidth:70,style: ' margin: 5px 0px 0px 20px',width:300,emptyText:'不能为空！'},
		       {xtype:'textfield',id:'bjmc',fieldLabel:'备件名称',labelAlign:'right',labelWidth:70,style: ' margin: 5px 0px 0px 20px',width:300},
		       {xtype:'numberfield',id:'sl',fieldLabel:'数量',labelAlign:'right',labelWidth:70,style: ' margin: 5px 0px 0px 20px',minValue:0.001,decimalPrecision:3,width:300},
		       {xtype:'textfield',id:'bz',fieldLabel:'备注',labelAlign:'right',labelWidth:70,style: ' margin: 5px 0px 0px 20px',width:300}],
		       buttons:[{text:'保存',style: ' margin: 5px 0px 0px 20px',icon: imgpath +'/saved.png',listeners:{click:OnBtnSaveClick}},
		                {text:'关闭',style: ' margin: 5px 0px 0px 20px',handler:function(){Ext.getCmp('dialog').hide();}}]
	});
	
	Ext.create('Ext.container.Viewport', {
		id : "id",
		layout : 'border',
		items : [panel,grid]
	});
	
	QueryGrid();
});

function QueryGrid(){
	Ext.data.StoreManager.lookup('gridStore').load({
		params:{
			V_V_EQUCODE:code
	    }
	});
}

function OnBtnAddClick(){
	Ext.getCmp('dialog').show();
	Ext.getCmp('dialog').setTitle('添加备件清单');
	Ext.getCmp('bjbm').setValue('');
	Ext.getCmp('bjmc').setValue('');
	Ext.getCmp('sl').setValue('1');
	Ext.getCmp('bz').setValue('');
}

function EditClick(){
	Ext.getCmp('dialog').show();
	Ext.getCmp('dialog').setTitle('修改备件清单');
	Ext.getCmp('bjbm').setValue(Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.V_SPCODE);
	Ext.getCmp('bjmc').setValue(Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.V_SPNAME);
	Ext.getCmp('sl').setValue(Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.V_NUMBER);
	Ext.getCmp('bz').setValue(Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.V_MEMO);
}

function DelClick(){
	Ext.Msg.confirm("警告", "确定要删除吗？", function (button) {
        if (button != "yes") {return; }	
        Ext.Ajax.request({
            url: AppUrl + 'pm_19/PRO_SAP_EQU_BOM_DEL',
            method: 'POST',
            params:{
				V_V_EQUCODE:code,
				V_V_SPCODE:Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.V_SPCODE
            },
            success:function(resp){
            	var resp = Ext.decode(resp.responseText);
            	if(resp.V_CURSOR=='成功'){
            		QueryGrid();
            	}else{
            		Ext.MessageBox.alert('提示信息', '删除失败！');
            	}
            }
        });
	});
}

function beforeGridStore(store){
	store.proxy.extraParams.V_V_EQUCODE = code;
}

function OnBtnSaveClick(){
	if(Ext.getCmp('bjbm').getValue()==''){
		Ext.MessageBox.alert('提示信息', '备件编码不能为空！');
	}else if(Ext.getCmp('sl').getValue()==''){
		Ext.MessageBox.alert('提示信息', '数量不能为空,且数量必须大于0！');
	}else{
			Ext.Ajax.request({
		        url: AppUrl + 'pm_19/PRO_SAP_EQU_BOM_SET',
		        method: 'POST',
		        params:{
					V_V_EQUCODE:code,
					V_V_SPCODE:Ext.getCmp('bjbm').getValue(),
					V_V_SPNAME: Ext.getCmp('bjmc').getValue(),
					V_V_SPTYPE:'L',
					V_V_SPCODE_OLD:Ext.getCmp('bjbm').getValue(),
					V_V_NUMBER:Ext.getCmp('sl').getValue(),
					V_V_MEMO:Ext.getCmp('bz').getValue()
		        },
		        success:function(resp){
		        	var resp = Ext.decode(resp.responseText);
		        	if(resp.V_CURSOR=='成功'){
		        		Ext.getCmp('dialog').hide();
		        		QueryGrid();
		        	}else{
		        		Ext.MessageBox.alert('提示信息', '保存失败！');
		        	}
		        }
			});
	}
}

function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
