Ext.onReady(function() {
	var bmStore = Ext.create('Ext.data.Store', {// 部门
		autoLoad : false,
		storeId : 'bmStore',
		fields : [ 'DEPARTCODE', 'DEPARTNAME', 'SAP_DEPARTCODE' ],
		proxy : {
			type : 'memory',
			reader : {
				type : 'json',
				root : 'list'
			}
		}
	});
	var gridStore = Ext.create('Ext.data.Store', {
		autoLoad : false,
		storeId : 'gridStore',
		fields : [ 'ORDERID', 'INSERTDATE', 'DJ_VOL', 'DJ_V', 'DJ_NAME' ],
		proxy : {
			type : 'ajax',
			actionMethods : {
				read : 'POST'
			},
			url : APP + '/ModelSelect',
			reader : {
				type : 'json',
				root : 'list'
			},
			extraParams : {
				parName : [ 'a_begindate', 'a_enddate', 'a_orderid',
						'a_plantcode', 'a_departcode' ],
				parType : [ 'da', 'da', 's', 's', 's' ],
				proName : 'pg_dj1006.getconsumebyorder',
				cursorName : 'ret'
			}
		}
	});
	var exportStore = Ext.create('Ext.data.Store', {
		autoLoad : false,
		storeId : 'exportStore',
		fields : [ 'ORDERID', 'MATERIALCODE', 'MATERIALNAME', 'ETALON', 'UNIT',
				'F_PRICE', 'PLAN_AMOUNT', 'F_MONEY', 'INSERTDATE',
				'STORE_DESC', 'I_TYPE', 'REC_AMOUNT', 'ID', 'DJ_VOL', 'DJ_V'

		],
		proxy : {
			type : 'ajax',
			actionMethods : {
				read : 'POST'
			},
			url : APP + '/ModelSelect',
			reader : {
				type : 'json',
				root : 'list'
			},
			extraParams : {
				parName : [ 'a_orderid' ],
				parType : [ 's' ],
				proName : 'pg_dj1006.getordermatconsume',
				cursorName : 'ret'
			}
		}
	});
	var northPanel = Ext.create("Ext.panel.Panel", {
		region : 'north',
		frame : true,
		baseCls : 'my-panel-noborder',
		layout : 'vbox',
		width : '100%',
		style : 'margin:5px 0px 5px 5px',
		items : [ {
			xtype : 'panel',
			frame : true,
			width : "100%",
			baseCls : 'my-panel-noborder',
			layout : 'hbox',
			items : [ {
				xtype : 'datefield',
				id : 'qsrq',
				fieldLabel : '起始日期',
				style : ' margin: 5px 0px 5px 5px',
				labelAlign : 'right',
				labelWidth : 70,
				value : Ext.Date.getFirstDateOfMonth(new Date()),// 根据现在日期获取这个月的第一天是哪天
				format : 'Y/m/d',
				editable : false
			}, {
				xtype : 'datefield',
				id : 'jsrq',
				fieldLabel : '结束日期',
				style : ' margin: 5px 0px 5px 5px',
				labelAlign : 'right',
				labelWidth : 70,
				queryMode : 'local',
				value : Ext.Date.getLastDateOfMonth(new Date()),
				format : 'Y/m/d',
				editable : false
			},

			{
				xtype : 'textfield',
				id : 'jxdh',
				fieldLabel : '检修单号',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				labelAlign : 'right'
			}, {
				xtype : 'combo',
				id : 'bm',
				fieldLabel : '部门',
				labelAlign : 'right',
				editable : false,
				style : 'margin:5px 0px 5px 5px',
				labelWidth : 70,
				queryMode : 'local',
				store : bmStore,
				valueField : 'DEPARTCODE',
				displayField : 'DEPARTNAME'
			} ]
		}, {
			xtype : 'panel',
			frame : true,
			layout : 'hbox',
			width : "100%",
			baseCls : 'my-panel-noborder',
			items : [ {
				xtype : 'button',
				text : '查询',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				icon : imgpath + '/a1.gif',
				handler : onSearch
			} ]
		} ]
	});
	var grid = Ext.create('Ext.grid.Panel', {
		region : 'center',
		id : 'grid',
		columnLines : true,
		style : 'margin: 5px 0px 0px 0px',
		width : '100%',
		selType : 'checkboxmodel',
		autoScroll : true,
		store : gridStore,
		columns : [ {
			text : '检修单号',
			dataIndex : 'ORDERID',
			align : 'center',
			width : 100
		}, {
			text : '电机编号',
			align : 'center',
			dataIndex : '',
			width : 100
		}, {
			text : '电机名称',
			align : 'center',
			dataIndex : 'DJ_NAME',
			width : 100
		}, {
			text : '电机型号',
			align : 'center',
			dataIndex : '',
			width : 100
		}, {
			text : '容量',
			align : 'center',
			dataIndex : 'DJ_VOL',
			width : 100
		}, {
			text : '电压',
			align : 'center',
			dataIndex : 'DJ_V',
			width : 100
		}, {
			text : '物料回收',
			align : 'center',
			width : 100,
			renderer : LookMore
		} ]
	});
	var panelwinoper = Ext.create('Ext.panel.Panel', {
		id : 'panelwinoper',
		flex : 1,
		baseCls : 'my-panel-no-border',
		frame : true,
		layout : 'column',
		items : [ {
			id : 'jxdhcode',
			xtype : 'textfield',
			editable : false,
			style : ' margin: 8px 0px 0px 5px',
			queryMode : 'local',
			fieldLabel : '检修单号',
			labelWidth : 70,
			width : 220,
			labelAlign : 'right'
		}, {
			xtype : 'button',
			text : '回收确认',
			icon : imgpath + '/a1.gif',
			width : 80,
			style : ' margin: 8px 0px 0px 15px',
			handler : function() {
				onConfirm();
			}
		} ]
	});
	var exportGrid = Ext.create('Ext.grid.Panel', {
		id : 'exportGrid',
		columnLines : true,
		width : '50%',
		store : exportStore,
		style : ' margin: 5px 0px 0px 0px',
		autoScroll : true,
		height : 400,
		selType : 'checkboxmodel',
		plugins : [ {
			ptype : 'cellediting',
			clicksToEdit : 1,
			listeners : {
				'edit' : function(editor, e) {
					e.record.commit();
					editSave(e.record.data.ID, e.record.data.REC_AMOUNT)
				}
			}
		} ],
		columns : [ {
			text : '检修单号',
			renderer : atleft,
			dataIndex : 'V_MATERIALCODE',
			width : 100,
			align : 'center'
		}, {
			text : '检修编号',
			renderer : atleft,
			dataIndex : 'V_MATERIALNAME',
			width : 160,
			align : 'center'
		}, {
			text : '物资名称',
			renderer : atleft,
			dataIndex : 'V_UNIT',
			width : 60,
			align : 'center'
		}, {
			text : '规格',
			renderer : atleft,
			dataIndex : 'I_PLANAMOUNT',
			width : 80,
			align : 'center'
		}, {
			text : '单位',
			renderer : atleft,
			dataIndex : 'I_PLANAMOUNT',
			width : 80,
			align : 'center'
		}, {
			text : '消耗数量',
			renderer : atleft,
			dataIndex : 'I_PLANAMOUNT',
			width : 80,
			align : 'center'
		}, {
			text : '回收数量',
			dataIndex : 'I_PLANAMOUNT',
			width : 80,
			renderer : ateditNum,
			align : 'center',
			field : {
				xtype : 'numberfield',
				minValue : 0,
				allowDecimals : false
			}
		}, {
			text : '物质分类',
			renderer : atleft,
			dataIndex : 'I_PLANAMOUNT',
			width : 80,
			align : 'center'
		}, {
			text : '库房描述',
			renderer : atleft,
			dataIndex : 'I_PLANAMOUNT',
			width : 80,
			align : 'center'
		} ]

	});
	var window = Ext.create('Ext.window.Window', {
		id : 'window',
		title : '回收',
		titleAlign : 'center',
		closable : true,
		frame : true,
		width : '60%',
		layout : {
			align : 'stretch',
			type : 'vbox'
		},
		items : [ panelwinoper, exportGrid, ]
	});
	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		items : [ northPanel, grid ]
	});
	bmStore.insert(0, {
		'DEPARTCODE' : Ext.util.Cookies.get('mm.departcode'),
		'DEPARTNAME' : Ext.util.Cookies.get('mm.departname')
	});
	Ext.getCmp('bm').select(Ext.util.Cookies.get('mm.departcode'));
	onSearch();
});
function onSearch() {// 查询
	Ext.getStore('gridStore').proxy.extraParams.parVal = [
			Ext.Date.format(Ext.getCmp('qsrq').getValue(), 'Y-m-d'),
			Ext.Date.format(Ext.getCmp('jsrq').getValue(), 'Y-m-d'),
			Ext.getCmp('jxdh').getValue(),
			Ext.util.Cookies.get("mm.plantcode"),
			Ext.util.Cookies.get("mm.departcode"), ];
	Ext.getStore('gridStore').load();
}
function LookMore(value, metaData, record, rowIdx, colIdx, store, view) {
	return '<a  href="javascript:Openhuishou(\'' + record.data.ORDERID
			+ '\')">' + value + '</a>';
}
function Openhuishou() {
	Ext.getStore('exportStore').proxy.extraParams.parVal = [ Ext.getCmp('jxdh')
			.getValue() ];
	Ext.getStore('exportStore').load();
	Ext.getCmp('jxdhcode').setValue(Ext.getCmp('jxdh').getValue());

	Ext.getCmp('window').show();
}
// 回收数量，可编辑保存
function editSave(id, amount) {
	Ext.Ajax.request({
		url : APP + '/ModelChange',
		type : 'ajax',
		method : 'post',
		async : false,
		params : {
			parName : [ 'id_in', 'a_rec_amount', 'a_userid', 'a_username' ],
			parType : [ 's', 'do', 's', 's' ],
			parVal : [ id, amount, Ext.util.Cookies.get("mm.userid"),
					Ext.util.Cookies.get("mm.username") ],
			proName : 'pg_dj1006.save_recamount',
			returnStr : [ 'ret_msg', 'ret' ],
			returnStrType : [ 's', 's' ]
		},
		success : function(resp) {
			var resp = Ext.JSON.decode(resp.responseText);
			if (resp[1] == "Success") {
				Ext.example.msg('提示', '操作成功！');
			} else {
				Ext.example.msg('提示', resp[0]);
			}
		}
	});

}
// 回收确认
function onConfirm() {
	selectedRecord = Ext.getCmp('grid').getSelectionModel().getSelection();
	if ((selectedRecord.length == 0)) {
		Ext.example.msg('提示', '请至少选择一条数据！');// 提示
		return;
	}
	var temp = 0;
	if (selectedRecord.length > 0) {
		Ext.Array.each(selectedRecord, function(name) {
			Ext.Ajax
					.request({
						url : APP + '/ModelChange',
						async : false,
						params : {
							parName : [ 'a_id', 'a_userid' ],
							parType : [ "s", 's' ],
							parVal : [ name.data.ID,
									Ext.util.Cookies.get("mm.userid") ],
							proName : ' pg_dj1006.confirm_rec',
							returnStr : [ 'ret_msg', 'ret' ],
							returnStrType : [ 's', 's' ]
						},
						method : 'POST',
						success : function(response) {
							var resp = Ext.JSON.decode(response.responseText);
							if (resp[1] == 'Success') {
							} else {
								temp++;
								Ext.example.msg('提示', resp[0]);

							}
						}
					});
		});
		if (temp == 0) {
			Ext.example.msg('提示', '操作成功');
		}

		onSearch();
	}
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return value;
}
function ateditNum(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:right;background-color:#FFFF99;";
	if (value == null || value == '') {
		value = 0;
		return value;
	}
	return value;
}