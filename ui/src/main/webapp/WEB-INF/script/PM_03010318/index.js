var WEEKGUID = '';
var startUpTime = '';
var endUpTime = '';
var comBoFlag = 0;
if (location.href.split('?')[1] != undefined) {
    WEEKGUID = Ext.urlDecode(location.href.split('?')[1]).WEEKGUID;
    startUpTime = Ext.urlDecode(location.href.split('?')[1]).startUpTime;
    endUpTime = Ext.urlDecode(location.href.split('?')[1]).endUpTime;
}
var date = new Date();
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
//周
var weeks = [];
for (var i = 1; i <= 5; i++) {
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


Ext.onReady(function () {

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

    var editPanel = Ext.create('Ext.form.Panel', {
        id: 'editPanel',
        region: 'center',
        layout: 'border',
        baseCls: 'my-panel-no-border',
        items: [
            {
                xtype: 'panel',
                layout: 'vbox',
                region: 'center',
                defaults: {labelAlign: 'right'},
                frame: true,
                autoScroll: true,
                items: [
                    {
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        //frame: false,
                        //border: false,
                        baseCls: 'my-panel-no-border',
                        items: [{
                            xtype: 'button',
                            id: 'bc',
                            text: '保存',
                            icon: imgpath + '/saved.png',
                            margin: '10px 0px 0px 10px',
                            handler: tempSave//OnButtonSaveClick
                        },
                            {
                                xtype: 'button',
                                id: 'closebtn',
                                text: '关闭',
                                icon: imgpath + '/cross.png',
                                margin: '10px 0px 0px 10px',
                                handler: OnButtonCancelClick
                            },
                            {
                                xtype: 'button',
                                id: 'xgqxbtn',
                                text: '修改缺陷',
                                icon: imgpath + '/accordion_collapse.png',
                                margin: '10px 0px 0px 10px',
                                handler: OnButtonChangeDef
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        //frame: false,
                        //border: false,
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
                                store: yearStore,
                                queryMode: 'local'
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
                                store: monthStore,
                                queryMode: 'local'
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        //frame: false,
                        //border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                xtype: 'combo',
                                id: 'week',
                                fieldLabel: '周',
                                editable: false,
                                margin: '5 0 0 5',
                                labelWidth: 80,
                                width: 280,
                                displayField: 'displayField',
                                valueField: 'valueField',
                                store: weekStore,
                                queryMode: 'local'
                            },
                            {
                                xtype: 'textfield',
                                id: 'ckName',
                                fieldLabel: '计划厂矿',
                                readOnly: true,
                                margin: '5 0 0 5',
                                labelWidth: 70,
                                width: 255
                            }, {
                                xtype: 'textfield',
                                id: 'ck',
                                hidden: true
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'zyqName',
                                fieldLabel: '作业区',
                                readOnly: true,
                                margin: '5 0 0 5',
                                labelWidth: 80,
                                width: 280
                            }, {
                                xtype: 'textfield',
                                id: 'zyq',
                                hidden: true
                            },
                            {
                                xtype: 'combo',
                                id: 'zy',
                                fieldLabel: '专业',
                                editable: false,
                                margin: '5 0 0 5',
                                labelWidth: 70,
                                width: 255,
                                value: '',
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
                        //frame: false,
                        //border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'sblxName',
                                fieldLabel: '设备类型',
                                readOnly: true,
                                margin: '5 0 0 5',
                                labelWidth: 80,
                                width: 280
                            },
                            {
                                xtype: 'textfield',
                                id: 'sblx',
                                hidden: true
                            },
                            {
                                xtype: 'textfield',
                                id: 'sbmcName',
                                readOnly: true,
                                fieldLabel: '设备名称',
                                labelAlign: 'right',
                                margin: '5 0 0 5',
                                labelWidth: 70,
                                width: 255
                            },
                            {
                                xtype: 'textfield',
                                id: 'sbmc',
                                hidden: true
                            }
                        ]
                    }, {
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        baseCls: 'my-panel-no-border',
                        items: [

                            {
                                xtype: 'numberfield',
                                id: 'expectage',
                                fieldLabel: '预计寿命',
                                labelAlign: 'right',
                                margin: '5 0 0 5',
                                labelWidth: 80,
                                allowNegative: false,
                                width: 250,
                                minValue: 0,
                                value: 0
                            }, {
                                xtype: 'label',
                                margin: '8 0 0 5',
                                text: '小时',
                                width: 28
                            }, {
                                xtype: 'numberfield',
                                id: 'repairper',
                                fieldLabel: '维修人数',
                                labelAlign: 'right',
                                margin: '5 0 0 2',
                                labelWidth: 70,
                                allowNegative: false,
                                width: 255,
                                minValue: 0,
                                value: 0
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                xtype: 'combo',
                                id: 'gx',
                                fieldLabel: '工序',
                                editable: false,
                                labelAlign: 'right',
                                margin: '5 0 0 5',
                                labelWidth: 80,
                                width: 280,
                                displayField: 'OPERA_NAME',
                                valueField: 'OPERA_NAME',
                                store: gxStore,
                                queryMode: 'local'
                            }

                        ]
                    },
                    {
                        xtype: 'textarea',
                        id: 'maindefect',
                        fieldLabel: '主要缺陷',
                        labelAlign: 'right',
                        allowBlank: false,
                        margin: '5 0 0 5',
                        labelWidth: 80,
                        width: 540,
                        height: 44,
                        fieldStyle: 'background-color: #FFEFD5;border-color: #FFEFD5; background-image: none;',
                        readOnly: true

                    },
                    {
                        xtype: 'textarea',
                        id: 'jxnr',
                        fieldLabel: '检修内容',
                        labelAlign: 'right',
                        margin: '5 0 0 5',
                        labelWidth: 80,
                        allowBlank: false,
                        width: 540,
                        height: 44
                    },
                    {
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                xtype: 'datefield',
                                id: 'jhtgdate',
                                format: 'Y-m-d',
                                fieldLabel: '计划开工时间',
                                editable: false,
                                labelAlign: 'right',
                                margin: '5 0 0 5',
                                labelWidth: 80,
                                width: 280,
                                minValue: new Date(startUpTime),
                                maxValue: new Date(endUpTime),
                                listeners: {
                                    select: function () {
                                        Ext.getCmp('jhjgdate').setMinValue(Ext.getCmp('jhtgdate').getSubmitValue());
                                        Ext.getCmp('jhtgdate').setMinValue(new Date(startUpTime));
                                        // Ext.getCmp('jhjgdate').setMinValue(new Date(value));
                                        _gongshiheji();
                                    }
                                }
                            },
                            {
                                xtype: 'combo',
                                id: 'jhtghour',
                                fieldLabel: '小时',
                                editable: false,
                                margin: '5 0 0 5',
                                labelWidth: 55,
                                width: 137,
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
                        //frame: false,
                        //border: false,
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
                                width: 280,
                                minValue: new Date(startUpTime),
                                listeners: {
                                    select: function () {
                                        Ext.getCmp('jhjgdate').setMinValue(new Date(Ext.getCmp('jhtgdate').getValue()));
                                        //Ext.getCmp('jhjgdate').setMaxValue(new Date(endUpTime));
                                        _gongshiheji();
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
                        baseCls: 'my-panel-no-border',
                        items: [{
                            xtype: 'textfield',
                            id: 'jhgshj',
                            fieldLabel: '计划工时合计',
                            labelAlign: 'right',
                            margin: '5 0 5 5',
                            labelWidth: 80,
                            width: 280,
                            value: '0'
                        },
                            {
                                xtype: 'checkboxfield',
                                boxLabel: '施工准备是否已落实',
                                id: 'iflag',
                                inputValue: 1,
                                uncheckedValue: 0,
                                margin: '5 0 5 30'
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        hidden: true,
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
                                margin: '5 0 5 5',
                                displayField: 'V_SGFS',
                                valueField: 'V_BH',
                                labelWidth: 80,
                                width: 280,
                                hidden: true,
                                labelAlign: 'right'
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        baseCls: 'my-panel-no-border',
                        items: [{
                            xtype: 'textfield',
                            id: 'telname',
                            fieldLabel: '联系人姓名',
                            labelAlign: 'right',
                            margin: '5 0 0 5',
                            allowNegative: false,
                            allowDecimals: false,
                            labelWidth: 80,
                            width: 280,
                            value: ''
                        }, {
                            xtype: 'textfield',
                            id: 'telnumb',
                            fieldLabel: '联系人电话',
                            labelAlign: 'right',
                            margin: '5 0 0 5',
                            allowNegative: false,
                            allowDecimals: false,
                            labelWidth: 80,
                            width: 255,
                            value: ''
                        }]
                    },
                    {
                        xtype: 'textarea',
                        id: 'bz',
                        fieldLabel: '备注',
                        margin: '5 0 10 5',
                        labelWidth: 80,
                        width: 540,
                        height: 80,
                        value: ''
                    }, {
                        xtype: 'label',
                        text: "--------------------------------皮带胶接数据(↓)-----------------------------",
                        margin: '10 0 0 85',
                        style: 'color:blue'
                    }, {
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        //frame: false,
                        //border: false,
                        baseCls: 'my-panel-no-border',
                        items: [{
                            xtype: 'numberfield',
                            id: 'pdc',
                            fieldLabel: '皮带周长',
                            labelAlign: 'right',
                            minValue: 0,
                            margin: '5 0 0 2',
                            labelWidth: 80,
                            width: 250,
                            value: 0
                        }, {
                            xtype: 'label',
                            text: "(米）",
                            width: 30,
                            margin: '5 0 0 2'
                        },
                            {
                                xtype: 'numberfield',
                                id: 'changpdc',
                                fieldLabel: '更换皮带长度',
                                labelAlign: 'right',
                                margin: '5 0 0 5',
                                allowNegative: false,
                                labelWidth: 80,
                                width: 225,
                                minValue: 0,
                                value: 0
                            }, {
                                xtype: 'label',
                                text: "(米）",
                                margin: '7 0 0 2',
                                width: 30
                            }
                        ]
                    }, {
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        baseCls: 'my-panel-no-border',
                        items: [{
                            xtype: 'textfield',
                            id: 'gyyq',
                            fieldLabel: '工艺要求',
                            labelAlign: 'right',
                            margin: '5 0 0 5',
                            allowNegative: false,
                            allowDecimals: false,
                            labelWidth: 80,
                            width: 280,
                            value: ''
                        }, {
                            xtype: 'textfield',
                            id: 'pdgg',
                            fieldLabel: '皮带规格',
                            labelAlign: 'right',
                            margin: '5 0 0 5',
                            allowNegative: false,
                            allowDecimals: false,
                            labelWidth: 80,
                            width: 255,
                            value: ''
                        }]
                    }, {
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        //frame: false,
                        //border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                xtype: 'numberfield',
                                id: 'jxhour',
                                fieldLabel: '检修时间',
                                labelAlign: 'right',
                                margin: '5 0 0 5',
                                allowNegative: false,
                                minValue: 0,
                                allowDecimals: false,
                                labelWidth: 80,
                                width: 243,
                                value: '0'
                            }, {
                                xtype: 'label',
                                text: "(小时）",
                                margin: '5 0 0 5',
                                width: 55
                            },
                            {
                                xtype: 'numberfield',
                                id: 'jjhour',
                                fieldLabel: '胶接时间',
                                labelAlign: 'right',
                                margin: '5 0 0 7',
                                minValue: 0,
                                allowNegative: false,
                                allowDecimals: false,
                                labelWidth: 55,
                                width: 192,
                                value: '0'
                            }, {
                                xtype: 'label',
                                text: "(小时）",
                                margin: '5 0 0 2',
                                width: 60
                            }]
                    },
                    {
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        baseCls: 'my-panel-no-border',
                        items: [{
                            xtype: 'datefield',
                            id: 'evertime',
                            format: 'Y-m-d',
                            fieldLabel: '上次施工时间',
                            editable: false,
                            labelAlign: 'right',
                            margin: '5 0 0 5',
                            labelWidth: 80,
                            width: 275,
                            value: ''
                        }, {
                            xtype: 'numberfield',
                            id: 'hd',
                            fieldLabel: '厚度',
                            labelAlign: 'right',
                            margin: '5 0 0 5',
                            allowNegative: false,
                            allowDecimals: false,
                            labelWidth: 85,
                            width: 222,
                            minValue: 0,
                            value: '0'
                        },
                            {
                                xtype: 'label',
                                text: "(厘米）",
                                margin: '7 0 0 2',
                                width: 60
                            }]
                    }, {
                        xtype: 'textarea',
                        id: 'sgyy',
                        fieldLabel: '施工原因',
                        margin: '5 0 10 5',
                        labelWidth: 80,
                        width: 540,
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
    dataBackReturn();

})

function pageLoadInfo(data) {

    Ext.getBody().mask('<p>数据加载...</p>');
    //加载专业
    Ext.data.StoreManager.lookup('zyStore').load({
        params: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue()
        }
    });

    Ext.data.StoreManager.lookup('gxStore').load({
        params: {
            V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_DPPTCODE: Ext.util.Cookies.get('v_deptcode'),
            V_ORGCODE: Ext.util.Cookies.get('v_orgCode'),
            V_FLAG: '0'
        }
    });

    Ext.data.StoreManager.lookup('gxStore').on('load', function () {
        if (comBoFlag == 0) {
            Ext.getCmp('gx').select(data.V_OPERANAME);
        } else {
            Ext.getCmp('gx').select(Ext.data.StoreManager.lookup('gxStore').getAt(0));
        }
    })

    //专业
    Ext.data.StoreManager.lookup('zyStore').on('load', function () {
        if (comBoFlag == 0) {
            Ext.getCmp('zy').select(data.V_REPAIRMAJOR_CODE);
        } else {
            Ext.getCmp('zy').select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
        }
    });

    Ext.getBody().unmask();

}

function dataBackReturn() {
    Ext.getCmp('jhjgdate').setMinValue(Ext.getCmp('jhtgdate').getSubmitValue());

    Ext.Ajax.request({
        url: AppUrl + 'PM_03/PRO_PM_03_PLAN_WEEK_GET',
        async: false,
        method: 'POST',
        params: {
            'V_V_WEEKPLAN_GUID': WEEKGUID
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.list.length == 1) {
                Ext.getCmp('year').select(resp.list[0].V_YEAR); //年
                Ext.getCmp('month').select(resp.list[0].V_MONTH);  //月
                Ext.getCmp('week').select(resp.list[0].V_WEEK);  //周
                Ext.getCmp('ckName').setValue(resp.list[0].V_ORGNAME);
                Ext.getCmp('ck').setValue(resp.list[0].V_ORGCODE);
                Ext.getCmp('zyqName').setValue(resp.list[0].V_DEPTNAME);
                Ext.getCmp('zyq').setValue(resp.list[0].V_DEPTCODE);
                Ext.getCmp('sblxName').setValue(resp.list[0].V_EQUTYPENAME);
                Ext.getCmp('sblx').setValue(resp.list[0].V_EQUTYPECODE);
                Ext.getCmp('sbmcName').setValue(resp.list[0].V_EQUNAME);
                Ext.getCmp('sbmc').setValue(resp.list[0].V_EQUCODE);
                pageLoadInfo(resp.list[0]);
                Ext.getCmp('jxnr').setValue(resp.list[0].V_CONTENT);  //检修内容
                Ext.getCmp('jhtgdate').setValue(resp.list[0].V_STARTTIME.split(" ")[0]);  //停工时间
                Ext.getCmp('jhtghour').select(resp.list[0].V_STARTTIME.split(" ")[1].split(":")[0]);  //停工时间小时
                Ext.getCmp('jhtgminute').select(resp.list[0].V_STARTTIME.split(" ")[1].split(":")[1]);  //停工时间分钟
                Ext.getCmp('jhjgdate').setValue(resp.list[0].V_ENDTIME.split(" ")[0]);  //竣工时间
                Ext.getCmp('jhjghour').select(resp.list[0].V_ENDTIME.split(" ")[1].split(":")[0]);  //竣工时间小时
                Ext.getCmp('jhjgminute').select(resp.list[0].V_ENDTIME.split(" ")[1].split(":")[1]);  //竣工时间分钟
                Ext.getCmp('jhgshj').setValue(resp.list[0].V_HOUR);  //竣工时间分钟
                Ext.getCmp('bz').setValue(resp.list[0].V_BZ);

                Ext.getCmp('maindefect').setValue(resp.list[0].V_MAIN_DEFECT);
                Ext.getCmp('maindefect').setReadOnly(true); //主要缺陷
                Ext.getCmp('expectage').setValue(resp.list[0].V_EXPECT_AGE);  //预计寿命
                Ext.getCmp('repairper').setValue(resp.list[0].V_REPAIR_PER);  //维修人数

                Ext.getCmp('iflag').setValue(resp.list[0].V_FLAG);  //施工准备是否已落实
                Ext.getCmp('sgfs').select(resp.list[0].V_SGWAY);  //施工方式

            }
        }
    });
}


//第几周
function getWeekOfMonth() {
    var date = new Date();
    var w = date.getDay();
    var d = date.getDate();
    return Math.ceil((d + 6 - w) / 7);
}

function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function tempSave() {

    if (WeekYear != undefined && WeekMonth != undefined) {
        if (Ext.getCmp('year').getValue() != WeekYear || Ext.getCmp('month').getValue() != WeekMonth) {
            Ext.Msg.show({
                title: '消息提示',
                id: 'warm',
                msg: '当前年月与填报年月不符，是否修改',
                buttons: Ext.Msg.OKCANCEL,
                buttonText: {ok: '确认', cancel: '取消'},
                fn: function (btn, text) {
                    if (btn === 'ok') {
                        return false;
                    }
                    else {
                        timeCompare();
                    }
                }
            });
        }
        else {
            timeCompare();
        }
    } else {
        timeCompare();
    }


}

function timeCompare() {
    if (!(Ext.getCmp('jhtgdate').getValue() >= new Date(startUpTime) && Ext.getCmp('jhtgdate').getValue() <= new Date(endUpTime))) {
        Ext.Msg.show({
            title: '消息提示',
            id: 'choice',
            msg: '当前周份的计划，不可上报，是否修改周计划上报',
            buttons: Ext.Msg.OKCANCEL,
            buttonText: {ok: '确认', cancel: '取消'},
            fn: function (btn, text) {
                if (btn === 'ok') {
                    return false;
                }
                else {
                    OnButtonSaveClick();
                }
            }
        });
    }
    else {
        OnButtonSaveClick();
    }
}

function OnButtonSaveClick() {

    if (Ext.getCmp('sblx').getValue() == "%" && Ext.getCmp('sbmc').getValue() == "%") {
        Ext.Msg.alert('消息', '设备类型和设备名称不可以为全部，请选择相关名称');
        return;
    }
    if (Ext.getCmp("expectage").getValue() < 0) {
        Ext.Msg.alert('消息', '预计寿命不可为负数');
        return;
    }
    if (Ext.getCmp("repairper").getValue() < 0) {
        Ext.Msg.alert('消息', '维修人数不可为负数');
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
    //计划停工时间
    var jhtghour = Ext.getCmp('jhtghour').getValue();
    var jhtgminute = Ext.getCmp('jhtgminute').getValue();
    var jhtgTime = Ext.getCmp("jhtgdate").getSubmitValue() + " " + jhtghour + ":" + jhtgminute + ":00";
    //计划竣工时间
    var jhjghour = Ext.getCmp('jhjghour').getValue();
    var jhjgminute = Ext.getCmp('jhjgminute').getValue();
    var jhjgTime = Ext.getCmp("jhjgdate").getSubmitValue() + " " + jhjghour + ":" + jhjgminute + ":00";
    //计划类型（月/缺陷）
    var V_MONTHPLAN_CODE = "";
    var V_DEFECTPLAN_CODE = "";
    if (V_PLANTYPE == 'PLAN') {
        V_MONTHPLAN_CODE = V_PLANCODE;
    } else if (V_PLANTYPE == 'DEFECT') {
        V_V_DEFECTPLAN_CODE = V_PLANCODE;
    }
    if (Ext.getCmp('jhgshj').getValue() <= "0") {
        alert('合计工时不可以为负数');
        return false;
    }

    //保存
    Ext.Ajax.request({
        url: AppUrl + 'cjy/PRO_PM_03_PLAN_WEEK_NSET',
        method: 'POST',
        params: {
            V_V_INPER: Ext.util.Cookies.get('v_personcode'),               //人员cookies                                    //人员编码
            V_V_GUID: wguid,                         //季度计划guid                                                      //计划GUID
            V_V_YEAR: Ext.getCmp('year').getValue(),                        //年份                                            //年份
            V_V_MONTH: Ext.getCmp('month').getValue(),                     //月份                                           //年份
            V_V_WEEK: Ext.getCmp('week').getValue(),                      //周                                          //年份
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),                        //厂矿                                              //厂矿
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),                      //作业区
            V_V_EQUTYPECODE: Ext.getCmp('sblx').getValue(),                  //设备类型                                              //设备类型编码
            V_V_EQUCODE: Ext.getCmp('sbmc').getValue(),                     //设备名称
            V_V_REPAIRMAJOR_CODE: Ext.getCmp('zy').getValue(),              //检修专业
            V_V_CONTENT: Ext.getCmp('jxnr').getValue(),                     //检修内容
            V_V_STARTTIME: jhtgTime,                                       //开始时间
            V_V_ENDTIME: jhjgTime,                                          //结束时间
            V_V_OTHERPLAN_GUID: getOtherguid,// '',                         //检修工序编码
            V_V_OTHERPLAN_TYPE: getOtherType,// '',                                  //检修模型编码
            V_V_JHMX_GUID: '',                                          //检修标准
            V_V_HOUR: Ext.getCmp('jhgshj').getValue(),
            V_V_BZ: Ext.getCmp('bz').getValue(),
            V_V_DEFECTGUID: '',
            V_V_MAIN_DEFECT: Ext.getCmp('maindefect').getValue(),//主要缺陷
            V_V_EXPECT_AGE: Ext.getCmp('expectage').getValue(),//预计寿命
            V_V_REPAIR_PER: Ext.getCmp('repairper').getValue()//维修人数

            //--update 2018-0910
            , V_V_PDC: Ext.getCmp('pdc').getValue(), //皮带周长
            V_V_GYYQ: Ext.getCmp('gyyq').getValue(),//工艺要求
            V_V_CHANGPDC: Ext.getCmp('changpdc').getValue(), //更换皮带长度
            V_V_JXHOUR: Ext.getCmp('jxhour').getValue(),//检修时间
            V_V_JJHOUR: Ext.getCmp('jjhour').getValue(),//接胶时间
            V_V_TELNAME: Ext.getCmp('telname').getValue(),//联系人姓名
            V_V_TELNUMB: Ext.getCmp('telnumb').getValue(),//联系人电话
            V_V_PDGG: Ext.getCmp('pdgg').getValue()//皮带规格
            //--end up
            //---add2018-10-26
            , V_V_THICKNESS: Ext.getCmp('hd').getValue(),  //厚度
            V_V_REASON: Ext.getCmp('sgyy').getValue(),  //--施工原因
            V_V_EVERTIME: Ext.Date.format(Ext.getCmp('evertime').getValue(), 'Y/m/d').toString(),  //上次施工时间
            //20181113
            V_V_FLAG: Ext.getCmp('iflag').getValue() == false ? Ext.getCmp('iflag').uncheckedValue : Ext.getCmp('iflag').inputValue,
            V_V_RDEPATCODE: Ext.getCmp('repairDept').getValue(),
            V_V_RDEPATNAME: Ext.getCmp('repairDept').getDisplayValue(),
            V_V_SGWAY: Ext.getCmp('sgfs').getValue(),
            V_V_SGWAYNAME: Ext.getCmp('sgfs').getDisplayValue(),
            V_V_OPERANAME: Ext.getCmp('gx').getValue()  //工序
        },
        success: function (ret) {
            var resp = Ext.decode(ret.responseText);
            if (resp.V_INFO == '成功') {
                Ext.Msg.alert('操作信息', resp.V_INFO);
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

function OnReload(){
    Ext.Ajax.request({
        url: AppUrl + 'cjy/PRO_PM_03_PLAN_WEEK_D_U',
        method: 'POST',
        params: {
            V_V_WEEKGUID:WEEKGUID
        },
        success: function (ret) {
            var resp = Ext.decode(ret.responseText);
            if (resp.V_INFO == 'SUCCESS') {
                dataBackReturn();
            } else {
                Ext.Msg.alert('操作信息', resp.V_INFO);
            }
        }
    });
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

function OnButtonChangeDef() {
    var owidth = window.screen.availWidth;
    var oheight = window.screen.availHeight - 50;
    window.open(AppUrl + 'page/PM_03010318/defUpdate.html?WeekGuid=' + WEEKGUID, '', 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes');
}
