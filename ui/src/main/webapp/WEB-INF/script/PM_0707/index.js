//厂矿
var ckStore = Ext.create('Ext.data.Store', {
	autoLoad: true,
	storeId: 'ckStore',
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
		url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
		actionMethods: {
			read: 'POST'
		},
		reader: {
			type: 'json',
			root: 'list'
		}
	}
});

//设备类型
var sblxStore = Ext.create('Ext.data.Store', {
	autoLoad: false,
	storeId: 'sblxStore',
	fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
	proxy: {
		type: 'ajax',
		async: false,
		url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
		actionMethods: {
			read: 'POST'
		},
		reader: {
			type: 'json',
			root: 'list'
		}
	}
});
//设备名称
var sbmcStore = Ext.create('Ext.data.Store', {
	autoLoad: false,
	storeId: 'sbmcStore',
	fields: ['V_EQUCODE', 'V_EQUNAME'],
	proxy: {
		type: 'ajax',
		async: false,
		url: AppUrl + 'PM_06/pro_get_deptequ_per',
		actionMethods: {
			read: 'POST'
		},
		reader: {
			type: 'json',
			root: 'list'
		}
	}
});
//缺陷类型
var qxlxStore = Ext.create('Ext.data.Store', {
	autoLoad: true,
	storeId: 'qxlxStore',
	fields: ['V_SOURCECODE', 'V_SOURCENAME'],
	proxy: {
		type: 'ajax',
		async: false,
		url: AppUrl + 'PM_07/PRO_PM_07_DEFECT_SOURCE_VIEW',
		actionMethods: {
			read: 'POST'
		},
		reader: {
			type: 'json',
			root: 'list'
		},
		extraParams: {}
	}
}).load();

