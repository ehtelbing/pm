var selectID = [];
var V_V_ORGCODE = '';
var V_V_DEPTCODE = '';
var V_V_DEPTCODEREPARIR = '';
var V_STEPCODE = '';
var V_STEPNAME = '';
var V_NEXT_SETP = '';
var taskId = '';
var GXlength = 0;
var ifYS = 0;
var winheight;
var V_TEAMCODE = null;
var V_V_ORDER_TYP = '';
var REPAIRSIGN="";
var REPAIRPERSON="";
var action_time;
var V_ORDERGUID = null;
var V_DBGUID = null;
var V_FLOWSTEP = null;
var ProcessInstanceId = '';
var ProcessDefinitionKey="";
var processKey="";
var MATSIGN=0;
var returnMatSign="";
var defguidOld="";
if (location.href.split('?')[1] != undefined) {
    V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
    V_DBGUID = Ext.urlDecode(location.href.split('?')[1]).V_DBGUID;
    V_FLOWSTEP = Ext.urlDecode(location.href.split('?')[1]).V_FLOWSTEP;
    ProcessInstanceId = Ext.urlDecode(location.href.split('?')[1]).ProcessInstanceId;
    ProcessDefinitionKey=Ext.urlDecode(location.href.split('?')[1]).ProcessDefinitionKey;
}
$(function () {

    var nextSprStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'nextSprStore',
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
                var list = [];
                processKey = store.getProxy().getReader().rawData.RET;
                V_STEPNAME = store.getAt(0).data.V_V_FLOW_STEPNAME;
                V_NEXT_SETP = store.getAt(0).data.V_V_NEXT_SETP;

                Ext.getCmp('nextSpr').select(store.first());
                Ext.getCmp('nextSprp').select(store.first());

            }

        }
    });

    var addInputPanel = Ext.create('Ext.form.Panel', {
        id: 'addInputPanel',
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
                    id: 'nextSpr',
                    xtype: 'combo',
                    store: nextSprStore,
                    fieldLabel: '下一步接收人',
                    editable: false,
                    labelWidth: 100,
                    displayField: 'V_PERSONNAME',
                    valueField: 'V_PERSONCODE',
                    queryMode: 'local',
                    //baseCls: 'margin-bottom',
                    style: ' margin: 5px 0px 0px 0px',
                    labelAlign: 'right',
                    width: 250
                }]
            },
            {
                xtype: 'panel',
                region: 'center',
                layout: 'column',
                border: false,
                frame: true,
                baseCls: 'my-panel-no-border',
                items: [{
                    id: 'winspyj',
                    xtype: 'textfield',
                    fieldLabel: '驳回意见',
                    editable: false,
                    labelWidth: 100,
                    queryMode: 'local',
                    //baseCls: 'margin-bottom',
                    style: ' margin: 5px 0px 0px 0px',
                    labelAlign: 'right',
                    width: 250
                }, {
                    xtype: 'button',
                    text: '确定',
                    icon: imgpath + '/saved.png',
                    style: ' margin: 5px 0px 0px 15px',
                    handler: DisAgree
                }]
            }
        ]
    });

    var window1 = Ext.create('Ext.window.Window', {
        id: 'window1',
        width: 370,
        height: 150,
        bodyPadding: 15,
        layout: 'vbox',
        title: '选择下一步接收人',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        items: [addInputPanel]
    });

    var addInputPanelp = Ext.create('Ext.form.Panel', {
        id: 'addInputPanelp',
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
                    id: 'nextSprp',
                    xtype: 'combo',
                    store: nextSprStore,
                    fieldLabel: '下一步接收人',
                    editable: false,
                    labelWidth: 100,
                    displayField: 'V_PERSONNAME',
                    valueField: 'V_PERSONCODE',
                    queryMode: 'local',
                    //baseCls: 'margin-bottom',
                    style: ' margin: 5px 0px 0px 0px',
                    labelAlign: 'right',
                    width: 250
                }]
            },
            {
                xtype: 'panel',
                region: 'center',
                layout: 'column',
                border: false,
                frame: true,
                baseCls: 'my-panel-no-border',
                items: [{
                    id: 'winspyjp',
                    xtype: 'textfield',
                    fieldLabel: '驳回意见',
                    editable: false,
                    labelWidth: 100,
                    queryMode: 'local',
                    //baseCls: 'margin-bottom',
                    style: ' margin: 5px 0px 0px 0px',
                    labelAlign: 'right',
                    width: 250
                }, {
                    xtype: 'button',
                    text: '确定',
                    icon: imgpath + '/saved.png',
                    style: ' margin: 5px 0px 0px 15px',
                    handler: DisAgreeP
                }]
            }
        ]
    });

    var windowp = Ext.create('Ext.window.Window', {
        id: 'windowp',
        width: 370,
        height: 150,
        bodyPadding: 15,
        layout: 'vbox',
        title: '选择下一步接收人',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        items: [addInputPanelp]
    });


    var valuewindow = Ext.create('Ext.window.Window', {
        id: 'valuewindow',
        width: 980,
        height: 350,
        bodyPadding: 15,
        layout: 'vbox',
        title: '实际值录入',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        items: [{
            xtype: 'panel',
            frame: true,
            id: "valuepanel",
            width: 980,
            baseCls: 'my-panel-noborder',
            layout: 'column',
            items: []
        }]
    });

    var comboPanel = Ext.create('Ext.panel.Panel', {
        id: 'comboPanel',
        region: 'center',
        layout: 'vbox',
        frame: true,
        border: false,
        //title : '流程管理',
        baseCls: 'my-panel-no-border',
        items: [
            {
                xtype: "radiogroup",
                id: 'radiotypexc',
                fieldLabel: '当前缺陷是否消缺',
                labelAlign: 'right',
                columns: 2,
                hidden:true,
                width: 290,
                margin: '5 10 5 10',
                items: [
                    {
                        boxLabel: "是",
                        name: "xctypename",
                        inputValue: "1",
                        margin: '0 10 0 10',
                        checked: true
                    },
                    {
                        boxLabel: "否",
                        name: "xctypename",
                        inputValue: "0",
                        margin: '0 10 0 10'
                    }
                ]
            },
            {
                xtype: "radiogroup",
                id: 'radiotypesc',
                fieldLabel: '是否生成新缺陷',
                labelAlign: 'right',
                columns: 2,
                width: 290,
                margin: '5 10 5 10',
                items: [
                    {
                        boxLabel: "是",
                        name: "sctypename",
                        inputValue: "1",
                        margin: '0 10 0 10'
                    },
                    {
                        boxLabel: "否",
                        name: "sctypename",
                        inputValue: "0",
                        margin: '0 10 0 10',
                        checked: true
                    }
                ]
            // ,listeners: {
            //         click: {
            //             element: 'el',
            //             fn: function (e) {
            //                 if (Ext.getCmp('radiotypesc').getValue().sctypename == '1') {
            //                     Ext.getCmp('qxmx').enable();
            //                 } else {
            //                     Ext.getCmp('qxmx').disable();
            //                 }
            //             }
            //         }
            //     }
            },
            // , {
            //     id: 'qxmx',
            //     xtype: 'textarea',
            //     fieldLabel: '缺陷明细',
            //     editable: false,
            //     labelWidth: 110,
            //     queryMode: 'local',
            //     //baseCls: 'margin-bottom',
            //     style: ' margin: 5px 0px 0px 0px',
            //     labelAlign: 'right',
            //     width: 360
            // }
            {
                xtype: "radiogroup",
                id: 'radiotypexqx',
                fieldLabel: '新缺陷是否消缺',
                labelAlign: 'right',
                columns: 2,
                hidden:true,
                width: 290,
                margin: '5 10 5 10',
                items: [
                    {
                        boxLabel: "是",
                        name: "xqxtypename",
                        inputValue: "1",
                        margin: '0 10 0 10',
                        checked: true
                    },
                    {
                        boxLabel: "否",
                        name: "xqxtypename",
                        inputValue: "0",
                        margin: '0 10 0 10'
                    }
                ]
            },
            {
                xtype: 'button',
                text: '确定',
                icon: imgpath + '/saved.png',
                style: ' margin: 10px 0px 0px 115px',
                handler: comboConfirm
            }
        ]
    });

    var combowindow = Ext.create('Ext.window.Window', {
        id: 'combowindow',
        width: 520,
        height: 300,
        bodyPadding: 15,
        layout: 'vbox',
        title: '操作选择',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        items: [comboPanel]
    });
    bindDate("D_FACT_START_DATE");
    bindDate("D_FACT_FINISH_DATE");

    //bindDate("D_DATE_ACP");

    //bindDate("D_ENTER_DATE");//创建时间
    //NowDate2("D_ENTER_DATE");

    NowDate_b("D_FACT_START_DATE");
    NowDate_e("D_FACT_FINISH_DATE");

    //NowDate_e("D_DATE_ACP");
    NowDate2("D_DATE_ACP");

    loadPageInfo();
    loadTaskGrid();
    GetBillMatByOrder2();
    loadMatList();
    loadSPR();

    $("#btnTask").click(function () {
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


function ReturnIsToTask() {
    $.ajax({
        url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_ACTIVITY',
        type: "post",
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
                var owidth = window.document.body.offsetWidth - 200;
                var oheight = window.document.body.offsetHeight - 100;
                var ret = window.open(AppUrl + 'page/PM_091104/index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val() + '&V_DEPTCODEREPARIR=' + V_V_DEPTCODEREPARIR, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
                loadTaskGrid();
            }
        }
    });
}

function loadPageInfo() {
    //Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
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
        url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_GET',
        type: 'post',
        async: false,
        data: {
            V_V_ORDERGUID: $.url().param("V_ORDERGUID")
        },
        dataType: "json",
        traditional: true,
        success: function (resp) {
            if (resp.list != "" && resp.list != null) {
                V_V_ORGCODE = resp.list[0].V_ORGCODE;
                V_V_DEPTCODE = resp.list[0].V_DEPTCODE;
                V_V_DEPTCODEREPARIR = resp.list[0].V_DEPTCODEREPARIR;
                V_V_ORDER_TYP = resp.list[0].V_ORDER_TYP;
                $("#V_ORGCODE").val(resp.list[0].V_ORGCODE);
                $("#V_ORGNAME").html(resp.list[0].V_ORGNAME);
                $("#V_DEPTCODE").val(resp.list[0].V_DEPTCODE);
                $("#V_EQUIP_NAME").html(resp.list[0].V_EQUIP_NAME);
                $("#V_EQUIP_NO").html(resp.list[0].V_EQUIP_NO);
                $("#V_FUNC_LOC").val(resp.list[0].V_FUNC_LOC);
                $("#V_EQUSITENAME").html(resp.list[0].V_EQUSITENAME);
                $("#V_ORDER_TYP").html(resp.list[0].V_ORDER_TYP);
                $("#V_DEPTNAME").html(resp.list[0].V_DEPTNAME);
                $("#V_ORDERGUID").val(resp.list[0].V_ORDERGUID);
                $("#V_DEPTNAMEREPARIR").html(resp.list[0].V_DEPTNAMEREPARIR);

                $("#V_ORDER_TYP_TXT").html(resp.list[0].V_ORDER_TYP_TXT);

                $("#D_START_DATE").html(resp.list[0].D_START_DATE);
                $("#D_FINISH_DATE").html(resp.list[0].D_FINISH_DATE);
                if (resp.list[0].D_FACT_START_DATE != "") {
                    $("#D_FACT_START_DATE").val(resp.list[0].D_FACT_START_DATE);
                }
                else {
                    $("#D_FACT_START_DATE").val(resp.list[0].D_START_DATE);
                }
                if (resp.list[0].D_FACT_FINISH_DATE != "") {
                    $("#D_FACT_FINISH_DATE").val(resp.list[0].D_FACT_FINISH_DATE);
                } else {
                    $("#D_FACT_FINISH_DATE").val(resp.list[0].D_FINISH_DATE);
                }
                $("#V_SHORT_TXT").html(resp.list[0].V_SHORT_TXT);

                $("#V_ENTERED_BY").html(resp.list[0].V_ENTERED_BY);
                var s1, st1;
                if (resp.list[0].D_ENTER_DATE != '') {
                    s1 = resp.list[0].D_ENTER_DATE;
                    st1 = [];
                    st1 = s1.split(' ');
                } else {
                    s1 = new Date();
                    st1 = [];
                    st1 = s1.split(' ');
                }
                $("#D_ENTER_DATE").html(st1[0]);
                $("#V_WBS").html(resp.list[0].V_WBS);
                $("#V_WBS_TXT").html(resp.list[0].V_WBS_TXT);

                $("#V_ORDERID").html(resp.list[0].V_ORDERID);
                $("#V_DEPTCODEREPARIR").val(resp.list[0].V_DEPTCODEREPARIR);


                $("#tool").val(resp.list[0].V_TOOL);
                $("#tech").html(resp.list[0].V_TECHNOLOGY);
                $("#safe").html(resp.list[0].V_SAFE);

                if (resp.list[0].D_DATE_ACP != "") {
                    $("#D_DATE_ACP").val(resp.list[0].D_DATE_ACP);
                } else
// {$("#D_DATE_ACP").val(resp.list[0].D_FINISH_DATE);}
                {
                    NowDate2("D_DATE_ACP");
                    /*$("#D_DATE_ACP").val("");*/
                }
                $("#V_POSTMANSIGN").val(resp.list[0].V_POSTMANSIGN);
                $("#V_CHECKMANCONTENT").val(resp.list[0].V_CHECKMANCONTENT);
                $("#V_CHECKMANSIGN").val(Ext.util.Cookies.get("v_personname2"));
                /*if(resp.list[0].V_CHECKMANSIGN!=""){
                 $("#V_CHECKMANSIGN").val(resp.list[0].V_CHECKMANSIGN);
                 }else{
                 // $("#V_CHECKMANSIGN").val(Ext.util.Cookies.get("v_personname2"));
                 $("#V_CHECKMANSIGN").val("");
                 }*/

                $("#V_WORKSHOPCONTENT").val(resp.list[0].V_WORKSHOPCONTENT);
                $("#V_WORKSHOPSIGN").val(resp.list[0].V_WORKSHOPSIGN);
                $("#V_DEPTSIGN").val(resp.list[0].V_DEPTSIGN);

                $("#I_OTHERHOUR").html(resp.list[0].I_OTHERHOUR);
                $("#V_OTHERREASON").html(resp.list[0].V_OTHERREASON);
                $("#V_REPAIRCONTENT").html(resp.list[0].V_REPAIRCONTENT);

                REPAIRSIGN=resp.list[0].V_REPAIRSIGN;
                REPAIRPERSON=resp.list[0].V_REPAIRPERSON;
                $("#V_REPAIRSIGN").html(resp.list[0].V_REPAIRSIGN);
                $("#V_REPAIRPERSON").html(resp.list[0].V_REPAIRPERSON);
                $("#totalMoney").val(0);
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
            var ret = window.open(AppUrl + 'page/PM_050103/index.html?flag=all&V_ORDERGUID=' + V_ORDERGUID + '', '', '_blank',  'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
            loadMatList();
        }
    });
}

function loadOrder() {
    Ext.Ajax.request({
        url: AppUrl + 'zdh/PRO_WX_WORKORDER_GET',
        method: 'POST',
        async: false,
        params: {
            V_V_ORDERGUID: $.url().param("V_ORDERGUID")
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if (resp.list != "" && resp.list != null) {

                V_TEAMCODE = resp.list[0].V_WXTEAM;
            }
        }
    });
}

function valueChange(field, newvalue, oldvalue) {
    var idtail = field.id.split('fvlaue')[1];
    var svaluedown = Ext.getCmp('svaluedown' + idtail).getValue();
    var svalueup = Ext.getCmp('svalueup' + idtail).getValue();
    if (Ext.getCmp('fvlaue' + idtail).getValue() > svaluedown && Ext.getCmp('fvlaue' + idtail).getValue() < svalueup) {
        Ext.getCmp('fvlaue' + idtail).setFieldStyle({'color': 'black'});
    } else {
        Ext.getCmp('fvlaue' + idtail).setFieldStyle({'color': 'red'});
    }

}

//确认验收弹出窗口确认
function comboConfirm() {
    // if (Ext.getCmp('radiotypesc').getValue().sctypename == '1') {
    //     if (Ext.getCmp('qxmx').getValue() == '') {
    //         Ext.MessageBox.alert('提示', '请填写缺陷明细');
    //         return false;
    //     }
    //
    // }
    Ext.getBody().mask('<p>驳回中...请稍候</p>');
    var newQxState="10";
    if (Ext.getCmp('radiotypexqx').getValue().xqxtypename == '1') { //新缺陷是否消缺
        newQxState="30";
    }

    if (Ext.getCmp('radiotypesc').getValue().sctypename == '1') { //生成新的缺陷
        var workguid=$.url().param("V_ORDERGUID");
        var owidth = window.document.body.offsetWidth;
        var oheight = window.document.body.offsetHeight;
        var ret = window.open(AppUrl + 'page/PM_0709/index.html?&defect=' + '' +'&defState='+newQxState+
            '&wguid='+workguid+
            '','newwindow','_blank','height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

    }
    else{
        confirmYS();
    }

    //old function
    // if (Ext.getCmp('radiotypexc').getValue().xctypename == '1') {
    //
    //     QRYS();
    //
    // } else {
    //     if ($("#D_DATE_ACP").val() == "" || $("#D_DATE_ACP").val() == null) {
    //         Ext.MessageBox.alert('提示', '请填写验收日期');
    //         return false;
    //     }
    //
    //     if ($("#V_REPAIRSIGN").val() == "这个判断不执行") {
    //         Ext.MessageBox.alert('提示', '请先填写检修方签字');
    //         return false;
    //     }
    //
    //     if ($("#V_CHECKMANCONTENT").val() == "") {
    //         Ext.MessageBox.alert('提示', '请填写点检员验收意见');
    //         return false;
    //     }
    //
    //     Ext.Ajax.request({
    //         url: AppUrl + 'Activiti/TaskComplete',
    //         type: 'ajax',
    //         method: 'POST',
    //         async: false,
    //         params: {
    //             taskId: taskId,
    //             idea: '退回',
    //             parName: ['lcjs', "flow_yj", 'shtgtime'],
    //             parVal: ['lcjs', '退回', Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, 30), 'Y-m-d') + 'T' + Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, 30), 'H:i:s')],
    //             processKey: $.url().param("ProcessDefinitionKey"),
    //             businessKey: $.url().param("V_ORDERGUID"),
    //             V_STEPCODE: V_STEPCODE,
    //             V_STEPNAME: V_STEPNAME,
    //             V_IDEA: '退回',
    //             V_NEXTPER: 'lcjs',
    //             V_INPER: Ext.util.Cookies.get('v_personcode')
    //         },
    //         success: function (response) {
    //             FinBack();
    //             $.ajax({
    //                 url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_EDIT',
    //                 type: 'post',
    //                 async: false,
    //                 data: {
    //                     V_V_PERCODE: $.cookies.get('v_personcode'),
    //                     V_V_PERNAME: Ext.util.Cookies.get("v_personname2"),
    //                     V_V_ORDERGUID: $("#V_ORDERGUID").val(),
    //                     V_V_SHORT_TXT: $("#V_SHORT_TXT").html(),
    //                     V_V_FUNC_LOC: $("#V_FUNC_LOC").val(),
    //                     V_V_EQUIP_NO: $("#V_EQUIP_NO").html(),
    //                     V_V_EQUIP_NAME: $("#V_EQUIP_NAME").html(),
    //                     V_D_FACT_START_DATE: $("#D_FACT_START_DATE").val(),
    //                     V_D_FACT_FINISH_DATE: $("#D_FACT_FINISH_DATE").val(),
    //                     V_V_WBS: $("#V_WBS").html(),
    //
    //                     V_V_WBS_TXT: $("#V_WBS_TXT").html(),
    //                     V_V_DEPTCODEREPARIR: V_V_DEPTCODEREPARIR,//$("#selPlant").val(),
    //                     V_V_TOOL: '',
    //                     V_V_TECHNOLOGY: ' ',
    //                     V_V_SAFE: ' ',
    //                     V_D_DATE_ACP: $("#D_DATE_ACP").val(),
    //                     V_I_OTHERHOUR: $("#I_OTHERHOUR").val(),
    //                     V_V_OTHERREASON: $("#V_OTHERREASON").val(),
    //                     V_V_REPAIRCONTENT: $("#V_REPAIRCONTENT").val(),
    //                     V_V_REPAIRSIGN: REPAIRSIGN,//$("#V_REPAIRSIGN").val(),
    //                     V_V_REPAIRPERSON: REPAIRPERSON,//$("#V_REPAIRPERSON").val(),
    //                     V_V_POSTMANSIGN: $("#V_POSTMANSIGN").val(),
    //                     V_V_CHECKMANCONTENT: $("#V_CHECKMANCONTENT").val(),
    //                     V_V_CHECKMANSIGN: Ext.util.Cookies.get("v_personname2"),
    //                     V_V_WORKSHOPCONTENT: $("#V_WORKSHOPCONTENT").val(),
    //                     V_V_WORKSHOPSIGN: $("#V_WORKSHOPSIGN").val(),
    //                     V_V_DEPTSIGN: $("#V_DEPTSIGN").val()
    //                 },
    //                 dataType: "json",
    //                 traditional: true,
    //                 success: function (resp) {
    //
    //                 }
    //             });
    //             $.ajax({
    //                 url: AppUrl + 'cjy/PRO_PM_WORKORDER_YS_WXC',
    //                 type: 'post',
    //                 async: false,
    //                 data: {
    //                     'V_V_PERCODE': $.cookies.get('v_personcode'),
    //                     'V_V_PERNAME': Ext.util.Cookies.get("v_personname2"),
    //                     'V_V_ORDERGUID': $("#V_ORDERGUID").val(),
    //                     'V_V_POSTMANSIGN': $("#V_POSTMANSIGN").val(),
    //                     'V_V_CHECKMANCONTENT': $("#V_CHECKMANCONTENT").val(),
    //                     'V_V_CHECKMANSIGN': $("#V_CHECKMANSIGN").val(),
    //                     'V_V_WORKSHOPCONTENT': $("#V_WORKSHOPCONTENT").val(),
    //                     'V_V_WORKSHOPSIGN': $("#V_WORKSHOPSIGN").val(),
    //                     'V_V_DEPTSIGN': $("#V_DEPTSIGN").val(),
    //                     'V_V_EQUIP_NO': $("#V_EQUIP_NO").html()
    //                 },
    //                 dataType: "json",
    //                 traditional: true,
    //                 success: function (resp) {
    //                     // 聚进接口
    //                     //otherServer($("#V_ORDERGUID").val(), "CLOSE", "成功");
    //                     // 小神探接口
    //                     //xstServer($("#V_ORDERGUID").val(), "CLOSE", "成功");
    //                     Ext.Msg.alert('提示', '验收工单成功');
    //                     // $.ajax({
    //                     //     url: APP + 'mm/SetMat',
    //                     //     type: 'post',
    //                     //     async: false,
    //                     //     data: {
    //                     //         V_V_ORDERGUID: $.url().param("V_ORDERGUID"),
    //                     //         x_personcode: $.cookies.get('v_personcode')
    //                     //     },
    //                     //     success: function (resp) {
    //                             Ext.Ajax.request({//查找所需修改状态的周计划及缺陷
    //                                 method: 'POST',
    //                                 async: false,
    //                                 url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SELBYWORK',
    //                                 params: {
    //                                     V_V_WORKORDER_GUID: $.url().param("V_ORDERGUID"),
    //                                     V_V_FLAG: "1"
    //                                 },
    //                                 success: function (response) {
    //                                     var respl = Ext.decode(response.responseText);
    //                                     if (respl.list.length > 0) {
    //                                         for (var i = 0; i < respl.list.length; i++) {
    //                                             /*Ext.Ajax.request({//修改周计划状态
    //                                              method: 'POST',
    //                                              async: false,
    //                                              url: AppUrl + 'cjy/PRO_PM_03_PLAN_WEEK_SET_STATE',
    //                                              params: {
    //                                              V_V_GUID: respl.list[i].V_WEEK_GUID,
    //                                              V_V_STATECODE: '34'//已验收
    //                                              },
    //                                              success: function (response) {
    //                                              var respm = Ext.decode(response.responseText);
    //                                              if(respm.V_INFO=='success'){
    //
    //                                              }else{
    //                                              alert("周计划状态修改错误");
    //                                              return;
    //                                              }
    //
    //                                              }
    //                                              });*/
    //                                             Ext.Ajax.request({//保存缺陷详细日志
    //                                                 url: AppUrl + 'cjy/PRO_PM_DEFECT_LOG_SET',
    //                                                 method: 'POST',
    //                                                 async: false,
    //                                                 params: {
    //                                                     V_V_GUID: respl.list[i].V_DEFECT_GUID,
    //                                                     V_V_LOGREMARK: Ext.util.Cookies.get('v_personname2') + '工单已验收（' + $("#V_ORDERID").html() + '）',
    //                                                     V_V_FINISHCODE: '30',
    //                                                     V_V_KEY: ''//缺陷guid
    //
    //                                                 },
    //                                                 success: function (ret) {
    //                                                     var resp = Ext.decode(ret.responseText);
    //                                                     if (resp.V_INFO == '成功') {
    //                                                         //修改缺陷状态
    //                                                         Ext.Ajax.request({
    //                                                             url: AppUrl + 'cjy/PRO_PM_DEFECT_STATE_SET',
    //                                                             method: 'POST',
    //                                                             async: false,
    //                                                             params: {
    //                                                                 V_V_GUID: respl.list[i].V_DEFECT_GUID,
    //                                                                 V_V_STATECODE: '23'//已验收
    //                                                             },
    //                                                             success: function (ret) {
    //                                                                 var resp = Ext.decode(ret.responseText);
    //                                                                 if (resp.V_INFO == 'success') {
    //                                                                     $.ajax({
    //                                                                         url: AppUrl + 'mm/SetMat',
    //                                                                         type: 'post',
    //                                                                         async: false,
    //                                                                         data: {
    //                                                                             V_V_ORDERGUID: $.url().param("V_ORDERGUID"),
    //                                                                             x_personcode: $.cookies.get('v_personcode')
    //                                                                         },
    //                                                                         success: function (resp) {
    //                                                                         }
    //                                                                     });
    //                                                                 } else {
    //                                                                     alert("修改缺陷状态失败");
    //                                                                 }
    //                                                             }
    //                                                         });
    //
    //                                                     } else {
    //                                                         alert("缺陷日志记录失败");
    //                                                     }
    //                                                 }
    //                                             });
    //                                         }
    //                                     }
    //                                 }
    //                             });
    //                             window.opener.QueryTab();
    //                             window.opener.QuerySum();
    //                             window.opener.QueryGrid();
    //                             window.close();
    //                             window.opener.OnPageLoad();
    //                     //     }
    //                     // });
    //                 },
    //                 error: function (response, opts) {
    //                     Ext.Msg.alert('提示', '验收工单失败,请联系管理员');
    //                 }
    //             });
    //         },
    //         failure: function (response) {//访问到后台时执行的方法。
    //             Ext.MessageBox.show({
    //                 title: '错误',
    //                 msg: response.responseText,
    //                 buttons: Ext.MessageBox.OK,
    //                 icon: Ext.MessageBox.ERROR
    //             })
    //         }
    //     })
    // }
    //
    // if (Ext.getCmp('radiotypesc').getValue().sctypename == '1') {
    //     //缺陷录入
    //     Ext.Ajax.request({
    //         url: AppUrl + 'PM_07/PRO_PM_07_DEFECT_SET',
    //         method: 'POST',
    //         async: false,
    //         params: {
    //             V_V_GUID: guid(),
    //             V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
    //             V_V_DEFECTLIST: $("#V_SHORT_TXT").html(),//工单描述
    //             V_V_SOURCECODE: 'defct01',
    //             V_V_SOURCEID: '',
    //             V_D_DEFECTDATE: Ext.util.Format.date(new Date(), 'Y/m/d H:m:s'),
    //             V_V_DEPTCODE: $("#V_DEPTCODE").val(),
    //             V_V_EQUCODE: $("#V_EQUIP_NO").html(),
    //             V_V_EQUCHILDCODE: '%',
    //             V_V_IDEA: '%',
    //             V_V_LEVEL: '%'
    //         },
    //         success: function (resp) {
    //             var resp = Ext.decode(resp.responseText);
    //             if (resp.V_INFO == '成功') {
    //                 //Ext.Msg.alert('操作信息','保存成功');
    //                 window.opener.QueryTab();
    //                 window.opener.QuerySum();
    //                 window.opener.QueryGrid();
    //                 window.close();
    //                 window.opener.OnPageLoad();
    //             } else {
    //                 Ext.Msg.alert('操作信息', '缺陷录入失败');
    //             }
    //         }
    //     });
    // }
}
//执行验收过程
function confirmYS(){
    Ext.getBody().mask('<p>验收中...请稍候</p>');
   var defExeNum=0;
   var defRetNum=0;
    //一、工作流
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/TaskComplete',
        type: 'ajax',
        method: 'POST',
        params: {
            taskId: taskId,
            idea: '已验收',
            parName: ['lcjs', "flow_yj", 'shtgtime'],
            parVal: ['lcjs', '已验收', Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, 30), 'Y-m-d') + 'T' + Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, 30), 'H:i:s')],
            processKey: $.url().param("ProcessDefinitionKey"),
            businessKey: $.url().param("V_ORDERGUID"),
            V_STEPCODE: V_STEPCODE,
            V_STEPNAME: V_STEPNAME,
            V_IDEA: '已验收！',
            V_NEXTPER: 'lcjs',
            V_INPER: Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            //FinBack();
            //二、工单保存
            $.ajax({
                url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_EDIT',
                type: 'post',
                async: false,
                data: {
                    V_V_PERCODE: $.cookies.get('v_personcode'),
                    V_V_PERNAME: Ext.util.Cookies.get("v_personname2"),
                    V_V_ORDERGUID: $("#V_ORDERGUID").val(),
                    V_V_SHORT_TXT: $("#V_SHORT_TXT").html(),
                    V_V_FUNC_LOC: $("#V_FUNC_LOC").val(),
                    V_V_EQUIP_NO: $("#V_EQUIP_NO").html(),
                    V_V_EQUIP_NAME: $("#V_EQUIP_NAME").html(),
                    V_D_FACT_START_DATE: $("#D_FACT_START_DATE").val(),
                    V_D_FACT_FINISH_DATE: $("#D_FACT_FINISH_DATE").val(),
                    V_V_WBS: $("#V_WBS").html(),

                    V_V_WBS_TXT: $("#V_WBS_TXT").html(),
                    V_V_DEPTCODEREPARIR: V_V_DEPTCODEREPARIR,//$("#selPlant").val(),
                    V_V_TOOL: '',
                    V_V_TECHNOLOGY: ' ',
                    V_V_SAFE: ' ',
                    V_D_DATE_ACP: $("#D_DATE_ACP").val(),
                    V_I_OTHERHOUR: $("#I_OTHERHOUR").val(),
                    V_V_OTHERREASON: $("#V_OTHERREASON").val(),
                    V_V_REPAIRCONTENT: $("#V_REPAIRCONTENT").val(),
                    V_V_REPAIRSIGN: REPAIRSIGN,//$("#V_REPAIRSIGN").val(),
                    V_V_REPAIRPERSON:REPAIRPERSON,// $("#V_REPAIRPERSON").val(),
                    V_V_POSTMANSIGN: $("#V_POSTMANSIGN").val(),
                    V_V_CHECKMANCONTENT: $("#V_CHECKMANCONTENT").val(),
                    V_V_CHECKMANSIGN: Ext.util.Cookies.get("v_personname2"),
                    V_V_WORKSHOPCONTENT: $("#V_WORKSHOPCONTENT").val(),
                    V_V_WORKSHOPSIGN: $("#V_WORKSHOPSIGN").val(),
                    V_V_DEPTSIGN: $("#V_DEPTSIGN").val()
                },
                dataType: "json",
                traditional: true,
                success: function (resp) {
                    // if(jQuery.isNumeric($("#totalMoney").val())){ //判断数字类型
                    //二-2、工单费用填报
                    Ext.Ajax.request({
                        method:'POST',
                        async:false,
                        url:AppUrl+'dxfile/PRO_PM_WORKORDER_MONEY_UPDATE',
                        params:{
                            V_WORKORDER:$.url().param("V_ORDERGUID"),
                            V_V_MONEY:$("#totalMoney").val()
                        },
                        success:function(response){
                            var resp=Ext.decode(response.responseText);
                            if(resp.RET=='SUCCESS'){

                            }
                        }
                    });
                    // }
                    //三、工单验收
                    $.ajax({
                        url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_YS',
                        type: 'post',
                        async: false,
                        data: {
                            /*
                             * V_V_PERCODE IN VARCHAR2, --人员编码 V_V_PERNAME IN VARCHAR2,
                             * --人员名称 V_V_ORDERGUID IN VARCHAR2, --工单GUID V_V_POSTMANSIGN IN
                             * VARCHAR2, --岗位签字 V_V_CHECKMANCONTENT IN VARCHAR2, -- 点检员验收意见
                             * V_V_CHECKMANSIGN IN VARCHAR2, -- 点检员签字 V_V_WORKSHOPCONTENT IN
                             * VARCHAR2, -- 作业区验收 V_V_WORKSHOPSIGN IN VARCHAR2, --
                             * 作业区签字/库管员签字 V_V_DEPTSIGN IN VARCHAR2, -- 部门签字 V_V_EQUIP_NO IN
                             * VARCHAR2, --设备编码
                             */
                            'V_V_PERCODE': $.cookies.get('v_personcode'),
                            'V_V_PERNAME': Ext.util.Cookies.get("v_personname2"),
                            'V_V_ORDERGUID': $("#V_ORDERGUID").val(),
                            'V_V_POSTMANSIGN': $("#V_POSTMANSIGN").val(),
                            'V_V_CHECKMANCONTENT': $("#V_CHECKMANCONTENT").val(),
                            'V_V_CHECKMANSIGN': $("#V_CHECKMANSIGN").val(),
                            'V_V_WORKSHOPCONTENT': $("#V_WORKSHOPCONTENT").val(),
                            'V_V_WORKSHOPSIGN': $("#V_WORKSHOPSIGN").val(),
                            'V_V_DEPTSIGN': $("#V_DEPTSIGN").val(),
                            'V_V_EQUIP_NO': $("#V_EQUIP_NO").html()
                        },
                        dataType: "json",
                        traditional: true,
                        success: function (resp) {
                            // 聚进接口
                            //otherServer($("#V_ORDERGUID").val(), "CLOSE", "成功");
                            // 小神探接口
                            //xstServer($("#V_ORDERGUID").val(), "CLOSE", "成功");
                            Ext.Msg.alert('提示', '验收工单成功');
                            /*$.ajax({
                             url: APP + '/SetMatService',
                             type: 'post',
                             async: false,
                             data: {
                             V_V_ORDERGUID: $.url().param("V_ORDERGUID")
                             },
                             success: function (resp) {*/
                            Ext.Ajax.request({// 四、查找工单对应的缺陷
                                method: 'POST',
                                async: false,
                                // url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SELBYWORK',
                                url:AppUrl+'dxfile/PM_DEFECT_SEL_TO_WORK',
                                params: {
                                    V_V_WORKORDER_GUID: $.url().param("V_ORDERGUID"),
                                    V_V_FLAG: "1"
                                },
                                success: function (response) {
                                    var respl = Ext.decode(response.responseText);
                                    if (respl.list.length > 0) {
                                        for (var i = 0; i < respl.list.length; i++) {
                                            defRetNum=respl.list.length;
                                            defguidOld=respl.list[i].V_DEFECT_GUID;
                                            /*Ext.Ajax.request({//修改周计划状态
                                             method: 'POST',
                                             async: false,
                                             url: AppUrl + 'cjy/PRO_PM_03_PLAN_WEEK_SET_STATE',
                                             params: {
                                             V_V_GUID: respl.list[i].V_WEEK_GUID,
                                             V_V_STATECODE: '34'//已验收
                                             },
                                             success: function (response) {
                                             var respm = Ext.decode(response.responseText);
                                             if(respm.V_INFO=='success'){

                                             }else{
                                             alert("周计划状态修改错误");
                                             return;
                                             }

                                             }
                                             });*/
                                            // 五、修改缺陷状态
                                            Ext.Ajax.request({
                                                url: AppUrl + 'cjy/PRO_PM_DEFECT_STATE_SET',
                                                method: 'POST',
                                                async: false,
                                                params: {
                                                    V_V_GUID:defguidOld, // respl.list[i].V_DEFECT_GUID,
                                                    // V_V_STATECODE: '23'//已验收
                                                    V_V_STATECODE:'30'//已验收
                                                },
                                                success: function (ret) {
                                                    var resp = Ext.decode(ret.responseText);
                                                    if (resp.V_INFO == 'success') {
                                                    } else {
                                                        alert("修改缺陷状态失败");
                                                    }
                                                }
                                            });

                                            //六并行-1 system
                                            // defguidOld=respl.list[i].V_DEFECT_GUID;
                                            Ext.Ajax.request({ //缺陷查找system 标识数据值
                                                method:'POST',
                                                async:false,
                                                url:AppUrl+'dxfile/PM_DEFECT_SYSTEM_SIGN_SEL',
                                                params:{
                                                    DEFECTGUID:defguidOld
                                                },
                                                success:function(ret){
                                                    var resp=Ext.decode(ret.responseText);
                                                    if(resp.RET!=null){
                                                        if(resp.RET=='XSTDJ'||resp.RET=="JJDJ"){
                                                            // 点检缺陷处理结果
                                                            Ext.Ajax.request({
                                                                method:'POST',
                                                                async:false,
                                                                url:AppUrl+'wxjh/SI_DJQXCLJG_Out_Syn_PM0010',
                                                                params:{
                                                                    V_V_DEFECTGUID:defguidOld
                                                                },
                                                                success:function(ret){
                                                                    var resp=Ext.decode(ret.responseText);
                                                                    if(resp.type='S'){

                                                                    }
                                                                }
                                                            });
                                                        }
                                                    }
                                                }
                                            });
                                            //六并行-2 webcode
                                            if( $("#V_WBS").html()!=""){
                                                // Ext.Ajax.request({ //检修完成结果下传
                                                //     url: AppUrl + 'dxfile/MAINTAIN_TO_WORKORDER_NUM_SEL',
                                                //     method: 'POST',
                                                //     async: false,
                                                //     params: {
                                                //         V_WORKGUID:$.url().param("V_ORDERGUID"),
                                                //     },
                                                //     success: function (ret) {
                                                //         var resp=Ext.decode(ret.responseText);
                                                //         if(resp.RET!=null){

                                                Ext.Ajax.request({ //检修完成结果下传
                                                    url: AppUrl + 'wxjh/SI_JXWCJG_Out_Syn_PM0014',
                                                    method: 'POST',
                                                    async: false,
                                                    params: {
                                                        V_V_WORKORDER: $.url().param("V_ORDERGUID"),
                                                        V_V_DEFECT_TYPE:'1'
                                                    },
                                                    success: function (ret) {
                                                        var resp=Ext.decode(ret.responseText);
                                                        if(resp.type='S'){

                                                        }
                                                    }
                                                });
                                                            // Ext.Ajax.request({ //检修完成结果下传
                                                            //     url: AppUrl + 'wxjh/SI_JXWCJG_Out_Syn_PM0014',
                                                            //     method: 'POST',
                                                            //     async: false,
                                                            //     params: {
                                                            //         V_DEFECT_GUID: defguidOld,//缺陷guid
                                                            //         V_DEFECT_TYPE:'1',
                                                            //         V_SYSTEM: 'AKSB',
                                                            //         V_GUID: '',
                                                            //         V_STR01:'',
                                                            //         V_STR02:'',
                                                            //         V_STR03:'',
                                                            //         V_STR04:'',
                                                            //         V_STR05:''
                                                            //     },
                                                            //     success: function (ret) {
                                                            //         var resp=Ext.decode(ret.responseText);
                                                            //         if(resp.type='S'){
                                                            //
                                                            //         }
                                                            //     }
                                                            // });
                                                //         }
                                                //     }
                                                // });
                                            }
                                            //六并行-3 setmat
                                            $.ajax({ // --update 2018--9-18
                                                url: AppUrl + 'mm/SetMat',
                                                type: 'post',
                                                async: false,
                                                data: {
                                                    V_V_ORDERGUID: $.url().param("V_ORDERGUID"),
                                                    x_personcode: $.cookies.get('v_personcode')
                                                },
                                                success: function (resp) {
                                                }
                                            });
                                            //六并行-4 wsequipServise
                                            if (V_V_ORDER_TYP == 'AK07') {
                                                Ext.Ajax.request({
                                                    method: 'POST',
                                                    async: false,
                                                    url: AppUrl + 'mm/WS_EquipService',
                                                    params: {
                                                        V_V_ORDERGUID: $.url().param("V_ORDERGUID"),
                                                        x_personcode: Ext.util.Cookies.get('v_personcode')
                                                    }, success: function (resp) {

                                                    }
                                                });
                                            }
                                            //六并行-5 重生缺陷
                                            // if(Ext.getCmp('radiotypexc').getValue().xctypename != '1'){ //重生一条缺陷
                                            //     //原数据生成新的 缺陷
                                            //     Ext.Ajax.request({
                                            //         url:AppUrl + 'dxfile/PRO_PM_DEFECT_AUTO_NEW_IN',
                                            //         method:'POST',
                                            //         async: false,
                                            //         params: {
                                            //             V_DEFECTGUID: defguidOld,//respl.list[i].V_DEFECT_GUID,
                                            //             V_PERCODE: Ext.util.Cookies.get("v_personcode"),
                                            //             V_PERNAME: decodeURI(Ext.util.Cookies.get("v_personname"))
                                            //         },
                                            //         success:function(response){
                                            //             var resp = Ext.decode(response.responseText);
                                            //             if (resp.RET == "SUCCESS") {
                                            //
                                            //             }
                                            //         }
                                            //     });
                                            // }
                                            //六并行-6 缺陷日志
                                            Ext.Ajax.request({//保存缺陷详细日志
                                                url: AppUrl + 'cjy/PRO_PM_DEFECT_LOG_SET',
                                                method: 'POST',
                                                async: false,
                                                params: {
                                                    V_V_GUID: defguidOld,//respl.list[i].V_DEFECT_GUID,
                                                    V_V_LOGREMARK: Ext.util.Cookies.get('v_personname2') + '工单已验收（' + $("#V_ORDERID").html() + '）',
                                                    V_V_FINISHCODE: '30',
                                                    V_V_KEY: ''//缺陷guid
                                                },
                                                success: function (ret) {
                                                    var resp = Ext.decode(ret.responseText);
                                                    if (resp.V_INFO == '成功') {
                                                        defExeNum++;
                                                    } else {
                                                        alert("缺陷日志记录失败");
                                                    }
                                                }
                                            });

                                        }
                                    }

                                }
                            });
                            if(defRetNum==defExeNum){
                                Ext.getBody().unmask();//去除页面笼罩
                                window.opener.QueryTab();
                                window.opener.QuerySum();
                                window.opener.QueryGrid();
                                window.close();
                                window.opener.OnPageLoad();
                            }
                            // window.opener.QueryTab();
                            // window.opener.QuerySum();
                            // window.opener.QueryGrid();
                            // window.close();
                            // window.opener.OnPageLoad();
                            /*}
                             });*/
                        },
                        error: function (response, opts) {
                            Ext.getBody().unmask();//去除页面笼罩
                            Ext.Msg.alert('提示', '验收工单失败,请联系管理员');
                        }
                    });
                    // //修改缺陷状态
                    // Ext.Ajax.request({
                    //     url: AppUrl + 'cjy/PRO_PM_DEFECT_STATE_SET',
                    //     method: 'POST',
                    //     async: false,
                    //     params: {
                    //         V_V_GUID: defguidOld,//respl.list[i].V_DEFECT_GUID,
                    //         V_V_STATECODE:'30'//已验收
                    //     },
                    //     success: function (ret) {
                    //         var resp = Ext.decode(ret.responseText);
                    //         if (resp.V_INFO == 'success') {
                    //
                    //             if(Ext.getCmp('radiotypexc').getValue().xctypename != '1'){ //重生一条缺陷
                    //                 //原数据生成新的 缺陷
                    //                 Ext.Ajax.request({
                    //                     url:AppUrl + 'dxfile/PRO_PM_DEFECT_AUTO_NEW_IN',
                    //                     method:'POST',
                    //                     async: false,
                    //                     params: {
                    //                         V_DEFECTGUID: respl.list[i].V_DEFECT_GUID,
                    //                         V_PERCODE: Ext.util.Cookies.get("v_personcode"),
                    //                         V_PERNAME: decodeURI(Ext.util.Cookies.get("v_personname"))
                    //                     },
                    //                     success:function(response){
                    //                         var resp = Ext.decode(response.responseText);
                    //                         if (resp.RET == "SUCCESS") { }
                    //                     }
                    //                 });
                    //             }
                    //
                    //             // --update 2018--9-18
                    //             $.ajax({
                    //                 url: AppUrl + 'mm/SetMat',
                    //                 type: 'post',
                    //                 async: false,
                    //                 data: {
                    //                     V_V_ORDERGUID: $.url().param("V_ORDERGUID"),
                    //                     x_personcode: $.cookies.get('v_personcode')
                    //                 },
                    //                 success: function (resp) {
                    //                 }
                    //             });
                    //         } else {
                    //             alert("修改缺陷状态失败");
                    //         }
                    //     }
                    // });
                    // Ext.Ajax.request({//保存缺陷详细日志
                    //     url: AppUrl + 'cjy/PRO_PM_DEFECT_LOG_SET',
                    //     method: 'POST',
                    //     async: false,
                    //     params: {
                    //         V_V_GUID: respl.list[i].V_DEFECT_GUID,
                    //         V_V_LOGREMARK: Ext.util.Cookies.get('v_personname2') + '工单已验收（' + $("#V_ORDERID").html() + '）',
                    //         V_V_FINISHCODE: '30',
                    //         V_V_KEY: ''//缺陷guid
                    //     },
                    //     success: function (ret) {
                    //         var resp = Ext.decode(ret.responseText);
                    //         if (resp.V_INFO == '成功') {
                    //
                    //         } else {
                    //             alert("缺陷日志记录失败");
                    //         }
                    //     }
                    // });
                    // Ext.Ajax.request({//查找所需修改状态的周计划及缺陷
                    //     method: 'POST',
                    //     async: false,
                    //     url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SELBYWORK',
                    //     params: {
                    //         V_V_WORKORDER_GUID: $.url().param("V_ORDERGUID"),
                    //         V_V_FLAG: "1"
                    //     },
                    //     success: function (response) {
                    //         var respl = Ext.decode(response.responseText);
                    //         if (respl.list.length > 0) {
                    //             for (var i = 0; i < respl.list.length; i++) {
                    //                 defguidOld=respl.list[i].V_DEFECT_GUID;
                    //                 Ext.Ajax.request({ //缺陷查找system 标识数据值
                    //                     method:'POST',
                    //                     async:false,
                    //                     url:AppUrl+'dxfile/PM_DEFECT_SYSTEM_SIGN_SEL',
                    //                     params:{
                    //                         DEFECTGUID:defguidOld
                    //                     },
                    //                     success:function(ret){
                    //                         var resp=Ext.decode(ret.responseText);
                    //                         if(resp.RET!=null){
                    //                             if(resp.RET=='XSTDJ'||resp.RET=="JJDJ"){
                    //                                 // 点检缺陷处理结果
                    //                                 Ext.Ajax.request({
                    //                                     method:'POST',
                    //                                     async:false,
                    //                                     url:AppUrl+'wxjh/SI_DJQXCLJG_Out_Syn_PM0010',
                    //                                     params:{
                    //                                         V_V_DEFECTGUID:defguidOld
                    //                                     },
                    //                                     success:function(ret){
                    //                                         var resp=Ext.decode(ret.responseText);
                    //                                         if(resp.type='S'){
                    //
                    //                                         }
                    //                                     }
                    //                                 });
                    //                             }
                    //                         }
                    //                     }
                    //                 });
                    //                 /*Ext.Ajax.request({//修改周计划状态
                    //                  method: 'POST',
                    //                  async: false,
                    //                  url: AppUrl + 'cjy/PRO_PM_03_PLAN_WEEK_SET_STATE',
                    //                  params: {
                    //                  V_V_GUID: respl.list[i].V_WEEK_GUID,
                    //                  V_V_STATECODE: '34'//已验收
                    //                  },
                    //                  success: function (response) {
                    //                  var respm = Ext.decode(response.responseText);
                    //                  if(respm.V_INFO=='success'){
                    //
                    //                  }else{
                    //                  alert("周计划状态修改错误");
                    //                  return;
                    //                  }
                    //
                    //                  }
                    //                  });*/
                    //                 // wbs不为空（即放行生成工单)
                    //                 if( $("#wbsCode").val()!=""){
                    //                     Ext.Ajax.request({ //检修完成结果下传
                    //                         url: AppUrl + 'dxfile/MAINTAIN_TO_WORKORDER_NUM_SEL',
                    //                         method: 'POST',
                    //                         async: false,
                    //                         params: {
                    //                             V_WORKGUID:$.url().param("V_ORDERGUID"),
                    //                         },
                    //                         success: function (ret) {
                    //                             var resp=Ext.decode(ret.responseText);
                    //                             if(resp.RET!=null){
                    //                                 Ext.Ajax.request({ //检修完成结果下传
                    //                                     url: AppUrl + 'wxjh/SI_JXWCJG_Out_Syn_PM0014',
                    //                                     method: 'POST',
                    //                                     async: false,
                    //                                     params: {
                    //                                         V_DEFECT_GUID: defguidOld,//缺陷guid
                    //                                         V_DEFECT_TYPE:'1',
                    //                                         V_SYSTEM: 'AKSB',
                    //                                         V_GUID: '',
                    //                                         V_STR01:'',
                    //                                         V_STR02:'',
                    //                                         V_STR03:'',
                    //                                         V_STR04:'',
                    //                                         V_STR05:''
                    //                                     },
                    //                                     success: function (ret) {
                    //                                         var resp=Ext.decode(ret.responseText);
                    //                                         if(resp.type='S'){
                    //
                    //                                         }
                    //                                     }
                    //                                 });
                    //                             }
                    //                         }
                    //                     });
                    //                 }
                    //
                    //                 Ext.Ajax.request({ //保存缺陷详细日志
                    //                     url: AppUrl + 'cjy/PRO_PM_DEFECT_LOG_SET',
                    //                     method: 'POST',
                    //                     async: false,
                    //                     params: {
                    //                         V_V_GUID: respl.list[i].V_DEFECT_GUID,
                    //                         V_V_LOGREMARK: Ext.util.Cookies.get('v_personname2') + '工单已验收（' + $("#V_ORDERID").html() + '）',
                    //                         V_V_FINISHCODE: '30',
                    //                         V_V_KEY: ''//缺陷guid
                    //
                    //                     },
                    //                     success: function (ret) {
                    //                         var resp = Ext.decode(ret.responseText);
                    //                         if (resp.V_INFO == '成功') {
                    //                             //修改缺陷状态
                    //
                    //
                    //                         } else {
                    //                             alert("缺陷日志记录失败");
                    //                         }
                    //                     }
                    //                 }); //保存缺陷详细日志end
                    //             }
                    //         }
                    //     }
                    // });
                    // window.opener.QueryTab();
                    // window.opener.QuerySum();
                    // window.opener.QueryGrid();
                    // window.close();
                    // window.opener.OnPageLoad();
                    //     }
                    // });


                    // if (V_V_ORDER_TYP == 'AK07') {
                    //     Ext.Ajax.request({
                    //         method: 'POST',
                    //         async: false,
                    //         url: AppUrl + 'mm/WS_EquipService',
                    //         params: {
                    //             V_V_ORDERGUID: $.url().param("V_ORDERGUID"),
                    //             x_personcode: Ext.util.Cookies.get('v_personcode')
                    //         }, success: function (resp) {
                    //
                    //         }
                    //     });
                    // }
                }
            });

        },//流程验收结束
        failure: function (response) {//访问到后台时执行的方法。
            Ext.getBody().unmask();//去除页面笼罩
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            })
        }
    });

}
function ValueConfirm() {
    ifYS = 0;
    var temp = 0;
    for (var k = 0; k < GXlength; k++) {
        if (Ext.getCmp('fvlaue' + k).getValue() == '') {
            temp++;
        }
    }
    if (temp != 0) {
        alert("请输入实际值！");
        return false;
    } else {
        var fnum = 0;
        for (var j = 0; j < GXlength; j++) {
            Ext.Ajax.request({
                url: AppUrl + 'cjy/PRO_PM_WORKORDER_ET_OPERA_SET',
                method: 'POST',
                async: false,
                params: {
                    V_V_GUID: Ext.getCmp('gxguid' + j).getValue(),
                    V_V_FACT_VALUE: Ext.getCmp('fvlaue' + j).getValue()
                },
                success: function (ret) {
                    var resp = Ext.decode(ret.responseText);
                    if (resp.V_INFO == 'success') {
                        fnum++;
                    }
                }
            });
        }
        if (fnum != GXlength) {
            alert("实际值保存失败");
            return;
        }
    }

    for (var i = 0; i < GXlength; i++) {
        if (Ext.getCmp('fvlaue' + i).fieldStyle.color == 'red') {
            ifYS++;
        }
    }
    if (ifYS > 0) {
        if (!confirm("含有不符合标准值数据，确定是否验收?")) {
            return false;
        } else {
            Ext.getCmp('combowindow').show();
            Ext.getCmp('qxmx').disable();
        }
    } else {
        Ext.getCmp('combowindow').show();
        Ext.getCmp('qxmx').disable();
    }


    if (Ext.getCmp('radiotypesc').getValue().sctypename == '1') {
        Ext.getCmp('qxmx').enable();
    } else {
        Ext.getCmp('qxmx').disable();
    }
}
//---udate 2018-09-12
function changefactnum(){
    var i=0;
    $("#TtableT").find("tr").each(function () {
        if (i!=0){
            var id=$(this).find('td').eq(0).text();
            var ftime=$(this).closest("tr").find("input[id='facttime']").val();
            var fposnum=$(this).closest("tr").find("input[id='factposnum']").val();
            Ext.Ajax.request({
                url: AppUrl + 'cjy/PRO_PM_WORKORDER_ET_SET_NEW',
                method: 'POST',
                params: {
                    V_I_ID :  $(this).find('td').eq(11).text(),
                    V_V_ORDERGUID:$("#V_ORDERGUID").val(),
                    V_V_DESCRIPTION:$(this).find('td').eq(2).text(),
                    V_I_WORK_ACTIVITY:$(this).find('td').eq(3).text(),
                    V_I_DURATION_NORMAL:$(this).find('td').eq(4).text(),
                    V_V_WORK_CENTER:$(this).find('td').eq(1).text(),
                    V_I_ACTUAL_TIME:ftime,
                    V_I_NUMBER_OF_PEOPLE: fposnum,
                    V_V_ID:$(this).find('td').eq(12).text(),
                    V_V_GUID: $(this).find('td').eq(13).text(),
                    V_V_JXBZ:$(this).find('td').eq(14).text(),
                    V_V_JXBZ_VALUE_DOWN:$(this).find('td').eq(15).text(),
                    V_V_JXBZ_VALUE_UP:$(this).find('td').eq(16).text()
                }, success: function (response) {

                }
            });

        };
        i++;  });
}
//--end upd
function ActivitiConfirmAccept() {//确定验收
    Ext.getBody().mask('<p>验收跳转中...请稍候</p>');
    workMatChangeSel();
    if(MATSIGN==1||returnMatSign=="1"){
        matChangeFlow();
    }else {
        if ($("#D_DATE_ACP").val() == "" || $("#D_DATE_ACP").val() == null) {
            Ext.getBody().unmask();
            Ext.MessageBox.alert('提示', '请填写验收日期');
            return false;
        }

        if ($("#V_REPAIRSIGN").val() == "这个判断不执行") {
            Ext.getBody().unmask();
            Ext.MessageBox.alert('提示', '请先填写检修方签字');
            return false;
        }

        if ($("#V_CHECKMANCONTENT").val() == "") {
            Ext.getBody().unmask();
            Ext.MessageBox.alert('提示', '请填写点检员验收意见');
            return false;
        }
        changefactnum();
        Ext.getCmp('valuepanel').removeAll();
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
                // QRYS();
                Ext.getBody().unmask();//去除页面笼罩
                if($("#V_WBS").html()==""){
                    Ext.getCmp('combowindow').show();
                } else{
                    confirmYS();
                }

                // var fnum = resp.list.length;
                //
                // if (resp.list.length == 0) {
                //     // QRYS();
                // } else {
                //     for (var i = 0; i < resp.list.length; i++) {
                //         if (resp.list[i].V_JXBZ_VALUE_DOWN == '' || resp.list[i].V_JXBZ_VALUE_DOWN == null || resp.list[i].V_JXBZ_VALUE_UP == '' || resp.list[i].V_JXBZ_VALUE_UP == null) {
                //             fnum--;
                //         } else {
                //             var khpanel = [{
                //                 xtype: 'displayfield',
                //                 id: 'gxcode' + i,
                //                 fieldLabel: '工序编号',
                //                 labelAlign: 'right',
                //                 labelWidth: 80,
                //                 style: {
                //                     margin: '5px 0 5px 0px'
                //                 },
                //                 value: resp.list[i].V_ACTIVITY,
                //                 width: 200
                //             }, {
                //                 xtype: 'displayfield',
                //                 id: 'gxname' + i,
                //                 fieldLabel: '工序内容',
                //                 labelAlign: 'right',
                //                 labelWidth: 80,
                //                 style: {
                //                     margin: '5px 0 5px 0px'
                //                 },
                //                 value: resp.list[i].V_DESCRIPTION,
                //                 width: 200
                //             }, {
                //                 xtype: 'displayfield',
                //                 id: 'svaluedown' + i,
                //                 fieldLabel: '标准值(下限)',
                //                 labelAlign: 'right',
                //                 labelWidth: 80,
                //                 style: {
                //                     margin: '5px 0 5px 0px'
                //                 },
                //                 value: resp.list[i].V_JXBZ_VALUE_DOWN,
                //                 width: 150
                //             }, {
                //                 xtype: 'displayfield',
                //                 id: 'svalueup' + i,
                //                 fieldLabel: '标准值(上限)',
                //                 labelAlign: 'right',
                //                 labelWidth: 80,
                //                 style: {
                //                     margin: '5px 0 5px 0px'
                //                 },
                //                 value: resp.list[i].V_JXBZ_VALUE_UP,
                //                 width: 150
                //             }, {
                //                 xtype: 'textfield',
                //                 id: 'fvlaue' + i,
                //                 fieldStyle: 'background :#FFFF99;',
                //                 fieldLabel: '实际值',
                //                 labelAlign: 'right',
                //                 labelWidth: 80,
                //                 style: {
                //                     margin: '5px 0 5px 0px'
                //                 },
                //                 listeners: {
                //                     change: valueChange
                //                 },
                //                 width: 200
                //             }, {
                //                 xtype: 'textfield',
                //                 id: 'gxguid' + i,
                //                 fieldStyle: 'background :#FFFF99;',
                //                 fieldLabel: '工序guid',
                //                 hidden: true,
                //                 labelAlign: 'right',
                //                 labelWidth: 80,
                //                 width: 200,
                //                 value: resp.list[i].V_GUID
                //             }];
                //
                //             Ext.getCmp('valuepanel').add(khpanel);
                //         }
                //     }
                //
                //     var bpanel = {
                //         xtype: 'button',
                //         text: '确定',
                //         icon: imgpath + '/saved.png',
                //         style: ' margin: 5px 0px 0px 35px',
                //         handler: ValueConfirm
                //     };
                //
                //     if (fnum == 0) {
                //         Ext.getCmp('combowindow').show();
                //         Ext.getCmp('qxmx').disable();
                //     } else {
                //         if (fnum == 1 || fnum == 2) {
                //             winheight = fnum * 140;
                //         } else {
                //             winheight = fnum * 70;
                //         }
                //
                //         GXlength = fnum;
                //         Ext.getCmp('valuepanel').add(bpanel);
                //         Ext.getCmp('valuewindow').setHeight(winheight);
                //         Ext.getCmp('valuepanel').setHeight(winheight);
                //         // --Ext.getCmp('valuepanel').add(panel);
                //         Ext.getCmp('valuewindow').show();
                //         // --OpenDiv('VDiv','Vfade');
                //     }
                // }

            }
        });
    }
}

