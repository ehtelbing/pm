var V_DEPTREPAIRCODE = null;
var V_TEAMCODE = null;
var I_ID = -1;
var V_ORDERGUID = null;
var V_DBGUID = null;
var V_FLOWSTEP = null;
var taskId = '';
var V_V_ORGCODE = '';
var V_V_DEPTCODE = '';
var V_V_REPAIRCODE = '';
var V_STEPCODE = '';
var processKey = '';
var V_STEPNAME = '';
var V_NEXT_SETP = '';
var wuliaochaxunlist = [];
var ProcessInstanceId = '';
var Assignee = '';
if (location.href.split('?')[1] != undefined) {
    V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
    V_DBGUID = Ext.urlDecode(location.href.split('?')[1]).V_DBGUID;
    V_FLOWSTEP = Ext.urlDecode(location.href.split('?')[1]).V_FLOWSTEP;
    ProcessInstanceId = Ext.urlDecode(location.href.split('?')[1]).ProcessInstanceId;
}
var selectID = [];
$(function () {
    var nextSprStore2 = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'nextSprStore2',
        fields: ['V_PERSONCODE', 'V_PERSONNAME', 'V_V_NEXT_SETP', 'V_V_FLOW_STEPNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PM_ACTIVITI_PROCESS_PER_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        },
        listeners: {
            load: function (store, records, success, eOpts) {
                processKey = store.getProxy().getReader().rawData.RET;
                V_STEPNAME = store.getAt(0).data.V_V_FLOW_STEPNAME;
                V_NEXT_SETP = store.getAt(0).data.V_V_NEXT_SETP;

                Ext.getCmp('nextSpr2').select(store.first());
                var list = Ext.getCmp("nextSpr2").getStore().data.items;
                for (var i = 0; i < list.length; i++) {
                    if (list[i].raw.V_PERSONCODE == Assignee) {
                        Ext.getCmp("nextSpr2").setValue(Assignee);
                    }
                    if (list[i].raw.V_PERSONCODE == Ext.util.Cookies.get('v_personcode')) {
                        Ext.getCmp("nextSpr2").setValue(Ext.util.Cookies.get('v_personcode'));
                    }
                }
            }
        }
    });

    var addInputPanel2 = Ext.create('Ext.form.Panel', {
        id: 'addInputPanel2',
        region: 'center',
        layout: 'vbox',
        frame: true,
        border: false,
        //title : '流程管理',
        baseCls: 'my-panel-no-border',
        items: [
            {
                xtype: 'panel',
                region: 'center',
                layout: 'column',
                border: false,
                frame: true,
                baseCls: 'my-panel-no-border',
                items: [{
                    id: 'nextSpr2',
                    xtype: 'combo',
                    store: nextSprStore2,
                    fieldLabel: '下一步接收人',
                    editable: false,
                    labelWidth: 100,
                    displayField: 'V_PERSONNAME',
                    valueField: 'V_PERSONCODE',
                    queryMode: 'local',
                    style: ' margin: 5px 0px 0px 0px',
                    labelAlign: 'right',
                    width: 250
                }, {
                    xtype: 'button',
                    text: '确定',
                    icon: imgpath + '/saved.png',
                    style: ' margin: 5px 0px 0px 15px',
                    handler: activitiOrderissued
                }]
            }
        ]
    });

    var window2 = Ext.create('Ext.window.Window', {
        id: 'window2',
        width: 370,
        height: 150,
        bodyPadding: 15,
        layout: 'vbox',
        title: '选择下一步接收人',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        items: [addInputPanel2]
    });

    bindDate("D_FACT_START_DATE");
    bindDate("D_FACT_FINISH_DATE");

    NowDate_b("D_FACT_START_DATE");
    NowDate_e("D_FACT_FINISH_DATE");

    loadOrder();


    loadTaskGrid();

    loadMatList();

    loadOther();

    getTaskId();

    getAssignee();
    $("#btnTask").click(function () {

        var owidth = window.document.body.offsetWidth - 200;
        var oheight = window.document.body.offsetHeight - 100;
        window.open(AppUrl + 'page/PM_090510/index.html?V_ORDERGUID=' + V_ORDERGUID + '&V_DEPTREPAIRCODE=' + V_DEPTREPAIRCODE + '&V_TEAMCODE=' + V_TEAMCODE + '', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
    });

    $("#btnGS").click(function () {
        ReturnIsToTask();
    });
//附件查找  //--UPDATE 2019-5-22
    var fileview=Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'fileview',
        fields: ['FILEGUID', 'FILENAME', 'FILETYPECODE', 'FINTIME', 'FINPER','FPAGESIGN'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/WORK_FILE_SELECT',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                V_WOEKGUID: V_ORDERGUID,
                V_PERCODE:Ext.util.Cookies.get("v_personcode")
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var filegrid=Ext.create("Ext.grid.Panel", {
        id: 'filegrid',
        region: 'center',
        height: '100%',
        width: '100%',
        columnLines: true,
        store: fileview,
        autoScroll: true,
        margin: '10px 0px 0px 15px',
        //colspan: 3,
        columns: [{
            text:'附件编码',
            hide:true,
            dataIndex:'FILEGUID'
        },{
            text: '附件名称',
            flex: 0.6,
            width:340,
            id : 'fjname',
            align: 'center',
            dataIndex: "FILENAME"
            //renderer: _downloadRander
        }, {
            text: '操作',
            flex: 0.4,
            width:340,
            align: 'center',
            renderer: _delRander
        }]
    });


    var fileUpwin=Ext.create('Ext.window.Window',{
        id:'fileUpwin',
        title:'附件添加窗口',
        closeAction:'hide',
        layout: 'vbox',
        width: 880,
        height: 400,
        modal: true,
        plain: true,
        bodyPadding: 10,
        items: [{
            xtype: 'form',
            id:'uploadFile',
            region: 'north',
            layout: 'hbox',
            fileUpload:true,
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: "filefield",
                name: 'FIEL',
                id: "FIEL",
                enctype: "multipart/form-data",
                fieldLabel: "上传附件",
                fileUpload: true,
                allowBlank: false,
                labelWidth: 100,
                width: 440,
                labelStyle: 'color:red;font-weight:bold',
                margin: '5px 0px 5px 5px',
                emptyText: '请选择文件',
                buttonText: '浏览',
                invalidText: '文件格式不正确'
            }, {
                id: 'insertFilesFj2',
                xtype: 'button',
                text: '上传',
                style: ' margin: 5px 0px 0px 15px',
                handler: _upLoadFile
            }, {
                xtype: 'hidden',
                name: 'V_WORKGUID',
                id: 'V_WORKGUID'
            }, {
                xtype: 'hidden',
                name: 'V_FILEGUID',
                id: 'V_FILEGUID'
            },  {
                xtype: 'hidden',
                name: 'V_FILENAME',
                id: 'V_FILENAME'
            }, {
                xtype: 'hidden',
                name: 'V_INTIME',
                id: 'V_INTIME'
            }, {
                xtype: 'hidden',
                name: 'V_INPER',
                id: 'V_INPER'
            }, {
                xtype: 'hidden',
                name: 'V_REMARK',
                id: 'V_REMARK'
            }, {
                xtype: 'hidden',
                name: 'V_BLANK',
                id: 'V_BLANK'
            }, {
                xtype: 'hidden',
                name: 'V_FROMPAGE',
                id: 'V_FROMPAGE'
            }

            ]
        } ,{
            columnWidth: 1,
            height: 380,
            width: 800,
            items: filegrid
        }],
        closable: true,
        model: true
    });
});

