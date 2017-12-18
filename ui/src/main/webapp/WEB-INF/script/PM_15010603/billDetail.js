/**
 * Created by Yjn on 2017/12/13.
 */
var orderid;

if (location.href.split('?')[1] != undefined) {
    orderid = Ext.urlDecode(location.href.split('?')[1]).orderid;
}

Ext.onReady(function() {
    // 只读数据
    Ext.Ajax.request({
        url : AppUrl + 'yjn/GETMENDBILLDETAIL',
        method: 'POST',
        async : false,
        params : {
            A_ORDERID :  orderid
        },
        success : function(response,options) {
            var resp = Ext.decode(response.responseText).list;
            if(resp.length>0){
                Ext.fly('dj_name').dom.innerHTML = resp[0].DJ_NAME;
                Ext.fly('amount').dom.innerHTML = resp[0].AMOUNT;
                Ext.fly('dj_type').dom.innerHTML = resp[0].DJ_TYPE;
                Ext.fly('dj_vol').dom.innerHTML = resp[0]. DJ_VOL;
                Ext.fly('dj_v').dom.innerHTML = resp[0].DJ_V;
                Ext.fly('piccode').dom.innerHTML = resp[0].PICCODE;
                Ext.fly('op_person').dom.innerHTML = resp[0].OP_PERSON;
                Ext.fly('mend_context').dom.innerHTML = resp[0].MEND_CONTEXT;
                Ext.fly('use_loc').dom.innerHTML = resp[0].USE_LOC;
                Ext.fly('req_time').dom.innerHTML = resp[0].REQ_TIME;
                Ext.fly('plan_time').dom.innerHTML = resp[0].PLAN_TIME;
                Ext.fly('build_remark').dom.innerHTML = resp[0].BUILD_REMARK;
                Ext.fly('check_log').dom.innerHTML = resp[0].CHECK_LOG;//
                Ext.fly('phone_number').dom.innerHTML = resp[0].PHONE_NUMBER;
                Ext.fly('orderid').dom.innerHTML = resp[0].ORDERID;
                Ext.fly('insertdate').dom.innerHTML = resp[0].INSERTDATE;//
                Ext.fly('menddept_name').dom.innerHTML = resp[0].APPLY_PLANTNAME;//
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

function Print() {
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


