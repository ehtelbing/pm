var url_guid = "";
BaseUrl = location.href.split('?')[1];
url_guid = Ext.urlDecode(BaseUrl).V_V_GUID;

Ext.Ajax.request({
    url: AppUrl + 'sg/SG_INF_DATA_ITEM_SELBYGUID',
    method: 'POST',
    async: false,
    params: {
        V_V_GUID : url_guid
    },
    success: function (ret) {
        var resp = Ext.JSON.decode(ret.responseText);
        document.getElementById('name').innerHTML = resp.list[0].V_SG_NAME;
        document.getElementById('occurtime').innerHTML = resp.list[0].V_SG_TIEM;
        document.getElementById('occurunit').innerHTML = resp.list[0].V_DEPTNAME;
        document.getElementById('occurplace').innerHTML = resp.list[0].V_SG_DD;
        document.getElementById('equip').innerHTML = resp.list[0].V_SG_EQU;
        document.getElementById('type').innerHTML = resp.list[0].V_TYPE_NAME;
        document.getElementById('influencetime').innerHTML = resp.list[0].V_SG_YYSJ;
        document.getElementById('occurreason').innerHTML = resp.list[0].V_YY_NAME;
        document.getElementById('person').innerHTML = resp.list[0].V_SG_PER;
        document.getElementById('pass').innerHTML = resp.list[0].V_SG_JG;
        document.getElementById('influence').innerHTML = resp.list[0].V_YX_MARK;
        document.getElementById('fixunit').innerHTML = resp.list[0].V_JX_DEPTNAME;
        document.getElementById('fixbegintime').innerHTML = resp.list[0].V_JX_STIME;
        document.getElementById('fixendtime').innerHTML = resp.list[0].V_JX_ETIME;
        document.getElementById('fixtotal').innerHTML = resp.list[0].V_JX_TIME;
        document.getElementById('fixremark').innerHTML = resp.list[0].V_JX_MARK;
        document.getElementById('changemeasure').innerHTML = resp.list[0].V_SG_ZGCS;
        document.getElementById('fixmoney').innerHTML = resp.list[0].V_SG_XFF;
        document.getElementById('reducemoney').innerHTML = resp.list[0].V_SG_JCSSF;
        document.getElementById('otherreduce').innerHTML = resp.list[0].V_SG_QT;
        document.getElementById('reducetotal').innerHTML = resp.list[0].V_SG_SSHJ;
        document.getElementById('influencetime1').innerHTML = resp.list[0].V_SG_YYSJ;
        document.getElementById('checkunit').innerHTML = resp.list[0].V_KH_DEPTNAME;
        document.getElementById('checklevel').innerHTML = resp.list[0].V_KH_POSTNAME;
        document.getElementById('checkclause').innerHTML = resp.list[0].V_KH_TK;
        document.getElementById('checkperson').innerHTML = resp.list[0].V_KH_PERCODE;
        document.getElementById('checkremark').innerHTML = resp.list[0].V_KH_MARK;
    }
});

var hkey_root,hkey_path,hkey_key;
hkey_root="HKEY_CURRENT_USER";
hkey_path="\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";


//网页打印时清空页眉页脚
function pagesetup_null() {
    try {
        var RegWsh = new ActiveXObject("WScript.Shell")
        hkey_key = "header"
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "")
        hkey_key = "footer"
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "")
    } catch (e) {}
}

function Print(){
    pagesetup_null();
    window.print();

}




