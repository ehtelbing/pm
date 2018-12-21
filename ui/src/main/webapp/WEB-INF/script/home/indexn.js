
//if (location.href.split('?')[1] != undefined) {
//    if (Ext.urlDecode(location.href.split('?')[1]) != null) {
//        plant = Ext.urlDecode(location.href.split('?')[1]).plant;
//
//    }
//}

Ext.onReady(function() {
    var westtreeStore = Ext.create("Ext.data.TreeStore", {
        autoLoad : false,
        storeId: 'westtreeStore',
        autoScroll : true,
        proxy: {
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            url: AppUrl + 'pm_19/deptTree',
            reader: {
                type: 'json'
            },
            root: {
                expanded: true
            },
            extraParams: {
                V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode')//plant
            }
        }
    });
    var westtree = Ext.create("Ext.tree.Panel", {
        id: 'westtree',
        region: 'center',
        height: 440,
        width: '100%',
        //frame: true,
        autoScroll : true,
        rootVisible: false,
        store: westtreeStore,
        //listeners: {
        //    itemclick: WestTreeOnClick
        //},
        renderTo: 'mybmTree'
    });
    var centertreeStore = Ext.create("Ext.data.TreeStore", {
        storeId : 'centertreeStore',
        autoLoad : true,
        autoScroll : true,
        rootVisible : false,
        proxy: {
            type: 'ajax',
            url: AppUrl + 'pm_19/DepartAndEquTree',
            extraParams: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_loginname'),
                V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode')//'99060206'
            },
            actionMethods: {
                read: 'POST'
            }
        }
    });
    var centertree = Ext.create("Ext.tree.Panel", {
        id : 'centertree',
        region : 'center',
        height: 440,
        width : '100%',
        //frame: true,
        autoScroll : true,
        rootVisible : false,
        store : centertreeStore,
        renderTo: 'mysbTree'
        //listeners : {
        //    itemclick : CenterTreeOnClick
        //}
    });
    //var userFavoriteMenuStore = Ext.create('Ext.data.TreeStore', {
    //    storeId: 'userFavoriteMenuStore',
    //    autoLoad: true,
    //    pageSize: -1,
    //    fields: ['MENU_ID', 'V_MENUNAME', 'leaf', 'URL'],
    //    proxy: {
    //        url: AppUrl + 'Kxy/userFavoriteMenu',
    //        type: 'ajax',
    //        actionMethods: {
    //            read: 'POST'
    //        },
    //        async: true,
    //        extraParams: {
    //            A_USERID: Ext.util.Cookies.get('v_personcode')
    //        },
    //        reader: {
    //            type: 'json',
    //            root: 'list'
    //        }
    //    }
    //});
    //
    //var favoriteTreePanel = new Ext.create('Ext.tree.Panel', {
    //    id: 'favoriteTreePanel',
    //    baseCls: 'my-panel-no-border',
    //    store: userFavoriteMenuStore,
    //    //frame: true,
    //    height: 80,
    //    width : '100%',
    //    autoScroll : true,
    //    rootVisible: false,
    //    hideHeaders: true,
    //    columns: [{
    //        xtype: 'treecolumn',
    //        dataIndex: 'V_MENUNAME',
    //        flex: 1
    //    }],
    //    listeners: {
    //        'itemclick': function (view, record, item, index) {
    //            if (record.data.leaf) {
    //                //append(record.data.MENU_ID, record.data.V_MENUNAME, record.data.URL)//标签页
    //                var owidth = window.document.body.offsetWidth;
    //                var oheight = window.document.body.offsetHeight;
    //                window.open(record.data.URL, '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');//弹窗
    //            }
    //        }
    //
    //    },
    //    //renderTo: 'wdsc'
    //});

    //Ext.ComponentManager.get('section').on("change", function() {
    //    Ext.getCmp('centertree').store.setProxy({
    //        type : 'ajax',
    //        url : AppUrl + 'pm_19/DepartAndEquTree',
    //        extraParams : {
    //            V_V_PERSONCODE : 'aqlzliang',
    //            V_V_DEPTCODENEXT : ''
    //        },
    //        actionMethods : {
    //            read : 'POST'
    //        }
    //    });
    //    Ext.getCmp('centertree').store.load();
    //});


});
//Ext.create('Ext.container.Viewport', {
//    split : true,
//    autoScroll : true,
//    layout : 'border',
//    items : [ tree, centertree, northpanel, eastgridpanel ]
//});
var noticeStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'noticeStore',
    fields: ['ID', 'TITLE', 'CONTENT', 'PERSONNAME', 'UPLOADTIME', 'DISPLAY', 'FILENAME', 'FILETYPE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'Wsy/PM_HOME_NOTICE_SEL',//需要存储过程！
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {}
    },
    listeners: {
        load: function () {
            notice();
        }
    }
});
var userFavoriteStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'userFavoriteStore',
    fields: ['MENU_ID', 'V_MENUNAME', 'leaf', 'URL'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'Kxy/userFavoriteMenu',//需要存储过程！
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            A_USERID: Ext.util.Cookies.get('v_personcode')
        }
    },
    listeners: {
        load: function () {
            favorite();
        }
    }
});
// 厂矿change
function DeptTree(){

    document.getElementById('mysbTree').style.display='none';
    document.getElementById('mybmTree').style.display='block';
    Ext.getCmp('westtree').store.reload();
}
function MyEqu(){

    document.getElementById('mybmTree').style.display='none';
    document.getElementById('mysbTree').style.display='block';
}

