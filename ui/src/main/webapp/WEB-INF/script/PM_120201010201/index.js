Ext.onReady(function() {
	var EQUCODE=null;
	if (location.href.split('?')[1] != undefined) {
		 EQUCODE = Ext.urlDecode(location.href.split('?')[1]).EQUCODE;
	}
	 Ext.Ajax.request({
         url:AppUrl + 'PM_12/PRO_RUN_EQU_VGURL',
         method: 'POST',
         params: {
			 A_EQUID:EQUCODE
         },
         success: function (response) {
       	  var resp = Ext.JSON.decode(response.responseText);
       	   init(resp.RET_URL);
		   //Ext.ComponentManager.get('vgopen').setSrc(resp.RET_URL);
         }
     });
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
		vg1.Run(AppUrl+"resources/VG/qxexlcf.xml");
   }



		