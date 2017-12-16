var V_V_DEPTCODE;//= Ext.util.Cookies.get('V_V_DEPTCODE');//cookies
var V_V_PERSONCODE;
var V_V_DEPTCODENEXT;
var V_V_DEPTTYPE;
var ckStoreLoad = false;
var zyqStoreLoad = false;
var zsbnameStoreLoad = false;
var ssbnameStoreLoad = false;
var ssbtypeStoreLoad = false;
var ckStoreLoad3 = false;
var zyqStoreLoad3 = false;
var zsbnameStoreLoad3 = false;
var ssbnameStoreLoad3 = false;
var ssbtypeStoreLoad3 = false;
var gztypeStoreLoad3 = false;
var ckStoreLoad2 ;
var zyqStoreLoad2 ;
var ssbnameStoreLoad2 ;
var initadd;

var init;

Ext.define('Ext.ux.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    async:true,
    doRequest: function(operation, callback, scope) {
        var writer  = this.getWriter(),
            request = this.buildRequest(operation);
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        Ext.apply(request, {
            async         : this.async,
            binary        : this.binary,
            headers       : this.headers,
            timeout       : this.timeout,
            scope         : this,
            callback      : this.createRequestCallback(request, operation, callback, scope),
            method        : this.getMethod(request),
            disableCaching: false
        });
        Ext.Ajax.request(request);
        return request;
    }
});

Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: false,
        fields: ['I_ID', 'V_ORGCODE', 'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME',
            'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_EQUCODE', 'V_EQUNAME', 'V_EQUCHILD_CODE',
            'V_EQUCHILD_NAME', 'V_TYPECODE', 'V_TYPENAME', 'V_FAULT_YY', 'V_BZ','V_GUID'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_14/PM_14_FAULT_ITEM_SEL',
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

    var gztypestore = Ext.create('Ext.data.Store', {
        id: 'gztypestore',
        autoLoad: true,
        fields: ['V_TYPECODE', 'V_TYPENAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_14/PM_14_FAULT_TYPE_ITEM_SEL',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        },
        listeners: {
            load: function (store, records) {
                store.insert(0, {
                    'V_TYPECODE': '%',
                    'V_TYPENAME': '全部'
                });
                Ext.getCmp('gztype').select(store.first());
            }
        }
    });

    var gztypestore2 = Ext.create('Ext.data.Store', {
        id: 'gztypestore2',
        autoLoad: true,
        fields: ['V_TYPECODE', 'V_TYPENAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_14/PM_14_FAULT_TYPE_ITEM_SEL',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('wingztype').select(store.first());
                gztypeStoreLoad3 = true;
            }
        }
    });




    var zsbstore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'zsbstore',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy:  Ext.create("Ext.ux.data.proxy.Ajax",{
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_14/PRO_SAP_EQU_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        }),
        listeners: {
            load: function (store, records) {
                store.insert(0, {
                    'V_EQUCODE': '%',
                    'V_EQUNAME': '全部'
                });
                Ext.getCmp('zsb').select(store.first());
                zsbnameStoreLoad = true;
                _init();
            }
        }
    });

    var zsbstore2 = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'zsbstore2',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax",{
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_14/PRO_SAP_EQU_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        }),
        listeners: {
            load: function (store, records) {
                store.insert(0, {
                    'V_EQUCODE': '%',
                    'V_EQUNAME': '全部'
                });
                Ext.getCmp('winzsb').select(store.first());
                if (initadd) {
                }else{
                    Ext.getCmp('winzsb').select(store.first());
                }
            }
        }
    });

    var zsbstore3 = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'zsbstore3',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax",{
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_14/PRO_SAP_EQU_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        }),
        listeners: {
            load: function (store, records) {
                store.insert(0, {
                    'V_EQUCODE': '%',
                    'V_EQUNAME': '全部'
                });
                Ext.getBody().unmask();
                Ext.getCmp('winzsb2').select(store.first());
                zsbnameStoreLoad3 = true;
            }
        }
    });




    var ssbname = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'ssbname',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQU_PER_DROP',
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
                Ext.getCmp('sbname').select(store.first());
                ssbnameStoreLoad = true;
                _init();
            }
        }
    });

    var ssbname2 = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'ssbname2',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy:Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQU_PER_DROP',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        }),
        listeners: {
            load: function (store, records) {
                if (initadd) {
                }else{
                    Ext.getCmp('winsbname').select(store.last());
                }

            }
        }
    });

    var ssbname3 = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'ssbname3',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy:{
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQU_PER_DROP',
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

                ssbnameStoreLoad3 = true;
                if (init) {
                }else{
                    Ext.getCmp('winsbname2').select(store.first());
                }
            }
        }
    });


    var ssbtype = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'ssbtype',
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
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
                Ext.getCmp('sbtype').select(store.last());
                ssbtypeStoreLoad = true;
                _init();
            }
        }
    });


    var ssbtype2 = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'ssbtype2',
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy:Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        }),
        listeners: {
            load: function (store, records) {
                if (initadd) {
                }else{
                    Ext.getCmp('winsbtype').select(store.first());
                }
            }
        }
    });

    var ssbtype3 = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'ssbtype3',
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy:{
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
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

                ssbtypeStoreLoad3 = true;
                if (init) {
                }else{
                    Ext.getCmp('winsbtype2').select(store.last());
                }
            }
        }
    });




    var zyqstore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'zyqstore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/plant_sel',
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
                Ext.getCmp('zyq').select(store.first());
                zyqStoreLoad = true;
                _init();
            }
        }
    });

    var zyqstore2 = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'zyqstore2',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax",{
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/plant_sel',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        }),
        listeners: {
            load: function (store, records) {

                if (initadd) {
                }else{
                    Ext.getCmp('winzyq').select(store.first());
                }
            }
        }
    });

    var zyqstore3 = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'zyqstore3',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/plant_sel',
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
                zyqStoreLoad3 = true;
                if (init) {
                }else{
                    Ext.getCmp('winzyq2').select(store.first());
                }
            }
        }
    });



    var ckstore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'ckstore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/plant_sel',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                IS_V_DEPTCODE: "",
                IS_V_DEPTTYPE: '[基层单位]'
            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('ck').select(store.first());
                ckStoreLoad = true;
                _init();
            }
        }
    });

    var ckstore2 = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'ckstore2',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/plant_sel',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                IS_V_DEPTCODE: "",
                IS_V_DEPTTYPE: '[基层单位]'
            }
        }
    });

    var ckstore3 = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'ckstore3',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/plant_sel',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                IS_V_DEPTCODE: "",
                IS_V_DEPTTYPE: '[基层单位]'
            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('winck2').select(store.first());
                ckStoreLoad3 = true;
            }
        }
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        id : 'buttonPanel',
        defaults : {
            style : 'margin:2px'
        },
        items : [ {
            xtype: 'button',
            text: '查询',
            icon: imgpath + '/search.png',
            handler: queryGrid
        }, {
            xtype: 'button',
            text: '添加',
            icon: imgpath + '/add.png',
            handler: _preInsert
        }, {
            xtype: 'button',
            text: '修改',
            icon: imgpath + '/edit.png',
            handler: _preUpdate
        }, {
            xtype: 'button',
            text: '删除',
            icon: imgpath + '/delete.png',
            handler: _delete
        } ]
    });

    var inputPanel = Ext.create('Ext.Panel', {
        id : 'inputPanel',
        header : false,
        frame : true,
        layout : 'column',
        defaults : {
            labelAlign : 'right',
           // labelWidth : 100,
           // inputWidth : 200,
            margin : '4,0,0,0'
        },
        items : [ {
            id: 'ck',
            xtype: 'combo',
            store: ckstore,
            fieldLabel: '厂矿',
            editable: false,
            labelWidth: 70,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            width: 250,
            listeners: {
                change: function (field, newValue, oldValue) {
                    _selectSbSecond();

                }
            }
        }, {
            id: 'zyq',
            xtype: 'combo',
            store: zyqstore,
            fieldLabel: '作业区',
            editable: false,
            labelWidth: 70,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            width: 250,
            listeners: {
                change: function (field, newValue, oldValue) {
                    _selectSbThird();
                }

            }

        }, {
            id: 'sbtype',
            xtype: 'combo',
            store: ssbtype,
            fieldLabel: '设备类型',
            editable: false,
            labelWidth: 70,
            displayField: 'V_EQUTYPENAME',
            valueField: 'V_EQUTYPECODE',
            queryMode: 'local',
            width: 250,
            listeners: {
                change: function (field, newValue, oldValue) {
                    _selectSbFourth();
                }

            }
        }, {
            id: 'sbname',
            xtype: 'combo',
            store: ssbname,
            fieldLabel: '设备名称',
            editable: false,
            labelWidth: 70,
            displayField: 'V_EQUNAME',
            valueField: 'V_EQUCODE',
            queryMode: 'local',
            width: 250,
            listeners: {
                change: function (field, newValue, oldValue) {
                    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
                    _selectSbFifth();
                }

            }
        },
            {
                id: 'zsb',
                xtype: 'combo',
                store: zsbstore,
                fieldLabel: '子设备名称',
                editable: false,
                labelWidth: 70,
                displayField: 'V_EQUNAME',
                valueField: 'V_EQUCODE',
                queryMode: 'local',
                width: 280
            }, {
                xtype: 'combo',
                id: 'gztype',
                store: gztypestore,
                queryMode: 'local',
                fieldLabel: '故障类型',
                labelWidth: 70,
                editable: false,
                valueField: 'V_TYPECODE',
                displayField: 'V_TYPENAME',
                baseCls: 'margin-bottom',
                width: 250
            }, {
                xtype: 'textfield',
                id: 'gzyy',
                fieldLabel: '故障原因',
                labelWidth: 70,
                allowBlank: true,
                width: 250
            } ]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        store: gridStore,
        border: false,
        columnLines: true,
        autoscroll:true,
        //bodyStyle : 'overflow-x:hidden; overflow-y:auto',
        region: 'center',
        selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: '2.5%',
            align: 'center'
        }, {
            text: '设备类型',
            dataIndex: 'V_EQUTYPECODE',
            flex: 1,
            align: 'center',
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                var index = gridStore.find('V_EQUTYPECODE', value);
                if (index != -1) {
                    return gridStore.getAt(index).get('V_EQUTYPENAME');
                }
                return null;
            }
        }, {
            text: '设备名称',
            dataIndex: 'V_EQUCODE',
            flex: 1,
            align: 'center',
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                var index = gridStore.find('V_EQUCODE', value);
                if (index != -1) {
                    return gridStore.getAt(index).get('V_EQUNAME');
                }
                return null;
            }
        }, {
            text: '部件',
            dataIndex: 'V_EQUCHILD_CODE',
            flex: 1,
            align: 'center',
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                var index = gridStore.find('V_EQUCHILD_CODE', value);
                if (index != -1) {
                    return gridStore.getAt(index).get('V_EQUCHILD_NAME');
                }
                return null;
            }
        }, {
            text: '故障类型',
            dataIndex: 'V_TYPECODE',
            flex: 1,
            align: 'center',
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                var index = gridStore.find('V_TYPECODE', value);
                if (index != -1) {
                    return gridStore.getAt(index).get('V_TYPENAME');
                }
                return null;
            }
        }, {
            text: '故障原因',
            dataIndex: 'V_FAULT_YY',
            flex: 1,
            align: 'center'
        }, {
            text: '备注',
            dataIndex: 'V_BZ',
            flex: 1,
            align: 'center'
        }

        ]
    });
    var window = Ext.create('Ext.window.Window', {
        id: 'window',
        width: 350,
        height: 350,
        bodyPadding: 15,
        layout: 'vbox',
        title: '添加',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        items: [{
            id: 'winck',
            xtype: 'combo',
            store: ckstore2,
            fieldLabel: '厂矿',
            editable: false,
            labelWidth: 70,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px -8px',
            labelAlign: 'right',
            width: 300,
            listeners: {
                select: function (field, newValue, oldValue) {
                    _selectSbSecond2();
                    _selectSbThird2();
                    _selectSbFourth2();
                    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
                    _selectSbFifth2();
                }
            }
        }, {
            id: 'winzyq',
            xtype: 'combo',
            store: zyqstore2,
            fieldLabel: '作业区',
            editable: false,
            labelWidth: 70,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            labelAlign: 'right',
            style: ' margin: 5px 0px 0px -8px',
            width: 300,
            listeners: {
                select: function (field, newValue, oldValue) {
                    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
                    _selectSbThird2();
                    _selectSbFourth2();
                    _selectSbFifth2();
                }
            }

        }, {
            id: 'winsbtype',
            xtype: 'combo',
            store: ssbtype2,
            fieldLabel: '设备类型',
            editable: false,
            labelWidth: 70,
            displayField: 'V_EQUTYPENAME',
            valueField: 'V_EQUTYPECODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px -8px',
            width: 300,
            labelAlign: 'right',
            listeners: {
                select: function (field, newValue, oldValue) {
                    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
                    _selectSbFourth2();
                    _selectSbFifth2();
                }
            }
        }, {
            id: 'winsbname',
            xtype: 'combo',
            store: ssbname2,
            fieldLabel: '设备名称',
            editable: false,
            labelWidth: 70,
            displayField: 'V_EQUNAME',
            valueField: 'V_EQUCODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px -8px',
            width: 300,
            labelAlign: 'right',
            listeners: {
                select: function (field, newValue, oldValue) {
                    // ssbnametest = true;
                    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
                    _selectSbFifth2();
                }
            }
        }, {
            id: 'winzsb',
            xtype: 'combo',
            store: zsbstore2,
            fieldLabel: '子设备名称',
            editable: false,
            labelWidth: 70,
            displayField: 'V_EQUNAME',
            valueField: 'V_EQUCODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px -8px',
            width: 300,
            labelAlign: 'right'
        }, {
            xtype: 'combo',
            id: 'wingztype',
            store: gztypestore2,
            editable: false,
            fieldLabel: '故障类型',
            labelWidth: 70,
            valueField: 'V_TYPECODE',
            displayField: 'V_TYPENAME',
            queryMode: 'local',
            baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px -8px',
            width: 300,
            labelAlign: 'right'

        }, {
            xtype: 'textfield',
            id: 'wingzyy',
            fieldLabel: '故障原因',
            labelWidth: 70,
            allowBlank: false,
            style: ' margin: 5px 0px 0px -8px',
            width: 300,
            labelAlign: 'right'
        }, {
            xtype: 'textfield',
            id: 'winbz',
            fieldLabel: '备注',
            labelWidth: 70,
            allowBlank: false,
            style: ' margin: 5px 0px 0px -8px',
            width: 300,
            labelAlign: 'right'
        }],
        buttons: [{
            xtype: 'button',
            text: '保存',
            width: 40,
            handler: function () {
                save();
            }
        }, {
            xtype: 'button',
            text: '取消',
            width: 40,
            handler: function () {
                Ext.getCmp('window').hide();
            }
        }]
    });

    var window2 = Ext.create('Ext.window.Window', {
        id: 'window2',
        width: 350,
        height: 350,
        bodyPadding: 15,
        layout: 'vbox',
        title: '修改',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        items: [{
            id: 'winck2',
            xtype: 'combo',
            store: ckstore3,
            fieldLabel: '厂矿',
            editable: false,
            labelWidth: 70,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px -8px',
            labelAlign: 'right',
            width: 300,
            listeners: {
                select: function () {
                    _selectSbSecond3();
                    _selectSbThird3();
                    _selectSbFourth3();
                    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
                    _selectSbFifth3();

                }

            }
        }, {
            id: 'winzyq2',
            xtype: 'combo',
            store: zyqstore3,
            fieldLabel: '作业区',
            editable: false,
            labelWidth: 70,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            labelAlign: 'right',
            style: ' margin: 5px 0px 0px -8px',
            width: 300,
            listeners: {
                select: function (field, newValue, oldValue) {
                    _selectSbThird3();
                    _selectSbFourth3();
                    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
                    _selectSbFifth3();
                }
            }

        }, {
            id: 'winsbtype2',
            xtype: 'combo',
            store: ssbtype3,
            fieldLabel: '设备类型',
            editable: false,
            labelWidth: 70,
            displayField: 'V_EQUTYPENAME',
            valueField: 'V_EQUTYPECODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px -8px',
            width: 300,
            labelAlign: 'right',
            listeners: {
                select: function (field, newValue, oldValue) {
                    _selectSbFourth3();
                    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
                    _selectSbFifth3();
                }
            }
        }, {
            id: 'winsbname2',
            xtype: 'combo',
            store: ssbname3,
            fieldLabel: '设备名称',
            editable: false,
            labelWidth: 70,
            displayField: 'V_EQUNAME',
            valueField: 'V_EQUCODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px -8px',
            width: 300,
            labelAlign: 'right',
            listeners: {
                select: function (field, newValue, oldValue) {
                    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
                    _selectSbFifth3();
                }
            }
        }, {
            id: 'winzsb2',
            xtype: 'combo',
            store: zsbstore3,
            fieldLabel: '子设备名称',
            editable: false,
            labelWidth: 70,
            displayField: 'V_EQUNAME',
            valueField: 'V_EQUCODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px -8px',
            width: 300,
            labelAlign: 'right'
        }, {
            xtype: 'combo',
            id: 'wingztype2',
            store: gztypestore2,
            editable: false,
            fieldLabel: '故障类型',
            labelWidth: 70,
            valueField: 'V_TYPECODE',
            displayField: 'V_TYPENAME',
            queryMode: 'local',
            baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px -8px',
            width: 300,
            labelAlign: 'right'

        }, {
            xtype: 'textfield',
            id: 'wingzyy2',
            fieldLabel: '故障原因',
            labelWidth: 70,
            allowBlank: false,
            style: ' margin: 5px 0px 0px -8px',
            width: 300,
            labelAlign: 'right'
        }, {
            xtype: 'textfield',
            id: 'winbz2',
            fieldLabel: '备注',
            labelWidth: 70,
            allowBlank: false,
            style: ' margin: 5px 0px 0px -8px',
            width: 300,
            labelAlign: 'right'
        }],
        buttons: [{
            xtype: 'button',
            text: '保存',
            width: 40,
            handler: function () {
                save2();
            }
        }, {
            xtype: 'button',
            text: '取消',
            width: 40,
            handler: function () {
                Ext.getCmp('window2').hide();
            }
        }]
    });

    /*Ext.create('Ext.Viewport', {
        layout: 'border',
        frame: true,
        title: 'Ext Layout Browser',
        renderTo: Ext.getBody(),
        //width: 500,
        items: [{
            layout: 'border',
            id: 'id',
            region: 'center',
            border: false,
            split: true,
            items: [panel2, grid]
        }]
    });*/

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
        items : [ {
            region : 'north',
            border : false,
            items : [inputPanel ,buttonPanel]
        }, {
            region : 'center',
            layout : 'fit',
            border : false,
            items : [ grid ]
        } ]
    });
});

