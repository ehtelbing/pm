var win;//父窗口对象，由子窗口调用
var returnValue;//父窗口对象，由子窗口调用
var statusList = [{
    NAME_: '全部',
    CODE_: '%'
}, {
    NAME_: '未上报',
    CODE_: '未上报'
}, {
    NAME_: '在审',
    CODE_: '在审'
}, {
    NAME_: '完成',
    CODE_: '完成'
}];

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

    var statusStore = Ext.create("Ext.data.Store", {//年份
        storeId: 'statusStore',
        fields: ['NAME_', 'CODE_'],
        data: statusList,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    });

    let ftyStore = Ext.create('Ext.data.Store', {
        storeId: 'ftyStore',
        autoLoad: true,//true为自动加载
        loading: true,//自动加载时必须为true
        pageSize: -1,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            type: 'ajax',
            async: true,//false=同步
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                V_V_DEPTCODENEXT: '%',
                V_V_DEPTTYPE: '基层单位'
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        },
        listeners: {
            load: function (store, records, successful, eOpts) {
                _init();//自动加载时必须调用
            }
        }
    });

    var deptStore = Ext.create('Ext.data.Store', {
        storeId: 'deptStore',
        autoLoad: false,
        loading: false,
        pageSize: -1,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            type: 'ajax',
            async: false,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }),
        listeners: {
            load: function (store, records, successful, eOpts) {
                Ext.getCmp('DEPT_CODE_').select(store.first());
            }
        }
    });

    var equipTypeStore = Ext.create('Ext.data.Store', {
        storeId: 'equipTypeStore',
        autoLoad: false,
        loading: false,
        pageSize: -1,
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
            type: 'ajax',
            async: false,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }),
        listeners: {
            load: function (store, records, successful, eOpts) {
                Ext.getCmp('equipType').select(store.first());
            }
        }
    });

    let equipStore = Ext.create('Ext.data.Store', {
        storeId: 'equipStore',
        autoLoad: false,
        loading: false,
        pageSize: -1,
        fields: ['V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_EQUSITENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            url: AppUrl + 'pm_19/PRO_GET_DEPTEQU_PER',
            type: 'ajax',
            async: false,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }),
        listeners: {
            load: function (store, records, successful, eOpts) {
                Ext.getCmp('equip').select(store.first());
            }
        }
    });

    let planApplyStore = Ext.create('Ext.data.Store', {
        storeId: 'planApplyStore',
        autoLoad: false,
        loading: false,
        pageSize: 11,
        fields: ['I_PLANID', 'V_ORGNAME', 'V_ORGCODE', 'V_DEPTNAME', 'V_DEPTCODE', 'V_EQUTYPENAME', 'V_EQUTYPECODE', 'V_EQUNAME', 'V_EQUNCODE', 'V_CHECKTIME', 'V_CHECKPART', 'V_CHECKDEPT', 'V_COST', 'V_OVERREASON', 'V_STATUS', 'V_STATE'],
        proxy: {
            url: AppUrl + 'specEquip/selectPlanApply',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        }
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        id: 'buttonPanel',
        defaults: {
            style: 'margin: 2px;'
        },
        items: [{
            xtype: 'button',
            text: '查询',
            handler: _selectPlanApply
        }, {
            xtype: 'button',
            text: '导出EXCEL',
            handler: _excelPlanApply
        }]
    });

    var formPanel = Ext.create('Ext.form.Panel', {
        id: 'formPanel',
        layout: 'column',
        frame: true,
        autoScroll: true,
        style: {
            border: 0
        },
        defaults: {
            labelAlign: 'right',
            labelWidth: 100,
            inputWidth: 140,
            margin: '4'
        },
        items: [{
            xtype: 'combo',
            id: 'FTY_CODE_',
            name: 'FTY_CODE_',
            store: ftyStore,
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            emptyText: '全部',
            forceSelection: true,
            fieldLabel: '厂矿',
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        _selectDept();
                        _selectEquipType();
                        _selectEquip();
                    }
                }
            }
        }, {
            xtype: 'combo',
            id: 'DEPT_CODE_',
            name: 'DEPT_CODE_',
            store: deptStore,
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            emptyText: '全部',
            forceSelection: true,
            fieldLabel: '作业区',
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        _selectEquipType();
                        _selectEquip();
                    }
                }
            }
        }, {
            xtype: 'combo',
            id: 'equipType',
            name: 'equipType',
            store: equipTypeStore,
            queryMode: 'local',
            valueField: 'V_EQUTYPECODE',
            displayField: 'V_EQUTYPENAME',
            emptyText: '全部',
            forceSelection: true,
            fieldLabel: '设备类型',
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        _selectEquip()
                    }
                }
            }
        }, {
            xtype: 'combo',
            id: 'equip',
            name: 'equip',
            store: equipStore,
            queryMode: 'local',
            valueField: 'V_EQUCODE',
            displayField: 'V_EQUNAME',
            emptyText: '全部',
            forceSelection: true,
            fieldLabel: '设备名称'
        }, {
            xtype: 'datefield',
            id: 'V_V_BDATE',
            format: 'Y-m-d',
            submitFormat: 'Y-m-d',
            fieldLabel: '开始时间'
        }, {
            xtype: 'datefield',
            id: 'V_V_EDATE',
            format: 'Y-m-d',
            submitFormat: 'Y-m-d',
            fieldLabel: '结束时间'
        }, {
            xtype: 'combo',
            id: 'V_V_STATUS',
            store: statusStore,
            queryMode: 'local',
            valueField: 'CODE_',
            displayField: 'NAME_',
            emptyText: '全部',
            forceSelection: true,
            fieldLabel: '状态'
        }]
    });

    var planApplyPanel = Ext.create('Ext.grid.Panel', {
        id: 'planApplyPanel',
        store: planApplyStore,
        columnLines: true,
        frame: true,
        style: {
            border: 0
        },
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [{
            text: '序号',
            xtype: "rownumberer",
            width: '100px'
        }, {
            text: '作业区',
            dataIndex: 'V_DEPTNAME',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '设备类型',
            dataIndex: 'V_EQUTYPENAME',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '设备名称',
            dataIndex: 'V_EQUNAME',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '检定时间',
            dataIndex: 'V_CHECKTIME',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '检定部位',
            dataIndex: 'V_CHECKPART',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '检定单位',
            dataIndex: 'V_CHECKDEPT',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '检测费用',
            dataIndex: 'V_COST',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '状态',
            dataIndex: 'V_STATUS',
            style: 'text-align: center;',
            width: '50px'
        }],
        viewConfig: {
            emptyText: '<div style="text-align: center; padding-top: 50px; font: italic bold 20px Microsoft YaHei;">没有数据</div>',
            enableTextSelection: true
        },
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            store: planApplyStore,
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
        }]
    });

    Ext.create('Ext.container.Viewport', {
        layout: {
            type: 'border',
            regionWeights: {
                west: -1,
                north: 1,
                south: 1,
                east: -1
            }
        },
        defaults: {
            border: false
        },
        items: [{
            region: 'north',
            items: [buttonPanel, formPanel]
        }, {
            region: 'center',
            layout: 'fit',
            items: [planApplyPanel]
        }]
    });

    _init();
});

