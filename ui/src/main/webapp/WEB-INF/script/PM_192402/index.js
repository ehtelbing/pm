var treeid='';
var countSave=0;
Ext.onReady(function() {
	Ext.QuickTips.init();	
	 var ckStore = Ext.create("Ext.data.Store", {
	        autoLoad: true,
	        storeId: 'ckStore',
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
					V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
					V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
					V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode'),
					V_V_DEPTTYPE: '[基层单位]'
	            }
	        }
	    });
	 
	 var zyqStore = Ext.create("Ext.data.Store", {
	        autoLoad: false,
	        storeId: 'zyqStore',
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
	            }
	        }
	    });
	 
	 var sblxStore = Ext.create("Ext.data.Store", {
	        autoLoad: false,
	        storeId: 'sblxStore',
	        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
	        proxy: {
	            type: 'ajax',
	            async: false,
	            url: AppUrl + 'pm_19/PRO_GET_DEPTEQUTYPE_ADMIN',
	            actionMethods: {
	                read: 'POST'
	            },
	            reader: {
	                type: 'json',
	                root: 'list'
	            }
	        }
	    });
	 
	 
	 var sbmcStore = Ext.create("Ext.data.Store", {
	        autoLoad: false,
	        storeId: 'sbmcStore',
	        fields: ['V_EQUCODE', 'V_EQUNAME'],
	        proxy: {
	            type: 'ajax',
	            async: false,
	            url: AppUrl + 'pm_19/PRO_GET_DEPTEQU_ADMIN',
	            actionMethods: {
	                read: 'POST'
	            },
	            reader: {
	                type: 'json',
	                root: 'list'
	            }
	        }
	    });
	 
	var Tab1gridStore=Ext.create('Ext.data.Store',{
		id : 'Tab1gridStore',
		pageSize : 20,
		autoLoad : false,
		fields : [ 'V_EQUTYPETXCODE','V_EQUTYPETXNAME','V_EQUTYPETXVALUE'],
		proxy : {
			type : 'ajax',
			async : false,
			url : AppUrl + 'pm_19/PRO_SAP_EQU_TYPE_TXVAL_SELECT',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list',
				total : 'total'
			}
		},
        listeners: {
        	beforeload: beforeTab1GridStore
        }
	});
	
	var Tab2gridStore=Ext.create('Ext.data.Store',{
		id : 'Tab2gridStore',
		pageSize : 15,
		autoLoad : false,
		fields : [ 'I_ID', 'V_EQUCODE','V_SPCODE','V_SPNAME','V_SPTYPE','V_SPCODE_OLD','V_NUMBER','V_MEMO'],
		proxy : {
			type : 'ajax',
			async : false,
			url : AppUrl + 'pm_19/PRO_SAP_EQU_BOM_VIEW',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list',
				total : 'total'
			}
		},
        listeners: {
        	beforeload: beforeTab2GridStore
        }
	});
	 
	 var treeStore= Ext.create("Ext.data.TreeStore", {
			storeId : 'treeStore',
			autoLoad : false,
			fields : ['sid', 'text', 'parentid','V_EQUSITE']
		});
	
	var treepanel=Ext.create('Ext.tree.Panel',{
		id:'tree',
		region:'west',
		width:'20%',
		rootVisible : false,
		store:treeStore,
		autoScroll: true,
		listeners:{itemclick:TreeChecked}
	});
	
	var panel=Ext.create('Ext.panel.Panel',{
		id:'panel',
		region:'center',
		width:'80%',
		//frame:true,
		layout:'border',
		border:false,
		items:[{xtype:'panel',width:'100%',region:'north',layout:'border',height:'40%',
			items:[{xtype:'panel',width:'100%',region:'north',layout:'column',border:false,frame:true,
				items:[{ xtype: 'combo', id: 'ck', store: ckStore, fieldLabel: '厂矿', style: ' margin: 5px 0px 5px 10px', labelWidth: 70, labelAlign: 'right', editable: false, queryMode: 'local', displayField: 'V_DEPTNAME', valueField: 'V_DEPTCODE' },
				       { xtype: 'combo', id: 'zyq', store: zyqStore, fieldLabel: '作业区', style: ' margin: 5px 0px 5px 10px', labelWidth: 70, labelAlign: 'right', editable: false, queryMode: 'local', displayField: 'V_DEPTNAME', valueField: 'V_DEPTCODE' },
				       { xtype: 'combo', id: 'sblx', store: sblxStore, fieldLabel: '设备类型', style: ' margin: 5px 0px 5px 10px', labelWidth: 70, labelAlign: 'right', editable: false, queryMode: 'local', displayField: 'V_EQUTYPENAME', valueField: 'V_EQUTYPECODE' },
				       { xtype: 'combo', id: 'sbmc', store: sbmcStore, fieldLabel: '设备名称', style: ' margin: 5px 0px 5px 10px', labelWidth: 70, labelAlign: 'right', editable: false, queryMode: 'local', displayField: 'V_EQUNAME', valueField: 'V_EQUCODE' },
				       {xtype:'button',text:'查询', style: ' margin: 5px 0px 5px 10px',icon: imgpath +'/search.png',handler:QueryTree}]},
				   {xtype:'panel',width:'100%',region:'center',layout:'vbox',border:false,frame:true,
				items:[{xtype:'panel',frame:true,width:'100%',layout:'column',baseCls: 'my-panel-no-border',
					items:[{xtype:'textfield',fieldLabel:'设备名称',id:'tsbmc',labelAlign:'right',labelWidth:100,style: ' margin: 5px 0px 0px 10px',readOnly:true,width:300},
					       {xtype:'textfield',fieldLabel:'设备编码',id:'tsbbm',labelAlign:'right',labelWidth:100,style: ' margin: 5px 0px 0px 10px',readOnly:true,width:300}]},
					   {xtype:'panel',frame:true,width:'100%',layout:'column',baseCls: 'my-panel-no-border',
					items:[{xtype:'textfield',fieldLabel:'设备类型名称',id:'tsblxmc',labelAlign:'right',labelWidth:100,style: ' margin: 5px 0px 0px 10px',readOnly:true,width:300},
					       {xtype:'textfield',fieldLabel:'设备类型编码',id:'tsblxbm',labelAlign:'right',labelWidth:100,style: ' margin: 5px 0px 0px 10px',readOnly:true,width:300}]},
					   {xtype:'panel',frame:true,width:'100%',layout:'column',baseCls: 'my-panel-no-border',
					items:[{xtype:'textfield',fieldLabel:'位置名称',id:'twzmc',labelAlign:'right',labelWidth:100,style: ' margin: 5px 0px 0px 10px',readOnly:true,width:300},
					       {xtype:'textfield',fieldLabel:'位置编码',id:'twzbm',labelAlign:'right',labelWidth:100,style: ' margin: 5px 0px 0px 10px',readOnly:true,width:300}]}]}]},
			   {xtype:'tabpanel',region:'center',id:'tabpanel',width:'100%',
		   items:[{title:'基础信息',id:'jcxx',layout:'vbox',frame:true,
			   items:[{xtype:'textfield',fieldLabel:'设备类型',id:'tabsblx',labelWidth:80,labelAlign:'right',style: ' margin: 5px 0px 0px 10px',readOnly:true,width:460},
			          {xtype:'panel',frame:true,width:'100%',layout:'column',baseCls: 'my-panel-no-border',
				   items:[{xtype:'textfield',fieldLabel:'开始日期',id:'tabksrq',labelWidth:80,labelAlign:'right',style: ' margin: 5px 0px 0px 10px',readOnly:true},
				          {xtype:'textfield',fieldLabel:'结束日期',id:'tabjsrq',labelWidth:70,labelAlign:'right',style: ' margin: 5px 0px 0px 10px',readOnly:true}]},
				      {xtype:'textfield',fieldLabel:'成本中心',id:'tabcbzx',labelWidth:80,labelAlign:'right',style: ' margin: 5px 0px 0px 10px',readOnly:true,width:460},
				      {xtype:'panel',frame:true,width:'100%',layout:'column',baseCls: 'my-panel-no-border',
				   items:[{xtype:'textfield',fieldLabel:'设备种类',id:'tabsbzl',labelWidth:80,labelAlign:'right',style: ' margin: 5px 0px 0px 10px',readOnly:true},
						  {xtype:'textfield',fieldLabel:'ABC标识',id:'tabbs',labelWidth:70,labelAlign:'right',style: ' margin: 5px 0px 0px 10px',readOnly:true}]},
					  {xtype:'panel',frame:true,width:'100%',layout:'column',baseCls: 'my-panel-no-border',
				   items:[{xtype:'textfield',fieldLabel:'规格型号',id:'tabggxh',labelWidth:80,labelAlign:'right',style: ' margin: 5px 0px 0px 10px',readOnly:true},
						  {xtype:'textfield',fieldLabel:'大小/尺寸',id:'tabdx',labelWidth:70,labelAlign:'right',style: ' margin: 5px 0px 0px 10px',readOnly:true}]},
					  {xtype:'textfield',fieldLabel:'资产制造商',id:'tabzzs',labelWidth:80,labelAlign:'right',style: ' margin: 5px 0px 0px 10px',readOnly:true,width:460},
					  {xtype:'panel',frame:true,width:'100%',layout:'column',baseCls: 'my-panel-no-border',
				   items:[{xtype:'textfield',fieldLabel:'购置价值',id:'tabgzjz',labelWidth:80,labelAlign:'right',style: ' margin: 5px 0px 0px 10px',readOnly:true},
						  {xtype:'textfield',fieldLabel:'货币种类',id:'tabhbzl',labelWidth:70,labelAlign:'right',style: ' margin: 5px 0px 0px 10px',readOnly:true}]},
					  {xtype:'panel',frame:true,width:'100%',layout:'column',baseCls: 'my-panel-no-border',
				   items:[{xtype:'textfield',fieldLabel:'对象重量',id:'tabdxzl',labelWidth:80,labelAlign:'right',style: ' margin: 5px 0px 0px 10px',readOnly:true},
						  {xtype:'textfield',fieldLabel:'重量单位',id:'tabzldw',labelWidth:70,labelAlign:'right',style: ' margin: 5px 0px 0px 10px',readOnly:true}]}]},
				  {title:'设备特性',id:'sbtx',frame:true,layout:'border',
		       items:[{xtype:'gridpanel',id:'tab1grid',width:'100%',columnLines: true,store:Tab1gridStore,autoScroll: true,region:'center',
		    	   columns:[{ xtype: 'rownumberer', width: 30, sortable: false},
		    	            { text: '特性名称', width: 200, dataIndex: 'V_EQUTYPETXNAME', align: 'center', renderer: atleft },
		    	            { text: '特性值', width: 200, dataIndex: 'V_EQUTYPETXVALUE', align: 'center', renderer: atleft }],
		    	            bbar: [{
		                      	  id:'tab1page',
		                          xtype: 'pagingtoolbar',
		                          dock: 'bottom',
		                          displayInfo: true,
		                          displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
		                          emptyMsg: '没有记录',
		                          store: 'Tab1gridStore'
		                      }]}]},
		          {title:'备件清单',id:'bjqd',frame:true,layout:'border',
		       items:[{xtype:'gridpanel',id:'tab2grid',width:'100%',columnLines: true,store:Tab2gridStore,autoScroll: true,region:'center',
		    	   columns:[{ xtype: 'rownumberer', width: 30, sortable: false},
		    	            { text: '备件编码', width: 200, dataIndex: 'V_SPCODE', align: 'center', renderer: atleft },
		    	            { text: '备件名称', width: 260, dataIndex: 'V_SPNAME', align: 'center', renderer: atleft },
		    	            { text: '数量', width: 80, dataIndex: 'V_NUMBER', align: 'center', renderer: atleft },
		    	            { text: '备注', width: 260, dataIndex: 'V_MEMO', align: 'center', renderer: atleft }],
		    	            bbar: [{
		                      	  id:'tab2page',
		                          xtype: 'pagingtoolbar',
		                          dock: 'bottom',
		                          displayInfo: true,
		                          displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
		                          emptyMsg: '没有记录',
		                          store: 'Tab2gridStore'
		                      }]}]}]
					       //,
		//                      listeners:{tabchange:OnTabChanged}
					       }]
	});
	
	Ext.create('Ext.container.Viewport', {
		id : "id",
		layout : 'border',
		items : [treepanel,panel]
	});
	
	Ext.data.StoreManager.lookup('ckStore').on('load',function(){
		Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
		Ext.data.StoreManager.lookup('zyqStore').load({
			 params:{
				 V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
				 V_V_DEPTCODE:Ext.getCmp('ck').getValue(),
				 V_V_DEPTCODENEXT:Ext.util.Cookies.get('v_deptcode'),
				 V_V_DEPTTYPE:'[主体作业区]'
	         }
		});
	});
	
	Ext.data.StoreManager.lookup('zyqStore').on('load',function(){
		Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt('0'));
		Ext.data.StoreManager.lookup('sblxStore').load({
			 params:{
				 V_V_DEPTCODENEXT:Ext.getCmp('zyq').getValue()
	        }
		});
	});

	Ext.data.StoreManager.lookup('sblxStore').on('load',function(){
		Ext.getCmp('sblx').select(Ext.data.StoreManager.lookup('sblxStore').getAt('0'));
		Ext.data.StoreManager.lookup('sbmcStore').load({
			params:{
				V_V_DEPTCODENEXT:Ext.getCmp('zyq').getValue(),
				V_V_EQUTYPECODE:Ext.getCmp('sblx').getValue()
	        }
		});
	});
	
	Ext.data.StoreManager.lookup('sbmcStore').on('load',function(){
		Ext.getCmp('sbmc').select(Ext.data.StoreManager.lookup('sbmcStore').getAt('0'));
		starSave();
		QueryTree();
	});
	
	Ext.getCmp('ck').on('select',function(){
		Ext.data.StoreManager.lookup('zyqStore').load({
			 params:{
				 V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
				 V_V_DEPTCODE:Ext.getCmp('ck').getValue(),
				 V_V_DEPTCODENEXT:Ext.util.Cookies.get('v_deptcode'),
			     V_V_DEPTTYPE:'[主体作业区]'
	         }
		});
	});
	
	Ext.getCmp('zyq').on('select',function(){
		Ext.data.StoreManager.lookup('sblxStore').load({
			 params:{
				 V_V_DEPTCODENEXT:Ext.getCmp('zyq').getValue()
	         }
		});
	});
	
	Ext.getCmp('sblx').on('select',function(){
		Ext.data.StoreManager.lookup('sbmcStore').load({
			params:{
				V_V_DEPTCODENEXT:Ext.getCmp('zyq').getValue(),
				V_V_EQUTYPECODE:Ext.getCmp('sblx').getValue()
	        }
		});
	});
	
	Ext.getCmp('sbmc').on('select',function(){
		QueryTree();
	});
	
	Ext.data.StoreManager.lookup('treeStore').on('load',function(){
		countSave=1;
	});

	//设备树点击加号加载
	Ext.getCmp("tree").on("beforeload",function(store,operation){
		if(operation.node.data.parentid==-1){
			Ext.apply(store.proxy.extraParams,{
					V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
					V_V_DEPTCODE:Ext.getCmp('ck').getValue(),
					V_V_DEPTNEXTCODE:Ext.getCmp('zyq').getValue(),
					V_V_EQUTYPECODE:Ext.getCmp('sblx').getValue(),
					V_V_EQUCODE:operation.node.data.sid
				},
				store.proxy.url=AppUrl + 'pm_19/PRO_SAP_PM_CHILDEQU_TREE')
		}
	});
});

