var yearGuid = null;
var V_YEAR = "";
var V_MONTH = "";
var V_ORGCODE = "";
var V_DEPTCODE = "";
var MONTH = null;
var YEAR = null;
var V_MONTHPLAN_GUID = "";
var P_MONTH = "";
if (location.href.split('?')[1] != undefined) {
    MONTH = Ext.urlDecode(location.href.split('?')[1]).MainMONTH;
    YEAR = Ext.urlDecode(location.href.split('?')[1]).MainYEAR;
    V_MONTHPLAN_GUID = Ext.urlDecode(location.href.split('?')[1]).V_MONTHPLAN_GUID;
}


var V_JXMX_CODE = null;
var V_JXGX_CODE = null;
var V_PLANCODE = null;
var V_PLANTYPE = null;
var date = new Date();
var stopdate = null;
var starttime;
var V_MONTH = parseInt(MONTH) + 1;

starttime = YEAR + '-' + MONTH + '-' + "1";


//年份
var years = [];
for (var i = date.getFullYear() - 4; i <= date.getFullYear() + 1; i++) {
    years.push({displayField: i, valueField: i});
}
var yearStore = Ext.create("Ext.data.Store", {
    storeId: 'yearStore',
    fields: ['displayField', 'valueField'],
    data: years,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});
//月份
var months = [];
for (var i = 1; i <= 12; i++) {
    months.push({displayField: i, valueField: i});
}
var monthStore = Ext.create("Ext.data.Store", {
    storeId: 'monthStore',
    fields: ['displayField', 'valueField'],
    data: months,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});
//小时
var hours = [];
for (var i = 0; i < 24; i++) {
    if (i < 10) {
        i = '0' + i;
    } else {
        i = '' + i;
    }
    hours.push({displayField: i, valueField: i});
}
var hourStore = Ext.create("Ext.data.Store", {
    storeId: 'hourStore',
    fields: ['displayField', 'valueField'],
    data: hours,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});

//分钟
var minutes = [];
for (var i = 0; i < 60; i++) {
    if (i < 10) {
        i = '0' + i;
    } else {
        i = '' + i;
    }
    minutes.push({displayField: i, valueField: i});
}
var minuteStore = Ext.create("Ext.data.Store", {
    storeId: 'minuteStore',
    fields: ['displayField', 'valueField'],
    data: minutes,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});
