$(function() {
	bindDate("planStartDate");//开始时间控件
	bindDate("planFinDate");//结束时间控件
	//创建人
	$("#personCode").html(Ext.util.Cookies.get('v_personname2'));
	//创建日期
	NowDate2("createDate");
	//计划开始时间
	NowDate_b("planStartDate");
	//计划完成时间
	NowDate_e("planFinDate");
	//加载页面信息
	loadPageInfo();

	//loadTypelist();//类型描述
	loadPlantlist();//检修单位

	loadTaskGrid();//编辑任务
	loadMatList();//编辑物料信息
	//类型描述改变时，工单类型的值=类型描述的值
	$("#selType").change(function() {
		$("#ORDER_TYP").html($("#selType").val());
	});
    $("#selPlant").on("input propertychange",function(){
        if($("#selPlant").val()=="99170208"){
            $("#selType").val("AK11");
        }else{
            $("#selType").val($("#selType").get(0).checked=true)
        }
    });
});
//加载页面信息
function loadPageInfo() {
	//基本信息
	$.ajax({
		url: AppUrl + '/ModelSelect',
		type: 'post',
		async: false,
		data: {
			parName: ['V_V_GUID'],
			parType: ['s'],
			parVal: [$.url().param("V_GUID")],
			proName: 'PM_14_FAULT_ITEM_DATA_GET',
			cursorName: 'V_CURSOR'
		},
		traditional: true,
		success: function (resp) {
			$("#V_ORGCODE").val(resp.list[0].V_ORGCODE);//工厂单位编码
			$("#V_ORGNAME").html(resp.list[0].V_ORGNAME);//工厂单位名称
			$("#V_DEPTCODE").val(resp.list[0].V_DEPTCODE);//作业区编码
			$("#V_DEPTNAME").html(resp.list[0].V_DEPTNAME);//作业区名称
			$("#V_EQUCODE").html(resp.list[0].V_EQUCODE);//设备编号
			$("#V_EQUNAME").html(resp.list[0].V_EQUNAME);//设备名称
			//功能位置
			$.ajax({
				url: AppUrl + '/ModelSelect',
				type: 'post',
				async: false,
				data: {
					parName: ['V_V_GUID'],
					parType: ['s'],
					parVal: [resp.list[0].V_EQUCODE],
					proName: 'PRO_GET_SAP_PM_EQU_P',
					cursorName: 'V_CURSOR'
				},
				traditional: true,
				success: function (resp) {
					$("#V_EQUSITE").html(resp.list[0].V_EQUSITENAME);//功能位置
				}
			});
		}
	});
	//工单信息
	$.ajax({
		url : AppUrl + '/ModelSelect',
		// url: "/No410701/PRO_PM_WORKORDER_DEFECT_CREATE",
		type : 'post',
		async : false,
		data : {
			parName : [ 'V_V_PERCODE', 'V_V_PERNAME','V_V_ORGCODE','V_V_DEPTCODE' ],
			parType : [ 's', 's', 's' , 's'],
			parVal : [ $.cookies.get('v_personcode'),
				$.cookies.get('v_personname'),
				$.url().param("V_ORGCODE"),
				$.url().param("V_DEPTCODE")
			],
			proName : 'PRO_PM_WORKORDER_DD_CREATE',
			cursorName : 'V_CURSOR'
		},
		traditional : true,
		success : function(resp) {
			if (resp.list != "" && resp.list != null) {
				//$("#V_ORGCODE").val(resp.list[0].V_ORGCODE);//工厂单位编码
				//$("#V_ORGNAME").html(resp.list[0].V_ORGNAME);//工厂单位名称
				//$("#V_DEPTCODE").val(resp.list[0].V_DEPTCODE);//作业区编码
				//$("#V_DEPTNAME").html(resp.list[0].V_DEPTNAME);//作业区名称
				//$("#V_EQUCODE").html(resp.list[0].V_EQUIP_NO);//设备编号
				//$("#V_EQUNAME").html(resp.list[0].V_EQUIP_NAME);//设备名称
				//$("#V_EQUSITE").html(resp.list[0].V_FUNC_LOC);//功能位置
				$("#ORDER_TYP").html(resp.list[0].V_ORDER_TYP);//工单类型
				$("#selType").empty();                         //类型描述
				$("<option value=\"" + resp.list[0].V_ORDER_TYP + "\">"+resp.list[0].V_ORDER_TYP_TXT + "</option>").appendTo("#selType");

				$("#V_ORDERID").html(resp.list[0].V_ORDERID);//工单号
				$("#V_DEFECTLIST").val(resp.list[0].V_SHORT_TXT);//工单描述


				$("#V_ORDERGUID").val(resp.list[0].V_ORDERGUID);
				$("#V_DEPTCODEREPARIR").val(resp.list[0].V_DEPTCODEREPARIR);

				$("#tool").val(resp.list[0].V_TOOL);//关键机具
				$("#tech").val(resp.list[0].V_TECHNOLOGY);//工艺技术要求
				$("#safe").val(resp.list[0].V_SAFE);//安全措施要求

			} else {
			}
		}
	});
}

