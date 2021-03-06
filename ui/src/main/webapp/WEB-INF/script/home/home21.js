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

$(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
    if (Ext.util.Cookies.get('v_personcode') != 'admin') {
        document.getElementById("uploadNoticeLink").style.display = "none";
    }
    // _AgencySelect();
    _QXNumSelect();
    selInspectNum();
    QuerySumDb();
    showTab();
    // JHselect();
    setInterval("QuerySumDb()", 120000);
    setInterval("_QXNumSelect()", 120000);
    setInterval("selInspectNum()", 120000);
    OnCookies();
});

function QuerySumDb() {
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/QueryTaskListSum',
        method: 'POST',
        async: false,
        params: {
            PersonCode: Ext.util.Cookies.get('v_personcode')
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.msg == 'Ok') {
                // Ext.fly('onSumDb').dom.innerHTML = '（' + resp.total + '）';
                Ext.fly('onSumDb').dom.innerHTML = resp.total;
            }
        }
    });
}

function GoToDb() {
    window.parent.append("PM_0101", "流程待办", AppUrl + 'page/PM_2103/index.html');
}

function tabreload() {
    _QXNumSelect();
    _AgencySelect();
    selInspectNum();
}

//第几周
function getWeekOfMonth() {//周一为起始
    var w = new Date().getDay() == 0 ? 7 : new Date().getDay();//星期
    var d = new Date().getDate();//日期
    var week = Math.ceil((d + 7 - w) / 7);//向上取整
    return week;
}

function JHselect() {
    $.ajax({
        type: 'POST',
        url: AppUrl + 'PM_03/PRO_PLAN_LOCK_DATE_HOMENOW',
        dataType: 'json',
        async: false,
        data: {
            V_I_YEAR: new Date().getFullYear(),
            V_I_MONTH: new Date().getMonth() + 1,
            V_I_WEEKNUM: getWeekOfMonth()
        },
        success: function (data) {
            $('#yjhsd').html(data.V_M_DATE);
            $('#yjhrq').html(data.V_M_DATE);
            $('#zjhsd').html(data.V_W_DATE);
            $('#zjhrq').html(data.V_W_DATE);
        }
    });
}

function _QXNumSelect() {
    $.ajax({
        type: 'POST',
        url: AppUrl + 'cjy/PRO_PM_07_DEFECT_VIEW_NOPAGE',
        dataType: 'json',
        data: {
            V_V_STATECODE: '10',//未处理
            X_PERSONCODE: Ext.util.Cookies.get('v_personcode')
        },
        success: function (data) {
            // Ext.fly('wclqxcount').dom.innerHTML = '（' + data.total + '）';
            Ext.fly('wclqxcount').dom.innerHTML = data.total;
            Ext.getBody().unmask();//去除页面笼罩
        }
    });
}

