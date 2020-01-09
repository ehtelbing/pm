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

var V_ORGCODE = null;
var V_ORGNAME = null;
var V_DEPTCODE = null;
var V_EQUTYPECODE = null;
var V_GGXH = null;
var V_GUID = null
if (location.href.split('?')[1] != undefined) {
    V_ORGCODE = Ext.urlDecode(location.href.split('?')[1]).V_ORGCODE;
    V_ORGNAME = Ext.urlDecode(location.href.split('?')[1]).V_ORGNAME;
    V_DEPTCODE = Ext.urlDecode(location.href.split('?')[1]).V_DEPTCODE;
    V_EQUTYPECODE = Ext.urlDecode(location.href.split('?')[1]).V_EQUTYPECODE;
    V_GGXH = Ext.urlDecode(location.href.split('?')[1]).V_GGXH;
    V_GUID = Ext.urlDecode(location.href.split('?')[1]).V_GUID;
}

Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');

    //作业区的store
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
        })
    });

    //设备类型的store
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
                Ext.getCmp('equipType').select(store.first());
            }
        }
    });

    //规格型号的store
    var ggxhStore = Ext.create('Ext.data.Store', {
        storeId: 'ggxhStore',
        autoLoad: false,
        loading: false,
        pageSize: -1,
        fields: ['V_GGXH', 'V_BZ_NAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            url: AppUrl + 'oil/selectStandardInfoEquType',
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
                Ext.getCmp('ggxh').select(store.first());
            }
        }
    });

    //新增设备的store
    var insertEquipStore = Ext.create('Ext.data.Store', { //grid数据的store
        storeId: 'insertEquipStore',
        autoLoad: false,
        loading: false,
        pageSize: 10,
        fields: ['V_EQUCODE', 'V_EQUNAME', 'V_EQUSITENAME', 'V_GGXH'],
        proxy: {
            url: AppUrl + 'oil/selectInsertEquip',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    var formPanel = Ext.create('Ext.form.Panel', {
        id : 'formPanel',
        layout : 'column',
        frame : true,
        autoScroll : true,
        defaults : {
            labelAlign : 'right',
            labelWidth : 100,
            inputWidth : 140,
            margin : '4'
        },
        items: [{
            xtype: 'textfield',
            id: 'orgName',
            name: 'orgName',
            fieldLabel: '厂矿',
            readOnly: true,
        }, {
            xtype: 'textfield',
            id: 'orgCode',
            name: 'orgCode',
            fieldLabel: '厂矿编码',
            hidden: true,

        }, {
            xtype: 'combo',
            id: 'dept',
            name: 'dept',
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
                        _selectGgxh();
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
            fieldLabel: '设备类型',
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        _selectGgxh();
                    }
                }
            }
        }, {
            xtype: 'combo',
            id: 'ggxh',
            name: 'ggxh',
            store: ggxhStore,
            queryMode: 'local',
            valueField: 'V_GGXH',
            displayField: 'V_GGXH',
            editable: false,
            forceSelection: true,
            fieldLabel: '匹配型号',
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        selectEquip();
                    }
                }
            }
        }]
    });

    var equipPanel = Ext.create('Ext.grid.Panel', {
        id: 'equipPanel',
        store: insertEquipStore,
        columnLines: true,
        frame: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [{
            text: '序号',
            xtype: "rownumberer",
            width: '100px'
        }, {
            text : '设备编码',
            dataIndex : 'V_EQUCODE',
            style : 'text-align: center;',
            flex : 1
        }, {
            text : '设备名称',
            dataIndex : 'V_EQUNAME',
            style : 'text-align: center;',
            flex : 1
        }, {
            text : '设备位置',
            dataIndex : 'V_EQUSITENAME',
            style : 'text-align: center;',
            flex : 1
        }, {
            text : '已匹配规格型号',
            dataIndex : 'V_GGXH',
            style : 'text-align: center;',
            flex : 1
        } ],
        viewConfig: {
            emptyText: '<div style="text-align: center; padding-top: 50px; font: italic bold 20px Microsoft YaHei;">没有数据</div>',
            enableTextSelection: true
        },
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            store: insertEquipStore,
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
        }]
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        id : 'buttonPanel',
        defaults : {
            style : 'margin: 2px; float: right'
        },
        items : [ {
            xtype : 'button',
            text : '关闭',
            handler : _close
        }, {
            xtype : 'button',
            text : '保存',
            handler : _setInsertEquip
        } ]
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
            items: [formPanel]
        }, {
            region: 'center',
            layout: 'fit',
            items: [equipPanel]
        }, {
            region: 'south',
            items: [buttonPanel]
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

    Ext.getCmp("orgCode").setValue(V_ORGCODE);
    Ext.getCmp("orgName").setValue(V_ORGNAME);
    _selectDept();
    Ext.getCmp("dept").setValue(V_DEPTCODE);
    _selectEquipType();
    Ext.getCmp("equipType").setValue(V_EQUTYPECODE);
    _selectGgxh();
    Ext.getCmp("ggxh").setValue(V_GGXH);

    selectEquip();
    Ext.getBody().unmask();
}

