var fileguid = '';
var zyqstore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'zyqstore',
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
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
            V_V_DEPTCODENEXT: '%',
            V_V_DEPTTYPE: '[主体作业区]'
        }

    }
});

var zystore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'zystore',
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

var personstore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'personstore',
    fields: ['V_PERSONCODE', 'V_PERSONNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'qk/PM_EQU_REPAIR_FLOW_PERSEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }

    }
});

var topPanel = Ext.create('Ext.panel.Panel', {
    id: 'topPanel',
    region: 'north',
    layout: 'vbox',
    frame: true,
    width: '100%',
    baseCls: 'my-panel-no-border',
    defaults: {
        //baseCls: 'my-panel-no-border'
    },
    items: [{
        xtype: 'panel',
        layout: 'column',
        frame: true,
        width: '100%',
        defaults: {
            margin: '10px 0 0 10px',
            labelAlign: 'right'
        },
        items: [
            {
                xtype: 'button',
                width: 100,
                text: '递交上报',
                handler: submit
            }, {
                xtype: 'button',
                width: 100,
                text: '暂时保存',
                handler: save
            }, {
                xtype: 'button',
                width: 100,
                text: '取 消',
                handler: close
            }
        ]
    }, {
        xtype: 'panel',
        layout: {
            type: 'column'
        },
        frame: true,
        width: '100%',
        defaults: {
            margin: '20px 0 0 10px'
        },
        items: [{
            xtype: 'displayfield',
            fieldLabel: '设备维修申请报告',
            labelAlign: 'right',
            //style : 'font-size:20',
            labelWidth: 700,
            //width: 5000,
            height: 60,
            labelSeparator: '',
            labelStyle: 'font-size:40px'
        }]
    }]
});


