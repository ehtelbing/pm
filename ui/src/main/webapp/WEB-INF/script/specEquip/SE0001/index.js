Ext.onReady(function() {
    Ext.getBody().mask('<p>页面载入中...</p>');

    var mineFieldStore = Ext.create('Ext.data.Store', {
        storeId : 'mineFieldStore',
        autoLoad : true,
        loading : true,
        pageSize : 20,
        fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
        proxy : {
            url : 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            type : 'ajax',
            async : true,
            actionMethods : {
                read : 'POST'
            },
            extraParams : {},
            reader : {
                type : 'json',
                root : 'list'
            }
        },
        listeners : {
            load : function(store, records, successful, eOpts) {
                _init();
            }
        }
    });

    var operationAreaStore = Ext.create('Ext.data.Store', {
        storeId : 'operationAreaStore',
        autoLoad : true,
        loading : true,
        pageSize : 20,
        fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
        proxy : {
            url : 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            type : 'ajax',
            async : true,
            actionMethods : {
                read : 'POST'
            },
            extraParams : {},
            reader : {
                type : 'json',
                root : 'list'
            }
        },
        listeners : {
            load : function(store, records, successful, eOpts) {
                _init();
            }
        }
    });

    var equipmentTypeStore = Ext.create('Ext.data.Store', {
        storeId : 'equipmentTypeStore',
        autoLoad : true,
        loading : true,
        pageSize : 20,
        fields : [ 'V_EQUTYPECODE', 'V_EQUTYPENAME' ],
        proxy : {
            url : 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
            type : 'ajax',
            async : true,
            actionMethods : {
                read : 'POST'
            },
            extraParams : {},
            reader : {
                type : 'json',
                root : 'list'
            }
        },
        listeners : {
            load : function(store, records, successful, eOpts) {
                _init();
            }
        }
    });

    var equipmentNameStore = Ext.create('Ext.data.Store', {
        storeId : 'equipmentNameStore',
        autoLoad : true,
        loading : true,
        pageSize : 20,
        fields : [ 'V_EQUCODE', 'V_EQUNAME' ],
        proxy : {
            url : 'PM_06/PRO_GET_DEPTEQU_PER',
            type : 'ajax',
            async : true,
            actionMethods : {
                read : 'POST'
            },
            extraParams : {},
            reader : {
                type : 'json',
                root : 'list'
            }
        },
        listeners : {
            load : function(store, records, successful, eOpts) {
                _init();
            }
        }
    });

    var subOperationAreaStore = Ext.create('Ext.data.Store', {
        storeId : 'subOperationAreaStore',
        autoLoad : false,
        fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ]
    });

    var subEquipmentTypeStore = Ext.create('Ext.data.Store', {
        storeId : 'subEquipmentTypeStore',
        autoLoad : false,
        fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ]
    });

    var subEquipmentNameStore = Ext.create('Ext.data.Store', {
        storeId : 'subEquipmentNameStore',
        autoLoad : false,
        fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ]
    });

    var formPanel = Ext.create('Ext.form.Panel', {
        id : 'formPanel',
        layout : 'column',
        frame : true,
        autoScroll : true,
        defaults : {
            labelAlign : 'right',
            labelWidth : 100,
            inputWidth : 140,
            margin : '4'

        },
        items : [ {
            xtype : 'combo',
            name : 'MINE_FIELD',
            store : mineFieldStore,
            queryMode : 'local',
            valueField : 'V_DEPTCODE',
            displayField : 'V_DEPTNAME',
            emptyText : '全部',
            forceSelection : true,
            fieldLabel : '选择矿场：',
            listeners : {
                select : function(combo, records) {
                    if (records.length != null) {
                        formPanel.getForm().findField('OPERATION_AREA').setValue(null);
                        _resetOperationAreaStore(records[0].get('V_DEPTCODE'));//重置级联下拉框Store
                    }
                }
            }
        }, {
            xtype : 'combo',
            name : 'OPERATION_AREA',
            store : operationAreaStore,
            queryMode : 'local',
            valueField : 'V_DEPTCODE',
            displayField : 'V_DEPTNAME',
            emptyText : '全部',
            forceSelection : true,
            fieldLabel : '选择作业区：',
            listeners : {
                select : function(combo, records) {
                    if (records.length != null) {
                        formPanel.getForm().findField('EQUIPMENT_TYPE').setValue(null);
                        _resetEquipmentTypeStore(records[0].get('V_DEPTCODE'));//重置级联下拉框Store
                    }
                }
            }
        },{
            xtype : 'combo',
            name : 'EQUIPMENT_TYPE',
            store : equipmentTypeStore,
            queryMode : 'local',
            valueField : 'V_DEPTCODE',
            displayField : 'V_DEPTNAME',
            emptyText : '全部',
            forceSelection : true,
            fieldLabel : '设备类型：',
            listeners : {
                select : function(combo, records) {
                    if (records.length != null) {
                        formPanel.getForm().findField('EQUIPMENT_NAME').setValue(null);
                        _resetEquipmentNameStore(records[0].get('V_DEPTCODE'));//重置级联下拉框Store
                    }
                }
            }
        },{
            xtype : 'combo',
            name : 'EQUIPMENT_NAME',
            store : equipmentNameStore,
            queryMode : 'local',
            valueField : 'V_DEPTCODE',
            displayField : 'V_DEPTNAME',
            emptyText : '全部',
            forceSelection : true,
            fieldLabel : '设备名称：'
        } ]
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        id : 'buttonPanel',
        defaults : {
            style : 'margin: 2px;'
        },
        items : [ {
            xtype : 'button',
            text : '查询',
            handler : _select
        }, {
            xtype : 'button',
            text : '导出EXCEL',
            handler : _loadExcel
        } ]
    });

    Ext.create('Ext.container.Viewport', {
        layout : {
            type : 'border',
            regionWeights : {
                west : -1,
                north : 1,
                south : 1,
                east : -1
            }
        },
        defaults : {
            border : false
        },
        items : [ {
            region : 'north',
            items : [ formPanel,buttonPanel ]
        } ]
    });

    _init();
});

