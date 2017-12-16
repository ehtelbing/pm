var orgStoreLoad = false;
var deptStoreLoad = false;
var supplyStoreLoad = false;
var A_PLANTCODE = '';
var A_DEPARTCODE = '';
var A_BEGINDATE = '';
var A_ENDDATE = '';
var A_MAT_DESC = '';
var A_SUPPLY_CODE = '';
var sh = window.screen.height / 2 - 10;
var sw = window.screen.width / 2 + 220;

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
    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
    //厂矿
    var orgStore = Ext.create('Ext.data.Store', {
        id: 'orgStore',
        autoLoad: true,
        fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_V_EQUCODE', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'zdh/plant_sel',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                IS_V_DEPTCODE: "",
                IS_V_DEPTTYPE: '[基层单位]'
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

    //单位名称（作业区）
    var deptStore = Ext.create('Ext.data.Store', {
        id: 'deptStore',
        autoLoad: false,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'zdh/plant_sel',
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

    //供应商
    var supplyStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'supplyStore',
        fields: ['SUPPLY_CODE', 'SUPPLY_NAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/GETOILSUPPLYLIST',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'A_COUNTRY_CODE': "%",
                'A_PROVINCE_CODE': "%",
                'A_CITY_CODE': "%",
                'A_SUPPLY_CODE': "%",
                'A_SUPPLY_NAME': "%"
            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('A_SUPPLY_CODE').select(store.first());
                supplyStoreLoad = true;
                _init();
            }
        }

    });

    //润滑用使用统计
    var oilUseStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        pageSize: 100,
        storeId: 'oilUseStore',
        fields: ['INST_EQUIP_CODE', 'INST_EQUIP_NAME', 'SUPPLIER_NAME', 'PLANTNAME', 'DEPARTNAME', 'OIL_MAT_NO',
            'OIL_MAT_DESC', 'OIL_UNIT', 'OIL_PRICE', 'OIL_AMOUNT', 'OIL_MONEY', 'OUT_DATE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/GET_SUPPLYOILUSE_TABLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            },
            extraParams: {}
        }

    });

    var supplyOilGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'supplyOilGridPanel',
        store: oilUseStore,
        width: '50%',
        region: 'sourth',
        border: false,
        columnLines: true,
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '设备名称',
            dataIndex: 'INST_EQUIP_NAME',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '供应商',
            dataIndex: 'SUPPLIER_NAME',
            align: 'center',
            width: 180,
            renderer: atleft
        }, {
            text: '厂矿',
            dataIndex: 'PLANTNAME',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '部门',
            dataIndex: 'DEPARTNAME',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '物料号',
            dataIndex: 'OIL_MAT_NO',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '物料名称',
            dataIndex: 'OIL_MAT_DESC',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '计量单位',
            dataIndex: 'OIL_UNIT',
            align: 'center',
            width: 80,
            renderer: atright
        }, {
            text: '单价',
            dataIndex: 'OIL_PRICE',
            align: 'center',
            renderer: atright,
            width: 80
        }, {
            text: '消耗数量',
            dataIndex: 'OIL_AMOUNT',
            align: 'center',
            width: 80,
            renderer: atright
        }, {
            text: '金额',
            dataIndex: 'OIL_MONEY',
            align: 'center',
            width: 80,
            renderer: atright
        }, {
            text: '消耗时间',
            dataIndex: 'OUT_DATE',
            align: 'center',
            width: 120,
            renderer: atleft
        }],
        bbar: [{
            id: 'gpage',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: oilUseStore
        }]
    });

    var northpanel = Ext.create('Ext.form.Panel', {
        id: 'northpanel',
        region: 'fit',
        width: '100%',
        frame: true,
        layout: 'vbox',
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'combo',
                id: 'V_V_ORGCODE',
                store: orgStore,
                fieldLabel: '厂矿名称',
                style: ' margin: 5px 0px 5px 0px',
                labelWidth: 70,
                width: 220,
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
                fieldLabel: '单位名称',
                style: ' margin: 5px 0px 5px 0px',
                labelWidth: 70,
                width: 220,
                labelAlign: 'right',
                editable: false,
                queryMode: 'local',
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE'
            }, {
                xtype: 'combo',
                id: 'A_SUPPLY_CODE',
                store: supplyStore,
                fieldLabel: '选择供应商',
                style: ' margin: 5px 0px 5px 0px',
                labelWidth: 70,
                width: 220,
                labelAlign: 'right',
                editable: false,
                queryMode: 'local',
                displayField: 'SUPPLY_NAME',
                valueField: 'SUPPLY_CODE'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'A_BEGINDATE',
                xtype: 'datefield',
                editable: false,
                format: 'Y/m/d',
                submitFormat: 'Y-m-d',
                labelAlign: 'right',
                value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                fieldLabel: '起始日期',
                labelWidth: 70,
                width: 220,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                id: 'A_ENDDATE',
                xtype: 'datefield',
                editable: false,
                format: 'Y/m/d',
                submitFormat: 'Y-m-d',
                value: Ext.util.Format.date(new Date(new Date(new Date().getUTCFullYear(), new Date().getMonth() + 1, 1) - 86400000), "Y-m-d"),
                fieldLabel: '结束日期',
                labelWidth: 70,
                width: 220,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'A_MAT_DESC',
                store: oilUseStore,
                fieldLabel: '油品名称',
                style: ' margin: 5px 0px 5px 0px',
                labelWidth: 70,
                width: 220,
                labelAlign: 'right',
                editable: false,
                queryMode: 'local'
            }, {
                xtype: 'button',
                text: '查询',
                style: ' margin: 5px 0px 5px 10px',
                icon: imgpath + '/search.png',
                handler: _select
            }, {
                xtype: 'button',
                text: '导出Excel',
                handler: _exportExcel,
                style: ' margin: 5px 5px 5px 5px',
                icon: imgpath + '/311.gif'
            }]
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
        items: [{
            region: 'north',
            border: false,
            items: [northpanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [supplyOilGridPanel]
        }]

    });
})

