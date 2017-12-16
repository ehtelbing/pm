//123123
var GridModel = Ext.create('Ext.selection.RowModel', {});
Ext.onReady(function() {
			Ext.QuickTips.init();

			var gridStore = Ext.create('Ext.data.Store', {
				id : 'gridStore',
				autoLoad : false,
				fields : [ 'MAT_NO', 'MAT_DESC', 'UNIT', 'PLAN_PRICE',
						'DICTNAME', 'BEIJIANPORPERTY', 'MAT_GROUP',
						'MAT_OLD_NO', 'DAYS' ],
				proxy : {
					type : 'ajax',
					async : false,
					url : AppUrl + 'mm/WS_MMToXLReadMaterailService',
					actionMethods : {
						read : 'POST'
					},

					reader : {
						type : 'json',
						root : 'list'
					}
				}
			});

			var tab = Ext.create('Ext.tab.Panel', {
				id : 'tabpanel',
				xtype : 'tabpanel',
				activeTab : 0,
				listeners : {
					beforerender : addTab
				}
			});

			function addTab() {
				Ext.ComponentManager.get("tabpanel").add({
					title : '物料主数据',
					items : [ {
						xtype : 'hidden',
						value : 0
					} ],
					dockedItems : [ {
						xtype : 'panel',
						layout : 'column',
						items : [ {
							xtype : 'textfield',
							fieldLabel : '物料编码',
							id : 'matCode',
							labelAlign : 'right',
							labelWidth : 60
						}, {
							xtype : 'textfield',
							fieldLabel : '物料名称',
							id : 'matDesc',
							labelAlign : 'right',
							labelWidth : 60
						}, {
							xtype : 'combo',
							fieldLabel : '物资类别',
							id : 'selType',
							editable : false,
							store : [ [ '材料', '材料' ], [ '备件', '备件' ] ],
							labelAlign : 'right',
							labelWidth : 60
						},{
							xtype : 'button',
							text : '查询',
							icon :imgpath + '/search.png',
							width : 60,
							margin : '0px 0px 0px 10px',
							listeners : {
								click : loadQuery
							}
						} ]
					}, {
						xtype : 'gridpanel',
						id : 'grid',
						store : gridStore,
						columnLines : true,
						autoScroll : true,
						width : 500,
						height : 360,
						columns : [ {
							text : '物料编码',
							id : 'codeClick',
							dataIndex : 'MAT_NO',
							width : 100,
							renderer : AddFloat
						}, 
						{
							text : '物料描述',
							dataIndex : 'MAT_DESC',
							width : 160,
							renderer : AddFloat
						}, {
							text : '单位',
							dataIndex : 'UNIT',
							width : 40,
							renderer : AddFloat
						}, {
							text : '计划价',
							dataIndex : 'PLAN_PRICE',
							width : 60,
							renderer : AddFloat
						}, {
							text : '规格型号',
							dataIndex : 'MAT_OLD_NO',
							width : 80,
							renderer : AddFloat
						} ],
						listeners : {
							itemclick : BackItem
						}
					} ]
				});

				Ext.ComponentManager.get("tabpanel").setActiveTab(0);
			}

			function loadQuery() {
				if (Ext.getCmp('matCode').getValue() == '') {
					Ext.MessageBox.alert('操作信息', '物料编码不能为空');
				} else {
					gridStore.proxy.extraParams.x_code = Ext.getCmp('matCode').getValue();
					gridStore.proxy.extraParams.x_name = Ext.getCmp('matDesc').getValue();
					gridStore.proxy.extraParams.x_type = Ext.getCmp('selType').getValue();
					gridStore.proxy.extraParams.x_personcode = Ext.util.Cookies.get('v_personcode');
					Ext.ComponentManager.get('grid').getStore().load();
				}
			}

			function BackItem(aa, record, item, index, e, eOpts) {
				var matCode = record.data.MAT_NO;
				var matDesc = record.data.MAT_DESC;
				var unit = record.data.UNIT;
				var price = record.data.PLAN_PRICE;
				var matgon = record.data.MAT_OLD_NO;

				var threeParams = matCode + '^' + matDesc + '^' + unit + '^' + price + '^' + matgon ;
				window.opener.getWLReturnValue(threeParams);
				window.close();
			}

		

			function AddFloat(value, metaData, record, rowIndex, colIndex,
					store, view) {
				return '<div data-qtip="' + value + '" >' + value + '</div>';
			}


			Ext.create('Ext.container.Viewport', {
				items : [ tab ]
			});

			Ext.ComponentManager.get('selType').select('材料');

		});
