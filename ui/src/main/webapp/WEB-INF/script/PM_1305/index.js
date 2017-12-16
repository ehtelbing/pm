var V_GUID = "";
var V_V_GUID_COPY = '';
var ckStoreLoad = false;
var zyqStoreLoad = false;
var initLoad = true;
var dt = new Date();
var thisYear = dt.getFullYear();
var years = [];
for (var i = 2013; i <= thisYear + 1; i++) years.push({displayField: i, valueField: i});
var months = [];
for (var i = 1; i <= 12; i++) {
    if (i < 10) {
        months.push({displayField: '0' + i, valueField: '0' + i});
    } else {
        months.push({displayField: i, valueField: i});
    }

}
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

    var ckstore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'ckstore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
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

    var bkhdwStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'bkhdwStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
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
                IS_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                IS_V_DEPTTYPE: '[主体作业区]'
            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('bkhdw').select(store.first());
                zyqStoreLoad = true;
                _init();
            }
        }
    });

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['V_GUID', 'V_DATE', 'V_ORGCODE',
            'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME', 'V_TYPE', 'V_BEEXAMINED_ORG', 'V_BEEXAMINED_ORGNAME', 'V_BEEXAMINED_DEPT'
            , 'V_BEEXAMINED_DEPTNAME', 'V_BEEXAMINED_CLASS', 'V_BEEXAMINED_CLASSNAME', 'V_JCBW', 'V_CZWT', 'V_ZGCS', 'V_KHYJ'
            , 'V_KHFS', 'V_KKJE', 'V_BEEXAMINED_TYPE', 'V_YQZGSJ', 'V_TBSJ', 'V_TB_PER', 'V_TB_PERNAME'
            , 'V_STATE', 'V_FEEDBACK_GUID', 'V_FEEDBACK_FLAG', 'V_FEEDBACK_PER', 'V_FEEDBACK_PERNAME', 'V_FEEDBACK_DATA', 'V_YS_PER'
            , 'V_YS_PERNAME', 'V_FK_PER', 'V_FK_PERNAME', 'V_FK_DATE'],

        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PM_13_EXAMINED_TG_SEL',
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


    var buttonPanel = Ext.create('Ext.Panel', {
        id: 'buttonPanel',
        defaults: {
            style: 'margin:2px'
        },
        items: [{
            xtype: 'button',
            text: '查询',
            handler: _select,
            style: ' margin: 5px 5px 5px 20px',
            icon: imgpath + '/search.png'
        }, {
            xtype: 'button',
            text: '查看详细信息',
            handler: _chose,
            style: ' margin: 5px 5px 5px 5px',
            icon: imgpath + '/information.png'
        },
        ]
    });

    var classStore = Ext.create('Ext.data.Store', {
        storeId: 'classStore',
        autoLoad: false,
        fields: ['NAME', 'CODE'],
        data: [{
            NAME: '全部',
            CODE: '%'
        }, {
            NAME: '公司通告',
            CODE: 'org'
        }, {
            NAME: '厂矿通告',
            CODE: 'dept'
        }]
    });

    var statusStore = Ext.create('Ext.data.Store', {
        storeId: 'statusStore',
        autoLoad: false,
        fields: ['NAME', 'STATUS'],
        data: [{
            NAME: '全部',
            STATUS: '%'
        }, {
            NAME: '已整改',
            STATUS: '已整改'
        }, {
            NAME: '未整改',
            STATUS: '未整改'
        }, {
            NAME: '未反馈',
            STATUS: '未反馈'
        }]
    });

    var inputPanel = Ext.create('Ext.form.Panel', {
        id: 'inputPanel',
        region: 'center',
        layout: 'column',
        frame: true,
        border: false,
        baseCls: 'my-panel-no-border',
        items: [
            {
                xtype: 'combo',
                id: "xznf",
                store: yearsStore,
                value: new Date().getFullYear(),
                editable: false,
                queryMode: 'local',
                fieldLabel: '选择年份',
                displayField: 'displayField',
                valueField: 'valueField',
                labelWidth: 100,
                style: ' margin: 5px 0px 0px 0px',
                labelAlign: 'right',
                width: 180
            }, {
                xtype: 'combo',
                id: "yue",
                fieldLabel: '月份',
                store: monthsStore,
                value: new Date().getMonth() + 1,
                editable: false,
                queryMode: 'local',
                labelWidth: 30,
                displayField: 'displayField',
                valueField: 'valueField',
                style: ' margin: 5px 0px 0px 10px',
                labelAlign: 'right',
                width: 110
            }, {
                id: 'ck',
                xtype: 'combo',
                store: ckstore,
                fieldLabel: '厂矿',
                style: ' margin: 5px 0px 5px 5px',
                editable: false,
                labelWidth: 80,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                labelAlign: 'right',
                queryMode: 'local',
                width: 250,
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectSbSecond();

                    }
                }
            }, {
                xtype: 'combo',
                id: "bkhdw",
                store: bkhdwStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '作业区',
                labelWidth: 80,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right',
                width: 250
            }
        ]
    });

    var overhaulApplyPanel = Ext.create('Ext.grid.Panel', {
        id: 'overhaulApplyPanel',
        store: gridStore,
        frame: true,
        columnLines: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '检查时间',
            dataIndex: 'V_DATE',
            align: 'center',
            width: 120,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                return value.substring(0, 10);
            }
        }, {
            text: '被检查单位',
            dataIndex: 'V_BEEXAMINED_DEPTNAME',
            align: 'center',
            width: 200
        }, {
            text: '检查部位',
            dataIndex: 'V_JCBW',
            align: 'center',
            width: 200
        }, {
            text: '考核依据',
            dataIndex: 'V_KHYJ',
            align: 'center',
            width: 200
        }, {
            text: '存在问题',
            dataIndex: 'V_CZWT',
            align: 'center',
            width: 300
        }, {
            text: '考核分数',
            dataIndex: 'V_KHFS',
            align: 'center',
            width: 100
        }, {
            text: '扣款金额',
            dataIndex: 'V_KKJE',
            align: 'center',
            width: 100
        }, {
            text: '时间',
            dataIndex: 'V_TBSJ',
            align: 'center',
            width: 120,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                return value.substring(0, 10);
            }
        }, {
            text: '通报人',
            dataIndex: 'V_TB_PERNAME',
            align: 'center',
            width: 100
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
        layout: {
            type: 'border',
            regionWeights: {
                west: -1,
                north: 1,
                south: 1,
                east: -1
            }
        },
        items: [{
            region: 'north',
            border: false,
            items: [inputPanel, buttonPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [overhaulApplyPanel]
        }]
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),
            V_V_DEPTCODE: Ext.getCmp('bkhdw').getValue(),
            V_V_DATE: Ext.getCmp('xznf').getValue() + '' + Ext.getCmp('yue').getValue(),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    });

    _init()
})

