var win;//父窗口对象，由子窗口调用
var returnValue;//父窗口对象，由子窗口调用

var yearList = [{
    I_YEAR: '2015',
}, {
    I_YEAR: '2016',
}, {
    I_YEAR: '2017',
}, {
    I_YEAR: '2018',
}, {
    I_YEAR: '2019',
}, {
    I_YEAR: '2020',
}, {
    I_YEAR: '2021',
}, {
    I_YEAR: '2022',
}, {
    I_YEAR: '2023',
}, {
    I_YEAR: '2024',
}, {
    I_YEAR: '2025',
}];

var monthList = [{
    I_MONTH: '1',
}, {
    I_MONTH: '2',
}, {
    I_MONTH: '3',
}, {
    I_MONTH: '4',
}, {
    I_MONTH: '5',
}, {
    I_MONTH: '6',
}, {
    I_MONTH: '7',
}, {
    I_MONTH: '8',
}, {
    I_MONTH: '9',
}, {
    I_MONTH: '10',
}, {
    I_MONTH: '11',
}, {
    I_MONTH: '12',
}];

var List = [{
    I_WEEKNUM: '1',
}, {
    I_WEEKNUM: '2',
}, {
    I_WEEKNUM: '3',
}, {
    I_WEEKNUM: '4',
}, {
    I_WEEKNUM: '5',
}, {
    I_WEEKNUM: '6',
}];

var weekList = [];

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

Ext.Loader.setConfig({ enabled: true });
Ext.Loader.setPath('Ext.ux', '../../../resources/shared/ux');
Ext.require([
    'Ext.ux.picker.DateTime',
    'Ext.ux.form.field.DateTime'
]);

Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');
    var yearStore = Ext.create("Ext.data.Store", {//年份
        storeId: 'yearStore',
        fields: ['I_YEAR'],
        data: yearList,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    });



    var monthStore = Ext.create("Ext.data.Store", {//月
        storeId: 'monthStore',
        fields: ['I_MONTH'],
        data: monthList,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    });

    var weekStore = Ext.create("Ext.data.Store", {//周
        storeId: 'weekStore',
        autoLoad: false,
        loading: false,
        fields: ['I_WEEKNUM'],
        data: weekList,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    });

    var ftyStore = Ext.create('Ext.data.Store', {
        storeId: 'ftyStore',
        autoLoad: true,//true为自动加载
        loading: true,//自动加载时必须为true
        pageSize: -1,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            url: AppUrl + 'planLockingDate/selectFactoriesMines',
            type: 'ajax',
            async: true,//false=同步
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        },
        listeners: {
            load: function (store, records, successful, eOpts) {
                Ext.getCmp('V_V_DEPTCODE').select(store.first());
                _init();//自动加载时必须调用
            }
        }
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        id: 'buttonPanel',
        defaults: {
            style: 'margin: 2px;'
        },
        items: [{
            xtype: 'button',
            text: '保存',
            handler: _insert
        },{
            xtype: 'button',
            text: '关闭',
            handler: _close
        }]
    });

    var formPanel = Ext.create('Ext.form.Panel', {
        id: 'formPanel',
        layout: 'column',
        frame: true,
        autoScroll: true,
        style: {
            border: 0
        },
        defaults: {
            labelAlign: 'right',
            labelWidth: 100,
            inputWidth: 151,
            margin: '4'
        },
        items: [{
            xtype: 'combo',
            id: 'V_V_DEPTCODE',
            name: 'V_V_DEPTCODE',
            store: ftyStore,
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            editable: false,
            forceSelection: true,
            fieldLabel: '厂矿'
        }, {
            xtype: 'combo',
            id: 'I_I_YEAR',
            name: 'I_I_YEAR',
            store: yearStore,
            queryMode: 'local',
            valueField: 'I_YEAR',
            displayField: 'I_YEAR',
            editable: false,
            forceSelection: true,
            fieldLabel: '年',
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        weekStore.removeAll();
                        _calculationWeek();
                    }
                }
            }
        }, {
            xtype: 'combo',
            id: 'I_I_MONTH',
            name: 'I_I_MONTH',
            store: monthStore,
            queryMode: 'local',
            valueField: 'I_MONTH',
            displayField: 'I_MONTH',
            editable: false,
            forceSelection: true,
            fieldLabel: '月',
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        var weekStore = Ext.data.StoreManager.lookup('weekStore');
                        weekStore.removeAll();
                        _calculationWeek();
                        Ext.getCmp('I_I_WEEKNUM').setRawValue('1');
                    }
                }
            }
        },{
            xtype: 'combo',
            id: 'I_I_WEEKNUM',
            name: 'I_I_WEEKNUM',
            store:weekStore,
            queryMode: 'local',
            valueField: 'I_WEEKNUM',
            displayField: 'I_WEEKNUM',
            editable: false,
            forceSelection: true,
            fieldLabel: '本月第几周',
        }, {
            xtype: 'datetimefield',
            name: 'D_D_DATE_S',
            id: 'D_D_DATE_S',
            queryMode: 'local',
            format: 'Y-m-d H:i:s',
            fieldLabel: '周开始时间',
            allowBlank:false,
            value: new Date()
        }, {
            xtype: 'datetimefield',
            name: 'D_D_DATE_E',
            id: 'D_D_DATE_E',
            queryMode: 'local',
            format: 'Y-m-d H:i:s',
            fieldLabel: '周结束时间',
            allowBlank:false,
            value: new Date()
        }],
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
        defaults: {
            border: false
        },
        items: [{
            region: 'north',
            items: [buttonPanel ]
        }, {
            region: 'center',
            layout: 'fit',
            items: [formPanel]
        }]
    });
    _init();
});

function _init() {
    for (var i = 0; i < Ext.data.StoreManager.getCount(); i++) {//检查是否所有自动加载数据全部加载完毕
        if (Ext.data.StoreManager.getAt(i).isLoading()) {
            return;
        }
    }
    var date=new Date();
    Ext.getCmp('I_I_YEAR').setRawValue((date.getFullYear().toString()));
    Ext.getCmp('I_I_MONTH').setRawValue(((date.getMonth()+1).toString()));
    _calculationWeek();
    Ext.getCmp('I_I_WEEKNUM').setValue('1');
    Ext.getBody().unmask();
}

function _insert() {
        Ext.getCmp('formPanel').getForm().submit({
            url: AppUrl + 'planLockingDate/insertPlanLockingDate',
            submitEmptyText: false,
            waitMsg: '<spring:message code="processing" />',
            success : function(form, action) {
                var data = action.result;
                parent.returnValue = data.V_INFO;
                _close();
            },
            failure: function (form, action) {
                Ext.MessageBox.alert('操作失败', '操作失败');
            }
        });
}

//下拉框选择对应年月共几周计算
function _calculationWeek() {
    var year = Ext.getCmp('I_I_YEAR').getValue();
    var month = Ext.getCmp('I_I_MONTH').getValue();
    var firstDate = new Date(year, month - 1, 1);
    var temp = new Date(year, month, 0);
    var Day = temp.getDate();
    var week_sum;
    var week = firstDate.getDay();
    if (week == 0) {
        week_sum = 1;
    } else {
        week_sum = 7 - week + 1;
    }
    var result = 1 + Math.ceil((Day - week_sum) / 7);
    var weekStore = Ext.data.StoreManager.lookup('weekStore');
    for (var i = 0; i < result; i++) {
        var map = List[i];
        weekStore.add(map);
    }
}

function _close() {
    parent.win.close();
}