function getAssignee() {
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/InstanceState',
        method: 'POST',
        async: false,
        params: {
            instanceId: ProcessInstanceId
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            Assignee = resp.list[0].Assignee;
        }
    });
}

function loadOrder() {
    Ext.Ajax.request({
        url: AppUrl + 'zdh/PRO_WX_WORKORDER_GET',
        method: 'POST',
        async: false,
        params: {
            V_V_ORDERGUID: V_ORDERGUID
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if (resp.list != "" && resp.list != null) {
                V_V_ORGCODE = resp.list[0].V_ORGCODE;
                V_V_DEPTCODE = resp.list[0].V_DEPTCODE;
                V_V_REPAIRCODE = resp.list[0].V_DEPTCODEREPARIR;
                $("#V_ORDER_TYP_TXT").html(resp.list[0].V_ORDER_TYP_TXT);
                $("#V_ORGNAME").html(resp.list[0].V_ORGNAME);
                $("#V_DEPTNAME").html(resp.list[0].V_DEPTNAME);
                $("#V_ORDERID").html(resp.list[0].V_ORDERID);
                $("#V_ENTERED_BY").html(resp.list[0].V_PERSONNAME);
                $("#D_ENTER_DATE").html((resp.list[0].D_ENTER_DATE).split('.0')[0]);
                $("#V_EQUIP_NAME").html(resp.list[0].V_EQUIP_NAME);
                $("#V_EQUIP_NO").html(resp.list[0].V_EQUIP_NO);
                $("#V_FUNC_LOC").html(resp.list[0].V_EQUSITENAME);
                $("#V_DEPTNAMEREPARIR").html(resp.list[0].V_DEPTNAMEREPARIR);
                $("#V_SHORT_TXT").html(resp.list[0].V_SHORT_TXT);
                $("#D_START_DATE").html((resp.list[0].D_START_DATE).split('.0')[0]);
                $("#D_FINISH_DATE").html((resp.list[0].D_FINISH_DATE).split('.0')[0]);
                $("#D_FACT_START_DATE").html(resp.list[0].D_FACT_START_DATE);
                var I_OTHERHOUR=""; var V_OTHERREASON="";var V_REPAIRCONTENT="";
                var V_REPAIRSIGN="";var V_REPAIRPERSON="";
                I_OTHERHOUR=resp.list[0].I_OTHERHOUR;
                V_OTHERREASON=resp.list[0].V_OTHERREASON;
                V_REPAIRCONTENT=resp.list[0].V_REPAIRCONTENT;
                V_REPAIRSIGN=resp.list[0].V_REPAIRSIGN;
                V_REPAIRPERSON=resp.list[0].V_REPAIRPERSON;
                $("#I_OTHERHOUR").val(I_OTHERHOUR);
                $("#V_OTHERREASON").val(V_OTHERREASON);
                $("#V_REPAIRCONTENT").val(V_REPAIRCONTENT);
                $("#V_REPAIRSIGN").val(V_REPAIRSIGN);
                $("#V_REPAIRPERSON").val(V_REPAIRPERSON);

                $("#V_WBS").html(resp.list[0].V_WBS);
                $("#V_WBS_TXT").html(resp.list[0].V_WBS_TXT);

                V_TEAMCODE = resp.list[0].V_WXTEAM;
                GetBillMatByOrder();
            }
        }
    });
}

