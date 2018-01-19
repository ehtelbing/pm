var selectID = [];
var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_PLANT = "";
var V_V_DEPT = "";
var V_DEPTCODEREPARIR = '';
var V_DEPTCODE = '';
var V_STEPNAME = '';
var V_STEPCODE ='';
var V_NEXT_SETP = '';
var V_PERSONNAME= '';
var taskId = '';
var wuliaochaxunlist=[];
var V_FUNC_LOC='';
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_V_PLANT == undefined) ? V_V_PLANT = '' : V_V_PLANT = parameters.V_V_PLANT;
    (parameters.V_V_DEPT == undefined) ? V_V_DEPT = '' : V_V_DEPT = parameters.V_V_DEPT;
}

Ext.onReady(function () {


    var fileGridStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'fileGridStore',
        pageSize: 20,
        fields: ['V_V_GUID', 'V_V_FILETYPECODE', 'V_FILEGUID', 'V_FILENAME', 'V_PERSON', 'V_FINDTIME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_14/PRO_BASE_FILE_SEL',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                'V_V_FILETYPECODE': 'SBGZ'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var addPanel = Ext.create('Ext.form.FormPanel', {
        border: false,
        frame: true,
        id: 'addPanel',
        region: 'center',
        //title: '<div align="center"></div>',
        width: '100%',
        height: 100,
        bodyPadding: 10,
        fileUpload: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'filefield',
                id: 'V_V_FILEBLOB',
                name: 'V_V_FILEBLOB',
                enctype: "multipart/form-data",
                fieldLabel: '上传附件',
                labelWidth: 80,
                labelAlign: 'right',
                inputWidth: 262,
                style: ' margin: 5px 0px 0px -8px',
                buttonText: '选择文件',
                allowBlank: false
            }, {
                id: 'insertFilesFj',
                xtype: 'button',
                text: '上传',
                style: ' margin: 5px 0px 0px 5px',
                handler: _upLoadFile
            }, {
                xtype: 'hidden',
                name: 'V_V_GUID',
                id: 'V_V_GUID'
            }, {
                xtype: 'hidden',
                name: 'V_V_FILENAME',
                id: 'V_V_FILENAME'
            }, {
                xtype: 'hidden',
                name: 'V_V_FILETYPECODE',
                id: 'V_V_FILETYPECODE'
            }, {
                xtype: 'hidden',
                name: 'V_V_PLANT',
                id: 'V_V_PLANT'
            }, {
                xtype: 'hidden',
                name: 'V_V_DEPT',
                id: 'V_V_DEPT'
            }, {
                xtype: 'hidden',
                name: 'V_V_PERSON',
                id: 'V_V_PERSON'
            }, {
                xtype: 'hidden',
                name: 'V_V_REMARK',
                id: 'V_V_REMARK'
            }

            ]
        }]
    });

    var filegridPanel = Ext.create("Ext.grid.Panel", {
        id: 'filegridPanel',
        region: 'center',
        height: 200,
        width: '100%',
        columnLines: true,
        store: fileGridStore,
        autoScroll: true,
        // margin: '10px 0 0 125px',
        //colspan: 3,
        columns: [{
            text: '附件名称',
            flex: 0.7,
            id: 'fjname',
            align: 'center',
            dataIndex: "V_FILENAME",
            renderer: _downloadRander
        }, {
            text: '操作',
            flex: 0.3,
            align: 'center',
            renderer: _delRander
        }]
    });

    var addFaultWindow = Ext.create('Ext.window.Window', {
        id: 'addFaultWindow',
        title: "",
        layout: 'column',
        width: 600,
        height: 400,
        modal: true,
        plain: true,
        bodyPadding: 15,
        items: [{
            columnWidth: 1,
            items: addPanel,
            height: 100,
            width: 600
        }, {
            columnWidth: 1,
            height: '85%',
            width: '100%',
            items: filegridPanel
        }],
        buttons: [{
            text: '关闭',
            handler: _hideFault,
            width: 50
        }],
        closable: true,
        closeAction: 'close',
        model: true
    });

})

