var ORDERID = '';
var MENDDEPT = '';
var MEND_CONTEXT = '';
if (location.href.split('?')[1] != null) {
    ORDERID = Ext.urlDecode(location.href.split('?')[1]).ORDERID;
    MENDDEPT = Ext.urlDecode(location.href.split('?')[1]).MENDDEPT;
    MEND_CONTEXT = Ext.urlDecode(location.href.split('?')[1]).MEND_CONTEXT;
}

var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_PERSONNAME = Ext.util.Cookies.get('v_personname2');
var mendDeptGroupStoreLoad = false;
var mendTypeStoreLoad = false;
var orderetStoreLoad = false;
var orderMatStoreLoad = false;
var preorderetStoreLoad = false;


Ext.onReady(function () {
    Ext.getBody().mask('<p>正在载入中...</p>');

    //检修班组
    var mendDeptGroupStore = Ext.create('Ext.data.Store', {
        id: 'mendDeptGroupStore',
        autoLoad: true,
        pageSize: 100,
        fields: ['MENDDEPT_CODE', 'MENDDEPT_NAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'mwd/PRO_DJ601_MENDDEPT_GROUP',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                DEPTCODE_IN: MENDDEPT
            },
            reader: {
                type: 'json',
                root: 'RET'
            }
        },
        listeners: {
            load: function (store, records) {
                mendDeptGroupStoreLoad = true;
                Ext.getCmp('MENDDEPT_CODE_IN').select(store.first());
                _init();
            }
        }

    });

    //负责人
    var personStore = Ext.create('Ext.data.Store', {
        id: 'personStore',
        autoLoad: false,
        pageSize: 100,
        fields: ['USERID', 'USERNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'mwd/PRO_DJ601_PERSON',
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
                Ext.getCmp('MEND_USERID_IN').select(store.first());
            }
        }

    });

    //维修类别
    var mendTypeStore = Ext.create('Ext.data.Store', {
        id: 'mendTypeStore',
        autoLoad: true,
        pageSize: 100,
        fields: ['MENDTYPE', 'MENDTYPE_DESC'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'ml/PRO_DJ102_MENDTYPE_ABLE',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        listeners: {
            load: function (store, records) {
                mendTypeStoreLoad = true;
                Ext.getCmp('MEND_TYPE_IN').select(store.first());
                _init();
            }
        }

    });

    //工序
    var orderetStore = Ext.create('Ext.data.Store', {
        id: 'orderetStore',
        autoLoad: true,
        pageSize: 100,
        fields: ['ET_ID', 'ET_NO', 'ORDERID', 'ET_CONTEXT', 'PLAN_WORKTIME', 'PLAN_PERSON', 'START_FLAG',
            'END_FLAG', 'BEGINDATE', 'ENDDATE', 'INSERT_USERID', 'INSERT_USERNAME', 'FINISH_USERID',
            'FINISH_USERNAME', 'ACT_WORKTIME', 'ACT_PERSON', 'PRE_ET_ID', 'PRE_NO'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'mwd/PRO_DJ601_ORDERET',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                ORDERID_IN: ORDERID
            },
            reader: {
                type: 'json',
                root: 'RET',
                total: 'total'
            }
        },
        listeners: {
            load: function (store, records) {
                orderetStoreLoad = true;
                _init();
            }
        }

    });

    //查询所需物料表
    var orderMatStore = Ext.create('Ext.data.Store', {
        id: 'orderMatStore',
        autoLoad: true,
        pageSize: 100,
        fields: ['ID', 'ORDERID', 'MATERIALCODE', 'MATERIALNAME', 'ETALON', 'MAT_CL', 'UNIT',
            'F_PRICE', 'PLAN_AMOUNT', 'ACT_AMOUNT', 'ET_ID', 'SOURCE', 'KCID',
            'F_PLAN_MONEY', 'F_ACT_MONEY', 'INSERTDATE'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'mwd/PRO_DJ601_ORDERMAT',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                ORDERID_IN: ORDERID
            },
            reader: {
                type: 'json',
                root: 'RET',
                total: 'total'
            }
        },
        listeners: {
            load: function (store, records) {
                orderMatStoreLoad = true;
                _init();
            }
        }

    });

    //前置工序
    var preorderetStore = Ext.create('Ext.data.Store', {
        id: 'preorderetStore',
        autoLoad: true,
        pageSize: 100,
        fields: ['ET_ID', 'ET_NO'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'mwd/PRO_DJ601_PREORDERET',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                ORDERID_IN: ORDERID
            },
            reader: {
                type: 'json',
                root: 'RET'
            }
        },
        listeners: {
            load: function (store, records) {
                store.insert(0, {
                    'ET_ID': '',
                    'ET_NO': '-空-'
                });
                preorderetStoreLoad = true;
                Ext.getCmp('PRE_ET_IN').select(store.first());
                _init();
            }
        }

    });

    //模型名称
    var modelDropStore = Ext.create('Ext.data.Store', {
        id: 'modelDropStore',
        autoLoad: true,
        pageSize: 100,
        fields: ['MODEL_CODE', 'MODEL_NAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'mwd/PRO_DJ601_MODELDROPLIST',
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
                Ext.getCmp('V_MODELCODE').select(store.first());
            }
        }

    });

    //物资类型
    var itypeStore = Ext.create('Ext.data.Store', {
        id: 'itypeStore',
        autoLoad: true,
        pageSize: 100,
        fields: ['CODE', 'NAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'ml/PRO_MM_ITYPE',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('A_ITYPE').select(store.first());
            }
        }

    });

    //检修申请查询
    var waitApplyListStore = Ext.create("Ext.data.Store", {
        storeId: 'waitApplyListStore',
        autoLoad: false,
        pageSize: 200,
        fields: ['ORDERID', 'DJ_UQ_CODE', 'DJ_NAME', 'APPLY_PLANTNAME', 'MEND_CONTEXT', 'INSERTDATE', 'REMARK',
            'APPLY_ID', 'MEND_CODE', 'DJ_SERIES_CLASS', 'DJ_VOL', 'MEND_TYPE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'mwd/PRO_DJ601_WAITAPPLYLIST',
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

    //待下达工单查询
    var orderListWaitStore = Ext.create("Ext.data.Store", {
        storeId: 'orderListWaitStore',
        autoLoad: false,
        pageSize: 200,
        fields: ['ORDERID', 'DJ_UQ_CODE', 'DJ_NAME', 'PLANTCODE', 'APPLY_PLANTNAME', 'MEND_CONTEXT', 'MENDDEPT_NAME',
            'MEND_USERNAME', 'MEND_TYPE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'mwd/PRO_DJ601_ORDERLIST_WAIT',
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

    //模型名称
    var modeletStore = Ext.create('Ext.data.Store', {
        id: 'modeletStore',
        autoLoad: false,
        pageSize: 100,
        fields: ['ET_NO', 'ET_CONTEXT', 'PLAN_WORKTIME', 'PLAN_PERSON', 'PRE_ET_ID'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'mwd/PRO_DJ601_MODELET',
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

    //库存查询
    var kcStore = Ext.create('Ext.data.Store', {
        id: 'kcStore',
        autoLoad: false,
        pageSize: 100,
        fields: ['KCID', 'MATERIALCODE', 'MATERIALNAME', 'ETALON', 'UNIT', 'F_PRICE', 'KY_AMOUNT', 'STORE_DESC', 'NUM'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'mwd/GETMATKC',
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

    var tablePanel = Ext.create('Ext.panel.Panel', {
        id: 'tablePanel',
        region: 'north',
        layout: 'vbox',
        frame: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'ORDERID_IN',
                xtype: 'textfield',
                fieldLabel: '工单编号',
                labelWidth: 90,
                width: 220,
                value: ORDERID,
                readOnly: true,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                id: 'DJ_UQ_CODE_IN',
                xtype: 'textfield',
                fieldLabel: '电机编号',
                labelWidth: 90,
                width: 220,
                readOnly: true,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                id: 'DJ_NAME_IN',
                xtype: 'textfield',
                fieldLabel: '电机名称',
                labelWidth: 90,
                width: 220,
                readOnly: true,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'DJ_VOL_IN',
                xtype: 'textfield',
                fieldLabel: '电机容量',
                labelWidth: 90,
                width: 220,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                id: 'DJ_V_IN',
                xtype: 'textfield',
                fieldLabel: '电机电压',
                labelWidth: 90,
                width: 220,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                id: 'DJ_TYPE_IN',
                xtype: 'textfield',
                fieldLabel: '规格型号',
                labelWidth: 90,
                width: 220,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'PLAN_BEGINDATE',
                xtype: 'datefield',
                fieldLabel: '送修时间',
                format: 'Y-m-d',
                labelWidth: 90,
                width: 195,
                value: new Date(),
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'numberfield',
                id: 'b_hour',
                minValue: 0,
                maxValue: 24,
                width: 50,
                value: 0,
                style: ' margin: 5px 0px 5px 0px'
            }, {
                xtype: 'numberfield',
                id: 'b_mm',
                minValue: 0,
                maxValue: 60,
                width: 50,
                value: 0,
                style: ' margin: 5px 0px 5px 0px'
            }, {
                id: 'PLAN_ENDDATE',
                xtype: 'datefield',
                fieldLabel: '完成时间',
                format: 'Y-m-d',
                labelWidth: 90,
                width: 195,
                value: new Date(),
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'numberfield',
                id: 'e_hour',
                minValue: 0,
                maxValue: 24,
                width: 50,
                value: 0,
                style: ' margin: 5px 0px 5px 0px'
            }, {
                xtype: 'numberfield',
                id: 'e_mm',
                minValue: 0,
                maxValue: 60,
                width: 50,
                value: 0,
                style: ' margin: 5px 0px 5px 0px'
            }, {
                id: 'PLAN_TIME_IN',
                xtype: 'textfield',
                fieldLabel: '计划工期',
                labelWidth: 80,
                width: 220,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'MENDDEPT_CODE_IN',
                xtype: 'combo',
                store: mendDeptGroupStore,
                editable: false,
                fieldLabel: '检修班组',
                labelWidth: 90,
                width: 220,
                displayField: 'MENDDEPT_NAME',
                valueField: 'MENDDEPT_CODE',
                queryMode: 'local',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectPerson();
                    }
                }
            }, {
                id: 'MEND_USERID_IN',
                xtype: 'combo',
                store: personStore,
                editable: false,
                fieldLabel: '负责人',
                labelWidth: 90,
                width: 220,
                displayField: 'USERNAME',
                valueField: 'USERID',
                queryMode: 'local',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                id: 'PICCODE_IN',
                xtype: 'textfield',
                fieldLabel: '图样',
                labelWidth: 90,
                width: 220,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'OP_PERSON_IN',
                xtype: 'textfield',
                fieldLabel: '经办人',
                labelWidth: 90,
                width: 220,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                id: 'PHONE_NUMBER_IN',
                xtype: 'textfield',
                fieldLabel: '联系电话',
                labelWidth: 90,
                width: 220,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                id: 'USE_LOC_IN',
                xtype: 'textfield',
                fieldLabel: '使用地点',
                labelWidth: 90,
                width: 220,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'REQ_TIME_IN',
                xtype: 'textfield',
                fieldLabel: '要求工期',
                labelWidth: 90,
                width: 220,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                id: 'MEND_TYPE_IN',
                xtype: 'combo',
                store: mendTypeStore,
                editable: false,
                fieldLabel: '维修类别',
                labelWidth: 90,
                width: 220,
                displayField: 'MENDTYPE_DESC',
                valueField: 'MENDTYPE',
                queryMode: 'local',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'MEND_CONTEXT',
                xtype: 'textarea',
                fieldLabel: '检修内容',
                labelWidth: 90,
                width: 800,
                height: 50,
                value: MEND_CONTEXT,
                style: ' margin: 5px 0px 0px 0px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'BUILD_REMARK_IN',
                xtype: 'textarea',
                fieldLabel: '施工项目及说明',
                labelWidth: 90,
                width: 800,
                height: 50,
                style: ' margin: -30px 0px 0px 0px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'CHECK_LOG_IN',
                xtype: 'textarea',
                fieldLabel: '检查试验记录',
                labelWidth: 90,
                width: 800,
                height: 50,
                style: ' margin: -30px 0px 0px 0px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'button',
                text: '保存工单',
                style: ' margin: -25px 0px 5px 10px',
                icon: imgpath + '/filesave.png',
                handler: _save
            }]
        }]
    });

    var orderetGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'orderetGridPanel',
        //title: '检修工序管理',
        store: orderetStore,
        width: '100%',
        height: window.screen.height / 2 - 200,
        border: false,
        columnLines: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINPLE'
        },
        columns: [{
            text: '工序号',
            dataIndex: 'ET_NO',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '工序内容',
            dataIndex: 'ET_CONTEXT',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '计划工时',
            dataIndex: 'PLAN_WORKTIME',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '计划人数',
            dataIndex: 'PLAN_PERSON',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '前置工序',
            dataIndex: 'PRE_ET_ID',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '删除',
            align: 'center',
            width: 70,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href=javascript:dealWith(\'</a><a href="#" onclick="_deleteEt(\'' + record.data.ET_ID + '\')">' + '删除' + '</a>';
            }
        }],
        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: orderetStore,
            dock: 'bottom',
            displayInfo: true
        }]
    });

    var orderMatGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'orderMatGridPanel',
        //title: '所需供料表',
        store: orderMatStore,
        width: '100%',
        border: false,
        columnLines: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINPLE'
        },
        columns: [{
            xtype : 'rownumberer',
            align : 'center'
        }, {
            text: '物料编码',
            dataIndex: 'MATERIALCODE',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '物料名称',
            dataIndex: 'MATERIALNAME',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '规格型号',
            dataIndex: 'ETALON',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '计量单位',
            dataIndex: 'UNIT',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '单价',
            dataIndex: 'F_PRICE',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '计划数量',
            dataIndex: 'PLAN_AMOUNT',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '物料来源',
            dataIndex: 'SOURCE',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '删除',
            align: 'center',
            width: 70,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                if(record.data.MATERIALNAME == '合计'){
                    return value;
                }else{
                    return '<a href=javascript:dealWith(\'</a><a href="#" onclick="_deleteMat(\'' + record.data.ID + '\')">' + '删除' + '</a>';
                }
            }
        }],
        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: orderMatStore,
            dock: 'bottom',
            displayInfo: true
        }]
    });

    var tabPanel = Ext.create('Ext.tab.Panel', {
        id: 'tabPanel',
        region: 'center',
        layout: 'border',
        items: [{
            title: '检修工序管理',
            layout: 'border',
            items: [{
                region: 'north',
                items: [{
                    xtype: 'button',
                    text: '添加工序',
                    style: 'margin:5px 0px 5px 10px',
                    icon: imgpath + '/add.png',
                    handler: _addGX
                }, {
                    xtype: 'button',
                    text: '添加模型工序',
                    style: 'margin:5px 0px 5px 10px',
                    icon: imgpath + '/add.png',
                    handler: _addModelGX
                }]
            }, {
                region: 'center',
                layout: 'fit',
                border: false,
                items: [orderetGridPanel]
            }]
        }, {
            title: '所需供料表',
            layout: 'border',
            items: [{
                region: 'north',
                items: [{
                    xtype: 'button',
                    text: '添加物料',
                    style: 'margin:5px 0px 5px 10px',
                    icon: imgpath + '/add.png',
                    handler: _showKCWindow
                }, {
                    xtype: 'button',
                    text: '查询',
                    style: 'margin:5px 0px 5px 10px',
                    icon: imgpath + '/search.png',
                    handler: _selectTab
                }]
            }, {
                region: 'center',
                layout: 'fit',
                border: false,
                items: [orderMatGridPanel]
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
            items: [tablePanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [tabPanel]
        }]

    });

    /** 添加工序 */
    var windowProcess = Ext.create('Ext.window.Window', {
        id: 'windowProcess',
        title: "添加工序",
        width: 330,
        height: 250,
        plain: true,
        modal: true,
        closeAction: 'hide',
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'PLAN_WORKTIME_IN',
                xtype: 'numberfield',
                fieldLabel: '计划工时',
                minValue: 0,
                value: 0,
                labelWidth: 90,
                width: 250,
                style: ' margin: 5px 0px 5px 10px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'PLAN_PERSON_IN',
                xtype: 'numberfield',
                fieldLabel: '计划人数',
                minValue: 0,
                value: 0,
                labelWidth: 90,
                width: 250,
                style: ' margin: 5px 0px 5px 10px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'ET_CONTEXT_IN',
                xtype: 'textfield',
                fieldLabel: '工序内容',
                labelWidth: 90,
                width: 250,
                style: ' margin: 5px 0px 5px 10px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'PRE_ET_IN',
                xtype: 'combo',
                store: preorderetStore,
                editable: false,
                fieldLabel: '前置工序',
                labelWidth: 90,
                width: 250,
                displayField: 'ET_NO',
                valueField: 'ET_ID',
                queryMode: 'local',
                style: ' margin: 5px 0px 5px 10px',
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
                style: 'margin:10px 0px 5px 200px',
                icon: imgpath + '/filesave.png',
                handler: _savePreorderet
            }]
        }]
    });

    var modeletGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'modeletGridPanel',
        title: '添加模型工序',
        store: modeletStore,
        width: '100%',
        border: false,
        columnLines: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [{
            text: '工序号',
            dataIndex: 'ET_NO',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '工序内容',
            dataIndex: 'ET_CONTEXT',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '计划工时',
            dataIndex: 'PLAN_WORKTIME',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '计划人数',
            dataIndex: 'PLAN_PERSON',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '前置工序',
            dataIndex: 'PRE_ET_ID',
            align: 'center',
            flex: 1,
            renderer: atleft
        }]
    });

    var gxModelWindow = Ext.create('Ext.window.Window', {
        id: 'gxModelWindow',
        title: '<div align="center">添加模型工序</div>',
        width: 1000,
        height: 450,
        modal: true,
        plain: true,
        closable: true,
        closeAction: 'hide',
        model: true,
        layout: 'border',
        frame: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            style: 'background-color:#FFFFFF',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'V_MODELCODE',
                xtype: 'combo',
                store: modelDropStore,
                editable: false,
                fieldLabel: '模型名称',
                labelWidth: 90,
                width: 220,
                displayField: 'MODEL_NAME',
                valueField: 'MODEL_CODE',
                queryMode: 'local',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right',
                listeners: {
                    select: function (field, newValue, oldValue) {
                        _selectModel();
                    }
                }
            }, {
                xtype: 'button',
                text: '查询',
                style: 'margin:5px 0px 5px 10px',
                icon: imgpath + '/search.png',
                handler: _selectModel
            }, {
                xtype: 'button',
                text: '添加',
                style: 'margin:5px 0px 5px 10px',
                icon: imgpath + '/add.png',
                handler: _insertModel
            }]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [modeletGridPanel]
        }]
    });

    var kcGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'kcGridPanel',
        //title: '添加模型工序',
        store: kcStore,
        width: '100%',
        border: false,
        columnLines: true,
        plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })],
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINPLE'
        },
        columns: [{
            xtype: 'rownumberer',
            align: 'center'
        }, {
            text: '物资编码',
            dataIndex: 'MATERIALCODE',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '物资名称',
            dataIndex: 'MATERIALNAME',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '规格型号',
            dataIndex: 'ETALON',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '计量单位',
            dataIndex: 'UNIT',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '当前单价',
            dataIndex: 'F_PRICE',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '库存数量',
            dataIndex: 'KY_AMOUNT',
            align: 'center',
            flex: 1,
            renderer: atleft
        }, {
            text: '所需数量',
            dataIndex: 'NUM',
            align: 'center',
            flex: 1,
            editor: {
                xtype: 'numberfield',
                allowBlank: false,
                allowDecimals: 3,
                minValue: 0
            },
            renderer: function (value, metaData) {
                metaData.style = "text-align:right;background:#FFFF99";
                return value;
            }
        }, {
            text: '添加',
            dataIndex: 'STORE_DESC',
            align: 'center',
            width: 60,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a  href="javascript:_saveMat(' + rowIdx + ')" >保存</a>';
            }
        }, {
            text: '库存位置描述',
            dataIndex: 'STORE_DESC',
            align: 'center',
            flex: 1,
            renderer: atleft
        }],
        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: kcStore,
            dock: 'bottom',
            displayInfo: true
        }]
    });

    var kcWindow = Ext.create('Ext.window.Window', {
        id: 'kcWindow',
        title: '<div align="center">库存查询</div>',
        width: 1200,
        height: 550,
        modal: true,
        plain: true,
        closable: true,
        closeAction: 'hide',
        model: true,
        layout: 'border',
        frame: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            style: 'background-color:#FFFFFF',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'A_ITYPE',
                xtype: 'combo',
                store: itypeStore,
                editable: false,
                fieldLabel: '物资分类',
                labelWidth: 90,
                width: 220,
                displayField: 'NAME',
                valueField: 'CODE',
                queryMode: 'local',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right',
                listeners: {
                    select: function (field, newValue, oldValue) {
                        _selectKC();
                    }
                }
            }, {
                id: 'A_MATERIALCODE',
                xtype: 'textfield',
                fieldLabel: '物料编码',
                labelWidth: 90,
                width: 200,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                id: 'A_MATERIALNAME',
                xtype: 'textfield',
                fieldLabel: '物料名称',
                labelWidth: 90,
                width: 200,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                id: 'A_ETALON',
                xtype: 'textfield',
                fieldLabel: '规格型号',
                labelWidth: 90,
                width: 200,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '查询',
                style: 'margin:5px 0px 5px 10px',
                icon: imgpath + '/search.png',
                handler: _selectKC
            }]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [kcGridPanel]
        }]
    });

    _init();
});

