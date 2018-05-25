var orgStoreLoad = false;
var deptStoreLoad = false;
var sbTypeStoreLoad = false;
var sbNameStoreLoad = false;
var V_V_EDIT_GUID = '';
var V_V_FILEGUID = '';
var index = 0;
var picguidbegin;
var sh = window.screen.height / 2 - 10;
var sw = window.screen.width / 2 + 220;

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
    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果

    var orgStore = Ext.create('Ext.data.Store', {
        id: 'orgStore',
        autoLoad: true,
        fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
        proxy: {
            type: 'ajax',
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
                'V_V_DEPTCODE': Ext.util.Cookies.get('v_deptcode'),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '基层单位'
            }
        },
        listeners: {
            load: function (store, records) {
                orgStoreLoad = true;
                Ext.getCmp('V_V_ORGCODE').select(store.first());
                _init();
            }
        }
    });

    var deptStore = Ext.create('Ext.data.Store', {
        id: 'deptStore',
        autoLoad: false,
        fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            async: false
        },
        listeners: {
            load: function (store, records) {
                deptStoreLoad = true;
                Ext.getCmp('V_V_DEPTCODE').select(store.first());
                _init();
            }
        }
    });

    var sbTypeStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'sbTypeStore',
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
            },
            extraParams: {}
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('V_V_EQUTYPECODE').select(store.last());
                sbTypeStoreLoad = true;
                _init();
            }
        }
    });

    var sbNameStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'sbNameStore',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'qx/PRO_PM_07_DEPTEQU_PER_DROP',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('V_V_EQUCODE').select(store.first());
                sbNameStoreLoad = true;
                _init();
            }
        }
    });

    var jsStandardStore = Ext.create('Ext.data.Store', {
        id: 'jsStandardStore',
        autoLoad: false,
        fields: ['I_ID', 'V_GUID', 'V_EQUCODE', 'V_EQUNAME', 'V_BJ_IMG', 'V_PART_NUMBER', 'V_PART_NAME',
            'V_PART_CODE', 'V_MATERIAL', 'V_IMGSIZE', 'V_IMGGAP', 'V_VALUE', 'V_REPLACE_CYC', 'V_WEIGHT',
            'V_IMGCODE', 'V_CONTENT', 'V_ORGCODE', 'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME', 'V_EQUCHILDCODE',
            'V_EQUCHILDNAME', 'V_EQUTYPECODE','V_VALUE_DOWN','V_VALUE_UP'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'mwd/PM_REPAIR_JS_STANDARD_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'RET'
            },
            extraParams: {}
        })
    });

    var imageStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'imageStore',
        fields: ['I_ID', 'V_FILENAME', 'V_FILETYPE', 'V_INPER', 'V_INPERNAME', 'V_INTIME', 'V_GUID', 'V_FILEGUID'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'mwd/PM_REPAIRT_IMG_TABLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'RET'
            },
            extraParams: {}
        })
    });

    var jsStandardGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'jsStandardGridPanel',
        store: jsStandardStore,
        width: '50%',
        region: 'west',
        border: false,
        columnLines: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '零件编号',
            dataIndex: 'V_PART_NUMBER',
            align: 'center',
            renderer: atleft,
            width: 80
        }, {
            text: '零件名称',
            dataIndex: 'V_PART_NAME',
            align: 'center',
            renderer: atleft,
            width: 120
        }, {
            text: '零件编码',
            dataIndex: 'V_PART_CODE',
            align: 'center',
            renderer: atleft,
            width: 80
        }, {
            text: '材料',
            dataIndex: 'V_MATERIAL',
            align: 'center',
            renderer: atleft,
            width: 80
        }, {
            text: '维修技术标准',
            align: 'center',
            columns: [{
                text: '图面尺寸',
                dataIndex: 'V_IMGSIZE',
                align: 'center',
                renderer: atright,
                width: 80
            }, {
                text: '图面间隙',
                dataIndex: 'V_IMGGAP',
                align: 'center',
                renderer: atright,
                width: 80
            }, {
                text: '允许值(下限)',
                dataIndex: 'V_VALUE_DOWN',
                align: 'center',
                renderer: atright,
                width: 95
            }, {
                text: '允许值(上限)',
                dataIndex: 'V_VALUE_UP',
                align: 'center',
                renderer: atright,
                width: 95
            }]
        }, {
            text: '更换周期',
            dataIndex: 'V_REPLACE_CYC',
            align: 'center',
            renderer: atright,
            width: 80
        }, {
            text: '重量(kg)',
            dataIndex: 'V_WEIGHT',
            align: 'center',
            renderer: atright,
            width: 80
        }, {
            text: '图号',
            dataIndex: 'V_IMGCODE',
            align: 'center',
            renderer: atleft,
            width: 80
        }, {
            text: '备注',
            dataIndex: 'V_CONTENT',
            align: 'center',
            renderer: atleft,
            width: 120
        }],
        listeners: {
            itemclick: function (panel, record, item, index, e, eOpts) {
                _preViewImage(record.data.V_GUID);
            }
        }

    });

    var northpanel = Ext.create('Ext.form.Panel', {
        id: 'northpanel',
        region: 'north',
        width: '100%',
        frame: true,
        layout: 'vbox',
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'combo',
                id: 'V_V_ORGCODE',
                store: orgStore,
                fieldLabel: '单位名称',
                style: ' margin: 5px 0px 5px 0px',
                labelWidth: 70,
                labelAlign: 'right',
                editable: false,
                queryMode: 'local',
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectDept();

                    }
                }
            }, {
                xtype: 'combo',
                id: 'V_V_DEPTCODE',
                store: deptStore,
                fieldLabel: '作业区',
                style: ' margin: 5px 0px 5px 10px',
                labelWidth: 70,
                labelAlign: 'right',
                editable: false,
                queryMode: 'local',
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectEquType();
                    }

                }
            }, {
                xtype: 'combo',
                id: 'V_V_EQUTYPECODE',
                store: sbTypeStore,
                fieldLabel: '设备类型',
                style: ' margin: 5px 0px 5px 10px',
                labelWidth: 70,
                labelAlign: 'right',
                editable: false,
                queryMode: 'local',
                displayField: 'V_EQUTYPENAME',
                valueField: 'V_EQUTYPECODE',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectEquName();
                    }
                }
            }, {
                xtype: 'combo',
                id: 'V_V_EQUCODE',
                store: sbNameStore,
                fieldLabel: '设备名称',
                style: ' margin: 5px 0px 5px 10px',
                labelWidth: 70,
                labelAlign: 'right',
                editable: false,
                queryMode: 'local',
                displayField: 'V_EQUNAME',
                valueField: 'V_EQUCODE'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'V_V_EQUCHILDCODE',
                fieldLabel: '装置名称',
                labelWidth: 70,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '查询',
                style: ' margin: 5px 0px 5px 10px',
                icon: imgpath + '/search.png',
                handler: _select
            }, {
                xtype: 'button',
                text: '添加',
                style: ' margin: 5px 0px 5px 10px',
                icon: imgpath + '/add.png',
                handler: _insert
            }, {
                xtype: 'button',
                text: '修改',
                style: ' margin: 5px 0px 5px 10px',
                icon: imgpath + '/edit.png',
                handler: _update
            }, {
                xtype: 'button',
                text: '删除',
                style: ' margin: 5px 0px 5px 10px',
                icon: imgpath + '/delete.png',
                handler: _delete
            }, {
                xtype: 'button',
                text: '上一页',
                style: ' margin: 5px 0px 5px 200px',
                icon: imgpath + '/accordion_collapse.png',
                handler: _last
            }, {
                xtype: 'button',
                text: '下一页',
                style: ' margin: 5px 0px 5px 10px',
                icon: imgpath + '/accordion_expand.png',
                handler: _next
            }]
        }]
    });

    var viewImagePanel = Ext.create("Ext.form.Panel", {
        id: 'viewImagePanel',
        editable: false,
        region: 'center',
        items: [{
            layout: 'column',
            defaults: {
                labelAlign: 'right'
            },
            items: [{
                xtype: 'box',
                id: 'browseImage',
                fieldLabel: "预览图片",
                autoEl: {
                    width: window.screen.width / 2 - 110,
                    height: window.screen.height / 2 + 38,
                    tag: 'input',
                    type: 'image',
                    src: Ext.BLANK_IMAGE_URL,
                    style: 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale); border:1px solid #bebebe; margin-left: 0px;margin-top: 0px;',
                    // complete: 'off',
                    id: 'imageBrowse',
                    name: 'imageBrowse'
                }
            }]
        }]
    });


    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [jsStandardGridPanel, northpanel, viewImagePanel]

    });

    _init();
});

