var V_DEPTREPAIRCODE = null;
var I_ID = -1;
var V_ORDERGUID = null;
if (location.href.split('?')[1] != undefined) {
    V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
}

$(function () {

    loadOrder();

    loadTeam();

    loadTaskGrid();

    loadMatList();

    loadOther();
});

function loadOrder(){
    Ext.Ajax.request({
        url: AppUrl + 'zdh/PRO_WX_WORKORDER_GET',
        method: 'POST',
        async: false,
        params: {
            V_V_ORDERGUID:  V_ORDERGUID
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if (resp.list != "" && resp.list != null) {
                $("#V_ORGNAME").html(resp.list[0].V_ORGNAME);
                $("#V_DEPTNAME").html(resp.list[0].V_DEPTNAME);
                $("#V_ORDERID").html(resp.list[0].V_ORDERID);
                $("#V_ENTERED_BY").html(resp.list[0].V_ENTERED_BY);
                $("#D_ENTER_DATE").html(resp.list[0].D_ENTER_DATE);
                $("#V_EQUIP_NAME").html(resp.list[0].V_EQUIP_NAME);
                $("#V_EQUIP_NO").html(resp.list[0].V_EQUIP_NO);
                $("#V_FUNC_LOC").html(resp.list[0].V_FUNC_LOC);
                $("#V_DEPTNAMEREPARIR").html(resp.list[0].V_DEPTNAMEREPARIR);
                $("#V_SHORT_TXT").html(resp.list[0].V_SHORT_TXT);
                $("#D_START_DATE").html(resp.list[0].D_START_DATE);
                $("#D_FINISH_DATE").html(resp.list[0].D_FINISH_DATE);
                $("#D_FACT_START_DATE").html(resp.list[0].D_FACT_START_DATE);
                $("#D_FACT_FINISH_DATE").html(resp.list[0].D_FACT_FINISH_DATE);
                V_DEPTREPAIRCODE = resp.list[0].V_DEPTCODEREPARIR;
                loadTeam(resp.list[0].V_WXTEAM);
            }
        }
    });
}

function loadTeam(wxteam){

    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: AppUrl + 'zdh/teamname_sel',
        params: {
            IN_CLASSCODE: wxteam
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            for(var i=0;i<resp.list.length;i++){
                $("#V_TEAM").html(resp.list[0].V_CLASS_NAME);
                break;
            }

        }
    });

    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: AppUrl + 'zdh/teamdetail_sel',
        params: {
            IN_CLASSCODE: wxteam,
            IN_ORDERGUID: V_ORDERGUID
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            for(var i=0;i<resp.list.length;i++){
                $("#V_TEAM").html(resp.list[0].V_CLASS_NAME);
                break;
            }

            for(var i=0;i<resp.list.length;i++){
                if(i==0){
                    if(resp.list[i].V_ROLECODE == "11"){
                        $("#V_TEAMPERSON").html(resp.list[i].V_PERSONNAME+"（班长）");
                    }
                    else{
                        $("#V_TEAMPERSON").html(resp.list[i].V_PERSONNAME);
                    }
                }
                else{
                    if(resp.list[i].V_ROLECODE == "11"){
                        $("#V_TEAMPERSON").append(","+resp.list[i].V_PERSONNAME+"（班长）");
                    }
                    else{
                        $("#V_TEAMPERSON").append(","+resp.list[i].V_PERSONNAME);
                    }
                }
            }
        }
    });
}



function getEquipReturnValue(ret){
    var str = [];
    str = ret.split('^');
    $("#V_EQUIP_NAME").val(str[1]);
    $("#V_EQUIP_NO").val(str[0]);
    $("#V_FUNC_LOC").val(str[2]);
}

