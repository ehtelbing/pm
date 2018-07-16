Ext
		.onReady(function() {
			var toppanel = Ext
					.create(
							'Ext.form.Panel',
							{
								region : 'north',
								id : 'toppanel',
								layout : 'vbox',
								border : false,
								frame : true,
								items : [
										{
											xtype : 'panel',
											layout : {
												type : 'hbox',
												padding : 5
											},
											border : false,
											frame : true,
											width : '100%',
											items : [
													{
														xtype : 'textfield',
														id : 'dqbjms',
														fieldLabel : '当前备件描述',
														labelAlign : 'right',
														labelWidth : 100
													},
													{
														xtype : 'button',
														text : '查询',
														icon : '../../Themes/gif/search.png',
														width : 70,
														handler : function() {
															Ext.data.StoreManager
																	.lookup(
																			'gridStore')
																	.load(
																			{
																				params : {
																					A_BJ_ID:Ext
																						.urlDecode(location.href
																							.split('?')[1]).V_MPCODE
																				}
																			});
														}
													} ]
										},
										{
											xtype : 'panel',
											layout : {
												type : 'vbox',
												padding : 5
											},
											border : false,
											frame : true,
											width : '100%',
											items : [
													{
														xtype : 'panel',
														baseCls : 'my-panel-no-border',
														layout : 'hbox',
														border : false,
														frame : true,
														width : '100%',
														items : [
																{
																	xtype : 'textfield',
																	id : 'wzbm',
																	fieldLabel : '物资编码',
																	labelAlign : 'right',
																	labelWidth : 100,
																	style : 'margin:0px 0px 5px 0px'
																},
																{
																	xtype : 'button',
																	text : '选择',
																	style : 'margin:0px 0px 5px 0px',
																	width : 70,
																	listeners : {
																		click : OnButtonCheckClicked
																	}
																},
																{
																	xtype : 'textfield',
																	id : 'wzmc',
																	fieldLabel : '物资名称',
																	labelAlign : 'right',
																	labelWidth : 60,
																	style : 'margin:0px 0px 5px 0px'
																},
																{
																	xtype : 'textfield',
																	id : 'ggxh',
																	fieldLabel : '规格型号',
																	labelAlign : 'right',
																	labelWidth : 60,
																	style : 'margin:0px 0px 5px 0px'
																} ]
													},
													{
														xtype : 'panel',
														baseCls : 'my-panel-no-border',
														layout : 'hbox',
														border : false,
														frame : true,
														width : '100%',
														items : [
																{
																	xtype : 'textfield',
																	id : 'jldw',
																	fieldLabel : '计量单位',
																	labelAlign : 'right',
																	labelWidth : 100,
																	style : 'margin:0px 0px 5px 0px'
																},
																{
																	xtype : 'textfield',
																	id : 'dj',
																	fieldLabel : '单价',
																	labelAlign : 'right',
																	labelWidth : 40,
																	style : 'margin:0px 0px 5px 0px'
																},
																{
																	xtype : 'button',
																	text : '添加物料',
																	style : 'margin:0px 0px 5px 0px',
																	width : 70,
																	listeners : {
																		click : OnButtonAddClicked
																	}
																},
																{
																	xtype : 'button',
																	text : '删除选中物料',
																	style : 'margin:0px 0px 5px 0px',
																	width : 100,
																	listeners : {
																		click : OnButtonDeleteClicked
																	}
																} ]
													} ]
										} ]
							});

			var gridStore = Ext.create('Ext.data.Store', {
				id : 'gridStore',
				autoLoad : true,
				fields : [ 'BJ_ID', 'MATERIALCODE', 'MATERIALNAME',
						'MATERIALETALON', 'UNIT', 'F_PRICE' ],
				proxy : {
					type : 'ajax',
					async : false,
					url: AppUrl + 'cjy/PRO_RUN_BJ_MAT_ALL',
					actionMethods : {
						read : 'POST'
					},
					reader : {
						type : 'json',
						root : 'list'
					}
				},
				listeners : {
					beforeload : beforeloadStore
				}
			});

			var grid = Ext.create('Ext.grid.Panel', {
				id : 'grid',
				columnLines : true,
				region : 'center',
				selType : 'checkboxmodel',
				width : '100%',
				height : '100%',
				store : gridStore,
				autoScroll : true,
				columns : [ {
					xtype : 'rownumberer',
					text : '序号',
					width : 50,
					sortable : false,
					align : 'center'
				}, {
					text : '物资编码',
					dataIndex : 'MATERIALCODE',
					width : 200,
					align : 'center',
					renderer : atleft
				}, {
					text : '物资名称',
					dataIndex : 'MATERIALNAME',
					width : 200,
					align : 'center',
					renderer : atleft
				}, {
					text : '规格型号',
					dataIndex : 'MATERIALETALON',
					flex: 1 ,
					align : 'center',
					renderer : atleft
				}, {
					text : '计量单位',
					dataIndex : 'UNIT',
					width : 80,
					align : 'center',
					renderer : atleft
				}, {
					text : '单价',
					dataIndex : 'F_PRICE',
					width : 100,
					align : 'center',
					renderer : atleft
				} ]
			});

			var code = Ext.urlDecode(location.href.split('?')[1]).V_MPCODE;
			Ext.getCmp('dqbjms').setValue(code);

			Ext.create('Ext.container.Viewport', {
				split : true,
				layout : 'border',
				items : [ toppanel, grid ]
			});

		});

