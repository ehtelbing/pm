var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var V_EQUTYPECODE;
var V_EQUTYPENAME;
var orgLoad = false;
var equTypeLoad = false;
var deptLoad = false;
var equNameload = false;
var eTypeLoad = false;

var today = new Date();

var Hours = [];
for (var i = 0; i <= 23; i++)Hours.push({displayField: i, valueField: i});

var Minutes = [];
for (var i = 0; i <= 59; i++)Minutes.push({displayField: i, valueField: i});

var DjType = [{displayField : '岗位点检',valueField: 'GW'},{displayField : '精密点检',valueField: 'JM'},{displayField : '专业点检',valueField: 'ZY'}];

//小时Store
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
//分钟Store
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
    async:true,
    doRequest: function(operation, callback, scope) {
        var writer  = this.getWriter(),
            request = this.buildRequest(operation);
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        Ext.apply(request, {
            async         : this.async,
            binary        : this.binary,
            headers       : this.headers,
            timeout       : this.timeout,
            scope         : this,
            callback      : this.createRequestCallback(request, operation, callback, scope),
            method        : this.getMethod(request),
            disableCaching: false
        });
        Ext.Ajax.request(request);
        return request;
    }
});

Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
    //点检类型Store
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

    //主表格Store
    var djDataCreateStore = Ext.create('Ext.data.Store', {
        storeId: 'djDataCreateStore',
        autoLoad: false,
        pageSize: 15,//测试好用
        fields: ['V_CRITERION_CODE', 'V_CKTYPE', 'V_EQUTYPECODE', 'V_PERCODE_INPUT',
            'V_EQUNAME','V_PERNAME_INPUT', 'V_CRITERION_ITEM', 'V_CRITERION_CONTENT',
            'V_CRITERION_CR', 'V_CRITERION_CYCLE', 'V_CRITERION_CYCLETYPE', 'V_EQU_STATE1',
            'V_EQU_STATE2', 'V_EQU_STATE3', 'V_CK_FUNCTION1', 'V_CK_FUNCTION2', 'V_CK_FUNCTION3',
            'V_CK_FUNCTION4', 'V_CK_FUNCTION5', 'V_CK_FUNCTION6', 'V_CK_FUNCTION7', 'V_CK_FUNCTION8',
            'V_DJ_DATE', 'V_CK_EQUTYPECODE','V_GUID','V_DJ_TYPE'],
        proxy: {
            url: AppUrl + 'PM_06/PM_06_DJ_CRITERION_DATA_SEL',
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
    //主页面按钮panel
    var topPanel = Ext.create('Ext.form.Panel', {
        region: 'north',
        id : 'topPanel',
        titleAlign : 'center',
        layout: 'column',
        border: false,
        frame: true,
        defaults: {
            labelAlign: 'right',
            margin: '5 0 5 5'
        },
        items: [{
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
            },{
                xtype: 'button',
                text: 'Excel导出',
                listeners: {click: OnButtonExcelClicked}
            }]
    });
    //主页面表格panel
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
            xtype : 'rownumberer',
            text : '序号',
            width : 40,
            align: 'center'
        },{
            text: '详情',
            align: 'center',
            renderer : detail
        },{
            text : '设备名称',
            width : 160,
            dataIndex: 'V_EQUNAME',
            align: 'center'
        },{
            text: '点检项目',
            dataIndex: 'V_CRITERION_ITEM',
            align: 'center',
            width : 150
        }, {
            text: '点检内容',
            dataIndex: 'V_CRITERION_CONTENT',
            align: 'center',
            width : 150
        }, {
            text: '点检标准',
            dataIndex: 'V_CRITERION_CR',
            align: 'center',
            width : 150
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
        }, {
            text: '设备状态',
            align: 'center',
            columns : [{
                text: '目视',
                dataIndex: 'V_CK_FUNCTION1',
                align: 'center',
                renderer : state,
                width : 80
            }, {
                text: '手摸',
                dataIndex: 'V_CK_FUNCTION2',
                align: 'center',
                renderer : state,
                width : 80
            }, {
                text: '听音',
                dataIndex: 'V_CK_FUNCTION3',
                align: 'center',
                renderer : state,
                width : 80
            }, {
                text: '打击',
                dataIndex: 'V_CK_FUNCTION4',
                align: 'center',
                renderer : state,
                width :80
            }, {
                text: '嗅觉',
                dataIndex: 'V_CK_FUNCTION5',
                align: 'center',
                renderer : state,
                width : 80
            }, {
                text: '精密',
                dataIndex: 'V_CK_FUNCTION6',
                align: 'center',
                renderer : state,
                width : 80
            },{
                text: '解体',
                dataIndex: 'V_CK_FUNCTION7',
                align: 'center',
                renderer : state,
                width : 80
            }]
        },{
            text: '重点',
            dataIndex: 'V_CK_FUNCTION7',
            align: 'center',
            renderer : state,
            width : 100
        }, {
            text: '预警',
            dataIndex: 'V_CK_FUNCTION8',
            align: 'center',
            renderer : state,
            width : 100
        }, {
            text: '点检设备分类',
            dataIndex: 'V_CK_EQUTYPECODE',
            align: 'center',
            width : 100
        }],
        bbar: [{
            id: 'gpage',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'djDataCreateStore'
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
    //录入描述panel
    var djDataZCPanel = Ext.create('Ext.form.Panel', {
        id: 'djDataZCPanel',
        region: 'center',
        autoScroll : true,
        padding: '10px 0px 0px 0px',
        baseCls: 'my-panel-no-border',
        style: 'background-color:#FFFFFF',
        frame: true,
        border:false,
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
                    editable : false,
                    labelWidth: 90,
                    width: 200
                },{
                    xtype : 'combo',
                    id : 'zchour',
                    store : hoursStore,
                    labelAlign : 'right',
                    labelWidth : 20,
                    width : 60,
                    value : today.getHours(),
                    format : 'H',
                    displayField: 'displayField',
                    valueField: 'valueField',
                    margin : '0px 0 0 10px',
                    queryMode: 'local',
                    editable: false
                },{
                    xtype : 'combo',
                    id : 'zcminute',
                    store : minuteStore,
                    fieldLabel : '时',
                    labelAlign : 'right',
                    labelWidth : 20,
                    width : 80,
                    value : today.getMinutes(),
                    format : 'i',
                    margin : '0px 0 0 5px',
                    displayField: 'displayField',
                    valueField: 'valueField',
                    queryMode: 'local',
                    editable: false,
                    labelSeparator : ''
                },{
                    xtype : 'displayfield',
                    fieldLabel : '分',
                    labelSeparator : '',
                    margin : '0px 0 0 5px',
                    labelWidth : 20,
                    width : 20
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
                    readOnly : true,
                    value : Ext.util.Cookies.get('v_personname2')
                }]
            }]
        }]
    });
    //正常录入描述按钮panel
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
    //正常录入描述window
    var djDataZCWindow = Ext.create('Ext.window.Window', {
        id: 'djDataZCWindow',
        title: '正常描述录入',
        width: 480,
        height: 315,
        autoScroll : true,
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
        items: [jDataZCbuttonPanel,djDataZCPanel]
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
            value:'GW',
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
    //发现异常弹出内容panel
    var djDataYCPanel = Ext.create('Ext.form.Panel', {
        id: 'djDataYCPanel',
        region: 'center',
        padding: '10px 0px 0px 0px',
        baseCls: 'my-panel-no-border',
        style: 'background-color:#FFFFFF',
        frame: true,
        autoScroll : true,
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
                    editable : false,
                    labelWidth: 90,
                    width : 200
                },{
                    xtype : 'combo',
                    id : 'ychour',
                    store : hoursStore,
                    labelAlign : 'right',
                    labelWidth : 20,
                    width : 60,
                    value : today.getHours(),
                    format : 'H',
                    displayField: 'displayField',
                    valueField: 'valueField',
                    margin : '0px 0 0 10px',
                    queryMode: 'local',
                    editable: false
                },{
                    xtype : 'combo',
                    id : 'ycminute',
                    store : minuteStore,
                    fieldLabel : '时',
                    labelAlign : 'right',
                    labelWidth : 20,
                    width : 80,
                    value : today.getMinutes(),
                    format : 'i',
                    margin : '0px 0 0 5px',
                    displayField: 'displayField',
                    valueField: 'valueField',
                    queryMode: 'local',
                    editable: false,
                    labelSeparator : ''
                },{
                    xtype : 'displayfield',
                    fieldLabel : '分',
                    labelSeparator : '',
                    margin : '0px 0 0 5px',
                    labelWidth : 20,
                    width : 20
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
                    width:200,
                    readOnly : true,
                    value : Ext.util.Cookies.get('v_personname2')
                }]
            }]
        },]
    });
    //发现异常弹出按钮panel
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
    //发现异常弹出Window
    var djDataYCWindow = Ext.create('Ext.window.Window', {
        id: 'djDataYCWindow',
        title: '异常描述录入',
        width: 480,
        height: 310,
        frame: true,
        style: 'background-color:#FFFFFF',
        autoScroll : true,
        defaults: {
            labelAlign: 'right'
        },
        layout: {
            type: 'border'
        },
        modal: true,
        closeAction: 'hide',
        items: [jDataYCbuttonPanel,djDataYCPanel]
    });

    var rightPanel = Ext.create('Ext.panel.Panel', {
        layout: 'border',
        region: 'center',
        items: [topPanel, djDataCreatePanel]
    });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',//只能边界布局???
        items: [ rightPanel]
    });
    _init();
    Ext.data.StoreManager.lookup('djDataCreateStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_V_ORGCODE : '%',//Ext.getCmp('V_V_ORGCODE').getValue(),
            V_V_DEPTCODE : '%',//Ext.getCmp('V_V_DEPTCODE').getValue(),
            V_V_CK_EQUTYPECODE : '%',//Ext.getCmp('V_CK_EQUTYPECODE').getValue(),
            V_V_EQUTYPE : '%',//Ext.getCmp('equtype').getValue(),
            V_V_EQUCODE : '%',//Ext.getCmp('equname').getValue(),
            V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
            V_V_PAGE: Ext.getCmp('gpage').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('gpage').store.pageSize
        }
    });

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

