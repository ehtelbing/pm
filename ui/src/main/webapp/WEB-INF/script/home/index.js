/**
 * Created by zjh on 2017/1/19.
 */
Ext.Loader.setPath('Ext.ux', '../../../pm/resources/shared/ux');
var Index = "";
var Accordions = [];
var sidebar = [];
var body = [];
var menucode = "";
var menuname = "";
var v_url = "";
var menutype = "";
if (location.href.split('?')[1] != undefined) {
    if (Ext.urlDecode(location.href.split('?')[1]) != null) {
        menucode = Ext.urlDecode(location.href.split('?')[1]).v_menucode;
        menuname = Ext.urlDecode(location.href.split('?')[1]).v_menuname;
        v_url = Ext.urlDecode(location.href.split('?')[1]).v_url;
        menutype = Ext.urlDecode(location.href.split('?')[1]).menutype;
    }
}
var container = Ext.create('Ext.tab.Panel', {
    id: 'container',
    region: 'center',
    animCollapse: false,
    plugins: Ext.create('Ext.ux.TabCloseMenu', {
        closeTabText: '关闭',
        closeAllTabsText: '关闭所有',
        closeOthersTabsText: '关闭其他'
    })
});
function append(item, title, link) {
    var container = Ext.getCmp('container');
    var closable = arguments[3] === undefined ? true : false;
    var tab = container.items.map[item];
    if (tab === undefined) {
        tab = Ext.create('Ext.panel.Panel', {
            id: item,
            title: title,
            closable: closable,
            html: [
                '<iframe id="Workspace',
                item,
                '" name="Workspace',
                item,
                '" frameborder="0" width="100%" height="100%" src="' + link
                + '" />'].join('')
        });
        container.add(tab);
        container.setActiveTab(tab);
    } else {
        container.setActiveTab(tab);
    }
}

function _AssembleAccordions(data) {
    if (data == "") {
    } else {
        var array = [];
        Ext.Array.each(data, function (item) {
            var tree = Ext.create('Ext.panel.Panel', {
                border: false,
                title: item.title,
                cls: item.cls,
                layout: 'fit',
                items: [Ext.create('Ext.tree.Panel', {
                    id: 'tree' + item.id,
                    border: false,
                    rootVisible: false,
                    header: false,
                    hideHeaders: true,
                    store: Ext.create('Ext.data.TreeStore', {
                        root: {
                            expanded: true,
                            children: item.children
                        }
                    }),
                    listeners: {
                        itemclick: function (view, model, element, index, e) {
                            e.preventDefault();
                            var htmlStr = '';
                            if (model.childNodes.length != 0) {
                            } else {
                                //自动化设备管理
                                htmlStr = [
                                    '<iframe id="Workspace',
                                    model.raw.id,
                                    '" name="Workspace',
                                    model.raw.id,
                                    '" frameborder="0" width="100%" height="100%" src="'
                                    + _geturl(model.raw.src, APP)
                                    + '" />'].join('');
                            }
                            if (model.raw.leaf) {
                                var tab = container.items.map[model.raw.id];
                                if (tab === undefined) {
                                    tab = Ext.create('Ext.panel.Panel', {
                                        id: model.raw.id,
                                        title: model.raw.text,
                                        closable: true,
                                        html: htmlStr
                                    });
                                    container.add(tab);
                                    container.setActiveTab(tab);
                                } else {
                                    container.setActiveTab(tab);
                                }
                            }
                        }
                    }
                })]
            });
            array.push(tree);
        });
        return array;
    }
}
function _geturl(s_src, s_app) {
    s_app = s_app + "/app/pm";
    var s_url = '';
    s_url = s_src.length > 4 ? s_src.substring(0, 4) == 'http' ? '' : s_app
        : s_app;
    s_url = s_url + s_src;
    return s_url;
}
function _CreateHeader() {
    return Ext.create('Ext.panel.Panel', {
        region: 'north',
        height: 70,
        maxHeight: 70,
        split: true,
        collapsible: true,
        collapseMode: 'mini',
        preventHeader: true,
        contentEl: 'HeaderPanel'
    });
}

function _CreateSidebar(accordions) {
    return Ext.create('Ext.panel.Panel', {
        region: 'west',
        layout: 'border',
        width: 200,
        split: true,
        collapsible: true,
        collapseMode: 'mini',
        preventHeader: true,
        items: [Ext.create('Ext.panel.Panel', {
            title: '菜单',
            titleAlign: 'center',
            width: 200,
            layout: 'accordion',
            items: accordions,
            region: 'center'
        }),
            {
                xtype: 'panel',
                title: '个人信息',
                titleAlign: 'center',
                region: 'south',
                layout: 'column',
                height: 180,
                border: false,
                collapsed:false,
                collapsible: true,
                items: [
                    {
                        xtype: 'displayfield',
                        fieldLabel: '单位名称:',
                        labelAlign: 'right',
                        margin: '5 0 0 0',
                        labelWidth: 70,
                        value: Ext.util.Cookies.get('v_orgname2')
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel: '作业区名称',
                        labelAlign: 'right',
                        labelWidth: 70,
                        value: Ext.util.Cookies.get('v_deptname2')
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel: '姓名',
                        labelAlign: 'right',
                        labelWidth: 70,
                        value: Ext.util.Cookies.get('v_personname2')
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel: '岗位',
                        labelAlign: 'right',
                        labelWidth: 70,
                        value: decodeURI(Ext.util.Cookies.get('v_postname'))
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel: '角色',
                        labelAlign: 'right',
                        labelWidth: 70,
                        value: decodeURI(Ext.util.Cookies.get('v_rolename'))
                    }]
            }]
    });
}