function loadToolList() {
	$
		.ajax({
			url : AppUrl + '/ModelSelect',
			// url: "/No410701/PRO_PM_WORKORDER_DEFECT_CREATE",
			type : 'post',
			async : false,
			data : {
				parName : [ 'V_V_PERNAME', 'V_DEFECT_GUID' ],
				parType : [ 's', 's' ],
				parVal : [ $.cookies.get('v_personcode'),
					$.url().param("V_GUID") ],
				proName : 'PRO_PM_WORKORDER_DEFECT_CREATE',
				cursorName : 'V_CURSOR'
			},
			traditional : true,
			success : function(resp) {
				if (resp.list != "" && resp.list != null) {
					$("#tool").val(resp.list[0].V_TOOL);
				}
			}
		});
}
//类型描述
function loadTypelist(){
	$.ajax({
		url : AppUrl + '/ModelSelect',
		// url: "/No410701/PRO_PM_WORKORDER_TYP_VIEW",
		type : "post",
		async : false,
		data : {
			proName : 'PRO_PM_WORKORDER_TYP_VIEW',
			cursorName : 'V_CURSOR'
		},
		traditional : true,
		success : function(resp) {
			$.each(resp.list, function(index, item) {
				if (item.ORDER_TYP == $("#ORDER_TYP").text()) {
					$(
						"<option selected=\"selected\" value=\""
						+ item.ORDER_TYP + "\">"
						+ item.ORDER_TYP_TXT + "</option>")
						.appendTo("#selType");
				} else {
					$(
						"<option value=\"" + item.ORDER_TYP + "\">"
						+ item.ORDER_TYP_TXT + "</option>")
						.appendTo("#selType");
				}
			});
		}
	});
}
//检修单位
function loadPlantlist() {
	$.ajax({
		url : AppUrl + '/ModelSelect',
		// url: "/No410701/PRO_PM_REPAIRDEPT_VIEW",
		type : "post",
		async : false,
		data : {
			parName : [ 'V_V_DEPTCODE' ],
			parType : [ 's' ],
			parVal : [ $("#V_DEPTCODE").val() ],
			proName : 'PRO_PM_REPAIRDEPT_VIEW',
			cursorName : 'V_CURSOR'
		},
		traditional : true,
		success : function(resp) {
			$("#selPlant").empty();
			$.each(resp.list, function(index, item) {
				if (item.V_DEPTREPAIRCODE == $("#V_DEPTCODEREPARIR").val()) {
					$(
						"<option selected=\"selected\" value=\""
						+ item.V_DEPTREPAIRCODE + "\">"
						+ item.V_DEPTREPAIRNAME + "</option>")
						.appendTo("#selPlant");
				} else {
					$(
						"<option value=\"" + item.V_DEPTREPAIRCODE + "\">"
						+ item.V_DEPTREPAIRNAME + "</option>")
						.appendTo("#selPlant");
				}
			});
		}
	});
}

