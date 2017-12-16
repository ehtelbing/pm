var orgStoreLoad = false;
var deptStoreLoad = false;
var sbTypeStoreLoad = false;
var sbNameStoreLoad = false;
var V_V_EDIT_GUID = '';
var V_PICGUID = '';
var sh = window.screen.height / 2 + 42;
var sw = window.screen.width / 2 - 130;

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
Ext.QuickTips.init();
Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果

    var orgStore = Ext.create('Ext.data.Store', {
        id: 'orgStore',
        autoLoad: true,
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
            extraParams: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.util.Cookies.get('v_deptcode'),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '基层单位'
            }
        },
        listeners: {
            load: function (store, records) {
                orgStoreLoad = true;
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
                deptStoreLoad = true;
                Ext.getCmp('V_V_DEPTCODE').select(store.first());
                _init();
            }
        }
    });

    var sbTypeStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'sbTypeStore',
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
            },
            extraParams: {}
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('V_V_EQUTYPECODE').select(store.last());
                sbTypeStoreLoad = true;
                _init();
            }
        }
    });

    var sbNameStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'sbNameStore',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'qx/PRO_PM_07_DEPTEQU_PER_DROP',
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
            load: function (store, records) {
                Ext.getCmp('V_V_EQUCODE').select(store.first());
                sbNameStoreLoad = true;
                _init();
            }
        }
    });

    var reapirStandardDataStore = Ext.create('Ext.data.Store', {
        id: 'reapirStandardDataStore',
        autoLoad: false,
        fields: ['I_ID', 'V_GUID', 'V_ORGCODE', 'V_DEPTCODE', 'V_EQUCODE', 'V_EQUNAME', 'V_PROJECT_IMG', 'V_WORK_BEFORE', 'V_WORK_PER', 'V_WORK_TIME', 'V_WORK_CRAFT', 'V_WORK_TOOL', 'V_SUM_TIME', 'V_WORK_AQ', 'V_WORK_DEPT', 'V_REPAIR_NAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'mwd/PM_REAPIR_STANDARD_DATA_SEL',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'RET',
                total: 'total'
            }
        }
    });

    var reapirStandardGXStore = Ext.create('Ext.data.Store', {
        id: 'reapirStandardGXStore',
        autoLoad: false,
        fields: ['V_GXCODE', 'V_GXNAME', 'V_CONTENT', 'V_TIEM', 'V_WORKTYPE', 'V_WORKPER_NUM', 'V_TOOL', 'V_AQ', 'V_XZ_DEPT', 'V_INPER', 'V_INTIME', 'V_ORDER', 'V_WORKWAY', 'V_JSYQ', 'V_REPAIR_CODE'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'mwd/PM_REAPIR_STANDARD_GX_SEL',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'V_CURSOR'
            }
        }
    });

    var reapirStandardDataGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'reapirStandardDataGridPanel',
        store: reapirStandardDataStore,
        height: window.screen.height / 2 - 120,
        border: false,
        columnLines: true,
        /*selModel: {
         selType: 'checkboxmodel',
         mode: 'SIMPLE'
         },*/
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '作业前准备',
            dataIndex: 'V_WORK_BEFORE',
            align: 'center',
            renderer: atleft,
            width: 120
        }, {
            text: '作业人员',
            dataIndex: 'V_WORK_PER',
            align: 'center',
            renderer: atleft,
            width: 80
        }, {
            text: '作业时间',
            dataIndex: 'V_WORK_TIME',
            align: 'center',
            renderer: atleft,
            width: 80
        }, {
            text: '总工时',
            dataIndex: 'V_SUM_TIME',
            align: 'center',
            renderer: atleft,
            width: 80
        }, {
            text: '作业工器具',
            dataIndex: 'V_WORK_TOOL',
            align: 'center',
            renderer: atleft,
            width: 80
        }, {
            text: '安全要素',
            dataIndex: 'V_WORK_AQ',
            align: 'center',
            renderer: atleft,
            width: 80
        }, {
            text: '协助单位',
            dataIndex: 'V_WORK_DEPT',
            align: 'center',
            renderer: atleft,
            width: 120
        }],
        listeners: {
            itemclick: function (panel, record, item, index, e, eOpts) {
                _selectGX(record.data.V_GUID);
            }
        },
        dockedItems: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            store: reapirStandardDataStore,
            dock: 'bottom',
            displayInfo: true
        }]/*,
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: reapirStandardDataStore
        }]*/

    });

    var reapirStandardGXGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'reapirStandardGXGridPanel',
        store: reapirStandardGXStore,
        border: false,
        columnLines: true,
        /*selModel: {
         selType: 'checkboxmodel',
         mode: 'SIMPLE'
         },*/
        columns: [{
            text: '程序',
            dataIndex: 'V_GXNAME',
            align: 'center',
            renderer: atleft,
            width: 120
        }, {
            text: '作业步骤',
            dataIndex: 'V_CONTENT',
            align: 'center',
            renderer: atleft,
            width: 300
        }, {
            text: '操作方法及要求',
            dataIndex: 'V_WORKWAY',
            align: 'center',
            renderer: atleft,
            width: 300
        }, {
            text: '工时（小时）',
            dataIndex: 'V_TIEM',
            align: 'center',
            renderer: atleft,
            width: 80
        }, {
            text: '工种',
            dataIndex: 'V_WORKTYPE',
            align: 'center',
            renderer: atleft,
            width: 80
        }]

    });

    var northpanel = Ext.create('Ext.panel.Panel', {
        id: 'northpanel',
        region: 'north',
        width: '100%',
        frame: true,
        layout: 'column',
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'combo',
                id: 'V_V_ORGCODE',
                store: orgStore,
                fieldLabel: '单位名称',
                style: ' margin: 5px 0px 5px 0px',
                labelWidth: 70,
                labelAlign: 'right',
                editable: false,
                queryMode: 'local',
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectDept();

                    }
                }
            }, {
                xtype: 'combo',
                id: 'V_V_DEPTCODE',
                store: deptStore,
                fieldLabel: '作业区',
                style: ' margin: 5px 0px 5px 10px',
                labelWidth: 70,
                labelAlign: 'right',
                editable: false,
                queryMode: 'local',
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectEquType();
                    }

                }
            }, {
                xtype: 'combo',
                id: 'V_V_EQUTYPECODE',
                store: sbTypeStore,
                fieldLabel: '设备类型',
                style: ' margin: 5px 0px 5px 10px',
                labelWidth: 70,
                labelAlign: 'right',
                editable: false,
                queryMode: 'local',
                displayField: 'V_EQUTYPENAME',
                valueField: 'V_EQUTYPECODE',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectEquName();
                    }
                }
            }, {
                xtype: 'combo',
                id: 'V_V_EQUCODE',
                store: sbNameStore,
                fieldLabel: '设备名称',
                style: ' margin: 5px 0px 5px 10px',
                labelWidth: 70,
                labelAlign: 'right',
                editable: false,
                queryMode: 'local',
                displayField: 'V_EQUNAME',
                valueField: 'V_EQUCODE'
            }, {
                xtype: 'textfield',
                id: "V_V_REPAIR_NAME",
                labelWidth: 70,
                emptyText: '部位名称搜索',
                style: ' margin: 5px 0px 5px 10px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '查询',
                style: ' margin: 5px 0px 5px 20px',
                icon: imgpath + '/search.png',
                handler: _selectReapirStandardData
            }]
        }]

    });

    var viewImagePanel = Ext.create("Ext.panel.Panel", {
        id: 'viewImagePanel',
        editable: false,
        frame: true,
        region: 'center',
        width: 500,
        border: false,
        html: "<div id = 'yulan'> <table border='0' width='50%' height='100%'><tr> <td> </td><td> <img src='" + imgpath + "/sblj.jpg' width= '" + sw + "px' height='" + sh + "px' /> </td> <td> </td> </tr> <tr> <td></td> <td align='center'></td> <td></td> </tr> </table> </div>",
        style: ' margin: -1px 0px 0pbx 0px'
    });

    var leftPanel = Ext.create('Ext.Panel', {
        id: 'leftPanel',
        layout: 'border',
        border: false,
        items: [{
            region: 'north',
            border: false,
            items: [reapirStandardDataGridPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [reapirStandardGXGridPanel]
        }]
    });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [{
            region: 'north',
            border: false,
            items: [northpanel]
        }, {
            region: 'west',
            layout: 'fit',
            width: '50%',
            border: false,
            items: [leftPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [viewImagePanel]
        }]

    });

    _init();
});

