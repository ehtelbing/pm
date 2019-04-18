﻿var V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var processKey = '';
var V_V_CKTYPE = '';
var V_EQUTYPECODE = '';
var V_EQUTYPENAME = '';
var V_ORDERGUID = '';
var V_V_ORGCODE = '';
var V_V_DEPTCODE = '';
var V_V_SPECIALTY = '';
var taskId = '';
var V_STEPCODE = '';

var ckStoreLoad = false;
var zyqStoreLoad = false;
var sblxStoreLoad = false;
var zyStoreLoad = false;
var sbmcStoreLoad = false;
var initLoad = true;
var equFaultLoad= false;
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_ORDERGUID == undefined) ? V_ORDERGUID = '' : V_ORDERGUID = parameters.V_ORDERGUID;
}

var orgLoad = false;
var equTypeLoad = false;
var today = new Date();
var month = today.getMonth()+1;
var YEAR = today.getFullYear();

var hours = [];
var minutes = [];
//月份
var months = [];
for (var i = 1; i <= 12; i++) {
    months.push({displayField: i, valueField: i});
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

    var yearStore = Ext.create("Ext.data.Store", {
        storeId: 'yearStore',
        fields: ['displayField', 'valueField'],
        data: years,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });

    var monthStore = Ext.create("Ext.data.Store", {
        storeId: 'monthStore',
        fields: ['displayField', 'valueField'],
        data: months,
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
                _zyq_sbmc();
                _init();
            }
        }
    });

    var sbmcStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'sbmcStore',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: {
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
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('sbmc').select(store.first());
                sbmcStoreLoad = true;
                _init();
            }
        }
    });
    var equFaultStore = Ext.create('Ext.data.Store', {
        id: 'equFaultStore',
        autoLoad: true,
        fields: ['V_TYPECODE', 'V_TYPENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_14/PM_14_FAULT_TYPE_ITEM_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        listeners: {
            load: function (store, records) {
                equFaultLoad = true;
                Ext.getCmp('gzlx').select(store.first());
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
        })
        // listeners: {
        //     load: function (store, records) {
        //         Ext.getCmp('ck').select(store.first());
        //         ckStoreLoad  = true;
        //         _init();
        //         // _ck_zyqload();
        //     }
        // }
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
        })
        // listeners: {
        //     load: function (store, records) {
        //         Ext.getCmp('zy').select(store.first());
        //         zyStoreLoad = true;
        //         _init();
        //     }
        // }
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
        })
        // listeners: {
        //     load: function (store, records) {
        //         Ext.getCmp('zyq').select(store.first());
        //         zyqStoreLoad = true;
        //         _init();
        //     }
        // }
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
                    for(var i=0;i<records.length;i++){
                        if(records[i].get('V_PERSONCODE')==Ext.util.Cookies.get('v_personcode')){
                            Ext.getCmp('nextPer').select(records[i].get('V_PERSONCODE'));
                            break;
                        }else if(records[i].get('V_PERSONCODE')==V_PERSONCODE){
                            Ext.getCmp('nextPer').select(V_PERSONCODE);
                            break;
                        }else{
                            Ext.getCmp('nextPer').select(store.first());
                        }
                    }
                    // Ext.getCmp('nextPer').select(store.first());
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
            items: [
            //     {
            //     layout: 'column',
            //     defaults: {
            //         xtype: 'combo',
            //         labelAlign: 'right',
            //         width: 250,
            //         editable: false,
            //         displayField: 'displayField',
            //         valueField: 'valueField'
            //     },
            //     items: [{
            //         id: 'year',
            //         allowBlank: false,
            //         fieldLabel: '年份',
            //         store: yearStore,
            //         value: YEAR,
            //         labelWidth: 90
            //     },{
            //         xtype: 'combo',
            //         id: 'yf',
            //         fieldLabel: '月份',
            //         editable: true,
            //         labelWidth: 90,
            //         store: monthStore,
            //         queryMode: 'local'
            //     }]
            // },
                {
                layout: 'column',
                defaults: {
                    xtype: 'combo',
                    labelAlign: 'right',
                    editable: false,
                    queryMode: 'local',
                    width: 250
                },
                items: [{
                    id: 'ck',
                    allowBlank: false,
                    store: ckStore,
                    displayField: 'V_DEPTNAME',
                    valueField: 'V_DEPTCODE',
                    fieldLabel: '计划厂矿',
                    labelWidth: 90
                    // listeners: {
                    //     change: function (field, newValue, oldValue) {
                    //         _ck_zyqload();
                    //         // _zyq_zy();
                    //         _zyq_sblx();
                    //         _zyq_sbmc();
                    //     }
                    // }
                }, {
                    id: 'zyq',
                    store: zyqStore,
                    fieldLabel: '作业区',
                    displayField: 'V_DEPTNAME',
                    valueField: 'V_DEPTCODE',
                    allowBlank: false,
                    labelWidth: 90
                    // listeners: {
                    //     select: function (field, newValue, oldValue) {
                    //         // _zyq_zy();
                    //         _zyq_sblx();
                    //         _zyq_sbmc();
                    //     }
                    // }
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'combo',
                    labelAlign: 'right',
                    width: 250
                },
                items: [{

                    xtype: 'combo',
                    id: 'gzlx',
                    store: equFaultStore,
                    queryMode: 'local',
                    valueField: 'V_TYPECODE',
                    displayField: 'V_TYPENAME',
                    forceSelection: true,
                    fieldLabel: '故障类型',
                    editable: false,
                    labelWidth: 90
                }, {
                    id: 'sblx',
                    store: sblxStore,
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '设备类型',
                    displayField: 'V_EQUTYPENAME',
                    valueField: 'V_EQUTYPECODE',
                    allowBlank: false,
                    labelWidth: 90
                    // listeners: {
                    //     change: function (field, newValue, oldValue) {
                    //         _zyq_sbmc();
                    //     }
                    // }
                    // listConfig:{
                    //     minWidth:420
                    // }
                }]
            }, {
                layout: 'column',
                defaults: {
                    labelAlign: 'right',
                    width: 250
                },
                items: [{
                    id: 'sbmc',
                    xtype: 'combo',
                    allowBlank: false,
                    store: sbmcStore,
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '设备名称',
                    displayField: 'V_EQUNAME',
                    valueField: 'V_EQUCODE',
                    labelWidth: 90
                    // listConfig:{
                    //     minWidth:420
                    // }
                }, {
                    id: 'fqr',
                    xtype: 'textfield',
                    allowBlank: false,
                    fieldLabel: '发起人',
                    readOnly : true,
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
                items: [{
                    id: 'fqsj',
                    allowBlank: false,
                    fieldLabel: '发起时间',
                    labelWidth: 90
                }]
            }, {
                layout: 'column',
                items: [{
                    xtype: 'textarea',
                    id: 'gzyy',
                    fieldLabel: '故障原因',
                    labelAlign: 'right',
                    labelWidth: 90,
                    width: 500
                }]
            }
            // , {
            //     layout: 'column',
            //     items: [{
            //         id: 'jhtgsj',
            //         labelAlign: 'right',
            //         allowBlank: false,
            //         xtype: 'datefield',
            //         editable: false,
            //         format: 'Y-m',
            //         value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            //         fieldLabel: '计划停工时间',
            //         labelWidth: 90,
            //         width: 250,
            //         listeners: {
            //             select: function (field, newValue, oldValue) {
            //                 var date1 = Ext.getCmp('jhtgsj').getSubmitValue();// + " " + Ext.getCmp('tghour').getValue() + ":" + Ext.getCmp('tgminute').getValue() + ":00";
            //                 var date11 = new Date(date1);
            //                 var date2 = Ext.getCmp('jhjgsj').getSubmitValue();// + " " + Ext.getCmp('jghour').getValue() + ":" + Ext.getCmp('jgminute').getValue() + ":00";
            //                 var date22 = new Date(date2);
            //                 var gongshicha = date22.getTime() - date11.getTime();
            //                 var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
            //                 if(gongshicha2 >= 0)
            //                 {
            //                     _gongshiheji();
            //                 }else{
            //                     Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
            //                     function callBack(id) {
            //                         Ext.getCmp('jhtgsj').setValue(new Date()); 		//编辑窗口计划停工时间默认值
            //                         // Ext.getCmp('tghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
            //                         // Ext.getCmp('tgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
            //                         Ext.getCmp('jhjgsj').setValue(new Date());       //编辑窗口计划竣工时间默认值
            //                         // Ext.getCmp('jghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
            //                         // Ext.getCmp('jgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
            //                         Ext.getCmp('jhgshj').setValue(0);
            //                         return ;
            //                     }
            //                 }
            //             }
            //         }
            //     } ]
            // }, {
            //     layout: 'column',
            //     items: [{
            //         id: 'jhjgsj',
            //         labelAlign: 'right',
            //         allowBlank: false,
            //         xtype: 'datefield',
            //         editable: false,
            //         format: 'Y-m',
            //         value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            //         fieldLabel: '计划竣工时间',
            //         labelWidth: 90,
            //         width: 250,
            //         listeners: {
            //             select: function (field, newValue, oldValue) {
            //                 var date1 = Ext.getCmp('jhtgsj').getSubmitValue(); //+ " " + Ext.getCmp('tghour').getValue() + ":" + Ext.getCmp('tgminute').getValue() + ":00";
            //                 var date11 = new Date(date1);
            //                 var date2 = Ext.getCmp('jhjgsj').getSubmitValue(); //+ " " + Ext.getCmp('jghour').getValue() + ":" + Ext.getCmp('jgminute').getValue() + ":00";
            //                 var date22 = new Date(date2);
            //                 var gongshicha = date22.getTime() - date11.getTime();
            //                 var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
            //                 if(gongshicha2 >= 0)
            //                 {
            //                     _gongshiheji();
            //                 }else{
            //                     Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
            //                     function callBack(id) {
            //                         Ext.getCmp('jhtgsj').setValue(new Date()); 		//编辑窗口计划停工时间默认值
            //                         // Ext.getCmp('tghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
            //                         // Ext.getCmp('tgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
            //                         Ext.getCmp('jhjgsj').setValue(new Date());       //编辑窗口计划竣工时间默认值
            //                         // Ext.getCmp('jghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
            //                         // Ext.getCmp('jgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
            //                         Ext.getCmp('jhgshj').setValue(0);
            //                         return ;
            //                     }
            //                 }
            //             }
            //         }
            //     }]
            // }, {
            //     layout: 'column',
            //     defaults: {
            //         xtype: 'textfield',
            //         labelAlign: 'right',
            //         width: 250,
            //         readOnly: false
            //     },
            //     items: [{
            //         id: 'jhgshj',
            //         allowBlank: false,
            //         fieldLabel: '计划工时合计',
            //         labelWidth: 90
            //     }]
            // }
            // , {
            //     layout: 'column',
            //     items: [{
            //         xtype: 'textarea',
            //         id: 'bz',
            //         fieldLabel: '备注',
            //         labelAlign: 'right',
            //         labelWidth: 90,
            //         width: 500
            //     }]
            // }
            ]
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
        }
        // , {
        //     xtype: 'button',
        //     text: '驳回',
        //     style: ' margin: 5px 20px 0px 0px',
        //     icon: imgpath + '/cross.png',
        //     handler: _reject
        // }
        ]
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
        V_V_FLOWTYPE: 'Fault',
        V_V_FLOW_STEP: $.url().param("TaskDefinitionKey"),
        V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_SPECIALTY: '',
        V_V_WHERE: '通过'
    };
    nextSprStore.currentPage = 1;
    nextSprStore.load();
    // selNextPer();
}