/**
 * 加载编辑任务的grid
 */
function loadTaskGrid(){
	$
		.ajax({
			url : AppUrl + '/ModelSelect',
			// url: "/No410701/PRO_PM_WORKORDER_ET_OPERATIONS",
			type : 'post',
			async : false,
			data : {
				parName : [ 'V_V_ORDERGUID' ],
				parType : [ 's' ],
				parVal : [ $("#V_ORDERGUID").val() ],
				proName : 'PRO_PM_WORKORDER_ET_OPERATIONS',
				cursorName : 'V_CURSOR'
			},
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
								"<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
						}
					} else {
						$("#TtableTaskTemplate").tmpl(resp.list).appendTo(
							"#TtableT tbody");
						var tool = document.getElementById('tool');
						tool.style.height = $("#TtableT").height()-28;

						var tech = document.getElementById('tech');
						tech.style.height = $("#TtableT").height()-28;

						var safe = document.getElementById('safe');
						safe.style.height = $("#TtableT").height()-28;
					}
					// $("#TtableTaskTemplate").tmpl(resp.list).appendTo("#TtableT
					// tbody");
				} else {
					$("#TtableT tbody").empty();
					for ( var i = 0; i < 3 ; i++) {
						$("#TtableT tbody")
							.append(
							"<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
					}
				}
			}
		});
}
//编辑任务细节
function OpenTask(){
	var ret = window.showModalDialog(
		'../../page/No41070101/Index.html?V_ORDERGUID='
		+ $("#V_ORDERGUID").val()
		+ '&V_DEPTREPAIRCODE=' + $("#selPlant").val()
		+ '', '41070101',
		'dialogHeight:500px;dialogWidth:800px');
//	window.showModalDialog('../../page/SecondPage/ThePage.html?../../page/No41070101/Index.html?V_ORDERGUID='
//			+ $("#V_ORDERGUID").val()
//			+ '&V_DEPTREPAIRCODE=' + $("#selPlant").val()
//			+ '', '',
//			'dialogHeight:500px;dialogWidth:800px');
	loadTaskGrid();
}

function OpenEditMat() {

	$.ajax({
		url : AppUrl + '/ModelSelect',
		// url: "/No41070102/PRO_PM_WORKORDER_ET_ACTIVITY",
		type : "post",
		async : false,
		data : {
			parName : [ 'V_V_ORDERGUID' ],
			parType : [ 's' ],
			parVal : [ $("#V_ORDERGUID").val() ],
			proName : 'PRO_PM_WORKORDER_ET_ACTIVITY',
			cursorName : 'V_CURSOR'
		},
		traditional : true,
		success : function(resp) {
			if (resp.list == "" || resp.list == null) {
				var ret = window.showModalDialog(
					'../../page/No41070102/Index.html?flag=delete&V_ORDERGUID='
					+ $("#V_ORDERGUID").val() + '', '41070102','_blank',
					'dialogHeight:' + window.screen.height
					+ 'px;dialogWidth:' + window.screen.width
					+ 'px');
			} else {
				//if (window.screen.width == '1024') {
				var ret = window.showModalDialog(
					'../../page/No41070102/Index.html?flag=all&V_ORDERGUID='
					+ $("#V_ORDERGUID").val() + '', '41070102','_blank',
				'dialogHeight:' + window.screen.height
					+ 'px;dialogWidth:' + window.screen.width
					+ 'px');
//				} else {
//					var ret = window.showModalDialog(
//							'../../page/No41070102/Index.html?V_ORDERGUID='
//									+ $("#V_ORDERGUID").val() + '', '41070102',
//							'dialogHeight:768px;dialogWidth:1024px');
//				}

			}
			loadMatList();
		}
	});
}


