var win;//父窗口对象，由子窗口调用
var returnValue;//父窗口对象，由子窗口调用

var V_ORGCODE;
var V_ORGNAME;
var V_DEPTCODE;
var V_DEPTNAME;
var V_EQUTYPECODE;
var V_EQUTYPENAME;
var V_GGXH;
var V_GUID;

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
                Ext.getCmp('equipFormEquipType').select(store.first());
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
                Ext.getCmp('equipFormGgxh').select(store.first());
            }
        }
    });

    //树图store
    var treeStore = Ext.create('Ext.data.TreeStore', {
        storeId: 'treeStore',
        autoLoad: false,
        loading: false,
        root: {},//保证autoload有效，自动加载或者不自动加载
        pageSize: 20,
        fields: ['V_DEPTCODE', 'V_DEPTNAME', 'DEPTCODE', 'DEPTNAME', 'V_ORGCODE', 'V_ORGNAME', 'V_EQUTYPENAME', 'V_EQUTYPECODE', 'V_GUID'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            url: AppUrl + 'oil/tree',
            type: 'ajax',
            async: false,//false=同步
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'children',
                totalProperty: 'total'
            }
        })
    });

    //设备名称store
    var equipStore = Ext.create('Ext.data.Store', {
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
                if (store.first().data.V_EQUCODE != '%') {
                    store.insert(0, {
                        V_EQUCODE: '%',
                        V_EQUNAME: '全部',
                        V_EQUSITE: '%',
                        V_EQUSITENAME: '全部'
                    });
                }
                Ext.getCmp('equip').select(store.first());
            }
        }
    });

    //当前设备store
    var standardInfoStore = Ext.create('Ext.data.Store', { //grid数据的store
        storeId: 'standardInfoStore',
        autoLoad: false,
        loading: false,
        pageSize: 10,
        fields: ['I_ID', 'V_GGXH', 'V_BZ_NAME', 'V_EQUCODE', 'V_EQUNAME', 'V_ORGNAME', 'V_ORGCODE', 'V_DEPTNAME', 'V_DEPTCODE', 'V_EQUTYPENAME', 'V_EQUTYPECODE', 'V_BZ_CODE'],
        proxy: {
            url: AppUrl + 'oil/selectStardArdInfo',
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

    //新增规格型号的弹窗
    var insertGgxhWindow = Ext.create('Ext.window.Window', {
        id: 'insertGgxhWindow',
        layout: 'column',
        modal: true,//弹出窗口时后面背景不可编辑
        title: '新增规格型号',
        closeAction: 'hide',
        closable: true,
        width: 400,
        height: 220,
        defaults: {
            labelAlign: 'right',
            labelWidth: 100,
            inputWidth: 140,
            margin: '4,0,0,0'
        },
        items: [{
            xtype: 'textfield',
            id: 'insertGgxhOrgName',
            name: 'insertGgxhOrgName',
            readOnly: true,
            fieldLabel: '厂矿',
        }, {
            xtype: 'textfield',
            id: 'insertGgxhOrgCode',
            name: 'insertGgxhOrgCode',
            readOnly: true,
            hidden: true,
            fieldLabel: '厂矿编码',
        }, {
            xtype: 'textfield',
            id: 'insertGgxhDeptName',
            name: 'insertGgxhDeptName',
            readOnly: true,
            fieldLabel: '作业区',
        }, {
            xtype: 'textfield',
            id: 'insertGgxhDeptCode',
            name: 'insertGgxhDeptCode',
            readOnly: true,
            hidden: true,
            fieldLabel: '作业区编码',
        }, {
            xtype: 'textfield',
            id: 'insertGgxhEquipTypeName',
            name: 'insertGgxhEquipTypeName',
            readOnly: true,
            fieldLabel: '设备类型',
        }, {
            xtype: 'textfield',
            id: 'insertGgxhEquipTypeCode',
            name: 'insertGgxhEquipTypeCode',
            readOnly: true,
            hidden: true,
            fieldLabel: '设备类型编码',
        }, {
            xtype: 'textfield',
            id: 'ggxh',
            name: 'ggxh',
            fieldLabel: '规格型号',
        }],
        buttons: [{
            xtype: 'button',
            text: '保存',
            width: 40,
            handler: _setInsertGgxh
        }, {
            xtype: 'button',
            text: '关闭',
            width: 40,
            handler: function () {
                Ext.getCmp('insertGgxhWindow').hide();
            }
        }]
    });

    var treePanel = Ext.create('Ext.tree.Panel', {
        id: 'treePanel',
        store: treeStore,
        rootVisible: false,
        hideHeaders: true,
        rowLines: false,
        columnLines: false,
        frame: true,
        animate: !Ext.isIE,
        autoscroll: true,
        tbar: [
            {xtype: 'textfield', id: 'KeyWord', emptyText: '输入设备型号'},
            {
                text: '搜索', handler: function () {
                    selectStandardInfo();
                }
            }
        ],
        columns: [{
            xtype: 'treecolumn',
            dataIndex: 'V_DEPTNAME',
            style: 'text-align: center;',
            flex: 1
        }, {
            dataIndex: 'V_DEPTCODE',
            style: 'text-align: center;',
            flex: 1,
            hidden: true
        }],
        listeners: {
            itemclick: function (panel, record, item, index, e, eOpts) {
                if (record.data.DEPTCODE != '') {
                    _selectEquip(record.data);
                }else{
                    _setValue();
                }
            }
        }
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
            xtype: 'combo',
            id: 'equip',
            name: 'equip',
            store: equipStore,
            queryMode: 'local',
            valueField: 'V_EQUCODE',
            displayField: 'V_EQUNAME',
            editable: false,
            forceSelection: true,
            fieldLabel: '设备名称',
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        _select();
                    }
                }
            }
        }]
    });

    //当前设备的按钮
    var buttonPanel = Ext.create('Ext.Panel', {
        id: 'buttonPanel',
        defaults: {
            style: 'margin: 2px;'
        },
        items: [{
            xtype: 'button',
            text: '查询',
            handler: _select
        }, {
            xtype: 'button',
            text: '新增规格型号',
            handler: _insertGgxh
        }, {
            xtype: 'button',
            text: '新增设备',
            handler: _insertEquip
        }, {
            xtype: 'button',
            text: '删除设备',
            handler: _delete
        }, {
            xtype: 'button',
            text: '导出EXCEL',
            handler: _export
        }]
    });

    //当前设备panel
    var standardInfoPanel = Ext.create('Ext.grid.Panel', {
        id: 'standardInfoPanel',
        store: standardInfoStore,
        columnLines: true,
        autoscroll: true,
        height: 440,
        frame: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        selType: 'rowmodel',
        columns: [{
            text: '序号',
            xtype: "rownumberer",
            width: '100px'
        }, {
            dataIndex: 'I_ID',
            style: 'text-align: center;',
            flex: 1,
            hidden: true
        }, {
            text: '厂矿',
            dataIndex: 'V_ORGNAME',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '作业区',
            dataIndex: 'V_DEPTNAME',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '设备类型',
            dataIndex: 'V_EQUTYPENAME',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '已匹配的规格型号',
            dataIndex: 'V_GGXH',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '设备编码',
            dataIndex: 'V_EQUCODE',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '设备名称',
            dataIndex: 'V_EQUNAME',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '设备位置',
            // dataIndex: 'V_EQUSITENAME',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '匹配模板',
            dataIndex: 'V_BZ_NAME',
            style: 'text-align: center;',
            flex: 1
        }],
        viewConfig: {
            emptyText: '<div style="text-align: center; padding-top: 50px; font: italic bold 20px Microsoft YaHei;">没有数据</div>',
            enableTextSelection: true
        },
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            store: standardInfoStore,
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
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
            items: [formPanel, buttonPanel]
        }, {
            region: 'west',
            width: '30%',
            layout: 'fit',
            items: [treePanel]
        }, {
            region: 'east',
            layout: 'fit',
            width: '70%',
            items: [standardInfoPanel]
        },]
    });

    _init();
})

