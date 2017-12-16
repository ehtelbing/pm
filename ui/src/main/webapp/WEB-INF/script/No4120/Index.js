var selectID = [];
Ext.onReady(function() {
			Ext.QuickTips.init();
			var selPlantstore = Ext.create('Ext.data.Store', {
				autoLoad : true,
				storeId : 'selPlantstore',
				fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
				proxy : {
					type : 'ajax',
					async : false,
					//url : APP + '/ModelSelect',
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
					//url : APP + '/ModelSelect',
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

			var panel = Ext.create('Ext.panel.Panel', {
								id : 'panellow',
								width : '100%',
								region : 'north',
								frame : true,
								layout : 'column',
								defaults : {
									style : 'margin:5px 0px 5px 5px',
									labelAlign : 'right'
								},
								items : [
										{
											xtype : 'combo',
											id : "selPlant",
											store : selPlantstore,
											editable : false,
											queryMode : 'local',
											fieldLabel : '单位名称',
											displayField : 'V_DEPTNAME',
											valueField : 'V_DEPTCODE',
											labelWidth : 90,
											labelAlign : 'right'
										},
										{
											xtype : 'combo',
											id : "selSection",
											store : selSectionstore,
											editable : false,
											queryMode : 'local',
											fieldLabel : '作业区名称',
											displayField : 'V_DEPTNAME',
											valueField : 'V_DEPTCODE',
											labelWidth : 90,
											labelAlign : 'right'
										},
										{
											xtype : 'combo',
											id : "selStatus",
											fieldLabel : '状态类型',
											editable : false,
											labelWidth : 90,
											labelAlign : 'right',
											store : [ [ '1', '未打印' ],
													[ '2', '已打印' ] ]
										},
										{
											xtype : 'textfield',
											id : 'seltext',
											emptyText : '工单描述模糊查询',
											labelAlign : 'right',
											width : 158,
											margin:'5px 0px 5px 100px'
										},
										{
											xtype : 'button',
											text : '查询',
											icon : imgpath+'/search.png',
											width : 100,
											handler : function() {
												Ext.data.StoreManager
														.lookup('gridStore')
														.load(
																{
																	params : {
																		V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
																		V_V_ORGCODE:Ext.getCmp('selPlant').getValue(),
																		V_V_DEPTCODE:Ext.getCmp('selSection').getValue(),
																		V_V_DEPTCODEREPARIR:Ext.util.Cookies.get('v_deptcode'),
																		V_V_STATECODE:Ext.getCmp("selStatus").getValue(),
																		V_V_SHORT_TXT:Ext.getCmp("seltext").getValue()
																	}
																})
											}
										},
										{
											xtype : 'button',
											id : 'btnPrint',
											text : '批量打印接收',
											icon : imgpath+'/printer.png',
											width : 100,
											listeners : {
												click : OnButtonCreateBillClicked
											}
										},
									{
										xtype : 'button',
										id : 'btnChange',
										text : '转为预留工单',
										icon : imgpath+'/add.png',
										width : 100,
										listeners : {
											click : OnButtonChangeClicked
										}
									}]
							});
			var grid = Ext.create('Ext.grid.Panel',
					{
						id : 'grid',
						region : 'center',
						columnLines : true,
						width : '100%',
						store : {
							id : 'gridStore',
							autoLoad : false,
							fields : [ 'ID', 'V_ORDERGUID', 'V_ORDERID',
									'V_SHORT_TXT', 'V_EQUIP_NO',
									'V_EQUIP_NAME', 'V_EQUSITENAME', 'V_SPARE',
									'V_ORGNAME', 'V_DEPTNAME', 'V_PERSONNAME',
									'D_ENTER_DATE', 'V_DEPTNAMEREPARIR','V_ORDER_TYP_TXT' ],
							proxy : {
								type : 'ajax',
								async : false,
								//url : APP + '/ModelSelect',
								url: AppUrl + 'No4120/PRO_PM_WORKORDER_LIST_REPAIR',
								actionMethods : {
									read : 'POST'
								},
								reader : {
									type : 'json',
									root : 'list'
								}
							}
						},
						autoScroll : true,
						selType : 'checkboxmodel',
						height : 400,
						columns : [ {
							xtype : 'rownumberer',
							text : '序号',
							width : 50,
							align : 'center'
						}, {
							text : '工单GUID',
							dataIndex : 'V_ORDERGUID',
							hidden : true,
							renderer : CreateGridColumnTd
						}, {
							text : '工单号',
							dataIndex : 'V_ORDERID',
							width : 150,
							align : 'center',
							renderer : CreateGridColumnTd
						}, {
							text : '工单描述',
							dataIndex : 'V_SHORT_TXT',
							renderer : CreateGridColumnTd,
							width : 300,
							align : 'center'
						}, {
							text : '设备编号',
							dataIndex : 'V_EQUIP_NO',
							hidden : true,
							renderer : CreateGridColumnTd
						}, {
							text : '设备名称',
							dataIndex : 'V_EQUIP_NAME',
							width : 150,
							align : 'center',
							renderer : CreateGridColumnTd
						}, {
							text : '设备位置',
							dataIndex : 'V_EQUSITENAME',
							width : 250,
							algin : 'center',
							renderer : CreateGridColumnTd
						}, {
							text : '备件消耗',
							dataIndex : 'V_SPARE',
							width : 300,
							align : 'center',
							renderer : CreateGridColumnTd
						}, {
							text : '厂矿',
							dataIndex : 'V_ORGNAME',
							width : 150,
							align : 'center',
							renderer : CreateGridColumnTd
						}, {
							text : '委托单位',
							dataIndex : 'V_DEPTNAME',
							width : 100,
							algin : 'center',
							renderer : CreateGridColumnTd
						}, {
							text : '委托人',
							dataIndex : 'V_PERSONNAME',
							width : 100,
							align : 'center',
							renderer : CreateGridColumnTd
						}, {
							text : '委托时间',
							dataIndex : 'D_ENTER_DATE',
							width : 150,
							align : 'center',
							renderer : CreateGridColumnTd
						}, {
							text : '检修单位',
							dataIndex : 'V_DEPTNAMEREPARIR',
							width : 150,
							align : 'center',
							renderer : CreateGridColumnTd
						}, {
							text : '工单类型描述',
							dataIndex : 'V_ORDER_TYP_TXT',
							width : 100,
							align : 'center',
							renderer : CreateGridColumnTd
						} ],
						listeners : {
							itemdblclick : itemClick
						}
					});

			Ext.data.StoreManager.lookup('selPlantstore').on(
					"load",
					function() {
						Ext.getCmp("selPlant").select(
								Ext.data.StoreManager.lookup('selPlantstore')
										.getAt(0));
						Ext.ComponentManager.get("selStatus").select("1");
						Ext.data.StoreManager.lookup('selSectionstore').load(
								{
									params : {
										V_REPAIRDEPTCODE:Ext.util.Cookies.get('v_deptcode'),
										V_PERSONCODE:Ext.getCmp('selPlant').getValue()
										/*parName : [ 'V_REPAIRDEPTCODE','V_PERSONCODE'],
										parType : [ 's', 's' ],
										parVal : [Ext.util.Cookies.get('v_deptcode'),Ext.util.Cookies.get('v_personcode')],
										proName : 'PRO_PM_REPAIRDEPT_TODEPT',
										cursorName : 'V_CURSOR'*/
									}
								});
					});
			Ext.data.StoreManager.lookup('selSectionstore').on("load",function() {
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
										V_PERSONCODE:Ext.util.Cookies.get('v_personcode')
									}
								});
					});

			Ext.getCmp('selStatus').on("change",function() {});

			Ext.getCmp('selSection').on("change",function() {
								Ext.data.StoreManager.lookup('gridStore').load({
													params : {
														V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
														V_V_ORGCODE:Ext.getCmp('selPlant').getValue(),
														V_V_DEPTCODE:Ext.getCmp('selSection').getValue(),
														V_V_DEPTCODEREPARIR:Ext.util.Cookies.get('v_deptcode'),
														V_V_STATECODE:Ext.getCmp("selStatus").getValue(),
														V_V_SHORT_TXT:Ext.getCmp("seltext").getValue()
													}
												});
							});

			Ext.create('Ext.container.Viewport', {
				id : "id",
				layout : 'border',
				items : [ panel, grid ]
			});
		});

