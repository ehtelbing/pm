
Ext.onReady(function() {
	if (location.href.split('?')[1] != undefined) {
		var EQUCODE = Ext.urlDecode(location.href.split('?')[1]).EQUCODE;
	}
    
	 Ext.Ajax.request({
		 url: AppUrl + 'cjy/PRO_RUN_EQU_VGURL',
         method: 'POST',
         params: {
			 A_EQUID:EQUCODE
         },
         success: function (response) {
       	  var resp = Ext.JSON.decode(response.responseText);
       	   init(resp);
       	  //Ext.ComponentManager.get('vgopen').setSrc(resp);
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
		vg1.Run(APP+"/resources/VG/qxexlcf.xml");
	}



		