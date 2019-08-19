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
var selectID = [];
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

    var orgStore = Ext.create('Ext.data.Store', {
        id: 'orgStore',
        autoLoad: true,
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
        },
        listeners: {
            load: function (store, records) {
                orgLoad = true;
                Ext.getCmp('V_V_ORGCODE').select(store.first());
                _init();
            }
        }
    });



    var deptStore = Ext.create('Ext.data.Store', {
        id: 'deptStore',
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
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('V_V_DEPTCODE').select(store.first());
                zyqload = true;
                _init();
            }
        }
    });




    var eTypeStore = Ext.create('Ext.data.Store', {
        id: 'eTypeStore',
        autoLoad: false,
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        listeners: {
            load: function (store, records) {
                // Ext.getCmp('V_V_EQUTYPE').select(store.last());
                Ext.getCmp('V_V_EQUTYPE').select(store.first());

                sbtypeload = true;
                _init();
            }
        }
    });



    var equNameStore = Ext.create('Ext.data.Store', {
        id: 'equNameStore',
        autoLoad: false,
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQU_PER_DROP',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('V_EQUNAME').select(store.first());
                sbnameload = true;
                _init();
            }
        }
    });



    var subequNameStore = Ext.create('Ext.data.Store', {
        id: 'subequNameStore',
        autoLoad: false,
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy:  Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_14/PRO_SAP_EQU_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }),
        listeners: {
            load: function (store, records) {

                store.insert(0, {V_EQUNAME: '全部', V_EQUCODE: '%'});
                Ext.getCmp('SUB_V_EQUNAME').select(store.first());
                zsbnameload = true;
                _init();
            }
        }
    });


    // var subequNameStore2 = Ext.create('Ext.data.Store', {
    //     id: 'subequNameStore2',
    //     autoLoad: false,
    //     fields: ['V_EQUCODE', 'V_EQUNAME'],
    //     proxy: Ext.create("Ext.ux.data.proxy.Ajax",  {
    //         type: 'ajax',
    //         async: false,
    //         url: AppUrl + 'PM_14/PRO_SAP_EQU_VIEW',
    //         actionMethods: {
    //             read: 'POST'
    //         },
    //         reader: {
    //             type: 'json',
    //             root: 'list'
    //         }
    //     }),
    //     listeners: {
    //         load: function (store, records) {
    //             store.insert(0, {V_EQUNAME: '全部', V_EQUCODE: '%'});
    //             Ext.getBody().unmask();
    //             Ext.getCmp('SUB_V_EQUNAME2').select(store.first());
    //             /*if (init) {
    //              //Ext.getCmp('SUB_V_EQUNAME2').select(store.first());
    //              // _init2();
    //              } else {
    //              Ext.getCmp('SUB_V_EQUNAME2').select(store.first());
    //              }*/
    //         }
    //     }
    // });


    var equFaultStore = Ext.create('Ext.data.Store', {
        id: 'equFaultStore',
        autoLoad: true,
        fields: ['V_TYPECODE', 'V_TYPENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'cxy/PM_BUG_TYPE_ITEM_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        listeners: {
            load: function (store, records) {
                equFaultLoad = true;
                store.insert(0, {V_TYPENAME: '全部', V_TYPECODE: '%'});
                Ext.getCmp('equFaultname').select(store.first());
                _init();
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
                nextSprLoad = true;
                if( store.getAt(0)==undefined){
                    Ext.getCmp('nextPer').select(''); return;
                }else{
                    processKey = store.getProxy().getReader().rawData.RET;
                    V_STEPNAME = store.getAt(0).data.V_V_FLOW_STEPNAME;
                    V_NEXT_SETP = store.getAt(0).data.V_V_NEXT_SETP;
                    Ext.getCmp('nextPer').select(store.first());
                }

            }

        }
    });
    // var winnextSprStore = Ext.create("Ext.data.Store", {
    //     autoLoad: false,
    //     storeId: 'winnextSprStore',
    //     fields: ['V_PERSONCODE', 'V_PERSONNAME', 'V_V_NEXT_SETP', 'V_V_FLOW_STEPNAME'],
    //     proxy: {
    //         type: 'ajax',
    //         async: false,
    //         url: AppUrl + 'hp/PM_ACTIVITI_PROCESS_PER_SEL',
    //         actionMethods: {
    //             read: 'POST'
    //         },
    //         reader: {
    //             type: 'json',
    //             root: 'list'
    //         },
    //         extraParams: {}
    //     },
    //     listeners: {
    //         load: function (store, records, success, eOpts) {
    //             if( store.getAt(0)==undefined){
    //                 Ext.getCmp('winnextPer').select(''); return;
    //             }else{
    //                 processKey2 = store.getProxy().getReader().rawData.RET;
    //                 V_STEPNAME2 = store.getAt(0).data.V_V_FLOW_STEPNAME;
    //                 V_NEXT_SETP2 = store.getAt(0).data.V_V_NEXT_SETP;
    //                 Ext.getCmp('winnextPer').select(store.first());
    //             }
    //
    //         }
    //
    //     }
    // });
    var faultItemStore = Ext.create('Ext.data.Store', {
        storeId: 'faultItemStore',
        autoLoad: false,
        //pageSize: -1,
        fields: ['V_TIME', 'V_EQUTYPE', 'V_EQUNAME', 'V_EQUCHILD_CODE', 'V_FAULT_TYPE',
            'V_FAULT_YY', 'V_FAULT_XX', 'V_FAULT_LEVEL', 'V_FAULT_LEVELNAME','V_JJBF', 'V_GUID', 'V_FILE_GUID',
            'V_ORGCODE', 'I_ID', 'V_DEPTNAME', 'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME', 'V_TYPECODE',
            'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_EQUCODE', 'V_FAULT_GUID', 'V_FINDTIME', 'V_PART',
            'V_TYPENAME', 'V_EQUCHILD_NAME','V_FAULT_NAME','V_STATE','V_STATENAME',
            'V_FAULT_PART','V_FAULT_CLGC','V_FAULT_SS','V_FAULT_XZ','V_FAULT_ZGCS','V_FZR_CL',
            'V_FAULTID','V_PROCESSINSTANCEID','V_INPERCODE','V_INPERNAME',
            'V_ENDTIME','V_REPORTER','V_FZR','V_STOPTIME','V_GGXH',
            'V_REPAIRTIME','V_REPAIRCOST','V_REPROTTIME','V_FAULT_PASS','V_CAUSEANALYSIS','V_REPAIR_PLAN'],
        proxy: {
            url: AppUrl + 'cxy/PM_BUG_DATA_OVER_SEL',
            type: 'ajax',
            async: false,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

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


    var buttonPanel = Ext.create('Ext.Panel', {
        id : 'buttonPanel',
        defaults : {
            style : 'margin:2px'
        },
        items : [ {
            xtype: 'button',
            text: '查询',
            icon: imgpath + '/search.png',
            handler: _seltctFault
        },{
            xtype: 'button',
            text: '上报',
            // width: 90,
            icon: imgpath + '/accordion_collapse.png',
            handler: OnButtonUp
        },{
            xtype: 'button',
            text: '打印',
            // width: 90,
            icon: imgpath + '/printer.png',
            handler: OnButtonPrint
        }
        ]
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
        items : [{
            xtype: 'combo',
            id: 'V_V_ORGCODE',
            store: orgStore,
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            forceSelection: true,
            fieldLabel: '厂矿',
            editable: false,
            labelWidth: 70,
            width: 250,
            listeners: {
                change: function (field, newValue, oldValue) {
                    _selectDept();
                }
            }
        }, {
            xtype: 'combo',
            id: 'V_V_DEPTCODE',
            store: deptStore,
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            forceSelection: true,
            fieldLabel: '作业区',
            editable: false,
            labelWidth: 70,
            width: 250,
            listeners: {
                change: function (field, newValue, oldValue) {
                    _selecteType();
                    _selectNextSprStore();
                    // _selectNextSprStore2();
                }
            }
        }, {
            xtype: 'combo',
            id: 'V_V_EQUTYPE',
            store: eTypeStore,
            queryMode: 'local',
            valueField: 'V_EQUTYPECODE',
            displayField: 'V_EQUTYPENAME',
            forceSelection: true,
            fieldLabel: '设备类型',
            editable: false,
            labelWidth: 70,
            width: 250,
            listeners: {
                change: function (field, newValue, oldValue) {
                    _selectequName();
                }
            }
        }, {
            xtype: 'combo',
            id: 'V_EQUNAME',
            store: equNameStore,
            queryMode: 'local',
            valueField: 'V_EQUCODE',
            displayField: 'V_EQUNAME',
            forceSelection: true,
            fieldLabel: '设备名称',
            editable: false,
            labelWidth: 70,
            width: 250,
            listeners: {
                change: function (field, newValue, oldValue) {
                    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
                    _selectsubequName();
                }

            }
        },
            {
                xtype: 'combo',
                id: 'SUB_V_EQUNAME',
                store: subequNameStore,
                queryMode: 'local',
                valueField: 'V_EQUCODE',
                displayField: 'V_EQUNAME',
                forceSelection: true,
                fieldLabel: '子设备名称',
                editable: false,
                labelWidth: 90,
                width: 250
            }, {
                xtype: 'combo',
                id: 'equFaultname',
                store: equFaultStore,
                queryMode: 'local',
                valueField: 'V_TYPECODE',
                displayField: 'V_TYPENAME',
                forceSelection: true,
                fieldLabel: '故障类型',
                editable: false,
                labelWidth: 70,
                width: 250
            }, {
                id: 'begintime',
                xtype: 'datefield',
                editable: false,
                format: 'Y-m-d',
                value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                fieldLabel: '发现时间',
                labelWidth: 70,
                width: 250,
                baseCls: 'margin-bottom'
            }, {
                id: 'endtime',
                xtype: 'datefield',
                editable: false,
                format: 'Y-m-d',
                value: new Date(),
                fieldLabel: '至',
                labelWidth: 70,
                width: 250,
                baseCls: 'margin-bottom'
            }
            ,{
                xtype: 'textfield',
                id: 'faulttext',
                fieldLabel: '故障原因',
                labelWidth: 70,
                width: 250
            }
            , {
                xtype: 'combo',
                id: 'nextPer',
                fieldLabel: '下一步接收人',
                editable: false,
                style: ' margin: 5px 0px 0px 10px',
                labelWidth: 90,
                width: 250,
                value: '',
                displayField: 'V_PERSONNAME',
                valueField: 'V_PERSONCODE',
                store: nextSprStore,
                queryMode: 'local'
            }

        ]
    });


    var faultItemPanel = Ext.create('Ext.grid.Panel', {
        id: 'faultItemPanel',
        store: faultItemStore,
        border: false,
        columnLines: true,
        titleAlign: 'center',
        region: 'center',
        selModel: {
            selType: 'checkboxmodel'
            // mode: 'SINGLE'
        },
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 60,
            align: 'center'
        },  {
            text: '状态',
            dataIndex: 'V_STATENAME',
            align: 'center',
            width: 100
        },  {
            text: '工单',
            dataIndex: 'V_GUID',
            align: 'center',
            width: 100,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href="#" onclick="_preViewWorkOrder(\'' + value + '\')">至工单列表</a>';
            }
        },{
            text: '流程',
            dataIndex: 'V_GUID',
            width: 80,
            align: 'center',
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href="#" onclick="_preViewProcess(\'' + value + '\')">' + '查看流程' + '</a>';
            }
        },{
            text: '详细',
            dataIndex: 'V_GUID',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href="#" onclick="_detailOpen(\'' + value + '\')">详细</a>';
            }
        },{
            text: '故障名称',
            dataIndex: 'V_FAULT_NAME',
            align: 'center',
            width: 100
        }, {
            text: '发现时间',
            dataIndex: 'V_FINDTIME',
            align: 'center',
            width: 100
        }, {
            text: '发现时间',
            dataIndex: 'V_FINDTIME',
            align: 'center',
            width: 100
        },{
            text: '排除时间',
            dataIndex: 'V_ENDTIME',
            align: 'center',
            width: 100
        }, {
            text: '设备类型',
            dataIndex: 'V_EQUTYPENAME',
            align: 'center',
            width: 100
            /*renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
             var index = faultItemStore.find('V_EQUTYPECODE', value);
             if (index != -1) {
             return faultItemStore.getAt(index).get('V_EQUTYPENAME');
             }
             return null;
             }*/
        }, {
            text: '设备名称',
            dataIndex: 'V_EQUNAME',
            align: 'center',
            width: 100
        },{
            text: '规格型号',
            dataIndex: 'V_GGXH',
            align: 'center',
            width: 100
        }, {
            text: '作业区',
            dataIndex: 'V_DEPTNAME',
            align: 'center',
            width: 100
        }, {
            text: '部件',
            dataIndex: 'V_EQUCHILD_NAME',
            align: 'center',
            width: 180
        },
            {
                text: '故障类别',
                dataIndex: 'V_TYPENAME',
                align: 'center',
                width: 100
            },
            {
                text: '故障原因',
                dataIndex: 'V_FAULT_YY',
                align: 'center',
                width: 100
            },
            /*{
            text: '故障现象',
            dataIndex: 'V_FAULT_XX',
            align: 'center',
            width: 100
        }, */
            /*{
                text: '故障等级',
                dataIndex: 'V_FAULT_LEVELNAME',
                align: 'center',
                width: 100
            },*/{
                text: '停机时间',
                dataIndex: 'V_STOPTIME',
                align: 'center',
                width: 100
            },{
                text: '修理时间',
                dataIndex: 'V_REPAIRTIME',
                align: 'center',
                width: 100
            },{
                text: '上报日期',
                dataIndex: 'V_REPROTTIME',
                align: 'center',
                width: 100
            },{
                text: '故障报告人',
                dataIndex: 'V_INPERNAME',
                align: 'center',
                width: 100
            },
            /*{
                text: '故障直接责任人',
                dataIndex: 'V_FZR',
                align: 'center',
                width: 100
            },*/
            /* {
             text: '解决办法',
             dataIndex: 'V_JJBF',
             align: 'center',
             width: 100
         }, {
             text: '故障部位',
             dataIndex: 'V_FAULT_PART',
             align: 'center',
             width: 100
         },
             {
             text: '处理过程',
             dataIndex: 'V_FAULT_CLGC',
             align: 'center',
             width: 100
         }, {
             text: '损失',
             dataIndex: 'V_FAULT_SS',
             align: 'center',
             width: 100
         }, {
             text: '性质',
             dataIndex: 'V_FAULT_XZ',
             align: 'center',
             width: 100
         },*/ {
                text: '采取防范措施',
                dataIndex: 'V_FAULT_ZGCS',
                align: 'center',
                width: 100
            }/*, {
                text: '责任者处理',
                dataIndex: 'V_FZR_CL',
                align: 'center',
                width: 100
            }*/

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
        items : [ {
            region : 'north',
            border : false,
            items : [inputPanel ,buttonPanel]
        }, {
            region : 'center',
            layout : 'fit',
            border : false,
            items : [ faultItemPanel ]
        } ]
    });

    _init();


});