var formpanel1 = Ext.create('Ext.form.Panel', {
    id: 'formpanel1',
    region: 'north',
    layout: {
        type: 'table',
        columns: 4
    },
    defaults: {
        labelAlign: 'right',
        frame: true,
        margin: '10px 0 0 70px',
        width: 400
    },
    margin: '10px 0 0 0',
    //width : '100%',
    frame: true,
   // baseCls: 'my-panel-no-border',
    items: [ {
        xtype: 'combo',
        id: 'zyq',
        colspan: 2,
        store: zyqstore,
        fieldLabel: '作业区',
        displayField: 'V_DEPTNAME',
        valueField: 'V_DEPTCODE',
        queryMode: 'local',
        editable: false
    }, {
        xtype: 'datefield',
        colspan: 2,
        id: 'sqrq',
        fieldLabel: '申请日期',
        format: 'Y-m-d',
        value: new Date()
    }, {
        xtype: 'textfield',
        colspan: 2,
        id: 'xmbm',
        fieldLabel: '项目编码'
    }, {
        xtype: 'textfield',
        colspan: 2,
        id: 'xmmc',
        fieldLabel: '项目名称'
    }, {
        xtype: 'combo',
        id: 'person',
        colspan: 2,
        editable: false,
        store: 'personstore',
        displayField: 'V_PERSONNAME',
        valueField: 'V_PERSONCODE',
        fieldLabel: '设备室计划员'
    }, {
        xtype: 'panel',
        layout: 'column',
        frame: true,
        colspan: 2,
        baseCls: 'my-panel-no-border',
        items: [{
            xtype: 'displayfield',
            fieldLabel: '计划施工日期',
            labelAlign: 'right'
        }, {
            xtype: 'combo',
            width: 100,
            editable: false,
            id: 'startyear',
            store: CreateYearStore(),
            value: new Date().getFullYear(),
            valueField: 'VALUE',
            displayField: 'DISPLAY'
        }, {
            xtype: 'combo',
            width: 100,
            editable: false,
            id: 'startmonth',
            margin: '0 0 0 10px',
            store: CreateMonthStore(),
            value: new Date().getMonth() + 1,
            valueField: 'VALUE',
            displayField: 'DISPLAY'
        }]
    }, {
        xtype: 'combo',
        id: 'zy',
        store: 'zystore',
        editable: false,
        colspan: 2,
        displayField: 'V_BASENAME',
        valueField: 'V_SPECIALTYCODE',
        fieldLabel: '专业'
    }, {
        xtype: 'numberfield',
        colspan: 2,
        id: 'gs',
        fieldLabel: '工程总概算(万元)'
    }, {
        xtype: 'numberfield',
        colspan: 2,
        id: 'ys',
        fieldLabel: '工程总预算(万元)'
    }, {
        xtype: 'combo',
        id: 'bids',
        colspan: 2,
        store: CreateTrueFalse(),
        displayField: 'DISPLAY',
        valueField: 'VALUE',
        value: 1,
        editable: false,
        fieldLabel: '是否公开招标'
    }, {
        xtype: 'panel',
        layout: 'column',
        id: 'jxpanel',
        colspan: 2,
        frame: true,
        baseCls: 'my-panel-no-border',
        items: [{
            xtype: 'textfield',
            id: 'jxdw',
            fieldLabel: '检修单位',
            labelAlign: 'right',
            width: 400,
            value: '公开招标',
            readOnly: true
        }]
    }, {
        xtype: 'combo',
        id: 'qx',
        colspan: 2,
        store: CreateTrueFalse(),
        displayField: 'DISPLAY',
        valueField: 'VALUE',
        value: 0,
        editable: false,
        fieldLabel: '是否特殊抢修'
    }, {
        xtype: 'panel',
        layout: 'column',
        frame: true,
        colspan: 4,
        baseCls: 'my-panel-no-border',
        items: [{
            xtype: 'displayfield',
            fieldLabel: '计划月份',
            labelAlign: 'right'
        }, {
            xtype: 'combo',
            width: 100,
            editable: false,
            id: 'planyear',
            store: CreateYearStore(),
            value: new Date().getFullYear(),
            valueField: 'VALUE',
            displayField: 'DISPLAY'
        }, {
            xtype: 'combo',
            width: 100,
            editable: false,
            id: 'planmonth',
            margin: '0 0 0 10px',
            store: CreateMonthStore(),
            value: new Date().getMonth() + 1,
            valueField: 'VALUE',
            displayField: 'DISPLAY'
        }]
    }, {
        xtype: 'filefield',
        fieldLabel: '缺陷图片',
        colspan: 3,
        id: 'upload',
        name: 'upload',
        msgTarget: 'side',
        allowBlank: true,
        // anchor : '100%',
        buttonText: '浏览....',
        style: ' margin: 5px 0px 0px 40px'
    }, {
        xtype: 'button',
        width: 80,
        margin: '10px 0 0 10px',
        text: '上传图片',
        handler: imageUpload
    }, {
        xtype: 'displayfield',
        fieldLabel: '缺陷说明及费用',
        colspan: 4
    }, {
        xtype: 'textarea',
        id: 'qxfy',
        colspan: 4,
        width: 860,
        height: 100
    }, {
        xtype: 'displayfield',
        fieldLabel: '采取方案',
        colspan: 4
    }, {
        xtype: 'textarea',
        id: 'cqfa',
        colspan: 4,
        width: 860,
        height: 100
    },
        {xtype:'hidden',name:'V_V_GUID',id:'V_V_GUID'},
        {xtype:'hidden',name:'V_V_FILENAME',id:'V_V_FILENAME'},
        {xtype:'hidden',name:'V_V_FILETYPECODE',id:'V_V_FILETYPECODE'},
        {xtype:'hidden',name:'V_V_PLANT',id:'V_V_PLANT'},
        {xtype:'hidden',name:'V_V_DEPT',id:'V_V_DEPT'},
        {xtype:'hidden',name:'V_V_PERSON',id:'V_V_PERSON'}]

});

