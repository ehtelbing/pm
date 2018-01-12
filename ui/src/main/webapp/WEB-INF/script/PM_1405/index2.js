var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var V_V_GUID ='';
Ext.onReady(function () {
    var ckStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'ckStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'sxd/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '基层单位'
            }
        }
    });

    var zyqStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyqStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'sxd/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var sblxStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'sblxStore',
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy:{
            type: 'ajax',
            async: false,
            url: AppUrl + 'sxd/PRO_GET_DEPTEQUTYPE_PER',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var sbmcStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'sbmcStore',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'sxd/PRO_GET_DEPTEQU_PER_DROP',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var zsbmcStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zsbmcStore',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'sxd/PRO_SAP_EQU_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var gzlxStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'gzlxStore',
        fields: ['V_TYPECODE', 'V_TYPENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'sxd/PM_14_FAULT_TYPE_ITEM_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var ckStore2 = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'ckStore2',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'sxd/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '基层单位'
            }
        }
    });

    var zyqStore2 = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyqStore2',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'sxd/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var sblxStore2 = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'sblxStore2',
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy:{
            type: 'ajax',
            async: false,
            url: AppUrl + 'sxd/PRO_GET_DEPTEQUTYPE_PER',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var sbmcStore2 = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'sbmcStore2',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'sxd/PRO_GET_DEPTEQU_PER_DROP',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var zsbmcStore2 = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zsbmcStore2',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'sxd/PRO_SAP_EQU_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var gzlxStore2 = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'gzlxStore2',
        fields: ['V_TYPECODE', 'V_TYPENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'sxd/PM_14_FAULT_TYPE_ITEM_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var ckStore3 = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'ckStore3',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'sxd/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '基层单位'
            }
        }
    });

    var zyqStore3 = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyqStore3',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'sxd/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var sblxStore3 = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'sblxStore3',
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy:{
            type: 'ajax',
            async: false,
            url: AppUrl + 'sxd/PRO_GET_DEPTEQUTYPE_PER',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var sbmcStore3 = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'sbmcStore3',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'sxd/PRO_GET_DEPTEQU_PER_DROP',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var zsbmcStore3 = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zsbmcStore3',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'sxd/PRO_SAP_EQU_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var gzlxStore3 = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'gzlxStore3',
        fields: ['V_TYPECODE', 'V_TYPENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'sxd/PM_14_FAULT_TYPE_ITEM_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['V_FINDTIME',      //发现时间
            'V_EQUTYPENAME',        //设备类型
            'V_EQUCODE',            //设备编码
            'V_EQUNAME',            //设备名称
            'V_EQUCHILD_NAME',      //部件
            'V_TYPENAME',           //故障类型
            'V_FAULT_YY',           //故障原因
            'V_FAULT_XX',           //故障现象
            'V_FAULT_LEVEL',        //故障等级
            'V_JJBF',               //解决办法
            'V_ORGCODE',
            'V_ORGNAME',
            'V_DEPTCODE',
            'V_DEPTNAME',
            'V_EQUTYPECODE',
            'V_TYPECODE',
            'V_EQUCHILD_CODE'
        ],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'sxd/PM_14_FAULT_ITEM_DATA_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var fileGridStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'fileGridStore',
        pageSize: 20,
        fields: ['V_V_GUID', 'V_V_FILETYPECODE', 'V_FILEGUID', 'V_FILENAME', 'V_PERSON', 'V_FINDTIME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'sxd/PRO_BASE_FILE_SEL',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                'V_V_FILETYPECODE': 'SBGZ'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var fileGridStore2 = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'fileGridStore2',
        pageSize: 20,
        fields: ['V_V_GUID', 'V_V_FILETYPECODE', 'V_FILEGUID', 'V_FILENAME', 'V_PERSON', 'V_FINDTIME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'sxd/PRO_BASE_FILE_SEL',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                'V_V_FILETYPECODE': 'SBGZ'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var panel = Ext.create('Ext.Panel', {
        id: 'panel',
        region: 'north',
        width: '100%',
        frame:true,
        layout: 'column',
        defaults: {
            style: 'margin:5px 0px 5px 5px',
            labelAlign: 'right'
        },
        items: [{
            xtype: 'combo',
            id: 'ck',
            store: ckStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '厂矿',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            labelWidth: 70,
            listeners:{
                change: function () {
                    _ck_zyqload();
                }
            }
        }, {
            xtype: 'combo',
            id: 'zyq',
            store: zyqStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '作业区',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            labelWidth: 70,
            listeners:{
                change: function () {
                    _zyq_sblx();
                }
            }
        }, {
            xtype: 'combo',
            id: 'sblx',
            store: sblxStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '设备类型',
            displayField: 'V_EQUTYPENAME',
            valueField: 'V_EQUTYPECODE',
            labelWidth: 70,
            listeners:{
                change: function () {
                    _sblx_sbmc();
                }
            }
        }, {
            xtype: 'combo',
            id: 'sbmc',
            store: sbmcStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '设备名称',
            displayField: 'V_EQUNAME',
            valueField: 'V_EQUCODE',
            labelWidth: 70,
            listeners:{
                change: function () {
                    _sbmc_zsbmc();
                }
            }
        }, {
            xtype: 'combo',
            id: 'zsbmc',
            store: zsbmcStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '子设备名称',
            displayField: 'V_EQUNAME',
            valueField: 'V_EQUCODE',
            labelWidth: 70
        }, {
            xtype: 'combo',
            id: 'gzlx',
            store: gzlxStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '故障类型',
            displayField: 'V_TYPENAME',
            valueField: 'V_TYPECODE',
            labelWidth: 70
        }, {
            xtype : 'datefield',
            format : 'Y/m/d',
            fieldLabel : '发现时间',
            labelWidth : 70,
            id : 'startTime',
            value : new Date(new Date().getFullYear(),new Date().getMonth(), 1)
        }, {
            xtype : 'datefield',
            format : 'Y/m/d',
            fieldLabel : '至',
            labelWidth : 70,
            id : 'endTime',
            value : new Date()
        }, {
            xtype : 'textfield',
            fieldLabel : '事故原因',
            labelWidth : 70,
            id : 'sgyy'
        }, {
            xtype: 'button',
            text: '查询',
            style: ' margin: 5px 0px 0px 10px',
            icon: imgpath + '/search.png',
            listeners: {click: OnButtonQueryClicked}
        }, {
            xtype: 'button',
            text: '手动添加',
            icon: imgpath + '/add.png',
            listeners: {click: onButtonAddClicked}
        }, {
            xtype: 'button',
            text: '修改',
            icon: imgpath + '/edit.png',
            handler: editClick
        }, {
            xtype: 'button',
            text: '删除',
            icon: imgpath + '/delete1.png'
        }]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        region: 'center',
        width: '100%',
        pageSize: 5,
        columnLines: true,
        store: gridStore,
        autoScroll: true,
        style: 'text-align:center',
        height: 400,
        selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns: [{xtype: 'rownumberer', text: '序号', width : 50,align:'center'},
            {text: '发现时间', width : 140, dataIndex: 'V_FINDTIME', align : 'center'},
            {text: '设备类型', width : 140, dataIndex: 'V_EQUTYPENAME', align: 'center'},
            {text: '设备名称', width : 140, dataIndex: 'V_EQUNAME', align: 'center'},
            {text: '部件', width : 100, dataIndex: 'V_EQUCHILD_NAME', align: 'center'},
            {text: '故障类型', width : 140, dataIndex: 'V_TYPENAME', align: 'center'},
            {text: '故障原因',width : 100, dataIndex: 'V_FAULT_YY', align: 'center'},
            {text: '故障现象', width : 100, dataIndex: 'V_FAULT_XX', align: 'center'},
            {text: '故障等级', width : 100, dataIndex: 'V_FAULT_LEVEL', align: 'center'},
            {text: '解决办法', width : 100, dataIndex: 'V_JJBF', align: 'center'}],
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [panel,grid]
    });

    Ext.data.StoreManager.lookup('ckStore').on('load',function(){
        Ext.getCmp('ck').select( Ext.data.StoreManager.lookup('ckStore').getAt(0));
        Ext.data.StoreManager.lookup('zyqStore').load({
            params:{
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });

    Ext.data.StoreManager.lookup('zyqStore').on('load',function() {
        Ext.getCmp('zyq').select( Ext.data.StoreManager.lookup('zyqStore').getAt(0));
        Ext.data.StoreManager.lookup('sblxStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
            }
        });
    });

    Ext.data.StoreManager.lookup('sblxStore').on('load',function() {
        Ext.getCmp('sblx').select( Ext.data.StoreManager.lookup('sblxStore').getAt(0));
        Ext.data.StoreManager.lookup('sbmcStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue(),
                V_V_EQUTYPECODE: Ext.getCmp('sblx').getValue()
            }
        });
    });

    Ext.data.StoreManager.lookup('sbmcStore').on('load',function() {
        Ext.getCmp('sbmc').select( Ext.data.StoreManager.lookup('sbmcStore').getAt(0));
        Ext.data.StoreManager.lookup('zsbmcStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE:Ext.getCmp('ck').getValue(),
                V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue(),
                V_V_EQUTYPECODE: Ext.getCmp('sblx').getValue(),
                V_V_EQUCODE:Ext.getCmp('sbmc').getValue()
            }
        });
    });

    Ext.data.StoreManager.lookup('zsbmcStore').on('load',function() {
        Ext.getCmp('zsbmc').store.insert(0, {
            'V_EQUCODE': '%',
            'V_EQUNAME': '-全部-'
        });
        Ext.getCmp('zsbmc').select( Ext.data.StoreManager.lookup('zsbmcStore').getAt(0));
        Ext.data.StoreManager.lookup('gzlxStore').load({
            params: {
            }
        });
    });

    Ext.data.StoreManager.lookup('gzlxStore').on('load',function() {
        Ext.getCmp('gzlx').store.insert(0, {
            'V_TYPECODE': '%',
            'V_TYPENAME': '-全部-'
        });
        Ext.getCmp('gzlx').select( Ext.data.StoreManager.lookup('gzlxStore').getAt(0));
        Ext.data.StoreManager.lookup('gridStore').load({
            params: {
                V_V_ORGCODE : Ext.getCmp('ck').getValue(),
                V_V_DEPTCODE : Ext.getCmp('zyq').getValue(),
                V_V_EQUTYPE : Ext.getCmp('sblx').getValue(),
                V_V_EQUCODE : Ext.getCmp('sbmc').getValue(),
                V_V_EQUCHILD_CODE : Ext.getCmp('zsbmc').getValue(),
                V_V_FAULT_TYPE : Ext.getCmp('gzlx').getValue(),
                V_V_FAULT_YY : Ext.getCmp('sgyy').getValue(),
                V_V_FINDTIME_B : Ext.Date.format(Ext.ComponentManager.get("startTime").getValue(), 'Y/m/d'),
                V_V_FINDTIME_E : Ext.Date.format(Ext.ComponentManager.get("endTime").getValue(), 'Y/m/d')
            }
        });
    });

    Ext.create('Ext.window.Window', {
        width : 1000,
        height : 550,
        title : '添加',
        layout : 'fit',
        id : 'winAdd',
        closeAction : 'hide',
        closable : true,
        items : [{
            xtype : 'panel',
            frame : true,
            layout: 'column',
            style: 'background-color:#FFFFFF',
            baseCls: 'my-panel-no-border',
            bodyStyle : 'padding:5px 5px 0',
            width : 1000,
            items : [{
                xtype:'panel',
                frame : true,
                layout: 'column',
                width : 530,
                height:530,
                defaults: {
                    style: 'margin:5px 0px 0px 5px',
                    labelAlign: 'right'
                },
                items:[{
                    xtype: 'combo',
                    id: 'ck2',
                    store: ckStore2,
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '厂矿',
                    displayField: 'V_DEPTNAME',
                    valueField: 'V_DEPTCODE',
                    labelWidth: 70,
                    listeners:{
                        change: function () {
                            _ck_zyqload2();
                        }
                    }
                }, {
                    xtype: 'combo',
                    id: 'zyq2',
                    store: zyqStore2,
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '作业区',
                    displayField: 'V_DEPTNAME',
                    valueField: 'V_DEPTCODE',
                    labelWidth: 70,
                    listeners:{
                        change: function () {
                            _zyq_sblx2();
                        }
                    }
                }, {
                    xtype: 'combo',
                    id: 'sblx2',
                    store: sblxStore2,
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '设备类型',
                    displayField: 'V_EQUTYPENAME',
                    valueField: 'V_EQUTYPECODE',
                    labelWidth: 70,
                    listeners:{
                        change: function () {
                            _sblx_sbmc2();
                        }
                    }
                }, {
                    xtype: 'combo',
                    id: 'sbmc2',
                    store: sbmcStore2,
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '设备名称',
                    displayField: 'V_EQUNAME',
                    valueField: 'V_EQUCODE',
                    labelWidth: 70,
                    listeners:{
                        change: function () {
                            _sbmc_zsbmc2();
                        }
                    }
                }, {
                    xtype: 'combo',
                    id: 'zsbmc2',
                    store: zsbmcStore2,
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '子设备名称',
                    displayField: 'V_EQUNAME',
                    valueField: 'V_EQUCODE',
                    labelWidth: 70
                }, {
                    xtype: 'combo',
                    id: 'gzlx2',
                    store: gzlxStore2,
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '故障类型',
                    displayField: 'V_TYPENAME',
                    valueField: 'V_TYPECODE',
                    labelWidth: 70
                }, {
                    xtype : 'datefield',
                    format : 'Y/m/d',
                    fieldLabel : '发现时间',
                    labelWidth : 70,
                    id : 'startTime2',
                    width : 470,
                    value : new Date(new Date().getFullYear(),new Date().getMonth(), 1)
                }, {
                    xtype: 'textarea',
                    id:'gzyy2',
                    fieldLabel: '故障原因',
                    labelWidth:70,
                    width : 470,
                    height : 80
                }, {
                    xtype: 'textarea',
                    id:'gzxx2',
                    fieldLabel: '故障现象',
                    labelWidth:70,
                    width : 470,
                    height : 80
                }, {
                    xtype: 'textarea',
                    id:'gzdj2',
                    fieldLabel: '故障等级',
                    labelWidth:70,
                    width : 470,
                    height : 25
                }, {
                    xtype: 'textarea',
                    id:'gzjj2',
                    fieldLabel: '故障解决',
                    labelWidth:70,
                    width : 470,
                    height : 80
                }]
            }, {
                xtype:'panel',
                frame : true,
                layout: 'column',
                baseCls: 'my-panel-no-border',
                width : 430,
                items:[{
                    xtype:'form',
                    id:'uploadForm',
                    frame : true,
                    baseCls: 'my-panel-no-border',
                    layout: 'column',
                    width : '100%',
                    height:80,
                    defaults: {
                        style: 'margin:5px 0px 0px 5px',
                        labelAlign: 'right'
                    },
                    items:[{
                        xtype: 'filefield',
                        id: 'V_V_FILEBLOB2',
                        name: 'V_V_FILEBLOB2',
                        fieldLabel: '故障附件',
                        labelWidth: 70,
                        labelAlign: 'right',
                        inputWidth: 302,
                        style: ' margin: 5px 0px 0px -8px',
                        buttonText: '选择文件',
                        allowBlank: false
                    }, {
                        id: 'insertFilesFj2',
                        xtype: 'button',
                        text: '上传',
                        style: ' margin: 5px 0px 0px 5px',
                        handler: _upLoadFile
                    }, {
                        xtype: 'hidden',
                        name: 'V_V_GUID',
                        id: 'V_V_GUID'
                    }, {
                        xtype: 'hidden',
                        name: 'V_V_FILENAME',
                        id: 'V_V_FILENAME'
                    }, {
                        xtype: 'hidden',
                        name: 'V_V_FILETYPECODE',
                        id: 'V_V_FILETYPECODE'
                    }, {
                        xtype: 'hidden',
                        name: 'V_V_PLANT',
                        id: 'V_V_PLANT'
                    }, {
                        xtype: 'hidden',
                        name: 'V_V_DEPT',
                        id: 'V_V_DEPT'
                    }, {
                        xtype: 'hidden',
                        name: 'V_V_PERSON',
                        id: 'V_V_PERSON'
                    }, {
                        xtype: 'hidden',
                        name: 'V_V_REMARK',
                        id: 'V_V_REMARK'
                    }]
                }, {
                    xtype:'panel',
                    frame : true,
                    style : 'background-color:#FF83FA',
                    layout : 'column',
                    width : 430,
                    height : 400,
                    items : [{
                        xtype:'grid',
                        id: 'filegrid',
                        store: fileGridStore,
                        region: 'center',
                        width : 430,
                        pageSize: 5,
                        columnLines: true,
                        autoScroll: true,
                        style: 'text-align:center',
                        columns: [
                            {text : '附件名称', dataIndex : 'V_FILENAME', align : 'center', labelAlign : 'right', width : 300},
                            {text: '操作', width : 130, align: 'center',renderer: _delRander}]
                    }]
                }]
            }],
            buttons : [{
                text : '保存',
                handler : function() {
                    Ext.getCmp('winAdd').hide();
                }
            }, {
                text : '取消',
                handler : function() {
                    Ext.getCmp('winAdd').hide();
                }
            }]
        }]
    });

    Ext.create('Ext.window.Window', {
        width : 1000,
        height : 550,
        title : '添加备件',
        layout : 'fit',
        id : 'winEdit',
        closeAction : 'hide',
        closable : true,
        items : [{
            xtype : 'panel',
            frame : true,
            layout: 'column',
            style: 'background-color:#FFFFFF',
            baseCls: 'my-panel-no-border',
            bodyStyle : 'padding:5px 5px 0',
            width : 1000,
            items : [{
                xtype:'panel',
                frame : true,
                layout: 'column',
                width : 530,
                height:530,
                defaults: {
                    style: 'margin:5px 0px 0px 5px',
                    labelAlign: 'right'
                },
                items:[{
                    xtype: 'combo',
                    id: 'ck3',
                    store: ckStore3,
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '厂矿',
                    displayField: 'V_DEPTNAME',
                    valueField: 'V_DEPTCODE',
                    labelWidth: 70,
                    listeners:{
                        select: function () {
                            _ck_zyqload3();
                        }
                    }
                }, {
                    xtype: 'combo',
                    id: 'zyq3',
                    store: zyqStore3,
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '作业区',
                    displayField: 'V_DEPTNAME',
                    valueField: 'V_DEPTCODE',
                    labelWidth: 70,
                    listeners:{
                        select: function () {
                            _zyq_sblx3();
                        }
                    }
                }, {
                    xtype: 'combo',
                    id: 'sblx3',
                    store: sblxStore3,
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '设备类型',
                    displayField: 'V_EQUTYPENAME',
                    valueField: 'V_EQUTYPECODE',
                    labelWidth: 70,
                    listeners:{
                        select: function () {
                            _sblx_sbmc3();
                        }
                    }
                }, {
                    xtype: 'combo',
                    id: 'sbmc3',
                    store: sbmcStore3,
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '设备名称',
                    displayField: 'V_EQUNAME',
                    valueField: 'V_EQUCODE',
                    labelWidth: 70,
                    listeners:{
                        select: function () {
                            _sbmc_zsbmc3();
                        }
                    }
                }, {
                    xtype: 'combo',
                    id: 'zsbmc3',
                    store: zsbmcStore3,
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '子设备名称',
                    displayField: 'V_EQUNAME',
                    valueField: 'V_EQUCODE',
                    labelWidth: 70
                }, {
                    xtype: 'combo',
                    id: 'gzlx3',
                    store: gzlxStore3,
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '故障类型',
                    displayField: 'V_TYPENAME',
                    valueField: 'V_TYPECODE',
                    labelWidth: 70
                }, {
                    xtype : 'datefield',
                    format : 'Y/m/d',
                    fieldLabel : '发现时间',
                    labelWidth : 70,
                    id : 'startTime3',
                    width : 470,
                    value : new Date(new Date().getFullYear(),new Date().getMonth(), 1)
                }, {
                    xtype: 'textarea',
                    id:'gzyy3',
                    fieldLabel: '故障原因',
                    labelWidth:70,
                    width : 470,
                    height : 80
                }, {
                    xtype: 'textarea',
                    id:'gzxx3',
                    fieldLabel: '故障现象',
                    labelWidth:70,
                    width : 470,
                    height : 80
                }, {
                    xtype: 'textarea',
                    id:'gzdj3',
                    fieldLabel: '故障等级',
                    labelWidth:70,
                    width : 470,
                    height : 25
                }, {
                    xtype: 'textarea',
                    id:'gzjj3',
                    fieldLabel: '故障解决',
                    labelWidth:70,
                    width : 470,
                    height : 80
                }]
            }, {
                xtype:'panel',
                frame : true,
                layout: 'column',
                baseCls: 'my-panel-no-border',
                width : 430,
                items:[{
                    xtype:'form',
                    id:'uploadForm3',
                    frame : true,
                    baseCls: 'my-panel-no-border',
                    layout: 'column',
                    width : '100%',
                    height:80,
                    defaults: {
                        style: 'margin:5px 0px 0px 5px',
                        labelAlign: 'right'
                    },
                    items:[{
                        xtype: 'filefield',
                        id: 'V_V_FILEBLOB3',
                        name: 'V_V_FILEBLOB3',
                        fieldLabel: '故障附件',
                        labelWidth: 70,
                        labelAlign: 'right',
                        inputWidth: 302,
                        style: ' margin: 5px 0px 0px -8px',
                        buttonText: '选择文件',
                        allowBlank: false
                    }, {
                        id: 'insertFilesFj3',
                        xtype: 'button',
                        text: '上传',
                        style: ' margin: 5px 0px 0px 5px',
                        handler: _upLoadFile2
                    }, {
                        xtype: 'hidden',
                        name: 'V_V_GUID2',
                        id: 'V_V_GUID2'
                    }, {
                        xtype: 'hidden',
                        name: 'V_V_FILENAME2',
                        id: 'V_V_FILENAME2'
                    }, {
                        xtype: 'hidden',
                        name: 'V_V_FILETYPECODE2',
                        id: 'V_V_FILETYPECODE2'
                    }, {
                        xtype: 'hidden',
                        name: 'V_V_PLANT2',
                        id: 'V_V_PLANT2'
                    }, {
                        xtype: 'hidden',
                        name: 'V_V_DEPT2',
                        id: 'V_V_DEPT2'
                    }, {
                        xtype: 'hidden',
                        name: 'V_V_PERSON2',
                        id: 'V_V_PERSON2'
                    }, {
                        xtype: 'hidden',
                        name: 'V_V_REMARK2',
                        id: 'V_V_REMARK2'
                    }]
                }, {
                    xtype:'panel',
                    frame : true,
                    style : 'background-color:#FF83FA',
                    layout : 'column',
                    width : 430,
                    height : 400,
                    items : [{
                        xtype:'grid',
                        id: 'filegrid3',
                        region: 'center',
                        store:fileGridStore2,
                        width : 430,
                        pageSize: 5,
                        columnLines: true,
                        autoScroll: true,
                        style: 'text-align:center',
                        columns: [
                            {text : '附件名称', dataIndex : 'V_FILENAME', align : 'center', labelAlign : 'right', width : 300},
                            {text: '操作', width : 130, align: 'center',renderer: _delRander}]
                    }]
                }]
            }],
            buttons : [{
                text : '保存',
                handler : function() {
                    Ext.getCmp('winEdit').hide();
                }
            }, {
                text : '取消',
                handler : function() {
                    Ext.getCmp('winEdit').hide();
                }
            }]
        }]
    });
});

