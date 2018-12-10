var V_ORDERGUID='';
var V_ORGCODE='';
var V_DEPTCODE='';
var V_EQUCODE='';
var V_EQUTYPECODE='';

if (location.href.split('?')[1] != undefined) {
	V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
	V_ORGCODE = Ext.urlDecode(location.href.split('?')[1]).V_ORGCODE;
	V_DEPTCODE = Ext.urlDecode(location.href.split('?')[1]).V_DEPTCODE;
	V_EQUCODE = Ext.urlDecode(location.href.split('?')[1]).V_EQUCODE;
}

Ext.onReady(function() {
	Ext.create('Ext.container.Viewport', {
		layout:'border',
		items : [ form ]
	});
});

var form = {
	xtype : 'panel',
	region : 'center',
	layout : 'vbox',
	title : '生成模型',
	margin:'5px',
	items : [ {
		xtype : 'textfield',
		fieldLabel : '生成模型:',
		id : 'scmx',
		labelAlign : 'right',
		style : 'margin:50px 0px 50px 20px',
		width : 450
	}, {
		xtype : 'panel',
		layout : 'column',
		border : false,
		items : [ {
			xtype : 'button',
			text : '确定',
			width : 60,
			style : 'margin:0px 0px 50px 200px',
			listeners : {
				click : OnClickSaveButton
			}
		}, {
			xtype : 'button',
			text : '取消',
			width : 60,
			style : 'margin:0px 0px 50px 30px',
			listeners : {
				click : OnClickCancelButton
			}
		}]
	} ]
};

