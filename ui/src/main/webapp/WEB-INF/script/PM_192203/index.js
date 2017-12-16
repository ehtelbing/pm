Ext.onReady(function () {
	//厂矿下拉
	var cknameStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'cknameStore',
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
	var cklbnameStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'cklbnameStore',
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
				IS_V_DEPTCODE:'',
				IS_V_DEPTTYPE:'[基层单位]'
            }
        }
    });
	
	
	
	
	//流程定义下拉
	var lcdyStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'lcdyStore',
        fields: ['DICID', 'FLOWNAME'],
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
	//步骤名称
	var bznameStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'bznameStore',
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
	
	
	//作业区下拉
	var zyqStore = Ext.create('Ext.data.Store', {
		 autoLoad: false,
	        storeId: 'zyqStore',
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
	            }
	        }
		
	});
	
	//分类下拉
	var fllbStore=Ext.create('Ext.data.Store', {
		 autoLoad: false,
	        storeId: 'fllbStore',
	        fields: ['DICTID', 'DICT_DESC'],
	        proxy: {
	            type: 'ajax',
	            async: false,
	            url: AppUrl + 'pm_19/PRO_WP_DICT_ALL',
	            actionMethods: {
	                read: 'POST'
	            },
	            reader: {
	                type: 'json',
	                root: 'list'
	            }
	        }
		
	});
	
	
	//角色列表store
	var userStore=Ext.create('Ext.data.Store',{
		 id: 'userStore',
         autoLoad: false,
         fields: ['ROLEID', 'ROLENAME', 'PLANTCODE', 'PLANTNAME'],
         proxy: {
             type: 'ajax',
             async: false,
             url: AppUrl + 'pm_19/PRO_MM_FLOW_ROLE',
             actionMethods: {
                 read: 'POST'
             },
             reader: {
                 type: 'json',
                 root: 'list'
             }
         }
	});
	
	
	//角色审批厂矿权限设置store
	var userckStore=Ext.create('Ext.data.Store',{
		 id: 'userckStore',
        autoLoad: false,
        fields: ['ROLEID', 'ROLENAME','PLANTCODE', 'PLANTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'pm_19/PRO_MM_FLOW_ROLE_POWER_PLANT',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
	});
	
	
	//作业区表
	var userzyqStore=Ext.create('Ext.data.Store',{
		 id: 'userzyqStore',
	        autoLoad: false,
	        fields: ['ROLEID', 'ROLENAME','DEPARTCODE', 'DEPARTNAME'],
	        proxy: {
	            type: 'ajax',
	            async: false,
	            url: AppUrl + 'pm_19/PRO_MM_FLOW_ROLE_POWER_DEPART',
	            actionMethods: {
	                read: 'POST'
	            },
	            reader: {
	                type: 'json',
	                root: 'list'
	            }
	        }
		});
	
	//维修专业表
	var userwxzyStore=Ext.create('Ext.data.Store',{
		 id: 'userwxzyStore',
	        autoLoad: false,
	        fields: ['ROLEID', 'ROLENAME','DICTID', 'DICTNAME'],
	        proxy: {
	            type: 'ajax',
	            async: false,
	            url: AppUrl + 'pm_19/PRO_MM_FLOW_ROLE_POWER_DICT',
	            actionMethods: {
	                read: 'POST'
	            },
	            reader: {
	                type: 'json',
	                root: 'list'
	            }
	        }
		});
	//人员表
	var personStore=Ext.create('Ext.data.Store',{
		 id: 'personStore',
	        autoLoad: false,
	        fields: ['USERID', 'USERNAME'],
	        proxy: {
	            type: 'ajax',
	            async: false,
	            url: AppUrl + 'pm_19/PRO_MM_FLOW_ROLE_POWER_USER',
	            actionMethods: {
	                read: 'POST'
	            },
	            reader: {
	                type: 'json',
	                root: 'list'
	            }
	        }
		});
	
	
	
 var  panel=Ext.create('Ext.panel.Panel',{
	 id:'panel',
	 region:'north',
	 layout:'column',
	 frame: true,
     items:[
            {xtype:'combo',fieldLabel:'厂矿名称',store:cknameStore,id:'ckname',editable: false,queryMode: 'local',displayField: 'V_DEPTNAME', valueField: 'V_DEPTCODE', labelWidth: 70, style: ' margin: 5px 0px 5px 10px', labelAlign: 'right' },
            {xtype:'combo',fieldLabel:'流程定义',store:lcdyStore,id:'lcdy',editable: false,queryMode: 'local',displayField: 'FLOWNAME', valueField: 'DICID', labelWidth: 70, style: ' margin: 5px 0px 5px 10px', labelAlign: 'right' },
            {xtype:'combo',fieldLabel:'步骤名称',store:bznameStore,id:'bzname',editable: false,queryMode: 'local',displayField: 'STEPNAME', valueField: 'STEPID', labelWidth: 70, style: ' margin: 5px 0px 5px 10px', labelAlign: 'right'},
            {xtype: 'button', text: '查询角色', icon: imgpath+'/search.png', width: 80, style: ' margin: 5px 0px 5px 10px',
            	handler: function () {
            		 Ext.data.StoreManager.lookup('userStore').load({
            			 params:{
							 A_STEPID:Ext.getCmp('bzname').getValue()
                         }
            		});
            	}},
            {xtype:'textfield',fieldLabel:'角色名称',id:'username',labelWidth: 70,width:233 , style: ' margin: 5px 0px 5px 10px', labelAlign: 'right'},
           {xtype:'label',id:'userid',hidden:true},
            {xtype:'button',text:'添加角色',icon:imgpath+ '/add.png', width: 80, style: ' margin: 5px 0px 5px 10px', listeners: { click: OnAddUserButtonClicked } },
            {xtype:'button',text:'修改角色',icon: imgpath+'/edit.png', width: 80, style: ' margin: 5px 0px 5px 10px', listeners: { click: OnUpdateUserButtonClicked } },
            {xtype:'textfield',fieldLabel:'人员添加',id:'person',labelWidth: 70,width:233 ,style: ' margin: 5px 0px 5px 10px', labelAlign: 'right'},
            {xtype:'button',text:'添加人员',icon: imgpath+'/add.png', width: 80, style: ' margin: 5px 0px 5px 10px', listeners: { click: OnAddPersonButtonClicked } }]
 });
 
 var panelcenter=Ext.create('Ext.panel.Panel',{
	 id:'panelcenter',
	 region:'center',
	 width:'100%',
	 height:'40%',
	 layout:'border',
	 items:[
	        {xtype:'grid',id:'usergrid',region:'center',width:'60%',title:'角色列表',store:userStore,columnLines: true,autoScroll: true,
	        	columns: [{ xtype: 'rownumberer', width: 30, sortable: false },
	        	          { text: '角色名称', width: 110, dataIndex: 'ROLENAME', align: 'center', renderer: atleft },
	        	          { text: '厂矿名称', width: 110, dataIndex: 'PLANTNAME', align: 'center', renderer: atleft },
	        	          {text : '操作',width : 150,align : 'center',
	        					renderer : function() {
	        	    				return "<input type=button value='选中角色' onclick='importClick()' />";
	        	    			} },
	        	          { text: '删除', width : 150,align : 'center',
		        					renderer : function() {
		        	    				return "<input type=button value='删除角色' onclick='deleteuserClick()' />";
		        	    			}}]
	        },
	        {xtype:'grid',id:'persongrid',region:'east',width:'40%',title:'人员列表',store:personStore,columnLines: true,autoScroll: true,
	        	columns: [
	        	          { text: '用户名', width: 110, dataIndex: 'USERID', align: 'center', renderer: atleft },
	        	          { text: '姓名', width: 110, dataIndex: 'USERNAME', align: 'center', renderer: atleft },
	        	          { text: '删除', width : 150,align : 'center',
		        					renderer : function() {
		        	    				return "<input type=button value='删除角色' onclick='deletepersonClick()' />";
		        	    			}}]
	        }]
 });
 
 
 
 var panelsouth=Ext.create('Ext.panel.Panel',{
	 id:'panelsouth',
	 region:'south',
	 height:'50%',
	 layout:'border',
	 items:[
		 {xtype:'panel',title:'角色审批厂矿权限设置', region:'west',width:'35%',layout:'border',
			 items:[
				 {xtype:'form',region:'north',frame:true,border:false,layout:'column',
					 items:[
						 {xtype:'combo',fieldLabel:'厂矿列表',store:cklbnameStore,id:'cklb',editable: false,queryMode: 'local',displayField: 'V_DEPTNAME', valueField: 'V_DEPTCODE', labelWidth: 70, style: ' margin: 5px 0px 5px 10px', labelAlign: 'right'},
						 {xtype:'button',text:'添加审批厂矿',icon: imgpath+'/add.png', width: 100, style: ' margin: 5px 0px 5px 10px', listeners: { click: OnAddckButtonClicked }}
					 ]
				 },
				 {xtype:'grid',id:'userckgrid',region:'center',store:userckStore,columnLines: true,autoScroll: true,
					 columns: [
						 { text: '角色名称', width: 110, dataIndex: 'ROLENAME', align: 'center', renderer: atleft },
						 { text: '厂矿名称', width: 110, dataIndex: 'PLANTNAME', align: 'center', renderer: atleft },
						 { text: '删除', width : 150,align : 'center',
							 renderer : function() {
								 return "<input type=button value='删除厂矿' onclick='deleteckClick()' />";
							 }
						 }]
				 }
		 	]
		 },
		 {xtype:'panel',title:'角色审批作业区权限设置',region:'center',layout:'border',
			 items:[
				 {xtype:'form',region:'north',frame:true,border:false,layout:'column',
					 items:[
						 {xtype:'combo',fieldLabel:'作业区',store:zyqStore,id:'zyqlb',editable: false,queryMode: 'local',displayField: 'V_DEPTNAME', valueField: 'V_DEPTCODE', labelWidth: 70, style: ' margin: 5px 0px 5px 10px', labelAlign: 'right'},
						 {xtype:'button',text:'添加审批作业区',icon:imgpath+ '/add.png', width: 120, style: ' margin: 5px 0px 5px 10px', listeners: { click: OnAddzyqButtonClicked }}
					 ]
				 },
				 {xtype:'grid',id:'userzyqgrid',region:'center',store:userzyqStore,columnLines: true,autoScroll: true,
					 columns: [
						 { text: '角色名称', width: 110, dataIndex: 'ROLENAME', align: 'center', renderer: atleft },
						 { text: '作业区名称', width: 110, dataIndex: 'DEPARTNAME', align: 'center', renderer: atleft },
						 { text: '删除', width : 150,align : 'center',
							 renderer : function() {
								 return "<input type=button value='删除作业区' onclick='deletezyqClick()' />";
							 }
						 }]
				 }
			 ]
		 },
		 {xtype:'panel',title:'角色审批维修计划专业分类权限设置',region:'east',layout:'border',width:'35%',
			 items:[
				 {xtype:'form',region:'north',frame:true,border:false,layout:'column',
					 items:[
						 {xtype:'combo',fieldLabel:'分类列表：',store:fllbStore,id:'fllb',editable: false,queryMode: 'local',displayField: 'DICT_DESC', valueField: 'DICTID', labelWidth: 70, style: ' margin: 5px 0px 5px 10px', labelAlign: 'right'},
						 {xtype:'button',text:'添加审批分类',icon: imgpath+'/add.png', width: 120, style: ' margin: 5px 0px 5px 10px', listeners: { click: OnAddflButtonClicked }}
					 ]
				 },
				{xtype:'grid',id:'userwxzygrid',region:'center',store:userwxzyStore,columnLines: true,autoScroll: true,
						columns: [
								 { text: '角色名称', width: 110, dataIndex: 'ROLENAME', align: 'center', renderer: atleft },
								 { text: '专业分类名称', width: 110, dataIndex: 'DICTNAME', align: 'center', renderer: atleft },
								 { text: '删除', width : 150,align : 'center',
										renderer : function() {
														return "<input type=button value='删除分类' onclick='deleteflClick()' />";
											}
								 }
						]
				}
		]}
		]
 });
 
 
 cknameStore.on("load", function() {
	 Ext.getCmp("ckname").select(cknameStore.getAt(0));
	 lcdyStore.load({
		 params : {
			 A_PLANTCODE:Ext.getCmp('ckname').getValue()
		}
	 });
 });
 
 Ext.ComponentManager.get("ckname").on("select", function() {
	 Ext.ComponentManager.get('lcdy').getStore().removeAll();
	 lcdyStore.load({
		 params : {
			 A_PLANTCODE:Ext.getCmp('ckname').getValue()
		}
	 });
 });
 
 
 
 lcdyStore.on("load",function (){
	 Ext.getCmp("lcdy").select(lcdyStore.getAt(0));
	 bznameStore.load({
		 params : {
			 A_DICID:Ext.getCmp('lcdy').getValue()
		}
	 });
 });
 
 Ext.ComponentManager.get("lcdy").on("select", function() {
	 Ext.ComponentManager.get('bzname').getStore().removeAll();
	 bznameStore.load({
		 params : {
			 A_DICID:Ext.getCmp('lcdy').getValue()
		}
	 });
 });
 
 bznameStore.on("load",function (){
	 Ext.getCmp("bzname").select(bznameStore.getAt(0));
	 Ext.data.StoreManager.lookup('userStore').load({
		 params:{
			 A_STEPID:Ext.getCmp('bzname').getValue()
         }
	});
 });
 
 
 
 
 //子表下拉
 cklbnameStore.on("load", function() {
	 Ext.getCmp("cklb").select(cklbnameStore.getAt(0));
	 zyqStore.load({
		 params : {
			 IS_V_DEPTCODE:Ext.getCmp('cklb').getValue(),
			 IS_V_DEPTTYPE:'[主体作业区]'
		}
	 });
 });
 
 
 Ext.ComponentManager.get("cklb").on("select", function() {
	 Ext.ComponentManager.get('zyqlb').getStore().removeAll();
	 zyqStore.load({
		 params : {
			 IS_V_DEPTCODE:Ext.getCmp('cklb').getValue(),
			 IS_V_DEPTTYPE:'[主体作业区]'
		}
	 });
 });
 
 zyqStore.on("load",function(){
	 Ext.getCmp("zyqlb").select(zyqStore.getAt(0));
	 fllbStore.load({
		 params : {}
	 });
 });
 
 
 zyqStore.on("select", function() {
	 Ext.ComponentManager.get('fllb').getStore().removeAll();
	 fllbStore.load({
		 params : {}
	 });
 });
 
 fllbStore.on("load",function(){
	 Ext.getCmp("fllb").select(fllbStore.getAt(0));
 })

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [panel,panelcenter,panelsouth]
    });
});
//添加角色
function OnAddUserButtonClicked(){
	 Ext.Ajax.request({
         url: AppUrl + 'pm_19/PRO_MM_FLOW_ROLE_UPDATE',
         async: false,
         method: 'post',
         params:{
			 A_STEPID:Ext.getCmp('bzname').getValue(),
			 A_ROLEID:'',
	         A_ROLENAME:Ext.getCmp('username').getValue(),
			 A_PLANTCODE:Ext.getCmp('ckname').getValue(),
			 A_PLANTNAME: Ext.getCmp('ckname').rawValue,
			 OP: 'add'
         },
         success: function (resp) {
        	 var resp=Ext.JSON.decode(resp.responseText);
        	 if(resp.RET=='Success'){
        		 Ext.Msg.alert('操作信息',  '添加成功');
        		 Ext.data.StoreManager.lookup('userStore').load({
        			 params:{
						A_STEPID:Ext.getCmp('bzname').getValue()
        	         }
        		});
        		 
        	 }else{Ext.Msg.alert('操作信息',  '添加失败');}
         }
	 });
}
//修改角色
function OnUpdateUserButtonClicked(){
	var id=Ext.getCmp('userid').text;
	 Ext.Ajax.request({
         url: AppUrl + 'pm_19/PRO_MM_FLOW_ROLE_UPDATE',
         async: false,
         method: 'post',
         params:{
			 A_STEPID:Ext.getCmp('bzname').getValue(),
			 A_ROLEID:id,
			 A_ROLENAME:Ext.getCmp('username').getValue(),
			 A_PLANTCODE:Ext.getCmp('ckname').getValue(),
			 A_PLANTNAME: Ext.getCmp('ckname').rawValue,
			 OP:'update'
         },
		 success: function (resp){
        	 var resp=Ext.JSON.decode(resp.responseText);
        	 if(resp.RET=='Success'){
        		 Ext.Msg.alert('操作信息',  '修改成功');
        		 Ext.data.StoreManager.lookup('userStore').load({
        			 params:{
						A_STEPID:Ext.getCmp('bzname').getValue()
        	         }
        		});
        		 
        	 }else{
				 Ext.Msg.alert('操作信息',  '修改失败');
			 }
         }
	 });
}
//添加人员
function OnAddPersonButtonClicked(){
	var id=Ext.getCmp('userid').text;
	Ext.Ajax.request({
        url: AppUrl + 'pm_19/PRO_MM_FLOW_PERSON_UPDATE',
        async: false,
        method: 'post',
        params:{
			A_ROLEID:id,
			A_USERID:Ext.getCmp('person').getValue(),
			OP:'add'
        },
        success: function (resp) {
       	 var resp=Ext.JSON.decode(resp.responseText);
       	 if(resp.RET=='Success'){
       		 Ext.Msg.alert('操作信息',  '添加成功');
       		Ext.data.StoreManager.lookup('personStore').load({
				params:{
					 A_ROLEID:id
				}
       		});
       		 
       	 }else{
			 Ext.Msg.alert('操作信息',  '添加失败');}
        }
	 });
}
//选中角色
function importClick(){
	var selectModel = Ext.getCmp("usergrid").getSelectionModel();
	var id=selectModel.getSelection()[0].data.ROLEID;
	var name=selectModel.getSelection()[0].data.ROLENAME;
	var plantid=selectModel.getSelection()[0].data.PLANTCODE;
	var plantname=selectModel.getSelection()[0].data.PLANTNAME;
	Ext.getCmp('username').setValue(name);
	Ext.getCmp('userid').setText(id);
	//Ext.getCmp('ckname').setValue(plantid);

	//人员表
	Ext.data.StoreManager.lookup('personStore').load({
		params:{
			A_ROLEID:id
		}
	});

	//厂矿权限表
	Ext.data.StoreManager.lookup('userckStore').load({
		 params:{
			A_ROLEID:id
        }
	});
	
	//作业区表
	Ext.data.StoreManager.lookup('userzyqStore').load({
		 params:{
			 A_ROLEID:id
       }
	});
	//维修专业表
	Ext.data.StoreManager.lookup('userwxzyStore').load({
		 params:{
			 A_ROLEID:id
         }
	});
}
//删除角色
function deleteuserClick(){
	var selectModel = Ext.getCmp("usergrid").getSelectionModel();
	var id=selectModel.getSelection()[0].data.ROLEID;
	var name=selectModel.getSelection()[0].data.ROLENAME;
	var plantid=selectModel.getSelection()[0].data.PLANTCODE;
	var plantname=selectModel.getSelection()[0].data.PLANTNAME;
	 Ext.Ajax.request({
         url: AppUrl + 'pm_19/PRO_MM_FLOW_ROLE_UPDATE',
         async: false,
         method: 'post',
         params:{
			 A_STEPID:Ext.getCmp('bzname').getValue(),
			 A_ROLEID:id,
			 A_ROLENAME:name,
			 A_PLANTCODE:plantid,
			 A_PLANTNAME:plantname,
			 OP:'delete'
         },
		 success: function (resp){
        	 var resp=Ext.JSON.decode(resp.responseText);
        	 if(resp.RET=='Success'){
        		 Ext.Msg.alert('操作信息',  '删除成功');
        		 Ext.data.StoreManager.lookup('userStore').load({
        			 params:{
						 A_STEPID:Ext.getCmp('bzname').getValue()
        	         }
        		});
        	 }else{
				 Ext.Msg.alert('操作信息',  '删除失败');
			 }
         }
	 });
}
//删除人员
function deletepersonClick(){
	var selectModeluser=Ext.getCmp("usergrid").getSelectionModel();
	var id=selectModeluser.getSelection()[0].data.ROLEID;
	var selectModel = Ext.getCmp("persongrid").getSelectionModel();
	var userid=selectModel.getSelection()[0].data.USERID;
	 Ext.Ajax.request({
         url: AppUrl + 'pm_19/PRO_MM_FLOW_PERSON_UPDATE',
         async: false,
         method: 'post',
         params:{
			 A_ROLEID:id,
			 A_USERID:userid,
			 OP:'delete'
         },
		 success: function (resp){
        	 var resp=Ext.JSON.decode(resp.responseText);
        	 if(resp.RET=='Success'){
        		 Ext.Msg.alert('操作信息',  '删除成功');
        		 Ext.data.StoreManager.lookup('personStore').load({
        			 params:{
						 A_ROLEID:id
        	    	 }
        		});
        	 }else{
				 Ext.Msg.alert('操作信息',  '删除失败');
			 }
         }
	 });
}
//删除厂矿
function deleteckClick(){
	var selectModel=Ext.getCmp("userckgrid").getSelectionModel();
	var plantcode=selectModel.getSelection()[0].data.PLANTCODE;
	var selectModeluser=Ext.getCmp("usergrid").getSelectionModel();
	var id=selectModeluser.getSelection()[0].data.ROLEID;
	Ext.Ajax.request({
        url: AppUrl+ 'pm_19/PRO_MM_FLOW_ROLE_PLANT_UPDATE',
        async: false,
        method: 'post',
        params:{
			A_ROLEID:id,
			A_PLANTCODE:plantcode,
			OP:'delete'
        },
        success: function (resp) {
       	 var resp=Ext.JSON.decode(resp.responseText);
       	 if(resp.RET=='Success'){
       		 Ext.Msg.alert('操作信息',  '删除成功');
       		 Ext.data.StoreManager.lookup('userckStore').load({
       		 params:{
				 A_ROLEID:id
             }
       	});
       	 }else{
			 Ext.Msg.alert('操作信息',  '删除失败');
		 }
        }
	 });
}
//添加审批厂矿
function OnAddckButtonClicked(){
	var id=Ext.getCmp('userid').text;
	Ext.Ajax.request({
        url: AppUrl + 'pm_19/PRO_MM_FLOW_ROLE_PLANT_UPDATE',
        async: false,
        method: 'post',
        params:{
			A_ROLEID:id,
			A_PLANTCODE:Ext.getCmp('cklb').getValue(),
			OP:'add'
        },
        success: function (resp) {
			 var resp=Ext.JSON.decode(resp.responseText);
			 if(resp.RET=='Success'){
				 Ext.Msg.alert('操作信息',  '添加成功');
				 Ext.data.StoreManager.lookup('userckStore').load({
					 params:{
						 A_ROLEID:id
					 }
				});
			 }else{
				 Ext.Msg.alert('操作信息',  '添加失败');
			 }
        }
	 });
}
//添加作业区
function OnAddzyqButtonClicked(){
	var id=Ext.getCmp('userid').text;
	Ext.Ajax.request({
        url: AppUrl + 'pm_19/PRO_MM_FLOW_ROLE_DEPART_UPDATE',
        async: false,
        method: 'post',
        params:{
			A_ROLEID:id,
			A_DEPARTCODE:Ext.getCmp('zyqlb').getValue(),
			OP:'add'
        },
        success: function (resp) {
       	 var resp=Ext.JSON.decode(resp.responseText);
       	 if(resp.RET=='Success'){
       		 Ext.Msg.alert('操作信息',  '添加成功');
       		Ext.data.StoreManager.lookup('userzyqStore').load({
       		 params:{
				 A_ROLEID:id
             }
       	});
       	 }else{
			 Ext.Msg.alert('操作信息',  '添加失败');
		 }
        }
	 });
}

