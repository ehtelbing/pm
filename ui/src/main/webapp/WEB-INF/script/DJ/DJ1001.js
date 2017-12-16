var kcid = '';
var rel_kcid = '';
var rel_mpid = '';
var dt = new Date();
var thisYear = dt.getFullYear();
var years = [];
for (var i = 2013; i <= thisYear + 2; i++)
	years.push({
				displayField : i,
				valueField : i
			});
var months = [];
for (var w = 1; w <= 12; w++)
	months.push({
				displayField : w,
				valueField : w
			});

Ext.onReady(function() {
		var gridInputStore = Ext.create('Ext.data.Store', {
		autoLoad : false,
		storeId : 'gridInputStore',
		fields : [ 'MATERIALCODE', 'KCID', 'MATERIALNAME', 'ETALON', 'UNIT',
				'F_PRICE', 'AMOUNT', 'F_MONEY', 'STORE_DESC', 'I_TYPE',
				'INSERTDATE','KCID' ],
		proxy : {
			type : 'ajax',
			actionMethods : {
				read : 'POST'
			},
			url : APP + '/ModelSelect',
			reader : {
				type : 'json',
				root : 'list'
			},
			extraParams : {
				parName : [ 'a_begindate', 'a_enddate', 'a_plantcode',
						'a_departcode', 'a_itype', 'a_storedesc',
						'a_materialcode', 'a_materialname', 'a_etalon',
						'a_lcodesc', 'a_userid' ],
				parType : [ 'da', 'da', 's', 's', 's', 's', 's', 's', 's', 's',
						's' ],
				proName : 'pg_dj1004.getinputlist',
				cursorName : 'ret'
			}
		}
	});
	var mpStore = Ext.create('Ext.data.Store', {
		autoLoad : false,
		storeId : 'mpStore',
		fields : ['ID','ABLE_AMOUNT','MATERIALCODE','MATERIALNAME','MATERIALELATON','MATERIALUNIT','PLAN_PRICE','AMOUNT','I_TYPE','F_MONEY','LY_AMOUNT'],
		proxy : {
			type : 'ajax',
			async : false,
			url : APP + '/ModelSelect',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			},
			extraParams : {
				parName : ['a_year','a_month','a_plantcode','a_departcode','a_code','a_name'],
				parType : ['i','i','s','s','s','s'],
				proName : 'pg_dj1001.getmp',
				cursorName : 'ret'
			}
		},
		listeners:{
			beforeload:mpStore_beforload
		}
	});
	var wzflStore = Ext.create('Ext.data.Store', {// 物资分类
		autoLoad : true,
		storeId : 'wzflStore',
		fields : [ 'CODE', 'NAME' ],
		proxy : {
			type : 'ajax',
			async : false,
			url : APP + '/ModelSelect',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			},
			extraParams : {
				parName : [],
				parType : [],
				parVal : [],
				proName : 'PRO_MM_ITYPE',
				cursorName : 'I_TYPE'
			}
		}
	});
	var wzflStoreR = Ext.create('Ext.data.Store', {// 物资分类
		autoLoad : true,
		storeId : 'wzflStoreR',
		fields : [ 'CODE', 'NAME' ],
		proxy : {
			type : 'ajax',
			async : false,
			url : APP + '/ModelSelect',
			actionMethods : {
				read : 'POST'
			},
			reader : {
				type : 'json',
				root : 'list'
			},
			extraParams : {
				parName : [],
				parType : [],
				parVal : [],
				proName : 'PRO_MM_ITYPE',
				cursorName : 'I_TYPE'
			}
		}
	});	
	var gridStore = Ext.create('Ext.data.Store', {
		autoLoad :false,
		pageSize : 100,
		storeId : 'gridStore',
		fields : ['MATERIALCODE','KCID','MATERIALNAME','ETALON',	
		          'UNIT','F_PRICE','AMOUNT','F_MONEY','STORE_DESC',	'LOC_DESC',
		          'I_TYPE'],
		proxy : {
			type : 'ajax',
			actionMethods : {
				read : 'POST'
			},
			url : APP + '/ModelSelect',
			reader : {
				type : 'json',
				root : 'list'
			},
			extraParams : {
				parName : ['a_plantcode','a_departcode','a_itype',
				           'a_store_desc','a_materialcode','a_materialname',
				           'a_etalon','a_loc_desc','a_userid'],
				parType : ['s','s','s','s','s','s','s','s','s'],
				proName : 'pg_dj1001.getinput',
				cursorName : 'ret'
			}
		}
	});
	
	var northPanel = Ext.create("Ext.panel.Panel", {
		region : 'north',
		frame : true,
		baseCls : 'my-panel-noborder',
		layout : 'vbox',
		width : '100%',
		style : 'margin:5px 0px 5px 5px',
		items : [ {
			xtype : 'panel',
			frame : true,
			width : "100%",
			baseCls : 'my-panel-noborder',
			layout : 'hbox',
			items : [ {
				xtype : 'combo',
				id : 'bm',
				fieldLabel : '部门',
				labelAlign : 'right',
				editable : false,
				style : 'margin:5px 0px 5px 5px',
				labelWidth : 70,
				queryMode : 'local',
				store : {
						fields : [ "code", "value" ],
						data : [ {
							code : Ext.util.Cookies.get("mm.departcode"),
							value :Ext.util.Cookies.get("mm.departname")
						} ]
					},
					valueField : 'code',
					displayField : 'value',
					value : Ext.util.Cookies.get("mm.departcode")
			}, {
				xtype : 'combo',
				id : 'wzfl',
				fieldLabel : '物资分类',
				labelAlign : 'right',
				editable : false,
				style : 'margin:5px 0px 5px 5px',
				labelWidth : 70,
				queryMode : 'local',
				valueField : 'CODE',
				displayField : 'NAME',
				store : wzflStore
			},{
				xtype : 'textfield',
				id : 'kfms',
				fieldLabel : '库房描述',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				labelAlign : 'right'
			} ]
		},{
			xtype : 'panel',
			frame : true,
			layout : 'hbox',
			width : "100%",
			baseCls : 'my-panel-noborder',
			items : [ {
				xtype : 'textfield',
				id : 'wzbh',
				fieldLabel : '物资编号',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				labelAlign : 'right'
			}, {
				xtype : 'textfield',
				id : 'wzmc',
				fieldLabel : '物资名称',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				labelAlign : 'right'
			},{
				xtype : 'textfield',
				id : 'gg',
				fieldLabel : '规格',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				labelAlign : 'right'
			} ]
		}, {
			xtype : 'panel',
			frame : true,
			layout : 'hbox',
			width : "100%",
			baseCls : 'my-panel-noborder',
			items : [ {
				xtype : 'textfield',
				id : 'cfwz',
				fieldLabel : '存放位置',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				labelAlign : 'right'
			},{
				xtype : 'button',
				text : '查询',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				icon: imgpath +'/a1.gif',
				handler : onSearch
			}, {
				xtype : 'button',
				text : '入库',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				handler : OnRuku,
				icon : imgpath + '/add.gif'
			}, {
				xtype : 'button',
				text : '按计划入库',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				handler : OnPlanRuku,
				icon : imgpath + '/add.gif'
			}, {
				xtype : 'button',
				text : '修改',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				handler : OnUpdate,
				icon : imgpath + '/add.gif'
			}, {
				xtype : 'button',
				text : '确认入库',
				labelWidth : 70,
				style : 'margin:5px 0px 5px 5px',
				icon : imgpath + '/tree_dnd_yes.gif',
				handler : onSure
			} ]
		}]
	});
	
	Ext.create('Ext.window.Window', {// 入库
		id : 'detailDialog',
		height : 300,
		width : 600,
		layout : 'fit',// 自动适应
		modal : true,
		closable : false,
		shadow : false,
		items : [ Ext.create('Ext.form.Panel', {
			id : 'detailForm',
			layout : {
				type : 'vbox'
			},
			autoScroll : true,
			border : false,
			frame : true,
			closable : false,
			items : [ {// 子面板一
				xtype : 'panel',
				frame : true,// 渲染
				width : '100%',
				baseCls : 'my-panel-no-border',
				layout : 'hbox',
				items : [ {
					xtype : 'textfield',
					fieldLabel : '物资编号',
					style : 'margin: 4px 0px 4px 0px',
					id : 'Rkwzbh',
					labelAlign : 'right',
					labelWidth : 105
				},{
					xtype : 'textfield',
					fieldLabel : '物资名称',
					style : 'margin: 4px 0px 4px 0px',
					id : 'Rkwzmc',
					labelAlign : 'right',
					labelWidth : 105
				}  ]
			}, {// 子面板二
				xtype : 'panel',
				frame : true,// 渲染
				width : '100%',
				baseCls : 'my-panel-no-border',
				layout : 'hbox',
				items : [ {
					xtype : 'textfield',
					fieldLabel : '规格',
					style : 'margin: 4px 0px 4px 0px',
					id : 'Rkgg',
					labelAlign : 'right',
					labelWidth : 105
				},{
					xtype : 'textfield',
					fieldLabel : '单位',
					style : 'margin: 4px 0px 4px 0px',
					id : 'Rkdw',
					labelAlign : 'right',
					labelWidth : 105
				} ]
			}, {// 子面板三
				xtype : 'panel',
				frame : true,// 渲染
				width : '100%',
				baseCls : 'my-panel-no-border',
				layout : 'hbox',
				items : [ {
					xtype : 'numberfield',
					fieldLabel : '单价',
					style : 'margin: 4px 0px 4px 0px',
					id : 'Rkdj',
					labelAlign : 'right',
					labelWidth : 105
				} ,{
					xtype : 'numberfield',
					fieldLabel : '数量',
					style : 'margin: 4px 0px 4px 0px',
					id : 'Rksl',
					labelAlign : 'right',
					labelWidth : 105
				}  ]
			}, {// 子面板四
				xtype : 'panel',
				frame : true,// 渲染
				width : '100%',
				baseCls : 'my-panel-no-border',
				layout : 'hbox',
				items : [ {
					xtype : 'textfield',
					fieldLabel : '库房描述',
					style : 'margin: 4px 0px 4px 0px',
					id : 'Rkkfms',
					labelAlign : 'right',
					labelWidth : 105
				} ,{
					xtype : 'textfield',
					fieldLabel : '位置描述',
					style : 'margin: 4px 0px 4px 0px',
					id : 'Rkwzms',
					labelAlign : 'right',
					labelWidth : 105
				}  ]
			}, {// 子面板五
				xtype : 'panel',
				frame : true,// 渲染
				width : '100%',
				baseCls : 'my-panel-no-border',
				layout : 'hbox',
				items : [ {
					xtype : 'combo',
					id : 'Rkwzfl',// 入库物资分类
					fieldLabel : '物资分类',
					style : 'margin: 4px 0px 4px 0px',
					labelAlign : 'right',
					labelWidth : 105,
					queryMode : 'local',
					store : wzflStoreR,
					valueField : 'CODE',
					displayField : 'NAME',
					editable : false
				}]
			} ]
		}) ],
		dockedItems : [ {
			xtype : 'toolbar',
			dock : 'bottom',
			ui : 'footer',
			layout : {
				type : 'hbox',
				pack : 'center'
			},
			items : [ {
				icon : imgpath + '/add.gif',
				id : 'add',
				text : '保 存',
				handler : addPlan
			},{
				icon : imgpath + '/abandon.gif',
				id : 'cancel2',
				text : '取 消',
				handler : function() {
					Ext.getCmp('detailForm').getForm().reset();
					Ext.getCmp('detailDialog').hide();
				}
			}  ]
		} ]
	});
	var gridPlan = Ext.create('Ext.grid.Panel',
			{
				xtype:'panel',
				frame: true, 
				width : '100%',
				height:700,
				baseCls : 'my-panel-noborder',
				region:'center',
				id : 'gridPlan',
				columnLines : true,
				selType : 'checkboxmodel',
				autoScroll : true,
				store : mpStore,
				columns : [
						{
							text : '序号',
							dataIndex : 'NUMBER',
							xtype : 'rownumberer',
							width : 40,
							align : 'center'
						},{
							text : '物资分类',
							align : 'center',
							dataIndex : 'I_TYPE',
							width : 60
						},
						{
							text : '物资编号',
							dataIndex : 'MATERIALCODE',
							align : 'center',
							width : 100
						},
						{
							text : '物资名称',
							align : 'center',
							dataIndex : 'MATERIALNAME',
							width : 100
						},
						{
							text : '规格',
							align : 'center',
							dataIndex : 'MATERIALELATON',
							width : 100
						},
						{
							text : '单位',
							align : 'center',
							dataIndex : 'MATERIALUNIT',
							width : 80
						},{
							text : '计划单价',
							align : 'center',
							dataIndex : 'PLAN_PRICE',
							width : 80
						},{
							text : '可用数量',
							align : 'center',
							dataIndex : 'ABLE_AMOUNT',
							width : 80
						},{
							text : '关联',
							align : 'center',
							dataIndex : 'ID',
							width : 60,
							renderer : function(value,metadata,record){
								return '<a href="javascript:relmpid(\''+value+'\')">关联</a>';
							}
							}]
			});
	var gridInput = Ext.create('Ext.grid.Panel', {
				frame: true, 
				width : '100%',
				height:700,
				baseCls : 'my-panel-noborder',
				region:'center',
				id : 'gridInput',
				columnLines : true,
				autoScroll : true,
		store : gridInputStore,
		columns : [ {
			text : '物资编号',
			align : 'center',
			dataIndex : 'MATERIALCODE',
			width : 100
		}, {
			text : '物资名称',
			align : 'center',
			dataIndex : 'MATERIALNAME',
			width : 100
		}, {
			text : '规格',
			align : 'center',
			dataIndex : 'ETALON',
			width : 100
		}, {
			text : '单位',
			align : 'center',
			dataIndex : 'UNIT',
			width : 100
		}, {
			text : '入库数量',
			align : 'center',
			dataIndex : 'AMOUNT',
			width : 100
		}, {
			text : '金额',
			align : 'center',
			dataIndex : 'F_MONEY'
		},{
							text : '确认',
							align : 'center',
							dataIndex : 'KCID',
							width : 60,
							renderer : function(value,metadata,record){
								return '<a href="javascript:relkcid(\''+value+'\')">确认</a>';
							}
							} ]
	});
	Ext.create('Ext.window.Window', {
		id : 'mpDialog',
		height : '100%',
		width : '100%',
		layout : 'fit',// 自动适应
		modal : true,
		closable : false,
		shadow : false,
		items : [ 
			{
				xtype:'panel',
				width:'100%',
				frame:true,
				baseCls : 'my-panel-no-border',
				layout : 'hbox',
				items:[
			{
				xtype:'panel',
				width:'50%',
				layout : 'vbox',
				items:[
					{
						xtype:'panel',
						frame: true, 
						region: 'north',
						width : '100%',
						baseCls : 'my-panel-noborder',
						layout:'vbox',
						items:[
						{
						xtype:'panel',
						frame : true,
						layout : 'hbox',
						width : '100%',
						style : 'margin:5px 0px 5px 5px',
						items:[
							{
								    id : 'year',
									store : Ext.create("Ext.data.Store", {
												fields : ['displayField', 'valueField'],
												data : years,
												proxy : {
													type : 'memory',
													reader : {
														type : 'json'
													}
												}
											}),
										xtype : 'combo',
										fieldLabel : '选择年份',
									value : new Date().getFullYear(),
									style : ' margin: 5px 0px 0px 10px',
									labelWidth : 60,
									width : 120,
									editable : false,
									displayField : 'displayField',
									valueField : 'valueField',
									labelAlign : 'right'
								}, {
										id : 'month',
										store : Ext.create("Ext.data.Store", {
											fields : ['displayField', 'valueField'],
											data : months,
											proxy : {
												type : 'memory',
												reader : {
													type : 'json'
													}
												}
											}),
										xtype : 'combo',
										fieldLabel : '选择月份',
										value : new Date().getMonth() + 1,
										labelSeparator : '',
										style : ' margin: 5px 0px 0px 10px',
										labelWidth : 60,
										width : 120,
										editable : false,
										labelAlign : 'right',
										displayField : 'displayField',
										valueField : 'valueField'
								},
								{
									xtype : 'textfield',
									fieldLabel : '物资编号',
									style : 'margin: 4px 0px 4px 0px',
									id : 'mp_mat_no',
									labelAlign : 'right',
									labelWidth : 60
								},{
									xtype : 'textfield',
									fieldLabel : '物资名称',
									style : 'margin: 4px 0px 4px 0px',
									id : 'mp_mat_desc',
									labelAlign : 'right',
									labelWidth : 60
								},
								{
									xtype : 'button',
									text : '查询',
									labelWidth : 60,
									style : 'margin:5px 0px 5px 5px',
									handler : function(){
										onPlanSearch();
									}
						}]},{
						xtype:'panel',
						frame : true,
						layout : 'hbox',
						width : '100%',
						style : 'margin:5px 0px 5px 5px',
						items:[
								{
									xtype : 'textfield',
									fieldLabel : '导入库房描述',
									style : 'margin: 4px 0px 4px 0px',
									id : 'mp_store_desc',
									labelAlign : 'right',
									labelWidth : 100
								},
								{
									xtype : 'textfield',
									fieldLabel : '导入位置描述',
									style : 'margin: 4px 0px 4px 0px',
									id : 'mp_loc_desc',
									labelAlign : 'right',
									labelWidth : 100
								},
								{
									xtype : 'button',
									text : '导入计划',
									labelWidth : 70,
									style : 'margin:5px 0px 5px 5px',
									handler : function(){
										onPlanImport();
									},
									icon : imgpath + '/add.gif'
								}
							]}
						]},gridPlan]
						},
						{
				xtype:'panel',
				width:'50%',
				layout : 'vbox',
				items:[
					{
						xtype:'panel',
						frame: true, 
						region: 'north',
						width : '100%',
						baseCls : 'my-panel-noborder',
						layout:'vbox',
						items:[
						{
						xtype:'panel',
						frame : true,
						layout : 'hbox',
						width : '100%',
						style : 'margin:5px 0px 5px 5px',
						items:[
			{
				xtype : 'datefield',
				id : 'qsrq',
				fieldLabel : '起始日期',
				style : ' margin: 5px 0px 5px 5px',
				labelAlign : 'right',
				labelWidth : 70,
				width:150,
				value : Ext.Date.getFirstDateOfMonth(new Date()),// 根据现在日期获取这个月的第一天是哪天
				format : 'Y/m/d',
				editable : false
			}, {
				xtype : 'datefield',
				id : 'jsrq',
				fieldLabel : '结束日期',
				style : ' margin: 5px 0px 5px 5px',
				labelAlign : 'right',
				labelWidth : 70,
				width:150,
				queryMode : 'local',
				value : Ext.Date.getLastDateOfMonth(new Date()),
				format : 'Y/m/d',
				editable : false
			},{
				xtype : 'textfield',
				id : 'kc_wzbh',
				width:70,
				emptyText:'请输入物资编码',
				style : 'margin:5px 0px 5px 5px',
				labelAlign : 'right'
			}, {
				xtype : 'textfield',
				id : 'kc_wzmc',
				width:70,
				emptyText:'请输入物资名称',
				style : 'margin:5px 0px 5px 5px',
				labelAlign : 'right'
			},
								{
									xtype : 'button',
									text : '查询',
									labelWidth : 60,
									style : 'margin:5px 0px 5px 5px',
									handler : function(){
										onInputSearch();
									}
						}]},{
						xtype:'panel',
						frame : true,
						layout : 'hbox',
						width : '100%',
						style : 'margin:5px 0px 5px 5px',
						items:[
								{
									xtype : 'textfield',
									fieldLabel : '关联备注',
									style : 'margin: 4px 0px 4px 0px',
									id : 'mp_remark',
									labelAlign : 'right',
									labelWidth : 100
								}
							]}
						]},gridInput]
						}
				//]}
		]}
		],
		dockedItems : [ {
			xtype : 'toolbar',
			dock : 'bottom',
			ui : 'footer',
			layout : {
				type : 'hbox',
				pack : 'center'
			},
			items : [{
				icon : imgpath + '/abandon.gif',
				text : '关闭',
				handler : function() {
					Ext.getCmp('mpDialog').hide();
				}
			}  ]
		} ]
	});
	var grid = Ext.create('Ext.grid.Panel',
			{
				region : 'center',
				id : 'grid',
				columnLines : true,
				style : 'margin: 5px 0px 0px 0px',
				width : '100%',
				selType : 'checkboxmodel',
				autoScroll : true,
				store : gridStore,
				columns : [{
							text : '序号',
							dataIndex : 'NUMBER',
			xtype : 'rownumberer',
			width : 60,
			align : 'center'
		},{
							text : '物资分类',
							align : 'center',
							dataIndex : 'I_TYPE',
							width : 100
						},
						{
							text : '物资编号',
							dataIndex : 'MATERIALCODE',
							align : 'center',
							width : 100
						},
						{
							text : '物资名称',
							align : 'center',
							dataIndex : 'MATERIALNAME',
							width : 100
						},
						{
							text : '规格',
							align : 'center',
							dataIndex : 'ETALON',
							width : 100
						},
						{
							text : '单位',
							align : 'center',
							dataIndex : 'UNIT',
							width : 100
						},{
							text : '单价',
							align : 'center',
							dataIndex : 'F_PRICE',
							width : 100
						},{
							text : '入库数量',
							align : 'center',
							dataIndex : 'AMOUNT',
							width : 100
						},{
							text : '金额',
							align : 'center',
							dataIndex : 'F_MONEY',
							width : 100
						},{
							text : '库房描述',
							align : 'center',
							dataIndex : 'STORE_DESC',
							width : 100
						},{
							text : '删除',
							align : 'center',
							dataIndex : 'KCID',
							width : 100,
							renderer : del
							}]
			});
	var panelbottom = Ext.create('Ext.panel.Panel', {
		frame: true, region: 'south',
		width : '100%',baseCls : 'my-panel-noborder',layout : 'column',
	bbar : [ '->', {
		xtype : 'pagingtoolbar',
		dock : 'bottom',
		displayInfo : true,
		displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
		emptyMsg : '没有记录',
		store : gridStore
	} ]
	});
	
	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		items : [ northPanel, grid,panelbottom ]
	});
	
	
	
	
	
	
	
	
	
	Ext.getStore('wzflStore').on('load', function(me) {// 物资分类
		Ext.getCmp('wzfl').store.insert(0, {
			'CODE' : '%',
			'NAME' : '全部'
		});
		Ext.getCmp('wzfl').select(me.first());
		onSearch();
	});

	Ext.getCmp('Rkwzfl').on('select',function(){
		Ext.Ajax.request({
		url : APP + '/ModelChange',
		type : 'ajax',
		async : false,
		method : 'POST',
		params : {
			parName : [ 'a_itype' ],
			parType : [ 's' ],
			parVal : [ Ext.getCmp('Rkwzfl').getValue() ],
			proName : 'pg_dj1001.mattype_unitandprefix',
			returnStr : [ 'ret_prefix' ,'ret_unit'],
			returnStrType : [ 's','s' ]
		},
		success : function(response) {
			var resp = Ext.decode(response.responseText);
			Ext.getCmp('Rkwzbh').setValue(resp[0]);
			Ext.getCmp('Rkdw').setValue(resp[1]);
		}
	});
	});
	onSearch();

});
function onPlanImport()
{
	kc_id ='';
	var store_desc= Ext.getCmp('mp_store_desc').getValue();
	var loc_desc= Ext.getCmp('mp_loc_desc').getValue();
	if(store_desc=='')
	{
		Ext.example.msg('提示', '库房描述不能为空！');// 提示
			return;
	}
	
	var selectedRecord = Ext.getCmp('gridPlan').getSelectionModel().getSelection();
	if ((selectedRecord.length == 0 )) {
			Ext.example.msg('提示', '请选择一条数据！');// 提示
			return;
	}
	var success = 0;
	for(var i = 0 ; i < selectedRecord.length ; i++)
	{
		Ext.Ajax.request({
		url : APP + '/ModelChange',
		params : {
			parName : [ 'a_kcid','a_materialcode', 'a_materialname', 'a_etalon',
					'a_unit', 'a_price', 'a_amount','a_storedesc', 
					'a_locdesc', 'a_itype','a_plantcode','a_departcode',
					'a_departname','a_userid','a_username','a_mpid'],
			parType : [ 's','s', 's', 's', 's', 'do', 'do', 's', 's', 's', 's',
			            's', 's', 's', 's','s'],
			parVal : [kcid,
			        selectedRecord[i].data.MATERIALCODE,
					selectedRecord[i].data.MATERIALNAME,
					selectedRecord[i].data.MATERIALELATON,
					selectedRecord[i].data.MATERIALUNIT,
					selectedRecord[i].data.PLAN_PRICE,
					selectedRecord[i].data.ABLE_AMOUNT,
					store_desc,
					loc_desc,
					selectedRecord[i].data.I_TYPE,
					Ext.util.Cookies.get("mm.plantcode"),
					Ext.util.Cookies.get("mm.departcode"),
					Ext.util.Cookies.get("mm.departname"),
					Ext.util.Cookies.get("mm.userid"),
					Ext.util.Cookies.get("mm.username"),
					selectedRecord[i].data.ID],
//'ABLE_AMOUNT', 'MATERIALCODE', 'MATERIALNAME', 'MATERIALELATON', 'MATERIALUNIT', 'PLAN_PRICE', 'AMOUNT', 'I_TYPE', 'F_MONEY', 'LY_AMOUNT'
			proName : 'pg_dj1001.saveinput',
			returnStr : ['ret_msg','ret'],
			returnStrType : ['s','s']
		},
		method : 'POST',
		success : function(response) {
			var resp = Ext.JSON.decode(response.responseText);
			success++;
		}
	});
	}
		onPlanSearch();
		onSearch();
}
function Query() {
	Ext.getStore("gridStore").load();
}
function del(value, metaData, record, rowIdx,colIdx, store, view) {
	return '<img src="' + imgpath + '/del.gif" alt="删除" onclick="delFixContent(\''
			+ value + '\')"/>';
	}
