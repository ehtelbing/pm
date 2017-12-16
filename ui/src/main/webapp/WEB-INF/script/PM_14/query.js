//厂矿
var ckstore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'ckstore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: APP + '/ModelSelect',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            parName: ['V_V_PERSONCODE', 'V_V_DEPTCODE',
                'V_V_DEPTCODENEXT', 'V_V_DEPTTYPE'],
            parType: ['s', 's', 's', 's'],
            parVal: [Ext.util.Cookies.get('v_personcode'),
                Ext.util.Cookies.get('v_orgCode'),
                Ext.util.Cookies.get('v_deptcode'), '[基层单位]'],
            proName: 'PRO_BASE_DEPT_VIEW_ROLE',
            cursorName: 'V_CURSOR'
        }
    }
});
//作业区
var zyqstore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'zyqstore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: APP + '/ModelSelect',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
//设备类型
var ssbtype = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'sbtype',
    fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: APP + '/ModelSelect',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
//设备名称
var ssbname = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'sbtype',
    fields: ['V_EQUCODE', 'V_EQUNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: APP + '/ModelSelect',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
//子设备名称
var subequNameStore = Ext.create('Ext.data.Store', {
    id: 'subequNameStore',
    autoLoad: false,
    fields: ['V_EQUCODE', 'V_EQUNAME'],
    proxy: {
        type: 'ajax',
        url: APP + '/ModelSelect',
        actionMethods: {
            read: 'POST'
        },
        async: false,
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
//故障类型
var gztypestore = Ext.create('Ext.data.Store', {
    id: 'gztypestore',
    autoLoad: true,
    fields: ['V_TYPECODE', 'V_TYPENAME'],
    proxy: {
        type: 'ajax',
        url: APP + '/ModelSelect',
        actionMethods: {
            read: 'POST'
        },
        async: false,
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            parName: [],
            parType: [],
            parVal: [],
            proName: 'PM_14_FAULT_TYPE_ITEM_SEL',
            cursorName: 'V_CURSOR'
        }
    }
});
//查询gridStore
var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    fields: ['V_EQUTYPENAME', 'V_EQUNAME', 'V_EQUCHILD_NAME', 'V_TYPENAME', 'V_FAULT_YY', 'V_BZ', 'V_GUID', 'V_FAULT_XX',
        'V_ORGCODE', 'V_DEPTCODE', 'V_EQUTYPECODE', 'V_EQUCODE', 'V_EQUCHILD_CODE', 'V_TYPECODE', 'V_FAULT_YY', 'V_FAULT_XX',
        'V_FAULT_LEVEL', 'V_JJBF', 'V_PER_CLASS', 'V_JJ', 'V_PART', 'V_MATERIAL', 'V_TIME', 'V_FILE_GUID', 'V_WL', 'V_PER_CLASSNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: APP + '/ModelSelect',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
//布局
var Layout = {
    layout: 'border',
    items: [
        {
            xtype: 'panel',
            border: false,
            region: 'north',
            layout: 'vbox',
            frame: true,
            baseCls: 'my-panel-no-border',
            items: [
                   {xtype: 'panel',
                    layout: 'column',
                    frame: true,
                    baseCls: 'my-panel-no-border',
                    margin: '10px 0 5px 10px',
                    defaults: {
                        margin: ' 5px 0 5px 10px',
                        labelAlign: 'right'
                    },
                    items: [{
                        id: 'ck',
                        xtype: 'combo',
                        store: ckstore,
                        editable: false,
                        fieldLabel: '厂矿',
                        labelWidth: 65,
                        displayField: 'V_DEPTNAME',
                        valueField: 'V_DEPTCODE',
                        queryMode: 'local',
                        style: 'margin:5px 0px 5px 5px',
                        labelAlign: 'right'
                    }, {
                        id: 'zyq',
                        xtype: 'combo',
                        store: zyqstore,
                        editable: false,
                        fieldLabel: '作业区',
                        labelWidth: 65,
                        displayField: 'V_DEPTNAME',
                        valueField: 'V_DEPTCODE',
                        queryMode: 'local',
                        style: 'margin:5px 0px 5px 5px',
                        labelAlign: 'right'
                    }, {
                        id: 'sbtype',
                        xtype: 'combo',
                        store: ssbtype,
                        fieldLabel: '设备类型',
                        editable: false,
                        labelWidth: 65,
                        displayField: 'V_EQUTYPENAME',
                        valueField: 'V_EQUTYPECODE',
                        queryMode: 'local',
                        baseCls: 'margin-bottom'
                    }, {
                        id: 'sbname',
                        xtype: 'combo',
                        store: ssbname,
                        editable: false,
                        fieldLabel: '设备名称',
                        labelWidth: 65,
                        displayField: 'V_EQUNAME',
                        valueField: 'V_EQUCODE',
                        queryMode: 'local',
                        baseCls: 'margin-bottom'
                    }, {
                        xtype: 'combo',
                        id: 'subequname',
                        store: subequNameStore,
                        queryMode: 'local',
                        valueField: 'V_EQUCODE',
                        displayField: 'V_EQUNAME',
                        labelWidth: 90,
                        forceSelection: true,
                        fieldLabel: '子设备名称',
                        labelAlign: 'right',
                        editable: false
                    }]
                }, {
                    xtype: 'panel',
                    layout: 'column',
                    frame: true,
                    margin: '10px 0 5px 10px',
                    baseCls: 'my-panel-no-border',
                    defaults: {
                        margin: ' 5px 0 5px 10px',
                        labelAlign: 'right'
                    },
                    items: [{
                        xtype: 'combo',
                        id: 'gztype',
                        store: gztypestore,
                        queryMode: 'local',
                        valueField: 'V_TYPECODE',
                        displayField: 'V_TYPENAME',
                        labelWidth: 65,
                        fieldLabel: '故障类型',
                        labelAlign: 'right',
                        editable: false
                    }, {
                        xtype: 'datefield',
                        id: 'fxsj',
                        editable: false,
                        format: 'Y-m-d',
                        value: new Date(),
                        labelWidth: 65,
                        fieldLabel: '发现时间',
                        labelAlign: 'right'
                    },
                    {xtype: 'textfield', id: 'gzyy', fieldLabel: '故障原因', labelWidth: 65},
                    {xtype: 'button', text: '查询', handler: queryGrid, icon: imgpath + '/search.png'}
                    ]
                }
            ]
        },
        {xtype: 'gridpanel', region: 'center', columnLines: true, id: 'grid', store: 'gridStore', selType: 'checkboxmodel',
            columns: [
                {xtype: 'rownumberer', text: '序号', width: 60, align: 'center'},
                {text: '设备类型', align: 'center', width: 150, dataIndex: 'V_EQUTYPENAME'},
                {text: '设备名称', align: 'center', width: 150, dataIndex: 'V_EQUNAME'},
                {text: '部件', align: 'center', width: 150, dataIndex: 'V_EQUCHILD_NAME'},
                {text: '故障类型', align: 'center', width: 150, dataIndex: 'V_TYPENAME'},
                {text: '故障原因', align: 'center', width: 150, dataIndex: 'V_FAULT_YY'},
                {text: '故障现象', align: 'center', width: 150, dataIndex: 'V_FAULT_XX'},
                {text: '故障等级', align: 'center', width: 150, dataIndex: 'V_FAULT_LEVEL'},
                {text: '解决方法', align: 'center', width: 150, dataIndex: 'V_JJBF'},
                {text: '人员配置', align: 'center', width: 150, dataIndex: 'V_PER_CLASS', hidden: true},
                {text: '吊装器具、工具', align: 'center', width: 150, dataIndex: 'V_JJ', hidden: true},
                {text: '物料', align: 'center', width: 150, dataIndex: 'V_WL', hidden: true},
                {text: '备件', align: 'center', width: 150, dataIndex: 'V_PART', hidden: true},
                {text: '材料', align: 'center', width: 150, dataIndex: 'V_MATERIAL', hidden: true},
                {text: '工时', align: 'center', width: 150, dataIndex: 'V_TIME', hidden: true},
                {text: '附件', align: 'center', width: 150, dataIndex: 'V_FILE_GUID', hidden: true}
            ]
        }
    ]
};

function onPageLoaded() {
    Ext.create('Ext.container.Viewport', Layout);

    ckstore.on("load", function () {
        Ext.getCmp("ck").select(ckstore.getAt(0));
    });

    zyqstore.on("load", function () {
        Ext.getCmp("zyq").select(zyqstore.getAt(0));
    });

    ssbtype.on("load", function () {
        Ext.getCmp("sbtype").select(ssbtype.getAt(0));
    });

    ssbname.on("load", function () {
        ssbname.insert(0, {V_EQUNAME: '全部', V_EQUCODE: '%'});
        Ext.getCmp("sbname").select(ssbname.getAt(0));
    });

    gztypestore.on("load", function () {
        Ext.getCmp("gztype").select(gztypestore.getAt(0));
    });

    subequNameStore.on("load", function () {
        subequNameStore.insert(0, {V_EQUCODE: '%', V_EQUNAME: '全部'});
        Ext.getCmp("subequname").select(subequNameStore.getAt(0));
    });

    Ext.ComponentManager.get("ck").on("change", function () {
        Ext.ComponentManager.get('zyq').getStore().removeAll();
        zyqstore.load({
            params: {
                parName: ['V_V_PERSONCODE', 'V_V_DEPTCODE',
                    'V_V_DEPTCODENEXT', 'V_V_DEPTTYPE'],
                parType: ['s', 's', 's', 's'],
                parVal: [Ext.util.Cookies.get('v_personcode'),
                    Ext.getCmp("ck").getValue(),
                    Ext.util.Cookies.get('v_deptcode'), '[主体作业区]'],
                proName: 'PRO_BASE_DEPT_VIEW_ROLE',
                cursorName: 'V_CURSOR'
            }
        });
    });

    Ext.ComponentManager.get("zyq").on("change", function () {
        Ext.ComponentManager.get('sbtype').getStore().removeAll();
        ssbtype.load({
            params: {

                parName: ['V_V_PERSONCODE', 'V_V_DEPTCODENEXT'],
                parType: ['s', 's'],
                parVal: [Ext.util.Cookies.get('v_personcode'),
                    Ext.getCmp("zyq").getValue()],
                proName: 'PRO_GET_DEPTEQUTYPE_PER',
                cursorName: 'V_CURSOR'
            }
        });
    });

    Ext.ComponentManager.get("sbtype").on("change", function () {
        ssbname.load({
            params: {
                parName: ['V_V_PERSONCODE', 'V_V_DEPTCODENEXT',
                    'V_V_EQUTYPECODE'],
                parType: ['s', 's', 's'],
                parVal: [Ext.util.Cookies.get('v_personcode'),
                    Ext.getCmp("zyq").getValue(),
                    Ext.getCmp("sbtype").getValue()],
                proName: 'PRO_GET_DEPTEQU_PER',
                cursorName: 'V_CURSOR'
            }
        });
    });

    Ext.ComponentManager.get("sbname").on("change", function () {
        subequNameStore.load({
            params: {
                parName: ['V_V_PERSONCODE', 'V_V_DEPTCODE', 'V_V_DEPTCODENEXT',
                    'V_V_EQUTYPECODE', 'V_V_EQUCODE'],
                parType: ['s', 's', 's', 's', 's'],
                parVal: [Ext.util.Cookies.get('v_personcode'),
                    Ext.getCmp("ck").getValue(),
                    Ext.getCmp("zyq").getValue(),
                    Ext.getCmp("sbtype").getValue(),
                    Ext.getCmp("sbname").getValue()],
                proName: 'PRO_SAP_EQU_VIEW',
                cursorName: 'V_CURSOR'
            }
        });
    });
}
//查询
function queryGrid() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            parName: ['V_V_ORGCODE', 'V_V_DEPTCODE', 'V_V_EQUTYPE',
                'V_V_EQUCODE', 'V_V_EQUCHILD_CODE', 'V_V_FAULT_TYPE', 'V_V_FAULT_YY'],
            parType: ['s', 's', 's', 's', 's', 's', 's'],
            parVal: [Ext.getCmp("ck").getValue(),
                Ext.getCmp("zyq").getValue(),
                Ext.getCmp("sbtype").getValue(),
                Ext.getCmp("sbname").getValue(),
                Ext.getCmp("subequname").getValue(),
                Ext.getCmp("gztype").getValue(),
                Ext.getCmp("gzyy").getValue()],
            proName: 'PM_14_FAULT_ITEM_DATA_SELALL',
            cursorName: 'V_CURSOR'
        }
    });
}

Ext.onReady(onPageLoaded);