function _ck_zyqload() {
    Ext.data.StoreManager.lookup('zyqStore').load({
        params:{
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
            V_V_DEPTCODENEXT: '%',
            V_V_DEPTTYPE: '主体作业区'
        }
    });
    Ext.data.StoreManager.lookup('zyqStore').on('load',function() {
        Ext.getCmp('zyq').select( Ext.data.StoreManager.lookup('zyqStore').getAt(0));
    });
}

function _zyq_sblx() {
    Ext.data.StoreManager.lookup('sblxStore').load({
        params: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
        }
    });
    Ext.data.StoreManager.lookup('sblxStore').on('load',function() {
        Ext.getCmp('sblx').select( '%');
    });
}

function _sblx_sbmc() {
    Ext.data.StoreManager.lookup('sbmcStore').load({
        params: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue(),
            V_V_EQUTYPECODE: Ext.getCmp('sblx').getValue()
        }
    });
    Ext.data.StoreManager.lookup('sbmcStore').on('load',function() {
        Ext.getCmp('sbmc').select( Ext.data.StoreManager.lookup('sbmcStore').getAt(0));
    });
}

function _sbmc_zsbmc() {
    Ext.data.StoreManager.lookup('zsbmcStore').load({
        params: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODE:Ext.getCmp('ck').getValue(),
            V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue(),
            V_V_EQUTYPECODE: Ext.getCmp('sblx').getValue(),
            V_V_EQUCODE:Ext.getCmp('sbmc').getValue()
        }
    });
    Ext.data.StoreManager.lookup('zsbmcStore').on('load',function() {
        Ext.getCmp('zsbmc').select( Ext.data.StoreManager.lookup('zsbmcStore').getAt(0));
    });
}

