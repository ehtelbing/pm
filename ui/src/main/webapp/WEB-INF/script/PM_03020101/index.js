var Guid="";
var OrgCode='';
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
            text: '单设备缺陷',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Tableadd',
            handler:btnAdd_tjqx
        },
        {
            xtype: 'button',
            text: '多设备缺陷',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Tableadd',
            handler:dbtnAdd_tjqx
        },

        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8' },
        {
            xtype: 'button',
            text: '临时保存',
            margin: '5 0 5 0',
            iconCls:'Tablesave',


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

/*左上tab标签开始*/
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
/*左上tab标签结局*/
var Toolpanel = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    //baseCls: 'my-panel-no-border',
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
/*左上tab下面布局*/
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
        {text: '固定资产',dataIndex:'gdzc',width:160}

    ]
});
var ToolpanelB  = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    //baseCls: 'my-panel-no-border',
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
var ToolpanelC  = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    //baseCls: 'my-panel-no-border',
    layout: 'column',
    height:35,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2 !important;',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        {
            xtype : 'combo',
            editable : false,
            queryMode : 'local',
            fieldLabel : '开工时间',
            margin:'5 5 5 15',
            labelWidth :60,
            width:170,
            labelAlign : 'right'
        },
        {
            xtype : 'combo',
            editable : false,
            queryMode : 'local',
            fieldLabel : '竣工时间',
            margin:'5 5 5 15',
            labelWidth :60,
            width:170,
            labelAlign : 'right'
        },
        {
            xtype : 'combo',
            editable : false,
            queryMode : 'local',
            fieldLabel : '检修单位',
            margin:'5 5 5 15',
            labelWidth :60,
            width:170,
            labelAlign : 'right'
        },
        {
            xtype : 'combo',
            editable : false,
            queryMode : 'local',
            fieldLabel : '负责人',
            margin:'5 5 5 10',
            labelWidth :60,
            width:170,
            labelAlign : 'right'
        },
        {
            xtype: 'textfield',
            fieldLabel: '计划费用',
            labelWidth: 60,
            width:170,
            margin:'5 5 5 20',
            name : 'field1'
        }
    ]
});
var gcxmwlsgt = Ext.create('Ext.panel.Panel', {
    region: 'center',
    width: '100%',
    frame: false,
    border: false,
    //baseCls: 'my-panel-no-border',
    layout: 'hbox',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    items: [centerPanel]
});
var TOPGIRDLEFTtool = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    //baseCls: 'my-panel-no-border',
    layout: 'column',
    height:32,
    width:'100%',
    margin:'0',

    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '<div style="height:50px;line-height:30px;">缺陷明细</div>',

    ]
});
var TOPGIRDRIGHTTtool = Ext.create('Ext.form.Panel', {
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
        '缺陷明细',
        { xtype: 'tbfill' },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'},
        {
            xtype: 'button',
            text: '查看更多',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Magnifierzoomin'
        }
    ]
});
var TOPGIRDRIGHTtable = Ext.create('Ext.grid.Panel', {
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    columnLines: true,
    border: true,
    columns: [
        {text: '序号',dataIndex:'gysbh'},
        {text: '缺陷类型',dataIndex:'gysmc'},
        {text: '缺陷明细',dataIndex:'gysqc'}
    ]
});
var TOPGIRDLEFTtable = Ext.create('Ext.grid.Panel', {
    region: "center",
    split: true,
    width:'100%',
    bodyStyle:'float:right !important',
    margin:'0px',
    columnLines: true,
    border: true,
    columns: [
        {text: '序号',dataIndex:'gysbh'},
        {text: '缺陷类型',dataIndex:'gysmc'},
        {text: '缺陷明细',dataIndex:'gysqc'}
    ]
});
var TOPGIRDLEFT = Ext.create('Ext.panel.Panel', {
    region: 'border',
    width: '50%',
    frame: false,
    border: false,
    //baseCls: 'my-panel-no-border',
    layout: 'vbox',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    items: [TOPGIRDLEFTtool,TOPGIRDLEFTtable]
})
var TOPGIRDRIGHT = Ext.create('Ext.panel.Panel', {
    region: 'border',
    width: '50%',
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

    //baseCls: 'my-panel-no-border',
    layout: 'hbox',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    items: [TOPGIRDLEFT,TOPGIRDRIGHT]
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
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    columnLines: true,
    border: false,
    columns: [
        {text: '序号',dataIndex:'gysbh'},
        {text: '机具编码',dataIndex:'gysmc'},
        {text: '机具名称',dataIndex:'gysqc'},
        {text: '工具归属地',dataIndex:'gysmc'},
        {text: '使用时长',dataIndex:'gysqc'},
        {text: '使用开始时间',dataIndex:'gysmc'},
        {text: '使用结束时间',dataIndex:'gysqc'}

    ]
});
var jxmx2 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    //baseCls: 'my-panel-no-border',
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
//设备明细部份
var sbPanel=Ext.create('Ext.panel.Panel',{
   region:'north',
   layout:'column',
   frame:true,
   wdith:'100%',
   items:[{ xtype: 'combo',fieldLabel: '设备类型',store: EquTypeStore,id:'EquType',editable : false,queryMode : 'local',displayField: 'V_EQUTYPENAME', valueField: 'V_EQUTYPECODE',labelWidth: 75, width:265,margin:'5 5 5 0',labelAlign:'right'},
          {xtype: 'button',text: '查询', margin: '5 0 5 0',bodyStyle:'float:right;',iconCls:'Magnifierzoomin' ,listeners:{click:QueryEquGrid}},
          {xtype: 'button',text: '确认返回', margin: '5 0 5 0',bodyStyle:'float:right;',iconCls:'Tablesave' ,listeners:{click:winClose}}]
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



//添加设备右边布局

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

//添加缺陷表格
var tjqxgrid = Ext.create('Ext.grid.Panel', {
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    columnLines: true,
    border: true,
    columns: [
        {text: '序号'},
        {text: '设备名称'},
        {text: '缺陷类型'},
        {text: '缺陷内容'},
        {text: '缺陷日期'}
    ]
});
var tjqxtree = Ext.create('Ext.panel.Panel', {
    layout: 'border',
    region:'west',
    width:260,
    border:false,
    items: [],
    renderTo: Ext.getBody()

});
var tjqxgrid1 = Ext.create('Ext.grid.Panel', {
    region: "center",
    split: true,
    width:540,
    margin:'0px',
    columnLines: true,
    border: true,
    columns: [
        {text: '序号'},
        {text: '设备名称'},
        {text: '缺陷类型'},
        {text: '缺陷内容'},
        {text: '缺陷日期'}
    ]
});
var dbtnAdd_tjqx = Ext.create('Ext.window.Window', {
    id: 'dbtnAdd_tjqx',
    width: 850,
    height: 400,
    title: '缺陷选择',
    modal: true,
    frame: true,
    closeAction: 'hide',
    closable: true,
    layout: 'border',
    items: [tjqxtree,tjqxgrid1]
});
//添加缺陷弹出窗口
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
    items: [tjqxgrid]
});
//检修模型表单1
var jxmxgrid1 = Ext.create('Ext.grid.Panel', {
    region: "north",
    split: true,
    width:'100%',
    margin:'0px',
    height:150,
    //store:jxmxmx,
    columnLines: true,
    border: true,
    columns: [
        {text: '序号'},
        {text: '设备类型', dataIndex:'A'},
        {text: '模型名称', dataIndex:'B'},
        {text: '版本号', dataIndex:'C'},
        {text: '查看明细',renderer:function(value,metaData,record){
                return '<a href="#" onclick="MXclick()">'+'查看详细'+'</a>'
            }}
    ]
});

