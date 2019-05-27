var usercodeTemp = '';
var ip='';
if (location.href.split('?')[1] != null) {
    usercodeTemp = Ext.urlDecode(location.href.split('?')[1]).LogUser;
    IP = Ext.urlDecode(location.href.split('?')[1]).IP;
}

function getPath() {
    var _location = document.location.toString();
    var applicationNameIndex = _location.indexOf('/',
        _location.indexOf('://') + 3);
    var applicationName = _location.substring(0, applicationNameIndex) + '/';
    var webFolderIndex = _location.indexOf('/', _location
        .indexOf(applicationName)
    + applicationName.length);
    var webFolderFullPath = _location.substring(0, webFolderIndex);
    return webFolderFullPath;
}
function getIpPort() {
    var _location = document.location.toString();
    var applicationNameIndex = _location.indexOf('/',
        _location.indexOf('://') + 3);
    var applicationName = _location.substring(0, applicationNameIndex) + '/';
    return applicationName;
}
// 自动化设备管理
var AutoApp = getIpPort() + "AutoDeviceManage";

var myAPP = getPath();

var APP = myAPP;
var AppUrl = APP + '/app/pm/';
var AppUrlFrame = APP + '/app/pm';

var imgpath = APP + '/app/pm/images/gif';
var dxImgPath=APP+'/app/pm/css/images';

document.write('<script type="text/javascript" charset="UTF-8" src="../../../pm/resources/shared/examples.js"></script>');

var b=new Base64()
if (!(usercodeTemp == null)) {

    Ext.Ajax.request({
        url: AppUrl + 'info/login_dddl_n',
        params: {
            USERID: b.decode(usercodeTemp),
            V_V_IP: ip?"":'设备单点登录'
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
            else{
                Ext.Msg.alert('提示消息','用户不存在');
            }
        }
    });

}
else{
    if(Ext.util.Cookies.get('v_personcode')==undefined||Ext.util.Cookies.get('v_personcode')==''){
        var currentUrl = window.location.href;
        var eam_singlelogin_url = 'http://10.103.5.70:8080/oauth/authorize?client_id=e1fe5be3291e42bd9d350285074f0e2d&response_type=code&scope=user_info&redirect_uri=http%3A%2F%2F10.103.5.54%3A8080%2FORG_LDAP%2Fhuidiao.action%3FReferer='+currentUrl;

        parent.location.href = eam_singlelogin_url;
        setTimeout("subSomething()",10000);
    }
}

function subSomething() {
    //当页面加载状态
    if(document.readyState == "complete") {
        location.href = "../../page/login/login.html";
    }
}

// Excel
function createElement(elName, elValue) {
    var el = document.createElement("input");
    el.type = "hidden";
    el.value = elValue;
    el.name = elName;
    return el;
}
function createFrom(action) {
    var f = document.createElement("form");
    f.setAttribute("method", "post");
    document.body.appendChild(f);
    f.action = action;
    return f;
}
// 导出Excel
function submitData(url, tableName, tableKey, parName, parType, parVal,
                    proName, returnStr, returnStrType, returnStrName, cursorName, type,
                    ExcelName) {

    var tableName = createElement("tableName", tableName.join(","));
    var tableKey = createElement("tableKey", tableKey.join(","));
    var parName = createElement("parName", parName.join(","));
    var parType = createElement("parType", parType.join(","));
    var parVal = createElement("parVal", parVal.join(","));
    var proName = createElement("proName", proName);
    var returnStr = createElement("returnStr", returnStr.join(","));
    var returnStrType = createElement("returnStrType", returnStrType.join(","));
    var returnStrName = createElement("returnStrName", returnStrName.join(","));
    var cursorName = createElement("cursorName", cursorName);
    var type = createElement("type", type); // "total"
    var ExcelName = createElement("ExcelName", ExcelName);

    var from = createFrom(url); // "ModelExcelTotal"
    from.appendChild(tableName);
    from.appendChild(tableKey);
    from.appendChild(parName);
    from.appendChild(parType);
    from.appendChild(parVal);
    from.appendChild(proName);
    from.appendChild(returnStr);
    from.appendChild(returnStrType);
    from.appendChild(returnStrName);
    from.appendChild(type);
    from.appendChild(ExcelName);
    from.submit();
}

GetIP = function () {
    var result = new Object();
    Ext.Ajax.request({
        url: APP + '/app/pm/info/GetUserIp',
        params: {},
        method: 'POST',
        async: false,
        success: function (response) {
            result.ip = response.responseText;
        }
    });
    return result;
};