function _ck_zyqload2() {
    Ext.data.StoreManager.lookup('zyqStore2').load({
        params:{
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODE: Ext.getCmp('ck2').getValue(),
            V_V_DEPTCODENEXT: '%',
            V_V_DEPTTYPE: '主体作业区'
        }
    });
    Ext.data.StoreManager.lookup('zyqStore2').on('load',function() {
        Ext.getCmp('zyq2').select( Ext.data.StoreManager.lookup('zyqStore2').getAt(0));
    });
}

function _zyq_sblx2() {
    Ext.data.StoreManager.lookup('sblxStore2').load({
        params: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODENEXT: Ext.getCmp('zyq2').getValue()
        }
    });
    Ext.data.StoreManager.lookup('sblxStore2').on('load',function() {
        Ext.getCmp('sblx2').select( Ext.data.StoreManager.lookup('sblxStore2').getAt(0));
    });
}

function _sblx_sbmc2() {
    Ext.data.StoreManager.lookup('sbmcStore2').load({
        params: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODENEXT: Ext.getCmp('zyq2').getValue(),
            V_V_EQUTYPECODE: Ext.getCmp('sblx2').getValue()
        }
    });
    Ext.data.StoreManager.lookup('sbmcStore2').on('load',function() {
        Ext.getCmp('sbmc2').select( Ext.data.StoreManager.lookup('sbmcStore2').getAt(0));
    });
}

