﻿/*
Ext.Loader.setConfig({
	enabled : true
});
Ext.Loader.setPath({
	"com.data" : "../../com/data",
	"com.store" : "../../com/store",
	"com.view" : "../../com/view",
	"com.util" : "../../com/util"
});
*/

// Ext.require([ 'com.data.Manage', 'com.store.GridStore' ])
Ext
	.onReady(function() {
		var selPlantstore = Ext.create('Ext.data.Store',
			{
				autoLoad : true,
				storeId : 'selPlantstore',
				fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
				proxy : {
					type : 'ajax',
					async : false,
					url: AppUrl + 'No4120/PRO_BASE_DEPT_VIEW_ROLE',
					actionMethods : {
						read : 'POST'
					},
					reader : {
						type : 'json',
						root : 'list'
					},
					extraParams : {
						V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
						V_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
						V_V_DEPTCODENEXT:Ext.util.Cookies.get('v_deptcode'),
						V_V_DEPTTYPE:'[基层单位]'
					}
				}
			});

		var selSectionstore = Ext.create('Ext.data.Store', {
			autoLoad : false,
			storeId : 'selSectionstore',
			fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
			proxy : {
				type : 'ajax',
				async : false,
				url: AppUrl + 'No4120/PRO_PM_REPAIRDEPT_TODEPT',
				actionMethods : {
					read : 'POST'
				},
				reader : {
					type : 'json',
					root : 'list'
				}
			}
		});

		var gridStore = Ext.create('Ext.data.Store', {
			id : 'gridStore',
			autoLoad : false,
			fields : [ 'SITE_ID', 'SITE_DESC', 'REMARK', 'UPDATEPERSON',
				'MEND_DEPART', 'MEND_PERSON','MEND_PERSONID', 'BJ_ID', 'BJ_DESC','BJ_AMOUNT','PRE_FLAG','PRE_FLAG_DESC'],
			proxy : {
				type : 'ajax',
				async : false,
				url: AppUrl + 'cjy/PRO_RUN_SITE_ALL',
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
			id : 'grid',
			region : 'center',
			columnLines : true,
			width : '100%',
			selType : 'checkboxmodel',
			columns : [ {
				xtype : 'rownumberer',
				text : '序号',
				width : 50,
				align : 'center'
			}, {
				text : '备件安装位置',
				dataIndex : 'SITE_DESC',
				align : 'center',
				flex : 1,
				renderer : left
			}, {
				text : '录入人',
				dataIndex : 'UPDATEPERSON',
				align : 'center',
				flex : 1,
				renderer : left
			}, {
				text : '检修单位',
				dataIndex : 'MEND_DEPART',
				align : 'center',
				flex : 1,
				renderer : left
			}, {
				text : '负责人',
				dataIndex : 'MEND_PERSON',
				align : 'center',
				flex : 1,
				renderer : left
			},
				{
					text : '备件编号',
					dataIndex : 'BJ_ID',
					align : 'center',
					flex : 1,
					renderer : left
				}, {
					text : '备件描述',
					dataIndex : 'BJ_DESC',
					align : 'center',
					flex : 1,
					renderer : left
				}, {
					text : '单次更换数量',
					dataIndex : 'BJ_AMOUNT',
					align : 'center',
					flex : 1,
					renderer : left
				}, {
					text : '预装件',
					dataIndex : 'PRE_FLAG_DESC',
					align : 'center',
					flex : 1,
					renderer : right
				}, {
					text : '备注',
					dataIndex : 'REMARK',
					align : 'center',
					flex : 1,
					renderer : left
				} ],
			store : gridStore,
			autoScroll : true
		});
		var queryPanel = Ext
			.create(
			'Ext.panel.Panel',
			{
				id : 'queryPanel',
				style: 'background-color:#FFFFFF',
				baseCls: 'my-panel-no-border',
				width : '100%',
				region : 'north',
				defaults : {
					labelAlign : 'right',
					style : 'margin:5px 0px 5px 10px',
					width:200,
					labelWidth:80
				},
				bodyPadding : 3,
				frame : true,
				layout : 'column',
				items : [
					{
						xtype : 'combo',
						id : "selPlant",
						store : selPlantstore,
						editable : false,
						queryMode : 'local',
						fieldLabel : '厂矿',
						displayField : 'V_DEPTNAME',
						valueField : 'V_DEPTCODE',
						labelWidth : 70,
						style : ' margin: 5px 0px 0px 10px',
						labelAlign : 'right'
					},
					{
						xtype : 'combo',
						id : "selSection",
						store : selSectionstore,
						editable : false,
						queryMode : 'local',
						fieldLabel : '作业区',
						displayField : 'V_DEPTNAME',
						valueField : 'V_DEPTCODE',
						labelWidth : 60,
						style : ' margin: 5px 0px 5px 10px',
						labelAlign : 'right'
					},
					{
						id : 'xzsb',
						xtype : 'textfield',
						fieldLabel : '选择设备',
						readOnly : true,
						listeners : {
							//focus : function() {
							click : {
								element: 'el',
								fn: function () {
									if (Ext.getCmp('selSection').getValue() == '%') {
										alert("请选择作业区");
									}else
									{var owidth = window.document.body.offsetWidth - 200;
										var oheight = window.document.body.offsetHeight - 100;
										var ret = window.open(AppUrl + 'page/PM_090101/index.html?V_DEPTCODE=' + Ext.getCmp('selSection').getValue(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
									}

									/*var ret = window.showModalDialog(AppUrl+ '/No410601/Index.html?DEPTCODE='+ Ext.ComponentManager.get('zyq').getValue()+ '',
									 '',
									 'dialogHeight:500px;dialogWidth:800px');
									 if (ret != ""&& ret != null&& ret != undefined) {
									 var str = [];
									 str = ret.split('^');
									 Ext.ComponentManager
									 .get('xzsb')
									 .setValue(
									 str[1]);
									 Ext.ComponentManager
									 .get('equcode')
									 .setValue(
									 str[0]);}
									 Ext.ComponentManager.get('plant').focus(false, 0);*/
								}
							}
						}
					},
					{
						id : 'sel',
						xtype : 'button',
						text : '查询',
						width:100,
						icon : imgpath + '/search.png',
						handler : function() {
							if (Ext.ComponentManager.get(
									'xzsb').getValue() == "") {
								Ext.example.msg('操作信息','{0}','请点击选择设备进行查询');
							} else {
								gridStore.load({
									params : {
										A_EQU_ID:Ext.ComponentManager
											.get(
											'equcode')
											.getValue()
									}
								});
							}
						}
					}, {
						id : 'equcode',
						xtype : 'hidden'
					}, {
						id : 'updateid',
						xtype : 'hidden'
					} ]
			});

		var buttonPanel = Ext
			.create(
			'Ext.panel.Panel',
			{
				id : 'buttonPanel',
				style: 'background-color:#FFFFFF',
				baseCls: 'my-panel-no-border',
				width : '100%',
				region : 'north',
				defaults : {
					style : 'margin:5px 0px 5px 10px',
					width:100
				},
				bodyPadding : 3,
				frame : true,
				layout : 'column',
				items : [
					{
						id : 'add',
						xtype : 'button',
						text : '添加位置',
						icon : imgpath + '/add.png',
						handler : function() {
							if (Ext.ComponentManager.get('xzsb').getValue() == "") {
								Ext.example.msg('操作信息','{0}','请点击选择设备进行添加');
							} else {
								windows.show();
								Ext.ComponentManager.get('updateid').setValue("");
								Ext.ComponentManager.get('wzms').setValue("");
								Ext.ComponentManager.get('jxdw').setValue("");
								Ext.ComponentManager.get('fzr').setValue("");
								Ext.ComponentManager.get('fzrId').setValue("");
								Ext.ComponentManager.get('ksybjbh').setValue("");
								Ext.ComponentManager.get('bz').setValue("");
								Ext.ComponentManager.get('bjamount').setValue("1");
							}
						}
					},
					{
						id : 'update',
						xtype : 'button',
						width:120,
						text : '修改选中位置',
						icon : imgpath + '/edit.png',
						handler : function() {
							var selectModel = Ext.getCmp("grid").getSelectionModel();
							var id = Ext.getCmp('grid').getSelectionModel().getSelection().length;
							if (id == '0' || id > 1) {
								Ext.example.msg('操作信息', '{0}','只能选择一条数据修改');
								return false;
							} else {
								windows.show();
								for (i = 0; i < Ext.getCmp('grid').getSelectionModel().getSelection().length; i++) {
									Ext.ComponentManager.get('wzms').setValue(selectModel.getSelection()[i].data.SITE_DESC);// 位置描述
									Ext.ComponentManager.get('jxdw').setValue(selectModel.getSelection()[i].data.MEND_DEPART);// 检修单位
									Ext.ComponentManager.get('fzr').setValue(selectModel.getSelection()[i].data.MEND_PERSON);// 负责人
									Ext.ComponentManager.get('fzrId').setValue(selectModel.getSelection()[i].data.MEND_PERSONID);// 负责人ID
									Ext.ComponentManager.get('ksybjbh').setValue(selectModel.getSelection()[i].data.BJ_ID);// 备件编号
									Ext.ComponentManager.get('bz').setValue(selectModel.getSelection()[i].data.REMARK);// 备注
									Ext.ComponentManager.get('bjamount').setValue(selectModel.getSelection()[i].data.BJ_AMOUNT);
									Ext.ComponentManager.get('updateid').setValue(selectModel.getSelection()[i].data.SITE_ID);// ID
								}
							}
						}
					},
					{
						id : 'delete',
						xtype : 'button',
						width:120,
						text : '删除选中位置',
						icon : imgpath + '/delete1.png',
						handler : function() {
							var selectModel = Ext.getCmp("grid").getSelectionModel();
							var id = Ext.getCmp('grid').getSelectionModel().getSelection().length;
							if (id == '0') {
								Ext.example.msg('操作信息','{0}', '请选择数据进行删除');
								return;
							} else {
								Ext.Msg.confirm(
									"警告",
									"确定要删除吗？",
									function(button) {
										if (button != "yes") {
											return;
										}
										for (i = 0; i < Ext.getCmp('grid').getSelectionModel().getSelection().length; i++) {
											Ext.Ajax.request({
												url: AppUrl + 'cjy/PRO_RUN_SITE_DELETE',
												async: false,
												method: 'POST',
												params: {
													A_SITE_ID: selectModel.getSelection()[i].data.SITE_ID
												},
												success: function (ret) {
													var resp = Ext.JSON.decode(ret.responseText);
													if(resp.RET=="Success"){

													}else {
													}
												}
											});
										}
										Ext.data.StoreManager.lookup('gridStore').load({
											params : {
												A_EQU_ID: Ext.ComponentManager.get('equcode').getValue()
											}
										});
									});

							}
						}
					},
					/*{
					 id : 'excel',
					 xtype : 'button',
					 text : '导出Excel',
					 listeners : {
					 click : OnButtonExportClicked
					 }
					 },*/
					{
						id : 'VGURL',
						xtype : 'button',
						text : '显示设备模拟图',
						handler : function() {
							if (Ext.ComponentManager.get('equcode').getValue() == "") {
								Ext.example.msg('操作信息','{0}', '请选择设备');
							} else {
								Ext.Ajax.request({
									url: AppUrl + 'cjy/PRO_RUN_EQU_VGURL',
									async: false,
									method: 'POST',
									params: {
										A_EQUID:Ext.ComponentManager.get('equcode').getValue()
									},
									success: function (ret) {
										var resp = Ext.JSON.decode(ret.responseText);
										if(resp.RET_URL==''||resp.RET_URL==null){
											alert("设备模拟图不存在");
										}else{
											window.open(resp.RET_URL,"","dialogHeight:500px;dialogWidth:800px");
										}
									}
								});
								/*window.open(AppUrl+ "page/No710401/Index.html?EQUCODE="+ Ext.ComponentManager.get('equcode').getValue(),
									"",
									"dialogHeight:500px;dialogWidth:800px");*/
							}
						}
					} ]
			});
		var windows = Ext.create('Ext.window.Window', {
			id : 'dialog',
			title : '添加修改面板',
			height : 350,
			bodyPadding : 5,
			closeAction : 'hide',
			width : 350,
			modal : true,
			frame : true,
			defaults : {
				labelWidth : 90,
				labelAlign : 'right'
			},
			items : [ {
				id : 'wzms',
				xtype : 'textfield',
				fieldLabel : '备件安装位置'
			}, {
				id : 'jxdw',
				xtype : 'textfield',
				fieldLabel : '检修单位'
			}, {
				id : 'fzr',
				xtype : 'textfield',
				fieldLabel : '负责人'
			},
				{
					id : 'fzrId',
					xtype : 'textfield',
					fieldLabel : '负责人ID'
				},{
					id : 'ksybjbh',
					xtype : 'textfield',
					fieldLabel : '备件编号'
				},{
					id : 'bjamount',
					xtype : 'numberfield',
					fieldLabel : '单次更换数量'
				}, {
					id : 'bz',
					xtype : 'textfield',
					fieldLabel : '备注'
				} ],
			buttons : [ {
				text : '保存',
				handler : btnbc
			}, {
				text : '取消',
				handler : function() {
					Ext.ComponentManager.get('dialog').hide();
					// window.hide();
				}
			} ]
		});
		Ext.create('Ext.container.Viewport', {
			layout : 'border',
			items : [ queryPanel, buttonPanel, grid ]
		});
		Ext.data.StoreManager.lookup('selPlantstore').on(
			"load",
			function() {
				Ext.getCmp("selPlant").select(
					Ext.data.StoreManager.lookup('selPlantstore')
						.getAt(0));

				Ext.data.StoreManager.lookup('selSectionstore').load(
					{
						params : {
							V_REPAIRDEPTCODE:Ext.util.Cookies.get('v_deptcode'),
							V_PERSONCODE:Ext.getCmp('selPlant').getValue()
						}
					});
			});
		Ext.data.StoreManager.lookup('selSectionstore').on(
			"load",
			function() {
				Ext.getCmp("selSection").select(
					Ext.data.StoreManager.lookup('selSectionstore')
						.getAt(0));
			});
		Ext.getCmp('selPlant').on(
			"change",
			function() {
				Ext.data.StoreManager.lookup('selSectionstore')
					.removeAll();
				Ext.data.StoreManager.lookup('selSectionstore').load(
					{
						params : {
							V_REPAIRDEPTCODE:Ext.util.Cookies.get('v_deptcode'),
							V_PERSONCODE:Ext.getCmp('selPlant').getValue()
						}
					});
			});


	})
function getEquipReturnValue(ret){
	var str =ret.split('^');
	Ext.getCmp('xzsb').setValue(str[1]);
	Ext.getCmp('equcode').setValue(str[0]);
}
function btnbc() {
	if (Ext.ComponentManager.get('updateid').getValue() == "") {// 添加
		Ext.Ajax.request({
			url: AppUrl + 'cjy/PRO_RUN_SITE_ADD',
			async: false,
			method: 'POST',
			params: {
				A_SITE_DESC:Ext.ComponentManager.get('wzms').getValue(),// 位置描述
				A_EQUID: Ext.ComponentManager.get('equcode').getValue(),// 设备编码
				A_REMARK: Ext.ComponentManager.get('bz').getValue(),// 备注
				A_USERNAME: Ext.util.Cookies.get('v_personname2'),// 录入人
				A_MEND_DEPART: Ext.ComponentManager.get('jxdw').getValue(),// 维修单位

				A_MEND_USERNAME: Ext.ComponentManager.get('fzr').getValue(),// 维修负责人
				A_MEND_USERNAMEID: Ext.ComponentManager.get('fzrId').getValue(),// 维修负责人ID
				A_BJ_ID:Ext.ComponentManager.get('ksybjbh').getValue(),// 备件
				A_BJ_AMOUNT: Ext.ComponentManager.get('bjamount').getValue()
			},
			success: function (ret) {
				var resp = Ext.JSON.decode(ret.responseText);
				if(resp.RET=="Success"){
					Ext.example.msg('操作信息', '操作成功');

				}else {
					Ext.Msg.alert('操作信息', '操作失败');
				}
			}
		});
	} else {// 修改
		Ext.Ajax.request({
			url: AppUrl + 'cjy/PRO_RUN_SITE_UPDATE',
			async: false,
			method: 'POST',
			params: {
				A_SITE_ID:Ext.ComponentManager.get('updateid').getValue(),// id
				A_SITE_DESC:Ext.ComponentManager.get('wzms').getValue(),// 位置描述
				A_REMARK: Ext.ComponentManager.get('bz').getValue(),// 备注
				A_USERNAME: Ext.util.Cookies.get('v_personname2'),// 录入人
				A_MEND_DEPART: Ext.ComponentManager.get('jxdw').getValue(),// 维修单位

				A_MEND_USERNAME: Ext.ComponentManager.get('fzr').getValue(),// 维修负责人
				A_MEND_USERNAMEID: Ext.ComponentManager.get('fzrId').getValue(),// 维修负责人ID
				A_BJ_ID:Ext.ComponentManager.get('ksybjbh').getValue(),// 备件
				A_BJ_AMOUNT: Ext.ComponentManager.get('bjamount').getValue()
			},
			success: function (ret) {
				var resp = Ext.JSON.decode(ret.responseText);
				if(resp.RET=="Success"){
					Ext.example.msg('操作信息', '操作成功');
					Ext.data.StoreManager.lookup('gridStore').load({
						params : {
							A_EQU_ID: Ext.ComponentManager.get('equcode').getValue()
						}
					});
				}else {
					Ext.Msg.alert('操作信息', '操作失败');
				}
			}
		});
	}
	Ext.ComponentManager.get('dialog').hide();

}
function left(value, metaData) {
	metaData.style = "text-align:left";
	return value;
}
function right(value, metaData) {
	metaData.style = "text-align:right";
	return value;
}
function OnButtonExportClicked() {
	document.location.href=AppUrl + 'cjy/No7104EXCEL?A_EQU_ID='+Ext.ComponentManager.get('equcode').getValue();
	/*var tableName = [ "备件安装位置", "录入（修改）人", "检修单位", "负责人", "备件编号","备件描述","单次更换数量","预装件", "备注" ];
	var tableKey = [ 'SITE_DESC', 'UPDATEPERSON', 'MEND_DEPART','MEND_PERSON','MEND_PERSONID', 'BJ_ID', 'BJ_DESC','BJ_AMOUNT','PRE_FLAG_DESC','REMARK' ]; //

	var parName = [ 'A_EQU_ID' ];
	var parType = [ 's' ];
	var parVal = [ excelProtect(Ext.ComponentManager.get('equcode').getValue()) ];
	var proName = 'PRO_RUN_SITE_ALL';
	var ExcelName = '设备备件备件安装位置表';

	var cursorName = 'RET';

	location.href = "ModelExcelTool?" +"tableName=" + tableName.join(",") + "&tableKey=" + tableKey.join(",")
		+ "&parName=" + parName.join(",") + "&parType=" + parType.join(",")
		+ "&parVal=" + parVal.join(",") + "&proName=" + proName
		+ "&ExcelName=" + ExcelName;*/

}