function _AgencySelect() {
    $('#t1').empty();
    $.ajax({
        type: 'POST',
        url: AppUrl + 'hp/PM_06_DJ_DATA_TIMER_SEL',
        dataType: 'json',
        async: false,
        data: {
            V_V_DJPER: Ext.util.Cookies.get('v_personcode')
        },
        success: function (data) {
            if (data.success) {
                var formList = data.list;
                var length = 0;
                var yangshi = "onmouseover=\"this.style.backgroundPosition='left -40px'\"";
                var yangshi2 = "onmouseout=\"this.style.backgroundPosition='left top'\"";
                if (formList.length >= 3) {
                    length = 3;
                } else {
                    length = formList.length;
                }
                for (var i = 0; i < length; i++) {
                    $('<ul class="tasklist"> <li><span> <input type="button" name="button" id="button" class="btns" value="确认办理" ' + yangshi + ' ' + yangshi2 + 'onclick="_banli(\'' + formList[i].V_TIMER_GUID + '\')"> </span>您有' + formList[i].NUM + '条代办任务需要办理... <i>' + formList[i].V_TIMER_TIME.substring(0, 19) + '</i> </li> </ul>').appendTo('#t1');
                }
            } else {
                alert(data.message);
            }
            Ext.getBody().unmask();//去除页面笼罩
        }
    });
}
function selInspectNum(){
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/BASE_INSPECT_WRITE_SELNUM',
        method: 'POST',
        async: false,
        params: {
            V_PERCODE:Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            Ext.fly('sectCount').dom.innerHTML =  resp.NUM;
            Ext.getBody().unmask();//去除页面笼罩
            // $('#sectCount').val(resp.NUM)
        }
    });
}
function _inspect(){
    window.parent.append("", "待办岗检", AppUrl + 'page/PM_060105/todos.html');
   // location.href = AppUrl + 'page/PM_060105/todos.html';
}
function showTab(){
    Ext.Ajax.request({
        url: AppUrl + 'cxy/BASE_ROLETOTABLE_SEL',
        method: 'POST',
        async: false,
        params: {
            V_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
            V_V_ROLECODE:Ext.util.Cookies.get('v_rolecode'),
            V_V_UPCODE:'-1'
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.list.length>0) {
                var sq = '';
                for(var i = 0; i < resp.list.length; i++)
                {
                    if(i==0){
                        sq = sq + '<input type="button" value="'+ resp.list[i].V_TABLENAME +'" class="active" onclick="showList(\''+ resp.list[i].V_TABLECODE +'\',\''+i+'\')">';

                    }else {
                        sq = sq + '<input type="button" value="'+ resp.list[i].V_TABLENAME +'" onclick="showList(\''+ resp.list[i].V_TABLECODE +'\',\''+i+'\')">';
                    }
                }
                $("#ywglq").append(sq);
                showList(resp.list[0].V_TABLECODE,'0');
            }
            // Ext.getBody().unmask();//去除页面笼罩
        }
    });
}
function showList(code,j) {
    Ext.Ajax.request({
        url: AppUrl + 'cxy/BASE_ROLETOTABLE_SEL',
        method: 'POST',
        async: false,
        params: {
            V_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
            V_V_ROLECODE:Ext.util.Cookies.get('v_rolecode'),
            V_V_UPCODE:code
        },
        success: function (response) {
            var odiv=document.getElementById("odiv");
            var obtn=odiv.getElementsByTagName("input");
            for(var k=0; k<obtn.length; k++){
                obtn[k].className="";
            }
            obtn[j].className="active";
            var resp = Ext.decode(response.responseText);
            if (resp.list.length>0) {
                $("#ywglmx").html('');
                var ss = '<ul>';
                for(var i = 0; i < resp.list.length; i++)
                {
                    if(resp.list[i].V_IMGURL==''){
                        ss =ss+ '<li><a href="#"><span>'+resp.list[i].V_TABLENAME+'</span></a></li>';
                    }else{
                        if(resp.list[i].V_URL==''){
                            ss =ss+ '<li><a href="#"><img src="../../css/home/images/'+ resp.list[i].V_IMGURL +'"><span>'+resp.list[i].V_TABLENAME+'</span></a></li>';
                        }else{
                            ss =ss+ '<li><a href="#" onclick="openIframe(\''+resp.list[i].V_URL +'\',\''+resp.list[i].V_TABLECODE+'\',\''+resp.list[i].V_TABLENAME +'\')"><img src="../../css/home/images/'+ resp.list[i].V_IMGURL +'"><span>'+resp.list[i].V_TABLENAME+'</span></a></li>';
                        }
                    }
                }
                ss = ss + '</ul>';
                $("#ywglmx").append(ss);
            }
        },failure:function (response) {
            var odiv=document.getElementById("odiv");
            var obtn=odiv.getElementsByTagName("input");
            for(var k=0; k<obtn.length; k++){
                obtn[k].className="";
            }
            obtn[j].className="active";
            $("#ywglmx").html('');
        }
    });
}
function _YearCountSelect() {
    $.ajax({
        type: 'POST',
        url: AppUrl + 'Activiti/QueryTaskListByYear',
        dataType: 'json',
        //async : false,
        data: {
            'PersonCode': Ext.util.Cookies.get('v_personcode')
        },
        success: function (resp) {
            Ext.fly('wclnjhcount').dom.innerHTML = '（' + resp.total + '）';
        }
    });
}

function _MonthCountSelect() {
    $.ajax({
        type: 'POST',
        url: AppUrl + 'Activiti/QueryTaskListByMonth',
        dataType: 'json',
        //async : false,
        data: {
            'PersonCode': Ext.util.Cookies.get('v_personcode')
        },
        success: function (resp) {
            Ext.fly('wclyjhcount').dom.innerHTML = '（' + resp.total + '）';
        }
    });
}

function _WeekCountSelect() {
    $.ajax({
        type: 'POST',
        url: AppUrl + 'Activiti/QueryTaskListByWeek',
        dataType: 'json',
        //async : false,
        data: {
            'PersonCode': Ext.util.Cookies.get('v_personcode')
        },
        success: function (resp) {
            Ext.fly('wclzjhcount').dom.innerHTML = '（' + resp.total + '）';
            Ext.getBody().unmask();//去除页面笼罩
        }
    });
}