function MoreAcceptBill() {
	var selectModel = Ext.getCmp("grid").getSelectionModel();
	var id = Ext.getCmp('grid').getSelectionModel().getSelection().length;
	if (id == ' 0') {
		Ext.Msg.alert('操作信息', '请选择数据接收工单');
		return;
	} else {
		var selectedRecord = Ext.getCmp("grid").getSelectionModel().getSelection();
		var selectID = [];
		Ext.Array.each(selectedRecord, function(V_ORDERGUID, index) {
			selectID.splice(index, 0, V_ORDERGUID.data.V_ORDERGUID);
		});
		var i_err = 0;
		for (i = 0; i < Ext.getCmp('grid').getSelectionModel().getSelection().length; i++) {
			Ext.Ajax.request({
				url: AppUrl + 'No4120/PRO_PM_WORKORDER_JS_REPAIRDEPT',
				method : 'post',
				async:false,
				params : {
					V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
					V_V_ORDERGUID:selectModel.getSelection()[i].data.V_ORDERGUID
					/*parName : [ 'V_V_PERSONCODE', 'V_V_ORDERGUID' ],
					parType : [ 's', 's' ],
					parVal : [ Ext.util.Cookies.get('v_personcode'),
							selectModel.getSelection()[i].data.V_ORDERGUID ],
					proName : 'PRO_PM_WORKORDER_JS_REPAIRDEPT',
					returnStr : 'V_CURSOR',
					returnStrType : [ 's' ]*/
				},
				success : function(resp) {
					if (resp[0] == '成功') {
						Ext.Msg.alert('操作信息', '工单接收失败');
						i_err++;
					}
				}

			});

		}
		if (i_err == 0) {
			Ext.Msg.alert('操作信息',  '工单接收成功');
		}
		Ext.data.StoreManager.lookup('gridStore')
				.load(
						{
							params : {
								V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
								V_V_ORGCODE:Ext.getCmp('selPlant').getValue(),
								V_V_DEPTCODE:Ext.getCmp('selSection').getValue(),
								V_V_DEPTCODEREPARIR:Ext.util.Cookies.get('v_deptcode'),
								V_V_STATECODE:Ext.getCmp("selStatus").getValue(),
								V_V_SHORT_TXT:Ext.getCmp("seltext").getValue()
							}
						});
	}
}