//function WestTreeOnClick(aa, record, item, index, e, eOpts) {
//    if (record.data.leaf == true) {
//        personid = record.data.id;
//    }
//}
//function xx(){
//    window.open(AppUrl +'page/PM_2104/index.html' , '我的收藏', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');//弹窗
//    alert('333');//append('Index', '首页', AppUrl + "page/home/home" + ".html", false);
//    document.getElementById('dbsx').innerHTML='<object type="text/html" data="'+AppUrl +'page/PM_2104/index.html " width="100%" height="100%"></object>';
//};
Ext.onReady(OnPageLoaded);
function OnPageLoaded() {
    Ext.Ajax.request({
        url: AppUrl + 'drawingManage/PRO_BASE_NEW_MENU_1220',//PRO_BASE_NEW_MENU_SEL',
        params: {
            IS_V_ROLECODE: Ext.util.Cookies.get('v_rolecode'),
            IS_V_SYSTYPE: '1',
            V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
            V_V_HOME_MENU: ''
        },
        method: 'post',
        sync: true,
        success: function (response) {
            var result = Ext.decode(response.responseText);
            //var Accordions = _toMenu(result); // tree
            //document.getElementById('imenus0').innerHTML=_toMenu(result);
            var text=_toMenu(result)
            $("#imenus0").append(text);
        }
    });
    //if (menucode != "" && menucode != null) {
    //    window.parent.append(menucode, menuname, APP + v_url);
    //}
}
//添加菜单里的菜单项
function _toMenu(data) {
    var menuText='';
    if (data == "") {
    } else {

        Ext.Array.each(data.list, function (item) {
            if(item.V_MENUCODE_UP=='pmnew'){
                menuText=menuText+'<li class="imatm" ><a class="line_a icon-jcgl" href="#"><span class="imea imeam"><span></span></span>'+item.V_MENUNAME+'</a>';
                var menuzx='';
                //Ext.Array.each(data.list, function (tk) {
                //    if(tk.V_MENUCODE_UP==item.V_MENUCODE) {
                //        var xx='';
                //        //Ext.Array.each(data.list, function (zj) {
                //            //if(zj.V_MENUCODE_UP==tk.V_MENUCODE) {
                //            //    xx=xx+'<li><a onclick=\"openWin(\''+AppUrlFrame+zj.V_URL+'\',\''+zj.V_MENUNAME+'\')\">'+zj.V_MENUNAME+'</a></li>';
                //            //}
                //
                //        //});
                //
                //        if(xx!=''){
                //            menuzx=menuzx+'<li><a href="#"><span class="imea imeas"><span></span></span>'+tk.V_MENUNAME+'</a><div class="imsc"><div class="imsubc" style="width:180px;top:-22px;left:170px;"><ul style="">';
                //            menuzx=menuzx+xx+'</ul></div></div></li>';
                //        }else{
                //        menuzx=menuzx+'<li><a onclick=\"openWin(\''+AppUrlFrame+tk.V_URL+'\',\''+tk.V_MENUNAME+'\')\">'+tk.V_MENUNAME+'</a></li>';
                //        }
                //    }
                //});
                //if(menuzx!=''){
                //    menuText=menuText+'<div class="imsc"><div class="imsubc" style="width:180px;top:-4px;left:0px;"><ul style="">';
                //    menuText=menuText+menuzx+'</ul></div>';
                //}
                var arr=new Array();
                arr=getChildren(data.list,item.V_MENUCODE);
                if(arr[0]==1){
                    menuText=menuText+'<div class="imsc"><div class="imsubc" style="width:180px;top:-4px;left:0px;"><ul style="">';
                    menuText=menuText+arr[1]+'</ul></div>';
                }else{
                    menuText=menuText+arr[1];
                }

                menuText=menuText+ '</div></li>';
            }
        });
        return menuText;
    }
}