function _init() {

    // if(ckStoreLoad && zyqStoreLoad && sblxStoreLoad && sbmcStoreLoad && equFaultLoad && initLoad){
    //     initLoad = false;
        Ext.Ajax.request({
            url: AppUrl + 'cxy/PM_14_FAULT_ITEM_DATA_GET',
            type: 'ajax',
            method: 'POST',
            async: false,
            params: {
                V_V_GUID: V_ORDERGUID
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);
                if (data.RET != null) {
                    V_V_ORGCODE = data.RET[0].V_ORGCODE;
                    V_V_DEPTCODE = data.RET[0].V_DEPTCODE;
                    // V_V_SPECIALTY = data.RET[0].ZYCODE;
                    V_PERSONNAME = data.RET[0].V_INPERNAME;
                    V_PERSONCODE = data.RET[0].V_INPERCODE;
                    //alert(V_PERSONCODE);
                    // Ext.getCmp('year').setValue(data.RET[0].V_YEAR);
                    // Ext.getCmp('ck').setValue(data.RET[0].V_ORGCODE);

                    Ext.data.StoreManager.lookup('ckStore').on('load', function () {
                        Ext.getCmp('ck').select(data.RET[0].V_ORGCODE);
                        _ck_zyqload();
                    });

                    Ext.getCmp('ck').on('change', function () {
                        _ck_zyqload();
                    });

                    Ext.data.StoreManager.lookup('zyqStore').on('load', function () {
                        Ext.getCmp('zyq').select(data.RET[0].V_DEPTCODE);
                        _zyq_sblx();
                        // _zyq_sbmc();
                        _selectNextPer();
                    });

                    Ext.getCmp('zyq').on('change', function () {
                        _zyq_sblx();
                        _selectNextPer();
                    });

                    Ext.data.StoreManager.lookup('sblxStore').on('load', function () {
                        Ext.getCmp('sblx').select(data.RET[0].V_EQUTYPECODE);
                        _zyq_sbmc();


                    });

                    Ext.getCmp('sblx').on('change', function () {
                        _zyq_sbmc();

                    });

                    Ext.data.StoreManager.lookup('sbmcStore').on('load', function () {
                        Ext.getCmp('sbmc').select(data.RET[0].V_EQUCODE);
                        Ext.getBody().unmask();
                    });


                    // Ext.getCmp('zyq').setValue(data.RET[0].V_DEPTCODE);
                    Ext.getCmp('gzlx').select(data.RET[0].V_TYPECODE);
                    // Ext.getCmp('sblx').setValue(data.RET[0].V_EQUTYPECODE);

                    Ext.getCmp('fqr').setValue(data.RET[0].V_INPERNAME);
                    Ext.getCmp('fqsj').setValue(data.RET[0].V_FINDTIME.substring(0, 19));
                    Ext.getCmp('gzyy').setValue(data.RET[0].V_FAULT_YY);
                    // Ext.getCmp('jhtgsj').setValue(data.RET[0].V_INTIME.substring(0, 7));
                    // Ext.getCmp('jhjgsj').setValue(data.RET[0].V_ENDTIME.substring(0, 7));
                    // // Ext.getCmp('jhtgsj').setValue(data.RET[0].PLANTJMONTH.substring(0, 19));
                    // // Ext.getCmp('jhjgsj').setValue(data.RET[0].PLANJGMONTH.substring(0, 19));
                    // Ext.getCmp('jhgshj').setValue(data.RET[0].V_TIME);
                    // Ext.getCmp('bz').setValue(data.RET[0].REMARK);
                    // _selectNextPer();
                    // _selectNextPer();
                    _selectTaskId();


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
        });

        //Ext.getBody().unmask();
    // }


}

function _agree() {
    var spyj = '';
    if (Ext.getCmp('spyj').getValue() == '' || Ext.getCmp('spyj').getValue() == null) {
        spyj = '审批通过';
    } else {
        spyj = Ext.getCmp('spyj').getValue();
    }

    if (Ext.getCmp('gzyy').getValue() == "") {
        Ext.MessageBox.alert('提示', '请先输入检修内容');
        return;
    }

    // if (Ext.getCmp('jhgshj').getValue() < 0) {
    //     Ext.MessageBox.alert('提示', '竣工时间必须大于停工时间');
    //     return;
    // }

    Ext.Ajax.request({
        url: AppUrl + 'cxy/PM_1405_FAULT_ITEM_DATA_UPDATE',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_V_GUID': V_ORDERGUID,
            'V_V_ORGCODE': Ext.getCmp('ck').getValue(),
            'V_V_DEPTCODE': Ext.getCmp('zyq').getValue(),
            'V_V_EQUTYPE': Ext.getCmp('sblx').getValue(),
            'V_V_EQUCODE': Ext.getCmp('sbmc').getValue(),
            'V_V_EQUCHILD_CODE': '',
            'V_V_FAULT_GUID': '',
            'V_V_FAULT_TYPE': Ext.getCmp("gzlx").getValue(),
            'V_V_FAULT_YY': Ext.getCmp("gzyy").getValue(),
            'V_V_FINDTIME': '',
            'V_V_FAULT_XX': '',
            'V_V_JJBF': '',
            'V_V_FAULT_LEVEL': '',
            'V_V_FILE_GUID': '',
            'V_V_INTIME': '',
            'V_V_PERCODE': Ext.util.Cookies.get('v_personcode'),
            'V_V_IP': '',
            'V_V_FAULT_NAME':'',
            'V_V_FAULT_PART':'',
            'V_V_FAULT_CLGC':'',
            'V_V_FAULT_SS':'',
            'V_V_FAULT_XZ':'',
            'V_V_FAULT_ZGCS':'',
            'V_V_FZR_CL':''

        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET=='Success') {//成功，会传回true
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
                                    'V_V_PROCESS_NAMESPACE': 'Fault',
                                    'V_V_PROCESS_CODE': processKey,
                                    'V_V_STEPCODE': V_STEPCODE,
                                    'V_V_STEPNEXT_CODE': V_NEXT_SETP
                                },
                                success: function (ret) {
                                    var resp = Ext.JSON.decode(ret.responseText);
                                    if (resp.V_INFO == 'success') {
                                        Ext.Ajax.request({
                                            url: AppUrl + 'cxy/PM_14_FAULT_ITEM_DATA_STATE_UPDATE',
                                            method: 'POST',
                                            type: 'ajax',
                                            params: {
                                                V_V_PERCODE:Ext.util.Cookies.get('v_personcode'),
                                                V_V_GUID: $.url().param("V_ORDERGUID"),
                                                V_V_STATE: '1',//审核中
                                                V_DEFECT_STATE:'50'//已计划

                                            },
                                            success: function (resp) {
                                                var resp = Ext.decode(resp.responseText);
                                                if (resp.RET == 'SUCCESS') {
                                                    window.close();
                                                    window.opener.OnPageLoad();
                                                } else {
                                                    Ext.Msg.alert('提示', '事故修改状态失败！');
                                                }
                                            },failure: function (resp) {//访问到后台时执行的方法。
                                                Ext.MessageBox.show({
                                                    title: '错误',
                                                    msg: resp.responseText,
                                                    buttons: Ext.MessageBox.OK,
                                                    icon: Ext.MessageBox.ERROR
                                                })
                                            }
                                        });

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
            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: data.RET,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
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

// function _zyq_zy() {
//     var zyStore = Ext.data.StoreManager.lookup('zyStore');
//     zyStore.proxy.extraParams = {
//         V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
//         V_V_DEPTNEXTCODE: V_V_DEPTCODE//Ext.getCmp('zyq').getValue()
//     };
//     //matGroupSecondStore.currentPage = 1;
//     zyStore.load();
// }

function _zyq_sblx() {
    var sblxStore = Ext.data.StoreManager.lookup('sblxStore');
    sblxStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODENEXT: V_V_DEPTCODE//Ext.getCmp('zyq').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    sblxStore.load();
}

function _zyq_sbmc() {
    var sbmcStore = Ext.data.StoreManager.lookup('sbmcStore');
    sbmcStore.proxy.extraParams = {
        v_v_personcode: Ext.util.Cookies.get('v_personcode'),
        v_v_deptcodenext: V_V_DEPTCODE,//Ext.getCmp('zyq').getValue(),
        v_v_equtypecode: Ext.getCmp('sblx').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    sbmcStore.load();

}

function _gongshiheji() {
    var date1 = Ext.getCmp('jhtgsj').getSubmitValue() ;//+ " " + Ext.getCmp('tghour').getValue() + ":" + Ext.getCmp('tgminute').getValue() + ":00";
    var date11 = new Date(date1);
    var date2 = Ext.getCmp('jhjgsj').getSubmitValue();// + " " + Ext.getCmp('jghour').getValue() + ":" + Ext.getCmp('jgminute').getValue() + ":00";
    var date22 = new Date(date2);
    var gongshicha = date22.getTime() - date11.getTime();
    var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
    Ext.getCmp('jhgshj').setValue(gongshicha2);
}