function getEquipReturnValue(ret) {
    var str = [];
    str = ret.split('^');
    $("#V_EQUIP_NAME").val(str[1]);
    $("#V_EQUIP_NO").val(str[0]);
    $("#V_FUNC_LOC").val(str[2]);
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
        url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_OPERATIONS',
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

function OpenEditMat() {
    Ext.Ajax.request({
        url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_ACTIVITY',
        type: "post",
        async: false,
        params: {
            V_V_ORDERGUID: V_ORDERGUID
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            var owidth = window.document.body.offsetWidth - 200;
            var oheight = window.document.body.offsetHeight - 100;
            var ret = window.open(AppUrl + 'page/PM_050102/index.html?flag=all&V_ORDERGUID=' + V_ORDERGUID + '', '', '_blank', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
            loadMatList();
        }
    });
}

$('#btnGJJJ').live('click', function () {
    window.showModalDialog(AppUrl + '/No41070103/Index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val() + '', '41070103', 'dialogHeight:500px;dialogWidth:800px');
});

function loadMatList() {
    Ext.Ajax.request({
        url: AppUrl + 'zdh/PRO_PM_WORKORDER_SPARE_VIEW',
        type: 'post',
        params: {
            V_V_ORDERGUID: V_ORDERGUID
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if (resp.list != null && resp.list != "") {
                $("#TtableM tbody").empty();
                $.each(resp.list, function (index, item) {
                    item["sid"] = index + 1;
                });
                wuliaochaxunlist = resp.list;
                $("#TtableMTemplate").tmpl(resp.list).appendTo("#TtableM tbody");
            } else {
                $("#TtableM tbody").empty();
            }
        }
    });
}

function loadOther() {
    Ext.Ajax.request({
        url: AppUrl + 'zdh/PRO_WX_WORKORDER_OTHER_SEL',
        type: 'post',
        params: {
            V_V_ORDERGUID: V_ORDERGUID
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if (resp.list != null && resp.list != "") {
                //$("#D_DATE_ACP").val(resp.list[0].D_DATE_ACP);
                $("#I_OTHERHOUR").val(resp.list[0].I_OTHERHOUR);
                $("#V_OTHERREASON").val(resp.list[0].V_OTHERREASON);
                $("#V_REPAIRCONTENT").val(resp.list[0].V_REPAIRCONTENT);
                $("#V_REPAIRPERSON").html(resp.list[0].V_REPAIRPERSON);
                $("#V_CHECKMANSIGN").html(resp.list[0].V_CHECKMANSIGN);
            }
        }
    });
}

function accept() {
    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: AppUrl + 'zdh/order_accept',
        params: {
            V_V_ORDERGUID: V_ORDERGUID
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.list[0].V_INFO == 'SUCCESS') {
                alert("验收成功!");
                window.opener.QueryTab();
                window.opener.QuerySum();
                window.opener.QueryGrid();
                window.close();
                window.opener.gridquery();
            }
        }
    });
}

