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
var V_EQUTYPE="";
var MATSIGN=0;
var returnMatSign="";
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.ProcessInstanceId == ProcessInstanceId) ? ProcessInstanceId = "" : ProcessInstanceId = parameters.ProcessInstanceId;

}

$(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
    loadPageInfo();
    loadTaskGrid();

    //   GetBillMatByOrder();
    loadMatList();
    loadSPR();
    $("#btnTask").click(function () {
        if ($('#V_EQUIP_NO').html() == "" || $('#V_EQUIP_NO').html() == null || $("#V_EQUIP_NAME").html() == "" || $("#V_EQUIP_NAME").html()== null || $("#V_FUNC_LOC").html() == "" || $("#V_FUNC_LOC").html() == null) {
            alert("请选择设备");
            return false;
        }
        var equcode=$('#V_EQUIP_NO').html();
        Ext.Ajax.request({
            url:AppUrl+'dxfile/PRO_SAP_EQU_P_SEL_TYPEC',
            async: false,
            method: 'post',
            params: {
                V_V_EQUCODE:equcode
            },
            success:function(response){
                var ret=Ext.decode(response.responseText);
                V_EQUTYPE=ret.V_V_EQUTYPE;
            }
        });
        var owidth = window.document.body.offsetWidth - 200;
        var oheight = window.document.body.offsetHeight - 100;
        var ret = window.open(AppUrl + 'page/PM_070204/index.html?V_ORDERGUID='
            + $("#V_ORDERGUID").val()
            + '&V_DEPTREPAIRCODE=' + V_DEPTCODEREPARIR //$("#selPlant").val()
            + '&V_EQUCODE=' + $('#V_EQUIP_NO').html()
            + '&V_V_ORGCODE=' + $("#V_ORGCODE").val()
            + '&V_V_DEPTCODE=' + $("#V_DEPTCODE").val() +
            '&V_EQUTYPE=' + V_EQUTYPE, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
        loadTaskGrid();
    });
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
                // V_EQUTYPE=resp.list[0].V_EQUTYPECODE;
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
                for(var i=0;i<=resp.list.length;i++){
                    if(resp.list[i].ActivityName=="Start"){
                        Assignee = resp.list[i].Assignee;
                        break;
                    }
                }
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

function Agree() {
    Ext.getBody().mask('<p>审批中...请稍候</p>');
    workMatChangeSel();
    if(MATSIGN==1||returnMatSign=="1"){
        matChangeFlow();
    }else{


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
                    parVal: [$("#selApprover").val(), spyj],
                    processKey: processKey,
                    businessKey: $.url().param("V_ORDERGUID"),
                    V_STEPCODE: V_STEPCODE,
                    V_STEPNAME: V_STEPNAME,
                    V_IDEA: '请审批！',
                    V_NEXTPER: $("#selApprover").val(),
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
                                'V_V_PROCESS_NAMESPACE': 'WorkOrder',
                                'V_V_PROCESS_CODE': processKey,
                                'V_V_STEPCODE': V_STEPCODE,
                                'V_V_STEPNEXT_CODE': V_NEXT_SETP
                            },
                            success: function (ret) {
                                var resp = Ext.JSON.decode(ret.responseText);
                                if (resp.V_INFO == 'success') {
                                    workMatChangeUpdt();
                                    Ext.getBody().unmask();//去除页面笼罩
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
                    Ext.getBody().unmask();//去除页面笼罩
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: response.responseText,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    })
                }
            })
                    } else {
                        Ext.getBody().unmask();//去除页面笼罩
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
                    parVal: [$("#selApprover").val(), spyj],
                    processKey: processKey,
                    businessKey: $.url().param("V_ORDERGUID"),
                    V_STEPCODE: V_STEPCODE,
                    V_STEPNAME: V_STEPNAME,
                    V_IDEA: '请审批！',
                    V_NEXTPER: $("#selApprover").val(),
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
                                'V_V_PROCESS_NAMESPACE': 'WorkOrder',
                                'V_V_PROCESS_CODE': processKey,
                                'V_V_STEPCODE': V_STEPCODE,
                                'V_V_STEPNEXT_CODE': V_NEXT_SETP
                            },
                            success: function (ret) {
                                var resp = Ext.JSON.decode(ret.responseText);
                                if (resp.V_INFO == 'success') {
                                    Ext.getBody().unmask();//去除页面笼罩
                                    window.opener.QueryTab();
                                    window.opener.QuerySum();
                                    window.opener.QueryGrid();
                                    window.close();
                                    window.opener.OnPageLoad();
                                }
                            }
                        });
                    } else {
                        Ext.getBody().unmask();//去除页面笼罩
                        Ext.MessageBox.alert('提示', '任务提交失败');
                    }
                },
                failure: function (response) {//访问到后台时执行的方法。
                    Ext.getBody().unmask();//去除页面笼罩
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
}