function _sbmc_zsbmc2() {
    Ext.data.StoreManager.lookup('zsbmcStore2').load({
        params: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODE:Ext.getCmp('ck2').getValue(),
            V_V_DEPTNEXTCODE: Ext.getCmp('zyq2').getValue(),
            V_V_EQUTYPECODE: Ext.getCmp('sblx2').getValue(),
            V_V_EQUCODE:Ext.getCmp('sbmc2').getValue()
        }
    });
    Ext.data.StoreManager.lookup('zsbmcStore2').on('load',function() {
        Ext.getCmp('zsbmc2').select( Ext.data.StoreManager.lookup('zsbmcStore2').getAt(0));
    });
}

function _ck_zyqload3() {
    Ext.data.StoreManager.lookup('zyqStore3').load({
        params:{
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODE: Ext.getCmp('ck3').getValue(),
            V_V_DEPTCODENEXT: '%',
            V_V_DEPTTYPE: '主体作业区'
        }
    });
    Ext.data.StoreManager.lookup('zyqStore3').on('load',function() {
        Ext.getCmp('zyq3').select( Ext.data.StoreManager.lookup('zyqStore3').getAt(0));
    });
}

function _zyq_sblx3() {
    Ext.data.StoreManager.lookup('sblxStore3').load({
        params: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODENEXT: Ext.getCmp('zyq3').getValue()
        }
    });
    Ext.data.StoreManager.lookup('sblxStore3').on('load',function() {
        Ext.getCmp('sblx3').select( Ext.data.StoreManager.lookup('sblxStore3').getAt(0));
    });
}

