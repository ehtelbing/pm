var projectClassStoreLoad = false;
var V_CLASS_CODE = "";
var V_PROJ_CODE = '';
var V_ITEM_CODE = '';
var V_ITEM_DESC = '';
var V_DINGE_CODE = '';
var V_MACHINE_TYPE = '';
var V_MACHINE_CODE = '';
var V_MACHINE_DESC = '';

Ext.define('Ext.ux.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    async: true,
    doRequest: function (operation, callback, scope) {
        var writer = this.getWriter(),
            request = this.buildRequest(operation);
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
    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果

    var projectClassStore = Ext.create('Ext.data.Store', {
        storeId: 'projectClassStore',
        autoLoad: true,
        pageSize: -1,
        fields: ['CLASS_CODE', 'CLASS_DESC'],
        proxy: {
            url: AppUrl + 'mwd/GET_PROJECT_CLASS_LIST',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'RET'
            }
        },
        listeners: {
            load: function (store, records) {
                projectClassStoreLoad = true;
                Ext.getCmp('V_CLASS_CODE').select(store.first());
                _init();
            }
        }
    });

    var projectStore = Ext.create('Ext.data.Store', {
        storeId: 'projectStore',
        autoLoad: false,
        pageSize: -1,
        fields: ['PROJ_CODE', 'PROJ_DESC'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            url: AppUrl + 'mwd/GET_PROJECT_LIST',
            async : false,
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'RET'
            }
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('V_PROJ_CODE').select(store.first());
            }
        }
    });

    var projBudgetItemTableStore = Ext.create('Ext.data.Store', {
        storeId: 'projBudgetItemTableStore',
        autoLoad: false,
        pageSize: 100,
        fields: ['MAIN_ID', 'MAIN_CODE', 'ITEM_CODE', 'MACHINE_TYPE', 'MACHINE_CODE', 'MACHINE_DESC', 'PERSON_MONEY', 'MAT_MONEY', 'JX_MONEY', 'F_MONEY', 'MAIN_REMARK', 'VERSION_NUM', 'VERSION_STATUS_DESC', 'CLASS_CODE', 'CLASS_DESC', 'PROJ_CODE', 'PROJ_DESC', 'ITEM_DESC'],
        proxy: {
            url: AppUrl + 'mwd/GET_PROJ_BUDGET_ITEM_TABLE',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'RET',
                total: 'total'
            }
        }
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        border: false,
        frame: true,
        region: 'north',
        //title: '<div align="center"></div>',
        width: '100%',
        //height: 50,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'combo',
                id: 'V_CLASS_CODE',
                store: projectClassStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '工程大类',
                displayField: 'CLASS_DESC',
                valueField: 'CLASS_CODE',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 5px 0px 5px',
                labelAlign: 'right',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectProject();
                    }
                }
            }, {
                xtype: 'combo',
                id: 'V_PROJ_CODE',
                store: projectStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '检修工程',
                displayField: 'PROJ_DESC',
                valueField: 'PROJ_CODE',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 5px 0px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_ITEM_CODE',
                editable: false,
                readOnly: true,
                queryMode: 'local',
                fieldLabel: '项目代码',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 5px 0px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_ITEM_DESC',
                editable: false,
                readOnly: true,
                queryMode: 'local',
                fieldLabel: '项目描述',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 5px 0px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'V_DINGE_CODE',
                editable: false,
                readOnly: true,
                queryMode: 'local',
                fieldLabel: '定额代码',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 5px 0px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_MACHINE_TYPE',
                editable: false,
                readOnly: true,
                queryMode: 'local',
                fieldLabel: '主机规格型号',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 5px 0px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_MACHINE_CODE',
                editable: false,
                readOnly: true,
                queryMode: 'local',
                fieldLabel: '主机代码',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 5px 0px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_MACHINE_DESC',
                editable: false,
                readOnly: true,
                queryMode: 'local',
                fieldLabel: '主机名',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 5px 0px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'button',
                text: '查询',
                align: 'center',
                handler: _selectProjBudgetItemTable,
                width: 80,
                style: ' margin: 5px 5px 5px 30px',
                icon: imgpath + '/search.png'
            }, {
                xtype: 'button',
                text: '导出',
                handler: _exportExcel,
                width: 80,
                style: ' margin: 5px 5px 5px 5px',
                icon: imgpath + '/311.gif'
            }, {
                xtype: 'tbtext',
                text: '<span style="color:red; font-size:12px">*双击行，显示“预算详细信息查看”页面。</span>',
                style: ' margin: 10px 0px 0px 10px'
            }]
        }]
    });

    var gridPanel = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel',
        title: '<div align="center">定额预算表</div>',
        store: projBudgetItemTableStore,
        frame: true,
        features : {
            ftype:'summary'
        },
        columnLines: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '工程大类',
            dataIndex: 'CLASS_DESC',
            align: 'center',
            width: 80,
            summaryType : 'sum',
            summaryRenderer : function(value) {
                return '总计:';
            },
            renderer: atleft
        }, {
            text: '工程代码',
            dataIndex: 'PROJ_CODE',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '工程描述',
            dataIndex: 'PROJ_DESC',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '项目描述',
            dataIndex: 'ITEM_DESC',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '定额代码',
            dataIndex: 'MAIN_CODE',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '主机规格型号',
            dataIndex: 'MACHINE_TYPE',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '主机名称',
            dataIndex: 'MACHINE_DESC',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '材料备件费',
            dataIndex: 'MAT_MONEY',
            align: 'center',
            summaryType : 'sum',
            width: 80,
            renderer: atright
        }, {
            text: '人工费',
            dataIndex: 'PERSON_MONEY',
            align: 'center',
            summaryType : 'sum',
            width: 100,
            renderer: atright
        }, {
            text: '机械费',
            dataIndex: 'JX_MONEY',
            align: 'center',
            summaryType : 'sum',
            width: 80,
            renderer: atright
        }, {
            text: '总金额',
            dataIndex: 'F_MONEY',
            align: 'center',
            summaryType : 'sum',
            width: 100,
            renderer: atright
        }, {
            text: '备注说明',
            dataIndex: 'MAIN_REMARK',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '版本号',
            dataIndex: 'VERSION_NUM',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '版本状态',
            dataIndex: 'VERSION_STATUS_DESC',
            align: 'center',
            width: 80,
            renderer: atleft
        }],
        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: projBudgetItemTableStore,
            dock: 'bottom',
            displayInfo: true
        }],
        listeners : {
            itemdblclick : function(panel, record, item, index, e, eOpts) {
                _viewDetail();
            }
        }
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

    _init();
});

