Ext.onReady(function() {
	var northPanel = Ext.create("Ext.panel.Panel", {
		layout:'column',frame:true,
		defaults:{labelWidth : 70,labelAlign : 'right'},
		items:[{
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
					code : Ext.util.Cookies.get("mm.departcode"),
					value : Ext.util.Cookies.get("mm.departname")
				} ]
			},
			valueField : 'code',
			displayField : 'value',
			value : Ext.util.Cookies.get("mm.departcode")
		},
		       {xtype : 'textfield',id : 'gdh',fieldLabel : '工单号',style : 'margin:5px 0px 5px 5px',},
		       {xtype : 'button',text : '查询',labelWidth : 70,style : 'margin:5px 0px 5px 5px',icon: imgpath +'/a1.gif',handler : Bind
				}]
	});
	var gridStore = Ext.create('Ext.data.Store', {
		autoLoad :false,
		pageSize : 200,
		storeId : 'gridStore',
		fields : ['ORDERID',
		  		'DJ_NAME',
				'BCSY_RESULT',
				'CSY_RESULT',
				'MEND_CONTEXT',
				'MENDDEPT_NAME'],
		proxy : {
			type : 'ajax',
			actionMethods : {
				read : 'POST'
			},
			url : APP + '/ModelSelect',
			reader : {
				type : 'json',
				root : 'list'
			}
		}
	});
	var grid = Ext.create('Ext.grid.Panel',{
				region : 'center',
				id : 'grid',
				columnLines : true,
				style : 'margin: 5px 0px 0px 0px',
				width : '100%',
				autoScroll : true,
				store : gridStore,
				columns : [{text : '试验',align : 'center',width : 100,renderer:sy},
				           {text : '工单号',dataIndex : 'ORDERID',align : 'center',width : 100},
				           {text : '电机名称',dataIndex : 'DJ_NAME',align : 'center',width : 100},
				           {text : '半成品试验结果',dataIndex : 'BCSY_RESULT',align : 'center',width : 100},
				           {text : '成品试验结果',dataIndex : 'CSY_RESULT',align : 'center',width : 100},
				           {text : '维修内容',dataIndex : 'MEND_CONTEXT',align : 'center',width : 100},
				           {text : '检修班组',dataIndex : 'MENDDEPT_NAME',align : 'center',width : 100}],
			    dockedItems:[northPanel],
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
		items : [grid]
	
	});
	Ext.getStore("gridStore").on('beforeload',function(){
		Ext.getStore('gridStore').proxy.extraParams.parVal = [Ext.util.Cookies.get("mm.plantcode"),Ext.getCmp('jxdw').getValue(),Ext.getCmp('gdh').getValue()];
		Ext.getStore('gridStore').proxy.extraParams.parName = ['a_plantcode','a_menddept','a_orderid'];
		Ext.getStore('gridStore').proxy.extraParams.parType = ['s','s','s'];
		Ext.getStore('gridStore').proxy.extraParams.proName = 'pg_dj605.getordersy';
		Ext.getStore('gridStore').proxy.extraParams.cursorName = 'ret';		
	});
	Bind();
});
function Bind(){
	Ext.getStore("gridStore").load();
}
function sy(value, metaData, record, rowIdx,colIdx, store, view) {
	return '<a href="javascript:void(0)" onclick="writeIn('+rowIdx+')">录入</a>';
}
function writeIn(rowIdx){
	var gobalOrderid=Ext.data.StoreManager.lookup('gridStore').getAt(rowIdx).data.ORDERID;
	window.showModalDialog(APP+"/page/DJ/DJ605add.jsp?orderid="+ gobalOrderid, '',"dialogHeight:700px;dialogWidth:1100px;minimize:yes;maximize:yes;");
}