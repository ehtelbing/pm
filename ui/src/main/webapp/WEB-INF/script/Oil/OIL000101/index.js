var V_GUID = null;
if (location.href.split('?')[1] != undefined) {
    V_GUID = Ext.urlDecode(location.href.split('?')[1]).V_GUID;
}

var LubricationStandard;

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
    Ext.getBody().mask('<p>页面载入中...</p>');
    if (V_GUID != null) {
        Ext.Ajax.request({//加载被修改对象
            url: AppUrl + 'oil/loadLubricationStandard',
            async: false,
            params: {
                'V_V_GUID': V_GUID
            },
            callback: function (options, success, response) {
                if (success) {
                    var resp = Ext.JSON.decode(response.responseText);
                    if (resp.list.length == 1) {
                        LubricationStandard = resp.list[0];
                    }
                }
            }
        });
    }

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
                store.data.removeAt(0);//在返回的数据源里去掉全部选项
                Ext.getCmp('DEPT_CODE_').select(store.first());
            }
        }
    });

    var productLineStore = Ext.create('Ext.data.Store', {
        storeId: 'productLineStore',
        autoLoad: false,
        loading: false,
        pageSize: -1,
        fields: ['V_CXCODE', 'V_CXNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            url: AppUrl + 'oil/selectProductLine',
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
                Ext.getCmp('V_CXCODE').select(store.first());
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
            url: AppUrl + 'oil/selectEquipType',
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
                Ext.getCmp('equipType').select(store.first());
            }
        }
    });

    var standardInfoStore = Ext.create('Ext.data.Store', {
        storeId: 'standardInfoStore',
        autoLoad: false,
        loading: false,
        pageSize: 6,
        fields: ['V_GUID', 'V_OIL_ORDER', 'V_ORGNAME', 'V_ORGCODE', 'V_DEPTNAME', 'V_DEPTCODE', 'V_EQUTYPENAME', 'V_EQUTYPECODE', 'V_EQUCODE', 'V_EQUNAME', 'V_BZ_CODE', 'V_BZ_NAME', 'V_JSDX', 'V_GGXH', 'V_LOC_CODE', 'V_LOC_NAME', 'V_SOURCE'],
        proxy: {
            url: AppUrl + 'oil/selectStandardInfo',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
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
            text: '关闭',
            handler: _close
        }]
    });

    var formPanel = Ext.create('Ext.form.Panel', {
        id: 'formPanel',
        layout: 'column',
        frame: true,
        autoScroll: true,
        style: {
            border: 0
        },
        defaults: {
            labelAlign: 'right',
            labelWidth: 100,
            inputWidth: 140,
            margin: '4'
        },
        items: [{
            xtype: 'textfield',
            name: 'V_GUID',
            id: 'V_GUID',
            fieldLabel: 'V_GUID',
            hidden:true
        }, {
            xtype: 'combo',
            id: 'FTY_CODE_',
            name: 'FTY_CODE_',
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
                        _selectDept();
                        _selectProductLine();
                        _selectEquipType();
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
            editable: false,
            forceSelection: true,
            fieldLabel: '作业区',
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        _selectProductLine();
                        _selectEquipType();
                    }
                }
            }
        }, {
            xtype: 'combo',
            id: 'V_CXCODE',
            name: 'V_CXCODE',
            store: productLineStore,
            queryMode: 'local',
            valueField: 'V_CXCODE',
            displayField: 'V_CXNAME',
            editable: false,
            forceSelection: true,
            fieldLabel: '产线',
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        _selectEquipType();
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
            editable: false,
            forceSelection: true,
            fieldLabel: '设备类型'
        }, {
            xtype: 'textfield',
            name: 'V_BZ_CODE',
            id: 'V_BZ_CODE',
            fieldLabel: '标准编码',
            allowBlank : false,
            emptyText:'请输入标准编码'
        }, {
            xtype: 'textfield',
            name: 'V_BZ_NAME',
            id: 'V_BZ_NAME',
            fieldLabel: '标准描述',
            allowBlank : false,
            emptyText:'请输入标准描述'
        }, {
            xtype: 'textfield',
            name: 'V_GGXH',
            id: 'V_GGXH',
            fieldLabel: '规格型号',
            allowBlank : false,
            emptyText:'请输入标准规格型号'
        }, {
            xtype: 'textfield',
            name: 'V_JSDX',
            id: 'V_JSDX',
            fieldLabel: '技术对象',
            allowBlank : false,
            emptyText:'请输入技术对象'
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
});