function _selectSbSecond() {
    var zyqstore = Ext.data.StoreManager.lookup('zyqstore');
    zyqstore.proxy.extraParams = {
        IS_V_DEPTCODE: Ext.getCmp('ck').getValue(),
        IS_V_DEPTTYPE: '[主体作业区]'
    };
    //matGroupSecondStore.currentPage = 1;
    zyqstore.load();

}

function _selectSbSecond2() {
    var zyqstore2 = Ext.data.StoreManager.lookup('zyqstore2');
    zyqstore2.proxy.extraParams = {
        IS_V_DEPTCODE: Ext.getCmp('winck').getValue(),
        IS_V_DEPTTYPE: '[主体作业区]'
    };
    //matGroupSecondStore.currentPage = 1;
    initadd = false;

    zyqstore2.load();

}

function _selectSbSecond3() {
    var zyqstore3 = Ext.data.StoreManager.lookup('zyqstore3');
    zyqstore3.proxy.extraParams = {
        IS_V_DEPTCODE: Ext.getCmp('winck2').getValue(),
        IS_V_DEPTTYPE: '[主体作业区]'
    };
    //matGroupSecondStore.currentPage = 1;
    init = false;
    zyqstore3.load();

}

function _selectSbThird() {
    var ssbtype = Ext.data.StoreManager.lookup('ssbtype');
    ssbtype.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT': Ext.getCmp('zyq').getValue()

    };
    //matGroupThirdStore.currentPage = 1;
    ssbtype.load();
}

