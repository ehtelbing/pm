var flag;
//年份
var today = new Date();
var Year = [];
for (var i = today.getFullYear() - 1; i <= today.getFullYear() + 3; i++)Year.push({displayField: i, valueField: i});

var yearStore = Ext.create('Ext.data.Store', {
    id: 'yearStore',
    autoLoad: true,
    fields: ['displayField', 'valueField'],
    data: Year,
    proxy: {
        type: 'memory',
        render: {
            type: 'json'
        }
    }
});
//施工单位
var jxdwStore = Ext.create('Ext.data.Store', {
    autoLoad: true,
    storeId: 'jxdwStore',
    fields: ['V_DEPTREPAIRCODE', 'V_DEPTREPAIRNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'basic/PRO_PM_REPAIRDEPT_VIEW',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            'V_V_DEPTCODE': Ext.util.Cookies.get('v_deptcode')
        }
    }
});
//厂矿
var ckStore = Ext.create('Ext.data.Store', {
    autoLoad: true,
    storeId: 'ckStore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PROJECT/PRO_BASE_DEPT_VIEW_ROLE',
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
//类型
var lxStore = Ext.create('Ext.data.Store', {
    autoLoad: true,
    storeId: 'lxStore',
    fields: ['V_TYPE_CODE', 'V_TYPE_NAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PROJECT/PM_04_PROJECT_TYPE_SEL',
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
//专业
var zyStore = Ext.create('Ext.data.Store', {
    autoLoad: true,
    storeId: 'zyStore',
    fields: ['V_MAJOR_CODE', 'V_MAJOR_NAME'],
    proxy: {
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
    }
});
//查询表格
//var gridStore = Ext.create('Ext.data.Store', {
//    id: 'gridStore',
//    pageSize: 15,
//    autoLoad: false,
//    fields: ['I_ID',
//        'V_ORGCODE',
//        'V_ORGNAME',
//        'V_DEPTCODE',
//        'V_DEPTNAME',
//        'V_TYPE_CODE',
//        'V_TYPE_NAME',
//        'V_MAJOR_CODE',
//        'V_MAJOR_NAME',
//        'V_PROJECT_CODE',
//        'V_PROJECT_NAME',
//        'V_WBS_CODE',
//        'V_WBS_NAME',
//        'V_CONTENT',
//        'V_BUDGET_MONEY',
//        'V_REPAIR_DEPTCODE',
//        'V_REPAIR_DEPTNAME',
//        'V_FZRCODE',
//        'V_FZRNAME',
//        'V_DATE_B',
//        'V_DATE_E',
//        'V_BZ',
//        'V_FLOW_STATE',
//        'V_INPERCODE',
//        'V_INPERNAME',
//        'V_INTIEM'],
//    proxy: {
//        type: 'ajax',
//        async: false,
//        url: AppUrl + 'PROJECT/PM_04_PROJECT_DATA_ITEM_SEL',
//        actionMethods: {
//            read: 'POST'
//        },
//        reader: {
//            type: 'json',
//            root: 'list',
//            total: 'total'
//        }
//    }
//});

var gridWinStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridWinStore',
    fields: [
        'I_ID',
        'V_ORGCODE',
        'V_ORGNAME',
        'V_DEPTCODE',
        'V_DEPTNAME',
        'V_TYPE_CODE',
        'V_TYPE_NAME',
        'V_MAJOR_NAME',
        'V_MAJOR_CODE',
        'V_PROJECT_CODE',
        'V_PROJECT_NAME',
        'V_WBS_CODE',
        'V_WBS_NAME',
        'V_CONTENT',
        'V_BUDGET_MONEY',
        'V_REPAIR_DEPTCODE',
        'V_REPAIR_DEPTNAME',
        'V_FZRCODE',
        'V_FZRNAME',
        "V_FZR",
        'V_DATE_B',
        'V_DATE_E',
        'V_BZ',
        'V_FLOW_STATE',
        'V_INPERCODE',
        'V_INPERNAME',
        'V_INTIEM',
        'V_FALG',
        'V_YEAR',
        'V_MONTH',
        'V_PROJECT_CODE_UP',
        'V_PROJECT_NAME_UP',
        'V_WBS_CODE_UP',
        'RN'
    ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PROJECT/PM_040303PTREE',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var treegridStore = Ext.create('Ext.data.TreeStore',
    {
        id : 'treegridStore',
        autoLoad : false,
        fields : [ 'I_ID',
            'V_ORGCODE',
            'V_ORGNAME',
            'V_DEPTCODE',
            'V_DEPTNAME',
            'V_TYPE_CODE',
            'V_TYPE_NAME',
            'V_MAJOR_CODE',
            'V_MAJOR_NAME',
            'V_PROJECT_CODE',
            'V_PROJECT_NAME',
            'V_WBS_CODE',
            'V_WBS_NAME',
            'V_CONTENT',
            'V_BUDGET_MONEY',
            'V_REPAIR_DEPTCODE',
            'V_REPAIR_DEPTNAME',
            'V_FZRCODE',
            'V_FZRNAME',
            'V_DATE_B',
            'V_DATE_E',
            'V_BZ',
            'V_FLOW_STATE',
            'V_INPERCODE',
            'V_INPERNAME',
            'V_INTIEM' ],
        /*proxy : {
            type : 'ajax',
            async: false,
            url: AppUrl + 'PROJECT/PM_04_PROJECT_DATA_ITEM_SEL',
            actionMethods : {
                read : 'POST'
            },
            extraParams : {
                V_V_YEAR: Ext.getCmp('year').getValue(),
                V_V_ORGCODE: Ext.getCmp('ck').getValue(),
                V_V_TYPE_CODE: Ext.getCmp('lx').getValue(),
                V_V_MAJOR_CODE: Ext.getCmp('zy').getValue(),
                V_V_TEXT: Ext.getCmp('text').getValue(),
                V_V_PAGE: Ext.getCmp('page').store.currentPage,
                V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
            }
        },*/
        folderSort : true
    });
var northPanel = Ext.create('Ext.panel.Panel', {
    border: false,
    region: 'north',
    items: [
        {
            layout: 'column',
            frame: true,
            border: false,
            defaults : {
                style : 'margin:5px 0px 5px 5px',
                labelAlign : 'right'
            },
            items: [
                {
                    xtype: 'combo',
                    id: 'year',
                    fieldLabel: '年份',
                    editable: false,
                    labelWidth: 50,
                    displayField: 'displayField',
                    valueField: 'valueField',
                    value: today.getFullYear(),
                    store: yearStore,
                    queryMode: 'local'
                },
                {
                    xtype: 'combo',
                    id: 'ck',
                    fieldLabel: '单位',
                    labelWidth: 50,
                    displayField: 'V_DEPTNAME',
                    valueField: 'V_DEPTCODE',
                    editable: false,
                    queryMode: 'local',
                    store: ckStore
                },
                {
                    xtype: 'combo',
                    id: 'lx',
                    fieldLabel: '类型',
                    labelWidth: 50,
                    displayField: 'V_TYPE_NAME',
                    valueField: 'V_TYPE_CODE',
                    editable: false,
                    queryMode: 'local',
                    store: lxStore
                },
                {
                    xtype: 'combo',
                    id: 'zy',
                    fieldLabel: '专业',
                    labelWidth: 50,
                    displayField: 'V_MAJOR_NAME',
                    valueField: 'V_MAJOR_CODE',
                    editable: false,
                    queryMode: 'local',
                    store: zyStore
                },
                {xtype: 'textfield', id: 'text', margin: '5 0 5 60',width:158, value: '', emptyText: '工程名称'},
                {xtype: 'button', text: '查询', icon: imgpath + '/search.png', handler: queryGrid},
                {xtype: 'button', text: '添加', icon: imgpath + '/add.png', handler: Add},
                {xtype: 'button', text: '修改', icon: imgpath + '/edit.png', handler: Edit},
                {xtype: 'button', text: '删除', icon: imgpath + '/delete.png', handler: Delete}
            ]
        }
    ]
});
var treeGrid = Ext.create('Ext.tree.Panel', {
    id : 'treeGrid',
    useArrows : true,
    region : 'center',
    rootVisible : false,
    store : treegridStore,
    multiSelect : true,
    singleExpand : true,
    rowLines : true,
    columnLines : true,
   /* selModel : {
        selType : 'checkboxmodel',
        mode : 'SINGLE'
    },*/
    // plugins: [ //可编辑
    // Ext.create('Ext.grid.plugin.CellEditing', {
    // clicksToEdit: 1
    // })
    // ],
    columns : [
        {
            xtype : 'treecolumn', // 'processOutput',
            // 'id','parentId','text','processUnit'
            text : '生产工艺',
            width : 260,
            sortable : true,
            dataIndex : 'V_ORGNAME'
        },
       /* {text: '序号', align: 'center', width: 50, xtype: 'rownumberer'},
        {text: '单位名称', align: 'center', width: 100, dataIndex: 'V_ORGNAME'},
        {text: '类型', align: 'center', width: 100, dataIndex: 'V_TYPE_NAME'},
        {text: '专业', align: 'center', width: 100, dataIndex: 'V_MAJOR_NAME'},
        {text: '工程编码', align: 'center', width: 150, dataIndex: 'V_PROJECT_CODE'},
        {text: '工程名称', align: 'center', width: 100, dataIndex: 'V_PROJECT_NAME'},
        {text: 'WBS编码', align: 'center', width: 150, dataIndex: 'V_WBS_CODE'},
        {text: '主要修理内容', align: 'center', width: 200, dataIndex: 'V_CONTENT'},
        {text: '实施计划额（万元）', align: 'center', width: 100, dataIndex: 'V_BUDGET_MONEY'},
        {text: '施工单位', align: 'center', width: 100, dataIndex: 'V_REPAIR_DEPTNAME'},
        {text: '项目负责人', align: 'center', width: 100, dataIndex: 'V_FZR'},
        {
            text: '预计开工时间',
            align: 'center',
            width: 150,
            dataIndex: 'V_DATE_B',
            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
        },
        {
            text: '预计竣工时间',
            align: 'center',
            width: 150,
            dataIndex: 'V_DATE_E',
            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
        },
        {text: '备注', align: 'center', width: 200, dataIndex: 'V_BZ'},*/
        {
            width : 80,
            text : '操 作',
            xtype : 'templatecolumn',
            tpl : '<a style="cursor:pointer"><img src="' + imgpath
            + '/del.gif"></a>',
            align : 'center',
            listeners : {
                "click" : Delete
            }
        } ]
    //,dockedItems : [ {
    //    xtype : 'panel',
    //    layout : 'column',
    //    // baseCls : 'my-panel-noborder',
    //    frame : true,
    //    items : [ {
    //        xtype : 'button',
    //        text : '新增',
    //       // icon : imgpath + '/add.gif',
    //        style : 'margin:5px 10px 5px 20px',
    //        handler : Add
    //    }, {
    //        xtype : 'button',
    //        text : '修改',
    //       // icon : imgpath + '/edit.gif',
    //        style : 'margin:5px 10px 5px 5px',
    //        handler : Edit
    //    } ]
    //} ]
});
//var gridPanel = Ext.create('Ext.grid.Panel', {
//    id: 'grid',
//    region: 'center',
//    border: false,
//    store: gridStore,
//    selType: 'checkboxmodel',
//    columns: [
//        {text: '序号', align: 'center', width: 50, xtype: 'rownumberer'},
//        {text: '单位名称', align: 'center', width: 100, dataIndex: 'V_ORGNAME'},
//        {text: '类型', align: 'center', width: 100, dataIndex: 'V_TYPE_NAME'},
//        {text: '专业', align: 'center', width: 100, dataIndex: 'V_MAJOR_NAME'},
//        {text: '工程编码', align: 'center', width: 150, dataIndex: 'V_PROJECT_CODE'},
//        {text: '工程名称', align: 'center', width: 100, dataIndex: 'V_PROJECT_NAME'},
//        {text: 'WBS编码', align: 'center', width: 150, dataIndex: 'V_WBS_CODE'},
//        {text: '主要修理内容', align: 'center', width: 200, dataIndex: 'V_CONTENT'},
//        {text: '实施计划额（万元）', align: 'center', width: 100, dataIndex: 'V_BUDGET_MONEY'},
//        {text: '施工单位', align: 'center', width: 100, dataIndex: 'V_REPAIR_DEPTNAME'},
//        {text: '项目负责人', align: 'center', width: 100, dataIndex: 'V_FZR'},
//        {
//            text: '预计开工时间',
//            align: 'center',
//            width: 150,
//            dataIndex: 'V_DATE_B',
//            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
//        },
//        {
//            text: '预计竣工时间',
//            align: 'center',
//            width: 150,
//            dataIndex: 'V_DATE_E',
//            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
//        },
//        {text: '备注', align: 'center', width: 200, dataIndex: 'V_BZ'}
//    ],
//    listeners: {
//        itemdblclick: function (store, records) {
//            queryDetail(records.data.V_PROJECT_CODE, records.data.V_WBS_CODE);
//        }
//    },
//    bbar: ["->",
//        {
//            id: 'page',
//            xtype: 'pagingtoolbar',
//            store: gridStore,
//            width: '100%',
//            dock: 'bottom',
//            displayInfo: true,
//            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
//            emptyMsg: '没有记录'
//        }]
//
//
//});

var win = Ext.create('Ext.window.Window', {
    id: 'win',
    width: 800,
    height: 350,
    title: '工程项目管理',
    modal: true,
    frame: true,
    closeAction: 'hide',
    closable: true,
    layout: 'vbox',
    items: [
        {xtype:'panel',frame:true,width:'100%', baseCls: 'my-panel-no-border',layout:'hbox',
            items:[
                {
                    xtype: 'combo',
                    id: 'winck',
                    fieldLabel: '单位',
                    margin: '5 0 5 5',
                    labelAlign:'right',
                    labelWidth: 150,
                    width: 330,
                    value: '',
                    displayField: 'V_DEPTNAME',
                    valueField: 'V_DEPTCODE',
                    editable: false,
                    queryMode: 'local',
                    store: ckStore
                },
                {
                    xtype: 'combo',
                    id: 'winlx',
                    fieldLabel: '类型',
                    margin: '5 0 5 5',
                    labelAlign:'right',
                    labelWidth: 150,
                    width: 330,
                    value: '',
                    displayField: 'V_TYPE_NAME',
                    valueField: 'V_TYPE_CODE',
                    editable: false,
                    queryMode: 'local',
                    store: lxStore
                }]},
        {xtype:'panel',frame:true,width:'100%', baseCls: 'my-panel-no-border',layout:'hbox',
            items:[
                {xtype: 'combo',
                    id: 'winzy',
                    fieldLabel: '专业',
                    margin: '5 0 5 5',
                    labelAlign:'right',
                    labelWidth: 150,
                    width: 330,
                    value: '',
                    displayField: 'V_MAJOR_NAME',
                    valueField: 'V_MAJOR_CODE',
                    editable: false,
                    queryMode: 'local',
                    store: zyStore
                }, {xtype: 'combo',
                    id: 'winsgdw',
                    fieldLabel: '施工单位',
                    margin: '5 0 5 5',
                    labelAlign:'right',
                    labelWidth: 150,
                    width: 330,
                    value: '',
                    displayField: 'V_DEPTREPAIRNAME',
                    valueField: 'V_DEPTREPAIRCODE',
                    editable: false,
                    queryMode: 'local',
                    store: jxdwStore
                }]},
        {xtype:'panel',frame:true,width:'100%', baseCls: 'my-panel-no-border',layout:'hbox',
            items:[
                {xtype: 'textfield', id: 'winprocode', margin: '5 0 5 5',labelAlign:'right',labelWidth: 150, width: 330, fieldLabel: '工程编码'},
                {xtype: 'textfield', id: 'winproname', margin: '5 0 5 5', labelAlign:'right',labelWidth: 150,width: 330, fieldLabel: '工程名称'}
                ]},
        {xtype:'panel',frame:true,width:'100%', baseCls: 'my-panel-no-border',layout:'hbox',
            items:[
                {xtype: 'textfield', id: 'winxlnr', margin: '5 0 5 5', labelAlign:'right',labelWidth: 150,width: 670, fieldLabel: '主要修理内容'}]},
        {xtype:'panel',frame:true,width:'100%', baseCls: 'my-panel-no-border',layout:'hbox',
            items:[
                {xtype: 'textfield', id: 'winmoney', margin: '5 0 5 5', labelAlign:'right',labelWidth: 150,width: 330, fieldLabel: '实施计划额（万元）'},
                {xtype: 'textfield', id: 'winperson', margin: '5 0 5 5', labelAlign:'right',labelWidth: 150,width: 330, fieldLabel: '项目负责人'}
            ]},
        {xtype:'panel',frame:true,width:'100%', baseCls: 'my-panel-no-border',layout:'hbox',
            items:[
                {xtype: 'textfield', id: 'winwbscode', margin: '5 0 5 5', labelAlign:'right',labelWidth: 150,width: 330, fieldLabel: 'WBS编码'},
                {xtype: 'textfield', id: 'winwbsname', margin: '5 0 5 5', labelAlign:'right',labelWidth: 150,width: 330, fieldLabel: 'WBS名称'}
                ]},
        {xtype:'panel',frame:true,width:'100%', baseCls: 'my-panel-no-border',layout:'hbox',
            items:[
                {
                    xtype: 'datefield',
                    id: 'winstatime',
                    fieldLabel: '预计开工时间',
                    margin: '5 0 5 5',
                    labelAlign: 'right',
                    labelWidth: 150,
                    width: 330,
                    value:Ext.util.Format.date(Ext.Date.add(new Date(),Ext.Date.DAY,+1-today.getDate()),"Y-m-d"),
                    editable: false,
                    format : 'Y-m-d'
                },

                {
                    xtype: 'datefield',
                    id: 'winendtime',
                    fieldLabel: '预计竣工时间',
                    margin: '5 0 5 5',
                    labelAlign: 'right',
                    labelWidth: 150,
                    width: 330,
                    value:Ext.util.Format.date(Ext.Date.add(new Date(),Ext.Date.DAY,+1-today.getDate()),"Y-m-d"),
                    editable: false,
                    format : 'Y-m-d'
                }]},
        {xtype:'panel',frame:true,width:'100%', baseCls: 'my-panel-no-border',layout:'hbox',
            items:[
                {
                    xtype: 'combo',
                    id: 'winyear',
                    fieldLabel: '年份',
                    editable: false,
                    margin: '5 0 5 5',
                    labelAlign: 'right',
                    labelWidth: 150,
                    width: 330,
                    displayField: 'displayField',
                    valueField: 'valueField',
                    value: today.getFullYear(),
                    store: yearStore,
                    queryMode: 'local'
                },
                {xtype: 'textfield', id: 'winbz', margin: '5 0 5 5', labelAlign: 'right',labelWidth: 150,width: 330, fieldLabel: '备注'}
                ]},
        {xtype:'panel',frame:true,width:'100%', baseCls: 'my-panel-no-border',layout:'hbox',
            items:[
                {xtype: 'button', text: '保存', margin: '5 0 5 200',  handler: Save},
                {xtype: 'button', text: '取消', margin: '5 0 5 20',  handler: function () {

                    Ext.getCmp('win').hide();

                }}]}

    ]
});
Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        title: "Viewport",
        layout: "border",
        items: [northPanel, treeGrid]
    });
    pageload();
    //Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
    //    store.proxy.extraParams = {
    //        V_V_YEAR: Ext.getCmp('year').getValue(),
    //        V_V_ORGCODE: Ext.getCmp('ck').getValue(),
    //        V_V_TYPE_CODE: Ext.getCmp('lx').getValue(),
    //        V_V_MAJOR_CODE: Ext.getCmp('zy').getValue(),
    //        V_V_TEXT: Ext.getCmp('text').getValue(),
    //        V_V_PAGE: Ext.getCmp('page').store.currentPage,
    //        V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
    //
    //    }
    //});

    //施工单位加载监听
    Ext.data.StoreManager.lookup('jxdwStore').on('load', function () {
        Ext.getCmp('winsgdw').select(Ext.data.StoreManager.lookup('jxdwStore').getAt(0));
    });
    //厂矿加载监听
    Ext.data.StoreManager.lookup('ckStore').on('load', function () {
        Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
        Ext.getCmp('winck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
    });
    //类型加载监听
    Ext.data.StoreManager.lookup('lxStore').on('load', function () {
        Ext.getCmp('lx').select(Ext.data.StoreManager.lookup('lxStore').getAt(0));
        Ext.getCmp('winlx').select(Ext.data.StoreManager.lookup('lxStore').getAt(0));
    });
    //专业加载监听
    Ext.data.StoreManager.lookup('zyStore').on('load', function () {
        Ext.getCmp('zy').select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
        Ext.getCmp('winzy').select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
    });
});
function pageload(){
    treegridStore.setProxy({
        type: 'ajax',
        url: AppUrl + 'PROJECT/PM_04_PROJECT_DATA_ITEM_SEL',
        actionMethods: {
            read: 'POST'
        },
        async: false,
        extraParams: {
            V_V_YEAR: Ext.getCmp('year').getValue(),
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),
            V_V_TYPE_CODE: Ext.getCmp('lx').getValue(),
            V_V_MAJOR_CODE: Ext.getCmp('zy').getValue(),
            V_V_TEXT: Ext.getCmp('text').getValue(),
            V_V_PAGE: '0',
            V_V_PAGESIZE: '0'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    });
}
function queryGrid() {


    Ext.data.StoreManager.lookup('treegridStore').load({
        params: {
            V_V_YEAR: Ext.getCmp('year').getValue(),
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),
            V_V_TYPE_CODE: Ext.getCmp('lx').getValue(),
            V_V_MAJOR_CODE: Ext.getCmp('zy').getValue(),
            V_V_TEXT: Ext.getCmp('text').getValue(),
            V_V_PAGE: '0',
            V_V_PAGESIZE: '0'
        }
    });
}

function Add(){
    flag='add';

    Ext.getCmp('win').show();
    Ext.getCmp('winyear').setValue(Ext.getCmp('year').getValue());
    Ext.getCmp('winck').setValue(Ext.getCmp('ck').getValue());
    Ext.getCmp('winlx').setValue(Ext.getCmp('lx').getValue());
    Ext.getCmp('winzy').setValue(Ext.getCmp('zy').getValue());

    Ext.getCmp('winprocode').setValue('');
    Ext.getCmp('winproname').setValue('');
    Ext.getCmp('winxlnr').setValue('');
    Ext.getCmp('winmoney').setValue('');
    Ext.getCmp('winperson').setValue('');
    Ext.getCmp('winwbscode').setValue('');
    Ext.getCmp('winwbsname').setValue('');
    Ext.getCmp('winbz').setValue('');
}
function Edit(){
    flag='edit';
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length != 1) {
        alert('请选择一条数据！');
        return false;
    }else{
        Ext.getCmp('win').show();
        Ext.getCmp('winyear').setValue(seldata[0].data.V_YEAR);
        Ext.getCmp('winck').setValue(seldata[0].data.V_DEPTCODE);
        Ext.getCmp('winlx').setValue(seldata[0].data.V_TYPE_CODE);
        Ext.getCmp('winzy').setValue(seldata[0].data.V_MAJOR_CODE);

        Ext.getCmp('winprocode').setValue(seldata[0].data.V_PROJECT_CODE);
        Ext.getCmp('winproname').setValue(seldata[0].data.V_PROJECT_NAME);
        Ext.getCmp('winxlnr').setValue(seldata[0].data.V_CONTENT);
        Ext.getCmp('winmoney').setValue(seldata[0].data.V_BUDGET_MONEY);
        Ext.getCmp('winperson').setValue(seldata[0].data.V_FZR);
        Ext.getCmp('winwbscode').setValue(seldata[0].data.V_WBS_CODE);
        Ext.getCmp('winwbsname').setValue(seldata[0].data.V_WBS_NAME);
        Ext.getCmp('winbz').setValue(seldata[0].data.V_BZ);
    }

}
function Delete(){
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length != 1) {
        alert('请选择一条数据！');
        return false;
    }else{
    Ext.Ajax.request({
        url: AppUrl + 'PROJECT/PM_04_PROJECT_DATA_ITEM_DEL',
        method: 'POST',
        params: {
            V_V_ID:seldata[0].data.I_ID

        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText).list[0].V_INFO;
            if (resp == '成功') {
                    alert("删除成功");
                    //  window.returnValue = 'yes';
                    //      window.returnValue = 'yes';
                    //    window.close();
            }
        }

    });
    }
}
function Save(){
    Ext.Ajax.request({
        url: AppUrl + 'PROJECT/PM_04_PROJECT_DATA_ITEM_SAVE',
        method: 'POST',
        params: {
            V_V_FUNTYPE:flag=='add'?'add':'update',
             V_V_ORGCODE:Ext.getCmp('winck').getValue(),
             V_V_TYPE_CODE:Ext.getCmp('winlx').getValue(),
             V_V_MAJOR_CODE:Ext.getCmp('winzy').getValue(),
             V_V_PROJECT_CODE:Ext.getCmp('winprocode').getValue(),

             V_V_PROJECT_NAME:Ext.getCmp('winproname').getValue(),
             V_V_WBS_CODE:Ext.getCmp('winwbscode').getValue(),
             V_V_WBS_NAME:Ext.getCmp('winwbsname').getValue(),
             V_V_CONTENT:Ext.getCmp('winxlnr').getValue(),
             V_V_BUDGET_MONEY:Ext.getCmp('winmoney').getValue(),

             V_V_REPAIR_DEPT:Ext.getCmp('winsgdw').getValue(),
             V_V_FZR:Ext.getCmp('winperson').getValue(),
             V_V_DATE_B:Ext.Date.format(Ext.getCmp('winstatime').getValue(), 'Y/m/d'),
             V_V_DATE_E:Ext.Date.format(Ext.getCmp('winendtime').getValue(), 'Y/m/d'),
             V_V_BZ:Ext.getCmp('winbz').getValue(),

             V_V_FLOW_STATE:'PROJECT',
             V_V_INPER:Ext.util.Cookies.get('v_personcode'),
             V_V_INTIEM:Ext.Date.format(new Date(), 'Y/m/d'),
             V_V_YEAR:Ext.getCmp('winyear').getValue()

            //V_V_INPER: Ext.util.Cookies.get('v_personcode'),                                                            //人员编码
            //V_V_STARTTIME:Ext.Date.format(Ext.ComponentManager.get("jhtgsj").getValue(), 'Y-m-d'),                        //开始时间

        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText).list[0].V_INFO;
            if (resp == '成功') {
                    alert("保存成功");
                    //  window.returnValue = 'yes';
                    //      window.returnValue = 'yes';
                    //    window.close();
            }
        }

    });
}
function select() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length != 1) {
        alert('请选择一条数据！');
        return false;
    }
    var retdata = [];
    retdata.push(seldata[0].data.V_WBS_CODE);
    retdata.push(seldata[0].data.V_WBS_NAME);
    window.opener.getReturnWBS(retdata);
    window.close();
}

