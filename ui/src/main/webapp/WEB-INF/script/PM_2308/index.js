var V_GUID = "" ;
var V_V_GUID_COPY = '';
var dt = new Date();
var thisYear = dt.getFullYear();
var years = [];
for (var i = 2013; i <= thisYear + 1; i++) years.push({displayField: i, valueField: i});
var months = [];
var ckStoreLoad = false;
var ssbtypeStoreLoad = false;
var ssbnameStoreLoad = false;
var initLoad = true;
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

    var ckstore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'ckstore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy:{
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/plant_sel',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                IS_V_DEPTCODE: "",
                IS_V_DEPTTYPE: '[基层单位]'
            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('ck').select(store.first());
                ckStoreLoad = true;
                _init();
            }
        }
    });

    var ssbtype = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'ssbtype',
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy:Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
            }
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('sbtype').select(store.last());
                ssbtypeStoreLoad = true;
                _init();
            }
        }
    });

    var ssbname = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'ssbname',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQU_PER_DROP',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('sbname').select(store.first());
                ssbnameStoreLoad = true;
                _init();
            }
        }
    });

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['V_ORDERGUID', 'V_ENTERED_BY', 'V_PERSONNAME',
            'V_ORDER_TYP','V_ORDER_TYP_TXT','V_ORGCODE','V_ORGNAME','V_EQUSITENAME','V_DEPTCODE','V_DEPTNAME'
            ,'V_EQUTYPECODE','V_EQUIP_NO','V_EQUIP_NAME','V_MATERIALCODE','V_MATERIALNAME','V_UNIT','F_UNITPRICE'
            ,'I_PLANAMOUNT','F_PLANMONEY','I_ACTUALAMOUNT','F_ACTUALMONEY','V_JJ_CODE','V_JJ_NAME','V_JJ_TS'
            ,'V_JJ_DE','V_PERCODE_DE','V_PERNAME_DE','V_TS','V_DE','I_ACTUAL_TIME','I_NUMBER_OF_PEOPLE'
            ,'V_UN_WORK','V_YS_TIME','V_SHORT_TXT','V_SPEC'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PM_23_SPAREPARTSORDER_SEL',
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
            style: ' margin: 5px 0px 0px 0px',
            labelWidth: 100,
            width: 250
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
                xtype: 'combo',
                id: 'ck',
                store: ckstore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '单位名称',
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                labelWidth: 70,
                width: 220,
                labelAlign: 'right',
                style: {
                    margin: '5px 5px 0px 5px'
                },
                listeners: {
                    select: function () {
                        _selectSbtype();
                        _selectSbFourth();
                    }

                }
            },{
                id: 'sbtype',
                xtype: 'combo',
                store: ssbtype,
                fieldLabel: '设备类型',
                editable: false,
                labelWidth: 70,
                displayField: 'V_EQUTYPENAME',
                valueField: 'V_EQUTYPECODE',
                queryMode: 'local',
                width: 250,
                listeners: {
                    select: function () {
                        _selectSbFourth();
                    }

                }
            },{
                id: 'sbname',
                xtype: 'combo',
                store: ssbname,
                fieldLabel: '设备名称',
                editable: false,
                labelWidth: 70,
                displayField: 'V_EQUNAME',
                valueField: 'V_EQUCODE',
                queryMode: 'local',
                width: 250
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
        columns : [{
            xtype : 'rownumberer',
            text : '序号',
            width : 40,
            align: 'center'
        }, {
            text: '单位名称',
            dataIndex: 'V_MATERIALCODE',
            align: 'center',
            width : 150/*,
             renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
             return value.substring(0,10);
             }*/
        }, {
            text : '设备名称',
            dataIndex : 'V_MATERIALNAME',
            align : 'center',
            width : 200
        },{
            text : '装置名称',
            dataIndex : 'V_SPEC',
            align : 'center',
            width : 200
        },{
            text : '给油脂场所',
            dataIndex : 'V_UNIT',
            align : 'center',
            width : 50
        },{
            text : '润清方式',
            dataIndex : 'I_ACTUALAMOUNT',
            align : 'center',
            width : 50
        },{
            text : '润滑牌号',
            dataIndex : 'F_UNITPRICE',
            align : 'center',
            width : 100,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                return value + '元';
            }
        },{
            text : '润滑点数',
            dataIndex : 'F_ACTUALMONEY',
            align : 'center',
            width : 100,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                return value+'元';
            }
        },{
            text : '加油量',
            dataIndex : 'V_YS_TIME',
            align : 'center',
            width : 200,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                return value.substring(0,10);
            }
        },{
            text : '单位',
            dataIndex : 'V_ORGNAME',
            align : 'center',
            width : 200
        },{
            text : '加油时间',
            dataIndex : 'V_EQUIP_NAME',
            align : 'center',
            width : 200
        },{
            text : '加油人员',
            dataIndex : 'V_SHORT_TXT',
            align : 'center',
            width : 200
        },{
            text : '润滑类型',
            dataIndex : 'V_SHORT_TXT',
            align : 'center',
            width : 200
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
            V_V_ORGCODE:  Ext.getCmp('ck').getValue(),
            V_V_EQUIP_NO:  Ext.getCmp('sbname').getValue(),
            V_V_BEGINTIME:Ext.getCmp('beginTime').getSubmitValue(),
            V_V_ENDTIME: Ext.getCmp('endTime').getSubmitValue(),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    });
    _selectSbtype();
    _selectSbFourth();
    _init()
})

function _init()
{
    if(initLoad && ckStoreLoad && ssbtypeStoreLoad && ssbnameStoreLoad)
    {
        initLoad = false;
        Ext.getBody().unmask();//去除页面笼罩
    }




}

function _selectSbtype() {
    var ssbtype = Ext.data.StoreManager.lookup('ssbtype');
    ssbtype.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT': Ext.getCmp('ck').getValue()

    };
    ssbtype.load();
}

function _selectSbFourth() {
    var ssbname = Ext.data.StoreManager.lookup('ssbname');
    ssbname.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT': Ext.getCmp('ck').getValue(),
        'V_V_EQUTYPECODE': Ext.getCmp('sbtype').getValue()

    };
    //matGroupThirdStore.currentPage = 1;
    ssbname.load();
}


function _selectWorkOrder() {

    Ext.MessageBox.alert('提示', '请在数据库添加对应视图');

    /*var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        V_V_ORGCODE:  Ext.getCmp('ck').getValue(),
        V_V_EQUIP_NO:  Ext.getCmp('sbname').getValue(),
        V_V_BEGINTIME:Ext.getCmp('beginTime').getSubmitValue(),
        V_V_ENDTIME: Ext.getCmp('endTime').getSubmitValue(),
        V_V_PAGE: Ext.getCmp('page').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('page').store.pageSize

    };
    gridStore.currentPage = 1;
    gridStore.load();*/
}

