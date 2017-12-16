var states = "";

Ext.onReady(function() {

			var cursorStore = Ext.create('Ext.data.Store', {// 检修状态
				autoLoad : false,
				storeId : 'cursorStore',
				fields : [ 'ORDER_STATUS', 'ORDER_STATUS_DESC' ],
				proxy : {
					type : 'ajax',
					url : APP + '/ModelSelect',
					actionMethods : {
						read : 'POST'
					},
					reader : {
						type : 'json',
						root : 'list'
					},
					extraParams : {
						parName : [],
						parType : [],
						parVal : [],
						proName : 'pro_dj702_droplist',
						cursorName : 'v_cursor'
					}
				}
			});

			var gridStore = Ext.create('Ext.data.Store', {// 表格查询
				autoLoad : false,
				storeId : 'gridStore',
				fields : [ 'POWERID', 'ORDER_STATUS', 'USERID', 'USERNAME',
						'STATUS', 'MENDDEPT_NAME', 'MENDDEPT_CODE' ],
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

			var Panel1 = Ext.create('Ext.panel.Panel', {// 头列表
				id : 'Panel1',
				region : 'north',
				style : 'margin: 5px 0px 0px 0px',
				frame : true,
				title : '检修人员状态配置',
				layout : 'hbox',
				items : [ {
					xtype : 'combo',
					id : 'fix_status',
					fieldLabel : '检修状态',
					labelAlign : 'right',
					labelWidth : 80,
					valueField : 'ORDER_STATUS',
					displayField : 'ORDER_STATUS_DESC',
					store : 'cursorStore',
					queryMode : 'local'
				}, {
					xtype : 'button',
					text : '查询',
					width : 80,
					style : ' margin: 0px 0px 0px 20px',
					icon : imgpath + '/a1.gif',
					id : 'search',
					listeners : {
						click : QueryGrid
					}

				}, {
					xtype : 'button',
					text : '新增',
					width : 80,
					style : ' margin: 0px 0px 0px 10px',
					icon : imgpath + '/add.gif',
					id : 'add',
					listeners : {
						click : OnOpenPage
					}
				} ]
			});

			var grid = Ext
					.create(
							'Ext.grid.Panel',// 第一页表格页面
							{
								region : 'center',
								id : 'grid',
								columnLines : true,
								style : 'margin: 5px 0px 0px 0px',
								width : '100%',
								autoScroll : true,
								store : gridStore,
								columns : [{
									 text : '序号', 
									 xtype : 'rownumberer',
									 width : 70,
									 align : 'center',
									 id : ''
								},
										{
											text : '工单状态',
											dataIndex : 'ORDER_STATUS',
											width : 70,
											align : 'center'
											
										},
										{
											text : '检修单位名称',
											dataIndex : 'MENDDEPT_NAME',
											align : 'center',
											width : 150
										},
										{
											text : '人员编码',
											align : 'center',
											dataIndex : 'USERID',
											width : 180
										},
										{
											text : '人员名称',
											align : 'center',
											dataIndex : 'USERNAME',
											width : 200
										},
										{
											text : '当前状态',
											align : 'center',
											dataIndex : 'STATUS',
											width : 100,
											renderer : function(value,
													metaData, record, rowIdx,
													colIdx, store, view) {
												if (Ext.getStore("gridStore").data
														.getAt(rowIdx).data.STATUS == '启用') {
													return '<a href="javascript:start(\''
															+ rowIdx
															+ '\',0)">停用</a>';
												} else {
													return '<a href="javascript:stop(\''
															+ rowIdx
															+ '\',1)">启用</a>';
												}
											}
										},
										{
											text : '删除',
											align : 'center',
											width : 100,
											renderer : function(value,
													metaData, record, rowIdx,
													colIdx, store, view) {
												return '<img src="'
														+ imgpath
														+ '/del.gif" alt="删除" onclick="delFixType(\''
														+ record.data.POWERID
														+ '\',\''
														+ record.data.USERID
														+ '\')"/>';
											}
										} ]
							});

			Ext.create('Ext.container.Viewport', {
				layout : 'border',
				items : [ Panel1, grid ]
			});

			Ext.data.StoreManager.lookup('cursorStore').load({
				params : {
					parName : [],
					parType : [],
					parVal : [],
					proName : 'pro_dj702_droplist',
					cursorName : 'v_cursor'
				}
			});

			Ext.data.StoreManager.lookup('cursorStore').on(
					'load',
					function() {
						Ext.getCmp('fix_status').select(
								Ext.data.StoreManager.lookup('cursorStore')
										.getAt(0));
						QueryGrid();
					});
		})

function QueryGrid() {
	Ext.data.StoreManager.lookup('gridStore').load({
		params : {
			parName : [ 'v_ordersts' ],
			parType : [ 's' ],
			parVal : [ Ext.getCmp('fix_status').getValue() ],
			proName : 'pro_dj702_select',
			cursorName : 'v_cursor'
		}
	})
}
// Ext.data.StoreManager.lookup('gridStore').load();
function delFixType(powerid, id) {
	// var powerid =
	// Ext.data.StoreManager.lookup('gridStore').data.getAt(rowIdx).data.POWERID;
	// var id =
	// Ext.data.StoreManager.lookup('gridStore').data.getAt(rowIdx).data.USERID;
	Ext.Ajax.request({
		url : APP + '/ModelChange',
		type : 'ajax',
		async : false,
		method : 'POST',
		params : {
			parName : [ 'v_powerid', 'v_id' ],
			parType : [ 's', 's' ],
			parVal : [ powerid, id ],
			proName : 'pro_dj702_delete',
			returnStr : [ 'ret' ],
			returnStrType : [ 's' ]
		},
		success : function(response) {
			var resp = Ext.decode(response.responseText);
			if (resp[0] != "success") {
				Ext.example.msg('提示', "成功");
			} else {
				Ext.example.msg('提示', "失败");
			}
		}
	});

}

function OnOpenPage() {

	var returnVal = window.showModalDialog(APP + "/page/DJ/DJ702add.jsp?ORDER_STATUS_DESC="
			+Ext.getCmp('fix_status').getValue( ), null,
			"dialogWidth=700px;dialogHeight=500px");
	if (returnVal != null) {
		Ext.example.msg("提示", '添加成功');
		QueryGrid();
	}
}
// function onSearch() {
//
// Ext.data.StoreManager.lookup('gridStore').setProxy({
// type : 'ajax',
// async : false,
// url : APP + '/ModelSelect',
// actionMethods : {
// read : 'POST'
// },
// reader : {
// type : 'json',
// root : 'list'
// },
// extraParams : {
// parName : [ 'v_ordersts' ],
// parType : [ 's' ],
// parVal : [ Ext.getCmp('fix_status').getValue() ],
// proName : 'pro_dj702_select',
// cursorName : 'v_cursor'
// }
// });
//
// }
