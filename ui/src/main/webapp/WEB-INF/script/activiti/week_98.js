var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');

var V_V_CKTYPE = '';
var V_EQUTYPECODE = '';
var V_EQUTYPENAME = '';
var V_ORDERGUID = '';
var V_V_ORGCODE = '';
var V_V_DEPTCODE = '';
var V_V_SPECIALTY = '';
var taskId = '';
var V_STEPCODE = '';
var V_PERSONNAME ='';
var ckStoreLoad = false;
var zyqStoreLoad = false;
var sblxStoreLoad = false;
var zyStoreLoad = false;
var sbmcStoreLoad = false;
var initLoad = true;

if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_ORDERGUID == undefined) ? V_ORDERGUID = '' : V_ORDERGUID = parameters.V_ORDERGUID;
}

var orgLoad = false;
var equTypeLoad = false;
var today = new Date();
var month = today.getMonth()+1;
var YEAR = today.getFullYear();
var months = [];
var hours = [];
var minutes = [];
for (var i = 1; i <= 12; i++) {
    if (i < 10) {
        months.push({displayField: ("0" + "" + i), valueField: i});
    } else {
        months.push({displayField: i, valueField: i});
    }

}

for (var j = 0; j <= 23; j++) {
    if (j< 10) {
        j = '0' + j;
    } else {
        j = '' + j;
    }
    hours.push({displayField: j, valueField: j});
}
for (var k = 0; k <= 59; k++) {
    if (k< 10) {
        k = '0' + k;
    } else {
        k = '' + k;
    }
    minutes.push({displayField: k, valueField: k});
}

