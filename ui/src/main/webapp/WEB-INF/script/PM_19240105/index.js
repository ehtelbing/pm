var EQUcode = '';
var EQUname = '';
Ext.onReady(function () {
    var firstgrid = Ext.create('Ext.data.Store', {
        id: 'firstgrid',
        pageSize: 20,
        autoLoad: false,
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'pm_19/PRO_SAP_EQU_TYPE_VIEW',
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
        autoLoad: false,
        fields: ['V_EQUTYPETXCODE', 'V_EQUTYPETXNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'pm_19/PRO_SAP_EQU_TYPE_TX_VIEW',
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
            beforeload: beforeSecondGridStore
        }
    });

    var panel = Ext.create('Ext.panel.Panel', {
        id: 'panel',
        frame: true,
        width: '100%',
        region: 'north',
        layout: 'vbox',
        items: [
            {
                xtype: 'panel', frame: true, width: '100%', layout: 'column', baseCls: 'my-panel-no-border',
                items: [{
                    xtype: 'textfield',
                    id: 'selname',
                    fieldLabel: '类型名称搜索',
                    labelAlign: 'right',
                    labelWidth: 100,
                    style: ' margin: 5px 0px 0px 10px'
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
        layout: 'border',
        items: [{
            xtype: 'grid',
            id: 'firstgrid',
            store: firstgrid,
            columnLines: true,
            autoScroll: true,
            width: '50%',
            region: 'west',
            selType: 'checkboxmodel',
            height: '100%',
            title: '设备类型',
            columns: [{xtype: 'rownumberer', width: 30, sortable: false},
                {text: '设备类型编码', dataIndex: 'V_EQUTYPECODE', width: 200, renderer: CreateGridColumnTd},
                {text: '设备类型名称', dataIndex: 'V_EQUTYPENAME', width: 300, renderer: CreateGridColumnTd}],
            bbar: [{
                id: 'firstpage',
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true,
                displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                emptyMsg: '没有记录',
                store: 'firstgrid'
            }],
            listeners: {
                itemdblclick: firstitmeclick,
                itemclick: QuerySecondGrid
            }
        },
            {
                xtype: 'panel',
                width: '50%',
                frame: true,
                layout: 'border', baseCls: 'my-panel-no-border',
                region: 'center',
                items: [{
                    xtype: 'panel', width: '50%', frame: true, layout: 'column', region: 'north',//baseCls: 'my-panel-no-border',
                    items: [{
                        xtype: 'button',
                        text: '添加特性',
                        style: ' margin: 5px 0px 0px 20px',
                        icon: imgpath + '/add.png',
                        listeners: {click: OnBtnTXAddClicked}
                    },
                        {
                            xtype: 'button',
                            text: '修改特性',
                            style: ' margin: 5px 0px 0px 20px',
                            icon: imgpath + '/edit.png',
                            listeners: {click: OnBtnTXEditClicked}
                        },
                        {
                            xtype: 'button',
                            text: '删除特性',
                            style: ' margin: 5px 0px 0px 20px',
                            icon: imgpath + '/delete1.png',
                            listeners: {click: OnBtnTxDelClick}
                        }]
                },
                    {
                        xtype: 'grid',
                        id: 'secondgrid',
                        store: secondgrid,
                        columnLines: true,
                        autoScroll: true,
                        width: '100%',
                        region: 'center',
                        selType: 'checkboxmodel',
                        height: '100%',
                        title: '设备特性',
                        columns: [{xtype: 'rownumberer', width: 30, sortable: false},
                            {text: '特性编码', dataIndex: 'V_EQUTYPETXCODE', width: 200, renderer: CreateGridColumnTd},
                            {text: '特性名称', dataIndex: 'V_EQUTYPETXNAME', width: 300, renderer: CreateGridColumnTd}],
                        bbar: [{
                            id: 'secondpage',
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            displayInfo: true,
                            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                            emptyMsg: '没有记录',
                            store: 'secondgrid'
                        }]
                    }]
            }]
    });

    var window = Ext.create('Ext.window.Window', {
        id: 'dialog', closeAction: 'hide', width: 550, height: 200, layout: 'vbox',
        items: [{
            xtype: 'textfield',
            id: 'wzbm',
            fieldLabel: '设备类型编码',
            labelAlign: 'right',
            labelWidth: 100,
            style: ' margin: 5px 0px 0px 10px',
            width: 500
        },
            {
                xtype: 'textfield',
                id: 'wzmc',
                fieldLabel: '设备类型名称',
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
    Ext.getCmp('firstpage').store.currentPage = 1;
    Ext.data.StoreManager.lookup('firstgrid').load({
        params: {
            V_V_EQUTYPENAME: Ext.getCmp('selname').getValue()
        }
    });
}

function QuerySecondGrid(a, record, item, index, e, eOpts) {
    EQUcode = record.raw.V_EQUTYPECODE;
    EQUname = record.raw.V_EQUTYPENAME;
    SecondGrid();
}

function SecondGrid() {
    Ext.getCmp('secondpage').store.currentPage = 1;
    Ext.data.StoreManager.lookup('secondgrid').load({
        params: {
            V_V_EQUTYPECODE: EQUcode
        }
    });
}

function beforeFirstGridStore(store) {
    store.proxy.extraParams.V_V_EQUTYPENAME = Ext.getCmp('selname').getValue();
}

function beforeSecondGridStore(store) {
    store.proxy.extraParams.V_V_EQUTYPECODE = EQUcode;
}

function firstitmeclick(a, record, item, index, e, eOpts) {
    var result = [];
    var code = record.raw.V_EQUTYPECODE;
    var name = record.raw.V_EQUTYPENAME;
    retdata.push(code);
    retdata.push(name);
    window.opener.getReturnEquType(retdata);
    window.close();
}

function OnBtnSaveClicked() {
    var length = Ext.getCmp("firstgrid").getSelectionModel().getSelection().length;
    if (length != 1) {
        Ext.MessageBox.alert('提示信息', '请选择一条设备类型数据进行操作！');
    } else {
        var retdata = [];
        var code = Ext.getCmp("firstgrid").getSelectionModel().getSelection()[0].data.V_EQUTYPECODE;
        var name = Ext.getCmp("firstgrid").getSelectionModel().getSelection()[0].data.V_EQUTYPENAME;
        retdata.push(code);
        retdata.push(name);
        window.opener.getReturnEquType(retdata);
        window.close();
    }
}

function OnBtnAddClicked() {
    Ext.getCmp('dialog').show();
    Ext.getCmp('dialog').setTitle('添加设备类型');
    Ext.getCmp('wzbm').setValue('');
    Ext.getCmp('wzmc').setValue('');
    Ext.getCmp('wzbm').setReadOnly(false);
}

function OnBtnEditClicked() {
    var length = Ext.getCmp("firstgrid").getSelectionModel().getSelection().length;
    if (length != 1) {
        Ext.MessageBox.alert('提示信息', '请选择一条数据进行修改！');
    } else {
        Ext.getCmp('dialog').show();
        Ext.getCmp('dialog').setTitle('修改设备类型');
        Ext.getCmp('wzbm').setValue(Ext.getCmp("firstgrid").getSelectionModel().getSelection()[0].data.V_EQUTYPECODE);
        Ext.getCmp('wzmc').setValue(Ext.getCmp("firstgrid").getSelectionModel().getSelection()[0].data.V_EQUTYPENAME);
        Ext.getCmp('wzbm').setReadOnly(true);
    }
}

function OnBtnWinSaveClicked() {
    if (Ext.getCmp('wzbm').getValue() == '') {
        Ext.MessageBox.alert('提示信息', '设备类型编码不能为空！');
    }
    if (Ext.getCmp('wzmc').getValue() == '') {
        Ext.MessageBox.alert('提示信息', '设备类型名称不能为空！');
    }
    Ext.Ajax.request({
        url: AppUrl + 'pm_19/PRO_SAP_EQU_TYPE_SET',
        method: 'POST',
        params: {
            V_V_EQUTYPECODE: Ext.getCmp('wzbm').getValue(),
            V_V_EQUTYPENAME: Ext.getCmp('wzmc').getValue()
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.V_CURSOR == '成功') {
                Ext.getCmp('dialog').hide();
                QueryGrid();
            } else {
                Ext.MessageBox.alert('提示信息', '保存失败！');
            }
        }
    });
}
//添加特性
function OnBtnTXAddClicked() {
    if (EQUcode == '') {
        Ext.MessageBox.alert('提示信息', '请先选择设备类型！');
    } else {
        window.open(AppUrl + 'page/PM_19240106/index.html?typecode=' + EQUcode + '&typename=' + EQUname + '&txcode=-1&txname=', '', "dialogWidth=400px;dialogHeight=160px");
    }
}
//修改特性
function OnBtnTXEditClicked() {
    if (EQUcode == '') {
        Ext.MessageBox.alert('提示信息', '请先选择设备类型！');
    } else {
        var length = Ext.getCmp("secondgrid").getSelectionModel().getSelection().length;
        if (length == 1) {
            var txcode = Ext.getCmp("secondgrid").getSelectionModel().getSelection()[0].data.V_EQUTYPETXCODE;
            var txname = Ext.getCmp("secondgrid").getSelectionModel().getSelection()[0].data.V_EQUTYPETXNAME;
            window.open(AppUrl + 'page/PM_19240106/index.html?typecode=' + EQUcode + '&typename=' + EQUname + '&txcode=' + txcode + '&txname=' + txname, '', "dialogWidth=400px;dialogHeight=160px");
        } else {
            Ext.MessageBox.alert('提示信息', '请选择一条数据进行修改操作！');
        }
    }
}
//删除特性
function OnBtnTxDelClick() {
    var length = Ext.getCmp("secondgrid").getSelectionModel().getSelection().length;
    if (length != 1) {
        Ext.MessageBox.alert('提示信息', '请选择1条需要删除的数据！');
    } else {
        Ext.Msg.confirm("警告", "确定要删除吗？请慎重使用！", function (button) {
            if (button != "yes") {
                return;
            }
            Ext.Ajax.request({
                url: AppUrl + 'pm_19/PRO_SAP_EQU_TYPE_TX_DEL',
                method: 'POST',
                params: {
                    V_V_EQUTYPECODE: EQUcode,
                    V_V_EQUTYPETXCODE: Ext.getCmp("secondgrid").getSelectionModel().getSelection()[0].data.V_EQUTYPETXCODE
                },
                success: function (resp) {
                    var resp = Ext.decode(resp.responseText);
                    if (resp.V_CURSOR == "成功") {
                        SecondGrid();
                    } else {
                        Ext.MessageBox.alert('提示信息', '删除失败！');
                    }
                }
            });
        });

    }
}

function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}