function _init() {
    if (orgStoreLoad && deptStoreLoad && sbTypeStoreLoad && sbNameStoreLoad) {

        Ext.data.StoreManager.lookup('reapirStandardDataStore').on('beforeload', function (store) {
            store.proxy.extraParams = {
                'V_V_ORGCODE': Ext.getCmp('V_V_ORGCODE').getValue(),
                'V_V_DEPTCODE': Ext.getCmp('V_V_DEPTCODE').getValue(),
                'V_V_EQUCODE': Ext.getCmp('V_V_EQUCODE').getValue(),
                'V_V_REPAIR_NAME': Ext.getCmp('V_V_REPAIR_NAME').getValue(),
                'V_V_PAGE': Ext.getCmp('page').store.currentPage,
                'V_V_PAGESIZE': Ext.getCmp('page').store.pageSize
            }
        });

        Ext.getBody().unmask();//去除页面笼罩
    }

}

function _selectDept() {
    var deptStore = Ext.data.StoreManager.lookup('deptStore');
    deptStore.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODE': Ext.getCmp('V_V_ORGCODE').getValue(),
        'V_V_DEPTCODENEXT': '%',
        'V_V_DEPTTYPE': '主体作业区'
    };
    deptStore.load();

}

function _selectEquType() {
    var sbTypeStore = Ext.data.StoreManager.lookup('sbTypeStore');
    sbTypeStore.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT': Ext.getCmp('V_V_DEPTCODE').getValue()

    };
    sbTypeStore.load();
}

