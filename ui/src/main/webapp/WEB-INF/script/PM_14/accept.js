var flag = "";
var fault_guid = "";
var file_guid = "";
var winrypzcode = ""
var winjjcode = "";
var winwlcode = "";
var addflag = "";

var ckcode = "";
var zyqcode = "";
var sblxcode = "";
var sbmccode = "";
var zsbmccode = "";
var gzlxcode = "";

var V_V_GUID = guid();
var ckstore = Ext.create("Ext.data.Store", {
    autoLoad: true,

    storeId: 'ckstore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
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

var zyqstore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'zyqstore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
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
        url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
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
        url: AppUrl + 'PM_06/pro_get_deptequ_per',
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
        url: AppUrl + 'basic/PRO_SAP_EQU_VIEW',
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
        url: AppUrl + 'PM_14/PM_14_FAULT_TYPE_ITEM_SEL',
        //url: AppUrl + 'basic/PRO_SAP_EQU_VIEW',
        actionMethods: {
            read: 'POST'
        },
        async: false,
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {}
    }
});


var winckstore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'winckstore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
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

var winzyqstore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'winzyqstore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
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
        url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
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
        url: AppUrl + 'PM_06/pro_get_deptequ_per',
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
        url: AppUrl + 'basic/PRO_SAP_EQU_VIEW',
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
        url: AppUrl + 'PM_14/PM_14_FAULT_TYPE_ITEM_SEL',
        //url: AppUrl + 'basic/PRO_SAP_EQU_VIEW',
        actionMethods: {
            read: 'POST'
        },
        async: false,
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {}
    }
});

var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    fields: ['V_EQUTYPENAME', 'V_EQUNAME', 'V_EQUCHILD_NAME', 'V_TYPENAME', 'V_FAULT_YY', 'V_BZ', 'V_GUID', 'V_FAULT_XX',
        'V_ORGCODE', 'V_DEPTCODE', 'V_EQUTYPECODE', 'V_EQUCODE', 'V_EQUCHILD_CODE', 'V_TYPECODE', 'V_FAULT_YY', 'V_FAULT_XX',
        'V_FAULT_LEVEL', 'V_JJBF', 'V_PER_CLASS', 'V_JJ', 'V_PART', 'V_MATERIAL', 'V_TIME', 'V_FILE_GUID', 'V_WL', 'V_PER_CLASSNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_14/PM_14_FAULT_ITEM_DATA_PER_SEL',
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
    fields: [
        'V_FILENAME',
        'V_FILEGUID'
    ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_14/PRO_BASE_FILE_SEL',
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
        dataIndex: "V_FILENAME",
        renderer: downloadRander
    }, {
        text: '操作',
        flex: 0.3,
        align: 'center',
        renderer: delRander
    }]
});


