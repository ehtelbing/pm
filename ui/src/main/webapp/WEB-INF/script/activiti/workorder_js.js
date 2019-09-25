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
var ProcessDefinitionKey="";
var Assignee = '';
var AssigneeName="";
var MATSIGN=0;
var returnMatSign="";
var V_V_EQUCODE="";
if (location.href.split('?')[1] != undefined) {
    V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
    V_DBGUID = Ext.urlDecode(location.href.split('?')[1]).V_DBGUID;
    V_FLOWSTEP = Ext.urlDecode(location.href.split('?')[1]).V_FLOWSTEP;
    ProcessInstanceId = Ext.urlDecode(location.href.split('?')[1]).ProcessInstanceId;
    ProcessDefinitionKey=Ext.urlDecode(location.href.split('?')[1]).ProcessDefinitionKey;
}
var selectID = [];
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

            }

        }
    });

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

            }

        }
    });
    var nextSprStoreb = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'nextSprStoreb',
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

              /*  Ext.getCmp('nextSprb').select(store.first());
                var list = Ext.getCmp("nextSprb").getStore().data.items;
                for (var i = 0; i < list.length; i++) {
                    if (list[i].raw.V_PERSONCODE == Ext.util.Cookies.get('v_personcode')) {

                        Ext.getCmp("nextSprb").setValue(Ext.util.Cookies.get('v_personcode'));
                    }
                    if (list[i].raw.V_PERSONCODE == Assignee) {

                        Ext.getCmp("nextSprb").setValue(Assignee);

                    }


                }*/
            }

        }
    });
    var nextSprS = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'nextSprS',
        // fields: ['V_PERSONCODE', 'V_PERSONNAME', 'V_V_NEXT_SETP', 'V_V_FLOW_STEPNAME'],
        fields: ['YG_NO', 'YGXM', 'V_PERSONCODE', 'V_PERSONNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            // url: AppUrl + 'hp/PM_ACTIVITI_PROCESS_PER_SEL',
            url: AppUrl + 'dxfile/WORKCTR_TO_PERCODE_SEL',
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
               store.insert(records.length,{V_PERSONCODE:Assignee,V_PERSONNAME:AssigneeName});
                /*Ext.getCmp('nextSprb').select(store.first());
                var list = Ext.getCmp("nextSprb").getStore().data.items;
                for (var i = 0; i < list.length; i++) {
                    if (list[i].raw.V_PERSONCODE == Ext.util.Cookies.get('v_personcode')) {
                        Ext.getCmp("nextSprb").setValue(Ext.util.Cookies.get('v_personcode'));
                    }
                    if (list[i].raw.V_PERSONCODE == Assignee) {
                        Ext.getCmp("nextSprb").setValue(Assignee);
                    }
                }*/
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
                }, {
                    xtype: 'button',
                    text: '确定',
                    icon: imgpath + '/saved.png',
                    style: ' margin: 5px 0px 0px 15px',
                    handler: _reserveWorkOrder
                }]
            }
        ]
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
                    //baseCls: 'margin-bottom',
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

    var window1 = Ext.create('Ext.window.Window', {
        id: 'window1',
        width: 400,
        height: 180,
        bodyPadding: 15,
        layout: 'vbox',
        title: '选择下一步接收人',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        items: [addInputPanel]
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
    var addInputPanelb = Ext.create('Ext.form.Panel', {
        id: 'addInputPanelb',
        region: 'north',
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
                items: [
                   /* {
                    id: 'nextSprb',
                    xtype: 'combo',
                    store: nextSprS,//nextSprStoreb,
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
                },*/
                    {
                    xtype: 'button',
                    text: '确定',
                    icon: imgpath + '/saved.png',
                    style: ' margin: 5px 0px 0px 15px',
                    handler: ConfirmAccept
                }]
            }
        ]
    });
    var nextPerGrid=Ext.create('Ext.grid.Panel',{
        id:'nextPerGrid',
        store:nextSprS,
        region : 'center',
        split: true,
        autoScroll:true,
        selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columnLines: true,
        border: true,
        tbar:[{
            xtype: 'button',
            text: '确定',
            icon: imgpath + '/saved.png',
            style: ' margin: 5px 0px 0px 15px',
            handler: ConfirmAccept
        }],
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            // {text: '设备名称',width: 140, dataIndex: 'V_EQUNAME', align: 'center',renderer:atleft},
            {text: '姓名',width: 120, dataIndex: 'V_PERSONNAME', align: 'center'},
            {text: '编码',width: 300, dataIndex: 'V_PERSONCODE', align: 'center'}
        ]
    });
    var windowb = Ext.create('Ext.window.Window', {
        id: 'windowb',
        width: 370,
        height: 150,
        bodyPadding: 15,
        layout: 'border',
        title: '选择反馈接收人',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        // items: [addInputPanelb,nextPerGrid]
        items:[nextPerGrid]
    });
    bindDate("D_FACT_START_DATE");
    bindDate("D_FACT_FINISH_DATE");

    // NowDate_b("D_FACT_START_DATE");
    // NowDate_e("D_FACT_FINISH_DATE");

    loadOrder();

    loadTaskGrid();

    loadMatList();

    loadOther();

    getTaskId();

    getAssignee();
    $("#btnTask").click(function () {

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
        var ret = window.open(AppUrl + 'page/PM_070204/index.html?V_ORDERGUID=' + V_ORDERGUID
            + '&V_DEPTREPAIRCODE=' + V_V_REPAIRCODE
            + '&V_EQUCODE=' + $('#V_EQUIP_NO').html()
            + '&V_V_ORGCODE=' + V_V_ORGCODE
            + '&V_V_DEPTCODE=' + V_V_DEPTCODE
            + '&V_EQUTYPE=' + V_EQUTYPE
            + '&V_TEAMCODE=' + V_TEAMCODE + '', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
    });

    $("#btnGS").click(function () {
        ReturnIsToTask();
    });

    Ext.data.StoreManager.lookup('workCenterStore').on('load', function () {
        Ext.getCmp('addgzzx').select(Ext.data.StoreManager.lookup('workCenterStore').getAt(0));
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
            for(var i=0;i<=resp.list.length;i++){
                if(resp.list[i].ActivityName=="Start"){
                    Assignee = resp.list[i].Assignee;
                    AssigneeName=resp.list[i].AssigneeName;
                    break;
                }
            }
            // Assignee = resp.list[0].Assignee;
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
                V_V_EQUCODE=resp.list[0].V_EQUIP_NO;
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
           //     $("#D_FACT_START_DATE").html(resp.list[0].D_FACT_START_DATE);
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
                $("#I_OTHERHOUR").html(resp.list[0].I_OTHERHOUR);
                $("#V_OTHERREASON").html(resp.list[0].V_OTHERREASON);
                $("#V_REPAIRCONTENT").html(resp.list[0].V_REPAIRCONTENT);

                $("#V_WBS").html(resp.list[0].V_WBS);
                $("#V_WBS_TXT").html(resp.list[0].V_WBS_TXT);

                V_TEAMCODE = resp.list[0].V_WXTEAM;


                $("#V_REPAIRSIGN").val( Ext.util.Cookies.get('v_personname2'))
                $("#V_REPAIRPERSON").val( Ext.util.Cookies.get('v_personname2'))
                GetBillMatByOrder();
            }
        }
    });
}

