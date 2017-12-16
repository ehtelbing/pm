// 工作地点数据
var gzpalceStore = Ext.create('Ext.data.Store', {
	autoLoad : true,
	storeId : 'gzpalceStore',
	fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
	proxy : {
		type : 'ajax',
		async : false,
		url: AppUrl + 'No4120/PRO_PM_REPAIRDEPT_TODEPT',
		actionMethods : {},
		reader : {
			type : 'json',
			root : 'list'
		},
		extraParams : {
			V_REPAIRDEPTCODE:Ext.util.Cookies.get('v_deptcode'),
			V_PERSONCODE:Ext.util.Cookies.get('v_orgCode')
		}
	}
});

// 指标STORE
var zbStore = Ext.create('Ext.data.Store', {
	autoLoad : false,
	storeId : 'zbStore',
	fields : [ 'TAG_ID', 'DESC_UNIT' ],
	proxy : {
		type : 'ajax',
		async : false,
		url: AppUrl + 'cjy/pro_run7111_taglist',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		}
	}
});

// 设备选择STORE
var sbxzStore = Ext.create('Ext.data.Store', {
	autoLoad : false,
	storeId : 'sbxzStore',
	fields : [ 'EQU_DESC', 'EQU_ID' ],
	proxy : {
		type : 'ajax',
		async : false,
		url: AppUrl + 'cjy/pro_run7111_equlist',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		}
	}
});

var gridStore = Ext.create("Ext.data.Store", {
	autoLoad : false,
	storeId : 'gridStore',
	pageSize : 20,
	fields : [ 'EQU_DESC', 'SITE_ID', 'BJ_UNIQUE_CODE', 'MATERIALCODE',
		'MATERIALNAME', 'UNIT', 'EQU_NAME', 'SITE_DESC', 'DEPARTNAME',
		'CHANGEDATE' ],
	proxy : {
		type : 'ajax',
		async : false,
		url: AppUrl + 'cjy/pro_run7111_usebjlist',
		actionMethods : {
			read : 'POST'
		},
		reader : {
			type : 'json',
			root : 'list'
		}
	}
});

var creatpanel1 = Ext.create('Ext.form.Panel', {
	id : 'creatpanel1',
	style : 'margin:5px 0px 2px 2px',
	region : 'north',
	width : '100%',
	style: 'background-color:#FFFFFF',
	baseCls: 'my-panel-no-border',
	defaults : {
		style : 'margin:5px 0px 5px 10px',
		labelAlign : 'right'
	},
	layout : {
		type : 'column'
	},
	items : [ {
		xtype : 'combo',
		id : 'zyq',
		store : 'gzpalceStore',
		fieldLabel : '作业区 ',
		editable : false,
		readOnly : true,
		style : 'margin:5px 0px 5px 5px',
		labelWidth : 70,
		queryMode : 'local',
		valueField : 'V_DEPTCODE',
		displayField : 'V_DEPTNAME'
	}, {
		xtype : 'combo',
		id : 'xzsb',
		store : 'sbxzStore',
		fieldLabel : '选择设备 ',
		editable : false,
		style : 'margin:5px 0px 5px 5px',
		labelWidth : 70,
		queryMode : 'local',
		valueField : 'EQU_ID',
		displayField : 'EQU_DESC'
	}, {
		xtype : 'button',
		text : '查询',
		icon : imgpath + '/search.png',
		width : 100,
		handler : query,
		style : {
			margin : '5px 0 5px 30px'
		}
	} ]
});

