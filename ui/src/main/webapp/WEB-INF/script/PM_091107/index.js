Ext.onReady(function() {
			var panel = Ext.create('Ext.panel.Panel', {
				id : 'panellow',
				width : '100%',
				region : 'north',
				frame : true,
				layout : 'column',
				items : [ {
					xtype : 'button',
					id : 'btnback',
					text : '完成返回',
					width : 100,
					style : ' margin: 5px 0px 0px 10px',
					listeners : {
						click : OnButtonBackClicked
					}
				} ]
			});
			var grid = Ext.create('Ext.grid.Panel',
					{
						id : 'grid',
						region : 'center',
						columnLines : true,
						width : '100%',
						store : {
							id : 'gridStore',
							autoLoad : true,
							fields : [ 'I_ID', 'V_ACTIVITY', 'V_MATERIALCODE',
									'V_MATERIALNAME', 'V_UNIT',
									'I_ACTUALAMOUNT', 'I_BACK', 'I_JIIP',
									'I_NUMBER_FACT' ],
							proxy : {
								type : 'ajax',
								async : false,
								url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_FK_JIP_VIEW',
								actionMethods : {
									read : 'POST'
								},
								extraParams : {
									V_V_ORDERGUID:Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID
								},
								reader : {
									type : 'json',
									root : 'list'
								}
							}
						},
						autoScroll : true,
						height : 400,
						plugins : Ext.create('Ext.grid.plugin.CellEditing', {
							clicksToEdit : 1
						}),
						columns : [ {
							xtype : 'rownumberer',
							text : '序号',
							width : 40,
							align : 'center'
						}, {
							text : '工序',
							dataIndex : 'V_ACTIVITY',
							align : 'center',
							renderer : left,
							flex:1
						}, {
							text : '物料编码',
							dataIndex : 'V_MATERIALCODE',
							align : 'center',
							renderer : left,
							flex:1.5
						}, {
							text : '物料描述',
							dataIndex : 'V_MATERIALNAME',
							width : '17%',
							align : 'center',
							renderer : left,
							flex:1
						}, {
							text : '单位',
							dataIndex : 'V_UNIT',
							align : 'center',
							renderer : left,
							flex:1
						}, {
							text : '出库数量',
							dataIndex : 'I_ACTUALAMOUNT',
							align : 'center',
							renderer : left,
							flex:1
						}, {
							text : '回库数量',
							dataIndex : 'I_BACK',
							algin : 'center',
							renderer : left,
							flex:1
						}, {
							text : '机旁暂存',
							dataIndex : 'I_JIIP',
							align : 'center',
							flex:1,
							renderer : CreateGrid1ColumnTd,
							editor : {
								id : 'jpzc',
								xtype : 'numberfield',
								allowNegative : false,
								minValue : 0,
								value : 0,
								decimalPrecision : 8
							}
						}, {
							text : '实际消耗数量',
							dataIndex : 'I_NUMBER_FACT',
							align : 'center',
							flex:1,
							renderer : left
						} ]
					});

			Ext.create('Ext.container.Viewport', {
				id : "id",
				layout : 'border',
				items : [ panel, grid ]
			});

			Ext.getCmp('grid').on('edit', function(editor, context) {
								var guid = Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
								var jiip = context.record.data.I_JIIP;
								var iid = context.record.data.I_ID;
								Ext.Ajax.request({
									url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_FK_JIP_SET',
									method : 'POST',
									params : {
										'V_V_ORDERGUID':guid,
										'V_I_SPAREID':iid,
										'V_I_NUMBER_JIP':jiip
									},
									success : function(response) {
										if (Ext.JSON.decode(response.responseText).V_INFO== "success") {
											Ext.getCmp('grid').store.load();
										} else {
											Ext.getCmp('grid').store.load();
											Ext.Msg.alert('操作信息',Ext.JSON.decode(response.responseText).V_INFO);
											//Ext.example.msg('操作信息', '{0}', Ext.JSON.decode(response.responseText));
										}
									}
								});
								context.record.commit();
							});
		});

function OnButtonBackClicked() {
	window.close();
}

function left(value, metaData) {
	metaData.style = "text-align:left";
	return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function CreateGrid1ColumnTd(value, metaData, record, rowIdx, colIdx, store,
		view) {
	metaData.style = "text-align:left; background-color:#FFFF99";
	return value;
}
