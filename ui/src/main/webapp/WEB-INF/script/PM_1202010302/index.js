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
								IS_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
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

			var panel = Ext.create('Ext.panel.Panel', {
								id : 'panellow',
								width : '100%',
								title : '设备运行台账',
								region : 'north',
								frame : true,
								layout : 'column',
								items : [
										{
											xtype : 'combo',
											id : "selPlant",
											store : selPlantstore,
											editable : false,
											queryMode : 'local',
											fieldLabel : '厂矿',
											displayField : 'V_DEPTNAME',
											valueField : 'V_DEPTCODE',
											labelWidth : 70,
											style : ' margin: 5px 0px 0px 10px',
											labelAlign : 'right'
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
											labelWidth : 60,
											style : ' margin: 5px 0px 0px 10px',
											labelAlign : 'right'
										},
										{
											xtype : 'textfield',
											fieldLabel : '当前设备',
											id : 'nowDevice',
											labelAlign : 'right',
											labelWidth : 70,
											style : ' margin: 5px 0px 0px 10px',
											listeners : {
												click : {
													element : 'el',
													fn : getNowDevice
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
											xtype : 'combo',
											id : 'workType',
											fieldLabel : '周期类型',
											store : workTypeStore,
											editable : false,
											labelAlign : 'right',
											displayField : 'CYCLE_DESC',
											valueField : 'CYCLE_ID',
											labelWidth : 90,
											style : ' margin: 5px 0px 0px 10px'
										},
										{
											xtype : 'button',
											text : '查询',
											icon : imgpath + '/search.png',
											width : 80,
											style : ' margin: 5px 0px 0px 10px',
											handler : function() {
												if(Ext.getCmp('nowDevice_Id').getValue()== ''||Ext.getCmp('nowDevice_Id').getValue()== null){
													Ext.Msg.alert('操作信息', '请填写当前设备');
													return false;
												}
												Ext.data.StoreManager.lookup('gridStore').load({
													params : {
														A_EQUID:Ext.getCmp('nowDevice_Id').getValue(),
														A_CYCLE_ID:Ext.getCmp('workType').getValue()
													}
												})
											}
										},
										{
											id : 'delete',
											xtype : 'button',
											text : '导出Excel',
											icon : imgpath + '/grid.png',
											style : ' margin: 5px 0px 0px 10px',
											width : 100,
											listeners : {
												click : OnButtonExportClicked
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
							autoLoad : false,
							fields : [ 'SITE_DESC', 'BJ_UNIQUE_CODE',
									'MATERIALCODE', 'MATERIALNAME', 'UNIT',
									'CHANGEDATE', 'SUM_YEILD', 'CYCLE_DESC',
									'ALERT_VALUE', 'OFFSET', 'BJ_STATUS' ],
							proxy : {
								type : 'ajax',
								async : false,
								url : AppUrl + 'PM_12/PRO_RUN_EQU_BJ_ALERT_ALL',
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
						height : 400,
						columns : [

						{
							xtype : 'rownumberer',
							text : '序号',
							width : 35,
							sortable : false
						}, {
							text : '备件安装位置',
							width : 110,
							dataIndex : 'SITE_DESC',
							align : 'center',
							renderer : atleft
						}, {
							text : '备件唯一标识',
							width : 110,
							dataIndex : 'BJ_UNIQUE_CODE',
							align : 'center',
							renderer : atleft
						}, {
							text : '物资编码',
							width : 100,
							dataIndex : 'MATERIALCODE',
							align : 'center',
							renderer : atleft
						}, {
							text : '物资描述',
							width : 300,
							dataIndex : 'MATERIALNAME',
							align : 'center',
							renderer : atleft
						}, {
							text : '计量单位',
							width : 90,
							dataIndex : 'UNIT',
							align : 'center',
							renderer : atleft
						}, {
							text : '更换时间',
							width : 150,
							dataIndex : 'CHANGEDATE',
							align : 'center'
						}, {
							text : '作业量',
							width : 50,
							dataIndex : 'SUM_YEILD',
		
							align : 'center',
							renderer : function(a, b, c, d, e, f) {
								if (a > c.data.ALERT_VALUE) {
									b.style = "color: #f00";
									
								}
								return a;
							}
						}, {
							text : '周期类型',
							width : 100,
							dataIndex : 'CYCLE_DESC',
							align : 'center'
						}, {
							text : '报警值',
							width : 50,
							dataIndex : 'ALERT_VALUE',
							align : 'center',
							renderer : atleft
						}, {
							text : '预警偏移量',
							width : 100,
							dataIndex : 'OFFSET',
							align : 'center',
							renderer : atleft
						}, {
							text : '备件状态',
							width : 100,
							dataIndex : 'BJ_STATUS',
							align : 'center',
							renderer : atleft
						}
						// { dataIndex: 'CYCLE_UNIT', hidden: true }
						]
					// bbar: [{
					// xtype: 'pagingtoolbar',
					// dock: 'bottom',
					// displayInfo: true,
					// displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
					// emptyMsg: '没有记录',
					// store: 'gridStore'
					// }]
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
				layout : 'border',
				items : [ panel, grid ]
			});
		});

function OnButtonExportClicked() {
	document.location.href=AppUrl + 'excel/SBYXTZ_EXCEL?A_EQUID='+encodeURI(Ext.getCmp('nowDevice_Id').getValue())+
	'&A_CYCLE_ID='+Ext.getCmp('workType').getValue();
}

function beforeloadStore(store) {}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return value;
}
function getNowDevice(){
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