function _init() {
    if (ckStoreLoad && zyqStoreLoad && initLoad) {
        initLoad = false;
    }
    //_selectExamined();
    Ext.getBody().unmask();//去除页面笼罩

}


function _selectSbSecond() {
    var bkhdwStore = Ext.data.StoreManager.lookup('bkhdwStore');
    bkhdwStore.proxy.extraParams = {
        IS_V_DEPTCODE: Ext.getCmp('ck').getValue(),
        IS_V_DEPTTYPE: '[主体作业区]'
    };
    //matGroupSecondStore.currentPage = 1;
    bkhdwStore.load();

}

function _select() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        V_V_ORGCODE: Ext.getCmp('ck').getValue(),
        V_V_DEPTCODE: Ext.getCmp('bkhdw').getValue(),
        V_V_DATE: Ext.getCmp('xznf').getValue() + '' + Ext.getCmp('yue').getValue(),
        V_V_PAGE: Ext.getCmp('page').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('page').store.pageSize

    };
    gridStore.currentPage = 1;
    gridStore.load();
}

function _chose() {
    var records = Ext.getCmp('overhaulApplyPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }
    window.open(AppUrl + 'page/PM_130101/index.html?V_V_GUID=' + records[0].get('V_GUID'), '', 'height=450px,width=730px,top=50px,left=100px,resizable=yes');
}