function getChildren(list,code){
    var myArray=new Array();
    var menuzx='';
    var fg='0';
    //var tt='';
    Ext.Array.each(list, function (i) {
        if(i.V_MENUCODE_UP==code) {
            //var xx='';
            fg='1';
            //menuzx=menuzx+'<div class="imsc"><div class="imsubc" style="width:180px;top:-4px;left:0px;"><ul style="">';
            var arr=new Array();
            arr=getChildren(list, i.V_MENUCODE)
            if(arr[0]== '1'){
                //menuzx=menuzx+'<div class="imsc"><div class="imsubc" style="width:180px;top:-4px;left:0px;"><ul style="">';
                menuzx=menuzx+'<li><a href="#"><span class="imea imeas"><span></span></span>'+i.V_MENUNAME+'</a><div class="imsc"><div class="imsubc" style="width:180px;top:-22px;left:170px;"><ul style="">';

                menuzx=menuzx+arr[1]+'</ul></div></div></li>';
                //menuzx=+menuzx+'</ul></div>';
            }else{
                menuzx=menuzx+'<li><a onclick=\"openWin(\''+AppUrlFrame+i.V_URL+'\',\''+i.V_MENUNAME+'\')\">'+i.V_MENUNAME+'</a></li>';

            }
            //menuzx=+menuzx+'</ul></div>';
        }
    });
    //tt=tt+menuzx+'</ul></div>';
    //if(fg==1){
    //    tt='<div class="imsc"><div class="imsubc" style="width:180px;top:-4px;left:0px;"><ul style="">';
    //    tt=tt+menuzx+'</ul></div>';
    //}else{
    //    tt=tt+menuzx;
    //}
    myArray[0]=fg;
    myArray[1]=menuzx;
    return myArray;
}
function openWin(url,title){
    var owidth = window.document.body.offsetWidth;
    var oheight = window.document.body.offsetHeight;
    window.open(url,title,'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes menubar=0,scrollbars=1, resizable=1,status=1,titlebar=0,toolbar=0,location=1');
    //window.open(url, '我的收藏', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');//弹窗
}
function openNewWin(url){
    var owidth = window.document.body.offsetWidth;
    var oheight = window.document.body.offsetHeight;
    window.open(url,"我的收藏",'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes menubar=0,scrollbars=1, resizable=1,status=1,titlebar=0,toolbar=0,location=1');
    //window.open(url, '我的收藏', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');//弹窗
}
function favorite() {
    var s1 = '<ul>\n';
    userFavoriteStore.filter('leaf', 'true');
    for (var i = 0; i < userFavoriteStore.getCount(); i++) {
        var record = userFavoriteStore.getAt(i);
        if (record.get('URL') != null && record.get('URL') != '') {
            s1 = s1 + '<li><a onclick=\"openNewWin(\''+record.get("URL")+'\')\">'+record.get("V_MENUNAME")+'</a></li>\n';
        } else {
            s1 = s1 + '<li>' + record.get('V_MENUNAME') + '</li>\n';
        }
    }
    s1 = s1 + '</ul>';
    $("#wdsc").append(s1);
    //var myar = setInterval("noticeUp('.notice ul','-35px',500)", 2000);
    //$("#notice").hover(function () {
    //    clearInterval(myar);
    //}, function () {
    //    myar = setInterval("noticeUp('.notice ul','-35px',500)", 2000)
    //});
}
function notice() {
    var s1 = '<ul>\n';
    noticeStore.filter('DISPLAY', '1');
    for (var i = 0; i < noticeStore.getCount(); i++) {
        var record = noticeStore.getAt(i);
        if (record.get('FILENAME') != null && record.get('FILENAME') != '') {
            s1 = s1 + '<li><a href="#" onclick="downloadFile(\'' + record.get('ID') + '\')">[附件]</a>' + record.get('TITLE') + '<span style="cursor:text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + record.get('CONTENT') + '</span></li>\n';
        } else {
            s1 = s1 + '<li>' + record.get('TITLE') + '<span style="cursor:text">&nbsp;&nbsp;' + record.get('CONTENT') + '</span></li>\n';
        }
    }
    s1 = s1 + '</ul>';
    $("#notice").append(s1);
    //var myar = setInterval("noticeUp('.notice ul','-35px',500)", 2000);
    //$("#notice").hover(function () {
    //    clearInterval(myar);
    //}, function () {
    //    myar = setInterval("noticeUp('.notice ul','-35px',500)", 2000)
    //});
}