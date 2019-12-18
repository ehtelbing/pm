var win;//父窗口对象，由子窗口调用
var returnValue;//父窗口对象，由子窗口调用

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
                V_V_DEPTCODE: Ext.util.Cookies.get('v_deptcode'),
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

    let verPlanStore = Ext.create('Ext.data.Store', {
        storeId: 'verPlanStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['ASSET_ID_', 'ASSET_CODE_', 'ASSET_NAME_', 'ASSET_TYPE_', 'SUB_ASSET_TYPE_', 'PURCHASE_DATE_', 'PRICE_', 'MEMO_', 'ORDER_', 'STATUS_'],
        proxy: {
            url: 'selectAsset.do',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'assetList',
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
            handler: _selectVerPlan
        }]
    });

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
            emptyText: '全部',
            forceSelection: true,
            fieldLabel: '厂矿',
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        _selectDept()
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
            emptyText: '全部',
            forceSelection: true,
            fieldLabel: '作业区',
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        _selectEquipType()
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
            emptyText: '全部',
            forceSelection: true,
            fieldLabel: '设备类型'
        }, {
            xtype : 'textfield',
            name : 'ASSET_NAME_',
            fieldLabel : '设备名称'
        } ]
    });

    var verPlanPanel = Ext.create('Ext.grid.Panel', {
        id: 'verPlanPanel',
        store: verPlanStore,
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
            dataIndex: 'ASSET_CODE_',
            style: 'text-align: center;',
            flex: 1
        }],
        viewConfig: {
            emptyText: '<div style="text-align: center; padding-top: 50px; font: italic bold 20px Microsoft YaHei;">没有数据</div>',
            enableTextSelection: true
        },
        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: verPlanStore,
            dock: 'bottom',
            displayInfo: true
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
            items: [verPlanPanel]
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

    _selectDept();

    _selectEquipType();

    _selectVerPlan();//查询加载主表数据

    Ext.getBody().unmask();

}

function _selectVerPlan() {
    //alert('加载完毕');
}

function _selectDept(){
    let deptStore = Ext.data.StoreManager.lookup('deptStore');
    deptStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODE: Ext.getCmp('FTY_CODE_').getValue(),
        V_V_DEPTCODENEXT: '%',
        V_V_DEPTTYPE: '主体作业区'

    };
    deptStore.load();
}

function _selectEquipType(){
    let equipTypeStore = Ext.data.StoreManager.lookup('equipTypeStore');
    equipTypeStore.proxy.extraParams = {
        V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODENEXT : Ext.getCmp('DEPT_CODE_').getValue()
    };
    equipTypeStore.load();
}


function _select() {

}

function _loadExcel() {

}

function _resetOperationAreaStore(V_DEPTCODE) {
    var assetTypeStore = Ext.data.StoreManager.lookup('assetTypeStore');
    var subAssetTypeStore = Ext.data.StoreManager.lookup('subAssetTypeStore');
    subAssetTypeStore.removeAll();
    if (PARENT_ASSET_TYPE_ID_ != '') {//按父属性过滤
        assetTypeStore.filter('PARENT_ASSET_TYPE_ID_', new RegExp('^' + PARENT_ASSET_TYPE_ID_ + '$'));
        subAssetTypeStore.add(assetTypeStore.getRange());
        assetTypeStore.clearFilter();
    }
}

function _resetEquipmentTypeStore(V_DEPTCODE) {

}

function _resetEquipmentNameStore(V_DEPTCODE) {

}



