 
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
				async : true,
				url : APP + '/ModelSelect',
				actionMethods : {
					read : 'POST'
				},
				reader : {
					type : 'json',
					root : 'list'
				},
				extraParams :{
				    parName : ['usercode_in'],
					parType : ['s'],
					parVal : [ Ext.util.Cookies.get("mm.userid") ],
					proName : 'pro_dj901_orderstatu_end',
					cursorName : 'P_CUR'
				}
			}
	});	
	
	 
	
	
	var checkPlantStore = Ext.create("Ext.data.Store", {
			autoLoad : false,
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
				  
				}
			}
	});	


     var gridStore = Ext.create('Ext.data.Store', {
     	
        storeId: 'gridStore',
        pageSize:200,
        fields : ['ORDERID','APPLY_ID','DJ_UQ_CODE','DJ_NAME','MEND_CONTEXT','PLANTCODE',
                  'DEPARTCODE','MENDDEPT_CODE','MENDDEPT_NAME','MEND_USERID','MEND_USERNAME','PLAN_BEGINDATE','PLAN_ENDDATE','INSERTDATE',
                  'INSERT_USERID','INSERT_USERNAME','ACT_BEGINDATE','ACT_ENDDATE','EXA_FLAG','EXA_USERID','EXA_USERNAME','EXA_RESULT','ORDER_STATUS'],
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
        pageSize:200,
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
		          
		          {id : 'state', xtype : 'combobox', fieldLabel : '工单状态',
		          store:billStateStore,editable:false,
			      displayField: 'ORDER_STATUS_DESC', valueField: 'ORDER_STATUS', queryMode: 'local'},
			      
		          {id : 'plant', xtype : 'combobox', fieldLabel : '检修单位',store:checkPlantStore,editable:false,
			      displayField: 'MENDDEPT_NAME', valueField: 'MENDDEPT_CODE', queryMode: 'local'},
			      
		         {id:'djcode', xtype: 'textfield',fieldLabel: '电机编号'},
		         {id:'djname', xtype: 'textfield',fieldLabel: '电机名称'},
		          
		         {colspan: 3,layout:'column',border:0,bodyStyle:'background:none',
		         items:[
		             {xtype:'button',text:'查询',id:'query',margin:'0px 0px 0px 10px',icon:imgpath+'/a1.gif'},
				     {xtype:'button',text:'导出到Excel',id:'excel',margin:'0px 0px 0px 10px',icon:imgpath+'/311.gif'}
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
			store :gridStore,
			dufaults:{width:120},
			columns : [
			
			          { text : '录入费用', align : 'center',xtype: 'templatecolumn',width:60,
					    tpl: '<a style="cursor:pointer;text-decoration:underline; color:#00F">录入</a>',id:'input'},
					  { text : '工单号', dataIndex : 'ORDERID',align : 'center',width:100},
					  { text : '检修单位名', dataIndex : 'MENDDEPT_NAME',  align : 'center',width:170}, 
					  { text : '检修内容', dataIndex : 'MEND_CONTEXT',  align : 'center',width:160}, 
					  { text : '录入人', dataIndex : 'INSERT_USERNAME',  align : 'center',width:130}, 
					  { text : '录入时间', dataIndex : 'INSERTDATE',  align : 'center',width:120}, 
					  { text : '电机编号', dataIndex : 'DJ_UQ_CODE',  align : 'center',width:110}, 
					  { text : '电机名称', dataIndex : 'DJ_NAME',  align : 'center',width:110}
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
			autoScroll : true,
			store :gridStore2,
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
					  { text : '录入时间', dataIndex : 'INSERTDATE',  align : 'center',width:120}, 
					  
					  { text : '删除', align : 'center',xtype: 'templatecolumn',width:60,
					    tpl: '<a style="cursor:pointer;text-decoration:underline; color:#00F">删除</a>',id:'delete'}
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
		items : [   rightPanel ]
	});
	 
	                                               
	 gridStore.on('beforeload', function (store, options) {
	   	    var params = {
	  	            parName : ['ORDERID_in','startDate','endDate','ORDER_STATUS_in','MENDDEPT_CODE_in','DJ_UQ_CODE_in','DJ_NAME'],
					parType : ['s','da','da','s','s','s','s'],
					parVal : [  Ext.getCmp('billcode').getValue(),
					            Ext.util.Format.date(Ext.getCmp('begindate').getValue(),'Y-m-d') ,
					            Ext.util.Format.date(Ext.getCmp('enddate').getValue(),'Y-m-d') ,
					            Ext.getCmp('state').getValue(),
					            Ext.getCmp('plant').getValue(),
					            Ext.getCmp('djcode').getValue(),
					            Ext.getCmp('djname').getValue()
					],
					proName : 'pro_dj901_selectorderlist',
					cursorName : 'RET'
	  	   };
	  	   Ext.apply(store.proxy.extraParams, params);
	})
	
	Ext.getCmp('query').on('click',query);
	
	
	function query(){ gridStore.load(); } 
	
 
	
	
    Ext.getCmp('input').on('click',function(a,b,c,d){
  	
       Ext.getCmp('ORDERID').setValue(gridStore.getAt(c).get("ORDERID"));
       
       winQuery();
       
  	   window.show();
   })
      
   function winQuery(){
   
	   	  gridStore2.load({params:{
	            parName : ['ORDERID_in'],
				parType : ['s'],
				parVal : [ Ext.getCmp('ORDERID').getValue() ],
				proName : 'pro_dj901_costlist',
				cursorName : 'P_CUR',
				returnStr :['total'],
				returnStrType:['do']
	   }});
   	
   }
   
   
     checkPlantStore.on('load',function(){
     	
        checkPlantStore.insert(0,{'MENDDEPT_CODE':'%' ,'MENDDEPT_NAME': '全部'});
    	checkPlantStore.sort('MENDDEPT_CODE','ASC');
    	
     	Ext.getCmp('plant').select(checkPlantStore.getAt(0));
     })
     
     
    billStateStore.on('load',function(){
    	
    	Ext.getCmp('state').select(billStateStore.getAt(0));
    	
    	checkPlantStore.load({params:{
	            parName : ['usercode_in','order_status_in'],
				parType : ['s','s'],
				parVal : [Ext.util.Cookies.get("mm.userid"),
				          Ext.getCmp('state').getValue()
				],
				proName : 'pro_dj602_menddept_power',
				cursorName : 'P_CUR'
    	}});
    	
    })
    
    
    
    Ext.getCmp('delete').on('click',function(a,b,c,d){
    
    	 Ext.Ajax.request({
			 	
                    url: APP+"/ModelChange",
                    method: 'POST',
                    async: false,
                    params: {
                        parName : ['ID_in'],
						parType : ['s'],
						parVal : [  gridStore2.getAt(c).get("ID") ],
						proName : 'pro_dj901_deletecost',
						returnStr : [ 'RET' ],
						returnStrType : [ 's' ] 
					},
                    success: function (response, options) {
                    	var resp = Ext.decode(response.responseText);
                    	
                    		if(resp=="Success"){
                    			 
		                    	Ext.example.msg("提示",'删除成功');
		                    	 winQuery();
		                    	
                    		}else{
                    		    Ext.example.msg("提示",'删除失败');
                    		}
            			 
                    }
                })
    })
    
    
    var window = Ext.create('Ext.window.Window', {
     
		    id:'window',
		    title: "录入工单费用",
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
		    items: [  
		           {bodyStyle:'background:none',border:0, region : 'north',
		            defaults : {
						labelAlign:'right',
						labelWidth:60
					},
		            layout: {
				        type: 'table',
				        columns: 3
				    },
		            items:[
		                {id:'ORDERID', xtype: 'textfield',fieldLabel: '工单号',colspan: 3,readOnly:true},
		           		{id:'COST_ITEM', xtype: 'textfield',fieldLabel: '费用项目'},
		           		{id:'COST_MONEY', xtype: 'numberfield',fieldLabel: '费用'},
		           		
		           		{xtype:'button',text:'录入',id:'saveX',margin:'0px 0px 0px 10px',icon:imgpath+'/a1.gif'}
		           ]},
		           grid2
		    ],
		    buttons: [
		        { text: '取 消',icon:imgpath+'/cross.gif', handler: function () { Ext.getCmp("window").hide(); } }],
		
		    closeAction: 'hide',
		    model: true
		})
   
		
		 Ext.getCmp('saveX').on('click',function(a,b,c,d){
    
        	Ext.Ajax.request({
			 	
                    url: APP+"/ModelChange",
                    method: 'POST',
                    async: false,
                    params: {
                        parName : ['ORDERID_in','COST_ITEM_in','COST_MONEY_in','INSERT_USERID_in','INSERT_USERNAME_in'],
						parType : ['s','s','s','s','s'],
						parVal : [ 
                                   Ext.getCmp('ORDERID').getValue(),
                                   Ext.getCmp('COST_ITEM').getValue(),
                                   Ext.getCmp('COST_MONEY').getValue(),
                                   Ext.util.Cookies.get("mm.userid"),
						           Ext.util.Cookies.get("mm.username")
						],
						proName : 'pro_dj901_inputcost',
						returnStr : [ 'RET' ],
						returnStrType : [ 's' ] 
					},
                    success: function (response, options) {
                    	var resp = Ext.decode(response.responseText);
                    	
                    		if(resp=="Success"){
                    			
		                    	Ext.example.msg("提示",'保存成功');
		                    	 winQuery();
		                    	
                    		}else{
                    		    Ext.example.msg("提示",'保存失败');
                    		}
            			 
                    }
                })
    })
                   

     Ext.getCmp('excel').on('click',expExcel);
      function expExcel(){
    	
		var tableName = [ "序号", "工单号", "检修单位名","维修内容", '录入人', "录入时间", "电机编号",'电机名称'];
		var tableKey = [ 'ORDERID', 'MENDDEPT_NAME', 'MEND_CONTEXT','INSERT_USERNAME', 
		                 'INSERTDATE','DJ_UQ_CODE','DJ_NAME'];
		                 
		var parName = ['ORDERID_in','startDate','endDate','ORDER_STATUS_in','MENDDEPT_CODE_in','DJ_UQ_CODE_in','DJ_NAME'];
		var parType = ['s','da','da','s','s','s','s'];
		var	parVal = [  Ext.getCmp('billcode').getValue()==""?'null':Ext.getCmp('billcode').getValue(),
					            Ext.util.Format.date(Ext.getCmp('begindate').getValue(),'Y-m-d') ,
					            Ext.util.Format.date(Ext.getCmp('enddate').getValue(),'Y-m-d') ,
					            Ext.getCmp('state').getValue()==""?'null':Ext.getCmp('state').getValue(),
					            Ext.getCmp('plant').getValue()==""?'null':Ext.getCmp('plant').getValue(),
					            Ext.getCmp('djcode').getValue()==""?'null':Ext.getCmp('djcode').getValue(),
					            Ext.getCmp('djname').getValue()==""?'null':Ext.getCmp('djname').getValue()
					];
		var proName = 'pro_dj901_selectorderlist';
		var cursorName = 'RET';
		var returnStr = [];
		var returnStrType = [];
	    var returnStrName = [];
		 
		submitData("ModelExcelTotal", tableName, tableKey, parName, parType,
				parVal, proName, returnStr, returnStrType, returnStrName,
				cursorName, "title", "工单维修费用管理");
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
