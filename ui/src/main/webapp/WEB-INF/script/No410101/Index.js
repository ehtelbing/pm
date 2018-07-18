//﻿var LODOP = getLodop(document.getElementById('LODOP'), document.getElementById('LODOP_EM'));
var LODOP = getLodop();
var selectID = [];
var page = 1;
Ext.define('Ext.ux.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    async: true,
    doRequest: function (operation, callback, scope) {
        var writer = this.getWriter(),
                request = this.buildRequest(operation);
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        Ext.apply(request, {
            async: this.async,
            binary: this.binary,
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, callback, scope),
            method: this.getMethod(request),
            disableCaching: false
        });
        Ext.Ajax.request(request);
        return request;
    }
});
Ext.onReady(function () {
    var orderInfoStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'orderInfoStore',
        fields: ['I_ID', 'V_ORDERGUID', 'V_ORDERID', 'V_ORDER_TYP', 'V_ORDER_TYP_TXT', 'V_FUNC_LOC', 'V_EQUSITENAME', 'V_EQUIP_NO', 'V_EQUIP_NAME', 'V_PLANT', 'V_IWERK', 'D_START_DATE', 'D_FINISH_DATE', 'D_FACT_START_DATE', 'D_FACT_FINISH_DATE', 'V_ACT_TYPE', 'V_PLANNER', 'V_WORK_CTR', 'V_SHORT_TXT', 'V_GSBER', 'V_GSBER_TXT', 'V_WORK_AREA', 'V_WBS', 'V_WBS_TXT', 'V_PROJECT_NAME', 'V_PERSONNAME', 'V_ENTERED_BY', 'D_ENTER_DATE', 'SYSTEM_STATUS', 'V_SYSNAME', 'V_ORGCODE', 'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME', 'V_DEPTCODEREPARIR', 'V_DEPTNAMEREPARIR', 'V_DEFECTGUID', 'V_STATECODE', 'V_STATENAME', 'V_TOOL', 'V_TECHNOLOGY', 'V_SAFE', 'D_DATE_FK', 'D_DATE_ACP', 'I_OTHERHOUR', 'V_OTHERREASON', 'V_REPAIRCONTENT', 'V_REPAIRSIGN', 'V_REPAIRPERSON', 'V_POSTMANSIGN', 'V_CHECKMANCONTENT', 'V_CHECKMANSIGN', 'V_WORKSHOPCONTENT', 'V_WORKSHOPSIGN', 'V_DEPTSIGN'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/PRO_PM_WORKORDER_GET',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
//                V_V_ORDERGUID: V_ORDERGUID
            }
        })
    });
    var taskStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'taskStore',
        fields: ['I_ID', 'V_ORDERGUID', 'V_ACTIVITY', 'V_SUB_ACTIVITY', 'V_CONTROL_KEY', 'V_DESCRIPTION', 'I_NUMBER_OF_CAPACITIES', 'I_WORK_ACTIVITY', 'V_UN_WORK', 'CLASSNAME', 'V_PER_LIST', 'I_DURATION_NORMAL', 'V_DURATION_NORMAL_UNIT', 'V_WORK_CENTER', 'I_ACTUAL_TIME', 'I_NUMBER_OF_PEOPLE', 'V_CLDTYPE', 'V_CONTENT', 'V_STATE', 'V_ID', 'V_GUID', 'V_JXBZ', 'V_JXBZ_VALUE_DOWN', 'V_JXBZ_VALUE_UP', 'V_PER_NAME', 'V_JJ_NAME', 'V_GJ_NAME', 'V_JSQY_NAME', 'V_AQSC_NAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_OPERATIONS',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
//                V_V_ORDERGUID: V_ORDERGUID
            }
        })
    });
    var taskStoreTemp = Ext.create('Ext.data.Store', {
        storeId: 'taskStoreTemp',
        autoLoad: false,
        fields: ['I_ID', 'V_ORDERGUID', 'V_ACTIVITY', 'V_SUB_ACTIVITY', 'V_CONTROL_KEY', 'V_DESCRIPTION', 'I_NUMBER_OF_CAPACITIES', 'I_WORK_ACTIVITY', 'V_UN_WORK', 'CLASSNAME', 'V_PER_LIST', 'I_DURATION_NORMAL', 'V_DURATION_NORMAL_UNIT', 'V_WORK_CENTER', 'I_ACTUAL_TIME', 'I_NUMBER_OF_PEOPLE', 'V_CLDTYPE', 'V_CONTENT', 'V_STATE', 'V_ID', 'V_GUID', 'V_JXBZ', 'V_JXBZ_VALUE_DOWN', 'V_JXBZ_VALUE_UP', 'V_PER_NAME', 'V_JJ_NAME', 'V_GJ_NAME', 'V_JSQY_NAME', 'V_AQSC_NAME']
    });
    var materialStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'materialStore',
        fields: ['I_ID', 'V_ORDERGUID', 'V_FETCHORDERGUID', 'V_ACTIVITY', 'V_MATERIALCODE', 'V_MATERIALNAME', 'V_SPEC', 'V_UNIT', 'F_UNITPRICE', 'I_PLANAMOUNT', 'F_PLANMONEY', 'I_OUTNUMBER', 'F_ACTUALMONEY', 'V_TYPE', 'V_MEMO', 'V_SUBTYPE', 'V_STATUS', 'I_ABANDONEDAMOUNT', 'I_RECLAIMEDAMOUNT', 'I_FIXEDAMOUNT', 'V_ID', 'I_KC_ID', 'I_JIIP', 'I_BACK', 'V_GUID', 'I_ACTUALAMOUNT'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/PRO_PM_WORKORDER_SPARE_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
//                V_V_ORDERGUID: V_ORDERGUID
            }
        }),
        sorters: [{
            property: 'V_ACTIVITY',
            direction: 'ASC'
        }]
    });
    var materialStoreTemp = Ext.create('Ext.data.Store', {
        storeId: 'materialStoreTemp',
        autoLoad: false,
        fields: ['I_ID', 'V_ORDERGUID', 'V_FETCHORDERGUID', 'V_ACTIVITY', 'V_MATERIALCODE', 'V_MATERIALNAME', 'V_SPEC', 'V_UNIT', 'F_UNITPRICE', 'I_PLANAMOUNT', 'F_PLANMONEY', 'I_OUTNUMBER', 'F_ACTUALMONEY', 'V_TYPE', 'V_MEMO', 'V_SUBTYPE', 'V_STATUS', 'I_ABANDONEDAMOUNT', 'I_RECLAIMEDAMOUNT', 'I_FIXEDAMOUNT', 'V_ID', 'I_KC_ID', 'I_JIIP', 'I_BACK', 'V_GUID', 'I_ACTUALAMOUNT']
    });
    loadPage();
});
$(function () {
});

