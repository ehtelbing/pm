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
var win;//父窗口对象，由子窗口调用
var returnValue;//父窗口对象，由子窗口调用
var USERID = Ext.util.Cookies.get('v_personcode');
var PORP_VALUE = APP.substring(0, APP.length - 3);
var treeid="";
if (location.href.split('?')[1] != undefined) {
    if (Ext.urlDecode(location.href.split('?')[1]) != null) {
        menucode = Ext.urlDecode(location.href.split('?')[1]).v_menucode;
        menuname = Ext.urlDecode(location.href.split('?')[1]).v_menuname;
        v_url = Ext.urlDecode(location.href.split('?')[1]).v_url;
        menutype = Ext.urlDecode(location.href.split('?')[1]).menutype;
        treeid = Ext.urlDecode(location.href.split('?')[1]).treeid;
    }
}
var searchcontext = "%";
OnCookies();

Ext.Ajax.request({
    url: AppUrl + 'Kxy/insertSysPorperty',
    type: 'ajax',
    method: 'POST',
    async: false,
    params: {
        'V_V_PORP_NAME': 'sys-url-prefix',
        'V_V_PORP_VALUE': PORP_VALUE,
        'V_V_PLANT': 'all'
    },
    success: function (response) {
    }
});

var userFavoriteMenuStore = Ext.create('Ext.data.TreeStore', {
    storeId: 'userFavoriteMenuStore',
    autoLoad: true,
    pageSize: -1,
    fields: ['MENU_ID', 'V_MENUNAME', 'leaf', 'URL'],
    proxy: {
        url: AppUrl + 'Kxy/userFavoriteMenu',
        type: 'ajax',
        actionMethods: {
            read: 'POST'
        },
        async: true,
        extraParams: {
            A_USERID: Ext.util.Cookies.get('v_personcode')
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var userhistoryMenuStore = Ext.create('Ext.data.Store', {
    storeId: 'userhistoryMenuStore',
    autoLoad: true,
    pageSize: -1,
    fields: ['I_ID','V_USERID','V_INSERTDATE','V_ACTIVE',
        'V_REMARK','V_ACT_TYPE','V_IP','V_MENUNAME','V_URL' ],
    proxy: {
        url: AppUrl + 'cxy/MM_USER_TRENDS_SEL',
        type: 'ajax',
        actionMethods: {
            read: 'POST'
        },
        async: true,
        extraParams: {
            V_V_USERID: Ext.util.Cookies.get('v_personcode')
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
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
                                if (model.raw.type == 2) {
                                    if (model.raw.other == 0) {
                                        var owidth = window.document.body.offsetWidth;
                                        var oheight = window.document.body.offsetHeight;
                                        window.open(AppUrlFrame + model.raw.src, '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
                                    } else {
                                        var owidth = window.document.body.offsetWidth;
                                        var oheight = window.document.body.offsetHeight;
                                        window.open(model.raw.src, '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
                                    }
                                } else {
                                    if (model.raw.other == 0) {
                                        htmlStr = [
                                            '<iframe id="Workspace'
                                            , item.sid
                                            , '" name="Workspace'
                                            , item.sid
                                            , '" frameborder="0" width="100%" height="100%" src="'
                                            , AppUrlFrame + model.raw.src
                                            , '" />'
                                        ].join('')
                                    } else {
                                        htmlStr = [
                                            '<iframe id="Workspace'
                                            , item.sid
                                            , '" name="Workspace'
                                            , item.sid
                                            , '" frameborder="0" width="100%" height="100%" src="'
                                            , ''
                                            , +model.raw.src + "?v_mancode=" + Ext.util.Cookies.get('v_personcode')
                                            , '" />'
                                        ].join('');
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
                                /*//自动化设备管理
                                 htmlStr = [
                                 '<iframe id="Workspace',
                                 model.raw.id,
                                 '" name="Workspace',
                                 model.raw.id,
                                 '" frameborder="0" width="100%" height="100%" src="'
                                 + _geturl(model.raw.src, APP)
                                 + '" />'].join('');*/
                                insertHistory(model.data.id);
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
function insertHistory(active) {
    Ext.Ajax.request({
        url: AppUrl + 'cxy/MM_USER_TRENDS_INS',
        type: 'ajax',
        method: 'POST',
        async: false,
        params: {
            'V_V_USERID': USERID,
            'V_V_ACTIVE': active,
            'V_V_REMARK': '',
            'V_V_ACT_TYPE': '页面访问',
            'V_V_IP': ''
        },
        success: function (response) {
            userhistoryMenuStore.load();
        }
    });
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

var favoriteTreePanel = new Ext.create('Ext.tree.Panel', {
    id: 'favoriteTreePanel',
    baseCls: 'my-panel-no-border',
    store: userFavoriteMenuStore,
    frame: true,
    rootVisible: false,
    hideHeaders: true,
    columns: [{
        xtype: 'treecolumn',
        dataIndex: 'V_MENUNAME',
        flex: 1
    }],
    listeners: {
        'itemclick': function (view, record, item, index) {
            if (record.data.leaf) {
                //append(record.data.MENU_ID, record.data.V_MENUNAME, record.data.URL)//标签页
                var owidth = window.document.body.offsetWidth;
                var oheight = window.document.body.offsetHeight;
                window.open(record.data.URL, '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');//弹窗
            }
        },
        'itemcontextmenu': function (that, record, item, index, e, eOpts) {
            e.preventDefault();
            Ext.create('Ext.menu.Menu', {
                autoDestroy: true,
                width: 100,
                margin: '0 0 10 0',
                items: [{
                    sid: record.data.MENU_ID,
                    text: '设置/取消首页'
                }, {
                    sid: record.data.MENU_ID,
                    text: '移出收藏'
                }, '-', {
                    text: '取消'
                }],
                listeners: {
                    click: function (menu, item, e, eOpts) {
                        if (item.text == '设置/取消首页') {
                            _setHomeMenu(item.sid);

                        } else if (item.text == '移出收藏') {
                            _deleteFavoriteMenu(item.sid);
                        }

                    }
                }
            }).showAt(e.getXY());
        }
    }
});
var historyTreePanel = new Ext.create('Ext.grid.Panel', {
    id: 'historyTreePanel',
    baseCls: 'my-panel-no-border',
    store: userhistoryMenuStore,
    frame: true,
    rootVisible: false,
    hideHeaders: true,
    columns: [{
        dataIndex: 'V_MENUNAME',
        align: 'left',
        width: '100%'
    }],
    listeners: {
        'itemclick': function (view, record, item, index) {
                //append(record.data.MENU_ID, record.data.V_MENUNAME, record.data.URL)//标签页
                var owidth = window.document.body.offsetWidth;
                var oheight = window.document.body.offsetHeight;
                window.open(AppUrlFrame +record.data.V_URL, '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');//弹窗
                insertHistory(record.data.V_ACTIVE);
        }
    }
});
var searchPanel = Ext.create('Ext.Panel', {
    id : 'searchPanel',
    header : false,
    frame : true,
    layout : 'column',
    defaults : {
        labelAlign : 'right',
        // labelWidth : 100,
        // inputWidth : 200,
        margin : '4,0,0,0'
    },
    items : [
        {
            xtype: 'textfield',
            id: 'searchtext',
             fieldLabel: ' ',
            labelSeparator: '',
            style: { background: 'url('+imgpath + '/search.png) no-repeat left center'},
            labelWidth: 15,
            width: 180,
            emptyText:'点检',
            listeners :{
                specialKey :function(field,e){
                    if (e.getKey() == Ext.EventObject.ENTER) _changeMenu();

                }
                // , 'focus': function(f){

                //     this.selectText();
                //     // Ext.getCmp('searchtext').setValue('');
                // }

            }
        }

    ]
});
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
            // title: '菜单',
            id:'menutree',
            titleAlign: 'center',
            width: 200,
            layout: 'accordion',
            items: accordions,
            region: 'center'
        }), {
            id: 'favorite',
            xtype: 'panel',
            title: '收藏',
            titleAlign: 'center',
            region: 'north',
            layout: 'fit',
            height: 260,
            border: false,
            //collapsed: true,
            collapsible: true,
            items: [favoriteTreePanel]
        }, {
            id: 'history',
            xtype: 'panel',
            title: '历史',
            titleAlign: 'center',
            region: 'north',
            layout: 'fit',
            height: 260,
            border: false,
            collapsed: true,
            collapsible: true,
            items: [historyTreePanel]
        }, {
            id: 'search',
            xtype: 'panel',
            title: '菜单',
            titleAlign: 'center',
            region: 'north',
            layout: 'fit',
            height: 68,
            border: false,
            // collapsed: true,
            // collapsible: true,
            items: [searchPanel]
        },
            {
                xtype: 'panel',
                title: '个人信息',
                titleAlign: 'center',
                region: 'south',
                layout: 'column',
                height: 180,
                border: false,
                collapsed: true,
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
    append('Index', '首页', AppUrl + "page/home/home" + ".html", false);//原有的
    // append('Index', '首页', AppUrl + "page/home/home21" + ".html", false);
    var header = _CreateHeader();
    Ext.Ajax.request({
        url: AppUrl + 'tree/PRO_BASE_NEW_MENU_SEL',
        params: {
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
            Ext.ComponentManager.get('favorite').collapse();
            Ext.getBody().unmask();
            _getHomeMenu();
           if (treeid != "" && treeid != null) {
                refreshTree(treeid);
            }
            //GETDDDL();
        }
    });
    if (menucode != "" && menucode != null) {
        window.parent.append(menucode, menuname, APP + v_url);
    }
}

Ext.onReady(OnPageLoaded);
function searchMenu() {
    Ext.getCmp('menutree').removeAll();
    Ext.Ajax.request({
        url: AppUrl + 'cxy/PRO_BASE_NEW_MENU_BYNAME_SEL',
        params: {
            IS_V_ROLECODE: Ext.util.Cookies.get('v_rolecode'),
            IS_V_SYSTYPE: '1',
            V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
            V_V_HOME_MENU: menutype,
            V_V_MENUNAME:searchcontext
        },
        method: 'post',
        sync: true,
        success: function (response) {
            var result = Ext.decode(response.responseText);
            var Accordions = _AssembleAccordions(result); // tree
            Ext.getCmp('menutree').add(Accordions);
            //GETDDDL();
        }
    });
    // if (menucode != "" && menucode != null) {
    //     window.parent.append(menucode, menuname, APP + v_url);
    // }
}
function Close() {
    window.close();
}
function refreshTree(pid){

    Ext.getCmp('menutree').removeAll();
    Ext.Ajax.request({
        url: AppUrl + 'tree/PRO_BASE_NEW_MENU_SELNEW',
        params: {
            IS_V_ROLECODE: '00',
            IS_V_PID:pid
        },
        method: 'post',
        sync: true,
        success: function (response) {
            var result = Ext.decode(response.responseText);
            var Accordions = _AssembleAccordions(result); // tree
            Ext.getCmp('menutree').add(Accordions);
        }
    });
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
    // sys_log_insert_noip("注销系统", "注销系统", "注销系统", Ext.util.Cookies
    //         .get('v_loginname'), Ext.util.Cookies.get('v_personcode'),
    //     Ext.util.Cookies.get('v_personname2'), 1, "注销系统");
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
function JstPage(){
    var jstlogcode="";
    var jstpass="";
    Ext.Ajax.request({
        id: 'selUdtDuty',
        url: AppUrl + 'basic/BASE_PRO_JST_CODESEL2',
        method: 'POST',
        async: false,
        params: {
            V_V_PERCODE:USERID
        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText);

            jstlogcode=resp.V_INFO[0].V_JST;
            jstpass=resp.V_INFO[0].V_PASSWORD;
            if(jstlogcode!=""&&jstpass!=""){
                location.href="http://10.101.10.46:8088/PersonCenter-AK/Auth/home?loginname="+jstlogcode+"&password="+jstpass;
            }else{
                Ext.MessageBox.alert("提示","即时通账号或密码不存在");
            }

        }});

}
/*function GETDDDL() {
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
 }*/

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

function _setHomeMenu(MENUID) {
    Ext.Ajax.request({
        url: AppUrl + 'Kxy/setHomeMenu',
        type: 'ajax',
        method: 'POST',
        async: false,
        params: {
            'A_USERID': USERID,
            'A_MENUID': MENUID
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.RET != null && resp.RET == 'Success') {
                _getHomeMenu();
                Ext.Msg.alert('操作信息', '设置/取消首页成功');
            } else {
                Ext.Msg.alert('操作信息', '设置/取消首页失败');
            }
        }
    });
}

function _getHomeMenu() {
    Ext.Ajax.request({
        url: AppUrl + 'Kxy/getHomeMenu',
        type: 'ajax',
        method: 'POST',
        async: false,
        params: {
            'A_USERID': USERID
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.success) {
                if (resp.list != null) {
                    for (var i = 0; i < resp.list.length; i++) {
                        append(resp.list[i].I_MENUID, resp.list[i].V_MENUNAME, resp.list[i].URL);
                    }
                }
            } else {
                Ext.Msg.alert('操作信息', '获取首页失败');
            }
        }
    });
}

function _deleteFavoriteMenu(MENUID) {//删除收藏
    Ext.Ajax.request({
        url: AppUrl + 'Kxy/deleteFavoriteMenu',
        type: 'ajax',
        method: 'POST',
        async: false,
        params: {
            'A_USERID': USERID,
            'A_MENUID': MENUID
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.RET != null && resp.RET == 'Success') {
                var records = Ext.getCmp('favoriteTreePanel').getSelectionModel().getSelection();
                records[0].remove();
                Ext.Msg.alert('操作信息', '移除收藏成功');
            } else {
                Ext.Msg.alert('操作信息', '移除收藏失败');
            }
        }
    });
}

function InsertFavoriteMenu() {//新增收藏（批量），已收藏页面将不会显示在选择列表中
    returnValue = null;
    win = Ext.create('Ext.window.Window', {
        title: '添加收藏',
        modal: true,
        autoShow: true,
        maximized: false,
        maximizable: true,
        width: 560,
        height: 420,
        html: '<iframe src="' + AppUrl + 'page/home/favorite2.html?menutype=' + menutype + '", style="width: 100%; height: 100%;" frameborder="0"></iframe>',
        listeners: {
            close: function (panel, eOpts) {
                if (returnValue != null) {
                    var FavoriteMenu = returnValue;//获得待收藏页面的代码
                    var MENUID_LIST = new Array();
                    for (var i = 0; i < FavoriteMenu.length; i++) {
                        MENUID_LIST.push(FavoriteMenu[i].data.V_MENUCODE);
                    }
                    Ext.Ajax.request({
                        url: AppUrl + 'Kxy/insertFavoriteMenuList',
                        type: 'ajax',
                        method: 'POST',
                        async: false,
                        params: {
                            'A_USERID': USERID,
                            'MENUID_LIST': MENUID_LIST
                        },
                        success: function (response) {
                            var resp = Ext.decode(response.responseText);
                            if (resp.success) {
                                Ext.getCmp("favoriteTreePanel").getStore().reload();
                                Ext.Msg.alert('操作信息', '添加收藏成功');
                            } else {
                                Ext.Msg.alert('操作信息', '添加收藏失败');
                            }
                        },
                        failure: function (response) {
                            Ext.MessageBox.show({
                                title: '错误',
                                msg: response.responseText,
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                        }
                    });
                }
            }
        }
    });
}

function OnCookies() {
    Ext.Ajax.request({
        url: AppUrl + 'info/login_getUrl',
        params: {
            LoginName: Ext.util.Cookies.get('v_personcode')
        }, success: function (respon) {
            var resp = Ext.decode(respon.responseText);
            if (resp.list.length>0) {
                for(var i = 0; i < resp.list.length; i++)
                {
                    var iframe = document.createElement("iframe");
                    iframe.style.display = "none";
                    iframe.id = "iframe" + i;
                    document.body.appendChild(iframe);
                    document.getElementById("iframe" + i).src = resp.list[i].V_URL;

                }
            } else {
                msgbox(resp.info);
            }
        }
    });

}

function _changeMenu() {
    if(Ext.getCmp('searchtext').getValue()!=null && Ext.getCmp('searchtext').getValue()!=''){
        searchcontext=Ext.getCmp('searchtext').getValue();
    }else{
        searchcontext=Ext.getCmp('searchtext').emptyText;
    }
    searchMenu();
}