function QueryTree(){
	Ext.getCmp('tree').store.setProxy({
		type : 'ajax',
		actionMethods : {
			read : 'POST'
		},
		async : false,
		url : AppUrl + 'pm_19/PRO_SAP_PM_EQU_TREE',
		reader : {
			type : 'json'
		},
		root : {
			expanded : true
		},
		extraParams : {
			V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
			V_V_DEPTCODE:Ext.getCmp('ck').getValue(),
			V_V_DEPTNEXTCODE:Ext.getCmp('zyq').getValue(),
			V_V_EQUTYPECODE:Ext.getCmp('sblx').getValue(),
			V_V_EQUCODE:Ext.getCmp('sbmc').getValue()
		}
	});
	Ext.getCmp('tree').store.load();
}

function TreeChecked(aa, record, item, index, e, eOpts){
	treeid=record.raw.sid;
	QueryListPage();
	//if(Ext.getCmp('tabpanel').getActiveTab().id=='jcxx'){
		QueryJCXXList();
	//}else if(Ext.getCmp('tabpanel').getActiveTab().id=='sbtx'){
		QuerySBTXList();
	//}else if(Ext.getCmp('tabpanel').getActiveTab().id=='bjqd'){
		QueryBJQDList();
	//}
}

function QueryListPage(){
	Ext.Ajax.request({
        url: AppUrl + 'pm_19/PRO_SAP_PM_EQU_P_GET',
        method: 'POST',
        params:{
			V_V_EQUCODE:treeid
        },
        success:function(resp){
        	var resp = Ext.decode(resp.responseText);
        	if(resp.list.length!=0){
        		Ext.getCmp('tsbmc').setValue(resp.list[0].V_EQUNAME);//设备名称
        		Ext.getCmp('tsbbm').setValue(resp.list[0].V_EQUCODE);//设备编码
        		Ext.getCmp('tsblxmc').setValue(resp.list[0].V_EQUTYPENAME);//设备类型名称
        		Ext.getCmp('tsblxbm').setValue(resp.list[0].V_EQUTYPECODE);//设备类型编码
        		Ext.getCmp('twzmc').setValue(resp.list[0].V_EQUSITENAME);//位置名称
        		Ext.getCmp('twzbm').setValue(resp.list[0].V_EQUSITE);//位置编码
        	}
        }
	});
}