function OnClickSaveButton() {
	var V_JXMX_CODE=newGuid();
	var V_GX_CODE='';
	var v_work_desc="";
	Ext.Ajax.request({
		url:AppUrl + 'WorkOrder/PRO_PM_WORKORDER_GET',
		methon:'POST',
		async:false,
		params:{
            V_V_ORDERGUID:V_ORDERGUID
		},
		success:function (resp) {
			var res=Ext.decode(resp.responseText);
            if (res.list != "" && res.list != null) {
                v_work_desc=res.list[0].V_SHORT_TXT;
            }
        }
	});
	Ext.Ajax.request({//查找设备类型
		url: AppUrl + 'PM_06/PRO_SAP_PM_EQU_P_GET',
		method: 'POST',
		async: false,
		params : {
			V_V_EQUCODE:V_EQUCODE
		},
		success : function(resp) {
			var resptype = Ext.JSON.decode(resp.responseText);
			if (resptype.list.length>0) {
				V_EQUTYPECODE=resptype.list[0].V_EQUTYPECODE;
				Ext.Ajax.request({//保存模型
					method: 'POST',
					async: false,
					url: AppUrl + 'basic/PM_1917_JXMX_DATA_SET',
					params: {
						V_V_JXMX_CODE: V_JXMX_CODE,
						V_V_JXMX_NAME: Ext.getCmp('scmx').getValue(),
						V_V_ORGCODE: V_ORGCODE,
						V_V_DEPTCODE: V_DEPTCODE,
						V_V_EQUTYPECODE: V_EQUTYPECODE,
						V_V_EQUCODE: V_EQUCODE,
						V_V_EQUCODE_CHILD: '%',
						V_V_REPAIRMAJOR_CODE: '',
						V_V_BZ: v_work_desc,//'',
						V_V_HOUR: '',
						V_V_IN_PER: Ext.util.Cookies.get('v_personname2'),
						V_V_IN_DATE: Ext.util.Format.date(new Date(), 'Y-m-d')
					},
					success: function (response) {
						//var resp = Ext.decode(response.responseText);

						Ext.Ajax.request({//查出模型所属工序V_GX_CODE
							url: AppUrl + 'PM_03/PM_03_JXMX_DETAIL_SEL',
							method: 'POST',
							async: false,
							params: {
								V_V_JXMX_CODE : V_JXMX_CODE
							},
							success: function (ret) {
								var respcode = Ext.JSON.decode(ret.responseText);
								V_GX_CODE=respcode.list[0].V_GX_CODE;


							}
						});
						$.ajax({//查找工序数量
							url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_OPERATIONS',
							type : 'post',
							async : false,
							data : {
								V_V_ORDERGUID:V_ORDERGUID
							},
							dataType : "json",
							traditional : true,
							success : function(resp) {
								if (resp.list != "" && resp.list != null) {

									for (var j = 0; j < resp.list.length; j++) {
										Ext.Ajax.request({//保存工序
											url: AppUrl + 'pm_19/PM_1917_JXGX_DATA_SETNEW',
											method: 'POST',
											async: false,
											params: {
												V_V_JXGX_CODE: resp.list[j].V_GUID,
												V_V_JXGX_NAME: resp.list[j].V_DESCRIPTION,
												V_V_JXGX_NR: resp.list[j].V_DESCRIPTION,
												V_V_GZZX_CODE: resp.list[j].V_WORK_CENTER_CODE,
												V_V_JXMX_CODE: V_JXMX_CODE,//V_GX_CODE,
												V_V_ORDER: '',
												V_V_PERNUM: resp.list[j].I_DURATION_NORMAL,
												V_V_PERTIME: resp.list[j].I_WORK_ACTIVITY,
												V_V_JXBZ: resp.list[j].V_JXBZ,
												V_V_JXBZ_VALUE_DOWN: resp.list[j].V_JXBZ_VALUE_DOWN,
												V_V_JXBZ_VALUE_UP: resp.list[j].V_JXBZ_VALUE_UP
											},
											success: function (ret) {
												//var respgx = Ext.JSON.decode(ret.responseText);
												Ext.Ajax.request({//查看当前机具数量
													url: AppUrl + 'cjy/PRO_PM_1917_JXGX_JJ_DATA_VIEW',
													method: 'POST',
													async: false,
													params: {
														V_V_JXGX_CODE: resp.list[j].V_GUID

													},
													success: function (ret) {
														var respjj = Ext.JSON.decode(ret.responseText);
														if (respjj.list.length > 0) {
															for (var i = 0; i < respjj.list.length; i++) {
																Ext.Ajax.request({//保存机具（车辆）
																	url: AppUrl + 'hp/PM_1917_JXGX_JJ_DATA_SET',
																	method: 'POST',
																	async: false,
																	params: {
																		V_V_JXGX_CODE: resp.list[j].V_GUID,
																		V_V_JJ_CODE: respjj.list[i].V_JJ_CODE,
																		V_V_TS: '1',
																		V_V_EQUCODE: V_EQUCODE

																	},
																	success: function (ret) {
																	}
																});
															}
														}
													}
												});

												Ext.Ajax.request({//查看当前工具数量
													url: AppUrl + 'cjy/PRO_PM_1917_JXGX_GJ_DATA_VIEW',
													method: 'POST',
													async: false,
													params: {
														V_V_JXGX_CODE: resp.list[j].V_GUID

													},
													success: function (ret) {
														var respgj = Ext.JSON.decode(ret.responseText);
														if (respgj.list.length > 0) {
															for (var i = 0; i < respgj.list.length; i++) {
																Ext.Ajax.request({//保存工具
																	method: 'POST',
																	async: false,
																	url: AppUrl + 'basic/PM_1917_JXGX_GJ_DATA_SET',
																	params: {
																		V_V_JXGX_CODE: resp.list[j].V_GUID,
																		V_V_GJ_CODE: respgj.list[i].V_GJ_CODE,
																	},
																	success: function (response) {
																	}
																});
															}
														}
													}
												});

												Ext.Ajax.request({//查看当前工种数量
													url: AppUrl + 'cjy/PRO_PM_1917_JXGX_PER_DATA_VIEW',
													method: 'POST',
													async: false,
													params: {
														V_V_JXGX_CODE: resp.list[j].V_GUID

													},
													success: function (ret) {
														var respgz = Ext.JSON.decode(ret.responseText);
														if (respgz.list.length > 0) {
															for (var i = 0; i < respgz.list.length; i++) {
																Ext.Ajax.request({//保存工种
																	method: 'POST',
																	async: false,
																	url: AppUrl + 'basic/PM_1917_JXGX_PER_DATA_SET',
																	params: {
																		V_V_JXGX_CODE: resp.list[j].V_GUID,
																		V_V_PERCODE_DE: respgz.list[i].V_PERCODE_DE,
																		V_V_TS: respgz.list[i].V_TS
																	},
																	success: function (response) {
																	}
																});
															}
														}
													}
												});

												Ext.Ajax.request({//查看当前物料数量
													url: AppUrl + 'zdh/PRO_PM_WORKORDER_SPARE_VIEW',
													method: 'POST',
													async: false,
													params: {
														V_V_ORDERGUID: V_ORDERGUID

													},
													success: function (ret) {
														var respwl = Ext.JSON.decode(ret.responseText);
														if (respwl.list.length > 0) {
															for (var i = 0; i < respwl.list.length; i++) {
																Ext.Ajax.request({//保存物料
																	url: AppUrl + 'zdh/PM_1917_JXGX_WL_DATA_SET',
																	method: 'POST',
																	async: false,
																	params: {
																		V_V_JXGX_CODE:resp.list[j].V_GUID,
																		V_V_KFNAME:'',
																		V_V_WLCODE:respwl.list[i].V_MATERIALCODE,
																		V_V_WLSM:respwl.list[i].V_MATERIALNAME,
																		V_V_GGXH: '',
																		V_V_JLDW: '',
																		V_V_PRICE:'',
																		V_V_NUM:respwl.list[i].I_PLANAMOUNT
																	},
																	success: function (response) {
																	}
																});
															}
														}
													}
												});

												Ext.Ajax.request({//查看当前安全措施数量
													url: AppUrl + 'cjy/PRO_PM_1917_JXGX_AQCS_DATA_V',
													method: 'POST',
													async: false,
													params: {
														V_V_JXGX_CODE: resp.list[j].V_GUID

													},
													success: function (ret) {
														var respaq = Ext.JSON.decode(ret.responseText);
														if (respaq.list.length > 0) {
															for (var i = 0; i < respaq.list.length; i++) {
																Ext.Ajax.request({
																	method: 'POST',
																	async: false,
																	url: AppUrl + 'basic/PM_1917_JXGX_AQCS_DATA_SET',
																	params: {
																		V_V_JXGX_CODE: resp.list[j].V_GUID,
																		V_V_AQCS_CODE: respaq.list[i].V_AQCS_CODE,
																	},
																	success: function (response) {
																	}
																});
															}
														}
													}
												});

											}
										});
									}
									alert("添加成功");
									window.close();

								} else {
									alert('无可添加工序');
								}
							}
						});

					}
				});
			} else {
				alert('查找设备类型失败');
			}
		}

	});
	/*Ext.Ajax.request({
		url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_MODEL_CREATE',
		method: 'POST',
		async: false,
		params : {
			V_V_ORDERGUID:Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID,
			V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
			V_V_PERSONNAME:Ext.util.Cookies.get('v_personname2'),
			V_V_MOD_NAME:Ext.getCmp('scmx').getValue()
		},
		success : function(resp) {
			var resp = Ext.JSON.decode(resp.responseText);
			if (resp.V_INFO == '成功') {
				Ext.Msg.alert('操作信息','添加成功');
				//Ext.example.msg('操作信息', '{0}', '添加成功');
			} else {
				Ext.Msg.alert('操作信息','添加失败');
				//Ext.example.msg('操作信息', '{0}', '添加失败');
			}
		}

	});
	window.close();*/
}

function OnClickCancelButton() {
	window.close();
}
function newGuid() {
	var guid = "";
	for ( var i = 1; i <= 32; i++) {
		var n = Math.floor(Math.random() * 16.0).toString(16);
		guid += n;
		if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
			guid += "-";
	}
	return guid;
}
