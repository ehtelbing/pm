var P_ID = null;
if (location.href.split('?')[1] != undefined) {
    P_ID = Ext.urlDecode(location.href.split('?')[1]).P_ID;
}

var EquipMove = [];

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

    Ext.Ajax.request({//加载被修改对象
        url: AppUrl + 'specEquip/loadEquipMove',
        async: false,
        params: {
            'I_I_ID': P_ID
        },
        callback: function (options, success, response) {
            if (success) {
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.list.length == 1) {
                    EquipMove = resp.list[0];
                }
            }
        }
    });

    var orgStore = Ext.create('Ext.data.Store', {
        storeId: 'orgStore',
        autoLoad: false,//true为自动加载
        loading: false,//自动加载时必须为true
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
                Ext.getCmp("ORG_").select(store.first());
            }
        }
    });

    var jsOrgStore = Ext.create('Ext.data.Store', {
        storeId: 'jsOrgStore',
        autoLoad: false,//true为自动加载
        loading: false,//自动加载时必须为true
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
                Ext.getCmp("V_NEWORGNAME").select(store.first());
            }
        }
    });

    var deptStore = Ext.create('Ext.data.Store', {//作业区Store
        storeId: 'deptStore',
        autoLoad: false,
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

    var jsDeptStore = Ext.create('Ext.data.Store', {//作业区Store
        storeId: 'jsDeptStore',
        autoLoad: false,
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
                Ext.getCmp("V_NEWDEPTNAME").select(store.first());
            }
        }
    });

    var deptEquTypeStore = Ext.create('Ext.data.Store', {//设备类型Store
        storeId: 'deptEquTypeStore',
        autoLoad: false,
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
            url: AppUrl + 'pm_19/PRO_GET_DEPTEQU_PER',
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
            readOnly: true,
            allowBlank: false,
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        selectDept();
                        selectDeptequType();
                        selectDeptequ();
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
            readOnly: true,
            allowBlank: false,
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        selectDeptequType();
                        selectDeptequ();
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
            readOnly: true,
            allowBlank: false,
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        selectDeptequ();
                    }
                }
            }
        }, {
            xtype: 'combo',
            id: 'DEPT_EQUIP_',
            name: 'DEPT_EQUIP_',
            fieldLabel: '设备名称',
            maxLength: 20,
            store: deptEquipStore,
            queryMode: 'local',//获取本地数据
            valueField: 'V_EQUCODE',
            displayField: 'V_EQUNAME',
            emptyText: '全部',
            forceSelection: true,//输入错误，会显示一个最接近的值
            readOnly: true,
            allowBlank: false
        }, {
            xtype: 'combo',
            id: 'V_NEWORGNAME',
            name: 'V_NEWORGNAME',
            store: jsOrgStore,
            queryMode: 'local',//获取本地数据
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            emptyText: '全部',
            forceSelection: true,//输入错误，会显示一个最接近的值
            fieldLabel: '接收厂矿',
            allowBlank: false,
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        formPanel.getForm().findField('V_NEWDEPTNAME').setValue(null);
                        selectJsDept();
                    }
                }
            }
        }, {
            xtype: 'combo',
            id: 'V_NEWDEPTNAME',
            name: 'V_NEWDEPTNAME',
            store: jsDeptStore,
            queryMode: 'local',//获取本地数据
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            emptyText: '全部',
            forceSelection: true,//输入错误，会显示一个最接近的值
            fieldLabel: '接收作业区',
            allowBlank: false
        }, {
            xtype: 'textfield',
            id: 'V_NEWADD',
            name: 'V_NEWADD',
            fieldLabel: '新使用地点',
            maxLength: 20,
            allowBlank: false
        }, {
            xtype: 'textfield',
            id: 'V_NEWSITE',
            name: 'V_NEWSITE',
            fieldLabel: '新安装位置',
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

    if (EquipMove == null) {
        Ext.MessageBox.alert('警告，加载数据失败', Ext.MessageBox.ERROR);
        return;
    }

    selectOrg();
    var form = Ext.getCmp('formPanel').getForm();
    form.findField("ORG_").setValue(EquipMove.V_ORGCODE);
    selectDept();
    form.findField("DEPT_").setValue(EquipMove.V_DEPTCODE);
    selectDeptequType();
    form.findField("DEPT_EQUIP_TYPE_").setValue(EquipMove.V_EQUTYPECODE);
    selectDeptequ();
    form.findField("DEPT_EQUIP_").setValue(EquipMove.V_EQUNCODE);
    selectJsOrg();
    form.findField("V_NEWORGNAME").setValue(EquipMove.V_NEWORGCODE);
    selectJsDept();
    form.findField("V_NEWDEPTNAME").setValue(EquipMove.V_NEWDEPTCODE);
    form.findField("V_NEWADD").setValue(EquipMove.V_NEWADD);
    form.findField("V_NEWSITE").setValue(EquipMove.V_NEWSITE);
    form.isValid();//校验数据

    Ext.getBody().unmask();
}

