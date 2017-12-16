 
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
                  'PLAN_ENDDATE','REC_DEPART','REC_FLAG','REC_PLANT','REC_USERID','REC_USERNAME','REMARK','MEND_TYPE'],
        proxy: {
            type: 'ajax',
            async: false,
			url : AppUrl + 'DJ/pro_dj401_applylist',
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
		style: 'background-color:#FFFFFF',
		baseCls: 'my-panel-no-border',
		region : 'north',frame:true,bodyPadding:5,
		layout:{type:'table',columns:3},
		defaults:{labelAlign:'right',labelWidth:70},
		items : [
			{id:'plant', xtype: 'textfield',fieldLabel: '厂矿',readOnly:true,
				value:Ext.util.Cookies.get('v_orgname2')},

			{id:'dept', xtype: 'textfield',fieldLabel: '部门',readOnly:true,
				value:Ext.util.Cookies.get('v_deptname2')},

			{id:'personnel', xtype: 'textfield',fieldLabel: '录入人',readOnly:true,
				value:Ext.util.Cookies.get('v_personname2')},

			{colspan: 3,layout:'column',border:0,bodyStyle:'background:none',
				items:[
					{xtype:'button',text:'查询',id:'query',margin:'0px 0px 0px 10px',icon:imgpath+'/search.png'},
					{xtype:'button',text:'提交',id:'submit',margin:'0px 0px 0px 10px',icon:imgpath+'/saved.png'},
					{xtype:'displayfield',value:'(*申请提交后将由部门负责人进行确认)'},
					{xtype:'button',text:'录入',id:'add',margin:'0px 0px 0px 10px',icon:imgpath+'/saved.png'}
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
					  { text : '工单号', dataIndex : 'ORDERID',align : 'center',width:80},
					  { text : '电机编号', dataIndex : 'DJ_UQ_CODE',  align : 'center',width:80}, 
					  { text : '电机名称', dataIndex : 'DJ_NAME',  align : 'center',width:100}, 
					  { text : '维修类型', dataIndex : 'MEND_TYPE',  align : 'center',width:80}, 
					  { text : '问题描述', dataIndex : 'MEND_CONTEXT',  align : 'center',width:200}, 
					  { text : '录入人', dataIndex : 'INSERT_USERID',  align : 'center',width:80}, 
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


	Ext.data.StoreManager.lookup('gridStore').on('beforeload',function(store) {
		store.proxy.extraParams.plantcode_in = Ext.util.Cookies.get('v_orgCode');
		store.proxy.extraParams.departcode_in = Ext.util.Cookies.get('v_deptcode');
		store.proxy.extraParams.usercode_in = Ext.util.Cookies.get('v_personcode');
	});
	 

	Ext.getCmp('query').on('click',query);
	
	
	function query(){ gridStore.load(); } 
	
	
	Ext.getCmp('submit').on('click',submit);
	
	
	
	
    Ext.getCmp('edit').on('click',function(a,b,c,d){
		window.open(AppUrl + "page/DJ/DJ401edit.html?apply_id="+gridStore.getAt(c).get("APPLY_ID"),"", "dialogHeight:700px;dialogWidth:1100px");
  	  /*var returnVal =  window.showModalDialog(APP+"/page/DJ/DJ401edit.jsp?apply_id="+gridStore.getAt(c).get("APPLY_ID"), window, "dialogWidth=1200px;dialogHeight=550px");
		 if(returnVal!=null){
		 query();
		 }*/
   })
  
   Ext.getCmp('add').on('click',function(){
	   window.open(AppUrl + "page/DJ/DJ401add.html?plantcode="+Ext.util.Cookies.get('v_orgCode')+"&plantname="+Ext.util.Cookies.get('v_orgname2')+"&departcode="+Ext.util.Cookies.get('v_deptcode')+"&departname="+Ext.util.Cookies.get('v_deptname2')+"&confirm_flag_in=0","", "dialogHeight:700px;dialogWidth:1100px");
  	   /*var returnVal = window.showModalDialog(APP+"/page/DJ/DJ401add.jsp?plantcode="+Ext.util.Cookies.get("mm.plantcode")+"&plantname="+Ext.util.Cookies.get("mm.plantname")+"&departcode="+Ext.util.Cookies.get("mm.departcode")+"&departname="+Ext.util.Cookies.get("mm.departname")+"&confirm_flag_in=0", window, "dialogWidth=1200px;dialogHeight=550px");
  	   if(returnVal!=null){
  	   	  Ext.example.msg("提示",'添加成功');
          query();
       }*/
   })
	  
	  
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
							url: AppUrl + 'DJ/pro_dj401_submitapply',
							method : 'POST',
							async : false,
							params : {
								applyid_in:name.data.APPLY_ID
							},
							success : function(resp) {
								var resp = Ext.JSON.decode(resp.responseText);
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
			url: AppUrl + 'DJ/pro_dj401_deleteapply',
			method : 'POST',
			async : false,
			params : {
				applyid_in:gridStore.getAt(c).get("APPLY_ID")
			},
			success : function(resp) {
				var resp = Ext.JSON.decode(resp.responseText);
				if(selectedRecord.length-1==index){

					if(resp=="Success"){
						Ext.example.msg("提示",'操作成功');
						query();
					}else{
						Ext.example.msg("提示",'操作失败');
					}
				}
			}
		});

    });
    query();
});
