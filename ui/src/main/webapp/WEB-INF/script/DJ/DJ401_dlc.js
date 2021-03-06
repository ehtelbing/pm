 
var type= '';
if(location.href.split('?')[1]!=null){ 
	type = Ext.urlDecode(location.href.split('?')[1]).type;
}

Ext.onReady(function() {
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
			    {id : 'plant', xtype : 'combobox', fieldLabel : '厂矿',store:plantStore,editable:false,
			      displayField: 'DEPARTNAME', valueField: 'DEPARTCODE', queryMode: 'local'},
			      
		         {id : 'dept', xtype : 'combobox', fieldLabel : '部门',store:deptStore,editable:false, 
		          displayField: 'DEPARTNAME', valueField: 'DEPARTCODE', queryMode: 'local'},
		         
		         {id:'personnel', xtype: 'textfield',fieldLabel: '录入人',readOnly:true,
		          value:Ext.util.Cookies.get("mm.username")},
				   
		         {colspan: 3,layout:'column',border:0,bodyStyle:'background:none',
		         items:[
		             {xtype:'button',text:'查询',id:'query',margin:'0px 0px 0px 10px',icon:imgpath+'/a1.gif'},
				     {xtype:'button',text:'提交',id:'submit',margin:'0px 0px 0px 10px',icon:imgpath+'/a1.gif'},
				     {xtype:'displayfield',value:'(*申请提交后将由动力厂进行接收)'},
				     {xtype:'button',text:'录入',id:'add',margin:'0px 0px 0px 10px',icon:imgpath+'/a1.gif'}
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
					  { text : '工单号', dataIndex : 'ORDERID',align : 'center',width:130},
					  { text : '电机编号', dataIndex : 'DJ_UQ_CODE',  align : 'center',width:130}, 
					  { text : '电机名称', dataIndex : 'DJ_NAME',  align : 'center',width:130}, 
					  { text : '检修内容', dataIndex : 'MEND_CONTEXT',  align : 'center',width:120}, 
					  { text : '录入人', dataIndex : 'INSERT_USERNAME',  align : 'center',width:140}, 
					  { text : '申请时间', dataIndex : 'PLAN_BEGINDATE',  align : 'center',width:120}, 
					  { text : '完成时间', dataIndex : 'PLAN_ENDDATE',  align : 'center',width:120}, 
					  { text : '备注', dataIndex : 'REMARK',  align : 'center',flex:1}, 
					  
					  { text : '', align : 'center',xtype: 'templatecolumn',width:60,
					    tpl: '<a style="cursor:pointer;text-decoration:underline; color:#00F">修改</a>',id:'edit'},
					    
					  { text : '', align : 'center',xtype: 'templatecolumn', width:60,
					    tpl: '<a style="cursor:pointer;text-decoration:underline; color:#00F">删除</a>',id:'delete'}
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

	
	
	Ext.getCmp('plant').on('change',function(){
     	  deptStore.load({params:{
                    parName : ["A_PLANTCODE"],
		 			parType : ["s"],
					parVal : [ Ext.getCmp('plant').getValue() ],
					proName : 'PRO_MM_DEPART',
					cursorName : 'RET'
         }});
     });
	 deptStore.on('load',function(me){
		Ext.getCmp('dept').select(me.first());
	 });
	 plantStore.on('load',function(me){
		Ext.getCmp('plant').select(me.first());
	});
	 gridStore.on('beforeload', function (store, options) {
	   	    var params = {
	  	            parName : ['plantcode_in','departcode_in','usercode_in'],
					parType : ['s','s','s'],
					parVal : [ 
					            Ext.getCmp('plant').getValue(),
					            Ext.getCmp('dept').getValue(),
					            Ext.util.Cookies.get("mm.userid")
					],
					proName : 'pro_dj401_applylist',
					cursorName : 'RET'
	  	   };
	  	   Ext.apply(store.proxy.extraParams, params);
	})
	
	Ext.getCmp('query').on('click',query);
	
	
	function query(){ gridStore.load(); } 
	
	
	Ext.getCmp('submit').on('click',submit);
	
	
	
	
    Ext.getCmp('edit').on('click',function(a,b,c,d){
  	
  	  var returnVal =  window.showModalDialog(APP+"/page/DJ/DJ401edit.jsp?apply_id="+gridStore.getAt(c).get("APPLY_ID"), window, "dialogWidth=1200px;dialogHeight=550px");
      if(returnVal!=null){
          query();
      }
   })
  
   Ext.getCmp('add').on('click',function(){
    if(Ext.getCmp('plant').getRawValue()!=''&&Ext.getCmp('dept').getRawValue()!='')
	{
		var sheight = screen.height-70;  
		var swidth = screen.width-10;  
  	   var returnVal = window.showModalDialog(APP+"/page/DJ/DJ401add.jsp?plantcode="+Ext.getCmp('plant').getValue()+"&plantname="+Ext.getCmp('plant').getRawValue()+"&departcode="+Ext.getCmp('dept').getValue()+"&departname="+Ext.getCmp('dept').getRawValue()+"&confirm_flag_in=1", window, "dialogHeight:"+sheight+"px;dialogWidth:"+ swidth +"px;status:yes;scroll:yes;resizable:yes;center:yes");
  	   if(returnVal!=null){
  	   	  Ext.example.msg("提示",'添加成功');
          query();
       }
	}
	else
	{
		Ext.example.msg('提示信息','请先选择厂矿和部门！');
	}
   });
	  
	  
	function submit() {

    var selectedRecord = Ext.getCmp("grid").getSelectionModel().getSelection();

    if (selectedRecord != null && selectedRecord != "") {

        Ext.Msg.buttonText.ok = "确定";
        Ext.Msg.buttonText.cancel = "取消";

        Ext.Msg.show({
            title: '提示',
            msg: '确定要提交码?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.OKCANCEL,
  
            fn: function (button) {

                if (button == "ok") {
                    Ext.Array.each(selectedRecord, function (name, index) { 
                       
                       Ext.Ajax.request({
	                        url: APP+"/ModelChange",
	                        method: 'POST',
	                        async: false,
	                        params: {
	                            parName : ['applyid_in'],
								parType : ['s'],
								parVal : [ name.data.APPLY_ID ],
								proName : 'pro_dj401_submitapply',
								returnStr : [ 'RET' ],
								returnStrType : [ 's' ] 
							},
		                    success: function (response, options) {
		                    	var resp = Ext.decode(response.responseText);
		                    	
		                    	if(selectedRecord.length-1==index){
		                    		
		                    		if(resp=="Success"){
				                    	Ext.example.msg("提示",'提交成功');
				                        query();
		                    		}else{
		                    		    Ext.example.msg("提示",'提交失败');
		                    		}
	                			}
		                    }
		                });
                    });

                }
            }

        });

    } else { Ext.Msg.alert("提示", "至少选择一条记录"); }
}
	

    Ext.getCmp('delete').on('click',function(a,b,c,d){
    
    	
    	 Ext.Ajax.request({
                url: APP+"/ModelChange",
                method: 'POST',
                async: false,
                params: {
                    parName : ['applyid_in'],
					parType : ['s'],
					parVal : [ gridStore.getAt(c).get("APPLY_ID") ],
					proName : 'pro_dj401_deleteapply',
					returnStr : [ 'RET' ],
					returnStrType : [ 's' ] 
				},
                success: function (response, options) {
                	var resp = Ext.decode(response.responseText);
                		
                		if(resp=="Success"){
	                    	Ext.example.msg("提示",'删除成功');
	                        query();
                		}else{
                		    Ext.example.msg("提示",'删除失败');
                		}
        		 
                }
            });
    	
    });
    query();
});
