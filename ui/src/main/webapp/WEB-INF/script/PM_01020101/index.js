var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_GUID = Ext.data.IdGenerator.get('uuid').generate();
var BOOLEAN = true;
var deptStoreLoad = false;
var sbTypeStoreLoad = false;
var sbNameStoreLoad = false;

var V_V_FILEGUID = '';
var V_V_PLANTCODE = '';
var V_V_DEPTCODE = '';
var V_V_EQUTYPECODE = '';
var V_V_EQUCODE = '';
var V_V_EQUCHILDCODE = '';

if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_V_PLANTCODE == undefined) ? V_V_PLANTCODE = '' : V_V_PLANTCODE = parameters.V_V_PLANTCODE;
    (parameters.V_V_DEPTCODE == undefined) ? V_V_DEPTCODE = '' : V_V_DEPTCODE = parameters.V_V_DEPTCODE;
    (parameters.V_V_EQUTYPECODE == undefined) ? V_V_EQUTYPECODE = '' : V_V_EQUTYPECODE = parameters.V_V_EQUTYPECODE;
    (parameters.V_V_EQUCODE == undefined) ? V_V_EQUCODE = '' : V_V_EQUCODE = parameters.V_V_EQUCODE;
    (parameters.V_V_EQUCHILDCODE == undefined) ? V_V_EQUCHILDCODE = '' : V_V_EQUCHILDCODE = parameters.V_V_EQUCHILDCODE;
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
    Ext.getBody().mask('<p>页面载入中...</p>');

    var deptStore = Ext.create('Ext.data.Store', {
        id: 'deptStore',
        autoLoad: true,
        fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
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
                'V_V_DEPTCODE': V_V_PLANTCODE,
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        }),
        listeners: {
            load: function (store, records) {
                deptStoreLoad = true;
                Ext.getCmp('V_V_DEPTCODE').setValue(V_V_DEPTCODE);
                _init();
            }
        }
    });

    var sbTypeStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'sbTypeStore',
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
            load: function (store, records) {
                if (BOOLEAN) {
                    Ext.getCmp('V_V_EQUTYPECODE').setValue(V_V_EQUTYPECODE);
                    sbTypeStoreLoad = true;
                    _init();
                } else {
                    Ext.getCmp('V_V_EQUTYPECODE').select(store.first());
                }
            }
        }
    });

    var sbNameStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'sbNameStore',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
        }),
        listeners: {
            load: function (store, records) {
                if (BOOLEAN) {
                    Ext.getCmp('V_V_EQUCODE').setValue(V_V_EQUCODE);
                    sbNameStoreLoad = true;
                    _init();
                } else {
                    Ext.getCmp('V_V_EQUCODE').select(store.last());
                }
            }
        }
    });

    var imageStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'imageStore',
        fields: ['I_ID', 'V_FILENAME', 'V_FILETYPE', 'V_INPER', 'V_INPERNAME', 'V_INTIME', 'V_GUID', 'V_FILEGUID'],
        proxy: {
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
        }
    });

    var inputPanel = Ext.create('Ext.form.Panel', {
        id: 'inputPanel',
        width: '100%',
        region: 'north',
        defaults: {
            baseCls: 'my-panel-no-border'
        },
        padding: '10px 0px 0px 0px',
        baseCls: 'my-panel-no-border',
        style: 'background-color:#FFFFFF',
        frame: true,
        //  border:false,
        layout: 'vbox',
        items: [{
            layout: 'column',
            defaults: {
                xtype: 'combo',
                labelAlign: 'right'
            },
            items: [{
                xtype: 'combo',
                id: 'V_V_DEPTCODE',
                store: deptStore,
                fieldLabel: '作业区',
                style: ' margin: 5px 0px 5px 10px',
                labelWidth: 70,
                width: 230,
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
                width: 230,
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
            }]
        }, {
            layout: 'column',
            defaults: {
                xtype: 'combo',
                labelAlign: 'right'
            },
            items: [{
                xtype: 'combo',
                id: 'V_V_EQUCODE',
                store: sbNameStore,
                fieldLabel: '设备名称',
                style: ' margin: 5px 0px 5px 10px',
                labelWidth: 70,
                width: 230,
                labelAlign: 'right',
                editable: false,
                queryMode: 'local',
                displayField: 'V_EQUNAME',
                valueField: 'V_EQUCODE'
            }, {
                id: 'V_V_EQUCHILDCODE',
                xtype: 'textfield',
                fieldLabel: '装置名称',
                //readOnly: true,
                margin: '5 0 5 10',
                labelWidth: 70,
                width: 230
            }]
        }, {
            layout: 'column',
            defaults: {
                xtype: 'textfield',
                labelAlign: 'right'
            },
            items: [{
                id: 'V_V_PART_NUMBER',
                fieldLabel: '零件编号',
                margin: '5 0 5 10',
                labelWidth: 70,
                width: 210
            }, {
                xtype: 'button',
                text: '+',
                width: 28,
                handler: function () {
                },
                margin: '5 0 5 0'
            }, {
                id: 'V_V_PART_NAME',
                fieldLabel: '零件名称',
                margin: '5 0 5 0',
                labelWidth: 70,
                width: 230
            }]
        }, {
            layout: 'column',
            defaults: {
                xtype: 'textfield',
                labelAlign: 'right'
            },
            items: [{
                id: 'V_V_PART_CODE',
                xtype: 'textfield',
                fieldLabel: '零件编码',
                //readOnly: true,
                margin: '5 0 5 10',
                labelWidth: 70,
                width: 230
            }, {
                id: 'V_V_MATERIAL',
                xtype: 'textfield',
                fieldLabel: '材料',
                //readOnly: true,
                margin: '5 0 5 10',
                labelWidth: 70,
                width: 230
            }]
        }, {
            layout: 'column',
            defaults: {
                xtype: 'textfield',
                labelAlign: 'right'
            },
            items: [{
                id: 'V_V_IMGSIZE',
                xtype: 'textfield',
                fieldLabel: '图面尺寸',
                margin: '5 0 5 10',
                labelWidth: 70,
                width: 230
            }, {
                id: 'V_V_IMGGAP',
                //readOnly: true,
                fieldLabel: '图面间隙',
                margin: '5 0 5 10',
                labelWidth: 70,
                width: 230
            }]
        }, {
            layout: 'column',
            defaults: {
                xtype: 'textfield',
                labelAlign: 'right'
            },
            items: [{
                id: 'V_V_VALUE',
                fieldLabel: '允许值',
                margin: '5 0 5 10',
                labelWidth: 70,
                width: 230
            }, {
                id: 'V_V_REPLACE_CYC',
                fieldLabel: '更换周期',
                margin: '5 0 5 10',
                labelWidth: 70,
                width: 230
            }]
        }, {
            layout: 'column',
            defaults: {
                xtype: 'textfield',
                labelAlign: 'right'
            },
            items: [{
                id: 'V_V_WEIGHT',
                fieldLabel: '重量(kg)',
                margin: '5 0 5 10',
                labelWidth: 70,
                width: 230
            }, {
                id: 'V_V_IMGCODE',
                fieldLabel: '图号',
                margin: '5 0 5 10',
                labelWidth: 70,
                width: 230
            }]
        }, {
            layout: 'column',
            defaults: {
                labelAlign: 'right'
            },
            items: [{
                xtype: 'textarea',
                id: 'V_V_CONTENT',
                fieldLabel: '备注',
                margin: '5 0 5 -20',
                width: 500,
                height: 100
            }]
        }, {
            layout: 'column',
            defaults: {
                labelAlign: 'right'
            },
            items: [{
                xtype: 'filefield',
                id: 'V_V_FILE',
                name: 'V_V_FILE',
                enctype: "multipart/form-data",
                fieldLabel: '上传图片',
                buttonText: '浏览',
                //labelAlign: 'right',
                labelWidth: 70,
                inputWidth: 250,
                margin: '5 0 5 10'
            }, {
                xtype: 'button',
                text: '上传',
                width: 60,
                style: ' border:1px solid #bebebe;',
                margin: '5 0 5 10',
                handler: _upLoad
            }, {
                xtype: 'hidden',
                name: 'V_V_GUID',
                id: 'V_V_GUID'
            }, {
                xtype: 'hidden',
                name: 'V_V_FILEGUID',
                id: 'V_V_FILEGUID'
            }, {
                xtype: 'hidden',
                name: 'V_V_FILENAME',
                id: 'V_V_FILENAME'
            }, {
                xtype: 'hidden',
                name: 'V_V_FILETYPE',
                id: 'V_V_FILETYPE'
            }, {
                xtype: 'hidden',
                name: 'V_V_INPER',
                id: 'V_V_INPER'
            }, {
                xtype: 'box',
                id: 'browseImage',
                fieldLabel: "预览图片",
                autoEl: {
                    width: 380,
                    height: 385,
                    tag: 'input',
                    type: 'image',
                    src: Ext.BLANK_IMAGE_URL,
                    style: 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale); border:1px solid #bebebe; margin-left: 50px;margin-top: -345px;',
                    // complete: 'off',
                    id: 'imageBrowse',
                    name: 'imageBrowse'
                }
            }]
        }, {
            layout: 'column',
            defaults: {
                labelAlign: 'right'
            },
            items: [{
                xtype: 'button',
                text: '保存',
                icon: imgpath + '/filesave.png',
                style: 'margin: 5px 0px 5px 750px',
                handler: _insertJsStandard
            }, {
                xtype: 'button',
                text: '取消',
                style: ' margin: 5px 0px 5px 10px',
                icon: imgpath + '/error_16x16.gif',
                handler: _close
            }]
        }]
    });

    var imageGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'imageGridPanel',
        store: imageStore,
        width: '100%',
        height: window.screen.height / 2 - 230,
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
            text: '附件名称',
            dataIndex: 'V_FILENAME',
            align: 'center',
            renderer: atleft,
            width: 80
        }, {
            text: '附件类型',
            dataIndex: 'V_FILETYPE',
            align: 'center',
            renderer: atleft,
            width: 120
        }, {
            text: '录入人',
            dataIndex: 'V_INPERNAME',
            align: 'center',
            renderer: atleft,
            width: 80
        }, {
            text: '录入时间',
            dataIndex: 'V_INTIME',
            align: 'center',
            renderer: atleft,
            width: 80
        }, {
            text: '删除附件',
            dataIndex: 'V_INTIME',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href=javascript:dealWith(\'</a><a href="#" onclick="_delete(\'' + record.data.V_FILEGUID + '\',\'' + record.data.V_FILENAME + '\')">' + '删除' + '</a>';
            }
        }],
        listeners : {
            itemclick : function(panel, record, item, index, e, eOpts) {
                _preViewImage(record.data.V_GUID, record.data.V_FILEGUID, record.data.V_FILENAME);
            }
        }

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
        items: [{
            region: 'north',
            border: false,
            items: [inputPanel]
        }, {
            region: 'center',
            //layout: 'fit',
            border: false,
            items: [imageGridPanel]
        }]
    });

    _init();
});

