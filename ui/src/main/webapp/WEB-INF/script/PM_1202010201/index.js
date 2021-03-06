﻿Ext.onReady(function() {
			var selPlantstore = Ext.create('Ext.data.Store', {
						autoLoad : true,
						storeId : 'selPlantstore',
						fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
						proxy : {
							type : 'ajax',
							async : false,
							url : AppUrl + 'PM_12/PRO_BASE_DEPT_VIEW',
							actionMethods : {
								read : 'POST'
							},
							reader : {
								type : 'json',
								root : 'list'
							},
							extraParams : {
								IS_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
								IS_V_DEPTTYPE:'[基层单位]'
							}
						}
					});

			var selSectionstore = Ext.create('Ext.data.Store', {
				autoLoad : false,
				storeId : 'selSectionstore',
				fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
				proxy : {
					type : 'ajax',
					async : false,
					url : AppUrl + 'PM_12/PRO_BASE_DEPT_VIEW',
					actionMethods : {
						read : 'POST'
					},
					reader : {
						type : 'json',
						root : 'list'
					}
				}
			});

			var workTypeStore = Ext.create('Ext.data.Store', {
				autoLoad : true,
				storeId : 'workTypeStore',
				fields : [ 'CYCLE_ID', 'CYCLE_DESC' ],
				proxy : {
					type : 'ajax',
					async : false,
					url : AppUrl + 'PM_12/PRO_RUN_CYCLE_ABLE',
					actionMethods : {
						read : 'POST'
					},
					reader : {
						type : 'json',
						root : 'list'
					},
					extraParams : {}
				}
			});
			var month = new Date().getMonth() + 1;

			var panel = Ext.create('Ext.panel.Panel',
							{
								id : 'panellow',
								width : '100%',
								region : 'north',
								frame : true,
								height:'10%',
								//layout : 'vbox',
								border:false,
								baseCls : 'my-panel-no-border',
								items : [{
											xtype : 'panel',
											width : '100%',
											border : false,
											layout : 'column',
											baseCls : 'my-panel-no-border',
											frame : true,
											items : [
													{
														xtype : 'combo',
														id : "selPlant",
														store : selPlantstore,
														editable : false,
														queryMode : 'local',
														fieldLabel : '计划厂矿',
														displayField : 'V_DEPTNAME',
														valueField : 'V_DEPTCODE',
														labelWidth : 70,
														style : ' margin: 5px 0px 5px 10px',
														labelAlign : 'right'
													},
													{
														xtype : 'combo',
														id : "selSection",
														readOnly : true,
														store : selSectionstore,
														editable : false,
														queryMode : 'local',
														fieldLabel : '作业区',
														displayField : 'V_DEPTNAME',
														valueField : 'V_DEPTCODE',
														labelWidth : 60,
														style : ' margin: 5px 0px 5px 10px',
														labelAlign : 'right'
													},
													{
														xtype : 'textfield',
														fieldLabel : '当前设备',
														id : 'nowDevice',
														labelAlign : 'right',
														labelWidth : 70,
														style : ' margin: 5px 0px 5px 10px',
														listeners : {
															click: {
																element: 'el',
																fn: getNowDevice
															}
														}
													},
													{
														xtype : 'hidden',
														id : 'nowDevice_Id'
													},
													{
														xtype : 'hidden',
														id : 'nowDevice_Site'
													},
													{
														xtype : 'datefield',
														fieldLabel : '作业日期',
														id : 'workTime',
														value : new Date(),
														format : 'Y/m/d',
														editable : false,
														labelAlign : 'right',
														labelWidth : 70,
														style : ' margin: 5px 0px 5px 10px'
													},
													{
														xtype : 'combo',
														id : 'workType',
														fieldLabel : '作业周期类型',
														store : workTypeStore,
														editable : false,
														labelAlign : 'right',
														displayField : 'CYCLE_DESC',
														valueField : 'CYCLE_ID',
														labelWidth : 90,
														style : ' margin: 5px 0px 5px 10px'
													},
													{
														xtype : 'textfield',
														fieldLabel : '作业量',
														id : 'workSize',
														labelAlign : 'right',
														labelWidth : 60,
														style : ' margin: 5px 0px 5px 10px'
													},
													// { xtype: 'textfield', id:
													// 'seltext', fieldLabel:
													// '检修内容', labelAlign:
													// 'right', width: 300,
													// style: ' margin: 5px 0px
													// 0px 5px' },
													{
														xtype : 'button',
														text : '查询',
														icon : imgpath + '/search.png',
														width : 80,
														style : ' margin: 5px 0px 5px 10px',
														handler : function() {
															if (Ext.getCmp('selPlant').getValue() != ''
																	&& Ext.getCmp('selPlant').getValue() != null
																	&& Ext.getCmp('selSection').getValue() != ''
																	&& Ext.getCmp('selSection').getValue() != null
																	&& Ext.getCmp('nowDevice_Id').getValue() != ''
																	&& Ext.getCmp('nowDevice_Id').getValue() != null) {
																Ext.data.StoreManager.lookup('gridStore').load({
																	params : {
																		A_EQUID:Ext.getCmp('nowDevice_Id').getValue(),
																		A_WORKDATE:Ext.Date.format(Ext.getCmp('workTime').getValue(), 'Y-m-d'),
																        A_CYCLE_ID:Ext.getCmp('workType').getValue()
																	}
																});
															} else
																(Ext.Msg.alert('操作信息', '请填写当前设备'))
														}
													} ]

										},
										{
											xtype : 'panel',
											layout : 'column',
											width : '100%',
											border : false,
											frame : true,
											baseCls : 'my-panel-no-border',
											items : [
													{
														id : 'insert',
														xtype : 'button',
														text : '录入',
														icon : imgpath + '/add.png',
														width : 60,
														style : ' margin: 5px 0px 5px 10px',
														listeners : {
															click : OnAddButtonClicked
														}
													},
													{
														id : 'delete',
														xtype : 'button',
														text : '删除选中作业量',
														icon : imgpath
																+ '/delete1.png',
														width : 150,
														style : ' margin: 5px 0px 5px 10px',
														listeners : {
															click : OnButtonDeleteClicked
														}
													}

											]
										} ]
							});
			var grid = Ext.create('Ext.grid.Panel', {
				id : 'grid',
				region : 'center',
				layout: 'fit',
				columnLines : true,
				width : '100%',
				store : {
					id : 'gridStore',
					pageSize : 15,
					autoLoad : false,
					fields : [ 'ID', 'EQUNAME', 'CYCLE_DESC', 'WORKDATE',
							'INSERT_VALUE', 'INSERT_PERSON', 'INSERTDATE',
							'CYCLE_UNIT' ],
					proxy : {
						type : 'ajax',
						async : false,
						url : AppUrl + 'PM_12/PRO_RUN_YEILD_SELECT_MANAGE',
						actionMethods : {
							read : 'POST'
						},
						reader : {
							type : 'json',
							root : 'list',
							total : 'total'
						}
					},
					listeners : {
						beforeload : beforeloadStore
					}
				},
				autoScroll : true,
				selType : 'checkboxmodel',
				//height : '50%',
				columns : [

				{
					xtype : 'rownumberer',
					text : '序号',
					width : 35,
					sortable : false
				}, {
					text : '当前设备',
					width : 130,
					dataIndex : 'EQUNAME',
					align : 'center',
					renderer : atleft
				}, {
					text : '周期类型',
					width : 110,
					dataIndex : 'CYCLE_DESC',
					align : 'center',
					renderer : atleft
				}, {
					text : '计算单位',
					width : 110,
					dataIndex : 'CYCLE_UNIT',
					align : 'center',
					renderer : atleft
				}, {
					text : '作业量',
					width : 110,
					dataIndex : 'INSERT_VALUE',
					type : 'date',
					renderer : atleft
				}, {
					text : '作业日期',
					width : 110,
					dataIndex : 'WORKDATE',
					renderer : atleft
				}, {
					text : '录入人',
					width : 80,
					dataIndex : 'INSERT_PERSON',
					align : 'center',
					renderer : atleft
				}, {
					text : '录入时间',
					width : 150,
					dataIndex : 'INSERTDATE',
					align : 'center',
					renderer : atleft
				}, {
					dataIndex : 'ID',
					hidden : true
				} ],
				bbar : [ {
					xtype : 'pagingtoolbar',
					dock : 'bottom',
					displayInfo : true,
					displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
					emptyMsg : '没有记录',
					store : 'gridStore'
				} ]
			});

			Ext.data.StoreManager.lookup('selPlantstore').on("load", function() {
						Ext.getCmp("selPlant").select(Ext.data.StoreManager.lookup('selPlantstore').getAt(0));
						Ext.data.StoreManager.lookup('selSectionstore').load({
							params : {
								IS_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
								IS_V_DEPTTYPE:'[主体作业区]'
							}
						});
					});
			Ext.data.StoreManager.lookup('selSectionstore').on("load", function() {
				Ext.getCmp("selSection").select(Ext.data.StoreManager.lookup('selSectionstore').getAt(0));
				// 默认当前登录用户工作区
				var storeLength = Ext.data.StoreManager.lookup('selSectionstore').data.length;
				for ( var index = 0; index < storeLength; index++) {
					var storeItemData = Ext.data.StoreManager.lookup('selSectionstore').data.items[index].data;
					if (storeItemData.V_DEPTCODE == Ext.util.Cookies.get('v_deptcode')) {
						Ext.getCmp("selSection").setValue(Ext.util.Cookies.get('v_deptcode'));
						break;
					}
				}
				Ext.getCmp("workType").select(Ext.data.StoreManager.lookup('workTypeStore').getAt(0));
			});
			Ext.getCmp('selPlant').on("select", function() {
				Ext.data.StoreManager.lookup('selSectionstore').removeAll();
				Ext.data.StoreManager.lookup('selSectionstore').load({
					params : {
						IS_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
						IS_V_DEPTTYPE:'[主体作业区]'
					}
				});
			});

			Ext.create('Ext.container.Viewport', {
				id : "id",
				layout: {
					type: 'border',
					regionWeights: {
						west: -1,
						north: 1,
						south: 1,
						east: -1
					}
				},
				items : [ panel, grid ]
			});
		});