var grid = Ext.create("Ext.grid.Panel", {
	xtype : 'gridpanel',
	id : 'grid',
	region : 'center',
	columnLines : true,
	width : '100%',
	store : gridStore,
	selType : 'checkboxmodel',
	selModel : {
		selType : 'checkboxmodel',
		mode : 'SINGLE'
	},
	autoScroll : true,
	height : 400,
	columns : [
		{
			text : '录入检查记录 ',
			align : 'center',
			width : 100,
			renderer : function(value, metaData, record) {
				return '<div><a href="javascript:OnClickDeleteLink(\''
					+ value + '\')">录入</a></div>';
			}
		}, {
			text : '更换日期',
			dataIndex : 'CHANGEDATE',
			align : 'center',
			labelAlign : 'right',
			width : 100,
			renderer : RenderFontLeft
		}, {
			text : '备件唯一标识',
			dataIndex : 'BJ_UNIQUE_CODE',
			align : 'center',
			width : 150
		}, {
			text : '物资编码 ',
			dataIndex : 'MATERIALCODE',
			align : 'center',
			width : 120
		}, {
			text : '物资描述 ',
			dataIndex : 'MATERIALNAME',
			align : 'center',
			width : 150
		}, {
			text : '计量单位 ',
			dataIndex : 'UNIT',
			align : 'center',
			width : 60
		}, {
			text : '当前设备 ',
			dataIndex : 'EQU_NAME',
			align : 'center',
			width : 150
		}, {
			text : '备件安装位置 ',
			dataIndex : 'SITE_DESC',
			align : 'center',
			width : 150
		}, {
			text : '作业区 ',
			dataIndex : 'DEPARTNAME',
			align : 'center',
			width : 100
		} ]
});
/*var rrwidow = Ext.create('Ext.window.Window', {
	title : '检查图片',
	height : 400,
	width : 400,
	layout : 'fit',
	closeAction : 'hide',
	autoShow : false,
	modal : true,
	id : 'win2',
	closeAction : 'hide'
});*/
// 录入窗体
var rrwidow = Ext
	.create(
	'Ext.window.Window',
	{
		title : '填写检查内容',
		height : 300,
		width : 400,
		layout : 'vbox',
		closeAction : 'hide',
		autoShow : false,
		modal : true,
		id : 'win1',
		closeAction : 'hide',
		listeners : {
			show : {// 窗口加载将窗口数据清空
				fn : function() {
					Ext.getCmp('checkTime').setValue(new Date());
					Ext.getCmp('jcnr').setValue('');
					Ext.getCmp('jczb').clearValue();
					Ext.getCmp('zbz').setValue('0');
					Ext.getCmp('upload').setValue('');
				}
			}
		},
		items : [
			{
				xtype : 'datefield',
				format : 'Y年m月d日',
				fieldLabel : '检查时间',
				labelAlign : 'left',
				labelWidth : 80,
				id : 'checkTime',
				value : new Date(),
				style : 'margin: 5px 0px 0px 10px'
			},
			{
				xtype : 'textfield',
				id : 'jcnr',
				width : 300,
				fieldLabel : '检查内容',
				labelAlign : 'left',
				labelWidth : 80,
				style : 'margin: 5px 0px 0px 10px'
			},

			{
				xtype : 'combo',
				id : 'jczb',
				store : zbStore,
				width : 300,
				displayField : 'DESC_UNIT',
				valueField : 'TAG_ID',
				fieldLabel : '检查指标',
				labelAlign : 'left',
				labelWidth : 80,
				style : 'margin: 5px 0px 0px 10px'
			},
			{
				xtype : 'numberfield',
				id : 'zbz',
				width : 300,
				fieldLabel : '指标值',
				labelAlign : 'left',
				labelWidth : 80,
				style : 'margin: 5px 0px 0px 10px',
				emptyText : '0',
				decimalPrecision : 2
			},

			{
				xtype : 'form',
				id:'formpanel',
				layout : 'column',
				baseCls : 'my-panel-no-border',
				frame : true,
				width : '100%',
				items : [
					{
						xtype : 'displayfield',
						fieldLabel : '',
						hidden : true,
						id : 'bjcode'
					},
					{
						xtype : 'displayfield',
						fieldLabel : '',
						hidden : true,
						id : 'checktime'
					},
					{
						xtype : 'displayfield',
						fieldLabel : '',
						hidden : true,
						id : 'checkcount'
					},
					{
						xtype : 'displayfield',
						fieldLabel : '',
						hidden : true,
						id : 'usercode'
					},
					{
						xtype : 'displayfield',
						fieldLabel : '',
						hidden : true,
						id : 'uesrname'
					},
					{
						xtype : 'displayfield',
						fieldLabel : '',
						hidden : true,
						id : 'tagid'
					},
					{
						xtype : 'displayfield',
						fieldLabel : '',
						hidden : true,
						id : 'siteid'
					},
					{
						xtype : 'displayfield',
						fieldLabel : '',
						hidden : true,
						id : 'tagvalue'
					},
					{
						xtype : 'filefield',
						id : 'upload',
						name : 'upload',
						width : 300,
						msgTarget : 'side',
						allowBlank : true,
						anchor : '100%',
						buttonText : '浏览....',
						style : ' margin: 5px 0px 0px 10px'
					},
					{
						xtype : 'button',
						width : 60,
						text : '保存记录',
						style : ' margin: 5px 0px 0px 10px',
						handler : function() {
							if (Ext.getCmp('jcnr').getValue() == ''&& (Ext.getCmp('zbz').getValue() == '' || Ext.getCmp('zbz').getValue() == null)) {
								Ext.example.msg('操作信息','{0}','请填写检查内容或指标值');
							} else {
									//var form = this.up('form').getForm();
								var formpanel = Ext.getCmp('formpanel');
								var V_V_FILEBLOB = Ext.getCmp('upload').getSubmitValue();
								Ext.getCmp('upload').setValue(V_V_FILEBLOB);
								Ext.getCmp('bjcode').setValue(Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.BJ_UNIQUE_CODE);
								Ext.getCmp('checktime').setValue(Ext.util.Format.date(Ext.getCmp('checkTime').getValue(),'Y-m-d'));
								Ext.getCmp('checkcount').setValue(Ext.getCmp('jcnr').getValue());
								Ext.getCmp('usercode').setValue(Ext.util.Cookies.get('v_personcode'));
								Ext.getCmp('uesrname').setValue(Ext.util.Cookies.get('v_personname2'));
								Ext.getCmp('tagid').setValue(Ext.getCmp('jczb').getValue());
								Ext.getCmp('siteid').setValue(Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.SITE_ID);
								Ext.getCmp('tagvalue').setValue(Ext.getCmp('zbz').getValue());
								formpanel.getForm().submit({url : AppUrl+ 'cjy/PM_ACTIVITI_PROCESS_SET',
											async : false,
											waitMsg : '上传中...',
										    method: 'POST',
											/*params : {
												bjcode : Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.BJ_UNIQUE_CODE,
												checktime : Ext.util.Format.date(Ext.getCmp('checkTime').getValue(),'Y-m-d'),
												checkcount : Ext.getCmp('jcnr').getValue(),
												usercode : Ext.util.Cookies.get('v_personcode'),
												uesrname : Ext.util.Cookies.get('v_personname2'),
												tagid : Ext.getCmp('jczb').getValue(),
												siteid : Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.SITE_ID,
												//tagdesc : parseFloat(Ext.getCmp('zbz').getValue()),
												tagvalue : Ext.getCmp('zbz').getValue()
											},*/
											success : function(resp) {
												Ext.example.msg('提示信息','保存成功！');
												Ext.getCmp('win1').hide();
											},
											failure : function(form,action) {
												Ext.example.msg('提示信息','保存失败！');
											}
										});

							}
						}
					} ]
				// { xtype: 'button', text: '查看图片', icon: imgpath +
				// '/search.png',width:100,
				// handler: querytp, style: { margin: '5px 0 5px
				// 10px'}}]
			}

		]
	});

