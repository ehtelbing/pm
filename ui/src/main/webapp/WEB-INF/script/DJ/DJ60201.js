 
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
        fields: ['ET_NO', 'ET_CONTEXT','PLAN_WORKTIME','PLAN_PERSON','BEGINDATE',
                 'END_FLAG','ENDDATE','PRE_ET_ID','START_FLAG','ET_ID'],
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
					labelWidth:60
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
				 {id:'dj_menddept', xtype: 'textfield',fieldLabel: '检修班组'}
			      
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
						Ext.getCmp('dj_name').setValue(resp[0].DJ_NAME);
						Ext.getCmp('dj_type').setValue(resp[0].DJ_TYPE);
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
			columns : [   
					  { text : '工序号', dataIndex : 'ET_NO',  align : 'center',width:100}, 
					  { text : '工序内容', dataIndex : 'ET_CONTEXT', align : 'center',width:100}, 
					  { text : '计划工时', dataIndex : 'PLAN_WORKTIME', align : 'center',width:130}, 
					  { text : '计划人数', dataIndex : 'PLAN_PERSON', align : 'center',width:130}, 
					  { text : '开始时间', dataIndex : 'BEGINDATE', align : 'center',width:120}, 
					  { text : '完成状态', dataIndex : 'END_FLAG', align : 'center',width:140},
					  { text : '完成时间', dataIndex : 'ENDDATE', align : 'center',width:120},
					  { text : '前置工序', dataIndex : 'PRE_ET_ID', align : 'center',width:100},
					  
					  { text : '完成工序', align : 'center',xtype: 'templatecolumn', width:80,
						tpl : '<a style="cursor:pointer;text-decoration:underline; color:#00F">完成</a>',id:'window1',
					    renderer: function(value, metaData){ 
					       
					    	if(metaData.record.data.START_FLAG=='1' && metaData.record.data.END_FLAG=='0'){
					    		 return '<a style="cursor:pointer;text-decoration:underline;color:#00F;">完成</a>';
					    	}else{
					    	     return '<a style="cursor:pointer;">完成</a>';
					    	} 
					    }
					  }
					    
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
		items : [    rightPanel ]
	});
	
	
	gridStore.on('beforeload', function (store, options) {
	   	    var params = {
	  	            parName : ['ORDERID_in'],
					parType : ['s'],
					parVal : [orderId ],
					proName : 'pro_dj602_etlist',
					cursorName : 'RET'
	  	   };
	  	   Ext.apply(store.proxy.extraParams, params);
	});
	 
	gridStore.load();
	
	
	var window = Ext.create('Ext.window.Window', {
     
		    id:'window',
		    title: "完成工序",
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
		           
		           {id:'ACT_PERSON', xtype:'numberfield',fieldLabel: '实际人数',style:'margin-top:20px;',value:0},
		           {id:'ACT_WORKTIME', xtype: 'numberfield',fieldLabel: '实际工时',value:0}
		    ],
		    buttons: [
		        { text: '保 存',id:'saveFinish',icon:imgpath+'/save_16x16.gif'},
		        { text: '取 消',icon:imgpath+'/cross.gif', handler: function () { Ext.getCmp("window").hide(); } }],
		
		    closeAction: 'hide',
		    model: true
		});
	
		
		
    Ext.getCmp('window1').on('click',function(a,b,c,d){
    	 
    	if(gridStore.getAt(c).get("START_FLAG")=='1' && gridStore.getAt(c).get("END_FLAG")=='0'){
    		 Ext.getCmp('rowNum').setValue(c);
    		 window.show();
    	}
    })
	
   
    
    Ext.getCmp('saveFinish').on('click',function(){
            
    	var cc = Ext.getCmp('rowNum').getValue();
    	 
    	Ext.Ajax.request({
                url: APP+"/ModelChange",
                method: 'POST',
                params: {
                    parName: ['ORDERID_in','ET_ID_in','ACT_PERSON_in','ACT_WORKTIME_in',
                              'INSERT_USERID_in','INSERT_USERNAME_in'],
                    parType: ["s",'s','s','s','s','s'],
                    parVal: [  
                               gridStore.getAt(cc).get("ORDERID"),
                               gridStore.getAt(cc).get("ET_ID"),
                               Ext.getCmp('ACT_PERSON').getValue(),
                               Ext.getCmp('ACT_WORKTIME').getValue(),
                               Ext.util.Cookies.get("mm.userid"),
                               Ext.util.Cookies.get("mm.username")
                    ],
                    proName: "pro_dj602_finishet",
                    returnStr: ['ret'],
                    returnStrType: ['s']
                },
                success: function (response, options) {

                    var resp = Ext.decode(response.responseText);
                    	if(resp=="Success"){
						    Ext.example.msg("提示",'执行成功');
						    window.hide();
						    gridStore.load();
						}else{
						    Ext.example.msg("提示",'执行失败');
						}
                }
            })
    });
})
