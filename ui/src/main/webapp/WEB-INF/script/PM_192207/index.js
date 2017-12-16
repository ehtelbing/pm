Ext.onReady(function() {
	 var wxlxstore = Ext.create('Ext.data.Store', {
	        autoLoad: true,
	        storeId: 'wxlxstore',
	        fields: ['MENDTYPE_CODE', 'MENDTYPE_DESC'],
	        proxy: {
	            type: 'ajax',
	            async: false,
	            url: AppUrl + 'pm_19/PRO_WP_MENDTYPE_ALL',
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
		title : '维修单位设置',
		width : '100%',
		region : 'north',
		frame : true,
		layout : 'column',
		items : [
				{
					xtype : 'textfield',
					id : 'wxdwbm',
					fieldLabel : '维修单位编码',
					labelAlign : 'right',
					labelWidth : 100,
					width : 263,
					style : ' margin: 5px 0px 5px 5px'
				   // value : '1' 
				},
				{
					xtype : 'textfield',
					id : 'wxdwms',
					fieldLabel : '维修单位描述',
					labelAlign : 'right',
					labelWidth : 100,
					width : 263,
					style : ' margin: 5px 0px 5px 5px'
				},
				{
					xtype : 'combo',
					id : "wxlx",
					store : wxlxstore,
					editable : false,
					style : ' margin: 5px 0px 5px 5px',
					queryMode : 'local',
					fieldLabel : '维修类型',
					displayField : 'MENDTYPE_DESC',
				    valueField : 'MENDTYPE_CODE',
					labelWidth : 100,
					labelAlign : 'right'
				},
				{
					xtype : 'combo',
					id : "syzt",
					editable : false,
					queryMode : 'local',
					fieldLabel : '使用状态',
					store : [ [ '1', '启用' ], [ '0', '停用' ]],
					labelWidth : 100,
					style : ' margin: 5px 0px 5px 5px',
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
					xtype : 'button',
					text : '添加维修单位',
					icon: imgpath+'/add.png',
					width : 100,
					style : ' margin: 5px 0px 5px 10px',
					handler : function() {
						Ext.Ajax.request({
				    		url : AppUrl + 'pm_19/PRO_WP_MEND_DEPART_ADD',
				    	    params:{
								A_MEND_DEPARTCODE:Ext.getCmp('wxdwbm').getValue(),
								A_MEND_DEPARTNAME:Ext.getCmp('wxdwms').getValue(),
								A_MENDTYPE: Ext.getCmp('wxlx').getValue(),
							    A_USEFLAG:Ext.getCmp('syzt').getValue(),
				            },
				            method: 'POST',
				    	    async: false,
				    	    success : function(response) {
				    			 var resp = Ext.decode(response.responseText);
				    			 if(resp.RET == 'Success') {
				    				 Ext.Msg.alert('提示', '添加成功');  
				    				 OnQueryBtnClicked();
				    			 }else{
									 Ext.Msg.alert('提示', '添加失败');
								 }
				    	    }
				        });
					}
				},
				{
				xtype : 'button',
				text : '修改维修单位',
				icon: imgpath+'/edit.png',
				width : 100,
				style : ' margin: 5px 0px 5px 10px',
				handler : function() {
					Ext.Ajax.request({
			    		url : AppUrl + 'pm_19/PRO_WP_MEND_DEPART_UPDATE',
			    	    params:{
							A_MEND_DEPARTCODE:Ext.getCmp('wxdwbm').getValue(),
							A_MEND_DEPARTNAME:Ext.getCmp('wxdwms').getValue(),
							A_MENDTYPE:Ext.getCmp('wxlx').getValue(),
							A_USEFLAG:Ext.getCmp('syzt').getValue(),
			            },
			            method: 'POST',
			    	    async: false,
			    	    success : function(response) {
			    			 var resp = Ext.decode(response.responseText);
							if(resp.RET == 'Success') {
								Ext.Msg.alert('提示', '修改成功');
								OnQueryBtnClicked();
							}else{
								Ext.Msg.alert('提示', '修改失败');
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
        title:'维修单位列表',
		store : {
			id : 'gridStore',
			autoLoad : false,	
			fields : ['MEND_DEPARTCODE','MEND_DEPARTNAME','MENDTYPE','USEFLAG'],
			proxy : {
				type : 'ajax',
				async : false,
				url : AppUrl + 'pm_19/PRO_WP_MEND_DEPART_ALL',
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
		}, {
			text : '维修单位描述',
			width : 110,
			dataIndex : 'MEND_DEPARTNAME',
			align : 'center'
		},
		{
			text : '维修类型',
			width : 100,
			dataIndex : 'MENDTYPE',
			align : 'center'
		}, {
			text : '使用状态',
			width : 70,
			dataIndex : 'USEFLAG',
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
	Ext.getCmp('syzt').select('1');//使用状态默认
	Ext.data.StoreManager.lookup('wxlxstore').on("load", function() {
		Ext.getCmp("wxlx").select(Ext.data.StoreManager.lookup('wxlxstore').getAt(0));
	});
});

//查询
function OnQueryBtnClicked() {
	Ext.data.StoreManager.lookup('gridStore').load({ 			
			params : {}
    });      
}
//选中
function importClick() {		
	Ext.getCmp('wxdwbm').setValue(Ext.getCmp('grid').getSelectionModel().selected.items[0].data.MEND_DEPARTCODE);
	//Ext.getCmp('qsbz').setValue(Ext.getCmp('grid').getSelectionModel().selected.items[0].data.STARTSTEPNAME);
	Ext.getCmp('wxdwms').setValue(Ext.getCmp('grid').getSelectionModel().selected.items[0].data.MEND_DEPARTNAME);
	Ext.getCmp('wxlx').setValue(Ext.getCmp('grid').getSelectionModel().selected.items[0].data.MENDTYPE);
	//Ext.getCmp('selSection').setValue(Ext.getCmp('grid').getSelectionModel().selected.items[0].data.STATUSFLAG);
	Ext.getCmp('syzt').setValue(Ext.getCmp('grid').getSelectionModel().selected.items[0].data.USEFLAG);
}




//删除
function OnButtonDeleteClicked() {
		Ext.Ajax.request({
    		url : AppUrl + 'pm_19/PRO_WP_MEND_DEPART_DELETE',
    	    params:{
				A_MEND_DEPARTCODE:Ext.getCmp('grid').getSelectionModel().selected.items[0].data.MEND_DEPARTCODE
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
  

		
		