//var V_YEARPLAN_GUID = Ext.urlDecode(location.href.split('?')[1]).V_YEARPLAN_GUID;
var YEAR = Ext.urlDecode(location.href.split('?')[1]).YEAR;
var V_DEPTCODE = Ext.urlDecode(location.href.split('?')[1]).V_DEPTCODE;
var V_ORGCODE = Ext.urlDecode(location.href.split('?')[1]).V_ORGCODE;
var months = [];
var hours = [];
var minutes = [];
var UPDATELOAD;
var SAVELOAD =false;
for (var i = 1; i <= 12; i++) {
    if (i < 10) {
        months.push({displayField: ("0" + "" + i), valueField: i});
    } else {
        months.push({displayField: i, valueField: i});
    }

}

for (var j = 0; j <= 23; j++) {
    if (j < 10) {
        hours.push({displayField: ("0" + "" + j), valueField: j});
    } else {
        hours.push({displayField: j, valueField: j});
    }

}
for (var k = 0; k <= 59; k++) {
    if (k < 10) {
        minutes.push({displayField: ("0" + "" + k), valueField: k});
    } else {
        minutes.push({displayField: k, valueField: k});
    }

}

//var V_V_GUID = Ext.data.IdGenerator.get('uuid').generate();

var today = new Date();

if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_GUID == undefined) ? V_GUID = '' : V_GUID = parameters.V_GUID;

}


Ext.define('Ext.ux.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    async: true,
    doRequest: function (operation, callback, scope) {
        var writer = this.getWriter(),
            request = this.buildRequest(operation);
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        Ext.apply(request, {
            async: this.async,
            binary: this.binary,
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, callback, scope),
            method: this.getMethod(request),
            disableCaching: false
        });
        Ext.Ajax.request(request);
        return request;
    }
});