function _init() {
    for (var i = 0; i < Ext.data.StoreManager.getCount(); i++) {//检查是否所有自动加载数据全部加载完毕
        if (Ext.data.StoreManager.getAt(i).isLoading()) {
            return;
        }
    }

    Ext.getCmp('FTY_CODE_').setValue(Ext.util.Cookies.get('v_orgCode'));
    _selectDept();
    Ext.getCmp('DEPT_CODE_').setValue(Ext.util.Cookies.get('v_deptcode'));
    _selectEquipType();
    _selectEquip();
    Ext.getCmp('V_V_STATUS').select(Ext.data.StoreManager.lookup('statusStore').first());

    _selectPlanApply();//查询加载主表数据
    Ext.getBody().unmask();

}

function _selectPlanApply() {
    var planApplyStore = Ext.data.StoreManager.lookup('planApplyStore');
    planApplyStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODE: Ext.getCmp('FTY_CODE_').getValue(),
        V_V_DEPTCODENEXT: Ext.getCmp('DEPT_CODE_').getValue(),
        V_V_EQUTYPECODE: Ext.getCmp('equipType').getValue(),
        V_V_EQUTYPENAME: Ext.getCmp('equipType').getRawValue(),
        V_V_EQUCODE: Ext.getCmp('equip').getValue(),
        V_V_BDATE: Ext.getCmp('V_V_BDATE').getSubmitValue(),
        V_V_EDATE: Ext.getCmp('V_V_EDATE').getSubmitValue(),
        V_V_STATUS: Ext.getCmp('V_V_STATUS').getValue()
    };
    planApplyStore.load();
}

function _excelPlanApply() {

}

function _selectDept() {
    let deptStore = Ext.data.StoreManager.lookup('deptStore');
    deptStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODE: Ext.getCmp('FTY_CODE_').getValue(),
        V_V_DEPTCODENEXT: '%',
        V_V_DEPTTYPE: '主体作业区'
    };
    deptStore.load();
}

function _selectEquipType() {
    let equipTypeStore = Ext.data.StoreManager.lookup('equipTypeStore');
    equipTypeStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODENEXT: Ext.getCmp('DEPT_CODE_').getValue()
    };
    equipTypeStore.load();
}

function _selectEquip() {
    let equipStore = Ext.data.StoreManager.lookup('equipStore');
    equipStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODENEXT: Ext.getCmp('DEPT_CODE_').getValue(),
        V_V_EQUTYPECODE: Ext.getCmp('equipType').getValue()
    };
    equipStore.load();
}

function _excelPlanApply() {
    Ext.Ajax.request({
        url: AppUrl + 'specEquip/excelPlanApply',
        async: false,
        params: {
            page : 1,
            limit : -1
        },
        callback: function (options, success, response) {
            if (success) {
            } else {
            }
        }
    });
}


