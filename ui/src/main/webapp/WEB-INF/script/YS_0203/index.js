/**
 * Created by LL on 2017/11/7.
 */

var V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_DEPTCODE = Ext.util.Cookies.get('v_orgCode');
var V_DEPTCODENEXT = Ext.util.Cookies.get('v_deptcode');

Ext.define('Ext.ux.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    async: true,
    doRequest: function (operation, callback, scope) {
        var writer = this.getWriter(), request = this.buildRequest(operation);
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
    var yeararr = [];
    for (var i = 2014; i <= new Date().getFullYear() + 1; i++) {
        yeararr.push({
            "code": i,
            "name": i
        });
    }

    var yearStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'yearStore',
        data: yeararr,
        fields: ['code', 'name'],
        proxy: {
            type: 'memory',
            async: false,
            render: {
                type: 'json'
            }
        }
    });

    var montharr = [];
    for (var i = 1; i <= 12; i++) {
        if (i <= 9) {
            montharr.push({
                "code": "0" + i,
                "name": "0" + i
            });
        } else {
            montharr.push({
                "code": i,
                "name": i
            });
        }

    }

    var monthStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'monthStore',
        data: montharr,
        fields: ['code', 'name'],
        proxy: {
            type: 'memory',
            async: false,
            render: {
                type: 'json'
            }
        }
    });

    //厂矿
    var ckstore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'ckstore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'V_V_PERSONCODE': V_PERSONCODE,
                'V_V_DEPTCODE': V_DEPTCODE,
                'V_V_DEPTCODENEXT': V_DEPTCODENEXT,
                'V_V_DEPTTYPE': '基层单位'
            }
        }),
        listeners: {
            load: function (store) {
                Ext.getCmp('ck').select(store.first());
            }
        }
    });

    //作业区
    var zyqstore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'zyqstore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }),
        listeners: {
            load: function (store) {
                Ext.getCmp('zyq').select(store.first());
            },
            beforeload: zyqload
        }
    });

    //设备类型
    var ssblxstore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'ssblxstore',
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'WorkOrder/PRO_GET_DEPTEQUTYPE_ADMIN',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }),
        listeners: {
            load: function (store) {
                Ext.getCmp('sblx').select(store.first());
            },
            beforeload: ssblxload
        }
    });

    //设备名称
    var ssbmcstore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'ssbmcstore',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'WorkOrder/PRO_GET_DEPTEQU_ADMIN',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }),
        listeners: {
            load: function (store) {
                Ext.getCmp('sbmc').select(store.first());
            },
            beforeload: ssbmcload
        }
    });

    //点检员
    var sdjystore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'sdjystore',
        fields: ['V_PERSONCODE', 'V_PERSONNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'No4120/PRO_BASE_PERSON_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }),
        listeners: {
            load: function (store) {
                Ext.getCmp('djy').select(store.first());
            },
            beforeload: sdjyload
        }
    });


    var gridStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        pageSize: 20,
        storeId: 'gridStore',
        fields: ['V_ORDERID', 'V_ORDERGUID', 'V_YS_TIME', 'V_MATERIALCODE', 'V_MATERIALNAME', 'V_UNIT', 'F_UNITPRICE', 'I_PLANAMOUNT', 'F_PLANMONEY',
            'I_ACTUALAMOUNT', 'F_ACTUALMONEY', 'V_JJ_CODE', 'V_JJ_NAME', 'V_JJ_TS', 'V_JJ_DE', 'CARCOST', 'V_TS', 'V_DE', 'I_NUMBER_OF_PEOPLE',
            'PERSONCOST', 'TOTALPLANCOST', 'TOTALACTUALCOST', 'V_ENTERED_BY', 'V_PERSONNAME', 'V_ORGCODE', 'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME', 'V_EQUIP_NO', 'V_EQUIP_NAME'],
        proxy: {
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            url: AppUrl + 'YS/ys_charge_workorder_month_sel',
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            },
            extraParams: {}
        }
    });

    var gridPanel = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel',
        features: {
            ftype: 'summary'
        },
        columnLines: true,
        width: '100%',
        store: gridStore,
        selType: 'rowmodel',
        autoScroll: true,
        columns: [
            {
                xtype: 'rownumberer',
                width: 30,
                sortable: false
            },
            {
                text: '工单号',
                dataIndex: 'V_ORDERID',
                align: 'center',
                width: 120,
                renderer: left,
                summaryType: 'sum',
                summaryRenderer: function (value) {
                    return '总计:';
                }
            },
            {
                text: '点检员',
                dataIndex: 'V_PERSONNAME',
                align: 'center',
                width: 120,
                renderer: left
            }, {
                text: '厂矿',
                dataIndex: 'V_ORGNAME',
                align: 'center',
                width: 120,
                renderer: left
            }, {
                text: '作业区',
                dataIndex: 'V_DEPTNAME',
                align: 'center',
                width: 120,
                renderer: left
            }, {
                text: '检修设备',
                dataIndex: 'V_EQUIP_NAME',
                align: 'center',
                width: 120,
                renderer: left
            },
            {
                text: '物料使用情况',
                columns: [{
                    text: '物料名称',
                    dataIndex: 'V_MATERIALNAME',
                    align: 'center',
                    width: 120,
                    renderer: left
                }, {
                    text: '计量单位',
                    dataIndex: 'V_UNIT',
                    align: 'center',
                    width: 120,
                    renderer: left
                }, {
                    text: '单价(元)',
                    dataIndex: 'F_UNITPRICE',
                    align: 'center',
                    width: 120,
                    renderer: right
                }, {
                    text: '计划数量',
                    dataIndex: 'I_PLANAMOUNT',
                    align: 'center',
                    width: 120,
                    renderer: right
                }, {
                    text: '物料计划成本(元)',
                    dataIndex: 'F_PLANMONEY',
                    summaryType: 'sum',
                    align: 'center',
                    width: 120,
                    renderer: rights
                }, {
                    text: '实际数量',
                    dataIndex: 'I_ACTUALAMOUNT',
                    align: 'center',
                    width: 120,
                    renderer: right
                }, {
                    text: '物料实际成本(元)',
                    dataIndex: 'F_ACTUALMONEY',
                    summaryType: 'sum',
                    align: 'center',
                    width: 120,
                    renderer: rights
                }]
            }, {
                text: '人工工时使用情况',
                columns: [{
                    text: '检修台时',
                    dataIndex: 'V_TS',
                    align: 'center',
                    width: 120,
                    renderer: right
                }, {
                    text: '检修定额(元)',
                    dataIndex: 'V_DE',
                    align: 'center',
                    width: 120,
                    renderer: right
                }, {
                    text: '检修人数',
                    dataIndex: 'I_NUMBER_OF_PEOPLE',
                    align: 'center',
                    width: 120,
                    renderer: right
                }, {
                    text: '检修人工成本(元)',
                    dataIndex: 'PERSONCOST',
                    summaryType: 'sum',
                    align: 'center',
                    width: 120,
                    renderer: rights
                }]
            }, {
                text: '机具使用情况',
                columns: [{
                    text: '车辆名称',
                    dataIndex: 'V_JJ_NAME',
                    align: 'center',
                    width: 120,
                    renderer: right
                }, {
                    text: '检修台时',
                    dataIndex: 'V_JJ_TS',
                    align: 'center',
                    width: 120,
                    renderer: right
                }, {
                    text: '车辆定额(元)',
                    dataIndex: 'V_JJ_DE',
                    align: 'center',
                    width: 120,
                    renderer: right
                }, {
                    text: '检修机具成本(元)',
                    dataIndex: 'CARCOST',
                    summaryType: 'sum',
                    align: 'center',
                    width: 120,
                    renderer: rights
                }]
            },
            {
                text: '工单结算计划成本小计(元)',
                dataIndex: 'TOTALPLANCOST',
                summaryType: 'sum',
                align: 'center',
                width: 180,
                renderer: rights
            },
            {
                text: '工单结算实际成本小计(元)',
                dataIndex: 'TOTALACTUALCOST',
                summaryType: 'sum',
                align: 'center',
                width: 180,
                renderer: rights
            }
        ],
        dockedItems: [
            {
                xtype: 'panel',
                frame: true,
                layout: 'column',
                defaults: {
                    style: 'margin:10px 0px 20px 5px'
                },
                items: [{
                    xtype: 'combo',
                    id: 'year',
                    store: 'yearStore',
                    fieldLabel: '年 份',
                    labelAlign: 'right',
                    editable: false,
                    labelWidth: 55,
                    width: 130,
                    value: new Date().getFullYear(),
                    queryMode: 'local',
                    style: ' margin:10px 0px 20px 20px',
                    displayField: 'name',
                    valueField: 'code'
                }, {
                    xtype: 'combo',
                    id: 'month',
                    store: 'monthStore',
                    fieldLabel: '月 份',
                    labelAlign: 'right',
                    editable: false,
                    labelWidth: 55,
                    width: 120,
                    value: new Date().getMonth() + 1,
                    queryMode: 'local',
                    style: ' margin:10px 0px 20px 20px',
                    displayField: 'name',
                    valueField: 'code'

                }, {
                    id: 'ck',
                    xtype: 'combo',
                    store: ckstore,
                    editable: false,
                    fieldLabel: '厂矿',
                    labelWidth: 80,
                    displayField: 'V_DEPTNAME',
                    valueField: 'V_DEPTCODE',
                    queryMode: 'local',
                    baseCls: 'margin-bottom',
                    labelAlign: 'right',
                    listeners: {
                        select: function (store, newValue, oldValue, eOpts) {
                            if (oldValue == '' || oldValue == null) {
                                Ext.data.StoreManager.lookup('zyqstore').load();
                            } else {
                                Ext.data.StoreManager.lookup('zyqstore').load();
                            }

                        }
                    }
                },
                    {
                        id: 'zyq',
                        xtype: 'combo',
                        store: zyqstore,
                        editable: false,
                        fieldLabel: '作业区',
                        labelWidth: 80,
                        displayField: 'V_DEPTNAME',
                        valueField: 'V_DEPTCODE',
                        queryMode: 'local',
                        baseCls: 'margin-bottom',
                        labelAlign: 'right',
                        listeners: {
                            change: function (store, newValue, oldValue, eOpts) {
                                if (oldValue == '' || oldValue == null) {
                                    Ext.data.StoreManager.lookup('ssblxstore').load();
                                } else {
                                    Ext.data.StoreManager.lookup('ssblxstore').load();
                                }
                            }
                        }
                    }, {
                        id: 'sblx',
                        xtype: 'combo',
                        store: ssblxstore,
                        editable: false,
                        fieldLabel: '设备类型',
                        labelWidth: 80,
                        labelAlign: 'right',
                        displayField: 'V_EQUTYPENAME',
                        valueField: 'V_EQUTYPECODE',
                        queryMode: 'local',
                        baseCls: 'margin-bottom',
                        listeners: {
                            change: function (store, newValue, oldValue, eOpts) {
                                if (oldValue == '' || oldValue == null) {
                                    Ext.data.StoreManager.lookup('ssbmcstore').load();
                                } else {
                                    Ext.data.StoreManager.lookup('ssbmcstore').load();
                                }
                            }
                        }
                    },
                    {
                        id: 'sbmc',
                        xtype: 'combo',
                        store: ssbmcstore,
                        editable: false,
                        fieldLabel: '设备名称',
                        labelWidth: 80,
                        displayField: 'V_EQUNAME',
                        valueField: 'V_EQUCODE',
                        queryMode: 'local',
                        baseCls: 'margin-bottom',
                        labelAlign: 'right'
                    },
                    {
                        id: 'djy',
                        xtype: 'combo',
                        store: sdjystore,
                        editable: false,
                        fieldLabel: '点检员',
                        labelWidth: 80,
                        displayField: 'V_PERSONNAME',
                        valueField: 'V_PERSONCODE',
                        queryMode: 'local',
                        baseCls: 'margin-bottom',
                        labelAlign: 'right'
                    }, {
                        xtype: 'button',
                        text: '检修结算单日统计',
                        icon: imgpath + '/search.png',
                        handler: _seek
                    }]
            }],
        bbar: ["->",
            {
                xtype: 'pagingtoolbar',
                store: gridStore,
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
        items: [{
            region: 'center',
            layout: 'fit',
            border: false,
            items: [gridPanel]
        }]
    });

});

