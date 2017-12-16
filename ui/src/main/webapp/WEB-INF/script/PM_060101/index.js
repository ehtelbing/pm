var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var V_EQUTYPECODE;
var V_EQUTYPENAME;
var orgLoad = false;
var equTypeLoad = false;
var deptLoad = false;
Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');

    var orgStore = Ext.create('Ext.data.Store', {
        id: 'orgStore',
        autoLoad: true,
        fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'V_V_PERSONCODE': V_V_PERSONCODE,
                'V_V_DEPTCODE': V_V_DEPTCODE,
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '基层单位'
            }
        },
        listeners: {
            load: function (store, records) {
                orgLoad = true;
                Ext.getCmp('V_V_ORGCODE').select(store.first());
                _init();
            }
        }
    });

    var deptStore = Ext.create('Ext.data.Store', {
        id: 'deptStore',
        autoLoad: false,
        fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            async: false,
            extraParams: {}
        },
        listeners: {
            load: function (store, records) {
                deptLoad = true;
                Ext.getCmp('V_V_DEPTCODE').select(store.first());
                _init();
            }
        }
    });

    var equTypeStore = Ext.create('Ext.data.Store', {
        id: 'equTypeStore',
        autoLoad: true,
        fields: ['V_CK_EQUTYPECODE', 'V_CK_EQUTYPENAME', 'I_ORDER', 'I_ID'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_06/PM_06_EQUTYPE_SEL',
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
                equTypeLoad = true;
                Ext.getCmp('V_CK_EQUTYPECODE').select(store.first());
                _init();
            }
        }
    });

    var equTreeStore = Ext.create('Ext.data.TreeStore', {
        storeId: 'equTreeStore',
        pageSize: -1,
        autoLoad: false,
        fields: ['V_EQUTYPENAME', 'V_EQUTYPECODE', 'leaf']
    });

    var leftTreePanel = Ext.create('Ext.tree.Panel', {
        id: 'leftTreePanel',
        store: equTreeStore,
        title: '设备类型树',
        //border: false,
        region: 'west',
        width: 220,
        height: 150,
        rootVisible: false,
        hideHeaders: true,//是否隐藏表头,默认为false
        columns: [{
            xtype: 'treecolumn',
            dataIndex: 'V_EQUTYPENAME',
            flex: 1
        }],
        listeners: {
            'itemclick': function (view, record, item, index) {
                V_EQUTYPECODE = record.data.V_EQUTYPECODE;
                V_EQUTYPENAME = record.data.V_EQUTYPENAME;
                _seltctCriterion(record.data.V_EQUTYPECODE);
            }
        }
    });

    var criterionStore = Ext.create('Ext.data.Store', {
        storeId: 'criterionStore',
        autoLoad: false,
        pageSize: -1,
        fields: ['V_CRITERION_CODE', 'V_CRITERION_ITEM', 'V_CRITERION_CONTENT', 'V_CRITERION_CR', 'V_CRITERION_CYCLE', 'V_CRITERION_CYCLETYPE', 'V_EQU_STATE1', 'V_EQU_STATE2', 'V_EQU_STATE3', 'V_CK_FUNCTION1', 'V_CK_FUNCTION2', 'V_CK_FUNCTION3', 'V_CK_FUNCTION4', 'V_CK_FUNCTION5', 'V_CK_FUNCTION6', 'V_CK_FUNCTION7', 'V_CK_FUNCTION8', 'D_CKDATE', 'V_CK_EQUTYPECODE'],
        proxy: {
            url: AppUrl + 'PM_06/PM_06_DJ_CRITERION_SEL',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var topPanel = Ext.create('Ext.form.Panel', {
        frame: true,
        border: false,
        region: 'north',
        layout: 'column',
        defaults : {
            style : 'margin:5px 0px 5px 5px',
            labelAlign : 'right'
        },
        items: [{
                xtype: 'combo',
                id: 'V_V_ORGCODE',
                store: orgStore,
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                labelWidth: 90,
                typeAhead: false,
                editable: false,
                forceSelection: true,
                fieldLabel: '单位',
                listeners: {
                    change: function (combo, records) {
                        _selectDept(records);
                    }
                }
            }, {
                xtype: 'combo',
                id: 'V_V_DEPTCODE',
                store: deptStore,
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                forceSelection: true,
                labelWidth: 90,
                typeAhead: false,
                editable: false,
                fieldLabel: '作业区',
                listeners: {
                    change: function (combo, records) {
                        _seltctEquTree(records);
                    }
                }
            }, {
                xtype: 'combo',
                id: 'V_CK_EQUTYPECODE',
                store: equTypeStore,
                typeAhead: false,
                editable: false,
                queryMode: 'local',
                valueField: 'V_CK_EQUTYPECODE',
                displayField: 'V_CK_EQUTYPENAME',
                labelWidth: 90,
                forceSelection: true,
                fieldLabel: '点检设备分类'
            },{
                xtype: 'button',
                text: '查询',
                icon: imgpath + '/search.png',
                handler: function () {
                    _seltctCriterion(V_EQUTYPECODE);
                }
            }, {
                xtype: 'button',
                text: '添加',
                icon: imgpath + '/add.png',
                handler: function () {
                    _preInsertCrinterion();
                }
            }, {
                xtype: 'button',
                text: '修改',
                icon: imgpath + '/edit.png',
                handler: function () {
                    _preUpdateCrinterion();
                }
            }, {
                xtype: 'button',
                text: '删除',
                icon: imgpath + '/delete.png',
                handler: function () {
                    _preDeleteCrinterion();
                }
            }]
    });

    var criterionPanel = Ext.create('Ext.grid.Panel', {
        id: 'criterionPanel',
        store: criterionStore,
        border: false,
        //frame: true,
        columnLines: true,
        titleAlign: 'center',
        region: 'center',
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [{
            text: '点检项目',
            dataIndex: 'V_CRITERION_ITEM',
            align: 'center'
        }, {
            text: '点检内容',
            dataIndex: 'V_CRITERION_CONTENT',
            align: 'center'
        }, {
            text: '点检标准',
            dataIndex: 'V_CRITERION_CR',
            align: 'center'
        }, {
            text: '点检周期',
            dataIndex: 'V_CRITERION_CYCLE',
            align: 'center'
        }, {
            text: '周期类型',
            dataIndex: 'V_CRITERION_CYCLETYPE',
            align: 'center'
        }, {
            text: '设备运行',
            dataIndex: 'V_EQU_STATE1',
            align: 'center'
        }, {
            text: '设备停止',
            dataIndex: 'V_EQU_STATE2',
            align: 'center'
        }, {
            text: '目视',
            dataIndex: 'V_CK_FUNCTION1',
            align: 'center'
        }, {
            text: '手摸',
            dataIndex: 'V_CK_FUNCTION2',
            align: 'center'
        }, {
            text: '听音',
            dataIndex: 'V_CK_FUNCTION3',
            align: 'center'
        }, {
            text: '打击',
            dataIndex: 'V_CK_FUNCTION4',
            align: 'center'
        }, {
            text: '其他',
            dataIndex: 'V_CK_FUNCTION5',
            align: 'center'
        }, {
            text: '启用',
            dataIndex: 'V_CK_FUNCTION6',
            align: 'center'
        }, {
            text: '重点',
            dataIndex: 'V_CK_FUNCTION7',
            align: 'center'
        }, {
            text: '预警',
            dataIndex: 'V_CK_FUNCTION8',
            align: 'center'
        }, {
            text: '上次时间',
            dataIndex: 'D_CKDATE',
            align: 'center'
        }, {
            text: '点检设备分类',
            dataIndex: 'V_CK_EQUTYPECODE',
            align: 'center'
        }]

    });

    var rightPanel = Ext.create('Ext.panel.Panel', {
        layout: 'border',
        region: 'center',
        border:false,
        items: [topPanel, criterionPanel]
    });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',//只能边界布局???
        items: [leftTreePanel, rightPanel]
    });

});