function _selectSbThird2() {
    var ssbtype2 = Ext.data.StoreManager.lookup('ssbtype2');
    ssbtype2.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT': Ext.getCmp('winzyq').getValue()

    };
    //matGroupThirdStore.currentPage = 1;
    //zyqStoreLoad2 = true;
    initadd = false;


    ssbtype2.load();
}

function _selectSbThird3() {
    var ssbtype3 = Ext.data.StoreManager.lookup('ssbtype3');
    ssbtype3.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT': Ext.getCmp('winzyq2').getValue()

    };
    //matGroupThirdStore.currentPage = 1;
    init = false;
    ssbtype3.load();
}


function _selectSbFourth() {
    var ssbname = Ext.data.StoreManager.lookup('ssbname');
    ssbname.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT': Ext.getCmp('zyq').getValue(),
        'V_V_EQUTYPECODE': Ext.getCmp('sbtype').getValue()

    };
    //matGroupThirdStore.currentPage = 1;
    ssbname.load();
}

function _selectSbFourth2() {

    /*if((Ext.getCmp('sbtype').getValue() == '%'))
     {
     var ssbname2 = Ext.data.StoreManager.lookup('ssbname2');
     ssbname2.proxy.extraParams = {
     'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
     'V_V_DEPTCODENEXT': Ext.getCmp('winzyq').getValue(),
     'V_V_EQUTYPECODE': Ext.getCmp('winsbtype').getValue()

     };
     //matGroupThirdStore.currentPage = 1;
     ssbname2.load();
     }*/
    var ssbname2 = Ext.data.StoreManager.lookup('ssbname2');
    ssbname2.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT': Ext.getCmp('winzyq').getValue(),
        'V_V_EQUTYPECODE': Ext.getCmp('winsbtype').getValue()

    };
    //matGroupThirdStore.currentPage = 1;
    initadd = false;
    ssbname2.load();
}