function _preDbView() {
    window.parent.append("PM_0802", "缺陷处理", AppUrl + 'page/PM_0702/index.html?v_pername='+Ext.util.Cookies.get('v_personname'));
}

function _banli(V_TIMER_GUID) {
    var owidth = window.screen.availWidth;
    var oheight = window.screen.availHeight - 50;
    window.open(AppUrl + 'page/PM_060106/index.html?V_TIMER_GUID=' + V_TIMER_GUID, '', 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes');
}
function openIframe(iurl,iid,ititle) {
    var container = top.Ext.getCmp('container');
    // var url = AppUrl + 'page/PM_030212/index.html';
    var url = AppUrl + iurl;
    var n = container.getComponent(iid);
    if (!n) {
        n = container.add({
            id: iid,
            title: ititle,
            closable: true,
            loadMask: true,
            autoWidth: true,
            autoHeight: true,
            html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + url + '" />'
        }).show();
    }
    container.setActiveTab(n);
}
function toYearPlan() {
    var container = top.Ext.getCmp('container');
    // var url = AppUrl + 'page/PM_220101/index.html';
    var url = AppUrl + 'page/PM_030212/index.html';
    var n = container.getComponent("njh");
    if (!n) {
        n = container.add({
            id: 'njh',
            title: '年计划',
            closable: true,
            loadMask: true,
            autoWidth: true,
            autoHeight: true,
            html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + url + '" />'
        }).show();
    }
    container.setActiveTab(n);
}

function toQuarterPlan() {
    var container = top.Ext.getCmp('container');
    var url = AppUrl + 'page/PM_03010101/index.html';
    var n = container.getComponent("jdjh");
    if (!n) {
        n = container.add({
            id: 'jdjh',
            title: '季度计划',
            closable: true,
            loadMask: true,
            autoWidth: true,
            autoHeight: true,
            html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + url + '" />'
        }).show();
    }
    container.setActiveTab(n);
}

function toMonthPlan() {
    var container = top.Ext.getCmp('container');
    var url = AppUrl + 'page/PM_03010201/index.html';
    var n = container.getComponent("yjh");
    if (!n) {
        n = container.add({
            id: 'yjh',
            title: '月计划',
            closable: true,
            loadMask: true,
            autoWidth: true,
            autoHeight: true,
            html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + url + '" />'
        }).show();
    }
    container.setActiveTab(n);
}

function toWeekPlan() {
    var container = top.Ext.getCmp('container');
    var url = AppUrl + 'page/PM_03010301/index.html';
    var n = container.getComponent("zjh");
    if (!n) {
        n = container.add({
            id: 'zjh',
            title: '周计划',
            closable: true,
            loadMask: true,
            autoWidth: true,
            autoHeight: true,
            html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + url + '" />'
        }).show();
    }
    container.setActiveTab(n);
}

function toDailyCheck() {
    var container = top.Ext.getCmp('container');
    var url = AppUrl + 'page/PM_060105/index.html';
    var n = container.getComponent("rcdj");
    if (!n) {
        n = container.add({
            id: 'rcdj',
            title: '日常点检',
            closable: true,
            loadMask: true,
            autoWidth: true,
            autoHeight: true,
            html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + url + '" />'
        }).show();
    }
    container.setActiveTab(n);
}
function toWXJH() {
    var container = top.Ext.getCmp('container');
    var url = AppUrl + 'page/PM_030201/index.html';
    var n = container.getComponent("wxjh");
    if (!n) {
        n = container.add({
            id: 'wxjh',
            title: '维修计划',
            closable: true,
            loadMask: true,
            autoWidth: true,
            autoHeight: true,
            html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + url + '" />'
        }).show();
    }
    container.setActiveTab(n);
}
function toDXXS() {
    var container = top.Ext.getCmp('container');
    var url = AppUrl + 'page/PM_030201/indexNewQ.html';
    var n = container.getComponent("dxxs");
    if (!n) {
        n = container.add({
            id: 'dxxs',
            title: '大修写实',
            closable: true,
            loadMask: true,
            autoWidth: true,
            autoHeight: true,
            html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + url + '" />'
        }).show();
    }
    container.setActiveTab(n);
}
function toGWDJ() {
    var container = top.Ext.getCmp('container');
    var url = AppUrl + 'page/PM_060104/index.html';
    var n = container.getComponent("gwdj");
    if (!n) {
        n = container.add({
            id: 'gwdj',
            title: '岗位点检',
            closable: true,
            loadMask: true,
            autoWidth: true,
            autoHeight: true,
            html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + url + '" />'
        }).show();
    }
    container.setActiveTab(n);
}
function toZYDJ() {
    var container = top.Ext.getCmp('container');
    var url = AppUrl + 'page/PM_060107/index.html';
    var n = container.getComponent("zydj");
    if (!n) {
        n = container.add({
            id: 'zydj',
            title: '专业点检',
            closable: true,
            loadMask: true,
            autoWidth: true,
            autoHeight: true,
            html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + url + '" />'
        }).show();
    }
    container.setActiveTab(n);
}
function toJMDJ() {
    var container = top.Ext.getCmp('container');
    var url = AppUrl + 'page/PM_0708/Index.html';
    var n = container.getComponent("jmdj");
    if (!n) {
        n = container.add({
            id: 'jmdj',
            title: '精密点检',
            closable: true,
            loadMask: true,
            autoWidth: true,
            autoHeight: true,
            html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + url + '" />'
        }).show();
    }
    container.setActiveTab(n);
}
function toSGGZ() {
    var container = top.Ext.getCmp('container');
    var url = AppUrl + 'page/PM_1405/index.html';
    var n = container.getComponent("sggz");
    if (!n) {
        n = container.add({
            id: 'sggz',
            title: '事故故障管理',
            closable: true,
            loadMask: true,
            autoWidth: true,
            autoHeight: true,
            html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + url + '" />'
        }).show();
    }
    container.setActiveTab(n);
}
function toDefectManage() {
    var container = top.Ext.getCmp('container');
    var url = AppUrl + 'page/PM_0702/index.html';
    var n = container.getComponent("qxgl");
    if (!n) {
        n = container.add({
            id: 'qxgl',
            title: '缺陷管理',
            closable: true,
            loadMask: true,
            autoWidth: true,
            autoHeight: true,
            html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + url + '" />'
        }).show();
    }
    container.setActiveTab(n);
}

function toOrderCreate() {
    var container = top.Ext.getCmp('container');
    // var url=AppUrl + 'page/PM_0901/index.html';
    //大球特殊作业区判断
    var url;
    // if(Ext.util.Cookies.get('v_deptcode')=="99070205")
    // { url = AppUrl + 'page/dq0205/workorder_dqjx.html'; return;}
    // else{ url=AppUrl + 'page/PM_0901/index.html'; return;}
    var n = container.getComponent("gdcj");
    if(Ext.util.Cookies.get('v_deptcode')=="99070205"){
        url = AppUrl + 'page/dq0205/workorder_dqjx.html';
        if (!n) {
            n = container.add({
                id: 'gdcj',
                title: '工单创建',
                closable: true,
                loadMask: true,
                autoWidth: true,
                autoHeight: true,
                html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + url + '" />'
            }).show();
        }
        container.setActiveTab(n);
        return;
    }else{
        url=AppUrl + 'page/PM_0901/index.html';
        if (!n) {
            n = container.add({
                id: 'gdcj',
                title: '工单创建',
                closable: true,
                loadMask: true,
                autoWidth: true,
                autoHeight: true,
                html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + url + '" />'
            }).show();
        }
        container.setActiveTab(n);
        return;
    }

}
function toYearOrderManager() {
    var container = top.Ext.getCmp('container');
    var url = AppUrl + 'page/PM_030201/dxStatistics.html';
    var n = container.getComponent("nxgl");
    if (!n) {
        n = container.add({
            id: 'nxgl',
            title: '年修管理',
            closable: true,
            loadMask: true,
            autoWidth: true,
            autoHeight: true,
            html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + url + '" />'
        }).show();
    }
    container.setActiveTab(n);
}
function toRunHuaManager() {
    var container = top.Ext.getCmp('container');
    var url = AppUrl + 'page/PM_130101/indexNew.html';
    var n = container.getComponent("rhgl");
    if (!n) {
        n = container.add({
            id: 'rhgl',
            title: '润滑管理',
            closable: true,
            loadMask: true,
            autoWidth: true,
            autoHeight: true,
            html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + url + '" />'
        }).show();
    }
    container.setActiveTab(n);
}
function toYuZhuangJianManager() {
    var container = top.Ext.getCmp('container');
    var url = AppUrl + 'page/No410506/Index.html';
    var n = container.getComponent("yzjgl");
    if (!n) {
        n = container.add({
            id: 'yzjgl',
            title: '预装件录入',
            closable: true,
            loadMask: true,
            autoWidth: true,
            autoHeight: true,
            html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + url + '" />'
        }).show();
    }
    container.setActiveTab(n);
}
function toJXMX() {
    var container = top.Ext.getCmp('container');
    var url = AppUrl + 'page/PM_1917/indexMenuNew.html';
    var n = container.getComponent("jxmx");
    if (!n) {
        n = container.add({
            id: 'jxmx',
            title: '检修模型',
            closable: true,
            loadMask: true,
            autoWidth: true,
            autoHeight: true,
            html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + url + '" />'
        }).show();
    }
    container.setActiveTab(n);
}
function toFixOldManager() {
    var container = top.Ext.getCmp('container');
    var url = AppUrl + 'page/PM_0920/index.html';
    var n = container.getComponent("xjgl");
    if (!n) {
        n = container.add({
            id: 'xjgl',
            title: '修旧管理',
            closable: true,
            loadMask: true,
            autoWidth: true,
            autoHeight: true,
            html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + url + '" />'
        }).show();
    }
    container.setActiveTab(n);
}

function toNoticeMx() {
    window.open(AppUrl + "page/home/mx.html", '', 'height = 700, width = 1000');
}
function OnPageLoad() {
    Ext.Ajax.request({
        url: AppUrl + 'basic/PM_PRO_DB_PERSONNUM_SEL',
        method: 'POST',
        async: false,
        params: {
            V_V_SDATE: Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(), 'Y-m-d'),
            V_V_EDATE: Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y-m-d'),
            V_V_PERSON: Ext.util.Cookies.get('v_personcode')
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            Ext.getCmp('db').setValue(resp.V_DBNUM + '条');
            Ext.getCmp('yb').setValue(resp.V_YBNUM + '条');
        }
    });
    Ext.Ajax.request({
        url: AppUrl + 'basic/PM_PRO_DEFECT_PERSONNUM_SEL',
        method: 'POST',
        async: false,
        params: {
            V_V_SDATE: Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(), 'Y-m-d'),
            V_V_EDATE: Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y-m-d'),
            V_V_PERSON: Ext.util.Cookies.get('v_personcode')
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            Ext.getCmp('wclqx').setValue(resp.V_WCL_NUM + '条');
            Ext.getCmp('yxpqx').setValue(resp.V_YXP_NUM + '条');
            Ext.getCmp('yxqqx').setValue(resp.V_YCL_NUM + '条');
            Ext.getCmp('sgxqqx').setValue(resp.V_SGXQ_NUM + '条');
            Ext.getCmp('ylqx').setValue(resp.V_YL_NUM + '条');
        }
    });
    Ext.Ajax.request({
        url: AppUrl + 'basic/PM_PRO_PLAN_PERSONNUM_SEL',
        method: 'POST',
        async: false,
        params: {
            V_V_SDATE: Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(), 'Y-m-d'),
            V_V_EDATE: Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y-m-d'),
            V_V_PERSON: Ext.util.Cookies.get('v_personcode')
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            Ext.getCmp('njh').setValue(resp.V_YEAR_NUM + '条');
            Ext.getCmp('jjh').setValue(resp.V_QUARTER_NUM + '条');
            Ext.getCmp('yjh').setValue(resp.V_MONTH_NUM + '条');
            Ext.getCmp('zjh').setValue(resp.V_WEEK_NUM + '条');
        }
    });
    Ext.Ajax.request({//工单
        url: AppUrl + 'basic/PM_PRO_WORKORDER_PERSONNUM_SEL',
        method: 'POST',
        async: false,
        params: {
            V_V_SDATE: Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(), 'Y-m-d'),
            V_V_EDATE: Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y-m-d'),
            V_V_PERSON: Ext.util.Cookies.get('v_personcode')
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            Ext.getCmp('cjgd').setValue(resp.V_CJ_NUM + '条');
            Ext.getCmp('jsgd').setValue(resp.V_JS_NUM + '条');
            Ext.getCmp('fkgd').setValue(resp.V_FK_NUM + '条');
            Ext.getCmp('ysgd').setValue(resp.V_YS_NUM + '条');
            Ext.getCmp('ylgd').setValue(resp.V_YL_NUM + '条');
        }
    });
}

