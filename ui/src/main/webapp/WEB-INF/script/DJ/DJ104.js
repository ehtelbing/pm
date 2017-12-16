var STATUS_ID = "";
var globl_code = '';
Ext.onReady(function() {

	var gridStore = Ext.create('Ext.data.Store',
			{
				storeId : 'gridStore',
				autoLoad : false,
				fields : [ 'MONEY_CLASS', 'MONEY_CLASS_DESC', 'STATUS' ],
				proxy : {
					type : 'ajax',
					url : AppUrl + 'DJ/pro_dj104_selectmoneyclass',
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
		style: 'background-color:#FFFFFF',
		baseCls: 'my-panel-no-border',
		padding: '10px 0px 10px 0px',
		titleAlign : 'left',
		region : 'north',
		layout : 'column',
		frame : true,
		items : [ {
			xtype : 'textfield',
			labelAlign : 'right',
			style : ' margin: 0px 0px 0px 5px',
			fieldLabel : '费用类型编号',
			value : '',
			id : 'fy_code',
			labelWidth : 80
		}, {
			xtype : 'textfield',
			labelAlign : 'right',
			style : ' margin: 0px 0px 0px 20px',
			value : '',
			fieldLabel : '费用类型描述',
			id : 'fy_desc',
			labelWidth : 80
		}, {
			xtype : 'button',
			id : 'add',
			text : '新  增',
			width : '60',
			icon : imgpath + '/add.png',
			style : ' margin: 0px 0px 0px 20px',
			listeners : {
				click : OnClickSubmitAdd
			}
		}, {
			xtype : 'button',
			id : 'search',
			text : '查  询',
			width : '60',
			icon : imgpath + '/search.png',
			style : ' margin: 0px 0px 0px 20px',
			listeners : {
                click : Query
			}
		} ]
	});
	var grid = Ext.create('Ext.grid.Panel', {
		store : 'gridStore',
		id : 'grid',
		columnLines : true,
		region : 'center',
		autoScroll : true,
		columns : [ {
			text : '费用类型',
			align : 'center',
			width : 240,
			dataIndex : 'MONEY_CLASS'
		}, {
			text : '费用类型描述',
			align : 'center',
			width : 320,
			dataIndex : 'MONEY_CLASS_DESC'
		}, {
			text : '状态',
			align : 'center',
			dataIndex : 'STATUS',
			width : 80
		}, {
			text : '启用',
			align : 'center',
			width : 80,
			renderer : renderer_start
		}, {
			text : '停用',
			align : 'center',
			renderer : right,
			width : 80,
			renderer : renderer_stop
		} , {
			text : '删除',
			align : 'center',
			renderer : right,
			width : 80,
			renderer : renderer_delete
		}],
		dockedItems : [ panel ]
	});
	Ext.create('Ext.container.Viewport', {
		layout : 'fit',
		items : [ grid ]
	});
});
function Query(){
	Ext.data.StoreManager.lookup('gridStore').load({
		params : {
		}
	});
}
function OnClickDelete() {
	Ext.Msg.confirm('提示', '是否删除?', function (button) {
        if (button == "yes"){
       	 OnClickSubmitDelete();
       	 }
        });
}
function OnStartButtonClicked(){
	globl_code =Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.MONEY_CLASS;

	Ext.Ajax.request({
		url: AppUrl + 'DJ/pro_dj104_startmoneyclass',
		method : 'post',
		async:false,
		params : {
			type_code_in:globl_code
		},
		success : function(response) {
			var resp=Ext.decode(response.responseText);
			if (resp.ret == 'Success') {
				alert('操作成功！');
				Query();
			}else {
				alert('操作失败！');
			}
		}

	});
}
function OnStopButtonClicked(){
	globl_code =Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.MONEY_CLASS;

	Ext.Ajax.request({
		url: AppUrl + 'DJ/pro_dj104_stopmoneyclass',
		method : 'post',
		async:false,
		params : {
			type_code_in:globl_code
		},
		success : function(response) {
			var resp=Ext.decode(response.responseText);
			if (resp.ret == 'Success') {
				alert('操作成功！');
				Query();
			}else {
				alert('操作失败！');
			}
		}

	});
}
function atleft(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return value;
}
function right(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:right;";
	return value;
}
function OnClickSubmitAdd() {
	if (Ext.getCmp('fy_code').getValue() == '') {
		Ext.Msg.alert('错误操作', '编号不能为空!')
	} else if (Ext.getCmp('fy_desc').getValue() == '') {
		Ext.Msg.alert('错误操作', '描述不能为空!')
	} else {

		Ext.Ajax.request({
			url: AppUrl + 'DJ/pro_dj104_addmoneyclass',
			method : 'post',
			async:false,
			params : {
				type_code_in:Ext.getCmp('fy_code').getValue(),
				describe_in:Ext.getCmp('fy_desc').getValue()
			},
			success : function(response) {
				var resp=Ext.decode(response.responseText);
				if (resp.ret == 'Success') {
					alert('操作成功！');
					Query();
				}else {
					alert('操作失败！');
				}
			}

		});
	}
}
function OnClickSubmitDelete() {
	globl_code =Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.MONEY_CLASS;
	Ext.Ajax.request({
		url: AppUrl + 'DJ/pro_dj104_deletemoneyclass',
		method : 'post',
		async:false,
		params : {
			type_code_in:globl_code
		},
		success : function(response) {
			var resp=Ext.decode(response.responseText);
			if (resp.ret == 'Success') {
				alert('操作成功！');
				Query();
			}else {
				alert('操作失败！');
			}
		}

	});
}

function renderer_start(value, metaData, record, rowIdx, colIdx, store, view) {
	var status =record.data.STATUS;
	if (status == '停用'){
	return "<img src='"
			+ imgpath
			+ "/flag1_16x16.gif' style='cursor:pointer' onclick='OnStartButtonClicked(\""
			+ record.data.MONEY_CLASS + "\")' />"
	}
	else{
		return '';
	}
}
function renderer_stop(value, metaData, record, rowIdx, colIdx, store, view) {
	var status =record.data.STATUS;
	if (status == '停用'){
		return '';
	}
	else{
	return "<img src='"
			+ imgpath
			+ "/flag2_16x16.gif' style='cursor:pointer' onclick='OnStopButtonClicked(\""
			+ record.data.MONEY_CLASS + "\")' />"
	}
}
function renderer_delete(value, metaData, record, rowIdx, colIdx, store, view) {
	return "<img src='"
			+ imgpath
			+ "/delete.png' style='cursor:pointer' onclick='OnClickDelete(\""
			+ record.data.MONEY_CLASS + "\")' />"
}
/*
 * function renderer_select(value, metaData, record, rowIdx, colIdx, store,
 * view) { return "<img src='" + imgpath + "/213148314.gif'
 * style='cursor:pointer' onclick='OnSelectButtonClicked(\"" +
 * record.data.SETTLE_STATUS + "\")' />" }
 */
