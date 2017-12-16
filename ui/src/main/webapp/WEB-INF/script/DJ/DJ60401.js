if (location.href.split('?')[1] != undefined) {
	var djlx=Ext.urlDecode(location.href.split('?')[1]).djlx;
	var djlx=djlx.replace('@',"%");
	var begindate=Ext.urlDecode(location.href.split('?')[1]).begindate;
	var enddate=Ext.urlDecode(location.href.split('?')[1]).enddate;
	var zybh=Ext.urlDecode(location.href.split('?')[1]).zybh;
	var zybh=zybh.replace('@',"%");
	var sxdw=Ext.urlDecode(location.href.split('?')[1]).sxdw;
	var sxdw=sxdw.replace('@',"%");
	var jxdw=Ext.urlDecode(location.href.split('?')[1]).jxdw;
	var jxdw=jxdw.replace('@',"%");
	var jxbm=Ext.urlDecode(location.href.split('?')[1]).jxbm;
	var jxbm=jxbm.replace('@',"%");
	var jxbz=Ext.urlDecode(location.href.split('?')[1]).jxbz;
	var jxbz=jxbz.replace('@',"%");

}
$(function() {
	LoadSelect();
});
function LoadSelect() {
	$('#tbody').empty();
	var test=Ext.util.Cookies.get('test');
    //document.getElementById('title').innerHtml='电机维修（'+Ext.Date.format(begindate, 'Y年m月d日')+'-'+Ext.Date.format(enddate, 'Y年m月d日')+'）台帐';
	$.ajax({
		url : APP + '/ModelSelect',
		type : 'post',
		async : false,
		data : {
			parName : [ 'a_datetype', 
                        'a_begindate',
                        'a_enddate',
                        'a_dj_series_class',
                        'a_orderid', 
                        'a_sendplant', 
                        'a_plant',
                        'a_dept',
                        'a_group'],
			parType : [ 's','da', 'da', 's', 's','s', 's','s', 's' ],
			parVal : [ test, begindate, enddate, djlx,zybh,sxdw,jxdw,jxbm,jxbz ],
			proName : 'pg_dj604.getdjmendtable',
			cursorName : 'ret'
		},
		dataType : "json",
		traditional : true,
		success : function(resp) {
			for ( var i = 0; i < resp.list.length; i++) {
				var htmlArr = [];
				htmlArr.push('<tr>');
				htmlArr.push('<td style="text-align: center">' + (i + 1)
						+ '</td>');
				htmlArr.push('<td style="text-align: left">'
						+ isNull(resp.list[i].ORDERID) + '</td>');
				htmlArr.push('<td style="text-align: left">'
						+ isNull(resp.list[i].APPLY_PLANTNAME) + '</td>');
				htmlArr.push('<td style="text-align: left">'
						+ isNull(resp.list[i].DJ_VOL) + '</td>');
				htmlArr.push('<td style="text-align: center">'
						+ isNull(resp.list[i].DJ_V) + '</td>');
				htmlArr.push('<td style="text-align: center">'
						+ isNull(resp.list[i].DJ_EQUPOSITION) + '</td>');
				htmlArr.push('<td style="text-align: left">'
						+ isNull(resp.list[i].MEND_CONTEXT) + '</td>');
				htmlArr.push('<td style="text-align: left">'
						+ isNull(resp.list[i].PLAN_BEGINDATE) + '</td>');
				htmlArr.push('<td style="text-align: center">'
						+ isNull(resp.list[i].ACT_ENDDATE) + '</td>');
				htmlArr.push('<td style="text-align: center">'
						+ isNull(resp.list[i].PLAN_ENDDATE) + '</td>');
				htmlArr.push('<td style="text-align: center">'
						+ isNull(resp.list[i].MENDDEPT_NAME) + '</td>');
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

	LODOP.SET_PRINT_PAGESIZE(2,2970,2100,"电机维修台帐打印");

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