//检修模型表单2
var jxmxgrid2 = Ext.create('Ext.grid.Panel', {
    region: "north",
    split: true,
    width:'100%',
    margin:'0px',
    height:150,
    columnLines: true,
    border: true,
    columns: [
        {text: '序号'},
        {text: '模型名称'},
        {text: '工序名称'},
        {text: '检修人员'},
        {text: '物料信息'},
        {text: '检修机具'},
        {text: '检修工具'},
        {text: '技术要求'},
        {text: '安全措施'}
    ]
});
//检修模型弹出窗口
var btnAdd_jxmx = Ext.create('Ext.window.Window', {
    id: 'btnAdd_jxmx',
    width: 850,
    height: 400,
    title: '检修模型',
    modal: true,
    frame: true,
    closeAction: 'hide',
    closable: true,
    layout: 'border',
    items: [jxmxgrid1,jxmxgrid2]
});
//大修计划设备明细
var dxjhsbleft = Ext.create('Ext.grid.Panel', {
    region: 'west',
    split: true,
    width:400,
    height:200,
    margin:'0px',
    columnLines: true,
    border: true,
    layout: 'column',
    columns: [
        {text: '序号'},
        {text: '工序名称'}

    ]
});
//大修历史缺陷
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
    //baseCls: 'my-panel-no-border',
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
        },
    ]
});