function _selectSbFourth3() {
    var ssbname3 = Ext.data.StoreManager.lookup('ssbname3');
    ssbname3.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT': Ext.getCmp('winzyq2').getValue(),
        'V_V_EQUTYPECODE': Ext.getCmp('winsbtype2').getValue()

    };
    //matGroupThirdStore.currentPage = 1;
    init = false;
    ssbname3.load();
}

function _selectSbFifth() {
    if(Ext.getCmp('sbname').getValue() == '%')
    {

        var zsbstore = Ext.data.StoreManager.lookup('zsbstore');
        zsbstore.load();
        Ext.getBody().unmask();//去除页面笼罩
    }
    if(Ext.getCmp('sbname').getValue() != '%')
    {

        Ext.data.StoreManager.lookup('zsbstore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue(),
                V_V_EQUTYPECODE: Ext.getCmp('sbtype').getValue(),
                V_V_EQUCODE: Ext.getCmp('sbname').getValue()
            }
        });
        Ext.getBody().unmask();//去除页面笼罩
    }

}

function _selectSbFifth2() {

    if(Ext.getCmp('winsbname').getValue() == '%')
    {
        var zsbstore2 = Ext.data.StoreManager.lookup('zsbstore2');
        zsbstore2.load();
        Ext.getBody().unmask();//去除页面笼罩
    }
    if(Ext.getCmp('winsbname').getValue() != '%')
    {
        Ext.data.StoreManager.lookup('zsbstore2').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE: Ext.getCmp('winck').getValue(),
                V_V_DEPTNEXTCODE: Ext.getCmp('winzyq').getValue(),
                V_V_EQUTYPECODE: Ext.getCmp('winsbtype').getValue(),
                V_V_EQUCODE: Ext.getCmp('winsbname').getValue()
            }
        });
        Ext.getBody().unmask();//去除页面笼罩
    }

}

