var getck = "";
var getzyq = "";
var yearguid = ""
if (location.href.split('?')[1] != undefined) {
    getck = Ext.urlDecode(location.href.split('?')[1]).CK;
    getzyq = Ext.urlDecode(location.href.split('?')[1]).ZYQ;
    yearguid = Ext.urlDecode(location.href.split('?')[1]).YEARGUID;
}
var date = new Date();
//--年
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
// 厂矿
var ckstore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'ckstore',
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

//作业
var zyqstore = Ext.create("Ext.data.Store", {
    autoLoad: false,
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
//专业
var zystore = Ext.create('Ext.data.Store', {
    autoLoad: true,
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
//检修类别
var jxtypestore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'jxtypestore',
    fields: ['V_BASECODE', 'V_BASENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'dxfile/PM_YEAR_REPARI_SELECT',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'RET'
        }
    }
});
var cpanel = Ext.create('Ext.panel.Panel', {
    id: 'cpanel',
    region: 'center',
    layout: 'vbox',
    frame: true,
    border: false,
    defaults: {
        style: 'margin:5px 0px 5px 5px',
        labelAlign: 'right',
        baseCls: 'my-panel-no-border',
    },
    items: [{
        xtype: 'panel',
        layout: 'vbox',
        region: 'center',
        defaults: {labelAlign: 'right'},
        frame: true,
        autoScroll: true,
        items: [
            {
                layout: 'column',
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
                    {
                        xtype: 'button',
                        text: '保存',
                        icon: imgpath + '/saved.png',
                        margin: '10px 0px 0px 70px',
                        handler: OnButtonSaveClick
                    },
                    {
                        xtype: 'button',
                        text: '关闭',
                        icon: imgpath + '/cross.png',
                        margin: '10px 0px 0px 10px',
                        handler: OnButtonCancelClick
                    }
                ]
            }, {
                xtype: 'panel', layout: 'column', baseCls: 'my-panel-no-border',
                defaults: {
                    style: 'margin:5px 0px 5px 5px',
                    labelAlign: 'right'
                },
                items: [{
                    xtype: 'combo',
                    id: 'nf',
                    fieldLabel: '年份',
                    editable: false,
                    // style : 'margin:5px 0px 5px 5px',
                    labelWidth: 100,
                    width: 250,
                    displayField: 'displayField',
                    valueField: 'valueField',
                    value: '',
                    store: yearStore,
                    queryMode: 'local'
                }, {
                    xtype: 'combo',
                    id: 'yf',
                    fieldLabel: '月份',
                    editable: false,
                    // style : 'margin:5px 0px 5px 5px',
                    labelWidth: 100,
                    width: 250,
                    displayField: 'displayField',
                    valueField: 'valueField',
                    value: '',
                    store: monthStore,
                    queryMode: 'local'
                }]
            }, {
                xtype: 'panel', layout: 'column', baseCls: 'my-panel-no-border',
                defaults: {
                    style: 'margin:5px 0px 5px 5px',
                    labelAlign: 'right'
                },
                items: [{
                    id: 'ck',
                    xtype: 'combo',
                    store: ckstore,
                    fieldLabel: '单位名称',
                    editable: false,
                    labelWidth: 100,
                    width: 250,
                    displayField: 'V_DEPTNAME',
                    valueField: 'V_DEPTCODE',
                    queryMode: 'local'
                    //, style : 'margin:5px 0px 5px 5px'
                }, {
                    id: 'zyq',
                    xtype: 'combo',
                    store: zyqstore,
                    fieldLabel: '作业区',
                    editable: false,
                    labelWidth: 100,
                    width: 250,
                    style: 'margin:5px 0px 5px 5px',
                    displayField: 'V_DEPTNAME',
                    valueField: 'V_DEPTCODE',
                    queryMode: 'local'
                }]
            },
            {
                xtype: 'panel', layout: 'column', baseCls: 'my-panel-no-border',
                defaults: {
                    style: 'margin:5px 0px 5px 5px',
                    labelAlign: 'right'
                },
                items: [
                    {
                    xtype: 'combo',
                    id: 'sblx',
                    fieldLabel: '设备类型',
                    editable: false,
                    // style : 'margin:5px 0px 5px 5px',
                    labelWidth: 100,
                    width: 250,
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
                        // style : 'margin:5px 0px 5px 5px',
                        labelWidth: 100,
                        width: 250,
                        matchFieldWidth: false,
                        value: '',
                        displayField: 'V_EQUNAME',
                        valueField: 'V_EQUCODE',
                        store: sbmcStore,
                        queryMode: 'local',
                        listConfig: {
                            minWidth: 400
                        }
                    }]
            },
            {
                xtype: 'panel', layout: 'column', baseCls: 'my-panel-no-border',
                defaults: {
                    style: 'margin:5px 0px 5px 5px',
                    labelAlign: 'right'
                },
                items: [{
                    id: 'zy',
                    xtype: 'combo',
                    store: zystore,
                    fieldLabel: '专业',
                    editable: false,
                    labelWidth: 100,
                    width: 250,
                    // style : 'margin:5px 0px 5px 5px',
                    displayField: 'V_BASENAME',
                    valueField: 'V_SPECIALTYCODE',
                    queryMode: 'local'
                }, {
                    xtype: 'combo',
                    id: 'jxtype',
                    fieldLabel: '检修类别',
                    editable: false,
                    // style : 'margin:5px 0px 5px 5px',
                    labelWidth: 100,
                    width: 250,
                    displayField: 'V_BASENAME',
                    valueField: 'V_BASECODE',
                    value: '',
                    store: jxtypestore,
                    queryMode: 'local'
                }]
            }, {
                xtype: 'panel',
                layout: 'column', baseCls: 'my-panel-no-border',
                defaults: {
                    style: 'margin:5px 0px 5px 5px',
                    labelAlign: 'right'
                },
                items: [{
                    xtype: 'numberfield',
                    id: 'sumhour',
                    fieldLabel: '计划工时',
                    labelAlign: 'right',
                    allowNegative: false,
                    labelWidth: 100,
                    width: 250,
                    minValue: '0',
                    decimalPrecision: 2,
                    value: 0
                },{
                    xtype:'label',
                    text:'(h)',
                    style: 'margin:8px 0px 5px 5px'
                }]
            },

                    {
                    xtype: 'textarea',
                    id: 'jxcontent',
                    fieldLabel: '检修内容',
                    labelWidth: 100,
                    width: 400,
                    height: 80,
                    value: '',
                    style: 'margin:5px 0px 5px 5px',
                },

                    {
                    xtype: 'textarea',
                    id: 'bz',
                    fieldLabel: '备注',
                    labelWidth: 100,
                    width: 400,
                    height: 80,
                    style: 'margin:5px 0px 5px 5px',
                    value: ''
                }

        ]
    }]
});
Ext.onReady(function () {

    Ext.create('Ext.container.Viewport', {
        id: 'main',
        layout: 'border',
        items: [cpanel]
    });
    Ext.data.StoreManager.lookup('ckstore').on('load', function () {
        if (yearguid == 'new') {
            Ext.getCmp('ck').select(getck);
        }
        Ext.data.StoreManager.lookup('zyqstore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });

    Ext.data.StoreManager.lookup('zyqstore').on('load', function () {
        if (yearguid == 'new') {
            Ext.getCmp('zyq').select(getzyq);
        }
        Ext.data.StoreManager.lookup('zystore').load({
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
    //计划厂矿更改时
    Ext.getCmp('ck').on('select', function () {
        Ext.data.StoreManager.lookup('zyqstore').load({
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
        Ext.data.StoreManager.lookup('zystore').load({
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
    //设备类型改变
    Ext.getCmp('sblx').on('select', function () {
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
        if (yearguid == 'new') {
            Ext.getCmp("sblx").select(Ext.data.StoreManager.lookup('sblxStore').getAt(1));
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
        if (yearguid == 'new') {
            Ext.getCmp("sbmc").select(Ext.data.StoreManager.lookup('sbmcStore').getAt(0));
        }
    });
    Ext.getCmp("sblx").on('select', function () {
        Ext.data.StoreManager.lookup('sbmcStore').load({
            params: {
                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                v_v_deptcodenext: Ext.getCmp('zyq').getValue(),
                v_v_equtypecode: Ext.getCmp('sblx').getValue()
            }
        });
    });
    //专业
    Ext.data.StoreManager.lookup('zystore').on('load', function () {
        //Ext.data.StoreManager.lookup('zystore').insert(0, {V_BASENAME: '全部', V_SPECIALTYCODE: '%'});
        if (yearguid == 'new') {
            Ext.getCmp("zy").select(Ext.data.StoreManager.lookup('zystore').getAt(0));
        }
    });
//检修类别
    Ext.data.StoreManager.lookup('jxtypestore').load();
    Ext.data.StoreManager.lookup('jxtypestore').on('load', function () {
        if (yearguid == 'new') {
            Ext.getCmp("jxtype").select(Ext.data.StoreManager.lookup('jxtypestore').getAt(0));
        }
    });
    if (yearguid == 'new') {
        Ext.getCmp('nf').select(date.getFullYear());
        Ext.getCmp('yf').select(date.getMonth() + 1);
    }
    if (yearguid != 'new') {
        getYearDate();
    }
});

function OnButtonSaveClick() {
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PM_PLAN_YEAR_INSERT',
        method: 'POST',
        async: false,
        params: {
            V_GUID: yearguid,
            V_ORGCODE: Ext.getCmp('ck').getValue(),
            V_ORGNAME: Ext.getCmp('ck').getDisplayValue(),
            V_DEPTCODE: Ext.getCmp('zyq').getValue(),
            V_DEPTNAME: Ext.getCmp('zyq').getDisplayValue(),
            V_ZYCODE: Ext.getCmp('zy').getValue(),
            V_ZYNAME: Ext.getCmp('zy').getDisplayValue(),
            V_EQUCODE: Ext.getCmp('sbmc').getValue(),
            V_EQUTYPE: Ext.getCmp('sblx').getValue(),
            V_REPAIRCONTENT: Ext.getCmp('jxcontent').getValue(),
            V_PLANHOUR: Ext.getCmp('sumhour').getValue(),
            V_REPAIRTYPE: Ext.getCmp('jxtype').getValue(),
            V_REPAIRTYPENAME: Ext.getCmp('jxtype').getDisplayValue(),
            V_INPERCODE: Ext.util.Cookies.get('v_personcode'),
            V_INPERNAME: decodeURI(Ext.util.Cookies.get('v_personname').substring()),
            V_REMARK: Ext.getCmp('bz').getValue(),
            V_V_YEAR: Ext.getCmp('nf').getValue(),
            V_V_MONTH: Ext.getCmp('yf').getValue()
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.RET == 'SUCCESS') {
                if (yearguid == 'new') {
                    alert('保存成功');
                    window.close();
                    window.opener.OnButtonQuery();
                    return;
                }

                else {
                    alert('修改成功');
                    window.close();
                    window.opener.OnButtonQuery();
                }
            }
            // window.close();
            // window.opener.OnButtonQuery();
        }
    });

}


function getYearDate() {

    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PM_PLAN_YEAR_GETONE_SEL',
        method: 'POST',
        async: false,
        params: {
            V_GUID: yearguid
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.RET.length == 1) {

                Ext.getCmp('nf').select(resp.RET[0].V_YEAR); //年
                Ext.getCmp('yf').select(resp.RET[0].V_MONTH);  //月

                Ext.getCmp('ck').select(resp.RET[0].ORGCODE);  //厂矿编码
                Ext.getCmp('zyq').select(resp.RET[0].DEPTCODE);  //作业区编码
                Ext.getCmp('zy').select(resp.RET[0].ZYCODE);  //专业编码
                Ext.getCmp('sblx').select(resp.RET[0].EQUTYPE);  //设备类型编码
                Ext.getCmp('sbmc').select(resp.RET[0].EQUCODE);  //设备名称编码
                Ext.getCmp('jxtype').select(resp.RET[0].REPAIRTYPE);  //检修类别
                Ext.getCmp('jxcontent').setValue(resp.RET[0].REPAIRCONTENT);  //检修内容

                Ext.getCmp('sumhour').setValue(resp.RET[0].PLANHOUR);  //计划小时数
                Ext.getCmp('bz').setValue(resp.RET[0].REMARK);  //备注


            }
        }
    });
}


function OnButtonCancelClick() {
    window.opener.query();
    window.close();
}