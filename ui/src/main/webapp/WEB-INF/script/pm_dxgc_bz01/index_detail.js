/**
 * @author : Create by STR 2017-12-18
 * content : To restore the ui of this page for showing grid & gantt chart view in beauty .
 *              Then will collect any functions into a Object with different idiom ,by the way,
 *              some functions in its function had no change in this new version(12-18),only
 *              change some functional coding style.
 */

//初始化参数信息
var type = '';//新增 or 编辑
var genre = 1;//主项 or 子项
var v_guid = ''; // 点击行的 guid
var treeguid = '';//缓存信息 指定行guid
var fxjhguid = '';//缓存信息 指定行父向 guid
var zhugener = null;
var guid = '';
var V_PROJECT_NAME = '';
var V_PROJECT_CODE = '';
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.guid == undefined) ? guid = '' : guid = parameters.guid;
    (parameters.V_PROJECT_NAME == undefined) ? V_PROJECT_NAME = '' : V_PROJECT_NAME = parameters.V_PROJECT_NAME;
    (parameters.V_PROJECT_CODE == undefined) ? V_PROJECT_CODE = '' : V_PROJECT_CODE = parameters.V_PROJECT_CODE;
}

//初始化定义主表格及甘特图参数
var cmItems = [];
var ganttdata = [];

var vStart = '';
var vEnd = '';
var zigener = "";

var insertData = [{
    'V_BUILD_DEPT': '', 'V_BULID_PERSON': '', 'V_CONTENT': '', 'V_DATE_B': '', 'V_DATE_E': '', 'V_GUID': '',
    'V_GUID_FXJH': '', 'V_PROJECT_CODE_FXJH': '', 'V_PROJECT_NAME': '', 'V_SPECIALTY': '', 'V_PLAN_MONEY': ''
}];


//初始化时间参数
var today = new Date(Ext.Date.format(new Date(), 'Y-m-d'));
var thisYear = new Date().getFullYear();
var years = [];
for (var i = 2014; i <= thisYear + 1; i++) years.push([i, i]);
var months = [];
for (var i = 1; i <= 12; i++) months.push({displayField: i, valueField: i});
var yearmr = new Date().getFullYear();
var lastmonth = new Date().getMonth();
if (new Date().getMonth() + 1 == 1) {
    yearmr = yearmr - 1;
    lastmonth = 12;
}

var jhygs = [];//计划用工
var jhwls = [];//计划物料
var jjpbs = [];//机具配备
var gdxqs = [];//工单详情

//厂矿 以及 作业区等 数据源
var ckStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'ckStore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_01/PRO_BASE_DEPT_VIEW_PER',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
            V_DEPTTYPE: '[基层单位]',
            V_V_PERSON: Ext.util.Cookies.get('v_personcode')
        }
    }
});
var zyqStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'zyqStore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_01/PRO_BASE_DEPT_VIEW_PER',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }

    }
});

var zyStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'zyStore',
    fields: ['V_MAJOR_CODE', 'V_MAJOR_NAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_01/PM_04_PROJECT_MAJOR_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});


//工程信息 底部 表格
var zynrs = [];
var zynrStore = Ext.create("Ext.data.Store", {
    id: 'zynrStore',
    fields: ['nr'],
    data: zynrs,
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});
var zynrgrid = Ext.create('Ext.grid.Panel', {
    width: '60%',
    id: 'zynrgrid',
    store: zynrStore,
    height: 200,
    style: 'margin:0px 0px 5px 0px',
    autoScroll: true,
    columnLines: true,
    columns: [
        {
            xtype: 'rownumberer',
            text: '序号',
            width: 50,
            align: 'center'
        },
        {text: '主要内容', width: 380, dataIndex: 'nr', align: 'center', renderer: Atleft},
        {text: '操作', width: 100, dataIndex: 'sm', align: 'center', renderer: Delete4}
    ]
});


Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');

    //主表格树形数据源
    var treeStore = Ext.create('Ext.data.TreeStore', {
        storeId: 'treeStore',
        autoLoad: false,
        root: {
            expanded: true,
            text: "My Root"
        },
        fields: ['V_BUILD_DEPT', 'V_BULID_PERSON', 'V_CONTENT', 'V_DATE_B', 'V_DATE_E', 'V_GUID',
            'V_GUID_FXJH', 'V_PROJECT_CODE_FXJH', 'V_PROJECT_NAME', 'V_SPECIALTY', 'V_PLAN_MONEY', 'V_GUID_P'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'gantt/PRO_PM_EQUREPAIRPLAN_TREE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json'
            },
            extraParams: {
                V_V_GUID_FXJH: guid,
                V_BY1: "",
                V_BY2: "",
                V_BY3: ""
            }
        }
    });
    //主表格 树类  grid
    var treegrid = Ext.create('Ext.tree.Panel', {
        id: 'treegrid',
        store: treeStore,
        region: 'west',
        width: '30%',
        height: '100%',
        useArrows: true,
        rootVisible: false,
        multiSelect: true,
        singleExpand: true,
        rowLines: true,
        columnLines: true,
        plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1,
            listeners: {
                edit: pageFunction.OnChangePlanAmount
            }
        })],
        columns: [{xtype: 'rownumberer', width: 30, sortable: false},
            {
                xtype: 'treecolumn',
                text: '工程名称',
                dataIndex: 'V_PROJECT_NAME',
                width: 180,
                height: 60,
                field: {xtype: 'textfield'},
                align: 'center'
            },

            {
                text: '工程总费用',
                dataIndex: 'V_PLAN_MONEY',
                width: 120,
                height: 60,
                field: {xtype: 'numberfield'},
                align: 'center'
            },
            {text: '工程开始时间', dataIndex: 'V_DATE_B', width: 160, height: 60, align: 'center'},
            {text: '工程结束时间', dataIndex: 'V_DATE_E', width: 160, height: 60, align: 'center'}],
        listeners: {
            'itemclick': function (a, b, c) {
                jhygs = [];
                jhwls = [];
                jjpbs = [];
                pageFunction.clearValue();
                zynrs = [];
                Ext.data.StoreManager.lookup('jhygStore').loadData(jhygs);
                Ext.data.StoreManager.lookup('jhwlStore').loadData(jhwls);
                Ext.data.StoreManager.lookup('jjpbStore').loadData(jjpbs);
                Ext.data.StoreManager.lookup('zynrStore').loadData(zynrs);
                genre = (b.data.V_GUID_P =='')?1:2;
                type = (b.data.V_GUID == '')?'add' : 'edit';
                v_guid = b.data.V_GUID;
                if (type == 'add') return;
                Ext.Ajax.request({
                    url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_YG_VIEW',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_GUID: b.data.V_GUID
                    },
                    success: function (resp) {
                        var resp = Ext.decode(resp.responseText);
                        for (var i = 0; i < resp.list.length; i++) {
                            jhygs.push({
                                gz: resp.list[i].V_GZ,
                                rs: resp.list[i].V_NUM,
                                gs: resp.list[i].V_TIME,
                                sm: resp.list[i].V_MEMO,
                                id: resp.list[i].I_ID,
                                guid: resp.list[i].V_GUID
                            });
                        }
                        Ext.data.StoreManager.lookup('jhygStore').loadData(jhygs);
                    }
                });
                Ext.Ajax.request({
                    url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_WL_VIEW',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_GUID: b.data.V_GUID
                    },
                    success: function (resp) {
                        var resp = Ext.decode(resp.responseText);
                        for (var i = 0; i < resp.list.length; i++) {
                            jhwls.push({
                                wlbm: resp.list[i].V_WL_CODE,
                                wlmc: resp.list[i].V_WL_NAME,
                                jldw: resp.list[i].V_JLDW,
                                sl: resp.list[i].V_NUM,
                                gg: resp.list[i].V_GGXH,
                                dj: resp.list[i].V_DJ,
                                id: resp.list[i].I_ID,
                                guid: resp.list[i].V_GUID
                            });
                        }
                        Ext.data.StoreManager.lookup('jhwlStore').loadData(jhwls);
                    }
                });
                Ext.Ajax.request({
                    url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_JJ_VIEW',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_GUID: b.data.V_GUID
                    },
                    success: function (resp) {
                        var resp = Ext.decode(resp.responseText);
                        for (var i = 0; i < resp.list.length; i++) {
                            jjpbs.push({
                                jjbm: resp.list[i].V_JJ_CODE,
                                jjmc: resp.list[i].V_JJ_NAME,
                                jldw: resp.list[i].V_JLDW,
                                sl: resp.list[i].V_NUM,
                                id: resp.list[i].I_ID,
                                guid: resp.list[i].V_GUID
                            });
                        }
                        Ext.data.StoreManager.lookup('jjpbStore').loadData(jjpbs);
                    }
                });
                Ext.Ajax.request({
                    url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_TREE_GET',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_GUID: b.data.V_GUID,
                        V_BY1: "",
                        V_BY2: "",
                        V_BY3: ""
                    },
                    success: function (resp) {
                        var resp = Ext.decode(resp.responseText);
                        Ext.getCmp('sgyc_tab').setValue(resp.list[0].V_SGYC);
                        Ext.getCmp('aqdc_tab').setValue(resp.list[0].V_AQDC);

                    }
                });

                Ext.Ajax.request({
                    url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_NR_VIEW',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_GUID: b.data.V_GUID
                    },
                    success: function (resp) {
                        var resp = Ext.decode(resp.responseText);
                        zynrs = [];
                        for (var i = 0; i < resp.list.length; i++) {
                            zynrs.push({
                                nr: resp.list[i].V_MEMO,
                                id: resp.list[i].I_ID,
                                guid: resp.list[i].V_GUID
                            });
                        }
                        Ext.data.StoreManager.lookup('zynrStore').loadData(zynrs);
                    }
                });
                //工单详情
                /*
                 Ext.Ajax.request({
                 url: AppUrl + 'str/xxx???????',
                 method: 'POST',
                 async: false,
                 params: {
                 V_V_GUID: b.data.V_GUID
                 },
                 success: function (resp) {
                 var resp = Ext.decode(resp.responseText);
                 for (var i = 0; i < resp.list.length; i++) {
                 gdxqs.push({
                 });
                 }
                 Ext.data.StoreManager.lookup('gdxqStore').loadData(gdxqs);
                 }
                 });
                 */
                pageFunction.loadGdxqTab(b.data.V_GUID);
            }
        }
    });
    //甘特图 面板定义
    var ganttpanel = Ext.create('Ext.panel.Panel', {
        id: 'ganttpanel',
        width: "70%",
        height: "100%",
        region: 'center',
        frame: true,
        layout: 'border',
        baseCls: 'my-panel-noborder',
        items: []
    });

    //表格右键菜单
    var contextmenu = new Ext.menu.Menu({
        id: 'theContextMenu',
        frame: true,
        items: [
            // {text: '查看详情'},
            // {text: '上移工程项目', listeners: {click: OnBtnUp}},
            // {text: '下移工程项目',listeners:{click:OnBtnDown}},
            {text: '删除工程项目', listeners: {click: OnBtnDel}}]
    });

    treegrid.on("itemcontextmenu", function (view, record, item, index, e) {
        e.preventDefault();
        contextmenu.showAt(e.getXY());
    });


    var jhygStore = Ext.create("Ext.data.Store", {
        id: 'jhygStore',
        fields: ['gz', 'rs', 'gs', 'sm'],
        data: jhygs,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    });

    var jhwlStore = Ext.create("Ext.data.Store", {
        id: 'jhwlStore',
        fields: ['wlbm', 'wlmc', 'jldw', 'sl', 'gg', 'dj'],
        data: jhwls,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    });

    var jjpbStore = Ext.create("Ext.data.Store", {
        id: 'jjpbStore',
        fields: ['jjbm', 'jjmc', 'jldw', 'sl'],
        data: jjpbs,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    });

    var gdxqStore = Ext.create("Ext.data.Store", {
        id: 'gdxqStore',
        fields: ['xxx', 'yyy'],
        data: gdxqs,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    });

    var jhyggrid = Ext.create('Ext.grid.Panel', {
        width: '100%',
        id: 'jhyggrid',
        store: jhygStore,
        height: 300,
        style: 'margin:0px 0px 5px 0px',
        autoScroll: true,
        columnLines: true,
        columns: [
            {text: '工种', width: 80, dataIndex: 'gz', align: 'center', renderer: Atleft},
            {text: '人数', width: 80, dataIndex: 'rs', align: 'center', renderer: AtRight},
            {text: '工时', width: 80, dataIndex: 'gs', align: 'center', renderer: AtRight},
            {text: '说明', width: 200, dataIndex: 'sm', align: 'center', renderer: Atleft},
            {text: '操作', width: 100, dataIndex: 'sm', align: 'center', renderer: tabGridFunction.delGz}
        ]
    });
    var jhwlgrid = Ext.create('Ext.grid.Panel', {
        width: '100%',
        id: 'jhwlgrid',
        store: jhwlStore,
        height: 300,
        style: 'margin:0px 0px 5px 0px',
        autoScroll: true,
        columnLines: true,
        columns: [
            {text: '物料编码', width: 150, dataIndex: 'wlbm', align: 'center', renderer: Atleft},
            {text: '物料名称', width: 150, dataIndex: 'wlmc', align: 'center', renderer: Atleft},
            {text: '规格', width: 120, dataIndex: 'gg', align: 'center', renderer: Atleft},
            {text: '计量单位', width: 120, dataIndex: 'jldw', align: 'center', renderer: Atleft},
            {text: '单价', width: 100, dataIndex: 'dj', align: 'center', renderer: AtRight},
            {text: '数量', width: 100, dataIndex: 'sl', align: 'center', renderer: AtRight},
            {text: '操作', width: 100, dataIndex: 'sm', align: 'center', renderer: tabGridFunction.delWl}
        ]
    });
    var jjpbgrid = Ext.create('Ext.grid.Panel', {
        width: '100%',
        id: 'jjpbgrid',
        store: jjpbStore,
        height: 300,
        style: 'margin:0px 0px 5px 0px',
        autoScroll: true,
        columnLines: true,
        columns: [
            {text: '机具编码', width: 120, dataIndex: 'jjbm', align: 'center', renderer: Atleft},
            {text: '机具名称', width: 120, dataIndex: 'jjmc', align: 'center', renderer: Atleft},
            {text: '计量单位', width: 80, dataIndex: 'jldw', align: 'center', renderer: Atleft},
            {text: '数量', width: 80, dataIndex: 'sl', align: 'center', renderer: AtRight},
            {text: '操作', width: 100, dataIndex: 'sm', align: 'center', renderer: tabGridFunction.delJj}
        ]
    });
    var gdxqgrid = Ext.create('Ext.grid.Panel', {
        width: '100%',
        id: 'gdxqgrid',
        store: gdxqStore,
        style: 'margin:0px 0px 5px 0px',
        autoScroll: true,
        columnLines: true,
        columns: [
            {text: 'xxx', width: 120, dataIndex: 'xxx', align: 'center'},
            {text: 'yyy', width: 120, dataIndex: 'yyy', align: 'center'}
        ]
    });
    var panel1 = Ext.create('Ext.panel.Panel', {
        frame: true,
        layout: 'column',
        bodyPadding: 5,
        id: 'panel1',
        width: '100%',
        height: 35,
        baseCls: 'my-panel-noborder',
        defaults: {
            labelWidth: 35,
            labelAlign: 'right'
        },
        items: [
            {
                xtype: 'button', text: '添加子项', style: {margin: '0px 0px 0px 10px'}, icon: imgpath + '/add.png'
                , handler: pageFunction.OnBtnAdd
            }
        ]
    });

    var panelMain = Ext.create('Ext.panel.Panel', {
        frame: true,
        layout: 'border',
        bodyPadding: 5,
        id: 'panelMain',
        width: '100%',
        height: '50%',
        baseCls: 'my-panel-noborder',
        defaults: {
            labelWidth: 35,
            labelAlign: 'right'
        },
        items: [treegrid, ganttpanel]
    });


    /**
     * create by STR 2017-12-14
     * add a tabpanel into bottom called for  "工程信息" the same name as "基础信息"
     * @type {Ext.grid.Panel}
     */
    var gcxxgrid = Ext.create('Ext.panel.Panel', {
        id: 'gcxxgrid',
        layout: 'vbox',
        autoScroll: true,
        region: 'center',
        baseCls: 'my-panel-noborder',
        items: [
            {
                xtype: 'panel', layout: 'hbox', baseCls: 'my-panel-noborder', frame: true,
                items: [
                    {
                        xtype: 'textfield',
                        id: 'fxjhbm_tab',
                        fieldLabel: '放行计划编码',
                        readOnly: true,
                        labelAlign: 'right',
                        labelWidth: 80,
                        fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                        width: 260,
                        style: 'margin:15px 5px 5px 5px'
                    },
                    {
                        xtype: 'textfield',
                        id: 'fxjhmc_tab',
                        fieldLabel: '放行计划名称',
                        readOnly: true,
                        labelAlign: 'right',
                        labelWidth: 80,
                        readOnly: true,
                        fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                        width: 260,
                        style: 'margin:15px 5px 5px 5px'
                    },
                    {
                        xtype: 'textfield',
                        id: 'sjgcbm_tab',
                        fieldLabel: '上级工程编码',
                        readOnly: true,
                        labelAlign: 'right',
                        labelWidth: 80,
                        fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                        width: 260,
                        style: 'margin:15px 5px 5px 5px'
                    },
                    {
                        xtype: 'textfield',
                        hidden: true,
                        id: 'sjgcguid_tab',
                        fieldLabel: '上级工程guid',
                        labelAlign: 'right',
                        labelWidth: 80,
                        width: 260
                    },
                    {
                        xtype: 'textfield',
                        id: 'sjgcmc_tab',
                        fieldLabel: '上级工程名称',
                        readOnly: true,
                        labelAlign: 'right',
                        labelWidth: 80,
                        fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                        width: 260,
                        style: 'margin:15px 5px 5px 5px'
                    },
                    {
                        id: 'wyear_tab',
                        xtype: 'combo',
                        width: 260,
                        fieldLabel: '年份',
                        store: years,
                        style: 'margin:15px 5px 5px 5px',
                        displayField: 'Item1',
                        valueField: 'Item2',
                        value: thisYear,
                        editable: false,
                        labelAlign: 'right',
                        labelWidth: 80,
                        queryMode: 'local'
                    },
                    {
                        id: 'wmonth_tab',
                        xtype: 'combo',
                        width: 260,
                        fieldLabel: '月份',
                        store: months,
                        style: 'margin:15px 5px 5px 5px',
                        labelAlign: 'right',
                        labelWidth: 80,
                        displayField: 'Item1',
                        valueField: 'Item2',
                        value: new Date().getMonth() + 1,
                        editable: false,
                        queryMode: 'local'
                    },
                ]
            },

            {
                xtype: 'panel', layout: 'hbox', baseCls: 'my-panel-noborder', frame: true, items: [
                {
                    xtype: 'combo',
                    fieldLabel: '厂矿',
                    style: 'margin:15px 5px 5px 5px',
                    labelWidth: 80,
                    width: 260,
                    id: 'wck_tab',
                    store: 'ckStore',
                    editable: false,
                    displayField: 'V_DEPTNAME',
                    labelAlign: 'right',
                    valueField: 'V_DEPTCODE',
                    queryMode: 'local'
                },
                {
                    xtype: 'combo',
                    fieldLabel: '作业区',
                    style: 'margin:15px 5px 5px 5px',
                    labelWidth: 80,
                    width: 260,
                    id: 'wzyq_tab',
                    store: 'zyqStore',
                    editable: false,
                    displayField: 'V_DEPTNAME',
                    labelAlign: 'right',
                    valueField: 'V_DEPTCODE',
                    queryMode: 'local'
                },
                {
                    xtype: 'textfield',
                    id: 'wgcbm_tab',
                    fieldLabel: '工程项目编码',
                    labelAlign: 'right',
                    labelWidth: 80,
                    fieldStyle: 'background-color:#FFFF99;background-image:none;',
                    width: 260,
                    style: 'margin:15px 5px 5px 5px'
                },
                {
                    xtype: 'textfield',
                    id: 'wgcmc_tab',
                    fieldLabel: '工程项目名称',
                    labelAlign: 'right',
                    labelWidth: 80,
                    fieldStyle: 'background-color:#FFFF99;background-image:none;',
                    width: 260,
                    style: 'margin:15px 5px 5px 5px'
                },
                {
                    xtype: 'textfield',
                    id: 'wys_tab',
                    fieldLabel: '预算(万元)',
                    labelAlign: 'right',
                    labelWidth: 80,
                    fieldStyle: 'background-color:#FFFF99;background-image:none;',
                    width: 260,
                    style: 'margin:15px 5px 5px 5px'
                },
                {
                    xtype: 'combo',
                    id: 'wzy_tab',
                    fieldLabel: '专业',
                    store: 'zyStore',
                    displayField: 'V_MAJOR_NAME',
                    valueField: 'V_MAJOR_CODE',
                    labelAlign: 'right',
                    labelWidth: 80,
                    editable: false,
                    fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                    width: 260,
                    style: 'margin:15px 5px 5px 5px',
                    queryMode: 'local'
                }
            ]
            },
            {
                xtype: 'panel', layout: 'hbox', baseCls: 'my-panel-noborder', frame: true, items: [
                {
                    xtype: 'textfield',
                    id: 'wsbbm_tab',
                    fieldLabel: '设备编码',
                    readOnly: true,
                    labelAlign: 'right',
                    labelWidth: 80,
                    fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                    width: 237,
                    style: 'margin:15px 5px 5px 5px'
                },
                {xtype: 'button', text: '..', style: 'margin:15px 0px 5px 0px', handler: pageFunction.getEQU},
                {
                    xtype: 'textfield',
                    id: 'wsbmc_tab',
                    fieldLabel: '设备名称',
                    labelAlign: 'right',
                    labelWidth: 80,
                    readOnly: true,
                    fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                    width: 260,
                    style: 'margin:15px 5px 5px 5px'
                },
                {
                    xtype: 'datefield',
                    id: 'wksrq_tab',
                    format: 'Y-m-d',
                    style: 'margin:15px 5px 5px 5px',
                    fieldLabel: '开始日期',
                    fieldStyle: 'background-color:#FFFF99;background-image:none;',
                    labelAlign: 'right',
                    labelWidth: 80,
                    width: 260
                },
                {
                    xtype: 'timefield',
                    id: 'wkssj_tab',
                    format: 'H:i:s',
                    style: 'margin:15px 5px 5px 5px',
                    fieldLabel: '开始时间',
                    fieldStyle: 'background-color:#FFFF99;background-image:none;',
                    labelAlign: 'right',
                    labelWidth: 80,
                    width: 260
                },
                {
                    xtype: 'datefield',
                    id: 'wjsrq_tab',
                    format: 'Y-m-d',
                    style: 'margin:15px 5px 5px 5px',
                    fieldLabel: '结束日期',
                    fieldStyle: 'background-color:#FFFF99;background-image:none;',
                    labelAlign: 'right',
                    labelWidth: 80,
                    width: 260
                },
                {
                    xtype: 'timefield',
                    id: 'wjssj_tab',
                    format: 'H:i:s',
                    style: 'margin:15px 5px 5px 5px',
                    fieldLabel: '结束时间',
                    fieldStyle: 'background-color:#FFFF99;background-image:none;',
                    labelAlign: 'right',
                    labelWidth: 80,
                    width: 260
                }
            ]
            },
            {
                xtype: 'panel', layout: 'hbox', baseCls: 'my-panel-noborder', frame: true, items: [

                {
                    xtype: 'textfield',
                    id: 'wjsdw_tab',
                    fieldLabel: '施工单位',
                    labelAlign: 'right',
                    labelWidth: 80,
                    fieldStyle: 'background-color:#FFFF99;background-image:none;',
                    width: 260,
                    style: 'margin:15px 5px 5px 5px'
                },
                {
                    xtype: 'textfield',
                    id: 'wgcfzr_tab',
                    fieldLabel: '工程负责人',
                    labelAlign: 'right',
                    labelWidth: 80,
                    readOnly: true,
                    fieldStyle: 'background-color:#FFFF99;background-image:none;',
                    width: 260,
                    style: 'margin:15px 5px 5px 5px'
                }
            ]
            },
            {
                xtype: 'panel', layout: 'hbox', baseCls: 'my-panel-noborder', frame: true,
                items: [
                    {
                        xtype: 'textfield',
                        id: 'wnr_tab',
                        style: 'margin:5px 5px 5px 5px',
                        fieldLabel: '主要修理内容',
                        fieldStyle: 'background-color:#FFFF99;background-image:none;',
                        labelAlign: 'right',
                        labelWidth: 80,
                        width: 530
                    },
                    {xtype: 'button', text: '添加', style: 'margin:5px 5px 5px 5px', handler: pageFunction.addZYNR}
                ]
            }
            , zynrgrid
        ]
    });


    var tabpanel = Ext.create('Ext.tab.Panel', {
        id: 'tabpanel',
        // region:'center',
        width: '100%',
        height: window.innerHeight / 2 - 35,
        tabBar: {
            items: [
                {
                    //组件靠右
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    text: '保存',
                    listeners: {
                        'click': pageFunction.saveTab
                    }
                }]
        },
        items: [
            {
                title: '基础信息',
                id: 'gcxxtab',
                frame: true,
                border: false,
                items: [gcxxgrid]
            },
            {
                title: '计划用工',
                id: 'ygtab',
                layout: 'vbox',
                frame: true,
                border: false,
                items: [
                    {
                        xtype: 'panel', layout: 'hbox', baseCls: 'my-panel-noborder', frame: true, items: [
                        {
                            xtype: 'textfield',
                            emptyText: '工种',
                            id: 'wgz',
                            style: 'margin:5px 5px 5px 5px',
                            fieldLabel: '计划用工',
                            fieldStyle: 'background-color:#FFFF99;background-image:none;',
                            labelAlign: 'right',
                            labelWidth: 80,
                            width: 180
                        },
                        {
                            xtype: 'textfield',
                            emptyText: '人数',
                            id: 'wrs',
                            style: 'margin:5px 5px 5px 5px',
                            fieldStyle: 'background-color:#FFFF99;background-image:none;',
                            labelAlign: 'right',
                            labelWidth: 10,
                            width: 60
                        },
                        {
                            xtype: 'textfield',
                            emptyText: '工时',
                            id: 'wgs',
                            style: 'margin:5px 5px 5px 5px',
                            fieldStyle: 'background-color:#FFFF99;background-image:none;',
                            labelAlign: 'right',
                            labelWidth: 10,
                            width: 60
                        },
                        {
                            xtype: 'textfield',
                            emptyText: '说明',
                            id: 'wsm',
                            style: 'margin:5px 5px 5px 5px',
                            fieldStyle: 'background-color:#FFFF99;background-image:none;',
                            labelAlign: 'right',
                            labelWidth: 10,
                            width: 160
                        },
                        {xtype: 'button', text: '添加', style: 'margin:5px 5px 5px 5px', handler: pageFunction.addJHYG},
                        {xtype: 'button', text: '工种选择', style: 'margin:5px 5px 5px 5px', handler: pageFunction.getGZ}
                    ]
                    }

                    , jhyggrid]
            }, {
                title: '计划物料',
                id: 'wltab',
                layout: 'vbox',
                frame: true,
                border: false,
                items: [{
                    xtype: 'panel', layout: 'hbox', baseCls: 'my-panel-noborder', frame: true, items: [
                        {
                            xtype: 'textfield',
                            emptyText: '物料编码',
                            id: 'wwlbm',
                            style: 'margin:5px 5px 5px 5px',
                            fieldLabel: '计划物料',
                            fieldStyle: 'background-color:#FFFF99;background-image:none;',
                            labelAlign: 'right',
                            labelWidth: 80,
                            width: 180
                        },
                        {
                            xtype: 'textfield',
                            emptyText: '物料名称',
                            id: 'wwlmc',
                            style: 'margin:5px 5px 5px 5px',
                            fieldStyle: 'background-color:#FFFF99;background-image:none;',
                            labelAlign: 'right',
                            labelWidth: 10,
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            emptyText: '规格',
                            id: 'wgg',
                            style: 'margin:5px 5px 5px 5px',
                            fieldStyle: 'background-color:#FFFF99;background-image:none;',
                            labelAlign: 'right',
                            labelWidth: 10,
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            emptyText: '计量单位',
                            id: 'wjldw',
                            style: 'margin:5px 5px 5px 5px',
                            fieldStyle: 'background-color:#FFFF99;background-image:none;',
                            labelAlign: 'right',
                            labelWidth: 10,
                            width: 50
                        },
                        {
                            xtype: 'textfield',
                            emptyText: '单价',
                            id: 'wdj',
                            style: 'margin:5px 5px 5px 5px',
                            fieldStyle: 'background-color:#FFFF99;background-image:none;',
                            labelAlign: 'right',
                            labelWidth: 10,
                            width: 50
                        },
                        {
                            xtype: 'textfield',
                            emptyText: '数量',
                            id: 'wsl',
                            style: 'margin:5px 5px 5px 5px',
                            fieldStyle: 'background-color:#FFFF99;background-image:none;',
                            labelAlign: 'right',
                            labelWidth: 10,
                            width: 50
                        },
                        {xtype: 'button', text: '添加', style: 'margin:5px 5px 5px 5px', handler: pageFunction.addJHWL},
                        {xtype: 'button', text: '物料选择', style: 'margin:5px 5px 5px 5px', handler: pageFunction.getWL}
                    ]
                }, jhwlgrid]
            }, {
                title: '机具配备',
                id: 'jjtab',
                layout: 'vbox',
                frame: true,
                border: false,
                items: [{
                    xtype: 'panel', layout: 'hbox', baseCls: 'my-panel-noborder', frame: true, items: [
                        {
                            xtype: 'textfield',
                            emptyText: '机具编码',
                            id: 'wjjbm',
                            style: 'margin:5px 5px 5px 5px',
                            fieldLabel: '机具配备',
                            fieldStyle: 'background-color:#FFFF99;background-image:none;',
                            labelAlign: 'right',
                            labelWidth: 80,
                            width: 180
                        },
                        {
                            xtype: 'textfield',
                            emptyText: '机具名称',
                            id: 'wjjmc',
                            style: 'margin:5px 5px 5px 5px',
                            fieldStyle: 'background-color:#FFFF99;background-image:none;',
                            labelAlign: 'right',
                            labelWidth: 10,
                            width: 120
                        },
                        {
                            xtype: 'textfield',
                            emptyText: '计量单位',
                            id: 'wjldw2',
                            style: 'margin:5px 5px 5px 5px',
                            fieldStyle: 'background-color:#FFFF99;background-image:none;',
                            labelAlign: 'right',
                            labelWidth: 10,
                            width: 60
                        },
                        {
                            xtype: 'textfield',
                            emptyText: '数量',
                            id: 'wsl2',
                            style: 'margin:5px 5px 5px 5px',
                            fieldStyle: 'background-color:#FFFF99;background-image:none;',
                            labelAlign: 'right',
                            labelWidth: 10,
                            width: 60
                        },
                        {xtype: 'button', text: '添加', style: 'margin:5px 5px 5px 5px', handler: pageFunction.addJJPB},
                        {xtype: 'button', text: '机具选择', style: 'margin:5px 5px 5px 5px', handler: pageFunction.getJJ}
                    ]
                }, jjpbgrid]
            }, {
                title: '安全对策',
                id: 'aqtab',
                layout: 'vbox',
                frame: true,
                border: false,
                items: [
                    {
                        xtype: 'textarea',
                        id: 'sgyc_tab',
                        editable: false,
                        readOnly: true,
                        style: 'margin:5px 5px 5px 5px',
                        fieldLabel: '事故预测',
                        labelAlign: 'right',
                        labelWidth: 80,
                        width: 530,
                        height: 80
                    },
                    {
                        xtype: 'textarea',
                        id: 'aqdc_tab',
                        editable: false,
                        readOnly: true,
                        style: 'margin:5px 5px 5px 5px',
                        fieldLabel: '安全对策',
                        labelAlign: 'right',
                        labelWidth: 80,
                        width: 530,
                        height: 80
                    }
                ]
            },
            {
                title: '工单详情',
                id: 'gdxqtab',
                layout: 'vbox',
                frame: true,
                border: false,
                items: [gdxqgrid]
            }

        ]
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
            items: [panel1]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [panelMain]
        }, {
            region: 'south',
            layout: 'fit',
            border: false,
            items: [tabpanel]
        }]
    });

    Ext.getCmp('wck_tab').on('change', function () {
        zyqStore.load({
            params: {
                V_DEPTCODE: Ext.getCmp('wck_tab').getValue(),
                V_DEPTTYPE: '[主体作业区]',
                V_V_PERSON: Ext.util.Cookies.get('v_personcode')
            }
        });
    });

    pageFunction.QueryGanttData();

    Ext.getBody().unmask();


})
;