$(function () {
    bindDate("D_FACT_START_DATE");
    bindDate("D_FACT_FINISH_DATE");

    //bindDate("D_DATE_ACP");

    bindDate("D_ENTER_DATE");
    NowDate2("D_ENTER_DATE");

    NowDate_b("D_FACT_START_DATE");
    NowDate_e("D_FACT_FINISH_DATE");

    NowDate_e("D_DATE_ACP");


    loadPageInfo();

    loadTaskGrid();

    loadPlantlist();

    GetBillMatByOrder();

    loadMatList();

    loadSPR();

    $("#btnTask").click(function () {
        ReturnIsToTask();
    });
   // Ext.getBody().unmask();//去除页面笼罩
});

function onClickSave() {
    if ($("#D_FACT_START_DATE").val() == "") {
        alert('请输入完成开始时间');
        return;
    }
    if ($("#D_FACT_FINISH_DATE").val() == "") {
        alert('请输入完成结束时间');
        return;
    }
    $.ajax({
        url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_EDIT',
        type: 'post',
        async: false,
        data: {

            V_V_PERCODE: $.cookies.get('v_personcode'),
            V_V_PERNAME: Ext.util.Cookies.get("v_personname2"),
            V_V_ORDERGUID: $("#V_ORDERGUID").val(),
            V_V_SHORT_TXT: $("#V_SHORT_TXT").val(),
            V_V_FUNC_LOC: V_FUNC_LOC,//$("#V_FUNC_LOC").html(),

            V_V_EQUIP_NO: $("#V_EQUIP_NO").html(),
            V_V_EQUIP_NAME: $("#V_EQUIP_NAME").html(),
            V_D_FACT_START_DATE: $("#D_FACT_START_DATE").val(),
            V_D_FACT_FINISH_DATE: $("#D_FACT_FINISH_DATE").val(),
            V_V_WBS: '',

            V_V_WBS_TXT: '',
            V_V_DEPTCODEREPARIR: $("#selPlant").val(),
            V_V_TOOL: ' ',

            V_V_TECHNOLOGY: ' ',
            V_V_SAFE: ' ',

            V_D_DATE_ACP: $("#D_DATE_ACP").html(),
            V_I_OTHERHOUR: $("#I_OTHERHOUR").val(),
            V_V_OTHERREASON: $("#V_OTHERREASON").val(),
            V_V_REPAIRCONTENT: $("#V_REPAIRCONTENT").val(),
            V_V_REPAIRSIGN: $("#V_REPAIRSIGN").val(),


            V_V_REPAIRPERSON: $("#V_REPAIRPERSON").val(),
            V_V_POSTMANSIGN: $("#V_POSTMANSIGN").html(),
            V_V_CHECKMANCONTENT: $("#V_CHECKMANCONTENT").html(),
            V_V_CHECKMANSIGN: $("#V_CHECKMANSIGN").html(),
            V_V_WORKSHOPCONTENT: $("#V_WORKSHOPCONTENT").html(),

            V_V_WORKSHOPSIGN: $("#V_WORKSHOPSIGN").html(),
            V_V_DEPTSIGN: $("#V_DEPTSIGN").html()

        },
        dataType: "json",
        traditional: true,
        success: function (resp) {

            alert(resp.V_INFO);
        }
    });
}

function loadPlantlist() {
    $.ajax({
        url: AppUrl + 'basic/PRO_PM_REPAIRDEPT_VIEW',
        type: 'post',
        async: false,
        data: {
            V_V_DEPTCODE: $("#V_DEPTCODE").val()
        },
        dataType: "json",
        traditional: true,
        success: function (resp) {
            $("#selPlant").empty();
            $.each(resp.list, function (index, item) {
                if (item.V_DEPTREPAIRCODE == $("#V_DEPTCODEREPARIR").val()) {
                    $("#selPlant").val(item.V_DEPTREPAIRCODE);
                    $("#selPlantName").html(item.V_DEPTREPAIRNAME)
                }
            });
        }
    });
}

function ReturnIsToTask() {

    //var ret = window.showModalDialog(AppUrl+'/No41100101/Index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val() + '&V_DEPTCODEREPARIR=' + $("#V_DEPTCODEREPARIR").val() + '', '', 'dialogHeight:500px;dialogWidth:800px');
    $.ajax({
        url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_ACTIVITY',
        type: 'post',
        async: false,
        data: {
            V_V_ORDERGUID: $("#V_ORDERGUID").val()
        },
        dataType: "json",
        traditional: true,
        success: function (resp) {
            if (resp.list == "" || resp.list == null) {
                alert("请先添加工序");
            } else {
                var ret = window.open(AppUrl
                    + 'page/No41020102/Index.html?V_ORDERGUID='
                    + $("#V_ORDERGUID").val() + '&V_DEPTCODEREPARIR='
                    + $("#V_DEPTCODEREPARIR").val() + '', '',
                    'dialogHeight:500px;dialogWidth:800px');
                loadTaskGrid();
            }
        }
    });
}

