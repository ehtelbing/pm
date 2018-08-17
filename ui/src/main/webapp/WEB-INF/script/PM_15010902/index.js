/**
 * Created by LL on 2017/12/12.
 */
var userId = Ext.util.Cookies.get("v_personcode");
var userName = Ext.util.Cookies.get("v_personname2");
var plantCode = Ext.util.Cookies.get("v_deptcode");
var orderId;

Ext.onReady(function () {

    var checkPlantStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'checkPlantStore',
        fields: ['MENDDEPT_CODE', 'MENDDEPT_NAME'],
        proxy: {
            type: 'ajax',
            async: true,
            url: AppUrl + 'LL/PRO_DJ603_MENDDEPT',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'USERCODE_IN': userId,
                'PLANTCODE_IN': plantCode
            }
        },
        listeners: {
            'load': function (store) {
                Ext.getCmp('plant').select(store.first());
            }
        }
    });

    var plantStore = Ext.create('Ext.data.Store', {
        id: 'plantStore',
        autoLoad: true,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_12/PRO_BASE_DEPT_VIEW',
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
                store.insert(0, {
                    'V_DEPTCODE': '%',
                    'V_DEPTNAME': '全部'
                });
                Ext.getCmp('APPLY_PLANT').select(store.first());
            }
        }
    });

    var gridStore1 = Ext.create('Ext.data.Store', {
        storeId: 'gridStore1',
        fields: ['APPLY_PLANT', 'APPLY_PLANTNAME', 'COST_MONEY'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'LL/PRO_DJ902_APPLYPLANTCOST',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var gridStore2 = Ext.create('Ext.data.Store', {
        storeId: 'gridStore2',
        fields: ['CODE', 'NAME', 'COST_MONEY'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'LL/PRO_DJ902_MENDDEPTCOST',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var gridStore3 = Ext.create('Ext.data.Store', {
        storeId: 'gridStore3',
        fields: ['ORDERID', 'DJ_UQ_CODE', 'DJ_NAME', 'COST_MONEY', 'MEND_CONTEXT'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'LL/PRO_DJ902_ORDERCOST',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var gridStore4 = Ext.create('Ext.data.Store', {
        storeId: 'gridStore4',
        fields: ['ID', 'ORDERID', 'COST_ITEM', 'COST_MONEY', 'INSERT_USERNAME', 'INSERT_USERID', 'INSERTDATE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'LL/PRO_DJ901_COSTLIST',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var inputPanel = Ext.create('Ext.panel.Panel', {
        region: 'north',
        layout: 'vbox',
        frame: true,
        items: [{
            baseCls: 'my-panel-noborder',
            layout: 'hbox',
            items: [{
                id: 'billcode',
                align: 'left',
                xtype: 'textfield',
                fieldLabel: '工单号',
                style: ' margin: 10px 0px 0px 20px',
                labelAlign: 'right',
                labelWidth: 80
            }, {
                id: 'begindate',
                xtype: 'datefield',
                align: 'left',
                fieldLabel: '起始日期',
                format: 'Y-m-d',
                value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                editable: false,
                style: ' margin: 10px 0px 0px 20px',
                labelAlign: 'right',
                labelWidth: 80
            }, {
                id: 'enddate',
                xtype: 'datefield',
                align: 'left',
                fieldLabel: '结束日期',
                format: 'Y-m-d',
                value: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
                editable: false,
                style: ' margin: 10px 0px 0px 20px',
                labelAlign: 'right',
                labelWidth: 80
            }]
        }, {
            baseCls: 'my-panel-noborder',
            layout: 'hbox',
            items: [{
                id: 'plant',
                xtype: 'combo',
                fieldLabel: '检修单位',
                align: 'left',
                store: checkPlantStore,
                editable: false,
                displayField: 'MENDDEPT_NAME',
                valueField: 'MENDDEPT_CODE',
                queryMode: 'local',
                style: ' margin: 10px 0px 0px 20px',
                labelAlign: 'right',
                labelWidth: 80
            },
                {
                    id: 'djcode',
                    xtype: 'textfield',
                    align: 'left',
                    fieldLabel: '电机编号',
                    style: ' margin: 10px 0px 0px 20px',
                    labelAlign: 'right',
                    labelWidth: 80
                }, {
                    xtype: 'textfield',
                    style: ' margin: 10px 0px 0px 20px',
                    value: '',
                    fieldLabel: '电机名称',
                    id: 'djname',
                    labelAlign: 'right',
                    labelWidth: 80
                }]
        }, {
            baseCls: 'my-panel-noborder',
            layout: 'hbox',
            items: [{
                id: 'APPLY_PLANT',
                xtype: 'combo',
                fieldLabel: '申请单位',
                store: plantStore,
                editable: false,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local',
                style: ' margin: 10px 0px 0px 20px',
                labelAlign: 'right',
                labelWidth: 80
            }, {
                xtype: 'button',
                id: 'search',
                text: '查  询',
                width: '60',
                icon: imgpath + '/search.png',
                style: ' margin: 10px 0px 10px 45px',
                handler: OnClickSearch
            }, {
                xtype: 'button',
                id: 'toExcel',
                text: '导出Excel',
                width: '100',
                icon: imgpath + '/excel.gif',
                style: ' margin: 10px 0px 10px 10px',
                handler: OnClickOutExcel
            }, {
                xtype: 'hidden',
                id: 'tabID',
                value: 'grid1'
            }]
        }]
    });

    var grid1 = Ext.create('Ext.grid.Panel', {
        id: 'grid1',
        columnLines: true,
        autoScroll: true,
        title: '申请单位费用统计',
        store: gridStore1,
        features: [{
            ftype: 'summary'
        }],
        dufaults: {
            width: 120
        },
        columns: [{
            text: '申请厂矿编码',
            dataIndex: 'APPLY_PLANT',
            align: 'center',
            width: 120,
            renderer: left
        }, {
            text: '申请厂矿名',
            dataIndex: 'APPLY_PLANTNAME',
            align: 'center',
            width: 170,
            renderer: left
        }, {
            text: '维修费用',
            dataIndex: 'COST_MONEY',
            align: 'center',
            width: 170,
            summaryType: 'sum',
            summaryRenderer: function (value, metaData, summaryData, dataIndex) {
                metaData.style = "text-align:right;";
                return "合计：" + Ext.util.Format.number(value, '0.00');
            },
            renderer: right
        }]
    });

    var grid2 = Ext.create('Ext.grid.Panel', {
        id: 'grid2',
        columnLines: true,
        features: [{
            ftype: 'summary'
        }],
        autoScroll: true,
        title: '检修单位统计',
        store: gridStore2,
        dufaults: {
            width: 120
        },
        columns: [{
            text: '检修单位编码',
            dataIndex: 'CODE',
            align: 'center',
            width: 120,
            renderer: left
        }, {
            text: '检修单位名称',
            dataIndex: 'NAME',
            align: 'center',
            width: 170,
            renderer: left
        }, {
            text: '维修费用',
            dataIndex: 'COST_MONEY',
            align: 'center',
            width: 170,
            summaryType: 'sum',
            summaryRenderer: function (value, metaData, summaryData, dataIndex) {
                metaData.style = "text-align:right;";
                return "合计：" + Ext.util.Format.number(value, '0.00');
            },
            renderer: right
        }]
    });

    var grid3 = Ext.create('Ext.grid.Panel', {
        id: 'grid3',
        columnLines: true,
        features: [{
            ftype: 'summary'
        }],
        autoScroll: true,
        title: '按工单统计',
        store: gridStore3,
        dufaults: {
            width: 120
        },
        columns: [{
            text: '工单号',
            dataIndex: 'ORDERID',
            align: 'center',
            width: 120,
            renderer: left
        }, {
            text: '电机编号',
            dataIndex: 'DJ_UQ_CODE',
            align: 'center',
            width: 150,
            renderer: left
        }, {
            text: '电机名称',
            dataIndex: 'DJ_NAME',
            align: 'center',
            width: 170,
            renderer: left
        }, {
            text: '维修内容',
            dataIndex: 'MEND_CONTEXT',
            align: 'center',
            width: 170,
            renderer: left
        }, {
            text: '费用合计',
            dataIndex: 'COST_MONEY',
            align: 'center',
            width: 170,
            summaryType: 'sum',
            summaryRenderer: function (value, metaData, summaryData, dataIndex) {
                metaData.style = "text-align:right;";
                return "合计：" + Ext.util.Format.number(value, '0.00');
            },
            renderer: right
        }, {
            text: '费用明细',
            align: 'center',
            width: 100,
            renderer: checkCostMore
        }
        ]
    });

    var inputPanel1 = Ext.create('Ext.panel.Panel', {
        id: 'inputPanel1',
        xtype: 'panel',
        region: 'north',
        frame: true,
        layout: {
            type: 'vbox'
        },
        defaults: {
            baseCls: 'my-panel-noborder'
        },
        margin: 1,
        items: [{
            xtype: 'textfield',
            fieldLabel: '工单号',
            id: 'ORDERID',
            readOnly: true,
            style: ' margin: 10px 0px 10px 20px'
        }]
    });

    var panelCenter1 = Ext.create('Ext.grid.Panel', {
        id: 'panelCenter1',
        columnLines: true,
        width: '100%',
        region: 'center',
        store: gridStore4,
        autoScroll: true,
        features: {
            ftype: 'summary'
        },
        frame: true,
        defaults: {
            baseCls: 'my-panel-noborder'
        },
        columns: [{
            text: '项目名称',
            dataIndex: 'COST_ITEM',
            align: 'center',
            width: 170,
            renderer: left
        }, {
            text: '费用金额',
            dataIndex: 'COST_MONEY',
            align: 'center',
            width: 170,
            summaryType: 'sum',
            summaryRenderer: function (value, metaData, summaryData, dataIndex) {
                metaData.style = "text-align:right;";
                return "合计：" + Ext.util.Format.number(value, '0.00');
            },
            renderer: right
        }, {
            text: '录入人',
            dataIndex: 'INSERT_USERNAME',
            align: 'center',
            width: 130,
            renderer: left
        }, {
            text: '录入时间',
            dataIndex: 'INSERTDATE',
            align: 'center',
            width: 120,
            renderer: atleft1
        }],
        dockedItems: [inputPanel1]
    });

    var dialog = Ext.create('Ext.window.Window', {
        id: 'dialog',
        title: '费用明细',
        width: 750,
        height: 400,
        modal: true,
        plain: true,
        closable: true,
        closeAction: 'hide',
        model: true,
        layout: 'border',
        frame: true,
        items: [{
            region: 'center',
            layout: 'fit',
            border: false,
            items: [panelCenter1]
        }],
        buttons: [{
            text: '取 消',
            icon: imgpath + '/cross.png',
            margin: '0px 0px 0px 10px',
            handler: _delete
        }]
    });

    var tab = Ext.create('Ext.tab.Panel', {
        id: 'tab',
        region: 'center',
        layout: 'border',
        items: [grid1, grid2, grid3],
        listeners: {
            tabchange: function (tabPanel, newCard, oldCard, eOpts) {
                Ext.getCmp('tabID').setValue(newCard.id);
            }
        }
    });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [inputPanel, tab]
    });

});
function OnClickSearch() {
    query1();
    query2();
    query3();
}

function query1() {
    Ext.data.StoreManager.lookup('gridStore1').load({
        params: {
            'ORDERID_IN': Ext.getCmp('billcode').getValue(),
            'STARTDATE_IN': Ext.util.Format.date(Ext.getCmp('begindate').getValue(), 'Y-m-d'),
            'ENDDATE_IN': Ext.util.Format.date(Ext.getCmp('enddate').getValue(), 'Y-m-d'),
            'MENDDEPT_CODE_IN': Ext.getCmp('plant').getValue(),
            'APPLY_PLANT_IN': Ext.getCmp('APPLY_PLANT').getValue(),
            'DJ_UQ_CODE_IN': Ext.getCmp('djcode').getValue(),
            'DJ_NAME_IN': Ext.getCmp('djname').getValue()
        }
    })
}
function query2() {
    Ext.data.StoreManager.lookup('gridStore2').load({
        params: {
            'ORDERID_IN': Ext.getCmp('billcode').getValue(),
            'STARTDATE_IN': Ext.util.Format.date(Ext.getCmp('begindate').getValue(), 'Y-m-d'),
            'ENDDATE_IN': Ext.util.Format.date(Ext.getCmp('enddate').getValue(), 'Y-m-d'),
            'MENDDEPT_CODE_IN': Ext.getCmp('plant').getValue(),
            'APPLY_PLANT_IN': Ext.getCmp('APPLY_PLANT').getValue(),
            'DJ_UQ_CODE_IN': Ext.getCmp('djcode').getValue(),
            'DJ_NAME_IN': Ext.getCmp('djname').getValue()
        }
    })
}
function query3() {
    Ext.data.StoreManager.lookup('gridStore3').load({
        params: {
            'ORDERID_IN': Ext.getCmp('billcode').getValue(),
            'STARTDATE_IN': Ext.util.Format.date(Ext.getCmp('begindate').getValue(), 'Y-m-d'),
            'ENDDATE_IN': Ext.util.Format.date(Ext.getCmp('enddate').getValue(), 'Y-m-d'),
            'MENDDEPT_CODE_IN': Ext.getCmp('plant').getValue(),
            'APPLY_PLANT_IN': Ext.getCmp('APPLY_PLANT').getValue(),
            'DJ_UQ_CODE_IN': Ext.getCmp('djcode').getValue(),
            'DJ_NAME_IN': Ext.getCmp('djname').getValue()
        }
    })
}

function OnClickOutExcel() {
    var tabID = Ext.getCmp('tabID').getValue();
    if (tabID == "grid1") {
        expExcelExp1();
    } else if (tabID == "grid2") {
        expExcelExp2();
    } else if (tabID == "grid3") {
        expExcelExp3();
    }
}

function expExcelExp1() {
    document.location.href = AppUrl + '/LL/No15010902applyplantcostExcel?ORDERID_IN=' + Ext.getCmp('billcode').getValue()
    + '&&STARTDATE_IN=' + Ext.util.Format.date(Ext.getCmp('begindate').getValue(), 'Y-m-d')
    + '&&ENDDATE_IN=' + Ext.util.Format.date(Ext.getCmp('enddate').getValue(), 'Y-m-d')
    + '&&MENDDEPT_CODE_IN=' + Ext.getCmp('plant').getValue()
    + '&&APPLY_PLANT_IN=' + encodeURI(encodeURI(Ext.getCmp('APPLY_PLANT').getValue()))
    + '&&DJ_UQ_CODE_IN=' + Ext.getCmp('djcode').getValue()
    + '&&DJ_NAME_IN=' + Ext.getCmp('djname').getValue()
    + '&&VTITLE=申请单位费用统计';
}

function expExcelExp2() {
    document.location.href = AppUrl + '/LL/No15010902menddeptcostExcel?ORDERID_IN=' + Ext.getCmp('billcode').getValue()
    + '&&STARTDATE_IN=' + Ext.util.Format.date(Ext.getCmp('begindate').getValue(), 'Y-m-d')
    + '&&ENDDATE_IN=' + Ext.util.Format.date(Ext.getCmp('enddate').getValue(), 'Y-m-d')
    + '&&MENDDEPT_CODE_IN=' + Ext.getCmp('plant').getValue()
    + '&&APPLY_PLANT_IN=' + encodeURI(encodeURI(Ext.getCmp('APPLY_PLANT').getValue()))
    + '&&DJ_UQ_CODE_IN=' + Ext.getCmp('djcode').getValue()
    + '&&DJ_NAME_IN=' + Ext.getCmp('djname').getValue()
    + '&&VTITLE=检修单位统计';
}

function expExcelExp3() {
    document.location.href = AppUrl + '/LL/No15010902ordercostExcel?ORDERID_IN=' + Ext.getCmp('billcode').getValue()
    + '&&STARTDATE_IN=' + Ext.util.Format.date(Ext.getCmp('begindate').getValue(), 'Y-m-d')
    + '&&ENDDATE_IN=' + Ext.util.Format.date(Ext.getCmp('enddate').getValue(), 'Y-m-d')
    + '&&MENDDEPT_CODE_IN=' + Ext.getCmp('plant').getValue()
    + '&&APPLY_PLANT_IN=' + encodeURI(encodeURI(Ext.getCmp('APPLY_PLANT').getValue()))
    + '&&DJ_UQ_CODE_IN=' + Ext.getCmp('djcode').getValue()
    + '&&DJ_NAME_IN=' + Ext.getCmp('djname').getValue()
    + '&&VTITLE=工单统计';
}

function checkCostMore(value, metaData, record, rowIdx, colIdx, store, view) {
    return "<a onclick='OnOpen(\"" + rowIdx + "\")' style='color:blue'>查看</a>";
}

function OnOpen(rowIdx) {
    orderId = Ext.data.StoreManager.lookup('gridStore3').data.getAt(rowIdx).data.ORDERID;
    Ext.getCmp('dialog').show();
    Ext.getCmp('ORDERID').setValue(orderId);
    OnClickSearch1();
}

function OnClickSearch1() {
    Ext.data.StoreManager.lookup('gridStore4').load({
        params: {
            'ORDERID_IN': orderId
        }
    })
}

function _delete() {
    Ext.getCmp("dialog").hide();
}

function left(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}

function right(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}

function atleft1(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value.split(' ')[0];
}