function Atleft(value, metaData) {
    metaData.style = 'text-align: left';
    return value;
}
function AtRight(value, metaData) {
    metaData.style = 'text-align: right';
    return value;
}


function a1(id) {
    var oson = document.getElementById(id);
    with (oson) {
        oson.style.display = "block";
        oson.style.left = (window.event.clientX - 450) + 'px';
        oson.style.top = (window.event.clientY - 138) + 'px';
        oson.style.background = 'white';
    }

}
function a2(id) {
    document.getElementById(id).style.display = 'none';

}

/**
 * 用于页面动态加载渲染组件的方法及绑定事件 集合对象.
 * Create a Object that use for rendering the page with data in dynamic
 * It has many properties which edited within function entity.
 */
var pageFunction = {
    /**
     * 甘特图动态渲染
     */
    CreateGantt: function () {
        cmItems = [];
        var starttime = '';
        var endtime = '';
        for (var i = 0; i < ganttdata.length; i++) {
            if (i == 0) {
                starttime = ganttdata[0].V_DATE_B;
                endtime = ganttdata[0].V_DATE_E;
            } else {
                if (ganttdata[i].V_DATE_B < starttime) {
                    starttime = ganttdata[i].V_DATE_B;
                }
                if (ganttdata[i].V_DATE_E > endtime) {
                    endtime = ganttdata[i].V_DATE_E;
                }
            }
        }
        vStart = new Date(starttime);
        vEnd = new Date(endtime);
        var vTmpDate = new Date(vStart.getFullYear(), vStart.getMonth(), vStart.getDate());
        var dateItems = [];
        var vmonth = vTmpDate.getMonth();
        var vTmpMonth;

        while (vTmpDate < vEnd) {
            vTmpMonth = vTmpDate.getMonth();
            var vzm = '';
            if (vTmpDate.getDay() == 0 || vTmpDate.getDay() == 6) vzm = 'color:#CCCCCC';

            if (vTmpMonth == vmonth) {
                dateItems.push({text: vTmpDate.getDate().toString(), style: vzm, width: 40});
            } else {
                var vyear = vTmpDate.getFullYear();
                if (vmonth == 11) vyear -= 1;
                cmItems.push({text: vyear.toString() + '年' + (vmonth + 1).toString() + '月', columns: dateItems});
                vmonth = vTmpMonth;
                dateItems = [];
                dateItems.push({text: vTmpDate.getDate().toString(), style: vzm, width: 40});
            }
            vTmpDate = new Date((vTmpDate / 1000 + 86400) * 1000);
        }
        if (vTmpMonth == vmonth) {
            cmItems.push({
                text: vTmpDate.getFullYear().toString() + '年' + (vmonth + 1).toString() + '月',
                columns: dateItems
            });
        }

        cmItems.push({
            text: '',
            width: 0, dataIndex: 'mycolor',
            renderer: pageFunction.IndexShow
        });

        var ganttStore = Ext.create("Ext.data.Store", {
            storeId: 'ganttStore',
            fields: ['I_ID', 'V_ORGCODE', 'V_DEPTCODE', 'V_YEAR', 'V_MONTH', 'V_GUID',
                'V_PROJECT_CODE', 'V_PROJECT_NAME', 'V_PLAN_MONEY', 'V_CONTENT', 'V_DATE_DESIGN',
                'V_DATE_INVITE', 'V_DATE_B', 'V_DATE_E', 'V_BUDGET_MONEY', 'V_PROGRESS', 'V_BUILD_NAMAGER',
                'V_BULID_PERSON', 'V_DIRECT_PERSON', 'V_EQUTYPECODE', 'V_EQUCODE', 'V_EQUNAME',
                'V_SPECIALTY', 'V_BUILD_DEPT', 'V_GUID_P', 'V_PROJECT_CODE_P',
                'V_PROJECT_NAME_P', 'V_GUID_FXJH', 'V_PROJECT_CODE_FXJH', 'V_PROJECT_NAME_FXJH',
                'D_DATE_INPUT', 'V_PERCODE_INPUT', 'V_PERNAME_INPUT'],
            data: ganttdata,
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            }
        });

        var ganttgrid = Ext.create('Ext.grid.Panel', {
            id: 'ganttgrid',
            store: ganttStore,
            region: 'center',
            columnLines: true,
            columns: cmItems,
            renderTo: Ext.getBody()
        });
        Ext.getCmp('ganttpanel').add(ganttgrid);
    },

    QueryGanttData: function () {
        ganttdata = [];
        Ext.Ajax.request({
            url: AppUrl + 'gantt/PRO_PM_EQUREPAIRPLAN_TREE_GANTT',
            method: 'POST',
            async: false,
            params: {
                V_V_GUID_FXJH: guid,
                V_BY1: "",
                V_BY2: "",
                V_BY3: ""
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                ganttdata = resp.list;
                pageFunction.CreateGantt();
            }
        });
    },


    OnChangePlanAmount: function (editor, e, eOpts) {
        Ext.Ajax.request({
            url: AppUrl + 'hp/PRO_PM_EQUREPAIRPLAN_SELMAX',
            type: 'ajax',
            method: 'POST',
            params: {
                V_V_GUID_FXJH: guid,
                V_V_ROWNUMBER: -1,
                STATE: '主项'
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);//后台返回的值
                if (data.success) {//成功，会传回true
                    zhugener = Math.floor(data.maxvalue) - (-1);
                    if (e.value != '') pageFunction.ProjectInsert(e.record.raw.V_GUID, e.field, e.value);
                }
            }
        })
    },

    /**
     * 输入项目名称后cursor离开  自动提交
     * @param uuid
     * @param fields
     * @param values
     * @constructor
     */
    ProjectInsert: function (uuid, fields, values) {
        if (uuid == '') {
            uuid = '-1';
        }

        Ext.Ajax.request({
            url: AppUrl + 'gantt/PM_EQUREPAIRPLAN_TREE_INSERT',
            method: 'POST',
            async: false,
            params: {
                V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_PERNAME: Ext.util.Cookies.get('v_personname2'),
                V_V_GUID: uuid,
                V_V_GUID_FXJH: guid,
                V_V_ROWNUMBER: zhugener,
                V_V_COLUMN: fields,
                V_V_VALUE: values
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                if (resp.V_INFO == "Success") {
                    QueryTreePanel()
                }
            }
        });
    },
    IndexShow: function (value, metaData, record) {
        var startd = new Date(record.data.V_DATE_B);
        var endd = new Date(record.data.V_DATE_E);
        if (startd < vStart) {
            startd = new Date(vStart);
        }
        if (startd > vEnd) {
            startd = new Date(vEnd);
        }
        if (endd < vStart) {
            endd = new Date(vStart);
        }
        if (endd > vEnd) {
            endd = new Date(vEnd);
        }
        if (endd < startd) {
            endd = new Date(startd);
        }
        if (endd <= today) {

            var dif = startd.getTime() - vStart.getTime();
            var vleft = (dif / (86400 * 1000)) * 40;
            dif = endd.getTime() - startd.getTime();
            var vwidth = (dif / (86400 * 1000)) * 40;
            var gtt = '<div style="left:' + vleft.toString() + 'px;height:21px;width:' + vwidth.toString() + 'px;background-color:A6FFA6;" class="sch-event" onmouseover="a1(\'' + record.data.V_GUID + '\')" onmouseout="a2(\'' + record.data.V_GUID + '\')"><div class="sch-event-inner" >' + record.data.V_PROJECT_NAME + '</div></div><div class="lxm"  id="' + record.data.V_GUID + '" style="display:none; position:absolute; z-index:9999; border:1px solid #666;">开始时间：' + record.data.V_DATE_B + '<br>' +
                '结束时间：' + record.data.V_DATE_E + '<br>';
            var cont = record.data.V_CONTENT.split(',');
            var contt = '内容：';
            for (var i = 0; i < cont.length; i++) {
                if (i == 0) {
                    contt = contt + cont[i] + '<br>';
                } else {
                    contt = contt + cont[i] + '<br>';
                }
            }
            gtt = gtt + contt + '</div>';
            return gtt;
        }
        if (today <= startd) {

            var dif = startd.getTime() - vStart.getTime();
            var vleft = (dif / (86400 * 1000)) * 40;
            dif = endd.getTime() - startd.getTime();
            var vwidth = (dif / (86400 * 1000)) * 40;
            var gtt = '<div style="left:' + vleft.toString() + 'px;height:21px;width:' + vwidth.toString() + 'px;background-color: #CC3333;" class="sch-event" onmouseover="a1(\'' + record.data.V_GUID + '\')" onmouseout="a2(\'' + record.data.V_GUID + '\')"><div  class="sch-event-inner">' + record.data.V_PROJECT_NAME + '</div></div><div class="lxm"  id="' + record.data.V_GUID + '" style="display:none; position:absolute; z-index:9999; border:1px solid #666;">开始时间：' + record.data.V_DATE_B + '<br>' +
                '结束时间：' + record.data.V_DATE_E + '<br>';
            var cont = record.data.V_CONTENT.split(',');
            var contt = '内容：';
            for (var i = 0; i < cont.length; i++) {
                if (i == 0) {
                    contt = contt + cont[i] + '<br>';
                } else {
                    contt = contt + cont[i] + '<br>';
                }
            }
            gtt = gtt + contt + '</div>';
            return gtt;
        }

        if (startd < today && today < endd) {
            var nowtime2 = Ext.Date.format(new Date(), 'Y-m-d 00:00:00')
            var dif = startd.getTime() - vStart.getTime();
            var vleft = (dif / (86400 * 1000)) * 40;
            dif = today.getTime() - startd.getTime();
            var vwidth1 = (dif / (86400 * 1000)) * 40;
            dif = endd.getTime() - today.getTime();
            var vwidth2 = (dif / (86400 * 1000)) * 40;
            dif = endd.getTime() - startd.getTime();
            var vwidth = (dif / (86400 * 1000)) * 40;

            var bfb = Math.round(((vwidth1 / vwidth) * 100), 0);
            var gtt = '<div style="left:' + vleft.toString() + 'px;height:21px;width:' + vwidth.toString() + 'px;" class = "sch-event" onmouseover="a1(\'' + record.data.V_GUID + '\')" onmouseout="a2(\'' + record.data.V_GUID + '\')"><div style="width:' + vwidth1.toString() + 'px;border:0px;height:21px;margin:0px;background-color:#99CC66;" class = "sch-event">' + ' 完成度' + bfb + '%</div><div class="sch-event-inner" style="float:right;width:' + vwidth2.toString() + 'px;height:21px;border:0px;margin:0px;background-color: #CC3333;">' + record.data.V_PROJECT_NAME + '</div></div><div class="lxm"  id="' + record.data.V_GUID + '" style="display:none; position:absolute; z-index:9999; border:1px solid #666;">开始时间：' + record.data.V_DATE_B + '<br>' +
                '结束时间：' + record.data.V_DATE_E + '<br>';
            var cont = record.data.V_CONTENT.split(',');
            var contt = '内容：';
            for (var i = 0; i < cont.length; i++) {
                if (i == 0) {
                    contt = contt + cont[i] + '<br>';
                } else {
                    contt = contt + cont[i] + '<br>';
                }
            }
            gtt = gtt + contt + '</div>';
            return gtt;
        }
    },

    /**
     *添加子项
     * @constructor
     */
    OnBtnAdd: function () {
        type = 'add';
        genre = 2;
        var record = Ext.getCmp('treegrid').getSelectionModel().getSelection();
        if (record.length == 0) {
            alert('请选择主项');
            return;
        }
        fxjhguid = record[0].data.V_GUID;
        alert('即将开发');
    },

    /** 工单详情  暂时废弃(待修改)
     * 点击win grid 中指定行，底部 渲染 工单详情 数据tab
     * @param guid
     */
    loadGdxqTab: function (guid) {
        Ext.Ajax.request({
            url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_TREE_GET',
            method: 'POST',
            async: false,
            params: {
                V_V_GUID: guid,
                V_BY1: "",
                V_BY2: "",
                V_BY3: ""
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                Ext.getCmp('fxjhbm_tab').setValue(resp.list[0].V_PROJECT_CODE_FXJH);
                Ext.getCmp('fxjhmc_tab').setValue(resp.list[0].V_PROJECT_NAME_FXJH);
                Ext.getCmp('sjgcbm_tab').setValue(resp.list[0].V_PROJECT_CODE_P);
                Ext.getCmp('sjgcmc_tab').setValue(resp.list[0].V_PROJECT_NAME_P);
                Ext.getCmp('wyear_tab').setValue(resp.list[0].V_YEAR);
                Ext.getCmp('wmonth_tab').setValue(resp.list[0].V_MONTH);
                Ext.getCmp('wck_tab').setValue(resp.list[0].V_ORGCODE);
                Ext.getCmp('wzyq_tab').setValue(resp.list[0].V_DEPTCODE);
                Ext.getCmp('wgcbm_tab').setValue(resp.list[0].V_PROJECT_CODE);
                Ext.getCmp('wgcmc_tab').setValue(resp.list[0].V_PROJECT_NAME);
                Ext.getCmp('wys_tab').setValue(resp.list[0].V_PLAN_MONEY);
                Ext.getCmp('wzy_tab').setValue(resp.list[0].V_SPECIALTY);
                Ext.getCmp('wsbbm_tab').setValue(resp.list[0].V_EQUCODE);
                Ext.getCmp('wsbmc_tab').setValue(resp.list[0].V_EQUNAME);
                Ext.getCmp('wjsdw_tab').setValue(resp.list[0].V_BUILD_DEPT);
                Ext.getCmp('wgcfzr_tab').setValue(resp.list[0].V_BULID_PERSON);
                Ext.getCmp('wksrq_tab').setValue(new Date(resp.list[0].V_DATE_B));
                Ext.getCmp('wkssj_tab').setValue(new Date(resp.list[0].V_DATE_B));
                Ext.getCmp('wjsrq_tab').setValue(new Date(resp.list[0].V_DATE_E));
                Ext.getCmp('wjssj_tab').setValue(new Date(resp.list[0].V_DATE_E));
                Ext.getCmp('sjgcguid_tab').setValue(resp.list[0].V_GUID_P);
                // Ext.getCmp('wgcnr_tab').setValue(resp.list[0].V_CONTENT);
            }
        });
    },
    /**
     * 设备选择 自动赋值
     */
    getEQU: function () {
        var owidth = window.document.body.offsetWidth - 200;
        var oheight = window.document.body.offsetHeight - 100;
        window.open(AppUrl + 'page/PM_090101/index.html?V_DEPTCODE=' + Ext.getCmp('wzyq_tab').getValue(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
    },
    /**
     * 基础信息tab 页面 添加主要修理内容 动作事件按钮
     */
    addZYNR: function () {
        zynrs.push({
            nr: Ext.getCmp('wnr_tab').getValue()
        });
        Ext.data.StoreManager.lookup('zynrStore').loadData(zynrs);
    },
    /**
     * 计划用工添加 按钮事件
     */
    addJHYG: function () {
        jhygs.push({
            gz: Ext.getCmp('wgz').getValue(),
            rs: Ext.getCmp('wrs').getValue(),
            gs: Ext.getCmp('wgs').getValue(),
            sm: Ext.getCmp('wsm').getValue()
        });
        Ext.data.StoreManager.lookup('jhygStore').loadData(jhygs);
    },
    /**
     * 计划用工 工种选择事件按钮
     */
    getGZ: function () {
        var owidth = window.document.body.offsetWidth - 200;
        var oheight = window.document.body.offsetHeight - 100;
        window.open(AppUrl + 'page/PM_190403/index.html', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
    },
    /**
     * 计划物料 添加 事件按钮
     */
    addJHWL: function () {
        jhwls.push({
            wlbm: Ext.getCmp('wwlbm').getValue(),
            wlmc: Ext.getCmp('wwlmc').getValue(),
            jldw: Ext.getCmp('wjldw').getValue(),
            sl: Ext.getCmp('wsl').getValue(),
            gg: Ext.getCmp('wgg').getValue(),
            dj: Ext.getCmp('wdj').getValue()
        });
        Ext.data.StoreManager.lookup('jhwlStore').loadData(jhwls);
    },
    /**
     * 计划物料 物料选择事件按钮弹窗
     */
    getWL: function () {
        var owidth = window.document.body.offsetWidth - 200;
        var oheight = window.document.body.offsetHeight - 100;
        window.open(AppUrl + 'page/pm_wl_sel/index.html', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
    },
    /**
     * 机具选择事件  添加机具
     */
    addJJPB: function () {
        jjpbs.push({
            jjbm: Ext.getCmp('wjjbm').getValue(),
            jjmc: Ext.getCmp('wjjmc').getValue(),
            jldw: Ext.getCmp('wjldw2').getValue(),
            sl: Ext.getCmp('wsl2').getValue()
        });
        Ext.data.StoreManager.lookup('jjpbStore').loadData(jjpbs);
    },
    /**
     * 机具选择 弹出机具选择面板
     */
    getJJ: function () {
        var owidth = window.document.body.offsetWidth - 200;
        var oheight = window.document.body.offsetHeight - 100;
        window.open(AppUrl + 'page/PM_190603/index.html', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
    },
    /**
     * 保存 信息 ..你懂的
     */
    saveTab: function () {
        var treenode = Ext.getCmp('treegrid').getSelectionModel().getSelection();
        treeguid = treenode[0].data.V_GUID;
        fxjhguid = treenode[0].data.V_GUID_FXJH;

        if (genre == 1) {
            Ext.Ajax.request({
                url: AppUrl + 'hp/PRO_PM_EQUREPAIRPLAN_SELMAX',
                type: 'ajax',
                method: 'POST',
                params: {
                    V_V_GUID_FXJH: fxjhguid,
                    V_V_ROWNUMBER: -1,
                    STATE: '主项'
                },
                success: function (response) {
                    var data = Ext.decode(response.responseText);//后台返回的值
                    if (data.success) {//成功，会传回true
                        zhugener = Math.floor(data.maxvalue);
                        zhuxiangadd();


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

        if (genre == 2) {
            Ext.Ajax.request({
                url: AppUrl + 'hp/PRO_PM_EQUREPAIRPLAN_SELMAX',
                type: 'ajax',
                method: 'POST',
                params: {
                    V_V_GUID_FXJH: fxjhguid,
                    V_V_ROWNUMBER: rownumber,
                    STATE: '子项'
                },
                success: function (response) {
                    var data = Ext.decode(response.responseText);//后台返回的值
                    if (data.success) {//成功，会传回true
                        zigener = parseFloat(data.maxvalue);
                        //console.log(zigener);
                        //console.log(parseFloat('66'));
                        console.log("zigener= " + zigener);
                        var weishu = data.weishu;
                        console.log(weishu);

                        if (weishu == 1 && data.maxvalue != null) {
                            zigener = (zigener + 0.1).toFixed(1);
                        }
                        if (weishu == 2 && data.maxvalue != null) {
                            zigener = (zigener + 0.01).toFixed(2);
                        }

                        if (weishu == 3 && data.maxvalue != null) {
                            zigener = (zigener + 0.001).toFixed(3);
                        }

                        if (weishu == 4 && data.maxvalue != null) {
                            zigener = (zigener + 0.0001).toFixed(4);
                        }

                        if (weishu == 5 && data.maxvalue != null) {
                            zigener = (zigener + 0.00001).toFixed(5);
                        }

                        if (weishu == 0 && data.maxvalue == null) {
                            zigener = (parseFloat(rownumber) + 0.1).toFixed(1);

                        }

                        if (weishu == 1 && data.maxvalue == null) {
                            zigener = (parseFloat(rownumber) + 0.01).toFixed(2);
                        }

                        if (weishu == 2 && data.maxvalue == null) {
                            zigener = (parseFloat(rownumber) + 0.001).toFixed(3);

                        }

                        if (weishu == 3 && data.maxvalue == null) {
                            zigener = (parseFloat(rownumber) + 0.0001).toFixed(4);
                        }

                        if (weishu == 5 && data.maxvalue == null) {
                            zigener = (parseFloat(rownumber) + 0.00001).toFixed(5);
                        }


                        zixiangadd();


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
        alert('保存成功');
    },

    /**
     * 切换 主项或者子项 以及 创建新主(子)项时 清空底部面板 所有赋值清空
     */
    clearValue: function () {
        /*基础信息面板*/
        Ext.getCmp('fxjhbm_tab').setValue("");
        Ext.getCmp('fxjhmc_tab').setValue("");
        Ext.getCmp('sjgcbm_tab').setValue("");
        Ext.getCmp('sjgcmc_tab').setValue("");
        Ext.getCmp('wyear_tab').setValue("");
        Ext.getCmp('wmonth_tab').setValue("");
        Ext.getCmp('wck_tab').setValue("");
        Ext.getCmp('wzyq_tab').setValue("");
        Ext.getCmp('wgcbm_tab').setValue("");
        Ext.getCmp('wgcmc_tab').setValue("");
        Ext.getCmp('wys_tab').setValue("");
        Ext.getCmp('wzy_tab').setValue("");
        Ext.getCmp('wsbbm_tab').setValue("");
        Ext.getCmp('wsbmc_tab').setValue("");
        Ext.getCmp('wjsdw_tab').setValue("");
        Ext.getCmp('wgcfzr_tab').setValue("");
        Ext.getCmp('wksrq_tab').setValue("");
        Ext.getCmp('wkssj_tab').setValue("");
        Ext.getCmp('wjsrq_tab').setValue("");
        /*其他面板 数值*/
        Ext.getCmp('wnr_tab').setValue("");
        Ext.getCmp('wgz').setValue("");
        Ext.getCmp('wjjbm').setValue("");
        Ext.getCmp('wjjmc').setValue("");
        Ext.getCmp('wwlbm').setValue("");
        Ext.getCmp('wwlmc').setValue("");
        Ext.getCmp('wgg').setValue("");
        Ext.getCmp('wjldw').setValue("");
        Ext.getCmp('wdj').setValue("");
        Ext.getCmp('wsl').setValue("");
    }
};

/**
 * 底部面板 工种 机具 物料 增改 事件
 * 现阶段:only del 事件
 * @type {{}}
 */
var tabGridFunction = {
    //删除工种行
    delGz: function (value, metaData, record, rowIdx) {
        metaData.style = 'text-align: center';
        return '<a href=javascript:tabGridFunction.delRow(\'' + rowIdx + '\',"Gz");>删除</a>';
    },
    //删除物料行
    delWl: function (value, metaData, record, rowIdx) {
        metaData.style = 'text-align: center';
        return '<a href=javascript:tabGridFunction.delRow(\'' + rowIdx + '\',"Wl");>删除</a>';
    },
    //删除机具行
    delJj: function (value, metaData, record, rowIdx) {
        metaData.style = 'text-align: center';
        return '<a href=javascript:tabGridFunction.delRow(\'' + rowIdx + '\',"Jj");>删除</a>';
    },
    //应用策略者设计模式 ,针对不同 类型面板 删除行 动作进行操作
    delRow: function (idx, delType) {
        if (delType == 'Gz') {
            var data = [];
            if (type == 'add') {
                for (var i = 0; i < jhygs.length; i++) {
                    if (i != idx) {
                        data.push(jhygs[i]);
                    }
                }
                jhygs = [];
                jhygs = data;
                Ext.data.StoreManager.lookup('jhygStore').loadData(jhygs);
            } else if (type == 'edit') {
                var id = jhygs[idx].id;
                var ygid = jhygs[idx].guid;
                Ext.Ajax.request({
                    url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_YG_DEL',
                    method: 'POST',
                    async: false,
                    params: {
                        V_I_ID: id
                    },
                    success: function (resp) {
                        var resp = Ext.decode(resp.responseText);
                        if (resp.success) {
                            Ext.Ajax.request({
                                url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_YG_VIEW',
                                method: 'POST',
                                async: false,
                                params: {
                                    V_V_GUID: ygid
                                },
                                success: function (resp) {
                                    var resp = Ext.decode(resp.responseText);
                                    jhygs = [];
                                    for (var i = 0; i < resp.list.length; i++) {
                                        jhygs.push({
                                            gz: resp.list[i].V_GZ,
                                            rs: resp.list[i].V_NUM,
                                            gs: resp.list[i].V_TIME,
                                            sm: resp.list[i].V_MEMO,
                                            id: resp.list[i].I_ID,
                                            guid: resp.list[i].V_GUID
                                        });
                                    }
                                    Ext.data.StoreManager.lookup('jhygStore').loadData(jhygs);
                                }
                            });
                        }

                    }
                });
            }
        }
        if (delType == 'Wl') {
            var data = [];
            if (type == 'add') {
                for (var i = 0; i < jhwls.length; i++) {
                    if (i != idx) {
                        data.push(jhwls[i]);
                    }
                }
                jhwls = [];
                jhwls = data;
                Ext.data.StoreManager.lookup('jhwlStore').loadData(jhwls);
            } else if (type == 'edit') {
                var id = jhwls[idx].id;
                var wlid = jhwls[idx].guid;
                Ext.Ajax.request({
                    url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_WL_DEL',
                    method: 'POST',
                    async: false,
                    params: {
                        V_I_ID: id
                    },
                    success: function (resp) {
                        var resp = Ext.decode(resp.responseText);
                        if (resp.success) {
                            Ext.Ajax.request({
                                url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_WL_VIEW',
                                method: 'POST',
                                async: false,
                                params: {
                                    V_V_GUID: wlid
                                },
                                success: function (resp) {
                                    var resp = Ext.decode(resp.responseText);
                                    jhwls = [];
                                    for (var i = 0; i < resp.list.length; i++) {
                                        jhwls.push({
                                            wlbm: resp.list[i].V_WL_CODE,
                                            wlmc: resp.list[i].V_WL_NAME,
                                            jldw: resp.list[i].V_JLDW,
                                            sl: resp.list[i].V_NUM,
                                            gg: resp.list[i].V_GGXH,
                                            dj: resp.list[i].V_DJ,
                                            id: resp.list[i].I_ID,
                                            guid: resp.list[i].V_GUID

                                        });
                                    }
                                    Ext.data.StoreManager.lookup('jhwlStore').loadData(jhwls);
                                }
                            });
                        }

                    }
                });
            }
        }
        if (delType == 'Jj') {
            var data = [];
            if (type == 'add') {
                for (var i = 0; i < jjpbs.length; i++) {
                    if (i != idx) {
                        data.push(jjpbs[i]);
                    }
                }
                jjpbs = [];
                jjpbs = data;
                Ext.data.StoreManager.lookup('jjpbStore').loadData(jjpbs);
            } else if (type == 'edit') {
                var id = jjpbs[idx].id;
                var jjid = jjpbs[idx].guid;
                Ext.Ajax.request({
                    url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_JJ_DEL',
                    method: 'POST',
                    async: false,
                    params: {
                        V_I_ID: id
                    },
                    success: function (resp) {
                        var resp = Ext.decode(resp.responseText);
                        if (resp.success) {
                            Ext.Ajax.request({
                                url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_JJ_VIEW',
                                method: 'POST',
                                async: false,
                                params: {
                                    V_V_GUID: jjid
                                },
                                success: function (resp) {
                                    var resp = Ext.decode(resp.responseText);
                                    jjpbs = [];
                                    for (var i = 0; i < resp.list.length; i++) {
                                        jjpbs.push({
                                            jjbm: resp.list[i].V_JJ_CODE,
                                            jjmc: resp.list[i].V_JJ_NAME,
                                            jldw: resp.list[i].V_JLDW,
                                            sl: resp.list[i].V_NUM,
                                            id: resp.list[i].I_ID,
                                            guid: resp.list[i].V_GUID
                                        });
                                    }
                                    Ext.data.StoreManager.lookup('jjpbStore').loadData(jjpbs);
                                }
                            });
                        }

                    }
                });
            }

        }
    }
}


function OnBtnDel() {
    var guid = Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.V_GUID;
    if (guid == '' || guid == null) return;
    Ext.Ajax.request({
        url: AppUrl + 'PM_01/PRO_PM_EQUREPAIRPLAN_TREE_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_IP: GetIP().ip,
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_PERNAME: Ext.util.Cookies.get('v_personname'),
            V_V_GUID: guid
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.v_info == 'success') {
                history.go(0);
            }
        }
    });

}

function Delete4(value, metaData, record, rowIdx) {
    metaData.style = 'text-align: center';
    return '<a href=javascript:OnBtnRemove4(\'' + rowIdx + '\');>删除</a>';
}
function OnBtnRemove4(idx) {
    var data = [];
    if (type == 'add') {
        for (var i = 0; i < zynrs.length; i++) {
            if (i != idx) {
                data.push(zynrs[i]);
            }
        }
        zynrs = [];
        zynrs = data;
        Ext.data.StoreManager.lookup('zynrStore').loadData(zynrs);
    } else if (type == 'edit') {
        var id = zynrs[idx].id;
        var nrid = zynrs[idx].guid;
        Ext.Ajax.request({
            url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_NR_DEL',
            method: 'POST',
            async: false,
            params: {
                V_I_ID: id
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                if (resp.success) {
                    Ext.Ajax.request({
                        url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_NR_VIEW',
                        method: 'POST',
                        async: false,
                        params: {
                            V_V_GUID: nrid
                        },
                        success: function (resp) {
                            var resp = Ext.decode(resp.responseText);
                            zynrs = [];
                            for (var i = 0; i < resp.list.length; i++) {
                                zynrs.push({
                                    nr: resp.list[i].V_MEMO,
                                    id: resp.list[i].I_ID,
                                    guid: resp.list[i].V_GUID
                                });
                            }
                            Ext.data.StoreManager.lookup('zynrStore').loadData(zynrs);
                        }
                    });
                }

            }
        });
    }

}

function zhuxiangadd() {
    var groupguid = '';
    var ygguid = '';
    var wlguid = '';
    var jjguid = '';
    var nrguid = '';
    var addText = '';//主项 标记
    if (type == 'add') {
        groupguid = -1;
        addText = '(主)';
    } else if (type == 'edit') {
        groupguid = treeguid;
    }
    var ctt = '';
    for (var i = 0; i < zynrs.length; i++) {
        if (i == 0) {
            ctt = zynrs[i].nr;
        } else {
            ctt = ctt + ',' + zynrs[i].nr;
        }
    }
    Ext.Ajax.request({
        url: AppUrl + 'hp/PRO_PM_EQUREPAIRPLAN_TREE_SET',
        method: 'POST',
        async: false,
        params: {
            V_V_IP: GetIP().ip,
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_PERNAME: Ext.util.Cookies.get('v_personname'),
            V_V_GUID: groupguid,
            V_V_ORGCODE: Ext.getCmp('wck_tab').getValue(),
            V_V_DEPTCODE: Ext.getCmp('wzyq_tab').getValue(),
            V_V_YEAR: Ext.getCmp('wyear_tab').getValue(),
            V_V_MONTH: Ext.getCmp('wmonth_tab').getValue(),
            V_V_PROJECT_CODE: Ext.getCmp('wgcbm_tab').getValue(),
            V_V_PROJECT_NAME: Ext.getCmp('wgcmc_tab').getValue() + addText,
            V_V_PLAN_MONEY: Ext.getCmp('wys_tab').getValue(),
            V_V_DATE_DESIGN: Ext.getCmp('wgcmc_tab').getValue(),
            V_V_CONTENT: ctt,
            V_V_DATE_DESIGN: "",
            V_V_DATE_INVITE: "",
            V_V_DATE_B: Ext.Date.format(Ext.getCmp('wksrq_tab').getValue(), 'Y-m-d') + " " + Ext.Date.format(Ext.getCmp('wkssj_tab').getValue(), 'H:i:s'),
            V_V_DATE_E: Ext.Date.format(Ext.getCmp('wjsrq_tab').getValue(), 'Y-m-d') + " " + Ext.Date.format(Ext.getCmp('wjssj_tab').getValue(), 'H:i:s'),
            V_V_BUDGET_MONEY: "",
            V_V_PROGRESS: "",
            V_V_BUILD_NAMAGER: "",
            V_V_BULID_PERSON: Ext.getCmp('wgcfzr_tab').getValue(),
            V_V_DIRECT_PERSON: "",
            V_V_EQUCODE: Ext.getCmp('wsbbm_tab').getValue(),
            V_V_EQUNAME: Ext.getCmp('wsbmc_tab').getValue(),
            V_V_SPECIALTY: Ext.getCmp('wzy_tab').getValue(),
            V_V_BUILD_DEPT: Ext.getCmp('wjsdw_tab').getValue(),
            V_V_GUID_P: Ext.getCmp('sjgcguid_tab').getValue(),
            V_V_PROJECT_CODE_P: Ext.getCmp('sjgcbm_tab').getValue(),
            V_V_PROJECT_NAME_P: Ext.getCmp('sjgcmc_tab').getValue(),
            V_V_GUID_FXJH: fxjhguid,
            V_V_PROJECT_CODE_FXJH: Ext.getCmp('fxjhbm_tab').getValue(),
            V_V_PROJECT_NAME_FXJH: Ext.getCmp('fxjhmc_tab').getValue(),
            V_V_SGYC: Ext.getCmp('sgyc_tab').getValue(),
            V_V_AQDC: Ext.getCmp('aqdc_tab').getValue(),
            V_V_ROWNUMBER: zhugener + 1,
            V_V_P_ROWNUMBER: "0"
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.v_info == 'success') {
                for (var i = 0; i < jhygs.length; i++) {
                    if (type == 'add') {
                        ygguid = -1;
                    } else if (type == 'edit') {
                        ygguid = jhygs[i].id == undefined ? -1 : jhygs[i].id;
                    }
                    Ext.Ajax.request({
                        url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_YG_SET',
                        method: 'POST',
                        async: false,
                        params: {
                            V_I_ID: ygguid,
                            V_V_GUID: resp.guid,
                            V_V_GZ: jhygs[i].gz,
                            V_V_NUM: jhygs[i].rs,
                            V_V_TIME: jhygs[i].gs,
                            V_V_MEMO: jhygs[i].sm
                        },
                        success: function (resp) {
                            var resp = Ext.decode(resp.responseText);

                        }
                    });
                }
                for (var i = 0; i < jhwls.length; i++) {
                    if (type == 'add') {
                        wlguid = -1;
                    } else if (type == 'edit') {
                        wlguid = jhwls[i].id == undefined ? -1 : jhwls[i].id;
                    }
                    Ext.Ajax.request({
                        url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_WL_SET',
                        method: 'POST',
                        async: false,
                        params: {
                            V_I_ID: wlguid,
                            V_V_GUID: resp.guid,
                            V_V_WL_CODE: jhwls[i].wlbm,
                            V_V_WL_NAME: jhwls[i].wlmc,
                            V_V_JLDW: jhwls[i].jldw,
                            V_V_NUM: jhwls[i].sl,
                            V_V_GGXH: jhwls[i].gg,
                            V_V_DJ: jhwls[i].dj
                        },
                        success: function (resp) {
                            var resp = Ext.decode(resp.responseText);

                        }
                    });
                }
                for (var i = 0; i < jjpbs.length; i++) {
                    if (type == 'add') {
                        jjguid = -1;
                    } else if (type == 'edit') {
                        jjguid = jjpbs[i].id == undefined ? -1 : jjpbs[i].id;
                    }
                    Ext.Ajax.request({
                        url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_JJ_SET',
                        method: 'POST',
                        async: false,
                        params: {
                            V_I_ID: jjguid,
                            V_V_GUID: resp.guid,
                            V_V_JJ_CODE: jjpbs[i].jjbm,
                            V_V_JJ_NAME: jjpbs[i].jjmc,
                            V_V_JLDW: jjpbs[i].jldw,
                            V_V_NUM: jjpbs[i].sl
                        },
                        success: function (resp) {
                            var resp = Ext.decode(resp.responseText);

                        }
                    });
                }
                for (var i = 0; i < zynrs.length; i++) {
                    if (type == 'add') {
                        nrguid = -1;
                    } else if (type == 'edit') {
                        nrguid = zynrs[i].id == undefined ? -1 : zynrs[i].id;
                    }
                    Ext.Ajax.request({
                        url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_NR_SET',
                        method: 'POST',
                        async: false,
                        params: {
                            V_I_ID: nrguid,
                            V_V_GUID: resp.guid,
                            V_V_MEMO: zynrs[i].nr
                        },
                        success: function (resp) {
                            var resp = Ext.decode(resp.responseText);
                        }
                    });
                }
                location.reload();
            }
        }
    });
}

function zixiangadd() {
    var groupguid = '';
    var ygguid = '';
    var wlguid = '';
    var jjguid = '';
    var nrguid = '';
    var addText = ''; // 新增或修改 子项标记
    if (type == 'add') {
        groupguid = -1;
        addText = '(子)';
    } else if (type == 'edit') {
        groupguid = treeguid;
    }
    var ctt = '';
    for (var i = 0; i < zynrs.length; i++) {
        if (i == 0) {
            ctt = zynrs[i].nr;
        } else {
            ctt = ctt + ',' + zynrs[i].nr;
        }
    }
    Ext.Ajax.request({
        url: AppUrl + 'hp/PRO_PM_EQUREPAIRPLAN_TREE_SET',
        method: 'POST',
        async: false,
        params: {
            V_V_IP: GetIP().ip,
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_PERNAME: Ext.util.Cookies.get('v_personname'),
            V_V_GUID: groupguid,
            V_V_ORGCODE: Ext.getCmp('wck').getValue(),
            V_V_DEPTCODE: Ext.getCmp('wzyq').getValue(),
            V_V_YEAR: Ext.getCmp('wyear').getValue(),
            V_V_MONTH: Ext.getCmp('wmonth').getValue(),
            V_V_PROJECT_CODE: Ext.getCmp('wgcbm').getValue(),
            V_V_PROJECT_NAME: Ext.getCmp('wgcmc').getValue() + addText,
            V_V_PLAN_MONEY: Ext.getCmp('wys').getValue(),
            V_V_DATE_DESIGN: Ext.getCmp('wgcmc').getValue(),
            V_V_CONTENT: ctt,
            V_V_DATE_DESIGN: "",
            V_V_DATE_INVITE: "",
            V_V_DATE_B: Ext.Date.format(Ext.getCmp('wksrq').getValue(), 'Y-m-d') + " " + Ext.Date.format(Ext.getCmp('wkssj').getValue(), 'H:i:s'),
            V_V_DATE_E: Ext.Date.format(Ext.getCmp('wjsrq').getValue(), 'Y-m-d') + " " + Ext.Date.format(Ext.getCmp('wjssj').getValue(), 'H:i:s'),
            V_V_BUDGET_MONEY: "",
            V_V_PROGRESS: "",
            V_V_BUILD_NAMAGER: "",
            V_V_BULID_PERSON: Ext.getCmp('wgcfzr').getValue(),
            V_V_DIRECT_PERSON: "",
            V_V_EQUCODE: Ext.getCmp('wsbbm').getValue(),
            V_V_EQUNAME: Ext.getCmp('wsbmc').getValue(),
            V_V_SPECIALTY: Ext.getCmp('wzy').getValue(),
            V_V_BUILD_DEPT: Ext.getCmp('wjsdw').getValue(),
            V_V_GUID_P: Ext.getCmp('sjgcguid').getValue(),
            V_V_PROJECT_CODE_P: Ext.getCmp('sjgcbm').getValue(),
            V_V_PROJECT_NAME_P: Ext.getCmp('sjgcmc').getValue(),
            V_V_GUID_FXJH: Ext.getCmp('fxjhguid').getValue(),
            V_V_PROJECT_CODE_FXJH: Ext.getCmp('fxjhbm').getValue(),
            V_V_PROJECT_NAME_FXJH: Ext.getCmp('fxjhmc').getValue(),
            V_V_SGYC: Ext.getCmp('sgyc_tab').getValue(),
            V_V_AQDC: Ext.getCmp('aqdc_tab').getValue(),
            V_V_ROWNUMBER: zigener,
            V_V_P_ROWNUMBER: rownumber
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.v_info == 'success') {
                for (var i = 0; i < jhygs.length; i++) {
                    if (type == 'add') {
                        ygguid = -1;
                    } else if (type == 'edit') {
                        ygguid = jhygs[i].id == undefined ? -1 : jhygs[i].id;
                    }
                    Ext.Ajax.request({
                        url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_YG_SET',
                        method: 'POST',
                        async: false,
                        params: {
                            V_I_ID: ygguid,
                            V_V_GUID: resp.guid,
                            V_V_GZ: jhygs[i].gz,
                            V_V_NUM: jhygs[i].rs,
                            V_V_TIME: jhygs[i].gs,
                            V_V_MEMO: jhygs[i].sm
                        },
                        success: function (resp) {
                            var resp = Ext.decode(resp.responseText);

                        }
                    });
                }
                for (var i = 0; i < jhwls.length; i++) {
                    if (type == 'add') {
                        wlguid = -1;
                    } else if (type == 'edit') {
                        wlguid = jhwls[i].id == undefined ? -1 : jhwls[i].id;
                    }
                    Ext.Ajax.request({
                        url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_WL_SET',
                        method: 'POST',
                        async: false,
                        params: {
                            V_I_ID: wlguid,
                            V_V_GUID: resp.guid,
                            V_V_WL_CODE: jhwls[i].wlbm,
                            V_V_WL_NAME: jhwls[i].wlmc,
                            V_V_JLDW: jhwls[i].jldw,
                            V_V_NUM: jhwls[i].sl,
                            V_V_GGXH: jhwls[i].gg,
                            V_V_DJ: jhwls[i].dj
                        },
                        success: function (resp) {
                            var resp = Ext.decode(resp.responseText);

                        }
                    });
                }
                for (var i = 0; i < jjpbs.length; i++) {
                    if (type == 'add') {
                        jjguid = -1;
                    } else if (type == 'edit') {
                        jjguid = jjpbs[i].id == undefined ? -1 : jjpbs[i].id;
                    }
                    Ext.Ajax.request({
                        url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_JJ_SET',
                        method: 'POST',
                        async: false,
                        params: {
                            V_I_ID: jjguid,
                            V_V_GUID: resp.guid,
                            V_V_JJ_CODE: jjpbs[i].jjbm,
                            V_V_JJ_NAME: jjpbs[i].jjmc,
                            V_V_JLDW: jjpbs[i].jldw,
                            V_V_NUM: jjpbs[i].sl
                        },
                        success: function (resp) {
                            var resp = Ext.decode(resp.responseText);

                        }
                    });
                }
                for (var i = 0; i < zynrs.length; i++) {
                    if (type == 'add') {
                        nrguid = -1;
                    } else if (type == 'edit') {
                        nrguid = zynrs[i].id == undefined ? -1 : zynrs[i].id;
                    }
                    Ext.Ajax.request({
                        url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_NR_SET',
                        method: 'POST',
                        async: false,
                        params: {
                            V_I_ID: nrguid,
                            V_V_GUID: resp.guid,
                            V_V_MEMO: zynrs[i].nr
                        },
                        success: function (resp) {
                            var resp = Ext.decode(resp.responseText);

                        }
                    });
                }
                location.reload();
                //重新加载 grid 以及 gantt 图
                //window.opener.loadGantt(fxjhguid);
            }
        }
    });
}

/*
 各种弹出页面 父窗口选择相应值后   回调 函数
 */
//人工 机具 物料等
function getReturnValue(obj) {
    if (obj[0].data.V_WORKNAME != undefined) {
        Ext.getCmp('wgz').setValue(obj[0].data.V_WORKNAME);
    }
    if (obj[0].data.V_CARCODE != undefined) {
        Ext.getCmp('wjjbm').setValue(obj[0].data.V_CARCODE);
        Ext.getCmp('wjjmc').setValue(obj[0].data.V_CARNAME);
    }
    if (obj[0].data.VCH_SPAREPART_CODE != undefined) {
        Ext.getCmp('wwlbm').setValue(obj[0].data.VCH_SPAREPART_CODE);
        Ext.getCmp('wwlmc').setValue(obj[0].data.VCH_SPAREPART_NAME);
        Ext.getCmp('wgg').setValue(obj[0].data.VCH_TYPE);
        Ext.getCmp('wjldw').setValue(obj[0].data.VCH_UNIT);
        Ext.getCmp('wdj').setValue(obj[0].data.PRICE);
        Ext.getCmp('wsl').setValue(obj[0].data.ABLECOUNT);
    }
}
//设备选择 页面回调
function getEquipReturnValue(ret) {
    var str = ret.split('^');
    Ext.getCmp('wsbbm_tab').setValue(str[0]);
    Ext.getCmp('wsbmc_tab').setValue(str[1]);
}




