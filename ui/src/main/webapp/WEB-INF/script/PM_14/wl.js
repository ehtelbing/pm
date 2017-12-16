/// <reference path="../Shared/ext-all-debug-w-comments.js" />
var I_ID = -1;
var V_ORDERGUID = null;
var V_GUID = null;
var flag = '';
if (location.href.split('?')[1] != undefined) {
	V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
    V_GUID = Ext.urlDecode(location.href.split('?')[1]).V_GUID;
}

if (location.href.split('?')[1] != undefined) {
	flag = Ext.urlDecode(location.href.split('?')[1]).flag;
}

var gridStore = Ext.create('Ext.data.Store',
	{
		id : 'gridStore',
		autoLoad : true,
		fields : [
			'V_GUID',
				'V_SPAREPART_CODE',
				'V_SPAREPART_NAME',
				'V_TYPE',
				'V_UNIT',
				'V_PRICE',
				'V_NUMBER'],
		proxy : {
			type : 'ajax',
			url : APP + '/ModelSelect',
			actionMethods : {
				read : 'POST'
			},
			extraParams : {
				parName : [ 'V_V_ORDERGUID' ,'V_V_SPAREPART_CODE'],
				parType : [ 's' ,'s'],
				parVal : [ V_ORDERGUID,'%' ],
				proName : 'PM_14_FAULT_SPARE_ITEM_SEL',
				cursorName : 'V_CURSOR'
				// V_V_ORDERGUID : document.getElementById('V_ORDERGUID').value
			},
			reader : {
				type : 'json',
				root : 'list'
			}
		}
	});

var gridStore2 = Ext.create('Ext.data.Store', {
	id : 'gridStore2',
	autoLoad : true,
	fields : [ 'V_MATERIALCODE', 'V_MATERIALNAME', 'I_PLANAMOUNT',
		'I_ACTUALAMOUNT', 'I_WORKNUM' ],
	proxy : {
		type : 'ajax',
		url : APP + '/ModelSelect',
		actionMethods : {
			read : 'POST'
		},
		extraParams : {
			parName : [ 'V_V_ORDERGUID' ],
			parType : [ 's' ],
			parVal : [ V_ORDERGUID ],
			proName : 'PRO_WORKORDER_SPARE_ZY',
			cursorName : 'V_CURSOR'
			// V_V_ORDERGUID : document.getElementById('V_ORDERGUID').value
		},
		reader : {
			type : 'json',
			root : 'list'
		}
	}
});

var gridPart1Panel = Ext.create('Ext.grid.Panel', {
	id : 'grid',
	flex : 1,
	// height : window.screen.height/2-50,
	height : 300,
	store : 'gridStore',
	columnLines : true,
	selType : 'checkboxmodel',
	multiSelect : true,
	autoScroll : true,
	width : window.screen.width / 2 - 50,
	plugins : [ Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit : 1
		//listeners : {
		//	edit : OnChangePlanAmount
		//}
	}) ],
	columns : [
		{
			text : '序号',
			xtype : 'rownumberer',
			align : 'center',
			width : 40
		},
		{
			text : '工序',
			width : 50,
			align : 'center',
			dataIndex : 'V_ACTIVITY',
			renderer : AddFloat
		},
		{
			text : '物料编码',
			flex : 2,
			align : 'center',
			dataIndex : 'V_SPAREPART_CODE',
			renderer : AddFloat
		},
		{
			text : '物料描述',
			flex : 4,
			align : 'center',
			dataIndex : 'V_SPAREPART_NAME',
			renderer : AddFloat
		},
		{
			text : '单位',
			width : 40,
			align : 'center',
			dataIndex : 'V_UNIT',
			renderer : AddFloat
		},
		{
			text : '计划数量',
			width : 60,
			align : 'center',
			dataIndex : 'V_NUMBER',
			field : {
				id : 'jhsl',
				xtype : 'numberfield',
				minValue : 0.0001
			},
			renderer : IsEdit
		},
		{
			text : '计划总金额',
			width : 80,
			align : 'center',
			dataIndex : 'V_PRICE',
			renderer : function(value, metaData, record, rowIdx, colIdx,
								store, view) {
				return '<div style="text-align:right;">'
					+ Ext.util.Format.usMoney(record
						.get('I_PLANAMOUNT')
					* record.get('F_UNITPRICE')) + '</div>';
			}
		}, {
			text : '备注',
			width : 160,
			align : 'center',
			dataIndex : 'V_MEMO',
			field : {
				id : 'mem',
				xtype : 'textfield'
			},
			renderer : AddFloat
		} ],
	features : [ {
		ftype : 'summary'
	} ],
	dockedItems : [ {
		xtype : 'panel',
		height : 30,
		layout : 'column',
		frame : true,
		items : [ {
			xtype : 'button',
			text : '删除',
			style : 'margin:0px 20px  0px 20px',
			icon : '../../Themes/gif/delete.png',
			width : 80,
			listeners : {
				click : OnClickDeleteButton
			}
		}, {
			xtype : 'button',
			text : '添加完成',
			id : 'btnOK',
			icon : '../../Themes/gif/saved.png',
			width : 100,
			style : 'margin:0 20px 0 20px',
			listeners : {
				click : OnClickAddFinishButton
			}
		} ]
	} ]
});

