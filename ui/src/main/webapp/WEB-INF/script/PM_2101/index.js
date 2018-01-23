var V_GUID = null;
var V_EQUTYPECODE = null;
var V_DEFECTGUID='';
if (location.href.split('?')[1] != undefined) {
    V_V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
}

$(function() {
    bindDate("planStartDate");
    bindDate("planFinDate");

    $("#personCode").html(Ext.util.Cookies.get('v_personname2'));
    NowDate2("createDate");
    NowDate_b("planStartDate");
    NowDate_e("planFinDate");



    loadPageInfo();
    loadTypelist();
    loadRepairList();

    loadTaskGrid();
    loadMatList();

    var gridStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'gridStore',
        fields: ['V_FLOWSTEP','V_PERSONCODE','V_PERSONCODE','V_FLOWCODE','V_FLOWNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url:   AppUrl + 'WorkOrder/PM_WORKORDER_FLOW_PER_SEL',
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
        items: [{xtype:'panel',region:'north',frame:true,widtt:'100%', baseCls: 'my-panel-no-border',layout:'column',frame:true,
                    items:[{xtype:'button', margin: '5px 0px 5px 5px',text:'选择',icon: imgpath + '/add.png',handler: checkPer}]},
                {xtype: 'gridpanel', region: 'center', columnLines: true, id: 'grid', store: 'gridStore', selType: 'checkboxmodel',
                    columns: [
                            {xtype: 'rownumberer', text: '序号', width: 60, align: 'center' },
                            {text: '流程步骤名称', align: 'center', width: 150, dataIndex: 'V_FLOWSTEP'},
                            {text: '审批人', align: 'center', width: 150, dataIndex: 'V_PERSONCODE'}]
                }]
    });

    Ext.data.StoreManager.lookup('gridStore').on('load',function(){
        if(Ext.data.StoreManager.lookup('gridStore').data.items.length==0){
            alert('工单创建成功！');
            window.close();
        }else{
            Ext.getCmp('win').show();
        }
    });


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
    //WBS编码选择页面
    $("#wbsCode").click(function () {
        var owidth = window.document.body.offsetWidth-200;
        var oheight = window.document.body.offsetHeight-100 ;
        var ret = window.open(AppUrl+'page/PM_04/index.html?V_ORGCODE='+$("#V_ORGCODE").val()+'&V_DEPTCODE=' + $("#V_DEPTCODE").val() +
        '&V_EQUTYPECODE='+V_EQUTYPECODE+'&V_EQUCODE='+$("#V_EQUCODE").val()+'&wbsCode='+$("#wbsCode").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
    });
});

function loadPageInfo() {
    Ext.Ajax.request({
            url: AppUrl + 'PM_09/PRO_WORKORDER_SEL_BYGUID',
            type : 'post',
            async : false,
            params : {
                V_V_ORDERGUID : V_V_ORDERGUID
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
                    $("#wbsCode").val(resp.list[0].V_WBS);
                    $("#wbsDesc").val(resp.list[0].V_WBS_TXT);
                    V_DEFECTGUID=resp.list[0].V_DEFECTGUID


                } else {
                }
            }
        });
}

function loadTypelist() {
    $.ajax({
        url : AppUrl + 'WorkOrder/PM_WORKORDER_TYPE_SEL',
        type: 'post',
        async : false,
        data : {
            V_V_SOURCECODE : 'defct01'
        },
        success : function(resp) {
            var result=[];
            $.each(resp.list, function(index, item) {
                result.push("<option value=\"" + item.ORDER_TYP + "\">" + item.ORDER_TYP_TXT + "</option>");
            });
            $("#selType").html(result.join(""));
        }
    });
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
        //url: "/No410701/PRO_PM_WORKORDER_ET_OPERATIONS",
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
                var ret = window.open(AppUrl+'page/PM_070203/index.html?flag=all&V_ORDERGUID=' + $("#V_ORDERGUID").val() +'', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
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
                url : AppUrl + 'WorkOrder/PRO_PM_WORKORDER_DEFECT_SAVE',
                type : 'post',
                async : false,
                params : {
                    V_V_PERNAME: $.cookies.get('v_personcode'),
                    V_V_DEFECT_GUID:  V_DEFECTGUID,
                    V_V_ORDERGUID:  $("#V_ORDERGUID").val(),
                    V_V_EQUCODE:$("#V_EQUCODE").val(),
                    V_V_WORKORDER_TYPE:$("#selType").val(),
                    V_V_DEPTCODEREPARIR: $("#selPlant").val(),
                    V_V_SHORT_TXT:  $("#V_DEFECTLIST").val(),
                    V_V_WBS:  $("#wbsCode").val(),
                    V_V_WBS_TXT: $("#wbsDesc").val(),
                    V_D_START_DATE: $("#planStartDate").val(),
                    V_D_FINISH_DATE: $("#planFinDate").val()
                },
                success : function(response) {
                    var resp = Ext.decode(response.responseText);
                    if (resp.RET=='成功'){
                        QueryPer();
                    }
                }
            });
        }
    }
}


/*
* 查询工单流程审批人
* */
function QueryPer(){
    Ext.data.StoreManager.lookup('gridStore').load({
        params:{
            V_V_DEPTCODE: $("#V_DEPTCODE").val(),
            V_V_DEPTCODEREPARIR:$("#selPlant").val(),
            V_V_GUID:$("#V_ORDERGUID").val(),
            V_V_FLOWTYPE:'WORK'
        }
    })
}

function checkPer(){
    var sumpercode="";
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length <=0) {
        alert('请选择审批人员！');
        return false;
    }else{
        for(var i=0;i<seldata.length;i++){
            if(i==0){
                sumpercode=seldata[i].data.V_PERSONCODE;
            }else{
                sumpercode=sumpercode+","+seldata[i].data.V_PERSONCODE;
            }
        }

        Ext.Ajax.request({
            url : AppUrl + 'WorkOrder/PRO_WO_FLOW_DB_INSERT',
            type : 'post',
            async : false,
            params : {
                V_V_ORDERID: $("#V_ORDERGUID").val(),
                V_V_FLOWSTEP: seldata[0].data.V_FLOWSTEP,
                V_V_STATUS: '0',
                V_V_PERCODE: sumpercode,
                V_V_FLOWTYPE: 'WORK',
                V_V_FLOWCODE: seldata[0].data.V_FLOWCODE,
                V_V_FLOWNAME: seldata[0].data.V_FLOWNAME
            },
            success : function(response) {
                var resp = Ext.decode(response.responseText);
                if (resp.RET=='success'){
                    alert('工单创建成功！')
                    window.close();
                }
            }
        });
    }
}

function orderissued(){
    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: AppUrl + 'zdh/SetMat',
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

function NowDate_b(id) {
    var d, s;
    d = new Date();
    var year = d.getFullYear().toString();
    var month = (d.getMonth() + 1).toString();
    var date = d.getDate().toString();
    var hou = d.getHours().toString();
    var min = d.getMinutes().toString();
    var sen = d.getSeconds().toString();
    s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " 08:30:00" ;
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

function getEquipReturnValue(ret){
    var str = [];
    str = ret.split('^');
    $("#V_EQUIP_NAME").val(str[1]);
    $("#V_EQUIP_NO").val(str[0]);
    if(str[2] != ''){
        $("#V_FUNC_LOC").val(str[2]);
    }

}

function getReturnWBS(data) {
    $("#wbsCode").val(data[0]);
    $("#wbsDesc").val(data[1]);
}