var V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var V_ORDERGUID = "";
var taskId = '';
var V_STEPCODE = '';
var orgLoad2 = false;
var equFaultLoad2 = false;
var nextSprName2 = false;
var equFaultLevel2=false;
var init = true;
var initadd = true;
var code ="";
var V_SPR='';
var processKey = '';
var V_STEPNAME = '';
var V_NEXT_SETP = '';
var V_V_FAULT_GUID='';
var V_V_FILE_GUID='';
var V_V_ORGCODE_TEMP='';
var V_V_DEPTCODE_TEMP='';
var Assignee = '';
var ProcessInstanceId = '';
//小时
var hours = [];
for (var i = 0; i < 24; i++) {
    if (i < 10) {
        i = '0' + i;
    } else {
        i = '' + i;
    }
    hours.push({displayField: i, valueField: i});
}
var nowhours ='';
if (new Date().getHours() < 10) {
    nowhours = '0' + new Date().getHours();
} else {
    nowhours = new Date().getHours();
}
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_ORDERGUID == undefined) ? V_ORDERGUID = '' : V_ORDERGUID = parameters.V_ORDERGUID;
    (parameters.ProcessInstanceId == undefined) ? ProcessInstanceId = '' : ProcessInstanceId = parameters.ProcessInstanceId;
}
Ext.define('Ext.ux.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    async: true,
    doRequest: function (operation, callback, scope) {
        var writer = this.getWriter(),
            request = this.buildRequest(operation);
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        Ext.apply(request, {
            async: this.async,
            binary: this.binary,
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, callback, scope),
            method: this.getMethod(request),
            disableCaching: false
        });
        Ext.Ajax.request(request);
        return request;
    }
});

Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');
    var hourStore = Ext.create("Ext.data.Store", {
        storeId: 'hourStore',
        fields: ['displayField', 'valueField'],
        data: hours,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });
    var fileGridStore2 = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'fileGridStore2',
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


    var nextSprStoreb = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'nextSprStoreb',
        fields: ['V_PERSONCODE', 'V_PERSONNAME','V_V_NEXT_SETP','V_V_FLOW_STEPNAME'],
        proxy:{
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
            extraParams: {
            }
        },
        listeners: {
            load: function (store, records,success,eOpts) {
                processKey = store.getProxy().getReader().rawData.RET;
                V_STEPNAME = store.getAt(0).data.V_V_FLOW_STEPNAME;
                V_NEXT_SETP =  store.getAt(0).data.V_V_NEXT_SETP;
                // V_STEPCODE = resp.TaskDefinitionKey;
                Ext.getCmp('nextSprb').select(store.first());
                var list = Ext.getCmp("nextSprb").getStore().data.items;
                for (var i = 0; i < list.length; i++) {
                    if (list[i].raw.V_PERSONCODE == Assignee) {
                        Ext.getCmp("nextSprb").setValue(Assignee);
                    }
                    if (list[i].raw.V_PERSONCODE == Ext.util.Cookies.get('v_personcode')) {

                        Ext.getCmp("nextSprb").setValue(Ext.util.Cookies.get('v_personcode'));
                    }
                }
            }
        }
    });


    var inputPanel = Ext.create('Ext.Panel', {
        id : 'inputPanel',
        header : false,
        frame : true,
        layout : 'column',
        // layout : {
        //     type:'table',
        //     columns:5
        // },
        defaults : {
            labelAlign : 'right',
            // labelWidth : 100,
            // inputWidth : 200,
            margin : '4,0,0,0'
        },
        items : [
            {
                id: 'spyj',
                xtype: 'textfield',
                fieldLabel: '审批意见',
                labelWidth: 90,
                //baseCls: 'margin-bottom',
                fieldStyle: 'background-color: #FFEBCD; background-image: none;',
                style: ' margin: 5px 0px 0px 5px',
                labelAlign: 'right',
                width: 250
            },
            {
                id: 'nextSprb',
                xtype: 'combo',
                store: nextSprStoreb,
                fieldLabel: '下一步接收人',
                editable: false,
                labelWidth: 100,
                displayField: 'V_PERSONNAME',
                valueField: 'V_PERSONCODE',
                queryMode: 'local',
                style: ' margin: 5px 0px 0px 0px',
                labelAlign: 'right',
                width: 250
            },
            {
                xtype: 'button',
                text: '确认通过',
                style: ' margin: 5px 20px 0px 20px',
                icon: imgpath + '/saved.png',
                handler: _agree
            }, {
                xtype: 'button',
                text: '驳回',
                style: ' margin: 5px 20px 0px 0px',
                icon: imgpath + '/cross.png',
                handler: _reject
            }
        ]
    });

    var addPanel2 = Ext.create('Ext.form.FormPanel', {
        border: false,
        frame: true,
        id: 'addPanel2',
        region: 'center',
        //title: '<div align="center"></div>',
        baseCls: 'my-panel-no-border',
        width: '100%',
        // height: 595,
        bodyPadding: 10,
        fileUpload: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [ {
                xtype: 'textfield',
                id: 'orgname',
                fieldLabel: '厂矿',
                labelWidth: 70,
                readOnly:true,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 270
            },{
                xtype: 'textfield',
                id: 'deptname',
                fieldLabel: '作业区',
                labelWidth: 70,
                readOnly:true,
                style: ' margin: 5px 0px 0px -3px',
                labelAlign: 'right',
                width: 270
            }

            ]
        },  {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'faultname',
                fieldLabel: '事故名称',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                readOnly:true,
                width: 270
            },{
                xtype: 'textfield',
                id: 'pernum',
                fieldLabel: '人数',
                labelWidth: 70,
                readOnly:true,
                style: ' margin: 5px 0px 0px -3px',
                labelAlign: 'right',
                width: 270
            }

            ]
        },{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [ {
                xtype: 'textfield',
                id: 'equname',
                fieldLabel: '设备名称',
                labelWidth: 70,
                readOnly:true,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 537
            }
            ]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [ {
                xtype: 'textfield',
                id: 'worktype',
                fieldLabel: '工种',
                labelWidth: 70,
                readOnly:true,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 537
            }
            ]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [ {
                xtype: 'textfield',
                id: 'tools',
                fieldLabel: '机具',
                labelWidth: 70,
                readOnly:true,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 537
            }

            ]
        },{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [
                /*  {
                  xtype: 'textfield',
                  id: 'mat',
                  fieldLabel: '材料',
                  labelWidth: 70,
                  readOnly:true,
                  style: ' margin: 5px 0px 0px -8px',
                  labelAlign: 'right',
                  width: 270
              },*/
                {
                    xtype: 'textfield',
                    id: 'spare',
                    fieldLabel: '备件',
                    labelWidth: 70,
                    readOnly:true,
                    style: ' margin: 5px 0px 0px -8px',
                    labelAlign: 'right',
                    width: 537
                }

            ]
        },{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textarea',
                id: 'program',
                fieldLabel: '联络程序',
                readOnly:true,
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 537
            }

            ]
        },{ xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'mode',
                column:2,
                fieldLabel: '联络方式',
                labelWidth: 70,
                readOnly:true,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 537
            }


            ]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textarea',
                id: 'plan',
                fieldLabel: '抢修方案',
                readOnly:true,
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 537
            }]},{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textarea',
                id: 'prevent',
                fieldLabel: '事故预防',
                readOnly:true,
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 537
            }

            ]
        }]
    });


    var filegridPanel2 = Ext.create("Ext.grid.Panel", {
        id: 'filegridPanel2',
        region: 'center',
        // height: 200,
        width: '100%',
        columnLines: true,
        store: fileGridStore2,
        autoScroll: true,
        // margin: '10px 0 0 125px',
        //colspan: 3,
        columns: [{
            text: '附件名称',
            id: 'F_V_V_FILENAME',
            flex: 0.7,
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




    var uploadpanel2= Ext.create('Ext.form.FormPanel', {
        border: false,
        frame: true,
        id: 'uploadpanel2',
        region: 'south',
        width: '100%',
        layout: 'vbox',
        baseCls: 'my-panel-no-border',
        // height: 597,
        bodyPadding: 3,
        fileUpload: true,

        items: [
            {
                xtype: 'form',
                id:'uploadForm2',
                region: 'north',
                layout: 'hbox',
                baseCls: 'my-panel-no-border',
                items: [{
                    xtype: 'filefield',
                    id: 'V_V_FILEBLOB2',
                    name: 'V_V_FILEBLOB2',
                    enctype: "multipart/form-data",
                    fieldLabel: '故障附件',
                    labelWidth: 70,
                    labelAlign: 'right',
                    inputWidth: 201,
                    style: ' margin: 5px 0px 0px -2px',
                    buttonText: '选择文件',
                    allowBlank: false
                }, {
                    id: 'insertFilesFj2',
                    xtype: 'button',
                    text: '上传',
                    style: ' margin: 5px 0px 0px 15px',
                    icon: imgpath + '/accordion_collapse.png',
                    handler: _upLoadFile2
                }, {
                    xtype: 'hidden',
                    name: 'V_V_GUID2',
                    id: 'V_V_GUID2'
                }, {
                    xtype: 'hidden',
                    name: 'V_V_FILENAME2',
                    id: 'V_V_FILENAME2'
                }, {
                    xtype: 'hidden',
                    name: 'V_V_FILETYPECODE2',
                    id: 'V_V_FILETYPECODE2'
                }, {
                    xtype: 'hidden',
                    name: 'V_V_PLANT2',
                    id: 'V_V_PLANT2'
                }, {
                    xtype: 'hidden',
                    name: 'V_V_DEPT2',
                    id: 'V_V_DEPT2'
                }, {
                    xtype: 'hidden',
                    name: 'V_V_PERSON2',
                    id: 'V_V_PERSON2'
                }, {
                    xtype: 'hidden',
                    name: 'V_V_REMARK2',
                    id: 'V_V_REMARK2'
                }]},{
                columnWidth: 1,
                height: 225,
                width: 540,
                margin: '10px 0px 0px 0px',
                items: filegridPanel2
            }
        ]
    });



    Ext.create('Ext.container.Viewport', {
        layout : {
            type : 'border',
            regionWeights : {
                west : -1,
                north : 1,
                south : 1,
                east : -1
            }
        },
        items : [
            {
                region : 'center',
                border : false,
                layout : 'fit',
                items : [inputPanel]
            },

            {
                region : 'south',
                // border : false,
                frame: true,
                width : 590,
                autoScroll:true,
                items : [ addPanel2,uploadpanel2]
            }

        ]
    });
    _selectTaskId();
    _init();
    getAssignee();

    // _selecteFaultStore2();

});

function _selectTaskId() {
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/GetTaskIdFromBusinessId',
        type: 'ajax',
        method: 'POST',
        params: {
            businessKey: V_ORDERGUID,
            userCode: Ext.util.Cookies.get('v_personcode')
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);//后台返回的值
            taskId = data.taskId;
            V_STEPCODE = data.TaskDefinitionKey;
            _selectNextPer();
        },
        failure: function (response) {
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    })
}
function _selectNextPer() {
    var nextSprStore = Ext.data.StoreManager.lookup('nextSprStoreb');
    nextSprStore.proxy.extraParams = {
        V_V_ORGCODE: V_V_ORGCODE_TEMP,
        V_V_DEPTCODE: V_V_DEPTCODE_TEMP,
        V_V_REPAIRCODE: '',
        V_V_FLOWTYPE: 'FaultYn',
        V_V_FLOW_STEP: V_STEPCODE,//$.url().param("TaskDefinitionKey"),
        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_SPECIALTY: '',
        V_V_WHERE: '通过'
    };
    nextSprStore.currentPage = 1;
    nextSprStore.load();
    Ext.getBody().unmask();
    // selNextPer();

}