//厂矿
var ckStore = Ext.create('Ext.data.Store', {
    autoLoad: true,
    storeId: 'ckStore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
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
            'V_V_DEPTCODENEXT': Ext.util.Cookies.get('v_deptcode'),
            'V_V_DEPTTYPE': '基层单位'
        }
    }
});
//作业区
var zyqStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'zyqStore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
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
    }
});
//专业
var zyStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'zyStore',
    fields: ['V_SPECIALTYCODE', 'V_BASENAME'],
    proxy: {
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
    }
});
//设备类型
var sblxStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'sblxStore',
    fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
    proxy: {
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
    }
});
//设备名称
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
    }
});
//施工方式
var sgfsStore = Ext.create("Ext.data.Store", {
    storeId: 'sgfsStore',
    fields: ['ID', 'V_BH', 'V_SGFS', 'V_LX'],
    autoLoad: true,
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PM_03_PLAN_SGFS_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var gxStore = Ext.create('Ext.data.Store', {
    id: 'gxStore',
    autoLoad: false,
    fields: ['OPERA_NAME', 'ID'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'dxfile/BASE_OPERATION_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'RET'
        }
    }
});

//---检修单位
var repairDeptStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'repairDeptStore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME', 'V_DEPTREPAIRCODE', 'V_DEPTREPAIRNAME',
        'I_ORDERID'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'zdh/fixdept_sel',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
Ext.onReady(function () {
    var editPanel = Ext.create('Ext.form.Panel', {
        id: 'editPanel',
        region: 'center',
        layout: 'border',
        frame: true,
        border: false,
        // width: '100%',
        autoScroll: true,
        style: 'background-color:rgba(255, 255, 255, 1);',
        baseCls: 'my-panel-no-border',
        items: [
            {
                xtype: 'panel',
                layout: 'vbox',
                region: 'center',
                defaults: {labelAlign: 'right'},
                frame: true,
                border: false,
                /*baseCls: 'my-panel-no-border',*/
                autoScroll: true,
                items: [
                    {
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                xtype: 'button',
                                text: '保存',
                                width: 60,
                                icon: imgpath + '/saved.png',
                                margin: '10px 0px 0px 90px',
                                handler: OnButtonSaveClick
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                xtype: 'combo',
                                id: 'year',
                                fieldLabel: '年份',
                                editable: false,
                                margin: '5 0 0 5',
                                labelWidth: 80,
                                width: 280,
                                displayField: 'displayField',
                                valueField: 'valueField',
                                value: '',
                                store: yearStore,
                                queryMode: 'local',
                                listeners: {
                                    select: function () {
                                        stopdate = Ext.getCmp('year').getValue() + '-' + Ext.getCmp('month').getValue() + '-' + 1;
                                        Ext.getCmp('jhtgdate').setValue(new Date(stopdate));
                                        Ext.getCmp('jhjgdate').setValue(new Date(stopdate));
                                        Ext.getCmp('jhtgdate').setMinValue(new Date(stopdate));
                                        Ext.getCmp('jhjgdate').setMinValue(new Date(stopdate));
                                    }
                                }
                            },
                            {
                                xtype: 'combo',
                                id: 'month',
                                fieldLabel: '月份',
                                editable: false,
                                margin: '5 0 0 5',
                                labelWidth: 70,
                                width: 255,
                                displayField: 'displayField',
                                valueField: 'valueField',
                                value: '',
                                store: monthStore,
                                queryMode: 'local',
                                listeners: {
                                    select: function () {
                                        stopdate = Ext.getCmp('year').getValue() + '-' + Ext.getCmp('month').getValue() + '-' + 1;
                                        Ext.getCmp('jhtgdate').setValue(new Date(stopdate));
                                        Ext.getCmp('jhjgdate').setValue(new Date(stopdate));
                                        Ext.getCmp('jhtgdate').setMinValue(new Date(stopdate));
                                        Ext.getCmp('jhjgdate').setMinValue(new Date(stopdate));
                                    }
                                }
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                xtype: 'combo',
                                id: 'ck',
                                fieldLabel: '计划厂矿',
                                editable: false,
                                margin: '5 0 0 5',
                                labelWidth: 80,
                                width: 280,
                                displayField: 'V_DEPTNAME',
                                valueField: 'V_DEPTCODE',
                                store: ckStore,
                                queryMode: 'local'
                            },
                            {
                                xtype: 'combo',
                                id: 'zyq',
                                fieldLabel: '作业区',
                                editable: false,
                                margin: '5 0 0 5',
                                labelWidth: 70,
                                width: 255,
                                displayField: 'V_DEPTNAME',
                                valueField: 'V_DEPTCODE',
                                store: zyqStore,
                                queryMode: 'local'
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [{
                            xtype: 'combo',
                            id: 'sblx',
                            fieldLabel: '设备类型',
                            margin: '5 0 0 5',
                            labelWidth: 80,
                            width: 280,
                            editable: false,
                            displayField: 'V_EQUTYPENAME',
                            valueField: 'V_EQUTYPECODE',
                            store: sblxStore,
                            queryMode: 'local'
                        },
                            {
                                xtype: 'combo',
                                id: 'sbmc',
                                fieldLabel: '设备名称',
                                editable: false,
                                margin: '5 0 0 5',
                                labelWidth: 70,
                                width: 255,
                                labelAlign: 'right',
                                displayField: 'V_EQUNAME',
                                valueField: 'V_EQUCODE',
                                store: sbmcStore,
                                queryMode: 'local'
                            }
                        ]
                    },

                    {
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                xtype: 'combo',
                                id: 'zy',
                                fieldLabel: '专业',
                                editable: false,
                                margin: '5 0 0 5',
                                labelWidth: 80,
                                width: 280,
                                displayField: 'V_BASENAME',
                                valueField: 'V_SPECIALTYCODE',
                                store: zyStore,
                                queryMode: 'local'
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                xtype: 'combo',
                                id: "sgfs",
                                store: sgfsStore,
                                editable: false,
                                queryMode: 'local',
                                fieldLabel: '施工方式',
                                hidden: true,
                                margin: '5 0 5 5',
                                displayField: 'V_SGFS',
                                valueField: 'V_BH',
                                labelWidth: 80,
                                width: 280,
                                labelAlign: 'right'
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [{
                            xtype: 'textarea',
                            id: 'maindefect',
                            fieldLabel: '主要缺陷',
                            allowBlank: false,
                            labelAlign: 'right',
                            margin: '5 0 0 5',
                            labelWidth: 80,
                            width: 545,
                            height: 44,
                            fieldStyle: 'background-color: #FFEFD5;border-color: #FFEFD5; background-image: none;'
                        },
                            {
                                xtype: 'button',
                                text: '+',
                                handler: choiceDef,
                                width: 25,
                                margin: '0px 0px 0px 5px'
                            }
                        ]
                    },
                    {
                        xtype: 'textarea',
                        id: 'jxnr',
                        fieldLabel: '检修内容',
                        labelAlign: 'right',
                        margin: '5 0 0 5',
                        labelWidth: 80,
                        allowBlank: false,
                        width: 550,
                        height: 44,
                        value: ''
                    },
                    {
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [

                            {
                                xtype: 'numberfield',
                                id: 'expectage',
                                fieldLabel: '预计寿命',
                                allowBlank: false,
                                labelAlign: 'right',
                                margin: '5 0 0 5',
                                labelWidth: 80,
                                width: 270,
                                minValue: 0,
                                value: 0
                            },
                            {
                                xtype: 'label',
                                id: 'yjsmdw',
                                text: '天',
                                margin: '8 2 0 5', width: 5
                            },
                            {
                                xtype: 'label',
                                text: '*',
                                width: 5,
                                margin: '9 0 0 2',
                                style: 'color:red'
                            },
                            {
                                xtype: 'numberfield',
                                id: 'repairper',
                                fieldLabel: '维修人数',
                                allowBlank: false,
                                labelAlign: 'right',
                                margin: '5 0 0 5',
                                labelWidth: 70,
                                width: 255,
                                minValue: 0,
                                value: 0
                            },
                            {
                                xtype: 'label',
                                text: '*',
                                width: 5,
                                margin: '9 0 0 2',
                                style: 'color:red'
                            }
                        ]
                    },

                    {
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                xtype: 'combo',
                                id: 'gx',
                                fieldLabel: '工序',
                                editable: false,
                                margin: '5 0 0 5',
                                labelWidth: 80,
                                width: 280,
                                displayField: 'OPERA_NAME',
                                valueField: 'OPERA_NAME',
                                value: '',
                                store: gxStore,
                                queryMode: 'local'
                            },
                            {
                                xtype: 'label',
                                text: '*',
                                width: 5,
                                margin: '9 0 0 2',
                                style: 'color:red'
                            }, {
                                xtype: 'checkboxfield',
                                boxLabel: '施工准备是否已落实',
                                id: 'iflag',
                                inputValue: 1,
                                uncheckedValue: 0,
                                margin: '5 0 5 30'
                            },
                            {
                                xtype: 'label',
                                text: '*',
                                width: 5,
                                margin: '9 0 0 2',
                                style: 'color:red'
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                xtype: 'datefield',
                                id: 'jhtgdate',
                                format: 'Y-m-d',
                                fieldLabel: '计划停工时间',
                                editable: false,
                                labelAlign: 'right',
                                margin: '5 0 0 5',
                                labelWidth: 80,
                                width: 280,
                                value: ''
                            },
                            {
                                xtype: 'combo',
                                id: 'jhtghour',
                                fieldLabel: '小时',
                                editable: false,
                                margin: '5 0 0 5',
                                labelWidth: 55,
                                width: 137,
                                value: '',
                                displayField: 'displayField',
                                valueField: 'valueField',
                                store: hourStore,
                                queryMode: 'local',
                                listeners: {
                                    select: function (field, newValue, oldValue) {
                                        var date1 = Ext.getCmp('jhtgdate').getSubmitValue() + " " + Ext.getCmp('jhtghour').getValue() + ":" + Ext.getCmp('jhtgminute').getValue() + ":00";
                                        var date11 = new Date(date1);
                                        var date2 = Ext.getCmp('jhjgdate').getSubmitValue() + " " + Ext.getCmp('jhjghour').getValue() + ":" + Ext.getCmp('jhjgminute').getValue() + ":00";
                                        var date22 = new Date(date2);


                                        var gongshicha = date22.getTime() - date11.getTime();
                                        var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                                        if (gongshicha2 >= 0) {
                                            _gongshiheji();
                                        }
                                    }
                                }
                            },
                            {
                                xtype: 'combo',
                                id: 'jhtgminute',
                                fieldLabel: '分钟',
                                editable: false,
                                margin: '5 0 0 5',
                                labelWidth: 30,
                                width: 112,
                                value: '',
                                displayField: 'displayField',
                                valueField: 'valueField',
                                store: minuteStore,
                                queryMode: 'local',
                                listeners: {
                                    select: function (field, newValue, oldValue) {
                                        var date1 = Ext.getCmp('jhtgdate').getSubmitValue() + " " + Ext.getCmp('jhtghour').getValue() + ":" + Ext.getCmp('jhtgminute').getValue() + ":00";
                                        var date11 = new Date(date1);
                                        var date2 = Ext.getCmp('jhjgdate').getSubmitValue() + " " + Ext.getCmp('jhjghour').getValue() + ":" + Ext.getCmp('jhjgminute').getValue() + ":00";
                                        var date22 = new Date(date2);


                                        var gongshicha = date22.getTime() - date11.getTime();
                                        var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                                        if (gongshicha2 >= 0) {
                                            _gongshiheji();
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                xtype: 'datefield',
                                id: 'jhjgdate',
                                format: 'Y-m-d',
                                fieldLabel: '计划竣工时间',
                                editable: false,
                                labelAlign: 'right',
                                margin: '5 0 0 5',
                                labelWidth: 80,
                                width: 280
                                // readOnly:true
                                , value: '',
                                listeners: {
                                    select: function () {
                                        var date1 = Ext.getCmp('jhtgdate').getSubmitValue() + " " + Ext.getCmp('jhtghour').getValue() + ":" + Ext.getCmp('jhtgminute').getValue() + ":00";
                                        var date11 = new Date(date1);
                                        var date2 = Ext.getCmp('jhjgdate').getSubmitValue() + " " + Ext.getCmp('jhjghour').getValue() + ":" + Ext.getCmp('jhjgminute').getValue() + ":00";
                                        var date22 = new Date(date2);


                                        var gongshicha = date22.getTime() - date11.getTime();
                                        var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                                        if (gongshicha2 >= 0) {
                                            _gongshiheji();
                                        }
                                    }
                                }
                            },
                            {
                                xtype: 'combo',
                                id: 'jhjghour',
                                fieldLabel: '小时',
                                editable: false,
                                margin: '5 0 0 5',
                                labelWidth: 55,
                                width: 137,
                                value: '0',
                                displayField: 'displayField',
                                valueField: 'valueField',
                                store: hourStore,
                                queryMode: 'local',
                                listeners: {
                                    select: function (field, newValue, oldValue) {
                                        var date1 = Ext.getCmp('jhtgdate').getSubmitValue() + " " + Ext.getCmp('jhtghour').getValue() + ":" + Ext.getCmp('jhtgminute').getValue() + ":00";
                                        var date11 = new Date(date1);
                                        var date2 = Ext.getCmp('jhjgdate').getSubmitValue() + " " + Ext.getCmp('jhjghour').getValue() + ":" + Ext.getCmp('jhjgminute').getValue() + ":00";
                                        var date22 = new Date(date2);


                                        var gongshicha = date22.getTime() - date11.getTime();
                                        var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                                        if (gongshicha2 >= 0) {
                                            _gongshiheji();
                                        }
                                    }
                                }
                            },
                            {
                                xtype: 'combo',
                                id: 'jhjgminute',
                                fieldLabel: '分钟',
                                editable: false,
                                margin: '5 0 0 5',
                                labelWidth: 30,
                                width: 112,
                                value: '0',
                                displayField: 'displayField',
                                valueField: 'valueField',
                                store: minuteStore,
                                queryMode: 'local',
                                listeners: {
                                    select: function (field, newValue, oldValue) {
                                        var date1 = Ext.getCmp('jhtgdate').getSubmitValue() + " " + Ext.getCmp('jhtghour').getValue() + ":" + Ext.getCmp('jhtgminute').getValue() + ":00";
                                        var date11 = new Date(date1);
                                        var date2 = Ext.getCmp('jhjgdate').getSubmitValue() + " " + Ext.getCmp('jhjghour').getValue() + ":" + Ext.getCmp('jhjgminute').getValue() + ":00";
                                        var date22 = new Date(date2);


                                        var gongshicha = date22.getTime() - date11.getTime();
                                        var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                                        if (gongshicha2 >= 0) {
                                            _gongshiheji();
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'jhgshj',
                                fieldLabel: '计划工时合计',
                                labelAlign: 'right',
                                margin: '5 0 0 5',
                                labelWidth: 80,
                                width: 280,
                                value: 0,
                                listeners: {
                                    select: function (field, newValue, oldValue) {
                                        var date1 = Ext.getCmp('jhtgdate').getSubmitValue() + " " + Ext.getCmp('jhtghour').getValue() + ":" + Ext.getCmp('jhtgminute').getValue() + ":00";
                                        var date11 = new Date(date1);
                                        var date2 = Ext.getCmp('jhjgdate').getSubmitValue() + " " + Ext.getCmp('jhjghour').getValue() + ":" + Ext.getCmp('jhjgminute').getValue() + ":00";
                                        var date22 = new Date(date2);


                                        var gongshicha = date22.getTime() - date11.getTime();
                                        var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                                        if (gongshicha2 >= 0) {
                                            _gongshiheji();
                                        } else {
                                            Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);

                                            function callBack(id) {
                                                Ext.getCmp('jhtgdate').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                                                Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                                Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                                Ext.getCmp('jhjgdate').setValue(new Date());       //编辑窗口计划竣工时间默认值
                                                Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                                Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                                Ext.getCmp('jhgshj').setValue(0);
                                                return;

                                            }

                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'textarea',
                        id: 'bz',
                        fieldLabel: '备注',
                        margin: '5 0 10 5',
                        labelWidth: 80,
                        width: 550,
                        height: 80,
                        value: ''
                    }
                ]
            }
        ]
    });
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [editPanel]
    });


    Ext.getCmp('jhjgdate').setMinValue(Ext.getCmp('jhtgdate').getSubmitValue());

    var modeWin = Ext.create("Ext.window.Window", {
        id: 'modeWin',
        closeAction: 'hide',
        title: '模型添加',
        width: 350,
        height: 100,
        // layout:'fit',
        layout: "column",
        items: [
            {
                xtype: 'textfield',
                id: 'modename',
                fieldLabel: '模型名称',
                labelAlign: 'right',
                allowBlank: false,
                margin: '5 0 0 5',
                labelWidth: 80,
                width: 280
            }, {
                xtype: 'button',
                margin: '5 0 0 5',
                text: '确定',
                id: 'okBtn',
                handler: onModeOKBtn
            }
        ]
    });

    Ext.data.StoreManager.lookup('sgfsStore').on('load', function () {
        Ext.getCmp('sgfs').select(Ext.data.StoreManager.lookup('sgfsStore').getAt(0));
    });

    Ext.data.StoreManager.lookup('ckStore').on('load', function () {
        Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });

    Ext.data.StoreManager.lookup('zyqStore').on('load', function () {
        Ext.getCmp('zyq').select( Ext.data.StoreManager.lookup('zyqStore').getAt(0));
        //加载专业
        Ext.data.StoreManager.lookup('zyStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue()
            }
        });
        //加载设备类型
        Ext.data.StoreManager.lookup('sblxStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
            }
        });
    });

    Ext.data.StoreManager.lookup('zyStore').on('load', function () {
        Ext.getCmp("zy").select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
    });

    Ext.data.StoreManager.lookup('sblxStore').on('load', function () {
        Ext.getCmp('sblx').select(Ext.data.StoreManager.lookup('sblxStore').getAt(0));
        /*Ext.data.StoreManager.lookup('sbmcStore').load({
            params: {
                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                v_v_deptcodenext: Ext.getCmp('zyq').getValue(),
                v_v_equtypecode: Ext.getCmp('sblx').getValue()
            }
        });*/
    });

    Ext.data.StoreManager.lookup('sbmcStore').on('load', function () {
        Ext.getCmp('sbmc').select(Ext.data.StoreManager.lookup('sbmcStore').getAt(0));
        loadData();
    })

    Ext.getCmp('ck').on('select', function () {
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });

    //作业区改变
    Ext.getCmp('zyq').on('select', function () {
        Ext.data.StoreManager.lookup('zyStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue()
            }
        });
        Ext.data.StoreManager.lookup('sblxStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
            }
        });
    });

    Ext.getCmp('sblx').on('change', function () {
        Ext.data.StoreManager.lookup('sbmcStore').load({
            params: {
                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                v_v_deptcodenext: Ext.getCmp('zyq').getValue(),
                v_v_equtypecode: Ext.getCmp('sblx').getValue()
            }
        });
    });

    //工序
    Ext.data.StoreManager.lookup('gxStore').load({
        params: {
            V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_DPPTCODE: Ext.util.Cookies.get('v_deptcode'),
            V_ORGCODE: Ext.util.Cookies.get('v_orgCode'),
            V_FLAG: '0'
        }
    });

    Ext.data.StoreManager.lookup('gxStore').on('load', function () {
        Ext.getCmp('gx').select( Ext.data.StoreManager.lookup('gxStore').getAt(0));
    })

});

