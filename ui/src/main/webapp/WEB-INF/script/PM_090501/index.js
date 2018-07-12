$(function() {
	loadPageInfo();
	loadTaskGrid();
	
	GetBillMatByOrder();
	loadMatList();
});

function loadPageInfo() {
	$.ajax({
		url: AppUrl + 'PM_09/PM_09_WORKORDER_GET',
		type : 'post',
		async : false,
		data : {
			V_V_ORDERGUID:$.url().param("V_GUID")
		},
		dataType : "json",
		traditional : true,
		success : function(resp) {
			if (resp.list != "" && resp.list != null) {
				$("#V_ORGCODE").val(resp.list[0].V_ORGCODE);
				$("#V_ORGNAME").html(resp.list[0].V_ORGNAME);
				$("#V_DEPTCODE").val(resp.list[0].V_DEPTCODE);
				$("#V_EQUIP_NAME").html(resp.list[0].V_EQUIP_NAME);
				$("#V_EQUIP_NO").html(resp.list[0].V_EQUIP_NO);
				$("#V_FUNC_LOC").html(resp.list[0].V_FUNC_LOC);
				$("#V_ORDER_TYP").html(resp.list[0].V_ORDER_TYP);
				$("#V_DEPTNAME").html(resp.list[0].V_DEPTNAME);
				$("#V_ORDERGUID").val(resp.list[0].V_ORDERGUID);
				$("#V_DEPTNAMEREPARIR").html(resp.list[0].V_DEPTNAMEREPARIR);

				$("#V_ORDER_TYP_TXT").html(resp.list[0].V_ORDER_TYP_TXT);

				$("#D_START_DATE").html(resp.list[0].D_START_DATE);
				$("#D_FINISH_DATE").html(resp.list[0].D_FINISH_DATE);

				$("#V_SHORT_TXT").html(resp.list[0].V_SHORT_TXT);

				$("#V_ENTERED_BY").html(resp.list[0].V_ENTERED_BY);
				var s1, st1;
				if(resp.list[0].D_ENTER_DATE!=''){
				  s1 = resp.list[0].D_ENTER_DATE;
	              st1 = [];
	              st1 = s1.split(' ');
				}else{
					  s1 =new Date();
		              st1 = [];
		              st1 = s1.split(' ');
				}
                $("#D_ENTER_DATE").html(st1[0]);
				 
				$("#V_WBS").html(resp.list[0].V_WBS);
				$("#V_WBS_TXT").html(resp.list[0].V_WBS_TXT);

				$("#V_ORDERID").html(resp.list[0].V_ORDERID);
				$("#V_DEPTCODEREPARIR").val(resp.list[0].V_DEPTCODEREPARIR);

				$("#V_TOOL").html(resp.list[0].V_TOOL);
				$("#V_TECHNOLOGY").html(resp.list[0].V_TECHNOLOGY);
				$("#V_SAFE").html(resp.list[0].V_SAFE);

				$("#D_DATE_ACP").html(resp.list[0].D_DATE_ACP);
				$("#V_POSTMANSIGN").html(resp.list[0].V_POSTMANSIGN);
				$("#V_CHECKMANCONTENT").html(resp.list[0].V_CHECKMANCONTENT);
				$("#V_CHECKMANSIGN").html(resp.list[0].V_CHECKMANSIGN);
				$("#V_WORKSHOPCONTENT").html(resp.list[0].V_WORKSHOPCONTENT);
				$("#V_WORKSHOPSIGN").html(resp.list[0].V_WORKSHOPSIGN);
				$("#V_DEPTSIGN").html(resp.list[0].V_DEPTSIGN);

				$("#I_OTHERHOUR").html(resp.list[0].I_OTHERHOUR);
				$("#V_OTHERREASON").html(resp.list[0].V_OTHERREASON);
				$("#V_REPAIRCONTENT").html(resp.list[0].V_REPAIRCONTENT);

				$("#V_REPAIRSIGN").html(resp.list[0].V_REPAIRSIGN);
				$("#V_REPAIRPERSON").html(resp.list[0].V_REPAIRPERSON);

				$("#D_FACT_START_DATE").html(resp.list[0].D_FACT_START_DATE);
				$("#D_FACT_FINISH_DATE").html(resp.list[0].D_FACT_FINISH_DATE);

			} else {
			}
		}
	});
}

function print() {
	var sel = [];
	sel.push($("#V_ORDERGUID").val());
	window.showModalDialog(AppUrl + "/No410101/Index.html", sel, "dialogHeight:700px;dialogWidth:1100px");
}