function _init() {
    if (orgStoreLoad && deptStoreLoad && sbTypeStoreLoad && sbNameStoreLoad) {

        Ext.getBody().unmask();//去除页面笼罩
    }

}

function _selectDept() {
    var deptStore = Ext.data.StoreManager.lookup('deptStore');
    deptStore.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODE': Ext.getCmp('V_V_ORGCODE').getValue(),
        'V_V_DEPTCODENEXT': '%',
        'V_V_DEPTTYPE': '主体作业区'
    };
    deptStore.load();

}

function _selectEquType() {
    var sbTypeStore = Ext.data.StoreManager.lookup('sbTypeStore');
    sbTypeStore.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT': Ext.getCmp('V_V_DEPTCODE').getValue()

    };
    sbTypeStore.load();
}

function _selectEquName() {
    var sbNameStore = Ext.data.StoreManager.lookup('sbNameStore');
    sbNameStore.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT': Ext.getCmp('V_V_DEPTCODE').getValue(),
        'V_V_EQUTYPECODE': Ext.getCmp('V_V_EQUTYPECODE').getValue()

    };
    sbNameStore.load();
}

function _select() {
    var jsStandardStore = Ext.data.StoreManager.lookup('jsStandardStore');
    jsStandardStore.proxy.extraParams = {
        'V_V_ORGCODE': Ext.getCmp('V_V_ORGCODE').getValue(),
        'V_V_DEPTCODE': Ext.getCmp('V_V_DEPTCODE').getValue(),
        'V_V_EQUCODE': Ext.getCmp('V_V_EQUCODE').getValue(),
        'V_V_EQUCHILDCODE': Ext.getCmp('V_V_EQUCHILDCODE').getValue(),
        'V_V_EQUTYPECODE': Ext.getCmp('V_V_EQUTYPECODE').getValue()
    };
    jsStandardStore.load();
}

