
var LODOP="";

var idGroup=[];
var orderID="";
var retarr;
if (location.href.split('?')[1] != undefined) {
    retarr = (location.href.split('?')[1]).split('=')[1];
}
$(function () {
    loadPageInfo();

});

function DefaultPrintSettings() {
    try{
        LODOP = getLodop(document.getElementById('LODOP'), document.getElementById('LODOP_EM'));
        LODOP.SET_LICENSES("鞍山市新安杰系统集成有限公司", "559677661718684777294958093190", "", "");
// var strBodyStyle = "<style>" +
// document.getElementById("stylePrint").innerHTML + "</style>";
// var strFormHtml = strBodyStyle + "<body>" + $("#yesprint").html() +
// "</body>";

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
            "     height: 4.5mm;"+
            " }"+
            " .PageNext {"+
            "     page-break-after: always;"+
            " }</style>";

        LODOP.SET_PRINT_PAGESIZE(2, 2100, 2970, 'A4 横向');

        // var strBodyStyle = "<style> " + document.getElementById("stylePrint").innerHTML + "</style>";
        for(var i=0 ;i< idGroup.length;i++){
            var strFormHtml = strBodyStyle + $("#"+idGroup[i]).html() ;

            LODOP.ADD_PRINT_HTML("30","15","100%","100%" ,strFormHtml);
            //LODOP.ADD_PRINT_HTML("3%","4.5%","0","90%" ,strFormHtml);
            LODOP.NewPage();
        }

    }
    catch(e){
        $("#exception").show();
    }
}


