//任务名称：DJ606.试验信息查询-附件列表的查询和下载  DJ606.试验信息查询-试验数据详细查询
//任务编号：33497  33498
//完成人：刘旭
//完成时间：2015/10/06

var orderid = '';
if (location.href.split('?')[1] != null) {
	orderid = Ext.urlDecode(location.href.split('?')[1]).ORDERID;
}

Ext.onReady(function() {
	var gridStore = Ext.create('Ext.data.Store', {
		autoLoad : true,// 自动加载
		storeId : 'gridStore',
		fields : ['FILEID','FILE_NAME','UPLOAD_DATE'],
		proxy : {
			type : 'ajax',
			url : APP + '/ModelSelect',
			reader : {
				type : 'json',
				root : 'list'
			},
			actionMethods : {
				read : 'POST'
			},
			extraParams : {
				parName : [ 'a_orderid'],
				parType : [ 's' ],
				parVal : [ orderid ],
				proName : 'pg_dj605.filelist',
				cursorName : 'ret'
			}
		}
	});

	var panelNorth = Ext.create('Ext.form.Panel', {
		region : 'north',
		frame : true,
		layout : 'vbox',
		items : [
				{
					xtype : 'displayfield',
					fieldLabel : '工单号',
					style : ' margin: 5px 0px 0px 20px',
					id : 'gdh',
					labelAlign : 'left',
					labelWidth : 90,
					value:orderid
				},
				{
					xtype : 'displayfield',
					fieldLabel : '试验日期',
					style : ' margin: 5px 0px 0px 20px',
					id : 'syrq',
					labelAlign : 'left',
					labelWidth : 90
				},
				{
					xtype : 'displayfield',
					fieldLabel : '半成品试验',
					style : ' margin: 5px 0px 0px 20px',
					labelAlign : 'left',
					labelWidth : 90
				}, {
					xtype : 'displayfield',
					fieldLabel : '试验结果',
					style : ' margin: 5px 0px 0px 0px',
					id : 'bcpsyjg',
					labelAlign : 'right',
					labelWidth : 105
				}, {
					xtype : 'textareafield',
					fieldLabel : '试验说明',
					style : ' margin: 5px 0px 0px 0px',
					id : 'bcpsysm',
					width:700,
					labelAlign : 'right',
					labelWidth : 105
				},{
					xtype : 'displayfield',
					fieldLabel : '转子半成品试验',
					style : ' margin: 5px 0px 0px 0px',
					labelAlign : 'right',
					labelWidth : 150
				},{
					xtype : 'displayfield',
					fieldLabel : '试验结果',
					style : ' margin: 5px 0px 0px 0px',
					id : 'zzbcpsyjg',
					labelAlign : 'right',
					labelWidth : 105
				},{
					xtype : 'textareafield',
					fieldLabel : '试验说明',
					style : ' margin: 5px 0px 0px 0px',
					id : 'zzbcpsysm',
					width:700,
					labelAlign : 'right',
					labelWidth : 105
				},{
					xtype : 'displayfield',
					fieldLabel : '定子半成品试验',
					style : ' margin: 5px 0px 0px 0px',
					labelAlign : 'right',
					labelWidth : 150
				},{
					xtype : 'displayfield',
					fieldLabel : '试验结果',
					style : ' margin: 5px 0px 0px 0px',
					id : 'dzbcpsysyjg',
					labelAlign : 'right',
					labelWidth : 105
				},{
					xtype : 'textareafield',
					fieldLabel : '试验说明',
					style : ' margin: 5px 0px 0px 0px',
					id : 'dzbcpsysysm',
					width:700,
					labelAlign : 'right',
					labelWidth : 105
				},{
					xtype : 'displayfield',
					fieldLabel : '成品试验',
					style : ' margin: 5px 0px 0px 0px',
					labelAlign : 'right',
					labelWidth : 150
				},{
					xtype : 'displayfield',
					fieldLabel : '试验结果',
					style : ' margin: 5px 0px 0px 0px',
					id : 'cpsysyjg',
					labelAlign : 'right',
					labelWidth : 105
				},{
					xtype : 'textareafield',
					fieldLabel : '试验说明',
					style : ' margin: 5px 0px 0px 0px',
					id : 'cpsysysm',
					width:700,
					labelAlign : 'right',
					labelWidth : 105
				}, ]
	});
	var grid = Ext.create("Ext.grid.Panel", {
		id : 'grid',
		title : '文件列表',
		region : 'center',
		xtype : 'gridpanel',
		columnLines : true,// 设置为true则显示纵向表格线，默认为false
		autoScroll : true,// 滚动条
		store : gridStore,
		columns : [ {
			text : '文件名',
			align : 'center',
			dataIndex : 'FILE_NAME',
			width : 150
		}, {
			text : '上传时间',
			dataIndex : 'UPLOAD_DATE',
			align : 'center',
			width : 150
		}, {
			text : '下载',
			dataIndex : 'FILEID',
			align : 'center',
			width : 100,
			renderer : redown
		}]
	});
	
	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		//autoScroll : true,
		items : [ panelNorth, grid ]
	});

	 Bind();
});
function Bind() {
	Ext.Ajax.request({
		url : APP + '/ModelSelect',
		params : {
			parName : [ 'a_orderid' ],
			parType : [ 's' ],
			parVal : [ orderid ],
			proName : 'pg_dj605.ordersydetail',
			cursorName : 'ret'
		},
		method : 'POST',
		success : function(response) {
			var resp = Ext.JSON.decode(response.responseText);
			if (resp.list.length > 0) {
			Ext.getCmp('syrq').setValue(resp.list[0].SY_DATE);
			Ext.getCmp('bcpsyjg').setValue(resp.list[0].BCSY_RESULT);
			Ext.getCmp('bcpsysm').setValue(resp.list[0].BCSY_RESULT_DESC);
			Ext.getCmp('zzbcpsyjg').setValue(resp.list[0].ZBCSY_RESULT);
			Ext.getCmp('zzbcpsysm').setValue(resp.list[0].ZBCSY_RESULT_DESC);
			Ext.getCmp('dzbcpsysyjg').setValue(resp.list[0].DBCSY_RESULT);
			Ext.getCmp('dzbcpsysysm').setValue(resp.list[0].DBCSY_RESULT_DESC);
			Ext.getCmp('cpsysyjg').setValue(resp.list[0].CSY_RESULT);
			Ext.getCmp('cpsysysm').setValue(resp.list[0].CSY_RESULT_DESC);
		}
		}
	});
}

function redown(value, metaData, record, rowIdx,colIdx, store, view) {
	return '<a href="javascript:void(0)" onclick="writeIn('+rowIdx+')">下载</a>';
}
function writeIn(rowIdx){
	gobalfileid=Ext.data.StoreManager.lookup('gridStore').getAt(rowIdx).data.FILEID;
	location.href = APP + '/downfile34301?fileid='+ gobalfileid;	
}