function _init() {
    if (orgLoad && equTypeLoad && deptLoad) {

        Ext.getBody().unmask();
    }
}

function _seltctCriterion(V_EQUTYPECODE) {
    var criterionStore = Ext.data.StoreManager.lookup('criterionStore');

    if (V_EQUTYPECODE == null) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择设备类型',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

    criterionStore.proxy.extraParams = {
        'V_V_EQUTYPECODE': V_EQUTYPECODE,
        'V_V_DEPTCODE': Ext.getCmp('V_V_DEPTCODE').getSubmitValue(),
        'V_V_CKTYPE': 'GW',
        'V_V_CK_EQUTYPECODE': Ext.getCmp('V_CK_EQUTYPECODE').getSubmitValue()
    };
    criterionStore.currentPage = 1;
    criterionStore.load();
}

function _selectDept(V_V_DEPTCODE) {
    var deptStore = Ext.data.StoreManager.lookup('deptStore');

    deptStore.proxy.extraParams = {
        'V_V_PERSONCODE': V_V_PERSONCODE,
        'V_V_DEPTCODE': V_V_DEPTCODE,
        'V_V_DEPTCODENEXT': '%',
        'V_V_DEPTTYPE': '主体作业区'
    };
    deptStore.currentPage = 1;
    deptStore.load();
}

