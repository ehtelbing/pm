	var urlCode;
	var strName = '';

    var V_D_ENTER_DATE_B="";
    var V_D_ENTER_DATE_E="";
    var V_V_DEPTCODE="";
    var V_V_DEPTNEXTCODE ="";
    var V_EQUTYPE_CODE="";
    var V_EQU_CODE="";
    var V_V_SPARE="";
    var V_V_MATERIALCODE="";
    var V_V_MATERIALNAME="";
    var dd="";
    var ss="";
	if(location.href.split('?')[1]!=undefined){
        V_D_ENTER_DATE_B=Ext.urlDecode(location.href.split('?')[1]).V_D_ENTER_DATE_B;
        dd=Ext.urlDecode(location.href.split('?')[1]).V_D_ENTER_DATE_E;
        ss=Ext.urlDecode(location.href.split('?')[1]).ss;
        V_D_ENTER_DATE_E=dd+" "+ss;//Ext.urlDecode(location.href.split('?')[1]).V_D_ENTER_DATE_E;
            V_V_DEPTCODE=Ext.urlDecode(location.href.split('?')[1]).V_V_DEPTCODE;
        V_V_DEPTNEXTCODE=Ext.urlDecode(location.href.split('?')[1]).V_V_DEPTNEXTCODE== 'ALL' ? '%' : Ext.urlDecode(location.href.split('?')[1]).V_V_DEPTNEXTCODE;
        V_EQUTYPE_CODE=Ext.urlDecode(location.href.split('?')[1]).V_EQUTYPE_CODE== 'ALL' ? '%' : Ext.urlDecode(location.href.split('?')[1]).V_EQUTYPE_CODE;
            V_EQU_CODE=Ext.urlDecode(location.href.split('?')[1]).V_EQU_CODE== 'ALL' ? '%' : Ext.urlDecode(location.href.split('?')[1]).V_EQU_CODE;
        V_V_MATERIALCODE=Ext.urlDecode(location.href.split('?')[1]).V_V_MATERIALCODE== 'K' ? '' : Ext.urlDecode(location.href.split('?')[1]).V_V_MATERIALCODE;
        V_V_MATERIALNAME=Ext.urlDecode(location.href.split('?')[1]).V_V_MATERIALNAME;



	}
