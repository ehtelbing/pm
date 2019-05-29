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

        LODOP.PRINT_INIT("gongdan");
        var strBodyStyle="<style> " +
            " body, td, th { " +
            "    font-size: 10pt;  letter-spacing:0.1mm; " +
            "} " +
            ".outbox {  border: 1.5pt solid #000;}  " +
            ".border_r_b {"+
            "     border-right-width: 1.5pt;"+
            "     border-bottom-width: 1.5pt;"+
            "     border-right-style: solid;"+
            "     border-bottom-style: solid;"+
            "     border-right-color: #000;"+
            "     border-bottom-color: #000;"+
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
            " .Ttable td {"+
            "     height: 4mm;"+
            "word-wrap:break-word;"+
            "word-break:break-all;"+
            " }"+
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
                    url: AppUrl + 'cxy/PM_14_FAULT_ITEM_DATA_GET',
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
                            result.push('    <div style="height: 21cm;width: 18cm">');
                            result.push('      <table class="outbox" width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">');
                            result.push('               <caption style="font-size:22px">设备事故报告单</caption>');
                            result.push('        <tr>');
                            result.push('        <td valign="top">');
                            result.push('            <table class="Ttable" width="100%" border="0" cellspacing="0" cellpadding="0">');
                            result.push('                <tr>');
                            result.push('                    <td class="border_r_b" align="center" width="90">');
                            result.push('                        单位名称');
                            result.push('                    </td>');
                            result.push('                    <td colspan="3" class="border_r_b" align="center">');
                            result.push(resp.RET[0].V_ORGNAME==""?"&nbsp;":resp.RET[0].V_ORGNAME);
                            result.push('                    </td>');
                            result.push('                    <td class="border_r_b" align="center" width="80">');
                            result.push('                        上报日期');
                            result.push('                    </td>');
                            result.push('                    <td colspan="3" class="border_b" align="center">');
                            result.push(resp.RET[0].V_REPROTTIME==""?"&nbsp;":resp.RET[0].V_REPROTTIME);
                            result.push('                    </td>');
                            result.push('                </tr>');

                            result.push('                <tr>');
                            result.push('                    <td class="border_r_b" align="center">资产编码</td>');
                            result.push('                    <td class="border_r_b" align="center" width="45">');
                            result.push('                        <span>');
                            result.push(resp.RET[0].V_EQUCODE==""?"&nbsp;":resp.RET[0].V_EQUCODE);
                            /*var s1, st1;
                            if(resp.RET[0].V_EQUCODE!=''){
                                s1 = resp.RET[0].V_EQUCODE;
                                st1 = [];
                                st1 = s1.split(',');
                                for(var k=0;k<st1.length;k++){
                                    if(k==st1.length-1){
                                        result.push(st1[k]);
                                    }else{
                                        result.push(st1[k]+',</br>');
                                    }


                                }
                            }else{
                                result.push("&nbsp;");
                            }*/

                            result.push('</span>');
                            result.push('                    </td>');
                            result.push('                    <td class="border_r_b" align="center" width="45">设备名称</td>');
                            result.push('                    <td class="border_r_b" align="center" width="90">');
                            result.push('                        <span>');
                            /*var s2, st2;
                            if(resp.RET[0].V_EQUNAME!=''){
                                s2 = resp.RET[0].V_EQUNAME;
                                st2 = [];
                                st2 = s2.split(',');
                                for(var k=0;k<st2.length;k++){
                                    if(k==st2.length-1){
                                        result.push(st2[k]);
                                    }else{
                                        result.push(st2[k]+',</br>');
                                    }


                                }
                            }else{
                                result.push("&nbsp;");
                                // result.push(resp.RET[0].V_EQUNAME);
                            }*/
                            result.push(resp.RET[0].V_EQUNAME==""?"&nbsp;":resp.RET[0].V_EQUNAME);
                            result.push('</span>');
                            result.push('                    </td>');
                            result.push('                    <td class="border_r_b" align="center" width="90">型号规格</td>');
                            result.push('                    <td class="border_r_b" align="center" width="90">');
                            result.push(resp.RET[0].V_GGXH==""?"&nbsp;":resp.RET[0].V_GGXH);
                           /* var s3, st3;
                            if(resp.RET[0].V_GGXH!=''){
                                s3 = resp.RET[0].V_GGXH;
                                st3 = [];
                                st3 = s3.split(',');
                                for(var k=0;k<st3.length;k++){
                                    if(k==st3.length-1){
                                        result.push(st3[k]);
                                    }else{
                                        result.push(st3[k]+',</br>');
                                    }


                                }
                            }else{
                                result.push("&nbsp;");
                                // result.push(resp.RET[0].V_GGXH);
                            }*/
                            // result.push(resp.RET[0].V_GGXH);
                            result.push('                    </td>');
                            result.push('                    <td class="border_r_b" align="center" width="90">作业区</td>');
                            result.push('                    <td class="border_b" align="center" width="90"> ');
                            result.push(resp.RET[0].V_DEPTNAME==""?"&nbsp;":resp.RET[0].V_DEPTNAME);
                            result.push('                    </td>');
                            result.push('                </tr>');

                            result.push('                <tr>');
                            result.push('                    <td class="border_r_b" align="center">');
                            result.push('                        事故发生时间');
                            result.push('                    </td>');
                            result.push('                    <td colspan="3" class="border_r_b" align="center">');
                            result.push(resp.RET[0].V_FINDTIME==""?"&nbsp;":resp.RET[0].V_FINDTIME);
                            result.push('                    </td>');
                            result.push('                    <td class="border_r_b" align="center">');
                            result.push('                        事故排除时间');
                            result.push('                    </td>');
                            result.push('                    <td colspan="3" class="border_b" align="center">');
                            result.push(resp.RET[0].V_ENDTIME==""?"&nbsp;":resp.RET[0].V_ENDTIME);
                            result.push('                    </td>');
                            result.push('                </tr>');

                            result.push('                <tr>');
                            result.push('                    <td class="border_r_b" align="center">事故报告人</td>');
                            result.push('                    <td colspan="2" class="border_r_b" align="center">');
                            result.push(resp.RET[0].V_REPORTER==""?"&nbsp;":resp.RET[0].V_REPORTER);
                            result.push('                    </td>');
                            result.push('                    <td class="border_r_b" align="center">事故类别</td>');
                            result.push('                    <td class="border_r_b" align="center">');
                            result.push(resp.RET[0].V_TYPENAME==""?"&nbsp;":resp.RET[0].V_TYPENAME);
                            result.push('                    </td>');
                            result.push('                    <td class="border_r_b" align="center">直接责任人</td>');
                            result.push('                    <td colspan="2" class="border_b" align="center">');
                            result.push(resp.RET[0].V_FZR==""?"&nbsp;":resp.RET[0].V_FZR);
                            result.push('                    </td>');
                            result.push('                </tr>');

                            result.push('                <tr>');
                            result.push('                    <td class="border_r_b" align="center">停机时间</td>');
                            result.push('                    <td colspan="2" class="border_r_b" align="center">');
                            result.push(resp.RET[0].V_STOPTIME==""?"&nbsp;":resp.RET[0].V_STOPTIME);
                            result.push('                    </td>');
                            result.push('                    <td class="border_r_b" align="center">修理时间</td>');
                            result.push('                    <td class="border_r_b" align="center">');
                            result.push(resp.RET[0].V_REPAIRTIME==""?"&nbsp;":resp.RET[0].V_REPAIRTIME);
                            result.push('                    </td>');
                            result.push('                    <td class="border_r_b" align="center">修复费用</td>');
                            result.push('                    <td colspan="2" class="border_b" align="center">');
                            result.push(resp.RET[0].V_REPAIRCOST==""?"&nbsp;":resp.RET[0].V_REPAIRCOST);
                            result.push('                    </td>');
                            result.push('                </tr>');

                            result.push('                <tr>');
                            result.push('                    <td style="height:30mm" class="border_r_b" align="center">事故经过</td>');
                            result.push('                    <td colspan="7" style="height:30mm" class="border_b" align="center">');
                            result.push(resp.RET[0].V_FAULT_PASS==""?"&nbsp;":resp.RET[0].V_FAULT_PASS);
                            result.push('                    </td>');
                            result.push('                </tr>');

                            result.push('                <tr>');
                            result.push('                    <td class="border_r_b" style="height:16mm" align="center">原因分析</td>');
                            result.push('                    <td colspan="7"  style="height:16mm" class="border_b" align="center">');
                            result.push(resp.RET[0].V_CAUSEANALYSIS==""?"&nbsp;":resp.RET[0].V_CAUSEANALYSIS);
                            result.push('                    </td>');
                            result.push('                </tr>');

                            result.push('                <tr>');
                            result.push('                    <td height="90" class="border_r_b" align="center">事故原因</td>');
                            result.push('                    <td colspan="7" align="center" class="border_b">');
                            result.push('                        <table width="100%" border="0" cellpadding="0" cellspacing="0" class="Ttable">');
                            result.push('                        <tr>');
                            result.push('                        <td align="center" class="border_r_b">指挥失当</td>');
                            result.push('                        <td align="center" class="border_r_b">违规操作</td>');
                            result.push('                        <td align="center" class="border_r_b">超负荷运转</td>');
                            result.push('                        <td align="center" class="border_r_b">润滑原因</td>');
                            result.push('                        <td align="center" class="border_r_b">检修原因</td>');
                            result.push('                        <td align="center" class="border_r_b">点检原因</td>');
                            result.push('                        <td align="center" class="border_r_b">材料备件质量</td>');
                            result.push('                        <td align="center" class="border_b">设计原因</td>');
                            result.push('                        </tr>');
                            result.push('                        <tr>');
                            result.push('                        <td id="zhsd" align="center" class="border_r_b">&nbsp;</td>');
                            result.push('                    <td id="wgcz" align="center" class="border_r_b">&nbsp;</td>');
                            result.push('                    <td id="cfh" align="center"  class="border_r_b">&nbsp;</td>');
                            result.push('                    <td id="rhyy" align="center" class="border_r_b">&nbsp;</td>');
                            result.push('                    <td id="jxyy" align="center" class="border_r_b">&nbsp;</td>');
                            result.push('                    <td id="djyy" align="center" class="border_r_b">&nbsp;</td>');
                            result.push('                    <td id="bjzl" align="center" class="border_r_b">&nbsp;</td>');
                            result.push('                    <td id="sjyy" align="center" class="border_b">&nbsp;</td>');
                            result.push('                    </tr>');
                            result.push('                    <tr>');
                            result.push('                    <td class="border_r_b" align="center">安装原因</td>');
                            result.push('                    <td class="border_r_b" align="center">制造质量</td>');
                            result.push('                    <td class="border_r_b" align="center">自然原因</td>');
                            result.push('                    <td class="border_r_b" align="center">其他原因</td>');
                            result.push('                    <td class="border_r_b" >&nbsp;</td>');
                            result.push('                    <td class="border_r_b" >&nbsp;</td>');
                            result.push('                    <td class="border_r_b" >&nbsp;</td>');
                            result.push('                    <td class="border_b">&nbsp;</td>');
                            result.push('                    </tr>');
                            result.push('                    <tr>');
                            result.push('                    <td class="border_r" id="azyy" align="center">&nbsp;</td>');
                            result.push('                    <td class="border_r" id="zzzl" align="center">&nbsp;</td>');
                            result.push('                    <td class="border_r" id="zryy" align="center">&nbsp;</td>');
                            result.push('                    <td class="border_r" id="qtyy" align="center">&nbsp;</td>');
                            result.push('                    <td class="border_r" id="zxyy" align="center">&nbsp;</td>');
                            result.push('                    <td class="border_r">&nbsp;</td>');
                            result.push('                    <td class="border_r">&nbsp;</td>');
                            result.push('                    <td>&nbsp;</td>');
                            result.push('                    </tr>');
                            result.push('                    </table>');
                            result.push('                    </td>');
                            result.push('                    </tr>');

                            result.push('                <tr>');
                            result.push('                    <td style="height:16mm" class="border_r_b" align="center">事故抢修经过</td>');
                            result.push('                    <td colspan="7" style="height:16mm" class="border_b" align="center">');
                            result.push(resp.RET[0].V_FAULT_CLGC==""?"&nbsp;":resp.RET[0].V_FAULT_CLGC);
                            result.push('                    </td>');
                            result.push('                </tr>');

                            result.push('                <tr>');
                            result.push('                    <td style="height:16mm" class="border_r_b" align="center">抢修方案内容</td>');
                            result.push('                    <td colspan="7" style="height:16mm" class="border_b" align="center">');
                            result.push(resp.RET[0].V_REPAIR_PLAN==""?"&nbsp;":resp.RET[0].V_REPAIR_PLAN);
                            result.push('                    </td>');
                            result.push('                </tr>');

                            result.push('                <tr>');
                            result.push('                    <td style="height:16mm;" width="90" class="border_r_b" align="center" >采取防范措施</td>');
                            result.push('                    <td colspan="7" style="height:16mm" class="border_b" align="center">');
                            result.push(resp.RET[0].V_FAULT_ZGCS==""?"&nbsp;":resp.RET[0].V_FAULT_ZGCS);
                            result.push('                    </td>');
                            result.push('                </tr>');

                            result.push('                <tr>');
                            result.push('                    <td style="height:16mm" class="border_r" align="center">');
                            result.push('      <table  border="0" cellpadding="0" cellspacing="0">');
                            result.push('                        <tr><td align="center">责任者处理</td>');
                            result.push('                        </tr><tr>');
                            result.push('                        <td align="center" valign="bottom">注：</td>');
                            result.push(' </tr>');
                            result.push(' </table>');
                            result.push('                    </td>');
                            result.push('                    <td colspan="7" style="height:16mm" align="center">');
                            result.push(resp.RET[0].V_FZR_CL==""?"&nbsp;":resp.RET[0].V_FZR_CL);
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

                            /*cur_max_material = 20;
                            cur_max_operation = 0;
*/
                            $("#yesprint").append(result.join(""));

                            if(resp.RET[0].V_FAULT_YY!='') {
                                var strs= new Array()
                                var str = resp.RET[0].V_FAULT_YY;
                                strs=str.split(",");
                                var temp='';
                                for (i=0;i<strs.length ;i++ )
                                {
                                    if(strs[i]=='指挥失当'){

                                        document.getElementById("zhsd").innerHTML='&#x2714';
                                        continue;
                                    }else if(strs[i]=='违规操作'){
                                        document.getElementById("wgcz").innerHTML='&#x2714';
                                        continue;
                                    }else if(strs[i]=='超负荷运转'){
                                        document.getElementById("cfh").innerHTML='&#x2714';
                                        continue;
                                    }else if(strs[i]=='润滑原因'){
                                        document.getElementById("rhyy").innerHTML='&#x2714';
                                        continue;
                                    }else if(strs[i]=='检修原因'){
                                        document.getElementById("jxyy").innerHTML='&#x2714';
                                        continue;
                                    }else if(strs[i]=='点检原因'){
                                        document.getElementById("djyy").innerHTML='&#x2714';
                                        continue;
                                    }else if(strs[i]=='材料备件质量'){
                                        document.getElementById("bjzl").innerHTML='&#x2714';
                                        continue;
                                    }else if(strs[i]=='设计原因'){
                                        document.getElementById("sjyy").innerHTML='&#x2714';
                                        continue;
                                    }else if(strs[i]=='安装原因'){
                                        document.getElementById("azyy").innerHTML='&#x2714';
                                        continue;
                                    }else if(strs[i]=='制造质量'){
                                        document.getElementById("zzzl").innerHTML='&#x2714';
                                        continue;
                                    }else if(strs[i]=='自然原因'){
                                        document.getElementById("zryy").innerHTML='&#x2714';
                                        continue;
                                    }else if(strs[i]=='其他原因'){
                                        document.getElementById("qtyy").innerHTML='&#x2714';
                                        continue;
                                    }else{
                                        temp+=strs[i];
                                        continue;
                                    }

                                }
                                    document.getElementById("zxyy").innerHTML=temp;

                                }


                            // }
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
