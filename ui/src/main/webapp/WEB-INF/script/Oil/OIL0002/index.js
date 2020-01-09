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

var equipType = {
    V_EQUTYPENAME: '设备类型'
};

var V_EQUTYPECODE;
var V_EQUTYPENAME;
var V_GGXH;
var V_GUID;

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

    //设备类型树图store
    var equipTypeStore = Ext.create('Ext.data.TreeStore', {
        storeId: 'equipTypeStore',
        autoLoad: false,
        loading: false,
        root: {},//保证autoload有效，自动加载或者不自动加载
        pageSize: 20,
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
            type: 'ajax',
            async: false,//false=同步
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

    //设备型号及润滑标准store
    var standardInfoEquTypeStore = Ext.create('Ext.data.Store', { //grid数据的store
        storeId: 'standardInfoEquTypeStore',
        autoLoad: false,
        loading: false,
        fields: ['V_GGXH', 'V_BZ_NAME', 'V_GUID'],
        proxy: {
            url: AppUrl + 'oil/selectStandardInfoEquType',
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

    //润滑标准历史store
    var standardInfoHisStore = Ext.create('Ext.data.Store', { //grid数据的store
        storeId: 'standardInfoHisStore',
        autoLoad: false,
        loading: false,
        fields: ['V_BZ_NAME', 'V_OPTIME'],
        proxy: {
            url: AppUrl + 'oil/selectStandardInfoHis',
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

    //当前设备store
    var standardInfoGetStore = Ext.create('Ext.data.Store', { //grid数据的store
        storeId: 'standardInfoGetStore',
        autoLoad: false,
        loading: false,
        pageSize: 10,
        fields: ['I_ID', 'V_GUID', 'V_SOURCE', 'V_LOC_CODE', 'V_LOC_NAME', 'V_PARTNAME', 'V_OIL_COUNT', 'V_OIL_SIGN', 'V_OIL_TYPE', 'V_OIL_ZQMS', 'V_OIL_ZQUNIT', 'V_OIL_PD', 'V_OIL_WAY', 'V_OIL_NUM', 'V_OIL_SEASON', 'V_ISSTOP'],
        proxy: {
            url: AppUrl + 'oil/selectStardArdInfoGet',
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
                    }
                }
            }
        }]
    });

    //设备型号及润滑标准的按钮
    var stardArdInfoEquTypeButtonPanel = Ext.create('Ext.Panel', {
        id: 'stardArdInfoEquTypeButtonPanel',
        defaults: {
            style: 'margin: 2px;'
        },
        items: [{
            xtype: 'button',
            text: '刷新',
            handler: _refresh
        }, {
            xtype: 'button',
            text: '新增规格与设备匹配',
            handler: insertStardArdInfoEquType
        }]
    });

    //设备类型树图panel
    var equipTypeTreePanel = Ext.create('Ext.tree.Panel', {
        id: 'equipTypeTreePanel',
        store: equipTypeStore,
        title: '设备类型',
        rootVisible: true,
        hideHeaders: true,
        rowLines: false,
        columnLines: false,
        frame: true,
        animate: !Ext.isIE,
        height: 400,
        autoscroll: true,
        bodyStyle: 'overflow-x:hidden;overflow-y:scroll',
        columns: [{
            xtype: 'treecolumn',
            dataIndex: 'V_EQUTYPENAME',
            style: 'text-align: center;',
            flex: 1
        }, {
            dataIndex: 'V_EQUTYPECODE',
            style: 'text-align: center;',
            flex: 1,
            hidden: true
        }],
        viewConfig: {
            emptyText: '<div style="text-align: center; padding-top: 50px; font: italic bold 20px Microsoft YaHei;">没有数据</div>',
            enableTextSelection: true
        },
        listeners: {
            'itemclick': function (view, record, item, index, e, eOpts) {
                V_EQUTYPECODE = record.data.V_EQUTYPECODE;
                V_EQUTYPENAME = record.data.V_EQUTYPENAME;
                _selectStardArdInfoEqutype(V_EQUTYPECODE);
            }
        }
    });

    //设备型号及润滑标准的panel
    var stardArdInfoEquTypePanel = Ext.create('Ext.grid.Panel', {
        id: 'stardArdInfoEquTypePanel',
        store: standardInfoEquTypeStore,
        title: '设备型号及润滑标准',
        columnLines: true,
        autoscroll: true,
        frame: true,
        height: 400,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns: [{
            text: '序号',
            xtype: "rownumberer",
            width: '100px'
        }, {
            text: '规格型号',
            dataIndex: 'V_GGXH',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '润滑标准',
            dataIndex: 'V_BZ_NAME',
            style: 'text-align: center;',
            flex: 1
        }, {
            dataIndex: 'V_GUID',
            style: 'text-align: center;',
            flex: 1,
            hidden: true
        }],
        listeners: {
            itemclick: function (panel, record, item, index, e, eOpts) {
                V_GGXH = record.data.V_GGXH;
                V_GUID = record.data.V_GUID;
                selectStandardInfo(V_GGXH);
            }
        },
        viewConfig: {
            emptyText: '<div style="text-align: center; padding-top: 50px; font: italic bold 20px Microsoft YaHei;">没有数据</div>',
            enableTextSelection: true
        }
    });

    //润滑标准历史的panel
    var standardInfoHisPanel = Ext.create('Ext.grid.Panel', {
        id: 'standardInfoHisPanel',
        store: standardInfoHisStore,
        title: '润滑标准历史',
        columnLines: true,
        height: 400,
        autoscroll: true,
        frame: true,
        columns: [{
            text: '序号',
            xtype: "rownumberer",
            width: '100px'
        }, {
            text: '润滑标准',
            dataIndex: 'V_BZ_NAME',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '更新时间',
            dataIndex: 'V_OPTIME',
            format: 'Y-m-d',
            style: 'text-align: center;',
            flex: 1
        }],
        viewConfig: {
            emptyText: '<div style="text-align: center; padding-top: 50px; font: italic bold 20px Microsoft YaHei;">没有数据</div>',
            enableTextSelection: true
        }
    });

    //当前设备panel
    var standardInfoGetPanel = Ext.create('Ext.grid.Panel', {
        id: 'standardInfoGetPanel',
        store: standardInfoGetStore,
        title: '<span>当前设备：</span><span id="currentDevice"></span>',
        columnLines: true,
        autoscroll: true,
        height: 440,
        frame: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        selType: 'rowmodel',
        columns: [{
            text: '序号',
            xtype: "rownumberer",
            width: '100px'
        }, {
            text: 'I_ID',
            dataIndex: 'I_ID',
            style: 'text-align: center;',
            flex: 1,
            hidden: true
        }, {
            text: 'V_GUID',
            dataIndex: 'V_GUID',
            style: 'text-align: center;',
            flex: 1,
            hidden: true
        }, {
            text: '数据来源',
            dataIndex: 'V_SOURCE',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '润滑部位编号',
            dataIndex: 'V_LOC_CODE',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '给油脂位置',
            dataIndex: 'V_LOC_NAME',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '部件名称',
            dataIndex: 'V_PARTNAME',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '润滑点数',
            dataIndex: 'V_OIL_COUNT',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '设计要求使用润滑油脂牌号',
            dataIndex: 'V_OIL_SIGN',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '加油方式',
            dataIndex: 'V_OIL_TYPE',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '周期模式',
            dataIndex: 'V_OIL_ZQMS',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '周期单位',
            dataIndex: 'V_OIL_ZQUNIT',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '标准周期',
            dataIndex: 'V_OIL_PD',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '用油方式',
            dataIndex: 'V_OIL_WAY',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '用油量(KG)',
            dataIndex: 'V_OIL_NUM',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '季节',
            dataIndex: 'V_OIL_SEASON',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '油脂牌号',
            dataIndex: 'V_OIL_SIGN',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '标准状态',
            dataIndex: 'V_ISSTOP',
            style: 'text-align: center;',
            flex: 1
        }],
        viewConfig: {
            emptyText: '<div style="text-align: center; padding-top: 50px; font: italic bold 20px Microsoft YaHei;">没有数据</div>',
            enableTextSelection: true
        },
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            store: standardInfoGetStore,
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
        }]
    });

    //当前设备的按钮
    var standardInfoGetButtonPanel = Ext.create('Ext.Panel', {
        id: 'standardInfoGetButtonPanel',
        defaults: {
            style: 'margin: 2px;'
        },
        items: [{
            xtype: 'button',
            text: '新增',
            handler: _insert
        }, {
            xtype: 'button',
            text: '修改',
            handler: _update
        }, {
            xtype: 'button',
            text: '删除',
            handler: _delete
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
            items: [formPanel, stardArdInfoEquTypeButtonPanel]
        }, {
            region: 'west',
            width: '20%',
            items: [equipTypeTreePanel]
        }, {
            region: 'center',
            width: '40%',
            items: [stardArdInfoEquTypePanel]
        }, {
            region: 'east',
            width: '40%',
            items: [standardInfoHisPanel]
        }, {
            region: 'south',
            height: '51%',
            items: [standardInfoGetButtonPanel, standardInfoGetPanel]
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

    var equipTypeStore = Ext.data.StoreManager.lookup('equipTypeStore');//设置树的根节点
    equipTypeStore.setRootNode(equipType);
    equipTypeStore.getRootNode().expand();

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

//点击树
function _selectStardArdInfoEqutype(V_EQUTYPECODE) {
    var standardInfoEquTypeStore = Ext.data.StoreManager.lookup('standardInfoEquTypeStore');
    standardInfoEquTypeStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_ORGCODE: Ext.getCmp('FTY_CODE_').getValue(),
        V_V_DEPTCODE: Ext.getCmp('DEPT_CODE_').getValue(),
        V_V_EQUTYPECODE: V_EQUTYPECODE
    };
    standardInfoEquTypeStore.load();
}

//点击新增规格与设备匹配的 按钮
function insertStardArdInfoEquType() {
    returnValue = null;
    win = Ext.create('Ext.window.Window', {
        title: '设备规格与设备关联设置',
        modal: true,
        autoShow: true,
        maximized: false,
        maximizable: true,
        width: 1200,
        height: 700,
        html: '<iframe src=' + AppUrl + 'page/Oil/OIL000201/index.html' + ' style="width: 100%; height: 100%;" frameborder="0"/ >',
    });
}

//点击设备型号及润滑标准的  行
function selectStandardInfo(V_GGXH) {
    selectStandardInfoHis(V_GGXH);
    selectStandardInfoGet(V_GGXH);
    $('#currentDevice').html(V_EQUTYPENAME + '/' + V_GGXH);
}

//查询润滑标准历史
function selectStandardInfoHis(V_GGXH) {
    var standardInfoHisStore = Ext.data.StoreManager.lookup('standardInfoHisStore');
    standardInfoHisStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_ORGCODE: Ext.getCmp('FTY_CODE_').getValue(),
        V_V_DEPTCODE: Ext.getCmp('DEPT_CODE_').getValue(),
        V_V_EQUTYPECODE: V_EQUTYPECODE,
        V_V_GGXH: V_GGXH
    };
    standardInfoHisStore.load();
}

//查询当前设备
function selectStandardInfoGet(V_GGXH) {
    var standardInfoGetStore = Ext.data.StoreManager.lookup('standardInfoGetStore');
    standardInfoGetStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_ORGCODE: Ext.getCmp('FTY_CODE_').getValue(),
        V_V_DEPTCODE: Ext.getCmp('DEPT_CODE_').getValue(),
        V_V_EQUTYPECODE: V_EQUTYPECODE,
        V_V_GGXH: V_GGXH
    };
    standardInfoGetStore.load();
}

//点击刷新
function _refresh() {
    if (V_EQUTYPECODE != undefined || V_EQUTYPECODE != null || V_EQUTYPECODE != "") {
        _selectStardArdInfoEqutype(V_EQUTYPECODE);
    }
}

//点击新增
function _insert() {
    var records = Ext.getCmp('stardArdInfoEquTypePanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.alert('警告', '请选择设备型号及润滑标准的数据', Ext.MessageBox.WARNING);
        return;
    }
    returnValue = null;
    win = Ext.create('Ext.window.Window', {
        title: '润滑部位',
        modal: true,
        autoShow: true,
        maximized: false,
        maximizable: true,
        width: 560,
        height: 450,
        html: '<iframe src=' + AppUrl + 'page/Oil/OIL000202/index.html?P_ID=' + "" + '&P_GID=' + V_GUID + ' style="width: 100%; height: 100%;" frameborder="0"/ >',
        listeners: {
            close: function (panel, eOpts) {
                if (returnValue != null) {
                    selectStandardInfoGet(V_GGXH);
                    console.log(returnValue);
                    Ext.MessageBox.alert('提示', returnValue.data.V_INFO);
                }
            }
        }
    });
}

//点击修改
function _update() {
    var records = Ext.getCmp('standardInfoGetPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.alert('警告', '请选择一条当前设备的数据', Ext.MessageBox.WARNING);
        return;
    }
    if (records[0].get("V_SOURCE") == "主数据") {
        Ext.MessageBox.alert('警告', '该数据为主数据下达，不能修改！', Ext.MessageBox.WARNING);
        return;
    }

    returnValue = null;
    win = Ext.create('Ext.window.Window', {
        title: '润滑部位',
        modal: true,
        autoShow: true,
        maximized: false,
        maximizable: true,
        width: 560,
        height: 450,
        html: '<iframe src=' + AppUrl + 'page/Oil/OIL000202/index.html?P_ID=' + records[0].get("I_ID") + '&P_GID=' + records[0].get("V_GUID") + ' style="width: 100%; height: 100%;" frameborder="0"/ >',
        listeners: {
            close: function (panel, eOpts) {
                if (returnValue != null) {
                    var oilStandardInfo = returnValue.oilStandardInfo.list[0];
                    for (var key in oilStandardInfo) {//前台更新被修改数据
                        records[0].set(key, oilStandardInfo[key]);
                    }

                    Ext.MessageBox.alert('提示', returnValue.data.V_INFO);
                }
            }
        }
    });
}

//点击删除
function _delete() {
    var records = Ext.getCmp('standardInfoGetPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.alert('警告', '请选择一条当前设备的数据', Ext.MessageBox.WARNING);
        return;
    }

    Ext.MessageBox.show({
        title: '请确认',
        msg: '删除标准后，该标准下的油脂用油信息也将删除！',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESTION,
        fn: function (btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    url: AppUrl + 'oil/deleteAttachmentType',
                    async: false,
                    params: {
                        'V_V_GUID': records[0].get('V_GUID')
                    },
                    callback: function (options, success, response) {
                        if (success) {
                            var data = Ext.decode(response.responseText);
                            if (data.data.V_INFO == '删除成功！') {
                                Ext.MessageBox.alert('提示', '删除成功！');
                                //selectStandardInfoGet(V_GGXH);
                            } else {
                                Ext.MessageBox.alert('错误', data.message, Ext.MessageBox.ERROR);
                            }
                        } else {
                            Ext.MessageBox.alert('错误', '服务器错误', Ext.MessageBox.ERROR);
                        }
                    }
                });
            }
        }
    });
}
