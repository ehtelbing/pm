var V_MX_CODETEST
var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
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

    var ckstore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'ckstore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            //url: AppUrl + 'zdh/plant_sel',
            url: AppUrl +'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
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
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('ck').select(store.first());
                /*ckStoreLoad = true;
                 _init();*/
            }
        }
    });

    var ckstore2 = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'ckstore2',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/plant_sel',
            // url: 'PRO_BASE_DEPT_VIEW_ROLE',
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
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('winck').select(store.first());
                /*ckStoreLoad = true;
                 _init();*/
            }
        }
    });

    var ckstore3 = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'ckstore3',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/plant_sel',
            // url: 'PRO_BASE_DEPT_VIEW_ROLE',
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
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('winck3').select(store.first());
                /*ckStoreLoad = true;
                 _init();*/
            }
        }
    });

    var zyqstore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'zyqstore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/plant_sel',
            // url: 'PRO_BASE_DEPT_VIEW_ROLE',
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
                /*store.insert(0, {
                 //'V_DEPTCODE': '%',
                 'V_DEPTNAME': '全部'
                 });*/
                Ext.getCmp('zyq').select(store.first());
                /* zyqStoreLoad = true;
                 _init();*/
            }
        }
    });

    var zyqstore2 = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'zyqstore2',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/plant_sel',
            // url: 'PRO_BASE_DEPT_VIEW_ROLE',
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
                /*store.insert(0, {
                 //'V_DEPTCODE': '%',
                 'V_DEPTNAME': '全部'
                 });*/
                Ext.getCmp('winzyq').select(store.first());
                /* zyqStoreLoad = true;
                 _init();*/
            }
        }
    });

    var zyqstore3 = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'zyqstore3',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/plant_sel',
            // url: 'PRO_BASE_DEPT_VIEW_ROLE',
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
                /*store.insert(0, {
                 //'V_DEPTCODE': '%',
                 'V_DEPTNAME': '全部'
                 });*/
                Ext.getCmp('winzyq3').select(store.first());
                /* zyqStoreLoad = true;
                 _init();*/
            }
        }
    });

    var zystore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'zystore',
        fields: ['V_MAJOR_CODE', 'V_MAJOR_NAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PROJECT/PM_04_PROJECT_MAJOR_SEL',
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
                Ext.getCmp('zy').select(store.first());
                /* zyStoreload = true;
                 _init();*/
            }
        }
    });
    var zystore2 = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'zystore2',
        fields: ['V_MAJOR_CODE', 'V_MAJOR_NAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PROJECT/PM_04_PROJECT_MAJOR_SEL',
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
                Ext.getCmp('winzy').select(store.first());
                /* zyStoreload = true;
                 _init();*/
            }
        }
    });


    var zystore3 = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'zystore3',
        fields: ['V_MAJOR_CODE', 'V_MAJOR_NAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PROJECT/PM_04_PROJECT_MAJOR_SEL',
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
                Ext.getCmp('winzy3').select(store.first());
                /* zyStoreload = true;
                 _init();*/
            }
        }
    });

    var sbtype4 = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'sbtype4',
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            // url: AppUrl + 'qx/PRO_PM_07_DEPTEQUTYPE_PER',
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
            // url: 'PRO_GET_DEPTEQUTYPE_PER',
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
            Ext.getCmp('winsbtype4').select(store.data.items[1]);//store.first());
         }
         }
    });

    var sbtype5 = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'sbtype5',
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            // url: AppUrl + 'qx/PRO_PM_07_DEPTEQUTYPE_PER',
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
            // url: 'PRO_GET_DEPTEQUTYPE_PER',
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
                Ext.getCmp('winsbtype5').select(store.first());
            }
        }
    });

    var sbname4 = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'sbname4',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQU_PER_DROP',
            // url: 'PRO_GET_DEPTEQU_PER_DROP',
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
            Ext.getCmp('winsbname4').select(store.first());

         }
         }
    });

    var sbname5 = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'sbname5',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQU_PER_DROP',
            // url: 'PRO_GET_DEPTEQU_PER_DROP',
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
                Ext.getCmp('winsbname5').select(store.first());

            }
        }
    });

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: false,
        pageSize: 5,
       /* fields: ['V_MX_CODE', 'V_MX_NAME', 'V_ORGCODE', 'V_ORGNAME',
            'V_DEPTCODE', 'V_DEPTNAME', 'V_SPECIALTY', 'V_MX_MENO', 'V_MX_FALG',
            'V_MX_INPERCODE', 'V_MX_INPERNAME', 'V_MX_INDATE', 'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_EQUCODE', 'V_EQUNAME',
            'V_EQU_MENO', 'V_EQU_FALG', 'V_EQU_INPERCODE', 'V_EQU_INPERNAME', 'V_EQU_INDATE', 'V_JXMX_CODE', 'V_GUID'],*/
        fields: ['I_ID', 'V_MX_CODE','V_MX_NAME', 'V_ORGCODE', 'V_DEPTCODE',
            'V_SPECIALTY', 'V_MENO', 'V_FALG', 'V_INPER', 'V_INDATE'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'pm_1921/PM_1921_PLAN_MX_DATA_SEL',
            // url: 'PM_14_FAULT_ITEM_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            },
            extraParams: {}
        })
    });

    var gridStore1 = Ext.create('Ext.data.Store', {
        id: 'gridStore1',
        autoLoad: false,
        pageSize: 5,
        fields: ['V_MX_CODE', 'V_MX_NAME', 'V_ORGCODE', 'V_ORGNAME',
            'V_DEPTCODE', 'V_DEPTNAME', 'V_SPECIALTY', 'V_MX_MENO', 'V_MX_FALG',
            'V_MX_INPERCODE', 'V_MX_INPERNAME', 'V_MX_INDATE', 'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_EQUCODE', 'V_EQUNAME',
            'V_EQU_MENO', 'V_EQU_FALG', 'V_EQU_INPERCODE', 'V_EQU_INPERNAME', 'V_EQU_INDATE', 'V_JXMX_CODE', 'V_GUID'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'pm_1921/PM_1921_PLAN_EQU_DATA_SEL',
            // url: 'PM_14_FAULT_ITEM_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            },
            extraParams: {}
        })
    });

    var panel2 = Ext.create('Ext.panel.Panel', {
        region: 'north',
        layout: 'column',
        border:false,
        defaults : {
            style : 'margin:5px 0px 5px 5px',
            labelAlign : 'right'
        },
        frame:true,
        items: [{
                id: 'ck',
                xtype: 'combo',
                store: ckstore,
                fieldLabel: '单位名称',
                editable: false,
                labelWidth: 70,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local',
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
            listeners:{
                select:function(){
                    queryGrid1();
                }
            }

            }, {
                id: 'zy',
                xtype: 'combo',
                store: zystore,
                fieldLabel: '专业',
                editable: false,
                labelWidth: 70,
                displayField: 'V_MAJOR_NAME',
                valueField: 'V_MAJOR_CODE',
                queryMode: 'local'
            }, {
                id: 'mxname',
                xtype: 'textfield',
                fieldLabel: '模型名称',
                editable: false,
                labelWidth: 70,
                queryMode: 'local'
            },{
                        xtype: 'button',
                        text: '查询',
                        icon: imgpath + '/search.png',
                        handler: queryGrid1
                    }, {
                        xtype: 'button',
                        text: '添加模型',
                        icon: imgpath + '/add.png',
                        handler: addModel
                    }, {
                        xtype: 'button',
                        text: '修改模型',
                        icon: imgpath + '/edit.png',
                        handler: _preUpdateModel
                    }, {
                        xtype: 'button',
                        text: '添加设备',
                        icon: imgpath + '/add.png',
                        handler: addshebei
                    }, {
                        xtype: 'button',
                        text: '修改设备',
                        icon: imgpath + '/edit.png',
                        handler: _preUpdateshebei
                    }, {
                        xtype: 'button',
                        text: '删除',
                        icon: imgpath + '/delete.png',
                        handler: _delete
                    }
                ]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        store: gridStore,
        region: 'center',
        columnLines: true,
        bodyStyle: 'overflow-x:hidden; overflow-y:auto',
         title: '计划模型',
        height: '50%',
        width: '100%',
        autoScroll: true,
        selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            align: 'center',
            flex: 0.25
        }, {
            text: '单位',
            dataIndex: 'V_ORGCODE',
            align: 'center',
            flex: 2,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                var index = ckstore.find('V_DEPTCODE', value);
                if (index != -1) {
                    return ckstore.getAt(index).get('V_DEPTNAME');
                }
                return null;
            }
        }, {
            text: '作业区',
            dataIndex: 'V_ORGCODE',
            align: 'center',
            flex: 3,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                var index = zyqstore.find('V_DEPTCODE', value);
                if (index != -1) {
                    return zyqstore.getAt(index).get('V_DEPTNAME');
                }
                return null;
            }
        }, {
            text: '模型名称',
            dataIndex: 'V_MX_NAME',
            align: 'center',
            flex: 2
        },{
            text: '备注',
            dataIndex: 'V_MENO',
            align: 'center',
            flex: 2
        }],
        bbar: ['->', {
            xtype: 'pagingtoolbar',
            id: 'gpage',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }],
        listeners: {
            itemclick:  function(panel, record, item, index, e, eOpts) {
                //console.log(record.raw.V_MX_CODE);
                itemClick(record.raw.V_MX_CODE);
            }
        }
    });

    var grid1 = Ext.create('Ext.grid.Panel', {
        id: 'grid1',
        store: gridStore1,
        region: 'south',
        columnLines: true,
        height: '50%',
        width: '100%',
        style: ' margin: auto',
        bodyStyle: 'overflow-x:hidden; overflow-y:auto',
        title: '检修设备',
        autoScroll: true,
        selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            align: 'center',
            flex: 0.25
        }, {
            text: '模型名称',
            dataIndex: 'V_MX_NAME',
            flex: 4,
            align: 'center'
        }, {
            text: '设备名称',
            dataIndex: 'V_EQUNAME',
            flex: 3,
            align: 'center'
        }, {
            text: '检修内容',
            dataIndex: 'V_EQU_MENO',
            flex: 2,
            align: 'center'
        }],
        bbar: ['->', {
            xtype: 'pagingtoolbar',
            id: 'gpage1',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore1'
        }]
    });

    var window = Ext.create('Ext.window.Window', {
        id: 'window',
        width: 300,
        height: 440,
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
            fieldLabel: '单位名称',
            editable: false,
            labelWidth: 70,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px -8px',
            labelAlign: 'right',
            width: 250,
            listeners: {
                select: function (field, newValue, oldValue) {
                    _selectSbSecond2();
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
            style: ' margin: 5px 0px 0px -8px',
            labelAlign: 'right',
            width: 250

        }, {
            id: 'winzy',
            xtype: 'combo',
            store: zystore2,
            fieldLabel: '专业',
            editable: false,
            labelWidth: 70,
            displayField: 'V_MAJOR_NAME',
            valueField: 'V_MAJOR_CODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px -8px',
            labelAlign: 'right',
            width: 250

        }, {
            xtype: 'textfield',
            id: 'winmxname',
            fieldLabel: '模型名称',
            labelWidth: 70,
            allowBlank: false,
            style: ' margin: 5px 0px 0px -8px',
            width: 250,
            labelAlign: 'right'
        }, {
            xtype: 'textarea',
            id: 'winbz',
            fieldLabel: '备注',
            labelWidth: 70,
            allowBlank: true,
            style: ' margin: 5px 0px 0px -8px',
            width: 250,
            height: 200,
            labelAlign: 'right'
        }],
        buttons: [{
            xtype: 'button',
            text: '保存',
            width: 40,
            handler: function () {
                addModelSave();
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
        width: 300,
        height: 350,
        bodyPadding: 15,
        layout: 'vbox',
        title: '修改',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        items: [{
            id: 'winck3',
            xtype: 'combo',
            store: ckstore3,
            fieldLabel: '单位名称',
            editable: false,
            labelWidth: 70,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px -8px',
            labelAlign: 'right',
            width: 250,
            listeners: {
                select: function (field, newValue, oldValue) {
                    _selectSbSecond3();
                }
            }


        }, {
            id: 'winzyq3',
            xtype: 'combo',
            store: zyqstore3,
            fieldLabel: '作业区',
            editable: false,
            labelWidth: 70,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px -8px',
            labelAlign: 'right',
            width: 250

        }, {
            id: 'winzy3',
            xtype: 'combo',
            store: zystore3,
            fieldLabel: '专业',
            editable: false,
            labelWidth: 70,
            displayField: 'V_MAJOR_NAME',
            valueField: 'V_MAJOR_CODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px -8px',
            labelAlign: 'right',
            width: 250

        }, {
            xtype: 'textfield',
            id: 'winmxname3',
            fieldLabel: '模型名称',
            labelWidth: 70,
            allowBlank: false,
            style: ' margin: 5px 0px 0px -8px',
            width: 250,
            labelAlign: 'right'
        }, {
            xtype: 'textarea',
            id: 'winbz3',
            fieldLabel: '备注',
            labelWidth: 70,
            allowBlank: true,
            style: ' margin: 5px 0px 0px -8px',
            width: 250,
            height: 200,
            labelAlign: 'right'
        }],
        buttons: [{
            xtype: 'button',
            text: '保存',
            width: 40,
            handler: function () {
                updateModelSave();
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

    var window3 = Ext.create('Ext.window.Window', {
        id: 'window3',
        width: 300,
        height: 350,
        bodyPadding: 15,
        layout: 'column',
        title: '添加设备',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        items: [{
            id: 'winmxname4',
            xtype: 'displayfield',
            fieldLabel: '模型名称',
            allowBlank: true,
            editable: false,
            labelWidth: 70,
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px -8px',
            labelAlign: 'right'
        }, {
            id: 'winsbtype4',
            xtype: 'combo',
            store: sbtype4,
            fieldLabel: '设备类型',
            editable: false,
            labelWidth: 70,
            displayField: 'V_EQUTYPENAME',
            valueField: 'V_EQUTYPECODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px -8px',
            labelAlign: 'right',
            width: 250,
            listeners: {
                select: function (field, newValue, oldValue) {
                    _selectSbFourth4();
                }
            }

        }, {
            id: 'winsbname4',
            xtype: 'combo',
            store: sbname4,
            fieldLabel: '设备名称',
            editable: false,
            labelWidth: 70,
            displayField: 'V_EQUNAME',
            valueField: 'V_EQUCODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px -8px',
            labelAlign: 'right',
            width: 250

        }, {
            xtype: 'textarea',
            id: 'winjxneirong4',
            fieldLabel: '检修内容',
            labelWidth: 70,
            allowBlank: false,
            style: ' margin: 5px 0px 0px -8px',
            width: 250,
            height: 100,
            labelAlign: 'right'
        }, {
            xtype: 'textfield',
            id: 'winjxmx4code',
            fieldLabel: '检修模型编码',
            hidden:true
        }, {
            xtype: 'textfield',
            id: 'winjxmx4',
            fieldLabel: '检修模型',
            labelWidth: 70,
            allowBlank: true,
            readOnly: true,
            style: ' margin: 5px 0px 0px -8px',
            width: 220,
            labelAlign: 'right'
        },
            {
                xtype: 'button',
                text: '+',
                style: ' margin: 5px 0px 0px 5px',
                handler: OnJXMXClicked,
                width: 25
            }],
        buttons: [{
            xtype: 'button',
            text: '保存',
            width: 40,
            handler: function () {
                addshebeiSave();
            }
        }, {
            xtype: 'button',
            text: '取消',
            width: 40,
            handler: function () {
                Ext.getCmp('window3').hide();
            }
        }]
    });

    var window4 = Ext.create('Ext.window.Window', {
        id: 'window4',
        width: 300,
        height: 350,
        bodyPadding: 15,
        layout: 'vbox',
        title: '修改设备',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        items: [{
            id: 'winmxname5',
            xtype: 'displayfield',
            fieldLabel: '模型名称',
            allowBlank: true,
            editable: false,
            labelWidth: 70,
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px -8px',
            labelAlign: 'right'
        }, {
            id: 'winsbtype5',
            xtype: 'combo',
            store: sbtype5,
            fieldLabel: '设备类型',
            editable: false,
            labelWidth: 70,
            displayField: 'V_EQUTYPENAME',
            valueField: 'V_EQUTYPECODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px -8px',
            labelAlign: 'right',
            width: 250,
            listeners: {
                select: function (field, newValue, oldValue) {
                    _selectSbFourth5();
                }
            }

        }, {
            id: 'winsbname5',
            xtype: 'combo',
            store: sbname5,
            fieldLabel: '设备名称',
            editable: false,
            labelWidth: 70,
            displayField: 'V_EQUNAME',
            valueField: 'V_EQUCODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px -8px',
            labelAlign: 'right',
            width: 250

        }, {
            xtype: 'textarea',
            id: 'winjxneirong5',
            fieldLabel: '检修内容',
            labelWidth: 70,
            allowBlank: false,
            style: ' margin: 5px 0px 0px -8px',
            width: 250,
            height: 100,
            labelAlign: 'right'
        }, {
            xtype: 'textfield',
            id: 'winjxmx5',
            fieldLabel: '检修模型',
            labelWidth: 70,
            allowBlank: true,
            style: ' margin: 5px 0px 0px -8px',
            width: 250,
            labelAlign: 'right'
        }],
        buttons: [{
            xtype: 'button',
            text: '保存',
            width: 40,
            handler: function () {
                updateshebeiSave();
            }
        }, {
            xtype: 'button',
            text: '取消',
            width: 40,
            handler: function () {
                Ext.getCmp('window4').hide();
            }
        }]
    });


    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel2, grid, grid1]
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

function _selectSbSecond3() {
    var zyqstore3 = Ext.data.StoreManager.lookup('zyqstore3');
    zyqstore3.proxy.extraParams = {
        IS_V_DEPTCODE: Ext.getCmp('winck3').getValue(),
        IS_V_DEPTTYPE: '[主体作业区]'
    };
    //matGroupSecondStore.currentPage = 1;
    zyqstore3.load();

}

function addModel() {


    var zyqstore2 = Ext.data.StoreManager.lookup('zyqstore2');
    zyqstore2.proxy.extraParams = {
        IS_V_DEPTCODE: Ext.getCmp('ck').getValue(),
        IS_V_DEPTTYPE: '[主体作业区]'
    };
    zyqstore2.load();
    Ext.getCmp('winck').setValue(Ext.getCmp('ck').getValue());//给厂矿设置默认值
    Ext.getCmp('winzyq').setValue(Ext.getCmp('zyq').getValue());//给作业区设置默认值

    Ext.getCmp('winzy').setValue(Ext.getCmp('zy').getValue());//给专业设置默认值
    Ext.getCmp('winmxname').setValue(Ext.getCmp('mxname').getValue());//给模型名称设置默认值

    Ext.getCmp('window').show();

}

function queryGrid1() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        //V_V_ORGCODE :Ext.util.Cookies.get('v_orgCode'),
        V_V_ORGCODE: Ext.getCmp('ck').getValue(),
        V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
        V_V_ZYCODE: Ext.getCmp('zy').getValue(),
        V_V_MXNAME: Ext.getCmp('mxname').getValue()/*,
         V_V_PAGE: Ext.getCmp('gpage').store.currentPage,
         // V_V_PAGE: request.getParameter("page") ,
         V_V_PAGESIZE: Ext.getCmp('gpage').store.pageSize*/
    };
    //flowDicListStore.currentPage = 1;
    gridStore.load();
}

function _selectSbSecond2() {
    var zyqstore2 = Ext.data.StoreManager.lookup('zyqstore2');
    zyqstore2.proxy.extraParams = {
        IS_V_DEPTCODE: Ext.getCmp('winck').getValue(),
        IS_V_DEPTTYPE: '[主体作业区]'
    };
    //matGroupSecondStore.currentPage = 1;
    // initadd = false;

    zyqstore2.load();

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

function addModelSave() {
    if (!_validate(Ext.getCmp('window'))) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '模型名称不能为空!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }

    Ext.Ajax.request({
        url: AppUrl + 'pm_1921/PM_1921_PLAN_MX_DATA_SET',
        method: 'POST',
        async: false,
        params: {
            V_V_MX_CODE: "",
            V_V_MX_NAME: Ext.getCmp('winmxname').getValue(),
            V_V_ORGCODE: Ext.getCmp('winck').getValue(),
            V_V_DEPTCODE: Ext.getCmp('winzyq').getValue(),
            V_V_SPECIALTY: Ext.getCmp('winzy').getValue(),
            V_V_MENO: Ext.getCmp('winbz').getValue(),
            V_V_INPER: Ext.util.Cookies.get('v_personcode')
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            Ext.MessageBox.alert('提示', '添加成功');
            Ext.getCmp('window').hide();
            queryGrid1();
        }
    });


}

function addshebeiSave() {
    if (!_validate(Ext.getCmp('window3'))) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请输入必填项!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }
    if( Ext.getCmp('winsbname4').getValue()=='%' || Ext.getCmp('winsbname4').getValue()== "")
    {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请输入必填项!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }


    var records = Ext.getCmp('grid').getSelectionModel().getSelection();//获取选中的数据
    Ext.Ajax.request({
        url: AppUrl + 'pm_1921/PM_1921_PLAN_EQU_DATA_SET',
        method: 'POST',
        async: false,
        params: {
            V_V_MX_CODE: records[0].get('V_MX_CODE'),
            V_V_GUID:"",
            V_V_EQUTYPE: Ext.getCmp('winsbtype4').getValue(),
            V_V_EQUCODE: Ext.getCmp('winsbname4').getValue(),
            V_V_MENO: Ext.getCmp('winjxneirong4').getValue(),
            V_V_INPER: Ext.util.Cookies.get('v_personcode'),
            V_V_JXMX_CODE: Ext.getCmp('winjxmx4').getValue()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            Ext.MessageBox.alert('提示', '添加设备成功');
            Ext.getCmp('window3').hide();
            //queryGrid1();
            querygrid1();

        }
    });


}

function updateshebeiSave() {
    if (!_validate(Ext.getCmp('window4'))) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请输入必填项!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }
    if( Ext.getCmp('winsbname5').getValue()=='%' || Ext.getCmp('winsbname5').getValue()== "")
    {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请输入必填项!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }


    var records = Ext.getCmp('grid1').getSelectionModel().getSelection();//获取选中的数据
    Ext.Ajax.request({
        url: AppUrl + 'pm_1921/PM_1921_PLAN_EQU_DATA_SET',
        method: 'POST',
        async: false,
        params: {
            V_V_MX_CODE: records[0].get('V_MX_CODE'),
            V_V_GUID: records[0].get('V_GUID'),
            V_V_EQUTYPE: Ext.getCmp('winsbtype5').getValue(),
            V_V_EQUCODE: Ext.getCmp('winsbname5').getValue(),
            V_V_MENO: Ext.getCmp('winjxneirong5').getValue(),
            V_V_INPER: Ext.util.Cookies.get('v_personcode'),
            V_V_JXMX_CODE: Ext.getCmp('winjxmx5').getValue()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            Ext.MessageBox.alert('提示', '修改设备成功');
            Ext.getCmp('window4').hide();
            //queryGrid1();
            querygrid1();

        }
    });


}

function updateModelSave() {

    if (!_validate(Ext.getCmp('window2'))) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '模型名称不能为空,请输入',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }

    var records = Ext.getCmp('grid').getSelectionModel().getSelection();//获取选中的数据
    //console.log(records);
    //alert(records[0].get('I_ID'));
    // Ext.getCmp('winck2').setValue(records[0].get('V_ORGCODE'));//给厂矿设置默认值


    Ext.Ajax.request({
        url: AppUrl + 'pm_1921/PM_1921_PLAN_MX_DATA_SET',
        method: 'POST',
        async: false,
        params: {
            V_V_MX_CODE: records[0].get('V_MX_CODE'),

            V_V_MX_NAME: Ext.getCmp('winmxname3').getValue(),
            V_V_ORGCODE: Ext.getCmp('winck3').getValue(),
            V_V_DEPTCODE: Ext.getCmp('winzyq3').getValue(),
            V_V_SPECIALTY: Ext.getCmp('winzy3').getValue(),
            V_V_MENO: Ext.getCmp('winbz3').getValue(),
            V_V_INPER: Ext.util.Cookies.get('v_personcode')

        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            Ext.getCmp('window2').hide();
            Ext.MessageBox.alert('提示', '修改成功');
            //queryGrid3();
            queryGrid1();
        }
    });

}

function _preUpdateModel() {

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


    var zyqstore3 = Ext.data.StoreManager.lookup('zyqstore3');
    zyqstore3.proxy.extraParams = {
        IS_V_DEPTCODE: records[0].get('V_ORGCODE'),
        IS_V_DEPTTYPE: '[主体作业区]'
    };
    zyqstore3.load();


    Ext.getCmp('winck3').setValue(records[0].get('V_ORGCODE'));//给厂矿设置默认值
    Ext.getCmp('winzyq3').setValue(records[0].get('V_DEPTCODE'));//给作业区设置默认值
    Ext.getCmp('winzy3').setValue(records[0].get('V_SPECIALTY'));//给设备类型设置默认值
    Ext.getCmp('winmxname3').setValue(records[0].get('V_MX_NAME'));//给设备名称设置默认值
    Ext.getCmp('winbz3').setValue(records[0].get('V_MX_MENO'));//给子设备传默认值


    Ext.getCmp('window2').show();
}

function _preUpdateshebei() {

    var records = Ext.getCmp('grid1').getSelectionModel().getSelection();//获取选中的数据

    if (records.length != 1) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条要修改的数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }


    var sbtype5 = Ext.data.StoreManager.lookup('sbtype5');
    sbtype5.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT': records[0].get('V_DEPTCODE')

    };
    //matGroupThirdStore.currentPage = 1;
    sbtype5.load();


    var sbname5 = Ext.data.StoreManager.lookup('sbname5');
    sbname5.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT': records[0].get('V_DEPTCODE'),
        'V_V_EQUTYPECODE': Ext.getCmp('winsbtype5').getValue()

    };
    //matGroupThirdStore.currentPage = 1;
    sbname5.load();


    Ext.getCmp('winmxname5').setValue(records[0].get('V_MX_NAME'));//给厂矿设置默认值
    Ext.getCmp('winsbtype5').setValue(records[0].get('V_EQUTYPECODE'));//给厂矿设置默认值
    Ext.getCmp('winsbname5').setValue(records[0].get('V_EQUCODE'));//给厂矿设置默认值
    Ext.getCmp('winjxneirong5').setValue(records[0].get('V_EQU_MENO'));//给厂矿设置默认值
    Ext.getCmp('winjxmx5').setValue(records[0].get('V_JXMX_CODE'));//给厂矿设置默认值

    Ext.getCmp('window4').show();
}