var framePanel = Ext.create('Ext.panel.Panel', {

	id : 'framePanel',
	width : '100%',
	layout : 'fit',
	flex : 5,
	html : '<iframe frameborder="0" width="100%" height="100%"  src="' + AppUrl
	+ '/sbgz/wl2.jsp?V_ORDERGUID=' + V_ORDERGUID +'&V_GUID='+V_GUID
	+ '"></iframe>'

});

var gridPart2Panel = Ext.create('Ext.grid.Panel', {
	flex : 1,
	title : '物料预留信息',
	id : 'grid2',
	height : 300,
	// height : window.screen.height/2-50,
	store : '',
	autoScroll : true,
	width : window.screen.width / 2 - 50,
	xtype : 'gridPanel',
	columns : [ {
		text : '物料编码',
		flex : 2,
		align : 'center',
		dataIndex : 'V_MATERIALCODE',
		renderer : AddFloat
	}, {
		text : '物料名称',
		flex : 4,
		align : 'center',
		dataIndex : 'V_MATERIALNAME',
		renderer : AddFloat
	}, {
		text : '已计划',
		align : 'center',
		width : 60,
		dataIndex : 'I_PLANAMOUNT',
		renderer : AddRight
	}, {
		text : '已领用',
		align : 'center',
		width : 60,
		dataIndex : 'I_ACTUALAMOUNT',
		renderer : AddRight
	}, {
		text : '相关工单',
		align : 'center',
		width : 70,
		dataIndex : 'I_WORKNUM',
		renderer : function(value) {
			return '<a href="javascript:WatchOrder();">' + value + '</a>';
		}
	} ]
});

var gridPanel = Ext.create('Ext.panel.Panel', {
	region : 'north',
	layout : 'hbox',
	width : '100%',
	items : [ gridPart1Panel, gridPart2Panel ]
});

var windowPanel = Ext.create('Ext.window.Window', {
	id : 'windowPanel',
	closeAction : 'hide',
	modal : true,
	width : '100%',
	height : 510,
	html : '<iframe frameborder="0" width="100%" height="100%"  src="' + AppUrl
	+ '/No410701020501/Index.html' + '" scrolling="yes"></iframe>'
});

//删除
function OnClickDeleteButton() {
	var selectModel = Ext.getCmp('grid').getSelectionModel();
	if (!selectModel.hasSelection()) {
		Ext.MessageBox.alert('操作信息', '请选择要删除的信息.');
		return;
	}
	Ext.Msg
		.confirm(
		"警告",
		"确定要删除吗？",
		function(button) {
			if (button != "yes") {
				return;
			}
			var i = Ext.getCmp('grid').getSelectionModel()
				.getSelection().length;
			for (i = 0; i < Ext.getCmp('grid').getSelectionModel()
				.getSelection().length; i++) {
				Ext.Ajax
					.request({
						url : APP + '/ModelChange',
						// url :
						// '/No41070102/PRO_PM_WORKORDER_SPARE_DEL',
						async : false,
						params : {
							parName : [ 'V_V_GUID','V_V_SPAREPART_CODE'],
							parType : [ 's' ],
							parVal : [V_GUID, selectModel
								.getSelection()[i].data.I_ID ],
							proName : 'PM_14_FAULT_SPARE_ITEM_DEL',
							returnStr : [ 'V_CURSOR' ],
							returnStrType : [ 's' ]
							// V_I_ID :
							// selectModel.getSelection()[i].data.I_ID
						},
						success : function(response) {
							var resp = Ext.JSON
								.decode(response.responseText);
							Ext.MessageBox.alert('操作信息',
								'删除成功', resp);
						}
					});
			}
			Ext.ComponentManager.get('grid').getStore().load();
			Ext.ComponentManager.get('grid2').getStore().load();
		});
	var selectModel = Ext.getCmp('grid').getSelectionModel();
	if (!selectModel.hasSelection()) {
		Ext.MessageBox.alert('操作信息', '请选择要删除的信息.');
		return;
	}
	Ext.Msg
		.confirm(
		"警告",
		"确定要删除吗？",
		function(button) {
			if (button != "yes") {
				return;
			}
			var i = Ext.getCmp('grid').getSelectionModel()
				.getSelection().length;
			for (i = 0; i < Ext.getCmp('grid').getSelectionModel()
				.getSelection().length; i++) {
				Ext.Ajax
					.request({
						url : APP + '/ModelChange',
						// url:
						// '/No41070102/PRO_PM_WORKORDER_SPARE_DEL',
						async : false,
						params : {
							parName : [ 'V_I_ID' ],
							parType : [ 's' ],
							parVal : [ selectModel
								.getSelection()[i].data.I_ID ],
							proName : 'PRO_PM_WORKORDER_SPARE_DEL',
							returnStr : [ 'V_CURSOR' ],
							returnStrType : [ 's' ]
						},
						success : function(response) {
							// var resp = Ext.JSON
							// .decode(response.responseText);
							// Ext.example
							// .msg('操作信息', '{0}', resp);
						}
					});
			}
			Ext.ComponentManager.get('grid').getStore().load();
			Ext.ComponentManager.get('grid2').getStore().load();
		});
}

