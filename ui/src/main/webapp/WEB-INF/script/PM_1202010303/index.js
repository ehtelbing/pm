Ext.onReady(function() {
			var ckstore = Ext.create("Ext.data.Store", {
				autoLoad : true,
				storeId : 'ckstore',
				fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
				proxy : {
					type : 'ajax',
					async : false,
					url : AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
					actionMethods : {
						read : 'POST'
					},
					reader : {
						type : 'json',
						root : 'list'
					},
					extraParams : {
						V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
						V_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
						V_V_DEPTCODENEXT:Ext.util.Cookies.get('v_deptcode'),
						V_V_DEPTTYPE: '[基层单位]'
					}
				}
			});

			// 设备选择STORE
			var sbxzStore = Ext.create('Ext.data.Store', {
				autoLoad : false,
				storeId : 'sbxzStore',
				fields : [ 'EQU_DESC', 'EQU_ID' ],
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

			var zyqstore = Ext.create("Ext.data.Store", {
				autoLoad : false,
				storeId : 'zyqstore',
				fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
				proxy : {
					type : 'ajax',
					async : false,
					url : AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
					actionMethods : {
						read : 'POST'
					},
					reader : {
						type : 'json',
						root : 'list'
					}

				}
			});

			var ssbtype = Ext.create("Ext.data.Store", {
				autoLoad : false,
				storeId : 'sbtype',
				fields : [ 'V_EQUTYPECODE', 'V_EQUTYPENAME' ],
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

			var panel = Ext
					.create(
							'Ext.panel.Panel',
							{
								id : 'panellow',
								width : '100%',
								title : '设备备件历史更换台账',
								region : 'north',
								frame : true,
								layout : 'column',
								items : [
										{
											id : 'ck',
											xtype : 'combo',
											store : ckstore,
											editable : false,
											fieldLabel : '厂矿',
											labelWidth : 70,
											displayField : 'V_DEPTNAME',
											valueField : 'V_DEPTCODE',
											style : ' margin: 5px 0px 0px 10px',
											labelAlign : 'right',
											queryMode : 'local',
											baseCls : 'margin-bottom'
										},
										{
											id : 'zyq',
											xtype : 'combo',
											store : zyqstore,
											editable : false,
											fieldLabel : '作业区',
											labelWidth : 60,
											displayField : 'V_DEPTNAME',
											valueField : 'V_DEPTCODE',
											style : ' margin: 5px 0px 0px 10px',
											labelAlign : 'right',
											queryMode : 'local',
											baseCls : 'margin-bottom'
										},
										{
											id : 'sbtype',
											xtype : 'combo',
											store : sbxzStore,
											editable : false,
											fieldLabel : '选择设备',
											labelWidth : 80,
											style : ' margin: 5px 0px 0px 10px',
											labelAlign : 'right',
											displayField : 'EQU_DESC',
											valueField : 'EQU_ID',
											queryMode : 'local',
											baseCls : 'margin-bottom'
										},
										{
											xtype : 'textfield',
											fieldLabel : '备件唯一标识',
											id : 'nowDevice',
											labelAlign : 'right',
											labelWidth : 90,
											style : ' margin: 5px 0px 0px 10px'
										},
										{
											xtype : 'datefield',
											fieldLabel : '起始日期',
											id : 'start',
											value : new Date(
													new Date().getFullYear()
															+ "/"
															+ (new Date()
																	.getMonth() + 1)
															+ "/" + '01'),
											format : 'Y/m/d',
											editable : false,
											labelAlign : 'right',
											labelWidth : 70,
											style : ' margin: 5px 0px 0px 10px'
										},
										{
											xtype : 'datefield',
											fieldLabel : '结束日期',
											id : 'end',
											value : new Date(),
											format : 'Y/m/d',
											editable : false,
											labelAlign : 'right',
											labelWidth : 70,
											style : ' margin: 5px 0px 0px 10px'
										},
										{
											xtype : 'button',
											text : '查询',
											icon : imgpath + '/search.png',
											width : 80,
											style : ' margin: 5px 0px 0px 10px',
											handler : function() {
												Ext.data.StoreManager.lookup('gridStore').load({
													params : {
														A_PLANTCODE:Ext.getCmp('ck').getValue(),
														A_DEPARTCODE:Ext.getCmp('zyq').getValue(),
														A_EQUID:Ext.getCmp('sbtype').getValue(),
														A_BJ_UNIQUE_CODE:Ext.getCmp('nowDevice').getValue(),
														A_BEGINDATE:Ext.Date.format(Ext.getCmp('start').getValue(), 'Y-m-d'),
														A_ENDDATE:Ext.Date.format(Ext.getCmp('end').getValue(), 'Y-m-d')
													}
												})
											}
										},
										{
											id : 'delete',
											xtype : 'button',
											text : '导出Excel',
											width : 100,
											style : ' margin: 5px 0px 0px 10px',
											icon : imgpath + '/grid.png',
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
									fields : [ 'CHANGEDATE', 'BJ_UNIQUE_CODE',
											'MATERIALCODE', 'MATERIALNAME',
											'UNIT', 'BJ_STATUS', 'EQU_NAME',
											'SITE_DESC', 'DEPARTNAME',
											'SUPPLY_CODE', 'SUPPLY_NAME' ],
									proxy : {
										type : 'ajax',
										async : false,
										url : AppUrl + 'PM_12/PRO_RUN_BJ_USE_ALL',
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
										},
										{
											text : '最近更换日期',
											width : 120,
											dataIndex : 'CHANGEDATE',
											align : 'center',
											renderer : atleft
										},
										{
											text : '当前备件唯一标识',
											width : 180,
											dataIndex : 'BJ_UNIQUE_CODE',
											align : 'center',
											renderer : atleft
										},
										{
											text : '物资编码',
											width : 150,
											dataIndex : 'MATERIALCODE',
											type : 'date',
											align : 'center'
										},
										{
											text : '物资描述',
											width : 300,
											dataIndex : 'MATERIALNAME',
											align : 'center'
										},
										{
											text : '计量单位',
											width : 100,
											dataIndex : 'UNIT',
											align : 'center',
											renderer : atleft
										},
										{
											text : '备件状态',
											width : 120,
											dataIndex : 'BJ_STATUS',
											align : 'center',
											renderer : atleft
										},
										{
											text : '当前设备',
											width : 120,
											dataIndex : 'EQU_NAME',
											align : 'center',
											renderer : atleft
										},
										{
											text : '当前备件设备位置',
											width : 200,
											dataIndex : 'SITE_DESC',
											align : 'center',
											renderer : atleft
										},
										{
											text : '供应商',
											width : 120,
											dataIndex : 'SUPPLY_NAME',
											align : 'center',
											renderer : atleft
										},
										{
											text : '作业区',
											width : 120,
											dataIndex : 'DEPARTNAME',
											align : 'center',
											renderer : atleft
										},
										{
											text : '详细更换历史',
											width : 150,
											align : 'center',
											renderer : function() {
												return "<input type=button value='查看' onclick='importClick()' />";
											}
										}
								],
								bbar : [ {
									xtype : 'pagingtoolbar',
									dock : 'bottom',
									displayInfo : true,
									displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
									emptyMsg : '没有记录',
									store : 'gridStore'
								} ]
							});

			ckstore.on("load", function() {
				Ext.getCmp("ck").select(ckstore.getAt(ckstore.getCount() - 1));
				zyqstore.load({
					params : {
						V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
						V_V_DEPTCODE:Ext.getCmp("ck").getValue(),
						V_V_DEPTCODENEXT:Ext.util.Cookies.get('v_deptcode'),
						V_V_DEPTTYPE:'[主体作业区]'
					}
				});
			});
			Ext.ComponentManager.get("ck").on("select", function() {
				Ext.ComponentManager.get('zyq').getStore().removeAll();
				zyqstore.load({
					params : {
						V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
						V_V_DEPTCODE:Ext.getCmp("ck").getValue(),
						V_V_DEPTCODENEXT:Ext.util.Cookies.get('v_deptcode'),
						V_V_DEPTTYPE:'[主体作业区]'
					}
				});
			});

			zyqstore.on("load", function() {
				Ext.getCmp("zyq").select(zyqstore.getAt(zyqstore.getCount() - 1));
				// 默认当前登录用户工作区
				var storeDataList = zyqstore.data
				var storeLength = storeDataList.length;
				for ( var index = 0; index < storeLength; index++) {
					var storeItemData = storeDataList.items[index].data;
					if (storeItemData.V_DEPTCODE == Ext.util.Cookies.get('v_deptcode')) {
						Ext.getCmp("zyq").setValue(Ext.util.Cookies.get('v_deptcode'));
						break;
					}
				}
				sbxzStore.load({
					params : {
						V_V_PLANTCODE:Ext.util.Cookies.get('v_orgCode'),
						V_V_DEPTCODE:Ext.getCmp("zyq").getValue()
					}
				});
			});

			Ext.ComponentManager.get("zyq").on("select", function() {
				Ext.ComponentManager.get('sbtype').getStore().removeAll();
				sbxzStore.load({
					params : {
						V_V_PLANTCODE:Ext.util.Cookies.get('v_orgCode'),
						V_V_DEPTCODE:Ext.getCmp("zyq").getValue()
					}
				});
			});

			sbxzStore.on("load", function() {
				sbxzStore.insert(0, {
					'EQU_ID' : '%',
					'EQU_DESC' : '全部'
				});
				Ext.getCmp("sbtype").select(sbxzStore.getAt(0));
			});

			Ext.create('Ext.container.Viewport', {
				id : "id",
				layout : 'border',
				items : [ panel, grid ]
			});
		});

function OnButtonExportClicked() {
	document.location.href=AppUrl + 'excel/SBBJLSGHTZ_EXCEL?A_PLANTCODE='+Ext.getCmp('ck').getValue()+
	'&A_DEPARTCODE='+Ext.getCmp('zyq').getValue()+
	'&A_EQUID='+encodeURI(Ext.getCmp('sbtype').getValue())+
	'&A_BJ_UNIQUE_CODE='+Ext.getCmp('nowDevice').getValue()+
	'&A_BEGINDATE='+Ext.Date.format(Ext.getCmp('start').getValue(), 'Y-m-d')+
	'&A_ENDDATE='+Ext.Date.format(Ext.getCmp('end').getValue(), 'Y-m-d');
}

function importClick() {
	var selectModel = Ext.getCmp("grid").getSelectionModel();
	var nowDevice = selectModel.getSelection()[0].data.BJ_UNIQUE_CODE;
	window.open(AppUrl + 'page/PM_120201030301/index.html?nowDevice=' + nowDevice, '', "dialogWidth=650px;dialogHeight=400px");
}

function beforeloadStore(store) {

}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return value;
}