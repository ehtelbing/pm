var djcode = "";
if (location.href.split('?')[1] != undefined) {
	djcode = Ext.urlDecode(location.href.split('?')[1]).djcode;
}
Ext.onReady(function() {
	var panel = Ext.create('Ext.panel.Panel', {
		contentEl : 'main',
		region : 'center',
		height:800
	});
	var panel2 = Ext.create('Ext.panel.Panel', {
		style: 'background-color:#FFFFFF',
		region : 'north',
		baseCls : 'my-panel-no-border',
		items : [ {
			xtype : 'button',
			text : '维护记录',
			style : ' margin: 10px 0px 5px 10px',
			//icon : imgpath + '/page_text.gif',
			colspan : 4,
			id : 'whjl',
			handler : whjl
		}, {
			xtype : 'button',
			text : '关 闭',
			style : ' margin: 10px 0px 5px 10px',
			icon : imgpath + '/error_16x16.gif',
			handler : function() {
				window.close();
			}
		} ]
	});
	
	var otherGridStore = Ext.create('Ext.data.Store', {
		id : 'otherGridStore',
		autoLoad : false,
		fields : [ 'ORDERID', 'ACT_ENDDATE', 'MEND_CONTEXT', 'MEND_USERNAME',
				'BUILD_REMARK' ],
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj201_djmendrecord',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			}
		}
	});
	var otherGrid = Ext.create('Ext.grid.Panel', {
		id : 'otherGrid',
		style : 'margin:0 2px',
		region : 'center',
		columnLines : true,
		width : '100%',
		autoScroll : true,
		height : 400,
		store : otherGridStore,
		columns : [ {
			text : '维修日期',
			dataIndex : 'ACT_ENDDATE',
			align : 'center',
			width : 150,
			renderer : left
		}, {
			text : '检修单号',
			dataIndex : 'ORDERID',
			align : 'center',
			width : 150,
			renderer : left
		}, {
			text : '维修人',
			dataIndex : 'MEND_USERNAME',
			align : 'center',
			width : 150,
			renderer : left
		}, {
			text : '检修内容',
			dataIndex : 'MEND_CONTEXT',
			align : 'center',
			width : 100,
			renderer : left
		}, {
			text : '备注说明',
			dataIndex : 'BUILD_REMARK',
			align : 'center',
			width : 80,
			renderer : left
		} ],
		bbar : [ '->', {
			xtype : 'pagingtoolbar',
			store : 'otherGridStore',
			dock : 'bottom',
			displayInfo : true,
			displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
			emptyMsg : '没有记录'
		} ]
	});
	var panel3 = Ext.create('Ext.panel.Panel', {
		region : 'south',
		height:280,
		baseCls : 'my-panel-no-border',
		items : [ otherGrid]
	});
	var gridStore = Ext.create('Ext.data.Store', {
		id : 'gridStore',
		autoLoad : false,
		fields : [ 'ID', 'DJ_UNIQUE_CODE', 'OP_TYPE', 'OP_CONTEXT', 'OP_DATE',
				'OP_USERID', 'OP_USERNAME', 'REMARK' ],
		proxy : {
			type : 'ajax',
			url : AppUrl + 'DJ/pro_dj201_djoplog',
			extraParams : {
				dj_unique_code_in:djcode
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
	var grid = Ext.create('Ext.grid.Panel', {
		style: 'background-color:#FFFFFF',
		baseCls : 'my-panel-no-border',
		id : 'grid',
		region : 'south',
		columnLines : true,
		width : '100%',
		autoScroll : true,
		store : gridStore,
		columns : [ {
			text : '操作日期',
			dataIndex : 'OP_DATE',
			align : 'center',
			width : 110,
			renderer : date
		}, {
			text : '操作人',
			dataIndex : 'OP_USERNAME',
			align : 'left',
			width : 100
		}, {
			text : '维护类型',
			dataIndex : 'OP_TYPE',
			align : 'left',
			width : 100
		}, {
			text : '维护内容',
			dataIndex : 'OP_CONTEXT',
			align : 'left',
			flex : 2
		}, {
			text : '备注说明',
			dataIndex : 'REMARK',
			align : 'center',
			flex : 1
		} ]
	});

	
	var dialog = Ext.create('Ext.window.Window', {
		style: 'background-color:#FFFFFF',
		id : 'dialog',
		title : '维护记录',
		height : 300,
		//closeAction : 'hide',
		autoScroll : true,
		width : 650,
		//modal : true,
		//frame : true,
		layout : 'border',
		items : [grid]
	});
	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		items : [ panel2,panel,panel3]
	});
	Bind_data();
	
	Ext.getStore("otherGridStore").load({
		params : {
			a_dj_unique_code:djcode
		}
	});
});

function left(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return value;
}

function whjl() {
	Ext.getStore("gridStore").load();
	Ext.getCmp("dialog").show();
}
function Bind_data() {
	Ext.Ajax.request({
		url : AppUrl + 'DJ/pro_dj201_djmaindetail',
		method : 'POST',
		async : false,
		params : {
			dj_unique_code_in:djcode
		},
		success : function(resp) {
			var resp = Ext.JSON.decode(resp.responseText);
			if (resp.list.length > 0) {
				Ext.fly('key').setHTML(resp.list[0].DJ_UNIQUE_CODE);// key
				Ext.fly('eqname').setHTML(resp.list[0].DJ_NAME);// 电机名称
				Ext.fly('djxh').setHTML(resp.list[0].DJ_TYPE);// 电机型号
				Ext.fly('type').setHTML(resp.list[0].DJ_SERIES_CLASS);// 电机系列分类
				Ext.fly('rl').setHTML(resp.list[0].DJ_VOL);// 容量
				Ext.fly('dy').setHTML(resp.list[0].DJ_V);// 电压
				Ext.fly('cs').setHTML(resp.list[0].DJ_CS);// 槽数
				Ext.fly('dxgg').setHTML(resp.list[0].DJ_DXTYPE);// 导线规格
				Ext.fly('zl').setHTML(resp.list[0].DJ_WEIGHT);// 重量
				Ext.fly('dzcs').setHTML(resp.list[0].DJ_CS_DZ);// 定子槽数
				Ext.fly('zzcs').setHTML(resp.list[0].DJ_CS_ZZ);// 转子槽数
				Ext.fly('yxstatus').setHTML(resp.list[0].WORK_STATUS);// 运行状态
				Ext.fly('plant').setHTML(resp.list[0].PLANTNAME);// 所属厂矿
				Ext.fly('depart').setHTML(
						Ext.String.trim(resp.list[0].DEPARTNAME));// 所属部门
				Ext.fly('cfplant').setHTML(resp.list[0].LOC_PLANTNAME);// 存放单位
					Ext.fly('cfdepart').setHTML(resp.list[0].LOC_DEPARTNAME);
				Ext.fly('cfwz').setHTML(resp.list[0].DJ_LOC);// 存放位置
				Ext.fly('memo').setHTML(resp.list[0].REMARK);// 备注
				Ext.fly('dzdy').setHTML(resp.list[0].DZ_V);// 定子电压
				Ext.fly('dzdl').setHTML(resp.list[0].DZ_A);// 定子电流
				Ext.fly('zzdy').setHTML(resp.list[0].ZZ_V);// 转子电压
				Ext.fly('zzdl').setHTML(resp.list[0].ZZ_A);// 转子电流
				Ext.fly('glys').setHTML(resp.list[0].W_YINSHU);// 功率因数
				Ext.fly('edzs').setHTML(resp.list[0].EDZS);// 额定转数
				Ext.fly('jxfs').setHTML(resp.list[0].JXFS);// 接线方式
				Ext.fly('jydj').setHTML(resp.list[0].JYDJ);// 绝缘等级
				Ext.fly('cjbm').setHTML(resp.list[0].SUPPLY_CODE);// 生产厂家编码
				Ext.fly('cjmc').setHTML(resp.list[0].SUPPLY_NAME);// 生产厂家名称
				Ext.fly('scrq').setHTML(resp.list[0].PRODUCE_DATE);// 生产时间
				Ext.fly('bxq').setHTML(resp.list[0].BX_DATE);
				Ext.fly('djbhh').setHTML(resp.list[0].DJ_CODE);// 电机编号，后来新增的
			}
		}
	});
}
function date(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return value.substr(0, 10);
}