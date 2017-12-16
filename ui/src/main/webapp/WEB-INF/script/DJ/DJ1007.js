var globalProCode = '';
var kc_id ='';


var gridStorekc = Ext.create('Ext.data.Store', {
		autoLoad : false,
		storeId : 'gridStorekc',
		fields : [ 'KCID', 'MATERIALCODE', 'MATERIALNAME', 'ETALON', 'UNIT',
				'F_PRICE', 'KY_AMOUNT', 'STORE_DESC', 'NUM' ],
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
						parVal : [ Ext.util.Cookies.get("mm.departcode") ],
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
Ext.onReady(function() {
	

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
				cursorName : 'ret'
			}
		}
	});
	var wzflStore = Ext.create('Ext.data.Store', {// 物资分类
		autoLoad : true,
		storeId : 'wzflStore',
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
				proName : 'PRO_MM_ITYPE',
				cursorName : 'ret'
			}
		}
	});

	var gridStore = Ext.create('Ext.data.Store', {
		autoLoad : false,
		pageSize : 100,
		storeId : 'gridStore',
		fields : [ 'APPLYID', 'MATERIALNAME', 'ETALON', 'UNIT', 'AMOUNT',
				'GROUPNAME', 'REMARK', 'APPLY_DATE' ],
		proxy : {
			type : 'ajax',
			actionMethods : {
				read : 'POST'
			},
			url : APP + '/ModelSelect',
			reader : {
				type : 'json',
				root : 'list'
			},
			extraParams : {
				parName : [ 'a_begindate', 'a_enddate', 'a_itype', 'a_name' ],
				parType : [ 'da', 'da', 's', 's' ],
				proName : 'pg_dj1007.getapplymat',
				cursorName : 'ret'
			}
		}
	});
	var northPanel = Ext.create("Ext.panel.Panel", {
		region : 'north',
		frame : true,
		baseCls : 'my-panel-noborder',
		layout : 'vbox',
		width : '100%',
		style : 'margin:5px 0px 5px 5px',
		items : [ {
			xtype : 'panel',
			frame : true,
			width : "100%",
			baseCls : 'my-panel-noborder',
			layout : 'hbox',
			items : [ {
				xtype : 'datefield',
				id : 'qsrq',
				fieldLabel : '起始日期',
				style : ' margin: 5px 0px 5px 5px',
				labelAlign : 'right',
				labelWidth : 70,
				value : Ext.Date.getFirstDateOfMonth(new Date()),// 根据现在日期获取这个月的第一天是哪天
				format : 'Y/m/d',
				editable : false
			}, {
				xtype : 'datefield',
				id : 'jsrq',
				fieldLabel : '结束日期',
				style : ' margin: 5px 0px 5px 5px',
				labelAlign : 'right',
				labelWidth : 70,
				queryMode : 'local',
				value : Ext.Date.getLastDateOfMonth(new Date()),
				format : 'Y/m/d',
				editable : false
			}, {
				xtype : 'combo',
				id : 'wzfl',
				fieldLabel : '物资分类',
				labelAlign : 'right',
				editable : false,
				style : 'margin:5px 0px 5px 5px',
				labelWidth : 70,
				queryMode : 'local',
				valueField : 'CODE',
				displayField : 'NAME',
				store : wzflStore
			}, ]
		}, {
			xtype : 'panel',
			frame : true,
			layout : 'hbox',
			width : "100%",
			baseCls : 'my-panel-noborder',
			items : [ {
				xtype : 'textfield',
				id : 'wlmc',
				fieldLabel : '物料名称',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				labelAlign : 'right'
			} ]
		}, {
			xtype : 'panel',
			frame : true,
			layout : 'hbox',
			width : "100%",
			baseCls : 'my-panel-noborder',
			items : [ {
				xtype : 'button',
				text : '查询',
				labelWidth : 70,
				style : 'margin:5px 10px 5px 5px',
				icon : imgpath + '/a1.gif',
				handler : onSearch
			}, {
				xtype : 'button',
				text : '新增',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				// icon: imgpath +'/a1.gif',
				handler : OnAdd
			}, {
				xtype : 'button',
				text : '导出excel',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
			 handler : onExcel,
				icon : imgpath + '/confirm.gif'
			}, {
				xtype : 'button',
				text : '打印',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				handler : OnBtnPrint,
				icon : imgpath + '/confirm.gif'
			} ]
		} ]
	});
	var grid = Ext.create('Ext.grid.Panel', {
		id : 'grid',
		region : 'center',
		columnLines : true,
		width : '100%',
		autoScroll : true,
		store : gridStore,
		dufaults : {
			width : 120
		},
		columns : [ {
			text : '删除',
			align : 'center',
			width : 60,
			renderer : OnDel
		}, {
			text : '日期',
			dataIndex : 'APPLY_DATE',
			align : 'center',
			width : 100
		}, {
			text : '材料/备件名称',
			dataIndex : 'MATERIALNAME',
			align : 'center',
			width : 100
		}, {
			text : '规格',
			dataIndex : 'ETALON',
			align : 'center',
			width : 130
		}, {
			text : '单位',
			dataIndex : 'UNIT',
			align : 'center',
			width : 110
		}, {
			text : '数量',
			dataIndex : 'AMOUNT',
			align : 'center',
			width : 110
		}, {
			text : '班组',
			dataIndex : 'GROUPNAME',
			align : 'center',
			width : 110
		}, {
			text : '备注',
			dataIndex : 'REMARK',
			align : 'center',
			width : 110
		}, ]
	});
	var window = Ext.create('Ext.window.Window', {

		id : 'window',
		title : "新增",
		width : 350,
		height : 300,
		plain : true,
		modal : true,
		defaults : {
			labelWidth : 100,
			labelAlign : 'right',
			width : 300,
			style : 'margin-top:8px'
		},
		items : [ {
			xtype : 'datefield',
			id : 'wdqrq',
			fieldLabel : '日期',
			style : ' margin: 5px 0px 5px 5px',
			labelAlign : 'right',
			labelWidth : 60,
			value :new Date(),
			format : 'Y/m/d',
			editable : false
		},

		{
			id : 'wmc',
			xtype : 'textfield',
			style : ' margin: 5px 0px 5px 5px',
			fieldLabel : '名称',
			labelAlign : 'right',
			readOnly:true,
			labelWidth : 60
		},{
			id : 'wgg',
			xtype : 'textfield',
			style : ' margin: 5px 0px 5px 5px',
			fieldLabel : '规格',
			labelAlign : 'right',
			readOnly:true,
			labelWidth : 60
		}, {
			id : 'wdw',
			xtype : 'textfield',
			style : ' margin: 5px 0px 5px 5px',
			fieldLabel : '单位',
			labelAlign : 'right',
			readOnly:true,
			labelWidth : 60
		}, {
			id : 'wsl',
			xtype : 'textfield',
			style : ' margin: 5px 0px 5px 5px',
			fieldLabel : '数量',
			labelAlign : 'right',
			labelWidth : 60
		},{
			id : 'wbz',
			xtype : 'combobox',
			fieldLabel : '班组',
			labelWidth : 60,
			editable : false,
			queryMode : 'local',
			labelAlign : 'right',
			displayField : 'MENDDEPT_NAME',
			valueField : 'MENDDEPT_CODE',
			store : plantStore
		},{
			id : 'responsible',
			xtype : 'combobox',
			fieldLabel : '负责人',
			editable : false,
			labelWidth : 60,
			queryMode : 'local',
			labelAlign : 'right',
			displayField : 'USERNAME',
			valueField : 'USERID',
			store : responsibleStore
		}, {
			id : 'wbeiz',
			xtype : 'textfield',
			style : ' margin: 5px 0px 5px 5px',
			fieldLabel : '备注',
			labelAlign : 'right',
			labelWidth : 60
		} ],
		buttons : [ {
			id : 'selectkc',
			xtype : 'button',
			style : ' margin: 5px 0px 5px 5px',
			text : '查询库存',
			width : 80
		},{
			xtype : 'button',
			text : '保存',
			labelWidth : 70,
			style : 'margin:5px 0px 5px 5px',
			 handler : OnSave,
			icon : imgpath + '/confirm.gif'
		} ],

		closeAction : 'hide',
		model : true
	});
	
	
	var listkc = Ext.create('Ext.panel.Panel', {
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
				columns : 3
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
			}, {
				id : 'etalon',
				xtype : 'textfield',
				fieldLabel : '规格型号'
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

	var gridkc = Ext.create('Ext.grid.Panel', {
		id : 'gridkc',
		region : 'center',
		columnLines : true,
		width : '100%',
		autoScroll : true,
		store : gridStorekc,
		dufaults : {
			width : 120
		},
		plugins : [ Ext.create('Ext.grid.plugin.CellEditing', {
			clicksToEdit : 1
		}) ],
		columns : [ {
			xtype : 'rownumberer',
			align : 'center'
		},

		{
			text : '物资编码',
			dataIndex : 'MATERIALCODE',
			align : 'center',
			width : 150
		}, {
			text : '物资名称',
			dataIndex : 'MATERIALNAME',
			align : 'center',
			width : 140
		}, {
			text : '规格型号',
			dataIndex : 'ETALON',
			align : 'center',
			width : 100
		}, {
			text : '计量单位',
			dataIndex : 'UNIT',
			align : 'center',
			flex : 1
		}, {
			text : '当前单价',
			dataIndex : 'F_PRICE',
			align : 'center',
			flex : 1
		},
		{
			text : '库存数量',
			dataIndex : 'KY_AMOUNT',
			align : 'center',
			width : 100
		},
		{
			text : '选择',
			align : 'center',
			width : 60,
			renderer : LookMorexzdj
		},
		{
			text : '库存位置',
			dataIndex : 'STORE_DESC',
			align : 'center',
			width : 100
		}

		]
	});
	
var windowkc = Ext.create('Ext.window.Window', {

		id : 'windowkc',
		title : "查询库存",
		width : 700,
		height : 500,
		autoScroll:true,
		plain : true,
		modal : true,
		defaults : {
		},
		items : [listkc, gridkc],

		closeAction : 'hide',
		model : true
	});
	
	
	
	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		items : [ northPanel, grid ]
	});
	
	
	
	Ext.getStore('wzflStore').on('load', function(me) {// 物资分类
		Ext.getCmp('wzfl').store.insert(0, {
			'CODE' : '%',
			'NAME' : '全部'
		});
		Ext.getCmp('wzfl').select(me.first());
	});
	typeStore.on('load', function() {
		Ext.getCmp('matType').select(typeStore.getAt(0));
	});
	 Ext.getCmp('selectkc').on(
			'click',
			function() {
				Ext.getCmp('windowkc').show();
			});
	
    Ext.getCmp('kcQuery').on(
			'click',
			function() {
				gridStorekc.setProxy({
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
						parName : [ 'a_plantcode', 'a_departcode', 'a_itype',
								'a_materialcode', 'a_materialname','a_etalon' ],
						parType : [ 's', 's', 's', 's', 's','s' ],
						parVal : [ Ext.util.Cookies.get("mm.plantcode"),
								Ext.util.Cookies.get("mm.departcode"),
								Ext.getCmp('matType').getValue(), Ext.getCmp('matCode').getValue(), Ext.getCmp('matName').getValue(), Ext.getCmp('etalon').getValue() ],
						proName : 'pg_dj601.getmatkc',
						cursorName : 'ret'
					}
				});
				gridStorekc.load();
			});
			
	plantStore.on('load', function() {
				Ext.getCmp('wbz').select(plantStore.getAt(0));

				responsibleStore.load({
					params : {// 负责人与检修班组联动
						parName : [ 'MENDDEPT_CODE_in' ],
						parType : [ 's' ],
						parVal : [ Ext.getCmp('wbz').getValue() ],
						proName : 'pro_dj601_person',
						cursorName : 'ret'
					}
				});
			});
	Ext.getCmp('wbz').on('change', function() {
				responsibleStore.load({
					params : {// 负责人与检修班组联动
						parName : [ 'MENDDEPT_CODE_in' ],
						parType : [ 's' ],
						parVal : [ Ext.getCmp('wbz').getValue() ],
						proName : 'pro_dj601_person',
						cursorName : 'ret'
					}
				});
			});
	responsibleStore.on('load', function() {
				Ext.getCmp('responsible').select(responsibleStore.getAt(0));
			});
});
function onSearch() {// 查询
	Ext.getStore('gridStore').proxy.extraParams.parVal = [
			Ext.Date.format(Ext.getCmp('qsrq').getValue(), 'Y-m-d'),
			Ext.Date.format(Ext.getCmp('jsrq').getValue(), 'Y-m-d'),
			Ext.getCmp('wzfl').getValue(), Ext.getCmp('wlmc').getValue(), ];
	Ext.getStore('gridStore').load();
}

