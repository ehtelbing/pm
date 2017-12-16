/// <reference path="../Shared/ext-all-debug-w-comments.js" />
var I_ID = -1;
var flag = "";
var arr = [];
var V_ORDERGUID = null;
if (location.href.split('?')[1] != undefined) {
    V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
    V_TEAMCODE = Ext.urlDecode(location.href.split('?')[1]).V_TEAMCODE;
    V_DEPTREPAIRCODE= Ext.urlDecode(location.href.split('?')[1]).V_DEPTREPAIRCODE;
}
var gridStore = Ext.create('Ext.data.Store', {
    id: 'gridStore',
    autoLoad: true,
    fields: ['V_ACTIVITY', 'V_WORK_CENTER', 'V_DESCRIPTION', 'I_WORK_ACTIVITY', 'I_DURATION_NORMAL', 'I_ID',
    'V_JJ_NAME','V_GJ_NAME','V_JSQY_NAME','V_AQSC_NAME','V_GUID','CLASSNAME','V_PER_LIST'],
    proxy: {
        type: 'ajax',
        url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_OPERATIONS',
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            V_V_ORDERGUID : V_ORDERGUID
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var workCenterStore = Ext.create('Ext.data.Store', {
    id: 'workCenterStore',
    autoLoad: true,
    fields: ['V_SAP_WORKNAME', 'V_SAP_WORK'],
    proxy: {
        type: 'ajax',
        url: AppUrl + 'zdh/workcenter_sel',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            V_V_DEPTREPAIRCODE : Ext.urlDecode(location.href.split('?')[1]).V_DEPTREPAIRCODE
        }
    }
});



var gridPanel = Ext.create('Ext.panel.Panel', {
    region: 'center',
    layout: 'border',
    items: [{
        xtype: 'gridpanel',
        id: 'grid',
        region: 'center',
        store: 'gridStore',
        columnLines: true,
        selType: 'checkboxmodel',
        multiSelect: true,
        autoScroll: true,
        columns: [
            { text: '工序', width: 80, align: 'center', dataIndex: 'V_ACTIVITY' },
            { text: '工作中心', width: 90, align: 'center', dataIndex: 'V_WORK_CENTER' },
            { text: '工序内容', width:365, align: 'center', dataIndex: 'V_DESCRIPTION' },
            { text: '额定时间', width: 80, align: 'center', dataIndex: 'I_WORK_ACTIVITY' },
            { text: '额定人数', width: 80, align: 'center', dataIndex: 'I_DURATION_NORMAL' },
            { text: '机具', width: 80, align: 'center', dataIndex: 'V_JJ_NAME' },
            { text: '工具', width: 80, align: 'center', dataIndex: 'V_GJ_NAME' },
            { text: '技术要求', width: 80, align: 'center', dataIndex: 'V_JSQY_NAME'},
            { text: '安全措施', width: 80, align: 'center', dataIndex: 'V_AQSC_NAME'},
            { text: '检修班组', width: 80, align: 'center', dataIndex: 'CLASSNAME'},
            { text: '检修人员', width: 80, align: 'center', dataIndex: 'V_PER_LIST'}
        ]
        , dockedItems: [{
            xtype: 'panel', region: 'north', height: 30,frame:true, layout:'column',
            items: [{
                xtype: 'button', text: '添加', style: 'margin:0px 20px  0px 100px', icon : imgpath + '/add.png', width: 100, listeners: { click: OnclickAddButtonLoad }
            }, {
                xtype: 'button', text: '修改', style: 'margin:0px 20px  0px 20px', icon: imgpath + '/edit.png', width: 100, listeners: { click: OnclickUpdateButtonLoad }
            }, {
                xtype: 'button', text: '删除', style: 'margin:0px 20px  0px 20px', icon: imgpath + '/delete.png', width: 100, listeners: { click: OnClickDeleteButton }
            }, {
                xtype: 'button', text: '添加完成', style: 'margin:0px 20px  0px 20px',icon: imgpath + '/saved.png', width: 100, listeners: { click: OnClickFinishButton }
            }]
        }]
    }]
});

var windowLayout = {
    id: 'dialog',
    closeAction: 'hide',
    title: '编辑',
    height: 500,
    width: 500,
    modal: true,
    frame:true,
    defaults: {
        labelAlign: 'right'
    },
    layout: {
        type: 'table',
        columns: '2'
    },
    items: [{xtype : 'textfield',id:'jxgxbm',hidden : true},{
        xtype: 'combo', id: 'selWorkCenter',editable:false, fieldLabel: '工作中心:', labelAlign: 'right', style: 'margin:20px 0px 5px 0px', store: 'workCenterStore', queryModel: 'local', displayField: 'V_SAP_WORKNAME', valueField: 'V_SAP_WORK', width:400,colspan : 2
    }, {
        xtype: 'textareafield', fieldLabel: '工序内容:', labelAlign: 'right', grow: true, id: 'workContent', allowBlank: false, width: 400, height: 100,colspan : 2

    }, {
        xtype: 'numberfield', fieldLabel: '额定时间:', labelAlign: 'right', id: 'actualTime', value: 1, minValue: 1, width: 400,colspan : 2
    }, {
        xtype: 'textfield', fieldLabel: '班组', labelAlign: 'right', id: 'banzu',  width: 400,colspan : 2
    },{
        xtype: 'textfield',
        id : 'personSel',
        fieldLabel: '人员选择',
        readOnly : true,
        width: 365
    },{
        xtype : 'button',
        text : '+',
        handler : selectPerson,
        width : 25,
        margin:'0px 0px 0px -7px'
    }, {
        xtype: 'numberfield',
        fieldLabel: '额定人数:',
        labelAlign: 'right',
        id: 'actualPeople',
        value:'0',
        minValue: 1,
        width: 400,
        readOnly:true,
        colspan : 2
    }, {
        xtype: 'textfield',
        id : 'jxcar',
        fieldLabel: '检修机具',
        readOnly : true,
        width: 365
    },{
        xtype : 'button',
        text : '+',
        handler : selectJXCAR,
        //handler : selectGJJJ,
        width : 25,
        margin:'0px 0px 0px -7px'
    },{
        xtype: 'textfield',
        id : 'jxtool',
        fieldLabel: '检修工具',
        readOnly : true,
        width: 365
    },{
        xtype : 'button',
        text : '+',
        handler : selectJXTOOL,
        width : 25,
        margin:'0px 0px 0px -7px'
    },{
        xtype: 'textfield',
        id : 'jxtechnology',
        fieldLabel: '检修技术要求',
        readOnly : true,
        width: 365
    },{
        xtype : 'button',
        text : '+',
        handler : selectJXTECHNOLOGY,
        width : 25,
        margin:'0px 0px 0px -7px'
    },{
        xtype: 'textfield',
        id : 'jxsafe',
        fieldLabel: '检修安全措施',
        readOnly : true,
        width: 365
    },{
        xtype : 'button',
        text : '+',
        handler : selectJXSAFE,
        width : 25,
        margin:'0px 0px 0px -7px'
    },{
        xtype: 'toolbar', border: 0, layout: 'column', items: [{ xtype: 'button', text: '保存', pressed: true, icon: imgpath + '/filesave.png', style: 'margin:20px 0px 5px 100px', width: 100, listeners: { click: OnClickSaveButton} },
            { xtype: 'button', text: '关闭', pressed: true, style: 'margin:20px 0px 0px 80px', width: 100, listeners: { click: OnClickCancerButton}}]
    }]
}


function OnclickAddButtonLoad() {
    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: AppUrl + 'zdh/teamedit_sel',
        params: {
            IN_CLASSCODE: V_TEAMCODE
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            Ext.getCmp('banzu').setValue(resp.list[0].V_CLASS_NAME);
        }
    });
    I_ID = '-1';
    Ext.getCmp('jxgxbm').setValue(guid());
    Ext.getCmp('workContent').setValue('');
    Ext.getCmp('actualTime').setValue('1');
    //Ext.getCmp('actualPeople').setValue('2');

    Ext.getCmp('jxcar').setValue('');
    Ext.getCmp('jxtool').setValue('');
    Ext.getCmp('jxtechnology').setValue('');
    Ext.getCmp('jxsafe').setValue('');
    Ext.getCmp('personSel').setValue('');
    flag = 1;
    Ext.getCmp('dialog').show();
}

