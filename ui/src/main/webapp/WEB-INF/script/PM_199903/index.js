var rolecode='';
var orgcode='';
var deptcode='';
var redeptcode='';
if (location.href.split('?')[1] != undefined) {
	rolecode = Ext.urlDecode(location.href.split('?')[1]).rolecode;
	deptcode = Ext.urlDecode(location.href.split('?')[1]).deptcode;
	orgcode = Ext.urlDecode(location.href.split('?')[1]).orgcode;
	redeptcode = Ext.urlDecode(location.href.split('?')[1]).redeptcode;
}
Ext.onReady(function () {

	//页面表格信息加载
	var gridStore = Ext.create('Ext.data.Store', {
		id : 'gridStore',
		pageSize : 15,
		autoLoad : false,
		fields :['I_PERSONID','V_PERSONCODE','V_PERSONNAME','V_LOGINNAME','V_PASSWORD','V_DEPTCODE','V_CLASS_CODE',
				'V_CLASS_NAME','V_DEPTNAME','V_ROLECODE ','V_ROLENAME','V_POSTCODE',' V_POSTNAME ','I_ORDERID','V_CLASSCODE',
			   'I_ROLEID','I_DEPTID','I_POSTID','V_DEPTSMALLNAME','V_DEPTFULLNAME','V_DEPTTYPE','V_ORGCODE','V_ORGNAME'],
			proxy : {
			type : 'ajax',
			async : false,
			url : AppUrl + 'basic/PM_WORK_FLOW_PERBYROLE_SEL',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list',
				total : 'total'
			}
		},
		listeners: {
			beforeload: beforeQuery
		}
	});


	var northPanel = Ext.create('Ext.form.Panel', {
		region: 'north',
		layout:'column',
		frame: true,
		border: false,
		items: [
			{xtype:'textfield',id:'pername',fieldLabel: '人员名称',margin: '5 0 0 5',labelAlign:'right',labelWidth:70},
			{xtype: 'button',text: '查询', width : 60,margin:'5 0 5 20', icon: imgpath + '/search.png', handler:queryGrid},
			{xtype: 'button',text: '选择', width : 60,margin:'5 0 5 10',  icon: imgpath + '/add.png', handler:select}]
	});

	var gridPanel= Ext.create('Ext.grid.Panel', {
		id:'grid',
		region: 'center',
		border: false,
		store:'gridStore',
		selType:'checkboxmodel',
		columns:[
			{text: '序号', align: 'center', width: 50,xtype: 'rownumberer'},
			{text : '作业区',width : 200,dataIndex : 'V_DEPTNAME',align : 'center'} ,
			{text : '角色名称',width : 200,dataIndex : 'V_ROLENAME',align : 'center'} ,
			{text : '人员名称',width : 200,dataIndex : 'V_PERSONNAME',align : 'center'}
		],
		bbar:["->",
			{
				xtype: 'pagingtoolbar',
				store:gridStore,
				id:'gpage',
				width:'100%',
				dock: 'bottom',
				displayInfo: true,
				displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
				emptyMsg: '没有记录'
			}
		]
	});

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
			V_V_ORGCODE:orgcode,
			V_V_DEPTCODE: deptcode,
			V_V_ROLECODE: rolecode,
			V_V_PERNAME:  Ext.getCmp('pername').getValue(),
			V_V_PAGE: Ext.getCmp('gpage').store.currentPage,
			V_V_PAGESIZE:Ext.getCmp('gpage').store.pageSize
		}
	});
}

function beforeQuery(store) {
	store.proxy.extraParams.V_V_ORGCODE =orgcode;
	store.proxy.extraParams.V_V_DEPTCODE = deptcode;
	store.proxy.extraParams.V_V_ROLECODE = rolecode;
	store.proxy.extraParams.V_V_PERNAME = Ext.getCmp('pername').getValue();
	store.proxy.extraParams.V_V_PAGE =  Ext.getCmp('gpage').store.currentPage;
	store.proxy.extraParams.V_V_PAGESIZE = Ext.getCmp('gpage').store.pageSize;
}


//选择
function select() {
	var retdata=[];
	var pernamedata='';
	var percodedata='';
	var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
	var length=seldata.length;
	if(length==0){
		Ext.Msg.alert("操作信息","请选择一条记录进行选择！");
		return false;
    }else{
		for(var i=0;i<length;i++){
			if(i==0){
				percodedata=seldata[i].data.V_PERSONCODE;
				pernamedata=seldata[i].data.V_PERSONNAME;
			}else{
				percodedata=percodedata+','+seldata[i].data.V_PERSONCODE;
				pernamedata=pernamedata+','+seldata[i].data.V_PERSONNAME;
			}
		}
	}
	retdata.push(percodedata);
	retdata.push(pernamedata);
	window.opener.getReturnPer(retdata);
	window.close();
}