QueryCheckAlertMsg = "请填写查询条件,每个条件不能为空!";
var panelflag="备件跟踪使用明细表";
Ext.onReady(function() {
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
			var sbstore = Ext.create('Ext.data.Store', {
				autoLoad : false,
				storeId : 'sbstore',
				fields : [ 'EQU_ID', 'EQU_DESC' ],
				proxy : {
					type : 'ajax',
					async : false,
					url : AppUrl + 'PM_12/PRO_RUN7111_EQULIST',
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
								id : 'panellow',
								width : '100%',
								region : 'north',
								frame : true,
								layout : 'column',
								defaults : {
									labelAlign : 'right',
									style : 'margin:3px 0px 2px 5px'
								},
								border:false,
								//baseCls : 'my-panel-no-border',
								items : [
										{
											id : 'begintime',
											xtype : 'datefield',
											editable : false,
											format : 'Y/m/d',
											value : new Date,
											fieldLabel : '开始时间',
											labelWidth : 65
										},
										{
											id : 'endtime',
											xtype : 'datefield',
											editable : false,
											format : 'Y/m/d',
											value : new Date(new Date()
													.getFullYear(), new Date()
													.getMonth(), new Date()
													.getDate() + 7),
											fieldLabel : '结束时间',
											labelWidth : 65
										},
										{
											xtype : 'combo',
											id : "selPlant",
											store : selPlantstore,
											editable : false,
											queryMode : 'local',
											fieldLabel : '厂矿',
											displayField : 'V_DEPTNAME',
											valueField : 'V_DEPTCODE',
											labelWidth : 70
										},
										{
											xtype : 'combo',
											id : "selsb",
											store : sbstore,
											editable : false,
											queryMode : 'local',
											fieldLabel : '设备',
											width:235,
											displayField : 'EQU_DESC',
											valueField : 'EQU_ID',
											labelWidth : 70,
										},
										{
											xtype : 'textfield',
											fieldLabel : '工单号',
											id : 'orderguid',
											labelWidth : 70
										},
										{
											xtype : 'combo',
											id : "selSection",
											store : selSectionstore,
											editable : false,
											queryMode : 'local',
											fieldLabel : '作业区',
											displayField : 'V_DEPTNAME',
											valueField : 'V_DEPTCODE',
											labelWidth : 60
										},
										{
											xtype : 'textfield',
											fieldLabel : '物资编码',
											id : 'materialcode',
											labelWidth : 70
										},
										{
											xtype : 'textfield',
											fieldLabel : '物资名称',
											id : 'materialname',
											labelWidth : 70
										},
										{
											xtype : 'button',
											text : '查询',
											icon : imgpath + '/search.png',
											width : 80,
											handler : function() {
												var selsb = Ext.getCmp('selsb').getValue();
												if (Ext.getCmp('selsb').getValue() == ''
														|| Ext.getCmp('selsb').getValue() == null) {
													selsb = '%';
												}
												var orderguid = Ext.getCmp('orderguid').getValue();
												if (Ext.getCmp('orderguid').getValue() == ''
														|| Ext.getCmp('orderguid').getValue() == null) {
													orderguid = '%';
												}
												var materialcode = Ext.getCmp('materialcode').getValue();
												if (Ext.getCmp('materialcode').getValue() == ''
														|| Ext.getCmp('materialcode').getValue() == null) {
													materialcode = '%';
												}
												var materialname = Ext.getCmp('materialname').getValue();
												if (Ext.getCmp('materialname').getValue() == ''
														|| Ext.getCmp('materialname').getValue() == null) {
													materialname = '%';
												}
												Ext.data.StoreManager.lookup('gridStore').load({
													params : {
														'V_D_FACT_START_DATE':Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(),'Y-m-d'),
														'V_D_FACT_FINISH_DATE':Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y-m-d'),
														'V_V_PLANT':Ext.getCmp('selPlant').getValue(),
														'V_V_DEPTCODE':Ext.getCmp('selSection').getValue(),
														'V_V_EQUIP_NO':selsb,
														'V_V_ORDERGUID':orderguid,
														'V_V_MATERIALCODE':materialcode,
														'V_V_MATERIALNAME':materialname
													}
												});
												Ext.data.StoreManager.lookup('gridBottomStore').load({
													params : {
														'V_D_FACT_START_DATE':Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(),'Y-m-d'),
														'V_D_FACT_FINISH_DATE':Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y-m-d'),
														'V_V_PLANT':Ext.getCmp('selPlant').getValue(),
														'V_V_DEPTCODE':Ext.getCmp('selSection').getValue(),
														'V_V_EQUIP_NO':selsb,
														'V_V_ORDERGUID':orderguid,
														'V_V_MATERIALCODE':materialcode,
														'V_V_MATERIALNAME':materialname
													}
												});
											}
										},
										{
											xtype : 'button',
											text : '导出Excel',
											style : ' margin: 3px 0px 0px 10px',
											icon : imgpath+'/grid.png',
											listeners : {
												click : OnButtonExcelClicked
											}
										} ]
							});

			var grid = Ext.create('Ext.grid.Panel', {
						id : 'grid',
						region : 'center',
						columnLines : true,
						width : '100%',
						store : {
							id : 'gridStore',
//							pageSize : 100,
							autoLoad : false,
							fields : [ 'V_ORDERID', 'V_MATERIALCODE',
									'V_MATERIALNAME', 'V_UNIT', 'ORDERAMOUNT',
									'ORDERACTU', 'I_ACTUALAMOUNT',
									'D_FACT_FINISH_DATE', 'V_SHORT_TXT',
									'V_EQUIP_NAME' ],
							proxy : {
								type : 'ajax',
								async : false,
								url : AppUrl + 'PM_12/PRO_RUN7132_ORDERMATLIST',
								actionMethods : {
									read : 'POST'
								},
								reader : {
									type : 'json',
									root : 'list',
									total : 'total'
								}
							}
						},
						autoScroll : true,
						columns : [
						{
							text : '工单号',
							width : 130,
							dataIndex : 'V_ORDERID',
							align : 'center',
							renderer : atleft
						}, {
							text : '物料编码',
							width : 150,
							dataIndex : 'V_MATERIALCODE',
							align : 'center',
							renderer : atleft
						}, {
							text : '物料名称',
							width : 100,
							dataIndex : 'V_MATERIALNAME',
							align : 'center',
							renderer : atleft
						}, {
							text : '计量单位',
							width : 100,
							dataIndex : 'V_UNIT',
							type : 'date',
							renderer : atleft
						}, {
							text : '实际领用数量',
							width : 110,
							dataIndex : 'ORDERAMOUNT',
							renderer : atleft
						}, {
							text : '已更换数量',
							width : 110,
							dataIndex : 'ORDERACTU',
							align : 'center',
							renderer : atleft
						}, {
							text : '未更换数量',
							width : 110,
							dataIndex : 'I_ACTUALAMOUNT',
							align : 'center',
							renderer : atleft
						}, {
							text : '工单结束日期',
							width : 110,
							dataIndex : 'D_FACT_FINISH_DATE',
							align : 'center',
							renderer : atleft
						}, {
							text : '工单描述',
							width : 110,
							dataIndex : 'V_SHORT_TXT',
							align : 'center',
							renderer : atleft
						}, {
							text : '所属设备',
							width : 110,
							dataIndex : 'V_EQUIP_NAME',
							align : 'center',
							renderer : atleft
						} ]
//					 bbar : [ {
//					 xtype : 'pagingtoolbar',
//					 dock : 'bottom',
//					 displayInfo : true,
//					 displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
//					 emptyMsg : '没有记录',
//					 store : 'gridStore'
//					 } ]
					});
			var gridBottom = Ext.create('Ext.grid.Panel', {
				id : 'gridBottom',
				region : 'center',
				columnLines : true,
				width : '100%',
				store : {
					id : 'gridBottomStore',
//					pageSize : 100,
					autoLoad : false,
					fields : [ 'V_DEPTNAME', 'ORDERAMOUNT', 'ORDERACTU', 'I_ACTUALAMOUNT', 'EXECUTERATE' ],
					proxy : {
						type : 'ajax',
						async : false,
						url : AppUrl + 'PM_12/PRO_NO7132_DEPARTMATLIST',
						actionMethods : {
							read : 'POST'
						},
						reader : {
							type : 'json',
							root : 'list',
							total : 'total'
						}
					}
				},
				autoScroll : true,
				columns : [ {
					text : '部门名称',
					width : 130,
					dataIndex : 'V_DEPTNAME',
					align : 'center',
					renderer : atleft
				}, {
					text : '实际使用备件数量',
					width : 150,
					dataIndex : 'ORDERAMOUNT',
					align : 'center',
					renderer : atleft
				}, {
					text : '已更换备件数量',
					width : 100,
					dataIndex : 'ORDERACTU',
					align : 'center',
					renderer : atleft
				}, {
					text : '未更换数量',
					width : 100,
					dataIndex : 'I_ACTUALAMOUNT',
					type : 'date',
					renderer : atleft
				}, {
					text : '备件更换执行率',
					width : 120,
					dataIndex : 'EXECUTERATE',
					renderer : atleft
				} ]
//				bbar : [ {
//					xtype : 'pagingtoolbar',
//					dock : 'bottom',
//					displayInfo : true,
//					displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
//					emptyMsg : '没有记录',
//					store : 'gridBottomStore'
//				} ]
			});
			var tabpanel = Ext.create('Ext.tab.Panel', {
				activeTab: 0,
				id:'tabpanel',
				style : ' margin: 0px 0px 0px 0px',
				region : 'center',
				width : '100%',
				height: '100%',
				baseCls : 'my-panel-no-border',
				listeners: {
			        tabchange: function(tabPanel, newCard, oldCard, eOpts){
			        	panelflag=newCard.title;
			        	}
			        },
			    items: [
			        {
				    	layout : 'border', 
				    	id:'tab1',
			        	style : ' margin: 23px 0px 0px 0px',
			            title: '备件跟踪使用明细表',
			            items: [grid]
			        },
			        {
				    	layout : 'border', 
			        	style : ' margin: 23px 0px 0px 0px',
			        	id:'tab2',
			            title: '备件跟踪部门情况统计',
			            items:[gridBottom]
			                
			        }
			    ],
			    renderTo : Ext.getBody()
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
				Ext.ComponentManager.get('selSection').store.insert(0, {'V_DEPTCODE' : '%', 'V_DEPTNAME' : '全部'});
				Ext.getCmp("selSection").select(selSectionstore.getAt(0));
				Ext.data.StoreManager.lookup('sbstore').load({
							params : {
								V_V_PLANTCODE:Ext.getCmp('selPlant').getValue(),
								V_V_DEPTCODE:Ext.getCmp('selSection').getValue()
							}
						});
			});
			sbstore.on('load', function() {
				Ext.ComponentManager.get('selsb').store.insert(0, {
					'EQU_ID' : '%',
					'EQU_DESC' : '全部'
				});
				Ext.getCmp("selsb").select(sbstore.getAt(0));
			});
			Ext.getCmp('selPlant').on("select", function() {
						Ext.data.StoreManager.lookup('selSectionstore').removeAll();
						Ext.data.StoreManager.lookup('selSectionstore').load({
							params : {
								IS_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
								IS_V_DEPTTYPE: '[主体作业区]'
							}
						});
					});
			Ext.getCmp('selSection').on("select", function() {
				Ext.data.StoreManager.lookup('sbstore').removeAll();
				Ext.data.StoreManager.lookup('sbstore').load({
					params : {
						V_V_PLANTCODE:Ext.getCmp('selPlant').getValue(),
						V_V_DEPTCODE:Ext.getCmp('selSection').getValue()
					}
				});
			});
			Ext.create('Ext.container.Viewport', {
				id : "id",
				layout : 'border',
				items : [ panel, tabpanel ]
			});
		});

