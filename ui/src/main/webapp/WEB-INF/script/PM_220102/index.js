V_PICGUID1='';
V_PICGUID2='';
V_PICGUID3='';
var mingtian = new Date();
mingtian.setDate(mingtian.getDate()+1);
var V_GUID = "" ;
var zyStoreload = false;
var dt = new Date();
var thisYear = dt.getFullYear();
var  tomorrowYear = dt.getFullYear() + 1;
var years = [];
for (var i = 2012; i <= tomorrowYear; i++)
    years.push({
        displayField : i,
        valueField : i
    });
var stateData=[{ displayField:'全部', valueField:'%'},{ displayField:'编辑', valueField:'编辑'},{ displayField:'审批中', valueField:'审批中'},{ displayField:'审批通过', valueField:'审批通过'},{ displayField:'审批驳回', valueField:'审批驳回'}];

Ext.define('Ext.ux.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    async: true,
    doRequest: function (operation, callback, scope) {
        var writer = this.getWriter(),
            request = this.buildRequest(operation);
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        Ext.apply(request, {
            async: this.async,
            binary: this.binary,
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, callback, scope),
            method: this.getMethod(request),
            disableCaching: false
        });
        Ext.Ajax.request(request);
        return request;
    }
});

Ext.onReady(function () {

    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果

    var zystore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'zystore',
        fields: ['V_MAJOR_CODE', 'V_MAJOR_NAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('zy').select(store.first());
                zyStoreload = true;
                 _init();
            }
        }
    });

    var stateStore=Ext.create("Ext.data.Store", {
        storeId: 'stateStore',
        fields: ['displayField','valueField'],
        data: stateData,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });

    var yearStore=Ext.create("Ext.data.Store", {
        storeId: 'yearStore',
        fields: ['displayField','valueField'],
        data: years,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });

    var overhaulApplyStore = Ext.create('Ext.data.Store', {
        id: 'overhaulApplyStore',
        autoLoad: false,
        pageSize: 15,
        fields: ['I_ID', 'V_GUID','I_YEAR', 'I_MONTH', 'V_ORGCODE',
            'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME', 'D_DATE', 'V_PROJECTCODE',
            'V_PROJECTNAME', 'V_PLANDATE','V_SPECIALTY', 'V_SPECIALTYNAME', 'V_SPECIALTYMANCODE',
            'V_SPECIALTYMAN', 'F_MONEYUP', 'F_MONEYBUDGET', 'V_REPAIRDEPTTYPE', 'V_REPAIRDEPTCODE',
            'V_REPAIRDEPT', 'V_DEFECT','V_MEASURE', 'V_MONEY', 'V_INMAN',
            'V_INMANCODE', 'D_INDATE', 'I_STATE', 'V_FLAG', 'I_RUSHTO', 'V_PROJECTCODE_GS',
            'V_REPAIRDEPT_GS', 'F_MONEY_GS','D_INDATE_GS', 'I_YEAR_PLAN', 'I_MONTH_PLAN'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PRO_PM_OVERHARLAPPLY_SEL',
            // url: 'PM_14_FAULT_ITEM_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            },
            extraParams: {}
        })
    });

    var inputPanel = Ext.create('Ext.Panel', {
        id : 'inputPanel',
        header : false,
        frame : true,
        layout : 'column',
        defaults : {
            labelAlign : 'right',
            labelWidth : 100,
            inputWidth : 240,
            margin : '4,0,0,0'
        },
        items : [ {
            xtype: 'combo',
            id:'nf',
            fieldLabel: '年份',
            store:yearStore,
            value: new Date().getFullYear(),
            editable: false,
            displayField: 'displayField',
            valueField: 'valueField'
        }, {
            id: 'zy',
            xtype: 'combo',
            store: zystore,
            fieldLabel: '专业',
            editable: false,
            labelWidth: 40,
            displayField: 'V_MAJOR_NAME',
            valueField: 'V_MAJOR_CODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            labelAlign: 'right'
        }, {
            id: 'state',
            xtype: 'combo',
            store: stateStore,
            fieldLabel: '状态',
            value:'%',
            editable: false,
            displayField: 'displayField',
            valueField: 'valueField',
            queryMode: 'local'
            //baseCls: 'margin-bottom',
        }, {
            xtype : 'textfield',
            id : 'defectContent',
            fieldLabel : '缺陷内容'
        }, {
            xtype : 'textfield',
            id : 'projectName',
            fieldLabel : '项目名称'
        } ]
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        id : 'buttonPanel',
        defaults : {
            style : 'margin:2px',
            width : 100
        },
        items : [ {
            xtype : 'button',
            text : '查询',
            handler : _selectOverhaulApply
        }
        ]
    });

    var overhaulApplyPanel = Ext.create('Ext.grid.Panel', {
        id : 'overhaulApplyPanel',
        store : overhaulApplyStore,
        frame : true,
        columnLines : true,
        selModel : {
            selType : 'checkboxmodel',
            mode : 'SINGLE'
        },
        columns : [ {
            text: '状态',
            dataIndex: 'V_FLAG',
            align: 'center',
            width:100
        },{
            text: '申请日期',
            dataIndex: 'D_DATE',
            align: 'center',
            width:200,
            renderer: applicationDate
        }, {
            text: '项目编号',
            dataIndex: 'V_PROJECTCODE',
            align: 'center',
            width:150
        }, {
            text: '项目名称',
            dataIndex: 'V_PROJECTNAME',
            align: 'center',
            width:300
        }, {
            text: '缺陷内容',
            dataIndex: 'V_DEFECT',
            align: 'center',
            width:100
        },{
            text: '计划施工日期',
            dataIndex: 'V_PLANDATE',
            align: 'center',
            width:100
        },{
            text: '专业',
            dataIndex: 'V_SPECIALTY',
            align: 'center',
            width:100
        },{
            text: '工程总概算(万元)',
            dataIndex: 'F_MONEYUP',
            align: 'center',
            width:150
        },{
            text: '工程总预算(万元)',
            dataIndex: 'F_MONEYBUDGET',
            align: 'center',
            width:150
        },{
            text: '是否外委(是/否)',
            dataIndex: 'V_REPAIRDEPTTYPE',
            align: 'center',
            width:150
        },{
            text: '检修单位',
            dataIndex: 'V_REPAIRDEPT',
            align: 'center',
            width:250
        },{
            text: '是否特殊抢修',
            dataIndex: 'I_RUSHTO',
            align: 'center',
            width:100
        },{
            text: '录入人',
            dataIndex: 'V_INMAN',
            align: 'center',
            width:100
        },{
            text: '申请厂矿',
            dataIndex: 'V_ORGNAME',
            align: 'center',
            width:200
        },{
            text: '申请作业区',
            dataIndex: 'V_DEPTNAME',
            align: 'center',
            width:200
        }],
        bbar: ["->",
            {
                id: 'page',
                xtype: 'pagingtoolbar',
                store: overhaulApplyStore,
                width: '100%',
                dock: 'bottom',
                displayInfo: true,
                displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                emptyMsg: '没有记录'
            }
        ],
        listeners:{itemdblclick:GridItemClick}
    });

    Ext.create('Ext.container.Viewport', {
        layout : {
            type : 'border',
            regionWeights : {
                west : -1,
                north : 1,
                south : 1,
                east : -1
            }
        },
        items : [ {
            region : 'north',
            border : false,
            items : [ inputPanel,buttonPanel ]
        }, {
            region : 'center',
            layout : 'fit',
            border : false,
            items : [ overhaulApplyPanel ]
        } ]
    });

    Ext.data.StoreManager.lookup('overhaulApplyStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_V_YEAR :Ext.getCmp('nf').getValue(),
            V_V_PERCODE :Ext.util.Cookies.get('v_personcode') ,
            V_V_SPECIALTY : Ext.getCmp('zy').getValue(),
            V_V_FLAG : Ext.getCmp('state').getValue(),
            V_V_DEFECT :Ext.getCmp('defectContent').getValue(),
            V_V_PROJECTNAME :Ext.getCmp('projectName').getValue(),
            V_I_PAGE: Ext.getCmp('page').store.currentPage,
            V_I_PAGENUMBER: Ext.getCmp('page').store.pageSize
        }
    });

    _init();

})

