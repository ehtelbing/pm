Ext.onReady(function() {

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
				cursorName : 'I_TYPE'
			}
		}
	});
	var bmStore = Ext.create('Ext.data.Store', {// 部门
		autoLoad : true,
		storeId : 'bmStore',
		fields : [ 'DEPARTCODE', 'DEPARTNAME', 'SAP_DEPARTCODE' ],
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
				parName : [ 'A_PLANTCODE' ],
				parType : [ 's' ],
				parVal : [ Ext.util.Cookies.get("mm.plantcode") ],
				proName : 'pro_mm_depart',
				cursorName : 'RET'
			}
		}
	});
	var gridStore = Ext.create('Ext.data.Store', {
		autoLoad : false,
		storeId : 'gridStore',
		fields : [ 'MATERIALCODE', 'MATERIALNAME', 'ETALON', 'UNIT', 'F_PRICE',
				{
					name : 'QC_AMOUNT',
					type : 'float'
				}, {
					name : 'QC_MONEY',
					type : 'float'
				}, {
					name : 'IN_AMOUNT',
					type : 'float'
				}, {
					name : 'IN_MONEY',
					type : 'float'
				}, {
					name : 'OUT_AMOUNT',
					type : 'float'
				}, {
					name : 'OUT_MONEY',
					type : 'float'
				}, {
					name : 'QM_AMOUNT',
					type : 'float'
				}, {
					name : 'QM_MONEY',
					type : 'float'
				} ],
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
				parName : [ 'a_begindate', 'a_enddate', 'a_plantcode',
						'a_departcode', 'a_itype', 'a_materialcode',
						'a_materialname' ],
				parType : [ 'da', 'da', 's', 's', 's', 's', 's' ],
				proName : 'pg_dj1005.getsfc',
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
				id : 'bm',
				fieldLabel : '部门',
				labelAlign : 'right',
				editable : false,
				style : 'margin:5px 0px 5px 5px',
				labelWidth : 70,
				queryMode : 'local',
				store : bmStore,
				valueField : 'DEPARTCODE',
				displayField : 'DEPARTNAME'
			} ]
		}, {
			xtype : 'panel',
			frame : true,
			layout : 'hbox',
			width : "100%",
			baseCls : 'my-panel-noborder',
			items : [ {
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
			}, {
				xtype : 'textfield',
				id : 'wzbh',
				fieldLabel : '物资编号',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				labelAlign : 'right'
			}, {
				xtype : 'textfield',
				id : 'wzmc',
				fieldLabel : '物资名称',
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
				style : 'margin:5px 0px 5px 50px',
				icon : imgpath + '/a1.gif',
				handler : onSearch
			}, {
				xtype : 'button',
				text : '导出Excel',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				handler : onExcel,
				icon : imgpath + '/311.gif'
			} ]
		} ]
	});
	var grid = Ext.create('Ext.grid.Panel', {
		region : 'center',
		id : 'grid',
		columnLines : true,
		style : 'margin: 5px 0px 0px 0px',
		width : '100%',
		features : [ {
			ftype : 'summary'
		} ],
		autoScroll : true,
		store : gridStore,
		columns : [ {
			text : '序号',
			align : 'center',
		    dataIndex : 'NUMBER',
			xtype : 'rownumberer',
			width : 50
		},{
			text : '物资编号',
			align : 'center',
			dataIndex : 'MATERIALCODE',
			width : 100
		}, {
			text : '物资名称',
			align : 'center',
			dataIndex : 'MATERIALNAME',
			width : 100
		}, {
			text : '规格',
			align : 'center',
			dataIndex : 'ETALON',
			width : 100
		}, {
			text : '单位',
			align : 'center',
			dataIndex : 'UNIT',
			width : 100
		}, {
			text : '单价',
			align : 'center',
			dataIndex : 'F_PRICE',
			width : 100
		}, {
			text : '期初数量',
			align : 'center',
			dataIndex : 'QC_AMOUNT',
			width : 100,
			summaryType : 'sum',// 求和
			summaryRenderer : function(value, metadata) {
				metadata.style = "text-align:right";
				return Ext.util.Format.number(value, '0,000.00');// 把数字value转换成‘o,ooo.oo’格式
			}
		}, {
			text : '期初金额',
			align : 'center',
			dataIndex : 'QC_MONEY',
			width : 100,
			summaryType : 'sum',// 求和
			summaryRenderer : function(value, metadata) {
				metadata.style = "text-align:right";
				return Ext.util.Format.number(value, '0,000.00');// 把数字value转换成‘o,ooo.oo’格式
			}
		}, {
			text : '收入数量',
			align : 'center',
			dataIndex : 'IN_AMOUNT',
			width : 100,
			summaryType : 'sum',// 求和
			summaryRenderer : function(value, metadata) {
				metadata.style = "text-align:right";
				return Ext.util.Format.number(value, '0,000.00');// 把数字value转换成‘o,ooo.oo’格式
			}
		}, {
			text : '收入金额',
			align : 'center',
			dataIndex : 'IN_MONEY',
			width : 100,
			summaryType : 'sum',// 求和
			summaryRenderer : function(value, metadata) {
				metadata.style = "text-align:right";
				return Ext.util.Format.number(value, '0,000.00');// 把数字value转换成‘o,ooo.oo’格式
			}
		}, {
			text : '支出数量',
			align : 'center',
			dataIndex : 'OUT_AMOUNT',
			width : 100,
			summaryType : 'sum',// 求和
			summaryRenderer : function(value, metadata) {
				metadata.style = "text-align:right";
				return Ext.util.Format.number(value, '0,000.00');// 把数字value转换成‘o,ooo.oo’格式
			}
		}, {
			text : '支出金额',
			align : 'center',
			dataIndex : 'OUT_MONEY',
			width : 100,
			summaryType : 'sum',// 求和
			summaryRenderer : function(value, metadata) {
				metadata.style = "text-align:right";
				return Ext.util.Format.number(value, '0,000.00');// 把数字value转换成‘o,ooo.oo’格式
			}
		}, {
			text : '期末数量',
			align : 'center',
			dataIndex : 'QM_AMOUNT',
			width : 100,
			summaryType : 'sum',// 求和
			summaryRenderer : function(value, metadata) {
				metadata.style = "text-align:right";
				return Ext.util.Format.number(value, '0,000.00');// 把数字value转换成‘o,ooo.oo’格式
			}
		}, {
			text : '期末金额',
			align : 'center',
			dataIndex : 'QM_MONEY',
			width : 100,
			summaryType : 'sum',// 求和
			summaryRenderer : function(value, metadata) {
				metadata.style = "text-align:right";
				return Ext.util.Format.number(value, '0,000.00');// 把数字value转换成‘o,ooo.oo’格式
			}
		} ]
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

	bmStore.on('load', function(me) {
		me.insert(0, {
			'DEPARTCODE' : '%',
			'DEPARTNAME' : '全部'
		});
		Ext.getCmp('bm').select(Ext.util.Cookies.get('mm.departcode'));
	});
});
function pagelode() {
	Ext.getStore("gridStore").load();
}
function onSearch() {// 查询
	Ext.getStore('gridStore').proxy.extraParams.parVal = [
			Ext.Date.format(Ext.getCmp('qsrq').getValue(), 'Y-m-d'),
			Ext.Date.format(Ext.getCmp('jsrq').getValue(), 'Y-m-d'),
			Ext.util.Cookies.get("mm.plantcode"), IsAll(Ext.getCmp('bm').getValue()),
			IsAll(Ext.getCmp('wzfl').getValue()), IsNull(Ext.getCmp('wzbh').getValue()),
			IsNull(Ext.getCmp('wzmc').getValue()) ];
	Ext.getStore('gridStore').load();
}
function onExcel() {
	var tableName = [ "序号", "物资编号", "物资名称", "规格", "单位", "单价", "期初数量", "期初金额",
			"收入数量", "收入金额", "支出数量", "支出金额", "期末数量", "期末金额" ];
	var tableKey = [ 'MATERIALCODE', 'MATERIALNAME', 'ETALON', 'UNIT',
			'F_PRICE', 'QC_AMOUNT', 'QC_MONEY', 'IN_AMOUNT', 'IN_MONEY',
			'OUT_AMOUNT', 'OUT_MONEY', 'QM_AMOUNT', 'QM_MONEY' ];
	parName = [ 'a_begindate', 'a_enddate', 'a_plantcode', 'a_departcode',
			'a_itype', 'a_materialcode', 'a_materialname' ];
	var parType = [ 'da', 'da', 's', 's', 's', 's', 's' ];
	var parVal = [
			Ext.Date.format(Ext.getCmp('qsrq').getValue(), 'Y-m-d'),
			Ext.Date.format(Ext.getCmp('jsrq').getValue(), 'Y-m-d'),
			Ext.util.Cookies.get("mm.plantcode"),
			IsAll(Ext.getCmp('bm').getValue()),
			IsAll(Ext.getCmp('wzfl').getValue()),
			IsNull(Ext.getCmp('wzbh').getValue()),
			IsNull(Ext.getCmp('wzmc').getValue()) ];
	var proName = 'pg_dj1005.getsfc';
	var ExcelName = 'Excel';
	var cursorName = 'ret';
	var returnStr = [ 'null' ];
	var returnStrName = [ 'null' ];
	var returnStrType = [ 'null' ];
	submitData(APP + "/ModelExcelTotal", tableName, tableKey, parName, parType,
			parVal, proName, returnStr, returnStrType, returnStrName,
			cursorName, "tital", ExcelName);
}
function IsNull(value) {
	if (value == "" || value == null) {
		return 'N/A';
	} else {
		return value;
	}
}
function IsAll(value) {
	if (value == "%" ) {
		return 'all';
	} else {
		return value;
	}
}