function OpenGJJJ() {
	var ret = window.showModalDialog(
		'../../page/No41070103/Index.html?V_ORDERGUID='
		+ $("#V_ORDERGUID").val() + '', '41070103',
		'dialogHeight:500px;dialogWidth:800px');

//			window.showModalDialog('../../page/SecondPage/ThePage.html?../../page/No41070103/Index.html?V_ORDERGUID='
//					+ $("#V_ORDERGUID").val() + '', '',
//					'dialogHeight:500px;dialogWidth:800px');
//			window.open('../../page/No41070103/Index.html?V_ORDERGUID='
//					+ $("#V_ORDERGUID").val() + '','','_blank','height:500px;width:800px;')

	loadToolList();
};
/*
 * 加载编辑物料信息+
 */
function loadMatList() {
	$.ajax({
		url : AppUrl + '/ModelSelect',
		// url: "/No41070102/PRO_PM_WORKORDER_SPARE_VIEW",
		type : 'post',
		data : {
			parName : [ 'V_V_ORDERGUID' ],
			parType : [ 's' ],
			parVal : [ $("#V_ORDERGUID").val() ],
			proName : 'PRO_PM_WORKORDER_SPARE_VIEW',
			cursorName : 'V_CURSOR'
		},
		traditional : true,
		success : function(resp) {
			if (resp.list != null && resp.list != "") {
				$("#TtableM tbody").empty();
				$.each(resp.list, function(index, item) {
					item["sid"] = index + 1;
				});
				$("#TtableMTemplate").tmpl(resp.list)
					.appendTo("#TtableM tbody");
			} else {
				$("#TtableM tbody").empty();
			}
		}
	});
}

function CreateBill() {
	var ss = $("#V_ORDERGUID").val();
	if ($("#V_DEFECTLIST").val() == '') {
		Ext.Msg.confirm('提示信息', '工单描述不能为空,请重新输入！');
	} else {
		if (!confirm("确定下达工单?")) {
			return false;
		} else {
			$.ajax({
				url : AppUrl + '/ModelChange',
				// url: '/No41070102/PRO_PM_WORKORDER_DEFECT_SAVE',
				type : 'post',
				data : {
					parName : [ 'V_V_PERNAME','V_V_PERNAME',
						'V_V_ORDERGUID', 'V_V_SHORT_TXT',' V_V_FUNC_LOC',
						'V_V_EQUIP_NO', 'V_V_EQUIP_NAME', 'V_D_START_DATE', 'V_D_FINISH_DATE',
						'V_V_WBS','V_V_WBS_TXT','V_V_DEPTCODEREPARIR', 'V_V_TOOL',
						'V_V_TECHNOLOGY' , 'V_V_SAFE'],
					parType : [ 's', 's','s', 's', 's','s', 's','dt', 'dt', 's', 's', 's',
						's', 's', 's' ],
					parVal : [ $.cookies.get('v_personcode'),
						decodeURI($.cookies.get('v_personname')),
						$("#V_ORDERGUID").val(),
						$("#V_DEFECTLIST").val(),
						$("#V_EQUSITE").html(),
						$("#V_EQUCODE").html(),
						$("#V_EQUNAME").html(),
						$("#planStartDate").val(),
						$("#planFinDate").val(),
						$("#wbsCode").val(),
						$("#wbsDesc").val(),
						$("#selPlant").val(),
						$("#tool").val(),
						$("#tech").val(),
						$("#safe").val()],
					proName : 'PRO_PM_WORKORDER_DD_SAVE',
					returnStr : 'V_CURSOR',
					returnStrType : 's'

				},
				traditional : true,

				error:function(xhr, status, error){
					alert('下达工单失败, 请联系管理员!');
					window.top.CloseWorkItem('410701');
				},
				beforeSend: function () {
					$('html').html("正在下达工单，请稍候。成功后跳转到打印工单。");

				},
				success : function(resp) {
					$.ajax({
						url : AppUrl + 'mm/SetMatService',
						type:'post',
						async:false,
						data:{
							V_V_ORDERGUID:ss
						},

						success:function(resp){
							//	var resp = Ext.JSON.decode(resp.responseText);
							if(resp=="1"){
								Ext.Ajax.request({
									url : AppUrl + '/ModelChange',
									async : false,
									method : 'POST',
									params : {
										parName : [ 'V_V_ORDERGUID', 'V_V_SEND_STATE' ],
										parType : [ 's', 's'],
										parVal : [ss,"成功"],
										proName : 'PRO_PM_WORKORDER_SEND_UPDATE',
										returnStr : ['V_CURSOR'],
										returnStrType : ['s']
									}
								});
							}else{
								Ext.Ajax.request({
									url : AppUrl + '/ModelChange',
									async : false,
									method : 'POST',
									params : {
										parName : [ 'V_V_ORDERGUID', 'V_V_SEND_STATE' ],
										parType : [ 's', 's'],
										parVal : [ss,"失败"],
										proName : 'PRO_PM_WORKORDER_SEND_UPDATE',
										returnStr : ['V_CURSOR'],
										returnStrType : ['s']
									}
								});
							}
						}
					});
					location.href = "../../page/No411002/Index_aq.html?V_GUID="+ss+"";

					if (window.top.frames['Workspace4107'] == null) {
						//window.top.CloseWorkItem('410701');
					} else {
						window.top.frames['Workspace4107'].closeAfterRefresh();
						//window.top.CloseWorkItem('410701');
					}
				}
			});
		}
	}
}

