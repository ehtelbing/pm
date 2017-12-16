var globalModelCode = "";
Ext.onReady(function() {
			var grid1Store = Ext.create('Ext.data.Store', {
						autoLoad : false,
						storeId : 'grid1Store',
						fields : ['MODEL_CODE', 'MODEL_NAME', 'INSERT_USERID',
								'INSERT_USERNAME', 'INSERTDATE', 'USE_FLAG',
								'REMARK'],
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
			var grid2Store = Ext.create('Ext.data.Store', {
						autoLoad : false,
						storeId : 'grid2Store',
						fields : ['MODEL_ET_ID', 'ET_NO', 'MODEL_CODE',
								'ET_CONTEXT', 'PLAN_WORKTIME', 'PLAN_PERSON',
								'PRE_ET_ID'],
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
			var grid3Store = Ext.create('Ext.data.Store', {
						autoLoad : false,
						storeId : 'grid3Store',
						fields : ['MODEL_MAT_ID', 'MODEL_CODE', 'MATERIALCODE',
								'MATERIALNAME', 'ETALON', 'MAT_CL', 'UNIT',
								'F_PRICE', 'PLAN_AMOUNT'

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
						title : '检修模型维护',
						titleAlign : 'left',
						region : 'north',
						layout : 'vbox',
						frame : true,
						items : [{
									xtype : 'panel',
									region : 'west',
									frame : true,
									baseCls : 'my-panel-noborder',
									layout : 'hbox',
									items : [{
												xtype : 'textfield',
												labelAlign : 'right',
												style : ' margin: 0px 0px 0px 20px',
												value : '',
												fieldLabel : '模型名称',
												id : 'mxmc',
												labelWidth : 80
											}, {
												xtype : 'button',
												id : 'search',
												text : '查  询',
												width : '60',
												style : ' margin: 0px 0px 0px 45px',
												listeners : {
													click : OnClickSearch
												}
											}, {
												xtype : 'button',
												id : 'toExcel',
												text : '添加一行',
												width : '100',
												style : ' margin: 0px 0px 0px 30px',
												handler : addonedata
											}]
								}]
					});

			var grid1 = Ext.create('Ext.grid.Panel', {
						store : 'grid1Store',
						id : 'grid1',
						columnLines : true,
						region : 'center',
						autoScroll : true,
						plugins : [Ext.create('Ext.grid.plugin.CellEditing', {
									clicksToEdit : 1,
									listeners : {
										'edit' : function(editor, e) {
											e.record.commit();
										}
									}
								})],
						columns : [{
									text : '模型编号',
									align : 'center',
									dataIndex : 'MODEL_CODE',
									id : 'mxbh',
									field : {
										xtype : 'textfield',
										hideTrigger : true
									},
									renderer : RenderChangeNumber
								}, {
									text : '模型名称',
									align : 'center',
									id : 'mxmcg',
									dataIndex : 'MODEL_NAME',
									field : {
										xtype : 'textfield',
										hideTrigger : true
									},
									renderer : RenderChangeNumber
								}, {
									text : '创建人',
									align : 'center',
									id : 'cjr',
									dataIndex : 'INSERT_USERNAME',
									field : {
										xtype : 'textfield',
										hideTrigger : true
									},
									renderer : RenderChangeNumber
								}, {
									text : '创建时间',
									align : 'center',
									id : 'cjsj',
									dataIndex : 'INSERTDATE',
									// field : {
									// xtype : 'textfield',
									// hideTrigger : true
									// },
									// renderer : RenderChangedate
									editor : {
										xtype : 'datefield',
										format : 'Y-m-d',
										value : new Date(),
										editable : false

									},
									renderer : atEditDate
								}, {
									text : '使用状态',
									align : 'center',
									dataIndex : 'USE_FLAG',
									id : 'syzt',
									field : {
										xtype : 'textfield',
										hideTrigger : true
									},
									renderer : RenderChangeNumber
								}, {
									text : '备注',
									align : 'center',
									dataIndex : 'REMARK',
									id : 'bz',
									field : {
										xtype : 'textfield',
										hideTrigger : true
									},
									renderer : RenderChangeNumber

								}, {
									text : '',
									align : 'center',
									renderer : LookMoregx
								}, {
									text : '',
									align : 'center',
									renderer : LookMorewl
								}, {
									text : '',
									align : 'center',
									renderer : Rendersave
								}, {
									text : '',
									align : 'center',
									renderer : Del
								}],
						dockedItems : [panel]
					});

			var window1 = Ext.create('Ext.window.Window', {
						id : 'window1',
						closeAction : 'hide',
						title : '模型工序',
						width : 560,
						height : 350,
						modal : true,
						frame : true,
						layout : 'border',
						items : [{
									xtype : 'panel',
									width : '100%',
									layout : 'hbox',
									frame : true,
									region : 'north',
									items : [{
												xtype : 'button',
												text : '新增',
												handler : function() {
													onAdd1();
												}
											}]
								}, {
									xtype : 'grid',
									store : 'grid2Store',
									id : 'grid2',
									columnLines : true,
									region : 'center',
									autoScroll : true,
									columns : [{
												text : '工序号',
												id : 'gxh',
												align : 'center',
												width : 100,
												dataIndex : 'ET_NO'
											}, {
												text : '工序内容',
												id : 'gxnr',
												align : 'center',
												width : 100,
												dataIndex : 'ET_CONTEXT'
											}, {
												text : '计划工时',
												align : 'center',
												id : 'jhgs',
												width : 100,
												dataIndex : 'PLAN_WORKTIME'
											}, {
												text : '计划人数',
												align : 'center',
												id : 'jhrs',
												dataIndex : 'PLAN_PERSON',
												width : 100
											}, {
												text : '',
												align : 'center',
												width : 100,
												renderer : Del1
											}]

								}]
					});

			var window2 = Ext.create('Ext.window.Window', {
						id : 'window2',
						closeAction : 'hide',
						title : '模型物料',
						width : 860,
						height : 350,
						modal : true,
						frame : true,
						layout : 'border',
						items : [{
									xtype : 'panel',
									width : '100%',
									layout : 'hbox',
									frame : true,
									region : 'north',
									items : [{
												xtype : 'button',
												text : '新增',
												handler : function() {
													onAdd2();
												}
											}]
								}, {
									xtype : 'grid',
									store : 'grid3Store',
									id : 'grid3',
									columnLines : true,
									region : 'center',
									autoScroll : true,
									columns : [{
												text : '物料编码',
												id : 'wlbm',
												align : 'center',
												width : 100,
												dataIndex : 'MATERIALCODE'
											}, {
												text : '物料名称',
												id : 'wlmc',
												align : 'center',
												width : 100,
												dataIndex : 'MATERIALNAME'
											}, {
												text : '规格型号',
												align : 'center',
												id : 'ggxh',
												width : 100,
												dataIndex : 'ETALON'
											}, {
												text : '材质',
												align : 'center',
												id : 'cz',
												dataIndex : 'MAT_CL',
												width : 100
											}, {
												text : '单位',
												align : 'center',
												id : 'dw',
												dataIndex : 'UNIT',
												width : 100
											}, {
												text : '单价',
												align : 'center',
												id : 'dj',
												dataIndex : 'F_PRICE',
												width : 100
											}, {
												text : '计划数量',
												align : 'center',
												id : 'jhsl',
												dataIndex : 'PLAN_AMOUNT',
												width : 100
											}, {
												text : '删除',
												align : 'center',
												width : 100,
												renderer : Del2
										}]

								}]
					});

			Ext.create('Ext.container.Viewport', {
						layout : 'fit',
						items : [grid1]
					});
		})

function OnClickSearch() {
	Ext.data.StoreManager.lookup('grid1Store').load({
				params : {
					parName : ['v_modelname'],
					parType : ['s'],
					parVal : [Ext.getCmp('mxmc').getValue()],
					proName : 'pro_dj802_select',
					cursorName : 'v_cursor'
				}
			});
}
function OnClickSearch1() {
	var selectedRecord = Ext.getCmp('grid1').getSelectionModel().getSelection();
	var modelcode = selectedRecord[0].data.MODEL_CODE;
	Ext.data.StoreManager.lookup('grid2Store').load({
				params : {
					parName : ['v_modelcode'],
					parType : ['s'],
					parVal : [modelcode],
					proName : 'pro_dj802_gxselect',
					cursorName : 'v_cursor'
				}
			});
}

function OnClickSearch2() {
	var selectedRecord = Ext.getCmp('grid1').getSelectionModel().getSelection();
	var modelcode = selectedRecord[0].data.MODEL_CODE;
	Ext.data.StoreManager.lookup('grid3Store').load({
				params : {
					parName : ['v_modelcode'],
					parType : ['s'],
					parVal : [modelcode],
					proName : 'pro_dj802_whselect',
					cursorName : 'v_cursor'
				}
			});
}

function onAdd1() {
	var dialog = window.showModalDialog(AppUrl
					+ "/DJ/DJ802_1_add.jsp?MODEL_CODE=" + globalModelCode,
			null, "dialogHeight:500px;dialogWidth:650px");
	OnClickSearch1();
}

function onAdd2() {
	var dialog = window.showModalDialog(AppUrl
					+ "/DJ/DJ802_2_add.jsp?MODEL_CODE=" + globalModelCode,
			null, "dialogHeight:500px;dialogWidth:650px");
	OnClickSearch2();
}

function LookMoregx(value, metaData, record, rowIdx, colIdx, store, view) {
	if (record.data.MODEL_CODE != "") {
		return '<a  href="javascript:OnOpen1()" style="color:blue">模型工序</a>';
	}

}
function LookMorewl(value, metaData, record, rowIdx, colIdx, store, view) {
	return '<a  href="javascript:OnOpen2()" style="color:blue">模型物料</a>';

}

function Rendersave(value, metaData, e, rowIndex) {
	metaData.style = 'text-align: center;';
	return "<a href='javascript:savedata(\"" + rowIndex + "\")'>保存</a>";
}

function Del(value, metaData, record, rowIdx, colIdx, store, view) {
	// return '<a href="javascript:delFixContent(\"" + rowIdx + "\")"
	// style="color:blue">删除</a>';
	return "<a onclick='delFixContent(\"" + rowIdx
			+ "\")' style='color:blue'>删除</a>";
}

function delFixContent(rowIdx) {
	var id = Ext.data.StoreManager.lookup('grid1Store').data.getAt(rowIdx).data.MODEL_CODE;
	Ext.Ajax.request({
				url : APP + '/ModelChange',
				type : 'ajax',
				async : false,
				method : 'POST',
				params : {
					parName : ['v_modelcode'],
					parType : ['s'],
					parVal : [id],
					proName : 'pro_dj802_delete',
					returnStr : ['ret'],
					returnStrType : ['s']
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
	OnClickSearch();
}

function Del1(value, metaData, record, rowIdx, colIdx, store, view) {
	// return '<a href="javascript:delFixContent(\"" + rowIdx + "\")"
	// style="color:blue">删除</a>';
	return "<a onclick='delFixContent1(\"" + rowIdx
			+ "\")' style='color:blue'>删除</a>";
}

function delFixContent1(rowIdx) {
	var id = Ext.data.StoreManager.lookup('grid2Store').data.getAt(rowIdx).data.MODEL_ET_ID;
	Ext.Ajax.request({
				url : APP + '/ModelChange',
				type : 'ajax',
				async : false,
				method : 'POST',
				params : {
					parName : ['v_modeletid'],
					parType : ['s'],
					parVal : [id],
					proName : 'pro_dj802_gxdelete',
					returnStr : ['ret'],
					returnStrType : ['s']
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
	OnClickSearch1();
}

function Del2(value, metaData, record, rowIdx, colIdx, store, view) {
	// return '<a href="javascript:delFixContent(\"" + rowIdx + "\")"
	// style="color:blue">删除</a>';
	return "<a onclick='delFixContent2(\"" + rowIdx
			+ "\")' style='color:blue'>删除</a>";
}

function delFixContent2(rowIdx) {
	var id = Ext.data.StoreManager.lookup('grid3Store').data.getAt(rowIdx).data.MODEL_MAT_ID;
	Ext.Ajax.request({
				url : APP + '/ModelChange',
				type : 'ajax',
				async : false,
				method : 'POST',
				params : {
					parName : ['v_modelmatid'],
					parType : ['s'],
					parVal : [id],
					proName : 'pro_dj802_whdelete',
					returnStr : ['ret'],
					returnStrType : ['s']
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
	OnClickSearch2();
}
function RenderChangeNumber(value, metaData) {
	metaData.style = "text-align:right;background-color:FFFF99";
	return value;
}

function atEditDate(value, metaData) {
	metaData.style = 'background: #ffffdf'; // 可编辑框带颜色
	if (value == "" || value == null) {
		return "";
	} else {
		var result = "";
		if (value.toString().indexOf('-') > 0) {
			result = Ext.Date.format(new Date(value.split('-').join('/')),
					'Y-m-d');
		} else {
			result = Ext.Date.format(value, 'Y-m-d');
		}

		return result;
	}

}

function savedata(rowIdx) {
	Ext.Ajax.request({
		url : APP + '/ModelChange',
		type : 'ajax',
		method : 'post',
		async : false,
		params : {
			parName : ['v_modelcode', 'v_modelname', 'v_userid', 'v_username',
					'v_insertdate', 'v_userflag', 'v_remark'],
			parType : ['s', 's', 's', 's', 'da', 's', 's'],
			parVal : [

					Ext.getStore('grid1Store').getAt(rowIdx).data.MODEL_CODE,
					Ext.getStore('grid1Store').getAt(rowIdx).data.MODEL_NAME,
					Ext.util.Cookies.get("mm.userid"),
					Ext.util.Cookies.get("mm.username"),
					Ext.Date.format(Ext.getStore('grid1Store').getAt(rowIdx).data.INSERTDATE,'Y-m-d'),
					Ext.getStore('grid1Store').getAt(rowIdx).data.USE_FLAG,
					Ext.getStore('grid1Store').getAt(rowIdx).data.REMARK],
			proName : 'pro_dj802_insert',
			returnStr : ['ret'],
			returnStrType : ['s']
		},
		success : function(resp) {
			var resp = Ext.JSON.decode(resp.responseText);
			if (resp[0] != "Fail") {
				Ext.example.msg('提示', '操作成功！');
			} else {
				Ext.example.msg('提示','操作失败');
			}
			OnClickSearch();
		}
	});
}

function addonedata() {
	Ext.getStore('grid1Store').insert(
			Ext.getStore('grid1Store').data.items.length, {});
}

function OnOpen1() {
	Ext.getCmp('window1').show();

	var selectedRecord = Ext.getCmp('grid1').getSelectionModel().getSelection();
	var modelcode = selectedRecord[0].data.MODEL_CODE;
	globalModelCode = modelcode;
	Ext.data.StoreManager.lookup('grid2Store').load({
				params : {
					parName : ['v_modelcode'],
					parType : ['s'],
					parVal : [modelcode],
					proName : 'pro_dj802_gxselect',
					cursorName : 'v_cursor'
				}
			});

}
function OnOpen2() {
	Ext.getCmp('window2').show();
	var selectedRecord = Ext.getCmp('grid1').getSelectionModel().getSelection();
	var modelcode = selectedRecord[0].data.MODEL_CODE;
	globalModelCode = modelcode;
	Ext.data.StoreManager.lookup('grid3Store').load({
				params : {
					parName : ['v_modelcode'],
					parType : ['s'],
					parVal : [modelcode],
					proName : 'pro_dj802_whselect',
					cursorName : 'v_cursor'
				}
			});

}