function _init() {
    for (var i = 0; i < Ext.data.StoreManager.getCount(); i++) {
        if (Ext.data.StoreManager.getAt(i).isLoading()) {
            return;
        }
    }

    var mineFieldStore = Ext.data.StoreManager.lookup('mineFieldStore');
    mineFieldStore.insert(0, {});
    var operationAreaStore = Ext.data.StoreManager.lookup('operationAreaStore');
    operationAreaStore.insert(0, {});
    var equipmentTypeStore = Ext.data.StoreManager.lookup('equipmentTypeStore');
    equipmentTypeStore.insert(0, {});
    var equipmentNameStore = Ext.data.StoreManager.lookup('equipmentNameStore');
    equipmentNameStore.insert(0, {});

    Ext.getBody().unmask();

}


function _select() {

}

function _loadExcel() {

}

function _resetOperationAreaStore(V_DEPTCODE) {
    var assetTypeStore = Ext.data.StoreManager.lookup('assetTypeStore');
    var subAssetTypeStore = Ext.data.StoreManager.lookup('subAssetTypeStore');
    subAssetTypeStore.removeAll();
    if (PARENT_ASSET_TYPE_ID_ != '') {//按父属性过滤
        assetTypeStore.filter('PARENT_ASSET_TYPE_ID_', new RegExp('^' + PARENT_ASSET_TYPE_ID_ + '$'));
        subAssetTypeStore.add(assetTypeStore.getRange());
        assetTypeStore.clearFilter();
    }
}

function _resetEquipmentTypeStore(V_DEPTCODE) {

}

function _resetEquipmentNameStore(V_DEPTCODE) {

}