//初始化
function _init() {
    if (mendDeptGroupStoreLoad && mendTypeStoreLoad && orderetStoreLoad && orderMatStoreLoad && preorderetStoreLoad) {

        _orderMessage();
        Ext.getCmp("tabPanel").on('tabchange', _selectTab);
        Ext.getBody().unmask();//去除页面笼罩
    }
}

function _orderMessage() {

    Ext.Ajax.request({
        url: AppUrl + 'mwd/PRO_DJ601_ORDERMESSAGE',
        type: 'ajax',
        method: 'POST',
        params: {
            'ORDERID_IN': ORDERID
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.RET.length > 0) {
                Ext.getCmp('DJ_UQ_CODE_IN').setValue(data.RET[0].DJ_UQ_CODE);//电机编号
                Ext.getCmp('DJ_NAME_IN').setValue(data.RET[0].DJ_NAME);//电机名称
                Ext.getCmp('DJ_VOL_IN').setValue(data.RET[0].DJ_VOL);//电机容量
                Ext.getCmp('DJ_V_IN').setValue(data.RET[0].DJ_V);//电机电压
                Ext.getCmp('DJ_TYPE_IN').setValue(data.RET[0].DJ_TYPE);//规格型号
                Ext.getCmp('PLAN_TIME_IN').setValue(data.RET[0].PLAN_TIME);//计划工期
                Ext.getCmp('MENDDEPT_CODE_IN').setValue(data.RET[0].MENDDEPT_CODE); //检修班组
                Ext.getCmp('MEND_USERID_IN').setValue(data.RET[0].MEND_USERID);//负责人
                Ext.getCmp('PICCODE_IN').setValue(data.RET[0].PICCODE);//图样
                Ext.getCmp('OP_PERSON_IN').setValue(data.RET[0].OP_PERSON);//经办人
                Ext.getCmp('PHONE_NUMBER_IN').setValue(data.RET[0].PHONE_NUMBER);//联系电话
                Ext.getCmp('USE_LOC_IN').setValue(data.RET[0].USE_LOC);//使用地点
                Ext.getCmp('REQ_TIME_IN').setValue(data.RET[0].REQ_TIME);//要求工期
                Ext.getCmp('MEND_TYPE_IN').setValue(data.RET[0].MEND_TYPE);//维修类别
                Ext.getCmp('BUILD_REMARK_IN').setValue(data.RET[0].BUILD_REMARK);//施工项目及说明
                Ext.getCmp('CHECK_LOG_IN').setValue(data.RET[0].CHECK_LOG);//检查试验记录

                var startD = data.RET[0].PLAN_BEGINDATE.split(" ");
                var startT = startD[1].split(":");

                Ext.getCmp('PLAN_BEGINDATE').setValue(startD[0]);//送修时间
                Ext.getCmp('b_hour').setValue(startT[0]);
                Ext.getCmp('b_mm').setValue(startT[1]);

                var endD = data.RET[0].PLAN_ENDDATE.split(" ");
                var endT = endD[1].split(":");

                Ext.getCmp('PLAN_ENDDATE').setValue(endD[0]);//完成时间
                Ext.getCmp('e_hour').setValue(endT[0]);
                Ext.getCmp('e_mm').setValue(endT[1]);

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

function _selectPerson() {
    var personStore = Ext.data.StoreManager.lookup('personStore');
    personStore.proxy.extraParams = {
        'MENDDEPT_CODE_IN': Ext.getCmp('MENDDEPT_CODE_IN').getValue()
    };

    personStore.load();
}

function _save() {
    if (ORDERID == "") {
        Ext.Msg.alert('操作信息', "工单号不能为空");
        return;
    }
    if (Ext.getCmp('DJ_UQ_CODE_IN').getValue() == "") {
        Ext.Msg.alert('操作信息', "电机编号不能为空");
        return;
    }
    if (Ext.getCmp('DJ_NAME_IN').getValue() == "") {
        Ext.Msg.alert('操作信息', "电机名称不能为空");
        return;
    }
    if (Ext.getCmp('MEND_CONTEXT').getValue() == "") {
        Ext.Msg.alert('操作信息', "检修内容不能为空");
        return;
    }

    var b_hour = Ext.getCmp('b_hour').getSubmitValue();
    if (b_hour < 10) {
        b_hour = "0" + b_hour;
    }

    var b_mm = Ext.getCmp('b_mm').getSubmitValue();
    if (b_hour < 10) {
        b_mm = "0" + b_mm;
    }

    var start = Ext.util.Format.date(Ext.getCmp('PLAN_BEGINDATE').getSubmitValue(), 'Y-m-d') + " " + b_hour + ":" + b_mm + ":00";

    var e_hour = Ext.getCmp('e_hour').getSubmitValue();
    if (e_hour < 10) {
        e_hour = "0" + e_hour;
    }

    var e_mm = Ext.getCmp('e_mm').getSubmitValue();
    if (e_hour < 10) {
        e_mm = "0" + e_mm;
    }
    var end = Ext.util.Format.date(Ext.getCmp('PLAN_ENDDATE').getSubmitValue(), 'Y-m-d') + " " + e_hour + ":" + e_mm + ":00";

    Ext.Ajax.request({
        url: AppUrl + 'mwd/PRO_DJ601_UPDATEORDER',
        type: 'ajax',
        method: 'POST',
        params: {
            'ORDERID_IN': ORDERID,
            'MEND_CONTEXT_IN': MEND_CONTEXT,
            'PLAN_BEGINDATE_IN': Ext.util.Format.date(start, 'Y-m-d H:i:s'),
            'PLAN_ENDDATE_IN': Ext.util.Format.date(end, 'Y-m-d H:i:s'),
            'MENDDEPT_CODE_IN': Ext.getCmp('MENDDEPT_CODE_IN').getValue(),
            'INSERT_USERID_IN': Ext.getCmp('MEND_USERID_IN').getSubmitValue(),
            'INSERT_USERNAME_IN': Ext.getCmp('MEND_USERID_IN').getRawValue(),
            'PLAN_TIME_IN': Ext.getCmp('PLAN_TIME_IN').getSubmitValue(),
            'DJ_TYPE_IN': Ext.getCmp('DJ_TYPE_IN').getSubmitValue(),
            'PICCODE_IN': Ext.getCmp('PICCODE_IN').getSubmitValue(),
            'OP_PERSON_IN': Ext.getCmp('OP_PERSON_IN').getSubmitValue(),
            'PHONE_NUMBER_IN': Ext.getCmp('PHONE_NUMBER_IN').getSubmitValue(),
            'USE_LOC_IN': Ext.getCmp('USE_LOC_IN').getSubmitValue(),
            'REQ_TIME_IN': Ext.getCmp('REQ_TIME_IN').getSubmitValue(),
            'BUILD_REMARK_IN': Ext.getCmp('BUILD_REMARK_IN').getSubmitValue(),
            'CHECK_LOG_IN': Ext.getCmp('CHECK_LOG_IN').getSubmitValue(),
            'DJ_VOL_IN': Ext.getCmp('DJ_VOL_IN').getSubmitValue(),
            'DJ_V_IN': Ext.getCmp('DJ_V_IN').getSubmitValue(),
            'MEND_TYPE_IN': Ext.getCmp('MEND_TYPE_IN').getSubmitValue()
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.RET == 'Success') {
                Ext.Msg.alert('操作信息', "操作成功");
                window.close();
                window.opener._select();
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

function _selectTab() {
    if (Ext.getCmp("tabPanel").activeTab.title == '检修工序管理') {
        var orderetStore = Ext.data.StoreManager.lookup('orderetStore');
        orderetStore.currentPage = 1;
        orderetStore.load();
    }
    else {
        var orderMatStore = Ext.data.StoreManager.lookup('orderMatStore');
        orderMatStore.currentPage = 1;
        orderMatStore.load();
    }
}

function _addGX() {
    Ext.getCmp('windowProcess').show();
}

function _savePreorderet() {

    Ext.Ajax.request({
        url: AppUrl + 'mwd/PRO_DJ601_SAVEORDERET',
        type: 'ajax',
        method: 'POST',
        params: {
            'ORDERID_IN': ORDERID,
            'PLAN_WORKTIME_IN': Ext.getCmp('PLAN_WORKTIME_IN').getSubmitValue(),
            'PLAN_PERSON_IN': Ext.getCmp('PLAN_PERSON_IN').getSubmitValue(),
            'ET_CONTEXT_IN': Ext.getCmp('ET_CONTEXT_IN').getSubmitValue(),
            'PRE_ET_IN': Ext.getCmp('PRE_ET_IN').getSubmitValue(),
            'INSERT_USERID_IN': Ext.util.Cookies.get('v_personcode'),
            'INSERT_USERNAME_IN': Ext.util.Cookies.get('v_personname2')
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.RET == 'Success') {
                Ext.data.StoreManager.lookup('orderetStore').load();
                Ext.getCmp('windowProcess').close();
                Ext.Msg.alert('提示信息', '操作成功');
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

function _insertModel() {
    var records = Ext.getCmp('modeletGridPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条或多条工序',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }

    var PLAN_WORKTIME_IN_LIST = new Array();
    var PLAN_PERSON_IN_LIST = new Array();
    var ET_CONTEXT_IN_LIST = new Array();
    var PRE_ET_IN_LIST = new Array();
    for (var i = 0; i < records.length; i++) {
        PLAN_WORKTIME_IN_LIST.push(records[i].get('PLAN_WORKTIME'));
        PLAN_PERSON_IN_LIST.push(records[i].get('PLAN_PERSON'));
        ET_CONTEXT_IN_LIST.push(records[i].get('ET_CONTEXT'));
        PRE_ET_IN_LIST.push(records[i].get('PRE_ET_ID'));
    }


    Ext.Ajax.request({
        url: AppUrl + 'mwd/PRO_DJ601_SAVEORDERET_LIST',
        type: 'ajax',
        method: 'POST',
        params: {
            'ORDERID_IN': ORDERID,
            'PLAN_WORKTIME_IN_LIST': PLAN_WORKTIME_IN_LIST,
            'PLAN_PERSON_IN_LIST': PLAN_PERSON_IN_LIST,
            'ET_CONTEXT_IN_LIST': ET_CONTEXT_IN_LIST,
            'PRE_ET_IN_LIST': PRE_ET_IN_LIST,
            'INSERT_USERID_IN': Ext.util.Cookies.get('v_personcode'),
            'INSERT_USERNAME_IN': Ext.util.Cookies.get('v_personname2')
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.RET == 'Success') {
                Ext.data.StoreManager.lookup('orderetStore').load();
                Ext.getCmp('gxModelWindow').close();
                Ext.Msg.alert('提示信息', '操作成功');
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

function _selectModel() {
    var modeletStore = Ext.data.StoreManager.lookup('modeletStore');
    modeletStore.proxy.extraParams = {
        'V_MODELCODE': Ext.getCmp('V_MODELCODE').getValue()
    };

    modeletStore.load();
}

function _addModelGX() {
    _selectModel();
    Ext.getCmp('gxModelWindow').show();
}

function _deleteEt(ET_ID) {

    Ext.Ajax.request({
        url: AppUrl + 'mwd/PRO_DJ601_DELETEET',
        type: 'ajax',
        method: 'POST',
        params: {
            'ET_ID_IN': ET_ID
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.RET == 'Success') {
                Ext.data.StoreManager.lookup('orderetStore').load();
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

function _showKCWindow() {
    _selectKC();
    Ext.getCmp('kcWindow').show();
}

function _selectKC() {
    var kcStore = Ext.data.StoreManager.lookup('kcStore');
    kcStore.proxy.extraParams = {
        'A_PLANTCODE': Ext.util.Cookies.get('v_orgCode'),
        'A_DEPARTCODE': MENDDEPT,
        'A_ITYPE': Ext.getCmp('A_ITYPE').getValue(),
        'A_MATERIALCODE': Ext.getCmp('A_MATERIALCODE').getValue(),
        'A_MATERIALNAME': Ext.getCmp('A_MATERIALNAME').getValue(),
        'A_ETALON': Ext.getCmp('A_ETALON').getValue()
    };

    kcStore.load();
}

function _saveMat(rowIdx) {
    var KY_AMOUNT = Ext.getStore('kcStore').data.items[rowIdx].data.KY_AMOUNT;
    var NUM = Ext.getStore('kcStore').data.items[rowIdx].data.NUM;

    if (NUM == '' && NUM == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '所需数量不能为空或零',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }

    if (KY_AMOUNT <= NUM) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '所需数量需大于库存数量',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }

    Ext.Ajax.request({
        url: AppUrl + 'mwd/PRO_DJ601_SAVEORDERMAT',
        type: 'ajax',
        method: 'POST',
        params: {
            'ORDERID_IN': ORDERID,
            'MATERIALCODE_IN': Ext.getStore('kcStore').data.items[rowIdx].data.MATERIALCODE,
            'MATERIALNAME_IN': Ext.getStore('kcStore').data.items[rowIdx].data.MATERIALNAME,
            'ETALON_IN': Ext.getStore('kcStore').data.items[rowIdx].data.ETALON,
            'MAT_CL_IN': '',//本页面没有材料参数，传空
            'F_PRICE_IN': Ext.getStore('kcStore').data.items[rowIdx].data.F_PRICE,
            'PLAN_AMOUNT_IN': Ext.getStore('kcStore').data.items[rowIdx].data.NUM,
            'USERCODE_IN': V_V_PERSONCODE,
            'USERNAME_IN': V_V_PERSONNAME,
            'KCID_IN': Ext.getStore('kcStore').data.items[rowIdx].data.KCID,
            'UNIT_IN': Ext.getStore('kcStore').data.items[rowIdx].data.UNIT
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.RET == 'Success') {
                Ext.Msg.alert('提示信息', '操作成功');
                Ext.data.StoreManager.lookup('kcStore').load();
                Ext.data.StoreManager.lookup('orderMatStore').load();
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

function _deleteMat(ID) {

    Ext.Ajax.request({
        url: AppUrl + 'mwd/PRO_DJ601_DELETEMAT',
        type: 'ajax',
        method: 'POST',
        params: {
            'ID_IN': ID
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.RET == 'Success') {
                Ext.data.StoreManager.lookup('orderMatStore').load();
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
function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}
