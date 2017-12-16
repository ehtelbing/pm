
var gzpalceStore = Ext.create('Ext.data.Store', {
	autoLoad : true,
	storeId : 'gzpalceStore',
	fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
	proxy : {
		type : 'ajax',
		async : false,
		url: AppUrl + 'No4120/PRO_PM_REPAIRDEPT_TODEPT',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		},
		extraParams : {
			V_REPAIRDEPTCODE:Ext.util.Cookies.get('v_deptcode'),
			V_PERSONCODE:Ext.util.Cookies.get('v_orgCode')
		}
	}
});

var panel = Ext.create('Ext.panel.Panel', {
	id : 'panellow',
	width : '100%',
	title : '设备监控',
	region : 'north',
	frame : true,
	layout : 'column',
	items : [

		{
			xtype : 'combo',
			id : "zyq",
			store : gzpalceStore,
			editable : false,
			readOnly:true,
			queryMode : 'local',
			fieldLabel : '作业区',
			displayField : 'V_DEPTNAME',
			valueField : 'V_DEPTCODE',
			labelWidth : 60,
			style : ' margin: 5px 0px 0px 10px',
			labelAlign : 'right'
		}, {
			xtype : 'button',
			text : '查询',
			icon : imgpath + '/search.png',
			width : 80,
			style : ' margin: 5px 0px 0px 10px',
			handler : loadGridStore
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
			fields : [ 'EQU_ID', 'EQU_DESC', 'USERNAME', 'STATUS',
				'PP_CODE', 'URL' ],
			proxy : {
				type : 'ajax',
				async : false,
				url: AppUrl + 'cjy/pro_run7114_equlist',
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
		selModel : {
			selType : 'checkboxmodel',
			mode : 'SINGLE'
		},
		height : 400,
		columns : [

			// { xtype: 'rownumberer', text: '序号', width: 35,
			// sortable: false },
			{
				text : '设备编码',
				width : 150,
				dataIndex : 'EQU_ID',
				align : 'center',
				renderer : atleft
			},
			{
				text : '设备名称',
				flex : 1,
				dataIndex : 'EQU_DESC',
				align : 'center',
				renderer : atleft
			},
			{
				text : '负责人',
				width : 150,
				dataIndex : 'USERNAME',
				align : 'center',
				renderer : atleft
			},
			{
				text : '当前状态',
				width : 150,
				dataIndex : 'STATUS',
				align : 'center',
				renderer : function(value, metaData, record) {
					if (value == 1) {
						return '正常';
					} else {
						return '其他';
					}
				}
			},
			{
				text : '生产系统编码',
				width : 250,
				dataIndex : 'PP_CODE',
				align : 'center'
			},
			{
				text : '模拟运行图 ',
				align : 'center',
				width : 100,
				renderer : function(value, metaData, record) {
					return '<div><a href="javascript:OnClickDeleteLink()">查看</a></div>';
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

Ext.onReady(function() {

	Ext.create('Ext.container.Viewport', {
		id : "id",
		layout : 'border',
		items : [ panel, grid ]
	});

	Ext.data.StoreManager.lookup('gzpalceStore').on(
		'load',
		function() {
			Ext.getCmp('zyq').select(
				Ext.data.StoreManager.lookup('gzpalceStore').getAt(0));

			// 默认当前登录用户工作区
			var storeLength = Ext.data.StoreManager
				.lookup('gzpalceStore').data.length;
			for ( var index = 0; index < storeLength; index++) {
				var storeItemData = Ext.data.StoreManager
					.lookup('gzpalceStore').data.items[index].data;
				if (storeItemData.V_DEPTCODE == Ext.util.Cookies
						.get('v_deptcode')) {
					Ext.getCmp("zyq").setValue(
						Ext.util.Cookies
							.get('v_deptcode'));
					break;
				}
			}


		});

});

function OnClickDeleteLink() {
	var data = Ext.getCmp('grid').getSelectionModel().getSelection()[0].data;
	if(data.URL==""||data.URL==null||data.URL==undefined){
		alert("无法获取地址");
	}else{window.open(data.URL, null,
		"dialogWidth=650px;dialogHeight=400px");
	}

}

function loadGridStore() {
	Ext.data.StoreManager.lookup('gridStore').load(
		{
			params : {
				V_V_DEPARTCODE: Ext.getCmp("zyq").getValue(),
				V_V_PLANTCODE:Ext.util.Cookies.get('v_orgCode')
			}

		});
}

function beforeloadStore(store) {

}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return value;
}