function GetModel() {//获取模型
	var ret = window.showModalDialog(
		'../../page/No41070106/Index.html?V_EQUIP_NO='
		+ $("#V_EQUCODE").html() + '&V_ORDERGUID='
		+ $('#V_ORDERGUID').val() + '&V_DEPTREPAIRCODE='+$("#selPlant").val()+'', '',
		'dialogHeight:500px;dialogWidth:800px');

	loadToolAndTxtList();
	loadTaskGrid();
	loadMatList();
}
function Getjxzy() {//关联检修标准
    if ($("#V_EQUCODE").val() == '') {
        alert('请选择设备！');
        return;
    }
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_0901/index_jx.html?V_GUID=' + $("#V_ORDERGUID").val() + '&V_ORGCODE=' +
        $("#V_ORGCODE").val() + '&V_DEPTCODE=' + $("#V_DEPTCODE").val() + '&V_EQUTYPE=' + '&V_EQUCODE=' +
        $("#V_EQUCODE").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');


}

function loadToolAndTxtList() {

	$.ajax({
		url : AppUrl + '/ModelSelect',
		type: 'post',
		async: false,
		data : {
			parName : [ 'V_V_PERNAME', 'V_DEFECT_GUID' ],
			parType : [ 's', 's' ],
			parVal : [ $.cookies.get('v_personcode'),
				$.url().param("V_GUID") ],
			proName : 'PRO_PM_WORKORDER_DEFECT_CREATE',
			cursorName : 'V_CURSOR'
		},
		dataType: "json",
		traditional: true,
		success: function (resp) {
			if (resp.list != "" && resp.list != null) {
//                $("#tool").val(resp.list[0].V_TOOL);
//                $("#V_SHORT_TXT").val(resp.list[0].V_SHORT_TXT);
//                
//                $("#tech").val(resp.list[0].V_TECHNOLOGY);
//                $("#safe").val(resp.list[0].V_SAFE);

				if(resp.list[0].V_TOOL==""){$("#tool").val("");}else{$("#tool").val(resp.list[0].V_TOOL);}

				if(resp.list[0].V_SHORT_TXT==""){$("#V_SHORT_TXT").val("");}else{$("#V_SHORT_TXT").val(resp.list[0].V_SHORT_TXT);}
				if(resp.list[0].V_TECHNOLOGY==""){$("#tech").val("");}else{$("#tech").val(resp.list[0].V_TECHNOLOGY);}
				if(resp.list[0].V_SAFE==""){$("#safe").val("");}else{$("#safe").val(resp.list[0].V_SAFE);}
			} else { }
		}
	});

}