function loadPage() {
    var idGroup = [];
    $.each(window.opener.selectID, function (index, items) {
        idGroup.push(items);
    });
    var orderInfoStore = Ext.data.StoreManager.lookup('orderInfoStore');
    var taskStore = Ext.data.StoreManager.lookup('taskStore');
    var taskStoreTemp = Ext.data.StoreManager.lookup('taskStoreTemp');
    var materialStore = Ext.data.StoreManager.lookup('materialStore');
    var materialStoreTemp = Ext.data.StoreManager.lookup('materialStoreTemp');
//    idGroup = ['14905266-CA06-47E4-9DCE-2F77326750B6', '858E6473-72B0-4F17-BB93-6FBEF9F43144'];
    for (var orderIndex = 0; orderIndex < idGroup.length; orderIndex++) {
        orderInfoStore.load({
            params: {
                V_V_ORDERGUID: idGroup[orderIndex]
            }
        });
        taskStore.load({
            params: {
                V_V_ORDERGUID: idGroup[orderIndex]
            }
        });
        materialStore.load({
            params: {
                V_V_ORDERGUID: idGroup[orderIndex]
            }
        });
        var activityList = [];
        for (var i = 0; i < materialStore.getCount(); i++) {
            materialStoreTemp.add(materialStore.getAt(i));
            if (activityList.indexOf(materialStore.getAt(i).get('V_ACTIVITY')) == -1) {
                activityList.push(materialStore.getAt(i).get('V_ACTIVITY'));
            }
            var filterValue;
            if (materialStore.getCount() === 0 || i === materialStore.getCount() - 1) {
                filterValue = Ext.isArray(activityList) ? new RegExp('^(?:' + Ext.Array.map(activityList, function (value) {
                    return Ext.escapeRe(value)
                }).join('|') + ')$') : activityList;
                taskStore.filter('V_ACTIVITY', filterValue);
                taskStoreTemp.add(taskStore.getRange());
                createPage(orderInfoStore, taskStoreTemp, materialStoreTemp, page);
                taskStore.clearFilter();
                taskStoreTemp.removeAll();
                materialStoreTemp.removeAll();
                page++;
                activityList = [];
            } else if (activityList.length === 5 || materialStoreTemp.getCount() === 8) {
                filterValue = Ext.isArray(activityList) ? new RegExp('^(?:' + Ext.Array.map(activityList, function (value) {
                    return Ext.escapeRe(value)
                }).join('|') + ')$') : activityList;
                taskStore.filter('V_ACTIVITY', filterValue);
                taskStoreTemp.add(taskStore.getRange());
                createPage(orderInfoStore, taskStoreTemp, materialStoreTemp, page);
                taskStore.clearFilter();
                taskStoreTemp.removeAll();
                materialStoreTemp.removeAll();
                page++;
                activityList = [];
            }
        }
    }
}

