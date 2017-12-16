Ext.onReady(function () {

    var firstgrid = Ext.create('Ext.data.Store', {
        id: 'firstgrid',
        pageSize: 20,
        autoLoad: false,
        fields: ['V_EQUSITE', 'V_EQUSITENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'pm_19/PRO_SAP_EQU_SITE_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        },
        listeners: {
            beforeload: beforeFirstGridStore
        }
    });

    var secondgrid = Ext.create('Ext.data.Store', {
        id: 'secondgrid',
        pageSize: 20,
        autoLoad: true,
        fields: ['V_EQUSITE', 'V_EQUSITENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'pm_19/PRO_SAP_EQU_SITE_TOP_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            },
            extraParams: {
                V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode')
            }
        },
        listeners: {
            beforeload: beforeSecondGridStore
        }
    });

    var panel = Ext.create('Ext.panel.Panel', {
        id: 'panel',
        frame: true,
        width: '100%',
        region: 'north',
        layout: 'vbox',
        items: [{
            xtype: 'panel', frame: true, width: '100%', layout: 'column', baseCls: 'my-panel-no-border',
            items: []
        },
            {
                xtype: 'panel', frame: true, width: '100%', layout: 'column', baseCls: 'my-panel-no-border',
                items: [{
                    xtype: 'textfield',
                    id: 'selname',
                    fieldLabel: '位置名称搜索',
                    labelAlign: 'right',
                    labelWidth: 100,
                    style: ' margin: 5px 0px 0px 10px',
                    emptyText: '位置名称不能为空！'
                },
                    {
                        xtype: 'button',
                        text: '查询',
                        style: ' margin: 5px 0px 0px 10px',
                        icon: imgpath + '/search.png',
                        handler: QueryGrid
                    },
                    {
                        xtype: 'button',
                        text: '确定选择',
                        style: ' margin: 5px 0px 0px 10px',
                        icon: imgpath + '/saved.png',
                        listeners: {click: OnBtnSaveClicked}
                    },{
                        xtype: 'button',
                        text: '添加',
                        style: ' margin: 5px 0px 0px 20px',
                        icon: imgpath + '/add.png',
                        listeners: {click: OnBtnAddClicked}
                    },
                    {
                        xtype: 'button',
                        text: '修改',
                        style: ' margin: 5px 0px 0px 20px',
                        icon: imgpath + '/edit.png',
                        listeners: {click: OnBtnEditClicked}
                    }]
            }]
    });

    var gridpanel = Ext.create('Ext.panel.Panel', {
        id: 'grid',
        frame: true,
        width: '100%',
        region: 'center',
        layout: 'hbox',
        items: [{
            xtype: 'grid', id: 'firstgrid', store: firstgrid, columnLines: true, autoScroll: true, width: '50%',
            selType: 'checkboxmodel', height: '100%', title: '设备位置',
            columns: [{xtype: 'rownumberer', width: 30, sortable: false},
                {text: '设备位置编码', dataIndex: 'V_EQUSITE', width: 200, renderer: CreateGridColumnTd},
                {text: '设备位置名称', dataIndex: 'V_EQUSITENAME', width: 300, renderer: CreateGridColumnTd}],
            bbar: [{
                id: 'firstpage',
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true,
                displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                emptyMsg: '没有记录',
                store: 'firstgrid'
            }],
            listeners: {itemdblclick: firstitmeclick}
        },
            {
                xtype: 'grid', id: 'secondgrid', store: secondgrid, columnLines: true, autoScroll: true, width: '50%',
                selType: 'checkboxmodel', height: '100%', title: '最近使用的位置',
                columns: [{xtype: 'rownumberer', width: 30, sortable: false},
                    {text: '设备位置编码', dataIndex: 'V_EQUSITE', width: 200, renderer: CreateGridColumnTd},
                    {text: '设备位置名称', dataIndex: 'V_EQUSITENAME', width: 300, renderer: CreateGridColumnTd}],
                bbar: [{
                    id: 'secondpage',
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    displayInfo: true,
                    displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                    emptyMsg: '没有记录',
                    store: 'secondgrid'
                }],
                listeners: {itemdblclick: seconditmeclick}
            }]
    });

    var window = Ext.create('Ext.window.Window', {
        id: 'dialog', closeAction: 'hide', width: 550, height: 200, layout: 'vbox',
        items: [{
            xtype: 'textfield',
            id: 'wzbm',
            fieldLabel: '设备位置编码',
            labelAlign: 'right',
            labelWidth: 100,
            style: ' margin: 5px 0px 0px 10px',
            width: 500
        },
            {
                xtype: 'textfield',
                id: 'wzmc',
                fieldLabel: '设备位置名称',
                labelAlign: 'right',
                labelWidth: 100,
                style: ' margin: 5px 0px 0px 10px',
                width: 500
            }],
        buttons: [{
            text: '保存',
            style: ' margin: 5px 0px 0px 10px',
            icon: imgpath + '/saved.png',
            listeners: {click: OnBtnWinSaveClicked}
        },
            {
                text: '关闭', style: ' margin: 5px 0px 0px 10px', listeners: {
                click: function () {
                    Ext.getCmp('dialog').hide();
                }
            }
            }]
    });

    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel, gridpanel]
    });
});

