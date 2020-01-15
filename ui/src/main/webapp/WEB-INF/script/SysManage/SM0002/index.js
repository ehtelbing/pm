var win;//父窗口对象，由子窗口调用
var returnValue;//父窗口对象，由子窗口调用

var yearList = [{
    I_YEAR: '%',
    I_YEAR_NAME: '--全部--'
}, {
    I_YEAR: '2015',
    I_YEAR_NAME: '2015'
}, {
    I_YEAR: '2016',
    I_YEAR_NAME: '2016'
}, {
    I_YEAR: '2017',
    I_YEAR_NAME: '2017'
}, {
    I_YEAR: '2018',
    I_YEAR_NAME: '2018'
}, {
    I_YEAR: '2019',
    I_YEAR_NAME: '2019'
}, {
    I_YEAR: '2020',
    I_YEAR_NAME: '2020'
}, {
    I_YEAR: '2021',
    I_YEAR_NAME: '2021'
}, {
    I_YEAR: '2022',
    I_YEAR_NAME: '2022'
}, {
    I_YEAR: '2023',
    I_YEAR_NAME: '2023'
}, {
    I_YEAR: '2024',
    I_YEAR_NAME: '2024'
}, {
    I_YEAR: '2025',
    I_YEAR_NAME: '2025'
}];

var monthList = [ {
    I_MONTH: '%',
    I_MONTH_NAME: '--全部--',
}, {
    I_MONTH: '1',
    I_MONTH_NAME: '1',
}, {
    I_MONTH: '2',
    I_MONTH_NAME: '2',
}, {
    I_MONTH: '3',
    I_MONTH_NAME: '3',
}, {
    I_MONTH: '4',
    I_MONTH_NAME: '4',
}, {
    I_MONTH: '5',
    I_MONTH_NAME: '5',
}, {
    I_MONTH: '6',
    I_MONTH_NAME: '6',
}, {
    I_MONTH: '7',
    I_MONTH_NAME: '7',
}, {
    I_MONTH: '8',
    I_MONTH_NAME: '8',
}, {
    I_MONTH: '9',
    I_MONTH_NAME: '9',
}, {
    I_MONTH: '10',
    I_MONTH_NAME: '10',
}, {
    I_MONTH: '11',
    I_MONTH_NAME: '11',
}, {
    I_MONTH: '12',
    I_MONTH_NAME: '12',
}];