function loadTaskGrid() {
	$.ajax({
				url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_OPERATIONS',
				type : 'post',
				async : false,
				data : {
					V_V_ORDERGUID:$("#V_ORDERGUID").val()
				},
				dataType : "json",
				traditional : true,
				success : function(resp) {
					if (resp.list != "" && resp.list != null) {
						$("#TtableT tbody").empty();
						if (resp.list.length < 3) {
							$("#TtableTaskTemplate").tmpl(resp.list).appendTo(
									"#TtableT tbody");
							for ( var i = 0; i < 3 - resp.list.length; i++) {
								$("#TtableT tbody")
										.append(
												"<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
							}
						} else {
							$("#TtableTaskTemplate").tmpl(resp.list).appendTo("#TtableT tbody");
							var tool = document.getElementById('V_TOOL');
							tool.style.height = 45 * resp.list.length;

							var tech = document.getElementById('V_TECHNOLOGY');
							tech.style.height = 45 * resp.list.length;

							var safe = document.getElementById('V_SAFE');
							safe.style.height = 45 * resp.list.length;
						}
					} else {
					}
				}
			});
}

function loadMatList() {
	$.ajax({
		url: AppUrl + 'zdh/PRO_PM_WORKORDER_SPARE_VIEW',
		type : 'post',
		data : {
			V_V_ORDERGUID:$("#V_ORDERGUID").val()
		},
		dataType : "json",
		traditional : true,
		success : function(resp) {
			if (resp.list != null && resp.list != "") {
				$("#TtableM tbody").empty();
				$.each(resp.list, function(index, item) {
					item["sid"] = index + 1;
				});
				$("#TtableMTemplate").tmpl(resp.list).appendTo("#TtableM tbody");
			} else {
			}
		}
	});
}

function ViewTask() {
	//var ret = window.showModalDialog(AppUrl
	//		+ '/PM_090501/Index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val()
	//		+ '', '', 'dialogHeight:500px;dialogWidth:800px');
	var owidth = window.document.body.offsetWidth-200;
	var oheight = window.document.body.offsetHeight-100 ;
	var ret = window.open(AppUrl+'page/PM_090501/Index.html?V_ORDERGUID='+$("#V_ORDERGUID").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}

function ViewLook() {
	var ret = window.showModalDialog(AppUrl
			+ '/No41100103/Index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val()
			+ '', '', 'dialogHeight:500px;dialogWidth:800px');
}

function OnClickJJButton() {
	var ret = window.showModalDialog(AppUrl
			+ '/No411001012/Index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val()
			+ '', '', 'dialogHeight:500px;dialogWidth:800px');
}

function Agree(){
	$.ajax({
		url : APP + '/ModelChange',
		type : 'post',
		data : {
			parName : [ 'V_V_PERSONCODE','V_V_ORDERGUID','V_V_STEPNAME','V_V_MEMO','V_V_STATECODE' ],
			parType : [ 's','s','s','s','s' ],
			parVal : [ Ext.util.Cookies.get('v_personcode'),$("#V_ORDERGUID").val() ,
			           '设备主任审批','同意','6'],
			proName : 'PRO_PM_WORKORDER_SP',
			returnStr : ['V_CURSOR'],
			returnStrType : ['s']
		},
		dataType : "json",
		traditional : true,
		success : function(resp) {
			if(resp[0]=='成功'){
				fun_SetMatservice($("#V_ORDERGUID").val());// 工单TO物耗接口
				window.close();
				window.returnValue = 'yes';
				
			}else{
				Ext.MessageBox.alert('操作信息', '操作失败');
			}
		}
	});
}

function DisAgree(){
	$.ajax({
		url : APP + '/ModelChange',
		type : 'post',
		data : {
			parName : [ 'V_V_PERSONCODE','V_V_ORDERGUID','V_V_STEPNAME','V_V_MEMO','V_V_STATECODE' ],
			parType : [ 's','s','s','s','s' ],
			parVal : [ Ext.util.Cookies.get('v_personcode'),$("#V_ORDERGUID").val() ,
			           '设备主任审批','不同意','-1'],
			proName : 'PRO_PM_WORKORDER_SP',
			returnStr : ['V_CURSOR'],
			returnStrType : ['s']
		},
		dataType : "json",
		traditional : true,
		success : function(resp) {
			if(resp[0]=='成功'){
				
				window.close();
				window.returnValue = 'yes';
			}else{
				Ext.MessageBox.alert('操作信息', '操作失败');
			}
		}
	});
}

function GetBillMatByOrder(){
	$.ajax({
		url:AppUrl + 'mm/WS_EquipGetBillMaterialByOrderService',
		type: 'post',
        async: false,
        data: {
        	V_V_ORDERGUID:$("#V_ORDERGUID").val(),
			V_V_ORDERID:$("#V_ORDERID").html(),
			x_personcode:Ext.util.Cookies.get('v_personcode')
        },
        dataType: "json",
        traditional: true
	});
}



function fun_SetMatservice(V_V_ORDERGUID) {
     $.ajax({
	                	url : APP +  'mm/SetMatService',
	                	type:'post',
	                	async:false,
	                	data:{
	                	V_V_ORDERGUID:V_V_ORDERGUID
		                },success:function(resp){
//		                	var resp = Ext.JSON.decode(resp.responseText);
		            		if(resp=="1"){
		            		Ext.Ajax.request({
		            			url : APP + '/ModelChange',
		            			async : false,
		            			method : 'POST',
		            			params : {
		            				parName : [ 'V_V_ORDERGUID', 'V_V_SEND_STATE' ],
		            				parType : [ 's', 's'],
		            				parVal : [V_V_ORDERGUID,"成功"],
		            				proName : 'PRO_PM_WORKORDER_SEND_UPDATE',
		            				returnStr : ['V_CURSOR'],
		    						returnStrType : ['s']
		            				}
		            			});
		            		}else{
		            			Ext.Ajax.request({
		                			url : APP + '/ModelChange',
		                			async : false,
		                			method : 'POST',
		                			params : {
		                				parName : [ 'V_V_ORDERGUID', 'V_V_SEND_STATE' ],
		                				parType : [ 's', 's'],
		                				parVal : [V_V_ORDERGUID,"失败"],
		                				proName : 'PRO_PM_WORKORDER_SEND_UPDATE',
		                				returnStr : ['V_CURSOR'],
		        						returnStrType : ['s']
		                			}
		                		});
		            		}
		                }
	                });
} 