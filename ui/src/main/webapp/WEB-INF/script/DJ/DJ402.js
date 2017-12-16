 
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
    
     var gridStore = Ext.create('Ext.data.Store', {
     	
        storeId: 'gridStore',
        pageSize:200,
        fields : ['APPLY_DEPART','APPLY_DEPARTNAME','APPLY_ID','APPLY_PLANT','APPLY_PLANTNAME','DJ_NAME','DJ_UQ_CODE',
                  'FLAG','INSERTDATE','INSERT_USERID','INSERT_USERNAME','MEND_CONTEXT','ORDERID','ORDER_FLAG','PLAN_BEGINDATE',
                  'PLAN_ENDDATE','REC_DEPART','REC_FLAG','REC_PLANT','REC_USERID','REC_USERNAME','REMARK','MEND_STATUS','CONFIRM_FLAG'],
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
		         {id:'plant', xtype: 'textfield',fieldLabel: '厂矿',readOnly:true,
		          value:Ext.util.Cookies.get("mm.plantname")},
		          
		         {id : 'dept', xtype : 'combobox', fieldLabel : '部门',store:deptStore,editable:false, 
		          displayField: 'DEPARTNAME', valueField: 'DEPARTCODE', queryMode: 'local'},
		         
		         {id:'djcode', xtype: 'textfield',fieldLabel: '电机编号'},
		         {id:'djname', xtype: 'textfield',fieldLabel: '电机名称'},
		         {id:'context', xtype: 'textfield',fieldLabel: '检修内容',colspan: 2,width:430},
		         
		         {id:'begindate', xtype: 'datefield',fieldLabel: '起始日期',format:'Y-m-d',value:getDate()  },
		         {id:'enddate', xtype: 'datefield',fieldLabel: '结束日期',format:'Y-m-d',value:getDate("end")},
		      
		         {id : 'toPlant', xtype : 'combobox', fieldLabel : '接收厂矿',editable :false,
			        queryMode: 'local',labelAlign :'right',displayField: 'MENDDEPT_NAME', valueField: 'MENDDEPT_CODE',
			        store:toPlantStore
				  },
		          
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
			           { text : '', align : 'center',xtype: 'templatecolumn',width:60,
					    tpl: '<a style="cursor:pointer;text-decoration:underline; color:#00F">详细信息</a>',id:'show'},
					    
					  { text : '工单号', dataIndex : 'ORDERID',align : 'center',width:100},
					  { text : '电机编号', dataIndex : 'DJ_UQ_CODE',  align : 'center',width:100}, 
					  { text : '电机名称', dataIndex : 'DJ_NAME',  align : 'center',width:130}, 
					  { text : '检修内容', dataIndex : 'MEND_CONTEXT',  align : 'center',width:130}, 
					  { text : '录入人', dataIndex : 'INSERT_USERNAME',  align : 'center',width:110}, 
					  { text : '申请时间', dataIndex : 'PLAN_BEGINDATE',  align : 'center',width:120,renderer:atDate}, 
					  { text : '完成时间', dataIndex : 'PLAN_ENDDATE',  align : 'center',width:120,renderer:atDate}, 
					  { text : '备注', dataIndex : 'REMARK',  align : 'center',width:170}, 
					  { text : '接收厂矿', dataIndex : 'REC_PLANT',  align : 'center',width:130}, 
					   { text : '确认状态', dataIndex : 'CONFIRM_FLAG',  align : 'center',width:70},
					  { text : '接收状态', dataIndex : 'REC_FLAG',  align : 'center',width:70},
					  { text : '检修状态', dataIndex : 'MEND_STATUS',  align : 'center',width:70}   
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
	  	                       'context_in','begindate_in','enddate_in','toPlantcode_in','confirm_flag_in'],
					parType : ['s','s','s','s','s','da','da','s','s'],
					parVal : [ 
					            Ext.util.Cookies.get("mm.plantcode"),
					            Ext.getCmp('dept').getValue(),
					            Ext.getCmp('djcode').getValue(),
					            Ext.getCmp('djname').getValue(),
					            Ext.getCmp('context').getValue(),
					            Ext.util.Format.date(Ext.getCmp('begindate').getValue(),'Y-m-d') ,
					            Ext.util.Format.date(Ext.getCmp('enddate').getValue(),'Y-m-d') ,
					            Ext.getCmp('toPlant').getValue(),
								'%'
					],
					proName : 'pro_dj402_applylist',
					cursorName : 'RET'
	  	   };
	  	   Ext.apply(store.proxy.extraParams, params);
	})
	
	Ext.getCmp('query').on('click',query);
	
	
	function query(){ gridStore.load(); } 
	
	function atDate(value,metaData,record){
		return  Ext.util.Format.date(value,'Y-m-d');
	}
	
	
    Ext.getCmp('show').on('click',function(a,b,c,d){
  	
  	  var returnVal =  window.showModalDialog(APP+"/page/DJ/DJ402show.jsp?apply_id="+gridStore.getAt(c).get("APPLY_ID"), window, "dialogWidth=1200px;dialogHeight=550px");
      if(returnVal!=null){
          query();
      }
   })
  
   
    
    
     deptStore.load({params:{
                    parName : ["A_PLANTCODE"],
		 			parType : ["s"],
					parVal : [Ext.util.Cookies.get("mm.plantcode")],
					proName : 'PRO_MM_DEPART',
					cursorName : 'RET'
         }});

         
     deptStore.on('load',function(){
     
     	  deptStore.insert(0,{'DEPARTCODE':'%','DEPARTNAME':'全部'});
	  	  deptStore.sort('DEPARTCODE', 'ASC');
	  	  
	  	  Ext.getCmp('dept').select(deptStore.getAt(0));
	  	  
	  	  query();
     })
     
     toPlantStore.on('load',function(){
     
     	  toPlantStore.insert(0,{'MENDDEPT_CODE':'%','MENDDEPT_NAME':'全部'});
	  	  toPlantStore.sort('MENDDEPT_CODE', 'ASC');
	  	  
	  	  Ext.getCmp('toPlant').select(toPlantStore.getAt(0));
     })
         
     Ext.getCmp('excel').on('click',expExcel);
      function expExcel(){
    	
		var tableName = [ "序号", "工单号", "电机编号", "电机名称", "检修内容", "录入人", "计划开始时间",
			                  "计划完成时间", "备注", "接收厂矿", "接收状态","确认状态","检修状态"];
		var tableKey = [ 'ORDERID', 'DJ_UQ_CODE', 'DJ_NAME','MEND_CONTEXT', 'INSERT_USERNAME', 
		                 'PLAN_BEGINDATE', 'PLAN_ENDDATE','REMARK', 'REC_PLANT', 'REC_FLAG','CONFIRM_FLAG','MEND_STATUS'];
		var parName = ['plantcode_in','departcode_in','djcode_in','djname_in',
	  	               'context_in','begindate_in','enddate_in','toPlantcode_in','confirm_flag_in'];
		var parType = ['s','s','s','s','s','da','da','s','s'];
		var parVal = [  Ext.util.Cookies.get("mm.plantcode"),
			            Ext.getCmp('dept').getValue(),
			            Ext.getCmp('djcode').getValue(),
			            Ext.getCmp('djname').getValue(),
			            Ext.getCmp('context').getValue(),
			            Ext.util.Format.date(Ext.getCmp('begindate').getValue(),'Y-m-d') ,
			            Ext.util.Format.date(Ext.getCmp('enddate').getValue(),'Y-m-d') ,
		                Ext.getCmp('toPlant').getValue(),'%'
		];
		var proName = 'pro_dj402_applylist';
		var cursorName = 'RET';
		 
		var returnStr = [];
		var returnStrType = [];
	    var returnStrName = [];
		 
		submitData("ModelExcelTotal", tableName, tableKey, parName, parType,
				parVal, proName, returnStr, returnStrType, returnStrName,
				cursorName, "title", "厂矿工单申请查询");
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
