var V_TIMER_GUID = "";
if (location.href.split('?')[1] != undefined) {
    V_TIMER_GUID = Ext.urlDecode(location.href.split('?')[1]).V_TIMER_GUID == null ? "" : Ext.urlDecode(location.href.split('?')[1]).V_TIMER_GUID;
}
var V_TIME = Ext.Date.format(new Date(), "Y-m-d H:i:s")
var today = new Date();

var Hours = [];
for (var i = 0; i <= 23; i++)Hours.push({displayField: i, valueField: i});

var Minutes = [];
for (var i = 0; i <= 59; i++)Minutes.push({displayField: i, valueField: i});


Ext.onReady(function () {

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

    var djDataCreateStore = Ext.create('Ext.data.Store', {
        storeId: 'djDataCreateStore',
        autoLoad: false,
        fields: ['V_DJ_TYPE', 'V_EQUNAME', 'V_CRITERION_CODE', 'V_CKTYPE', 'V_EQUTYPECODE', 'V_PERCODE_INPUT', 'V_PERNAME_INPUT', 'V_CRITERION_ITEM',
            'V_CRITERION_CONTENT', 'V_CRITERION_CR', 'V_CRITERION_CYCLE', 'V_CRITERION_CYCLETYPE', 'V_EQU_STATE1', 'V_EQU_STATE2', 'V_EQU_STATE3',
            'V_CK_FUNCTION1', 'V_CK_FUNCTION2', 'V_CK_FUNCTION3', 'V_CK_FUNCTION4', 'V_CK_FUNCTION5', 'V_CK_FUNCTION6', 'V_CK_FUNCTION7', 'V_CK_FUNCTION8', 'V_DJ_DATE', 'V_CK_EQUTYPECODE', 'V_GUID',
        'V_CKTYPENAME'],
        proxy: {
            url: AppUrl + 'hp/PM_06_DJ_CRITERION_DBDATA_SEL',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var topPanel = Ext.create('Ext.form.Panel', {
        region: 'north',
        titleAlign: 'center',
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
        }, {
            xtype: 'button',
            text: 'Excel导出',
            listeners: {click: OnButtonExcelClicked}
        }]
    });

    var djDataCreatePanel = Ext.create('Ext.grid.Panel', {
        id: 'djDataCreatePanel',
        store: djDataCreateStore,
        border: false,
        columnLines: true,
        titleAlign: 'center',
        region: 'center',
        selModel: {
            selType: 'checkboxmodel'
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
            text: '点检类型',
            dataIndex: 'V_CKTYPENAME',
            align: 'center',
            width: 200
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

    var djDataPanel = Ext.create('Ext.form.Panel', {
        id: 'djDataPanel',
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
                    id: 'hour',
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
                    id: 'minute',
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
                }, {xtype: 'hidden', id: 'djflag'}, {xtype: 'hidden', id: 'djguid'}, {xtype: 'hidden', id: 'djtype'}]
            }]
        }]
    });

    var jDatabuttonPanel = Ext.create('Ext.panel.Panel', {
        id: 'jDatabuttonPanel',
        region: 'north',
        padding: '0 0 0 240',
        height: 30,
        style: 'margin-bottom:1px',
        frame: true,
        style: 'background-color:#FFFFFF',
        baseCls: 'my-panel-no-border',
        items: [{
            xtype: 'button',
            text: '保存',
            margin: '8 0 5 40',
            style: 'padding-left:10px;padding-right:10px',
            icon: imgpath + '/saved.png',
            handler: function () {
                _insertDjData();
            }
        }, {
            xtype: 'button',
            text: '取消',
            margin: '8 0 5 10',
            icon: imgpath + '/cross.png',
            handler: _close
        }]
    });

    var djDataWindow = Ext.create('Ext.window.Window', {
        id: 'djDataWindow',
        width: 480,
        height: 315,
        autoScroll: true,
        frame: true,
        style: 'background-color:#FFFFFF',
        defaults: {
            labelAlign: 'right'
        },
        layout: {
            type: 'border'
        },
        closeAction: 'hide',
        items: [jDatabuttonPanel, djDataPanel]
    });


    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [topPanel, djDataCreatePanel]
    });

    query();
});

function query() {
    Ext.data.StoreManager.lookup('djDataCreateStore').load({
        params: {
            V_V_TIMER_GUID: V_TIMER_GUID,
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode')
        }
    });
}