function _init() {
    for (var i = 0; i < Ext.data.StoreManager.getCount(); i++) {//检查是否所有自动加载数据全部加载完毕
        if (Ext.data.StoreManager.getAt(i).isLoading()) {
            return;
        }
    }

    _selectTree();
    _select();
    Ext.getBody().unmask();
}

function _selectTree() {
    var treeStore = Ext.data.StoreManager.lookup('treeStore');
    treeStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
        V_V_GGXH: ''
    };
    treeStore.load();

    var rootnode = Ext.getCmp('treePanel').getRootNode();
    if (rootnode.childNodes.length > 0) {
        rootnode.expand();
        rootnode.childNodes[0].expand();
    }

}

//树上面的搜索按钮
function selectStandardInfo() {
    var key = Ext.getCmp('KeyWord').getValue()
    if (key == "" || key == null || key == undefined) {
        _selectTree();
    } else {
        selectTreeByKey(key);
    }
}

function selectTreeByKey(key) {
    var treeStore = Ext.data.StoreManager.lookup('treeStore');
    treeStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
        V_V_GGXH: key
    };
    treeStore.load();
    var rootnode = Ext.getCmp('treePanel').getRootNode();
    if (rootnode.childNodes.length > 0) {
        rootnode.expand();
        rootnode.childNodes[0].expand();
    }
}