function OrderSave() {
    Ext.Ajax.request({
        url: AppUrl + 'zdh/PRO_WX_WORKORDER_OTHER_SAVE',
        type: 'post',
        params: {
            V_V_ORDERGUID: V_ORDERGUID,
            D_DATE_ACP: "",
            D_DATE_OVERDUE: $("#I_OTHERHOUR").val(),
            V_REASON_OVERDUE: $("#V_OTHERREASON").val(),
            V_FIX_EXPLAIN: $("#V_REPAIRCONTENT").val()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
        }
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
            renderer: function () {
                return "<img src=" + imgpath + "/add.png>"
            },
            listeners: {
                "click": fileadd
            }
        }]
});

var fjwindow = Ext.create('Ext.window.Window', {
    id: 'fjwindow',
    width: 460,
    height: 300,
    layout: 'border',
    title: '附件查询',
    modal: true,//弹出窗口时后面背景不可编辑
    frame: true,
    closeAction: 'hide',
    closable: true,
    items: [fjgrid],
    buttons: [{
        xtype: 'button',
        text: '取消',
        width: 40,
        handler: function () {
            Ext.getCmp('fjwindow').hide();
        }
    }]
});

function OrderFile() {
    Ext.data.StoreManager.lookup('fjgridStore').load({
        params: {
            V_V_ORDERGUID: V_ORDERGUID
        }
    });
    Ext.getCmp('fjwindow').show();
}

function OrderFile1(V_MATERIALGUID) {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_050901/index.html?V_ORDERGUID=' + V_ORDERGUID + '&V_MATERIALGUID=' + V_MATERIALGUID + '', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

}

function fileadd() {
    var seldata = Ext.getCmp('fjgrid').getSelectionModel().getSelection();
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_050902/index.html?V_ORDERGUID=' + V_ORDERGUID + '&V_MATERIALGUID=' + seldata[0].data.V_MATERIALCODE + '', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

}

function GetModel() {
    if ($("#V_EQUIP_NO").val() == "" || $("#V_EQUIP_NO").val() == null) {
        alert("请先选择设备!");
    } else {
        var ret = window.showModalDialog(AppUrl + '/No41070106/Index.html?V_EQUIP_NO=' + $("#V_EQUIP_NO").val() + '&V_ORDERGUID=' + $('#V_ORDERGUID').val() + '&V_DEPTREPAIRCODE=' + $('#V_DEPTNAMEREPARIR').val() + '', '', 'dialogHeight:500px;dialogWidth:800px');
        //loadTaskGrid();
        //loadToolAndTxtList();
        //loadMatList();
    }
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
    s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " 08:30:00";

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
    s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " 16:30:00";

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
    s = year + "-" + dateFomate(month) + "-" + dateFomate(date);
    // try { $("#" + id + "").html(s); } catch (e) { $("#" + id + "").val(s); }
    $("#" + id + "").html(s);
}

