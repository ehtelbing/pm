var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var V_ORDERGUID = "";
var taskId = '';
var V_STEPCODE = '';
var deptLoad2 = false;
var orgLoad2 = false;
var equFaultLoad2 = false;
var nextSprName2 = false;
var equFaultLevel2=false;
var init = true;
var initadd = true;
var code ="";
var Assignee='';
var processKey = '';
var V_STEPNAME = '';
var V_NEXT_SETP = '';
var V_V_FAULT_GUID='';
var V_V_FILE_GUID='';
var ProcessInstanceId='';
var V_V_ORGCODE_TEMP='';
var V_V_DEPTCODE_TEMP='';
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
//分钟
var minutes=[];
for (var k = 0; k <= 59; k++) {
    if (k< 10) {
        k = '0' + k;
    }
    minutes.push({displayField: k, valueField: k});
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
    var minuteStore = Ext.create("Ext.data.Store", {
        storeId: 'minuteStore',
        autoLoad: true,
        fields: ['displayField', 'valueField'],
        data: minutes,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });

    var orgStore2 = Ext.create('Ext.data.Store', {
        id: 'orgStore2',
        autoLoad: false,
        fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'V_V_PERSONCODE': V_V_PERSONCODE,
                'V_V_DEPTCODE': V_V_DEPTCODE,
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '基层单位'
            }
        }
    });

    var deptStore2 = Ext.create('Ext.data.Store', {
        id: 'deptStore2',
        autoLoad: false,
        fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var equFaultStore2 = Ext.create('Ext.data.Store', {
        id: 'equFaultStore2',
        autoLoad: false,
        fields: ['V_TYPECODE', 'V_TYPENAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_14/PM_14_FAULT_TYPE_ITEM_SEL',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            reader: {
                type: 'json',
                root: 'list'
            }
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
                nextSprName2 = true;
                if(store.getAt(0) != null){
                    processKey = store.getProxy().getReader().rawData.RET;
                    V_STEPNAME = store.getAt(0).data.V_V_FLOW_STEPNAME;
                    V_NEXT_SETP = store.getAt(0).data.V_V_NEXT_SETP;
                    Ext.getCmp('nextPer').select(store.first());
                    var list = Ext.getCmp("nextPer").getStore().data.items;
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].raw.V_PERSONCODE == Assignee) {
                            Ext.getCmp("nextPer").setValue(Assignee);
                            return;
                        }
                        if (list[i].raw.V_PERSONCODE == Ext.util.Cookies.get('v_personcode')) {

                            Ext.getCmp("nextPer").setValue(Ext.util.Cookies.get('v_personcode'));
                            return;
                        }
                    }

                }
            }
        }
    });
    var gridStore =Ext.create('Ext.data.Store', {
        id : 'gridStore',
        autoLoad : false,
        fields : ['V_EQUTYPENAME', 'V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_EQUSITENAME','V_EQUTYPECODE','V_EQUUPCODE','V_FAULTCODE','V_GGXH'],
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
                id: 'nextPer',
                xtype: 'combo',
                store: nextSprStore,
                fieldLabel: '下一步接收人',
                editable: false,
                labelWidth: 80,
                displayField: 'V_PERSONNAME',
                valueField: 'V_PERSONCODE',
                queryMode: 'local',
                //baseCls: 'margin-bottom',
                fieldStyle: 'background-color: #FFEBCD; background-image: none;',
                style: ' margin: 5px 0px 0px 5px',
                labelAlign: 'right',
                width: 200
            }, {
                id: 'spyj',
                xtype: 'textfield',
                fieldLabel: '审批意见',
                labelWidth: 90,
                //baseCls: 'margin-bottom',
                fieldStyle: 'background-color: #FFEBCD; background-image: none;',
                style: ' margin: 5px 0px 0px 5px',
                labelAlign: 'right',
                width: 250
            }, {
                xtype: 'button',
                text: '提交',
                style: ' margin: 5px 20px 0px 20px',
                icon: imgpath + '/saved.png',
                handler: _agree
            }, {
                xtype: 'button',
                text: '撤销完结',
                // width: 90,
                icon: imgpath + '/accordion_expand.png',
                handler: OnButtonNoOver
            }
            // , {
            //     xtype: 'button',
            //     text: '驳回',
            //     style: ' margin: 5px 20px 0px 0px',
            //     icon: imgpath + '/cross.png',
            //     handler: _reject
            // }
        ]
    });

    var equGridpanel = Ext.create('Ext.grid.Panel', {
        id : 'equGridpanel',
        region : 'center',
        store : gridStore,
        columnLines : true,
        // selType: 'checkboxmodel',
        // plugins : [ Ext.create('Ext.grid.plugin.CellEditing', {
        //     clicksToEdit : 1
        // }) ],
        columns : [
            // {
            //     text : '删除',
            //     dataIndex : 'V_FAULTCODE',
            //     align : 'center',
            //     width : 80, renderer :_delete
            //
            // },
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
            },{
                text : '规格型号',
                dataIndex : 'V_GGXH',
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
            items: [{
                xtype: 'combo',
                id: 'V_V_ORGCODE2',
                store: orgStore2,
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                forceSelection: true,
                fieldLabel: '厂矿',
                readOnly:true,
                editable: false,
                labelWidth: 80,
                width: 270,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right'
                // listeners: {
                //     select: function () {
                //         Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
                //         init = false;
                //         _selectDept2();
                //         /* _selecteType2();
                //          _selectequName2();
                //          _selectsubequName2();*/
                //
                //     }
                // }
            }, {
                xtype: 'combo',
                id: 'V_V_DEPTCODE2',
                store: deptStore2,
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                forceSelection: true,
                fieldLabel: '作业区',
                readOnly:true,
                editable: false,
                labelWidth: 80,
                width: 270,
                style: ' margin: 5px 0px 0px -3px',
                labelAlign: 'right'
                // listeners: {
                //     select: function (field, newValue, oldValue) {
                //         Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
                //         init = false;
                //         // _selecteType2();
                //         /* _selectequName2();
                //          _selectsubequName2();*/
                //
                //     }
                // }
            }

            ]
        },{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [ {
                xtype: 'textfield',
                id: 'faultname2',
                fieldLabel: '事故名称',
                labelWidth: 80,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 270
            },  {
                xtype: 'textfield',
                id: 'assentcode2',//faultbgr
                fieldLabel: '资产编码',
                labelWidth: 80,
                style: ' margin: 5px 0px 0px -3px',
                labelAlign: 'right',
                width: 270
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [ {
                xtype: 'combo',
                id: 'equFaultname2',
                store: equFaultStore2,
                queryMode: 'local',
                valueField: 'V_TYPECODE',
                displayField: 'V_TYPENAME',
                forceSelection: true,
                fieldLabel: '事故类别',
                readOnly:true,
                editable: false,
                labelWidth: 80,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 270
            }, {
                xtype: 'textfield',
                id: 'faultzjzrr2',
                fieldLabel: '直接责任人',
                labelWidth: 80,
                style: ' margin: 5px 0px 0px -3px',
                labelAlign: 'right',
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
                value: new Date(),//,V_begintime,new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                fieldLabel: '事故发生时间',
                labelWidth: 80,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 240,
                baseCls: 'margin-bottom'
            },{
                xtype: 'combo',
                id: 'fshour',
                // fieldLabel: '小时',
                editable: false,
                margin: '5 0 0 5',
                //labelWidth: 28,
                width:65,
                value:nowhours,
                displayField: 'displayField',
                valueField: 'valueField',
                store: hourStore,
                queryMode: 'local'
            }, {xtype: 'label', text: '小时', style: {margin: '8px 0px 0px 5px'}}
                ,{
                    xtype: 'combo',
                    width: 65,
                    id: 'fsminute',
                    editable: false,
                    margin: '5 0 0 5',
                    store: minuteStore,
                    displayField: 'displayField',
                    valueField: 'valueField',
                    value: new Date().getMinutes()
                }, {xtype: 'label', text: '分', style: {margin: '8px 0px 0px 5px'}}
            ]
        } ,{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'endtime2',
                xtype: 'datefield',
                editable: false,
                format: 'Y-m-d',
                //submitFormat: 'yyyy-mm-dd',
                value: new Date(),//,V_begintime,new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                fieldLabel: '排除时间',
                labelWidth: 80,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 240,
                baseCls: 'margin-bottom'
            },{
                xtype: 'combo',
                id: 'pchour',
                // fieldLabel: '小时',
                editable: false,
                margin: '5 0 0 5',
                labelWidth: 28,
                width: 65,
                value:nowhours,
                displayField: 'displayField',
                valueField: 'valueField',
                store: hourStore,
                queryMode: 'local'
            }, {xtype: 'label', text: '小时', style: { margin: '8px 0px 0px 5px'}}
                ,{
                    xtype: 'combo',
                    width: 65,
                    id: 'pcminute',
                    editable: false,
                    margin: '5 0 0 5',
                    store: minuteStore,
                    displayField: 'displayField',
                    valueField: 'valueField',
                    value: new Date().getMinutes()
                }, {xtype: 'label', text: '分', style: {margin: '8px 0px 0px 5px'}}
            ]
        } , {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'stoptime2',
                fieldLabel: '停机时间',
                labelWidth: 80,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 240
            },{xtype: 'label', text: '小时', style: { margin: '8px 0px 0px 5px'}},
                {
                    xtype: 'textfield',
                    id: 'repairtime2',
                    fieldLabel: '修理时间',
                    labelWidth: 80,
                    style: ' margin: 5px 0px 0px -1px',
                    labelAlign: 'right',
                    width: 240
                },{xtype: 'label', text: '小时', style: { margin: '8px 0px 0px 5px'}}
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
                    labelWidth: 80,
                    style: ' margin: 5px 0px 0px -8px',
                    labelAlign: 'right',
                    minValue:'0',
                    nanText: "请输入有效数字",
                    validateOnBlur: false,
                    validateOnChange: false,
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
                    //submitFormat: 'yyyy-mm-dd',
                    value: new Date(),//,V_begintime,new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                    fieldLabel: '上报时间',
                    labelWidth: 80,
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
                labelWidth: 80,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                nanText: "请输入有效数字",
                minValue:'0',
                hidden:true,
                validateOnBlur: false,
                validateOnChange: false,
                hideTrigger: true,
                allowBlank: false,
                width: 240
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
                labelWidth: 80,
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
                labelWidth: 80,
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
                    width: 557,  //宽度220
                    labelWidth: 80,
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
                        {boxLabel: '其它因素', name: 'qtyy'}

                    ]
                }
                /* ,{
                     xtype: 'textfield',
                     id: 'faultRea22',
                     column:2,
                     // fieldLabel: '其它因素',
                     // labelWidth: 70,
                     style: ' margin: 5px 0px 0px 67px',
                     labelAlign: 'right',
                     width: 462
                 }*/


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
                labelWidth: 80,
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
                labelWidth: 80,
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
                hidden:true,
                labelWidth: 80,
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
                labelWidth: 80,
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
                labelWidth: 80,
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
                id: 'fzrcl2',
                fieldLabel: '负责者处理',
                labelWidth: 80,
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
                    fieldLabel: '附件',
                    labelWidth: 80,
                    labelAlign: 'right',
                    inputWidth: 201,
                    style: ' margin: 5px 0px 0px -1px',
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
                width: 525,
                margin: '10px 0px 0px 15px',
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
                border : false,
                layout : 'fit',
                width : 450,
                items : [equGridpanel]
            },
            // {
            //     xtype : 'treepanel',
            //     id : 'sectTree',
            //     region : 'west',
            //     frame : true,
            //     // border : false,
            //     width : 260,
            //     store : treeStore,
            //     rootVisible : false,
            //     listeners : {
            //         itemclick : OnClickTreeItem
            //     }
            // },
            {
                region : 'east',
                // border : false,
                frame: true,
                width : 590,
                autoScroll:true,
                items : [ addPanel2,uploadpanel2]
            }

        ]
    });
    _init();
    getAssignee();
});