function _insert() {
    var V_V_PLANTCODE = Ext.getCmp('V_V_ORGCODE').getSubmitValue();
    var V_V_DEPTCODE = Ext.getCmp('V_V_DEPTCODE').getSubmitValue();
    var V_V_EQUTYPECODE = Ext.getCmp('V_V_EQUTYPECODE').getSubmitValue();
    var V_V_EQUCODE = Ext.getCmp('V_V_EQUCODE').getSubmitValue();
    var V_V_EQUCHILDCODE = Ext.getCmp('V_V_EQUCHILDCODE').getSubmitValue();

    if(V_V_DEPTCODE == '%'){
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择作业区',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }
    if(V_V_EQUTYPECODE == '%'){
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择设备类型',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }
    if(V_V_EQUCODE == '%'){
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择设备!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }

    window.open(AppUrl + 'page/PM_01020101/index.html?V_V_PLANTCODE=' + V_V_PLANTCODE + '&V_V_DEPTCODE=' + V_V_DEPTCODE + '&V_V_EQUTYPECODE=' + V_V_EQUTYPECODE + '&V_V_EQUCODE=' + V_V_EQUCODE + '&V_V_EQUCHILDCODE=' + V_V_EQUCHILDCODE, '_blank', 'width=900,height=700,resizable=yes,scrollbars=yes');
}

function _update() {
    var records = Ext.getCmp('jsStandardGridPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择设备!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }

    window.open(AppUrl + 'page/PM_01020102/index.html?V_V_PLANTCODE=' + records[0].get('V_ORGCODE') + '&V_V_DEPTCODE=' + records[0].get('V_DEPTCODE') + '&V_V_EQUTYPECODE=' + records[0].get('V_EQUTYPECODE') + '&V_V_EQUCODE=' + records[0].get('V_EQUCODE') + '&V_V_GUID=' + records[0].get('V_GUID'), '_blank', 'width=900,height=700,resizable=yes,scrollbars=yes');
}

function _preViewImage(V_V_GUID) {
    var imageStore = Ext.data.StoreManager.lookup('imageStore');
    imageStore.proxy.extraParams = {
        'V_V_GUID': V_V_GUID,
        'V_V_FILEGUID': '',
        'V_V_FILETYPE': '检修技术标准'
    };
    imageStore.load();

    index = 0;
    if (imageStore.getCount() != 0) {
        V_V_FILEGUID = imageStore.getAt(0).get('V_FILEGUID');
        var url = AppUrl + 'mwd/PM_REPAIRT_IMG_SEL?V_V_GUID=' + V_V_GUID + '&V_V_FILEGUID=' + V_V_FILEGUID + '&V_V_FILETYPE=' + encodeURI(encodeURI('检修技术标准')) + '&V_V_FILENAME=' + encodeURI(encodeURI(imageStore.getAt(0).get('V_FILENAME')));

        Ext.getCmp("browseImage").getEl().dom.src = url;
        picguidbegin = V_V_FILEGUID;
    } else {
        var url = AppUrl + 'mwd/PM_REPAIRT_IMG_SEL?V_V_GUID=' + V_V_GUID + '&V_V_FILEGUID=' + V_V_FILEGUID + '&V_V_FILETYPE=' + encodeURI(encodeURI('检修技术标准')) + '&V_V_FILENAME=' + encodeURI(encodeURI('JSBZ'));

        Ext.getCmp("browseImage").getEl().dom.src = url;
    }
}

function _last() {
    var records = Ext.getCmp('jsStandardGridPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择设备!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }

    var imageStore = Ext.data.StoreManager.lookup('imageStore');
    if (V_V_FILEGUID == picguidbegin) {
        Ext.Msg.alert('提示信息', '已经是第一张');
        return;

    } else {
        if (index == 0) {
            Ext.Msg.alert('提示信息', '已经到第一张');
            return;
        }
        index--;
        V_V_FILEGUID = imageStore.getAt(index).get('V_FILEGUID');
        var url = AppUrl + 'mwd/PM_REPAIRT_IMG_SEL?V_V_GUID=' + imageStore.getAt(index).get('V_GUID') + '&V_V_FILEGUID=' + imageStore.getAt(index).get('V_FILEGUID') + '&V_V_FILETYPE=' + encodeURI(encodeURI('检修技术标准')) + '&V_V_FILENAME=' + encodeURI(encodeURI(imageStore.getAt(index).get('V_FILENAME')));

        Ext.getCmp("browseImage").getEl().dom.src = url;

    }

}

function _next() {
    var records = Ext.getCmp('jsStandardGridPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择设备!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }

    var imageStore = Ext.data.StoreManager.lookup('imageStore');

    if (imageStore.getCount() <= 1) {
        Ext.Msg.alert('提示信息', '已经是最后一张');
        return;
    } else {
        if (index == imageStore.getCount() - 1) {
            Ext.Msg.alert('提示信息', '已经到最后一张');
            return;
        }
        index++;
        V_V_FILEGUID = imageStore.getAt(index).get('V_FILEGUID');
        var url = AppUrl + 'mwd/PM_REPAIRT_IMG_SEL?V_V_GUID=' + imageStore.getAt(index).get('V_GUID') + '&V_V_FILEGUID=' + imageStore.getAt(index).get('V_FILEGUID') + '&V_V_FILETYPE=' + encodeURI(encodeURI('检修技术标准')) + '&V_V_FILENAME=' + encodeURI(encodeURI(imageStore.getAt(index).get('V_FILENAME')));

        Ext.getCmp("browseImage").getEl().dom.src = url;

    }
}

function _delete() {
    var records = Ext.getCmp('jsStandardGridPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择设备!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }

    Ext.Ajax.request({
        url: AppUrl + 'mwd/PM_REPAIR_JS_STANDARD_DEL',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_V_GUID': records[0].get('V_GUID')
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.V_INFO == 'success') {
                _select();
                Ext.Msg.alert('提示信息', '删除成功');
                _deleteFile(records[0].get('V_GUID'));
                _preViewImage();
            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: '删除失败',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        },
        failure: function (response) {
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    });

}

function _deleteFile(V_V_GUID) {

    Ext.Ajax.request({
        url: AppUrl + 'mwd/PM_REPAIRT_IMG_GUID_DEL',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_V_GUID': V_V_GUID
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.V_INFO == 'success') {

            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: '删除附件失败',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        },
        failure: function (response) {
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    });

}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}