function _init()
{
    if(zyStoreload)
    {
        zyStoreload = false;
        _selectOverhaulApply();
        Ext.getBody().unmask();//去除页面笼罩
    }
}


function _selectOverhaulApply() {
    var overhaulApplyStore = Ext.data.StoreManager.lookup('overhaulApplyStore');
    overhaulApplyStore.proxy.extraParams = {
        //V_V_ORGCODE :Ext.util.Cookies.get('v_orgCode'),
        V_V_YEAR :Ext.getCmp('nf').getValue(),
        V_V_PERCODE :Ext.util.Cookies.get('v_personcode') ,
        V_V_SPECIALTY : Ext.getCmp('zy').getValue(),
        V_V_FLAG : Ext.getCmp('state').getValue(),
        V_V_DEFECT :Ext.getCmp('defectContent').getValue(),
        V_V_PROJECTNAME :Ext.getCmp('projectName').getValue(),
        V_I_PAGE: Ext.getCmp('page').store.currentPage,
        V_I_PAGENUMBER: Ext.getCmp('page').store.pageSize

    };
    overhaulApplyStore.currentPage = 1;
    overhaulApplyStore.load();
}


function GridItemClick(s, record, item, index, e, eOpts){
    var owidth = window.document.body.offsetWidth ;
    var oheight = window.document.body.offsetHeight;
    window.open(AppUrl + 'page/PM_22010107/index.html?V_GUID=' + record.raw.V_GUID  + '&V_PICGUID1='+ V_PICGUID1 + '&V_PICGUID2='+ V_PICGUID2 + '&V_PICGUID3=' + V_PICGUID3 + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes' );

}


function applicationDate(value, metaData, record, rowIndex, colIndex, store, view) {
    return '<div data-qtip="' + value.substring(0,19) + '" style="text-align:center;" >' + value.substring(0,19)
        + '</div>';
}