function DisAgree() {
    Ext.getBody().mask('<p>驳回中...请稍候</p>');
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
                            'V_V_PROCESS_NAMESPACE': 'WorkOrder',
                            'V_V_PROCESS_CODE': processKey,
                            'V_V_STEPCODE': V_STEPCODE,
                            'V_V_STEPNEXT_CODE': 'fqrxg'
                        },
                        success: function (ret) {
                            var resp = Ext.JSON.decode(ret.responseText);
                            if (resp.V_INFO == 'success') {
                                Ext.getBody().unmask();//去除页面笼罩
                                window.opener.QueryTab();
                                window.opener.QuerySum();
                                window.opener.QueryGrid();
                                window.close();
                                window.opener.OnPageLoad();
                            }
                        }
                    });
                } else {
                    Ext.getBody().unmask();//去除页面笼罩
                    Ext.MessageBox.alert('提示', '任务提交失败');
                }
            },
            failure: function (response) {//访问到后台时执行的方法。
                Ext.getBody().unmask();//去除页面笼罩
                Ext.MessageBox.show({
                    title: '错误',
                    msg: response.responseText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                })
            }
        })
    } else {
        Ext.getBody().unmask();//去除页面笼罩
        alert("发起人信息错误，无法驳回");
    }
}

function loadSPR() {
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

    $.ajax({//审批人
        url: AppUrl + 'hp/PM_ACTIVITI_PROCESS_PER_SEL',
        type: 'post',
        async: false,
        data: {
            V_V_ORGCODE: $("#V_ORGCODE").val(),
            V_V_DEPTCODE: V_DEPTCODE,
            V_V_REPAIRCODE: V_DEPTCODEREPARIR,
            V_V_FLOWTYPE: 'WORK',
            V_V_FLOW_STEP: $.url().param("TaskDefinitionKey"),
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_SPECIALTY: '%',
            V_V_WHERE: '通过'
        },
        success: function (resp) {
            $("#selApprover").empty();
            var result = [];
            if (resp.list != null) {
                $.each(resp.list, function (index, item) {
                    result.push("<option value=\"" + item.V_PERSONCODE + "\">" + item.V_PERSONNAME + "</option>");
                });
                processKey = resp.RET;
                V_STEPNAME = resp.list[0].V_V_FLOW_STEPNAME;
                V_NEXT_SETP = resp.list[0].V_V_NEXT_SETP;

                $("#selApprover").html(result.join(""));
            }
            //$("#selApprover").val(Assignee);
            //$("#selApprover").val($.cookies.get('v_personcode'));

            Ext.getBody().unmask();//去除页面笼罩
            for (var i = 0; i < resp.list.length; i++) {
                if (resp.list[i].V_PERSONCODE == Ext.util.Cookies.get('v_personcode')) {
                    $("#selApprover").val(Ext.util.Cookies.get('v_personcode'));
                }
                if (resp.list[i].V_PERSONCODE == Assignee) {
                    $("#selApprover").val(Assignee);
                }
            }
            //createDD();
        }
    });
}