Ext.onReady(function() {
	
	var gridStore = Ext.create('Ext.data.Store', {
		id : 'gridStore',
		autoLoad : false,
		fields : [ 'D_DATE_ACP', 'D_DATE_FK', 'D_ENTER_DATE', 'D_FACT_FINISH_DATE', 'D_FACT_START_DATE', 'D_FINISH_DATE', 'D_START_DATE', 'I_ID', 'I_OTHERHOUR', 'V_ACT_TYPE',
				'V_CHECKMANCONTENT', 'V_CHECKMANSIGN', 'V_DEFECTGUID', 'V_DEPTCODE', 'V_DEPTCODEREPARIR', 'V_DEPTNAME', 'V_DEPTNAMEREPARIR', 'V_DEPTSIGN', 'V_ENTERED_BY',
				'V_EQUIP_NAME', 'V_EQUIP_NO', 'V_EQUSITENAME', 'V_FUNC_LOC', 'V_GSBER', 'V_GSBER_TXT', 'V_IWERK', 'V_ORDERGUID', 'V_ORDERID', 'V_ORDER_TYP', 'V_ORDER_TYP_TXT',
				'V_ORGCODE', 'V_ORGNAME', 'V_OTHERREASON', 'V_PERSONNAME', 'V_PLANNER', 'V_PLANT', 'V_POSTMANSIGN', 'V_REPAIRCONTENT', 'V_REPAIRPERSON', 'V_REPAIRSIGN', 
				'V_SAFE', 'V_SEND_STATE', 'V_SHORT_TXT', 'V_SPARE', 'V_STATECODE', 'V_STATENAME', 'V_SYSNAME', 'V_SYSTEM_STATUS', 'V_TECHNOLOGY', 'V_TOOL', 'V_WBS', 'V_WBS_TXT',
				'V_WORKSHOPCONTENT', 'V_WORKSHOPSIGN', 'V_WORK_AREA', 'V_WORK_CTR'
				],
		proxy : {
			type : 'ajax',
			async : false,
			url : AppUrl + 'dxfile/PRO_SPARE_SELECT_WORKORDER',
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
	
	var panel = Ext.create('Ext.form.Panel', {
		id : 'panellow',
		style : 'margin:5px 0px 2px 2px',
		title: '查看相关工单',
		region : 'north',
		width : '100%',
		frame: true,
		defaults : {
			style : 'margin:5px 0px 5px 10px',
			labelAlign : 'right'
		},
		layout : {
			type : 'column'
		},
		items : [
		         { xtype: 'displayfield', fieldLabel: '物料编码', labelAlign: 'right', labelWidth: 70, id: 'wlbm' },
		         { xtype: 'displayfield', fieldLabel: '物料名称', labelAlign: 'right', labelWidth: 70, id: 'wlmc' },
				{id:'downexcel',xtype:'button',style:'margin:5px 0px 0px 10px',text:'导出Excel',width:80,listeners: { click: OnDownExcelButtonClicked }}]
	});
	

	var grid = Ext.create('Ext.grid.Panel', {
		id : 'grid',
		columnLines : true,
		width : '100%',
		store : gridStore,
		region:'center',
		autoScroll : true,
		height : 400,
		columns : [{xtype : 'rownumberer',width : 30,sortable : false},
		           {text : '工单号',dataIndex : 'V_ORDERID',width:150,align : 'center',renderer : left},
		           {text : '工单描述',dataIndex : 'V_SHORT_TXT',width:300,align : 'center',renderer : left},
		           {text : '设备位置',dataIndex : 'V_EQUSITENAME',width:300,align : 'center',renderer : left},
		           {text : '设备名称',dataIndex : 'V_EQUIP_NAME',width:150,align : 'center',renderer : left},
		           {text : '备件消耗',dataIndex : 'V_SPARE',width:240,align : 'center',renderer : left},
		           {text : '委托单位',dataIndex : 'V_DEPTNAME',width:100,align : 'center',renderer : left},
		           {text : '委托人',dataIndex : 'V_PERSONNAME',width:100,align : 'center',renderer : left},
		           {text : '委托时间',dataIndex : 'D_ENTER_DATE',width:100,align : 'center',renderer : renderTime},
		           {text : '实际结束时间',dataIndex : 'D_FACT_FINISH_DATE',width:100,align : 'center',renderer : renderTime},
		           {text : '检修单位',dataIndex : 'V_DEPTNAMEREPARIR',width:150,align : 'center',renderer : left},
		           {text : '工单类型',dataIndex : 'V_ORDER_TYP_TXT',width:100,align : 'center',renderer : left},
		           {text : '工单状态',dataIndex : 'V_STATENAME',width:100,align : 'center'}]
		});

	Ext.create('Ext.container.Viewport', {
		id : "id",
		layout : 'border',
		items : [ panel,grid]
	});
	
	Ext.data.StoreManager.lookup('gridStore').on('load',function(){
		var str = Ext.data.StoreManager.get('gridStore').proxy.reader.rawData.result[0];
		strName = str;
	});
	

	if(location.href.split('?')[1] != undefined){
		urlCode = Ext.urlDecode(location.href.split('?')[1]);
		query();
		Ext.getCmp('wlbm').setValue(V_V_MATERIALCODE);
		Ext.getCmp('wlmc').setValue(V_V_MATERIALNAME);
	}
});


function OnDownExcelButtonClicked() {
    var nzyq=V_V_DEPTNEXTCODE=='%'?"all":V_V_DEPTNEXTCODE;
    var nsblx=V_EQUTYPE_CODE=='%'?"all":V_EQUTYPE_CODE;
    var nsbmc=V_EQU_CODE=='%'?"all":V_EQU_CODE;
    var nbjmc=V_V_SPARE==''?"k":V_V_SPARE;
    document.location.href = AppUrl + 'dxfile/SPARESELWORK_EXCEL?V_D_ENTER_DATE_B=' + V_D_ENTER_DATE_B +
        '&V_D_ENTER_DATE_E=' + V_D_ENTER_DATE_E +
        '&V_V_DEPTCODE=' + V_V_DEPTCODE +
        '&V_V_DEPTNEXTCODE=' + nzyq +
        '&V_EQUTYPE_CODE=' + nsblx +
        '&V_EQU_CODE=' + nsbmc +
        '&V_V_SPARE=' + nbjmc+
	'&V_V_SAPRECODE'+V_V_MATERIALCODE;
}

function query(){
	Ext.data.StoreManager.lookup('gridStore').load({
		   params: {
               V_D_ENTER_DATE_B: V_D_ENTER_DATE_B,
               V_D_ENTER_DATE_E: V_D_ENTER_DATE_E,
               V_V_DEPTCODE: V_V_DEPTCODE,
               V_V_DEPTNEXTCODE: V_V_DEPTNEXTCODE,
               V_EQUTYPE_CODE: V_EQUTYPE_CODE,
               V_EQU_CODE: V_EQU_CODE,
               V_V_SPARE: V_V_SPARE,
               V_V_SAPRECODE: V_V_MATERIALCODE
           }
	   });
}


function left(value, metaData, record, rowIndex, colIndex, store) {
	 metaData.style = "text-align:left;"; return value;
}

function renderTime(value, metaData, record, rowIndex, colIndex, store) {
	 value = value.substr(0, 10); return value;
}

function center(value, metaData, record, rowIndex, colIndex, store){
	 metaData.style = "text-align:center;"; 
	 return '<a>'+value+'</a>';
}