function _selectEquName() {
    var sbNameStore = Ext.data.StoreManager.lookup('sbNameStore');
    sbNameStore.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT': Ext.getCmp('V_V_DEPTCODE').getValue(),
        'V_V_EQUTYPECODE': Ext.getCmp('V_V_EQUTYPECODE').getValue()

    };
    sbNameStore.load();
}

function _selectReapirStandardData() {
    var reapirStandardDataStore = Ext.data.StoreManager.lookup('reapirStandardDataStore');
    reapirStandardDataStore.proxy.extraParams = {
        'V_V_ORGCODE': Ext.getCmp('V_V_ORGCODE').getValue(),
        'V_V_DEPTCODE': Ext.getCmp('V_V_DEPTCODE').getValue(),
        'V_V_EQUCODE': Ext.getCmp('V_V_EQUCODE').getValue(),
        'V_V_REPAIR_NAME': Ext.getCmp('V_V_REPAIR_NAME').getValue(),
        'V_V_PAGE': Ext.getCmp('page').store.currentPage,
        'V_V_PAGESIZE': Ext.getCmp('page').store.pageSize

    };
    reapirStandardDataStore.currentPage = 1;
    reapirStandardDataStore.load();
}

function _selectGX(V_GUID) {
    var reapirStandardGXStore = Ext.data.StoreManager.lookup('reapirStandardGXStore');
    reapirStandardGXStore.proxy.extraParams = {
        V_V_REPAIR_GUID: V_GUID

    };
    reapirStandardGXStore.load();
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}