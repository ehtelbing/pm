if (window.screen) { //判断浏览器是否支持window.screen判断浏览器是否支持screen
var myw = screen.availWidth; //定义一个myw，接受到当前全屏的宽
var myh = screen.availHeight; //定义一个myw，接受到当前全屏的高
window.moveTo(0, 0); //把window放在左上脚
window.resizeTo(myw, myh); //把当前窗体的长宽跳转为myw和myh
}


var key_code = '';
var code = '';
var unicode = '';
var djname = '';
var plantcode='',plantname='',departcode='',departname='',confirm_flag_in='0';
if (location.href.split('?')[1] != null) {
	key_code = Ext.urlDecode(location.href.split('?')[1]).key_code;
	plantcode = Ext.urlDecode(location.href.split('?')[1]).plantcode;
	plantname = Ext.urlDecode(location.href.split('?')[1]).plantname;
	departcode = Ext.urlDecode(location.href.split('?')[1]).departcode;
	departname = Ext.urlDecode(location.href.split('?')[1]).departname;
	confirm_flag_in = Ext.urlDecode(location.href.split('?')[1]).confirm_flag_in;
}
var gridStorexzdj = Ext.create('Ext.data.Store',
		{

			storeId : 'gridStorexzdj',
			fields : [ 'DJ_UNIQUE_CODE', 'DJ_NAME', 'DJ_TYPE',
					'DJ_SERIES_CLASS', 'DJ_VOL', 'DJ_V', 'DJ_CS',
					'DJ_DXTYPE', 'DJ_WEIGHT', 'DJ_CS_DZ',
					'DJ_CS_ZZ', 'WORK_STATUS', 'PLANTCODE',
					'PLANTNAME', 'DEPARTCODE', 'DEPARTNAME',
					'LOC_PLANTCODE', 'LOC_PLANTNAME', 'DJ_LOC',
					'REMARK', 'INSERTDATE', 'DZ_V', 'DZ_A', 'ZZ_V',
					'ZZ_A', 'W_YINSHU', 'EDZS', 'JXFS', 'JYDJ',
					'SUPPLY_CODE', 'SUPPLY_NAME', 'PRODUCE_DATE',
					'DJ_CODE','DJ_MENDCOUNT' ],
			proxy : {
				type : 'ajax',
				async : false,
				url : AppUrl + 'DJ/pro_dj201_djmainlist',
				actionMethods : {
					read : 'POST'
				},
				reader : {
					type : 'json',
					root : 'list'
				}
			}
		});

			/** 选择电机 */
			var window1 = Ext.create('Ext.window.Window', {
				style: 'background-color:#FFFFFF',
				//baseCls: 'my-panel-no-border',
				id : 'window1',
				title : '选择电机',
				titleAlign:'center',
				frame : true,
				width : 900,
				height : 300,
				region : 'center',
				layout : 'border',
				closeAction : 'hide',
				modal : true,
				defaults : {
					labelAlign : 'right',
					style : 'margin-top:8px'
				},
				items : [{
					frame : true,
					style : 'margin-bottom:1px',
					defaults : {
						labelAlign : 'right',
						labelWidth : 80,
					    margin:'10px 0px 10px 10px'

					},
					width:900,
					style: 'background-color:#FFFFFF',
					baseCls: 'my-panel-no-border',
					layout : {
						type : 'table',
						columns : 4
					},
					items : [
				    {
						id : 'dj_name',
						labelWidth : 80,
						width : 200,
						xtype : 'textfield',
						fieldLabel : '电机名称'
					},
					{
						id : 'dj_vol',
						xtype : 'textfield',
						labelWidth : 80,
						width : 200,
						fieldLabel : '电机容量'
					},
					{
						id : 'dj_loc',
						xtype : 'textfield',
						labelWidth : 80,
						width : 200,
						fieldLabel : '功能位置'
					},
					{
						id : 'dj_type',
						xtype : 'textfield',
						labelWidth : 80,
						width : 200,
						fieldLabel : '电机型号'
					},
				    {
						xtype : 'button',
						text : '查询',
						id : 'djlist',
						margin : '0px 0px 10px 85px'
					}]
				},
				{
				xtype : 'grid',
				id : 'gridxzdj',
				region : 'center',
				columnLines : true,
				// selType : 'checkboxmodel',
				store : gridStorexzdj,
				style : 'margin-top:80px',
				columns : [ {
					text : '选择',
					id : 'wydjbh',
					 dataIndex : 'DJ_UNIQUE_CODE',
					align : 'center',
					renderer : LookMorexzdj

				}, {
					text : '维修次数',
					id : 'djcount',
					dataIndex : 'DJ_MENDCOUNT',
					align : 'center'
				}, {
					text : '电机编号',
					id : 'djbh',
					dataIndex : 'DJ_CODE',
					align : 'center'
				}, {
					text : '电机名称',
					id : 'djmc',
					dataIndex : 'DJ_NAME',
					align : 'center'
				}, {
					text : '电压',

					 dataIndex : 'DJ_V',
					align : 'center'
				}, {
					text : '电机容量',

					dataIndex : 'DJ_VOL',
					align : 'center'
				}, {
					text : '电机型号',

					 dataIndex : 'DJ_TYPE',
					align : 'center'
				}, {
					text : '功能位置',

					 dataIndex : 'DJ_LOC',
					align : 'center'
				},{text : '详细',align : 'center',width : 80,renderer:djkey}]
				}]
			});

