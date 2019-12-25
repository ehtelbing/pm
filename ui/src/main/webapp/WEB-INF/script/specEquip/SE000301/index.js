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

    let ftyStore = Ext.create('Ext.data.Store', {
        storeId: 'ftyStore',
        autoLoad: true,//true为自动加载
        loading: true,//自动加载时必须为true
        pageSize: -1,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            type: 'ajax',
            async: true,//false=同步
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                V_V_DEPTCODENEXT: '%',
                V_V_DEPTTYPE: '基层单位'
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        },
        listeners: {
            load: function (store, records, successful, eOpts) {
                _init();//自动加载时必须调用
            }
        }
    });

    var deptStore = Ext.create('Ext.data.Store', {
        storeId: 'deptStore',
        autoLoad: false,
        loading: false,
        pageSize: -1,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            type: 'ajax',
            async: false,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }),
        listeners: {
            load: function (store, records, successful, eOpts) {
                Ext.getCmp('DEPT_CODE_').select(store.first());
            }
        }
    });

    var equipTypeStore = Ext.create('Ext.data.Store', {
        storeId: 'equipTypeStore',
        autoLoad: false,
        loading: false,
        pageSize: -1,
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
            type: 'ajax',
            async: false,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }),
        listeners: {
            load: function (store, records, successful, eOpts) {
                store.data.removeAt(0);//在返回的数据源里去掉全部选项
                Ext.getCmp('equipType').select(store.first());
            }
        }
    });

    let equipStore = Ext.create('Ext.data.Store', {
        storeId: 'equipStore',
        autoLoad: false,
        loading: false,
        pageSize: -1,
        fields: ['V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_EQUSITENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            url: AppUrl + 'pm_19/PRO_GET_DEPTEQU_PER',
            type: 'ajax',
            async: false,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }),
        listeners: {
            load: function (store, records, successful, eOpts) {
                Ext.getCmp('equip').select(store.first());
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
            id: 'FTY_CODE_',
            name: 'FTY_CODE_',
            store: ftyStore,
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            emptyText: '全部',
            forceSelection: true,
            fieldLabel: '厂矿',
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        _selectDept();
                        _selectEquipType();
                        _selectEquip();
                    }
                }
            }
        }, {
            xtype: 'combo',
            id: 'DEPT_CODE_',
            name: 'DEPT_CODE_',
            store: deptStore,
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            emptyText: '全部',
            forceSelection: true,
            fieldLabel: '作业区',
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        _selectEquipType();
                        _selectEquip();
                    }
                }
            }
        }, {
            xtype: 'combo',
            id: 'equipType',
            name: 'equipType',
            store: equipTypeStore,
            queryMode: 'local',
            valueField: 'V_EQUTYPECODE',
            displayField: 'V_EQUTYPENAME',
            emptyText: '全部',
            forceSelection: true,
            fieldLabel: '设备类型',
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        _selectEquip()
                    }
                }
            }
        }, {
            xtype: 'combo',
            id: 'equip',
            name: 'equip',
            store: equipStore,
            queryMode: 'local',
            valueField: 'V_EQUCODE',
            displayField: 'V_EQUNAME',
            emptyText: '全部',
            forceSelection: true,
            fieldLabel: '设备名称'
        }, {
            xtype: 'datefield',
            id: 'TEST_OF_TIME_',
            name: 'TEST_OF_TIME_',
            format: 'Y-m-d',
            submitFormat: 'Y-m-d',
            fieldLabel: '检定时间',
            value: Ext.util.Format.date(new Date(), "Y-m-") + "01",
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
            value: 0,
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
    Ext.getCmp('FTY_CODE_').setValue(Ext.util.Cookies.get('v_orgCode'));
    _selectDept();
    Ext.getCmp('DEPT_CODE_').setValue(Ext.util.Cookies.get('v_deptcode'));
    _selectEquipType();
    _selectEquip();

    Ext.getBody().unmask();
}

