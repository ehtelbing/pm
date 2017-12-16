var equTypeStoreLoad = false;
var mathTypeStoreLoad = false;
var unitStoreLoad = false;
var A_A_EQUIP_NO = '';
var S_EQUIP_NO = '';
var S_PART_NO = '';

Ext.define('Ext.ux.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    async: true,
    doRequest: function (operation, callback, scope) {
        var writer = this.getWriter(),
            request = this.buildRequest(operation);
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        Ext.apply(request, {
            async: this.async,
            binary: this.binary,
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, callback, scope),
            method: this.getMethod(request),
            disableCaching: false
        });
        Ext.Ajax.request(request);
        return request;
    }
});

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

    //计算方式
    var mathTypeStore = Ext.create('Ext.data.Store', {
        storeId: 'mathTypeStore',
        autoLoad: true,
        pageSize: -1,
        fields: ['CYCLE_TYPE', 'CYCLE_TYPE_DESC'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax",{
            url: AppUrl + 'mwd/GET_MATH_TYPE',
            type: 'ajax',
            async: false,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'RET'
            }
        }),
        listeners: {
            load: function (store, records) {
                mathTypeStoreLoad = true;
                Ext.getCmp('A_CYCLE_TYPE').select(store.first());
                _init();
            }
        }
    });

    //加油单位
    var unitStore = Ext.create('Ext.data.Store', {
        storeId: 'unitStore',
        autoLoad: true,
        pageSize: -1,
        fields: ['INSERT_UNIT', 'INSERT_UNIT_DESC'],
        proxy: {
            url: AppUrl + 'mwd/GET_UNIT',
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
                unitStoreLoad = true;
                Ext.getCmp('A_INSERT_UNIT').select(store.first());
                _init();
            }
        }
    });

    //计量单位
    var mathUnitStore = Ext.create('Ext.data.Store', {
        storeId: 'mathUnitStore',
        autoLoad: false,
        pageSize: -1,
        fields: ['CYCLE_UNIT', 'CYCLE_UNIT_DESC'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax",{
            url: AppUrl + 'mwd/GET_MATH_UNIT',
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
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('A_CYCLE_UNIT').select(store.first());
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
            url: AppUrl + 'mwd/GET_PART_LIST',
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
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
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
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
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
            width: 120,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return value + '(' + '<a href=javascript:dealWith(\'</a><a href="#" onclick="_showSetCycle(\'' + record.data.EQUIP_NO + '\',\'' + record.data.PART_NO + '\')">' + '设置' + '</a>' + ')';
            }
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
            }, {
                xtype: 'button',
                text: '新增规范',
                align: 'center',
                handler: _showAddWindow,
                style: ' margin: 5px 0px 5px 5px',
                icon: imgpath + '/add.png'
            }, {
                xtype: 'button',
                text: '修改',
                align: 'center',
                width: 70,
                handler: _showUpdateWindow,
                style: ' margin: 5px 0px 5px 5px',
                icon: imgpath + '/edit.png'
            }, {
                xtype: 'button',
                text: '删除',
                align: 'center',
                width: 70,
                handler: _deleteEqu,
                style: ' margin: 5px 0px 5px 5px',
                icon: imgpath + '/delete.png'
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
                fieldLabel: '当前选择的设备',
                labelWidth: 90,
                width: 250,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '新增部位',
                align: 'center',
                handler: _showPart,
                style: ' margin: 5px 0px 5px 5px',
                icon: imgpath + '/add.png'
            }, {
                xtype: 'button',
                text: '修改选中的部位',
                align: 'center',
                handler: _showUpdatePart,
                style: ' margin: 5px 0px 5px 5px',
                icon: imgpath + '/edit.png'
            }, {
                xtype: 'button',
                text: '删除选中的部位',
                align: 'center',
                handler: _deletePart,
                style: ' margin: 5px 0px 5px 5px',
                icon: imgpath + '/delete.png'
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

    var addWindow = Ext.create('Ext.window.Window', {
        id: 'addWindow',
        title: '<div align="center">新增规范</div>',
        width: 340,
        height: 250,
        modal: true,
        closable: true,
        closeAction: 'close',
        layout: 'vbox',
        frame: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'A_EQUIP_NO',
                fieldLabel: '主机编码',
                labelWidth: 80,
                width: 220,
                style: ' margin: 20px 0px 5px 20px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'A_EQUIP_NAME',
                fieldLabel: '主机名称',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 20px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'A_REMARK',
                fieldLabel: '备注',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 20px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'A_EQU_LEVEL',
                fieldLabel: '设备等级',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 20px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'button',
                text: '保存',
                icon: imgpath + '/filesave.png',
                style: 'margin: 20px 0px 20px 185px',
                handler: _insertEqu
            }]
        }]
    });

    var updateWindow = Ext.create('Ext.window.Window', {
        id: 'updateWindow',
        title: '<div align="center">修改规范</div>',
        width: 340,
        height: 250,
        modal: true,
        closable: true,
        closeAction: 'close',
        layout: 'vbox',
        frame: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'U_A_EQUIP_NO',
                fieldLabel: '主机编码',
                readOnly: true,
                labelWidth: 80,
                width: 220,
                style: ' margin: 20px 0px 5px 20px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'U_A_EQUIP_NAME',
                fieldLabel: '主机名称',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 20px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'U_A_REMARK',
                fieldLabel: '备注',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 20px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'U_A_EQU_LEVEL',
                fieldLabel: '设备等级',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 20px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'button',
                text: '保存',
                icon: imgpath + '/filesave.png',
                style: 'margin: 20px 0px 20px 185px',
                handler: _updateEqu
            }]
        }]
    });

    var addPartWindow = Ext.create('Ext.window.Window', {
        id: 'addPartWindow',
        title: '<div align="center">新增部位</div>',
        width: 660,
        height: 260,
        modal: true,
        closable: true,
        closeAction: 'close',
        layout: 'vbox',
        frame: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'A_PART_NO',
                fieldLabel: '部位编号',
                labelWidth: 80,
                width: 200,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'A_PART_DESC',
                fieldLabel: '部位名',
                labelWidth: 80,
                width: 200,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'A_WINTER_OIL_CODE',
                fieldLabel: '冬季用油',
                labelWidth: 80,
                width: 200,
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
                id: 'A_DESIGN_OIL_CODE',
                fieldLabel: '设计用油',
                labelWidth: 80,
                width: 200,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'A_SUMMER_OIL_CODE',
                fieldLabel: '夏季用油',
                labelWidth: 80,
                width: 200,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'A_CURRENT_OIL_CODE',
                fieldLabel: '目前用油',
                labelWidth: 80,
                width: 200,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'tbtext',
                text: '<span style="color:red; font-size:12px">（*用油项目，请填写对应的物料号）</span>',
                style: ' margin: 0px 0px 0px 45px'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'A_WORK_DESC',
                fieldLabel: '工况描述',
                labelWidth: 80,
                width: 200,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'A_OIL_TYPE',
                fieldLabel: '加油方式',
                labelWidth: 80,
                width: 200,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'A_OIL_ETALON',
                fieldLabel: '油脂型号',
                labelWidth: 80,
                width: 200,
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
                id: 'A_OIL_QS',
                fieldLabel: '产品标准',
                labelWidth: 80,
                width: 200,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'A_PART_LEVEL',
                fieldLabel: '部位等级',
                labelWidth: 80,
                width: 200,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'A_PART_REMARK',
                fieldLabel: '备注',
                labelWidth: 80,
                width: 200,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'button',
                text: '保存',
                icon: imgpath + '/filesave.png',
                style: 'margin: 20px 0px 20px 555px',
                handler: _insertPart
            }]
        }]
    });

    var updatePartWindow = Ext.create('Ext.window.Window', {
        id: 'updatePartWindow',
        title: '<div align="center">修改部位</div>',
        width: 660,
        height: 260,
        modal: true,
        closable: true,
        closeAction: 'close',
        layout: 'vbox',
        frame: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'U_PART_NO',
                fieldLabel: '部位编号',
                readOnly: true,
                labelWidth: 80,
                width: 200,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'U_PART_DESC',
                fieldLabel: '部位名',
                labelWidth: 80,
                width: 200,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'U_WINTER_OIL_CODE',
                fieldLabel: '冬季用油',
                labelWidth: 80,
                width: 200,
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
                id: 'U_DESIGN_OIL_CODE',
                fieldLabel: '设计用油',
                labelWidth: 80,
                width: 200,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'U_SUMMER_OIL_CODE',
                fieldLabel: '夏季用油',
                labelWidth: 80,
                width: 200,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'U_CURRENT_OIL_CODE',
                fieldLabel: '目前用油',
                labelWidth: 80,
                width: 200,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'tbtext',
                text: '<span style="color:red; font-size:12px">（*用油项目，请填写对应的物料号）</span>',
                style: ' margin: 0px 0px 0px 45px'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'U_WORK_DESC',
                fieldLabel: '工况描述',
                labelWidth: 80,
                width: 200,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'U_OIL_TYPE',
                fieldLabel: '加油方式',
                labelWidth: 80,
                width: 200,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'U_OIL_ETALON',
                fieldLabel: '油脂型号',
                labelWidth: 80,
                width: 200,
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
                id: 'U_OIL_QS',
                fieldLabel: '产品标准',
                labelWidth: 80,
                width: 200,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'U_PART_LEVEL',
                fieldLabel: '部位等级',
                labelWidth: 80,
                width: 200,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'U_PART_REMARK',
                fieldLabel: '备注',
                labelWidth: 80,
                width: 200,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'button',
                text: '保存',
                icon: imgpath + '/filesave.png',
                style: 'margin: 20px 0px 20px 555px',
                handler: _updatePart
            }]
        }]
    });

    var setCycleWindow = Ext.create('Ext.window.Window', {
        id: 'setCycleWindow',
        title: '<div align="center">设置加油周期</div>',
        width: 340,
        height: 280,
        modal: true,
        closable: true,
        closeAction: 'close',
        layout: 'vbox',
        frame: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'combo',
                id: 'A_CYCLE_TYPE',
                store: mathTypeStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '计算方式',
                displayField: 'CYCLE_TYPE_DESC',
                valueField: 'CYCLE_TYPE',
                labelWidth: 80,
                width: 220,
                style: ' margin: 20px 0px 5px 20px',
                labelAlign: 'right',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectMathUnit();
                    }
                }
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'combo',
                id: 'A_CYCLE_UNIT',
                store: mathUnitStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '计量单位',
                displayField: 'CYCLE_UNIT_DESC',
                valueField: 'CYCLE_UNIT',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 20px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'numberfield',
                id: 'A_CYCLE_VALUE',
                fieldLabel: '周期值',
                labelWidth: 80,
                width: 220,
                value: 0,
                minValue: 0,
                style: ' margin: 5px 0px 5px 20px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'numberfield',
                id: 'A_INSERT_AMOUNT',
                fieldLabel: '单次加油量',
                labelWidth: 80,
                width: 220,
                value: 0,
                minValue: 0,
                style: ' margin: 5px 0px 5px 20px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'combo',
                id: 'A_INSERT_UNIT',
                store: unitStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '加油单位',
                displayField: 'INSERT_UNIT_DESC',
                valueField: 'INSERT_UNIT',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 20px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'button',
                text: '保存',
                icon: imgpath + '/filesave.png',
                style: 'margin: 20px 0px 20px 185px',
                handler: _saveSetCycle
            }]
        }]
    });

    _init();
});