var feedbackwindow = Ext.create('Ext.window.Window', {
    id: 'feedbackwindow',
    width: 400,
    height: 300,
    layout: 'border',
    title: '信息反馈',
    modal: true,
    frame: true,
    closeAction: 'hide',
    closable: true,
    items: [{
        xtype: 'textarea',
        region: 'center',
        id: 'feedbackinfo',
        width: '100%',
        height: '100%'
    }],
    buttons: [{
        text: '确定',
        width: 40,
        handler: btn_save
    }, {
        text: '取消',
        width: 40,
        handler: function () {
            feedbackwindow.hide();
        }
    }]
});
var addwindow = Ext.create('Ext.window.Window', {
    id: 'addwindow',
    width: 650,
    height: 660,
    layout: 'vbox',
    title: '处理',
    modal: true,
    frame: true,
    closeAction: 'hide',
    closable: true,
    items: [{
        xtype: 'panel',
        id: 'panel1',
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
            //queryMode: 'local',
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
        id: 'panel2',
        frame: true,
        baseCls: 'my-panel-no-border',
        margin: '0px 0 5px 10px',
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
        id: 'panel3',
        frame: true,
        baseCls: 'my-panel-no-border',
        margin: '0px 0 5px 10px',
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
        margin: '10px 0 0 35px',
        width: 520,
        labelAlign: 'right'
    }, {
        xtype: 'textfield',
        id: 'wingzxx',
        fieldLabel: '故障现象',
        margin: '10px 0 0 35px',
        width: 520,
        labelAlign: 'right'
    }, {
        xtype: 'textfield',
        id: 'wingzdj',
        fieldLabel: '故障等级',
        margin: '10px 0 0 35px',
        width: 520,
        labelAlign: 'right'
    }, {
        xtype: 'textfield',
        id: 'winjjff',
        fieldLabel: '解决方法',
        margin: '10px 0 0 35px',
        width: 520,
        labelAlign: 'right'
    }, {
        xtype: 'panel',
        margin: '10px 0 0 35px',
        frame: true,
        baseCls: 'my-panel-no-border',
        layout: 'column',
        items: [{
            xtype: 'textfield',
            id: 'winrypz',
            fieldLabel: '人员配置',
            width: 480,
            readOnly: true,
            labelAlign: 'right'
        }, {
            xtype: 'button',
            margin: '0 0 0 10px',
            width: 30,
            text: '+',
            handler: selectTeam
        }]
    }, {
        xtype: 'panel',
        margin: '10px 0 0 35px',
        frame: true,
        baseCls: 'my-panel-no-border',
        layout: 'column',
        items: [{
            xtype: 'textfield',
            id: 'winjj',
            fieldLabel: '吊装器具、工具',
            width: 480,
            readOnly: true,
            labelAlign: 'right'
        }, {
            xtype: 'button',
            margin: '0 0 0 10px',
            width: 30,
            text: '+',
            handler: selectJXCAR
        }]
    }, {
        xtype: 'panel',
        margin: '10px 0 0 35px',
        frame: true,
        baseCls: 'my-panel-no-border',
        layout: 'column',
        items: [{
            xtype: 'textfield',
            id: 'winwl',
            fieldLabel: '物料',
            width: 480,
            readOnly: true,
            labelAlign: 'right'
        }, {
            xtype: 'button',
            margin: '0 0 0 10px',
            width: 30,
            text: '+',
            handler: selectMaterial
        }]
    }, {
        xtype: 'panel',
        margin: '10px 0 0 35px',
        frame: true,
        baseCls: 'my-panel-no-border',
        layout: 'column',
        hidden: true,
        items: [{
            xtype: 'textfield',
            id: 'winbz',
            fieldLabel: '备件',
            width: 480,
            readOnly: true,
            labelAlign: 'right'
        }, {
            xtype: 'button',
            margin: '0 0 0 10px',
            width: 30,
            text: '+'
        }]
    }, {
        xtype: 'panel',
        margin: '10px 0 0 35px',
        frame: true,
        baseCls: 'my-panel-no-border',
        layout: 'column',
        hidden: true,
        items: [{
            xtype: 'textfield',
            id: 'wincl',
            fieldLabel: '材料',
            width: 480,
            readOnly: true,
            labelAlign: 'right'
        }, {
            xtype: 'button',
            margin: '0 0 0 10px',
            width: 30,
            text: '+'
        }]
    }, {
        xtype: 'textfield',
        id: 'wings',
        fieldLabel: '工时',
        margin: '10px 0 0 35px',
        width: 520,
        labelAlign: 'right'
    }, formpanel, fjgrid],
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
var dealWithWindow = Ext.create('Ext.window.Window', {
    id: 'dealWithWindow',
    width: 650,
    height: 270,
    layout: 'vbox',
    title: '处理',
    modal: true,
    frame: true,
    closeAction: 'hide',
    closable: true,
    items: [
        {
            xtype: 'panel',
            margin: '10px 0 0 35px',
            frame: true,
            hidden: false,
            baseCls: 'my-panel-no-border',
            layout: 'column',
            items: [{
                xtype: 'textfield',
                id: 'dwwrypzbm',
                fieldLabel: '人员配置编码',
                width: 480,
                readOnly: true,
                labelAlign: 'right',
                hidden: true
            },
                {
                    xtype: 'textfield',
                    id: 'dwwrypz',
                    fieldLabel: '人员配置',
                    width: 480,
                    readOnly: true,
                    labelAlign: 'right'
                },
                {xtype: 'button', margin: '0 0 0 10px', width: 30, text: '+', handler: selectTeam}
            ]
        },
        {
            xtype: 'panel',
            margin: '10px 0 0 35px',
            frame: true,
            hidden: false,
            baseCls: 'my-panel-no-border',
            layout: 'column',
            items: [{
                xtype: 'textfield',
                id: 'dwwjjbm',
                fieldLabel: '吊装器具、工具编码',
                width: 480,
                readOnly: true,
                labelAlign: 'right',
                hidden: true
            },
                {
                    xtype: 'textfield',
                    id: 'dwwjj',
                    fieldLabel: '吊装器具、工具',
                    width: 480,
                    readOnly: true,
                    labelAlign: 'right'
                },
                {xtype: 'button', margin: '0 0 0 10px', width: 30, text: '+', handler: selectJXCAR}
            ]
        },
        {
            xtype: 'panel',
            margin: '10px 0 0 35px',
            frame: true,
            hidden: false,
            baseCls: 'my-panel-no-border',
            layout: 'column',
            items: [{
                xtype: 'textfield',
                id: 'dwwwlbm',
                fieldLabel: '物料编码',
                width: 480,
                readOnly: true,
                labelAlign: 'right',
                hidden: true
            },
                {xtype: 'textfield', id: 'dwwwl', fieldLabel: '物料', width: 480, readOnly: true, labelAlign: 'right'},
                {xtype: 'button', margin: '0 0 0 10px', width: 30, text: '+', handler: selectMaterial}
            ]
        },
        {
            xtype: 'textfield',
            id: 'dwwgs',
            hidden: false,
            fieldLabel: '工时',
            margin: '10px 0 0 35px',
            width: 520,
            labelAlign: 'right'
        },
        {
            xtype: 'textarea',
            id: 'dwwbz',
            fieldLabel: '备注',
            labelWidth: 100,
            width: 520,
            labelAlign: 'right',
            margin: '10px 0 0 35px',
            value: ''
        }
    ],
    buttons: [{
        xtype: 'button',
        text: '保存',
        width: '80',
        handler: dealWithWinSave
    }, {
        xtype: 'button',
        text: '返回',
        width: '80',
        handler: function () {
            Ext.getCmp('dealWithWindow').hide();
        }
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
                        {xtype: 'button', text: '处理', handler: dealWith, icon: imgpath + '/cog_edit.png', hidden: true},
                        {xtype: 'button', text: '模型添加', handler: addModel, icon: imgpath + '/add.png'},
                        {xtype: 'button', text: '信息反馈', handler: feedback, icon: imgpath + '/edit.png'},
                        {xtype: 'button', text: '生成工单', handler: workOrder, icon: imgpath + '/grid.png'}

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
                    text: '部件', align: 'center', width: 150, dataIndex: 'V_EQUCHILD_NAME'
                },
                {
                    text: '故障类型', align: 'center', width: 150, dataIndex: 'V_TYPENAME'
                },
                {
                    text: '故障原因', align: 'center', width: 150, dataIndex: 'V_FAULT_YY'
                },
                {
                    text: '故障现象', align: 'center', width: 150, dataIndex: 'V_FAULT_XX'
                },
                {
                    text: '故障等级', align: 'center', width: 150, dataIndex: 'V_FAULT_LEVEL'
                },
                {
                    text: '解决方法', align: 'center', width: 150, dataIndex: 'V_JJBF'
                },
                {
                    text: '人员配置', align: 'center', width: 150, dataIndex: 'V_PER_CLASS'
                },
                {
                    text: '吊装器具、工具', align: 'center', width: 150, dataIndex: 'V_JJ'
                },
                {
                    text: '物料', align: 'center', width: 150, dataIndex: 'V_WL'
                },
                {
                    text: '备件', align: 'center', width: 150, dataIndex: 'V_PART', hidden: true
                },
                {
                    text: '材料', align: 'center', width: 150, dataIndex: 'V_MATERIAL', hidden: true
                },
                {
                    text: '工时', align: 'center', width: 150, dataIndex: 'V_TIME'
                },
                {
                    text: '检修模型', align: 'center', width: 150, dataIndex: 'V_MATERIAL', renderer: detailRander
                },
                {
                    text: '附件', align: 'center', width: 150, dataIndex: 'V_FILE_GUID', hidden: true
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

        Ext.getCmp('winck').setValue(Ext.getCmp('ck').getValue());
        zyqstore.load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });

    Ext.ComponentManager.get("zyq").on("change", function () {
        Ext.ComponentManager.get('sbtype').getStore().removeAll();
        Ext.getCmp('winzyq').setValue(Ext.getCmp('zyq').getValue());
        ssbtype.load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
            }
        });
    });

    Ext.ComponentManager.get("sbtype").on("change", function () {
        Ext.getCmp('winsbtype').setValue(Ext.getCmp('sbtype').getValue());
        ssbname.load({
            params: {
                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                v_v_deptcodenext: Ext.getCmp('zyq').getValue(),
                v_v_equtypecode: Ext.getCmp('sbtype').getValue()
            }
        });
    });

    Ext.ComponentManager.get("sbname").on("change", function () {
        Ext.getCmp('winsbname').setValue(Ext.getCmp('sbname').getValue());
        subequNameStore.load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue(),
                V_V_EQUTYPECODE: Ext.getCmp('sbtype').getValue(),
                V_V_EQUCODE: Ext.getCmp('sbname').getValue()
            }
        });
    });


    Ext.ComponentManager.get("winck").on("change", function () {
        winzyqstore.load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('winck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });

    Ext.ComponentManager.get("winzyq").on("change", function () {
        winssbtype.load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp('winzyq').getValue()
            }
        });
    });

    Ext.ComponentManager.get("winsbtype").on("change", function () {
        winssbname.load({
            params: {
                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                v_v_deptcodenext: Ext.getCmp('winzyq').getValue(),
                v_v_equtypecode: Ext.getCmp('winsbtype').getValue()
            }
        });
    });

    Ext.ComponentManager.get("winsbname").on("change", function () {
        winsubequNameStore.load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE: Ext.getCmp('winck').getValue(),
                V_V_DEPTNEXTCODE: Ext.getCmp('winzyq').getValue(),
                V_V_EQUTYPECODE: Ext.getCmp('winsbtype').getValue(),
                V_V_EQUCODE: Ext.getCmp('winsbname').getValue()
            }
        });
    });
}

