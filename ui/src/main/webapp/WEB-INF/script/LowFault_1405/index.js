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
                Ext.getCmp('V_V_EQUTYPE').select(store.first());
                // Ext.getCmp('V_V_EQUTYPE').select(store.last());
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
            'V_FAULTID','V_PROCESSINSTANCEID','V_ENDTIME','V_REPORTER','V_FZR','V_STOPTIME','V_GGXH',
            'V_REPAIRTIME','V_REPAIRCOST','V_REPROTTIME','V_FAULT_PASS','V_CAUSEANALYSIS','V_REPAIR_PLAN',
        'V_INPERCODE','V_INPERNAME'],
        proxy: {
            url: AppUrl + 'cxy/PM_BUG_DATA_SEL',
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
        }, {
            xtype: 'button',
            text: '手动添加',
            icon: imgpath + '/add.png',
            handler:
            _addOpen
            // _addFault
        },
           /* {
            xtype: 'button',
            text: '模型添加',
            hidden:true,
            icon: imgpath + '/add.png',
            handler: _addModellFault
        },*/
            {
            xtype: 'button',
            text: '修改',
            icon: imgpath + '/edit.png',
            handler: _preUpdateFault
        }, {
            xtype: 'button',
            text: '删除',
            icon: imgpath + '/delete.png',
            handler: _deleteFaultData
        },{
            xtype: 'button',
            text: '完结',
            // width: 90,
            icon: imgpath + '/accordion_collapse.png',
            handler: OnButtonOver
        },{
            xtype: 'button',
            text: '撤销完结',
            // width: 90,
            icon: imgpath + '/accordion_expand.png',
            handler: OnButtonNoOver
        }
        /*,{
            xtype: 'button',
            text: '上报',
            // width: 90,
            icon: imgpath + '/accordion_collapse.png',
            handler: OnButtonUp
        }*/
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
                    // _selectNextSprStore();
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
            // , {
            //     xtype: 'combo',
            //     id: 'nextPer',
            //     fieldLabel: '下一步接收人',
            //     editable: false,
            //     style: ' margin: 5px 0px 0px 10px',
            //     labelWidth: 90,
            //     width: 250,
            //     value: '',
            //     displayField: 'V_PERSONNAME',
            //     valueField: 'V_PERSONCODE',
            //     store: nextSprStore,
            //     queryMode: 'local'
            // }

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
        }, {
            text : '生成工单',
            xtype : 'templatecolumn',
            id : 'foundview',
            width : 100,
            align : 'center',
            tpl : '<a href="#">生成工单</a>'
        }, {
            text: '状态',
            dataIndex: 'V_STATENAME',
            align: 'center',
            width: 100,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                if(value=="审批中") {
                    return '<a href="#" onclick="_preViewProcess(\'' + record.data.V_GUID + '\')">' + value + '</a>';
                }else{
                    return value;
                }
            }

        }, {
            text: '故障名称',
            dataIndex: 'V_FAULT_NAME',
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
        }, {
            text: '故障现象',
            dataIndex: 'V_FAULT_XX',
            align: 'center',
            width: 100
        },
            /*{
            text: '故障等级',
            dataIndex: 'V_FAULT_LEVELNAME',
            align: 'center',
            width: 100
        },*/
            {
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
            },/*{
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
        }, {
            text: '责任者处理',
            dataIndex: 'V_FZR_CL',
            align: 'center',
            width: 100
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
    Ext.ComponentManager.get('foundview')
        .on(
            "click",
            function(view, rowIndex, colIndex, item, e) {
                var data=Ext.getCmp('faultItemPanel').getStore().getAt(
                    colIndex).data;
                var owidth = window.document.body.offsetWidth;
                var oheight = window.document.body.offsetHeight;
                window.open(AppUrl + "page/LowFault_1405/equip.html?V_GUID=" + data.V_GUID+'&V_STATE='+data.V_STATE,
                    "",  'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes,autoScroll=true');
            });
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
function _addFault() {

    if(Ext.getCmp('V_V_DEPTCODE').getValue()=='%'){
        alert("请选择作业区！")
        return;
    }
    Ext.getCmp('addPanel').form.reset();
    Ext.getCmp('uploadForm').form.reset();

    Ext.getCmp("addFaultWindow").show();
    //Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
    V_V_GUID = Ext.data.IdGenerator.get('uuid').generate();

    initadd = true;

    orgLoad1 = false;
    equFaultLoad1 = false;
    Ext.getCmp('V_V_ORGCODE1').setValue(Ext.getCmp('V_V_ORGCODE').getValue());
    Ext.getCmp('V_V_DEPTCODE1').setValue(Ext.getCmp('V_V_DEPTCODE').getValue());
    Ext.getCmp('begintime1').setValue(Ext.getCmp('begintime').getValue());
    if ((Ext.getCmp('V_V_EQUTYPE').getValue()) == '%') {
        Ext.getCmp('V_V_EQUTYPE1').select(Ext.data.StoreManager.lookup('eTypeStore1').getAt(0).get('V_EQUTYPECODE'));
    } else {
        Ext.getCmp('V_V_EQUTYPE1').setValue(Ext.getCmp('V_V_EQUTYPE').getValue());//给设备类型设置默认值
    }
    if ((Ext.getCmp('V_EQUNAME').getValue()) == '%') {
      //  Ext.getCmp('V_EQUNAME1').select(Ext.data.StoreManager.lookup('equNameStore1').getAt(0).get('V_EQUCODE'));
        Ext.getCmp('V_EQUNAME1').select(Ext.data.StoreManager.lookup('equNameStore1').getAt(1).get('V_EQUCODE'));
    } else {
        Ext.getCmp('V_EQUNAME1').setValue(Ext.getCmp('V_EQUNAME').getValue());//给设备类型设置默认值
    }
    if ((Ext.getCmp('SUB_V_EQUNAME').getValue()) == '%') {
        Ext.getCmp('SUB_V_EQUNAME1').select(Ext.data.StoreManager.lookup('subequNameStore1').getAt(0).get('V_EQUCODE'));
    } else {
        Ext.getCmp('SUB_V_EQUNAME1').setValue(Ext.getCmp('SUB_V_EQUNAME').getValue());
    }
    if ((Ext.getCmp('equFaultname').getValue()) == '%') {
        Ext.getCmp('equFaultname1').select(Ext.data.StoreManager.lookup('equFaultStore1').getAt(1).get('V_TYPECODE'));
    } else {
        Ext.getCmp('equFaultname1').setValue(Ext.getCmp('equFaultname').getValue());
    }
    filequery(V_V_GUID);

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
                filequery(V_V_GUID);
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

function _preUpdateFault() {
    var records = Ext.getCmp('faultItemPanel').getSelectionModel().getSelection();

    if (records.length != 1) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    if(records[0].get('V_STATE')=='0'||records[0].get('V_STATE')=='2'||records[0].get('V_STATE')=='10'){
        // Ext.getCmp('updateFaultWindow').show();
        _updateOpen(records[0].get('V_GUID'));
    }else{
        Ext.MessageBox.show({
            title: '提示',
            msg: '所选故障不能修改',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
    }
}

function _deleteFaultData() {
    var records = Ext.getCmp('faultItemPanel').getSelectionModel().getSelection();

    var V_V_IP = '';
    if (location.href.split('?')[0] != undefined) {
        var parameters = Ext.urlDecode(location.href.split('?')[0]);
        (parameters.V_V_IP == undefined) ? V_V_IP = '' : V_V_IP = parameters.V_V_IP;
    }

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

                Ext.MessageBox.show({
                    title: '确认',
                    msg: '请确认是否删除',
                    buttons: Ext.MessageBox.YESNO,
                    icon: Ext.MessageBox.QUESTION,
                    fn: function (btn) {
                        if (btn == 'yes') {
                            for (var i = 0; i < records.length; i++) {
                                if(records[i].get('V_STATE')==0){
                                    Ext.Ajax.request({
                                    url: AppUrl + 'cxy/PM_BUG_DATA_DEL',
                                    type: 'ajax',
                                    method: 'POST',
                                    params: {
                                        'V_V_PERCODE': V_V_PERSONCODE,
                                        'V_V_IP': V_V_IP,
                                        'V_V_GUID': records[i].get('V_GUID')
                                    },
                                                success: function (response) {
                                                    var data = Ext.JSON.decode(response.responseText);
                                                    if (data.RET == 'success') {
                                                        Ext.MessageBox.show({
                                                            title: '操作信息',
                                                            msg: '删除成功',
                                                            buttons: Ext.MessageBox.OK,
                                                            icon: Ext.MessageBox.ERROR
                                                        });
                                                        _seltctFault();
                                                    } else {
                                                        Ext.MessageBox.show({
                                                            title: '错误',
                                                            msg: data.RET,
                                                            buttons: Ext.MessageBox.OK,
                                                            icon: Ext.MessageBox.ERROR
                                                        });
                                                        _seltctFault();
                                                    }
                                                },
                                                failure: function (response) {
                                                    Ext.MessageBox.show({
                                                        title: '错误',
                                                        msg: response.responseText,
                                                        buttons: Ext.MessageBox.OK,
                                                        icon: Ext.MessageBox.ERROR
                                                    });
                                                    _seltctFault();
                                                }
                                });
                                }else{
                                    Ext.MessageBox.show({
                                        title: '提示',
                                        msg: '已下票，不能删除',
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.ERROR
                                    });
                                }

                        }
                        }
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

function _addModellFault() {

    var owidth = window.document.body.offsetWidth -40;
     var oheight = window.document.body.offsetHeight -30;
    window.open(AppUrl + 'page/PM_1404/index.html?V_V_ORGCODE=' + Ext.getCmp("V_V_ORGCODE").getValue() + '&V_V_DEPTCODE=' + Ext.getCmp("V_V_DEPTCODE").getValue() + '&V_V_EQUTYPE=' + encodeURI(Ext.getCmp("V_V_EQUTYPE").getValue()) + '&V_V_EQUCODE=' + encodeURI(Ext.getCmp("V_EQUNAME").getValue()) + '&V_V_EQUCHILD_CODE=' + encodeURI(Ext.getCmp("SUB_V_EQUNAME").getValue()) + '&V_V_FAULT_TYPE=' + encodeURI(Ext.getCmp("equFaultname").getValue()) + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes' )

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
function _addOpen() {

    if(Ext.getCmp('V_V_DEPTCODE').getValue()=='%'){
        alert("请选择作业区！");
        return;
    }
    var owidth = window.screen.availWidth;
    var oheight = window.screen.availHeight;
    window.open(AppUrl + 'page/LowFault_1405/insert.html?V_V_ORGCODE='
        + Ext.getCmp('V_V_ORGCODE').getValue()+'&V_V_DEPTCODE='+Ext.getCmp('V_V_DEPTCODE').getValue()
        +'&begintime='+encodeURI(Ext.getCmp("begintime").getSubmitValue())
        +'&V_V_EQUTYPE='+encodeURI(Ext.getCmp('V_V_EQUTYPE').getValue())

        +'&V_EQUNAME='+encodeURI(Ext.getCmp('V_EQUNAME').getValue())
        +'&SUB_V_EQUNAME='+encodeURI(Ext.getCmp('SUB_V_EQUNAME').getValue())

        +'&equFaultname='+encodeURI(Ext.getCmp('equFaultname').getValue()),
            '', 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes,autoScroll=true');
}
function _updateOpen(value) {

    if(Ext.getCmp('V_V_DEPTCODE').getValue()=='%'){
        alert("请选择作业区！")
        return;
    }
    var owidth = window.screen.availWidth-200;
    var oheight = window.screen.availHeight-150;
    window.open(AppUrl + 'page/LowFault_1405/update.html?V_V_GUID=' + value,'', 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes,autoScroll=true');
}

function OnButtonOver() {

    var records = Ext.getCmp('faultItemPanel').getSelectionModel().getSelection();
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
        msg: '请确认是否完结！',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESTION,
        fn: function (btn) {
            if (btn == 'yes') {
                var i_err = 0;
                var info ='';
                for (var i = 0; i < records.length; i++) {
                    if(records[i].get('V_STATE')=='2'){//状态为已下票records[i].get('V_STATE')=='0'||

                    Ext.Ajax.request({
                        url: AppUrl + 'cxy/PRO_BUG_EQUIP_OVER',
                        type: 'ajax',
                        method: 'POST',
                        params: {
                            'V_V_FAULTCODE': records[i].get('V_GUID')
                        },
                        success: function (response) {

                            var resp=Ext.decode(response.responseText);
                            if(resp.RET=='SUCCESS'){
                                if(i==records.length){
                                    Ext.MessageBox.show({
                                        title: '提示',
                                        msg: '所选故障成功完结',
                                        buttons: Ext.MessageBox.OK,
                                        fn: function () {
                                            _seltctFault();
                                        }
                                    });

                                }

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
                    }else{
                        Ext.MessageBox.show({
                            title: '提示',
                            msg: '所选故障不能完结',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.WARNING
                        });
                    }
                }
            }
        }
    });
}
function OnButtonNoOver() {
    var records = Ext.getCmp('faultItemPanel').getSelectionModel().getSelection();
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
        msg: '请确认是否撤销完结！',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESTION,
        fn: function (btn) {
            if (btn == 'yes') {
                var i_err = 0;
                var info ='';
                for (var i = 0; i < records.length; i++) {
                    if(records[i].get('V_STATE')=='3'||records[i].get('V_STATE')=='10'){

                        Ext.Ajax.request({
                            url: AppUrl + 'cxy/PRO_BUG_EQUIP_CANCEL_OVER',
                            type: 'ajax',
                            method: 'POST',
                            params: {
                                'V_V_FAULTCODE': records[i].get('V_GUID')
                            },
                            success: function (response) {

                                var resp=Ext.decode(response.responseText);
                                if(resp.RET=='SUCCESS'){
                                    if(i==records.length){
                                        Ext.MessageBox.show({
                                            title: '提示',
                                            msg: '所选故障成功撤销完结',
                                            buttons: Ext.MessageBox.OK,
                                            fn: function () {
                                                _seltctFault();
                                            }
                                        });

                                    }

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
                    }else{
                        Ext.MessageBox.show({
                            title: '提示',
                            msg: '所选故障不能撤销完结！',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.WARNING
                        });
                    }
                }
            }
        }
    });
}