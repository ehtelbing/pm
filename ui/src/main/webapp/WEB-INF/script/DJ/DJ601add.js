var DJ_UQ_CODE = '', DJ_NAME = '',DJ_VOL = '', MEND_CONTEXT = '', mend_dept = '',applyId='';
mendcode = '';
if (location.href.split('?')[1] != null) {
	DJ_UQ_CODE = Ext.urlDecode(location.href.split('?')[1]).code;
	DJ_NAME = Ext.urlDecode(location.href.split('?')[1]).name;
	DJ_VOL = Ext.urlDecode(location.href.split('?')[1]).vol;
	MEND_CONTEXT = Ext.urlDecode(location.href.split('?')[1]).content;
	mend_dept = Ext.urlDecode(location.href.split('?')[1]).mend_dept;
	mendcode = Ext.urlDecode(location.href.split('?')[1]).mendcode;
	applyId = Ext.urlDecode(location.href.split('?')[1]).applyId;
	}
Ext
		.onReady(function() {

			var windowPar = window.dialogArguments;

			/** 工序 gridStore */
			var gridStore = Ext.create('Ext.data.Store', {

				storeId : 'gridStore',
				autoLoad : false,
				pageSize : 100,
				fields : [ 'ET_ID', 'ET_NO', 'ORDERID', 'ET_CONTEXT',
						'PLAN_WORKTIME', 'PLAN_PERSON', 'START_FLAG',
						'END_FLAG', 'BEGINDATE', 'ENDDATE', 'INSERT_USERID',
						'INSERT_USERNAME', 'FINISH_USERID', 'FINISH_USERNAME',
						'ACT_WORKTIME', 'ACT_PERSON', 'PRE_ET_ID' ],
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
				autoLoad : false,
				fields : [ 'ID', 'ORDERID', 'MATERIALCODE', 'MATERIALNAME',
						'ETALON', 'MAT_CL', 'UNIT', 'PLAN_AMOUNT',
						'ACT_AMOUNT', 'F_PRICE', 'ET_ID', 'SOURCE' ],
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

			/** 检修班组 */
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
						parName : [ 'deptcode_in' ],
						parType : [ 's' ],
						parVal : [ mend_dept ],
						proName : 'pro_dj601_menddept_group',
						cursorName : 'ret'
					}
				}
			});

			/** 负责人 */
			var responsibleStore = Ext.create("Ext.data.Store", {
				autoLoad : false,
				storeId : 'responsibleStore',
				fields : [ 'USERID', 'USERNAME' ],
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

			var FProcessStore = Ext.create("Ext.data.Store", {
				autoLoad : false,
				storeId : 'FProcessStore',
				fields : [ 'ET_ID', 'ET_NO' ],
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
			var modelStore = Ext.create("Ext.data.Store", {
				autoLoad : false,
				storeId : 'modelStore',
				fields : [ 'MODEL_CODE', 'MODEL_NAME' ],
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
					url : APP + '/orgModelSelect',
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

			/** 工序grid */
			var gridgxStore = Ext.create('Ext.data.Store', {
				id : 'gridgxStore',
				autoLoad : false,

				fields : [ 'ET_NO', ' ET_CONTEXT', 'PLAN_WORKTIME',
						'PLAN_PERSON', 'PRE_ET_ID', 'ET_CONTEXT' ],// 返回值
				proxy : {
					type : 'ajax',
					async : false,
					url : APP + '/ModelSelect',// 返回值类型
					actionMethods : {
						read : 'POST'
					},
					reader : {
						type : 'json',
						root : 'list'// 根节点
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
					items : [ {
						id : 'ORDERID',
						xtype : 'textfield',
						fieldLabel : '工单编号',
							labelWidth : 80,
						readOnly : true,
						value : mendcode
					}, {
						id : 'DJ_UQ_CODE',
						xtype : 'textfield',
						labelWidth : 80,
						fieldLabel : '电机编号',
						readOnly : true,
						value : DJ_UQ_CODE
					}, {
						id : 'DJ_NAME',
						xtype : 'textfield',
						labelWidth : 80,
						fieldLabel : '电机名称',
						readOnly : true,
						value : DJ_NAME
					} ,{
						id : 'DJ_VOL',
						xtype : 'textfield',
						labelWidth : 80,
						fieldLabel : '电机容量',
						//readOnly : true,
						value : DJ_VOL
					},{
						id : 'djv',
						xtype : 'textfield',
						labelWidth : 80,
						fieldLabel : '电机电压',
						//readOnly : true,
					
						//value : dj_v_in
					},{
						id : 'djtype',
						xtype : 'textfield',
						labelWidth : 80,
						fieldLabel : '规格型号',
						//readOnly : true,
						//value : dj_type_in
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
							fieldLabel : '送修时间',
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
					//	colspan : 2,
						items : [ {
							id : 'PLAN_ENDDATE',
							xtype : 'datefield',
							fieldLabel : '完成时间',
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
						id : 'plantime',
						xtype : 'textfield',
						labelWidth : 80,
						fieldLabel : '计划工期',
						//readOnly : true,
						//value : plan_time_in
					},{
							id : 'teams',
							xtype : 'combobox',
							fieldLabel : '检修班组',
							labelWidth : 80,
							editable : false,
							queryMode : 'local',
							labelAlign : 'right',
							displayField : 'MENDDEPT_NAME',
							valueField : 'MENDDEPT_CODE',
							store : plantStore
						},

						{
							id : 'responsible',
							xtype : 'combobox',
							fieldLabel : '负责人',
							editable : false,
							labelWidth : 80,
							queryMode : 'local',
							labelAlign : 'right',
							displayField : 'USERNAME',
							valueField : 'USERID',
							store : responsibleStore
						},{
						id : 'piccode',
						xtype : 'textfield',
						labelWidth : 80,
						fieldLabel : '图样',
						//readOnly : true,
						//value : piccode_in
					},{
						id : 'opperson',
						xtype : 'textfield',
						labelWidth : 80,
						fieldLabel : '经办人',
						//readOnly : true,
						//value : op_person_in
					},{
						id : 'phonenumber',
						xtype : 'textfield',
						labelWidth : 80,
						fieldLabel : '联系电话',
						//readOnly : true,
						//value : phone_number_in
					},{
						id : 'useloc',
						xtype : 'textfield',
						labelWidth : 80,
						fieldLabel : '使用地点',
						//readOnly : true,
						//value : use_loc_in
					},{
						id : 'reqtime',
						xtype : 'textfield',
						labelWidth : 80,
						fieldLabel : '要求工期',
						//readOnly : true,
						//value : req_time_in
					},{
						id : 'send_plantname',
						xtype : 'textfield',
						labelWidth : 80,
						fieldLabel : '送修厂矿',
						readOnly : true,
						//value : dj_v_in
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
					},
					{
						id : 'MEND_CONTEXT',
						xtype : 'textarea',
						labelWidth : 80,
						width : 800,
						fieldLabel : '检修内容',
						colspan : 3,
						//value : MEND_CONTEXT
					},
					{
						id : 'buildremark',
						xtype : 'textarea',
						labelWidth : 80,
						width : 800,
						fieldLabel : '施工项目及说明',
						colspan : 3//,
						//value : MEND_CONTEXT
					},
					{
						id : 'checklog',
						xtype : 'textarea',
						labelWidth : 80,
						width : 800,
						fieldLabel : '检查试验记录',
						colspan : 3//,
						//value : MEND_CONTEXT
					},
					{
						layout : 'column',
						colspan : 3,
						bodyStyle : 'background:none',
						width : 800,
						border : 0,
						margin : '5px 0 0 0',
						items : [

						

						{
							xtype : 'button',
							text : '保存工单',
							id : 'save',
							margin : '0px 0px 0px 30px',
							icon : imgpath + '/save.gif'
						}, {
							xtype : 'displayfield',
							value : '（保存工单后才能填工序）'
						}

						]
					}

					]
				} ]
			});

			/** 工序grid */
			var grid = Ext
					.create(
							'Ext.grid.Panel',
							{
								id : 'grid',
								region : 'center',
								columnLines : true,
								width : '100%',
								autoScroll : true,
								store : gridStore,
								dufaults : {
									width : 120
								},
								columns : [
										{
											xtype : 'rownumberer',
											align : 'center'
										},

										{
											text : '工序号',
											dataIndex : 'ET_NO',
											align : 'center',
											width : 130
										},
										{
											text : '工序内容',
											dataIndex : 'ET_CONTEXT',
											align : 'center',
											width : 130
										},
										{
											text : '计划工时',
											dataIndex : 'PLAN_WORKTIME',
											align : 'center',
											width : 130
										},
										{
											text : '计划人数',
											dataIndex : 'PLAN_PERSON',
											align : 'center',
											width : 130
										},
										{
											text : '前置工序',
											dataIndex : 'PRE_ET_ID',
											align : 'center',
											width : 130
										},

										{
											text : '删除',
											align : 'center',
											xtype : 'templatecolumn',
											width : 60,
											tpl : '<a style="cursor:pointer;text-decoration:underline; color:#00F">删除</a>',
											id : 'deleteProcess'
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

			var grid1 = Ext
					.create(
							'Ext.grid.Panel',
							{
								id : 'grid1',
								region : 'center',
								columnLines : true,
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
											id : 'deleteMat'
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
						fieldLabel : '物料编码',
						readOnly : true,
						value : Ext.util.Cookies.get("mm.departname")
					}, {
						id : 'matName',
						xtype : 'textfield',
						fieldLabel : '物料名称',
						readOnly : true,
						value : Ext.util.Cookies.get("mm.username")
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

			var tab = Ext.create('Ext.tab.Panel', {
				id : 'tab',
				region : 'center',
				layout : 'border',
				items : [ {
					title : '检修工序管理',
					layout : 'border',
					items : [ {
						region : 'north',
						items : [ {
							xtype : 'button',
							text : '添加工序',
							id : 'addProcess',
							style : 'margin:5px 0 5px 10px'
						}, {
							xtype : 'button',
							text : '添加模型工序',
							id : 'addModel',
							style : 'margin:5px 0 5px 10px'
						} ]
					}, grid ]
				},

				{
					title : '所需供料表',
					layout : 'border',
					items : [ {
						region : 'north',
						items : [ {
							xtype : 'button',
							text : '添加物料',
							id : 'addMat',
							style : 'margin:5px 0 5px 10px'
						},{
							xtype : 'button',
							text : '查询',
							id : 'selectMat',
							style : 'margin:5px 0 5px 10px'
						} ]
					}, grid1 ]
				}

				]
			});

			Ext.create('Ext.container.Viewport', {
				layout : 'border',
				autoScroll : true,
				items : [ list1, tab ]
			});

			// tab1Query();
			// tab0Query();
			function tab0Query() {
				gridStore.load({
					params : {
						parName : [ 'ORDERID_in' ],
						parType : [ 's' ],
						parVal : [ Ext.getCmp('ORDERID').getValue() ],
						proName : 'pro_dj601_orderet',
						cursorName : 'RET'
					}
				});
			}

			function tab1Query() {
				gridStore2.load({
					params : {
						parName : [ 'ORDERID_in' ],
						parType : [ 's' ],
						parVal : [ Ext.getCmp('ORDERID').getValue() ],
						proName : 'pro_dj601_ordermat',
						cursorName : 'RET'
					}
				});
			}

			/** 保存工单 */
			Ext.getCmp('save').on('click', saveContent);
			function saveContent() {

				if (Ext.getCmp('DJ_UQ_CODE').getValue() == "") {
					Ext.example.msg('操作信息', "电机编号不能为空");
					return false;
				}
				if (Ext.getCmp('DJ_NAME').getValue() == "") {
					Ext.example.msg('操作信息', "电机名称不能为空");
					return false;
				}
				//if (Ext.getCmp('MEND_CONTEXT').getValue() == "") {
				//	Ext.example.msg('操作信息', "检修内容不能为空");
				//	return false;
				//}

				var hour = Ext.getCmp('b-hour').getValue();
				if (hour.length < 2 || hour < 10) {
					hour = "0" + hour;
				}

				var mm = Ext.getCmp('b-mm').getValue();
				if (mm.length < 2 || hour < 10) {
					mm = "0" + mm;
				}

				var start = Ext.util.Format.date(Ext.getCmp('PLAN_BEGINDATE')
						.getValue(), 'Y-m-d')
						+ " " + hour + ":" + mm + ":00";
				var end = Ext.util.Format.date(Ext.getCmp('PLAN_ENDDATE')
						.getValue(), 'Y-m-d')
						+ " " + hour + ":" + mm + ":00";

				Ext.Ajax.request({

					url : APP + '/ModelChange',
					method : 'POST',
					async : false,
					params : {
						parName : [ 'DJ_UQ_CODE_in', 'DJ_NAME_in',
								'APPLY_ID_in', 'MEND_CONTEXT_in',
								'PLAN_BEGINDATE_in', 'PLAN_ENDDATE_in',
								'MENDDEPT_CODE_in', 'MEND_USERID_in',
								'MEND_USERNAME_in', 'INSERT_USERID_in',
								'INSERT_USERNAME_in','orderid_in',
								 'plan_time_in',
			                        'dj_type_in',
			                        'piccode_in',
			                        'op_person_in', 
			                        'phone_number_in', 
			                        'use_loc_in', 
			                        'req_time_in',
			                        'build_remark_in',
			                        'check_log_in', 
			                        'dj_vol_in',  
			                        'dj_v_in','mend_type_in' 
								],
						parType : [ 's', 's', 's', 's',
						            'dt', 'dt', 's', 's',
								    's', 's', 's','s',
								    's', 's', 's','s', 
								    's', 's', 's','s',
								    's', 's', 's', 's'],
						parVal : [ Ext.getCmp('DJ_UQ_CODE').getValue(),
								Ext.getCmp('DJ_NAME').getValue(),

								applyId,

								Ext.getCmp('MEND_CONTEXT').getValue(), start,
								end, Ext.getCmp('teams').getValue(),

								Ext.getCmp('responsible').getValue(),
								Ext.getCmp('responsible').getRawValue(),
								Ext.util.Cookies.get("mm.userid"),
								Ext.util.Cookies.get("mm.username"),
                                        Ext.getCmp('ORDERID').getValue(),
                                        
                                        Ext.getCmp('plantime').getValue(), 
                                        Ext.getCmp('djtype').getValue(),
                                        Ext.getCmp('piccode').getValue(),
                                        Ext.getCmp('opperson').getValue(),
                                        Ext.getCmp('phonenumber').getValue(),
                                        Ext.getCmp('useloc').getValue(),
                                        Ext.getCmp('reqtime').getValue(),
                                        Ext.getCmp('buildremark').getValue(),
                                        Ext.getCmp('checklog').getValue(),
                                        Ext.getCmp('DJ_VOL').getValue(),
                                        Ext.getCmp('djv').getValue(),
										Ext.getCmp('mendtype').getValue()],
						proName : 'pro_dj601_saveorder',
						returnStr : [ 'ret' ],
						returnStrType : [ 's' ]
					},
					success : function(response) {

						var resp = Ext.decode(response.responseText);

						if (resp[0] != "Failure") {
							//Ext.example.msg("提示", '执行成功');
							//Ext.getCmp('ORDERID').setValue(resp[0]);
							
							
				 
							//tab1Query();
							//tab0Query();
							
							window.returnValue = "success";

							window.close();

						} else {
							Ext.example.msg("提示", '执行失败');
						}
					}
				});
			}

			Ext.getCmp('deleteProcess').on('click', function(a, b, c, d) {

				Ext.Ajax.request({
					url : APP + "/ModelChange",
					method : 'POST',
					async : false,
					params : {
						parName : [ 'ET_ID_in' ],
						parType : [ 's' ],
						parVal : [ gridStore.getAt(c).get("ET_ID") ],
						proName : 'pro_dj601_deleteet',
						returnStr : [ 'RET' ],
						returnStrType : [ 's' ]
					},
					success : function(response, options) {
						var resp = Ext.decode(response.responseText);

						if (resp == "Success") {
							Ext.example.msg("提示", '删除成功');
							tab0Query();
						} else {
							Ext.example.msg("提示", '删除失败');
						}

					}
				});
			});

			Ext.getCmp('deleteMat').on('click', function(a, b, c, d) {

				Ext.Ajax.request({
					url : APP + "/ModelChange",
					method : 'POST',
					async : false,
					params : {
						parName : [ 'ID_in' ],
						parType : [ 's' ],
						parVal : [ gridStore1.getAt(c).get("ID") ],
						proName : 'pro_dj601_deletemat',
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
				Ext.getCmp('teams').select(plantStore.getAt(0));

				responsibleStore.load({
					params : {// 负责人与检修班组联动
						parName : [ 'MENDDEPT_CODE_in' ],
						parType : [ 's' ],
						parVal : [ Ext.getCmp('teams').getValue() ],
						proName : 'pro_dj601_person',
						cursorName : 'ret'
					}
				});
			});
			Ext.getCmp('teams').on('change', function() {
				responsibleStore.load({
					params : {// 负责人与检修班组联动
						parName : [ 'MENDDEPT_CODE_in' ],
						parType : [ 's' ],
						parVal : [ Ext.getCmp('teams').getValue() ],
						proName : 'pro_dj601_person',
						cursorName : 'ret'
					}
				});
			});

			responsibleStore.on('load', function() {

				Ext.getCmp('responsible').select(responsibleStore.getAt(0));
			});

			/*
			 * Ext.getCmp('kcQuery').on('click',function(){
			 * 
			 * gridStore3.load({params:{ plantcode :
			 * Ext.util.Cookies.get("mm.plantcode") }}); })
			 */

			Ext.getCmp('addProcess').on('click', function() {

				FProcessStore.load({
					params : {
						parName : [ 'ORDERID_in' ],
						parType : [ 's' ],
						parVal : [ Ext.getCmp('ORDERID').getValue() ],
						proName : 'pro_dj601_preorderet',
						cursorName : 'ret'
					}
				});

				windowProcess.show();
			});
			Ext.getCmp('addModel').on('click', function() {// 添加模型工序

				modelStore.load({
					params : {
						proName : 'pro_DJ601_modeldroplist',
						cursorName : 'v_cursor'
					}
				});

				windowaddModel.show();
			});

			Ext.getStore('modelStore').on('load', function(me) {
				Ext.getCmp('model').select(me.first());
			});

			/** 添加工序 */
			var windowProcess = Ext.create('Ext.window.Window', {

				id : 'windowProcess',
				title : "添加工序",
				width : 340,
				height : 290,
				plain : true,
				modal : true,
				defaults : {
					labelWidth : 90,
					labelAlign : 'right',
					width : 300,
					style : 'margin-top:8px'
				},
				items : [

				{
					id : 'PLAN_WORKTIME',
					xtype : 'numberfield',
					fieldLabel : '计划工时'
				}, {
					id : 'PLAN_PERSON',
					xtype : 'numberfield',
					fieldLabel : '计划人数'
				}, {
					id : 'ET_CONTEXT',
					xtype : 'textfield',
					fieldLabel : '工序内容'
				},

				{
					id : 'FProcess',
					xtype : 'combobox',
					fieldLabel : '前置工序',
					editable : false,
					queryMode : 'local',
					labelAlign : 'right',
					displayField : 'ET_NO',
					valueField : 'ET_ID',
					store : FProcessStore
				} ],
				buttons : [ {
					text : '保 存',
					id : 'saveProcess',
					icon : imgpath + '/save_16x16.gif'
				}, {
					text : '取 消',
					icon : imgpath + '/cross.gif',
					handler : function() {
						Ext.getCmp("windowProcess").hide();
					}
				} ],

				closeAction : 'hide',
				model : true
			});

			/** 添加模型工序 */
			var windowaddModel = Ext.create('Ext.window.Window', {
				id : 'windowaddModel',
				title : '添加模型工序',
				frame : true,
				width : 1000,
				height : 450,
				region : 'center',
				layout : 'border',
				closeAction : 'hide',
				model : true,
				items : [ {
					xtype : 'panel',
					region : 'north',
					border : false,
					frame : true,
					layout : 'hbox',
					margin : 1,
					items : [ {
						id : 'model',
						xtype : 'combobox',
						fieldLabel : '模型名称',
						editable : false,
						queryMode : 'local',
						labelAlign : 'right',
						displayField : 'MODEL_NAME',
						valueField : 'MODEL_CODE',
						store : modelStore
					}, {
						xtype : 'button',
						text : '查询',
						id : 'select'
					}, {
						xtype : 'button',
						text : '添加',
						id : 'modelAdd'
					} ]
				}, {
					xtype : 'grid',
					id : 'gridgx',
					region : 'center',
					columnLines : true,
					selType : 'checkboxmodel',
					store : gridgxStore,
					columns : [ {
						text : '工序号',
						dataIndex : 'ET_NO',
						align : 'center'
					}, {
						text : '工序内容',
						dataIndex : 'ET_CONTEXT',
						align : 'center'
					}, {
						text : '计划工时',
						dataIndex : 'PLAN_WORKTIME',
						align : 'center'
					}, {
						text : '计划人数',
						dataIndex : 'PLAN_PERSON',
						align : 'center'
					}, {
						text : '前置工序',
						dataIndex : 'PRE_ET_ID',
						align : 'center'
					} ]

				} ]
			});

			Ext.getCmp('addMat').on(
					'click',
					function() {

						var returnVal = window.showModalDialog(APP
								+ "/page/DJ/DJ601kcSelect.jsp?orderId="
								+ Ext.getCmp('ORDERID').getValue(), window,
								"dialogWidth=1200px;dialogHeight=550px");
						if (returnVal != null) {
							tab1Query();
						}
						// windowMat.show();
					});
					
					Ext.getCmp('selectMat').on(
					'click',
					function() {
						tab1Query();
					});

			/** 添加物料 */
			/*
			 * var windowMat = Ext.create('Ext.window.Window', {
			 * 
			 * id:'windowMat', title: "", width: 940, height: 490, plain: true,
			 * modal: true, defaults: { labelWidth:90, labelAlign:'right',
			 * width:300, style:'margin-top:8px' }, layout:'border', items: [
			 * list2,grid2 ], closeAction: 'hide', model: true })
			 */

			/** 保存工序 */
			Ext
					.getCmp('saveProcess')
					.on(
							'click',
							function() {

								Ext.Ajax
										.request({

											url : APP + "/ModelChange",
											method : 'POST',
											async : false,
											params : {
												parName : [ 'ORDERID_in',
														'PLAN_WORKTIME_in',
														'PLAN_PERSON_in',
														'ET_CONTEXT_in',
														'PRE_ET_IN',
														'INSERT_USERID_in',
														'INSERT_USERNAME_in' ],
												parType : [ 's', 'i', 'i', 's',
														's', 's', 's' ],
												parVal : [
														Ext.getCmp('ORDERID')
																.getValue(),
														Ext
																.getCmp(
																		'PLAN_WORKTIME')
																.getValue(),
														Ext.getCmp(
																'PLAN_PERSON')
																.getValue(),
														Ext
																.getCmp(
																		'ET_CONTEXT')
																.getValue(),
														Ext.getCmp('FProcess').rawValue,
														Ext.util.Cookies
																.get("mm.userid"),
														Ext.util.Cookies
																.get("mm.username") ],
												proName : 'pro_dj601_saveorderet',
												returnStr : [ 'ret' ],
												returnStrType : [ 's' ]
											},
											success : function(response,
													options) {
												var resp = Ext
														.decode(response.responseText);

												if (resp == "Success") {
													Ext.getCmp("windowProcess")
															.hide();
													Ext.example.msg("提示",
															'保存成功');
													tab0Query();
												} else {
													Ext.example.msg("提示",
															'保存失败');
												}

											}
										});

							});
			Ext.getCmp('select').on('click', function() {// 添加模型工序页面的查询

				Ext.data.StoreManager.lookup('gridgxStore').setProxy({
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
						parName : [ 'v_modelcode' ],
						parType : [ 's' ],
						parVal : [ Ext.getCmp('model').getValue() ],
						proName : 'pro_DJ601_modelet',
						cursorName : 'v_cursor'
					}
				});

				Ext.data.StoreManager.lookup('gridgxStore').load();

			});
			Ext.getCmp('modelAdd').on('click', function() {// 添加模型工序页面的tianjia

				modelAdd();

			});
			function modelAdd() {
				var selectedRecord = Ext.getCmp('gridgx').getSelectionModel()
						.getSelection();
				if (selectedRecord != null && selectedRecord != "") {
					if (selectedRecord.length >= 1) {
						for ( var i = 0; i < selectedRecord.length; i++) {
							Ext.Ajax
									.request({
										url : APP + '/ModelChange',
										type : 'ajax',
										method : 'post',
										async : false,
										params : {
											parName : [ 'ORDERID_in',
													'PLAN_WORKTIME_in',
													'PLAN_PERSON_in',
													'ET_CONTEXT_in',
													'PRE_ET_IN',
													'INSERT_USERID_in',
													'INSERT_USERNAME_in', ],
											parType : [ 's', 'do', 'do', 's',
													's', 's', 's' ],
											parVal : [// selectedRecord[i].data.ET_NO,
													Ext.getCmp('ORDERID')
															.getValue(),
													selectedRecord[i].data.PLAN_WORKTIME,
													selectedRecord[i].data.PLAN_PERSON,
													selectedRecord[i].data.ET_CONTEXT,
													selectedRecord[i].data.PRE_ET_ID,
													Ext.util.Cookies
															.get("mm.userid"),
													Ext.util.Cookies
															.get("mm.username") ],
											proName : 'pro_dj601_saveorderet',
											returnStr : [ 'RET' ],
											returnStrType : [ 's' ]
										},
										success : function(response) {
											var resp = Ext.JSON
													.decode(response.responseText);
											if (resp[0] != "Failure") {

												gridStore
														.load({
															params : {
																parName : [ 'ORDERID_in' ],
																parType : [ 's' ],
																parVal : [ Ext
																		.getCmp(
																				'ORDERID')
																		.getValue() ],
																proName : 'pro_dj601_orderet',
																cursorName : 'RET'
															}
														});
												Ext.example.msg('提示', "操作成功！");
												windowaddModel.hide();

											} else {
												Ext.example.msg('提示', "操作失败！");
											}
										}
									});
						}
					}
				} else {
					Ext.Msg.alert("提示", "至少选择一条数据");
				}
			}
			loadForm();
		});
function loadForm(){
	
	    Ext.Ajax.request({
			 	
                    url: APP+"/ModelSelect",
                    method: 'POST',
                    params: {
                        parName : ['applyid_in'],
						parType : ['s'],
						parVal : [ applyId  ],
						proName : 'pro_dj401_applymes',
					    cursorName : 'RET'
					},
                    success: function (response, options) {
                    	var resp = Ext.decode(response.responseText);
                    	 
                    	if(resp.list.length>0){

	                    	var startD = resp.list[0].PLAN_BEGINDATE.split(" ");
	                    	var startT = startD[1].split(":");
	                    	
	                    	Ext.getCmp('PLAN_BEGINDATE').setValue(startD[0]);
	                    	Ext.getCmp('b-hour').setValue(startT[0]);
	                    	Ext.getCmp('b-mm').setValue(startT[1]);
	                    	
	                    	var endD = resp.list[0].PLAN_ENDDATE.split(" ");
	                    	var endT = endD[1].split(":");
	                    	
	                    	Ext.getCmp('PLAN_ENDDATE').setValue(endD[0]);
	                    	Ext.getCmp('e-hour').setValue(endT[0]);
	                    	Ext.getCmp('e-hour').setValue(endT[1]);
							
							Ext.getCmp('send_plantname').setValue(resp.list[0].APPLY_PLANTNAME);
							Ext.getCmp('mendtype').setValue(resp.list[0].MEND_TYPE);
                    	} 
                    }
                });
	}