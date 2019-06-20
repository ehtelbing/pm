/*备件生成周计划页面*/
var V_WEEKPLAN_GUID = 0;
if (location.href.split('?')[1] != undefined) {
    V_WEEKPLAN_GUID = Ext.urlDecode(location.href.split('?')[1]).V_WEEKPLAN_GUID;
}
var V_PLANTYPE = null;
if (location.href.split('?')[1] != undefined) {
    V_PLANTYPE = Ext.urlDecode(location.href.split('?')[1]).V_PLANTYPE;
}
var YEAR = null;
if (location.href.split('?')[1] != undefined) {
    YEAR = Ext.urlDecode(location.href.split('?')[1]).YEAR;
}
var MONTH = null;
if (location.href.split('?')[1] != undefined) {
    MONTH = Ext.urlDecode(location.href.split('?')[1]).MONTH;
}
var WEEK = null;
if (location.href.split('?')[1] != undefined) {
    WEEK = Ext.urlDecode(location.href.split('?')[1]).WEEK;
}
var V_ORGCODE = null;
if (location.href.split('?')[1] != undefined) {
    V_ORGCODE = Ext.urlDecode(location.href.split('?')[1]).V_ORGCODE;
}
var V_DEPTCODE = null;
if (location.href.split('?')[1] != undefined) {
    V_DEPTCODE = Ext.urlDecode(location.href.split('?')[1]).V_DEPTCODE;
}
var V_EQUTYPECODE = null;
if (location.href.split('?')[1] != undefined) {
    V_EQUTYPECODE = Ext.urlDecode(location.href.split('?')[1]).V_EQUTYPECODE;
}
var V_EQUCODE = null;
if (location.href.split('?')[1] != undefined) {
    V_EQUCODE = Ext.urlDecode(location.href.split('?')[1]).V_EQUCODE;
}
var KSTIME=null;
if(location.href.split('?')[1]!=undefined){
    KSTIME=Ext.urlDecode(location.href.split('?')[1]).KSTIME;
}
var V_JXMX_CODE = null;
var V_JXGX_CODE = null;

