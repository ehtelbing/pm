var V_V_CRITERION_CODE = '';
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_V_CRITERION_CODE == undefined) ? V_V_CRITERION_CODE = '' : V_V_CRITERION_CODE = parameters.V_V_CRITERION_CODE;
}

var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');

var criteion ;
var orgLoad = false;
var equTypeLoad = false;
var basedicLoad = false;
var criteionLoad = false;
Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');

    Ext.Ajax.request({
        url: AppUrl + 'PM_06/PM_06_DJ_CRITERION_GET',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_V_CRITERION_CODE': V_V_CRITERION_CODE
        },
        callback: function (options, success, response) {
            if (success) {
                var data = Ext.decode(response.responseText);
                if (data.success) {
                    criteion = data.list[0];
                }
                criteionLoad = true;
                _init();
            }
        }
    });


    var orgStore = Ext.create('Ext.data.Store', {
        id: 'orgStore',
        autoLoad: true,
        fields: ['V_MATERIALCODE', 'V_MATERIALNAME', 'I_PLANAMOUNT', 'I_ACTUALAMOUNT', 'I_WORKNUM'],
        proxy: {
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
        },
        listeners: {
            load: function (store, records) {
                orgLoad = true;
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
            },
            extraParams: {}
        },
        listeners: {
            load: function (store, records) {
                equTypeLoad = true;
                Ext.getCmp('V_V_CK_EQUTYPECODE').select(store.first());
                _init();
            }
        }
    });

    var basedicStore = Ext.create('Ext.data.Store', {
        id: 'basedicStore',
        autoLoad: true,
        fields: ['I_BASEID', 'V_EDIT_GUID', 'V_BASENAME', 'D_DATE_EDITTIME', 'V_BASEMEMO', 'V_BASETYPE', 'V_BASECODE', 'I_ORDERID'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_06/PRO_PM_BASEDIC_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'IS_V_BASETYPE': 'PM/WEEKTYPE'
            }
        },
        listeners: {
            load: function (store, records) {
                basedicLoad = true;
                Ext.getCmp('V_V_CRITERION_CYCLETYPE').select(store.first());
                _init();
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
                style: 'margin-top:12px',
            },
            items: [{
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 250,
                },
                items: [{
                    id: 'V_V_CKTYPE',
                    readOnly: true,
                    allowBlank: false,
                    fieldLabel: '点检分类',
                    labelWidth: 90,
                }, {
                    readOnly: true,
                    id: 'V_V_EQUTYPENAME',
                    fieldLabel: '设备类型',
                    allowBlank: false,
                    labelWidth: 90,
                },]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'combo',
                    labelAlign: 'right',
                    width: 500,
                    editable: false,
                },
                items: [{
                    xtype: 'combo',
                    id: 'V_V_CK_EQUTYPECODE',
                    store: equTypeStore,
                    queryMode: 'local',
                    valueField: 'V_CK_EQUTYPECODE',
                    displayField: 'V_CK_EQUTYPENAME',
                    forceSelection: true,
                    fieldLabel: '点检设备分类',
                    labelWidth: 90,
                    allowBlank: false
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 500,
                },
                items: [{
                    id: 'V_V_CRITERION_ITEM',
                    fieldLabel: '点检项目',
                    labelWidth: 90,
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 500,
                },
                items: [{
                    id: 'V_V_CRITERION_CONTENT',
                    fieldLabel: '点检内容',
                    labelWidth: 90,
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 500,
                },
                items: [{
                    id: 'V_V_CRITERION_CR',
                    fieldLabel: '点检标准',
                    labelWidth: 90,
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                },
                items: [{
                    xtype: 'numberfield',
                    id: 'V_V_CRITERION_CYCLE',
                    labelWidth: 90,
                    width: 300,
                    nanText: "请输入有效数字",
                    value: 0,
                    fieldLabel: '点检周期',
                    allowBlank: false
                }, {
                    xtype: 'combo',
                    id: 'V_V_CRITERION_CYCLETYPE',
                    store: basedicStore,
                    queryMode: 'local',
                    valueField: 'V_BASECODE',
                    displayField: 'V_BASENAME',
                    forceSelection: true,
                    allowBlank: false,
                    fieldLabel: '小时',
                    padding: '0px 0px 0px 20px',
                    labelWidth: 90,
                    allowBlank: false,
                    width: 180,
                },]
            }, {
                id: 'V_V_EQU_STATE',
                layout: 'hbox',
                defaults: {
                    xtype: 'radio',
                    baseCls: 'my-panel-no-border',
                    flex: 1,
                    labelAlign: 'right',
                    padding: '0px 30px 0px 0px'
                },
                layout: 'column',
                items: [{
                    fieldLabel: '设备状态',
                    labelWidth: 90,
                    name: 'V_V_EQU_STATE',
                    id: 'V_V_EQU_STATE1',
                    boxLabel: '运行',
                    inputValue: '1',
                }, {
                    id: 'V_V_EQU_STATE2',
                    name: 'V_V_EQU_STATE',
                    boxLabel: '停止',
                    inputValue: '1'
                }]
            }, {

                autoHeight: true,
                defaultType: 'checkbox',
                hideLabels: true,
                id: 'V_V_CK_FUNCTION',
                layout: 'hbox',
                defaults: {
                    flex: 1,
                    labelAlign: 'right',
                    padding: '0px 30px 0px 0px'
                },
                layout: 'column',
                items: [{
                    xtype: 'checkboxfield',
                    id: 'V_V_CK_FUNCTION1',
                    fieldLabel: '点检方法',
                    labelWidth: 90,
                    boxLabel: '目视',
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1',
                }, {
                    xtype: 'checkboxfield',
                    id: 'V_V_CK_FUNCTION2',
                    boxLabel: '手摸',
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }, {
                    xtype: 'checkboxfield',
                    id: 'V_V_CK_FUNCTION3',
                    boxLabel: '听音',
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }, {
                    xtype: 'checkboxfield',
                    id: 'V_V_CK_FUNCTION4',
                    boxLabel: '打击',
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }, {
                    xtype: 'checkboxfield',
                    id: 'V_V_CK_FUNCTION5',
                    boxLabel: '其它',
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 300,
                },
                items: [{
                    xtype: 'numberfield',
                    id: 'V_I_ORDER',
                    value: 0,
                    allowBlank: false,
                    fieldLabel: '排序',
                    nanText: "请输入有效数字",
                    labelWidth: 90,
                }]
            }, {
                autoHeight: true,
                defaultType: 'checkbox',
                hideLabels: true,
                id: 'xq3',
                layout: 'hbox',
                defaults: {
                    flex: 1,
                    labelAlign: 'right',
                },
                layout: 'column',
                items: [{
                    xtype: 'checkboxfield',
                    id: 'V_I_FLAG',
                    fieldLabel: '启用',
                    labelWidth: 90,
                    boxLabel: '是/否',
                    name: 'V_I_FLAG',
                    inputValue: '1',
                }]
            }, {
                autoHeight: true,
                defaultType: 'checkbox',
                hideLabels: true,
                id: 'xq4',
                layout: 'hbox',
                defaults: {
                    flex: 1,
                    labelAlign: 'right',
                },
                layout: 'column',
                items: [{
                    xtype: 'checkboxfield',
                    id: 'V_I_WEIGHT',
                    fieldLabel: '重点',
                    labelWidth: 90,
                    boxLabel: '是/否',
                    name: 'V_I_WEIGHT',
                    inputValue: '1',
                }]
            }, {
                autoHeight: true,
                defaultType: 'checkbox',
                hideLabels: true,
                id: 'xq5',
                layout: 'hbox',
                defaults: {
                    flex: 1,
                    labelAlign: 'right',
                },
                layout: 'column',
                items: [{
                    xtype: 'checkboxfield',
                    id: 'V_I_YJ',
                    fieldLabel: '预警',
                    labelWidth: 90,
                    boxLabel: '是/否',
                    name: 'V_I_YJ',
                    inputValue: '1',
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'combo',
                    labelAlign: 'right',
                    width: 500,
                    //editable:false,
                },
                items: [{
                    xtype: 'datefield',
                    id: 'V_D_CKDATE',
                    format: 'Y-m-d H:i:s',
                    submitFormat: 'Y-m-d H:i:s',
                    value: new Date(),
                    fieldLabel: '上次点检时间',
                    labelWidth: 90,
                }]
            },]
        },],
    });

    var buttonPanel = Ext.create('Ext.panel.Panel', {
        id: 'buttonPanel',
        region: 'north',
        padding: '0 0 0 360',
        height: 30,
        style: 'margin-bottom:1px',
        frame: true,
        baseCls: 'my-panel-no-border',
        items: [{
            xtype: 'button',
            text: '保存',
            margin: '8 0 5 50',
            style: 'padding-left:10px;padding-right:10px',
            handler: _insertPM06
        }, {
            xtype: 'button',
            text: '取消',
            style: 'margin-left:20px;padding-left:10px;padding-right:10px',
            handler: _close
        },]
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
            items: [inputPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [buttonPanel]
        }]
    });

    _init();
});