function _selectSbFifth3() {

    if(Ext.getCmp('winsbname2').getValue() == '%')
    {

        var zsbstore3 = Ext.data.StoreManager.lookup('zsbstore3');
        zsbstore3.load();
        Ext.getBody().unmask();//去除页面笼罩
    }
    if(Ext.getCmp('winsbname2').getValue() != '%')
    {
        Ext.data.StoreManager.lookup('zsbstore3').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE: Ext.getCmp('winck2').getValue(),
                V_V_DEPTNEXTCODE: Ext.getCmp('winzyq2').getValue(),
                V_V_EQUTYPECODE: Ext.getCmp('winsbtype2').getValue(),
                V_V_EQUCODE: Ext.getCmp('winsbname2').getValue()
            }
        });
        Ext.getBody().unmask();//去除页面笼罩
    }

}

function _preInsert() {
    Ext.getCmp('window').show();
    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
    var ckstore2 = Ext.data.StoreManager.lookup('ckstore2');
    ckstore2.load();

    ckStoreLoad2 = false;
    zyqStoreLoad2 = false;

    initadd = true;

    var zyqstore2 = Ext.data.StoreManager.lookup('zyqstore2');
    zyqstore2.proxy.extraParams = {
        IS_V_DEPTCODE: Ext.getCmp('ck').getValue(),
        IS_V_DEPTTYPE: '[主体作业区]'
    };
    zyqstore2.load();
    Ext.getCmp('winck').setValue(Ext.getCmp('ck').getValue());//给厂矿设置默认值
    Ext.getCmp('winzyq').setValue(Ext.getCmp('zyq').getValue());//给作业区设置默认值

    var ssbtype2 = Ext.data.StoreManager.lookup('ssbtype2');
    ssbtype2.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT':  Ext.getCmp('winzyq').getValue()

    };
    //matGroupThirdStore.currentPage = 1;
    ssbtype2.load();
    if((Ext.getCmp('sbtype').getValue()) == '%')
    {
        Ext.getCmp('winsbtype').select(ssbtype2.getAt(1).get('V_EQUTYPECODE'));
    }else{
        Ext.getCmp('winsbtype').setValue(Ext.getCmp('sbtype').getValue());//给设备类型设置默认值
    }

    var ssbname2 = Ext.data.StoreManager.lookup('ssbname2');
    ssbname2.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT':   Ext.getCmp('winzyq').getValue(),
        'V_V_EQUTYPECODE':  Ext.getCmp('winsbtype').getValue()

    };
    //matGroupThirdStore.currentPage = 1;
    ssbname2.load();
    if((Ext.getCmp('sbname').getValue()) == '%')
    {
        Ext.getCmp('winsbname').select(ssbname2.getAt(1).get('V_EQUCODE'));
    }else{
        Ext.getCmp('winsbname').setValue(Ext.getCmp('sbname').getValue());//给设备类型设置默认值
    }

    var zsbstore2 = Ext.data.StoreManager.lookup('zsbstore2');
    Ext.data.StoreManager.lookup('zsbstore2').load({
        params: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODE: Ext.getCmp('winck').getValue(),
            V_V_DEPTNEXTCODE: Ext.getCmp('winzyq').getValue(),
            V_V_EQUTYPECODE: Ext.getCmp('winsbtype').getValue(),
            V_V_EQUCODE: Ext.getCmp('winsbname').getValue()
        }
    });
    if((Ext.getCmp('zsb').getValue()) == '%')
    {
        Ext.getCmp('winzsb').select(zsbstore2.getAt(1).get('V_EQUCODE'));
    }else{
        Ext.getCmp('winzsb').setValue(Ext.getCmp('zsb').getValue());//给设备类型设置默认值
    }

    Ext.getCmp('wingztype').setValue(Ext.getCmp('gztype').getValue());//给故障类型设置默认值
    Ext.getCmp('wingzyy').setValue(Ext.getCmp('gzyy').getValue());//给故障原因设置默认值
    //Ext.getCmp('winbz').setValue('bz');//给备注设置默认值

    var gztypestore2 = Ext.data.StoreManager.lookup('gztypestore2');
    if((Ext.getCmp('gztype').getValue()) == '%')
    {
        Ext.getCmp('wingztype').select(gztypestore2.getAt(0).get('V_TYPECODE'));
    }else{
        Ext.getCmp('wingztype').setValue(Ext.getCmp('gztype').getValue());//给设备类型设置默认值
    }

    Ext.getBody().unmask();//去除页面笼罩

}