function _preChooseDjType(){
    Ext.getCmp('windowYc').show();
}

//正常按钮弹出函数
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
            /*Ext.getCmp('zchour').setValue(new Date().getHours());
            Ext.getCmp('zcminute').setValue(new Date().getMinutes());
            Ext.getCmp('V_V_YCMS').setValue(records[i].data.V_CRITERION_CONTENT);*/
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
//发现异常按钮弹出函数
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
            /*Ext.getCmp('zchour').setValue(new Date().getHours());
             Ext.getCmp('zcminute').setValue(new Date().getMinutes());
             Ext.getCmp('V_V_YCMS').setValue(records[i].data.V_CRITERION_CONTENT);*/
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
//正常确定调用函数
function _insertDjDataZC(str) {
    var records = Ext.getCmp('djDataCreatePanel').getSelectionModel().getSelection();

    //var V_V_YCMS = Ext.getCmp('V_V_YCMS').getSubmitValue();
    var V_STATE = '';
    var V_TIME = '';
    //var V_MS = '';
    if (str == 'zc') {
        V_STATE = '0';
        V_TIME =  Ext.Date.format(new Date(),"Y-m-d H:i:s")+'';
        //V_MS =  Ext.getCmp('V_V_YCMS').getValue();
    }else{
        V_STATE = '1';
        V_TIME =  Ext.Date.format(new Date(),"Y-m-d H:i:s")+'';
        //V_MS =  Ext.getCmp('V_V_YCMS1').getValue();
    }

    var i_err = 0;
    for (var i = 0; i < records.length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'PM_06/PM_06_DJ_DATA_SET',
            type: 'ajax',
            method: 'POST',
            params: {
                'V_V_GUID': records[i].data.V_GUID,
                'V_V_DJ_STATE': V_STATE,
                'V_V_DJ_DATE': V_TIME,
                'V_V_DJ_PER': Ext.util.Cookies.get('v_personcode'),
                'V_V_DJ_NR': Ext.getCmp('V_V_YCMS').getValue(),//异常现象描述
                'V_V_DJ_TYPE':records[i].data.V_DJ_TYPE
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);//后台返回的值
                if (data.success) {//成功，会传回true
                    i_err++;
                    if (i_err == records.length) {
                       // Ext.MessageBox.alert('提示', '操作成功', callBack);
                        callBack();
                        function callBack(id) {
                            query();
                            _close();
                        }
                    }
                } else {
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: data.V_CURSOR,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR,
                        fn: function (btn) {
                            _close();
                        }
                    });
                }
            },
            failure: function (response) {//访问到后台时执行的方法。
                Ext.MessageBox.show({
                    title: '错误',
                    msg: response.responseText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR,
                    fn: function (btn) {
                        _close();
                    }
                })
            }

        });
    }

}
//发现异常确定调用函数
function _insertDjDataYC(str) {
    var records = Ext.getCmp('djDataCreatePanel').getSelectionModel().getSelection();

    var V_V_YCMS = Ext.getCmp('V_V_YCMS').getSubmitValue();
    var V_STATE = '';
    var V_TIME = '';
    var V_MS = '';
    if (str == 'zc') {
        V_STATE = '0';
        V_TIME =  Ext.Date.format(new Date(),"Y-m-d H:i:s")+'';
        //V_MS =  Ext.getCmp('V_V_YCMS').getValue();
    }else{
        V_STATE = '1';
        V_TIME =  Ext.Date.format(new Date(),"Y-m-d H:i:s")+'';
        //V_MS =  Ext.getCmp('V_V_YCMS1').getValue();
    }

   /* Ext.MessageBox.show({
        title: '确认',
        msg: '您确定要生成缺陷吗？',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESION,
        fn: function (btn) {
            if (btn == 'yes') {*/
    var V_V_LOGREMARK='';
    var DJTYPE='';
    var i_err = 0;
    for (var i = 0; i < records.length; i++) {
        if(records[i].data.V_DJ_TYPE=='GW'){
            DJTYPE='岗位点检';
        }
        if(records[i].data.V_DJ_TYPE=='JM'){
            DJTYPE='精密点检';
        }
        if(records[i].data.V_DJ_TYPE=='ZY'){
            DJTYPE='专业点检';
        }
        Ext.Ajax.request({
            url: AppUrl + 'PM_06/PM_06_DJ_DATA_SET',
            type: 'ajax',
            async: false,
            method: 'POST',
            params: {
                'V_V_GUID': records[i].data.V_GUID,
                'V_V_DJ_STATE': V_STATE,
                'V_V_DJ_DATE': V_TIME,
                'V_V_DJ_PER': Ext.util.Cookies.get('v_personcode'),
                'V_V_DJ_NR': Ext.getCmp('V_V_YCMS1').getValue(),//异常现象描述
                'V_V_DJ_TYPE':records[i].data.V_DJ_TYPE
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);//后台返回的值
                if (data.success) {//成功，会传回true

                        // Ext.MessageBox.alert('提示', '操作成功', callBack);
                    callBack();
                    function callBack(id) {
                        query();
                        _close();
                    }


                } else {
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: data.V_CURSOR,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR,
                        fn: function (btn) {
                            _close();
                        }
                    });
                }
            },
            failure: function (response) {//访问到后台时执行的方法。
                Ext.MessageBox.show({
                    title: '错误',
                    msg: response.responseText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR,
                    fn: function (btn) {
                        _close();
                    }
                })
            }
        });



    }
           /* }
        }
    });*/
}