function queryGrid() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            'V_V_ORGCODE': Ext.getCmp("ck").getValue(),
            'V_V_DEPTCODE': Ext.getCmp("zyq").getValue(),
            'V_V_EQUTYPE': Ext.getCmp("sbtype").getValue(),
            'V_V_EQUCODE': Ext.getCmp("sbname").getValue(),
            'V_V_EQUCHILD_CODE': Ext.getCmp("subequname").getValue(),
            'V_V_FAULT_TYPE': Ext.getCmp("gztype").getValue(),
            'V_V_FAULT_YY': Ext.getCmp("gzyy").getValue(),
            'V_V_PERSON': Ext.util.Cookies.get('v_personcode')
        }
    });
}

function queryfjGrid() {
    Ext.data.StoreManager.lookup('wjgridStore').load({
        params: {
            parName: ['V_V_GUID', 'V_V_FILETYPECODE'],
            parType: ['s', 's'],
            parVal: [file_guid,
                'JXJS'],
            proName: 'PRO_BASE_FILE_SEL',
            cursorName: 'V_CURSOR'
        }
    });
}

function feedback() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length != 1) {
        alert("请选择一条信息进行反馈!");
        return false;
    }

    Ext.Msg.confirm("提示", "反馈工单后信息将消失，确认是否已生成模型！", function (button) {
        if (button == 'yes') {
            Ext.getCmp('feedbackwindow').show();

        }
    });
}