function _sblx_sbmc3() {
    Ext.data.StoreManager.lookup('sbmcStore3').load({
        params: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODENEXT: Ext.getCmp('zyq3').getValue(),
            V_V_EQUTYPECODE: Ext.getCmp('sblx3').getValue()
        }
    });
    Ext.data.StoreManager.lookup('sbmcStore3').on('load',function() {
        Ext.getCmp('sbmc3').select( Ext.data.StoreManager.lookup('sbmcStore3').getAt(0));
    });
}

function _sbmc_zsbmc3() {
    Ext.data.StoreManager.lookup('zsbmcStore3').load({
        params: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODE:Ext.getCmp('ck3').getValue(),
            V_V_DEPTNEXTCODE: Ext.getCmp('zyq3').getValue(),
            V_V_EQUTYPECODE: Ext.getCmp('sblx3').getValue(),
            V_V_EQUCODE:Ext.getCmp('sbmc3').getValue()
        }
    });
    Ext.data.StoreManager.lookup('zsbmcStore3').on('load',function() {
        Ext.getCmp('zsbmc3').select( Ext.data.StoreManager.lookup('zsbmcStore3').getAt(0));
    });
}

function OnButtonQueryClicked()
{
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        V_V_ORGCODE : Ext.getCmp('ck').getValue(),
        V_V_DEPTCODE : Ext.getCmp('zyq').getValue(),
        V_V_EQUTYPE : Ext.getCmp('sblx').getValue(),
        V_V_EQUCODE : Ext.getCmp('sbmc').getValue(),
        V_V_EQUCHILD_CODE : Ext.getCmp('zsbmc').getValue(),
        V_V_FAULT_TYPE : Ext.getCmp('gzlx').getValue(),
        V_V_FAULT_YY : Ext.getCmp('sgyy').getValue(),
        V_V_FINDTIME_B : Ext.Date.format(Ext.ComponentManager.get("startTime").getValue(), 'Y/m/d'),
        V_V_FINDTIME_E : Ext.Date.format(Ext.ComponentManager.get("endTime").getValue(), 'Y/m/d')
    };
    gridStore.load();
}

