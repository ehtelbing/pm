var ORDERID = '';

if (location.href.split('?')[1] != null) {
    ORDERID = Ext.urlDecode(location.href.split('?')[1]).ORDERID;
}

Ext.onReady(function () {

    //获取单据信息
    Ext.Ajax.request({
        url: AppUrl + 'ml/PRO_DJ601_ORDERMESSAGE',
        type: 'ajax',
        method: 'POST',
        params: {
            'ORDERID_in': ORDERID
        },

        success: function (response, options) {
            var data = Ext.decode(response.responseText);

            if (data.list.length > 0) {
                Ext.fly('ORDERID').dom.innerHTML = ORDERID;
                Ext.fly('INSERTDATE').dom.innerHTML = data.list[0].INSERTDATE;
                Ext.fly('MENDDEPT_NAME').dom.innerHTML = data.list[0].MENDDEPT_NAME;
                Ext.fly('DJ_CODE').dom.innerHTML = data.list[0].DJ_UQ_CODE;
                Ext.fly('DJ_NAME').dom.innerHTML = data.list[0].DJ_NAME;
                Ext.fly('DJ_VOL').dom.innerHTML = data.list[0].DJ_VOL;
            }
        }

    });

    //查询物料明细
    Ext.Ajax.request({
        url: AppUrl + 'ml/GETORDERCONSUME',//PG_DJ1003.GETORDERCONSUME
        type: 'ajax',
        method: 'POST',
        params: {
            'A_ORDERID': ORDERID
        },

        success: function (response, options) {
            var resp = Ext.decode(response.responseText);
            var sumMoney = 0;
            var sumAmount = 0;
            if (resp.list.length > 0) {
                var table = "";
                Ext.Array.each(resp.list, function (name, index,countriesItSelf) {
                    table += "<tr><td>" + isNull(name.MATERIALCODE)
                    + "</td><td>" + isNull(name.MATERIALNAME)
                    + "</td><td>" + isNull(name.ETALON)
                    + "</td><td>" + isNull(name.UNIT)
                    + "</td><td style='text-align:right;'>" + isNull(name.ACT_AMOUNT)
                    + "</td><td style='text-align:right;'>" + isNull(name.F_PRICE)
                    + "</td><td style='text-align:right;'>" + isNull(name.F_ACT_MONEY)
                    + "</td></tr>";
                    sumAmount = accAdd(sumAmount, name.PLAN_AMOUNT);
                    sumMoney = accAdd(sumMoney, name.F_MONEY);
                });
                $('#cgjsd').html(table);
                $('#hjAmount').html(sumAmount);
                $('#hjMoney').html(sumMoney);
            }
        }
    });
});

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
function printPreview() {
    try{
        DefaultPrintSettings();
        LODOP.PREVIEW();
    }catch(e){
        $("#exception").show();
    }
}


// 加法
function accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
}
// 减法
function Subtr(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

function isNull(value) {
    if (value == "" || value == null) {
        return "&nbsp;"
    }
    return value;
}