//点击树的节点查询设备名称
function _selectEquip(record) {
    V_ORGCODE = record.V_ORGCODE;
    V_ORGNAME = record.V_ORGNAME;
    V_DEPTCODE = record.DEPTCODE;
    V_DEPTNAME = record.DEPTNAME;
    V_EQUTYPECODE = record.V_EQUTYPECODE;
    V_EQUTYPENAME = record.V_EQUTYPENAME;
    V_GGXH = record.V_DEPTCODE;
    V_GUID = record.V_GUID;

    var equipStore = Ext.data.StoreManager.lookup('equipStore');
    equipStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODENEXT: record.DEPTCODE,
        V_V_EQUTYPECODE: record.V_EQUTYPECODE
    };
    equipStore.load();
}

//查询按钮
function _select() {
    /*if(Ext.getCmp('equip').getValue() == null){
        Ext.MessageBox.alert('警告', '设备名称不能为空！(请点击左侧树的规格型号获得设备名称)', Ext.MessageBox.WARNING);
        return;
    }*/
    var standardInfoStore = Ext.data.StoreManager.lookup('standardInfoStore');
    standardInfoStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_ORGCODE: V_ORGCODE,
        V_V_DEPTCODE: V_DEPTCODE,
        V_V_EQUTYPECODE: V_EQUTYPECODE,
        V_V_EQUCODE: Ext.getCmp('equip').getValue(),
        V_V_GGXH: V_GGXH,
    };
    standardInfoStore.load();
}

//新增规格型号按钮
function _insertGgxh() {
    if (V_EQUTYPECODE == undefined || V_EQUTYPECODE == '' || V_EQUTYPECODE == null) {
        Ext.MessageBox.alert('提示', '请点击树的规格型号节点');
        return;
    }

    Ext.getCmp("insertGgxhOrgCode").setValue(V_ORGCODE);
    Ext.getCmp("insertGgxhOrgName").setValue(V_ORGNAME);
    Ext.getCmp("insertGgxhDeptCode").setValue(V_DEPTCODE);
    Ext.getCmp("insertGgxhDeptName").setValue(V_DEPTNAME);
    Ext.getCmp("insertGgxhEquipTypeCode").setValue(V_EQUTYPECODE);
    Ext.getCmp("insertGgxhEquipTypeName").setValue(V_EQUTYPENAME);
    Ext.getCmp("ggxh").setValue("");

    Ext.getCmp('insertGgxhWindow').show();

}

//新增设备按钮
function _insertEquip() {
    if (V_EQUTYPECODE == undefined || V_EQUTYPECODE == '' || V_EQUTYPECODE == null) {
        Ext.MessageBox.alert('提示', '请点击树的规格型号节点');
        return;
    }

    returnValue = null;
    win = Ext.create('Ext.window.Window', {
        title: '设备规格关联设备',
        modal: true,
        autoShow: true,
        maximized: false,
        maximizable: true,
        width: 560,
        height: 420,
        html: '<iframe src=' + AppUrl + 'page/Oil/OIL00020101/index.html?V_ORGCODE=' + V_ORGCODE + '&V_ORGNAME=' + V_ORGNAME + '&V_DEPTCODE=' + V_DEPTCODE + '&V_EQUTYPECODE=' + V_EQUTYPECODE + '&V_GGXH=' + V_GGXH + '&V_GUID=' + V_GUID + ' style="width: 100%; height: 100%;" frameborder="0"/ >',
        listeners : {
            close : function(panel, eOpts) {
                _select();
            }
        }
    });
}

//删除设备按钮
function _delete() {
    var records = Ext.getCmp('standardInfoPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.alert('警告', '请选择一条数据', Ext.MessageBox.WARNING);
        return;
    }else if(records.length > 1){
        Ext.MessageBox.alert('警告', '只能选择一条数据', Ext.MessageBox.WARNING);
        return;
    }

    Ext.MessageBox.show({
        title : '请确认',
        msg : '删除？',
        buttons : Ext.MessageBox.YESNO,
        icon : Ext.MessageBox.QUESTION,
        fn : function(btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    url : AppUrl + 'oil/deleteEquGgxh',
                    async : false,
                    params : {
                        'I_I_ID' : records[0].get('I_ID')
                    },
                    callback : function(options, success, response) {
                        if (success) {
                            var data = Ext.decode(response.responseText);
                            if (data.data.V_INFO == '删除成功！') {
                                Ext.MessageBox.alert('提示', '删除成功！');
                                _select();
                            } else {
                                Ext.MessageBox.alert('错误', data.message, Ext.MessageBox.ERROR);
                            }
                        } else {
                            Ext.MessageBox.alert('错误', '服务器错误', Ext.MessageBox.ERROR);
                        }
                    }
                });
            }
        }
    });

}