function _init() {
    if (equTypeStoreLoad && mathTypeStoreLoad && unitStoreLoad) {

        _selectEquList();
        Ext.getBody().unmask();//去除页面笼罩
    }

}

function _selectEquList() {
    A_A_EQUIP_NO = '';
    Ext.getCmp('A_EQU_NAME').setValue('');
    Ext.data.StoreManager.lookup('partStore').removeAll();
    var equStore = Ext.data.StoreManager.lookup('equStore');
    equStore.proxy.extraParams = {
        A_EQUTYPE: Ext.getCmp('A_EQUTYPE').getValue()
    };
    equStore.load();
}

function _selectPart() {
    var partStore = Ext.data.StoreManager.lookup('partStore');
    partStore.proxy.extraParams = {
        'A_EQUIP_NO': A_A_EQUIP_NO,
        'A_MAT_NO': '%'
    };
    partStore.currentPage = 1;
    partStore.load();
}

function _selectMathUnit() {
    var mathUnitStore = Ext.data.StoreManager.lookup('mathUnitStore');
    mathUnitStore.proxy.extraParams = {
        A_CYCLE_TYPE: Ext.getCmp('A_CYCLE_TYPE').getValue()
    };
    mathUnitStore.load();
}

function _showAddWindow() {

    Ext.getCmp('addWindow').show();
}

