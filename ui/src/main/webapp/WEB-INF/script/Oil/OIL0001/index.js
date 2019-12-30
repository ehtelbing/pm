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

var tempButton =  [{ xtype: 'button', text: 'Button 1' }]
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

    var productLineStore = Ext.create('Ext.data.Store', {
        storeId: 'productLineStore',
        autoLoad: false,
        loading: false,
        pageSize: -1,
        fields: ['V_CXCODE', 'V_CXNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            url: AppUrl + 'oil/selectProductLine',
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
                store.insert(0, {
                    V_CXCODE : '%',
                    V_CXNAME : '--全部--'
                });
                Ext.getCmp('V_V_CXCODE').select(store.first());
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
            url: AppUrl + 'oil/selectEquipType',
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
                store.insert(0, {
                    V_EQUTYPECODE : '%',
                    V_EQUTYPENAME : '--全部--'
                });
                Ext.getCmp('equipType').select(store.first());
            }
        }
    });

    var standardInfoStore = Ext.create('Ext.data.Store', {
        storeId: 'standardInfoStore',
        autoLoad: false,
        loading: false,
        pageSize: 11,
        fields: ['V_GUID', 'V_OIL_ORDER', 'V_ORGNAME', 'V_ORGCODE', 'V_DEPTNAME', 'V_DEPTCODE', 'V_EQUTYPENAME', 'V_EQUTYPECODE', 'V_EQUCODE', 'V_EQUNAME', 'V_BZ_CODE', 'V_BZ_NAME', 'V_JSDX', 'V_GGXH', 'V_LOC_CODE', 'V_LOC_NAME', 'V_SOURCE'],
        proxy: {
            url: AppUrl + 'oil/selectStandardInfo',
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
            handler: _selectStandardInfo
        }, {
            xtype: 'button',
            text: '模板导入',
            handler: _excelArchives
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
                        _selectDept();
                        _selectProductLine();
                        _selectEquipType();
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
                        _selectProductLine();
                        _selectEquipType();
                    }
                }
            }
        }, {
            xtype: 'combo',
            id: 'V_V_CXCODE',
            name: 'V_V_CXCODE',
            store: productLineStore,
            queryMode: 'local',
            valueField: 'V_CXCODE',
            displayField: 'V_CXNAME',
            editable: false,
            forceSelection: true,
            fieldLabel: '产线',
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        _selectEquipType();
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
            fieldLabel: '设备类型'
        },
            {
                xtype: 'textfield',
                name: 'V_V_GGXH',
                fieldLabel: '设备规格'
            }]
    });

    var standardInfoPanel = Ext.create('Ext.grid.Panel', {
        id: 'standardInfoPanel',
        store: standardInfoStore,
        columnLines: true,
        title: '<span>润滑标准</span><button class="titleButton" type="button">新增</button><button class="titleButton" type="button">修改</button><button class="titleButton" type="button">删除</button>',
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
            text: '厂矿',
            dataIndex: 'V_ORGNAME',
            align : 'center',
            flex: 1
        }, {
            text: '作业区',
            dataIndex: 'V_DEPTNAME',
            align : 'center',
            flex: 1
        }, {
            text: '产线',
            dataIndex: 'V_CXNAME',
            align : 'center',
            flex: 1
        }, {
            text: '设备类型',
            dataIndex: 'V_EQUTYPENAME',
            align : 'center',
            flex: 1
        }, {
            text: '润滑标准编码',
            dataIndex: 'V_BZ_CODE',
            align : 'center',
            flex: 1
        }, {
            text: '润滑标准描述',
            dataIndex: 'V_BZ_NAME',
            align : 'center',
            flex: 1
        }, {
            text: '技术对象',
            dataIndex: 'V_JSDX',
            align : 'center',
            flex: 1
        }, {
            text: '设备规格型号',
            dataIndex: 'V_GGXH',
            align : 'center',
            flex: 1
        }, {
            text: '数据来源',
            dataIndex: 'V_SOURCE',
            align : 'center',
            flex: 1
        }],
        viewConfig: {
            emptyText: '<div style="text-align: center; padding-top: 50px; font: italic bold 20px Microsoft YaHei;">没有数据</div>',
            enableTextSelection: true
        },
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            store: standardInfoStore,
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
            items: [standardInfoPanel]
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
    _selectProductLine();
    Ext.getCmp('V_V_CXCODE').select(Ext.data.StoreManager.lookup('productLineStore').first());
    _selectEquipType();

    _selectStandardInfo();//查询加载主表数据
    Ext.getBody().unmask();

}

function _selectStandardInfo() {

}

function _selectProductLine() {
    var productLineStore = Ext.data.StoreManager.lookup('productLineStore');
    productLineStore.proxy.extraParams = {
        V_V_ORGCODE: Ext.getCmp('FTY_CODE_').getValue(),
        V_V_DEPTCODE: Ext.getCmp('DEPT_CODE_').getValue(),
        V_V_CXNAME: '%'
    };
    productLineStore.load();
}


