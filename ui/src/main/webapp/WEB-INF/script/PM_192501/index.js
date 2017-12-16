var factoryStore = Ext.create('Ext.data.Store', {
	autoLoad : true,
	storeId : 'selPlantstore',
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
			V_V_DEPTTYPE:'[基层单位]'
		}
	}
});

var firstTreeStore = Ext.create('Ext.data.TreeStore', {
	autoLoad : false,
	storeId : 'firstTreeStore',
	proxy : {
		type : 'ajax',
		actionMethods : {
			read : 'POST'
		},
		async : false,
		url : AppUrl + 'pm_19/OrgAndWorkspaceTree'
	},
	reader : {
		type : 'json'
	},
	root : {
		expanded : false
	}

});

var secondTreeStore = Ext.create('Ext.data.TreeStore', {
	autoLoad : false,
	storeId : 'secondTreeStore',
	proxy : {
		type : 'ajax',
		actionMethods : {
			read : 'POST'
		},
		async : false,
		url : AppUrl + 'pm_19/OrgAndWorkspaceTreeCheck'
	},
	reader : {
		type : 'json'
	},
	root : {
		expanded : false
	}

});


var Layout = {
	layout : 'border',
	items : [

	{
		xtype : 'panel',border : false,region : 'north',layout : 'vbox',
		width : '100%',
		items : [{
			xtype : 'panel',title : '检修单位管理',width : '100%',border : false,editable : false}, 
			{xtype : 'toolbar',width : '100%',items : [ 
			{xtype : 'combo',fieldLabel : '选择厂矿',editable : false,queryMode : 'local',store : factoryStore,id : 'factory',labelAlign : 'right',labelWidth : 70,
				displayField : 'V_DEPTNAME',valueField : 'V_DEPTCODE'}, 
				{xtype : 'hidden',id : 'firstLeafNode'} 
			]
		}]
	}, 
	{
		xtype : 'panel',
		border : false,
		region : 'center',
		layout : 'border',
		width : '100%',
		items : [

		{
			id : 'firstTree',
			xtype : 'treepanel',
			title : '组织机构树',
			width : '50%',
			rootVisible : false,
			region : 'west',
			store : 'firstTreeStore',
			listeners: { itemclick : function(firstTree,  record,  item, index,  e, eOpts){
				if(record.data.leaf == true) {
					Ext.getCmp("firstLeafNode").setValue(record.data.id);
					Ext.getCmp("secondTree").getStore().load({
						params:{
							/*V_V_DEPTCODE:Ext.getCmp('factory').getValue(),
							V_V_DEPTCODE_NEW:record.data.id		*/
							V_V_DEPTCODE_UP: Ext.getCmp('firstLeafNode').getValue(),
							V_V_DEPTTYPE:'检修作业区'
						}
					});
				}
			}}
		}, {

			id : 'secondTree',
			xtype : 'treepanel',
			title : '检修单位树',
			width : '50%',
			rootVisible : false,
			store : 'secondTreeStore',
			region : 'east',
			listeners: {checkchange: function(node, checked, eOpts){
				if(checked == true) {
			        Ext.Ajax.request({
			            url: AppUrl + 'pm_19/PRO_PM_REPAIRDEPT_SET',
			            type: 'ajax',
			            async: false,
			            method: 'POST',
			            params: {
							V_V_DEPTCODE:Ext.getCmp("firstLeafNode").getValue(),
							V_V_DEPTREPAIRCODE:node.raw.id
			            }
			        });
				}else{
			        Ext.Ajax.request({
			            url: AppUrl + 'pm_19/PRO_PM_REPAIRDEPT_DEL',
			            type: 'ajax',
			            async: false,
			            method: 'POST',
			            params: {
							V_V_DEPTCODE:Ext.getCmp("firstLeafNode").getValue(),
							V_V_DEPTREPAIRCODE:node.raw.id
			            }
			        });
				}
			}}
		} ]
	} ]

};

function onPageLoaded() {
	Ext.create('Ext.container.Viewport', Layout);

	Ext.getCmp('factory').getStore().on("load",function() {
		Ext.getCmp("factory").select(Ext.data.StoreManager.lookup('selPlantstore').getAt(0));
	});

	Ext.getCmp('factory').on("change", function() {
		Ext.getCmp("firstTree").getStore().load({
			params:{
				V_V_DEPTCODE:Ext.getCmp('factory').getValue()
			}
		});
		Ext.getCmp("secondTree").getStore().load({
			params:{
				/*V_V_DEPTCODE: '10000',
				V_V_DEPTCODE_NEW:''*/
				V_V_DEPTCODE_UP: '10000',
				V_V_DEPTTYPE:'[检修作业区]'
			}
		});
		
	});


	Ext.data.StoreManager.lookup('firstTreeStore').on('load', function() {
		Ext.data.StoreManager.lookup('firstTreeStore').tree.root.expand();
	});

	Ext.data.StoreManager.lookup('secondTreeStore').on('load', function() {
		Ext.data.StoreManager.lookup('secondTreeStore').tree.root.expand();
	});
	
}

Ext.onReady(onPageLoaded);
