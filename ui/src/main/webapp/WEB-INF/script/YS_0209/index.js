/**
 * Created by LL on 2017/11/17.
 */

var sid;
var ssid;
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

    var ckStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'ckStore',
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

    var gridStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        pageSize: 20,
        storeId: 'gridStore',
        fields: ['V_ORGCODE','V_ORGNAME','V_DEPTNAME','V_DEPTCODE', 'V_P_MAT', 'V_A_MAT', 'V_PER', 'V_TOOL', 'V_TOTAL_P_MAT', 'V_TOTAL_A_MAT'],
        proxy: {
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            url: AppUrl + 'YS/YS_CHARGE_WORKORDER_ORG_D_SEL',
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'

            },
            extraParams: {}
        }
    });

    var gridStore3 = Ext.create('Ext.data.Store', {
        autoLoad: false,
        pageSize: 20,
        storeId: 'gridStore3',
        fields: ['V_ORGCODE','V_ORGNAME','V_DEPTNAME','V_DEPTCODE', 'V_STATE_BILL', 'V_CHARGE_ID', 'V_EQUIP_NAME', 'V_FUNC_LOC', 'V_CHARGE_P_MAT', 'V_CHARGE_A_MAT',
            'V_CHARGE_PER','V_CHARGE_TOOL','V_TOTAL_P_CHARGE','V_TOTAL_A_CHARGE','REPAIRNAME'],
        proxy: {
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            url: AppUrl + 'YS/YS_CHARGE_WORKORDER_DETAIL_SEL',
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
        autoScroll: true,
        forceFit: true,
        columns: [
            {
                xtype: 'rownumberer',
                width: 35,
                sortable: false
            },
            {
                text: '厂矿',
                dataIndex: 'V_ORGNAME',
                align: 'left',
                width: 120
            }, {
                text: '作业区',
                dataIndex: 'V_DEPTNAME',
                align: 'left',
                width: 120,
                xtype: 'templatecolumn',
                tpl: '<a style="cursor:pointer;">{V_DEPTNAME}</a>',
                id: 'deptName'
            },
            {
                text: '物料费(元)',
                columns: [{
                    text: '计划成本',
                    dataIndex: 'V_P_MAT',
                    align: 'center',
                    width: 160,
                    renderer: rights
                }, {
                    text: '实际成本',
                    dataIndex: 'V_A_MAT',
                    align: 'center',
                    width: 160,
                    renderer: rights
                }]
            }, {
                text: '人工费(元)',
                dataIndex: 'V_PER',
                align: 'center',
                width: 120,
                renderer: rights
            }, {
                text: '机具费(元)',
                dataIndex: 'V_TOOL',
                align: 'center',
                width: 120,
                renderer: rights
            }, {
                text: '总金额(元)',
                columns: [{
                    text: '计划',
                    dataIndex: 'V_TOTAL_P_MAT',
                    align: 'center',
                    width: 160,
                    renderer: rights
                }, {
                    text: '实际',
                    dataIndex: 'V_TOTAL_A_MAT',
                    align: 'center',
                    width: 160,
                    renderer: rights
                }]
            }
        ],
        listeners: {
            itemclick: function (aa, record, item, index, e, eOpts) {
                sid = record.raw.V_ORGCODE;
                ssid = record.raw.V_DEPTCODE;
                Ext.getCmp('dialog').show();
                _querygrid3();

            }
        },
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
                        xtype: 'combo',
                        id: 'year',
                        store: 'yearStore',
                        fieldLabel: '年 份',
                        labelAlign: 'right',
                        editable: false,
                        labelWidth: 90,
                        width: 200,
                        value: new Date().getFullYear(),
                        queryMode: 'local',
                        style: ' margin:10px 0px 20px -8px',
                        displayField: 'name',
                        valueField: 'code'
                    }, {
                        xtype: 'combo',
                        id: 'month',
                        store: 'monthStore',
                        fieldLabel: '月 份',
                        labelAlign: 'right',
                        editable: false,
                        labelWidth: 90,
                        width: 200,
                        value: new Date().getMonth() + 1,
                        queryMode: 'local',
                        style: ' margin:10px 0px 20px 7px',
                        displayField: 'name',
                        valueField: 'code'

                    },{
                        xtype: 'combo',
                        id: "ck",
                        store: ckStore,
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '厂矿',
                        displayField: 'V_DEPTNAME',
                        valueField: 'V_DEPTCODE',
                        labelWidth: 55,
                        style: ' margin:10px 0px 20px 55px',
                        labelAlign: 'right'
                    }, {
                        xtype: 'button',
                        text: '查 询',
                        icon: imgpath + '/search.png',
                        style: ' margin:10px 0px 20px 5px',
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

    var gridPanel3 = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel3',
        columnLines: true,
        width: '100%',
        region: 'center',
        store: gridStore3,
        autoScroll: true,
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
                    items: [ {
                        xtype: 'displayfield',
                        id: 'SUM_P_MAT3',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '物料计划(元)',
                        labelWidth: 90,
                        width: 200,
                        value: '0.0',
                        labelAlign: 'right',
                        style: 'margin:10px 0px 0px 30px',
                        renderer: rights
                    },{
                        xtype: 'displayfield',
                        id: 'SUM_A_MAT3',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '物料实际(元)',
                        labelWidth: 90,
                        width: 200,
                        value: '0.0',
                        labelAlign: 'right',
                        style: 'margin:10px 0px 0px 8px',
                        renderer: rights
                    }, {
                        xtype: 'displayfield',
                        id: 'SUM_PER3',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '人工(元)',
                        value: '0.0',
                        labelWidth: 90,
                        width: 150,
                        labelAlign: 'right',
                        style: 'margin:10px 0px 0px 3px',
                        renderer: rights
                    }, {
                        xtype: 'displayfield',
                        id: 'SUM_TOOL3',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '机具(元)',
                        value: '0.0',
                        labelWidth: 90,
                        width: 150,
                        labelAlign: 'right',
                        style: 'margin:10px 0px  0px 55px',
                        renderer: rights
                    }]
                }, {
                    xtype: 'panel',
                    region: 'center',
                    layout: 'column',
                    baseCls: 'my-panel-no-border',
                    items: [ {
                        xtype: 'displayfield',
                        id: 'SUM_TOTAL_P_CHARGE3',
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
                        id: 'SUM_TOTAL_A_CHARGE3',
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
                store: gridStore3,
                dock: 'bottom',
                displayInfo: true,
                displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                emptyMsg: '没有记录'
            }]

    });

    var dialog = Ext.create('Ext.window.Window', {
        id: 'dialog',
        title: '<div align="center">作业区结算数据分析明细表</div>',
        width: 1200,
        height: 600,
        modal: true,
        plain: true,
        closable: true,
        closeAction: 'close',
        model: true,
        layout: 'border',
        frame: true,
        items: [{
            region: 'center',
            layout: 'fit',
            border: false,
            items: [gridPanel3]
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
function _queryGrid(){
    _seek();
    _querySum();
}
function _seek() {
    var proxy = Ext.data.StoreManager.lookup('gridStore').getProxy();
    proxy.extraParams.V_I_YEAR = Ext.getCmp('year').getValue();
    proxy.extraParams.V_I_MONTH = Ext.getCmp('month').getValue();
    proxy.extraParams.V_V_ORGCODE = Ext.getCmp('ck').getValue();;
    Ext.data.StoreManager.lookup('gridStore').currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore').load();
}
function _querySum(){
    Ext.Ajax.request({
        url: AppUrl + 'YS/YS_CHARGE_W_DEPT_TOTAL_SEL',
        async: false,
        method: 'POST',
        params: {
            'V_I_YEAR':  Ext.getCmp('year').getValue(),
            'V_I_MONTH': Ext.getCmp('month').getValue(),
            'V_V_ORGCODE':Ext.getCmp('ck').getValue()
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
function  _querygrid3(){
    _grid();
    _querySum3();
}
function _grid() {
    var proxy = Ext.data.StoreManager.lookup('gridStore3').getProxy();
    proxy.extraParams.V_I_YEAR = Ext.getCmp('year').getValue();
    proxy.extraParams.V_I_MONTH = Ext.getCmp('month').getValue();
    proxy.extraParams.V_V_ORGCODE = sid;
    proxy.extraParams.V_V_DEPTCODE = ssid;
    Ext.data.StoreManager.lookup('gridStore3').currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore3').load();
}
function _querySum3(){
    Ext.Ajax.request({
        url: AppUrl + 'YS/YS_CHARGE_W_DEPT_D_TOTAL_SEL',
        async: false,
        method: 'POST',
        params: {
            'V_I_YEAR':  Ext.getCmp('year').getValue(),
            'V_I_MONTH': Ext.getCmp('month').getValue(),
            'V_V_ORGCODE':sid,
            'V_V_DEPTCODE':ssid
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);
            if (data.RET=="success") {
                Ext.getCmp('SUM_P_MAT3').setValue(data.RET1);
                Ext.getCmp('SUM_A_MAT3').setValue(data.RET2);
                Ext.getCmp('SUM_PER3').setValue(data.RET3);
                Ext.getCmp('SUM_TOOL3').setValue(data.RET4);
                Ext.getCmp('SUM_TOTAL_P_CHARGE3').setValue(data.RET5);
                Ext.getCmp('SUM_TOTAL_A_CHARGE3').setValue(data.RET6);
            }
        }
    });
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
    return Ext.util.Format.number(value, '0.00');

}
function rights(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return Ext.util.Format.number(value, '0.00');

}
