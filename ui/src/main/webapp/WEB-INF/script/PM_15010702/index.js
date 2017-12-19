var V_USERID = Ext.util.Cookies.get('v_personcode');

var V_ORDERSTS = '';
var V_USERNAME = '';
var V_STS = '';
var V_MENDDEPTCODE = '';
var jxStatusStoreLoad = false;
var mendDeptStoreLoad = false;

Ext.onReady(function () {
    Ext.getBody().mask('<p>正在载入中...</p>');

    //检修状态Store
    var jxStatusStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        pageSize: 100,
        storeId: 'jxStatusStore',
        fields: ['ORDER_STATUS', 'ORDER_STATUS_DESC'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/PRO_DJ702_DROPLIST',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('jxStatus').select(store.first());
                jxStatusStoreLoad = true;
                _init();
            }
        }
    });

    //检修单位Store
    var mendDeptStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'mendDeptStore',
        fields: ['MENDDEPT_CODE', 'MENDDEPT_NAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/PRO_DJ702_JXDWDROPLIST',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'V_USERID': V_USERID
            }
        }, listeners: {
            load: function (store, records) {
                Ext.getCmp('jxDeptName').select(store.first());

                mendDeptStoreLoad = true;
                _init();
            }
        }
    });

    //检修工单Store
    var orderStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        pageSize: 100,
        storeId: 'orderStore',
        fields: ['POWERID', 'ORDER_STATUS', 'MENDDEPT_NAME', 'USERID', 'USERNAME', 'STATUS'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/PRO_DJ702_SELECT',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            },
            extraParams: {}
        }
    });

    //菜单面板
    var tablePanel = Ext.create('Ext.panel.Panel', {
        id: 'tablePanel',
        region: 'north',
        title: '<div align="center"> 检修状态人员配置</div>',
        layout: 'column',
        frame: true,
        items: [{
            id: 'jxStatus',
            xtype: 'combo',
            store: jxStatusStore,
            fieldLabel: '检修状态',
            labelWidth: 80,
            width: 250,
            displayField: 'ORDER_STATUS_DESC',
            valueField: 'ORDER_STATUS',
            queryMode: 'local',
            style: ' margin: 5px 0px 5px 0px',
            labelAlign: 'right',
            listeners: {
                change: function (store, records) {
                    _select();
                }
            }
        }, {
            xtype: 'button',
            text: '查询',
            style: ' margin: 5px 0px 5px 10px',
            icon: imgpath + '/search.png',
            handler: _select
        }, {
            xtype: 'button',
            text: '新增',
            style: ' margin: 5px 0px 5px 10px',
            icon: imgpath + '/add.png',
            handler: _insert
        }]
    });

    //新增面板
    var insertPanel = Ext.create('Ext.panel.Panel', {
        id: 'insertPanel',
        region: 'north',
        layout: 'vbox',
        frame: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'gdStatus',
                fieldLabel: '工单状态',
                readOnly: true,
                labelWidth: 80,
                width: 250,
                style: ' margin: 15px 5px 0px 10px',
                labelAlign: 'right'

            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'userId',
                fieldLabel: '人员编码',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 5px 0px 10px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'userName',
                fieldLabel: '人员名称',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 5px 0px 10px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'onStatus',
                fieldLabel: '当前状态',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 5px 0px 10px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'jxDeptName',
                xtype: 'combo',
                store: mendDeptStore,
                fieldLabel: '检修单位名称',
                labelWidth: 80,
                width: 250,
                displayField: 'MENDDEPT_NAME',
                valueField: 'MENDDEPT_CODE',
                queryMode: 'local',
                allowBlank: false,
                style: ' margin: 5px 5px 0px 10px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'button',
                text: '确定',
                style: ' margin: 10px 0px 5px 200px',
                icon: imgpath + '/saved.png',
                handler: _insertMember
            }]
        }]
    });

    //显示面板
    var mendMemberGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'mendMemberGridPanel',
        store: orderStore,
        width: '100%',
        region: 'sourth',
        border: false,
        columnLines: true,
        columns: [{
            text: '工单状态',
            dataIndex: 'ORDER_STATUS',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '检修单位名称',
            dataIndex: 'MENDDEPT_NAME',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '人员编码',
            dataIndex: 'USERID',
            align: 'center',
            width: 120,
            renderer: atright
        }, {
            text: '人员名称',
            dataIndex: 'USERNAME',
            align: 'center',
            width: 180,
            renderer: atleft
        }, {
            text: '当前状态',
            dataIndex: 'STATUS',
            align: 'center',
            width: 120,
            // renderer:atleft
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                if (record.data.STATUS == '1') {
                    return '启用';
                    //  return '<a href="javascript:start(\'' + rowIdx + '\',0)">'+'启用'+'</a>';
                } else {
                    return '停用';
                    // return '<a href="javascript:stop(\'' + rowIdx + '\',1)">'+'停用'+'</a>';
                }
            }
        }, {
            text: '删除',
            align: 'center',
            width: 120,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href="#" onclick="_delete(\'' + record.data.POWERID + '\',\'' + rowIdx + '\')">' + '删除' + '</a>';
            }
        }],
        bbar: [{
            id: 'gpage',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            width: '100%',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: orderStore
        }]
    });