function OnClickSaveButton() {
    Ext.Ajax.request({
        url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_SET',
        method: 'POST',
        params: {
            V_I_ID :  I_ID,
            V_V_ORDERGUID:V_ORDERGUID,
            V_V_DESCRIPTION:Ext.getCmp('workContent').getValue(),
            V_I_WORK_ACTIVITY:Ext.getCmp('actualTime').getValue(),
            V_I_DURATION_NORMAL:Ext.getCmp('actualPeople').getValue(),
            V_V_WORK_CENTER:Ext.getCmp('selWorkCenter').getValue(),
            V_I_ACTUAL_TIME:'0',
            V_I_NUMBER_OF_PEOPLE: '0',
            V_V_ID:'',
            V_V_GUID: Ext.getCmp('jxgxbm').getValue()
        }, success: function (response) {
            Ext.getCmp('dialog').hide();
            I_ID = -1;
            Ext.ComponentManager.get('grid').getStore().load();
        }
    });

    //保存班组和人员信息
    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: AppUrl + 'zdh/team_edit',
        params: {
            IN_CLASSCODE: V_TEAMCODE,
            IN_DEPARTCODE: V_DEPTREPAIRCODE,
            IN_CLASSNAME: Ext.getCmp('banzu').getValue(),
            IN_WORKCODE: Ext.getCmp('selWorkCenter').getValue(),
            IN_PERSONCODE: arr.toString(),
            IN_ORDERGUID : V_ORDERGUID
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp[0] == 'SUCCESS') {

            }
        }
    });
    //if (I_ID == '-1') {
    //    I_ID = -1;
    //    OnclickAddButtonLoad();
    //} else {
    //    Ext.getCmp('dialog').hide();
    //    I_ID = -1;
    //}
}

