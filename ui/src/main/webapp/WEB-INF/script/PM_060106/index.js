var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var V_EQUTYPECODE;
var V_EQUTYPENAME;
var orgLoad = false;
var equTypeLoad = false;
var deptLoad = false;
var equNameload = false;
var eTypeLoad = false;
var guid = '';
var V_V_DJ_TYPE = '';



if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_TIMER_GUID == undefined) ? V_TIMER_GUID = '' : V_TIMER_GUID = parameters.V_TIMER_GUID;
}

var today = new Date();

var Hours = [];
for (var i = 0; i <= 23; i++)Hours.push({displayField: i, valueField: i});

var Minutes = [];
for (var i = 0; i <= 59; i++)Minutes.push({displayField: i, valueField: i});

var DjType = [{displayField: '岗位点检', valueField: 'GW'}, {displayField: '精密点检', valueField: 'JM'}, {
    displayField: '专业点检',
    valueField: 'ZY'
}];


var hoursStore = Ext.create('Ext.data.Store', {
    id: 'hoursStore',
    autoLoad: true,
    fields: ['displayField', 'valueField'],
    data: Hours,
    proxy: {
        type: 'memory',
        render: {
            type: 'json'
        }
    }
});

var minuteStore = Ext.create('Ext.data.Store', {
    id: 'minuteStore',
    autoLoad: true,
    fields: ['displayField', 'valueField'],
    data: Minutes,
    proxy: {
        type: 'memory',
        render: {
            type: 'json'
        }
    }
});


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

    var DjTypeStore = Ext.create('Ext.data.Store', {
        id: 'DjTypeStore',
        autoLoad: true,
        fields: ['displayField', 'valueField'],
        data: DjType,
        proxy: {
            type: 'memory',
            render: {
                type: 'json'
            }
        }
    });

    /*var orgStore = Ext.create('Ext.data.Store', {
     id: 'orgStore',
     autoLoad: true,
     fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
     proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
     type: 'ajax',
     url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
     actionMethods: {
     read: 'POST'
     },
     reader: {
     type: 'json',
     root: 'list'
     },
     extraParams: {
     'V_V_PERSONCODE': V_V_PERSONCODE,
     'V_V_DEPTCODE': V_V_DEPTCODE,
     'V_V_DEPTCODENEXT': '%',
     'V_V_DEPTTYPE': '基层单位'
     }
     }),
     listeners: {
     load: function (store, records) {
     orgLoad = true;
     Ext.getCmp('V_V_ORGCODE').select(store.first());
     _init();
     }
     }
     });

     var deptStore = Ext.create('Ext.data.Store', {
     id: 'deptStore',
     autoLoad: false,
     fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
     proxy:  Ext.create("Ext.ux.data.proxy.Ajax",{
     type: 'ajax',
     url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
     actionMethods: {
     read: 'POST'
     },
     reader: {
     type: 'json',
     root: 'list'
     },
     async: false,
     extraParams: {}
     }),
     listeners: {
     load: function (store, records) {
     deptLoad = true;
     Ext.getCmp('V_V_DEPTCODE').select(store.first());
     _init();
     }
     }
     });

     var equTypeStore = Ext.create('Ext.data.Store', {
     id: 'equTypeStore',
     autoLoad: true,
     fields: ['V_CK_EQUTYPECODE', 'V_CK_EQUTYPENAME', 'I_ORDER', 'I_ID'],
     proxy: {
     type: 'ajax',
     url: AppUrl + 'PM_06/PM_06_EQUTYPE_SEL',
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
     equTypeLoad = true;
     Ext.getCmp('V_CK_EQUTYPECODE').select(store.first());
     _init();
     }
     }
     });

     var eTypeStore = Ext.create('Ext.data.Store', {
     id: 'eTypeStore',
     autoLoad: false,
     fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME', 'I_ORDER', 'I_ID'],
     proxy:  Ext.create("Ext.ux.data.proxy.Ajax",{
     type: 'ajax',
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
     eTypeLoad = true;
     Ext.getCmp('equtype').select(store.first());
     _init();
     }
     }
     });

     var equNameStore = Ext.create('Ext.data.Store', {
     id: 'equNameStore',
     autoLoad: false,
     fields: ['V_EQUCODE', 'V_EQUNAME', 'I_ORDER', 'I_ID'],
     proxy:  Ext.create("Ext.ux.data.proxy.Ajax",{
     type: 'ajax',
     url: AppUrl + 'PM_06/pro_get_deptequ_per',
     actionMethods: {
     read: 'POST'
     },
     async: false,
     reader: {
     type: 'json',
     root: 'list'
     }
     }),
     listeners: {
     load: function (store, records) {
     equNameload = true;
     Ext.getCmp('equname').select(store.first());
     _init();
     }
     }
     });*/

    var djDataCreateStore = Ext.create('Ext.data.Store', {
        storeId: 'djDataCreateStore',
        autoLoad: false,
        pageSize: 15,//测试好用
        fields: ['V_DJ_TYPE', 'V_EQUNAME', 'V_CRITERION_CODE', 'V_CKTYPE', 'V_EQUTYPECODE', 'V_PERCODE_INPUT', 'V_PERNAME_INPUT', 'V_CRITERION_ITEM',
            'V_CRITERION_CONTENT', 'V_CRITERION_CR', 'V_CRITERION_CYCLE', 'V_CRITERION_CYCLETYPE', 'V_EQU_STATE1', 'V_EQU_STATE2', 'V_EQU_STATE3',
            'V_CK_FUNCTION1', 'V_CK_FUNCTION2', 'V_CK_FUNCTION3', 'V_CK_FUNCTION4', 'V_CK_FUNCTION5', 'V_CK_FUNCTION6', 'V_CK_FUNCTION7', 'V_CK_FUNCTION8', 'V_DJ_DATE', 'V_CK_EQUTYPECODE', 'V_GUID'],
        proxy: {
            url: AppUrl + 'hp/PM_06_DJ_CRITERION_DBDATA_SEL',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        }
    });

    var djDataCreateHisStore = Ext.create('Ext.data.Store', {
        storeId: 'djDataCreateHisStore',
        autoLoad: false,
        pageSize: -1,
        fields: ['D_DATE_FX', 'V_YCMS', 'V_CRITERION_ITEM', 'V_PERNAME_FX', 'V_CRITERION_CONTENT', 'V_CRITERION_CYCLETYPE'],
        proxy: {
            url: AppUrl + 'PM_06/PM_06_DJ_DATA_HISTORY',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var topPanel = Ext.create('Ext.form.Panel', {
        region: 'north',
        id: 'topPanel',
        titleAlign: 'center',
        layout: 'column',
        border: false,
        frame: true,
        defaults: {
            labelAlign: 'right',
            margin: '5 0 5 5'
        },
        items: [/*{
         xtype: 'combo',
         id: 'V_V_ORGCODE',
         store: orgStore,
         queryMode: 'local',
         valueField: 'V_DEPTCODE',
         displayField: 'V_DEPTNAME',
         labelWidth: 80,
         typeAhead: false,
         editable: false,
         forceSelection: true,
         fieldLabel: '单位',
         listeners: {
         change: function (combo, records) {
         _selectDept(records);
         }
         }
         }, {
         xtype: 'combo',
         id: 'V_V_DEPTCODE',
         store: deptStore,
         queryMode: 'local',
         valueField: 'V_DEPTCODE',
         displayField: 'V_DEPTNAME',
         forceSelection: true,
         typeAhead: false,
         editable: false,
         labelWidth: 80,
         fieldLabel: '作业区',
         listeners: {
         change: function (combo, records) {
         Ext.data.StoreManager.lookup('eTypeStore').load({
         params : {
         V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
         V_V_DEPTCODENEXT : Ext.getCmp('V_V_DEPTCODE').getValue()
         }
         });
         }
         }
         },{
         xtype: 'combo',
         id: 'V_CK_EQUTYPECODE',
         store: equTypeStore,
         queryMode: 'local',
         valueField: 'V_CK_EQUTYPECODE',
         displayField: 'V_CK_EQUTYPENAME',
         labelWidth: 90,
         forceSelection: true,
         fieldLabel: '点检设备分类',
         editable: false,
         listeners: {
         change: function () {
         if (V_EQUTYPECODE != null) {
         }
         }
         }
         }, {
         xtype: 'combo',
         id: 'equtype',
         store: eTypeStore,
         queryMode: 'local',
         valueField: 'V_EQUTYPECODE',
         displayField: 'V_EQUTYPENAME',
         labelWidth: 80,
         forceSelection: true,
         fieldLabel: '设备分类',
         editable: false,
         listeners: {
         change: function () {
         Ext.data.StoreManager.lookup('equNameStore').load({
         params : {
         v_v_personcode: Ext.util.Cookies.get('v_personcode'),
         v_v_deptcodenext: Ext.getCmp('V_V_DEPTCODE').getValue(),
         v_v_equtypecode: Ext.getCmp('equtype').getValue()
         }
         });
         }
         }
         }, {
         xtype: 'combo',
         id: 'equname',
         store: equNameStore,
         queryMode: 'local',
         valueField: 'V_EQUCODE',
         displayField: 'V_EQUNAME',
         labelWidth: 80,
         forceSelection: true,
         editable: false,
         fieldLabel: '设备名称',
         listeners: {
         change: function () {
         if(Ext.getCmp('equname').getValue() == '%'){
         Ext.getCmp('topPanel').setTitle('岗位点检作业&nbsp&nbsp<button type="button"; onclick="onbtnclick();style="margin-right:10px">?</button>');
         }
         else{
         Ext.getCmp('topPanel').setTitle(Ext.getCmp('equname').getRawValue()+'岗位点检作业&nbsp&nbsp<button type="button" onclick="onbtnclick()">?</button>');
         }
         }
         }
         },*/{
            xtype: 'button',
            text: '刷新',
            icon: imgpath + '/table_refresh.png',
            handler: function () {
                query();
            }
        }, {
            xtype: 'button',
            text: '正常',
            icon: imgpath + '/saved.png',
            handler: function () {
                _djDataZCShow();
            }
        }, {
            xtype: 'button',
            text: '发现异常',
            icon: imgpath + '/tree_dnd_no.png',
            handler: function () {
                _djDataYCShow();
            }
        }, {
            xtype: 'button',
            text: 'Excel导出',
            listeners: {click: OnButtonExcelClicked}
        }, {
            xtype: 'datefield',
            id: 'allsj',
            format: 'Y-m-d',
            value: new Date(),
            fieldLabel: '点检时间',
            editable: false,
            labelWidth: 90,
            hidden : true,
            width: 200
        }, {
            xtype: 'combo',
            id: 'allhour',
            store: hoursStore,
            labelAlign: 'right',
            labelWidth: 20,
            width: 60,
            value: today.getHours(),
            format: 'H',
            displayField: 'displayField',
            valueField: 'valueField',
            margin: '0px 0 0 10px',
            queryMode: 'local',
            hidden : true,
            editable: false
        }, {
            xtype: 'combo',
            id: 'allminute',
            store: minuteStore,
            fieldLabel: '时',
            labelAlign: 'right',
            labelWidth: 20,
            width: 80,
            value: today.getMinutes(),
            format: 'i',
            margin: '0px 0 0 5px',
            displayField: 'displayField',
            valueField: 'valueField',
            queryMode: 'local',
            editable: false,
            hidden : true,
            labelSeparator: ''
        }]
    });

    var djDataCreatePanel = Ext.create('Ext.grid.Panel', {
        id: 'djDataCreatePanel',
        store: djDataCreateStore,
        pageSize: 15,
        border: false,
        columnLines: true,
        titleAlign: 'center',
        region: 'center',
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '详情',
            align: 'center',
            width: 150,
            renderer: detail
        }, {
            text: '设备名称',
            dataIndex: 'V_EQUNAME',
            align: 'center',
            width: 200
        }, {
            text: '点检项目',
            dataIndex: 'V_CRITERION_ITEM',
            align: 'center',
            width: 200
        }, {
            text: '点检内容',
            dataIndex: 'V_CRITERION_CONTENT',
            align: 'center',
            width: 200
        }, {
            text: '点检标准',
            dataIndex: 'V_CRITERION_CR',
            align: 'center',
            width: 200
        }, {
            text: '点检周期',
            dataIndex: 'V_CRITERION_CYCLE',
            align: 'center',
            width: 80
        }, {
            text: '周期类型',
            dataIndex: 'V_CRITERION_CYCLETYPE',
            align: 'center',
            width: 80
        }, {
            text: '设备状态',
            align: 'center',
            columns: [{
                text: '目视',
                dataIndex: 'V_CK_FUNCTION1',
                align: 'center',
                renderer: state,
                width: 80
            }, {
                text: '手摸',
                dataIndex: 'V_CK_FUNCTION2',
                align: 'center',
                renderer: state,
                width: 80
            }, {
                text: '听音',
                dataIndex: 'V_CK_FUNCTION3',
                align: 'center',
                renderer: state,
                width: 80
            }, {
                text: '打击',
                dataIndex: 'V_CK_FUNCTION4',
                align: 'center',
                renderer: state,
                width: 80
            }, {
                text: '嗅觉',
                dataIndex: 'V_CK_FUNCTION5',
                align: 'center',
                renderer: state,
                width: 80
            }, {
                text: '精密',
                dataIndex: 'V_CK_FUNCTION6',
                align: 'center',
                renderer: state,
                width: 80
            }, {
                text: '解体',
                dataIndex: 'V_CK_FUNCTION7',
                align: 'center',
                renderer: state,
                width: 80
            }]
        }, {
            text: '重点',
            dataIndex: 'V_CK_FUNCTION7',
            align: 'center',
            renderer: state,
            width: 100
        }, {
            text: '预警',
            dataIndex: 'V_CK_FUNCTION8',
            align: 'center',
            renderer: state,
            width: 100
        }, {
            text: '点检设备分类',
            dataIndex: 'V_CK_EQUTYPECODE',
            align: 'center',
            width: 100
        }]

    });

    var djDataCreateHisPanel = Ext.create('Ext.grid.Panel', {
        id: 'djDataCreateHisPanel',
        store: djDataCreateHisStore,
        title: '设备岗位异常历史',
        frame: true,
        border: false,
        columnLines: true,
        height: 230,
        layout: 'fit',
        region: 'south',
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 100,
            align: 'center'
        }, {
            text: '异常发现时间',
            dataIndex: 'D_DATE_FX',
            flex: 1
        }, {
            text: '异常现象',
            dataIndex: 'V_YCMS',
            flex: 1
        }, {
            text: '点检项目/部位',
            dataIndex: 'V_CRITERION_ITEM',
            flex: 1
        }, {
            text: '点检内容',
            dataIndex: 'V_CRITERION_CONTENT',
            flex: 1
        }, {
            text: '发现人',
            dataIndex: 'V_PERNAME_FX',
            flex: 1
        }]
    });

    var djDataZCPanel = Ext.create('Ext.form.Panel', {
        id: 'djDataZCPanel',
        region: 'center',
        autoScroll: true,
        padding: '10px 0px 0px 0px',
        baseCls: 'my-panel-no-border',
        style: 'background-color:#FFFFFF',
        frame: true,
        border: false,
        items: [{
            xtype: 'fieldset',
            height: 215,
            width: 440,
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
                    width: 500
                    //editable:false,
                },
                items: [{
                    xtype: 'datefield',
                    id: 'V_D_DATE_SJ',
                    format: 'Y-m-d',
                    value: new Date(),
                    fieldLabel: '点检时间',
                    editable: false,
                    labelWidth: 90,
                    width: 200
                }, {
                    xtype: 'combo',
                    id: 'zchour',
                    store: hoursStore,
                    labelAlign: 'right',
                    labelWidth: 20,
                    width: 60,
                    value: today.getHours(),
                    format: 'H',
                    displayField: 'displayField',
                    valueField: 'valueField',
                    margin: '0px 0 0 10px',
                    queryMode: 'local',
                    editable: false
                }, {
                    xtype: 'combo',
                    id: 'zcminute',
                    store: minuteStore,
                    fieldLabel: '时',
                    labelAlign: 'right',
                    labelWidth: 20,
                    width: 80,
                    value: today.getMinutes(),
                    format: 'i',
                    margin: '0px 0 0 5px',
                    displayField: 'displayField',
                    valueField: 'valueField',
                    queryMode: 'local',
                    editable: false,
                    labelSeparator: ''
                }, {
                    xtype: 'displayfield',
                    fieldLabel: '分',
                    labelSeparator: '',
                    margin: '0px 0 0 5px',
                    labelWidth: 20,
                    width: 20
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 500
                },
                items: [{
                    xtype: 'textarea',
                    id: 'V_V_YCMS',
                    fieldLabel: '备注描述',
                    width: 360,
                    height: 120,
                    labelWidth: 90
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 500
                },
                items: [{
                    id: 'V_V_PERNAME_FX',
                    fieldLabel: '点检人',
                    labelWidth: 90,
                    width: 200,
                    readOnly: true,
                    value: Ext.util.Cookies.get('v_personname2')
                }]
            }]
        }]
    });

    var jDataZCbuttonPanel = Ext.create('Ext.panel.Panel', {
        id: 'jDataZCbuttonPanel',
        region: 'north',
        padding: '0 0 0 240',
        height: 30,
        style: 'margin-bottom:1px',
        frame: true,
        //autoScroll : true,
        style: 'background-color:#FFFFFF',
        baseCls: 'my-panel-no-border',
        items: [{
            xtype: 'button',
            text: '保存',
            margin: '8 0 5 40',
            style: 'padding-left:10px;padding-right:10px',
            icon: imgpath + '/saved.png',
            handler: function () {
                _insertDjDataZC('zc');
            }
        }, {
            xtype: 'button',
            text: '取消',
            margin: '8 0 5 10',
            icon: imgpath + '/cross.png',
            //style: 'margin-left:20px;padding-left:10px;padding-right:10px',
            handler: _close
        },]
    });

    var djDataZCWindow = Ext.create('Ext.window.Window', {
        id: 'djDataZCWindow',
        title: '正常描述录入',
        width: 480,
        height: 315,
        autoScroll: true,
        frame: true,
        style: 'background-color:#FFFFFF',
        //baseCls: 'my-panel-no-border',
        defaults: {
            labelAlign: 'right'
        },
        layout: {
            type: 'border'
        },
        //modal: true,
        closeAction: 'hide',
        items: [jDataZCbuttonPanel, djDataZCPanel]
    });

    var windowYc = Ext.create('Ext.window.Window', {
        id: 'windowYc',
        width: 200,
        height: 200,
        bodyPadding: 15,
        layout: 'vbox',
        title: '请选择',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        items: [{
            id: 'djTypeSelect',
            xtype: 'combo',
            store: DjTypeStore,
            editable: false,
            value: 'GW',
            displayField: 'displayField',
            valueField: 'valueField',
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px 0px',
            labelAlign: 'right',
            width: 150
        }],
        buttons: [{
            xtype: 'button',
            text: '确定',
            width: 40,
            handler: function () {
                _insertDjDataYC('yc');
            }
        }]
    });

    var djDataYCPanel = Ext.create('Ext.form.Panel', {
        id: 'djDataYCPanel',
        region: 'center',
        padding: '10px 0px 0px 0px',
        baseCls: 'my-panel-no-border',
        style: 'background-color:#FFFFFF',
        frame: true,
        autoScroll: true,
        //border:false,
        items: [{
            xtype: 'fieldset',
            height: 215,
            width: 440,
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
                    width: 500
                    //editable:false,
                },
                items: [{
                    xtype: 'datefield',
                    id: 'V_D_DATE_FX',
                    format: 'Y-m-d',
                    value: new Date(),
                    fieldLabel: '异常发现时间',
                    editable: false,
                    labelWidth: 90,
                    width: 200
                }, {
                    xtype: 'combo',
                    id: 'ychour',
                    store: hoursStore,
                    labelAlign: 'right',
                    labelWidth: 20,
                    width: 60,
                    value: today.getHours(),
                    format: 'H',
                    displayField: 'displayField',
                    valueField: 'valueField',
                    margin: '0px 0 0 10px',
                    queryMode: 'local',
                    editable: false
                }, {
                    xtype: 'combo',
                    id: 'ycminute',
                    store: minuteStore,
                    fieldLabel: '时',
                    labelAlign: 'right',
                    labelWidth: 20,
                    width: 80,
                    value: today.getMinutes(),
                    format: 'i',
                    margin: '0px 0 0 5px',
                    displayField: 'displayField',
                    valueField: 'valueField',
                    queryMode: 'local',
                    editable: false,
                    labelSeparator: ''
                }, {
                    xtype: 'displayfield',
                    fieldLabel: '分',
                    labelSeparator: '',
                    margin: '0px 0 0 5px',
                    labelWidth: 20,
                    width: 20
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 500
                },
                items: [{
                    xtype: 'textarea',
                    id: 'V_V_YCMS1',
                    fieldLabel: '异常现象描述',
                    width: 360,
                    height: 120,
                    labelWidth: 90
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 500
                },
                items: [{
                    id: 'V_V_PERNAME_FX1',
                    fieldLabel: '发现人',
                    labelWidth: 90,
                    width: 200,
                    readOnly: true,
                    value: Ext.util.Cookies.get('v_personname2')
                }]
            }]
        },]
    });

    var jDataYCbuttonPanel = Ext.create('Ext.panel.Panel', {
        id: 'jDataYCbuttonPanel',
        region: 'north',
        padding: '0 0 0 240',
        height: 30,
        style: 'margin-bottom:1px',
        frame: true,
        baseCls: 'my-panel-no-border',
        style: 'background-color:#FFFFFF',
        items: [{
            xtype: 'button',
            text: '保存',
            margin: '8 0 5 40',
            style: 'padding-left:10px;padding-right:10px',
            icon: imgpath + '/saved.png',
            handler: function () {
                _insertDjDataYC('yc');
                //_preChooseDjType();
                //_insertDjDataZC('yc');
            }
        }, {
            xtype: 'button',
            text: '取消',
            icon: imgpath + '/cross.png',
            margin: '8 0 5 10',
            //style: 'margin-left:20px;padding-left:10px;padding-right:10px',
            handler: _close
        },]
    });

    var djDataYCWindow = Ext.create('Ext.window.Window', {
        id: 'djDataYCWindow',
        title: '异常描述录入',
        width: 480,
        height: 310,
        frame: true,
        style: 'background-color:#FFFFFF',
        autoScroll: true,
        defaults: {
            labelAlign: 'right'
        },
        layout: {
            type: 'border'
        },
        modal: true,
        closeAction: 'hide',
        items: [jDataYCbuttonPanel, djDataYCPanel]
    });

    var rightPanel = Ext.create('Ext.panel.Panel', {
        layout: 'border',
        region: 'center',
        items: [topPanel, djDataCreatePanel]
    });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',//只能边界布局???
        items: [rightPanel]
    });
    _init();

});

