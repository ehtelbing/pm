/// <reference path="../Shared/ext-all-debug-w-comments.js" />
var V_ORDERGUID = null;
var V_DEPTCODEREPARIR = null;
if (location.href.split('?')[1] != undefined) {
	V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
	V_DEPTCODEREPARIR = Ext.urlDecode(location.href.split('?')[1]).V_DEPTCODEREPARIR;
}
var activityStore = Ext.create('Ext.data.Store', {
	id : 'activityStore',
	autoLoad : true,
	fields : [ 'V_ACTIVITY' ],
	proxy : {
		type : 'ajax',
		url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_ACTIVITY',
		actionMethods : {
			read : 'POST'
		},
		extraParams : {
			V_V_ORDERGUID:V_ORDERGUID
		},
		reader : {
			type : 'json',
			root : 'list'
		}
	}
});

var gridStore = {
	id : 'gridStore',
	autoLoad : true,
	fields : [ 'V_ACTIVITY', 'V_PERSONNAME', 'V_PERSONTYPENAME', 'I_WORKHOUR',
			'V_PERSONTYPECODE', 'V_PERSONCODE', 'I_ID' ],
	proxy : {
		type : 'ajax',
		url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_HOURS_VIEW',
		actionMethods : {
			read : 'POST'
		},
		extraParams : {
			V_V_ORDERGUID:V_ORDERGUID
		},
		reader : {
			type : 'json',
			root : 'list'
		}
	}
};

var titlePanel = {
	region : 'north',
	//height : 50,
	frame:true,
	items : [ {
		xtype : 'button',
		text : '完成返回',
		id : 'btnFinBack',
		width : 100,
		style : 'margin:5px 0px 5px 10px',
		pressed : true,
		listeners : {
			click : OnClickFiniBackButton
		}
	} ]
};
var repTree=Ext.create('Ext.data.TreeStore', {
	id : 'repTree',
	autoLoad : false,
	fields : [ 'sid', 'text', 'parentid','craftcode','craftname'  ]
//	proxy : {
////		type : 'ajax',
////		url : APP + '/Home/DeptRepairPersonTree',
////		// url: '/No41020101/ReturnDeptRepairPersonTree',
////		actionMethods : {
////			read : 'POST'
////		},
////		async : false,
////		extraParams : {
////			V_V_DEPTCODE : V_DEPTCODEREPARIR
////		}
//		type : 'ajax',
//		actionMethods : {
//			read : 'POST'
//		},
//		async : false,
//		url : APP + '/No41020101Tree',
//		reader : {
//			type : 'json'
//		},
//		root : {
//			expanded : true
//		}
////		,
////		extraParams : {
////			ORDER_ID:V_ORDERGUID,
////			WORK_ID:Ext.getCmp('selActi').getValue(),
////			DEPARTCODE:V_DEPTCODEREPARIR
////		}
//	}
});
var layoutPanel = {
	region : 'center',
	xtype : 'panel',
	layout : 'border',
	items : [ {
		xtype : 'gridpanel',
		id : 'grid',
		region : 'center',
		store : gridStore,
		columnLines : true,
		plugins : [ Ext.create('Ext.grid.plugin.CellEditing', {
			clicksToEdit : 1
		}) ],
		columns : [ {
			xtype : 'rownumberer',
			text : '序号',
			width : 50
		}, {
			text : '工序',
			dataIndex : 'V_ACTIVITY'
		}, {
			text : '人员名称',
			dataIndex : 'V_PERSONNAME'
		},

		{
			text : '工种',
			dataIndex : 'V_PERSONTYPENAME'
		}, {
			text : '工时',
			dataIndex : 'I_WORKHOUR',
			field : {
				id : 'gs',
				xtype : 'numberfield',
				minValue : 1
			}
		}, {
			xtype : 'actioncolumn',
			width : 50,
			text : '删除',
			listeners : {
				click : OnClickDeleteIcon
			},
			items : [ {
				icon : '../../Themes/gif/delete1.png',
				text : '删除',
				tooltip : '删除'
			} ]
		} ],
		dockedItems : [ {
			xtype : 'toolbar',
			dock : 'top',
			//margin:'5px',
			items : [ {
				xtype : 'combo',
				id : 'selActi',
				store : activityStore,
				displayField : 'V_ACTIVITY',
				valueField : 'V_ACTIVITY',
				queryMode: 'local'
			} ]
		} ]
	}, {
		xtype : 'treepanel',
		region : 'west',
		title : '检修单位树',
		width : 200,
		rootVisible : false,
		listeners : {
			itemclick : OnClickTreeItem
		},
		id : 'treeID',
		store : repTree
	} ]

};

