Ext.onReady(function() {
	
	var wzflStore = Ext.create('Ext.data.Store', {// 物资分类
		autoLoad : true,
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
		autoLoad : true,
		storeId : 'bmStore',
		fields : ['MENDDEPT_CODE','MENDDEPT_NAME'],
		proxy : {
			type : 'ajax',
			async : false,
			url : APP + '/ModelSelect',
			reader : {
				type : 'json',
				root : 'list'
			},
			extraParams : {
				parName : ['usercode_in','plantcode_in'],
				parType : ['s','s'],
				parVal : [Ext.util.Cookies.get("mm.userid"),Ext.util.Cookies.get("mm.plantcode")],
				proName : 'pro_dj603_menddept',
				cursorName : 'ret'
			}
		}
	});
	var gridStore = Ext.create('Ext.data.Store', {
		autoLoad :false,
		storeId : 'gridStore',
		fields : ['DJ_V','DJ_VOL','ID','ORDERID','MATERIALCODE','MATERIALNAME','ETALON','UNIT','F_PRICE','PLAN_AMOUNT','F_MONEY','ORDERID','INSERTDATE','STORE_DESC','I_TYPE','REC_AMOUNT','MENDDEPT_NAME','MEND_USERNAME'],
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
				parName : ['a_begindate','a_enddate','a_orderid',
				           'a_plantcode','a_departcode','a_itype',
				           'a_storedesc','a_materialcode','a_materialname',
				           'a_etalon','a_lcodesc'],
				parType : ['da','da','s','s','s','s','s','s','s','s','s'],
				proName : 'pg_dj1006.getconsumeselect',
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
				id : 'cfwz',
				fieldLabel : '存放位置',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				labelAlign : 'right'
			}]
		},{
			xtype : 'panel',
			frame : true,
			layout : 'hbox',
			width : "100%",
			baseCls : 'my-panel-noborder',
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
				valueField : 'MENDDEPT_CODE',
				displayField : 'MENDDEPT_NAME'
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
			}, {
				xtype : 'textfield',
				id : 'wzmc',
				fieldLabel : '物资名称',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				labelAlign : 'right'
			}]
		},{
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
				labelAlign : 'right',
				hidden:true
			},{
				xtype : 'textfield',
				id : 'gg',
				fieldLabel : '规格',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				labelAlign : 'right',
				hidden:true
			},{
				xtype : 'button',
				text : '查询',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				icon: imgpath +'/a1.gif',
				handler : onSearch
			}, {
				xtype : 'button',
				text : '导出到Excel',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				handler :  onConfirm,
				icon : imgpath + '/confirm.gif'
			}]
		}]
	});
	var grid = Ext.create('Ext.grid.Panel',
			{
				region : 'center',
				id : 'grid',
				columnLines : true,
				style : 'margin: 5px 0px 0px 0px',
				width : '100%',
				autoScroll : true,
				store : gridStore,
				columns : [{
							text : '序号',
							dataIndex : 'NUMBER',
							xtype : 'rownumberer',
							width : 60,
							align : 'center'
						},{
							text : '检修单号',
							dataIndex : 'ORDERID',
							align : 'center',
							width : 100
						},{
							text : '电机容量',
							dataIndex : 'DJ_VOL',
							align : 'center',
							width : 100
						},
						{
							text : '物资名称',
							align : 'center',
							dataIndex : 'MATERIALNAME',
							width : 100
						},
						{
							text : '单位',
							align : 'center',
							dataIndex : 'UNIT',
							width : 100
						},{
							text : '消耗数量',
							align : 'center',
							dataIndex : 'PLAN_AMOUNT',
							width : 100,
							renderer:function(value,metadata,record){
								metadata.style="text-align:right";
								return value;
							}
						},{
							text : '回收数量',
							align : 'center',
							dataIndex : 'REC_AMOUNT',
							width : 100,
							renderer:function(value,metadata,record){
								metadata.style="text-align:right";
								return value;
							}
						},{
							text : '检修班组',
							align : 'center',
							dataIndex : 'MENDDEPT_NAME',
							width : 100
						},{
							text : '负责人',
							align : 'center',
							dataIndex : 'MEND_USERNAME',
							width : 100
						},{
							text : '库房描述',
							align : 'center',
							dataIndex : 'STORE_DESC',
							width : 100
						},{
							text : '物资分类',
							align : 'center',
							dataIndex : 'I_TYPE',
							width : 100
						}]
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
	Ext.getStore('bmStore').on('load',function(me){
		Ext.getCmp('bm').select(me.first());
	});
			
});
function onSearch() {// 查询
	Ext.getStore('gridStore').proxy.extraParams.parVal = 
			[ 
			Ext.Date.format(Ext.getCmp('qsrq').getValue(), 'Y-m-d'),
			Ext.Date.format(Ext.getCmp('jsrq').getValue(), 'Y-m-d'),
			Ext.getCmp('jxdh').getValue(),
			Ext.util.Cookies.get("mm.plantcode"),
		    Ext.getCmp('bm').getValue(),
		    Ext.getCmp('wzfl').getValue(),
		    Ext.getCmp('kfms').getValue(),
		    Ext.getCmp('wzbh').getValue(),
		    Ext.getCmp('wzmc').getValue(),
		    Ext.getCmp('gg').getValue(),
		    Ext.getCmp('cfwz').getValue()];	
		Ext.getStore('gridStore').load();
	}


