var test = '';
Ext.onReady(function() {
	
	var djlxStore = Ext.create('Ext.data.Store',
			{// 电机类型
				autoLoad : true,
				storeId : 'djlxStore',
				fields : [ 'SERIES_CLASS', 'SERIES_CLASS_DESC',
						'SERIES_CLASS_STATUS' ],
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
						proName : 'pro_dj106_djseries_able',
						cursorName : 'ret'
					}
				}
			});
	var sxdwStore = Ext.create('Ext.data.Store', {// 送修单位
		autoLoad : false,
		storeId : 'sxdwStore',
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
			}
		}
	});

	var jxbmStore = Ext.create('Ext.data.Store', {// 检修部门
		autoLoad : false,
		storeId : 'jxbmStore',
		fields : [ 'MENDDEPT_CODE', 'MENDDEPT_NAME', 'MENDDATE_TYPE', 'USERID',
				'USERNAME' ],
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
	var jxbzStore = Ext.create('Ext.data.Store', {// 检修班组
		autoLoad : false,
		storeId : 'jxbzStore',
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
			}
		}
	});
	var gridStore = Ext.create('Ext.data.Store', {
		autoLoad : false,
		pageSize : 100,
		storeId : 'gridStore',
		fields : [ 'ORDERID', 'APPLY_PLANTNAME', 'DJ_VOL', 'DJ_V',
					'DJ_EQUPOSITION', 'MEND_CONTEXT', 'PLAN_BEGINDATE',
					'EXA_DATE', 'MENDDEPT_NAME', 'REMARK','MEND_USERNAME','OUT_DATE','EXA_TIME','OUT_TIME','MEND_TYPE' ],
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
				parName : ['a_datetype', 
                           'a_begindate',
                           'a_enddate',
                           'a_dj_series_class',
                           'a_orderid', 
                           'a_sendplant', 
                           'a_plant',
                           'a_dept',
                           'a_group'
                           ],
				parType : ['s', 'da', 'da', 's', 's', 's', 's', 's', 's' ],
				proName : 'pg_dj604.getdjmendtable',
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
			//baseCls : 'my-panel-noborder',
			layout : 'hbox',
			items : [ {
				xtype : 'radio',
				style : ' margin: 5px 5px 0px 22px',
				id : 'test1',
				name : '1'
			}, {
				xtype : 'displayfield',
				value : '入厂时间',
				style : ' margin: 5px 5px 0px 0px'

			}, {
				xtype : 'radio',
				style : ' margin: 5px 5px 0px 22px',
				id : 'test2',
				name : '1'
			}, {
				xtype : 'displayfield',
				value : '出厂时间',
				style : ' margin: 5px 5px 0px 0px'

			}, {
				xtype : 'radio',
				style : ' margin: 5px 5px 0px 22px',
				id : 'test3',
				name : '1'
			}, {
				xtype : 'displayfield',
				value : '合格时间',
				style : ' margin: 5px 5px 0px 0px'

			}, {
				xtype : 'datefield',
				id : 'qsrq',
				fieldLabel : '起始日期',
				style : ' margin: 5px 0px 5px 10px',
				labelAlign : 'right',
				labelWidth : 70,
				value : Ext.Date.getFirstDateOfMonth(new Date()),// 根据现在日期获取这个月的第一天是哪天
				format : 'Y/m/d',
				editable : false
			}, {
				xtype : 'datefield',
				id : 'jsrq',
				fieldLabel : '结束日期',
				style : ' margin: 5px 0px 5px 10px',
				labelAlign : 'right',
				labelWidth : 70,
				queryMode : 'local',
				value : Ext.Date.getLastDateOfMonth(new Date()),
				format : 'Y/m/d',
				editable : false
			}, {
				xtype : 'radio',
				style : ' margin: 5px 5px 0px 22px',
				id : 'test4',
				name : '1'
			}, {
				xtype : 'displayfield',
				value : '在修电机',
				style : ' margin: 5px 5px 0px 0px'

			} ]
		}, {
			xtype : 'panel',
			frame : true,
			layout : 'hbox',
			width : "100%",
			//baseCls : 'my-panel-noborder',
			items : [ {
				xtype : 'combo',
				id : 'djlx',
				fieldLabel : '电机类型',
				labelAlign : 'right',
				editable : false,
				style : 'margin:5px 0px 5px 5px',
				labelWidth : 70,
				queryMode : 'local',
				valueField : 'SERIES_CLASS',
				displayField : 'SERIES_CLASS_DESC',
				store : djlxStore
			}, {
				xtype : 'textfield',
				id : 'zybh',
				fieldLabel : '作业编号',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				labelAlign : 'right'
			}, {
				xtype : 'combo',
				id : 'sxdw',
				fieldLabel : '送修单位',
				labelAlign : 'right',
				editable : false,
				style : 'margin:5px 0px 5px 5px',
				labelWidth : 70,
				queryMode : 'local',
				valueField : 'DEPARTCODE',
				displayField : 'DEPARTNAME',
				store : sxdwStore
			} ]
		}, {
			xtype : 'panel',
			frame : true,
			layout : 'hbox',
			width : "100%",
			//baseCls : 'my-panel-noborder',
			items : [ {
				xtype : 'combo',
				id : 'jxdw',
				fieldLabel : '检修单位',
				labelAlign : 'right',
				editable : false,
				style : 'margin:5px 0px 5px 5px',
				labelWidth : 70,
				queryMode : 'local',
				store : {
					fields : [ "code", "value" ],
					data : [ {
						code : Ext.util.Cookies.get("mm.plantcode"),
						value : Ext.util.Cookies.get("mm.plantname")
					} ]
				},
				valueField : 'code',
				displayField : 'value',
				value : Ext.util.Cookies.get("mm.plantcode")
			}, {
				xtype : 'combo',
				id : 'jxbm',
				fieldLabel : '检修部门',
				labelAlign : 'right',
				editable : false,
				style : 'margin:5px 0px 5px 5px',
				labelWidth : 70,
				queryMode : 'local',
				store : jxbmStore,
				valueField : 'MENDDEPT_CODE',
				displayField : 'MENDDEPT_NAME'
			}, {
				xtype : 'combo',
				id : 'jxbz',
				fieldLabel : '检修班组',
				labelAlign : 'right',
				editable : false,
				style : 'margin:5px 0px 5px 5px',
				labelWidth : 70,
				queryMode : 'local',
				valueField : 'MENDDEPT_CODE',
				displayField : 'MENDDEPT_NAME',
				store : jxbzStore
			} ]
		}, {
			xtype : 'panel',
			frame : true,
			layout : 'hbox',
			width : "100%",
			//baseCls : 'my-panel-noborder',
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
			}, {
				xtype : 'button',
				text : '打印表格',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				handler : OnBtnPrint ,
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
		title: '电机检修台帐',
		titleAlign : 'center',
		columns : [{
			text : '序号',
			dataIndex : 'NUMBER',
			xtype : 'rownumberer',
			width : 40,
			align : 'center'
		}, {
			text : '作业编号',
			align : 'center',
			dataIndex : 'ORDERID',
			width : 100,
			renderer:function(value,meta){meta.style='text-align:left;'; return value;}
		}, {
			text : '申请单位',
			align : 'center',
			dataIndex : 'APPLY_PLANTNAME',
			width : 100,
			renderer:function(value,meta){meta.style='text-align:left;'; return value;}
		}, {
			text : '容量',
			align : 'center',
			dataIndex : 'DJ_VOL',
			width : 60,
			renderer:function(value,meta){meta.style='text-align:left;'; return value;}
		}, {
			text : '电压',
			align : 'center',
			dataIndex : 'DJ_V',
			width : 60,
			renderer:function(value,meta){meta.style='text-align:left;'; return value;}
		},{
			text : '安装位置',
			align : 'center',
			dataIndex : 'DJ_EQUPOSITION',
			width : 100,
			renderer:function(value,meta){meta.style='text-align:left;'; return value;}
		},{
			text : '维修类别',
			align : 'center',
			dataIndex : 'MEND_TYPE',
			width : 80,
			renderer:function(value,meta){meta.style='text-align:left;'; return value;}
		},{
			text : '修制内容',
			align : 'center',
			dataIndex : 'MEND_CONTEXT',
			width : 200,
			renderer:function(value,meta){meta.style='text-align:left;'; return value;}
		}, {
			text : '入厂时间',
			align : 'center',
			dataIndex : 'PLAN_BEGINDATE',
			width : 100,
			renderer:function(value,meta){meta.style='text-align:left;'; return value;}
		}, {
			text : '合格时间',
			align : 'center',
			dataIndex : 'EXA_DATE',
			width : 100,
			renderer:function(value,meta){meta.style='text-align:left;'; return value;}
		}, {
			text : '出厂时间',
			align : 'center',
			dataIndex : 'OUT_DATE',
			width : 100,
			renderer:function(value,meta){meta.style='text-align:left;'; return value;}
		}, {
			text : '检修工期',
			align : 'center',
			dataIndex : 'EXA_TIME',
			width : 60,
			renderer:function(value,meta){meta.style='text-align:right;'; return value;}
		}, {
			text : '在厂时间',
			align : 'center',
			dataIndex : 'OUT_TIME',
			width : 60,
			renderer:function(value,meta){meta.style='text-align:right;'; return value;}
		}, {
			text : '检修班组',
			align : 'center',
			dataIndex : 'MENDDEPT_NAME',
			width : 100,
			renderer:function(value,meta){meta.style='text-align:left;' ;return value;}
		}, {
			text : '负责人',
			align : 'center',
			dataIndex : 'MEND_USERNAME',
			width : 100,
			renderer:function(value,meta){meta.style='text-align:left;'; return value;}
		} , {
			text : '备注',
			align : 'center',
			dataIndex : 'REMARK',
			width : 100,
			renderer:function(value,meta){meta.style='text-align:left;'; return value;}
		}],
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
		items : [ northPanel, grid ]
	});

	Ext.getCmp('test1').setValue(true);

	Ext.data.StoreManager.lookup('sxdwStore').load({
		params : {
			parName : [],
			parType : [],
			parVal : [],
			proName : 'pro_mm_plant ',
			cursorName : 'RET'
		}
	});

	Ext.data.StoreManager.lookup('sxdwStore').on('load', function(me) {// 送修单位
		me.insert(0, {
			'DEPARTCODE' : '%',
			'DEPARTNAME' : '全部'
		});
		Ext.getCmp('sxdw').select(me.first());// 默认显示第一个数据
	});
	Ext.data.StoreManager.lookup('djlxStore').on('load', function(me) {// 电机类型
		me.insert(0, {
			'SERIES_CLASS' : '%',
			'SERIES_CLASS_DESC' : '全部'
		});
		Ext.getCmp('djlx').select(me.first());// 默认显示第一个数据
	});

	Ext.data.StoreManager.lookup('jxbmStore').on('load', function(me) {// 检修部门
		me.insert(0, {
			'MENDDEPT_CODE' : '%',
			'MENDDEPT_NAME' : '全部'
		});
		Ext.getCmp('jxbm').select(me.first());// 默认显示第一个数据
	});
	Ext.data.StoreManager.lookup('jxbzStore').on('load', function(me) {// 检修班组
		me.insert(0, {
			'MENDDEPT_CODE' : '%',
			'MENDDEPT_NAME' : '全部'
		});
		Ext.getCmp('jxbz').select(me.first());// 默认显示第一个数据
	});
	Ext.data.StoreManager.lookup('jxbmStore').load(
	{
		params : {
			parName : [ 'jxplantcode_in', 'usercode_in' ],
			parType : [ 's', 's' ],
			parVal : [ Ext.getCmp('jxdw').getValue(),
					Ext.util.Cookies.get('mm.userid') ],
			proName : 'pro_dj501_menddept_dept',
			cursorName : 'ret'
		}
	});
			
	Ext.getCmp('jxbm').on('change', function() { // 检修班组随检修部门联动
		Ext.data.StoreManager.lookup('jxbzStore').load({
			params : {
				parName : [ 'deptcode_in' ],
				parType : [ 's' ],
				parVal : [ Ext.getCmp('jxbm').getValue() ],
				proName : 'pro_dj601_menddept_group',
				cursorName : 'ret'
			}
		});
	});

});
function pagelode() {
	Ext.getStore("gridStore").load();
}
function beforeload_gridStore(store){
	test
	
	Ext.getCmp('grid').setTitle('电机维修（'+Ext.Date.format(Ext.getCmp('qsrq').getValue(), 'Y年m月d日')+'-'+Ext.Date.format(Ext.getCmp('jsrq').getValue(), 'Y年m月d日')+'）台帐');
	store.proxy.extraParams.parVal = [test, 
		Ext.Date.format(Ext.getCmp('qsrq').getValue(), 'Y-m-d'),
		Ext.Date.format(Ext.getCmp('jsrq').getValue(), 'Y-m-d'),
		Ext.getCmp('djlx').getValue(),
		Ext.getCmp('zybh').getValue(), 
		Ext.getCmp('sxdw').getValue(),
		Ext.getCmp('jxdw').getValue(),
		Ext.getCmp('jxbm').getValue(),
		Ext.getCmp('jxbz').getValue()];
}
function onSearch() {// 查询
	if(Ext.getCmp('test1').checked){
		test = '入厂时间';
	}
	else if(Ext.getCmp('test2').checked){
		test = '出厂时间';
	}
	else if(Ext.getCmp('test3').checked){
		test = '合格时间';
	}
	else{
		test = '在修电机';
	}
	Ext.getStore('gridStore').load();
}
function onExcel() {
	var tableName = [ "序号", "作业编号", "单位", "容量", "电压", "安装部位", "维修类别", "修制内容", "入厂时间","合格时间", "出厂时间", "检修工期", "在厂时间", "检修班组",'负责人',"备注" ];
	var tableKey = ['ORDERID', 'APPLY_PLANTNAME', 'DJ_VOL', 'DJ_V','DJ_EQUPOSITION','MEND_TYPE','MEND_CONTEXT', 'PLAN_BEGINDATE', 'EXA_DATE', 'OUT_DATE','EXA_TIME','OUT_TIME','MENDDEPT_NAME','MEND_USERNAME','REMARK' ];
	parName = [ 'a_datetype', 
                'a_begindate',
                'a_enddate', 
                'a_dj_series_class',
                'a_orderid',  
                'a_sendplant', 
                'a_plant',
                'a_dept', 
                'a_group'   ];
	var parType = [ 's', 'da', 'da', 's', 's', 's', 's', 's', 's' ];
	var parVal = [
			test,
			IsNull(Ext.Date.format(Ext.getCmp('qsrq').getValue(), 'Y-m-d')),
			IsNull(Ext.Date.format(Ext.getCmp('jsrq').getValue(), 'Y-m-d')),
			IsNull(Ext.getCmp('djlx').getValue()),
			IsNull(Ext.getCmp('zybh').getValue()),
			IsNull(Ext.getCmp('sxdw').getValue()),
			IsNull(Ext.getCmp('jxdw').getValue()),
			IsNull(Ext.getCmp('jxbm').getValue()),
			IsNull(Ext.getCmp('jxbz').getValue()),
			 ];
	var proName = 'pg_dj604.getdjmendtable';
	var ExcelName = 'Excel';
	var cursorName = 'ret';
	var returnStr = [ 'null' ];
	var returnStrName = [ 'null' ];
	var returnStrType = [ 'null' ];
	submitData(APP + "/ModelExcelTotal", tableName, tableKey, parName, parType,
			parVal, proName, returnStr, returnStrType, returnStrName,
			cursorName, "tital", Ext.getCmp('grid').title);
}
function IsNull(value) {
	if (value == "" || value == null) {
		return 'null'
	} else {
		return value;
	}
}
function OnBtnPrint() {
	Ext.util.Cookies.set('test',test)
	OnPrint();
}
function OnPrint(){
	
	window.showModalDialog(APP + "/page/DJ/DJ60401.jsp?begindate="
			+
			Ext.Date.format(Ext.getCmp('qsrq').getValue(), 'Y-m-d').toString()
			+
			'&enddate='+Ext.Date.format(Ext.getCmp('jsrq').getValue(), 'Y-m-d').toString()
			+
			'&djlx='
			+
			Ext.getCmp('djlx').getValue().replace('%','@')	
			+
			'&zybh='
			+
			Ext.getCmp('zybh').getValue().replace('%','@')
			+
			'&sxdw='
			+
			Ext.getCmp('sxdw').getValue().replace('%','@')
			+
			'&jxdw='
			+
			Ext.getCmp('jxdw').getValue().replace('%','@')
			+
			'&jxbm='
			+
			Ext.getCmp('jxbm').getValue().replace('%','@')
			+
			'&jxbz='
			+
			Ext.getCmp('jxbz').getValue().replace('%','@')
			,
			"dialogHeight:470px;dialogWidth:800px;minimize:yes;maximize:yes;");	
	
	
	
}