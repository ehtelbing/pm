// JavaScript Document

//--

//--
Ext.onReady(function(){

    Ext.getBody().mask('<p>页面载入中...</p>');

    var yearStore = Ext.create('Ext.data.Store', {
        storeId: 'yearStore',
        autoLoad: false,
        fields: ['V_I_YEAR'],
        data: [{
            V_I_YEAR: '2014'
        }]
    });

    var monthStore = Ext.create('Ext.data.Store', {
        storeId: 'monthStore',
        autoLoad: false,
        fields: ['V_I_MONTH'],
        data: [{
            V_I_MONTH: '1'
        }, {
            V_I_MONTH: '2'
        }, {
            V_I_MONTH: '3'
        }, {
            V_I_MONTH: '4'
        }, {
            V_I_MONTH: '5'
        }, {
            V_I_MONTH: '6'
        }, {
            V_I_MONTH: '7'
        }, {
            V_I_MONTH: '8'
        }, {
            V_I_MONTH: '9'
        }, {
            V_I_MONTH: '10'
        }, {
            V_I_MONTH: '11'
        }, {
            V_I_MONTH: '12'
        }]
    });

    /*var orgStore = Ext.create('Ext.data.Store', {
     storeId: 'orgStore',
     autoLoad: false,
     pageSize: -1,
     fields: ['I_ID', 'V_DEPTCODE', 'V_DEPTNAME',],
     proxy: {
     url: '/budgetWeb/selectOrg.do',
     type: 'ajax',
     actionMethods: {
     read: 'POST'
     },
     extraParams: {

     },
     reader: {
     type: 'json',
     root: 'orglist'
     }
     },
     listeners: {
     load: function (store, records) {
     //orgStoreLoad = true;
     /!*   store.insert(0, {'V_DEPTCODE': '%', 'V_DEPTNAME': '-全部-'});
     Ext.getCmp('V_DEPTCODE').select(store.first());*!/
     _init();
     }
     }
     });*/

    var factAnalyseTableBMDetailStore = Ext.create('Ext.data.Store', {
        storeId: 'factAnalyseTableBMDetailStore',
        autoLoad: false,
        pageSize: 20,
        fields: ['V_DEPTNAME2', 'F_MONEY_PRIBUD_Y', 'F_MONEY_BUD_YEAR', 'F_MONEY_BUD_PJ', 'F_MONEY_BUD', 'F_MONEY_FACT', 'F_MONEY_MARGIN_PJ', 'F_MONEY_MARGIN', 'F_BUD_YEAR_LJ_PJ', 'F_BUD_YEAR_LJ', 'F_MONEY_YEAR', 'F_MONEY_MARGIN_YEAR', 'F_MONEY_MARGIN_YEAR_PJ', 'F_MONEY_MARGIN_YEAR', 'F_MONEY_YEAR_REMAINDER'],
        proxy: {
            url: '/budgetWeb/selectFactAnalyseTableBMDetail.do',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'factAnalyseTableBMDetailList',
                totalProperty: 'total'
            }
        }
    });

    var northP  = Ext.create('Ext.form.Panel',{
        region:'north',
        height:90,
        defaults:{frame:true,baseCls:'my-panel-no-border',style:'margin-top:12px',},
        frame:true,
        items:[
            {layout:'column',defaults:{xtype:'combo',labelAlign:'right',  labelWidth: 60,editable:false,},items:[
                {
                    xtype: 'combo',
                    id: 'V_I_YEAR',
                    store: yearStore,
                    queryMode: 'local',
                    valueField: 'V_I_YEAR',
                    displayField: 'V_I_YEAR',
                    forceSelection: true,
                    fieldLabel: '选择日期',
                    labelWidth: 60
                }, {
                    xtype: 'combo',
                    id: 'V_I_MONTH',
                    store: monthStore,
                    queryMode: 'local',
                    valueField: 'V_I_MONTH',
                    displayField: 'V_I_MONTH',
                    forceSelection: true,
                    labelWidth: 60,
                   style:'margin-left:10px;padding-left:10px;padding-right:10px',

                }, {
                    xtype: 'combo',
                    id: 'V_DEPTCODE1',
                    store: yearStore,
                    queryMode: 'local',
                    valueField: 'V_DEPTCODE',
                    displayField: 'V_DEPTNAME',
                    forceSelection: true,
                    fieldLabel: '单位',
                    labelWidth: 60,
                    emptyText: '全部'
                }, {
                    xtype: 'combo',
                    id: 'V_DEPTCODE2',
                    store: yearStore,
                    queryMode: 'local',
                    valueField: 'V_DEPTCODE',
                    displayField: 'V_DEPTNAME',
                    forceSelection: true,
                    fieldLabel: '类型',
                    labelWidth: 60,
                    emptyText: '全部'
                }
            ]},
            {layout:'column',defaults:{xtype:'button', labelWidth: 60, labelAlign:'right'},items:[
                {
                    xtype: 'combo',
                    id: 'V_DEPTCODE3',
                    store: yearStore,
                    queryMode: 'local',
                    valueField: 'V_DEPTCODE',
                    displayField: 'V_DEPTNAME',
                    forceSelection: true,
                    fieldLabel: '状态',
                    labelWidth: 60,
                    emptyText: '全部'
                }, {
                    xtype: 'button',
                    icon: imgpath + '/search.png',
                    text: '查询',
                    style:'margin-left:10px;padding-left:10px;padding-right:10px',
                    handler: _selectFactAnalyseTableBMDetail
                }, {
                    xtype: 'button',
                    icon: imgpath + '/delete.png',
                    text: '删除检修设备',
                    style:'margin-left:10px;padding-left:10px;padding-right:10px',
                    handler: _selectFactAnalyseTableBMDetail
                }, {
                    xtype: 'button',
                    icon: imgpath + '/error_16x16.gif',
                    text: '作废工作票',
                    style:'margin-left:10px;padding-left:10px;padding-right:10px',
                    handler: _selectFactAnalyseTableBMDetail
                }
            ]},
        ],
    });

    var centerP = Ext.create('Ext.grid.Panel', {
        border: false,//baseCls:'my-panel-no-border',
        //title:'详细信息',
        region: 'center',
        store: factAnalyseTableBMDetailStore,
        columnLines: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        features: [{ftype: 'summary'}],
        columns: [
            {
                dataIndex: 'V_DEPTNAME2',
                text: '工作票号',
                align: 'center'
            }, {
                text: '单位名称',
                align: 'center',
                dataIndex: 'V_DEPTNAME2'
            }, {
                text: '设备名称',
                align: 'center',
                dataIndex: 'F_MONEY_PRIBUD_Y'
            }, {
                text: '年执行预算',
                align: 'center',
                dataIndex: 'F_MONEY_BUD_YEAR'
            }, {
                text: '实际', align: 'center', width: 300,
                columns: [
                    {
                        text: '数量(台)', align: 'center', width: 100, dataIndex: 'F_MONEY_BUD_PJ', summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex) {
                            return Ext.util.Format.number(value, '0.00');
                        }
                    }, {
                        text: '点数(个)', align: 'center', width: 100, dataIndex: 'F_MONEY_BUD', summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex) {
                            return Ext.util.Format.number(value, '0.00');
                        }
                    }, {
                        text: '数量(台)', align: 'center', width: 100, dataIndex: 'F_MONEY_FACT', summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex) {
                            return Ext.util.Format.number(value, '0.00');
                        }
                    }, {
                        text: '点数(个)', align: 'center', width: 100, dataIndex: 'F_MONEY_MARGIN_PJ', summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex) {
                            return Ext.util.Format.number(value, '0.00');
                        }
                    }, {
                        text: '检测方法', align: 'center', width: 100, dataIndex: 'F_MONEY_MARGIN', summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex) {
                            return Ext.util.Format.number(value, '0.00');
                        }
                    }
                ]
            }, {
                text: '现场验收',
                align: 'center',
                dataIndex: 'F_MONEY_YEAR_REMAINDER',
            }, {
                text: '检修协力故障针对工程师',
                align: 'center',
                dataIndex: 'F_MONEY_YEAR_REMAINDER',
            }, {
                text: '主要单位精密负责人',
                align: 'center',
                dataIndex: 'F_MONEY_YEAR_REMAINDER',
            }, {
                text: '精密点检现场协同人员',
                align: 'center',
                dataIndex: 'F_MONEY_YEAR_REMAINDER',
            }, {
                text: '开始检测时间',
                align: 'center',
                dataIndex: 'F_MONEY_YEAR_REMAINDER',
            }]
    });

    Ext.create('Ext.container.Viewport',{
        layout:'border',
        items:[northP,centerP]
    });
    _init();
});

function _init() {
    if (true) {

        Ext.getBody().unmask();
    }
}

function _selectFactAnalyseTableBMDetail() {
    var factAnalyseTableBMDetailStore = Ext.data.StoreManager.lookup('factAnalyseTableBMDetailStore');

    factAnalyseTableBMDetailStore.proxy.extraParams = {};

    factAnalyseTableBMDetailStore.currentPage = 1;
    factAnalyseTableBMDetailStore.load();
}