function dealWith(URL, V_ORDERID, V_DBGUID, V_ORDERGUID, V_FLOWSTEP, V_FLOWTYPE) {
    checktabid = parseInt(Ext.getCmp('tabpanel').getActiveTab().id.substring(8));
    var owidth = window.document.body.offsetWidth - 800;
    var oheight = window.document.body.offsetHeight - 200;
    if (V_FLOWTYPE == 'WORK') {
        window.open(AppUrl + "page" + URL + "?V_ORDERID=" + V_ORDERID + "&V_DBGUID=" + V_DBGUID + "&V_ORDERGUID=" + V_ORDERGUID + "&V_FLOWSTEP=" + V_FLOWSTEP,
                "", 'height=' + 600 + ',width=' + 1000 + ',top=10px,left=10px,resizable=yes');
    } else {
        window.open(AppUrl + "page" + URL + "?V_GUID=" + V_ORDERGUID + '&random=' + Math.random(),
                "", 'height=' + 600 + ',width=' + 1000 + ',top=10px,left=10px,resizable=yes');
    }
}

function addEdit(id) {
    Ext.data.StoreManager.lookup('gridWinStore').load({
        params: {
            V_V_ORDERID: id,
            V_V_DEPTCODE: Ext.util.Cookies.get('v_deptcode')
        }
    });
    Ext.getCmp('win').show();
}

