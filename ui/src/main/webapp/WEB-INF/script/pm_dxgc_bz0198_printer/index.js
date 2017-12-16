
var LODOP="";

var idGroup=[];
var orderID="";
$(function () {
    loadPageInfo();
});

function DefaultPrintSettings() {
    try{
        LODOP = getLodop(document.getElementById('LODOP'), document.getElementById('LODOP_EM'));
        LODOP.SET_LICENSES("鞍山市新安杰系统集成有限公司", "559677661718684777294958093190", "", "");
        var strBodyStyle = "<style>" + document.getElementById("stylePrint").innerHTML + "</style>";
        var strFormHtml = strBodyStyle + "<body>" + $("#yesprint").html() + "</body>";
        LODOP.PRINT_INIT("daxiou");
        LODOP.SET_PRINT_PAGESIZE(2, 2100, 2970, 'A4 横向');
        LODOP.ADD_PRINT_HTML("30","15","100%","100%" ,strFormHtml);
        LODOP.NewPage();
    }
    catch(e){
        $("#exception").show();
    }
}


function Print() {
    try{
        DefaultPrintSettings();
        LODOP.PRINT();
    }catch(e){
        $("#exception").show();
    }
}

function Preview() {
    try{
        DefaultPrintSettings();
        LODOP.PREVIEW();
    }catch(e){
        $("#exception").show();
    }
}