Ext
		.onReady(function() {

			var uuid = Ext.data.IdGenerator.get('uuid').generate();

			var gridStore = Ext.create('Ext.data.Store', {

				storeId : 'gridStore',
				pageSize : 100,
					fields : [ 'ID', 'BYQ_UNIQUE_CODE', 'OP_TYPE', 'OP_CONTEXT',
							'OP_DATE', 'OP_USERID', 'OP_USERNAME', 'REMARK' ],
					proxy : {
						type : 'ajax',
						async : false,
						url : AppUrl + 'DJ/pro_dj301_byqoplog',
						actionMethods : {
							read : 'POST'
						},
						reader : {
							type : 'json',
							root : 'list'
						}
					}
				});

				var gridStore2 = Ext.create('Ext.data.Store', {

					storeId : 'gridStore2',
				pageSize : 100,
				fields : [ 'ID', 'APPLY_ID', 'MATERIALCODE', 'MATERIALNAME',
						'ETALON', 'MAT_CL', 'UNIT', 'AMOUNT', 'F_PRICE',
						'KC_ID' ],
				proxy : {
					type : 'ajax',
					async : false,
					url : AppUrl + 'DJ/pro_dj401_applymatlist',
					actionMethods : {
						read : 'POST'
					},
					reader : {
						type : 'json',
						root : 'list'
					}
				}
			});


			var plantStore = Ext.create("Ext.data.Store", {
				autoLoad : true,
				storeId : 'plantStore',
				fields : [ 'MENDDEPT_CODE', 'MENDDEPT_NAME' ],
				proxy : {
					type : 'ajax',
					async : false,
					url : AppUrl + 'DJ/pro_dj401_mendplant',
					actionMethods : {
						read : 'POST'
					},
					reader : {
						type : 'json',
						root : 'list'
					},
					extraParams : {
					}
				}
			});
			var mendtypeStore = Ext.create("Ext.data.Store", {
				autoLoad : true,
				storeId : 'mendtypeStore',
				fields : [ 'MENDTYPE', 'MENDTYPE_DESC' ],
				proxy : {
					type : 'ajax',
					async : false,
					url : AppUrl + 'DJ/pro_dj102_mendtype_able',
					actionMethods : {
						read : 'POST'
					},
					reader : {
						type : 'json',
						root : 'list'
					},
					extraParams : {
					}
				}
			});
			var typeStore = Ext.create("Ext.data.Store", {
				autoLoad : true,
				storeId : 'typeStore',
				fields : [ 'CODE', 'NAME' ],
				proxy : {
					type : 'ajax',
					async : false,
					url : AppUrl + 'DJ/pro_mm_itype',
					actionMethods : {
						read : 'POST'
					},
					reader : {
						type : 'json',
						root : 'list'
					},
					extraParams : {
					}
				}
			});

			var list1 = Ext.create('Ext.panel.Panel', {
				style: 'background-color:#FFFFFF',
				baseCls: 'my-panel-no-border',
				width:'100%',
				region : 'north',frame:true,//bodyPadding:5,
				layout:{type:'table',columns:3},
				defaults:{labelAlign:'right',labelWidth:80,margin:'10px 0px 0px 0px'},
				items : [

					{
						id : 'plant',
						xtype : 'textfield',
						fieldLabel : '厂矿',
						readOnly : true,
						value : plantname
					}, {
						id : 'dept',
						xtype : 'textfield',
						fieldLabel : '部门',
						readOnly : true,
						value : departname
					}, {
						id : 'personnel',
						xtype : 'textfield',
						fieldLabel : '录入人',
						readOnly : true,
						value : Ext.util.Cookies.get('v_personname2')
					},

					{
						id : 'ORDERID',
						xtype : 'textfield',
						fieldLabel : '工单号'
					}, {
						id : 'DJ_CODE',
						xtype : 'textfield',
						// width : 200,
						fieldLabel : '电机编号'
					},{
						id : 'mendtype',
						xtype : 'combobox',
						fieldLabel : '维修类别',
						editable : false,
						queryMode : 'local',
						labelAlign : 'right',
						displayField : 'MENDTYPE_DESC',
						valueField : 'MENDTYPE',
						store : mendtypeStore
					}, {
						id : 'DJ_NAME',
						xtype : 'textfield',
						fieldLabel : '电机名称'
					}, {
						id : 'DJ_UQ_CODE',
						xtype : 'textfield',

						fieldLabel : '电机唯一编号'
					}, {
						style: 'background-color:#FFFFFF',
						baseCls: 'my-panel-no-border',
						bodyStyle : 'background:none',
						layout : 'column',
						defaults : {
							labelAlign : 'right',
							labelWidth : 15
						},
						items : [ {
							xtype : 'button',
							text : '选择',
							margin : '0px 0px 0px 10px',
							handler : Bind
						}, {
							xtype : 'button',
							text : '详细',
							margin : '0px 0px 0px 10px',
							handler : Select
						}]
					},

					{
						id : 'MEND_CONTEXT',
						xtype : 'textarea',
						fieldLabel : '问题描述',
						colspan : 3,
						width : 755
					},

					{
						style: 'background-color:#FFFFFF',
						baseCls: 'my-panel-no-border',
						layout : 'column',
						defaults : {
						labelAlign : 'right'
					},
						items : [ {
							id : 'PLAN_BEGINDATE',
							xtype : 'datefield',
							fieldLabel : '申请时间',
							format : 'Y-m-d',
							labelWidth : 80,
							width : 185,
							value : new Date()
						},

							{
								xtype : 'numberfield',
								id : 'b-hour',
								fieldLabel : '',
								minValue : 0,
								maxValue : 24,
								width : 50,
								value : 00
							}, {
								xtype : 'numberfield',
								id : 'b-mm',
								fieldLabel : '',
								minValue : 0,
								maxValue : 60,
								width : 50,
								value : 00
							} ]
					},

					{
						style: 'background-color:#FFFFFF',
						baseCls: 'my-panel-no-border',
						layout : 'column',
						defaults : {
							labelAlign : 'right'
						},
						items : [ {
							id : 'PLAN_ENDDATE',
							xtype : 'datefield',
							fieldLabel : '完成时间',
							format : 'Y-m-d',
							labelWidth : 60,
							width : 185,
							value : new Date()
						},

							{
								xtype : 'numberfield',
								id : 'e-hour',
								fieldLabel : '',
								minValue : 0,
								maxValue : 24,
								width : 50,
								value : 00
							}, {
								xtype : 'numberfield',
								id : 'e-mm',
								fieldLabel : '',
								minValue : 0,
								maxValue : 60,
								width : 50,
								value : 00
							} ]
					},

					{
						id : 'APPLY_PLANT',
						xtype : 'combobox',
						width:185,
						labelWidth : 60,
						fieldLabel : '接收厂矿',
						editable : false,
						queryMode : 'local',
						labelAlign : 'right',
						displayField : 'MENDDEPT_NAME',
						valueField : 'MENDDEPT_CODE',
						store : plantStore
					},

					{
						id : 'REMARK',
						xtype : 'textarea',
						fieldLabel : '备注说明',
						colspan : 3,
						width : 755
					},

					{
						xtype : 'button',
						text : '保存工单申请',
						id : 'save',
						margin : '10px 0px 10px 75px',
						icon : imgpath + '/saved.png'
					} ]
			});

			var grid = Ext
					.create(
							'Ext.grid.Panel',
							{
								id : 'grid',
								region : 'center',
								columnLines : true,
								title : '附带物料列表',
								width : '100%',
								autoScroll : true,
								store : gridStore2,
								dufaults : {
									width : 120
								},
								columns : [
										{
											xtype : 'rownumberer',
											align : 'center'
										},

										{
											text : '物料编码',
											dataIndex : 'MATERIALCODE',
											align : 'center',
											width : 130
										},
										{
											text : '物料名称',
											dataIndex : 'MATERIALNAME',
											align : 'center',
											width : 130
										},
										{
											text : '规格型号',
											dataIndex : 'ETALON',
											align : 'center',
											width : 130
										},
										{
											text : '材质',
											dataIndex : 'MAT_CL',
											align : 'center',
											width : 130
										},
										{
											text : '计量单位',
											dataIndex : 'UNIT',
											align : 'center',
											width : 130
										},

										{
											text : '单价',
											dataIndex : 'F_PRICE',
											align : 'center',
											width : 130
										},
										{
											text : '数量',
											dataIndex : 'AMOUNT',
											align : 'center',
											width : 130
										},
										{
											text : '',
											align : 'center',
											xtype : 'templatecolumn',
											width : 60,
											tpl : '<a style="cursor:pointer;text-decoration:underline; color:#00F">删除</a>',
											id : 'delete'
										}

								],
								bbar : [ '->', {
									xtype : 'pagingtoolbar',
									dock : 'bottom',
									displayInfo : true,
									displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
									emptyMsg : '没有记录',
									store : 'gridStore'
								} ]
							});



			Ext.create('Ext.container.Viewport', {
				layout : 'border',
				autoScroll : true,
				items : [ list1, grid ]
			});

			queryLog();
			function queryLog() {
				Ext.data.StoreManager.lookup('gridStore').load({
					params : {
						key_code: key_code
					}
				});
			}
			queryGd();
			function queryGd() {// 自动生成工单号
				Ext.Ajax
					.request({
						url: AppUrl + 'DJ/pro_dj401_getapplyorderid',
						method : 'POST',
						async : false,
						params : {
							a_plantcode:plantcode
						},
						success : function(resp) {
							var resp = Ext.JSON.decode(resp.responseText);
							Ext.getCmp('ORDERID').setValue(resp.ret);
						}
					});
			}
			tab1Query();

			function tab1Query() {// 查询附带物料表
				Ext.data.StoreManager.lookup('gridStore2').load({
					params : {
						applyid_in: uuid
					}
				});
			}

		//queryContent();
			function queryContent() {
				Ext.Ajax
					.request({
						url: AppUrl + 'DJ/pro_dj301_byqmaindetail',
						method : 'POST',
						async : false,
						params : {
							key_code:key_code
						},
						success : function(resp) {
							var resp = Ext.JSON.decode(resp.responseText);
							if(resp.list.length>0){
								Ext.getCmp('BYQ_UNIQUE_CODE').setValue(
									resp.list[0].BYQ_UNIQUE_CODE);
								Ext.getCmp('BYQ_NAME').setValue(resp.list[0].BYQ_NAME);
								Ext.getCmp('SUPPLY_CODE').setValue(
									resp.list[0].SUPPLY_CODE);
								Ext.getCmp('BYQ_V').setValue(resp.list[0].BYQ_V);
								Ext.getCmp('QSZL').setValue(resp.list[0].QSZL);

								Ext.getCmp('BYQ_SERIES').setValue(
									resp.list[0].BYQ_SERIES); // select
								Ext.getCmp('BYQ_TYPE').setValue(resp.list[0].BYQ_TYPE);
								Ext.getCmp('SUPPLY_NAME').setValue(
									resp.list[0].SUPPLY_NAME);
								Ext.getCmp('BYQ_A').setValue(resp.list[0].BYQ_A);
								Ext.getCmp('YZ').setValue(resp.list[0].YZ);

								// Ext.getCmp('plant').setValue(); //select
								if (resp.list[0].PLANTCODE == "") {
									plantStore.insert(0, {
										DEPARTCODE : Ext.util.Cookies
											.get("v_orgCode"),
										DEPARTNAME : Ext.util.Cookies
											.get("v_orgname2")
									});
								} else {
									plantStore.insert(0, {
										DEPARTCODE : resp.list[0].PLANTCODE,
										DEPARTNAME : resp.list[0].PLANTNAME
									});
								}
								Ext.getCmp('plant').select(plantStore.getAt(0));

								// Ext.getCmp('dept').setValue(); //select
								if (resp.list[0].PLANTCODE == "") {

									getDeptList();
								} else {
									deptStore.insert(0, {
										DEPARTCODE : resp.list[0].DEPARTCODE,
										DEPARTNAME : resp.list[0].DEPARTNAME
									});
									Ext.getCmp('dept').select(deptStore.getAt(0));
								}

								Ext.getCmp('PRODUCE_DATE').setValue(
									resp.list[0].PRODUCE_DATE);
								Ext.getCmp('LJZBH').setValue(resp.list[0].LJZBH);
								Ext.getCmp('ZZ').setValue(resp.list[0].ZZ);

								Ext.getCmp('save_plant').select(
									savePlantStore.findRecord('DEPARTCODE',
										resp.list[0].PLANTCODE)); // select

								Ext.getCmp('DJ_LOC').setValue(resp.list[0].DJ_LOC);
								Ext.getCmp('BYQ_VOL').setValue(resp.list[0].BYQ_VOL);
								Ext.getCmp('ZKDY').setValue(resp.list[0].ZKDY);
								Ext.getCmp('KZSH').setValue(resp.list[0].KZSH);

								Ext.getCmp('LQFS').setValue(resp.list[0].LQFS);
								Ext.getCmp('SYTJ').setValue(resp.list[0].SYTJ);
								Ext.getCmp('DLSH').setValue(resp.list[0].KZDL);
								Ext.getCmp('KZDL').setValue(resp.list[0].KZDL);

								Ext.getCmp('WORK_STATUS').select(
									runStateStore.findRecord('WORK_STATUS',
										resp.list[0].WORK_STATUS)); // select

								Ext.getCmp('REMARK').setValue(resp.list[0].REMARK);
							}
						}
					});

			}

			Ext.getCmp('save').on('click', saveContent);
			function saveContent() {

				if (Ext.getCmp('ORDERID').getValue() == "") {
					alert("工单号不能为空");
					return false;
				}
				if (Ext.getCmp('DJ_CODE').getValue() == "") {
					alert("电机编号不能为空");
					return false;
				}

				if (Ext.getCmp('DJ_NAME').getValue() == "") {
					alert("电机名称不能为空");
					return false;
				}
				if (Ext.getCmp('DJ_UQ_CODE').getValue() == "") {
					alert("电机唯一编号不能为空");
					return false;
				}
				if (Ext.getCmp('MEND_CONTEXT').getValue() == ""||Ext.getCmp('MEND_CONTEXT').getValue().length<5) {
					alert("检修内容不能为空且不能少于5个字");
					return false;
				}

				var hour = Ext.getCmp('b-hour').getValue();
				if (hour.length < 2 || hour < 10) {
					hour = "0" + hour;
				}

				var mm = Ext.getCmp('b-mm').getValue();
				if (mm.length < 2 || hour < 10) {
					mm = "0" + mm;
				}

				/*var start = Ext.util.Format.date(Ext.getCmp('PLAN_BEGINDATE')
						.getValue(), 'Y-m-d')
						+ " " + hour + ":" + mm + ":00";*/
				var start = Ext.util.Format.date(Ext.getCmp('PLAN_BEGINDATE').getValue(), 'Y-m-d');
				var end = Ext.util.Format.date(Ext.getCmp('PLAN_ENDDATE').getValue(), 'Y-m-d');

				/*var end = Ext.util.Format.date(Ext.getCmp('PLAN_ENDDATE')
						.getValue(), 'Y-m-d')
						+ " " + hour + ":" + mm + ":00";*/
				Ext.Ajax
					.request({
						url: AppUrl + 'DJ/pro_dj401_applysave',
						method : 'POST',
						async : false,
						params : {
							applyid_in:uuid,
							plantcode_in:plantcode,
							plantname_in:plantname,
							departcode_in:departcode,
							departname_in:departname,

							usercode_in:Ext.util.Cookies.get('v_personcode'),
							username_in:Ext.util.Cookies.get('v_personname2'),
							billcode_in:Ext.getCmp('ORDERID').getValue(),
							dj_uq_code_in:Ext.getCmp('DJ_UQ_CODE').getValue(),
							djname_in:Ext.getCmp('DJ_NAME').getValue(),

							context_in:Ext.getCmp('MEND_CONTEXT').getValue(),
							begindate_in:start,
							enddate_in:end,
							v_plantcodejs:Ext.getCmp('APPLY_PLANT').getValue(),
							remark_in:Ext.getCmp('REMARK').getValue(),

							djcode_in:Ext.getCmp('DJ_CODE').getValue(),
							confirm_flag_in:confirm_flag_in,
							mend_type_in:Ext.getCmp('mendtype').getValue()
						},
						success : function(resp) {
							var resp = Ext.JSON.decode(resp.responseText);
							if (resp == "Success") {
								alert('执行成功');
								window.close();
								window.opener.query();
							} else {
								alert('执行失败');
							}
						}
					});
			}
			Ext.getCmp('delete').on('click', function(a, b, c, d) {
				Ext.Ajax
					.request({
						url: AppUrl + 'DJ/pro_dj401_deleteapplymat',
						method : 'POST',
						async : false,
						params : {
							id_in:gridStore2.getAt(c).get("ID")
						},
						success : function(resp) {
							var resp = Ext.JSON.decode(resp.responseText);
							if (resp == "Success") {
								Ext.example.msg("提示", '删除成功');
								tab1Query();
							} else {
								Ext.example.msg("提示", '删除失败');
							}
						}
					});
			})


			plantStore.on('load', function() {
				Ext.getCmp('APPLY_PLANT').select(plantStore.getAt(0));
			});
			mendtypeStore.on('load', function() {
				Ext.getCmp('mendtype').select(mendtypeStore.getAt(0));
			});
            Ext.getCmp('djlist').on('click', function() {
				Bind();
			});
			function Bind() {// 选择
				window1.show();
				Ext.data.StoreManager.lookup('gridStorexzdj').load({
					params : {
						plantcode_in: '%',
						departcode_in:'%',
						dj_series_class_in:'%',
						loc_plantcode_in: plantcode,
						dj_loc_in: Ext.getCmp('dj_loc').getValue(),
						work_status_in: '%',

						dj_name_in: Ext.getCmp('dj_name').getValue(),
						dj_unique_code_in: '%',
						dj_code_in: '%',
						dj_type_in: Ext.getCmp('dj_type').getValue(),
						dj_vol_in: Ext.getCmp('dj_vol').getValue()
					}
				});

			}




});
function LookMorexzdj(value, metaData, record, rowIdx, colIdx, store, view) {//
//	changeid = record.data.SCH_CODE;

code=record.data.DJ_CODE;
unicode=record.data.DJ_UQ_CODE;
djname=record.data.DJ_NAME;
return '<a  href="javascript:OpenDj(' + rowIdx
+ ')" style="color:blue">' + value + '</a>';
//Ext.getStore('gridStorexzdj').removeAt(rowIndex);//移除选择电机的表格行

}
function OpenDj(rowIdx){
	Ext.getCmp('DJ_UQ_CODE').setValue(gridStorexzdj.data.items[rowIdx].data.DJ_UNIQUE_CODE);
	Ext.getCmp('DJ_CODE').setValue(gridStorexzdj.data.items[rowIdx].data.DJ_CODE);
	Ext.getCmp('DJ_NAME').setValue(gridStorexzdj.data.items[rowIdx].data.DJ_NAME);

	window1.hide();
	//Ext.getStore('gridStorexzdj').removeAt(rowIdx);
}
function djkey(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left;";
	return "<a href='javascript:keyopen(\""+record.data.DJ_UNIQUE_CODE+"\");'>详细</a>";
}
function keyopen(value){
	window.open(AppUrl + "page/DJ/DJ202_menu.html?djcode="+value,"", "dialogHeight:700px;dialogWidth:1100px");
}
function Select(){
	window.open(AppUrl + "page/DJ/DJ202_menu.html?djcode="+Ext.getCmp('DJ_UQ_CODE').getValue(),"", "dialogHeight:700px;dialogWidth:1100px");
}