function CreateOrderGUID() {
    Ext.Ajax.request({
        url: AppUrl + 'zdh/orderid_create',
        method: 'POST',
        async: false,
        params: {
            V_V_PERCODE:  $.cookies.get('v_personcode'),
            V_V_PERNAME: Ext.util.Cookies.get('v_personname2'),
            V_V_ORGCODE:   $("#V_ORGNAME").val(),
            V_V_DEPTCODE: $("#V_DEPTNAME").val()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if (resp.list != "" && resp.list != null) {
                $("#V_ORDERID").html(resp.list[0].V_ORDERID);
                $("#V_ORDERGUID").val(resp.list[0].V_ORDERGUID);
                $("#V_SHORT_TXT").val(resp.list[0].V_SHORT_TXT);
                $("#tool").val(resp.list[0].V_TOOL);
                $("#V_TECHNOLOGY").val(resp.list[0].V_TECHNOLOGY);
                $("#V_SAFE").val(resp.list[0].V_SAFE);
            }
        }
    });
}

function loadPlantList() {
    Ext.Ajax.request({
        url: AppUrl + 'zdh/plant_sel',
        method: 'POST',
        async: false,
        params: {
            IS_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
            IS_V_DEPTTYPE: '[基层单位]'
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            $("#V_ORGNAME").empty();
            $.each(resp.list, function (index, item) {
                $("<option value=\"" + item.V_DEPTCODE + "\">" + item.V_DEPTNAME + "</option>").appendTo("#V_ORGNAME");
            });
        }
    });
}

function loadDeptList() {
    Ext.Ajax.request({
        url: AppUrl + 'zdh/plant_sel',
        method: 'POST',
        async: false,
        params: {
            IS_V_DEPTCODE: $("#V_ORGNAME").val(),
            IS_V_DEPTTYPE: '[主体作业区]'
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            $("#V_DEPTNAME").empty();
            $.each(resp.list, function (index, item) {
                $("<option value=\"" + item.V_DEPTCODE + "\">" + item.V_DEPTNAME + "</option>").appendTo("#V_DEPTNAME");
            });
        }
    });
}


function loadRepairList() {
    Ext.Ajax.request({
        url: AppUrl + 'zdh/fixdept_sel',
        method: 'POST',
        async: false,
        params: {
            V_V_DEPTCODE: $("#V_DEPTNAME").val()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            $("#V_DEPTNAMEREPARIR").empty();
            $.each(resp.list, function (index, item) {
                $("<option value=\"" + item.V_DEPTREPAIRCODE + "\">" + item.V_DEPTREPAIRNAME + "</option>").appendTo("#V_DEPTNAMEREPARIR");
            });
        }
    });
}

/**
 加载编辑任务的grid
 */
