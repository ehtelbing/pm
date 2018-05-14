var selectID=[];
$(function() {
    loadPageInfo();
    loadTaskGrid();

    GetBillMatByOrder();
    loadMatList();
});

function loadPageInfo() {
    $.ajax({
        url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_GET',
        type : 'post',
        async : false,
        data : {
            V_V_ORDERGUID: $.url().param("V_GUID")//$.url().param("V_ORDERGUID")

        },
        dataType : "json",
        traditional : true,
        success : function(resp) {
            if (resp.list != "" && resp.list != null) {
                $("#V_ORGCODE").val(resp.list[0].V_ORGCODE);
                $("#V_ORGNAME").html(resp.list[0].V_ORGNAME);
                $("#V_DEPTCODE").val(resp.list[0].V_DEPTCODE);
                $("#V_EQUIP_NAME").html(resp.list[0].V_EQUIP_NAME);
                $("#V_EQUIP_NO").html(resp.list[0].V_EQUIP_NO);
                $("#V_FUNC_LOC").html(resp.list[0].V_FUNC_LOC);
                $("#V_ORDER_TYP").html(resp.list[0].V_ORDER_TYP);
                $("#V_DEPTNAME").html(resp.list[0].V_DEPTNAME);
                $("#V_ORDERGUID").val(resp.list[0].V_ORDERGUID);
                $("#V_DEPTNAMEREPARIR").html(resp.list[0].V_DEPTNAMEREPARIR);

                $("#V_ORDER_TYP_TXT").html(resp.list[0].V_ORDER_TYP_TXT);

                $("#D_START_DATE").html(resp.list[0].D_START_DATE);
                $("#D_FINISH_DATE").html(resp.list[0].D_FINISH_DATE);

                $("#V_SHORT_TXT").html(resp.list[0].V_SHORT_TXT);

                $("#V_ENTERED_BY").html(resp.list[0].V_ENTERED_BY);
                var s1, st1;
                if(resp.list[0].D_ENTER_DATE!=''){
                    s1 = resp.list[0].D_ENTER_DATE;
                    st1 = [];
                    st1 = s1.split(' ');
                }else{
                    s1 =new Date();
                    st1 = [];
                    st1 = s1.split(' ');
                }
                $("#D_ENTER_DATE").html(st1[0]);

                $("#V_WBS").html(resp.list[0].V_WBS);
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
}

function print() {
    selectID.push($("#V_ORDERGUID").val());
    window.open(AppUrl + "page/No410101/Index.html", selectID,
        "dialogHeight:700px;dialogWidth:1100px");
}

function loadTaskGrid() {
    $
        .ajax({
            url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_OPERATIONS',
            type: 'post',
            async: false,
            data: {
                V_V_ORDERGUID: $("#V_ORDERGUID").val()
            },
            dataType : "json",
            traditional : true,
            success : function(resp) {
                if (resp.list != "" && resp.list != null) {
                    $("#TtableT tbody").empty();
                    if (resp.list.length < 3) {
                        $("#TtableTaskTemplate").tmpl(resp.list).appendTo(
                            "#TtableT tbody");
                        for ( var i = 0; i < 3 - resp.list.length; i++) {
                            $("#TtableT tbody")
                                .append(
                                "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
                        }
                    } else {
                        $("#TtableTaskTemplate").tmpl(resp.list).appendTo(
                            "#TtableT tbody");
                        var tool = document.getElementById('V_TOOL');
                        tool.style.height = 45 * resp.list.length;

                        var tech = document.getElementById('V_TECHNOLOGY');
                        tech.style.height = 45 * resp.list.length;

                        var safe = document.getElementById('V_SAFE');
                        safe.style.height = 45 * resp.list.length;
                    }
                } else {
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
        dataType : "json",
        traditional : true,
        success : function(resp) {
            if (resp.list != null && resp.list != "") {
                $("#TtableM tbody").empty();
                $.each(resp.list, function(index, item) {
                    item["sid"] = index + 1;
                });
                $("#TtableMTemplate").tmpl(resp.list)
                    .appendTo("#TtableM tbody");
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
    var ret = window.open(AppUrl
        + '/No411001012/Index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val()
        + '', '', 'dialogHeight:500px;dialogWidth:800px');
}

function GetBillMatByOrder(){
    $.ajax({
        url:AppUrl + 'mm/WS_EquipGetBillMaterialByOrderService',
        type: 'post',
        async: false,
        data: {
            orderid:$("#V_ORDERID").html(),
            V_V_ORDERGUID:$("#V_ORDERGUID").val()
        },
        dataType: "json",
        traditional: true
    });
}