function QRYS() {
    if ($("#D_DATE_ACP").val() == "" || $("#D_DATE_ACP").val() == null) {
        Ext.MessageBox.alert('提示', '请填写验收日期');
        return false;
    }

    if ($("#V_REPAIRSIGN").val() == "这个判断不执行") {
        Ext.MessageBox.alert('提示', '请先填写检修方签字');
        return false;
    }

    if ($("#V_CHECKMANCONTENT").val() == "") {
        Ext.MessageBox.alert('提示', '请填写点检员验收意见');
        return false;
    }

    if (!confirm("是否验收工单")) {
        return false;
    } else {

        //===
        Ext.Ajax.request({
            url: AppUrl + 'Activiti/TaskComplete',
            type: 'ajax',
            method: 'POST',
            params: {
                taskId: taskId,
                idea: '已验收',
                parName: ['lcjs', "flow_yj", 'shtgtime'],
                parVal: ['lcjs', '已验收', Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, 30), 'Y-m-d') + 'T' + Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, 30), 'H:i:s')],
                processKey: $.url().param("ProcessDefinitionKey"),
                businessKey: $.url().param("V_ORDERGUID"),
                V_STEPCODE: V_STEPCODE,
                V_STEPNAME: V_STEPNAME,
                V_IDEA: '已验收！',
                V_NEXTPER: 'lcjs',
                V_INPER: Ext.util.Cookies.get('v_personcode')
            },
            success: function (response) {
                //FinBack();
                $.ajax({
                    url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_EDIT',
                    type: 'post',
                    async: false,
                    data: {
                        V_V_PERCODE: $.cookies.get('v_personcode'),
                        V_V_PERNAME: Ext.util.Cookies.get("v_personname2"),
                        V_V_ORDERGUID: $("#V_ORDERGUID").val(),
                        V_V_SHORT_TXT: $("#V_SHORT_TXT").html(),
                        V_V_FUNC_LOC: $("#V_FUNC_LOC").val(),
                        V_V_EQUIP_NO: $("#V_EQUIP_NO").html(),
                        V_V_EQUIP_NAME: $("#V_EQUIP_NAME").html(),
                        V_D_FACT_START_DATE: $("#D_FACT_START_DATE").val(),
                        V_D_FACT_FINISH_DATE: $("#D_FACT_FINISH_DATE").val(),
                        V_V_WBS: $("#V_WBS").html(),

                        V_V_WBS_TXT: $("#V_WBS_TXT").html(),
                        V_V_DEPTCODEREPARIR: V_V_DEPTCODEREPARIR,//$("#selPlant").val(),
                        V_V_TOOL: '',
                        V_V_TECHNOLOGY: ' ',
                        V_V_SAFE: ' ',
                        V_D_DATE_ACP: $("#D_DATE_ACP").val(),
                        V_I_OTHERHOUR: $("#I_OTHERHOUR").val(),
                        V_V_OTHERREASON: $("#V_OTHERREASON").val(),
                        V_V_REPAIRCONTENT: $("#V_REPAIRCONTENT").val(),
                        V_V_REPAIRSIGN: REPAIRSIGN,//$("#V_REPAIRSIGN").val(),
                        V_V_REPAIRPERSON:REPAIRPERSON,// $("#V_REPAIRPERSON").val(),
                        V_V_POSTMANSIGN: $("#V_POSTMANSIGN").val(),
                        V_V_CHECKMANCONTENT: $("#V_CHECKMANCONTENT").val(),
                        V_V_CHECKMANSIGN: Ext.util.Cookies.get("v_personname2"),
                        V_V_WORKSHOPCONTENT: $("#V_WORKSHOPCONTENT").val(),
                        V_V_WORKSHOPSIGN: $("#V_WORKSHOPSIGN").val(),
                        V_V_DEPTSIGN: $("#V_DEPTSIGN").val()
                    },
                    dataType: "json",
                    traditional: true,
                    success: function (resp) {
                        // if(jQuery.isNumeric($("#totalMoney").val())){ //判断数字类型
                            //工单费用填报
                            // Ext.Ajax.request({
                            //     method:'POST',
                            //     async:false,
                            //     url:AppUrl+'dxfile/PRO_PM_WORKORDER_MONEY_UPDATE',
                            //     params:{
                            //         V_WORKORDER:$.url().param("V_ORDERGUID"),
                            //         V_V_MONEY:$("#totalMoney").val()
                            //     },
                            //     success:function(response){
                            //         var resp=Ext.decode(response.responseText);
                            //         if(resp.RET=='SUCCESS'){
                            //
                            //         }
                            //     }
                            // });
                        // }

                        // $.ajax({
                        //         url: APP + 'mm/SetMat',
                        //         type: 'post',
                        //         async: false,
                        //         data: {
                        //             V_V_ORDERGUID: $.url().param("V_ORDERGUID"),
                        //             x_personcode: $.cookies.get('v_personcode')
                        //         },
                        //         success: function (resp) {
                        Ext.Ajax.request({//查找所需修改状态的周计划及缺陷
                            method: 'POST',
                            async: false,
                            url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SELBYWORK',
                            params: {
                                V_V_WORKORDER_GUID: $.url().param("V_ORDERGUID"),
                                V_V_FLAG: "1"
                            },
                            success: function (response) {
                                var respl = Ext.decode(response.responseText);
                                if (respl.list.length > 0) {
                                    for (var i = 0; i < respl.list.length; i++) {
                                        /*Ext.Ajax.request({//修改周计划状态
                                         method: 'POST',
                                         async: false,
                                         url: AppUrl + 'cjy/PRO_PM_03_PLAN_WEEK_SET_STATE',
                                         params: {
                                         V_V_GUID: respl.list[i].V_WEEK_GUID,
                                         V_V_STATECODE: '34'//已验收
                                         },
                                         success: function (response) {
                                         var respm = Ext.decode(response.responseText);
                                         if(respm.V_INFO=='success'){

                                         }else{
                                         alert("周计划状态修改错误");
                                         return;
                                         }

                                         }
                                         });*/
                                        Ext.Ajax.request({//保存缺陷详细日志
                                            url: AppUrl + 'cjy/PRO_PM_DEFECT_LOG_SET',
                                            method: 'POST',
                                            async: false,
                                            params: {
                                                V_V_GUID: respl.list[i].V_DEFECT_GUID,
                                                V_V_LOGREMARK: Ext.util.Cookies.get('v_personname2') + '工单已验收（' + $("#V_ORDERID").html() + '）',
                                                V_V_FINISHCODE: '30',
                                                V_V_KEY: ''//缺陷guid

                                            },
                                            success: function (ret) {
                                                var resp = Ext.decode(ret.responseText);
                                                if (resp.V_INFO == '成功') {
                                                    //修改缺陷状态
                                                    Ext.Ajax.request({
                                                        url: AppUrl + 'cjy/PRO_PM_DEFECT_STATE_SET',
                                                        method: 'POST',
                                                        async: false,
                                                        params: {
                                                            V_V_GUID: respl.list[i].V_DEFECT_GUID,
                                                            V_V_STATECODE: '23'//已验收
                                                        },
                                                        success: function (ret) {
                                                            var resp = Ext.decode(ret.responseText);
                                                            if (resp.V_INFO == 'success') {
                                                                // --update 2018--9-18
                                                                $.ajax({
                                                                    url: AppUrl + 'mm/SetMat',
                                                                    type: 'post',
                                                                    async: false,
                                                                    data: {
                                                                        V_V_ORDERGUID: $.url().param("V_ORDERGUID"),
                                                                        x_personcode: $.cookies.get('v_personcode')
                                                                    },
                                                                    success: function (resp) {
                                                                    }
                                                                });
                                                            } else {
                                                                alert("修改缺陷状态失败");
                                                            }
                                                        }
                                                    });

                                                } else {
                                                    alert("缺陷日志记录失败");
                                                }
                                            }
                                        });
                                    }
                                }
                            }
                        });
                        // window.opener.QueryTab();
                        // window.opener.QuerySum();
                        // window.opener.QueryGrid();
                        // window.close();
                        // window.opener.OnPageLoad();
                //     }
                // });


                        if (V_V_ORDER_TYP == 'AK07') {
                            Ext.Ajax.request({
                                method: 'POST',
                                async: false,
                                url: AppUrl + 'mm/WS_EquipService',
                                params: {
                                    V_V_ORDERGUID: $.url().param("V_ORDERGUID"),
                                    x_personcode: Ext.util.Cookies.get('v_personcode')
                                }, success: function (resp) {

                                }
                            });
                        }
                    }
                });
                $.ajax({
                    url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_YS',
                    type: 'post',
                    async: false,
                    data: {
                        /*
                         * V_V_PERCODE IN VARCHAR2, --人员编码 V_V_PERNAME IN VARCHAR2,
                         * --人员名称 V_V_ORDERGUID IN VARCHAR2, --工单GUID V_V_POSTMANSIGN IN
                         * VARCHAR2, --岗位签字 V_V_CHECKMANCONTENT IN VARCHAR2, -- 点检员验收意见
                         * V_V_CHECKMANSIGN IN VARCHAR2, -- 点检员签字 V_V_WORKSHOPCONTENT IN
                         * VARCHAR2, -- 作业区验收 V_V_WORKSHOPSIGN IN VARCHAR2, --
                         * 作业区签字/库管员签字 V_V_DEPTSIGN IN VARCHAR2, -- 部门签字 V_V_EQUIP_NO IN
                         * VARCHAR2, --设备编码
                         */
                        'V_V_PERCODE': $.cookies.get('v_personcode'),
                        'V_V_PERNAME': Ext.util.Cookies.get("v_personname2"),
                        'V_V_ORDERGUID': $("#V_ORDERGUID").val(),
                        'V_V_POSTMANSIGN': $("#V_POSTMANSIGN").val(),
                        'V_V_CHECKMANCONTENT': $("#V_CHECKMANCONTENT").val(),
                        'V_V_CHECKMANSIGN': $("#V_CHECKMANSIGN").val(),
                        'V_V_WORKSHOPCONTENT': $("#V_WORKSHOPCONTENT").val(),
                        'V_V_WORKSHOPSIGN': $("#V_WORKSHOPSIGN").val(),
                        'V_V_DEPTSIGN': $("#V_DEPTSIGN").val(),
                        'V_V_EQUIP_NO': $("#V_EQUIP_NO").html()
                    },
                    dataType: "json",
                    traditional: true,
                    success: function (resp) {
                        // 聚进接口
                        //otherServer($("#V_ORDERGUID").val(), "CLOSE", "成功");
                        // 小神探接口
                        //xstServer($("#V_ORDERGUID").val(), "CLOSE", "成功");
                        Ext.Msg.alert('提示', '验收工单成功');
                        /*$.ajax({
                         url: APP + '/SetMatService',
                         type: 'post',
                         async: false,
                         data: {
                         V_V_ORDERGUID: $.url().param("V_ORDERGUID")
                         },
                         success: function (resp) {*/
                        Ext.Ajax.request({//查找所需修改状态的周计划及缺陷
                            method: 'POST',
                            async: false,
                            url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SELBYWORK',
                            params: {
                                V_V_WORKORDER_GUID: $.url().param("V_ORDERGUID"),
                                V_V_FLAG: "1"
                            },
                            success: function (response) {
                                var respl = Ext.decode(response.responseText);
                                if (respl.list.length > 0) {
                                    for (var i = 0; i < respl.list.length; i++) {
                                        /*Ext.Ajax.request({//修改周计划状态
                                         method: 'POST',
                                         async: false,
                                         url: AppUrl + 'cjy/PRO_PM_03_PLAN_WEEK_SET_STATE',
                                         params: {
                                         V_V_GUID: respl.list[i].V_WEEK_GUID,
                                         V_V_STATECODE: '34'//已验收
                                         },
                                         success: function (response) {
                                         var respm = Ext.decode(response.responseText);
                                         if(respm.V_INFO=='success'){

                                         }else{
                                         alert("周计划状态修改错误");
                                         return;
                                         }

                                         }
                                         });*/
                                        Ext.Ajax.request({//保存缺陷详细日志
                                            url: AppUrl + 'cjy/PRO_PM_DEFECT_LOG_SET',
                                            method: 'POST',
                                            async: false,
                                            params: {
                                                V_V_GUID: respl.list[i].V_DEFECT_GUID,
                                                V_V_LOGREMARK: Ext.util.Cookies.get('v_personname2') + '工单已验收（' + $("#V_ORDERID").html() + '）',
                                                V_V_FINISHCODE: '30',
                                                V_V_KEY: ''//缺陷guid
                                            },
                                            success: function (ret) {
                                                var resp = Ext.decode(ret.responseText);
                                                if (resp.V_INFO == '成功') {
                                                    //修改缺陷状态
                                                    Ext.Ajax.request({
                                                        url: AppUrl + 'cjy/PRO_PM_DEFECT_STATE_SET',
                                                        method: 'POST',
                                                        async: false,
                                                        params: {
                                                            V_V_GUID: respl.list[i].V_DEFECT_GUID,
                                                            V_V_STATECODE: '23'//已验收
                                                        },
                                                        success: function (ret) {
                                                            var resp = Ext.decode(ret.responseText);
                                                            if (resp.V_INFO == 'success') {
                                                            } else {
                                                                alert("修改缺陷状态失败");
                                                            }
                                                        }
                                                    });
                                                } else {
                                                    alert("缺陷日志记录失败");
                                                }
                                            }
                                        });
                                    }
                                }

                            }
                        });
                        window.opener.QueryTab();
                        window.opener.QuerySum();
                        window.opener.QueryGrid();
                        window.close();
                        window.opener.OnPageLoad();
                        /*}
                         });*/
                    },
                    error: function (response, opts) {
                        Ext.Msg.alert('提示', '验收工单失败,请联系管理员');
                    }
                });
            },//流程验收结束
            failure: function (response) {//访问到后台时执行的方法。
                Ext.MessageBox.show({
                    title: '错误',
                    msg: response.responseText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                })
            }
        });
    }
}
function loadSPR() {
    $.ajax({//审批人
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
            V_STEPNAME = resp.taskName;

            Ext.getBody().unmask();//去除页面笼罩
        }
    });
}

