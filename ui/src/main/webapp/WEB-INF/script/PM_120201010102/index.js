//Ext.Loader.setConfig({enabled: true });
//Ext.Loader.setPath({
//    "com.data": "../../com/data",
//    "com.store": "../../com/store",
//    "com.view": "../../com/view",
//    "com.util": "../../com/util"
//});
//
//Ext.Loader.setPath({
//    "com.data": "../../com/data",
//    "com.store": "../../com/store",
//    "com.view": "../../com/view",
//    "com.util": "../../com/util"
//});
//
//Ext.require([
//   'com.data.Manage',
//   'com.store.GridStore'
//]);
//123123
Ext.onReady(function() {
     var zqList = Ext.create('Ext.data.Store', {
	        autoLoad: true,
	        storeId: 'zqList',
	        fields: ['CYCLE_ID', 'CYCLE_DESC'],
	        proxy: {
	            type: 'ajax',
	            async: false,
				url : AppUrl + 'PM_12/PRO_RUN_CYCLE_ABLE',
	            actionMethods: {
	                read: 'POST'
	            },
	            reader: {
	                type: 'json',
	                root: 'list'
	            },
	            extraParams:{}
	        }
	    });
 var gridStore = Ext.create('Ext.data.Store', {
	 	id:'gridStore',
		fields: ['CYCLE_DESC','CYCLE_UNIT','CYCLE_VALUE','CYCLE_ID'],
		pageSize : 15,
		autoLoad : false,
		proxy : {
			 type : 'ajax',
			 async : false,
			 url : AppUrl + 'PM_12/PRO_RUN_BJ_CYCLE_BASIC_ALL',
			 actionMethods : {
				 read : 'POST'
			 },
			 reader : {
				 type : 'json',
				 root : 'list',
				 total : 'total'
			 }
		}
 });
     gridStore.load({
         params: {
			 A_BJ_ID:Ext.urlDecode(location.href.split('?')[1]).V_MPCODE
         }
     });
	
	var grid = Ext.create('Ext.grid.Panel', {
		id : 'grid',
		region : 'center',
		columnLines : true,
		width : '100%',
		selType : 'checkboxmodel',
		columns:[{xtype : 'rownumberer',text : '序号',width : 50,align : 'center'},
		         {text : '周期描述',dataIndex : 'CYCLE_DESC',align : 'center',flex:1,renderer:left},
		         {text : '计算单位',dataIndex : 'CYCLE_UNIT',align : 'center',flex:1,renderer:left},
		         {text : '标准周期值',dataIndex : 'CYCLE_VALUE',align : 'center',flex:1,renderer:left}	
		],
		store:gridStore,
	    autoScroll: true,
		dockedItems:[
			{xtype:'panel',defaults:{labelAlign:'right',labelWidth:85},baseCls:'my-panel-no-border',layout:'column',bodyPadding:3,
				items:[
					{id:'dqbjms',xtype:'displayfield',fieldLabel:'当前备件描述'},
					{id:'xzzq',xtype:'combo',fieldLabel:'选择周期',store:zqList ,editable: false, queryMode: 'local', displayField: 'CYCLE_DESC', valueField: 'CYCLE_ID'},
					{id:'bzzqz',xtype:'textfield',fieldLabel:'标准周期值'},
					{id:'add',style:'margin-left:5px',xtype:'button',text:'添加标准周期',handler:addbtn, icon:imgpath + '/add.png',},
					{id:'delete',xtype:'button',text:'删除选中周期',style:'margin:0px 10px 0px 10px',handler:deletebtn, icon:imgpath + '/delete1.png'},
					{id:'sel',xtype:'button',text:'查询', icon: imgpath + '/search.png',handler:function(){
						 gridStore.load({
							 params: {
								 A_BJ_ID:Ext.urlDecode(location.href.split('?')[1]).V_MPCODE
							 }
						 });
					}}
			 ]}
		]
	});
	
	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		items : [ grid ]
	});
	zqList.on("load",function(){
		Ext.ComponentManager.get('xzzq').select(zqList.getAt(0));
	});
	Ext.Ajax.request({
		 url : AppUrl + 'PM_12/PRO_RUN_BJ_GETDESC',
         async: false,
         method: 'post',
         params:{
			A_BJ_ID:Ext.urlDecode(location.href.split('?')[1]).V_MPCODE
         },
		success:function(response){
        	 var resp = Ext.JSON.decode(response.responseText);
        	 Ext.ComponentManager.get('dqbjms').setValue(resp.RET);
         }
	 });
})



function addbtn(){
	if(Ext.ComponentManager.get('bzzqz').getValue()==""){
		Ext.Msg.alert('操作信息', '请填写标准周期值');
		return false;
	}
	 Ext.Ajax.request({
		 url : AppUrl + 'PM_12/PRO_RUN_BJ_CYCLE_BASIC_ADD',
         async: false,
         method: 'post',
         params:{
			 'A_BJ_ID':Ext.urlDecode(location.href.split('?')[1]).V_MPCODE,
			 'A_CYCLE_ID':Ext.ComponentManager.get('xzzq').getValue(),
			 'A_CYCLE_VALUE':Ext.ComponentManager.get('bzzqz').getValue()
         },
		 success:function(response){
        	 var resp = Ext.JSON.decode(response.responseText);
			 if(resp.RET=='Success'){
				 Ext.Msg.alert('操作信息', '添加标准周期成功');
				 Ext.data.StoreManager.get('gridStore').load({
					 params: {
						 A_BJ_ID:Ext.urlDecode(location.href.split('?')[1]).V_MPCODE
					 }
				 });
			 }
         }
	 });
}

function deletebtn(){
	var selectRecords= Ext.getCmp("grid").getSelectionModel().getSelection();
	var length=selectRecords.length;
	if (length==0) {
		Ext.Msg.alert('操作信息','请选择数据进行删除');
		return false;
	}
	Ext.Msg.confirm("警告", "确定要删除吗？", function (button) {
	     if (button != "yes") {
			 return false;
		 }
		var i_err=0;
		for (i = 0; i <length; i++) {
			 Ext.Ajax.request({
				 url : AppUrl + 'PM_12/PRO_RUN_BJ_CYCLE_BASIC_DEL',
                  method: 'POST',
                  params: {
					  A_BJ_ID:Ext.urlDecode(location.href.split('?')[1]).V_MPCODE,
					  A_CYCLE_ID:selectRecords[i].data.CYCLE_ID
                  },
                  success: function (response) {
                	  var resp = Ext.JSON.decode(response.responseText);
					  if(resp.RET!='Success'){
						  Ext.Msg.alert('操作信息', '删除标准周期失败');
						  i_err++;
					  }
                  }
              });
		}
		if(i_err==0){
			Ext.Msg.alert('操作信息', '删除标准周期成功');
			Ext.data.StoreManager.get('gridStore').load({
				params: {
					A_BJ_ID:Ext.urlDecode(location.href.split('?')[1]).V_MPCODE
				}
			});
		}
	});
}
function left(value, metaData){
	metaData.style = "text-align:left";
	return value;
}

		