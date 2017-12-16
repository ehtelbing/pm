
Ext.onReady(function() {
	if (location.href.split('?')[1] != undefined) {
		var EQUCODE = Ext.urlDecode(location.href.split('?')[1]).EQUCODE;
	}
	Ext.Ajax.request({
		url: AppUrl + 'cjy/PRO_RUN_EQU_VGURL',
		async: false,
		method: 'POST',
		params: {
			A_EQUID:EQUCODE
		},
		success: function (ret) {
			var resp = Ext.JSON.decode(ret.responseText);
			init(resp.TEU_URL);
		}
	});
	/*Ext.Ajax.request({
		url:APP + '/ModelChange',
		method: 'POST',
		params: {
			parName: ['A_EQUID'],
			parType: ['s'],
			parVal: [EQUCODE],
			proName: 'PRO_RUN_EQU_VGURL'	,
			returnStr: ['RET_URL'],
			returnStrType: ['s']
		},
		success: function (response) {
			var resp = Ext.JSON.decode(response.responseText);
			init(resp);
			//Ext.ComponentManager.get('vgopen').setSrc(resp);
		}

	});*/
	var panel = Ext.create('Ext.panel.Panel', {
		layout: {
			type: 'column'
		},
		width: '100%',items:[{ xtype: 'image',id:'vgopen', autoEl: { tag: 'a', href:'javascript:'}}
		]

	});
	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		items : [panel]
	});

})
function init(resp) {
	vg1.Run(APP+"/resources/VG/qxexlcf.xml");
}



		