function loadData() {
    Ext.Ajax.request({
        url: AppUrl + 'PM_03/PRO_PM_03_PLAN_MONTH_GET',
        method: 'POST',
        async: false,
        params: {
            V_V_MONTHPLAN_GUID: V_MONTHPLAN_GUID
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.list.length == 1) {
                V_JXGX_CODE = resp.list[0].V_JXGX_CODE;      //检修工序编码
                V_JXMX_CODE = resp.list[0].V_JXMX_CODE;      //检修模型编码
                var V_YEARPLAN_CODE = resp.list[0].V_YEARPLAN_CODE; //年计划编码
                var V_QUARTERPLAN_CODE = resp.list[0].V_QUARTERPLAN_CODE;//季度计划编码
                var V_STARTTIME = resp.list[0].V_STARTTIME;     //开始时间
                var V_STARTTIME_DATE = V_STARTTIME.split(" ")[0];
                var V_STARTTIME_HOUR = V_STARTTIME.split(" ")[1].split(":")[0];
                var V_STARTTIME_MINUTE = V_STARTTIME.split(" ")[1].split(":")[1];
                var V_ENDTIME = resp.list[0].V_ENDTIME;         //结束时间
                var V_ENDTIME_DATE = V_ENDTIME.split(" ")[0];
                var V_ENDTIME_HOUR = V_ENDTIME.split(" ")[1].split(":")[0];
                var V_ENDTIME_MINUTE = V_ENDTIME.split(" ")[1].split(":")[1];

                Ext.getCmp('ck').select(resp.list[0].V_ORGCODE);
                Ext.getCmp('zyq').select(resp.list[0].V_DEPTCODE);
                Ext.getCmp('zy').select(resp.list[0].V_REPAIRMAJOR_CODE);
                Ext.getCmp('gx').select(resp.list[0].V_OPERANAME);
                Ext.getCmp('sblx').select(resp.list[0].V_EQUTYPECODE);
                Ext.getCmp('sbmc').select(resp.list[0].V_EQUCODE);

                Ext.getCmp('year').select(resp.list[0].V_YEAR); //年
                Ext.getCmp('month').select(resp.list[0].V_MONTH);  //月
                Ext.getCmp('jxnr').setValue(resp.list[0].V_CONTENT);  //检修内容
                Ext.getCmp('jhtgdate').setValue(V_STARTTIME_DATE);  //停工时间
                Ext.getCmp('jhtghour').select(V_STARTTIME_HOUR);  //停工时间小时
                Ext.getCmp('jhtgminute').select(V_STARTTIME_MINUTE);  //停工时间分钟
                Ext.getCmp('jhjgdate').setValue(V_ENDTIME_DATE);  //竣工时间
                Ext.getCmp('jhjghour').select(V_ENDTIME_HOUR);  //竣工时间小时
                Ext.getCmp('jhjgminute').select(V_ENDTIME_MINUTE);  //竣工时间分钟
                Ext.getCmp('jhgshj').setValue(resp.list[0].V_HOUR);  //竣工时间分钟
                Ext.getCmp('bz').setValue(resp.list[0].V_BZ);  //竣工时间分钟
                Ext.getCmp('maindefect').setValue(resp.list[0].V_MAIN_DEFECT);
                Ext.getCmp('maindefect').setReadOnly(true);  //主要缺陷
                Ext.getCmp('expectage').setValue(resp.list[0].V_EXPECT_AGE);  //预计寿命
                Ext.getCmp('repairper').setValue(resp.list[0].V_REPAIR_PER);  //维修人数
                Ext.getCmp('sgfs').select(resp.list[0].V_SGWAY);  //--实施方式
                Ext.getCmp('iflag').setValue(resp.list[0].V_FLAG);
                if (V_YEARPLAN_CODE != '') {
                    V_PLANCODE = V_YEARPLAN_CODE;
                    V_PLANTYPE = 'YEAR';
                } else if (V_QUARTERPLAN_CODE != '') {
                    V_PLANCODE = V_QUARTERPLAN_CODE;
                    V_PLANTYPE = 'QUARTER';
                }
                Ext.getCmp('gx').select();//工序


            }
        }
    });


}