function _CreateWorkspace() {
    return Ext.create('Ext.panel.Panel', {
        region: 'center',
        contentEl: 'Workspace'
    });
}

function _CreateViewport(header, sidebar, workplace) {
    var object = Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [header, sidebar, workplace]
    });
    return object;
}

function OnPageLoaded() {
    if (Ext.util.Cookies.get('v_rolecode') == null) {
        location.href = AppUrl + 'page/login/login' + ".html";
    }
    Ext.getBody().mask('<p>设备管理系统</p><p>系统加载中...</p>');
    var Accordions;
    append('Index', '首页', AppUrl + "page/home/home" + ".html", false);
    var header = _CreateHeader();
    Ext.Ajax.request({
        //url : AppUrl + 'tree/NewMenuTree',
        url: AppUrl + 'tree/PRO_BASE_NEW_MENU_SEL',
        params: {
            /*RoleCode : Ext.util.Cookies.get('v_rolecode'),
             DEPTCODE : Ext.util.Cookies.get('v_orgCode'),
             MENUTYPE:menutype*/

            IS_V_ROLECODE: Ext.util.Cookies.get('v_rolecode'),
            IS_V_SYSTYPE: '1',
            V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
            V_V_HOME_MENU: menutype
        },
        method: 'post',
        sync: true,
        success: function (response) {
            var result = Ext.decode(response.responseText);
            var Accordions = _AssembleAccordions(result); // tree
            var sidebar = _CreateSidebar(Accordions);
            _CreateViewport(header, sidebar, container);
            Ext.getBody().unmask();
            GETDDDL();
        }
    });
    if (menucode != "" && menucode != null) {
        window.parent.append(menucode, menuname, APP + v_url);
    }
}

Ext.onReady(OnPageLoaded);

function Close() {
    window.close();
}

function CloseWorkItem(item) {
    var workspace = Ext.ComponentManager.get('container');
    var tab = workspace.items.map[item];
    if (tab)
        tab.close();
}

function LogOut() {
    location.href = AppUrl + 'page/login/login' + ".html";
    // 日志说明 ,日志类型 ,日志详细信息 ,操作人员账号,操作人编码 ,操作人名称 ,操作状态(0:失败/1:成功),日志对象类型
    sys_log_insert_noip("注销系统", "注销系统", "注销系统", Ext.util.Cookies
            .get('v_loginname'), Ext.util.Cookies.get('v_personcode'),
        Ext.util.Cookies.get('v_personname2'), 1, "注销系统");
}

function Return() {
    //if (confirm('您确定退出系统吗？')) {
    window.close();
    location.href = AppUrl + 'page/home/findex' + ".html";
    // 日志说明 ,日志类型 ,日志详细信息 ,操作人员账号,操作人编码 ,操作人名称 ,操作状态(0:失败/1:成功),日志对象类型
    /* sys_log_insert_noip("退出系统", "退出系统", "退出系统", Ext.util.Cookies
     .get('v_loginname'), Ext.util.Cookies.get('v_personcode'),
     Ext.util.Cookies.get('v_personname2'), 1, "退出系统");*/
    //}
}

function HomePage() {
    if (document.getElementById("sy_a").href == "#") {
        Ext.example.msg('操作信息', '无授权');
        return;
    }

}
function GETDDDL() {
    // 转小神探单点登陆地址PRO_BASE_PERSON_DDDL_GETURL
    $.ajax({
        url: AppUrl + 'info/login_xst',
        type: 'post',
        async: false,
        data: {
            V_V_LOGINNAME: Ext.util.Cookies.get('v_personcode'),
            V_V_TYPE: 'AAAdibAAyAAAASNXST'
        },
        traditional: true,
        success: function (resp) {
            if (resp == '无授权') {
                // Ext.example.msg('操作信息', resp[0]);
                document.getElementById("sy_a").href = "#";
            } else {
                if (resp != '') {
                    // window.open(resp[0]) ;//打开网址
                    document.getElementById("sy_a").href = resp;
                } else {
                    // Ext.example.msg('操作信息', '无授权');
                    document.getElementById("sy_a").href = "#";
                }
            }
        }
    });
}

/*
 * 通过工单号处理工单
 * */

function GoPage() {
    $.ajax({
        url: AppUrl + 'info/PRO_GO',
        type: 'post',
        async: false,
        data: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_ORDERID: $("#kjcl").val()
        },
        traditional: true,
        success: function (resp) {
            if (resp[0] != '成功') {
                Ext.Msg.alert('操作信息', resp[0]);
            } else {
                if (resp[1] != '' && resp[1] != null) {
                    window.parent.append(resp[1], '工单处理', AppUrl + resp[1]);
                } else {
                    Ext.Msg.alert('操作信息', '工单号错误请重新输入！');
                }
            }
        }
    });
}

function OnKeypress(e) {
    var keynum;
    if (window.event) // IE
    {
        keynum = e.keyCode;
    } else if (e.which) // Netscape/Firefox/Opera
    {
        keynum = e.which;
    }

    if (keynum == 13) {
        document.getElementById('GoPage').click();
    }
}

function ClearText() {
    $('#kjcl').val('');
}
function isAutoApp(menuId) {
    if (menuId.substring(0, 4) == 'Auto') {
        return true;
    }
    return false;
}