function Query() {
    tabIndex = parseInt(Ext.getCmp('tabpanel').getActiveTab().id.substring(8));
    OnPageLoad();
    Ext.getCmp('page').store.currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore').load();
    Ext.ComponentManager.get("tabpanel").setActiveTab(tabIndex);
}

function rendererTime(value, metaData) {
    //return Ext.Date.format(value, 'Y-m-d');
    return value.split('.0')[0];
}

function toDownloadChrome() {
    location.href = AppUrl + "/resources/Chrome28.exe";
}

function toDownloadLodop() {
    location.href = AppUrl + "/resources/install_lodop32.exe";
}

function toDownloadLodop32() {
    location.href = AppUrl + "/resources/install_lodop32.exe";
}

function toDownloadLodop64() {
    location.href = AppUrl + "/resources/install_lodop32.exe";
}

function noticeUp(obj, top, time) {
    $(obj).animate({
        marginTop: top
    }, time, function () {
        $(this).css({marginTop: "0"}).find(":first").appendTo(this);
    })
}

function notice() {
    var s1 = '<ul class="zxgg_body_ul">\n';
    noticeStore.filter('DISPLAY', '1');
    var num =0;
    if(noticeStore.getCount()<=3){
        num=noticeStore.getCount();
    }else{
        num=3;
    }
    for (var i = 0; i < num; i++) {//noticeStore.getCount()
        var record = noticeStore.getAt(i);
        if (record.get('FILENAME') != null && record.get('FILENAME') != '') {
            // s1 = s1 + '<li><img src="../../css/home/images/bullet_blue.png" width="16" height="16" alt=""/><a href="#" onclick="downloadFile(\'' + record.get('ID') + '\')">[附件]</a>' + record.get('TITLE') + '<span style="cursor:text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + record.get('CONTENT') + '</span></li>\n';
            s1 = s1 + '<li><a href="#" onclick="downloadFile(\'' + record.get('ID') + '\')">[附件]</a>' + record.get('TITLE') + '<span style="cursor:text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + record.get('CONTENT') + '</span></li>\n';

        } else {
            // s1 = s1 + '<li><img src="../../css/home/images/bullet_blue.png" width="16" height="16" alt=""/>' + record.get('TITLE') + '<span style="cursor:text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + record.get('CONTENT') + '</span></li>\n';
            s1 = s1 + '<li><a href="#">'+record.get('TITLE')+ ' : ' +record.get('CONTENT') +'<span>' +record.get('UPLOADTIME').split(' ')[0] + '</span></a>';

        }
    }
    s1 = s1 + '</ul>';
    $("#notice").append(s1);
    // var myar = setInterval("noticeUp('.notice ul','-35px',500)", 2000);
    // $("#notice").hover(function () {
    //     clearInterval(myar);
    // }, function () {
    //     myar = setInterval("noticeUp('.notice ul','-35px',500)", 2000)
    // });
}

function downloadFile(ID) {
    document.location.href = AppUrl + 'Wsy/PM_HOME_NOTICE_DOWNLOAD?V_ID=' + encodeURI(ID);
}

function _uploadImageWindow() {
//    window.open(AppUrl + "page/NoticeFileUpload/Index.html", '', 'height=' + (screen.height - 100) + ',width=' + (screen.width - 100));
    window.open(AppUrl + "page/NoticeFileUpload/Index.html", '', 'height = 768, width = 1366');
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