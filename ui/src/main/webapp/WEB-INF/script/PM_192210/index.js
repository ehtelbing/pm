 var factoryStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'factoryStore',
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
 
 var specialChangeStore = Ext.create('Ext.data.Store', {
     autoLoad: true,
     storeId: 'specialChangeStore',
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
         },
         extraParams:{}
     }
 });

var gridStore = Ext.create("Ext.data.Store", {
	pageSize: 10,
    autoLoad: false,
    storeId: 'gridStore',
    fields: ['DICTID', 'DICT_DESC','USEFLAG_DESC'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'pm_19/PRO_WP_DICT_PLANT',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    },
    listeners:{ beforeload: OnGridStoreBeforeLoad}
});

var gridPersonStore = Ext.create("Ext.data.Store", {
	pageSize: 10,
    autoLoad: false,
    storeId: 'gridPersonStore',
    fields: ['DICT_USERID', 'DICT_USERNAME', 'ID'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'pm_19/PRO_WP_DICT_PLANT_MANAGER',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    },
    listeners:{ beforeload: OnGridPersonStoreBeforeLoad}
});

var Layout = {
    layout: 'border',
    items: [
            	{ xtype: 'hidden', id: 'gridCache'},
            	{ xtype: 'panel', title: '维修专业厂矿使用设置', titleAlign: 'left', region: 'north', border: false},
            	{ xtype: 'panel', width: '100%', region: 'north', frame: true,layout: 'column', border: false, 
                  items:[
                                   { xtype: 'combo', fieldLabel: '厂矿列表', id: 'factory', store: 'factoryStore',  displayField: 'V_DEPTNAME', valueField: 'V_DEPTCODE',labelAlign: 'right', labelWidth: 110, style: { margin:'5px 0px 5px 5px'},queryMode: 'local'},
                                   { xtype: 'button', text: '查询',width: 90,icon : imgpath + '/search.png',style: { marginLeft: '10px',marginTop: '5px',marginBottom: '5px'}, handler: btnQuery},
                                   { xtype: 'combo', fieldLabel: '可选专业', id: 'specialChange', store: 'specialChangeStore',  displayField: 'DICT_DESC', valueField: 'DICTID',labelAlign: 'right', labelWidth: 110, style: {margin:'5px 0px 5px 5px',queryMode: 'local'}},
                                   { xtype: 'button', text: '添加专业', width: 90,icon : imgpath + '/add.png',style: { marginLeft: '10px',marginTop: '5px',marginBottom: '5px'}, handler: btnInsert},
                                   { xtype: 'textfield', fieldLabel: '专业室负责人ID',width:272,style: { margin:'5px 0px 5px 5px'}, id: 'specialPerson', labelWidth: 110, labelAlign: 'right'},
                                   { xtype: 'button', text: '添加人员', width: 90,icon : imgpath + '/add.png', style: { marginLeft: '10px',marginTop: '5px',marginBottom: '5px'}, handler: btnInsertPerson}
                       ]
                 },
                 {
                	 xtype: 'panel', region: 'center', layout: 'border', border: false, bodyBorder: false,
                	 items: [
                             {
                             	xtype: 'gridpanel', colomnLines: true, id: 'grid', region: 'west', width: '50%', forceFit: true, store: 'gridStore', title: '当前厂矿使用列表',
                             	listeners: {itemclick: function(item,index,e,eopts){
                             		Ext.data.StoreManager.get('gridPersonStore').load({
                             			params: {
											A_DICTID:index.data.DICTID,
											A_PLANTCODE:Ext.getCmp('factory').getValue()
                             			}
                             		});
                             		Ext.getCmp('gridCache').setValue(index.data.DICTID);
                             	}},
                             	columns: [
                             	         { text: '专业分类',  width: 50, dataIndex: 'DICTID', align: 'center'},
                             	         { text: '专业分类描述', dataIndex: 'DICT_DESC', align: 'center'},
                             	         { text: '操作', width: '3%', align: 'center', renderer: function(){
                             	        	 return '<input type="button" value="删除" onclick="btnDelete()" />';
                             	         }}
                             	         ],
                             	         bbar: [
                                     	           '->'
                                     	           ,{
                                     	              xtype: 'pagingtoolbar',
                                     	              dock: 'bottom',
                                     	              displayInfo: true,
                                     	              store: 'gridStore',
                                     	              displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                                     	              emptyMsg: '没有记录'
                                     	}]
                             	
                             },
                             {
                             	xtype: 'gridpanel', colomnLines: true, id: 'gridPerson', region: 'east', width: '50%', forceFit: true, store: 'gridPersonStore',title: '专业室负责人列表',
                             	columns: [
                             	          {dataIndex: 'ID', hidden: true},
                             	         { text: '负责人ID',  width: 50, dataIndex: 'DICT_USERID', align: 'center'},
                             	         { text: '负责人名', dataIndex: 'DICT_USERNAME', align: 'center'},
                             	         { text: '操作', width: '3%', align: 'center', renderer: function(){
                             	        	 return '<input type="button" value="删除" onclick="btnPersonDelete()" />';
                             	         }}
                             	         ],
                             	         bbar: [
                                     	           '->'
                                     	           ,{
                                     	              xtype: 'pagingtoolbar',
                                     	              dock: 'bottom',
                                     	              displayInfo: true,
                                     	              store: 'gridStore',
                                     	              displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                                     	              emptyMsg: '没有记录'
                                     	}]
                             	
                             }
                	         ]
                	 
                 }
                 ]

};
    
    
    