function OnClickMatCodeText(threeParams) {
	Ext.getCmp('grid').getPlugin().completeEdit();
	if (threeParams != '' && threeParams != null) {
		var str = threeParams;
		var strs = [];
		strs = threeParams.split('^');
		Ext.Ajax.request({
			url : APP + '/ModelChange',
			// url : '/No41070102/PRO_PM_WORKORDER_SPARE_SET',
			method : 'POST',
			async : false,
			params : {
				parName : [ 'V_I_ID', 'V_V_ORDERGUID', 'V_V_FETCHORDERGUID',
					'V_V_ACTIVITY', 'V_V_MATERIALCODE', 'V_V_MATERIALNAME',
					'V_V_SPEC', 'V_V_UNIT', 'V_F_UNITPRICE',
					'V_I_PLANAMOUNT', 'V_F_PLANMONEY', 'V_I_ACTUALAMOUNT',
					'V_F_ACTUALMONEY', 'V_V_TYPE', 'V_V_MEMO',
					'V_V_SUBTYPE', 'V_V_STATUS', 'V_I_ABANDONEDAMOUNT',
					'V_I_RECLAIMEDAMOUNT', 'V_I_FIXEDAMOUNT', 'V_V_ID' ],
				parType : [ 'do', 's', 's', 's', 's', 's', 's', 's', 'do',
					'do', 'do', 'do', 'do', 's', 's', 's', 's', 'do', 'do',
					'do', 's' ],
				parVal : [ '-1', V_ORDERGUID, '', strs[5], strs[0], strs[1],
					strs[4], strs[2], strs[3], '1', strs[3], '0', '0', '',
					'', '', '', '0', '0', '0', '' ],
				proName : 'PRO_PM_WORKORDER_SPARE_SET'
			},
			success : function(response) {
				Ext.getCmp('grid').getStore().load();
				Ext.getCmp('grid2').getStore().load();
			}
		});
	}

}

function OnClickYZJText(moreParams) {
	Ext.getCmp('grid').getPlugin().completeEdit();
	if (moreParams != '' && moreParams != null) {
		var str = moreParams;
		var strs = [];
		strs = moreParams.split('^');
		Ext.Ajax.request({
			url : APP + '/ModelChange',
			// url : '/No41070102/PRO_PM_WORKORDER_SPARE_SET',
			method : 'POST',
			async : false,
			params : {
				parName : [ 'V_I_ID', 'V_V_ORDERGUID', 'V_V_FETCHORDERGUID',
					'V_V_ACTIVITY', 'V_V_MATERIALCODE', 'V_V_MATERIALNAME',
					'V_V_SPEC', 'V_V_UNIT', 'V_F_UNITPRICE',
					'V_I_PLANAMOUNT', 'V_F_PLANMONEY', 'V_I_ACTUALAMOUNT',
					'V_F_ACTUALMONEY', 'V_V_TYPE', 'V_V_MEMO',
					'V_V_SUBTYPE', 'V_V_STATUS', 'V_I_ABANDONEDAMOUNT',
					'V_I_RECLAIMEDAMOUNT', 'V_I_FIXEDAMOUNT', 'V_V_ID' ],
				parType : [ 'do', 's', 's', 's', 's', 's', 's', 's', 'do',
					'do', 'do', 'do', 'do', 's', 's', 's', 's', 'do', 'do',
					'do', 's' ],
				parVal : [ '-1', V_ORDERGUID, '', strs[0], strs[1], strs[2],
					strs[3], strs[4], '0', '1', '0', '1', '0', strs[5],
					strs[6], 'yzj', '', '0', '0', '0', '' ],
				proName : 'PRO_PM_WORKORDER_SPARE_SET'
			},
			success : function(response) {

				Ext.Ajax.request({
					url : APP + '/ModelChange',
					method : 'POST',
					async : false,
					params : {
						parName : [ 'V_I_ID' ],
						parType : [ 's' ],
						parVal : [ strs[5] ],
						proName : 'PRO_PM_PRELOADWARE_SELECT_SET'
					},
					success : function(resp) {
					}
				});

				Ext.getCmp('grid').getStore().load();
				Ext.getCmp('grid2').getStore().load();
			}
		});
	}

}

