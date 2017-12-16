var orderId = '';
if (location.href.split('?')[1] != null) {
	orderId = Ext.urlDecode(location.href.split('?')[1]).orderId;
}

Ext.onReady(function() {
	var gridStore = Ext.create('Ext.data.Store', {
		autoLoad : false,
		storeId : 'gridStore',
		pageSize : 100,
		fields : [ 'KCID', 'MATERIALCODE', 'MATERIALNAME', 'ETALON', 'UNIT',
				'F_PRICE', 'KY_AMOUNT', 'STORE_DESC', 'NUM' ],
		proxy : {
			type : 'ajax',
			async : false,
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

	var typeStore = Ext.create("Ext.data.Store", {
		autoLoad : true,
		storeId : 'typeStore',
		fields : [ 'CODE', 'NAME' ],
		proxy : {
			type : 'ajax',
			async : false,
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
				proName : 'pro_mm_itype',
				cursorName : 'ret'
			}
		}
	});

	var list = Ext.create('Ext.panel.Panel', {
		region : 'north',
		bodyStyle : {
			background : 'none'
		},
		border : 0,
		defaults : {
			labelAlign : 'right',
			labelWidth : 60
		},
		items : [ {
			frame : true,
			style : 'margin-bottom:1px',
			defaults : {
				labelAlign : 'right',
				labelWidth : 80

			},
			layout : {
				type : 'table',
				columns : 3
			},
			items : [ {
				id : 'matType',
				xtype : 'combobox',
				fieldLabel : '物资分类',
				editable : false,
				store : typeStore,
				displayField : 'NAME',
				valueField : 'CODE',
				queryMode : 'local',
				labelAlign : 'right'
			},

			{
				id : 'matCode',
				xtype : 'textfield',
				fieldLabel : '物料编码'
			}, {
				id : 'matName',
				xtype : 'textfield',
				fieldLabel : '物料名称'
			}, {
				id : 'etalon',
				xtype : 'textfield',
				fieldLabel : '规格型号'
			},

			{
				xtype : 'button',
				text : '库存查询',
				id : 'kcQuery',
				margin : '0px 0px 0px 10px',
				icon : imgpath + '/a1.gif'
			} ]
		} ]
	});

	var grid = Ext.create('Ext.grid.Panel', {
		id : 'grid',
		region : 'center',
		columnLines : true,
		width : '100%',
		autoScroll : true,
		store : gridStore,
		dufaults : {
			width : 120
		},
		plugins : [ Ext.create('Ext.grid.plugin.CellEditing', {
			clicksToEdit : 1
		}) ],
		columns : [ {
			xtype : 'rownumberer',
			align : 'center'
		},

		{
			text : '物资编码',
			dataIndex : 'MATERIALCODE',
			align : 'center',
			width : 150
		}, {
			text : '物资名称',
			dataIndex : 'MATERIALNAME',
			align : 'center',
			width : 140
		}, {
			text : '规格型号',
			dataIndex : 'ETALON',
			align : 'center',
			width : 100
		}, {
			text : '计量单位',
			dataIndex : 'UNIT',
			align : 'center',
			flex : 1
		}, {
			text : '当前单价',
			dataIndex : 'F_PRICE',
			align : 'center',
			flex : 1
		},

		{
			text : '库存数量',
			dataIndex : 'KY_AMOUNT',
			align : 'center',
			flex : 1
		}, {
			text : '所需数量',
			dataIndex : 'NUM',
			align : 'center',
			flex : 1,
			editor : {
				xtype : 'numberfield',
				allowBlank : false,
				allowDecimals : 3,
				minValue : 0
			},
			renderer : function(value, metaData) {
				metaData.style = "text-align:right;background:#E7FF84";
				return value;
			}
		},

		{
			text : '添加',
			align : 'center',
			width : 60,
			renderer : LookMorexzdj
		},

		{
			text : '库存位置描述',
			dataIndex : 'STORE_DESC',
			align : 'center',
			width : 300
		}

		],
		bbar : [ '->', {
			xtype : 'pagingtoolbar',
			dock : 'bottom',
			displayInfo : true,
			displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
			emptyMsg : '没有记录',
			store : 'gridStore'
		} ]
	});

	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		autoScroll : true,
		items : [ list, grid ]
	});

	typeStore.on('load', function() {
		typeStore.insert(0,{'CODE':'%','NAME':'全部'});
		Ext.getCmp('matType').select(typeStore.getAt(0));
	});

	Ext.getCmp('kcQuery').on(
			'click',
			function() {
				gridStore.setProxy({
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
						parName : [ 'a_plantcode', 'a_departcode', 'a_itype',
								'a_materialcode', 'a_materialname','a_etalon' ],
						parType : [ 's', 's', 's', 's', 's' ,'s'],
						parVal : [ Ext.util.Cookies.get("mm.plantcode"),
								Ext.util.Cookies.get("mm.departcode"),
								Ext.getCmp('matType').getValue(), Ext.getCmp('matCode').getValue(), Ext.getCmp('matName').getValue(), Ext.getCmp('etalon').getValue() ],
						proName : 'pg_dj601.getmatkc',
						cursorName : 'ret'
					}
				});
				gridStore.load();
			});
	gridStore.on('load',function(){
	});

});
function LookMorexzdj(value, metaData, record, rowIdx, colIdx, store, view) {//
	return '<a  href="javascript:OpenDj(' + rowIdx + ')" >保存</a>';

}
function OpenDj(rowIdx) {
	var KY_AMOUNT = Ext.getStore('gridStore').data.items[rowIdx].data.KY_AMOUNT;
	var NUM = Ext.getStore('gridStore').data.items[rowIdx].data.NUM;

	if (KY_AMOUNT >=NUM  && NUM > 0) {
		Ext.Ajax
				.request({
					url : APP + "/ModelChange",
					method : 'POST',
					async : false,
					params : {
						parName : [ 'ORDERID_in',//
						'MATERIALCODE_in',//
						'MATERIALNAME_in',//
						'ETALON_in',//
						'MAT_CL_in',//
						'F_PRICE_in',//
						'PLAN_AMOUNT_in',//
						'usercode_in', 'username_in', 'kcid_in' ,'unit_in'],
						parType : [ 's', 's', 's', 's', 's', 'do', 'do', 's',
								's', 's','s' ],
						parVal : [
								orderId,
								Ext.getStore('gridStore').data.items[rowIdx].data.MATERIALCODE,
								Ext.getStore('gridStore').data.items[rowIdx].data.MATERIALNAME,
								Ext.getStore('gridStore').data.items[rowIdx].data.ETALON,
								'',//本页面没有材料参数，传空
								Ext.getStore('gridStore').data.items[rowIdx].data.F_PRICE,
								Ext.getStore('gridStore').data.items[rowIdx].data.NUM,
								Ext.util.Cookies.get("mm.userid"),
								Ext.util.Cookies.get("mm.username"),
								Ext.getStore('gridStore').data.items[rowIdx].data.KCID,Ext.getStore('gridStore').data.items[rowIdx].data.UNIT

						],
						proName : 'pro_dj601_saveordermat',
						returnStr : [ 'RET' ],
						returnStrType : [ 's' ]
					},
					success : function(response, options) {
						var resp = Ext.decode(response.responseText);

						if (resp == "Success") {
							Ext.example.msg("提示", '提交成功');
							kcQuery();
						} else {
							Ext.example.msg("提示", '提交失败');
						}
					}
				})
	} else {
		Ext.example.msg("提示", '所需数量需大于库存数量');
	}
}