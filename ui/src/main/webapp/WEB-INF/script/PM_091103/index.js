var selectID=[];
$(function () {
	bindDate("D_FACT_START_DATE");
	bindDate("D_FACT_FINISH_DATE");

	bindDate("D_DATE_ACP");

	//bindDate("D_ENTER_DATE");//创建时间
	//NowDate2("D_ENTER_DATE");

	NowDate_b("D_FACT_START_DATE");
	NowDate_e("D_FACT_FINISH_DATE");

	NowDate_e("D_DATE_ACP");

	loadPageInfo();
	loadTaskGrid();
	GetBillMatByOrder();

	$("#btnTask").click(function () {
		ReturnIsToTask();
	});
});


function ReturnIsToTask() {
	$.ajax({
		url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_ACTIVITY',
		type : "post",
		async : false,
		data : {
			V_V_ORDERGUID:$("#V_ORDERGUID").val()
		},
		dataType : "json",
		traditional : true,
		success : function(resp) {
			if (resp.list == "" || resp.list == null) {
				alert("请先添加工序");
			} else {
				var owidth = window.document.body.offsetWidth - 200;
				var oheight = window.document.body.offsetHeight - 100;
				var ret = window.open(AppUrl +'page/PM_091104/index.html?V_ORDERGUID='+ $("#V_ORDERGUID").val()+'&V_DEPTCODEREPARIR='+$("#V_DEPTCODEREPARIR").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
				loadTaskGrid();
			}
		}
	});
}

function loadPageInfo() {
	$.ajax({
		url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_ET_DEFAULE',
		type : 'post',
		async : false,
		data : {
			V_V_ORDERGUID:$.url().param("V_GUID")
		},
		dataType : "json",
		traditional : true,
		success : function(resp) {
		}
	});


	$.ajax({
		url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_GET',
		type: 'post',
		async: false,
		data: {
			V_V_ORDERGUID:$.url().param("V_GUID")
		},
		dataType: "json",
		traditional: true,
		success: function (resp) {
			if (resp.list != "" && resp.list != null) {
				$("#V_ORGCODE").val(resp.list[0].V_ORGCODE);
				$("#V_ORGNAME").html(resp.list[0].V_ORGNAME);
				$("#V_DEPTCODE").val(resp.list[0].V_DEPTCODE);
				$("#V_EQUIP_NAME").val(resp.list[0].V_EQUIP_NAME);
				$("#V_EQUIP_NO").val(resp.list[0].V_EQUIP_NO);
				$("#V_FUNC_LOC").val(resp.list[0].V_FUNC_LOC);
				$("#V_EQUSITENAME").html(resp.list[0].V_EQUSITENAME);
				$("#V_ORDER_TYP").html(resp.list[0].V_ORDER_TYP);
				$("#V_DEPTNAME").html(resp.list[0].V_DEPTNAME);
				$("#V_ORDERGUID").val(resp.list[0].V_ORDERGUID);
				$("#V_DEPTNAMEREPARIR").html(resp.list[0].V_DEPTNAMEREPARIR);

				$("#V_ORDER_TYP_TXT").html(resp.list[0].V_ORDER_TYP_TXT);

				$("#D_START_DATE").html(resp.list[0].D_START_DATE);
				$("#D_FINISH_DATE").html(resp.list[0].D_FINISH_DATE);
				if(resp.list[0].D_FACT_START_DATE!="")
				{
					$("#D_FACT_START_DATE").val(resp.list[0].D_FACT_START_DATE);
				}
				else
				{
					$("#D_FACT_START_DATE").val(resp.list[0].D_START_DATE);
				}
				if(resp.list[0].D_FACT_FINISH_DATE!=""){
					$("#D_FACT_FINISH_DATE").val(resp.list[0].D_FACT_FINISH_DATE);
				}else
				{
					$("#D_FACT_FINISH_DATE").val(resp.list[0].D_FINISH_DATE);
				}
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


				$("#tool").val(resp.list[0].V_TOOL);
				$("#tech").html(resp.list[0].V_TECHNOLOGY);
				$("#safe").html(resp.list[0].V_SAFE);

				if(resp.list[0].D_DATE_ACP!=""){
					$("#D_DATE_ACP").val(resp.list[0].D_DATE_ACP);
				}else
// {$("#D_DATE_ACP").val(resp.list[0].D_FINISH_DATE);}
				{$("#D_DATE_ACP").val("");}
				$("#V_POSTMANSIGN").val(resp.list[0].V_POSTMANSIGN);
				$("#V_CHECKMANCONTENT").val(resp.list[0].V_CHECKMANCONTENT);
				if(resp.list[0].V_CHECKMANSIGN!=""){
					$("#V_CHECKMANSIGN").val(resp.list[0].V_CHECKMANSIGN);
				}else{
// $("#V_CHECKMANSIGN").val(Ext.util.Cookies.get("v_personname2"));
					$("#V_CHECKMANSIGN").val("");
				}

				$("#V_WORKSHOPCONTENT").val(resp.list[0].V_WORKSHOPCONTENT);
				$("#V_WORKSHOPSIGN").html(resp.list[0].V_WORKSHOPSIGN);
				$("#V_DEPTSIGN").val(resp.list[0].V_DEPTSIGN);

				$("#I_OTHERHOUR").val(resp.list[0].I_OTHERHOUR);
				$("#V_OTHERREASON").val(resp.list[0].V_OTHERREASON);
				$("#V_REPAIRCONTENT").val(resp.list[0].V_REPAIRCONTENT);

				$("#V_REPAIRSIGN").val(resp.list[0].V_REPAIRSIGN);
				$("#V_REPAIRPERSON").val(resp.list[0].V_REPAIRPERSON);

			} else { }
		}
	});
}


/**
 * 加载编辑任务的grid
 */
function loadTaskGrid() {
	$.ajax({
		url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_OPERATIONS',
		type : 'post',
		async : false,
		data : {
			V_V_ORDERGUID:$.url().param("V_GUID")
		},
		dataType : "json",
		traditional : true,
		success : function(resp) {
			if (resp.list != "" && resp.list != null) {
				$("#TtableT tbody").empty();
				if (resp.list.length < 3) {
					$("#TtableTaskTemplate").tmpl(resp.list).appendTo("#TtableT tbody");
					for (var i = 0; i < 3 - resp.list.length; i++) {
						$("#TtableT tbody").append("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
					}
				} else {
					$("#TtableTaskTemplate").tmpl(resp.list).appendTo("#TtableT tbody");
				}
			} else {
				$("#TtableT tbody").empty();
				for (var i = 0; i < 3; i++) {
					$("#TtableT tbody").append("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
				}
			}
		}
	});
}

function ConfirmAccept() {

	if($("#V_EQUIP_NO").val()!=""){
		if($("#D_DATE_ACP").val() == "" || $("#D_DATE_ACP").val() == null){
			alert('请填写验收日期');
			return false;
		}
		if ($("#V_REPAIRSIGN").val() == "这个判断不执行" ) {
			alert("请先填写检修方签字!");
		} else {
			if (!confirm("是否验收工单")) { return false; } else {
				FinBack();
				$.ajax({
					url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_EDIT',
					type : 'post',
					async : false,
					data : {
						'V_V_PERCODE':$.cookies.get('v_personcode'),
						'V_V_PERNAME': Ext.util.Cookies.get("v_personname2"),
						'V_V_ORDERGUID':$("#V_ORDERGUID").val(),
						'V_V_SHORT_TXT':$("#V_SHORT_TXT").val(),
						'V_':$("#V_FUNC_LOC").val(),
						'V_V_EQUIP_NO':$("#V_EQUIP_NO").val(),
						'V_V_EQUIP_NAME':$("#V_EQUIP_NAME").val(),
						'V_D_FACT_START_DATE':$("#D_FACT_START_DATE").val(),
						'V_D_FACT_FINISH_DATE': $("#D_FACT_FINISH_DATE").val(),
						'V_V_WBS':"",
						'V_V_WBS_TXT':"",
						'V_V_DEPTCODEREPARIR':$("#V_DEPTNAMEREPARIR").val(),//$("#selPlant").val(),
						'V_V_TOOL':$("#tool").text()==""?" ":$("#tool").text(),
						'V_V_TECHNOLOGY':' ',
						'V_V_SAFE':' ',
						'V_D_DATE_ACP':$("#D_DATE_ACP").val(),
						'V_I_OTHERHOUR': $("#I_OTHERHOUR").val(),
						'V_V_OTHERREASON': $("#V_OTHERREASON").val(),
						'V_V_REPAIRCONTENT': $("#V_REPAIRCONTENT").val(),
						'V_V_REPAIRSIGN':$("#V_REPAIRSIGN").val(),
						'V_V_REPAIRPERSON':$("#V_REPAIRPERSON").val(),
						'V_V_POSTMANSIGN': $("#V_POSTMANSIGN").val(),
						'V_V_CHECKMANCONTENT': $("#V_CHECKMANCONTENT").val(),
						'V_V_CHECKMANSIGN':Ext.util.Cookies.get("v_personname2"),
						'V_V_WORKSHOPCONTENT':$("#V_WORKSHOPCONTENT").val(),
						'V_V_WORKSHOPSIGN':$("#V_WORKSHOPSIGN").html(),
						'V_V_DEPTSIGN': $("#V_DEPTSIGN").val()
					},
					dataType : "json",
					traditional : true,
					success : function(resp) {
						//alert(resp);
					}
				});
				$.ajax({
					url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_YS',
					type: 'post',
					async: false,
					data: {
						/*
						 * V_V_PERCODE IN VARCHAR2, --人员编码 V_V_PERNAME IN VARCHAR2,
						 * --人员名称 V_V_ORDERGUID IN VARCHAR2, --工单GUID V_V_POSTMANSIGN IN
						 * VARCHAR2, --岗位签字 V_V_CHECKMANCONTENT IN VARCHAR2, -- 点检员验收意见
						 * V_V_CHECKMANSIGN IN VARCHAR2, -- 点检员签字 V_V_WORKSHOPCONTENT IN
						 * VARCHAR2, -- 作业区验收 V_V_WORKSHOPSIGN IN VARCHAR2, --
						 * 作业区签字/库管员签字 V_V_DEPTSIGN IN VARCHAR2, -- 部门签字 V_V_EQUIP_NO IN
						 * VARCHAR2, --设备编码
						 */
						'V_V_PERCODE':$.cookies.get('v_personcode'),
						'V_V_PERNAME': Ext.util.Cookies.get("v_personname2"),
						'V_V_ORDERGUID':$("#V_ORDERGUID").val(),
						'V_V_POSTMANSIGN':$("#V_POSTMANSIGN").val(),
						'V_V_CHECKMANCONTENT':$("#V_CHECKMANCONTENT").val(),
						'V_V_CHECKMANSIGN':$("#V_CHECKMANSIGN").val(),
						'V_V_WORKSHOPCONTENT': $("#V_WORKSHOPCONTENT").val(),
						'V_V_WORKSHOPSIGN': $("#V_WORKSHOPSIGN").html(),
						'V_V_DEPTSIGN': $("#V_DEPTSIGN").val(),
						'V_V_EQUIP_NO': $("#V_EQUIP_NO").val()
					},
					dataType: "json",
					traditional: true,
					success: function (resp) {
						// 聚进接口
						otherServer($("#V_ORDERGUID").val(),"CLOSE","成功");
						// 小神探接口
						xstServer($("#V_ORDERGUID").val(),"CLOSE","成功");
						Ext.Msg.alert('提示','验收工单成功');
						window.opener.queryGrid();
						window.close();
					},
					error: function(response, opts) {
						Ext.Msg.alert('提示','验收工单失败,请联系管理员');
					}
				});
			}
		}
	}else{
		Ext.Msg.alert("消息","请选择设备名称")
	}

}


/*$("#V_EQUIP_NAME").live("click",function () {
	var owidth = window.document.body.offsetWidth - 200;
	var oheight = window.document.body.offsetHeight - 100;
	var ret = window.open(AppUrl +'page/PM_070205/index.html?V_ORDERGUID='+ $("#V_ORDERGUID").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
	//var ret = window.showModalDialog('../../page/No410601/Index.html?DEPTCODE=' + $("#V_DEPTCODE").val() + '', '', 'dialogHeight:500px;dialogWidth:800px');
	if (ret != "" && ret != null) {
		var str = [];
		str = ret.split('^');
		$("#V_EQUIP_NAME").val(str[1]);
		$("#V_EQUIP_NO").val(str[0]);
		$("#V_FUNC_LOC").val(str[2]);
		$("#V_EQUSITENAME").val(str[3]);
	}
});*/

function print() {


	$.ajax({
		url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_EDIT',
		type : 'post',
		async : false,
		data : {

			V_V_PERCODE:$.cookies.get('v_personcode'),
			V_V_PERNAME:Ext.util.Cookies.get("v_personname2"),
			V_V_ORDERGUID:$("#V_ORDERGUID").val(),
			V_V_SHORT_TXT:$("#V_SHORT_TXT").val(),
			V_V_FUNC_LOC:$("#V_FUNC_LOC").html(),

			V_V_EQUIP_NO:$("#V_EQUIP_NO").html(),
			V_V_EQUIP_NAME:$("#V_EQUIP_NAME").html(),
			V_D_FACT_START_DATE:$("#D_FACT_START_DATE").val(),
			V_D_FACT_FINISH_DATE:$("#D_FACT_FINISH_DATE").val(),
			V_V_WBS:'',

			V_V_WBS_TXT:'',
			V_V_DEPTCODEREPARIR:$("#selPlant").html(),
			V_V_TOOL:' ',
			V_V_TECHNOLOGY:$("#tech").html(),
			V_V_SAFE:$("#safe").html(),

			V_D_DATE_ACP:$("#D_DATE_ACP").val(),
			V_I_OTHERHOUR:$("#I_OTHERHOUR").val(),
			V_V_OTHERREASON:$("#V_OTHERREASON").val(),
			V_V_REPAIRCONTENT:$("#V_REPAIRCONTENT").val(),
			V_V_REPAIRSIGN:$("#V_REPAIRSIGN").val(),


			V_V_REPAIRPERSON:$("#V_REPAIRPERSON").val(),
			V_V_POSTMANSIGN:$("#V_POSTMANSIGN").val(),
			V_V_CHECKMANCONTENT:$("#V_CHECKMANCONTENT").val(),
			V_V_CHECKMANSIGN:$("#V_CHECKMANSIGN").val(),
			V_V_WORKSHOPCONTENT:$("#V_WORKSHOPCONTENT").val(),

			V_V_WORKSHOPSIGN:$("#V_WORKSHOPSIGN").html(),
			V_V_DEPTSIGN:$("#V_DEPTSIGN").val()

		},
		dataType : "json",
		traditional : true,
		success : function(resp) {
			//alert(resp[0]);
		}
	});



	selectID.push($("#V_ORDERGUID").val());
	window.open(AppUrl + "page/No410101/Index.html", selectID,
		"dialogHeight:700px;dialogWidth:1100px");
}
function onClickSave(){
	if($("#D_FACT_START_DATE").val()==""){
		alert('请输入完成开始时间');
		return;
	}
	if($("#D_FACT_FINISH_DATE").val()==""){
		alert('请输入完成结束时间');
		return;
	}
	$.ajax({
		url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_EDIT',
		type : 'post',
		async : false,
		data : {

			V_V_PERCODE:$.cookies.get('v_personcode'),
			V_V_PERNAME:Ext.util.Cookies.get("v_personname2"),
			V_V_ORDERGUID:$("#V_ORDERGUID").val(),
			V_V_SHORT_TXT:$("#V_SHORT_TXT").val(),
			V_V_FUNC_LOC:$("#V_FUNC_LOC").html(),

			V_V_EQUIP_NO:$("#V_EQUIP_NO").html(),
			V_V_EQUIP_NAME:$("#V_EQUIP_NAME").html(),
			V_D_FACT_START_DATE:$("#D_FACT_START_DATE").val(),
			V_D_FACT_FINISH_DATE:$("#D_FACT_FINISH_DATE").val(),
			V_V_WBS:'',

			V_V_WBS_TXT:'',
			V_V_DEPTCODEREPARIR:$("#selPlant").html(),
			V_V_TOOL:' ',

			V_V_TECHNOLOGY:' ',
			V_V_SAFE:' ',

			V_D_DATE_ACP:$("#D_DATE_ACP").val(),
			V_I_OTHERHOUR:$("#I_OTHERHOUR").val(),
			V_V_OTHERREASON:$("#V_OTHERREASON").val(),
			V_V_REPAIRCONTENT:$("#V_REPAIRCONTENT").val(),
			V_V_REPAIRSIGN:$("#V_REPAIRSIGN").val(),


			V_V_REPAIRPERSON:$("#V_REPAIRPERSON").val(),
			V_V_POSTMANSIGN:$("#V_POSTMANSIGN").val(),
			V_V_CHECKMANCONTENT:$("#V_CHECKMANCONTENT").val(),
			V_V_CHECKMANSIGN:$("#V_CHECKMANSIGN").val(),
			V_V_WORKSHOPCONTENT:$("#V_WORKSHOPCONTENT").val(),

			V_V_WORKSHOPSIGN:$("#V_WORKSHOPSIGN").html(),
			V_V_DEPTSIGN:$("#V_DEPTSIGN").val()

		},
		dataType : "json",
		traditional : true,
		success : function(resp) {

			alert(resp.V_INFO);
		}
	});
}
function OnBtnHistoryClicked(){
	var ret=window.open(AppUrl+'page/No41030101/Index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val(), '', 'dialogHeight:500px;dialogWidth:800px');
	if(ret != "" && ret != null){
		var str=[];
		str = ret.split('^');
		$("#I_OTHERHOUR").val(str[0]);
		$("#V_OTHERREASON").val(str[1]);
		$("#V_REPAIRCONTENT").val(str[2]);
		$("#V_REPAIRSIGN").val(str[3]);
		$("#V_REPAIRPERSON").val(str[4]);
		$("#V_POSTMANSIGN").val(str[5]);
		$("#V_CHECKMANCONTENT").val(str[6]);
		$("#V_CHECKMANSIGN").val(str[7]);
		$("#V_WORKSHOPCONTENT").val(str[8]);
		$("#V_WORKSHOPSIGN").html(str[9]);
		$("#V_DEPTSIGN").val(str[10]);
	}
}
function OnClickJJButton() {
	window.open(AppUrl+'page/PM_070204/index.html?V_ORDERGUID='
		+ $("#V_ORDERGUID").val()
		+ '&V_DEPTREPAIRCODE=' + $("#V_DEPTCODE").html()
		+ '', '41070101',
		'dialogHeight:500px;dialogWidth:800px');
	loadTaskGrid();
}
//生成模型
function CreateModel() {
	var owidth = window.document.body.offsetWidth - 200;
	var oheight = window.document.body.offsetHeight - 100;
	var ret = window.open(AppUrl +'page/PM_091105/index.html?V_ORDERGUID='+ $("#V_ORDERGUID").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}

function OnBtnLookClicked() {
	var owidth = window.document.body.offsetWidth - 200;
	var oheight = window.document.body.offsetHeight - 100;
	var ret = window.open(AppUrl +'page/PM_091107/index.html?V_ORDERGUID='+ $("#V_ORDERGUID").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
	GetBillMatByOrder();
}


function loadGJJJ() {
	$.ajax({
		url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_GET',
		type: 'post',
		async: false,
		data: {
			V_V_ORDERGUID: $.url().param("V_GUID")
		},
		dataType: "json",
		traditional: true,
		success: function (resp) {
			if (resp.list != "" && resp.list != null) {
				$("#tool").val(resp.list[0].V_TOOL);
			}else{ }
		}
	});
}

function FinBack() {
	$.ajax({
		url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_FK',
		type : 'post',
		async : false,
		data : {
			'V_V_PERCODE':$.cookies.get('v_personcode'),
			'V_V_PERNAME':Ext.util.Cookies.get("v_personname2"),
			'V_V_ORDERGUID': $("#V_ORDERGUID").val(),
			'V_D_FACT_START_DATE': $("#D_FACT_START_DATE").val(),
			'V_D_FACT_FINISH_DATE':$("#D_FACT_FINISH_DATE").val(),
			'V_I_OTHERHOUR':$("#I_OTHERHOUR").val(),
			'V_V_OTHERREASON': $("#V_OTHERREASON").val(),
			'V_V_REPAIRCONTENT':$("#V_REPAIRCONTENT").val(),
			'V_V_REPAIRSIGN':$("#V_REPAIRSIGN").val(),
			'V_V_REPAIRPERSON':$("#V_REPAIRPERSON").val(),
			'V_V_TOOL': $("#tool").text()==""?" ":$("#tool").text()
		},
		dataType : "json",
		traditional : true,
		success : function(resp) {
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
	// s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " " +
	// dateFomate(hou) + ":" + dateFomate(min) + ":" + dateFomate(sen);
	s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " 08:30:00" ;

	// try { $("#" + id + "").html(s); } catch (e) { $("#" + id + "").val(s); }
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
	// s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " " +
	// dateFomate(hou) + ":" + dateFomate(min) + ":" + dateFomate(sen);
	s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " 16:30:00" ;

	// try { $("#" + id + "").html(s); } catch (e) { $("#" + id + "").val(s); }
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
	// s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " " +
	// dateFomate(hou) + ":" + dateFomate(min) + ":" + dateFomate(sen);
	s = year + "-" + dateFomate(month) + "-" + dateFomate(date) ;
	// try { $("#" + id + "").html(s); } catch (e) { $("#" + id + "").val(s); }
	$("#" + id + "").html(s);
}

function dateFomate(val){
	if(parseInt(val) <=9){
		return "0"+val;
	}
	return val;

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

$("#I_OTHERHOUR").live(
	"keypress",
	function(event) {
		if (((event.which < 48 || event.which > 57) && event.which != 46)
			&& event.which != 8) {
			return false;
		}
	});

$(".numlimit").live(
	"keypress",
	function(event) {
		if (((event.which < 48 || event.which > 57) && event.which != 46)
			&& event.which != 8) {
			return false;
		}
	});

function GetBillMatByOrder() {
	Ext.Ajax.request({
		url: AppUrl + 'zdh/PRO_PM_WORKORDER_SPARE_VIEW',
		type: 'post',
		params: {
			V_V_ORDERGUID: $.url().param("V_GUID")// $("#V_ORDERGUID").val()
		},
		success: function (ret) {
			var resp = Ext.JSON.decode(ret.responseText);
			if (resp.list != null && resp.list != "") {
				$("#TtableM tbody").empty();
				$.each(resp.list, function (index, item) {
					item["sid"] = index + 1;
				});
				$("#TtableMTemplate").tmpl(resp.list).appendTo("#TtableM tbody");
			} else {
				$("#TtableM tbody").empty();
			}
		}
	});
}
