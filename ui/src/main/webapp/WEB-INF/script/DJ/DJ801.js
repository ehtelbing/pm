
Ext.onReady(function() {
	var grid1Store = Ext.create('Ext.data.Store', {
		autoLoad : false,
		storeId : 'grid1Store',
		fields : [ 
					'MODEL_CODE',
					'MODEL_NAME',
					'INSERT_USERID',
					'INSERT_USERNAME',
					'INSERTDATE',
					'USE_FLAG',
					'REMARK'
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
	var grid2Store = Ext.create('Ext.data.Store', {
		autoLoad : false,
		storeId : 'grid2Store',
		fields : [ 'MODEL_ET_ID',
		           'ET_NO',
		           'MODEL_CODE',
		           'ET_CONTEXT',
		           'PLAN_WORKTIME',
		           'PLAN_PERSON',
		           'PRE_ET_ID'


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
	var grid3Store = Ext.create('Ext.data.Store', {
		autoLoad : false,
		storeId : 'grid3Store',
		fields : [ 'MODEL_MAT_ID',
		           'MODEL_CODE',
		           'MATERIALCODE',
		           'MATERIALNAME',
		           'ETALON',
		           'MAT_CL',
		           'UNIT',
		           'F_PRICE',
		           'PLAN_AMOUNT'



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
		title : '检修模型信息查询',
		titleAlign : 'left',
		region : 'north',
		layout : 'vbox',
		frame : true,
		items : [ {
			xtype : 'panel',
			region : 'west',
			frame : true,
			baseCls : 'my-panel-noborder',
			layout : 'hbox',
			items : [ {
				xtype : 'textfield',
				labelAlign : 'right',
				style : ' margin: 0px 0px 0px 20px',
				value : '',
				fieldLabel : '模型名称',
				id : 'v_modelname',
				labelWidth : 80
			},{
				xtype : 'button',
				id : 'search',
				text : '查  询',
				width : '60',
				icon : imgpath + '/a1.gif',
				style : ' margin: 5px 0px 0px 45px',
				listeners : {
					click : OnClickSearch
				}
			},{
				xtype : 'button',
				id : 'toExcel',
				text : '导出Excel',
				width : '100',
				icon : imgpath + '/311.gif',
				style : ' margin: 5px 0px 0px 30px',
				listeners : {
					click : OnClickOutExcel
				}
			} ]
		}]
	});
	var grid1 = Ext.create('Ext.grid.Panel', {
		store : 'grid1Store',
		id : 'grid1',
		columnLines : true,
		region : 'center',
		autoScroll : true,
		selType : 'checkboxmodel',
		selModel : {
			showHeaderCheckbox : false
		},
		columns : [ {
			text : '模型名称',
			align : 'center',
			width : 100,
			dataIndex : 'MODEL_NAME'
		}, {
			text : '创建人ID',
			align : 'center',
			width : 100,
			dataIndex : 'INSERT_USERID'
		}, {
			text : '创建人名称',
			align : 'center',
			width : 100,
			dataIndex : 'INSERT_USERNAME'
		}, {
			text : '创建时间',
			align : 'center',
			dataIndex : 'INSERTDATE',
			width : 100
		}, {
			text : '备注',
			align : 'center',
			dataIndex : 'REMARK',
			width : 150
		}, {
			text : '模型工序',
			align : 'center',
			renderer:LookMore
		}, {
			text : '模型物料',
			align : 'center',
			renderer:LookMore2
		}]
		,
		dockedItems : [ panel ]
	});
	
	var window1 = Ext.create('Ext.window.Window', {
		id : 'window1',
		closeAction : 'hide',
		title : '模型工序',
		width : 460,
		height : 350,
		modal : true,
		frame : true,
		layout : 'fit',
		items : [ {
			xtype : 'panel',
			frame : true,
			baseCls : 'my-panel-noborder',
			layout : 'border',
			items : [ {
				xtype : 'grid',
				store : 'grid2Store',
				id : 'grid2',
				columnLines : true,
				region : 'center',
				autoScroll : true,
				selType : 'checkboxmodel',
				selModel : {
					showHeaderCheckbox : false
				},
				columns : [ {
					text : '工序号',
					id:'gxh',
					align : 'center',
					width : 100,
					dataIndex : 'ET_NO'
				}, {
					text : '工序内容',
					id:'gxnr',
					align : 'center',
					width : 100,
					dataIndex : 'ET_CONTEXT'
				}, {
					text : '计划工时',
					align : 'center',
					id:'jhgs',
					width : 100,
					dataIndex : 'PLAN_WORKTIME'
				}, {
					text : '计划人数',
					align : 'center',
					id:'jhrs',
					dataIndex : 'PLAN_PERSON',
					width : 100
				}, {
					text : '前置工序',
					align : 'center',
					id:'qzgx',
					dataIndex : 'PRE_ET_NAME',
					width : 150
				}]
				//,
				//dockedItems : [ panel ]
			
			  }]
			}]
		});
	var window2 = Ext.create('Ext.window.Window', {
		id : 'window2',
		closeAction : 'hide',
		title : '模型物料',
		width : 460,
		height : 350,
		modal : true,
		frame : true,
		layout : 'fit',
		items : [ {
			xtype : 'panel',
			frame : true,
			baseCls : 'my-panel-noborder',
			layout : 'border',
			items : [ {
				xtype : 'grid',
				store : 'grid3Store',
				id : 'grid3',
				columnLines : true,
				region : 'center',
				autoScroll : true,
				selType : 'checkboxmodel',
				selModel : {
					showHeaderCheckbox : false
				},
				columns : [ {
					text : '物料编码',
					id:'wlbm',
					align : 'center',
					width : 100,
					dataIndex : 'MATERIALCODE'
				}, {
					text : '物料名称',
					id:'wlmc',
					align : 'center',
					width : 100,
					dataIndex : 'MATERIALNAME'
				}, {
					text : '规格型号',
					id:'ggxh',
					align : 'center',
					width : 100,
					dataIndex : 'ETALON'
				}, {
					text : '材质',
					id:'cz',
					align : 'center',
					dataIndex : 'MAT_CL',
					width : 100
				}, {
					text : '单位',
					id:'dw',
					align : 'center',
					dataIndex : 'UNIT',
					width : 150
				}, {
					text : '单价',
					id:'dj',
					align : 'center',
					dataIndex : 'F_PRICE',
					width : 150
				}, {
					text : '计划数量',
					id:'jhsl',
					align : 'center',
					dataIndex : 'PLAN_AMOUNT',
					width : 150
				}],
				//dockedItems : [ panel ]
			
			  }]
			}]
		});
	
	Ext.create('Ext.container.Viewport', {
		layout : 'fit',
		items : [ grid1 ]
	});
})
	

function OnClickSearch() {
	Ext.data.StoreManager.lookup('grid1Store').load({
		params : {
			parName : [ 'v_modelname' ],
			parType : [ 's'],
			parVal : [ Ext.getCmp('v_modelname').getValue() ],
		    proName : 'pro_dj801_select',
		    cursorName : 'V_CURSOR'
						}
					});
}


function LookMore(value, metaData, record, rowIdx, colIdx, store, view) {
	return '<a  onclick="OnOpen1()" style="color:blue">模型工序</a>';
	
}
function LookMore2(value, metaData, record, rowIdx, colIdx, store, view) {
	return '<a  onclick="OnOpen2()" style="color:blue">模型物料</a>';
	
}
function OnOpen1(){
	Ext.getCmp('window1').show();
	selectedRecord = Ext.getCmp('grid1').getSelectionModel().getSelection();
	var modelcode=selectedRecord[0].data.MODEL_CODE;
	Ext.data.StoreManager.lookup('grid2Store').load({
		params : {
			parName : [ 'v_modelcode' ],
			parType : [ 's'],
			parVal : [ modelcode ],
		    proName : 'pro_dj801_selectet',
		    cursorName : 'V_CURSOR'
						}
					});
	
	
}
function OnOpen2(){
	Ext.getCmp('window2').show();
	selectedRecord = Ext.getCmp('grid1').getSelectionModel().getSelection();
	var modelcode=selectedRecord[0].data.MODEL_CODE;
	Ext.data.StoreManager.lookup('grid3Store').load({
		params : {
			parName : [ 'v_modelcode' ],
			parType : [ 's'],
			parVal : [ modelcode ],
		    proName : 'pro_dj801_selectmet',
		    cursorName : 'V_CURSOR'
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




function OnClickOutExcel() {
	var tableName = [ "序号","模型名称", "创建人ID", "创建人名称", "创建时间", "备注" ];
	var tableKey = [ 'MODEL_NAME', 'INSERT_USERID', 'INSERT_USERNAME', 'INSERTDATE', 'REMARK'];

	parName = ['v_modelname'];
	var parType = ['s'];
	var parVal = [ IsNull(Ext.getCmp('v_modelname').getValue())];
	var proName = 'pro_dj801_select';
	var ExcelName = 'Excel';
	var cursorName = 'RET';

	var returnStr = [ 'null' ];
	var returnStrName = [ 'null' ];
	var returnStrType = [ 'null' ];

	submitData(APP+"/ModelExcelTotal", tableName, tableKey, parName, parType,
			parVal, proName, returnStr, returnStrType, returnStrName,
			cursorName, "tital", "检修模型信息查询表");
}
function IsNull(value) {
	if (value == "" || value == null) {
		return 'null'
	} else {
		return value;
	}
}