function OpenTask() {
    var ret = window.open(AppUrl + 'page/PM_070204/index.html?V_ORDERGUID='
        + $("#V_ORDERGUID").val()
        + '&V_DEPTREPAIRCODE=' + $("#selPlant").val()
        + '', '41070101',
        'dialogHeight:500px;dialogWidth:800px');
//	window.showModalDialog('../../page/SecondPage/ThePage.html?../../page/No41070101/Index.html?V_ORDERGUID='
//			+ $("#V_ORDERGUID").val()
//			+ '&V_DEPTREPAIRCODE=' + $("#selPlant").val()
//			+ '', '',
//			'dialogHeight:500px;dialogWidth:800px');

    loadTaskGrid();
}

function loadPageInfo() {
    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
    $.ajax({
        url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_ET_DEFAULE',
        type: 'post',
        async: false,
        data: {
            V_V_ORDERGUID: $.url().param("V_ORDERGUID")
        },
        dataType: "json",
        traditional: true,
        success: function (resp) {

        }
    });
    $.ajax({
        url: AppUrl + 'zdh/PRO_PM_WORKORDER_GET',
        type: 'post',
        async: false,
        data: {
            V_V_ORDERGUID: $.url().param("V_ORDERGUID")
        },
        dataType: "json",
        traditional: true,
        success: function (resp) {

            if (resp != "" && resp != null) {
                V_DEPTCODE = resp[0].V_DEPTCODE
                V_DEPTCODEREPARIR = resp[0].V_DEPTCODEREPARIR;
                $("#V_ORGCODE").val(resp[0].V_ORGCODE);
                $("#V_ORGNAME").html(resp[0].V_ORGNAME);
                $("#V_DEPTCODE").val(resp[0].V_DEPTCODE);
                $("#V_EQUIP_NAME").html(resp[0].V_EQUIP_NAME);
                $("#V_EQUIP_NO").html(resp[0].V_EQUIP_NO);
                $("#V_FUNC_LOC").html(resp[0].V_EQUSITENAME);
                V_FUNC_LOC=resp[0].V_FUNC_LOC;
                $("#V_ORDER_TYP").html(resp[0].V_ORDER_TYP);
                $("#V_DEPTNAME").html(resp[0].V_DEPTNAME);
                $("#V_ORDERGUID").val(resp[0].V_ORDERGUID);
                $("#V_DEPTNAMEREPARIR").html(resp[0].V_DEPTNAMEREPARIR);

                $("#V_ORDER_TYP_TXT").html(resp[0].V_ORDER_TYP_TXT);

                $("#D_START_DATE").html(resp[0].D_START_DATE);
                $("#D_FINISH_DATE").html(resp[0].D_FINISH_DATE);

                $("#wbsCode").html(resp[0].V_WBS);
                $("#proName").html(resp[0].V_WBS_TXT);

                if (resp[0].D_FACT_START_DATE != "") {
                    $("#D_FACT_START_DATE").val(resp[0].D_FACT_START_DATE);
                }
                else {
                    $("#D_FACT_START_DATE").val(resp[0].D_START_DATE);
                }
                if (resp[0].D_FACT_FINISH_DATE != "") {
                    $("#D_FACT_FINISH_DATE").val(resp[0].D_FACT_FINISH_DATE);
                } else {
                    $("#D_FACT_FINISH_DATE").val(resp[0].D_FINISH_DATE);
                }
                $("#V_SHORT_TXT").html(resp[0].V_SHORT_TXT);

                $("#V_ENTERED_BY").html(resp[0].V_ENTERED_BY);
                var s1, st1;
                if (resp[0].D_ENTER_DATE != '') {
                    s1 = resp[0].D_ENTER_DATE;
                    st1 = [];
                    st1 = s1.split(' ');
                } else {
                    s1 = new Date();
                    st1 = [];
                    st1 = s1.split(' ');
                }
                $("#D_ENTER_DATE").html(st1[0]);
                $("#V_WBS").html(resp[0].V_WBS);
                $("#V_WBS_TXT").html(resp[0].V_WBS_TXT);

                $("#V_ORDERID").html(resp[0].V_ORDERID);
                $("#V_DEPTCODEREPARIR").val(resp[0].V_DEPTCODEREPARIR);


                $("#tool").val(resp[0].V_TOOL);
                $("#tech").html(resp[0].V_TECHNOLOGY);
                $("#safe").html(resp[0].V_SAFE);

                if (resp[0].D_DATE_ACP != "") {
                    $("#D_DATE_ACP").html(resp[0].D_DATE_ACP);
                } else {
                    $("#D_DATE_ACP").html(resp[0].D_FINISH_DATE);
                }
                $("#V_POSTMANSIGN").html(resp[0].V_POSTMANSIGN);
                $("#V_CHECKMANCONTENT").html(resp[0].V_CHECKMANCONTENT);
                $("#V_CHECKMANSIGN").html(resp[0].V_CHECKMANSIGN);
                $("#V_WORKSHOPCONTENT").html(resp[0].V_WORKSHOPCONTENT);
                $("#V_WORKSHOPSIGN").html(resp[0].V_WORKSHOPSIGN);
                $("#V_DEPTSIGN").html(resp[0].V_DEPTSIGN);

                $("#I_OTHERHOUR").val(resp[0].I_OTHERHOUR);
                $("#V_OTHERREASON").val(resp[0].V_OTHERREASON);
                $("#V_REPAIRCONTENT").val(resp[0].V_REPAIRCONTENT);

                $("#V_REPAIRSIGN").val(resp[0].V_REPAIRSIGN);
                $("#V_REPAIRPERSON").val(resp[0].V_REPAIRPERSON);

                $("#wbsCode").html(resp[0].V_WBS);
                $("#proName").html(resp[0].V_WBS_TXT);
            } else {
            }
        }
    });
}


