
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
