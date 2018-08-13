﻿var LODOP = getLodop();
var page = 1;
var printStore = window.opener.printStore;
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
}
Ext.define('Ext.ux.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    async: true,
    doRequest: function (operation, callback, scope) {
        var writer = this.getWriter(),
                request = this.buildRequest(operation);
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        Ext.apply(request, {
            async: this.async,
            binary: this.binary,
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, callback, scope),
            method: this.getMethod(request),
            disableCaching: false
        });
        Ext.Ajax.request(request);
        return request;
    }
});
Ext.onReady(function () {
    var printStoreTemp = Ext.create('Ext.data.Store', {
        id: 'printStoreTemp',
        autoLoad: false,
        fields: ['V_INFORMATION', 'MTYPE', 'V_STATE', 'I_ID', 'D_DATE', 'V_EQUIP', 'V_TYPE', 'V_CLASSTYPE', 'V_PERSON', 'YS']
    });
    loadPage();
});

function loadPage() {
    var printStoreTemp = Ext.getStore("printStoreTemp");
    for (var i = 0; i < printStore.getCount(); i++) {
        printStoreTemp.add(printStore.getAt(i));
        if (i == printStore.getCount() - 1 || printStoreTemp.getCount() == 20) {
            createPage(printStoreTemp, page);
            page++;
            printStoreTemp.removeAll();
        }
    }
}

function createPage(printStoreTemp, page) {
    var s1 = '<div id=page' + page + ' style=width: 1366px>\n' +
            '<div style=width: 1366px>\n' +
            '<DIV style="LINE-HEIGHT: 30px" class=size16 align=center><STRONG><font color="#0000FF">信息缺陷作业查询</font></STRONG></DIV>        \n' +
            '<TABLE border=1 cellSpacing=0 cellPadding=0 width="100%">\n' +
            '  <TBODY>\n' +
            '  <TR>\n' +
            '    <TD width="33%"><font color="#0000FF">部门名称：<SPAN>' + parameters.bmmc + '</SPAN></font></TD>\n' +
            '    <TD width="33%"><font color="#0000FF">类型：<SPAN>' + parameters.lx + '</SPAN></font></TD>\n' +
            '    <TD><font color="#0000FF">班型：<SPAN>' + parameters.bb + '</SPAN></font></TD></TR>\n' +
            '  <TR>\n' +
            '    <TD><font color="#0000FF">起始日期：<SPAN>' + parameters.begintime + '</SPAN></font></TD> \n' +
            '    <TD><font color="#0000FF">终止日期：<SPAN>' + parameters.endtime + '</SPAN></font><font color="#0000FF"></font></TD>\n' +
            '    <TD><font color="#0000FF"></font></TD></TR>\n' +
            '</TBODY></TABLE>\n' +
            '</div>\n' +
            '<div >\n' +
            '\n' +
            '<TABLE border=1 cellSpacing=0 cellPadding=1 width="100%" style="border-collapse:collapse" bordercolor="#333333">\n' +
            '<thead>\n' +
            '  <TR>\n' +
            '    <TD width="10%">\n' +
            '      <DIV align=center><b>ID</b></DIV></TD>\n' +
            '    <TD width="15%">\n' +
            '      <DIV align=center><b>日期时间</b></DIV></TD>\n' +
            '    <TD width="15%">\n' +
            '      <DIV align=center><b>设备名称</b></DIV></TD>\n' +
            '    <TD width="30%">\n' +
            '      <DIV align=center><b>内容</b></DIV></TD>\n' +
            '    <TD width="10%">\n' +
            '      <DIV align=center><b>状态</b></DIV></TD>\n' +
            '    <TD width="10%">\n' +
            '      <DIV align=center><b>类型</b></DIV></TD>\n' +
            '    <TD width="5%">\n' +
            '      <DIV align=center><b>班型</b></DIV></TD></TR>\n' +
            '</thead>      \n' +
            '  <TBODY>      \n';
    var s2 = '';
    for (var i = 0; i < printStoreTemp.getCount(); i++) {
        var record = printStoreTemp.getAt(i);
        s2 = s2 + '<TR>\n' +
                '    <td><font color=' + record.data.YS + '>' + record.get("I_ID") + '</font></TD>\n' +
                '    <TD><font color=' + record.data.YS + '>' + record.get("D_DATE") + '</font></TD>\n' +
                '    <TD><font color=' + record.data.YS + '>' + record.get("V_EQUIP") + '</font></TD>\n' +
                '    <TD><font color=' + record.data.YS + '>' + record.get("V_INFORMATION") + '</font></TD>\n' +
                '    <TD><font color=' + record.data.YS + '>' + record.get("V_STATE") + '</font></TD>\n' +
                '    <TD><font color=' + record.data.YS + '>' + record.get("V_TYPE") + '</font></TD>\n' +
                '    <TD><font color=' + record.data.YS + '>' + record.get("V_CLASSTYPE") + '</font></TD>\n' +
                '  </tr>\n';
    }
    var s3 =
            '  <tfoot>\n' +
            '  </tfoot>\n' +
            '</TABLE>\n' +
            '</div>\n' +
            '</div>\n';
    $("#yesprint").append(s1 + s2 + s3);
}

function DefaultPrintSettings() {
    try {
        LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
        LODOP.SET_LICENSES("鞍山市新安杰系统集成有限公司", "559677661718684777294958093190", "", "");
        LODOP.PRINT_INIT("quexianzuoye");
        LODOP.SET_PRINT_PAGESIZE(2, 2100, 2970, '');
    }
    catch (e) {
        $("#exception").show();
    }
}

function Print() {
    try {
        DefaultPrintSettings();
        for (var i = 1; i <= page; i++) {
//            LODOP.ADD_PRINT_HTM("30", "15", "100%", "100%", $("#page" + i).html());
//            LODOP.PRINT();
            LODOP.NewPage();
            Prnt_Oneform("page" + i + "");
        }
    } catch (e) {
        $("#exception").show();
    }
}

function Prnt_Oneform(strID) {
    DefaultPrintSettings();
//    LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_分页输出四");
    LODOP.ADD_PRINT_HTM("1mm", "1mm", "100%", "100%", $(strID).html());
    LODOP.PRINT();
}

function Preview() {
    try {
        DefaultPrintSettings();
        for (var i = 1; i <= page; i++) {
            LODOP.NewPage();
            LODOP.ADD_PRINT_HTM("1mm", "1mm", "100%", "100%", $("#page" + i).html());
            //LODOP.SET_PRINT_STYLEA(0, "TableRowThickNess", 25);
        }
        LODOP.PREVIEW();
    } catch (e) {
        $("#exception").show();
    }
}

function rowspan(x, max_operation) {
    if (x == 0) {
        return max_operation;
    } else {
        return max_operation - x * 20
    }
}