Ext.onReady(function () {
    var dt = new Date();
    var thisYear = dt.getFullYear();
    var years = [];
    for (var i = 2013; i <= thisYear + 1; i++) years.push({displayField: i, valueField: i});

    var yearStore = Ext.create("Ext.data.Store", {
        storeId: 'yearStore',
        fields: ['displayField', 'valueField'],
        data: years,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });
    var sblxStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'sblxStore',
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('sblx').select(store.first());
            }
        }
    });

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['I_ID',
            'V_GUID',
            'V_YEAR',
            'V_ORGCODE',                          //厂矿
            'V_ORGNAME',
            'V_DEPTCODE',                         //作业区
            'V_DEPTNAME',
            'V_EQUTYPECODE',                     //设备类型
            'V_EQUTYPENAME',
            'V_EQUCODE',
            'V_EQUNAME',
            'V_REPAIRMAJOR_CODE',
            'V_CONTENT',
            'V_STARTTIME',
            'V_ENDTIME',
            'V_HOUR',
            'V_REPAIRDEPT_CODE',
            'V_REPAIRDEPT_NAME',
            'V_INDATE',
            'V_INPER',
            'INPERNAME',
            'V_FLOWCODE',
            'V_FLOWORDER',
            'V_FLOWTYPE',
            'V_JHMX_GUID',
            'V_BZ',
            'V_REPAIR_PERNAME',
            'V_YEARID',
            'V_STATE',
            'V_STATENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PRO_PM_03_PLAN_YEAR_GET',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        })
    });

    var sbmcStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'sbmcStore',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('sbmc').select(store.first());
            }
        }
    });

    var ckStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'ckStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('ck').select(store.first());
            }
        }
    });

    var zyStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyStore',
        fields: ['V_SPECIALTYCODE', 'V_BASENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('zy').select(store.first());
            }
        }
    });

    var jxdwStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'jxdwStore',
        fields: ['V_DEPTREPAIRCODE', 'V_DEPTREPAIRNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'basic/PRO_PM_REPAIRDEPT_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('jxdw').select(store.first());
            }
        }
    });


    var zyqStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyqStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('zyq').select(store.first());
            }
        }
    });


    var jxdwstore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'jxdwstore',
        fields: ['V_DEPTREPAIRCODE', 'V_DEPTREPAIRNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_22/PM_REPAIRDEPT_SEL',
            // url: 'PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                /* V_V_DEPTCODE : Ext.getCmp('zyq').getValue()*/
            }
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('jxdw').select(store.first());
            }
        }
    });


    var monthStore = Ext.create("Ext.data.Store", {
        storeId: 'monthStore',
        autoLoad: true,
        fields: ['displayField', 'valueField'],
        data: months,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });

    var hourStore = Ext.create("Ext.data.Store", {
        storeId: 'hourStore',
        autoLoad: true,
        fields: ['displayField', 'valueField'],
        data: hours,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });

    var minuteStore = Ext.create("Ext.data.Store", {
        storeId: 'minuteStore',
        autoLoad: true,
        fields: ['displayField', 'valueField'],
        data: minutes,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
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
                border: false,
                //baseCls: 'my-panel-no-border',
                margin: '0 0 0 0',
                //autoScroll : true,
                items: [
                    {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [{
                            id: 'year',
                            store: yearStore,
                            xtype: 'combo',
                            fieldLabel: '年份',
                            style: 'margin: 5px 0px 0px 0px',
                            value: YEAR,
                            labelWidth: 100,
                            labelAlign: 'right',
                            editable: false,
                            width: 250,
                            displayField: 'displayField',
                            valueField: 'valueField'
                        }, {
                            xtype: 'combo',
                            id: "ck",
                            store: ckStore,
                            editable: false,
                            queryMode: 'local',
                            fieldLabel: '计划厂矿',
                            displayField: 'V_DEPTNAME',
                            valueField: 'V_DEPTCODE',
                            labelWidth: 100,
                            style: ' margin: 5px 0px 0px 0px',
                            labelAlign: 'right',
                            width: 250,
                            listeners: {
                                change: function (field, newValue, oldValue) {
                                    _ck_zyqload();
                                    // _zyq_jxdw();
                                    _zyq_zy();
                                    _zyq_sblx();
                                    _zyq_sbmc();
                                }
                            }
                        }]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                xtype: 'combo',
                                id: "zyq",
                                store: zyqStore,
                                editable: false,
                                queryMode: 'local',
                                fieldLabel: '作业区',
                                displayField: 'V_DEPTNAME',
                                valueField: 'V_DEPTCODE',
                                labelWidth: 100,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                width: 250,
                                listeners: {
                                    select: function (field, newValue, oldValue) {
                                        // _zyq_jxdw();
                                        _zyq_zy();
                                        _zyq_sblx();
                                        _zyq_sbmc();
                                    }
                                }
                            }, {
                                xtype: 'combo',
                                id: "zy",
                                store: zyStore,
                                editable: false,
                                queryMode: 'local',
                                fieldLabel: '专业',
                                displayField: 'V_BASENAME',
                                valueField: 'V_SPECIALTYCODE',
                                labelWidth: 100,
                                width: 250,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right'
                            }]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                xtype: 'combo',
                                id: "sblx",
                                store: sblxStore,
                                editable: false,
                                queryMode: 'local',
                                fieldLabel: '设备类型',
                                displayField: 'V_EQUTYPENAME',
                                valueField: 'V_EQUTYPECODE',
                                labelWidth: 100,
                                width: 250,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                listeners: {
                                    change: function (field, newValue, oldValue) {
                                        _zyq_sbmc();
                                    }
                                }
                            }, {
                                xtype: 'combo',
                                id: "sbmc",
                                store: sbmcStore,
                                editable: false,
                                queryMode: 'local',
                                fieldLabel: '设备名称',
                                displayField: 'V_EQUNAME',
                                valueField: 'V_EQUCODE',
                                labelWidth: 100,
                                width: 250,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right'
                            }]
                    }, {
                        id: 'jxnr',
                        xtype: 'textarea',
                        fieldLabel: '检修内容',
                        //fieldStyle: 'background-color: #FFEBCD; background-image: none;',
                        editable: false,
                        labelWidth: 100,
                        queryMode: 'local',
                        allowBlank: false,
                        //baseCls: 'margin-bottom',
                        style: ' margin: 5px 1000px 0px 0px',
                        width: 500,
                        labelAlign: 'right'
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                id: 'jhtgsj',
                                xtype: 'datefield',
                                editable: false,
                                format: 'Y-m-d',
                                //submitFormat: 'yyyy-mm-dd',
                                value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                                fieldLabel: '计划停工时间',
                                labelWidth: 100,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                width: 250,
                                // fieldStyle: 'background-color:#FFEBCD;background-image:none;',
                                baseCls: 'margin-bottom',
                                listeners: {
                                    select: function (field, newValue, oldValue) {
                                        _gongshiheji();
                                    }
                                }
                            }, {
                                xtype: 'combo',
                                id: "tghour",
                                store: hourStore,
                                editable: false,
                                queryMode: 'local',
                                fieldLabel: '小时',
                                value: 00,
                                displayField: 'displayField',
                                valueField: 'valueField',
                                labelWidth: 100,
                                width: 160,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                listeners: {
                                    select: function (field, newValue, oldValue) {
                                        _gongshiheji();
                                    }
                                }
                            }, {
                                xtype: 'combo',
                                id: "tgminute",
                                store: minuteStore,
                                editable: false,
                                queryMode: 'local',
                                fieldLabel: '分钟',
                                value: 00,
                                displayField: 'displayField',
                                valueField: 'valueField',
                                labelWidth: 30,
                                width: 90,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                listeners: {
                                    select: function (field, newValue, oldValue) {
                                        _gongshiheji();
                                    }
                                }
                            }]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                id: 'jhjgsj',
                                xtype: 'datefield',
                                editable: false,
                                format: 'Y-m-d',
                                //submitFormat: 'yyyy-mm-dd',
                                value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                                fieldLabel: '计划竣工时间',
                                labelWidth: 100,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                width: 250,
                                // fieldStyle: 'background-color:#FFEBCD;background-image:none;',
                                baseCls: 'margin-bottom',
                                listeners: {
                                    select: function (field, newValue, oldValue) {
                                        _gongshiheji();
                                    }
                                }
                            }, {
                                xtype: 'combo',
                                id: "jghour",
                                store: hourStore,
                                editable: false,
                                queryMode: 'local',
                                fieldLabel: '小时',
                                value: 00,
                                displayField: 'displayField',
                                valueField: 'valueField',
                                labelWidth: 100,
                                width: 160,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                listeners: {
                                    select: function (field, newValue, oldValue) {
                                        _gongshiheji();
                                    }
                                }
                            }, {
                                xtype: 'combo',
                                id: "jgminute",
                                store: minuteStore,
                                editable: false,
                                queryMode: 'local',
                                fieldLabel: '分钟',
                                value: 00,
                                displayField: 'displayField',
                                valueField: 'valueField',
                                labelWidth: 30,
                                width: 90,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                listeners: {
                                    select: function (field, newValue, oldValue) {
                                        _gongshiheji();
                                    }
                                }
                            }]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                id: 'jhgshj',
                                xtype: 'textfield',
                                editable: true,
                                fieldLabel: '计划工时合计',
                                labelWidth: 100,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                width: 250,
                                fieldStyle: 'background-color:#FFEBCD;background-image:none;',
                                baseCls: 'margin-bottom'
                            }]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                id: 'bz',
                                xtype: 'textarea',
                                fieldLabel: '备注 ',
                                // fieldStyle: 'background-color: #FFEBCD; background-image: none;',
                                editable: false,
                                labelWidth: 100,
                                queryMode: 'local',
                                //baseCls: 'margin-bottom',
                                style: ' margin: 5px 1000px 0px 0px',
                                width: 500,
                                labelAlign: 'right'
                            }]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                xtype: 'button',
                                text: '模型选择',
                                style: 'margin: 10px 0px 0px 260px',
                                //icon: imgpath + '/filesave.png',
                                handler: _onBtnmxxz
                                //style: 'margin: 5px 0px 10px 0px'
                            }, {
                                xtype: 'button',
                                text: '保存',
                                icon: imgpath + '/filesave.png',
                                style: 'margin: 10px 0px 0px 5px',
                                handler: _save
                                //style: 'margin: 5px 0px 10px 0px'
                            }, {
                                xtype: 'button',
                                text: '重新上报',
                                style: ' margin: 10px 0px 0px 10px',
                                listeners: {click: OnButtonUpClicked}
                            }, {
                                xtype: 'button',
                                text: '关闭',
                                icon: imgpath + '/cross.png',
                                style: 'margin: 10px 0px 0px 5px',
                                handler: _close
                                //style: 'margin: 5px 0px 10px 0px'
                            }]
                    }

                ]
            }


        ]
    });


    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [editPanel]
    });

    /* Ext.EventManager.onWindowResize(function(width,height){//改变窗口的时候会提示出窗口的宽高
     Ext.getCmp('filegridPanel').body.update("<div id = 'yulan'> <table border='0' width='100' height='50'><tr> <td> <input type='button' value='<<' onclick = '_last()'/> </td><td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID1 +".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID2 +".jpg' width='120px' height='100px' /> </td> <td> <img src='../../images/pm_dxgc_wwjx/"+ V_GUID+"/thumb_"+V_PICGUID3 +".jpg' width='120px' height='100px' /> </td> <td> <input type='button' value='>>' onclick='_next()' /> </td> </tr> <tr> <td></td> <td align='center'> <span><a href='javascript:void(0);' onclick='_delete1()'>删除</a></span> </td > <td align='center'> <span><a href='javascript:void(0);' onclick='_delete2()'>删除</a></span></td> <td align='center'> <span><a href='javascript:void(0);' onclick='_delete3()'>删除</a></span></td> <td></td> </tr> </table> </div>"
     );

     });*/

    _init();
})

