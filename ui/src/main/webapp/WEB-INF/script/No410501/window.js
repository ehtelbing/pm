var V_ORDERGUID = null;
if (location.href.split('?')[1] != undefined) {
	V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
}

var jsWindow = window;

Ext.onReady(function () {
	
	/*var activityStore = Ext.create('Ext.data.Store', {
				id : 'activityStore',
				autoLoad : true,
				fields : [ 'V_ACTIVITY' ],
				proxy : {
					type : 'ajax',
					// url: '/No41070102/PRO_PM_WORKORDER_ET_ACTIVITY',
					url : APP + '/ModelSelect',
					actionMethods : {
						read : 'POST'
					},
					extraParams : {
						// V_V_ORDERGUID: V_ORDERGUID
						parName : [ 'V_V_ORDERGUID' ],
						parType : [ 's' ],
						parVal : [ V_ORDERGUID ],
						proName : 'PRO_PM_WORKORDER_ET_ACTIVITY',
						cursorName : 'V_CURSOR'
					},
					reader : {
						type : 'json',
						root : 'list'
					}
				}
			});*/
			
			
			
			var gridStore = Ext.create('Ext.data.Store', {
				id : 'gridStore',
				autoLoad : false,
				fields : [ 'MAT_NO', 'MAT_DESC', 'UNIT', 'PLAN_PRICE',
						'DICTNAME', 'BEIJIANPORPERTY', 'MAT_GROUP',
						'MAT_OLD_NO', 'DAYS' ],
				proxy : {
					type : 'ajax',
					async : false,
					url : AppUrl + 'mm/WS_MMToXLReadMaterailService',
					actionMethods : {
						read : 'POST'
					},

					reader : {
						type : 'json',
						root : 'list'
					}
				}
			});
	
            var panel = Ext.create("Ext.panel.Panel", {
				
					border:0,
					dockedItems : [ {
						xtype : 'panel',
						layout : 'column',
						//defaults:{style:'margin:5px 0 0 0'},
						items : [ {
							xtype : 'textfield',
							fieldLabel : '物料编码',
							id : 'matCode',
							labelAlign : 'right',
							labelWidth : 60
						}, {
							xtype : 'textfield',
							fieldLabel : '物料名称',
							id : 'matDesc',
							labelAlign : 'right',
							labelWidth : 60
						}, {
							xtype : 'combo',
							fieldLabel : '物资类别',
							id : 'selType',
							editable : false,
							store : [ [ '%', '全部' ],[ '材料', '材料' ], [ '备件', '备件' ] ],
							labelAlign : 'right',
							labelWidth : 60
					
						}, /*{
							xtype : 'combo',
							fieldLabel : '工序',
							id : 'selActivity',
							editable : false,
							store : activityStore,
							labelAlign : 'right',
							labelWidth : 30, // queryMode: 'local',
							displayField : 'V_ACTIVITY',
							valueField : 'V_ACTIVITY'
						},*/ {
							xtype : 'button',
							text : '查询',

							icon: imgpath +'/search.png',
							width : 60,
							margin : '0px 0px 0px 10px',
							listeners : {
								click : loadQuery
							}
						} ]
					}, {
						xtype : 'gridpanel',
						id : 'grid',
						store : gridStore,
						columnLines : true,
						autoScroll : true,
						width : 500,
						height : 200,
						//selType: 'checkboxmodel',
						
						columns : [ {
							text : '物料编码',
							id : 'codeClick',
							dataIndex : 'MAT_NO',
							width : 100,
							renderer : AddFloat
						}, 
						{
							text : '物料描述',
							dataIndex : 'MAT_DESC',
							width : 160,
							renderer : AddFloat
						}, {
							text : '单位',
							dataIndex : 'UNIT',
							width : 40,
							renderer : AddFloat
						}, {
							text : '计划价',
							dataIndex : 'PLAN_PRICE',
							width : 60,
							renderer : AddFloat
						}, {
							text : '规格型号',
							dataIndex : 'MAT_OLD_NO',
							width : 80,
							renderer : AddFloat
						} ]
						 
					} ]
				});  
				
				
				
				
				
	Ext.create('Ext.container.Viewport', {

        
        split: true,
        border: 0,
        items: [panel]
    });
    
    
    Ext.getCmp("grid").on("itemclick",function(obj, record, item, index, e, eOpts ){
          
    	  //物料编码:MAT_NO  物料描述:MAT_DESC
    	  //单位:UNIT        计划价:PLAN_PRICE
    	  //规格型号:MAT_OLD_NO
    	  
          window.parent.returnData(
		          record.data.MAT_NO,
		          record.data.MAT_DESC,
		          record.data.UNIT,
		          record.data.PLAN_PRICE,
		          record.data.MAT_OLD_NO
          );
          
          
    });
    
  
    
    
    Ext.getCmp("selType").select(Ext.getCmp("selType").getStore().getAt(0));
				
				function loadQuery() {
				 
					gridStore.proxy.extraParams.x_code = Ext.getCmp('matCode')
							.getValue();
					gridStore.proxy.extraParams.x_name = Ext.getCmp('matDesc')
							.getValue();
					gridStore.proxy.extraParams.x_type = Ext.getCmp('selType')
							.getValue();
					gridStore.proxy.extraParams.x_personcode = Ext.util.Cookies.get("v_personcode");
					Ext.ComponentManager.get('grid').getStore().load();
				 
			}
			
			
			
			function BackItem(aa, record, item, index, e, eOpts) {
				
			 
				var matCode = record.data.MAT_NO;
				var matDesc = record.data.MAT_DESC;
				var unit = record.data.UNIT;
				var price = record.data.PLAN_PRICE;
				var matgon = record.data.MAT_OLD_NO;
				var acti = Ext.getCmp('selActivity').getValue();

				var threeParams = matCode + '^' + matDesc + '^' + unit + '^'
						+ price + '^' + matgon + '^' + acti;
				window.parent.OnClickMatCodeText(threeParams);
			}
			
			
			function AddFloat(value, metaData, record, rowIndex, colIndex,
					store, view) {
				return '<div data-qtip="' + value + '" >' + value + '</div>';
			}
				
})