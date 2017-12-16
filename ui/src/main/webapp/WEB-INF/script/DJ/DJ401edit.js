var code = '';
var unicode = '';
var djname = '';
var plantcode='',plantname='',departcode='',departname='';
var apply_id = '';
if (location.href.split('?')[1] != null) {
	apply_id = Ext.urlDecode(location.href.split('?')[1]).apply_id;
}

var gridStorexzdj = Ext.create('Ext.data.Store', {

	storeId : 'gridStorexzdj',
	pageSize : 100,
	fields : [ 'DJ_UNIQUE_CODE', 'DJ_NAME', 'DJ_TYPE', 'DJ_SERIES_CLASS',
			'DJ_VOL', 'DJ_V', 'DJ_CS', 'DJ_DXTYPE', 'DJ_WEIGHT', 'DJ_CS_DZ',
			'DJ_CS_ZZ', 'WORK_STATUS', 'PLANTCODE', 'PLANTNAME', 'DEPARTCODE',
			'DEPARTNAME', 'LOC_PLANTCODE', 'LOC_PLANTNAME', 'DJ_LOC', 'REMARK',
			'INSERTDATE', 'DZ_V', 'DZ_A', 'ZZ_V', 'ZZ_A', 'W_YINSHU', 'EDZS',
			'JXFS', 'JYDJ', 'SUPPLY_CODE', 'SUPPLY_NAME', 'PRODUCE_DATE',
			'DJ_CODE'],
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
Ext.onReady(function() {

			var uuid = Ext.data.IdGenerator.get('uuid').generate();

			var gridStore = Ext.create('Ext.data.Store', {

				storeId : 'gridStore',
				pageSize : 100,
				fields : [ 'ID', 'BYQ_UNIQUE_CODE', 'OP_TYPE', 'OP_CONTEXT',
						'OP_DATE', 'OP_USERID', 'OP_USERNAME', 'REMARK' ],
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
				pageSize : 100,
				fields : [ 'ID', 'APPLY_ID', 'MATERIALCODE', 'MATERIALNAME',
						'ETALON', 'MAT_CL', 'UNIT', 'AMOUNT', 'F_PRICE',
						'KC_ID' ],
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

			var gridStore3 = Ext.create('Ext.data.Store', {

				storeId : 'gridStore3',
				pageSize : 100,
				fields : [ 'ID', 'kcsl', 'sxsl', 'MATCODE', 'MATNAME',
						'ETALON', 'MATCL', 'UNIT', 'FPRICE', 'AMOUNT',
						'KC_AMOUNT' ],
				proxy : {
					type : 'ajax',
					async : false,
					url : APP + '/RepertoryList',
					actionMethods : {
						read : 'POST'
					},
					reader : {
						type : 'json',
						root : 'list'
					}
				}
			});

			var plantStore = Ext.create("Ext.data.Store", {
				autoLoad : true,
				storeId : 'plantStore',
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
						parName : [],
						parType : [],
						parVal : [],
						proName : 'pro_dj401_mendplant',
						cursorName : 'P_CUR'
					}
				}
			});
			var mendtypeStore = Ext.create("Ext.data.Store", {
				autoLoad : true,
				storeId : 'plantStore',
				fields : [ 'MENDTYPE', 'MENDTYPE_DESC' ],
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
						proName : 'pro_dj102_mendtype_able',
						cursorName : 'P_CUR'
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
						cursorName : 'P_CUR'
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
						labelWidth : 80
					},
					width : 800,
					layout : {
						type : 'table',
						columns : 3
					},
					items : [

					{
						id : 'plant',
						xtype : 'textfield',
						fieldLabel : '厂矿',
						readOnly : true,
						value : plantname
					}, {
						id : 'dept',
						xtype : 'textfield',
						fieldLabel : '部门',
						readOnly : true,
						value : departname
					}, {
						id : 'personnel',
						xtype : 'textfield',
						fieldLabel : '录入人',
						readOnly : true,
						value : Ext.util.Cookies.get("mm.username")
					},

					{
						id : 'ORDERID',
						xtype : 'textfield',
						fieldLabel : '工单号'
					}, {
						id : 'DJ_CODE',
						xtype : 'textfield',
						fieldLabel : '电机编号'
					},{
						id : 'mendtype',
						xtype : 'combobox',
						fieldLabel : '维修类别',
						editable : false,
						queryMode : 'local',
						labelAlign : 'right',
						displayField : 'MENDTYPE_DESC',
						valueField : 'MENDTYPE',
						store : mendtypeStore
					}, {
						id : 'DJ_NAME',
						xtype : 'textfield',
						fieldLabel : '电机名称'
					}, {
						id : 'DJ_UQ_CODE',
						xtype : 'textfield',
						
						fieldLabel : '电机唯一编号'
					},{
						width : 260,
						border : 0,
						bodyStyle : 'background:none',
						layout : 'column',
						defaults : {
							labelAlign : 'right',
							labelWidth : 15
						},
						items : [ {
						xtype : 'button',
						text : '选择',
						margin : '0px 0px 0px 10px',
						handler : Bind
					}, {
						xtype : 'button',
						text : '详细',
						margin : '0px 0px 0px 10px',
						handler : Select
					}]
					}, {
						id : 'MEND_CONTEXT',
						xtype : 'textarea',
						fieldLabel : '问题描述',
						colspan : 3,
						width : 755
					},

					{
						width : 260,
						border : 0,
						bodyStyle : 'background:none',
						layout : 'column',
						defaults : {
							labelAlign : 'right',
							labelWidth : 15
						},
						items : [ {
							id : 'PLAN_BEGINDATE',
							xtype : 'datefield',
							fieldLabel : '计划开始时间',
							format : 'Y-m-d',
							labelWidth : 80,
							width : 180,
							value : new Date()
						},

						{
							xtype : 'numberfield',
							id : 'b-hour',
							fieldLabel : '',
							minValue : 0,
							maxValue : 24,
							width : 40,
							value : 00
						}, {
							xtype : 'numberfield',
							id : 'b-mm',
							fieldLabel : '',
							minValue : 0,
							maxValue : 60,
							width : 40,
							value : 00
						} ]
					},

					{
						width : 260,
						border : 0,
						bodyStyle : 'background:none',
						layout : 'column',
						defaults : {
							labelAlign : 'right',
							labelWidth : 15
						},
						items : [ {
							id : 'PLAN_ENDDATE',
							xtype : 'datefield',
							fieldLabel : '计划完成时间',
							format : 'Y-m-d',
							labelWidth : 80,
							width : 180,
							value : new Date()
						},

						{
							xtype : 'numberfield',
							id : 'e-hour',
							fieldLabel : '',
							minValue : 0,
							maxValue : 24,
							width : 40,
							value : 00
						}, {
							xtype : 'numberfield',
							id : 'e-mm',
							fieldLabel : '',
							minValue : 0,
							maxValue : 60,
							width : 40,
							value : 00
						} ]
					},

					{
						id : 'APPLY_PLANT',
						xtype : 'combobox',
						fieldLabel : '接收厂矿',
						editable : false,
						queryMode : 'local',
						labelAlign : 'right',
						displayField : 'MENDDEPT_NAME',
						valueField : 'MENDDEPT_CODE',
						store : plantStore
					},

					{
						id : 'REMARK',
						xtype : 'textarea',
						fieldLabel : '备注说明',
						colspan : 3,
						width : 755
					},

					{
						xtype : 'button',
						text : '保存工单申请',
						id : 'save',
						margin : '0px 0px 0px 85px',
						icon : imgpath + '/save.gif'
					} ]
				} ]
			});

			var grid = Ext
					.create(
							'Ext.grid.Panel',
							{
								id : 'grid',
								region : 'center',
								columnLines : true,
								title : '附带物料列表',
								width : '100%',
								autoScroll : true,
								store : gridStore2,
								dufaults : {
									width : 120
								},
								columns : [
										{
											xtype : 'rownumberer',
											align : 'center'
										},

										{
											text : '物料编码',
											dataIndex : 'MATERIALCODE',
											align : 'center',
											width : 130
										},
										{
											text : '物料名称',
											dataIndex : 'MATERIALNAME',
											align : 'center',
											width : 130
										},
										{
											text : '规格型号',
											dataIndex : 'ETALON',
											align : 'center',
											width : 130
										},
										{
											text : '材质',
											dataIndex : 'MAT_CL',
											align : 'center',
											width : 130
										},
										{
											text : '计量单位',
											dataIndex : 'UNIT',
											align : 'center',
											width : 130
										},

										{
											text : '单价',
											dataIndex : 'F_PRICE',
											align : 'center',
											width : 130
										},
										{
											text : '数量',
											dataIndex : 'AMOUNT',
											align : 'center',
											width : 130
										},
										{
											text : '',
											align : 'center',
											xtype : 'templatecolumn',
											width : 60,
											tpl : '<a style="cursor:pointer;text-decoration:underline; color:#00F">删除</a>',
											id : 'delete'
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

			var list2 = Ext.create('Ext.panel.Panel', {
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
						columns : 4
					},
					items : [ {
						id : 'matType',
						xtype : 'combobox',
						fieldLabel : '物资分类',
						editable : false,
						store : typeStore,
						displayField : 'CODE',
						valueField : 'NAME',
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

			var grid2 = Ext
					.create(
							'Ext.grid.Panel',
							{
								id : 'grid2',
								region : 'center',
								columnLines : true,
								width : '100%',
								autoScroll : true,
								store : gridStore3,
								dufaults : {
									width : 120
								},
								plugins : [ Ext.create('Ext.grid.plugin.CellEditing', {
											clicksToEdit : 1
								})],
								columns : [
										{
											xtype : 'rownumberer',
											align : 'center'
										},

										{
											text : '物资编码',
											dataIndex : 'OP_DATE',
											align : 'center',
											width : 150
										},
										{
											text : '物资名称',
											dataIndex : 'OP_USERNAME',
											align : 'center',
											width : 140
										},
										{
											text : '规格型号',
											dataIndex : 'OP_TYPE',
											align : 'center',
											width : 100
										},
										{
											text : '计量单位',
											dataIndex : 'OP_CONTEXT',
											align : 'center',
											flex : 1
										},
										{
											text : '当前单价',
											dataIndex : 'REMARK',
											align : 'center',
											flex : 1
										},

										{
											text : '库存数量',
											dataIndex : 'REMARK',
											align : 'center',
											flex : 1
										},
										{
											text : '所需数量',
											dataIndex : 'REMARK',
											align : 'center',
											flex : 1,
											editor : {
												xtype : 'numberfield',
												allowBlank : false,
												allowDecimals : false,
												minValue : 0
											}
										},

										{
											text : '添加',
											align : 'center',
											xtype : 'templatecolumn',
											width : 60,
											tpl : '<a style="cursor:pointer;text-decoration:underline; color:#00F">保存</a>',
											id : 'saveRow'
										},

										{
											text : '库存位置描述',
											dataIndex : 'REMARK',
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
									store : 'gridStore3'
								} ]
							});
			/** 选择电机 */
			var window1 = Ext.create('Ext.window.Window', {
				id : 'window1',
				title : '选择电机',
				titleAlign:'center',
				frame : true,
				width : 500,
				height : 400,
				region : 'center',
				layout : 'border',
				closeAction : 'hide',
				modal : true,
				defaults : {
					labelWidth : 90,
					labelAlign : 'right',
					width : 300,
					style : 'margin-top:8px'
				},
				items : [
				{xtype : 'grid',
				id : 'gridxzdj',
				region : 'center',
				columnLines : true,
				// selType : 'checkboxmodel',
				store : gridStorexzdj,
				columns : [ {
					text : '选择',
					id : 'wydjbh',
					 dataIndex : 'DJ_UNIQUE_CODE',
					align : 'center',
					renderer : LookMorexzdj
				   
				}, {
					text : '电机编号',
					id : 'djbh',
					dataIndex : 'DJ_CODE',
					align : 'center'
				}, {
					text : '电机名称',
					id : 'djmc',
					 dataIndex : 'DJ_NAME',
					align : 'center'
				} ]
				}]
			});
			var tab = Ext.create('Ext.tab.Panel', {
				id : 'tab',
				region : 'center',
				layout : 'border',
				items : [ grid, {
					title : '库存查询',
					layout : 'border',
					items : [ list2, grid2 ]
				} ]
			});

			Ext.create('Ext.container.Viewport', {
				layout : 'border',
				autoScroll : true,
				items : [ list1, tab ]
			});

			tab1Query();

			function tab1Query() {
				gridStore2.load({
					params : {
						parName : [ 'applyid_in' ],
						parType : [ 's' ],
						parVal : [ apply_id ],
						proName : 'pro_dj401_applymatlist',
						cursorName : 'RET'
					}
				});
			}

			Ext.getCmp('save').on('click', saveContent);
			function saveContent() {
				if (Ext.getCmp('ORDERID').getValue() == "") {
					Ext.example.msg('操作信息', "工单号不能为空");
					return false;
				}
				if (Ext.getCmp('DJ_CODE').getValue() == "") {
					Ext.example.msg('操作信息', "电机编号不能为空");
					return false;
				}
				if (Ext.getCmp('DJ_NAME').getValue() == "") {
					Ext.example.msg('操作信息', "电机名称不能为空");
					return false;
				}
				if (Ext.getCmp('DJ_UQ_CODE').getValue() == "") {
					Ext.example.msg('操作信息', "电机唯一编号不能为空");
					return false;
				}
				if (Ext.getCmp('MEND_CONTEXT').getValue() == ""||Ext.getCmp('MEND_CONTEXT').getValue().length<5) {
					Ext.example.msg('操作信息', "检修内容不能为空且不能少于5个字");
					return false;
				}
				var hour = Ext.getCmp('b-hour').getValue();
				if (hour.length < 2 || hour < 10) {
					hour = "0" + hour;
				}
				var mm = Ext.getCmp('b-mm').getValue();
				if (mm.length < 2 || hour < 10) {
					mm = "0" + mm;
				}
				var start = Ext.util.Format.date(Ext.getCmp('PLAN_BEGINDATE').getValue(), 'Y-m-d')+ " " + hour + ":" + mm + ":00";
				var hour = Ext.getCmp('e-hour').getValue();
				if (hour.length < 2 || hour < 10) {
					hour = "0" + hour;
				}
				var mm = Ext.getCmp('e-mm').getValue();
				if (mm.length < 2 || hour < 10) {
					mm = "0" + mm;
				}
				var end = Ext.util.Format.date(Ext.getCmp('PLAN_ENDDATE').getValue(), 'Y-m-d')+ " " + hour + ":" + mm + ":00";
				Ext.Ajax.request({
					url : APP + '/ModelChange',
					method : 'POST',
					async : false,
					params : {
						parName : [ 'applyid_in', 'plantcode_in','plantname_in', 'departcode_in','departname_in', 'usercode_in', 'username_in','billcode_in', 'djcode_in', 'djname_in','context_in', 'begindate_in', 'enddate_in','remark_in', 'djcode_in','mend_type_in' ],
						parType : [ 's', 's', 's', 's', 's', 's', 's', 's','s', 's', 's', 'dt', 'dt', 's', 's', 's' ],
						parVal : [apply_id,
								plantcode,
								plantname,
								departcode,
								departname,
								Ext.util.Cookies.get("mm.userid"),
								Ext.util.Cookies.get("mm.username"),
								Ext.getCmp('ORDERID').getValue(),
								Ext.getCmp('DJ_UQ_CODE').getValue(),
								Ext.getCmp('DJ_NAME').getValue(),
								Ext.getCmp('MEND_CONTEXT').getValue(), 
								start,
								end, 
								Ext.getCmp('REMARK').getValue(),
								Ext.getCmp('DJ_CODE').getValue(),
								Ext.getCmp('mendtype').getValue() 								
								],
						proName : 'pro_dj401_applyupdate',
						returnStr : [ 'RET' ],
						returnStrType : [ 's' ]
					},
					success : function(response) {

						var resp = Ext.decode(response.responseText);

						if (resp == "Success") {
							Ext.example.msg("提示", '执行成功');

							//loadForm();
							//tab1Query();

							window.returnValue = "success";
							window.close();
						} else {
							Ext.example.msg("提示", '执行失败');
						}
					}
				});
			}

			Ext.getCmp('delete').on('click', function(a, b, c, d) {

				Ext.Ajax.request({
					url : APP + "/ModelChange",
					method : 'POST',
					async : false,
					params : {
						parName : [ 'id_in' ],
						parType : [ 's' ],
						parVal : [ gridStore2.getAt(c).get("ID") ],
						proName : 'pro_dj401_deleteapplymat',
						returnStr : [ 'RET' ],
						returnStrType : [ 's' ]
					},
					success : function(response, options) {
						var resp = Ext.decode(response.responseText);
						if (resp == "Success") {
							Ext.example.msg("提示", '删除成功');
							tab1Query();
						} else {
							Ext.example.msg("提示", '删除失败');
						}

					}
				});
			});

			typeStore.on('load', function() {
				Ext.getCmp('matType').select(typeStore.getAt(0));
			});
			plantStore.on('load', function() {
				Ext.getCmp('APPLY_PLANT').select(plantStore.getAt(0));
			});
			Ext.getCmp('kcQuery').on('click', function() {
				gridStore3.load(
				{
					params : {
						plantcode : plantcode
					}
				});
			});
			loadForm();
			function loadForm() {

				Ext.Ajax
						.request({

							url : APP + "/ModelSelect",
							method : 'POST',
							params : {
								parName : [ 'applyid_in' ],
								parType : [ 's' ],
								parVal : [ apply_id ],
								proName : 'pro_dj401_applymes',
								cursorName : 'RET'
							},
							success : function(response, options) {
								var resp = Ext.decode(response.responseText);
								if (resp.list.length > 0) {
									plantcode = resp.list[0].APPLY_PLANT;
									departcode = resp.list[0].APPLY_DEPART;
									plantname = resp.list[0].APPLY_PLANTNAME;
									departname = resp.list[0].APPLY_DEPARTNAME;
									Ext.getCmp('plant').setValue(plantname);  
									Ext.getCmp('dept').setValue(departname);  
									Ext.getCmp('ORDERID').setValue(resp.list[0].ORDERID);
									Ext.getCmp('DJ_UQ_CODE').setValue(resp.list[0].DJ_UQ_CODE);
									Ext.getCmp('DJ_NAME').setValue(resp.list[0].DJ_NAME);
									Ext.getCmp('MEND_CONTEXT').setValue(resp.list[0].MEND_CONTEXT);
									Ext.getCmp('DJ_CODE').setValue(resp.list[0].DJ_CODE);
									var startD = resp.list[0].PLAN_BEGINDATE.split(" ");
									var startT = startD[1].split(":");
									Ext.getCmp('PLAN_BEGINDATE').setValue(startD[0]);
									Ext.getCmp('b-hour').setValue(startT[0]);
									Ext.getCmp('b-mm').setValue(startT[1]);
									var endD = resp.list[0].PLAN_ENDDATE.split(" ");
									var endT = endD[1].split(":");
									Ext.getCmp('PLAN_ENDDATE').setValue(endD[0]);
									Ext.getCmp('e-hour').setValue(endT[0]);
									Ext.getCmp('e-mm').setValue(endT[1]);
									Ext.getCmp('APPLY_PLANT').select(0);
									Ext.getCmp('REMARK').setValue(resp.list[0].REMARK);
									Ext.getCmp('mendtype').setValue(resp.list[0].MEND_TYPE);
								}
							}
						});
			}

			Ext.getCmp('saveRow').on('click',function(a, b, c, d) {
						var KC_AMOUNT = gridStore3.getAt(c).get("KC_AMOUNT");
						var AMOUNT = gridStore3.getAt(c).get("AMOUNT");
						if (AMOUNT > KC_AMOUNT && AMOUNT > 0) {
							Ext.Ajax.request({
								url : APP + "/ModelChange",
								method : 'POST',
								async : false,
								params : {
									parName : [ 'matcode_in', 'matname_in','etalon_in', 'matcl_in', 'unit_in','fprice_in', 'amount_in','kcid_in', 'applyid_in' ],
									parType : [ 's', 's', 's', 's', 's', 's','s', 's', 's' ],
									parVal : [
											gridStore3.getAt(c).get("MATCODE"),
											gridStore3.getAt(c).get("MATNAME"),
											gridStore3.getAt(c).get("ETALON"),
											gridStore3.getAt(c).get("MATCL"),
											gridStore3.getAt(c).get("UNIT"),
											gridStore3.getAt(c).get("FPRICE"),
											gridStore3.getAt(c).get("AMOUNT"),
											gridStore3.getAt(c).get("ID"),
											apply_id ],
									proName : 'pro_dj401_addapplymat',
									returnStr : [ 'RET' ],
									returnStrType : [ 's' ]
								},
								success : function(response, options) {
									var resp = Ext.decode(response.responseText);
									if (selectedRecord.length - 1 == index) {
										if (resp == "Success") {
											Ext.example.msg("提示", '提交成功');
											query();
										} else {
											Ext.example.msg("提示", '提交失败');
										}
									}
								}
							});
						} else {
							Ext.example.msg("提示", '所需数量需大于库存数量');
						}
					});
			function Bind() {// 选择
				window1.show();
				gridStorexzdj.load({
					params : {
						parName : [ 'plantcode_in', 'loc_plantcode_in','dj_series_class_in', 'dj_loc_in','work_status_in', 'dj_name_in','dj_unique_code_in', 'dj_type_in', 'dj_vol_in'],
						parType : [ 's', 's', 's', 's', 's', 's', 's', 's','s' ],
						parVal : [ '%', plantcode,'%', '%', '%', '%', '%', '%', '%' ],	
						proName : "pro_dj201_djmainlist",
						cursorName : 'ret'
					}
				});
			}
		});
function LookMorexzdj(value, metaData, record, rowIdx, colIdx, store, view) {//
// changeid = record.data.SCH_CODE;
	code = record.data.DJ_CODE;
	unicode = record.data.DJ_UQ_CODE;
	djname = record.data.DJ_NAME;
	return '<a  href="javascript:OpenDj(' + rowIdx + ')" style="color:blue">'+ value + '</a>';
	// Ext.getStore('gridStorexzdj').removeAt(rowIndex);//移除选择电机的表格行

}
function OpenDj(rowIdx) {
	Ext.getCmp('DJ_UQ_CODE').setValue(gridStorexzdj.data.items[rowIdx].data.DJ_UNIQUE_CODE);
	Ext.getCmp('DJ_CODE').setValue(gridStorexzdj.data.items[rowIdx].data.DJ_CODE);
	Ext.getCmp('DJ_NAME').setValue(gridStorexzdj.data.items[rowIdx].data.DJ_NAME);
	// Ext.getStore('gridStorexzdj').removeAt(rowIdx);
}
function Select(){
	var str=window.showModalDialog(APP+"/page/DJ/DJ202_menu.jsp?djcode="+Ext.getCmp('DJ_UQ_CODE').getValue(), '',"dialogHeight:350px;dialogWidth:900px;minimize:yes;maximize:yes;");
}	