var equTypeStoreLoad = false;
var A_A_EQUIP_NO = '';

Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果

    var equTypeStore = Ext.create('Ext.data.Store', {
        storeId: 'equTypeStore',
        autoLoad: true,
        pageSize: -1,
        fields: ['TYPE_CODE', 'TYPE_DESC'],
        proxy: {
            url: AppUrl + 'mwd/GET_EQU_TYPE_LIST_ABLE',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'RET'
            }
        },
        listeners: {
            load: function (store, records) {
                equTypeStoreLoad = true;
                Ext.getCmp('A_EQUTYPE').select(store.first());
                _init();
            }
        }
    });

    var equStore = Ext.create('Ext.data.Store', {
        storeId: 'equStore',
        autoLoad: false,
        pageSize: 100,
        fields: ['EQUIP_NO', 'EQUIP_DESC', 'EQU_LEVEL', 'EQUIP_REMARK'],
        proxy: {
            url: AppUrl + 'mwd/GET_EQU_LIST',
            async: false,
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'RET'
            }
        }
    });

    var partStore = Ext.create('Ext.data.Store', {
        storeId: 'partStore',
        autoLoad: false,
        pageSize: 30,
        fields: ['PART_NO', 'PART_DESC', 'EQUIP_NO', 'EQUIP_DESC', 'WORK_DESC', 'OIL_TYPE', 'DESIGN_OIL_DESC',
            'SUMMER_OIL_DESC', 'WINTER_OIL_DESC', 'CURRENT_OIL_DESC', 'DESIGN_OIL_CODE', 'SUMMER_OIL_CODE', 'WINTER_OIL_CODE',
            'CURRENT_OIL_CODE', 'OIL_ETALON', 'OIL_QS', 'PART_REMARK', 'PART_STATUS', 'PART_STATUS_DESC', 'INSERTDATE',
            'ORDER_DESC', 'DEL_FLAG', 'DEL_FLAG_DESC', 'OIL_CYCLE', 'PART_LEVEL'],
        proxy: {
            url: AppUrl + 'mwd/GET_PART_LIST_SELECT',
            async: false,
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'RET',
                total: 'total'
            }
        }
    });

    var equGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'equGridPanel',
        //title: '<div align="center">定额预算表</div>',
        store: equStore,
        width: '100%',
        height: window.screen.height / 3 - 70,
        frame: true,
        columnLines: true,
        /*selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },*/
        columns: [{
            text: '主机编码',
            dataIndex: 'EQUIP_NO',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '主机名称',
            dataIndex: 'EQUIP_DESC',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '选择',
            dataIndex: 'EQUIP_DESC',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href=javascript:dealWith(\'</a><a href="#" onclick="_chooseEqu(\'' + record.data.EQUIP_NO + '\',\'' + record.data.EQUIP_DESC + '\')">' + '润滑规范' + '</a>';
            }
        }]
    });

    var partGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'partGridPanel',
        //title: '<div align="center">定额预算表</div>',
        store: partStore,
        frame: true,
        columnLines: true,
        /*selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },*/
        columns: [{
            text: '润滑部位编号',
            dataIndex: 'PART_NO',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '润滑部位名称',
            dataIndex: 'PART_DESC',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '设计油品牌号',
            dataIndex: 'DESIGN_OIL_CODE',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '工况描述',
            dataIndex: 'WORK_DESC',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '加油方式',
            dataIndex: 'OIL_TYPE',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '加油周期',
            dataIndex: 'OIL_CYCLE',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '夏季使用牌号',
            dataIndex: 'SUMMER_OIL_CODE',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '冬季使用牌号',
            dataIndex: 'WINTER_OIL_CODE',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '目前使用油脂',
            dataIndex: 'CURRENT_OIL_CODE',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '规范油脂型号',
            dataIndex: 'OIL_ETALON',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '产品标准',
            dataIndex: 'OIL_QS',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '部位等级',
            dataIndex: 'PART_LEVEL',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '备注',
            dataIndex: 'PART_REMARK',
            align: 'center',
            width: 120,
            renderer: atleft
        }],
        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: partStore,
            dock: 'bottom',
            displayInfo: true
        }]
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        border: false,
        frame: true,
        region: 'north',
        //title: '<div align="center"></div>',
        width: '100%',
        //height: 50,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'combo',
                id: 'A_EQUTYPE',
                store: equTypeStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '设备类型设置',
                displayField: 'TYPE_DESC',
                valueField: 'TYPE_CODE',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectEquList();
                    }
                }
            }, {
                xtype: 'button',
                text: '查询',
                align: 'center',
                width: 70,
                handler: _selectEquList,
                style: ' margin: 5px 0px 5px 5px',
                icon: imgpath + '/search.png'
            }]
        }]
    });

    var partButtonPanel = Ext.create('Ext.Panel', {
        border: false,
        frame: true,
        region: 'north',
        //title: '<div align="center"></div>',
        width: '100%',
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'A_EQU_NAME',
                readOnly: true,
                fieldLabel: '主机名称',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 5px -20px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'A_MAT_NO',
                fieldLabel: '油脂编码',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'A_MAT_DESC',
                fieldLabel: '油脂描述',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'A_PART_DESC',
                fieldLabel: '部位描述',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '查询',
                align: 'center',
                width: 70,
                handler: _selectPart,
                style: ' margin: 5px 0px 5px 5px',
                icon: imgpath + '/search.png'
            }]
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
            items: [buttonPanel, equGridPanel, partButtonPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [partGridPanel]
        }]
    });

    _init();
});

function _init() {
    if (equTypeStoreLoad) {

        _selectEquList();
        Ext.getBody().unmask();//去除页面笼罩
    }

}

function _selectEquList() {
    A_A_EQUIP_NO == '';
    Ext.getCmp('A_EQU_NAME').setValue('');
    Ext.data.StoreManager.lookup('partStore').removeAll();
    var equStore = Ext.data.StoreManager.lookup('equStore');
    equStore.proxy.extraParams = {
        A_EQUTYPE: Ext.getCmp('A_EQUTYPE').getValue()
    };
    equStore.load();
}

function _chooseEqu(EQUIP_NO, EQUIP_DESC) {
    A_A_EQUIP_NO = EQUIP_NO;
    Ext.getCmp('A_EQU_NAME').setValue(Ext.getCmp('A_EQUTYPE').getRawValue() + '/' + EQUIP_DESC);
    _selectPart();
}

function _selectPart() {
    if (A_A_EQUIP_NO == '') {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择主机',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    var partStore = Ext.data.StoreManager.lookup('partStore');
    partStore.proxy.extraParams = {
        'A_EQUIP_NO': A_A_EQUIP_NO,
        'A_MAT_NO': Ext.getCmp('A_MAT_NO').getValue(),
        'A_MAT_DESC': Ext.getCmp('A_MAT_DESC').getValue(),
        'A_PART_DESC': Ext.getCmp('A_PART_DESC').getValue()
    };
    partStore.currentPage = 1;
    partStore.load();
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}