function loadTeam(wxteam) {

    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: AppUrl + 'zdh/teamname_sel',
        params: {
            IN_CLASSCODE: wxteam
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            for (var i = 0; i < resp.list.length; i++) {
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

            for (var i = 0; i < resp.list.length; i++) {
                if (i == 0) {
                    if (resp.list[i].V_ROLECODE == "11") {
                        $("#V_TEAMPERSON").html(resp.list[i].V_PERSONNAME + "（班长）");
                    }
                    else {
                        $("#V_TEAMPERSON").html(resp.list[i].V_PERSONNAME);
                    }
                }
                else {
                    if (resp.list[i].V_ROLECODE == "11") {
                        $("#V_TEAMPERSON").append("," + resp.list[i].V_PERSONNAME + "（班长）");
                    }
                    else {
                        $("#V_TEAMPERSON").append("," + resp.list[i].V_PERSONNAME);
                    }
                }
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

function CreateOrderGUID() {
    Ext.Ajax.request({
        url: AppUrl + 'zdh/orderid_create',
        method: 'POST',
        async: false,
        params: {
            V_V_PERCODE: $.cookies.get('v_personcode'),
            V_V_PERNAME: Ext.util.Cookies.get('v_personname2'),
            V_V_ORGCODE: $("#V_ORGNAME").val(),
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
        url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_OPERATIONS',
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
            // var ret = window.open(AppUrl + 'page/PM_050103/index.html?flag=all&V_ORDERGUID=' + V_ORDERGUID + '', '', '_blank',  'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
            var ret = window.open(AppUrl + 'page/PM_050104/index.html?flag=all&V_ORDERGUID=' + V_ORDERGUID +'&STEP='+document.title+ '', '', '_blank',  'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
            loadMatList();
        }
    });
}

$('#btnGJJJ').live('click', function () {
    var ret = window.showModalDialog(AppUrl + '/No41070103/Index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val() + '', '41070103', 'dialogHeight:500px;dialogWidth:800px');
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

function orderAccept() {
    OrderSave();
    orderaccept1();
}

function orderaccept1() {
    var flag = 1;
    Ext.Ajax.request({
        url: AppUrl + 'zdh/PRO_PM_WORKORDER_SPARE_VIEW',
        type: 'post',
        params: {
            V_V_ORDERGUID: V_ORDERGUID
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if (resp.list == null || resp.list == "") {
                accept();
            }
            else {
                var temp = 0;
                var number = 0;
                for (var i = 0; i < resp.list.length; i++) {
                    Ext.Ajax.request({
                        url: AppUrl + 'zdh/WX_INF_FILE_SEL',
                        type: 'post',
                        params: {
                            V_V_ORDERGUID: V_ORDERGUID,
                            V_V_MATERIALGUID: resp.list[i].V_MATERIALCODE,
                            V_V_FILENAME: '%'
                        },
                        success: function (ret) {
                            number++;
                            var resp1 = Ext.JSON.decode(ret.responseText);
                            if (resp1.list != null && resp1.list != "") {
                                temp++;
                            }
                            if (number == i) {
                                if (temp == i) {
                                    accept();
                                }
                                else {
                                    alert("每个物料需要上传至少一张图片,请检查您上传的文件!");
                                }
                            }
                        }
                    });
                }
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
    s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " 08:30:00";
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
    s = year + "-" + dateFomate(month) + "-" + dateFomate(date) + " 16:30:00";
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
    s = year + "-" + dateFomate(month) + "-" + dateFomate(date);
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

function OrderPerson() {
    windowquery();
    Ext.getCmp('awindow').show();
}

function orderonPrint() {
    selectID.push(V_ORDERGUID);
    window.open(AppUrl + "page/No410101/indexn.html", selectID,
        "dialogHeight:700px;dialogWidth:1100px");
}

function windowquery() {
    Ext.data.StoreManager.lookup('workCenterStore').load({
        params: {
            V_V_DEPTREPAIRCODE: V_DEPTREPAIRCODE
        }
    });
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
            IN_ORDERGUID: V_ORDERGUID
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            Ext.data.StoreManager.lookup('agridStore').loadData(resp.list);
        }
    });
    slecode = V_TEAMCODE;
}

function todel(view, item, colIndex, rowIndex, e) {
    agridStore.remove(agridStore.data.items[colIndex]);
}

function p_query() {

    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/Basic/addperson.html?depart=' + V_DEPTREPAIRCODE + '&classcode=' + V_TEAMCODE + '&V_ORDERGUID=' + V_ORDERGUID, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
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
            IN_DEPARTCODE: V_DEPTREPAIRCODE,
            IN_CLASSNAME: Ext.getCmp('addmzmc').getValue(),
            IN_WORKCODE: Ext.getCmp('addgzzx').getValue(),
            IN_PERSONCODE: arr.toString(),
            IN_ORDERGUID: V_ORDERGUID
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp[0] == 'SUCCESS') {

            }
        }
    });
    Ext.getCmp('awindow').hide();
    //loadTeam(V_TEAMCODE);
}

function OrderBooked() {
    OrderSave();
    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: AppUrl + 'zdh/order_booked',
        params: {
            V_V_ORDERGUID: V_ORDERGUID
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.list[0].V_INFO == 'SUCCESS') {
                window.opener.QueryTab();
                window.opener.QuerySum();
                window.opener.QueryGrid();
                window.close();
                window.opener.gridquery();
            }
        }
    });
}

function OrderBooked2() {
    if ($("#I_OTHERHOUR").val() == '' || $("#V_OTHERREASON").val() == '') {
        Ext.MessageBox.alert('提示', '请填写逾期时间和逾期原因');
        return false;
    }
    var nextSprStore = Ext.data.StoreManager.lookup('nextSprStore');
    nextSprStore.proxy.extraParams = {
        V_V_ORGCODE: V_V_ORGCODE,
        V_V_DEPTCODE: V_V_DEPTCODE,
        V_V_REPAIRCODE: V_V_REPAIRCODE,
        V_V_FLOWTYPE: 'WORK',
        V_V_FLOW_STEP: V_STEPCODE,
        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_SPECIALTY: '%',
        V_V_WHERE: '预留工单'

    };
    nextSprStore.currentPage = 1;
    nextSprStore.load();
    Ext.getCmp('window1').show();
}

function _preOrderissued() {
    selectID.push(V_ORDERGUID);
    workMatChangeSel();
    if(MATSIGN==1||returnMatSign=="1"){
        matChangeFlow();
    }else {
        var nextSprStore2 = Ext.data.StoreManager.lookup('nextSprStore2');
        nextSprStore2.proxy.extraParams = {
            V_V_ORGCODE: V_V_ORGCODE,
            V_V_DEPTCODE: V_V_DEPTCODE,
            V_V_REPAIRCODE: V_V_REPAIRCODE,
            V_V_FLOWTYPE: 'WORK',
            V_V_FLOW_STEP: V_STEPCODE,
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_SPECIALTY: '%',
            V_V_WHERE: '已接收'

        };
        nextSprStore2.currentPage = 1;
        nextSprStore2.load();
        Ext.getCmp('window2').show();
    }
}

function activitiOrderissued() {
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/TaskComplete',
        type: 'ajax',
        method: 'POST',
        params: {
            taskId: taskId,
            idea: '已接收',
            parName: [V_NEXT_SETP, "flow_yj"],
            parVal: [Ext.getCmp('nextSpr2').getValue(), '已接收'],
            processKey: processKey,
            businessKey: $.url().param("V_ORDERGUID"),
            V_STEPCODE: V_STEPCODE,
            V_STEPNAME: V_STEPNAME,
            V_IDEA: '已接收',
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

function _reserveWorkOrder() {
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/TaskComplete',
        type: 'ajax',
        method: 'POST',
        params: {
            taskId: taskId,
            idea: '预留工单',
            parName: [V_NEXT_SETP, "flow_yj"],
            parVal: [Ext.getCmp('nextSpr').getValue(), '请审批'],
            processKey: processKey,
            businessKey: $.url().param("V_ORDERGUID"),
            V_STEPCODE: V_STEPCODE,
            V_STEPNAME: V_STEPNAME,
            V_IDEA: '预留工单',
            V_NEXTPER: Ext.getCmp('nextSpr').getValue(),
            V_INPER: Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            Ext.Ajax.request({
                method: 'POST',
                async: false,
                url: AppUrl + 'hp/PRO_WX_ORDER_BOOKED',
                params: {
                    V_V_ORDERGUID: V_ORDERGUID,
                    V_V_YQTIME: $("#I_OTHERHOUR").val(),
                    V_V_YQYY: $("#V_OTHERREASON").val()
                },
                success: function (response) {
                    var resp = Ext.decode(response.responseText);
                    if (resp.list[0].V_INFO == 'SUCCESS') {
                        window.opener.QueryTab();
                        window.opener.QuerySum();
                        window.opener.QueryGrid();
                        window.close();
                        window.opener.OnPageLoad();
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
        url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_JS_F',
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
                //Ext.example.msg('操作信息', '反馈完成');
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

function OrderBooked() {
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/TaskComplete',
        type: 'ajax',
        method: 'POST',
        params: {
            taskId: taskId,
            idea: '预留工单',
            parName: [V_NEXT_SETP, "flow_yj"],
            parVal: [$("#selApprover").val(), '请审批'],
            processKey: processKey,
            businessKey: $.url().param("V_ORDERGUID"),
            V_STEPCODE: V_STEPCODE,
            V_STEPNAME: V_STEPNAME,
            V_IDEA: '请审批！',
            V_NEXTPER: $("#selApprover").val(),
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

    /*OrderSave();
    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: AppUrl + 'zdh/order_booked',
        params: {
            V_V_ORDERGUID: V_ORDERGUID
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.list[0].V_INFO == 'SUCCESS') {
                window.close();
                window.opener.gridquery();
            }
        }
    });*/
}

function ReturnIsToTask() {

    //var ret = window.showModalDialog(AppUrl+'/No41100101/Index.html?V_ORDERGUID=' + $("#V_ORDERGUID").val() + '&V_DEPTCODEREPARIR=' + $("#V_DEPTCODEREPARIR").val() + '', '', 'dialogHeight:500px;dialogWidth:800px');
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
                var ret = window.open(AppUrl
                    + 'page/No41020102/Index.html?V_ORDERGUID='
                    + $.url().param("V_ORDERGUID") + '&V_DEPTCODEREPARIR='
                    + V_V_REPAIRCODE + '', '',
                    'dialogHeight:500px;dialogWidth:800px');
                loadTaskGrid();
            }
        }
    });
}

function feedBack() {
    selectID.push(V_ORDERGUID);
    workMatChangeSel();
    if(MATSIGN==1||returnMatSign=="1"){
        // matChangeFlow(); //驳回给发起人
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
                }
            }
        });
        var nextSprStoreb = Ext.data.StoreManager.lookup('nextSprStoreb');
        nextSprStoreb.proxy.extraParams = {
            V_V_ORGCODE: V_V_ORGCODE,
            V_V_DEPTCODE: V_V_DEPTCODE,
            V_V_REPAIRCODE: V_V_REPAIRCODE,
            V_V_FLOWTYPE: 'WORK',
            V_V_FLOW_STEP: V_STEPCODE,
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_SPECIALTY: '%',
            V_V_WHERE: '已反馈'

        };

        nextSprStoreb.currentPage = 1;
        nextSprStoreb.load();
        Ext.data.StoreManager.lookup('nextSprS').load({
            params:{
                V_V_REPAIRCODE:V_V_REPAIRCODE,
                V_V_EQUCODE:V_V_EQUCODE
            }
        });
        Ext.getCmp('windowb').show();
    }else {
        var nextSprStoreb = Ext.data.StoreManager.lookup('nextSprStoreb');
        nextSprStoreb.proxy.extraParams = {
            V_V_ORGCODE: V_V_ORGCODE,
            V_V_DEPTCODE: V_V_DEPTCODE,
            V_V_REPAIRCODE: V_V_REPAIRCODE,
            V_V_FLOWTYPE: 'WORK',
            V_V_FLOW_STEP: V_STEPCODE,
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_SPECIALTY: '%',
            V_V_WHERE: '已反馈'

        };

        nextSprStoreb.currentPage = 1;
        nextSprStoreb.load();
        Ext.data.StoreManager.lookup('nextSprS').load({
            params:{
                V_V_REPAIRCODE:V_V_REPAIRCODE,
                V_V_EQUCODE:V_V_EQUCODE
            }
        });
        Ext.getCmp('windowb').show();
    }
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
    var choicePer="";
    var nextPercode=Ext.getCmp("nextPerGrid").getSelectionModel().getSelection();
    if(nextPercode.length>1){
        alert("请选择一位下一步审批人"); return false;
    }else{
        choicePer=nextPercode[0].data.V_PERSONCODE
    }

    //var test = new Array(wuliaochaxunlist);
    //console.log(test);
    /* if(wuliaochaxunlist.length==0){

     }else{
         for (var i = 0; i < wuliaochaxunlist.length; i++) {
             if (wuliaochaxunlist[i].I_ACTUALAMOUNT != 0 && wuliaochaxunlist[i].FUJIAN_COUNT == 0) {
                 Ext.Msg.alert('失败','请上传附件');
                 //alert('请在物料信息列表序号为' + wuliaochaxunlist[i].sid + '的信息里添加至少一个附件');
                 return;
             }
         }
     }*/

    Ext.Ajax.request({
        url: AppUrl + 'Activiti/TaskComplete',
        type: 'ajax',
        method: 'POST',
        params: {
            taskId: taskId,
            idea: '已反馈',
            parName: [V_NEXT_SETP, "flow_yj"],
            // parVal: [Ext.getCmp('nextSprb').getValue(), '已反馈'],
            parVal: [choicePer, '已反馈'],
            processKey: processKey,
            businessKey: $.url().param("V_ORDERGUID"),
            V_STEPCODE: V_STEPCODE,
            V_STEPNAME: V_STEPNAME,
            V_IDEA: '已反馈',
            // V_NEXTPER: Ext.getCmp('nextSprb').getValue(),
            V_NEXTPER: choicePer,
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
                        //Ext.example.msg('操作信息', '反馈完成');
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

                                /*if (respguid.list.length >0) {

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
                                }*/
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

function print() {
    selectID.push(V_ORDERGUID);
    workMatChangeSel();
    if(MATSIGN==1||returnMatSign=="1"){
        matChangeFlow();
    }else {
        window.open(AppUrl + "page/No410101/indexn.html", selectID,
            "dialogHeight:700px;dialogWidth:1100px");
    }
}

function GetBillMatByOrder() {
    Ext.Ajax.request({
        url: AppUrl + 'mm/WS_EquipGetBillMaterialByOrderService',
        method: 'POST',
        async: false,
        params: {
            V_V_ORDERGUID: $.url().param("V_ORDERGUID"),
            V_V_ORDERID: $("#V_ORDERID").html(),
            x_personcode: Ext.util.Cookies.get('v_personcode')
        },
        success: function (resp) {

        }
    });
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
            V_V_REPAIRCODE: V_V_REPAIRCODE,
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
        url:AppUrl+'dxfile/PRO_WORKORDER_MAT_CHANGE_UPD',
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