function ConfirmAccept() {

    if ($("#V_EQUIP_NO").val() != "") {
        if ($("#D_DATE_ACP").val() == "" || $("#D_DATE_ACP").val() == null) {
            alert('请填写验收日期');
            return false;
        }
        if ($("#V_REPAIRSIGN").val() == "这个判断不执行") {
            alert("请先填写检修方签字!");
        } else {
            if (!confirm("是否验收工单")) {
                return false;
            } else {
                FinBack();
                $.ajax({
                    url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_EDIT',
                    type: 'post',
                    async: false,
                    data: {
                        V_V_PERCODE: $.cookies.get('v_personcode'),
                        V_V_PERNAME: Ext.util.Cookies.get("v_personname2"),
                        V_V_ORDERGUID: $("#V_ORDERGUID").val(),
                        V_V_SHORT_TXT: $("#V_SHORT_TXT").html(),
                        V_V_FUNC_LOC: $("#V_FUNC_LOC").val(),
                        V_V_EQUIP_NO: $("#V_EQUIP_NO").html(),
                        V_V_EQUIP_NAME: $("#V_EQUIP_NAME").html(),
                        V_D_FACT_START_DATE: $("#D_FACT_START_DATE").val(),
                        V_D_FACT_FINISH_DATE: $("#D_FACT_FINISH_DATE").val(),
                        V_V_WBS: $("#V_WBS").html(),
                        V_V_WBS_TXT: $("#V_WBS_TXT").html(),
                        V_V_DEPTCODEREPARIR: V_V_DEPTCODEREPARIR,//$("#selPlant").val(),
                        V_V_TOOL: '',
                        V_V_TECHNOLOGY: ' ',
                        V_V_SAFE: ' ',
                        V_D_DATE_ACP: $("#D_DATE_ACP").val(),
                        V_I_OTHERHOUR: $("#I_OTHERHOUR").val(),
                        V_V_OTHERREASON: $("#V_OTHERREASON").val(),
                        V_V_REPAIRCONTENT: $("#V_REPAIRCONTENT").val(),
                        V_V_REPAIRSIGN:REPAIRSIGN,// $("#V_REPAIRSIGN").val(),
                        V_V_REPAIRPERSON:REPAIRPERSON,// $("#V_REPAIRPERSON").val(),
                        V_V_POSTMANSIGN: $("#V_POSTMANSIGN").val(),
                        V_V_CHECKMANCONTENT: $("#V_CHECKMANCONTENT").val(),
                        V_V_CHECKMANSIGN: Ext.util.Cookies.get("v_personname2"),
                        V_V_WORKSHOPCONTENT: $("#V_WORKSHOPCONTENT").val(),
                        V_V_WORKSHOPSIGN: $("#V_WORKSHOPSIGN").val(),
                        V_V_DEPTSIGN: $("#V_DEPTSIGN").val()
                    },
                    dataType: "json",
                    traditional: true,
                    success: function (resp) {
                        //alert(resp);
                    }
                });
                $.ajax({
                    url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_YS',
                    type: 'post',
                    async: false,
                    data: {
                        /*
                         * V_V_PERCODE IN VARCHAR2, --人员编码 V_V_PERNAME IN VARCHAR2,
                         * --人员名称 V_V_ORDERGUID IN VARCHAR2, --工单GUID V_V_POSTMANSIGN IN
                         * VARCHAR2, --岗位签字 V_V_CHECKMANCONTENT IN VARCHAR2, -- 点检员验收意见
                         * V_V_CHECKMANSIGN IN VARCHAR2, -- 点检员签字 V_V_WORKSHOPCONTENT IN
                         * VARCHAR2, -- 作业区验收 V_V_WORKSHOPSIGN IN VARCHAR2, --
                         * 作业区签字/库管员签字 V_V_DEPTSIGN IN VARCHAR2, -- 部门签字 V_V_EQUIP_NO IN
                         * VARCHAR2, --设备编码
                         */
                        'V_V_PERCODE': $.cookies.get('v_personcode'),
                        'V_V_PERNAME': Ext.util.Cookies.get("v_personname2"),
                        'V_V_ORDERGUID': $("#V_ORDERGUID").val(),
                        'V_V_POSTMANSIGN': $("#V_POSTMANSIGN").val(),
                        'V_V_CHECKMANCONTENT': $("#V_CHECKMANCONTENT").val(),
                        'V_V_CHECKMANSIGN': $("#V_CHECKMANSIGN").val(),
                        'V_V_WORKSHOPCONTENT': $("#V_WORKSHOPCONTENT").val(),
                        'V_V_WORKSHOPSIGN': $("#V_WORKSHOPSIGN").val(),
                        'V_V_DEPTSIGN': $("#V_DEPTSIGN").val(),
                        'V_V_EQUIP_NO': $("#V_EQUIP_NO").html()
                    },
                    dataType: "json",
                    traditional: true,
                    success: function (resp) {
                        // 聚进接口
                        otherServer($("#V_ORDERGUID").val(), "CLOSE", "成功");
                        // 小神探接口
                        xstServer($("#V_ORDERGUID").val(), "CLOSE", "成功");
                        Ext.Msg.alert('提示', '验收工单成功');
                        window.opener.QueryTab();
                        window.opener.QuerySum();
                        window.opener.QueryGrid();
                        window.close();
                    },
                    error: function (response, opts) {
                        Ext.Msg.alert('提示', '验收工单失败,请联系管理员');
                    }
                });
            }
        }
    } else {
        Ext.Msg.alert("消息", "请选择设备名称")
    }
}


