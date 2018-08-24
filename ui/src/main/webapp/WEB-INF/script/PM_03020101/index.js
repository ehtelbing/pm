﻿var Guid="";
var OrgCode='';
var DeptCode='';
var ZyCode='';
var WxlxCode='';
var repairDept='';
var fzrPer='';

var qxEqu='';

if(Ext.urlDecode(location.href.split('?')[1])!=null){
    Guid=Ext.urlDecode(location.href.split('?')[1]).guid==null?"":Ext.urlDecode(location.href.split('?')[1]).guid;
}

var zyqStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'zyqStore',
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
        }
    }
});

var wxlxStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'wxlxStore',
    fields: ['V_BASECODE', 'V_BASENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_06/PRO_PM_BASEDIC_VIEW',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var zyStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'zyStore',
    fields: ['V_SPECIALTYCODE', 'V_BASENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'basic/PRO_BASE_SPECIALTY_DEPT_SPECIN',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var EquTypeStore= Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'EquTypeStore',
    fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'qx/PRO_PM_07_DEPTEQUTYPE_PER',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

//根据作业区，人员，专业查询所有设备
var sbGridStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'sbGridStore',
    fields: ['V_EQUCODE', 'V_EQUNAME','V_EQUSITE','V_EQUSITENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'pm_19/PRO_GET_DEPTEQU_PER',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var yxsbGridStore= Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'yxsbGridStore',
    fields: ['V_PLANGUID','V_EQUTYPECODE','V_EQUTYPENAME','V_EQUCODE',
    'V_EQUNAME','V_EQUSITECODE','V_EQUSITE','V_SAP_EQUCODE','V_SIZE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PM_03_PLAN_YEAR_EQU_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var cgridStore= Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'cgridStore',
    fields: ['V_PLANGUID','V_EQUTYPECODE','V_EQUTYPENAME','V_EQUCODE',
        'V_EQUNAME','V_EQUSITECODE','V_EQUSITE','V_SAP_EQUCODE','V_SIZE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PM_03_PLAN_YEAR_EQU_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var repairDeptStore= Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'repairDeptStore',
    fields: ['V_DEPTCODE','V_DEPTNAME','V_DEPTREPAIRCODE','V_DEPTREPAIRNAME',
        'I_ORDERID'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'zdh/fixdept_sel',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var fzPerStore= Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'fzPerStore',
    fields: ['V_PERSONCODE', 'V_PERSONNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_22/PRO_BASE_SPECIALTYTOPERSON_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var qxAddStore= Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'qxAddStore',
    fields: ['I_ID','V_DEFECTLIST','V_SOURCECODE', 'V_SOURCENAME', 'V_SOURCETABLE', 'V_SOURCEREMARK', 'V_SOURCEID',
    'D_DEFECTDATE', 'D_INDATE', 'V_PERCODE', 'V_PERNAME', 'V_ORGCODE', 'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME',
    'V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_EQUSITENAME', 'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_IDEA', 'V_STATECODE',
    'V_STATENAME', 'V_STATECOLOR', 'V_GUID', 'V_EQUSITE1', 'D_DATE_EDITTIME', 'V_EDIT_GUID', 'V_SOURCE_GRADE', 'V_EQUCHILDCODE',
    'V_INPERCODE', 'V_INPERNAME', 'V_BZ', 'V_REPAIRMAJOR_CODE', 'V_HOUR', 'V_FLAG'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PRO_PM_DEFECT_DEPT_SEL_ALL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var qxGridStore=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'qxGridStore',
    fields: ['I_ID','V_DEFECTLIST','V_SOURCECODE', 'V_SOURCENAME', 'V_SOURCETABLE', 'V_SOURCEREMARK', 'V_SOURCEID',
        'D_DEFECTDATE', 'D_INDATE', 'V_PERCODE', 'V_PERNAME', 'V_ORGCODE', 'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME',
        'V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_EQUSITENAME', 'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_IDEA', 'V_STATECODE',
        'V_STATENAME', 'V_STATECOLOR', 'V_GUID', 'V_EQUSITE1', 'D_DATE_EDITTIME', 'V_EDIT_GUID', 'V_SOURCE_GRADE', 'V_EQUCHILDCODE',
        'V_INPERCODE', 'V_INPERNAME', 'V_BZ', 'V_REPAIRMAJOR_CODE', 'V_HOUR', 'V_FLAG'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PM_03_PROJECT_DEFECT_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var qxEquStore=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'qxEquStore',
    fields: ['V_PLANGUID','V_EQUTYPECODE','V_EQUTYPENAME','V_EQUCODE',
        'V_EQUNAME','V_EQUSITECODE','V_EQUSITE','V_SAP_EQUCODE','V_SIZE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PM_03_PLAN_YEAR_EQU_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var dqxgridStore=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'dqxgridStore',
    fields: ['I_ID','V_DEFECTLIST','V_SOURCECODE', 'V_SOURCENAME', 'V_SOURCETABLE', 'V_SOURCEREMARK', 'V_SOURCEID',
        'D_DEFECTDATE', 'D_INDATE', 'V_PERCODE', 'V_PERNAME', 'V_ORGCODE', 'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME',
        'V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_EQUSITENAME', 'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_IDEA', 'V_STATECODE',
        'V_STATENAME', 'V_STATECOLOR', 'V_GUID', 'V_EQUSITE1', 'D_DATE_EDITTIME', 'V_EDIT_GUID', 'V_SOURCE_GRADE', 'V_EQUCHILDCODE',
        'V_INPERCODE', 'V_INPERNAME', 'V_BZ', 'V_REPAIRMAJOR_CODE', 'V_HOUR', 'V_FLAG'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PRO_PM_DEFECT_DEPT_SEL_ALL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var mxAllStore=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'mxAllStore',
    fields: ['I_ID', 'V_BZ', 'V_DEPTCODE', 'V_EQUCODE', 'V_EQUCODE_CHILD', 'V_EQUTYPE', 'V_GX_CODE',
        'V_HOUR', 'V_IN_DATE', 'V_IN_PER', 'V_MXBB_NUM', 'V_MX_CODE', 'V_MX_NAME', 'V_ORGCODE', 'V_REPAIRMAJOR_CODE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PM_1917_JXMX_SELBY_MOREEQU',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var mxStore=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'mxStore',
    fields: ['ID', 'V_PROJECT_GUID', 'V_MODEL_GUID', 'V_MODEL_NAME', 'V_MODEL_BBH','V_BZ'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PM_03_PLAN_YEAR_MODEL_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var jxgxStore=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'jxgxStore',
    fields: ['V_MX_CODE', 'V_MX_NAME', 'V_JXGX_CODE', 'V_JXGX_NAME', 'V_GZZX_CODE','V_JXGX_NR','V_ORDER',
        'V_PERNUM','V_PERTIME','V_JXBZ','V_JXBZ_VALUE_DOWN','V_JXBZ_VALUE_UP','V_JJ_NAME','V_GJ_NAME','V_GZ_NAME','V_WL_NAME',
        'V_WORK_NAME','V_AQCS_NAME','V_JSYQ_NAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'pm_19/PM_1917_JXGX_DATA_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var gxStore=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'gxStore',
    fields: ['V_MX_CODE', 'V_MX_NAME', 'V_JXGX_CODE', 'V_JXGX_NAME', 'V_GZZX_CODE','V_JXGX_NR','V_ORDER',
        'V_PERNUM','V_PERTIME','V_JXBZ','V_JXBZ_VALUE_DOWN','V_JXBZ_VALUE_UP','V_JJ_NAME','V_GJ_NAME','V_GZ_NAME','V_WL_NAME',
        'V_WORK_NAME','V_AQCS_NAME','V_JSYQ_NAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'pm_19/PM_1917_JXGX_DATA_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var jxgzStore=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'jxgzStore',
    fields: ['V_JXGX_CODE', 'V_PERCODE_DE', 'V_PERNAME_DE', 'V_TS', 'V_DE','V_PERTYPE_DE','V_PERCODE',
        'V_PERNAME','I_ID','V_PERNUM'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'pm_19/PRO_PM_19_WORKDE_GXSEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var jxwlStore=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'jxwlStore',
    fields: ['V_JXGX_CODE', 'V_KFNAME', 'V_WLCODE', 'V_WLSM', 'V_GGXH','V_JLDW','V_PRICE',
        'V_USE_NUM'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'pm_19/PM_1917_JXGX_WL_DATA_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
})

var northPanel = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    id:'northPanel',
    titleAlign:'center',
    height:60,
    bodyStyle:'background:#f2f2f2; border-bottom:1px solid #f4f4f4',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8' },
        {
            xtype: 'button',
            text: '检修模型',
            margin: '5 0 5 0',
            iconCls:'Tablegear',
            handler:btnAdd_jxmx
        },
        {
            xtype: 'button',
            text: '添加设备',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Tableadd',
            handler:btnAdd_jdsb
        },
        {
            xtype: 'button',
            text: '添加缺陷',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Tableadd',
            handler:btnAdd_tjqx
        },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8' },
        {
            xtype: 'button',
            text: '临时保存',
            margin: '5 0 5 0',
            iconCls:'Tablesave'
        },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8' },
        {
            xtype: 'button',
            text: '上报',
            margin: '5 0 5 0',
            iconCls:'Report'

        }
    ]
});

/*项目信息*/
var LTpanel = Ext.create('Ext.panel.Panel', {
    region: 'north',
    width:'100%',
    frame: false,
    border:true,
    //baseCls: 'my-panel-no-border',
    layout: 'column',
    defaults: {labelAlign: 'right'},
    bodyStyle:"background:#f2f2f2",
    collapsible: false,
    items: [
        {
            xtype: 'textfield',
            fieldLabel: '项目编码',
            id:'ProjectCode',
            labelWidth: 60,
            width:250,
            margin:'5 5 5 15'
        },
        {
            xtype: 'textfield',
            fieldLabel: '项目名称',
            id:'ProjectName',
            labelWidth: 60,
            width:250,
            margin:'5 5 5 0'
        },
        {
            xtype : 'combo',
            id : "zyq",
            store: zyqStore,
            editable : false,
            queryMode : 'local',
            fieldLabel : '计划作业区',
            margin:'5 5 5 0',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            labelWidth :80,
            width:250,
            labelAlign : 'right'
        },
        {
            xtype : 'combo',
            id : "wxlx",
            store: wxlxStore,
            editable : false,
            queryMode : 'local',
            fieldLabel : '维修类型',
            margin:'5 5 5 0',
            displayField: 'V_BASENAME',
            valueField: 'V_BASECODE',
            labelWidth :60,
            width:250,
            labelAlign : 'right'
        },
        {
            xtype : 'combo',
            id : "zy",
            store: zyStore,
            editable : false,
            queryMode : 'local',
            fieldLabel : '专 业',
            margin:'5 5 5 0',
            displayField: 'V_BASENAME',
            valueField: 'V_SPECIALTYCODE',
            width:265,
            labelWidth :75,
            labelAlign : 'right'
        }
    ]
});
/*查看更多设备*/
var Toolpanel = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    height:32,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        { xtype: 'tbfill' },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8',},
        {
            xtype: 'button',
            text: '查看更多',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Magnifierzoomin',listeners:{click:LookMoreEqu}
        }
    ]
});
/*设备表格*/
var centerPanel = Ext.create('Ext.grid.Panel', {
    region: "north",
    id:'cgrid',
    store:cgridStore,
    split: true,
    width:'100%',
    margin:'0px',
    height:150,
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '设备编码',width: 140, dataIndex: 'V_EQUCODE', align: 'center',renderer:atleft},
        {text: '设备名称',width: 140, dataIndex: 'V_EQUNAME', align: 'center',renderer:atleft},
        {text: '功能位置',width: 300, dataIndex: 'V_EQUSITE', align: 'center',renderer:atleft},
        {text: '查看设备检修明细',dataIndex:'cksbjxmx',width:160},
        {text: '固定资产',dataIndex:'gdzc',width:160},
        {text: '删除',width: 120, dataIndex: 'V_EQUCODE', align: 'center',renderer:DelEqu}
    ]
});
var gcxmwlsgt = Ext.create('Ext.panel.Panel', {
    region: 'center',
    width: '100%',
    frame: false,
    border: false,
    layout: 'hbox',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    items: [centerPanel]
});

/*维修内容*/
var ToolpanelB  = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    height:85,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2 !important;',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        {
            xtype     : 'textareafield',
            id:'content',
            grow      : true,
            name      : 'message',
            fieldLabel: '维修内容',
            anchor    : '100%',
            margin:'5 5 5 20',
            labelWidth :60,
            width:1000,
            height:70
        }
    ]
});
/*检修信息*/
var ToolpanelC  = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    height:35,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2 !important;',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        {
            xtype : 'datefield',
            editable : false,
            fieldLabel : '开工时间',
            margin:'5 5 5 15',
            labelWidth :60,
            width:170,
            labelAlign : 'right',
            format:'Y/m/d',
            value:new Date()
        },
        {
            xtype : 'datefield',
            editable : false,
            fieldLabel : '竣工时间',
            margin:'5 5 5 15',
            labelWidth :60,
            width:170,
            labelAlign : 'right',
            format:'Y/m/d',
            value:new Date()
        },
        {
            xtype : 'combo',
            id:'repairDept',
            store:repairDeptStore,
            editable : false,
            queryMode : 'local',
            fieldLabel : '检修单位',
            displayField: 'V_DEPTREPAIRNAME',
            valueField: 'V_DEPTREPAIRCODE',
            margin:'5 5 5 15',
            labelWidth :60,
            width:240,
            labelAlign : 'right'
        },
        {
            xtype : 'combo',
            id:'fzPer',
            store:fzPerStore,
            editable : false,
            queryMode : 'local',
            fieldLabel : '负责人',
            displayField: 'V_PERSONNAME',
            valueField: 'V_PERSONCODE',
            margin:'5 5 5 10',
            labelWidth :60,
            width:170,
            labelAlign : 'right'
        },
        {
            xtype: 'numberfield',
            fieldLabel: '计划费用',
            labelWidth: 60,
            width:170,
            margin:'5 5 5 20',
            value:0
        }
    ]
});

