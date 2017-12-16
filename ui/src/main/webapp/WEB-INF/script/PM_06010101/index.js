var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');

var V_V_CKTYPE = '';
var V_EQUTYPECODE = '';
var V_EQUTYPENAME = '';
var V_V_DEPTCODE = '';
var V_V_ORGCODE = '';
var V_V_EQUNAME = '';
var V_V_EQU_SATAECHOOES = '';
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_V_CKTYPE == undefined) ? V_V_CKTYPE = '' : V_V_CKTYPE = parameters.V_V_CKTYPE;
    (parameters.V_EQUTYPECODE == undefined) ? V_EQUTYPECODE = '' : V_EQUTYPECODE = parameters.V_EQUTYPECODE;
    (parameters.V_EQUTYPENAME == undefined) ? V_EQUTYPENAME = '' : V_EQUTYPENAME = parameters.V_EQUTYPENAME;
    (parameters.V_V_DEPTCODE == undefined) ? V_V_DEPTCODE = '' : V_V_DEPTCODE = parameters.V_V_DEPTCODE;
    (parameters.V_V_ORGCODE == undefined) ? V_V_ORGCODE = '' : V_V_ORGCODE = parameters.V_V_ORGCODE;
    (parameters.V_V_EQUNAME == undefined) ? V_V_EQUNAME = '' : V_V_EQUNAME = parameters.V_V_EQUNAME;
}