function createPage(orderInfoStore, taskStoreTemp, materialStoreTemp, page) {
    var record = orderInfoStore.getAt(0).raw.list[0];
    var s1 = "<div style=\"margin: 15px 0px 15px 0px\" id=page" + page + ">\n" +
            "<table class=\"Tabel_p\">\n" +
            "    <tr>\n" +
            "        <td style=\"width: 570px; padding: 0px; vertical-align:top; height:130px\">\n" +
            "            <table class=\"Tabel_pl\" style=\"border: 0px\">\n" +
            "                <tr>\n" +
            "                    <td colspan=\"4\" style=\"border-bottom: 1px solid #000; border-top: 0px; border-left: 0px; border-right: 0px; width: 100%; background-color: #F4F5F7\">①基本信息栏</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td style=\"width: 21%; border-bottom: 1px solid #000; border-right: 1px solid #000; border-left: 0; text-align: right; background-color: #BFDFFF\">工厂单位：</td>\n" +
            "                    <td style=\"width: 28%; border-bottom: 1px solid #000; border-right: 1px solid #000; border-left: 0; text-align: left\">" + record.V_ORGNAME + "</td>\n" +
            "                    <td style=\"width: 23%; border-bottom: 1px solid #000; border-right: 1px solid #000; border-left: 0; text-align: right; background-color: #BFDFFF\">工单类型：</td>\n" +
            "                    <td style=\"width: 33%; border-bottom: 1px solid #000; border-right: 0px; text-align: left\">" + record.V_ORDER_TYP_TXT + "</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td style=\"width: 21%; border-bottom: 1px solid #000; border-right: 1px solid #000; border-left: 0; text-align: right; background-color: #BFDFFF\">作业区：</td>\n" +
            "                    <td style=\"width: 28%; border-bottom: 1px solid #000; border-right: 1px solid #000; border-left: 0; text-align: left\">" + record.V_DEPTNAME + "</td>\n" +
            "                    <td style=\"width: 23%; border-bottom: 1px solid #000; border-right: 1px solid #000; border-left: 0; text-align: right; background-color: #BFDFFF\">工 单 号：</td>\n" +
            "                    <td style=\"width: 33%; border-bottom: 1px solid #000; border-right: 0px; text-align: left\">" + record.V_ORDERID + "</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td style=\"width: 21%; border-bottom: 1px solid #000; border-right: 1px solid #000; border-left: 0; text-align: right; background-color: #BFDFFF\">设备名称：</td>\n" +
            "                    <td style=\"width: 28%; border-bottom: 1px solid #000; border-right: 1px solid #000; border-left: 0; text-align: left\">" + record.V_EQUIP_NAME + "</td>\n" +
            "                    <td style=\"border-bottom: 1px solid #000; border-right: 1px solid #000; border-left: 0; text-align: right; background-color: #BFDFFF\">检修单位：</td>\n" +
            "                    <td style=\"border-bottom: 1px solid #000; border-right: 0px; text-align: left\">" + record.V_DEPTNAMEREPARIR + "</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td style=\"border-bottom: 1px solid #000; border-right: 1px solid #000; border-left: 0; text-align: right; background-color: #BFDFFF\">设备编号：</td>\n" +
            "                    <td style=\"border-bottom: 1px solid #000; border-right: 1px solid #000; border-left: 0; text-align: left\">" + record.V_EQUIP_NO + "</td>\n" +
            "                    <td rowspan=\"2\" style=\"border-bottom: 0; border-right: 1px solid #000; border-left:0; text-align: right; background-color: #BFDFFF\">工单描述：</td>\n" +
            "                    <td rowspan=\"2\" style=\"border-bottom: 0; border-right: 0px; text-align: left\">" + record.V_SHORT_TXT + "</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td style=\"border-bottom: 0; height:35px; border-right: 1px solid #000;border-left: 0; text-align: right; background-color: #BFDFFF\">功能位置：</td>\n" +
            "                    <td style=\"border-bottom: 0; border-right: 1px solid #000; border-left: 0; text-align: left\">" + record.V_FUNC_LOC + "</td>\n" +
            "                </tr>\n" +
            "            </table>\n" +
            "        </td>\n" +
            "        <td style=\"width: 450px;\">\n" +
            "            <table class=\"Tabel_pl\" style=\"border: 0px\">\n" +
            "                <tr>\n" +
            "                    <td colspan=\"4\" style=\"border-bottom: 1px solid #000; border-top: 0px; border-left: 0px; border-right: 0px; background-color: #F4F5F7\">②任务信息栏</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td style=\"width: 21%; border-bottom: 1px solid #000; border-right: 1px solid #000; border-left: 0; text-align: right; background-color: #BFDFFF\">创建人：</td>\n" +
            "                    <td style=\"width: 28%; border-bottom: 1px solid #000; border-right: 1px solid #000; border-left: 0; text-align: left\">" + record.V_ENTERED_BY + "</td>\n" +
            "                    <td style=\"width: 23%; border-bottom: 1px solid #000; border-right: 1px solid #000; border-left: 0; text-align: right; background-color: #BFDFFF\">创建日期：</td>\n" +
            "                    <td style=\"width: 33%; border-bottom: 1px solid #000; border-right: 0px; text-align: left\">" + record.D_ENTER_DATE + "</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td style=\"border-bottom: 1px solid #000; border-right: 1px solid #000; border-left: 0; text-align: right; background-color: #BFDFFF\">WBS编码：</td>\n" +
            "                    <td colspan=\"3\" style=\"border-bottom: 1px solid #000; border-right: 0px; text-align: left\">" + record.V_WBS + "</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td style=\"border-bottom: 1px solid #000; border-right: 1px solid #000; border-left: 0; text-align: right; background-color: #BFDFFF\">项目名称：</td>\n" +
            "                    <td colspan=\"3\" style=\"border-bottom: 1px solid #000; border-right: 0px; text-align: left\">" + record.V_WBS_TXT + "</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td style=\"border-bottom: 1px solid #000; border-right: 1px solid #000; border-left: 0; text-align: right; background-color: #BFDFFF\">计划开始时间：</td>\n" +
            "                    <td style=\"border-bottom: 1px solid #000; border-right: 1px solid #000; border-left: 0; text-align: left\">" + record.D_START_DATE + "</td>\n" +
            "                    <td style=\"border-bottom: 1px solid #000; border-right: 1px solid #000; border-left: 0; text-align: right; background-color: #BFDFFF\">实际开始时间：</td>\n" +
            "                    <td style=\"border-bottom: 1px solid #000; border-right: 0px;\">" + record.D_FACT_START_DATE + "</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td style=\"border-bottom: 0; height:35px; border-right: 1px solid #000;border-left: 0; text-align: right; background-color: #BFDFFF\">计划完成时间：</td>\n" +
            "                    <td style=\"border-bottom: 0; border-right: 1px solid #000; border-left: 0; text-align: left\">" + record.D_FINISH_DATE + "</td>\n" +
            "                    <td style=\"border-bottom: 0; border-right: 1px solid #000; border-left:0; text-align: right; background-color: #BFDFFF\">实际完成时间：</td>\n" +
            "                    <td style=\"border-bottom: 0; border-right: 0px;\">" + record.D_FACT_FINISH_DATE + "</td>\n" +
            "                </tr>\n" +
            "            </table>\n" +
            "        </td>\n" +
            "    </tr>";
    var s2 = "<tr>\n" +
            "        <td colspan=\"3\" style=\"text-align: left; background-color: #F4F5F7\">③任务细节</td>\n" +
            "    </tr>\n" +
            "    <tr>\n" +
            "        <td colspan=\"3\">\n" +
            "            <table class=\"Tabel_pl\" style=\"border: 0px\">\n" +
            "                <tr>\n" +
            "                    <td style=\"border: 0px; width: 666px\">\n" +
            "                        <table class=\"Tabel_pl\" style=\"border: 0px\">\n" +
            "                            <thead>\n" +
            "                            <tr>\n" +
            "                                <td style=\"border-left: 0px; border-bottom: 0px; border-top: 0px; width: 9%; background-color: #BFDFFF\">工序编号</td>\n" +
            "                                <td style=\"border-bottom: 0px; border-top: 0px; width: 9%; background-color: #BFDFFF\">工作中心</td>\n" +
            "                                <td style=\"border-bottom: 0px; border-top: 0px; width: 9%; background-color: #BFDFFF\">工序内容</td>\n" +
            "                                <td style=\"border-bottom: 0px; border-top: 0px; width: 9%; background-color: #BFDFFF\">定额时间</td>\n" +
            "                                <td style=\"border-bottom: 0px; border-top: 0px; width: 9%; background-color: #BFDFFF\">定额人数</td>\n" +
            "                                <td style=\"border-bottom: 0px; border-top: 0px; width: 9%; background-color: #BFDFFF\">实际时间</td>\n" +
            "                                <td style=\"border-bottom: 1px; border-top: 0px; width: 9%; background-color: #BFDFFF\">实际人数</td>\n" +
            "                                <td style=\"border-bottom: 1px; border-top: 0px; width: 9%; background-color: #BFDFFF\">机具</td>\n" +
            "                                <td style=\"border-bottom: 1px; border-top: 0px; width: 9%; background-color: #BFDFFF\">工具</td>\n" +
            "                                <td style=\"border-bottom: 1px; border-top: 0px; width: 9%; background-color: #BFDFFF\">技术要求</td>\n" +
            "                                <td style=\"border-bottom: 1px; border-top: 0px;border-right: 0px; width: 9%; background-color: #BFDFFF\">安全措施</td>\n" +
            "                            </tr>\n" +
            "                            </thead>\n" +
            "                            <tbody>";
    for (var i = 0; i < taskStoreTemp.getCount(); i++) {
        var record = taskStoreTemp.getAt(i);
        s2 = s2 + "<tr>\n" +
                "<td style=\"border-left: 0px; border-bottom: 0px;\">" + record.get("V_ACTIVITY") + "</td>\n" +
                "<td style=\"border-bottom: 0px;\">" + record.get("V_WORK_CENTER") + "</td>\n" +
                "<td style=\"border-bottom: 0px;\">" + record.get("V_DESCRIPTION") + "</td>\n" +
                "<td style=\"border-bottom: 0px;\">" + record.get("I_WORK_ACTIVITY") + "</td>\n" +
                "<td style=\"border-bottom: 0px;\">" + record.get("I_DURATION_NORMAL") + "</td>\n" +
                "<td style=\"border-bottom: 0px;\">" + record.get("I_ACTUAL_TIME") + "</td>\n" +
                "<td style=\"border-bottom: 0px;\">" + record.get("I_NUMBER_OF_PEOPLE") + "</td>\n" +
                "<td style=\"border-bottom: 0px;\">" + record.get("V_JJ_NAME") + "</td>\n" +
                "<td style=\"border-bottom: 0px;\">" + record.get("V_GJ_NAME") + "</td>\n" +
                "<td style=\"border-bottom: 0px;\">" + record.get("V_JSQY_NAME") + "</td>\n" +
                "<td style=\"border-bottom: 0px;\">" + record.get("V_AQSC_NAME") + "</td>\n" +
                "</tr>";
    }
    if (taskStoreTemp.getCount() < 5) {
        for (var i = 0; i < 5 - taskStoreTemp.getCount(); i++) {
            s2 = s2 + "<tr>\n" +
                    "<td style=\"border-left: 0px; border-bottom: 0px;\"></td>\n" +
                    "<td style=\"border-bottom: 0px;\"></td>\n" +
                    "<td style=\"border-bottom: 0px;\"></td>\n" +
                    "<td style=\"border-bottom: 0px;\"></td>\n" +
                    "<td style=\"border-bottom: 0px;\"></td>\n" +
                    "<td style=\"border-bottom: 0px;\"></td>\n" +
                    "<td style=\"border-bottom: 0px;\"></td>\n" +
                    "<td style=\"border-bottom: 0px;\"></td>\n" +
                    "<td style=\"border-bottom: 0px;\"></td>\n" +
                    "<td style=\"border-bottom: 0px;\"></td>\n" +
                    "<td style=\"border-bottom: 0px;\"></td>\n" +
                    "</tr>";
        }
    }
    s2 = s2 + "</tbody>\n" +
            "</table>\n" +
            "</td>\n" +
            "</tr>\n" +
            "</table>\n" +
            "</td>\n" +
            "</tr>";
    var s3 = "<tr>\n" +
            "        <td colspan=\"3\" style=\"text-align: left; background-color: #F4F5F7\">④物料信息</td>\n" +
            "\t</tr>\n" +
            "    <tr>\n" +
            "        <td style=\"border: 0px\" colspan=\"3\">\n" +
            "            <table class=\"Tabel_pl\" style=\"border: 0px\">\n" +
            "                <thead>\n" +
            "                <tr>\n" +
            "                    <td style=\"width: 10%; border-left: 0px; border-top: 0px; border-bottom: 0px; background-color: #BFDFFF\">序号</td>\n" +
            "                    <td style=\"width: 10%; border-top: 0px; border-bottom: 0px; background-color: #BFDFFF\">工序</td>\n" +
            "                    <td style=\"width: 10%; border-top: 0px; border-bottom: 0px; background-color: #BFDFFF\">物料编码</td>\n" +
            "                    <td style=\"width: 10%; border-top: 0px; border-bottom: 0px; background-color: #BFDFFF\">物料描述</td>\n" +
            "                    <td style=\"width: 10%; border-top: 0px; border-bottom: 0px; background-color: #BFDFFF\">单位</td>\n" +
            "                    <td style=\"width: 10%; border-top: 0px; border-bottom: 0px; background-color: #BFDFFF\">计划数量</td>\n" +
            "                    <td style=\"width: 10%; border-top: 0px; border-bottom: 0px; background-color: #BFDFFF\">计划总金额</td>\n" +
            "                    <td style=\"width: 10%; border-top: 0px; border-bottom: 0px; background-color: #BFDFFF\">实际数量</td>\n" +
            "                    <td style=\"width: 10%; border-top: 0px; border-bottom: 0px; background-color: #BFDFFF\">实际总金额</td>\n" +
            "                    <td style=\"width: 10%; border-top: 0px; border-bottom: 0px; border-right: 0px; background-color: #BFDFFF\">备注</td>\n" +
            "                </tr>\n" +
            "                </thead>\n" +
            "                <tbody>";
    for (var i = 0; i < materialStoreTemp.getCount(); i++) {
        var record = materialStoreTemp.getAt(i);
        s3 = s3 + "<tr>\n" +
                "<td style=\"border-left: 0px; border-bottom: 0px\">" + (i + 1) + "</td>\n" +
                "<td style=\"border-bottom: 0px\">" + record.get("V_ACTIVITY") + "</td>\n" +
                "<td style=\"border-bottom: 0px\">" + record.get("V_MATERIALCODE") + "</td>\n" +
                "<td style=\"border-bottom: 0px\">" + record.get("V_MATERIALNAME") + "</td>\n" +
                "<td style=\"border-bottom: 0px\">" + record.get("V_UNIT") + "</td>\n" +
                "<td style=\"border-bottom: 0px\">" + record.get("I_PLANAMOUNT") + "</td>\n" +
                "<td style=\"border-bottom: 0px\">" + record.get("F_PLANMONEY") + "</td>\n" +
                "<td style=\"border-bottom: 0px\">" + record.get("I_ACTUALAMOUNT") + "</td>\n" +
                "<td style=\"border-bottom: 0px\">" + record.get("F_ACTUALMONEY") + "</td>\n" +
                "<td style=\"border-bottom: 0px; border-right: 0px\">" + record.get("V_MEMO") + "</td>\n" +
                "</tr>";
    }
    if (materialStoreTemp.getCount() < 8) {
        for (var i = 0; i < 8 - materialStoreTemp.getCount(); i++) {
            s3 = s3 + "<tr>\n" +
                    "<td style=\"border-left: 0px; border-bottom: 0px\"></td>\n" +
                    "<td style=\"border-bottom: 0px\"></td>\n" +
                    "<td style=\"border-bottom: 0px\"></td>\n" +
                    "<td style=\"border-bottom: 0px\"></td>\n" +
                    "<td style=\"border-bottom: 0px\"></td>\n" +
                    "<td style=\"border-bottom: 0px\"></td>\n" +
                    "<td style=\"border-bottom: 0px\"></td>\n" +
                    "<td style=\"border-bottom: 0px\"></td>\n" +
                    "<td style=\"border-bottom: 0px\"></td>\n" +
                    "<td style=\"border-bottom: 0px; border-right: 0px\"></td>\n" +
                    "</tr>";
        }
    }
    s3 = s3 + "</tbody>\n" +
            "            </table>\n" +
            "        </td>\n" +
            "    </tr>";
    var s4 = "<tr>\n" +
            "        <td colspan=\"3\" style=\"text-align: left; background-color: #F4F5F7\">⑤验收栏</td>\n" +
            "    </tr>\n" +
            "    <tr>\n" +
            "        <td colspan=\"3\" style=\"width: 100%; border: 0px\">\n" +
            "            <table class=\"Tabel_pl\" style=\"border: 0px\">\n" +
            "                <tr>\n" +
            "                    <td style=\"width: 11%; border-left: 0px; border-top: 0px; border-bottom: 0px; text-align: right; background-color: #BFDFFF\">验收日期：</td>\n";
    if (record.D_DATE_ACP == null) {
        s4 = s4 + "                    <td style=\"width: 22%; border-top: 0px; border-bottom: 0px; text-align: left;\"></td>" +
                "                    <td style=\"width: 11%; border-top: 0px; border-bottom: 0px; text-align: right; background-color: #BFDFFF\">提前、逾期时间：</td>\n";
    } else {
        s4 = s4 + "                    <td style=\"width: 22%; border-top: 0px; border-bottom: 0px; text-align: left;\">" + record.D_DATE_ACP + "</td>" +
                "                    <td style=\"width: 11%; border-top: 0px; border-bottom: 0px; text-align: right; background-color: #BFDFFF\">提前、逾期时间：</td>\n";
    }
    if (record.I_OTHERHOUR == null) {
        s4 = s4 + "\t\t\t\t\t<td style=\"width: 22%; border-top: 0px; border-bottom: 0px; text-align: left;\"></td>\n" +
                "\t\t\t\t\t<td style=\"width: 11%; border-top: 0px; border-bottom: 0px; text-align: right; background-color: #BFDFFF\">逾期原因：</td>\n";
    } else {
        s4 = s4 + "\t\t\t\t\t<td style=\"width: 22%; border-top: 0px; border-bottom: 0px; text-align: left;\">" + record.V_OTHERREASON + "</td>\n" +
                "\t\t\t\t\t<td style=\"width: 11%; border-top: 0px; border-bottom: 0px; text-align: right; background-color: #BFDFFF\">逾期原因：</td>\n";
    }
    if (record.V_OTHERREASON == null) {
        s4 = s4 + "                    <td style=\"width: 23%; border-top: 0px; border-bottom: 0px; border-right: 0px; text-align: left;\"></td>\n" +
                "                </tr>\n" +
                "                <tr>\n" +
                "                    <td style=\"width: 11%; border-left: 0px; border-bottom: 0px; text-align: right; background-color: #BFDFFF\">检修方说明：</td>\n";
    } else {
        s4 = s4 + "                    <td style=\"width: 23%; border-top: 0px; border-bottom: 0px; border-right: 0px; text-align: left;\">" + record.V_OTHERREASON + "</td>\n" +
                "                </tr>\n" +
                "                <tr>\n" +
                "                    <td style=\"width: 11%; border-left: 0px; border-bottom: 0px; text-align: right; background-color: #BFDFFF\">检修方说明：</td>\n";
    }
    if (record.V_REPAIRCONTENT == null) {
        s4 = s4 + "                    <td style=\"width: 22%; border-bottom: 0px; text-align: left;\"></td>\n" +
                "                    <td style=\"width: 11%; border-bottom: 0px; text-align: right; background-color: #BFDFFF\">检修方签字：</td>\n";
    } else {
        s4 = s4 + "                    <td style=\"width: 22%; border-bottom: 0px; text-align: left;\">" + record.V_REPAIRCONTENT + "</td>\n" +
                "                    <td style=\"width: 11%; border-bottom: 0px; text-align: right; background-color: #BFDFFF\">检修方签字：</td>\n";
    }
    if (record.V_REPAIRSIGN == null) {
        s4 = s4 + "                    <td style=\"width: 22%; border-bottom: 0px; text-align: left;\"></td>\n" +
                "                    <td style=\"width: 11%; border-bottom: 0px; text-align: right; background-color: #BFDFFF\">检修人员：</td>\n";
    } else {
        s4 = s4 + "                    <td style=\"width: 22%; border-bottom: 0px; text-align: left;\">" + record.V_REPAIRSIGN + "</td>\n" +
                "                    <td style=\"width: 11%; border-bottom: 0px; text-align: right; background-color: #BFDFFF\">检修人员：</td>\n";
    }
    if (record.V_REPAIRPERSON == null) {
        s4 = s4 + "                    <td style=\"width: 23%; border-bottom: 0px; border-right: 0px; text-align: left;\"></td>\n" +
                "                </tr>\n" +
                "                <tr>\n" +
                "                    <td style=\"width: 11%; border-left: 0px; border-bottom: 0px; text-align: right; background-color: #BFDFFF\">岗位签字：</td>\n";
    } else {
        s4 = s4 + "                    <td style=\"width: 23%; border-bottom: 0px; border-right: 0px; text-align: left;\">" + record.V_REPAIRPERSON + "</td>\n" +
                "                </tr>\n" +
                "                <tr>\n" +
                "                    <td style=\"width: 11%; border-left: 0px; border-bottom: 0px; text-align: right; background-color: #BFDFFF\">岗位签字：</td>\n";
    }
    if (record.V_POSTMANSIGN == null) {
        s4 = s4 + "                    <td style=\"width: 22%; border-bottom: 0px; text-align: left;\"></td>\n" +
                "                    <td style=\"width: 11%; border-bottom: 0px; text-align: right; background-color: #BFDFFF\">点检员验收意见：</td>\n";
    } else {
        s4 = s4 + "                    <td style=\"width: 22%; border-bottom: 0px; text-align: left;\">" + record.V_POSTMANSIGN + "</td>\n" +
                "                    <td style=\"width: 11%; border-bottom: 0px; text-align: right; background-color: #BFDFFF\">点检员验收意见：</td>\n";
    }
    if (record.V_CHECKMANCONTENT == null) {
        s4 = s4 + "                    <td style=\"width: 22%; border-bottom: 0px; text-align: left;\"></td>\n" +
                "                    <td style=\"width: 11%; border-bottom: 0px; text-align: right; background-color: #BFDFFF\">点检员签字：</td>\n";
    } else {
        s4 = s4 + "                    <td style=\"width: 22%; border-bottom: 0px; text-align: left;\">" + record.V_CHECKMANCONTENT + "</td>\n" +
                "                    <td style=\"width: 11%; border-bottom: 0px; text-align: right; background-color: #BFDFFF\">点检员签字：</td>\n";
    }
    if (record.V_CHECKMANSIGN == null) {
        s4 = s4 + "                    <td style=\"width: 23%; border-bottom: 0px; border-right: 0px; text-align: left;\"></td>\n" +
                "                </tr>\n" +
                "                <tr>\n" +
                "                    <td style=\"width: 11%; border-left: 0px; border-bottom: 0px; text-align: right; background-color: #BFDFFF\">作业区验收：</td>\n";
    } else {
        s4 = s4 + "                    <td style=\"width: 23%; border-bottom: 0px; border-right: 0px; text-align: left;\">" + record.V_CHECKMANSIGN + "</td>\n" +
                "                </tr>\n" +
                "                <tr>\n" +
                "                    <td style=\"width: 11%; border-left: 0px; border-bottom: 0px; text-align: right; background-color: #BFDFFF\">作业区验收：</td>\n";
    }
    if (record.V_WORKSHOPCONTENT == null) {
        s4 = s4 + "                    <td style=\"width: 22%; border-bottom: 0px; text-align: left;\"></td>\n" +
                "                    <td style=\"width: 11%; border-bottom: 0px; text-align: right; background-color: #BFDFFF\">库管员签字：</td>\n";
    } else {
        s4 = s4 + "                    <td style=\"width: 22%; border-bottom: 0px; text-align: left;\">" + record.V_WORKSHOPCONTENT + "</td>\n" +
                "                    <td style=\"width: 11%; border-bottom: 0px; text-align: right; background-color: #BFDFFF\">库管员签字：</td>\n";
    }
    if (record.V_WORKSHOPSIGN == null) {
        s4 = s4 + "                    <td style=\"width: 22%; border-bottom: 0px; text-align: left;\"></td>\n" +
                "                    <td style=\"width: 11%; border-bottom: 0px; text-align: right; background-color: #BFDFFF\">部门签字：</td>\n";
    } else {
        s4 = s4 + "                    <td style=\"width: 22%; border-bottom: 0px; text-align: left;\">" + record.V_WORKSHOPSIGN + "</td>\n" +
                "                    <td style=\"width: 11%; border-bottom: 0px; text-align: right; background-color: #BFDFFF\">部门签字：</td>\n";
    }
    if (record.V_DEPTSIGN == null) {
        s4 = s4 + "                    <td style=\"width: 23%; border-bottom: 0px; border-right: 0px; text-align: left;\"></td>\n";
    } else {
        s4 = s4 + "                    <td style=\"width: 23%; border-bottom: 0px; border-right: 0px; text-align: left;\">" + record.V_DEPTSIGN + "</td>\n";
    }
    s4 = s4 + "                </tr>\n" +
            "            </table>\n" +
            "        </td>\n" +
            "    </tr>\n" +
            "</table>\n" +
            "</div>";
    $("#yesprint").append(s1 + s2 + s3 + s4);
}

