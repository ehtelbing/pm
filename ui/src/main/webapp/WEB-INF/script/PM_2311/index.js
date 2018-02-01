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
var deptcode='';
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
        fields: ['V_CRITERION_CODE', 'V_CKTYPE', 'V_EQUTYPECODE', 'V_PERCODE_INPUT',
            'V_EQUNAME','V_PERNAME_INPUT', 'V_CRITERION_ITEM', 'V_CRITERION_CONTENT',
            'V_CRITERION_CR', 'V_CRITERION_CYCLE', 'V_CRITERION_CYCLETYPE', 'V_EQU_STATE1',
            'V_EQU_STATE2', 'V_EQU_STATE3', 'V_CK_FUNCTION1', 'V_CK_FUNCTION2', 'V_CK_FUNCTION3',
            'V_CK_FUNCTION4', 'V_CK_FUNCTION5', 'V_CK_FUNCTION6', 'V_CK_FUNCTION7', 'V_CK_FUNCTION8',
            'V_DJ_DATE', 'V_CK_EQUTYPECODE','V_GUID','V_DJ_TYPE',{ name: 'DJCOUNT', type: 'number'}],
        groupField: 'V_EQUNAME',
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'cjy/PM_06_DJ_CRITERION_GENERATE_N',
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

    var gridCKStore = Ext.create('Ext.data.Store', {
        id: 'gridCKStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['DJCOUNT','RN','SBCOUNT','V_DEPTCODE','V_DEPTNAME','YCCOUNT'],
        groupField: 'V_EQUNAME',
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'cjy/PM_06_DJ_CRITERION_BYDEPT',
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
            style: ' margin: 5px 0px 10px 0px'
        },
        items: [
            {xtype: 'datefield', fieldLabel: '开始时间',editable: false, labelWidth: 80,format: 'Y-m-d', value : new Date(new Date().getFullYear() + '/'
                + (new Date().getMonth() + 1) + '/' + 1),id: 'stime' },
            {xtype: 'datefield', fieldLabel: '结束时间', editable: false,labelWidth: 80,format: 'Y-m-d',value : new Date(),id: 'etime' },
        ]
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        id : 'buttonPanel',
        baseCls: 'my-panel-no-border',
        defaults : {
            style: ' margin: 5px 0px 10px 10px',
            width : 70
        },
        items : [  {
            xtype : 'button',
            text : '查询',
            icon: imgpath + '/search.png',
            handler : _selectCKWorkOrder
        }
        ]
    });

    var ckPanel = Ext.create('Ext.grid.Panel', {
        id : 'ckPanel',
        width:'35%',
        height:'100%',
        store : gridCKStore,
        frame : true,
        columnLines : true,
        /*selModel: {
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },*/
        columns : [ {
            xtype : 'rownumberer',
            text : '序号',
            width : 40,
            align: 'center'
        },{
            text: '作业区',
            dataIndex: 'V_DEPTNAME',
            align: 'center',
            width: 120
        },{
            text: '设备数',
            dataIndex: 'SBCOUNT',
            align: 'center',
            width : 70
        }, {
            text: '点检次数',
            dataIndex: 'DJCOUNT',
            align: 'center',
            width : 70
        }, {
            text: '异常次数',
            dataIndex: 'YCCOUNT',
            align: 'center',
            width : 70
        }],
        listeners: {
            itemclick: function(view, record, item, index, evt)  //①
            {
                deptcode=record.get('V_DEPTCODE');
                _selectWorkOrder(record.get('V_DEPTCODE'))

            }
        },
        bbar: [{
            id: 'gpage',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            width: '100%',
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridCKStore'
        }]
    });
    var overhaulApplyPanel = Ext.create('Ext.grid.Panel', {
        id : 'overhaulApplyPanel',
        width:'65%',
        height:'100%',
        store : gridStore,
        frame : true,
        columnLines : true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        features : [{
            ftype : 'groupingsummary',
            groupHeaderTpl : '{name}',
            hideGroupedHeader : true,
            enableGroupingMenu : false
        }],

        features : [{
            groupHeaderTpl : ['{name:this.formatName}',
                {
                    formatName : function(name) {
                    }
                },'{rows:this.formatRows}',{
                    formatRows:function(data){
                        return '设备名称：'+data[0].raw.V_EQUNAME;
                    }
                }],
            ftype : 'groupingsummary'/*,
             collapsible : false*///不可伸缩
        }],
        columns : [ {
            xtype : 'rownumberer',
            text : '序号',
            width : 40,
            align: 'center'
        },{
            text: '详情',
            align: 'center',
            width: 60,
            renderer : detail
        }, /*{
         text: '设备名称',
         dataIndex: 'V_EQUNAME',
         align: 'center',
         width: 200
         },*/{
            text: '点检项目',
            dataIndex: 'V_CRITERION_ITEM',
            align: 'center',
            width : 120
        }, {
            text: '点检内容',
            dataIndex: 'V_CRITERION_CONTENT',
            align: 'center',
            width : 120
        }, {
            text: '点检标准',
            dataIndex: 'V_CRITERION_CR',
            align: 'center',
            width : 200
        }, {
            text: '点检周期',
            dataIndex: 'V_CRITERION_CYCLE',
            align: 'center',
            width : 80
        }, {
            text: '周期类型',
            dataIndex: 'V_CRITERION_CYCLETYPE',
            align: 'center',
            width : 80
        },{
            text: '点检次数',
            dataIndex: 'DJCOUNT',
            align: 'center',
            width : 70,
            summaryType: 'sum',
            summaryRenderer: function (value, metadata) {
                metadata.style = 'font-weight: bold;';
                return '合计 : '+value;
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
            type : 'border'
        },
        items : [ {
            region : 'north',
            layout : 'hbox',
            items : [ editPanel,buttonPanel ]
        }, {
            region : 'center',
            layout : 'hbox',
            width:'100%',
            border : false,
            items : [ ckPanel,overhaulApplyPanel ]
        } ]
    });

    Ext.data.StoreManager.lookup('gridCKStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_V_ORGCODE: Ext.util.Cookies.get('v_orgCode'),
            V_V_CK_EQUTYPECODE: '%',
            V_V_EQUTYPE: '%',
            V_V_EQUCODE: '%',
            V_V_STIME : Ext.getCmp('stime').getSubmitValue()+" 00:00:00",
            V_V_ETIME : Ext.getCmp('etime').getSubmitValue()+" 23:59:59",
            V_V_PAGE: Ext.getCmp('gpage').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('gpage').store.pageSize
        }
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_V_ORGCODE: Ext.util.Cookies.get('v_orgCode'),
            V_V_DEPTCODE:deptcode,
            V_V_CK_EQUTYPECODE: '%',
            V_V_EQUTYPE: '%',
            V_V_EQUCODE: '%',
            V_V_STIME : Ext.getCmp('stime').getSubmitValue()+" 00:00:00",
            V_V_ETIME : Ext.getCmp('etime').getSubmitValue()+" 23:59:59",
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

function _selectCKWorkOrder() {
    var gridCKStore = Ext.data.StoreManager.lookup('gridCKStore');
    gridCKStore.proxy.extraParams = {
        V_V_ORGCODE: Ext.util.Cookies.get('v_orgCode'),
        V_V_CK_EQUTYPECODE: '%',
        V_V_EQUTYPE: '%',
        V_V_EQUCODE: '%',
        V_V_STIME : Ext.getCmp('stime').getSubmitValue()+" 00:00:00",
        V_V_ETIME : Ext.getCmp('etime').getSubmitValue()+" 23:59:59",
        V_V_PAGE: Ext.getCmp('gpage').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('gpage').store.pageSize

    };
    gridCKStore.currentPage = 1;
    gridCKStore.load();
}

function _selectWorkOrder(DEPTCODE) {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        V_V_ORGCODE: Ext.util.Cookies.get('v_orgCode'),
        V_V_DEPTCODE: DEPTCODE,
        V_V_CK_EQUTYPECODE: '%',
        V_V_EQUTYPE: '%',
        V_V_EQUCODE: '%',
        V_V_STIME : Ext.getCmp('stime').getSubmitValue()+" 00:00:00",
        V_V_ETIME : Ext.getCmp('etime').getSubmitValue()+" 23:59:59",
        V_V_PAGE: Ext.getCmp('page').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('page').store.pageSize

    };
    gridStore.currentPage = 1;
    gridStore.load();
}

function detail(a,value,metaData){
    return '<a href="javascript:ondetail(\'' + metaData.data.V_GUID + '\')">详情</a>';
}

function ondetail(a){
    var stime=Ext.getCmp('stime').getSubmitValue()+" 00:00:00";
    var etime=Ext.getCmp('etime').getSubmitValue()+" 23:59:59";
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_230501/index.html?V_GUID=' + a
        +'&stime='+stime
        +'&etime='+etime, '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}