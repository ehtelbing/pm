if (location.href.split('?')[1] != undefined) {
	var name=Ext.urlDecode(location.href.split('?')[1]).name;
	var begindate=Ext.urlDecode(location.href.split('?')[1]).begindate;
	var enddate=Ext.urlDecode(location.href.split('?')[1]).enddate;
	var itype=Ext.urlDecode(location.href.split('?')[1]).itype;
	var itype=itype.replace('@',"%")

}
$(function() {
	LoadSelect();
});
function LoadSelect() {
	$('#tbody').empty();
	$.ajax({
		url : APP + '/ModelSelect',
		type : 'post',
		async : false,
		data : {
			parName : [ 'a_begindate', 'a_enddate', 'a_itype', 'a_name' ],
			parType : [ 'da', 'da', 's', 's' ],
			parVal : [ begindate, enddate, itype, name ],
			proName : 'pg_dj1007.getapplymat',
			cursorName : 'ret'
		},
		dataType : "json",
		traditional : true,
		success : function(resp) {
			for ( var i = 0; i < resp.list.length; i++) {
				var htmlArr = [];
				htmlArr.push('<tr id=' + resp.list[i].APPLYID + '>');
				htmlArr.push('<td style="text-align: left">'
						+ isNull(resp.list[i].APPLY_DATE) + '</td>');
				htmlArr.push('<td style="text-align: left">'
						+ isNull(resp.list[i].MATERIALNAME) + '</td>');
				htmlArr.push('<td style="text-align: center">'
						+ isNull(resp.list[i].ETALON) + '</td>');
				htmlArr.push('<td style="text-align: center">'
						+ isNull(resp.list[i].UNIT) + '</td>');
				htmlArr.push('<td style="text-align: left">'
						+ isNull(resp.list[i].AMOUNT) + '</td>');
				htmlArr.push('<td style="text-align: left">'
						+ isNull(resp.list[i].GROUPNAME) + '</td>');
				htmlArr.push('<td style="text-align: center">'
						+ isNull(resp.list[i].REMARK) + '</td>');
				htmlArr.push('</tr>');
				var htmlStr = htmlArr.join('');
				$('#tbody').append(htmlStr);
			}
		}
	});

}
function isNull(value) {
	if (value == null || value == "null") {
		return "";
	} else {
		return value;
	}
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

	var strFormHtml = strBodyStyle + "<body>"
			+ document.getElementById('main').innerHTML + "</body>";
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