function _init() {
    //if (orgLoad && equTypeLoad && deptLoad && equNameload && eTypeLoad) {
    //    orgLoad = false;
    //    equTypeLoad = false;
    //    deptLoad = false;
    //    equNameload = false;
    //    eTypeLoad = false;

    query();
    Ext.getBody().unmask();
    //}
}


function _selectDept(V_V_DEPTCODE) {
    var deptStore = Ext.data.StoreManager.lookup('deptStore');

    deptStore.proxy.extraParams = {
        'V_V_PERSONCODE': V_V_PERSONCODE,
        'V_V_DEPTCODE': V_V_DEPTCODE,
        'V_V_DEPTCODENEXT': '%',
        'V_V_DEPTTYPE': '主体作业区'
    };
    deptStore.currentPage = 1;
    deptStore.load();
}

function _preChooseDjType() {
    Ext.getCmp('windowYc').show();
}


function _djDataZCShow() {
    var records = Ext.getCmp('djDataCreatePanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    if(records.length > 1)
    {
        for(var i=0;i<records.length;i++){
            _insertDjDataZC('zc');
        }
    }
    if(records.length == 1)
    {
        Ext.getCmp('djDataZCWindow').show();
        Ext.getCmp('zchour').setValue(new Date().getHours());
        Ext.getCmp('zcminute').setValue(new Date().getMinutes());
        Ext.getCmp('V_V_YCMS').setValue(records[0].data.V_CRITERION_CONTENT);
    }
}

function _djDataYCShow() {
    var records = Ext.getCmp('djDataCreatePanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

    if(records.length > 1)
    {
        for(var i=0;i<records.length;i++){
            _insertDjDataYC('yc');
        }
    }

    if(records.length == 1)
    {
        Ext.getCmp('ychour').setValue(new Date().getHours());
        Ext.getCmp('ycminute').setValue(new Date().getMinutes());
        Ext.getCmp('V_V_YCMS1').setValue(records[0].data.V_CRITERION_CONTENT);
        Ext.getCmp('djDataYCWindow').show();
    }
}

function _insertDjDataZC(str) {
    var records = Ext.getCmp('djDataCreatePanel').getSelectionModel().getSelection();

    var V_STATE = '';
    var V_TIME = '';
    if (str == 'zc') {
        V_STATE = '0';
        V_TIME =  Ext.Date.format(new Date(),"Y-m-d H:i:s")+'';
    }else{
        V_STATE = '1';
        V_TIME =  Ext.Date.format(new Date(),"Y-m-d H:i:s")+'';
    }

    var i_err = 0;
    for (var i = 0; i < records.length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'hp/PM_06_DJ_DATA_UPSET',
            type: 'ajax',
            method: 'POST',
            params: {
                'V_V_GUID': records[i].data.V_GUID,
                'V_V_DJ_STATE': V_STATE,
                'V_V_DJ_DATE': V_TIME,
                'V_V_DJ_PER': Ext.util.Cookies.get('v_personcode'),
                'V_V_DJ_NR': records[i].data.V_CRITERION_CONTENT,//异常现象描述
                'V_V_DJ_TYPE':records[i].data.V_DJ_TYPE,
                'V_V_TIMER_GUID': V_TIMER_GUID
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);//后台返回的值
                if (data.success) {//成功，会传回true
                    i_err++;
                    if (i_err == records.length) {
                        Ext.MessageBox.alert('提示', '操作成功', callBack);
                        function callBack(id) {
                            query();
                            _close();
                        }
                        window.opener.location.href=window.opener.location.href;
                        window.close();
                    }
                } else {
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: data.V_CURSOR,
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
        });
    }
}

function _insertDjDataYC(str) {
    var records = Ext.getCmp('djDataCreatePanel').getSelectionModel().getSelection();

    var V_V_YCMS = Ext.getCmp('V_V_YCMS').getSubmitValue();
    var V_STATE = '';
    var V_TIME = '';
    if (str == 'zc') {
        V_STATE = '0';
        V_TIME =  Ext.Date.format(new Date(),"Y-m-d H:i:s")+'';
    }else{
        V_STATE = '1';
        V_TIME =  Ext.Date.format(new Date(),"Y-m-d H:i:s")+'';
    }

    Ext.MessageBox.show({
        title: '确认',
        msg: '您确定要生成缺陷吗？',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESION,
        fn: function (btn) {
            if (btn == 'yes') {
                var i_err = 0;
                for (var i = 0; i < records.length; i++) {
                    Ext.Ajax.request({
                        url: AppUrl + 'hp/PM_06_DJ_DATA_UPSET',
                        type: 'ajax',
                        method: 'POST',
                        params: {
                            'V_V_GUID': records[i].data.V_GUID,
                            'V_V_DJ_STATE': V_STATE,
                            'V_V_DJ_DATE': V_TIME,
                            'V_V_DJ_PER': Ext.util.Cookies.get('v_personcode'),
                            'V_V_DJ_NR': records[i].data.V_CRITERION_CONTENT,//异常现象描述
                            'V_V_DJ_TYPE':records[i].data.V_DJ_TYPE,
                            'V_V_TIMER_GUID': V_TIMER_GUID

                        },
                        success: function (response) {
                            var data = Ext.decode(response.responseText);//后台返回的值
                            if (data.success) {//成功，会传回true
                                i_err++;
                                if (i_err == records.length) {
                                    Ext.MessageBox.alert('提示', '操作成功');
                                    query();
                                    _close();
                                    window.opener.location.href=window.opener.location.href;
                                    window.close();
                                }
                            } else {
                                Ext.MessageBox.show({
                                    title: '错误',
                                    msg: data.V_CURSOR,
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
                    });
                }
            }
        }
    });
}

function _close() {
    Ext.getCmp('djDataZCWindow').hide();
    Ext.getCmp('djDataYCWindow').hide();
}

function detail(value, metaData, record, rowIndex, colIndex, store, view) {
    return '<a href="javascript:ondetail(\'' + record.data.V_GUID + '\')">详情</a>&nbsp;<input type="image" onclick="_djDataZCShow(\'' + record.data.V_GUID + '\',\'' + record.data.V_DJ_TYPE + '\',\'' + record.data.V_CRITERION_CONTENT + '\')" src="../../images/gif/saved.png">&nbsp;<input type="image" onclick="_djDataYCShow(\'' + record.data.V_GUID + '\',\'' + record.data.V_DJ_TYPE + '\',\'' + record.data.V_CRITERION_CONTENT + '\')" src="../../images/gif/tree_dnd_no.png">';
}

function ondetail(a) {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_060103/index.html?V_GUID=' + a, '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}


function query() {

    var djDataCreateStore = Ext.data.StoreManager.lookup('djDataCreateStore');
    djDataCreateStore.proxy.extraParams = {
        V_V_TIMER_GUID: V_TIMER_GUID,
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode')
    };
    djDataCreateStore.load();
    /* Ext.data.StoreManager.lookup('djDataCreateStore').load({
     params: {
     V_V_ORGCODE : Ext.getCmp('V_V_ORGCODE').getValue(),
     V_V_DEPTCODE : Ext.getCmp('V_V_DEPTCODE').getValue(),
     V_V_CK_EQUTYPECODE : Ext.getCmp('V_CK_EQUTYPECODE').getValue(),
     V_V_EQUTYPE : Ext.getCmp('equtype').getValue(),
     V_V_EQUCODE : Ext.getCmp('equname').getValue(),
     V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
     V_V_PAGE: Ext.getCmp('gpage').store.currentPage,
     V_V_PAGESIZE: Ext.getCmp('gpage').store.pageSize
     }
     });*/
}

function state(a, value, metaData) {
    if (a == '1') {
        return '是';
    }
    else {
        return '否';
    }
}

function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function OnButtonExcelClicked() {

    var ss = '%';
    document.location.href = AppUrl + 'hp/PM_06_EXCEL?V_V_ORGCODE=' + '0'//Ext.ComponentManager.get("V_V_ORGCODE").getValue()
    + '&V_V_DEPTCODE=' + '0'//Ext.ComponentManager.get("V_V_DEPTCODE").getValue()
    + '&V_V_CK_EQUTYPECODE=' + '0'//Ext.ComponentManager.get("V_CK_EQUTYPECODE").getValue()
    + '&V_V_EQUTYPE=' + '0'//Ext.ComponentManager.get("equtype").getValue()
    + '&V_V_EQUCODE=' + '0'//Ext.ComponentManager.get("equname").getValue()
    + '&V_V_PERSONCODE=' + Ext.util.Cookies.get('v_personcode');


}

function _djDataZCAll() {
    var records = Ext.getCmp('djDataCreatePanel').getSelectionModel().getSelection();//获取选中的数据
    if (records.length == 0) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择数据进行操作',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    ;

    for (var i = 0; i < records.length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'hp/PM_06_DJ_DATA_UPSET',
            type: 'ajax',
            method: 'POST',
            async : false,
            params: {
                'V_V_GUID': records[i].get('V_GUID'),
                'V_V_DJ_STATE': '0',
                'V_V_DJ_DATE': Ext.getCmp('allsj').getSubmitValue() + ' ' + Ext.getCmp('allhour').getValue() + ':' + Ext.getCmp('allminute').getValue() + ':00',
                'V_V_DJ_PER': Ext.util.Cookies.get('v_personcode'),
                'V_V_DJ_NR': records[i].get('V_CRITERION_CONTENT'),
                'V_V_DJ_TYPE': records[i].get('V_DJ_TYPE'),
                'V_V_TIMER_GUID': V_TIMER_GUID
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);
                if (data.success) {
                    if(i == records.length - 1){
                        Ext.MessageBox.alert('提示', '操作成功', callBack);
                        function callBack(id) {
                            query();
                        }

                    }
                } else {
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: data.message,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
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
    }
    window.opener.location.href=window.opener.location.href;
    window.close();

}

function _djDataYCAll() {
    var records = Ext.getCmp('djDataCreatePanel').getSelectionModel().getSelection();//获取选中的数据
    if (records.length == 0) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择数据进行操作',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    ;

    for (var i = 0; i < records.length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'hp/PM_06_DJ_DATA_UPSET',
            type: 'ajax',
            method: 'POST',
            async : false,
            params: {
                'V_V_GUID': records[i].get('V_GUID'),
                'V_V_DJ_STATE': '1',
                'V_V_DJ_DATE': Ext.getCmp('allsj').getSubmitValue() + ' ' + Ext.getCmp('allhour').getValue() + ':' + Ext.getCmp('allminute').getValue() + ':00',
                'V_V_DJ_PER': Ext.util.Cookies.get('v_personcode'),
                'V_V_DJ_NR': records[i].get('V_CRITERION_CONTENT'),
                'V_V_DJ_TYPE': records[i].get('V_DJ_TYPE'),
                'V_V_TIMER_GUID': V_TIMER_GUID
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);
                if (data.success) {
                    if(i == records.length - 1){
                        Ext.MessageBox.alert('提示', '操作成功', callBack);
                        function callBack(id) {
                            query();
                        }

                    }
                } else {
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: data.message,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
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
    }
    window.opener.location.href=window.opener.location.href;
    window.close();
}

window.onunload = function()
{
    window.opener.location.href=window.opener.location.href;
}