/*查看更多缺陷*/
var TOPGIRDRIGHTTtool = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    height:32,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '缺陷明细',
        { xtype: 'tbfill' },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'},
        {
            xtype: 'button',
            text: '查看更多',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Magnifierzoomin',
            listeners:{click:OnLookMoreDefect}
        }
    ]
});
/*缺陷表格*/
var TOPGIRDRIGHTtable = Ext.create('Ext.grid.Panel', {
    id:'qxgrid',
    store:qxGridStore,
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '设备名称',width: 140, dataIndex: 'V_EQUNAME', align: 'center',renderer:atleft},
        {text: '缺陷类型',width: 120, dataIndex: 'V_SOURCENAME', align: 'center',renderer:atleft},
        {text: '缺陷内容',width: 300, dataIndex: 'V_DEFECTLIST', align: 'center',renderer:atleft},
        {text: '缺陷日期',width: 140, dataIndex: 'D_DEFECTDATE', align: 'center',renderer:atleft},
        {text: '删除',width: 120,  align: 'center',renderer:DelDefect}
    ]
});
var TOPGIRDRIGHT = Ext.create('Ext.panel.Panel', {
    region: 'border',
    width: '100%',
    frame: false,
    border: false,
    //baseCls: 'my-panel-no-border',
    layout: 'vbox',
    margin:'0 0 0 5',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    items: [TOPGIRDRIGHTTtool,TOPGIRDRIGHTtable]
})
var ToolpanelD = Ext.create('Ext.panel.Panel', {
    region: 'border',
    width: '100%',
    frame: false,
    border: false,
    layout: 'hbox',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    items: [TOPGIRDRIGHT]
})

