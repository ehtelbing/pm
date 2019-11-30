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



    /*var subequNameStore = Ext.create('Ext.data.Store', {
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
    });*/


    /*var equFaultStore = Ext.create('Ext.data.Store', {
        id: 'equFaultStore',
        autoLoad: true,
        fields: ['V_TYPECODE', 'V_TYPENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_14/PM_14_FAULT_TYPE_ITEM_SEL',
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
    });*/


    var faultItemStore = Ext.create('Ext.data.Store', {
        storeId: 'faultItemStore',
        autoLoad: false,
        //pageSize: -1,
        fields: ['V_ORGCODE','V_ORGNAME','V_DEPTCODE','V_DEPTNAME','V_TYPECODE','V_TYPENAME','NUM'],
        proxy: {
            url: AppUrl + 'cxy/PM_FAULT_DATA_TJ_SEL',
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
        }, listeners: {
            beforeload: beforeloadFaultGridStore
        }
    });
    var bugItemStore = Ext.create('Ext.data.Store', {
        storeId: 'bugItemStore',
        autoLoad: false,
        //pageSize: -1,
        fields: ['V_ORGCODE','V_ORGNAME','V_DEPTCODE','V_DEPTNAME','V_TYPECODE','V_TYPENAME','NUM'],
        proxy: {
            url: AppUrl + 'cxy/PM_BUG_DATA_TJ_SEL',
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
        }, listeners: {
            beforeload: beforeloadBugGridStore
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
                    // _selectsubequName();
                    _init();
                }

            }
        }/*,
           {
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
            }*/, {
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
                id: 'lostMoney',
                fieldLabel: '损失费用',
                labelWidth: 70,
                width: 250
            },{
                xtype: 'button',
                text: '查询',
                icon: imgpath + '/search.png',
                handler: _selectFault
            }

        ]
    });

//事故统计
    var faultGridPanel=Ext.create('Ext.grid.Panel',{
        id:'faultGridPanel',
        columnLines:true,
        region: 'center',
        // border: true,
        store:faultItemStore,
        selModel:{
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns:[
            {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text: '厂矿', align: 'center', width: 150, dataIndex: 'V_ORGNAME'},
            {text: '作业区', align: 'center', width: 150, dataIndex: 'V_DEPTNAME'},
            {text: '事故类型', align: 'center', width: 150, dataIndex: 'V_TYPENAME'},
            {text: '事故数量', align: 'center', width: 150, dataIndex: 'NUM'}
        ]

    });
    //故障统计
    var hitchGridPanel=Ext.create('Ext.grid.Panel', {
        region: "center",
        id: 'hitchGridPanel',
        store: bugItemStore,
        split: true,
        width: '100%',
        // margin: '0px',
        columnLines: true,
        // border: true,
        selType: 'checkboxmodel',
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text: '厂矿', align: 'center', width: 150, dataIndex: 'V_ORGNAME'},
            {text: '作业区', align: 'center', width: 150, dataIndex: 'V_DEPTNAME'},
            {text: '故障类型', align: 'center', width: 150, dataIndex: 'V_TYPENAME'},
            {text: '故障数量', align: 'center', width: 150, dataIndex: 'NUM'}
        ]

    });

    var tabPanel=Ext.create('Ext.tab.Panel',{
        id:'tabPanel',
        region:'center',
        activeTab:0,
        enableTabScroll:true,
        items:[
            {
                id:'faultid',
                title:'事故统计',
                layout:'border',
                border:false,
                frame:false,
                autoScroll:true,
                items:[faultGridPanel],
                listeners: { activate: action1 }

            },{
                id:'hitchid',
                title:'故障统计',
                layout:'border',
                border:false,
                frame:false,
                autoScroll:true,
                items:[hitchGridPanel],
                listeners: { activate: action2 }
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
            items : [inputPanel]
        }, {
            region : 'center',
            layout : 'fit',
            border : false,
            items : [ tabPanel ]
        } ]
    });
    _init();
});
function _init(){
    Ext.data.StoreManager.lookup('faultItemStore').load();
    Ext.data.StoreManager.lookup('bugItemStore').load();
    Ext.getBody().unmask();
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

function _selectFault() {
    Ext.data.StoreManager.lookup('faultItemStore').load();
    Ext.data.StoreManager.lookup('bugItemStore').load();
}

function beforeloadFaultGridStore(store) {
    store.proxy.extraParams.V_V_ORGCODE = Ext.getCmp('V_V_ORGCODE').getSubmitValue();
    store.proxy.extraParams.V_V_DEPTCODE = Ext.getCmp('V_V_DEPTCODE').getSubmitValue();
    store.proxy.extraParams.V_V_EQUTYPE = Ext.getCmp('V_V_EQUTYPE').getSubmitValue();
    store.proxy.extraParams.V_V_EQUNAME = Ext.getCmp('V_EQUNAME').getRawValue()=='全部'?'%':Ext.getCmp('V_EQUNAME').getRawValue();
    store.proxy.extraParams.V_V_FINDTIME_B = Ext.getCmp("begintime").getSubmitValue();
    store.proxy.extraParams.V_V_FINDTIME_E = Ext.getCmp("endtime").getSubmitValue();
    store.proxy.extraParams.V_V_LOSTMONEY = Ext.getCmp('lostMoney').getSubmitValue()==''?'%':Ext.getCmp('lostMoney').getSubmitValue();
}
function beforeloadBugGridStore(store) {
    store.proxy.extraParams.V_V_ORGCODE = Ext.getCmp('V_V_ORGCODE').getSubmitValue();
    store.proxy.extraParams.V_V_DEPTCODE = Ext.getCmp('V_V_DEPTCODE').getSubmitValue();
    store.proxy.extraParams.V_V_EQUTYPE = Ext.getCmp('V_V_EQUTYPE').getSubmitValue();
    store.proxy.extraParams.V_V_EQUNAME = Ext.getCmp('V_EQUNAME').getRawValue()=='全部'?'%':Ext.getCmp('V_EQUNAME').getRawValue();
    store.proxy.extraParams.V_V_FINDTIME_B = Ext.getCmp("begintime").getSubmitValue();
    store.proxy.extraParams.V_V_FINDTIME_E = Ext.getCmp("endtime").getSubmitValue();
    store.proxy.extraParams.V_V_LOSTMONEY = Ext.getCmp('lostMoney').getSubmitValue()==''?'%':Ext.getCmp('lostMoney').getSubmitValue();
}
function action1(tab) {
    tab.on('activate', function (tab) {
        Ext.data.StoreManager.lookup('faultItemStore').load();
    });
}
function action2(tab){
    tab.on('activate',function(tab){
        Ext.data.StoreManager.lookup('bugItemStore').load();
    });
}
