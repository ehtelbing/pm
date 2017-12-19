var A_USERID = Ext.util.Cookies.get("v_personcode");
var A_USERNAME = Ext.util.Cookies.get("v_personname2");

var typeStoreLoad = false;

Ext.onReady(function () {
    Ext.getBody().mask('<p>正在载入中...</p>');

    //检修状态Store
    var typeStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        pageSize: 200,
        storeId: 'typeStore',
        fields: ['I_INDEX', 'TYPECODE', 'TYPENAME', 'STATUS', 'STATUS_DESC', 'TYPE_PREFIX', 'TYPE_UNIT', 'REC_STATUS', 'REC_STATUS_DESC'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/GETITYPELIST',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            },
            extraParams: {}
        },
        listeners: {
            load: function (store, records) {
                typeStoreLoad = true;
                _init();
            }
        }
    });

    //菜单面板
    var tablePanel = Ext.create('Ext.panel.Panel', {
        id: 'tablePanel',
        //title: '<div align="center"> 检修状态配置</div>',
        region: 'north',
        layout: 'column',
        frame: true,
        items: [{
            xtype: 'button',
            text: '新增',
            style: ' margin: 5px 0px 5px 10px',
            icon: imgpath + '/add.png',
            handler: _insert
        }, {
            xtype: 'button',
            text: '查询',
            style: ' margin: 5px 0px 5px 10px',
            icon: imgpath + '/search.png',
            handler: _refresh
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
                id: 'typeCode',
                maxLength: 8,
                enforceMaxLength: true,
                fieldLabel: '分类编号',
                labelWidth: 80,
                width: 250,
                style: ' margin: 25px 5px 0px 10px',
                labelAlign: 'right'
            }, {
                xtype: "label",
                style: ' margin: 25px 5px 0px 10px;color:red',
                text: "*最多可输入8个字符"
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'typeName',
                maxLength: 8,
                enforceMaxLength: true,
                fieldLabel: '分类名',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 5px 0px 10px',
                labelAlign: 'right'
            }, {
                xtype: "label",
                style: ' margin: 5px 5px 0px 10px;color:red',
                text: "*最多可输入8个字符"
            }]
        }, {
            xtype: 'radiogroup',
            labelWidth: 80,
            width: 250,
            style: ' margin: 5px 5px 0px 10px',
            fieldLabel: '使用状态',
            labelAlign: 'right',
            id: 'useStatus', // 后台返回的JSON格式，直接赋值；
            items: [{
                boxLabel: '启用',
                name: 'useStatus',
                checked: true,
                inputValue: 1
            }, {
                boxLabel: '停用',
                name: 'useStatus',
                inputValue: 0
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'codePrefix',
                fieldLabel: '编码前缀',
                maxLength: 8,
                enforceMaxLength: true,
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 5px 0px 10px',
                labelAlign: 'right'
            }, {
                xtype: "label",
                style: ' margin: 5px 5px 0px 10px;color:red',
                text: "*最多可输入8个字符"
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'unit',
                fieldLabel: '默认单位',
                maxLength: 8,
                enforceMaxLength: true,
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 5px 0px 10px',
                labelAlign: 'right'
            }, {
                xtype: "label",
                style: ' margin: 5px 5px 0px 10px;color:red',
                text: "*最多可输入8个字符"
            }]
        }, {
            xtype: 'radiogroup',
            labelWidth: 80,
            width: 250,
            fieldLabel: '回收状态',
            labelAlign: 'right',
            style: ' margin: 5px 5px 0px 10px',
            id: 'recStatus', // 后台返回的JSON格式，直接赋值；
            items: [{
                boxLabel: '回收',
                name: 'recStatus',
                checked: true,
                inputValue: 1
            }, {
                boxLabel: '不回收',
                name: 'recStatus',
                inputValue: 0
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'numberfield',
                id: 'number',
                fieldLabel: '顺序号',
                labelWidth: 80,
                width: 250,
                minValue: 0,
                style: ' margin: 5px 5px 0px 10px',
                labelAlign: 'right'
            }, {
                xtype: "label",
                style: ' margin: 5px 5px 0px 10px;color:red',
                text: "*只能输入数字"
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'button',
                text: '保存',
                style: ' margin: 10px 0px 5px 250px',
                handler: _insertStatus
            }]
        }]
    });

    //修改面板
    var updatePanel = Ext.create('Ext.panel.Panel', {
        id: 'updatePanel',
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
                id: 'utypeCode',
                fieldLabel: '分类编号',
                readOnly: true,
                labelWidth: 80,
                width: 250,
                style: ' margin: 25px 5px 0px 10px',
                labelAlign: 'right'
            }, {
                xtype: "label",
                style: ' margin: 25px 5px 0px 10px;color:red',
                text: "*最多可输入8个字符"
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'utypeName',
                fieldLabel: '分类名',
                maxLength: 8,
                enforceMaxLength: true,
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 5px 0px 10px',
                labelAlign: 'right'
            }, {
                xtype: "label",
                style: ' margin: 5px 5px 0px 10px;color:red',
                text: "*最多可输入8个字符"
            }]
        }, {
            xtype: 'radiogroup',
            labelWidth: 80,
            width: 250,
            style: ' margin: 5px 5px 0px 10px',
            fieldLabel: '使用状态',
            labelAlign: 'right',
            id: 'uuseStatus', // 后台返回的JSON格式，直接赋值；
            items: [{
                boxLabel: '启用',
                name: 'uuseStatus',
                checked: true,
                inputValue: 1
            }, {
                boxLabel: '停用',
                name: 'uuseStatus',
                inputValue: 0
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'ucodePrefix',
                fieldLabel: '编码前缀',
                maxLength: 8,
                enforceMaxLength: true,
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 5px 0px 10px',
                labelAlign: 'right'
            }, {
                xtype: "label",
                style: ' margin: 5px 5px 0px 10px;color:red',
                text: "*最多可输入8个字符"
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'uunit',
                fieldLabel: '默认单位',
                maxLength: 8,
                enforceMaxLength: true,
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 5px 0px 10px',
                labelAlign: 'right'
            }, {
                xtype: "label",
                style: ' margin: 5px 5px 0px 10px;color:red',
                text: "*最多可输入8个字符"
            }]
        }, {
            xtype: 'radiogroup',
            labelWidth: 80,
            width: 250,
            fieldLabel: '回收状态',
            labelAlign: 'right',
            style: ' margin: 5px 5px 0px 10px',
            id: 'urecStatus', // 后台返回的JSON格式，直接赋值；
            items: [{
                boxLabel: '回收',
                name: 'urecStatus',
                checked: true,
                inputValue: 1
            }, {
                boxLabel: '不回收',
                name: 'urecStatus',
                inputValue: 0
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'numberfield',
                id: 'unumber',
                fieldLabel: '顺序号',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 5px 0px 10px',
                labelAlign: 'right'
            }, {
                xtype: "label",
                style: ' margin: 5px 5px 0px 10px;color:red',
                text: "*只能输入数字"
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'button',
                text: '保存',
                style: ' margin: 10px 0px 5px 250px',
                handler: _updateStatus
            }]
        }]
    });

    //显示面板
    var typeGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'typeGridPanel',
        store: typeStore,
        width: '100%',
        region: 'sourth',
        border: false,
        columnLines: true,
        columns: [{
            text: '顺序号',
            dataIndex: 'I_INDEX',
            align: 'center',
            width: 60,
            renderer: atright
        }, {
            text: '分类编号',
            dataIndex: 'TYPECODE',
            align: 'center',
            width: 120,
            renderer: atright
        }, {
            text: '分类名',
            dataIndex: 'TYPENAME',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '使用状态',
            align: 'center',
            dataIndex: 'STATUS_DESC',
            width: 120,
            renderer: atleft
        }, {
            text: '分类物料编码前缀',
            align: 'center',
            dataIndex: 'TYPE_PREFIX',
            width: 120,
            renderer: atright
        }, {
            text: '分类物料默认单位',
            align: 'center',
            dataIndex: 'TYPE_UNIT',
            width: 120,
            renderer: atright
        }, {
            text: '回收状态',
            align: 'center',
            dataIndex: 'REC_STATUS_DESC',
            width: 120,
            renderer: atleft
        }, {
            text: '修改',
            align: 'center',
            dataIndex: '',
            width: 120,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href="#" onclick="_update(\'' + record.data.TYPECODE + '\',\'' + record.data.TYPENAME + '\',\'' + record.data.STATUS_DESC + '\'' +
                    ',\'' + record.data.TYPE_PREFIX + '\',\'' + record.data.TYPE_UNIT + '\',\'' + record.data.REC_STATUS_DESC + '\',\'' + record.data.I_INDEX + '\')">' + '修改' + '</a>';
            }
        }, {
            text: '删除',
            align: 'center',
            dataIndex: '',
            width: 120,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href="#" onclick="_delete(\'' + record.data.TYPECODE + '\')">' + '删除' + '</a>';
            }
        }], bbar: [{
            id: 'gpage',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            width: '100%',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: typeStore
        }]
    });

    //新增弹出框容器
    var insertWindow = Ext.create('Ext.window.Window', {
        id: 'insertWindow',
        title: '<div align="center">新增</div>',
        width: 500,
        height: 400,
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

    //修改弹出框容器
    var updateWindow = Ext.create('Ext.window.Window', {
        id: 'updateWindow',
        title: '<div align="center">修改</div>',
        width: 500,
        height: 400,
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
            items: [updatePanel]
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
            items: [typeGridPanel]
        }]
    });

    _init();

});

