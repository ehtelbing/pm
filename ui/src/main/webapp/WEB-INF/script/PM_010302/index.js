var orgStoreLoad = false;
var deptStoreLoad = false;
var sbTypeStoreLoad = false;
var sbNameStoreLoad = false;
var V_V_EDIT_GUID = '';
var V_V_FILEGUID = '';
var V_PICGUID = '';
var V_V_REPAIR_GUID = '';
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
                Ext.getCmp('V_V_EQUCODE').select(store.last());
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
                Ext.getCmp('V_V_EQUNAME').select(store.first());
                sbNameStoreLoad = true;
                _init();
            }
        }
    });

    var imageStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'imageStore',
        fields: ['I_ID', 'V_FILENAME', 'V_FILETYPE', 'V_INPER', 'V_INPERNAME', 'V_INTIME', 'V_GUID', 'V_FILEGUID'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'mwd/PM_REPAIRT_IMG_TABLE_DATA',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'RET'
            },
            extraParams: {}
        })
    });

    var reapirStandardDataStore = Ext.create('Ext.data.Store', {
        id: 'reapirStandardDataStore',
        autoLoad: false,
        fields: ['I_ID', 'V_GUID', 'V_ORGCODE',
            'V_DEPTCODE', 'V_EQUCODE', 'V_EQUNAME',
            'V_PROJECT_IMG', 'V_WORK_BEFORE', 'V_WORK_PER',
            'V_WORK_TIME', 'V_WORK_CRAFT', 'V_WORK_TOOL',
            'V_SUM_TIME', 'V_WORK_AQ', 'V_WORK_DEPT',
            'V_REPAIR_NAME','V_WORK_CODE','V_WORK_NAME','V_CONTENT'],
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
        fields: ['V_GXCODE', 'V_GXNAME', 'V_CONTENT', 'V_TIEM', 'V_WORKTYPE',
            'V_WORKPER_NUM', 'V_TOOL', 'V_AQ', 'V_XZ_DEPT', 'V_INPER', 'V_INTIME',
            'V_ORDER', 'V_WORKWAY', 'V_JSYQ', 'V_REPAIR_CODE'],
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
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        },
            {
            text: '作业前准备',
            dataIndex: 'V_WORK_BEFORE',
            align: 'center',
            renderer: atleft,
            width: 120
        },
        {
            text: '作业施工名称',
            dataIndex: 'V_WORK_NAME',
            align: 'center',
            renderer: atleft,
            width: 120
        },
        {
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
        }, {
            text: '备注',
            dataIndex: 'V_CONTENT',
            align: 'center',
            renderer: atleft,
            width: 120
        },{
            text: '添加详情',
            align: 'center',
            renderer : detail
        }],
        listeners: {
            itemclick: function (panel, record, item, index, e, eOpts) {
                _selectGX(record.data.V_GUID);
                _preViewImage(record.data.V_GUID);
            }
        },
        dockedItems: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            store: reapirStandardDataStore,
            dock: 'bottom',
            displayInfo: true
        }]
    });

    var reapirStandardGXGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'reapirStandardGXGridPanel',
        store: reapirStandardGXStore,
        border: false,
        columnLines: true,
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
        }],listeners: {
            itemclick: function (panel, record, item, index, e, eOpts) {
                _selectBom(record.data.V_REPAIR_CODE,Ext.getCmp('V_V_EQUCODE').getValue());
            }
        }

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
                id: 'V_V_EQUCODE',
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
                id: 'V_V_EQUNAME',
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
                handler: _select
            }, {
                xtype: 'button',
                text: '添加',
                style: ' margin: 5px 0px 5px 10px',
                icon: imgpath + '/add.png',
                handler: _insert
            }, {
                xtype: 'button',
                text: '修改',
                style: ' margin: 5px 0px 5px 10px',
                icon: imgpath + '/edit.png',
                handler: _update
            },{
                xtype: 'button',
                text: '删除',
                style: ' margin: 5px 0px 5px 10px',
                icon: imgpath + '/delete.png',
                handler: _delete
            }

            ]
        }]

    });

    var viewImagePanel = Ext.create("Ext.form.Panel", {
        id: 'viewImagePanel',
        editable: false,
        region: 'north',
        items: [{
            layout: 'column',
            defaults: {
                labelAlign: 'right'
            },
            items: [{
                        xtype: 'box',
                        id: 'browseImage',
                        fieldLabel: "预览图片",
                        autoEl: {
                            width: window.screen.width / 2 - 110,
                            height: window.screen.height / 2 + 38,
                            tag: 'input',
                            type: 'image',
                            src: Ext.BLANK_IMAGE_URL,
                    style: 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale); border:1px solid #bebebe; margin-left: 0px;margin-top: 0px;',
                    // complete: 'off',
                    id: 'imageBrowse',
                    name: 'imageBrowse'
                }
            }]
        }]
    });
    var standardGXbomStore = Ext.create('Ext.data.Store', {
        id: 'standardGXbomStore',
        autoLoad: false,
        fields: ['V_SPCODE', 'V_SPNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'cxy/PRO_PM_STANDARD_GX_BOM_SEL',
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
    var standardGXbomGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'standardGXbomGridPanel',
        store: standardGXbomStore,
        region: 'center',
        border: false,
        columnLines: true,
        columns: [{
            text: '备件编码',
            dataIndex: 'V_SPCODE',
            align: 'center',
            renderer: atleft,
            width: 120
        }, {
            text: '备件名称',
            dataIndex: 'V_SPNAME',
            align: 'center',
            renderer: atleft,
            width: 300
        }]

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
            layout: 'border',
            border: false,
            items: [viewImagePanel,standardGXbomGridPanel]
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
        'V_V_EQUTYPECODE': Ext.getCmp('V_V_EQUCODE').getValue()
    };

    sbNameStore.load();
}

function _select() {
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

function _update() {
    var records = Ext.getCmp('reapirStandardDataGridPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择设备!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }

    window.open(AppUrl + 'page/PM_01020102/index_update.html?V_V_ORGCODE=' + records[0].get('V_ORGCODE') +
        '&V_V_DEPTCODE=' + records[0].get('V_DEPTCODE') + '&V_V_EQUCODE=' + records[0].get('V_EQUCODE') +
        '&V_V_EQUNAME=' + encodeURI(records[0].get('V_EQUNAME')) + '&V_V_GUID=' + records[0].get('V_GUID'), '_blank',
        'width=900,height=600,resizable=yes,scrollbars=yes');
}

function _delete() {

    var records = Ext.getCmp('reapirStandardDataGridPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择设备!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }

    Ext.Ajax.request({
        url: AppUrl + 'mwd/PM_REAPIR_STANDARD_DATA_DEL',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_V_GUID': records[0].get('V_GUID')
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.V_INFO == 'SUCCESS') {
                _select();
                Ext.Msg.alert('提示信息', '删除成功');
                _deleteFile(records[0].get('V_GUID'));
            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: '删除失败',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
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

    _selectGX(V_V_GUID = null);

}

function _deleteFile(V_V_GUID) {

    Ext.Ajax.request({
        url: AppUrl + 'mwd/PM_REPAIRT_IMG_GUID_DEL',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_V_GUID': V_V_GUID
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.V_INFO == 'success') {

            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: '删除附件失败',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
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

}

function _selectGX(V_V_GUID) {
    var reapirStandardGXStore = Ext.data.StoreManager.lookup('reapirStandardGXStore');
    reapirStandardGXStore.proxy.extraParams = {
        V_V_REPAIR_GUID: V_V_GUID

    };
    reapirStandardGXStore.load();
}
function _selectBom(V_REPAIR_CODE,V_YPEE) {
    var standardGXbomStore = Ext.data.StoreManager.lookup('standardGXbomStore');
    standardGXbomStore.proxy.extraParams = {
        V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODE:Ext.getCmp('V_V_DEPTCODE').getValue(),
        V_V_REPAIR_CODE: V_REPAIR_CODE,
        V_V_EQUTYPE: V_YPEE

    };
    standardGXbomStore.load();
}
function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}

function detail(a,value,metaData){

    return '<a href="javascript:insert(\'' + metaData.data.V_GUID + '\')">添加详情</a>';
}

function insert(V_GUID){
    var metaData = Ext.getCmp('reapirStandardDataGridPanel').getSelectionModel().getSelection();
    window.open(AppUrl + 'page/PM_01020101/index_insert.html?V_V_ORGCODE=' + metaData[0].data.V_ORGCODE +
        '&V_V_DEPTCODE=' + metaData[0].data.V_DEPTCODE + '&V_V_EQUCODE=' +metaData[0].data.V_EQUCODE +
        '&V_V_EQUNAME=' + encodeURI(metaData[0].data.V_EQUNAME) + '&V_V_GUID=' +metaData[0].data.V_GUID ,'_blank',
        'width=550,height=300,resizable=yes,scrollbars=yes');
}

function _insert(){
    var V_V_ORGCODE = Ext.getCmp('V_V_ORGCODE').getSubmitValue();
    var V_V_DEPTCODE = Ext.getCmp('V_V_DEPTCODE').getSubmitValue();
    var V_V_EQUCODE = Ext.getCmp('V_V_EQUCODE').getSubmitValue();
    var V_V_EQUNAME = Ext.getCmp('V_V_EQUNAME').getSubmitValue();
    var V_V_REPAIR_NAME = Ext.getCmp('V_V_REPAIR_NAME').getSubmitValue();

    if(V_V_DEPTCODE == '%'){
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择作业区',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }
    if(V_V_EQUCODE == '%'){
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择设备类型',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }
    // if(V_V_EQUNAME == '%'){
    //     Ext.MessageBox.show({
    //         title: '提示',
    //         msg: '请选择设备!',
    //         buttons: Ext.MessageBox.OK,
    //         icon: Ext.MessageBox.WARNING
    //     });
    //     return;
    // }

    window.open(AppUrl + 'page/PM_01020101/index_01.html?V_V_ORGCODE=' + V_V_ORGCODE +
        '&V_V_DEPTCODE=' + V_V_DEPTCODE + '&V_V_EQUCODE=' + V_V_EQUCODE +
         '&V_V_EQUNAME=' + encodeURI(V_V_EQUNAME), '_blank',
        'width=900,height=600,resizable=yes,scrollbars=yes');

}

function _preViewImage(V_V_GUID) {
    var imageStore = Ext.data.StoreManager.lookup('imageStore');
    imageStore.proxy.extraParams = {
        'V_V_GUID': V_V_GUID,
        'V_V_FILEGUID': '',
        'V_V_FILETYPE': '检修作业标准'
    };
    imageStore.load();

    index = 0;
    if (imageStore.getCount() != 0) {
        V_V_FILEGUID = imageStore.getAt(0).get('V_FILEGUID');
        var url = AppUrl + 'mwd/PM_REPAIRT_IMG_SEL_DATA?V_V_GUID=' + V_V_GUID + '&V_V_FILEGUID=' + V_V_FILEGUID +
            '&V_V_FILETYPE=' + encodeURI(encodeURI('检修作业标准')) + '&V_V_FILENAME=' + encodeURI(encodeURI(imageStore.getAt(0).get('V_FILENAME')));

        Ext.getCmp("browseImage").getEl().dom.src = url;
        picguidbegin = V_V_FILEGUID;
    } else {
        var url = AppUrl + 'mwd/PM_REPAIRT_IMG_SEL_DATA?V_V_GUID=' + V_V_GUID + '&V_V_FILEGUID=' + V_V_FILEGUID +
            '&V_V_FILETYPE=' + encodeURI(encodeURI('检修作业标准')) + '&V_V_FILENAME=' + encodeURI(encodeURI('JSBZ'));

        Ext.getCmp("browseImage").getEl().dom.src = url;
    }
}