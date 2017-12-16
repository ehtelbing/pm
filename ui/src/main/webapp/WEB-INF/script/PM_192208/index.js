Ext.onReady(function() {
	 var  ckstore = Ext.create('Ext.data.Store', {
	        autoLoad: true,
	        storeId: 'ckstore',
	        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
	        proxy: {
	            type: 'ajax',
	            async: false,
	            url: AppUrl + 'PM_12/PRO_BASE_DEPT_VIEW',
	            actionMethods: {
	                read: 'POST'
	            },
	            reader: {
	                type: 'json',
	                root: 'list'
	            },
	            extraParams:{
					IS_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
					IS_V_DEPTTYPE:'[基层单位]'
	            }
	        }
	    });	
	 
	 
	 var zyqstore = Ext.create('Ext.data.Store', {
			autoLoad : false,
			storeId : 'zyqstore',
			fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
			proxy : {
				type : 'ajax',
				async : false,
				url: AppUrl + 'PM_12/PRO_BASE_DEPT_VIEW',
				actionMethods : {
					read : 'POST'
				},
				reader : {
					type : 'json',
					root : 'list'
				}
			}
		});
	 

	 
	var panel = Ext.create('Ext.panel.Panel', {
		id : 'panellow',
		title : '计划项目编号设置',
		width : '100%',
		region : 'north',
		frame : true,
		layout : 'column',
		items : [
				{
					xtype : 'combo',
					id : "ck",
					store : ckstore,
					editable : false,
					style : ' margin: 5px 0px 5px 10px',
					queryMode : 'local',                       
					fieldLabel : '厂矿列表',
					displayField : 'V_DEPTNAME',
					valueField : 'V_DEPTCODE',
					labelWidth : 80,
					labelAlign : 'right'
				}, 
				{
					xtype : 'combo',
					id : "zyq",
					store : zyqstore,
					editable : false,
					queryMode : 'local',
					fieldLabel : '作业区',
					displayField : 'V_DEPTNAME',
					valueField : 'V_DEPTCODE',
					labelWidth : 80,
					style : ' margin: 5px 0px 5px 10px',
					labelAlign : 'right'
				},
				{
					xtype : 'textfield',
					id : 'bhqz',
					fieldLabel : '编号前缀',
					labelAlign : 'right',
					labelWidth : 80,
					width : 242,
					style : ' margin: 5px 0px 5px 10px'
				},
				{

					xtype : 'button',
					text : '查询',
					icon : imgpath + '/search.png',
					width : 100,
					style : ' margin: 5px 0px 5px 10px',
					listeners: { click: OnQueryBtnClicked } 

				},
				{
					xtype : 'button',
					text : '添加',
					icon: imgpath+'/add.png',
					width : 100,
					style : ' margin: 5px 0px 5px 10px',
					handler : function() {
						Ext.Ajax.request({
				    		url : AppUrl + 'pm_19/PRO_WP_PLAN_PROJCODE_ADD',
				    	    params:{
								A_PLANTCODE:Ext.getCmp('ck').getValue(),
								A_DEPARTCODE:Ext.getCmp('zyq').getValue(),
								A_PROJCODE: Ext.getCmp('bhqz').getValue()
				            },
				            method: 'POST',
				    	    async: false,
				    	    success : function(response) {
				    			 var resp = Ext.decode(response.responseText);
				    			 if(resp.RET == 'Success') {
				    				 Ext.Msg.alert('提示', '添加成功');  
				    				 OnQueryBtnClicked();
				    			 } else{
									 Ext.Msg.alert('提示', '添加失败');
								 }
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
			fields : ['PLANTCODE','PLANTNAME','DEPARTCODE','DEPARTNAME','PROJ_PREFIX'],
			proxy : {
				type : 'ajax',
				async : false,
				url : AppUrl + 'pm_19/PRO_WP_PLAN_PROJCODE_ALL',
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
{ dataIndex: 'PLANTCODE',  hidden: true },   
{ dataIndex: 'DEPARTCODE',  hidden: true },
		  {   
		text : '厂矿名称',
		width : 150,
		dataIndex : 'PLANTNAME',
		align : 'center'
				},      
			
		{
			text : '作业区名称',
			width : 150,
			dataIndex : 'DEPARTNAME',
			align : 'center'
		},
		{
			text : '项目编码前缀',
			width : 150,
			dataIndex : 'PROJ_PREFIX',
			type : 'date',
			align : 'center'
		
		},
		{
			text : '删除',
			width : 150,
			layout : 'fit',
			align : 'center',
			renderer : function() {
				return "<input type=button value='删除' onclick='OnButtonDeleteClicked()' />";
			}
		}]
	});

	Ext.create('Ext.container.Viewport', {
		id : "id",
		layout : 'border',
		items : [ panel, grid ]
	});
	ckstore.on("load",function() {
		Ext.getCmp("ck").select(ckstore.getAt(0));
		Ext.data.StoreManager.lookup('zyqstore').load({
			params : {
				IS_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
				IS_V_DEPTTYPE:'[主体作业区]'
			}
		});
	});

	zyqstore.on("load",function() {
		Ext.getCmp("zyq").select(zyqstore.getAt(0));	
	});

	Ext.getCmp('ck').on("select",function() {
		Ext.data.StoreManager.lookup('zyqstore').removeAll();
		Ext.data.StoreManager.lookup('zyqstore').load({
			params : {
				IS_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
				IS_V_DEPTTYPE:'[主体作业区]'
			}
		});
	});
});
//查询
function OnQueryBtnClicked() {
	Ext.data.StoreManager.lookup('gridStore').load({
		params : {
			A_PLANTCODE:Ext.getCmp('ck').getValue(),
			A_DEPARTCODE:Ext.getCmp('zyq').getValue()
		}
    });      
}



//删除
function OnButtonDeleteClicked() {
		Ext.Ajax.request({
    		url : AppUrl + 'pm_19/PRO_WP_PLAN_PROJCODE_DEL',
    	    params:{
				A_PLANTCODE:Ext.getCmp('grid').getSelectionModel().selected.items[0].data.PLANTCODE,
				A_DEPARTCODE: Ext.getCmp('grid').getSelectionModel().selected.items[0].data.DEPARTCODE
            },
            method: 'POST',
    	    async: false,
    	    success : function(response) {
    			 var resp = Ext.decode(response.responseText);
    			 if(resp.RET == 'Success') {
    				 Ext.Msg.alert('提示', '删除成功');  
    				 OnQueryBtnClicked();
    			 }else {
					 Ext.Msg.alert('提示', '删除失败');
				 }
    	    }
		});	
		
}
  

		
		
		
		

		
		
	