function Print() {
    try{
        MoreAcceptBill();
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
                $.ajax({
                    url: AppUrl + 'qx/PRO_PM_07_DEFECT_VIEW_PER',
                    type : 'post',
                    async : false,
                    data : {
                        V_D_DEFECTDATE_B : Ext.Date.format(new Date(retarr.split(',')[0]), 'Y/m/d'),
                        V_D_DEFECTDATE_E : Ext.Date.format(new Date(retarr.split(',')[1]), 'Y/m/d'),
                        V_V_DEPTCODE : retarr.split(',')[2],
                        V_V_EQUTYPECODE :  retarr.split(',')[3]=='@'?'%':retarr.split(',')[3],
                        V_V_EQUCODE :  retarr.split(',')[4]=='@'?'%':retarr.split(',')[4],
                        V_V_STATECODE : retarr.split(',')[5]=='@'?'%':retarr.split(',')[5],
                        V_V_SOURCECODE : retarr.split(',')[6],
                        V_V_DEFECTLIST : retarr.split(',')[7],
                        X_PERSONCODE : retarr.split(',')[8],
                        V_V_PAGE: retarr.split(',')[9],
                        V_V_PAGESIZE: retarr.split(',')[10]
                    },
                    dataType : "json",
                    traditional : true,
                    success : function(resp) {
                        var result = [];
                        $("#yesprint").empty();

                        var page=Math.ceil(resp.list.length/5);
                        var pagenumber=0;
                        for(var p=0;p<page;p++){
                            result.push('   <div id="'+'page'+(p+1)+'">');
                            result.push('    <div style="height: 18cm;">');
                            result.push('            <table width="100%" height="80%" border="1" cellpadding="0" cellspacing="0" class="Ttable">');
                            result.push('                <tr>');
                            result.push('                    <td width="35" align="center" class="border_r_b">');
                            result.push('                        序号');
                            result.push('                    </td>');
                            result.push('                    <td width="55" align="center" class="border_r_b">');
                            result.push('                        工单号');
                            result.push('                    </td>');
                            result.push('                    <td width="80" align="center" class="border_r_b">');
                            result.push('                        缺陷日期');
                            result.push('                    </td>');
                            result.push('                    <td width="120" align="center" class="border_r_b">');
                            result.push('                        缺陷明细');
                            result.push('                    </td>');
                            result.push('                    <td width="100" align="center" class="border_r_b">');
                            result.push('                        设备');
                            result.push('                    </td>');
                            result.push('                    <td width="80" align="center" class="border_r_b">');
                            result.push('                        设备位置');
                            result.push('                    </td>');
                            result.push('                    <td width="70" align="center" class="border_r_b">');
                            result.push('                        单位');
                            result.push('                    </td>');
                            result.push('                    <td width="50" align="center" class="border_r_b">');
                            result.push('                        负责人');
                            result.push('                    </td>');
                            result.push('                    <td width="70" align="center" class="border_r_b">');
                            result.push('                        处理意见');
                            result.push('                    </td>');
                            result.push('                    <td width="60" align="center" class="border_r_b">');
                            result.push('                        缺陷来源');
                            result.push('                    </td>');
                            result.push('                    <td width="50" align="center" class="border_r_b">');
                            result.push('                        缺陷状态');
                            result.push('                    </td>');
                            result.push('                 </tr>');

                            for (var i = 5*pagenumber; i < (5*pagenumber+5); i++) {

                                result.push('                 <tr>');
                                //if (resp.length < 5) {
                                result.push('                 <td class="border_r_b" align="center">');
                                result.push(i + 1);
                                result.push('</td>');
                                result.push('                 <td class="border_r_b" align="center">');
                                result.push(resp.list[i]==undefined?"":resp.list[i].V_ORDERID);
                                result.push('</td>');
                                result.push('                 <td class="border_r_b" align="center">');
                                result.push(resp.list[i]==undefined?"":resp.list[i].D_DEFECTDATE);
                                result.push('</td>');
                                result.push('                 <td class="border_r_b" align="left">');
                                result.push(resp.list[i]==undefined?"":resp.list[i].V_DEFECTLIST);
                                result.push('</td>');
                                result.push('                 <td class="border_r_b"  align="center">');
                                result.push(resp.list[i]==undefined?"":resp.list[i].V_EQUNAME);
                                result.push('</td>');
                                result.push('                 <td class="border_r_b" align="center">');
                                result.push(resp.list[i]==undefined?"":resp.list[i].V_EQUSITE);
                                result.push('</td>');
                                result.push('                 <td class="border_r_b" align="center">');
                                result.push(resp.list[i]==undefined?"":resp.list[i].V_DEPTNAME);
                                result.push('</td>');
                                result.push('                 <td class="border_r_b" align="center">');
                                result.push(resp.list[i]==undefined?"":resp.list[i].V_PERNAME);
                                result.push('</td>');
                                result.push('                 <td class="border_r_b" align="center">');
                                result.push(resp.list[i]==undefined?"":resp.list[i].V_IDEA);
                                result.push('</td>');
                                result.push('                 <td class="border_r_b" align="center">');
                                result.push(resp.list[i]==undefined?"":resp.list[i].V_SOURCENAME);
                                result.push('</td>');
                                result.push('                 <td class="border_r_b" align="center">');
                                result.push(resp.list[i]==undefined?"":resp.list[i].V_STATENAME);
                                result.push('</td>');
                                result.push('                 </tr>');
                            }
                            result.push('      </table>');
                            result.push('      <div style="text-align: center; height: 1cm; line-height: 30px;">');

                            result.push('        当前页面：<span>');
                            result.push(pagenumber+1);
                            result.push('        </span>/总页面：<span>');
                            result.push(page);
                            result.push('        </span>');
                            result.push('      </div>');
                            result.push('    </div>');
                            result.push('    </div>');

                            pagenumber++;
                        }

                            $("#yesprint").append(result.join(""));
                            result = [];
                        }
                });
}

function loadTaskGrid(id) {
    var object = $.ajax({
        url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_OPERATIONS',
        type : 'post',
        async : false,
        data : {
            V_V_ORDERGUID:id
        },
        dataType : "json",
        traditional : true
    });
    return object;
}

function loadMatList(id) {
    var object = $.ajax({
        url: AppUrl + 'zdh/PRO_PM_WORKORDER_SPARE_VIEW',
        type : 'post',
        data : {
            V_V_ORDERGUID:id
        },
        dataType : "json",
        traditional : true
    });
    return object;
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
        if(i<30){
            temp.push(content.charAt(i));
            if(i%10==0&&i!=0){
                temp.push('<br/>');
            }
        }
    }

    return temp.join("");
}

function descBilldesc(content){
    if(content==''||content==undefined||content==null){
        return '';
    }else{
        var temp = [];
        for(var i=0;i<content.length;i++){
            if(i<40){
                temp.push(content.charAt(i));
            }
        }

        return temp.join("");
    }

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

function MoreAcceptBill() {
    var argument = window.opener.selectID;
    for(var i=0;i<argument.length;i++){
        Ext.Ajax.request({
            url: AppUrl + 'No4120/PRO_PM_WORKORDER_JS_REPAIRDEPT',
            method : 'post',
            async:false,
            params : {
                V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
                V_V_ORDERGUID:argument[i]
            },
            success : function(resp) {
                var resp = Ext.decode(resp.responseText);
            }
        });
    }
}