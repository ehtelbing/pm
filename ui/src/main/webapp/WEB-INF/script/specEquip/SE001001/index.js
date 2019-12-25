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
        })
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
            store: deptEquipStore,
            queryMode: 'local',//获取本地数据
            valueField: 'V_EQUCODE',
            displayField: 'V_EQUNAME',
            emptyText: '全部',
            forceSelection: true,//输入错误，会显示一个最接近的值
            fieldLabel: '设备名称'
        }, {
            xtype: 'combo',
            id: 'V_NEWORGNAME',
            name: 'V_NEWORGNAME',
            store: orgStore,
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
            allowBlank: true
        }, {
            xtype: 'textfield',
            id: 'V_NEWADD',
            name: 'V_NEWADD',
            fieldLabel: '新使用地点',
            maxLength: 20,
            allowBlank: true
        }, {
            xtype: 'textfield',
            id: 'V_NEWSITE',
            name: 'V_NEWSITE',
            fieldLabel: '新安装位置',
            maxLength: 20,
            allowBlank: true
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
    form.findField('V_NEWORGNAME').select(Ext.util.Cookies.get('v_orgCode'));//cookie厂矿
    selectDept();
    form.findField('DEPT_').select(Ext.util.Cookies.get('v_deptcode'));//cookie作业区
    selectJsDept();
    form.findField('V_NEWDEPTNAME').select(Ext.util.Cookies.get('v_deptcode'));//cookie作业区
    selectDeptequType();
    selectDeptequ();

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
    if (Ext.getCmp('DEPT_').getRawValue() != '--全部--' && Ext.getCmp('DEPT_EQUIP_TYPE_').getRawValue() != '全部' && Ext.getCmp('DEPT_EQUIP_').getRawValue() != '全部' && Ext.getCmp('V_NEWDEPTNAME').getRawValue() != '--全部--' && Ext.getCmp('V_NEWADD').getValue() != '' && Ext.getCmp('V_NEWSITE').getValue() != '') {
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
                    } else if (V_INFO == 'ORA-01403: 未找到任何数据') {
                        Ext.Msg.alert('提示', '系统错误');
                    } else {
                        Ext.Msg.alert('提示', '保存失败');
                    }
                } else {
                    Ext.Msg.alert('保存失败');
                }
            }
        });
    } else {
        if (Ext.getCmp('DEPT_').getRawValue() == '--全部--') {
            Ext.Msg.alert('提示', '请选择具体作业区');
        } else if (Ext.getCmp('DEPT_EQUIP_TYPE_').getRawValue() == '全部') {
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
    Ext.Msg.alert('提示', "还没写完呢，着个毛急啊")
}

function _close() {
    parent.win.close();
}