function _close() {
    Ext.getCmp('djDataZCWindow').hide();
    Ext.getCmp('djDataYCWindow').hide();
}

function detail(a,value,metaData){
    return '<a href="javascript:ondetail(\'' + metaData.data.V_GUID + '\')">详情</a>';
}

function ondetail(a){
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_060103/index.html?V_GUID=' + a , '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}


function query(){

    var djDataCreateStore = Ext.data.StoreManager.lookup('djDataCreateStore');
    djDataCreateStore.proxy.extraParams = {
        V_V_ORGCODE : '%',//Ext.getCmp('V_V_ORGCODE').getValue(),
        V_V_DEPTCODE : '%',//Ext.getCmp('V_V_DEPTCODE').getValue(),
        V_V_CK_EQUTYPECODE : '%',//Ext.getCmp('V_CK_EQUTYPECODE').getValue(),
        V_V_EQUTYPE : '%',//Ext.getCmp('equtype').getValue(),
        V_V_EQUCODE : '%',//Ext.getCmp('equname').getValue(),
        V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
        V_V_PAGE: Ext.getCmp('gpage').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('gpage').store.pageSize
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

function state(a,value,metaData){
    if(a == '1'){
        return '是';
    }
    else{
        return '否';
    }
}

function guid() {
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
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