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
                if (store.first().data.V_EQUCODE != '%') {
                    store.insert(0, {
                        V_EQUCODE : '%',
                        V_EQUNAME : '全部',
                        V_EQUSITE : '%',
                        V_EQUSITENAME : '全部'
                    });
                }
                Ext.getCmp('equip').select(store.first());
            }
        }
    });


    var planApplyStore = Ext.create('Ext.data.Store', { //grid数据的store
        storeId: 'planApplyStore',
        autoLoad: false,
        loading: false,
        pageSize: 10,
        fields: ['V_EQUTYPECODE', 'V_STATE', 'V_ORGCODE', 'V_DEPTCODE', 'V_EQUTYPENAME', 'V_CHECKPART', 'V_EQUNCODE', 'I_PLANID', 'V_COST', 'V_EQUNAME', 'V_STATUS', 'V_DEPTNAME', 'V_CHECKTIME', 'V_CHECKDEPT', 'V_ORGNAME', 'V_OVERREASON', 'RN'],
        proxy: {
            url: AppUrl + 'specEquip/selectPlanApply',
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

    var statusStore = Ext.create('Ext.data.Store', {
        autoLoad : true,
        storeId : 'statusStore',
        fields : [ 'CODE_', 'NAME_' ],
        data : [ {
            'CODE_' : '%',
            'NAME_' : '全部'
        },{
            'CODE_' : '未上报',
            'NAME_' : '未上报'
        }, {
            'CODE_' : '在审',
            'NAME_' : '在审'
        }, {
            'CODE_' : '完成',
            'NAME_' : '完成'
        } ],
        proxy : {
            type : 'memory',
            reader : {
                type : 'json'
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
            editable: false,
            value: Ext.util.Format.date(new Date(), "Y-m-") + "01"
        }, {
            xtype: 'datefield',
            id: 'V_V_EDATE',
            format: 'Y-m-d',
            submitFormat: 'Y-m-d',
            fieldLabel: '结束时间',
            editable: false,
            value: new Date()
        }, {
            xtype: 'combo',
            id: 'V_V_STATUS',
            store: statusStore,
            queryMode: 'local',
            valueField: 'CODE_',
            displayField: 'NAME_',
            editable: false,
            forceSelection: true,
            fieldLabel: '状态'
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
            text: '起草',
            handler: _draft
        }, {
            xtype: 'button',
            text: '修改',
            handler: _update
        }, {
            xtype: 'button',
            text: '删除',
            handler: _delete
        }, {
            xtype: 'button',
            text: '提交',
            handler: _submit
        }]
    });

    var planApplyPanel = Ext.create('Ext.grid.Panel', {
        id: 'planApplyPanel',
        store: planApplyStore,
        title: '检定计划申请',
        columnLines: true,
        frame: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns: [{
            text: '序号',
            xtype: "rownumberer",
            width: '100px'
        }, {
            text : 'ID',
            dataIndex : 'I_PLANID',
            style : 'text-align: center;',
            flex : 1,
            hidden: true
        }, {
            text : '作业区',
            dataIndex : 'V_DEPTNAME',
            style : 'text-align: center;',
            flex : 1
        }, {
            text : '设备类型',
            dataIndex : 'V_EQUTYPENAME',
            style : 'text-align: center;',
            flex : 1
        }, {
            text : '设备名称',
            dataIndex : 'V_EQUNAME',
            style : 'text-align: center;',
            flex : 1
        }, {
            text : '检定时间',
            dataIndex : 'V_CHECKTIME',
            style : 'text-align: center;',
            flex : 1
        }, {
            text : '检定部位',
            dataIndex : 'V_CHECKPART',
            style : 'text-align: center;',
            flex : 1
        }, {
            text : '检定单位',
            dataIndex : 'V_CHECKDEPT',
            style : 'text-align: center;',
            flex : 1
        }, {
            text : '检定费用(元)',
            dataIndex : 'V_COST',
            style : 'text-align: center;',
            flex : 1
        }, {
            text : '状态',
            dataIndex : 'V_STATUS',
            style : 'text-align: center;',
            flex : 1
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
            items: [formPanel, buttonPanel]
        }, {
            region: 'center',
            layout: 'fit',
            items: [planApplyPanel]
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
    Ext.getCmp('V_V_STATUS').select(Ext.data.StoreManager.lookup('statusStore').first());

    _select();
    Ext.getBody().unmask();
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

//点击查询按钮
function _select() {
    var planApplyStore = Ext.data.StoreManager.lookup('planApplyStore');
    planApplyStore.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODE': Ext.getCmp("FTY_CODE_").getValue(), //选取的厂矿的值
        'V_V_DEPTCODENEXT': Ext.getCmp("DEPT_CODE_").getValue(), //选取的作业区的值
        'V_V_EQUTYPECODE': Ext.getCmp("equipType").getValue(), //选取的设备类型的值
        'V_V_EQUTYPENAME': Ext.getCmp("equipType").getRawValue(), //选取设备类型的显示值
        'V_V_EQUCODE': Ext.getCmp("equip").getValue(), //选取设备名称的值
        'V_V_BDATE': Ext.getCmp("V_V_BDATE").getSubmitValue(),
        'V_V_EDATE': Ext.getCmp("V_V_EDATE").getSubmitValue(),
        'V_V_STATUS': Ext.getCmp("V_V_STATUS").getValue()
    }
    planApplyStore.currentPage = 1;
    planApplyStore.load();
}

//点击起草按钮
function _draft() {
    returnValue = null;
    win = Ext.create('Ext.window.Window', {
        title: '检定计划起草',
        modal: true,
        autoShow: true,
        maximized: false,
        maximizable: true,
        width: 560,
        height: 420,
        html: '<iframe src=' + AppUrl + 'page/specEquip/SE000301/index.html?P_ID=' + "" + ' style="width: 100%; height: 100%;" frameborder="0"/ >',
        listeners : {
            close : function(panel, eOpts) {
                if (returnValue == '保存成功！') {
                    Ext.MessageBox.alert('提示',returnValue);
                    _select();
                }
            }
        }
    });
}

//点击修改按钮
function _update() {
    var records = Ext.getCmp('planApplyPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.alert('提示', '请选择一条数据');
        return;
    }

    returnValue = null;
    win = Ext.create('Ext.window.Window', {
        title: '检定计划修改',
        modal: true,
        autoShow: true,
        maximized: false,
        maximizable: true,
        width: 560,
        height: 420,
        html: '<iframe src=' + AppUrl + 'page/specEquip/SE000302/index.html?P_ID=' + records[0].get('I_PLANID') + ' style="width: 100%; height: 100%;" frameborder="0"/ >',
        listeners : {
            close : function(panel, eOpts) {
                if (returnValue != null) {
                    Ext.MessageBox.alert('提示','保存成功！');
                    var planApply = returnValue;
                    records[0].set("I_PLANID", planApply.list[0].I_ID);
                    records[0].set("V_CHECKDEPT", planApply.list[0].V_CHECKDEPT);
                    records[0].set("V_CHECKPART", planApply.list[0].V_CHECKPART);
                    records[0].set("V_CHECKTIME", planApply.list[0].V_CHECKTIME);
                    records[0].set("V_COST", planApply.list[0].V_COST);
                    records[0].set("V_DEPTNAME", planApply.list[0].V_DEPTNAME);
                    records[0].set("V_EQUNAME", planApply.list[0].V_EQUNAME);
                    records[0].set("V_EQUTYPENAME", planApply.list[0].V_EQUTYPENAME);
                    records[0].set("V_STATUS", planApply.list[0].V_STATUS);
                }
            }
        }
    });
}

//点击删除按钮
function _delete() {
    var records = Ext.getCmp('planApplyPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.alert('提示', '请选择一条数据');
        return;
    }

    Ext.MessageBox.show({
        title : '请确认',
        msg : '删除',
        buttons : Ext.MessageBox.YESNO,
        icon : Ext.MessageBox.QUESTION,
        fn : function(btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    url : AppUrl + 'specEquip/deletePlanApply',
                    async : false,
                    params : {
                        'I_I_ID' : records[0].get('I_PLANID')
                    },
                    callback : function(options, success, response) {
                        if (success) {
                            var data = Ext.decode(response.responseText);
                            if(data.success){
                                Ext.MessageBox.alert('提示',data.data.V_INFO);
                                Ext.data.StoreManager.lookup('planApplyStore').remove(records[0]);//前台删除被删除数据
                            }else{
                                Ext.MessageBox.alert('提示', '删除失败');
                            }
                        } else {
                            Ext.MessageBox.alert('提示', '删除失败');
                        }
                    }
                });
            }
        }
    });
}

//点击提交按钮
function _submit() {
    alert("还没有开发完，着个毛急");
}