function _upLoadFile() {
    var uploadForm = Ext.getCmp('uploadForm');

    var V_V_FILEBLOB = Ext.getCmp('V_V_FILEBLOB2').getSubmitValue();
    var V_V_FILENAME = V_V_FILEBLOB.substring(0, V_V_FILEBLOB.indexOf('.'));

    Ext.getCmp('V_V_GUID').setValue(V_V_GUID);
    Ext.getCmp('V_V_FILENAME').setValue(V_V_FILENAME);
    Ext.getCmp('V_V_FILEBLOB2').setValue(V_V_FILEBLOB);
    Ext.getCmp('V_V_FILETYPECODE').setValue('SBGZ');
    Ext.getCmp('V_V_PLANT').setValue(Ext.getCmp('ck2').getSubmitValue());
    Ext.getCmp('V_V_DEPT').setValue(Ext.getCmp('zyq2').getSubmitValue());
    Ext.getCmp('V_V_PERSON').setValue(V_V_PERSONCODE);
    Ext.getCmp('V_V_REMARK').setValue(Ext.getCmp('V_V_REMARK').getSubmitValue());
    if (uploadForm.form.isValid()) {
        if (Ext.getCmp('V_V_FILEBLOB2').getValue() == '') {
            Ext.Msg.alert('错误', '请选择你要上传的文件');
            return;
        }
        Ext.MessageBox.show({
            title: '请等待',
            msg: '文件正在上传...',
            progressText: '',
            width: 300,
            progress: true,
            closable: false,
            animEl: 'loding'
        });
        uploadForm.getForm().submit({
            url: AppUrl + 'sxd/PRO_BASE_FILE_ADD',
            method: 'POST',
            async: false,
            waitMsg: '上传中...',
            success: function (ret) {
                Ext.Msg.alert('成功', '上传成功');
                filequery(V_V_GUID);
            },
            failure: function (resp) {
                Ext.Msg.alert('错误', '上传失败');
            }
        })
    }
}