/*左上布局*/
var Leftdivtop = Ext.create('Ext.panel.Panel', {
    region:'north',
    border:false,
    frame: false,
    height:550,
    renderTo: Ext.getBody(),
    items: [LTpanel,Toolpanel,gcxmwlsgt,ToolpanelB,ToolpanelC,ToolpanelD]
});
//检修模型
var jxmx1 = Ext.create('Ext.grid.Panel', {
    id:'mxgrid',
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    store:mxStore,
    columnLines: true,
    border: false,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '模型名称',width: 200, dataIndex: 'V_MODEL_NAME', align: 'center',renderer:atleft},
        {text: '版本号',width: 140, dataIndex: 'V_MODEL_BBH', align: 'center',renderer:atleft},
        {text: '备注',width: 300, dataIndex: 'V_BZ', align: 'center',renderer:atleft},
        {text: '查看明细',renderer:function(value,metaData,record){
                return '<a href="#" onclick="MXclick()">'+'查看详细'+'</a>'
            }},
        {text: '删除',width: 120,  align: 'center',renderer:DelModel}
    ]
});
var jxmx2 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    height:32,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '检修模型',
        { xtype: 'tbfill' },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'},
        {
            xtype: 'button',
            text: '查看更多',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Magnifierzoomin'
        },
    ]
});
//物料明细表格
var wlmxgird = Ext.create('Ext.grid.Panel', {
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    columnLines: true,
    border: true,
    columns: [
        {text: '序号',dataIndex:'gysbh'},
        {text: '物料编码',dataIndex:'gysmc'},
        {text: '物料描述',dataIndex:'gysqc'},
        {text: '规格型号',dataIndex:'ggxh'},
        {text: '计划单价',dataIndex:'sl'},
        {text: '使用数量',dataIndex:'gysqc'}
    ]
});
//物料明细按钮
var wlmxcd = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    //baseCls: 'my-panel-no-border',
    layout: 'column',
    bodyStyle:'background:#f2f2f2',
    height:32,
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8' },
        {
            xtype: 'button',
            text: '物料明细',
            margin: '5 0 5 0',
            iconCls:'Tablecolumn'


        },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8' },
        {
            xtype: 'button',
            text: '作业区库存明细',
            margin: '5 0 5 0',
            iconCls:'Tablecell'

        },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8' },
        {
            xtype: 'button',
            text: '厂矿库存明细',
            margin: '5 0 5 0',
            iconCls:'Tablelightning'

        },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8' },
        {
            xtype: 'button',
            text: '其它厂矿库存明细',
            margin: '5 0 5 0',
            iconCls:'Tablesort'

        }
    ]
});

//左下tab
var Leftdivbtm = Ext.create('Ext.tab.Panel', {
    region:'north',
    border:false,
    height:window.innerHeight /2,
    renderTo: Ext.getBody(),
    items: [{
        title: '物料明细',
        items:[wlmxcd,wlmxgird]
    }, {
        title: '机具',
        layout:'vbox',
        items:[]
    },{
        title: '工具',
        layout:'vbox',
        items:[]
    },
        {
            title: '人员',
            layout:'vbox',
            items:[]
        },
        {
            title: '网络施工图',
            layout:'hbox',
            items:[]
        },
        {
            title: '审批流程',
            layout:'hbox',
            items:[]
        },
    ]
});

var Leftdivbtm = Ext.create('Ext.panel.Panel', {
    layout: 'border',
    region:'center',
    height:window.innerHeight /2,
    items: [Leftdivbtm],
    renderTo: Ext.getBody()
});

var Rightdivtop = Ext.create('Ext.panel.Panel', {
    layout: 'border',
    region:'north',
    border:false,
    height:'70%',
    bodyStyle:'border-top:1px solid #d4d4d4 !important',
    renderTo: Ext.getBody(),
    items: [Leftdivbtm]
});

var Rightdivbtm1 = Ext.create('Ext.panel.Panel', {
    layout: 'border',
    region:'north',
    border:true,
    height:"30%",
    title:'维修计划编制设置',
    bodyStyle:'background:#f2f2f2;',
    renderTo: Ext.getBody(),
    items: []
});
var Leftdiv = Ext.create('Ext.panel.Panel', {
    layout: 'border',
    region:'west',
    width:'57%',
    border:false,
    items: [Leftdivtop,jxmx2,jxmx1],
    renderTo: Ext.getBody()
});

var Rightdiv = Ext.create('Ext.panel.Panel', {
    layout: 'border',
    region:'center',
    width:'43%',
    border:false,
    items: [Rightdivtop,Rightdivbtm1],
    renderTo: Ext.getBody()
});