function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function jhSelect() {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_03010217/index.html?V_V_YEAR=' + Ext.getCmp('year').getValue()
        + '&V_V_ORGCODE=' + Ext.getCmp('ck').getValue()
        + '&V_V_DEPTCODE=' + Ext.getCmp('zyq').getValue()
        + '&V_V_EQUTYPE=' + Ext.getCmp('sblx').getValue()
        + '&V_V_EQUCODE=' + Ext.getCmp('sbmc').getValue()
        + '&V_V_ZY=' + Ext.getCmp('zy').getValue()
        + '&V_V_JXNR=' + Ext.getCmp('jxnr').getValue()
        , '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}

function mxSelect() {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_03010212/index.html?V_ORGCODE=' + Ext.getCmp('ck').getValue()
        + '&V_DEPTCODE=' + Ext.getCmp('zyq').getValue()
        + '&V_EQUTYPE=' + Ext.getCmp('sblx').getValue()
        + '&V_EQUCODE=' + Ext.getCmp('sbmc').getValue(), '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}

function OnButtonSaveClick() {
    if (Ext.getCmp('month').getValue() != MONTH) {
        msgShow();
    }
    else {
        OnButtonSaveDate();
    }
}

function OnButtonSaveDate() {

    if (Ext.getCmp('repairper').getValue() == "0") {
        Ext.Msg.alert('消息', '维修人数不可为0，请选择相关信息');
        return;
    }

    if (Ext.getCmp('gx').getValue() == "") {
        Ext.Msg.alert('消息', '请选择工序');
        return false;
    }

    //计划停工时间
    var jhtghour = Ext.getCmp('jhtghour').getValue();
    var jhtgminute = Ext.getCmp('jhtgminute').getValue();
    var jhtgTime = Ext.Date.format(Ext.ComponentManager.get("jhtgdate").getValue(), 'Y-m-d') + " " + jhtghour + ":" + jhtgminute + ':00';
    //计划竣工时间
    var jhjghour = Ext.getCmp('jhjghour').getValue();
    var jhjgminute = Ext.getCmp('jhjgminute').getValue();
    var jhjgTime = Ext.Date.format(Ext.ComponentManager.get("jhjgdate").getValue(), 'Y-m-d') + " " + jhjghour + ":" + jhjgminute + ':00';
    if (jhtgTime > jhjgTime) {
        Ext.Msg.alert('消息', '竣工时间不可以大于停工时间');
        return;
    }
    //计划类型（年/季度）
    var V_YEARPLAN_CODE = "";
    var V_QUARTERPLAN_CODE = "";
    if (V_PLANTYPE == 'YEAR') {
        V_YEARPLAN_CODE = V_PLANCODE;
    } else if (V_PLANTYPE == 'QUARTER') {
        V_QUARTERPLAN_CODE = V_PLANCODE;
    }

    //修改为关联年计划的缺陷状态
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/YEAR_TO_MONTH_UPDATE2',
        method: 'POST',
        async: false,
        params: {
            V_YEARGUID: yearGuid,
            V_MONTHGUID: V_MONTHPLAN_GUID,
            V_DEFECTGUID: '',
            V_PER_CODE: Ext.util.Cookies.get('v_personcode')
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.RET != undefined) {

            }
        }
    });
    // 其他缺陷状态修改
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PM_MONTH_OTHERDEL_STATCH',
        method: 'POST',
        async: false,
        params: {
            V_MONTHGUID: V_MONTHPLAN_GUID
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.RET == 'SUCCESS') {

            }
        }
    });


    //模型
    V_JXMX_CODE = guid();
    //保存
    Ext.Ajax.request({
        url: AppUrl + 'basic/PRO_PM_03_PLAN_MONTH_SET',
        method: 'POST',
        params: {
            V_V_INPER: Ext.util.Cookies.get('v_personcode'),               //人员cookies                                    //人员编码
            V_V_GUID: V_MONTHPLAN_GUID == '0' ? '%' : V_MONTHPLAN_GUID,                         //月度计划guid                                                      //计划GUID
            V_V_YEAR: Ext.getCmp('year').getValue(),                        //年份                                            //年份
            V_V_MONTH: Ext.getCmp('month').getValue(),                     //月份                                           //年份
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),                        //厂矿                                              //厂矿
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),                      //作业区
            V_V_EQUTYPECODE: Ext.getCmp('sblx').getValue(),                  //设备类型                                              //设备类型编码
            V_V_EQUCODE: Ext.getCmp('sbmc').getValue(),                     //设备名称
            V_V_REPAIRMAJOR_CODE: Ext.getCmp('zy').getValue(),              //检修专业
            V_V_CONTENT: Ext.getCmp('jxnr').getValue(),                     //检修内容
            V_V_STARTTIME: jhtgTime,                                       //开始时间
            V_V_ENDTIME: jhjgTime,                                          //结束时间
            V_V_OTHERPLAN_GUID: yearGuid, // '',//V_JXGX_CODE,                                  //检修工序编码
            V_V_OTHERPLAN_TYPE: 'YEAR', //'',//V_JXMX_CODE,                                  //检修模型编码
            V_V_JHMX_GUID: '',                                          //检修标准
            V_V_HOUR: Ext.getCmp('jhgshj').getValue(),
            V_V_BZ: Ext.getCmp('bz').getValue(),
            V_V_MAIN_DEFECT: Ext.getCmp('maindefect').getValue(),//主要缺陷
            V_V_EXPECT_AGE: Ext.getCmp('expectage').getValue(),//预计寿命
            V_V_REPAIR_PER: Ext.getCmp('repairper').getValue(), //维修人数
            V_V_SGWAY: Ext.getCmp('sgfs').getValue(),  //施工方式
            V_V_SGWAYNAME: Ext.getCmp('sgfs').getDisplayValue(),  //施工方式名称
            V_V_FLAG: Ext.getCmp('iflag').getValue() == false ? Ext.getCmp('iflag').uncheckedValue : Ext.getCmp('iflag').inputValue,//施工准备是否已落实 (1)是 (0)否
            V_V_OPERANAME: Ext.getCmp('gx').getValue()
        },
        success: function (ret) {
            var resp = Ext.decode(ret.responseText);
            if (resp.V_INFO == '成功') {
                window.opener.query();
                window.close();
            } else {
                Ext.Msg.alert('操作信息', resp.V_INFO);
            }

        }
    });
}