function onPageLoaded() {
    Ext.create('Ext.container.Viewport', Layout);
    Ext.data.StoreManager.lookup('factoryStore').on('load', function(){
        Ext.getCmp("factory").select(Ext.data.StoreManager.lookup('factoryStore').getAt(0));
        btnQuery();
    });
    Ext.data.StoreManager.lookup('specialChangeStore').on('load', function(){
        Ext.getCmp("specialChange").select(Ext.data.StoreManager.lookup('specialChangeStore').getAt(0));
    });
}
//添加专业
function btnInsert(){
	  Ext.Ajax.request({
	        url: AppUrl + 'pm_19/PRO_WP_DICT_PLANT_ADD',
	        method: 'POST',
	        params:{
				A_DICTID:Ext.getCmp('specialChange').getValue(),
				A_PLANTCODE:Ext.getCmp('factory').getValue()
	        },
	        success: function (resp) {
	        	resp = Ext.decode(resp.responseText);
	        	if(resp.RET == 'Success') {
	        			Ext.Msg.alert('操作信息','添加成功');
	        			btnQuery();
	        	}else{
	        		Ext.Msg.alert('操作信息','添加失败，请确认录入信息是否正确');
	        	}
	        },
	        render:{ type: 'josn', root: 'list'}
	    });
}
//添加负责人
function btnInsertPerson(){
	if(Ext.getCmp('gridCache').getValue()){
	  Ext.Ajax.request({
	        url: AppUrl + 'pm_19/PRO_WP_DICT_PLANT_MANAGER_ADD',
	        method: 'POST',
	        params:{
				A_DICTID:Ext.getCmp('gridCache').getValue(),
				A_PLANTCODE:Ext.getCmp('factory').getValue(),
				A_USERID:Ext.getCmp('specialPerson').getValue()
	        },
	        success: function (resp) {
	        	resp = Ext.decode(resp.responseText);
	        	if(resp.RET == 'Success') {
	        			Ext.Msg.alert('操作信息','添加成功');
	        			btnPersonQuery();
	        	} else{
	        		Ext.Msg.alert('操作信息','添加失败，请确认录入信息是否正确');
	        	}
	        },
	        render:{ type: 'josn', root: 'list'}
	    });
	}
	else{Ext.Msg.alert('操作信息','请选择专业分类再添加人员');}
}
//删除专业分类
function btnDelete(){
	var asd = Ext.getCmp('grid').getSelectionModel().getSelection()[0].data;
	  Ext.Ajax.request({
	        url: AppUrl + 'pm_19/PRO_WP_DICT_PLANT_DEL',
	        method: 'POST',
	        params:{
				A_DICTID:asd.DICTID,
				A_PLANTCODE:Ext.getCmp('factory').getValue()
	        },
	        success: function (resp) {
	        	resp = Ext.decode(resp.responseText);
	        	if(resp.RET == 'Success') {
					Ext.Msg.alert('操作信息','删除成功');
					btnQuery();
	        	}else{
	        		Ext.Msg.alert('操作信息','删除失败');
	        	}
	        },
	        render:{ type: 'josn', root: 'list'}
	    });
}
//删除负责人
function btnPersonDelete(){
	var asd = Ext.getCmp('gridPerson').getSelectionModel().getSelection()[0].data;
	  Ext.Ajax.request({
	        url: AppUrl + 'pm_19/PRO_WP_DICT_PLANT_MANAGER_DEL',
	        method: 'POST',
	        params:{
				A_ID:asd.ID
	        },
	        success: function (resp) {
	        	resp = Ext.decode(resp.responseText);
	        	if(resp.RET == 'Success'){
					Ext.Msg.alert('操作信息','删除成功');
					btnPersonQuery();
	        	}else{
	        		Ext.Msg.alert('操作信息','删除失败');
	        	}
	        },
	        render:{ type: 'josn', root: 'list'}
	    });
}

function btnQuery(){
	Ext.data.StoreManager.get('gridStore').load({
		params: {
			A_PLANTCODE:Ext.getCmp('factory').getValue()
		}
	});
}

function btnPersonQuery(){
	Ext.data.StoreManager.get('gridPersonStore').load({
		params: {
			A_DICTID: Ext.getCmp('gridCache').getValue(),
			A_PLANTCODE:Ext.getCmp('factory').getValue()
		}
	});
}

function OnGridStoreBeforeLoad(store){}

function OnGridPersonStoreBeforeLoad(store){}

Ext.onReady(onPageLoaded);