function QueryJCXXList(){
	Ext.Ajax.request({
        url: AppUrl + 'pm_19/PRO_SAP_PM_EQU_P_GET',
        method: 'POST',
        params:{
			V_V_EQUCODE:treeid
        },
        success:function(resp){
        	var resp = Ext.decode(resp.responseText);
        	if(resp.list.length!=0){
        		Ext.getCmp('tabsblx').setValue(resp.list[0].V_EQUTYPENAME);//设备类型
        		Ext.getCmp('tabksrq').setValue(resp.list[0].V_DATE_B);//开始日期
        		Ext.getCmp('tabjsrq').setValue(resp.list[0].V_DATE_E);//结束日期
        		Ext.getCmp('tabcbzx').setValue(resp.list[0].V_CASTNAME);//成本中心
        		Ext.getCmp('tabsbzl').setValue(resp.list[0].V_EQULEVNAME);//设备种类
        		Ext.getCmp('tabbs').setValue(resp.list[0].V_ABC);//ABC标识
        		Ext.getCmp('tabggxh').setValue(resp.list[0].V_GGXH);//规格型号
        		Ext.getCmp('tabdx').setValue(resp.list[0].V_SIZE);//大小/尺寸
        		Ext.getCmp('tabzzs').setValue(resp.list[0].V_ZZS);//资产制造商
        		Ext.getCmp('tabgzjz').setValue(resp.list[0].F_MONEY);//购置价值
        		Ext.getCmp('tabhbzl').setValue(resp.list[0].V_MONEYTYPE);//货币种类
        		Ext.getCmp('tabdxzl').setValue(resp.list[0].F_WEIGHT);//对象重量
        		Ext.getCmp('tabzldw').setValue(resp.list[0].V_WEIGHTTYPE);//重量单位
        	}
        }
	});
}

