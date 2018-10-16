//作业区
var depart = '';
if (location.href.split('?')[1] != undefined) {
	depart = Ext.urlDecode(location.href.split('?')[1]).depart;
}
//设备ID
var equid = '';
if (location.href.split('?')[1] != undefined) {
	equid = Ext.urlDecode(location.href.split('?')[1]).equid;
}
//物资编码
var matcode = '';
if (location.href.split('?')[1] != undefined) {
	matcode = Ext.urlDecode(location.href.split('?')[1]).matcode;
}

//设备选择STORE
var sbxzStore = Ext.create('Ext.data.Store', {
	autoLoad : false,
	storeId : 'sbxzStore',
	fields : [ 'EQU_DESC', 'EQU_ID' ],
	proxy : {
		type : 'ajax',
		async : false,
		url: AppUrl + 'cjy/pro_run7111_equlist',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		}
	}
});

// var gzpalceStore = Ext.create('Ext.data.Store', {
// 	autoLoad : true,
// 	storeId : 'gzpalceStore',
// 	fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
// 	proxy : {
// 		type : 'ajax',
// 		async : false,
// 		url: AppUrl + 'No4120/PRO_PM_REPAIRDEPT_TODEPT',
// 		actionMethods : {
// 			read : 'POST'
// 		},
// 		reader : {
// 			type : 'json',
// 			root : 'list'
// 		},
// 		extraParams : {
// 			V_REPAIRDEPTCODE:Ext.util.Cookies.get('v_deptcode'),
// 			V_PERSONCODE:Ext.util.Cookies.get('v_orgCode')
// 		}
// 	}
// });
var gzpalceStore = Ext.create('Ext.data.Store', {
    autoLoad : true,
    storeId : 'gzpalceStore',
    fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
    proxy : {
        type : 'ajax',
        async : false,
        url : AppUrl + 'PM_12/PRO_BASE_DEPT_VIEW',
        actionMethods : {},
        reader : {
            type : 'json',
            root : 'list'
        },
        extraParams : {
            // parVal : [ Ext.util.Cookies.get('v_orgCode'), '[主体作业区]' ]
            IS_V_DEPTCODE : Ext.util.Cookies.get('v_orgCode'),
            IS_V_DEPTTYPE:'[主体作业区]'
        }
    }
});

var siteStore = Ext.create('Ext.data.Store', {
	autoLoad : false,
	storeId : 'siteStore',
	fields : [ 'SITE_ID', 'SITE_DESC' ],
	proxy : {
		type : 'ajax',
		async : false,
		url :AppUrl + 'cjy/PRO_RUN_SITE_BJ_ALL',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		}
	}
});
var supplyStore = Ext.create('Ext.data.Store', {
	autoLoad : false,
	storeId : 'supplyStore',
	fields : [ 'SUPPLY_CODE', 'SUPPLY_NAME' ],
	proxy : {
		type : 'ajax',
		async : false,
		url :AppUrl + 'cjy/pro_run7110_sitesupplylist',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		}
	}
});
var month = new Date().getMonth() + 1;

