/**
 * Created by LL on 2017/12/14.
 */
if (location.href.split('?')[1] != undefined) {
    var begindate = Ext.urlDecode(location.href.split('?')[1]).begindate;
    var enddate = Ext.urlDecode(location.href.split('?')[1]).enddate;
    var itype = Ext.urlDecode(location.href.split('?')[1]).itype;
    var itype = itype.replace('@', "%")
    var name = Ext.urlDecode(location.href.split('?')[1]).name;
}

$(function () {
    $('#tbody').empty();

    $.ajax({
        url: AppUrl + 'LL/GETAPPLYMAT',
        type: 'post',
        async: false,
        data: {
            'A_BEGINDATE': begindate,
            'A_ENDDATE': enddate,
            'A_ITYPE': itype,
            'A_NAME': name
        },
        dataType: "json",
        traditional: true,
        success: function (resp) {
            for (var i = 0; i < resp.list.length; i++) {
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

});

function isNull(value) {
    if (value == null || value == "null") {
        return "";
    } else {
        return value;
    }
}

function DefaultPrintSettings() {
    try{
        LODOP = getLodop(document.getElementById('LODOP'), document.getElementById('LODOP_EM'));
        LODOP.SET_LICENSES("鞍山市新安杰系统集成有限公司", "559677661718684777294958093190", "", "");
        var strBodyStyle = "<style>" + document.getElementById("stylePrint").innerHTML + "</style>";
        var strFormHtml = strBodyStyle + document.getElementById('main').innerHTML;
        LODOP.PRINT_INIT("gongdan");
        LODOP.SET_PRINT_PAGESIZE(1, 2400, 0, 'A4 横向');
        LODOP.ADD_PRINT_HTM("5", "5", "100%", "100%", strFormHtml);
        LODOP.NewPage();
    }
    catch(e){
        $("#exception").show();
    }
}
function dataPrint() {
    try{
        DefaultPrintSettings();
        LODOP.PRINT();
    }catch(e){
        $("#exception").show();
    }
}
function Preview() {
    try{
        DefaultPrintSettings();
        LODOP.PREVIEW();
    }catch(e){
        $("#exception").show();
    }
}