function dateFomate(val) {
    if (parseInt(val) <= 9) {
        return "0" + val;
    } else {
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
        controlType: 'select'
    });
}

var agridStore = Ext.create('Ext.data.Store', {
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

function orderonPrint() {
    selectID.push(V_ORDERGUID);
    window.open(AppUrl + "page/No410101/indexn.html", selectID,
        "dialogHeight:700px;dialogWidth:1100px");
}

function print() {
    selectID.push(V_ORDERGUID);
    window.open(AppUrl + "page/No410101/indexn.html", selectID,
        "dialogHeight:700px;dialogWidth:1100px");
}

function todel(view, item, colIndex, rowIndex, e) {
    agridStore.remove(agridStore.data.items[colIndex]);
}

function _preOrderissued() {
    var nextSprStore2 = Ext.data.StoreManager.lookup('nextSprStore2');
    nextSprStore2.proxy.extraParams = {
        V_V_ORGCODE: V_V_ORGCODE,
        V_V_DEPTCODE: V_V_DEPTCODE,
        V_V_REPAIRCODE: V_V_REPAIRCODE,
        V_V_FLOWTYPE: 'WORK',
        V_V_FLOW_STEP: $.url().param("TaskDefinitionKey"),
        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_SPECIALTY: '%',
        V_V_WHERE: '已反馈'
    };
    nextSprStore2.currentPage = 1;
    nextSprStore2.load();
    Ext.getCmp('window2').show();
}

function activitiOrderissued() {
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/TaskComplete',
        type: 'ajax',
        method: 'POST',
        params: {
            taskId: taskId,
            idea: '已反馈',
            parName: [V_NEXT_SETP, "flow_yj"],
            parVal: [Ext.getCmp('nextSpr2').getValue(), '已反馈'],
            processKey: processKey,
            businessKey: $.url().param("V_ORDERGUID"),
            V_STEPCODE: V_STEPCODE,
            V_STEPNAME: V_STEPNAME,
            V_IDEA: '已反馈',
            V_NEXTPER: Ext.getCmp('nextSpr2').getValue(),
            V_INPER: Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            Ext.getCmp('window2').hide();
            orderissued();
        },
        failure: function (response) {//访问到后台时执行的方法。
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            })
        }
    })
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

function orderissued() {
    $.ajax({
        url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_DYJS',
        type: 'post',
        async: false,
        data: {
            V_V_PERCODE: $.cookies.get('v_personcode'),
            V_V_PERNAME: Ext.util.Cookies.get("v_personname2"),
            V_V_ORDERGUID: $.url().param("V_ORDERGUID"),
            V_D_FACT_START_DATE: $("#D_FACT_START_DATE").val().split(".")[0],
            V_D_FACT_FINISH_DATE: $("#D_FACT_FINISH_DATE").val().split(".")[0],
            V_I_OTHERHOUR: $("#I_OTHERHOUR").val(),
            V_V_OTHERREASON: $("#V_OTHERREASON").val(),
            V_V_REPAIRCONTENT: $("#V_REPAIRCONTENT").val(),
            V_V_REPAIRSIGN: $("#V_REPAIRSIGN").val(),
            V_V_REPAIRPERSON: $("#V_REPAIRPERSON").val(),
            V_V_TOOL: ' '
        },
        dataType: "json",
        traditional: true,
        success: function (resp) {
            if (resp.V_INFO == '成功') {
                window.returnValue = 'yes';
                Ext.Ajax.request({//获取所选缺陷GUID
                    url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SELBYWORK',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_WORKORDER_GUID: $.url().param("V_ORDERGUID"),
                        V_V_FLAG: '1'
                    },
                    success: function (resp) {
                        var respguid = Ext.decode(resp.responseText);
                    }
                });
                window.opener.QueryTab();
                window.opener.QuerySum();
                window.opener.QueryGrid();
                window.close();
                window.opener.OnPageLoad();
            } else {
                Ext.example.msg('操作信息', '操作失败');
            }
        }
    });
}

