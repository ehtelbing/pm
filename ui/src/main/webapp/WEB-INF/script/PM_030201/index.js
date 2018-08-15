var dt = new Date();
var thisYear = dt.getFullYear();
var years = [];
//年份
for (var i =thisYear - 4; i <= thisYear + 1; i++) {
    years.push({displayField: i, valueField: i});
}

var yearStore = Ext.create("Ext.data.Store", {
    storeId: 'yearStore',
    fields: ['displayField', 'valueField'],
    data: years,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});

Ext.onReady(function () {
    Ext.QuickTips.init();

    //厂矿计划数据加载
    var ckStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'ckStore',
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

    //作业区加载
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

    //表格信息加载
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 50,
        autoLoad: false,
        fields: [],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'cjy/PRO_PM_03_PLAN_YEAR_VIEW',
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

    var panel = Ext.create('Ext.Panel', {
        id: 'panel',
        region: 'north',
        width: '100%',
        frame: true,
        layout: 'column',
        defaults: {
            style: 'margin:5px 0px 5px 5px',
            labelAlign: 'right'
        },
        items: [{
            id: 'year',
            store: Ext.create("Ext.data.Store", {
                fields: ['displayField', 'valueField'],
                data: years,
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'json'
                    }
                }
            }),
            xtype: 'combo',
            fieldLabel: '年份',
            value: new Date().getFullYear()+1,
            labelWidth: 80,
            width: 250,
            labelAlign: 'right',
            editable: false,
            displayField: 'displayField',
            valueField: 'valueField'
        }, {
            xtype: 'combo',
            id: "ck",
            store: ckStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '计划厂矿',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            labelWidth: 80,
            width: 250
        }, {
            xtype: 'combo',
            id: "zyq",
            store: zyqStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '作业区',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            labelWidth: 80,
            width: 250
        }, {
            xtype: 'combo',
            id: "zy",
            store: zyStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '专业',
            displayField: 'V_BASENAME',
            valueField: 'V_SPECIALTYCODE',
            labelWidth: 80,
            width: 250
        }, {
            xtype: 'textfield',
            id: "jxnr",
            editable: false,
            queryMode: 'local',
            fieldLabel: '检修内容',
            labelWidth: 80,
            width: 250
        }, {
            xtype: 'button',
            text: '查询',
            style: ' margin: 5px 0px 0px 10px',
            icon: imgpath + '/search.png',
            listeners: {click: OnButtonQuery}
        },{
                xtype: 'button',
                text: '新增工程项目',
                icon: imgpath + '/add.png',
                listeners: {click: OnButtonAdd}
            },
            {
                xtype: 'button',
                text: '修改工程项目',
                icon: imgpath + '/add.png',
                listeners: {click: OnButtonEdit}
            },
            {
                xtype: 'button',
                text: '删除工程项目',
                icon: imgpath + '/edit.png',
                listeners: {click: OnButtonDel}
            },
            {
                xtype: 'button',
                text: '导出',
                icon: imgpath + '/accordion_collapse.png',
                listeners: {click: OnButtonOut}
            }
        ]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        region: 'center',
        width: '100%',
        pageSize: 5,
        columnLines: true,
        store: gridStore,
        autoScroll: true,
        selType: 'checkboxmodel',
        style: 'text-align:center',
        height: 400,
        selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [{xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text: '项目编码', width: 140, dataIndex: 'V_EQUNAME', align: 'center'},
            {text: '项目名称', width: 140, dataIndex: 'V_REPAIRMAJOR_CODE', align: 'center'},
            {text: '维修类型', width: 100, dataIndex: 'V_HOUR', align: 'center'},
            {text: '专业', width: 100, dataIndex: 'V_DEPTNAME', align: 'center'},
            {text: '维修内容', width: 200, dataIndex: 'V_ORGNAME', align: 'center'},
            {text: '维修费用', width: 100, dataIndex: 'INPERNAME', align: 'center'},
            {text: '开工时间', width: 140, dataIndex: 'INPERNAME', align: 'center'},
            {text: '竣工时间', width: 140, dataIndex: 'INPERNAME', align: 'center'}],
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
        id: "id",
        layout: 'border',
        items: [panel, grid]
    });

    Ext.data.StoreManager.lookup('ckStore').on('load',function(){
        Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
    });

});

function _init() {

}

function beforeloadStore(store) {
    store.proxy.extraParams.parName = ['V_V_PERSONCODE', 'V_I_YEAR', 'V_V_DEPTCODE', 'V_V_DEPTNEXTCODE'];
    store.proxy.extraParams.parType = ['s', 's', 's', 's'];
    store.proxy.extraParams.parVal = [Ext.util.Cookies.get('v_personcode'), Ext.getCmp('year').getValue(),
        Ext.getCmp('ck').getValue(), Ext.getCmp('zyq').getValue()];
    store.proxy.extraParams.proName = 'PRO_PM_PLAN_YEAR_DJY_VIEW';
    store.proxy.extraParams.cursorName = 'V_CURSOR';
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}


function OnButtonQuery (){}

function OnButtonAdd(){}

function OnButtonEdit(){}

function OnButtonDel(){}

function OnButtonOut(){}