/*$("#V_EQUIP_NAME").live("click",function () {
 var owidth = window.document.body.offsetWidth - 200;
 var oheight = window.document.body.offsetHeight - 100;
 var ret = window.open(AppUrl +'page/PM_070205/index.html?V_ORDERGUID='+ $("#V_ORDERGUID").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
 //var ret = window.showModalDialog('../../page/No410601/Index.html?DEPTCODE=' + $("#V_DEPTCODE").val() + '', '', 'dialogHeight:500px;dialogWidth:800px');
 if (ret != "" && ret != null) {
 var str = [];
 str = ret.split('^');
 $("#V_EQUIP_NAME").val(str[1]);
 $("#V_EQUIP_NO").val(str[0]);
 $("#V_FUNC_LOC").val(str[2]);
 $("#V_EQUSITENAME").val(str[3]);
 }
 });*/

function print() {
    workMatChangeSel();
    if(MATSIGN==1||returnMatSign=="1"){
        matChangeFlow();
    }else {
        $.ajax({
            url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_EDIT',
            type: 'post',
            async: false,
            data: {
                V_V_PERCODE: $.cookies.get('v_personcode'),
                V_V_PERNAME: Ext.util.Cookies.get("v_personname2"),
                V_V_ORDERGUID: $("#V_ORDERGUID").val(),
                V_V_SHORT_TXT: $("#V_SHORT_TXT").html(),
                V_V_FUNC_LOC: $("#V_FUNC_LOC").val(),
                V_V_EQUIP_NO: $("#V_EQUIP_NO").html(),
                V_V_EQUIP_NAME: $("#V_EQUIP_NAME").html(),
                V_D_FACT_START_DATE: $("#D_FACT_START_DATE").val(),
                V_D_FACT_FINISH_DATE: $("#D_FACT_FINISH_DATE").val(),
                V_V_WBS: $("#V_WBS").html(),

                V_V_WBS_TXT: $("#V_WBS_TXT").html(),
                V_V_DEPTCODEREPARIR: V_V_DEPTCODEREPARIR,//$("#selPlant").val(),
                V_V_TOOL: '',
                V_V_TECHNOLOGY: ' ',
                V_V_SAFE: ' ',
                V_D_DATE_ACP: $("#D_DATE_ACP").val(),
                V_I_OTHERHOUR: $("#I_OTHERHOUR").val(),
                V_V_OTHERREASON: $("#V_OTHERREASON").val(),
                V_V_REPAIRCONTENT: $("#V_REPAIRCONTENT").val(),
                V_V_REPAIRSIGN: REPAIRSIGN,  //$("#V_REPAIRSIGN").val(),
                V_V_REPAIRPERSON: REPAIRPERSON,  //$("#V_REPAIRPERSON").val(),
                V_V_POSTMANSIGN: $("#V_POSTMANSIGN").val(),
                V_V_CHECKMANCONTENT: $("#V_CHECKMANCONTENT").val(),
                V_V_CHECKMANSIGN: Ext.util.Cookies.get("v_personname2"),
                V_V_WORKSHOPCONTENT: $("#V_WORKSHOPCONTENT").val(),
                V_V_WORKSHOPSIGN: $("#V_WORKSHOPSIGN").val(),
                V_V_DEPTSIGN: $("#V_DEPTSIGN").val()
            },
            dataType: "json",
            traditional: true,
            success: function (resp) {
                //alert(resp[0]);
            }
        });
        selectID.push($("#V_ORDERGUID").val());
        window.open(AppUrl + "page/No410101/indexn.html", selectID,
            "dialogHeight:700px;dialogWidth:1100px");
    }
}

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
            V_V_FUNC_LOC: $("#V_FUNC_LOC").html(),
            V_V_EQUIP_NO: $("#V_EQUIP_NO").html(),
            V_V_EQUIP_NAME: $("#V_EQUIP_NAME").html(),
            V_D_FACT_START_DATE: $("#D_FACT_START_DATE").val(),
            V_D_FACT_FINISH_DATE: $("#D_FACT_FINISH_DATE").val(),
            V_V_WBS: $("#V_WBS").html(),
            V_V_WBS_TXT: $("#V_WBS_TXT").html(),
            V_V_DEPTCODEREPARIR: V_V_DEPTCODEREPARIR,
            V_V_TOOL: ' ',
            V_V_TECHNOLOGY: ' ',
            V_V_SAFE: ' ',
            V_D_DATE_ACP: $("#D_DATE_ACP").val(),
            V_I_OTHERHOUR: $("#I_OTHERHOUR").val(),
            V_V_OTHERREASON: $("#V_OTHERREASON").val(),
            V_V_REPAIRCONTENT: $("#V_REPAIRCONTENT").val(),
            V_V_REPAIRSIGN: REPAIRSIGN,//$("#V_REPAIRSIGN").val(),
            V_V_REPAIRPERSON:REPAIRPERSON,//' $("#V_REPAIRPERSON").val(),
            V_V_POSTMANSIGN: $("#V_POSTMANSIGN").val(),
            V_V_CHECKMANCONTENT: $("#V_CHECKMANCONTENT").val(),
            V_V_CHECKMANSIGN: $("#V_CHECKMANSIGN").val(),
            V_V_WORKSHOPCONTENT: $("#V_WORKSHOPCONTENT").val(),
            V_V_WORKSHOPSIGN: $("#V_WORKSHOPSIGN").val(),
            V_V_DEPTSIGN: $("#V_DEPTSIGN").val()
        },
        dataType: "json",
        traditional: true,
        success: function (resp) {
            alert(resp.V_INFO);
        }
    });
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
        $("#V_POSTMANSIGN").val(str[5]);
        $("#V_CHECKMANCONTENT").val(str[6]);
        $("#V_CHECKMANSIGN").val(str[7]);
        $("#V_WORKSHOPCONTENT").val(str[8]);
        $("#V_WORKSHOPSIGN").val(str[9]);
        $("#V_DEPTSIGN").val(str[10]);
    }
}

