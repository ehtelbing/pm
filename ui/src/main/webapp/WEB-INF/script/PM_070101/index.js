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
for (var i = 1; i <= 6; i++) {
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



Ext.onReady(function () {
    Ext.QuickTips.init();
    //厂矿
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

    // var gridStore = Ext.create('Ext.data.Store', {
    //     id: 'gridStore',
    //     autoLoad: false,
    //     fields: ['周','V_ORGCODE','V_ORGNAME','V_DEPTCODE', 'V_DEPTNAME', 'SUMNUM', 'YXQ_NUM', 'XQL_NUM'],
    //     proxy: {
    //         type: 'ajax',
    //         async: false,
    //         url: AppUrl + 'cgl/PRO_PM_07_DEFECT_TJ_VIEW_WCL',
    //         actionMethods: {
    //             read: 'POST'
    //         },
    //         reader: {
    //             type: 'json',
    //             root: 'list',
    //             // total: 'total'
    //         }
    //     }
    // });

    var gridStore = Ext.create('Ext.data.Store', {
        id : 'gridStore',
        autoLoad : false,
        fields : ["V_DEPTCODE", "V_DEPTNAME", "V_V_SUMNUM", 'V_V_WCLNUM','V_V_YXQNUM','V_V_CLVNUM','V_V_WCLNUM'],
        proxy : {
            type : 'ajax',
            async : false,
            url : AppUrl + 'cgl/PRO_PM_07_DEFECT_TJ_VIEW_WCL',
            // url: 'PRO_PM_DEFECT_TJ_VIEW',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
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
            {
                xtype: 'combo',
                id: 'ck',
                fieldLabel: '厂矿',
                editable: false,
                margin: '5 0 0 5',
                labelWidth: 80,
                width: 230,
                value: '',
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                store: ckStore,
                queryMode: 'local'
            },        {
                xtype: 'combo',
                id: 'zyq',
                fieldLabel: '作业区',
                editable: false,
                margin: '5 0 0 5',
                labelWidth: 80,
                width: 230,
                value: '',
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                store: zyqStore,
                queryMode: 'local'
            },
            {
                xtype: 'panel', frame: true, width: '100%', layout: 'column', colspan: 3, baseCls: 'my-panel-noborder',style: 'margin:0 5px 0 85px',
                items: [
                    {
                        xtype: 'button', text: '查询', margin: '5 0 5 5', icon: imgpath + '/search.png',
                        handler: function () {
                            // query();
                            gridStore.load({
                                params : {
                                    V_V_YEAR:
                                    Ext.ComponentManager.get("nf").getValue(),
                                    V_V_MONTH:
                                    Ext.ComponentManager.get("yf").getValue(),
                                    V_V_WEEK:
                                    Ext.ComponentManager.get("zhou").getValue(),
                                    V_V_ORGCODE:
                                    Ext.ComponentManager.get("ck").getValue(),
                                    V_V_DEPTCODE:
                                    Ext.ComponentManager.get("zyq").getValue(),
                                }
                            });
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
                    }
                    , {
                        xtype : 'hidden',
                        id : 'tabid'
                    }
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
            {text: '单位', align: 'center', width: 250, dataIndex: 'V_DEPTNAME',renderer:aleft},
            {text: '总数', align: 'center', width: 190, dataIndex: 'V_V_SUMNUM',renderer:left},
            {text: '完成数', align: 'center', width: 190, dataIndex: 'V_V_YXQNUM',renderer:left},
            {text: '完成率（%)', align: 'center', width: 190, dataIndex: 'V_V_WCNUM',renderer:left},
            // {text: '单位', align: 'center', width: 250, dataIndex: 'V_ORGNAME',renderer:aleft},

        ]

    });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [northPanel,gridPanel]
    });

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

    Ext.data.StoreManager.lookup('zyqStore').on('load', function () {
        Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
    });


    if(getWeekOfMonth()==0){
        if(new Date().getMonth()==0){
            Ext.getCmp('nf').select(new Date().getFullYear()-1);
            Ext.getCmp('yf').select(12);
            Ext.getCmp('zhou').select(6);
        }else{
            Ext.getCmp('nf').select(new Date().getFullYear());
            Ext.getCmp('yf').select(new Date().getMonth());
            Ext.getCmp('zhou').select(6);
        }
    }else{
        Ext.getCmp('nf').select(new Date().getFullYear());
        Ext.getCmp('yf').select(new Date().getMonth() + 1);
        Ext.getCmp('zhou').select(getWeekOfMonth());
    }

    Ext.getCmp('nf').select(new Date().getFullYear());
    Ext.getCmp('yf').select(new Date().getMonth() + 1);
    Ext.getCmp('zhou').select(getWeekOfMonth());
    //计划厂矿加载监听
    // query();
    Ext.getCmp('nf').on('select', function () {
        // query();
    });
    Ext.getCmp('yf').on('select', function () {
        // query();
    });
    Ext.getCmp('zhou').on('select', function () {
        // query();
    });


});

第几周
function getWeekOfMonth() {
    var date = new Date();
    var w = date.getDay();
    var d = date.getDate();
    // return Math.ceil((d + 6 - w) / 7);
    return Math.ceil((d  - w) / 7);
}


function OnClickExcelButton() {

    var orgcode = Ext.getCmp("ck").getValue() == '%' ? '0' : Ext.getCmp("ck").getValue();
    var deptcode = Ext.getCmp("zyq").getValue() == '%' ? '0' : Ext.getCmp("zyq").getValue();
    document.location.href = AppUrl + 'excel/QXTJ_EXCEL_WCL?V_V_YEAR=' + Ext.getCmp('nf').getValue()
        + '&V_V_MONTH=' + Ext.getCmp('yf').getValue()
        + '&V_V_WEEK=' + Ext.getCmp('zhou').getValue()
        + '&V_V_ORGCODE=' + orgcode
        + '&V_V_DEPTCODE=' + deptcode;
}

function aleft(value,cellmeta,record,rowIndex,columnIndex,store){
    var newval=value.substring(0,4);
    return '<div data-qtip="' + newval + '" >' + newval + '</div>';
}

function left(value, metaData) {
    metaData.style = "text-align:left";
    if(value == null){
        return '<div data-qtip="' + 0 + '" >' + 0 + '</div>';
    }
    else{
        return '<div data-qtip="' + value + '" >' + value + '</div>';
    }

}



//grid显示
// function query() {
//     Ext.data.StoreManager.lookup('gridStore').load({
//         params: {
//             V_V_YEAR: Ext.getCmp('nf').getValue(),
//             V_V_MONTH: Ext.getCmp('yf').getValue(),
//             V_V_WEEK: Ext.getCmp('zhou').getValue(),
//             V_V_ORGCODE: '',
//             V_V_DEPTCODE: ''
//         }
//     });
// }