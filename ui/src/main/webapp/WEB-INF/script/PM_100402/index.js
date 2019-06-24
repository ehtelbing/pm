var V_GUID = null;
var V_EQUTYPECODE = null;
var MATERIALCODE = null;
var MATERIALNAME = null;
var KCID = null;
var processKey = '';
var V_NEXT_SETP = '';
var V_STEPNAME = '';
var V_STEPCODE = '';
var V_EQUTYPE = '';
var flag = '';
if (location.href.split('?')[1] != undefined) {
    V_GUID = Ext.urlDecode(location.href.split('?')[1]).V_GUID;
    V_EQUTYPECODE = Ext.urlDecode(location.href.split('?')[1]).V_EQUTYPECODE;
    MATERIALCODE = Ext.urlDecode(location.href.split('?')[1]).MATERIALCODE;
    MATERIALNAME = Ext.urlDecode(location.href.split('?')[1]).MATERIALNAME;
    KCID = Ext.urlDecode(location.href.split('?')[1]).KCID;

}

$(function () {
    //Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
    bindDate("planStartDate");
    bindDate("planFinDate");

    $("#personCode").html(Ext.util.Cookies.get('v_personname2'));
    NowDate2("createDate");
    NowDate_b("planStartDate");
    NowDate_e("planFinDate");

    loadTypelist();
    loadDEPT();
    loadRepairList();


    $("#V_EQUNAME").click(function () {
        var owidth = window.document.body.offsetWidth - 200;
        var oheight = window.document.body.offsetHeight - 100;
        var ret = window.open(AppUrl + 'page/PM_090101/index.html?V_DEPTCODE=' + $("#selZYQ").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
    });

    $("#btnTask").click(function () {
        if ($("#V_EQUCODE").val() == "" || $("#V_EQUCODE").val() == null || $("#V_EQUNAME").val() == "" || $("#V_EQUNAME").val() == null || $("#V_EQUSITE").val() == "" || $("#V_EQUSITE").val() == null) {
            alert("请选择设备");
            return false;
        }
        var owidth = window.document.body.offsetWidth - 200;
        var oheight = window.document.body.offsetHeight - 100;
        var ret = window.open(AppUrl + 'page/PM_070204/index.html?V_ORDERGUID='
            + $("#V_ORDERGUID").val()
            + '&V_DEPTREPAIRCODE=' + $("#selPlant").val()
            + '&V_EQUCODE=' + $("#V_EQUCODE").val()
            + '&V_V_ORGCODE=' + $("#V_ORGCODE").val()
            + '&V_V_DEPTCODE=' + $("#V_DEPTCODE").val() +
            '&V_EQUTYPE=' + V_EQUTYPE, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
        loadTaskGrid();
    });

    $("#selType").change(function () {
        $("#ORDER_TYP").html($("#selType").val());
    });

    $("#selDW").change(function () {
        loadZYQ($("#selDW").val());
    });

    $("#selZYQ").change(function () {
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
    $("#wbsCode").click(function () {
        var owidth = window.document.body.offsetWidth - 200;
        var oheight = window.document.body.offsetHeight - 100;
        var ret = window.open(AppUrl + 'page/PM_04/index.html?V_ORGCODE=' + $("#V_ORGCODE").val() + '&V_DEPTCODE=' + $("#V_DEPTCODE").val() +
            '&V_EQUTYPECODE=' + V_EQUTYPECODE + '&V_EQUCODE=' + $("#V_EQUCODE").val() + '&wbsCode=' + $("#wbsCode").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
    });

});

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

            loadZYQ($("#selDW").val());

        }
    });
    $("#V_EQUIP_NAME").val(MATERIALCODE);
    $("#V_EQUIP_NO").val(MATERIALNAME);

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

            createDD();
        }
    });
}

function createDD() {
    $.ajax({
        url: AppUrl + 'PROJECT/PRO_PM_WORKORDER_DD_CREATE_XJ',
        type: 'post',
        async: false,
        data: {
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_PERNAME: Ext.util.Cookies.get('v_personname2'),
            V_V_ORGCODE: $("#selDW").val(),
            V_V_DEPTCODE: $("#selZYQ").val(),
            V_V_SOURCECODE: '%'
        },
        success: function (resp) {

            if (resp.list != "" && resp.list != null) {
                $("#V_ORGCODE").val(resp.list[0].V_ORGCODE);
                $("#V_DEPTCODE").val(resp.list[0].V_DEPTCODE);
                $("#V_DEPTNAME").html(resp.list[0].V_DEPTNAME);
                $("#D_DATE_ACP").html(resp.list[0].D_DATE_ACP);
                $("#I_OTHERHOUR").html(resp.list[0].I_OTHERHOUR);
                $("#V_OTHERREASON").html(resp.list[0].V_OTHERREASON);
                $("#V_REPAIRCONTENT").html(resp.list[0].V_REPAIRCONTENT);
                $("#V_REPAIRSIGN").html(resp.list[0].V_REPAIRSIGN);
                $("#V_REPAIRPERSON").html(resp.list[0].V_REPAIRPERSON);
                $("#V_POSTMANSIGN").html(resp.list[0].V_POSTMANSIGN);
                $("#V_CHECKMANCONTENT").html(resp.list[0].V_CHECKMANCONTENT);
                $("#V_CHECKMANSIGN").html(resp.list[0].V_CHECKMANSIGN);
                $("#V_WORKSHOPCONTENT").html(resp.list[0].V_WORKSHOPCONTENT);
                $("#V_WORKSHOPSIGN").html(resp.list[0].V_WORKSHOPSIGN);
                $("#V_DEPTSIGN").html(resp.list[0].V_DEPTSIGN);

                $("#V_EQUNAME").val(resp.list[0].V_EQUIP_NAME);
                $("#V_EQUCODE").val(resp.list[0].V_EQUIP_NO);
                $("#V_EQUSITE").val(resp.list[0].V_FUNC_LOC);
                $("#D_START_DATE").val(resp.list[0].D_START_DATE);
                $("#D_FINISH_DATE").val(resp.list[0].D_FINISH_DATE);
                $("#V_TOOL").val(resp.list[0].V_TOOL);
                $("#V_TECHNOLOGY").val(resp.list[0].V_TECHNOLOGY);
                $("#V_SAFE").val(resp.list[0].V_SAFE);

                $("#ORDER_TYP").html(resp.list[0].V_ORDER_TYP);
                $("#V_ENTERED_BY").html(resp.list[0].V_ENTERED_BY);
                $("#D_ENTER_DATE").html(resp.list[0].D_ENTER_DATE);
                $("#D_FACT_START_DATE").html(resp.list[0].D_FACT_START_DATE);
                $("#D_FACT_FINISH_DATE").html(resp.list[0].D_FACT_FINISH_DATE);

                $("#V_ORDERGUID").val(resp.list[0].V_ORDERGUID);
                $("#V_SHORT_TXT").val(resp.list[0].V_SHORT_TXT);
                 $("#V_ORDERID").html(resp.list[0].V_ORDERID);
                $("#V_DEPTCODEREPARIR").val(resp.list[0].V_DEPTCODEREPARIR);
                $("#tool").val(resp.list[0].V_TOOL);
                $("#tech").val(resp.list[0].V_TECHNOLOGY);
                $("#safe").val(resp.list[0].V_SAFE);
                $("#wbsCode").val(resp.list[0].V_WBS);
                $("#wbsDesc").val(resp.list[0].V_WBS_TXT);
            }
            $("#proName").val('');
            if (flag == 'fresh') {
                loadTaskGrid();
                loadMatList();
            }
        }
    });
}