function QuerySBTXList(){
	Ext.data.StoreManager.lookup('Tab1gridStore').load({
		params:{
			V_V_EQUCODE:treeid,
			V_V_EQUTYPECODE:Ext.getCmp('sblx').getValue()
		}
	});
}

function QueryBJQDList(){
	Ext.data.StoreManager.lookup('Tab2gridStore').load({
		params:{
			V_V_EQUCODE:treeid
		}
	});
}

function starSave(){
	if(countSave == 0){
		 Ext.MessageBox.show({
			 title: '正在刷新...',
			 progressText: '加载中...',
		     width: 300,
		     progress: true,
		     closable: false
		});

		var f = function(v) {
			return function () {
				if (v == 10) {
					Ext.MessageBox.hide();
					starSave();
				} else {
					var i = v / (10);
					Ext.MessageBox.updateProgress(i, Math.round(100 * i) + '%');
				}
			};
		};
			for (var i = 1; i <= 10; i++) {
				setTimeout(f(i), i * 50);
			};
	}
}

function beforeTab1GridStore(store){
	store.proxy.extraParams.V_V_EQUCODE = treeid;
	store.proxy.extraParams.V_V_EQUTYPECODE = Ext.getCmp('sblx').getValue();
}

function beforeTab2GridStore(store){
	store.proxy.extraParams.V_V_EQUCODE = treeid;
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>' ;
}