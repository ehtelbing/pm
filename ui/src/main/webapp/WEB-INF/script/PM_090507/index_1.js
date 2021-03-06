var selectID = [];
var V_DEPTCODEREPARIR = '';
var V_DEPTCODE = '';
var V_STEPNAME = '';
var V_NEXT_SETP = '';
var V_STEPCODE = '';
var V_PERSONNAME = '';
var taskId = '';
var ProcessInstanceId = '';
var Assignee = '';
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.ProcessInstanceId == ProcessInstanceId) ? ProcessInstanceId = "" : ProcessInstanceId = parameters.ProcessInstanceId;

}

var PerSel = Ext.create('Ext.data.Store', {
    id: 'PerSel',
    autoLoad: false,
    fields: ['V_PERSONCODE', 'V_PERSONNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'hp/PM_ACTIVITI_PROCESS_PER_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});


var windows = Ext.create('Ext.window.Window', {
    id: 'windows',
    title: '审批人',
    layout: 'fit',
    closeAction: 'hide',
    items: [{
        xtype: 'panel',
        frame: true,
        width: 300,
        height: 200,
        layout: 'hbox',
        items: [{
            xtype: 'combobox',
            id: 'selApprover',
            queryMode: 'local',
            editable: false,
            fieldLabel: '下一步审批人',
            labelWidth: 80,
            store: PerSel,
            valueField: 'V_PERSONCODE',
            displayField: 'V_PERSONNAME'
        }],
        buttonAlign: 'center',
        buttons: [
            {
                xtype: "button",
                text: "通过",
                id: "btn1",
                handler: function () {
                    Agree();
                    this.up("window").close();
                }
            },
            {
                xtype: "button", id: "btn2", text: "驳回", handler: function () {
                DisAgree();
                this.up("window").close();
            }
            }]
    }]
});

$(function () {
    // Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
    loadPageInfo();
    loadTaskGrid();

    //   GetBillMatByOrder();
    loadMatList();
});

function loadPageInfo() {
    $.ajax({
        url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_GET',
        type: 'post',
        async: false,
        data: {
            V_V_ORDERGUID: $.url().param("V_ORDERGUID")
        },
        dataType: "json",
        traditional: true,
        success: function (resp) {
            if (resp.list != "" && resp.list != null) {
                V_PERSONNAME = resp.list[0].V_PERSONNAME;
                $("#V_ORGCODE").val(resp.list[0].V_ORGCODE);
                $("#V_ORGNAME").html(resp.list[0].V_ORGNAME);
                $("#V_DEPTCODE").val(resp.list[0].V_DEPTCODE);
                $("#V_EQUIP_NAME").html(resp.list[0].V_EQUIP_NAME);
                $("#V_EQUIP_NO").html(resp.list[0].V_EQUIP_NO);
                $("#V_FUNC_LOC").html(resp.list[0].V_EQUSITENAME);
                $("#V_ORDER_TYP").html(resp.list[0].V_ORDER_TYP);
                $("#V_DEPTNAME").html(resp.list[0].V_DEPTNAME);
                V_DEPTCODE = resp.list[0].V_DEPTCODE;
                $("#V_ORDERGUID").val(resp.list[0].V_ORDERGUID);
                $("#V_DEPTNAMEREPARIR").html(resp.list[0].V_DEPTNAMEREPARIR);
                V_DEPTCODEREPARIR = resp.list[0].V_DEPTCODEREPARIR;
                $("#V_ORDER_TYP_TXT").html(resp.list[0].V_ORDER_TYP_TXT);

                $("#D_START_DATE").html(resp.list[0].D_START_DATE);
                $("#D_FINISH_DATE").html(resp.list[0].D_FINISH_DATE);

                $("#V_SHORT_TXT").html(resp.list[0].V_SHORT_TXT);

                $("#V_ENTERED_BY").html(resp.list[0].V_ENTERED_BY);
                var s1, st1;
                if (resp.list[0].D_ENTER_DATE != '') {
                    s1 = resp.list[0].D_ENTER_DATE;
                    st1 = [];
                    st1 = s1.split(' ');
                } else {
                    s1 = new Date();
                    st1 = [];
                    st1 = s1.split(' ');
                }
                $("#D_ENTER_DATE").html(st1[0]);

                $("#V_WBS").html(resp.list[0].V_WBS);
                $("#proName").html(resp.list[0].V_WBS_TXT);
                $("#V_WBS_TXT").html(resp.list[0].V_WBS_TXT);

                $("#V_ORDERID").html(resp.list[0].V_ORDERID);
                $("#V_DEPTCODEREPARIR").val(resp.list[0].V_DEPTCODEREPARIR);

                $("#V_TOOL").html(resp.list[0].V_TOOL);
                $("#V_TECHNOLOGY").html(resp.list[0].V_TECHNOLOGY);
                $("#V_SAFE").html(resp.list[0].V_SAFE);

                $("#D_DATE_ACP").html(resp.list[0].D_DATE_ACP);
                $("#V_POSTMANSIGN").html(resp.list[0].V_POSTMANSIGN);
                $("#V_CHECKMANCONTENT").html(resp.list[0].V_CHECKMANCONTENT);
                $("#V_CHECKMANSIGN").html(resp.list[0].V_CHECKMANSIGN);
                $("#V_WORKSHOPCONTENT").html(resp.list[0].V_WORKSHOPCONTENT);
                $("#V_WORKSHOPSIGN").html(resp.list[0].V_WORKSHOPSIGN);
                $("#V_DEPTSIGN").html(resp.list[0].V_DEPTSIGN);

                $("#I_OTHERHOUR").html(resp.list[0].I_OTHERHOUR);
                $("#V_OTHERREASON").html(resp.list[0].V_OTHERREASON);
                $("#V_REPAIRCONTENT").html(resp.list[0].V_REPAIRCONTENT);

                $("#V_REPAIRSIGN").html(resp.list[0].V_REPAIRSIGN);
                $("#V_REPAIRPERSON").html(resp.list[0].V_REPAIRPERSON);

                $("#D_FACT_START_DATE").html(resp.list[0].D_FACT_START_DATE);
                $("#D_FACT_FINISH_DATE").html(resp.list[0].D_FACT_FINISH_DATE);

            } else {
            }
        }
    });

    Ext.Ajax.request({
        url: AppUrl + 'Activiti/InstanceState',
        method: 'POST',
        async: false,
        params: {
            instanceId: ProcessInstanceId
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if (resp.list != null && resp.list.length != 0) {
                Assignee = resp.list[0].Assignee;
            }
        }
    });
}

function loadTaskGrid() {
    $.ajax({
        url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_OPERATIONS',
        type: 'post',
        async: false,
        data: {
            V_V_ORDERGUID: $("#V_ORDERGUID").val()
        },
        dataType: "json",
        traditional: true,
        success: function (resp) {
            if (resp.list != "" && resp.list != null) {
                $("#TtableT tbody").empty();
                if (resp.list.length < 3) {
                    $("#TtableTaskTemplate").tmpl(resp.list).appendTo(
                        "#TtableT tbody");
                    for (var i = 0; i < 3 - resp.list.length; i++) {
                        $("#TtableT tbody")
                            .append(
                                "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
                    }
                } else {
                    $("#TtableTaskTemplate").tmpl(resp.list).appendTo(
                        "#TtableT tbody");
                    /*var tool = document.getElementById('V_TOOL');
                     tool.style.height = 45 * resp.list.length;

                     var tech = document.getElementById('V_TECHNOLOGY');
                     tech.style.height = 45 * resp.list.length;

                     var safe = document.getElementById('V_SAFE');
                     safe.style.height = 45 * resp.list.length;*/
                }
            } else {
                $("#TtableT tbody").empty();
                for (var i = 0; i < 3; i++) {
                    $("#TtableT tbody").append("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
                }
            }
        }
    });
}

function loadMatList() {
    $.ajax({
        url: AppUrl + 'zdh/PRO_PM_WORKORDER_SPARE_VIEW',
        type: 'post',
        data: {
            V_V_ORDERGUID: $("#V_ORDERGUID").val()
        },
        dataType: "json",
        traditional: true,
        success: function (resp) {
            if (resp.list != null && resp.list != "") {
                $("#TtableM tbody").empty();
                $.each(resp.list, function (index, item) {
                    item["sid"] = index + 1;
                });
                $("#TtableMTemplate").tmpl(resp.list).appendTo("#TtableM tbody");
            } else {
            }
        }
    });
}

function ViewTask() {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    window.open(AppUrl + 'page/PM_090902/index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}

function ViewLook() {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    window.open(AppUrl + 'page/PM_090903/index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}

function OnClickJJButton() {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    window.open(AppUrl + 'page/PM_090904/index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}

function GetBillMatByOrder() {
    Ext.Ajax.request({
        url: AppUrl + 'mm/WS_EquipGetBillMaterialByOrderService',
        method: 'POST',
        async: false,
        params: {
            V_V_ORDERGUID: $("#V_ORDERGUID").val(),
            V_V_ORDERID: $("#V_ORDERID").html(),
            x_personcode: Ext.util.Cookies.get('v_personcode')
        },
        success: function (resp) {
        }
    });
}

function AgreeShowPer() {
    loadSPR('通过');
    Ext.getCmp('windows').show();
}

function DisAgreeShowPer() {
    loadSPR('不通过');
    Ext.getCmp('windows').show();
}

function Agree() {
    var spyj = '';
    if ($("#spyj").val() == '' || $("#spyj").val() == null) {
        spyj = '审批通过';
    } else {
        spyj = $("#spyj").val();
    }
    if (V_NEXT_SETP.indexOf("sp") == -1 && V_STEPCODE.indexOf("sp") != -1) {//下一步没有审批字样,当前步骤是审批
        Ext.Ajax.request({
            url: AppUrl + 'mm/SetMat',
            type: 'post',
            async: false,
            params: {
                V_V_ORDERGUID: $("#V_ORDERGUID").val(),
                x_personcode: $.cookies.get("v_personcode")
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (resp.V_CURSOR == '1') {
                    Ext.Ajax.request({
                        url: AppUrl + 'Activiti/TaskComplete',
                        type: 'ajax',
                        method: 'POST',
                        params: {
                            taskId: taskId,
                            idea: '通过',
                            parName: [V_NEXT_SETP, "flow_yj"],
                            parVal: [Ext.getCmp('selApprover').getValue(), spyj],
                            processKey: processKey,
                            businessKey: $.url().param("V_ORDERGUID"),
                            V_STEPCODE: V_STEPCODE,
                            V_STEPNAME: V_STEPNAME,
                            V_IDEA: '请审批！',
                            V_NEXTPER: Ext.getCmp('selApprover').getValue(),
                            V_INPER: Ext.util.Cookies.get('v_personcode')
                        },
                        success: function (response) {
                            var resp = Ext.decode(response.responseText);
                            if (resp.ret == '任务提交成功') {
                                Ext.Ajax.request({
                                    url: AppUrl + 'hp/PRO_ACTIVITI_FLOW_AGREE',
                                    method: 'POST',
                                    async: false,
                                    params: {
                                        'V_V_ORDERID': $("#V_ORDERGUID").val(),
                                        'V_V_PROCESS_NAMESPACE': 'WORK',
                                        'V_V_PROCESS_CODE': processKey,
                                        'V_V_STEPCODE': V_STEPCODE,
                                        'V_V_STEPNEXT_CODE': V_NEXT_SETP
                                    },
                                    success: function (ret) {
                                        var resp = Ext.JSON.decode(ret.responseText);
                                        if (resp.V_INFO == 'success') {
                                            window.opener.QueryTab();
                                            window.opener.QuerySum();
                                            window.opener.QueryGrid();
                                            window.close();
                                            window.opener.OnPageLoad();
                                        }
                                    }
                                });
                            } else {
                                Ext.MessageBox.alert('提示', '任务提交失败');
                            }
                        },
                        failure: function (response) {//访问到后台时执行的方法。
                            Ext.MessageBox.show({
                                title: '错误',
                                msg: response.responseText,
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            })
                        }
                    })
                } else {
                    alert("失败");
                }
            }
        });
    } else {
        Ext.Ajax.request({
            url: AppUrl + 'Activiti/TaskComplete',
            type: 'ajax',
            method: 'POST',
            params: {
                taskId: taskId,
                idea: '通过',
                parName: [V_NEXT_SETP, "flow_yj"],
                parVal: [Ext.getCmp('selApprover').getValue(), spyj],
                processKey: processKey,
                businessKey: $.url().param("V_ORDERGUID"),
                V_STEPCODE: V_STEPCODE,
                V_STEPNAME: V_STEPNAME,
                V_IDEA: '请审批！',
                V_NEXTPER: Ext.getCmp('selApprover').getValue(),
                V_INPER: Ext.util.Cookies.get('v_personcode')
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (resp.ret == '任务提交成功') {
                    Ext.Ajax.request({
                        url: AppUrl + 'hp/PRO_ACTIVITI_FLOW_AGREE',
                        method: 'POST',
                        async: false,
                        params: {
                            'V_V_ORDERID': $("#V_ORDERGUID").val(),
                            'V_V_PROCESS_NAMESPACE': 'WORK',
                            'V_V_PROCESS_CODE': processKey,
                            'V_V_STEPCODE': V_STEPCODE,
                            'V_V_STEPNEXT_CODE': V_NEXT_SETP
                        },
                        success: function (ret) {
                            var resp = Ext.JSON.decode(ret.responseText);
                            if (resp.V_INFO == 'success') {
                                window.opener.QueryTab();
                                window.opener.QuerySum();
                                window.opener.QueryGrid();
                                window.close();
                                window.opener.OnPageLoad();
                            }
                        }
                    });
                } else {
                    Ext.MessageBox.alert('提示', '任务提交失败');
                }
            },
            failure: function (response) {//访问到后台时执行的方法。
                Ext.MessageBox.show({
                    title: '错误',
                    msg: response.responseText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                })
            }
        })
    }
}

function DisAgree() {
    var spyj = '';
    if ($("#spyj").val() == '' || $("#spyj").val() == null) {
        spyj = '审批驳回';
    } else {
        spyj = $("#spyj").val();
    }

    if (Assignee != '') {
        Ext.Ajax.request({
            url: AppUrl + 'Activiti/TaskComplete',
            type: 'ajax',
            method: 'POST',
            params: {
                taskId: taskId,
                idea: '不通过',
                parName: ['fqrxg', "flow_yj"],
                parVal: [Assignee, spyj],
                processKey: processKey,
                businessKey: $.url().param("V_ORDERGUID"),
                V_STEPCODE: V_STEPCODE,
                V_STEPNAME: V_STEPNAME,
                V_IDEA: '不通过',
                V_NEXTPER: Assignee,
                V_INPER: Ext.util.Cookies.get('v_personcode')
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (resp.ret == '任务提交成功') {
                    Ext.Ajax.request({
                        //url: AppUrl + 'zdh/PRO_WO_FLOW_AGREE',
                        url: AppUrl + 'hp/PRO_ACTIVITI_FLOW_AGREE',
                        method: 'POST',
                        async: false,
                        params: {
                            'V_V_ORDERID': $("#V_ORDERGUID").val(),
                            'V_V_PROCESS_NAMESPACE': 'WORK',
                            'V_V_PROCESS_CODE': processKey,
                            'V_V_STEPCODE': V_STEPCODE,
                            'V_V_STEPNEXT_CODE': 'fqrxg'
                        },
                        success: function (ret) {
                            var resp = Ext.JSON.decode(ret.responseText);
                            if (resp.V_INFO == 'success') {
                                window.opener.QueryTab();
                                window.opener.QuerySum();
                                window.opener.QueryGrid();
                                window.close();
                                window.opener.OnPageLoad();
                            }
                        }
                    });
                } else {
                    Ext.MessageBox.alert('提示', '任务提交失败');
                }
            },
            failure: function (response) {//访问到后台时执行的方法。
                Ext.MessageBox.show({
                    title: '错误',
                    msg: response.responseText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                })
            }
        })
    } else {
        alert("发起人信息错误，无法驳回");
    }
}

function loadSPR(v_where) {
    $.ajax({//审批人
        url: AppUrl + 'Activiti/GetTaskIdFromBusinessId',
        type: 'post',
        async: false,
        data: {
            businessKey: $("#V_ORDERGUID").val(),
            userCode: Ext.util.Cookies.get('v_personcode')
        },
        success: function (resp) {
            taskId = resp.taskId;
            V_STEPCODE = resp.TaskDefinitionKey;
        }
    });

    Ext.data.StoreManager.lookup('PerSel').load({
        params: {
             V_V_ORGCODE: $("#V_ORGCODE").val(),
             V_V_DEPTCODE: V_DEPTCODE,
             V_V_REPAIRCODE: V_DEPTCODEREPARIR,
             V_V_FLOWTYPE: 'WORK',
             V_V_FLOW_STEP: $.url().param("TaskDefinitionKey"),
             V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
             V_V_SPECIALTY: '%',
             V_V_WHERE: v_where
        }
    });

    Ext.data.StoreManager.lookup('PerSel').on('load', function () {
        var num = 0;
        if (Ext.data.StoreManager.lookup('PerSel').data.length > 0) {
            for (var i = 0; i < Ext.data.StoreManager.lookup('PerSel').data.length; i++) {
                if (Ext.data.StoreManager.lookup('PerSel').data.items[i].data.V_PERSONCODE == Ext.util.Cookies.get('v_personcode')) {
                    num++;
                }
            }
            if (num > 0) {
                Ext.getCmp('selApprover').select(Ext.util.Cookies.get('v_personcode'));
            } else {
                Ext.getCmp('selApprover').select(Ext.data.StoreManager.lookup('PerSel').getAt(0));
            }
        }

    });
}