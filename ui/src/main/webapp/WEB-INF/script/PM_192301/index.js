var sp, equCode, personid;
Ext.onReady(function() {
			sp = '';
			equCode = '';
			personid = '';
			// 作业区1树

			var westtreeStore = Ext.create("Ext.data.TreeStore", {
				autoLoad : false,
				storeId : 'westtreeStore'
			});
			// 作业区2树
			var centertreeStore = Ext.create("Ext.data.TreeStore", {
				storeId : 'centertreeStore',
				autoLoad : false,
				autoScroll : true,
				rootVisible : false
			});

			// 厂矿下拉
			var plantStore = Ext.create("Ext.data.Store", {
				autoLoad : true,
				storeId : 'plantStore',
				fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
				proxy : {
					type : 'ajax',
					async : false,
					url : AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
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
						V_V_DEPTTYPE: '[基层单位]'
					}
				}
			});
	// 厂矿下拉
	var plantStore2 = Ext.create("Ext.data.Store", {
		autoLoad : true,
		storeId : 'plantStore2',
		fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
		proxy : {
			type : 'ajax',
			async : false,
			url : AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
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
				V_V_DEPTTYPE: '[基层单位]'
			}
		}
	});
			// 作业区下拉
			var sectionStore = Ext.create("Ext.data.Store", {
				autoLoad : false,
				storeId : 'sectionStore',
				fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
				proxy : {
					type : 'ajax',
					async : false,
					url : AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
					actionMethods : {
						read : 'POST'
					},
					reader : {
						type : 'json',
						root : 'list'
					}
				}
			});

			var westtree = Ext.create("Ext.tree.Panel", {
				id : 'westtree',
				region : 'west',
				height : '100%',
				width : '20%',
				rootVisible : false,
				store : westtreeStore,
				listeners : {
					itemclick : WestTreeOnClick
				}
			});

			var centertree = Ext.create("Ext.tree.Panel", {
				id : 'centertree',
				region : 'center',
				height : '100%',
				width : '20%',
				rootVisible : false,
				store : centertreeStore,
				listeners : {
					itemclick : CenterTreeOnClick
				}
			});

			var northpanel = Ext.create("Ext.panel.Panel", {
				id : 'northpanel',
				region : 'north',
				width : '100%',
				layout : 'column',
				frame:true,
				items : [ {
					id : 'plant',
					xtype : 'combo',
					editable : false,
					fieldLabel : '厂矿',
					store : plantStore,
					labelAlign : 'right',
					labelWidth : 50,
					displayField : 'V_DEPTNAME',
					valueField : 'V_DEPTCODE',
					queryMode : 'local',
					labelAlign : 'right',
					margin:'5px 0px 5px 5px'
				}, {
					id : 'plant2',
					xtype : 'combo',
					editable : false,
					fieldLabel : '厂矿',
					store : plantStore2,
					labelAlign : 'right',
					labelWidth : 50,
					displayField : 'V_DEPTNAME',
					valueField : 'V_DEPTCODE',
					queryMode : 'local',
					labelAlign : 'right',
					margin:'5px 0px 5px 5px'
				}, {
					id : 'section',
					xtype : 'combo',
					editable : false,
					store : sectionStore,
					fieldLabel : '作业区',
					labelAlign : 'right',
					labelWidth : 50,
					displayField : 'V_DEPTNAME',
					valueField : 'V_DEPTCODE',
					queryMode : 'local',
					margin:'5px 0px 5px 5px'
				} ]
			});

			var gridStore = Ext.create('Ext.data.Store', {
				id : 'gridStore',
				autoLoad : false,
				fields : [ 'V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_EQUSITENAME' ],
				proxy : {
					type : 'ajax',
					async : false,
					url : AppUrl + 'pm_19/PRO_GET_DEPTEQU_PER',
					actionMethods : {
						read : 'POST'
					},
					reader : {
						type : 'json',
						root : 'list'
					}
				}
			});

			var eastgridpanel = Ext.create("Ext.grid.Panel", {
				id : 'eastgridpanel',
				region : 'east',
				height : '90%',
				columnLines : true,
				store : gridStore,
				autoScroll : true,

				selType : 'checkboxmodel',
				width : '60%',
				columns : [ {
					text : '设备编号',
					dataIndex : 'V_EQUCODE',
					width : 200,
					align : 'center',
					renderer : Left
				}, {
					text : '设备名称',
					dataIndex : 'V_EQUNAME',
					width : 250,
					align : 'center',
					renderer : Left
				}, {
					text : '设备位置编码',
					dataIndex : 'V_EQUSITE',
					width : 200,
					align : 'center',
					renderer : Left
				}, {
					text : '设备位置',
					dataIndex : 'V_EQUSITENAME',
					width : 400,
					align : 'center',
					renderer : Left
				} ],
				listeners : {
					select : OnSelectionChanged,
					deselect : OnClickGridPanel
				}
			});

			Ext.create('Ext.container.Viewport', {
				split : true,
				autoScroll : true,
				layout : 'border',
				items : [ westtree, centertree, northpanel, eastgridpanel ]
			});
			Ext.data.StoreManager.lookup('plantStore').on("load", function() {
				Ext.getCmp("plant").select(plantStore.getAt(0));
			});
			// 厂矿change
			Ext.ComponentManager.get("plant").on("change", function() {
				Ext.getCmp('westtree').store.setProxy({
					type : 'ajax',
					actionMethods : {
						read : 'POST'
					},
					async : false,
					url : AppUrl + 'pm_19/OrgAndPersonTree',
					reader : {
						type : 'json'
					},
					root : {
						expanded : true
					},
					extraParams : {
						V_V_DEPTCODE : Ext.getCmp('plant').getValue()
					}
				});
				Ext.getCmp('westtree').store.load();
			});
			// 厂矿onload
			Ext.data.StoreManager.lookup('plantStore2').on("load", function() {
				Ext.getCmp("plant2").select(plantStore2.getAt(0));
				sectionStore.load({
					params : {
						V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
						V_V_DEPTCODE:Ext.getCmp("plant2").getValue(),
						V_V_DEPTCODENEXT:Ext.util.Cookies.get('v_deptcode'),
						V_V_DEPTTYPE:'[主体作业区]'
					}
				});
			});
			// 厂矿change
			Ext.ComponentManager.get("plant2").on("change", function() {
				Ext.ComponentManager.get('section').getStore().removeAll();
				sectionStore.load({
					params : {
						V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
						V_V_DEPTCODE:Ext.getCmp("plant2").getValue(),
						V_V_DEPTCODENEXT:Ext.util.Cookies.get('v_deptcode'),
						V_V_DEPTTYPE:'[主体作业区]'
					}
				});
			});
			// 作业区onload
			Ext.data.StoreManager.lookup('sectionStore').on("load", function() {
				Ext.getCmp("section").select(sectionStore.getAt(0));
			});
			// 作业区change
			Ext.ComponentManager.get('section').on("change", function() {
				Ext.getCmp('centertree').store.setProxy({
					type : 'ajax',
					url : AppUrl + 'pm_19/DepartAndEquTypeTree',
					extraParams : {
						V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
						V_V_DEPTCODENEXT : Ext.getCmp('section').getValue()
					},
					actionMethods : {
						read : 'POST'
					}
				});
				Ext.getCmp('centertree').store.load();
			});

			Ext.data.StoreManager.lookup('gridStore').on('load', function() {
				var eastLength = Ext.data.StoreManager.get('gridStore').data.length;
				Ext.ComponentManager.get('eastgridpanel').getSelectionModel().selectionMode = 'MULTI';
				for ( var i = 0; i < eastLength; i++) {
					Ext.Ajax.request({
						url : AppUrl + 'pm_19/PRO_PM_PERSONTOEQU_VIEW',
						async : false,
						method : 'post',
						params : {
							V_V_PERSONCODE:personid,
							V_V_EQUCODE:Ext.data.StoreManager.get('gridStore').data.getAt(i).data.V_EQUCODE
						},
						success : function(resp) {
							if (Ext.JSON.decode(resp.responseText).list.length> 0) {
								Ext.ComponentManager.get('eastgridpanel').getSelectionModel().select(i, true, true);
							}
						}
					});
				}
			});
		});