//删除作业区
function deletezyqClick(){
	var selectModel=Ext.getCmp("userzyqgrid").getSelectionModel();
	var zyqcode=selectModel.getSelection()[0].data.DEPARTCODE;
	var selectModeluser=Ext.getCmp("usergrid").getSelectionModel();
	var id=selectModeluser.getSelection()[0].data.ROLEID;
	Ext.Ajax.request({
        url: AppUrl + 'pm_19/PRO_MM_FLOW_ROLE_DEPART_UPDATE',
        async: false,
        method: 'post',
        params:{
			A_ROLEID:id,
			A_DEPARTCODE:zyqcode,
			OP:'delete'
        },
        success: function (resp) {
       	 var resp=Ext.JSON.decode(resp.responseText);
       	 if(resp.RET=='Success'){
       		 Ext.Msg.alert('操作信息',  '删除成功');
       		 Ext.data.StoreManager.lookup('userzyqStore').load({
				 params:{
					 A_ROLEID:id
				 }
       		});
       	 }else{
			 Ext.Msg.alert('操作信息',  '删除失败');
		 }
        }
	 });
}
//分类添加
function OnAddflButtonClicked(){
	var id=Ext.getCmp('userid').text;
	Ext.Ajax.request({
        url: AppUrl + 'pm_19/PRO_MM_FLOW_ROLE_DICT_UPDATE',
        async: false,
        method: 'post',
        params:{
			A_ROLEID:id,
			A_DICTID:Ext.getCmp('fllb').getValue(),
			OP:'add'
        },
        success: function (resp) {
       	 var resp=Ext.JSON.decode(resp.responseText);
       	 if(resp.RET=='Success'){
       		 Ext.Msg.alert('操作信息',  '添加成功');
       		 Ext.data.StoreManager.lookup('userwxzyStore').load({
				 params:{
					 A_ROLEID:id
				 }
      	 	});
       	 }else{
			 Ext.Msg.alert('操作信息',  '添加失败');
		 }
        }
	 });
}

//删除分类
function deleteflClick(){
	var selectModel=Ext.getCmp("userwxzygrid").getSelectionModel();
	var flcode=selectModel.getSelection()[0].data.DICTID;
	var selectModeluser=Ext.getCmp("usergrid").getSelectionModel();
	var id=selectModeluser.getSelection()[0].data.ROLEID;
	Ext.Ajax.request({
        url: AppUrl + 'pm_19/PRO_MM_FLOW_ROLE_DICT_UPDATE',
        async: false,
        method: 'post',
        params:{
			A_ROLEID:id,
			A_DICTID:flcode,
			OP:'delete'
        },
        success: function (resp) {
       	 var resp=Ext.JSON.decode(resp.responseText);
       	 if(resp.RET=='Success'){
       		 Ext.Msg.alert('操作信息',  '删除成功');
       		Ext.data.StoreManager.lookup('userwxzyStore').load({
       		 params:{
				 A_ROLEID:id
             }
       	});
       	 }else{
			 Ext.Msg.alert('操作信息',  '删除失败');
		 }
        }
	 });
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;"; return value;
}