function OnClickTreeItem(aa, record, item, index, e, eOpts) {
	if (record.data.leaf == true && record.data.parentid != '-1') {
		Ext.Ajax.request({
					url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_HOURS_SET',
					method : 'POST',
					async : false,
					params : {
						'V_I_ID':'-1',
						'V_ORDERGUID':V_ORDERGUID,
						'V_V_PERSONTYPECODE':record.data.craftcode,
						'V_V_PERSONTYPENAME':record.data.craftname,
						'V_V_PERSONCODE':record.data.sid,
						'V_V_PERSONNAME':record.data.text,
						'V_I_WORKHOUR':'1',
						'V_V_ACTIVITY':Ext.getCmp('selActi').getValue(),
						'V_D_BEGINTIME':'',
						'V_D_ENDTIME':''
					},
					success : function(response) {
						//Ext.example.msg('操作信息', '{0}', Ext.JSON.decode(response.responseText));
						Ext.getCmp('grid').getStore().load();
					}
				});
	}
}

function OnClickDeleteIcon(grid, rowIndex, colIndex) {
	Ext.Msg.confirm('警告', '您确定要删除该信息?', function(button) {
		if (button != 'yes') {
			return false;
		} else {
			Ext.Ajax.request({
				url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_HOURS_DEL',
				method : 'POST',
				async : false,
				params : {
					V_I_ID: Ext.data.StoreManager.get('gridStore').data.getAt(colIndex).raw.I_ID
				},
				success : function(response) {
					var resp = Ext.JSON.decode(response.responseText);
					Ext.Msg.alert('操作信息','删除成功');
				}
			});
			Ext.ComponentManager.get('grid').getStore().load();
		}
	});
}

function OnClickFiniBackButton() {
	var ss = Ext.data.StoreManager.get('gridStore');
	if (ss.data.length > 0) {
		var ModifyRecord = Ext.data.StoreManager.get('gridStore').getModifiedRecords();
		if (ModifyRecord.length > 0) {
			for ( var i = 0; i < ModifyRecord.length; i++) {
				Ext.Ajax.request({
					url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_HOURS_SET',
					method : 'POST',
					async : false,
					params : {
						'V_I_ID':ModifyRecord[i].data.I_ID,
						'V_ORDERGUID':V_ORDERGUID,
						'V_V_PERSONTYPECODE':ModifyRecord[i].data.V_PERSONTYPECODE,
						'V_V_PERSONTYPENAME':ModifyRecord[i].data.V_PERSONTYPENAME,
						'V_V_PERSONCODE':ModifyRecord[i].data.V_PERSONCODE,
						'V_V_PERSONNAME':ModifyRecord[i].data.V_PERSONNAME,
						'V_I_WORKHOUR':ModifyRecord[i].data.I_WORKHOUR,
						'V_V_ACTIVITY':Ext.getCmp('selActi').getValue(),
						'V_D_BEGINTIME':'',
						'V_D_ENDTIME':''
					},
					success : function(response) {

					}
				});
			}
		}
	} else {
	}

	Ext.Ajax.request({
		url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_HOURS_RETURN',
		method : 'POST',
		async : false,
		params : {
			V_V_ORDERGUID:V_ORDERGUID
		},
		success : function(response) {
			var resp = Ext.JSON.decode(response.responseText);
			//Ext.example.msg('操作信息', '{0}', resp);
		}
	});
	window.close();
}

Ext.onReady(function() {
	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		items : [ titlePanel, layoutPanel ]
	});

	// Ext.getCmp('treeID').expandAll();

	activityStore.on('load', function() {
		Ext.getCmp('selActi').select(activityStore.getAt(0));
		repTree.setProxy({	
			type : 'ajax',
			actionMethods : {
				read : 'POST'
			},
			async : false,
			url: AppUrl + 'WorkOrder/PRO_ORDER_PERSON_TREE',
			reader : {
				type : 'json'
			},
			root : {
				expanded : true
			},
			extraParams : {
				IN_ORDER_ID:V_ORDERGUID,
				IN_WORK_ID:Ext.getCmp('selActi').getValue(),
				IN_DEPARTCODE:V_DEPTCODEREPARIR
			}
		});
		repTree.load();
	});
	
	Ext.getCmp('selActi').on('select', function() {
		repTree.setProxy({	
			type : 'ajax',
			actionMethods : {
				read : 'POST'
			},
			async : false,
			url: AppUrl + 'WorkOrder/PRO_ORDER_PERSON_TREE',
			reader : {
				type : 'json'
			},
			root : {
				expanded : true
			}
			,
			extraParams : {
				ORDER_ID:V_ORDERGUID,
				WORK_ID:Ext.getCmp('selActi').getValue(),
				DEPARTCODE:V_DEPTCODEREPARIR
			}
		});
		repTree.load();
		Ext.ComponentManager.get('grid').getStore().load();
	});
});