function _selectArchives() {
    Ext.Ajax.request({
        url: AppUrl + 'specEquip/selectArchives',
        async: false,
        params: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODE: Ext.getCmp('FTY_CODE_').getValue(),
            V_V_DEPTCODENEXT: Ext.getCmp('DEPT_CODE_').getValue(),
            V_V_EQUTYPECODE: Ext.getCmp('equipType').getValue(),
            V_V_EQUTYPENAME: Ext.getCmp('equipType').getRawValue(),
            //测试用传电梯
            //V_V_EQUTYPENAME: '电梯',
            V_V_EQUCODE: Ext.getCmp('equip').getValue(),
            V_V_OPTYPE: 'EDIT',
            page: 1,
            limit: 9999999
        },
        callback: function (options, success, response) {
            if (success) {
                var data = Ext.decode(response.responseText);
                var fieldsList = data.columnList;
                _replaceColumnTitle(fieldsList);
                _selectArchivesDate();
            } else {
                Ext.MessageBox.alert('错误', '系统错误', Ext.MessageBox.ERROR);
            }
        }
    });
}

function _selectArchivesDate() {
    var standardInfoStore = Ext.data.StoreManager.lookup('standardInfoStore');
    standardInfoStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODE: Ext.getCmp('FTY_CODE_').getValue(),
        V_V_DEPTCODENEXT: Ext.getCmp('DEPT_CODE_').getValue(),
        V_V_EQUTYPECODE: Ext.getCmp('equipType').getValue(),
        V_V_EQUTYPENAME: Ext.getCmp('equipType').getRawValue(),
        //测试用传电梯
        //V_V_EQUTYPENAME: '电梯',
        V_V_EQUCODE: Ext.getCmp('equip').getValue(),
        V_V_OPTYPE: 'EDIT',
    };
    standardInfoStore.currentPage = 1;
    standardInfoStore.load();
}

function _replaceColumnTitle(fieldsList) {
    columnList = [];
    if (fieldsList.length > 0) {
        columnList.push({
            text: '序号',
            xtype: "rownumberer",
            align: 'center',
            width: '50px'
        });
        for (var i = 0; i < fieldsList.length; i++) {
            if (fieldsList[i] == '档案附件') {
                console.log('档案附件');
                columnList.push({
                    text: fieldsList[i],
                    dataIndex: fieldsList[i],
                    align: 'center',
                    width: '120',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return '<a href=javascript:_manageArchives(\'' + record.data.档案附件 + '\')>' + '管理附件' + '</a>';
                        //return '档案附件';
                    }
                })
            } else {
                columnList.push({
                    text: fieldsList[i],
                    dataIndex: fieldsList[i],
                    align : 'center',
                    align: 'center',
                    flex: 1
                })
            }


        }
    }

    var model = Ext.getCmp('standardInfoPanel').store.model;
    model.setFields(fieldsList, null, null);
    Ext.getCmp('standardInfoPanel').reconfigure(Ext.getCmp('standardInfoPanel').store, columnList);
}


function _excelArchives() {

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
        V_V_ORGCODE  :Ext.getCmp('FTY_CODE_').getValue(),
        V_V_DEPTCODE :Ext.getCmp('DEPT_CODE_').getValue(),
        V_V_CXCODE :Ext.getCmp('V_V_CXCODE').getValue()
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

function _excelArchives() {
    document.location.href = AppUrl + 'specEquip/excelArchives?V_V_PERSONCODE=' + Ext.util.Cookies.get('v_personcode') + '&V_V_DEPTCODE=' + Ext.getCmp('FTY_CODE_').getValue() + '&V_V_DEPTCODENEXT=' + encodeURI(encodeURI(Ext.getCmp('DEPT_CODE_').getValue())) + '&V_V_EQUTYPECODE=' + encodeURI(encodeURI(Ext.getCmp('equipType').getValue())) + '&V_V_EQUTYPENAME=' + Ext.getCmp('equipType').getRawValue() + '&V_V_EQUCODE=' + encodeURI(encodeURI(Ext.getCmp('equip').getValue())) + '&V_V_OPTYPE=EDIT&page=1&limit=9999999999';
}

function _manageArchives(value) {
    console.log(value);
    returnValue = null;
    win = Ext.create('Ext.window.Window', {
        title: '管理附件',
        modal: true,
        autoShow: true,
        maximized: false,
        maximizable: true,
        width: 900,
        height: document.documentElement.clientHeight * 0.8,
        html: '<iframe src=' + AppUrl + value + ' style="width: 100%; height: 100%;" frameborder="0"/ >',
        listeners: {
            close: function (panel, eOpts) {
                console.log(returnValue);
            }
        }
    });
}