function OnclickUpdateButtonLoad() {
    var selectModel = Ext.getCmp('grid').getSelectionModel();
    if (!selectModel.hasSelection()) { Ext.MessageBox.alert('操作信息', '请选择要修改的信息.'); return; }
    var i = Ext.getCmp('grid').getSelectionModel().getSelection().length;
    if (i > 1) {
        Ext.MessageBox.alert('操作信息', '请选择一条数据进行修改.'); return;
    } else {
        var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
        Ext.getCmp('jxgxbm').setValue(seldata[0].data.V_GUID);
        for (i = 0; i < Ext.getCmp('grid').getSelectionModel().getSelection().length; i++) {
            I_ID = selectModel.getSelection()[i].data.I_ID;
            Ext.Ajax.request({
                url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_GET',
                method: 'POST',
                params: {
                    V_I_ID : selectModel.getSelection()[i].data.I_ID
                }, success: function (response) {
                    Ext.getCmp('selWorkCenter').select(Ext.JSON.decode(response.responseText).list[0].V_WORK_CENTER);
                    Ext.getCmp('workContent').setValue(Ext.JSON.decode(response.responseText).list[0].V_DESCRIPTION);
                    Ext.getCmp('actualTime').setValue(Ext.JSON.decode(response.responseText).list[0].I_WORK_ACTIVITY);
                    Ext.getCmp('actualPeople').setValue(Ext.JSON.decode(response.responseText).list[0].I_DURATION_NORMAL);
                }
            });

            Ext.Ajax.request({
                url: AppUrl + 'pm_19/PM_1917_JXGX_BYCODE_SEL',
                method: 'POST',
                async: false,
                params: {
                    V_V_JXGX_CODE : seldata[0].data.V_GUID
                },
                success: function (ret) {
                    var resp = Ext.JSON.decode(ret.responseText);
                    Ext.getCmp('jxcar').setValue(resp.list[0].V_JJ_NAME);
                    Ext.getCmp('jxtool').setValue(resp.list[0].V_GJ_NAME);
                    Ext.getCmp('jxtechnology').setValue(resp.list[0].V_JSQY_NAME);
                    Ext.getCmp('jxsafe').setValue(resp.list[0].V_AQSC_NAME);
                }
            });
            Ext.getCmp('personSel').setValue(selectModel.getSelection()[0].data.V_PER_LIST);
            Ext.getCmp('banzu').setValue(selectModel.getSelection()[0].data.CLASSNAME);
            flag = 0;
            Ext.getCmp('dialog').show();
        }
    };
}