function itemClick(s, record, item, index, e, eOpts) {
	//if(Ext.getCmp('selStatus').getValue()=="2"){}else{MoreAcceptBill();}
	selectID=[];
	var selectedRecord = Ext.getCmp("grid").getSelectionModel().getSelection();

	GetBillMatByOrder(selectedRecord[0].data.V_ORDERID,selectedRecord[0].data.V_ORDERGUID);

	/*Ext.Ajax.request({
		url:AppUrl+'mm/GetBillMaterialByOrder',
		type:'post',
		async:false,
		params:{
			V_V_ORDERID:selectedRecord[0].data.V_ORDERID,
			V_V_ORDERGUID:selectedRecord[0].data.V_ORDERGUID,
			V_V_PERCODE: Ext.util.Cookies.get('v_personcode')
		},
		success:function(response){
			var resp=Ext.decode(response.responseText);
			if(resp.ret=='Success'){
				//alert("工单创建成功");
			}else{
				//alert("接口调用失败");
			}
		}
	});*/
	selectID.push(record.data.V_ORDERGUID);
	window.open(AppUrl + "page/No410101/Index.html", selectID, "dialogHeight:700px;dialogWidth:1100px");

}

function GetBillMatByOrder( s_orderid,s_orderguid){
	Ext.Ajax.request({
		url: AppUrl + 'mm/WS_EquipGetBillMaterialByOrderService',
		method: 'POST',
		async: false,
		params: {
			V_V_ORDERGUID: s_orderguid,
			V_V_ORDERID: s_orderid,
			x_personcode : Ext.util.Cookies.get('v_personcode')
		},
		success: function (resp) {

		}
	});


}
function OnButtonCreateBillClicked() {
	//if(Ext.getCmp('selStatus').getValue()=="2"){}else{ MoreAcceptBill();}
	
	
	var selectModel = Ext.getCmp("grid").getSelectionModel();
	var id = Ext.getCmp('grid').getSelectionModel().getSelection().length;
	if (id == 0) {
		Ext.Msg.alert('操作信息', '请选择数据打印工单');
		return;
	} else {
		var selectedRecord = Ext.getCmp("grid").getSelectionModel()
				.getSelection();

		selectID=[];
		Ext.Array.each(selectedRecord, function(V_ORDERGUID, index) {
			GetBillMatByOrder(V_ORDERGUID.data.V_ORDERID,V_ORDERGUID.data.V_ORDERGUID);
			Ext.Ajax.request({
				url:AppUrl+'mm/GetBillMaterialByOrder',
				type:'post',
				async:false,
				params:{
					V_V_ORDERID:V_ORDERGUID.data.V_ORDERID,
					V_V_ORDERGUID:V_ORDERGUID.data.V_ORDERGUID,
					V_V_PERCODE: Ext.util.Cookies.get('v_personcode')
				},
				success:function(response){
					var resp=Ext.decode(response.responseText);
					if(resp.ret=='Success'){
						//alert("工单创建成功");
					}else{
						//alert("接口调用失败");
					}
				}
			});
			selectID.splice(index, 0, V_ORDERGUID.data.V_ORDERGUID);
		});
		window.open(AppUrl + "page/No410101/Index.html", selectID,
				"dialogHeight:700px;dialogWidth:1100px");

	}
}

