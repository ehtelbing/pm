var LODOP = "";
var parameters = '';
var page = 1;
var num = 0;
var dataGruop = [];
var result = [];
var printnum = 0;
if (location.href.split('?')[1] != undefined) {
    parameters = Ext.urlDecode(location.href.split('?')[1]);
}

Ext.onReady(function () {
    loadPage();

});

function loadPage() {
    for (var i = 0; i < window.opener.ID_list.length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'Wsy/PRO_PP_INFORMATION_GET',
            type: 'ajax',
            async: false,
            method: 'POST',
            params: {
                V_I_ID: window.opener.ID_list[i]
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);
                if (data.list.length > 0) {
                    dataGruop.push(data.list);
                }
                num++;
            }
        });
    }

    if (num == window.opener.ID_list.length) {
        createPage(dataGruop, page);
    }
}

function createPage(printStoreTemp) {
    result.push('<div style=width: 1100px>\n');
    result.push('<div style=width: 1100px>\n');
    result.push('<DIV style="LINE-HEIGHT: 30px" class=size16 align=center><STRONG><font color="#0000FF">写实信息打印</font></STRONG></DIV>        \n');
    result.push('<TABLE border=1 cellSpacing=0 cellPadding=0 width="100%">\n');
    result.push('  <TBODY>\n');
    result.push('  <TR>\n');
    result.push('    <TD width="33%"><font color="#0000FF">部门名称：<SPAN>' + parameters.bmmc + '</SPAN></font></TD>\n');
    result.push('    <TD width="33%"><font color="#0000FF">类型：<SPAN>' + parameters.lx + '</SPAN></font></TD>\n');
    result.push('    <TD><font color="#0000FF">班型：<SPAN>' + parameters.bb + '</SPAN></font></TD></TR>\n');
    result.push('  <TR>\n');
    result.push('    <TD><font color="#0000FF">起始日期：<SPAN>' + parameters.begintime + '</SPAN></font></TD> \n');
    result.push('    <TD><font color="#0000FF">终止日期：<SPAN>' + parameters.endtime + '</SPAN></font></TD>\n');
    result.push('    <TD><font color="#0000FF"></font></TD></TR>\n');
    result.push('</TBODY></TABLE>\n');
    result.push('</div>\n<div >\n');
    result.push('<TABLE border=1 cellSpacing=0 cellPadding=1 width="100%" style="border-collapse:collapse" bordercolor="#333333">\n');
    result.push('<thead>\n');
    result.push('  <TR>\n');
    result.push('    <TD width="10%">\n');
    result.push('      <DIV align=center><b>ID</b></DIV></TD>\n');
    result.push('    <TD width="15%">\n');
    result.push('      <DIV align=center><b>日期时间</b></DIV></TD>\n');
    result.push('    <TD width="15%">\n');
    result.push('      <DIV align=center><b>设备名称</b></DIV></TD>\n');
    result.push('    <TD width="30%">\n');
    result.push('      <DIV align=center><b>内容</b></DIV></TD>\n');
    result.push('    <TD width="10%">\n');
    result.push('      <DIV align=center><b>状态</b></DIV></TD>\n');
    result.push('    <TD width="10%">\n');
    result.push('      <DIV align=center><b>类型</b></DIV></TD>\n');
    result.push('    <TD width="5%">\n');
    result.push('      <DIV align=center><b>班型</b></DIV></TD></TR>\n');
    result.push('</thead>      \n');
    result.push('  <TBODY>      \n');
    for (var i = 0; i < printStoreTemp.length; i++) {
        result.push('<TR>\n');
        result.push('    <td>' + printStoreTemp[i][0].I_ID + '</TD>\n');
        result.push('    <TD>' + printStoreTemp[i][0].D_DATE + '</TD>\n');
        result.push('    <TD>' + printStoreTemp[i][0].V_V_EQUNAME + '</TD>\n');
        result.push('    <TD>' + printStoreTemp[i][0].V_INFORMATION + '</TD>\n');
        result.push('    <TD>' + printStoreTemp[i][0].STATE + '</TD>\n');
        result.push('    <TD>' + printStoreTemp[i][0].V_TYPENAME + '</TD>\n');
        result.push('    <TD>' + printStoreTemp[i][0].V_CLASSTYPE + '</TD>\n');
        result.push('  </tr>\n');
        printnum++;
    }
    result.push('  <tfoot>\n');
    result.push('</TABLE>\n');
    result.push('</div>\n');
    result.push('</div>\n');
    $("#yesprint").append(result.join(""));
    result = [];
}

function DefaultPrintSettings() {
    try {
        LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
        LODOP.SET_LICENSES("鞍山市新安杰系统集成有限公司", "559677661718684777294958093190", "", "");
        LODOP.PRINT_INIT("shengchanxieshi");
        LODOP.SET_PRINT_PAGESIZE(2, 2100, 2970, 'A4 横向');
    }
    catch (e) {
        $("#exception").show();
    }
}

function Print() {
    try {
        DefaultPrintSettings();
        LODOP.NewPage();
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

