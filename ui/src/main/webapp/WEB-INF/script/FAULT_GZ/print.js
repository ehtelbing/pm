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

        LODOP.PRINT_INIT("shiguyuan");
        var strBodyStyle="<style> " +
            "body,td,th {" +
            "font-size: 12px;" +
            "FONT-FAMILY: '宋体';" +
            "}"+
            ".outbox {  border: 0px solid #000;}  " +
           ".border_r_t {" +
            "padding: 3px;" +
            "border-right-width: 1px;" +
            "border-bottom-width: 1px;" +
            "border-left-width: 1px;" +
            "border-top-width: 1px;" +
            "border-right-style: solid;" +
            "border-bottom-style: solid;" +
            "border-left-style: solid;" +
            "border-top-style: solid;" +
            "border-right-color: #000;" +
            "border-bottom-color: #000;" +
            "border-left-color: #000;" +
            "border-top-color: #000;" +
            "}"+
            " .border_r {"+
            "     border-right-width: 1.5pt;"+
            "     border-right-style: solid;"+
            "     border-right-color: #000;"+
            " }"+
            " .border_b {"+
            "   border-bottom-width: 1.5pt;"+
            "   border-bottom-style: solid;"+
            "   border-bottom-color: #000;"+
            " }"+
            ".Ttable{" +
            "border: 0px;" +
            "}" +
            ".Ttable td {" +
            "word-wrap:break-word;" +
            "word-break:break-all;" +
            "}"+
            " .PageNext {"+
            "     page-break-after: always;"+
            " }</style>";

        LODOP.SET_PRINT_PAGESIZE(1,2100, 2970, 'A4 纵向');

        for(var i=0 ;i< idGroup.length;i++){
            var strFormHtml = strBodyStyle + $("#"+idGroup[i]).html() ;
            LODOP.ADD_PRINT_HTML("30","15","95%" ,"100%",strFormHtml);
            LODOP.NewPage();
        }

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

    var argument = [];

    $.each(window.opener.selectID, function (index, items) {
        argument.push(items);
    });


    $.each(argument, function (index, item) {

        var max = 1;
        var cur_material_index = 0;
        var cur_max_material = 20;
        var cur_max_operation = 0;
        var max_operation = 0;

        var result = [], base = [], operate = [], operateFill = [], marial = [], marialFill = [], check = [], fiish = [];
        // loadTaskGrid(item).success(function (respTask) {
        //     loadMatList(item).success(function (respMat) {
        //         max = Math.ceil((respTask.list.length + respMat.list.length) / 20);
        //         if (max == 0) {
        //             max = 1;
        //         }
        //         max_operation = respTask.list.length;
        //         $.each(respTask, function (indexTask, itemTask) {
        //         });
        //         $.each(respMat, function (indexMat, itemMat) {
        //             itemMat.sid = indexMat + 1;
        //         });

                $.ajax({
                    url: AppUrl + 'cxy/PM_FAULT_PLAN_GET',
                    type: 'post',
                    async: false,
                    data: {
                        V_V_GUID : item
                    },
                    dataType: "json",
                    traditional: true,
                    success: function (resp) {
                        for (var x = 0; x < max; x++) {
                            result.push('   <div id="'+index.toString()+x.toString()+'">');
                            result.push('    <div style="height: 28cm;width: 21cm">');
                            result.push('      <table class="outbox" width="100%"  border="0" align="left" cellpadding="0" cellspacing="0">');
                            // result.push('               <caption style="font-size:22px">设备事故预案</caption>');

                            result.push('        <tr>');
                            result.push('        <td valign="top">');
                            result.push('            <table class="Ttable" width="90%" align="center" border="0" cellspacing="0" cellpadding="0">');
                            result.push('                <tr>');
                            result.push('                    <td align="center" valign="bottom" width="200" style="height:17mm;font-size:22px">设备事故预案');
                            result.push('                    </td>');
                            result.push('                </tr>');
                            result.push('                <tr>');
                            result.push('                    <td align="left" valign="bottom" width="200" style="height:10mm">事故名称:');
                            result.push(resp.RET[0].V_FAULT_NAME==""?"&nbsp;":resp.RET[0].V_FAULT_NAME);
                            result.push('                    </td>');
                            result.push('                </tr>');
                            result.push('                <tr>');
                            result.push('                    <td align="left" valign="bottom" width="200" style="height:9mm" >');
                            result.push('                        1、事故抢修组织机构');
                            result.push('                    </td>');
                            result.push('                </tr>');

                            result.push('                <tr>');
                            result.push('                    <td class="border_r_t" align="left" width="200" cellpadding="3" style="height:17mm">');
                            result.push(resp.RET[0].V_ORGANIZATIONAL==""?"&nbsp;":resp.RET[0].V_ORGANIZATIONAL);
                            result.push('                    </td>');
                            result.push('                </tr>');

                            result.push('                <tr>');
                            result.push('                    <td class="" align="left" valign="bottom" width="200" style="height:9mm">');
                            result.push('                        2、事故抢修联络程序及方式');
                            result.push('                    </td>');
                            result.push('                </tr>');
                            result.push('                <tr>');
                            result.push('                    <td class="border_r_t" align="left" style="height:17mm" width="200">');
                            result.push(resp.RET[0].V_PROGRAM==""?"&nbsp;":resp.RET[0].V_PROGRAM);
                            result.push('                    </td>');
                            result.push('                </tr>');

                            result.push('                <tr>');
                            result.push('                    <td class="" align="left" valign="bottom" width="200" style="height:9mm">');
                            result.push('                        3、事故抢修队伍构成（工种、人数）');
                            result.push('                    </td>');
                            result.push('                </tr>');
                            result.push('                <tr>');
                            result.push('                    <td class="border_r_t" align="left" width="200" style="height:17mm">');
                            result.push(resp.RET[0].V_WORK_TYPE==""?"&nbsp;":resp.RET[0].V_WORK_TYPE);
                            result.push('                    </td>');
                            result.push('                </tr>');

                            result.push('                <tr>');
                            result.push('                    <td class="" align="left" valign="bottom" width="200" style="height:9mm">');
                            result.push('                        4、事故抢修队伍所需的设备及准备的检修机具');
                            result.push('                    </td>');
                            result.push('                </tr>');
                            result.push('                <tr>');
                            result.push('                    <td class="border_r_t" align="left" width="200" style="height:17mm">');
                            result.push(resp.RET[0].V_TOOLS==""?"&nbsp;":resp.RET[0].V_TOOLS);
                            result.push('                    </td>');
                            result.push('                </tr>');

                            result.push('                <tr>');
                            result.push('                    <td class="" align="left" valign="bottom" width="200" style="height:9mm">');
                            result.push('                        5、事故抢修准备的物资（材料和备件）');
                            result.push('                    </td>');
                            result.push('                </tr>');
                            result.push('                <tr>');
                            result.push('                    <td class="border_r_t" align="left" width="200" style="height:30mm">');
                            result.push(resp.RET[0].V_MATERIAL==""?"&nbsp;":resp.RET[0].V_MATERIAL);
                            result.push('                    </td>');
                            result.push('                </tr>');

                            result.push('                <tr>');
                            result.push('                    <td class="" align="left" valign="bottom" width="200" style="height:9mm">');
                            result.push('                        6、事故抢修方案');
                            result.push('                    </td>');
                            result.push('                </tr>');
                            result.push('                <tr>');
                            result.push('                    <td class="border_r_t" align="left" width="200" style="height:40mm">');
                            result.push(resp.RET[0].V_PLAN==""?"&nbsp;":resp.RET[0].V_PLAN);
                            result.push('                    </td>');
                            result.push('                </tr>');

                            result.push('                <tr>');
                            result.push('                    <td class="" align="left" valign="bottom" width="200" style="height:9mm">');
                            result.push('                        7、事故抢修预防');
                            result.push('                    </td>');
                            result.push('                </tr>');
                            result.push('                <tr>');
                            result.push('                    <td class="border_r_t" align="left" width="200" style="height:30mm">');
                            result.push(resp.RET[0].V_PLAN==""?"&nbsp;":resp.RET[0].V_PREVENT);
                            result.push('                    </td>');
                            result.push('                </tr>');

                            result.push('            </table>');
                            result.push('        </td>');
                            result.push('        </tr>');
                            result.push('      </table>');
                            result.push('    </div>');
                            result.push('    </div>');
                            if (x + 1 < max || index + 1 <= argument.length) {
                                idGroup.push(index.toString()+x.toString());
                            }

                            $("#yesprint").append(result.join(""));


                            result = [];
                        }
                    }
                });
            // });
        // });
    });
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

function descBill(content){
    var temp = [];
    for(var i=0;i<content.length;i++){
        if(i<70){
            temp.push(content.charAt(i));
        }
    }

    return temp.join("");
}

function descBilldesc(content){
    var temp = [];
    for(var i=0;i<content.length;i++){
        if(i<38){
            temp.push(content.charAt(i));
        }
    }

    return temp.join("");
}

function descBilldescN(content){
    var temp = [];
    for(var i=0;i<content.length;i++){
        if(i<14){
            temp.push(content.charAt(i));
        }
    }

    return temp.join("");
}

function subDesc(content,count){
    var temp = [];
    for(var i=0;i<content.length;i++){
        temp.push(content.charAt(i));
        if(i!=0&&i%count==0){
            temp.push("<br/>");
        }
    }

    return temp.join("");
}

function rowspan(x,max_operation){
    if(x==0){
        return max_operation;
    }else{
        return max_operation - x*20
    }


}