function OnClickJPText(moreParams) {
	Ext.getCmp('grid').getPlugin().completeEdit();
	if (moreParams != '' && moreParams != null) {
		var str = moreParams;
		var strs = [];
		strs = moreParams.split('^');
		Ext.Ajax.request({
			url : APP + '/ModelChange',
			// url : '/No41070102/PRO_PM_WORKORDER_SPARE_SET',
			method : 'POST',
			async : false,
			params : {
				parName : [ 'V_I_ID', 'V_V_ORDERGUID', 'V_V_FETCHORDERGUID',
					'V_V_ACTIVITY', 'V_V_MATERIALCODE', 'V_V_MATERIALNAME',
					'V_V_SPEC', 'V_V_UNIT', 'V_F_UNITPRICE',
					'V_I_PLANAMOUNT', 'V_F_PLANMONEY', 'V_I_ACTUALAMOUNT',
					'V_F_ACTUALMONEY', 'V_V_TYPE', 'V_V_MEMO',
					'V_V_SUBTYPE', 'V_V_STATUS', 'V_I_ABANDONEDAMOUNT',
					'V_I_RECLAIMEDAMOUNT', 'V_I_FIXEDAMOUNT', 'V_V_ID' ],
				parType : [ 'do', 's', 's', 's', 's', 's', 's', 's', 'do',
					'do', 'do', 'do', 'do', 's', 's', 's', 's', 'do', 'do',
					'do', 's' ],
				parVal : [ '-1', V_ORDERGUID, '', strs[0], strs[1], strs[2],
					strs[3], strs[4], strs[5], strs[6], strs[7], strs[6],
					strs[7], strs[8], '', 'jp', '', '0', '0', '0', '' ],
				proName : 'PRO_PM_WORKORDER_SPARE_SET'
			},
			success : function(response) {

				Ext.Ajax.request({
					url : APP + '/ModelChange',
					method : 'POST',
					async : false,
					params : {
						parName : [ 'V_I_ID' ],
						parType : [ 's' ],
						parVal : [ strs[8] ],
						proName : 'PRO_PM_WORKORDER_JIP_SELECT'
					},
					success : function(resp) {
					}
				});

				Ext.getCmp('grid').getStore().load();
				Ext.getCmp('grid2').getStore().load();
			}
		});
	}

}

function OnClickKCText(moreParams) {
	Ext.getCmp('grid').getPlugin().completeEdit();
	if (moreParams != '' && moreParams != null) {
		var str = moreParams;
		var strs = [];
		strs = moreParams.split('^');
		Ext.Ajax.request({
			url : APP + '/ModelChange',
			// url : '/No41070102/PRO_PM_WORKORDER_SPARE_SET',
			method : 'POST',
			async : false,
			params : {
				parName : [ 'V_V_GUID', 'V_V_SPAREPART_CODE', 'V_V_SPAREPART_NAME',
					'V_V_TYPE', 'V_V_UNIT', 'V_V_PRICE', 'V_V_NUMBER'],
				parType : [ 's', 's', 's', 's', 's', 's', 's'],
				parVal : [V_GUID,strs[1], strs[2], strs[3],
					strs[4], strs[5], '1'],
				proName : 'PM_14_FAULT_SPARE_ITEM_SET'
			},
			success : function(response) {

				Ext.getCmp('grid').getStore().load();
			}
		});
	}

}

function OnClickAddFinishButton(){
	var retdata = [];
	for(var i=0;i<Ext.getCmp('grid').getStore().data.length;i++){
		retdata.push(Ext.getCmp('grid').getStore().data[i].V_SPAREPART_CODE);
		retdata.push(Ext.getCmp('grid').getStore().data[i].V_SPAREPART_NAME);
	}

	window.opener.getReturnMaterial(retdata);
	window.close();
}

