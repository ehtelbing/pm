var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var orgLoad = false;
var zyqLoad = false;
var equFaultLoad = false;
var sbmcLoad = false;
var zsbmcLoad = false;
var sblxLoad = false;
var V_V_ORGCODE = "";
// var V_V_DEPTCODE = "";
var V_V_EQUTYPE = "";
var V_V_EQUCODE = "";
var V_V_EQUCHILD_CODE = "";
var V_V_FAULT_TYPE = "";
Ext.define('Ext.ux.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    async:true,
    doRequest: function(operation, callback, scope) {
        var writer  = this.getWriter(),
            request = this.buildRequest(operation);
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        Ext.apply(request, {
            async         : this.async,
            binary        : this.binary,
            headers       : this.headers,
            timeout       : this.timeout,
            scope         : this,
            callback      : this.createRequestCallback(request, operation, callback, scope),
            method        : this.getMethod(request),
            disableCaching: false
        });
        Ext.Ajax.request(request);
        return request;
    }
});

if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_V_ORGCODE == undefined) ? V_V_ORGCODE = '' : V_V_ORGCODE = parameters.V_V_ORGCODE;
    (parameters.V_V_DEPTCODE == undefined) ? V_V_DEPTCODE = '%' : V_V_DEPTCODE = parameters.V_V_DEPTCODE;
    (parameters.V_V_EQUTYPE == '%25') ? V_V_EQUTYPE = '%' : V_V_EQUTYPE = parameters.V_V_EQUTYPE;
    (parameters.V_V_EQUCODE == '%25') ? V_V_EQUCODE = '%' : V_V_EQUCODE = parameters.V_V_EQUCODE;
    (parameters.V_V_EQUCHILD_CODE == '%25') ? V_V_EQUCHILD_CODE = '%' : V_V_EQUCHILD_CODE = parameters.V_V_EQUCHILD_CODE;
    (parameters.V_V_FAULT_TYPE == '%25') ? V_V_FAULT_TYPE = '%' : V_V_FAULT_TYPE = parameters.V_V_FAULT_TYPE;
}

Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');

    var ckStore = Ext.create('Ext.data.Store', {
        id: 'ckStore',
        autoLoad: true,
        fields: ['_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
        proxy: {
            type: 'ajax',
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
//作业区
    var zyqStore = Ext.create('Ext.data.Store', {
        id: 'zyqStore',
        autoLoad: false,
        fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            async: false
        },
        listeners: {
            load: function (store, records) {
                zyqLoad = true;
                Ext.getCmp('V_V_DEPTCODE').select(store.first());
                _init();
            }
        }
    });
//设备类型
    var sblxStore = Ext.create('Ext.data.Store', {
        id: 'sblxStore',
        autoLoad: false,
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: {
            type: 'ajax',
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
                sblxLoad = true;
                Ext.getCmp('V_V_EQUTYPE').select(store.first());
                _init();
            }
        }
    });
//设备名称
    var sbmcStore = Ext.create('Ext.data.Store', {
        id: 'sbmcStore',
        autoLoad: false,
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQU_PER_DROP',
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
                sbmcLoad = true;
                Ext.getCmp('V_EQUNAME').select(store.first());
                _init();
            }
        }
    });
//子设备名称
    var zsbmcStore = Ext.create('Ext.data.Store', {
        storeId: 'zsbmcStore',
        autoLoad: false,
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy:  Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            url: AppUrl + 'PM_14/PRO_SAP_EQU_VIEW',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        }),
        listeners: {
            load: function (store, records) {
                store.insert(0, {
                    'V_EQUCODE': '%',
                    'V_EQUNAME': '全部'
                });
                Ext.getCmp('SUB_V_EQUNAME').select(store.first());
                zsbmcLoad = true;
                _init();
            }
        }
    });
//故障类型
    var gzlxStore = Ext.create('Ext.data.Store', {
        id: 'gzlxStore',
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
                equFaultLoad = true;
                store.insert(0, {V_TYPENAME: '全部', V_TYPECODE: '%'});
                Ext.getCmp('equFaultname').select(store.first());
                _init();
            }
        }
    });