function OnButtonCancelClick() {
    window.opener.query();
    window.close();
}

function _gongshiheji() {
    var date1 = Ext.getCmp('jhtgdate').getSubmitValue() + " " + Ext.getCmp('jhtghour').getValue() + ":" + Ext.getCmp('jhtgminute').getValue() + ":00";
    var date11 = new Date(date1);
    var date2 = Ext.getCmp('jhjgdate').getSubmitValue() + " " + Ext.getCmp('jhjghour').getValue() + ":" + Ext.getCmp('jhjgminute').getValue() + ":00";
    var date22 = new Date(date2);


    var gongshicha = date22.getTime() - date11.getTime();
    var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
    Ext.getCmp('jhgshj').setValue(gongshicha2);

}

//计划模型保存
function OnModelSaveClick() {
    if (Ext.getCmp('sblx').getValue() == "%" && Ext.getCmp('sbmc').getValue() == "%") {
        Ext.Msg.alert('消息', '设备类型和设备名称不可以为全部，请选择相关名称');
        return;
    }

    if (Ext.getCmp('expectage').getValue() == "0") {
        Ext.Msg.alert('消息', '预计寿命不可为0，请选择相关信息');
        return;
    }
    if (Ext.getCmp('repairper').getValue() == "0") {
        Ext.Msg.alert('消息', '维修人数不可为0，请选择相关信息');
        return;
    }
    if (Ext.getCmp('maindefect').getValue() == "") {
        Ext.Msg.alert('消息', '主要缺陷不可为空，请输入后保存');
        return;
    }
    if (Ext.getCmp('jxnr').getValue() == "") {
        Ext.Msg.alert('消息', '检修内容不可为空，请输入后保存');
        return;
    }
    if (Ext.getCmp('zy').getValue() == "") {
        Ext.Msg.alert('消息', '专业不可为空，请选择相关信息');
        return;
    }
    Ext.getCmp('modeWin').show();

}