var List = [{
    I_WEEKNUM: '%',
    I_WEEKNUM_NAME:'--全部--'
}, {
    I_WEEKNUM: '1',
    I_WEEKNUM_NAME:'1'
}, {
    I_WEEKNUM: '2',
    I_WEEKNUM_NAME:'2'
}, {
    I_WEEKNUM: '3',
    I_WEEKNUM_NAME:'3'
}, {
    I_WEEKNUM: '4',
    I_WEEKNUM_NAME:'4'
}, {
    I_WEEKNUM: '5',
    I_WEEKNUM_NAME:'5'
}, {
    I_WEEKNUM: '6',
    I_WEEKNUM_NAME:'6'
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
Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');

    var yearStore = Ext.create("Ext.data.Store", {//年份
        storeId: 'yearStore',
        fields: ['I_YEAR','I_YEAR_NAME'],
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
        fields: ['I_MONTH','I_MONTH_NAME'],
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
        fields: ['I_WEEKNUM','I_WEEKNUM_NAME'],
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
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            type: 'ajax',
            async: true,//false=同步
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                V_V_DEPTCODENEXT: '%',
                V_V_DEPTTYPE: '基层单位'
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        },
        listeners: {
            load: function (store, records, successful, eOpts) {
                if (store.first().data.V_DEPTCODE != '%') {
                    store.insert(0, {
                        V_DEPTCODE: '%',
                        V_DEPTNAME: '--全部--',
                    });
                }
                Ext.getCmp('V_V_ORGCODE').select(store.first());
                _init();//自动加载时必须调用
            }
        }
    });

    var ftyAllStore = Ext.create('Ext.data.Store', {
        storeId: 'ftyAllStore',
        autoLoad: true,//true为自动加载
        loading: true,//自动加载时必须为true
        pageSize: -1,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            type: 'ajax',
            async: true,//false=同步
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                V_V_PERSONCODE: 'admin',
                V_V_DEPTCODE: '%',
                V_V_DEPTCODENEXT: '%',
                V_V_DEPTTYPE: '%'
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        },
        listeners: {
            load: function (store, records, successful, eOpts) {
                if (store.first().data.V_DEPTCODE != '%') {
                    store.insert(0, {
                        V_DEPTCODE: '%',
                        V_DEPTNAME: '--全部--',
                    });
                }
                Ext.getCmp('V_V_ORGCODE').select(store.first());
                _init();//自动加载时必须调用
            }
        }
    });

    var ftyStoreByBatch = Ext.create('Ext.data.Store', {
        storeId: 'ftyStoreByBatch',
        autoLoad: true,//true为自动加载
        loading: true,//自动加载时必须为true
        pageSize: -1,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            type: 'ajax',
            async: true,//false=同步
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                V_V_DEPTCODENEXT: '%',
                V_V_DEPTTYPE: '基层单位'
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        },
        listeners: {
            load: function (store, records, successful, eOpts) {
                if (store.first().data.V_DEPTCODE != '%') {
                    store.insert(0, {
                        V_DEPTCODE: '%',
                        V_DEPTNAME: '--全部--',
                    });
                }
                Ext.getCmp('V_V_ORGCODE').select(store.first());
                _init();//自动加载时必须调用
            }
        }
    });

    var deptStore = Ext.create('Ext.data.Store', {
        storeId: 'deptStore',
        autoLoad: false,
        loading: false,
        pageSize: -1,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            type: 'ajax',
            async: false,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }),
        listeners: {
            load: function (store, records, successful, eOpts) {
                Ext.getCmp('V_V_DEPTCODE').select(store.first());
            }
        }
    });

    var deptStoreByBatch = Ext.create('Ext.data.Store', {
        storeId: 'deptStoreByBatch',
        autoLoad: false,
        loading: false,
        pageSize: -1,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            type: 'ajax',
            async: false,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }),
        listeners: {
            load: function (store, records, successful, eOpts) {
                Ext.getCmp('V_V_DEPTCODE').select(store.first());
            }
        }
    });

    var planLockingDateStore = Ext.create('Ext.data.Store', {
        storeId: 'planLockingDateStore',
        autoLoad: false,
        loading: false,
        pageSize: 11,
        fields: ['I_ID', 'V_TYPE', 'I_YEAR', 'I_MONTH', 'I_WEEKNUM', 'D_DATE_E', 'I_LOCK', 'D_DATE_S', 'V_DEPTCODE'],
        proxy: {
            url: AppUrl + 'planLockingDate/selectPlanLockingDate',
            type: 'ajax',
            async: true,
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
            style: 'margin: 2px;'
        },
        items: [{
            xtype: 'button',
            text: '查询',
            handler: _select
        }, {
            xtype: 'button',
            text: '新增',
            handler: _insert
        },{
            xtype: 'button',
            text: '修改',
            handler: _update
        },{
            xtype: 'button',
            text: '批量删除',
            handler: _delete
        },{
            xtype: 'button',
            text: '批量修改',
            handler: _batchUpdate
        }]
    });

    var batchUpdateWindow = Ext.create('Ext.window.Window', {
        id : 'batchUpdateWindow',
        layout : 'column',
        modal : true,//弹出窗口时后面背景不可编辑
        title : '批量修改',
        closeAction : 'hide',
        closable : true,
        defaults : {
            labelAlign : 'right',
            labelWidth : 100,
            inputWidth : 140,
            margin : '4,0,0,0'
        },
        items :[{
            xtype: 'combo',
            id: 'V_V_V_ORGCODE',
            name: 'V_V_V_ORGCODE',
            store: ftyStoreByBatch,
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            editable: false,
            forceSelection: true,
            fieldLabel: '厂矿',
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        _selectBatchDept();
                    }
                }
            }
        }, {
            xtype: 'combo',
            id: 'V_V_V_DEPTCODE',
            name: 'V_V_V_DEPTCODE',
            store: deptStoreByBatch,
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            editable: false,
            forceSelection: true,
            fieldLabel: '作业区'
        }],
        buttons : [ {
            xtype : 'button',
            text : '保存',
            width : 40,
            handler : _planLockingDateBatchUpdate
        }, {
            xtype : 'button',
            text : '关闭',
            width : 40,
            handler : function() {
                Ext.getCmp('batchUpdateWindow').hide();
            }
        } ]
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
            inputWidth: 140,
            margin: '4'
        },
        items: [{
            xtype: 'combo',
            id: 'V_V_ORGCODE',
            name: 'V_V_ORGCODE',
            store: ftyStore,
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            editable: false,
            forceSelection: true,
            fieldLabel: '厂矿',
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        _selectDept();
                    }
                }
            }
        }, {
            xtype: 'combo',
            id: 'V_V_DEPTCODE',
            name: 'V_V_DEPTCODE',
            store: deptStore,
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            editable: false,
            forceSelection: true,
            fieldLabel: '作业区'
        }, {
            xtype: 'combo',
            id: 'I_I_YEAR',
            name: 'I_I_YEAR',
            store: yearStore,
            queryMode: 'local',
            valueField: 'I_YEAR',
            displayField: 'I_YEAR_NAME',
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
            displayField: 'I_MONTH_NAME',
            editable: false,
            forceSelection: true,
            fieldLabel: '月',
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        weekStore.removeAll();
                        _calculationWeek();
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
            displayField: 'I_WEEKNUM_NAME',
            editable: false,
            forceSelection: true,
            fieldLabel: '本月第几周'
        }]
    });

    var planLockingDatePanel = Ext.create('Ext.grid.Panel', {
        id: 'planLockingDatePanel',
        store: planLockingDateStore,
        columnLines: true,
        frame: true,
        style: {
            border: 0
        },
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [{
            text: '序号',
            xtype: "rownumberer",
            width: '100px'
        }, {
            text: 'I_ID',
            dataIndex: 'I_ID',
            style: 'text-align: center;',
            flex: 1,
            hidden:true
        }, {
            text: 'W',
            dataIndex: 'V_TYPE',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '年',
            dataIndex: 'I_YEAR',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '月',
            dataIndex: 'I_MONTH',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '第几周',
            dataIndex: 'I_WEEKNUM',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '开始时间',
            dataIndex: 'D_DATE_S',
            style: 'text-align: center;',
            flex: 1,
            renderer: function(value) {
                var date =  new Date(value);
                return Ext.util.Format.date(date, 'Y-m-d')
            }
        }, {
            text: '结束时间',
            dataIndex: 'D_DATE_E',
            style: 'text-align: center;',
            flex: 1,
            renderer: function(value) {
               var date =  new Date(value);
                return Ext.util.Format.date(date, 'Y-m-d')
            }
        }, {
            text: '厂矿或作业区',
            dataIndex: 'V_DEPTCODE',
            style: 'text-align: center;',
            flex: 1,
            renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                    return (value != null && value != '') ? ftyAllStore.findRecord('V_DEPTCODE', new RegExp('^' + value + '$')).get('V_DEPTNAME') : value;
            }
        }],
        viewConfig: {
            emptyText: '<div style="text-align: center; padding-top: 50px; font: italic bold 20px Microsoft YaHei;">没有数据</div>',
            enableTextSelection: true
        },
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            store: planLockingDateStore,
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
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
        defaults: {
            border: false
        },
        items: [{
            region: 'north',
            items: [buttonPanel, formPanel]
        }, {
            region: 'center',
            layout: 'fit',
            items: [planLockingDatePanel]
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
    Ext.getCmp('I_I_YEAR').setValue((date.getFullYear().toString()));
    Ext.getCmp('I_I_MONTH').setValue(((date.getMonth()+1).toString()));
    Ext.getCmp('V_V_ORGCODE').setValue(Ext.util.Cookies.get('v_orgCode'));
    _selectDept();
    _selectBatchDept();
    Ext.getCmp('V_V_DEPTCODE').setValue(Ext.util.Cookies.get('v_deptcode'));
    _calculationWeek();
    Ext.getCmp('I_I_WEEKNUM').setValue('%');
    _select();
    Ext.getBody().unmask();
}

function _selectPlanLockingDate() {
    var planLockingDateStore = Ext.data.StoreManager.lookup('planLockingDateStore');
    planLockingDateStore.proxy.extraParams = {
        V_V_ORGCODE:'%',
        V_V_DEPTCODE:'%',
        I_I_YEAR:'%',
        I_I_MONTH:'%',
        I_I_WEEKNUM:'%'
    };
    planLockingDateStore.load();
}

function _selectDept() {
    var deptStore = Ext.data.StoreManager.lookup('deptStore');
    deptStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODE: Ext.getCmp('V_V_ORGCODE').getValue(),
        V_V_DEPTCODENEXT: '%',
        V_V_DEPTTYPE: '主体作业区'
    };
    deptStore.load();
    console.log(deptStore);
}

function _selectBatchDept() {
    var deptStoreByBatch = Ext.data.StoreManager.lookup('deptStoreByBatch');
    deptStoreByBatch.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODE: Ext.getCmp('V_V_ORGCODE').getValue(),
        V_V_DEPTCODENEXT: '%',
        V_V_DEPTTYPE: '主体作业区'
    };
    deptStoreByBatch.load();
}

