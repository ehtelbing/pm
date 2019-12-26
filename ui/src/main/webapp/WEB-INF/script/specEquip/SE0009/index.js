var win;//父窗口对象，由子窗口调用
var returnValue;//父窗口对象，由子窗口调用

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

    var ftyStore = Ext.create('Ext.data.Store', {
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

    var equipStore = Ext.create('Ext.data.Store', {
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
                if (store.first().data.V_EQUCODE != '%') {
                    store.insert(0, {
                        V_EQUCODE: '%',
                        V_EQUNAME: '全部',
                        V_EQUSITE: '%',
                        V_EQUSITENAME: '全部'
                    });
                }
                Ext.getCmp('equip').select(store.first());
            }
        }
    });

    var checkOverTimeStore = Ext.create('Ext.data.Store', { //grid数据的store
        storeId: 'checkOverTimeStore',
        autoLoad: false,
        loading: false,
        pageSize: 10,
        fields: ['I_PLANID', 'V_DEPTNAME', 'V_EQUTYPENAME', 'V_EQUNAME', 'V_LCHECKTIME', 'V_CHECKCYCLE', 'V_CHECKTIME', 'V_OVERREASON'],
        proxy: {
            url: AppUrl + 'specEquip/selectCheckOverTime',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
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
            editable: false,
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
            editable: false,
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
            editable: false,
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
            editable: false,
            forceSelection: true,
            fieldLabel: '设备名称'
        }, {
            xtype: 'datefield',
            id: 'V_V_BDATE',
            format: 'Y-m-d',
            submitFormat: 'Y-m-d',
            fieldLabel: '开始时间',
            value: Ext.util.Format.date(new Date(), "Y-m-") + "01"
        }, {
            xtype: 'datefield',
            id: 'V_V_EDATE',
            format: 'Y-m-d',
            submitFormat: 'Y-m-d',
            fieldLabel: '结束时间',
            value: new Date()
        }]
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        id: 'buttonPanel',
        defaults: {
            style: 'margin: 2px;'
        },
        items: [{
            xtype: 'button',
            text: '查询',
            handler: _select
        }, {
            xtype: 'button',
            text: '导出EXCEL',
            handler: _export
        }]
    });

    var checkOverTimePanel = Ext.create('Ext.grid.Panel', {
        id: 'checkOverTimePanel',
        store: checkOverTimeStore,
        title: '检定逾期管理',
        columnLines: true,
        frame: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        selType: 'rowmodel',
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
            text: '上次检定时间',
            dataIndex: 'V_LCHECKTIME', //不定
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '检定周期',
            dataIndex: 'V_CHECKCYCLE',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '计划检定日期',
            dataIndex: 'V_CHECKTIME',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '检测申请',
            style: 'text-align: center;',
            flex: 1,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                return '<a href=javascript:_viewPlanApply(' + record.data.I_PLANID + ')>' + '查看' + '</a>';//超链接导出
            }
        }, {
            text: '逾期原因',
            dataIndex: 'V_OVERREASON',
            style: 'text-align: center;',
            flex: 2,
        }, {
            text: 'I_PLANID',
            dataIndex: 'I_PLANID',
            style: 'text-align: center;',
            flex: 1,
            hidden: true
        }],
        viewConfig: {
            emptyText: '<div style="text-align: center; padding-top: 50px; font: italic bold 20px Microsoft YaHei;">没有数据</div>',
            enableTextSelection: true
        },
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            store: checkOverTimeStore,
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
            items: [formPanel, buttonPanel]
        }, {
            region: 'center',
            layout: 'fit',
            items: [checkOverTimePanel]
        }]
    });

    _init();
})

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

    _select();
    Ext.getBody().unmask();
}

function _selectDept() {
    var deptStore = Ext.data.StoreManager.lookup('deptStore');
    deptStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODE: Ext.getCmp('FTY_CODE_').getValue(),
        V_V_DEPTCODENEXT: '%',
        V_V_DEPTTYPE: '主体作业区'
    };
    deptStore.load();
}

function _selectEquipType() {
    var equipTypeStore = Ext.data.StoreManager.lookup('equipTypeStore');
    equipTypeStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODENEXT: Ext.getCmp('DEPT_CODE_').getValue()
    };
    equipTypeStore.load();
}

function _selectEquip() {
    var equipStore = Ext.data.StoreManager.lookup('equipStore');
    equipStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODENEXT: Ext.getCmp('DEPT_CODE_').getValue(),
        V_V_EQUTYPECODE: Ext.getCmp('equipType').getValue()
    };
    equipStore.load();
}