function _init() {
    if (orgLoad && zyqload && sbtypeload && sbnameload && zsbnameload) {
        _seltctFault();
        // _selectNextSprStore()
        Ext.getBody().unmask();


    }
}

function _init2() {
    if (orgLoad2 && equFaultLoad2 && init) {
        init = false;
    }
}


function _selectDept() {
    var deptStore = Ext.data.StoreManager.lookup('deptStore');

    deptStore.proxy.extraParams = {
        'V_V_PERSONCODE': V_V_PERSONCODE,
        'V_V_DEPTCODE': Ext.getCmp('V_V_ORGCODE').getValue(),
        'V_V_DEPTCODENEXT': "%",
        'V_V_DEPTTYPE': '[主体作业区]'
    };

    deptStore.currentPage = 1;
    deptStore.load();
}



function _selecteType() {
    var eTypeStore = Ext.data.StoreManager.lookup('eTypeStore');
    eTypeStore.proxy.extraParams = {
        'V_V_PERSONCODE': V_V_PERSONCODE,
        'V_V_DEPTCODENEXT': Ext.getCmp('V_V_DEPTCODE').getValue()

    };
    // eTypeStore.currentPage = 1;
    eTypeStore.load();
}



function _selectequName() {
    var equNameStore = Ext.data.StoreManager.lookup('equNameStore');
    equNameStore.proxy.extraParams = {
        'V_V_PERSONCODE': V_V_PERSONCODE,
        'V_V_DEPTCODENEXT': Ext.getCmp('V_V_DEPTCODE').getValue(),
        'V_V_EQUTYPECODE': Ext.getCmp('V_V_EQUTYPE').getValue()

    };
    //equNameStore.currentPage = 1;
    equNameStore.load();
}