function delFixContent(value){ // 删除
	Ext.Ajax.request({
		url : APP + '/ModelChange',
		type : 'ajax',
		async : false,
		method : 'POST',
		params : {
			parName : [ 'a_kcid' ],
			parType : [ 's' ],
			parVal : [ value ],
			proName : 'pg_dj1001.deleteinput',
			returnStr : [ 'ret' ,'ret_msg'],
			returnStrType : [ 's','s' ]
		},
		success : function(response) {
			var resp = Ext.decode(response.responseText);
			if (resp[0] != "success") {
				Ext.example.msg('提示', resp[1]);//
			} else {
				Ext.example.msg('提示', resp[1]);
			}
		}
	});
	Query();
}
function onSearch() {// 查询
	Ext.getStore('gridStore').proxy.extraParams.parVal = 
		[
		Ext.util.Cookies.get("mm.plantcode"),
	    Ext.util.Cookies.get("mm.departcode"),
	    Ext.getCmp('wzfl').getValue(),
	    Ext.getCmp('kfms').getValue(),
	    Ext.getCmp('wzbh').getValue(),
	    Ext.getCmp('wzmc').getValue(),
	    Ext.getCmp('gg').getValue(),
	    Ext.getCmp('cfwz').getValue(),
	    Ext.util.Cookies.get("mm.userid")]	
		Ext.getStore('gridStore').load();
}

