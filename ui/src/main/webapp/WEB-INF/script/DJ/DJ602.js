 var globalProCode= '';
var type= '';
if(location.href.split('?')[1]!=null){ 
	type = Ext.urlDecode(location.href.split('?')[1]).type;
}

Ext.onReady(function() {
    var billStateStore = Ext.create("Ext.data.Store", {
			autoLoad : true,
			storeId : 'billStateStore',
			fields : [ 'ORDER_STATUS', 'ORDER_STATUS_DESC' ],
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
					proName : 'pro_dj602_orderstatuslist',
					cursorName : 'P_CUR'
				}
			}
	});	
	
    var menddeptStore = Ext.create("Ext.data.Store", {
			autoLoad : false,
			storeId : 'menddeptStore',
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
	var sy_result = Ext.create("Ext.data.Store", {
									storeId : 'sy_result',
									fields : [ 'SY_RESULT_DESC', 'SY_RESULT' ],
									data : [{'SY_RESULT':'%','SY_RESULT_DESC':'全部'},{'SY_RESULT':'未试验','SY_RESULT_DESC':'未试验'},{'SY_RESULT':'通过','SY_RESULT_DESC':'通过'},{'SY_RESULT':'未通过','SY_RESULT_DESC':'未通过'}],
									proxy : {
										type : 'memory',
										reader : {
											type : 'json'
										}
									}
								});
 
     var gridStore = Ext.create('Ext.data.Store', {
        storeId: 'gridStore',
        pageSize:200,
        fields: ['DJ_UQ_CODE', 'DJ_NAME','APPLY_PLANTNAME','MEND_CONTEXT','INSERTDATE','REMARK','APPLY_ID','ORDERID','ORDER_STATUS_DESC',
                 'MEND_USERNAME','MENDDEPT_NAME','PLANTNAME','DJ_VOL','F_MONEY','CSY_RESULT'],
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
		frame:true,
		layout:'vbox',
		defaults : {
			width:'100%'
		},
		items :[{
			xtype:'panel',
			layout:'column',
			frame:true,
			defaults : {
				labelAlign:'right',
				labelWidth:70,
				width:200,
				margin:'5px 0px 5px 10px'
			},
			items :[
				{id : 'billState', xtype : 'combobox', fieldLabel : '工单状态',store:billStateStore,editable :false,displayField: 'ORDER_STATUS_DESC', valueField: 'ORDER_STATUS', queryMode: 'local'},
				{id : 'systatus', xtype : 'combobox', fieldLabel : '试验结果',store:sy_result,editable :false,displayField: 'SY_RESULT_DESC', valueField: 'SY_RESULT', queryMode: 'local'},
				{id : 'MENDDEPT', xtype : 'combobox', fieldLabel : '检修单位',store:menddeptStore,editable :false,displayField: 'MENDDEPT_NAME', valueField: 'MENDDEPT_CODE', queryMode: 'local'},
				{id:'billcode', xtype: 'textfield',fieldLabel: '工单号'},
				{xtype:'button',text:'查询',id:'query',width:80,icon:imgpath+'/a1.gif'}
			]},{
			xtype:'panel',
			layout:'column',
			frame:true,
			defaults : {
				labelAlign:'right',
				labelWidth:70,
				width:200,
				margin:'5px 0px 5px 10px'
			},
			items :[
				{id : 'remark', xtype : 'textfield', fieldLabel : '备注',width:410,},
				{xtype:'button',text:'完成任务',id:'endSelect',width:100,icon:imgpath+'/a1.gif'},
				{xtype:'button',text:'退回到上一步',width:120,handler : function() {end();}}
			]}
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
				  { text : '工序管理', align : 'center',xtype: 'templatecolumn', width:60,
				    tpl: '<a style="cursor:pointer;text-decoration:underline; color:#00F">管理</a>',id:'billManage'},
				 { text : '物料管理', align : 'center',xtype: 'templatecolumn', width:60,
				    tpl: '<a style="cursor:pointer;text-decoration:underline; color:#00F">管理</a>',id:'matManage'},
				  { text : '工单号', dataIndex : 'ORDERID',  align : 'center',width:100,renderer:function(value,meta){meta.style='text-align:left;'; return value;}}, 
				  { text : '电机编号', dataIndex : 'DJ_UQ_CODE', align : 'center',width:100,renderer:function(value,meta){meta.style='text-align:left;'; return value;}}, 
				  { text : '电机名称', dataIndex : 'DJ_NAME', align : 'center',width:130,renderer:function(value,meta){meta.style='text-align:left;'; return value;}}, 
				  { text : '电机容量', dataIndex : 'DJ_VOL', align : 'center',width:60,renderer:function(value,meta){meta.style='text-align:left;'; return value;}}, 
				  { text : '申请厂矿', dataIndex : 'PLANTNAME', align : 'center',width:120,renderer:function(value,meta){meta.style='text-align:left;'; return value;}}, 
				  { text : '维修内容', dataIndex : 'MEND_CONTEXT', align : 'center',width:120,renderer:function(value,meta){meta.style='text-align:left;'; return value;}}, 
				  { text : '检修班组', dataIndex : 'MENDDEPT_NAME', align : 'center',width:120,renderer:function(value,meta){meta.style='text-align:left;'; return value;}},
				  { text : '消耗物资合计', dataIndex : 'F_MONEY', width:100,renderer:format_money}, 
				  { text : '负责人', dataIndex : 'MEND_USERNAME', align : 'center',width:80,renderer:function(value,meta){meta.style='text-align:left;'; return value;}},
				  { text : '下一状态', dataIndex : 'ORDER_STATUS_DESC', align : 'center',width:80,renderer:function(value,meta){meta.style='text-align:left;'; return value;}},
				  { text : '试验结果', dataIndex : 'CSY_RESULT', align : 'center',width:80,renderer:function(value,meta){meta.style='text-align:left;'; return value;}}
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
	Ext.getCmp('systatus').select(Ext.data.StoreManager.lookup('sy_result').first());
	
	gridStore.on('beforeload', function (store, options) {
	   	    var params = {
	  	            parName : ['order_status_in','MENDDEPT_CODE_in','ORDERID_in','csy_result_in'],
					parType : ['s','s','s','s'],
					parVal : [ Ext.getCmp('billState').getValue(),
					           Ext.getCmp('MENDDEPT').getValue(),
					           Ext.getCmp('billcode').getValue(),
							   Ext.getCmp('systatus').getValue(),
					],
					proName : 'pro_dj602_orderlist_power',
					cursorName : 'RET'
	  	   };
	  	   Ext.apply(store.proxy.extraParams, params);
	});
	
	billStateStore.on('load',function(){
		Ext.getCmp('billState').select(billStateStore.getAt(0));
		menddeptStore.load({params:{
		 	    parName : ['usercode_in','order_status_in'],
			    parType : ['s','s'],
				parVal : [Ext.util.Cookies.get("mm.userid"), Ext.getCmp('billState').getValue()],
				proName : 'pro_dj602_menddept_power',
				cursorName : 'P_CUR'
	    }});
	});
	Ext.getCmp('billState').on('change', function() {// 检修单位与工单状态设置联动
		Ext.data.StoreManager.lookup('menddeptStore').load({
			params : {
				 parName : ['usercode_in','order_status_in'],
				    parType : ['s','s'],
					parVal : [Ext.util.Cookies.get("mm.userid"),Ext.getCmp('billState').getValue()],
					proName : 'pro_dj602_menddept_power',
					cursorName : 'P_CUR'
			}
		});
	});
//取下拉列表框的第一个数据
    menddeptStore.on('load',function(){
	   Ext.getCmp('MENDDEPT').select(menddeptStore.getAt(0));
	   	query();	
	});
	
	Ext.getCmp('query').on('click',query);
	
	Ext.getCmp('billManage').on('click',function(a,b,c,d){
  	  var returnVal =  window.showModalDialog(APP+"/page/DJ/DJ60201.jsp?orderId="+gridStore.getAt(c).get("ORDERID"),null, "dialogWidth=1200px;dialogHeight=550px");
      if(returnVal!=null){
          query();
      }
    });
   
   
    Ext.getCmp('matManage').on('click',function(a,b,c,d){
      var par = {orderId:gridStore.getAt(c).get("ORDERID"),content:gridStore.getAt(c).get("MEND_CONTEXT")};
  	  var returnVal =  window.showModalDialog(APP+"/page/DJ/DJ60202.jsp?orderId="+gridStore.getAt(c).get("ORDERID"), par, "dialogWidth=1200px;dialogHeight=550px");
      if(returnVal!=null){
          query();
      }
   });
	
    Ext.getCmp('endSelect').on('click',function(a,b,c,d){
		var selectedRecord = Ext.getCmp("grid").getSelectionModel().getSelection();
		if (selectedRecord != null && selectedRecord != "") {
			Ext.Msg.buttonText.ok = "确定";
		    Ext.Msg.buttonText.cancel = "取消";
		    Ext.Msg.show({title: '提示',msg: '确定要结束码?',buttons: Ext.Msg.OKCANCEL,icon: Ext.Msg.OKCANCEL,
		        fn: function (button) {
		            if (button == "ok") {
		                var selectID = [];
		                Ext.Array.each(selectedRecord, function (name, index) { 
		                	Ext.Ajax.request({
								url : APP + '/ModelChange',
								method : 'POST',
								async : false,
								params : {
									parName : ['ORDERID_in','userid_in','username_in','remark_in'],
									parType : ['s','s','s','s'],
									parVal : [name.data.ORDERID,Ext.util.Cookies.get('mm.userid'),Ext.util.Cookies.get('mm.username'),Ext.getCmp('remark').getValue()],
									proName : 'pro_dj602_over',
									returnStr : [ 'RET_MSG','RET' ],
									returnStrType : [ 's','s' ]
								},
								success : function(response) {
									var resp = Ext.decode(response.responseText);
									if(resp[1]=="Success"){
										Ext.example.msg("提示",'执行成功');
										query();
									}else{
										Ext.example.msg("提示",resp[0]);
									}
								}
							});
		               });
		            }
		        }
		    });
		
		} 
		else {
			Ext.Msg.alert("提示", "至少选择一条记录"); 
		}
	});	      
});
function query(){ 
	Ext.data.StoreManager.lookup('gridStore').load();
} 
function end(){ 
	var selectedRecord = Ext.getCmp("grid").getSelectionModel().getSelection();
	if (selectedRecord != null && selectedRecord != "") {
		globalProCode = Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.ORDERID;
		Ext.Ajax.request({
			url : APP + '/ModelChange',
			method : 'POST',
			async : false,
			params : {
				parName : ['a_orderid','a_userid', 'a_username'],
				parType : ['s','s','s'],
				parVal : [globalProCode,Ext.util.Cookies.get("mm.userid"), Ext.util.Cookies.get("mm.username")],
				proName : 'pg_dj602.rollbacktoprestep',
				returnStr : [ 'ret_msg','ret' ],
				returnStrType : [ 's','s' ]
			},
			success : function(response) {
				var resp = Ext.decode(response.responseText);
				if(resp[1]=="Success"){
					Ext.example.msg("提示",'执行成功');
					query();
				}else{
					Ext.example.msg("提示",'执行失败:'+resp[0]);
				}
			}
		});
	}
	else { Ext.Msg.alert("提示", "至少选择一条记录"); }
} 
function format_money(value, metaData, record, rowIndex, colIndex, store){
	 metaData.style = "text-align:right;"; 
	 return Ext.util.Format.usMoney(value);
}