var V_PLANCODE = null;

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
for (var i = 1; i <= 6; i++) {
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
//工序
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

var editPanel = Ext.create('Ext.form.Panel', {
    id: 'editPanel',
    region: 'center',
    layout: 'border',
    frame: true,
    border: false,
    baseCls: 'my-panel-no-border',
    items: [
        {
            xtype: 'panel',
            layout: 'vbox',
            region: 'center',
            defaults: {labelAlign: 'right'},
            frame: true,
            border: false, /*baseCls: 'my-panel-no-border',*/
            margin: '0 0 0 0',
            autoScroll: true,
            items: [
                {
                    layout: 'column',
                    defaults: {labelAlign: 'right'},
                    frame: true,
                    border: false,
                    baseCls: 'my-panel-no-border',
                    items: [
                        /*{
                            xtype: 'button',
                            text: '计划选择',
                            margin: '10 0 10 90',
                            icon: imgpath + '/add.png',
                            handler: jhSelect
                        },*/
                        /*{xtype: 'button', text: '模型选择', margin: '10 0 10 10',icon:imgpath + '/add.png', handler:mxSelect},*/
                        {
                            xtype: 'button',
                            text: '保存',
                            icon: imgpath + '/saved.png',
                            width: 60,
                            margin: '10px 20px 0px 20px',
                            handler: OnButtonSaveClick
                        },
                        {
                            xtype: 'button',
                            text: '关闭',
                            icon: imgpath + '/cross.png',
                            width: 60,
                            margin: '10px 20px 0px 0px',
                            handler: OnButtonCancelClick
                        }
                    ]
                },
                {
                    layout: 'column',
                    defaults: {labelAlign: 'right'},
                    frame: true,
                    border: false,
                    baseCls: 'my-panel-no-border',
                    items: [
                        {
                            xtype: 'combo',
                            id: 'year',
                            readOnly:true,
                            fieldLabel: '年份',
                            editable: false,
                            margin: '10 0 5 5',
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
                            readOnly:true,
                            fieldLabel: '月份',
                            editable: false,
                            margin: '10 0 5 5',
                            labelWidth: 55,
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
                    layout: 'column',
                    defaults: {labelAlign: 'right'},
                    frame: true,
                    border: false,
                    baseCls: 'my-panel-no-border',
                    items: [
                        {
                            xtype: 'combo',
                            id: 'week',
                            readOnly:true,
                            fieldLabel: '周',
                            editable: false,
                            margin: '10 0 5 5',
                            labelWidth: 80,
                            width: 280,
                            displayField: 'displayField',
                            valueField: 'valueField',
                            value: '',
                            store: weekStore,
                            queryMode: 'local'
                        },
                        {
                            xtype: 'combo',
                            id: 'ck',
                            readOnly:true,
                            fieldLabel: '计划厂矿',
                            editable: false,
                            margin: '5 0 5 5',
                            labelWidth: 55,
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
                    layout: 'column',
                    defaults: {labelAlign: 'right'},
                    frame: true,
                    border: false,
                    baseCls: 'my-panel-no-border',
                    items: [
                        {
                            xtype: 'combo',
                            id: 'zyq',
                            readOnly:true,
                            fieldLabel: '作业区',
                            editable: false,
                            margin: '5 0 5 5',
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
                            margin: '5 0 5 5',
                            labelWidth: 55,
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
                    layout: 'column',
                    defaults: {labelAlign: 'right'},
                    frame: true,
                    border: false,
                    baseCls: 'my-panel-no-border',
                    items: [
                        {
                            xtype: 'combo',
                            id: 'sblx',
                            readOnly:true,
                            fieldLabel: '设备类型',
                            editable: false,
                            margin: '5 0 5 5',
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
                            readOnly:true,
                            fieldLabel: '设备名称',
                            editable: false,
                            labelAlign: 'right',
                            margin: '5 0 5 5',
                            labelWidth: 55,
                            width: 255,
                            value: '',
                            displayField: 'V_EQUNAME',
                            valueField: 'V_EQUCODE',
                            store: sbmcStore,
                            queryMode : 'local'
                        }
                    ]
                },{
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
                            labelAlign: 'right',
                            margin: '5 0 5 5',
                            labelWidth: 80,
                            width: 280,
                            value: 0,
                            minValue: 0
                        },{
                            xtype: 'numberfield',
                            id: 'repairper',
                            fieldLabel: '维修人数',
                            labelAlign: 'right',
                            margin: '5 0 5 5',
                            labelWidth: 55,
                            width: 255,
                            value: 0,
                            minValue: 0
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
                            labelAlign: 'right',
                            margin: '5 0 0 5',
                            labelWidth: 80,
                            width: 280,
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
                    id: 'maindefect',
                    fieldLabel: '主要缺陷',
                    labelAlign: 'right',
                    allowBlank: false,
                    margin: '5 0 5 5',
                    labelWidth: 80,
                    width: 540,
                    height: 44,
                    fieldStyle:'background-color: #FFEFD5;border-color: #FFEFD5; background-image: none;'
                    // readOnly: true
                },
                {
                    xtype: 'textarea',
                    id: 'jxnr',
                    fieldLabel: '检修内容',
                    labelAlign: 'right',
                    allowBlank: false,
                    margin: '5 0 5 5',
                    labelWidth: 80,
                    width: 540,
                    height: 44,
                    value: ''
                },
                {
                    layout: 'column',
                    defaults: {labelAlign: 'right'},
                    frame: true,
                    border: false,
                    baseCls: 'my-panel-no-border',
                    items: [
                        {
                            xtype: 'datefield',
                            id: 'jhtgdate',
                            format: 'Y-m-d',
                            fieldLabel: '计划开工时间',
                            editable: false,
                            labelAlign: 'right',
                            margin: '5 0 5 5',
                            labelWidth: 80,
                            width: 280,
                            value: '',
                            minValue:new Date(KSTIME),
                            listeners: {
                                select: function (field, newValue, oldValue) {
                                    Ext.getCmp('jhtgdate').setMinValue(new Date(KSTIME));
                                    var date1 = Ext.getCmp('jhtgdate').getSubmitValue() + " " + Ext.getCmp('jhtghour').getValue() + ":" + Ext.getCmp('jhtgminute').getValue() + ":00";
                                    var date11 = new Date(date1);
                                    var date2 = Ext.getCmp('jhjgdate').getSubmitValue() + " " + Ext.getCmp('jhjghour').getValue() + ":" + Ext.getCmp('jhjgminute').getValue() + ":00";
                                    var date22 = new Date(date2);
                                    //Ext.getCmp('jhtgdate').setMinValue(new Date(KSTIME));

                                    var gongshicha = date22.getTime() - date11.getTime();
                                    var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                                    if(gongshicha2 >= 0)
                                    {
                                        _gongshiheji();
                                    }else{
                                        Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                                        function callBack(id) {
                                            Ext.getCmp('jhtgdate').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                                            Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhjgdate').setValue(new Date());       //编辑窗口计划竣工时间默认值
                                            Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhgshj').setValue(0);
                                            return ;

                                        }

                                    }
                                }
                            }
                        },
                        {
                            xtype: 'combo',
                            id: 'jhtghour',
                            fieldLabel: '小时',
                            editable: false,
                            margin: '5 0 5 5',
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
                                    if(gongshicha2 >= 0)
                                    {
                                        _gongshiheji();
                                    }else{
                                        Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                                        function callBack(id) {
                                            Ext.getCmp('jhtgdate').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                                            Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhjgdate').setValue(new Date());       //编辑窗口计划竣工时间默认值
                                            Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhgshj').setValue(0);
                                            return ;

                                        }

                                    }
                                }
                            }
                        },
                        {
                            xtype: 'combo',
                            id: 'jhtgminute',
                            fieldLabel: '分钟',
                            editable: false,
                            margin: '5 0 5 5',
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
                                    if(gongshicha2 >= 0)
                                    {
                                        _gongshiheji();
                                    }else{
                                        Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                                        function callBack(id) {
                                            Ext.getCmp('jhtgdate').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                                            Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhjgdate').setValue(new Date());       //编辑窗口计划竣工时间默认值
                                            Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhgshj').setValue(0);
                                            return ;

                                        }

                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    layout: 'column',
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
                            margin: '5 0 5 5',
                            labelWidth: 80,
                            width: 280,
                            value: '',
                            listeners: {
                                select: function (field, newValue, oldValue) {
                                    var date1 = Ext.getCmp('jhtgdate').getSubmitValue() + " " + Ext.getCmp('jhtghour').getValue() + ":" + Ext.getCmp('jhtgminute').getValue() + ":00";
                                    var date11 = new Date(date1);
                                    var date2 = Ext.getCmp('jhjgdate').getSubmitValue() + " " + Ext.getCmp('jhjghour').getValue() + ":" + Ext.getCmp('jhjgminute').getValue() + ":00";
                                    var date22 = new Date(date2);


                                    var gongshicha = date22.getTime() - date11.getTime();
                                    var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
                                    if(gongshicha2 >= 0)
                                    {
                                        _gongshiheji();
                                    }else{
                                        Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                                        function callBack(id) {
                                            Ext.getCmp('jhtgdate').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                                            Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhjgdate').setValue(new Date());       //编辑窗口计划竣工时间默认值
                                            Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhgshj').setValue(0);
                                            return ;

                                        }

                                    }
                                }
                            }
                        },
                        {
                            xtype: 'combo',
                            id: 'jhjghour',
                            fieldLabel: '小时',
                            editable: false,
                            margin: '5 0 5 5',
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
                                    if(gongshicha2 >= 0)
                                    {
                                        _gongshiheji();
                                    }else{
                                        Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                                        function callBack(id) {
                                            Ext.getCmp('jhtgdate').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                                            Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhjgdate').setValue(new Date());       //编辑窗口计划竣工时间默认值
                                            Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhgshj').setValue(0);
                                            return ;

                                        }

                                    }
                                }
                            }
                        },
                        {
                            xtype: 'combo',
                            id: 'jhjgminute',
                            fieldLabel: '分钟',
                            editable: false,
                            margin: '5 0 5 5',
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
                                    if(gongshicha2 >= 0)
                                    {
                                        _gongshiheji();
                                    }else{
                                        Ext.MessageBox.alert('提示', '停工时间不能大于竣工时间', callBack);
                                        function callBack(id) {
                                            Ext.getCmp('jhtgdate').setValue(new Date()); 		//编辑窗口计划停工时间默认值
                                            Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhjgdate').setValue(new Date());       //编辑窗口计划竣工时间默认值
                                            Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
                                            Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
                                            Ext.getCmp('jhgshj').setValue(0);
                                            return ;

                                        }

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
                            labelWidth: 80,
                            width: 225,
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
function pageLoadInfo() {

        if (YEAR == null || YEAR == '') {
            Ext.getCmp('year').setValue(new Date().getFullYear());
        } else {
            Ext.getCmp('year').setValue(YEAR);
        }
        if (MONTH == null || MONTH == '') {
            Ext.getCmp('month').setValue(new Date().getMonth() + 1);
        } else {
            Ext.getCmp('month').setValue(MONTH);
        }
        if (WEEK == null || WEEK == '') {
            Ext.getCmp('week').setValue(getWeekOfMonth());
        } else {
            Ext.getCmp('week').setValue(WEEK);
        }


    Ext.data.StoreManager.lookup('ckStore').on('load', function () {

            if (V_ORGCODE == null || V_ORGCODE == '') {
                Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
            } else {
                var index = Ext.data.StoreManager.lookup('ckStore').findBy(function (record, id) {
                    return record.get('V_DEPTCODE') == V_ORGCODE;
                });
                if (index == -1) {
                    Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
                } else {
                    Ext.getCmp('ck').select(V_ORGCODE);
                }
            }

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

            if (V_DEPTCODE == null || V_DEPTCODE == '') {
                Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
            } else {
                var index = Ext.data.StoreManager.lookup('zyqStore').findBy(function (record, id) {
                    return record.get('V_DEPTCODE') == V_DEPTCODE;
                });
                if (index == -1) {
                    Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
                } else {
                    Ext.getCmp('zyq').select(V_DEPTCODE);
                }
            }

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
        Ext.data.StoreManager.lookup('gxStore').load({
            params:{
                V_PERCODE:Ext.util.Cookies.get('v_personcode'),
                V_DPPTCODE:Ext.util.Cookies.get('v_deptcode'),
                V_ORGCODE:Ext.util.Cookies.get('v_orgCode'),
                V_FLAG:'0'
            }
        });
    });
    Ext.data.StoreManager.lookup('repairDeptStore').on('load', function () {
        Ext.getCmp('repairDept').select(Ext.data.StoreManager.lookup('repairDeptStore').getAt(0));
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

            Ext.getCmp("sblx").select(V_EQUTYPECODE);

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

            Ext.getCmp("sbmc").select(V_EQUCODE);

    });
    Ext.data.StoreManager.lookup('zyStore').on('load', function () {

            Ext.getCmp("zy").select(Ext.data.StoreManager.lookup('zyStore').getAt(0));

    });

        Ext.getCmp('jhtgdate').setValue(new Date(KSTIME));		//编辑窗口计划停工时间默认值
        Ext.getCmp('jhtghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
        Ext.getCmp('jhtgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));
        Ext.getCmp('jhjgdate').setValue(new Date(KSTIME));       //编辑窗口计划竣工时间默认值
        Ext.getCmp('jhjghour').select(Ext.data.StoreManager.lookup('hourStore').getAt(0));
        Ext.getCmp('jhjgminute').select(Ext.data.StoreManager.lookup('minuteStore').getAt(0));

}
Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [editPanel]
    });
    pageLoadInfo();

        V_JXGX_CODE = guid();
    Ext.Ajax.request({
        url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SEL',
        method: 'POST',
        async: false,
        params: {
            V_V_WEEK_GUID: V_WEEKPLAN_GUID
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.list.length >0) {
                var str='';
                for(var i=0;i<resp.list.length;i++){
                    if(i==0){
                        str=resp.list[i].V_DEFECTLIST;
                    }else{
                        str+=','+resp.list[i].V_DEFECTLIST
                    }


                }
                Ext.getCmp('jxnr').setValue(str);
                Ext.getCmp('maindefect').setValue(str); Ext.getCmp('maindefect').setReadOnly(true);

            }

        }
    });

});
//第几周
function getWeekOfMonth() {
    var date = new Date();
    var w = date.getDay();
    var d = date.getDate();
    return Math.ceil((d + 6 - w) / 7);
};
function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
function jhSelect() {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_03010311/index.html?V_V_YEAR=' + Ext.getCmp('year').getValue()
    + '&V_V_ORGCODE=' + Ext.getCmp('ck').getValue()
    + '&V_V_DEPTCODE=' + Ext.getCmp('zyq').getValue()
    + '&V_V_EQUTYPE=' + Ext.getCmp('sblx').getValue()
    + '&V_V_EQUCODE=' + Ext.getCmp('sbmc').getValue()
    + '&V_V_ZY=' + Ext.getCmp('zy').getValue()
    + '&V_V_JXNR=' + Ext.getCmp('jxnr').getValue(), '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}
function mxSelect() {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_03010312/index.html?V_ORGCODE=' + Ext.getCmp('ck').getValue()
    + '&V_DEPTCODE=' + Ext.getCmp('zyq').getValue()
    + '&V_EQUTYPE=' + Ext.getCmp('sblx').getValue()
    + '&V_EQUCODE=' + Ext.getCmp('sbmc').getValue(), '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}
function getReturnJHXZ(retdata, type) {
    Ext.Ajax.request({
        url: AppUrl + 'PM_03/PM_03_PLAN_CHOOSE_SEL',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID: retdata,
            V_V_PLANTYPE: type
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
                V_PLANCODE = resp.list[0].V_PLANCODE;
                V_PLANTYPE = resp.list[0].V_PLANTYPE;

                Ext.getCmp('ck').select(V_ORGCODE);
                Ext.getCmp('zyq').select(V_DEPTCODE);
                Ext.getCmp("zy").select(V_REPAIRMAJOR_CODE);
                Ext.getCmp("sblx").select(V_EQUTYPE);
                Ext.getCmp("sbmc").select(V_EQUCODE);
                Ext.getCmp('jxnr').setValue(V_CONTENT);  //检修内容
                Ext.getCmp('jhgshj').setValue(V_HOUR);  //计划工时合计
                //Ext.getCmp('bz').setValue(V_BZ);  //备注


                Ext.getCmp('jhtgdate').setValue(V_STARTTIME_DATE);  //停工时间
                Ext.getCmp('jhtghour').select(V_STARTTIME_HOUR);  //停工时间小时
                Ext.getCmp('jhtgminute').select(V_STARTTIME_MINUTE);  //停工时间分钟
                Ext.getCmp('jhjgdate').setValue(V_ENDTIME_DATE);  //竣工时间
                Ext.getCmp('jhjghour').select(V_ENDTIME_HOUR);  //竣工时间小时
                Ext.getCmp('jhjgminute').select(V_ENDTIME_MINUTE);  //竣工时间分钟

                //---update 2018-1113
                Ext.getCmp('pdc').setValue(resp.list[0].V_PDC); //皮带周长
                Ext.getCmp('gyyq').setValue(resp.list[0].V_GYYQ); //工艺要求
                Ext.getCmp('pdgg').setValue(resp.list[0].V_PDGG);//皮带规格
                Ext.getCmp('changpdc').setValue(resp.list[0].V_CHANGPDC);//更换皮带长度（米）
                Ext.getCmp('jxhour').setValue(resp.list[0].V_JXHOUR); //检修时间（小时）
                Ext.getCmp('jjhour').setValue(resp.list[0].V_JJHOUR);//胶接时间（小时）
                Ext.getCmp('telname').setValue(resp.list[0].V_TELNAME);//联系人姓名
                Ext.getCmp('telnumb').setValue(resp.list[0].V_TELNUMB);//联系人电话

                Ext.getCmp('sgyy').setValue(resp.list[0].V_THICKNESS); //--施工原因
                Ext.getCmp('hd').setValue(resp.list[0].V_REASON);  //厚度
                Ext.getCmp('evertime').setValue(V_EVERTIME_DATE);//上次施工时间
                //end up

            }

        }
    });
}
function getReturnMXXZ(retdata) {
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

            Ext.getCmp('jhtgdate').setValue(V_STARTTIME_DATE);  //停工时间
            Ext.getCmp('jhtghour').select(V_STARTTIME_HOUR);  //停工时间小时
            Ext.getCmp('jhtgminute').select(V_STARTTIME_MINUTE);  //停工时间分钟
            Ext.getCmp('jhjgdate').setValue(V_ENDTIME_DATE);  //竣工时间
            Ext.getCmp('jhjghour').select(V_ENDTIME_HOUR);  //竣工时间小时
            Ext.getCmp('jhjgminute').select(V_ENDTIME_MINUTE);  //竣工时间分钟
        }
    });
}
function OnButtonSaveClick() {
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
    var retlen=0;
    var sdefnum=0;
    //模型
    V_JXMX_CODE = guid();
    //保存
    Ext.Ajax.request({
        url: AppUrl + 'cjy/PRO_PM_03_PLAN_WEEK_NSET',
        method: 'POST',
        params: {
            V_V_INPER: Ext.util.Cookies.get('v_personcode'),               //人员cookies                                    //人员编码
            V_V_GUID: V_WEEKPLAN_GUID,                         //季度计划guid                                                      //计划GUID
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
            V_V_OTHERPLAN_GUID: '',                                  //检修工序编码
            V_V_OTHERPLAN_TYPE: '',                                  //检修模型编码
            V_V_JHMX_GUID: '',                                          //检修标准
            V_V_HOUR: Ext.getCmp('jhgshj').getValue(),
            V_V_BZ: Ext.getCmp('bz').getValue(),
            V_V_DEFECTGUID: '',
            V_V_MAIN_DEFECT: Ext.getCmp('maindefect').getValue(),//主要缺陷
            V_V_EXPECT_AGE: Ext.getCmp('expectage').getValue(),//预计寿命
            V_V_REPAIR_PER: Ext.getCmp('repairper').getValue()//维修人数

            //--update 2018-1113
            , V_V_PDC:Ext.getCmp('pdc').getValue(), //皮带周长
            V_V_GYYQ:Ext.getCmp('gyyq').getValue(),//工艺要求
            V_V_CHANGPDC:Ext.getCmp('changpdc').getValue(), //更换皮带长度
            V_V_JXHOUR:Ext.getCmp('jxhour').getValue(),//检修时间
            V_V_JJHOUR:Ext.getCmp('jjhour').getValue(),//接胶时间
            V_V_TELNAME:Ext.getCmp('telname').getValue(),//联系人姓名
            V_V_TELNUMB:Ext.getCmp('telnumb').getValue(),//联系人电话
            V_V_PDGG:Ext.getCmp('pdgg').getValue()//皮带规格

            , V_V_THICKNESS:Ext.getCmp('hd').getValue(),  //厚度
            V_V_REASON:Ext.getCmp('sgyy').getValue(),  //--施工原因
            V_V_EVERTIME:Ext.Date.format(Ext.getCmp('evertime').getValue(),'Y/m/d').toString(),  //上次施工时间
            //end up
            //-2018-1113
            V_V_FLAG:Ext.getCmp('iflag').getValue()==false?Ext.getCmp('iflag').uncheckedValue:Ext.getCmp('iflag').inputValue,
            V_V_RDEPATCODE:Ext.getCmp('sgfs').getValue(),
            V_V_RDEPATNAME:Ext.getCmp('sgfs').getDisplayValue(),
            V_V_SGWAY:Ext.getCmp('repairDept').getValue(),
            V_V_SGWAYNAME:Ext.getCmp('repairDept').getDisplayValue(),
            //cxy2019/2/26
            V_V_OPERANAME:Ext.getCmp('gx').getValue()  //工序
        },
        success: function (ret) {
            var resp = Ext.decode(ret.responseText);
            if (resp.V_INFO == '成功') {
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

                //缺陷详细添加，缺陷状态变更为已计划
                var weekid='0';
                Ext.Ajax.request({//获取V_WEEKID
                    url: AppUrl + 'PM_03/PRO_PM_03_PLAN_WEEK_GET',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_WEEKPLAN_GUID: V_WEEKPLAN_GUID
                    },
                    success: function (resp) {
                        var resp = Ext.decode(resp.responseText);

                        if (resp.list.length == 1) {
                            weekid=resp.list[0].V_WEEKID;
                        }
                    }
                });

                Ext.Ajax.request({//获取所选缺陷GUID
                    url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SEL',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_WEEK_GUID: V_WEEKPLAN_GUID
                    },
                    success: function (resp) {
                        var respguid = Ext.decode(resp.responseText);

                        if (respguid.list.length >0) {
                            retlen=respguid.list.length;
                            for(var i=0;i<respguid.list.length;i++)
                            {
                                Ext.Ajax.request({//保存缺陷详细日志
                                    url: AppUrl + 'cjy/PRO_PM_DEFECT_LOG_SET',
                                    method: 'POST',
                                    async: false,
                                    params: {
                                        V_V_GUID: respguid.list[i].V_DEFECT_GUID,
                                        V_V_LOGREMARK: Ext.util.Cookies.get('v_personname2')+':缺陷导入周计划（'+weekid+'）',
                                        V_V_FINISHCODE: '30',
                                        V_V_KEY:''//缺陷guid

                                    },
                                    success: function (ret) {
                                        var resp = Ext.decode(ret.responseText);
                                        if(resp.V_INFO=='成功'){
                                            //修改缺陷状态
                                            Ext.Ajax.request({
                                                url: AppUrl + 'cjy/PRO_PM_DEFECT_STATE_SET',
                                                method: 'POST',
                                                async: false,
                                                params: {
                                                    V_V_GUID: respguid.list[i].V_DEFECT_GUID,
                                                    V_V_STATECODE: '50'//,已计划

                                                },
                                                success: function (ret) {
                                                    var resp = Ext.decode(ret.responseText);
                                                    if(resp.V_INFO=='success'){
                                                        sdefnum++;

                                                    }else{
                                                        alert("修改缺陷状态失败");
                                                    }

                                                }
                                            });

                                        }else{
                                            alert("缺陷日志记录失败");
                                        }

                                    }
                                });
                            }
                            if(sdefnum==retlen){
                                alert('周计划保存成功');
                                window.opener.Winclose();
                                window.close();
                            }

                        }else{

                            alert("缺陷日志添加错误");
                        }
                    }
                });


                window.close();
                window.opener.closeSelf();
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