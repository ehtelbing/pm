var selectID = [];
var V_DEPTREPAIRCODE = null;
var V_DEPTCODE='';
$(function() {
    loadPageInfo();
    loadTaskGrid();

    GetBillMatByOrder();
    loadMatList();
    $("#btnTask").click(function () {

        var owidth = window.document.body.offsetWidth-200;
        var oheight = window.document.body.offsetHeight-100 ;
        var ret = window.open(AppUrl+'page/PM_070204/index.html?V_ORDERGUID=' + $.url().param("V_ORDERGUID") +  '&V_DEPTREPAIRCODE=' + V_DEPTCODE +'', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

    });


    var gridWinStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'gridWinStore',
        fields: ['V_CLASS_CODE',
            'V_CLASS_NAME',
            'V_SAP_WORK',
            'V_DEPTCODE'],
        proxy: {
            type: 'ajax',
            async: false,
            url:   AppUrl + 'zdh/PRO_BASE_DEPTCLASS',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });


    var win=Ext.create('Ext.window.Window', {
        id: 'win',
        width: 400,
        height: 300,
        title: '审批人员选择',
        modal: true,
        frame: true,
        closeAction: 'hide',
        closable: true,
        layout: 'border',
        items: [{xtype:'panel',region:'north',frame:true,widtt:'100%', baseCls: 'my-panel-no-border',layout:'column',
            items:[{xtype:'button', margin: '5px 0px 5px 5px',text:'选择',icon: imgpath + '/add.png',handler: checkPer}]},
            {xtype: 'gridpanel', region: 'center', columnLines: true, id: 'gridWin', store: 'gridWinStore', selType: 'checkboxmodel',
                columns: [
                    {xtype: 'rownumberer', text: '序号', width: 60, align: 'center' },
                    {text: '班组编码', align: 'center', width: 150, dataIndex: 'V_CLASS_CODE'},
                    {text: '班组名称', align: 'center', width: 150, dataIndex: 'V_CLASS_NAME'}]
            }]
    });

    Ext.data.StoreManager.lookup('gridWinStore').on('load',function(){
        if(Ext.data.StoreManager.lookup('gridWinStore').data.items.length==0){
            alert("班组信息获取错误");

        }else{
            Ext.getCmp('win').show();
        }
    });
});
function loadPageInfo() {
    $.ajax({
        url : AppUrl + 'WorkOrder/PRO_PM_WORKORDER_GET',
        type : 'post',
        async : false,
        data : {
            V_V_ORDERGUID: $.url().param("V_ORDERGUID")
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
                $("#V_FUNC_LOC").html(resp.list[0].V_EQUSITENAME);
                $("#V_ORDER_TYP").html(resp.list[0].V_ORDER_TYP);
                $("#V_DEPTNAME").html(resp.list[0].V_DEPTNAME);
                V_DEPTCODE=resp.list[0].V_DEPTCODEREPARIR;
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


function loadTaskGrid() {
    $.ajax({
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
        url: AppUrl + 'zdh/PRO_PM_WORKORDER_SPARE_VIEW',
        type : 'post',
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
                $("#TtableMTemplate").tmpl(resp.list).appendTo("#TtableM tbody");
            } else {
            }
        }
    });
}

function ViewTask() {
    var owidth = window.document.body.offsetWidth-200;
    var oheight = window.document.body.offsetHeight-100 ;
    var ret = window.open(AppUrl+'page/PM_090902/index.html?V_ORDERGUID='+$("#V_ORDERGUID").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}

function ViewLook() {
    var owidth = window.document.body.offsetWidth-200;
    var oheight = window.document.body.offsetHeight-100 ;
    var ret = window.open(AppUrl+'page/PM_090903/index.html?V_ORDERGUID='+$("#V_ORDERGUID").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}

function OnClickJJButton() {
    var owidth = window.document.body.offsetWidth-200;
    var oheight = window.document.body.offsetHeight-100 ;
    var ret = window.open(AppUrl+'page/PM_090904/index.html?V_ORDERGUID='+$("#V_ORDERGUID").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
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

function checkPer(){
    var sumpercode="";
    var seldata = Ext.getCmp('gridWin').getSelectionModel().getSelection();
    if (seldata.length ==0) {
        alert('请选择一个班组！');
        return false;
    }else{
        for(var i=0;i<seldata.length;i++){
            if(i==0){
                sumpercode=seldata[i].data.V_CLASS_CODE;
            }else{
                sumpercode=sumpercode+","+seldata[i].data.V_CLASS_CODE;
            }
        }
       Ext.Ajax.request({
           url : AppUrl + 'zdh/PRO_WORKORDER_FLOW_CLASS',
           type : 'post',
           async : false,
           params : {
               V_V_ORDERGUID: $("#V_ORDERGUID").val(),
               V_V_DBGUID:$.url().param("V_DBGUID"),
               V_V_IDEA: $('#spyj').val()==""?"同意": $('#spyj').val(),
               V_V_CLASS: sumpercode
           },
           success : function(response) {
               var resp = Ext.decode(response.responseText);
               if (resp.V_INFO == 'success') {
                   window.opener.OnPageLoad();
                   window.opener.QueryGrid();
                   window.close();
               } else {
                   alert('审批失败');
               }
           }
        });
    }
}
function QueryPer(){
    Ext.data.StoreManager.lookup('gridWinStore').load({
        params:{
            V_V_DEPTREPAIRCODE:V_DEPTCODE
        }
    })
}
function Agree() {
    QueryPer();
}
function DisAgree() {
    Ext.Ajax.request({
        url: AppUrl + 'zdh/PRO_WO_FLOW_EQU_DISAGREE',
        method: 'POST',
        async: false,
        params: {
            V_V_ORDERID:$("#V_ORDERGUID").val(),
            V_V_DBGUID:$.url().param("V_DBGUID"),
            V_V_IDEA:$('#spyj').val()==''?'驳回':$('#spyj').val(),
            V_V_FLOWSTEP:$.url().param("V_FLOWSTEP")
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if(resp.V_INFO=='success'){

                alert('审批成功！')
                window.close();
                window.opener.OnPageLoad();
                window.opener.QueryGrid();
            }else{
                alert('审批失败');
            }
        }
    });
}


function OpenEditMat() {
    Ext.Ajax.request({
        url : AppUrl + 'zdh/PRO_PM_WORKORDER_ET_ACTIVITY',
        type: "post",
        async: false,
        params: {
            V_V_ORDERGUID : V_ORDERGUID
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            var owidth = window.document.body.offsetWidth-200;
            var oheight = window.document.body.offsetHeight-100 ;
            var ret = window.open(AppUrl+'page/PM_050102/index.html?flag=all&V_ORDERGUID=' + $.url().param("V_ORDERGUID") +'', '', '_blank','height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
            loadMatList();
        }
    });
}