function addModel() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length != 1) {
        alert("请选择一条数据!");
        return false;
    }

    var guid1 = guid();
    Ext.Msg.confirm("提示", "是否要将该数据添加成模型！", function (button) {
        if (button == 'yes') {
            Ext.Ajax.request({
                url: AppUrl + 'pm_14/PM_14_FAULT_ITEM_DATA_MODEL',
                params: {
                    'V_V_EQUTYPECODE': seldata[0].data.V_EQUTYPECODE,
                    'V_V_GUID': guid1,
                    'V_V_NAME': seldata[0].data.V_EQUNAME + '模型',
                    'V_V_PROCESS': seldata[0].data.V_FAULT_XX,
                    'V_V_WORKING': seldata[0].data.V_FAULT_XX,
                    'V_V_CONTENT': seldata[0].data.V_FAULT_XX,
                    'V_V_SPARE': seldata[0].data.V_WL,
                    'V_V_VEHICLE': seldata[0].data.V_JJ,
                    'V_V_TOOL': '',
                    'V_V_HOUR': seldata[0].data.V_TIME,
                    'V_V_MEMO': seldata[0].data.V_BZ,
                    'V_V_CONTENT1': seldata[0].data.V_JJBF
                }, success: function (resp) {
                    alert("添加成功!");
                    guid1 = guid();
                }
            });
        }
    });
}

