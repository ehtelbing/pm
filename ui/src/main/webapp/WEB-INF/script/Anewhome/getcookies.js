/**
 * Created by zjh on 2017/1/19.
 */

var ip =
    Ext.onReady(function () {
        Login();
        OnPageLoad();
    });

function Login() {

    if (location.href.split('?')[1] != null) {

        if (Ext.urlDecode(location.href.split('?')[1]).USERID != null && Ext.urlDecode(location.href.split('?')[1]).USERID != '') {
            if (Ext.urlDecode(location.href.split('?')[1]).IP != null && Ext.urlDecode(location.href.split('?')[1]).IP != '') {

                Ext.Ajax.request({
                    url: AppUrl + 'info/login_dddl_n',
                    params: {
                        USERID: Ext.urlDecode(location.href.split('?')[1]).USERID,
                        V_V_IP: Ext.urlDecode(location.href.split('?')[1]).IP
                    }, success: function (respon) {
                        var resp = Ext.decode(respon.responseText);
                        if (resp.list.length > 0) {

                            Ext.util.Cookies.set("v_class_code",
                                encodeURI(resp.list[0].V_CLASS_CODE));


                            Ext.util.Cookies.set("v_orgname",
                                encodeURI(resp.list[0].V_ORGNAME));


                            Ext.util.Cookies.set("v_rolename",
                                encodeURI(resp.list[0].V_ROLENAME));


                            Ext.util.Cookies.set("v_loginname",
                                encodeURI(resp.list[0].V_LOGINNAME));


                            Ext.util.Cookies.set("v_deptname",
                                encodeURI(resp.list[0].V_DEPTNAME));


                            Ext.util.Cookies.set("v_rolecode",
                                resp.list[0].V_ROLECODE);


                            Ext.util.Cookies.set("v_personcode",
                                resp.list[0].I_PERSONID);


                            Ext.util.Cookies.set("v_postname",
                                encodeURI(resp.list[0].V_POSTNAME));


                            Ext.util.Cookies.set("v_depttypecode",
                                encodeURI(resp.list[0].V_DEPTTYPE));


                            Ext.util.Cookies.set("v_postcode",
                                resp.list[0].V_POSTCODE);


                            Ext.util.Cookies.set("v_password",
                                resp.list[0].V_PASSWORD);


                            Ext.util.Cookies.set("v_orgCode",
                                resp.list[0].V_ORGCODE);


                            Ext.util.Cookies.set("v_personname2",
                                resp.list[0].V_PERSONNAME);


                            Ext.util.Cookies.set("v_personname",
                                encodeURI(resp.list[0].V_PERSONNAME));


                            Ext.util.Cookies.set("v_deptcode",
                                resp.list[0].V_DEPTCODE);


                            Ext.util.Cookies.set("v_deptfullname",
                                encodeURI(resp.list[0].V_DEPTFULLNAME));


                            Ext.util.Cookies.set("v_deptsmallname",
                                encodeURI(resp.list[0].V_DEPTSMALLNAME));


                            Ext.util.Cookies.set("v_orgname2",
                                resp.list[0].V_ORGNAME);


                            Ext.util.Cookies.set("v_deptname2",
                                resp.list[0].V_DEPTNAME);


                            Ext.util.Cookies.set("v_personname2",
                                resp.list[0].V_PERSONNAME);


                            Ext.util.Cookies.set('v_workcss',
                                resp.list[0].V_WORKCSS);

                        }
                    }
                });
            }
        }
    }
}


function OnPageLoad() {

    Ext.Ajax.request({
        url: AppUrl + 'info/log_text',
        params: {
            UserIp: GetIP().ip
        },
        method: 'POST',
        async: false,
        success: function (response) {
            if (response.responseText != 'timeout') {
                var resp = response.responseText;
                /*if (resp != '') {
                    document.getElementById('username').value = resp;
                }*/
            }
        }
    });
}