var  djStore=Ext.create('Ext.data.Store', {
    autoLoad: true,
    storeId: 'djStore',
    fields: ['V_LEVELCODE', 'V_LEVELNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_07/PRO_PM_07_DEFECT_LEVEL_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {}
    }
});
djStore.load();
var editPanel= Ext.create('Ext.form.Panel', {
	id : 'editPanel',
	region:'center',
	layout : 'vbox',
	frame : true,
	frame:true,
	border: false,
	items: [
		{xtype: 'combo',id: 'ck',fieldLabel: '计划厂矿',labelAlign: 'right',editable: false, margin: '5 0 5 5',labelWidth:75,width:255,value:'',displayField: 'V_DEPTNAME',valueField: 'V_DEPTCODE',store:ckStore,queryMode: 'local'},
		{xtype: 'combo',id:'zyq',fieldLabel: '作业区',labelAlign: 'right',editable: false, margin: '5 0 5 5',labelWidth:75,width:255,value:'',displayField: 'V_DEPTNAME',valueField: 'V_DEPTCODE',store:zyqStore,queryMode: 'local'},
		{xtype: 'combo',id:'sblx',fieldLabel: '设备类型',labelAlign: 'right',editable: false, margin: '5 0 5 5',labelWidth:75,width:255, value: '',displayField: 'V_EQUTYPENAME',valueField: 'V_EQUTYPECODE',store:sblxStore,queryMode: 'local'},
		{xtype: 'combo',id:'sbmc',fieldLabel: '设备名称',labelAlign: 'right',editable: false, labelAlign: 'right', margin: '5 0 5 5',labelWidth:75,width:255, value: '',displayField: 'V_EQUNAME',valueField: 'V_EQUCODE',store: sbmcStore,queryMode: 'local'},
		{xtype: 'combo',id:'qxlx',fieldLabel: '缺陷类型',labelAlign: 'right',editable: false, labelAlign: 'right', margin: '5 0 5 5',labelWidth:75,width:255, value: '',displayField: 'V_SOURCENAME',valueField: 'V_SOURCECODE',store: qxlxStore,queryMode: 'local'},
		{xtype: 'textfield',id:'qxmc',fieldLabel: '缺陷明细',margin: '5 0 10 5',labelAlign: 'right',labelWidth:75,width:255, value: ''},
		//{xtype: 'textfield',id:'qxdj',fieldLabel: '缺陷等级',margin: '5 0 10 5',labelAlign: 'right',labelWidth:75,width:255, value: ''},
        {xtype: 'combo',id: 'qxdj',fieldLabel: '缺陷等级',labelAlign: 'right',editable: false, margin: '5 0 5 5',labelWidth:75,width:255,value:'',displayField: 'V_LEVELNAME',valueField: 'V_LEVELCODE',store:djStore,queryMode: 'local'},
		{xtype: 'textarea',id:'clyj',fieldLabel: '处理意见',margin: '5 0 10 5',labelAlign: 'right',labelWidth:75,width:255,height:80, value: ''},
		{layout: 'column', defaults: {labelAlign: 'right'},frame:true,border: false,baseCls: 'my-panel-no-border',
			items: [
				{xtype: 'button', text: '保存',icon: imgpath +'/add.png', margin : '0px 0px 0px 208px',handler :OnButtonSave},
				{xtype: 'button', text : '关闭', width : 60,margin: '0px 20px 0px 0px',handler:OnButtonCancel,hidden:true}
			]
		}
	]
});
function pageLoadInfo(){
	//厂矿加载监听
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
	//厂矿改变
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
	//作业区加载数据
	Ext.data.StoreManager.lookup('zyqStore').on('load', function () {
		Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
		//加载设备类型
		Ext.data.StoreManager.lookup('sblxStore').load({
			params: {
				V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
				V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
			}
		});
	});
	//设备类型加载监听
	Ext.data.StoreManager.lookup('sblxStore').on('load', function () {
		Ext.getCmp("sblx").select(Ext.data.StoreManager.lookup('sblxStore').getAt(0));
		Ext.data.StoreManager.lookup('sbmcStore').load({
			params: {
				v_v_personcode: Ext.util.Cookies.get('v_personcode'),
				v_v_deptcodenext: Ext.getCmp('zyq').getValue(),
				v_v_equtypecode: Ext.getCmp('sblx').getValue()
			}
		});
	});
	//设备名称加载监听
	Ext.data.StoreManager.lookup('sbmcStore').on('load', function () {
		Ext.getCmp("sbmc").select(Ext.data.StoreManager.lookup('sbmcStore').getAt(0));
	});
	//作业区改变
	Ext.getCmp('zyq').on('select', function () {
		Ext.data.StoreManager.lookup('sblxStore').load({
			params: {
				V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
				V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
			}
		});
	});
	//设备类型改变
	Ext.getCmp('sblx').on('select', function () {
		Ext.data.StoreManager.lookup('sbmcStore').load({
			params: {
				v_v_personcode: Ext.util.Cookies.get('v_personcode'),
				v_v_deptcodenext: Ext.getCmp('zyq').getValue(),
				v_v_equtypecode: Ext.getCmp('sblx').getValue()
			}
		});
	});
	//缺陷类型
    Ext.data.StoreManager.lookup('qxlxStore').on('load', function () {
        Ext.getCmp("qxlx").select(Ext.data.StoreManager.lookup('qxlxStore').getAt(0));
    });
   // Ext.getCmp("qxlx").select(Ext.data.StoreManager.lookup('qxlxStore').getAt(0));
	// Ext.data.StoreManager.lookup('qxlxStore').on('load', function () {
        // Ext.ComponentManager.get("qxzt").store.insert(0,{
        //     'V_SOURCECODE':'%',
        //     'V_SOURCENAME':'全部'
        // });
	// 	Ext.getCmp("qxlx").select(Ext.data.StoreManager.lookup('qxlxStore').getAt(0));
	// });
	//缺陷等级
    Ext.data.StoreManager.lookup('djStore').on('load', function () {
        Ext.getCmp('qxdj').select(Ext.data.StoreManager.lookup('djStore').getAt(2));
    });

}
Ext.onReady(function () {
	Ext.create('Ext.container.Viewport', {
		layout:'border',
		items: [editPanel]
	});
	pageLoadInfo();

});
function OnButtonSave(){
	if(Ext.getCmp('qxmc').getValue()==null||Ext.getCmp('qxmc').getValue()==''||Ext.getCmp('qxmc').getValue()==undefined){
		Ext.Msg.alert('操作信息','缺陷明细不能为空');
		return;
	}
	if(Ext.getCmp('qxdj').getValue()==null||Ext.getCmp('qxdj').getValue()==''||Ext.getCmp('qxdj').getValue()==undefined){
		Ext.Msg.alert('操作信息','缺陷等级不能为空');
		return;
	}
	if(Ext.getCmp('clyj').getValue()==null||Ext.getCmp('clyj').getValue()==''||Ext.getCmp('clyj').getValue()==undefined){
		Ext.Msg.alert('操作信息','处理意见不能为空');
		return;
	}
	Ext.Ajax.request({
		url: AppUrl + 'PM_07/PRO_PM_07_DEFECT_SET',
		method: 'POST',
		async : false,
		params:{
			V_V_GUID:guid(),
			V_V_PERCODE:Ext.util.Cookies.get('v_personcode'),
			V_V_DEFECTLIST:Ext.getCmp('qxmc').getValue(),
			V_V_SOURCECODE:Ext.getCmp('qxlx').getValue(),//'defct01',
			V_V_SOURCEID:'',
			V_D_DEFECTDATE: Ext.util.Format.date(new Date(), 'Y/m/d H:m:s'),
			V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
			V_V_EQUCODE:Ext.getCmp('sbmc').getValue(),
			V_V_EQUCHILDCODE:'%',
			V_V_IDEA:Ext.getCmp('clyj').getValue(),
			V_V_LEVEL:Ext.getCmp('qxdj').getValue()
		},
		success:function(resp){
			var resp=Ext.decode(resp.responseText);
			if(resp.V_INFO=='成功'){
				Ext.Msg.alert('操作信息','保存成功');
				Ext.getCmp('qxmc').setValue();
				Ext.getCmp('qxdj').setValue();
				Ext.getCmp('clyj').setValue();
			}
		}
	});
}
function OnButtonCancel(){
	window.close();
}
function guid() {
	function S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}