function toYearPlan()
{
    var container = top.Ext.getCmp('container');
    var url = AppUrl + 'page/PM_030201/index.html';
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

function toQuarterPlan()
{
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

function toMonthPlan()
{
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

function toWeekPlan()
{
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

function toDailyCheck()
{
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

function toDefectManage()
{
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

function toOrderCreate()
{
    var container = top.Ext.getCmp('container');
    var url = AppUrl + 'page/PM_0901/index.html';
    var n = container.getComponent("gdcj");

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
}


function toFixOldManager()
{
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