 
var orderId= '';
if(location.href.split('?')[1]!=null){ 
	orderId = Ext.urlDecode(location.href.split('?')[1]).orderId;
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
        fields: ['ID', 'ORDERID','MATERIALCODE','MATERIALNAME','ETALON','MAT_CL','UNIT',
                 'F_PRICE','PLAN_AMOUNT','ACT_AMOUNT','F_PLAN_MONEY','F_ACT_MONEY','ET_ID','SOURCE','INSERTDATE'],
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
					labelWidth:70,
					width:200
		      },
		      layout: {
		        type: 'table',
		        columns: 5
		      },
		      items:[   
		         {id:'billcode', xtype: 'textfield',fieldLabel: '工单号'},
				 {id:'dj_name', xtype: 'textfield',fieldLabel: '电机名称'},
				 {id:'dj_type', xtype: 'textfield',fieldLabel: '电机型号'},
				 {id:'dj_vol', xtype: 'textfield',fieldLabel: '容量'},
				 {id:'dj_v', xtype: 'textfield',fieldLabel: '电压'},
			     {id:'dj_plantname', xtype: 'textfield',fieldLabel: '送修单位'},
				 {id:'dj_departname', xtype: 'textfield',fieldLabel: '送修部门'},
				 {id:'dj_menddept', xtype: 'textfield',fieldLabel: '检修班组'},
				 {id:'dj_insertdate', xtype: 'textfield',fieldLabel: '入场时间'}
		     ] }
		]
	});
	Ext.getCmp('billcode').setValue(orderId); 
	 Ext.Ajax.request({
                url: APP+"/ModelSelect",
                method: 'POST',
                params: {
                    parName: ['ORDERID_in'],
                    parType: ["s"],
                    parVal: [  orderId  ],
                    proName: "pro_dj601_ordermessage",
                    cursorName:'ret'
                },
                success: function (response, options) {
                    var resp = Ext.decode(response.responseText).list;
                    
                      if(resp.length>0){
						Ext.getCmp('dj_vol').setValue(resp[0].DJ_VOL);
						Ext.getCmp('dj_menddept').setValue(resp[0].MENDDEPT_NAME);
						Ext.getCmp('dj_v').setValue(resp[0].DJ_V);
						Ext.getCmp('dj_plantname').setValue(resp[0].LOC_PLANTNAME);
						Ext.getCmp('dj_departname').setValue(resp[0].APPLY_DEPARTNAME);
						Ext.getCmp('dj_name').setValue(resp[0].DJ_NAME);
						Ext.getCmp('dj_type').setValue(resp[0].DJ_TYPE);
						Ext.getCmp('dj_insertdate').setValue(resp[0].INSERTDATE);
                      }
                }   	 
    });
	 var grid = Ext.create('Ext.grid.Panel', {
			id : 'grid',
			region : 'center',
			columnLines : true,
			width : '100%',
			autoScroll : true,
			store :gridStore,
			dufaults:{width:120},
			columns : [  {
							text : '序号',
							align : 'center',
							dataIndex : 'NUMBER',
							xtype : 'rownumberer',
							width : 50
						},
					  { text : '物料编码', dataIndex : 'MATERIALCODE',  align : 'center',width:80}, 
					  { text : '物料名称', dataIndex : 'MATERIALNAME', align : 'center',width:120}, 
					  { text : '规格型号', dataIndex : 'ETALON', align : 'center',width:100}, 
					  { text : '材质', dataIndex : 'MAT_CL', align : 'center',width:100}, 
					  { text : '计量单位', dataIndex : 'UNIT', align : 'center',width:80}, 
					  { text : '单价', dataIndex : 'F_PRICE', align : 'center',width:140},
					  { text : '计划数量', dataIndex : 'PLAN_AMOUNT', align : 'center',width:80},
					  { text : '实际数量', dataIndex : 'ACT_AMOUNT', align : 'center',width:80},
					   { text : '计划金额', dataIndex : 'F_PLAN_MONEY', align : 'center',width:80},
					  { text : '实际金额', dataIndex : 'F_ACT_MONEY', align : 'center',width:80},
					  { text : '来源', dataIndex : 'SOURCE', align : 'center',width:100},
					  
					  { text : '填写消耗数量', align : 'center',xtype: 'templatecolumn', width:110,
					    tpl: '<a style="cursor:pointer;text-decoration:underline; color:#00F">录入</a>',id:'input'},
					   { text : '录入时间', dataIndex : 'INSERTDATE', align : 'center',width:100}
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
		items : [ list1,{layout:'border',region : 'center',
	              items : [{
							region : 'north',
							items : [{
										xtype : 'button',
										text : '追加物料',
										id : 'addMat',
										style : 'margin:5px 0 5px 10px'
									}]
						}, grid]
						}] 
	});

	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		autoScroll : true,
		items : [    rightPanel ]
	});
	
	
	gridStore.on('beforeload', function (store, options) {
	   	    var params = {
	  	            parName : ['ORDERID_in'],
					parType : ['s'],
					parVal : [  orderId ],
					proName : 'pro_dj601_ordermat',
					cursorName : 'RET'
	  	   };
	  	   Ext.apply(store.proxy.extraParams, params);
	})
	
	gridStore.load();
	
	
	var windowInput = Ext.create('Ext.window.Window', {
     
		    id:'windowInput',
		    title: "录入实际数量",
		    width: 340,
		    height: 200,
		    plain: true,        
		    modal: true,        
		    defaults: {
		        labelWidth:90,
		        labelAlign:'right',
		        width:300,
		        style:'margin-top:8px'
		    },
		    items: [  
		           {id:'rowNum', xtype: 'hidden'},
		           {id:'ACT_AMOUNT', xtype:'numberfield',fieldLabel: '实际数量',style:'margin-top:20px;',value:0}
		        
		    ],
		    buttons: [
		        { text: '确 认',id:'saveFinish',icon:imgpath+'/save_16x16.gif'},
		        { text: '取 消',icon:imgpath+'/cross.gif', handler: function () { Ext.getCmp("windowInput").hide(); } }],
		
		    closeAction: 'hide',
		    model: true
		});
	
		
		
	var windowMat = Ext.create('Ext.window.Window', {
     
		    id:'windowMat',
		    title: "录入实际数量",
		    width: 340,
		    height: 320,
		    plain: true,        
		    modal: true,        
		    defaults: {
		        labelWidth:90,
		        labelAlign:'right',
		        width:300,
		        style:'margin-top:8px'
		    },
		    items: [  
		           {id:'row', xtype: 'hidden'},
		          
		           
		           {bodyStyle:'background:none',border:0,layout:'column',items:[
		                 {id:'MATERIALCODE', xtype:'textfield',fieldLabel: '物料编码', labelWidth:90,width:260,
		                   labelAlign:'right'},
		                 {xtype:'button',id:'select',text:'选择'}
		           ]},
		           
		           {id:'MATERIALNAME', xtype:'textfield',fieldLabel: '物料名称'},
		           
		           {id:'ETALON', xtype:'textfield',fieldLabel: '规格型号'},
		           {id:'MAT_CL', xtype:'textfield',fieldLabel: '材质'},
		           {id:'ACT_AMOUNT_s', xtype:'numberfield',fieldLabel: '实际数量',value:0},
		           {id:'F_PRICE', xtype:'numberfield',fieldLabel: '单价',value:0},
		           {id:'SOURCE', xtype:'textfield',fieldLabel: '物料来源'}
		    ],
		    buttons: [
		        { text: '保 存',id:'save',icon:imgpath+'/save_16x16.gif'},
		        { text: '取 消',icon:imgpath+'/cross.gif', handler: function () { Ext.getCmp("windowMat").hide(); } }],
		
		    closeAction: 'hide',
		    model: true
		});
		
		
		
	Ext.getCmp('input').on('click',function(a,b,c,d){
		
    	  Ext.getCmp('rowNum').setValue(c);
    	  windowInput.show();
    });
    
    
    Ext.getCmp('addMat').on('click',function(a,b,c,d){
		   var returnVal =  window.showModalDialog(APP+"/page/DJ/DJ601kcSelect.jsp?orderId="+orderId,null, "dialogWidth=1200px;dialogHeight=550px");
     gridStore.load();
	//  windowMat.show();
    });

    
     Ext.getCmp('select').on('click',function(a,b,c,d){
		
 	       var par = {orderId:'',content:''}
    	   var returnVal =  window.showModalDialog(APP+"/page/DJ/DJ601kcQuery.jsp",par, "dialogWidth=1200px;dialogHeight=550px");
	      if(returnVal!=null){
	      	 
	      	   Ext.getCmp('MATERIALCODE').setValue(returnVal.MATCODE);
	      	   Ext.getCmp('MATERIALNAME').setValue(returnVal.MATNAME);
	      	   Ext.getCmp('ETALON').setValue(returnVal.ETALON);
	      	   Ext.getCmp('MAT_CL').setValue(returnVal.MATCL);
	      	    
	           Ext.getCmp('ACT_AMOUNT_s').setValue(returnVal.AMOUNT);
	           Ext.getCmp('F_PRICE').setValue(returnVal.FPRICE);
	           Ext.getCmp('MAT_CL').setValue(returnVal.MATCL);
	           Ext.getCmp('SOURCE').setValue(returnVal.SOURCE);
	      }
    })
    
    
    
    Ext.getCmp('saveFinish').on('click',function(){
            
    	var cc = Ext.getCmp('rowNum').getValue();
    	        
    	Ext.Ajax.request({
                url: APP+"/ModelChange",
                method: 'POST',
                params: {
                    parName: ['ID_in','ACT_AMOUNT_in'],
                    parType: ["s",'i'],
                    parVal: [  
                               gridStore.getAt(cc).get("ID"),
                               Ext.getCmp("ACT_AMOUNT").getValue()
                    ],
                    proName: "pro_dj602_confirmmat",
                    returnStr: ['ret'],
                    returnStrType: ['s']
                },
                success: function (response, options) {

                    var resp = Ext.decode(response.responseText);
                    	if(resp=="Success"){
						    Ext.example.msg("提示",'执行成功');
						    windowInput.hide();
						    gridStore.load();
						}else{
						    Ext.example.msg("提示",'执行失败');
						}
                }
            })
    });
    
    Ext.getCmp('save').on('click',function(){
        
    	if(Ext.getCmp('MATERIALCODE').getValue()==""){  Ext.example.msg('操作信息', "物料编码不能为空"); return false;}
    	if(Ext.getCmp('MATERIALNAME').getValue()==""){  Ext.example.msg('操作信息', "物料名称不能为空"); return false;}
    	if(Ext.getCmp('ETALON').getValue()==""){  Ext.example.msg('操作信息', "规格型号不能为空"); return false;}
    	if(Ext.getCmp('MAT_CL').getValue()==""){  Ext.example.msg('操作信息', "材质不能为空"); return false;}
    	if(Ext.getCmp('F_PRICE').getValue()=="0"){  Ext.example.msg('操作信息', "单价不能为空"); return false;}
    	if(Ext.getCmp('ACT_AMOUNT_s').getValue()=="0"){  Ext.example.msg('操作信息', "实际数量不能为空"); return false;}
    	
    	var cc = Ext.getCmp('rowNum').getValue();
                                             
    	Ext.Ajax.request({
                url: APP+"/ModelChange",
                method: 'POST',
                params: {
                    parName: ['ORDERID_in','MATERIALCODE_in','MATERIALNAME_in','ETALON_in','MAT_CL_in','F_PRICE_in','ACT_AMOUNT_in'],
                    parType: ["s",'s','s','s','s','do','i'],
                    parVal: [  orderId,
                               Ext.getCmp('MATERIALCODE').getValue(),
					      	   Ext.getCmp('MATERIALNAME').getValue(),
					      	   Ext.getCmp('ETALON').getValue(),
					      	   Ext.getCmp('MAT_CL').getValue(),
					           Ext.getCmp('F_PRICE').getValue(),
					           Ext.getCmp('ACT_AMOUNT_s').getValue()
                    ],
                    proName: "pro_dj602_addmat",
                    returnStr: ['ret'],
                    returnStrType: ['s']
                },
                success: function (response, options) {

                    var resp = Ext.decode(response.responseText);
                    	if(resp=="Success"){
						    Ext.example.msg("提示",'保存成功');
						    windowMat.hide();
						    gridStore.load();
						}else{
						    Ext.example.msg("提示",'保存失败');
						}
                }
            })
    });
	
})
