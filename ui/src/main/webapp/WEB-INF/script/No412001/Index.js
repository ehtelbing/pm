var deptcode='';
var selectID = [];
$(function() {
    loadPageInfo();
    loadTaskGrid();

    GetBillMatByOrder();
    loadMatList();
});

function loadPageInfo() {
    $.ajax({
        url: AppUrl + 'zdh/PRO_PM_WORKORDER_GET',
        type : 'post',
        async : false,
        data : {
            V_V_ORDERGUID:$.url().param("V_GUID")
        },
        dataType : "json",
        traditional : true,
        success : function(resp) {
            if (resp.length>0) {
                $("#V_ORGCODE").val(resp[0].V_ORGCODE);
                $("#V_ORGNAME").html(resp[0].V_ORGNAME);
                $("#V_DEPTCODE").val(resp[0].V_DEPTCODE);
                $("#V_EQUIP_NAME").html(resp[0].V_EQUIP_NAME);
                $("#V_EQUIP_NO").html(resp[0].V_EQUIP_NO);
                $("#V_FUNC_LOC").html(resp[0].V_FUNC_LOC);
                $("#V_ORDER_TYP").html(resp[0].V_ORDER_TYP);
                $("#V_DEPTNAME").html(resp[0].V_DEPTNAME);
                $("#V_ORDERGUID").val(resp[0].V_ORDERGUID);
                $("#V_DEPTNAMEREPARIR").html(resp[0].V_DEPTNAMEREPARIR);

                $("#V_ORDER_TYP_TXT").html(resp[0].V_ORDER_TYP_TXT);

                $("#D_START_DATE").html(resp[0].D_START_DATE);
                $("#D_FINISH_DATE").html(resp[0].D_FINISH_DATE);

                $("#V_SHORT_TXT").html(resp[0].V_SHORT_TXT);

                $("#V_ENTERED_BY").html(resp[0].V_ENTERED_BY);
                var s1, st1;
                if(resp[0].D_ENTER_DATE!=''){
                    s1 = resp[0].D_ENTER_DATE;
                    st1 = [];
                    st1 = s1.split(' ');
                }else{
                    s1 =new Date();
                    st1 = [];
                    st1 = s1.split(' ');
                }
                $("#D_ENTER_DATE").html(st1[0]);

                $("#V_WBS").html(resp[0].V_WBS);
                $("#V_WBS_TXT").html(resp[0].V_WBS_TXT);

                $("#V_ORDERID").html(resp[0].V_ORDERID);
                $("#V_DEPTCODEREPARIR").val(resp[0].V_DEPTCODEREPARIR);



                $("#D_DATE_ACP").html(resp[0].D_DATE_ACP);
                $("#V_POSTMANSIGN").html(resp[0].V_POSTMANSIGN);
                $("#V_CHECKMANCONTENT").html(resp[0].V_CHECKMANCONTENT);
                $("#V_CHECKMANSIGN").html(resp[0].V_CHECKMANSIGN);
                $("#V_WORKSHOPCONTENT").html(resp[0].V_WORKSHOPCONTENT);
                $("#V_WORKSHOPSIGN").html(resp[0].V_WORKSHOPSIGN);
                $("#V_DEPTSIGN").html(resp[0].V_DEPTSIGN);

                $("#I_OTHERHOUR").html(resp[0].I_OTHERHOUR);
                $("#V_OTHERREASON").html(resp[0].V_OTHERREASON);
                $("#V_REPAIRCONTENT").html(resp[0].V_REPAIRCONTENT);
                deptcode=resp[0].V_DEPTCODE;
                $("#V_REPAIRSIGN").html(resp[0].V_REPAIRSIGN);
                $("#V_REPAIRPERSON").html(resp[0].V_REPAIRPERSON);

                $("#D_FACT_START_DATE").html(resp[0].D_FACT_START_DATE);
                $("#D_FACT_FINISH_DATE").html(resp[0].D_FACT_FINISH_DATE);

            }
        }
    });
}
function loadTaskGrid() {
    $
        .ajax({
            url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_OPERATIONS',
            type : 'post',
            async : false,
            data : {
                V_V_ORDERGUID:$("#V_ORDERGUID").val()
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
                                "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
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
        url : AppUrl + 'zdh/PRO_PM_WORKORDER_SPARE_VIEW',
        type : 'post',
        async : false,
        data : {
            V_V_ORDERGUID:$("#V_ORDERGUID").val()
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
    var ret = window.open(AppUrl+'page/PM_070204/index.html?V_ORDERGUID='
        + $("#V_ORDERGUID").val()
        + '&V_DEPTREPAIRCODE=' + deptcode
        + '', '41070101',
        'dialogHeight:500px;dialogWidth:800px');
}

function ViewLook() {
    window.open(AppUrl
        + '/No41100103/Index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val()
        + '', '', 'dialogHeight:500px;dialogWidth:800px');
}

function OnClickJJButton() {
    window.open(AppUrl
        + '/No411001012/Index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val()
        + '', '', 'dialogHeight:500px;dialogWidth:800px');
}

function GetBillMatByOrder(){
    $.ajax({
        url:AppUrl + '/mm/WS_EquipGetBillMaterialByOrderService',
        type: 'post',
        async: false,
        data: {
            V_V_ORDERID:$("#V_ORDERID").html(),
            V_V_ORDERGUID:$("#V_ORDERGUID").val(),
            x_personcode:$.cookies.get('v_personcode')
        },
        dataType: "json",
        traditional: true
    });
}

function printAndGo(){

    $.ajax({
        url : APP + '/ModelChange',
        type : 'post',
        data : {
            parName : [ 'V_V_PERSONCODE','V_V_ORDERGUID' ],
            parType : [ 's' ,'s'],
            parVal : [ $.url().param("personname"),$("#V_ORDERGUID").val() ],
            proName : 'PRO_PM_WORKORDER_JS_REPAIRDEPT',
            returnStr : 'V_CURSOR',
            returnStrType : [ 's' ]
        },
        dataType : "json",
        traditional : true,
        success : function(resp) {
            if (resp[0] == '成功') {
                var sel = [];
                sel.push($("#V_ORDERGUID").val());
                window.showModalDialog(AppUrl + "/No410101/Index.html", sel,
                    "dialogHeight:700px;dialogWidth:1100px");
                window.returnValue = 'yes';
            }
        }
    });

}

function ClickText(){
    document.getElementById('bhText').value="";
}
function print() {
    selectID.push($("#V_ORDERGUID").val());
    window.open(AppUrl + "page/No410101/Index.html", selectID,
        "dialogHeight:700px;dialogWidth:1100px");
}
function CreateBill(){
    Ext.Ajax.request({
        url: AppUrl + 'No4120/PRO_PM_WORKORDER_JS_REPAIRDEPT',
        method : 'post',
        async:false,
        params : {
            V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_ORDERGUID:$.url().param("V_GUID")
        },
        success : function(resp) {
            if (resp[0] == '成功') {
                Ext.Msg.alert('操作信息', '工单接收失败');
            }else{
                {
                    Ext.Msg.alert('操作信息',  '工单接收成功');
                    print();
                }
            }
        }
    });
}
function OpenEditMat() {
    if($("#V_EQUCODE").val()==''){
        alert('请选择设备！');
        return;
    }
    Ext.Ajax.request({
        url : AppUrl + 'zdh/PRO_PM_WORKORDER_ET_ACTIVITY',
        type: "post",
        async: false,
        params: {
            V_V_ORDERGUID : $("#V_ORDERGUID").val()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if($("#V_EQUIP_NO").html() == ""){ alert("设备编码不能为空.");}else{
                var owidth = window.document.body.offsetWidth-200;
                var oheight = window.document.body.offsetHeight-100 ;
                var ret = window.open(AppUrl+'page/PM_050102/index.html?flag=all&V_ORDERGUID=' + $("#V_ORDERGUID").val() +'', '',  '_blank', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
                loadMatList();
            }
        }
    });
}
function OnClickBHButton(){
    if($('#bhText').val()==""||$('#bhText').val()=="请填写驳回原因(必填)"){alert("请填写驳回原因"); return; }
    $.ajax({
        url : AppUrl + 'No4120/PRO_PM_WORKORDER_SP',
        type : 'post',
        data : {
            V_V_PERSONCODE :$.cookies.get('v_personcode'),
            V_V_ORDERGUID :$("#V_ORDERGUID").val(),
            V_V_STEPNAME :'检修单位驳回',
            V_V_MEMO:$('#bhText').val(),
            V_V_STATECODE:'-1'
        },
        dataType : "json",
        traditional : true,
        success : function(resp) {
            if (resp.success) {
                alert("驳回成功");
                window.returnValue = 'yes';
                window.close();
            }else{alert("驳回失败");}
        }
    });

}