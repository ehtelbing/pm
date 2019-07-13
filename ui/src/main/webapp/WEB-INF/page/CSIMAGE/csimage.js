var usercodeTemp = '';
var ip='';
if (location.href.split('?')[1] != null) {
    usercodeTemp = Ext.urlDecode(location.href.split('?')[1]).USERID;
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