function _init() {
    if (projectClassStoreLoad) {

        _selectProjBudgetItemTable();
        Ext.getBody().unmask();//去除页面笼罩
    }

}

function _selectProject() {
    var projectStore = Ext.data.StoreManager.lookup('projectStore');
    projectStore.proxy.extraParams = {
        'V_CLASS_CODE': Ext.getCmp('V_CLASS_CODE').getValue()
    };

    projectStore.load();
}

function _selectProjBudgetItemTable() {
    V_CLASS_CODE = Ext.getCmp('V_CLASS_CODE').getValue();
    V_PROJ_CODE = Ext.getCmp('V_PROJ_CODE').getValue();
    V_ITEM_CODE = Ext.getCmp('V_ITEM_CODE').getValue();
    V_ITEM_DESC = Ext.getCmp('V_ITEM_DESC').getValue();
    V_DINGE_CODE = Ext.getCmp('V_DINGE_CODE').getValue();
    V_MACHINE_TYPE = Ext.getCmp('V_MACHINE_TYPE').getValue();
    V_MACHINE_CODE = Ext.getCmp('V_MACHINE_CODE').getValue();
    V_MACHINE_DESC = Ext.getCmp('V_MACHINE_DESC').getValue();

    var projBudgetItemTableStore = Ext.data.StoreManager.lookup('projBudgetItemTableStore');
    projBudgetItemTableStore.proxy.extraParams = {
        V_CLASS_CODE: V_CLASS_CODE,
        V_PROJ_CODE: V_PROJ_CODE,
        V_ITEM_CODE: V_ITEM_CODE,
        V_ITEM_DESC: V_ITEM_DESC,
        V_DINGE_CODE: V_DINGE_CODE,
        V_MACHINE_TYPE: V_MACHINE_TYPE,
        V_MACHINE_CODE: V_MACHINE_CODE,
        V_MACHINE_DESC: V_MACHINE_DESC

    };
    projBudgetItemTableStore.currentPage = 1;
    projBudgetItemTableStore.load();
}

function _viewDetail() {
    var records = Ext.getCmp('gridPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }
    window.open(AppUrl + 'page/BD020101/index.html?V_DINGE_ID='+records[0].get('MAIN_ID'), '', 'height=600px,width=1000px,top=50px,left=100px,resizable=yes');
}

function _exportExcel() {
    document.location.href = AppUrl + 'mwd/GET_PROJ_BUDGET_ITEM_TABLE_EXCEL?V_CLASS_CODE=' + V_CLASS_CODE + '&V_PROJ_CODE=' +
    V_PROJ_CODE + '&V_ITEM_CODE=' + encodeURI(encodeURI(V_ITEM_CODE)) + '&V_ITEM_DESC=' + encodeURI(encodeURI(V_ITEM_DESC)) + '&V_DINGE_CODE=' +
    encodeURI(encodeURI(V_DINGE_CODE)) + '&V_MACHINE_TYPE=' + encodeURI(encodeURI(V_MACHINE_TYPE)) + '&V_MACHINE_CODE=' +
    encodeURI(encodeURI(V_MACHINE_CODE)) + '&V_MACHINE_DESC=' + encodeURI(encodeURI(V_MACHINE_DESC));
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}