function DefaultPrintSettings() {
    try {
        LODOP = getLodop(document.getElementById('LODOP'), document.getElementById('LODOP_EM'));
        LODOP.SET_LICENSES("鞍山市新安杰系统集成有限公司", "559677661718684777294958093190", "", "");
        LODOP.PRINT_INIT("gongdan");
        LODOP.SET_PRINT_PAGESIZE(2, 2100, 2970, 'A4 横向');
    }
    catch (e) {
        $("#exception").show();
    }
}

function Print() {
    try {
        MoreAcceptBill();
//        DefaultPrintSettings();
        for (var i = 1; i <= page; i++) {
//            LODOP.ADD_PRINT_HTM("30", "15", "100%", "100%", $("#page" + i).html());
//            LODOP.PRINT();
            Prnt_Oneform("page" + i + "");
        }
    } catch (e) {
        $("#exception").show();
    }
}

function Prnt_Oneform(strID) {
    DefaultPrintSettings();
//    LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_分页输出四");
    LODOP.ADD_PRINT_HTM("15mm", "10mm", "100%", "100%", $(strID).html());
    LODOP.PRINT();
}

function Preview() {
    try {
        DefaultPrintSettings();
        for (var i = 1; i <= page; i++) {
            LODOP.ADD_PRINT_HTM("30", "15", "100%", "100%", $("#page" + i).html());
            if (i != page) {
                LODOP.NewPage();
            }
        }
        LODOP.PREVIEW();
    } catch (e) {
        $("#exception").show();
    }
}

