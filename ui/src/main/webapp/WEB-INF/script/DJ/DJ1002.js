var power = '';
if (location.href.split('?')[1] != undefined) {
	power = Ext.urlDecode(location.href.split('?')[1]).power;
}

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
		fields : ['MATERIALCODE','KCID','MATERIALNAME','ETALON',	
		          'UNIT','F_PRICE','AMOUNT','F_MONEY','KY_AMOUNT',	
		          'F_KYMONEY','STORE_DESC',	'I_TYPE','KCID'],
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
				parName : ['a_plantcode','a_departcode','a_itype',
				           'a_store_desc','a_materialcode','a_materialname',
				           'a_etalon','a_loc_desc','a_userid'],
				parType : ['s','s','s','s','s','s','s','s','s'],
				proName : 'pg_dj1002.getkc',
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
		//	baseCls : 'my-panel-noborder',
			layout : 'hbox',
			items : [ {
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
			}, {
				xtype : 'textfield',
				id : 'cfwz',
				fieldLabel : '存放位置',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				labelAlign : 'right'
			} ]
		},{
			xtype : 'panel',
			frame : true,
			layout : 'hbox',
			width : "100%",
		//	baseCls : 'my-panel-noborder',
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
				xtype : 'textfield',
				id : 'gg',
				fieldLabel : '规格',
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
			} ]
		}, {
			xtype : 'panel',
			frame : true,
			layout : 'hbox',
			width : "100%",
			id:'update_panel',
		//	baseCls : 'my-panel-noborder',
			items : [{
				xtype : 'textfield',
				id : 'new_store_desc',
				fieldLabel : '修改库房',
				labelWidth : 70,
				width:300,
				style : 'margin:5px 0px 5px 5px',
				labelAlign : 'right'
			},{
				xtype : 'button',
				text : '确认修改',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				icon: imgpath +'/a1.gif',
				handler : UpdateStore
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
				selType : 'checkboxmodel',
				features : [ {
					ftype : 'summary'
				} ],
				autoScroll : true,
				store : gridStore,
				columns : [{
							text : '序号',
							dataIndex : 'NUMBER',
							xtype : 'rownumberer',
							width : 40,
							align : 'center'
						},{
							text : '物资分类',
							align : 'center',
							dataIndex : 'I_TYPE',
							width : 80,
							renderer : function(value, metadata) {
								metadata.style = "text-align:left";
								return value; 
							}
						},{
							text : '物资编号',
							dataIndex : 'MATERIALCODE',
							align : 'center',
							width : 100,
							renderer : function(value, metadata) {
								metadata.style = "text-align:left";
								return value; 
							}
						},
						{
							text : '物资名称',
							align : 'center',
							dataIndex : 'MATERIALNAME',
							width : 150,
							renderer : function(value, metadata) {
								metadata.style = "text-align:left";
								return value; 
							}
						},
						{
							text : '规格',
							align : 'center',
							dataIndex : 'ETALON',
							width : 150,
							renderer : function(value, metadata) {
								metadata.style = "text-align:left";
								return value;
							}
						},
						{
							text : '单位',
							align : 'center',
							dataIndex : 'UNIT',
							width : 60,
							renderer : function(value, metadata) {
								metadata.style = "text-align:left";
								return value;
							}
						},{
							text : '单价',
							align : 'center',
							dataIndex : 'F_PRICE',
							width : 80,
							renderer : function(value, metadata) {
								metadata.style = "text-align:right";
								return Ext.util.Format.usMoney(value);
							}
						},{
							text : '入库数量',
							align : 'center',
							dataIndex : 'AMOUNT',
							width : 80,
							renderer : function(value, metadata) {
								metadata.style = "text-align:right";
								return value; 
							}
						},{
							text : '金额',
							align : 'center',
							dataIndex : 'F_MONEY',
							width : 80,
							renderer : function(value, metadata) {
								metadata.style = "text-align:right";
								return Ext.util.Format.usMoney(value); 
							}
						},{
							text : '剩余数量',
							align : 'center',
							dataIndex : 'KY_AMOUNT',
							width : 80,
							renderer : function(value, metadata) {
								metadata.style = "text-align:right";
								return value; 
							}
						},{
							text : '剩余金额',
							align : 'center',
							dataIndex : 'F_KYMONEY',
							width : 80,
							renderer : function(value, metadata) {
								metadata.style = "text-align:right";
								return Ext.util.Format.usMoney(value); 
							}
						},{
							text : '库房描述',
							align : 'center',
							dataIndex : 'STORE_DESC',
							width : 100,
							renderer : function(value, metadata) {
								metadata.style = "text-align:left";
								return value; 
							}
						},{
							text : '消耗明细',
							align : 'center',
							dataIndex : 'KCID',
							width : 60,
							renderer : LookMore
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
	} ]
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
	});
	if(Ext.util.Cookies.get('mm.departtype') == "厂矿机关"){
		bmStore.on('load', function(me) {
			me.insert(0, {
				'DEPARTCODE' : '%',
				'DEPARTNAME' : '全部'
			});
			Ext.getCmp("bm").select(me.first());
		});
		Ext.data.StoreManager.lookup('bmStore').load({
			params : {
				parVal : [ Ext.util.Cookies.get('mm.plantcode') ]
			}
		});
	}else  {
		bmStore.insert(0, {
			'DEPARTCODE' : Ext.util.Cookies.get('mm.departcode'),
			'DEPARTNAME' : Ext.util.Cookies.get('mm.departname')
		});
		Ext.getCmp('bm').select(Ext.util.Cookies.get('mm.departcode'));
	} 
	if(power=='update'){
		Ext.getCmp('update_panel').show();
	}
	else{
		Ext.getCmp('update_panel').hide();
	}
    
});
function pagelode() {
	Ext.getStore("gridStore").load();
}
function onSearch() {// 查询
	Ext.getStore('gridStore').proxy.extraParams.parVal = 
			[Ext.util.Cookies.get("mm.plantcode"),
		    Ext.getCmp('bm').getValue(),
		    Ext.getCmp('wzfl').getValue(),
		    Ext.getCmp('kfms').getValue(),
		    Ext.getCmp('wzbh').getValue(),
		    Ext.getCmp('wzmc').getValue(),
		    Ext.getCmp('gg').getValue(),
		    Ext.getCmp('cfwz').getValue(),
		    Ext.util.Cookies.get("mm.userid")];	
		Ext.getStore('gridStore').load();
	}
