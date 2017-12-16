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
	
	 var qsbzStore = Ext.create('Ext.data.Store', {
	        autoLoad: false,
	        storeId: 'qsbzStore',
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
	 
	 var lcmsStore = Ext.create('Ext.data.Store', {
			autoLoad: true,
			storeId: 'lcmsStore',
	        fields: ['REMARK', 'REMARK'],
	        proxy: {
	            type: 'ajax',
	            async: false,
	            url: AppUrl + 'pm_19/PRO_MM_FLOW_DIC_REMARK',
	            actionMethods: {
	                read: 'POST'
	            },
	            reader: {
	                type: 'json',
	                root: 'list'
	            },
	            extraParams:{}
	        }
	    });
	 
	var panel = Ext.create('Ext.panel.Panel', {
		id : 'panellow',
		title : '流程定义设置',
		width : '100%',
		region : 'north',
		frame : true,
		layout : 'column',
		items : [
               { xtype: 'textfield', id: 'lcid',hidden:true},
				{
					xtype : 'combo',
					id : "ck",
					store : ckstore,
					editable : false,
					style : ' margin: 5px 0px 5px 10px',
					queryMode : 'local',                       
					fieldLabel : '厂矿名称',
					displayField : 'V_DEPTNAME',
					valueField : 'V_DEPTCODE',
					labelWidth : 60,
					labelAlign : 'right'
				}, 
				{
					xtype : 'button',
					text : '查询',
					icon : imgpath + '/search.png',
					width : 60,
					style : ' margin: 5px 0px 5px 10px',
					listeners: { click: OnQueryBtnClicked }

				}, 

				{
					xtype : 'textfield',
					id : 'seltext',
					fieldLabel : '流程名称',
					labelAlign : 'right',
					labelWidth : 60,
					width:223,
					style : ' margin: 5px 0px 5px 10px'
				},


				{
					xtype : 'combo',
					id : "qsbz",
					store : qsbzStore,
					editable : false,
					style : ' margin: 5px 0px 5px 10px',
					queryMode : 'local',
					fieldLabel : '起始步骤',
					displayField : 'STEPNAME',
					valueField : 'STEPID',
					labelWidth : 60,
					labelAlign : 'right'
				},
				
				{
					xtype : 'combo',
					id : "lcms",
					store : lcmsStore,
					editable : false,
					style : ' margin: 5px 0px 5px 10px',
					queryMode : 'local',
					fieldLabel : '流程描述',
					displayField : 'REMARK',
				    valueField : 'REMARK',
					labelWidth : 60,
					labelAlign : 'right'
				},
				
				{
					xtype : 'textfield',
					id : 'yxj',
					fieldLabel : '优先级',
					labelAlign : 'right',
					style : ' margin: 5px 0px 5px 10px',
				    value : '1' ,
					labelWidth : 60,
					width:223
				},
				{
					xtype : 'combo',
					id : "selSection",
					editable : false,
					queryMode : 'local',
					fieldLabel : '使用状态',
					store : [ [ '1', '启用' ], [ '0', '停用' ]],
					labelWidth : 60,
					style : ' margin: 5px 0px 5px 10px',
					labelAlign : 'right'

				},
				{
					xtype : 'button',
					text : '添加流程',
					icon: imgpath+'/add.png',
					width : 100,
					style : ' margin: 5px 0px 5px 10px',
					handler : function() {
						Ext.Ajax.request({
				    		url : AppUrl + 'pm_19/PRO_MM_FLOW_DIC_UPDATE',
				    	    params:{
								A_DICID:'',
								A_PLANTCODE:Ext.getCmp('ck').getValue(),
								A_FLOWNAME:Ext.getCmp('seltext').getValue(),
								A_REMARK:Ext.getCmp('lcms').getValue(),
								A_TYPE:'%',
								A_ORDERID: Ext.getCmp('yxj').getValue(),
								A_STATUSFLAG:Ext.getCmp('selSection').getValue(),
								A_STARTSTEP:Ext.getCmp('qsbz').getValue(),
								OP:'add'
				            },
				            method: 'POST',
				    	    async: false,
				    	    success : function(response) {
				    			 var resp = Ext.decode(response.responseText);
				    			 if(resp.RET == 'Success') {
				    				 Ext.Msg.alert('提示', '添加成功');  
				    				 OnQueryBtnClicked();
									 return;
				    			 }
								 Ext.Msg.alert('提示', '添加失败');
				    	    }
				        });	
					}
				},
				{xtype : 'button',
				text : '修改流程',
				 icon:imgpath+ '/edit.png',
				width : 100,
				style : ' margin: 5px 0px 5px 10px',
				handler : function() {
					Ext.Ajax.request({
						url : AppUrl + 'pm_19/PRO_MM_FLOW_DIC_UPDATE',
			    	    params:{
							A_DICID:Ext.getCmp('lcid').getValue(),
							A_PLANTCODE:Ext.getCmp('ck').getValue(),
							A_FLOWNAME: Ext.getCmp('seltext').getValue(),
							A_REMARK: Ext.getCmp('lcms').getValue(),
							A_TYPE:'%',
							A_ORDERID: Ext.getCmp('yxj').getValue(),
							A_STATUSFLAG:Ext.getCmp('selSection').getValue(),
							A_STARTSTEP:Ext.getCmp('qsbz').getValue(),
							OP:'update'
			            },
			            method: 'POST',
			    	    async: false,
			    	    success : function(response) {
			    			 var resp = Ext.decode(response.responseText);
			    			 Ext.Msg.alert('提示', '修改成功');  
		    				 OnQueryBtnClicked();
			    	    }
			        });	
				}
			},
			{xtype : 'button',
				text : '删除流程',
				icon:imgpath+ '/delete.png',
				width : 100,
				style : ' margin: 5px 0px 5px 10px',
				handler : function() {
					var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
					if (seldata.length != 1) {
						alert('请选择一条数据进行删除！');
						return false;
					}
					Ext.Ajax.request({
						url : AppUrl + 'pm_19/PRO_MM_FLOW_DIC_DEL',
						params:{
							V_V_DICID:seldata[0].data.DICID
						},
						method: 'POST',
						async: false,
						success : function(response) {
							var resp = Ext.decode(response.responseText);
							if(resp.RET=='SUCCESS'){
								Ext.Msg.alert('提示', '刪除成功');
								OnQueryBtnClicked();
							}

						}
					});
				}
			}
		]
	});
	var grid = Ext.create('Ext.grid.Panel', {
		id : 'grid',
		region : 'center',
		columnLines : true,
		width : '100%',
		selType : 'checkboxmodel',
		store : {
			id : 'gridStore',
			autoLoad : false,	
			fields : ['DICID','FLOWNAME','STARTSTEP','STARTSTEPNAME','REMARK','ITYPE','ORDERID','STATUSFLAG'],
			proxy : {
				type : 'ajax',
				async : false,
				url : AppUrl + 'pm_19/PRO_MM_FLOW_DIC',
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
		{
			xtype: 'rownumberer',
			text: '序号',
			width: 50,
			sortable: false
		}, {
			dataIndex: 'DICID',
			hidden: true
		}, {
			text : '流程名称',
			width : 150,
			dataIndex : 'FLOWNAME',
			align : 'center'
		}, {
			text : '流程描述',
			width : 200,
			dataIndex : 'REMARK',
			align : 'center'
		}, {
			text : '起始步骤',
			width : 200,
			dataIndex : 'STARTSTEPNAME',
			align : 'center'
		}, {
			text : '优先级',
			width : 100,
			dataIndex : 'ORDERID',
			align : 'center'
		}, {
			text : '使用状态',
			width : 150,
			dataIndex : 'STATUSFLAG',
			type : 'date',
			align : 'center'
		
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

	Ext.getCmp('selSection').select('1');//使用状态默认

	Ext.data.StoreManager.lookup('ckstore').on("load", function() {
		Ext.getCmp("ck").select(Ext.data.StoreManager.lookup('ckstore').getAt(0));
	});
});

//查询
function OnQueryBtnClicked() {
	Ext.data.StoreManager.lookup('gridStore').load({ 			
		params : {
			A_PLANTCODE: Ext.getCmp('ck').getValue()
		}	
    });      
}
//选中
function importClick() {		
	Ext.getCmp('seltext').setValue(Ext.getCmp('grid').getSelectionModel().selected.items[0].data.FLOWNAME);
	Ext.getCmp('qsbz').store.load({
		params:{
			 A_DICID:Ext.getCmp('grid').getSelectionModel().selected.items[0].data.DICID
       }
    });
	Ext.getCmp('qsbz').store.on('load',function(){
		Ext.ComponentManager.get('qsbz').select(Ext.getCmp('grid').getSelectionModel().selected.items[0].data.STARTSTEPNAME);
	});
	
	Ext.getCmp('lcms').setValue(Ext.getCmp('grid').getSelectionModel().selected.items[0].data.REMARK);
	Ext.getCmp('yxj').setValue(Ext.getCmp('grid').getSelectionModel().selected.items[0].data.ORDERID);
	Ext.getCmp('selSection').select(Ext.getCmp('grid').getSelectionModel().selected.items[0].data.STATUSFLAG);
	Ext.getCmp('lcid').setValue(Ext.getCmp('grid').getSelectionModel().selected.items[0].data.DICID);
	
}