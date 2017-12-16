var today = new  Date();
var ckstore = Ext.create("Ext.data.Store",{
    autoLoad : true,
    storeId : 'ckstore',
    fields : ['V_DEPTNAME','V_DEPTCODE'],
    proxy : {
        type : 'ajax',
        url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
        async : false,
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        },
        extraParams : {
            'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
            'V_V_DEPTCODE':  Ext.util.Cookies.get('v_orgCode'),
            'V_V_DEPTCODENEXT': '%',
            'V_V_DEPTTYPE': '基层单位'
        }

    }
});

var lxstore = Ext.create("Ext.data.Store",{
    autoLoad : true,
    storeId : 'lxstore',
    fields : ['V_TYPE_CODE','V_TYPE_NAME'],
    proxy : {
        type : 'ajax',
        url : AppUrl + 'sg/PM_14_SG_INF_TYPE_SEL',
        async : false,
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        },
        extraParams : {

        }
    }
});

var yystore = Ext.create("Ext.data.Store",{
    autoLoad : true,
    storeId : 'yystore',
    fields : ['V_YY_CODE','V_YY_NAME'],
    proxy : {
        type : 'ajax',
        url : AppUrl + 'sg/SG_INF_REASON_SEL',
        async : false,
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        },
        extraParams : {

        }
    }
});

//var testdata = [{V_SG_TIEM : 1},{V_SG_TIEM : 2},{V_SG_TIEM : 3}];
var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    pageSize: 20,
    fields: ['V_DEPTCODE',
        'V_DEPTNAME',
        'V_SG_TIEM',
        'V_SG_DD',
        'V_SG_EQU',
        'V_SG_TYPE',
        'V_TYPE_NAME',
        'V_SG_YY',
        'V_YY_NAME',
        'V_SG_JG',
        'V_GUID',
        'V_SG_PER',
        'V_SG_NAME'
    ],
    //data : testdata,
    //proxy : {
    //    type : 'memory',
    //    render : {
    //        type : 'json'
    //    }
    //}
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'sg/SG_INF_DATA_ITEM_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var panel = Ext.create('Ext.form.Panel', {
    id: 'panel',
    region: 'north',
    layout: 'column',
    frame:true,
    defaults : {
        style : 'margin:5px 0px 5px 5px',
        labelAlign : 'right'
    },
    items: [
                {
                    id: 'mc',
                    xtype: 'textfield',
                    fieldLabel: '事故名称',
                    labelWidth: 100,
                    labelAlign: 'right',
                    width: 900
                },
                {
                    xtype: 'datefield',
                    id: 'stime',
                    fieldLabel: '事故发生时间',
                    labelAlign: 'right',
                    labelWidth: 100,
                    value:Ext.util.Format.date(Ext.Date.add(new Date(),Ext.Date.DAY,+1-today.getDate()),"Y-m-d"),
                    editable: false,
                    format : 'Y-m-d'
                }, {
                    xtype: 'datefield',
                    id: 'etime',
                    fieldLabel: '至',
                    labelAlign: 'right',
                    labelWidth: 100,
                    queryMode: 'local',
                    value : new Date(),
                    editable: false,
                    format : 'Y-m-d'
                }, {
                    xtype: 'combo',
                    id: 'ck',
                    fieldLabel: '事故厂矿',
                    store : ckstore,
                    labelAlign: 'right',
                    labelWidth: 100,
                    displayField: 'V_DEPTNAME',
                    valueField: 'V_DEPTCODE',
                    queryMode: 'local',
                    editable: false
                }, {
                    xtype: 'combo',
                    id: 'type',
                    store : lxstore,
                    fieldLabel: '事故类型',
                    labelAlign: 'right',
                    labelWidth: 100,
                    displayField: 'V_TYPE_NAME',
                    valueField: 'V_TYPE_CODE',
                    queryMode: 'local',
                    editable: false
                },
                {
                    xtype: 'combo',
                    id: 'reason',
                    store : yystore,
                    fieldLabel: '事故原因',
                    labelAlign: 'right',
                    labelWidth: 100,
                    displayField: 'V_YY_NAME',
                    valueField: 'V_YY_CODE',
                    queryMode: 'local',
                    editable: false
                },{
                    xtype: 'button',
                    text: '查询',
                    icon : imgpath + '/search.png',
                    width: 60,
                    handler: query
                }, {
                    xtype: 'button',
                    text: '导出EXCEL',
                    width: 100,
                    icon : imgpath + '/311.gif',
                    handler: onBtnExcel
                }
            ]
});

