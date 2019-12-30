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
//处理store异步
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

Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');

    //厂矿store
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
                Ext.getCmp('FTY_CODE_').setValue(Ext.util.Cookies.get('v_orgCode'));
                _init();//自动加载时必须调用
            }
        }
    });

    //作业区store
    var deptStore = Ext.create('Ext.data.Store', {
        storeId: 'deptStore',
        autoLoad: false,
        loading: false,
        pageSize: -1,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax",{
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
                Ext.getCmp('DEPT_CODE_').setValue(Ext.util.Cookies.get('v_deptcode'));
            }
        }
    });

    //设备类型store
    var equipTypeStore = Ext.create('Ext.data.Store', {
        storeId: 'equipTypeStore',
        autoLoad: false,
        loading: false,
        pageSize: -1,
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax",{
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

    //设备名称store
    var equipStore = Ext.create('Ext.data.Store', {
        storeId: 'equipStore',
        autoLoad: false,
        loading: false,
        pageSize: -1,
        fields: ['V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_EQUSITENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax",{
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

    //审批状态store
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

    //报废设备store
    var equScrapStore = Ext.create('Ext.data.Store', {
        storeId: 'equScrapStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['I_PLANID', 'V_ORGNAME', 'V_ORGCODE', 'V_DEPTNAME', 'V_DEPTCODE', 'V_EQUTYPENAME', 'V_EQUTYPECODE', 'V_EQUNAME', 'V_EQUNCODE', 'V_SCRAPREASON', 'V_STATUS'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax",{
            url: AppUrl + 'specEquip/selectEquScrap',
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
        })

    });

    //按钮button
    var buttonPanel = Ext.create('Ext.Panel', {
        id: 'buttonPanel',
        defaults: {
            style: 'margin: 2px;'
        },
        items: [{
            xtype: 'button',
            text: '查询',
            handler: _selectEquScrap
        },{
            xtype : 'button',
            text : '起草',
            handler : _preInsertEquScrap
        },{
            xtype : 'button',
            text : '修改',
            handler : _preUpdateEquScrap
        },{
            xtype : 'button',
            text : '删除',
            handler : _deleteEquScrap
        },{
            xtype : 'button',
            text : '提交',
            handler : _Submission
        }]
    });

    //选框panel
    var formPanel = Ext.create('Ext.form.Panel', {
        id: 'formPanel',
        layout: 'column',
        frame: true,
        autoScroll: true,
        style: {
            border : 0
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
            store: ftyStore,
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            editable: false,//只能选已有的选项,不能编辑
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
            xtype : 'combo',
            id: 'equip',
            store: equipStore,
            queryMode: 'local',
            valueField: 'V_EQUCODE',
            displayField: 'V_EQUNAME',
            editable: false,
            forceSelection: true,
            fieldLabel : '设备名称'
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

    //表格panel
    var equScrapPanel = Ext.create('Ext.grid.Panel', {
        id: 'equScrapPanel',
        store: equScrapStore,
        columnLines: true,
        frame: true,
        style: {
            border : 0
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
            text: 'ID',
            dataIndex: 'I_PLANID',
            style: 'text-align: center;',
            flex: 1,
            hidden: true
        }, {
            text: '厂矿',
            dataIndex: 'V_ORGNAME',
            style: 'text-align: center;',
            flex: 1
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
            text: '报废原因',
            dataIndex: 'V_SCRAPREASON',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '状态',
            dataIndex: 'V_STATUS',
            style: 'text-align: center;',
            flex: 1
        }],
        viewConfig: {
            emptyText: '<div style="text-align: center; padding-top: 50px; font: italic bold 20px Microsoft YaHei;">没有数据</div>',
            enableTextSelection: true
        },
        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: equScrapStore,
            dock: 'bottom',
            displayInfo: true
        }]
    });

    //页面布局
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
            items: [equScrapPanel]
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
    _selectEquScrap();//查询加载主表数据

    Ext.getBody().unmask();

}

//查询主表
function _selectEquScrap() {
    var equScrapStore = Ext.data.StoreManager.lookup('equScrapStore');
    equScrapStore.proxy.extraParams = {
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
    equScrapStore.currentPage = 1;
    equScrapStore.load();
}

function _selectDept(){
    var deptStore = Ext.data.StoreManager.lookup('deptStore');
    deptStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODE: Ext.getCmp('FTY_CODE_').getValue(),
        V_V_DEPTCODENEXT: '%',
        V_V_DEPTTYPE: '主体作业区'

    };
    deptStore.load();
}

function _selectEquipType(){
    var equipTypeStore = Ext.data.StoreManager.lookup('equipTypeStore');
    equipTypeStore.proxy.extraParams = {
        V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODENEXT : Ext.getCmp('DEPT_CODE_').getValue()
    };
    equipTypeStore.load();
}

function  _selectEquip(){
    var equipStore = Ext.data.StoreManager.lookup('equipStore');
    equipStore.proxy.extraParams = {
        V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODENEXT : Ext.getCmp('DEPT_CODE_').getValue(),
        V_V_EQUTYPECODE : Ext.getCmp('equipType').getValue()
    };
    equipStore.load();
}

//起草
function _preInsertEquScrap() {
    returnValue = null;
    win = Ext.create('Ext.window.Window', {
        title: '设备报废申请起草',
        modal: true,
        autoShow: true,
        maximized: false,
        maximizable: true,
        width: 560,
        height: 420,
        html: '<iframe src=' + AppUrl + 'page/specEquip/SE001201/index.html?P_ID=' + "" + ' style="width: 100%; height: 100%;" frameborder="0"/ >',
        listeners: {
            close: function (panel, eOpts) {
                var resp = returnValue;
                if (returnValue == 'success' || resp.V_INFO == '保存成功！') {
                    Ext.Msg.alert('提示', '保存成功');
                    _selectEquScrap();

                }
            }
        }
    });
}

//修改
function _preUpdateEquScrap() {
    var records = Ext.getCmp('equScrapPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.Msg.alert('提示', '请选择一条数据');
        return;
    }
    returnValue = null;
    win = Ext.create('Ext.window.Window', {
        title: '设备报废申请修改',
        modal: true,
        autoShow: true,
        maximized: false,
        maximizable: true,
        width: 560,
        height: 420,
        html: '<iframe src=' + AppUrl + 'page/specEquip/SE001202/index.html?P_ID=' + records[0].get('I_PLANID') + ' style="width: 100%; height: 100%;" frameborder="0"/ >',
        listeners: {
            close: function (panel, eOpts) {
                if (returnValue != null || resp == '保存成功！') {
                    var resp = returnValue.V_INFO;
                    var equScrap = returnValue;
                    for ( var key in equScrap) {//前台更新被修改数据
                        records[0].set(key, equScrap[key]);
                        Ext.Msg.alert('提示', '修改成功');
                    }
                }
            }
        }
    });
}

//删除
function _deleteEquScrap() {
    var records = Ext.getCmp('equScrapPanel').getSelectionModel().getSelection();

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
                    url: AppUrl + 'specEquip/deleteEquipScrap',
                    async: false,
                    params: {
                        'I_I_ID': records[0].get('I_PLANID')
                    },
                    callback: function (options, success, response) {
                        if (success) {
                            var data = Ext.decode(response.responseText);
                            if (data.data.V_INFO == '删除成功！') {
                                Ext.MessageBox.alert('删除成功', data.data.V_INFO);
                                Ext.data.StoreManager.lookup('equScrapStore').remove(records[0]);//前台删除被删除数据
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

//提交
function _Submission() {
    Ext.MessageBox.alert("提示", "此功能正在努力开发中...");
}
