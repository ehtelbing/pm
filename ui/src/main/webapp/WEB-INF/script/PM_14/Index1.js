var flag = "";

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

var zyqstore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'zyqstore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: APP + '/ModelSelect',
        // url: 'PRO_BASE_DEPT_VIEW_ROLE',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }

    }
});

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

var subequNameStore = Ext.create('Ext.data.Store', {
    id: 'subequNameStore',
    autoLoad: false,
    fields: ['V_EQUCODE', 'V_EQUNAME'],
    proxy: {
        type: 'ajax',
        url: APP + '/ModelSelect',
        //url: AppUrl + 'basic/PRO_SAP_EQU_VIEW',
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

var gztypestore = Ext.create('Ext.data.Store', {
    id: 'gztypestore',
    autoLoad: true,
    fields: ['V_TYPECODE', 'V_TYPENAME'],
    proxy: {
        type: 'ajax',
        url: APP + '/ModelSelect',
        //url: AppUrl + 'basic/PRO_SAP_EQU_VIEW',
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


var winckstore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'winckstore',
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

var winzyqstore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'winzyqstore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: APP + '/ModelSelect',
        // url: 'PRO_BASE_DEPT_VIEW_ROLE',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }

    }
});

var winssbtype = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'winssbtype',
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

var winssbname = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'winssbname',
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

var winsubequNameStore = Ext.create('Ext.data.Store', {
    id: 'winsubequNameStore',
    autoLoad: false,
    fields: ['V_EQUCODE', 'V_EQUNAME'],
    proxy: {
        type: 'ajax',
        url: APP + '/ModelSelect',
        //url: AppUrl + 'basic/PRO_SAP_EQU_VIEW',
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

var wingztypestore = Ext.create('Ext.data.Store', {
    id: 'wingztypestore',
    autoLoad: true,
    fields: ['V_TYPECODE', 'V_TYPENAME'],
    proxy: {
        type: 'ajax',
        url: APP + '/ModelSelect',
        //url: AppUrl + 'basic/PRO_SAP_EQU_VIEW',
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

var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    fields: ['V_EQUTYPENAME', 'V_EQUNAME', 'V_EQUCHILD_NAME','V_TYPENAME','V_FAULT_YY','V_BZ','V_GUID',
        'V_ORGCODE','V_DEPTCODE','V_EQUTYPECODE','V_EQUCODE','V_EQUCHILD_CODE','V_TYPECODE','V_FAULT_YY','V_BZ' ],
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

var wjgridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'wjgridStore',
    pageSize: 20,
    fields: ['I_ID',
        'V_SG_GUID',
        'V_FILE_GUID',
        'V_FILE_NAME',
        'V_FILE_TYPE',
        'V_PERCODE',
        'V_DATE_IN'
    ],
    //data : testdata,
    //proxy : {
    //    type : 'memory',
    //    render : {
    //        type : 'json'
    //    }
    //}
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'sg/SG_INF_FILE_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});


var formpanel = Ext.create('Ext.form.Panel', {
    frame: true,
    id: 'formpanel',
    region: 'north',
    layout: 'column',
    fileUpload: true,
    baseCls: 'my-panel-no-border',
    enctype: "multipart/form-data",
    items: [{
        xtype: 'filefield',
        id: 'upload',
        name: 'upload',
        enctype: "multipart/form-data",
        fieldLabel: '故障附件',
        buttonText: '选择文件',
        labelAlign: 'right',
        labelWidth: 100,
        width: 450,
        margin: '10px 0 0 35px'
    }, {
        xtype: 'button',
        text: '上传',
        width: 60,
        handler: uploadfile,
        margin: '10px 0 0 10px'
    },
        {xtype: 'hidden', name: 'V_V_GUID', id: 'V_V_GUID'},
        {xtype: 'hidden', name: 'V_V_FILEGUID', id: 'V_V_FILEGUID'},
        {xtype: 'hidden', name: 'V_V_FILETYPE', id: 'V_V_FILETYPE'},
        {xtype: 'hidden', name: 'V_V_FILEPER', id: 'V_V_FILEPER'},
        {xtype: 'hidden', name: 'V_V_FILETIME', id: 'V_V_FILETIME'},
        {xtype: 'hidden', name: 'V_V_FILENAME', id: 'V_V_FILENAME'}
    ]
});

var fjgrid = Ext.create("Ext.grid.Panel", {
    xtype: 'gridpanel',
    id: 'fjgrid',
    region: 'center',
    height: 100,
    width: 415,
    columnLines: true,
    store: wjgridStore,
    autoScroll: true,
    margin: '10px 0 0 140px',
    colspan: 3,
    columns: [{
        text: '附件名称',
        flex: 0.7,
        align: 'center',
        dataIndex: "V_FILE_NAME",
        renderer: downloadRander
    }, {
        text: '操作',
        flex: 0.3,
        align: 'center',
        renderer: delRander
    }]
});

var addwindow = Ext.create('Ext.window.Window', {
    id: 'addwindow',
    width: 650,
    height: 350,
    layout: 'vbox',
    title: '设备故障录入',
    modal: true,
    frame: true,
    closeAction: 'hide',
    closable: true,
    items: [{
        xtype: 'panel',
        layout: 'column',
        frame: true,
        margin: '10px 0 5px 10px',
        baseCls: 'my-panel-no-border',
        defaults: {
            margin: '10px 0 0 35px',
            labelAlign: 'right'
        },
        items: [{
            id: 'winck',
            xtype: 'combo',
            store: winckstore,
            editable: false,
            fieldLabel: '厂矿',
            labelWidth: 90,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            labelAlign: 'right'
        }, {
            id: 'winzyq',
            xtype: 'combo',
            store: winzyqstore,
            editable: false,
            fieldLabel: '作业区',
            labelWidth: 90,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            margin: '10px 0 0 25px',
            labelAlign: 'right'
        }]
    }, {
        xtype: 'panel',
        layout: 'column',
        frame: true,
        margin: '10px 0 5px 10px',
        baseCls: 'my-panel-no-border',
        defaults: {
            margin: '10px 0 0 35px',
            labelAlign: 'right'
        },
        items: [{
            id: 'winsbtype',
            xtype: 'combo',
            store: winssbtype,
            fieldLabel: '设备类型',
            editable: false,
            labelWidth: 90,
            displayField: 'V_EQUTYPENAME',
            valueField: 'V_EQUTYPECODE',
            queryMode: 'local',
            baseCls: 'margin-bottom'
        }, {
            id: 'winsbname',
            xtype: 'combo',
            store: winssbname,
            editable: false,
            fieldLabel: '设备名称',
            labelWidth: 90,
            displayField: 'V_EQUNAME',
            valueField: 'V_EQUCODE',
            queryMode: 'local',
            margin: '10px 0 0 25px',
            baseCls: 'margin-bottom'
        }]
    }, {
        xtype: 'panel',
        layout: 'column',
        frame: true,
        margin: '5px 0 5px 10px',
        baseCls: 'my-panel-no-border',
        defaults: {
            margin: '10px 0 0 35px',
            labelAlign: 'right'
        },
        items: [
            {
                xtype: 'combo',
                id: 'winsubequname',
                store: winsubequNameStore,
                queryMode: 'local',
                valueField: 'V_EQUCODE',
                displayField: 'V_EQUNAME',
                labelWidth: 90,
                forceSelection: true,
                fieldLabel: '子设备名称',
                labelAlign: 'right',
                editable: false
            }, {
                xtype: 'combo',
                id: 'wingztype',
                store: wingztypestore,
                queryMode: 'local',
                valueField: 'V_TYPECODE',
                displayField: 'V_TYPENAME',
                labelWidth: 90,
                margin: '10px 0 0 25px',
                fieldLabel: '故障类型',
                labelAlign: 'right',
                editable: false
            }
        ]
    }, {
        xtype: 'textfield',
        id: 'wingzyy',
        fieldLabel: '故障原因',
        margin: '20px 0 0 35px',
        width: 520,
        labelAlign: 'right'
    },{
        xtype: 'textfield',
        id: 'winbz',
        fieldLabel: '备注',
        margin: '20px 0 0 35px',
        width: 520,
        labelAlign: 'right'
    }],
    buttons: [{
        xtype: 'button',
        text: '保存',
        width: '80',
        handler: onBtnSubmit
    }, {
        xtype: 'button',
        text: '返回',
        width: '80',
        handler: onBtnCancel
    }]
});

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
                {
                    xtype: 'panel',
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
                    }, {xtype: 'textfield', fieldLabel: '故障原因', labelWidth: 65, id: 'gzyy'},
                        {xtype: 'button', text: '查询', handler: queryGrid, icon: imgpath + '/search.png'},
                        {xtype: 'button', text: '添加', handler: addbtn, icon: imgpath + '/add.png'},
                        {xtype: 'button', text: '修改', handler: editbtn, icon: imgpath + '/edit.png'},
                        {xtype: 'button', text: '删除', handler: delbtn, icon: imgpath + '/delete.png'}
                    ]
                }
            ]
        },
        {
            xtype: 'gridpanel', region: 'center', columnLines: true, id: 'grid', store: 'gridStore',
            selType: 'checkboxmodel',
            columns: [
                {
                    xtype: 'rownumberer', text: '序号', width: 60, align: 'center'
                },
                {
                    text: '设备类型', align: 'center', width: 150, dataIndex: 'V_EQUTYPENAME'
                },
                {
                    text: '设备名称', align: 'center', width: 150, dataIndex: 'V_EQUNAME'
                },
                {
                    text: '子设备名称', align: 'center', width: 150, dataIndex: 'V_EQUCHILD_NAME'
                },
                {
                    text: '故障类型', align: 'center', width: 150, dataIndex: 'V_TYPENAME'
                },
                {
                    text: '故障原因', align: 'center', width: 150, dataIndex: 'V_FAULT_YY'
                },
                {
                    text: '备注', align: 'center', width: 150, dataIndex: 'V_BZ'
                }
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
        Ext.getCmp("sbname").select(ssbname.getAt(0));
    });

    gztypestore.on("load", function () {
        Ext.getCmp("gztype").select(gztypestore.getAt(0));
    });

    subequNameStore.on("load", function () {
        subequNameStore.insert(0, {V_EQUCODE: '%', V_EQUNAME: '全部'});
        Ext.getCmp("subequname").select(subequNameStore.getAt(0));
    });


    winckstore.on("load", function () {
        Ext.getCmp("winck").select(winckstore.getAt(0));
    });

    winzyqstore.on("load", function () {
        Ext.getCmp("winzyq").select(winzyqstore.getAt(0));
    });

    winssbtype.on("load", function () {
        Ext.getCmp("winsbtype").select(winssbtype.getAt(0));
    });

    winssbname.on("load", function () {
        Ext.getCmp("winsbname").select(winssbname.getAt(0));
    });

    wingztypestore.on("load", function () {
        Ext.getCmp("wingztype").select(wingztypestore.getAt(0));
    });

    winsubequNameStore.on("load", function () {
        Ext.getCmp("winsubequname").select(winsubequNameStore.getAt(0));
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
                proName: 'PRO_GET_DEPTEQU_PER_DROP',
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


    Ext.ComponentManager.get("winck").on("change", function () {
        winzyqstore.load({
            params: {
                parName: ['V_V_PERSONCODE', 'V_V_DEPTCODE',
                    'V_V_DEPTCODENEXT', 'V_V_DEPTTYPE'],
                parType: ['s', 's', 's', 's'],
                parVal: [Ext.util.Cookies.get('v_personcode'),
                    Ext.getCmp("winck").getValue(),
                    Ext.util.Cookies.get('v_deptcode'), '[主体作业区]'],
                proName: 'PRO_BASE_DEPT_VIEW_ROLE',
                cursorName: 'V_CURSOR'
            }
        });
    });

    Ext.ComponentManager.get("winzyq").on("change", function () {
        winssbtype.load({
            params: {

                parName: ['V_V_PERSONCODE', 'V_V_DEPTCODENEXT'],
                parType: ['s', 's'],
                parVal: [Ext.util.Cookies.get('v_personcode'),
                    Ext.getCmp("winzyq").getValue()],
                proName: 'PRO_GET_DEPTEQUTYPE_PER',
                cursorName: 'V_CURSOR'
            }
        });
    });

    Ext.ComponentManager.get("winsbtype").on("change", function () {
        winssbname.load({
            params: {
                parName: ['V_V_PERSONCODE', 'V_V_DEPTCODENEXT',
                    'V_V_EQUTYPECODE'],
                parType: ['s', 's', 's'],
                parVal: [Ext.util.Cookies.get('v_personcode'),
                    Ext.getCmp("winzyq").getValue(),
                    Ext.getCmp("winsbtype").getValue()],
                proName: 'PRO_GET_DEPTEQU_PER',
                cursorName: 'V_CURSOR'
            }
        });
    });

    Ext.ComponentManager.get("winsbname").on("change", function () {
        winsubequNameStore.load({
            params: {
                parName: ['V_V_PERSONCODE', 'V_V_DEPTCODE', 'V_V_DEPTCODENEXT',
                    'V_V_EQUTYPECODE', 'V_V_EQUCODE'],
                parType: ['s', 's', 's', 's', 's'],
                parVal: [Ext.util.Cookies.get('v_personcode'),
                    Ext.getCmp("winck").getValue(),
                    Ext.getCmp("winzyq").getValue(),
                    Ext.getCmp("winsbtype").getValue(),
                    Ext.getCmp("winsbname").getValue()],
                proName: 'PRO_SAP_EQU_VIEW',
                cursorName: 'V_CURSOR'
            }
        });
    });
}

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
            proName: 'PM_14_FAULT_ITEM_SEL',
            cursorName: 'V_CURSOR'
        }
    });
}

function addbtn() {
    flag = 1;
    Ext.getCmp('wingzyy').setValue('');
    Ext.getCmp('winbz').setValue('');
    Ext.getCmp('addwindow').show();
}

function editbtn() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length != 1) {
        alert('请选择一条数据进行修改！');
        return false;
    }
    flag = 0;
    Ext.getCmp('winck').setValue(seldata[0].data.V_ORGCODE);
    Ext.getCmp('winzyq').setValue(seldata[0].data.V_DEPTCODE);
    Ext.getCmp('winsbtype').setValue(seldata[0].data.V_EQUTYPECODE);
    Ext.getCmp('winsbname').setValue(seldata[0].data.V_EQUCODE);
    Ext.getCmp('winsubequname').setValue(seldata[0].data.V_EQUCHILD_CODE);
    Ext.getCmp('wingztype').setValue(seldata[0].data.V_TYPECODE);
    Ext.getCmp('wingzyy').setValue(seldata[0].data.V_FAULT_YY);
    Ext.getCmp('winbz').setValue(seldata[0].data.V_BZ);

    Ext.getCmp('addwindow').show();

}