function OnClickJJButton() {
    /*window.open(AppUrl+'page/PM_070204/index.html?V_ORDERGUID='
     + $("#V_ORDERGUID").val()
     + '&V_DEPTREPAIRCODE=' + $("#V_DEPTCODE").html()
     + '', '41070101',
     'dialogHeight:500px;dialogWidth:800px');*/

    /*var owidth = window.document.body.offsetWidth-200;
     var oheight = window.document.body.offsetHeight-100 ;
     var ret = window.open(AppUrl+'page/PM_090510/index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val()
     +  '&V_DEPTREPAIRCODE=' + $("#V_DEPTCODE").html() +  '&V_TEAMCODE=' + V_TEAMCODE +'', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

     loadTaskGrid();*/

    var V_EQUTYPE = '';
    Ext.Ajax.request({
        url: AppUrl + 'pm_19/PRO_SAP_PM_EQU_P_GET',
        method: 'POST',
        async: false,
        params: {
            V_V_EQUCODE: $('#V_EQUIP_NO').html()
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.list.length != 0) {
                V_EQUTYPE = resp.list[0].V_EQUTYPECODE;//设备类型编码
            }
        }
    });
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_090510/index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val()
    + '&V_DEPTREPAIRCODE=' + V_V_DEPTCODEREPARIR
    + '&V_EQUCODE=' + $('#V_EQUIP_NO').html()
    + '&V_V_ORGCODE=' + V_V_ORGCODE
    + '&V_V_DEPTCODE=' + V_V_DEPTCODE
    + '&V_EQUTYPE=' + V_EQUTYPE
    + '&V_TEAMCODE=' + V_TEAMCODE + '', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

    loadTaskGrid();
}

