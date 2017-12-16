//计划厂矿
var ckStore = Ext.create("Ext.data.Store", {
    storeId: 'ckStore',
    autoLoad: true,
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
//作业区
var zyqStore = Ext.create('Ext.data.Store', {
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

//页面表格信息加载
var gridStore = Ext.create('Ext.data.Store', {
    id: 'gridStore',
    pageSize: 15,
    autoLoad: false,
    fields: ['I_ID', 'V_ORGCODE', 'V_DEPTCODE', 'V_ORGNAME', 'V_DEPTNAME', 'V_REPAIRCODE',
        'V_REPAIRNAME', 'V_FLOWCODE', 'V_FLOWNAME', 'V_FLOWSTEP', 'V_ORDER', 'V_BZ', 'V_NEXTSTEP',
        'V_URL', 'V_FLOWTYPE_CODE', 'V_FLOWTYPE_NAME', 'V_GUID', 'V_ROLECODE', 'V_ROLENAME', 'V_PERCODE', 'V_PERNAME','V_FLOWNAME_NEXT'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'pm_19/PM_03_FLOW_STATE_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list',
            total: 'total'
        }
    }
});
var northPanel = Ext.create('Ext.form.Panel', {
    region: 'north',
    border: false,
    layout: 'column',
    defaults: {
        style: 'margin:5px 0px 5px 5px',
        labelAlign: 'right'
    },
    frame: true,
    items: [
        {
            xtype: 'combo',
            id: 'ck',
            fieldLabel: '单位名称',
            editable: false,
            labelWidth: 55,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            store: ckStore,
            queryMode: 'local'
        },
        {
            xtype: 'combo',
            id: 'zyq',
            fieldLabel: '作业区',
            editable: false,
            labelWidth: 55,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            store: zyqStore,
            queryMode: 'local'
        },
        {
            xtype: 'combo',
            id: 'lclx',
            fieldLabel: '流程类型',
            editable: false,
            labelWidth: 55,
            displayField: 'displayField',
            valueField: 'valueField',
            store: [['YEAR', '年计划'],
                ['MONTH', '月计划'],
                ['QUARTER', '季计划'],
                ['WEEK', '周计划']],
            queryMode: 'local',
            value:'YEAR',
        },
        {xtype: 'button', text: '查询', icon: imgpath + '/search.png', handler: queryGrid},
        {xtype: 'button', text: '添加流程步骤', icon: imgpath + '/add.png', handler: OnAddClicked},
        {xtype: 'button', text: '修改流程步骤', icon: imgpath + '/add.png', handler: OnEditClicked},
        {xtype: 'button', text: '删除', icon: imgpath + '/delete1.png', handler: OnDeleteClicked}
    ]
});

var gridPanel = Ext.create('Ext.grid.Panel', {
    id: 'grid',
    region: 'center',
    border: false,
    store: 'gridStore',
    selType: 'checkboxmodel',
    columns: [
        {text: '序号', align: 'center', width: 50, xtype: 'rownumberer'},
        {text: '单位名称', width: 200, dataIndex: 'V_ORGNAME', align: 'center'},
        {text: '作业区名称', width: 200, dataIndex: 'V_DEPTNAME', align: 'center'},
        {text: '流程步骤名称', width: 150, dataIndex: 'V_FLOWNAME', align: 'center'},
        {text: '下一步流程步骤名称', width: 150, dataIndex: 'V_FLOWNAME_NEXT', align: 'center'},
        {text: '角色名称', width: 100, dataIndex: 'V_ROLENAME', align: 'center'},
        {text: '审批人', width: 100, dataIndex: 'V_PERNAME', align: 'center'},
        {text: '排序', width: 100, dataIndex: 'V_ORDER', align: 'center'}
    ],
    bbar: ["->",
        {
            xtype: 'pagingtoolbar',
            store: gridStore,
            width: '100%',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
        }
    ]
});

Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [northPanel, gridPanel]
    });
    //计划厂矿加载时
    Ext.data.StoreManager.lookup('ckStore').on('load', function () {
        Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });
    //计划厂矿更改时加载作业区
    Ext.getCmp('ck').on('select', function () {
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });
    //作业区
    Ext.data.StoreManager.lookup('zyqStore').on('load', function () {
        Ext.getCmp("zyq").select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
    });
    //作业区改变
    Ext.getCmp('zyq').on('select', function () {
    });
});
function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
//查询
function queryGrid() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
            V_V_PLANTYPE: Ext.getCmp('lclx').getValue()
        }
    });
}
//添加
function OnAddClicked() {
    var ret = window.open(AppUrl + 'page/PM_199801/index.html?V_ID=-1'
        + '&V_ORGCODE=' + Ext.getCmp('ck').getValue()
        + '&V_DEPTCODE=' + Ext.getCmp('zyq').getValue()
        + '&V_FLOWTYPE=' + Ext.getCmp('lclx').getValue(), '', 'height=600,width=1200,top=50px,left=100px,resizable=yes');
    ;
}
//修改
function OnEditClicked() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    var length = seldata.length;
    if (length != 1) {
        Ext.Msg.alert('操作信息', '请选择一条记录进行修改');
        return false;
    }
    var V_ID = seldata[0].data.V_GUID;
    var ret = window.open(AppUrl + 'page/PM_199801/index.html?V_ID=' + V_ID, '', 'height=600,width=1200,top=50px,left=100px,resizable=yes');
}
//删除
function OnDeleteClicked() {
    var length = Ext.getCmp('grid').getSelectionModel().getSelection().length;
    if (length == 0) {
        Ext.Msg.alert('操作信息', '请选择信息进行删除');
        return false;
    }
    var i_err = 0;
    for (var i = 0; i < length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'pm_19/PM_03_FLOW_STATE_DEL',
            method: 'POST',
            async: false,
            params: {
                V_V_GUID: Ext.getCmp('grid').getSelectionModel().getSelection()[i].data.V_GUID,
                V_V_ID: Ext.getCmp('grid').getSelectionModel().getSelection()[i].data.I_ID
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                if (resp.V_INFO == 'success') {
                    i_err++;
                } else {
                    Ext.Msg.alert('操作信息', '删除失败');
                }
            }
        });
    }
    if (i_err == length) {
        Ext.Msg.alert('操作信息', '删除成功');
    }
    queryGrid();
}