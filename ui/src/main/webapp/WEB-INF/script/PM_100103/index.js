var A_MAT_NO = '';
var A_MAT_DESC = '';
var MAT_NO_LIST = new Array();

Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果

    //润滑油脂物料
    var wlStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        pageSize: 100,
        storeId: 'wlStore',
        fields: ['MAT_NO', 'MAT_DESC', 'UNIT', 'SUPPLY_CODE', 'SUPPLY_NAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/GETMATLIST',
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

    //导入润滑油脂物料
    var wlStore2 = Ext.create("Ext.data.Store", {
        autoLoad: false,
        pageSize: 25,
        storeId: 'wlStore2',
        fields: ['MAT_NO', 'MAT_DESC'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/SELECTMAT',
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
    var matGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'matGridPanel',
        store: wlStore,
        width: '100%',
        region: 'sourth',
        border: false,
        columnLines: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '物料编码',
            dataIndex: 'MAT_NO',
            align: 'center',
            width: 120,
            renderer: atright
        }, {
            text: '物料名称',
            dataIndex: 'MAT_DESC',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '计量单位',
            dataIndex: 'UNIT',
            align: 'center',
            width: 80,
            renderer: atright
        }, {
            text: '供应商编码',
            dataIndex: 'SUPPLY_CODE',
            align: 'center',
            width: 80,
            renderer: atright
        }, {
            text: '供应商名称',
            dataIndex: 'SUPPLY_NAME',
            align: 'center',
            width: 120,
            renderer: atleft
        }],
        bbar: [{
            id: 'gpage',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: wlStore
        }]

    });

    //查询面板
    var northPanel = Ext.create('Ext.form.Panel', {
        id: 'northPanel',
        region: 'fit',
        width: '100%',
        frame: true,
        layout: 'vbox',
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'MAT_NO',
                store: wlStore,
                fieldLabel: '物料编码',
                style: ' margin: 5px 0px 5px 0px',
                labelWidth: 70,
                width: 220,
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'MAT_DESC',
                store: wlStore,
                fieldLabel: '物料名称',
                style: ' margin: 5px 0px 5px 0px',
                labelWidth: 70,
                width: 220,
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '查询',
                style: ' margin: 5px 0px 5px 10px',
                icon: imgpath + '/search.png',
                handler: _select
            }, {
                xtype: 'button',
                text: '导出Excel',
                handler: _exportExcel,
                width: 90,
                style: ' margin: 5px 5px 5px 5px',
                icon: imgpath + '/excel.gif'
            }]
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
            text: '删除选中物料',
            style: ' margin: 5px 0px 5px 10px',
            icon: imgpath + '/delete.png',
            handler: _delete
        }, {
            xtype: 'button',
            text: '导入物料',
            handler: _import,
            width: 80,
            style: ' margin: 5px 5px 5px 5px',
            icon: imgpath + '/311.gif'
        }]
    });

    //弹出框
    var importMatPanel = Ext.create('Ext.form.Panel', {
        id: 'importMatPanel',
        region: 'fit',
        width: '100%',
        frame: true,
        layout: 'column',
        items: [{
            xtype: 'textfield',
            id: 'MAT_DESC2',
            store: wlStore2,
            fieldLabel: '物料描述',
            labelWidth: 70,
            style: ' margin: 5px 10px 5px -5px',
            labelAlign: 'right'
        }, {
            xtype: 'button',
            text: '查询',
            width: 40,
            style: ' margin: 5px 10px 5px 0px',
            handler: _selectMat
        }, {
            xtype: 'button',
            text: '导入选择',
            width: 80,
            style: ' margin: 5px 10px 5px 0px',
            handler: _importMat
        }]
    });

    //导入物料显示grid
    var drwlGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'drwlGridPanel',
        //bodyStyle: 'overflow-x:hidden;overflow-y:scroll',
        store: wlStore2,
        border: false,
        frame: true,
        autoscroll: true,
        columnLines: true,
        plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })],
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [{
            text: '物料号',
            dataIndex: 'MAT_NO',
            align: 'center',
            flex: 1.5,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            },
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                metaData.style = 'background-color: #FFFF99;text-align:left';
                return value;
            }
        }, {
            text: '物料名称',
            dataIndex: 'MAT_DESC',
            align: 'center',
            width: 180,
            flex: 1.5,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            },
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                metaData.style = 'background-color: #FFFF99;text-align:left';
                return value;
            }
        }]
    });

    //弹出框容器
    var importPlanWindow = Ext.create('Ext.window.Window', {
        id: 'importPlanWindow',
        title: '<div align="center"> 导入物料</div>',
        width: 400,
        height: 300,
        modal: true,
        plain: true,
        closable: true,
        closeAction: 'close',
        model: true,
        layout: 'border',
        frame: true,
        items: [{
            region: 'north',
            border: false,
            items: [importMatPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [drwlGridPanel]
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
            items: [northPanel, buttonPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [matGridPanel]
        }]

    });

    _init();
});

