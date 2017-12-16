Ext.onReady(function() {

	var gridStore = Ext.create('Ext.data.Store', {
		autoLoad : false,
		storeId : 'gridStore',
		fields : [ 'ORDER_STATUS',
		           'ORDER_STATUS_DESC',
		           'USE_FLAG',
		           'NEXT_STATUS',
		           'FINISH_FLAG',	
		           'START_FLAG'
		           ],
		proxy : {
			type : 'ajax',
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


	var panel = Ext.create('Ext.panel.Panel', {
		id : 'panel',
		region : 'north',
		width : '100%',
		frame : true,
		layout : 'hbox',
		items : [ {
			xtype : 'textfield',
			fieldLabel : '检修状态',
			labelAlign : 'right',
			labelWidth : 70,
			id:'jxzt'
		},
		{ xtype: 'button',
			   text: '查  询',
			   width: 90,
			   border: 1,
			   style: { margin: '0px 0 4px 15px'},
			   handler : function() {
					onSearch();
			   }
		},
			{ xtype: 'button',
			  text: '新增',
			  width: 90,
			  border: 1,
			  style: { margin: '0px 0 4px 15px'},
			  handler : function() {
					onAdd();
				}
		}	
		]
	});

	var grid = Ext.create('Ext.grid.Panel', {
		title:"检修状态配置",flex:1,
		//region : 'center',
		id : 'grid',
		columnLines : true,
		width:700,
		autoScroll : true,
		store : gridStore,
		pageSize : 200,
		columns : [ 
		{
			text : '检修状态描述',
			align : 'center',
			dataIndex : 'ORDER_STATUS_DESC'
		},
		{
			text : '是否可用',
			align : 'center',
			dataIndex : 'USE_FLAG',
			renderer:isflage,
			id:'sf'
		},
		{
			text : '选择',
			align : 'center',
			renderer:Check,
			id:'sel'
		},
		{
			text : ' ',
			align : 'center',
			renderer : LookMore
		}],
		dockedItems:[panel]
	});

	Ext.create('Ext.container.Viewport', {
		layout : 'vbox',
		//autoScroll : true,
		items : [ grid ]
	});
});

function onAdd() {
		var dialog = window.showModalDialog(AppUrl + "/DJ/DJ703_add.jsp", null,
				"dialogHeight:500px;dialogWidth:650px");
		onSearch();
}
	
function onSearch() {
	Ext.data.StoreManager.lookup('gridStore').load({
		params:{
			parName : [ 'v_orderdesc' ],
			parType : [ 's' ],
			parVal : [Ext.getCmp('jxzt').getValue()],
			proName : 'pro_dj703_select',
			cursorName : 'v_cursor'
		}
	})
}

function Check(value, metaData, record, rowIdx, colIdx, store, view){
	if(record.data.USE_FLAG==1){
		return "<input type='checkbox' name='radio' onchange='RadioChange(\"" + rowIdx+ "\")' checked='checked' />";
	}else{
		return "<input type='checkbox' name='radio' onchange='RadioChange(\"" + rowIdx+ "\")'/>";
	}
	
}

function RadioChange(rowid){
	var status=Ext.getCmp('grid').store.data.getAt(rowid).data.ORDER_STATUS;
	var flag=Ext.getCmp('grid').store.data.getAt(rowid).data.USE_FLAG;
	var valfalg=0;
	if(flag==1){
		valfalg=0;
	}else{
		valfalg=1;
	}
 	Ext.Ajax.request({
		url : APP + '/ModelChange',
		type : 'ajax',
		async : false,
		method : 'POST',
		params : {
			parName : [ 'v_ordersts','v_flag' ],
			parType : [ 's' ,'i'],
			parVal : [ status,valfalg],
			proName : 'pro_dj703_updateflag',
			returnStr : [ 'ret' ],
			returnStrType : [ 's' ]
		},
		success : function(response) {
			var resp = Ext.decode(response.responseText);
			if (resp[0] != "success") {
				Ext.example.msg('提示', "操作成功！");
				onSearch();
			} else {
				Ext.example.msg('提示', "操作失败！");
			}
		}
	});
	
}

function isflage(value, metaData, record, rowIdx, colIdx, store, view){
	if(value==1){
		return "是";
	}else{
		return "否";
	}
	
}
function LookMore(value, metaData, record, rowIdx,
		colIdx, store, view) {
	return "<a onclick='delFixContent(\"" + rowIdx+ "\")' style='color:blue'>删除</a>";
}


function delFixContent(rowIdx){
	var id = Ext.data.StoreManager.lookup('gridStore').data.getAt(rowIdx).data.ORDER_STATUS;
	Ext.Ajax.request({
		url : APP + '/ModelChange',
		type : 'ajax',
		async : false,
		method : 'POST',
		params : {
			parName : [ 'v_ordersts' ],
			//order_Status_IN
			parType : [ 's' ],
			parVal : [ id ],
			proName : 'pro_dj703_delete',
			returnStr : [ 'ret' ],
			returnStrType : [ 's' ]
		},
		success : function(response) {
			var resp = Ext.decode(response.responseText);
			if (resp[0] != "success") {
				Ext.example.msg('提示', "操作成功！");
			} else {
				Ext.example.msg('提示', "操作失败！");
			}
		}
	});
	onSearch();
}