function OnButtonDeleteClicked() {
	var length = Ext.getCmp('grid').getSelectionModel().getSelection().length;
	if (length ==0) {
		Ext.Msg.alert('操作信息', '请选择需要删除');
		return;
	} else {
		var selectedRecord = Ext.getCmp("grid").getSelectionModel().getSelection();
		var i_err = 0;
		for (i = 0; i < Ext.getCmp('grid').getSelectionModel().getSelection().length; i++) {
			Ext.Ajax.request({
				url : AppUrl + 'PM_12/PRO_RUN_TEILD_DELETE',
				async : false,
				method : 'POST',
				params : {
					A_ID:selectedRecord[i].data.ID
				},
				success : function(resp) {
					resp = Ext.decode(resp.responseText);
					if (resp.RET== 'Fail') {
						Ext.Msg.alert('操作信息', '删除失败');
						i_err++;
					}
				}

			});
		}
		if (i_err == 0) {
			Ext.Msg.alert('操作信息', '删除成功');
		}
		Ext.data.StoreManager.lookup('gridStore').load({
			params : {
				A_EQUID:Ext.getCmp('nowDevice_Id').getValue(),
				A_WORKDATE:Ext.Date.format(Ext.getCmp('workTime').getValue(), 'Y-m-d'),
				A_CYCLE_ID:Ext.getCmp('workType').getValue()
			}
		});
	}
}

