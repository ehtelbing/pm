Ext.onReady(function() {



	var panelCenter = Ext.create('Ext.panel.Panel', {
		xtype : 'panel',
		region : 'center',
		frame : true,
		layout : {
			type : 'vbox',
			
		},
		defaults : {
			baseCls : 'my-panel-noborder'
		},
		margin : 1,
		items : [ {
	         xtype : 'panel',
	         width:400,
	         layout : {
		     type : 'hbox',
		     /*pack : 'start',
		     align : 'top'*/
		    	 },
	         frame : true,
	         /*defaults : {
	        	 margin : 5,
	        	 labelAlign : 'left'
	        		 },*/
	        items : [{
		    xtype : 'button',
		    text : '确定',
		    handler : function() {
			    onAdd();
			    }
	        } ]
	        		 },
		   {
			xtype : 'panel',
			layout : 'hbox',
			frame : true,
			defaults : {
				margin : 5,
				labelAlign : 'left'
			},
			items : [ {
				xtype : 'textfield',
				fieldLabel : '检修状态编码',
				id : 'jxztbm'
			}, {
				xtype : 'textfield',
				fieldLabel : '检修状态名称',
				id : 'jxztmc'
			} ]
		}, {
			xtype : 'panel',
			layout : 'hbox',
			frame : true,
			defaults : {
				margin : 5,
				labelAlign : 'left'
			},
			items : [ {
				xtype : 'combo',
				id : 'ifuse',
				fieldLabel : '是否可用',
				store : [['1','是'],['0','否']],
				value:'1',
				editable : false,
			}, {
				xtype : 'textfield',
				fieldLabel : '下一个状态',
				id : 'next'
			} ]
		} ]
	});

	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		autoScroll : true,
		items : [ panelCenter ]
	});

	
});

function onAdd() {

	Ext.Ajax.request({
		url : APP + '/ModelChange',
		params : {
			parName : ['v_ordersts','v_orderdesc','v_userflag','v_nextsts'],
			parType : [ 's', 's', 's', 's'],
			parVal : [

			        Ext.getCmp('jxztbm').getValue(),
			        Ext.getCmp('jxztmc').getValue(),
					Ext.getCmp('ifuse').getValue(),
					Ext.getCmp('next').getValue()],
			proName : 'pro_dj703_insert',
			returnStr : [ 'RET' ],
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
