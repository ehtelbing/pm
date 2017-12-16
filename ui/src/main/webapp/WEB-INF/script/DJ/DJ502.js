 
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
	
	var teamStore = Ext.create("Ext.data.Store", {
			autoLoad : true,
			storeId : 'teamStore',
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
				    parName : ['usercode_in'],
					parType : ['s'],
					parVal : [Ext.util.Cookies.get("mm.userid")],
					proName : 'pro_dj501_menddept_user',
					cursorName : 'P_CUR'
				}
			}
	});	
	
	
     var gridStore = Ext.create('Ext.data.Store', {
     	
        storeId: 'gridStore',
        pageSize:200,
        fields : ['APPLY_DEPART','APPLY_DEPARTNAME','APPLY_ID','APPLY_PLANT','APPLY_PLANTNAME','DJ_NAME','DJ_UQ_CODE',
                  'FLAG','INSERTDATE','INSERT_USERID','INSERT_USERNAME','MEND_CONTEXT','ORDERID','ORDER_FLAG','PLAN_BEGINDATE',
                  'PLAN_ENDDATE','REC_DEPART','REC_FLAG','REC_PLANT','REC_USERID','REC_USERNAME','REMARK'],
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
		          {id : 'plant', xtype : 'combobox', fieldLabel : '申请厂矿',store:plantStore,editable:false,
			      displayField: 'DEPARTNAME', valueField: 'DEPARTCODE', queryMode: 'local'},
		          
		         {id : 'dept', xtype : 'combobox', fieldLabel : '申请部门',store:deptStore,editable:false, 
		          displayField: 'DEPARTNAME', valueField: 'DEPARTCODE', queryMode: 'local'},
		         
		         {id:'djcode', xtype: 'textfield',fieldLabel: '电机编号'},
		         {id:'djname', xtype: 'textfield',fieldLabel: '电机名称'},
		          
		         {id : 'checkPlant', xtype : 'combobox', fieldLabel : '检修厂矿',
		          store:[[Ext.util.Cookies.get("mm.plantcode"),
		                 Ext.util.Cookies.get("mm.plantname")]],editable:false, 
			      displayField: 'MENDDEPT_NAME', valueField: 'MENDDEPT_CODE', queryMode: 'local'},
		       
			     {id : 'state', xtype : 'combobox', fieldLabel : '接收状态',store:[[0,"未接收"],[1,"已接收"]],editable:false,
			      displayField: 'DEPARTNAME', valueField: 'DEPARTCODE', queryMode: 'local',value:0},
		       
			      
		         
		         {id:'begindate', xtype: 'datefield',fieldLabel: '起始日期',format:'Y-m-d',value:getDate()  },
		         {id:'enddate', xtype: 'datefield',fieldLabel: '结束日期',format:'Y-m-d',value:getDate("end")},
		      
		          
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
			selType: 'checkboxmodel',
			columns : [ 
					  { text : '申请工单号', dataIndex : 'ORDERID',align : 'center',width:100},
					  { text : '电机编号', dataIndex : 'DJ_UQ_CODE',  align : 'center',width:100}, 
					  { text : '电机名称', dataIndex : 'DJ_NAME',  align : 'center',width:130}, 
					  { text : '维修内容', dataIndex : 'MEND_CONTEXT',  align : 'center',width:130}, 
					  { text : '申请厂矿', dataIndex : 'APPLY_PLANTNAME',  align : 'center',width:110}, 
					  { text : '申请部门', dataIndex : 'APPLY_DEPARTNAME',  align : 'center',width:110}, 
					  { text : '录入时间', dataIndex : 'INSERTDATE',  align : 'center',width:130}, 
					  { text : '备注', dataIndex : 'REMARK',  align : 'center',width:170}, 
					  
					  { text : '', align : 'center',xtype: 'templatecolumn',width:60,
					    tpl: '<a style="cursor:pointer;text-decoration:underline; color:#00F">详细信息</a>',id:'show'}
					  
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
		items : [   rightPanel ]
	});
	 
	
	
	 gridStore.on('beforeload', function (store, options) {
	   	    var params = {
	  	            parName : ['plantcode_in','departcode_in','djcode_in','djname_in',
	  	                       'jxplantcode_in','recflag_in','begindate_in','enddate_in'],
					parType : ['s','s','s','s','s','s','da','da'],
					parVal : [ 
					            Ext.getCmp('plant').getValue(),
					            Ext.getCmp('dept').getValue(),
					            Ext.getCmp('djcode').getValue(),
					            Ext.getCmp('djname').getValue(),
					            Ext.getCmp('checkPlant').getValue(),
					            Ext.getCmp('state').getValue(),
					            Ext.util.Format.date(Ext.getCmp('begindate').getValue(),'Y-m-d') ,
					            Ext.util.Format.date(Ext.getCmp('enddate').getValue(),'Y-m-d') 
					],
					proName : 'pro_dj501_selectapplylist_user',
					cursorName : 'RET'
	  	   };
	  	   Ext.apply(store.proxy.extraParams, params);
	})
	
	Ext.getCmp('query').on('click',query);
	
	
	function query(){ gridStore.load(); } 
	
	Ext.getCmp('plant').on('select',function(){
     
     	  deptStore.load({params:{
                    parName : ["A_PLANTCODE"],
		 			parType : ["s"],
					parVal : [ Ext.getCmp('plant').getValue() ],
					proName : 'PRO_MM_DEPART',
					cursorName : 'RET'
         }});
     });
	
	
    Ext.getCmp('show').on('click',function(a,b,c,d){
  	
  	  var returnVal =  window.showModalDialog(APP+"/page/DJ/DJ402show.jsp?apply_id="+gridStore.getAt(c).get("APPLY_ID"), window, "dialogWidth=1200px;dialogHeight=550px");
      if(returnVal!=null){
          query();
      }
   })
  
   
    
     plantStore.on('load',function(){
      
	      plantStore.insert(0,{DEPARTCODE:'%',DEPARTNAME:'全部'})
	      plantStore.sort("DEPARTCODE","ASC");
	
	      Ext.getCmp('plant').select(plantStore.getAt(0));

	      deptStore.load({params:{
                    parName : ["A_PLANTCODE"],
		 			parType : ["s"],
					parVal : [ Ext.getCmp('plant').getValue() ],
					proName : 'PRO_MM_DEPART',
					cursorName : 'RET'
         }});
     })
    
         
     deptStore.on('load',function(){
     
     	  deptStore.insert(0,{'DEPARTCODE':'%','DEPARTNAME':'全部'});
	  	  deptStore.sort('DEPARTCODE', 'ASC');
	  	  
	  	  Ext.getCmp('dept').select(deptStore.getAt(0));
	  	  
	  	  query();
     })
     
      Ext.getCmp('checkPlant').select(Ext.getCmp('checkPlant').getStore().getAt(0));
      
     
     
     Ext.getCmp('state').on('select',function(){
     
     	if(Ext.getCmp('state').getValue()=="0"){
     	
     		Ext.getCmp('receive').setDisabled(false);
     	}else{
     		Ext.getCmp('receive').setDisabled(true);
     	}
     })
         


     Ext.getCmp('excel').on('click',expExcel);
      function expExcel(){
    	
		var tableName = [ "序号", "申请工单号", "电机编号", "电机名称", "检修内容",'申请厂矿','申请部门', "录入时间", "备注"];
		var tableKey = [ 'ORDERID', 'DJ_UQ_CODE', 'DJ_NAME','MEND_CONTEXT', 'APPLY_PLANTNAME','APPLY_DEPARTNAME','INSERTDATE','REMARK'];
		var parName = ['plantcode_in','departcode_in','djcode_in','djname_in','jxplantcode_in','recflag_in','begindate_in','enddate_in'];
		var parType = ['s','s','s','s','s','s','da','da'];
		var parVal = [ 
		            Ext.getCmp('plant').getValue(),
		            Ext.getCmp('dept').getValue(),
		            Ext.getCmp('djcode').getValue(),
		            Ext.getCmp('djname').getValue(),
		            Ext.getCmp('checkPlant').getValue(),
		            Ext.getCmp('state').getValue(),
		            Ext.util.Format.date(Ext.getCmp('begindate').getValue(),'Y-m-d') ,
		            Ext.util.Format.date(Ext.getCmp('enddate').getValue(),'Y-m-d') 
		];
		var proName = 'pro_dj501_selectapplylist_user';
		var cursorName = 'RET'
		var returnStr = [];
		var returnStrType = [];
	    var returnStrName = [];
		 
		submitData("ModelExcelTotal", tableName, tableKey, parName, parType,
				parVal, proName, returnStr, returnStrType, returnStrName,
				cursorName, "title", "检修申请查询");
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