function OnButtonCheckClicked() {
	var returnValue = window.showModalDialog(AppUrl
			+ '/No710301/Index.html?V_ORDERGUID=' + "", null,
			"dialogWidth=650px;dialogHeight=400px");

	if (returnValue != '' && returnValue != null) {
		var str = returnValue;
		var strs = [];
		strs = returnValue.split('^');
		;
		Ext.getCmp('wzbm').setValue(strs[0]);
		Ext.getCmp('wzmc').setValue(strs[1]);
		Ext.getCmp('jldw').setValue(strs[2]);
		Ext.getCmp('dj').setValue(strs[3]);
	}
};

function OnButtonAddClicked() {
	Ext.Ajax
			.request({
				url : APP + '/ModelChange',
				params : {
					A_BJ_ID: Ext.getCmp('dqbjms').getValue(),
					A_MATERIALCODE: Ext.getCmp('wzbm').getValue(),
					A_MATERIALNAME: Ext.getCmp('wzmc').getValue(),
					A_MATERIALETALON: Ext.getCmp('ggxh').getValue(),
					A_UNIT: Ext.getCmp('jldw').getValue(),

					A_PRICE: Ext.getCmp('dj').getValue()
				},
				success : function(resp) {
					var resp = Ext.JSON.decode(resp.responseText)[1];
					if (resp == 'Success') {
						Ext.example.msg('操作信息', '添加成功');
						Ext.data.StoreManager.lookup('gridStore').load(
								{
									params : {
										A_BJ_ID: Ext.urlDecode(location.href)
									}
								});
					} else {
						Ext.example.msg('操作信息', '添加失败');
					}
				}
			});

};

function OnButtonDeleteClicked() {
	var selectModel = Ext.getCmp("grid").getSelectionModel();
	var id = Ext.getCmp('grid').getSelectionModel().getSelection().length;
	if (id == ' 0') {
		Ext.example.msg('操作信息', '请选择需要删除');
		return;
	} else {
		var selectedRecord = Ext.getCmp("grid").getSelectionModel()
				.getSelection();
		// var selectID = [];
		// Ext.Array.each(selectedRecord, function (v_wpcode, index) {
		// selectID.splice(index, 0, v_wpcode.data.v_wpcode);
		// });
		for (i = 0; i < Ext.getCmp('grid').getSelectionModel().getSelection().length; i++) {
			Ext.Ajax.request({
				url: AppUrl + 'cjy/PRO_RUN_BJ_MAT_DEL',
				async : false,
				method : 'post',
				params : {
					A_BJ_ID: selectedRecord[i].data.BJ_ID,
					A_MATERIALCODE: selectedRecord[i].data.MATERIALCODE
				},
				success : function(resp) {
					var resp = Ext.JSON.decode(resp.responseText)[1];
					if (resp == 'Success') {
						Ext.data.StoreManager.lookup('gridStore').load(
								{
									params : {
										A_BJ_ID: Ext.urlDecode(location.href)
									}
								});
					} else {
						Ext.example.msg('操作信息', '删除失败');
					}
				}
			});
		}
	}
};

function beforeloadStore(store) {
	store.proxy.extraParams.parName = [ 'A_BJ_ID' ];
	store.proxy.extraParams.parType = [ 's' ],
			store.proxy.extraParams.parVal = [ Ext.urlDecode(location.href
					.split('?')[1]).V_MPCODE ],
			store.proxy.extraParams.proName = 'NAPMNEW.PRO_RUN_BJ_MAT_ALL',
			store.proxy.extraParams.cursorName = 'RET'
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return value;
}
