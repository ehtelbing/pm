 
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
    var billStateStore = Ext.create("Ext.data.Store", {
			autoLoad : true,
			storeId : 'billStateStore',
			fields : [ 'ORDER_STATUS', 'ORDER_STATUS_DESC' ],
			proxy : {
				type : 'ajax',
				async : false,
				url : APP + '/orgModelSelect',
				actionMethods : {
					read : 'POST'
				},
				reader : {
					type : 'json',
					root : 'list'
				},
				extraParams :{
				    parName : [],
					parType : [],
					parVal : [],
					proName : 'pro_dj_orderstatus',
					cursorName : 'P_CUR'
				}
			}
	});	
	
	 
	
	
	var checkPlantStore = Ext.create("Ext.data.Store", {
			autoLoad : true,
			storeId : 'checkPlantStore',
			fields : [ 'MENDDEPT_CODE', 'MENDDEPT_NAME' ],
			proxy : {
				type : 'ajax',
				async : false,
				url : APP + '/ModelSelect',
				actionMethods : {
					read : 'POST'
				},
				reader : {
					type : 'json',
					root : 'list'
				},
				extraParams :{
				    parName : ['usercode_in','plantcode_in'],
					parType : ['s','s'],
					parVal : [Ext.util.Cookies.get("mm.userid"),
					          Ext.util.Cookies.get("mm.plantcode")
					],
					proName : 'pro_dj603_menddept',
					cursorName : 'P_CUR'
				}
			}
	});	
	
	
	
	var plantStore = Ext.create("Ext.data.Store", {
			autoLoad : true,
			storeId : 'plantStore',
			fields : [ 'DEPARTCODE', 'DEPARTNAME' ],
			proxy : {
				type : 'ajax',
				async : false,
				url : APP + '/orgModelSelect',
				actionMethods : {
					read : 'POST'
				},
				reader : {
					type : 'json',
					root : 'list'
				},
				extraParams :{
				    parName : [],
					parType : [],
					parVal : [],
					proName : 'PRO_MM_PLANT',
					cursorName : 'P_CUR'
				}
			}
	});
	
	
     var gridStore = Ext.create('Ext.data.Store', {
     	
        storeId: 'gridStore',
        fields : ['APPLY_PLANT','APPLY_PLANTNAME','COST_MONEY'],
        proxy: {
            type: 'ajax',
            async: false,
            url: APP + '/ModelSelect',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    
    
    var gridStore2 = Ext.create('Ext.data.Store', {
     	
        storeId: 'gridStore2',
        fields : ['CODE','NAME','COST_MONEY'],
        proxy: {
            type: 'ajax',
            async: false,
            url: APP + '/ModelSelect',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    
    
    var gridStore3 = Ext.create('Ext.data.Store', {
    
        storeId: 'gridStore3',
        fields : ['ORDERID','DJ_UQ_CODE','DJ_NAME','COST_MONEY','MEND_CONTEXT'],
        proxy: {
            type: 'ajax',
            async: false,
            url: APP + '/ModelSelect',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    
    
    
    var gridStore4 = Ext.create('Ext.data.Store', {
 
        storeId: 'gridStore4',
        fields : ['ID','ORDERID','COST_ITEM','COST_MONEY','INSERT_USERNAME','INSERT_USERID','INSERTDATE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: APP + '/ModelSelect',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
 
    
     var deptStore = Ext.create("Ext.data.Store", {
			autoLoad : false,
			storeId : 'deptStore',
			fields : [ 'DEPARTCODE','DEPARTNAME'],
			proxy : {
				type : 'ajax',
				async : false,
				url : APP + '/orgModelSelect',
				actionMethods : {
					read : 'POST'
				},
				reader : {
					type : 'json',
					root : 'list'
				}
			}
	});	

	var toPlantStore = Ext.create("Ext.data.Store", {
			autoLoad : true,
			storeId : 'toPlantStore',
			fields : [ 'MENDDEPT_CODE', 'MENDDEPT_NAME' ],
			proxy : {
				type : 'ajax',
				async : false,
				url : APP + '/ModelSelect',
				actionMethods : {
					read : 'POST'
				},
				reader : {
					type : 'json',
					root : 'list'
				},
				extraParams :{
				    parName : [],
					parType : [],
					parVal : [],
					proName : 'pro_dj401_mendplant',
					cursorName : 'P_CUR'
				}
			}
	});	
	
	var list1 = Ext.create('Ext.panel.Panel', {
		region : 'north',
		bodyStyle: {background: 'none'},
		border:0,
		defaults : {
			labelAlign:'right',
			labelWidth:60
		},
		items : [ 
		     {frame : true,style:'margin-bottom:1px',
		      defaults : {
					labelAlign:'right',
					labelWidth:60
		      },
		      layout: {
		        type: 'table',
		        columns: 3
		      },
		      items:[
		      
		          {id:'billcode', xtype: 'textfield',fieldLabel: '工单号'},
		          {id:'begindate', xtype: 'datefield',fieldLabel: '起始日期',format:'Y-m-d',value:getDate()  },
		         {id:'enddate', xtype: 'datefield',fieldLabel: '结束日期',format:'Y-m-d',value:getDate("end")},
		      
		          {id : 'plant', xtype : 'combobox', fieldLabel : '检修单位',store:checkPlantStore,editable:false,
			      displayField: 'MENDDEPT_NAME', valueField: 'MENDDEPT_CODE', queryMode: 'local'},
		         
		         {id:'djcode', xtype: 'textfield',fieldLabel: '电机编号'},
		         {id:'djname', xtype: 'textfield',fieldLabel: '电机名称'},
		     
			      {id : 'APPLY_PLANT', xtype : 'combobox', fieldLabel : '申请单位',store:plantStore,editable:false,
			      displayField: 'DEPARTNAME', valueField: 'DEPARTCODE', queryMode: 'local'},
		          
		         {colspan: 3,layout:'column',border:0,bodyStyle:'background:none',
		         items:[
		             {xtype:'button',text:'查询',id:'query',margin:'0px 0px 0px 10px',icon:imgpath+'/a1.gif'},
				     {xtype:'button',text:'导出到Excel',id:'excel',margin:'0px 0px 0px 10px',icon:imgpath+'/311.gif'},
				     
				     {xtype:'hidden',id:'tabID',value:'grid'}
		         ]}
				   
		     ] }
		]
	});
  
	 var grid = Ext.create('Ext.grid.Panel', {
			id : 'grid',
			region : 'center',
			columnLines : true,
			width : '100%',
			autoScroll : true,
			title:'申请单位费用统计',
			store :gridStore,
			features : [{
				 ftype : 'summary'
			}],
			dufaults:{width:120},
			columns : [ 
					  { text : '申请厂矿编码', dataIndex : 'APPLY_PLANT',align : 'center',width:120},
					  { text : '申请厂矿名', dataIndex : 'APPLY_PLANTNAME',  align : 'center',width:170}, 
					  { text : '维修费用', dataIndex : 'COST_MONEY',  align : 'center',width:170,
					     summaryType: 'sum',
						 summaryRenderer: function(value, summaryData, dataIndex) {
						 	  
							 return "合计："+ Ext.util.Format.number(value,'0.00') ; 
						 }}
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
		
		
		var grid2 = Ext.create('Ext.grid.Panel', {
			id : 'grid2',
			region : 'center',
			columnLines : true,
			width : '100%',
			features : [{
				 ftype : 'summary'
			}],
			autoScroll : true,
			title:'检修单位统计',
			store :gridStore2,
			dufaults:{width:120},
			columns : [  
					  { text : '检修单位编码', dataIndex : 'CODE',align : 'center',width:120},
					  { text : '检修单位名称', dataIndex : 'NAME',  align : 'center',width:170}, 
					  { text : '维修费用', dataIndex : 'COST_MONEY',  align : 'center',width:170,
					   summaryType: 'sum',
						 summaryRenderer: function(value, summaryData, dataIndex) {
						 	  
							 return "合计："+ Ext.util.Format.number(value,'0.00') ; 
						 }}
					],
		   bbar: ['->',{ xtype: 'pagingtoolbar',
			         id:'pagingtoolbar',
	                 dock: 'bottom',
	                 displayInfo: true,
	                 displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
	                 emptyMsg: '没有记录',
	                 store: 'gridStore2'  } 
           ]
		});
		
		
		var grid3 = Ext.create('Ext.grid.Panel', {
			id : 'grid3',
			region : 'center',
			columnLines : true,
			features : [{
				 ftype : 'summary'
			}],
			width : '100%',
			autoScroll : true,
			title:'按工单统计',
			store :gridStore3,
			dufaults:{width:120},
			columns : [  
					  { text : '工单号', dataIndex : 'ORDERID',align : 'center',width:120},
					  { text : '电机编号', dataIndex : 'DJ_UQ_CODE',  align : 'center',width:150}, 
					  { text : '电机名称', dataIndex : 'DJ_NAME',  align : 'center',width:170}, 
					  { text : '维修内容', dataIndex : 'MEND_CONTEXT',  align : 'center',width:170}, 
					  { text : '费用合计', dataIndex : 'COST_MONEY',  align : 'center',width:170,
					     summaryType: 'sum',
						 summaryRenderer: function(value, summaryData, dataIndex) {
						 	  
							 return "合计："+ Ext.util.Format.number(value,'0.00') ; 
						 }}, 
					  
					  { text : '费用明细', align : 'center',xtype: 'templatecolumn',width:60,
					    tpl: '<a style="cursor:pointer;text-decoration:underline; color:#00F">查看</a>',id:'show'}
					 
					],
		   bbar: ['->',{ xtype: 'pagingtoolbar',
			         id:'pagingtoolbar',
	                 dock: 'bottom',
	                 displayInfo: true,
	                 displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
	                 emptyMsg: '没有记录',
	                 store: 'gridStore3'  } 
           ]
		});
 
		var tab = Ext.create('Ext.tab.Panel', { 
			id:'tab',
		    region : 'center',
		    layout : 'border',
		    items: [ grid,
		             grid2,
		             grid3
		    ]
	    });	
    
	var rightPanel = Ext.create('Ext.panel.Panel', {
		region : 'center',
		layout : 'border',
		frame : true,
		autoScroll : true,
		items : [ list1, tab] 
	});

	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		autoScroll : true,
		items : [   rightPanel ]
	});
	 
	
	tab.on('tabchange',function( tabPanel, newCard, oldCard, eOpts ){
		
		 Ext.getCmp('tabID').setValue(newCard.id);
	}) 
	
	
	
	 
	  plantStore.on('load',function(){
	      
	      plantStore.insert(0,{DEPARTCODE:'%',DEPARTNAME:'全部'})
	      plantStore.sort("DEPARTCODE","ASC");
	
	      Ext.getCmp('APPLY_PLANT').select(plantStore.getAt(0));
	
	  })
	
	  
	 
	
	Ext.getCmp('query').on('click',function(){
	
		query();
		query2();
		query3();
		
	});
	
	function query() {
		
		gridStore.load({params:{
					parName : ['ORDERID_in', 'startDate_in', 'endDate_in',
							'MENDDEPT_CODE_in', 'APPLY_PLANT_in',
							'DJ_UQ_CODE_in', 'DJ_NAME_in'],
					parType : ['s', 'da', 'da', 's', 's', 's', 's'],
					parVal : [
							Ext.getCmp('billcode').getValue(),
							Ext.util.Format.date(Ext.getCmp('begindate').getValue(), 'Y-m-d'),
							Ext.util.Format.date(Ext.getCmp('enddate').getValue(), 'Y-m-d'),
							Ext.getCmp('plant').getValue(),
							Ext.getCmp('APPLY_PLANT').getValue(),
							Ext.getCmp('djcode').getValue(),
							Ext.getCmp('djname').getValue()
					],
					proName : 'pro_dj902_applyplantcost',
					cursorName : 'RET',
					returnStr : ['total'],
					returnStrType : ['s']
		}});
	} 
	
	function query2() {
                                                   
		gridStore2.load({params:{
					parName : ['ORDERID_in', 'startDate_in', 'endDate_in',
							'MENDDEPT_CODE_in', 'APPLY_PLANT_in',
							'DJ_UQ_CODE_in', 'DJ_NAME_in'],
					parType : ['s', 'da', 'da', 's', 's', 's', 's'],
					parVal : [
							Ext.getCmp('billcode').getValue(),
							Ext.util.Format.date(Ext.getCmp('begindate').getValue(), 'Y-m-d'),
							Ext.util.Format.date(Ext.getCmp('enddate').getValue(), 'Y-m-d'),
							Ext.getCmp('plant').getValue(),
							Ext.getCmp('APPLY_PLANT').getValue(),
							Ext.getCmp('djcode').getValue(),
							Ext.getCmp('djname').getValue()
					],
					proName : 'pro_dj902_menddeptcost',
					cursorName : 'RET',
					returnStr : ['total'],
					returnStrType : ['s']
		}});
	} 
	
	
	function query3() {
		
		gridStore3.load({params:{
					parName : ['ORDERID_in', 'startDate_in', 'endDate_in',
							'MENDDEPT_CODE_in', 'APPLY_PLANT_in',
							'DJ_UQ_CODE_in', 'DJ_NAME_in'],
					parType : ['s', 'da', 'da', 's', 's', 's', 's'],
					parVal : [
							Ext.getCmp('billcode').getValue(),
							Ext.util.Format.date(Ext.getCmp('begindate').getValue(), 'Y-m-d'),
							Ext.util.Format.date(Ext.getCmp('enddate').getValue(), 'Y-m-d'),
							Ext.getCmp('plant').getValue(),
							Ext.getCmp('APPLY_PLANT').getValue(),
							Ext.getCmp('djcode').getValue(),
							Ext.getCmp('djname').getValue()
					],
					proName : 'pro_dj902_ordercost',
					cursorName : 'RET',
					returnStr : ['total'],
					returnStrType : ['s']
		}});
	} 
	
	
	
	  function winQuery(c){
   
	   	  gridStore4.load({params:{
	            parName : ['ORDERID_in'],
				parType : ['s'],
				parVal : [  gridStore3.getAt(c).get("ORDERID") ],
				proName : 'pro_dj901_costlist',
				cursorName : 'P_CUR',
				returnStr :['total'],
				returnStrType:['do']
	   }});
   	
   }
	
    Ext.getCmp('show').on('click',function(a,b,c,d){
  	
    	 winQuery(c);
    	 
  	     window.show();
   })
      
   
   
     checkPlantStore.on('load',function(){
     	
     	Ext.getCmp('plant').select(checkPlantStore.getAt(0));
     })
     
     
    billStateStore.on('load',function(){
    
    	billStateStore.insert(0,{'ORDER_STATUS':'%' ,'ORDER_STATUS_DESC': '全部'});
    	billStateStore.sort('ORDER_STATUS','ASC');
    	
    })
   
    
    
        var window = Ext.create('Ext.window.Window', {
     
		    id:'window',
		    title: "费用明细",
		    width:740,
		    height: 490,
		    plain: true,        
		    modal: true,        
		    defaults: {
		        labelWidth:90,
		        labelAlign:'right',
		        width:300,
		        style:'margin-top:8px'
		    },
		    layout:'border',
		    items: [   Ext.create('Ext.grid.Panel', {
							region : 'center',
							columnLines : true,
							width : '100%',
							autoScroll : true,
							store :gridStore4,
							dufaults:{width:120},
							features : [{
								 ftype : 'summary'
							}],
							columns : [   
									  { text : '项目名称', dataIndex : 'COST_ITEM',align : 'center',width:170},
									  { text : '费用金额', dataIndex : 'COST_MONEY',  align : 'center',width:170,
									     summaryType: 'sum',
										 summaryRenderer: function(value, summaryData, dataIndex) {
										 	  
											 return "合计："+ Ext.util.Format.number(value,'0.00') ; 
										 }
									  }, 
									  { text : '录入人', dataIndex : 'INSERT_USERNAME',  align : 'center',width:130}, 
									  { text : '录入时间', dataIndex : 'INSERTDATE',  align : 'center',width:120}
									]
						   
						})  ],
		    buttons: [
		        { text: '关闭',icon:imgpath+'/cross.gif', handler: function () { Ext.getCmp("window").hide(); } }],
		
		    closeAction: 'hide',
		    model: true
		})
    
    
     Ext.getCmp('excel').on('click',expExcel);
      function expExcel(){
      	
      	var tabID = Ext.getCmp('tabID').getValue();
      	
      	if(tabID =="grid"){
      	
      		expExcelExp();
      	}else if(tabID =="grid2"){
      	    expExcelExp2();
      	}else if(tabID =="grid3"){
      		expExcelExp3();
      	}
    }
    
 
    function expExcelExp(){
        var tableName = [ "序号", "申请厂矿编码", "申请厂矿名", "维修费用"];
		var tableKey = ['APPLY_PLANT', 'APPLY_PLANTNAME','COST_MONEY'];
		var parName = ['ORDERID_in', 'startDate_in', 'endDate_in',
							'MENDDEPT_CODE_in', 'APPLY_PLANT_in',
							'DJ_UQ_CODE_in', 'DJ_NAME_in'];
		var parType = ['s', 'da', 'da', 's', 's', 's', 's'];
		var parVal = [
				Ext.getCmp('billcode').getValue()==""?'null':Ext.getCmp('billcode').getValue(),
				Ext.util.Format.date(Ext.getCmp('begindate').getValue(), 'Y-m-d'),
				Ext.util.Format.date(Ext.getCmp('enddate').getValue(), 'Y-m-d'),
				Ext.getCmp('plant').getValue()==""?'null':Ext.getCmp('plant').getValue(),
				Ext.getCmp('APPLY_PLANT').getValue()==""?'null':Ext.getCmp('APPLY_PLANT').getValue(),
				Ext.getCmp('djcode').getValue()==""?'null':Ext.getCmp('djcode').getValue(),
				Ext.getCmp('djname').getValue()==""?'null':Ext.getCmp('djname').getValue()
		];
		var proName = 'pro_dj902_applyplantcost';
		var cursorName = 'RET';
		var returnStr = ['total'];
		var returnStrType = ['s'];
	    var returnStrName = ['合计'];
		 
		submitData("ModelExcelTotal", tableName, tableKey, parName, parType,
				parVal, proName, returnStr, returnStrType, returnStrName,
				cursorName, "total", "申请单位费用统计");
    
    }
    
    
    function expExcelExp2(){
    
        var tableName = [ "序号", "检修单位编码", "检修单位名称", "维修费用"];
		var tableKey = [ 'CODE', 'NAME','COST_MONEY'  ];
		                 
		var parName = ['ORDERID_in', 'startDate_in', 'endDate_in',
							'MENDDEPT_CODE_in', 'APPLY_PLANT_in',
							'DJ_UQ_CODE_in', 'DJ_NAME_in'];
		var parType = ['s', 'da', 'da', 's', 's', 's', 's'];
		var parVal = [
				Ext.getCmp('billcode').getValue()==""?'null':Ext.getCmp('billcode').getValue(),
				Ext.util.Format.date(Ext.getCmp('begindate').getValue(), 'Y-m-d'),
				Ext.util.Format.date(Ext.getCmp('enddate').getValue(), 'Y-m-d'),
				Ext.getCmp('plant').getValue()==""?'null':Ext.getCmp('plant').getValue(),
				Ext.getCmp('APPLY_PLANT').getValue()==""?'null':Ext.getCmp('APPLY_PLANT').getValue(),
				Ext.getCmp('djcode').getValue()==""?'null':Ext.getCmp('djcode').getValue(),
				Ext.getCmp('djname').getValue()==""?'null':Ext.getCmp('djname').getValue()
		];
		var proName = 'pro_dj902_menddeptcost';
		var cursorName = 'RET';
		var returnStr = ['total'];
		var returnStrType = ['s']
	    var returnStrName = ['合计'];
		 
		submitData("ModelExcelTotal", tableName, tableKey, parName, parType,
				parVal, proName, returnStr, returnStrType, returnStrName,
				cursorName, "title", "检修单位统计");
    
    }
    
    
    function expExcelExp3(){
    
        var tableName = [ "序号", "工单号", "电机编号", "电机名称","维修内容","费用合计"];
		var tableKey = [ 'ORDERID', 'DJ_UQ_CODE', 'DJ_NAME','MEND_CONTEXT','COST_MONEY'];
		var parName = ['ORDERID_in', 'startDate_in', 'endDate_in','MENDDEPT_CODE_in', 'APPLY_PLANT_in',
					   'DJ_UQ_CODE_in', 'DJ_NAME_in'];
		var parType = ['s', 'da', 'da', 's', 's', 's', 's'];
		var parVal = [
				Ext.getCmp('billcode').getValue()==""?'null':Ext.getCmp('billcode').getValue(),
				Ext.util.Format.date(Ext.getCmp('begindate').getValue(), 'Y-m-d'),
				Ext.util.Format.date(Ext.getCmp('enddate').getValue(), 'Y-m-d'),
				Ext.getCmp('plant').getValue()==""?'null':Ext.getCmp('plant').getValue(),
				Ext.getCmp('APPLY_PLANT').getValue()==""?'null':Ext.getCmp('APPLY_PLANT').getValue(),
				Ext.getCmp('djcode').getValue()==""?'null':Ext.getCmp('djcode').getValue(),
				Ext.getCmp('djname').getValue()==""?'null':Ext.getCmp('djname').getValue()
		];
		var proName = 'pro_dj902_ordercost';
		var cursorName = 'RET';
		var returnStr = ['total'];
		var returnStrType = ['s']
	    var returnStrName = ['合计'];
		 
		submitData("ModelExcelTotal", tableName, tableKey, parName, parType,
				parVal, proName, returnStr, returnStrType, returnStrName,
				cursorName, "total", "工单统计");
    
    }
    
    
    
     function getDate(type) {
	
	  var d = new Date();
	  var month = d.getMonth()+1;
	  if(month<10){month="0"+month;}
	  
      var date = '';
	  if(type==null){
	  	date =  d.getFullYear()+"-"+month+"-01";
	  }else{
	     var days = new Date(d.getFullYear(), d.getMonth()+1, 0);
	     date = days.getDate(); ;
	  }
	  return date;
}
})
