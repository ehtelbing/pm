var V_GUID = null;
var V_EQUTYPECODE = null;
if (location.href.split('?')[1] != undefined) {
    V_GUID = Ext.urlDecode(location.href.split('?')[1]).V_GUID;
    V_EQUTYPECODE = Ext.urlDecode(location.href.split('?')[1]).V_EQUTYPECODE;
}

$(function() {
    bindDate("planStartDate");
    bindDate("planFinDate");

    $("#personCode").html(Ext.util.Cookies.get('v_personname2'));
    NowDate2("createDate");
    NowDate_b("planStartDate");
    NowDate_e("planFinDate");

    loadPageInfo();
    loadRepairList();

    loadTaskGrid();
    loadMatList();


    $("#V_EQUNAME").click(function () {
        var owidth = window.document.body.offsetWidth-200;
        var oheight = window.document.body.offsetHeight-100 ;
        var ret = window.open(AppUrl+'page/PM_070205/index.html?V_ORGCODE='+$("#V_ORGCODE").val()+'&V_DEPTCODE=' + $("#V_DEPTCODE").val() +
        '&V_EQUTYPECODE='+V_EQUTYPECODE+'&V_EQUCODE='+$("#V_EQUCODE").val()+'&V_EQUNAME='+$("#V_EQUNAME").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
    });

    $("#btnTask").click(function () {
        var owidth = window.document.body.offsetWidth-200;
        var oheight = window.document.body.offsetHeight-100 ;
        var ret = window.open(AppUrl+'page/PM_070204/index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val() +  '&V_DEPTREPAIRCODE=' + $("#selPlant").val() + '', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
        loadTaskGrid();
    });

    $("#selType").change(function() {
        $("#ORDER_TYP").html($("#selType").val());
    });

    $("#selPlant").on("input propertychange",function(){
        if($("#selPlant").val()=="99170208"){
            $("#selType").val("AK11");
        }else{
            $("#selType").val($("#selType").get(0).checked=true)
        }
    });
});


function loadPageInfo() {
    Ext.Ajax.request({
            url: AppUrl + 'qx/PRO_PM_07_WORKORDER_DEFECT',
            type : 'post',
            async : false,
            params : {
                V_V_PERNAME : Ext.util.Cookies.get('v_personcode'),
                V_V_DEFECT_GUID :  V_GUID
            },
            success : function(response) {
                var resp = Ext.decode(response.responseText);
                if (resp.list != "" && resp.list != null) {
                    $("#V_ORGCODE").val(resp.list[0].V_ORGCODE);
                    $("#V_ORGNAME").html(resp.list[0].V_ORGNAME);
                    $("#V_DEPTCODE").val(resp.list[0].V_DEPTCODE);
                    $("#V_DEPTNAME").html(resp.list[0].V_DEPTNAME);

                    $("#V_EQUNAME").val(resp.list[0].V_EQUIP_NAME);
                    $("#V_EQUCODE").val(resp.list[0].V_EQUIP_NO);
                    $("#V_EQUSITE").val(resp.list[0].V_FUNC_LOC);

                    $("#ORDER_TYP").html(resp.list[0].V_ORDER_TYP);
                    $("#selType").empty();
                    $("<option value=\"" + resp.list[0].V_ORDER_TYP + "\">"
                    + resp.list[0].V_ORDER_TYP_TXT + "</option>")
                        .appendTo("#selType");
                    $("#V_ORDERGUID").val(resp.list[0].V_ORDERGUID);
                    $("#V_DEFECTLIST").val(resp.list[0].V_SHORT_TXT);
                    $("#V_ORDERID").html(resp.list[0].V_ORDERID);
                    $("#V_DEPTCODEREPARIR").val(
                        resp.list[0].V_DEPTCODEREPARIR);
                    $("#tool").val(resp.list[0].V_TOOL);
                    $("#tech").val(resp.list[0].V_TECHNOLOGY);
                    $("#safe").val(resp.list[0].V_SAFE);
                } else {
                }
            }
        });
}


function loadToolList() {

}


function loadRepairList() {
    Ext.Ajax.request({
        url: AppUrl + 'zdh/fixdept_sel',
        method: 'POST',
        async: false,
        params: {
            'V_V_DEPTCODE':  $("#V_DEPTCODE").val()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            $("#selPlant").empty();
            $.each(resp.list, function(index, item) {
                if (item.V_DEPTREPAIRCODE == $("#V_DEPTCODEREPARIR").val()) {
                    $(
                        "<option selected=\"selected\" value=\""
                        + item.V_DEPTREPAIRCODE + "\">"
                        + item.V_DEPTREPAIRNAME + "</option>")
                        .appendTo("#selPlant");
                } else {
                    $(
                        "<option value=\"" + item.V_DEPTREPAIRCODE + "\">"
                        + item.V_DEPTREPAIRNAME + "</option>")
                        .appendTo("#selPlant");
                }
            });
        }
    });

}

/**
 * 加载编辑任务的grid
 */
function loadTaskGrid() {
    Ext.Ajax.request({
        url : AppUrl + 'zdh/PRO_PM_WORKORDER_ET_OPERATIONS',
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

function OpenTask(){
    var ret = window.showModalDialog(
        '../../page/No41070101/Index.html?V_ORDERGUID='
        + $("#V_ORDERGUID").val()
        + '&V_DEPTREPAIRCODE=' + $("#selPlant").val()
        + '', '41070101',
        'dialogHeight:500px;dialogWidth:800px');

    loadTaskGrid();
}

function OpenEditMat() {

    Ext.Ajax.request({
        url : AppUrl + 'zdh/PRO_PM_WORKORDER_ET_ACTIVITY',
        type: "post",
        async: false,
        params: {
            V_V_ORDERGUID : $("#V_ORDERGUID").val()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if($("#V_EQUIP_NO").val() == ""){ alert("设备编码不能为空.");}else{
                var owidth = window.document.body.offsetWidth-200;
                var oheight = window.document.body.offsetHeight-100 ;
                var ret = window.open(AppUrl+'page/PM_070203/index.html?flag=all&V_ORDERGUID=' + $("#V_ORDERGUID").val() +'', '', '_blank',  'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
                loadMatList();
            }
        }
    });
}


function OpenGJJJ() {
    var ret = window.showModalDialog(
        '../../page/No41070103/Index.html?V_ORDERGUID='
        + $("#V_ORDERGUID").val() + '', '41070103',
        'dialogHeight:500px;dialogWidth:800px');
    loadToolList();
};

function loadMatList() {
    Ext.Ajax.request({
        url : AppUrl + 'zdh/PRO_PM_WORKORDER_SPARE_VIEW',
        type: 'post',
        params: {
            V_V_ORDERGUID: $("#V_ORDERGUID").val()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if (resp.list != null && resp.list != "") {
                $("#TtableM tbody").empty();
                $.each(resp.list, function (index, item) {
                    item["sid"] = index + 1;
                });
                $("#TtableMTemplate").tmpl(resp.list).appendTo("#TtableM tbody");
            } else { $("#TtableM tbody").empty(); }
        }
    });
}

function CreateBill() {
    var ss = $("#V_ORDERGUID").val();
    if ($("#V_DEFECTLIST").val() == '') {
        Ext.Msg.confirm('提示信息', '工单描述不能为空,请重新输入！');
    } else {
        if (!confirm("确定下达工单?")) {
            return false;
        } else {
            Ext.Ajax.request({
                url : AppUrl + 'PM_07/PRO_PM_WORKORDER_DEFECT_SAVE',
                type : 'post',
                async : false,
                params : {
                    V_V_PERNAME: $.cookies.get('v_personcode'),
                    V_V_DEFECT_GUID:  $.url().param("V_GUID"),
                    V_V_ORDERGUID:  $("#V_ORDERGUID").val(),
                    V_V_SHORT_TXT:  $("#V_DEFECTLIST").val(),
                    V_D_START_DATE: $("#planStartDate").val(),
                    V_D_FINISH_DATE: $("#planFinDate").val(),
                    V_V_WBS:  $("#wbsCode").val(),
                    V_V_WBS_TXT: $("#wbsDesc").val(),
                    V_V_DEPTCODEREPARIR: $("#selPlant").val()
                },
                success : function(response) {
                    var resp = Ext.decode(response.responseText);
                    alert("工单下达成功");
                }
            });
        }
    }
}

function orderissued(){
    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: AppUrl + 'mm/SetMat',
        params: {
            V_V_ORDERGUID:  $("#V_ORDERGUID").val(),
            x_personcode :  Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.V_CURSOR == '1') {
                Ext.Ajax.request({
                    method: 'POST',
                    async: false,
                    url: AppUrl + 'zdh/PRO_PM_WORKORDER_SEND_UPDATE',
                    params: {
                        V_V_ORDERGUID:  $("#V_ORDERGUID").val(),
                        V_V_SEND_STATE :  "成功"
                    },
                    success: function (response) {
                    }
                });
            }
            else{
                Ext.Ajax.request({
                    method: 'POST',
                    async: false,
                    url: AppUrl + 'zdh/PRO_PM_WORKORDER_SEND_UPDATE',
                    params: {
                        V_V_ORDERGUID:  $("#V_ORDERGUID").val(),
                        V_V_SEND_STATE :  "失败"
                    },
                    success: function (response) {
                    }
                });
            }
        }
    });
    history.go(0);
}

function GetModel() {//获取模型
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_191710/index.html?V_GUID='+$("#V_ORDERGUID").val()+'&V_ORGCODE='+
    $("#V_ORGCODE").val()+'&V_DEPTCODE='+$("#V_DEPTCODE").val()+'&V_EQUTYPE='+V_EQUTYPECODE+'&V_EQUCODE='+
    $("#V_EQUCODE").val()   , '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');

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
        $("#V_ORGCODE").val() + '&V_DEPTCODE=' + $("#V_DEPTCODE").val() + '&V_EQUTYPE=' + V_EQUTYPECODE + '&V_EQUCODE=' +
        $("#V_EQUCODE").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');


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
    s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " 08:30:00" ;

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
    s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " 16:30:00" ;

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
    s = year + "-" + dateFomate(month) + "-" + dateFomate(date) ;
    $("#" + id + "").html(s);
}

function dateFomate(val){
    if(parseInt(val) <=9){
        return "0"+val;
    }else{
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
        controlType:'select'
    });
}

//添加暂时保存
function SaveOrder(){
    $.ajax({
        url : APP + '/ModelChange',
        type: 'post',
        async: false,
        data : {
            parName : [ 'V_V_PERCODE', 'V_V_PERNAME', 'V_V_ORDERGUID', 'V_V_SHORT_TXT', 'V_D_START_DATE', 'V_D_FINISH_DATE', 'V_V_DEPTCODEREPARIR', 'V_V_TOOL', 'V_V_TECHNOLOGY', 'V_V_SAFE' ],
            parType : [ 's', 's' , 's' , 's' , 'dt' , 'dt' , 's' , 's' , 's' , 's' ],
            parVal : [ $.cookies.get('v_personcode'),$.cookies.get('v_personname2'),
                $('#V_ORDERGUID').val() , $('#V_DEFECTLIST').val(), $('#planStartDate').val(), $('#planFinDate').val(), $('#V_DEPTCODEREPARIR').val(), $('#tool').val(), $('#tech').val(), $('#safe').val()],
            proName : 'PRO_PM_WORKORDER_EDIT_XD',

            returnStr : ['V_CURSOR'],
            returnStrType : ['s']
        },
        dataType: "json",
        traditional: true,
        success: function (resp) {
            alert(resp);
        }
    });
}

function getEquipReturnValue(ret){
    var str = [];
    str = ret.split('^');
    $("#V_EQUIP_NAME").val(str[1]);
    $("#V_EQUIP_NO").val(str[0]);
    if(str[2] != ''){
        $("#V_FUNC_LOC").val(str[2]);
    }

}