function OnDel(value, metadate, record) {
	return '<a href="javascript:OnDelete(\'' + record.data.APPLYID
			+ '\')">删除</a>'
}

function OnDelete(globalProCode) {
	Ext.Ajax.request({

		url : APP + '/ModelChange',
		method : 'POST',
		async : false,
		params : {
			parName : [ 'a_applyid', 'a_userid', 'a_username' ],
			parType : [ 's', 's', 's' ],
			parVal : [ globalProCode, Ext.util.Cookies.get("mm.userid"),
					Ext.util.Cookies.get("mm.username"), ],
			proName : 'pg_dj1007.deleteapplymat',
			returnStr : [ 'ret_msg', 'ret' ],
			returnStrType : [ 's', 's' ]
		},
		success : function(response) {

			var resp = Ext.decode(response.responseText);

			if (resp[1]== "Success") {
				Ext.example.msg("提示", '执行成功');

				onSearch();

			} else {
				Ext.example.msg("提示", '执行失败');
			}
		}
	})
}
function OnAdd() {
	Ext.getCmp('window').show();
	kc_id ='';
}
function OnSave() {
	if(kc_id!=''){
	Ext.Ajax.request({
		url : APP + '/ModelChange',
		method : 'POST',
		async : false,
		params : {
			parName : [ 'a_code',
                        'a_name',
                        'a_etalon',
                        'a_unit',
                        'a_itype',
                        'a_amount',
                        'a_applydate',
                        'a_remark', 
                        'a_groupname',
						'a_lypersonid',
						'a_lyperson',
                        'a_userid',
                        'a_username',
						'a_kcid'],
			parType : [ 's', 's', 's','s', 's', 'do','da', 's','s','s','s', 's', 's','s' ],
			parVal : [ '', 
			           Ext.getCmp('wmc').getValue(),
			           Ext.getCmp('wgg').getValue(),
			           Ext.getCmp('wdw').getValue(),
			           Ext.getCmp('matType').getValue(),
			           Ext.getCmp('wsl').getValue(),
			           Ext.Date.format(Ext.getCmp('wdqrq').getValue(), 'Y-m-d'),
			           Ext.getCmp('wbeiz').getValue(),
			           Ext.getCmp('wbz').getRawValue(),
					   Ext.getCmp('responsible').getValue(),
					   Ext.getCmp('responsible').getRawValue(),
			           Ext.util.Cookies.get("mm.userid"),
					Ext.util.Cookies.get("mm.username"),kc_id ],
			proName : 'pg_dj1007.saveapplymat',
			returnStr : [ 'ret_msg', 'ret' ],
			returnStrType : [ 's', 's' ]
		},
		success : function(response) {

			var resp = Ext.decode(response.responseText);
            kc_id = '';
			Ext.getCmp('wmc').setValue('');
			Ext.getCmp('wgg').setValue('');
			Ext.getCmp('wdw').setValue('');
			Ext.getCmp('wsl').setValue('0');
			Ext.getCmp('wbeiz').getValue('');
			if (resp[1] == "Success") {
                Ext.example.msg("提示", '执行成功');
				Ext.getCmp('window').hide();
				onSearch();
			} else {
				Ext.example.msg("提示", '执行失败'+resp[0]);
			}
		}
	});
	}
	else
	{
		Ext.example.msg("提示", '请在库存中选择要申领的物资，不可手工添加');
	}
	
}