function _z(){
    //console.log(Ext.getCmp('winsbtype').getValue());
    var zsbstore2 = Ext.data.StoreManager.lookup('zsbstore2');
    zsbstore2.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT':   Ext.getCmp('winzyq').getValue(),
        'V_V_EQUTYPECODE':  Ext.getCmp('winsbtype').getValue(),
        'V_V_DEPTCODE': Ext.getCmp('winck').getValue(),
        'V_V_EQUCODE':  Ext.getCmp('winsbname').getValue()

    };
    //matGroupThirdStore.currentPage = 1;
    //ssbnameStoreLoad2 = true;
    zsbstore2.load();
}

function _s(){
    //console.log(Ext.getCmp('winsbtype').getValue());
    var ssbname2 = Ext.data.StoreManager.lookup('ssbname2');
    ssbname2.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT':   Ext.getCmp('winzyq').getValue(),
        'V_V_EQUTYPECODE':  Ext.getCmp('winsbtype').getValue()

    };
    //matGroupThirdStore.currentPage = 1;
    //ssbnameStoreLoad2 = true;
    ssbname2.load();
}

function _s2(){
    Ext.getCmp('winsbname').setValue(Ext.getCmp('sbname').getValue());//给设备名称设置默认值

    //console.log(222222222222222);
}

function _preUpdate() {


    var ckstore3 = Ext.data.StoreManager.lookup('ckstore3');
    ckstore3.load();

    var records = Ext.getCmp('grid').getSelectionModel().getSelection();//获取选中的数据

    if (records.length != 1) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条要修改的数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

    init = true;

    zyqStoreLoad3 = false;
    zsbnameStoreLoad3 = false;
    ssbnameStoreLoad3 = false;
    ssbtypeStoreLoad3 = false;

    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
    var zyqstore3 = Ext.data.StoreManager.lookup('zyqstore3');
    zyqstore3.proxy.extraParams = {
        IS_V_DEPTCODE: records[0].get('V_ORGCODE'),
        IS_V_DEPTTYPE: '[主体作业区]'
    };
    zyqstore3.load();

    var ssbtype3 = Ext.data.StoreManager.lookup('ssbtype3');
    ssbtype3.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT':  records[0].get('V_DEPTCODE')

    };
    //matGroupThirdStore.currentPage = 1;
    ssbtype3.load();

    var ssbname3 = Ext.data.StoreManager.lookup('ssbname3');
    ssbname3.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT':   records[0].get('V_DEPTCODE'),
        'V_V_EQUTYPECODE':  records[0].get('V_EQUTYPECODE')

    };
    //matGroupThirdStore.currentPage = 1;
    ssbname3.load();

    var zsbstore3 = Ext.data.StoreManager.lookup('zsbstore3');
    Ext.data.StoreManager.lookup('zsbstore3').load({
        params: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODE: records[0].get('V_ORGCODE'),
            V_V_DEPTNEXTCODE: records[0].get('V_DEPTCODE'),
            V_V_EQUTYPECODE: records[0].get('V_EQUTYPECODE'),
            V_V_EQUCODE: records[0].get('V_EQUCODE')
        }
    });
    /*var zsbstore3 = Ext.data.StoreManager.lookup('zsbstore3');
    zsbstore3.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODE': records[0].get('V_ORGCODE'),
        'V_V_DEPTNEXTCODE':   records[0].get('V_DEPTCODE'),
        'V_V_EQUTYPECODE':  records[0].get('V_EQUTYPECODE'),
        'V_V_EQUCODE': records[0].get('V_EQUCODE')

    };
    //matGroupThirdStore.currentPage = 1;
    zsbstore3.load();*/


    Ext.getCmp('winck2').setValue(records[0].get('V_ORGCODE'));//给厂矿设置默认值
    Ext.getCmp('winzyq2').setValue(records[0].get('V_DEPTCODE'));//给作业区设置默认值
    Ext.getCmp('winsbtype2').setValue(records[0].get('V_EQUTYPECODE'));//给设备类型设置默认值
    Ext.getCmp('winsbname2').setValue(records[0].get('V_EQUCODE'));//给设备名称设置默认值
    Ext.getCmp('winzsb2').setValue(records[0].get('V_EQUCHILD_CODE'));//给子设备传默认值
    Ext.getCmp('wingztype2').setValue(records[0].get('V_TYPECODE'));//给故障类型设置默认值
    Ext.getCmp('wingzyy2').setValue(records[0].get('V_FAULT_YY'));//给故障原因设置默认值
    Ext.getCmp('winbz2').setValue(records[0].get('V_BZ'));//给故障原因设置默认值

    /* Ext.getCmp('winck2').setValue(records[0].get('V_ORGCODE'));//给厂矿设置默认值
     Ext.getCmp('winzyq2').setValue(records[0].get('V_DEPTCODE'));//给作业区设置默认值
     Ext.getCmp('winsbtype2').setValue(records[0].get('V_EQUTYPECODE'));//给设备类型设置默认值
     Ext.getCmp('winsbname2').setValue(records[0].get('V_EQUCODE'));//给设备名称设置默认值*/
    //Ext.getCmp('winzsb2').setValue(records[0].get('V_EQUCHILD_CODE'));//给子设备传默认值

    Ext.getCmp('window2').show();

}