function _init() {
    if (orgStoreLoad && deptStoreLoad && supplyStoreLoad) {

        Ext.getBody().unmask();//去除页面笼罩
    }
}

function _selectDept() {
    var deptStore = Ext.data.StoreManager.lookup('deptStore');
    deptStore.proxy.extraParams = {
        IS_V_DEPTCODE: Ext.getCmp('V_V_ORGCODE').getValue(),
        IS_V_DEPTTYPE: '[主体作业区]'
    };
    deptStore.load();
};

function _select() {
    A_PLANTCODE = Ext.getCmp('V_V_ORGCODE').getValue();
    A_DEPARTCODE = Ext.getCmp('V_V_DEPTCODE').getValue();
    A_BEGINDATE = Ext.getCmp('A_BEGINDATE').getSubmitValue();
    A_ENDDATE = Ext.getCmp('A_ENDDATE').getSubmitValue();
    A_MAT_DESC = Ext.getCmp('A_MAT_DESC').getValue();
    A_SUPPLY_CODE = Ext.getCmp('A_SUPPLY_CODE').getValue();

    var oilUseStore = Ext.data.StoreManager.lookup('oilUseStore');
    oilUseStore.proxy.extraParams = {
        A_PLANTCODE: A_PLANTCODE,
        A_DEPARTCODE: A_DEPARTCODE,
        A_BEGINDATE: A_BEGINDATE,
        A_ENDDATE: A_ENDDATE,
        A_MAT_DESC: A_MAT_DESC,
        A_SUPPLY_CODE: A_SUPPLY_CODE
    };
    oilUseStore.load();
};

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
};

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
};

function _exportExcel() {
    document.location.href = AppUrl + 'ml/GET_SUPPLYOILUSE_TABLE_EXCEL?A_PLANTCODE=' +
    A_PLANTCODE + '&A_DEPARTCODE=' + A_DEPARTCODE + '&A_BEGINDATE=' + A_BEGINDATE + '&A_ENDDATE=' + A_ENDDATE +
    '&A_MAT_DESC=' + encodeURI(encodeURI(A_MAT_DESC)) + '&A_SUPPLY_CODE=' + encodeURI(encodeURI(A_SUPPLY_CODE));
}

