Ext.onReady(function() {
	
	var wzflStore = Ext.create('Ext.data.Store', {// 物资分类
		autoLoad : false,
		storeId : 'wzflStore',
		fields : ['CODE','NAME'],
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
		autoLoad : false,
		storeId : 'bmStore',
		fields : ['DEPARTCODE','DEPARTNAME','SAP_DEPARTCODE'],
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
				parName : ['A_PLANTCODE'],
				parType : ['s'],
				parVal : [Ext.util.Cookies.get("mm.plantcode")],
				proName : 'pro_mm_depart',
				cursorName : 'RET'
			}
		}
	});
	var gridStore = Ext.create('Ext.data.Store', {
		autoLoad :false,
		pageSize : 100,
		storeId : 'gridStore',
		fields : ['MATERIALCODE','MATERIALNAME','ETALON','UNIT','F_PRICE','PLAN_AMOUNT','F_MONEY','ACT_AMOUNT','F_ACT_MONEY','ORDERID','INSERTDATE','STORE_DESC','I_TYPE','DJ_VOL','MEND_CONTEXT'
		],
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
				parName : ['a_begindate','a_enddate','a_orderid','a_plantcode','a_departcode','a_itype','a_storedesc','a_materialcode','a_materialname','a_etalon','a_lcodesc'],
				parType : ['da','da','s','s','s','s','s','s','s','s','s'],
				proName : 'pg_dj1003.getconsume',
				cursorName : 'ret'
			}
		},
		listeners:{
			beforeload:beforeload_gridStore
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
			layout : 'hbox',
			items : [{
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
			},{
				xtype : 'textfield',
				id : 'jxdh',
				fieldLabel : '检修单号',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				labelAlign : 'right'
			},{
				xtype : 'textfield',
				id : 'gg',
				fieldLabel : '规格',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				labelAlign : 'right'
			}]
		},{
			xtype : 'panel',
			frame : true,
			layout : 'hbox',
			width : "100%",
			items : [{
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
			},{
				xtype : 'textfield',
				id : 'kfms',
				fieldLabel : '库房描述',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				labelAlign : 'right'
			},{
				xtype : 'textfield',
				id : 'cfwz',
				fieldLabel : '存放位置',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				labelAlign : 'right'
			}]
		}, {
			xtype : 'panel',
			frame : true,
			layout : 'hbox',
			width : "100%",
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
			},{
				xtype : 'button',
				text : '查询',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				icon: imgpath +'/a1.gif',
				handler : onSearch
			}, {
				xtype : 'button',
				text : '导出Excel',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				handler :  onExcel,
				icon : imgpath + '/311.gif'
			}]
		}]
	});
	var grid = Ext.create('Ext.grid.Panel',{
		region : 'center',
		id : 'grid',
		columnLines : true,
		width : '100%',
		autoScroll : true,
		store : gridStore,
		columns : [{
					text : '序号',
					dataIndex : 'NUMBER',
					xtype : 'rownumberer',
					width : 40,
					align : 'center'
				},{
					text : '检修单号',
					dataIndex : 'ORDERID',
					align : 'center',
					width : 100,
					renderer:LookMore
				},
				{
					text : '物资编号',
					align : 'center',
					dataIndex : 'MATERIALCODE',
					width : 100,
					renderer:function(value,meta){meta.style='text-align:left;';return value;}
				},
				{
					text : '物资名称',
					align : 'center',
					dataIndex : 'MATERIALNAME',
					width : 120,
					renderer:function(value,meta){meta.style='text-align:left;';return value;}
				},
				{
					text : '规格',
					align : 'center',
					dataIndex : 'ETALON',
					width : 100,
					renderer:function(value,meta){meta.style='text-align:left;';return value;}
				},
				{
					text : '单位',
					align : 'center',
					dataIndex : 'UNIT',
					width : 60,
					renderer:function(value,meta){meta.style='text-align:left;';return value;}
				},{
					text : '单价',
					align : 'center',
					dataIndex : 'F_PRICE',
					width : 80,
					renderer:function(value,meta){meta.style='text-align:right;';return value;}
				},{
					text : '消耗数量',
					align : 'center',
					dataIndex : 'ACT_AMOUNT',
					width : 80,
					renderer:function(value,meta){meta.style='text-align:right;';return value;},
					summaryType : 'sum',// 求和
					summaryRenderer : function(value, metadata) {metadata.style = "text-align:right";return value;}
				},{
					text : '金额',
					align : 'center',
					dataIndex : 'F_ACT_MONEY',
					width : 80,
					renderer:function(value,meta){meta.style='text-align:right;';return Ext.util.Format.usMoney(value);},
					summaryType : 'sum',// 求和
					summaryRenderer : function(value, metadata) {metadata.style = "text-align:right";return Ext.util.Format.usMoney(value);}
				},{
					text : '物资分类',
					align : 'center',
					dataIndex : 'I_TYPE',
					width : 70,
					renderer:function(value,meta){meta.style='text-align:left;';return value;}
				},{
					text : '库房描述',
					align : 'center',
					dataIndex : 'STORE_DESC',
					width : 100,
					renderer:function(value,meta){meta.style='text-align:left;';return value;}
				},{
					text : '电机容量',
					align : 'center',
					dataIndex : 'DJ_VOL',
					width : 80,
					renderer:function(value,meta){meta.style='text-align:left;';return value;}
				},{
					text : '检修内容',
					align : 'center',
					dataIndex : 'MEND_CONTEXT',
					width : 200,
					renderer:function(value,meta){meta.style='text-align:left;';return value;}
				}]
	});
	var panelbottom = Ext.create('Ext.panel.Panel', {
		frame: true, 
		region: 'south',
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
		}]
	});
	
	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		items : [ northPanel, grid,panelbottom ]
	});
	Ext.getStore('wzflStore').on('load', function(me) {// 物资分类
		Ext.getCmp('wzfl').store.insert(0, {
			'CODE' : '%',
			'NAME' : '全部'
		});
		Ext.getCmp('wzfl').select(me.first());
		onSearch();
	});
	
	if(Ext.util.Cookies.get('mm.departtype') == "厂矿机关"){// 部门
		bmStore.on('load', function(me) {
			me.insert(0, {'DEPARTCODE' : '%','DEPARTNAME' : '全部'});
			Ext.getCmp("bm").select(me.first());
			   Ext.getStore('wzflStore').load();
		});
		Ext.data.StoreManager.lookup('bmStore').load();
		}else  {
			bmStore.insert(0, {
				'DEPARTCODE' : Ext.util.Cookies.get('mm.departcode'),
				'DEPARTNAME' : Ext.util.Cookies.get('mm.departname')
			});
			Ext.getCmp('bm').select(Ext.util.Cookies.get('mm.departcode'));
			Ext.getStore('wzflStore').load();
		} 

});
function beforeload_gridStore(s){
	s.proxy.extraParams.parVal = [ 
			Ext.Date.format(Ext.getCmp('qsrq').getValue(), 'Y-m-d'),
			Ext.Date.format(Ext.getCmp('jsrq').getValue(), 'Y-m-d'),
			IsNull1(Ext.getCmp('jxdh').getValue()),
			Ext.util.Cookies.get("mm.plantcode"),
		    IsAll(Ext.getCmp("bm").getValue()),
		    IsAll(Ext.getCmp('wzfl').getValue()),
			IsNull1(Ext.getCmp('kfms').getValue()),
			IsNull1(Ext.getCmp('wzbh').getValue()),
			IsNull1(Ext.getCmp('wzmc').getValue()),
			IsNull1(Ext.getCmp('gg').getValue()),
			IsNull1(Ext.getCmp('cfwz').getValue())];
}
function onSearch() {// 查询
	Ext.data.StoreManager.lookup('gridStore').load();
}
function onExcel() {
	var tableName = ["序号","检修单号","物资编号","物资名称","规格","单位","单价","消费数量","金额","物资分类","库房描述","电机容量","检修内容"];
	var tableKey = ['ORDERID','MATERIALCODE','MATERIALNAME','ETALON','UNIT','F_PRICE','ACT_AMOUNT','F_ACT_MONEY','I_TYPE','STORE_DESC','DJ_VOL','MEND_CONTEXT'];
	parName = ['a_begindate','a_enddate','a_orderid','a_plantcode','a_departcode',
	           'a_itype','a_store_desc','a_materialcode','a_materialname',
	           'a_etalon','a_loc_desc'];
	var parType = ['da','da','s','s','s','s','s','s','s','s','s' ];
	var parVal = [ 
			IsNull(Ext.Date.format(Ext.getCmp('qsrq').getValue(), 'Y-m-d')),
			IsNull(Ext.Date.format(Ext.getCmp('jsrq').getValue(), 'Y-m-d')),
			IsNull(Ext.getCmp('jxdh').getValue()),
			IsNull(Ext.util.Cookies.get("mm.plantcode")),
			IsAll(Ext.getCmp("bm").getValue()),
			IsAll(Ext.getCmp('wzfl').getValue()),
			IsNull1(Ext.getCmp('kfms').getValue()),
			IsNull1(Ext.getCmp('wzbh').getValue()),
			IsNull1(Ext.getCmp('wzmc').getValue()),
			IsNull1(Ext.getCmp('gg').getValue()),
			IsNull1(Ext.getCmp('cfwz').getValue())];
	var proName = 'pg_dj1003.getconsume';
	var ExcelName = 'Excel';
	var cursorName = 'ret';
	var returnStr = [ 'null' ];
	var returnStrName = [ 'null' ];
	var returnStrType = [ 'null' ];
	submitData(APP + "/ModelExcelTotal", tableName, tableKey, parName, parType,
			parVal, proName, returnStr, returnStrType, returnStrName,
			cursorName, "tital", "消耗物资统计");
}
function IsNull(value) {
	if (value == "" || value == null) {
		return 'null';
	} else {
		return value;
	}
}
function IsNull1(value) {
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
function LookMore(value, metaData, record, rowIdx, colIdx, store, view) {
	metaData.style='text-align:left;';
	return '<a  href="javascript:Openbh(\'' + record.data.ORDERID + '\')">'+ value + '</a>';
}
function Openbh(ORDERID) {
	window.open(AppUrl + "/DJ/DJ1003detail.jsp?ORDERID="+ ORDERID);
}
