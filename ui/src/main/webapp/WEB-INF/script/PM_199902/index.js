var V_FLOWTYPE=null;
if (location.href.split('?')[1] != undefined) {
	V_FLOWTYPE = Ext.urlDecode(location.href.split('?')[1]).V_FLOWTYPE;
}
//页面表格信息加载
var gridStore = Ext.create('Ext.data.Store', {
	id : 'gridStore',
	pageSize : 15,
	autoLoad : false,
	fields :['I_ID', 'V_BZ', 'V_FLOWTYPE', 'V_MS', 'V_ORDER', 'V_URL'],
	proxy : {
		type : 'ajax',
		async : false,
		url : AppUrl + 'pm_19/PM_FLOW_PAGE_SEL',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list',
			total : 'total'
		}
	}
});
var gridPanel= Ext.create('Ext.grid.Panel', {
	id:'grid',
	region: 'center',
	border: false,
	store:'gridStore',
	selType:'checkboxmodel',
	columns:[
		{text: '序号', align: 'center', width: 50,xtype: 'rownumberer'},
		{text : '页面地址',width : 200,dataIndex : 'V_URL',align : 'center'},
		{text : '备注',width : 200,dataIndex : 'V_BZ',align : 'center'} ,
		{text : '页面描述',width : 200,dataIndex : 'V_MS',align : 'center'}
	],
	bbar:["->",
		{
			xtype: 'pagingtoolbar',
			store:gridStore,
			width:'100%',
			dock: 'bottom',
			displayInfo: true,
			displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
			emptyMsg: '没有记录'
		}
	]
});

var northPanel = Ext.create('Ext.form.Panel', {
	region: 'north',
	frame: true,
	border: false,
	//baseCls: 'my-panel-no-border',
	items: [
		{xtype: 'button',text: '查询', width : 60,margin:'5 0 5 20', icon: imgpath + '/search.png', handler:queryGrid},
		{xtype: 'button',text: '选择', width : 60,margin:'5 0 5 10',  icon: imgpath + '/add.png', handler:select},
	]
});


Ext.onReady(function () {
	Ext.create('Ext.container.Viewport', {
		layout:'border',
		items: [northPanel,gridPanel]
	});
	queryGrid();
});
//查询
function queryGrid() {
	Ext.data.StoreManager.lookup('gridStore').load({
		params: {
			V_V_FLOWTYPE:V_FLOWTYPE
		}
	});
}
//选择
function select() {
	var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
	var length=seldata.length;
	if(length!=1){
		Ext.Msg.alert("操作信息","请选择一条记录进行选择！");
		return false;
    }
	var retdata=[];
	retdata.push(seldata[0].data.V_URL);
	retdata.push(seldata[0].data.V_BZ);
	window.opener.getReturnDZ(retdata);
	window.close();
}