function _delete() {
    /*Ext.getCmp('winworkcode').setReadOnly(false);
     Ext.getCmp('winworkcode').setValue('');
     Ext.getCmp('winworkname').setValue('');
     Ext.getCmp('winworktype').setValue('');*/

    var records = Ext.getCmp('grid').getSelectionModel().getSelection();//获取选中的数据

    if (records.length != 1) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条要删除的数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    };

    //<input type="hidden" id="localIp" value="<%=request.getRemoteAddr()%>" />
    var dflag = 0;

    Ext.MessageBox.show({
        title: '确认',
        msg: '您确定要删除吗亲？',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESION,
        fn: function (btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    url: AppUrl + 'PM_14/PM_14_FAULT_ITEM_DEL',
                    type: 'ajax',
                    method: 'POST',
                    params: {
                        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
                        //V_V_IP:
                        V_V_GUID: records[0].get('V_GUID')
                    },
                    success: function (response) {
                        var data = Ext.decode(response.responseText);//后台返回的值
                        if (data.success) {//成功，会传回true
                            for (var i = 0; i < records.length; i++) {
                                Ext.data.StoreManager.lookup('gridStore').remove(records[i]);//把这条数据，从页面数据集中移除，现实动态更新页面
                            }
                            //top.banner.Ext.example.msg('操作信息', '操作成功');//提示信息
                        } else {
                            Ext.MessageBox.show({
                                title: '错误',
                                msg: data.message,
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
        }
    });

    /*Ext.Ajax.request({
     method : 'POST',
     async : false,
     url : AppUrl + 'PM_14/PM_14_FAULT_ITEM_DATA_DEL',
     params : {
     V_V_PERCODE : "",//Ext.util.Cookies.get('v_personcode'),
     V_V_IP : "",
     V_V_GUID : records[0].get('I_ID')
     },
     success : function(response) {
     var resp = Ext.decode(response.responseText);
     }
     });*/

    // _seltctCriterion(V_EQUTYPECODE);

    /*init = true;
     Ext.getBody().mask('<p>页面载入中...</p>');
     var ckstore3 = Ext.data.StoreManager.lookup('ckstore3');
     ckstore3.load();
     Ext.getCmp('window2').show();*/
}


function save() {
    if (!_validate(Ext.getCmp('window'))) {
        Ext.MessageBox.show({
            title : '提示',
            msg : '故障原因和备注不能为空!',
            buttons : Ext.MessageBox.OK,
            icon : Ext.MessageBox.ERROR
        });
        return;
    }

    if(Ext.getCmp('winck').getValue()!='%' && Ext.getCmp('winzyq').getValue()!= '%' && Ext.getCmp('winsbtype').getValue()!='%' && Ext.getCmp('winsbname').getValue()!='%' && Ext.getCmp('winzsb').getValue()!='%' && Ext.getCmp('wingztype').getValue()!='%')
    {
        console.log(Ext.getCmp('winsbtype').getValue());
        Ext.Ajax.request({
            url: AppUrl + 'PM_14/PM_14_FAULT_ITEM_SET',
            method: 'POST',
            async: false,
            params: {
                V_V_GUID : "",
                //V_V_ORGCODE :Ext.util.Cookies.get('v_orgCode'),
                V_V_ORGCODE: Ext.getCmp('winck').getValue(),
                V_V_DEPTCODE: Ext.getCmp('winzyq').getValue(),
                V_V_EQUTYPE: Ext.getCmp('winsbtype').getValue(),
                V_V_EQUCODE: Ext.getCmp('winsbname').getValue(),
                V_V_EQUCHILD_CODE: Ext.getCmp('winzsb').getValue(),//部位编码?
                V_V_FAULT_TYPE: Ext.getCmp('wingztype').getValue(),
                V_V_FAULT_YY: Ext.getCmp('wingzyy').getValue(),
                V_V_BZ: Ext.getCmp('winbz').getValue(),
                V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_IP: ""

            },
            success: function (ret) {
                var resp = Ext.JSON.decode(ret.responseText);
                Ext.getCmp('window').hide();
                queryGrid();
            }
        });
    }else{
        Ext.MessageBox.show({
            title : '提示',
            msg : '很抱歉,保存时不能有全部',
            buttons : Ext.MessageBox.OK,
            icon : Ext.MessageBox.ERROR
        });
        return;
    }

}

function save2() {

    if (!_validate(Ext.getCmp('window2'))) {
        Ext.MessageBox.show({
            title : '提示',
            msg : '故障原因和备注不能为空,下拉选项不能为全部',
            buttons : Ext.MessageBox.OK,
            icon : Ext.MessageBox.ERROR
        });
        return;
    }

    var records = Ext.getCmp('grid').getSelectionModel().getSelection();//获取选中的数据
    //console.log(records);
    //alert(records[0].get('I_ID'));
    // Ext.getCmp('winck2').setValue(records[0].get('V_ORGCODE'));//给厂矿设置默认值

    if(Ext.getCmp('winck2').getValue()!='%' && Ext.getCmp('winzyq2').getValue()!= '%' && Ext.getCmp('winsbtype2').getValue()!='%' && Ext.getCmp('winsbname2').getValue()!='%' && Ext.getCmp('winzsb2').getValue()!='%' && Ext.getCmp('wingztype2').getValue()!='%') {

        Ext.Ajax.request({
            url: AppUrl + 'PM_14/PM_14_FAULT_ITEM_SET',
            method: 'POST',
            async: false,
            params: {
                V_V_GUID: records[0].get('V_GUID'),

                //V_V_ORGCODE :Ext.util.Cookies.get('v_orgCode'),
                V_V_ORGCODE: Ext.getCmp('winck2').getValue(),
                V_V_DEPTCODE: Ext.getCmp('winzyq2').getValue(),
                V_V_EQUTYPE: Ext.getCmp('winsbtype2').getValue(),
                V_V_EQUCODE: Ext.getCmp('winsbname2').getValue(),
                V_V_EQUCHILD_CODE: Ext.getCmp('winzsb2').getValue(),//部位编码?
                V_V_FAULT_TYPE: Ext.getCmp('wingztype2').getValue(),
                V_V_FAULT_YY: Ext.getCmp('wingzyy2').getValue(),
                V_V_BZ: Ext.getCmp('winbz2').getValue(),
                V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_IP: ""

            },
            success: function (ret) {
                var resp = Ext.JSON.decode(ret.responseText);
                Ext.getCmp('window2').hide();
                //queryGrid3();
                queryGrid();
            }
        });
    }else{
        Ext.MessageBox.show({
            title : '提示',
            msg : '很抱歉,保存时不能有全部',
            buttons : Ext.MessageBox.OK,
            icon : Ext.MessageBox.ERROR
        });
        return;
    }
}


function queryGrid() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        //V_V_ORGCODE :Ext.util.Cookies.get('v_orgCode'),
        V_V_ORGCODE: Ext.getCmp('ck').getValue(),
        V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
        V_V_EQUTYPE: Ext.getCmp('sbtype').getValue(),
        V_V_EQUCODE: Ext.getCmp('sbname').getValue(),
        V_V_EQUCHILD_CODE: Ext.getCmp('zsb').getValue(),//部位编码?
        V_V_FAULT_TYPE: Ext.getCmp('gztype').getValue(),
        V_V_FAULT_YY: Ext.getCmp('gzyy').getValue()

    };
    //flowDicListStore.currentPage = 1;
    gridStore.load();
}

function queryGrid2() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        V_V_ORGCODE: Ext.util.Cookies.get('v_orgCode'),
        //V_V_ORGCODE :Ext.getCmp('winck').getValue(),
        V_V_DEPTCODE: Ext.getCmp('winzyq').getValue(),
        V_V_EQUTYPE: Ext.getCmp('winsbtype').getValue(),
        V_V_EQUCODE: Ext.getCmp('winsbname').getValue(),
        V_V_EQUCHILD_CODE: Ext.getCmp('winzsb').getValue(),//部位编码?
        V_V_FAULT_TYPE: Ext.getCmp('wingztype').getValue(),
        V_V_FAULT_YY: Ext.getCmp('wingzyy').getValue()

    };
    //flowDicListStore.currentPage = 1;
    gridStore.load();
}