//var V_V_GUID = Ext.data.IdGenerator.get('uuid').generate();


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
    var dt = new Date();
    var thisYear = dt.getFullYear();
    var years = [];
    for (var i = 2013; i <= thisYear + 1; i++) years.push({displayField: i, valueField: i});
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

    var yearStore = Ext.create("Ext.data.Store", {
        storeId: 'yearStore',
        fields: ['displayField', 'valueField'],
        data: years,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });
    var sblxStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'sblxStore',
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('sblx').select(store.first());
                sblxStoreLoad = true;
                _init();
            }
        }
    });
    var sbmcStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'sbmcStore',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/pro_get_deptequ_per',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('sbmc').select(store.first());
                sbmcStoreLoad = true;
                _init();
            }
        }
    });

    var ckStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'ckStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('ck').select(store.first());
                ckStoreLoad  = true;
                _init();
            }
        }
    });

    var zyStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyStore',
        fields: ['V_SPECIALTYCODE', 'V_BASENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'basic/PRO_BASE_SPECIALTY_DEPT_SPECIN',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('zy').select(store.first());
                zyStoreLoad = true;
                _init();
            }
        }
    });

    var zyqStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyqStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('zyq').select(store.first());
                zyqStoreLoad = true;
                _init();
            }
        }
    });

    var monthStore = Ext.create("Ext.data.Store", {
        storeId: 'monthStore',
        autoLoad: true,
        fields: ['displayField', 'valueField'],
        data: months,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });

    var hourStore = Ext.create("Ext.data.Store", {
        storeId: 'hourStore',
        autoLoad: true,
        fields: ['displayField', 'valueField'],
        data: hours,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });

    var minuteStore = Ext.create("Ext.data.Store", {
        storeId: 'minuteStore',
        autoLoad: true,
        fields: ['displayField', 'valueField'],
        data: minutes,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });

    var nextSprStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'nextSprStore',
        fields: ['V_PERSONCODE', 'V_PERSONNAME', 'V_V_NEXT_SETP', 'V_V_FLOW_STEPNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PM_ACTIVITI_PROCESS_PER_SEL',
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

            load: function (store, records, success, eOpts) {
                var list = [];
                if(store.getAt(0) != null){
                    processKey = store.getProxy().getReader().rawData.RET;
                    V_STEPNAME = store.getAt(0).data.V_V_FLOW_STEPNAME;
                    V_NEXT_SETP = store.getAt(0).data.V_V_NEXT_SETP;

                    Ext.getCmp('nextPer').select(store.first());
                }


            }

        }
    });

    var inputPanel = Ext.create('Ext.form.Panel', {
        id: 'inputPanel',
        region: 'north',
        padding: '10px 0px 0px 0px',
        baseCls: 'my-panel-no-border',
        style: 'background-color:#FFFFFF',
        frame: true,
        //border:false,
        items: [{
            xtype: 'fieldset',
            height: 500,
            width: 540,
            style: 'margin-left:10px;',
            defaults: {
                frame: true,
                baseCls: 'my-panel-no-border',
                style: 'margin-top:12px'
            },
            items: [{
                layout: 'column',
                defaults: {
                    xtype: 'combo',
                    labelAlign: 'right',
                    width: 250,
                    editable: false,
                    displayField: 'displayField',
                    valueField: 'valueField'
                },
                items: [{
                    id: 'year',
                    allowBlank: false,
                    fieldLabel: '年份',
                    store: yearStore,
                    value: YEAR,
                    labelWidth: 90
                }, {
                    id: 'month',
                    fieldLabel: '月份',
                    store: monthStore,
                    allowBlank: false,
                    labelWidth: 90,
                    value:month
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'combo',
                    labelAlign: 'right',
                    editable: false,
                    queryMode: 'local',
                    width: 250
                },
                items: [{
                    id: 'week',
                    fieldLabel: '周',
                    labelWidth: 90,
                    displayField: 'displayField',
                    valueField: 'valueField',
                    store: weekStore
                },{
                    id: 'ck',
                    allowBlank: false,
                    store: ckStore,
                    displayField: 'V_DEPTNAME',
                    valueField: 'V_DEPTCODE',
                    fieldLabel: '计划厂矿',
                    labelWidth: 90,
                    listeners: {
                        change: function (field, newValue, oldValue) {
                            _ck_zyqload();
                            _zyq_zy();
                            _zyq_sblx();
                            _zyq_sbmc();
                        }
                    }
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'combo',
                    labelAlign: 'right',
                    width: 250
                },
                items: [ {
                    id: 'zyq',
                    store: zyqStore,
                    fieldLabel: '作业区',
                    displayField: 'V_DEPTNAME',
                    valueField: 'V_DEPTCODE',
                    allowBlank: false,
                    labelWidth: 90,
                    listeners: {
                        select: function (field, newValue, oldValue) {
                            _zyq_zy();
                            _zyq_sblx();
                            _zyq_sbmc();
                        }
                    }
                },{
                    id: 'zy',
                    allowBlank: false,
                    store: zyStore,
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '专业',
                    displayField: 'V_BASENAME',
                    valueField: 'V_SPECIALTYCODE',
                    labelWidth: 90
                } ]
            }, {
                layout: 'column',
                defaults: {
                    labelAlign: 'right',
                    xtype: 'combo',
                    width: 250
                },
                items: [{
                    id: 'sblx',
                    store: sblxStore,
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '设备类型',
                    displayField: 'V_EQUTYPENAME',
                    valueField: 'V_EQUTYPECODE',
                    allowBlank: false,
                    labelWidth: 90,
                    listeners: {
                        change: function (field, newValue, oldValue) {
                            _zyq_sbmc();
                        }
                    }
                },{
                    id: 'sbmc',
                    allowBlank: false,
                    store: sbmcStore,
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '设备名称',
                    displayField: 'V_EQUNAME',
                    valueField: 'V_EQUCODE',
                    labelWidth: 90
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 250,
                    readOnly: true
                },
                items: [, {
                    id: 'fqr',
                    xtype: 'textfield',
                    allowBlank: false,
                    fieldLabel: '发起人',
                    readOnly : true,
                    labelWidth: 90
                },{
                    id: 'fqsj',
                    allowBlank: false,
                    fieldLabel: '发起时间',
                    labelWidth: 90
                }]
            }, {
                layout: 'column',
                items: [{
                    xtype: 'textarea',
                    id: 'jxnr',
                    fieldLabel: '检修内容',
                    labelAlign: 'right',
                    labelWidth: 90,
                    width: 500
                }]
            }, {
                layout: 'column',
                items: [{
                    id: 'jhtgsj',
                    labelAlign: 'right',
                    allowBlank: false,
                    xtype: 'datefield',
                    editable: false,
                    format: 'Y-m-d',
                    value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    fieldLabel: '计划停工时间',
                    labelWidth: 90,
                    width: 250,
                    listeners: {
                        select: function (field, newValue, oldValue) {
                            var date1 = Ext.getCmp('jhtgsj').getSubmitValue() + " " + Ext.getCmp('tghour').getValue() + ":" + Ext.getCmp('tgminute').getValue() + ":00";
                            var date11 = new Date(date1);
                            var date2 = Ext.getCmp('jhjgsj').getSubmitValue() + " " + Ext.getCmp('jghour').getValue() + ":" + Ext.getCmp('jgminute').getValue() + ":00";
                            var date22 = new Date(date2);


                            var gongshicha = date22.getTime() - date11.getTime();
                            var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                            if(gongshicha2 >= 0)
                            {
                                _gongshiheji();
                            }else{
                                Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                                function callBack(id) {
                                    Ext.getCmp('jhtgsj').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                                    Ext.getCmp('tghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                    Ext.getCmp('tgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                    Ext.getCmp('jhjgsj').setValue(new Date());       //编辑窗口计划竣工时间默认值
                                    Ext.getCmp('jghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                    Ext.getCmp('jgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                    Ext.getCmp('jhgshj').setValue(0);
                                    return ;

                                }

                            }
                        }
                    }
                }, {
                    xtype: 'combo',
                    id: "tghour",
                    store: hourStore,
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '小时',
                    value: '00',
                    displayField: 'displayField',
                    valueField: 'valueField',
                    labelWidth: 100,
                    width: 160,
                    //style: ' margin: 5px 0px 0px 0px',
                    labelAlign: 'right',
                    listeners: {
                        select: function (field, newValue, oldValue) {
                            var date1 = Ext.getCmp('jhtgsj').getSubmitValue() + " " + Ext.getCmp('tghour').getValue() + ":" + Ext.getCmp('tgminute').getValue() + ":00";
                            var date11 = new Date(date1);
                            var date2 = Ext.getCmp('jhjgsj').getSubmitValue() + " " + Ext.getCmp('jghour').getValue() + ":" + Ext.getCmp('jgminute').getValue() + ":00";
                            var date22 = new Date(date2);


                            var gongshicha = date22.getTime() - date11.getTime();
                            var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                            if(gongshicha2 >= 0)
                            {
                                _gongshiheji();
                            }else{
                                Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                                function callBack(id) {
                                    Ext.getCmp('jhtgsj').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                                    Ext.getCmp('tghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                    Ext.getCmp('tgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                    Ext.getCmp('jhjgsj').setValue(new Date());       //编辑窗口计划竣工时间默认值
                                    Ext.getCmp('jghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                    Ext.getCmp('jgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                    Ext.getCmp('jhgshj').setValue(0);
                                    return ;

                                }

                            }
                        }
                    }
                }, {
                    xtype: 'combo',
                    id: "tgminute",
                    store: minuteStore,
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '分钟',
                    value: '00',
                    displayField: 'displayField',
                    valueField: 'valueField',
                    labelWidth: 30,
                    width: 90,
                    //style: ' margin: 5px 0px 0px 0px',
                    labelAlign: 'right',
                    listeners: {
                        select: function (field, newValue, oldValue) {
                            var date1 = Ext.getCmp('jhtgsj').getSubmitValue() + " " + Ext.getCmp('tghour').getValue() + ":" + Ext.getCmp('tgminute').getValue() + ":00";
                            var date11 = new Date(date1);
                            var date2 = Ext.getCmp('jhjgsj').getSubmitValue() + " " + Ext.getCmp('jghour').getValue() + ":" + Ext.getCmp('jgminute').getValue() + ":00";
                            var date22 = new Date(date2);


                            var gongshicha = date22.getTime() - date11.getTime();
                            var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                            if(gongshicha2 >= 0)
                            {
                                _gongshiheji();
                            }else{
                                Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                                function callBack(id) {
                                    Ext.getCmp('jhtgsj').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                                    Ext.getCmp('tghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                    Ext.getCmp('tgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                    Ext.getCmp('jhjgsj').setValue(new Date());       //编辑窗口计划竣工时间默认值
                                    Ext.getCmp('jghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                    Ext.getCmp('jgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                    Ext.getCmp('jhgshj').setValue(0);
                                    return ;

                                }

                            }
                        }
                    }
                }]
            }, {
                layout: 'column',
                items: [{
                    id: 'jhjgsj',
                    labelAlign: 'right',
                    allowBlank: false,
                    xtype: 'datefield',
                    editable: false,
                    format: 'Y-m-d',
                    value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    fieldLabel: '计划竣工时间',
                    labelWidth: 90,
                    width: 250,
                    listeners: {
                        select: function (field, newValue, oldValue) {
                            var date1 = Ext.getCmp('jhtgsj').getSubmitValue() + " " + Ext.getCmp('tghour').getValue() + ":" + Ext.getCmp('tgminute').getValue() + ":00";
                            var date11 = new Date(date1);
                            var date2 = Ext.getCmp('jhjgsj').getSubmitValue() + " " + Ext.getCmp('jghour').getValue() + ":" + Ext.getCmp('jgminute').getValue() + ":00";
                            var date22 = new Date(date2);


                            var gongshicha = date22.getTime() - date11.getTime();
                            var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                            if(gongshicha2 >= 0)
                            {
                                _gongshiheji();
                            }else{
                                Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                                function callBack(id) {
                                    Ext.getCmp('jhtgsj').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                                    Ext.getCmp('tghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                    Ext.getCmp('tgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                    Ext.getCmp('jhjgsj').setValue(new Date());       //编辑窗口计划竣工时间默认值
                                    Ext.getCmp('jghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                    Ext.getCmp('jgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                    Ext.getCmp('jhgshj').setValue(0);
                                    return ;

                                }

                            }
                        }
                    }
                }, {
                    xtype: 'combo',
                    id: "jghour",
                    store: hourStore,
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '小时',
                    value: '00',
                    displayField: 'displayField',
                    valueField: 'valueField',
                    labelWidth: 100,
                    width: 160,
                    labelAlign: 'right',
                    listeners: {
                        select: function (field, newValue, oldValue) {
                            var date1 = Ext.getCmp('jhtgsj').getSubmitValue() + " " + Ext.getCmp('tghour').getValue() + ":" + Ext.getCmp('tgminute').getValue() + ":00";
                            var date11 = new Date(date1);
                            var date2 = Ext.getCmp('jhjgsj').getSubmitValue() + " " + Ext.getCmp('jghour').getValue() + ":" + Ext.getCmp('jgminute').getValue() + ":00";
                            var date22 = new Date(date2);


                            var gongshicha = date22.getTime() - date11.getTime();
                            var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                            if(gongshicha2 >= 0)
                            {
                                _gongshiheji();
                            }else{
                                Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                                function callBack(id) {
                                    Ext.getCmp('jhtgsj').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                                    Ext.getCmp('tghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                    Ext.getCmp('tgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                    Ext.getCmp('jhjgsj').setValue(new Date());       //编辑窗口计划竣工时间默认值
                                    Ext.getCmp('jghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                    Ext.getCmp('jgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                    Ext.getCmp('jhgshj').setValue(0);
                                    return ;

                                }

                            }
                        }
                    }
                }, {
                    xtype: 'combo',
                    id: "jgminute",
                    store: minuteStore,
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '分钟',
                    value: '00',
                    displayField: 'displayField',
                    valueField: 'valueField',
                    labelWidth: 30,
                    width: 90,
                    labelAlign: 'right',
                    listeners: {
                        select: function (field, newValue, oldValue) {
                            var date1 = Ext.getCmp('jhtgsj').getSubmitValue() + " " + Ext.getCmp('tghour').getValue() + ":" + Ext.getCmp('tgminute').getValue() + ":00";
                            var date11 = new Date(date1);
                            var date2 = Ext.getCmp('jhjgsj').getSubmitValue() + " " + Ext.getCmp('jghour').getValue() + ":" + Ext.getCmp('jgminute').getValue() + ":00";
                            var date22 = new Date(date2);


                            var gongshicha = date22.getTime() - date11.getTime();
                            var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                            if(gongshicha2 >= 0)
                            {
                                _gongshiheji();
                            }else{
                                Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                                function callBack(id) {
                                    Ext.getCmp('jhtgsj').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                                    Ext.getCmp('tghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                    Ext.getCmp('tgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                    Ext.getCmp('jhjgsj').setValue(new Date());       //编辑窗口计划竣工时间默认值
                                    Ext.getCmp('jghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                    Ext.getCmp('jgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                    Ext.getCmp('jhgshj').setValue(0);
                                    return ;

                                }

                            }
                        }
                    }
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 250,
                    readOnly: true
                },
                items: [{
                    id: 'jhgshj',
                    allowBlank: false,
                    fieldLabel: '计划工时合计',
                    labelWidth: 90
                }]
            }, {
                layout: 'column',
                items: [{
                    readOnly: true,
                    xtype: 'textarea',
                    id: 'bz',
                    fieldLabel: '备注',
                    labelAlign: 'right',
                    labelWidth: 90,
                    width: 500
                }]
            }]
        }]
    });

    var buttonPanel = Ext.create('Ext.panel.Panel', {
        id: 'buttonPanel',
        layout: 'column',
        region: 'north',
        padding: '0 0 0 0',
        height: 30,
        style: 'margin-bottom:1px',
        frame: true,
        baseCls: 'my-panel-no-border',
        items: [{
            id: 'nextPer',
            xtype: 'combo',
            store: nextSprStore,
            fieldLabel: '下一步接收人',
            editable: false,
            labelWidth: 80,
            displayField: 'V_PERSONNAME',
            valueField: 'V_PERSONCODE',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            fieldStyle: 'background-color: #FFEBCD; background-image: none;',
            style: ' margin: 5px 0px 0px 5px',
            labelAlign: 'right',
            width: 200
        }, {
            id: 'spyj',
            xtype: 'textfield',
            fieldLabel: '审批意见',
            labelWidth: 90,
            //baseCls: 'margin-bottom',
            fieldStyle: 'background-color: #FFEBCD; background-image: none;',
            style: ' margin: 5px 0px 0px 5px',
            labelAlign: 'right',
            width: 250
        }, {
            xtype: 'button',
            text: '同意',
            style: ' margin: 5px 20px 0px 20px',
            icon: imgpath + '/saved.png',
            handler: _agree
        }, {
            xtype: 'button',
            text: '驳回',
            style: ' margin: 5px 20px 0px 0px',
            icon: imgpath + '/cross.png',
            handler: _reject
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
            items: [buttonPanel]
        }, {
            region: 'center',
            //layout: 'fit',
            border: false,
            items: [inputPanel]
        }]
    });

    _init();
});

function _selectTaskId() {
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/GetTaskIdFromBusinessId',
        type: 'ajax',
        method: 'POST',
        params: {
            businessKey: V_ORDERGUID,
            userCode: Ext.util.Cookies.get('v_personcode')

        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);//后台返回的值
            taskId = data.taskId;
            V_STEPCODE = data.TaskDefinitionKey;

        },
        failure: function (response) {
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    })
}

function _selectNextPer() {
    var nextSprStore = Ext.data.StoreManager.lookup('nextSprStore');
    nextSprStore.proxy.extraParams = {
        V_V_ORGCODE: V_V_ORGCODE,
        V_V_DEPTCODE: V_V_DEPTCODE,
        V_V_REPAIRCODE: '',
        V_V_FLOWTYPE: 'WeekPlan',
        V_V_FLOW_STEP: $.url().param("TaskDefinitionKey"),
        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_SPECIALTY: V_V_SPECIALTY,
        V_V_WHERE: '通过'

    };
    nextSprStore.currentPage = 1;
    nextSprStore.load();
}

function _init() {

    if(ckStoreLoad && zyqStoreLoad && sblxStoreLoad && zyStoreLoad && sbmcStoreLoad && initLoad){
        initLoad = false;
        Ext.Ajax.request({
            url: AppUrl + 'PM_03/PRO_PM_03_PLAN_WEEK_GET',
            type: 'ajax',
            method: 'POST',
            params: {
                'V_V_WEEKPLAN_GUID': V_ORDERGUID

            },
            success: function (response) {
                var data = Ext.decode(response.responseText);
                if (data.list != null) {
                    V_V_ORGCODE = data.list[0].V_ORGCODE;
                    V_V_DEPTCODE = data.list[0].V_DEPTCODE;
                    V_V_SPECIALTY = data.list[0].V_REPAIRMAJOR_CODE;
                    V_PERSONNAME = data.list[0].V_INPER;
                    Ext.getCmp('week').setValue(data.list[0].V_WEEK);
                    Ext.getCmp('year').setValue(data.list[0].V_YEAR);
                    Ext.getCmp('month').setValue(data.list[0].V_MONTH);
                    Ext.getCmp('ck').setValue(data.list[0].V_ORGCODE);
                    Ext.getCmp('zyq').setValue(data.list[0].V_DEPTCODE);
                    Ext.getCmp('zy').setValue(data.list[0].V_REPAIRMAJOR_CODE);
                    Ext.getCmp('sblx').setValue(data.list[0].V_EQUTYPECODE);
                    Ext.getCmp('sbmc').setValue(data.list[0].V_EQUCODE);
                    Ext.getCmp('fqr').setValue(data.list[0].V_INPERNAME);
                    Ext.getCmp('fqsj').setValue(data.list[0].V_INDATE.substring(0, 19));
                    Ext.getCmp('jxnr').setValue(data.list[0].V_CONTENT);
                    Ext.getCmp('jhtgsj').setValue(data.list[0].V_STARTTIME.substring(0, 10));
                    Ext.getCmp('tghour').setValue(data.list[0].V_STARTTIME.substring(11, 13));
                    Ext.getCmp('tgminute').setValue(data.list[0].V_STARTTIME.substring(14, 16));
                    Ext.getCmp('jhjgsj').setValue(data.list[0].V_ENDTIME.substring(0, 10));
                    Ext.getCmp('jghour').setValue(data.list[0].V_STARTTIME.substring(11, 13));
                    Ext.getCmp('jgminute').setValue(data.list[0].V_STARTTIME.substring(14, 16));
                    Ext.getCmp('jhgshj').setValue(data.list[0].V_HOUR);
                    Ext.getCmp('bz').setValue(data.list[0].V_BZ);
                    _selectNextPer();
                    _selectTaskId();
                    Ext.getBody().unmask();
                }
            },
            failure: function (response) {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: response.responseText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        })

        //Ext.getBody().unmask();
    }


    /*Ext.Ajax.request({
        url: AppUrl + 'PM_03/PRO_PM_03_PLAN_MONTH_GET',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_V_MONTHPLAN_GUID': V_ORDERGUID

        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.list != null) {
                V_V_ORGCODE = data.list[0].V_ORGCODE;
                V_V_DEPTCODE = data.list[0].V_DEPTCODE;
                V_V_SPECIALTY = data.list[0].V_REPAIRMAJOR_CODE;
                V_PERSONNAME = data.list[0].V_INPERNAME
                Ext.getCmp('year').setValue(data.list[0].V_YEAR);
                Ext.getCmp('month').setValue(data.list[0].V_MONTH);
                Ext.getCmp('ck').setValue(data.list[0].V_ORGNAME);
                Ext.getCmp('zyq').setValue(data.list[0].V_DEPTNAME);
                Ext.getCmp('zy').setValue(data.list[0].V_REPAIRMAJOR_CODE);
                Ext.getCmp('sblx').setValue(data.list[0].V_EQUTYPENAME);
                Ext.getCmp('sbmc').setValue(data.list[0].V_EQUNAME);
                Ext.getCmp('fqr').setValue(data.list[0].V_INPERNAME);
                Ext.getCmp('fqsj').setValue(data.list[0].V_INDATE.substring(0, 19));
                Ext.getCmp('jxnr').setValue(data.list[0].V_CONTENT);
                Ext.getCmp('jhtgsj').setValue(data.list[0].V_STARTTIME.substring(0, 19));
                Ext.getCmp('jhjgsj').setValue(data.list[0].V_ENDTIME.substring(0, 19));
                Ext.getCmp('jhgshj').setValue(data.list[0].V_HOUR);
                Ext.getCmp('bz').setValue(data.list[0].V_BZ);
                _selectNextPer();
                _selectTaskId();
                Ext.getBody().unmask();
            }
        },
        failure: function (response) {
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    });*/

}

function _agree() {
    var spyj = '';
    if (Ext.getCmp('spyj').getValue() == '' || Ext.getCmp('spyj').getValue() == null) {
        spyj = '审批通过';
    } else {
        spyj = Ext.getCmp('spyj').getValue();
    }
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/TaskComplete',
        type: 'ajax',
        method: 'POST',
        params: {
            taskId: taskId,
            idea: '通过',
            parName: [V_NEXT_SETP, "flow_yj"],
            parVal: [Ext.getCmp('nextPer').getValue(), spyj],
            processKey: processKey,
            businessKey: V_ORDERGUID,
            V_STEPCODE: V_STEPCODE,
            V_STEPNAME: V_STEPNAME,
            V_IDEA: '请审批！',
            V_NEXTPER: Ext.getCmp('nextPer').getValue(),
            V_INPER: Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.ret == '任务提交成功') {
                Ext.Ajax.request({
                    url: AppUrl + 'hp/PRO_ACTIVITI_FLOW_AGREE',
                    method: 'POST',
                    async: false,
                    params: {
                        'V_V_ORDERID': V_ORDERGUID,
                        'V_V_PROCESS_NAMESPACE': 'WeekPlan',
                        'V_V_PROCESS_CODE': processKey,
                        'V_V_STEPCODE': V_STEPCODE,
                        'V_V_STEPNEXT_CODE': V_NEXT_SETP
                    },
                    success: function (ret) {
                        var resp = Ext.JSON.decode(ret.responseText);
                        if (resp.V_INFO == 'success') {
                            window.close();
                            window.opener.OnPageLoad();
                        }
                    }
                });
            } else {
                Ext.MessageBox.alert('提示', '任务提交失败');
            }


        },
        failure: function (response) {//访问到后台时执行的方法。
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            })
        }

    })
}

function _reject() {
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/TaskComplete',
        type: 'ajax',
        method: 'POST',
        params: {
            taskId: taskId,
            idea: '不通过',
            parName: [ "flow_yj"],
            parVal: [ '驳回'],
            processKey :processKey,
            businessKey : V_ORDERGUID,
            V_STEPCODE : 'end',
            V_STEPNAME : '驳回',
            V_IDEA : '驳回',
            V_NEXTPER : '',
            V_INPER : Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            window.close();
            window.opener.OnPageLoad();
        },
        failure: function (response) {//访问到后台时执行的方法。
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            })
        }

    })
}



function _close() {
    window.close();
}

function _ck_zyqload() {
    var zyqStore = Ext.data.StoreManager.lookup('zyqStore');
    zyqStore.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
        'V_V_DEPTCODENEXT': '%',
        'V_V_DEPTTYPE': '主体作业区'
    };
    //matGroupSecondStore.currentPage = 1;
    zyqStore.load();

}


function _zyq_zy() {
    var zyStore = Ext.data.StoreManager.lookup('zyStore');
    zyStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    zyStore.load();
}

function _zyq_sblx() {
    var sblxStore = Ext.data.StoreManager.lookup('sblxStore');
    sblxStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    sblxStore.load();
}

function _zyq_sbmc() {
    var sbmcStore = Ext.data.StoreManager.lookup('sbmcStore');
    sbmcStore.proxy.extraParams = {
        v_v_personcode: Ext.util.Cookies.get('v_personcode'),
        v_v_deptcodenext: Ext.getCmp('zyq').getValue(),
        v_v_equtypecode: Ext.getCmp('sblx').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    sbmcStore.load();


}

function _gongshiheji() {
    var date1 = Ext.getCmp('jhtgsj').getSubmitValue() + " " + Ext.getCmp('tghour').getValue() + ":" + Ext.getCmp('tgminute').getValue() + ":00";
    var date11 = new Date(date1);
    var date2 = Ext.getCmp('jhjgsj').getSubmitValue() + " " + Ext.getCmp('jghour').getValue() + ":" + Ext.getCmp('jgminute').getValue() + ":00";
    var date22 = new Date(date2);


    var gongshicha = date22.getTime() - date11.getTime();
    var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
    Ext.getCmp('jhgshj').setValue(gongshicha2);

}