function atleft(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return value;
}
function OnButtonExcelClicked() {
	var selsb = Ext.getCmp('selsb').getValue();
	if (Ext.getCmp('selsb').getValue() == '' || Ext.getCmp('selsb').getValue() == null) {
		selsb = '%';
	}
	var orderguid = Ext.getCmp('orderguid').getValue();
	if (Ext.getCmp('orderguid').getValue() == '' || Ext.getCmp('orderguid').getValue() == null) {
		orderguid = '%';
	}
	var materialcode = Ext.getCmp('materialcode').getValue();
	if (Ext.getCmp('materialcode').getValue() == '' || Ext.getCmp('materialcode').getValue() == null) {
		materialcode = '%';
	}
	var materialname = Ext.getCmp('materialname').getValue();
	if (Ext.getCmp('materialname').getValue() == '' || Ext.getCmp('materialname').getValue() == null) {
		materialname = '%';
	}
	if(panelflag=="备件跟踪使用明细表"){
		document.location.href=AppUrl + 'excel/BJGZSYMX_EXCEL?V_D_FACT_START_DATE='+Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(),'Y-m-d')+
		'&V_D_FACT_FINISH_DATE='+Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y-m-d')+
		'&V_V_PLANT='+Ext.getCmp('selPlant').getValue()+
		'&V_V_DEPTCODE='+ encodeURI(Ext.getCmp('selSection').getValue())+
		'&V_V_EQUIP_NO='+ encodeURI(selsb)+
		'&V_V_ORDERGUID='+encodeURI(orderguid)+
		'&V_V_MATERIALCODE='+encodeURI(materialcode)+
		'&V_V_MATERIALNAME='+encodeURI(materialname);
	}else{
		document.location.href=AppUrl + 'excel/BJGZBMTJ_EXCEL?V_D_FACT_START_DATE='+Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(),'Y-m-d')+
		'&V_D_FACT_FINISH_DATE='+Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y-m-d')+
		'&V_V_PLANT='+Ext.getCmp('selPlant').getValue()+
		'&V_V_DEPTCODE='+ encodeURI(Ext.getCmp('selSection').getValue())+
		'&V_V_EQUIP_NO='+ encodeURI(selsb)+
		'&V_V_ORDERGUID='+encodeURI(orderguid)+
		'&V_V_MATERIALCODE='+encodeURI(materialcode)+
		'&V_V_MATERIALNAME='+encodeURI(materialname);
  }
}