function _init() {

    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        V_V_GUID: V_GUID
    };
    //matGroupSecondStore.currentPage = 1;
    gridStore.load();


    //console.log(gridStore.getAt(0).get('V_STARTTIME').substring(11,19));
    Ext.getCmp('year').setValue(gridStore.getAt(0).get('V_YEAR'));
    Ext.getCmp('ck').setValue(gridStore.getAt(0).get('V_ORGCODE'));
    Ext.getCmp('zyq').setValue(gridStore.getAt(0).get('V_DEPTCODE'));
    Ext.getCmp('zy').setValue(gridStore.getAt(0).get('V_REPAIRMAJOR_CODE'));
    Ext.getCmp('sblx').setValue(gridStore.getAt(0).get('V_EQUTYPECODE'));
    Ext.getCmp('sbmc').setValue(gridStore.getAt(0).get('V_EQUCODE'));
    Ext.getCmp('jxnr').setValue(gridStore.getAt(0).get('V_CONTENT'));
    Ext.getCmp('jhtgsj').setValue(gridStore.getAt(0).get('V_STARTTIME').substring(0, 10));
    Ext.getCmp('tghour').setValue(gridStore.getAt(0).get('V_STARTTIME').substring(11, 13));
    Ext.getCmp('tgminute').setValue(gridStore.getAt(0).get('V_STARTTIME').substring(14, 16));
    Ext.getCmp('jhjgsj').setValue(gridStore.getAt(0).get('V_ENDTIME').substring(0, 10));
    Ext.getCmp('jghour').setValue(gridStore.getAt(0).get('V_ENDTIME').substring(11, 13));
    Ext.getCmp('jgminute').setValue(gridStore.getAt(0).get('V_ENDTIME').substring(14, 16));
    Ext.getCmp('jhgshj').setValue(gridStore.getAt(0).get('V_HOUR'));
    Ext.getCmp('bz').setValue(gridStore.getAt(0).get('V_BZ'));
    _gongshiheji();
    UPDATELOAD = true;


}


