
$(function() {
    loadPageInfo();
    loadTaskGrid();

    GetBillMatByOrder();
    loadMatList();
});

function loadPageInfo() {
    Ext.Ajax.request({
        url : AppUrl + 'PM_09/PM_09_WORKORDER_GET',
        // url: "/No410101/PM_09_WORKORDER_GET",
        method: 'POST',
        async: false,
        params : {
            V_V_ORDERGUID : $.url().param("V_GUID")
        },
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
    var sel = [];
    sel.push($("#V_ORDERGUID").val());
    window.showModalDialog(AppUrlUrl + "/No410101/Index.html", sel,
        "dialogHeight:700px;dialogWidth:1100px");
}

function loadTaskGrid() {

            Ext.Ajax.request({
                url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_OPERATIONS',
                // url : '/NO2102/PRO_PM_WORKORDER_ET_OPERATIONS',
                method: 'POST',
                async: false,
                params: {
                    V_V_ORDERGUID : $("#V_ORDERGUID").val()
            },
            success : function(resp) {
                if (resp.list != "" && resp.list != null) {
                    $("#TtableT tbody").empty();
                    if (resp.list.length < 3) {
                        $("#TtableTaskTemplate").tmpl(resp.list).AppUrlendTo(
                            "#TtableT tbody");
                        for ( var i = 0; i < 3 - resp.list.length; i++) {
                            $("#TtableT tbody")
                                .AppUrlend(
                                "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
                        }
                    } else {
                        $("#TtableTaskTemplate").tmpl(resp.list).AppUrlendTo(
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
        Ext.Ajax.request({
            url: AppUrl + 'zdh/PRO_PM_WORKORDER_SPARE_VIEW',
            // url : '/NO2102/PRO_PM_WORKORDER_ET_OPERATIONS',
            method: 'POST',
            async: false,
            params: {
                V_V_ORDERGUID : $("#V_ORDERGUID").val()
            },
        success : function(resp) {
            if (resp.list != null && resp.list != "") {
                $("#TtableM tbody").empty();
                $.each(resp.list, function(index, item) {
                    item["sid"] = index + 1;
                });
                $("#TtableMTemplate").tmpl(resp.list)
                    .AppUrlendTo("#TtableM tbody");
            } else {
            }
        }
    });
}

function ViewTask() {
    var ret = window.showModalDialog(AppUrlUrl
    + '/No41100101/Index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val()
    + '', '', 'dialogHeight:500px;dialogWidth:800px');
}

function ViewLook() {
    var ret = window.showModalDialog(AppUrlUrl
    + '/No41100103/Index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val()
    + '', '', 'dialogHeight:500px;dialogWidth:800px');
}

function OnClickJJButton() {
    var ret = window.showModalDialog(AppUrlUrl
    + '/No411001012/Index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val()
    + '', '', 'dialogHeight:500px;dialogWidth:800px');
}

function GetBillMatByOrder(){

    Ext.Ajax.request({
        url: AppUrl + 'mm/WS_EquipGetBillMaterialByOrderService',
        method: 'POST',
        async: false,
        params: {
            V_V_ORDERGUID: $("#V_ORDERGUID").val(),
            V_V_ORDERID: $("#V_ORDERID").html(),
            x_personcode : Ext.util.Cookies.get('v_personcode')
        },
        success: function (resp) {

        }
    });
}

function printAndGo(){

        Ext.Ajax.request({
            url: AppUrl + 'zdh/PM_09_WORKORDER_JS_REPAIRDEPT',
            method: 'POST',
            async: false,
            params: {
                V_V_PERSONCODE:  $.url().param("personname"),
                V_V_ORDERGUID: $("#V_ORDERGUID").val()

            },
        success : function(resp) {
            if (resp[0] == '成功') {
                var sel = [];
                sel.push($("#V_ORDERGUID").val());
                window.showModalDialog(AppUrlUrl + "/No410101/Index.html", sel,
                    "dialogHeight:700px;dialogWidth:1100px");
                window.returnValue = 'yes';
            }
        }
    });

}

function ClickText(){
    document.getElementById('bhText').value="";
}

function OnClickBHButton(){
    if($('#bhText').val()==""||$('#bhText').val()=="请填写驳回原因(必填)"){alert("请填写驳回原因"); return; }
        Ext.Ajax.request({
            url: AppUrl + 'zdh/PM_09_WORKORDER_JS_REPAIRDEPT',
            method: 'POST',
            async: false,
            params: {
                V_V_PERSONCODE:  $.cookies.get('v_personcode'),
                V_V_ORDERGUID: $("#V_ORDERGUID").val(),
                V_V_STEPNAME: '检修单位驳回',
                V_V_MEMO: $('#bhText').val(),
                V_V_STATECODE: '-1'
            },
        success : function(resp) {
            if (resp[0] == '成功') {
                alert("驳回成功");
                window.returnValue = 'yes';
                window.close();
            }else{alert("驳回失败");}
        }
    });

}