Ext.onReady(function() {
	 var  ckstore = Ext.create('Ext.data.Store', {
	        autoLoad: true,
	        storeId: 'ckstore',
	        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
	        proxy: {
	            type: 'ajax',
	            async: false,
	            url: AppUrl+ 'PM_12/PRO_BASE_DEPT_VIEW',
	            actionMethods: {
	                read: 'POST'
	            },
	            reader: {
	                type: 'json',
	                root: 'list'
	            },
	            extraParams:{
					IS_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
					IS_V_DEPTTYPE: '[基层单位]'
	            }
	        }
	    });	
	 
	 
	 var  kxzystore = Ext.create('Ext.data.Store', {
	        autoLoad: true,
	        storeId: 'kxzystore',
	        fields: ['MEND_DEPARTCODE', 'MEND_DEPARTNAME'],
	        proxy: {
	            type: 'ajax',
	            async: false,
	            url: AppUrl + 'pm_19/PRO_WP_MEND_DEPART_ABLE',
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
		title : '维修单位厂矿使用设置',
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
					labelWidth : 100,
					labelAlign : 'right'
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
					xtype : 'combo',
					id : "kxzy",
					store : kxzystore,
					editable : false,
					queryMode : 'local',
					fieldLabel : '可选维修单位',
					displayField : 'MEND_DEPARTNAME',
					valueField : 'MEND_DEPARTCODE',
					labelWidth : 100,
					style : ' margin: 5px 0px 5px 10px',
					labelAlign : 'right'
				},
				{
					xtype : 'button',
					text : '添加维修单位',
					icon: imgpath+'/add.png',
					width : 150,
					style : ' margin: 5px 0px 5px 10px',
					handler : function() {
						Ext.Ajax.request({
				    		url : AppUrl + 'pm_19/PRO_WP_MEND_DEPART_PLANT_ADD',
				    	    params:{
								A_MEND_DEPARTCODE:Ext.getCmp('kxzy').getValue(),
								A_PLANTCODE: Ext.getCmp('ck').getValue()
				            },
				            method: 'POST',
				    	    async: false,
				    	    success : function(response) {
				    			 var resp = Ext.decode(response.responseText);
				    			 if(resp.RET == 'Success') {
				    				 Ext.Msg.alert('提示', '添加成功');  
				    				 OnQueryBtnClicked();
				    			 }else {
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
        title:'当前厂矿使用列表',
		store : {
			id : 'gridStore',
			autoLoad : false,
			fields : ['MEND_DEPARTCODE','MEND_DEPARTNAME','PLANTCODE'],
			proxy : {
				type : 'ajax',
				async : false,
				url : AppUrl + 'pm_19/PRO_WP_MEND_DEPART_PLANT',
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
			text : '维修单位编码',
			width : 150,
			dataIndex : 'MEND_DEPARTCODE',
			align : 'center'
		},
		{
			text : '维修单位描述',
			width : 150,
			dataIndex : 'MEND_DEPARTNAME',
			align : 'center'
		},
		{
			text : '操作',
			width : 150,
			layout : 'fit',
			align : 'center',
			renderer : function() {
				return "<input type=button value='删除' icon: imgpath+'/delete1.png', width: 60,  onclick='OnButtonDeleteClicked()' />";
			}
		}]
	});

	Ext.create('Ext.container.Viewport', {
		id : "id",
		layout : 'border',
		items : [ panel, grid ]
	});
	Ext.data.StoreManager.lookup('ckstore').on("load", function() {
		Ext.getCmp("ck").select(Ext.data.StoreManager.lookup('ckstore').getAt(0));
	});
	Ext.data.StoreManager.lookup('kxzystore').on("load", function() {
		Ext.getCmp("kxzy").select(Ext.data.StoreManager.lookup('kxzystore').getAt(0));
	});
});
//查询
function OnQueryBtnClicked() {
	Ext.data.StoreManager.lookup('gridStore').load({
		params : {
			A_PLANTCODE: Ext.getCmp('ck').getValue(),
			A_MENDTYPE: "%"
		}
    });      
}



//删除
function OnButtonDeleteClicked() {
	Ext.Ajax.request({
		url : AppUrl + 'pm_19/PRO_WP_MEND_DEPART_PLANT_DEL',
		params:{
			A_MEND_DEPARTCODE: Ext.getCmp('grid').getSelectionModel().selected.items[0].data.MEND_DEPARTCODE,
			A_PLANTCODE: Ext.getCmp('ck').getValue()
		},
		method: 'POST',
		async: false,
		success : function(response) {
			 var resp = Ext.decode(response.responseText);
			 if(resp.RET == 'Success') {
				 Ext.Msg.alert('提示', '删除成功');
				 OnQueryBtnClicked();
			 } else {
				 Ext.Msg.alert('提示', '删除失败');
			 }
		}
	});
}
  

		
		
		
		

		
		
	
