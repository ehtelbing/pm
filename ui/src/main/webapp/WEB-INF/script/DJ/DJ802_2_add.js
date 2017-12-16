var modelcode = "";

if (location.href.split('?')[1] != undefined) {
	modelcode = Ext.urlDecode(location.href.split('?')[1]).MODEL_CODE  ;
}

Ext.onReady(function() {

	
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
				fieldLabel : '物料编码',
				id : 'wlbm'
			}, {
				xtype : 'textfield',
				fieldLabel : '物料名称',
				id : 'wlmc'
			}, {
				xtype : 'textfield',
				fieldLabel : '规格型号',
				id : 'ggxh'
			}, {
				xtype : 'textfield',
				fieldLabel : '材质',
				id : 'cz'
			} , {
				xtype : 'textfield',
				fieldLabel : '单位',
				id : 'dw'
			} , {
				xtype : 'textfield',
				fieldLabel : '单价',
				id : 'dj'
			}, {
				xtype : 'textfield',
				fieldLabel : '计划数量',
				id : 'jhsl'
			}  ]
		} ]
	});

	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		autoScroll : true,
		items : [ panelCenter ]
	});

});

function onAdd() {

	Ext.Ajax
			.request({
				url : APP + '/ModelChange',
				params : {
					parName : [ 'v_modelcode',
					            'v_MATERIALCODE', 
					            'v_MATERIALNAME',
					            'v_ETALON',
					            'v_MATCL',
					            'v_UNIT',
					            'v_F_PRICE',
					            'v_PLAN_AMOUNT'],
					parType : [ 's', 's', 's', 's', 's', 's', 'do','do'],
					parVal : [
							modelcode,
							Ext.getCmp('wlbm').getValue(),
							Ext.getCmp('wlmc').getValue(),
							Ext.getCmp('ggxh').getValue(),
							Ext.getCmp('cz').getValue(),
							Ext.getCmp('dw').getValue(),
							Ext.getCmp('dj').getValue(),
							Ext.getCmp('jhsl').getValue()],
					proName : 'pro_dj802_whinsert',
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