function OnRuku() {
	kcid = '';
	
	Ext.getCmp('detailForm').getForm().reset();
	Ext.getCmp('detailDialog').setTitle('入库');
	Ext.getCmp('detailDialog').show();
	
	Ext.getCmp('Rkwzfl').select(Ext.getStore('wzflStoreR').first());
	Ext.Ajax.request({
		url : APP + '/ModelChange',
		type : 'ajax',
		async : false,
		method : 'POST',
		params : {
			parName : [ 'a_itype' ],
			parType : [ 's' ],
			parVal : [ Ext.getCmp('Rkwzfl').getValue() ],
			proName : 'pg_dj1001.mattype_unitandprefix',
			returnStr : [ 'ret_prefix' ,'ret_unit'],
			returnStrType : [ 's','s' ]
		},
		success : function(response) {
			var resp = Ext.decode(response.responseText);
			Ext.getCmp('Rkwzbh').setValue(resp[0]);
			Ext.getCmp('Rkdw').setValue(resp[1]);
		}
	});
}

//打开计划查询
function OnPlanRuku() {
	Ext.getCmp('mpDialog').setTitle('计划');
	Ext.getCmp('mpDialog').show();
}

function mpStore_beforload()
{
		Ext.getStore('mpStore').proxy.extraParams.parVal = 
		[
		   Ext.getCmp('year').getValue(),
		   Ext.getCmp('month').getValue(),
		   Ext.util.Cookies.get("mm.plantcode"),
		   Ext.util.Cookies.get("mm.departcode"),
		   Ext.getCmp('mp_mat_no').getValue(),
		   Ext.getCmp('mp_mat_desc').getValue()
		];	
}
function onPlanSearch() {// 查询
		Ext.getStore('mpStore').load();
}
function onInputSearch() {// 查询
	Ext.getStore('gridInputStore').proxy.extraParams.parVal = [
			Ext.Date.format(Ext.getCmp('qsrq').getValue(), 'Y-m-d'),
			Ext.Date.format(Ext.getCmp('jsrq').getValue(), 'Y-m-d'),
			Ext.util.Cookies.get("mm.plantcode"), Ext.util.Cookies.get("mm.departcode"),
			'%', '%',
			Ext.getCmp('kc_wzbh').getValue(), Ext.getCmp('kc_wzmc').getValue(),
			'%', '%',
			Ext.util.Cookies.get('mm.userid') ];
	Ext.getStore('gridInputStore').load();
}
function OnUpdate() {
	var selectedRecord = Ext.getCmp('grid').getSelectionModel().getSelection();
	if ((selectedRecord.length != 1 )) {
			Ext.example.msg('提示', '请选择一条数据！');// 提示
			return;
	}
	Ext.getCmp('detailForm').getForm().reset();
	Ext.getCmp('detailDialog').setTitle('修改');
	Ext.getCmp('detailDialog').show();
	Ext.getCmp('Rkwzfl').select(Ext.getStore('wzflStoreR').first());
	
    kcid = selectedRecord[0].data.KCID;
	Ext.getCmp('Rkwzbh').setValue(selectedRecord[0].data.MATERIALCODE);
	Ext.getCmp('Rkgg').setValue(selectedRecord[0].data.ETALON);
	Ext.getCmp('Rkdw').setValue(selectedRecord[0].data.UNIT);
	Ext.getCmp('Rkdw').setValue(selectedRecord[0].data.UNIT);
	Ext.getCmp('Rkdj').setValue(selectedRecord[0].data.F_PRICE);
	Ext.getCmp('Rksl').setValue(selectedRecord[0].data.AMOUNT);
	Ext.getCmp('Rkkfms').setValue(selectedRecord[0].data.STORE_DESC);
	Ext.getCmp('Rkwzms').setValue(selectedRecord[0].data.LOC_DESC);
	Ext.getCmp('Rkwzfl').setValue(selectedRecord[0].data.I_TYPE);
}