function _select(){

    var planLockingDateStore = Ext.data.StoreManager.lookup('planLockingDateStore');
    var item;
    for (var i = 0; i < Ext.getCmp('formPanel').items.length; i++) {
        item = Ext.getCmp('formPanel').items.get(i);
        planLockingDateStore.proxy.extraParams[item.getName()] = item.getSubmitValue();
    }
    planLockingDateStore.load();

}


function _insert(){
    returnValue = null;
    win = Ext.create('Ext.window.Window', {
        title: '计划上报时间管理(新增)',
        modal: true,
        autoShow: true,
        maximized: false,
        maximizable: true,
        width: 560,
        height: 420,
        html: '<iframe src=' + AppUrl + 'page/SysManage/SM000201/index.html?I_ID=' + "" + ' style="width: 100%; height: 100%;" frameborder="0"/ >',
        listeners : {
           close : function(panel, eOpts) {
               if(returnValue != null){
                   if (returnValue == '保存成功！') {
                       Ext.MessageBox.alert('提示','保存成功');
                       _selectPlanLockingDate();
                   }else if(returnValue == '数据已存在！'){
                       Ext.MessageBox.alert('提示','数据已存在');
                   }else {
                       Ext.MessageBox.alert('提示','保存失败');
                   }
               }
            }
        }
    });
}