function _selectsubequName() {
    if(Ext.getCmp('V_EQUNAME').getValue() == '%')
    {

        // var subequNameStore = Ext.data.StoreManager.lookup('subequNameStore');
        // subequNameStore.load();
        Ext.data.StoreManager.lookup('subequNameStore').load({
            params: {
                V_V_PERSONCODE: V_V_PERSONCODE,
                V_V_DEPTCODE: Ext.getCmp('V_V_ORGCODE').getValue(),
                V_V_DEPTNEXTCODE: Ext.getCmp('V_V_DEPTCODE').getValue(),
                V_V_EQUTYPECODE: Ext.getCmp('V_V_EQUTYPE').getValue(),
                V_V_EQUCODE: ''
            }
        });
    }
    if(Ext.getCmp('V_EQUNAME').getValue() != '%')
    {
        Ext.data.StoreManager.lookup('subequNameStore').load({
            params: {
                V_V_PERSONCODE: V_V_PERSONCODE,
                V_V_DEPTCODE: Ext.getCmp('V_V_ORGCODE').getValue(),
                V_V_DEPTNEXTCODE: Ext.getCmp('V_V_DEPTCODE').getValue(),
                V_V_EQUTYPECODE: Ext.getCmp('V_V_EQUTYPE').getValue(),
                V_V_EQUCODE: Ext.getCmp('V_EQUNAME').getValue()
            }
        });
    }


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

// 审批人
function _selectNextSprStore() {
    var nextSprStore = Ext.data.StoreManager.lookup('nextSprStore');
    nextSprStore.proxy.extraParams = {
        V_V_ORGCODE: Ext.getCmp('V_V_ORGCODE').getValue(),
        V_V_DEPTCODE: Ext.getCmp('V_V_DEPTCODE').getValue(),
        V_V_REPAIRCODE: '',
        V_V_FLOWTYPE: 'Hitch',
        V_V_FLOW_STEP: 'start',
        V_V_PERCODE: V_V_PERSONCODE,
        V_V_SPECIALTY: '',
        V_V_WHERE: ''

    };
    nextSprStore.currentPage = 1;
    nextSprStore.load();
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


function _preViewWorkOrder(value) {

    var owidth = window.screen.availWidth-200;
    var oheight = window.screen.availHeight - 150;
    window.open(AppUrl + 'page/LowFault_REPORT/workorderlist.html?V_GUID='
        + value, '', 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes');
}
function _detailOpen(value) {
    var owidth = window.screen.availWidth-100;
    var oheight = window.screen.availHeight - 50;
    window.open(AppUrl + 'page/LowFault_REPORT/detail.html?V_V_GUID=' + value,'', 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes,autoScroll=true');
}
function OnButtonPrint() {
    var records = Ext.getCmp('faultItemPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    if (records.length > 1) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '只能选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    var owidth = window.screen.availWidth-200;
    var oheight = window.screen.availHeight - 150;
    selectID.push(records[0].get('V_GUID'));
    window.open(AppUrl + 'page/LowFault_REPORT/print.html', 'selectID', 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes');

}
//上报
function OnButtonUp() {

    var records = Ext.getCmp('faultItemPanel').getSelectionModel().getSelection();

    var V_V_IP = '';
    if (location.href.split('?')[0] != undefined) {
        var parameters = Ext.urlDecode(location.href.split('?')[0]);
        (parameters.V_V_IP == undefined) ? V_V_IP = '' : V_V_IP = parameters.V_V_IP;
    }

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请至少选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }


    Ext.MessageBox.show({
        title: '确认',
        msg: '请确认是否上报！',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESTION,
        fn: function (btn) {
            if (btn == 'yes') {

                var i_err = 0;
                for (var i = 0; i < records.length; i++) {
                    var vguid=records[i].get('V_GUID');
                    var vfaultxx=records[i].get('V_FAULT_NAME');
                    var vfaultid=records[i].get('V_FAULTID');
                    Ext.Ajax.request({
                        url: AppUrl + 'Activiti/StratProcess',
                        async: false,
                        method: 'post',
                        params: {
                            parName: ["originator", "flow_businesskey", V_NEXT_SETP, "idea", "remark", "flow_code", "flow_yj", "flow_type"],
                            parVal: [V_V_PERSONCODE, vguid, Ext.getCmp('nextPer').getValue(),
                                "请审批!", vfaultxx, vfaultid, "请审批！", "Hitch"],
                            processKey: processKey,
                            businessKey: vguid,
                            V_STEPCODE: 'Start',
                            V_STEPNAME: V_STEPNAME,
                            V_IDEA: '请审批！',
                            V_NEXTPER: Ext.getCmp('nextPer').getValue(),
                            V_INPER: Ext.util.Cookies.get('v_personcode')
                        },
                        success: function (response) {
                            if (Ext.decode(response.responseText).ret == 'OK') {
                                Ext.Ajax.request({
                                    url: AppUrl + 'cxy/PM_BUG_DATA_UP',
                                    type: 'ajax',
                                    method: 'POST',
                                    params: {
                                        'V_V_PERCODE': V_V_PERSONCODE,
                                        'V_V_IP': V_V_IP,
                                        'V_V_GUID': vguid
                                    },
                                    success: function (response) {

                                        var resp = Ext.decode(response.responseText);
                                        if (resp.RET == 'success') {//成功，会传回true

                                            /*Ext.Ajax.request({
                                                url: AppUrl + 'cxy/PM_BUG_DATA_INSTANCEID_SET',
                                                type: 'ajax',
                                                method: 'POST',
                                                params: {
                                                    'V_V_GUID': vguid,
                                                    'V_V_INSTANCEID': Ext.decode(response.responseText).InstanceId
                                                },
                                                success: function (response) {
                                                }
                                            });*/
                                            i_err++;
                                            if (i_err == records.length) {
                                                // Ext.getBody().unmask();
                                                Ext.MessageBox.show({
                                                    title: '提示',
                                                    msg: '上报成功!',
                                                    buttons: Ext.MessageBox.OK,
                                                    fn: function () {

                                                        _seltctFault();
                                                    }
                                                });
                                            }
                                        } else {
                                            // Ext.getBody().unmask();
                                            Ext.MessageBox.show({
                                                title: '错误',
                                                msg: resp.RET,
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.ERROR,
                                                fn: function () {
                                                    _seltctFault();
                                                }
                                            });
                                        }

                                    },
                                    failure: function (response) {
                                        // Ext.getBody().unmask();
                                        Ext.MessageBox.show({
                                            title: '错误',
                                            msg: response.responseText,
                                            buttons: Ext.MessageBox.OK,
                                            icon: Ext.MessageBox.ERROR
                                        });
                                    }
                                });

                            } else if (Ext.decode(response.responseText).ret == 'ERROR') {
                                // Ext.getBody().unmask();
                                Ext.Msg.alert('提示', Ext.decode(response.responseText).msg);
                            }
                        }
                    });


                    // Ext.Ajax.request({
                    //     url: AppUrl + 'cxy/PM_14_FAULT_ITEM_DATA_UP',
                    //     type: 'ajax',
                    //     method: 'POST',
                    //     params: {
                    //         'V_V_PERCODE': V_V_PERSONCODE,
                    //         'V_V_IP': V_V_IP,
                    //         'V_V_GUID': records[i].get('V_GUID')
                    //     },
                    //     success: function (response) {
                    //         var resp = Ext.decode(response.responseText);
                    //         if (resp.RET == 'success') {//成功，会传回true
                    //             i_err++;
                    //             if (i_err == records.length) {
                    //                 _seltctFault();
                    //                 Ext.MessageBox.show({
                    //                     title: '提示',
                    //                     msg: '上报成功!',
                    //                     buttons: Ext.MessageBox.OK,
                    //                     fn: function () {
                    //                         _seltctFault();
                    //                     }
                    //                 });
                    //             }
                    //         } else {
                    //             Ext.MessageBox.show({
                    //                 title: '错误',
                    //                 msg: resp.RET,
                    //                 buttons: Ext.MessageBox.OK,
                    //                 icon: Ext.MessageBox.ERROR,
                    //                 fn: function () {
                    //                     _seltctFault();
                    //                 }
                    //             });
                    //         }
                    //
                    //     },
                    //     failure: function (response) {
                    //         Ext.MessageBox.show({
                    //             title: '错误',
                    //             msg: response.responseText,
                    //             buttons: Ext.MessageBox.OK,
                    //             icon: Ext.MessageBox.ERROR
                    //         });
                    //     }
                    // });
                }
            }
        }
    });


}
function _preViewProcess(value) {
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/GetInstanceFromBusinessId',
        methon:'POST',
        async:false,
        params:{
            businessKey: value
        },
        success:function (resp) {
            var res=Ext.decode(resp.responseText);
            if (res.InstanceId != "" && res.InstanceId != null) {
                var owidth = window.screen.availWidth;
                var oheight = window.screen.availHeight - 50;
                window.open(AppUrl + 'page/PM_210301/index.html?ProcessInstanceId='
                    + res.InstanceId, '', 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes');
            }else{
                Ext.Msg.alert('提示', '没有查到对应流程');
            }
        }
    });

}
