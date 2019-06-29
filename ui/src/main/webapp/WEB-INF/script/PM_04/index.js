//年份
var today = new Date();
var Year = [];
for (var i = today.getFullYear()-1; i <= today.getFullYear()+3; i++)Year.push({displayField: i, valueField: i});

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
var gridStore = Ext.create('Ext.data.Store', {
    id : 'gridStore',
    pageSize : 15,
    autoLoad : false,
    fields :['I_ID',
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
        'V_INTIEM'],
    proxy : {
        type : 'ajax',
        async : false,
        url : AppUrl + 'PROJECT/PM_04_PROJECT_DATA_ITEM_SEL',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list',
            total : 'total'
        }
    }
});
var northPanel = Ext.create('Ext.panel.Panel', {
    border: false,
    region: 'north',
    items: [
        {layout: 'column', defaults: {labelAlign: 'right'},frame:true,border: false,
            items: [
                {xtype: 'combo',id:'year',fieldLabel: '年份',editable: false, margin: '5 0 5 5',labelWidth:40,displayField: 'displayField',valueField: 'valueField',value:today.getFullYear(),store:yearStore,queryMode: 'local'},
                {xtype:'combo',id:'ck',fieldLabel: '厂矿', margin: '5 0 5 5',labelWidth:40,value: '',displayField: 'V_DEPTNAME',valueField: 'V_DEPTCODE',editable: false,queryMode: 'local',store:ckStore},
                {xtype:'combo',id:'lx',fieldLabel: '类型', margin: '5 0 5 5',labelWidth:40, value: '',displayField: 'V_TYPE_NAME',valueField: 'V_TYPE_CODE',editable: false,queryMode: 'local',store:lxStore},
                {xtype: 'combo',id:'zy', fieldLabel: '专业', margin: '5 0 5 5',labelWidth:40,value: '',displayField: 'V_MAJOR_NAME',valueField: 'V_MAJOR_CODE',editable: false,queryMode: 'local',store:zyStore},
                {xtype: 'textfield', id:'text',margin: '5 0 5 50',width:158, value:'',emptytext:''},
                {xtype: 'button', text: '查询', margin: '5 0 5 20',icon: imgpath + '/search.png',handler: queryGrid},
                {xtype: 'button', text: '选择', margin: '5 0 5 20',icon: imgpath + '/cog.png',handler: select}
            ]
        }
    ]
});
var gridPanel = Ext.create('Ext.grid.Panel', {
    id:'grid',
    region: 'center',
    border: false,
    store:gridStore,
    selType:'checkboxmodel',
    columns: [
        {text: '序号', align: 'center', width: 50, xtype: 'rownumberer'},
        {text: '厂矿名称', align: 'center', width: 100,dataIndex: 'V_ORGNAME'},
        {text: '作业区名称', align: 'center', width: 100,dataIndex: 'V_DEPTNAME'},
        {text: '工程类型名称', align: 'center', width: 100,dataIndex: 'V_TYPE_NAME'},
        {text: '专业名称', align: 'center', width: 100,dataIndex: 'V_MAJOR_NAME'},
        {text: '工程项目编码', align: 'center', width: 150,dataIndex: 'V_PROJECT_CODE'},
        {text: '工程项目名称', align: 'center', width: 100,dataIndex: 'V_PROJECT_NAME'},
        {text: 'WBS编码', align: 'center', width: 150,dataIndex: 'V_WBS_CODE'},
        {text: '维修工程项目名称', align: 'center', width: 100,dataIndex: 'V_WBS_NAME'},
        {text: '主要修理内容', align: 'center', width:200,dataIndex: 'V_CONTENT'},
        {text: '实施计划额（万元）', align: 'center', width: 100,dataIndex: 'V_BUDGET_MONEY'},
        {text: '施工单位名称', align: 'center', width: 100,dataIndex: 'V_REPAIR_DEPTNAME'},
        {text: '项目负责人名称', align: 'center', width: 100,dataIndex: 'V_FZRNAME'},
        {text: '预计开工时间', align: 'center', width: 150,dataIndex: 'V_DATE_B',renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
        {text: '预计竣工时间', align: 'center', width: 150,dataIndex: 'V_DATE_E',renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
        {text: '备注', align: 'center', width: 200,dataIndex: 'V_BZ'},
        {text: '流程状态', align: 'center', width: 100,dataIndex: 'V_FLOW_STATE'},
        {text: '录入人编码', align: 'center', width: 100,dataIndex: 'V_INPERCODE'},
        {text: '录入人名称', align: 'center', width: 100,dataIndex: 'V_INPERNAME'},
        {text: '录入时间', align: 'center', width: 150,dataIndex: 'V_INTIEM'}
    ],
    bbar:["->",
        {
            id: 'page',
            xtype: 'pagingtoolbar',
            store:gridStore,
            width:'100%',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
        }]


});
Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        title: "Viewport",
        layout: "border",
        items: [northPanel, gridPanel]
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_V_YEAR:Ext.getCmp('year').getValue(),
            V_V_ORGCODE : Ext.getCmp('ck').getValue(),
            V_V_TYPE_CODE : Ext.getCmp('lx').getValue(),
            V_V_MAJOR_CODE : Ext.getCmp('zy').getValue(),
            V_V_TEXT : Ext.getCmp('text').getValue(),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize

        }
    });
    //厂矿加载监听
    Ext.data.StoreManager.lookup('ckStore').on('load', function () {
        Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
    });
    //类型加载监听
    Ext.data.StoreManager.lookup('lxStore').on('load', function () {
        Ext.getCmp('lx').select(Ext.data.StoreManager.lookup('lxStore').getAt(0));
    });
    //专业加载监听
    Ext.data.StoreManager.lookup('zyStore').on('load', function () {
        Ext.getCmp('zy').select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
    });
});

function queryGrid(){
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_YEAR:Ext.getCmp('year').getValue(),
            V_V_ORGCODE : Ext.getCmp('ck').getValue(),
            V_V_TYPE_CODE : Ext.getCmp('lx').getValue(),
            V_V_MAJOR_CODE : Ext.getCmp('zy').getValue(),
            V_V_TEXT : Ext.getCmp('text').getValue(),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    });
}
function select() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length!= 1) {
        alert('请选择一条数据！');
        return false;
    }
    var retdata = [];
    retdata.push(seldata[0].data.V_WBS_CODE);
    retdata.push(seldata[0].data.V_WBS_NAME);
    retdata.push(seldata[0].data.V_PROJECT_CODE);
    retdata.push(seldata[0].data.V_PROJECT_NAME);
    window.opener.getReturnWBS(retdata);
    window.close();
}