function _selectTaskId(value) {
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
            _selectNextPer(value);
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
function _selectNextPer(code) {
    var nextSprStore = Ext.data.StoreManager.lookup('nextSprStore');
    nextSprStore.proxy.extraParams = {
        V_V_ORGCODE: V_V_ORGCODE_TEMP,
        V_V_DEPTCODE: V_V_DEPTCODE_TEMP,
        V_V_REPAIRCODE: code,
        V_V_FLOWTYPE: 'Fault',
        V_V_FLOW_STEP: $.url().param("TaskDefinitionKey"),
        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_SPECIALTY: '',
        V_V_WHERE: '通过'
    };
    nextSprStore.currentPage = 1;
    nextSprStore.load();
    // selNextPer();
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
function _init() {
    Ext.Ajax.request({
        url: AppUrl + 'cxy/PM_14_FAULT_ITEM_DATA_GET',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_V_GUID': V_ORDERGUID

        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.success!='true') {//成功，会传回true
                _selectOrg2();
                Ext.data.StoreManager.lookup('orgStore2').on('load', function () {
                    // Ext.getCmp('V_V_ORGCODE1').select(V_V_ORGCODE);
                    Ext.getCmp('V_V_ORGCODE2').setValue(resp.RET[0].V_ORGCODE);
                    _selectDept2();
                });

                Ext.data.StoreManager.lookup('deptStore2').on('load', function () {
                    // Ext.getCmp('V_V_DEPTCODE2').select(V_V_DEPTCODE);
                    Ext.getCmp('V_V_DEPTCODE2').setValue(resp.RET[0].V_DEPTCODE);
                    _selecteFaultStore2();
                });
                Ext.data.StoreManager.lookup('equFaultStore2').on('load', function () {
                    Ext.getCmp('equFaultname2').setValue(resp.RET[0].V_TYPECODE);
                    Ext.getBody().unmask();
                });
                //Ext.getCmp('equFaultname2').setValue(resp.RET[0].V_TYPECODE);
                V_V_ORGCODE_TEMP=resp.RET[0].V_ORGCODE;
                V_V_DEPTCODE_TEMP=resp.RET[0].V_DEPTCODE;
                var beginrq=resp.RET[0].V_FINDTIME.toString().split(' ')[0];
                var beginsj=resp.RET[0].V_FINDTIME.toString().split(' ')[1];
                Ext.getCmp('begintime2').setValue(beginrq);
                Ext.getCmp('fshour').setValue(beginsj.split(':')[0]);
                Ext.getCmp('fsminute').setValue(beginsj.split(':')[1]);

                Ext.getCmp('faultDesc2').setValue(resp.RET[0].V_FAULT_XX);
                // Ext.getCmp('faultLevel2').setValue(resp.RET[0].V_FAULT_LEVEL);
                Ext.getCmp('faultSol2').setValue(resp.RET[0].V_JJBF);
                Ext.getCmp('faultname2').setValue(resp.RET[0].V_FAULT_NAME);
                // Ext.getCmp('faultpart2').setValue(resp.RET[0].V_FAULT_PART);
                Ext.getCmp('faultclgc2').setValue(resp.RET[0].V_FAULT_CLGC);
                Ext.getCmp('faultss2').setValue(resp.RET[0].V_FAULT_SS);
                // Ext.getCmp('faultxz2').setValue(resp.RET[0].V_FAULT_XZ);
                Ext.getCmp('faultzgcs2').setValue(resp.RET[0].V_FAULT_ZGCS);
                Ext.getCmp('fzrcl2').setValue(resp.RET[0].V_FZR_CL);
                var endrq=resp.RET[0].V_ENDTIME.toString().split(' ')[0];
                var endsj=resp.RET[0].V_ENDTIME.toString().split(' ')[1];
                Ext.getCmp('endtime2').setValue(endrq);
                Ext.getCmp('pchour').setValue(endsj.split(':')[0]);
                Ext.getCmp('pcminute').setValue(endsj.split(':')[1]);
                // Ext.getCmp('faultbgr2').setValue(resp.RET[0].V_REPORTER);
                Ext.getCmp('faultzjzrr2').setValue(resp.RET[0].V_FZR);
                Ext.getCmp('stoptime2').setValue(resp.RET[0].V_STOPTIME);
                Ext.getCmp('repairtime2').setValue(resp.RET[0].V_REPAIRTIME);
                Ext.getCmp('faultxffy2').setValue(resp.RET[0].V_REPAIRCOST);
                Ext.getCmp('touptime2').setValue(resp.RET[0].V_REPROTTIME);

                Ext.getCmp('faultjg2').setValue(resp.RET[0].V_FAULT_PASS);
                Ext.getCmp('faultReafx2').setValue(resp.RET[0].V_CAUSEANALYSIS);
                Ext.getCmp('faultqxfa2').setValue(resp.RET[0].V_REPAIR_PLAN);
                Ext.getCmp('assentcode2').setValue(resp.RET[0].V_ASSENT_CODE);
                if(resp.RET[0].V_FAULT_YY!='') {
                    var str = resp.RET[0].V_FAULT_YY;
                    var i=0;
                    Ext.getCmp('faultRea2').items.each(function (c) {
                        if (str.indexOf(c.boxLabel) != -1) {
                            c.setValue(true);
                            i+=1;
                        }
                        // c.setReadOnly(true);
                    });
                    /*var arr=resp.RET[0].V_FAULT_YY.split(",");
                    if(arr.length>i){
                        Ext.getCmp('faultRea22').setValue(arr[arr.length-1]);
                    }*/

                }
                if(resp.RET[0].V_TYPECODE=='1'||resp.RET[0].V_TYPECODE=='2'){
                    _selectTaskId(resp.RET[0].V_DEPTCODE);
                }else{
                    _selectTaskId('99000101');
                }
                V_V_FAULT_GUID=resp.RET[0].V_FAULT_GUID;
                V_V_FILE_GUID=resp.RET[0].V_FILE_GUID;
                filequery2(V_ORDERGUID);
                _selectGridPanel();
                // _selectsubequName2();
                // Ext.getCmp('SUB_V_EQUNAME2').setValue(resp.RET[0].V_EQUCHILD_CODE);



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
function _init2(){
    if (orgLoad2 && deptLoad2 && equFaultLoad2 && equFaultLevel2 && nextSprName2) {
        Ext.getBody().unmask();//去除页面笼罩
    }
}
function _selectGridPanel() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        'V_V_FAULTCODE': V_ORDERGUID
    };
    gridStore.load();
}
function _selectOrg2() {
    var orgStore2 = Ext.data.StoreManager.lookup('orgStore2');

    orgStore2.proxy.extraParams = {
        'V_V_PERSONCODE': V_V_PERSONCODE,
        'V_V_DEPTCODE': V_V_DEPTCODE,
        'V_V_DEPTCODENEXT': '%',
        'V_V_DEPTTYPE': '基层单位'
    };

    orgStore2.currentPage = 1;
    orgStore2.load();

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

function _selecteFaultStore2() {
    Ext.data.StoreManager.lookup('equFaultStore2').load();
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
    // var records = Ext.getCmp('faultItemPanel').getSelectionModel().getSelection();
    var uploadForm2 = Ext.getCmp('uploadForm2');

    var V_V_FILEBLOB = Ext.getCmp('V_V_FILEBLOB2').getSubmitValue();
    var V_V_FILENAME = V_V_FILEBLOB.split("\\")[V_V_FILEBLOB.split("\\").length - 1].split(".")[0];
    Ext.getCmp('V_V_GUID2').setValue(V_ORDERGUID);//records[0].data.V_GUID);
    Ext.getCmp('V_V_FILENAME2').setValue(V_V_FILENAME);
    Ext.getCmp('V_V_FILEBLOB2').setValue(V_V_FILEBLOB);
    Ext.getCmp('V_V_FILETYPECODE2').setValue('SBGZ');
    Ext.getCmp('V_V_PLANT2').setValue(Ext.getCmp('V_V_ORGCODE2').getValue());
    Ext.getCmp('V_V_DEPT2').setValue(Ext.getCmp('V_V_DEPTCODE2').getValue());
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
    Ext.getBody().mask('<p>提交中...请稍候</p>');
    var spyj = '';
    if (Ext.getCmp('spyj').getValue() == '' || Ext.getCmp('spyj').getValue() == null) {
        spyj = '审批通过';
    } else {
        spyj = Ext.getCmp('spyj').getValue();
    }

    /*if (Ext.getCmp('gzyy').getValue() == "") {
        Ext.MessageBox.alert('提示', '请先输入检修内容');
        return;
    }*/

    // if (Ext.getCmp('jhgshj').getValue() < 0) {
    //     Ext.MessageBox.alert('提示', '竣工时间必须大于停工时间');
    //     return;
    // }
    var faultR='';
    var cbitems = Ext.getCmp('faultRea2').items;
    for (var i = 0; i < cbitems.length; i++) {
        if (cbitems.items[i].checked) {
            faultR += cbitems.items[i].boxLabel+',';
        }
    }
    if(faultR.length>0){
        faultR=faultR.substring(0,faultR.length-1);
    }
    var begintime=Ext.getCmp("begintime2").getSubmitValue()+' '+Ext.getCmp("fshour").getSubmitValue()+':'+Ext.getCmp("fsminute").getSubmitValue();//+':00';
    var endtime=Ext.getCmp("endtime2").getSubmitValue()+' '+Ext.getCmp("pchour").getSubmitValue()+':'+Ext.getCmp("pcminute").getSubmitValue();//+':00';

    Ext.Ajax.request({
        url: AppUrl + 'cxy/PM_1405_FAULT_ITEM_DATA_UPDATE',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_V_GUID': V_ORDERGUID,
            'V_V_ORGCODE': Ext.getCmp("V_V_ORGCODE2").getValue(),
            'V_V_DEPTCODE': Ext.getCmp("V_V_DEPTCODE2").getValue(),
            'V_V_EQUTYPE': '',//Ext.getCmp("V_V_EQUTYPE2").getValue(),
            'V_V_EQUCODE': '',//Ext.getCmp("V_EQUNAME2").getValue(),
            'V_V_EQUCHILD_CODE': '',//Ext.getCmp("SUB_V_EQUNAME2").getValue(),
            'V_V_FAULT_GUID': V_V_FAULT_GUID,
            'V_V_FAULT_TYPE': Ext.getCmp("equFaultname2").getValue(),
            'V_V_FAULT_YY': faultR,
            'V_V_FINDTIME': begintime,
            'V_V_FAULT_XX': Ext.getCmp("faultDesc2").getValue(),
            'V_V_JJBF': Ext.getCmp("faultSol2").getValue(),
            'V_V_FAULT_LEVEL': '',
            'V_V_FILE_GUID': V_V_FILE_GUID,
            'V_V_INTIME': Ext.Date.format(new Date(), 'Y-m-d'),
            'V_V_PERCODE': V_V_PERSONCODE,
            'V_V_IP': '',
            'V_V_FAULT_NAME':Ext.getCmp("faultname2").getValue(),
            'V_V_FAULT_PART':'',
            'V_V_FAULT_CLGC':Ext.getCmp("faultclgc2").getValue(),
            'V_V_FAULT_SS':Ext.getCmp("faultss2").getValue(),
            'V_V_FAULT_XZ':'',
            'V_V_FAULT_ZGCS':Ext.getCmp("faultzgcs2").getValue(),
            'V_V_FZR_CL':Ext.getCmp("fzrcl2").getValue(),

            'V_V_ENDTIME':endtime,
            'V_V_REPORTER':Ext.util.Cookies.get('v_personcode'),
            'V_V_FZR':Ext.getCmp("faultzjzrr2").getValue(),
            'V_V_STOPTIME':Ext.getCmp("stoptime2").getSubmitValue(),
            'V_V_REPAIRTIME':Ext.getCmp("repairtime2").getSubmitValue(),
            'V_V_REPAIRCOST':Ext.getCmp("faultxffy2").getValue(),
            'V_V_REPROTTIME': Ext.getCmp("touptime2").getSubmitValue(),
            'V_V_FAULT_PASS': Ext.getCmp("faultjg2").getValue(),
            'V_V_CAUSEANALYSIS': Ext.getCmp("faultReafx2").getValue(),
            'V_V_REPAIR_PLAN':Ext.getCmp("faultqxfa2").getValue(),
            'V_V_ASSENT_CODE':Ext.getCmp("assentcode2").getValue()//资产编码
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET=='Success') {//成功，会传回true
                Ext.Ajax.request({
                    url: AppUrl + 'cxy/PM_14_FAULT_ITEM_DATA_STATE_UPDATE',
                    method: 'POST',
                    type: 'ajax',
                    params: {
                        V_V_PERCODE:Ext.util.Cookies.get('v_personcode'),
                        V_V_GUID: $.url().param("V_ORDERGUID"),
                        V_V_STATE: '1',//审核中
                        V_DEFECT_STATE:'50'//已计划

                    },

                    success: function (ret) {
                        var resp = Ext.decode(ret.responseText);
                        if (resp.RET == 'SUCCESS') {

                           /* Ext.Ajax.request({
                                url: AppUrl + 'hp/PRO_ACTIVITI_FLOW_AGREE',
                                method: 'POST',
                                async: false,
                                params: {
                                    'V_V_ORDERID': V_ORDERGUID,
                                    'V_V_PROCESS_NAMESPACE': 'Fault',
                                    'V_V_PROCESS_CODE': processKey,
                                    'V_V_STEPCODE': V_STEPCODE,
                                    'V_V_STEPNEXT_CODE': V_NEXT_SETP
                                },
                                success: function (resp) {
                                    var resp = Ext.JSON.decode(resp.responseText);
                                    if (resp.V_INFO == 'success') {*/
                                        Ext.Ajax.request({
                                            url: AppUrl + 'Activiti/TaskComplete',
                                            type: 'ajax',
                                            method: 'POST',
                                            params: {
                                                taskId: taskId,
                                                idea: '通过',
                                                parName: [V_NEXT_SETP, "flow_yj"],
                                                parVal: [Ext.getCmp('nextPer').getValue(), spyj],
                                                processKey: processKey,
                                                businessKey: V_ORDERGUID,
                                                V_STEPCODE: V_STEPCODE,
                                                V_STEPNAME: V_STEPNAME,
                                                V_IDEA: '请审批！',
                                                V_NEXTPER: Ext.getCmp('nextPer').getValue(),
                                                V_INPER: Ext.util.Cookies.get('v_personcode')
                                            },
                                            success: function (response) {
                                                Ext.getBody().unmask();
                                                var resp = Ext.decode(response.responseText);
                                                if (resp.ret == '任务提交成功') {
                                                    Ext.MessageBox.show({
                                                        title: '提示',
                                                        msg: '任务提交成功',
                                                        buttons: Ext.MessageBox.OK,
                                                        fn: function () {
                                                            window.opener.QueryTab();
                                                            window.opener.QuerySum();
                                                            window.opener.QueryGrid();
                                                            window.close();
                                                        }
                                                    });
                                                } else {
                                                    Ext.MessageBox.alert('提示', '任务提交失败');
                                                }
                                            },
                                            failure: function (response) {//访问到后台时执行的方法。
                                                Ext.getBody().unmask();
                                                Ext.MessageBox.show({
                                                    title: '错误',
                                                    msg: response.responseText,
                                                    buttons: Ext.MessageBox.OK,
                                                    icon: Ext.MessageBox.ERROR
                                                })
                                            }
                                        });

                                   /* } else {
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
                            });*/

                        }else{
                            Ext.getBody().unmask();
                            Ext.Msg.alert('提示', '事故修改状态失败！');
                        }
                    },failure: function (ret) {//访问到后台时执行的方法。
                        Ext.getBody().unmask();
                        Ext.MessageBox.show({
                            title: '错误',
                            msg: ret.responseText,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        })
                    }
                });



            } else {
                Ext.getBody().unmask();
                Ext.MessageBox.show({
                    title: '错误',
                    msg: data.RET,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        },
        failure: function (response) {//访问到后台时执行的方法。
            Ext.getBody().unmask();
            Ext.MessageBox.show({
                title: '错误',
                msg: '修改内容失败',//response.responseText
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            })
        }
    })
}
function _reject() {
    Ext.getBody().mask('<p>撤销完结中...请稍候</p>');
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/TaskComplete',
        type: 'ajax',
        method: 'POST',
        params: {
            taskId: taskId,
            idea: '不通过',
            parName: [ "flow_yj"],
            parVal: [ '驳回'],
            processKey :processKey,
            businessKey : V_ORDERGUID,
            V_STEPCODE : 'end',
            V_STEPNAME : '驳回',
            V_IDEA : '驳回',
            V_NEXTPER : '',
            V_INPER : Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            Ext.getBody().unmask();
            Ext.MessageBox.show({
                title: '提示',
                msg: '撤销完结成功',
                buttons: Ext.MessageBox.OK,
                fn: function () {
                    window.opener.QueryTab();
                    window.opener.QuerySum();
                    window.opener.QueryGrid();
                    window.close();
                }
            });

        },
        failure: function (response) {//访问到后台时执行的方法。
            Ext.getBody().unmask();
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            })
        }
    })
}
function OnButtonNoOver() {

    Ext.MessageBox.show({
        title: '确认',
        msg: '请确认是否撤销完结！',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESTION,
        fn: function (btn) {
            if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: AppUrl + 'cxy/PRO_FAULT_EQUIP_CANCEL_OVER',
                            type: 'ajax',
                            method: 'POST',
                            params: {
                                'V_V_FAULTCODE': V_ORDERGUID
                            },
                            success: function (response) {

                                var resp=Ext.decode(response.responseText);
                                if(resp.RET=='SUCCESS'){
                                    _reject();

                                }else{

                                    Ext.MessageBox.show({
                                        title: '错误',
                                        msg: resp.RET,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.WARNING
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
        }
    });
}