function QueryGrid(){
	Ext.data.StoreManager.lookup('gridStore').load({
				params : {
					V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
					V_V_ORGCODE:Ext.getCmp('selPlant').getValue(),
					V_V_DEPTCODE:Ext.getCmp('selSection').getValue(),
					V_V_DEPTCODEREPARIR:Ext.util.Cookies.get('v_deptcode'),
					V_V_STATECODE:Ext.getCmp("selStatus").getValue(),
					V_V_SHORT_TXT:Ext.getCmp("seltext").getValue()
				}
			});
}

function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
function OnButtonChangeClicked(){
	var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
	var length=seldata.length;
	if(length==0){
		Ext.Msg.alert("操作信息","请选择记录");
		return false;
	}
	for(var i=0;i<length;i++){
		Ext.Ajax.request({
			url: AppUrl + 'PM_09/PRO_WORKORDER_YL_SET',
			async: false,
			method: 'POST',
			params: {
				V_V_ORDERGUID: seldata[i].data.V_ORDERGUID
			},
			success: function (ret) {
				var resp = Ext.JSON.decode(ret.responseText);
			}
		});
	}
	Ext.data.StoreManager.lookup('gridStore').load({
		params : {
			V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
			V_V_ORGCODE:Ext.getCmp('selPlant').getValue(),
			V_V_DEPTCODE:Ext.getCmp('selSection').getValue(),
			V_V_DEPTCODEREPARIR:Ext.util.Cookies.get('v_deptcode'),
			V_V_STATECODE:Ext.getCmp("selStatus").getValue(),
			V_V_SHORT_TXT:Ext.getCmp("seltext").getValue()
		}
	})
}