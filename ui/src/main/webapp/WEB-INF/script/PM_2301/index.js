var V_GUID = "" ;
var V_V_GUID_COPY = '';
var dt = new Date();
var thisYear = dt.getFullYear();
var years = [];
for (var i = 2013; i <= thisYear + 1; i++) years.push({displayField: i, valueField: i});
var months = [];
for (var i = 1; i <= 12; i++) {
    if(i<10)
    {
        months.push({displayField: '0'+i, valueField: '0'+i});
    }else{
        months.push({displayField: i, valueField: i});
    }

}
var STATEDATA = [{ displayField: '全部', valueField: '%' },{ displayField: '已整改', valueField: '已整改' },{ displayField: '未整改', valueField: '未整改' }
    ,{ displayField: '未反馈', valueField: '未反馈' }];
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
    var dt = new Date();
    var thisYear = dt.getFullYear();
    var years = [];
    for (var i = 2013; i <= thisYear + 1; i++) years.push({displayField: i, valueField: i});

    var yearsStore = Ext.create("Ext.data.Store", {
        storeId: 'yearsStore',
        fields: ['displayField', 'valueField'],
        data: years,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });

    var monthsStore = Ext.create("Ext.data.Store", {
        storeId: 'monthsStore',
        fields: ['displayField', 'valueField'],
        data: months,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });

    var stateStore = Ext.create("Ext.data.Store", {
        storeId: 'stateStore',
        fields: ['displayField', 'valueField'],
        data: STATEDATA,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['I_ID', 'V_ORDERGUID', 'V_ORDERGUID_UP',
            'V_ORDERID','V_ORDER_TYP','V_ORDER_TYP_TXT','V_FUNC_LOC','V_EQUSITENAME','V_EQUIP_NO','V_EQUIP_NAME'
            ,'V_PLANT','V_IWERK','D_START_DATE','D_FINISH_DATE','D_FACT_START_DATE','D_FACT_FINISH_DATE','V_ACT_TYPE'
            ,'V_PLANNER','V_WORK_CTR','V_SHORT_TXT','V_GSBER','V_GSBER_TXT','V_WORK_AREA','V_WBS'
            ,'V_WBS_TXT','V_ENTERED_BY','D_ENTER_DATE','V_SYSTEM_STATUS','V_SYSNAME','V_WPCODE','V_ORGCODE'
            ,'V_ORGNAME','V_DEPTCODE','V_DEPTNAME','V_DEPTCODEREPARIR'
            ,'V_DEPTNAMEREPARIR','V_DEFECTGUID','V_STATECODE','V_STATENAME'
            ,'V_SPARE','V_TOOL','V_TECHNOLOGY','V_SAFE'
            ,'D_DATE_FK','D_DATE_ACP','I_OTHERHOUR','V_OTHERREASON'
            ,'V_REPAIRCONTENT','V_REPAIRSIGN','V_REPAIRPERSON','V_POSTMANSIGN'
            ,'V_CHECKMANCONTENT','V_CHECKMANSIGN','V_WORKSHOPCONTENT','V_WORKSHOPSIGN'
            ,'V_DEPTSIGN','V_SEND_STATE','V_PERSONNAME','V_SEND_JX'
            ,'V_JXCLASS_CODE','V_WXPERSON','V_WXTEAM','V_STATE'
            ,'V_JX_CLASS_NAME','V_GUID_DX','V_PROJECT_CODE','V_PROJECT_NAME'],

        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PM_23_WORKORDER_SEL',
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


    var editPanel = Ext.create('Ext.form.Panel', {
        id: 'editPanel',
        region: 'center',
        layout: 'column',
        frame: true,
        border: false,
        baseCls: 'my-panel-no-border',
        defaults : {
            labelAlign: 'right',
            style: ' margin: 5px 0px 0px 0px'
        },
        items: [
            {
                id: 'beginTime',
                xtype: 'datefield',
                editable: false,
                format: 'Y/m/d',
                value:  Ext.util.Format.date(new Date(), "Y-m-") + "01",
                fieldLabel: '起始日期',
                labelWidth: 100,
                width: 250,
                baseCls: 'margin-bottom'
            },{
                id: 'endTime',
                xtype: 'datefield',
                editable: false,
                format: 'Y/m/d',
                value: Ext.util.Format.date(new Date(new Date(new Date().getUTCFullYear(), new Date().getMonth() + 1, 1) - 86400000), "Y-m-d"),
                fieldLabel: '结束日期',
                labelWidth: 100,
                width: 250,
                baseCls: 'margin-bottom'
            }
        ]
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        id : 'buttonPanel',
        defaults : {
            style: ' margin: 5px 0px 0px 10px',
            width : 70
        },
        items : [  {
            xtype : 'button',
            text : '查询',
            icon: imgpath + '/search.png',
            handler : _selectWorkOrder
        }
        ]
    });

    var overhaulApplyPanel = Ext.create('Ext.grid.Panel', {
        id : 'overhaulApplyPanel',
        store : gridStore,
        frame : true,
        columnLines : true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns : [ {
            xtype : 'rownumberer',
            text : '序号',
            width : 40,
            align: 'center'
        }, {
            text: '委托日期',
            dataIndex: 'D_ENTER_DATE',
            align: 'center',
            width : 120,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
            return value.substring(0,10);
                  }
        }, {
            text : '作业票编码',
            dataIndex : 'V_ORDERID',
            align : 'center',
            width : 150
        },{
            text : '单位名称',
            dataIndex : 'V_ORGNAME',
            align : 'center',
            width : 200
        },{
            text : '设备名称',
            dataIndex : 'V_EQUIP_NAME',
            align : 'center',
            width : 200
        },{
            text : '检修项目',
            dataIndex : 'V_SHORT_TXT',
            align : 'center',
            width : 300
        },{
            text : '委托人',
            dataIndex : 'V_PERSONNAME',
            align : 'center',
            width : 100
        },{
            text : '检修单位',
            dataIndex : 'V_DEPTNAMEREPARIR',
            align : 'center',
            width : 200
        },{
            text : '检修性质',
            dataIndex : 'V_ORDER_TYP_TXT',
            align : 'center',
            width : 120/*,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                return value.substring(0,10);
            }*/
        },{
            text : '状态名称',
            dataIndex : 'V_ORDER_TYP_TXT',
            align : 'center',
            width : 100
        }],
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            width: '100%',
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
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
            items : [ editPanel ]
        }, {
            region : 'north',
            border : false,
            items : [ buttonPanel ]
        }, {
            region : 'center',
            layout : 'fit',
            border : false,
            items : [ overhaulApplyPanel ]
        } ]
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_V_ORGCODE:  Ext.util.Cookies.get('v_orgCode'),
            V_V_EQUIP_NO : '',
            V_V_BEGINTIME:Ext.getCmp('beginTime').getSubmitValue(),
            V_V_ENDTIME: Ext.getCmp('endTime').getSubmitValue(),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    });

    _init()
})

function _init()
{


        Ext.getBody().unmask();//去除页面笼罩

}


function _selectWorkOrder() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        V_V_ORGCODE:  Ext.util.Cookies.get('v_orgCode'),
        V_V_EQUIP_NO :'',
        V_V_BEGINTIME:Ext.getCmp('beginTime').getSubmitValue(),
        V_V_ENDTIME: Ext.getCmp('endTime').getSubmitValue(),
        V_V_PAGE: Ext.getCmp('page').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('page').store.pageSize

    };
    gridStore.currentPage = 1;
    gridStore.load();
}