var grid = Ext.create("Ext.grid.Panel", {
    xtype: 'gridpanel',
    id: 'grid',
    region: 'center',
    height: 500,
    width : '100%',
    columnLines: true,
    store: gridStore,
    autoScroll: true,
    selType : 'checkboxmodel',
    columns: [
        {
            text: '序号',
            xtype : 'rownumberer',
            align: 'center',
            labelAlign: 'right',
            width: 100
        }, {
            text: '事故发生时间',
            dataIndex: 'V_SG_TIEM',
            align: 'center',
            width: 150,
            renderer : renderTime
        }, {
            text: '事故发生单位',
            dataIndex: 'V_DEPTNAME',
            align: 'center',
            width: 120
        }, {
            text: '事故发生地点',
            dataIndex: 'V_SG_DD',
            align: 'center',
            width: 150
        }, {
            text: '事故类型',
            dataIndex: 'V_TYPE_NAME',
            align: 'center',
            width: 100
        }, {
            text: '事故原因',
            dataIndex: 'V_YY_NAME',
            align: 'center',
            width: 100
        }, {
            text: '事故设备',
            dataIndex: 'V_SG_EQU',
            align: 'center',
            width: 100
        }, {
            text: '事故名称',
            dataIndex: 'V_SG_NAME',
            align: 'center',
            width: 100
        }, {
            text: '详细',
            align: 'center',
            width: 60,
            renderer : detail
        }]
});


Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel, grid]
    });

    Ext.data.StoreManager.lookup('ckstore').on('load',function()
    {
        Ext.getCmp('ck').store.insert(0, { 'V_DEPTCODE': '%', 'V_DEPTNAME': '全部' });
        Ext.getCmp('ck').select(Ext.data.StoreManager.
            lookup('ckstore').getAt(0));
    });

    Ext.data.StoreManager.lookup('lxstore').on('load',function()
    {
        Ext.getCmp('type').store.insert(0, { 'V_TYPE_CODE': '%', 'V_TYPE_NAME': '全部' });
        Ext.getCmp('type').select(Ext.data.StoreManager.
            lookup('lxstore').getAt(0));
    });

    Ext.data.StoreManager.lookup('yystore').on('load',function()
    {
        Ext.getCmp('reason').store.insert(0, { 'V_YY_CODE': '%', 'V_YY_NAME': '全部' });
        Ext.getCmp('reason').select(Ext.data.StoreManager.
            lookup('yystore').getAt(0));
    });
});

// 查询
function query() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_SG_NAME : Ext.getCmp('mc').getValue(),
            V_V_SG_STIME : Ext.util.Format.date(Ext.getCmp('stime').getValue(), 'Y-m-d'),
            V_V_SG_ETIME : Ext.util.Format.date(Ext.getCmp('etime').getValue(), 'Y-m-d'),
            V_V_SG_DEPT : Ext.getCmp('ck').getValue(),
            V_V_SG_TYPE : Ext.getCmp('type').getValue(),
            V_V_SG_YY : Ext.getCmp('reason').getValue()

        }
    });
}

//导出excel
function onBtnExcel() {
    document.location.href=AppUrl + 'excel/SG_EXCEL?V_V_SG_NAME='+ Ext.getCmp('mc').getValue()+'&V_V_SG_STIME='+
    Ext.util.Format.date(Ext.getCmp('stime').getValue(), 'Y-m-d')+'&V_V_SG_ETIME='+Ext.util.Format.date(Ext.getCmp('etime').getValue(), 'Y-m-d')+'&V_V_SG_DEPT='+
    Ext.getCmp('ck').getValue()+'&V_V_SG_TYPE='+Ext.getCmp('type').getValue()+'&V_V_SG_YY='+Ext.getCmp('reason').getValue();
}

function detail(){
    return '<div><a href="javascript:onDetail()">查看</a></div>'
}

function onDetail(){
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    var guid = seldata[0].data.V_GUID;
    var owidth = window.document.body.offsetWidth;
    var oheight = window.document.body.offsetHeight ;
    var val = window.open(AppUrl + 'page/PM_040101/index.html?V_V_GUID='
    + guid, '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}


function renderTime(value, metaData, record, rowIdx,
                               colIdx, store, view) {
    return Ext.util.Format.date(value, 'Y-m-d H:i');
}