function addshebei() {

    var records = Ext.getCmp('grid').getSelectionModel().getSelection();//获取选中的数据

    if (records.length != 1) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择检修模型进行添加',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }


    var sbtype4 = Ext.data.StoreManager.lookup('sbtype4');
    sbtype4.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT': records[0].get('V_DEPTCODE')

    };
    //matGroupThirdStore.currentPage = 1;
    sbtype4.load();


    var sbname4 = Ext.data.StoreManager.lookup('sbname4');
    sbname4.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT': records[0].get('V_DEPTCODE'),
        'V_V_EQUTYPECODE': Ext.getCmp('winsbtype4').getValue()

    };
    //matGroupThirdStore.currentPage = 1;
    sbname4.load();


    Ext.getCmp('winmxname4').setValue(records[0].get('V_MX_NAME'));//给厂矿设置默认值
   // Ext.getCmp('winsbtype4').setValue(records[0].get('V_EQUTYPECODE'));
    Ext.getCmp('winsbname4').select(sbname4.getAt(1).get('V_EQUCODE'));
    Ext.getCmp('winjxneirong4').setValue("");
    Ext.getCmp('winjxmx4').setValue("");

    Ext.getCmp('window3').show();
}

function _delete() {


    var records = Ext.getCmp('grid').getSelectionModel().getSelection();//获取选中的数据
    var records1 = Ext.getCmp('grid1').getSelectionModel().getSelection();//获取选中的数据
    //console.log(records1.length);
    if(records1.length > 0 )
    {
        if (records1.length == 0) {//判断是否选中数据
            Ext.MessageBox.show({
                title: '提示',
                msg: '请选择一条要删除的数据',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        ;

        //<input type="hidden" id="localIp" value="<%=request.getRemoteAddr()%>" />
        var dflag = 0;

        Ext.MessageBox.show({
            title: '确认',
            msg: '您确定要删除吗？',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESION,
            fn: function (btn) {
                if (btn == 'yes') {

                    var V_MX_CODE_ID_LIST = new Array();
                    var V_GUID_ID_LIST = new Array();
                    for (var i = 0; i < records1.length; i++) {
                        V_MX_CODE_ID_LIST.push(records1[i].get('V_MX_CODE'));
                        V_GUID_ID_LIST.push(records1[i].get('V_GUID'));
                    }

                    Ext.Ajax.request({
                        url: AppUrl + 'pm_1921/PM_1921_PLAN_DATA_DEL',
                        type: 'ajax',
                        method: 'POST',
                        params: {
                            V_V_TYPE: "2",
                            V_MX_CODE_ID_LIST: V_MX_CODE_ID_LIST,
                            V_GUID_ID_LIST: V_GUID_ID_LIST
                        },
                        success: function (response) {
                            Ext.MessageBox.alert('提示', '删除成功');
                            var data = Ext.decode(response.responseText);//后台返回的值
                            if (data.success) {//成功，会传回true
                                for (var i = 0; i < records1.length; i++) {
                                    Ext.data.StoreManager.lookup('gridStore1').remove(records1[i]);//把这条数据，从页面数据集中移除，现实动态更新页面
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
    }else{
        if (records.length == 0 ) {//判断是否选中数据
            Ext.MessageBox.show({
                title: '提示',
                msg: '请选择一条要删除的数据',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        ;

        //<input type="hidden" id="localIp" value="<%=request.getRemoteAddr()%>" />
        var dflag = 0;

        var V_MX_CODE_ID_LIST = new Array();
        var V_GUID_ID_LIST = new Array();
        for (var i = 0; i < records.length; i++) {
            V_MX_CODE_ID_LIST.push(records[i].get('V_MX_CODE'));
            V_GUID_ID_LIST.push(records[i].get('V_GUID'));
        }

        Ext.MessageBox.show({
            title: '确认',
            msg: '您确定要删除吗？',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESION,
            fn: function (btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url: AppUrl + 'pm_1921/PM_1921_PLAN_DATA_DELFIRST',
                        type: 'ajax',
                        method: 'POST',
                        params: {
                            V_V_TYPE: "1",
                            V_MX_CODE_ID_LIST: V_MX_CODE_ID_LIST,
                            V_V_GUID: records[0].get('V_GUID')
                        },
                        success: function (response) {
                            Ext.MessageBox.alert('提示', '删除成功');
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
    }




}

function itemClick(V_MX_CODE) {
    //var records = Ext.getCmp('grid').getSelectionModel().getSelection();//获取选中的数据
    // alert(records[0].get('V_MX_CODE'));
    V_MX_CODETEST = V_MX_CODE
    var gridStore1 = Ext.data.StoreManager.lookup('gridStore1');
    gridStore1.proxy.extraParams = {
        //V_V_ORGCODE :Ext.util.Cookies.get('v_orgCode'),
        V_V_MXCODE: V_MX_CODETEST
    };
    //flowDicListStore.currentPage = 1;
    gridStore1.load();
}

function querygrid1() {
    //var records = Ext.getCmp('grid').getSelectionModel().getSelection();//获取选中的数据
    // alert(records[0].get('V_MX_CODE'));
    //V_MX_CODETEST = V_MX_CODE
    var gridStore1 = Ext.data.StoreManager.lookup('gridStore1');
    gridStore1.proxy.extraParams = {
        //V_V_ORGCODE :Ext.util.Cookies.get('v_orgCode'),
        V_V_MXCODE: V_MX_CODETEST
    };
    //flowDicListStore.currentPage = 1;
    gridStore1.load();
}

function _selectSbFourth4() {
    var records = Ext.getCmp('grid').getSelectionModel().getSelection();//获取选中的数据
    var sbname4 = Ext.data.StoreManager.lookup('sbname4');
    sbname4.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT': records[0].get('V_DEPTCODE'),
        'V_V_EQUTYPECODE': Ext.getCmp('winsbtype4').getValue()

    };
    sbname4.load();
}

function _selectSbFourth5() {
    var records = Ext.getCmp('grid1').getSelectionModel().getSelection();//获取选中的数据
    var sbname5 = Ext.data.StoreManager.lookup('sbname5');
    sbname5.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT': records[0].get('V_DEPTCODE'),
        'V_V_EQUTYPECODE': Ext.getCmp('winsbtype5').getValue()

    };
    sbname5.load();
}

function getReturnValue(code,name) {
    Ext.getCmp("winjxmx4").setValue(name);
    Ext.getCmp("winjxmx4code").setValue(code);
}
function OnJXMXClicked(){
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    window.open(AppUrl + 'page/PM_192101/index.html?V_V_ORGCODE=' + Ext.getCmp('ck').getValue()
     +'&V_V_DEPTCODE='+Ext.getCmp('zyq').getValue()
     +'&V_V_EQUTYPE='+Ext.getCmp('winsbtype4').getValue()
     +'&V_V_EQUCODE='+Ext.getCmp('winsbname4').getValue(), '', 'height='+oheight+',width='+owidth+',top=100px,left=100px,resizable=yes');
}