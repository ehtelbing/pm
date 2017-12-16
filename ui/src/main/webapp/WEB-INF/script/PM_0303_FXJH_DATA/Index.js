Ext
	.onReady(function () {

		Ext.QuickTips.init();
		function CreateYearStore() {
			var year = [];
			for (var i = new Date().getFullYear() - 1; i <= new Date().getFullYear() + 10; i++) {
				year.push({
					VALUE: i,
					DISPLAY: '--' + i + '年--'
				});
			}
			return {
				fields: ['VALUE', 'DISPLAY'],
				data: year
			};
		}

		function CreateMonthStore() {
			var month = [];
			for (var i = 1; i <= 12; i++) {
				month.push({
					VALUE: i,
					DISPLAY: '--' + i + '月--'
				});
			}

			return {
				fields: ['VALUE', 'DISPLAY'],
				data: month
			};
		}
		var ckstore = Ext.create("Ext.data.Store", {
			autoLoad: true,
			storeId: 'ckstore',
			fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
			proxy: {
				type: 'ajax',
				async: false,
				url: AppUrl +'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
				actionMethods: {
					read: 'POST'
				},
				reader: {
					type: 'json',
					root: 'list'
				},
				extraParams: {
					'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
					'V_V_DEPTCODE': Ext.util.Cookies.get('v_deptcode'),
					'V_V_DEPTCODENEXT': '%',
					'V_V_DEPTTYPE': '基层单位'
				}
			}
		});

		var zyqstore = Ext.create("Ext.data.Store", {
			autoLoad: false,
			storeId: 'zyqstore',
			fields:  ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
			proxy: {
				type: 'ajax',
				async: false,
				url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
				actionMethods: {
					read: 'POST'
				},
				reader: {
					type: 'json',
					root: 'list'
				}
			}
		});
		var ssbtype = Ext.create("Ext.data.Store", {
			autoLoad: false,
			storeId: 'sbtype',
			fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
			proxy: {
				type: 'ajax',
				async: false,
				url: AppUrl + 'qx/PRO_PM_07_DEPTEQUTYPE_PER',
				actionMethods: {
					read: 'POST'
				},
				reader: {
					type: 'json',
					root: 'list'
				}
			}
		});

		var ssbname = Ext.create("Ext.data.Store", {
			autoLoad: false,
			storeId: 'sbtype',
			fields: ['V_EQUCODE', 'V_EQUNAME'],
			proxy: {
				type: 'ajax',
				async: false,
				url: AppUrl + 'qx/PRO_PM_07_DEPTEQU_PER_DROP',
				actionMethods: {
					read: 'POST'
				},
				reader: {
					type: 'json',
					root: 'list'
				}
			}
		});

		var panel = Ext.create('Ext.panel.Panel', {
				id: 'panellow',
				width: '100%',
				region: 'north',
				frame: true,
				layout: 'column',
				defaults : {
					style : 'margin:5px 0px 5px 5px',
					labelAlign : 'right'
				},
				items: [
					{
						xtype: 'combo',
						fieldLabel: '起始年份',
						editable: false,
						id: 'year_b',
						store: CreateYearStore(),
						value: new Date().getFullYear(),
						labelWidth: 80,
						labelAlign:'right',
						valueField: 'VALUE',
						displayField: 'DISPLAY'
					},
					{
						xtype: 'combo',
						fieldLabel: '结束年份',
						editable: false,
						id: 'year_e',
						store: CreateYearStore(),
						value: new Date().getFullYear(),
						labelWidth: 80,
						labelAlign:'right',
						valueField: 'VALUE',
						displayField: 'DISPLAY'
					}, {
						xtype: 'combo',
						fieldLabel: '起始月份',
						editable: false,
						id: 'month_b',
						store: CreateMonthStore(),
						value: new Date().getMonth() + 1,
						labelWidth:80,
						labelAlign:'right',
						valueField: 'VALUE',
						displayField: 'DISPLAY'
					}, {
						xtype: 'combo',
						fieldLabel: '结束月份',
						editable: false,
						id: 'month_e',
						store: CreateMonthStore(),
						value: new Date().getMonth() + 1,
						labelWidth: 80,
						labelAlign:'right',
						valueField: 'VALUE',
						displayField: 'DISPLAY'
					},{
						id: 'ck',
						xtype: 'combo',
						store: ckstore,
						editable: false,
						fieldLabel: '厂矿',
						labelWidth: 80,
						labelAlign:'right',
						displayField: 'V_DEPTNAME',
						valueField: 'V_DEPTCODE',
						queryMode: 'local',
						baseCls: 'margin-bottom'
					}, {
						id: 'zyq',
						xtype: 'combo',
						store: zyqstore,
						editable: false,
						fieldLabel: '作业区',
						labelWidth: 80,
						labelAlign:'right',
						displayField: 'V_DEPTNAME',
						valueField: 'V_DEPTCODE',
						queryMode: 'local',
						baseCls: 'margin-bottom'
					},{
						id: 'sbtype',
						xtype: 'combo',
						store: ssbtype,
						editable: false,
						fieldLabel: '设备类型',
						labelWidth: 80,
						labelAlign:'right',
						displayField: 'V_EQUTYPENAME',
						valueField: 'V_EQUTYPECODE',
						queryMode: 'local',
						baseCls: 'margin-bottom'
					}, {
						id: 'sbname',
						xtype: 'combo',
						store: ssbname,
						editable: false,
						fieldLabel: '设备名称',
						labelWidth: 80,
						labelAlign:'right',
						displayField: 'V_EQUNAME',
						valueField: 'V_EQUCODE',
						queryMode: 'local',
						baseCls: 'margin-bottom'
					},
					{
						xtype: 'textfield',
						id: 'seltext',
						emptyText: '工程项目名称',
						labelAlign: 'right',
						width: 158,
						margin:'5px 0px 5px 90px'
					},
					{
						xtype: 'button',
						text: '查询',
						icon: imgpath + '/search.png',
						width: 100,
						handler: function () {
							if(Ext.getCmp('year_b').getValue()>Ext.getCmp('year_e').getValue()){
								alert("起始时间不能大于结束时间");
								return;
							}else {
								if(Ext.getCmp('year_b').getValue()==Ext.getCmp('year_e').getValue()){
									if(Ext.getCmp('month_b').getValue()>Ext.getCmp('month_e').getValue()){
										alert("起始时间不能大于结束时间");
										return;
									}
								}
							}
							Ext.data.StoreManager
								.lookup('gridStore')
								.load(
								{
									params: {
										V_V_YEAR_B: Ext.getCmp('year_b').getValue(),
										V_V_YEAR_E: Ext.getCmp('year_e').getValue(),
										V_V_MONTH_B: Ext.getCmp('month_b').getValue(),
										V_V_MONTH_E: Ext.getCmp('month_e').getValue(),
										V_V_PROJECT_NAME: Ext.getCmp("sbtype").getValue(),
										V_V_EQUTYPECODE: Ext.getCmp("sbname").getValue(),
										V_V_EQUCODE: Ext.getCmp("seltext").getValue(),
										V_V_BY1: '',
										V_V_BY2: ''
									}
								})
						}
					}]
			});
		var grid = Ext.create('Ext.grid.Panel',
			{
				id: 'grid',
				region: 'center',
				columnLines: true,
				width: '100%',
				store: {
					id: 'gridStore',
					autoLoad: false,
					fields: ['ID', 'V_ORDERGUID', 'V_ORDERID',
						'V_SHORT_TXT', 'V_EQUIP_NO',
						'V_EQUIP_NAME', 'V_EQUSITENAME', 'V_SPARE',
						'V_ORGNAME', 'V_DEPTNAME', 'V_PERSONNAME',
						'D_ENTER_DATE', 'V_DEPTNAMEREPARIR', 'V_ORDER_TYP_TXT'],
					proxy: {
						type: 'ajax',
						async: false,
						//url : APP + '/ModelSelect',
						url: AppUrl + 'PM_0303/PM_03_FXJH_DATA_SEL',
						actionMethods: {
							read: 'POST'
						},
						reader: {
							type: 'json',
							root: 'list'
						}
					}
				},
				autoScroll: true,
				selType: 'checkboxmodel',
				height: 400,
				columns: [{
					xtype: 'rownumberer',
					text: '序号',
					width: 50,
					align: 'center'
				}, {
					text: '单位编码',
					dataIndex: 'V_ORDERGUID',
					hidden: true,
					renderer: CreateGridColumnTd
				}, {
					text: '年份',
					dataIndex: 'V_ORDERID',
					width: 150,
					align: 'center',
					renderer: CreateGridColumnTd
				}, {
					text: '月份',
					dataIndex: 'V_SHORT_TXT',
					renderer: CreateGridColumnTd,
					width: 300,
					align: 'center'
				}, {
					text: '工程项目编码',
					dataIndex: 'V_EQUIP_NO',
					hidden: true,
					renderer: CreateGridColumnTd
				}, {
					text: '工程项目名称',
					dataIndex: 'V_EQUIP_NAME',
					width: 150,
					align: 'center',
					renderer: CreateGridColumnTd
				}, {
					text: '计划投资（万元）',
					dataIndex: 'V_EQUSITENAME',
					width: 250,
					algin: 'center',
					renderer: CreateGridColumnTd
				}, {
					text: '工程主要内容',
					dataIndex: 'V_SPARE',
					width: 300,
					align: 'center',
					renderer: CreateGridColumnTd
				}, {
					text: '设计完成时间',
					dataIndex: 'V_ORGNAME',
					width: 150,
					align: 'center',
					renderer: CreateGridColumnTd
				}, {
					text: '招标时间',
					dataIndex: 'V_DEPTNAME',
					width: 100,
					algin: 'center',
					renderer: CreateGridColumnTd
				}, {
					text: '开工时间',
					dataIndex: 'V_PERSONNAME',
					width: 100,
					align: 'center',
					renderer: CreateGridColumnTd
				}, {
					text: '竣工时间',
					dataIndex: 'D_ENTER_DATE',
					width: 150,
					align: 'center',
					renderer: CreateGridColumnTd
				}, {
					text: '年度投资（万元）',
					dataIndex: 'V_DEPTNAMEREPARIR',
					width: 150,
					align: 'center',
					renderer: CreateGridColumnTd
				}, {
					text: '形象进度',
					dataIndex: 'V_ORDER_TYP_TXT',
					width: 100,
					align: 'center',
					renderer: CreateGridColumnTd
				}, {
					text: '建设单位项目经理',
					dataIndex: 'V_ORDER_TYP_TXT',
					width: 100,
					align: 'center',
					renderer: CreateGridColumnTd
				}, {
					text: '建设单位工程负责人',
					dataIndex: 'V_ORDER_TYP_TXT',
					width: 100,
					align: 'center',
					renderer: CreateGridColumnTd
				}, {
					text: '工程指挥部项目负责人',
					dataIndex: 'V_ORDER_TYP_TXT',
					width: 100,
					align: 'center',
					renderer: CreateGridColumnTd
				}]
			});


		Ext.create('Ext.container.Viewport', {
			id: "id",
			layout: 'border',
			items: [panel, grid]
		});

		ckstore.on("load", function () {
			Ext.getCmp("ck").select(ckstore.getAt(0));


		});

		Ext.ComponentManager.get("ck").on("change", function () {
			Ext.ComponentManager.get('zyq').getStore().removeAll();
			zyqstore.load({
				params: {
					V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
					V_V_DEPTCODE: Ext.util.Cookies.get('v_deptcode'),
					V_V_DEPTCODENEXT: Ext.getCmp('ck').getValue(),
					V_V_DEPTTYPE: '[基层单位]'
				}
			});
		});

		zyqstore.on("load", function () {
			Ext.getCmp("zyq").select(zyqstore.getAt(0));
		});

		Ext.ComponentManager.get("zyq").on("change", function () {
			Ext.ComponentManager.get('sbtype').getStore().removeAll();
			ssbtype.load({
				params: {
					V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
					V_V_DEPTCODENEXT : Ext.getCmp("zyq").getValue()
				}
			});
		});

		ssbtype.on("load", function () {
			Ext.getCmp("sbtype").select(ssbtype.findRecord('V_EQUTYPENAME', '全部'));
			ssbname.load({
				params: {
					//parName: ['V_V_PERSONCODE',
					//    'V_V_DEPTCODENEXT', 'V_V_EQUTYPECODE'],
					//parType: ['s', 's', 's'],
					//parVal: [Ext.util.Cookies.get('v_personcode'),
					//    Ext.getCmp("zyq").getValue(),
					//    Ext.getCmp("sbtype").getValue()],
					//proName: 'pro_get_deptequ_per_drop',
					//cursorName: 'V_CURSOR'
					V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
					V_V_DEPTCODENEXT : Ext.getCmp("zyq").getValue(),
					V_V_EQUTYPECODE : Ext.getCmp("sbtype").getValue()

				}
			});
		});

		Ext.getCmp("sbtype").on("change", function () {
			Ext.ComponentManager.get('sbname').getStore().removeAll();
			ssbname.load({
				params: {
					V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
					V_V_DEPTCODENEXT : Ext.getCmp("zyq").getValue(),
					V_V_EQUTYPECODE : Ext.getCmp("sbtype").getValue()
				}
			});
		});

		var flag = 1;
		ssbname.on("load", function () {
			Ext.getCmp("sbname").select(ssbname.getAt(0));
		});
	});


function QueryGrid() {
	if(Ext.getCmp('year_b').getValue()>Ext.getCmp('year_e').getValue()){
		alert("起始时间不能大于结束时间");
		return;
	}else {
		if(Ext.getCmp('year_b').getValue()==Ext.getCmp('year_e').getValue()){
			if(Ext.getCmp('month_b').getValue()>Ext.getCmp('month_e').getValue()){
				alert("起始时间不能大于结束时间");
				return;
			}
		}
	}


	Ext.data.StoreManager.lookup('gridStore').load({
		params: {
			V_V_YEAR_B: Ext.getCmp('year_b').getValue(),
			V_V_YEAR_E: Ext.getCmp('year_e').getValue(),
			V_V_MONTH_B: Ext.getCmp('month_b').getValue(),
			V_V_MONTH_E: Ext.getCmp('month_e').getValue(),
			V_V_PROJECT_NAME: Ext.getCmp("sbtype").getValue(),
			V_V_EQUTYPECODE: Ext.getCmp("sbname").getValue(),
			V_V_EQUCODE: Ext.getCmp("seltext").getValue(),
			V_V_BY1: '',
			V_V_BY2: ''
		}
	});
}

function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return '<div data-qtip="' + value + '" >' + value + '</div>';
}