function _init() {
    if (deptStoreLoad && sbTypeStoreLoad && sbNameStoreLoad) {

        Ext.getCmp('V_V_EQUCHILDCODE').setValue(V_V_EQUCHILDCODE);
        BOOLEAN = false;
        _selectImage();

        Ext.getBody().unmask();
    }
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

function _selectImage() {
    var imageStore = Ext.data.StoreManager.lookup('imageStore');
    imageStore.proxy.extraParams = {
        'V_V_GUID': V_V_GUID,
        'V_V_FILEGUID': V_V_FILEGUID,
        'V_V_FILETYPE': '检修技术标准'
    };
    imageStore.load();
}

function _upLoad() {
    V_V_FILEGUID = Ext.data.IdGenerator.get('uuid').generate();
    var V_V_FILE = Ext.getCmp('V_V_FILE').getSubmitValue();
    var V_V_FILENAME = V_V_FILE.substring(0, V_V_FILE.indexOf('.'));

    var inputPanel = Ext.getCmp('inputPanel');
    Ext.getCmp('V_V_GUID').setValue(V_V_GUID);
    Ext.getCmp('V_V_FILEGUID').setValue(V_V_FILEGUID);
    Ext.getCmp('V_V_FILENAME').setValue(V_V_FILENAME);
    Ext.getCmp('V_V_FILETYPE').setValue('检修技术标准');
    Ext.getCmp('V_V_FILE').setValue(V_V_FILE);
    Ext.getCmp('V_V_INPER').setValue(Ext.util.Cookies.get('v_personcode'));
    inputPanel.submit({
        url: AppUrl + 'mwd/PM_REPAIRT_IMG_INSERT',
        async: false,
        waitMsg: '上传中...',
        method: 'POST',
        success: function (ret) {
            _preViewImage(V_V_GUID, V_V_FILEGUID, V_V_FILENAME);
            _selectImage();
        },
        failure: function (resp) {
            Ext.Msg.alert('提示信息', '上传失败');
        }
    });

}

function _preViewImage(V_V_GUID, V_V_FILEGUID, V_V_FILENAME) {
    var url = AppUrl + 'mwd/PM_REPAIRT_IMG_SEL?V_V_GUID=' + V_V_GUID + '&V_V_FILEGUID=' + V_V_FILEGUID + '&V_V_FILETYPE=' + encodeURI(encodeURI('检修技术标准')) + '&V_V_FILENAME=' + encodeURI(encodeURI(V_V_FILENAME));

    Ext.getCmp("browseImage").getEl().dom.src = url;
}

function _insertJsStandard() {
    if (Ext.getCmp('V_V_PART_NUMBER').getSubmitValue() == '' || Ext.getCmp('V_V_PART_NAME').getSubmitValue() == '' || Ext.getCmp('V_V_PART_CODE').getSubmitValue() == '' || Ext.getCmp('V_V_MATERIAL').getSubmitValue() == '' || Ext.getCmp('V_V_IMGSIZE').getSubmitValue() == '' || Ext.getCmp('V_V_VALUE').getSubmitValue() == '' || Ext.getCmp('V_V_REPLACE_CYC').getSubmitValue() == '' || Ext.getCmp('V_V_WEIGHT').getSubmitValue() == '' || Ext.getCmp('V_V_IMGCODE').getSubmitValue() == '') {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请录入这些必填项!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }

    Ext.Ajax.request({
        url: AppUrl + 'mwd/PM_REPAIR_JS_STANDARD_EDIT',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_V_GUID': V_V_GUID,
            'V_V_ORGCODE': V_V_PLANTCODE,
            'V_V_DEPTCODE': Ext.getCmp('V_V_DEPTCODE').getSubmitValue(),
            'V_V_EQUCODE': Ext.getCmp('V_V_EQUCODE').getSubmitValue(),
            'V_V_EQUTYPECODE': Ext.getCmp('V_V_EQUTYPECODE').getSubmitValue(),
            'V_V_EQUCHILDCODE': Ext.getCmp('V_V_EQUCHILDCODE').getSubmitValue(),
            'V_V_BJ_IMG': V_V_GUID,
            'V_V_PART_NUMBER': Ext.getCmp('V_V_PART_NUMBER').getSubmitValue(),
            'V_V_PART_NAME': Ext.getCmp('V_V_PART_NAME').getSubmitValue(),
            'V_V_PART_CODE': Ext.getCmp('V_V_PART_CODE').getSubmitValue(),
            'V_V_MATERIAL': Ext.getCmp('V_V_MATERIAL').getSubmitValue(),
            'V_V_IMGSIZE': Ext.getCmp('V_V_IMGSIZE').getSubmitValue(),
            'V_V_IMGGAP': Ext.getCmp('V_V_IMGGAP').getSubmitValue(),
            'V_V_VALUE': Ext.getCmp('V_V_VALUE').getSubmitValue(),
            'V_V_REPLACE_CYC': Ext.getCmp('V_V_REPLACE_CYC').getSubmitValue(),
            'V_V_WEIGHT': Ext.getCmp('V_V_WEIGHT').getSubmitValue(),
            'V_V_IMGCODE': Ext.getCmp('V_V_IMGCODE').getSubmitValue(),
            'V_V_CONTENT': Ext.getCmp('V_V_CONTENT').getSubmitValue()
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                if (data.V_INFO == 'success') {
                    window.close();
                    window.opener._select();
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

function _delete(V_V_FILEGUID, V_V_FILENAME) {
    var records = Ext.getCmp('imageGridPanel').getSelectionModel().getSelection();

    Ext.Ajax.request({
        url: AppUrl + 'mwd/PM_REPAIRT_IMG_DEL',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_V_FIELGUID': V_V_FILEGUID
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.V_INFO == 'success') {
                Ext.data.StoreManager.lookup('imageStore').remove(records);
                _preViewImage(V_V_GUID, V_V_FILEGUID, V_V_FILENAME);
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

function _close() {
    window.close();
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}