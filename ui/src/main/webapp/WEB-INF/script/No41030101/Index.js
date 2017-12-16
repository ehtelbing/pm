var id=Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
Ext.onReady(function () {
	Ext.QuickTips.init();

	var gridStore=Ext.create('Ext.data.Store',{
		id: 'gridStore',
		autoLoad: true,
		fields: ['V_TOOL' , 'V_TECHNOLOGY', 'V_SAFE', 'V_OTHERREASON', 'V_REPAIRCONTENT',
			'V_REPAIRSIGN', 'V_REPAIRPERSON', 'V_POSTMANSIGN', 'V_CHECKMANCONTENT', 'V_CHECKMANSIGN',
			'V_WORKSHOPCONTENT', 'V_WORKSHOPSIGN','V_DEPTSIGN','I_OTHERHOUR'],
		proxy: {
			type: 'ajax',
			async: false,
			url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_LISHI',
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json',
				root: 'list'
			},
			extraParams:{
				V_V_ORDERGUID:id
			}
		}
	});


	var grid=Ext.create('Ext.grid.Panel',{
		id: 'grid',
		columnLines: true,
		width: '100%',
		autoScroll: true,
		region:'center',
		store:gridStore,
		height: 400,
		columns:[{text:'选中',width:60,align:'center',renderer : function() {return "<img src='../../Themes/gif/spellcheck.png' style='cursor:pointer' onclick='importClick()' />";}},
			{ text: '提前、逾期时间', width: 100, dataIndex: 'I_OTHERHOUR', align: 'center',renderer : CreateGridColumnTd},
			{ text: '逾期原因', width: 80, dataIndex: 'V_OTHERREASON', align: 'center',renderer : CreateGridColumnTd},
			{ text: '检修方说明', width: 80, dataIndex: 'V_REPAIRCONTENT', align: 'center',renderer : CreateGridColumnTd},
			{ text: '检修方签字', width: 80, dataIndex: 'V_REPAIRSIGN', align: 'center',renderer : CreateGridColumnTd},
			{ text: '检修人员', width: 80, dataIndex: 'V_REPAIRPERSON', align: 'center',renderer : CreateGridColumnTd},
			{ text: '岗位签字', width: 80, dataIndex: 'V_POSTMANSIGN', align: 'center',renderer : CreateGridColumnTd},
			{ text: '点检员验收意见', width: 100, dataIndex: 'V_CHECKMANCONTENT', align: 'center',renderer : CreateGridColumnTd},
			{ text: '点检员签字', width: 80, dataIndex: 'V_CHECKMANSIGN', align: 'center',renderer : CreateGridColumnTd},
			{ text: '作业区验收', width: 80, dataIndex: 'V_WORKSHOPCONTENT', align: 'center',renderer : CreateGridColumnTd},
			{ text: '库管员签字', width: 80, dataIndex: 'V_WORKSHOPSIGN', align: 'center',renderer : CreateGridColumnTd},
			{ text: '部门签字', width: 80, dataIndex: 'V_DEPTSIGN', align: 'center',renderer : CreateGridColumnTd}]
	});

	Ext.create('Ext.container.Viewport', {
		id: "vieid",
		layout: 'border',
		items: [grid]
	});


});

function importClick(){
	var I_OTHERHOUR=Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.I_OTHERHOUR;
	var V_OTHERREASON=Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.V_OTHERREASON;
	var V_REPAIRCONTENT=Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.V_REPAIRCONTENT;
	var V_REPAIRSIGN=Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.V_REPAIRSIGN;
	var V_REPAIRPERSON=Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.V_REPAIRPERSON;
	var V_POSTMANSIGN=Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.V_POSTMANSIGN;
	var V_CHECKMANCONTENT=Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.V_CHECKMANCONTENT;
	var V_CHECKMANSIGN=Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.V_CHECKMANSIGN;
	var V_WORKSHOPCONTENT=Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.V_WORKSHOPCONTENT;
	var V_WORKSHOPSIGN=Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.V_WORKSHOPSIGN;
	var V_DEPTSIGN=Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.V_DEPTSIGN;

	window.returnValue=I_OTHERHOUR+"^"+V_OTHERREASON+"^"+V_REPAIRCONTENT+"^"+V_REPAIRSIGN+"^"+V_REPAIRPERSON+"^"+
		V_POSTMANSIGN+"^"+V_CHECKMANCONTENT+"^"+V_CHECKMANSIGN+"^"+V_WORKSHOPCONTENT+"^"+V_WORKSHOPSIGN+"^"+V_DEPTSIGN;
	window.close();
}

function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;color:" + store.getAt(rowIndex).get('V_STATECOLOR');
	return '<div data-qtip="' + value + '" >' + value + '</div>';
}