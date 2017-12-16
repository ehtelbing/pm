 
var orderid= '';
if(location.href.split('?')[1]!=null){ 
	orderid = Ext.urlDecode(location.href.split('?')[1]).orderid;
}

Ext.onReady(function() {
        
	
	 Ext.Ajax.request({
                url: APP+"/ModelSelect",
                method: 'POST',
                params: {
                    parName: ['ORDERID_in'],
                    parType: ["s"],
                    parVal: [  orderid  ],
                    proName: "pro_dj601_ordermessage",
                    cursorName:'ret'
                },
                success: function (response, options) {

                    var resp = Ext.decode(response.responseText).list;
                    
                      if(resp.length>0){
                        Ext.fly('ORDERID').dom.innerHTML = orderid;
                        Ext.fly('DJ_UQ_CODE').dom.innerHTML = resp[0].DJ_UQ_CODE;
                        Ext.fly('DJ_NAME').dom.innerHTML = resp[0].DJ_NAME;
                        Ext.fly('MEND_CONTEXT').dom.innerHTML = resp[0].MEND_CONTEXT;
						
                        Ext.fly('DJ_VOL').dom.innerHTML = resp[0].DJ_VOL;
						Ext.fly('DJ_TYPE').dom.innerHTML = resp[0].DJ_TYPE;
						Ext.fly('SUPPLY_NAME').dom.innerHTML = resp[0].LOC_PLANTNAME;
						
                        Ext.fly('PLAN_BEGINDATE').dom.innerHTML = resp[0].PLAN_BEGINDATE;
                        Ext.fly('PLAN_ENDDATE').dom.innerHTML = resp[0].PLAN_ENDDATE;
                        
                        Ext.fly('MENDDEPT_NAME').dom.innerHTML = resp[0].MENDDEPT_NAME;
                        Ext.fly('MEND_USERNAME').dom.innerHTML = resp[0].MEND_USERNAME;
						
						Ext.fly('MEND_TYPE').dom.innerHTML = resp[0].MEND_TYPE;
                      }
                      
                }   	 
    });
 
	
	 
      Ext.Ajax.request({
                url: APP+"/ModelSelect",
                method: 'POST',
                params: {
                    parName: ['ORDERID_in'],
                    parType: ["s"],
                    parVal: [  orderid  ],
                    proName: "pro_dj601_orderet",
                    cursorName:'ret'
                },
                success: function (response, options) {

                    var resp = Ext.decode(response.responseText).list;
                    
                     var table =  "";
					
                    if(resp.length>0){
                    	Ext.Array.each(resp, function(name, index, countriesItSelf) {
                    		 table="<tr>" +
                    		 		"<td>"+name.ET_NO+"</td>" +
                    		 		"<td>"+name.ET_CONTEXT+"</td>" +
                    		 		"<td>"+name.PLAN_WORKTIME+"</td>" +
                    		 		"<td>"+name.PLAN_PERSON+"</td>" +
                    		 		"<td>"+name.ACT_WORKTIME+"</td>" +
                    		 		"<td>"+name.ACT_PERSON+"</td>" +
                    		 		"<td>"+name.PRE_ET_ID+"</td>" +
                    		 		"</tr>";
									$("#TABLE1").append(table);
						});
						
						//Ext.fly('TABLE1').dom.innerHTML = table;
                    }
                   
                }   	 
    });
    
    
    
    Ext.Ajax.request({
                url: APP+"/ModelSelect",
                method: 'POST',
                params: {
                    parName: ['ORDERID_in'],
                    parType: ["s"],
                    parVal: [  orderid  ],
                    proName: "pro_dj601_ordermat",
                    cursorName:'ret'
                },
                success: function (response, options) {

                    var resp = Ext.decode(response.responseText).list;
                    
                   
                    
                    
                var table =  "";
				
                    if(resp.length>0){
                    	Ext.Array.each(resp, function(name, index, countriesItSelf) {
                    		 table="<tr>" +
                    		 		"<td>"+name.MATERIALCODE+"</td>" +
                    		 		"<td>"+name.MATERIALNAME+"</td>" +
                    		 		"<td>"+name.ETALON+"</td>" +
                    	
                    		 		"<td>"+name.UNIT+"</td>" +
                    		 		"<td>"+name.F_PRICE+"</td>" +
                    		 		"<td>"+name.ACT_AMOUNT+"</td>" +
                    		 		"<td>"+name.F_ACT_MONEY+"</td>" +
                    
                    		 		"</tr>";
									$("#TABLE2").append(table);
						});
				
						// Ext.fly('TABLE2').dom.innerHTML = table;
                    }
                }   	 
    });
	  
})


function DefaultPrintSettings() {
	try {
		LODOP = getLodop(document.getElementById('LODOP'), document
				.getElementById('LODOP_EM'));
		LODOP.SET_LICENSES("鞍山市新安杰系统集成有限公司", "559677661718684777294958093190",
				"", "");

		LODOP.PRINT_INIT("gongdan");
		var strBodyStyle = "<style>"
				+ document.getElementById('stylePrint').innerHTML + "</style>";

		LODOP.SET_PRINT_PAGESIZE(1, 2400, 0, 'A4 横向');

		var strFormHtml = strBodyStyle
				+ document.getElementById('main').innerHTML;
		LODOP.ADD_PRINT_HTM("5", "5", "100%", "100%", strFormHtml);
		LODOP.NewPage();
	} catch (e) {
		document.getElementById('exception').style.display = 'block';
	}
}

function dataPrint() {
	try {
		DefaultPrintSettings();
		LODOP.PRINT();
	} catch (e) {
		document.getElementById('exception').style.display = 'block';
	}
}
function printPreview() {
	try {
		DefaultPrintSettings();
		LODOP.PREVIEW();
	} catch (e) {
		document.getElementById('exception').style.display = 'block';
	}
}
