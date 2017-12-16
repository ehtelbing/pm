Ext.onReady(function() {
	 var  ckstore = Ext.create('Ext.data.Store', {
	        autoLoad: true,
	        storeId: 'ckstore',
	        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
			 proxy: {
				 type: 'ajax',
				 async: false,
				 url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
				 actionMethods: {
					 read: 'POST'
				 },
				 reader: {
					 type: 'json',
					 root: 'list'
				 },
				 extraParams:{
					 V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
					 V_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
					 V_V_DEPTCODENEXT:'%',
					 V_V_DEPTTYPE: '[基层单位]'
				 }
			 }
	    });	
	 var  dystore = Ext.create('Ext.data.Store', {
	        autoLoad: false,
	        storeId: 'dystore',
	        fields: ['DICID','FLOWNAME'],
	        proxy: {
	            type: 'ajax',
	            async: false,
	            url: AppUrl + 'pm_19/PRO_MM_FLOW_DIC',
	            actionMethods: {
	                read: 'POST'
	            },
	            reader: {
	                type: 'json',
	                root: 'list'
	            }
	        }
	    });	
	 
	 
	 
	

	 var sybstore = Ext.create('Ext.data.Store', {
	        autoLoad: false,
	        storeId: 'sybstore',
	        fields: ['STEPID', 'STEPNAME'],
	        proxy: {
	            type: 'ajax',
	            async: false,
	            url: AppUrl + 'pm_19/PRO_MM_FLOW_STEP',
	            actionMethods: {
	                read: 'POST'
	            },
	            reader: {
	                type: 'json',
	                root: 'list'
	            }
	
	        }
	    });
	 var xybstore = Ext.create('Ext.data.Store', {
	        autoLoad: false,
	        storeId: 'xybstore',
	      
	        fields: ['STEPID', 'STEPNAME'],
	        proxy: {
	            type: 'ajax',
	            async: false,
	            url: AppUrl + 'pm_19/PRO_MM_FLOW_STEP',
	            actionMethods: {
	                read: 'POST'
	            },
	            reader: {
	                type: 'json',
	                root: 'list'
	            }

	        }
	    });
	
	 
	var panel = Ext.create('Ext.panel.Panel', {
		id : 'panellow',
		title : '流程步骤设置',
		width : '100%',
		region : 'north',
		frame : true,
		layout : 'column',
		defaults: {
			style: {margin: '5px 0px 5px 10px'},
			labelAlign: 'right'
		},
		items : [
		         { xtype: 'hidden', id: 'bzid'},
				{
					xtype : 'combo',
					id : "ck",
					store : ckstore,
					editable : false,
					queryMode : 'local',
					fieldLabel : '厂矿名称',
					displayField : 'V_DEPTNAME',
					valueField : 'V_DEPTCODE',
					labelWidth : 80
				},
				{
					xtype : 'combo',
					id : "dy",
					store : dystore,
					editable : false,
					queryMode : 'local',                       
					fieldLabel : '流程定义',
					displayField : 'FLOWNAME',
					valueField : 'DICID',
					labelWidth : 80
				},
				{

					xtype : 'button',
					text : '查询',
					icon : imgpath + '/search.png',
					width : 100,
					listeners: { click: OnQueryBtnClicked }
				},
				{
					xtype : 'textfield',
					id : 'seltext',
					fieldLabel : '步骤名称',
					labelWidth : 80,
					width:243
				},
				
				{
					xtype : 'combo',
					id : "syb",
					store : sybstore,
					editable : false,
					queryMode : 'local',
					fieldLabel : '上一步',
					displayField : 'STEPNAME',
					valueField : 'STEPID',
					labelWidth : 80,
				},
				{
					xtype : 'combo',
					id : "xyb",
					store : xybstore,
					editable : false,
					queryMode : 'local',
					fieldLabel : '下一步',
					displayField : 'STEPNAME',
				    valueField : 'STEPID',
					labelWidth : 80
				},
				
				{
					xtype : 'textfield',
					id : 'lcdz',
					fieldLabel : '流程页面地址',
					labelWidth : 80,
					width:243
				},
				
				{
					xtype : 'textfield',
					id : 'bz',
					fieldLabel : '备注说明',
					labelWidth : 80,
					width:243
				},
				
				{
					xtype : 'textfield',
					id : 'zw',
					fieldLabel : '指纹控制',
					labelWidth : 80,
					width:243
				},
				{
					xtype : 'textfield',
					id : 'sxh',
					fieldLabel : '顺序号',
					labelWidth : 80,
					 value : '0' ,
					width:243
					
				},
				{
					xtype : 'button',
					text : '添加步骤',
					icon: imgpath+'/add.png',
					width : 100,
					style : ' margin: 5px 0px 0px 10px',
					handler : function() {
						Ext.Ajax.request({
				    		url : AppUrl + 'pm_19/PRO_MM_FLOW_STEP_UPDATE',
				    	    params:{
								A_DICID: Ext.getCmp('dy').getValue(),
								A_STEPID:'',
								A_STEPNAME: Ext.getCmp('seltext').getValue(),
								A_PRE_STEPID: Ext.getCmp('syb').getValue(),
								A_AFTER_STEPID:Ext.getCmp('xyb').getValue(),
								A_URL:Ext.getCmp('lcdz').getValue(),
								A_REMARK:Ext.getCmp('bz').getValue(),
								A_FINGER:Ext.getCmp('zw').getValue(),
								A_ORDERID:Ext.getCmp('sxh').getValue(),
								OP:'add'
				            },
				            method: 'POST',
				    	    async: false,
				    	    success : function(response) {
				    			 var resp = Ext.decode(response.responseText);
				    			 if(resp.RET == 'Success') {
				    				 Ext.Msg.alert('提示', '添加成功');  
				    				 OnQueryBtnClicked();
				    				 Ext.ComponentManager.get("syb").getStore().removeAll();
									 Ext.ComponentManager.get("syb").getStore().load({
										 params:{
											 A_DICID:Ext.getCmp('dy').getValue()
										 }
									 });
									 Ext.ComponentManager.get("xyb").getStore().removeAll();
									 Ext.ComponentManager.get("xyb").getStore().load({
										 params:{
											 A_DICID:Ext.getCmp('dy').getValue()
										 }
									 });
									 return;
				    			 }
								Ext.Msg.alert('提示', '添加失败');
				    	    }
				        });	


					}

				},
				{
				xtype : 'button',
				text : '修改步骤',
				icon: imgpath+'/edit.png',
				width : 100,
				style : ' margin: 5px 0px 0px 10px',
				handler : function() {
					Ext.Ajax.request({
			    		url : AppUrl + 'pm_19/PRO_MM_FLOW_STEP_UPDATE',
			    	    params:{
							A_DICID:Ext.getCmp('dy').getValue(),
							A_STEPID:Ext.getCmp('bzid').getValue(),
							A_STEPNAME:Ext.getCmp('seltext').getValue(),
							A_PRE_STEPID:Ext.getCmp('syb').getValue(),
							A_AFTER_STEPID:Ext.getCmp('xyb').getValue(),
							A_URL:Ext.getCmp('lcdz').getValue(),
							A_REMARK:Ext.getCmp('bz').getValue(),
							A_FINGER: Ext.getCmp('zw').getValue(),
							A_ORDERID:Ext.getCmp('sxh').getValue(),
							OP:'update'
			            },
			            method: 'POST',
			    	    async: false,
			    	    success : function(response) {
			    			 var resp = Ext.decode(response.responseText);
			    			 if(resp.RET== 'Success') {
			    				 Ext.Msg.alert('提示', '修改成功');  
			    				 OnQueryBtnClicked();
			    				 Ext.ComponentManager.get("syb").getStore().removeAll();
								 Ext.ComponentManager.get("syb").getStore().load({
									 params:{
										 A_DICID:Ext.getCmp('dy').getValue()
									 }
								 });
								 Ext.ComponentManager.get("xyb").getStore().removeAll();
								 Ext.ComponentManager.get("xyb").getStore().load({
									 params:{
										 A_DICID: Ext.getCmp('dy').getValue()
									 }
								 });
								 return;
			    			 }
			    			 Ext.Msg.alert('提示', '修改失败');
			    	    }
			        });
				}
			}]
	});
	var grid = Ext.create('Ext.grid.Panel', {
		id : 'grid',
		region : 'center',
		columnLines : true,
		width : '100%',
		store : {
			id : 'gridStore',
			autoLoad : false,
			fields : ['STEPID','ORDERID','STEPNAME','PRE_STEPNAME','AFTER_STEPNAME','URL','REMARK','FINGER','PRE_STEPID','AFTER_STEPID'],
			proxy : {
				type : 'ajax',
				async : false,
				url : AppUrl + 'pm_19/PRO_MM_FLOW_STEP',
				actionMethods : {
					read : 'POST'
				},
				reader : {
					type : 'json',
					root : 'list',
					total : 'total'
				}
			}
		},
		autoScroll : true,
		height : 400,
		columns : [
			{ dataIndex: 'STEPID',  hidden: true },
			{ dataIndex: 'PRE_STEPID',  hidden: true },
			{ dataIndex: 'AFTER_STEPID',  hidden: true },
			{
				text : '顺序号',
				width : 150,
				dataIndex : 'ORDERID',
				align : 'center'
			}, {
				text : '步骤名称',
				width : 150,
				dataIndex : 'STEPNAME',
				align : 'center'
			},
			{ dataIndex: 'STEPID',  hidden: true },

			{
				text : '上一步',
				width : 150,
				dataIndex : 'PRE_STEPNAME',
				align : 'center'
			}, {
				text : '下一步',
				width : 150,
				dataIndex : 'AFTER_STEPNAME',
				align : 'center'
			}, {
				text : '页面地址',
				width : 200,
				dataIndex : 'URL',
				align : 'center'
			}, {
				text : '备注',
				width : 150,
				dataIndex : 'REMARK',
				type : 'date',
				align : 'center'

			}, {
				text : '指纹控制',
				width : 150,
				dataIndex : 'FINGER',
				type : 'date',
				align : 'center'

			}, {
				text : '删除',
				width : 150,
				layout : 'fit',
				align : 'center',
					renderer : function() {
						return "<input type=button value='删除' onclick='OnButtonDeleteClicked()' />";
					}
			}
		],
		listeners : {
			itemdblclick : importClick
		}

	});

	Ext.create('Ext.container.Viewport', {
		id : "id",
		layout : 'border',
		items : [ panel, grid ]
	});
	

	Ext.data.StoreManager.lookup('ckstore').on("load", function() {
		Ext.getCmp("ck").select(Ext.data.StoreManager.lookup('ckstore').getAt(0));
		Ext.ComponentManager.get("dy").getStore().load({
			params:{
				A_PLANTCODE:Ext.getCmp('ck').getValue()
	        }
		});
		
	});

	 Ext.data.StoreManager.lookup('dystore').on("load", function () {
		Ext.getCmp("dy").select(Ext.data.StoreManager.lookup('dystore').getAt(0));
		Ext.ComponentManager.get("syb").getStore().load({
			 params:{
				 A_DICID:Ext.getCmp('dy').getValue()
			 }
		});
	 });

	 Ext.ComponentManager.get("syb").store.on("load", function () {
 		Ext.ComponentManager.get("syb").store.insert(0, { 'STEPID': '', 'STEPNAME': '无' });
 		Ext.getCmp("syb").select(sybstore.getAt(0));        
 		});
	 
	 Ext.data.StoreManager.lookup('dystore').on("load", function () {
	        Ext.getCmp("dy").select(Ext.data.StoreManager.lookup('dystore').getAt(0));
	        Ext.ComponentManager.get("xyb").getStore().load({
	        	 params:{
					 A_DICID:Ext.getCmp('dy').getValue()
		         }
			});
	 });	 
	Ext.ComponentManager.get("xyb").store.on("load", function () {
  		Ext.ComponentManager.get("xyb").store.insert(0, { 'STEPID': '', 'STEPNAME': '无' });
  		Ext.getCmp("xyb").select(xybstore.getAt(0));        
  	});
	 
	 
	 
	 
Ext.ComponentManager.get("ck").on("select", function() {
	Ext.ComponentManager.get("dy").getStore().removeAll();
	Ext.ComponentManager.get("dy").getStore().load({ 
		params:{
			A_PLANTCODE:Ext.getCmp('ck').getValue()
        }
	});
});


Ext.ComponentManager.get("dy").on("select", function() {
	Ext.ComponentManager.get("syb").getStore().removeAll();
	Ext.ComponentManager.get("syb").getStore().load({ 
		 params:{
			 A_DICID:Ext.getCmp('dy').getValue()
         }
	});
});

Ext.ComponentManager.get("dy").on("select", function() {
	Ext.ComponentManager.get("syb").getStore().removeAll();
	Ext.ComponentManager.get("syb").getStore().load({
		 params:{
			 A_DICID: Ext.getCmp('dy').getValue()
         }
	});

	
	Ext.ComponentManager.get("xyb").getStore().removeAll();
	Ext.ComponentManager.get("xyb").getStore().load({ 
		 params:{
			 A_DICID:Ext.getCmp('dy').getValue()
         }
	});
});

});
//查询
function OnQueryBtnClicked() {
	Ext.data.StoreManager.lookup('gridStore').load({
		params : {
			A_DICID:Ext.getCmp('dy').getValue()
		}
    });      
}