function btn_save() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    Ext.Ajax.request({
        url: AppUrl + 'PM_14/PM_14_FAULT_ITEM_DATA_FEEDBACK',
        params: {
            'V_V_PERCODE': Ext.util.Cookies.get('v_personcode'),
            'V_V_IP': Ext.fly('localIp').getValue(),
            'V_V_GUID': seldata[0].data.V_GUID,
            'V_V_FEEDBACK': Ext.getCmp('feedbackinfo').getValue()
        },
        success: function (resp) {
            Ext.getCmp('feedbackwindow').hide();
            queryGrid();
        }
    });
}

function addbtn() {
    flag = 1;
    addflag = 1;

    Ext.getCmp('panel1').removeAll();
    Ext.getCmp('panel2').removeAll();
    Ext.getCmp('panel3').removeAll();

    Ext.getCmp('panel1').add({
        id: 'winck',
        xtype: 'combo',
        store: winckstore,
        editable: false,
        fieldLabel: '厂矿',
        labelWidth: 90,
        displayField: 'V_DEPTNAME',
        valueField: 'V_DEPTCODE',
        //queryMode: 'local',
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
    });
    Ext.getCmp('panel2').add({
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
    });
    Ext.getCmp('panel3').add({
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
    });

    Ext.getCmp('winck').store.reload();
    Ext.getCmp('winzyq').store.reload();
    Ext.getCmp('winsbtype').store.reload();
    Ext.getCmp('winsbname').store.reload();
    Ext.getCmp('winsubequname').store.reload();
    Ext.getCmp('wingztype').store.reload();


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

    Ext.getCmp('wingzyy').setValue("");
    Ext.getCmp('wingzxx').setValue("");
    Ext.getCmp('wingzdj').setValue("");
    Ext.getCmp('winjjff').setValue("");
    Ext.getCmp('winrypz').setValue("");
    Ext.getCmp('winjj').setValue("");
    Ext.getCmp('winwl').setValue("");
    Ext.getCmp('wings').setValue("");
    file_guid = "";
    queryfjGrid();
    Ext.getCmp('addwindow').show();
}

function editbtn() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length != 1) {
        alert('请选择一条数据进行修改！');
        return false;
    }
    flag = 0;
    addflag = 1;
    Ext.getCmp('winck').setValue(seldata[0].data.V_ORGCODE);
    Ext.getCmp('winzyq').setValue(seldata[0].data.V_DEPTCODE);
    Ext.getCmp('winsbtype').setValue(seldata[0].data.V_EQUTYPECODE);
    Ext.getCmp('winsbname').setValue(seldata[0].data.V_EQUCODE);
    Ext.getCmp('winsubequname').setValue(seldata[0].data.V_EQUCHILD_CODE);
    Ext.getCmp('wingztype').setValue(seldata[0].data.V_TYPECODE);

    Ext.getCmp('wingzyy').setValue(seldata[0].data.V_FAULT_YY);
    Ext.getCmp('wingzxx').setValue(seldata[0].data.V_FAULT_XX);
    Ext.getCmp('wingzdj').setValue(seldata[0].data.V_FAULT_LEVEL);
    Ext.getCmp('winjjff').setValue(seldata[0].data.V_JJBF);
    Ext.getCmp('winrypz').setValue(seldata[0].data.V_PER_CLASS);
    Ext.getCmp('winjj').setValue(seldata[0].data.V_JJ);
    Ext.getCmp('winwl').setValue(seldata[0].data.V_WL);
    Ext.getCmp('wings').setValue(seldata[0].data.V_TIME);
    file_guid = seldata[0].data.V_FILE_GUID;

    V_V_GUID = seldata[0].data.V_GUID;
    queryfjGrid();
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
            url: AppUrl + 'PM_14/PM_14_FAULT_ITEM_DATA_DEL',
            params: {
                'V_V_PERCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_IP': Ext.fly('localIp').getValue(),
                'V_V_GUID': seldata[i].data.V_GUID

            }, success: function (resp) {
            }
        });
    }
    queryGrid();
}

