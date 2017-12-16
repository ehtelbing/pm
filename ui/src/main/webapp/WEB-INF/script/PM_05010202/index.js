var gridStore = Ext.create('Ext.data.Store', {
		id : 'gridStore',
		autoLoad : true,
		fields : [ 'V_ORDERGUID', 'V_ORDERID', 'V_SHORT_TXT', 'V_EQUIP_NO',
				'V_EQUIP_NAME', 'V_EQUSITENAME', 'V_SPARE', 'V_ORGNAME',
				'V_DEPTNAME', 'V_PERSONNAME', 'D_ENTER_DATE',
				'V_DEPTNAMEREPARIR', 'V_ORDER_TYP_TXT' ,'V_STATENAME'],

		proxy : {
			type : 'ajax',
			async : false,
			url : AppUrl + 'zdh/PRO_WORKORDER_SPARE_ZY_ITEM',
			extraParams : {
				V_V_ORDERGUID : Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID ,
				V_V_MATERIALCODE :  Ext.urlDecode(location.href.split('?')[1]).V_MATERIALCODE
			},
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			}
		}
	});

var gridPanel = Ext.create('Ext.panel.Panel',{
	title:'相关工单信息',
	width:700,
	height:480,
	autoScroll : true,
	items:[
	       {
	    	   xtype:'gridpanel',
	    	   id:'grid',
	    	   frame:false,
	    	   store : 'gridStore',	    		
	    		width:1080,
	    		autoScroll : false,
	    		columns : [ {
	    			text:'序号',
					xtype : 'rownumberer',
					width : 40,
					align:'center',
					sortable : false
				}, {
					text : '工单号',
					dataIndex : 'V_ORDERID',
					width:100,
					align : 'center',
					renderer : CreateGridColumnTd
				}, {
					text : '工单描述',
					dataIndex : 'V_SHORT_TXT',
					width:150,
					align : 'center',
					renderer : CreateGridColumnTd
				}, {
					text : '设备名称',
					dataIndex : 'V_EQUIP_NAME',
					width:150,
					align : 'center',
					renderer : CreateGridColumnTd
				}, {
					text : '设备位置',
					dataIndex : 'V_EQUSITENAME',
					width:120,
					align : 'center',
					renderer : CreateGridColumnTd
				}, {
					text : '备件消耗',
					dataIndex : 'V_SPARE',
					width:80,
					align : 'center',
					renderer : CreateGridColumnTd
				}, {
					text : '委托单位',
					dataIndex : 'V_DEPTNAME',
					width:70,
					align : 'center',
					renderer : CreateGridColumnTd
				}, {
					text : '委托人',
					dataIndex : 'V_PERSONNAME',
					width:50,
					align : 'center',
					renderer : CreateGridColumnTd
				}, {
					text : '委托时间',
					dataIndex : 'D_ENTER_DATE',
					width:80,
					align : 'center',
					renderer : CreateGridColumnTd
				}, {
					text : '检修单位',
					dataIndex : 'V_DEPTNAMEREPARIR',
					width:80,
					align : 'center',
					renderer : CreateGridColumnTd
				}, {
					text : '工单类型描述',
					dataIndex : 'V_ORDER_TYP_TXT',
					width:100,
					align : 'center',
					renderer : CreateGridColumnTd
				}, {
					text : '工单状态',
					dataIndex : 'V_STATENAME',
					width:60,
					align : 'center',
					renderer : CreateGridColumnTd
				} ]
	       }
	       ]
});

Ext.onReady(function(){
	Ext.create('Ext.Viewport',{
		items:[gridPanel]
	});
});

function CreateGridColumnTd(value){
	return '<div style="text-align:left;">'+value+'</div>';
}