//选中
function importClick() {
	Ext.getCmp('sxh').setValue(Ext.getCmp('grid').getSelectionModel().selected.items[0].data.ORDERID);
	Ext.getCmp('seltext').setValue(Ext.getCmp('grid').getSelectionModel().selected.items[0].data.STEPNAME);
	//Ext.getCmp('syb').setValue(Ext.getCmp('grid').getSelectionModel().selected.items[0].data.PRE_STEPNAME);
	//Ext.getCmp('xyb').setValue(Ext.getCmp('grid').getSelectionModel().selected.items[0].data.AFTER_STEPNAME);
	Ext.getCmp('syb').select(Ext.getCmp('grid').getSelectionModel().selected.items[0].data.PRE_STEPID);
	Ext.getCmp('xyb').select(Ext.getCmp('grid').getSelectionModel().selected.items[0].data.AFTER_STEPID);
	Ext.getCmp('lcdz').setValue(Ext.getCmp('grid').getSelectionModel().selected.items[0].data.URL);
	Ext.getCmp('bz').setValue(Ext.getCmp('grid').getSelectionModel().selected.items[0].data.REMARK);
	Ext.getCmp('zw').setValue(Ext.getCmp('grid').getSelectionModel().selected.items[0].data.FINGER);
	Ext.getCmp('bzid').setValue(Ext.getCmp('grid').getSelectionModel().selected.items[0].data.STEPID);
}