//检修人员表格
var jxrygrid1 = Ext.create('Ext.grid.Panel', {
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    height:90,
    columnLines: true,
    border: true,
    columns: [
        {text: '序号'},
        {text: '人员编码'},
        {text: '人员姓名'},
        {text: '工种名称'},
        {text: '工种类型'},
        {text: '定额'},
        {text: '台时'}
    ]
});

//检修人员
var jxry = Ext.create('Ext.panel.Panel', {
    region:'north',
    border:false,
    frame: false,
    width:'100%',
    renderTo: Ext.getBody(),
    items: [jxrytool1,jxrygrid1]
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
    //baseCls: 'my-panel-no-border',
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
var jxwlgrid1 = Ext.create('Ext.grid.Panel', {
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    height:90,
    columnLines: true,
    border: true,
    columns: [
        {text: '序号'},
        {text: '物料编码'},
        {text: '物料名称'},
        {text: '规格型号'},
        {text: '单价'},
        {text: '数量'}
    ]
});
//检修物料
var jxwl = Ext.create('Ext.panel.Panel', {
    region:'north',
    border:false,
    frame: false,
    width:'100%',
    renderTo: Ext.getBody(),
    items: [jxwl1tool1,jxwlgrid1]
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
    items: [jxry,jxwl,jxjj,jxjj1,jxaqcs,jxjsyq]
});
//大修计划设备添加
var MXclickW = Ext.create('Ext.window.Window', {
    id: 'MXclickW',
    width: 1700,
    height: 800,
    title: '大修计划设备添加',
    modal: true,
    frame: true,
    closeAction: 'hide',
    closable: true,
    layout: 'border',
    items: [dxjhsbleft,dxjhsbright]
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
                QueryZYQ(resp.list[0].V_DEPTCODE,resp.list[0].V_SPECIALTY,resp.list[0].V_WXTYPECODE);

            }
        }
    });

    Ext.data.StoreManager.lookup('cgridStore').load({
        params:{
            V_V_PLANGUID:Guid
        }
    })
}

//记载作业区下拉,专业下拉
function QueryZYQ(DeptCode,ZyCode,WxlxCode){
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
    })

    if(ZyCode==''){
        Ext.data.StoreManager.lookup('zyStore').on('load',function(){
            Ext.getCmp('zy').select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
        });
    }else{
        Ext.data.StoreManager.lookup('zyStore').on('load',function(){
            Ext.getCmp('zy').select(ZyCode);
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

}

//事件部份
function MXclick(){
    Ext.getCmp("MXclickW").show();
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

function winClose(){
    Ext.getCmp("btnAdd_jdsb").hide();
}

function QueryEquGrid(){
    Ext.data.StoreManager.lookup('sbGridStore').load({
        params:{
            V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODENEXT:Ext.getCmp('zyq').getValue(),
            V_V_EQUTYPECODE:Ext.getCmp('EquType').getValue()
        }
    });
}

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
    return '<a href="#" onclick="_delete(\'' + record.data.V_PLANGUID + '\')">' + '删除' + '</a>';
}

function _delete(equcode){

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
                QueryYxEquGrid();
            }else{
                alert("添加失败");
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

function btnAdd_tjqx(){
    Ext.getCmp("btnAdd_tjqx").show();
}
function dbtnAdd_tjqx(){
    Ext.getCmp("dbtnAdd_tjqx").show();
}
function btnAdd_jxmx(){
    Ext.getCmp("btnAdd_jxmx").show();
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}