function _seek() {
    var proxy = Ext.data.StoreManager.lookup('gridStore').getProxy();
    proxy.extraParams.V_D_ENTER_YEAR = Ext.getCmp('year').getValue();
    proxy.extraParams.V_D_ENTER_MONTH = Ext.getCmp('month').getValue();
    proxy.extraParams.V_V_ORGCODE = Ext.getCmp('ck').getValue();
    proxy.extraParams.V_V_DEPTCODE = Ext.getCmp('zyq').getValue();
    proxy.extraParams.V_EQUTYPE_CODE = Ext.getCmp('sblx').getValue();
    proxy.extraParams.V_EQU_CODE = Ext.getCmp('sbmc').getValue();
    proxy.extraParams.V_DJ_PERCODE = Ext.getCmp('djy').getValue();
    Ext.data.StoreManager.lookup('gridStore').load();
}
function zyqload(store) {
    store.proxy.extraParams = {
        'V_V_PERSONCODE': V_PERSONCODE,
        'V_V_DEPTCODE': Ext.getCmp("ck").getValue(),
        'V_V_DEPTCODENEXT': V_DEPTCODENEXT,
        'V_V_DEPTTYPE': '[主体作业区]'
    }
}
function ssblxload(store) {
    store.proxy.extraParams = {
        'V_V_DEPTCODENEXT': Ext.getCmp("zyq").getValue()
    }
}
function ssbmcload(store) {
    store.proxy.extraParams = {
        'V_V_DEPTCODENEXT': Ext.getCmp("zyq").getValue(),
        'V_V_EQUTYPECODE': Ext.getCmp("sblx").getValue()
    }
}
function sdjyload(store) {
    store.proxy.extraParams = {
        'V_V_DEPTCODE': Ext.getCmp("zyq").getValue(),
        'V_V_PERSONCODE': V_PERSONCODE,
        'V_V_ROLE': '01'
    }
}
function left(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}
function right(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}
function rights(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return Ext.util.Format.number(value, '0.00');

}