function NowDate_b(id) {
	var d, s;
	d = new Date();
	var year = d.getFullYear().toString();
	var month = (d.getMonth() + 1).toString();
	var date = d.getDate().toString();
	var hou = d.getHours().toString();
	var min = d.getMinutes().toString();
	var sen = d.getSeconds().toString();
	//s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " " + dateFomate(hou) + ":" + dateFomate(min) + ":" + dateFomate(sen);
	s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " 08:30:00" ;

	//try { $("#" + id + "").html(s); } catch (e) { $("#" + id + "").val(s); }
	$("#" + id + "").val(s);
}
function NowDate_e(id) {
	var d, s;
	d = new Date();
	var year = d.getFullYear().toString();
	var month = (d.getMonth() + 1).toString();
	var date = d.getDate().toString();
	var hou = d.getHours().toString();
	var min = d.getMinutes().toString();
	var sen = d.getSeconds().toString();
	//s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " " + dateFomate(hou) + ":" + dateFomate(min) + ":" + dateFomate(sen);
	s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " 16:30:00" ;

	//try { $("#" + id + "").html(s); } catch (e) { $("#" + id + "").val(s); }
	$("#" + id + "").val(s);
}
function NowDate2(id) {
	var d, s;
	d = new Date();
	var year = d.getFullYear().toString();
	var month = (d.getMonth() + 1).toString();
	var date = d.getDate().toString();
	var hou = d.getHours().toString();
	var min = d.getMinutes().toString();
	var sen = d.getSeconds().toString();
	//s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " " + dateFomate(hou) + ":" + dateFomate(min) + ":" + dateFomate(sen);
	s = year + "-" + dateFomate(month) + "-" + dateFomate(date) ;
	// try { $("#" + id + "").html(s); } catch (e) { $("#" + id + "").val(s); }
	$("#" + id + "").html(s);
}

function dateFomate(val){
	if(parseInt(val) <=9){
		return "0"+val;
	}else{
		return val;
	}
}

function bindDate(fid) {
	var dt1 = $("#" + fid);
	dt1.datetimepicker({
		monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
		monthNamesShort: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
		dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
		dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
		dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
		showSecond: false,
		dateFormat: 'yy-mm-dd',
		timeFormat: 'hh:mm:ss',
		stepMinute: 30,
		controlType:'select'
	});
}

//添加暂时保存
function SaveOrder(){
	$.ajax({
		url : AppUrl + '/ModelChange',
		type: 'post',
		async: false,
		data : {
			parName : [ 'V_V_PERCODE', 'V_V_PERNAME', 'V_V_ORDERGUID', 'V_V_SHORT_TXT', 'V_D_START_DATE', 'V_D_FINISH_DATE', 'V_V_DEPTCODEREPARIR', 'V_V_TOOL', 'V_V_TECHNOLOGY', 'V_V_SAFE' ],
			parType : [ 's', 's' , 's' , 's' , 'dt' , 'dt' , 's' , 's' , 's' , 's' ],
			parVal : [ $.cookies.get('v_personcode'),$.cookies.get('v_personname2'),
				$('#V_ORDERGUID').val() , $('#V_DEFECTLIST').val(), $('#planStartDate').val(), $('#planFinDate').val(), $('#V_DEPTCODEREPARIR').val(), $('#tool').val(), $('#tech').val(), $('#safe').val()],
			proName : 'PRO_PM_WORKORDER_EDIT_XD',

			returnStr : ['V_CURSOR'],
			returnStrType : ['s']
		},
		dataType: "json",
		traditional: true,
		success: function (resp) {
			alert(resp);
		}
	});
}

function OnStamp(){
	var sel = [];
	sel.push($('#V_ORDERGUID').val());
	window.showModalDialog(AppUrl + "/No410101/Index.html", sel,"dialogHeight:700px;dialogWidth:1100px");
}