var V_V_CRITERION_CODE = '';
var V_V_EQUTYPECODE = '';
var V_V_EQU_SATAECHOOES = '';
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_V_CRITERION_CODE == undefined) ? V_V_CRITERION_CODE = '' : V_V_CRITERION_CODE = parameters.V_V_CRITERION_CODE;
    (parameters.V_V_EQUTYPECODE == undefined) ? V_V_EQUTYPECODE = '' : V_V_EQUTYPECODE = parameters.V_V_EQUTYPECODE;
}

var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');

var criteion;
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
               // Ext.getCmp('V_V_CK_EQUTYPECODE').select(store.first());
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
               // Ext.getCmp('V_V_CRITERION_CYCLETYPE').select(store.first());
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
            height: 460,
            width: 580,
            style: 'margin-left:10px;',
            defaults: {
                frame: true,
                baseCls: 'my-panel-no-border',
                style: 'margin-top:12px'
            },
            items: [{
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 250
                },
                items: [{
                    id: 'V_V_CKTYPE',
                    readOnly: true,
                    allowBlank: false,
                    fieldLabel: '点检分类',
                    labelWidth: 80
                }, {
                    readOnly: true,
                    id: 'V_V_EQUTYPENAME',
                    fieldLabel: '设备类型',
                    allowBlank: false,
                    labelWidth: 80
                },]
            }, {
                layout: 'column',
                defaults: {
                    labelAlign: 'right',
                    width: 500,
                    editable: false
                },
                items: [{
                    xtype: 'textfield',
                    id: 'V_V_CK_EQUTYPECODE',
                    queryMode: 'local',
                    readOnly: true,
                    fieldLabel: '点检设备分类',
                    labelWidth: 80,
                    allowBlank: false
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 500
                },
                items: [{
                    id: 'V_V_CRITERION_ITEM',
                    fieldLabel: '点检项目',
                    readOnly: true,
                    labelWidth: 80
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 500
                },
                items: [{
                    id: 'V_V_CRITERION_CONTENT',
                    fieldLabel: '点检内容',
                    readOnly: true,
                    labelWidth: 80
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 500
                },
                items: [{
                    id: 'V_V_CRITERION_CR',
                    fieldLabel: '点检标准',
                    readOnly: true,
                    labelWidth: 80
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right'
                },
                items: [{
                    xtype: 'textfield',
                    id: 'V_V_CRITERION_CYCLE',
                    labelWidth: 80,
                    readOnly: true,
                    width: 300,
                    fieldLabel: '点检周期',
                    allowBlank: false
                }, {
                    xtype: 'textfield',
                    id: 'V_V_CRITERION_CYCLETYPE',
                    queryMode: 'local',
                    readOnly: true,
                    forceSelection: true,
                    allowBlank: false,
                    padding: '0px 0px 0px 20px',
                    labelWidth: 80,
                    width: 180
                },]
            }, {
                id: 'V_V_EQU_STATE',
                layout: 'hbox',
                defaults: {
                    xtype: 'checkbox',
                    baseCls: 'my-panel-no-border',
                    flex: 1,
                    labelAlign: 'right',
                    padding: '0px 20px 0px 0px'
                },
                layout: 'column',
                items: [{
                    fieldLabel: '设备状态',
                    labelWidth: 80,
                    name: 'V_V_EQU_STATE',
                    id: 'V_V_EQU_STATE1',
                    boxLabel: '运行',
                    readOnly: true,
                    inputValue: '1'
                }, {
                    id: 'V_V_EQU_STATE2',
                    name: 'V_V_EQU_STATE',
                    boxLabel: '停止',
                    readOnly: true,
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
                    padding: '0px 20px 0px 0px'
                },
                layout: 'column',
                items: [{
                    xtype: 'checkboxfield',
                    id: 'V_V_CK_FUNCTION1',
                    fieldLabel: '点检方法',
                    labelWidth: 80,
                    readOnly: true,
                    boxLabel: '目视',
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }, {
                    xtype: 'checkboxfield',
                    id: 'V_V_CK_FUNCTION2',
                    boxLabel: '手摸',
                    readOnly: true,
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }, {
                    xtype: 'checkboxfield',
                    id: 'V_V_CK_FUNCTION3',
                    boxLabel: '听音',
                    readOnly: true,
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }, {
                    xtype: 'checkboxfield',
                    id: 'V_V_CK_FUNCTION4',
                    boxLabel: '打击',
                    readOnly: true,
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }, {
                    xtype: 'checkboxfield',
                    id: 'V_V_CK_FUNCTION5',
                    boxLabel: '嗅觉',
                    readOnly: true,
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }, {
                    xtype: 'checkboxfield',
                    id: 'V_V_CK_FUNCTION6',
                    boxLabel: '精密',
                    readOnly: true,
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }, {
                    xtype: 'checkboxfield',
                    id: 'V_V_CK_FUNCTION7',
                    boxLabel: '解体',
                    readOnly: true,
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 300
                },
                items: [{
                    xtype: 'textfield',
                    id: 'V_I_ORDER',
                    allowBlank: false,
                    fieldLabel: '排序',
                    readOnly: true,
                    labelWidth: 80
                }]
            }, {
                autoHeight: true,
                defaultType: 'checkbox',
                hideLabels: true,
                id: 'xq3',
                layout: 'hbox',
                defaults: {
                    flex: 1,
                    labelAlign: 'right'
                },
                layout: 'column',
                items: [{
                    xtype: 'checkboxfield',
                    id: 'V_I_FLAG',
                    fieldLabel: '启用',
                    readOnly: true,
                    labelWidth: 80,
                    boxLabel: '是/否',
                    name: 'V_I_FLAG',
                    inputValue: '1'
                }]
            }, {
                autoHeight: true,
                defaultType: 'checkbox',
                hideLabels: true,
                id: 'xq4',
                layout: 'hbox',
                defaults: {
                    flex: 1,
                    labelAlign: 'right'
                },
                layout: 'column',
                items: [{
                    xtype: 'checkboxfield',
                    id: 'V_I_WEIGHT',
                    fieldLabel: '重点',
                    readOnly: true,
                    labelWidth: 80,
                    boxLabel: '是/否',
                    name: 'V_I_WEIGHT',
                    inputValue: '1'
                }]
            }, {
                autoHeight: true,
                defaultType: 'checkbox',
                hideLabels: true,
                id: 'xq5',
                layout: 'hbox',
                defaults: {
                    flex: 1,
                    labelAlign: 'right'
                },
                layout: 'column',
                items: [{
                    xtype: 'checkboxfield',
                    id: 'V_I_YJ',
                    fieldLabel: '预警',
                    readOnly: true,
                    labelWidth: 80,
                    boxLabel: '是/否',
                    name: 'V_I_YJ',
                    inputValue: '1'
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'combo',
                    labelAlign: 'right',
                    width: 500
                    //editable:false,
                },
                items: []
            }]
        }]
    });

    var buttonPanel = Ext.create('Ext.panel.Panel', {
        id: 'buttonPanel',
        region: 'north',
        padding: '0 0 0 500',
        height: 30,
        style: 'margin-bottom:1px',
        frame: true,
        baseCls: 'my-panel-no-border',
        items: [ {
            xtype: 'button',
            text: '关闭',
            style: 'margin-left:20px;padding-left:10px;padding-right:10px',
            handler: _close
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

        if (criteion.V_CKTYPE == 'defct01') {
            Ext.getCmp('V_V_CKTYPE').setValue('岗位点检标准');
        }
        Ext.getCmp('V_V_EQUTYPENAME').setValue(criteion.V_EQUTYPENAME);
        Ext.getCmp('V_V_CK_EQUTYPECODE').setValue(criteion.V_CK_EQUTYPECODE);
        Ext.getCmp('V_V_CRITERION_ITEM').setValue(criteion.V_CRITERION_ITEM);
        Ext.getCmp('V_V_CRITERION_CONTENT').setValue(criteion.V_CRITERION_CONTENT);
        Ext.getCmp('V_V_CRITERION_CR').setValue(criteion.V_CRITERION_CR);
        Ext.getCmp('V_V_CRITERION_CYCLE').setValue(criteion.V_CRITERION_CYCLE);
        Ext.getCmp('V_V_CRITERION_CYCLETYPE').setValue(criteion.V_CRITERION_CYCLETYPE);
        if (criteion.V_EQU_STATAE1 == 1) {
            Ext.getCmp('V_V_EQU_STATE1').setValue(true);
        }
        if (criteion.V_EQU_STATAE2 == 1) {
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
    var V_V_CK_FUNCTION6 = Ext.getCmp('V_V_CK_FUNCTION6').getSubmitValue();
    var V_V_CK_FUNCTION7 = Ext.getCmp('V_V_CK_FUNCTION7').getSubmitValue();
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
    if (V_V_CK_FUNCTION6 == null) {
        V_V_CK_FUNCTION6 = 0;
    }
    if (V_V_CK_FUNCTION7 == null) {
        V_V_CK_FUNCTION7 = 0;
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
            'V_V_ORGCODE': criteion.V_ORGCODE,
            'V_V_DEPTCODE': criteion.V_DEPTCODE,
            'V_V_CK_EQUTYPECODE': Ext.getCmp('V_V_CK_EQUTYPECODE').getSubmitValue(),
            'V_V_EQUTYPE': criteion.V_EQUTYPECODE ,
            'V_V_EQUCODE': criteion.V_EQUCODE,
            'V_V_CRITERION_CODE': V_V_CRITERION_CODE,
            'V_V_CRITERION_ITEM': Ext.getCmp('V_V_CRITERION_ITEM').getSubmitValue(),
            'V_V_CRITERION_CONTENT': Ext.getCmp('V_V_CRITERION_CONTENT').getSubmitValue(),
            'V_V_CRITERION_CR': Ext.getCmp('V_V_CRITERION_CR').getSubmitValue(),
            'V_V_CRITERION_CYCLE': Ext.getCmp('V_V_CRITERION_CYCLE').getSubmitValue(),
            'V_V_CRITERION_CYCLETYPE': Ext.getCmp('V_V_CRITERION_CYCLETYPE').getSubmitValue(),
            'V_V_EQU_STATE1': V_V_EQU_STATE1,
            'V_V_EQU_STATE2': V_V_EQU_STATE2,
            'V_V_CK_FUNCTION1': V_V_CK_FUNCTION1,
            'V_V_CK_FUNCTION2': V_V_CK_FUNCTION2,
            'V_V_CK_FUNCTION3': V_V_CK_FUNCTION3,
            'V_V_CK_FUNCTION4': V_V_CK_FUNCTION4,
            'V_V_CK_FUNCTION5': V_V_CK_FUNCTION5,
            'V_V_CK_FUNCTION6': V_V_CK_FUNCTION6,
            'V_V_CK_FUNCTION7': V_V_CK_FUNCTION7,
            'V_V_CK_FUNCTION8': '0',
            'V_I_ORDER': Ext.getCmp('V_I_ORDER').getSubmitValue(),
            'V_I_FLAG': V_I_FLAG,
            'V_V_CKTYPE': criteion.V_CKTYPE,
            'V_I_WEIGHT': V_I_WEIGHT,
            'V_I_YJ': V_I_YJ,
            'V_V_INPER': Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                    if (data.RET == 'success') {
                        window.opener._seltctCriterion(V_V_EQUTYPECODE);
                        window.close();
                    } else {
                        Ext.MessageBox.show({
                            title: '错误',
                            msg: data.RET,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: data.RET,
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
