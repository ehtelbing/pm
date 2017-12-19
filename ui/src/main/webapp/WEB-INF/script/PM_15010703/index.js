Ext.onReady(function () {
    Ext.getBody().mask('<p>正在载入中...</p>');

    //检修状态Store
    var jxStatusStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        pageSize: 100,
        storeId: 'jxStatusStore',
        fields: ['ORDER_STATUS', 'ORDER_STATUS_DESC', 'USE_FLAG', 'NEXT_STATUS', 'FINISH_FLAG', 'START_FLAG'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/PRO_DJ703_SELECT',
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

    //菜单面板
    var tablePanel = Ext.create('Ext.panel.Panel', {
        id: 'tablePanel',
        title: '<div align="center"> 检修状态配置</div>',
        region: 'north',
        layout: 'column',
        frame: true,
        items: [{
            xtype: 'textfield',
            id: 'jxStatus',
            fieldLabel: '检修状态',
            labelWidth: 80,
            width: 250,
            style: ' margin: 5px 5px 0px 10px',
            labelAlign: 'right'
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
                id: 'statusCode',
                fieldLabel: '检修状态编码',
                labelWidth: 80,
                width: 250,
                style: ' margin: 40px 5px 0px 10px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'statusName',
                fieldLabel: '检修状态名称',
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
                id: 'use',
                xtype: 'combo',
                // store: mendDeptStore,
                fieldLabel: '是否可用',
                labelWidth: 80,
                width: 250,
                store: [['1', '是'], ['0', '否']],
                value: '1',
                /*displayField: '',
                 valueField: '',*/
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
                xtype: 'textfield',
                id: 'nextStatus',
                fieldLabel: '下一个状态',
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
                xtype: 'button',
                text: '确定',
                style: ' margin: 10px 0px 5px 200px',
                handler: _insertStatus
            }]
        }]
    });

    //显示面板jxStatusStore
    var statusGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'statusGridPanel',
        store: jxStatusStore,
        width: '100%',
        region: 'sourth',
        border: false,
        columnLines: true,
        columns: [{
            text: '检修状态描述',
            dataIndex: 'ORDER_STATUS_DESC',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '是否可用',
            dataIndex: 'USE_FLAG',
            align: 'center',
            width: 120,
            renderer: function isflage(value, metaData, record, rowIdx, colIdx, store, view) {
                if (value == 1) {
                    return "是";
                } else {
                    return "否";
                }
            }
        }, {
            text: '选择',
            align: 'center',
            width: 120,
            renderer: function isflage(value, metaData, record, rowIdx, colIdx, store, view) {
                if (record.data.USE_FLAG == 1) {
                    return "<input type='checkbox' name='radio' onchange='RadioChange(\"" + record.data.ORDER_STATUS + "\",\"" + record.data.USE_FLAG + "\")' checked='checked' />";
                } else {
                    return "<input type='checkbox' name='radio' onchange='RadioChange(\"" + record.data.ORDER_STATUS + "\",\"" + record.data.USE_FLAG + "\")'/>";
                }
            }
        }, {
            text: '',
            align: 'center',
            width: 120,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href="#" onclick="_delete(\'' + record.data.ORDER_STATUS + '\')">' + '删除' + '</a>';
            }
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
            items: [statusGridPanel]
        }]
    });

    _init();

});

//初始化
function _init() {

        Ext.getBody().unmask();//去除页面笼罩
}

//查询工单列表
function _select() {

    var jxStatusStore = Ext.data.StoreManager.lookup('jxStatusStore');
    jxStatusStore.proxy.extraParams = {
        'V_ORDERDESC': Ext.getCmp('jxStatus').getValue()
    };
    jxStatusStore.load();
}

function RadioChange(ORDER_STATUS, USE_FLAG) {

    var ORDER_STATUS = ORDER_STATUS;
    var USE_FLAG = USE_FLAG;
    var V_FLAG = 0;
    if (USE_FLAG == 1) {
        V_FLAG = 0;
    } else {
        V_FLAG = 1;
    }

    Ext.Ajax.request({
        url: AppUrl + 'ml/PRO_DJ703_UPDATEFLAG',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_ORDERSTS': ORDER_STATUS,
            'V_FLAG': V_FLAG
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET == "Success") {
                Ext.Msg.alert('操作信息', '操作成功');
                //   Ext.data.StoreManager.lookup('mendDeptStore').remove();
                _select();
            } else {
                Ext.Msg.alert('操作信息', '操作失败');
            }
        }
    })
}

//新增弹框
function _insert() {

    Ext.getCmp('statusCode').reset();//清空文本框
    Ext.getCmp('statusName').reset();
    Ext.getCmp('nextStatus').reset();
    // alert(Ext.getCmp('use').setValue('1'));
    Ext.getCmp('use').setValue('1');
    //Ext.getCmp('jxDeptName').setValue(firstValue);

    Ext.getCmp('insertWindow').show();
}

//删除检修单位
function _delete(ORDER_STATUS) {

    Ext.Ajax.request({
        url: AppUrl + 'ml/PRO_DJ703_DELETE',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_ORDERSTS': ORDER_STATUS
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
function _insertStatus() {

    var V_ORDERSTS = Ext.getCmp('statusCode').getValue();
    var V_ORDERDESC = Ext.getCmp('statusName').getValue();
    var V_USERFLAG = Ext.getCmp('use').getValue();
    var V_NEXTSTS = Ext.getCmp('nextStatus').getValue();


    if (V_ORDERSTS == '' || V_ORDERDESC == '' || V_USERFLAG == '' || V_NEXTSTS == '') {
        Ext.Msg.alert({
            title: '提示',
            msg: '所填项不能为空!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR

        });
    } else {

        Ext.Ajax.request({
            url: AppUrl + 'ml/PRO_DJ703_INSERT',
            type: 'ajax',
            method: 'POST',
            params: {
                'V_ORDERSTS': V_ORDERSTS,
                'V_ORDERDESC': V_ORDERDESC,
                'V_USERFLAG': V_USERFLAG,
                'V_NEXTSTS': V_NEXTSTS
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


};

/*
 function rendererTime(value, metaData) {
 metaData.style = "text-align:left";
 // return '<div data-qtip="' + value.substring(0, 10) + '" >' + value.substring(0, 10) + '</div>';
 return '<div data-qtip="' + value.split('.0')[0] + '" >' + value.split('.0')[0] + '</div>';
 };
 */

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
};

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
};

/*
 //导出Excel
 function _exportExcel() {
 document.location.href = AppUrl + 'ml/PRO_RUN_EQU_BJ_ALERT_ALL_EXCEL?A_EQUID=' + encodeURI(encodeURI(A_EQUID)) +
 '&A_CYCLE_ID=' + encodeURI(encodeURI(A_CYCLE_ID));
 }
 */
