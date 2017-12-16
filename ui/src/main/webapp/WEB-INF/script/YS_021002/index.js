/**
 * Created by LL on 2017/11/21.
 */

if (location.href.split('?')[1] != undefined) {
    V_GUID = Ext.urlDecode(location.href.split('?')[1]).V_GUID;
    V_V_PROJECTCODE = Ext.urlDecode(location.href.split('?')[1]).V_V_PROJECTCODE;
}

Ext.onReady(function () {

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
            url: AppUrl + 'YS/YS_CHARGE_PROJECT_W_SEL',
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
        forceFit:true,
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
                    items: [{
                        xtype: 'textfield',
                        id: 'projectId',
                        fieldLabel: '大修工程号',
                        editable: false,
                        labelWidth: 90,
                        labelAlign: 'right',
                        queryMode: 'local',
                        style: 'margin:0px 0px 0px 30px',
                        width: 260
                    }, {
                        xtype: 'button',
                        text: '返回',
                        icon: imgpath + '/undo.png',
                        handler: _back
                    }]
                },
                    {
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
                            style: 'margin:0px 0px 0px 37px',
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
                            style: 'margin:0px 0px 0px -10px',
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
                            style: 'margin:0px 0px 0px 50px',
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
                            style: 'margin:0px 0px 0px 48px',
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
                            style: 'margin:0px 0px 0px 50px',
                            renderer: rights
                        }]
                    }
                ]
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

    Ext.getCmp('projectId').setValue(V_V_PROJECTCODE);
    _seek();
    _querySum();
});

function _seek() {
    var proxy = Ext.data.StoreManager.lookup('gridStore').getProxy();
    proxy.extraParams.V_V_GUID = V_GUID;
    Ext.data.StoreManager.lookup('gridStore').currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore').load();
}
function _querySum(){
    Ext.Ajax.request({
        url: AppUrl + 'YS/YS_CHARGE_PROJECT_W_TOTAL_SEL',
        async: false,
        method: 'POST',
        params: {
            'V_V_GUID': V_GUID
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

function _back() {
    window.close();
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

