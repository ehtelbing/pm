var kcidcode = '';
if (location.href.split('?')[1] != undefined) {
	kcidcode = Ext.urlDecode(location.href.split('?')[1]).KCID;
}
Ext.onReady(function() {
	var gridStore = Ext.create('Ext.data.Store', {
		autoLoad :false,
		storeId : 'gridStore',
		fields : ['MATERIALCODE','MATERIALNAME','ETALON','UNIT',	
		          'F_PRICE','PLAN_AMOUNT','F_MONEY','ORDERID','INSERTDATE'],
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
				parName : ['a_kcid'],
				parType : ['s'],
				proName : 'pg_dj1002.getconsumedetail',
				cursorName : 'ret'
			}
		}
	});
	
	var grid = Ext.create('Ext.grid.Panel',
			{
				region : 'center',
				id : 'grid',
				columnLines : true,
				style : 'margin: 5px 0px 0px 0px',
				width : '100%',
				features : [ {
					ftype : 'summary'
				} ],
				autoScroll : true,
				store : gridStore,
				columns : [{
							text : '物资编号',
							dataIndex : 'MATERIALCODE',
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
							text : '规格',
							align : 'center',
							dataIndex : 'ETALON',
							width : 100
						},
						{
							text : '单位',
							align : 'center',
							dataIndex : 'UNIT',
							width : 100
						},{
							text : '单价',
							align : 'center',
							dataIndex : 'F_PRICE',
							width : 100
						},{
							text : '数量',
							align : 'center',
							dataIndex : 'PLAN_AMOUNT',
							width : 100,
							summaryType : 'sum',//求和
							summaryRenderer : function(value, metadata) {
								metadata.style = "text-align:right";
								return Ext.util.Format.number(value, '0,000.00');//把数字value转换成‘o,ooo.oo’格式
							}
						},{
							text : '金额',
							align : 'center',
							dataIndex : 'F_MONEY',
							width : 100,
							summaryType : 'sum',//求和
							summaryRenderer : function(value, metadata) {
								metadata.style = "text-align:right";
								return Ext.util.Format.number(value, '0,000.00');//把数字value转换成‘o,ooo.oo’格式
							}
						},{
							text : '消耗时间',
							align : 'center',
							dataIndex : 'INSERTDATE',
							width : 100
						},{
							text : '检修单号',
							align : 'center',
							dataIndex : 'ORDERID',
							width : 100
						}]
			});
	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		items : [grid ]
	});
	pageload();
})
function pageload() {// 查询
	Ext.getStore('gridStore').proxy.extraParams.parVal = [kcidcode];	
		Ext.getStore('gridStore').load();
	}