//查询厂矿
function selectOrg() {
    var orgStore = Ext.data.StoreManager.lookup('orgStore');
    orgStore.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
        'V_V_DEPTCODENEXT': '%',
        'V_V_DEPTTYPE': '基层单位'
    }
    orgStore.load();
}

function selectJsOrg() {
    var jsOrgStore = Ext.data.StoreManager.lookup('jsOrgStore');
    jsOrgStore.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
        'V_V_DEPTCODENEXT': '%',
        'V_V_DEPTTYPE': '基层单位'
    }
    jsOrgStore.load();
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
}

function selectJsDept() {
    var jsDeptStore = Ext.data.StoreManager.lookup('jsDeptStore');
    jsDeptStore.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODE': Ext.getCmp("V_NEWORGNAME").getValue(), //选取的厂矿的值
        'V_V_DEPTCODENEXT': '%',
        'V_V_DEPTTYPE': '主体作业区'
    }
    jsDeptStore.load();
}

//通过作业区查询设备类型
function selectDeptequType() {
    var deptEquTypeStore = Ext.data.StoreManager.lookup('deptEquTypeStore');
    deptEquTypeStore.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT': Ext.getCmp("DEPT_").getValue(), //选取的作业区的值
    }
    deptEquTypeStore.load();
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
    if (Ext.getCmp('DEPT_EQUIP_TYPE_').getRawValue() != '全部' && Ext.getCmp('DEPT_EQUIP_').getRawValue() != '全部' && Ext.getCmp('V_NEWDEPTNAME').getRawValue() != '--全部--' && Ext.getCmp('V_NEWADD').getValue() != '' && Ext.getCmp('V_NEWSITE').getValue() != '') {
        Ext.Ajax.request({
            url: AppUrl + 'specEquip/insertEquipMove',
            method: 'POST',
            params: {
                I_I_ID: P_ID,
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_ORGNAME: Ext.getCmp('ORG_').getRawValue(),
                V_V_ORGCODE: Ext.getCmp('ORG_').getValue(),
                V_V_DEPTNAME: Ext.getCmp('DEPT_').getRawValue(),
                V_V_DEPTCODE: Ext.getCmp('DEPT_').getValue(),
                V_V_EQUTYPENAME: Ext.getCmp('DEPT_EQUIP_TYPE_').getRawValue(),
                V_V_EQUTYPECODE: Ext.getCmp('DEPT_EQUIP_TYPE_').getValue(),
                V_V_EQUNAME: Ext.getCmp('DEPT_EQUIP_').getRawValue(),
                V_V_EQUCODE: Ext.getCmp('DEPT_EQUIP_').getValue(),
                V_V_NEWORGNAME: Ext.getCmp('V_NEWORGNAME').getRawValue(),
                V_V_NEWORGCODE: Ext.getCmp('V_NEWORGNAME').getValue(),
                V_V_NEWDEPTNAME: Ext.getCmp('V_NEWDEPTNAME').getRawValue(),
                V_V_NEWDEPTCODE: Ext.getCmp('V_NEWDEPTNAME').getValue(),
                V_V_NEWADD: Ext.getCmp('V_NEWADD').getValue(),
                V_V_NEWSITE: Ext.getCmp('V_NEWSITE').getRawValue(),
            },
            callback: function (options, success, response) {
                var resp = Ext.decode(response.responseText);
                parent.returnValue = resp;
                if (resp.success) {
                    var V_INFO = resp.V_INFO;
                    if (V_INFO == '保存成功！') {
                        _close()
                    } else {
                        Ext.Msg.alert('提示', '修改失败');
                    }
                } else {
                    Ext.Msg.alert('修改失败');
                }
            }
        });
    } else {
        if (Ext.getCmp('DEPT_EQUIP_TYPE_').getRawValue() == '全部') {
            Ext.Msg.alert('提示', '请选择具体设备类型');
        } else if (Ext.getCmp('DEPT_EQUIP_').getRawValue() == '全部') {
            Ext.Msg.alert('提示', '请选择具体设备名称');
        } else if (Ext.getCmp('V_NEWDEPTNAME').getRawValue() == '--全部--') {
            Ext.Msg.alert('提示', '请选择具体接收作业区');
        }
    }
}

//点击提交按钮
function _submit() {

}

function _close() {
    parent.win.close();
}