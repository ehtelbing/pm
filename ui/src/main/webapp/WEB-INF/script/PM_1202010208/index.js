var code = '';
var ckcode;
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
var clztStore = Ext.create('Ext.data.Store', {
	autoLoad : false,
	storeId : 'clztStore',
	fields : ['code','name'],
	data : [{code:'1',name:'已处理'},{code:'0',name:'未处理'}],
	proxy : {
		type : 'memory',
		render : {
			type : 'json'
		}
	}
});
var clfsStore = Ext.create('Ext.data.Store', {
	autoLoad : false,
	storeId : 'clfsStore',
	fields : ['name'],
	data : [{name:'报废'},{name:'维修'}],
	proxy : {
		type : 'memory',
		render : {
			type : 'json'
		}
	}
});
var gridStore = Ext.create("Ext.data.Store", {
	autoLoad : false,
	storeId : 'gridStore',
	pageSize : 100,
	fields : [ 'ID',
	           'MATERIALCODE',	
	           'MATERIALNAME',	
	           'ETALON',	
	           'UNIT',	
	           'F_PRICE',
	           'UNIQUE_CODE',	
	           'HANDLE_REMARK',	
	           'HANDLE_TYPE'
	            ],
	proxy : {
		type : 'ajax',
		async : false,
		url : AppUrl + 'PM_12/PRO_RUN7128_JUNKMATLIST',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		}
	},
	listeners: {
        beforeload:loadgridStore
    }
});

var creatpanel = Ext.create('Ext.form.Panel', {
	id : 'creatpanel',
	style : 'margin:5px 0px 2px 2px',
	region : 'north',
	width : '100%',
	//baseCls : 'my-panel-no-border',
	defaults : {
		// style : 'margin:5px 0px 5px 10px',
		labelAlign : 'right'
	},
	layout : {
		type : 'vbox'
	},
	items : [
			{
				xtype : 'panel',
				layout : 'column',
				frame : true,
				baseCls : 'my-panel-noborder',
				width : '100%',
				items : [
						{
							xtype : 'datefield',
							format : 'Y/m/d',
							labelAlign : 'right',
							fieldLabel : '起始日期',
							labelWidth : 80,
							id : 'startTime',
							editable: false,
							value : new Date(new Date().getFullYear(),new Date().getMonth(), 1),
							style : 'margin: 5px 0px 5px 5px'
						}, {
						    xtype: 'datefield',
						    format: 'Y/m/d',
						    fieldLabel: '结束日期',
						    labelAlign: 'left',
						    labelWidth: 60,
						    id: 'endTime',
						    editable: false,
						    value: Ext.Date.getLastDateOfMonth(new Date()),
						    style: 'margin: 5px 0px 5px 5px'
						},
						{
							xtype : 'textfield',
							fieldLabel : '厂矿',
							readOnly:true,
							id : 'ck',
							labelAlign : 'right',
							labelWidth : 90,
							style : 'margin: 5px 0px 0px 1px'
						}, {
							xtype : 'textfield',
							fieldLabel : '作业区',
							readOnly:true,
							id : 'zyq',
							labelAlign : 'right',
							labelWidth : 90,
							style : 'margin: 5px 0px 0px 0px'
						}
				]
			}, {
				xtype : 'panel',
				layout : 'column',
				frame : true,
				baseCls : 'my-panel-noborder',
				width : '100%',
				items : [{
					xtype : 'combo',
					id : 'xzsb',
					store : 'sbxzStore',
					labelAlign : 'right',
					fieldLabel : '设备 ',
					editable : false,
					style : 'margin:5px 0px 5px 5px',
					labelWidth : 80,
					queryMode : 'local',
					valueField : 'EQU_ID',
					displayField : 'EQU_DESC'
				},{
					xtype : 'textfield',
					fieldLabel : '物料号',
					id : 'wlh',
					labelAlign : 'right',
					labelWidth : 60,
					style : ' margin: 5px 0px 0px 5px'
				},{
					xtype : 'textfield',
					fieldLabel : '物料描述',
					id : 'wlms',
					labelAlign : 'right',
					labelWidth : 90,
					style : ' margin: 5px 0px 0px 5px'
				},{
					xtype : 'combo',
					id : 'clzt',
					store : 'clztStore',
					labelAlign : 'right',
					fieldLabel : '处理状态 ',
					editable : false,
					style : 'margin:5px 0px 5px 10px',
					labelWidth : 80,
					queryMode : 'local',
					valueField : 'code',
					displayField : 'name'
				}]
			} , {
				xtype : 'panel',
				layout : 'column',
				frame : true,
				baseCls : 'my-panel-noborder',
				width : '100%',
				items : [ 
				   {
					xtype : 'button',
					text : '查询',
					icon : imgpath + '/search.png',
					width : 100,
					handler : query,
					style : {
						margin : '5px 0px 10px 40px'
					}
				},{
					xtype : 'button',
					text : '导出Excel',
					width : 100,
					icon : imgpath + '/grid.png',
					handler : OnButtonExportClicked,
					style : {
						margin : '5px 0px 5px 40px'
					}
				},{
					id:'clxzjj',
					xtype : 'button',
					text : '处理选中旧件',
					width : 100,
					handler : clxzjjbtn,
					style : {
						margin : '5px 0px 5px 40px'
					}
				} ]
			} ]
});