//删除
function OnClickDeleteButton() {
    var selectModel = Ext.getCmp('grid').getSelectionModel();
    if (!selectModel.hasSelection()) { Ext.MessageBox.alert('操作信息', '请选择要删除的信息.'); return; }
    Ext.Msg.confirm("警告", "确定要删除吗？", function (button) {
        if (button != "yes") { return; }
        var i = Ext.getCmp('grid').getSelectionModel().getSelection().length;
        for (i = 0; i < Ext.getCmp('grid').getSelectionModel().getSelection().length; i++) {
            Ext.Ajax.request({
                url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_DEL',
                async:false,
                params: {
                    V_I_ID : selectModel.getSelection()[i].data.I_ID,
                    V_V_ORDERGUID : V_ORDERGUID
                },
                success: function (response) {
                }
            });

            Ext.Ajax.request({
                url: AppUrl + 'pm_19/PM_1917_JXGX_CHILD_DEL',
                method: 'POST',
                async: false,
                params: {
                    V_V_JXGX_CODE : selectModel.getSelection()[i].data.V_GUID
                },
                success: function (ret) {
                    var resp = Ext.JSON.decode(ret.responseText);
                    Ext.getCmp('dialog').hide();
                }
            });
        }
        Ext.ComponentManager.get('grid').getStore().load();
    });

}

function OnClickCancerButton() {

    if(flag == 1){
        Ext.Ajax.request({
            url: AppUrl + 'pm_19/PM_1917_JXGX_CHILD_DEL',
            method: 'POST',
            async: false,
            params: {
                V_V_JXGX_CODE : Ext.getCmp('jxgxbm').getValue()
            },
            success: function (ret) {
                var resp = Ext.JSON.decode(ret.responseText);
                Ext.getCmp('dialog').hide();
            }
        });
    }else{
        Ext.getCmp('dialog').hide();
    }

    //Ext.getCmp('dialog').hide();
    I_ID = -1;
}

function OnClickFinishButton() {

    window.opener.loadTaskGrid();
    window.close();
}

Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', gridPanel);
    Ext.create('Ext.window.Window', windowLayout);

    workCenterStore.on('load', function () {
        Ext.getCmp('selWorkCenter').select(Ext.data.StoreManager.get('workCenterStore').getAt(0));
    });

    Ext.getCmp('dialog').on("close",function(){
        if(flag == 1){
            Ext.Ajax.request({
                url: AppUrl + 'pm_19/PM_1917_JXGX_CHILD_DEL',
                method: 'POST',
                async: false,
                params: {
                    V_V_JXGX_CODE : Ext.getCmp('jxgxbm').getValue()
                },
                success: function (ret) {
                    var resp = Ext.JSON.decode(ret.responseText);
                }
            });
        }
    });
});

function guid() {
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

function selectJXCAR(){
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_191704/index.html?V_V_JXGX_CODE='+ Ext.getCmp('jxgxbm').getValue() +'&V_ORDERGUID='+V_ORDERGUID, '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}

function getReturnJXCAR(data){
    var ss = "";
    for(var i=0;i<data.length;i++){
        ss+=data[i];
    }
    Ext.getCmp('jxcar').setValue(ss);
}

function selectJXTOOL(){
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_191705/index.html?V_V_JXGX_CODE='+ Ext.getCmp('jxgxbm').getValue() , '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}

function getReturnJXTOOL(data){
    var ss = "";
    for(var i=0;i<data.length;i++){
        ss+=data[i];
    }
    Ext.getCmp('jxtool').setValue(ss);
}

function selectJXTECHNOLOGY(){
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_191708/index.html?V_V_JXGX_CODE='+ Ext.getCmp('jxgxbm').getValue() , '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}

function getReturnJXTECHNOLOGY(data){
    var ss = "";
    for(var i=0;i<data.length;i++){
        ss+=data[i];
    }
    Ext.getCmp('jxtechnology').setValue(ss);
}

function selectJXSAFE(){
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_191709/index.html?V_V_JXGX_CODE='+ Ext.getCmp('jxgxbm').getValue() , '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}

function getReturnJXSAFE(data){
    var ss = "";
    for(var i=0;i<data.length;i++){
        ss+=data[i];
    }
    Ext.getCmp('jxsafe').setValue(ss);
}

function selectPerson(){
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/Basic/addperson.html?depart='+V_DEPTREPAIRCODE+'&classcode='+V_TEAMCODE+'&V_ORDERGUID='+V_ORDERGUID, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}
function getPersonReturnValue(data){
    var sname = [];
    for(var i=0;i<data.length;i++){
        sname.push(data[i].data.V_PERSONNAME);
        arr.push(data[i].data.V_PERSONCODE);
    }
    Ext.getCmp('personSel').setValue(sname.toString());
    Ext.getCmp('actualPeople').setValue(data.length);
}
function selectGJJJ(){
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_09020101/index.html?V_ORDERGUID='+V_ORDERGUID , '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}
function getReturnGJJJ(data){
    Ext.getCmp('jxcar').setValue(data.toString());
}