function _init() {
    if (orgLoad && equTypeLoad && basedicLoad && criteionLoad) {

        if (criteion.V_CKTYPE == 'GW') {
            Ext.getCmp('V_V_CKTYPE').setValue('岗位点检标准');
        }
        Ext.getCmp('V_V_EQUTYPENAME').setValue(criteion.V_EQUTYPENAME);
        Ext.getCmp('V_V_CK_EQUTYPECODE').setValue(criteion.V_CK_EQUTYPECODE);
        Ext.getCmp('V_V_CRITERION_ITEM').setValue(criteion.V_CRITERION_ITEM);
        Ext.getCmp('V_V_CRITERION_CONTENT').setValue(criteion.V_CRITERION_CONTENT);
        Ext.getCmp('V_V_CRITERION_CR').setValue(criteion.V_CRITERION_CR);
        Ext.getCmp('V_V_CRITERION_CYCLE').setValue(criteion.V_CRITERION_CYCLE);
        Ext.getCmp('V_V_CRITERION_CYCLETYPE').setValue(criteion.V_CRITERION_CYCLENAME);
        if (criteion.V_EQU_STATE1 == 1) {
            Ext.getCmp('V_V_EQU_STATE1').setValue(true);
        }
        if (criteion.V_EQU_STATE2 == 1) {
            Ext.getCmp('V_V_EQU_STATE2').setValue(true);
        }
        Ext.getCmp('V_V_CK_FUNCTION1').setValue(criteion.V_CK_FUNCTION1);
        Ext.getCmp('V_V_CK_FUNCTION2').setValue(criteion.V_CK_FUNCTION2);
        Ext.getCmp('V_V_CK_FUNCTION3').setValue(criteion.V_CK_FUNCTION3);
        Ext.getCmp('V_V_CK_FUNCTION4').setValue(criteion.V_CK_FUNCTION4);
        Ext.getCmp('V_V_CK_FUNCTION5').setValue(criteion.V_CK_FUNCTION5);

        if (criteion.I_FLAG == 1) {
            Ext.getCmp('V_I_FLAG').setValue(1);
        }
        if (criteion.I_WEIGHT == 1) {
            Ext.getCmp('V_I_WEIGHT').setValue(1);
        }
        if (criteion.I_YJ == 1) {
            Ext.getCmp('V_I_YJ').setValue(1);
        }
        var date = criteion.D_CKDATE.substring(0, 19);

        Ext.getCmp('V_D_CKDATE').setValue(new Date(date.replace(/-/g, "/")));

        console.log(Ext.getCmp('V_D_CKDATE'));
        Ext.getBody().unmask();
    }
}

