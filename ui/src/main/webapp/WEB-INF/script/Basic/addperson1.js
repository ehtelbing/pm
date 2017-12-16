var depart = '';
var classcode = ';'
if (location.href.split('?')[1] != undefined) {
    depart = Ext.urlDecode(location.href.split('?')[1]).depart;
    classcode = Ext.urlDecode(location.href.split('?')[1]).classcode;
}

var roleStore = Ext.create('Ext.data.Store', {
    storeId: 'roleStore',
    autoLoad: true,
    fields: ['V_ROLENAME', 'V_ROLECODE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'zdh/role_sel',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {}
    }
});
var zyqStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'zyqStore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'dx/dept_sel',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    pageSize: 100,
    fields: ['V_PERSONCODE',
        'V_PERSONNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'zdh/addbaseperson_sel',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var creatpanel = Ext.create('Ext.form.Panel', {
    id: 'creatpanel',
    style: 'margin:5px 0px 2px 2px',
    region: 'north',
    width: '100%',
    baseCls: 'my-panel-no-border',
    layout: {
        type: 'vbox'
    },
    items: [{
        xtype: 'panel',
        layout: 'column',
        frame: true,
        baseCls: 'my-panel-noborder',
        width: '100%',
        items: [{
            xtype: 'combobox',
            id: 'dept',
            fieldLabel: '作业区',
            store: zyqStore,
            editable: false,
            labelWidth: 90,
            labelAlign: 'right',
            disabled: true,
            width: 220,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            style: ' margin: 10px 0px 5px 10px'
        }, {
            xtype: 'combobox',
            id: 'role',
            fieldLabel: '角色',
            store: roleStore,
            editable: false,
            labelWidth: 90,
            width: 220,
            labelAlign: 'right',
            displayField: 'V_ROLENAME',
            valueField: 'V_ROLECODE',
            queryMode: 'local',
            style: ' margin: 10px 0px 5px 10px'
        }]
    }, {
        xtype: 'panel',
        layout: 'column',
        frame: true,
        baseCls: 'my-panel-noborder',
        width: '100%',
        items: [{
            xtype: 'textfield',
            id: 'rybm',
            fieldLabel: '人员编码',
            width: 220,
            labelWidth: 90,
            labelAlign: 'right',
            emptyText: '请输入人员编码',
            style: ' margin: 0px 0px 5px 10px'
        }, {
            xtype: 'textfield',
            id: 'rymc',
            fieldLabel: '人员名称',
            width: 220,
            labelWidth: 90,
            labelAlign: 'right',
            emptyText: '请输入人员名称',
            style: ' margin: 0px 0px 5px 10px'
        }, {
            xtype: 'button',
            text: '查询',
            icon: imgpath + '/search.png',
            width: 70,
            handler: query,
            style: ' margin: 0px 0px 5px 15px'
        }]
    }]
});
var grid = Ext.create("Ext.grid.Panel", {
    xtype: 'gridpanel',
    id: 'grid',
    region: 'center',
    columnLines: true,
    width: '100%',
    store: gridStore,
    autoScroll: true,
    selModel: {
        selType: 'checkboxmodel'
    },
    columns: [{
        text: '人员编号 ',
        dataIndex: 'V_PERSONCODE',
        align: 'center',
        width: '48%'
    }, {
        text: '人员名称',
        dataIndex: 'V_PERSONNAME',
        align: 'center',
        labelAlign: 'right',
        width: '48%'
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        displayInfo: true,
        displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
        emptyMsg: '没有记录',
        store: 'gridStore'
    }, '->', {
        xtype: 'button',
        text: '确认并返回',
        icon: imgpath + '/saved.png',
        width: 110,
        handler: save_btn
    }, {
        xtype: 'button',
        text: '关闭',
        icon: imgpath + '/delete.png',
        width: 65,
        handler: close_btn
    }]
});
Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [creatpanel, grid]
    });
    Ext.data.StoreManager.lookup('zyqStore').load({
        params: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
            V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode'),
            V_V_DEPTTYPE: '[主体作业区]'
        }
    });
    Ext.getCmp('dept').setValue(depart);
    roleStore.on('load', function () {
        roleStore.insert(0, {V_ROLENAME: '全部', V_ROLECODE: '%'});
        roleStore.sort("V_ROLECODE", "asc");
        Ext.getCmp('role').select(roleStore.getAt(0));
        query();
    });
});
function query() {
    gridStore.load({
        params: {
            IN_DEPTCODE: Ext.getCmp('dept').getValue(),
            IN_ROLECODE: Ext.getCmp('role').getValue(),
            IN_PERSONCODE: Ext.getCmp('rybm').getValue(),
            IN_PERSONNAME: Ext.getCmp('rymc').getValue(),
            IN_CLASSCODE: classcode
        }
    });
}
function save_btn() {
    var selectedRecord = Ext.getCmp("grid").getSelectionModel().getSelection();
    if (selectedRecord != null && selectedRecord != "") {
        window.opener.getPersonReturnValue(selectedRecord);
        window.close();
    } else {
        Ext.Msg.alert("提示", '请选择一项');
    }
}
function close_btn() {
    window.close();
}