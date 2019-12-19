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

var P_ID = null;
if (location.href.split('?')[1] != undefined) {
    P_ID = Ext.urlDecode(location.href.split('?')[1]).P_ID;
}

Ext.onReady(function () {
    Ext.getBody().mask('<spring:message code="loading" />');

    var orgStore = Ext.create('Ext.data.Store', {
        storeId: 'orgStore',
        autoLoad: true,//true为自动加载
        loading: true,//自动加载时必须为true
        pageSize: -1,
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
            },
        }),
        listeners: {
            load: function (store, records, successful, eOpts) {
                Ext.getCmp("ORG_").select(store.first());
                _init();//自动加载时必须调用
            }
        }
    });

    var deptStore = Ext.create('Ext.data.Store', {//作业区Store
        storeId: 'deptStore',
        autoLoad: false,
        loading: false,
        pageSize: -1,
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
            extraParams: {}
        }),
        listeners: {
            load: function (store, records, successful, eOpts) {
                Ext.getCmp("DEPT_").select(store.first());
            }
        }
    });

    var deptEquTypeStore = Ext.create('Ext.data.Store', {//设备类型Store
        storeId: 'deptEquTypeStore',
        autoLoad: false,
        loading: false,
        pageSize: -1,
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
            },
            extraParams: {}
        }),
        listeners: {
            load: function (store, records, successful, eOpts) {
                Ext.getCmp("DEPT_EQUIP_TYPE_").select(store.first());
            }
        }
    });

    var deptEquipStore = Ext.create('Ext.data.Store', {//设备Store
        storeId: 'deptEquipStore',
        autoLoad: false,
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'pm_19/PRO_GET_DEPT_EQUIP_PER',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        }),
        listeners: {
            load: function (store, records, successful, eOpts) {
                Ext.getCmp("DEPT_EQUIP_").select(store.first());
            }
        }
    });

    var formPanel = Ext.create('Ext.form.Panel', {
        id: 'formPanel',
        layout: 'column',
        frame: true,
        autoScroll: true,
        defaults: {
            labelAlign: 'right',
            labelWidth: 100,
            inputWidth: 140,
            margin: '4'
        },
        items: [{
            xtype: 'combo',
            id: 'ORG_',
            name: 'ORG_',
            store: orgStore,
            queryMode: 'local',//获取本地数据
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            emptyText: '全部',
            forceSelection: true,//输入错误，会显示一个最接近的值
            fieldLabel: '选择厂矿',
            allowBlank: false,
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        deptStore.removeAll();
                        deptEquTypeStore.removeAll();
                        deptEquipStore.removeAll();
                        formPanel.getForm().findField('DEPT_').setValue(null);
                        formPanel.getForm().findField('DEPT_EQUIP_TYPE_').setValue(null);
                        formPanel.getForm().findField('DEPT_EQUIP_').setValue(null);
                        selectDept();
                    }
                }
            }
        }, {
            xtype: 'combo',
            id: 'DEPT_',
            name: 'DEPT_',
            store: deptStore,
            queryMode: 'local',//获取本地数据
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            emptyText: '全部',
            forceSelection: true,//输入错误，会显示一个最接近的值
            fieldLabel: '选择作业区',
            allowBlank: false,
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        deptEquTypeStore.removeAll();
                        deptEquipStore.removeAll();
                        formPanel.getForm().findField('DEPT_EQUIP_TYPE_').setValue(null);
                        formPanel.getForm().findField('DEPT_EQUIP_').setValue(null);
                        selectDeptequType();
                    }
                }
            }
        }, {
            xtype: 'combo',
            id: 'DEPT_EQUIP_TYPE_',
            name: 'DEPT_EQUIP_TYPE_',
            store: deptEquTypeStore,
            queryMode: 'local',//获取本地数据
            valueField: 'V_EQUTYPECODE',
            displayField: 'V_EQUTYPENAME',
            emptyText: '全部',
            forceSelection: true,//输入错误，会显示一个最接近的值
            fieldLabel: '设备类型',
            allowBlank: false,
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        deptEquipStore.removeAll();
                        formPanel.getForm().findField('DEPT_EQUIP_').setValue(null);
                        selectDeptequ();
                    }
                }
            }
        }, {
            xtype: 'combo',
            id: 'DEPT_EQUIP_',
            name: 'DEPT_EQUIP_',
            store: deptEquipStore,
            queryMode: 'local',//获取本地数据
            valueField: 'V_EQUCODE',
            displayField: 'V_EQUNAME',
            emptyText: '全部',
            forceSelection: true,//输入错误，会显示一个最接近的值
            fieldLabel: '设备名称'
        }, {
            xtype: 'datefield',
            id: 'TEST_OF_TIME_',
            name: 'TEST_OF_TIME_',
            format: 'Y-m-d',
            submitFormat: 'Y-m-d',
            fieldLabel: '检定时间',
            allowBlank: false
        }, {
            xtype: 'textfield',
            id: 'CHECK_PARTS_',
            name: 'CHECK_PARTS_',
            fieldLabel: '检定部位',
            maxLength: 20,
            allowBlank: false
        }, {
            xtype: 'textfield',
            id: 'TEST_UNIT_',
            name: 'TEST_UNIT_',
            fieldLabel: '检定单位',
            maxLength: 20,
            allowBlank: false
        }, {
            xtype: 'numberfield',
            id: 'TEST_FEE_',
            name: 'TEST_FEE_',
            fieldLabel: '检测费用(元)',
            decimalPrecision: 2,
            maxLength: 20,
            allowBlank: false
        }]
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        id: 'buttonPanel',
        defaults: {
            style: 'margin: 2px;'
        },
        items: [{
            xtype: 'button',
            text: '保存',
            handler: _insert
        }, {
            xtype: 'button',
            text: '提交',
            handler: _submit
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
        defaults: {
            border: false
        },
        items: [{
            region: 'north',
            items: [buttonPanel]
        }, {
            region: 'center',
            layout: 'fit',
            items: [formPanel]
        }]
    });

    _init();

})