function _seltctEquTree(V_V_DEPTCODE) {
    var equTreeStore = Ext.data.StoreManager.lookup('equTreeStore');

    equTreeStore.setProxy({
        type: 'ajax',
        url: AppUrl + 'qx/PRO_PM_07_DEPTEQUTYPE_PER',
        actionMethods: {
            read: 'POST'
        },
        async: false,
        extraParams: {
            'V_V_PERSONCODE': V_V_PERSONCODE,
            'V_V_DEPTCODENEXT': V_V_DEPTCODE
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    });

    equTreeStore.currentPage = 1;
    equTreeStore.load();
}

function _preInsertCrinterion() {
    if (V_EQUTYPECODE == null) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择设备类型',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

    var V_V_CKTYPE = 'GW';
    var Crinterion = window.showModalDialog(AppUrl + 'page/PM_06010101/index.html?V_V_CKTYPE=' + V_V_CKTYPE + '&V_EQUTYPECODE=' + V_EQUTYPECODE + '&V_EQUTYPENAME=' + V_EQUTYPENAME + '&V_V_DEPTCODE=' + Ext.getCmp('V_V_DEPTCODE').getSubmitValue() + '&random=' + Math.random(), window, 'resizable=yes; dialogWidth=560px; dialogHeight=550px');
    if (Crinterion != null) {
        _seltctCriterion(V_EQUTYPECODE);
        top.banner.Ext.example.msg('操作信息', '操作成功');
    }
}

function _preUpdateCrinterion() {
    var records = Ext.getCmp('criterionPanel').getSelectionModel().getSelection();

    if (records.length != 1) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

    var Crinterion = window.showModalDialog(AppUrl + 'page/PM_06010102/index.html?V_V_CRITERION_CODE=' + records[0].get('V_CRITERION_CODE') + '&random=' + Math.random(), window, 'resizable=yes; dialogWidth=560px; dialogHeight=550px');
    if (Crinterion != null) {
        top.banner.Ext.example.msg('操作信息', '操作成功');
        _seltctCriterion(V_EQUTYPECODE);
    }

}

function _preDeleteCrinterion() {
    var records = Ext.getCmp('criterionPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请至少选择一条数据进行删除',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

    for (var i = 0; i < records.length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'PM_06/PM_06_DJ_CRITERION_DEL',
            method: 'POST',
            async: false,
            params: {
                V_V_CRITERION_CODE: records[i].data.V_CRITERION_CODE
            },
            success: function (ret) {
                var data = Ext.JSON.decode(ret.responseText);
                if (data.RET == 'SUCCESS') {
                    _seltctCriterion(V_EQUTYPECODE);
                } else {
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: data.message,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            }
        });
    }

}