function _djDataZCShow() {

    var records = Ext.getCmp('djDataCreatePanel').getSelectionModel().getSelection();

    if (records.length > 1) {
        var num = 0;
        for (var i = 0; i < records.length; i++) {
            Ext.Ajax.request({
                url: AppUrl + 'hp/PM_06_DJ_DATA_UPSET',
                type: 'ajax',
                method: 'POST',
                params: {
                    'V_V_GUID': records[i].data.V_GUID,
                    'V_V_DJ_STATE': '0',
                    'V_V_DJ_DATE': V_TIME,
                    'V_V_DJ_PER': Ext.util.Cookies.get('v_personcode'),
                    'V_V_DJ_NR': records[i].data.V_CRITERION_CONTENT,//异常现象描述
                    'V_V_DJ_TYPE': records[i].data.V_DJ_TYPE,
                    'V_V_TIMER_GUID': V_TIMER_GUID
                },
                success: function (response) {
                    var data = Ext.decode(response.responseText);//后台返回的值
                    if (data.RET == "success") {//成功，会传回true
                        num++;
                    } else {
                        alert("点检信息录入失败！")
                    }

                    if (num == records.length) {
                        query();
                        window.opener.tabreload();
                    }
                }
            });
        }

    } else if (records.length == 1) {
        Ext.getCmp('djDataWindow').setTitle("正常点检描述录入");
        Ext.getCmp('djflag').setValue('0');
        Ext.getCmp('djguid').setValue(records[0].data.V_GUID);
        Ext.getCmp('djtype').setValue(records[0].data.V_DJ_TYPE);

        Ext.getCmp('hour').setValue(new Date().getHours());
        Ext.getCmp('minute').setValue(new Date().getMinutes());
        Ext.getCmp('V_V_YCMS').setValue(records[0].data.V_CRITERION_CONTENT);
        Ext.getCmp('djDataWindow').show()
    } else if (records.length == 0) {
        alert("请选择一条数据进行点检！");
        return;
    }


}

function _djDataYCShow() {
    var records = Ext.getCmp('djDataCreatePanel').getSelectionModel().getSelection();

    if (records.length > 1) {

        var num = 0;

        for (var i = 0; i < records.length; i++) {
            Ext.Ajax.request({
                url: AppUrl + 'hp/PM_06_DJ_DATA_UPSET',
                type: 'ajax',
                method: 'POST',
                async: false,
                params: {
                    'V_V_GUID': records[i].data.V_GUID,
                    'V_V_DJ_STATE': '1',
                    'V_V_DJ_DATE': V_TIME,
                    'V_V_DJ_PER': Ext.util.Cookies.get('v_personcode'),
                    'V_V_DJ_NR': records[i].data.V_CRITERION_CONTENT,//异常现象描述
                    'V_V_DJ_TYPE': records[i].data.V_DJ_TYPE,
                    'V_V_TIMER_GUID': V_TIMER_GUID
                },
                success: function (response) {
                    var data = Ext.decode(response.responseText);//后台返回的值
                    if (data.RET == "success") {//成功，会传回true
                        num++;
                    } else {
                        alert("点检信息录入失败！")
                    }

                    if (num == records.length) {
                        query();
                        window.opener.tabreload();
                    }
                }
            });
        }

    } else if (records.length == 1) {
        Ext.getCmp('djDataWindow').setTitle("异常点检描述录入");
        Ext.getCmp('djflag').setValue('1');
        Ext.getCmp('djguid').setValue(records[0].data.V_GUID);
        Ext.getCmp('djtype').setValue(records[0].data.V_DJ_TYPE);

        Ext.getCmp('hour').setValue(new Date().getHours());
        Ext.getCmp('minute').setValue(new Date().getMinutes());
        Ext.getCmp('V_V_YCMS').setValue(records[0].data.V_CRITERION_CONTENT);
        Ext.getCmp('djDataWindow').show()
    } else if (records.length == 0) {
        alert("请选择一条数据进行点检！");
        return;
    }
}

function _insertDjData() {

    Ext.Ajax.request({
        url: AppUrl + 'hp/PM_06_DJ_DATA_UPSET',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_V_GUID': Ext.getCmp('djguid').getValue(),
            'V_V_DJ_STATE': Ext.getCmp('djflag').getValue(),
            'V_V_DJ_DATE': V_TIME,
            'V_V_DJ_PER': Ext.util.Cookies.get('v_personcode'),
            'V_V_DJ_NR': Ext.getCmp('V_V_YCMS').getValue(),//异常现象描述
            'V_V_DJ_TYPE': Ext.getCmp('djtype').getValue(),
            'V_V_TIMER_GUID': V_TIMER_GUID
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET == "success") {//成功，会传回true
                _close();
                query();
                window.opener.tabreload();
            } else {
                alert("点检信息录入失败！")
            }
        }
    });
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

function _close() {
    Ext.getCmp('djDataWindow').hide()
}


function detail(value, metaData, record, rowIndex, colIndex, store, view) {
    return '<input type="image" onclick="_djDataZCShow(\'' + record.data.V_GUID + '\',\'' + record.data.V_DJ_TYPE + '\',\'' +
        record.data.V_CRITERION_CONTENT + '\')" src="../../images/gif/saved.png">&nbsp;<input type="image" onclick="_djDataYCShow(\'' +
        record.data.V_GUID + '\',\'' + record.data.V_DJ_TYPE + '\',\'' +
        record.data.V_CRITERION_CONTENT + '\')" src="../../images/gif/tree_dnd_no.png">';
}

function state(a, value, metaData) {
    if (a == '1') {
        return '是';
    }
    else {
        return '否';
    }
}