//点击查询按钮
function _select() {
    if (Ext.getCmp("V_V_BDATE").getSubmitValue() == '' || Ext.getCmp("V_V_EDATE").getSubmitValue() == '') {
        alert('开始时间或者结束时间不能为空');
        return;
    }
    var checkOverTimeStore = Ext.data.StoreManager.lookup('checkOverTimeStore');
    checkOverTimeStore.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODE': Ext.getCmp("FTY_CODE_").getValue(), //选取的厂矿的值
        'V_V_DEPTCODENEXT': Ext.getCmp("DEPT_CODE_").getValue(), //选取的作业区的值
        'V_V_EQUTYPECODE': Ext.getCmp("equipType").getValue(), //选取的设备类型的值
        'V_V_EQUTYPENAME': Ext.getCmp("equipType").getRawValue(), //选取设备类型的显示值
        'V_V_EQUCODE': Ext.getCmp("equip").getValue(), //选取设备名称的值
        'V_V_BDATE': Ext.getCmp("V_V_BDATE").getSubmitValue(),
        'V_V_EDATE': Ext.getCmp("V_V_EDATE").getSubmitValue()
    }
    checkOverTimeStore.currentPage = 1;
    checkOverTimeStore.load();
}

//点击导出excel
function _export() {
    var records = Ext.getCmp('checkOverTimePanel').getSelectionModel().getSelection();

    var I_I_ID_LIST = new Array();
    var V_DEPTNAME_LIST = new Array();
    var V_EQUTYPENAME_LIST = new Array();
    var V_EQUNAME_LIST = new Array();
    var V_LCHECKTIME_LIST = new Array();
    var V_CHECKCYCLE_LIST = new Array();
    var V_CHECKTIME_LIST = new Array();
    var V_OVERREASON_LIST = new Array();
    for (var i = 0; i < records.length; i++) {
        I_I_ID_LIST.push(records[i].get('I_PLANID'));
        V_DEPTNAME_LIST.push(records[i].get('V_DEPTNAME'));
        V_EQUTYPENAME_LIST.push(records[i].get('V_EQUTYPENAME'));
        V_EQUNAME_LIST.push(records[i].get('V_EQUNAME'));
        V_LCHECKTIME_LIST.push(records[i].get('V_LCHECKTIME'));
        V_CHECKCYCLE_LIST.push(records[i].get('V_CHECKCYCLE'));
        V_CHECKTIME_LIST.push(records[i].get('V_CHECKTIME'));
        V_OVERREASON_LIST.push(records[i].get('V_OVERREASON'));
    }

    if (I_I_ID_LIST.length > 0) {
        document.location.href = AppUrl + 'specEquip/excelCheckOverTime?I_I_ID_LIST=' + I_I_ID_LIST + '&V_DEPTNAME_LIST=' + V_DEPTNAME_LIST + '&V_EQUTYPENAME_LIST=' + V_EQUTYPENAME_LIST + '&V_EQUNAME_LIST=' + V_EQUNAME_LIST + '&V_LCHECKTIME_LIST=' + V_LCHECKTIME_LIST + '&V_CHECKCYCLE_LIST=' + V_CHECKCYCLE_LIST + '&V_CHECKTIME_LIST=' + V_CHECKTIME_LIST + '&V_OVERREASON_LIST=' + V_OVERREASON_LIST;
    } else {
        document.location.href = AppUrl + 'specEquip/excelCheckOverTime?I_I_ID_LIST=' + I_I_ID_LIST + '&V_V_PERSONCODE=' + Ext.util.Cookies.get('v_personcode') + '&V_V_DEPTCODE=' + Ext.getCmp('FTY_CODE_').getValue() + '&V_V_DEPTCODENEXT=' + Ext.getCmp('DEPT_CODE_').getValue() + '&V_V_EQUTYPECODE=' + Ext.getCmp('equipType').getValue() + '&V_V_EQUTYPENAME=' + Ext.getCmp('equipType').getRawValue() + '&V_V_EQUCODE=' + Ext.getCmp('equip').getValue() + '&V_V_BDATE=' + Ext.getCmp('V_V_BDATE').getSubmitValue() + '&V_V_EDATE=' + Ext.getCmp('V_V_EDATE').getSubmitValue() + '&page=1&limit=-1';
    }
}

//点击查看
function _viewPlanApply(I_PLANID) {
    win = Ext.create('Ext.window.Window', {
        title: '检定计划申请查看',
        modal: true,
        autoShow: true,
        maximized: false,
        maximizable: true,
        width: 560,
        height: 420,
        html: '<iframe src=' + AppUrl + 'page/specEquip/SE000303/index.html?P_ID=' + I_PLANID + ' style="width: 100%; height: 100%;" frameborder="0"/ >',
    });
}