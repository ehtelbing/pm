var personid='';
var SPECIALTYCODE='';
var parentid='';
Ext.onReady(function() {
	var westtreeStore = Ext.create("Ext.data.TreeStore", {
		autoLoad : false,
		storeId : 'westtreeStore'
	});
	
	var centertreeStore = Ext.create("Ext.data.TreeStore", {
		autoLoad : false,
		storeId : 'centertreeStore'
	});
	var plantStore = Ext.create("Ext.data.Store", {
		autoLoad : true,
		storeId : 'plantStore',
		fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
		proxy : {
			type : 'ajax',
			async : false,
			url : AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			},
			extraParams : {
				V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
				V_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
				V_V_DEPTCODENEXT:Ext.util.Cookies.get('v_deptcode'),
				V_V_DEPTTYPE: '[基层单位]'
			}
		}
	});
	var westtree = Ext.create("Ext.tree.Panel", {
		id : 'westtree',
		region : 'west',
		width:'20%',
		rootVisible : false,
		store : westtreeStore,
		listeners : {
			itemclick : WestTreeOnClick
		}
	});
	
	
	var centertree = Ext.create("Ext.tree.Panel", {
		id : 'centertree',
		width:'20%',
		region : 'center',
		rootVisible : false,
		store : centertreeStore,
		listeners : {
			itemclick : CenterTreeOnClick
		}
	});
	
	
	
	var northpanel = Ext.create("Ext.panel.Panel", {
		id : 'northpanel',
		region : 'north',
		frame:true,
		layout : 'column',
		items : [ {
			id : 'plant',
			xtype : 'combo',
			editable : false,
			fieldLabel : '厂矿',
			store : plantStore,
			labelAlign : 'right',
			labelWidth : 65,
			displayField : 'V_DEPTNAME',
			valueField : 'V_DEPTCODE',
			queryMode : 'local',
			labelAlign : 'right',
			margin:'5px 0px 5px 5px'
		}]
	});
	
	Ext.create('Ext.container.Viewport', {
		split : true,
		autoScroll : true,
		layout : 'border',
		items : [ westtree, centertree, northpanel]
	});
	
	
	Ext.data.StoreManager.lookup('plantStore').on("load",function() {
		Ext.getCmp("plant").select(plantStore.getAt(0));
		Ext.getCmp('westtree').store.setProxy({
			type : 'ajax',
			actionMethods : {
				read : 'POST'
			},
			async : false,
			url : AppUrl + 'pm_19/OrgAndPersonTree',
			reader : {
				type : 'json'
			},
			root : {
				expanded : true
			},
			extraParams : {
				V_V_DEPTCODE : Ext.getCmp('plant').getValue()
			}
		});
		Ext.getCmp('westtree').store.load();
	});
	
	Ext.ComponentManager.get("plant").on("select",function() {
		Ext.getCmp('westtree').store.setProxy({
			type : 'ajax',
			actionMethods : {
				read : 'POST'
			},
			async : false,
			url : AppUrl + 'pm_19/OrgAndPersonTree',
			reader : {
				type : 'json'
			},
			root : {
				expanded : true
			},
			extraParams : {
				V_V_DEPTCODE : Ext.getCmp('plant').getValue()
			}
		});
		Ext.getCmp('westtree').store.load();
	});
	
});


function WestTreeOnClick(aa, record, item, index, e, eOpts){
	if (record.data.leaf == true) {
		personid = record.data.id;
		Ext.getCmp('centertree').store.setProxy({
			type : 'ajax',
			url : AppUrl + 'pm_19/PersonTree',
			extraParams : {
				V_V_PERSONCODE : personid,
				V_V_DEPTCODE : Ext.getCmp('plant').getValue()
			},
			actionMethods : {
				read : 'POST'
			}
		});
		Ext.getCmp('centertree').store.load();
	}
}

function CenterTreeOnClick(aa, record, item, index, e, eOpts){
	SPECIALTYCODE=record.raw.sid;
	if(record.raw.parentid==null){
		parentid="99";
	}else{
		parentid=record.raw.parentid;
	}
	
	if(record.data.checked==true){
		Ext.Ajax.request({
	        url: AppUrl + 'pm_19/PRO_BASE_SPECIALTYTOPERSON_DEL',
	        async: false,
	        method: 'post',
	        params:{
				V_V_SPECIALTYCODE:SPECIALTYCODE,
				V_V_DEPTCODE:parentid,
				V_V_PERSONCODE:personid
	        },
			success:function (resp){
	        	var resp=Ext.JSON.decode(resp.responseText);
	        	if(resp.V_CURSOR=='成功'){
	        		Ext.getCmp('centertree').store.setProxy({
	        			type : 'ajax',
	        			url : AppUrl + 'pm_19/PersonTree',
	        			extraParams : {
	        				V_V_PERSONCODE : personid,
	        				V_V_DEPTCODE : Ext.getCmp('plant').getValue()
	        			},
	        			actionMethods : {
	        				read : 'POST'
	        			}
	        		});
	        		Ext.getCmp('centertree').store.load();
	        	}else{
	        		Ext.Msg.alert('操作信息',  '操作失败');
	        	}
	        }
		});
	}else{
		Ext.Ajax.request({
	        url: AppUrl + 'pm_19/PRO_BASE_SPECIALTYTOPERSON_SET',
	        async: false,
	        method: 'post',
	        params:{
				V_V_SPECIALTYCODE:SPECIALTYCODE,
				V_V_DEPTCODE:parentid,
				V_V_PERSONCODE:personid
	        },
			success:function (resp){
	        	var resp=Ext.JSON.decode(resp.responseText);
	        	if(resp.V_CURSOR=='成功'){
	        		Ext.getCmp('centertree').store.setProxy({
	        			type : 'ajax',
	        			url : AppUrl + 'pm_19/PersonTree',
	        			extraParams : {
	        				V_V_PERSONCODE : personid,
	        				V_V_DEPTCODE : Ext.getCmp('plant').getValue()
	        			},
	        			actionMethods : {
	        				read : 'POST'
	        			}
	        		});
	        		Ext.getCmp('centertree').store.load();
	        	}else{
	        		Ext.Msg.alert('操作信息',  '操作失败');
	        	}
	        }
		});
	}
}