function NowDate() {
    var s, d = "";
    d = new Date();
    //d.setDate(nowDay);
    var year = d.getFullYear().toString();
    var month = (d.getMonth() + 1).toString();
    var date = (d.getDate()).toString();
    s = year + "-" + month + "-" + date;
    return s;
}

function NowTime() {
    var s, d = "";
    d = new Date();
    var year = d.getHours();
    var month = d.getMinutes();
    var date = d.getSeconds();
    s = year + ":" + month + ":" + date;
    return s;
}

function descBill(content) {
    var temp = [];
    for (var i = 0; i < content.length; i++) {
        if (i < 30) {
            temp.push(content.charAt(i));
            if (i % 10 == 0 && i != 0) {
                temp.push('<br/>');
            }
        }
    }
    return temp.join("");
}

function descBilldesc(content) {
    if (content == '' || content == undefined || content == null) {
        return '';
    } else {
        var temp = [];
        for (var i = 0; i < content.length; i++) {
            if (i < 40) {
                temp.push(content.charAt(i));
            }
        }
        return temp.join("");
    }
}

function subDesc(content, count) {
    var temp = [];
    for (var i = 0; i < content.length; i++) {
        temp.push(content.charAt(i));
        if (i != 0 && i % count == 0) {
            temp.push("<br/>");
        }
    }
    return temp.join("");
}

function rowspan(x, max_operation) {
    if (x == 0) {
        return max_operation;
    } else {
        return max_operation - x * 20
    }
}

function MoreAcceptBill() {
    var argument = window.opener.selectID;
    for (var i = 0; i < argument.length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'No4120/PRO_PM_WORKORDER_JS_REPAIRDEPT',
            method: 'post',
            async: false,
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_ORDERGUID: argument[i]
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
            }
        });
    }
}