function delbtn() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length == 0) {
        alert('请至少选择一条数据进行删除！');
        return false;
    }//对所选进行排查，至少选择一个
    for (var i = 0; i < seldata.length; i++) {
        Ext.Ajax.request({
            url: APP + '/ModelChange',
            params: {
                parName: ['V_V_PERCODE',
                    'V_V_IP',
                    'V_V_GUID'
                ],
                parType: ['s', 's', 's'],
                parVal: [
                    Ext.util.Cookies.get('v_personcode'),
                    Ext.fly('localIp').getValue(),
                    seldata[i].data.V_GUID
                ],
                proName: ['PM_14_FAULT_ITEM_DEL'],
                returnStr: ["V_INFO"],
                returnStrType: ["s"]
            }, success: function (resp) {
            }
        });
    }
    queryGrid();

}

Ext.onReady(onPageLoaded);

function onBtnCancel() {
    addwindow.hide();
}

function onBtnSubmit() {
    var V_V_GUID = "";
    if (flag == 1) {
        V_V_GUID = guid();
    }else{
        var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
        V_V_GUID = seldata[0].data.V_GUID;
    }

    Ext.Ajax.request({
        url: APP + '/ModelChange',
        params: {
            parName: ['V_V_GUID',
                'V_V_ORGCODE',
                'V_V_DEPTCODE',
                'V_V_EQUTYPE',
                'V_V_EQUCODE',
                'V_V_EQUCHILD_CODE',
                'V_V_FAULT_TYPE',
                'V_V_FAULT_YY',
                'V_V_BZ',
                'V_V_PERCODE',
                'V_V_IP'
            ],
            parType: ['s', 's', 's', 's', 's', 's',
                's', 's', 's', 's', 's'],
            parVal: [
                V_V_GUID,
                Ext.getCmp('winck').getValue(),
                Ext.getCmp('winzyq').getValue(),
                Ext.getCmp('winsbtype').getValue(),
                Ext.getCmp('winsbname').getValue(),
                Ext.getCmp('winsubequname').getValue(),
                Ext.getCmp('wingztype').getValue(),
                Ext.getCmp('wingzyy').getValue(),
                Ext.getCmp('winbz').getValue(),
                Ext.util.Cookies.get('v_personcode'),
                Ext.fly('localIp').getValue()
            ],
            proName: ['PM_14_FAULT_ITEM_SET'],
            returnStr: ["V_INFO"],
            returnStrType: ["s"]
        }, success: function (resp) {
            Ext.getCmp('addwindow').hide();
            queryGrid();
        }
    });
}