function loadTypelist() {
    $.ajax({
        url: AppUrl + 'WorkOrder/PM_WORKORDER_TYPE_SEL',
        type: 'post',
        async: false,
        data: {
            V_V_SOURCECODE: 'defct11'
        },
        success: function (resp) {
            var result = [];
            $.each(resp.list, function (index, item) {
                result.push("<option value=\"" + item.ORDER_TYP + "\">" + item.ORDER_TYP_TXT + "</option>");
            });
            $("#selType").html(result.join(""));
        }
    });
}

function loadRepairList() {
    $.ajax({
        url: AppUrl + 'PROJECT/PRO_PM_REPAIRDEPT_VIEW ',
        type: 'post',
        async: false,
        data: {
            V_V_DEPTCODE: $("#selZYQ").val()
        },
        success: function (resp) {
            var result = [];
            $.each(resp.list, function (index, item) {
                result.push("<option value=\"" + item.V_DEPTREPAIRCODE + "\">" + item.V_DEPTREPAIRNAME + "</option>");
            });
            $("#selPlant").html(result.join(""));
            loadSPR();
        }
    });

}

function loadSPR() {
    $.ajax({//审批人
        url: AppUrl + 'hp/PM_ACTIVITI_PROCESS_PER_SEL',
        type: 'post',
        async: false,
        data: {
            V_V_ORGCODE: $("#selDW").val(),
            V_V_DEPTCODE: $("#selZYQ").val(),
            V_V_REPAIRCODE: $("#selPlant").val(),
            V_V_FLOWTYPE: 'WORK',
            V_V_FLOW_STEP: 'start',
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_SPECIALTY: '%',
            V_V_WHERE: ''
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
        }
    });
}

/**
 * 加载编辑任务的grid
 */
function CreateBill() {

    if (!confirm("确定下达工单?")) {
        return;
    } else {
        Ext.getBody().mask('<p>工单生成中请稍候...</p>');//页面笼罩效果
        setTimeout(BillGo, 500);
    }
}

function BillGo() {
    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: AppUrl + 'oldR/PG_MM_JUNK_INTERFACE',
        params: {
            V_USERID: $("#V_ORDERID").val(),
            V_KCID:KCID,
            F_MEND_AMOUNT:$("#V_FUNC_LOC").val(),
            V_ORDERID:$("#V_ORDERGUID").val()
        },
        success: function (resp) {
            //   Ext.getBody().unmask();//去除页面笼罩
            alert("工单创建成功：" + $("#V_ORDERID").html());
            history.go(0);

        }
    });

}

function GetModel() {//获取模型
    if ($("#V_EQUCODE").val() == '') {
        alert('请选择设备！');
        return;
    }
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_191710/index.html?V_GUID=' + $("#V_ORDERGUID").val() + '&V_ORGCODE=' +
        $("#V_ORGCODE").val() + '&V_DEPTCODE=' + $("#V_DEPTCODE").val() + '&V_EQUTYPE=' + V_EQUTYPE + '&V_EQUCODE=' +
        $("#V_EQUCODE").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');


}

function getReturnMX() {
    loadTaskGrid();
    loadMatList();
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
    s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " 08:30:00";
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
    s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " 16:30:00";
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
    s = year + "-" + dateFomate(month) + "-" + dateFomate(date);
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
        timeFormat: 'hh:mm:ss',
        stepMinute: 30,
        controlType: 'select'
    });
}

function getEquipReturnValue(ret) {
    var str = ret.split('^');
    $("#V_EQUNAME").val(str[1]);
    $("#V_EQUCODE").val(str[0]);
    $("#V_EQUSITE").val(str[3]);
    V_EQUTYPE = str[4];
}

function getReturnWBS(data) {
    $("#wbsCode").val(data[0]);
    $("#wbsDesc").val(data[1]);
    $("#proCode").val(data[2]);
    $("#proName").val(data[3]);
}
