var modelcode = "";

if (location.href.split('?')[1] != undefined) {
	modelcode = Ext.urlDecode(location.href.split('?')[1]).MODEL_CODE  ;
}

Ext.onReady(function() {

	var qzgxStore = Ext.create('Ext.data.Store', {
		autoLoad : true,
		storeId : 'qzgxStore',
		fields : [ 'MODEL_ET_ID', 'ET_NO' ],
		proxy : {
			type : 'ajax',
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
				proName : 'pro_dj802_gxdroplist',
				cursorName : 'v_cursor'
			}
		}
	});

	var panelCenter = Ext.create('Ext.panel.Panel', {
		xtype : 'panel',
		region : 'center',
		frame : true,
		layout : {
			type : 'vbox'

		},
		defaults : {
			baseCls : 'my-panel-noborder'
		},
		margin : 1,
		items : [ {
			xtype : 'panel',
			width : 400,
			layout : {
				type : 'hbox'
			},
			frame : true,
			items : [ {
				xtype : 'button',
				text : '确定',
				handler : function() {
					onAdd();
				}
			} ]
		}, {
			xtype : 'panel',
			layout : 'vbox',
			frame : true,
			defaults : {
				margin : 5,
				labelAlign : 'left'
			},
			items : [ {
				xtype : 'textfield',
				fieldLabel : '工序号',
				id : 'gxh'
			}, {
				xtype : 'textfield',
				fieldLabel : '工序内容',
				id : 'gxnr'
			}, {
				xtype : 'textfield',
				fieldLabel : '计划工时',
				id : 'jhgs'
			}, {
				xtype : 'textfield',
				fieldLabel : '计划人数',
				id : 'jhrs'
			}, {
				xtype : 'combo',
				id : 'qzgx',
				fieldLabel : '前置工序ID',
				store : qzgxStore,
				queryMode : 'local',
				value : '1',
				editable : false,
				valueField : 'MODEL_ET_ID',
				displayField : 'ET_NO'
			} ]
		} ]
	});

	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		autoScroll : true,
		items : [ panelCenter ]
	});
//
//	Ext.data.StoreManager.lookup('qzgxStore').on('load', function() {
//				Ext.getCmp('qzgxStore').select(Ext.data.StoreManager
//						.lookup('qzgxStore').getAt(0));
//			});
});

function onAdd() {

	Ext.Ajax
			.request({
				url : APP + '/ModelChange',
				params : {
					parName : [ 'v_etno', 'v_modelcode', 'v_etcontext','v_planworktime','v_planperson','v_peretid' ],
					parType : [ 's', 's', 's', 'do','do', 's' ],
					parVal : [
             				Ext.getCmp('gxh').getValue(),
							modelcode,
							Ext.getCmp('gxnr').getValue(),
							Ext.getCmp('jhgs').getValue(),
							Ext.getCmp('jhrs').getValue(),
							Ext.getCmp('qzgx').getValue()],
					proName : 'pro_dj802_gxinsert',
					returnStr : [ 'ret' ],
					returnStrType : [ 's' ]
				},
				method : 'POST',
				success : function(response) {
					var resp = Ext.JSON.decode(response.responseText);
					if (resp[0] == "Success") {
						Ext.example.msg('提示', "操作成功！");
						window.close();
					} else {
						Ext.example.msg('提示', "操作失败！");
					}
				}
			});

}