function GetBillMatByOrder() {
    Ext.Ajax.request({
        url: AppUrl + 'mm/WS_EquipGetBillMaterialByOrderService',
        method: 'POST',
        async: false,
        params: {
            V_V_ORDERGUID: V_ORDERGUID,
            V_V_ORDERID: $("#V_ORDERID").html(),
            x_personcode: Ext.util.Cookies.get('v_personcode')
        },
        success: function (resp) {
        }
    });
}

function closeWin() {
    window.close();
    window.opener.OnPageLoad();
    window.opener.QueryGrid();
}

function getTaskId() {
    $.ajax({//获取taskId
        url: AppUrl + 'Activiti/GetTaskIdFromBusinessId',
        type: 'post',
        async: false,
        data: {
            businessKey: $.url().param("V_ORDERGUID"),
            userCode: Ext.util.Cookies.get('v_personcode')
        },
        success: function (resp) {
            taskId = resp.taskId;
            V_STEPCODE = resp.TaskDefinitionKey;
        }
    });
}

function ReturnIsToTask() {
    $.ajax({
        url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_ACTIVITY',
        type: 'post',
        async: false,
        data: {
            V_V_ORDERGUID: $.url().param("V_ORDERGUID")
        },
        dataType: "json",
        traditional: true,
        success: function (resp) {
            if (resp.list == "" || resp.list == null) {
                alert("请先添加工序");
            } else {
                window.open(AppUrl
                    + 'page/No41020102/Index.html?V_ORDERGUID='
                    + $.url().param("V_ORDERGUID") + '&V_DEPTCODEREPARIR='
                    + V_V_REPAIRCODE + '', '',
                    'dialogHeight:500px;dialogWidth:800px');
                loadTaskGrid();
            }
        }
    });
}