function _init() {
    if (true) {
        _select();
        Ext.getBody().unmask();//去除页面笼罩
    }
}

function _select() {
    A_MAT_NO = Ext.getCmp('MAT_NO').getValue();
    A_MAT_DESC = Ext.getCmp('MAT_DESC').getValue();

    var wlStore = Ext.data.StoreManager.lookup('wlStore');
    wlStore.proxy.extraParams = {
        A_MAT_NO: A_MAT_NO,
        A_MAT_DESC: A_MAT_DESC
    };
    wlStore.load();
}

//选择数据并删除
function _delete() {
    var records = Ext.getCmp('matGridPanel').getSelectionModel().getSelection();
    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    for (var i = 0; i < records.length; i++) {
        MAT_NO_LIST.push(records[i].get('MAT_NO'));
    }

    Ext.Ajax.request({
        url: AppUrl + 'ml/DELETEMAT',
        type: 'ajax',
        method: 'POST',
        params: {
            MAT_NO: MAT_NO_LIST
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET == 'Success') {//成功，会传回true
                Ext.Msg.alert('操作信息', data.RET_MSG)
                for (var i = 0; i < records.length; i++) {
                    Ext.data.StoreManager.lookup('wlStore').remove(records[i]);//把这条数据，从页面数据集中移除，现实动态更新页面
                }
                _select();
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


}

//导入数据弹窗
function _import() {
    Ext.getCmp('importPlanWindow').show();
}

//查找导入数据
function _selectMat() {

    A_MAT_DESC = Ext.getCmp('MAT_DESC2').getValue();
    if (A_MAT_DESC == '') {
        Ext.Msg.alert({
            title: '提示',
            msg: '物料描述不能为空!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }
    var wlStore2 = Ext.data.StoreManager.lookup('wlStore2');
    wlStore2.proxy.extraParams = {
        A_MAT_DESC: A_MAT_DESC
    };
    wlStore2.load()
}

//导入数据
function _importMat() {
    var records = Ext.getCmp('drwlGridPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    var A_MAT_NO_LIST = new Array();
    var A_MAT_DESC_LIST = new Array();
    for (var i = 0; i < records.length; i++) {
        A_MAT_NO_LIST.push(records[i].get('MAT_NO'));
        A_MAT_DESC_LIST.push(records[i].get('MAT_DESC'));
    }


    Ext.Ajax.request({
        url: AppUrl + 'ml/IMPORTMAT',
        type: 'ajax',
        method: 'POST',
        params: {
            A_MAT_NO_LIST: A_MAT_NO_LIST,
            A_MAT_DESC_LIST: A_MAT_DESC_LIST
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET == 'Success') {//成功，会传回true
                _select();
                Ext.getCmp('importPlanWindow').close();
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
}
function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}

function _exportExcel() {
    document.location.href = AppUrl + 'ml/GETMATLIST_EXCEL?A_MAT_NO=' +
    A_MAT_NO + '&A_MAT_DESC=' + encodeURI(encodeURI(A_MAT_DESC));
}

