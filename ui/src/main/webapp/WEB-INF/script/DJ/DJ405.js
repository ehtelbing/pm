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
		         {id:'plant', xtype: 'textfield',fieldLabel: '厂矿',readOnly:true,
		          value:Ext.util.Cookies.get("mm.plantname")},
		         
		         {id:'personnel', xtype: 'textfield',fieldLabel: '录入人',readOnly:true,
		          value:Ext.util.Cookies.get("mm.username")},
				   
		         {colspan: 3,layout:'column',border:0,bodyStyle:'background:none',
		         items:[
		             {xtype:'button',text:'查询',id:'query',margin:'0px 0px 0px 10px',icon:imgpath+'/a1.gif'},
				     {xtype:'button',text:'确认并送达检修单位',id:'submit',margin:'0px 0px 0px 10px',icon:imgpath+'/a1.gif'},
				     {xtype:'displayfield',value:'(*申请确认后将由动力厂进行接收)'},
					 {xtype:'button',text:'退回到申请部门',id:'back',margin:'0px 0px 0px 10px',icon:imgpath+'/a1.gif'}
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
					  { text : '工单号', dataIndex : 'ORDERID',align : 'center',width:130},
					  { text : '电机编号', dataIndex : 'DJ_UQ_CODE',  align : 'center',width:130}, 
					  { text : '电机名称', dataIndex : 'DJ_NAME',  align : 'center',width:130}, 
					  { text : '检修内容', dataIndex : 'MEND_CONTEXT',  align : 'center',width:120}, 
					  { text : '录入人', dataIndex : 'INSERT_USERID',  align : 'center',width:140}, 
					  { text : '申请时间', dataIndex : 'PLAN_BEGINDATE',  align : 'center',width:120}, 
					  { text : '完成时间', dataIndex : 'PLAN_ENDDATE',  align : 'center',width:120}, 
					  { text : '备注', dataIndex : 'REMARK',  align : 'center',flex:1}
					  
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
	  	            parName : ['plantcode_in','departcode_in','usercode_in'],
					parType : ['s','s','s'],
					parVal : [ 
					            Ext.util.Cookies.get("mm.plantcode"),
					            '%',
					            Ext.util.Cookies.get("mm.userid")
					],
					proName : 'pg_dj405.get_waitapplylist',
					cursorName : 'RET'
	  	   };
	  	   Ext.apply(store.proxy.extraParams, params);
	});

	Ext.getCmp('query').on('click',query);

	function query(){ gridStore.load(); } 

	Ext.getCmp('submit').on('click',submit);
	Ext.getCmp('back').on('click',back);  
    Ext.getCmp('show').on('click',function(a,b,c,d){
  	
  	  var returnVal =  window.showModalDialog(APP+"/page/DJ/DJ402show.jsp?apply_id="+gridStore.getAt(c).get("APPLY_ID"), window, "dialogWidth=1200px;dialogHeight=550px");
      if(returnVal!=null){
          query();
      }
   });	
function submit() {
    var selectedRecord = Ext.getCmp("grid").getSelectionModel().getSelection();
    if (selectedRecord != null && selectedRecord != "") {
        Ext.Msg.buttonText.ok = "确定";
        Ext.Msg.buttonText.cancel = "取消";
        Ext.Msg.show({
            title: '提示',
            msg: '确定要送达检修单位码?',
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
	                            parName : ['applyid_in','a_userid'],
								parType : ['s','s'],
								parVal : [ name.data.APPLY_ID,Ext.util.Cookies.get('mm.userid') ],
								proName : 'pg_dj405.confirm_apply',
								returnStr : [ 'RET','ret_msg' ],
								returnStrType : [ 's','s' ] 
							},
		                    success: function (response, options) {
		                    	var resp = Ext.decode(response.responseText);
		                    	if(selectedRecord.length-1==index){
		                    		if(resp[0]=="Success"){
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
function back() {
    var selectedRecord = Ext.getCmp("grid").getSelectionModel().getSelection();
    if (selectedRecord != null && selectedRecord != "") {
        Ext.Msg.buttonText.ok = "确定";
        Ext.Msg.buttonText.cancel = "取消";
        Ext.Msg.show({
            title: '提示',
            msg: '确定要退回到申请单位码?',
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
	                            parName : ['applyid_in','a_userid'],
								parType : ['s','s'],
								parVal : [ name.data.APPLY_ID,Ext.util.Cookies.get('mm.userid') ],
								proName : 'pg_dj405.back_apply',
								returnStr : [ 'RET','ret_msg' ],
								returnStrType : [ 's','s' ] 
							},
		                    success: function (response, options) {
		                    	var resp = Ext.decode(response.responseText);
		                    	if(selectedRecord.length-1==index){
		                    		
		                    		if(resp[0]=="Success"){
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
    } 
	else { Ext.Msg.alert("提示", "至少选择一条记录"); }
}	
  query();
});
