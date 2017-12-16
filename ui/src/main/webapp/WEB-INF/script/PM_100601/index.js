var orgStoreLoad = false;
var deptStoreLoad = false;
var sbTypeStoreLoad = false;
var sbNameStroeLoad = false;
var gysStoreLoad = false;

var A_PLANTCODE = '';
var A_DEPARTCODE = '';
var A_EQUTYPE = '';
var A_EQUIP_ID = '';
var A_EQUIP_NAME = '';
var A_BEGINDATE = '';
var A_ENDDATE = '';
var A_MAT_NO = '';
var A_MAT_DESC = '';

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
    //部门名称
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
    //设备类型
    var sbTypeStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'sbTypeStore',
        fields: ['TYPE_CODE', 'TYPE_DESC'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'ml/GETEQUTYPELIST_ABLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        },
        listeners: {
            load: function (store, records) {
                //alert('aaa');
                store.insert(0, {
                    'TYPE_CODE': '%',
                    'TYPE_DESC': '全部'
                });
                Ext.getBody().unmask();
                Ext.getCmp('TYPE_CODE').select(store.first());
                sbTypeStoreLoad = true;
            }
        }
    });


//设备名称
    var sbNameStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'sbNameStore',
        fields: ['INST_EQUIP_ID', 'INST_EQUIP_NAME', 'EQUIP_NO', 'EQUIP_DESC', 'TYPE_CODE', 'TYPE_DESC', 'PLANTCODE',
            'PLANTNAME', 'DEPARTNAME', 'INST_EQUIP_REMARK', 'INST_EQUIP_STATUS'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/GETINSTEQULIST',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        },
        listeners: {
            load: function (store, records) {
                store.insert(0, {
                    'INST_EQUIP_ID': '%',
                    'INST_EQUIP_NAME': '全部'
                });
                // Ext.getBody().unmask();
                Ext.getCmp('INST_EQUIP_NAME').select(store.first());
                sbNameStroeLoad = true;
                _init();
            }
        }
    });

//主机设备润滑油脂使用情况表
    var rhyzStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        pageSize: 100,
        storeId: 'rhyzStore',
        fields: ['INST_EQUIP_CODE', 'INST_EQUIP_NAME', 'PLANTNAME', 'DEPARTNAME', 'OIL_MAT_NO',
            'OIL_MAT_DESC', 'OIL_UNIT', 'OIL_PRICE', 'OIL_AMOUNT', 'OIL_MONEY', 'OUT_DATE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/GET_EQUOILCONSUME_TABLE',
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

    var jsStandardGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'jsStandardGridPanel',
        store: rhyzStore,
        // title:'主机设备润滑油脂使用情况表',
        // align: 'center',
        width: '50%',
        region: 'sourth',
        border: false,
        columnLines: true,
        /*        selModel: {
         selType: 'checkboxmodel',
         mode: 'SINGLE'
         },*/
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '设备编码',
            dataIndex: 'INST_EQUIP_CODE',
            align: 'center',
            width: 150,
            renderer: atleft
        }, {
            text: '设备名称',
            dataIndex: 'INST_EQUIP_NAME',
            align: 'center',
            width: 130,
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
            store: rhyzStore
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
                fieldLabel: '部门名称',
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
                id: 'TYPE_CODE',
                store: sbTypeStore,
                fieldLabel: '设备类型',
                style: ' margin: 5px 0px 5px 0px',
                displayField: 'TYPE_DESC',
                valueField: 'TYPE_CODE',
                labelWidth: 70,
                width: 220,
                labelAlign: 'right',
                editable: false,
                queryMode: 'local',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectSbName();
                    }
                }
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
                id: 'INST_EQUIP_NAME',
                xtype: 'combo',
                store: sbNameStore,
                fieldLabel: '设备名称',
                editable: false,
                labelWidth: 70,
                width: 220,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right',
                displayField: 'INST_EQUIP_NAME',
                valueField: 'INST_EQUIP_ID',
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
            items: [jsStandardGridPanel]
        }]

    });
})

function _init() {
    if (orgStoreLoad && deptStoreLoad && sbTypeStoreLoad && sbNameStroeLoad) {

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
}

function _selectSbType() {
    var sbTypeStore = Ext.data.StoreManager.lookup('sbTypeStore');
    sbTypeStore.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT': Ext.getCmp('V_V_DEPTCODE').getValue()
    }
    sbTypeStore.load();
};

//获取设备名称
function _selectSbName() {
    var sbNameStore = Ext.data.StoreManager.lookup('sbNameStore');
    sbNameStore.proxy.extraParams = {
        'A_EQUTYPE': Ext.getCmp('TYPE_CODE').getValue(),
        'A_PLANTCODE': Ext.getCmp('V_V_ORGCODE').getValue(),
        'A_DEPARTCODE': Ext.getCmp('V_V_DEPTCODE').getValue(),
        'A_EQUIP_ID': A_EQUIP_ID,
        'A_EQUIP_NAME': A_EQUIP_NAME
    };
    sbNameStore.load();
}
function _select() {
    A_PLANTCODE = Ext.getCmp('V_V_ORGCODE').getValue();
    A_DEPARTCODE = Ext.getCmp('V_V_DEPTCODE').getValue();
    A_EQUTYPE = Ext.getCmp('TYPE_CODE').getValue();
    A_EQUIP_ID = Ext.getCmp('INST_EQUIP_NAME').getValue();
    A_BEGINDATE = Ext.getCmp('A_BEGINDATE').getSubmitValue();
    A_ENDDATE = Ext.getCmp('A_ENDDATE').getSubmitValue();
    A_MAT_NO = A_MAT_NO;
    A_MAT_DESC = A_MAT_DESC;

    var rhyzStore = Ext.data.StoreManager.lookup('rhyzStore');
    rhyzStore.proxy.extraParams = {
        A_PLANTCODE: A_PLANTCODE,
        A_DEPARTCODE: A_DEPARTCODE,
        A_EQUTYPE: A_EQUTYPE,
        A_EQUIP_ID: A_EQUIP_ID,
        A_BEGINDATE: A_BEGINDATE,
        A_ENDDATE: A_ENDDATE,
        A_MAT_NO: A_MAT_NO,
        A_MAT_DESC: A_MAT_DESC
    };
    rhyzStore.load();
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}

function _exportExcel() {
    document.location.href = AppUrl + 'ml/GET_EQUOILCONSUME_TABLE_Excel?A_PLANTCODE=' +
    A_PLANTCODE + '&A_DEPARTCODE=' + A_DEPARTCODE + '&A_EQUTYPE=' + encodeURI(encodeURI(A_EQUTYPE)) + '&A_EQUIP_ID=' + encodeURI(encodeURI(A_EQUIP_ID)) + '&A_BEGINDATE=' + A_BEGINDATE + '&A_ENDDATE=' + A_ENDDATE +
    '&A_MAT_NO=' + encodeURI(encodeURI(A_MAT_NO)) + '&A_MAT_DESC=' + encodeURI(encodeURI(A_MAT_DESC));
}
