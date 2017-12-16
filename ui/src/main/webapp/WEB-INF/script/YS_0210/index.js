/**
 * Created by LL on 2017/11/20.
 */

var V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_DEPTCODE = Ext.util.Cookies.get('v_orgCode');
var V_DEPTCODENEXT = Ext.util.Cookies.get('v_deptcode');

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
        proxy: {
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
        proxy: {
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
        },
        listeners: {
            load: function (store) {
                Ext.getCmp('zyq').select(store.first());
            },
            beforeload: zyqload
        }
    });


    var gridStore = Ext.create('Ext.data.Store', {
        pageSize: 20,
        autoLoad: false,
        storeId: 'gridStore',
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
            selType: 'rowmodel',
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
                                labelAlign: 'right'
                            }, {
                                xtype: 'button',
                                text: '查询',
                                icon: imgpath + '/search.png',
                                style: 'margin:0px 0px 0px 25px',
                                handler: _queryGrid
                            }]
                    }, {
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

        })
        ;


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

})
;
function _queryGrid(){
    _seek();
    _querySum();
}
function _seek() {
    var proxy = Ext.data.StoreManager.lookup('gridStore').getProxy();
    proxy.extraParams.V_V_YEAR = Ext.getCmp('year').getSubmitValue();
    proxy.extraParams.V_V_MONTH = Ext.getCmp('month').getSubmitValue();
    proxy.extraParams.V_V_ORGCODE = Ext.getCmp('ck').getValue();
    proxy.extraParams.V_V_DEPTCODE = Ext.getCmp('zyq').getValue();
    Ext.data.StoreManager.lookup('gridStore').currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore').load();

}
function _querySum(){
    Ext.Ajax.request({
        url: AppUrl + 'YS/YS_CHARGE_PROJECT_TOTAL_SEL',
        async: false,
        method: 'POST',
        params: {
            'V_V_YEAR': Ext.getCmp('year').getValue(),
            'V_V_MONTH': Ext.getCmp('month').getValue(),
            'V_V_ORGCODE':Ext.getCmp('ck').getValue(),
            'V_V_DEPTCODE': Ext.getCmp('zyq').getValue()
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
function zyqload(store) {
    store.proxy.extraParams = {
        'V_V_PERSONCODE': V_PERSONCODE,
        'V_V_DEPTCODE': Ext.getCmp("ck").getValue(),
        'V_V_DEPTCODENEXT': V_DEPTCODENEXT,
        'V_V_DEPTTYPE': '[主体作业区]'
    }
}
function selectProject(guid, code) {
    window.open(AppUrl + "page/YS_021001/Index" + '.html?V_GUID=' + guid + '&V_V_PROJECTCODE=' + code, "", "dialogHeight:700px;dialogWidth:1100px");
}
function left(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}
function rights(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return Ext.util.Format.number(value, '0.00');

}
