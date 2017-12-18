if (location.href.split('?')[1] != undefined) {
    var djlx = Ext.urlDecode(location.href.split('?')[1]).djlx;
    var djlx = djlx.replace('@', "%");
    var begindate = Ext.urlDecode(location.href.split('?')[1]).begindate;
    var enddate = Ext.urlDecode(location.href.split('?')[1]).enddate;
    var zybh = Ext.urlDecode(location.href.split('?')[1]).zybh;
    var zybh = zybh.replace('@', "%");
    var sxdw = Ext.urlDecode(location.href.split('?')[1]).sxdw;
    var sxdw = sxdw.replace('@', "%");
    var jxdw = Ext.urlDecode(location.href.split('?')[1]).jxdw;
    //var jxdw=jxdw.replace('@',"%");
    var jxbm = Ext.urlDecode(location.href.split('?')[1]).jxbm;
    var jxbm = jxbm.replace('@', "%");
    var jxbz = Ext.urlDecode(location.href.split('?')[1]).jxbz;
    var jxbz = jxbz.replace('@', "%");

}
$(function () {
    LoadSelect();
});
function LoadSelect() {
    $('#tbody').empty();
    var test = Ext.util.Cookies.get('test');
    //document.getElementById('title').innerHtml='电机维修（'+Ext.Date.format(begindate, 'Y年m月d日')+'-'+Ext.Date.format(enddate, 'Y年m月d日')+'）台帐';
    $.ajax({
        url: AppUrl + 'zpf/PG_DJ604_GETDJMENDTABLE',
        type: 'post',
        async: false,
        data: {
            A_DATETYPE: test,
            A_BEGINDATE: begindate,
            A_ENDDATE: enddate,
            A_DJ_SERIES_CLASS: djlx,
            A_ORDERID: zybh,
            A_SENDPLANT: sxdw,
            A_PLANT: jxdw,
            A_DEPT: jxbm,
            A_GROUP: jxbz
        },
        dataType: "json",
        traditional: true,
        success: function (resp) {
            for (var i = 0; i < resp.list.length; i++) {
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
                + isNull(resp.list[i].EXA_TIME) + '</td>');
                htmlArr.push('<td style="text-align: center">'
                + isNull(resp.list[i].OUT_TIME) + '</td>');
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
    try {
        LODOP = getLodop(document.getElementById('LODOP'), document.getElementById('LODOP_EM'));
        LODOP.SET_LICENSES("鞍山市新安杰系统集成有限公司", "559677661718684777294958093190", "", "");
        var strBodyStyle = "<style>" + document.getElementById("stylePrint").innerHTML + "</style>";
        var strFormHtml = strBodyStyle + document.getElementById('main').innerHTML;
        LODOP.PRINT_INIT("gongdan");
        LODOP.SET_PRINT_PAGESIZE(1, 2400, 0, 'A4 横向');
        LODOP.ADD_PRINT_HTM("5", "5", "100%", "100%", strFormHtml);
        LODOP.NewPage();
    }
    catch (e) {
        $("#exception").show();
    }
}


function Print() {
    try {
        DefaultPrintSettings();
        LODOP.PRINT();
    } catch (e) {
        $("#exception").show();
    }
}

function Preview() {
    try {
        DefaultPrintSettings();
        LODOP.PREVIEW();
    } catch (e) {
        $("#exception").show();
    }
}
