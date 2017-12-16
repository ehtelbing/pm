 
var type= '';
if(location.href.split('?')[1]!=null){ 
	type = Ext.urlDecode(location.href.split('?')[1]).type;
}

Ext.onReady(function() {
        
	function left(value, metaData, record, rowIndex, colIndex, store) {
        metaData.style = "text-align:left;"; return value;
    }
    function right(value, metaData, record, rowIndex, colIndex, store) {
        metaData.style = "text-align:right;"; return value;
    }
    
     var deptStore = Ext.create('Ext.data.Store', {
     	
        storeId: 'deptStore',
        fields: ['DEPARTCODE', 'DEPARTNAME'],
        proxy: {
	        type: 'memory',
	        reader: {
	            type: 'json'
	        }
	    }
    });
    
     var savePlantStore = Ext.create("Ext.data.Store", {
			autoLoad : true,
			storeId : 'savePlantStore',
		 fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
			proxy : {
				type : 'ajax',
				async : false,
				url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
				actionMethods : {
					read : 'POST'
				},
				reader : {
					type : 'json',
					root : 'list'
				},
				extraParams :{
					'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
					'V_V_DEPTCODE':  Ext.util.Cookies.get('v_orgCode'),
					'V_V_DEPTCODENEXT': Ext.util.Cookies.get('v_deptcode'),
					'V_V_DEPTTYPE': '基层单位'
				}
			}
	});	
	
	var typeStore = Ext.create("Ext.data.Store", {
			autoLoad : false,
			storeId : 'typeStore',
			fields : [ 'BYQ_SERIES_CLASS', 'BYQ_SERIES_CLASS_DESC' ],
			proxy : {
				type : 'ajax',
				async : false,
				url : AppUrl + 'DJ/pro_dj108_byqseries_able',
				actionMethods : {
					read : 'POST'
				},
				reader : {
					type : 'json',
					root : 'list'
				},
				extraParams :{
				}
			}
	});
	
	 
	
	var runStateStore = Ext.create("Ext.data.Store", {
			autoLoad : false,
			storeId : 'runStateStore',
			fields : [ 'WORK_STATUS', 'WORK_STATUS_DESC' ],
			proxy : {
				type : 'ajax',
				async : false,
				url : AppUrl + 'DJ/pro_dj201_workstatus',
				actionMethods : {
					read : 'POST'
				},
				reader : {
					type : 'json',
					root : 'list'
				},
				extraParams :{
				}
			}
	});	
    
    var gridStore = Ext.create('Ext.data.Store', {
     	
        storeId: 'gridStore',
        pageSize:20,
        fields : ['BYQ_NAME','BYQ_UNIQUE_CODE', 'BYQ_TYPE', 'BYQ_SERIES',
						'BYQ_VOL', 'BYQ_XS', 'BYQ_V', 'BYQ_A', 'LJZBH', 'ZKDY',
						'LQFS', 'SYTJ', 'QSZL', 'YZ', 'ZZ', 'SUPPLY_NAME',
						'SUPPLY_CODE', 'PRODUCE_DATE', 'KZSH', 'DLSH', 'KZDL',
						'WORK_STATUS', 'PLANTCODE', 'PLANTNAME', 'DEPARTCODE',
						'DEPARTNAME', 'LOC_PLANTCODE', 'LOC_PLANTNAME',
						'DJ_LOC', 'REMARK', 'INSERTDATE', 'WORK_STATUS'],
        proxy: {
            type: 'ajax',
            async: false,
			url : AppUrl + 'DJ/pro_dj301_byqmainlist',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
	
	var list1 = Ext.create('Ext.panel.Panel', {
		style: 'background-color:#FFFFFF',
		baseCls: 'my-panel-no-border',
		region : 'north',frame:true,bodyPadding:5,
		layout:{type:'table',columns:3},
		defaults:{labelAlign:'right',labelWidth:70},
		items : [
			{id : 'plant', xtype : 'combobox', fieldLabel : '所属厂矿',editable :false,
				queryMode: 'local',labelAlign :'right',
				store:[[Ext.util.Cookies.get('v_orgCode'),Ext.util.Cookies.get('v_orgname2')]],
				value:Ext.util.Cookies.get('v_orgCode')
			},

			{id : 'dept', xtype : 'combobox', fieldLabel : '所属部门',editable :false,
				displayField: 'DEPARTNAME', valueField: 'DEPARTCODE', queryMode: 'local', labelAlign :'right',store:deptStore
			},

			{id : 'type', xtype : 'combobox', fieldLabel : '系列分类',editable :false, store:typeStore,
				displayField: 'BYQ_SERIES_CLASS_DESC', valueField: 'BYQ_SERIES_CLASS', queryMode: 'local', labelAlign :'right'
			},

			{id : 'save_plant', xtype : 'combobox', fieldLabel : '存放单位',store:savePlantStore,editable:false,
				displayField: 'V_DEPTNAME', valueField: 'V_DEPTCODE', queryMode: 'local'},

			{id:'save_location', xtype: 'textfield',fieldLabel: '存放位置'},

			{id : 'run_state', xtype : 'combobox', fieldLabel : '运行状态',editable :false,
				displayField: 'WORK_STATUS_DESC', valueField: 'WORK_STATUS', queryMode: 'local', labelAlign :'right',
				store:runStateStore
			},


			{id:'generator_name', xtype: 'textfield',fieldLabel: '变压器名称'},
			{id:'generator_code', xtype: 'textfield',fieldLabel: '变压器编号'},
			{id:'generator_Version', xtype: 'textfield',fieldLabel: '变压器型号'},


			{bodyStyle:'background: none' ,border:0, items:[
				{xtype:'button',text:'查询',id:'query',margin:'0px 0px 0px 30px',icon:imgpath+'/search.png'},
				{xtype:'button',text:'导出Excel',id:'exp',margin:'0px 0px 0px 10px',icon:imgpath+'/311.gif',width:90}
			]}
		]
	});
 
	 var grid = Ext.create('Ext.grid.Panel', {
			id : 'grid',
			region : 'center',
			columnLines : true,
			width : '100%',
			autoScroll : true,
			store :gridStore,
			dufaults:{width:120},
			columns : [ 
			          { xtype:'rownumberer',align : 'center'},
			          { text : '电机唯一编号', align : 'center',xtype: 'templatecolumn', 
			            tpl: '<a style="cursor:pointer;text-decoration:underline; color:#00F">{BYQ_UNIQUE_CODE}</a>',id:'edit'},
			            
					  { text : '变压器名称', dataIndex : 'BYQ_NAME',align : 'center',width:200},
					  { text : '变压器型号', dataIndex : 'BYQ_TYPE',  align : 'center',width:100}, 
					  { text : '系列分类', dataIndex : 'BYQ_SERIES', align : 'center',width:100},
					  
					  { text : '容量', dataIndex : 'BYQ_VOL', align : 'center',width:100},
					  { text : '所属厂矿名', dataIndex : 'PLANTNAME', align : 'center',width:120},
					  { text : '所属部门名', dataIndex : 'DEPARTNAME', align : 'center',width:120},
					  { text : '存放单位名', dataIndex : 'LOC_PLANTNAME', align : 'center',width:150},
					  { text : '存放位置', dataIndex : 'DJ_LOC', align : 'center',width:80},
					  
					  { text : '运行状态', dataIndex : 'WORK_STATUS', align : 'center',width:80}
					 
					  
					],
		   bbar: ['->',{ xtype: 'pagingtoolbar',
			         id:'pagingtoolbar',
	                 dock: 'bottom',
	                 displayInfo: true,
	                 displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
	                 emptyMsg: '没有记录',
	                 store: 'gridStore'  } 
           ]
		});
 
	var rightPanel = Ext.create('Ext.panel.Panel', {
		region : 'center',
		layout : 'border',
		frame : true,
		autoScroll : true,
		items : [ list1, grid] 
	});

	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		autoScroll : true,
		items : [ rightPanel ]
	});
	
	
	getDeptList(deptStore);
	
	savePlantStore.on('load',function(){
	       savePlantStore.insert(0,{V_DEPTCODE:'%',V_DEPTNAME:'全部'});
		   savePlantStore.sort('DEPARTCODE','ASC');
		   
		   Ext.getCmp('save_plant').select(savePlantStore.getAt(0)); 
		   
		   typeStore.load();
	});
	
 
	typeStore.on('load',function(){

		   typeStore.insert(0,{BYQ_SERIES_CLASS:'%',BYQ_SERIES_CLASS_DESC:'全部'});
		   typeStore.sort('BYQ_SERIES_CLASS','ASC');
		   
		   Ext.getCmp('type').select(typeStore.getAt(0)); 
		   
		   runStateStore.load();
		   //run_state
	});
	
	
	runStateStore.on('load',function(){
	
		   runStateStore.insert(0,{WORK_STATUS:'%',WORK_STATUS_DESC:'全部'});
		   runStateStore.sort('WORK_STATUS','ASC');
		   
		   Ext.getCmp('run_state').select(runStateStore.getAt(0)); 
		   
		   query();
	})
	
	
	Ext.data.StoreManager.lookup('gridStore').on('beforeload',function(store) {
		store.proxy.extraParams.plantCode = Ext.getCmp("plant").getValue();
		store.proxy.extraParams.deptCode = Ext.getCmp("dept").getValue();
		store.proxy.extraParams.type_in = Ext.getCmp("type").getValue();
		store.proxy.extraParams.save_code = Ext.getCmp("save_plant").getValue();
		store.proxy.extraParams.save_location = Ext.getCmp("save_location").getValue();
		store.proxy.extraParams.run_state =Ext.getCmp("run_state").getValue();
		store.proxy.extraParams.generator_name = Ext.getCmp("generator_name").getValue();
		store.proxy.extraParams.generator_code = Ext.getCmp("generator_code").getValue();
		store.proxy.extraParams.generator_Version = Ext.getCmp("generator_Version").getValue();
	});
	Ext.getCmp('query').on('click',query);
	Ext.getCmp('type').on('select',query);
	Ext.getCmp('save_plant').on('select',query);
	
	
	function query(){ gridStore.load(); }
	
	  
	  
	   Ext.getCmp('edit').on('click',function(a,b,c,d){
		   window.open(AppUrl + "page/DJ/DJ302detail.html?key_code="+gridStore.getAt(c).get("BYQ_UNIQUE_CODE"),"", "dialogHeight:700px;dialogWidth:1100px");
	  })
	  
	  
	  Ext.getCmp('run_state').on('select',query);
	  
	  Ext.getCmp('exp').on('click',expExcel);
})
