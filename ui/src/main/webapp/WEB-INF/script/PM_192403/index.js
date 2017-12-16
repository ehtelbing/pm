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
					V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
					V_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
					V_V_DEPTCODENEXT:Ext.util.Cookies.get('v_deptcode'),
					V_V_DEPTTYPE:'[基层单位]'
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
	 
	 
	 var grid1Store=Ext.create('Ext.data.Store',{
			id : 'grid1Store',
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
	        	beforeload: beforeGrid1Store
	        }
		});
	 
	 var grid2Store=Ext.create('Ext.data.Store',{
			id : 'grid2Store',
			pageSize : 20,
			autoLoad : false,
			fields : [ 'I_ID','V_EQUCODE','V_SPCODE','V_SPNAME',
			           'V_SPTYPE','V_SPCODE_OLD','V_NUMBER','V_MEMO'],
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
	        	beforeload: beforeGrid2Store
	        }
		});
	 
	 var grid3Store=Ext.create('Ext.data.Store',{
			id : 'grid3Store',
			pageSize : 20,
			autoLoad : false,
			fields : [ 'I_ID','V_DEFECTLIST','V_SOURCECODE','V_SOURCENAME','V_SOURCETABLE',
			           'V_SOURCEREMARK','V_SOURCEID','D_DEFECTDATE','D_INDATE','V_PERCODE',
			           'V_PERNAME','V_ORGCODE','V_ORGNAME','V_DEPTCODE','V_DEPTNAME',
			           'V_EQUCODE','V_EQUNAME','V_EQUSITE','V_EQUSITENAME','V_EQUTYPECODE',
			           'V_EQUTYPENAME','V_IDEA','V_STATECODE','V_STATENAME','V_STATECOLOR','V_GUID'],
			proxy : {
				type : 'ajax',
				async : false,
				url : AppUrl + 'pm_19/PRO_PM_DEFECT_VIEW',
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
	        	beforeload: beforeGrid3Store
	        }
		});
	 
	 var grid4Store=Ext.create('Ext.data.Store',{
			id : 'grid4Store',
			pageSize : 20,
			autoLoad : false,
			fields : [ 'I_ID','V_ORDERGUID','V_ORDERID','V_ORDER_TYP','V_ORDER_TYP_TXT',
			           'V_FUNC_LOC','V_EQUSITENAME','V_EQUIP_NO','V_EQUIP_NAME','V_PLANT',
			           'V_IWERK','D_START_DATE','D_FINISH_DATE','D_FACT_START_DATE','D_FACT_FINISH_DATE',
			           'V_ACT_TYPE','V_PLANNER','V_WORK_CTR','V_SHORT_TXT','V_GSBER','V_GSBER_TXT',
			           'V_WORK_AREA','V_WBS','V_WBS_TXT','V_ENTERED_BY','V_PERSONNAME','D_ENTER_DATE',
			           'V_SYSTEM_STATUS','V_SYSNAME','V_ORGCODE','V_ORGNAME','V_DEPTCODE',
			           'V_DEPTNAME','V_DEPTCODEREPARIR','V_DEPTNAMEREPARIR','V_DEFECTGUID','V_STATECODE',
			           'V_STATENAME','V_SPARE','V_TOOL','V_TECHNOLOGY','V_SAFE','D_DATE_FK','D_DATE_ACP',
			           'I_OTHERHOUR','V_OTHERREASON','V_REPAIRCONTENT','V_REPAIRSIGN','V_REPAIRPERSON',
			           'V_POSTMANSIGN','V_CHECKMANCONTENT','V_CHECKMANSIGN','V_WORKSHOPCONTENT','V_WORKSHOPSIGN',
			           'V_DEPTSIGN','V_SEND_STATE'],
			proxy : {
				type : 'ajax',
				async : false,
				url : AppUrl+ 'pm_19/PRO_SAP_WORKORDER_SELECT',
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
	        	beforeload: beforeGrid4Store
	        }
		});
	 
	 var grid5Store=Ext.create('Ext.data.Store',{
			id : 'grid5Store',
			pageSize : 20,
			autoLoad : false,
			fields : [ 'BJ_UNIQUE_CODE','ALERT_VALUE','OFFSET','ACT_ALERT_VALUE','SUM_YEILD',
			           'MATERIALCODE','MATERIALNAME','UNIT','SITE_DESC','NEWOROLD','CHANGEDATE',
			           'BJ_STATUS','CYCLE_DESC'],
			proxy : {
				type : 'ajax',
				async : false,
				url : AppUrl + 'pm_19/PRO_RUN_EQU_BJ_ALERT_ALL',
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
	        	beforeload: beforeGrid5Store
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
	
	var northpanel=Ext.create('Ext.panel.Panel',{
		id:'northpanel',
		region:'north',
		width:'100%',
		frame:true,
		layout:'column',
		items:[{ xtype: 'combo', id: 'ck', store: ckStore, fieldLabel: '厂矿', style: ' margin: 5px 0px 5px 10px', labelWidth: 70, labelAlign: 'right', editable: false, queryMode: 'local', displayField: 'V_DEPTNAME', valueField: 'V_DEPTCODE' },
				       { xtype: 'combo', id: 'zyq', store: zyqStore, fieldLabel: '作业区', style: ' margin: 5px 0px 5px 10px', labelWidth: 70, labelAlign: 'right', editable: false, queryMode: 'local', displayField: 'V_DEPTNAME', valueField: 'V_DEPTCODE' },
				       { xtype: 'combo', id: 'sblx', store: sblxStore, fieldLabel: '设备类型', style: ' margin: 5px 0px 5px 10px', labelWidth: 70, labelAlign: 'right', editable: false, queryMode: 'local', displayField: 'V_EQUTYPENAME', valueField: 'V_EQUTYPECODE' },
				       { xtype: 'combo', id: 'sbmc', store: sbmcStore, fieldLabel: '设备名称', style: ' margin: 5px 0px 5px 10px', labelWidth: 70, labelAlign: 'right', editable: false, queryMode: 'local', displayField: 'V_EQUNAME', valueField: 'V_EQUCODE' },
				       {xtype:'button',text:'查询', style: ' margin: 5px 0px 5px 10px',icon: imgpath +'/search.png',handler:QueryTree}]
				   
	});
	
	var centerpanel=Ext.create('Ext.panel.Panel',{
		id:'centerpanel',
		//frame:true,
		region:'center',
		layout:'border',
		width:'80%',
		items:[{xtype:'panel',region:'west',minWidth:330,layout:'vbox',frame:true,
			items:[{xtype:'textfield',id:'rsbbm',fieldLabel:'设备编码',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
			       {xtype:'textfield',id:'rsbmc',fieldLabel:'设备名称',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
			       {xtype:'textfield',id:'rsblxbm',fieldLabel:'设备类型编码',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
			       {xtype:'textfield',id:'rsblxwz',fieldLabel:'设备类型位置',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
			       {xtype:'textfield',id:'rwzbm',fieldLabel:'位置编码',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
			       {xtype:'textfield',id:'rwzmc',fieldLabel:'位置名称',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
			       {xtype:'textfield',id:'rsblx',fieldLabel:'设备类型',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
			       {xtype:'textfield',id:'rsbzl',fieldLabel:'设备种类',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
			       {xtype:'textfield',id:'rbs',fieldLabel:'ABC标识',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
			       {xtype:'textfield',id:'rksrq',fieldLabel:'开始日期',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
			       {xtype:'textfield',id:'rjsrq',fieldLabel:'结束日期',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
			       {xtype:'textfield',id:'rcbzx',fieldLabel:'成本中心',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
			       {xtype:'textfield',id:'rggxh',fieldLabel:'规格型号',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
			       {xtype:'textfield',id:'rdxcc',fieldLabel:'大小/尺寸',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
			       {xtype:'textfield',id:'rzczzs',fieldLabel:'资产制造商',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
			       {xtype:'textfield',id:'rgzjz',fieldLabel:'购置价值',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
			       {xtype:'textfield',id:'rdxzl',fieldLabel:'对象重量',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true}]},
			  {xtype:'panel',region:'center',layout:'vbox',frame:true,baseCls: 'my-panel-no-border',autoScroll: true,
			    	   items:[{xtype:'panel',frame:true,layout:'hbox',width:'100%',baseCls: 'my-panel-no-border',
			    		   items:[{xtype:'grid',id:'grid1',width:'50%',store:grid1Store,columnLines: true,autoScroll: true,region:'center',title:'设备特性列表',height:200,
			    			   columns:[{ xtype: 'rownumberer', width: 30, sortable: false},
					    	            { text: '特性名称', width: 150, dataIndex: 'V_EQUTYPETXNAME', align: 'center', renderer: atleft },
					    	            { text: '特性值', width: 150, dataIndex: 'V_EQUTYPETXVALUE', align: 'center', renderer: atleft }],
					    	            bbar: [{
					                      	  id:'grid1page',
					                          xtype: 'pagingtoolbar',
					                          dock: 'bottom',
					                          displayInfo: true,
					                          displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
					                          emptyMsg: '没有记录',
					                          store: 'grid1Store'
					                      }]},
					    	      {xtype:'grid',id:'grid2',width:'50%',store:grid2Store,columnLines: true,autoScroll: true,region:'center',title:'设备备件清单',height:200,
							   columns:[{ xtype: 'rownumberer', width: 30, sortable: false},
									    { text: '备件编码', width: 150, dataIndex: 'V_SPCODE', align: 'center', renderer: atleft },
									    { text: '备件名称', width: 150, dataIndex: 'V_SPNAME', align: 'center', renderer: atleft },
									    { text: '数量', width: 80, dataIndex: 'V_NUMBER', align: 'center', renderer: atleft },
									    { text: '备注', width: 150, dataIndex: 'V_MEMO', align: 'center', renderer: atleft }],
									    bbar: [{
					                      	  id:'grid2page',
					                          xtype: 'pagingtoolbar',
					                          dock: 'bottom',
					                          displayInfo: true,
					                          displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
					                          emptyMsg: '没有记录',
					                          store: 'grid2Store'
					                      }]}]},
							  {xtype:'grid',id:'grid3',width:'100%',store:grid3Store,columnLines: true,autoScroll: true,region:'center',title:'缺陷列表(双击查看详细)',height:200,
								   columns:[{ xtype: 'rownumberer', width: 30, sortable: false},
										    { text: '发现日期', width: 150, dataIndex: 'D_DEFECTDATE', align: 'center', renderer: atleft },
										    { text: '缺陷内容', width: 300, dataIndex: 'V_DEFECTLIST', align: 'center', renderer: atleft },
										    { text: '状态', width: 150, dataIndex: 'V_STATENAME', align: 'center', renderer: atleft },
										    { text: '发现人', width: 150, dataIndex: 'V_PERNAME', align: 'center', renderer: atleft },
										    { text: '缺陷来源', width: 150, dataIndex: 'V_SOURCENAME', align: 'center', renderer: atleft }],
										    bbar: [{
						                      	  id:'grid3page',
						                          xtype: 'pagingtoolbar',
						                          dock: 'bottom',
						                          displayInfo: true,
						                          displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
						                          emptyMsg: '没有记录',
						                          store: 'grid3Store'
						                      }],listeners:{itemdblclick:Grid1ItemClick}},
							 {xtype:'grid',id:'grid4',width:'100%',store:grid4Store,columnLines: true,autoScroll: true,region:'center',title:'检修工单列表(双击查看详细)',height:200,
								    columns:[{ xtype: 'rownumberer', width: 30, sortable: false},
											 { text: '工单日期', width: 150, dataIndex: 'D_ENTER_DATE', align: 'center', renderer: atleft },
											 { text: '工单内容', width: 300, dataIndex: 'V_SHORT_TXT', align: 'center', renderer: atleft },
											 { text: '检修单位', width: 150, dataIndex: 'V_DEPTNAMEREPARIR', align: 'center', renderer: atleft },
											 { text: '状态', width: 150, dataIndex: 'V_STATENAME', align: 'center', renderer: atleft },
											 { text: '制单人', width: 150, dataIndex: 'V_PERSONNAME', align: 'center', renderer: atleft },
											 { text: '工单类型', width: 150, dataIndex: 'V_ORDER_TYP_TXT', align: 'center', renderer: atleft }],
											 bbar: [{
						                      	  id:'grid4page',
						                          xtype: 'pagingtoolbar',
						                          dock: 'bottom',
						                          displayInfo: true,
						                          displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
						                          emptyMsg: '没有记录',
						                          store: 'grid4Store'
						                      }],listeners:{itemdblclick:Grid2ItemClick}},
							 {xtype:'grid',id:'grid5',width:'100%',store:grid5Store,columnLines: true,autoScroll: true,region:'center',title:'设备运行台账',height:200,
									 columns:[{ xtype: 'rownumberer', width: 30, sortable: false},
											  { text: '设备位置', width: 150, dataIndex: 'SITE_DESC', align: 'center', renderer: atleft },
											  { text: '备件唯一标识', width: 300, dataIndex: 'BJ_UNIQUE_CODE', align: 'center', renderer: atleft },
											  { text: '物资编码', width: 150, dataIndex: 'MATERIALCODE', align: 'center', renderer: atleft },
											  { text: '物资描述', width: 150, dataIndex: 'MATERIALNAME', align: 'center', renderer: atleft },
											  { text: '计量单位', width: 150, dataIndex: 'UNIT', align: 'center', renderer: atleft },
											  { text: '更换时间', width: 150, dataIndex: 'CHANGEDATE', align: 'center', renderer: atleft },
											  { text: '作业量', width: 150, dataIndex: 'SUM_YEILD', align: 'center', renderer: atleft },
											  { text: '周期类型', width: 150, dataIndex: 'CYCLE_DESC', align: 'center', renderer: atleft },
											  { text: '报警值', width: 150, dataIndex: 'ALERT_VALUE', align: 'center', renderer: atleft },
											  { text: '预警偏移量', width: 150, dataIndex: 'OFFSET', align: 'center', renderer: atleft },
											  { text: '备件状态', width: 150, dataIndex: 'BJ_STATUS', align: 'center', renderer: atleft }],
											  bbar: [{
						                      	  id:'grid5page',
						                          xtype: 'pagingtoolbar',
						                          dock: 'bottom',
						                          displayInfo: true,
						                          displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
						                          emptyMsg: '没有记录',
						                          store: 'grid5Store'
						                      }]}]}]
	});
	
	
	Ext.create('Ext.container.Viewport', {
		id : "id",
		layout : 'border',
		items : [treepanel,northpanel,centerpanel]
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
			V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
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
	QueryList();
	QueryGrid1();
	QueryGrid2();
	QueryGrid3();
	QueryGrid4();
	QueryGrid5();
}

function QueryList(){
	Ext.Ajax.request({
        url: AppUrl + 'pm_19/PRO_SAP_PM_EQU_P_GET',
        method: 'POST',
        params:{
			V_V_EQUCODE:treeid
        },
        success:function(resp){
        	var resp = Ext.decode(resp.responseText);
        	if(resp.list.length!=0){
        		Ext.getCmp('rsbbm').setValue(resp.list[0].V_EQUCODE);//设备编码
        		Ext.getCmp('rsbmc').setValue(resp.list[0].V_EQUNAME);//设备名称
        		Ext.getCmp('rsblxbm').setValue(resp.list[0].V_EQUTYPECODE);//设备类型编码
        		Ext.getCmp('rsblxwz').setValue(resp.list[0].V_EQUTYPENAME);//设备类型位置
        		Ext.getCmp('rwzbm').setValue(resp.list[0].V_EQUSITE);//位置编码
        		Ext.getCmp('rwzmc').setValue(resp.list[0].V_EQUSITENAME);//位置名称
        		Ext.getCmp('rsblx').setValue(resp.list[0].V_EQUTYPENAME);//设备类型
        		Ext.getCmp('rsbzl').setValue(resp.list[0].V_EQULEVNAME);//设备种类
        		Ext.getCmp('rbs').setValue(resp.list[0].V_ABC);//ABC标识
        		Ext.getCmp('rksrq').setValue(resp.list[0].V_DATE_B);//开始日期
        		Ext.getCmp('rjsrq').setValue(resp.list[0].V_DATE_E);//结束日期
        		Ext.getCmp('rcbzx').setValue(resp.list[0].V_CASTNAME);//成本中心
        		Ext.getCmp('rggxh').setValue(resp.list[0].V_GGXH);//规格型号
        		Ext.getCmp('rdxcc').setValue(resp.list[0].V_SIZE);//大小/尺寸
        		Ext.getCmp('rzczzs').setValue(resp.list[0].V_ZZS);//资产制造商
        		Ext.getCmp('rgzjz').setValue(resp.list[0].F_MONEY);//购置价值
        		Ext.getCmp('rdxzl').setValue(resp.list[0].F_WEIGHT);//对象重量
        	}
        }
	});
}

function QueryGrid1(){
	Ext.data.StoreManager.lookup('grid1Store').load({
		params:{
			V_V_EQUCODE:treeid,
			V_V_EQUTYPECODE:Ext.getCmp('sblx').getValue()
		}
	});
}
function QueryGrid2(){
	Ext.data.StoreManager.lookup('grid2Store').load({
		params:{
			V_V_EQUCODE:treeid
		}
	});
}
function QueryGrid3(){
	Ext.data.StoreManager.lookup('grid3Store').load({
		params:{
			V_D_DEFECTDATE_B:'1999-1-1',
			V_D_DEFECTDATE_E:'2099-1-1',
			V_V_DEPTCODE:'%',
			V_V_EQUTYPECODE:'%',
			V_V_EQUCODE:treeid,
			V_V_STATECODE:'%',
			V_V_SOURCECODE:'%',
			V_V_DEFECTLIST:'%'
		}
	});
}
function QueryGrid4(){
	Ext.data.StoreManager.lookup('grid4Store').load({
		params:{
			V_D_ENTER_DATE_B:'1999-1-1',
			V_D_ENTER_DATE_E:'2099-1-1',
			V_V_ORGCODE:'%',
			V_V_DEPTCODE:'%',
			V_V_DEPTCODEREPARIR:'',
			V_V_STATECODE:'%',
			V_EQUTYPE_CODE:'%',
			V_EQU_CODE:treeid,
			V_DJ_PERCODE:'%',
			V_V_SHORT_TXT:'%',
			V_V_BJ_TXT:'%',
			V_V_ORDER_TYP:'%'
		}
	});
}
function QueryGrid5(){
	Ext.data.StoreManager.lookup('grid5Store').load({
		params:{
			A_EQUID:treeid,
			A_CYCLE_ID:'%'
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

function beforeGrid1Store(store){
	store.proxy.extraParams.V_V_EQUCODE =treeid;
	store.proxy.extraParams.V_V_EQUTYPECODE = Ext.getCmp('sblx').getValue();
}

function beforeGrid2Store(store){
	store.proxy.extraParams.V_V_EQUCODE = treeid;
}

function beforeGrid3Store(store){
	store.proxy.extraParams.V_D_DEFECTDATE_B = '1999-1-1';
	store.proxy.extraParams.V_D_DEFECTDATE_E='2099-1-1';
	store.proxy.extraParams.V_V_DEPTCODE='%';
	store.proxy.extraParams.V_V_EQUTYPECODE='%';
	store.proxy.extraParams.V_V_EQUCODE=treeid;
	store.proxy.extraParams.V_V_STATECODE='%';
	store.proxy.extraParams.V_V_SOURCECODE='%';
	store.proxy.extraParams.V_V_DEFECTLIST='%';
}

function beforeGrid4Store(store){
	store.proxy.extraParams.V_D_ENTER_DATE_B ='1999-1-1';
	store.proxy.extraParams.V_D_ENTER_DATE_E = '2099-1-1';
	store.proxy.extraParams.V_V_ORGCODE = '%';
	store.proxy.extraParams.V_V_DEPTCODE = '%';
	store.proxy.extraParams.V_V_DEPTCODEREPARIR = '';
	store.proxy.extraParams.V_V_STATECODE = '%';
	store.proxy.extraParams.V_EQUTYPE_CODE = '%';
	store.proxy.extraParams.V_EQU_CODE = treeid;
	store.proxy.extraParams.V_DJ_PERCODE = '%';
	store.proxy.extraParams.V_V_SHORT_TXT = '%';
	store.proxy.extraParams.V_V_BJ_TXT = '%';
	store.proxy.extraParams.V_V_ORDER_TYP = '%';
}

function beforeGrid5Store(store){
	store.proxy.extraParams.A_EQUID = treeid;
	store.proxy.extraParams.A_CYCLE_ID = '%';
}

function Grid1ItemClick(s, record, item, index, e, eOpts){
	try {
		window.parent.append('070301', '缺陷跟踪明细', AppUrl + 'page/PM_070301/index.html?v_guid='+record.raw.V_GUID);
	} catch (e) {
		window.open(AppUrl + "page/PM_070301/index.html?v_guid="+ record.raw.V_GUID,"", "dialogHeight:700px;dialogWidth:1100px");
	}
}

function Grid2ItemClick(s, record, item, index, e, eOpts){
	try {
		window.parent.append('091103', '检修工单验收明细', AppUrl + 'page/PM_091103/index.html?V_GUID='+record.raw.V_ORDERGUID);
	} catch (e) {
		window.open(AppUrl + "page/PM_091103/index.html?V_GUID="+ record.raw.V_ORDERGUID,"", "dialogHeight:700px;dialogWidth:1100px");
	}
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>' ;
}