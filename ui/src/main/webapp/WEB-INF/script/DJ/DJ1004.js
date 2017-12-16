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
		pageSize : 100,
		storeId : 'gridStore',
		fields : [ 'MATERIALCODE', 'KCID', 'MATERIALNAME', 'ETALON', 'UNIT',
				'F_PRICE', 'AMOUNT', 'F_MONEY', 'STORE_DESC', 'I_TYPE',
				'INSERTDATE','KY_AMOUNT', 'F_KYMONEY' ],
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
						'a_departcode', 'a_itype', 'a_storedesc',
						'a_materialcode', 'a_materialname', 'a_etalon',
						'a_lcodesc', 'a_userid' ],
				parType : [ 'da', 'da', 's', 's', 's', 's', 's', 's', 's', 's',
						's' ],
				proName : 'pg_dj1004.getinputlist',
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
				xtype : 'textfield',
				id : 'kfms',
				fieldLabel : '库房描述',
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
			}, {
				xtype : 'textfield',
				id : 'gg',
				fieldLabel : '规格',
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
				xtype : 'textfield',
				id : 'cfwz',
				fieldLabel : '存放位置',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				labelAlign : 'right'
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
		},{
							text : '入库数量',
							align : 'center',
							dataIndex : 'AMOUNT',
							width : 100,
							renderer : function(value, metadata) {
								metadata.style = "text-align:right";
								return Ext.util.Format.number(value, '0,000.000');//把数字value转换成‘o,ooo.oo’格式
							}
						},{
							text : '金额',
							align : 'center',
							dataIndex : 'F_MONEY',
							width : 100,
							renderer : function(value, metadata) {
								metadata.style = "text-align:right";
								return Ext.util.Format.number(value, '0,000.000');//把数字value转换成‘o,ooo.oo’格式
							}
						},{
							text : '剩余数量',
							align : 'center',
							dataIndex : 'KY_AMOUNT',
							width : 100,
							renderer : function(value, metadata) {
								metadata.style = "text-align:right";
								return Ext.util.Format.number(value, '0,000.000');//把数字value转换成‘o,ooo.oo’格式
							}
						},{
							text : '剩余金额',
							align : 'center',
							dataIndex : 'F_KYMONEY',
							width : 100,
							renderer : function(value, metadata) {
								metadata.style = "text-align:right";
								return Ext.util.Format.number(value, '0,000.000');//把数字value转换成‘o,ooo.oo’格式
							}
						}, {
			text : '物资分类',
			align : 'center',
			dataIndex : 'I_TYPE',
			width : 100
		}, {
			text : '库房描述',
			align : 'center',
			dataIndex : 'STORE_DESC',
			width : 100
		}, {
			text : '录入时间',
			align : 'center',
			dataIndex : 'INSERTDATE',
			width : 150
		},{
							text : '消耗明细',
							align : 'center',
							dataIndex : 'KCID',
							width : 100,
							renderer : LookMore
						} ]
	});
	var panelbottom = Ext.create('Ext.panel.Panel', {
		frame : true,
		region : 'south',
		width : '100%',
		baseCls : 'my-panel-noborder',
		layout : 'column',
		bbar : [ '->', {
			xtype : 'pagingtoolbar',
			dock : 'bottom',
			displayInfo : true,
			displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
			emptyMsg : '没有记录',
			store : gridStore
		} ]
	});

	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		items : [ northPanel, grid, panelbottom ]
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
			Ext.util.Cookies.get("mm.plantcode"), Ext.getCmp('bm').getValue(),
			Ext.getCmp('wzfl').getValue(), Ext.getCmp('kfms').getValue(),
			Ext.getCmp('wzbh').getValue(), Ext.getCmp('wzmc').getValue(),
			Ext.getCmp('gg').getValue(), Ext.getCmp('cfwz').getValue(),
			Ext.util.Cookies.get('mm.userid') ];
	Ext.getStore('gridStore').load();
}
function onExcel() {
	var tableName = [ "序号", "物资编号", "物资名称", "规格", "单位", "单价", "入库数量", "金额","剩余数量","剩余金额",
			"物资分类", "库房描述", "录入时间" ];
	var tableKey = [ 'MATERIALCODE', 'MATERIALNAME', 'ETALON', 'UNIT',
			'F_PRICE', 'AMOUNT', 'F_MONEY','KY_AMOUNT', 'F_KYMONEY', 'I_TYPE', 'STORE_DESC','INSERTDATE' ];
	parName = [ 'a_begindate', 'a_enddate', 'a_plantcode', 'a_departcode',
			'a_itype', 'a_store_desc', 'a_materialcode', 'a_materialname',
			'a_etalon', 'a_loc_desc', 'a_userid' ];
	var parType = [ 'da', 'da', 's', 's', 's', 's', 's', 's', 's', 's', 's' ];
	var parVal = [
			IsNull(Ext.Date.format(Ext.getCmp('qsrq').getValue(), 'Y-m-d')),
			IsNull(Ext.Date.format(Ext.getCmp('jsrq').getValue(), 'Y-m-d')),
			IsNull(Ext.util.Cookies.get("mm.plantcode")),
			IsNull(Ext.getCmp('bm').getValue()),
			IsNull(Ext.getCmp('wzfl').getValue()),
			IsNull(Ext.getCmp('kfms').getValue()),
			IsNull(Ext.getCmp('wzbh').getValue()),
			IsNull(Ext.getCmp('wzmc').getValue()),
			IsNull(Ext.getCmp('gg').getValue()),
			IsNull(Ext.getCmp('cfwz').getValue()),
			IsNull(Ext.util.Cookies.get('mm.userid')) ];
	var proName = 'pg_dj1004.getinputlist';
	var ExcelName = 'Excel';
	var cursorName = 'ret';
	var returnStr = [ 'null' ];
	var returnStrName = [ 'null' ];
	var returnStrType = [ 'null' ];
	submitData(APP + "/ModelExcelTotal", tableName, tableKey, parName, parType,
			parVal, proName, returnStr, returnStrType, returnStrName,
			cursorName, "tital", "物资入库台账");
}
function IsNull(value) {
	if (value == "" || value == null) {
		return 'null';
	} else {
		return value;
	}
}
function LookMore(value, metaData, record, rowIdx, colIdx, store, view) {
	return '<a  href="javascript:Openbh(\'' + record.data.KCID + '\')">查看</a>';
}
function Openbh(KCID) {
	var dialog = window.open(AppUrl + "/DJ/DJ1002detail.jsp?KCID="
			+ KCID);
}