function ConfirmAccept() {
    if ($("#D_FACT_START_DATE").val() == "") {
        Ext.MessageBox.alert('提示', '请输入实际开始时间');
        return;
    }

    if ($("#D_FACT_FINISH_DATE").val() == "") {
        Ext.MessageBox.alert('提示', '请输入实际结束时间');
        return;
    }

    Ext.Ajax.request({
        url: AppUrl + 'Activiti/TaskComplete',
        type: 'ajax',
        method: 'POST',
        params: {
            taskId: taskId,
            idea: '已反馈',
            parName: [V_NEXT_SETP, "flow_yj"],
            parVal: [Ext.getCmp('nextSprb').getValue(), '已反馈'],
            processKey: processKey,
            businessKey: $.url().param("V_ORDERGUID"),
            V_STEPCODE: V_STEPCODE,
            V_STEPNAME: V_STEPNAME,
            V_IDEA: '请审批！',
            V_NEXTPER: Ext.getCmp('nextSprb').getValue(),
            V_INPER: Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            $.ajax({
                url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_JS_N',
                type: 'post',
                async: false,
                data: {
                    V_V_PERCODE: $.cookies.get('v_personcode'),
                    V_V_PERNAME: Ext.util.Cookies.get("v_personname2"),
                    V_V_ORDERGUID: $.url().param("V_ORDERGUID"),
                    V_D_FACT_START_DATE: $("#D_FACT_START_DATE").val().split(".")[0],
                    V_D_FACT_FINISH_DATE: $("#D_FACT_FINISH_DATE").val().split(".")[0],

                    V_I_OTHERHOUR: $("#I_OTHERHOUR").val(),
                    V_V_OTHERREASON: $("#V_OTHERREASON").val(),
                    V_V_REPAIRCONTENT: $("#V_REPAIRCONTENT").val(),
                    V_V_REPAIRSIGN: $("#V_REPAIRSIGN").val(),
                    V_V_REPAIRPERSON: $("#V_REPAIRPERSON").val(),
                    V_V_TOOL: ' '
                },
                dataType: "json",
                traditional: true,
                success: function (resp) {
                    if (resp.V_INFO == '成功') {
                        window.returnValue = 'yes';
                        Ext.Ajax.request({//获取所选缺陷GUID
                            url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SELBYWORK',
                            method: 'POST',
                            async: false,
                            params: {
                                V_V_WORKORDER_GUID: $.url().param("V_ORDERGUID"),
                                V_V_FLAG: '1'
                            },
                            success: function (resp) {
                                var respguid = Ext.decode(resp.responseText);
                            }
                        });
                        window.opener.QueryTab();
                        window.opener.QuerySum();
                        window.opener.QueryGrid();
                        window.close();
                        window.opener.OnPageLoad();
                    } else {
                        Ext.example.msg('操作信息', '操作失败');
                    }
                }
            });
        },
        failure: function (response) {//访问到后台时执行的方法。
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            })
        }
    })
}
//附件上传
function _fjsc(){
    Ext.data.StoreManager.lookup("fileview").load();
    Ext.getCmp("fileUpwin").show();
}
function _delRander(a, value, metaData) {
    return '<a href="javascript:onDel(\'' + metaData.data.FILEGUID + '\')">删除</a>';
}
function onDel(fileguid) {
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/WORK_FILE_DEL',
        method: 'POST',
        async: false,
        params: {
            V_WORKGUID:V_ORDERGUID,
            V_FILEGUID: fileguid
        },
        success: function (response) {
            var data = Ext.JSON.decode(response.responseText);

            if (data.RET == 'SUCCESS') {
                Ext.Msg.alert('成功', '删除附件成功');
                filequery(V_ORDERGUID);
            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: data.message,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        },
        failure: function (resp) {
            Ext.Msg.alert('提示信息', '删除失败');
        }
    });
}
function _upLoadFile() {
    var uploadFile = Ext.getCmp('uploadFile');
    var V_FIEL = Ext.getCmp('FIEL').getSubmitValue();
    var V_V_FILENAME = V_FIEL.substring(0, V_FIEL.indexOf('.'));

    Ext.getCmp('V_WORKGUID').setValue(V_ORDERGUID);
    Ext.getCmp('FIEL').setValue(V_FIEL);
    Ext.getCmp('V_FILENAME').setValue(V_V_FILENAME);
    //  Ext.getCmp('V_TYPE').setValue(V_TYPE);
    Ext.getCmp('V_INTIME').setValue(Ext.Date.format(new Date(),'Y/m/d'));
    // Ext.getCmp('V_INPER').setValue(Ext.util.Cookies.get('v_deptcode'));
    Ext.getCmp('V_INPER').setValue(Ext.util.Cookies.get('v_personcode'));
    Ext.getCmp('V_REMARK').setValue("");
    Ext.getCmp('V_BLANK').setValue("");
    Ext.getCmp('V_FROMPAGE').setValue(decodeURI(Ext.util.Cookies.get("v_orgname"))+document.title);

    //if(uploadFile.form.isValid()){
    if (Ext.getCmp('FIEL').getValue() == '') {
        Ext.Msg.alert('错误', '请选择你要上传的文件');
        return;
    }
    Ext.MessageBox.show({
        title: '请等待',
        msg: '文件正在上传...',
        progressText: '',
        width: 300,
        progress: true,
        closable: false,
        animEl: 'loding'

    });

    uploadFile.getForm().submit({
        url: AppUrl + 'dxfile/WORK_FILE_INSERT',
        method: 'POST',
        async: false,
        waitMsg: '上传中...',
        success: function (form, action) {
            var massage = action.result.message;
            if (massage == "{RET=SUCCESS}") {
                Ext.Msg.alert('成功', '上传成功');
                filequery(V_ORDERGUID);
            }
        },
        failure: function (resp) {
            Ext.Msg.alert('错误', '上传失败');
        }

    });
}
function filequery(V_ORDERGUID) {
    Ext.data.StoreManager.lookup('fileview').load({
        params: {
            V_WOEKGUID: V_ORDERGUID,
            V_PERCODE:Ext.util.Cookies.get("v_personcode")
        }
    });
}