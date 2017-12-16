/**
 * Created by LL on 2017/11/24.
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

    var gridStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        pageSize: 20,
        storeId: 'gridStore',
        fields: ['V_ORGCODE','V_ORGNAME','V_PLAN_MONEY','V_BUDGET_MONEY','PAID','UNPAID',  'V_P_MAT', 'V_A_MAT', 'V_PER', 'V_TOOL', 'V_TOTAL_P_MAT', 'V_TOTAL_A_MAT'],
        proxy: {
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            url: AppUrl + 'YS/YS_CHARGE_PROJECT_ORG_SEL',
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'

            },
            extraParams: {}
        }
    });

    var gridStore2 = Ext.create('Ext.data.Store', {
        autoLoad: false,
        pageSize: 20,
        storeId: 'gridStore2',
        fields: ['V_ORGCODE','V_ORGNAME','V_DEPTCODE','V_DEPTNAME', 'V_PLAN_MONEY','V_BUDGET_MONEY','PAID','UNPAID',  'V_P_MAT', 'V_A_MAT', 'V_PER', 'V_TOOL', 'V_TOTAL_P_MAT', 'V_TOTAL_A_MAT'],
        proxy: {
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            url: AppUrl + 'YS/YS_CHARGE_PROJECT_DEPT_SEL',
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
        fields: ['V_ORGCODE', 'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME', 'V_PROJECT_CODE', 'PROJECTCODE_UP', 'V_PROJECT_NAME', 'V_DATE_B', 'V_DATE_E',
            'V_PLAN_MONEY', 'V_BUDGET_MONEY', 'V_CHARGE_P_MAT', 'V_CHARGE_A_MAT', 'V_CHARGE_PER', 'V_CHARGE_TOOL', 'V_TOTAL_P_CHARGE', 'V_TOTAL_A_CHARGE',
            'PAID', 'UNPAID', 'V_GUID'],
        proxy: {
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            url: AppUrl + 'YS/YS_CHARGE_PROJECT_SEL',
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
                width: 120,
                xtype: 'templatecolumn',
                tpl: '<a style="cursor:pointer;">{V_ORGNAME}</a>',
                id: 'orgName'
            },
            {
                text: '计划投资',
                dataIndex: 'V_PLAN_MONEY',
                align: 'center',
                width: 160,
                renderer: rights
            },
            {
                text: '年度投资',
                dataIndex: 'V_BUDGET_MONEY',
                align: 'center',
                width: 160,
                renderer: rights
            }, {
                text: '工程未结算费用',
                dataIndex: 'PAID',
                align: 'center',
                width: 160,
                renderer: rights
            }, {
                text: '工程已结算费用',
                dataIndex: 'UNPAID',
                align: 'center',
                width: 160,
                renderer: rights
            },
            {
                text: '物料费(元)',
                columns: [{
                    text: '计划成本',
                    dataIndex: 'V_P_MAT',
                    align: 'center',
                    width: 120,
                    renderer: rights
                }, {
                    text: '实际成本',
                    dataIndex: 'V_A_MAT',
                    align: 'center',
                    width: 120,
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
                    width: 120,
                    renderer: rights
                }, {
                    text: '实际',
                    dataIndex: 'V_TOTAL_A_MAT',
                    align: 'center',
                    width: 120,
                    renderer: rights
                }]
            }
        ],
        listeners: {
            itemclick: function (aa, record, item, index, e, eOpts) {

                sid = record.raw.V_ORGCODE;
                Ext.getCmp('dialog').show();
                _querygrid2();

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
                    region: 'center',
                    layout: 'column',
                    baseCls: 'my-panel-no-border',
                    items: [{
                        xtype: 'displayfield',
                        id: 'SUM_PLAN_MONEY',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '计划投资(元)',
                        labelWidth: 90,
                        width: 200,
                        value: '0.0',
                        labelAlign: 'right',
                        style: 'margin:0px 0px 0px 37px',
                        renderer: rights
                    }, {
                        xtype: 'displayfield',
                        id: 'SUM_BUGET_MONEY',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '年度投资(元)',
                        labelWidth: 90,
                        width: 200,
                        value: '0.0',
                        labelAlign: 'right',
                        renderer: rights
                    }, {
                        xtype: 'displayfield',
                        id: 'SUM_PAID',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '已结算(元)',
                        labelWidth: 90,
                        width: 200,
                        value: '0.0',
                        labelAlign: 'right',
                        renderer: rights
                    },{
                        xtype: 'displayfield',
                        id: 'SUM_UNPAID',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '未结算(元)',
                        labelWidth: 90,
                        width: 200,
                        value: '0.0',
                        labelAlign: 'right',
                        renderer: rights
                    }
                    ]
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

    var gridPanel2 = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel2',
        columnLines: true,
        width: '100%',
        region: 'center',
        store: gridStore2,
        autoScroll: true,
        columns: [
            {
                xtype: 'rownumberer',
                width: 35,
                sortable: false
            }, {
                text: '厂矿',
                dataIndex: 'V_ORGNAME',
                align: 'left',
                width: 120,
                renderer: left
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
                text: '计划投资',
                dataIndex: 'V_PLAN_MONEY',
                align: 'center',
                width: 160,
                renderer: rights
            },
            {
                text: '年度投资',
                dataIndex: 'V_BUDGET_MONEY',
                align: 'center',
                width: 160,
                renderer: rights
            }, {
                text: '工程未结算费用',
                dataIndex: 'PAID',
                align: 'center',
                width: 160,
                renderer: rights
            }, {
                text: '工程已结算费用',
                dataIndex: 'UNPAID',
                align: 'center',
                width: 160,
                renderer: rights
            },
            {
                text: '物料费(元)',
                columns: [{
                    text: '计划成本',
                    dataIndex: 'V_P_MAT',
                    align: 'center',
                    width: 120,
                    renderer: rights
                }, {
                    text: '实际成本',
                    dataIndex: 'V_A_MAT',
                    align: 'center',
                    width: 120,
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
                    width: 120,
                    renderer: rights
                }, {
                    text: '实际',
                    dataIndex: 'V_TOTAL_A_MAT',
                    align: 'center',
                    width: 120,
                    renderer: rights
                }]
            }
        ],
        listeners: {
            itemclick: function (aa, record, item, index, e, eOpts) {

                sid = record.raw.V_ORGCODE;
                ssid = record.raw.V_DEPTCODE;
                Ext.getCmp('dialog3').show();
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
                    region: 'center',
                    layout: 'column',
                    baseCls: 'my-panel-no-border',
                    items: [{
                        xtype: 'displayfield',
                        id: 'SUM_PLAN_MONEY2',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '计划投资(元)',
                        labelWidth: 90,
                        width: 200,
                        value: '0.0',
                        labelAlign: 'right',
                        style: 'margin:0px 0px 0px 37px',
                        renderer: rights
                    }, {
                        xtype: 'displayfield',
                        id: 'SUM_BUGET_MONEY2',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '年度投资(元)',
                        labelWidth: 90,
                        width: 200,
                        value: '0.0',
                        labelAlign: 'right',
                        renderer: rights
                    }, {
                        xtype: 'displayfield',
                        id: 'SUM_PAID2',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '已结算(元)',
                        labelWidth: 90,
                        width: 200,
                        value: '0.0',
                        labelAlign: 'right',
                        renderer: rights
                    },{
                        xtype: 'displayfield',
                        id: 'SUM_UNPAID2',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '未结算(元)',
                        labelWidth: 90,
                        width: 200,
                        value: '0.0',
                        labelAlign: 'right',
                        renderer: rights
                    }
                    ]
                },
                    {
                        xtype: 'panel',
                        region: 'south',
                        layout: 'column',
                        baseCls: 'my-panel-no-border',
                        items: [ {
                            xtype: 'displayfield',
                            id: 'SUM_P_MAT2',
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
                            id: 'SUM_A_MAT2',
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
                            id: 'SUM_PER2',
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
                            id: 'SUM_TOOL2',
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
                            id: 'SUM_TOTAL_P_CHARGE2',
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
                            id: 'SUM_TOTAL_A_CHARGE2',
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
                    }]
            }],
        bbar: ["->",
            {
                xtype: 'pagingtoolbar',
                store: gridStore2,
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
                text: '工程号',
                dataIndex: 'V_PROJECT_CODE',
                align: 'left',
                width: 120,
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return '<a href=javascript:dealWith(\'</a><a href="#" onclick="selectProject(\'' + record.data.V_GUID + '\',\'' + record.data.V_PROJECT_CODE + '\')">' + value + '</a>';
                }
            }, {
                text: '上级工程号',
                dataIndex: 'PROJECTCODE_UP',
                align: 'center',
                width: 120,
                renderer: left
            }, {
                text: '工程名称',
                dataIndex: 'V_PROJECT_NAME',
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
            }, {
                text: '开工时间',
                dataIndex: 'V_DATE_B',
                align: 'center',
                width: 180,
                renderer: left
            }, {
                text: '竣工时间',
                dataIndex: 'V_DATE_E',
                align: 'center',
                width: 120,
                renderer: left
            },
            {
                text: '计划投资',
                dataIndex: 'V_PLAN_MONEY',
                align: 'center',
                width: 160,
                renderer: rights
            },
            {
                text: '年度投资',
                dataIndex: 'V_BUDGET_MONEY',
                align: 'center',
                width: 160,
                renderer: rights
            }, {
                text: '工程未结算费用',
                dataIndex: 'PAID',
                align: 'center',
                width: 160,
                renderer: rights
            }, {
                text: '工程已结算费用',
                dataIndex: 'UNPAID',
                align: 'center',
                width: 160,
                renderer: rights
            },
            {
                text: '物料费(元)',
                columns: [{
                    text: '计划成本',
                    dataIndex: 'V_CHARGE_P_MAT',
                    align: 'center',
                    width: 120,
                    renderer: rights
                }, {
                    text: '实际成本',
                    dataIndex: 'V_CHARGE_A_MAT',
                    align: 'center',
                    width: 120,
                    renderer: rights
                }]
            }, {
                text: '人工费(元)',
                dataIndex: 'V_CHARGE_PER',
                align: 'center',
                width: 120,
                renderer: rights
            }, {
                text: '机具费(元)',
                dataIndex: 'V_CHARGE_TOOL',
                align: 'center',
                width: 120,
                renderer: rights
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
                    region: 'center',
                    layout: 'column',
                    baseCls: 'my-panel-no-border',
                    items: [{
                        xtype: 'displayfield',
                        id: 'SUM_PLAN_MONEY3',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '计划投资(元)',
                        labelWidth: 90,
                        width: 200,
                        value: '0.0',
                        labelAlign: 'right',
                        style: 'margin:0px 0px 0px 37px',
                        renderer: rights
                    }, {
                        xtype: 'displayfield',
                        id: 'SUM_BUGET_MONEY3',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '年度投资(元)',
                        labelWidth: 90,
                        width: 200,
                        value: '0.0',
                        labelAlign: 'right',
                        renderer: rights
                    }, {
                        xtype: 'displayfield',
                        id: 'SUM_PAID3',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '已结算(元)',
                        labelWidth: 90,
                        width: 200,
                        value: '0.0',
                        labelAlign: 'right',
                        renderer: rights
                    },{
                        xtype: 'displayfield',
                        id: 'SUM_UNPAID3',
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '未结算(元)',
                        labelWidth: 90,
                        width: 200,
                        value: '0.0',
                        labelAlign: 'right',
                        renderer: rights
                    }
                    ]
                },
                    {
                        xtype: 'panel',
                        region: 'south',
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
                            style: 'margin:0px 0px 0px 37px',
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
                            style: 'margin:0px 0px 0px -10px',
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
                            id: 'SUM_TOTAL_P_CHARGE3',
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
                            id: 'SUM_TOTAL_A_CHARGE3',
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
        title: '<div align="center">厂矿大修工程据汇总表</div>',
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
            items: [gridPanel2]
        }]
    });

    var dialog3 = Ext.create('Ext.window.Window', {
        id: 'dialog3',
        title: '<div align="center">作业区大修工程数据明细表</div>',
        width: 850,
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
    proxy.extraParams.V_V_YEAR = Ext.getCmp('year').getValue();
    proxy.extraParams.V_V_MONTH = Ext.getCmp('month').getValue();
    Ext.data.StoreManager.lookup('gridStore').currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore').load();
}
function _querySum(){
    Ext.Ajax.request({
        url: AppUrl + 'YS/YS_CHARGE_P_ORG_TOTAL_SEL',
        async: false,
        method: 'POST',
        params: {
            'V_V_YEAR':  Ext.getCmp('year').getValue(),
            'V_V_MONTH': Ext.getCmp('month').getValue()
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);
            if (data.RET=="success") {
                Ext.getCmp('SUM_PLAN_MONEY').setValue(data.RET1);
                Ext.getCmp('SUM_BUGET_MONEY').setValue(data.RET2);
                Ext.getCmp('SUM_PAID').setValue(data.RET3);
                Ext.getCmp('SUM_UNPAID').setValue(data.RET4);
                Ext.getCmp('SUM_P_MAT').setValue(data.RET5);
                Ext.getCmp('SUM_A_MAT').setValue(data.RET6);
                Ext.getCmp('SUM_PER').setValue(data.RET7);
                Ext.getCmp('SUM_TOOL').setValue(data.RET8);
                Ext.getCmp('SUM_TOTAL_P_CHARGE').setValue(data.RET9);
                Ext.getCmp('SUM_TOTAL_A_CHARGE').setValue(data.RET10);
            }
        }
    });
}
function  _querygrid2(){
    _grid();
    _querySum2();
}
function _grid() {
    var proxy = Ext.data.StoreManager.lookup('gridStore2').getProxy();
    proxy.extraParams.V_V_YEAR = Ext.getCmp('year').getValue();
    proxy.extraParams.V_V_MONTH = Ext.getCmp('month').getValue();
    proxy.extraParams.V_V_ORGCODE = sid;
    Ext.data.StoreManager.lookup('gridStore2').currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore2').load();
}
function _querySum2(){
    Ext.Ajax.request({
        url: AppUrl + 'YS/YS_CHARGE_P_DEPT_TOTAL_SEL',
        async: false,
        method: 'POST',
        params: {
            'V_V_YEAR':  Ext.getCmp('year').getValue(),
            'V_V_MONTH': Ext.getCmp('month').getValue(),
            'V_V_ORGCODE':sid
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);
            if (data.RET=="success") {
                Ext.getCmp('SUM_PLAN_MONEY2').setValue(data.RET1);
                Ext.getCmp('SUM_BUGET_MONEY2').setValue(data.RET2);
                Ext.getCmp('SUM_PAID2').setValue(data.RET3);
                Ext.getCmp('SUM_UNPAID2').setValue(data.RET4);
                Ext.getCmp('SUM_P_MAT2').setValue(data.RET5);
                Ext.getCmp('SUM_A_MAT2').setValue(data.RET6);
                Ext.getCmp('SUM_PER2').setValue(data.RET7);
                Ext.getCmp('SUM_TOOL2').setValue(data.RET8);
                Ext.getCmp('SUM_TOTAL_P_CHARGE2').setValue(data.RET9);
                Ext.getCmp('SUM_TOTAL_A_CHARGE2').setValue(data.RET10);
            }
        }
    });
}
function _querygrid3(){
    _grid3();
    _querySum3();
}
function _grid3(){
    var proxy = Ext.data.StoreManager.lookup('gridStore3').getProxy();
    proxy.extraParams.V_V_YEAR = Ext.getCmp('year').getValue();
    proxy.extraParams.V_V_MONTH = Ext.getCmp('month').getValue();
    proxy.extraParams.V_V_ORGCODE = sid;
    proxy.extraParams.V_V_DEPTCODE = ssid;
    Ext.data.StoreManager.lookup('gridStore3').currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore3').load();
}
function _querySum3(){
    Ext.Ajax.request({
        url: AppUrl + 'YS/YS_CHARGE_PROJECT_TOTAL_SEL',
        async: false,
        method: 'POST',
        params: {
            'V_V_YEAR':  Ext.getCmp('year').getValue(),
            'V_V_MONTH': Ext.getCmp('month').getValue(),
            'V_V_ORGCODE':sid,
            'V_V_DEPTCODE':ssid
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);
            if (data.RET=="success") {
                Ext.getCmp('SUM_PLAN_MONEY3').setValue(data.RET1);
                Ext.getCmp('SUM_BUGET_MONEY3').setValue(data.RET2);
                Ext.getCmp('SUM_PAID3').setValue(data.RET3);
                Ext.getCmp('SUM_UNPAID3').setValue(data.RET4);
                Ext.getCmp('SUM_P_MAT3').setValue(data.RET5);
                Ext.getCmp('SUM_A_MAT3').setValue(data.RET6);
                Ext.getCmp('SUM_PER3').setValue(data.RET7);
                Ext.getCmp('SUM_TOOL3').setValue(data.RET8);
                Ext.getCmp('SUM_TOTAL_P_CHARGE3').setValue(data.RET9);
                Ext.getCmp('SUM_TOTAL_A_CHARGE3').setValue(data.RET10);
            }
        }
    });
}
function selectProject(guid, code) {
    window.open(AppUrl + "page/YS_021001/Index" + '.html?V_GUID=' + guid + '&V_V_PROJECTCODE=' + code, "", "dialogHeight:700px;dialogWidth:1100px");
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