//新增弹出框容器
    var insertWindow = Ext.create('Ext.window.Window', {
        id: 'insertWindow',
        // title: '<div align="center"> 详细更换历史</div>',
        width: 350,
        height: 300,
        modal: true,
        plain: true,
        closable: true,
        closeAction: 'close',
        model: true,
        layout: 'border',
        frame: true,
        items: [{
            region: 'center',
            layout: 'fit',
            border: false,
            items: [insertPanel]
        }]
    });

//整体视图容器
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
            items: [tablePanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [mendMemberGridPanel]
        }]
    });

    _init();

});

//初始化
function _init() {

    if (jxStatusStoreLoad && mendDeptStoreLoad) {
        Ext.getBody().unmask();//去除页面笼罩
    }
}

//查询工单列表
function _select() {

    var orderStore = Ext.data.StoreManager.lookup('orderStore');
    orderStore.proxy.extraParams = {
        'V_ORDERSTS': Ext.getCmp('jxStatus').getValue()
    };
    orderStore.load();
}

//新增弹框
function _insert() {

    Ext.getCmp('gdStatus').setValue(Ext.getCmp('jxStatus').getRawValue());
    Ext.getCmp('userId').reset();
    Ext.getCmp('userName').reset();
    Ext.getCmp('onStatus').reset();
    Ext.getCmp('jxDeptName').setValue(Ext.data.StoreManager.lookup('mendDeptStore').getAt(0).get('MENDDEPT_CODE'));

    Ext.getCmp('insertWindow').show();
}

//删除检修单位
function _delete(POWERID, rowIdx) {

    Ext.Ajax.request({
        url: AppUrl + 'ml/PRO_DJ702_DELETE',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_POWERID': POWERID,
            'V_ID': rowIdx
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET == "Success") {
                Ext.Msg.alert('操作信息', '删除成功');
                //   Ext.data.StoreManager.lookup('mendDeptStore').remove();
                _select();
            } else {
                Ext.Msg.alert('操作信息', '删除失败');
            }
        }
    })
}

//新增工单
function _insertMember() {

    V_ORDERSTS = Ext.getCmp('jxStatus').getValue();
    V_USERID = Ext.getCmp('userId').getValue();
    V_USERNAME = Ext.getCmp('userName').getValue();
    if (Ext.getCmp('onStatus').getValue() == '启用') {
        V_STS = 1;
        return;
    }
    if (Ext.getCmp('onStatus').getValue() == '停用') {
        V_STS = 0;
        return;
    }
    V_MENDDEPTCODE = Ext.getCmp('jxDeptName').getValue();

    if (V_ORDERSTS == '' || V_USERID == '' || V_USERNAME == '' || V_STS == '') {
        Ext.Msg.alert({
            title: '提示',
            msg: '所填项不能为空!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
    } else {
        Ext.Ajax.request({
            url: AppUrl + 'ml/PRO_DJ702_INSERT',
            type: 'ajax',
            method: 'POST',
            params: {
                'V_ORDERSTS': V_ORDERSTS,
                'V_USERID': V_USERID,
                'V_USERNAME': V_USERNAME,
                'V_STS': V_STS,
                'V_MENDDEPTCODE': V_MENDDEPTCODE
            },
            success: function (response, options) {
                var data = Ext.decode(response.responseText);

                if (data.RET == "Success") {
                    Ext.Msg.alert('操作信息', '操作成功');
                    Ext.getCmp('insertWindow').close();
                    _select();
                } else {
                    Ext.Msg.alert('操作信息', '操作失败');
                }
            }
        });
    }
}

function rendererTime(value, metaData) {
    metaData.style = "text-align:left";
    // return '<div data-qtip="' + value.substring(0, 10) + '" >' + value.substring(0, 10) + '</div>';
    return '<div data-qtip="' + value.split('.0')[0] + '" >' + value.split('.0')[0] + '</div>';
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}

/*
 //导出Excel
 function _exportExcel() {
 document.location.href = AppUrl + 'ml/PRO_RUN_EQU_BJ_ALERT_ALL_EXCEL?A_EQUID=' + encodeURI(encodeURI(A_EQUID)) +
 '&A_CYCLE_ID=' + encodeURI(encodeURI(A_CYCLE_ID));
 }
 */
