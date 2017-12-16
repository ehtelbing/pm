var orderid;

if (location.href.split('?')[1] != undefined) {

	orderid = Ext.urlDecode(location.href.split('?')[1]).orderid;

}
$(function() {
	LoadSelect();
});
function LoadSelect() {
	// 只读数据
	$.ajax({
		url : APP + '/ModelSelect',
		type : 'post',
		async : false,
		data : {
			parName : [ 'a_orderid' ],
			parType : [ 's' ],
			parVal : [ orderid ],
			proName : 'pg_dj603.getmendbilldetail',
			cursorName : 'ret'
		},
		dataType : "json",
		traditional : true,
		success : function(resp) {
			  $("#dj_name").html(resp.list[0].DJ_NAME);
			  $("#amount").html(resp.list[0].AMOUNT);
			  $("#dj_type").html(resp.list[0].DJ_TYPE);
			  $("#dj_vol").html(resp.list[0]. DJ_VOL);
			  $("#dj_v").html(resp.list[0].DJ_V);
			  $("#piccode").html(resp.list[0].PICCODE);
			  $("#op_person").html(resp.list[0].OP_PERSON);
			  $("#mend_context").html(resp.list[0].MEND_CONTEXT);
			  
			  $("#use_loc").html(resp.list[0].USE_LOC);
			  $("#req_time").html(resp.list[0].REQ_TIME);
			  $("#plan_time").html(resp.list[0].PLAN_TIME);
			  $("#build_remark").html(resp.list[0].BUILD_REMARK);
			  $("#check_log").html(resp.list[0].CHECK_LOG);//
			  $("#phone_number").html(resp.list[0].PHONE_NUMBER);
			 $("#orderid").html(resp.list[0].ORDERID);
			$("#insertdate").html(resp.list[0].INSERTDATE);//
			 $("#menddept_name").html(resp.list[0].APPLY_PLANTNAME);//
			 
		}
	});

}

function DefaultPrintSettings() {
	LODOP = getLodop(document.getElementById('LODOP'), document
			.getElementById('LODOP_EM'));
	LODOP.SET_LICENSES("鞍山市新安杰系统集成有限公司", "559677661718684777294958093190", "",
			"");

	LODOP.PRINT_INIT("gongdan");
	var strBodyStyle = "<style>"
			+ document.getElementById('stylePrint').innerHTML + "</style>";

	LODOP.SET_PRINT_PAGESIZE(1, 2400, 0, 'A4 横向');

	var strFormHtml = strBodyStyle +"<body>"+ document.getElementById('main').innerHTML+"</body>";
	LODOP.ADD_PRINT_HTM("5", "5", "100%", "100%", strFormHtml);
	LODOP.NewPage();
}

function dataPrint() {
	DefaultPrintSettings();
	LODOP.PRINT();
}
function Preview() {
	DefaultPrintSettings();
	LODOP.PREVIEW();
}