function submitTask() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length == 0) {
        alert('请至少选择一条故障进行下派');
        return false;
    }//对所选进行排查，至少选择一个
    for (var i = 0; i < seldata.length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'PM_14/PM_14_FAULT_ITEM_DATA_SEND',
            params: {
                'V_V_PERCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_IP': Ext.fly('localIp').getValue(),
                'V_V_GUID': seldata[i].data.V_GUID
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

    if (flag == 1) {

    } else {
        var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
        V_V_GUID = seldata[0].data.V_GUID;
    }

    if (addflag == 1) {
        Ext.Ajax.request({
            url: AppUrl + 'PM_14/PM_14_FAULT_ITEM_DATA_SET',
            params: {
                'V_V_GUID': V_V_GUID,
                'V_V_ORGCODE': Ext.getCmp('winck').getValue(),
                'V_V_DEPTCODE': Ext.getCmp('winzyq').getValue(),
                'V_V_EQUTYPE': Ext.getCmp('winsbtype').getValue(),
                'V_V_EQUCODE': Ext.getCmp('winsbname').getValue(),
                'V_V_EQUCHILD_CODE': Ext.getCmp('winsubequname').getValue(),
                'V_V_FAULT_GUID': fault_guid,
                'V_V_FAULT_TYPE': Ext.getCmp('wingztype').getValue(),
                'V_V_FAULT_YY': Ext.getCmp('wingzyy').getValue(),
                'V_V_FAULT_XX': Ext.getCmp('wingzxx').getValue(),
                'V_V_JJBF': Ext.getCmp('winjjff').getValue(),
                'V_V_FAULT_LEVEL': Ext.getCmp('wingzdj').getValue(),
                'V_V_PER_CLASS': Ext.getCmp('winrypz').getValue(),
                'V_V_JJ': Ext.getCmp('winjj').getValue(),
                'V_V_WL': Ext.getCmp('winwl').getValue(),
                'V_V_PART': "",
                'V_V_MATERIAL': "",
                'V_V_TIME': Ext.getCmp('wings').getValue(),
                'V_V_FILE_GUID': file_guid,
                'V_V_INTIME': Ext.util.Format.date(new Date(), 'Y-m-d'),
                'V_V_PERCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_IP': Ext.fly('localIp').getValue()
            }, success: function (resp) {
                Ext.getCmp('addwindow').hide();
            }
        });
    } else {
        Ext.Ajax.request({
            url: AppUrl + 'PM_14/PM_14_FAULT_ITEM_DATA_SET',
            params: {
                'V_V_GUID': V_V_GUID,
                'V_V_ORGCODE': ckcode,
                'V_V_DEPTCODE': zyqcode,
                'V_V_EQUTYPE': sblxcode,
                'V_V_EQUCODE': sbmccode,
                'V_V_EQUCHILD_CODE': zsbmccode,
                'V_V_FAULT_GUID': fault_guid,
                'V_V_FAULT_TYPE': gzlxcode,
                'V_V_FAULT_YY': Ext.getCmp('wingzyy').getValue(),
                'V_V_FAULT_XX': Ext.getCmp('wingzxx').getValue(),
                'V_V_JJBF': Ext.getCmp('winjjff').getValue(),
                'V_V_FAULT_LEVEL': Ext.getCmp('wingzdj').getValue(),
                'V_V_PER_CLASS': Ext.getCmp('winrypz').getValue(),
                'V_V_JJ': Ext.getCmp('winjj').getValue(),
                'V_V_WL': Ext.getCmp('winwl').getValue(),
                'V_V_PART': "",
                'V_V_MATERIAL': "",
                'V_V_TIME': Ext.getCmp('wings').getValue(),
                'V_V_FILE_GUID': file_guid,
                'V_V_INTIME': Ext.util.Format.date(new Date(), 'Y-m-d'),
                'V_V_PERCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_IP': Ext.fly('localIp').getValue()
            }, success: function (resp) {
                Ext.getCmp('addwindow').hide();
            }
        });
    }

    V_V_GUID = guid();
    queryGrid();
}

function delRander(a, value, metaData) {
    return '<a href="javascript:onDel(\'' + metaData.data.V_FILEGUID + '\')">删除</a>';
}

function downloadRander(a, value, metaData) {
    return '<a href="javascript:onDownload(\'' + metaData.data.V_FILEGUID + '\',\'' + metaData.data.V_FILENAME + '\')">' + a + '</a>';
}

function onDel(fileguid) {
    Ext.Ajax.request({
        url: AppUrl + 'PM_14/PRO_BASE_FILE_DEL',
        params: {
            V_V_GUID: fileguid
        }, success: function (resp) {
            queryfjGrid();
        }
    });
}

function onDownload(fileguid, filename) {
    location.href = AppUrl + "qk/downloadFile?V_V_FILEGUID=" + fileguid + "&fileName=" + filename;
}

function uploadfile() {
    file_guid = guid();
    var form = this.up('form').getForm();
    form.submit({
        url: AppUrl + 'qk/uploadFile',
        async: false,
        waitMsg: '上传中...',
        params: {
            guid: file_guid,//设备名称
            filename: Ext.getCmp('upload').getValue().split('\\')[2],
            filetypecode: 'JXJS',
            plant: Ext.getCmp('winck').getValue(),
            dept: Ext.getCmp('winzyq').getValue(),
            person: Ext.util.Cookies.get('v_personcode')
        },
        success: function (resp) {
            Ext.example.msg('提示信息', '保存成功！');
            queryfjGrid();
        },
        failure: function (form, action) {
            Ext.example.msg('提示信息', '保存失败！');
        }
    });
}

function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function selectTeam() {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + '/sbgz/class.jsp?V_DEPTCODE=' + Ext.getCmp('winzyq').getValue() + '&V_GUID=' + V_V_GUID, '', 'height=600px,width=1200px,top=50px,left=100px,resizable=yes');
}

