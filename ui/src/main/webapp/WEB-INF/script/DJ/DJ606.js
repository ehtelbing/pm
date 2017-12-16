//任务名称：DJ606.试验信息查询-工单列表查询
//任务编号：33495  33496 
//完成人：刘旭
//完成时间：2015/10/06
Ext.onReady(function() {
	var jxdwStore = Ext.create("Ext.data.Store", {//检修单位
		autoLoad : true,
		storeId : 'jxdwStore',
		fields : [ 'MENDDEPT_CODE', 'MENDDEPT_NAME' ],
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
				parName : [ 'usercode_in','plantcode_in' ],
				parType : [ 's','s' ],
				parVal : [ Ext.util.Cookies.get("mm.userid"),
				           Ext.util.Cookies.get("mm.plantcode")],
				proName : 'pro_dj603_menddept',
				cursorName : 'ret'
			}
		}
	});
	var gridStore = Ext.create('Ext.data.Store', {
		autoLoad :false,
		pageSize : 200,
		storeId : 'gridStore',
		fields : ['ORDERID','DJ_NAME','BCSY_RESULT',	
		           'CSY_RESULT','MEND_CONTEXT','MENDDEPT_NAME'],
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

	
	var northPanel = Ext.create('Ext.panel.Panel', {
		xtype : 'panel',
		region : 'north',
		frame : true,
		baseCls : 'my-panel-no-border',
		layout : {
			type : 'vbox',
			align : 'stretch'
		},
		items : [ {
			xtype : 'panel',
			frame : true,
			layout : 'hbox',
			items : [ {
				id : 'jxdw',
				xtype : 'combo',
				fieldLabel : '检修单位',
				store : jxdwStore,
				editable : false,
				displayField : 'MENDDEPT_NAME',
				valueField : 'MENDDEPT_CODE',
				queryMode : 'local',
				style : 'margin: 5px 0px 5px 5px',
				labelAlign : 'right',
				labelWidth : 80,
			}, {
				xtype : 'textfield',
				id : 'gdh',
				style : 'margin: 5px 0px 5px 5px',
				fieldLabel : '工单号',
				labelAlign : 'right',
				queryMode : 'local',
				labelWidth : 80
			}]
		},{
			xtype : 'panel',
			frame : true,
			layout : 'hbox',
			items : [ {
				id:'begindate', 
				xtype: 'datefield',
				fieldLabel: '送修日期',
				format:'Y-m-d',
				value:getDate(),
				style : 'margin: 5px 0px 5px 5px',
				labelAlign:'right',
				labelWidth:80
				},{
					id:'enddate', 
					xtype: 'datefield',
					fieldLabel: '到',
					format:'Y-m-d',
					value:getDate("end"),
					style : 'margin: 5px 0px 5px 5px',
					labelAlign:'center',
					labelWidth:80
				},{
				xtype : 'button',
				style : ' margin: 5px 0px 0px 10px',
				text : '查询',
				labelAlign:'right',
				labelWidth:80,
				icon : imgpath + '/a1.gif',
				handler : function() {
					onSearch();
				}
			}]

		} ]
	});
	
	var grid = Ext.create('Ext.grid.Panel',{
				id : 'grid',
				region : 'center',
				columnLines : true,
				width : '100%',
				title : '试验信息查询',
				autoScroll : true,
				store : gridStore,
				dufaults : {
					width : 120
				},
				columns : [
						{
							text : '试验',
							align : 'center',
							dataIndex : 'ORDERID',
							width : 100,
							renderer : look
						}, {
							text : '工单号',
							dataIndex : 'ORDERID',
							align : 'center',
							width : 130//,
//							editor : {
//								xtype : 'numberfield'
//							},
						}, {
							text : '电机名称',
							dataIndex : 'DJ_NAME',
							align : 'center',
							width : 130
						}, {
							text : '半成品试验结果',
							dataIndex : 'BCSY_RESULT',
							align : 'center',
							width : 130
						}, {
							text : '成品试验结果',
							dataIndex : 'CSY_RESULT',
							align : 'center',
							width : 130
						}, {
							text : '维修内容',
							dataIndex : 'MEND_CONTEXT',
							align : 'center',
							width : 130
						}, {
							text : '检修班组',
							dataIndex : 'MENDDEPT_NAME',
							align : 'center',
							width : 180
						}],
				bbar : [ '->', {
					xtype : 'pagingtoolbar',
					id : 'pagingtoolbar',
					dock : 'bottom',
					displayInfo : true,
					displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
					emptyMsg : '没有记录',
					store : 'gridStore'
				} ]
			});
	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		autoScroll : true,
		items : [ northPanel,grid ]
	});
	
	Ext.getStore('jxdwStore').on('load', function(me) {
		Ext.getCmp('jxdw').select(me.first());
	});
	
	 //onSearch();
});

function getDate(type) {
	
	  var d = new Date();
	  var month = d.getMonth()+1;
	  if(month<10){month="0"+month;}
	  
    var date = '';
	  if(type==null){
	  	date =  d.getFullYear()+"-"+month+"-01";
	  }else{
	     var days = new Date(d.getFullYear(), d.getMonth()+1, 0);
	     date = days.getDate(); ;
	  }
	  return date;
}
function onSearch() {
	//if (Ext.getCmp('gdh').getValue()=='') {
	//	 Ext.example.msg("提示",'请输入工单号');
	//}
	//else{
	Ext.getStore("gridStore").load({
		params:{
			parName : ['a_plantcode', 'a_menddept', 'a_orderid',
						'a_begindate','a_enddate'],
			parType : ['s', 's', 's', 'da','da' ],
			parVal:[Ext.util.Cookies.get("mm.plantcode"),
			        Ext.getCmp('jxdw').getValue(),
			        Ext.getCmp('gdh').getValue(),
			        Ext.Date.format(Ext.getCmp('begindate').getValue(), 'Y-m-d'),
					Ext.Date.format(Ext.getCmp('enddate').getValue(), 'Y-m-d')],
			proName : 'pg_dj606.getordersy',
			cursorName : 'ret'
		}
	});
//}
	

}

function look(value, metaData, record, rowIdx, colIdx, store, view) {
	return '<a href="javascript:void(0)" onclick="onlook('+rowIdx+')">查看</a>';
//return '<a href="javascript:onlook(\'' + record.data.rowIdx + '\')">查看</a>';
}
function onlook(rowIdx) {
	var gobalOrderid=Ext.data.StoreManager.lookup('gridStore').getAt(rowIdx).data.ORDERID;
	var dialog = window.open(AppUrl + "/DJ/DJ606Select.jsp?ORDERID="
			+ gobalOrderid); // 查看界面
}