function _init() {
    Ext.Ajax.request({
        url: AppUrl + 'cxy/PM_FAULT_PLAN_GET',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_V_GUID': V_ORDERGUID

        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.success!='true') {//成功，会传回true
                // V_SPR=resp.RET[0].V_SPR;
                V_V_DEPTCODE_TEMP=resp.RET[0].V_DEPTCODE;
                V_V_ORGCODE_TEMP=resp.RET[0].V_ORGCODE;
                Ext.getCmp('orgname').setValue(resp.RET[0].V_ORGNAME);
                Ext.getCmp('deptname').setValue(resp.RET[0].V_DEPTNAME);
                Ext.getCmp('faultname').setValue(resp.RET[0].V_FAULT_NAME);
                Ext.getCmp('worktype').setValue(resp.RET[0].V_WORK_TYPE);
                Ext.getCmp('pernum').setValue(resp.RET[0].V_PERSON_NUM);
                Ext.getCmp('tools').setValue(resp.RET[0].V_TOOLS);
                // Ext.getCmp('mat').setValue(resp.RET[0].V_MATERIAL);
                Ext.getCmp('spare').setValue(resp.RET[0].V_SPARE_PARTNAME);//备件
                Ext.getCmp('equname').setValue(resp.RET[0].V_EQUNAME);
                Ext.getCmp('program').setValue(resp.RET[0].V_PROGRAM);
                Ext.getCmp('mode').setValue(resp.RET[0].V_MODE);
                Ext.getCmp('prevent').setValue(resp.RET[0].V_PREVENT);
                Ext.getCmp('plan').setValue(resp.RET[0].V_PLAN);
                V_V_FAULT_GUID=resp.RET[0].V_FAULT_GUID;
                filequery2(V_ORDERGUID);

                Ext.getCmp('insertFilesFj2').disable();
                Ext.getCmp('filegridPanel2').disable();
                // _selectsubequName2();
                // Ext.getCmp('SUB_V_EQUNAME2').setValue(resp.RET[0].V_EQUCHILD_CODE);
                Ext.getBody().unmask();//去除页面笼罩
                // _selectNextPer();
                Ext.Ajax.request({
                    url: AppUrl + 'Activiti/InstanceState',
                    method: 'POST',
                    async: false,
                    params: {
                        instanceId: $.url().param("ProcessInstanceId")
                    },
                    success: function (ret) {
                        var resp = Ext.JSON.decode(ret.responseText);
                        for (var i = 0; i < resp.list.length; i++) {
                            if (resp.list[i].ActivityName == "Start") {
                                V_SPR = resp.list[i].Assignee;
                                break;
                            }
                        }
                    }
                });
            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: '加载错误',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR,
                    fn: function () {
                        _seltctFault();
                    }
                });
            }

        },
        failure: function (response) {
            Ext.MessageBox.show({
                title: '错误',
                msg: '数据错误',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    });


}