function WestTreeOnClick(aa, record, item, index, e, eOpts) {
	if (record.data.leaf == true) {
		personid = record.data.id;
	}
}
function CenterTreeOnClick(aa, record, item, index, e, eOpts) {
	if (personid == "") {
		alert('请先选择人员!');
	} else {
		if (record.data.leaf == true) {
			equCode = record.data.id;
			Ext.data.StoreManager.lookup('gridStore').load({
				params : {
					V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
					V_V_DEPTCODENEXT:Ext.getCmp('section').getValue(),
					V_V_EQUTYPECODE:equCode
				}
			});
		}
	}
}

function Left(value, metaData, record, rowIndex, colIndex, store) {
	metaData.style = "text-align:left";
	return value;
}
// 添加
function OnSelectionChanged(pp, record, index, eOpts) {
	for ( var i = 0; i < Ext.getCmp('eastgridpanel').getSelectionModel().getSelection().length; i++) {
		Ext.Ajax.request({
			url : AppUrl + 'pm_19/PRO_PM_PERSONTOEQU_SET',
			method : 'POST',
			async : false,
			params : {
				V_V_PERSONCODE:personid,
				V_V_EQUCODE: record.data.V_EQUCODE
			}
		});
	}
}
// 删除
function OnClickGridPanel(pp, record, index, eOpts) {
	for ( var i = 0; i <= Ext.getCmp('eastgridpanel').getSelectionModel().getSelection().length; i++) {
		Ext.Ajax.request({
			url : AppUrl + 'pm_19/PRO_PM_PERSONTOEQU_DEL',
			method : 'POST',
			async : false,
			params : {
				V_V_PERSONCODE:personid,
				V_V_EQUCODE:record.data.V_EQUCODE
			}
		});
	}
}
