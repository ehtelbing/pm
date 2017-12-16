var status_desc = "";
if (location.href.split('?')[1] != undefined) {
	status_desc = Ext.urlDecode(location.href.split('?')[1]).ORDER_STATUS_DESC;
	
}
Ext.onReady(function() {
	
	  var cursorStore = Ext.create('Ext.data.Store', {// 检修状态
		autoLoad : true,
		storeId : 'cursorStore',
		fields : [ 'ORDER_STATUS', 'ORDER_STATUS_DESC' ],
		proxy : {
			type : 'ajax',
			url : APP + '/ModelSelect',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			},
			extraParams : {
				parName : [],
				parType : [],
				parVal : [],
				proName : 'pro_dj702_droplist',
				cursorName : 'v_cursor'
			}
		}
	});

			var jxdwStore = Ext.create('Ext.data.Store', {//检修单位名称 下拉列表
				autoLoad : true,
				storeId : 'jxdwStore',
				fields : [ 'MENDDEPT_NAME','MENDDEPT_CODE'],
				proxy : {
					type : 'ajax',
					url : APP + '/ModelSelect',
					actionMethods : {
						read : 'POST'
					},
					reader : {
						type : 'json',
						root : 'list'
					}
					,
					extraParams : {
						parName : ['v_userid'],
						parType : ['s'],
						parVal:[ Ext.util.Cookies.get("mm.userid")],
						proName : 'pro_dj702_jxdwdroplist',
						cursorName : 'v_cursor'
					}
				}
			});

			var gridStore = Ext.create('Ext.data.Store', {// 表格查询
				autoLoad : false,
				storeId : 'gridStore',
				fields : [ 'POWERID', 'ORDER_STATUS', 'USERID', 'USERNAME',
						'STATUS', 'MENDDEPT_NAME', 'MENDDEPT_CODE' ]
				
			});

			var Panel1 = Ext.create('Ext.panel.Panel', {// 头列表
				id : 'Panel1',
				region : 'north',
				style : 'margin: 5px 0px 0px 0px',
				frame : true,
				title : '检修人员状态配置',
				layout : 'vbox',
				items : [ { 
			        xtype : 'button',//
					text:'确定',
					style : ' margin: 0px 0px 0px 20px',
					id:'insert'	,
					listeners : {
						click : insert
					}
				
					
				},{xtype : 'combo',
					id : 'fix_status',
					fieldLabel : '检修状态',
					labelAlign : 'right',
					labelWidth : 80,
					editable : false,
					valueField : 'ORDER_STATUS',
					displayField : 'ORDER_STATUS_DESC',
					store : 'cursorStore',
					queryMode : 'local',
					readOnly:true,
					width:180
					
				
				
			},{
				xtype : 'textfield',//建立文本输入框 
				fieldLabel : '人员编码',
				id : 'userid',
				labelAlign : 'right',//靠右
				labelWidth : 80,//标签宽度
				width:180
			},{
				xtype : 'textfield',//建立文本输入框 
				fieldLabel : '人员名称',
				id : 'username',
				labelAlign : 'right',//靠右
				labelWidth : 80,//标签宽度
				width:180
			},{
				xtype : 'textfield',//建立文本输入框 
				fieldLabel : '当前状态',
				id : 'sts',
				labelAlign : 'right',//靠右
				labelWidth : 80,//标签宽度
				width:180
			},{
					xtype : 'combo',
					id : 'menddeptcode',
					fieldLabel : '检修单位名称',
					labelAlign : 'right',
					labelWidth : 80,
					//editable : false,
					valueField : 'MENDDEPT_CODE',
					displayField : 'MENDDEPT_NAME',
					store : 'jxdwStore',
					queryMode : 'local'
				}]
			});

			
			Ext.create('Ext.container.Viewport', {
				layout : 'border',
				items : [ Panel1]
			});

		
		
		
	Ext.data.StoreManager.lookup('cursorStore').on('load',function(){
		//Ext.getCmp('fix_status').select(Ext.data.StoreManager.lookup('cursorStore').getAt(0));
		Ext.getCmp('fix_status').select(status_desc);
	});



function insert(){
	
	Ext.Ajax.request(
			{
				
				async : false,
				url : APP + '/ModelChange',
				actionMethods : {
					read : 'POST'
				},
				reader : {
					type : 'json',
					root : 'list'
				},
				params : {
					parName : ['v_ordersts',
					              'v_userid',
					              'v_username',
					              'v_sts',
					              'v_menddeptcode'],
					parType : ['s','s','s','s','s'],
					parVal : [ Ext.getCmp('fix_status').getValue(),
					           Ext.getCmp('userid').getValue(),
					           Ext.getCmp('username').getValue(),
					           Ext.getCmp('sts').getValue(),
					           Ext.getCmp('menddeptcode').getValue()
					           ],
					proName : 'pro_dj702_insert',
					cursorName : 'ret',
					returnStr : [ 'RET' ],
					returnStrType : [ 's' ]
				},
				success : function(response) {
					var resp = Ext.decode(response.responseText);
					if(resp=="Success"){
					    Ext.example.msg("提示",'执行成功');
					    
					    window.returnValue = "success";
					    window.close();
					}else{
					    Ext.example.msg("提示",'执行失败');
					}
				}
				
			});


}

});