function OnAddButtonClicked() {
	Ext.Ajax.request({
				url : AppUrl + 'PM_12/PRO_RUN_YEILD_INPUT',
				method : 'POST',
				params : {
					'A_EQU_ID':Ext.getCmp('nowDevice_Id').getValue(),
					'A_CYCLE_ID':Ext.getCmp('workType').getValue(),
					'A_WORKDATE':Ext.Date.format(Ext.getCmp('workTime').getValue(), 'Y-m-d'),
					'A_INSERTVALUE':Ext.getCmp("workSize").getValue(),
					'A_INSRTPERSON':Ext.util.Cookies.get('v_personcode')
				},
				success : function(resp) {
					console.log(resp);
					resp = Ext.decode(resp.responseText);
					if (resp.RET== 'Success') {
						Ext.Msg.alert('操作信息', '录入成功');
						Ext.data.StoreManager.lookup('gridStore').load({
							params : {
								A_EQUID:Ext.getCmp('nowDevice_Id').getValue(),
								A_WORKDATE:Ext.Date.format(Ext.getCmp('workTime').getValue(), 'Y-m-d'),
								A_CYCLE_ID:Ext.getCmp('workType').getValue()
							}
						});
					} else {
						Ext.Msg.alert('操作信息', '录入失败');
					}
				},
				render : {
					type : 'josn',
					root : 'list'
				}
			});
}

function beforeloadStore(store) {
	store.proxy.extraParams.A_EQUID =Ext.getCmp('nowDevice_Id').getValue();
	store.proxy.extraParams.A_WORKDATE =Ext.Date.format(Ext.getCmp('workTime').getValue(), 'Y-m-d');
	store.proxy.extraParams.A_CYCLE_ID =Ext.getCmp('workType').getValue();
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return value;
}
function getNowDevice() {
	window.open(AppUrl + 'page/PM_090101/index.html?DEPTCODE=' + Ext.getCmp('selSection').getValue(), '', "dialogWidth=650px;dialogHeight=400px");
}
function getEquipReturnValue(retdata){
	if (retdata != "" && retdata != null) {
		var str=[];
		str = retdata.split("^");
		Ext.getCmp('nowDevice_Id').setValue(str[0]);
		Ext.getCmp('nowDevice').setValue(str[1]);
		Ext.getCmp('nowDevice_Site').setValue(str[2]);
	}
}
