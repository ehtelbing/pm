var date=new Date();
var V_QUARTERPLAN_GUID='';
//年份
var years=[];
for (var i =date.getFullYear()-4; i <=date.getFullYear()+1; i++){
	years.push({ displayField: i, valueField: i });
}
var yearStore=Ext.create("Ext.data.Store", {
	storeId: 'yearStore',
	fields: ['displayField','valueField'],
	data: years,
	proxy: {
		type: 'memory',
		reader: {type: 'json'}
	}
});
//季度
var quarters=[{ displayField:'春季', valueField:'1'},{ displayField:'夏季', valueField:'2'},{ displayField:'秋季', valueField:'3'},{ displayField:'冬季', valueField:'4'}];
var quarterStore=Ext.create("Ext.data.Store", {
	storeId: 'quarterStore',
	fields: ['displayField','valueField'],
	data: quarters,
	proxy: {
		type: 'memory',
		reader: {type: 'json'}
	}
});
//计划厂矿
var ckStore=Ext.create("Ext.data.Store", {
	storeId: 'ckStore',
	autoLoad: true,
	fields: ['V_DEPTCODE', 'V_DEPTNAME'],
	proxy: {
		type: 'ajax',
		async: false,
		url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
		actionMethods: {
			read: 'POST'
		},
		reader: {
			type: 'json',
			root: 'list'
		},
		extraParams: {
			'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
			'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
			'V_V_DEPTCODENEXT': '%',
			'V_V_DEPTTYPE': '基层单位'
		}
	}
});
//作业区
var zyqStore = Ext.create('Ext.data.Store', {
	autoLoad: false,
	storeId: 'zyqStore',
	fields: ['V_DEPTCODE', 'V_DEPTNAME'],
	proxy: {
		type: 'ajax',
		async: false,
		url: AppUrl + 'PM_03/PRO_BASE_DEPT_VIEW_ROLE_PLAN',
		actionMethods: {
			read: 'POST'
		},
		reader: {
			type: 'json',
			root: 'list'
		}
	}
});
//页面表格信息加载
var gridStore = Ext.create('Ext.data.Store', {
	id : 'gridStore',
	pageSize : 15,
	autoLoad : false,
	fields :[
		'V_STATE_LOCK',
		'D_DATE_LOCK',
		'V_GUID',
		'V_YEAR',
		'V_ORGCODE',
		'V_ORGNAME',
		'V_DEPTCODE',
		'V_DEPTNAME',
		'V_EQUTYPECODE',
		'V_EQUTYPENAME',
		'V_EQUCODE',
		'V_EQUNAME',
		'V_REPAIRMAJOR_CODE',
		'V_CONTENT',
		'V_STARTTIME',
		'V_ENDTIME',
		'V_HOUR',
		'V_REPAIRDEPT_CODE',
		'V_REPAIRDEPT_NAME',
		'V_MANNAME',
		'V_TEL',
		'V_INDATE',
		'V_INPER',
		'V_INPERNAME',
		'V_FLOWCODE',
		'V_ORDER',
		'V_QUARTER',
		'V_BZ',
		'V_FLOWORDER',
		'V_FLOWTYPE',
		'V_JHMX_GUID',
		'V_OTHERPLAN_GUID',
		'V_OTHERPLAN_TYPE',
		'V_STATE',
		'V_QUARTERID',
		'V_REPAIRDEPT_NAME'
	],
	proxy : {
		type : 'ajax',
		async : false,
		url : AppUrl + 'PM_03/PRO_PM_PLAN_LOCKING_Q_VIEW',
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

//判断当前月份是什么季度
function getQuarterOfMonth(){
	var currMonth=new Date().getMonth()+1;
	var quarter='0';
	if(3<=currMonth&&currMonth<=5){
		quarter='1';
	}
	if(6<=currMonth&&currMonth<=8){
		quarter='2';
	}
	if(9<=currMonth&&currMonth<=11){
		quarter='3';
	}
	if(currMonth==12||currMonth==1||currMonth==2){
		quarter='4';
	}
	return quarter;
}

var northPanel = Ext.create('Ext.form.Panel', {
	region: 'north',
	frame: true,
	border: false,
	//baseCls: 'my-panel-no-border',
	margin: '0 0 0 0',
	items: [
		{layout: 'column', defaults: {labelAlign: 'right'},frame:true,border: false,baseCls: 'my-panel-no-border',
			items: [
				{xtype: 'combo',id:'year',fieldLabel: '年份',editable: false, margin: '5 0 5 5',labelWidth:60,width:210,displayField: 'displayField',valueField: 'valueField',value:'',store:yearStore,queryMode: 'local'},
				{xtype: 'combo',id:'quarter',fieldLabel: '季度',editable: false, margin: '5 0 5 5',labelWidth:60,width:210,displayField: 'displayField',valueField: 'valueField',value:'',store:quarterStore,queryMode: 'local'},
				{xtype: 'combo',id:'ck',fieldLabel: '计划厂矿',editable: false, margin: '5 0 5 5',labelWidth:60,width:210, displayField: 'V_DEPTNAME',valueField: 'V_DEPTCODE',value: '',store:ckStore,queryMode: 'local'},
				{xtype: 'combo',id:'zyq',fieldLabel: '作业区', editable: false,margin: '5 0 5 5',labelWidth:60,width:210, displayField: 'V_DEPTNAME',valueField: 'V_DEPTCODE',value: '',store:zyqStore,queryMode: 'local'},
				{xtype: 'textfield',id:'seltext',fieldLabel: '检修内容',labelWidth:60,width:210, margin: '5 0 5 5',value: ''},
				{xtype: 'button', text: '查询', margin: '5 0 5 5',icon:imgpath + '/search.png', handler:queryGrid},
				{xtype: 'button', text: '导出Excel', margin: '5 0 5 5',icon: imgpath + '/grid.png',handler:OnButtonExcel},
				{xtype: 'displayfield',id:'endtime',fieldLabel: '截止时间',readOnly: true, margin: '5 0 5 5',labelWidth:60,width:210,  value: ''},
				{xtype: 'button', text: '设置', margin: '5 0 5 5',icon: imgpath + '/cog.png',handler:OnSetUpClicked}
			]
		}
	]
});

var gridPanel= Ext.create('Ext.grid.Panel', {
	id:'gridPanel',
	region: 'center',
	border: false,
	store:'gridStore',
	selType:'checkboxmodel',
	columns:[
		{text: '序号', align: 'center', width: 50,xtype: 'rownumberer'},
		{text : '超时步骤',width : 110,dataIndex : 'V_STATE_LOCK',align : 'center'},
		{text : '上报时间',width : 150,dataIndex : 'D_DATE_LOCK',align : 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')} ,
		{text : '计划单位',width : 110,dataIndex : 'V_DEPTNAME',align : 'center'} ,
		{text : '设备名称',width : 110,dataIndex : 'V_EQUNAME',align : 'center'} ,
		{text : '检修内容',width : 300,dataIndex : 'V_CONTENT',align : 'center'} ,
		{text : '计划开工时间',width : 150,dataIndex : 'V_STARTTIME',align : 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')} ,
		{text : '计划竣工时间',width : 150,dataIndex : 'V_ENDTIME',align : 'center',renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')} ,
		{text : '计划工时(小时)',width : 110,dataIndex : 'V_HOUR',align : 'center'} ,
		{text : '施工单位',width : 110,dataIndex : 'V_REPAIRDEPT_NAME',align : 'center'} ,
		{text : '检修负责人',width : 110,dataIndex : 'V_MANNAME',align : 'center'}
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

Ext.onReady(function () {
	Ext.create('Ext.container.Viewport', {
		layout:'border',
		items: [northPanel,gridPanel]
	});
	Ext.getCmp('year').setValue(new Date().getFullYear());//年份默认值
	Ext.getCmp('quarter').select(getQuarterOfMonth());		//季度默认值
	//计划厂矿加载时
	Ext.data.StoreManager.lookup('ckStore').on('load', function () {
		Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
		Ext.data.StoreManager.lookup('zyqStore').load({
			params: {
				'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
				'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
				'V_V_DEPTCODENEXT': '%',
				'V_V_DEPTTYPE': '主体作业区'
			}
		});
	});
	//计划厂矿更改时加载作业区
	Ext.getCmp('ck').on('select', function () {
		Ext.data.StoreManager.lookup('zyqStore').load({
			params: {
				'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
				'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
				'V_V_DEPTCODENEXT': '%',
				'V_V_DEPTTYPE': '主体作业区'
			}
		});
	});
	//作业区
	Ext.data.StoreManager.lookup('zyqStore').on('load', function () {
		Ext.getCmp("zyq").select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
		queryGrid();
	});
	//作业区改变
	Ext.getCmp('zyq').on('select', function () {
		Ext.data.StoreManager.lookup('zyStore').load({
			params: {
				V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
				V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue()
			}
		});
	});
	Ext.getCmp('zyq').on('select',function(){
		queryGrid();
	});
	Ext.getCmp('year').on('select',function(){
		queryGrid();
	});
	Ext.getCmp('quarter').on('select',function(){
		queryGrid();
	});
	Ext.data.StoreManager.lookup('gridStore').on('load',function(){
		var time=Ext.data.StoreManager.get('gridStore').proxy.reader.rawData.V_D_DATE_E;
		Ext.getCmp('endtime').setValue(time);
	});
});
function atleft(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return '<div data-qtip="' + value + '" >' + value + '</div>';
}
//查询
function queryGrid() {
	Ext.data.StoreManager.lookup('gridStore').load({
		params: {
			'V_V_YEAR':Ext.getCmp('year').getValue(),
			'V_V_QUARTER':Ext.getCmp('quarter').getValue(),
			'V_V_ORGCODE':Ext.getCmp('ck').getValue(),
			'V_V_DEPTCODE':Ext.getCmp('zyq').getValue(),
			'V_V_CONTENT':Ext.getCmp('seltext').getValue()
		}
	});
}
//导出Excel
function OnButtonExcel(){
	document.location.href=AppUrl + 'excel/JDSDGL_EXCEL?V_V_YEAR='+Ext.getCmp('year').getValue()+
							'&V_V_QUARTER='+Ext.getCmp('quarter').getValue()+
							'&V_V_ORGCODE='+Ext.getCmp('ck').getValue()+
							'&V_V_DEPTCODE='+encodeURI(Ext.getCmp('zyq').getValue())+
							'&V_V_CONTENT='+Ext.getCmp('seltext').getValue();
}
//设置
var V_YEAR;
var V_MONTH;
var V_WEEK=0;
var V_TYPE= 'Q' ;
function OnSetUpClicked(){
	var owidth = window.document.body.offsetWidth - 200;
	var oheight = window.document.body.offsetHeight - 100;
    V_YEAR = Ext.getCmp('year').getValue();
    V_MONTH= Ext.getCmp('quarter').getValue()
	// var ret = window.open(AppUrl + 'page/PM_0301011001/index.html?V_YEAR=' +Ext.getCmp('year').getValue()
	// 	+'&V_MONTH='+Ext.getCmp('quarter').getValue()
	// 	+'&V_WEEK=0'
	// 	+'&V_TYPE=Q', '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
    var windowEqu = Ext.create('Ext.window.Window', {
        id: 'windowEqu',
        width: 900,
        height: 500,
        title : '手工消缺',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        region:'center',
        layout : 'vbox',
        items: [
            {xtype:'displayfield',id:'jhlx', fieldLabel: '计划类型',labelAlign: 'right',labelWidth:90,margin:'5 0 0 5'},
            {xtype:'displayfield',id:'jhsj', fieldLabel: '计划时间',labelAlign: 'right',labelWidth:90,margin:'5 0 0 5'},
            {layout: 'column', defaults: {labelAlign: 'right'},frame:true,border: false,baseCls: 'my-panel-no-border',
                items: [
                    {xtype:'datefield',fieldLabel:'上报开始时间',format : 'Y-m-d',editable : false,value:new Date(),id:'kssj',labelAlign:'right',labelWidth:90,style: ' margin: 5px 0px 0px 6px'},
                    {xtype: 'numberfield',id: 'shour',labelAlign: 'right', value: 8, maxValue: 23, minValue: 00, labelWidth: 30, style: ' margin: 5px 0px 0px 6px', width: 70 },
                    {xtype: 'label', text: '小时', style: ' margin: 8px 0px 0px 6px' },
                    {xtype: 'numberfield', id: 'sminute',value: 0, maxValue: 59, minValue: 00, style: ' margin: 5px 0px 0px 6px', width: 70 },
                    {xtype: 'label', text: '分', style: ' margin: 8px 0px 0px 6px' }
                ]
            },
            {layout: 'column', defaults: {labelAlign: 'right'},frame:true,border: false,baseCls: 'my-panel-no-border',
                items: [
                    {xtype:'datefield',fieldLabel:'上报结束时间',format : 'Y-m-d',editable : false,value:new Date(),id:'jssj',labelAlign:'right',labelWidth:90,style: ' margin: 5px 0px 0px 6px'},
                    {xtype: 'numberfield',id: 'ehour',labelAlign: 'right', value: 8, maxValue: 23, minValue: 00, labelWidth: 30, style: ' margin: 5px 0px 0px 6px', width: 70 },
                    {xtype: 'label', text: '小时', style: ' margin: 8px 0px 0px 6px' },
                    {xtype: 'numberfield', id: 'eminute',value: 0, maxValue: 59, minValue: 00, style: ' margin: 5px 0px 0px 6px', width: 70 },
                    {xtype: 'label', text: '分', style: ' margin: 8px 0px 0px 6px' }
                ]
            },
            {layout: 'column', defaults: {labelAlign: 'right'},frame:true,border: false,baseCls: 'my-panel-no-border',
                items: [
                    {xtype : 'checkboxgroup',fieldLabel : '解锁操作',labelAlign : 'right', margin:'5 0 0 5', labelWidth : 90,
                        items: [{ boxLabel: '是否解锁', name: 'lock',id:'lock'}]
                    }
                ]
            }
        ],
        buttons: [
            { xtype: "button", text: "保存", handler: OnButtonSaveClicked},
            { xtype: "button", text: "关闭", handler: OnButtonCancelClicked}
        ]
    });
    Ext.getCmp('windowEqu').show();
    Ext.Ajax.request({
        url: AppUrl + 'PM_03/PRO_PM_PLAN_LOCKING_DATE_GET',
        method: 'POST',
        params:{
            V_I_YEAR:V_YEAR,
            V_I_MONTH:V_MONTH,
            V_I_WEEKNUM:V_WEEK,
            V_V_TYPE:V_TYPE
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            Ext.getCmp('jhlx').setValue(resp.list[0].V_TYPE);
            Ext.getCmp('jhsj').setValue(resp.list[0].V_PLANDATE);
            if(resp.list[0].I_LOCK=='0'){
                Ext.getCmp('lock').setValue(true);
            }else{
                Ext.getCmp('lock').setValue(false);
            }
            var strtimee=resp.list[0].D_DATE_E;
            var strdatee=strtimee.split('.')[0].split(' ')[0];
            Ext.getCmp('jssj').setValue(strdatee);
            var ehour=strtimee.split('.')[0].split(' ')[1].split(':')[0];
            var eminute=strtimee.split('.')[0].split(' ')[1].split(':')[1];
            Ext.getCmp('ehour').setValue(ehour);
            Ext.getCmp('eminute').setValue(eminute);

            var strtimes=resp.list[0].D_DATE_S;
            var strdates=strtimes.split('.')[0].split(' ')[0];
            Ext.getCmp('kssj').setValue(strdates);
            var shour=strtimes.split('.')[0].split(' ')[1].split(':')[0];
            var sminute=strtimes.split('.')[0].split(' ')[1].split(':')[1];
            Ext.getCmp('shour').setValue(shour);
            Ext.getCmp('sminute').setValue(sminute);
        }
    });
}

function OnButtonSaveClicked(){
    var stime=Ext.getCmp('kssj').getSubmitValue()+' '+Ext.getCmp('shour').getValue()+':'+Ext.getCmp('sminute').getValue()+':'+'00';
    var etime=Ext.getCmp('jssj').getSubmitValue()+' '+Ext.getCmp('ehour').getValue()+':'+Ext.getCmp('eminute').getValue()+':'+'00';
    if(new Date(stime)>new Date(etime)){
        alert("开始时间不能晚于结束时间");
        return;
    }
    var yornlock='';
    if(Ext.getCmp('lock').checked==true){
        yornlock=0;
    }else if(Ext.getCmp('lock').checked==false){
        yornlock=1;
    }

    Ext.Ajax.request({
        url: AppUrl + 'PM_03/PRO_PM_PLAN_LOCKING_DATE_SET',
        method: 'POST',
        async: false,
        params:{
            'V_I_YEAR':V_YEAR,
            'V_I_MONTH':V_MONTH,
            'V_I_WEEKNUM':V_WEEK,
            'V_V_TYPE':V_TYPE,
            'V_D_DATE_E':etime,
            'V_I_LOCK':yornlock,
            'V_D_DATE_S':stime
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if(resp.V_INFO=='成功'){
               // window.opener.queryGrid();
                //window.close();
                OnButtonCancelClicked();
            }else{
                Ext.Msg.alert('操作信息', '保存失败');
            }
        }
    });
}


function OnButtonCancelClicked(){
    if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") !=-1) {
        window.location.href="http://localhost:8080/pm/app/pm/page/PM_03010110/index.html";
        window.close();
    } else {
        window.opener = null;
        window.open("", "_self");
        window.close();
    }
}