function QueryGrid() {
    if (Ext.getCmp('selname').getValue() == '') {
        Ext.MessageBox.alert('操作信息', '位置名称搜索不能为空！');
    } else {
        Ext.getCmp('firstpage').store.currentPage = 1;
        Ext.data.StoreManager.lookup('firstgrid').load({
            params: {
                V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                V_V_EQUSITENAME: Ext.getCmp('selname').getValue()
            }
        });
    }
}

function beforeFirstGridStore(store) {
    store.proxy.extraParams.V_V_DEPTCODE = Ext.util.Cookies.get('v_orgCode');
    store.proxy.extraParams.V_V_EQUSITENAME = Ext.getCmp('selname').getValue();
}

function beforeSecondGridStore(store) {
    store.proxy.extraParams.V_V_DEPTCODE = Ext.util.Cookies.get('v_orgCode');
}

function firstitmeclick(a, record, item, index, e, eOpts) {
    var result = [];
    var code = record.raw.V_EQUSITE;
    var name = record.raw.V_EQUSITENAME;
    result.push(code);
    result.push(name);
    window.opener.getReturnEquSite(result);
    window.close();
}

function seconditmeclick(a, record, item, index, e, eOpts) {
    var result = [];
    var code = record.raw.V_EQUSITE;
    var name = record.raw.V_EQUSITENAME;
    result.push(code);
    result.push(name);
    window.opener.getReturnEquSite(result);
    window.close();
}

function OnBtnSaveClicked() {
    var result = [];
    var firstlength = Ext.getCmp("firstgrid").getSelectionModel().getSelection().length;
    var secondlength = Ext.getCmp("secondgrid").getSelectionModel().getSelection().length;
    if (firstlength == 0 && secondlength == 0) {
        Ext.MessageBox.alert('提示信息', '请在设备位置或最近使用位置选择一条数据进行操作！');
    } else if (firstlength != 0 && secondlength != 0) {
        Ext.MessageBox.alert('提示信息', '请在设备位置或最近使用位置选择一条数据进行操作！');
    } else if (firstlength != 1 && firstlength != 0 && secondlength == 0) {
        Ext.MessageBox.alert('提示信息', '请在设备位置选择一条数据进行操作！');
    } else if (secondlength != 1 && secondlength != 0 && firstlength == 0) {
        Ext.MessageBox.alert('提示信息', '请在最近使用位置选择一条数据进行操作！');
    } else {
        if (firstlength != 0 && firstlength == 1) {
            var code = Ext.getCmp("firstgrid").getSelectionModel().getSelection()[0].data.V_EQUSITE;
            var name = Ext.getCmp("firstgrid").getSelectionModel().getSelection()[0].data.V_EQUSITENAME;
            result.push(code);
            result.push(name);
            window.opener.getReturnEquSite(result);
            window.close();
        } else {
            var code = Ext.getCmp("secondgrid").getSelectionModel().getSelection()[0].data.V_EQUSITE;
            var name = Ext.getCmp("secondgrid").getSelectionModel().getSelection()[0].data.V_EQUSITENAME;
            result.push(code);
            result.push(name);
            window.opener.getReturnEquSite(result);
            window.close();
        }
    }
}