function _update(){

    var records = Ext.getCmp('planLockingDatePanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.alert('提示', '请选择一条数据');
        return;
    }else if(records.length > 1){
        Ext.MessageBox.alert('提示', '只能选择一条数据');
        return;
    }


    returnValue = null;
    win = Ext.create('Ext.window.Window', {
        title: '计划上报时间管理(修改)',
        modal: true,
        autoShow: true,
        maximized: false,
        maximizable: true,
        width: 560,
        height: 420,
        html: '<iframe src=' + AppUrl + 'page/SysManage/SM000202/index.html?I_ID=' + records[0].get('I_ID') + ' style="width: 100%; height: 100%;" frameborder="0"/ >',
        listeners : {
              close : function(panel, eOpts) {
                   if (returnValue != null) {
                       var map = returnValue.insertPlanLockingDate[0];
                       for ( var key in map) {//前台更新被修改数据
                           records[0].set(key, map[key]);
                       }
                       if(returnValue.V_INFO == '保存成功！'){
                           Ext.MessageBox.alert('提示','修改成功');
                       }else{
                           Ext.MessageBox.alert('提示','修改失败');
                       }
                   }
              }
        }
    });
}


function _delete(){

    var records = Ext.getCmp('planLockingDatePanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.alert('提示', '请选择一条数据');
        return;
    }
    var I_ID_LIST =new Array();
    for (var i = 0; i < records.length; i++) {
        I_ID_LIST.push(records[i].get('I_ID'));
    }

    Ext.MessageBox.show({
        title : '请确认',
        msg : '批量删除',
        buttons : Ext.MessageBox.YESNO,
        icon : Ext.MessageBox.QUESTION,
        fn : function(btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    url : AppUrl + 'planLockingDate/deletePlanLockingDate',
                    async : false,
                    params : {
                        'I_I_ID_LIST' : I_ID_LIST
                    },
                    callback : function(options, success, response) {
                            var data = Ext.decode(response.responseText);
                            if(data.success=true){
                                Ext.MessageBox.alert('提示',data.data.V_INFO);
                                for (var i = 0; i < records.length; i++) {
                                    Ext.data.StoreManager.lookup('planLockingDateStore').remove(records[i]);
                                }
                            }else{
                                Ext.MessageBox.alert('提示', '删除失败');
                            }
                    }
                });
            }
        }
    });

}


