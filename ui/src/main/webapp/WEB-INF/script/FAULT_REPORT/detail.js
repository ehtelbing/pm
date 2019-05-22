var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var V_V_GUID = "";
var orgLoad = false;
var zyqload = false;
var sbtypeload = false;
var sbnameload = false;
var zsbnameload = false;
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



    // var orgStore2 = Ext.create('Ext.data.Store', {
    //     id: 'orgStore2',
    //     autoLoad: true,
    //     fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
    //     proxy: {
    //         type: 'ajax',
    //         async: false,
    //         url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
    //         actionMethods: {
    //             read: 'POST'
    //         },
    //         reader: {
    //             type: 'json',
    //             root: 'list'
    //         },
    //         extraParams: {
    //             'V_V_PERSONCODE': V_V_PERSONCODE,
    //             'V_V_DEPTCODE': V_V_DEPTCODE,
    //             'V_V_DEPTCODENEXT': '%',
    //             'V_V_DEPTTYPE': '基层单位'
    //         }
    //     },
    //     listeners: {
    //         load: function (store, records) {
    //             orgLoad2 = true;
    //             if (init) {
    //                 //Ext.getCmp('V_V_ORGCODE2').select(store.first());
    //                 //   _init2();
    //             }
    //
    //         }
    //     }
    // });
    //
    //
    //
    // var deptStore2 = Ext.create('Ext.data.Store', {
    //     id: 'deptStore2',
    //     autoLoad: false,
    //     fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
    //     proxy: {
    //         type: 'ajax',
    //         async: false,
    //         url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
    //         actionMethods: {
    //             read: 'POST'
    //         },
    //         reader: {
    //             type: 'json',
    //             root: 'list'
    //         }
    //     },
    //     listeners: {
    //         load: function (store, records) {
    //             if (init) {
    //                 //Ext.getCmp('V_V_DEPTCODE2').select(store.first());
    //                 //   _init2();
    //             } else {
    //                 //alert(1)
    //                 Ext.getCmp('V_V_DEPTCODE2').select(store.first());
    //             }
    //
    //         }
    //     }
    // });
    //
    // var equFaultStore2 = Ext.create('Ext.data.Store', {
    //     id: 'equFaultStore2',
    //     autoLoad: true,
    //     fields: ['V_TYPECODE', 'V_TYPENAME'],
    //     proxy: {
    //         type: 'ajax',
    //         url: AppUrl + 'PM_14/PM_14_FAULT_TYPE_ITEM_SEL',
    //         actionMethods: {
    //             read: 'POST'
    //         },
    //         async: false,
    //         reader: {
    //             type: 'json',
    //             root: 'list'
    //         }
    //     },
    //     listeners: {
    //         load: function (store, records) {
    //             equFaultLoad2 = true;
    //             store.insert(0, {V_TYPENAME: '全部', V_TYPECODE: '%'});
    //             // Ext.getCmp('equFaultname2').select(store.first());
    //             if (init) {
    //                 _init2();
    //             }
    //         }
    //     }
    // });
    //
    // var faultStore2 = Ext.create('Ext.data.Store', {
    //     id: 'faultStore2',
    //     autoLoad: false,
    //     fields: ['V_FAULTCODE', 'V_FAULTNAME'],
    //     proxy: {
    //         type: 'ajax',
    //         async: false,
    //         url: AppUrl + 'cxy/PRO_BASE_FAULT_SEL',
    //         actionMethods: {
    //             read: 'POST'
    //         },
    //         reader: {
    //             type: 'json',
    //             root: 'list'
    //         }
    //     },
    //     listeners: {
    //         load: function (store, records) {
    //             Ext.getCmp('faultLevel2').select(store.first());
    //         }
    //     }
    // });
    //
    //
    //


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


    var gridStore =Ext.create('Ext.data.Store', {
        id : 'gridStore',
        autoLoad : false,
        fields : ['V_EQUTYPENAME', 'V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_EQUSITENAME','V_EQUTYPECODE','V_EQUUPCODE','V_FAULTCODE'],
        proxy : {
            type : 'ajax',
            url: AppUrl + 'cxy/PRO_FAULT_EQUIP_SEL',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            }
        }
    });


    var equGridpanel = Ext.create('Ext.grid.Panel', {
        id : 'equGridpanel',
        region : 'center',
        store : gridStore,
        width:300,
        columnLines : true,
        // selType: 'checkboxmodel',
        // plugins : [ Ext.create('Ext.grid.plugin.CellEditing', {
        //     clicksToEdit : 1
        // }) ],
        columns : [

            {
                text : '设备分类',
                dataIndex : 'V_EQUTYPENAME',
                align : 'center',
                width : 100
            }, {
                text : '设备编号',
                dataIndex : 'V_EQUCODE',
                align : 'center',
                width : 100
            }, {
                text : '设备名称',
                dataIndex : 'V_EQUNAME',
                align : 'center',
                width : 100
            }, {
                text : '设备位置编码',
                dataIndex : 'V_EQUSITE',
                align : 'center',
                width : 100
            }, {
                text : '设备位置',
                dataIndex : 'V_EQUSITENAME',
                align : 'center',
                width : 200
            }
        ]
    });

    var addPanel2 = Ext.create('Ext.form.FormPanel', {
        border: false,
        frame: true,
        id: 'addPanel2',
        region: 'center',
        //title: '<div align="center"></div>',
        // baseCls: 'my-panel-no-border',
        width: '100%',
        // height: 595,
        bodyPadding: 10,
        fileUpload: true,
        items: [
             {
                xtype: 'panel',
                region: 'north',
                layout: 'column',
                baseCls: 'my-panel-no-border',
                items: [{
                    xtype: 'textfield',
                    id: 'V_V_ORGCODE2',
                    fieldLabel: '厂矿',
                    labelWidth: 70,
                    style: ' margin: 5px 0px 0px -8px',
                    labelAlign: 'right',
                    readOnly:true,
                    width: 270
                },{
                    xtype: 'textfield',
                    id: 'V_V_DEPTCODE2',
                    fieldLabel: '作业区',
                    labelWidth: 70,
                    style: ' margin: 5px 0px 0px -3px',
                    labelAlign: 'right',
                    readOnly:true,
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
                    id: 'faultname2',
                    fieldLabel: '故障名称',
                    labelWidth: 70,
                    style: ' margin: 5px 0px 0px -8px',
                    labelAlign: 'right',
                    hidden:true,
                    readOnly:true,
                    width: 260
                },{
                    xtype: 'label',
                    width: 5,
                    text: '*',
                    style: 'color:red',
                    hidden:true,
                    readOnly:true,
                    margin : ' margin: 5px 0px 0px 5px'
                },{
                    xtype: 'textfield',
                    id: 'faultpart2',
                    fieldLabel: '故障部位',
                    labelWidth: 70,
                    hidden:true,
                    readOnly:true,
                    style: ' margin: 5px 0px 0px -8px',
                    labelAlign: 'right',
                    width: 270
                }

                ]
            }, {
                xtype: 'panel',
                region: 'north',
                layout: 'column',
                baseCls: 'my-panel-no-border',
                items: [ {

                    xtype: 'textfield',
                    id: 'equFaultname2',
                    fieldLabel: '事故类别',
                    labelWidth: 70,
                    style: ' margin: 5px 0px 0px -8px',
                    labelAlign: 'right',
                    readOnly:true,
                    width: 270

                },{
                    xtype: 'textfield',
                    id: 'faultLevel2',
                    fieldLabel: '事故等级',
                    labelWidth: 70,
                    style: ' margin: 5px 0px 0px -3px',
                    labelAlign: 'right',
                    readOnly:true,
                    width: 270

                }

                ]
            }, {
                xtype: 'panel',
                region: 'north',
                layout: 'column',
                baseCls: 'my-panel-no-border',
                items: [{
                    id: 'begintime2',
                    xtype: 'datefield',
                    editable: false,
                    format: 'Y-m-d',
                    //submitFormat: 'yyyy-mm-dd',
                    readOnly:true,
                    value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    fieldLabel: '发现时间',
                    labelWidth: 70,
                    style: ' margin: 5px 0px 0px -8px',
                    labelAlign: 'right',
                    width: 270,
                    baseCls: 'margin-bottom'
                },{
                    id: 'endtime2',
                    xtype: 'datefield',
                    editable: false,
                    format: 'Y-m-d',
                    //submitFormat: 'yyyy-mm-dd',
                    value: new Date(),//,V_begintime,new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                    fieldLabel: '排除时间',
                    readOnly:true,
                    labelWidth: 70,
                    style: ' margin: 5px 0px 0px -3px',
                    labelAlign: 'right',
                    width: 270,
                    baseCls: 'margin-bottom'
                },{
                    xtype: 'textfield',
                    id: 'faultxz2',
                    fieldLabel: '性质',
                    hidden:true,
                    readOnly:true,
                    labelWidth: 70,
                    style: ' margin: 5px 0px 0px -3px',
                    labelAlign: 'right',
                    width: 270 }

                ]
            },{
                xtype: 'panel',
                region: 'north',
                layout: 'column',
                baseCls: 'my-panel-no-border',
                items: [
                    {
                        xtype: 'textfield',
                        id: 'faultbgr2',
                        fieldLabel: '事故报告人',
                        readOnly:true,
                        labelWidth: 70,
                        style: ' margin: 5px 0px 0px -8px',
                        labelAlign: 'right',
                        width: 270
                    },
                    {
                        xtype: 'textfield',
                        id: 'faultzjzrr2',
                        fieldLabel: '直接责任人',
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
                items: [{
                    id: 'stoptime2',
                    xtype: 'datefield',
                    editable: false,
                    format: 'Y-m-d',
                    //submitFormat: 'yyyy-mm-dd',
                    value: new Date(),//,V_begintime,new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                    fieldLabel: '停机时间',
                    labelWidth: 70,
                    style: ' margin: 5px 0px 0px -8px',
                    labelAlign: 'right',
                    readOnly:true,
                    width: 270,
                    baseCls: 'margin-bottom'
                },{
                    id: 'repairtime2',
                    xtype: 'datefield',
                    editable: false,
                    format: 'Y-m-d',
                    //submitFormat: 'yyyy-mm-dd',
                    value: new Date(),//,V_begintime,new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                    fieldLabel: '修理时间',
                    labelWidth: 70,
                    readOnly:true,
                    style: ' margin: 5px 0px 0px -3px',
                    labelAlign: 'right',
                    width: 270,
                    baseCls: 'margin-bottom'
                }
                ]
            } , {
                xtype: 'panel',
                region: 'north',
                layout: 'column',
                baseCls: 'my-panel-no-border',
                items: [
                    {
                        xtype: 'numberfield',
                        id: 'faultxffy2',
                        fieldLabel: '修复费用',
                        labelWidth: 70,
                        style: ' margin: 5px 0px 0px -8px',
                        labelAlign: 'right',
                        minValue:'0',
                        nanText: "请输入有效数字",
                        validateOnBlur: false,
                        validateOnChange: false,
                        readOnly:true,
                        hideTrigger: true,
                        allowBlank: false,
                        width: 240
                    },{
                        xtype: 'label',
                        style: ' margin: 8px 0px 0px 4px',
                        text:'万元'
                    },
                    {
                        id: 'touptime2',
                        xtype: 'datefield',
                        editable: false,
                        format: 'Y-m-d',
                        readOnly:true,
                        //submitFormat: 'yyyy-mm-dd',
                        value: new Date(),//,V_begintime,new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                        fieldLabel: '上报时间',
                        labelWidth: 70,
                        style: ' margin: 5px 0px 0px -1px',
                        labelAlign: 'right',
                        width: 270,
                        baseCls: 'margin-bottom'
                    }

                ]
            },{
                xtype: 'panel',
                region: 'north',
                layout: 'column',
                baseCls: 'my-panel-no-border',
                items: [{
                    xtype: 'textfield',
                    id: 'faultss2',
                    fieldLabel: '损失',
                    labelWidth: 70,
                    style: ' margin: 5px 0px 0px -8px',
                    labelAlign: 'right',
                    nanText: "请输入有效数字",
                    readOnly:true,
                    minValue:'0',
                    hidden:true,
                    validateOnBlur: false,
                    validateOnChange: false,
                    hideTrigger: true,
                    allowBlank: false,
                    width: 280
                }, {
                    xtype: 'label',
                    style: ' margin: 8px 0px 0px 4px',
                    hidden:true,
                    text:'万元'
                },{
                    xtype: 'label',
                    width: 5,
                    text: '*',
                    style: 'color:red',
                    hidden:true,
                    margin : ' margin: 5px 0px 5px 5px'
                }

                ]
            },{xtype: 'panel',
                region: 'north',
                layout: 'column',
                baseCls: 'my-panel-no-border',
                items: [{
                    xtype: 'textarea',
                    id: 'faultjg2',
                    fieldLabel: '事故经过',
                    labelWidth: 70,
                    readOnly:true,
                    style: ' margin: 5px 0px 0px -8px',
                    labelAlign: 'right',
                    width: 537
                }
                    /*,{
                        xtype: 'label',
                        width: 5,
                        text: '*',
                        style: 'color:red',
                        margin : ' margin: 5px 0px 5px 5px'
                    }*/

                ]
            },{
                xtype: 'panel',
                region: 'north',
                layout: 'column',
                baseCls: 'my-panel-no-border',
                items: [{
                    xtype: 'textarea',
                    id: 'faultReafx2',
                    fieldLabel: '原因分析',
                    readOnly:true,
                    labelWidth: 70,
                    style: ' margin: 5px 0px 0px -8px',
                    labelAlign: 'right',
                    width: 537
                }

                ]
            },{
                xtype: 'panel',
                region: 'north',
                layout: 'vbox',
                baseCls: 'my-panel-no-border',
                items: [
                    {   id:'faultRea2',
                        xtype: 'checkboxgroup',
                        name: 'faultRea2',
                        labelAlign: 'right',
                        style: ' margin: 5px 0px 0px -8px',
                        disabled :true,
                        width: 557,  //宽度220
                        labelWidth: 70,
                        columns: 4,  //在上面定义的宽度上展示3列
                        fieldLabel: '事故原因',
                        items: [
                            {boxLabel: '指挥失当', name: 'zhsd'},
                            {boxLabel: '违规操作', name: 'wgcz'},
                            {boxLabel: '超负荷运转', name: 'cfhyz'},
                            {boxLabel: '润滑原因', name: 'rhyy'},
                            {boxLabel: '检修原因', name: 'jxyy'},
                            {boxLabel: '点检原因', name: 'djyy'},
                            {boxLabel: '材料备件质量', name: 'clbjzl'},
                            {boxLabel: '设计原因', name: 'sjyy'},
                            {boxLabel: '安装原因', name: 'azyy'},
                            {boxLabel: '制造质量', name: 'zzzl'},
                            {boxLabel: '自然因素', name: 'zryy'},
                            {boxLabel: '其他因素', name: 'qtyy'}

                        ]
                    },{
                        xtype: 'textfield',
                        id: 'faultRea22',
                        column:2,
                        fieldLabel: '其他因素',
                        readOnly:true,
                        labelWidth: 70,
                        style: ' margin: 5px 0px 0px 52px',
                        labelAlign: 'right',
                        width: 477
                    }


                ]
            }, {
                xtype: 'panel',
                region: 'north',
                layout: 'column',
                baseCls: 'my-panel-no-border',
                items: [{
                    xtype: 'textarea',
                    id: 'faultclgc2',
                    fieldLabel: '抢修经过',//处理过程
                    readOnly:true,
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
                items: [{
                    xtype: 'textarea',
                    id: 'faultqxfa2',
                    fieldLabel: '抢修方案',
                    readOnly:true,
                    labelWidth: 70,
                    style: ' margin: 5px 0px 0px -8px',
                    labelAlign: 'right',
                    width: 537
                }]
            },{
                xtype: 'panel',
                region: 'north',
                layout: 'column',
                baseCls: 'my-panel-no-border',
                items: [{
                    xtype: 'textarea',
                    id: 'faultDesc2',
                    fieldLabel: '故障现象',
                    readOnly:true,
                    labelWidth: 70,
                    hidden:true,
                    style: ' margin: 5px 0px 0px -8px',
                    labelAlign: 'right',
                    width: 537
                },{
                    xtype: 'label',
                    width: 5,
                    text: '*',
                    hidden:true,
                    style: 'color:red',
                    margin : ' margin: 5px 0px 5px 5px'
                }

                ]
            }, {
                xtype: 'panel',
                region: 'north',
                layout: 'column',
                baseCls: 'my-panel-no-border',
                items: [{
                    xtype: 'textarea',
                    id: 'faultSol2',
                    fieldLabel: '故障解决',
                    readOnly:true,
                    labelWidth: 70,
                    hidden:true,
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
                    id: 'faultzgcs2',
                    fieldLabel: '防范措施',//整改措施
                    labelWidth: 70,
                    style: ' margin: 5px 0px 0px -8px',
                    labelAlign: 'right',
                    readOnly:true,
                    width: 537
                }]
            },{
                xtype: 'panel',
                region: 'north',
                layout: 'column',
                baseCls: 'my-panel-no-border',
                items: [{
                    xtype: 'textarea',
                    id: 'fzrcl2',
                    fieldLabel: '负责者处理',
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
        // baseCls: 'my-panel-no-border',
        // height: 597,
        bodyPadding: 10,
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
                    style: ' margin: 5px 0px 0px -8px',
                    buttonText: '选择文件',
                    allowBlank: false
                }, {
                    id: 'insertFilesFj2',
                    xtype: 'button',
                    text: '上传',
                    style: ' margin: 5px 0px 0px 15px',
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
                    width: 530,
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
                // width : 450,
                items : [equGridpanel]
            },

            {
                region : 'east',
                border : false,
                width : 600,
                items : [ addPanel2,uploadpanel2]
            }

        ]
    });

    _init();

    _selecteFaultStore2();

});
function _init2(){
    if (orgLoad2 && equFaultLoad2 && init) {
        init = false;
    }
}
function _init() {
    Ext.Ajax.request({
            url: AppUrl + 'cxy/PM_14_FAULT_ITEM_DATA_GET',
            type: 'ajax',
            method: 'POST',
            params: {
                'V_V_GUID': V_V_GUID

            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (resp.success!='true') {//成功，会传回true

                    Ext.getCmp('V_V_ORGCODE2').setValue(resp.RET[0].V_ORGNAME);
                    Ext.getCmp('V_V_DEPTCODE2').setValue(resp.RET[0].V_DEPTNAME);
                    // Ext.getCmp('V_V_EQUTYPE2').setValue(resp.RET[0].V_EQUTYPECODE);
                    // Ext.getCmp('V_EQUNAME2').setValue(resp.RET[0].V_EQUCODE);

                    Ext.getCmp('equFaultname2').setValue(resp.RET[0].V_TYPENAME);
                    Ext.getCmp('begintime2').setValue(resp.RET[0].V_FINDTIME);
                    // Ext.getCmp('faultRea2').setValue(resp.RET[0].V_FAULT_YY);
                    Ext.getCmp('faultDesc2').setValue(resp.RET[0].V_FAULT_XX);
                    Ext.getCmp('faultLevel2').setValue(resp.RET[0].V_FAULT_LEVELNAME);
                    Ext.getCmp('faultSol2').setValue(resp.RET[0].V_JJBF);
                    Ext.getCmp('faultname2').setValue(resp.RET[0].V_FAULT_NAME);
                    Ext.getCmp('faultpart2').setValue(resp.RET[0].V_FAULT_PART);
                    Ext.getCmp('faultclgc2').setValue(resp.RET[0].V_FAULT_CLGC);
                    Ext.getCmp('faultss2').setValue(resp.RET[0].V_FAULT_SS);
                    Ext.getCmp('faultxz2').setValue(resp.RET[0].V_FAULT_XZ);
                    Ext.getCmp('faultzgcs2').setValue(resp.RET[0].V_FAULT_ZGCS);
                    Ext.getCmp('fzrcl2').setValue(resp.RET[0].V_FZR_CL);
                    Ext.getCmp('endtime2').setValue(resp.RET[0].V_ENDTIME);
                    Ext.getCmp('faultbgr2').setValue(resp.RET[0].V_REPORTER);
                    Ext.getCmp('faultzjzrr2').setValue(resp.RET[0].V_FZR);
                    Ext.getCmp('stoptime2').setValue(resp.RET[0].V_STOPTIME);
                    Ext.getCmp('repairtime2').setValue(resp.RET[0].V_REPAIRTIME);
                    Ext.getCmp('faultxffy2').setValue(resp.RET[0].V_REPAIRCOST);
                    Ext.getCmp('touptime2').setValue(resp.RET[0].V_REPROTTIME);

                    Ext.getCmp('faultjg2').setValue(resp.RET[0].V_FAULT_PASS);
                    Ext.getCmp('faultReafx2').setValue(resp.RET[0].V_CAUSEANALYSIS);
                    Ext.getCmp('faultqxfa2').setValue(resp.RET[0].V_REPAIR_PLAN);

                    if(resp.RET[0].V_FAULT_YY!='') {
                        var str = resp.RET[0].V_FAULT_YY;
                        var i=0;
                        Ext.getCmp('faultRea2').items.each(function (c) {
                            if (str.indexOf(c.boxLabel) != -1) {
                                c.setValue(true);
                                i+=1;
                            }
                        });
                        var arr=resp.RET[0].V_FAULT_YY.split(",");
                        if(arr.length>i){
                            Ext.getCmp('faultRea22').setValue(arr[arr.length-1]);
                        }

                    }


                    V_V_FAULT_GUID=resp.RET[0].V_FAULT_GUID;
                    V_V_FILE_GUID=resp.RET[0].V_FILE_GUID;
                    filequery2(V_V_GUID);
                    _selectGridPanel();
                    if(resp.RET[0].V_STATE=='11'){
                        Ext.getCmp('insertFilesFj2').disable();
                        Ext.getCmp('V_V_FILEBLOB2').disable();
                        Ext.getCmp('filegridPanel2').disable();
                        Ext.getCmp('equGridpanel').disable();
                        Ext.getCmp('faultname2').setReadOnly(true);
                    }
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

function _selecteFaultStore2() {
    var faultStore2 = Ext.data.StoreManager.lookup('faultStore2');
    faultStore2.proxy.extraParams = {

    };
    faultStore2.load();
}
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

    var uploadForm2 = Ext.getCmp('uploadForm2');

    var V_V_FILEBLOB = Ext.getCmp('V_V_FILEBLOB2').getSubmitValue();
    var V_V_FILENAME = V_V_FILEBLOB.split("\\")[V_V_FILEBLOB.split("\\").length - 1].split(".")[0];
    Ext.getCmp('V_V_GUID2').setValue(V_V_GUID);
    Ext.getCmp('V_V_FILENAME2').setValue(V_V_FILENAME);
    Ext.getCmp('V_V_FILEBLOB2').setValue(V_V_FILEBLOB);
    Ext.getCmp('V_V_FILETYPECODE2').setValue('SBGZ');
    Ext.getCmp('V_V_PLANT2').setValue(Ext.getCmp('V_V_ORGCODE2').getSubmitValue());
    Ext.getCmp('V_V_DEPT2').setValue(Ext.getCmp('V_V_DEPTCODE2').getSubmitValue());
    Ext.getCmp('V_V_PERSON2').setValue(V_V_PERSONCODE);
    Ext.getCmp('V_V_REMARK2').setValue(Ext.getCmp('V_V_REMARK2').getSubmitValue());

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



function _validate(obj) {
    var valid = true;
    for (var i = 0; i < obj.items.length; i++) {
        if (obj.items.getAt(i).xtype != 'button' && obj.items.getAt(i).xtype != 'panel' && !obj.items.getAt(i).validate()) {
            valid = false;
        }
    }
    return valid;
}


function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

