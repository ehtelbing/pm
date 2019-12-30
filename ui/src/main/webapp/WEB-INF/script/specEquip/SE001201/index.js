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
    Ext.getBody().mask('<spring:message code="loading" />');

    //厂矿store
    var ftyStore = Ext.create('Ext.data.Store', {
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
                Ext.getCmp('FTY_CODE_').setValue(Ext.util.Cookies.get('v_orgCode'));
                _init();//自动加载时必须调用
            }
        }
    });

    //作业区store
    var deptStore = Ext.create('Ext.data.Store', {
        storeId: 'deptStore',
        autoLoad: false,
        loading: false,
        pageSize: -1,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax",{
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
                Ext.getCmp('DEPT_CODE_').setValue(Ext.util.Cookies.get('v_deptcode'));
            }
        }
    });

    //设备类型store
    var equipTypeStore = Ext.create('Ext.data.Store', {
        storeId: 'equipTypeStore',
        autoLoad: false,
        loading: false,
        pageSize: -1,
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax",{
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

    //设备名称store
    var equipStore = Ext.create('Ext.data.Store', {
        storeId: 'equipStore',
        autoLoad: false,
        loading: false,
        pageSize: -1,
        fields: ['V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_EQUSITENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax",{
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

    //选框panel
    var formPanel = Ext.create('Ext.form.Panel', {
        id: 'formPanel',
        layout: 'column',
        frame: true,
        autoScroll: true,
        style: {
            border : 0
        },
        defaults: {
            labelAlign: 'right',
            labelWidth: 100,
            inputWidth: 140,
            margin: '4'
        },
        items: [{
            xtype: 'combo',
            name: 'FTY_CODE_',
            id: 'FTY_CODE_',
            store: ftyStore,
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            editable: false,
            forceSelection: true,
            fieldLabel: '厂矿',
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        _selectDept()
                        _selectEquipType();
                        _selectEquip();
                    }
                }
            }
        }, {
            xtype: 'combo',
            name: 'DEPT_CODE_',
            id: 'DEPT_CODE_',
            store: deptStore,
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            editable: false,
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
            name: 'equipType',
            id: 'equipType',
            store: equipTypeStore,
            queryMode: 'local',
            valueField: 'V_EQUTYPECODE',
            displayField: 'V_EQUTYPENAME',
            editable: false,
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
            xtype : 'combo',
            name: 'equip',
            id: 'equip',
            store: equipStore,
            queryMode: 'local',
            valueField: 'V_EQUCODE',
            displayField: 'V_EQUNAME',
            editable: false,
            forceSelection: true,
            fieldLabel : '设备名称'
        }, {
            xtype: 'textareafield',
            name: 'V_SCRAPREASON',
            id: 'V_SCRAPREASON',
            store: equipStore,
            queryMode: 'local',
            editable: false,
            inputWidth : 393,
            forceSelection: true,
            fieldLabel: '报废原因'
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
            handler: _insertEquScrap
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
    for (var i = 0; i < Ext.data.StoreManager.getCount(); i++) {//检查是否所有自动加载数据全部加载完毕
        if (Ext.data.StoreManager.getAt(i).isLoading()) {
            return;
        }
    }


    Ext.getCmp('FTY_CODE_').setValue(Ext.util.Cookies.get('v_orgCode'));
    _selectDept();
    Ext.getCmp('DEPT_CODE_').setValue(Ext.util.Cookies.get('v_deptcode'));
    _selectEquipType();
    _selectEquip();
    //Ext.getCmp('V_V_STATUS').select(Ext.data.StoreManager.lookup('statusStore').first());


    Ext.getBody().unmask();

}

function _selectDept(){
    var deptStore = Ext.data.StoreManager.lookup('deptStore');
    deptStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODE: Ext.getCmp('FTY_CODE_').getValue(),
        V_V_DEPTCODENEXT: '%',
        V_V_DEPTTYPE: '主体作业区'

    };
    deptStore.load();
}

function _selectEquipType(){
    var equipTypeStore = Ext.data.StoreManager.lookup('equipTypeStore');
    equipTypeStore.proxy.extraParams = {
        V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODENEXT : Ext.getCmp('DEPT_CODE_').getValue()
    };
    equipTypeStore.load();
}

function  _selectEquip(){
    var equipStore = Ext.data.StoreManager.lookup('equipStore');
    equipStore.proxy.extraParams = {
        V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODENEXT : Ext.getCmp('DEPT_CODE_').getValue(),
        V_V_EQUTYPECODE : Ext.getCmp('equipType').getValue()
    };
    equipStore.load();
}

//点击保存按钮
function _insertEquScrap() {
    if (Ext.getCmp('DEPT_CODE_').getRawValue() != '--全部--' && Ext.getCmp('equipType').getRawValue() != '全部' && Ext.getCmp('equip').getRawValue() != '--全部--' && Ext.getCmp('V_SCRAPREASON').getValue() != '') {
        Ext.Ajax.request({
            url: AppUrl + 'specEquip/setEquScrap',
            method: 'POST',
            params: {
                I_I_ID: "",
                V_V_ORGNAME: Ext.getCmp('FTY_CODE_').getRawValue(),//getRawValue()取下拉框显示的值
                V_V_ORGCODE: Ext.getCmp('FTY_CODE_').getValue(),//getValue()取下拉框选择的值
                V_V_DEPTNAME: Ext.getCmp('DEPT_CODE_').getRawValue(),
                V_V_DEPTCODE: Ext.getCmp('DEPT_CODE_').getValue(),
                V_V_EQUTYPENAME: Ext.getCmp('equipType').getRawValue(),
                V_V_EQUTYPECODE: Ext.getCmp('equipType').getValue(),
                V_V_EQUNAME: Ext.getCmp('equip').getRawValue(),
                V_V_EQUCODE: Ext.getCmp('equip').getValue(),
                V_V_SCRAPREASON: Ext.getCmp('V_SCRAPREASON').getValue(),
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode')

            },
            callback: function (options, success, response) {
                var resp = Ext.decode(response.responseText);
                if (resp.success) {
                    var V_INFO = resp.V_INFO;
                    if (V_INFO == '保存成功！') {
                        parent.returnValue = 'success';
                        _close()
                    } else {
                        Ext.Msg.alert('提示', '保存失败');
                    }
                } else {
                    Ext.Msg.alert('保存失败');
                }
            }
        });
    } else {
        if (Ext.getCmp('DEPT_CODE_').getRawValue() == '--全部--') {
            Ext.Msg.alert('提示', '请选择具体作业区');
        } else if (Ext.getCmp('equipType').getRawValue() == '全部') {
            Ext.Msg.alert('提示', '请选择具体设备类型');
        } else if (Ext.getCmp('equip').getRawValue() == '全部') {
            Ext.Msg.alert('提示', '请选择具体设备名称');
        }  else if (Ext.getCmp('V_SCRAPREASON').getValue() == '') {
            Ext.Msg.alert('提示', '请输入报废原因');
        }
    }
}

//点击提交按钮
function _submit() {
    Ext.Msg.alert('提示', "暂未处理")
}
function _close() {
    parent.win.close();
}