function UpdateStore(){
	var selectedRecord = Ext.getCmp('grid').getSelectionModel().getSelection();
	if ((selectedRecord.length == 0 )) {
			Ext.example.msg('提示', '请选择一条数据！');// 提示
			return;
	}
	if(Ext.getCmp('new_store_desc').getValue()==''){
		Ext.example.msg('提示', '请填写新的库房描述！');// 提示
			return;
	}
	for(var i = 0 ; i < selectedRecord.length ; i++)
	{
		Ext.Ajax.request({
		url : APP + '/ModelChange',
		params : {
			parName : [ 'a_kcid','a_new_storedesc'],
			parType : [ 's','s'],
			parVal : [selectedRecord[i].data.KCID,Ext.getCmp('new_store_desc').getValue()],
			proName : 'pg_dj1002.setStoredesc',
			returnStr : ['ret_msg','ret'],
			returnStrType : ['s','s']
		},
		method : 'POST',
		success : function(response) {
			var resp = Ext.JSON.decode(response.responseText);
			if(i==selectedRecord.length-1){
				onSearch();
			}
		}
		});
	}
}
function onExcel() {
	var tableName = ["序号","物资编号","物资名称","规格","单位","单价","入库数量",
	                  "金额","剩余数量","剩余金额","物资分类","库房描述"];
	var tableKey = ['MATERIALCODE','MATERIALNAME','ETALON',
	                 'UNIT','F_PRICE','AMOUNT','F_MONEY','KY_AMOUNT',
	                 'F_KYMONEY','I_TYPE','STORE_DESC'];
	parName = ['a_plantcode','a_departcode','a_itype','a_store_desc',
			'a_materialcode','a_materialname','a_etalon','a_loc_desc',
			'a_userid'];
	var parType = [ 's', 's', 's', 's', 's', 's', 's', 's', 's' ];
	var parVal = [ IsNull(Ext.util.Cookies.get("mm.plantcode")),
			Ext.getCmp('bm').getValue(),
			IsNull(Ext.getCmp('wzfl').getValue()),
			IsNull(Ext.getCmp('kfms').getValue()),
			IsNull(Ext.getCmp('wzbh').getValue()),
			IsNull(Ext.getCmp('wzmc').getValue()),
			IsNull(Ext.getCmp('gg').getValue()),
			IsNull(Ext.getCmp('cfwz').getValue()),
			IsNull(Ext.util.Cookies.get("mm.userid"))];
	var proName = 'pg_dj1002.getkc';
	var ExcelName = 'Excel';
	var cursorName = 'ret';
	var returnStr = [ 'null' ];
	var returnStrName = [ 'null' ];
	var returnStrType = [ 'null' ];
	submitData(APP + "/ModelExcelTotal", tableName, tableKey, parName, parType,
			parVal, proName, returnStr, returnStrType, returnStrName,
			cursorName, "tital", "储备物资查询");
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