function excelProtect(str) {
    if (str == undefined)
        return 'kong';
    if (str == null)
        return 'kong';
    if (str == '')
        return 'kong';
    if (str == '%')
        return 'all';
    return str;
}
function getIP() {
    var redata;
    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: APP + '/Home/GetIP',
        params: {},
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            redata = resp;
        }
    });
    return redata;
}

// 日志说明 ,日志类型 ,日志详细信息 ,操作ip,操作人员账号,操作人编码 ,操作人名称 ,操作状态(0:失败/1:成功),日志对象类型
function sys_log_insert(log_description, log_type, log_info, log_ip,
                        login_account, person_code, person_name, status, object_type) {
    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: APP + '/LCY034',
        params: {
            parVal: [log_description, log_type, log_info, log_ip,
                login_account, person_code, person_name, status,
                object_type]
        },
        success: function (response) {
        }
    });
}
function sys_log_insert_noip(log_description, log_type, log_info,
                             login_account, person_code, person_name, status, object_type) {
    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: APP + '/LCY034',
        params: {
            parVal: [log_description, log_type, log_info, getIP(),
                login_account, person_code, person_name, status,
                object_type]
        },
        success: function (response) {
        }
    });
}

// 聚进接口调用过程
function otherServer(V_V_ORDERGUID, status, emg) {
    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: APP + '/LCY035',
        params: {
            parVal: [V_V_ORDERGUID]
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp[2] == "成功") {
                Ext.Ajax.request({
                    method: 'POST',
                    async: false,
                    url: APP + '/Home/OtherService',
                    params: {
                        tasktickedid: resp[0],
                        orderid: resp[1],
                        status: status,
                        emg: emg
                    },
                    success: function (response) {
                        var resp = Ext.decode(response.responseText);

                    }
                });
            }
        }
    });
};

//小神探接口调用过程
function xstServer(V_V_ORDERGUID, status, emg) {
    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: APP + '/LCY037',
        params: {
            parVal: [V_V_ORDERGUID]
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp[2] == "成功") {
                Ext.Ajax.request({
                    method: 'POST',
                    async: false,
                    url: APP + '/Home/XSTService',
                    params: {
                        tasktickedid: resp[0],
                        orderid: resp[1],
                        status: status,
                        emg: emg
                    },
                    success: function (response) {
                        var resp = Ext.decode(response.responseText);

                    }
                });
            }
        }
    });
};

function OnPageMMLogin(){
    Ext.Ajax.request({
        url: AppUrl + 'basic/BASE_PERSEL_BYJST',
        params: {
            V_V_JSTCODE: usercode
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

            }
        }
    });
}

window._console = window.console;//将原始console对象缓存

window.console = (function (orgConsole) {

    return {//构造的新console对象

        log: getConsoleFn("log"),

        debug: getConsoleFn("debug"),

        info: getConsoleFn("info"),

        warn: getConsoleFn("warn"),

        exception: getConsoleFn("exception"),

        assert: getConsoleFn("assert"),

        dir: getConsoleFn("dir"),

        dirxml: getConsoleFn("dirxml"),

        trace: getConsoleFn("trace"),

        group: getConsoleFn("group"),

        groupCollapsed: getConsoleFn("groupCollapsed"),

        groupEnd: getConsoleFn("groupEnd"),

        profile: getConsoleFn("profile"),

        profileEnd: getConsoleFn("profileEnd"),

        count: getConsoleFn("count"),

        clear: getConsoleFn("clear"),

        time: getConsoleFn("time"),

        timeEnd: getConsoleFn("timeEnd"),

        timeStamp: getConsoleFn("timeStamp"),

        table: getConsoleFn("table"),

        error: getConsoleFn("error"),

        memory: getConsoleFn("memory"),

        markTimeline: getConsoleFn("markTimeline"),

        timeline: getConsoleFn("timeline"),

        timelineEnd: getConsoleFn("timelineEnd")

    };

    function getConsoleFn(name) {

        return function actionConsole() {

            if (typeof (orgConsole) !== "object") return;

            if (typeof (orgConsole[name]) !== "function") return;//判断原始console对象中是否含有此方法，若没有则直接返回

            return orgConsole[name].apply(orgConsole, Array.prototype.slice.call(arguments));//调用原始函数

        };

    }

}(window._console));

function Base64() {
    // private property
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}