var orgLoad = false;
var equTypeLoad = false;
var basedicLoad = false;
Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');

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
        autoScroll: true,
        //width:'100%',
        //height:'90%',
        padding: '10px 0px 0px 0px',
        baseCls: 'my-panel-no-border',
        style: 'background-color:#FFFFFF',
        frame: true,
        //border:false,
        items: [{
            xtype: 'fieldset',
            height: 450,
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
                    labelWidth: 90
                }, {
                    readOnly: true,
                    id: 'V_V_EQUTYPENAME',
                    fieldLabel: '设备类型',
                    allowBlank: false,
                    labelWidth: 90
                },]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'combo',
                    labelAlign: 'right',
                    width: 500,
                    editable: false
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
                    width: 500
                },
                items: [{
                    id: 'V_V_CRITERION_ITEM',
                    fieldLabel: '点检项目',
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
                    id: 'V_V_CRITERION_CONTENT',
                    fieldLabel: '点检内容',
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
                    id: 'V_V_CRITERION_CR',
                    fieldLabel: '点检标准',
                    labelWidth: 90
                }]
            }, {
                layout: 'column',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right'
                },
                items: [{
                    xtype: 'numberfield',
                    id: 'V_V_CRITERION_CYCLE',
                    labelWidth: 90,
                    width: 300,
                    nanText: "请输入有效数字",
                    value: 0,
                    minValue:0,
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
                    padding: '0px 0px 0px 20px',
                    labelWidth: 90,
                    editable: false,
                    width: 180
                },]
            }, {
                autoHeight: true,
                defaultType: 'checkbox',
                hideLabels: true,
                id: 'V_V_EQU_STATE',
                layout: 'hbox',
                defaults: {
                    flex: 1,
                    labelAlign: 'right',
                    padding: '0px 30px 0px 0px'
                },
                layout: 'column',
                //vertical: false,
                items: [{
                    //xtype:'checkbox',
                    fieldLabel:      '设备状态',
                    labelWidth: 90,
                    name:'V_V_EQU_STATE',
                    id: 'V_V_EQU_STATE1',
                    boxLabel: '运行',
                    inputValue: '1'
                    //checked: true
                }, {
                    //xtype:'checkbox',
                    id: 'V_V_EQU_STATE2',
                    name:'V_V_EQU_STATE',
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
                    padding: '0px 20px 0px 0px'
                },
                layout: 'column',
                items: [{
                    xtype:'checkboxfield',
                    id: 'V_V_CK_FUNCTION1',
                    fieldLabel: '点检方法',
                    labelWidth: 90,
                    boxLabel: '目视',
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }, {
                    xtype:'checkboxfield',
                    id: 'V_V_CK_FUNCTION2',
                    boxLabel: '手摸',
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }, {
                    xtype:'checkboxfield',
                    id: 'V_V_CK_FUNCTION3',
                    boxLabel: '听音',
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }, {
                    xtype:'checkboxfield',
                    id: 'V_V_CK_FUNCTION4',
                    boxLabel: '打击',
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }, {
                    xtype:'checkboxfield',
                    id: 'V_V_CK_FUNCTION5',
                    boxLabel: '嗅觉',
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }, {
                    xtype:'checkboxfield',
                    id: 'V_V_CK_FUNCTION6',
                    boxLabel: '精密',
                    name: 'V_V_CK_FUNCTION',
                    inputValue: '1'
                }, {
                    xtype:'checkboxfield',
                    id: 'V_V_CK_FUNCTION7',
                    boxLabel: '解体',
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
                    xtype: 'numberfield',
                    id: 'V_I_ORDER',
                    value: 0,
                    allowBlank: false,
                    fieldLabel: '排序',
                    nanText: "请输入有效数字",
                    labelWidth: 90
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
                    xtype:'checkboxfield',
                    id: 'V_I_FLAG',
                    fieldLabel: '启用',
                    labelWidth: 90,
                    boxLabel: '是/否',
                    name: 'V_I_FLAG',
                    checked:true,
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
                    xtype:'checkboxfield',
                    id: 'V_I_WEIGHT',
                    fieldLabel: '重点',
                    labelWidth: 90,
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
                    xtype:'checkboxfield',
                    id: 'V_I_YJ',
                    fieldLabel: '预警',
                    labelWidth: 90,
                    boxLabel: '是/否',
                    name: 'V_I_YJ',
                    inputValue: '1'
                }]
            }]
        }]
    });


    var buttonPanel = Ext.create('Ext.panel.Panel', {
        id: 'buttonPanel',
        region: 'center',
        padding: '0 0 0 360',
        //height: 30,
        style: 'margin-bottom:1px',
        frame: true,
        baseCls: 'my-panel-no-border',
        style: 'background-color:#FFFFFF',
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
        }]
    });

    Ext.create('Ext.container.Viewport', {
        id: "id",
        autoScroll: true,
        frame: true,
        style: 'background-color:#FFFFFF',
        layout: {
            type: 'border'/*,
            regionWeights: {
                west: -1,
                north: 1,
                south: 1,
                east: -1
            }*/
        },
        items: [inputPanel,buttonPanel]
    });

    _init();
});

function _init() {
    if (orgLoad && equTypeLoad && basedicLoad) {
        Ext.getCmp('V_V_CKTYPE').setValue('岗位点检标准');
        Ext.getCmp('V_V_EQUTYPENAME').setValue(V_EQUTYPENAME);

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
        url: AppUrl + 'hp/PM_06_DJ_CRITERION_SETN',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_V_ORGCODE': V_V_ORGCODE,
            'V_V_DEPTCODE': V_V_DEPTCODE,
            'V_V_CK_EQUTYPECODE': Ext.getCmp('V_V_CK_EQUTYPECODE').getSubmitValue(),
            'V_V_EQUTYPE': V_EQUTYPECODE ,
            'V_V_EQUCODE': V_V_EQUNAME,
            'V_V_CRITERION_CODE': '',
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
            'V_V_PLAN_STATE': '1',
            'V_I_FLAG': V_I_FLAG,
            'V_V_CKTYPE': V_V_CKTYPE,
            'V_I_WEIGHT': V_I_WEIGHT,
            'V_I_YJ': V_I_YJ,
            'V_V_INPER': Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                    if(data.RET=='success'){
                        window.opener._seltctCriterion(V_EQUTYPECODE);
                        window.close();
                    }else{
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