function _showUpdateWindow() {
    var records = Ext.getCmp('equGridPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

    Ext.Ajax.request({
        url: AppUrl + 'mwd/GET_EQU_DETAIL',
        type: 'ajax',
        method: 'POST',
        params: {
            A_EQUIP_NO: records[0].get('EQUIP_NO')

        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET != '') {//成功，会传回true
                Ext.getCmp('U_A_EQUIP_NO').setValue(data.RET[0].EQUIP_NO);
                Ext.getCmp('U_A_EQUIP_NAME').setValue(data.RET[0].EQUIP_DESC);
                Ext.getCmp('U_A_REMARK').setValue(data.RET[0].EQUIP_REMARK);
                Ext.getCmp('U_A_EQU_LEVEL').setValue(data.RET[0].EQU_LEVEL);

                Ext.getCmp('updateWindow').show();
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
    });

}

function _chooseEqu(EQUIP_NO, EQUIP_DESC) {
    A_A_EQUIP_NO = EQUIP_NO;
    Ext.getCmp('A_EQU_NAME').setValue(Ext.getCmp('A_EQUTYPE').getRawValue() + '/' + EQUIP_DESC);
    _selectPart();
}

function _insertEqu() {

    Ext.Ajax.request({
        url: AppUrl + 'mwd/ADD_EQU',
        type: 'ajax',
        method: 'POST',
        params: {
            A_EQUTYPE: Ext.getCmp('A_EQUTYPE').getValue(),
            A_EQUIP_NO: Ext.getCmp('A_EQUIP_NO').getValue(),
            A_EQUIP_NAME: Ext.getCmp('A_EQUIP_NAME').getValue(),
            A_REMARK: Ext.getCmp('A_REMARK').getValue(),
            A_EQU_LEVEL: Ext.getCmp('A_EQU_LEVEL').getValue()

        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET == 'Success') {//成功，会传回true
                _selectEquList();
                Ext.getCmp('addWindow').close();
                Ext.MessageBox.alert('提示', data.RET_MSG);
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
    });
}

function _showPart() {
    if (A_A_EQUIP_NO == '') {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择主机',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

    Ext.getCmp('addPartWindow').show();
}

function _showUpdatePart() {
    var records = Ext.getCmp('partGridPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

    Ext.Ajax.request({
        url: AppUrl + 'mwd/GET_PART_DETAIL',
        type: 'ajax',
        method: 'POST',
        params: {
            A_PART_NO: records[0].get('PART_NO')
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET != '') {//成功，会传回true
                Ext.getCmp('U_PART_NO').setValue(records[0].get('PART_NO'));
                Ext.getCmp('U_PART_DESC').setValue(data.RET[0].PART_DESC);
                Ext.getCmp('U_WINTER_OIL_CODE').setValue(data.RET[0].WINTER_OIL_CODE);
                Ext.getCmp('U_DESIGN_OIL_CODE').setValue(data.RET[0].DESIGN_OIL_CODE);
                Ext.getCmp('U_SUMMER_OIL_CODE').setValue(data.RET[0].SUMMER_OIL_CODE);
                Ext.getCmp('U_CURRENT_OIL_CODE').setValue(data.RET[0].CURRENT_OIL_CODE);
                Ext.getCmp('U_WORK_DESC').setValue(data.RET[0].WORK_DESC);
                Ext.getCmp('U_OIL_TYPE').setValue(data.RET[0].OIL_TYPE);
                Ext.getCmp('U_OIL_ETALON').setValue(data.RET[0].OIL_ETALON);
                Ext.getCmp('U_OIL_QS').setValue(data.RET[0].OIL_QS);
                Ext.getCmp('U_PART_LEVEL').setValue(data.RET[0].PART_LEVEL);
                Ext.getCmp('U_PART_REMARK').setValue(data.RET[0].PART_REMARK);
                Ext.getCmp('updatePartWindow').show();
            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: '数据加载失败',
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
    });

}

function _insertPart() {

    Ext.Ajax.request({
        url: AppUrl + 'mwd/ADD_PART',
        type: 'ajax',
        method: 'POST',
        params: {
            A_PART_NO: Ext.getCmp('A_PART_NO').getValue(),
            A_PART_DESC: Ext.getCmp('A_PART_DESC').getValue(),
            A_EQUIP_NO: A_A_EQUIP_NO,
            A_WORK_DESC: Ext.getCmp('A_WORK_DESC').getValue(),
            A_OIL_TYPE: Ext.getCmp('A_OIL_TYPE').getValue(),
            A_OIL_ETALON: Ext.getCmp('A_OIL_ETALON').getValue(),
            A_OIL_QS: Ext.getCmp('A_OIL_QS').getValue(),
            A_PART_REMARK: Ext.getCmp('A_PART_REMARK').getValue(),
            A_DESIGN_OIL_CODE: Ext.getCmp('A_DESIGN_OIL_CODE').getValue(),
            A_SUMMER_OIL_CODE: Ext.getCmp('A_SUMMER_OIL_CODE').getValue(),
            A_WINTER_OIL_CODE: Ext.getCmp('A_WINTER_OIL_CODE').getValue(),
            A_CURRENT_OIL_CODE: Ext.getCmp('A_CURRENT_OIL_CODE').getValue(),
            A_USERID: Ext.util.Cookies.get('v_personcode'),
            A_PART_LEVEL: Ext.getCmp('A_PART_LEVEL').getValue()

        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET == 'Success') {//成功，会传回true
                _selectPart();
                Ext.getCmp('addPartWindow').close();
                Ext.MessageBox.alert('提示', data.RET_MSG);
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
    });
}

function _updateEqu() {

    Ext.Ajax.request({
        url: AppUrl + 'mwd/UPDATE_EQU',
        type: 'ajax',
        method: 'POST',
        params: {
            A_EQUTYPE: Ext.getCmp('A_EQUTYPE').getValue(),
            A_EQUIP_NO: Ext.getCmp('U_A_EQUIP_NO').getValue(),
            A_EQUIP_NAME: Ext.getCmp('U_A_EQUIP_NAME').getValue(),
            A_REMARK: Ext.getCmp('U_A_REMARK').getValue(),
            A_EQU_LEVEL: Ext.getCmp('U_A_EQU_LEVEL').getValue()

        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET == 'Success') {//成功，会传回true
                _selectEquList();
                Ext.getCmp('updateWindow').close();
                Ext.MessageBox.alert('提示', data.RET_MSG);
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
    });
}

function _updatePart() {
    var records = Ext.getCmp('partGridPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

    Ext.Ajax.request({
        url: AppUrl + 'mwd/UPDATE_PART',
        type: 'ajax',
        method: 'POST',
        params: {
            A_PART_NO: Ext.getCmp('U_PART_NO').getValue(),
            A_PART_DESC: Ext.getCmp('U_PART_DESC').getValue(),
            A_EQUIP_NO: records[0].get('EQUIP_NO'),
            A_WORK_DESC: Ext.getCmp('U_WORK_DESC').getValue(),
            A_OIL_TYPE: Ext.getCmp('U_OIL_TYPE').getValue(),
            A_OIL_ETALON: Ext.getCmp('U_OIL_ETALON').getValue(),
            A_OIL_QS: Ext.getCmp('U_OIL_QS').getValue(),
            A_PART_REMARK: Ext.getCmp('U_PART_REMARK').getValue(),
            A_DESIGN_OIL_CODE: Ext.getCmp('U_DESIGN_OIL_CODE').getValue(),
            A_SUMMER_OIL_CODE: Ext.getCmp('U_SUMMER_OIL_CODE').getValue(),
            A_WINTER_OIL_CODE: Ext.getCmp('U_WINTER_OIL_CODE').getValue(),
            A_CURRENT_OIL_CODE: Ext.getCmp('U_CURRENT_OIL_CODE').getValue(),
            A_USERID: Ext.util.Cookies.get('v_personcode'),
            A_PART_LEVEL: Ext.getCmp('U_PART_LEVEL').getValue()

        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET == 'Success') {//成功，会传回true
                _selectPart();
                Ext.getCmp('updatePartWindow').close();
                Ext.MessageBox.alert('提示', data.RET_MSG);
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
    });
}

function _showSetCycle(EQUIP_NO, PART_NO) {
    S_EQUIP_NO = EQUIP_NO;
    S_PART_NO = PART_NO;
    Ext.Ajax.request({
        url: AppUrl + 'mwd/GET_PART_OIL',
        type: 'ajax',
        method: 'POST',
        async: false,
        params: {
            A_PART_NO: PART_NO
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET != '') {//成功，会传回true
                Ext.getCmp('A_CYCLE_TYPE').setValue(data.RET[0].CYCLE_TYPE);
                Ext.getCmp('A_CYCLE_UNIT').setValue(data.RET[0].CYCLE_UNIT);
                Ext.getCmp('A_CYCLE_VALUE').setValue(data.RET[0].CYCLE_VALUE);
                Ext.getCmp('A_INSERT_AMOUNT').setValue(data.RET[0].INSERT_AMOUNT);
                Ext.getCmp('A_INSERT_UNIT').setValue(data.RET[0].INSERT_UNIT);
                Ext.getCmp('setCycleWindow').show();
            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: '获取原加油周期失败',
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
    });
}

function _saveSetCycle() {

    Ext.Ajax.request({
        url: AppUrl + 'mwd/SET_PART_OIL',
        type: 'ajax',
        method: 'POST',
        async: false,
        params: {
            A_EQUIP_NO: S_EQUIP_NO,
            A_PART_NO: S_PART_NO,
            A_CYCLE_TYPE: Ext.getCmp('A_CYCLE_TYPE').getValue(),
            A_CYCLE_UNIT: Ext.getCmp('A_CYCLE_UNIT').getValue(),
            A_CYCLE_VALUE: Ext.getCmp('A_CYCLE_VALUE').getSubmitValue(),
            A_INSERT_AMOUNT: Ext.getCmp('A_INSERT_AMOUNT').getSubmitValue(),
            A_INSERT_UNIT: Ext.getCmp('A_INSERT_UNIT').getValue()
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET == 'Success') {//成功，会传回true
                _selectPart();
                Ext.getCmp('setCycleWindow').close();
                Ext.MessageBox.alert('提示', data.RET_MSG);
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
    });
}

function _deleteEqu() {
    var records = Ext.getCmp('equGridPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

    Ext.Ajax.request({
        url: AppUrl + 'mwd/DELETE_EQU',
        type: 'ajax',
        method: 'POST',
        params: {
            A_EQUIP_NO: records[0].get('EQUIP_NO')

        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET == 'Success') {//成功，会传回true
                Ext.data.StoreManager.lookup('equStore').remove(records[0]);
                Ext.MessageBox.alert('提示', data.RET_MSG);
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
    });
}

function _deletePart() {
    var records = Ext.getCmp('partGridPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

    Ext.Ajax.request({
        url: AppUrl + 'mwd/DELETE_PART',
        type: 'ajax',
        method: 'POST',
        params: {
            A_PART_NO: records[0].get('PART_NO'),
            A_USERID: Ext.util.Cookies.get('v_personcode')

        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET == 'Success') {//成功，会传回true
                Ext.data.StoreManager.lookup('partStore').remove(records[0]);
                Ext.MessageBox.alert('提示', data.RET_MSG);
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
    });
}


function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}