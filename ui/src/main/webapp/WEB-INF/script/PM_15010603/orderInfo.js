/**
 * Created by Yjn on 2017/12/13.
 */

var orderid = '';
if (location.href.split('?')[1] != null) {
    orderid = Ext.urlDecode(location.href.split('?')[1]).orderid;
}

Ext.onReady(function () {

    Ext.Ajax.request({
        url: AppUrl + 'yjn/PRO_DJ601_ORDERMESSAGE',
        method: 'POST',
        params: {
            ORDERID_in: orderid
        },
        success: function (response, options) {
            var resp = Ext.decode(response.responseText).list;
            if (resp.length > 0) {
                Ext.fly('ORDERID').dom.innerHTML = orderid;
                Ext.fly('DJ_UQ_CODE').dom.innerHTML = resp[0].DJ_UQ_CODE;
                Ext.fly('DJ_NAME').dom.innerHTML = resp[0].DJ_NAME;
                Ext.fly('MEND_CONTEXT').dom.innerHTML = resp[0].MEND_CONTEXT;
                Ext.fly('DJ_VOL').dom.innerHTML = resp[0].DJ_VOL;
                Ext.fly('DJ_TYPE').dom.innerHTML = resp[0].DJ_TYPE;
                Ext.fly('SUPPLY_NAME').dom.innerHTML = resp[0].LOC_PLANTNAME;
                Ext.fly('PLAN_BEGINDATE').dom.innerHTML = Ext.util.Format.date(resp[0].PLAN_BEGINDATE, 'Y-m-d');
                Ext.fly('PLAN_ENDDATE').dom.innerHTML = Ext.util.Format.date(resp[0].PLAN_ENDDATE, 'Y-m-d');
                Ext.fly('MENDDEPT_NAME').dom.innerHTML = resp[0].MENDDEPT_NAME;
                Ext.fly('MEND_USERNAME').dom.innerHTML = resp[0].MEND_USERNAME;
            }
        }
    });

    Ext.Ajax.request({
        url: AppUrl + 'yjn/PRO_DJ601_ORDERET',
        method: 'POST',
        params: {
            ORDERID_in: orderid
        },
        success: function (response, options) {
            var resp = Ext.decode(response.responseText).list;
            var table = "";
            if (resp.length > 0) {
                Ext.Array.each(resp, function (name, index, countriesItSelf) {
                    table = "<tr>" +
                    "<td>" + name.ET_NO + "</td>" +
                    "<td>" + name.ET_CONTEXT + "</td>" +
                    "<td>" + name.PLAN_WORKTIME + "</td>" +
                    "<td>" + name.PLAN_PERSON + "</td>" +
                    "<td>" + name.ACT_WORKTIME + "</td>" +
                    "<td>" + name.ACT_PERSON + "</td>" +
                    "<td>" + name.PRE_ET_ID + "</td>" +
                    "</tr>";
                    $("#TABLE1").append(table);
                });
            }
        }
    });

    Ext.Ajax.request({
        url: AppUrl + 'yjn/PRO_DJ601_ORDERMAT',
        method: 'POST',
        params: {
            ORDERID_in: orderid
        },
        success: function (response, options) {
            var resp = Ext.decode(response.responseText).list;
            var table = "";
            if (resp.length > 0) {
                Ext.Array.each(resp, function (name, index, countriesItSelf) {
                    table = "<tr>" +
                    "<td>" + name.MATERIALCODE + "</td>" +
                    "<td>" + name.MATERIALNAME + "</td>" +
                    "<td>" + name.ETALON + "</td>" +
                    "<td>" + name.MAT_CL + "</td>" +
                    "<td>" + name.UNIT + "</td>" +
                    "<td>" + name.F_PRICE + "</td>" +
                    "<td>" + name.PLAN_AMOUNT + "</td>" +
                    "<td>" + name.ACT_AMOUNT + "</td>" +
                    "<td>" + name.SOURCE + "</td>" +
                    "</tr>";
                    $("#TABLE2").append(table);
                });
            }
        }
    });
});

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