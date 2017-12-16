var type = '';
if (location.href.split('?')[1] != null) {
	type = Ext.urlDecode(location.href.split('?')[1]).type;
}

Ext
		.onReady(function() {

			function left(value, metaData, record, rowIndex, colIndex, store) {
				metaData.style = "text-align:left;";
				return value;
			}
			function right(value, metaData, record, rowIndex, colIndex, store) {
				metaData.style = "text-align:right;";
				return value;
			}

			var menddeptStore = Ext.create("Ext.data.Store", {
				autoLoad : true,
				storeId : 'menddeptStore',
				fields : [ 'MENDDEPT_CODE', 'MENDDEPT_NAME' ],
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
						parName : [ 'usercode_in' ],
						parType : [ 's' ],
						parVal : [ Ext.util.Cookies.get("mm.userid") ],
						proName : 'pro_dj601_menddept_dept_user',
						cursorName : 'ret'
					}
				}
			});

			var gridStore = Ext.create('Ext.data.Store', {

				storeId : 'gridStore',
				pageSize : 200,
				fields : [ 'DJ_UQ_CODE', 'DJ_NAME', 'APPLY_PLANTNAME',
						'MEND_CONTEXT', 'INSERTDATE', 'REMARK', 'APPLY_ID',
						'ORDERID', 'MEND_CODE','DJ_VOL','MEND_TYPE' ],
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

			var gridStore2 = Ext.create('Ext.data.Store', {

				storeId : 'gridStore2',
				pageSize : 200,
				fields : [ 'ORDERID', 'DJ_UQ_CODE', 'DJ_NAME', 'PLANTCODE',
						'MEND_CONTEXT', 'MENDDEPT_NAME', 'MEND_USERNAME',
						'APPLY_PLANTNAME','MEND_TYPE' ],
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

			var list1 = Ext.create('Ext.panel.Panel', {
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
						labelWidth : 60
					},
					layout : {
						type : 'table',
						columns : 4
					},
					items : [ {
						id : 'MENDDEPT',
						xtype : 'combobox',
						fieldLabel : '检修单位',
						store : menddeptStore,
						editable : false,
						displayField : 'MENDDEPT_NAME',
						valueField : 'MENDDEPT_CODE',
						queryMode : 'local'
					},

					{
						id : 'DJ_UQ_CODE',
						xtype : 'textfield',
						fieldLabel : '电机编号'
					}, {
						id : 'DJ_NAME',
						xtype : 'textfield',
						fieldLabel : '电机名称'
					}, {
						id : 'ORDERID',
						xtype : 'textfield',
						fieldLabel : '检修编号',
						emptyText:'仅对检修申请查询时有效'
					},

					{
						xtype : 'button',
						text : '查询',
						id : 'query',
						margin : '0px 0px 4px 10px',
						icon : imgpath + '/a1.gif'
					}

					]
				} ]
			});

			var grid = Ext
					.create(
							'Ext.grid.Panel',
							{
								id : 'grid',
								region : 'center',
								columnLines : true,
								width : '100%',
								title : '检修申请',
								autoScroll : true,
								store : gridStore,
								dufaults : {
									width : 120
								},
//								plugins : [ Ext.create(
//										'Ext.grid.plugin.CellEditing', {
//											clicksToEdit : 1
//										}) ],
								columns : [
										{
											text : '创建工单',
											align : 'center',
											xtype : 'templatecolumn',
											width : 100,
											tpl : '<a style="cursor:pointer;text-decoration:underline; color:#00F">创建</a>',
											id : 'add'
										}, {
											text : '检修编号',
											dataIndex : 'MEND_CODE',
											align : 'center',
											width : 130,renderer:function(value,meta){meta.style='text-align:left;';return value;}
											
										}, {
											text : '电机编号',
											dataIndex : 'DJ_UQ_CODE',
											align : 'center',
											width : 130,renderer:function(value,meta){meta.style='text-align:left;';return value;}
										}, {
											text : '电机名称',
											dataIndex : 'DJ_NAME',
											align : 'center',
											width : 130,renderer:function(value,meta){meta.style='text-align:left;';return value;}
										}, {
											text : '电机容量',
											dataIndex : 'DJ_VOL',
											align : 'center',
											width : 80,renderer:function(value,meta){meta.style='text-align:left;';return value;}
										}, {
											text : '申请厂矿',
											dataIndex : 'APPLY_PLANTNAME',
											align : 'center',
											width : 100,renderer:function(value,meta){meta.style='text-align:left;';return value;}
										}, {
											text : '维修类型',
											dataIndex : 'MEND_TYPE',
											align : 'center',
											width : 80,renderer:function(value,meta){meta.style='text-align:left;';return value;}
										}, {
											text : '维修内容',
											dataIndex : 'MEND_CONTEXT',
											align : 'center',
											width : 200,renderer:function(value,meta){meta.style='text-align:left;';return value;}
										}, {
											text : '录入时间',
											dataIndex : 'INSERTDATE',
											align : 'center',
											width : 100
										}, {
											text : '备注',
											dataIndex : 'REMARK',
											align : 'center',
											width : 200,renderer:function(value,meta){meta.style='text-align:left;';return value;}
										} ],
								bbar : [ '->', {
									xtype : 'pagingtoolbar',
									id : 'pagingtoolbar',
									dock : 'bottom',
									displayInfo : true,
									displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
									emptyMsg : '没有记录',
									store : 'gridStore'
								} ]
							});

			var grid2 = Ext
					.create(
							'Ext.grid.Panel',
							{
								id : 'grid2',
								region : 'center',
								columnLines : true,
								width : '100%',
								title : '待下达工单',
								autoScroll : true,
								store : gridStore2,
								dufaults : {
									width : 120
								},
								columns : [
										{
											text : '下达工单',
											align : 'center',
											xtype : 'templatecolumn',
											width : 70,
											tpl : '<a style="cursor:pointer;text-decoration:underline; color:#00F">下达</a>',
											id : 'entrust'
										},
										{
											text : '编辑修改',
											align : 'center',
											xtype : 'templatecolumn',
											width : 70,
											tpl : '<a style="cursor:pointer;text-decoration:underline; color:#00F">编辑</a>',
											id : 'edit'
										}, {
											text : '工单号',
											dataIndex : 'ORDERID',
											align : 'center',
											width : 120,renderer:function(value,meta){meta.style='text-align:left;';return value;}
										}, {
											text : '电机编号',
											dataIndex : 'DJ_UQ_CODE',
											align : 'center',
											width : 120,renderer:function(value,meta){meta.style='text-align:left;';return value;}
										}, {
											text : '电机名称',
											dataIndex : 'DJ_NAME',
											align : 'center',
											width : 120,renderer:function(value,meta){meta.style='text-align:left;';return value;}
										}, {
											text : '申请厂矿',
											dataIndex : 'APPLY_PLANTNAME',
											align : 'center',
											width : 130,renderer:function(value,meta){meta.style='text-align:left;';return value;}
										}, {
											text : '维修类型',
											dataIndex : 'MEND_TYPE',
											align : 'center',
											width : 80,renderer:function(value,meta){meta.style='text-align:left;';return value;}
										}, {
											text : '维修内容',
											dataIndex : 'MEND_CONTEXT',
											align : 'center',
											width : 200,renderer:function(value,meta){meta.style='text-align:left;';return value;}
										}, {
											text : '检修班组',
											dataIndex : 'MENDDEPT_NAME',
											align : 'center',
											width : 130,renderer:function(value,meta){meta.style='text-align:left;';return value;}
										}, {
											text : '负责人',
											dataIndex : 'MEND_USERNAME',
											align : 'center',
											width : 80,renderer:function(value,meta){meta.style='text-align:left;';return value;}
										}

								],
								bbar : [ '->', {
									xtype : 'pagingtoolbar',
									id : 'pagingtoolbar',
									dock : 'bottom',
									displayInfo : true,
									displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
									emptyMsg : '没有记录',
									store : 'gridStore'
								} ]
							});

			var tab = Ext.create('Ext.tab.Panel', {
				id : 'tab',
				region : 'center',
				layout : 'border',
				items : [ grid, grid2 ]
			});

			var rightPanel = Ext.create('Ext.panel.Panel', {
				region : 'center',
				layout : 'border',
				frame : true,
				autoScroll : true,
				items : [ list1, tab ]
			});

			Ext.create('Ext.container.Viewport', {
				layout : 'border',
				autoScroll : true,
				items : [ rightPanel ]
			});

			gridStore.on('beforeload', function(store, options) {
				var params = {
					parName : [ 'plantcode_in', 'DJ_UQ_CODE_in', 'DJ_NAME_in','orderid_in',
							'usercode_in' ],
					parType : [ 's', 's', 's', 's','s' ],
					parVal : [ Ext.getCmp('MENDDEPT').getValue(),
							Ext.getCmp('DJ_UQ_CODE').getValue(),
							Ext.getCmp('DJ_NAME').getValue(),
							Ext.getCmp('ORDERID').getValue(),
							Ext.util.Cookies.get("mm.userid") ],
					proName : 'pro_dj601_waitapplylist',
					cursorName : 'RET'
				};
				Ext.apply(store.proxy.extraParams, params);
			})

			Ext.getCmp('query').on('click', query);
            Ext.getCmp("tab").on('tabchange', query);
			function query() {
			    if(Ext.getCmp("tab").activeTab.title=='检修申请')
				{
					gridStore.load();
				}
				else
				{
					gridStore2.load();
				}
			}

			gridStore2.on('beforeload', function(store, options) {
				var params = {
					parName : [ 'MENDDEPT_CODE_in', 'DJ_UQ_CODE_in',
							'DJ_NAME_in', 'usercode_in' ],
					parType : [ 's', 's', 's', 's' ],
					parVal : [ Ext.getCmp('MENDDEPT').getValue(),
							Ext.getCmp('DJ_UQ_CODE').getValue(),
							Ext.getCmp('DJ_NAME').getValue(),
							Ext.util.Cookies.get("mm.userid") ],
					proName : 'pro_dj601_orderlist_wait',
					cursorName : 'RET'
				};
				Ext.apply(store.proxy.extraParams, params);
			})

			menddeptStore.on('load', function() {

				Ext.getCmp('MENDDEPT').select(menddeptStore.getAt(0));

				query();
			})

			/** 下达 */
			Ext.getCmp('entrust').on('click', entrust);
			function entrust(a, b, c, d) {

				Ext.Ajax
						.request({
							url : APP + "/ModelChange",
							method : 'POST',
							params : {
								parName : [ 'ORDERID_in', 'usercode_in',
										'username_in' ],
								parType : [ "s", 's', 's' ],
								parVal : [ gridStore2.getAt(c).get("ORDERID"),
										Ext.util.Cookies.get("mm.userid"),
										Ext.util.Cookies.get("mm.username") ],
								proName : "pro_dj601_order_download",
								returnStr : [ 'ret' ],
								returnStrType : [ 's' ]
							},
							success : function(response, options) {

								var resp = Ext.decode(response.responseText);
								if (resp == "Success") {
									Ext.example.msg("提示", '执行成功');
									query();
								} else {
									Ext.example.msg("提示", '执行失败');
								}
							}
						})

			}

			Ext.getCmp('add').on(
					'click',
					function(a, b, c, d) {

						var applyId = gridStore.getAt(c).get("APPLY_ID")
						var code = gridStore.getAt(c).get("DJ_UQ_CODE")
						var name = gridStore.getAt(c).get("DJ_NAME")
						var content = gridStore.getAt(c).get("MEND_CONTEXT")
						var mend_dept = Ext.getCmp('MENDDEPT').getValue()
						var mendcode = gridStore.getAt(c).get("MEND_CODE")
var vol = gridStore.getAt(c).get("DJ_VOL")
						var returnVal = window.showModalDialog(APP
								+ "/page/DJ/DJ601add.jsp?applyId=" + applyId
								+ "&code=" + code + "&name=" + name
								+ "&content=" + content + "&mend_dept="
								+ mend_dept + "&mendcode=" + mendcode+"&vol="+vol, null,
								"dialogWidth=1200px;dialogHeight=550px");
						
							query();
						
					});

			Ext.getCmp('edit').on(
					'click',
					function(a, b, c, d) {
		
						var returnVal = window.showModalDialog(APP
						+ "/page/DJ/DJ601edit.jsp?orderId="+gridStore2.getAt(c).get("ORDERID")
						+"&content="+gridStore2.getAt(c).get("MEND_CONTEXT"), null,
								"dialogWidth=1200px;dialogHeight=550px");
								
						query();
					});

		});
