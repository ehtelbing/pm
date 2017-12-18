var APPLY_ID = '';
if (location.href.split('?')[1] != null) {
    APPLY_ID = Ext.urlDecode(location.href.split('?')[1]).APPLY_ID;
}

var applyMesLoad = false;
var applyMatStoreLoad = false;
var applyMes;

Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果

    Ext.Ajax.request({
        url: AppUrl + 'mwd/PRO_DJ401_APPLYMES',
        type: 'ajax',
        method: 'POST',
        params: {
            'APPLYID_IN': APPLY_ID
        },
        callback: function (options, success, response) {
            if (success) {
                var data = Ext.decode(response.responseText);
                if (data.RET != '') {
                    applyMes = data.RET;
                }
            }
            applyMesLoad = true;
            _init();
        }
    });

    var applyMatStore = Ext.create('Ext.data.Store', {
        storeId: 'applyMatStore',
        autoLoad: true,
        pageSize: -1,
        fields: ['ID', 'APPLY_ID', 'MATERIALCODE', 'MATERIALNAME', 'ETALON', 'MAT_CL', 'UNIT', 'AMOUNT', 'F_PRICE', 'KC_ID'],
        proxy: {
            url: AppUrl + 'mwd/PRO_DJ401_APPLYMATLIST',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                'APPLYID_IN': APPLY_ID
            },
            reader: {
                type: 'json',
                root: 'RET'
            }
        },
        listeners: {
            load: function (store, records) {
                applyMatStoreLoad = true;
                _init();
            }
        }
    });

    var inputPanel = Ext.create('Ext.Panel', {
        border: false,
        frame: true,
        region: 'north',
        //title: '<div align="center"></div>',
        width: '100%',
        layout: 'vbox',
        //height: 50,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'V_APPLY_PLANT',
                editable: false,
                readOnly: true,
                fieldLabel: '厂矿',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_APPLY_DEPART',
                editable: false,
                readOnly: true,
                fieldLabel: '部门',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_INSERT_USERNAME',
                editable: false,
                readOnly: true,
                fieldLabel: '录入人',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'V_ORDERID',
                editable: false,
                readOnly: true,
                fieldLabel: '工单号',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_DJ_CODE',
                editable: false,
                readOnly: true,
                fieldLabel: '电机编号',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_DJ_NAME',
                editable: false,
                readOnly: true,
                fieldLabel: '电机名称',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'V_DJ_UQ_CODE',
                editable: false,
                readOnly: true,
                fieldLabel: '唯一编号',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textarea',
                id: 'V_MEND_CONTEXT',
                editable: false,
                readOnly: true,
                fieldLabel: '检修内容',
                height: 80,
                labelWidth: 80,
                width: 670,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'V_PLAN_BEGINDATE',
                editable: false,
                readOnly: true,
                fieldLabel: '计划开始时间',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_PLAN_ENDDATE',
                editable: false,
                readOnly: true,
                fieldLabel: '计划完成时间',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_MENDDEPT_NAME',
                editable: false,
                readOnly: true,
                fieldLabel: '接收厂矿',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textarea',
                id: 'V_REMARK',
                editable: false,
                readOnly: true,
                fieldLabel: '备注说明',
                height: 80,
                labelWidth: 80,
                width: 670,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }]
    });

    var applyMatGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'applyMatGridPanel',
        title: '<div align="center">附带物料列表</div>',
        store: applyMatStore,
        frame: true,
        columnLines: true,
        height: 150,
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '物料编码',
            dataIndex: 'MATERIALCODE',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '物料名称',
            dataIndex: 'MATERIALNAME',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '规格型号',
            dataIndex: 'ETALON',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '材质',
            dataIndex: 'MAT_CL',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '计量单位',
            dataIndex: 'UNIT',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '单价',
            dataIndex: 'F_PRICE',
            align: 'center',
            width: 80,
            renderer: atright
        }, {
            text: '数量',
            dataIndex: 'AMOUNT',
            align: 'center',
            width: 80,
            renderer: atright
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
        items: [{
            region: 'north',
            border: false,
            items: [inputPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [applyMatGridPanel]
        }]
    });

    _init();
});

function _init() {
    if (applyMesLoad && applyMatStoreLoad) {
        if (applyMes == null) {
            Ext.MessageBox.show({
                title: '错误',
                msg: '信息加载失败',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
            return;
        }

        Ext.getCmp('V_APPLY_PLANT').setValue(applyMes[0].APPLY_PLANTNAME);
        Ext.getCmp('V_APPLY_DEPART').setValue(applyMes[0].APPLY_DEPARTNAME);
        Ext.getCmp('V_INSERT_USERNAME').setValue(applyMes[0].INSERT_USERNAME);
        Ext.getCmp('V_ORDERID').setValue(applyMes[0].ORDERID);
        Ext.getCmp('V_DJ_CODE').setValue(applyMes[0].DJ_CODE);
        Ext.getCmp('V_DJ_NAME').setValue(applyMes[0].DJ_NAME);
        Ext.getCmp('V_DJ_UQ_CODE').setValue(applyMes[0].DJ_UQ_CODE);
        Ext.getCmp('V_MEND_CONTEXT').setValue(applyMes[0].MEND_CONTEXT);
        Ext.getCmp('V_PLAN_BEGINDATE').setValue(applyMes[0].PLAN_BEGINDATE.split('.')[0]);
        Ext.getCmp('V_PLAN_ENDDATE').setValue(applyMes[0].PLAN_ENDDATE.split('.')[0]);
        Ext.getCmp('V_MENDDEPT_NAME').setValue(applyMes[0].MENDDEPT_NAME);
        Ext.getCmp('V_REMARK').setValue(applyMes[0].REMARK);


        Ext.getBody().unmask();//去除页面笼罩
    }

}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}