//生成模型
function CreateModel() {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_091105/index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val() +
    '&V_ORGCODE=' + $("#V_ORGCODE").val() +
    '&V_DEPTCODE=' + $("#V_DEPTCODE").val() +
    '&V_EQUCODE=' + $("#V_EQUIP_NO").html(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}

function OnBtnLookClicked() {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_091107/index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
    loadMatList();
}

function loadGJJJ() {
    $.ajax({
        url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_GET',
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
            'V_V_PERCODE': $.cookies.get('v_personcode'),
            'V_V_PERNAME': Ext.util.Cookies.get("v_personname2"),
            'V_V_ORDERGUID': $("#V_ORDERGUID").val(),
            'V_D_FACT_START_DATE': $("#D_FACT_START_DATE").val(),
            'V_D_FACT_FINISH_DATE': $("#D_FACT_FINISH_DATE").val(),
            'V_I_OTHERHOUR': $("#I_OTHERHOUR").val(),
            'V_V_OTHERREASON': $("#V_OTHERREASON").val(),
            'V_V_REPAIRCONTENT': $("#V_REPAIRCONTENT").val(),
            'V_V_REPAIRSIGN':REPAIRSIGN,// $("#V_REPAIRSIGN").val(),
            'V_V_REPAIRPERSON': REPAIRPERSON,//$("#V_REPAIRPERSON").val(),
            'V_V_TOOL': $("#tool").text() == "" ? " " : $("#tool").text()
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
    // s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " " +
    // dateFomate(hou) + ":" + dateFomate(min) + ":" + dateFomate(sen);
    s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " 08:30:00";

    // try { $("#" + id + "").html(s); } catch (e) { $("#" + id + "").val(s); }
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
    // s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " " +
    // dateFomate(hou) + ":" + dateFomate(min) + ":" + dateFomate(sen);
    s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " 16:30:00";

    // try { $("#" + id + "").html(s); } catch (e) { $("#" + id + "").val(s); }
    $("#" + id + "").val(s);
}

function NowDate2(id) {
    var d, s;
    d = new Date($("#D_FACT_FINISH_DATE").val());
    var year = d.getFullYear().toString();
    var month = (d.getMonth() + 1).toString();
    var date = d.getDate().toString();
    var hou = d.getHours().toString();
    var min = d.getMinutes().toString();
    var sen = d.getSeconds().toString();
    // s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " " +
    // dateFomate(hou) + ":" + dateFomate(min) + ":" + dateFomate(sen);
    //s = year + "-" + dateFomate(month) + "-" + dateFomate(date) +" "+hou+":"+min+":"+sen;
    // try { $("#" + id + "").html(s); } catch (e) { $("#" + id + "").val(s); }
    s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " 16:30:00";
    $("#" + id + "").val(s);
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

function loadMatList() {
    Ext.Ajax.request({
        url: AppUrl + 'zdh/PRO_PM_WORKORDER_SPARE_VIEW',
        type: 'post',
        params: {
            V_V_ORDERGUID: $.url().param("V_ORDERGUID")// $("#V_ORDERGUID").val()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if (resp.list != null && resp.list != "") {
                $("#TtableM tbody").empty();
                $.each(resp.list, function (index, item) {
                    item["sid"] = index + 1;
                });
                $("#TtableMTemplate").tmpl(resp.list).appendTo("#TtableM tbody");
            } else {
                $("#TtableM tbody").empty();
            }
        }
    });
}

function preDisAgree() {
    var nextSprStore = Ext.data.StoreManager.lookup('nextSprStore');
    nextSprStore.proxy.extraParams = {
        V_V_ORGCODE: V_V_ORGCODE,
        V_V_DEPTCODE: V_V_DEPTCODE,
        V_V_REPAIRCODE: V_V_DEPTCODEREPARIR,
        V_V_FLOWTYPE: 'WORK',
        V_V_FLOW_STEP: V_STEPCODE,
        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_SPECIALTY: '%',
        V_V_WHERE: '退回'
    };
    nextSprStore.currentPage = 1;
    nextSprStore.load();
    Ext.getCmp('window1').show();
}

function preDisAgreePri() {
    var nextSprStore = Ext.data.StoreManager.lookup('nextSprStore');
    nextSprStore.proxy.extraParams = {
        V_V_ORGCODE: V_V_ORGCODE,
        V_V_DEPTCODE: V_V_DEPTCODE,
        V_V_REPAIRCODE: V_V_DEPTCODEREPARIR,
        V_V_FLOWTYPE: 'WORK',
        V_V_FLOW_STEP: V_STEPCODE,
        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_SPECIALTY: '%',
        V_V_WHERE: '未打印'
    };
    nextSprStore.currentPage = 1;
    nextSprStore.load();
    Ext.getCmp('windowp').show();
}

function DisAgree() {
    var spyj = '';
    if (Ext.getCmp('winspyj').getValue() == '') {
        spyj = '工单退回'
    } else {
        spyj = Ext.getCmp('winspyj').getValue();
    }
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/TaskComplete',
        type: 'ajax',
        method: 'POST',
        params: {
            taskId: taskId,
            idea: '退回',
            parName: [V_NEXT_SETP, "flow_yj",],
            parVal: [Ext.getCmp('nextSpr').getValue(), spyj],
            processKey: $.url().param("ProcessDefinitionKey"),
            businessKey: $.url().param("V_ORDERGUID"),
            V_STEPCODE: V_STEPCODE,
            V_STEPNAME: V_STEPNAME,
            V_IDEA: '退回',
            V_NEXTPER: Ext.getCmp('nextSpr').getValue(),
            V_INPER: Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            window.opener.QueryTab();
            window.opener.QuerySum();
            window.opener.QueryGrid();
            window.close();
            window.opener.OnPageLoad();
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

function DisAgreeP() {
    var spyj = '';
    if (Ext.getCmp('winspyjp').getValue() == '') {
        spyj = '验收驳回'
    } else {
        spyj = Ext.getCmp('winspyjp').getValue();
    }
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/TaskComplete',
        type: 'ajax',
        method: 'POST',
        params: {
            taskId: taskId,
            idea: '未打印',
            parName: [V_NEXT_SETP, "flow_yj",],
            parVal: [Ext.getCmp('nextSprp').getValue(), spyj],
            processKey: $.url().param("ProcessDefinitionKey"),
            businessKey: $.url().param("V_ORDERGUID"),
            V_STEPCODE: V_STEPCODE,
            V_STEPNAME: V_STEPNAME,
            V_IDEA: '未打印',
            V_NEXTPER: Ext.getCmp('nextSpr').getValue(),
            V_INPER: Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            window.opener.QueryTab();
            window.opener.QuerySum();
            window.opener.QueryGrid();
            window.close();
            window.opener.OnPageLoad();
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
function GetBillMatByOrder2() {
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
//打开弹出层
function OpenDiv(show_div, bg_div) {
    document.getElementById(show_div).style.display = 'block';
    document.getElementById(bg_div).style.display = 'block';
    var bgdiv = document.getElementById(bg_div);
    bgdiv.style.width = document.body.scrollWidth;
// bgdiv.style.height = $(document).height();
    $("#" + bg_div).height($(document).height());
}

//关闭弹出层
function CloseDiv(show_div, bg_div) {
    document.getElementById(show_div).style.display = 'none';
    document.getElementById(bg_div).style.display = 'none';
}

function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}


function loadSetMat(){
    MATSIGN=1;

}

function matChangeFlow(){
    var FistSpPerCode="";
    var FistSpPerName="";
    Ext.Ajax.request({//流程第一审批人
        url: AppUrl + 'dxfile/PM_ACTIVITI_STEP_LOG_SEL',
        type: 'post',
        async: false,
        params: {
            V_GUID: V_ORDERGUID,//$("#V_ORDERGUID").val(),
            V_PRO_GUID: ProcessDefinitionKey,
            V_BEFORE_STEP: 'start'

        },
        success: function (response) {
            var resp=Ext.decode(response.responseText);
            if (resp.list.length>0) {
                FistSpPerCode=resp.list[0].V_NEXTPER;
                FistSpPerName=resp.list[0].V_PERSONNAME;
            }
        }
    });

    Ext.Ajax.request({//下一步流程和审批步骤
        url: AppUrl + 'hp/PM_ACTIVITI_PROCESS_PER_SEL',
        type: 'post',
        async: false,
        params: {
            V_V_ORGCODE:V_V_ORGCODE,// $("#V_ORGCODE").val(),
            V_V_DEPTCODE: V_V_DEPTCODE,
            V_V_REPAIRCODE: V_V_DEPTCODEREPARIR,
            V_V_FLOWTYPE: 'WORK',
            V_V_FLOW_STEP: $.url().param("TaskDefinitionKey"),
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_SPECIALTY: '%',
            V_V_WHERE: '修改'
        },
        success: function (response) {
            var resp=Ext.decode(response.responseText);
            if (resp.list.length>0) {
                // FistSpPerCode=resp.list[0].V_PERSONCODE;
                // FistSpPerName=resp.list[0].V_PERSONNAME;
                processKey = resp.RET;
                V_STEPNAME = resp.list[0].V_V_FLOW_STEPNAME;
                V_NEXT_SETP = resp.list[0].V_V_NEXT_SETP;
            }
        }
    });
    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: AppUrl + 'mm/SetMat',
        params: {
            V_V_ORDERGUID:V_ORDERGUID,// $("#V_ORDERGUID").val(),
            x_personcode: Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.V_CURSOR == '1') {
                Ext.Ajax.request({
                    url: AppUrl + 'Activiti/TaskComplete',
                    type: 'ajax',
                    method: 'POST',
                    params: {
                        taskId: taskId,
                        idea: '修改',
                        parName: [V_NEXT_SETP, "flow_yj"],
                        parVal: [FistSpPerCode, '物料修改重新审批'],//$("#selApprover").val()
                        processKey: processKey,
                        businessKey:V_ORDERGUID,// $.url().param("V_ORDERGUID"),
                        V_STEPCODE: V_STEPCODE,
                        V_STEPNAME: V_STEPNAME,
                        V_IDEA: '物料修改重新审批',
                        V_NEXTPER: FistSpPerCode,//$("#selApprover").val(),
                        V_INPER: Ext.util.Cookies.get('v_personcode')
                    },
                    success: function (response) {
                        var resp = Ext.decode(response.responseText);
                        if (resp.ret == '任务提交成功') {
                            Ext.Ajax.request({
                                url: AppUrl + 'hp/PRO_ACTIVITI_FLOW_AGREE',
                                method: 'POST',
                                async: false,
                                params: {
                                    'V_V_ORDERID': V_ORDERGUID,//$("#V_ORDERGUID").val(),
                                    'V_V_PROCESS_NAMESPACE': 'WorkOrder',
                                    'V_V_PROCESS_CODE': processKey,
                                    'V_V_STEPCODE': V_STEPCODE,
                                    'V_V_STEPNEXT_CODE': V_NEXT_SETP
                                },
                                success: function (ret) {
                                    var resp = Ext.JSON.decode(ret.responseText);
                                    if (resp.V_INFO == 'success') {
                                        workMatChangeUpdt();
                                        window.opener.QueryTab();
                                        window.opener.QuerySum();
                                        window.opener.QueryGrid();
                                        window.close();
                                        window.opener.OnPageLoad();
                                    }
                                }
                            });
                        } else {
                            Ext.MessageBox.alert('提示', '任务提交失败');
                        }
                    },
                    failure: function (response) {//访问到后台时执行的方法。
                        Ext.MessageBox.show({
                            title: '错误',
                            msg: response.responseText,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        })
                    }
                });
            }
            else {
                Ext.Ajax.request({
                    method: 'POST',
                    async: false,
                    url: AppUrl + 'zdh/PRO_PM_WORKORDER_SEND_UPDATE',
                    params: {
                        V_V_ORDERGUID: V_ORDERGUID,//$("#V_ORDERGUID").val(),
                        V_V_SEND_STATE: "失败"
                    },
                    success: function (response) {
                        alert("工单创建失败：" + $("#V_ORDERID").html());
                        history.go(0);
                    }
                });
            }
        }
    });
}
//查找是否物料有改变
function workMatChangeSel(){
    Ext.Ajax.request({
        url:AppUrl+'dxfile/PRO_MAT_CHANGE_SIGN_SEL',
        type:'POST',
        async:false,
        params:{
            V_WORKGUID:V_ORDERGUID,//$("#V_ORDERGUID").val(),
            V_SIGN:''
        },
        success:function(ret){
            var resp=Ext.decode(ret.responseText);
            if(resp.RET!=undefined){
                returnMatSign=resp.RET;
            }
        }
    });
}
//物料改变值状态
function workMatChangeUpdt(){
    Ext.Ajax.request({
        url:AppUrl+'dxfile/PRO_WORKORDER_MAT_CHANGE_SIGN_UPD',
        type:'POST',
        async:false,
        params:{
            V_WORKGUID:V_ORDERGUID,//$("#V_ORDERGUID").val(),
            V_SIGN:'0'
        },
        success:function(ret){
            var resp=Ext.decode(ret.responseText);

        }
    });
}

//附件上传
function _fjsc(){
    Ext.data.StoreManager.lookup("fileview").load();
    Ext.getCmp("fileUpwin").show();
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