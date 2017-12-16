Ext.onReady(function() {
	var gridStore = Ext.create('Ext.data.Store', {
		autoLoad : false,
		storeId : 'gridStore',
		fields : [ 'MENDCONTEXT_CODE', 'MENDCONTEXT_DESC', 'STATUS'],
		proxy : {
			type : 'ajax',
			actionMethods : {
				read : 'POST'
			},
			url : AppUrl + 'DJ/pro_dj101_selectmendcontext',
			reader : {
				type : 'json',
				root : 'list'
			}
		}
	});

	var upPanel = Ext.create('Ext.panel.Panel', {
		id : 'upPanel',
		region : 'north',
		//style : 'margin: 5px 0px 0px 0px',
		style: 'background-color:#FFFFFF',
		baseCls: 'my-panel-no-border',
		padding: '10px 0px 10px 0px',
		frame : true,
		//title : '电机（机械部分）修理内容表设置',
		layout : 'column',
		items : [{
			xtype : 'textfield',
			id : 'fixContentCode',
			fieldLabel : '修理内容编号',
			labelAlign : 'right',
			labelWidth : 80,
			width :　200
		}, {
			xtype : 'textfield',
			id : 'fixContentDesc',
			fieldLabel : '修理内容描述',
			labelAlign : 'right',
			labelWidth : 80,
			width :　200
		}, {
			xtype : 'button',
			text : '新增',
			width : 80,
			style : ' margin: 0px 0px 0px 20px',
			icon : imgpath + '/add.png',
			handler : addFixContent
		},{
			xtype : 'button',
			text : '查 询',
			width : 80,
			style : ' margin: 0px 0px 0px 10px',
			icon : imgpath + '/search.png',
			handler : Query
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
				columns : [
						{
							text : '序号',
							dataIndex : 'NUMBER',
							xtype : 'rownumberer',
							width : 70,
							align : 'center'
						},
						{
							text : '修理内容编号',
							dataIndex : 'MENDCONTEXT_CODE',
							align : 'center',
							width : 150
						},
						{
							text : '修理内容描述',
							align : 'center',
							dataIndex : 'MENDCONTEXT_DESC',
							width : 180
						},
						{
							text : '状态',
							align : 'center',
							dataIndex : 'STATUS',
							width : 200
						},
						{
							text : '启用/停用',
							align : 'center',
							width : 100,
							renderer : function(value, metaData, record,
									rowIdx, colIdx, store, view) {
								if (Ext.getStore("gridStore").data
										.getAt(rowIdx).data.STATUS == '启用') {
									return '<a href="javascript:start(\''
											+ rowIdx + '\',0)">停用</a>';
								} else {
									return '<a href="javascript:stop(\''
											+ rowIdx + '\',1)">启用</a>';
								}
							}
						},
						{
							text : '删除',
							align : 'center',
							width : 100,
							renderer : function(value, metaData, record, rowIdx,
									colIdx, store, view) {
								return '<img src="' + imgpath
										+ '/delete.png" alt="删除" onclick="delFixContent(\''
										+ rowIdx + '\')"/>';
							}
						}  ]
			});
	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		items : [ upPanel, grid ]
	});

	Query();
})

function Query() {
	Ext.data.StoreManager.lookup('gridStore').load({
		params : {
		}
	});
}

function addFixContent() {
	Ext.Ajax.request({
		url: AppUrl + 'DJ/pro_dj101_addmendcontext',
		method : 'post',
		async:false,
		params : {
			contenr_code_in:Ext.getCmp('fixContentCode').getValue(),
			describe_in:Ext.getCmp('fixContentDesc').getValue()
		},
		success : function(response) {
			var resp=Ext.decode(response.responseText);
			if (resp.ret == 'Success') {
				alert('操作成功！');
				Query();
			}else {
				alert('操作失败！');
			}
		}

	});
}

function start(rowIdx, STATUS) {
	var id = Ext.data.StoreManager.lookup('gridStore').data.getAt(rowIdx).data.MENDCONTEXT_CODE;

	Ext.Ajax.request({
		url: AppUrl + 'DJ/pro_dj101_stopmendcontext',
		method : 'post',
		async:false,
		params : {
			contenr_code_in:id
		},
		success : function(response) {
			var resp=Ext.decode(response.responseText);
			if (resp.ret == 'Success') {
				alert('操作成功！');
				Query();
			}else {
				alert('操作失败！');
			}
		}

	});
}
function stop(rowIdx, STATUS) {
	var id = Ext.data.StoreManager.lookup('gridStore').data.getAt(rowIdx).data.MENDCONTEXT_CODE;

	Ext.Ajax.request({
		url: AppUrl + 'DJ/pro_dj101_startmendcontext',
		method : 'post',
		async:false,
		params : {
			contenr_code_in:id
		},
		success : function(response) {
			var resp=Ext.decode(response.responseText);
			if (resp.ret == 'Success') {
				alert('操作成功！');
				Query();
			}else {
				alert('操作失败！');
			}
		}

	});
}
function delFixContent(rowIdx){
	var id = Ext.data.StoreManager.lookup('gridStore').data.getAt(rowIdx).data.MENDCONTEXT_CODE;

	Ext.Ajax.request({
		url: AppUrl + 'DJ/pro_dj101_deletemendcontext',
		method : 'post',
		async:false,
		params : {
			contenr_code_in:id
		},
		success : function(response) {
			var resp=Ext.decode(response.responseText);
			if (resp.ret == 'Success') {
				alert('操作成功！');
				Query();
			}else {
				alert('操作失败！');
			}
		}

	});
}