function _init() {
    for (var i = 0; i < Ext.data.StoreManager.getCount(); i++) {//检查是否所有自动加载数据全部加载完毕
        if (Ext.data.StoreManager.getAt(i).isLoading()) {
            return;
        }
    }

    if (LubricationStandard == null) {
        Ext.getCmp('FTY_CODE_').setValue(Ext.util.Cookies.get('v_orgCode'));
        _selectDept();
        _selectProductLine();
        Ext.getCmp('V_CXCODE').select(Ext.data.StoreManager.lookup('productLineStore').first());
        _selectEquipType();

    } else {
        var form = Ext.getCmp('formPanel').getForm();
        form.findField("V_GUID").setValue(V_GUID);
        form.findField("FTY_CODE_").setValue(LubricationStandard.V_ORGCODE);
        _selectDept();
        _selectProductLine();
        _selectEquipType();
        form.findField("DEPT_CODE_").setValue(LubricationStandard.V_DEPTCODE);
        form.findField("V_CXCODE").setValue(LubricationStandard.V_CXCODE);
        form.findField("equipType").setValue(LubricationStandard.V_EQUTYPECODE);
        form.findField("V_BZ_CODE").setValue(LubricationStandard.V_BZ_CODE);
        form.findField("V_BZ_NAME").setValue(LubricationStandard.V_BZ_NAME);
        form.findField("V_JSDX").setValue(LubricationStandard.V_JSDX);
        form.findField("V_GGXH").setValue(LubricationStandard.V_GGXH);
    }
    Ext.getBody().unmask();
}

function _selectProductLine() {
    var productLineStore = Ext.data.StoreManager.lookup('productLineStore');
    productLineStore.proxy.extraParams = {
        V_V_ORGCODE: Ext.getCmp('FTY_CODE_').getValue(),
        V_V_DEPTCODE: Ext.getCmp('DEPT_CODE_').getValue(),
        V_V_CXNAME: '%'
    };
    productLineStore.load();
}


function _selectDept() {
    var deptStore = Ext.data.StoreManager.lookup('deptStore');
    deptStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODE: Ext.getCmp('FTY_CODE_').getValue(),
        V_V_DEPTCODENEXT: '%',
        V_V_DEPTTYPE: '主体作业区'
    };
    deptStore.load();
}

function _selectEquipType() {
    var equipTypeStore = Ext.data.StoreManager.lookup('equipTypeStore');
    equipTypeStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_ORGCODE  :Ext.getCmp('FTY_CODE_').getValue(),
        V_V_DEPTCODE :Ext.getCmp('DEPT_CODE_').getValue(),
        V_V_CXCODE :Ext.getCmp('V_CXCODE').getValue()
    };
    equipTypeStore.load();
}

function _selectEquip() {
    var equipStore = Ext.data.StoreManager.lookup('equipStore');
    equipStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODENEXT: Ext.getCmp('DEPT_CODE_').getValue(),
        V_V_EQUTYPECODE: Ext.getCmp('equipType').getValue()
    };
    equipStore.load();
}

function _insert() {
    Ext.getCmp('formPanel').getForm().submit({
        url: AppUrl + 'oil/setLubricationStandard',
        submitEmptyText: false,
        waitMsg: '<spring:message code="processing" />',
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText);
            console.log(resp+'return');
            if (resp.success) {
                parent.returnValue = resp;
                _close();
            } else {
                Ext.MessageBox.alert('提示', '保存失败！');
                return;
            }
        },
        failure: function (form, action) {
            Ext.MessageBox.alert('操作失败', '操作失败');
        }
    });
}

function _insert() {

if(Ext.getCmp('V_GGXH').getValue() != '' && Ext.getCmp('V_JSDX').getValue() != '' && Ext.getCmp('V_BZ_NAME').getValue() != '' && Ext.getCmp('V_BZ_CODE').getValue() != ''){
    Ext.Ajax.request({
        url: AppUrl + 'oil/setLubricationStandard',
        method: 'POST',
        params: {
            V_V_GUID: V_GUID,
            V_V_ORGNAME: Ext.getCmp('FTY_CODE_').getRawValue(),
            V_V_ORGCODE: Ext.getCmp('FTY_CODE_').getValue(),
            V_V_DEPTNAME: Ext.getCmp('DEPT_CODE_').getRawValue(),
            V_V_DEPTCODE: Ext.getCmp('DEPT_CODE_').getValue(),
            V_V_CXCODE: Ext.getCmp('V_CXCODE').getValue(),
            V_V_CXNAME: Ext.getCmp('V_CXCODE').getRawValue(),
            V_V_EQUTYPENAME: Ext.getCmp('equipType').getRawValue(),
            V_V_EQUTYPECODE: Ext.getCmp('equipType').getValue(),
            V_V_BZ_CODE: Ext.getCmp('V_BZ_CODE').getValue(),
            V_V_BZ_NAME: Ext.getCmp('V_BZ_NAME').getValue(),
            V_V_JSDX: Ext.getCmp('V_JSDX').getValue(),
            V_V_GGXH: Ext.getCmp('V_GGXH').getValue(),
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText);
            if (resp.success) {
                parent.returnValue = resp;
                _close();
            } else {
                Ext.MessageBox.alert('提示', '保存失败！');
                return;
            }
        }
    });
}
 else {
     if(Ext.getCmp('V_BZ_CODE').getValue() == ''){
         Ext.Msg.alert('提示', '请输入标准编码');
     }else if(Ext.getCmp('V_BZ_NAME').getValue() == ''){
         Ext.Msg.alert('提示', '请输入标准描述');
     }else if(Ext.getCmp('V_GGXH').getValue() == ''){
         Ext.Msg.alert('提示', '请输入规格型号');
     }else if(Ext.getCmp('V_JSDX').getValue() == ''){
         Ext.Msg.alert('提示', '请输入技术对象');
     }

}
}

function _close() {
    parent.win.close();
}

