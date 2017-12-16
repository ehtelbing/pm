var usercode = '';

if (location.href.split('?')[1] != null) {
	usercode = Ext.urlDecode(location.href.split('?')[1]).usercode;
}
var plantcode=Ext.util.Cookies.get("mm.plantcode");
var plant=Ext.util.Cookies.get("mm.plantname");
var departtype=Ext.util.Cookies.get("mm.departtype");
var departcode=Ext.util.Cookies.get("mm.departcode");
var departname=Ext.util.Cookies.get("mm.departname");
var userid=Ext.util.Cookies.get("mm.userid");
var username=Ext.util.Cookies.get("mm.username");
var departdata=[];

Ext.onReady(function() {
	var cfplantStore=Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'cfplantStore',
        fields: ['ID', 'NAME'],
        data:[{"ID":Ext.util.Cookies.get('v_orgCode'),"NAME":Ext.util.Cookies.get('v_orgname2')}]
    });
	var typeStore = Ext.create('Ext.data.Store', {
    	storeId: 'typeStore',
        fields: ['SERIES_CLASS', 'SERIES_CLASS_DESC'],
        autoLoad:true,
        proxy: {
        	type : 'ajax',
			url : AppUrl + 'DJ/pro_dj106_djseries_able',
			extraParams : {
			},
			actionMethods : {
				read : 'POST'
			},reader: {
                type: 'json',
                root: 'list'
            }
    }});
	var yxstatusStore = Ext.create('Ext.data.Store', {
    	storeId: 'yxstatusStore',
        fields: ['WORK_STATUS', 'WORK_STATUS_DESC'],
        autoLoad:true,
        proxy: {
        	type : 'ajax',
			url : AppUrl + 'DJ/pro_dj201_workstatus',
			extraParams : {
			},
			actionMethods : {
				read : 'POST'
			},reader: {
                type: 'json',
                root: 'list'
            }
    }});
	var yxstatusStore2 = Ext.create('Ext.data.Store', {
    	storeId: 'yxstatusStore2',
        fields: ['WORK_STATUS', 'WORK_STATUS_DESC'],
        autoLoad:true,
        proxy: {
        	type : 'ajax',
			url : AppUrl + 'DJ/pro_dj201_workstatus',
			extraParams : {
			},
			actionMethods : {
				read : 'POST'
			},reader: {
                type: 'json',
                root: 'list'
            }
    }});
	 var gridStore = Ext.create('Ext.data.Store', {
			id : 'gridStore',
			autoLoad : false,
			pageSize : 100,
			fields : ['DJ_UNIQUE_CODE', 'DJ_NAME', 'DJ_TYPE','DJ_SERIES_CLASS', 'DJ_VOL','DJ_V',
			          'DJ_CS','DJ_DXTYPE','DJ_WEIGHT','DJ_CS_DZ','DJ_CS_ZZ','WORK_STATUS','PLANTCODE',
			          'PLANTNAME','DEPARTCODE','DEPARTNAME','LOC_PLANTCODE','LOC_PLANTNAME','DJ_LOC',
			          'REMARK','INSERTDATE','DZ_V','DZ_A','ZZ_V','ZZ_A','W_YINSHU','EDZS','JXFS','JYDJ','SUPPLY_CODE',
			          'SUPPLY_NAME','PRODUCE_DATE'],
			proxy: {
	        	type : 'ajax',
				url : AppUrl + 'DJ/pro_dj201_djmainlist',
				actionMethods : {
					read : 'POST'
				},reader: {
	                type: 'json',
	                root: 'list'
	            }
			}/*,
			listeners : {
				beforeload : beforeGridStoreLoad
			}*/
		});
	var paneltop = Ext.create('Ext.panel.Panel', {
		style: 'background-color:#FFFFFF',
		baseCls: 'my-panel-no-border',
		region : 'north',frame:true,bodyPadding:5,
		layout:{type:'table',columns:3},
		defaults:{labelAlign:'right',labelWidth:60},
		items : [ 
				{ xtype: 'combo', id: "type", store: typeStore, editable: false, queryMode: 'local', fieldLabel: '系列分类', displayField: 'SERIES_CLASS_DESC', valueField: 'SERIES_CLASS'},
				{ xtype: 'combo', id: "cfplant", store: cfplantStore, editable: false, queryMode: 'local', fieldLabel: '所在单位', displayField: 'NAME', valueField: 'ID'},
				{xtype : 'textfield',id : 'cfwz',fieldLabel : '存放位置',selectOnFocus : true},
				{ xtype: 'combo', id: "yxstatus", store: yxstatusStore, editable: false, queryMode: 'local', fieldLabel: '运行状态', displayField: 'WORK_STATUS_DESC', valueField: 'WORK_STATUS'},
				{xtype : 'textfield',id : 'djname',fieldLabel : '电机名称',selectOnFocus : true},
				{xtype : 'textfield',id : 'djcode',fieldLabel : '电机编号',selectOnFocus : true},
				{xtype : 'textfield',id : 'djtype',fieldLabel : '电机型号',selectOnFocus : true}]
     });
   var panelbutton = Ext.create('Ext.panel.Panel', {
	   style: 'background-color:#FFFFFF',
	   baseCls: 'my-panel-no-border',
		region:'north',layout:'column',frame:true,
		items:[
		       {xtype:'button',text:'查 询',id:'query',margin:'0px 0px 5px 10px',icon:imgpath+'/search.png',handler:Bind},
		       {xtype:'button',text:'导出Excel',id:'excel',margin:'0px 0px 5px 10px',icon:imgpath+'/grid.png',handler:OutExcel},
			   {xtype:'button',text:'新 增',id:'add',margin:'0px 0px 5px 10px',icon:imgpath+'/add.png',handler:add}]
	});
	var grid = Ext.create('Ext.grid.Panel',{
		id : 'grid',
		style : 'margin:0 2px',
		region : 'center',
		columnLines : true,
		width : '100%',
		autoScroll : true,
		height : 400,
		store : gridStore,
		columns : [
		        {text : '编辑',dataIndex : 'DJ_UNIQUE_CODE',align : 'center',width : 60,renderer:djkey1},
				{text : '电机唯一编号',dataIndex : 'DJ_UNIQUE_CODE',align : 'center',width : 150,renderer:djkey},
				{text : '电机名称',dataIndex : 'DJ_NAME',align : 'center',width : 150,renderer:left},
				{text : '电机型号',dataIndex : 'DJ_TYPE',align : 'center',width : 150,renderer:left},
				{text : '系列分类',dataIndex : 'DJ_SERIES_CLASS',align : 'center',width : 100,renderer:left},
				{text : '容量',dataIndex:'DJ_VOL',align : 'center',width:80,renderer:left},
				{text : '存放单位名',dataIndex : 'LOC_PLANTNAME',align : 'center',flex:1,renderer:left},
				{text : '存放位置',dataIndex : 'DJ_LOC',align : 'center',flex:1,renderer:left},
				{text : '运行状态',dataIndex : 'WORK_STATUS',align : 'center',width:80,renderer:left}
				],
				bbar : [ '->', {
					xtype : 'pagingtoolbar',
					store : 'gridStore',
					dock : 'bottom',
					displayInfo : true,
					displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
					emptyMsg : '没有记录'
				} ]
	});
	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		items : [paneltop,panelbutton,grid ]
	});
	Ext.getCmp("cfplant").setValue(Ext.util.Cookies.get('v_orgCode'));
	//Ext.getStore('typeStore').load();
	Ext.getStore('typeStore').on("load",function(){
		Ext.getStore('typeStore').insert(0, { 'SERIES_CLASS': '%', 'SERIES_CLASS_DESC': '全部' });
		Ext.getCmp('type').select(typeStore.getAt(0));
		//Ext.getStore('yxstatusStore').load();
	});
	Ext.getStore('yxstatusStore').on("load",function(){
		Ext.getStore('yxstatusStore').insert(0, { 'WORK_STATUS': '%', 'WORK_STATUS_DESC': '全部' });
		Ext.getCmp('yxstatus').select(yxstatusStore.getAt(0));
		Bind();
	});

	Ext.data.StoreManager.lookup('gridStore').on('beforeload',function(store) {
		store.proxy.extraParams.plantcode_in = '%';
		store.proxy.extraParams.departcode_in = '%';
		store.proxy.extraParams.dj_series_class_in = Ext.getCmp("type").getValue();
		store.proxy.extraParams.loc_plantcode_in = Ext.getCmp("cfplant").getValue();
		store.proxy.extraParams.dj_loc_in = Ext.getCmp("cfwz").getValue();
		store.proxy.extraParams.work_status_in =Ext.getCmp("yxstatus").getValue();
		store.proxy.extraParams.dj_name_in = Ext.getCmp("djname").getValue();
		store.proxy.extraParams.dj_unique_code_in = '';
		store.proxy.extraParams.dj_code_in = Ext.getCmp("djcode").getValue();
		store.proxy.extraParams.dj_type_in = Ext.getCmp("djtype").getValue();
		store.proxy.extraParams.dj_vol_in ='%';
	});
});
function add(){

	window.open(AppUrl + "page/DJ/DJ201_add.html","", "dialogHeight:700px;dialogWidth:1100px");
}
function djkey(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return "<a href='javascript:keyopen(\""+value+"\");'>"+value+"</a>";
}
function beforeGridStoreLoad(store) {
	store.proxy.extraParams.parName = [ 'plantcode_in','loc_plantcode_in','dj_series_class_in','dj_loc_in','work_status_in',
			         'dj_name_in','dj_unique_code_in','dj_type_in', 'dj_vol_in'];
	store.proxy.extraParams.parVal = [ '%',
			        Ext.getCmp("cfplant").getValue(),
			        Ext.getCmp("type").getValue(),
			        Ext.getCmp("cfwz").getValue(),
			        Ext.getCmp("yxstatus").getValue(),
			        Ext.getCmp("djname").getValue(),
			        Ext.getCmp("djcode").getValue(),
			        Ext.getCmp("djtype").getValue(),'%'
			        ];
	store.proxy.extraParams.parType = ['s','s','s','s','s','s','s','s','s'];
	store.proxy.extraParams.proName = 'pro_dj201_djmainlist';
	store.proxy.extraParams.cursorName = 'ret';
}
function Bind(){
	Ext.getStore("gridStore").load();
}
function djkey1(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return "<a href='javascript:keyopen1(\""+value+"\");'>"+"编辑"+"</a>";
}
function keyopen1(value){//传入点击唯一编号
	window.open(AppUrl + "page/DJ/DJ201_add.html?djcode="+value,"", "dialogHeight:700px;dialogWidth:1100px");
}
function keyopen(value){
	window.open(AppUrl + "page/DJ/DJ202_menu.html?djcode="+value,"", "dialogHeight:700px;dialogWidth:1100px");
}
function left(value, metaData, record, rowIndex, colIndex, store){
	metaData.style="text-align:left;";
	return value;
}
function OutExcel() {

	var dj_series_class_in=Ext.getCmp('type').getValue()=='%'?'0':Ext.getCmp('type').getValue();
	var loc_plantcode_in=Ext.getCmp('cfplant').getValue()=='%'?'0':Ext.getCmp('cfplant').getValue();
	var work_status_in=Ext.getCmp('yxstatus').getValue()=='%'?'0':Ext.getCmp('yxstatus').getValue();

	document.location.href=AppUrl + 'DJ/DJ201EXCEL?plantcode_in='+''+
		'&departcode_in='+''+
		'&dj_series_class_in='+dj_series_class_in+
		'&loc_plantcode_in='+loc_plantcode_in+
		'&dj_loc_in='+Ext.getCmp("cfwz").getValue()+
		'&work_status_in='+work_status_in+
		'&dj_name_in='+Ext.getCmp("djname").getValue()+
		'&dj_unique_code_in='+''+
		'&dj_code_in='+Ext.getCmp("djcode").getValue()+
		'&dj_type_in='+Ext.getCmp("djtype").getValue()+
		'&dj_vol_in='+'';

	/*var tableName = [ "序号", "电机唯一编号", "电机名称", "电机型号", "系列分类", "容量", "所属厂矿名", "所属部门名",
			"存放单位名", "存放位置",'运行状态' ];
	var tableKey = [ "DJ_UNIQUE_CODE", "DJ_NAME", "DJ_TYPE", "DJ_SERIES_CLASS",
			"DJ_VOL", "PLANTNAME", "DEPARTNAME", "LOC_PLANTNAME",
			"DJ_LOC",'WORK_STATUS' ];
	var parName = ['plantcode_in','loc_plantcode_in','dj_series_class_in','dj_loc_in','work_status_in',
			         'dj_name_in','dj_unique_code_in','dj_type_in', 'dj_vol_in'];
	var parType = ['s','s','s','s','s','s','s','s','s'];
	var parVal = [ '%',
	               IsNull(Ext.getCmp("cfplant").getValue()),
	               IsNull(Ext.getCmp("type").getValue()),
	               IsNull(Ext.getCmp("cfwz").getValue()),
	               IsNull(Ext.getCmp("yxstatus").getValue()),
				   IsNull(Ext.getCmp("djname").getValue()),
				   IsNull(Ext.getCmp("djcode").getValue()),
				   IsNull(Ext.getCmp("djtype").getValue()),IsNull('')];
	var proName = 'pro_dj201_djmainlist';
	var cursorName = 'ret';
	var returnStr = [ 'null' ];
	var returnStrName = [ 'null' ];
	var returnStrType = [ 'null' ];
	submitData("ModelExcelTotal", tableName, tableKey, parName, parType,
	 parVal, proName,returnStr, returnStrName, returnStrType, cursorName,
	 "title", "电机设备数据");*/
}
function IsNull(value) {
	if (value == "" || value == null) {
		return 'null';
	} else {
		return value;
	}
}