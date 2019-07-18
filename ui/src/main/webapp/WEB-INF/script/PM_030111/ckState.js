var date = new Date();

//年份
var years = [];
for (var i = date.getFullYear() - 4; i <= date.getFullYear() + 1; i++) {
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
//月份
var months = [];
for (var i = 1; i <= 12; i++) {
    months.push({displayField: i, valueField: i});
}
var monthStore = Ext.create("Ext.data.Store", {
    storeId: 'monthStore',
    fields: ['displayField', 'valueField'],
    data: months,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});
//周
var weeks = [];
for (var i = 1; i <= 5; i++) {
    weeks.push({displayField: i, valueField: i});
}
var weekStore = Ext.create("Ext.data.Store", {
    storeId: 'weekStore',
    fields: ['displayField', 'valueField'],
    data: weeks,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});

//计划厂矿
var jhckStore = Ext.create('Ext.data.Store', {
    autoLoad: true,
    storeId: 'jhckStore',
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


//页面表格信息加载
var gridStore = Ext.create('Ext.data.Store', {
    id: 'gridStore',
    pageSize: 15,
    autoLoad: false,
    fields: ['V_ORGCODE',
        'V_ORGNAME',
        'ALLNUM',
        'EXENUM',
        'EXTRATE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'dxfile/PM_03_WEEK_PLAN_CKSTAT_SEL',
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
    frame: true,
    border: false,
    //baseCls: 'my-panel-no-border',
    layout: 'column',
    defaults: {labelAlign: 'right'},
    items: [
        {
            xtype: 'combo',
            id: 'nf',
            fieldLabel: '年份',
            editable: false,
            margin: '5 0 0 5',
            labelWidth: 80,
            width: 230,
            displayField: 'displayField',
            valueField: 'valueField',
            value: '',
            store: yearStore,
            queryMode: 'local'
        },
        {
            xtype: 'combo',
            id: 'yf',
            fieldLabel: '月份',
            editable: false,
            margin: '5 0 0 5',
            labelWidth: 80,
            width: 230,
            displayField: 'displayField',
            valueField: 'valueField',
            value: '',
            store: monthStore,
            queryMode: 'local'
        },
        {
            xtype: 'combo',
            id: 'zhou',
            fieldLabel: '周',
            editable: false,
            margin: '5 0 0 5',
            labelWidth: 80,
            width: 230,
            displayField: 'displayField',
            valueField: 'valueField',
            value: '',
            store: weekStore,
            queryMode: 'local'
        },
        // {
        //     xtype: 'combo',
        //     id: 'jhck',
        //     fieldLabel: '计划厂矿',
        //     editable: false,
        //     margin: '5 0 0 5',
        //     labelWidth: 80,
        //     width: 230,
        //     value: '',
        //     displayField: 'V_DEPTNAME',
        //     valueField: 'V_DEPTCODE',
        //     store: jhckStore,
        //     queryMode: 'local'
        // },
        {
            xtype: 'panel', frame: true, width: '100%', layout: 'column', colspan: 3, baseCls: 'my-panel-noborder',style: 'margin:0 5px 0 85px',
            items: [
        {
            xtype: 'button', text: '查询', margin: '5 0 5 5', icon: imgpath + '/search.png',
            handler: function () {
                query();
            }
        }, {
            xtype: 'button',
            text: '导出excel',
            style: ' margin: 5px 0px 5px 5px',
            icon: imgpath + '/excel.gif',
            width: 100,
            listeners: {
                click: OnClickExcelButton
            }
        },{xtype:'label', style: ' margin: 8px 0px 5px 5px;color:red',text:'*注：执行数为生成工单数量；执行率为执行数/审批完成的周计划总数'}
    ]}
        ]
});

var gridPanel = Ext.create('Ext.grid.Panel', {
    id: 'gridPanel',
    region: 'center',
    border: false,
    store: 'gridStore',
    columnLines: true,
    // selType: 'checkboxmodel',
    columns: [
        {text: '序号', align: 'center', width: 50, xtype: 'rownumberer'},
        {text: '厂矿CODE', align: 'center', width: 190, dataIndex: 'V_ORGCODE',hidden:true},
        {text: '厂矿', align: 'center', width: 250, dataIndex: 'V_ORGNAME',renderer:aleft},
        {text: '总数', align: 'center', width: 190, dataIndex: 'ALLNUM',renderer:aleft},
        {text: '执行数', align: 'center', width: 190, dataIndex: 'EXENUM',renderer:aleft},
        {text: '执行率（%)', align: 'center', width: 190, dataIndex: 'EXTRATE',renderer:aleft},
        {text:'查看详情',align:'center',width:200,dataIndex:'V_ORGCODE',renderer:turnTo}
    ]
    // ,bbar: ["->",
    //     {
    //         id: 'page',
    //         xtype: 'pagingtoolbar',
    //         store: gridStore,
    //         width: '100%',
    //         dock: 'bottom',
    //         displayInfo: true,
    //         displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
    //         emptyMsg: '没有记录'
    //     }
    // ]
});
Ext.onReady(function () {
    Ext.QuickTips.init();
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [northPanel, gridPanel]
    });


    if(getWeekOfMonth()==0){
        if(new Date().getMonth()==0){
            Ext.getCmp('nf').select(new Date().getFullYear()-1);
            Ext.getCmp('yf').select(12);
            Ext.getCmp('zhou').select(5);
        }else{
            Ext.getCmp('nf').select(new Date().getFullYear());
            Ext.getCmp('yf').select(new Date().getMonth());
            Ext.getCmp('zhou').select(5);
        }
    }else{
        Ext.getCmp('nf').select(new Date().getFullYear());
        Ext.getCmp('yf').select(new Date().getMonth() + 1);
        Ext.getCmp('zhou').select(getWeekOfMonth());
    }

    // Ext.getCmp('nf').select(new Date().getFullYear());
    // Ext.getCmp('yf').select(new Date().getMonth() + 1);
    // Ext.getCmp('zhou').select(getWeekOfMonth());
    //计划厂矿加载监听
    query();
    Ext.getCmp('nf').on('select', function () {
        query();
    });
    Ext.getCmp('yf').on('select', function () {
        query();
    });
    Ext.getCmp('zhou').on('select', function () {
        query();
    });


});

//第几周
function getWeekOfMonth() {
    var date = new Date();
    var w = date.getDay();
    var d = date.getDate();
    // return Math.ceil((d + 6 - w) / 7);
    return Math.ceil((d  - w) / 7);
}


function OnClickExcelButton() {

    var V_V_V_ORGCODE = '' ;//Ext.getCmp('jhck').getValue() == '%' ? '0' : Ext.getCmp('jhck').getValue();

    document.location.href = AppUrl + 'dxfile/CK_WEEK_STATE_EXCEL?V_V_YEAR=' + Ext.getCmp('nf').getValue()
        + '&V_V_MONTH=' + Ext.getCmp('yf').getValue()
        + '&V_V_WEEK=' + Ext.getCmp('zhou').getValue()
        + '&V_V_ORGCODE=' + V_V_V_ORGCODE;
}

function aleft(value,cellmeta,record,rowIndex,columnIndex,store){
    var newval=value.substring(0,4);
    return '<div data-qtip="' + newval + '" >' + newval + '</div>';
}



function turnTo(value, metaData, record, rowIdx, colIdx, store, view){
    return '<a href="javascript:viewZyqState(\'' + value + '\')">' + "查看详情" + '</a>';
}
function viewZyqState(ckval){
    window.open(AppUrl + 'page/PM_030111/ckDetailState.html?V_V_YEAR=' + Ext.getCmp('nf').getValue()
        + '&V_V_MONTH=' + Ext.getCmp('yf').getValue()
        + '&V_V_WEEK=' + Ext.getCmp('zhou').getValue()
        + '&V_V_ORGCODE=' + ckval);
}

//grid显示
function query() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_YEAR: Ext.getCmp('nf').getValue(),
            V_V_MONTH: Ext.getCmp('yf').getValue(),
            V_V_WEEK: Ext.getCmp('zhou').getValue(),
            V_V_ORGCODE: ''//Ext.getCmp('jhck').getValue()
        }
    });
}
