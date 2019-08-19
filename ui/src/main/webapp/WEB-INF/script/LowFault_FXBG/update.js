var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var V_DEPTCODE ='';
var V_ORGCODE ='';
var V_V_GUID = "";
var orgLoad = false;
var zyqload = false;
var orgLoad1 = false;
var orgLoad2 = false;
var equFaultLoad = false;
var equFaultLoad1 = false;
var equFaultLoad2 = false;
var nextSprLoad = false;
var init = true;
var initadd = true;
var code ="";
var processKey = '';
var V_STEPNAME = '';
var V_NEXT_SETP = '';
var processKey2 = '';
var V_STEPNAME2 = '';
var V_NEXT_SETP2 = '';
var V_V_FAULT_GUID='';
var V_V_FILE_GUID='';
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_V_GUID == undefined) ? V_V_GUID = '' : V_V_GUID = parameters.V_V_GUID;
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
                id:'saveinsert',
                xtype: 'button',
                text: '保存',
                style: ' margin: 10px 0px 0px 60px',
                icon: imgpath + '/saved.png',
                handler: _saveBtnFault2
            }, {
                id:'saveqx',
                xtype: 'button',
                text: '关闭',
                style: ' margin: 10px 0px 0px 10px',
                icon: imgpath + '/cross.png',
                handler: _hideFault2
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
                fieldLabel: '故障名称',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                readOnly:true,
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
                id: 'organ',
                fieldLabel: '组织机构',
                labelWidth: 70,
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
            items: [ {
                xtype: 'textarea',
                id: 'program',
                fieldLabel: '联络程序及方式',
                labelWidth: 70,
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
                xtype: 'textarea',
                id: 'worktype',
                fieldLabel: '工种及人数',
                labelWidth: 70,
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
                xtype: 'textarea',
                id: 'tools',
                fieldLabel: '设备及检修机具',
                labelWidth: 70,
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
                {
                    xtype: 'textarea',
                    id: 'material',
                    fieldLabel: '材料和备件',
                    labelWidth: 70,
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
                fieldLabel: '抢修预防',
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
                    fieldLabel: '预案附件',
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
                region : 'north',
                border : false,
                layout : 'fit',
                items : [inputPanel]
            },

            {
                region : 'center',
                // border : false,
                frame: true,
                width : 590,
                height: '100%',
                autoScroll:true,
                items : [ addPanel2,uploadpanel2]
            }

        ]
    });

    _init();


});
function _init2(){
    if (orgLoad2 && equFaultLoad2 && init) {
        init = false;
    }
}
function _init() {
    Ext.Ajax.request({
            url: AppUrl + 'cxy/PM_BUG_PLAN_GET',
            type: 'ajax',
            method: 'POST',
            params: {
                'V_V_GUID': V_V_GUID

            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (resp.success!='true') {//成功，会传回true

                    V_DEPTCODE=resp.RET[0].V_DEPTCODE;
                    V_ORGCODE=resp.RET[0].V_ORGCODE;
                    Ext.getCmp('orgname').setValue(resp.RET[0].V_ORGNAME);
                    Ext.getCmp('deptname').setValue(resp.RET[0].V_DEPTNAME);
                    Ext.getCmp('faultname').setValue(resp.RET[0].V_FAULT_NAME);
                    Ext.getCmp('organ').setValue(resp.RET[0].V_ORGANIZATIONAL);
                    Ext.getCmp('program').setValue(resp.RET[0].V_PROGRAM);
                    Ext.getCmp('worktype').setValue(resp.RET[0].V_WORK_TYPE);
                    Ext.getCmp('tools').setValue(resp.RET[0].V_TOOLS);
                    Ext.getCmp('material').setValue(resp.RET[0].V_MATERIAL);
                    Ext.getCmp('plan').setValue(resp.RET[0].V_PLAN);
                    Ext.getCmp('prevent').setValue(resp.RET[0].V_PREVENT);
                    V_V_FAULT_GUID=resp.RET[0].V_FAULT_GUID;
                    filequery2(V_V_GUID);


                    // _selectsubequName2();
                    // Ext.getCmp('SUB_V_EQUNAME2').setValue(resp.RET[0].V_EQUCHILD_CODE);
                    Ext.getBody().unmask();//去除页面笼罩


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

function _selectGridPanel() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        'V_V_FAULTCODE': V_V_GUID
    };
    gridStore.load();
}
function _selectDept2() {
    var deptStore2 = Ext.data.StoreManager.lookup('deptStore2');

    deptStore2.proxy.extraParams = {
        'V_V_PERSONCODE': V_V_PERSONCODE,
        'V_V_DEPTCODE': Ext.getCmp('V_V_ORGCODE2').getValue(),
        'V_V_DEPTCODENEXT': '%',
        'V_V_DEPTTYPE': '[主体作业区]'
    };

    deptStore2.currentPage = 1;
    deptStore2.load();
}


// function _selecteType2() {
//     var eTypeStore2 = Ext.data.StoreManager.lookup('eTypeStore2');
//     eTypeStore2.proxy.extraParams = {
//         'V_V_PERSONCODE': V_V_PERSONCODE,
//         'V_V_DEPTCODENEXT': Ext.getCmp('V_V_DEPTCODE2').getValue()
//
//     };
//     // eTypeStore2.currentPage = 1;
//     eTypeStore2.load();
// }


// function _selectequName2() {
//     var equNameStore2 = Ext.data.StoreManager.lookup('equNameStore2');
//     equNameStore2.proxy.extraParams = {
//         'V_V_PERSONCODE': V_V_PERSONCODE,
//         'V_V_DEPTCODENEXT': Ext.getCmp('V_V_DEPTCODE2').getValue(),
//         'V_V_EQUTYPECODE': Ext.getCmp('V_V_EQUTYPE2').getValue()
//
//     };
//     //equNameStore2.currentPage = 1;
//     equNameStore2.load();
// }


// function _selectsubequName2() {
//
//     if(Ext.getCmp('V_EQUNAME2').getValue() == '%')
//     {
//
//         var subequNameStore2 = Ext.data.StoreManager.lookup('subequNameStore2');
//         subequNameStore2.load();
//         Ext.getBody().unmask();//去除页面笼罩
//     }
//     if(Ext.getCmp('V_EQUNAME2').getValue() != '%')
//     {
//         Ext.data.StoreManager.lookup('subequNameStore2').load({
//             params: {
//                 V_V_PERSONCODE: V_V_PERSONCODE,
//                 V_V_DEPTCODE: Ext.getCmp('V_V_ORGCODE2').getValue(),
//                 V_V_DEPTNEXTCODE: Ext.getCmp('V_V_DEPTCODE2').getValue(),
//                 V_V_EQUTYPECODE: Ext.getCmp('V_V_EQUTYPE2').getValue(),
//                 V_V_EQUCODE: Ext.getCmp('V_EQUNAME2').getValue()
//             }
//         });
//         Ext.getBody().unmask();//去除页面笼罩
//     }
// }

function _seltctFault() {
    var faultItemStore = Ext.data.StoreManager.lookup('faultItemStore');

    faultItemStore.proxy.extraParams = {
        'V_V_ORGCODE': Ext.getCmp('V_V_ORGCODE').getSubmitValue(),
        'V_V_DEPTCODE': Ext.getCmp('V_V_DEPTCODE').getSubmitValue(),
        'V_V_EQUTYPE': Ext.getCmp('V_V_EQUTYPE').getSubmitValue(),
        'V_V_EQUCODE': Ext.getCmp('V_EQUNAME').getSubmitValue(),
        'V_V_EQUCHILD_CODE': Ext.getCmp('SUB_V_EQUNAME').getSubmitValue(),
        'V_V_FAULT_TYPE': Ext.getCmp('equFaultname').getSubmitValue(),
        'V_V_FAULT_YY': Ext.getCmp('faulttext').getSubmitValue(),
        'V_V_FINDTIME_B': Ext.getCmp("begintime").getSubmitValue(),
        'V_V_FINDTIME_E': Ext.getCmp("endtime").getSubmitValue()
    };

    // faultItemStore.currentPage = 1;
    faultItemStore.load();
}





function _upLoadFile2() {
    // var records = Ext.getCmp('faultItemPanel').getSelectionModel().getSelection();
    var uploadForm2 = Ext.getCmp('uploadForm2');

    var V_V_FILEBLOB = Ext.getCmp('V_V_FILEBLOB2').getSubmitValue();
    var V_V_FILENAME = V_V_FILEBLOB.split("\\")[V_V_FILEBLOB.split("\\").length - 1].split(".")[0];
    Ext.getCmp('V_V_GUID2').setValue(V_V_GUID);//records[0].data.V_GUID);
    Ext.getCmp('V_V_FILENAME2').setValue(V_V_FILENAME);
    Ext.getCmp('V_V_FILEBLOB2').setValue(V_V_FILEBLOB);
    Ext.getCmp('V_V_FILETYPECODE2').setValue('SBGZ');
    Ext.getCmp('V_V_PLANT2').setValue(V_ORGCODE);
    Ext.getCmp('V_V_DEPT2').setValue(V_DEPTCODE);
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
                    filequery2(V_V_GUID);
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
                filequery2(V_V_GUID);
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

function onDownload(fileguid) {
    // alert(fileguid)
    var guid = fileguid.substring(0,36);
    var fujianname = fileguid.substring(37 );
    //alert(guid);
    //console.log(Ext.getCmp("V_V_GUID").getValue())
    //alert(fujianname)
    var form = Ext.getCmp('addPanel');



    location.href = AppUrl+"qk/downloadFile?V_V_FILEGUID="+guid+"&V_V_FILENAME="+fujianname;//下载页面弹窗
//123123


}



function filequery(guid) {
    Ext.data.StoreManager.lookup('fileGridStore').load({
        params: {
            V_V_GUID: guid
        }
    });
}

function filequery2(guid) {
    Ext.data.StoreManager.lookup('fileGridStore2').load({
        params: {
            V_V_GUID: guid
        }
    });
}

function _hideFault() {
    Ext.getCmp('addFaultWindow').close();
}

function _hideFault2() {
    window.close();
}


function _saveBtnFault2() {

    if (Ext.getCmp('orgname').getValue() != '' && Ext.getCmp('deptname').getValue() != '') {
        Ext.Ajax.request({
            url: AppUrl + 'cxy/PM_BUG_PLAN_UPDATE',
            type: 'ajax',
            method: 'POST',
            params: {
                'V_V_GUID': V_V_GUID,
                'V_V_ORGANIZATIONAL':Ext.getCmp("organ").getValue(),
                'V_V_PROGRAM': Ext.getCmp("program").getValue(),
                'V_V_WORK_TYPE':Ext.getCmp("worktype").getValue(),
                'V_V_TOOLS':Ext.getCmp("tools").getValue(),
                'V_V_MATERIAL': Ext.getCmp("material").getValue(),
                'V_V_PLAN': Ext.getCmp("plan").getValue(),
                'V_V_PREVENT':Ext.getCmp("prevent").getValue()
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);
                if (data.RET == 'Success') {
                    Ext.MessageBox.show({
                        title: '提示',
                        msg:  '修改成功',
                        buttons: Ext.MessageBox.OK,
                        fn:function(){
                            window.opener._seltctFault();
                            window.close();
                        }
                    });

                } else {
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: data.RET,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR,
                        fn:function(){
                            window.opener._seltctFault();
                        }
                    });
                }
            },
            failure: function (response) {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: response.responseText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR,
                    fn:function(){
                        window.opener._seltctFault();
                    }
                });
            }
        });
    } else {
        Ext.MessageBox.show({
            title: '提示',
            msg: '下拉选项不能为全部',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }
}

function _validate(obj) {
    var valid = true;
    for (var i = 0; i < obj.items.length; i++) {
        if (obj.items.getAt(i).xtype != 'button' && obj.items.getAt(i).xtype != 'panel' && !obj.items.getAt(i).validate()) {
            valid = false;
        }
    }
    return valid;
}

function _addModellFault() {

    /*var owidth = window.document.body.offsetWidth -40;
     var oheight = window.document.body.offsetHeight -30;*/
    var owidth = 800;
    var oheight = 600;

    window.open(AppUrl + 'page/PM_1404/index.html?V_V_ORGCODE=' + Ext.getCmp("V_V_ORGCODE").getValue() + '&V_V_DEPTCODE=' + Ext.getCmp("V_V_DEPTCODE").getValue() + '&V_V_EQUTYPE=' + encodeURI(Ext.getCmp("V_V_EQUTYPE").getValue()) + '&V_V_EQUCODE=' + encodeURI(Ext.getCmp("V_EQUNAME").getValue()) + '&V_V_EQUCHILD_CODE=' + encodeURI(Ext.getCmp("SUB_V_EQUNAME").getValue()) + '&V_V_FAULT_TYPE=' + encodeURI(Ext.getCmp("equFaultname").getValue()) + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes' )
    // var matStockLevel = window.showModalDialog(AppUrl + 'page/PM_140701/index.html?IN_DEPARTCODE=' + Ext.getCmp("zyq").getValue() + '&V_V_GUID=' + records[0].get("V_GUID") + '&random=' + Math.random(), window, 'resizable=yes;  dialogWidth=1200px; dialogHeight=1000px');
    /*if (b) {
     _seltctFault();
     alert(b);
     Ext.example.msg('操作信息', '操作成功');

     //  Ext.data.StoreManager.lookup('faultItemStore').add(matStockLevel);
     //_seltctFault();
     }*/

}


function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function addEquip(equInfoModel) {
    var store = Ext.getCmp('equGridpanel').getStore();
    var count = store.getCount();
    // if (count > 10) {
    //     store.remove(store.getAt(count - 1));
    // }

    store.insert(0, equInfoModel);//fi++
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
                    'V_V_FAULTCODE': V_V_GUID,
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