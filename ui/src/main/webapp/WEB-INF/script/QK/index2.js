var zyqstore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'zyqstore',
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
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
            V_V_DEPTCODENEXT: '%',
            V_V_DEPTTYPE: '[主体作业区]'
        }

    }
});

var zystore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'zystore',
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

var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    pageSize: 20,
    fields: [
        'V_ITEMCODE', 'V_ITEMNAME', 'V_TIME_B', 'V_TIME_E',
        'V_MAJOR', 'V_MONEY', 'V_BUDGET_MONEY', 'V_EXPLAIN', 'V_SCHEME', 'INSERTPERSON'
    ],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'qk/PM_EQU_REPAIR_DATA_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});


var Layout = {
    layout: 'border',
    items: [
        {
            xtype: 'panel', region: 'center', layout: 'border', baseCls: 'my-panel-no-border',
            items: [
                {
                    xtype: 'panel', region: 'north', layout: 'column', /*baseCls: 'my-panel-no-border',*/
                    defaults: {
                        margin: '5px 0 5px 3px',
                        labelAlign: 'right',
                        labelWidth: 40
                    },
                    items: [{
                        xtype: 'combo',
                        id: 'zyq',
                        width: 180,
                        labelWidth: 60,
                        store: zyqstore,
                        fieldLabel: '作业区',
                        displayField: 'V_DEPTNAME',
                        valueField: 'V_DEPTCODE',
                        queryMode: 'local',
                        editable: false
                    }, {
                        xtype: 'combo',
                        id: 'zy',
                        width: 140,
                        store: 'zystore',
                        editable: false,
                        displayField: 'V_BASENAME',
                        valueField: 'V_SPECIALTYCODE',
                        fieldLabel: '专业'
                    }, {
                        xtype: 'combo',
                        width: 140,
                        fieldLabel: '年份',
                        editable: false,
                        id: 'year',
                        store: CreateYearStore(),
                        value: new Date().getFullYear(),
                        valueField: 'VALUE',
                        displayField: 'DISPLAY'
                    }, {
                        xtype: 'combo',
                        width: 140,
                        fieldLabel: '月份',
                        editable: false,
                        id: 'month',
                        store: CreateMonthStore(),
                        value: new Date().getMonth() + 1,
                        valueField: 'VALUE',
                        displayField: 'DISPLAY'
                    }, {
                        xtype: 'combo',
                        width: 160,
                        labelWidth: 60,
                        fieldLabel: '单据状态',
                        editable: false,
                        id: 'zt',
                        store: CreateCategoryStore(),
                        value: 0,
                        valueField: 'VALUE',
                        displayField: 'DISPLAY'
                    }, {
                        xtype: 'textfield',
                        id: 'xmmc',
                        width: 140,
                        emptyText: '项目名称'
                    }, {
                        xtype: 'button',
                        text: '查询',
                        icon: imgpath + '/search.png',
                        handler: query
                    }]
                },
                {
                    xtype: 'gridpanel',
                    region: 'center',
                    frame: true,
                    id: 'grid',
                    store: 'gridStore',
                   // margin: '5px 0px 0px 3px',
                    columnLines: true,
                    selModel: {selType: 'checkboxmodel', mode: 'SINGLE'},
                    columns: [
                        {xtype: 'rownumberer', text: '序号', width: 35, sortable: false},
                        {text: '项目编码 ', align: 'center', dataIndex: 'V_ITEMCODE', width: 150},
                        {text: '项目名称 ', dataIndex: 'V_ITEMNAME', align: 'center', width: 150,
                        renderer : detail},
                        {text: '专业 ', dataIndex: 'V_MAJOR', align: 'center', width: 150},
                        {
                            text: '计划施工日期 ', dataIndex: 'V_TIME_B', align: 'center', width: 150,
                            renderer: function renderYear(value) {
                                return Ext.util.Format.date(value, 'Y-m-d');
                            }
                        },
                        {
                            text: '计划月份 ', dataIndex: 'V_TIME_E', align: 'center', width: 150,
                            renderer: function renderYear(value) {
                                return Ext.util.Format.date(value, 'Y-m-d');
                            }
                        },
                        {text: '工程总概算(万元)', dataIndex: 'V_MONEY', align: 'center', width: 150},
                        {text: '工程总预算(万元)', dataIndex: 'V_BUDGET_MONEY', align: 'center', width: 150},
                        {text: '缺陷说明及费用', dataIndex: 'V_EXPLAIN', align: 'center', width: 150},
                        {text: '采取方案', dataIndex: 'V_SCHEME', align: 'center', width: 150}
                    ]
                }
            ]
        }
    ]
};

function RenderFontLeft(value, metaData) {
    metaData.style = 'text-align: left';
    return value;
}
//确认选择按钮
function query() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_ORGCODE: Ext.util.Cookies.get('v_orgCode'),
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
            V_V_ITEMNAME: Ext.getCmp('xmmc').getValue(),
            V_V_YEAR: Ext.getCmp('year').getValue(),
            V_V_MONTH: Ext.getCmp('month').getValue(),
            V_V_FLOW_STATUS: Ext.getCmp('zt').getValue(),
            V_V_ZY: Ext.getCmp('zy').getValue()

        }
    });
}

function onPageLoaded() {
    Ext.create('Ext.container.Viewport', Layout);
    zyqstore.on("load", function () {
        Ext.getCmp("zyq").select(zyqstore.getAt(0));
    });

    zystore.on("load", function () {
        zystore.insert(0, {V_BASENAME: '全部', V_SPECIALTYCODE: '%'});
        Ext.getCmp("zy").select(zystore.getAt(0));
    });

    Ext.ComponentManager.get("zyq").on("change", function () {
        zystore.load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue()
            }
        });
    });
}

Ext.onReady(onPageLoaded);


function CreateYearStore() {
    var year = [];
    for (var i = new Date().getFullYear() - 1; i <= new Date().getFullYear() + 1; i++) {
        year.push({
            VALUE: i,
            DISPLAY: '--' + i + '年--'
        });
    }
    return {
        fields: ['VALUE', 'DISPLAY'],
        data: year
    };
}

function CreateMonthStore() {
    var month = [];
    for (var i = 1; i <= 12; i++) {
        month.push({
            VALUE: i,
            DISPLAY: '--' + i + '月--'
        });
    }
    month.push({
        VALUE: '%',
        DISPLAY: '--全年--'
    });
    return {
        fields: ['VALUE', 'DISPLAY'],
        data: month
    };
}

function CreateCategoryStore() {
    var category = [];
    category.push({
        VALUE: 0,
        DISPLAY: '暂时保存'
    });
    category.push({
        VALUE: 1,
        DISPLAY: '未上报'
    });
    category.push({
        VALUE: 2,
        DISPLAY: '已上报'
    });
    category.push({
        VALUE: 3,
        DISPLAY: '审批中'
    });
    category.push({
        VALUE: 4,
        DISPLAY: '审批完成'
    });
    category.push({
        VALUE: 5,
        DISPLAY: '驳回'
    });
    return {
        fields: ['VALUE', 'DISPLAY'],
        data: category
    };
}

function detail(a,value,metaData){
    return '<a href="javascript:ondetail(\'' + metaData.data.V_FLOWGUID + '\')">'+a+'</a>';
}

function ondetail(a){
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
   // var ret = window.open(AppUrl + 'page/PM_030211/index.html?V_JXMX_CODE=' + a+'&V_JXGX_CODE='+V_JXGX_CODE , '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,channelmode=yes,resizable=yes');
}