function addPlan() {// 保存
	/*if ((Ext.getCmp('Rkwzbh').getValue() == ''
			|| Ext.getCmp('Rkwzmc').getValue() == ''
			|| Ext.getCmp('Rkgg').getValue() == ''
			|| Ext.getCmp('Rkdw').getValue() == '' 
			|| Ext.getCmp('Rkdj').getValue() == null
			|| Ext.getCmp('Rksl').getValue() == null
			|| Ext.getCmp('Rkkfms').getValue() == ''
			|| Ext.getCmp('Rkwzms').getValue() == '')) {
		Ext.example.msg('提示', '请将数据填写完整！');
		return;
	}*/
	Ext.Ajax.request({
		url : APP + '/ModelChange',
		params : {
			parName : [ 'a_kcid','a_materialcode', 'a_materialname', 'a_etalon',
					'a_unit', 'a_price', 'a_amount','a_storedesc', 
					'a_locdesc', 'a_itype','a_plantcode','a_departcode',
					'a_departname','a_userid','a_username','a_mpid'],
			parType : [ 's','s', 's', 's', 's', 'do', 'do', 's', 's', 's', 's',
			            's', 's', 's', 's','s'],
			parVal : [ kcid,
			        Ext.getCmp('Rkwzbh').getValue(),
					Ext.getCmp('Rkwzmc').getValue(),
					Ext.getCmp('Rkgg').getValue(), 
					Ext.getCmp('Rkdw').getValue(),
					Ext.getCmp('Rkdj').getValue(),
					Ext.getCmp('Rksl').getValue(),
					Ext.getCmp('Rkkfms').getValue(),
					Ext.getCmp('Rkwzms').getValue(),
					Ext.getCmp('Rkwzfl').getValue(),
					Ext.util.Cookies.get("mm.plantcode"),
					Ext.util.Cookies.get("mm.departcode"),
					Ext.util.Cookies.get("mm.departname"),
					Ext.util.Cookies.get("mm.userid"),
					Ext.util.Cookies.get("mm.username"),
					''],
			proName : 'pg_dj1001.saveinput',
			returnStr : ['ret_msg','ret'],
			returnStrType : ['s','s']
		},
		method : 'POST',
		success : function(response) {
			var resp = Ext.JSON.decode(response.responseText);
			Ext.example.msg('提示', '操作成功');
			Ext.getCmp('detailDialog').hide();
			 Query()
		}
	});
}
function onSure() {// 确认入库
		var selectedRecord = Ext.getCmp('grid').getSelectionModel().getSelection();
		if ((selectedRecord.length == 0)) {
			Ext.example.msg('提示', '请至少选择一条数据！');// 提示
			return;
		}
		var temp =0;
		if (selectedRecord.length > 0) {
			Ext.Array.each(selectedRecord, function(name) {
				Ext.Ajax.request({
					url : APP + '/ModelChange',
					async:false,
					params : {
						parName : ['a_kcid'],
						parType : ["s"],
						parVal : [name.data.KCID ],
						proName : ' pg_dj1001.confirminput',
						returnStr : ['ret_msg','ret'],
						returnStrType : ['s','s']
					// 传入参数值
					},
					method : 'POST',
					success : function(response) {
						var resp = Ext.JSON.decode(response.responseText);
						if (resp[1] == 'Success') {
						} else {
							temp++;
							Ext.example.msg('提示', resp[0]);
							
						}
					}
				});
			});
			if(temp==0){
				Ext.example.msg('提示', '操作成功');
			}
			
			 Query();
		}
}

function relmpid(value){
	rel_mpid = value;
	onInputSearch();
	Ext.example.msg('提示','请确认库存记录');
}
function relkcid(value){
	rel_kcid = value;
	if(rel_mpid == ''){
		Ext.example.msg('提示','请先选择要关联的计划');
		return;
	}
	var remark = Ext.getCmp('mp_remark').getValue();
	if(remark == '')
	{
		Ext.example.msg('提示','请输入关联说明信息');
		return;
	}
	
	Ext.Ajax.request({
					url : APP + '/ModelChange',
					async:false,
					params : {
						parName : ['a_mpid','a_kcid','a_remark'],
						parType : ["s","s","s"],
						parVal : [rel_mpid,rel_kcid,remark],
						proName : ' pg_dj1001.mptokc',
						returnStr : ['ret','ret_msg'],
						returnStrType : ['s','s']
					// 传入参数值
					},
					method : 'POST',
					success : function(response) {
						var resp = Ext.JSON.decode(response.responseText);
						if (resp[0] == 'Success') {
							onPlanSearch();
							Ext.example.msg('提示','关联成功');
						} 
					}
				});
}