function selectEquip() {
    var insertEquipStore = Ext.data.StoreManager.lookup('insertEquipStore');
    insertEquipStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_ORGCODE: Ext.getCmp('orgCode').getValue(),
        V_V_DEPTCODE: Ext.getCmp('dept').getValue(),
        V_V_EQUTYPECODE: Ext.getCmp('equipType').getValue()
    };
    insertEquipStore.load();
}

//新增设备的保存按钮
function _setInsertEquip() {
    var records = Ext.getCmp('equipPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.alert('提示', '请选择数据');
        return;
    }

    for(var i = 0; i < records.length; i++){
        Ext.Ajax.request({
            url: AppUrl + 'oil/setOilStandardEqu',
            method: 'POST',
            params: {
                V_V_GUID: V_GUID,
                V_V_ORGNAME: Ext.getCmp('orgName').getValue(),
                V_V_ORGCODE: Ext.getCmp('orgCode').getValue(),
                V_V_DEPTNAME: Ext.getCmp('dept').getRawValue(),
                V_V_DEPTCODE: Ext.getCmp('dept').getValue(),
                V_V_EQUTYPENAME: Ext.getCmp('equipType').getRawValue(),
                V_V_EQUTYPECODE: Ext.getCmp('equipType').getValue(),
                V_V_EQUNAME: records[i].get('V_EQUNAME'),
                V_V_EQUCODE: records[i].get('V_EQUCODE'),
                V_V_GGXH: Ext.getCmp('ggxh').getValue(),
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode')
            },
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success) {
                    selectEquip();
                    Ext.MessageBox.alert('提示', resp.data.V_INFO);
                } else {
                    Ext.MessageBox.alert('提示', '保存失败！');
                    return;
                }

            }
        });
    }
}

function _close() {
   parent.win.close();
}

function _selectDept() {
    var deptStore = Ext.data.StoreManager.lookup('deptStore');
    deptStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODE: Ext.getCmp('orgCode').getValue(),
        V_V_DEPTCODENEXT: '%',
        V_V_DEPTTYPE: '主体作业区'
    };
    deptStore.load();
}

function _selectEquipType() {
    var equipTypeStore = Ext.data.StoreManager.lookup('equipTypeStore');
    equipTypeStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODENEXT: Ext.getCmp('dept').getValue()
    };
    equipTypeStore.load();
}

function _selectGgxh() {
    var ggxhStore = Ext.data.StoreManager.lookup('ggxhStore');
    ggxhStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_ORGCODE: Ext.getCmp('orgCode').getValue(),
        V_V_DEPTCODE: Ext.getCmp('dept').getValue(),
        V_V_EQUTYPECODE: Ext.getCmp('equipType').getValue()
    };
    ggxhStore.load();
}