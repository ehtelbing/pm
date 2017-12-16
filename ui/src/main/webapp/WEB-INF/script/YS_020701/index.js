/**
 * Created by LL on 2017/11/16.
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
        pageSize: 20,
        autoLoad: false,
        storeId: 'gridStore',
        fields: ['V_CHARGE_ID', 'V_ORDERGUID_UP', 'ORDERID_UP', 'V_ORDERGUID', 'ORDERID', 'V_ORGNAME', 'V_DEPTNAME', 'V_EQUIP_NAME', 'V_FUNC_LOC',
            'V_CHARGE_P_MAT', 'V_CHARGE_A_MAT', 'V_CHARGE_PER', 'V_CHARGE_TOOL', 'V_TOTAL_P_CHARGE', 'V_TOTAL_A_CHARGE', 'V_STATE_BILL','REPAIRNAME'],
        proxy: {
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            url: AppUrl + 'YS/YS_CHARGE_WORKORDER_DAY_SEL',
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
            }, {
                text: '结算单号',
                dataIndex: 'V_CHARGE_ID',
                align: 'left',
                width: 120,
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return '<a href=javascript:dealWith(\'</a><a href="#" onclick="selectBill(\'' + record.data.V_CHARGE_ID + '\')">' + value + '</a>';
                }
            }, {
                text: '结算状态',
                dataIndex: 'V_STATE_BILL',
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
                text: '检修单位',
                dataIndex: 'REPAIRNAME',
                align: 'center',
                width: 180,
                renderer: left
            }, {
                text: '检修设备',
                dataIndex: 'V_EQUIP_NAME',
                align: 'center',
                width: 120,
                renderer: left
            }, {
                text: '功能位置',
                dataIndex: 'V_FUNC_LOC',
                align: 'center',
                width: 160,
                renderer: left
            },
            {
                text: '物料费(元)',
                columns: [{
                    text: '计划成本',
                    dataIndex: 'V_CHARGE_P_MAT',
                    align: 'center',
                    width: 120,
                    renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                        return '<a href=javascript:dealWith(\'</a><a href="#" onclick="selectMat(\'' + record.data.V_CHARGE_ID + '\')">' + Ext.util.Format.number(value, '0.00') + '</a>';
                    }
                }, {
                    text: '实际成本',
                    dataIndex: 'V_CHARGE_A_MAT',
                    align: 'center',
                    width: 120,
                    renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                        return '<a href=javascript:dealWith(\'</a><a href="#" onclick="selectMat(\'' + record.data.V_CHARGE_ID + '\')">' + Ext.util.Format.number(value, '0.00') + '</a>';
                    }
                }]
            }, {
                text: '人工费(元)',
                dataIndex: 'V_CHARGE_PER',
                align: 'center',
                width: 120,
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return '<a href=javascript:dealWith(\'</a><a href="#" onclick="selectPer(\'' + record.data.V_CHARGE_ID + '\')">' + Ext.util.Format.number(value, '0.00') + '</a>';
                }
            }, {
                text: '机具费(元)',
                dataIndex: 'V_CHARGE_TOOL',
                summaryType: 'sum',
                align: 'center',
                width: 120,
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return '<a href=javascript:dealWith(\'</a><a href="#" onclick="selectTool(\'' + record.data.V_CHARGE_ID + '\')">' + Ext.util.Format.number(value, '0.00') + '</a>';
                }
            }, {
                text: '总金额(元)',
                columns: [{
                    text: '计划',
                    dataIndex: 'V_TOTAL_P_CHARGE',
                    align: 'center',
                    width: 120,
                    renderer: rights
                }, {
                    text: '实际',
                    dataIndex: 'V_TOTAL_A_CHARGE',
                    align: 'center',
                    width: 120,
                    renderer: rights
                }]
            }
        ],
        dockedItems: [
            {
                xtype: 'panel',
                frame: true,
                layout: 'vbox',
                defaults: {
                    style: 'margin:10px 0px 0px 5px'
                },
                items: [{
                    xtype: 'panel',
                    region: 'north',
                    layout: 'column',
                    baseCls: 'my-panel-no-border',
                    items: [{
                        id: 'begintime',
                        xtype: 'datefield',
                        width: 220,
                        fieldLabel: '开始日期',
                        labelAlign: 'right',
                        value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                        format: 'Y/m/d',
                        editable: false
                    }, {
                        id: 'endtime',
                        xtype: 'datefield',
                        width: 220,
                        fieldLabel: '结束日期至',
                        labelAlign: 'right',
                        value: new Date(),
                        format: 'Y/m/d',
                        editable: false
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
                        style: 'margin:0px 0px 15px 20px',
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
                            labelAlign: 'right',
                            style: 'margin:0px 0px 15px 5px'
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
                            xtype: 'combo',
                            id: "stateBill",
                            labelAlign: 'right',
                            store: [['%', '全部'], ['未确认', '未确认'], ['已确认', '已确认'], ['已结算', '已结算']],
                            editable: false,
                            queryMode: 'local',
                            fieldLabel: '结算状态',
                            width: 216,
                            labelWidth: 80,
                            style: 'margin:0px 0px 15px 0px'
                        }, {
                            xtype: 'button',
                            text: '查询',
                            icon: imgpath + '/search.png',
                            style: 'margin:0px 0px 15px 35px',
                            handler: _queryGrid
                        }
                    ]
                },{
                    xtype: 'panel',
                    region: 'south',
                    layout: 'column',
                    baseCls: 'my-panel-no-border',
                    items: [ {
                        xtype: 'displayfield',
                        id: 'SUM_P_MAT',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '物料计划(元)',
                        labelWidth: 90,
                        width: 200,
                        value: '0.0',
                        labelAlign: 'right',
                        style: 'margin:-10px 0px 0px 30px',
                        renderer: rights
                    },{
                        xtype: 'displayfield',
                        id: 'SUM_A_MAT',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '物料实际(元)',
                        labelWidth: 90,
                        width: 200,
                        value: '0.0',
                        labelAlign: 'right',
                        style: 'margin:-10px 0px 0px 8px',
                        renderer: rights
                    }, {
                        xtype: 'displayfield',
                        id: 'SUM_PER',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '人工(元)',
                        value: '0.0',
                        labelWidth: 90,
                        width: 150,
                        labelAlign: 'right',
                        style: 'margin:-10px 0px 0px 3px',
                        renderer: rights
                    }, {
                        xtype: 'displayfield',
                        id: 'SUM_TOOL',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '机具(元)',
                        value: '0.0',
                        labelWidth: 90,
                        width: 150,
                        labelAlign: 'right',
                        style: 'margin:-10px 0px  0px 55px',
                        renderer: rights
                    }]
                }, {
                    xtype: 'panel',
                    region: 'south',
                    layout: 'column',
                    baseCls: 'my-panel-no-border',
                    items: [ {
                        xtype: 'displayfield',
                        id: 'SUM_TOTAL_P_CHARGE',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '计划总合计(元)',
                        value: '0.0',
                        labelWidth: 90,
                        width: 150,
                        labelAlign: 'right',
                        style: 'margin:0px 0px 0px 42px',
                        renderer: rights
                    }, {
                        xtype: 'displayfield',
                        id: 'SUM_TOTAL_A_CHARGE',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '实际总合计(元)',
                        value: '0.0',
                        labelWidth: 90,
                        width: 150,
                        labelAlign: 'right',
                        style: 'margin:0px 0px 0px 57px',
                        renderer: rights
                    }]
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

    Ext.getCmp('stateBill').select('%');

});
function _queryGrid(){
    _seek();
    _querySum();
}
function _seek() {
    var proxy = Ext.data.StoreManager.lookup('gridStore').getProxy();
    proxy.extraParams.V_D_ENTER_DATE_B = Ext.getCmp('begintime').getSubmitValue();
    proxy.extraParams.V_D_ENTER_DATE_E = Ext.getCmp('endtime').getSubmitValue();
    proxy.extraParams.V_V_ORGCODE = Ext.getCmp('ck').getValue();
    proxy.extraParams.V_V_DEPTCODE = Ext.getCmp('zyq').getValue();
    proxy.extraParams.V_EQUTYPE_CODE = Ext.getCmp('sblx').getValue();
    proxy.extraParams.V_EQU_CODE = Ext.getCmp('sbmc').getValue();
    proxy.extraParams.V_DJ_PERCODE = Ext.getCmp('djy').getValue();
    proxy.extraParams.V_V_STATE_BILL = Ext.getCmp('stateBill').getValue();
    Ext.data.StoreManager.lookup('gridStore').currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore').load();
}
function _querySum(){
    Ext.Ajax.request({
        url: AppUrl + 'YS/YS_CHARGE_W_DAY_TOTAL_SEL',
        async: false,
        method: 'POST',
        params: {
            'V_D_ENTER_DATE_B':  Ext.getCmp('begintime').getSubmitValue(),
            'V_D_ENTER_DATE_E': Ext.getCmp('endtime').getSubmitValue(),
            'V_V_ORGCODE': Ext.getCmp('ck').getValue(),
            'V_V_DEPTCODE': Ext.getCmp('zyq').getValue(),
            'V_EQUTYPE_CODE': Ext.getCmp('sblx').getValue(),
            'V_EQU_CODE': Ext.getCmp('sbmc').getValue(),
            'V_DJ_PERCODE': Ext.getCmp('djy').getValue(),
            'V_V_STATE_BILL': Ext.getCmp('stateBill').getValue()
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);
            if (data.RET=="success") {
                Ext.getCmp('SUM_P_MAT').setValue(data.RET1);
                Ext.getCmp('SUM_A_MAT').setValue(data.RET2);
                Ext.getCmp('SUM_PER').setValue(data.RET3);
                Ext.getCmp('SUM_TOOL').setValue(data.RET4);
                Ext.getCmp('SUM_TOTAL_P_CHARGE').setValue(data.RET5);
                Ext.getCmp('SUM_TOTAL_A_CHARGE').setValue(data.RET6);
            }
        }
    });
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
function selectBill(chargeid) {
    window.open(AppUrl + "page/YS_020502/Index" + '.html?V_CHARGE_ID=' + chargeid, "", "dialogHeight:700px;dialogWidth:1100px");
}
function selectMat(chargeid) {
    window.open(AppUrl + "page/YS_020104/Index" + '.html?V_CHARGE_ID=' + chargeid, "", "dialogHeight:700px;dialogWidth:1100px");
}
function selectPer(chargeid) {
    window.open(AppUrl + "page/YS_020102/Index" + '.html?V_CHARGE_ID=' + chargeid, "", "dialogHeight:700px;dialogWidth:1100px");
}

function selectTool(chargeid) {
    window.open(AppUrl + "page/YS_020103/Index" + '.html?V_CHARGE_ID=' + chargeid, "", "dialogHeight:700px;dialogWidth:1100px");
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
