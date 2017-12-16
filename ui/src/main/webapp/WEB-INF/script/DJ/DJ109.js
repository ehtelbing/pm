var STATUS_ID = "";
var globl_code = '';
Ext.onReady(function() {
	var byqxlStore = Ext.create('Ext.data.Store', {
		autoLoad : true,
		storeId : 'byqxlStore',
		fields : [ 'BYQ_SERIES_CLASS', 'BYQ_SERIES_CLASS_DESC' ],
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj108_byqseries_able',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			},
			extraParams : {
			}
		}
	});
	var gridStore = Ext.create('Ext.data.Store',
			{
				storeId : 'gridStore',
				autoLoad : false,
				fields : [ 'BYQ_TYPE', 'BYQ_SERIES_CLASS',
				           'BYQ_SERIES_CLASS_DESC', 'BYQ_TYPE_STATUSDESC' ],
				proxy : {
					type : 'ajax',
					url : AppUrl + 'DJ/pro_dj109_selectbyqtype',
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
		layout : 'vbox',
		frame : true,
		items : [  {
			xtype : 'panel',
			region : 'west',
			frame : true,
			baseCls : 'my-panel-noborder',
			layout : 'hbox',
			items : [ {
				xtype : 'combo',
				labelAlign : 'right',
				style : ' margin: 00px 0px 0px 20px',
				fieldLabel : '变压器系列分类',
				editable : false,
				queryMode : 'local',
				displayField : 'BYQ_SERIES_CLASS_DESC',
				valueField : 'BYQ_SERIES_CLASS',
				id : 'seriestype',
				labelWidth : 100,
				store : 'byqxlStore'
			}, {
				xtype : 'textfield',
				labelAlign : 'right',
				style : ' margin: 0px 0px 0px 20px',
				fieldLabel : '变压器型号描述',
				id : 'byq_desc',
				labelWidth : 100
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
			},{
			    xtype : 'button',
			    id : 'search',
			    text : '查  询',
			    width : '60',
			    icon : imgpath + '/search.png',
			    style : ' margin: 0px 0px 0px 20px',
			    listeners : {
                click : Query
		       }
		    }]
		}]
	});
	var grid = Ext.create('Ext.grid.Panel', {
		store : 'gridStore',
		id : 'grid',
		columnLines : true,
		region : 'center',
		autoScroll : true,
		columns : [ {
			text : '电机型号',
			align : 'center',
			width : 120,
			dataIndex : 'BYQ_TYPE'
		}, {
			text : '系列分类',
			align : 'center',
			width : 320,
			dataIndex : 'BYQ_SERIES_CLASS_DESC'
		}, {
			text : '状态',
			align : 'center',
			dataIndex : 'BYQ_TYPE_STATUSDESC',
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
	Ext.data.StoreManager.lookup('byqxlStore').on('load', function(me) {
		Ext.getCmp("seriestype").select(me.first());
	});
	Ext.create('Ext.container.Viewport', {
		layout : 'fit',
		items : [ grid ]
	});
});
function Query(){
	Ext.data.StoreManager.lookup('gridStore').load({
		params : {
			series_class_in:Ext.getCmp("seriestype").getValue()
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
	globl_code =Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.BYQ_TYPE;

	Ext.Ajax.request({
		url: AppUrl + 'DJ/pro_dj109_startbyqtype',
		method : 'post',
		async:false,
		params : {
			byq_type_in:globl_code
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
	globl_code =Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.BYQ_TYPE;

	Ext.Ajax.request({
		url: AppUrl + 'DJ/pro_dj109_stopbyqtype',
		method : 'post',
		async:false,
		params : {
			byq_type_in:globl_code
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
	if (Ext.getCmp('byq_desc').getValue() == '') {
		Ext.Msg.alert('错误操作', '描述不能为空!')
	}  else {

		Ext.Ajax.request({
			url: AppUrl + 'DJ/pro_dj109_addbyqtype',
			method : 'post',
			async:false,
			params : {
				BYQ_type_in:Ext.getCmp('byq_desc').getValue(),
				describe_in:Ext.getCmp('seriestype').getValue()
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
	globl_code =Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.BYQ_TYPE;

	Ext.Ajax.request({
		url: AppUrl + 'DJ/pro_dj109_deletebyqtype',
		method : 'post',
		async:false,
		params : {
			byq_type_in:globl_code
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
	var status =record.data.BYQ_TYPE_STATUSDESC;
	if (status == '停用'){
	return "<img src='"
			+ imgpath
			+ "/flag1_16x16.gif' style='cursor:pointer' onclick='OnStartButtonClicked(\""
			+ record.data.BYQ_TYPE + "\")' />"
	}
	else{
		return '';
	}
}
function renderer_stop(value, metaData, record, rowIdx, colIdx, store, view) {
	var status =record.data.BYQ_TYPE_STATUSDESC;
	if (status == '停用'){
		return '';
	}
	else{
	return "<img src='"
			+ imgpath
			+ "/flag2_16x16.gif' style='cursor:pointer' onclick='OnStopButtonClicked(\""
			+ record.data.BYQ_TYPE + "\")' />"
	}
}
function renderer_delete(value, metaData, record, rowIdx, colIdx, store, view) {
	return "<img src='"
			+ imgpath
			+ "/delete.png' style='cursor:pointer' onclick='OnClickDelete(\""
			+ record.data.BYQ_TYPE + "\")' />"
}
/*
 * function renderer_select(value, metaData, record, rowIdx, colIdx, store,
 * view) { return "<img src='" + imgpath + "/213148314.gif'
 * style='cursor:pointer' onclick='OnSelectButtonClicked(\"" +
 * record.data.SETTLE_STATUS + "\")' />" }
 */