//初始化
function _init() {

    if (typeStoreLoad) {
        Ext.getBody().unmask();//去除页面笼罩
    }
}

//刷新界面
function _refresh() {
    Ext.data.StoreManager.lookup('typeStore').load();
}

//新增弹框
function _insert() {

    Ext.getCmp('typeCode').reset();
    Ext.getCmp('typeName').reset();
    Ext.getCmp('useStatus').items.get(0).setValue(true);
    Ext.getCmp('codePrefix').reset();
    Ext.getCmp('unit').reset();
    Ext.getCmp('recStatus').items.get(0).setValue(true);
    Ext.getCmp('number').setValue('0');

    Ext.getCmp('insertWindow').show();
}

//新增分类
function _insertStatus() {

    var A_TYPECODE = Ext.getCmp('typeCode').getValue();
    var A_TYPENAME = Ext.getCmp('typeName').getValue();
    var A_STATUS = Ext.getCmp('useStatus').getValue();
    var A_TYPE_PREFIX = Ext.getCmp('codePrefix').getValue();
    var A_TYPE_UNIT = Ext.getCmp('unit').getValue();
    var A_REC_STATUS = Ext.getCmp('recStatus').getValue();
    var A_INDEX = Ext.getCmp('number').getValue();

    if (A_TYPECODE == '' || A_TYPECODE.length > 8) {
        Ext.Msg.alert({
            title: '提示',
            msg: '分类编号最多可输入8个字符!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }
    Ext.Ajax.request({
        url: AppUrl + 'ml/ADDITYPE',
        type: 'ajax',
        method: 'POST',
        params: {
            'A_TYPECODE': A_TYPECODE,
            'A_TYPENAME': A_TYPENAME,
            'A_STATUS': A_STATUS,
            'A_TYPE_PREFIX': A_TYPE_PREFIX,
            'A_TYPE_UNIT': A_TYPE_UNIT,
            'A_REC_STATUS': A_REC_STATUS,
            'A_USERID': A_USERID,
            'A_USERNAME': A_USERNAME,
            'A_INDEX': A_INDEX
        },

        success: function (response, options) {
            var data = Ext.decode(response.responseText);
            if (data.RET == "Success") {
                Ext.Msg.alert('操作信息', '操作成功');
                Ext.getCmp('insertWindow').close();
                Ext.data.StoreManager.lookup('typeStore').load();
            } else {
                Ext.Msg.alert('操作信息', '操作失败');
            }
        }
    });

}

//修改弹框
function _update(TYPECODE, TYPENAME, STATUS_DESC, TYPE_PREFIX, TYPE_UNIT, REC_STATUS_DESC, I_INDEX) {
    Ext.getCmp('updateWindow').show();
    Ext.getCmp('utypeCode').setValue(TYPECODE);
    Ext.getCmp('utypeName').setValue(TYPENAME);
    if (STATUS_DESC == '启用') {
        Ext.getCmp('uuseStatus').items.get(0).setValue(true);
    } else {
        Ext.getCmp('uuseStatus').items.get(1).setValue(true);
    }
    Ext.getCmp('ucodePrefix').setValue(TYPE_PREFIX);
    Ext.getCmp('uunit').setValue(TYPE_UNIT);
    if (REC_STATUS_DESC == '启用') {
        Ext.getCmp('urecStatus').items.get(0).setValue(true);
    } else {
        Ext.getCmp('urecStatus').items.get(1).setValue(true);
    }
    Ext.getCmp('unumber').setValue(I_INDEX);

}

//修改物资分类
function _updateStatus() {

    var A_TYPECODE = Ext.getCmp('utypeCode').getValue();
    var A_TYPENAME = Ext.getCmp('utypeName').getValue();
    var A_STATUS = Ext.getCmp('uuseStatus').getValue();
    var A_TYPE_PREFIX = Ext.getCmp('ucodePrefix').getValue();
    var A_TYPE_UNIT = Ext.getCmp('uunit').getValue();
    var A_REC_STATUS = Ext.getCmp('urecStatus').getValue();
    var A_INDEX = Ext.getCmp('unumber').getValue();

    Ext.Ajax.request({
        url: AppUrl + 'ml/UPDTEITYPE',//pg_dj704.updteitype
        type: 'ajax',
        method: 'POST',
        params: {
            'A_TYPECODE': A_TYPECODE,
            'A_TYPENAME': A_TYPENAME,
            'A_STATUS': A_STATUS,
            'A_TYPE_PREFIX': A_TYPE_PREFIX,
            'A_TYPE_UNIT': A_TYPE_UNIT,
            'A_REC_STATUS': A_REC_STATUS,
            'A_USERID': A_USERID,
            'A_USERNAME': A_USERNAME,
            'A_INDEX': A_INDEX
        },

        success: function (response, options) {
            var data = Ext.decode(response.responseText);

            if (data.RET == "Success") {
                Ext.Msg.alert('操作信息', '操作成功');
                Ext.getCmp('updateWindow').close();
                Ext.data.StoreManager.lookup('typeStore').load();
            } else {
                Ext.Msg.alert('操作信息', '操作失败');
            }
        }
    });
}

//删除检修单位
function _delete(TYPECODE) {

    Ext.Ajax.request({
        url: AppUrl + 'ml/DELETEITYPE',
        type: 'ajax',
        method: 'POST',
        params: {
            'A_TYPECODE': TYPECODE,
            'A_USERID': Ext.util.Cookies.get("v_personcode"),
            'A_USERNAME': Ext.util.Cookies.get("v_personname2")
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET == "Success") {
                Ext.Msg.alert('操作信息', '删除成功');
                //   Ext.data.StoreManager.lookup('mendDeptStore').remove();
                Ext.data.StoreManager.lookup('typeStore').load();
            } else {
                Ext.Msg.alert('操作信息', '操作失败');
            }
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

/*
 function rendererTime(value, metaData) {
 metaData.style = "text-align:left";
 // return '<div data-qtip="' + value.substring(0, 10) + '" >' + value.substring(0, 10) + '</div>';
 return '<div data-qtip="' + value.split('.0')[0] + '" >' + value.split('.0')[0] + '</div>';
 };

 //导出Excel
 function _exportExcel() {
 document.location.href = AppUrl + 'ml/PRO_RUN_EQU_BJ_ALERT_ALL_EXCEL?A_EQUID=' + encodeURI(encodeURI(A_EQUID)) +
 '&A_CYCLE_ID=' + encodeURI(encodeURI(A_CYCLE_ID));
 }
 */
