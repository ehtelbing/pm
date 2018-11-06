var V_TEAMCODE = null;

$(function () {


    bindDate("D_START_DATE");
    bindDate("D_FINISH_DATE");

    NowDate_b("D_START_DATE");
    NowDate_e("D_FINISH_DATE");

    NowDate2("D_ENTER_DATE");

    $("#V_ENTERED_BY").html(Ext.util.Cookies.get('v_personname2'));

    loadDeptList();
    loadPlantList();

    CreateOrderGUID();

    $("#V_ORDER_TYP").html($("#V_ORDER_TYP_TXT").val());

    loadRepairList();

    loadTaskGrid();

    loadMatList();

    loadTeam();
    //$("#V_ORGNAME").change(function () { loadDeptList();  CreateOrderGUID(); loadTaskGrid();  loadMatList(); });
    $("#V_DEPTNAME").change(function () {  CreateOrderGUID(); loadTaskGrid(); loadMatList(); });
    $("#V_ORDER_TYP_TXT").change(function () { $("#V_ORDER_TYP").html($("#V_ORDER_TYP_TXT").val()); });

    $("#btnTask").click(function () {
        //var ret = window.showModalDialog(AppUrl+'/PM_050101/Index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val() + '&V_DEPTREPAIRCODE=' + $("#V_DEPTNAMEREPARIR").val() + '', '', 'dialogHeight:500px;dialogWidth:800px');

        var owidth = window.document.body.offsetWidth-200;
        var oheight = window.document.body.offsetHeight-100 ;
        var ret = window.open(AppUrl+'page/PM_050101/index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val() +  '&V_DEPTREPAIRCODE=' + $("#V_DEPTNAMEREPARIR").val() + '', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
        loadTaskGrid();
    });

    $("#V_EQUIP_NAME").click(function () {
        var owidth = window.document.body.offsetWidth-200;
        var oheight = window.document.body.offsetHeight-100 ;
        var ret = window.open(AppUrl+'page/No410601/Index.html?DEPTCODE=' + $("#V_DEPTNAME").val() + '', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
    });
});

function getEquipReturnValue(ret){
    var str = [];
    str = ret.split('^');
    $("#V_EQUIP_NAME").val(str[1]);
    $("#V_EQUIP_NO").val(str[0]);
    $("#V_FUNC_LOC").val(str[2]);
}

function getPersonReturnValue(retdata) {
    if (retdata != undefined) {
        for (var i = 0; i < retdata.length; i++) {
            if (agridStore.findExact('V_PERSONCODE', retdata[i].data.V_PERSONCODE) == -1) {
                agridStore.add(retdata[i].data);
            }
        }
    }
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
        url: AppUrl + 'zdh/pertoplan_sel',
        method: 'POST',
        async: false,
        params: {
            V_V_DEPTCODE: $("#V_DEPTNAME").val().substr(0,4)
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
        url: AppUrl + 'zdh/pertodept_sel',
        method: 'POST',
        async: false,
        params: {
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode')
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
    $("<option value=\"" + Ext.util.Cookies.get('v_deptcode') + "\">" + decodeURI(Ext.util.Cookies.get('v_deptname')) + "</option>").appendTo("#V_DEPTNAMEREPARIR");
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
               V_V_ORDERGUID: $("#V_ORDERGUID").val()
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
                var ret = window.open(AppUrl+'page/PM_050102/index.html?flag=all&V_ORDERGUID=' + $("#V_ORDERGUID").val() +'', '','_blank',  'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
                loadMatList();
            }
        }
    });
}

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

function CreateOrder(){
    OrderSave();
    CreateOrder1();
}
function OrderSave() {
    Ext.Ajax.request({
        url : AppUrl + 'zdh/PRO_WX_WORKORDER_OTHER_SAVE',
        type: 'post',
        params: {
            V_V_ORDERGUID: $("#V_ORDERGUID").val(),
            D_DATE_ACP:  "",
            D_DATE_OVERDUE: $("#D_DATE_OVERDUE").val(),
            V_REASON_OVERDUE: $("#V_REASON_OVERDUE").val(),
            V_FIX_EXPLAIN:  $("#V_FIX_EXPLAIN").val()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
        }
    });
}

function orderaccept1(){
    var flag=1;
    Ext.Ajax.request({
        url : AppUrl + 'zdh/PRO_PM_WORKORDER_SPARE_VIEW',
        type: 'post',
        params: {
            V_V_ORDERGUID: $("#V_ORDERGUID").val()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if (resp.list == null || resp.list == "") {
                CreateOrder1();
            }
            else{
                var temp=0;
                var number = 0;
                for(var i=0;i<resp.list.length;i++){
                    Ext.Ajax.request({
                        url : AppUrl + 'zdh/WX_INF_FILE_SEL',
                        type: 'post',
                        params: {
                            V_V_ORDERGUID : $("#V_ORDERGUID").val(),
                            V_V_MATERIALGUID : resp.list[i].V_MATERIALCODE,
                            V_V_FILENAME : '%'
                        },
                        success: function (ret) {
                            number++;
                            var resp1 = Ext.JSON.decode(ret.responseText);
                            if (resp1.list != null && resp1.list != "") {
                                temp++;
                            }
                            if(number == i){
                                if(temp == i){
                                    CreateOrder1();
                                }
                                else{
                                    alert("每个物料需要上传至少一张图片,请检查您上传的文件!");
                                }
                            }
                        }
                    });
                }
            }
        }
    });
    window.close();
}

function CreateOrder1() {
    if ($("#V_EQUIP_NAME").val() == "全部") {
        alert("目前设备不能选择全部！");
        return false;
    }
    if ($("#V_EQUIP_NAME").val() == "" || $("#V_EQUIP_NAME").val() == null) {alert("请先选择设备");} else {
        if($("#V_SHORT_TXT").val()==""|| $("#V_EQUIP_NAME").val() == null){alert('工单描述不能为空,请重新输入！');}else{

            if(!confirm("是否下达工单?")){return false;}else{

                Ext.Ajax.request({
                    url : AppUrl + 'zdh/save_workorder',
                    type: 'POST',
                    async: false,
                    params: {
                        V_V_PERCODE :   Ext.util.Cookies.get("v_personcode"),
                        V_V_PERNAME :   Ext.util.Cookies.get("v_personname2"),
                        V_V_ORDERGUID :  $("#V_ORDERGUID").val(),
                        V_V_SHORT_TXT : $("#V_SHORT_TXT").val(),
                        V_V_FUNC_LOC :   $("#V_FUNC_LOC").val(),
                        V_V_EQUIP_NO : $("#V_EQUIP_NO").val(),
                        V_V_EQUIP_NAME : $("#V_EQUIP_NAME").val(),
                        V_D_START_DATE :   $("#D_START_DATE").val(),
                        V_D_FINISH_DATE :  $("#D_FINISH_DATE").val(),
                        V_V_WBS : $("#V_WBS").val(),
                        V_V_WBS_TXT :  $("#V_WBS_TXT").val(),
                        V_V_DEPTCODEREPARIR : $("#V_DEPTNAMEREPARIR").val(),
                        V_V_TOOL :   $("#tool").val(),
                        V_V_TECHNOLOGY : $("#V_TECHNOLOGY").val(),
                        V_V_SAFE : $("#V_SAFE").val()
                    },
                    success: function (ret) {
                        var resp = Ext.JSON.decode(ret.responseText);
                        alert("工单下达"+resp.list[0].V_INFO+",工单号为:"+$("#V_ORDERID").html());
                        orderissued();
                    }
                });
            }
        }
    }
}

function orderissued(){
    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: AppUrl + 'mm/SetMat',
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

var wingridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'wingridStore',
    pageSize: 100,
    fields: ['V_CLASS_CODE', 'V_CLASS_NAME', 'V_DEPTNAME', 'V_SAP_WORKNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'zdh/team_sel',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var windowgrid = Ext.create("Ext.grid.Panel", {
    xtype: 'gridpanel',
    id: 'windowgrid',
    region: 'center',
    columnLines: true,
    width: '100%',
    store: wingridStore,
    autoScroll: true,
    selModel: {      //复选框
        selType: 'checkboxmodel'
    },
    columns: [{
        text: '班组编号 ',
        dataIndex: 'V_CLASS_CODE',
        align: 'center',
        width: 280,
        hidden : true
    }, {
        text: '班组名称',
        dataIndex: 'V_CLASS_NAME',
        align: 'center',
        labelAlign: 'right',
        width: 150
    }, {
        text: '作业区',
        dataIndex: 'V_DEPTNAME',
        align: 'center',
        width: 150
    }],
    bbar: ['->', {
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        displayInfo: true,
        displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
        emptyMsg: '没有记录',
        store: 'wingridStore'
    }]
});

var teamwindow = Ext.create('Ext.window.Window', {
    id: 'teamwindow',
    width: 600,
    height: 400,
    layout: 'border',
    title: '班组选择',
    modal: true,//弹出窗口时后面背景不可编辑
    frame: true,
    closeAction: 'hide',
    closable: true,
    items: [windowgrid],
    buttons: [{
        xtype: 'button',
        text: '确定',
        width: 40,
        handler: function () {
            teamconfirm();
        }
    }, {
        xtype: 'button',
        text: '取消',
        width: 40,
        handler: function () {
            Ext.getCmp('teamwindow').hide();
        }
    }]
});

function teamconfirm() {
    var winseldata = Ext.getCmp('windowgrid').getSelectionModel().getSelection();
    V_TEAMCODE = winseldata[0].data.V_CLASS_CODE;
    Ext.Ajax.request({
        url: AppUrl + 'zdh/send_team',
        method: 'POST',
        async: false,
        params: {
            V_V_TEAMCODE: winseldata[0].data.V_CLASS_CODE,
            V_V_ORDERGUID: $("#V_ORDERGUID").val()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
        }
    });
    Ext.getCmp('teamwindow').hide();
    loadTeam(V_TEAMCODE);
}

function windowquery() {
    Ext.data.StoreManager.lookup('wingridStore').load(
        {
            params: {
                IN_DEPARTCODE: $('#V_DEPTNAMEREPARIR').val(),
                IN_CLASSNAME: ""
            }
        });
}

function selectTeam(){
    windowquery();
    Ext.getCmp('teamwindow').show();
}

var workCenterStore = Ext.create('Ext.data.Store', {
    id: 'workCenterStore',
    autoLoad: false,
    fields: ['V_SAP_WORKNAME', 'V_SAP_WORK'],
    proxy: {
        type: 'ajax',
        url: AppUrl + 'zdh/workCenter_sel',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var agridStore = Ext.create('Ext.data.Store',{
    autoLoad: false,
    storeId: 'agridStore',
    fields: ['V_PERSONCODE', 'V_PERSONNAME'],
    proxy: {
        type: 'memory',
        render: {
            type: 'json'
        }
    }
});

var agrid = Ext.create('Ext.grid.Panel', {
    id: 'agrid',
    region: 'center',
    columnLines: true,
    width: '100%',
    store: 'agridStore',
    autoScroll: true,
    height: '100%',
    columns: [{
        text: '人员编号 ',
        dataIndex: 'V_PERSONCODE',
        align: 'center',
        width: '45%'
    }, {
        text: '人员名称',
        dataIndex: 'V_PERSONNAME',
        align: 'center',
        labelAlign: 'right',
        width: '45%'
    }, {
        align: 'center',
        width: '10%',
        text: '删除',
        xtype: 'templatecolumn',
        tpl: '<a style="cursor:pointer"><img src="'
        + imgpath + '/delete1.png"></a>',
        listeners: {
            "click": todel
        }
    }],
    dockedItems: [{
        xtype: 'panel',
        layout: 'column',
        frame: true,
        baseCls: 'my-panel-noborder',
        width: '100%',
        items: [{
            xtype: 'textfield', //输入框
            id: 'addmzmc',
            fieldLabel: '班组名称',
            labelWidth: 80,
            labelAlign: 'right',
            style: ' margin: 5px 0px 5px 0px',
            emptyText: '请输入班组名称'
        }, {
            xtype: 'combo',
            id: 'addgzzx',
            store: 'workCenterStore',
            labelAlign: 'right',
            fieldLabel: '工作中心 ',
            editable: false,
            labelWidth: 80,
            style: ' margin: 5px 0px 5px 0px',
            queryMode: 'local',
            valueField: 'V_SAP_WORK',
            displayField: 'V_SAP_WORKNAME'
        }, {
            xtype: 'button',
            text: '人员查找',
            icon: imgpath + '/search.png',
            width: 90,
            handler: p_query,
            style: ' margin: 5px 0px 5px 10px'
        }]
    }]
});

var awindow = Ext.create('Ext.window.Window', {
    id: 'awindow',
    width: 600,
    height: 400,
    layout: 'border',
    title: '班组选择',
    modal: true,//弹出窗口时后面背景不可编辑
    frame: true,
    closeAction: 'hide',
    closable: true,
    items: [agrid],
    buttons: [{
        xtype: 'button',
        text: '确定',
        width: 40,
        handler: function () {
            saved_btn();
        }
    }, {
        xtype: 'button',
        text: '取消',
        width: 40,
        handler: function () {
            Ext.getCmp('awindow').hide();
        }
    }]
});

function todel(view, item, colIndex, rowIndex, e) {
    agridStore.remove(agridStore.data.items[colIndex]);
}

function p_query() {

    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/Basic/addperson.html?depart='+$('#V_DEPTNAMEREPARIR').val()+'&classcode='+V_TEAMCODE+'&V_ORDERGUID='+$("#V_ORDERGUID").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}

function perwindowquery() {
    agridStore.removeAll();
    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: AppUrl + 'zdh/teamedit_sel',
        params: {
            IN_CLASSCODE: V_TEAMCODE
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            Ext.getCmp('addmzmc').setValue(resp.list[0].V_CLASS_NAME);
            Ext.getCmp('addgzzx').setValue(resp.list[0].V_SAP_WORK);
        }
    });
    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: AppUrl + 'zdh/teamdetail_sel',
        params: {
            IN_CLASSCODE: V_TEAMCODE,
            IN_ORDERGUID: $("#V_ORDERGUID").val()
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            Ext.data.StoreManager.lookup('agridStore').loadData(resp.list);
        }
    });
    slecode = V_TEAMCODE;
}

function selectPerson(){
    if(V_TEAMCODE == null){
         alert('请先选择维修班组!')
    }
    else{
        perwindowquery();
        Ext.getCmp('awindow').show();
    }

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
            IN_ORDERGUID: $("#V_ORDERGUID").val()
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

function saved_btn() {
    if (Ext.getCmp('addmzmc').getValue() == '') {
        alert('请填写班组名称！');
        return false;
    }
    var arr = [];
    for (var i = 0; i < agridStore.data.items.length; i++) {
        arr.push(agridStore.data.items[i].data.V_PERSONCODE);
    }
    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: AppUrl + 'zdh/team_edit',
        params: {
            IN_CLASSCODE: slecode,
            IN_DEPARTCODE: $("#V_DEPTNAMEREPARIR").val(),
            IN_CLASSNAME: Ext.getCmp('addmzmc').getValue(),
            IN_WORKCODE: Ext.getCmp('addgzzx').getValue(),
            IN_PERSONCODE: arr.toString(),
            IN_ORDERGUID : $("#V_ORDERGUID").val()
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp[0] == 'SUCCESS') {

            }
        }
    });
    Ext.getCmp('awindow').hide();
    loadTeam(V_TEAMCODE);
}

function OrderFile(V_MATERIALGUID) {
    var owidth = window.document.body.offsetWidth-200;
    var oheight = window.document.body.offsetHeight-100 ;
    var ret = window.open(AppUrl+'page/PM_050901/index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val() +  '&V_MATERIALGUID=' + V_MATERIALGUID + '', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

}