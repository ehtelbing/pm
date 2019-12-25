var columnList = [];
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

    let archivesStore = Ext.create('Ext.data.Store', {
        storeId: 'archivesStore',
        autoLoad: false,
        loading: false,
        pageSize: 11,
        fields: ['I_PLANID', 'V_ORGNAME', 'V_ORGCODE', 'V_DEPTNAME', 'V_DEPTCODE', 'V_EQUTYPENAME', 'V_EQUTYPECODE', 'V_EQUNAME', 'V_EQUNCODE', 'V_CHECKTIME', 'V_CHECKPART', 'V_CHECKDEPT', 'V_COST', 'V_OVERREASON', 'V_STATUS', 'V_STATE'],
        proxy: {
            url: AppUrl + 'specEquip/selectArchives',
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
            handler: _selectArchives
        }, {
            xtype: 'button',
            text: '导出EXCEL',
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
        }]
    });

    var archivesPanel = Ext.create('Ext.grid.Panel', {
        id: 'archivesPanel',
        store: archivesStore,
        columnLines: true,
        title: '档案',
        frame: true,
        style: {
            border: 0
        },
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: columnList,
        viewConfig: {
            emptyText: '<div style="text-align: center; padding-top: 50px; font: italic bold 20px Microsoft YaHei;">没有数据</div>',
            enableTextSelection: true
        },
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            store: archivesStore,
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
            items: [archivesPanel]
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

    _selectArchives();//查询加载主表数据
    Ext.getBody().unmask();

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
    var archivesStore = Ext.data.StoreManager.lookup('archivesStore');
    archivesStore.proxy.extraParams = {
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
    archivesStore.currentPage = 1;
    archivesStore.load();
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
        for (let i = 0; i < fieldsList.length; i++) {
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
                    style: 'text-align: center;',
                    align: 'center',
                    flex: 1
                })
            }


        }
    }

    var model = Ext.getCmp('archivesPanel').store.model;
    model.setFields(fieldsList, null, null);
    Ext.getCmp('archivesPanel').reconfigure(Ext.getCmp('archivesPanel').store, columnList);
}


function _excelArchives() {

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
        width : 900,
        height : document.documentElement.clientHeight * 0.8,
        html: '<iframe src=' + AppUrl + value + ' style="width: 100%; height: 100%;" frameborder="0"/ >',
        listeners: {
            close: function (panel, eOpts) {
                console.log(returnValue);
            }
        }
    });
}


