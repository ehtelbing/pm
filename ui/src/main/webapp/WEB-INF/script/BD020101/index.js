var V_DINGE_ID = '';
if (location.href.split('?')[1] != null) {
    V_DINGE_ID = Ext.urlDecode(location.href.split('?')[1]).V_DINGE_ID;
}

var projectBudgetItemMessageLoad = false;
var projectBudgetItemPerStoreLoad = false;
var projectBudgetItemJXStoreLoad = false;
var projectBudgetItemMatStoreLoad = false;
var projectBudgetItemMessage;

Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果

    Ext.Ajax.request({
        url: AppUrl + 'mwd/GET_PROJECT_BUDGET_ITEM_MESSAGE',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_DINGE_ID': V_DINGE_ID
        },
        callback: function (options, success, response) {
            if (success) {
                var data = Ext.decode(response.responseText);
                if (data.RET != '') {
                    projectBudgetItemMessage = data.RET;
                }
            }
            projectBudgetItemMessageLoad = true;
            _init();
        }
    });

    var projectBudgetItemPerStore = Ext.create('Ext.data.Store', {
        storeId: 'projectBudgetItemPerStore',
        autoLoad: true,
        pageSize: -1,
        fields: ['PERSON_ID', 'GZ_CODE', 'GZ_DESC', 'UNIT', 'WORK_HOUR', 'PERSON_AMOUNT', 'F_PRICE', 'F_MONEY', 'PERSON_REMARK'],
        proxy: {
            url: AppUrl + 'mwd/GET_PROJECT_BUDGET_ITEM_PER_TABLE',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                'V_DINGE_ID': V_DINGE_ID
            },
            reader: {
                type: 'json',
                root: 'RET'
            }
        },
        listeners: {
            load: function (store, records) {
                projectBudgetItemPerStoreLoad = true;
                _init();
            }
        }
    });

    var projectBudgetItemMatStore = Ext.create('Ext.data.Store', {
        storeId: 'projectBudgetItemMatStore',
        autoLoad: true,
        pageSize: -1,
        fields: ['MAT_ID', 'MAT_NO', 'MAT_DESC', 'MAT_LTEXT', 'MAT_UNIT', 'F_PRICE', 'F_AMOUNT', 'F_MONEY', 'MAT_CLASS'],
        proxy: {
            url: AppUrl + 'mwd/GET_PROJECT_BUDGET_ITEM_MAT_TABLE',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                'V_DINGE_ID': V_DINGE_ID
            },
            reader: {
                type: 'json',
                root: 'RET'
            }
        },
        listeners: {
            load: function (store, records) {
                projectBudgetItemMatStoreLoad = true;
                _init();
            }
        }
    });

    var projectBudgetItemJXStore = Ext.create('Ext.data.Store', {
        storeId: 'projectBudgetItemJXStore',
        autoLoad: true,
        pageSize: -1,
        fields: ['JX_ID', 'JX_CODE', 'JX_DESC', 'JX_UNIT', 'F_PRICE', 'F_AMOUNT', 'F_MONEY', 'JX_REMARK'],
        proxy: {
            url: AppUrl + 'mwd/GET_PROJECT_BUDGET_ITEM_JX_TABLE',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                'V_DINGE_ID': V_DINGE_ID
            },
            reader: {
                type: 'json',
                root: 'RET'
            }
        },
        listeners: {
            load: function (store, records) {
                projectBudgetItemJXStoreLoad = true;
                _init();
            }
        }
    });

    var inputPanel = Ext.create('Ext.Panel', {
        border: false,
        frame: true,
        region: 'north',
        //title: '<div align="center"></div>',
        width: '100%',
        layout: 'vbox',
        //height: 50,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'V_MAIN_CODE',
                editable: false,
                readOnly: true,
                fieldLabel: '定额代码',
                labelWidth: 70,
                width: 190,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_ITEM_CODE',
                editable: false,
                readOnly: true,
                fieldLabel: '项目代码',
                labelWidth: 70,
                width: 190,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_ITEM_DESC',
                editable: false,
                readOnly: true,
                fieldLabel: '项目描述',
                labelWidth: 70,
                width: 190,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_PROJ_CODE',
                editable: false,
                readOnly: true,
                fieldLabel: '工程代码',
                labelWidth: 70,
                width: 190,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_PROJ_DESC',
                editable: false,
                readOnly: true,
                fieldLabel: '工程名称',
                labelWidth: 70,
                width: 190,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'V_ITEM_REMARK',
                editable: false,
                readOnly: true,
                fieldLabel: '项目备注',
                labelWidth: 70,
                width: 775,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_CLASS_DESC',
                editable: false,
                readOnly: true,
                fieldLabel: '工程大类',
                labelWidth: 70,
                width: 190,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'V_MACHINE_CODE',
                editable: false,
                readOnly: true,
                fieldLabel: '主机代码',
                labelWidth: 70,
                width: 190,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_MACHINE_DESC',
                editable: false,
                readOnly: true,
                fieldLabel: '主机名称',
                labelWidth: 70,
                width: 190,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_MACHINE_TYPE',
                editable: false,
                readOnly: true,
                fieldLabel: '主机规格型号',
                labelWidth: 80,
                width: 190,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_VERSION_NUM',
                editable: false,
                readOnly: true,
                fieldLabel: '版本号',
                labelWidth: 70,
                width: 190,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_VERSION_STATUS_DESC',
                editable: false,
                readOnly: true,
                fieldLabel: '版本状态',
                labelWidth: 70,
                width: 190,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'V_PERSON_MONEY',
                editable: false,
                readOnly: true,
                fieldLabel: '人工费',
                labelWidth: 70,
                width: 190,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_MAT_MONEY',
                editable: false,
                readOnly: true,
                fieldLabel: '材料备件费',
                labelWidth: 70,
                width: 190,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_JX_MONEY',
                editable: false,
                readOnly: true,
                fieldLabel: '机械费',
                labelWidth: 70,
                width: 190,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_F_MONEY',
                editable: false,
                readOnly: true,
                fieldLabel: '总金额',
                labelWidth: 70,
                width: 190,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'V_MAIN_REMARK',
                editable: false,
                readOnly: true,
                fieldLabel: '费用备注',
                labelWidth: 70,
                width: 970,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }]
    });

    var perGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'perGridPanel',
        title: '<div align="center">人工预算明细</div>',
        store: projectBudgetItemPerStore,
        frame: true,
        columnLines: true,
        height: 150,
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '工种代码',
            dataIndex: 'GZ_CODE',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '工种名称',
            dataIndex: 'GZ_DESC',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '计算单位',
            dataIndex: 'UNIT',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '所需工时',
            dataIndex: 'WORK_HOUR',
            align: 'center',
            width: 80,
            renderer: atright
        }, {
            text: '所需人数',
            dataIndex: 'PERSON_AMOUNT',
            align: 'center',
            width: 80,
            renderer: atright
        }, {
            text: '单位价格',
            dataIndex: 'F_PRICE',
            align: 'center',
            width: 80,
            renderer: atright
        }, {
            text: '金额',
            dataIndex: 'F_MONEY',
            align: 'center',
            width: 80,
            renderer: atright
        }]
    });

    var matGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'matGridPanel',
        title: '<div align="center">主要材料备注费</div>',
        store: projectBudgetItemMatStore,
        frame: true,
        columnLines: true,
        height: 150,
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '物资码',
            dataIndex: 'MAT_NO',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '物资描述',
            dataIndex: 'MAT_DESC',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '规格型号',
            dataIndex: 'MAT_LTEXT',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '单位',
            dataIndex: 'MAT_UNIT',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '计划价',
            dataIndex: 'F_PRICE',
            align: 'center',
            width: 80,
            renderer: atright
        }, {
            text: '所需数量',
            dataIndex: 'F_AMOUNT',
            align: 'center',
            width: 80,
            renderer: atright
        }, {
            text: '金额',
            dataIndex: 'F_MONEY',
            align: 'center',
            width: 80,
            renderer: atright
        }, {
            text: '物资分类',
            dataIndex: 'MAT_CLASS',
            align: 'center',
            width: 80,
            renderer: atleft
        }]
    });

    var JXGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'JXGridPanel',
        title: '<div align="center">机械费</div>',
        store: projectBudgetItemJXStore,
        frame: true,
        columnLines: true,
        //height: 150,
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '机械代码',
            dataIndex: 'JX_CODE',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '机械描述',
            dataIndex: 'JX_DESC',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '费用单位',
            dataIndex: 'JX_UNIT',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '单价',
            dataIndex: 'F_PRICE',
            align: 'center',
            width: 80,
            renderer: atright
        }, {
            text: '所需数量',
            dataIndex: 'F_AMOUNT',
            align: 'center',
            width: 80,
            renderer: atright
        }, {
            text: '金额',
            dataIndex: 'F_MONEY',
            align: 'center',
            width: 80,
            renderer: atright
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
            items: [inputPanel, perGridPanel, matGridPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [JXGridPanel]
        }]
    });

    _init();
});

