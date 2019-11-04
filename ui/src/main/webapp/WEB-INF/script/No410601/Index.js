/// <reference path="../Shared/ext-all-debug-w-comments.js" />

var gridStore = Ext.create('Ext.data.Store', {
    id: 'gridStore',
    autoLoad: false,
    fields: ['V_EQUTYPENAME', 'V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_EQUSITENAME'],
    proxy: {
        type: 'ajax',
        url: AppUrl + 'LL/PRO_GET_DEPTEQU_PER',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var V_ORDERGUID = null;
if (location.href.split('?')[1] != undefined) {
    V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).DEPTCODE;
}
var win;// 子窗口，由父类对象调用
var returnValue;// 返回值

var PageLayout = {
    xtype: 'panel',
    layout: 'border',
    items: [{
        xtype: 'panel',
        region: 'west',
        width: 200,
        items: [{
            xtype: 'treepanel',
            region: 'west',
            id: 'sectTree',
            rootVisible: false,
            border: false,
            autoScroll: true,
            height: 500,
            listeners: {
                itemclick: OnClickTreeItem
            },
            store: Ext.create('Ext.data.TreeStore', {
                id: 'treeStore',
                fields: ['id', 'text', 'parentid', 'leaf'],
                autoLoad: true,
                proxy: {
                    type: 'ajax',
                    async: false,
                    url: AppUrl + 'LL/PRO_BASE_DEPT_TREE',
                    extraParams: {
                        V_V_DEPTCODE: V_ORDERGUID
                    },
                    actionMethods: {
                        read: 'POST'
                    }
                },
                reader: {
                    type: 'json',
                    root: 'list'
                },
                root: {
                    expanded: true
                }
            })
        }]
    }, {
        xtype: 'panel',
        region: 'center',
        layout: 'border',
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        items: [{
            xtype: 'gridpanel',
            region: 'center',
            id: 'grid',
            selType: 'checkboxmodel',
            store: gridStore,
            columns: [{
                text: '设备分类',
                dataIndex: 'V_EQUTYPENAME',
                width: 120
            }, {
                text: '设备编号',
                dataIndex: 'V_EQUCODE',
                width: 140
            }, {
                text: '设备名称',
                dataIndex: 'V_EQUNAME',
                width: 160
            }, {
                text: '设备位置编码',
                dataIndex: 'V_EQUSITE',
                width: 200
            }, {
                text: '设备位置',
                dataIndex: 'V_EQUSITENAME',
                width: 420
            }],
            listeners: {
                'itemdblclick': function (panel, record, item, index, e, eOpts) {
                    OnClickSavedButton();
                }
            }
        }, {
            xtype: 'panel',
            layout: 'column',
            region: 'north',
            frame: true,
            items: [{
                xtype: 'button',
                id: 'btnSaved',
                text: '确定完成',
                icon: imgpath + '/search.png',
                style: 'margin:0 0 0 20px',
                width: 100,
                listeners: {
                    click: OnClickSavedButton
                }
            }]
        }]
    }]
};

function OnClickTreeItem(aa, record, item, index, e, eOpts) {

    if (record.data.leaf == true) {
        gridStore.proxy.extraParams.V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
        gridStore.proxy.extraParams.V_V_DEPTCODENEXT = record.data.parentid;
        gridStore.proxy.extraParams.V_V_EQUTYPECODE = record.data.id;
        Ext.getCmp('grid').getStore().load();
    }
}

function OnClickSavedButton() {
    var records = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (records.length == 0) {
        alert('请选择一条记录或一个叶子目录进行操作!');
        return;
    }
    parent.returnValue = records;
    _close();
}

Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', PageLayout);

    // 点击加号加载 //
    Ext.getCmp("sectTree").on("beforeload", function (store, operation) {
        Ext.apply(store.proxy.extraParams, {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: operation.node.data.id,
                leaf: true
            },
            store.proxy.url = AppUrl + 'LL/PRO_GET_DEPTEQUTYPE_PER')
    })
});

function _close() {
    parent.win.close();
}