var grid = Ext.create("Ext.grid.Panel", {
	xtype : 'gridpanel',
	id : 'grid',
	region : 'center',
	columnLines : true,
	width : '100%',
	store : gridStore,
	autoScroll : true,
	height : 400,
	selModel : {
		selType : 'checkboxmodel',
		mode : 'SINGLE'
	},
	columns : [ {
		text : '备件唯一编码 ',
		dataIndex : 'UNIQUE_CODE',
		align : 'center',
		width : 150,
		renderer : RenderFontLeft
	}, {
		text : '物料号',
		dataIndex : 'MATERIALCODE',
		align : 'center',
		labelAlign : 'right',
		width : 150,
		renderer : RenderFontLeft
	}, {
		text : '物料描述',
		dataIndex : 'MATERIALNAME',
		align : 'center',
		width : 150,
		renderer : RenderFontLeft
	}, {
		text : '规格型号 ',
		dataIndex : 'ETALON',
		align : 'center',
		width : 150,
		renderer : RenderFontLeft
	}, {
		text : '计量单位 ',
		dataIndex : 'UNIT',
		align : 'center',
		width : 150,
		renderer : RenderFontLeft
	}, {
		text : '单价 ',
		dataIndex :'F_PRICE',
		align : 'right',
		width : 150
	}, {
		text : '处理方式 ',
		dataIndex : 'HANDLE_TYPE',
		align : 'center',
		width : 150,
		renderer : RenderFontLeft
	}, {
		text : '处理说明 ',
		dataIndex : 'HANDLE_REMARK',
		align : 'center',
		width : 150,
		renderer : RenderFontLeft
	} ],
	bbar : ['->', {
		xtype : 'pagingtoolbar',
		dock : 'bottom',
		displayInfo : true,
		displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
		emptyMsg : '没有记录',
		store : 'gridStore'
	} ]
});
var editWindow = Ext.create('Ext.window.Window', {
	id : 'editWindow',
	title : '处理选中备件',
	height : 200,
	closeAction : 'hide',
	width : 400,
	modal : true,
	frame : true,
	layout : 'vbox',
	items : [ {
		xtype : 'combo',
		id : 'clfs',
		store : 'clfsStore',
		labelAlign : 'right',
		fieldLabel : '处理方式 ',
		editable : false,
		style : 'margin:5px 0px 5px 10px',
		labelWidth : 80,
		queryMode : 'local',
		valueField : 'name',
		displayField : 'name'
	},{
		xtype : 'textarea',
		id : 'clfstext',
		labelAlign : 'right',
		fieldLabel : '处理说明 ',
		editable : false,
		width: 350,
		style : 'margin:5px 0px 5px 10px',
		labelWidth : 80
	}],
	buttons : [ {
		id : 'saved',
		text : '确认',
		handler : saved
	} ]
});
Ext.onReady(function() {
	Ext.create('Ext.container.Viewport', {
		id : "id",
		layout : 'border',
		items : [ creatpanel, grid ]
	});

	Ext.data.StoreManager.lookup('sbxzStore').on('load', function() {
		Ext.getCmp('xzsb').store.insert(0, {
			'EQU_ID' : '%',
			'EQU_DESC' : '全部'
		});
		Ext.getCmp('xzsb').select(Ext.data.StoreManager.lookup('sbxzStore').getAt(0));
		query();
	});
	Ext.getCmp("zyq").setValue(decodeURI(Ext.util.Cookies.get("v_deptname")));	
	Ext.getCmp("ck").setValue(decodeURI(Ext.util.Cookies.get("v_orgname")));
	Ext.data.StoreManager.lookup('sbxzStore').load({
		params : {
			V_V_PLANTCODE: Ext.util.Cookies.get('v_orgCode'),
			V_V_DEPTCODE: Ext.util.Cookies.get('v_deptcode')//code
		}
	});
	 Ext.getCmp("clfs").setValue('报废');
	 Ext.getCmp("clzt").setValue('1');	
	 Ext.getCmp('clxzjj').setDisabled(true);
	 Ext.getCmp('clzt').on('select',function(){
		 if(Ext.getCmp('clzt').getValue()=='1'){
			 Ext.getCmp('clxzjj').setDisabled(true);
		 } else {
			 Ext.getCmp('clxzjj').setDisabled(false);
		 }
		 query();
	 });
});
// 查询
function query() {
	Ext.data.StoreManager.lookup('gridStore').load();
}
function saved(){
    if(Ext.getCmp('clfstext').getValue()==''){
    	Ext.Msg.alert('提示','请填写处理说明！');
    	return false;
	}
	var selData = Ext.getCmp('grid').getSelectionModel().getSelection();
	Ext.Ajax.request({
		url : AppUrl + 'PM_12/PRO_RUN7129_JUNKMAT',
		method : 'POST',
		async : false,
		params : {
			V_ID:selData[0].data.ID,
			V_HANDLE_TYPE: Ext.getCmp('clfs').getValue(),
			V_HANDLE_REMARK:Ext.getCmp('clfstext').getValue(),
			V_HANDLE_USERID:Ext.util.Cookies.get('v_personcode'),
			V_HANDLE_USERNAME:Ext.util.Cookies.get('v_personname2')
		},
		success : function(response) {
			var resp = Ext.decode(response.responseText);
			alert(resp.V_RET);
			Ext.getCmp('clfs').setValue('');
			Ext.getCmp('clfstext').setValue('');
			Ext.getCmp('editWindow').hide();
			query();
		}
	});
}
function clxzjjbtn(){
	var selData = Ext.getCmp('grid').getSelectionModel().getSelection();
	if(selData.length==1){
		Ext.getCmp('editWindow').show();
	}else {
		Ext.Msg.alert('提示','请选择一行进行操作！');
	}
}
function RenderFontLeft(value, metaData) {
	metaData.style = 'text-align: left';
	value = value.split(' ')[0];
	return value;
}
function OnButtonExportClicked() {
	document.location.href=AppUrl + 'excel/HXBJCL_EXCEL?D_BEGIN_DATE='+Ext.util.Format.date(Ext.getCmp('startTime').getValue(), 'Y-m-d')+
	'&D_END_DATE='+Ext.util.Format.date(Ext.getCmp('endTime').getValue(), 'Y-m-d')+
	'&V_PLANTCODE='+Ext.util.Cookies.get('v_orgCode')+
	'&V_DEPARTCODE='+Ext.util.Cookies.get('v_deptcode')+
	'&V_EQU_ID='+encodeURI(Ext.getCmp('xzsb').getValue())+
	'&V_MATERIALCODE='+encodeURI(Ext.getCmp('wlh').getValue())+
	'&V_MATERIALNAME='+encodeURI(Ext.ComponentManager.get("wlms").getValue())+
	'&V_STATUS='+Ext.getCmp('clzt').getValue();
}
function loadgridStore(store){
	store.proxy.extraParams.D_BEGIN_DATE=Ext.util.Format.date(Ext.getCmp('startTime').getValue(), 'Y-m-d');
	store.proxy.extraParams.D_END_DATE=Ext.util.Format.date(Ext.getCmp('endTime').getValue(), 'Y-m-d');
	store.proxy.extraParams.V_PLANTCODE=Ext.util.Cookies.get('v_orgCode');
	store.proxy.extraParams.V_DEPARTCODE=Ext.util.Cookies.get('v_deptcode');
	store.proxy.extraParams.V_EQU_ID=Ext.getCmp('xzsb').getValue();
	store.proxy.extraParams.V_MATERIALCODE=Ext.getCmp('wlh').getValue();
	store.proxy.extraParams.V_MATERIALNAME=Ext.getCmp('wlms').getValue();
	store.proxy.extraParams.V_STATUS=Ext.getCmp('clzt').getValue();
}
