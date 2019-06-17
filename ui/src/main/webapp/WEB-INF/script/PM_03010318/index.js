
var V_PLANTYPE = null;
var YEAR = null;
var MONTH = null;
var WEEK = null;
var V_ORGCODE = null;
var V_DEPTCODE = null;
var V_JXMX_CODE = null;
var V_JXGX_CODE = null;
var V_PLANCODE = null;
var startUpTime=null;
var endUpTime=null;
var getOtherguid="";
var getOtherType="";
var returnSing="0";
var V_V_DEFECTPLAN_CODE="";

var MONGUID = "";
var WEEKGUID = "";
var WeekYear = "";
var WeekMonth= "";
var WSIGN= "";
var UPLOAD=1;
var V_WEEKPLAN_GUID="";
if (location.href.split('?')[1] != undefined) {
    MONGUID = Ext.urlDecode(location.href.split('?')[1]).MONGUID;
    WEEKGUID = Ext.urlDecode(location.href.split('?')[1]).WEEKGUID;
    WeekYear = Ext.urlDecode(location.href.split('?')[1]).WeekYear;
    WeekMonth = Ext.urlDecode(location.href.split('?')[1]).WeekMonth;
    WSIGN=Ext.urlDecode(location.href.split('?')[1]).WSIGN;
    WEEK=Ext.urlDecode(location.href.split('?')[1]).WEEK;
    startUpTime=Ext.urlDecode(location.href.split('?')[1]).startUpTime;
    endUpTime=Ext.urlDecode(location.href.split('?')[1]).endUpTime;
}
if(location.href.split('?')[1]!=undefined){
    V_WEEKPLAN_GUID=Ext.urlDecode(location.href.split("?")[1]).V_WEEKPLAN_GUID;
    WSIGN=Ext.urlDecode(location.href.split('?')[1]).WSIGN;
    startUpTime=Ext.urlDecode(location.href.split('?')[1]).startUpTime;
    endUpTime=Ext.urlDecode(location.href.split('?')[1]).endUpTime;
}
var wguid="";
if(Ext.urlDecode(location.href.split("?")[1]).V_WEEKPLAN_GUID==undefined){
    wguid=WEEKGUID;
}else{
    // V_WEEKPLAN_GUID=WEEKGUID==""?V_WEEKPLAN_GUID:WEEKGUID;
    wguid=V_WEEKPLAN_GUID;
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
            'V_V_DEPTCODENEXT': '%',
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
    fields: ['ID', 'V_BH','V_SGFS','V_LX'],
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
Ext.data.StoreManager.lookup('sgfsStore').on('load',function(){
    Ext.getCmp('sgfs').select( Ext.data.StoreManager.lookup('sgfsStore').getAt(0));
});
//---检修单位
var repairDeptStore= Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'repairDeptStore',
    fields: ['V_DEPTCODE','V_DEPTNAME','V_DEPTREPAIRCODE','V_DEPTREPAIRNAME',
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

var gxStore=Ext.create('Ext.data.Store',{
    id:'gxStore',
    autoLoad:false,
    fields:[ 'OPERA_NAME','ID'],
    proxy:{
        type:'ajax',
        async:false,
        url:AppUrl+'dxfile/BASE_OPERATION_SEL',
        actionMethods:{
            read:'POST'
        },
        reader:{
            type:'json',
            root:'RET'
        }
    }
});

Ext.onReady(function () {
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
                        items: [
                            // {
                            //     xtype: 'button',
                            //     text: '计划选择',
                            //     margin: '10px 0px 0px 90px',
                            //     icon: imgpath + '/add.png',
                            //     handler: jhSelect
                            // },
                            // {
                            //     xtype: 'button',
                            //     text: '模型保存',
                            //     icon: imgpath + '/saved.png',
                            //     margin: '10px 0px 0px 10px',
                            //     handler: OnModelSaveClick
                            // },
                            {
                                xtype: 'button',
                                id:'bc',
                                text: '保存',
                                icon: imgpath + '/saved.png',
                                margin: '10px 0px 0px 10px',
                                handler: tempSave//OnButtonSaveClick
                            },
                            {
                                xtype: 'button',
                                id:'closebtn',
                                text: '关闭',
                                icon: imgpath + '/cross.png',
                                margin: '10px 0px 0px 10px',
                                handler: OnButtonCancelClick
                            },
                            {
                                xtype: 'button',
                                id:'xgqxbtn',
                                text: '修改缺陷',
                                hidden:true,
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
                                value: '',
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
                                value: '',
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
                                value: WEEK,
                                store: weekStore,
                                queryMode: 'local'
                            ,readOnly:true
                            },
                            {
                                xtype: 'combo',
                                id: 'ck',
                                fieldLabel: '计划厂矿',
                                editable: false,
                                margin: '5 0 0 5',
                                labelWidth: 70,
                                width: 255,
                                value: '',
                                displayField: 'V_DEPTNAME',
                                valueField: 'V_DEPTCODE',
                                store: ckStore,
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
                                id: 'zyq',
                                fieldLabel: '作业区',
                                editable: false,
                                margin: '5 0 0 5',
                                labelWidth: 80,
                                width: 280,
                                value: '',
                                displayField: 'V_DEPTNAME',
                                valueField: 'V_DEPTCODE',
                                store: zyqStore,
                                queryMode: 'local'
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
                                xtype: 'combo',
                                id: 'sblx',
                                fieldLabel: '设备类型',
                                editable: false,
                                margin: '5 0 0 5',
                                labelWidth: 80,
                                width: 280,
                                value: '',
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
                                labelAlign: 'right',
                                margin: '5 0 0 5',
                                labelWidth: 70,
                                width: 255,
                                matchFieldWidth: false,
                                value: '',
                                displayField: 'V_EQUNAME',
                                valueField: 'V_EQUCODE',
                                store: sbmcStore,
                                queryMode: 'local',
                                listConfig:{
                                    minWidth:400
                                }
                            }
                        ]
                    }, {
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        //frame: false,
                        //border: false,
                        baseCls: 'my-panel-no-border',
                        items: [

                            {
                                xtype: 'numberfield',
                                id: 'expectage',
                                fieldLabel: '预计寿命',
                                labelAlign: 'right',
                                margin: '5 0 0 5',
                                labelWidth: 80,
                                allowNegative:false,
                                width: 250,
                                minValue:0,
                                value: 0
                            },{xtype:'label',
                                margin:'8 0 0 5' ,
                                text:'小时',
                                width:28
                            } ,{
                                xtype: 'numberfield',
                                id: 'repairper',
                                fieldLabel: '维修人数',
                                labelAlign: 'right',
                                margin: '5 0 0 5',
                                labelWidth: 70,
                                allowNegative:false,
                                width: 255,
                                minValue:0,
                                value: 0
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
                                id: 'maindefect',
                                fieldLabel: '主要缺陷',
                                labelAlign: 'right',
                                allowBlank:false,
                                margin: '5 0 0 5',
                                labelWidth: 80,
                                width: 280,
                                fieldStyle:'background-color: #FFEFD5;border-color: #FFEFD5; background-image: none;'
                            },{
                                xtype: 'combo',
                                id: 'gx',
                                fieldLabel: '工序',
                                editable: false,
                                labelAlign: 'right',
                                margin: '5 0 0 5',
                                labelWidth: 70,
                                width: 255,
                                matchFieldWidth: false,
                                value: '',
                                displayField: 'OPERA_NAME',
                                valueField: 'OPERA_NAME',
                                store: gxStore,
                                queryMode: 'local',
                                listConfig:{
                                    minWidth:400
                                }
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
                        allowBlank:false,
                        width: 540,
                        value: ''
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
                                id: 'jhtgdate',
                                format: 'Y-m-d',
                                fieldLabel: '计划停工时间',
                                editable: false,
                                labelAlign: 'right',
                                margin: '5 0 0 5',
                                labelWidth: 80,
                                width: 280,
                                value: '',
                                minValue:new Date(startUpTime),
                                maxValue:new Date(endUpTime),
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
                                value: '',
                                minValue:new Date(startUpTime),
                                // maxValue:new Date(endUpTime),
                                // renderData:function(){
                                //     Ext.getCmp('jhjgdate').setMinValue(new Date(Ext.getCmp('jhtgdate').getValue()));
                                // },
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
                    {layout:'hbox',
                        defaults:{labelAlign:'right'},
                        baseCls: 'my-panel-no-border',
                        items:[{
                            xtype: 'textfield',
                            id: 'jhgshj',
                            fieldLabel: '计划工时合计',
                            labelAlign: 'right',
                            margin: '5 0 5 5',
                            labelWidth: 80,
                            width: 280,
                            value: '0'},
                            {
                                xtype:'checkboxfield',
                                boxLabel:'施工准备是否已落实',
                                id : 'iflag',
                                inputValue:1,
                                uncheckedValue:0,
                                margin: '5 0 5 30'
                            }
                        ]
                    },
                    {layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items:[
                            {
                                xtype : 'combo',
                                id : "sgfs",
                                store: sgfsStore,
                                editable : false,
                                queryMode : 'local',
                                fieldLabel : '施工方式',
                                margin: '5 0 5 5',
                                displayField: 'V_SGFS',
                                valueField: 'V_BH',
                                labelWidth: 80,
                                width: 280,
                                labelAlign : 'right'
                            },{
                                xtype : 'combo',
                                id:'repairDept',
                                store:repairDeptStore,
                                editable : false,
                                queryMode : 'local',
                                fieldLabel : '检修单位',
                                displayField: 'V_DEPTREPAIRNAME',
                                valueField: 'V_DEPTREPAIRCODE',
                                margin: '5 0 5 5',
                                labelWidth: 55,
                                width: 255,
                                labelAlign : 'right',
                                listConfig:{
                                    minWidth:420
                                }
                            }
                        ]
                    },
                    {layout:'hbox',
                        defaults:{labelAlign:'right'},
                        baseCls: 'my-panel-no-border',
                        items:[{
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
                        },{
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
                    },{
                        xtype:'label',
                        text:"--------------------------------皮带胶接数据(↓)-----------------------------",
                        margin: '10 0 0 85',
                        style:'color:blue'
                    },{ layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        //frame: false,
                        //border: false,
                        baseCls: 'my-panel-no-border',
                        items:[{xtype: 'numberfield',
                            id: 'pdc',
                            fieldLabel: '皮带周长',
                            labelAlign: 'right',
                            minValue:0,
                            margin: '5 0 0 2',
                            labelWidth: 80,
                            width: 250,
                            value: 0
                        },{
                            xtype:'label',
                            text:"(米）",
                            width:30,
                            margin: '5 0 0 2'
                        },
                            {xtype:'numberfield',
                                id:'changpdc',
                                fieldLabel: '更换皮带长度',
                                labelAlign: 'right',
                                margin: '5 0 0 5',
                                allowNegative:false,
                                labelWidth: 80,
                                width: 225,
                                minValue:0,
                                value: 0},{
                                xtype:'label',
                                text:"(米）",
                                margin: '7 0 0 2',
                                width:30}
                        ]
                    }, {layout:'hbox',
                        defaults:{labelAlign:'right'},
                        baseCls: 'my-panel-no-border',
                        items:[{
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
                        },{
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
                    },{
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
                                minValue:0,
                                allowDecimals: false,
                                labelWidth: 80,
                                width: 245,
                                value: '0'
                            },{
                                xtype:'label',
                                text:"(小时）",
                                margin: '7 0 0 2',
                                width:60
                            },
                            {
                                xtype: 'numberfield',
                                id: 'jjhour',
                                fieldLabel: '胶接时间',
                                labelAlign: 'right',
                                margin: '5 0 0 2',
                                minValue:0,
                                allowNegative: false,
                                allowDecimals: false,
                                labelWidth: 55,
                                width: 200,
                                value: '0'
                            },{
                                xtype:'label',
                                text:"(小时）",
                                margin: '7 0 0 2',
                                width:60
                            }]
                    },
                    {layout:'hbox',
                        defaults:{labelAlign:'right'},
                        baseCls: 'my-panel-no-border',
                        items:[{
                            xtype: 'datefield',
                            id: 'evertime',
                            format: 'Y-m-d',
                            fieldLabel: '上次施工时间',
                            editable: false,
                            labelAlign: 'right',
                            margin: '5 0 0 5',
                            labelWidth: 80,
                            width: 280,
                            value: ''
                        },{
                            xtype: 'numberfield',
                            id: 'hd',
                            fieldLabel: '厚度',
                            labelAlign: 'right',
                            margin: '5 0 0 2',
                            allowNegative: false,
                            allowDecimals: false,
                            labelWidth: 85,
                            width: 230,
                            minValue:0,
                            value: '0'
                        },
                            {
                                xtype:'label',
                                text:"(厘米）",
                                margin: '7 0 0 2',
                                width:60
                            }]
                    },{
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
    pageLoadInfo();
    if (WSIGN=="0") {
        V_JXGX_CODE = guid();
        if(MONGUID!=""){
        // 月计划data带回
            Ext.Ajax.request({
                url: AppUrl + 'dxfile/PM_03_PLAN_WEEK_GETONE',
                method: 'POST',
                async: false,
                params: {
                    MONGUID: MONGUID,
                    WEEKGUID: WEEKGUID
                },
                success: function (resp) {
                    var resp = Ext.decode(resp.responseText);
                    if (resp.list.length == 1) {

                        // V_JXGX_CODE = resp.list[0].V_JXGX_CODE;      //检修工序编码
                        // V_JXMX_CODE = resp.list[0].V_JXMX_CODE;      //检修模型编码
                        // var V_FLOWCODE = resp.list[0].V_FLOWCODE;        //流动编码
                        // var V_MONTHPLAN_CODE = resp.list[0].V_MONTHPLAN_CODE; //月计划编码
                        // var V_DEFECTPLAN_CODE = resp.list[0].V_DEFECTPLAN_CODE;//缺陷计划编码
                        // var V_MONTH_PLANNAME = resp.list[0].V_MONTH_PLANNAME;        //月计划名称
                        // var V_DEFECT_PLANNAME = resp.list[0].V_DEFECT_PLANNAME;   //缺陷计划名称
                        var V_HOUR = resp.list[0].V_HOUR;
                        var V_BZ = resp.list[0].V_BZ;
                        //---
                        var A_YEAR = resp.list[0].V_YEAR;                 //年
                        var A_MONTH = resp.list[0].V_MONTH;              //月
                        // var A_WEEK = resp.list[0].V_WEEK;                //季度
                        var A_ORGCODE = resp.list[0].V_ORGCODE;          //厂矿编码
                        var A_DEPTCODE = resp.list[0].V_DEPTCODE;        //作业区编码
                        //--
                        var V_REPAIRMAJOR_CODE = resp.list[0].V_REPAIRMAJOR_CODE;        //专业编码
                        var V_EQUTYPECODE = resp.list[0].V_EQUTYPECODE;        //设备类型编码
                        var V_EQUCODE = resp.list[0].V_EQUCODE;        //设备名称编码
                        var V_CONTENT = resp.list[0].V_CONTENT;        //检修内容
                        // var V_JXMX_NAME = resp.list[0].V_MX_NAME;      //检修模型名称
                        var V_STARTTIME = resp.list[0].V_STARTTIME;     //开始时间
                        var V_STARTTIME_DATE = V_STARTTIME.split(" ")[0];
                        var V_STARTTIME_HOUR = V_STARTTIME.split(" ")[1].split(":")[0];
                        var V_STARTTIME_MINUTE = V_STARTTIME.split(" ")[1].split(":")[1];
                        var V_ENDTIME = resp.list[0].V_ENDTIME;         //结束时间
                        var V_ENDTIME_DATE = V_ENDTIME.split(" ")[0];
                        var V_ENDTIME_HOUR = V_ENDTIME.split(" ")[1].split(":")[0];
                        var V_ENDTIME_MINUTE = V_ENDTIME.split(" ")[1].split(":")[1];


                        Ext.getCmp('year').select(A_YEAR); //年
                        Ext.getCmp('month').select(A_MONTH);  //月
                        // Ext.getCmp('week').select(A_WEEK);  //周
                        Ext.getCmp('ck').select(A_ORGCODE);  //厂矿编码
                        Ext.getCmp('zyq').select(A_DEPTCODE);  //作业区编码
                        Ext.getCmp('zy').select(V_REPAIRMAJOR_CODE);  //专业编码
                        Ext.getCmp('sblx').select(V_EQUTYPECODE);  //设备类型编码
                        Ext.getCmp('sbmc').select(V_EQUCODE);  //设备名称编码
                        Ext.getCmp('jxnr').setValue(V_CONTENT);  //检修内容
                        // var a_s=new Date(resp.list[0].V_STARTTIME)
                        // Ext.getCmp('jhtgdate').setValue(a_s); //停工时间
                        Ext.getCmp('jhtgdate').setValue(V_STARTTIME_DATE);  //停工时间
                        Ext.getCmp('jhtghour').select(V_STARTTIME_HOUR);  //停工时间小时
                        Ext.getCmp('jhtgminute').select(V_STARTTIME_MINUTE);  //停工时间分钟
                        Ext.getCmp('jhjgdate').setValue(V_ENDTIME_DATE);  //竣工时间
                        Ext.getCmp('jhjghour').select(V_ENDTIME_HOUR);  //竣工时间小时
                        Ext.getCmp('jhjgminute').select(V_ENDTIME_MINUTE);  //竣工时间分钟
                        Ext.getCmp('jhgshj').setValue(V_HOUR);  //竣工时间分钟
                        Ext.getCmp('bz').setValue(V_BZ);  //竣工时间分钟

                        Ext.getCmp('maindefect').setValue(resp.list[0].V_MAIN_DEFECT);
                        Ext.getCmp('maindefect').setReadOnly(true); //主要缺陷
                        Ext.getCmp('expectage').setValue(resp.list[0].V_EXPECT_AGE);  //预计寿命
                        Ext.getCmp('repairper').setValue(resp.list[0].V_REPAIR_PER);  //维修人数

                        //---update 2018-0910
                        // Ext.getCmp('pdc').setValue(resp.list[0].V_PDC); //皮带周长
                        // Ext.getCmp('gyyq').setValue(resp.list[0].V_GYYQ); //工艺要求
                        // Ext.getCmp('pdgg').setValue(resp.list[0].V_PDGG);//皮带规格
                        // Ext.getCmp('changpdc').setValue(resp.list[0].V_CHANGPDC);//更换皮带长度（米）
                        // Ext.getCmp('jxhour').setValue(resp.list[0].V_JXHOUR); //检修时间（小时）
                        // Ext.getCmp('jjhour').setValue(resp.list[0].V_JJHOUR);//胶接时间（小时）
                        // Ext.getCmp('telname').setValue(resp.list[0].V_TELNAME);//联系人姓名
                        // Ext.getCmp('telnumb').setValue(resp.list[0].V_TELNUMB);//联系人电话
                        //----2018-10-26
                        // Ext.getCmp('sgyy').setValue(resp.list[0].V_THICKNESS); //--施工原因
                        // Ext.getCmp('hd').setValue(resp.list[0].V_REASON);  //厚度
                        // if(resp.list[0].V_EVERTIME!=""){
                        //     var V_EVERTIME=resp.list[0].V_EVERTIME;
                        //     var V_EVERTIME_DATE = V_EVERTIME.split(" ")[0]; //上次时间
                        //     Ext.getCmp('evertime').setValue(V_EVERTIME_DATE);//上次施工时间
                        // }else
                        // {Ext.getCmp('evertime').setValue("");  }
                        //end up
                        //20181113
                        Ext.getCmp('iflag').setValue(resp.list[0].V_FLAG);  //施工准备是否已落实
                        Ext.getCmp('sgfs').select(resp.list[0].V_SGWAY);  //施工方式
                        // Ext.getCmp('repairDept').select(resp.list[0].V_REPAIRDEPATCODE); //检修单位
                        Ext.getCmp('gx').select(resp.list[0].V_OPERANAME);// 工序
                        getOtherguid = MONGUID;
                        getOtherType = 'MONTH';
                        // if (V_MONTHPLAN_CODE != '') {
                        V_PLANTYPE = 'PLAN';
                        // } else if (V_DEFECTPLAN_CODE != '') {
                        //     V_PLANTYPE = 'DEFECT';
                        // }
                    }
                }
            });
        }
        else{
            //为关联月计划新创建的周计划取返回值
            Ext.Ajax.request({
                url:AppUrl+'dxfile/PM_03_PLAN_WEEK_GET_DEF',
                method:'POST',
                async:false,
                params:{
                    WEEKGUID:WEEKGUID
                },
                success:function(respo){
                    var resp=Ext.decode(respo.responseText);
                    if(resp.list.length>0){
                        Ext.getCmp('maindefect').setValue(resp.list[0].V_MAIN_DEFECT);
                        Ext.getCmp('maindefect').setReadOnly(true); //主要缺陷
                        Ext.getCmp('year').select(WeekYear); //年
                        Ext.getCmp('month').select(WeekMonth);  //月
                        Ext.getCmp('week').select(WEEK);  //周
                        Ext.getCmp('jhtgdate').setValue(Ext.Date.format(new Date(startUpTime),'Y-m-d'));  //停工时间
                        Ext.getCmp('jhtghour').select("0");  //停工时间小时
                        Ext.getCmp('jhtgminute').select("0");  //停工时间分钟
                        Ext.getCmp('jhjgdate').setValue(Ext.Date.format(new Date(endUpTime),'Y-m-d'));  //竣工时间
                        Ext.getCmp('jhjghour').select("0");  //竣工时间小时
                        Ext.getCmp('jhjgminute').select("0");  //竣工时间分钟
                        Ext.getCmp('jhgshj').setValue("0");  //竣工时间分钟
                        Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
                        Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
                        Ext.getCmp('zy').select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
                        Ext.getCmp("sblx").select(Ext.data.StoreManager.lookup('sblxStore').getAt(0));
                        Ext.getCmp("sbmc").select(Ext.data.StoreManager.lookup('sbmcStore').getAt(0));
                    }
                }
            });
        }
        return false;
    } else {
        //修改周计划页面取返回值
        retEditWDate(V_WEEKPLAN_GUID);
        // Ext.Ajax.request({
        //     url: AppUrl + 'PM_03/PRO_PM_03_PLAN_WEEK_GET',
        //     method: 'POST',
        //     async: false,
        //     params: {
        //         V_V_WEEKPLAN_GUID: V_WEEKPLAN_GUID
        //     },
        //     success: function (resp) {
        //         var resp = Ext.decode(resp.responseText);
        //         if (resp.list.length == 1) {
        //             V_JXGX_CODE = resp.list[0].V_JXGX_CODE;      //检修工序编码
        //             V_JXMX_CODE = resp.list[0].V_JXMX_CODE;      //检修模型编码
        //             var V_FLOWCODE = resp.list[0].V_FLOWCODE;        //流动编码
        //             var V_MONTHPLAN_CODE = resp.list[0].V_MONTHPLAN_CODE; //月计划编码
        //             var V_DEFECTPLAN_CODE = resp.list[0].V_DEFECTPLAN_CODE;//缺陷计划编码
        //             var V_MONTH_PLANNAME = resp.list[0].V_MONTH_PLANNAME;        //月计划名称
        //             var V_DEFECT_PLANNAME = resp.list[0].V_DEFECT_PLANNAME;   //缺陷计划名称
        //             var V_HOUR = resp.list[0].V_HOUR;
        //             var V_BZ = resp.list[0].V_BZ;
        //             //---
        //             var A_YEAR = resp.list[0].V_YEAR;                 //年
        //             var A_MONTH = resp.list[0].V_MONTH;              //月
        //             var A_WEEK = resp.list[0].V_WEEK;                //季度
        //             var A_ORGCODE = resp.list[0].V_ORGCODE;          //厂矿编码
        //             var A_DEPTCODE = resp.list[0].V_DEPTCODE;        //作业区编码
        //             //--
        //             var V_REPAIRMAJOR_CODE = resp.list[0].V_REPAIRMAJOR_CODE;        //专业编码
        //             var V_EQUTYPECODE = resp.list[0].V_EQUTYPECODE;        //设备类型编码
        //             var V_EQUCODE = resp.list[0].V_EQUCODE;        //设备名称编码
        //             var V_CONTENT = resp.list[0].V_CONTENT;        //检修内容
        //             // var V_JXMX_NAME = resp.list[0].V_MX_NAME;      //检修模型名称
        //             var V_STARTTIME = resp.list[0].V_STARTTIME;     //开始时间
        //             var V_STARTTIME_DATE = V_STARTTIME.split(" ")[0];
        //             var V_STARTTIME_HOUR = V_STARTTIME.split(" ")[1].split(":")[0];
        //             var V_STARTTIME_MINUTE = V_STARTTIME.split(" ")[1].split(":")[1];
        //             var V_ENDTIME = resp.list[0].V_ENDTIME;         //结束时间
        //             var V_ENDTIME_DATE = V_ENDTIME.split(" ")[0];
        //             var V_ENDTIME_HOUR = V_ENDTIME.split(" ")[1].split(":")[0];
        //             var V_ENDTIME_MINUTE = V_ENDTIME.split(" ")[1].split(":")[1];
        //
        //
        //             Ext.getCmp('year').select(A_YEAR); //年
        //             Ext.getCmp('month').select(A_MONTH);  //月
        //             Ext.getCmp('week').select(A_WEEK);  //周
        //             Ext.getCmp('ck').select(A_ORGCODE);  //厂矿编码
        //             Ext.getCmp('zyq').select(A_DEPTCODE);  //作业区编码
        //             Ext.getCmp('zy').select(V_REPAIRMAJOR_CODE);  //专业编码
        //             Ext.getCmp('sblx').select(V_EQUTYPECODE);  //设备类型编码
        //             Ext.getCmp('sbmc').select(V_EQUCODE);  //设备名称编码
        //             Ext.getCmp('jxnr').setValue(V_CONTENT);  //检修内容
        //             // var a_s=new Date(resp.list[0].V_STARTTIME)
        //             // Ext.getCmp('jhtgdate').setValue(a_s); //停工时间
        //             Ext.getCmp('jhtgdate').setValue(V_STARTTIME_DATE);  //停工时间
        //             Ext.getCmp('jhtghour').select(V_STARTTIME_HOUR);  //停工时间小时
        //             Ext.getCmp('jhtgminute').select(V_STARTTIME_MINUTE);  //停工时间分钟
        //             Ext.getCmp('jhjgdate').setValue(V_ENDTIME_DATE);  //竣工时间
        //             Ext.getCmp('jhjghour').select(V_ENDTIME_HOUR);  //竣工时间小时
        //             Ext.getCmp('jhjgminute').select(V_ENDTIME_MINUTE);  //竣工时间分钟
        //             Ext.getCmp('jhgshj').setValue(V_HOUR);  //竣工时间分钟
        //             Ext.getCmp('bz').setValue(V_BZ);  //竣工时间分钟
        //
        //             Ext.getCmp('maindefect').setValue(resp.list[0].V_MAIN_DEFECT); Ext.getCmp('maindefect').setReadOnly(true);  //主要缺陷
        //             Ext.getCmp('expectage').setValue(resp.list[0].V_EXPECT_AGE);  //预计寿命
        //             Ext.getCmp('repairper').setValue(resp.list[0].V_REPAIR_PER);  //维修人数
        //
        //             //---update 2018-0910
        //             Ext.getCmp('pdc').setValue(resp.list[0].V_PDC); //皮带周长
        //             Ext.getCmp('gyyq').setValue(resp.list[0].V_GYYQ); //工艺要求
        //             Ext.getCmp('pdgg').setValue(resp.list[0].V_PDGG);//皮带规格
        //             Ext.getCmp('changpdc').setValue(resp.list[0].V_CHANGPDC);//更换皮带长度（米）
        //             Ext.getCmp('jxhour').setValue(resp.list[0].V_JXHOUR); //检修时间（小时）
        //             Ext.getCmp('jjhour').setValue(resp.list[0].V_JJHOUR);//胶接时间（小时）
        //             Ext.getCmp('telname').setValue(resp.list[0].V_TELNAME);//联系人姓名
        //             Ext.getCmp('telnumb').setValue(resp.list[0].V_TELNUMB);//联系人电话
        //             //----2018-10-26
        //             Ext.getCmp('sgyy').setValue(resp.list[0].V_THICKNESS); //--施工原因
        //             Ext.getCmp('hd').setValue(resp.list[0].V_REASON);  //厚度
        //             if(resp.list[0].V_EVERTIME!=""){
        //                 var V_EVERTIME=resp.list[0].V_EVERTIME;
        //                 var V_EVERTIME_DATE = V_EVERTIME.split(" ")[0]; //上次时间
        //                 Ext.getCmp('evertime').setValue(V_EVERTIME_DATE);//上次施工时间
        //             }else
        //             {Ext.getCmp('evertime').setValue("");  }
        //             //end up
        //             //20181113
        //             Ext.getCmp('iflag').setValue(resp.list[0].V_FLAG);  //施工准备是否已落实
        //             Ext.getCmp('sgfs').select(resp.list[0].V_SGWAY);  //施工方式
        //             Ext.getCmp('repairDept').select(resp.list[0].V_REPAIRDEPATCODE); //检修单位
        //             Ext.getCmp('gx').select(resp.list[0].V_OPERANAME);// 工序
        //
        //             if (V_MONTHPLAN_CODE != '') {
        //                 V_PLANTYPE = 'PLAN';
        //             } else if (V_DEFECTPLAN_CODE != '') {
        //                 V_PLANTYPE = 'DEFECT';
        //             }
        //         }
        //     }
        // });
        // if(WSIGN=="1"){
        //     Ext.getCmp('xgqxbtn').setHiddenState(false);
        //     Ext.getCmp('xgqxbtn').onShow()
        // }
    }


    Ext.getCmp('jhjgdate').setMinValue(Ext.getCmp('jhtgdate').getSubmitValue());

    //Ext.getCmp('jhtgdate').setMaxValue(Ext.getCmp('jhjgdate').getSubmitValue());

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
});
//编辑周计划取值
function retEditWDate(V_WEEKPLAN_GUID){
    Ext.Ajax.request({
        url: AppUrl + 'PM_03/PRO_PM_03_PLAN_WEEK_GET',
        method: 'POST',
        async: false,
        params: {
            V_V_WEEKPLAN_GUID: V_WEEKPLAN_GUID
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.list.length == 1) {
                V_JXGX_CODE = resp.list[0].V_JXGX_CODE;      //检修工序编码
                V_JXMX_CODE = resp.list[0].V_JXMX_CODE;      //检修模型编码
                var V_FLOWCODE = resp.list[0].V_FLOWCODE;        //流动编码
                var V_MONTHPLAN_CODE = resp.list[0].V_MONTHPLAN_CODE; //月计划编码
                var V_DEFECTPLAN_CODE = resp.list[0].V_DEFECTPLAN_CODE;//缺陷计划编码
                var V_MONTH_PLANNAME = resp.list[0].V_MONTH_PLANNAME;        //月计划名称
                var V_DEFECT_PLANNAME = resp.list[0].V_DEFECT_PLANNAME;   //缺陷计划名称
                var V_HOUR = resp.list[0].V_HOUR;
                var V_BZ = resp.list[0].V_BZ;
                //---
                var A_YEAR = resp.list[0].V_YEAR;                 //年
                var A_MONTH = resp.list[0].V_MONTH;              //月
                var A_WEEK = resp.list[0].V_WEEK;                //季度
                var A_ORGCODE = resp.list[0].V_ORGCODE;          //厂矿编码
                var A_DEPTCODE = resp.list[0].V_DEPTCODE;        //作业区编码
                //--
                var V_REPAIRMAJOR_CODE = resp.list[0].V_REPAIRMAJOR_CODE;        //专业编码
                var V_EQUTYPECODE = resp.list[0].V_EQUTYPECODE;        //设备类型编码
                var V_EQUCODE = resp.list[0].V_EQUCODE;        //设备名称编码
                var V_CONTENT = resp.list[0].V_CONTENT;        //检修内容
                // var V_JXMX_NAME = resp.list[0].V_MX_NAME;      //检修模型名称
                var V_STARTTIME = resp.list[0].V_STARTTIME;     //开始时间
                var V_STARTTIME_DATE = V_STARTTIME.split(" ")[0];
                var V_STARTTIME_HOUR = V_STARTTIME.split(" ")[1].split(":")[0];
                var V_STARTTIME_MINUTE = V_STARTTIME.split(" ")[1].split(":")[1];
                var V_ENDTIME = resp.list[0].V_ENDTIME;         //结束时间
                var V_ENDTIME_DATE = V_ENDTIME.split(" ")[0];
                var V_ENDTIME_HOUR = V_ENDTIME.split(" ")[1].split(":")[0];
                var V_ENDTIME_MINUTE = V_ENDTIME.split(" ")[1].split(":")[1];


                Ext.getCmp('year').select(A_YEAR); //年
                Ext.getCmp('month').select(A_MONTH);  //月
                Ext.getCmp('week').select(A_WEEK);  //周
                Ext.getCmp('ck').select(A_ORGCODE);  //厂矿编码
                Ext.getCmp('zyq').select(A_DEPTCODE);  //作业区编码
                Ext.getCmp('zy').select(V_REPAIRMAJOR_CODE);  //专业编码
                Ext.getCmp('sblx').select(V_EQUTYPECODE);  //设备类型编码
                Ext.getCmp('sbmc').select(V_EQUCODE);  //设备名称编码
                Ext.getCmp('jxnr').setValue(V_CONTENT);  //检修内容
                // var a_s=new Date(resp.list[0].V_STARTTIME)
                // Ext.getCmp('jhtgdate').setValue(a_s); //停工时间
                Ext.getCmp('jhtgdate').setValue(V_STARTTIME_DATE);  //停工时间
                Ext.getCmp('jhtghour').select(V_STARTTIME_HOUR);  //停工时间小时
                Ext.getCmp('jhtgminute').select(V_STARTTIME_MINUTE);  //停工时间分钟
                Ext.getCmp('jhjgdate').setValue(V_ENDTIME_DATE);  //竣工时间
                Ext.getCmp('jhjghour').select(V_ENDTIME_HOUR);  //竣工时间小时
                Ext.getCmp('jhjgminute').select(V_ENDTIME_MINUTE);  //竣工时间分钟
                Ext.getCmp('jhgshj').setValue(V_HOUR);  //竣工时间分钟
                Ext.getCmp('bz').setValue(V_BZ);  //竣工时间分钟

                Ext.getCmp('maindefect').setValue(resp.list[0].V_MAIN_DEFECT); Ext.getCmp('maindefect').setReadOnly(true);  //主要缺陷
                Ext.getCmp('expectage').setValue(resp.list[0].V_EXPECT_AGE);  //预计寿命
                Ext.getCmp('repairper').setValue(resp.list[0].V_REPAIR_PER);  //维修人数

                //---update 2018-0910
                Ext.getCmp('pdc').setValue(resp.list[0].V_PDC); //皮带周长
                Ext.getCmp('gyyq').setValue(resp.list[0].V_GYYQ); //工艺要求
                Ext.getCmp('pdgg').setValue(resp.list[0].V_PDGG);//皮带规格
                Ext.getCmp('changpdc').setValue(resp.list[0].V_CHANGPDC);//更换皮带长度（米）
                Ext.getCmp('jxhour').setValue(resp.list[0].V_JXHOUR); //检修时间（小时）
                Ext.getCmp('jjhour').setValue(resp.list[0].V_JJHOUR);//胶接时间（小时）
                Ext.getCmp('telname').setValue(resp.list[0].V_TELNAME);//联系人姓名
                Ext.getCmp('telnumb').setValue(resp.list[0].V_TELNUMB);//联系人电话
                //----2018-10-26
                Ext.getCmp('sgyy').setValue(resp.list[0].V_THICKNESS); //--施工原因
                Ext.getCmp('hd').setValue(resp.list[0].V_REASON);  //厚度
                if(resp.list[0].V_EVERTIME!=""){
                    var V_EVERTIME=resp.list[0].V_EVERTIME;
                    var V_EVERTIME_DATE = V_EVERTIME.split(" ")[0]; //上次时间
                    Ext.getCmp('evertime').setValue(V_EVERTIME_DATE);//上次施工时间
                }else
                {Ext.getCmp('evertime').setValue("");  }
                //end up
                //20181113
                Ext.getCmp('iflag').setValue(resp.list[0].V_FLAG);  //施工准备是否已落实
                Ext.getCmp('sgfs').select(resp.list[0].V_SGWAY);  //施工方式
                Ext.getCmp('repairDept').select(resp.list[0].V_REPAIRDEPATCODE); //检修单位
                Ext.getCmp('gx').select(resp.list[0].V_OPERANAME);// 工序

                if (V_MONTHPLAN_CODE != '') {
                    V_PLANTYPE = 'PLAN';
                } else if (V_DEFECTPLAN_CODE != '') {
                    V_PLANTYPE = 'DEFECT';
                }
            }
        }
    });
    if(WSIGN=="1"){
        Ext.getCmp('xgqxbtn').setHiddenState(false);
        Ext.getCmp('xgqxbtn').onShow()
    }
}
function pageLoadInfo() {
    // if (V_WEEKPLAN_GUID == '0'&&returnSing=="0") {
    //     if (YEAR == null || YEAR == '') {
    //         Ext.getCmp('year').setValue(new Date().getFullYear());
    //     } else {
    //         Ext.getCmp('year').setValue(YEAR);
    //     }
    //     if (MONTH == null || MONTH == '') {
    //         Ext.getCmp('month').setValue(new Date().getMonth() + 1);
    //     } else {
    //         Ext.getCmp('month').setValue(MONTH);
    //     }
    //     if (WEEK == null || WEEK == '') {
    //         Ext.getCmp('week').setValue(getWeekOfMonth());
    //     } else {
    //         Ext.getCmp('week').setValue(WEEK);
    //     }
    // }

    Ext.data.StoreManager.lookup('ckStore').on('load', function () {
        if(WSIGN=="0"&&MONGUID==""){
            Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
        }
        // if (V_WEEKPLAN_GUID == '0'&&returnSing=="0") {
        // if(WSIGN=="0"){
        //     if (V_ORGCODE == null || V_ORGCODE == '') {
        //         Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
        //     } else {
        //         var index = Ext.data.StoreManager.lookup('ckStore').findBy(function (record, id) {
        //             return record.get('V_DEPTCODE') == V_ORGCODE;
        //         });
        //         if (index == -1) {
        //             Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
        //         } else {
        //             Ext.getCmp('ck').select(V_ORGCODE);
        //         }
        //     }
        // }
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });
    Ext.getCmp('ck').on('change', function () {
        // if(WSIGN=="0"&&MONGUID==""){
            Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
        // }
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
        // Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
    });
    Ext.data.StoreManager.lookup('zyqStore').on('load', function () {
        if(WSIGN=="0"&&MONGUID==""){
            Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
        }
        // if (V_WEEKPLAN_GUID == '0'&&returnSing=="0") {
        //     if (V_DEPTCODE == null || V_DEPTCODE == '') {
        //         Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
        //     } else {
        //         var index = Ext.data.StoreManager.lookup('zyqStore').findBy(function (record, id) {
        //             return record.get('V_DEPTCODE') == V_DEPTCODE;
        //         });
        //         if (index == -1) {
        //             Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
        //         } else {
        //             Ext.getCmp('zyq').select(V_DEPTCODE);
        //         }
        //     }
        // }
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
        //--加载检修单位
        Ext.data.StoreManager.lookup('repairDeptStore').load({
            params:{
                V_V_DEPTCODE:Ext.getCmp('zyq').getValue()
            }
        });
    });
    Ext.data.StoreManager.lookup('gxStore').load({
        params:{
            V_PERCODE:Ext.util.Cookies.get('v_personcode'),
            V_DPPTCODE:Ext.util.Cookies.get('v_deptcode'),
            V_ORGCODE:Ext.util.Cookies.get('v_orgCode'),
            V_FLAG:'0'
        }
    });
    Ext.data.StoreManager.lookup('repairDeptStore').on('load', function () {
        Ext.getCmp('repairDept').select(Ext.data.StoreManager.lookup('repairDeptStore').getAt(0));
    });
    //专业
    Ext.data.StoreManager.lookup('zyStore').on('load', function () {
        if(WSIGN=="0"&&MONGUID=="") {
            Ext.getCmp('zy').select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
        }
    });
    //作业区改变
    Ext.getCmp('zyq').on('change', function () {
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
        Ext.data.StoreManager.lookup('repairDeptStore').load({
            params:{
                V_V_DEPTCODE:Ext.getCmp('zyq').getValue()
            }
        });
    });
    //设备类型改变
    Ext.getCmp('sblx').on('change', function () {
        // if(WSIGN=="0"&&MONGUID==""){
        //     Ext.getCmp("sblx").select(Ext.data.StoreManager.lookup('sblxStore').getAt(0));
        // }
        Ext.data.StoreManager.lookup('sbmcStore').load({
            params: {
                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                v_v_deptcodenext: Ext.getCmp('zyq').getValue(),
                v_v_equtypecode: Ext.getCmp('sblx').getValue()
            }
        });
    });
    //设备类型加载监听
    Ext.data.StoreManager.lookup('sblxStore').on('load', function () {
        // if (V_WEEKPLAN_GUID == '0'&&returnSing=="0") {
        //     Ext.getCmp("sblx").select(Ext.data.StoreManager.lookup('sblxStore').getAt(0));
        // }
        if(WSIGN=="0"&&MONGUID==""){
            Ext.getCmp("sblx").select(Ext.data.StoreManager.lookup('sblxStore').getAt(0));
        }
        Ext.data.StoreManager.lookup('sbmcStore').load({
            params: {
                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                v_v_deptcodenext: Ext.getCmp('zyq').getValue(),
                v_v_equtypecode: Ext.getCmp('sblx').getValue()
            }
        });
    });
    //设备名称加载监听
    Ext.data.StoreManager.lookup('sbmcStore').on('load', function () {
        if(WSIGN=="0"&&MONGUID==""){
            Ext.getCmp("sbmc").select(Ext.data.StoreManager.lookup('sbmcStore').getAt(0));
        }
    });
    //设备名称加载监听
    // Ext.data.StoreManager.lookup('sbmcStore').on('load', function () {
    //     if (V_WEEKPLAN_GUID == '0'&&returnSing=="0") {
    //         Ext.getCmp("sbmc").select(Ext.data.StoreManager.lookup('sbmcStore').getAt(0));
    //     }
    // });
    // Ext.data.StoreManager.lookup('zyStore').on('load', function () {
    //     if (V_WEEKPLAN_GUID == '0'&&returnSing=="0") {
    //         Ext.getCmp("zy").select(Ext.data.StoreManager.lookup('zyStore').getAt(0));
    //     }
    // });

    // Ext.data.StoreManager.lookup('gxStore').on('load',function(){
    //     if (V_WEEKPLAN_GUID == '0'&&returnSing=="0") {
    //         Ext.getCmp('gx').select(Ext.data.StoreManager.lookup('gxStore').getAt(0));
    //     }
    // });
//     if (V_WEEKPLAN_GUID == '0'&&returnSing=="0") {
// //--update 2018-09-17
//         Ext.getCmp('jhtgdate').setValue(new Date(startUpTime)); 		//编辑窗口计划停工时间默认值
//         Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
//         Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
//         Ext.getCmp('jhjgdate').setValue(new Date(endUpTime));       //编辑窗口计划竣工时间默认值
//         Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
//         Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
//     }
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
function jhSelect() {
    var V_V_ORGCODE=Ext.getCmp('ck').getValue()=='%'?"0":Ext.getCmp('ck').getValue();
    var V_V_DEPTCODE=Ext.getCmp('zyq').getValue()=='%'?"0":Ext.getCmp('zyq').getValue();
    var V_V_EQUTYPE=Ext.getCmp('sblx').getValue()=='%'?"0":Ext.getCmp('sblx').getValue();
    var V_V_EQUCODE=Ext.getCmp('sbmc').getValue()=='%'?"0":Ext.getCmp('sbmc').getValue();
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_03010316/index.html?V_V_YEAR=' + Ext.getCmp('year').getValue()
        + '&V_V_ORGCODE=' +V_V_ORGCODE// Ext.getCmp('ck').getValue()
        + '&V_V_DEPTCODE=' +V_V_DEPTCODE //Ext.getCmp('zyq').getValue()
        + '&V_V_EQUTYPE=' + V_V_EQUTYPE// Ext.getCmp('sblx').getValue()
        + '&V_V_EQUCODE=' + V_V_EQUCODE//Ext.getCmp('sbmc').getValue()
        + '&V_V_ZY=' + Ext.getCmp('zy').getValue()
        + '&V_V_JXNR=' + Ext.getCmp('jxnr').getValue(), '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}
/*function mxSelect() {
 var owidth = window.document.body.offsetWidth - 200;
 var oheight = window.document.body.offsetHeight - 100;
 var ret = window.open(AppUrl + 'page/PM_03010312/index.html?V_ORGCODE=' + Ext.getCmp('ck').getValue()
 + '&V_DEPTCODE=' + Ext.getCmp('zyq').getValue()
 + '&V_EQUTYPE=' + Ext.getCmp('sblx').getValue()
 + '&V_EQUCODE=' + Ext.getCmp('sbmc').getValue(), '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
 }*/
function getReturnJHXZ(retdata, type) {
    if (type == 'MONTH') {
        getOtherguid=retdata;
        getOtherType=type;
        returnSing="1";
        Ext.Ajax.request({
            url: AppUrl + 'PM_03/PM_03_PLAN_CHOOSE_SEL',
            method: 'POST',
            async: false,
            params: {
                V_V_GUID: getOtherguid,
                V_V_PLANTYPE: getOtherType
            },
            success: function (ret) {
                var resp = Ext.decode(ret.responseText);
                if (resp.list.length > 0) {
                    var V_ORGCODE = resp.list[0].V_ORGCODE;
                    var V_DEPTCODE = resp.list[0].V_DEPTCODE;
                    var V_EQUTYPE = resp.list[0].V_EQUTYPECODE;
                    var V_EQUCODE = resp.list[0].V_EQUCODE;
                    var V_REPAIRMAJOR_CODE = resp.list[0].V_REPAIRMAJOR_CODE;
                    var V_HOUR = resp.list[0].V_HOUR;
                    var V_CONTENT = resp.list[0].V_CONTENT;
                    var V_BZ = resp.list[0].V_BZ;

                    var V_STARTTIME = resp.list[0].V_STARTTIME;     //开始时间
                    var V_STARTTIME_DATE = V_STARTTIME.split(" ")[0];
                    var V_STARTTIME_HOUR = V_STARTTIME.split(" ")[1].split(":")[0];
                    var V_STARTTIME_MINUTE = V_STARTTIME.split(" ")[1].split(":")[1];
                    var V_ENDTIME = resp.list[0].V_ENDTIME;         //结束时间
                    var V_ENDTIME_DATE = V_ENDTIME.split(" ")[0];
                    var V_ENDTIME_HOUR = V_ENDTIME.split(" ")[1].split(":")[0];
                    var V_ENDTIME_MINUTE = V_ENDTIME.split(" ")[1].split(":")[1];

                    // 2018-11-23 update data
                    var V_EXPECT_AGE=resp.list[0].V_EXPECT_AGE;
                    var expect_age=parseInt(V_EXPECT_AGE)*8;
                    var V_MAIN_DEFECT=resp.list[0].V_MAIN_DEFECT==""?"":resp.list[0].V_MAIN_DEFECT;
                    var V_REPAIR_PER=resp.list[0].V_REPAIR_PER;
                    var V_SGWAY=resp.list[0].V_SGWAY==""?"":resp.list[0].V_SGWAY;
                    // V_PLANCODE = resp.list[0].V_PLANCODE;
                    // V_PLANTYPE = resp.list[0].V_PLANTYPE;

                    Ext.getCmp('ck').select(V_ORGCODE);
                    Ext.getCmp('zyq').select(V_DEPTCODE);
                    Ext.getCmp("zy").select(V_REPAIRMAJOR_CODE);
                    Ext.getCmp("sblx").select(V_EQUTYPE);
                    Ext.getCmp("sbmc").select(V_EQUCODE);
                    Ext.getCmp('jxnr').setValue(V_CONTENT);  //检修内容
                    Ext.getCmp('jhgshj').setValue(V_HOUR);  //计划工时合计
                    Ext.getCmp('bz').setValue(V_BZ);  //备注
                    // Ext.getCmp('ck').select(resp.list[0].V_ORGCODE);
                    // Ext.getCmp('zyq').select(resp.list[0].V_DEPTCODE);
                    // Ext.getCmp("zy").select(resp.list[0].V_REPAIRMAJOR_CODE);
                    // Ext.getCmp("sblx").select(resp.list[0].V_EQUTYPECODE);
                    // Ext.getCmp("sbmc").select(resp.list[0].V_EQUCODE);
                    // Ext.getCmp('jxnr').setValue(resp.list[0].V_CONTENT);  //检修内容
                    // Ext.getCmp('jhgshj').setValue(resp.list[0].V_HOUR);  //计划工时合计
                    // Ext.getCmp('bz').setValue(resp.list[0].V_BZ);  //备注
                    Ext.getCmp('expectage').setValue(expect_age);   //预计寿命
                    Ext.getCmp('maindefect').setValue(V_MAIN_DEFECT);  //主要缺陷
                    Ext.getCmp('repairper').setValue(V_REPAIR_PER);   //维修人数
                    Ext.getCmp('sgfs').select(V_SGWAY);  //施工方式
                    Ext.getCmp('gx').select(resp.list[0].V_OPERANAME);// 工序

                    Ext.getCmp('jhtgdate').setValue(V_STARTTIME_DATE);  //停工时间
                    Ext.getCmp('jhtghour').select(V_STARTTIME_HOUR);  //停工时间小时
                    Ext.getCmp('jhtgminute').select(V_STARTTIME_MINUTE);  //停工时间分钟
                    Ext.getCmp('jhjgdate').setValue(V_ENDTIME_DATE);  //竣工时间
                    Ext.getCmp('jhjghour').select(V_ENDTIME_HOUR);  //竣工时间小时
                    Ext.getCmp('jhjgminute').select(V_ENDTIME_MINUTE);  //竣工时间分钟


                }

            }
        });
    } else {
        getOtherguid=retdata;
        getOtherType=type;
        Ext.Ajax.request({
            url: AppUrl + 'cjy/PM_03_PLAN_CHOOSE_SEL_NEW',
            method: 'POST',
            async: false,
            params: {
                V_V_GUID: getOtherguid,
                V_V_PLANTYPE: getOtherType
            },
            success: function (ret) {
                var resp = Ext.decode(ret.responseText);

                if (resp.list.length > 0) {
                    var V_ORGCODE = resp.list[0].V_ORGCODE;
                    var V_DEPTCODE = resp.list[0].V_DEPTCODE;
                    var V_EQUTYPE = resp.list[0].V_EQUTYPE;
                    var V_EQUCODE = resp.list[0].V_EQUCODE;
                    var V_REPAIRMAJOR_CODE = resp.list[0].V_MAJOR_CODE;
                    var V_HOUR = resp.list[0].V_HOUR;
                    var V_CONTENT = resp.list[0].V_CONTENT;
                    var V_BZ = resp.list[0].V_BZ;

                    var V_STARTTIME = resp.list[0].V_DATE_B;     //开始时间
                    var V_STARTTIME_DATE = V_STARTTIME.split(" ")[0];
                    var V_STARTTIME_HOUR = V_STARTTIME.split(" ")[1].split(":")[0];
                    var V_STARTTIME_MINUTE = V_STARTTIME.split(" ")[1].split(":")[1];
                    var V_ENDTIME = resp.list[0].V_DATE_E;         //结束时间
                    var V_ENDTIME_DATE = V_ENDTIME.split(" ")[0];
                    var V_ENDTIME_HOUR = V_ENDTIME.split(" ")[1].split(":")[0];
                    var V_ENDTIME_MINUTE = V_ENDTIME.split(" ")[1].split(":")[1];
                    // V_PLANCODE = resp.list[0].V_PLANCODE;
                    // V_PLANTYPE = resp.list[0].V_PLANTYPE;

                    Ext.getCmp('ck').select(V_ORGCODE);
                    //Ext.getCmp('zyq').select(V_DEPTCODE);
                    Ext.getCmp("zy").setValue(V_REPAIRMAJOR_CODE);
                    //Ext.getCmp("sblx").select(V_EQUTYPE);
                    //Ext.getCmp("sbmc").select(V_EQUCODE);
                    Ext.getCmp('jxnr').setValue(V_CONTENT);  //检修内容
                    Ext.getCmp('jhgshj').setValue(V_HOUR);  //计划工时合计
                    //Ext.getCmp('bz').setValue(V_BZ);  //备注
                    Ext.getCmp('gx').select(resp.list[0].V_OPERANAME);// 工序

                    Ext.getCmp('jhtgdate').setValue(V_STARTTIME_DATE);  //停工时间
                    Ext.getCmp('jhtghour').select(V_STARTTIME_HOUR);  //停工时间小时
                    Ext.getCmp('jhtgminute').select(V_STARTTIME_MINUTE);  //停工时间分钟
                    Ext.getCmp('jhjgdate').setValue(V_ENDTIME_DATE);  //竣工时间
                    Ext.getCmp('jhjghour').select(V_ENDTIME_HOUR);  //竣工时间小时
                    Ext.getCmp('jhjgminute').select(V_ENDTIME_MINUTE);  //竣工时间分钟

                }

            }
        });
    }
    // V_WEEKPLAN_GUID="0";

}
/*function getReturnMXXZ(retdata) {
 Ext.Ajax.request({
 url: AppUrl + 'PM_03/PM_03_JXMX_DATA_MXCODE_SEL',
 method: 'POST',
 async: false,
 params: {
 V_V_MX_CODE: retdata
 },
 success: function (ret) {
 var resp = Ext.decode(ret.responseText);
 var V_ORGCODE = resp.list[0].V_ORGCODE;
 var V_DEPTCODE = resp.list[0].V_DEPTCODE;
 var V_EQUTYPE = resp.list[0].V_EQUTYPE;
 var V_EQUCODE = resp.list[0].V_EQUCODE;
 var V_REPAIRMAJOR_CODE = resp.list[0].V_REPAIRMAJOR_CODE;
 var V_HOUR = resp.list[0].V_HOUR;
 var V_CONTENT = resp.list[0].V_JXGX_NR;
 var V_BZ = resp.list[0].V_BZ;

 Ext.getCmp('ck').select(V_ORGCODE);  //厂矿编码
 Ext.getCmp('zyq').select(V_DEPTCODE);  //作业区编码
 Ext.getCmp('zy').select(V_REPAIRMAJOR_CODE);  //专业编码
 Ext.getCmp('sblx').select(V_EQUTYPE);  //设备类型编码
 Ext.getCmp('sbmc').select(V_EQUCODE);  //设备名称编码
 Ext.getCmp('jxnr').setValue(V_CONTENT);  //检修内容
 Ext.getCmp('jhgshj').setValue(V_HOUR);  //计划工时合计
 Ext.getCmp('bz').setValue(V_BZ);  //备注
 }
 });
 }*/
function tempSave(){

    if( WeekYear!=undefined && WeekMonth!=undefined ){
        if( Ext.getCmp('year').getValue()!=WeekYear||Ext.getCmp('month').getValue()!=WeekMonth ){
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
        else{
            timeCompare();
        }
    }else{
        timeCompare();
    }


}
function timeCompare(){
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
    else{
        OnButtonSaveClick();
    }
}
function OnButtonSaveClick() {

    if( Ext.getCmp('sblx').getValue()=="%"&&Ext.getCmp('sbmc').getValue()=="%"){
        Ext.Msg.alert('消息','设备类型和设备名称不可以为全部，请选择相关名称');
        return;
    }
    if(Ext.getCmp("expectage").getValue()<0){
        Ext.Msg.alert('消息','预计寿命不可为负数');
        return;
    }
    if(Ext.getCmp("repairper").getValue()<0){
        Ext.Msg.alert('消息','维修人数不可为负数');
        return;
    }
    // if(Ext.getCmp('expectage').getValue()=="0"){
    //     Ext.Msg.alert('消息','预计寿命不可为0，请选择相关信息');
    //     return;
    // }
    if(Ext.getCmp('repairper').getValue()=="0"){
        Ext.Msg.alert('消息','维修人数不可为0，请选择相关信息');
        return;
    }
    if(Ext.getCmp('maindefect').getValue()==""){
        Ext.Msg.alert('消息','主要缺陷不可为空，请输入后保存');
        return;
    }
    if(Ext.getCmp('jxnr').getValue()==""){
        Ext.Msg.alert('消息','检修内容不可为空，请输入后保存');
        return;
    }
    if(Ext.getCmp('zy').getValue()==""){
        Ext.Msg.alert('消息','专业不可为空，请选择相关信息');
        return;
    }
    //获取流动编码
    /*var V_FLOWCODE="";
     Ext.Ajax.request({
     method: 'POST',
     async: false,
     url: AppUrl + 'basic/PM_03_FLOWCODE_SEL',
     params: {
     V_V_PLANTYPE:'WEEK',                                                //计划类型
     V_V_ORGCODE:Ext.getCmp('ck').getValue(),                            //厂矿
     V_V_DEPTCODE:Ext.getCmp('zyq').getValue(),                          //作业区
     V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode')              //人员编码cookies
     },
     success: function (resp) {
     V_FLOWCODE= Ext.decode(resp.responseText).list[0].V_INFO;
     }
     });*/
    //  if(Ext.Date.format(new Date(),'Y-m-d H:i:s')>Ext.Date.format(new Date(startUpTime),'Y-m-d H:i:s')&&Ext.Date.format(new Date(),'Y-m-d H:i:s')<Ext.Date.format(new Date(endUpTime),'Y-m-d H:i:s')){
    //计划停工时间
    var jhtghour = Ext.getCmp('jhtghour').getValue();
    var jhtgminute = Ext.getCmp('jhtgminute').getValue();
    //var jhtgTime=Ext.Date.format(Ext.ComponentManager.get("jhtgdate").getValue(), 'Y-m-d')+" "+jhtghour+":"+jhtgminute;
    var jhtgTime = Ext.getCmp("jhtgdate").getSubmitValue() + " " + jhtghour + ":" + jhtgminute + ":00";
    //计划竣工时间
    var jhjghour = Ext.getCmp('jhjghour').getValue();
    var jhjgminute = Ext.getCmp('jhjgminute').getValue();
    //var jhjgTime=Ext.Date.format(Ext.ComponentManager.get("jhjgdate").getValue(), 'Y-m-d')+" "+jhjghour+":"+jhjgminute;
    var jhjgTime = Ext.getCmp("jhjgdate").getSubmitValue() + " " + jhjghour + ":" + jhjgminute + ":00";
    //计划类型（月/缺陷）
    var V_MONTHPLAN_CODE = "";
    var V_DEFECTPLAN_CODE = "";
    if (V_PLANTYPE == 'PLAN') {
        V_MONTHPLAN_CODE = V_PLANCODE;
    } else if (V_PLANTYPE == 'DEFECT') {
        V_V_DEFECTPLAN_CODE = V_PLANCODE;
    }
    if(Ext.getCmp('jhgshj').getValue()<="0"){
        alert('合计工时不可以为负数');
        return false;
    }
    //模型
    V_JXMX_CODE = guid();
    if(getOtherType == 'MONTH'&&getOtherguid!=""){
        Ext.Ajax.request({
            url: AppUrl + 'dxfile/PM_03_PLAN_MONTH_SIGN_UPDT',
            method:'POST',
            async: false,
            params: {
                V_V_GUID: getOtherguid
            },
            success: function (response) {
                var resp=Ext.decode(response.responseText);
                if(resp.RET=='SUCCESS'){
                }
            }
        });
    }


    //修改月计划分解标识
    if(MONGUID!=""){
        Ext.Ajax.request({
            url: AppUrl + 'dxfile/PM_03_PLAN_MONTH_SIGN_UPDT',
            method:'POST',
            async: false,
            params: {
                V_V_GUID: MONGUID
            },
            success: function (response) {
                var resp=Ext.decode(response.responseText);
                if(resp.RET=='SUCCESS'){
                }
            }
        });
    }
    //修改月计划缺陷标记
    Ext.Ajax.request({
        url:AppUrl+'dxfile/YEAR_TO_MONTH_CH_WEEK_SIGN',
        method:'POST',
        params:{
            V_WEEKGUID:wguid
        },
        success:function(response){
            var resp=Ext.decode(response.responseText);
            if(resp.RET=='SUCCESS'){

            }
        }
    });
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
            V_V_OTHERPLAN_TYPE:getOtherType ,// '',                                  //检修模型编码
            V_V_JHMX_GUID: '',                                          //检修标准
            V_V_HOUR: Ext.getCmp('jhgshj').getValue(),
            V_V_BZ: Ext.getCmp('bz').getValue(),
            V_V_DEFECTGUID: '',
            V_V_MAIN_DEFECT: Ext.getCmp('maindefect').getValue(),//主要缺陷
            V_V_EXPECT_AGE: Ext.getCmp('expectage').getValue(),//预计寿命
            V_V_REPAIR_PER: Ext.getCmp('repairper').getValue()//维修人数

            //--update 2018-0910
            , V_V_PDC:Ext.getCmp('pdc').getValue(), //皮带周长
            V_V_GYYQ:Ext.getCmp('gyyq').getValue(),//工艺要求
            V_V_CHANGPDC:Ext.getCmp('changpdc').getValue(), //更换皮带长度
            V_V_JXHOUR:Ext.getCmp('jxhour').getValue(),//检修时间
            V_V_JJHOUR:Ext.getCmp('jjhour').getValue(),//接胶时间
            V_V_TELNAME:Ext.getCmp('telname').getValue(),//联系人姓名
            V_V_TELNUMB:Ext.getCmp('telnumb').getValue(),//联系人电话
            V_V_PDGG:Ext.getCmp('pdgg').getValue()//皮带规格
            //--end up
            //---add2018-10-26
            , V_V_THICKNESS:Ext.getCmp('hd').getValue(),  //厚度
            V_V_REASON:Ext.getCmp('sgyy').getValue(),  //--施工原因
            V_V_EVERTIME:Ext.Date.format(Ext.getCmp('evertime').getValue(),'Y/m/d').toString(),  //上次施工时间
            //20181113
            V_V_FLAG:Ext.getCmp('iflag').getValue()==false?Ext.getCmp('iflag').uncheckedValue:Ext.getCmp('iflag').inputValue,
            V_V_RDEPATCODE:Ext.getCmp('repairDept').getValue(),
            V_V_RDEPATNAME:Ext.getCmp('repairDept').getDisplayValue(),
            V_V_SGWAY:Ext.getCmp('sgfs').getValue(),
            V_V_SGWAYNAME:Ext.getCmp('sgfs').getDisplayValue(),
            V_V_OPERANAME:Ext.getCmp('gx').getValue()  //工序
        },
        success: function (ret) {
            var resp = Ext.decode(ret.responseText);
            if (resp.V_INFO == '成功') {
                // if (MONGUID != ""&&MONGUID != undefined) {
                if(wguid!=""){
                    //缺陷修改
                    // if(Ext.urlDecode(location.href.split("?")[1]).V_WEEKPLAN_GUID==undefined) {
                        Ext.Ajax.request({
                            url: AppUrl + 'dxfile/PM_DEFECT_RE_WEEK_UPDATE',
                            method: 'POST',
                            async: false,
                            params: {
                                WEEK_GUID: wguid,
                                MONTH_GUID: MONGUID,
                                V_INPERCODE: Ext.util.Cookies.get("v_personcode")
                            },
                            success: function (response) {
                                var resp = Ext.decode(response.responseText);//后台返回的值
                                if (resp.RET == 'SUCCESS') {//成功，会传回true
                                    // window.opener.query();
                                    window.opener.retClose();
                                    window.close();
                                    window.opener.retClose();
                                }
                            }
                        });
                    // }
                }
                else{
                    if(WSIGN=="1"){
                        Ext.Msg.alert('操作信息', resp.V_INFO);
                        window.opener.query();
                        window.close();
                        window.opener.retClose();
                    }

                }
                //检修模型管理
                /*Ext.Ajax.request({
                 method: 'POST',
                 async: false,
                 url: AppUrl + 'basic/PM_1917_JXMX_DATA_SET',
                 params: {
                 V_V_JXMX_CODE:V_JXMX_CODE,
                 V_V_JXMX_NAME: Ext.getCmp('sbmc').getRawValue(),
                 V_V_ORGCODE: Ext.getCmp('ck').getValue(),
                 V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
                 V_V_EQUTYPECODE: Ext.getCmp('sblx').getValue(),
                 V_V_EQUCODE: Ext.getCmp('sbmc').getValue(),
                 V_V_EQUCODE_CHILD: '%',
                 V_V_REPAIRMAJOR_CODE:Ext.getCmp('zy').getValue(),
                 V_V_BZ:Ext.getCmp('bz').getValue(),
                 V_V_HOUR:Ext.getCmp('jhgshj').getValue(),
                 V_V_IN_PER: Ext.util.Cookies.get('v_personcode'),
                 V_V_IN_DATE: Ext.util.Format.date(new Date(), 'Y-m-d')
                 },
                 success: function (response) {
                 var resp = Ext.decode(response.responseText);
                 //检修工序管理
                 Ext.Ajax.request({
                 url: AppUrl + 'pm_19/PM_1917_JXGX_DATA_SET',
                 method: 'POST',
                 async: false,
                 params: {
                 V_V_JXGX_CODE:V_JXGX_CODE,
                 V_V_JXGX_NAME: "月计划检修工序",
                 V_V_JXGX_NR: Ext.getCmp('jxnr').getValue(),
                 V_V_GZZX_CODE:'',
                 V_V_JXMX_CODE:resp.list[0].V_INFO,
                 V_V_ORDER: '1',//排序
                 V_V_PERNUM:'0',//检修额定人数
                 V_V_PERTIME: Ext.util.Format.date(new Date(), 'Y-m-d')//检修额定时间
                 },
                 success: function (ret) {}
                 });
                 }
                 });*/
                //Ext.Msg.alert('操作信息', '保存成功');
                // window.opener.query();
                // window.close();
            } else {
                Ext.Msg.alert('操作信息', resp.V_INFO);
            }

        }
    });
    // }
    // else{
    //     Ext.Msg.alert('提示', '此计划不在上报时间内');
    // }


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
function OnModelSaveClick(){
    if( Ext.getCmp('sblx').getValue()=="%"&&Ext.getCmp('sbmc').getValue()=="%"){
        Ext.Msg.alert('消息','设备类型和设备名称不可以为全部，请选择相关名称');
        return;
    }

    if(Ext.getCmp('expectage').getValue()=="0"){
        Ext.Msg.alert('消息','预计寿命不可为0，请选择相关信息');
        return;
    }
    if(Ext.getCmp('repairper').getValue()=="0"){
        Ext.Msg.alert('消息','维修人数不可为0，请选择相关信息');
        return;
    }
    if(Ext.getCmp('maindefect').getValue()==""){
        Ext.Msg.alert('消息','主要缺陷不可为空，请输入后保存');
        return;
    }
    if(Ext.getCmp('jxnr').getValue()==""){
        Ext.Msg.alert('消息','检修内容不可为空，请输入后保存');
        return;
    }
    if(Ext.getCmp('zy').getValue()==""){
        Ext.Msg.alert('消息','专业不可为空，请选择相关信息');
        return;
    }
    Ext.getCmp('modeWin').show();


}
function onModeOKBtn(){
    if(Ext.getCmp('modename').getValue()==""){
        Ext.Msg.alert('消息','模型名称不可为空');
        return;
    }
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PM_1921_PLAN_IN_MX_SET',
        method: 'POST',
        async: false,
        params: {
            V_V_MX_NAME: Ext.getCmp('modename').getValue(),  //模型名称
            V_V_ORGCODE:Ext.getCmp('ck').getValue(),  //单位名称
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),  //作业区
            V_V_SPECIALTY: Ext.getCmp('zy').getValue(),  //专业
            V_V_MENO:Ext.getCmp('bz').getValue(),  // 备注
            V_V_INPER:Ext.util.Cookies.get('v_personcode'),  //录入人

            V_V_EQUTYPE: Ext.getCmp('sblx').getValue(),  //设备类型
            V_V_EQUCODE:Ext.getCmp('sbmc').getValue(),  //设备名称
            V_V_CONTEXT:Ext.getCmp('jxnr').getValue(),  //检修内容
            V_V_JXMX_CODE:"",  //检修模型
            V_V_PERNUM:Ext.getCmp('repairper').getValue(),  //维修人数
            V_V_LIFELONG:Ext.getCmp('expectage').getValue(), //预计寿命

            V_V_MAIN_DEFECT:Ext.getCmp('maindefect').getValue(), //主要缺陷
            V_V_SGWAY:Ext.getCmp('sgfs').getValue()  //施工方式

        },
        success: function (ret) {
            var resp = Ext.decode(ret.responseText);
            if(resp.RET=="SUCCESSEQU"){
                Ext.MessageBox.alert('提示', '模型保存成功');
            }
            else if(resp.RET=="FAILEQU"){
                Ext.MessageBox.alert('提示', '模型设备保存失败');
            }
            else if(resp.RET=="FAIL"){
                Ext.MessageBox.alert('提示', '模型保存失败');
            }
            Ext.getCmp('modeWin').hide();
        }
    });
}
//修改缺陷页面
function OnButtonChangeDef(){
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret =window.open(AppUrl + 'page/PM_03010318/defUpdate.html?V_WEEKPLAN_GUID=' + V_WEEKPLAN_GUID +'&Oyear='+Ext.getCmp("year").getValue()
        +'&Omonth='+Ext.getCmp("month").getValue()+'&V_V_ORGCODE='+Ext.getCmp("ck").getValue()+'&V_V_DEPTCODE='+Ext.getCmp("zyq").getValue()
        +'&V_V_EQUTYPE='+Ext.getCmp("sblx").getValue()+'&V_V_EQUCODE='+Ext.getCmp("sbmc").getValue()+'&V_V_ZY='+Ext.getCmp("zy").getValue()
        +'&WSIGN='+1+'',"newwindow", 'height=450px,width=650px,top=50px,left=100px,resizable=yes');
}

//新缺陷返回值
function getNewDefDate(WEEKGUID){
    retEditWDate(WEEKGUID);
    Ext.getCmp('maindefect').setReadOnly(false);
    Ext.Ajax.request({
        url:AppUrl+'dxfile/PM_03_PLAN_WEEK_GET_DEF',
        method:'POST',
        async:false,
        params:{
            WEEKGUID:WEEKGUID
        },
        success:function(respo){
            var resp=Ext.decode(respo.responseText);
            if(resp.list.length>0){
                Ext.getCmp('maindefect').setValue(resp.list[0].V_MAIN_DEFECT);
                Ext.getCmp('maindefect').setReadOnly(true); //主要缺陷

            }
        }
    });
}