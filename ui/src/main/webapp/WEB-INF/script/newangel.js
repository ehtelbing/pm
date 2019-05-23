var usercodeTemp = null;
if (location.href.split('?')[1] != null) {
    usercodeTemp = Ext.urlDecode(location.href.split('?')[1]).USERID;
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


if (!(usercodeTemp == null)) {
    Ext.Ajax.request({
        url: AppUrl + 'info/login_dddl_n',
        params: {
            USERID: usercodeTemp,
            V_V_IP: '设备平台单点登陆'
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
        var eam_singlelogin_url = 'http://10.103.5.70:8080/oauth/authorize?client_id=e1fe5be3291e42bd9d350285074f0e2d&response_type=code&scope=user_info&redirect_uri=http%3A%2F%2F10.103.5.54%3A8080%2FORG_LDAP%2Fhuidiao.action&Referer='+currentUrl;
        location.href = eam_singlelogin_url;
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