function _upLoadFile2() {
    var uploadForm = Ext.getCmp('uploadForm3');
    var V_V_FILEBLOB = Ext.getCmp('V_V_FILEBLOB3').getSubmitValue();
    var V_V_FILENAME = V_V_FILEBLOB.substring(0, V_V_FILEBLOB.indexOf('.'));
    Ext.getCmp('V_V_GUID2').setValue(V_V_GUID);
    Ext.getCmp('V_V_FILENAME2').setValue(V_V_FILENAME);
    Ext.getCmp('V_V_FILEBLOB3').setValue(V_V_FILEBLOB);
    Ext.getCmp('V_V_FILETYPECODE2').setValue('SBGZ');
    Ext.getCmp('V_V_PLANT2').setValue(Ext.getCmp('ck3').getSubmitValue());
    Ext.getCmp('V_V_DEPT2').setValue(Ext.getCmp('zyq3').getSubmitValue());
    Ext.getCmp('V_V_PERSON2').setValue(V_V_PERSONCODE);
    Ext.getCmp('V_V_REMARK2').setValue(Ext.getCmp('V_V_REMARK2').getSubmitValue());
    if (uploadForm.form.isValid()) {
        if (Ext.getCmp('V_V_FILEBLOB3').getValue() == '') {
            Ext.Msg.alert('错误', '请选择你要上传的文件');
            return;
        }
        Ext.MessageBox.show({
            title: '请等待',
            msg: '文件正在上传...',
            progressText: '',
            width: 300,
            progress: true,
            closable: false,
            animEl: 'loding'
        });
        uploadForm.getForm().submit({
            url: AppUrl + 'sxd/PRO_BASE_FILE_ADD',
            method: 'POST',
            async: false,
            waitMsg: '上传中...',
            success: function (ret) {
                Ext.Msg.alert('成功', '上传成功');
                filequery2(V_V_GUID);
            },
            failure: function (resp) {
                Ext.Msg.alert('错误', '上传失败');
            }
        })
    }
}

function editClick(){
    var records = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    Ext.getCmp('winEdit').show();
    Ext.data.StoreManager.lookup('zyqStore3').load({
        params: {
            V_V_PERSONCODE: V_V_PERSONCODE,
            V_V_DEPTCODE: records[0].get('V_ORGCODE'),
            V_V_DEPTCODENEXT: "%",
            V_V_DEPTTYPE: '[主体作业区]'
        }
    });

    Ext.data.StoreManager.lookup('sblxStore3').load({
        params: {
            V_V_PERSONCODE: V_V_PERSONCODE,
            V_V_DEPTCODENEXT: records[0].get('V_DEPTCODE')
        }
    });

    Ext.data.StoreManager.lookup('sbmcStore3').load({
        params: {
            V_V_PERSONCODE: V_V_PERSONCODE,
            V_V_DEPTCODENEXT: records[0].get('V_DEPTCODE'),
            V_V_EQUTYPECODE: records[0].get('V_EQUTYPECODE')
        }
    });

    Ext.data.StoreManager.lookup('zsbmcStore3').load({
        params: {
            V_V_PERSONCODE: V_V_PERSONCODE,
            V_V_DEPTCODE: records[0].get('V_ORGCODE'),
            V_V_DEPTNEXTCODE: records[0].get('V_DEPTCODE'),
            V_V_EQUTYPECODE: records[0].get('V_EQUTYPECODE'),
            V_V_EQUCODE: records[0].get('V_EQUCODE')
        }
    });

    Ext.data.StoreManager.lookup('gzlxStore3').load({
        params: {
            V_V_PERSONCODE: V_V_PERSONCODE,
            V_V_DEPTCODE: records[0].get('V_ORGCODE'),
            V_V_DEPTNEXTCODE: records[0].get('V_DEPTCODE'),
            V_V_EQUTYPECODE: records[0].get('V_EQUTYPECODE'),
            V_V_EQUCODE: records[0].get('V_EQUCODE')
        }
    });
    Ext.getCmp('ck3').setValue(records[0].get('V_ORGCODE'));
    Ext.getCmp('zyq3').setValue(records[0].get('V_DEPTCODE'));
    Ext.getCmp('sblx3').setValue(records[0].get('V_EQUTYPECODE'));
    Ext.getCmp('sbmc3').setValue(records[0].get('V_EQUCODE'));
    Ext.getCmp('zsbmc3').setValue(records[0].get('V_EQUCHILD_CODE'));
    Ext.getCmp('gzlx3').setValue(records[0].get('V_TYPECODE'));
    Ext.getCmp('startTime3').setValue(records[0].get('V_FINDTIME'));
    Ext.getCmp('gzyy3').setValue(records[0].data.V_FAULT_YY);
    Ext.getCmp('gzxx3').setValue(records[0].data.V_FAULT_XX);
    Ext.getCmp('gzdj3').setValue(records[0].data.V_FAULT_LEVEL);
    Ext.getCmp('gzjj3').setValue(records[0].data.V_JJBF);
    //filequery2(records[0].get('V_GUID'));
}