var formpanel3 = Ext.create('Ext.form.Panel', {
    id: 'formpanel3',
    region: 'north',
    layout: {
        type: 'table',
        columns: 4
    },
    defaults: {
        labelAlign: 'center',
        frame: true,
        width: 212,
        labelWidth: 212
    },
    width : '100%',
    frame: true,
    margin: '10px 0 0 3px',
    //baseCls: 'my-panel-no-border',
    items: [{
        xtype: 'displayfield',
        fieldLabel: '厂长审批意见'
    }, {
        xtype: 'displayfield',
        fieldLabel: '主管厂长审批意见'
    }, {
        xtype: 'displayfield',
        fieldLabel: '主任审批意见'
    }, {
        xtype: 'displayfield',
        fieldLabel: '专业副主任审批意见'
    }, {
        xtype: 'textarea',
        height: 100,
        readOnly : true
    }, {
        xtype: 'textarea',
        height: 100,
        readOnly : true
    }, {
        xtype: 'textarea',
        height: 100,
        readOnly : true
    }, {
        xtype: 'textarea',
        height: 100,
        readOnly : true
    }]
});

Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        autoScroll: true,
        items: [topPanel, formpanel1, formpanel3]
    });

    zyqstore.on("load", function () {
        Ext.getCmp("zyq").select(zyqstore.getAt(0));
    });

    zystore.on("load", function () {
        Ext.getCmp("zy").select(zystore.getAt(0));
    });

    personstore.on("load", function () {
        Ext.getCmp("person").select(personstore.getAt(0));
    });


    Ext.ComponentManager.get("zyq").on("change", function () {
        zystore.load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue()
            }
        });
    });

    Ext.ComponentManager.get("zy").on("change", function () {
        personstore.load({
            params: {
                V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
                V_V_ZYCODE: Ext.getCmp('zy').getValue()
            }
        });
    });

    Ext.ComponentManager.get("bids").on("change", function () {
        if (Ext.getCmp('bids').getValue() == '1') {
            Ext.getCmp('jxpanel').remove(Ext.getCmp('jxdw'));
            Ext.getCmp('jxpanel').add({
                xtype: 'textfield',
                id: 'jxdw',
                fieldLabel: '检修单位',
                width: 400,
                labelAlign: 'right',
                value: '公开招标',
                readOnly: true
            })
        }
        else {
            Ext.getCmp('jxpanel').remove(Ext.getCmp('jxdw'));
            Ext.getCmp('jxpanel').add({
                xtype: 'combo',
                id: 'jxdw',
                fieldLabel: '检修单位',
                store: Createjxdwstore(),
                displayField: 'DISPLAY',
                labelAlign: 'right',
                valueField: 'VALUE',
                value: 0,
                width: 400,
                editable: false
            })
        }
    });
})

function CreateYearStore() {
    var year = [];
    for (var i = new Date().getFullYear() - 1; i <= new Date().getFullYear() + 1; i++) {
        year.push({
            VALUE: i,
            DISPLAY: '--' + i + '年--'
        });
    }
    return {
        fields: ['VALUE', 'DISPLAY'],
        data: year
    };
}

function CreateMonthStore() {
    var month = [];
    for (var i = 1; i <= 12; i++) {
        month.push({
            VALUE: i,
            DISPLAY: '--' + i + '月--'
        });
    }
    return {
        fields: ['VALUE', 'DISPLAY'],
        data: month
    };
}

function CreateTrueFalse() {
    var arr = [];
    arr.push({
        VALUE: 0,
        DISPLAY: '--否--'
    });
    arr.push({
        VALUE: 1,
        DISPLAY: '--是--'
    });
    return {
        fields: ['VALUE', 'DISPLAY'],
        data: arr
    };
}

function Createjxdwstore() {
    var arr = [];
    arr.push({
        VALUE: 0,
        DISPLAY: '质计中心'
    });
    arr.push({
        VALUE: 1,
        DISPLAY: '生产服务中心'
    });
    arr.push({
        VALUE: 2,
        DISPLAY: '设备检修协力中心'
    });
    arr.push({
        VALUE: 3,
        DISPLAY: '辅助材料厂'
    });
    arr.push({
        VALUE: 4,
        DISPLAY: '动力厂'
    });
    arr.push({
        VALUE: 5,
        DISPLAY: '设计研究院'
    });
    return {
        fields: ['VALUE', 'DISPLAY'],
        data: arr
    };
}

function imageUpload() {
    fileguid = guid();
    var form = Ext.getCmp('formpanel1');
    Ext.getCmp('V_V_GUID').setValue(fileguid);
    Ext.getCmp('V_V_FILENAME').setValue(Ext.getCmp('upload').getValue().split('\\')[2]);
    Ext.getCmp('V_V_FILETYPECODE').setValue('JXJS');
    Ext.getCmp('V_V_PLANT').setValue(Ext.util.Cookies.get('v_orgCode'));
    Ext.getCmp('V_V_DEPT').setValue(Ext.getCmp('zyq').getValue());
    Ext.getCmp('V_V_PERSON').setValue(Ext.util.Cookies.get('v_personcode'));
    form.submit({
        url: AppUrl + 'qk/uploadFile',
        async: false,
        waitMsg: '上传中...',
        method: 'POST',
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
        }
    });
}

