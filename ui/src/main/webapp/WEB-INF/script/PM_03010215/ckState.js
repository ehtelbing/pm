//年份
var date=new Date();
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
// gridstore
var gridStore = Ext.create('Ext.data.Store', {
    id: 'gridStore',
    autoLoad: false,
    fields: ['V_ORGCODE', 'V_ORGNAME', 'ALLNUM', 'EXENUM', 'EXTRATE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'dxfile/PM_03_MONTH_PLAN_CKSTAT_SEL',
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

var npanel = Ext.create('Ext.panel.Panel', {
    id: 'npanel',
    region: 'north',
    layout: 'column',
    frame: true,
    border: false,
    items: [{
        xtype: 'combo',
        id: 'nf',
        fieldLabel: '年份',
        editable: false,
        margin: '5 0 0 5',
        labelWidth: 80,
        width: 250,
        labelAlign: 'right',
        displayField: 'displayField',
        valueField: 'valueField',
        value: date.getFullYear(),
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
            width: 250,
            labelAlign: 'right',
            displayField: 'displayField',
            valueField: 'valueField',
            value: date.getMonth() + 1,
            store: monthStore,
            queryMode: 'local'
        },
        {
            xtype:'button',
            id:'selQuery',
            text:'查询',
            margin: '5 0 5 5',
            icon: imgpath + '/search.png',
            handler: function () {
                Query();
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
        },{xtype:'label', style: ' margin: 8px 0px 5px 5px;color:red',text:'*注：执行数为生成周计划数量；执行率为执行数/审批完成的月计划总数'}]



});
var cpanel=Ext.create('Ext.grid.Panel',{
   id:'cpanel',
   region:'center',
    columnLines: true,
    store: 'gridStore',
    // selType: 'checkboxmodel',
    columns: [{text: '序号', align: 'center', width: 50, xtype: 'rownumberer'},
        {text: '厂矿编码', align: 'center', width: 100, dataIndex: 'V_ORGCODE',hidden:true},
        {text: '厂矿名称', align: 'center', width: 150, dataIndex: 'V_ORGNAME'},
        {text: '月计划总数', align: 'center', width: 100, dataIndex: 'ALLNUM'},
        {text: '执行数', align: 'center', width: 100, dataIndex: 'EXENUM'},
        {text: '执行率（%)', align: 'center', width: 100, dataIndex: 'EXTRATE',renderer:aleft},
        {text:'查看详情',align:'center',width:100,dataIndex:'V_ORGCODE',renderer:turnTo}]
});
Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        id: 'main',
        layout: 'border',
        items: [npanel, cpanel]
    });
    //计划厂矿加载监听
    // Ext.data.StoreManager.lookup('jhckStore').on('load', function () {
    //         Ext.data.StoreManager.lookup('jhckStore').insert(0,{V_DEPTCODE:'%',V_DEPTNAME:'全部' });
    //     Query();
    // });

    Ext.getCmp('nf').on('select', function () {
        Query();
    });
    Ext.getCmp('yf').on('select', function () {
        Query();
    });
    if(new Date().getMonth()==0){
        Ext.getCmp('nf').select(new Date().getFullYear()-1);
        Ext.getCmp('yf').select(12);
    }else{
        Ext.getCmp('nf').select(new Date().getFullYear());
        Ext.getCmp('yf').select(new Date().getMonth());
    }
    Query();


});

function Query() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_YEAR: Ext.getCmp('nf').getValue(),
            V_V_MONTH: Ext.getCmp('yf').getValue()
            ,V_V_ORGCODE:''  // Ext.getCmp('jhck').getValue()
        }
    });

}

function OnClickExcelButton(){

    var V_V_V_ORGCODE ='';// Ext.getCmp('jhck').getValue() == '%' ? '0' : Ext.getCmp('jhck').getValue();

    document.location.href = AppUrl + 'dxfile/CK_MONTH_STATE_EXCEL?V_V_YEAR=' + Ext.getCmp('nf').getValue()
        + '&V_V_MONTH=' + Ext.getCmp('yf').getValue()
        + '&V_V_ORGCODE=' + V_V_V_ORGCODE;
}

function turnTo(value, metaData, record, rowIdx, colIdx, store, view){
    return '<a href="javascript:viewZyqState(\'' + value + '\')">' + "详情查看" + '</a>';
}
function viewZyqState(ckval){
    window.open(AppUrl + 'page/PM_03010215/ckDetailState.html?V_V_YEAR=' + Ext.getCmp('nf').getValue()
        + '&V_V_MONTH=' + Ext.getCmp('yf').getValue()
         + '&V_V_ORGCODE=' + ckval);
}

function aleft(value,cellmeta,record,rowIndex,columnIndex,store){
    var newval=value.substring(0,4);
    return newval;
}