//导出按钮
function _export() {
    var records = Ext.getCmp('standardInfoPanel').getSelectionModel().getSelection();

    var V_ORGNAME_LIST = new Array();
    var V_DEPTNAME_LIST = new Array();
    var V_EQUTYPENAME_LIST = new Array();
    var V_GGXH_LIST = new Array();
    var V_EQUCODE_LIST = new Array();
    var V_EQUNAME_LIST = new Array();
    var V_BZ_NAME_LIST = new Array();
    for (var i = 0; i < records.length; i++) {
        V_ORGNAME_LIST.push(records[i].get('V_ORGNAME'));
        V_DEPTNAME_LIST.push(records[i].get('V_DEPTNAME'));
        V_EQUTYPENAME_LIST.push(records[i].get('V_EQUTYPENAME'));
        V_GGXH_LIST.push(records[i].get('V_GGXH'));
        V_EQUCODE_LIST.push(records[i].get('V_EQUCODE'));
        V_EQUNAME_LIST.push(records[i].get('V_EQUNAME'));
        V_BZ_NAME_LIST.push(records[i].get('V_BZ_NAME'));
    }

    if (V_ORGNAME_LIST.length > 0) {
        document.location.href = AppUrl + 'oil/excelGgxhEquip?V_ORGNAME_LIST=' + V_ORGNAME_LIST + '&V_DEPTNAME_LIST=' + V_DEPTNAME_LIST + '&V_EQUTYPENAME_LIST=' + V_EQUTYPENAME_LIST + '&V_GGXH_LIST=' + V_GGXH_LIST + '&V_EQUCODE_LIST=' + V_EQUCODE_LIST + '&V_EQUNAME_LIST=' + V_EQUNAME_LIST + '&V_BZ_NAME_LIST=' + V_BZ_NAME_LIST;
    }else{
        if( Ext.getCmp('equip').getValue() == null ||  Ext.getCmp('equip').getValue() == '' ||  Ext.getCmp('equip').getValue() == undefined){
            Ext.MessageBox.alert('警告', '设备名称不能为空！(请点击左侧树的规格型号获得设备名称)', Ext.MessageBox.WARNING);
            return;
        }
        document.location.href = AppUrl + 'oil/excelGgxhEquip?V_ORGNAME_LIST='+ V_ORGNAME_LIST +'&V_V_ORGCODE=' + V_ORGCODE + '&V_V_DEPTCODE=' + V_DEPTCODE + '&V_V_EQUTYPECODE=' + V_EQUTYPECODE + '&V_V_EQUCODE=' + Ext.getCmp('equip').getValue() + '&V_V_GGXH=' + V_GGXH+ '&V_V_PERSONCODE=' + Ext.util.Cookies.get('v_personcode') + '&page=1&limit=-1';
    }

}

//新增规格型号的保存按钮
function _setInsertGgxh() {
    if (Ext.getCmp("ggxh").getValue() == "") {
        Ext.MessageBox.alert('提示', '规格型号不能为空');
        return;
    }
    Ext.Ajax.request({
        url: AppUrl + 'oil/insertGgxh',
        method: 'POST',
        params: {
            V_V_GUID: "",
            V_V_ORGNAME: Ext.getCmp('insertGgxhOrgName').getValue(),
            V_V_ORGCODE: Ext.getCmp('insertGgxhOrgCode').getValue(),
            V_V_DEPTNAME: Ext.getCmp('insertGgxhDeptName').getValue(),
            V_V_DEPTCODE: Ext.getCmp('insertGgxhDeptCode').getValue(),
            V_V_CXCODE: "",
            V_V_CXNAME: "",
            V_V_EQUTYPENAME: Ext.getCmp('insertGgxhEquipTypeName').getValue(),
            V_V_EQUTYPECODE: Ext.getCmp('insertGgxhEquipTypeCode').getValue(),
            V_V_BZ_CODE: "",
            V_V_BZ_NAME: "",
            V_V_JSDX: "",
            V_V_GGXH: Ext.getCmp('ggxh').getValue(),
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText);
            if (resp.success) {
                Ext.MessageBox.alert('提示', resp.data.V_INFO);
                Ext.getCmp('insertGgxhWindow').hide();
                _selectTree();
                _select();
            } else {
                Ext.MessageBox.alert('提示', '保存失败！');
                return;
            }

        }
    });
}

//当点击不是树的规格节点
function _setValue() {
    V_ORGCODE = '';
    V_ORGNAME = '';
    V_DEPTCODE = '';
    V_DEPTNAME = '';
    V_EQUTYPECODE = '';
    V_EQUTYPENAME = '';
    V_GGXH = '';
}
