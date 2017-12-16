/**
 * Created by LL on 2017/11/29.
 */
var V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_DEPTCODE = Ext.util.Cookies.get('v_orgCode');

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
    for (var i = 2014; i <= new Date().getFullYear()+1; i++) {
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


    //厂矿
    var ckstore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'ckstore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_12/PRO_BASE_DEPT_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'IS_V_DEPTCODE': '',
                'IS_V_DEPTTYPE': '[基层单位]'
            }
        },
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
            url: AppUrl + 'PM_12/PRO_BASE_DEPT_VIEW',
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

    var gridStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        pageSize:20,
        storeId: 'gridStore',
        fields: ['V_YEAR','V_EQUIP_NAME', 'V_ORGNAME', 'V_DEPTNAME', 'THIS_YEAR_COST','LAST_YEAR_COST','COST_MARGIN'],
        proxy: {
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            url: AppUrl + 'YS/YS_CHART_PROJECT_EQU_SEL',
            reader: {
                type: 'json',
                root: 'list',
                total:'total'
            },
            extraParams: {}
        }
    });

    var gridPanel = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel',
        columnLines: true,
        width: '100%',
        store: gridStore,
        selType: 'rowmodel',
        autoScroll: true,
        forceFit: true,
        columns: [
            {
                xtype: 'rownumberer',
                width: 30,
                sortable: false
            },{
                text: '年度',
                dataIndex: 'V_YEAR',
                align: 'center',
                width: 120,
                renderer: left
            },
            {
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
            },{
                text: '设备名称',
                dataIndex: 'V_EQUIP_NAME',
                align: 'center',
                width: 180,
                renderer: left
            }, {
                text: '本年度维修总费用(元)',
                dataIndex: 'THIS_YEAR_COST',
                align: 'center',
                width: 120,
                renderer: right
            }, {
                text: '上一年度维修总费用(元)',
                dataIndex: 'LAST_YEAR_COST',
                align: 'center',
                width: 160,
                renderer: right
            },
            {
                text: '同比差异(超+降-)(元)',
                dataIndex: 'COST_MARGIN',
                align: 'center',
                width: 120,
                renderer: rendValueColor
            }
        ],
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

    var buttonPanel = Ext.create('Ext.Panel', {
        border: false,
        frame: true,
        layout: 'vbox',
        region: 'north',
        width: '100%',
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'combo',
                id: 'year',
                store: 'yearStore',
                fieldLabel: '年 份',
                labelAlign: 'right',
                editable: false,
                labelWidth: 90,
                width: 210,
                value: new Date().getFullYear(),
                queryMode: 'local',
                style: ' margin: 5px 0px 5px 13px',
                displayField: 'name',
                valueField: 'code'
            },  {
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
                style: ' margin: 5px 0px 5px 10px',
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
            }, {
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
                style: ' margin: 5px 0px 5px 5px',
                listeners: {
                    change: function (store, newValue, oldValue, eOpts) {
                        if (oldValue == '' || oldValue == null) {
                            Ext.data.StoreManager.lookup('ssblxstore').load();
                        } else {
                            Ext.data.StoreManager.lookup('ssblxstore').load();
                        }
                    }
                }
            }]
        }, {
            xtype: 'panel',
            region: 'center',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'sblx',
                xtype: 'combo',
                store: ssblxstore,
                editable: false,
                fieldLabel: '设备类型',
                labelWidth: 80,
                width: 200,
                labelAlign: 'right',
                displayField: 'V_EQUTYPENAME',
                valueField: 'V_EQUTYPECODE',
                queryMode: 'local',
                baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 5px 23px',
                listeners: {
                    change: function (store, newValue, oldValue, eOpts) {
                        if (oldValue == '' || oldValue == null) {
                            Ext.data.StoreManager.lookup('ssbmcstore').load();
                        } else {
                            Ext.data.StoreManager.lookup('ssbmcstore').load();
                        }
                    }
                }
            }, {
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
                labelAlign: 'right',
                style: ' margin: 5px 0px 5px 12px'
            }, {
                xtype: 'button',
                text: '查询',
                align: 'center',
                handler: _seek,
                width: 80,
                style: ' margin: 5px 0px 5px 45px',
                icon: imgpath + '/search.png'
            }
            ]
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
            items: [buttonPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [gridPanel]
        }]
    });

});

function _seek() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        'V_V_YEAR': Ext.getCmp('year').getValue(),
        'V_V_ORGCODE': Ext.getCmp('ck').getValue(),
        'V_V_DEPTCDE': Ext.getCmp('zyq').getValue(),
        'V_EQUTYPE_CODE': Ext.getCmp('sblx').getValue(),
        'V_EQU_CODE': Ext.getCmp('sbmc').getValue()

    };
    gridStore.load();
}

function zyqload(store) {
    store.proxy.extraParams = {
        'IS_V_DEPTCODE': Ext.getCmp('ck').getValue(),
        'IS_V_DEPTTYPE': '[主体作业区]'
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
function left(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}
function right(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return Ext.util.Format.number(value, '0.00');

}
function rendValueColor(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    if (value <= 0) {
        return '<a style="color:green">' +  Ext.util.Format.number(value, '0.00') + '</a>'
    } else {
        return '<a style="color:red" >' +  Ext.util.Format.number(value, '0.00') + '</a>'
    }
}