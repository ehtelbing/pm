Ext.onReady(function() {
	//厂矿
var selPlantstore = Ext.create('Ext.data.Store', {
	autoLoad : true,
	storeId : 'selPlantstore',
	fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
	proxy : {
		type : 'ajax',
		async : false,
		url : AppUrl + 'PM_12/PRO_BASE_DEPT_VIEW',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		},
		extraParams : {
			IS_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
			IS_V_DEPTTYPE:'[基层单位]'
		}
	}
});


// 作业区
var gzpalceStore = Ext.create('Ext.data.Store', {
	autoLoad : false,
	storeId : 'gzpalceStore',
	fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
	proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
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

var gridStore = Ext.create('Ext.data.Store', {
				id : 'gridStore',
				autoLoad : false,
				pageSize :100,
				fields : [
				'KC_ID', 'MATERIALCODE', 'MATERIALNAME', 'UNIT',
				'ELATON', 'F_PRICE','KCAMOUNT', 'KC_MONEY', 'PLANTCODE','PLANTNAME','DEPARTCODE',
				'DEPARTNAME','STOREID','STORENAME','INSERTDATE'],
				proxy : {
					type : 'ajax',
					async : false,
					url : AppUrl + 'PM_12/PRO_RUN7127_SELECTKC',
					actionMethods : {
						read : 'POST'
					},
					reader : {
						type : 'json',
						root : 'list'
					}
				}
			});

var creatpanel1 = Ext.create('Ext.form.Panel', {
	id : 'creatpanel1',
	style : 'margin:5px 0px 2px 2px',
	region : 'north',
	width : '100%',
	//baseCls : 'my-panel-no-border',
	defaults : {
		style : 'margin:5px 0px 5px 10px',
		labelAlign : 'right'
	},
	layout : {
		type : 'column'
	},
	items : [ 
	{   
		xtype : 'combobox',
		id : 'plant',
		store : 'selPlantstore',
		fieldLabel : '厂矿 ',
		editable : false,
		style : 'margin:5px 0px 5px 5px',
		labelWidth : 50,
		queryMode : 'local',
		valueField : 'V_DEPTCODE',
		displayField : 'V_DEPTNAME'
	},{
		xtype : 'combobox',
		id : 'zyq',
		store : 'gzpalceStore',
		fieldLabel : '作业区 ',
		editable : false,
		style : 'margin:5px 0px 5px 5px',
		labelWidth : 60,
		queryMode : 'local',
		valueField : 'V_DEPTCODE',
		displayField : 'V_DEPTNAME'
	}, {
		xtype : 'combo',
		id : 'xzsb',
		store : 'sbxzStore',
		fieldLabel : '选择设备 ',
		editable : false,
		style : 'margin:5px 0px 5px 5px',
		labelWidth : 70,
		queryMode : 'local',
		valueField : 'EQU_ID',
		displayField : 'EQU_DESC'
	}, {
		xtype : 'button',
		text : '查询',
		icon : imgpath + '/search.png',
		width : 60,
		handler : query,
		style : {
			margin : '5px 0 5px 20px'
		}
	},
	{
		xtype : 'button',
		text : '导出到Excel',
		icon : imgpath + '/grid.png',
		width : 100,
		style : {
			margin : '5px 0 5px 10px'
		},
		listeners : {
				  click : OnButtonExportClicked
		 }
	}
	]
});

var grid = Ext.create("Ext.grid.Panel", {
	xtype : 'gridpanel',
	id : 'grid',
	region : 'center',
	columnLines : true,
	width : '100%',
	store : gridStore,
	selType : 'checkboxmodel',
	selModel : {
		selType : 'checkboxmodel',
		mode : 'SINGLE'
	},
	autoScroll : true,
	height : 400,
	columns : [
			  {
				text : '物料号',
				dataIndex : 'MATERIALCODE',
				align : 'center',
				width : 150,
				renderer : RenderFontLeft
			}, {
				text : '物料描述 ',
				dataIndex : 'MATERIALNAME',
				align : 'center',
				width : 150,
				renderer : RenderFontLeft
			}, {
				text : '规格型号 ',
				dataIndex : 'ELATON',
				align : 'center',
				width : 120,
				renderer : RenderFontLeft
			}, {
				text : '库存数量 ',
				dataIndex : 'KCAMOUNT',
				align : 'center',
				width : 80,
				renderer : RenderFontRight
			}, {
				text : '库存金额 ',
				dataIndex : 'KC_MONEY',
				align : 'center',
				width : 110,
				renderer : RenderFontRight
			}, {
				text : '厂矿 ',
				dataIndex : 'PLANTNAME',
				align : 'center',
				width : 150,
				renderer : RenderFontLeft
			}, {
				text : '作业区 ',
				dataIndex : 'DEPARTNAME',
				align : 'center',
				width : 150,
				renderer : RenderFontLeft
			}, {
				text : '库房名 ',
				dataIndex : 'STORENAME',
				align : 'center',
				width : 150,
				renderer : RenderFontLeft
			} ,
			{
				text : '统计时间 ',
				dataIndex : 'INSERTDATE',
				align : 'center',
				width : 110,
				renderer : RenderFontLeft
			} ],
			bbar: ['->',{ xtype: 'pagingtoolbar',
			         id:'pagingtoolbar',
	                 dock: 'bottom',
	                 displayInfo: true,
	                 displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
	                 emptyMsg: '没有记录',
	                 store: 'gridStore'  } 
           ]
});
	
	
	Ext.create('Ext.container.Viewport', {
		id : "id",
		layout : 'border',
		items : [ creatpanel1, grid ]
	});
	
	
	/**厂矿*/
	selPlantstore.on("load",function(){
		Ext.getCmp('plant').select(selPlantstore.getAt(0));
		/**作业区*/
		gzpalceStore.insert(0, { V_DEPTCODE : Ext.util.Cookies.get('v_deptcode'),
							     V_DEPTNAME : decodeURI(Ext.util.Cookies.get("v_deptname"))
		});
		Ext.getCmp('zyq').select(gzpalceStore.getAt(0));			
				
		/**设备*/
	    Ext.data.StoreManager.lookup('sbxzStore').load({
			params : {
				V_V_PLANTCODE:Ext.util.Cookies.get('v_orgCode'),
				V_V_DEPTCODE:Ext.getCmp('zyq').getValue()
			}
		 });
	})
	 /**设备*/
	 sbxzStore.on('load', function() {
	 	        sbxzStore.insert(0, {'EQU_ID' : '%', 'EQU_DESC' : '全部'});
				sbxzStore.sort('EQU_ID', 'ASC');
				Ext.getCmp('xzsb').select(sbxzStore.getAt(0));
				query();
	 })

	function query(){
		Ext.data.StoreManager.get('gridStore').load({
			params : {
				V_PLANTCODE: Ext.getCmp('plant').getValue(),
				V_DEPARTCODE:Ext.getCmp('zyq').getValue(),
				V_EQU_ID:Ext.getCmp('xzsb').getValue()
			}
		});
	}
});
 

function RenderFontLeft(value, metaData) {
	metaData.style = 'text-align: left';
	value = value.split(' ')[0];
	return value;
}

function RenderFontRight(value, metaData) {
	metaData.style = 'text-align: right';
	return value;
}
 
 
function OnButtonExportClicked() {
	document.location.href=AppUrl + 'excel/ZKBJJK_EXCEL?V_PLANTCODE='+Ext.getCmp('plant').getValue()+
	'&V_DEPARTCODE='+Ext.getCmp('zyq').getValue()+
	'&V_EQU_ID='+ encodeURI(Ext.getCmp('xzsb').getValue());
}