function _init() {
    for (var i = 0; i < Ext.data.StoreManager.getCount(); i++) {
        if (Ext.data.StoreManager.getAt(i).isLoading()) {
            return;
        }
    }

    var form = Ext.getCmp('formPanel').getForm();
    form.findField('ORG_').select(Ext.util.Cookies.get('v_orgCode'));//cookie厂矿
    selectDept();
    form.findField('DEPT_').select(Ext.util.Cookies.get('v_deptcode'));//cookie作业区
    selectDeptequType();
    selectDeptequ();
    form.findField('TEST_FEE_').setValue("0");
    form.isValid();//校验数据

    Ext.getBody().unmask();
}

//通过厂矿查询作业区
function selectDept() {
    var deptStore = Ext.data.StoreManager.lookup('deptStore');
    deptStore.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODE': Ext.getCmp("ORG_").getValue(), //选取的厂矿的值
        'V_V_DEPTCODENEXT': '%',
        'V_V_DEPTTYPE': '主体作业区'
    }
    deptStore.load();
    Ext.getCmp("DEPT_").select(deptStore.first());
}

//通过作业区查询设备类型
function selectDeptequType() {
    var deptEquTypeStore = Ext.data.StoreManager.lookup('deptEquTypeStore');
    deptEquTypeStore.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT': Ext.getCmp("DEPT_").getValue(), //选取的作业区的值
    }
    deptEquTypeStore.load();
    Ext.getCmp("DEPT_EQUIP_TYPE_").select(deptEquTypeStore.first());
}

//通过作业区和设备类型查询设备名称
function selectDeptequ() {
    var deptEquipStore = Ext.data.StoreManager.lookup('deptEquipStore');
    deptEquipStore.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT': Ext.getCmp("DEPT_").getValue(), //选取的作业区的值
        'V_V_EQUTYPECODE': Ext.getCmp("DEPT_EQUIP_TYPE_").getValue(), //选取的设备类型的值
    }
    deptEquipStore.load();
}

//点击保存按钮
function _insert() {
    var year = new Date(Ext.getCmp('TEST_OF_TIME_').getSubmitValue()).getFullYear();
    var month = new Date(Ext.getCmp('TEST_OF_TIME_').getSubmitValue()).getMonth() + 1;
    var day = new Date(Ext.getCmp('TEST_OF_TIME_').getSubmitValue()).getDate();
    if(month < 10){
        month ="0" + month;
    }
    if(day < 10){
        day ="0" + day;
    }
    var date = year +"-" + month + "-" + day;
    Ext.Ajax.request({
        url: AppUrl + 'specEquip/insertPlanApply',
        method : 'POST',
        params : {
            I_I_ID: P_ID,
            V_V_ORGNAME: Ext.getCmp('ORG_').getRawValue(),
            V_V_ORGCODE: Ext.getCmp('ORG_').getValue(),
            V_V_DEPTNAME: Ext.getCmp('DEPT_').getRawValue(),
            V_V_DEPTCODE: Ext.getCmp('DEPT_').getValue(),
            V_V_EQUTYPENAME: Ext.getCmp('DEPT_EQUIP_TYPE_').getRawValue(),
            V_V_EQUTYPECODE: Ext.getCmp('DEPT_EQUIP_TYPE_').getValue(),
            V_V_EQUNAME: Ext.getCmp('DEPT_EQUIP_').getRawValue(),
            V_V_EQUCODE: Ext.getCmp('DEPT_EQUIP_').getValue(),
           // V_V_CHECKTIME: Ext.getCmp('TEST_OF_TIME_').getSubmitValue(),
            V_V_CHECKTIME: date,
            V_V_CHECKPART: Ext.getCmp('CHECK_PARTS_').getSubmitValue(),
            V_V_CHECKDEPT: Ext.getCmp('TEST_UNIT_').getSubmitValue(),
            V_V_COST: Ext.getCmp('TEST_FEE_').getSubmitValue(),
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode')
        },
        success : function(response) {
            var resp = Ext.JSON.decode(response.responseText);
            if(resp.data.V_INFO =="SQLERRM"){
                alert("新增失败");
                return;
            }else{
                alert(resp.data.V_INFO);
                _close();

            }

        }
    });
}

//点击提交按钮
function _submit() {
    alert("还没写完呢，着个毛急啊")
}

function _close() {
    parent.win.close();
}