function _init() {
    if (projectBudgetItemMessageLoad && projectBudgetItemPerStoreLoad && projectBudgetItemJXStoreLoad && projectBudgetItemMatStoreLoad) {
        if (projectBudgetItemMessage == null) {
            Ext.MessageBox.show({
                title: '错误',
                msg: '信息加载失败',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
            return;
        }

        Ext.getCmp('V_MAIN_CODE').setValue(projectBudgetItemMessage[0].MAIN_CODE);
        Ext.getCmp('V_ITEM_CODE').setValue(projectBudgetItemMessage[0].ITEM_CODE);
        Ext.getCmp('V_ITEM_DESC').setValue(projectBudgetItemMessage[0].ITEM_DESC);
        Ext.getCmp('V_PROJ_CODE').setValue(projectBudgetItemMessage[0].PROJ_CODE);
        Ext.getCmp('V_PROJ_DESC').setValue(projectBudgetItemMessage[0].PROJ_DESC);
        Ext.getCmp('V_ITEM_REMARK').setValue(projectBudgetItemMessage[0].ITEM_REMARK);
        Ext.getCmp('V_CLASS_DESC').setValue(projectBudgetItemMessage[0].CLASS_DESC);
        Ext.getCmp('V_MACHINE_CODE').setValue(projectBudgetItemMessage[0].MACHINE_CODE);
        Ext.getCmp('V_MACHINE_DESC').setValue(projectBudgetItemMessage[0].MACHINE_DESC);
        Ext.getCmp('V_MACHINE_TYPE').setValue(projectBudgetItemMessage[0].MACHINE_TYPE);
        Ext.getCmp('V_VERSION_NUM').setValue(projectBudgetItemMessage[0].VERSION_NUM);
        Ext.getCmp('V_VERSION_STATUS_DESC').setValue(projectBudgetItemMessage[0].VERSION_STATUS_DESC);
        Ext.getCmp('V_PERSON_MONEY').setValue(projectBudgetItemMessage[0].PERSON_MONEY);
        Ext.getCmp('V_MAT_MONEY').setValue(projectBudgetItemMessage[0].MAT_MONEY);
        Ext.getCmp('V_JX_MONEY').setValue(projectBudgetItemMessage[0].JX_MONEY);
        Ext.getCmp('V_F_MONEY').setValue(projectBudgetItemMessage[0].F_MONEY);
        Ext.getCmp('V_MAIN_REMARK').setValue(projectBudgetItemMessage[0].MAIN_REMARK);

        Ext.getBody().unmask();//去除页面笼罩
    }

}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}