//物料编辑
function OpenEditMat() {
    if ($('#V_EQUIP_NO').html() == '') {
        alert('请选择设备！');
        return;
    }
    Ext.Ajax.request({
        url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_ACTIVITY',
        type: "post",
        async: false,
        params: {
            V_V_ORDERGUID: $("#V_ORDERGUID").val()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if ($('#V_EQUIP_NO').html() == "") {
                alert("设备编码不能为空.");
            } else {
                var owidth = window.document.body.offsetWidth;
                var oheight = window.document.body.offsetHeight;
                var ret = window.open(AppUrl + 'page/PM_050103/index.html?flag=all&V_ORDERGUID=' + $("#V_ORDERGUID").val() + '&V_EQUCODE='+$("#V_EQUCODE").val()+'','_blank','height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
                loadMatList();
            }
        }
    });
}

function loadSetMat(){
    MATSIGN=1;

}

function matChangeFlow(){
    var FistSpPerCode="";
    var FistSpPerName="";
    Ext.Ajax.request({//流程第一审批人
        url: AppUrl + 'dxfile/PM_ACTIVITI_STEP_LOG_SEL',
        type: 'post',
        async: false,
        params: {
            V_GUID: $("#V_ORDERGUID").val(),
            V_PRO_GUID: processKey,
            V_BEFORE_STEP: 'start'

        },
        success: function (response) {
            var resp=Ext.decode(response.responseText);
            if (resp.list.length>0) {
                FistSpPerCode=resp.list[0].V_NEXTPER;
                FistSpPerName=resp.list[0].V_PERSONNAME;
            }
        }
    });

    Ext.Ajax.request({//下一步流程和审批步骤
        url: AppUrl + 'hp/PM_ACTIVITI_PROCESS_PER_SEL',
        type: 'post',
        async: false,
        params: {
            V_V_ORGCODE: $("#V_ORGCODE").val(),
            V_V_DEPTCODE: V_DEPTCODE,
            V_V_REPAIRCODE: V_DEPTCODEREPARIR,
            V_V_FLOWTYPE: 'WORK',
            V_V_FLOW_STEP: $.url().param("TaskDefinitionKey"),
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_SPECIALTY: '%',
            V_V_WHERE: '修改'
        },
        success: function (response) {
            var resp=Ext.decode(response.responseText);
            if (resp.list.length>0) {
                // FistSpPerCode=resp.list[0].V_PERSONCODE;
                // FistSpPerName=resp.list[0].V_PERSONNAME;
                processKey = resp.RET;
                V_STEPNAME = resp.list[0].V_V_FLOW_STEPNAME;
                V_NEXT_SETP = resp.list[0].V_V_NEXT_SETP;
            }
        }
    });
    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: AppUrl + 'mm/SetMat',
        params: {
            V_V_ORDERGUID: $("#V_ORDERGUID").val(),
            x_personcode: Ext.util.Cookies.get('v_personcode')
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
                            idea: '修改',
                            parName: [V_NEXT_SETP, "flow_yj"],
                            parVal: [FistSpPerCode, '物料修改重新审批'],//$("#selApprover").val()
                            processKey: processKey,
                            businessKey: $.url().param("V_ORDERGUID"),
                            V_STEPCODE: V_STEPCODE,
                            V_STEPNAME: V_STEPNAME,
                            V_IDEA: '物料修改重新审批',
                            V_NEXTPER: FistSpPerCode,//$("#selApprover").val(),
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
                                        'V_V_PROCESS_NAMESPACE': 'WorkOrder',
                                        'V_V_PROCESS_CODE': processKey,
                                        'V_V_STEPCODE': V_STEPCODE,
                                        'V_V_STEPNEXT_CODE': V_NEXT_SETP
                                    },
                                    success: function (ret) {
                                        var resp = Ext.JSON.decode(ret.responseText);
                                        if (resp.V_INFO == 'success') {
                                            workMatChangeUpdt();
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
                    });
            }
            else {
                Ext.Ajax.request({
                    method: 'POST',
                    async: false,
                    url: AppUrl + 'zdh/PRO_PM_WORKORDER_SEND_UPDATE',
                    params: {
                        V_V_ORDERGUID: $("#V_ORDERGUID").val(),
                        V_V_SEND_STATE: "失败"
                    },
                    success: function (response) {
                        alert("工单创建失败：" + $("#V_ORDERID").html());
                        history.go(0);
                    }
                });
            }
        }
    });
}
//查找是否物料有改变
function workMatChangeSel(){
    Ext.Ajax.request({
        url:AppUrl+'dxfile/PRO_MAT_CHANGE_SIGN_SEL',
        type:'POST',
        async:false,
        params:{
            V_WORKGUID:$("#V_ORDERGUID").val(),
            V_SIGN:''
        },
        success:function(ret){
            var resp=Ext.decode(ret.responseText);
            if(resp.RET!=undefined){
                returnMatSign=resp.RET;
            }
        }
    });
}
//物料改变值状态
function workMatChangeUpdt(){
    Ext.Ajax.request({
        url:AppUrl+'dxfile/PRO_WORKORDER_MAT_CHANGE_UPD',
        type:'POST',
        async:false,
        params:{
            V_WORKGUID:$("#V_ORDERGUID").val(),
            V_SIGN:'0'
        },
        success:function(ret){
            var resp=Ext.decode(ret.responseText);

        }
    });
}