function OnBtnAddClicked() {
    Ext.getCmp('dialog').show();
    Ext.getCmp('dialog').setTitle('添加设备位置');
    Ext.getCmp('wzbm').setValue('');
    Ext.getCmp('wzmc').setValue('');
    Ext.getCmp('wzbm').setReadOnly(false);
}

function OnBtnEditClicked() {
    var result = new Object();
    var firstlength = Ext.getCmp("firstgrid").getSelectionModel().getSelection().length;
    var secondlength = Ext.getCmp("secondgrid").getSelectionModel().getSelection().length;
    if (firstlength == 0 && secondlength == 0) {
        Ext.MessageBox.alert('提示信息', '请在设备位置或最近使用位置选择一条数据进行操作！');
    } else if (firstlength != 0 && secondlength != 0) {
        Ext.MessageBox.alert('提示信息', '请在设备位置或最近使用位置选择一条数据进行操作！');
    } else if (firstlength != 1 && firstlength != 0 && secondlength == 0) {
        Ext.MessageBox.alert('提示信息', '请在设备位置选择一条数据进行操作！');
    } else if (secondlength != 1 && secondlength != 0 && firstlength == 0) {
        Ext.MessageBox.alert('提示信息', '请在最近使用位置选择一条数据进行操作！');
    } else {
        Ext.getCmp('dialog').show();
        if (firstlength != 0 && firstlength == 1) {
            Ext.getCmp('wzbm').setValue(Ext.getCmp("firstgrid").getSelectionModel().getSelection()[0].data.V_EQUSITE);
            Ext.getCmp('wzmc').setValue(Ext.getCmp("firstgrid").getSelectionModel().getSelection()[0].data.V_EQUSITENAME);
            Ext.getCmp('wzbm').setReadOnly(true);
        } else {
            Ext.getCmp('wzbm').setValue(Ext.getCmp("secondgrid").getSelectionModel().getSelection()[0].data.V_EQUSITE);
            Ext.getCmp('wzmc').setValue(Ext.getCmp("secondgrid").getSelectionModel().getSelection()[0].data.V_EQUSITENAME);
            Ext.getCmp('wzbm').setReadOnly(true);
        }
        Ext.getCmp('dialog').setTitle('修改设备位置');
    }
}

function OnBtnWinSaveClicked() {
    if (Ext.getCmp('wzbm').getValue() == '') {
        Ext.MessageBox.alert('提示信息', '设备位置编码不能为空！');
    }
    if (Ext.getCmp('wzmc').getValue() == '') {
        Ext.MessageBox.alert('提示信息', '设备位置名称不能为空！');
    }
    Ext.Ajax.request({
        url: AppUrl + 'pm_19/PRO_SAP_EQU_SITE_SET',
        method: 'POST',
        params: {
            V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
            V_V_EQUSITE: Ext.getCmp('wzbm').getValue(),
            V_V_EQUSITENAME: Ext.getCmp('wzmc').getValue()
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.V_CURSOR == '成功') {
                Ext.getCmp('dialog').hide();
                Ext.getCmp('selname').setValue(Ext.getCmp('wzmc').getValue());
                QueryGrid();
            } else {
                Ext.MessageBox.alert('提示信息', '保存失败！');
            }
        }
    });
}

function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}