Ext.onReady(function() {
	Ext.create('Ext.container.Viewport', {
		id : "id",
		layout : 'border',
		items : [ creatpanel1, grid ]
	});
	Ext.data.StoreManager.lookup('gzpalceStore').on(
		'load',
		function() {
			Ext.getCmp('zyq').store.insert(0, {
				'V_DEPTCODE' : '%',
				'V_DEPTNAME' : '全部'
			});

			Ext.getCmp('zyq').select(
				Ext.data.StoreManager.lookup('gzpalceStore').getAt(0));

			// 默认当前登录用户工作区
			var storeLength = Ext.data.StoreManager
				.lookup('gzpalceStore').data.length;
			for ( var index = 0; index < storeLength; index++) {
				var storeItemData = Ext.data.StoreManager
					.lookup('gzpalceStore').data.items[index].data;
				if (storeItemData.V_DEPTCODE == Ext.util.Cookies
						.get('v_deptcode')) {
					Ext.getCmp("zyq").setValue(
						Ext.util.Cookies.get('v_deptcode'));
					break;
				}
			}
		});
	Ext.data.StoreManager.lookup('sbxzStore').on(
		'load',
		function() {
			// Ext.getCmp('xzsb').store.insert(0,{'EQU_ID':'%','EQU_DESC':'全部'});
			Ext.getCmp('xzsb').select(
				Ext.data.StoreManager.lookup('sbxzStore').getAt(0));
			// 刷新
			query();
		});

	Ext.data.StoreManager.lookup('gzpalceStore').on(
		'load',
		function() {
			Ext.getCmp('zyq').select(
				Ext.data.StoreManager.lookup('gzpalceStore').getAt(0));

			// 默认当前登录用户工作区
			var storeLength = Ext.data.StoreManager
				.lookup('gzpalceStore').data.length;
			for ( var index = 0; index < storeLength; index++) {
				var storeItemData = Ext.data.StoreManager
					.lookup('gzpalceStore').data.items[index].data;
				if (storeItemData.V_DEPTCODE == Ext.util.Cookies
						.get('v_deptcode')) {
					Ext.getCmp("zyq").setValue(
						Ext.util.Cookies.get('v_deptcode'));
					break;
				}
			}

			Ext.data.StoreManager.lookup('sbxzStore').load(
				{
					params : {
						v_v_plantcode:Ext.util.Cookies.get('v_orgCode'),
						v_v_deptcode:Ext.getCmp('zyq').getValue()
					}
				});
		});

	Ext.getCmp('zyq').on(
		'select',
		function() {
			Ext.data.StoreManager.lookup('sbxzStore').load(
				{
					params : {
						v_v_plantcode:Ext.util.Cookies.get('v_orgCode'),
						v_v_deptcode:Ext.getCmp('zyq').getValue()
					}
				});
		});
});
// 查询
function query() {
	Ext.data.StoreManager.lookup('gridStore').load({
		params : {
			v_v_equcode:Ext.getCmp('xzsb').getValue()
		}
	});
}