function onExcel() {
	var tableName = ["序号", "日期", "材料备件名称", "规格", "单位", "数量", "班组", "备注"];
	var tableKey = ['APPLY_DATE', 'MATERIALNAME','ETALON','UNIT', 'AMOUNT', 'GROUPNAME','REMARK'];
	var parName = ['a_begindate', 'a_enddate', 'a_itype', 'a_name'];
	var parType = [ 'da','da','s','s'];
	var parVal = [Ext.Date.format(Ext.getCmp('qsrq').getValue(), 'Y-m-d'),
			Ext.Date.format(Ext.getCmp('jsrq').getValue(), 'Y-m-d'),
			Ext.getCmp('wzfl').getValue(),
			IsNull(Ext.getCmp('wlmc').getValue())];
	var proName = 'pg_dj1007.getapplymat';
	var ExcelName = 'Excel';
	var cursorName = 'ret';
	var returnStr = [ 'null' ];
	var returnStrName = [ 'null' ];
	var returnStrType = [ 'null' ];
	submitData(APP + "/ModelExcelTotal", tableName, tableKey, parName, parType,
			parVal, proName, returnStr, returnStrType, returnStrName,
			cursorName, "tital",ExcelName);
}

function IsNull(value) {
	if (value == "" || value == null) {
		return 'null';
	} else {
		return value;
	}
}

