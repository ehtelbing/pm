Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');


    var deptStore = Ext.create('Ext.data.Store', {
        storeId: 'deptStore',
        autoLoad: false,
        pageSize: -1,
        fields: ['ORG_ID_', 'ORG_CODE_', 'ORG_NAME_', 'PARENT_ORG_ID_', 'PARENT_ORG_CODE_', 'PARENT_ORG_NAME_', 'ORG_LEVEL_', 'ORG_TYPE_', 'ORG_BIZ_TYPE_', 'START_DATE_', 'END_DATE_', 'AREA_', 'ADDR_', 'ZIPCODE_', 'EMAIL_', 'WEB_URL_', 'CONTACT_EMP_NAME_', 'CONTACT_TEL_', 'ORG_MEMO_', 'ORG_STATUS_', 'ORDER_', 'CREATE_DATE_', 'LAST_UPDATE_DATE_', 'OPERATOR_ID_', 'OPERATOR_NAME_'],
        proxy: {
            url: 'selectChildOrg.do',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
            },
            reader: {
                type: 'json',
                root: 'orgList'
            }
        },
        listeners: {
            load: function (store, records) {

            }
        }
    });


    var matJunkRecStockPanel = Ext.create('Ext.grid.Panel', {
        id : 'matJunkRecStockPanel',
        store : deptStore,
        title : '状态检测跟踪维护设置',
        frame : true,
        columnLines : true,
        selModel : {
            selType : 'checkboxmodel',
            mode : 'SINGLE'
        },
        columns : [ {
            text : '设备编码或名称',
            dataIndex : 'MAT_NO_',
            flex : 1
        }, {
            text : '检测方式',
            dataIndex : 'MAT_DESC_',
            flex : 1
        }, {
            text : '设备(潜在)故障描述',
            dataIndex : 'LARGE_MAT_CAT_CODE_',
            flex : 1
        }, {
            text : '维修日期',
            dataIndex : 'UNIT_',
            flex : 1
        }, {
            text : ' 维修内容',
            dataIndex : 'PLANNED_PRICE_',
            flex : 1
        }, {
            text : '故障部件状态',
            dataIndex : 'AMOUNT_',
            flex : 1
        }, {
            text : '故障部件状态',
            dataIndex : 'AMOUNT_',
            flex : 1
        }]
    });
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
        items: [ {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [matJunkRecStockPanel]
        }]
    });

    _init();
});

function _init() {
    if (true) {

        Ext.getBody().unmask();
    }
}



function _preInsertMatStorage() {
    var records = Ext.getCmp('matDisabledStockInDetailPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择报废已回收废品',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

    if (Ext.getCmp('CONFIRM_MAT_STORAGE_ID_').getSubmitValue() == '') {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择确认库房',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

    var MAT_DIS_STOCK_IN_DETAIL_ID_LIST = new Array();
    for (var i = 0; i < records.length; i++) {
        MAT_DIS_STOCK_IN_DETAIL_ID_LIST.push(records[i].get('MAT_DIS_STOCK_IN_DETAIL_ID_'));
    }

    Ext.Ajax.request({
        url: 'updateMatDisabledStockInDetail.do',
        type: 'ajax',
        method: 'POST',
        params: {
            'MAT_DIS_STOCK_IN_DETAIL_ID_LIST': MAT_DIS_STOCK_IN_DETAIL_ID_LIST,
            'MAT_STORAGE_ID_': Ext.getCmp('CONFIRM_MAT_STORAGE_ID_').getSubmitValue()
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                Ext.getCmp('matStorageWindow').close();
                Ext.data.StoreManager.lookup('matDisabledStockInDetailStore').load();
                top.banner.Ext.example.msg('操作信息', '操作成功');
            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: data.message,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        },
        failure: function (response) {
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    });
}
