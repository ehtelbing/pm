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

    var orgStore1 = Ext.create('Ext.data.Store', {
        id: 'orgStore1',
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
                orgLoad1 = true;
                Ext.getCmp('V_V_ORGCODE1').select(store.first());
                _init();
            }
        }
    });


    var orgStore2 = Ext.create('Ext.data.Store', {
        id: 'orgStore2',
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
                orgLoad2 = true;
                if (init) {
                    //Ext.getCmp('V_V_ORGCODE2').select(store.first());
                    //   _init2();
                }

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

    var deptStore1 = Ext.create('Ext.data.Store', {
        id: 'deptStore1',
        autoLoad: false,
        fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
        }),
        listeners: {
            load: function (store, records) {
                if (initadd) {

                } else {
                    Ext.getCmp('V_V_DEPTCODE1').select(store.first());
                }
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
        },
        listeners: {
            load: function (store, records) {
                if (init) {
                    //Ext.getCmp('V_V_DEPTCODE2').select(store.first());
                    //   _init2();
                } else {
                    //alert(1)
                    Ext.getCmp('V_V_DEPTCODE2').select(store.first());
                }

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
                Ext.getCmp('V_V_EQUTYPE').select(store.last());
                sbtypeload = true;
                _init();
            }
        }
    });

    var eTypeStore1 = Ext.create('Ext.data.Store', {
        id: 'eTypeStore1',
        autoLoad: false,
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
        }),
        listeners: {
            load: function (store, records) {
                if (initadd) {

                } else {
                    Ext.getCmp('V_V_EQUTYPE1').select(store.first());
                }

            }
        }
    });

    var eTypeStore2 = Ext.create('Ext.data.Store', {
        id: 'eTypeStore2',
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

                if (init) {
                    //Ext.getCmp('V_V_EQUTYPE2').select(store.first());
                    //   _init2();
                } else {
                    Ext.getCmp('V_V_EQUTYPE2').select(store.first());
                }
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

    var equNameStore1 = Ext.create('Ext.data.Store', {
        id: 'equNameStore1',
        autoLoad: false,
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
        }),
        listeners: {
            load: function (store, records) {
                // if (initadd) {
                //
                // } else {
                //     Ext.getCmp('V_EQUNAME1').select(store.last());
                // }

                // store.insert(0, {V_EQUNAME: '全部', V_EQUCODE: '%'});
                Ext.getCmp('SUB_V_EQUNAME').select(store.first());
                zsbnameload = true;
                _init();
            }
        }
    });

    var equNameStore2 = Ext.create('Ext.data.Store', {
        id: 'equNameStore2',
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

                if (init) {
                    // Ext.getCmp('V_EQUNAME2').select(store.first());
                    // _init2();
                } else {
                    Ext.getCmp('V_EQUNAME2').select(store.first());
                }
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

    var subequNameStore1 = Ext.create('Ext.data.Store', {
        id: 'subequNameStore1',
        autoLoad: false,
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
                if (initadd) {

                 } else {
                 Ext.getCmp('SUB_V_EQUNAME1').select(store.first());
                 }

                // store.insert(0, {V_EQUNAME: '全部', V_EQUCODE: '%'});
                // Ext.getCmp('SUB_V_EQUNAME1').select(store.first());

            }
        }
    });

    var subequNameStore2 = Ext.create('Ext.data.Store', {
        id: 'subequNameStore2',
        autoLoad: false,
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax",  {
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
                Ext.getBody().unmask();
                Ext.getCmp('SUB_V_EQUNAME2').select(store.first());
                /*if (init) {
                 //Ext.getCmp('SUB_V_EQUNAME2').select(store.first());
                 // _init2();
                 } else {
                 Ext.getCmp('SUB_V_EQUNAME2').select(store.first());
                 }*/
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
    });

    var equFaultStore1 = Ext.create('Ext.data.Store', {
        id: 'equFaultStore1',
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
                equFaultLoad1 = true;
                store.insert(0, {V_TYPENAME: '全部', V_TYPECODE: '%'});
                Ext.getCmp('equFaultname1').select(store.first());
                _init();

            }
        }
    });

    var equFaultStore2 = Ext.create('Ext.data.Store', {
        id: 'equFaultStore2',
        autoLoad: true,
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
        },
        listeners: {
            load: function (store, records) {
                equFaultLoad2 = true;
                store.insert(0, {V_TYPENAME: '全部', V_TYPECODE: '%'});
                Ext.getCmp('equFaultname2').select(store.first());
                if (init) {
                    _init2();
                }
            }
        }
    });
    var faultStore1 = Ext.create('Ext.data.Store', {
        id: 'faultStore1',
        autoLoad: false,
        fields: ['V_FAULTCODE', 'V_FAULTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'cxy/PRO_BASE_FAULT_SEL',
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
                Ext.getCmp('faultLevel1').select(store.first());
            }
        }
    });
    var faultStore2 = Ext.create('Ext.data.Store', {
        id: 'faultStore2',
        autoLoad: false,
        fields: ['V_FAULTCODE', 'V_FAULTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'cxy/PRO_BASE_FAULT_SEL',
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
                Ext.getCmp('faultLevel2').select(store.first());
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
    var winnextSprStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'winnextSprStore',
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
                if( store.getAt(0)==undefined){
                    Ext.getCmp('winnextPer').select(''); return;
                }else{
                    processKey2 = store.getProxy().getReader().rawData.RET;
                    V_STEPNAME2 = store.getAt(0).data.V_V_FLOW_STEPNAME;
                    V_NEXT_SETP2 = store.getAt(0).data.V_V_NEXT_SETP;
                    Ext.getCmp('winnextPer').select(store.first());
                }

            }

        }
    });
    var faultItemStore = Ext.create('Ext.data.Store', {
        storeId: 'faultItemStore',
        autoLoad: false,
        //pageSize: -1,
        fields: ['V_TIME', 'V_EQUTYPE', 'V_EQUNAME', 'V_EQUCHILD_CODE', 'V_FAULT_TYPE',
            'V_FAULT_YY', 'V_FAULT_XX', 'V_FAULT_LEVEL', 'V_JJBF', 'V_GUID', 'V_FILE_GUID',
            'V_ORGCODE', 'I_ID', 'V_DEPTNAME', 'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME', 'V_TYPECODE',
            'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_EQUCODE', 'V_FAULT_GUID', 'V_FINDTIME', 'V_PART',
            'V_TYPENAME', 'V_EQUCHILD_NAME','V_FAULT_NAME','V_STATE','V_STATENAME',
            'V_FAULT_PART','V_FAULT_CLGC','V_FAULT_SS','V_FAULT_XZ','V_FAULT_ZGCS','V_FZR_CL',
            'V_FAULTID','V_PROCESSINSTANCEID'],
        proxy: {
            url: AppUrl + 'PM_14/PM_14_FAULT_ITEM_DATA_SEL',
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
        }, {
            xtype: 'button',
            text: '手动添加',
            icon: imgpath + '/add.png',
            handler: _addFault
        }, {
            xtype: 'button',
            text: '模型添加',
            hidden:true,
            icon: imgpath + '/add.png',
            handler: _addModellFault
        }, {
            xtype: 'button',
            text: '修改',
            icon: imgpath + '/edit.png',
            handler: _preUpdateFault
        }, {
            xtype: 'button',
            text: '删除',
            icon: imgpath + '/delete.png',
            handler: _deleteFaultData
        } ,{
            xtype: 'button',
            text: '上报',
            // width: 90,
            icon: imgpath + '/accordion_collapse.png',
            handler: OnButtonUp
        }]
    });

    var inputPanel = Ext.create('Ext.Panel', {
        id : 'inputPanel',
        header : false,
        frame : true,
        layout : 'column',
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
                    _selectNextSprStore2();
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
                labelWidth: 70,
                width: 280
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
                labelWidth: 80,
                width: 220,
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
                if(value!="未上报") {
                    return '<a href="#" onclick="_preViewProcess(\'' + record.data.V_PROCESSINSTANCEID + '\')">' + value + '</a>';
                }else{
                    return value;
                }
            }
        }, {
            text: '发现时间',
            dataIndex: 'V_FINDTIME',
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
        }, {
            text: '故障类型',
            dataIndex: 'V_TYPENAME',
            align: 'center',
            width: 100
        }, {
            text: '故障原因',
            dataIndex: 'V_FAULT_YY',
            align: 'center',
            width: 100
        }, {
            text: '故障现象',
            dataIndex: 'V_FAULT_XX',
            align: 'center',
            width: 100
        }, {
            text: '故障等级',
            dataIndex: 'V_FAULT_LEVEL',
            align: 'center',
            width: 100
        }, {
            text: '解决办法',
            dataIndex: 'V_JJBF',
            align: 'center',
            width: 100
        }, {
            text: '故障名称',
            dataIndex: 'V_FAULT_NAME',
            align: 'center',
            width: 100
        }, {
            text: '故障部位',
            dataIndex: 'V_FAULT_PART',
            align: 'center',
            width: 100
        }, {
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
        }, {
            text: '整改措施',
            dataIndex: 'V_FAULT_ZGCS',
            align: 'center',
            width: 100
        }, {
            text: '对相关负责人的处理',
            dataIndex: 'V_FZR_CL',
            align: 'center',
            width: 100
        }

        ]

    });

    var addPanel = Ext.create('Ext.form.FormPanel', {
        border: false,
        frame: true,
        id: 'addPanel',
        region: 'center',
        //title: '<div align="center"></div>',
        width: '100%',
        height: 595,
        bodyPadding: 10,
        fileUpload: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'combo',
                id: 'V_V_ORGCODE1',
                store: orgStore1,
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                forceSelection: true,
                fieldLabel: '厂矿',
                editable: false,
                labelWidth: 70,
                width: 280,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                listeners: {
                    change: function () {
                        Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
                        initadd = false;
                        _selectDept1();
                        /* _selecteType1();
                         _selectequName1();
                         _selectsubequName1();*/

                    }
                }
            }, {
                xtype: 'combo',
                id: 'V_V_DEPTCODE1',
                store: deptStore1,
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                forceSelection: true,
                fieldLabel: '作业区',
                editable: false,
                labelWidth: 70,
                width: 280,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
                        initadd = false;
                        _selecteType1();
                        /*_selectequName1();
                         _selectsubequName1();*/

                    }
                }
            }

            ]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'combo',
                id: 'V_V_EQUTYPE1',
                store: eTypeStore1,
                queryMode: 'local',
                valueField: 'V_EQUTYPECODE',
                displayField: 'V_EQUTYPENAME',
                forceSelection: true,
                fieldLabel: '设备类型',
                editable: false,
                labelWidth: 70,
                width: 280,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
                        initadd = false;
                        _selectequName1();
                        /* _selectsubequName1();*/

                    }
                }
            }, {
                xtype: 'combo',
                id: 'V_EQUNAME1',
                store: equNameStore1,
                queryMode: 'local',
                valueField: 'V_EQUCODE',
                displayField: 'V_EQUNAME',
                forceSelection: true,
                fieldLabel: '设备名称',
                editable: false,
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 280,
                listeners: {
                    change: function (field, newValue, oldValue) {
                        Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
                        initadd = false;
                        _selectsubequName1();

                    }
                }
            }

            ]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'combo',
                id: 'SUB_V_EQUNAME1',
                store: subequNameStore1,
                queryMode: 'local',
                valueField: 'V_EQUCODE',
                displayField: 'V_EQUNAME',
                forceSelection: true,
                fieldLabel: '子设备名称',
                editable: false,
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 280
            }, {

                xtype: 'textfield',
                id: 'faultname',
                fieldLabel: '故障名称',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 280
            }

            ]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'faultpart',
                fieldLabel: '故障部位',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 280
            }, {
                xtype: 'combo',
                id: 'equFaultname1',
                store: equFaultStore1,
                queryMode: 'local',
                valueField: 'V_TYPECODE',
                displayField: 'V_TYPENAME',
                forceSelection: true,
                fieldLabel: '故障类型',
                editable: false,
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 280
            }

            ]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'begintime1',
                xtype: 'datefield',
                editable: false,
                format: 'Y-m-d',
                // submitFormat: 'yyyy-mm-dd',
                value: Ext.getCmp("begintime").getSubmitValue(),//new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                fieldLabel: '发现时间',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 280,
                baseCls: 'margin-bottom'
            }, {

                xtype: 'combo',
                id: 'faultLevel1',
                store: faultStore1,
                queryMode: 'local',
                valueField: 'V_FAULTCODE',
                displayField: 'V_FAULTNAME',
                forceSelection: true,
                fieldLabel: '故障等级',
                editable: false,
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 280
            }

            ]
        },{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'faultss',
                fieldLabel: '损失',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 280
            }, {
                xtype: 'textfield',
                id: 'faultxz',
                fieldLabel: '性质',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 280
            }

            ]
        },{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textarea',
                id: 'faultclgc',
                fieldLabel: '处理过程',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 552
            }

            ]
        },  {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textarea',
                id: 'faultRea1',
                fieldLabel: '故障原因',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 552
            }

            ]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textarea',
                id: 'faultDesc1',
                fieldLabel: '故障现象',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 552
            }

            ]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textarea',
                id: 'faultSol1',
                fieldLabel: '故障解决',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 552
            }

            ]
        },{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textarea',
                id: 'faultzgcs',
                fieldLabel: '整改措施',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 552
            }

            ]
        },{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textarea',
                id: 'fzrcl',
                fieldLabel: '对相关负责人的处理',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 552
            }

            ]
        }]
    });

    var addPanel2 = Ext.create('Ext.form.FormPanel', {
        border: false,
        frame: true,
        id: 'addPanel2',
        region: 'center',
        //title: '<div align="center"></div>',
        width: '100%',
        height: 595,
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
                editable: false,
                labelWidth: 70,
                width: 280,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                listeners: {
                    select: function () {
                        Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
                        init = false;
                        _selectDept2();
                        /* _selecteType2();
                         _selectequName2();
                         _selectsubequName2();*/

                    }
                }
            }, {
                xtype: 'combo',
                id: 'V_V_DEPTCODE2',
                store: deptStore2,
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                forceSelection: true,
                fieldLabel: '作业区',
                editable: false,
                labelWidth: 70,
                width: 280,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                listeners: {
                    select: function (field, newValue, oldValue) {
                        Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
                        init = false;
                        _selecteType2();
                        /* _selectequName2();
                         _selectsubequName2();*/

                    }
                }
            }

            ]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'combo',
                id: 'V_V_EQUTYPE2',
                store: eTypeStore2,
                queryMode: 'local',
                valueField: 'V_EQUTYPECODE',
                displayField: 'V_EQUTYPENAME',
                forceSelection: true,
                fieldLabel: '设备类型',
                editable: false,
                labelWidth: 70,
                width: 280,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                listeners: {
                    select: function (field, newValue, oldValue) {
                        Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
                        init = false;
                        _selectequName2();
                        /*  _selectsubequName2();*/

                    }
                }
            }, {
                xtype: 'combo',
                id: 'V_EQUNAME2',
                store: equNameStore2,
                queryMode: 'local',
                valueField: 'V_EQUCODE',
                displayField: 'V_EQUNAME',
                forceSelection: true,
                fieldLabel: '设备名称',
                editable: false,
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 280,
                listeners: {
                    select: function (field, newValue, oldValue) {
                        Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
                        init = false;
                        _selectsubequName2();

                    }
                }
            }

            ]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'combo',
                id: 'SUB_V_EQUNAME2',
                store: subequNameStore2,
                queryMode: 'local',
                valueField: 'V_EQUCODE',
                displayField: 'V_EQUNAME',
                forceSelection: true,
                fieldLabel: '子设备名称',
                editable: false,
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 280
            }, {
                xtype: 'textfield',
                id: 'faultname2',
                fieldLabel: '故障名称',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 280
            }

            ]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'faultpart2',
                fieldLabel: '故障部位',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 280
            }, {
                xtype: 'combo',
                id: 'equFaultname2',
                store: equFaultStore2,
                queryMode: 'local',
                valueField: 'V_TYPECODE',
                displayField: 'V_TYPENAME',
                forceSelection: true,
                fieldLabel: '故障类型',
                editable: false,
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 280

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
                value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                fieldLabel: '发现时间',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 280,
                baseCls: 'margin-bottom'
            },{

                xtype: 'combo',
                id: 'faultLevel2',
                store: faultStore2,
                queryMode: 'local',
                valueField: 'V_FAULTCODE',
                displayField: 'V_FAULTNAME',
                forceSelection: true,
                fieldLabel: '故障等级',
                editable: false,
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 280
            }

            ]
        }, {
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
                width: 280
            }, {
                xtype: 'textfield',
                id: 'faultxz2',
                fieldLabel: '性质',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 280 }

            ]
        },{xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textarea',
                id: 'faultclgc2',
                fieldLabel: '处理过程',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 552
            }

            ]
        },{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textarea',
                id: 'faultRea2',
                fieldLabel: '故障原因',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 552
            }

            ]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textarea',
                id: 'faultDesc2',
                fieldLabel: '故障现象',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 552
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
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 552
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
                fieldLabel: '整改措施',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 552
            }

            ]
        },{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textarea',
                id: 'fzrcl2',
                fieldLabel: '对相关负责人的处理',
                labelWidth: 70,
                style: ' margin: 5px 0px 0px -8px',
                labelAlign: 'right',
                width: 552
            }

            ]
        }]
    });

    var filegridPanel = Ext.create("Ext.grid.Panel", {
        id: 'filegridPanel',
        region: 'center',
        height: '100%',
        width: '100%',
        columnLines: true,
        store: fileGridStore,
        autoScroll: true,
        // margin: '20px 0px 0px 2px',
        //colspan: 3,
        columns: [{
            text: '附件名称',
            flex: 0.7,
            id : 'fjname',
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

    var filegridPanel2 = Ext.create("Ext.grid.Panel", {
        id: 'filegridPanel2',
        region: 'center',
        height: 200,
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


    var uploadpanel= Ext.create('Ext.form.FormPanel', {
            border: false,
            frame: true,
            id: 'uploadpanel',
            region: 'center',
            width: '300',
        layout: 'vbox',
            height: 597,
            bodyPadding: 10,
            fileUpload: true,

        items: [
            {
            xtype: 'form',
            id:'uploadForm',
            region: 'north',
            layout: 'hbox',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'filefield',
                id: 'V_V_FILEBLOB',
                name: 'V_V_FILEBLOB',
                enctype: "multipart/form-data",
                fieldLabel: '故障附件',
                labelWidth: 70,
                labelAlign: 'right',
                inputWidth: 201,
                style: ' margin: 32px 0px 0px 10px',
                buttonText: '选择文件',
                allowBlank: false
            }, {
                id: 'insertFilesFj',
                xtype: 'button',
                text: '上传',
                style: ' margin: 32px 0px 0px 10px',
                handler: _upLoadFile
            }, {
                xtype: 'hidden',
                name: 'V_V_GUID',
                id: 'V_V_GUID'
            }, {
                xtype: 'hidden',
                name: 'V_V_FILENAME',
                id: 'V_V_FILENAME'
            }, {
                xtype: 'hidden',
                name: 'V_V_FILETYPECODE',
                id: 'V_V_FILETYPECODE'
            }, {
                xtype: 'hidden',
                name: 'V_V_PLANT',
                id: 'V_V_PLANT'
            }, {
                xtype: 'hidden',
                name: 'V_V_DEPT',
                id: 'V_V_DEPT'
            }, {
                xtype: 'hidden',
                name: 'V_V_PERSON',
                id: 'V_V_PERSON'
            }, {
                xtype: 'hidden',
                name: 'V_V_REMARK',
                id: 'V_V_REMARK'
            }]},{
            columnWidth: 1,
            height: 450,
            width: 450,
                margin: '25px 0px 0px 0px',
            items: filegridPanel
        }
        ,{
                xtype: 'form',
                id:'sbForm',
                region: 'south',
                layout: 'column',
                baseCls: 'my-panel-no-border',
                items: [{
                    xtype: 'combo',
                    id: 'winnextPer',
                    fieldLabel: '下一步接收人',
                    editable: false,
                    style: ' margin: 10px 0px 0px 10px',
                    labelWidth: 80,
                    width: 220,
                    value: '',
                    displayField: 'V_PERSONNAME',
                    valueField: 'V_PERSONCODE',
                    store: winnextSprStore,
                    queryMode: 'local'
                }, {
                    id: 'saveandup',
                    xtype: 'button',
                    text: '上报',
                    style: ' margin: 10px 0px 0px 10px',
                    handler: OnButtonSaveUp
                }]}
        ]
    });
    var addFaultWindow = Ext.create('Ext.window.Window', {
        id: 'addFaultWindow',
        title: "",
        layout: 'hbox',
        width: 1104,
        height: 688,
        modal: true,
        plain: true,
        bodyPadding: 15,
        items: [{
            columnWidth: 1,
            items: addPanel,
            height: 597,
            width: 580
        }, uploadpanel
        //     {
        //     xtype: 'form',
        //     id:'uploadForm',
        //     region: 'north',
        //     layout: 'vbox',
        //     baseCls: 'my-panel-no-border',
        //     items: [{
        //         xtype: 'filefield',
        //         id: 'V_V_FILEBLOB',
        //         name: 'V_V_FILEBLOB',
        //         enctype: "multipart/form-data",
        //         fieldLabel: '故障附件',
        //         labelWidth: 70,
        //         labelAlign: 'right',
        //         inputWidth: 201,
        //         style: ' margin: 20px 0px 0px 10px',
        //         buttonText: '选择文件',
        //         allowBlank: false
        //     }, {
        //         id: 'insertFilesFj',
        //         xtype: 'button',
        //         text: '上传',
        //         style: ' margin: 5px 0px 0px 10px',
        //         handler: _upLoadFile
        //     }, {
        //         xtype: 'hidden',
        //         name: 'V_V_GUID',
        //         id: 'V_V_GUID'
        //     }, {
        //         xtype: 'hidden',
        //         name: 'V_V_FILENAME',
        //         id: 'V_V_FILENAME'
        //     }, {
        //         xtype: 'hidden',
        //         name: 'V_V_FILETYPECODE',
        //         id: 'V_V_FILETYPECODE'
        //     }, {
        //         xtype: 'hidden',
        //         name: 'V_V_PLANT',
        //         id: 'V_V_PLANT'
        //     }, {
        //         xtype: 'hidden',
        //         name: 'V_V_DEPT',
        //         id: 'V_V_DEPT'
        //     }, {
        //         xtype: 'hidden',
        //         name: 'V_V_PERSON',
        //         id: 'V_V_PERSON'
        //     }, {
        //         xtype: 'hidden',
        //         name: 'V_V_REMARK',
        //         id: 'V_V_REMARK'
        //     },{
        //         columnWidth: 1,
        //         height: 380,
        //         width: 450,
        //         items: filegridPanel
        //     }]
        //
        //
        // }
        ],
        buttons: [{
            text: '保存',
            handler: _saveBtnFault,
            width: 50
        }, {
            text: '取消',
            handler: _hideFault,
            width: 50
        }],
        closable: true,
        closeAction: 'close',
        model: true
    });
    var uploadpanel2= Ext.create('Ext.form.FormPanel', {
        border: false,
        frame: true,
        id: 'uploadpanel2',
        region: 'center',
        width: '300',
        layout: 'vbox',
        height: 597,
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
                    style: ' margin: 32px 0px 0px -8px',
                    buttonText: '选择文件',
                    allowBlank: false
                }, {
                    id: 'insertFilesFj2',
                    xtype: 'button',
                    text: '上传',
                    style: ' margin: 32px 0px 0px 15px',
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
                    height: 480,
                    width: 450,
                    margin: '25px 0px 0px 0px',
                    items: filegridPanel2
            }
        ]
    });
    var updateFaultWindow = Ext.create('Ext.window.Window', {
        id: 'updateFaultWindow',
        title: "",
        layout: 'hbox',
        width: 1104,
        height: 688,
        modal: true,
        plain: true,
        bodyPadding: 15,
        //frame : true,
        //closeAction : 'hide',
        //closable : true,
        items: [{
            columnWidth: 1,
            items: addPanel2,
            height: 597,
            width: 580
        },uploadpanel2
            // {
            // xtype: 'form',
            // id:'uploadForm2',
            // region: 'north',
            // layout: 'vbox',
            // baseCls: 'my-panel-no-border',
            // items: [{
            //     xtype: 'filefield',
            //     id: 'V_V_FILEBLOB2',
            //     name: 'V_V_FILEBLOB2',
            //     enctype: "multipart/form-data",
            //     fieldLabel: '故障附件',
            //     labelWidth: 70,
            //     labelAlign: 'right',
            //     inputWidth: 302,
            //     style: ' margin: 5px 0px 0px -8px',
            //     buttonText: '选择文件',
            //     allowBlank: false
            // }, {
            //     id: 'insertFilesFj2',
            //     xtype: 'button',
            //     text: '上传',
            //     style: ' margin: 5px 0px 0px 15px',
            //     handler: _upLoadFile2
            // }, {
            //     xtype: 'hidden',
            //     name: 'V_V_GUID2',
            //     id: 'V_V_GUID2'
            // }, {
            //     xtype: 'hidden',
            //     name: 'V_V_FILENAME2',
            //     id: 'V_V_FILENAME2'
            // }, {
            //     xtype: 'hidden',
            //     name: 'V_V_FILETYPECODE2',
            //     id: 'V_V_FILETYPECODE2'
            // }, {
            //     xtype: 'hidden',
            //     name: 'V_V_PLANT2',
            //     id: 'V_V_PLANT2'
            // }, {
            //     xtype: 'hidden',
            //     name: 'V_V_DEPT2',
            //     id: 'V_V_DEPT2'
            // }, {
            //     xtype: 'hidden',
            //     name: 'V_V_PERSON2',
            //     id: 'V_V_PERSON2'
            // }, {
            //     xtype: 'hidden',
            //     name: 'V_V_REMARK2',
            //     id: 'V_V_REMARK2'
            // },{
            //     columnWidth: 1,
            //     height: 380,
            //     width: 450,
            //     items: filegridPanel2
            // }

            // ]
        // }
        ],
        buttons: [{
            text: '保存',
            handler: _saveBtnFault2,
            width: 50
        }, {
            text: '取消',
            handler: _hideFault2,
            width: 50
        }],
        closable: true,
        closeAction: 'close',
        model: true
    });

    /*Ext.create('Ext.container.Viewport', {
     layout: 'border',
     items: [panel]
     });*/

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

    //add
    /*_selectDept1();
    _selecteType1();
    _selectequName1();
    _selectsubequName1();*/

    //edit
    // _selectDept2();
    // _selecteType2();
    // _selectequName2();
    _selecteFaultStore1();
    _selecteFaultStore2();
    Ext.ComponentManager.get('foundview')
        .on(
            "click",
            function(view, rowIndex, colIndex, item, e) {
                var data=Ext.getCmp('faultItemPanel').getStore().getAt(
                    colIndex).data;
                if(data.V_STATE=='1') {
                    var id = data.V_GUID;
                    window.open(AppUrl + "page/gz_gd1405/index.html?V_GUID=" + id,
                        "", "dialogHeight:700px;dialogWidth:1100px");
                }else if(data.V_STATE=='0'){
                    Ext.MessageBox.show({
                        title: '提示',
                        msg: '请先上报再生成工单！',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                }else if(data.V_STATE=='2'){
                    Ext.MessageBox.show({
                        title: '提示',
                        msg: '已生成工单不能再次生成！',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                }
            });
});

function _init() {
    if (orgLoad && zyqload && sbtypeload && sbnameload && zsbnameload&&nextSprLoad) {
        _seltctFault();
        _selectNextSprStore()
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

function _selectDept1() {
    var deptStore1 = Ext.data.StoreManager.lookup('deptStore1');

    deptStore1.proxy.extraParams = {
        'V_V_PERSONCODE': V_V_PERSONCODE,
        'V_V_DEPTCODE': Ext.getCmp('V_V_ORGCODE1').getValue(),
        'V_V_DEPTCODENEXT': '%',
        'V_V_DEPTTYPE': '[主体作业区]'
    };

    deptStore1.currentPage = 1;
    deptStore1.load();
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

function _selecteType() {
    var eTypeStore = Ext.data.StoreManager.lookup('eTypeStore');
    eTypeStore.proxy.extraParams = {
        'V_V_PERSONCODE': V_V_PERSONCODE,
        'V_V_DEPTCODENEXT': Ext.getCmp('V_V_DEPTCODE').getValue()

    };
    // eTypeStore.currentPage = 1;
    eTypeStore.load();
}

function _selecteType1() {
    var eTypeStore1 = Ext.data.StoreManager.lookup('eTypeStore1');
    eTypeStore1.proxy.extraParams = {
        'V_V_PERSONCODE': V_V_PERSONCODE,
        'V_V_DEPTCODENEXT': Ext.getCmp('V_V_DEPTCODE1').getValue()

    };
    //eTypeStore1.currentPage = 1;
    eTypeStore1.load();
}

function _selecteType2() {
    var eTypeStore2 = Ext.data.StoreManager.lookup('eTypeStore2');
    eTypeStore2.proxy.extraParams = {
        'V_V_PERSONCODE': V_V_PERSONCODE,
        'V_V_DEPTCODENEXT': Ext.getCmp('V_V_DEPTCODE2').getValue()

    };
    // eTypeStore2.currentPage = 1;
    eTypeStore2.load();
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

function _selectequName1() {
    var equNameStore1 = Ext.data.StoreManager.lookup('equNameStore1');
    equNameStore1.proxy.extraParams = {
        'V_V_PERSONCODE': V_V_PERSONCODE,
        'V_V_DEPTCODENEXT': Ext.getCmp('V_V_DEPTCODE1').getValue(),
        'V_V_EQUTYPECODE': Ext.getCmp('V_V_EQUTYPE1').getValue()

    };
    // equNameStore1.currentPage = 1;
    equNameStore1.load();
}

function _selectequName2() {
    var equNameStore2 = Ext.data.StoreManager.lookup('equNameStore2');
    equNameStore2.proxy.extraParams = {
        'V_V_PERSONCODE': V_V_PERSONCODE,
        'V_V_DEPTCODENEXT': Ext.getCmp('V_V_DEPTCODE2').getValue(),
        'V_V_EQUTYPECODE': Ext.getCmp('V_V_EQUTYPE2').getValue()

    };
    //equNameStore2.currentPage = 1;
    equNameStore2.load();
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

function _selectsubequName1() {
    if(Ext.getCmp('V_EQUNAME1').getValue() == '%')
    {

        var subequNameStore1 = Ext.data.StoreManager.lookup('subequNameStore1');
        subequNameStore1.load();
        Ext.getBody().unmask();//去除页面笼罩
    }
    if(Ext.getCmp('V_EQUNAME1').getValue() != '%')
    {
        Ext.data.StoreManager.lookup('subequNameStore1').load({
            params: {
                V_V_PERSONCODE: V_V_PERSONCODE,
                V_V_DEPTCODE: Ext.getCmp('V_V_ORGCODE1').getValue(),
                V_V_DEPTNEXTCODE: Ext.getCmp('V_V_DEPTCODE1').getValue(),
                V_V_EQUTYPECODE: Ext.getCmp('V_V_EQUTYPE1').getValue(),
                V_V_EQUCODE: Ext.getCmp('V_EQUNAME1').getValue()
            }
        });
        Ext.getBody().unmask();//去除页面笼罩
    }
}

function _selectsubequName2() {

    if(Ext.getCmp('V_EQUNAME2').getValue() == '%')
    {

        var subequNameStore2 = Ext.data.StoreManager.lookup('subequNameStore2');
        subequNameStore2.load();
        Ext.getBody().unmask();//去除页面笼罩
    }
    if(Ext.getCmp('V_EQUNAME2').getValue() != '%')
    {
        Ext.data.StoreManager.lookup('subequNameStore2').load({
            params: {
                V_V_PERSONCODE: V_V_PERSONCODE,
                V_V_DEPTCODE: Ext.getCmp('V_V_ORGCODE2').getValue(),
                V_V_DEPTNEXTCODE: Ext.getCmp('V_V_DEPTCODE2').getValue(),
                V_V_EQUTYPECODE: Ext.getCmp('V_V_EQUTYPE2').getValue(),
                V_V_EQUCODE: Ext.getCmp('V_EQUNAME2').getValue()
            }
        });
        Ext.getBody().unmask();//去除页面笼罩
    }
}
function _selecteFaultStore1() {
    var faultStore1 = Ext.data.StoreManager.lookup('faultStore1');
    faultStore1.proxy.extraParams = {

    };
    faultStore1.load();
}
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
// 审批人
function _selectNextSprStore() {
    var nextSprStore = Ext.data.StoreManager.lookup('nextSprStore');
    nextSprStore.proxy.extraParams = {
        V_V_ORGCODE: Ext.getCmp('V_V_ORGCODE').getValue(),
        V_V_DEPTCODE: Ext.getCmp('V_V_DEPTCODE').getValue(),
        V_V_REPAIRCODE: '',
        V_V_FLOWTYPE: 'Fault',
        V_V_FLOW_STEP: 'start',
        V_V_PERCODE: V_V_PERSONCODE,
        V_V_SPECIALTY: '',
        V_V_WHERE: ''

    };
    nextSprStore.currentPage = 1;
    nextSprStore.load();
}
// 审批人
function _selectNextSprStore2() {
    var nextSprStore = Ext.data.StoreManager.lookup('winnextSprStore');
    nextSprStore.proxy.extraParams = {
        V_V_ORGCODE: Ext.getCmp('V_V_ORGCODE').getValue(),
        V_V_DEPTCODE: Ext.getCmp('V_V_DEPTCODE').getValue(),
        V_V_REPAIRCODE: '',
        V_V_FLOWTYPE: 'Fault',
        V_V_FLOW_STEP: 'start',
        V_V_PERCODE: V_V_PERSONCODE,
        V_V_SPECIALTY: '',
        V_V_WHERE: ''

    };
    nextSprStore.currentPage = 1;
    nextSprStore.load();
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
    /*var deptStore1 = Ext.data.StoreManager.lookup('deptStore1');
     deptStore1.proxy.extraParams = {

     'V_V_PERSONCODE': V_V_PERSONCODE,
     'V_V_DEPTCODE': Ext.getCmp('V_V_ORGCODE').getValue(),
     'V_V_DEPTCODENEXT': '%',
     'V_V_DEPTTYPE': '[主体作业区]'
     };
     deptStore1.load();

     Ext.getCmp('V_V_ORGCODE1').setValue(Ext.getCmp('V_V_ORGCODE').getValue());
     Ext.getCmp('V_V_DEPTCODE1').setValue(Ext.getCmp('V_V_DEPTCODE').getValue());

     var eTypeStore1 = Ext.data.StoreManager.lookup('eTypeStore1');
     eTypeStore1.proxy.extraParams = {

     'V_V_PERSONCODE': V_V_PERSONCODE,
     'V_V_DEPTCODENEXT': Ext.getCmp('V_V_DEPTCODE1').getValue()


     };
     eTypeStore1.load();

     if ((Ext.getCmp('V_V_EQUTYPE').getValue()) == '%') {
     Ext.getCmp('V_V_EQUTYPE1').select(eTypeStore1.getAt(0).get('V_EQUTYPECODE'));
     } else {
     Ext.getCmp('V_V_EQUTYPE1').setValue(Ext.getCmp('V_V_EQUTYPE').getValue());//给设备类型设置默认值
     }

     var equNameStore1 = Ext.data.StoreManager.lookup('equNameStore1');
     equNameStore1.proxy.extraParams = {

     'V_V_PERSONCODE': V_V_PERSONCODE,
     'V_V_DEPTCODENEXT': Ext.getCmp('V_V_DEPTCODE1').getValue(),
     'V_V_EQUTYPECODE': Ext.getCmp('V_V_EQUTYPE1').getValue()

     };
     equNameStore1.load();

     if ((Ext.getCmp('V_EQUNAME').getValue()) == '%') {
     Ext.getCmp('V_EQUNAME1').select(equNameStore1.getAt(1).get('V_EQUCODE'));
     } else {
     Ext.getCmp('V_EQUNAME1').setValue(Ext.getCmp('V_EQUNAME').getValue());//给设备类型设置默认值
     }

     var subequNameStore1 = Ext.data.StoreManager.lookup('subequNameStore1');
     Ext.data.StoreManager.lookup('subequNameStore1').load({
     params: {
     V_V_PERSONCODE: V_V_PERSONCODE,
     V_V_DEPTCODE: Ext.getCmp('V_V_ORGCODE1').getValue(),
     V_V_DEPTNEXTCODE: Ext.getCmp('V_V_DEPTCODE1').getValue(),
     V_V_EQUTYPECODE: Ext.getCmp('V_V_EQUTYPE1').getValue(),
     V_V_EQUCODE: Ext.getCmp('V_EQUNAME1').getValue()
     }
     });
     if ((Ext.getCmp('SUB_V_EQUNAME').getValue()) == '%') {
     Ext.getCmp('SUB_V_EQUNAME1').select(subequNameStore1.getAt(0).get('V_EQUCODE'));
     } else {
     Ext.getCmp('SUB_V_EQUNAME1').setValue(Ext.getCmp('SUB_V_EQUNAME').getValue());
     }


     // Ext.getCmp('equFaultname1').setValue(Ext.getCmp('equFaultname').getValue());
     var equFaultStore1 = Ext.data.StoreManager.lookup('equFaultStore1');
     if ((Ext.getCmp('equFaultname').getValue()) == '%') {
     Ext.getCmp('equFaultname1').select(equFaultStore1.getAt(1).get('V_TYPECODE'));
     } else {
     Ext.getCmp('equFaultname1').setValue(Ext.getCmp('equFaultname').getValue());
     }
     */
    //Ext.getBody().unmask();//去除页面笼罩


}


function _upLoadFile() {
    var uploadForm = Ext.getCmp('uploadForm');

    var V_V_FILEBLOB = Ext.getCmp('V_V_FILEBLOB').getSubmitValue();
    var V_V_FILENAME = V_V_FILEBLOB.split("\\")[V_V_FILEBLOB.split("\\").length - 1].split(".")[0];
    //alert(V_V_FILENAME);

    Ext.getCmp('V_V_GUID').setValue(V_V_GUID);
    Ext.getCmp('V_V_FILENAME').setValue(V_V_FILENAME);
    Ext.getCmp('V_V_FILEBLOB').setValue(V_V_FILEBLOB);
    Ext.getCmp('V_V_FILETYPECODE').setValue('SBGZ');
    Ext.getCmp('V_V_PLANT').setValue(Ext.getCmp('V_V_ORGCODE1').getSubmitValue());
    Ext.getCmp('V_V_DEPT').setValue(Ext.getCmp('V_V_DEPTCODE1').getSubmitValue());
    Ext.getCmp('V_V_PERSON').setValue(V_V_PERSONCODE);
    Ext.getCmp('V_V_REMARK').setValue(Ext.getCmp('V_V_REMARK').getSubmitValue());

    if (uploadForm.form.isValid()) {
        if (Ext.getCmp('V_V_FILEBLOB').getValue() == '') {
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

        uploadForm.getForm().submit({
            url: AppUrl + 'PM_14/PRO_BASE_FILE_ADD',
            method: 'POST',
            async: false,
            waitMsg: '上传中...',
            success: function (ret) {
                Ext.Msg.alert('成功', '上传成功');
                filequery(V_V_GUID);

            },
            failure: function (resp) {
                Ext.Msg.alert('错误', '上传失败');
            }

        })

    }

}

function _upLoadFile2() {
    var records = Ext.getCmp('faultItemPanel').getSelectionModel().getSelection();
    var uploadForm2 = Ext.getCmp('uploadForm2');

    var V_V_FILEBLOB = Ext.getCmp('V_V_FILEBLOB2').getSubmitValue();
    var V_V_FILENAME = V_V_FILEBLOB.split("\\")[V_V_FILEBLOB.split("\\").length - 1].split(".")[0];
    Ext.getCmp('V_V_GUID2').setValue(records[0].data.V_GUID);
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
            url: AppUrl + 'PM_14/PRO_BASE_FILE_ADDINSERT',
            method: 'POST',
            async: false,
            waitMsg: '上传中...',
            success: function (ret) {
                Ext.Msg.alert('成功', '上传成功');
                // alert(records[0].get('V_GUID'))
                //if(records[0].get('V_GUID') == "" || records[0].get('V_GUID') == null)
                filequery2(records[0].get('V_GUID'));
                //filequery2(V_V_GUID);


            },
            failure: function (resp) {
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
    Ext.getCmp('updateFaultWindow').close();
}

function _saveBtnFault() {
    var V_V_IP = '';
    if (location.href.split('?')[0] != undefined) {
        var parameters = Ext.urlDecode(location.href.split('?')[0]);
        (parameters.V_V_IP == undefined) ? V_V_IP = '' : V_V_IP = parameters.V_V_IP;
    }

    var fileguid = '';
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        fileguid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            fileguid += "-";
    }

    var faultguid = '';
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        faultguid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            faultguid += "-";
    }

    var intime = Ext.Date.format(new Date(), 'Y-m-d');


    if (!_validate(Ext.getCmp('addPanel'))) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请录入这些必填项!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }

    if (Ext.getCmp('V_V_ORGCODE1').getValue() != '%' && Ext.getCmp('V_V_DEPTCODE1').getValue() != '%' && Ext.getCmp('V_V_EQUTYPE1').getValue() != '%' && Ext.getCmp('V_EQUNAME1').getValue() != '%' && Ext.getCmp('SUB_V_EQUNAME1').getValue() != '%' && Ext.getCmp('equFaultname1').getValue() != '%') {
        Ext.Ajax.request({
            url: AppUrl + 'cxy/PM_1405_FAULT_ITEM_DATA_SET',
            type: 'ajax',
            method: 'POST',
            params: {
                'V_V_GUID': V_V_GUID,
                'V_V_ORGCODE': Ext.getCmp("V_V_ORGCODE1").getValue(),
                'V_V_DEPTCODE': Ext.getCmp("V_V_DEPTCODE1").getValue(),
                'V_V_EQUTYPE': Ext.getCmp("V_V_EQUTYPE1").getValue(),
                'V_V_EQUCODE': Ext.getCmp("V_EQUNAME1").getValue(),
                'V_V_EQUCHILD_CODE': Ext.getCmp("SUB_V_EQUNAME1").getValue(),
                'V_V_FAULT_GUID': faultguid,
                'V_V_FAULT_TYPE': Ext.getCmp("equFaultname1").getValue(),
                'V_V_FAULT_YY': Ext.getCmp("faultRea1").getValue(),
                'V_V_FINDTIME': Ext.getCmp("begintime1").getSubmitValue(),
                'V_V_FAULT_XX': Ext.getCmp("faultDesc1").getValue(),
                'V_V_JJBF': Ext.getCmp("faultSol1").getValue(),
                'V_V_FAULT_LEVEL': Ext.getCmp("faultLevel1").getValue(),
                'V_V_FILE_GUID': fileguid,
                'V_V_INTIME': intime,
                'V_V_PERCODE': V_V_PERSONCODE,
                'V_V_IP': V_V_IP,
                'V_V_FAULT_NAME':Ext.getCmp("faultname").getValue(),
                'V_V_FAULT_PART':Ext.getCmp("faultpart").getValue(),
                'V_V_FAULT_CLGC':Ext.getCmp("faultclgc").getValue(),
                'V_V_FAULT_SS':Ext.getCmp("faultss").getValue(),
                'V_V_FAULT_XZ':Ext.getCmp("faultxz").getValue(),
                'V_V_FAULT_ZGCS':Ext.getCmp("faultzgcs").getValue(),
                'V_V_FZR_CL':Ext.getCmp("fzrcl").getValue()

            },
            success: function (response) {
                var data = Ext.JSON.decode(response.responseText);

                // var data = Ext.decode(response.responseText);
                if (data.RET == 'Success') {
                    Ext.MessageBox.show({
                                        title: '提示',
                                        msg:  '添加成功',
                                        buttons: Ext.MessageBox.OK
                                    });
                    _seltctFault();
                    // Ext.Ajax.request({
                    //     url: AppUrl + 'PM_07/PRO_PM_07_DEFECT_SET',
                    //     type: 'ajax',
                    //     method: 'POST',
                    //     params: {
                    //         V_V_GUID:V_V_GUID,
                    //         V_V_PERCODE:Ext.util.Cookies.get('v_personcode'),
                    //         V_V_DEFECTLIST:Ext.getCmp('faultRea1').getValue(),
                    //         V_V_SOURCECODE:'defct09',//故障/事故
                    //         V_V_SOURCEID:'',
                    //         V_D_DEFECTDATE: Ext.util.Format.date(new Date(), 'Y/m/d H:m:s'),
                    //         V_V_DEPTCODE: Ext.getCmp('V_V_DEPTCODE1').getValue(),
                    //         V_V_EQUCODE:Ext.getCmp('V_EQUNAME1').getValue(),
                    //         V_V_EQUCHILDCODE: Ext.getCmp("SUB_V_EQUNAME1").getValue(),
                    //         V_V_IDEA:Ext.getCmp('faultSol1').getValue(),
                    //         V_V_LEVEL:Ext.getCmp('faultLevel1').getValue()
                    //     },
                    //     success: function (response) {
                    //         var data = Ext.JSON.decode(response.responseText);
                    //
                    //         // var data = Ext.decode(response.responseText);
                    //         if(data.V_INFO=='成功'){
                    //             //Ext.Msg.alert('成功', '添加成功');
                    //             Ext.getCmp("addFaultWindow").close();
                    //             Ext.getCmp("faultRea1").reset();
                    //             Ext.getCmp("faultDesc1").reset();
                    //             Ext.getCmp("faultSol1").reset();
                    //             Ext.getCmp("faultLevel1").reset();
                    //             Ext.getCmp("filegridPanel").removeAll();
                    //             _seltctFault();
                    //
                    //         } else {
                    //             Ext.MessageBox.show({
                    //                 title: '错误',
                    //                 msg: data.message,
                    //                 buttons: Ext.MessageBox.OK,
                    //                 icon: Ext.MessageBox.ERROR
                    //             });
                    //         }
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

                } else {
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: data.message,
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
    } else {
        Ext.MessageBox.show({
            title: '提示',
            msg: '下拉选项不能为全部',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }


}

function _saveBtnFault2() {
    var records = Ext.getCmp('faultItemPanel').getSelectionModel().getSelection();
    //  console.log(records[0])


    var V_V_IP = '';
    if (location.href.split('?')[0] != undefined) {
        var parameters = Ext.urlDecode(location.href.split('?')[0]);
        (parameters.V_V_IP == undefined) ? V_V_IP = '' : V_V_IP = parameters.V_V_IP;
    }

    if (!_validate(Ext.getCmp('addPanel2'))) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请录入这些必填项!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }

    if (Ext.getCmp('V_V_ORGCODE2').getValue() != '%' && Ext.getCmp('V_V_DEPTCODE2').getValue() != '%' && Ext.getCmp('V_V_EQUTYPE2').getValue() != '%' && Ext.getCmp('V_EQUNAME2').getValue() != '%' && Ext.getCmp('SUB_V_EQUNAME2').getValue() != '%' && Ext.getCmp('equFaultname2').getValue() != '%') {
        Ext.Ajax.request({
            url: AppUrl + 'cxy/PM_1405_FAULT_ITEM_DATA_SET',
                //'PM_14/PM_14_FAULT_ITEM_DATA_SET',
            type: 'ajax',
            method: 'POST',
            params: {
                'V_V_GUID': records[0].get('V_GUID'),
                'V_V_ORGCODE': Ext.getCmp("V_V_ORGCODE2").getValue(),
                'V_V_DEPTCODE': Ext.getCmp("V_V_DEPTCODE2").getValue(),
                'V_V_EQUTYPE': Ext.getCmp("V_V_EQUTYPE2").getValue(),
                'V_V_EQUCODE': Ext.getCmp("V_EQUNAME2").getValue(),
                'V_V_EQUCHILD_CODE': Ext.getCmp("SUB_V_EQUNAME2").getValue(),
                'V_V_FAULT_GUID': records[0].get('V_FAULT_GUID'),
                'V_V_FAULT_TYPE': Ext.getCmp("equFaultname2").getValue(),
                'V_V_FAULT_YY': Ext.getCmp("faultRea2").getValue(),
                'V_V_FINDTIME': Ext.getCmp("begintime2").getSubmitValue(),
                'V_V_FAULT_XX': Ext.getCmp("faultDesc2").getValue(),
                'V_V_JJBF': Ext.getCmp("faultSol2").getValue(),
                'V_V_FAULT_LEVEL': Ext.getCmp("faultLevel2").getValue(),
                'V_V_FILE_GUID': records[0].get('V_FILE_GUID'),
                'V_V_INTIME': Ext.Date.format(new Date(), 'Y-m-d'),
                'V_V_PERCODE': V_V_PERSONCODE,
                'V_V_IP': V_V_IP,
                'V_V_FAULT_NAME':Ext.getCmp("faultname2").getValue(),
                'V_V_FAULT_PART':Ext.getCmp("faultpart2").getValue(),
                'V_V_FAULT_CLGC':Ext.getCmp("faultclgc2").getValue(),
                'V_V_FAULT_SS':Ext.getCmp("faultss2").getValue(),
                'V_V_FAULT_XZ':Ext.getCmp("faultxz2").getValue(),
                'V_V_FAULT_ZGCS':Ext.getCmp("faultzgcs2").getValue(),
                'V_V_FZR_CL':Ext.getCmp("fzrcl2").getValue()
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);
                if (data.RET == 'Success') {
                    // Ext.Msg.alert('成功', '修改成功');
                    Ext.MessageBox.show({
                        title: '提示',
                        msg: '修改成功',
                        buttons: Ext.MessageBox.OK
                    });
                    _seltctFault();
                    // Ext.Ajax.request({
                    //     url: AppUrl + 'PM_14/PRO_PM_07_DEFECT_MANY_EDIT',
                    //     type: 'ajax',
                    //     method: 'POST',
                    //     params: {
                    //         V_V_GUID:records[0].get('V_GUID'),
                    //         V_V_PERCODE:Ext.util.Cookies.get('v_personcode'),
                    //         V_V_DEFECTLIST:Ext.getCmp('faultRea2').getValue(),
                    //         V_V_DEPTCODE: Ext.getCmp('V_V_DEPTCODE2').getValue(),
                    //         V_V_EQUCODE:Ext.getCmp('V_EQUNAME2').getValue(),
                    //         V_V_EQUCHILDCODE: Ext.getCmp("SUB_V_EQUNAME2").getValue(),
                    //         V_V_IDEA:Ext.getCmp('faultSol2').getValue(),
                    //         V_V_LEVEL:Ext.getCmp('faultLevel2').getValue()
                    //     },
                    //     success: function (response) {
                    //         var data = Ext.JSON.decode(response.responseText);
                    //
                    //         // var data = Ext.decode(response.responseText);
                    //         if(data.V_INFO=='成功'){
                    //             Ext.getCmp("updateFaultWindow").close();
                    //             _seltctFault();
                    //
                    //         } else {
                    //             Ext.MessageBox.show({
                    //                 title: '错误',
                    //                 msg: data.message,
                    //                 buttons: Ext.MessageBox.OK,
                    //                 icon: Ext.MessageBox.ERROR
                    //             });
                    //         }
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

                } else {
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: data.message,
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
    if(records[0].get('V_STATE')!='0'){
        Ext.MessageBox.show({
            title: '提示',
            msg: '上报后不能修改',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
    }else{
        Ext.getCmp('updateFaultWindow').show();
    }

    // Ext.Ajax.request({
    //     url: AppUrl + ' qx/PRO_PM_07_DEFECT_GET',
    //     type: 'ajax',
    //     method: 'POST',
    //     params: {
    //         V_V_GUID:records[0].get('V_GUID')
    //     },
    //     success: function (response) {
    //         var data = Ext.JSON.decode(response.responseText);
    //         if(data.list[0].V_STATECODE=='20'||data.list[0].V_STATECODE=='40'){
    //             alert("已下票或已消缺，不能更改");
    //
    //         }else{
    //             Ext.getCmp('updateFaultWindow').show();
    //         }
    //     }
    // });
    init = true;

    orgLoad2 = false;
    equFaultLoad2 = false;



    Ext.getBody().mask('<p>页面载入中...</p>');

      var deptStore2 = Ext.data.StoreManager.lookup('deptStore2');
     deptStore2.proxy.extraParams = {
     'V_V_PERSONCODE': V_V_PERSONCODE,
     'V_V_DEPTCODE': records[0].get('V_ORGCODE'),
     'V_V_DEPTCODENEXT': "%",
     'V_V_DEPTTYPE': '[主体作业区]'
     };
     deptStore2.load();

     var eTypeStore2 = Ext.data.StoreManager.lookup('eTypeStore2');
     eTypeStore2.proxy.extraParams = {
     'V_V_PERSONCODE': V_V_PERSONCODE,
     'V_V_DEPTCODENEXT': records[0].get('V_DEPTCODE')

     };
     eTypeStore2.load();

     var equNameStore2 = Ext.data.StoreManager.lookup('equNameStore2');
     equNameStore2.proxy.extraParams = {
     'V_V_PERSONCODE': V_V_PERSONCODE,
     'V_V_DEPTCODENEXT': records[0].get('V_DEPTCODE'),
     'V_V_EQUTYPECODE': records[0].get('V_EQUTYPECODE')

     };
     equNameStore2.load();


     var subequNameStore2 = Ext.data.StoreManager.lookup('subequNameStore2');
     Ext.data.StoreManager.lookup('subequNameStore2').load({
     params: {
     V_V_PERSONCODE: V_V_PERSONCODE,
     V_V_DEPTCODE: records[0].get('V_ORGCODE'),
     V_V_DEPTNEXTCODE: records[0].get('V_DEPTCODE'),
     V_V_EQUTYPECODE: records[0].get('V_EQUTYPECODE'),
     V_V_EQUCODE: records[0].get('V_EQUCODE')
     }
     });

    Ext.getCmp('V_V_ORGCODE2').setValue(records[0].get('V_ORGCODE'));
    Ext.getCmp('V_V_DEPTCODE2').setValue(records[0].get('V_DEPTCODE'));
    Ext.getCmp('V_V_EQUTYPE2').setValue(records[0].get('V_EQUTYPECODE'));
    Ext.getCmp('V_EQUNAME2').setValue(records[0].get('V_EQUCODE'));

    Ext.getCmp('equFaultname2').setValue(records[0].get('V_TYPECODE'));
    Ext.getCmp('begintime2').setValue(records[0].get('V_FINDTIME'));
    Ext.getCmp('faultRea2').setValue(records[0].data.V_FAULT_YY);
    Ext.getCmp('faultDesc2').setValue(records[0].data.V_FAULT_XX);
    Ext.getCmp('faultLevel2').setValue(records[0].data.V_FAULT_LEVEL);
    Ext.getCmp('faultSol2').setValue(records[0].data.V_JJBF);
    Ext.getCmp('faultname2').setValue(records[0].data.V_FAULT_NAME);
    Ext.getCmp('faultpart2').setValue(records[0].data.V_FAULT_PART);
    Ext.getCmp('faultclgc2').setValue(records[0].data.V_FAULT_CLGC);
    Ext.getCmp('faultss2').setValue(records[0].data.V_FAULT_SS);
    Ext.getCmp('faultxz2').setValue(records[0].data.V_FAULT_XZ);
    Ext.getCmp('faultzgcs2').setValue(records[0].data.V_FAULT_ZGCS);
    Ext.getCmp('fzrcl2').setValue(records[0].data.V_FZR_CL);
    // code = records[0].get('V_EQUCHILD_CODE');
    // filequery2(records[0].get('V_GUID'));
    // _selectsubequName2();
    // Ext.data.StoreManager.lookup('subequNameStore2').load({
    //     callback: function(records, options, success){
    //         if(code!=""){
    //             Ext.getCmp('SUB_V_EQUNAME2').setValue(code);
    //             code="";
    //         }
    //     }
    // });

    filequery2(records[0].get('V_GUID'));
    _selectsubequName2();
    Ext.getCmp('SUB_V_EQUNAME2').setValue(records[0].get('V_EQUCHILD_CODE'));
    Ext.getBody().unmask();//去除页面笼罩

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

    // Ext.Ajax.request({
    //     url: AppUrl + ' qx/PRO_PM_07_DEFECT_GET',
    //     type: 'ajax',
    //     method: 'POST',
    //     params: {
    //         V_V_GUID:records[0].get('V_GUID')
    //     },
    //     success: function (response) {
    //         var data = Ext.JSON.decode(response.responseText);
    //         if(data.list[0].V_STATECODE=='20'||data.list[0].V_STATECODE=='40'){
    //             alert("已下票或已消缺，不能删除");
    //
    //         }else{
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
                                    url: AppUrl + 'PM_14/PM_14_FAULT_ITEM_DATA_DEL',
                                    type: 'ajax',
                                    method: 'POST',
                                    params: {
                                        'V_V_PERCODE': V_V_PERSONCODE,
                                        'V_V_IP': V_V_IP,
                                        'V_V_GUID': records[i].get('V_GUID')
                                    },
                                    // success: function (response) {
                                    //     var data = Ext.decode(response.responseText);
                                    //     if (data.success) {
                                    //         Ext.Ajax.request({
                                    //             url: AppUrl + 'PM_14/PRO_PM_07_DEFECT_DEL',
                                    //             type: 'ajax',
                                    //             method: 'POST',
                                    //             params: {
                                    //                 V_V_GUID: records[0].get('V_GUID'),
                                    //                 V_V_PERCODE: Ext.util.Cookies.get('v_personcode')
                                    //             },
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
                                                            msg: data.message,
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
                                            // });
                                            // Ext.data.StoreManager.lookup('faultItemStore').remove(records[0]);
                                            // Ext.Msg.alert('操作信息', '删除成功');
                                        // } else {
                                        //     Ext.MessageBox.show({
                                        //         title: '错误',
                                        //         msg: data.message,
                                        //         buttons: Ext.MessageBox.OK,
                                        //         icon: Ext.MessageBox.ERROR
                                        //     });
                                        // }
                                    // },
                                    // failure: function (response) {
                                    //     Ext.MessageBox.show({
                                    //         title: '错误',
                                    //         msg: response.responseText,
                                    //         buttons: Ext.MessageBox.OK,
                                    //         icon: Ext.MessageBox.ERROR
                                    //     });
                                    // }
                                });
                                }else{
                                    Ext.MessageBox.show({
                                        title: '提示',
                                        msg: '已上报，不能删除',
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.ERROR
                                    });
                                }

                        }
                        }
                    }
                });
    //         }
    //     }
    // });

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

function setValue22(m_strValue) {
    var namevou = m_strValue;

    if (namevou == "111") {


        Ext.MessageBox.show({
            title: '提示',
            msg: '操作成功',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.INFO,
            fn : function() {


                _seltctFault();

            }

        });

    }else{
        Ext.MessageBox.show({
            title: '提示',
            msg: '操作失败',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
    }
}
function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
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
                    var vfaultxx=records[i].get('V_FAULT_XX');
                    var vfaultid=records[i].get('V_FAULTID');
                    Ext.Ajax.request({
                        url: AppUrl + 'cxy/PM_14_FAULT_ITEM_DATA_UP',
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
                                Ext.Ajax.request({
                                    url: AppUrl + 'Activiti/StratProcess',
                                    async: false,
                                    method: 'post',
                                    params: {
                                        parName: ["originator", "flow_businesskey", V_NEXT_SETP, "idea", "remark", "flow_code", "flow_yj", "flow_type"],
                                        parVal: [V_V_PERSONCODE, vguid, Ext.getCmp('nextPer').getValue(),
                                            "请审批!", vfaultxx, vfaultid, "请审批！", "Fault"],
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
                                                url: AppUrl + 'cxy/PM_14_FAULT_ITEM_DATA_INSTANCEID_SET',
                                                type: 'ajax',
                                                method: 'POST',
                                                params: {
                                                    'V_V_GUID': vguid,
                                                    'V_V_INSTANCEID': Ext.decode(response.responseText).InstanceId
                                                },
                                                success: function (response) {
                                                }
                                            });
                                            i_err++;
                                            if (i_err == records.length) {
                                                Ext.MessageBox.show({
                                                    title: '提示',
                                                    msg: '上报成功!',
                                                    buttons: Ext.MessageBox.OK,
                                                    fn: function () {
                                                        _seltctFault();
                                                    }
                                                });
                                            }
                                        } else if (Ext.decode(response.responseText).ret == 'ERROR') {
                                            Ext.Msg.alert('提示', Ext.decode(response.responseText).msg);
                                        }
                                    }
                                });
                            } else {
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
                            Ext.MessageBox.show({
                                title: '错误',
                                msg: response.responseText,
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });
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
//保存+上报
function OnButtonSaveUp() {
    var V_V_IP = '';
    if (location.href.split('?')[0] != undefined) {
        var parameters = Ext.urlDecode(location.href.split('?')[0]);
        (parameters.V_V_IP == undefined) ? V_V_IP = '' : V_V_IP = parameters.V_V_IP;
    }

    var fileguid = '';
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        fileguid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            fileguid += "-";
    }

    var faultguid = '';
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        faultguid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            faultguid += "-";
    }

    var intime = Ext.Date.format(new Date(), 'Y-m-d');


    if (!_validate(Ext.getCmp('addPanel'))) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请录入这些必填项!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }

    if (Ext.getCmp('V_V_ORGCODE1').getValue() != '%' && Ext.getCmp('V_V_DEPTCODE1').getValue() != '%' && Ext.getCmp('V_V_EQUTYPE1').getValue() != '%' && Ext.getCmp('V_EQUNAME1').getValue() != '%' && Ext.getCmp('SUB_V_EQUNAME1').getValue() != '%' && Ext.getCmp('equFaultname1').getValue() != '%') {
        Ext.Ajax.request({
            url: AppUrl + 'cxy/PM_1405_FAULT_ITEM_DATA_SET',
            type: 'ajax',
            method: 'POST',
            params: {
                'V_V_GUID': V_V_GUID,
                'V_V_ORGCODE': Ext.getCmp("V_V_ORGCODE1").getValue(),
                'V_V_DEPTCODE': Ext.getCmp("V_V_DEPTCODE1").getValue(),
                'V_V_EQUTYPE': Ext.getCmp("V_V_EQUTYPE1").getValue(),
                'V_V_EQUCODE': Ext.getCmp("V_EQUNAME1").getValue(),
                'V_V_EQUCHILD_CODE': Ext.getCmp("SUB_V_EQUNAME1").getValue(),
                'V_V_FAULT_GUID': faultguid,
                'V_V_FAULT_TYPE': Ext.getCmp("equFaultname1").getValue(),
                'V_V_FAULT_YY': Ext.getCmp("faultRea1").getValue(),
                'V_V_FINDTIME': Ext.getCmp("begintime1").getSubmitValue(),
                'V_V_FAULT_XX': Ext.getCmp("faultDesc1").getValue(),
                'V_V_JJBF': Ext.getCmp("faultSol1").getValue(),
                'V_V_FAULT_LEVEL': Ext.getCmp("faultLevel1").getValue(),
                'V_V_FILE_GUID': fileguid,
                'V_V_INTIME': intime,
                'V_V_PERCODE': V_V_PERSONCODE,
                'V_V_IP': V_V_IP,
                'V_V_FAULT_NAME':Ext.getCmp("faultname").getValue(),
                'V_V_FAULT_PART':Ext.getCmp("faultpart").getValue(),
                'V_V_FAULT_CLGC':Ext.getCmp("faultclgc").getValue(),
                'V_V_FAULT_SS':Ext.getCmp("faultss").getValue(),
                'V_V_FAULT_XZ':Ext.getCmp("faultxz").getValue(),
                'V_V_FAULT_ZGCS':Ext.getCmp("faultzgcs").getValue(),
                'V_V_FZR_CL':Ext.getCmp("fzrcl").getValue()
            },
            success: function (response) {
                var data = Ext.JSON.decode(response.responseText);

                // var data = Ext.decode(response.responseText);
                if (data.RET == 'Success') {
                    var records = Ext.getCmp('faultItemPanel').getSelectionModel().getSelection();

                    var V_V_IP = '';
                    if (location.href.split('?')[0] != undefined) {
                        var parameters = Ext.urlDecode(location.href.split('?')[0]);
                        (parameters.V_V_IP == undefined) ? V_V_IP = '' : V_V_IP = parameters.V_V_IP;
                    }

                    Ext.Ajax.request({
                        url: AppUrl + 'Activiti/StratProcess',
                        async: false,
                        method: 'post',
                        params: {
                            parName: ["originator", "flow_businesskey", V_NEXT_SETP2, "idea", "remark", "flow_code", "flow_yj", "flow_type"],
                            parVal: [V_V_PERSONCODE, V_V_GUID, Ext.getCmp('winnextPer').getValue(),
                                "请审批!", Ext.getCmp("faultDesc1").getValue(), data.FAULTID, "请审批！", "Fault"],
                            processKey: processKey2,
                            businessKey: V_V_GUID,
                            V_STEPCODE: 'Start',
                            V_STEPNAME: V_STEPNAME2,
                            V_IDEA: '请审批！',
                            V_NEXTPER: Ext.getCmp('winnextPer').getValue(),
                            V_INPER: Ext.util.Cookies.get('v_personcode')
                        },
                        success: function (response) {
                            if (Ext.decode(response.responseText).ret == 'OK') {
                                Ext.Ajax.request({
                                    url: AppUrl + 'cxy/PM_14_FAULT_ITEM_DATA_UP',
                                    type: 'ajax',
                                    method: 'POST',
                                    params: {
                                        'V_V_PERCODE': V_V_PERSONCODE,
                                        'V_V_IP': V_V_IP,
                                        'V_V_GUID': V_V_GUID
                                    },
                                    success: function (response) {
                                        var resp = Ext.decode(response.responseText);
                                        if (resp.RET == 'success') {//成功，会传回true
                                                _seltctFault();
                                                Ext.MessageBox.show({
                                                    title: '提示',
                                                    msg: '保存及上报成功!',
                                                    buttons: Ext.MessageBox.OK,
                                                    fn: function () {
                                                        _seltctFault();
                                                    }
                                                });
                                        } else {
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
                                        Ext.MessageBox.show({
                                            title: '错误',
                                            msg: response.responseText,
                                            buttons: Ext.MessageBox.OK,
                                            icon: Ext.MessageBox.ERROR
                                        });
                                    }
                                });
                                Ext.Ajax.request({
                                    url: AppUrl + 'cxy/PM_14_FAULT_ITEM_DATA_INSTANCEID_SET',
                                    type: 'ajax',
                                    method: 'POST',
                                    params: {
                                        'V_V_GUID': V_V_GUID,
                                        'V_V_INSTANCEID': Ext.decode(response.responseText).InstanceId
                                    },
                                    success: function (response) {
                                    }
                                });
                            } else if (Ext.decode(response.responseText).ret == 'ERROR') {
                                Ext.Msg.alert('提示', Ext.decode(response.responseText).msg);
                            }
                        }
                    });


                } else {
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: data.message,
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
    } else {
        Ext.MessageBox.show({
            title: '提示',
            msg: '下拉选项不能为全部',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }

}
function _preViewProcess(ProcessInstanceId,value) {

    var owidth = window.screen.availWidth;
    var oheight = window.screen.availHeight - 50;
    window.open(AppUrl + 'page/PM_210301/index.html?ProcessInstanceId='
        + ProcessInstanceId, '', 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes');
}