function queryGrid3() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        // V_V_ORGCODE :Ext.util.Cookies.get('v_orgCode'),
        V_V_ORGCODE: Ext.getCmp('winck2').getValue(),
        V_V_DEPTCODE: Ext.getCmp('winzyq2').getValue(),
        V_V_EQUTYPE: Ext.getCmp('winsbtype2').getValue(),
        V_V_EQUCODE: Ext.getCmp('winsbname2').getValue(),
        V_V_EQUCHILD_CODE: Ext.getCmp('winzsb2').getValue(),//部位编码?
        V_V_FAULT_TYPE: Ext.getCmp('wingztype2').getValue(),
        V_V_FAULT_YY: Ext.getCmp('wingzyy2').getValue()

    };
    //flowDicListStore.currentPage = 1;
    gridStore.load();
}

function _init() {
    if (ckStoreLoad && zyqStoreLoad && zsbnameStoreLoad && ssbnameStoreLoad && ssbtypeStoreLoad) {

        Ext.getBody().unmask();//去除页面笼罩
    }
}

function _validate(obj) {
    var valid = true;
    for (var i = 0; i < obj.items.length; i++) {
        if (obj.items.getAt(i).xtype != 'button' && obj.items.getAt(i).xtype != 'panel' && !obj.items.getAt(i).validate()) {
            valid = false;
        }
    }
    return valid;
}


function _ssbnameadd() {
    if(ssbnameStoreLoad2){
        var ssbname2 = Ext.data.StoreManager.lookup('ssbname2');
        Ext.getCmp('winsbname').select(ssbname2.getAt(1).get('V_EQUCODE'));
        //Ext.getCmp('winsbname').select(ssbname2.last());
        ssbnameStoreLoad2 = false;
        //alert("sbname2");
    }
}