function _insertPM06() {
    if (Ext.getCmp('V_V_CRITERION_CYCLE').getSubmitValue() == '' || Ext.getCmp('V_I_ORDER').getSubmitValue() == '') {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请录入这些必填项!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }

    var V_V_EQU_STATE1 = Ext.getCmp('V_V_EQU_STATE1').getSubmitValue();
    var V_V_EQU_STATE2 = Ext.getCmp('V_V_EQU_STATE2').getSubmitValue();
    var V_V_CK_FUNCTION1 = Ext.getCmp('V_V_CK_FUNCTION1').getSubmitValue();
    var V_V_CK_FUNCTION2 = Ext.getCmp('V_V_CK_FUNCTION2').getSubmitValue();
    var V_V_CK_FUNCTION3 = Ext.getCmp('V_V_CK_FUNCTION3').getSubmitValue();
    var V_V_CK_FUNCTION4 = Ext.getCmp('V_V_CK_FUNCTION4').getSubmitValue();
    var V_V_CK_FUNCTION5 = Ext.getCmp('V_V_CK_FUNCTION5').getSubmitValue();
    var V_I_FLAG = Ext.getCmp('V_I_FLAG').getSubmitValue();
    var V_I_WEIGHT = Ext.getCmp('V_I_WEIGHT').getSubmitValue();
    var V_I_YJ = Ext.getCmp('V_I_YJ').getSubmitValue();

    if (V_V_EQU_STATE1 == null) {
        V_V_EQU_STATE1 = 0;
    }
    if (V_V_EQU_STATE2 == null) {
        V_V_EQU_STATE2 = 0;
    }
    if (V_V_CK_FUNCTION1 == null) {
        V_V_CK_FUNCTION1 = 0;
    }
    if (V_V_CK_FUNCTION2 == null) {
        V_V_CK_FUNCTION2 = 0;
    }
    if (V_V_CK_FUNCTION3 == null) {
        V_V_CK_FUNCTION3 = 0;
    }
    if (V_V_CK_FUNCTION4 == null) {
        V_V_CK_FUNCTION4 = 0;
    }
    if (V_V_CK_FUNCTION5 == null) {
        V_V_CK_FUNCTION5 = 0;
    }
    if (V_I_FLAG == null) {
        V_I_FLAG = 0;
    }
    if (V_I_WEIGHT == null) {
        V_I_WEIGHT = 0;
    }
    if (V_I_YJ == null) {
        V_I_YJ = 0;
    }

    Ext.Ajax.request({
        url: AppUrl + 'PM_06/PM_06_DJ_CRITERION_SET',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_V_CRITERION_CODE': V_V_CRITERION_CODE,
            'V_V_CRITERION_ITEM': Ext.getCmp('V_V_CRITERION_ITEM').getSubmitValue(),
            'V_V_CRITERION_CONTENT': Ext.getCmp('V_V_CRITERION_CONTENT').getSubmitValue(),
            'V_V_CRITERION_CR': Ext.getCmp('V_V_CRITERION_CR').getSubmitValue(),
            'V_V_CRITERION_CYCLE': Ext.getCmp('V_V_CRITERION_CYCLE').getSubmitValue(),
            'V_V_CRITERION_CYCLETYPE': Ext.getCmp('V_V_CRITERION_CYCLETYPE').getSubmitValue(),
            'V_V_EQU_STATE1': V_V_EQU_STATE1,
            'V_V_EQU_STATE2': V_V_EQU_STATE2,
            'V_V_EQU_STATE3': 0,
            'V_V_CK_FUNCTION1': V_V_CK_FUNCTION1,
            'V_V_CK_FUNCTION2': V_V_CK_FUNCTION2,
            'V_V_CK_FUNCTION3': V_V_CK_FUNCTION3,
            'V_V_CK_FUNCTION4': V_V_CK_FUNCTION4,
            'V_V_CK_FUNCTION5': V_V_CK_FUNCTION5,
            'V_V_CK_FUNCTION6': V_V_CK_FUNCTION5,
            'V_V_CK_FUNCTION7': V_V_CK_FUNCTION5,
            'V_V_CK_FUNCTION8': V_V_CK_FUNCTION5,
            'V_V_DEPTCODE': criteion.V_DEPTCODE,
            'V_V_EQUTYPECODE': criteion.V_EQUTYPECODE,
            'V_I_ORDER': Ext.getCmp('V_I_ORDER').getSubmitValue(),
            'V_I_FLAG': V_I_FLAG,
            'V_V_CKTYPE': criteion.V_CKTYPE,
            'V_I_WEIGHT': V_I_WEIGHT,
            'V_V_CK_EQUTYPECODE': Ext.getCmp('V_V_CK_EQUTYPECODE').getSubmitValue(),
            'V_I_YJ': V_I_YJ,
            'V_D_CKDATE': Ext.getCmp('V_D_CKDATE').getSubmitValue()
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                if (window.dialogArguments) {
                    window.returnValue = data.RET;
                    if (data.RET == 'success') {
                        window.close();
                    } else {
                        Ext.MessageBox.show({
                            title: '错误',
                            msg: data.message,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });
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

function _close() {
    window.close();
}