function RenderFontLeft(value, metaData) {
	metaData.style = 'text-align: left';
	value = value.split(' ')[0];
	return value;
}
// 保存记录
function savejl() {
	// CXD2059过程中有一个没更改
	Ext.Ajax
		.request({
			url : APP + '/pro_run7111_addlog',
			async : false,
			method : 'post',
			params : {
				parVal : [
					Ext.getCmp('grid').getSelectionModel()
						.getSelection()[0].data.BJ_UNIQUE_CODE,
					Ext.Date.format(Ext.getCmp('checkTime').getValue(),
						'Y-m-d'),
					Ext.getCmp('jcnr').getValue(),
					null,
					null,

					Ext.util.Cookies.get('v_personcode'),
					Ext.util.Cookies.get('v_personname2'),
					Ext.getCmp('jczb').getValue(),
					Ext.getCmp('grid').getSelectionModel()
						.getSelection()[0].data.SITE_ID,
					Ext.getCmp('grid').getSelectionModel()
						.getSelection()[0].data.BJ_UNIQUE_CODE,
					parseFloat(Ext.getCmp('zbz').getValue())

				]
			},
			success : function(resp) {
				var resp = Ext.decode(resp.responseText)[0];
				if (resp == 'Success') {

					Ext.Msg.alert('提示', '添加成功');

				}
			}
		});
}

function OnClickDeleteLink() {
	Ext.data.StoreManager.lookup('zbStore').load(
		{
			params : {
				pid:Ext.getCmp('grid').getSelectionModel()
					.getSelection()[0].data.SITE_ID
			}
		});
	Ext.data.StoreManager.lookup('zbStore').on(
		'load',
		function() {
			Ext.getCmp('jczb').select(
				Ext.data.StoreManager.lookup('zbStore').getAt(0));
		});
	Ext.getCmp('win1').show();

}

// function querytp(){
// Ext.getCmp('win1').hide();
// Ext.getCmp('win2').removeAll();
// var asd = { xtype: 'panel',autoScroll:true, region: 'center', html: '<img
// src="' + APP + '/ImgDownLoad?v_id=018097c1-beaa-9055-e050-007f0100717d' + '"
// />'};
// Ext.getCmp('win2').add(asd);
// Ext.getCmp('win2').show();
// }