function loadTaskGrid() {
    Ext.Ajax.request({
        url : AppUrl + 'zdh/PRO_PM_WORKORDER_ET_OPERATIONS',
        //url: "/No410701/PRO_PM_WORKORDER_ET_OPERATIONS",
        type: 'post',
        async: false,
        params: {
               V_V_ORDERGUID: V_ORDERGUID
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if (resp.list != "" && resp.list != null) {
                $("#TtableT tbody").empty();
                if (resp.list.length < 3) {
                    $("#TtableTaskTemplate").tmpl(resp.list).appendTo("#TtableT tbody");
                    for (var i = 0; i < 3 - resp.list.length; i++) {
                        $("#TtableT tbody").append("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
                    }
                } else {
                    $("#TtableTaskTemplate").tmpl(resp.list).appendTo("#TtableT tbody");
                    //var tool = document.getElementById('tool');
                    //tool.style.height = $("#TtableT").height()-28;
                    //
                    //var tech = document.getElementById('V_TECHNOLOGY');
                    //tech.style.height = $("#TtableT").height()-28;
                    //
                    //var safe = document.getElementById('V_SAFE');
                    //safe.style.height = $("#TtableT").height()-28;
                }
                //$("#TtableTaskTemplate").tmpl(resp.list).appendTo("#TtableT tbody");
            } else {
                $("#TtableT tbody").empty();
                for (var i = 0; i < 3; i++) {
                    $("#TtableT tbody").append("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
                }

                //var tool = document.getElementById('tool');
                //tool.style.height = $("#TtableT").height()-28;
                //
                //var tech = document.getElementById('V_TECHNOLOGY');
                //tech.style.height = $("#TtableT").height()-28;
                //
                //var safe = document.getElementById('V_SAFE');
                //safe.style.height = $("#TtableT").height()-28;
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
            V_V_ORDERGUID : $("#V_ORDERGUID").val()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if($("#V_EQUIP_NO").val() == ""){ alert("设备编码不能为空.");}else{
                var owidth = window.document.body.offsetWidth-200;
                var oheight = window.document.body.offsetHeight-100 ;

                if (resp.list == "" || resp.list == null) {
                    var ret = window.open(AppUrl+'page/PM_050102/index.html?flag=all&V_ORDERGUID=' + $("#V_ORDERGUID").val() +'', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
                } else {
                    var ret = window.open(AppUrl+'page/PM_050102/index.html?flag=delete&V_ORDERGUID=' + $("#V_ORDERGUID").val() +'', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
                }
                loadMatList();
            }
        }
    });
}

$('#btnGJJJ').live('click', function () {
    var ret = window.showModalDialog(AppUrl+'/No41070103/Index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val() + '', '41070103', 'dialogHeight:500px;dialogWidth:800px');
});

function loadMatList() {
    Ext.Ajax.request({
        url : AppUrl + 'zdh/PRO_PM_WORKORDER_SPARE_VIEW',
        type: 'post',
        params: {
              V_V_ORDERGUID: V_ORDERGUID
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if (resp.list != null && resp.list != "") {
                $("#TtableM tbody").empty();
                $.each(resp.list, function (index, item) { item["sid"] = index + 1; });
                $("#TtableMTemplate").tmpl(resp.list).appendTo("#TtableM tbody");
            } else { $("#TtableM tbody").empty(); }
        }
    });
}



function OrderSave() {
    window.print();
}

function GetModel() {
    if ($("#V_EQUIP_NO").val() == "" || $("#V_EQUIP_NO").val() == null) { alert("请先选择设备!"); } else {
        var ret = window.showModalDialog(AppUrl+'/No41070106/Index.html?V_EQUIP_NO=' + $("#V_EQUIP_NO").val() + '&V_ORDERGUID=' + $('#V_ORDERGUID').val() + '&V_DEPTREPAIRCODE='+ $('#V_DEPTNAMEREPARIR').val() + '','', 'dialogHeight:500px;dialogWidth:800px');
        //loadTaskGrid();
        //loadToolAndTxtList();
        //loadMatList();
    }
}

function GetAssign() {

}

function loadToolAndTxtList() {

    $.ajax({
        url : APP + '/ModelSelect',
        type: 'post',
        async: false,
        data: {
            parName : ['V_V_PERCODE','V_V_PERNAME','V_V_ORGCODE','V_V_DEPTCODE'],
            parType : ['s','s','s','s'],
            parVal : [
                $.cookies.get('v_personcode'),
                Ext.util.Cookies.get('v_personname2'),
                $("#V_ORGNAME").val() ,
                $("#V_DEPTNAME").val()
            ],
            proName : 'PRO_PM_WORKORDER_DD_CREATE',
            cursorName : 'V_CURSOR'

        },
        dataType: "json",
        traditional: true,
        success: function (resp) {
            if (resp.list != "" && resp.list != null) {

                if(resp.list[0].V_TOOL==""){$("#tool").val("");}else{$("#tool").val(resp.list[0].V_TOOL);}

                if(resp.list[0].V_SHORT_TXT==""){$("#V_SHORT_TXT").val("");}else{$("#V_SHORT_TXT").val(resp.list[0].V_SHORT_TXT);}
                if(resp.list[0].V_TECHNOLOGY==""){$("#V_TECHNOLOGY").val("");}else{$("#V_TECHNOLOGY").val(resp.list[0].V_TECHNOLOGY);}
                if(resp.list[0].V_SAFE==""){$("#V_TECHNOLOGY").val("");}else{$("#V_SAFE").val(resp.list[0].V_SAFE);}

            } else {


            }
        }
    });

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
    //s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " " + dateFomate(hou) + ":" + dateFomate(min) + ":" + dateFomate(sen);
    s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " 16:30:00" ;

    //try { $("#" + id + "").html(s); } catch (e) { $("#" + id + "").val(s); }
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
    //s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " " + dateFomate(hou) + ":" + dateFomate(min) + ":" + dateFomate(sen);
    s = year + "-" + dateFomate(month) + "-" + dateFomate(date) ;
    // try { $("#" + id + "").html(s); } catch (e) { $("#" + id + "").val(s); }
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

var fjgridStore = Ext.create('Ext.data.Store',
    {
        id: 'fjgridStore',
        autoLoad: true,
        fields: ['V_MATERIALCODE', 'V_MATERIALNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'zdh/PRO_PM_WORKORDER_SPARE_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                V_V_ORDERGUID: V_ORDERGUID
            }
        }
    });

var fjgrid = Ext.create('Ext.grid.Panel', {
    id: 'fjgrid',
    flex: 1,
    // height : window.screen.height/2-50,
    height: 300,
    store: 'fjgridStore',
    columnLines: true,
    selType: 'checkboxmodel',
    multiSelect: true,
    autoScroll: true,
    width: window.screen.width / 2 - 50,
    columns: [
        {
            text: '序号',
            xtype: 'rownumberer',
            align: 'center',
            width: 40
        },
        {
            text: '物料编码',
            width: 150,
            align: 'center',
            dataIndex: 'V_MATERIALCODE'
        },
        {
            text: '物料描述',
            width: 150,
            align: 'center',
            dataIndex: 'V_MATERIALNAME'
        },
        {
            text: '附件查询',
            width: 80,
            align: 'center',
            renderer : function () {
                return "<img src=" + imgpath + "/add.png>"
            },
            listeners: {
                "click": fileadd
            }
        }]

});

var fjwindow = Ext.create('Ext.window.Window', {
    id : 'fjwindow',
    width : 460,
    height : 300,
    layout : 'border',
    title : '附件添加',
    modal : true,//弹出窗口时后面背景不可编辑
    frame : true,
    closeAction : 'hide',
    closable : true,
    items : [fjgrid],
    buttons : [{
        xtype : 'button',
        text : '取消',
        width : 40,
        handler : function() {
            Ext.getCmp('fjwindow').hide();
        }}]
});

function OrderFile() {
    Ext.data.StoreManager.lookup('fjgridStore').load({
        params : {
            V_V_ORDERGUID : V_ORDERGUID
        }
    });
    Ext.getCmp('fjwindow').show();
}

function fileadd(){
    var seldata = Ext.getCmp('fjgrid').getSelectionModel().getSelection();
    var owidth = window.document.body.offsetWidth-200;
    var oheight = window.document.body.offsetHeight-100 ;
    var ret = window.open(AppUrl+'page/PM_050902/index.html?V_ORDERGUID=' + V_ORDERGUID +  '&V_MATERIALGUID=' + seldata[0].data.V_MATERIALCODE + '', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

}

function loadOther(){
    Ext.Ajax.request({
        url : AppUrl + 'zdh/PRO_WX_WORKORDER_OTHER_SEL',
        type: 'post',
        params: {
            V_V_ORDERGUID: V_ORDERGUID
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if (resp.list != null && resp.list != "") {
                $("#D_DATE_ACP").html(resp.list[0].D_DATE_ACP);
                $("#D_DATE_OVERDUE").html(resp.list[0].I_OTHERHOUR);
                $("#V_REASON_OVERDUE").html(resp.list[0].V_OTHERREASON);
                $("#V_FIX_EXPLAIN").html(resp.list[0].V_REPAIRCONTENT);
                $("#V_REPAIRPERSON").html(resp.list[0].V_REPAIRPERSON);
                $("#V_CHECKMANSIGN").html(resp.list[0].V_CHECKMANSIGN);
            }
        }
    });
}
