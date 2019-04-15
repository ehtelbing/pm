var selectID = [];
var V_EQUCODE='';
var V_EQUTYPE = '';
var V_EQUTYPECODE = null;
// if (location.href.split('?')[1] != undefined) {
//     V_EQUCODE = Ext.urlDecode(location.href.split('?')[1]).V_EQUCODE;
// }
$(function () {
    loadPageInfo();
    bindDate("V_D_START_DATE");
    bindDate("V_D_FINISH_DATE");
    bindDate("V_D_ENTER_DATE");

    NowDate_b("V_D_START_DATE");
    NowDate_e("V_D_FINISH_DATE");
    NowDate2("V_D_ENTER_DATE");
    loadDEPT();

    loadTaskGrid();
    loadMatList();
    $("#V_V_ENTERED_BY").html(Ext.util.Cookies.get('v_personname2'));
    $("#V_EQUIP_NAME").click(function () {
        var owidth = window.document.body.offsetWidth - 200;
        var oheight = window.document.body.offsetHeight - 100;

        var ret = window.open(AppUrl + 'page/PM_090101/index.html?V_DEPTCODE=' + $("#selZYQ").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
        // var ret = window.open(AppUrl + 'page/PM_090101/equTab.html?V_DEPTCODE=' + $("#selZYQ").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
    });

    // $("#btnTask").click(function () {
    //     if ($("#V_EQUCODE").val() == "" || $("#V_EQUCODE").val() == null || $("#V_EQUNAME").val() == "" || $("#V_EQUNAME").val() == null || $("#V_EQUSITE").val() == "" || $("#V_EQUSITE").val() == null) {
    //         alert("请选择设备");
    //         return false;
    //     }
    //     var owidth = window.document.body.offsetWidth - 200;
    //     var oheight = window.document.body.offsetHeight - 100;
    //     var ret = window.open(AppUrl + 'page/PM_070204/index.html?V_ORDERGUID='
    //         + $("#V_ORDERGUID").val()
    //         + '&V_DEPTREPAIRCODE=' + $("#selPlant").val()
    //         + '&V_EQUCODE=' + $("#V_EQUCODE").val()
    //         + '&V_V_ORGCODE=' + $("#V_ORGCODE").val()
    //         + '&V_V_DEPTCODE=' + $("#V_DEPTCODE").val() +
    //         '&V_EQUTYPE=' + V_EQUTYPE, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
    //     loadTaskGrid();
    // });

    $("#selType").change(function () {
        $("#ORDER_TYP").html($("#selType").val());
    });

    $("#selDW").change(function () {
        loadZYQ($("#selDW").val());
    });

    $("#selZYQ").change(function () {
        loadRepairList();
        createDD();
    });

    $("#selPlant").change(function () {
        createDD();
    });
    $("#selPlant").on("input propertychange",function(){
        if($("#selPlant").val()=="99170208"){
            $("#selType").val("AK11");
        }else{
            $("#selType").val($("#selType").get(0).checked=true)
        }
    });

    //WBS编码选择页面
    $("#V_V_WBS").click(function () {
        var owidth = window.document.body.offsetWidth - 200;
        var oheight = window.document.body.offsetHeight - 100;
        var ret = window.open(AppUrl + 'page/PM_04/index.html?V_ORGCODE=' + $("#V_ORGCODE").val() + '&V_DEPTCODE=' + $("#V_DEPTCODE").val() +
            '&V_EQUTYPECODE=' + V_EQUTYPECODE + '&V_EQUCODE=' + $("#V_EQUCODE").val() + '&wbsCode=' + $("#wbsCode").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
    });
    $("#btnTask").click(function () {
        if ($("#V_EQUIP_NO").val() == "" || $("#V_EQUIP_NO").val() == null || $("#V_EQUIP_NAME").val() == "" || $("#V_EQUIP_NAME").val() == null || $("#V_FUNC_LOC").val() == "" || $("#V_FUNC_LOC").val() == null) {
            alert("请选择设备");
            return false;
        }
        var owidth = window.document.body.offsetWidth - 200;
        var oheight = window.document.body.offsetHeight - 100;
        var ret = window.open(AppUrl + 'page/PM_070204/index.html?V_ORDERGUID='
            + $("#V_ORDERGUID").val()
            + '&V_DEPTREPAIRCODE=' + $("#V_DEPTNAMEREPARI").val()
            + '&V_EQUCODE=' + $("#V_EQUIP_NO").val()
            + '&V_V_ORGCODE=' + $("#V_ORGCODE").val()
            + '&V_V_DEPTCODE=' + $("#V_DEPTCODE").val() +
            '&V_EQUTYPE=', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
        loadTaskGrid();
    });

});

function loadPageInfo() {

    $.ajax({
        url: AppUrl + 'cxy/PRO_PM_WORKORDER_SBGZ_CREATE_2',
        type: 'post',
        async: false,
        data: {
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_PERNAME: Ext.util.Cookies.get('v_personname2'),
            V_V_ORDER_GUID: ''
        },
        success: function (resp) {
            if (resp.list != "" && resp.list != null) {
                $("#V_ORDERGUID").val(resp.list[0].V_ORDERGUID);
                $("#V_ORGCODE").val(resp.list[0].V_ORGCODE);
                $("#V_DEPTCODE").val(resp.list[0].V_DEPTCODE);

                $("#V_SHORT_TXT").val(resp.list[0].V_SHORT_TXT);
                $("#V_V_WBS").val(resp.list[0].V_WBS);
                $("#V_V_WBS_TXT").val(resp.list[0].V_WBS_TXT);
                $("#V_D_START_DATE").val(resp.list[0].D_START_DATE);
                $("#V_D_FINISH_DATE").val(resp.list[0].D_FINISH_DATE);

                $("#tool").val(resp.list[0].V_TOOL);
                $("#tech").val(resp.list[0].V_TECHNOLOGY);
                $("#safe").val(resp.list[0].V_SAFE);

                // $("#selDW").html(resp.list[0].V_ORGNAME);
                // $("#selZYQ").html(resp.list[0].V_DEPTNAME);

                $("#selZYQ").val(resp.list[0].V_DEPTCODE);
                // $("#V_EQUIP_NAME").val(V_EQUNAME);
                // $("#V_EQUIP_NO").val(V_EQUCODE);
                // $("#V_FUNC_LOC").val(V_EQUSITENAME);
                $("#V_EQUIP_NAME").val(resp.list[0].V_EQUIP_NAME);
                $("#V_EQUIP_NO").val(resp.list[0].V_EQUIP_NO);
                $("#V_FUNC_LOC").val(resp.list[0].V_EQUSITENAME);
                $("#V_ORDERID").html(resp.list[0].V_ORDERID);

                $("#V_V_ENTERED_BY").html(resp.list[0].V_PERSONNAME);
                $("#V_D_ENTER_DATE").html(resp.list[0].D_ENTER_DATE);

                $("#V_DEPTCODEREPARIR").val(resp.list[0].V_DEPTCODEREPAIR);
            }

        }
    });
}

function loadDEPT() {//工厂单位
    $.ajax({
        url: AppUrl + 'PROJECT/PRO_BASE_DEPT_VIEW_ROLE',
        type: 'post',
        async: false,
        data: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
            V_V_DEPTCODENEXT: '%',
            V_V_DEPTTYPE: '基层单位'
        },
        success: function (resp) {
            var result = [];
            $.each(resp.list, function (index, item) {
                result.push("<option value=\"" + item.V_DEPTCODE + "\">" + item.V_DEPTNAME + "</option>");
            });
            $("#selDW").html(result.join(""));
            $("#selDW").val($("#V_ORGCODE").val());
            loadZYQ($("#selDW").val());

        }
    });


}

function loadZYQ(dwcode) {
    $.ajax({//作业区
        url: AppUrl + 'PROJECT/PRO_BASE_DEPT_VIEW_ROLE',
        type: 'post',
        async: false,
        data: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODE: dwcode,
            V_V_DEPTCODENEXT: '%',
            V_V_DEPTTYPE: '主体作业区'
        },
        success: function (resp) {
            var result = [];
            $.each(resp.list, function (index, item) {
                result.push("<option value=\"" + item.V_DEPTCODE + "\">" + item.V_DEPTNAME + "</option>");
            });
            $("#selZYQ").html(result.join(""));
            $("#selZYQ").val($("#V_DEPTCODE").val());
            loadPlantlist();
        }
    });
}

function loadPlantlist() {
    $.ajax({
        url: AppUrl + 'basic/PRO_PM_REPAIRDEPT_VIEW',
        type: "post",
        traditional: true,
        async: false,
        data: {
            V_V_DEPTCODE: $("#selZYQ").val()
        },
        success: function (resp) {
         //   var resp = Ext.JSON.decode(re.responseText);
            $("#V_DEPTNAMEREPARI").empty();
            $.each(resp.list, function (index, item) {
                if (item.V_DEPTCODEREPARIR == $("#V_DEPTCODEREPARI").val()&&index==0) {
                    $("<option selected=\"selected\" value=\"" + item.V_DEPTREPAIRCODE + "\">" + item.V_DEPTREPAIRNAME + "</option>").appendTo("#V_DEPTNAMEREPARI");
                } else {
                   $("<option  value=\"" + item.V_DEPTREPAIRCODE + "\">" + item.V_DEPTREPAIRNAME + "</option>").appendTo("#V_DEPTNAMEREPARI");
                }
            });
            if($("#V_DEPTCODEREPARI").val()!=null||$("#V_DEPTCODEREPARI").val()!=''){
                $("#V_DEPTNAMEREPARI").val($("#V_DEPTCODEREPARI").val());
            }
            loadSPR();
        }
    });
}

function loadSPR() {
    $.ajax({//审批人
        url: AppUrl + 'cjy/PM_ACTIVITI_PROCESS_PER_SEL',
        type: 'post',
        async: false,
        data: {
            V_V_ORGCODE: $("#selDW").val(),
            V_V_DEPTCODE: $("#selZYQ").val(),
            V_V_REPAIRCODE: $("#V_DEPTNAMEREPARI").val(),
            V_V_FLOWTYPE: 'WORK',
            V_V_FLOW_STEP: 'start',
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_SPECIALTY: '%',
            V_V_WHERE: ''
        },
        success: function (resp) {
            $("#selApprover").empty();
            var result = [];
            if (resp.list.length != 0) {
                $.each(resp.list, function (index, item) {
                    result.push("<option value=\"" + item.V_PERSONCODE + "\">" + item.V_PERSONNAME + "</option>");
                });
                processKey = resp.RET;
                V_STEPNAME = resp.list[0].V_V_FLOW_STEPNAME;
                V_NEXT_SETP = resp.list[0].V_V_NEXT_SETP;

                $("#selApprover").html(result.join(""));
            }

            $("#selApprover").val($.cookies.get('v_personcode'));

        }
    });
}

/**
 * 加载编辑任务的grid
 */
function loadTaskGrid() {
    Ext.Ajax.request({
        url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_OPERATIONS',
        type: 'post',
        async: false,
        params: {
            V_V_ORDERGUID: $("#V_ORDERGUID").val()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if (resp.list != "" && resp.list != null) {
                $("#TtableT tbody").empty();
                if (resp.list.length < 3) {
                    $("#TtableTaskTemplate").tmpl(resp.list).appendTo("#TtableT tbody");
                    for (var i = 0; i < 3 - resp.list.length; i++) {
                        $("#TtableT tbody").append("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
                    }
                } else {
                    $("#TtableTaskTemplate").tmpl(resp.list).appendTo("#TtableT tbody");
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
        traditional: true,
        data: {
            V_V_ORDERGUID: $("#V_ORDERGUID").val()
        },
        success: function (resp) {
            if (resp.list != null && resp.list != "") {
                $("#TtableM tbody").empty();
                $.each(resp.list, function (index, item) {
                    item["sid"] = index + 1;
                });
                $("#TtableMTemplate").tmpl(resp.list).appendTo("#TtableM tbody");
            } else {/*$("#TtableM tbody").empty();*/
            }
        }
    });
}

function loadToolAndTxtList() {
    $.ajax({
        url: AppUrl + '/cxy/PRO_PM_WORKORDER_SBGZ_CREATE_2',
        type: 'post',
        async: false,
        data: {
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_PERNAME: Ext.util.Cookies.get('v_personname2'),
            V_V_ORDER_GUID: $("#V_ORDERGUID").val()
        },
        success: function (resp) {
            if (resp.list != "" && resp.list != null) {

                if (resp.list[0].V_TOOL == "") {
                    $("#tool").val("");
                } else {
                    $("#tool").val(resp.list[0].V_TOOL);
                }

                if (resp.list[0].V_SHORT_TXT == "") {
                    $("#V_SHORT_TXT").val("");
                } else {
                    $("#V_SHORT_TXT").val(resp.list[0].V_SHORT_TXT);
                }
                if (resp.list[0].V_TECHNOLOGY == "") {
                    $("#tech").val("");
                } else {
                    $("#tech").val(resp.list[0].V_TECHNOLOGY);
                }
                if (resp.list[0].V_SAFE == "") {
                    $("#safe").val("");
                } else {
                    $("#safe").val(resp.list[0].V_SAFE);
                }
            }
        }
    });
}

function GetModel() {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_191710/index.html?V_GUID=' + $("#V_ORDERGUID").val() + '&V_ORGCODE=' +
        $("#V_ORGCODE").val() + '&V_DEPTCODE=' + $("#V_DEPTCODE").val() + '&V_EQUTYPE=' + '&V_EQUCODE=' +
        $("#V_DEPTNAMEREPARI").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
    loadToolAndTxtList();
    loadTaskGrid();
    loadMatList();
}

function Getjxzy() {//关联检修标准
    if ($("#V_EQUCODE").val() == '') {
        alert('请选择设备！');
        return;
    }
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_0901/index_jx.html?V_GUID=' + $("#V_ORDERGUID").val() + '&V_ORGCODE=' +
        $("#V_ORGCODE").val() + '&V_DEPTCODE=' + $("#V_DEPTCODE").val() + '&V_EQUTYPE=' + '&V_EQUCODE=' +
        $("#V_EQUCODE").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');


}

function OpenEditMat() {
    if ($("#V_EQUCODE").val() == '') {
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
            if ($("#V_EQUIP_NO").val() == "") {
                alert("设备编码不能为空.");
            } else {
                var owidth = window.document.body.offsetWidth;
                var oheight = window.document.body.offsetHeight;
                var ret = window.open(AppUrl + 'page/PM_050102/index.html?flag=all&V_ORDERGUID=' + $("#V_ORDERGUID").val() + '','', '_blank', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
                loadMatList();
            }
        }
    });
}

function CreateBill() {

    if (!confirm("是否生成工单?")) {
        return false;
    } else {

        Ext.Ajax.request({
            url: AppUrl + 'cxy/PRO_PM_WORKORDER_F_SAVE',
            type: 'post',
            async: false,
            params: {

                V_V_PERCODE: Ext.util.Cookies.get("v_personcode"),
                V_V_PERNAME: Ext.util.Cookies.get("v_personname2"),
                V_V_EQUCODE:$("#V_EQUIP_NO").val(),
                V_V_ORGCODE:$("#selDW").val(),
                V_V_DEPTCODE:$("#selZYQ").val(),
                V_V_WORKORDER_TYPE:'AK06',
                V_V_ORDERGUID: $("#V_ORDERGUID").val(),
                V_V_SHORT_TXT: $("#V_SHORT_TXT").val(),
                V_V_DEPTCODEREPAIR: $("#V_DEPTNAMEREPARI").val(),
                V_D_START_DATE: $("#V_D_START_DATE").val(),
                V_D_FINISH_DATE: $("#V_D_FINISH_DATE").val(),
                V_V_WBS: $("#V_V_WBS").val(),
                V_V_WBS_TXT: $("#V_V_WBS_TXT").val()
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (resp.RET == '成功') {
                    if (V_NEXT_SETP.indexOf("sp") == -1) {//下一步没有审批字样
                        // Ext.Ajax.request({
                        //     method: 'POST',
                        //     async: false,
                        //     url: AppUrl + 'mm/SetMat',
                        //     params: {
                        //         V_V_ORDERGUID: $("#V_ORDERGUID").val(),
                        //         x_personcode: Ext.util.Cookies.get('v_personcode')
                        //     },
                        //     success: function (response) {
                        //         var resp = Ext.decode(response.responseText);
                        //         if (resp.V_CURSOR == '1') {

                                    Ext.Ajax.request({
                                        method: 'POST',
                                        async: false,
                                        url: AppUrl + 'zdh/PRO_PM_WORKORDER_SEND_UPDATE',
                                        params: {
                                            V_V_ORDERGUID: $("#V_ORDERGUID").val(),//guid,
                                            V_V_SEND_STATE: "成功"
                                        },
                                        success: function (response) {
                                            Ext.Ajax.request({
                                                url: AppUrl + 'Activiti/StratProcess',
                                                async: false,
                                                method: 'post',
                                                params: {
                                                    parName: ["originator", "flow_businesskey", V_NEXT_SETP, "idea", "remark", "flow_code", "flow_yj", "flow_type"],
                                                    parVal: [Ext.util.Cookies.get('v_personcode'), $("#V_ORDERGUID").val(), $("#selApprover").val(), "请审批!", $("#V_SHORT_TXT").val(), $("#V_ORDERID").html(), "请审批！", "WORK"],
                                                    processKey: processKey,
                                                    businessKey: $("#V_ORDERGUID").val(),
                                                    V_STEPCODE: 'start',
                                                    V_STEPNAME: V_STEPNAME,
                                                    V_IDEA: '请审批！',
                                                    V_NEXTPER: $("#selApprover").val(),
                                                    V_INPER: Ext.util.Cookies.get('v_personcode')
                                                },
                                                success: function (response) {
                                                    if (Ext.decode(response.responseText).ret == 'OK') {
                                                        alert("工单创建成功：" + $("#V_ORDERID").html());
                                                        window.opener._selectGridPanel();
                                                        window.close();
                                                    } else if (Ext.decode(response.responseText).error == 'ERROR') {
                                                        Ext.Msg.alert('提示', '该流程发起失败！');
                                                        window.opener._selectGridPanel();
                                                        window.close();
                                                    }
                                                }
                                            });
                                        }
                                    });
                                // }
                        //         else {
                        //             Ext.Ajax.request({
                        //                 method: 'POST',
                        //                 async: false,
                        //                 url: AppUrl + 'zdh/PRO_PM_WORKORDER_SEND_UPDATE',
                        //                 params: {
                        //                     V_V_ORDERGUID: $("#V_ORDERGUID").val(),
                        //                     V_V_SEND_STATE: "失败"
                        //                 },
                        //                 success: function (response) {
                        //                     alert("工单创建失败：" + $("#V_ORDERID").html());
                        //                     window.opener._selectGridPanel();
                        //                     window.close();
                        //                 }
                        //             });
                        //         }
                        //     }
                        // });
                    } else {

                        Ext.Ajax.request({
                            url: AppUrl + 'Activiti/StratProcess',
                            async: false,
                            method: 'post',
                            params: {
                                parName: ["originator", "flow_businesskey", V_NEXT_SETP, "idea", "remark", "flow_code", "flow_yj", "flow_type"],
                                parVal: [Ext.util.Cookies.get('v_personcode'), $("#V_ORDERGUID").val(), $("#selApprover").val(), "请审批!", $("#V_SHORT_TXT").val(), $("#V_ORDERID").html(), "请审批！", "WORK"],
                                processKey: processKey,
                                businessKey: $("#V_ORDERGUID").val(),
                                V_STEPCODE: 'start',
                                V_STEPNAME: V_STEPNAME,
                                V_IDEA: '请审批！',
                                V_NEXTPER: $("#selApprover").val(),
                                V_INPER: Ext.util.Cookies.get('v_personcode')
                            },
                            success: function (response) {
                                if (Ext.decode(response.responseText).ret == 'OK') {
                                    alert("工单创建成功：" + $("#V_ORDERID").html());
                                    // history.go(0);
                                    window.opener._selectGridPanel();
                                    window.close();
                                } else if (Ext.decode(response.responseText).error == 'ERROR') {
                                    Ext.Msg.alert('提示', '该流程发起失败！');
                                    window.opener._selectGridPanel();
                                    window.close();
                                }
                            }
                        });

                    }
                }
            }
        });

    }
}


function NowDate_b(id) {
    var d, s;
    d = new Date();
    var year = d.getFullYear().toString();
    var month = (d.getMonth() + 1).toString();
    var date = d.getDate().toString();
    var hou = d.getHours().toString();
    var min = d.getMinutes().toString();
    var sen = d.getSeconds().toString();
    //s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " " + dateFomate(hou) + ":" + dateFomate(min) + ":" + dateFomate(sen);
    s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " 08:30:00";

    //try { $("#" + id + "").html(s); } catch (e) { $("#" + id + "").val(s); }
    $("#" + id + "").val(s);
}

function NowDate_e(id) {
    var d, s;
    d = new Date();
    var year = d.getFullYear().toString();
    var month = (d.getMonth() + 1).toString();
    var date = d.getDate().toString();
    var hou = d.getHours().toString();
    var min = d.getMinutes().toString();
    var sen = d.getSeconds().toString();
    //s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " " + dateFomate(hou) + ":" + dateFomate(min) + ":" + dateFomate(sen);
    s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " 16:30:00";

    //try { $("#" + id + "").html(s); } catch (e) { $("#" + id + "").val(s); }
    $("#" + id + "").val(s);
}


function NowDate2(id) {
    var d, s;
    d = new Date();
    var year = d.getFullYear().toString();
    var month = (d.getMonth() + 1).toString();
    var date = d.getDate().toString();
    var hou = d.getHours().toString();
    var min = d.getMinutes().toString();
    var sen = d.getSeconds().toString();
    //s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " " + dateFomate(hou) + ":" + dateFomate(min) + ":" + dateFomate(sen);
    s = year + "-" + dateFomate(month) + "-" + dateFomate(date);
    // try { $("#" + id + "").html(s); } catch (e) { $("#" + id + "").val(s); }
    $("#" + id + "").html(s);
}

function dateFomate(val) {
    if (parseInt(val) <= 9) {
        return "0" + val;
    } else {
        return val;
    }
}

function bindDate(fid) {
    var dt1 = $("#" + fid);
    dt1.datetimepicker({
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthNamesShort: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        showSecond: false,
        dateFormat: 'yy-mm-dd',
        timeFormat: 'hh:mm:ss'
    });
}

function OnStamp() {
    /*var sel = [];
    sel.push($('#V_ORDERGUID').val());
    window.open(AppUrl + "page/No410101/Index.html", sel,"dialogHeight:700px;dialogWidth:1100px");
*/
    selectID.push($('#V_ORDERGUID').val());
    window.open(AppUrl + "page/No410101/Index.html", selectID,
        "dialogHeight:700px;dialogWidth:1100px");
}
function getEquipReturnValue(ret) {
    var str = ret.split('^');
    $("#V_EQUIP_NAME").val(str[1]);
    $("#V_EQUIP_NO").val(str[0]);
    //---update2018-0903
    if (str[3]==""){
        $("#V_FUNC_LOC").val(str[2]);
    }else{
        $("#V_FUNC_LOC").val(str[3]);
    }
    //==end up
    //$("#V_EQUSITE").val(str[3]);
    V_EQUTYPE = str[4];
}

function getReturnWBS(data) {
    $("#V_V_WBS").val(data[0]);
    $("#wbsDesc").val(data[1]);
    $("#proCode").val(data[2]);
    $("#V_V_WBS_TXT").val(data[3]);
}

function loadWorkDesc(mxcode){ //获取模型工单描述
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PM_1917_JXMX_DATA_SEL_WORKDESC',
        methon:'POST',
        async:false,
        params:{
            V_V_MX_CODE: mxcode
        },
        success:function (resp) {
            var res=Ext.decode(resp.responseText);
            if (res.list != "" && res.list != null) {
                $("#V_DEFECTLIST").val(res.list[0].V_BZ);
            }
        }
    });
}