function _upLoadFile2() {
    // var records = Ext.getCmp('faultItemPanel').getSelectionModel().getSelection();
    var uploadForm2 = Ext.getCmp('uploadForm2');

    var V_V_FILEBLOB = Ext.getCmp('V_V_FILEBLOB2').getSubmitValue();
    var V_V_FILENAME = V_V_FILEBLOB.split("\\")[V_V_FILEBLOB.split("\\").length - 1].split(".")[0];
    Ext.getCmp('V_V_GUID2').setValue(V_ORDERGUID);//records[0].data.V_GUID);
    Ext.getCmp('V_V_FILENAME2').setValue(V_V_FILENAME);
    Ext.getCmp('V_V_FILEBLOB2').setValue(V_V_FILEBLOB);
    Ext.getCmp('V_V_FILETYPECODE2').setValue('SBGZ');
    Ext.getCmp('V_V_PLANT2').setValue(V_V_ORGCODE_TEMP);
    Ext.getCmp('V_V_DEPT2').setValue(V_V_DEPTCODE_TEMP);
    Ext.getCmp('V_V_PERSON2').setValue(V_V_PERSONCODE);
    Ext.getCmp('V_V_REMARK2').setValue(Ext.getCmp('V_V_REMARK2').getValue());

    if (uploadForm2.form.isValid()) {
        if (Ext.getCmp('V_V_FILEBLOB2').getValue() == '') {
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

        uploadForm2.getForm().submit({
            url: AppUrl + 'cxy/PRO_BASE_FILE_ADD2',
            method: 'POST',
            async: false,
            waitMsg: '上传中...',
            success: function (form, action) {
                var massage=action.result.message;
                if(massage=="{RET=SUCCESS}"){
                    Ext.Msg.alert('成功', '上传成功');
                    // alert(records[0].get('V_GUID'))
                    //if(records[0].get('V_GUID') == "" || records[0].get('V_GUID') == null)
                    // filequery2(records[0].get('V_GUID'));
                    filequery2(V_ORDERGUID);
                }
            },
            failure: function (form, action) {
                Ext.Msg.alert('错误', '上传失败');
            }

        })

    }

}

function _downloadRander(a, value, metaData) {
    return '<a href="javascript:onDownload(\'' + metaData.data.V_FILEGUID + ',' + metaData.data.V_FILENAME + '\')">' + a + '</a>';
}

function _delRander(a, value, metaData) {
    return '<a href="javascript:onDel(\'' + metaData.data.V_FILEGUID + '\')">删除</a>';
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
                filequery2(V_ORDERGUID);
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
function onDownload(fileguid) {
    // alert(fileguid)
    var guid = fileguid.substring(0,36);
    var fujianname = fileguid.substring(37 );
    //alert(guid);
    //console.log(Ext.getCmp("V_V_GUID").getValue())
    //alert(fujianname)
    var form = Ext.getCmp('addPanel');
    location.href = AppUrl+"qk/downloadFile?V_V_FILEGUID="+guid+"&V_V_FILENAME="+fujianname;//下载页面弹窗
}





function filequery2(guid) {
    Ext.data.StoreManager.lookup('fileGridStore2').load({
        params: {
            V_V_GUID: guid
        }
    });
}

// function _hideFault() {
//     Ext.getCmp('addFaultWindow').close();
// }
//
// function _hideFault2() {
//     window.close();
// }
//



function _validate(obj) {
    var valid = true;
    for (var i = 0; i < obj.items.length; i++) {
        if (obj.items.getAt(i).xtype != 'button' && obj.items.getAt(i).xtype != 'panel' && !obj.items.getAt(i).validate()) {
            valid = false;
        }
    }
    return valid;
}


function OnClickTreeItem(aa, record, item, index, e, eOpts) {
    if (record.data.choose == true) {
        var id=record.data.id;
        var parentid=record.data.parentId;
        var pid="";
        if(record.data.leaf == true){
            id=id.substr(0, id.length - 1);
            pid=parentid;
        }else{
            pid=id;
        }
        var flag=0;
        var records=Ext.getCmp('equGridpanel').getStore().data;
        for (var i = 0; i < records.length; i++) {
            var temp=records.items[i].data.V_EQUCODE;
            if(temp==id){
                flag=1;
                return false;
            }
        }
        if(flag==0){
            // var data = {
            //     'V_EQUTYPENAME' : record.data.V_EQUTYPENAME,
            //     'V_EQUCODE' : id,
            //     'V_EQUNAME' : record.data.text,
            //     'V_EQUSITE' : record.data.V_EQUSITE,
            //     'V_EQUSITENAME' : record.data.V_EQUSITENAME,
            //     'V_EQUTYPECODE' : record.data.V_EQUTYPECODE,
            //     'V_EQUUPCODE':parentid
            // };
            // addEquip(data);
            Ext.Ajax.request({
                url: AppUrl + 'cxy/PRO_FAULT_EQUIP_SET',
                type: 'ajax',
                method: 'POST',
                params: {
                    'V_V_FAULTCODE': V_ORDERGUID,
                    'V_V_EQUTYPECODE': record.data.V_EQUTYPECODE,
                    'V_V_EQUUPCODE':pid,
                    'V_V_EQUCODE':id,
                    'V_V_CREATER':V_V_PERSONCODE
                },
                success: function (response) {
                    var resp=Ext.decode(response.responseText);
                    if(resp.RET='SUCCESS'){
                        _selectGridPanel();
                    }else{
                        Ext.MessageBox.show({
                            title: '错误',
                            msg: resp.RET,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }


                }
            });
        }
    }
}
function _delete(value, metaData, record, rowIdx,colIdx, store, view) {

    return '<a href="javascript:delFixContent(\'' + value + '\',\''+record.data.V_EQUCODE +'\')">删除</a>';
}
function delFixContent(faultguid,equcode) {

    // var store = Ext.getCmp('equGridpanel').getStore();
    // var sm = Ext.getCmp('equGridpanel').getSelectionModel().getSelection(); //得到表格的选择模型
    // store.remove(sm[0]);

    Ext.Ajax.request({
        url: AppUrl + 'cxy/PRO_FAULT_EQUIP_DEL',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_V_FAULTCODE': faultguid,
            'V_V_EQUCODE':equcode

        },
        success: function (response) {

            var resp=Ext.decode(response.responseText);
            if(resp.RET='SUCCESS'){
                _selectGridPanel();
            }else{
                Ext.MessageBox.show({
                    title: '错误',
                    msg: resp.RET,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }


        },failure: function (response) {
            Ext.MessageBox.show({
                title: '错误',
                msg: response.RET,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    });

}
function _agree() {
    var spyj = '';
    if (Ext.getCmp('spyj').getValue() == '' || Ext.getCmp('spyj').getValue() == null) {
        spyj = '通过';
    } else {
        spyj = Ext.getCmp('spyj').getValue();
    }
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/TaskComplete',
        type: 'ajax',
        method: 'POST',
        params: {
            taskId: taskId,
            idea: '通过',
            parName: [V_NEXT_SETP, "flow_yj",'shtgtime'],
            parVal: [Ext.getCmp('nextSprb').getValue(),spyj,Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, 30), 'Y-m-d') + 'T' + Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, 30), 'H:i:s') ],
            processKey :processKey,//$.url().param("ProcessDefinitionKey"),
            businessKey : $.url().param("V_ORDERGUID"),
            V_STEPCODE : V_STEPCODE,
            V_STEPNAME : V_STEPNAME,
            V_IDEA : '请审批！',
            V_NEXTPER : Ext.getCmp('nextSprb').getValue(),
            V_INPER : Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.ret == '任务提交成功') {

                window.close();
                window.opener.OnPageLoad();
            }else{
                Ext.MessageBox.show({
                    title: '错误',
                    msg: resp.ret,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                })
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
    })
    // } else {
    //     Ext.Msg.alert('提示', 'state update fail！');
    // }
    // },failure: function (resp) {//访问到后台时执行的方法。
    //     Ext.MessageBox.show({
    //         title: '错误',
    //         msg: resp.responseText,
    //         buttons: Ext.MessageBox.OK,
    //         icon: Ext.MessageBox.ERROR
    //     })
    // }
    // });

}

function _reject() {
    var spyj = '';
    if (Ext.getCmp('spyj').getValue() == '' || Ext.getCmp('spyj').getValue() == null) {
        spyj = '审批驳回';
    } else {
        spyj = Ext.getCmp('spyj').getValue();
    }
    Ext.Ajax.request({
        url: AppUrl + 'cxy/PM_FAULT_PLAN_STATE_UPDATE',
        method: 'POST',
        type: 'ajax',
        params: {
            V_V_PERCODE:V_PERSONCODE,
            V_V_GUID: $.url().param("V_ORDERGUID"),
            V_V_STAUTS: '10'//驳回
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.RET == 'SUCCESS') {
                Ext.Ajax.request({
                    url: AppUrl + 'Activiti/TaskComplete',
                    type: 'ajax',
                    method: 'POST',
                    params: {
                        taskId: taskId,
                        idea: '不通过',
                        parName: ['fqrxg', "flow_yj"],
                        parVal: [V_SPR, spyj],
                        processKey: $.url().param("ProcessDefinitionKey"),
                        businessKey: V_ORDERGUID,
                        V_STEPCODE: 'fqrxg',
                        V_STEPNAME: '发起人修改',
                        V_IDEA: '不通过',
                        V_NEXTPER: V_SPR,
                        V_INPER: Ext.util.Cookies.get('v_personcode')
                    },
                    success: function (response) {
                        var resp = Ext.decode(response.responseText);
                        if (resp.ret == '任务提交成功') {
                            window.close();
                            window.opener.OnPageLoad();

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
            } else {
                Ext.Msg.alert('提示', '事故修改状态失败！');
            }
        },failure: function (resp) {//访问到后台时执行的方法。
            Ext.MessageBox.show({
                title: '错误',
                msg: resp.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            })
        }
    });

}