function IsNull(value) {
	if (value == "" || value == null) {
		return 'null';
	} else {
		return value;
	}
}


function editSave(id,amount){
	Ext.Ajax.request({
		url : APP + '/ModelChange',
		type : 'ajax',
		method : 'post',
		async : false,
		params : {
			parName : [ 'id_in', 'a_rec_amount', 'a_userid', 'a_username'],
			parType : [ 's', 'do', 's', 's' ],
			parVal : [ id, amount,
			           Ext.util.Cookies.get("mm.userid"),
					    Ext.util.Cookies.get("mm.username")
					 ],
			proName : 'pg_dj1006.save_recamount',
			returnStr : [ 'ret_msg','ret' ],
			returnStrType : [ 's','s' ]
		},
		success : function(resp) {
			var resp = Ext.JSON.decode(resp.responseText);
			if (resp[1] == "Success") {
				Ext.example.msg('提示', '操作成功！');
			} else {
				Ext.example.msg('提示', resp[0]);
			}
		}
	});
	
}

function onConfirm(){
var tableName = ["序号","检修单号","物资名称","单位","消耗数量","回收数量","检修班组","负责人","物资分类","库房描述"];
	var tableKey = ['ORDERID','MATERIALNAME','UNIT','PLAN_AMOUNT','REC_AMOUNT','MENDDEPT_NAME','MEND_USERNAME','I_TYPE','STORE_DESC'];
	parName = ['a_begindate','a_enddate','a_orderid','a_plantcode','a_departcode',
	           'a_itype','a_storedesc','a_materialcode','a_materialname',
	           'a_etalon','a_locdesc'];
	var parType = [ 'da','da','s','s','s','s','s','s','s','s','s' ];
	var parVal = [ 
			Ext.Date.format(Ext.getCmp('qsrq').getValue(), 'Y-m-d'),
			Ext.Date.format(Ext.getCmp('jsrq').getValue(), 'Y-m-d'),
			IsNull(Ext.getCmp('jxdh').getValue()),
			IsNull(Ext.util.Cookies.get("mm.plantcode")),
		    Ext.getCmp('bm').getValue(),
		    IsNull(Ext.getCmp('wzfl').getValue()),
		    IsNull(Ext.getCmp('kfms').getValue()),
		    IsNull(Ext.getCmp('wzbh').getValue()),
		    IsNull(Ext.getCmp('wzmc').getValue()),
		    IsNull(Ext.getCmp('gg').getValue()),
		    IsNull(Ext.getCmp('cfwz').getValue())];
	var proName = 'pg_dj1006.getconsumeselect';
	var ExcelName = 'Excel';
	var cursorName = 'ret';
	var returnStr = [ 'null' ];
	var returnStrName = [ 'null' ];
	var returnStrType = [ 'null' ];
	submitData(APP + "/ModelExcelTotal", tableName, tableKey, parName, parType,
			parVal, proName, returnStr, returnStrType, returnStrName,
			cursorName, "tital", "消耗物资回收统计");
}