function _selectDept() {
    let deptStore = Ext.data.StoreManager.lookup('deptStore');
    deptStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODE: Ext.getCmp('FTY_CODE_').getValue(),
        V_V_DEPTCODENEXT: '%',
        V_V_DEPTTYPE: '主体作业区'
    };
    deptStore.load();
}

function _selectEquipType() {
    let equipTypeStore = Ext.data.StoreManager.lookup('equipTypeStore');
    equipTypeStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODENEXT: Ext.getCmp('DEPT_CODE_').getValue()
    };
    equipTypeStore.load();
}

function _selectEquip() {
    let equipStore = Ext.data.StoreManager.lookup('equipStore');
    equipStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODENEXT: Ext.getCmp('DEPT_CODE_').getValue(),
        V_V_EQUTYPECODE: Ext.getCmp('equipType').getValue()
    };
    equipStore.load();
}

//点击保存按钮
function _insert() {
    if(Ext.getCmp('DEPT_CODE_').getRawValue() != '--全部--' && Ext.getCmp('equipType').getRawValue() != '全部' && Ext.getCmp('equip').getRawValue() != '全部'&& Ext.getCmp('TEST_OF_TIME_').getValue() != null&& Ext.getCmp('CHECK_PARTS_').getValue() != ''&& Ext.getCmp('TEST_UNIT_').getValue() != ''&& Ext.getCmp('TEST_FEE_').getValue() != ''){
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
                V_V_ORGNAME: Ext.getCmp('FTY_CODE_').getRawValue(),
                V_V_ORGCODE: Ext.getCmp('FTY_CODE_').getValue(),
                V_V_DEPTNAME: Ext.getCmp('DEPT_CODE_').getRawValue(),
                V_V_DEPTCODE: Ext.getCmp('DEPT_CODE_').getValue(),
                V_V_EQUTYPENAME: Ext.getCmp('equipType').getRawValue(),
                V_V_EQUTYPECODE: Ext.getCmp('equipType').getValue(),
                V_V_EQUNAME: Ext.getCmp('equip').getRawValue(),
                V_V_EQUCODE: Ext.getCmp('equip').getValue(),
                V_V_CHECKTIME: date,
                V_V_CHECKPART: Ext.getCmp('CHECK_PARTS_').getSubmitValue(),
                V_V_CHECKDEPT: Ext.getCmp('TEST_UNIT_').getSubmitValue(),
                V_V_COST: Ext.getCmp('TEST_FEE_').getSubmitValue(),
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode')
            },
            success : function(response) {
                var resp = Ext.JSON.decode(response.responseText);
                if(resp.success){
                    parent.returnValue = resp.data.V_INFO;
                    _close();
                }else{
                    Ext.MessageBox.alert('提示','保存失败！');
                    return;
                }

            }
        });
    }else {
        if (Ext.getCmp('DEPT_CODE_').getRawValue() == '--全部--') {
            Ext.Msg.alert('提示', '请选择具体作业区');
        } else if (Ext.getCmp('equipType').getRawValue() == '全部') {
            Ext.Msg.alert('提示', '请选择具体设备类型');
        } else if (Ext.getCmp('equip').getRawValue() == '全部') {
            Ext.Msg.alert('提示', '请选择具体设备名称');
        } else if (Ext.getCmp('TEST_OF_TIME_').getValue() == null) {
            Ext.Msg.alert('提示', '请填写检定时间');
        } else if (Ext.getCmp('CHECK_PARTS_').getValue() == '') {
            Ext.Msg.alert('提示', '请填写检定部位');
        } else if (Ext.getCmp('TEST_UNIT_').getValue() == '') {
            Ext.Msg.alert('提示', '请填写检定单位');
        } else if (Ext.getCmp('TEST_FEE_').getSubmitValue() == '0') {
            Ext.Msg.alert('提示', '请填写检定费用');
        }
    }

}

//点击提交按钮
function _submit() {
    alert("还没写完呢，着个毛急啊")
}

function _close() {
    parent.win.close();
}