function submit() {
    if (fileguid == '') {
        alert("请上传图片!")
        return false;
    }
    Ext.Ajax.request({
        url: AppUrl + 'qk/PM_EQU_REPAIR_DATA_SET',
        async: false,
        method: 'post',
        params: {
            V_V_FLOWGUID: guid(),
            V_V_ORGCODE: Ext.util.Cookies.get('v_orgCode'),
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
            V_V_ITEMCODE: Ext.getCmp('xmbm').getValue(),
            V_V_ITEMNAME: Ext.getCmp('xmmc').getValue(),
            V_V_YEAR: Ext.getCmp('sqrq').getValue().getFullYear(),
            V_V_MONTH: Ext.getCmp('sqrq').getValue().getMonth() + 1,
            V_V_TIME_B: Ext.util.Format.date(Ext.getCmp('startyear').getValue() + '/' + Ext.getCmp('startmonth').getValue() + '/1', 'Y-m-d'),
            V_V_TIME_E: Ext.util.Format.date(Ext.getCmp('planyear').getValue() + '/' + Ext.getCmp('planmonth').getValue() + '/1', 'Y-m-d'),
            V_V_MAJOR: Ext.getCmp('zy').getValue(),
            V_V_BUDGET_MONEY: Ext.getCmp('ys').getValue(),
            V_V_MONEY: Ext.getCmp('gs').getValue(),
            V_V_REPAIR_TYPE: Ext.getCmp('bids').getValue(),
            V_V_REPAIR_DEPT: Ext.getCmp('jxdw').getValue(),
            V_V_REPAIR_STATUS: Ext.getCmp('qx').getValue(),
            V_V_FILE_GUID: fileguid,
            V_V_EXPLAIN: Ext.getCmp('qxfy').getValue(),
            V_V_SCHEME: Ext.getCmp('cqfa').getValue(),
            V_V_FLOW_STATUS: '2',
            V_V_FLOW_STEPCODE: 'wxjhy',
            V_V_INPER: Ext.util.Cookies.get('v_personcode'),
            V_V_INTIME: Ext.util.Format.date(new Date(), 'Y-m-d')

        },
        success: function (resp) {
            var resp = Ext.JSON.decode(resp.responseText);
            alert("上报成功!");
        }
    });
}

function save() {
    if (fileguid == '') {
        alert("请上传图片!")
        return false;
    }
    Ext.Ajax.request({
        url: AppUrl + 'qk/PM_EQU_REPAIR_DATA_SET',
        async: false,
        method: 'post',
        params: {
            V_V_FLOWGUID: guid(),
            V_V_ORGCODE: Ext.util.Cookies.get('v_orgCode'),
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
            V_V_ITEMCODE: Ext.getCmp('xmbm').getValue(),
            V_V_ITEMNAME: Ext.getCmp('xmmc').getValue(),
            V_V_YEAR: Ext.getCmp('sqrq').getValue().getFullYear(),
            V_V_MONTH: Ext.getCmp('sqrq').getValue().getMonth() + 1,
            V_V_TIME_B: Ext.util.Format.date(Ext.getCmp('startyear').getValue() + '/' + Ext.getCmp('startmonth').getValue() + '/1', 'Y-m-d'),
            V_V_TIME_E: Ext.util.Format.date(Ext.getCmp('planyear').getValue() + '/' + Ext.getCmp('planmonth').getValue() + '/1', 'Y-m-d'),
            V_V_MAJOR: Ext.getCmp('zy').getValue(),
            V_V_BUDGET_MONEY: Ext.getCmp('ys').getValue(),
            V_V_MONEY: Ext.getCmp('gs').getValue(),
            V_V_REPAIR_TYPE: Ext.getCmp('bids').getValue(),
            V_V_REPAIR_DEPT: Ext.getCmp('jxdw').getValue(),
            V_V_REPAIR_STATUS: Ext.getCmp('qx').getValue(),
            V_V_FILE_GUID: fileguid,
            V_V_EXPLAIN: Ext.getCmp('qxfy').getValue(),
            V_V_SCHEME: Ext.getCmp('cqfa').getValue(),
            V_V_FLOW_STATUS:  '0',
            V_V_FLOW_STEPCODE:'wxjhy',
            V_V_INPER: Ext.util.Cookies.get('v_personcode'),
            V_V_INTIME: Ext.util.Format.date(new Date(), 'Y-m-d')
        },
        success: function (resp) {
            var resp = Ext.JSON.decode(resp.responseText);
            alert("保存成功!");
        }
    });
}

function close() {
    window.close();
}
function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function downloadRander(a, value, metaData) {
    return '<a href="javascript:onDownload(\'' + metaData.data.V_FILE_GUID + '\',\'' + metaData.data.V_FILE_NAME + '\')"><img src= "' + imgpath + '/saved.png"></a>';
}

function onDownload(fileguid, filename) {

    location.href = AppUrl + "/Home/WxFileDownLoad?V_V_FILEGUID=" + fileguid + "&fileName=" + filename;

}