function _ck_zyqload() {
    var zyqstore = Ext.data.StoreManager.lookup('zyqstore');
    zyqstore.proxy.extraParams = {
        IS_V_DEPTCODE: Ext.getCmp('ck').getValue(),
        IS_V_DEPTTYPE: '[主体作业区]'
    };
    //matGroupSecondStore.currentPage = 1;
    zyqstore.load();

}

function _ck_zyfzrload() {
    var zyfzrenstore = Ext.data.StoreManager.lookup('zyfzrenstore');
    zyfzrenstore.proxy.extraParams = {
        V_V_SPECIALTYCODE: Ext.getCmp('zy').getValue(),
        V_V_POSTCODE: '0101020104',
        V_V_DEPTCODE: Ext.getCmp('zyq').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    zyfzrenstore.load();

}

function _ck_zyqfzrload() {
    var zyfzrenstore = Ext.data.StoreManager.lookup('zyfzrenstore');
    zyfzrenstore.proxy.extraParams = {
        V_V_SPECIALTYCODE: Ext.getCmp('zy').getValue(),
        V_V_POSTCODE: '0101020104',
        V_V_DEPTCODE: Ext.getCmp('zyq').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    zyfzrenstore.load();

}

function zyq_jxdwload() {
    var jxdwstore = Ext.data.StoreManager.lookup('jxdwstore');
    jxdwstore.proxy.extraParams = {
        V_V_DEPTCODE: Ext.getCmp('zyq').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    jxdwstore.load();

}

function _jhyear() {
    Ext.getCmp('jhyear').setValue(Ext.getCmp('year').getValue());
}

function _jhmonth() {
    Ext.getCmp('jhmonth').setValue(Ext.getCmp('month').getValue());
}


function _validate(obj) {
    var valid = true;
    for (var i = 0; i < obj.items.length; i++) {
        if (obj.items.getAt(i).xtype != 'button' && obj.items.getAt(i).xtype != 'panel' && !obj.items.getAt(i).validate()) {
            valid = false;
        }
    }
    return valid;
}


function _close() {
    window.close();
}

function _zyq_jxdw() {

    var jxdwStore = Ext.data.StoreManager.lookup('jxdwStore');
    jxdwStore.proxy.extraParams = {
        V_V_DEPTCODE: Ext.getCmp('zyq').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    jxdwStore.load();


}

function _zyq_zy() {
    var zyStore = Ext.data.StoreManager.lookup('zyStore');
    zyStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    zyStore.load();
}

function _ck_zyqload() {
    var zyqStore = Ext.data.StoreManager.lookup('zyqStore');
    zyqStore.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
        'V_V_DEPTCODENEXT': '%',
        'V_V_DEPTTYPE': '主体作业区'
    };
    //matGroupSecondStore.currentPage = 1;
    zyqStore.load();

}

function _zyq_sblx() {
    var sblxStore = Ext.data.StoreManager.lookup('sblxStore');
    sblxStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    sblxStore.load();
}

function _zyq_sbmc() {
    var sbmcStore = Ext.data.StoreManager.lookup('sbmcStore');
    sbmcStore.proxy.extraParams = {
        v_v_personcode: Ext.util.Cookies.get('v_personcode'),
        v_v_deptcodenext: Ext.getCmp('zyq').getValue(),
        v_v_equtypecode: Ext.getCmp('sblx').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    sbmcStore.load();


}

function _onBtnmxxz() {
    var owidth = window.document.body.offsetWidth;
    var oheight = window.document.body.offsetHeight;
    window.open(AppUrl + 'page/PM_03010212/index.html?&random=' + Math.random(), '', 'height=600PX,width=1200px,top=10px,left=10px,resizable=yes');

}


function _gongshiheji() {
    var date1 = Ext.getCmp('jhtgsj').getSubmitValue() + " " + Ext.getCmp('tghour').getValue() + ":" + Ext.getCmp('tgminute').getValue() + ":00";
    var date11 = new Date(date1);
    var date2 = Ext.getCmp('jhjgsj').getSubmitValue() + " " + Ext.getCmp('jghour').getValue() + ":" + Ext.getCmp('jgminute').getValue() + ":00";
    var date22 = new Date(date2);


    var gongshicha = date22.getTime() - date11.getTime();
    var gongshicha2 = Ext.util.Format.round(gongshicha / 1000 / 60 / 60, 1);
    Ext.getCmp('jhgshj').setValue(gongshicha2);

}

function _save() {
    if (Ext.getCmp('jxnr').getValue() == ""){
        Ext.MessageBox.alert('提示', '请先输入检修内容');
        return;
    }
    if (Ext.getCmp('jhgshj').getValue() < 0) {
        Ext.MessageBox.alert('提示', '竣工时间必须大于停工时间');

        return;
    }

    Ext.Ajax.request({
        url: AppUrl + 'hp/PRO_PM_03_PLAN_YEAR_SET',
        type: 'ajax',
        method: 'POST',
        params: {
            V_V_GUID: V_GUID,
            V_V_YEAR: Ext.getCmp('year').getValue(),
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
            V_V_EQUTYPECODE: Ext.getCmp('sblx').getValue(),
            V_V_EQUCODE: Ext.getCmp('sbmc').getValue(),
            V_V_REPAIRMAJOR_CODE: Ext.getCmp('zy').getValue(),
            V_V_CONTENT: Ext.getCmp('jxnr').getValue(),
            V_V_STARTTIME: Ext.getCmp('jhtgsj').getSubmitValue() + " " + Ext.getCmp('tghour').getValue() + ":" + Ext.getCmp('tgminute').getValue() + ":00",
            V_V_ENDTIME: Ext.getCmp('jhjgsj').getSubmitValue() + " " + Ext.getCmp('jghour').getValue() + ":" + Ext.getCmp('jgminute').getValue() + ":00",
            V_V_SUMHOUR: Ext.getCmp('jhgshj').getValue(),
            V_V_BZ: Ext.getCmp('bz').getValue(),
            V_V_INPER: Ext.util.Cookies.get('v_personcode'),
            V_V_JHMX_GUID: ""

        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.success) {//成功，会传回true
                Ext.MessageBox.alert('提示', '保存成功');
                SAVELOAD = true;



            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: data.message,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        },
        failure: function (response) {//访问到后台时执行的方法。
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            })
        }

    })
}

function OnButtonUpClicked() {




    if(SAVELOAD)
    {
        var gridStore = Ext.data.StoreManager.lookup('gridStore');
        Ext.Ajax.request({
            url: AppUrl + 'hp/PRO_PM_03_PLAN_YEAR_SEND',
            type: 'ajax',
            method: 'POST',
            params: {
                V_V_GUID: V_GUID,
                V_V_ORGCODE: Ext.getCmp('ck').getValue(),
                V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
                V_V_FLOWCODE: gridStore.getAt(0).get('V_FLOWCODE'),
                V_V_PLANTYPE: "YEAR",
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode')
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);//后台返回的值
                if (data.success) {//成功，会传回true
                    Ext.MessageBox.alert('提示', '重新上报成功', callBack);
                    function callBack(id) {
                        window.opener.QueryGrid();
                        _close();
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
            failure: function (response) {//访问到后台时执行的方法。
                Ext.MessageBox.show({
                    title: '错误',
                    msg: response.responseText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                })
            }

        })
    }else{
        Ext.MessageBox.alert('提示', '请先执行保存按钮');

    }


}