//查询
    var faultItemStore = Ext.create('Ext.data.Store', {
        storeId: 'faultItemStore',
        autoLoad: false,
        //pageSize:-1,
        fields: ['V_TIME', 'V_EQUTYPE', 'V_EQUNAME', 'V_EQUCHILD_CODE', 'V_FAULT_TYPE',
            'V_FAULT_YY', 'V_FAULT_XX', 'V_FAULT_LEVEL','V_FAULT_LEVELNAME' ,'V_JJBF', 'V_GUID', 'V_FILE_GUID',
            'V_ORGCODE', 'I_ID', 'V_DEPTNAME', 'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME', 'V_TYPECODE',
            'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_EQUCODE', 'V_FAULT_GUID', 'V_FINDTIME', 'V_PART',
            'V_TYPENAME', 'V_EQUCHILD_NAME','V_FAULT_NAME','V_STATE','V_STATENAME',
            'V_FAULT_PART','V_FAULT_CLGC','V_FAULT_SS','V_FAULT_XZ','V_FAULT_ZGCS','V_FZR_CL',
            'V_FAULTID','V_PROCESSINSTANCEID'],
        proxy: {
            // url: AppUrl + 'PM_14/PM_14_FAULT_ITEM_DATA_SEL',
            url: AppUrl + 'cxy/PM_14_FAULT_ITEM_DATA_SEL_NEW',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var inputPanel = Ext.create('Ext.panel.Panel', {
        id: 'inputPanel',
        region: 'north',
        border: false,
        layout: 'column',
        frame:true,
        defaults : {
            style : 'margin:5px 0px 5px 5px',
            labelAlign : 'right'
        },
        items: [
                {
                xtype: 'combo',
                id: 'V_V_ORGCODE',
                store: ckStore,
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                forceSelection: true,
                fieldLabel: '厂矿',
                editable: false,
                labelWidth: 70,
                width: 250,
                listeners: {
                    change: function (combo, records) {
                        var zyqStore = Ext.data.StoreManager.lookup('zyqStore');
                        zyqStore.proxy.extraParams = {
                            'V_V_PERSONCODE': V_V_PERSONCODE,
                            'V_V_DEPTCODE': Ext.getCmp('V_V_ORGCODE').getValue(),
                            'V_V_DEPTCODENEXT': "%",
                            'V_V_DEPTTYPE': '[主体作业区]'
                        };
                        zyqStore.currentPage = 1;
                        zyqStore.load();
                    }
                }
            }, {
                xtype: 'combo',
                id: 'V_V_DEPTCODE',
                store: zyqStore,
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                forceSelection: true,
                fieldLabel: '作业区',
                editable: false,
                labelWidth: 70,
                width: 250,
                listeners: {
                    change: function (combo, records) {
                        Ext.data.StoreManager.lookup('sblxStore').load({
                            params: {
                                V_V_PERSONCODE: V_V_PERSONCODE,
                                V_V_DEPTCODENEXT: Ext.getCmp('V_V_DEPTCODE').getValue()
                            }
                        });

                    }
                }
            }, {
                xtype: 'combo',
                id: 'V_V_EQUTYPE',
                store: sblxStore,
                queryMode: 'local',
                valueField: 'V_EQUTYPECODE',
                displayField: 'V_EQUTYPENAME',
                forceSelection: true,
                fieldLabel: '设备类型',
                editable: false,
                labelWidth: 70,
                width: 250,
                listeners: {
                    change: function () {
                        Ext.data.StoreManager.lookup('sbmcStore').load({
                            params: {
                                'V_V_PERSONCODE': V_V_PERSONCODE,
                                'V_V_DEPTCODENEXT': Ext.getCmp('V_V_DEPTCODE').getValue(),
                                'V_V_EQUTYPECODE': Ext.getCmp('V_V_EQUTYPE').getValue()
                            }
                        });
                    }
                }
            }, {
                xtype: 'combo',
                id: 'V_EQUNAME',
                store: sbmcStore,
                queryMode: 'local',
                valueField: 'V_EQUCODE',
                displayField: 'V_EQUNAME',
                forceSelection: true,
                fieldLabel: '设备名称',
                editable: false,
                labelWidth: 70,
                width: 250,
                listeners: {
                    change: function () {
                        Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
                        if(Ext.getCmp('V_EQUNAME').getValue() == '%')
                        {

                            var zsbmcStore = Ext.data.StoreManager.lookup('zsbmcStore');

                            zsbmcStore.load();

                            Ext.getBody().unmask();//去除页面笼罩
                        }
                        if(Ext.getCmp('V_EQUNAME').getValue() != '%')
                        {
                            Ext.data.StoreManager.lookup('zsbmcStore').load({
                                params: {
                                    V_V_PERSONCODE: V_V_PERSONCODE,
                                    V_V_DEPTCODE: Ext.getCmp('V_V_ORGCODE').getValue(),
                                    V_V_DEPTNEXTCODE: Ext.getCmp('V_V_DEPTCODE').getValue(),
                                    V_V_EQUTYPECODE: Ext.getCmp('V_V_EQUTYPE').getValue(),
                                    V_V_EQUCODE: Ext.getCmp('V_EQUNAME').getValue()
                                }
                            });


                            Ext.getBody().unmask();//去除页面笼罩
                        }

                    }
                }
            }
       ,{
                xtype: 'combo',
                id: 'SUB_V_EQUNAME',
                store: zsbmcStore,
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
                store: gzlxStore,
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
            }, {
                xtype: 'button',
                text: '查询',
                icon: imgpath + '/search.png',
                handler: _seltctFault
            }, {
                xtype: 'button',
                text: '导出excel',
                icon: imgpath + '/excel.gif',
                handler: _exportExcel
            }
            ]
    });

    var faultItemPanel = Ext.create('Ext.grid.Panel', {
        id: 'faultItemPanel',
        store: faultItemStore,
        border: false,
        columnLines: true,//是否显示分割线默认是false
        titleAlign: 'center',
        region: 'center',
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '对应的工单',
            dataIndex: 'V_GUID',
            align: 'center',
            width: 100,
            renderer:rendererGD
        },  {
            text: '事故状态',
            dataIndex: 'V_STATENAME',
            align: 'center',
            width: 100
            // renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
            //     // if(value!="未处理") {
            //     //     return '<a href="#" onclick="_preViewProcess(\'' + record.data.V_PROCESSINSTANCEID + '\')">' + value + '</a>';
            //     // }else{
            //     //     return value;
            //     // }
            // }
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
            dataIndex: 'V_FAULT_LEVELNAME',
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


    var panel = Ext.create('Ext.panel.Panel', {
        layout: 'border',
        region: 'center',
        items: [inputPanel, faultItemPanel]
    });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [panel]
    });

    _init();

});
function rendererGD(a, value, metaData){
    return '<a href="javascript:goToGD(\'' + metaData.data.V_GUID + '\')">详细</a>';
}
function goToGD(V_GUID){
    window.open(AppUrl + "page/PM_1406/workorder.html?V_GUID="
        + V_GUID,
        "", "dialogHeight:700px;dialogWidth:1100px");
}
function _init() {
    if (orgLoad && equFaultLoad && sblxLoad && sbmcLoad && zsbmcLoad) {
        orgLoad = false;
        equFaultLoad = false;
        sblxLoad = false;
        sbmcLoad = false;
        zsbmcLoad = false;
        _seltctFault();
        Ext.getBody().unmask();
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
    //faultItemStore.currentPage=1;
    faultItemStore.load();
}
function _exportExcel() {//PM_14
    document.location.href = AppUrl + 'cxy/PM_14_EXCEL?V_V_ORGCODE=' + Ext.ComponentManager.get("V_V_ORGCODE").getValue() + '&V_V_DEPTCODE=' +
        encodeURI(Ext.ComponentManager.get("V_V_DEPTCODE").getValue()) + '&V_V_EQUTYPE=' + encodeURI(Ext.ComponentManager.get("V_V_EQUTYPE").getValue()) + '&V_V_EQUCODE='
        + encodeURI(Ext.ComponentManager.get("V_EQUNAME").getValue()) + '&V_V_EQUCHILD_CODE=' + encodeURI(Ext.ComponentManager.get("SUB_V_EQUNAME").getValue())
        + '&V_V_FAULT_TYPE=' + encodeURI(Ext.ComponentManager.get("equFaultname").getValue()) + '&V_V_FAULT_YY=' + Ext.ComponentManager.get('faulttext').getValue()
        + '&V_V_FINDTIME_B=' + Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(), 'Y/m/d') + '&V_V_FINDTIME_E=' +
        Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y/m/d');
}

