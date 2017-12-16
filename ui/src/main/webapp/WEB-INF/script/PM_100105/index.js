var A_EQUTYPE = '';
var A_EQUTYPE_NAME = '';
var A_EQUTYPE_REMARK = '';
var TYPE_CODE = '';

Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果

    //设备类型
    var equTypeStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        pageSize: 100,
        storeId: 'equTypeStore',
        fields: ['TYPE_CODE', 'TYPE_DESC', 'TYPE_REMARK', 'TYPE_STATUS', 'TYPE_STATUS_DESC'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/GETEQUTYPELIST',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            },
            extraParams: {}
        }
    });

    //修改设备类型
    var updateEquTypeStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        pageSize: 100,
        storeId: 'updateEquTypeStore',
        fields: ['TYPE_CODE', 'TYPE_DESC', 'TYPE_REMARK'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/GETEQUTYPEDETAIL',
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

    //显示面板
    var setGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'setGridPanel',
        store: equTypeStore,
        width: '100%',
        region: 'sourth',
        border: false,
        columnLines: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns: [{
            text: '设备类型编码',
            dataIndex: 'TYPE_CODE',
            align: 'center',
            width: 120,
            flex:1,
            renderer: atleft
        }, {
            text: '设备类型名称',
            dataIndex: 'TYPE_DESC',
            align: 'center',
            width: 120,
            flex:1,
            renderer: atleft
        }, {
            text: '备注',
            dataIndex: 'TYPE_REMARK',
            align: 'center',
            width: 120,
            flex:1,
            renderer: atleft
        }, {
            text: '状态',
            id: 'TYPE_STATUS_DESC',
            dataIndex: 'TYPE_STATUS_DESC',
            align: 'center',
            width: 80,
            flex:1,
            renderer: atleft
        }, {
            text: '状态修改',
            align: 'center',
            width: 80,
            flex:1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href=javascript:dealWith(\'</a><a href="#" onclick="_updateStatus(\'' + record.data.TYPE_CODE + '\')">' + '变更' + '</a>';
            }
        }],
        bbar: [{
            id: 'gpage',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: equTypeStore
        }]
    });

    //按钮面板
    var buttonPanel = Ext.create('Ext.form.Panel', {
        id: 'buttonPanel',
        region: 'fit',
        width: '100%',
        frame: true,
        layout: 'column',
        items: [{
            xtype: 'button',
            text: '查询',
            style: ' margin: 5px 0px 5px 10px',
            icon: imgpath + '/search.png',
            handler: _select
        }, {
            xtype: 'button',
            text: '新增设备类型',
            handler: _insert,
            style: ' margin: 5px 5px 5px 5px',
            icon: imgpath + '/add.png'
        }, {
            xtype: 'button',
            text: '修改设备类型',
            handler: _update,
            style: ' margin: 5px 5px 5px 5px',
            icon: imgpath + '/edit.png'
        }]
    });

    //新增设备类型弹出框
    var insertEquTypeWindow = Ext.create('Ext.window.Window', {
        id: 'insertEquTypeWindow',
        title: '<div align="center">新增设备类型</div>',
        width: 350,
        height: 300,
        modal: true,
        closable: true,
        closeAction: 'close',
        frame: true,
        layout: 'vbox',
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            style: ' margin: 40px 0px 5px 20px',
            items: [{
                xtype: 'textfield',
                id: 'TYPE_CODE',
                queryMode: 'local',
                fieldLabel: '设备类型编码',
                labelWidth: 90,
                width: 250,
                style: ' margin: 5px 0px 0px 0px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            style: ' margin: 2px 0px 5px 20px',
            items: [{
                xtype: 'textfield',
                id: 'TYPE_DESC',
                fieldLabel: '设备类型名称',
                labelWidth: 90,
                width: 250,
                style: ' margin: 2px 0px 0px 0px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            style: ' margin: 5px 0px 5px 20px',
            items: [{
                xtype: 'textfield',
                id: 'TYPE_REMARK',
                editable: false,
                queryMode: 'local',
                fieldLabel: '备注',
                labelWidth: 90,
                width: 250,
                style: ' margin: 2px 0px 0px 0px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            style: ' margin: 5px 0px 5px 230px',
            items: [{
                xtype: 'button',
                text: '保存',
                width: 40,
                handler: _insertEquType,
                style: ' margin: 5px 0px 0px 0px'
            }]
        }]

    });

//弹出修改类型框容器
    var updateEquTypeWindow = Ext.create('Ext.window.Window', {
        id: 'updateEquTypeWindow',
        title: '<div align="center">修改设备类型</div>',
        width: 350,
        height: 300,
        modal: true,
        closable: true,
        closeAction: 'close',
        layout: 'vbox',
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            style: ' margin: 40px 0px 5px 20px',
            items: [{
                xtype: 'textfield',
                id: 'UPDATE_TYPE_CODE',
                editable: false,
                readOnly: true,
                queryMode: 'local',
                fieldLabel: '设备类型编码',
                labelWidth: 90,
                width: 250,
                style: ' margin: 5px 0px 0px 0px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            style: ' margin: 2px 0px 5px 20px',
            items: [{
                xtype: 'textfield',
                id: 'UPDATE_TYPE_DESC',
                editable: false,
                queryMode: 'local',
                fieldLabel: '设备类型名称',
                labelWidth: 90,
                width: 250,
                style: ' margin: 2px 0px 0px 0px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            style: ' margin: 5px 0px 5px 20px',
            items: [{
                xtype: 'textfield',
                id: 'UPDATE_TYPE_REMARK',
                editable: false,
                queryMode: 'local',
                fieldLabel: '备注',
                labelWidth: 90,
                width: 250,
                style: ' margin: 2px 0px 0px 0px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            style: ' margin: 5px 0px 5px 230px',
            items: [{
                xtype: 'button',
                text: '保存',
                width: 40,
                handler: _updateEquType,
                style: ' margin: 5px 0px 0px 0px'
            }]
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
            items: [buttonPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [setGridPanel]
        }]

    });

    _init();
})
;

function _init() {
    if (true) {

        Ext.getBody().unmask();//去除页面笼罩
    }
};

//新增弹窗
function _insert() {

    Ext.getCmp('insertEquTypeWindow').show();

};

//修改弹窗
function _update() {

    var records = Ext.getCmp('setGridPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

    Ext.getCmp('UPDATE_TYPE_CODE').setValue(records[0].get('TYPE_CODE'));
    Ext.getCmp('UPDATE_TYPE_DESC').setValue(records[0].get('TYPE_DESC'));
    Ext.getCmp('UPDATE_TYPE_REMARK').setValue(records[0].get('TYPE_REMARK'));

    Ext.getCmp('updateEquTypeWindow').show();

};


//查找全部信息
function _select() {
    var equTypeStore = Ext.data.StoreManager.lookup('equTypeStore');
    equTypeStore.proxy.extraParams = {};
    equTypeStore.load();
};

//新增设备类型
function _insertEquType() {
   /* A_EQUTYPE ='';
    A_EQUTYPE_NAME='';
    A_EQUTYPE_REMARK='';*/
    A_EQUTYPE = Ext.getCmp('TYPE_CODE').getValue();
    A_EQUTYPE_NAME = Ext.getCmp('TYPE_DESC').getValue();
    A_EQUTYPE_REMARK = Ext.getCmp('TYPE_REMARK').getValue();

    if (A_EQUTYPE == '' || A_EQUTYPE_NAME == '' || A_EQUTYPE_REMARK == '') {
        Ext.Msg.alert({
            title: '提示',
            msg: '所填项不允许为空!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }

    Ext.Ajax.request({
        url: AppUrl + 'ml/ADDEQUTYPE',
        type: 'ajax',
        method: 'POST',
        params: {
            A_EQUTYPE: A_EQUTYPE,
            A_EQUTYPE_NAME: A_EQUTYPE_NAME,
            A_EQUTYPE_REMARK: A_EQUTYPE_REMARK
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET == 'Success') {//成功，会传回true
                _select();
                Ext.getCmp('insertEquTypeWindow').close();
                Ext.Msg.alert('操作信息', data.RET_MSG);//提示信息
            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: data.RET_MSG,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        },
        failure: function (response) {//访问到后台时执行的方法。
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            })
        }

    })
    A_EQUTYPE = Ext.getCmp('TYPE_CODE').setValue('');
    A_EQUTYPE_NAME = Ext.getCmp('TYPE_DESC').setValue('');
    A_EQUTYPE_REMARK = Ext.getCmp('TYPE_REMARK').setValue('');

};

//变更状态
function _updateStatus(TYPE_CODE) {

    Ext.Ajax.request({
        url: AppUrl + 'ml/SETEQUTYPESTATUS',
        type: 'ajax',
        method: 'POST',
        params: {
            A_EQUTYPE: TYPE_CODE
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET == 'Success') {//成功，会传回true
                _select();
                Ext.getCmp('insertEquTypeWindow').close();
                Ext.Msg.alert('操作信息', data.RET_MSG);//提示信息
            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: data.RET_MSG,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        },
        failure: function (response) {//访问到后台时执行的方法。
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            })
        }
    })
};

//修改设备类型
function _updateEquType() {

    A_EQUTYPE = Ext.getCmp('UPDATE_TYPE_CODE').getValue();
    A_EQUTYPE_NAME = Ext.getCmp('UPDATE_TYPE_DESC').getValue();
    A_EQUTYPE_REMARK = Ext.getCmp('UPDATE_TYPE_REMARK').getValue();

    if (A_EQUTYPE_NAME == '' || A_EQUTYPE_REMARK == '') {
        Ext.Msg.alert({
            title: '提示',
            msg: '所填项不允许为空!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }

    Ext.Ajax.request({
        url: AppUrl + 'ml/UPDATEEQUTYPE',
        type: 'ajax',
        method: 'POST',
        params: {
            A_EQUTYPE: A_EQUTYPE,
            A_EQUTYPE_NAME: A_EQUTYPE_NAME,
            A_EQUTYPE_REMARK: A_EQUTYPE_REMARK
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET == 'Success') {//成功，会传回true
                _select();
                Ext.getCmp('updateEquTypeWindow').close();
                Ext.Msg.alert('操作信息', data.RET_MSG);//提示信息
            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: data.RET_MSG,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        },
        failure: function (response) {//访问到后台时执行的方法。
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            })
        }

    })
};

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
};

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}