function OnBtnPrint(){

	window.showModalDialog(APP + "/page/DJ/DJ100701.jsp?begindate="
			+
			Ext.Date.format(Ext.getCmp('qsrq').getValue(), 'Y-m-d').toString()
			+
			'&enddate='+Ext.Date.format(Ext.getCmp('jsrq').getValue(), 'Y-m-d').toString()
			+
			'&itype='
			+
			Ext.getCmp('wzfl').getValue().replace('%','@')
			+
			'&name='
			+
			Ext.getCmp('wlmc').getValue() ,
			
			"dialogHeight:470px;dialogWidth:800px;minimize:yes;maximize:yes;");
}

function LookMorexzdj(value, metaData, record, rowIdx, colIdx, store, view) {//
	return '<a  href="javascript:OpenDj(' + rowIdx + ')" >选择</a>';

}
function OpenDj(rowIdx) {
	kc_id = Ext.getStore('gridStorekc').data.items[rowIdx].data.KCID;
	Ext.getCmp('wmc').setValue(Ext.getStore('gridStorekc').data.items[rowIdx].data.MATERIALCODE);
    Ext.getCmp('wgg').setValue(Ext.getStore('gridStorekc').data.items[rowIdx].data.MATERIALNAME);
	Ext.getCmp('wdw').setValue(Ext.getStore('gridStorekc').data.items[rowIdx].data.UNIT);
	Ext.getCmp('wsl').setValue(Ext.getStore('gridStorekc').data.items[rowIdx].data.KY_AMOUNT);
	Ext.getCmp('windowkc').hide();
}