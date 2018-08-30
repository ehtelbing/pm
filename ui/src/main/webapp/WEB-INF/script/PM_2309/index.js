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
        fields: ['I_ID', 'V_ORGCODE', 'V_ORGNAME',
            'V_DEPTCODE','V_DEPTNAME','V_EQUTYPECODE','V_EQUTYPENAME','V_EQUCODE','V_EQUNAME','V_EQUCHILD_CODE'
            ,'V_FAULT_GUID','V_EQUCHILD_NAME','V_TYPECODE','V_TYPENAME','V_FAULT_YY','V_FAULT_XX','V_FAULT_LEVEL'
            ,'V_JJBF','V_PER_CLASS','V_JJ','V_WL','V_PART','V_MATERIAL','V_TIME'
            ,'V_FILE_GUID','V_GUID','V_FZR','V_STATE','V_FEEDBACK','V_BZ','V_FINDTIME'
            ,'V_FAULT_DD','V_ENDTIME'],

        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PM_23_FAULTACCOUNT_SEL',
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
            },{
                xtype : 'button',
                text : '查询',
                icon: imgpath + '/search.png',
                handler : _selectWorkOrder,
                style: ' margin: 5px 0px 0px 25px'
            }
        ]
    });

    // var buttonPanel = Ext.create('Ext.Panel', {
    //     id : 'buttonPanel',
    //     defaults : {
    //         style: ' margin: 5px 0px 0px 10px',
    //         width : 70
    //     },
    //     items : [  {
    //         xtype : 'button',
    //         text : '查询',
    //         icon: imgpath + '/search.png',
    //         handler : _selectWorkOrder
    //     }
    //     ]
    // });

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
            text: '事故明细',
            dataIndex: 'V_FAULT_XX',
            align: 'center',
            width : 150/*,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
            return value.substring(0,10);
                  }*/
        }, {
            text : '事故名称',
            dataIndex : 'V_FAULT_YY',
            align : 'center',
            width : 200
        },{
            text : '事故性质',
            dataIndex : 'V_FAULT_LEVEL',
            align : 'center',
            width : 100
        },{
            text : '事故地点',
            dataIndex : 'V_FAULT_DD',
            align : 'center',
            width : 100
        },{
            text : '单位名称',
            dataIndex : 'V_ORGNAME',
            align : 'center',
            width : 200
        },{
            text : '设备名称',
            dataIndex : 'V_EQUNAME',
            align : 'center',
            width : 150/*,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                return value + '元';
            }*/
        },{
            text : '当事者',
            dataIndex : 'V_FZR',
            align : 'center',
            width : 100/*,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                return value+'元';
            }*/
        },{
            text : '事故起始时间',
            dataIndex : 'V_FINDTIME',
            align : 'center',
            width : 200,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                return value.substring(0,10);
            }
        },{
            text : '事故修复时间',
            dataIndex : 'V_ENDTIME',
            align : 'center',
            width : 200
        },{
            text : '合计时间',
            dataIndex : 'V_EQUIP_NAME',
            align : 'center',
            width : 200,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                var beginTime  = new Date(Ext.util.Format.date(store.getAt(rowIndex).get('V_FINDTIME'), 'Y-m-d'));
                var endTime  = new Date(Ext.util.Format.date(store.getAt(rowIndex).get('V_ENDTIME'), 'Y-m-d'));
                var elapsed = Math.round((endTime.getTime() - beginTime.getTime())/(86400000));
                return elapsed + ' 天';
            }
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
        }, /*{
            region : 'north',
            border : false,
            items : [ buttonPanel ]
        }, */{
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

