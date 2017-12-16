Ext.onReady(function() {
	Ext.QuickTips.init();
	if (location.href.split('?')[1] != undefined) {
		var V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
	}
	if (V_ORDERGUID != "") {
		var grid = Ext.create('Ext.grid.Panel', {
			id : 'grid',
			columnLines : true,
			title : '关键机具使用情况',
			titleAlign : 'center',
			width : '100%',
			store : {
				id : 'gridStore',
				autoLoad : true,
				fields : [ 'V_TOOLCODE', 'V_TOOLNAME', 'I_NUMBER', 'I_HOUR',
						'V_MEMO', 'V_I_ID' ],
				proxy : {
					type : 'ajax',
					async : false,
					url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_TOOL_VIEW',
					actionMethods : {
						read : 'POST'
					},
					reader : {
						type : 'json',
						root : 'list'
					},
					extraParams : {
						V_V_ORDERGUID:V_ORDERGUID
					}
				}
			},
			autoScroll : true,
			height : 380,
			columns : [

			{
				xtype : 'rownumberer',
				text : '序号',
				width : 50,
				align : 'center',
				sortable : false
			}, {
				text : '机具编码',
				dataIndex : 'V_TOOLCODE',
				width : 180,
				align : 'center'
			}, {
				text : '机具名称',
				width : 180,
				dataIndex : 'V_TOOLNAME',
				align : 'center'
			}, {
				text : '数量',
				width : 150,
				dataIndex : 'I_NUMBER',
				align : 'center'
			}, {
				text : '使用时间',
				width : 180,
				dataIndex : 'I_HOUR',
				align : 'center'
			}, {
				text : '备注',
				dataIndex : 'V_MEMO ',
				width : 320,
				align : 'center'
			}, {
				text : 'I_ID(隐藏)',
				width : 180,
				dataIndex : 'V_I_ID',
				align : 'center',
				hidden : true
			} ]
		});
	}
	if (location.href.split('?')[1] != undefined) {
		var V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
	}
	if (V_ORDERGUID != "") {
		var grid1 = Ext.create('Ext.grid.Panel', {
			id : 'grid1',
			columnLines : true,
			title : '车辆使用',
			titleAlign : 'center',
			width : '100%',
			store : {
				id : 'grid1Store',
				autoLoad : true,
				fields : [ 'I_ID', 'D_DATETIME_WITE', 'V_DD_WITE', 'V_WP_WITE',
						'V_MEMO', 'V_LXRDH', 'D_DATE_CF', 'D_DD_CF','V_CARCODE',
						'D_DATE_LK', 'D_DATE_NEXT_MDD', 'V_PERCODE_SJ' ],
				proxy : {
					type : 'ajax',
					async : false,
					url: AppUrl + 'WorkOrder/PRO_CL_WORKORDER_DATA_VIEW',
					actionMethods : {
						read : 'POST'
					},
					reader : {
						type : 'json',
						root : 'list'
					},
					extraParams : {
						V_V_ORDERID:V_ORDERGUID
					}
				}
			},
			autoScroll : true,
			height : 420,
			columns : [

			{
				xtype : 'rownumberer',
				text : '序号',
				width : 50,
				align : 'center',
				sortable : false
			}, {
				text : 'i_id',
				dataIndex : 'I_ID',
				width : 100,
				hidden : true,
				align : 'center'
			}
			, 
			{
				text : '车牌号',
				width : 100,
				dataIndex : 'V_CARCODE',
				width : 150,
				align : 'center'
			}
			, {
				text : '等候时间',
				dataIndex : 'D_DATETIME_WITE',
				width : 150,
				align : 'center'
			}, {
				text : '等候地点',
				width : 200,
				dataIndex : 'V_DD_WITE',
				align : 'center',
				renderer:QT	
			}, {
				text : '物品',
				width : 150,
				dataIndex : 'V_WP_WITE',
				align : 'center',
				renderer:QT	
			}, {
				text : '备注',
				width : 150,
				dataIndex : 'V_MEMO',
				align : 'center',
				renderer:QT
					
			}, {
				text : '联系人和电话',
				width : 180,
				dataIndex : 'V_LXRDH',
				align : 'center',
				renderer:QT
			}
			,
			{
				text : '出发时间',
				width : 150,
				dataIndex : 'D_DATE_CF',
				align : 'center'
			}, {
				text : '出发地点',
				width : 100,
				dataIndex : 'D_DD_CF',
				align : 'center',
				renderer:QT
			}, {
				text : '离开时间',
				width : 150,
				dataIndex : 'D_DATE_LK',
				align : 'center'
			}, {
				text : '到达下一目的地时间',
				width : 150,
				dataIndex : 'D_DATE_NEXT_MDD',
				align : 'center'
			}, {
				text : '司机',
				width : 150,
				dataIndex : 'V_PERCODE_SJ',
				align : 'center'
			}
			
			]
		});
	}
	Ext.create('Ext.container.Viewport', {
		layout : 'vbox',
		id : "id",
		items : [ grid1, grid ]
	});
});

function QT(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:center;";
	return '<div data-qtip="' + value + '" >' + value + '</div>' ;
}