var panel = Ext.create('Ext.panel.Panel', {
	id : 'panellow',
	width : '100%',
	title : '工单备件更换管理',
	region : 'north',
	frame : true,
	layout : {
		type : 'vbox'
	},
	items : [ {
		xtype : 'panel',
		style: 'background-color:#FFFFFF',
		baseCls: 'my-panel-no-border',
		width : '100%',
		bodyBorder : false,
		layout : 'column',
		frame : true,
		items : [ {
			xtype : 'combo',
			id : "zyq",
			store : gzpalceStore,
			editable : false,
			readOnly : true,
			queryMode : 'local',
			fieldLabel : '作业区',
			displayField : 'V_DEPTNAME',
			valueField : 'V_DEPTCODE',
			labelWidth : 60,
			style : ' margin: 5px 0px 0px 10px',
			labelAlign : 'right'
		}, {
			xtype : 'combo',
			id : "selEqu",
			store : Ext.data.StoreManager.lookup('sbxzStore'),
			editable : false,
			queryMode : 'local',
			fieldLabel : '设备',
			displayField : 'EQU_DESC',
			valueField : 'EQU_ID',
			labelWidth : 60,
			style : ' margin: 5px 0px 0px 10px',
			labelAlign : 'right'
		}, {
			xtype : 'textfield',
			id : "mCode",
			value:matcode,
			style : ' margin: 5px 0px 0px 20px',
			emptyText : '请输入物资编码'
		}, {
			xtype : 'textfield',
			id : "mName",
			style : ' margin: 5px 0px 0px 20px',
			emptyText : '请输入物资名称'
		}, {
			xtype : 'button',
			text : '查询',
			icon : imgpath + '/search.png',
			width : 80,
			style : ' margin: 5px 0px 0px 10px',
			handler : loadGridStore
		}, {
			id : 'delete',
			xtype : 'button',
			text : '导出Excel',
			hidden:true,
			style : ' margin: 5px 0px 0px 10px',
			width : 80,
			handler : OnButtonExportClicked
		} ]
	}, {
		xtype : 'panel',
		bodyBorder : false,
		hidden:true,
		baseCls : 'my-panel-noborder',
		layout : {
			type : 'table',
			// The total column count must be specified here
			columns : 3
		},
		defaults : {
			// applied to each contained panel
			bodyStyle : 'padding:10px',
			labelAlign : 'right'

		},
		width : '100%',
		frame : true,
		items : [ {
			xtype : 'textfield',
			id : 'uniqueCode',
			fieldLabel : '备件唯一标识',
			labelWidth : 76,
			style : 'margin:5px 0px 0px 10px'
		}, {
			xtype : 'combo',
			labelWidth : 200,
			id : "selSite",
			store : siteStore,
			editable : false,
			queryMode : 'local',
			fieldLabel : '请选择备件所更换的安装位置',
			displayField : 'SITE_DESC',
			valueField : 'SITE_ID',
			style : ' margin: 5px 0px 0px 5px'

		}, {
			xtype : 'combo',
			labelWidth : 60,
			id : 'supply',
			store : supplyStore,
			editable : false,
			queryMode : 'local',
			fieldLabel : '供应商',
			displayField : 'SUPPLY_NAME',
			valueField : 'SUPPLY_CODE',
			style : ' margin: 5px 0px 0px 5px'
		} ]
	} ,
		{
			xtype : 'panel',
			bodyBorder : false,
			hidden:true,
			baseCls : 'my-panel-noborder',
			layout : {
				type : 'table',
				// The total column count must be specified here
				columns : 4
			},
			defaults : {
				// applied to each contained panel
				bodyStyle : 'padding:10px',
				labelAlign : 'right'
			},
			width : '100%',
			frame : true,
			items : [ {
				xtype : 'datefield',
				fieldLabel : '更换日期',
				id : 'changeDate',
				value : new Date(),
				format : 'Y/m/d',
				editable : false,
				labelWidth : 76,
				style : ' margin: 5px 0px 0px 10px'
			}, {
				xtype : 'radiogroup',
				fieldLabel : '故障原因',
				labelWidth : 100,
				width : 400,
				columns : 3,
				id : "faultReason",
				items : [ {
					boxLabel : '正常磨损',
					name : 'reason',
					inputValue : '正常磨损',
					checked : true,
					id : 'reason1'
				}, {
					boxLabel : '质量问题',
					name : 'reason',
					inputValue : '质量问题',
					id : 'reason2'
				}, {
					boxLabel : '其他',
					name : 'reason',
					inputValue : '其他',
					id : 'reason3'
				} ]
			},
				{
					xtype : 'textfield',
					id : "gzsm",
					//value:matcode,
					style : ' margin: 5px 0px 0px 20px',
					emptyText : '请输入其他故障说明'
				},

				{
					id : 'changeBtn',
					xtype : 'button',
					text : '确定更换',
					style : ' margin: 5px 0px 0px 10px',
					width : 80,
					handler : siteChange
				} ]
		}

	]
});
var grid = Ext
	.create(
	'Ext.grid.Panel',
	{
		id : 'grid',
		region : 'center',
		columnLines : true,
		width : '100%',
		store : {
			id : 'gridStore',
			autoLoad : false,
			fields : [ 'I_ID', 'V_ORDERGUID', 'V_ORDERID',
				'V_MATERIALCODE', 'V_MATERIALNAME', 'V_UNIT',
				'I_ACTUALAMOUNT', 'D_FINISH_DATE',
				'V_ORDER_TYP_TXT', 'CHANGE_STIEID',
				'V_EQUIP_NO', 'OP_USERID', 'OP_USERNAME',
				'V_DEPTCODE', 'V_WORK_AREA', 'D_DATE_EDITTIME' ],
			proxy : {
				type : 'ajax',
				async : false,
				url: AppUrl + 'cjy/pro_run7113_ordermatlistq',
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
//					selModel : {
//						selType : 'checkboxmodel',
//						mode : 'SINGLE'
//					},
		height : 400,
		columns : [

			{
				xtype : 'rownumberer',
				text : '序号',
				width : 35,
				sortable : false
			},
			{
				text : '工单号',
				width : 150,
				dataIndex : 'V_ORDERID',
				align : 'center',
				renderer : atleft
			},
			{
				text : '物料编码',
				width : 150,
				dataIndex : 'V_MATERIALCODE',
				align : 'center',
				renderer : atleft
			},
			{
				text : '物料名称',
				width : 400,
				dataIndex : 'V_MATERIALNAME',
				align : 'center',
				renderer : atleft
			},
			{
				text : '计量单位',
				width : 90,
				dataIndex : 'V_UNIT',
				align : 'center',
				renderer : atleft
			},
			{
				text : '使用数量',
				width : 150,
				dataIndex : 'I_ACTUALAMOUNT',
				align : 'center'
			},
			{
				text : '工单结束日期',
				width : 200,
				dataIndex : 'D_FINISH_DATE',
				align : 'center'
			},
			{
				text : '工单描述',
				flex : 1,
				dataIndex : 'V_ORDER_TYP_TXT',
				align : 'center',
				renderer : atleft
			},
			{
				text : '操作 ',
				align : 'center',
				hidden:true,
				width : 100,
				renderer : function(value, metaData, record) {
					return '<div><a href="javascript:OnClickDeleteLink()">忽略</a></div>';
				}
			}

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

Ext
	.onReady(function() {
		//Ext.getCmp('mCode').select(matcode);

		Ext.data.StoreManager
			.lookup('gzpalceStore')
			.on(
			'load',
			function() {
				if(depart=='')
				{
					Ext.getCmp('zyq').select(
						Ext.data.StoreManager.lookup(
							'gzpalceStore').getAt(0));}
				else
				{Ext.getCmp('zyq').select(depart);}

				// 默认当前登录用户工作区
				var storeLength = Ext.data.StoreManager.lookup('gzpalceStore').data.length;
				for ( var index = 0; index < storeLength; index++) {
					var storeItemData = Ext.data.StoreManager.lookup('gzpalceStore').data.items[index].data;
					if (storeItemData.V_DEPTCODE == Ext.util.Cookies
							.get('v_deptcode')) {
						Ext.getCmp("zyq").setValue(
							Ext.util.Cookies
								.get('v_deptcode'));
						break;
					}
				}

				Ext.getCmp('selSite').select('请选择');

				Ext.data.StoreManager.lookup('sbxzStore').load(
					{
						params : {
							v_v_plantcode:Ext.util.Cookies.get('v_orgCode'),
							v_v_deptcode:Ext.getCmp('zyq').getValue()
						}
					});
			});
		Ext.data.StoreManager.lookup('sbxzStore').on('load', function() {
			Ext.getCmp('selEqu').store.insert(0, {
				'EQU_ID' : '%',
				'EQU_DESC' : '全部'
			});
			if(equid!=''){
				Ext.getCmp('selEqu').select(equid);
			} else {
				Ext.getCmp('selEqu').setValue('%');
			}
			loadGridStore();
		});

		Ext.getCmp('zyq').on('select',
			function() {
				Ext.data.StoreManager.lookup('sbxzStore').load(
					{
						params : {
							v_v_plantcode: Ext.util.Cookies.get('v_orgCode'),
							v_v_deptcode: Ext.getCmp('zyq').getValue()
						}
					});
			});

		Ext.getCmp('selEqu').on('select', function() {
			Ext.getCmp('selSite').select('请选择');
			Ext.data.StoreManager.lookup('siteStore').load({
				params : {
					IN_EQUID:Ext.getCmp('selEqu').getValue(),
					IN_PLANT:'%',
					IN_DEPART:'%',
					IN_STATUS:'%',
					IN_BJCODE:'%',
					IN_BJDESC:'%'
				}

			});

		});

		Ext.getCmp('selSite').on('change', function() {
			if (Ext.getCmp('selSite').getValue().toString() == '请选择') {
				Ext.getCmp('changeBtn').disabled = true;
			} else {
				Ext.getCmp('changeBtn').disabled = false;
				Ext.data.StoreManager.lookup('supplyStore').load({
					params : {
						parVal : [ Ext.getCmp('selSite').getValue() ]
					}
				});
				supplyStore.on('load', function() {
					Ext.getCmp('supply').select(supplyStore.getAt(0));
				});
			}
		});

		Ext.create('Ext.container.Viewport', {
			id : "id",
			layout : 'border',
			items : [ panel, grid ]
		});
	});

function siteChange() {
	var data = Ext.getCmp('grid').getSelectionModel().getSelection();
	if (data.length == 0) {
		Ext.Msg.alert('提示', '请选择一条记录');
		return;
	}
	var data = data[0].data;
	Ext.Ajax
		.request({
			url : APP + '/pro_run7113_changeordermat',
			method : 'POST',
			params : {
				parVal : [
					data.I_ID,
					Ext.getCmp('selSite').getValue(),
					Ext.getCmp('selEqu').getValue(),
					Ext.util.Cookies.get('v_personcode'),
					Ext.util.Cookies.get('v_personname'),
					Ext.util.Cookies.get('v_orgCode'),
					Ext.getCmp('zyq').getValue(),
					Ext.Date.format(data.D_DATE_EDITTIME,
						"YYYY-mm-dd HH:ii:ss"),
					data.V_MATERIALCODE,
					Ext.getCmp('supply').getValue(),
					Ext.getCmp('supply').getRawValue(),
					Ext.getCmp('uniqueCode').getValue(),
					Ext.getCmp('changeDate').getValue() == null ? ""
						: Ext.Date.format(Ext.getCmp('changeDate')
						.getValue(), 'Y-m-d'),
					Ext.getCmp("faultReason").getValue().reason,
					Ext.getCmp('gzsm').getValue()]
			},
			success : function(resp) {
				resp = Ext.decode(resp.responseText);
				if (resp == 'success') {
					Ext.Msg.alert('提示', '操作成功');
					loadGridStore();
				} else {
					Ext.Msg.alert('提示', '操作失败');
				}
			}
		});
};

function OnClickDeleteLink() {

	var data = Ext.getCmp('grid').getSelectionModel().getSelection()[0].data;

	Ext.Ajax
		.request({
			url : APP + '/pro_run7113_changecancel',
			method : 'POST',
			params : {
				parVal : [
					data.I_ID,
					data.CHANGE_STIEID,
					data.V_EQUIP_NO,
					data.V_WORK_AREA,
					data.V_DEPTCODE,
					data.OP_USERID,
					data.OP_USERNAME,
					Ext.Date.format(data.D_DATE_EDITTIME,
						"YYYY-mm-dd HH:ii:ss") ]
			},
			success : function(resp) {
				resp = Ext.decode(resp.responseText);
				if (resp == 'success') {
					Ext.Msg.alert('提示', '操作成功');
					loadGridStore();
				}
			}
			// ,
			// render:{ type: 'josn', root: 'list'}
		});

}

function OnButtonExportClicked() {

	var tableName = [ "工单号", " 物料编码", "物料名称", "计量单位", "使用数量", "工单结束日期", "工单描述" ];
	var tableKey = [ 'V_ORDERID', 'V_MATERIALCODE', 'V_MATERIALNAME', 'V_UNIT',
		'I_ACTUALAMOUNT', 'D_FINISH_DATE', 'V_ORDER_TYP_TXT' ];

	var parName = [ 'V_DEPT_CODE', 'V_EQUIP_CODE', 'V_MATERIALCODE',
		'V_MATERIALNAME' ];

	var parType = [ 's', 's', 's', 's' ];
	var parVal = [ Ext.getCmp("zyq").getValue(),// '99060208',//
		Ext.getCmp("selEqu").getValue(),// '000000005700005218',//
		Ext.getCmp("mCode").getValue(),// '2ZZZZ',//
		Ext.getCmp("mName").getValue() // '2',//
	];
	var proName = 'pro_run7113_ordermatlist';
	var ExcelName = 'Excel';

	var cursorName = 'content_cursor';

	// var returnStr = ['total_weeknum','title'];
	// var returnStrType = ['i','s'];

	location.href = "ModelExcelBZ?" +

		"tableName=" + tableName.join(",") + "&tableKey=" + tableKey.join(",")
		+ "&parName=" + parName.join(",") + "&parType=" + parType.join(",")
		+ "&parVal=" + parVal.join(",") + "&proName=" + proName
		+ "&ExcelName=" + ExcelName + "";
	// "&returnStr=" + returnStr +
	// "&returnStrType=" + returnStrType;;

}

function loadGridStore() {
	Ext.data.StoreManager.lookup('gridStore').load({
		params : {
			V_DEPT_CODE:Ext.getCmp("zyq").getValue(),
			V_EQUIP_CODE:Ext.getCmp("selEqu").getValue(),
			V_MATERIALCODE:Ext.getCmp("mCode").getValue(),
			V_MATERIALNAME:Ext.getCmp("mName").getValue(),
		}

	});
}

function beforeloadStore(store) {

}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return value;
}