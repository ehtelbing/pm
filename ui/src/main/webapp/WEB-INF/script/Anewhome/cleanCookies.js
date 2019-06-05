/**
 * Created by zjh on 2017/1/19.
 */

Ext.onReady(function () {
    Login();
});

function Login() {
    if (Ext.urlDecode(location.href.split('?')[1]).USERID != null && Ext.urlDecode(location.href.split('?')[1]).USERID != '') {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if(keys) {
            for(var i = keys.length; i--;) {Ext.util.Cookies.set(keys[i],"")}
        }
    }
}