function delRander(a, value, metaData) {
    return '<a href="javascript:onDel(\'' + metaData.data.V_FILE_GUID + '\')">删除</a>';
}

function downloadRander(a, value, metaData) {
    return '<a href="javascript:onDownload(\'' + metaData.data.V_FILE_GUID + '\',\'' + metaData.data.V_FILE_NAME + '\')">' + a + '</a>';
}

function onDel(fileguid) {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    var guid = seldata[0].data.V_GUID;
    Ext.Ajax.request({
        url: AppUrl + 'sg/SG_INF_FILE_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_FILEGUID: fileguid
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            filequery(guid);
        }
    });
}

function onDownload(fileguid, filename) {
    var form = Ext.getCmp('formpanel');
    Ext.getCmp('V_V_FILEGUID').setValue(fileguid);
    Ext.getCmp('V_V_FILENAME').setValue(filename);
    form.submit({
        url: AppUrl + 'sg/downloadFile',
        async: false,
        //waitMsg: '上传中...',
        method: 'POST',
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
        }
    });
}

function uploadfile() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    var guid = seldata[0].data.V_GUID;
    var fileguid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        fileguid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            fileguid += "-";
    }
    var form = Ext.getCmp('formpanel');
    if (Ext.getCmp('upload').getValue() != "") {
        Ext.getCmp('V_V_GUID').setValue(guid);
        Ext.getCmp('V_V_FILEGUID').setValue(fileguid);
        Ext.getCmp('V_V_FILETYPE').setValue("整改");
        Ext.getCmp('V_V_FILEPER').setValue(Ext.util.Cookies.get('v_personcode'));
        Ext.getCmp('V_V_FILETIME').setValue(Ext.util.Format.date(today, 'Y-m-d'));
        form.submit({
            url: AppUrl + 'sg/uploadFile',
            async: false,
            waitMsg: '上传中...',
            method: 'POST',
            success: function (ret) {
                var resp = Ext.JSON.decode(ret.responseText);
                filequery(guid);
            }
            //failure: function (resp) {
            //    Ext.Msg.alert('提示信息', '上传失败');
            //}
        });
    }
}

function Creategzxzstore() {
    var arr = [];
    arr.push({
        VALUE: '机械故障',
        DISPLAY: '机械故障'
    });
    arr.push({
        VALUE: '电气故障',
        DISPLAY: '电气故障'
    });
    arr.push({
        VALUE: '其他故障',
        DISPLAY: '其他故障'
    });
    return {
        fields: ['VALUE', 'DISPLAY'],
        data: arr
    };
}

function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
