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

document.write('<script type="text/javascript" charset="UTF-8" src="../../../pm/resources/shared/examples.js"></script>');

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