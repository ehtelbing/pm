
Ext.onReady(function() {
		Ext.QuickTips.init();
		var selPlantstore = Ext.create('Ext.data.Store', {
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

		var sdjy = Ext.create('Ext.data.Store', {
			autoLoad : false,
			storeId : 'sdjy',
			fields : [ 'V_PERSONCODE', 'V_PERSONNAME' ],
			proxy : {
				type : 'ajax',
				async : false,
				url: AppUrl + 'No4120/PRO_BASE_PERSON_VIEW_ROLE',
				actionMethods : {
					read : 'POST'
				},
				reader : {
					type : 'json',
					root : 'list'
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
						store : [ [ '2', '待反馈' ]]
					},
					{
						id : 'djy',
						xtype : 'combo',
						store : sdjy,
						editable : false,
						fieldLabel : '点检员',
						labelWidth : 90,
						displayField : 'V_PERSONNAME',
						valueField : 'V_PERSONCODE',
						queryMode : 'local',
						labelAlign : 'right'
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
										V_DJ_PERCODE:Ext.getCmp('djy').getValue(),
										V_V_SHORT_TXT:Ext.getCmp("seltext").getValue()
										/*parName : ['V_V_PERSONCODE',
										 'V_V_ORGCODE',
										 'V_V_DEPTCODE',
										 'V_V_DEPTCODEREPARIR',
										 'V_V_STATECODE',
										 'V_DJ_PERCODE',
										 'V_V_SHORT_TXT' ],
										 parType : [ 's','s', 's',
										 's', 's', 's', 's' ],
										 parVal : [Ext.util.Cookies.get('v_personcode'),
										 Ext.getCmp('selPlant').getValue(),
										 Ext.getCmp('selSection').getValue(),
										 Ext.util.Cookies.get('v_deptcode'),
										 Ext.getCmp("selStatus").getValue(),
										 Ext.getCmp('djy').getValue(),
										 Ext.getCmp("seltext").getValue() ],
										 proName : 'PRO_PM_WORKORDER_LIST_Re_back',
										 cursorName : 'V_CURSOR'*/
									}
								})
						}
					},
					{
						xtype : 'button',
						id : 'btnPrint',
						text : '工单反馈',
						width : 100,
						listeners : {
							click : OnButtonCreateBillClicked
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
						'D_ENTER_DATE', 'V_DEPTNAMEREPARIR','V_ORDER_TYP_TXT','V_ORGCODE' ,'V_DEPTCODE'],
					proxy : {
						type : 'ajax',
						async : false,
						url: AppUrl + 'No4120/PRO_PM_WORKORDER_LIST_Re_back',
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
					width : 200,
					align : 'center',
					renderer : CreateGridColumnTd
				}, {
					text : '委托单位',
					dataIndex : 'V_DEPTNAME',
					width : 200,
					algin : 'center',
					renderer : CreateGridColumnTd
				}, {
					text : '委托人',
					dataIndex : 'V_PERSONNAME',
					width : 150,
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
					width : 200,
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
				Ext.ComponentManager.get("selStatus").select("2");
				Ext.data.StoreManager.lookup('selSectionstore').load(
					{
						params : {
							V_REPAIRDEPTCODE:Ext.util.Cookies.get('v_deptcode'),
							V_PERSONCODE:Ext.util.Cookies.get('v_personcode')
						}
					});
			});
		Ext.data.StoreManager.lookup('selSectionstore').on("load",function() {
			Ext.getCmp("selSection").select(
				Ext.data.StoreManager.lookup('selSectionstore')
					.getAt(0));

		});

		sdjy.on('load', function() {
			Ext.ComponentManager.get('djy').store.insert(0, {
				'V_PERSONCODE' : '%',
				'V_PERSONNAME' : '全部'
			});
			Ext.getCmp('djy').select(sdjy.getAt(0));
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
					V_DJ_PERCODE:Ext.getCmp('djy').getValue(),
					V_V_SHORT_TXT:Ext.getCmp("seltext").getValue()
				}
			});
			sdjy.load({
				params : {
					V_V_DEPTCODE:Ext.getCmp('selSection').getValue(),
					V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
					V_V_ROLE: '01'
					/*parName : [ 'V_V_DEPTCODE', 'V_V_PERSONCODE',
					 'V_V_ROLE' ],
					 parType : [ 's', 's', 's' ],
					 parVal : [ Ext.getCmp('selSection').getValue(),
					 Ext.util.Cookies.get('v_personcode'), '01' ],
					 proName : 'PRO_BASE_PERSON_VIEW_ROLE',
					 cursorName : 'V_CURSOR'*/
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
		Ext.Msg.alert('操作信息',  '请选择数据进行操作');
		return;
	} else {
		var selectedRecord = Ext.getCmp("grid").getSelectionModel()
			.getSelection();
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
					V_V_PERSONCODE:Ext.util.Cookies.get('v_personname2'),
					V_V_ORDERGUID:selectModel.getSelection()[i].data.V_ORDERGUID

					/*parName : [ 'V_V_PERSONCODE', 'V_V_ORDERGUID' ],
					 parType : [ 's', 's' ],
					 parVal : [ Ext.util.Cookies.get('v_personname2'),
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
			Ext.Msg.alert('操作信息', '工单接收成功');
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
					V_DJ_PERCODE:Ext.getCmp('djy').getValue(),
					V_V_SHORT_TXT:Ext.getCmp("seltext").getValue()
				}
			});
	}
}

function itemClick(s, record, item, index, e, eOpts) {
	Ext.Ajax.request({
		url:AppUrl+'mm/GetBillMaterialByOrder',
		type:'post',
		async:false,
		params:{
			V_V_ORDERID:record.data.V_ORDERID,
			V_V_ORDERGUID:record.data.V_ORDERGUID,
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
	var returnValue=window.open(AppUrl + "page/No412101/Index.html?V_GUID="+record.data.V_ORDERGUID+'&V_V_PLANT='+record.data.V_ORGCODE+'&V_V_DEPT='+record.data.V_DEPTCODE,+'&personname='+Ext.util.Cookies.get('v_personname2') ,
		"", "dialogHeight:700px;dialogWidth:1100px");
}

function GetBillMatByOrder( s_orderid,s_orderguid){

	Ext.Ajax.request({
		url:APP + 'mm/WS_EquipGetBillMaterialByOrderService',
		async : false,
		method : 'POST',
		params : {
			parName : [ 'orderid','V_V_ORDERGUID' ],
			parType : [  's', 's' ],
			parVal : [s_orderid,s_orderguid
			]
		},
		failure :function(){},
		success : function(ret) {

		}
	});
}
function OnButtonCreateBillClicked() {
	var id = Ext.getCmp('grid').getSelectionModel().getSelection().length;
	if (id != '1') {
		Ext.Msg.alert('操作信息','请选择数据进行操作');
		return;
	} else {
		var V_GUID = Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.V_ORDERGUID;
		var ORDERID = Ext.getCmp("grid").getSelectionModel().getSelection()[0].data.V_ORDERID;

		Ext.Ajax.request({
			url:AppUrl+'mm/GetBillMaterialByOrder',
			type:'post',
			async:false,
			params:{
				V_V_ORDERID:ORDERID,
				V_V_ORDERGUID:V_GUID,
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
		var returnValue=window.open(AppUrl + "page/No412101/Index.html?V_GUID="+V_GUID+'&personname='+Ext.util.Cookies.get('v_personname2') ,
			"", "dialogHeight:700px;dialogWidth:1100px");
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
			V_DJ_PERCODE:Ext.getCmp('djy').getValue(),
			V_V_SHORT_TXT:Ext.getCmp("seltext").getValue()
		}
	});
}

function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return '<div data-qtip="' + value + '" >' + value + '</div>';
}
function queryGrid(){
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
				V_DJ_PERCODE:Ext.getCmp('djy').getValue(),
				V_V_SHORT_TXT:Ext.getCmp("seltext").getValue()

			}
		})
}