function loadPageInfo() {
    var infoResp=null;
    var V_GUID=window.opener.selectID;
    //var V_GUID='DD200E2F-4058-4DF3-B9BF-73707F4D6B6E';
    var result = [];
    $.ajax({
        url: AppUrl + 'dx/PRO_PM_EQUREPAIRPLAN_TREE_GET',
        type : 'post',
        async : false,
        data : {
            V_V_GUID:V_GUID,
            V_BY1:'',
            V_BY2:'',
            V_BY3:''
        },
        dataType : "json",
        traditional : true,
        success : function(resp) {
            infoResp=resp;
            if(resp.list.length==1){
                result.push('<div id="'+V_GUID+'">');
                result.push('<div style="margin-top:10px;">');
                result.push('<table class="Ttable" width="1000" align="center" border="0" cellpadding="0" cellspacing="0">');
                result.push('<tr>');
                result.push('<td width="100" align="center" class="border_r_b">放行计划编码</td>');
                result.push('<td width="400" align="center" class="border_r_b">'+resp.list[0].V_PROJECT_CODE_FXJH+'</td>');
                result.push('<td width="100" align="center" class="border_r_b">放行计划名称</td>');
                result.push('<td width="400" align="center" class="border_r_b">'+resp.list[0].V_PROJECT_NAME_FXJH+'</td>');
                result.push('</tr>');
                result.push('<tr>');
                result.push('<td width="100" align="center" class="border_r_b">上级工程编码</td>');
                result.push('<td width="400" align="center" class="border_r_b">'+resp.list[0].V_PROJECT_CODE_P+'</td>');
                result.push('<td width="100" align="center" class="border_r_b">上级工程名称</td>');
                result.push('<td width="400" align="center" class="border_r_b">'+resp.list[0].V_PROJECT_NAME_P+'</td>');
                result.push('</tr>');
                result.push('<tr>');
                result.push('<td width="100" align="center" class="border_r_b">年份</td>');
                result.push('<td width="400" align="center" class="border_r_b">'+resp.list[0].V_YEAR+'</td>');
                result.push('<td width="100" align="center" class="border_r_b">月份</td>');
                result.push('<td width="400" align="center" class="border_r_b">'+resp.list[0].V_MONTH+'</td>');
                result.push('</tr>');
                result.push('<tr>');
                result.push('<td width="100" align="center" class="border_r_b">计划厂矿</td>');
                result.push('<td width="400" align="center" class="border_r_b">'+resp.list[0].V_ORGNAME+'</td>');
                result.push('<td width="100" align="center" class="border_r_b">作业区</td>');
                result.push('<td width="400" align="center" class="border_r_b">'+resp.list[0].V_DEPTNAME+'</td>');
                result.push('</tr>');
                result.push('<tr>');
                result.push('<td width="100" align="center" class="border_r_b">工程项目编码</td>');
                result.push('<td width="400" align="center" class="border_r_b">'+resp.list[0].V_PROJECT_CODE+'</td>');
                result.push('<td width="100" align="center" class="border_r_b">工程项目名称</td>');
                result.push('<td width="400" align="center" class="border_r_b">'+resp.list[0].V_PROJECT_NAME+'</td>');
                result.push('</tr>');
                result.push('<tr>');
                result.push('<td width="100" align="center" class="border_r_b">预算（万元）</td>');
                result.push('<td width="400" align="center" class="border_r_b">'+resp.list[0].V_PLAN_MONEY+'</td>');
                result.push('<td width="100" align="center" class="border_r_b">专业</td>');
                result.push('<td width="400" align="center" class="border_r_b">'+resp.list[0].V_SPECIALTY+'</td>');
                result.push('</tr>');
                result.push('<tr>');
                result.push('<td width="100" align="center" class="border_r_b">设备编码</td>');
                result.push('<td width="400" align="center" class="border_r_b">'+resp.list[0].V_EQUCODE+'</td>');
                result.push('<td width="100" align="center" class="border_r_b">设备名称</td>');
                result.push('<td width="400" align="center" class="border_r_b">'+resp.list[0].V_EQUNAME+'</td>');
                result.push('</tr>');
                result.push('<tr>');
                result.push('<td width="100" align="center" class="border_r_b">建设单位</td>');
                result.push('<td width="400" align="center" class="border_r_b">'+resp.list[0].V_BUILD_DEPT+'</td>');
                result.push('<td width="100" align="center" class="border_r_b">工程负责人</td>');
                result.push('<td width="400" align="center" class="border_r_b">'+resp.list[0].V_BULID_PERSON+'</td>');
                result.push('</tr>');
                result.push('<tr>');
                result.push('<td width="100" align="center" class="border_r_b">开始时间</td>');
                result.push('<td width="400" align="center" class="border_r_b">'+resp.list[0].V_DATE_B+'</td>');
                result.push('<td width="100" align="center" class="border_r_b">结束时间</td>');
                result.push('<td width="400" align="center" class="border_r_b">'+resp.list[0].V_DATE_E+'</td>');
                result.push('</tr>');
                result.push('<tr>');
                result.push('<td width="100" align="center" class="border_r_b">工程内容</td>');
                result.push('<td colspan="5" width="900" align="center"  class="border_r_b">'+resp.list[0].V_CONTENT+'</td>');
                result.push('</tr>');
                result.push('</table>');
                result.push('</div>');
            }
        }
    });
    $.ajax({
        url: AppUrl + 'dx/PRO_PM_EQUREPAIRPLAN_YG_VIEW',
        type: 'post',
        async: false,
        data: {
            V_V_GUID: V_GUID
        },
        dataType: "json",
        traditional: true,
        success: function (resp) {
            var length=resp.list.length;
            result.push('<div>');
            result.push('<table class="border_l" width="1000" align="center" border="0" cellpadding="0" cellspacing="0">');
            result.push('<tr><td colspan="5" width="1000" align="center" class="border_r_b">计划用功</td></tr>');
            result.push('<tr>');
            result.push('<td  width="100" align="center" class="border_r_b">序号</td>');
            result.push('<td  width="200" align="center" class="border_r_b">工种</td>');
            result.push('<td  width="150" align="center" class="border_r_b">人数</td>');
            result.push('<td  width="150" align="center" class="border_r_b">工时</td>');
            result.push('<td  width="400" align="center" class="border_r_b">说明</td>');
            result.push('</tr>');
            for(var i=0;i<length;i++){
                result.push('<tr>');
                result.push('<td  width="100" align="center" class="border_r_b">'+(i+1)+'</td>');
                result.push('<td  width="200" align="center" class="border_r_b">'+resp.list[i].V_GZ+'</td>');
                result.push('<td  width="150" align="center" class="border_r_b">'+resp.list[i].V_NUM+'</td>');
                result.push('<td  width="150" align="center" class="border_r_b">'+resp.list[i].V_TIME+'</td>');
                result.push('<td  width="400" align="center" class="border_r_b">'+resp.list[i].V_MEMO+'</td>');
                result.push('</tr>');
            }
            result.push('</table>');
            result.push('</div>');
        }
    });
    $.ajax({
        url: AppUrl + 'dx/PRO_PM_EQUREPAIRPLAN_WL_VIEW',
        type: 'post',
        async: false,
        data: {
            V_V_GUID: V_GUID
        },
        dataType: "json",
        traditional: true,
        success: function (resp) {
            var length=resp.list.length;
            result.push('<div>');
            result.push('<table class="border_l" width="1000" align="center" border="0" cellpadding="0" cellspacing="0">');
            result.push('<tr><td colspan="7" width="1000" align="center" class="border_r_b">计划物料</td></tr>');
            result.push('<tr>');
            result.push('<td  width="100" align="center" class="border_r_b">序号</td>');
            result.push('<td  width="150" align="center" class="border_r_b">物料编码</td>');
            result.push('<td  width="250" align="center" class="border_r_b">物料名称</td>');
            result.push('<td  width="150" align="center" class="border_r_b">规格</td>');
            result.push('<td  width="150" align="center" class="border_r_b">计量单位</td>');
            result.push('<td  width="100" align="center" class="border_r_b">单价</td>');
            result.push('<td  width="100" align="center" class="border_r_b">数量</td>');
            result.push('</tr>');
            for(var i=0;i<length;i++){
                result.push('<tr>');
                result.push('<td  width="100" align="center" class="border_r_b">'+(i+1)+'</td>');
                result.push('<td  width="150" align="center" class="border_r_b">'+resp.list[i].V_WL_CODE+'</td>');
                result.push('<td  width="250" align="center" class="border_r_b">'+resp.list[i].V_WL_NAME+'</td>');
                result.push('<td  width="150" align="center" class="border_r_b">'+resp.list[i].V_GGXH+'</td>');
                result.push('<td  width="150" align="center" class="border_r_b">'+resp.list[i].V_JLDW+'</td>');
                result.push('<td  width="100" align="center" class="border_r_b">'+resp.list[i].V_DJ+'</td>');
                result.push('<td  width="100" align="center" class="border_r_b">'+resp.list[i].V_NUM+'</td>');
                result.push('</tr>');
            }
            result.push('</table>');
            result.push('</div>');
        }
    });
    $.ajax({
        url: AppUrl + 'dx/PRO_PM_EQUREPAIRPLAN_JJ_VIEW',
        type: 'post',
        async: false,
        data: {
            V_V_GUID: V_GUID
        },
        dataType: "json",
        traditional: true,
        success: function (resp) {
            var length = resp.list.length;
            result.push('<div>');
            result.push('<table class="border_l" width="1000" align="center" border="0" cellpadding="0" cellspacing="0">');
            result.push('<tr><td colspan="5" width="1000" align="center" class="border_r_b">机具配备</td></tr>');
            result.push('<tr>');
            result.push('<td  width="100" align="center" class="border_r_b">序号</td>');
            result.push('<td  width="200" align="center" class="border_r_b">机具编码</td>');
            result.push('<td  width="300" align="center" class="border_r_b">机具名称</td>');
            result.push('<td  width="200" align="center" class="border_r_b">计量单位</td>');
            result.push('<td  width="200" align="center" class="border_r_b">数量</td>');
            result.push('</tr>');
            for (var i = 0; i < length; i++) {
                result.push('<tr>');
                result.push('<td  width="100" align="center" class="border_r_b">' + (i + 1) + '</td>');
                result.push('<td  width="200" align="center" class="border_r_b">' + resp.list[i].V_JJ_CODE + '</td>');
                result.push('<td  width="300" align="center" class="border_r_b">' + resp.list[i].V_JJ_NAME + '</td>');
                result.push('<td  width="200" align="center" class="border_r_b">' + resp.list[i].V_JLDW + '</td>');
                result.push('<td  width="200" align="center" class="border_r_b">' + resp.list[i].V_NUM + '</td>');
                result.push('</tr>');
            }
            result.push('</table>');
            result.push('</div>');
        }
    });
    if(infoResp.list.length==1) {
        result.push('<div>');
        result.push('<table class="border_l" width="1000" align="center" border="0" cellpadding="0" cellspacing="0">');
        result.push('<tr>');
        result.push('<td width="100" align="center" class="border_r_b">事故预测</td>');
        result.push('<td width="900" align="center" class="border_r_b">' + infoResp.list[0].V_SGYC + '</td>');
        result.push('</tr>');
        result.push('<tr>');
        result.push('<td width="100" align="center" class="border_r_b">安全对策</td>');
        result.push('<td width="900" align="center" class="border_r_b">' + infoResp.list[0].V_AQDC + '</td>');
        result.push('</tr>');
        result.push('</table>');
        result.push('</div>');
        result.push('</div>');
    }
    $("#yesprint").append(result.join(""));
}
