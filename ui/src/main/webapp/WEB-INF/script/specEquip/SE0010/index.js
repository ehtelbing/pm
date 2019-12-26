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

    var operationStore = Ext.create('Ext.data.Store', {
        storeId: 'operationStore',
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

    let equipNameStore = Ext.create('Ext.data.Store', {
        storeId: 'equipNameStore',
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

    let equipMoveApplyStore = Ext.create('Ext.data.Store', {
        storeId: 'equipMoveApplyStore',
        autoLoad: false,
        loading: false,
        pageSize: 10,
        fields: ['I_PLANID', 'V_ORGNAME', 'V_ORGCODE', 'V_DEPTNAME', 'V_DEPTCODE', 'V_EQUTYPENAME', 'V_EQUTYPECODE', 'V_EQUNAME', 'V_EQUNCODE', 'V_SITE', 'V_NEWORGCODE', 'V_NEWORGNAME', 'V_NEWDEPTNAME', 'V_NEWDEPTCODE', 'V_NEWADD', 'V_STATUS', 'V_STATE', 'V_NEWSITE'],
        proxy: {
            url: AppUrl + 'specEquip/selectEquipMoveApply',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
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
            handler: _select
        }, {
            xtype: 'button',
            text: '起草',
            handler: _Draft
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
            handler: _Submission
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
            editable: false,
            forceSelection: true,
            fieldLabel: '厂矿',
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        _selectOperation();
                        _selectEquipType();
                        _selectEquipName();
                    }
                }
            }
        }, {
            xtype: 'combo',
            id: 'DEPT_CODE_',
            name: 'DEPT_CODE_',
            store: operationStore,
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
                        _selectEquipName();
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
                        _selectEquipName()
                    }
                }
            }
        }, {
            xtype: 'combo',
            id: 'equip',
            name: 'equip',
            store: equipNameStore,
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

    var selectPanel = Ext.create('Ext.grid.Panel', {
        id: 'selectPanel',
        store: equipMoveApplyStore,
        title: '设备移装申请',
        columnLines: true,
        frame: true,
        style: {
            border: 0
        },
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns: [{
            text: '序号',
            xtype: "rownumberer",
            width: '100px'
        }, {
            text: 'ID',
            dataIndex: 'I_PLANID',
            style: 'text-align: center;',
            flex: 1,
            hidden: true
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
            text: '原矿场',
            dataIndex: 'V_ORGNAME',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '原作业区',
            dataIndex: 'V_DEPTNAME',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '原使用地点',
            dataIndex: 'V_SITE',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '接收矿场',
            flex: 1,
            dataIndex: 'V_NEWORGNAME',
            style: 'text-align: center;',
        }, {
            text: '接收作业区',
            dataIndex: 'V_NEWDEPTNAME',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '新使用地点',
            dataIndex: 'V_NEWADD',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '新安装位置',
            dataIndex: 'V_NEWSITE',
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
            store: equipMoveApplyStore,
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
            items: [selectPanel]
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
    _selectOperation();
    Ext.getCmp('DEPT_CODE_').setValue(Ext.util.Cookies.get('v_deptcode'));
    _selectEquipType();
    _selectEquipName();
    Ext.getCmp('V_V_STATUS').select(Ext.data.StoreManager.lookup('statusStore').first());
    _select();//查询加载主表数据
    Ext.getBody().unmask();

}

function _select() {
    var equipMoveApplyStore = Ext.data.StoreManager.lookup('equipMoveApplyStore');
    equipMoveApplyStore.proxy.extraParams = {
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
    equipMoveApplyStore.load();
}


function _selectOperation() {
    let operationStore = Ext.data.StoreManager.lookup('operationStore');
    operationStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODE: Ext.getCmp('FTY_CODE_').getValue(),
        V_V_DEPTCODENEXT: '%',
        V_V_DEPTTYPE: '主体作业区'
    };
    operationStore.load();
}


function _Draft() {
    returnValue = null;
    win = Ext.create('Ext.window.Window', {
        title: '设备转移起草',
        modal: true,
        autoShow: true,
        maximized: false,
        maximizable: true,
        width: 560,
        height: 420,
        html: '<iframe src=' + AppUrl + 'page/specEquip/SE001001/index.html?P_ID=' + "" + ' style="width: 100%; height: 100%;" frameborder="0"/ >',
        listeners: {
            close: function (panel, eOpts) {
                var resp = returnValue;
                if (returnValue != null) {
                    _select();
                    if (resp.V_INFO == '保存成功！') {
                        Ext.Msg.alert('提示', resp.V_INFO);
                    }
                }
            }
        }
    });
}

function _update() {
    var records = Ext.getCmp('selectPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.Msg.alert('提示', '请选择一条数据');
        return;
    }
    returnValue = null;
    win = Ext.create('Ext.window.Window', {
        title: '设备转移修改',
        modal: true,
        autoShow: true,
        maximized: false,
        maximizable: true,
        width: 560,
        height: 420,
        html: '<iframe src=' + AppUrl + 'page/specEquip/SE001002/index.html?P_ID=' + records[0].get('I_PLANID') + ' style="width: 100%; height: 100%;" frameborder="0"/ >',
        listeners: {
            close: function (panel, eOpts) {
                if (returnValue != null) {
                    var EquipMove = returnValue.EquipMove[0];
                    var resp = returnValue.V_INFO;
                    records[0].set("V_EQUTYPENAME", EquipMove.V_EQUTYPENAME);
                    records[0].set("V_EQUNAME", EquipMove.V_EQUNAME);
                    records[0].set("V_ORGNAME", EquipMove.V_ORGNAME);
                    records[0].set("V_DEPTNAME", EquipMove.V_DEPTNAME);
                    records[0].set("V_SITE", EquipMove.V_SITE);
                    records[0].set("V_NEWORGNAME", EquipMove.V_NEWORGNAME);
                    records[0].set("V_NEWDEPTNAME", EquipMove.V_NEWDEPTNAME);
                    records[0].set("V_NEWADD", EquipMove.V_NEWADD);
                    records[0].set("V_NEWSITE", EquipMove.V_NEWSITE);
                    records[0].set("V_STATUS", EquipMove.V_STATUS);
                    if (resp == '保存成功！') {
                        Ext.Msg.alert('提示', '修改成功');
                    }
                }
            }
        }
    });
}

function _delete() {
    var records = Ext.getCmp('selectPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.Msg.alert('提示', '请选择一条数据！！！！');
        return;
    }

    Ext.MessageBox.show({
        title: '请确认',
        msg: '删除',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESTION,
        fn: function (btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    url: AppUrl + 'specEquip/deleteEquipMove',
                    async: false,
                    params: {
                        'I_I_ID': records[0].get('I_PLANID')
                    },
                    callback: function (options, success, response) {
                        if (success) {
                            var data = Ext.decode(response.responseText);
                            if (data.data.V_INFO == '删除成功！') {
                                Ext.MessageBox.alert('删除成功', data.data.V_INFO);
                                Ext.data.StoreManager.lookup('equipMoveApplyStore').remove(records[0]);//前台删除被删除数据
                            } else {
                                Ext.MessageBox.alert('删除失败', data.data.V_INFO);
                            }
                        } else {
                            Ext.MessageBox.alert('删除失败', '删除失败');
                        }
                    }
                });
            }
        }
    });
}

function _Submission() {
    Ext.MessageBox.alert("提示", "此功能正在努力开发中...");
}

function _selectEquipType() {
    let equipTypeStore = Ext.data.StoreManager.lookup('equipTypeStore');
    equipTypeStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODENEXT: Ext.getCmp('DEPT_CODE_').getValue()
    };
    equipTypeStore.load();
}

function _selectEquipName() {
    let equipNameStore = Ext.data.StoreManager.lookup('equipNameStore');
    equipNameStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODENEXT: Ext.getCmp('DEPT_CODE_').getValue(),
        V_V_EQUTYPECODE: Ext.getCmp('equipType').getValue()
    };
    equipNameStore.load();
}