function filequery(guid) {
    Ext.data.StoreManager.lookup('fileGridStore').load({
        params: {
            V_V_GUID: guid
        }
    });
}

function filequery2(guid) {
    Ext.data.StoreManager.lookup('fileGridStore2').load({
        params: {
            V_V_GUID: guid
        }
    });
}

function _delRander(a, value, metaData) {
    return '<a href="javascript:onDel(\'' + metaData.data.V_FILEGUID + '\')">删除</a>';
}

function onButtonAddClicked(){
    Ext.getCmp('winAdd').show();
    V_V_GUID = Ext.data.IdGenerator.get('uuid').generate();
    Ext.getCmp('ck2').select( Ext.data.StoreManager.lookup('ckStore2').getAt(0));
    Ext.data.StoreManager.lookup('zyqStore2').load({
        params:{
            'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
            'V_V_DEPTCODE': Ext.getCmp('ck2').getValue(),
            'V_V_DEPTCODENEXT': '%',
            'V_V_DEPTTYPE': '主体作业区'
        }
    });

    Ext.data.StoreManager.lookup('zyqStore2').on('load',function() {
        Ext.getCmp('zyq2').select( Ext.data.StoreManager.lookup('zyqStore2').getAt(0));
        Ext.data.StoreManager.lookup('sblxStore2').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp('zyq2').getValue()
            }
        });
    });

    Ext.data.StoreManager.lookup('sblxStore2').on('load',function() {
        Ext.getCmp('sblx2').select( Ext.data.StoreManager.lookup('sblxStore2').getAt(0));
        Ext.data.StoreManager.lookup('sbmcStore2').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp('zyq2').getValue(),
                V_V_EQUTYPECODE: Ext.getCmp('sblx2').getValue()
            }
        });
    });

    Ext.data.StoreManager.lookup('sbmcStore2').on('load',function() {
        Ext.getCmp('sbmc2').select( Ext.data.StoreManager.lookup('sbmcStore2').getAt(0));
        Ext.data.StoreManager.lookup('zsbmcStore2').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE:Ext.getCmp('ck2').getValue(),
                V_V_DEPTNEXTCODE: Ext.getCmp('zyq2').getValue(),
                V_V_EQUTYPECODE: Ext.getCmp('sblx2').getValue(),
                V_V_EQUCODE:Ext.getCmp('sbmc2').getValue()
            }
        });
    });

    Ext.data.StoreManager.lookup('zsbmcStore2').on('load',function() {
        Ext.getCmp('zsbmc2').store.insert(0, {
            'V_EQUCODE': '%',
            'V_EQUNAME': '-全部-'
        });
        Ext.getCmp('zsbmc2').select( Ext.data.StoreManager.lookup('zsbmcStore2').getAt(0));
        Ext.data.StoreManager.lookup('gzlxStore2').load({
            params: {
            }
        });
    });

    Ext.data.StoreManager.lookup('gzlxStore2').on('load',function() {
        Ext.getCmp('gzlx2').store.insert(0, {
            'V_TYPECODE': '%',
            'V_TYPENAME': '-全部-'
        });
        Ext.getCmp('gzlx2').select( Ext.data.StoreManager.lookup('gzlxStore2').getAt(0));
    });
}

function onDel(fileguid) {
    Ext.Ajax.request({
        url: AppUrl + 'sxd/PRO_BASE_FILE_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_FILEGUID: fileguid
        },
        success: function (response) {
            var data = Ext.JSON.decode(response.responseText);

            if (data.RET == 'SUCCESS') {
                Ext.Msg.alert('成功', '删除附件成功');
                filequery(V_V_GUID);
                filequery2(V_V_GUID);
            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: data.message,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        },
        failure: function (resp) {
            Ext.Msg.alert('提示信息', '删除失败');
        }
    });
}