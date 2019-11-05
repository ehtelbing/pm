QueryCheckAlertMsg = "请填写当前设备";

var STATUS_ARR = [];
STATUS_ARR.push({
    "STATUS_CODE": "0",
    "STATUS": "停用"
});
STATUS_ARR.push({
    "STATUS_CODE": "1",
    "STATUS": "启用"
});

/**
 * 状态数据集
 */
var statusStore = Ext.create('Ext.data.Store', {
    fields: ['STATUS_CODE', 'STATUS'],
    data: STATUS_ARR,
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
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
        url: AppUrl + 'Zyk/PRO_BASE_DEPT_VIEW',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
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
        url: AppUrl + 'Zyk/PRO_BASE_DEPT_VIEW',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var gridStore = Ext.create('Ext.data.Store', {
    id: 'gridStore',
    pageSize: 15,
    autoLoad: false,
    fields: ['EQU_ID', 'EQU_DESC', 'USERID', 'USERNAME', 'PP_CODE', 'STATUS',
        'PLANTCODE', 'DEPARTCODE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'Zyk/PRO_RUN7121_SELECTEQULIST',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list',
            total: 'total'
        }
    }
});

/** ****************页面布局******************* */

var queryPanel = Ext.create('Ext.panel.Panel', {
    id: 'queryPanel',
    width: '100%',
    region: 'north',
    frame: true,
    layout: 'column',
    items: [{
        xtype: 'combo',
        id: "selPlant",
        store: selPlantstore,
        editable: false,
        queryMode: 'local',
        fieldLabel: '厂矿',
        displayField: 'V_DEPTNAME',
        valueField: 'V_DEPTCODE',
        labelWidth: 70,
        style: ' margin: 5px 0px 0px 10px',
        labelAlign: 'right'
    }, {
        xtype: 'combo',
        id: "selSection",
        store: selSectionstore,
        editable: false,
        queryMode: 'local',
        fieldLabel: '作业区',
        displayField: 'V_DEPTNAME',
        valueField: 'V_DEPTCODE',
        labelWidth: 60,
        style: ' margin: 5px 0px 5px 10px',
        labelAlign: 'right'
    }, {
        xtype: 'hidden',
        id: 'nowDevice_Id'
    }, {
        xtype: 'hidden',
        id: 'nowDevice_Site'
    }, {
        xtype: 'button',
        text: '查询',
        icon: imgpath + '/search.png',
        width: 80,
        style: ' margin: 5px 0px 0px 10px',
        handler: function () {
            if (Ext.getCmp('selSection').getValue() == "%") {
                Ext.example.msg('操作信息', '请选择作业区');
                return;
            } else {
                query();
            }
        }
    }]
});

var buttonPanel = Ext.create('Ext.panel.Panel',
    {
        id: 'buttonPanel',
        width: '100%',
        region: 'north',
        frame: true,
        layout: 'column',
        items: [
            {
                id: 'insert',
                xtype: 'button',
                text: '新增',
                icon: imgpath + '/add.png',
                width: 80,
                style: ' margin: 5px 0px 5px 10px',
                listeners: {
                    click: function () {
                        Ext.getCmp('operateWindow').show();
                        Ext.getCmp('operateWindow').setTitle('新增');
                        Ext.ComponentManager.get('equId').setReadOnly(
                            false);
                        Ext.ComponentManager.get('status').select(
                            statusStore.getAt(1));
                        Ext.ComponentManager.get('operateType')
                            .setValue('create');
                    }
                }
            },
            {
                id: 'modify',
                xtype: 'button',
                text: '修改',
                icon: imgpath + '/edit.png',
                width: 80,
                style: ' margin: 5px 0px 0px 10px',
                listeners: {
                    click: function () {
                        var selection = Ext.getCmp('grid')
                            .getSelectionModel().getSelection();
                        var length = selection.length;
                        if (length != 1) {
                            Ext.example.msg('操作信息', '请选择一条数据修改');
                            return;
                        } else {
                            Ext.getCmp('operateWindow').show();

                            var selectedRecord = selection[0].data;
                            Ext.getCmp('equId').setValue(
                                selectedRecord.EQU_ID);
                            Ext.getCmp('equName').setValue(
                                selectedRecord.EQU_DESC);
                            Ext.getCmp('userId').setValue(
                                selectedRecord.USERID);
                            Ext.getCmp('userName').setValue(
                                selectedRecord.USERNAME);
                            Ext.getCmp('sysCode').setValue(
                                selectedRecord.PP_CODE);
                            Ext.getCmp('status').setValue(
                                selectedRecord.STATUS);
                        }
                        Ext.ComponentManager.get('equId').setReadOnly(
                            true);
                        Ext.ComponentManager.get('operateType')
                            .setValue('modify');
                        Ext.getCmp('operateWindow').setTitle('修改');
                    }
                }
            }]
    });

var grid = Ext.create('Ext.grid.Panel', {
    id: 'grid',
    region: 'center',
    columnLines: true,
    width: '100%',
    store: gridStore,
    autoScroll: true,
    selType: 'checkboxmodel',
    height: 400,
    columns: [{
        xtype: 'rownumberer',
        text: '序号',
        width: 35,
        sortable: false
    }, {
        text: '设备编码',
        width: 130,
        dataIndex: 'EQU_ID',
        align: 'center',
        renderer: atleft
    }, {
        text: '设备描述',
        width: 150,
        dataIndex: 'EQU_DESC',
        align: 'center',
        renderer: atleft
    }, {
        text: '所属厂矿',
        width: 100,
        dataIndex: 'PLANTCODE',
        align: 'center',
        renderer: atleft
    }, {
        text: '所属作业区',
        width: 100,
        dataIndex: 'DEPARTCODE',
        type: 'date',
        renderer: atleft
    }, {
        text: '设备负责人ID',
        width: 100,
        dataIndex: 'USERID',
        align: 'center',
        renderer: atleft
    }, {
        text: '负责人',
        width: 100,
        dataIndex: 'USERNAME',
        type: 'date',
        renderer: atleft
    }, {
        text: '生产系统编码',
        width: 120,
        dataIndex: 'PP_CODE',
        renderer: atleft
    }, {
        text: '状态',
        width: 300,
        dataIndex: 'STATUS',
        align: 'center',
        renderer: changeStatusRender
    }, {
        dataIndex: 'ID',
        hidden: true
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        displayInfo: true,
        displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
        emptyMsg: '没有记录',
        store: 'gridStore'
    }]
});

var operateWindowPanel = Ext.create('Ext.panel.Panel', {
    frame: true,
    layout: {
        type: 'table',
        columns: 1
    },
    defaults: {
        bodyStyle: 'padding:20px'
    },
    items: [{
        xtype: 'textfield',
        fieldLabel: '设备ID',
        id: 'equId',
        labelAlign: 'left',
        style: ' margin: 5px 0px 5px 10px',
        labelWidth: 100,
        width: 260
    }, {
        xtype: 'textfield',
        fieldLabel: '设备名称',
        id: 'equName',
        labelAlign: 'left',
        style: ' margin: 5px 0px 5px 10px',
        labelWidth: 100,
        width: 260
    }, {
        xtype: 'textfield',
        fieldLabel: '设备负责人ID',
        id: 'userId',
        labelAlign: 'left',
        style: ' margin: 5px 0px 5px 10px',
        labelWidth: 100,
        width: 260
    }, {
        xtype: 'textfield',
        fieldLabel: '负责人',
        id: 'userName',
        labelAlign: 'left',
        style: ' margin: 5px 0px 5px 10px',
        labelWidth: 100,
        width: 260
    }, {
        xtype: 'textfield',
        fieldLabel: '生产系统编码',
        id: 'sysCode',
        labelAlign: 'left',
        style: ' margin: 5px 0px 5px 10px',
        labelWidth: 100,
        width: 260
    }, {
        xtype: 'combo',
        store: statusStore,
        fieldLabel: '状态',
        id: 'status',
        labelAlign: 'left',
        labelWidth: 100,
        width: 260,
        editable: false,
        style: ' margin: 5px 0px 5px 10px',
        queryMode: 'local',
        displayField: 'STATUS',
        valueField: 'STATUS_CODE'
    }, {
        xtype: 'hidden',
        id: 'operateType'
    }],
    buttons: [{
        text: '保存',
        handler: saveClick
    }, {
        text: '关闭',
        handler: function () {
            Ext.getCmp('operateWindow').hide();
        }
    }]
});

var operateWindow = Ext.create('Ext.window.Window', {
    width: 400,
    height: 350,
    layout: 'fit',
    id: 'operateWindow',
    closeAction: 'hide',
    closable: true,
    listeners: {
        show: {// 窗口加载将窗口数据清空
            fn: function () {
                Ext.ComponentManager.get('equId').setValue('');
                Ext.ComponentManager.get('equName').setValue('');
                Ext.ComponentManager.get('userId').setValue('');
                Ext.ComponentManager.get('userName').setValue('');
                Ext.ComponentManager.get('sysCode').setValue('');
                Ext.ComponentManager.get('status').setValue('');
            }
        }
    },
    items: [operateWindowPanel]

});

/**
 * 整体布局
 */
var Layout = {
    id: "id",
    layout: 'border',
    items: [queryPanel, buttonPanel, grid]
};

Ext.onReady(onPageLoaded);

/** ****************执行方法******************* */

/**
 * 初始加载页面
 */
function onPageLoaded() {
    // 显示整体布局
    Ext.create('Ext.container.Viewport', Layout);

    Ext.data.StoreManager.lookup('selPlantstore')
        .on(
            "load",
            function () {
                Ext.getCmp("selPlant").select(
                    Ext.data.StoreManager.lookup('selPlantstore')
                        .getAt(0));

                Ext.data.StoreManager.lookup('selSectionstore').load(
                    {
                        params: {
                            V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                            V_V_DEPTTYPE: '[主体作业区]'
                        }
                    });
            });
    Ext.data.StoreManager.lookup('selSectionstore').on(
        "load",
        function () {
            Ext.getCmp("selSection").select(
                Ext.data.StoreManager.lookup('selSectionstore')
                    .getAt(0));
            // 刷新数据
            query();
        });
    Ext.getCmp('selPlant').on("change", function () {
        Ext.data.StoreManager.lookup('selSectionstore').removeAll();
        Ext.data.StoreManager.lookup('selSectionstore').load({
            params: {
                V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                V_V_DEPTTYPE: '[主体作业区]'
            }
        });
    });

};

function query() {
    if (Ext.getCmp('selPlant').getValue() != ''
        && Ext.getCmp('selPlant').getValue() != null
        && Ext.getCmp('selSection').getValue() != ''
        && Ext.getCmp('selSection').getValue() != null) {
        Ext.data.StoreManager.lookup('gridStore').load(
            {
                params: {
                    V_DEPARTCODE: Ext.getCmp('selSection').getValue(),
                    V_PLANTCODE: Ext.getCmp('selPlant').getValue()

                }
            });
    } else {
        Ext.example.msg('操作信息', QueryCheckAlertMsg);
    }
}

function saveClick() {
    var equId = Ext.getCmp('equId').getValue();
    var equName = Ext.getCmp('equName').getValue();
    if (equId == "" || equId == null || equName == "" || equName == null) {
        Ext.example.msg('操作信息', '请填写设备ID和设备名称');
    } else {
        if (Ext.ComponentManager.get('operateType').getValue() == 'create') {
            create();
        } else if (Ext.ComponentManager.get('operateType').getValue() == 'modify') {
            modify();
        }
    }
}

function create() {
    Ext.Ajax.request({
        url: AppUrl + 'Zyk/PRO_RUN7121_GETEQULIST',
        method: 'POST',
        params: {
            V_EQU_ID: Ext.getCmp('equId').getValue()
        },
        success: function (resp) {
            resp = Ext.decode(resp.responseText);
            if (resp[0] != "1") {
                Ext.Ajax.request({
                    url: AppUrl + 'Zyk/PRO_RUN7121_ADDEQU',
                    method : 'POST',
                    params : {
                        V_EQU_ID: Ext.getCmp('equId').getValue(),
                        V_EQU_DESC: Ext.getCmp('equName').getValue(),
                        V_DEPARTCODE: Ext.getCmp('selSection').getValue(),
                        V_PLANTCODE: Ext.getCmp('selPlant').getValue(),
                        V_USERID: Ext.getCmp('userId').getValue(),
                        V_USERNAME: Ext.getCmp('userName').getValue(),
                        V_STATUS: Ext.getCmp('status').getValue(),
                        V_PP_CODE: Ext.getCmp('sysCode').getValue()
                    },
                    success: function (resp) {
                        resp = Ext.decode(resp.responseText);
                        if (resp.OUT_RESULT  == 'success') {
                            Ext.example.msg('操作信息', '操作成功');
                            Ext.getCmp('operateWindow').hide();
                            query();
                        } else {
                            Ext.example.msg('操作信息', '操作失败');
                        }
                    }
                });
            } else {
                Ext.example.msg('操作信息', '设备编号已存在请重新填写');
            }
        }
    });

}

function modify() {
    Ext.Ajax.request({
        url: AppUrl + 'Zyk/PRO_RUN7121_UPDATEEQU',
        method : 'POST',
        params : {
            V_EQU_ID: Ext.getCmp('equId').getValue(),
            V_EQU_DESC: Ext.getCmp('equName').getValue(),
            V_USERID: Ext.getCmp('userId').getValue(),
            V_USERNAME: Ext.getCmp('userName').getValue(),
            V_STATUS: Ext.getCmp('status').getValue(),
            V_PP_CODE: Ext.getCmp('sysCode').getValue()
        },
        success: function (resp) {
            resp = Ext.decode(resp.responseText);
            if (resp.OUT_RESULT == 'success') {
                Ext.example.msg('操作信息', '操作成功');
                Ext.getCmp('operateWindow').hide();
                query();
            } else {
                Ext.example.msg('操作信息', '操作失败');
            }
        }
    });
}

function changeStatus(code, status) {
    var url = '';
    if (status == '1') {
        url = AppUrl + 'Zyk/PRO_RUN7121_STOP';
    } else if (status == '0') {
        url = AppUrl + 'Zyk/PRO_RUN7121_STARTEQU';
    }

    Ext.Ajax.request({
        url: url,
        async: false,
        method: 'POST',
        params: {
            V_EQU_ID: code
        },
        success: function (resp) {
            resp = Ext.decode(resp.responseText);
            if (resp.OUT_RESULT == 'success') {
                query();
            }
        }
    });
}

function changeStatusRender(value, metaData, record, rowIndex, colIndex, store) {
    return '<a href="javascript:changeStatus(\'' + record.data.EQU_ID + '\',\''
        + record.data.STATUS + '\')">' + (value == '0' ? "停用" : "启用")
        + '</a>';
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}