function onModeOKBtn() {
    if (Ext.getCmp('modename').getValue() == "") {
        Ext.Msg.alert('消息', '模型名称不可为空');
        return;
    }
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PM_1921_PLAN_IN_MX_SET',
        method: 'POST',
        async: false,
        params: {
            V_V_MX_NAME: Ext.getCmp('modename').getValue(),  //模型名称
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),  //单位名称
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),  //作业区
            V_V_SPECIALTY: Ext.getCmp('zy').getValue(),  //专业
            V_V_MENO: Ext.getCmp('bz').getValue(),  // 备注
            V_V_INPER: Ext.util.Cookies.get('v_personcode'),  //录入人

            V_V_EQUTYPE: Ext.getCmp('sblx').getValue(),  //设备类型
            V_V_EQUCODE: Ext.getCmp('sbmc').getValue(),  //设备名称
            V_V_CONTEXT: Ext.getCmp('jxnr').getValue(),  //检修内容
            V_V_JXMX_CODE: "",  //检修模型
            V_V_PERNUM: Ext.getCmp('repairper').getValue(),  //维修人数
            V_V_LIFELONG: Ext.getCmp('expectage').getValue(), //预计寿命

            V_V_MAIN_DEFECT: Ext.getCmp('maindefect').getValue(), //主要缺陷
            V_V_SGWAY: Ext.getCmp('sgfs').getValue()  //施工方式

        },
        success: function (ret) {
            var resp = Ext.decode(ret.responseText);
            if (resp.RET == "SUCCESSEQU") {
                Ext.MessageBox.alert('提示', '模型保存成功');
            }
            else if (resp.RET == "FAILEQU") {
                Ext.MessageBox.alert('提示', '模型设备保存失败');
            }
            else if (resp.RET == "FAIL") {
                Ext.MessageBox.alert('提示', '模型保存失败');
            }
            Ext.getCmp('modeWin').hide();
        }
    });
}

