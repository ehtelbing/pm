
var GridModel = Ext.create('Ext.selection.RowModel', {});
Ext
	.onReady(function() {
		Ext.QuickTips.init();

		var gridStore = Ext.create('Ext.data.Store', {
			id : 'gridStore',
			autoLoad : false,

			fields : [ 'F_PRICE',
		'MATERIALCODE',
		'MATERIALETALON',
		'MATERIALNAME',
		'RUN_PRE_TIME',
		'UNIT'],
			proxy : {
				type : 'ajax',
				async : false,
				url: AppUrl + 'cjy/pg_run7134_getbjlist',
				actionMethods : {
					read : 'POST'
				},

				reader : {
					type : 'json',
					root : 'list'
				}
			}
		});
		var panel = Ext
			.create(
			'Ext.form.Panel',
			{
				region : 'center',
				id : 'panel',
				//width:800,
				style: 'background-color:#FFFFFF',
				baseCls: 'my-panel-no-border',
				layout : 'vbox',
				border : false,
				frame : true,
				items : [{
					xtype : 'panel',
					style: 'background-color:#FFFFFF',
					baseCls: 'my-panel-no-border',
					layout : 'column',
					items : [ {
						xtype : 'textfield',
						fieldLabel : '备件编码',
						id : 'matCode',
						labelAlign : 'right',
						labelWidth : 60,
						margin:'5 5 5 5'
					}, {
						xtype : 'textfield',
						fieldLabel : '备件名称',
						id : 'matDesc',
						labelAlign : 'right',
						labelWidth : 60,
						margin:'5 5 5 5'
					}, {
						xtype : 'button',
						text : '查询',
						icon : imgpath + '/search.png',
						width : 60,
						margin : '5px 0px 0px 10px',
						listeners : {
							click : loadQuery
						}
					} ,{
						xtype : 'button',
						text : ' 选择',
						width : 60,
						margin : '5px 0px 0px 10px',
						listeners : {
							click : checkGrid
						}
					} ]
				}, {
					xtype : 'gridpanel',
					id : 'grid',
					store : gridStore,
					selType : 'checkboxmodel',
					columnLines : true,
					autoScroll : true,
					width : '100%',
					//height : '90%',
					columns : [ {
						text : '物料编码',
						id : 'codeClick',
						dataIndex : 'MATERIALCODE',
						width : 100,
						renderer : AddFloat
					},
						{
							text : '物料描述',
							dataIndex : 'MATERIALNAME',
							width : 160,
							renderer : AddFloat
						}, {
							text : '单位',
							dataIndex : 'UNIT',
							width : 100,
							renderer : AddFloat
						}, {
							text : '计划单价',
							dataIndex : 'F_PRICE',
							width : 100,
							renderer : AddFloat
						}, {
							text : '规格型号',
							dataIndex : 'MATERIALETALON',
							width : 80,
							renderer : AddFloat
						} ]/*,
					listeners : {
						itemclick : BackItem
					}*/
				} ]
			});


		function loadQuery() {
			Ext.data.StoreManager
				.lookup(
				'gridStore')
				.load(
				{
					params : {
						a_mat_no:'%',
						a_mat_desc:'%'
					}
				});
		}

		function checkGrid(){
			var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
			if(seldata.length!=1){
				alert("请选择一条数据");
				return;

			}
			var ret='';
			ret=seldata[0].data.MATERIALCODE + '^' + seldata[0].data.MATERIALNAME + '^'+seldata[0].data.UNIT+'^'+seldata[0].data.F_PRICE+'^'+seldata[0].data.MATERIALETALON;
			window.opener.getReturnValue(ret);
			window.close();

		}
		function BackItem(aa, record, item, index, e, eOpts) {
			var matCode = record.data.MAT_NO;
			var matDesc = record.data.MAT_DESC;
			var unit = record.data.UNIT;
			var price = record.data.PLAN_PRICE;
			var matgon = record.data.MAT_OLD_NO;

			var threeParams = matCode + '^' + matDesc + '^' + unit + '^'
				+ price + '^' + matgon ;
			window.returnValue = threeParams;
			window.close();
//				window.parent.OnClickMatCodeText(threeParams);
		}



		function AddFloat(value, metaData, record, rowIndex, colIndex,
						  store, view) {
			return '<div data-qtip="' + value + '" >' + value + '</div>';
		}


		Ext.create('Ext.container.Viewport', {
			layout : 'border',
			items : [ panel ]
		});


	});
