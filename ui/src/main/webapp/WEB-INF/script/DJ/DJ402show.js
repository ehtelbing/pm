 
var apply_id= '';
if(location.href.split('?')[1]!=null){ 
	apply_id = Ext.urlDecode(location.href.split('?')[1]).apply_id;
}
 
Ext.onReady(function() {
        
	 
	 var gridStore = Ext.create('Ext.data.Store', {
     	
        storeId: 'gridStore',
        pageSize:100,
        fields : ['ID', 'BYQ_UNIQUE_CODE', 'OP_TYPE', 'OP_CONTEXT',
						'OP_DATE', 'OP_USERID', 'OP_USERNAME', 'REMARK'],
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
        pageSize:100,
        fields : ['ID', 'APPLY_ID', 'MATERIALCODE', 'MATERIALNAME',
						'ETALON', 'MAT_CL', 'UNIT', 'AMOUNT','F_PRICE','KC_ID'],
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
    
    
  
     var plantStore = Ext.create("Ext.data.Store", {
			autoLoad : true,
			storeId : 'plantStore',
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
	
	var typeStore = Ext.create("Ext.data.Store", {
			autoLoad : true,
			storeId : 'typeStore',
			fields : [ 'CODE', 'NAME' ],
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
					proName : 'pro_mm_itype',
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
					labelWidth:80
		      },
		      width:800,
		      layout: {
		        type: 'table',
		        columns: 3
		      },
		      items:[
		          
		         {id:'plant', xtype: 'textfield',fieldLabel: '厂矿',readOnly:true,value:Ext.util.Cookies.get("mm.plantname")},
		         {id:'dept', xtype: 'textfield',fieldLabel: '部门',readOnly:true,value:Ext.util.Cookies.get("mm.departname")},
		         {id:'personnel', xtype: 'textfield',fieldLabel: '录入人',readOnly:true,value:Ext.util.Cookies.get("mm.username")},
		          
		         {id:'ORDERID', xtype: 'textfield',fieldLabel: '工单号'},
		         {id:'DJ_CODE', xtype: 'textfield',fieldLabel: '电机编号'},
		         
		         {id:'DJ_NAME', xtype: 'textfield',fieldLabel: '电机名称'},
		         {id:'DJ_UQ_CODE', xtype: 'textfield',fieldLabel: '唯一编号'},
		       {
						xtype : 'button',
						text : '详细',
						
						handler : Select,
						colspan: 2
					},
		         {id:'MEND_CONTEXT', xtype: 'textarea',fieldLabel: '问题描述',colspan: 3,width:755},
		        
		         {width:260,border:0,bodyStyle:'background:none',layout:'column',defaults:{labelAlign:'right',labelWidth:15},
					 items:[
		             {id:'PLAN_BEGINDATE', xtype: 'datefield',fieldLabel: '申请时间',format:'Y-m-d',labelWidth:80,width:180,value:new Date()},
		         
			         { xtype: 'numberfield', id: 'b-hour', fieldLabel: '', minValue: 0 ,maxValue:24,width:40,value:00},
			         { xtype: 'numberfield', id: 'b-mm', fieldLabel: '', minValue: 0 ,maxValue:60,width:40,value:00 }
		         ]},
		         
		         {width:260,border:0,bodyStyle:'background:none',layout:'column',defaults:{labelAlign:'right',labelWidth:15},
					 items:[
		             {id:'PLAN_ENDDATE', xtype: 'datefield',fieldLabel: '完成时间',format:'Y-m-d',labelWidth:80,width:180,value:new Date()},
		         
			         { xtype: 'numberfield', id: 'e-hour', fieldLabel: '', minValue: 0 ,maxValue:24,width:40,value:00 },
			         { xtype: 'numberfield', id: 'e-mm', fieldLabel: '', minValue: 0 ,maxValue:60,width:40,value:00 }
		         ]},
		         
		          {id : 'APPLY_PLANT', xtype : 'combobox', fieldLabel : '接收厂矿',editable :false,
			        queryMode: 'local',labelAlign :'right',displayField: 'MENDDEPT_NAME', valueField: 'MENDDEPT_CODE',
			        store:plantStore
				  },
				 
				 {id:'REMARK', xtype: 'textarea',fieldLabel: '备注说明',colspan: 3,width:755}
		     ] }
		]
	});
	
 

	var grid = Ext.create('Ext.grid.Panel', {
			id : 'grid',
			region : 'center',
			columnLines : true,
			title:'附带物料列表',
			width : '100%',
			autoScroll : true,
			store :gridStore2,
			dufaults:{width:120},
			columns : [ 
			          { xtype:'rownumberer',align : 'center'},
			            
					  { text : '物料编码', dataIndex : 'OP_DATE',align : 'center',flex:1},
					  { text : '物料名称', dataIndex : 'OP_USERNAME',  align : 'center',flex:1}, 
					  { text : '规格型号', dataIndex : 'OP_TYPE', align : 'center',flex:1},
					  { text : '材质', dataIndex : 'OP_CONTEXT', align : 'center',flex:1},
					  { text : '计量单位', dataIndex : 'REMARK', align : 'center',flex:1},
					  
					  { text : '单价', dataIndex : 'REMARK', align : 'center',flex:1},
					  { text : '数量', dataIndex : 'REMARK', align : 'center',flex:1},
					  { text : '', align : 'center',xtype: 'templatecolumn', width:60,
					    tpl: '<a style="cursor:pointer;text-decoration:underline; color:#00F">删除</a>',id:'delete'}
					 
					  
					],
		   bbar: ['->',{ xtype: 'pagingtoolbar',
	                 dock: 'bottom',
	                 displayInfo: true,
	                 displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
	                 emptyMsg: '没有记录',
	                 store: 'gridStore'  } 
           ]
		});
	
		
	 var list2 = Ext.create('Ext.panel.Panel', {
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
					labelWidth:80
					 
		      },
		      layout: {
		        type: 'table',
		        columns: 4
		      },
		      items:[
		          {id : 'matType', xtype : 'combobox', fieldLabel : '物资分类',editable :false, store:typeStore,
			       displayField: 'CODE', valueField: 'NAME', queryMode: 'local', labelAlign :'right'
				  },
		          
		         {id:'matCode', xtype: 'textfield',fieldLabel: '物料编码',readOnly:true,
		          value:Ext.util.Cookies.get("mm.departname")},
		         {id:'matName', xtype: 'textfield',fieldLabel: '物料名称',readOnly:true,
		          value:Ext.util.Cookies.get("mm.username")},
		          
		         {xtype:'button',text:'库存查询',id:'kcQuery',margin:'0px 0px 0px 10px',icon:imgpath+'/a1.gif'}
		     ] }
		]
	});
	
	  
	 
		
	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		autoScroll : true,
		items : [ list1,grid ]
	});
 
	
	
	tab1Query();
	
	function tab1Query(){
	  gridStore2.load({params:{
	            parName : ['applyid_in'],
				parType : ['s'],
				parVal : [ apply_id  ],
				proName : 'pro_dj401_applymatlist',
				cursorName : 'RET'
	  }});
	}
	
	
	
	typeStore.on('load',function(){
		Ext.getCmp('matType').select(typeStore.getAt(0));
	});
	
	plantStore.on('load',function(){
		Ext.getCmp('APPLY_PLANT').select(plantStore.getAt(0));
	});
	
	
	Ext.getCmp('kcQuery').on('click',function(){
	
		gridStore3.load({params:{
	            plantcode :  Ext.util.Cookies.get("mm.plantcode")
	      }});
	})
	
	
	
	loadForm();
	
	function loadForm(){
	
	    Ext.Ajax.request({
			 	
                    url: APP+"/ModelSelect",
                    method: 'POST',
                    params: {
                        parName : ['applyid_in'],
						parType : ['s'],
						parVal : [ apply_id  ],
						proName : 'pro_dj401_applymes',
					    cursorName : 'RET'
					},
                    success: function (response, options) {
                    	var resp = Ext.decode(response.responseText);
                    	 
                    	if(resp.list.length>0){
							Ext.getCmp('personnel').setValue(resp.list[0].INSERT_USERNAME);
	                    	Ext.getCmp('plant').setValue(resp.list[0].APPLY_PLANTNAME);
	                    	Ext.getCmp('dept').setValue(resp.list[0].APPLY_DEPARTNAME);
						
	                    	Ext.getCmp('ORDERID').setValue(resp.list[0].ORDERID);
	                    	Ext.getCmp('DJ_UQ_CODE').setValue(resp.list[0].DJ_UQ_CODE);
	                    	Ext.getCmp('DJ_NAME').setValue(resp.list[0].DJ_NAME);
	                    	Ext.getCmp('MEND_CONTEXT').setValue(resp.list[0].MEND_CONTEXT);
	                    	Ext.getCmp('DJ_CODE').setValue(resp.list[0].DJ_CODE);
	                    	
	                    	
	                    	var startD = resp.list[0].PLAN_BEGINDATE.split(" ");
	                    	var startT = startD[1].split(":");
	                    	
	                    	Ext.getCmp('PLAN_BEGINDATE').setValue(startD[0]);
	                    	Ext.getCmp('b-hour').setValue(startT[0]);
	                    	Ext.getCmp('b-mm').setValue(startT[1]);
	                    	
	                    	var endD = resp.list[0].PLAN_ENDDATE.split(" ");
	                    	var endT = endD[1].split(":");
	                    	
	                    	Ext.getCmp('PLAN_ENDDATE').setValue(endD[0]);
	                    	Ext.getCmp('e-hour').setValue(endT[0]);
	                    	Ext.getCmp('e-hour').setValue(endT[1]);
	                    	
	                    	Ext.getCmp('APPLY_PLANT').select(0);
	                    	Ext.getCmp('REMARK').setValue(resp.list[0].REMARK);
                    	} 
                    }
                });
	}
	
	function Select(){
	var str=window.showModalDialog(APP+"/page/DJ/DJ202_menu.jsp?djcode="+Ext.getCmp('DJ_UQ_CODE').getValue(), '',"dialogHeight:350px;dialogWidth:900px;minimize:yes;maximize:yes;");
}	

});