/**
 * 加载编辑任务的grid
 */
function loadTaskGrid() {
    $.ajax({
        url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_OPERATIONS',
        type: 'post',
        async: false,
        data: {
            V_V_ORDERGUID: $.url().param("V_ORDERGUID")
        },
        dataType: "json",
        traditional: true,
        success: function (resp) {
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


function ConfirmAcceptWebService() {
    $.ajax({
        url: APP + '/WS_EquipService',
        type: 'post',
        async: false,
        data: {
            V_V_ORDERGUID: $("#V_ORDERGUID").val()
        },
        dataType: "json",
        traditional: true
    });

    $.ajax({
        url: APP + '/SetMatService',
        type: 'post',
        async: false,
        data: {
            V_V_ORDERGUID: $("#V_ORDERGUID").val()
        },
        success: function (resp) {
            if (resp != null) {
                $.ajax({
                    url: AppUrl + 'zdh/PRO_PM_WORKORDER_SEND_UPDATE',
                    type: 'post',
                    async: false,
                    data: {
                        V_V_ORDERGUID: $("#V_ORDERGUID").val(),
                        V_V_SEND_STATE: resp == "1" ? "成功" : "失败"
                    },
                    dataType: "json",
                    traditional: true,
                    success: function (resps) {
                    }
                });

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

    //var test = new Array(wuliaochaxunlist);
    //console.log(test);
    if(wuliaochaxunlist.length==0){

    }else{
        for (var i = 0; i < wuliaochaxunlist.length; i++) {
            if (wuliaochaxunlist[i].I_ACTUALAMOUNT != 0 && wuliaochaxunlist[i].FUJIAN_COUNT == 0) {
                Ext.Msg.alert('失败','请上传附件');
                //alert('请在物料信息列表序号为' + wuliaochaxunlist[i].sid + '的信息里添加至少一个附件');
                return;
            }
        }
    }

    Ext.Ajax.request({
        url: AppUrl + 'Activiti/TaskComplete',
        type: 'ajax',
        method: 'POST',
        params: {
            taskId: taskId,
            idea: '已反馈',
            parName: [V_NEXT_SETP, "flow_yj"],
            parVal: [$("#selApprover").val(), '已反馈'],
            processKey :processKey,
            businessKey : $.url().param("V_ORDERGUID"),
            V_STEPCODE : V_STEPCODE,
            V_STEPNAME : V_STEPNAME,
            V_IDEA : '请审批！',
            V_NEXTPER : $("#selApprover").val(),
            V_INPER : Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            $.ajax({
                url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_FK',
                type: 'post',
                async: false,
                data: {
                    V_V_PERCODE: $.cookies.get('v_personcode'),
                    V_V_PERNAME: Ext.util.Cookies.get("v_personname2"),
                    V_V_ORDERGUID: $("#V_ORDERGUID").val(),
                    V_D_FACT_START_DATE: $("#D_FACT_START_DATE").val(),
                    V_D_FACT_FINISH_DATE: $("#D_FACT_FINISH_DATE").val(),

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
                        //Ext.example.msg('操作信息', '反馈完成');
                        Ext.Ajax.request({//获取所选缺陷GUID
                            url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SELBYWORK',
                            method: 'POST',
                            async: false,
                            params: {
                                V_V_WORKORDER_GUID: $.url().param("V_ORDERGUID"),
                                V_V_FLAG:'1'
                            },
                            success: function (resp) {
                                var respguid = Ext.decode(resp.responseText);

                                if (respguid.list.length >0) {

                                    for(var i=0;i<respguid.list.length;i++)
                                    {
                                        Ext.Ajax.request({//保存缺陷详细日志
                                            url: AppUrl + 'cjy/PRO_PM_DEFECT_LOG_SET',
                                            method: 'POST',
                                            async: false,
                                            params: {
                                                V_V_GUID: respguid.list[i].V_DEFECT_GUID,
                                                V_V_LOGREMARK: Ext.util.Cookies.get('v_personname2')+'工单已反馈（'+$("#V_ORDERID").html()+'）',
                                                V_V_FINISHCODE: '30',
                                                V_V_KEY:''//缺陷guid

                                            },
                                            success: function (ret) {
                                                var resp = Ext.decode(ret.responseText);
                                                if(resp.V_INFO=='成功'){
                                                    //修改缺陷状态
                                                    Ext.Ajax.request({
                                                        url: AppUrl + 'cjy/PRO_PM_DEFECT_STATE_SET',
                                                        method: 'POST',
                                                        async: false,
                                                        params: {
                                                            V_V_GUID: respguid.list[i].V_DEFECT_GUID,
                                                            V_V_STATECODE: '22',//已反馈

                                                        },
                                                        success: function (ret) {
                                                            var resp = Ext.decode(ret.responseText);
                                                            if(resp.V_INFO=='success'){


                                                            }else{
                                                                alert("修改缺陷状态失败");
                                                            }

                                                        }
                                                    });

                                                }else{
                                                    alert("缺陷日志记录失败");
                                                }

                                            }
                                        });
                                    }
                                }else{

                                    alert("缺陷日志添加错误");
                                }
                            }
                        });
                        alert('反馈完成');
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


//$("#V_EQUIP_NAME").live("click",function () {
//
//    var ret = window.showModalDialog('../../page/No410601/Index.html?DEPTCODE=' + $("#V_DEPTCODE").val() + '', '', 'dialogHeight:500px;dialogWidth:800px');
//    if (ret != "" && ret != null) {
//        var str = [];
//        str = ret.split('^');
//        $("#V_EQUIP_NAME").val(str[1]);
//        $("#V_EQUIP_NO").val(str[0]);
//        $("#V_FUNC_LOC").val(str[2]);
//    }
//});


function loadMatList() {
    $.ajax({
        url: AppUrl + 'zdh/PRO_PM_WORKORDER_SPARE_VIEW',
        type: 'post',
        async: false,
        data: {
            V_V_ORDERGUID: $("#V_ORDERGUID").val()
        },
        dataType: "json",
        traditional: true,
        success: function (resp) {
            if (resp.list != null && resp.list != "") {
                $("#TtableM tbody").empty();

                $.each(resp.list, function (index, item) {
                    item["sid"] = index + 1;

                });
                wuliaochaxunlist = resp.list;
                $("#TtableMTemplate").tmpl(resp.list).appendTo("#TtableM tbody");
            } else {
            }
        }
    });
}

function OnClickJJButton() {
    var ret = window.open(AppUrl + 'page/No41020102/Index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val() + '', '', 'dialogHeight:500px;dialogWidth:800px');
    loadGJJJ();
}


function OnBtnLookClicked() {

    //var ret = window.showModalDialog(AppUrl+'/No41100103/Index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val() + '', '', 'dialogHeight:500px;dialogWidth:800px');
    var ret = window.open(AppUrl
    + 'page/PM_050102/index.html?flag=all&V_ORDERGUID=' + $("#V_ORDERGUID").val()
    + '', '', 'dialogHeight:500px;dialogWidth:800px');
    loadMatList();
}

function OnBtnHistoryClicked() {
    var ret = window.open(AppUrl + 'page/No41030101/Index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val(), '', 'dialogHeight:500px;dialogWidth:800px');
    if (ret != "" && ret != null) {
        var str = [];
        str = ret.split('^');
        $("#I_OTHERHOUR").val(str[0]);
        $("#V_OTHERREASON").val(str[1]);
        $("#V_REPAIRCONTENT").val(str[2]);
        $("#V_REPAIRSIGN").val(str[3]);
        $("#V_REPAIRPERSON").val(str[4]);
        $("#V_POSTMANSIGN").html(str[5]);
        $("#V_CHECKMANCONTENT").html(str[6]);
        $("#V_CHECKMANSIGN").html(str[7]);
        $("#V_WORKSHOPCONTENT").html(str[8]);
        $("#V_WORKSHOPSIGN").html(str[9]);
        $("#V_DEPTSIGN").html(str[10]);
    }
}

function loadGJJJ() {
    $.ajax({
        url: AppUrl + 'zdh/PRO_PM_WORKORDER_GET',
        type: 'post',
        async: false,
        data: {
            V_V_ORDERGUID: $.url().param("V_ORDERGUID")
        },
        dataType: "json",
        traditional: true,
        success: function (resp) {
            if (resp.list != "" && resp.list != null) {
                $("#tool").val(resp.list[0].V_TOOL);
            } else {
            }
        }
    });
}

function FinBack() {

    $.ajax({
        url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_FK',
        type: 'post',
        async: false,
        data: {
            V_V_PERCODE: $.cookies.get('v_personcode'),
            V_V_PERNAME: Ext.util.Cookies.get("v_personname2"),
            V_V_ORDERGUID: $("#V_ORDERGUID").val(),
            V_D_FACT_START_DATE: $("#D_FACT_START_DATE").val(),
            V_D_FACT_FINISH_DATE: $("#D_FACT_FINISH_DATE").val(),

            V_I_OTHERHOUR: $("#I_OTHERHOUR").val(),
            V_V_OTHERREASON: $("#V_OTHERREASON").val(),
            V_V_REPAIRCONTENT: $("#V_REPAIRCONTENT").val(),
            V_V_REPAIRSIGN: $("#V_REPAIRSIGN").val(),
            V_V_REPAIRPERSON: $("#V_REPAIRPERSON").val(),
            V_V_TOOL: $("#tool").val()
        },
        dataType: "json",
        traditional: true,
        success: function (resp) {
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
    }
    return val;

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

function print() {


    $.ajax({
        url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_EDIT',
        type: 'post',
        async: false,
        data: {

            V_V_PERCODE: $.cookies.get('v_personcode'),
            V_V_PERNAME: Ext.util.Cookies.get("v_personname2"),
            V_V_ORDERGUID: $("#V_ORDERGUID").val(),
            V_V_SHORT_TXT: $("#V_SHORT_TXT").val(),
            V_V_FUNC_LOC: V_FUNC_LOC,//$("#V_FUNC_LOC").html(),

            V_V_EQUIP_NO: $("#V_EQUIP_NO").html(),
            V_V_EQUIP_NAME: $("#V_EQUIP_NAME").html(),
            V_D_FACT_START_DATE: $("#D_FACT_START_DATE").val(),
            V_D_FACT_FINISH_DATE: $("#D_FACT_FINISH_DATE").val(),
            V_V_WBS: '',

            V_V_WBS_TXT: '',
            V_V_DEPTCODEREPARIR: $("#selPlant").val(),
            V_V_TOOL: ' ',
            V_V_TECHNOLOGY: $("#tech").html(),
            V_V_SAFE: $("#safe").html(),

            V_D_DATE_ACP: $("#D_DATE_ACP").html(),
            V_I_OTHERHOUR: $("#I_OTHERHOUR").val(),
            V_V_OTHERREASON: $("#V_OTHERREASON").val(),
            V_V_REPAIRCONTENT: $("#V_REPAIRCONTENT").val(),
            V_V_REPAIRSIGN: $("#V_REPAIRSIGN").val(),


            V_V_REPAIRPERSON: $("#V_REPAIRPERSON").val(),
            V_V_POSTMANSIGN: $("#V_POSTMANSIGN").html(),
            V_V_CHECKMANCONTENT: $("#V_CHECKMANCONTENT").html(),
            V_V_CHECKMANSIGN: $("#V_CHECKMANSIGN").html(),
            V_V_WORKSHOPCONTENT: $("#V_WORKSHOPCONTENT").html(),

            V_V_WORKSHOPSIGN: $("#V_WORKSHOPSIGN").html(),
            V_V_DEPTSIGN: $("#V_DEPTSIGN").html()

        },
        dataType: "json",
        traditional: true,
        success: function (resp) {
            //alert(resp[0]);
        }
    });


    selectID.push($("#V_ORDERGUID").val());
    window.open(AppUrl + "page/No410101/Index.html", selectID,
        "dialogHeight:700px;dialogWidth:1100px");
}
$("#I_OTHERHOUR").live(
    "keypress",
    function (event) {
        if (((event.which < 48 || event.which > 57) && event.which != 46)
            && event.which != 8) {
            return false;
        }
    });

$(".numlimit").live(
    "keypress",
    function (event) {
        if (((event.which < 48 || event.which > 57) && event.which != 46)
            && event.which != 8) {
            return false;
        }
    });

function _addFault(guid) {

    //V_V_GUID = Ext.data.IdGenerator.get('uuid').generate();
    console.log(guid);
    V_V_GUID = guid;


    filequery(V_V_GUID);
    Ext.getCmp("addFaultWindow").show();

}

function _upLoadFile() {
    var addPanel = Ext.getCmp('addPanel');

    var V_V_FILEBLOB = Ext.getCmp('V_V_FILEBLOB').getSubmitValue();
    //var V_V_FILENAME = V_V_FILEBLOB.substring(0, V_V_FILEBLOB.indexOf('.'));
    var V_V_FILENAME = V_V_FILEBLOB;
    //alert(V_V_FILENAME);
    //alert(V_V_PLANT);
    // alert(V_V_DEPT);
    Ext.getCmp('V_V_GUID').setValue(V_V_GUID);
    Ext.getCmp('V_V_FILENAME').setValue(V_V_FILENAME);
    Ext.getCmp('V_V_FILEBLOB').setValue(V_V_FILEBLOB);
    Ext.getCmp('V_V_FILETYPECODE').setValue('SBGZ');
    Ext.getCmp('V_V_PLANT').setValue(V_V_PLANT);
    Ext.getCmp('V_V_DEPT').setValue(V_V_DEPT);
    Ext.getCmp('V_V_PERSON').setValue(V_V_PERSONCODE);
    Ext.getCmp('V_V_REMARK').setValue(Ext.getCmp('V_V_REMARK').getSubmitValue());

    if (addPanel.form.isValid()) {
        if (Ext.getCmp('V_V_FILEBLOB').getValue() == '') {
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

        addPanel.getForm().submit({
            url: AppUrl + 'PM_14/PRO_BASE_FILE_ADD',
            method: 'POST',
            async: false,
            waitMsg: '上传中...',
            success: function (ret) {
                Ext.Msg.alert('成功', '上传成功');
                filequery(V_V_GUID);

            },
            failure: function (resp) {
                Ext.Msg.alert('错误', '上传失败');
            }

        })

    }

}

function filequery(guid) {
    Ext.data.StoreManager.lookup('fileGridStore').load({
        params: {
            V_V_GUID: guid
        }
    });
}

function GetBillMatByOrder() {
    $.ajax({
        url: AppUrl + '/mm/WS_EquipGetBillMaterialByOrderService',
        type: 'post',
        async: false,
        data: {
            V_V_ORDERID: $("#V_ORDERID").html(),
            V_V_ORDERGUID: $("#V_ORDERGUID").val(),
            x_personcode: $.cookies.get('v_personcode')
        },
        dataType: "json",
        traditional: true
    });
}

$(".acData1").live('change', function () {
    $.ajax({
        url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_ET_SETWORK',
        type: 'post',
        async: false,
        data: {
            V_I_ID: $(this).parent().parent().attr('id'),
            V_NAME: 'I_ACTUAL_TIME',
            V_VALUE: $(this).val()
        },
        dataType: "json",
        traditional: true,
        success: function (resp) {
            if (resp.V_INFO == '成功') {
            } else {
                alert(resp.V_INFO);
            }
        }
    });
});

$(".acData2").live('change', function () {
    $.ajax({
        url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_ET_SETWORK',
        type: 'post',
        async: false,
        data: {
            V_I_ID: $(this).parent().parent().attr('id'),
            V_NAME: 'I_NUMBER_OF_PEOPLE',
            V_VALUE: $(this).val()
        },
        dataType: "json",
        traditional: true,
        success: function (resp) {
            if (resp.V_INFO == '成功') {
            } else {
                alert(resp.V_INFO);
            }
        }
    });
});

function _downloadRander(a, value, metaData) {
    var fjlength=((metaData.data.V_FILENAME).toString()).split("\\").length;
    var filename=((metaData.data.V_FILENAME).toString()).split("\\")[fjlength-1];
    return '<a href="javascript:onDownload(\'' + metaData.data.V_FILEGUID + '\',\'' + filename + '\')">' + a + '</a>';
}

function _delRander(a, value, metaData) {
    return '<a href="javascript:onDel(\'' + metaData.data.V_FILEGUID + '\')">删除</a>';
}

function onDownload(fileguid,filename) {
    // alert(fileguid)
    var guid = fileguid.substring(0, 36);
    //var fujianname = fileguid.substring(37);

    var fjlength=filename.split("\\").length;
    //var tempstring=((metaData.data.V_FILENAME).toString()).split("\\")[0];
    var fujianname=(filename.toString()).split(fjlength-1,"\\");
    //alert(guid);
    //console.log(Ext.getCmp("V_V_GUID").getValue())
    //alert(fujianname)
    var form = Ext.getCmp('addPanel');


    location.href = AppUrl + "qk/downloadFile?V_V_FILEGUID=" + guid + "&V_V_FILENAME=" + filename;//下载页面弹窗
//123123


}

function onDel(fileguid) {

    Ext.Ajax.request({
        url: AppUrl + 'PM_14/PRO_BASE_FILE_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_FILEGUID: fileguid
        },
        success: function (response) {
            var data = Ext.JSON.decode(response.responseText);

            if (data.RET == 'SUCCESS') {
                Ext.Msg.alert('成功', '删除附件成功');
                filequery(V_V_GUID);
                //filequery2(V_V_GUID);
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

function _hideFault() {
    Ext.getCmp('addFaultWindow').close();
    loadMatList();
}

function loadSPR() {

    $.ajax({//审批人
        url: AppUrl + 'Activiti/GetTaskIdFromBusinessId',
        type: 'post',
        async: false,
        data: {
            businessKey: $("#V_ORDERGUID").val(),
            userCode: Ext.util.Cookies.get('v_personcode')
        },
        success: function (resp) {
            taskId = resp.taskId;
            V_STEPCODE = resp.TaskDefinitionKey;
        }
    });

    $.ajax({//审批人
        url: AppUrl + 'hp/PM_ACTIVITI_PROCESS_PER_SEL',
        type: 'post',
        async: false,
        data: {
            V_V_ORGCODE: $("#V_ORGCODE").val(),
            V_V_DEPTCODE: V_DEPTCODE,
            V_V_REPAIRCODE: V_DEPTCODEREPARIR,
            V_V_FLOWTYPE: 'WORK',
            V_V_FLOW_STEP: $.url().param("TaskDefinitionKey"),
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_SPECIALTY: '%',
            V_V_WHERE: ''
        },
        success: function (resp) {
            $("#selApprover").empty();
            var result = [];
            if (resp.list[0] != null) {
                $.each(resp.list, function (index, item) {
                    result.push("<option value=\"" + item.V_PERSONCODE + "\">" + item.V_PERSONNAME + "</option>");
                });
                processKey = resp.RET;
                V_STEPNAME = resp.list[0].V_V_FLOW_STEPNAME;
                V_NEXT_SETP = resp.list[0].V_V_NEXT_SETP;

                $("#selApprover").html(result.join(""));
            }

            Ext.getBody().unmask();//去除页面笼罩

            //createDD();
        }
    });
}