function _batchUpdate(){

    var records = Ext.getCmp('planLockingDatePanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.alert('提示', '请选择一条数据');
        return;
    }
    Ext.getCmp('V_V_V_ORGCODE').setValue(Ext.util.Cookies.get('v_orgCode'));
    Ext.getCmp('V_V_V_DEPTCODE').setValue(Ext.util.Cookies.get('v_deptcode'));
    Ext.getCmp('batchUpdateWindow').show();
}

function _calculationWeek(){
    var year = Ext.getCmp('I_I_YEAR').getValue();
    var month = Ext.getCmp('I_I_MONTH').getValue();
    var firstDate = new Date(year,month-1,1);
    var temp = new Date(year,month,0);
    var Day = temp.getDate();
    var week_sum;
    var week =  firstDate.getDay();
    if(week==0){
        week_sum = 1;                                                                                                                        
    }else {
        week_sum = 7 - week +1;
    }
    var result = 1+Math.ceil((Day-week_sum)/7);
    var weekStore = Ext.data.StoreManager.lookup('weekStore');
    for (var i = 0; i<result+1 ; i++) {
        var map = List[i];
        weekStore.add(map);
    }
}

function _planLockingDateBatchUpdate(){

    var records = Ext.getCmp('planLockingDatePanel').getSelectionModel().getSelection();

    var I_ID_LIST =new Array();
    for (var i = 0; i < records.length; i++) {
        I_ID_LIST.push(records[i].get('I_ID'));
    }
    Ext.Ajax.request({
        url: AppUrl + 'planLockingDate/planLockingDateBatchUpdate',
        async: false,
        params: {
            'I_I_ID_LIST': I_ID_LIST,
            'V_V_V_ORGCODE':Ext.getCmp('V_V_V_ORGCODE').getValue(),
            'V_V_V_DEPTCODE':Ext.getCmp('V_V_V_DEPTCODE').getValue()
        },
        callback: function (options, success, response) {
            var data = Ext.decode(response.responseText);

            if (data != null) {
                var  PlanLockingDate = data.insertPlanLockingDate;
                var  size = data.size;
                for (var i = 0; i < size; i++) {
                    var map = PlanLockingDate[i];
                    for (var key in map) {//前台更新被修改数据
                        records[i].set(key, map[key]);
                    }
                    if (data.V_INFO == '保存成功！') {
                        Ext.MessageBox.alert('提示', '修改成功');
                        Ext.getCmp('batchUpdateWindow').hide();
                    } else {
                        Ext.MessageBox.alert('提示', '修改失败');
                    }
                }
            }
        }
    });
}