function getTeamReturnValue(arr) {
    //   Ext.getCmp('winrypz').setValue(arr[0]);
    Ext.getCmp('dwwrypzbm').setValue(arr[0]);
    Ext.getCmp('dwwrypz').setValue(arr[1]);
}

function selectJXCAR() {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + '/sbgz/jj.jsp?V_GUID=' + V_V_GUID, '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}

function getReturnJXCAR(data) {
    //Ext.getCmp('winjj').setValue(data);
    var names = [];
    var codes = [];
    for (var i = 0; i < data.length; i += 2) {
        codes.push(data[i]);
        names.push(data[i + 1]);
    }
    Ext.getCmp('dwwjjbm').setValue(codes);
    Ext.getCmp('dwwjj').setValue(names);
}

function selectMaterial() {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + '/sbgz/wl.jsp?flag=all&V_GUID=' + V_V_GUID + '&V_ORDERGUID=123', '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}

function getReturnMaterial(data) {
    // Ext.getCmp('winwl').setValue(data[0]);
    var names = [];
    var codes = [];
    for (var i = 0; i < data.length; i += 2) {
        codes.push(data[i]);
        names.push(data[i + 1]);
    }
    Ext.getCmp('dwwwlbm').setValue(codes);
    Ext.getCmp('dwwwl').setValue(names);
}

function selectModel() {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + '/sbgz/Index2.jsp?V_ORGCODE=' + Ext.getCmp('ck').getValue() +
    '&V_DEPTCODE=' + Ext.getCmp('zyq').getValue(), '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}

function getReturnModel(data) {
    addflag = 2;
    flag = 1;
    Ext.getCmp('panel1').removeAll();
    Ext.getCmp('panel2').removeAll();
    Ext.getCmp('panel3').removeAll();

    Ext.getCmp('panel1').add({
        id: 'winck',
        xtype: 'textfield',
        readOnly: true,
        fieldLabel: '厂矿',
        labelWidth: 90,
        labelAlign: 'right'
    }, {
        id: 'winzyq',
        xtype: 'textfield',
        fieldLabel: '作业区',
        readOnly: true,
        labelWidth: 90,
        margin: '10px 0 0 25px',
        labelAlign: 'right'
    });
    Ext.getCmp('panel2').add({
        id: 'winsbtype',
        xtype: 'textfield',
        fieldLabel: '设备类型',
        readOnly: true,
        labelWidth: 90,
        baseCls: 'margin-bottom'
    }, {
        id: 'winsbname',
        xtype: 'textfield',
        fieldLabel: '设备名称',
        readOnly: true,
        labelWidth: 90,
        margin: '10px 0 0 25px',
        baseCls: 'margin-bottom'
    });
    Ext.getCmp('panel3').add({
        xtype: 'textfield',
        id: 'winsubequname',
        readOnly: true,
        labelWidth: 90,
        fieldLabel: '子设备名称',
        labelAlign: 'right'
    }, {
        xtype: 'textfield',
        id: 'wingztype',
        readOnly: true,
        labelWidth: 90,
        margin: '10px 0 0 25px',
        fieldLabel: '故障类型',
        labelAlign: 'right'
    });

    Ext.getCmp('winck').setValue(Ext.getCmp('ck').getRawValue());
    ckcode = Ext.getCmp('ck').getValue();
    Ext.getCmp('winzyq').setValue(Ext.getCmp('zyq').getRawValue());
    zyqcode = Ext.getCmp('zyq').getValue();
    Ext.getCmp('winsbtype').setValue(data[0].data.V_EQUTYPENAME);
    sblxcode = data[0].data.V_EQUTYPECODE
    Ext.getCmp('winsbname').setValue(data[0].data.V_EQUNAME);
    sbmccode = data[0].data.V_EQUCODE
    Ext.getCmp('winsubequname').setValue(data[0].data.V_EQUCHILD_NAME);
    zsbmccode = data[0].data.V_EQUCHILD_CODE
    Ext.getCmp('wingztype').setValue(data[0].data.V_TYPENAME);
    gzlxcode = data[0].data.V_TYPECODE
    Ext.getCmp('wingzyy').setValue(data[0].data.V_FAULT_YY);

    Ext.getCmp('wingzxx').setValue("");
    Ext.getCmp('wingzdj').setValue("");
    Ext.getCmp('winjjff').setValue("");
    Ext.getCmp('winrypz').setValue("");
    Ext.getCmp('winjj').setValue("");
    Ext.getCmp('winwl').setValue("");
    Ext.getCmp('wings').setValue("");

    Ext.getCmp('addwindow').show();
}

function detailRander(value, metaData, record, rowIdx, colIdx, store, view) {
    return '<a href="javascript:onDetail(\'' + rowIdx + '\')">详情</a>';
}

function onDetail(rowIdx) {
    var V_EQUCODE = Ext.getCmp('grid').store.data.items[rowIdx].data.V_EQUCODE;
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + '/sbgz/model.html?V_EQUCODE=' + V_EQUCODE, '', 'height=600px,width=1200px,top=50px,left=100px,resizable=yes');
}

//处理
function dealWith() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length != 1) {
        alert("请选择一条数据!");
        return false;
    }
    V_V_GUID = seldata[0].data.V_GUID,
        Ext.getCmp('dealWithWindow').show();
}
//处理[保存]按钮
function dealWithWinSave() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    Ext.Msg.confirm("提示", "是否要将该数据进行处理！", function (button) {
        if (button == 'yes') {
            Ext.Ajax.request({
                url: AppUrl + 'PM_14/PM_14_FAULT_ITEM_DATA_SET1',
                params: {
                    'V_V_GUID': seldata[0].data.V_GUID,
                    'V_V_PERCODE': Ext.util.Cookies.get('v_personcode'),
                    'V_V_IP': Ext.fly('localIp').getValue(),
                    'V_V_PER_CLASS': Ext.getCmp('dwwrypzbm').getValue(),
                    'V_V_JJ': Ext.getCmp('dwwjjbm').getValue(),
                    'V_V_TIME': Ext.getCmp('dwwgs').getValue(),
                    'V_V_WL': Ext.getCmp('dwwwlbm').getValue(),
                    'V_V_BZ': Ext.getCmp('dwwbz').getValue()
                }, success: function (resp) {
                    Ext.getCmp('dealWithWindow').hide();
                }
            });
        }
    });
}
function workOrder() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length != 1) {
        alert("请选择一条数据!");
        return false;
    }
    V_V_GUID = seldata[0].data.V_GUID,
        //var owidth = window.document.body.offsetWidth - 200;
        //var oheight = window.document.body.offsetHeight - 100;
        //var ret = window.open(AppUrlUrl + '/No410701/Index.html?V_GUID='+V_V_GUID, '','height=600px,width=1200px,top=50px,left=100px,resizable=yes');
        window.open(AppUrl + '/sbgz/workOrder.html?V_GUID=' + V_V_GUID + '&V_ORGCODE=' + seldata[0].data.V_ORGCODE + '&V_DEPTCODE=' + seldata[0].data.V_DEPTCODE);
}