//删除
function OnButtonDeleteClicked() {
	Ext.Ajax.request({
		url : AppUrl + 'pm_19/PRO_MM_FLOW_STEP_UPDATE',
		params:{
			A_DICID:Ext.getCmp('dy').getValue(),
			A_STEPID:Ext.getCmp('grid').getSelectionModel().selected.items[0].data.STEPID,
			A_STEPNAME:Ext.getCmp('grid').getSelectionModel().selected.items[0].data.STEPNAME,
			A_PRE_STEPID: Ext.getCmp('grid').getSelectionModel().selected.items[0].data.PRE_STEPID,
			A_AFTER_STEPID:Ext.getCmp('grid').getSelectionModel().selected.items[0].data.AFTER_STEPID,
			A_URL:Ext.getCmp('grid').getSelectionModel().selected.items[0].data.URL,
			A_REMARK:Ext.getCmp('grid').getSelectionModel().selected.items[0].data.REMARK,
			A_FINGER: Ext.getCmp('grid').getSelectionModel().selected.items[0].data.FINGER,
			A_ORDERID: Ext.getCmp('grid').getSelectionModel().selected.items[0].data.ORDERID,
			OP:'delete'
		},
		method: 'POST',
		async: false,
		success : function(response) {
			 var resp = Ext.decode(response.responseText);
			 if(resp.RET == 'Success') {
				 Ext.Msg.alert('提示', '删除成功');
				 OnQueryBtnClicked();
				 Ext.ComponentManager.get("syb").getStore().removeAll();
				 Ext.ComponentManager.get("syb").getStore().load({
					 params:{
						 A_DICID: Ext.getCmp('dy').getValue()
					 }
				 });
				 Ext.ComponentManager.get("xyb").getStore().removeAll();
				 Ext.ComponentManager.get("xyb").getStore().load({
					 params:{
						 A_DICID:Ext.getCmp('dy').getValue()
					 }
				 });
				return;
			 }
			 Ext.Msg.alert('提示', '删除失败');
		}
	});
}