var centerPanel = Ext.create('Ext.panel.Panel', {
    layout: 'border',
    region:'center',
    border:false,
    items: [Leftdiv,Rightdiv],
    renderTo: Ext.getBody()
});
//添加设备事件
//添加设备
var sbPanel=Ext.create('Ext.panel.Panel',{
   region:'north',
   layout:'column',
   frame:true,
   wdith:'100%',
   items:[{ xtype: 'combo',fieldLabel: '设备类型',store: EquTypeStore,id:'EquType',editable : false,queryMode : 'local',displayField: 'V_EQUTYPENAME', valueField: 'V_EQUTYPECODE',labelWidth: 75, width:265,margin:'5 5 5 0',labelAlign:'right'},
          {xtype: 'button',text: '查询', margin: '5 5 5 5',bodyStyle:'float:right;',iconCls:'Magnifierzoomin' ,listeners:{click:QueryEquGrid}},
          {xtype: 'button',text: '确认返回', margin: '5 5 5 5',bodyStyle:'float:right;',iconCls:'Tablesave' ,listeners:{click:winClose}}]
});
var sbGrid = Ext.create('Ext.grid.Panel', {
    id:'sbGrid',
    store:sbGridStore,
    region: "west",
    split: true,
    width:820,
    margin:'0px',
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '设备编码',width: 140, dataIndex: 'V_EQUCODE', align: 'center',renderer:atleft},
        {text: '设备名称',width: 140, dataIndex: 'V_EQUNAME', align: 'center',renderer:atleft},
        {text: '功能位置',width: 300, dataIndex: 'V_EQUSITENAME', align: 'center',renderer:atleft}
    ],listeners:{
        itemdblclick : importEqu
    }
});
var yxsbGrid = Ext.create('Ext.grid.Panel', {
    id:'yxsbGrid',
    store:yxsbGridStore,
    region: "west",
    split: true,
    width:820,
    margin:'0px',
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '设备编码',width: 140, dataIndex: 'V_EQUCODE', align: 'center',renderer:atleft},
        {text: '设备名称',width: 140, dataIndex: 'V_EQUNAME', align: 'center',renderer:atleft},
        {text: '功能位置',width: 300, dataIndex: 'V_EQUSITE', align: 'center',renderer:atleft},
        {text: '删除',width: 120, dataIndex: 'V_EQUCODE', align: 'center',renderer:DelEqu}
    ]
});
var btnAdd_jdsb = Ext.create('Ext.window.Window', {
    id: 'btnAdd_jdsb',
    width: 1700,
    height: 675,
    title: '大修计划设备添加',
    modal: true,
    frame: true,
    closeAction: 'hide',
    closable: true,
    layout: 'border',
    items: [sbPanel,sbGrid,yxsbGrid]
});
//单设备缺陷添加
var tjqxpanel=Ext.create('Ext.panel.Panel',{
    region:'north',
    layout:'column',
    frame:true,
    wdith:'100%',
    items:[{xtype: 'button',text: '确认返回', margin: '5 5 5 5',bodyStyle:'float:right;',iconCls:'Tablesave' ,listeners:{click:SaveQx}},
            {xtype: 'button',text: '关闭', margin: '5 5 5 5',bodyStyle:'float:right;',iconCls:'Tabledelete' ,listeners:{click:winQxClose}}]
})
var tjqxgrid = Ext.create('Ext.grid.Panel', {
    region: "center",
    id:'qxAdd',
    store:qxAddStore,
    split: true,
    width:'100%',
    margin:'0px',
    columnLines: true,
    border: true,
    selType: 'checkboxmodel',
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '设备名称',width: 140, dataIndex: 'V_EQUNAME', align: 'center',renderer:atleft},
        {text: '缺陷类型',width: 120, dataIndex: 'V_SOURCENAME', align: 'center',renderer:atleft},
        {text: '缺陷内容',width: 300, dataIndex: 'V_DEFECTLIST', align: 'center',renderer:atleft},
        {text: '缺陷日期',width: 140, dataIndex: 'D_DEFECTDATE', align: 'center',renderer:atleft}
    ]
});
var btnAdd_tjqx = Ext.create('Ext.window.Window', {
    id: 'btnAdd_tjqx',
    width: 850,
    height: 400,
    title: '缺陷选择',
    modal: true,
    frame: true,
    closeAction: 'hide',
    closable: true,
    layout: 'border',
    items: [tjqxpanel,tjqxgrid]
});
//多设备缺陷添加
var dtjqxgrid = Ext.create('Ext.grid.Panel', {
    split: true,
    id:'qxEqu',
    store:qxEquStore,
    region:'west',
    width:400,
    columnLines: true,
    border:false,
    columns: [
        {text: '设备名称',width: 140, dataIndex: 'V_EQUNAME', align: 'center',renderer:atleft},
        {text: '功能位置',width: 260, dataIndex: 'V_EQUSITE', align: 'center',renderer:atleft}
    ],listeners:{itemclick:QueryQxByEqu}

});
var tjqxgrid1 = Ext.create('Ext.grid.Panel', {
    id:'dqxgrid',
    store:dqxgridStore,
    region: "center",
    split: true,
    width:540,
    margin:'0px',
    columnLines: true,
    border: true,
    columns: [
        {text: '设备名称',width: 140, dataIndex: 'V_EQUNAME', align: 'center',renderer:atleft},
        {text: '缺陷类型',width: 120, dataIndex: 'V_SOURCENAME', align: 'center',renderer:atleft},
        {text: '缺陷内容',width: 300, dataIndex: 'V_DEFECTLIST', align: 'center',renderer:atleft},
        {text: '缺陷日期',width: 140, dataIndex: 'D_DEFECTDATE', align: 'center',renderer:atleft}
    ],listeners:{itemclick:OnBtnAddQx}
});
var dbtnAdd_tjqx = Ext.create('Ext.window.Window', {
    id: 'dbtnAdd_tjqx',
    width: 1100,
    height: 600,
    title: '缺陷选择',
    modal: true,
    frame: true,
    closeAction: 'hide',
    closable: true,
    layout: 'border',
    items: [dtjqxgrid,tjqxgrid1]
});
//检修模型确认返回
var mxpanle=Ext.create('Ext.panel.Panel',{
    region:'north',
    layout:'column',
    frame:true,
    wdith:'100%',
    items:[{xtype: 'button',text: '确认返回', margin: '5 5 5 5',bodyStyle:'float:right;',iconCls:'Tablesave' ,listeners:{click:SaveMx}},
        {xtype: 'button',text: '关闭', margin: '5 5 5 5',bodyStyle:'float:right;',iconCls:'Tabledelete' ,listeners:{click:winMxClose}}]
});
//检修模型表单1
var mxAllGrid = Ext.create('Ext.grid.Panel', {
    region: "north",
    split: true,
    width:'100%',
    margin:'0px',
    height:150,
    id:'mxAllGrid',
    store:mxAllStore,
    columnLines: true,
    border: true,
    selType:'checkboxmodel',
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '模型名称',width: 200, dataIndex: 'V_MX_NAME', align: 'center',renderer:atleft},
        {text: '版本号',width: 100, dataIndex: 'V_MXBB_NUM', align: 'center',renderer:atleft},
        {text: '备注',width: 300, dataIndex: 'V_BZ', align: 'center',renderer:atleft},
        {text: '查看明细',renderer:function(value,metaData,record){
                return '<a href="#" onclick="MXclick(\'' + record.data.V_EQUCODE + '\')">'+'查看详细'+'</a>'
            }}
    ],listeners:{itemclick:QueryGx}
});
//检修模型表单2
var jxgxGrid = Ext.create('Ext.grid.Panel', {
    region: "center",
    id:'jxgxGrid',
    store:jxgxStore,
    split: true,
    width:'100%',
    margin:'0px',
    height:150,
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '工序名称',width: 200, dataIndex: 'V_JXGX_NAME', align: 'center',renderer:atleft},
        {text: '工序内容',width: 200, dataIndex: 'V_JXGX_NR', align: 'center',renderer:atleft},
        {text: '工种',width: 200, dataIndex: 'V_GZ_NAME', align: 'center',renderer:atleft},
        {text: '工具',width: 200, dataIndex: 'V_GJ_NAME', align: 'center',renderer:atleft},
        {text: '机具',width: 200, dataIndex: 'V_JJ_NAME', align: 'center',renderer:atleft},
        {text: '物料',width: 200, dataIndex: 'V_WL_NAME', align: 'center',renderer:atleft},
        {text: '安全措施',width: 200, dataIndex: 'V_AQCS_NAME', align: 'center',renderer:atleft},
        {text: '技术要求',width: 200, dataIndex: 'V_JSYQ_NAME', align: 'center',renderer:atleft}
    ]
});
//检修模型弹出窗口
var btnAdd_jxmx = Ext.create('Ext.window.Window', {
    id: 'btnAdd_jxmx',
    width: 1000,
    height: 600,
    title: '检修模型',
    modal: true,
    frame: true,
    closeAction: 'hide',
    closable: true,
    layout: 'border',
    items: [mxpanle,mxAllGrid,jxgxGrid]
});
//大修计划检修模型明细
var gxgrid = Ext.create('Ext.grid.Panel', {
    region: 'west',
    id:'gxgrid',
    store:gxStore,
    split: true,
    width:400,
    height:200,
    margin:'0px',
    columnLines: true,
    border: true,
    layout: 'column',
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '工序名称',width: 200, dataIndex: 'V_JXGX_NAME', align: 'center',renderer:atleft}
    ]
});
//大修历史缺陷····
var dxlsqxtool1 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    //baseCls: 'my-panel-no-border',
    layout: 'column',
    height:32,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '历史缺陷',
        { xtype: 'tbfill' },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'},
        {
            xtype: 'button',
            text: '更 多',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Magnifierzoomin'
        }
    ]
});
//大修备件明细表格
var dxlsqxgrid1 = Ext.create('Ext.grid.Panel', {
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    height:130,
    columnLines: true,
    border: true,
    columns: [
        {text: '序号'},
        {text: '发现日期'},
        {text: '缺陷内容'},
        {text: '缺陷类型'},
        {text: '缺陷来源'},
        {text: '发现人'}
    ]
});
//大修计划右边布局
var dxlsqx = Ext.create('Ext.panel.Panel', {
    region:'north',
    border:false,
    frame: false,
    width:'100%',
    renderTo: Ext.getBody(),
    items: [dxlsqxtool1,dxlsqxgrid1]
});
//大修备件明细
//检修人员表单
var jxrytool1 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    height:32,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '检修人员',
        { xtype: 'tbfill' },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'},
        {
            xtype: 'button',
            text: '更 多',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Magnifierzoomin'
        }
    ]
});
//检修人员表格
var jxgzgrid = Ext.create('Ext.grid.Panel', {
    id:'jxgzgrid',
    store:jxgzStore,
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    height:90,
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '人员编码',width: 160, dataIndex: 'V_PERCODE', align: 'center',renderer:atleft},
        {text: '人员姓名',width: 160, dataIndex: 'V_PERNAME', align: 'center',renderer:atleft},
        {text: '工种名称',width: 160, dataIndex: 'V_PERNAME_DE', align: 'center',renderer:atleft},
        {text: '工种类型',width: 160, dataIndex: 'V_PERTYPE_DE', align: 'center',renderer:atleft},
        {text: '定额',width: 160, dataIndex: 'V_DE', align: 'center',renderer:atleft},
        {text: '台时',width: 160, dataIndex: 'V_TS', align: 'center',renderer:atleft}
    ]
});
//检修工种
var jxgz = Ext.create('Ext.panel.Panel', {
    region:'north',
    border:false,
    frame: false,
    width:'100%',
    renderTo: Ext.getBody(),
    items: [jxrytool1,jxgzgrid]
});
//检修机具表单
var jxjjtool1 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    //baseCls: 'my-panel-no-border',
    layout: 'column',
    height:32,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '检修机具',
        { xtype: 'tbfill' },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'},
        {
            xtype: 'button',
            text: '更 多',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Magnifierzoomin'
        },
    ]
});
//大修历史工单表格
var jxjjgrid1 = Ext.create('Ext.grid.Panel', {
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    height:90,
    columnLines: true,
    border: true,
    columns: [
        {text: '序号'},
        {text: '机具编码'},
        {text: '机具名称'},
        {text: '机具归属地'},
        {text: '机具用途'},
        {text: '机具类型'},
        {text: '机具状态'},
        {text: '机具定额'},
        {text: '机具台时'}
    ]
});
//大修历史工单
var jxjj = Ext.create('Ext.panel.Panel', {
    region:'north',
    border:false,
    frame: false,
    width:'100%',
    renderTo: Ext.getBody(),
    items: [jxjjtool1,jxjjgrid1]
});
//检修物料工单表单
var jxwltool1 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    height:32,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '检修物料',
        { xtype: 'tbfill' },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'},
        {
            xtype: 'button',
            text: '更 多',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Magnifierzoomin'
        },
    ]
});
//检修机具表单
var jxjjtool1 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    //baseCls: 'my-panel-no-border',
    layout: 'column',
    height:32,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '检修机具',
        { xtype: 'tbfill' },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'},
        {
            xtype: 'button',
            text: '更 多',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Magnifierzoomin'
        },
    ]
});
//大修历史工单表格
var jxjjgrid1 = Ext.create('Ext.grid.Panel', {
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    height:90,
    columnLines: true,
    border: true,
    columns: [
        {text: '序号'},
        {text: '机具编码'},
        {text: '机具名称'},
        {text: '机具归属地'},
        {text: '机具用途'},
        {text: '机具类型'},
        {text: '机具状态'},
        {text: '机具定额'},
        {text: '机具台时'}
    ]
});
//大修历史工单
var jxjj = Ext.create('Ext.panel.Panel', {
    region:'north',
    border:false,
    frame: false,
    width:'100%',
    renderTo: Ext.getBody(),
    items: [jxjjtool1,jxjjgrid1]
});
//检修工具表单
var jxjj1tool1 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    height:32,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '检修工具',
        { xtype: 'tbfill' },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'},
        {
            xtype: 'button',
            text: '更 多',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Magnifierzoomin'
        },
    ]
});
//检修工具表格
var jxjj1grid1 = Ext.create('Ext.grid.Panel', {
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    height:90,
    columnLines: true,
    border: true,
    columns: [
        {text: '序号'},
        {text: '工具编码'},
        {text: '工具名称'},
        {text: '工具存放地'},
        {text: '工具用途'},
        {text: '工具类型'},
        {text: '使用人'},
        {text: '工具定额'},
        {text: '工具台时'}
    ]
});
//检修机具
var jxjj1 = Ext.create('Ext.panel.Panel', {
    region:'north',
    border:false,
    frame: false,
    width:'100%',
    renderTo: Ext.getBody(),
    items: [jxjj1tool1,jxjj1grid1]
});
//检修物料表单
var jxwl1tool1 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    //baseCls: 'my-panel-no-border',
    layout: 'column',
    height:32,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '检修物料',
        { xtype: 'tbfill' },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'},
        {
            xtype: 'button',
            text: '更 多',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Magnifierzoomin'
        },
    ]
});
//检修物料表格
var jxwlgrid = Ext.create('Ext.grid.Panel', {
    id:'jxwlgrid',
    store:jxwlStore,
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    height:90,
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '物料编码',width: 200, dataIndex: 'V_WLCODE', align: 'center',renderer:atleft},
        {text: '物料名称',width: 200, dataIndex: 'V_WLSM', align: 'center',renderer:atleft},
        {text: '规格型号',width: 200, dataIndex: 'V_GGXH', align: 'center',renderer:atleft},
        {text: '单价',width: 200, dataIndex: 'V_PRICE', align: 'center',renderer:atright},
        {text: '数量',width: 200, dataIndex: 'V_USE_NUM', align: 'center',renderer:atright}
    ]
});
//检修物料
var jxwl = Ext.create('Ext.panel.Panel', {
    region:'north',
    border:false,
    frame: false,
    width:'100%',
    renderTo: Ext.getBody(),
    items: [jxwl1tool1,jxwlgrid]
});
//检修安全措施表单
var jxaqcstool1 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    //baseCls: 'my-panel-no-border',
    layout: 'column',
    height:32,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '检修安全措施',
        { xtype: 'tbfill' },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'},
        {
            xtype: 'button',
            text: '更 多',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Magnifierzoomin'
        },
    ]
});
//检修安全措施表格
var jxaqcsgrid1 = Ext.create('Ext.grid.Panel', {
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    height:90,
    columnLines: true,
    border: true,
    columns: [
        {text: '序号'},
        {text: '安全措施名称'},
        {text: '安全措施版本号'},
        {text: '附件'}
    ]
});
//检修安全措施
var jxaqcs = Ext.create('Ext.panel.Panel', {
    region:'north',
    border:false,
    frame: false,
    width:'100%',
    renderTo: Ext.getBody(),
    items: [jxaqcstool1,jxaqcsgrid1]
});
//检修技术要求表单
var jxjsyqtool1 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    //baseCls: 'my-panel-no-border',
    layout: 'column',
    height:32,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '检修技术要求',
        { xtype: 'tbfill' },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'},
        {
            xtype: 'button',
            text: '更 多',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Magnifierzoomin'
        },
    ]
});
//检修技术要求表格
var jxjsyqgrid1 = Ext.create('Ext.grid.Panel', {
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    height:170,
    columnLines: true,
    border: true,
    columns: [
        {text: '序号'},
        {text: '零件编号'},
        {text: '零件名称'},
        {text: '零件编号'},
        {text: '允许值（上限）'},
        {text: '允许值（下限）'},
        {text: '附件'}
    ]
});
//检修技术要求
var jxjsyq = Ext.create('Ext.panel.Panel', {
    region:'north',
    border:false,
    frame: false,
    width:'100%',
    renderTo: Ext.getBody(),
    items: [jxjsyqtool1,jxjsyqgrid1]
});
//大修计划右边布局
var dxjhsbright = Ext.create('Ext.panel.Panel', {
    region:'east',
    border:false,
    frame: false,
    width:1290,
    renderTo: Ext.getBody(),
    items: [jxgz,jxwl,jxjj,jxjj1,jxaqcs,jxjsyq]
});
//大修计划检修模型明细
var MXclickW = Ext.create('Ext.window.Window', {
    id: 'MXclickW',
    width: 1700,
    height: 800,
    title: '大修计划检修模型明细',
    modal: true,
    frame: true,
    closeAction: 'hide',
    closable: true,
    layout: 'border',
    items: [gxgrid,dxjhsbright]
});
Ext.onReady(function () {
    Ext.QuickTips.init();
    //border布局 最多可将页面划分为5个区域
    //使用Viewport容器 可自适应页面窗口大小
    //一个页面只可有一个viewport
    new Ext.Viewport({
        title: "border layout",
        layout: "border",
        border:"false",
        defaults: {
            bodyStyle: "background-color: #FFFFFF;",
            frame: true
        },
        items: [northPanel,centerPanel]
    });

    QueryPageLoad();

    Ext.getCmp('zyq').on('select',function(){
        Ext.data.StoreManager.lookup('zyStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTNEXTCODE: DeptCode
            }
        });

        Ext.data.StoreManager.lookup('wxlxStore').load({
            params: {
                IS_V_BASETYPE:'PM_DX/REPAIRTYPE'
            }
        })

        Ext.data.StoreManager.lookup('repairDeptStore').load({
            params:{
                V_V_DEPTCODE:DeptCode
            }
        });

        Ext.data.StoreManager.lookup('fzPerStore').load({
            params:{
                V_V_SPECIALTYCODE : Ext.getCmp('zy').getValue(),
                V_V_POSTCODE : '0101020104',
                V_V_DEPTCODE : Ext.getCmp('zyq').getValue()
            }
        })
    });

    Ext.getCmp('zyq').on('select',function(){
        Ext.data.StoreManager.lookup('fzPerStore').load({
            params:{
                V_V_SPECIALTYCODE : Ext.getCmp('zy').getValue(),
                V_V_POSTCODE : '0101020104',
                V_V_DEPTCODE : Ext.getCmp('zyq').getValue()
            }
        })
    })

});
//加载添加页面
function QueryPageLoad(){

    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PRO_PM_03_PLAN_PROJECT_SEL',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID:Guid,
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.list!=null){
                Ext.getCmp('northPanel').setTitle(resp.list[0].V_YEAR+"年"+resp.list[0].V_ORGNAME+"年计划编制");
                OrgCode=resp.list[0].V_ORGCODE;
                DeptCode=resp.list[0].V_DEPTCODE;
                ZyCode=resp.list[0].V_SPECIALTY;
                WxlxCode=resp.list[0].V_WXTYPECODE;
                repairDept=resp.list[0].V_REPAIRDEPTCODE
                fzrPer=resp.list[0].V_SPECIALTYMANCODE;

                Ext.getCmp('ProjectCode').setValue(resp.list[0].V_PORJECT_CODE);
                Ext.getCmp('ProjectName').setValue(resp.list[0].V_PORJECT_NAME);
                Ext.getCmp('content').setValue(resp.list[0].V_CONTENT);

                QueryZYQ();
                QueryDefect()
                QueryModel();
            }
        }
    });

    QueryCGrid();
}
//查询设备
function QueryCGrid(){
    Ext.data.StoreManager.lookup('cgridStore').load({
        params:{
            V_V_PLANGUID:Guid
        }
    })
}
//加载作业区下拉,专业下拉
function QueryZYQ(){
    Ext.data.StoreManager.lookup('zyqStore').load({
        params: {
            'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
            'V_V_DEPTCODE': OrgCode,
            'V_V_DEPTCODENEXT': '%',
            'V_V_DEPTTYPE': '主体作业区'
        }
    });

    Ext.data.StoreManager.lookup('zyqStore').on('load',function(){
        Ext.getCmp('zyq').select(DeptCode);

        Ext.data.StoreManager.lookup('zyStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTNEXTCODE: DeptCode
            }
        });

        Ext.data.StoreManager.lookup('wxlxStore').load({
            params: {
                IS_V_BASETYPE:'PM_DX/REPAIRTYPE'
            }
        })

        Ext.data.StoreManager.lookup('repairDeptStore').load({
           params:{
               V_V_DEPTCODE:DeptCode
           }
        });

    })

    if(ZyCode==''){
        Ext.data.StoreManager.lookup('zyStore').on('load',function(){
            Ext.getCmp('zy').select(Ext.data.StoreManager.lookup('zyStore').getAt(0));

            Ext.data.StoreManager.lookup('fzPerStore').load({
                params:{
                    V_V_SPECIALTYCODE : Ext.getCmp('zy').getValue(),
                    V_V_POSTCODE : '0101020104',
                    V_V_DEPTCODE : Ext.getCmp('zyq').getValue()
                }
            })
        });
    }else{
        Ext.data.StoreManager.lookup('zyStore').on('load',function(){
            Ext.getCmp('zy').select(ZyCode);

            Ext.data.StoreManager.lookup('fzPerStore').load({
                params:{
                    V_V_SPECIALTYCODE : Ext.getCmp('zy').getValue(),
                    V_V_POSTCODE : '0101020104',
                    V_V_DEPTCODE : Ext.getCmp('zyq').getValue()
                }
            })
        });
    }

    if(WxlxCode==''){
        Ext.data.StoreManager.lookup('wxlxStore').on('load',function(){
            Ext.getCmp('wxlx').select(Ext.data.StoreManager.lookup('wxlxStore').getAt(0));
        });
    }else{
        Ext.data.StoreManager.lookup('wxlxStore').on('load',function(){
            Ext.getCmp('wxlx').select(WxlxCode);
        });
    }

    if(repairDept==''){
        Ext.data.StoreManager.lookup('repairDeptStore').on('load',function(){
            Ext.getCmp('repairDept').select(Ext.data.StoreManager.lookup('repairDeptStore').getAt(0));
        });
    }else{
        Ext.data.StoreManager.lookup('repairDeptStore').on('load',function(){
            Ext.getCmp('repairDept').select(repairDept);
        });
    }

    if(fzrPer==''){
        Ext.data.StoreManager.lookup('fzPerStore').on('load',function(){
            Ext.getCmp('fzPer').select(Ext.data.StoreManager.lookup('fzPerStore').getAt(0));
        });
    }else{
        Ext.data.StoreManager.lookup('fzPerStore').on('load',function(){
            Ext.getCmp('fzPer').select(fzrPer);
        });
    }

}
//添加设备
function btnAdd_jdsb(){

    Ext.data.StoreManager.lookup('EquTypeStore').load({
        params:{
            V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODENEXT:Ext.getCmp('zyq').getValue()
        }
    });

    Ext.data.StoreManager.lookup('EquTypeStore').on('load',function(){
        Ext.getCmp('EquType').select( Ext.data.StoreManager.lookup('EquTypeStore').getAt(0));
        QueryEquGrid();
        QueryYxEquGrid();
    });



    Ext.getCmp("btnAdd_jdsb").show();
}
//关闭添加设备win
function winClose(){
    QueryCGrid();
    Ext.getCmp("btnAdd_jdsb").hide();
}
//查询设备
function QueryEquGrid(){
    Ext.data.StoreManager.lookup('sbGridStore').load({
        params:{
            V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODENEXT:Ext.getCmp('zyq').getValue(),
            V_V_EQUTYPECODE:Ext.getCmp('EquType').getValue()
        }
    });
}
//查询已选择的设备
function QueryYxEquGrid(){
    Ext.data.StoreManager.lookup('yxsbGridStore').load({
        params:{
            V_V_PLANGUID:Guid
        }
    })
}
//选择设备
function importEqu(a, record, item){
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_EQU_SET',
        method: 'POST',
        async: false,
        params: {
            V_V_PLANGUID:Guid,
            V_V_EQUTYPECODE:Ext.getCmp("EquType").getValue(),
            V_V_EQUCODE:record.data.V_EQUCODE
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.V_INFO=='成功'){
                QueryYxEquGrid();
            }else{
                alert("添加失败");
            }
        }
    });
}
//删除选中设备
function DelEqu(value, metaData, record) {
    return '<a href="#" onclick="_deleteEqu(\'' + record.data.V_EQUCODE + '\')">' + '删除' + '</a>';
}
function _deleteEqu(equcode){

    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_EQU_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_PLANGUID:Guid,
            V_V_EQUCODE:equcode
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.V_INFO=='成功'){
                QueryCGrid();
                QueryYxEquGrid();
            }else{
                alert("删除失败");
            }
        }
    });

}
//查看更多设备
function LookMoreEqu(){
    var owidth = window.document.body.offsetWidth - 600;
    var oheight = window.document.body.offsetHeight - 100;
    window.open(AppUrl + 'page/PM_03020101/MoreEqu.html?guid=' +Guid + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
}
//查询已选中缺陷
function QueryDefect(){
    Ext.data.StoreManager.lookup('qxGridStore').load({
       params:{
           V_V_PROJECT_GUID:Guid
       }
    });
}
//添加缺陷
function btnAdd_tjqx(){
    var num=0;
    var sequ='';
    var equleng=Ext.data.StoreManager.lookup('cgridStore').data.items;
    if(equleng.length>0){

        for(var i=0;i<equleng.length;i++){
            if(i==0){
                sequ=equleng[i].data.V_EQUCODE;
            }else{
                if(sequ.indexOf(equleng[i].data.V_EQUCODE)=='-1'){
                    sequ=sequ+","+equleng[i].data.V_EQUCODE;
                    num++;
                }
            }
        }

        if(num>0){
            QueryQxEquGrid();
            Ext.getCmp("dbtnAdd_tjqx").show();
        }else{

            Ext.data.StoreManager.lookup('qxAddStore').load({
                params:{
                    V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),
                    V_V_EQUCODE:sequ,
                    V_V_STATECODE:'10'
                }
            })

            Ext.getCmp("btnAdd_tjqx").show();
        }

    }else{
        alert('请选择设备！');
    }
}
//查询大修设备用于选择缺陷
function QueryQxEquGrid(){
    Ext.data.StoreManager.lookup('qxEquStore').load({
        params:{
            V_V_PLANGUID:Guid
        }
    })
}
//根据设备查询缺陷
function QueryQxByEqu(a, record){
    Ext.data.StoreManager.lookup('dqxgridStore').load({
        params:{
            V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),
            V_V_EQUCODE:record.data.V_EQUCODE,
            V_V_STATECODE:'10'
        }
    })
}
//单设备保存缺陷
function SaveQx(){
    var selectedRecord = Ext.getCmp('qxAdd').getSelectionModel().getSelection();
    var num=0

    for(var i=0;i<selectedRecord.length;i++){
        Ext.Ajax.request({
            url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SET_PD',
            method: 'POST',
            async: false,
            params: {
                V_V_DEFECT_GUID: selectedRecord[i].data.V_GUID,
                V_V_PROJECT_GUID: Guid
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                num++;
            }
        });
    }

    if(num==selectedRecord.length){
        winQxClose();
        QueryDefect();
    }

}
//多设备保存缺陷
function OnBtnAddQx(a, record){
    Ext.Ajax.request({
        url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SET_PD',
        method: 'POST',
        async: false,
        params: {
            V_V_DEFECT_GUID: record.data.V_GUID,
            V_V_PROJECT_GUID: Guid
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if(resp.V_INFO=='SUCCESS'){
                QueryDefect();
            }else{
                alert("添加失败！")
            }
        }
    });
}
//关闭缺陷win
function winQxClose(){
    Ext.getCmp('btnAdd_tjqx').hide();
}
//删除缺陷
function DelDefect(value, metaData, record){
    return '<a href="#" onclick="_deleteDefect(\'' + record.data.V_GUID + '\')">' + '删除' + '</a>';
}
function _deleteDefect(DefectGuid){
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_DEFECT_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_PROJECT_GUID:Guid,
            V_V_DEFECT_GUID:DefectGuid
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.V_INFO=='SUCCESS'){
                QueryDefect();
            }else{
                alert("删除失败");
            }
        }
    });
}
//查看更多缺陷
function OnLookMoreDefect(){
    var owidth = window.document.body.offsetWidth - 600;
    var oheight = window.document.body.offsetHeight - 100;
    window.open(AppUrl + 'page/PM_03020101/MoreDefect.html?guid=' +Guid + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=no' );
}
//查询已选检修模型
function QueryModel(){
    Ext.data.StoreManager.lookup('mxStore').load({
        params:{
            V_V_PROJECT_GUID:Guid
        }
    })
}
//添加检修模型
function btnAdd_jxmx(){
    QueryMobelAll();
    Ext.getCmp("btnAdd_jxmx").show();
}
//查询该设备类型所有检修模型
function QueryMobelAll(){
    var num=0;
    var sequ='';
    var equleng=Ext.data.StoreManager.lookup('cgridStore').data.items;
    if(equleng.length>0) {

        for (var i = 0; i < equleng.length; i++) {
            if (i == 0) {
                sequ = equleng[i].data.V_EQUCODE;
            } else {
                if (sequ.indexOf(equleng[i].data.V_EQUCODE) == '-1') {
                    sequ = sequ + "," + equleng[i].data.V_EQUCODE;
                }
            }
        }

        Ext.data.StoreManager.lookup('mxAllStore').load({
            params:{
                V_V_ORGCODE:OrgCode,
                V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),
                V_V_EQUTYPE:'',
                V_V_EQUCODE:sequ
            }
        });
    }else{
        alert('请选择设备！')
    }


}
//添加检修模型
function SaveMx(){
    var selectedRecords=Ext.getCmp('mxAllGrid').getSelectionModel().getSelection();
    if(selectedRecords.length>0){
        var num=0;
        for(var i=0;i<selectedRecords.length;i++){
            Ext.Ajax.request({
                url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_MODEL_SET',
                method: 'POST',
                async: false,
                params: {
                    V_V_PORJECTGUID:Guid,
                    V_V_MODELGUID:selectedRecords[i].data.V_MX_CODE,
                    V_V_MODELNAME:selectedRecords[i].data.V_MX_NAME,
                    V_V_BBH:selectedRecords[i].data.V_MXBB_NUM,
                    V_V_BZ:selectedRecords[i].data.V_BZ
                },
                success: function (resp) {
                    var resp=Ext.decode(resp.responseText);
                    if(resp.V_INFO=='SUCCESS'){
                        num++;
                    }else{
                        num++;
                        alert('模型'+selectedRecords[i].data.V_MX_NAME+"添加失败！");
                    }
                }
            });

            if(num==selectedRecords.length){
                winMxClose();
            }
        }

    }else{
        winMxClose();
    }
}
//关闭检修模型win
function winMxClose(){
    QueryModel();
    Ext.getCmp('btnAdd_jxmx').hide();
}
//删除检修模型
function DelModel(value, metaData, record){
    return '<a href="#" onclick="_deleteModel(\'' + record.data.V_MODEL_GUID + '\')">' + '删除' + '</a>';
}
function _deleteModel(ModelGuid){
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_MODEL_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_PROJECT_GUID:Guid,
            V_V_MODEL_GUID:ModelGuid
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.V_INFO=='SUCCESS'){
                QueryModel();
            }else{
                alert("删除失败");
            }
        }
    });
}
//查看检修模型明细
function MXclick(mxguid){
    QueryJxgx(mxguid);
    QueryJxgz(mxguid)
    QueryJxwl(mxguid)
    Ext.getCmp("MXclickW").show();
}
//查询工序
function QueryGx(a, record){
    Ext.data.StoreManager.lookup('jxgxStore').load({
        params:{
            V_V_JXMX_CODE:record.data.V_MX_CODE
        }
    })
}
function QueryJxgx(mxguid){
    Ext.data.StoreManager.lookup('gxStore').load({
        params:{
            V_V_JXMX_CODE:mxguid
        }
    })
}

//查询工种
function QueryJxgz(mxguid){
    Ext.data.StoreManager.lookup('gxStore').load({
        params:{
            V_V_JXGX_CODE:jxgzStore
        }
    })
}

//查询物料
function QueryJxwl(mxguid){
    Ext.data.StoreManager.lookup('jxwlStore').load({
        params:{
            V_V_JXGX_CODE:jxgzStore
        }
    })
}


//查询机具

//查询工具

//查询安全措施

//查询技术要求

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}