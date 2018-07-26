var LODOP = "";
var idGroup = [];
var argument = [];
var orderID = "";
$(function () {
    loadPageInfo();
});

function loadPageInfo() {
    if (location.href.split('?')[1] != undefined) {
        var bmmc = Ext.urlDecode(location.href.split('?')[1]).bmmc;
        var lx = Ext.urlDecode(location.href.split('?')[1]).lx;
        var bb = Ext.urlDecode(location.href.split('?')[1]).bb;
        var begintime = Ext.urlDecode(location.href.split('?')[1]).begintime;
        var endtime = Ext.urlDecode(location.href.split('?')[1]).endtime;
        var result = [];
        $.ajax({
            url: AppUrl + 'Wsy/PRO_PP_INFORMATION_WITHDW_LIST',
//            url: APP + '/ModelSelect',
            type: 'post',
            async: false,
            data: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPT: bmmc == 'ALL' ? '%' : bmmc,
                V_V_TYPE: lx == 'ALL' ? '%' : lx,
                V_V_CLASSTYPE: bb == 'ALL' ? '%' : bb,
                V_D_FROMDATE: begintime,
                V_D_TODATE: endtime
//                parName: ['V_V_PERSONCODE', 'v_v_dept', 'v_v_type', 'v_v_classtype', 'v_d_fromdate', 'v_d_todate'],
//                parType: ['s', 's', 's', 's', 'date', 'date'],
//                parVal: [
//                    Ext.util.Cookies.get('v_personcode'),
//                    bmmc == 'ALL' ? '%' : bmmc,
//                    lx == 'ALL' ? '%' : lx,
//                    bb == 'ALL' ? '%' : bb,
//                    begintime,
//                    endtime
//                ],
//                proName: 'PRO_PP_INFORMATION_WITHDW_LIST',
//                cursorName: 'v_cursor'
            },
            dataType: "json",
            traditional: true,
            success: function (resp) {
                result.push('<div id=main>');
                result.push('<div class="divs">信息缺陷作业票列表</div>');
                result.push('<table class="Ttable">');
                result.push('<tr>');
                result.push('<td align="center" width="30px">序号</td><td align="center" width="120px">日期时间</td><td align="center" width="720px">内容</td><td align="center" width="50px">上报人</td><td align="center" width="50px">班别</td>');
                for (var j = 0; j < resp.list.length; j++) {
                    for (var i = 0; i < window.dialogArguments.length; i++) {
                        if (resp.list[j].I_ID == window.dialogArguments[i]) {
                            result.push('<tr>');
                            result.push('<td align="center">');
                            result.push(i + 1);
                            result.push('</td>');
                            result.push('<td align="center">');
                            result.push(resp.list[j].D_DATE);
                            result.push('</td>');
                            result.push('<td style="width:720px;word-break:break-all">');
                            result.push(resp.list[j].V_INFORMATION);
                            result.push('</td>');
                            result.push('<td>');
                            result.push(resp.list[j].V_PERSON);
                            result.push('</td>');
                            result.push('<td>');
                            result.push(resp.list[j].V_CLASSTYPE);
                            result.push('</td>');
                            result.push('</tr>');
                        }
                    }
                }
                result.push('</tr>');
                result.push('</table>');
                result.push('</div>');
                idGroup = result;
                $("#yesprint").append(result.join(""));
                result = [];
            }
        });
    }
}

function DefaultPrintSettings() {
    try {
        LODOP = getLodop(document.getElementById('LODOP'), document.getElementById('LODOP_EM'));
        LODOP.SET_LICENSES("鞍山市新安杰系统集成有限公司", "559677661718684777294958093190", "", "");
        LODOP.PRINT_INIT("gongdan");
        var strBodyStyle = "<style>" + document.getElementById('stylePrint').innerHTML + "</style>";
        LODOP.SET_PRINT_PAGESIZE(1, 0, 0, 'A3');
        var strFormHtml = strBodyStyle + $("#main").html();
        LODOP.ADD_PRINT_HTM("30", "40", "100%", "100%", strFormHtml);
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

