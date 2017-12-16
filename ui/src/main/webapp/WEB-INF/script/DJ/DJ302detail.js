 
var key_code= '';
if(location.href.split('?')[1]!=null){ 
	key_code = Ext.urlDecode(location.href.split('?')[1]).key_code;
}
 
Ext.onReady(function() {
        
	 var gridStore = Ext.create('Ext.data.Store', {
     	
        storeId: 'gridStore',
        pageSize:20,
        fields : ['ID', 'BYQ_UNIQUE_CODE', 'OP_TYPE', 'OP_CONTEXT',
						'OP_DATE', 'OP_USERID', 'OP_USERNAME', 'REMARK'],
        proxy: {
            type: 'ajax',
            async: false,
			url : AppUrl + 'DJ/pro_dj301_byqoplog',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
	
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
    
    var plantStore = Ext.create('Ext.data.Store', {
     	
        storeId: 'plantStore',
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
	
	var list1 = Ext.create('Ext.panel.Panel', {
		style: 'background-color:#FFFFFF',
		baseCls: 'my-panel-no-border',
		region : 'north',frame:true,bodyPadding:5,
		layout:{type:'table',columns:3},
		defaults:{labelAlign:'right',labelWidth:70},
		items : [
			{id:'BYQ_UNIQUE_CODE', xtype: 'displayfield',fieldLabel: '变压器唯一编号',labelWidth:100},
			{id:'BYQ_NAME', xtype: 'textfield',fieldLabel: '变压器名称',readOnly :true},
			{id:'SUPPLY_CODE', xtype: 'textfield',fieldLabel: '厂家编码',readOnly :true},
			{id:'BYQ_V', xtype: 'textfield',fieldLabel: '额定电压',readOnly :true},
			{id:'QSZL', xtype: 'textfield',fieldLabel: '器身重量',readOnly :true},
			{id : 'BYQ_SERIES', xtype : 'combobox', fieldLabel : '系列分类',editable :false, store:typeStore,labelWidth:70,
				displayField: 'BYQ_SERIES_CLASS_DESC', valueField: 'BYQ_SERIES_CLASS', queryMode: 'local', labelAlign :'right',readOnly :true
			},
			{id:'BYQ_TYPE', xtype: 'textfield',fieldLabel: '变压器型号',readOnly :true},
			{id:'SUPPLY_NAME', xtype: 'textfield',fieldLabel: '厂家名称',readOnly :true},
			{id:'BYQ_A', xtype: 'textfield',fieldLabel: '额定电流',readOnly :true},
			{id:'YZ', xtype: 'textfield',fieldLabel: '油重',readOnly :true},


			{id : 'plant', xtype : 'combobox', fieldLabel : '所属厂矿',editable :false,labelWidth:70,
				queryMode: 'local',labelAlign :'right',displayField: 'DEPARTNAME', valueField: 'DEPARTCODE',
				store:plantStore,readOnly :true
			},
			{id : 'dept', xtype : 'combobox', fieldLabel : '所属部门',editable :false,
				displayField: 'DEPARTNAME', valueField: 'DEPARTCODE', queryMode: 'local', labelAlign :'right',store:deptStore,readOnly :true
			},
			{id:'PRODUCE_DATE', xtype: 'datefield',fieldLabel: '出厂日期',format:'Y-m-d',readOnly :true},
			{id:'LJZBH', xtype: 'textfield',fieldLabel: '连接组标号',readOnly :true},
			{id:'ZZ', xtype: 'textfield',fieldLabel: '总重',readOnly :true},


			{id : 'save_plant', xtype : 'combobox', fieldLabel : '存放单位',store:savePlantStore,editable:false,labelWidth:70,
				displayField: 'DEPARTNAME', valueField: 'DEPARTCODE', queryMode: 'local',readOnly :true},
			{id:'DJ_LOC', xtype: 'textfield',fieldLabel: '存放位置',readOnly :true},
			{id:'BYQ_VOL', xtype: 'textfield',fieldLabel: '容量',readOnly :true},
			{id:'ZKDY', xtype: 'textfield',fieldLabel: '阻抗电压',readOnly :true},
			{id:'KZSH', xtype: 'textfield',fieldLabel: '空载损耗',readOnly :true},


			{id:'LQFS', xtype: 'textfield',fieldLabel: '冷却方式',labelWidth:70,readOnly :true},
			{id:'SYTJ', xtype: 'textfield',fieldLabel: '使用条件',readOnly :true},
			{id:'DLSH', xtype: 'textfield',fieldLabel: '短路损耗',readOnly :true},
			{id:'KZDL', xtype: 'textfield',fieldLabel: '空载电流',readOnly :true},
			{id : 'WORK_STATUS', xtype : 'combobox', fieldLabel : '运行状态',editable :false,colspan: 3,
				displayField: 'WORK_STATUS_DESC', valueField: 'WORK_STATUS', queryMode: 'local', labelAlign :'right',
				store:runStateStore,readOnly :true
			},

			{id:'REMARK', xtype: 'textarea',fieldLabel: '备注',colspan: 5,width:680,labelWidth:70,readOnly :true}

		]
	});
	
 

	var grid = Ext.create('Ext.grid.Panel', {
			id : 'grid',
			region : 'center',
			columnLines : true,
			title:'维护记录',
			width : '100%',
			autoScroll : true,
			store :gridStore,
			dufaults:{width:120},
			columns : [ 
			          { xtype:'rownumberer',align : 'center'},
			            
					  { text : '操作日期', dataIndex : 'OP_DATE',align : 'center',width:150},
					  { text : '操作人', dataIndex : 'OP_USERNAME',  align : 'center',width:140}, 
					  { text : '维护类型', dataIndex : 'OP_TYPE', align : 'center',width:100},
					  { text : '维护内容', dataIndex : 'OP_CONTEXT', align : 'center',width:320},
					  { text : '备注说明', dataIndex : 'REMARK', align : 'center',width:300}
					  
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
		
	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		autoScroll : true,
		items : [ list1,grid ]
	});
 
	
   /*gridStore.on('beforeload', function (store, options) {
		   	    var params = {
		  	            parName : ['key_code'],
						parType : ['s'],
						parVal : [ key_code  ],
						proName : 'pro_dj301_byqoplog',
						cursorName : 'RET'
		  	   };
		  	   Ext.apply(store.proxy.extraParams, params);
	  })*/
		   
   queryLog();
   function queryLog(){
	   Ext.data.StoreManager.lookup('gridStore').load({
		   params : {
			   key_code: key_code
		   }
	   });
	}
	
	 
	savePlantStore.on('load',function(){
	       savePlantStore.insert(0,{DEPARTCODE:'%',DEPARTNAME:'全部'});
		   savePlantStore.sort('DEPARTCODE','ASC');
		   
		   Ext.getCmp('save_plant').select(savePlantStore.getAt(0)); 
		   
		   runStateStore.load();
	});

	runStateStore.on('load',function(){
	
		   runStateStore.insert(0,{WORK_STATUS:'%',WORK_STATUS_DESC:'全部'});
		   runStateStore.sort('WORK_STATUS','ASC');
		   
		   Ext.getCmp('WORK_STATUS').select(runStateStore.getAt(0)); 
		   
		   typeStore.load();
	});
	
	typeStore.on('load',function(){

		   typeStore.insert(0,{BYQ_SERIES_CLASS:'%',BYQ_SERIES_CLASS_DESC:'全部'});
		   typeStore.sort('BYQ_SERIES_CLASS','ASC');
		   
		   Ext.getCmp('BYQ_SERIES').select(typeStore.getAt(0)); 
		   
		   
		   queryContent();
	});
	 
	
	
	function queryContent(){
		Ext.Ajax.request({
			url: AppUrl + 'DJ/pro_dj301_byqmaindetail',
			method : 'POST',
			async : false,
			params : {
				key_code:key_code
			},
			success : function(resp) {
				var resp = Ext.JSON.decode(resp.responseText);
				if (resp.list.length > 0) {
					Ext.getCmp('BYQ_UNIQUE_CODE').setValue(resp.list[0].BYQ_UNIQUE_CODE);
					Ext.getCmp('BYQ_NAME').setValue(resp.list[0].BYQ_NAME);
					Ext.getCmp('SUPPLY_CODE').setValue(resp.list[0].SUPPLY_CODE);
					Ext.getCmp('BYQ_V').setValue(resp.list[0].BYQ_V);
					Ext.getCmp('QSZL').setValue(resp.list[0].QSZL);

					Ext.getCmp('BYQ_SERIES').setValue(resp.list[0].BYQ_SERIES);  //select
					Ext.getCmp('BYQ_TYPE').setValue(resp.list[0].BYQ_TYPE);
					Ext.getCmp('SUPPLY_NAME').setValue(resp.list[0].SUPPLY_NAME);
					Ext.getCmp('BYQ_A').setValue(resp.list[0].BYQ_A);
					Ext.getCmp('YZ').setValue(resp.list[0].YZ);

					//Ext.getCmp('plant').setValue();        //select
					if(resp.list[0].PLANTCODE==""){
						plantStore.insert(0,{DEPARTCODE:Ext.util.Cookies.get("mm.plantcode"),DEPARTNAME:Ext.util.Cookies.get("mm.plantname")});
					}else{
						plantStore.insert(0,{DEPARTCODE:resp.list[0].PLANTCODE,DEPARTNAME:resp.list[0].PLANTNAME});
					}
					Ext.getCmp('plant').select(plantStore.getAt(0));


					//Ext.getCmp('dept').setValue();         //select
					if(resp.list[0].PLANTCODE==""){

						getDeptList();
					}else{
						deptStore.insert(0,{DEPARTCODE:resp.list[0].DEPARTCODE,DEPARTNAME:resp.list[0].DEPARTNAME});
						Ext.getCmp('dept').select(deptStore.getAt(0));
					}


					Ext.getCmp('PRODUCE_DATE').setValue(resp.list[0].PRODUCE_DATE);
					Ext.getCmp('LJZBH').setValue(resp.list[0].LJZBH);
					Ext.getCmp('ZZ').setValue(resp.list[0].ZZ);

					Ext.getCmp('save_plant').select(savePlantStore.findRecord('DEPARTCODE',resp.list[0].PLANTCODE));   //select

					Ext.getCmp('DJ_LOC').setValue(resp.list[0].DJ_LOC);
					Ext.getCmp('BYQ_VOL').setValue(resp.list[0].BYQ_VOL);
					Ext.getCmp('ZKDY').setValue(resp.list[0].ZKDY);
					Ext.getCmp('KZSH').setValue(resp.list[0].KZSH);

					Ext.getCmp('LQFS').setValue(resp.list[0].LQFS);
					Ext.getCmp('SYTJ').setValue(resp.list[0].SYTJ);
					Ext.getCmp('DLSH').setValue(resp.list[0].KZDL);
					Ext.getCmp('KZDL').setValue(resp.list[0].KZDL);

					Ext.getCmp('WORK_STATUS').select(runStateStore.findRecord('WORK_STATUS',resp.list[0].WORK_STATUS));  //select

					Ext.getCmp('REMARK').setValue(resp.list[0].REMARK);
				}
			}
		});

	}
  
})