function msgShow() {
    Ext.Msg.show({
        title: '消息提示',
        id: 'choice',
        msg: '当前月份的计划，不可上报，是否修改月份',
        buttons: Ext.Msg.OKCANCEL,
        buttonText: {ok: '确认', cancel: '取消'},
        fn: function (btn, text) {
            if (btn === 'ok') {

                return false;
            }
            else {
                OnButtonSaveDate();
            }
        }
    });
}

function OnButtonUpdateClick() {
    // retEditWDate(WEEKGUID);
    Ext.getCmp('maindefect').setReadOnly(false);
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PM_MONTH_DEL_CHVALUE',
        method: 'POST',
        async: false,
        params: {
            V_MONTHGUID: V_MONTHPLAN_GUID
        },
        success: function (respo) {
            var resp = Ext.decode(respo.responseText);
            if (resp.list.length > 0) {
                loadData();
            }
        }
    });
}

function choiceDef() {
    var owidth = window.screen.availWidth - 300;
    var oheight = window.screen.availHeight - 500;
    var ret = window.open(AppUrl + 'page/PM_03010209/changeMonDel.html?mguid=' + V_MONTHPLAN_GUID +
        '&MainMONTH=' + Ext.getCmp('year').getValue()
        + '&MainYEAR=' + Ext.getCmp('month').getValue() + '&wxqx=' + '1', '',
        'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes');
}