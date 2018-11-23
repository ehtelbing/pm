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

        if (Ext.urlDecode(location.href.split('?')[1]).v_mancode != null && Ext.urlDecode(location.href.split('?')[1]).v_mancode != '') {
            if (Ext.urlDecode(location.href.split('?')[1]).v_type != null && Ext.urlDecode(location.href.split('?')[1]).v_type != '') {

                Ext.Ajax.request({
                    url: AppUrl + 'info/login_dddl',
                    params: {
                        LoginName: Ext.urlDecode(location.href.split('?')[1]).v_mancode,
                        LoginType: Ext.urlDecode(location.href.split('?')[1]).v_type
                    }, success: function (respon) {
                        var resp = Ext.decode(respon.responseText);
                        if (resp.list.length>0) {

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

                            if((resp.list[0].V_DEPTCODE.indexOf("9900")!=-1)|| resp.list[0].V_ROLECODE=='15'){
                                location.href = "../../page/Anewhome/index.html";
                            }else{
                                location.href = "../../page/home/ndex.html";
                            }


                        } else {
                            msgbox("不存在此用户！");
                        }
                    }
                });
            }
        }
    }
}

function msgbox(s_mes) {
    document.getElementById('messbox').innerHTML = s_mes;
}

function OnKeypress(e) {
    var keynum;
    if (window.event) // IE
    {
        keynum = e.keyCode
    } else if (e.which) // Netscape/Firefox/Opera
    {
        keynum = e.which
    }

    if (keynum == 13) {
        document.getElementById('btnLogin').click();
    }
}

function OnLogInClick() {

    if (document.getElementById('username').value == '') {
        msgbox("用户名不能为空，请核对身份证信息重新登录！");
        return;
    } else {
        Ext.Ajax.request({
            url: AppUrl + 'cjy/login',
            method: 'POST',
            async: false,
            params: {
                UserName: document.getElementById('username').value,
                UserPassword: document.getElementById('password').value,
                UserIp: GetIP().ip,
                SS:window.screen.height+'*'+window.screen.width

            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (resp.V_INFO == "SUCCESS") {

                    //if (resp.list[0].V_PASSWORD == document.getElementById('password').value) {

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

                    if((resp.list[0].V_DEPTCODE.indexOf("9900")!=-1) || resp.list[0].V_ROLECODE=='15'){
                        location.href = "../../page/Anewhome/index.html";
                    }else{
                        location.href = "../../page/home/Index.html";
                    }
                } else {
                    alert(resp.V_INFO);
                    //msgbox("不存在此用户！");
                }
            }
        });
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
                if (resp != '') {
                    document.getElementById('username').value = resp;
                }
            }
        }
    });
}

function onTel() {
    $('#tel1').html("鞍山区域:15241262572");
    $('#tel2').html("弓长岭区域:15042275569");
}

//function OnCookies() {
//    Ext.Ajax.request({
//        url: AppUrl + 'info/login_getUrl',
//        params: {
//            LoginName: document.getElementById('username').value
//        }, success: function (respon) {
//            var resp = Ext.decode(respon.responseText);
//            if (resp.list.length>0) {
//                 for(var i = 0; i < resp.list.length; i++)
//                 {
//                    var iframe = document.createElement("iframe");
//                    iframe.style.display = "none";
//                    iframe.id = "iframe" + i;
//                    document.body.appendChild(iframe);
//                    document.getElementById("iframe" + i).src = resp.list[0].V_URL;
//                     if(i==resp.list.length-1){
//                         location.href = "../../page/Anewhome/index.html";
//                     }
//                 }
//            } else {
//                msgbox(resp.info);
//                location.href = "../../page/Anewhome/index.html";
//            }
//        }
//    });
//
//}

