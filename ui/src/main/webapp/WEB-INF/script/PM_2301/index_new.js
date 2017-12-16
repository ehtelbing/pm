var extSumWin, extHaulWin;
var extWin_w1 = $(window).width() * 0.65;
var extWin_h1 = $(window).height() * 0.65;
var extWin_w2 = $(window).width() * 0.55;
var extWin_h2 = $(window).height() * 0.55;
var pm0106Function = {
    detailedSum: function () {
        extSumWin.show();
        var records = Ext.getCmp('grid').getSelectionModel().getSelection();

        var V_V_ORGCODE = records[0].get("V_ORGCODE");
        var V_V_DEPTCODE = records[0].get("V_DEPTCODE");
        var V_V_EQUCODE = records[0].get("V_EQUCODE");
        Ext.data.StoreManager.lookup('haulStore').load({
            params: {
                'V_V_ORGCODE': V_V_ORGCODE,
                'V_V_DEPTCODE': V_V_DEPTCODE,
                'V_V_EQUCODE': V_V_EQUCODE
            },
            callback:function(r,options,success){
                var reader = Ext.StoreMgr.get('haulStore').getProxy().getReader();
                if(reader.jsonData.list.length>0) {
                    var sum_all = reader.jsonData.list[0].SUM_ALL;
                    Ext.getCmp('haulSum').setText("费用合计:" + sum_all);
                }
            }
        });
        Ext.data.StoreManager.lookup('dailyStore').load({
            params: {
                'V_V_DEPTCODE': V_V_DEPTCODE,
                'V_V_EQUCODE': V_V_EQUCODE
            },
            callback:function(r,options,success){
                var reader = Ext.StoreMgr.get('dailyStore').getProxy().getReader();
                if(reader.jsonData.list.length>0) {
                    var sum_all = reader.jsonData.list[0].SUM_ALL;
                    Ext.getCmp('dailySum').setText("费用合计:" + sum_all);
                }
            }
        });


    },
    detailedHaul: function () {
        extHaulWin.show();
        var records = Ext.getCmp('haulGrid').getSelectionModel().getSelection();
        var V_V_GUID = records[0].get("V_GUID ");
        Ext.data.StoreManager.lookup('haulDetailedStore').load({
            params: {
                'V_V_GUID': V_V_GUID
            },
            callback:function(r,options,success){
                var reader = Ext.StoreMgr.get('haulDetailedStore').getProxy().getReader();
                if(reader.jsonData.list.length>0) {
                    var sum_all = reader.jsonData.list[0].SUM_ALL;
                    Ext.getCmp('haulDetailedSum').setText("费用合计:" + sum_all);
                }
            }
        });

    }
};
function edit(thiss) {
    var records = Ext.getCmp('grid').getSelectionModel().getSelection();
    var V_V_COLUMN = thiss.context.field;
    var V_V_OLD = thiss.context.originalValue;
    var V_V_VALUE = records[0].data[V_V_COLUMN];//根据
    var V_I_ID = records[0].data.I_ID;//根据
    Ext.Ajax.request({
        url: AppUrl + 'PM_0106/PRO_PM_0106_MODIFY_MAIN',
        async: false,
        method: 'POST',
        params: {
            V_V_COLUMN: V_V_COLUMN,
            V_V_VALUE: V_V_VALUE,
            V_I_ID: V_I_ID
        },
        success: function (resp) {
            // var resp = Ext.JSON.decode(resp.responseText);
            // if (resp['result'] != "success") {
            //     Ext.Msg.alert('提示','操作失败');
            //     Ext.getCmp('grid').getSelectionModel().getSelection()[0].set(V_V_COLUMN,V_V_OLD)
            // } else {
            //     Ext.Msg.alert('提示','操作成功');
            // }
        }
    });
}
Ext.onReady(function () {

    var ckstore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'ckstore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
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
        }
    });

    var zyqstore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'zyqstore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/plant_sel',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });


    var ssblx = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'ssblx',
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/equiptype_sel',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var ssbmc = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'ssbmc',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/equipname_sel',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });





    var selPlantstore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'selPlantstore',
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
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE: '[基层单位]'
            }
        }
    });

    var selSectionstore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'selSectionstore',
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
        }
    });

    // 设备选择STORE
    var sbxzStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'sbxzStore',
        fields: ['EQU_DESC', 'EQU_ID'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_12/PRO_RUN7111_EQULIST',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });


    /**
     * 主表格 数据源
     * @type {Ext.data.Store}
     */
    var gridStore = Ext.create('Ext.data.Store', {
        pageSize: 100,
        id: 'gridStore',
        autoLoad: false,
        fields: ['I_ID','V_ORGCODE', 'V_DEPTCODE', 'V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_GDZ', 'V_CZ', 'V_SUM_ZYL', 'V_SUM_WXF'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_0106/PRO_PM_0106_JX_MAIN_LEDGER',
            actionMethods: {
                read: "POST"
            },
            reader: {
                type: 'json',
                root: 'list',//数据根节点
                totalProperty: 'total' //最大条数
            }
        }
    });
    /**
     * 累计费用明细 大修 tab1 数据源
     * @type {Ext.data.Store}
     */
    var haulStore = Ext.create('Ext.data.Store', {
        pageSize: 100,
        id: 'haulStore',
        autoLoad: false,
        fields: ['V_GUID', 'I_YEAR', 'I_MONTH', 'V_PROJECTCODE', 'V_PROJECTNAME', 'V_EQUIP_NAME', 'V_FUNC_LOC', 'SUM_MONEY'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_0106/PRO_PM_0106_OVERHUAL_LEDGER',
            actionMethods: {
                read: "POST"
            },
            reader: {
                type: 'json',
                root: 'list',//数据根节点
                totalProperty: 'total' //最大条数
            }
        }
    });
    /**
     * 累计费用明细 大修 明细 数据源
     * @type {Ext.data.Store}
     */
    var haulDetailedStore = Ext.create('Ext.data.Store', {
        pageSize: 100,
        id: 'haulDetailedStore',
        autoLoad: false,
        fields: ['D_FACT_START_DATE', 'V_EQUIP_NAME', 'V_FUNC_LOC', 'V_ORDERID', 'V_TS', 'V_JJ', 'BJ_SH', 'SUM_MONEY'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_0106/PRO_PM_0106_OVERHUAL_DETAIL',
            actionMethods: {
                read: "POST"
            },
            reader: {
                type: 'json',
                root: 'list',//数据根节点
                totalProperty: 'total' //最大条数
            }
        }
    });

    /**
     * 累计费用明细 日修 数据源
     * @type {Ext.data.Store}
     */
    var dailyStore = Ext.create('Ext.data.Store', {
        pageSize: 100,
        id: 'dailyStore',
        autoLoad: false,
        fields: ['D_FACT_START_DATE', 'V_EQUIP_NAME', 'V_FUNC_LOC', 'V_ORDERID', 'V_TS', 'V_JJ', 'BJ_SH', 'SUM_MONEY'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_0106/PRO_PM_0106_WORKORDER_LEDGER',
            actionMethods: {
                read: "POST"
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });


    /**
     * 主表格 EXT实体
     * @type {Ext.grid.Panel}
     */
    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        region: 'center',
        columnLines: true,
        width: '100%',
        store: gridStore,
        selType: 'checkboxmodel',
        plugins : [Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit : 1
        })],
        columns: [{xtype: 'rownumberer', text: '序号', width: 70, align: 'center'},
            {text: 'ID', dataIndex: 'I_ID', hidden: true},
            {text: '作业区编码', dataIndex: 'V_DEPTCODE', align: 'center', width: '10%'},
            {text: '设备编码', dataIndex: 'V_EQUCODE', align: 'center', width: '10%'},
            {text: '设备名称', dataIndex: 'V_EQUNAME', align: 'center', width: '10%'},
            {text: '功能位置', dataIndex: 'V_EQUSITE', align: 'center', width: '10%'},
            {
                text: '固定原值',
                dataIndex: 'V_GDZ',
                align: 'center',
                width: '10%',
                editor: {xtype: 'textfield'},
                renderer: function (value, meta) {
                    meta.style = 'background-color:#e5ed5d;';
                    return value;
                }
            },
            {
                text: '残值',
                dataIndex: 'V_CZ',
                align: 'center',
                width: '10%',
                editor: {xtype: 'textfield'},
                renderer: function (value, meta) {
                    meta.style = 'background-color:#e5ed5d;';
                    return value;
                }
            },
            {text: '作业量', dataIndex: 'V_SUM_ZYL', align: 'center', width: '10%'},
            {
                text: '累计维修费用', dataIndex: 'V_SUM_WXF', align: 'center', width: '10%',
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    return "<a  href='javascript:pm0106Function.detailedSum()'>" + value + "</a>";
                }
            }
        ],
        listeners: {"edit": edit},
        autoScroll: true,

        bbar: [
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true,
                displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                emptyMsg: '没有记录',
                store: 'gridStore'
            },
             '->',
            {
                xtype: 'label',
                id: 'gridSum'
            }]
    });

    var haulGrid = Ext.create('Ext.grid.Panel', {
        id: 'haulGrid',
        region: 'center',
        columnLines: true,
        width: '100%',
        // height: 600,
        store: haulStore,
        selType: 'checkboxmodel',
        columns: [{xtype: 'rownumberer', text: '序号', width: 70, align: 'center'},
            {text: 'guid', dataIndex: 'V_GUID', hidden: true},
            {text: '年份', dataIndex: 'I_YEAR', align: 'center', width: '10%'},
            {text: '月份', dataIndex: 'I_MONTH', align: 'center', width: '10%'},
            {text: '工程编号', dataIndex: 'V_PROJECTCODE', align: 'center', width: '10%'},
            {text: '工程名称', dataIndex: 'V_PROJECTNAME', align: 'center', width: '10%'},
            {text: '设备名称', dataIndex: 'V_EQUIP_NAME', align: 'center', width: '10%'},
            {text: '功能位置', dataIndex: 'V_FUNC_LOC', align: 'center', width: '10%'},
            {text: '维修内容', dataIndex: '', align: 'center', width: '10%'},
            {
                text: '修理费', dataIndex: 'SUM_MONEY', align: 'center', width: '10%',
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    return "<a  href='javascript:pm0106Function.detailedHaul()'>" + value + "</a>";
                }
            }
        ],
        autoScroll: true,

        bbar: [
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true,
                displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                emptyMsg: '没有记录',
                store: 'haulStore'
            }
            ,'->',
            {
                xtype: 'label',
                id: 'haulSum'
            }]
    });

    var dailyGrid = Ext.create('Ext.grid.Panel', {
        id: 'dailyGrid',
        region: 'center',
        columnLines: true,
        width: '100%',
        // height: 600,
        store: dailyStore,
        features: [{
            ftype: 'summary'
        }],
        selType: 'checkboxmodel',
        columns: [{xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text: '维修时间', dataIndex: 'D_FACT_START_DATE', align: 'center', width: '9.5%'},
            {text: '设备名称', dataIndex: 'V_EQUIP_NAME', align: 'center', width: '9.5%'},
            {text: '功能位置', dataIndex: 'V_FUNC_LOC', align: 'center', width: '9.5%'},
            {text: '工单号', dataIndex: 'V_ORDERID', align: 'center', width: '9.5%'},
            {text: '维修内容', dataIndex: '', align: 'center', width: '9.5%'},
            {text: '工时合计', dataIndex: 'V_TS', align: 'center', width: '9.5%'},
            {text: '机具合计', dataIndex: 'V_JJ', align: 'center', width: '9.5%'},
            {text: '备件损耗', dataIndex: 'BJ_SH', align: 'center', width: '9.5%'},
            {
                text: '合计费用', dataIndex: 'SUM_MONEY', align: 'center', width: '10%',
                summaryType: 'sum',
                summaryRenderer: function (value) {
                    return Ext.util.Format.number(value, '0000.00');
                }
            }
        ],
        autoScroll: true,

        bbar: [
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true,
                displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                emptyMsg: '没有记录',
                store: 'dailyStore'
            }
            ,'->',
           {
                xtype: 'label',
                id: 'dailySum'
            }]
    });


    var haulDetailedGrid = Ext.create('Ext.grid.Panel', {
        id: 'haulDetailedGrid',
        region: 'center',
        columnLines: true,
        width: '100%',
        // height: 450,
        store: haulDetailedStore,
        selType: 'checkboxmodel',
        columns: [{xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text: '维修时间', dataIndex: 'D_FACT_START_DATE', align: 'center', width: '9.5%'},
            {text: '设备名称', dataIndex: 'V_EQUIP_NAME', align: 'center', width: '9.5%'},
            {text: '功能位置', dataIndex: 'V_FUNC_LOC', align: 'center', width: '9.5%'},
            {text: '工单号', dataIndex: 'V_ORDERID', align: 'center', width: '9.5%'},
            {text: '维修内容', dataIndex: '', align: 'center', width: '9.5%'},
            {text: '工时合计', dataIndex: 'V_TS', align: 'center', width: '9.5%'},
            {text: '机具合计', dataIndex: 'V_JJ', align: 'center', width: '9.5%'},
            {text: '备件损耗', dataIndex: 'BJ_SH', align: 'center', width: '9.5%'},
            {text: '合计费用', dataIndex: 'SUM_MONEY', align: 'center', width: '10%'}
        ],
        autoScroll: true,

        bbar: [
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true,
                displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                emptyMsg: '没有记录',
                store: 'haulDetailedStore'
            }
            ,'->',
           {
                xtype: 'label',
                id: 'haulDetailedSum'
            }]
    });


    var detailedTab = Ext.createWidget('tabpanel', {
        // activeTab: 'tab1',                       //指定默认的活动tab
        // width: 600,
        // height: 320,
        layout: 'border',
        plain: true,                        //True表示tab候选栏上没有背景图片（默认为false）
        enableTabScroll: true,              //选项卡过多时，允许滚动
        defaults: {autoScroll: true},
        items: [{
            layout:"border",
            id: "tab1",
            title: '大修',
            items: [haulGrid]
        }, {
            layout:"border",
            id: "tab2",
            title: '日修',
            items: [dailyGrid]
        }]
    });
    var panel = Ext.create('Ext.panel.Panel', {
        id: 'panellow',
        region: 'north',
        defaults: {
            style: 'margin:5px 0px 5px 5px',
            labelAlign: 'right'
        },
        frame: true,
        layout: 'column',
        items: [
            {
                id: 'ck',
                xtype: 'combo',
                store: ckstore,
                editable: false,
                fieldLabel: '单位选择',
                labelWidth: 100,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local',
                baseCls: 'margin-bottom',
                listeners: {
                    change: function () {
                        Ext.data.StoreManager.lookup('zyqstore').load({
                            params: {
                                IS_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                                IS_V_DEPTTYPE: '[主体作业区]'
                            }
                        });
                    }
                }
            }, {
                id: 'zyq',
                xtype: 'combo',
                store: zyqstore,
                editable: false,
                fieldLabel: '作业区',
                labelWidth: 100,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local',
                baseCls: 'margin-bottom',
                listeners: {
                    change: function () {
                        Ext.data.StoreManager.lookup('ssblx').load({
                            params: {
                                V_V_DEPTCODENEXT: Ext.getCmp("zyq").getValue()
                            }
                        });
                    }
                }
            },

            {
                id: 'sblx',
                xtype: 'combo',
                store: ssblx,
                editable: false,
                fieldLabel: '设备类型',
                labelWidth: 100,
                displayField: 'V_EQUTYPENAME',
                valueField: 'V_EQUTYPECODE',
                queryMode: 'local',
                baseCls: 'margin-bottom',
                listeners: {
                    change: function () {
                        Ext.data.StoreManager.lookup('ssbmc').load({
                            params: {
                                V_V_DEPTCODENEXT: Ext.getCmp("zyq").getValue(),
                                V_V_EQUTYPECODE: Ext.getCmp("sblx").getValue()
                            }
                        });
                    }
                }
            }, {
                id: 'sbmc',
                xtype: 'combo',
                store: ssbmc,
                editable: false,
                fieldLabel: '设备名称',
                labelWidth: 100,
                displayField: 'V_EQUNAME',
                valueField: 'V_EQUCODE',
                queryMode: 'local',
                baseCls: 'margin-bottom'
            },

            {
                xtype: 'button',
                text: '查询',
                //pass
                handler: function () {
                    Ext.data.StoreManager.lookup('gridStore').load(
                        {
                            params: {
                                V_V_ORGCODE: Ext.getCmp('ck').getValue(),
                                V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
                                V_V_EQUCODE: Ext.getCmp('sbmc').getValue()
                            },
                            callback:function(r,options,success){
                                var reader = Ext.StoreMgr.get('gridStore').getProxy().getReader();
                                if(reader.jsonData.list.length>0) {
                                    var sum_all = reader.jsonData.list[0].SUM_ALL;
                                    Ext.getCmp('gridSum').setText("费用合计:" + sum_all);
                                }
                            }
                        }
                    );
                }
            }]
    });

    /**
     * 累计明细 弹出win
     * @type {Ext.window.Window}
     */
    extSumWin = new Ext.window.Window({
        title: "累计维修费用明细",
        id: 'extWin',
        width: extWin_w1,
        height: extWin_h1,
        closeAction: "hide",
        modal: true,  //遮罩 :就是让form表单以外不能编辑
        constrain: true,  //限制拖动范围
        resizable: true,  //可调整大小的; 可变尺寸的
        bodyPadding: 10,
        border: false,
        buttonAlign: "center",    //按钮显示位置
        layout: "fit",
        items: [detailedTab]  //装进来

    });

    /**
     * 累计明细 弹出win
     * @type {Ext.window.Window}
     */
    extHaulWin = new Ext.window.Window({
        title: "大修明细",
        id: 'extHaulWin',
        width: extWin_w2,
        height: extWin_h2,
        closeAction: "hide",
        modal: true,  //遮罩 :就是让form表单以外不能编辑
        constrain: true,  //限制拖动范围
        resizable: true,  //可调整大小的; 可变尺寸的
        bodyPadding: 10,
        border: false,
        buttonAlign: "center",    //按钮显示位置
        layout: "fit",
        items: [haulDetailedGrid]  //装进来

    });

    Ext.data.StoreManager.lookup('ckstore').on('load', function () {
        Ext.getCmp('ck').select(Ext.data.StoreManager.
        lookup('ckstore').getAt(0));
    });

    Ext.data.StoreManager.lookup('zyqstore').on('load', function () {
        zyqstore.insert(0, {V_DEPTNAME: '全部', V_DEPTCODE: '%'});
        Ext.getCmp('zyq').select(Ext.data.StoreManager.
        lookup('zyqstore').getAt(0));
    });

    Ext.data.StoreManager.lookup('ssblx').on('load', function () {
        Ext.getCmp('sblx').select(Ext.data.StoreManager.
        lookup('ssblx').getAt(0));
    });

    Ext.data.StoreManager.lookup('ssbmc').on('load', function () {
        Ext.getCmp('sbmc').select(Ext.data.StoreManager.
        lookup('ssbmc').getAt(0));
    });



    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel, grid]
    });
    // Ext.getCmp('grid').setHeight(Ext.getCmp('panellow').getHeight() - 126);


});