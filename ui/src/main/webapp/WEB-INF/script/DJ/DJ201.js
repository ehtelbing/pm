var plantcode=Ext.util.Cookies.get("mm.plantcode");
var plant=Ext.util.Cookies.get("mm.plantname");
var departtype=Ext.util.Cookies.get("mm.departtype");
var departcode=Ext.util.Cookies.get("mm.departcode");
var departname=Ext.util.Cookies.get("mm.departname");
var userid=Ext.util.Cookies.get("mm.userid");
var username=Ext.util.Cookies.get("mm.username");
var departdata=[];
Ext.onReady(function() {

	var ckCStore = Ext.create("Ext.data.Store", {
		autoLoad : false,
		storeId : 'ckCStore',
		fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
		data:[{"V_DEPTCODE":Ext.util.Cookies.get('v_orgCode'),"V_DEPTNAME":Ext.util.Cookies.get('v_orgname2')}]
	});
	var ckstore = Ext.create("Ext.data.Store", {
		autoLoad : true,
		storeId : 'ckstore',
		fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
		proxy : {
			type : 'ajax',
			async : false,
			url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			},
			extraParams : {
				'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
				'V_V_DEPTCODE':  Ext.util.Cookies.get('v_orgCode'),
				'V_V_DEPTCODENEXT': Ext.util.Cookies.get('v_deptcode'),
				'V_V_DEPTTYPE': '基层单位'
			}
		}
	});

	var zyqstore = Ext.create("Ext.data.Store", {
		autoLoad : true,
		storeId : 'zyqstore',
		fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
		proxy : {
			type : 'ajax',
			async : false,
			url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			},
			extraParams : {
				'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
				'V_V_DEPTCODE':   Ext.util.Cookies.get('v_orgCode'),
				'V_V_DEPTCODENEXT':  Ext.util.Cookies.get('v_deptcode'),
				'V_V_DEPTTYPE':'[主体作业区]'
			}
		}
	});

	var typeStore = Ext.create('Ext.data.Store', {
    	storeId: 'typeStore',
        fields: ['SERIES_CLASS', 'SERIES_CLASS_DESC'],
        autoLoad:false,
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
			{id : 'ck',xtype : 'combo',store : ckCStore,editable : false,fieldLabel : '厂矿',displayField : 'V_DEPTNAME', valueField : 'V_DEPTCODE',queryMode : 'local'},
			{id : 'zyq',xtype : 'combo',store : zyqstore,editable : false,fieldLabel : '所属部门', displayField : 'V_DEPTNAME',valueField : 'V_DEPTCODE',queryMode : 'local'},
				{ xtype: 'combo', id: "type", store: typeStore, editable: false, queryMode: 'local', fieldLabel: '系列分类', displayField: 'SERIES_CLASS_DESC', valueField: 'SERIES_CLASS'},
				{ xtype: 'combo', id: "cfplant", store: ckstore, editable: false, queryMode: 'local', fieldLabel: '存放单位', displayField: 'V_DEPTNAME', valueField: 'V_DEPTCODE'},
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
		       {xtype:'button',text:'导出Excel',id:'excel',margin:'0px 5px 0px 10px',icon:imgpath+'/grid.png',handler:OutExcel},
		       {xtype:'button',text:'新 增',id:'add',margin:'0px 0px 5px 10px',icon:imgpath+'/add.png',handler:add}
		       ]
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
				{text : '电机唯一编号',dataIndex : 'DJ_UNIQUE_CODE',align : 'center',width : 100,renderer:djkey},
				{text : '电机名称',dataIndex : 'DJ_NAME',align : 'center',width : 150,renderer:left},
				{text : '电机型号',dataIndex : 'DJ_TYPE',align : 'center',width : 150,renderer:left},
				{text : '系列分类',dataIndex : 'DJ_SERIES_CLASS',align : 'center',width : 100,renderer:left},
				{text : '容量',dataIndex:'DJ_VOL',align : 'center',width:80,renderer:left},
				{text : '所属厂矿名',dataIndex:'PLANTNAME',align : 'center',width:110,renderer:left},
				{text : '所属部门名',dataIndex : 'DEPARTNAME',align : 'center',width:110,renderer:left},
				{text : '存放单位名',dataIndex : 'LOC_PLANTNAME',align : 'center',width:110,renderer:left},
				{text : '存放位置',dataIndex : 'DJ_LOC',align : 'center',width:90,renderer:left},
				{text : '运行状态',dataIndex : 'WORK_STATUS',align : 'center',width:80,renderer:status}
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
	var dialog2 = Ext.create('Ext.window.Window', {
        id: 'dialog2', title: '调整运行状态', height: 250, closeAction: 'hide', width: 350,modal: true,frame:true,	
        defaults: { labelAlign: 'right', labelWidth: 120, style: 'margin:12px 0px 0px 0px' },
        items: [{ xtype: 'textfield',id:'d2key', fieldLabel: '选中电机唯一编号',readOnly:true},
                { xtype: 'combo', id: "d2status", store: yxstatusStore2, editable: false, queryMode: 'local', fieldLabel: '当前运行状态', displayField: 'WORK_STATUS_DESC', valueField: 'WORK_STATUS'},
                { xtype: 'textareafield',id:'d2memo', fieldLabel: '修改说明'}],
                buttons:[{text:'确认',handler:d2btnqr}]
	});
	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		items : [paneltop,panelbutton,grid ]
	});

	Ext.getCmp("ck").select(ckCStore.getAt(0));

	Ext.getStore('ckstore').on("load", function() {
		Ext.getStore('ckstore').insert(0, { 'V_DEPTCODE': '%', 'V_DEPTNAME': '全部' });
		Ext.getCmp("cfplant").select(ckstore.getAt(0));
	});
	Ext.data.StoreManager.lookup('zyqstore').on("load", function() {
		Ext.getCmp("zyq").select(Ext.data.StoreManager.lookup('zyqstore').getAt(0));
	});


	Ext.getStore('typeStore').load();
	Ext.getStore('typeStore').on("load",function(){
		Ext.getStore('typeStore').insert(0, { 'SERIES_CLASS': '%', 'SERIES_CLASS_DESC': '全部' });
		Ext.getCmp('type').select(typeStore.getAt(0));
	});
	Ext.getStore('yxstatusStore').on("load",function(){
		Ext.getStore('yxstatusStore').insert(0, { 'WORK_STATUS': '%', 'WORK_STATUS_DESC': '全部' });
		Ext.getCmp('yxstatus').select(yxstatusStore.getAt(0));
		Bind();
	});

	Ext.data.StoreManager.lookup('gridStore').on('beforeload',function(store) {
		store.proxy.extraParams.plantcode_in = Ext.getCmp("ck").getValue();
		store.proxy.extraParams.departcode_in = Ext.getCmp("zyq").getValue();
		store.proxy.extraParams.dj_series_class_in = Ext.getCmp("type").getValue();
		store.proxy.extraParams.loc_plantcode_in = Ext.getCmp("cfplant").getValue();
		store.proxy.extraParams.dj_loc_in = Ext.getCmp("cfwz").getValue();
		store.proxy.extraParams.work_status_in =Ext.getCmp("yxstatus").getValue();
		store.proxy.extraParams.dj_name_in = Ext.getCmp("djname").getValue();
		store.proxy.extraParams.dj_unique_code_in = '';
		store.proxy.extraParams.dj_code_in = Ext.getCmp("djcode").getValue();
		store.proxy.extraParams.dj_type_in = Ext.getCmp("djtype").getValue();
		store.proxy.extraParams.dj_vol_in ='';
	});
});
function d2btnqr(){

	Ext.Ajax.request({
		url: AppUrl + 'DJ/pro_dj201_updateworkstatus',
		method : 'POST',
		async : false,
		params : {
			dj_unique_code_in:Ext.getCmp("d2key").getValue(),
			WORK_STATUS_in:Ext.getCmp("d2status").getValue(),
			OP_USERID_in:Ext.util.Cookies.get('v_personcode'),
			OP_USERNAME_in:Ext.util.Cookies.get('v_personname2'),
			REMARK_in:Ext.getCmp("d2memo").getValue()
		},
		success : function(resp) {
			var resp = Ext.JSON.decode(resp.responseText);
			if (resp.ret == 'Success') {
				alert("操作成功!");
				Ext.getCmp("dialog2").close();
				Bind();
			} else {
				alert("操作失败!");
			}
		}
	});
}
function add(){
	//var str=window.showModalDialog(APP+"/page/DJ/DJ201_add.jsp", '',"dialogHeight:670px;dialogWidth:1250px;minimize:yes;maximize:yes;");
	window.open(AppUrl + "page/DJ/DJ201_add.html","", "dialogHeight:700px;dialogWidth:1100px");
}
function beforeGridStoreLoad(store) {

	/*store.proxy.extraParams.parName = [ 'plantcode_in','loc_plantcode_in','dj_series_class_in','dj_loc_in','work_status_in',
			         'dj_name_in','dj_unique_code_in','dj_type_in', 'dj_vol_in'];
	store.proxy.extraParams.parVal = [ Ext.getCmp("plant").getValue(),
			        Ext.getCmp("cfplant").getValue(),
			        Ext.getCmp("type").getValue(),
			        Ext.getCmp("cfwz").getValue(),
			        Ext.getCmp("yxstatus").getValue(),
			        Ext.getCmp("djname").getValue(),
			        Ext.getCmp("djcode").getValue(),
			        Ext.getCmp("djtype").getValue(),'%'
			        ];
	store.proxy.extraParams.parType = [ 's','s','s','s','s','s','s','s','s'];
	store.proxy.extraParams.proName = 'pro_dj201_djmainlist';
	store.proxy.extraParams.cursorName = 'ret';*/
}
function Bind(){
	Ext.data.StoreManager.lookup('gridStore').load();
}
function djkey(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return "<a href='javascript:keyopen(\""+value+"\");'>"+value+"</a>";
}
function status(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return "<a href=javascript:openstatus(\""+rowIndex+"\");>"+value+"</a>";
}
function openstatus(rowIndex){
	Ext.getStore('yxstatusStore2').load();
	var DJ_UNIQUE_CODE=Ext.getStore('gridStore').getAt(rowIndex).get("DJ_UNIQUE_CODE");
	
	var WORK_STATUS=Ext.getStore('gridStore').getAt(rowIndex).get("WORK_STATUS");
	Ext.getCmp("d2key").setValue(DJ_UNIQUE_CODE);
	Ext.getCmp("d2status").select(WORK_STATUS);
	Ext.getCmp("d2memo").setValue("");
	Ext.getCmp("dialog2").show();
}
function keyopen(value){//传入点击唯一编号
	window.open(AppUrl + "page/DJ/DJ201_add.html?djcode="+value,"", "dialogHeight:700px;dialogWidth:1100px");
}
function left(value, metaData, record, rowIndex, colIndex, store){
	metaData.style="text-align:left;";
	return value;
}
function OutExcel() {

	var plantcode_in=Ext.getCmp('ck').getValue()=='%'?'0':Ext.getCmp('ck').getValue();
	var departcode_in=Ext.getCmp('zyq').getValue()=='%'?'0':Ext.getCmp('zyq').getValue();
	var dj_series_class_in=Ext.getCmp('type').getValue()=='%'?'0':Ext.getCmp('type').getValue();
	var loc_plantcode_in=Ext.getCmp('cfplant').getValue()=='%'?'0':Ext.getCmp('cfplant').getValue();
	var work_status_in=Ext.getCmp('yxstatus').getValue()=='%'?'0':Ext.getCmp('yxstatus').getValue();

	document.location.href=AppUrl + 'DJ/DJ201EXCEL?plantcode_in='+plantcode_in+
		'&departcode_in='+departcode_in+
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
	var parVal = [ IsNull(Ext.getCmp("plant").getValue()),
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