function IsEdit(value, metaData, record, rowIndex, colIndex, store, view) {
	if (record.raw.V_SUBTYPE == 'yzj') {
		store.data.getAt(rowIndex).data.I_PLANAMOUNT = '1';
		return '<div style="text-align:right;" data-qtip="' + '1' + '" >' + '1'
			+ '</div>';
	} else if (record.raw.V_SUBTYPE == 'jp') {
		store.data.getAt(rowIndex).data.I_PLANAMOUNT = record.raw.I_PLANAMOUNT;
		return '<div style="text-align:right;" data-qtip="'
			+ record.raw.I_PLANAMOUNT + '" >' + record.raw.I_PLANAMOUNT
			+ '</div>';
	} else {
		return '<div style="text-align:right;" data-qtip="' + value + '" >'
			+ value + '</div>';
	}
}

function AddFloat(value, metaData, record, rowIndex, colIndex, store, view) {
	return '<div data-qtip="' + value + '" style="text-align:left;" >' + value
		+ '</div>';
}

function AddRight(value, metaData, record, rowIndex, colIndex, store, view) {
	return '<div data-qtip="' + value + '" style="text-align:right;" >' + value
		+ '</div>';
}

Ext.onReady(function() {
	if (flag == "delete") {
		Ext.create('Ext.container.Viewport', {
			xtype : 'panel',
			width : '100%',
			layout : 'vbox',
			items : [ gridPanel ]
		});

	} else {
		Ext.create('Ext.container.Viewport', {
			xtype : 'panel',
			width : '100%',
			layout : 'vbox',
			items : [ gridPanel, framePanel ]
		});
	}

	if (flag == "delete") {
		Ext.getCmp('btnOK').setVisible(false);
	} else {
		Ext.getCmp('btnOK').setVisible(true);
	}
});

function OnChangePlanAmount(editor, e, eOpts) {
	var str = e.record.data.F_UNITPRICE * e.record.data.I_PLANAMOUNT;

	Ext.Ajax
		.request({
			type : 'ajax',
			url : APP + '/ModelChange',
			method : 'POST',
			async : false,
			params : {
				parName : [ 'V_I_ID', 'V_V_ORDERGUID',
					'V_V_FETCHORDERGUID', 'V_V_ACTIVITY',
					'V_V_MATERIALCODE', 'V_V_MATERIALNAME', 'V_V_SPEC',
					'V_V_UNIT', 'V_F_UNITPRICE', 'V_I_PLANAMOUNT',
					'V_F_PLANMONEY', 'V_I_ACTUALAMOUNT',
					'V_F_ACTUALMONEY', 'V_V_TYPE', 'V_V_MEMO',
					'V_V_SUBTYPE', 'V_V_STATUS', 'V_I_ABANDONEDAMOUNT',
					'V_I_RECLAIMEDAMOUNT', 'V_I_FIXEDAMOUNT', 'V_V_ID' ],
				parType : [ 'do', 's', 's', 's', 's', 's', 's', 's', 'do',
					'do', 'do', 'do', 'do', 's', 's', 's', 's', 'do',
					'do', 'do', 's' ],
				parVal : [ e.record.data.I_ID, V_ORDERGUID, '',
					e.record.data.V_ACTIVITY,
					e.record.data.V_MATERIALCODE,
					e.record.data.V_MATERIALNAME, e.record.data.I_ID,
					e.record.data.V_UNIT, e.record.data.F_UNITPRICE,
					e.record.data.I_PLANAMOUNT, str, '0', '0', '', '',
					'', '', '0', '0', '0', '' ],
				proName : 'PRO_PM_WORKORDER_SPARE_SET',
				cursorName : 'V_CURSOR'
			},
			success : function(response) {
			}
		});

	Ext.getCmp('grid2').getStore().load();
}

function WatchOrder() {
	var urlOrder = AppUrl
		+ '/No410701020501/Index.html?V_ORDERGUID='
		+ V_ORDERGUID
		+ '&V_MATERIALCODE='
		+ Ext.getCmp("grid2").getSelectionModel().getSelection()[0].data.V_MATERIALCODE
		+ '';

	Ext.getCmp('windowPanel').html = '<iframe frameborder="0" width="100%" height="100%" id="OrderDescFrame"  src="'
	+ urlOrder + '" scrolling="yes"></iframe>';
	Ext.getCmp('windowPanel').show();
}