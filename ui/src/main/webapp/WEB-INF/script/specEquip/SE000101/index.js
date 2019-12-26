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

var P_ID = null;//解析URL参数
var P_DT = null;//解析URL参数
var P_DD = null;//解析URL参数
var P_ET = null;//解析URL参数
var P_EN = null;//解析URL参数
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.P_ID != undefined) ? P_ID = parameters.P_ID : "";
    (parameters.P_DT != undefined) ? P_DT = parameters.P_DT : "";
    (parameters.P_DD != undefined) ? P_DD = parameters.P_DD : "";
    (parameters.P_ET != undefined) ? P_ET = parameters.P_ET : "";
    (parameters.P_EN != undefined) ? P_EN = parameters.P_EN : "";
}

Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');

    //附件类型store
    var attachDicStore = Ext.create('Ext.data.Store', {
        storeId: 'attachDicStore',
        autoLoad: true,//true为自动加载
        loading: true,//自动加载时必须为true
        pageSize: -1,
        fields: ['I_ID', 'V_ATTACHNAME'],
        proxy: {
            url: AppUrl + 'specEquip/selectAttachDic',
            type: 'ajax',
            async: true,//false=同步
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
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

    var equFilesAttachStore = Ext.create('Ext.data.Store', {
        storeId: 'equFilesAttachStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['I_ID', 'V_ORGNAME', 'V_DEPTNAME', 'V_EQUTYPENAME', 'V_EQUNAME', 'V_FILENAME', 'V_UPMAN', 'V_UPDATE', 'V_EQUNCODE', 'V_REPORTNAME'],
        proxy: {
            url: AppUrl + 'specEquip/selectEquFilesAttach',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        }
    });


    var infoFormPanel = Ext.create('Ext.form.Panel', {
        id: 'infoFormPanel',
        layout: 'column',
        frame: true,
        autoScroll: true,
        style: {
            border: 0
        },
        defaults: {
            labelAlign: 'right',
            labelWidth: 100,
            inputWidth: 100,
            margin: '4'
        },
        items: [{
            xtype: 'displayfield',
            name: 'P_DT',
            fieldLabel: '厂矿',
            value : P_DT
        }, {
            xtype: 'displayfield',
            name: 'P_DD',
            fieldLabel: '作业区',
            value : P_DD
        }, {
            xtype: 'displayfield',
            name: 'P_ET',
            fieldLabel: '设备类型',
            value : P_ET
        }, {
            xtype: 'displayfield',
            name: 'P_EN',
            fieldLabel: '设备名称',
            value : P_EN
        }]
    });

    var formPanel = Ext.create('Ext.form.Panel', {
        id: 'formPanel',
        layout: 'column',
        frame: true,
        style: {
            border: 0
        },
        defaults: {
            labelAlign: 'right',
            inputWidth: 400,
            margin: '4,0,0,0'
        },
        items: [{
            xtype: 'combo',
            id: 'V_V_ATTACHNAME',
            store: attachDicStore,
            queryMode: 'local',
            valueField: 'V_ATTACHNAME',
            displayField: 'V_ATTACHNAME',
            forceSelection: true,
            allowBlank: false,
            listeners: {
                select: function (combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        _selectEquFilesAttach();//查询加载主表数据
                    }
                }
            }
        }, {
            xtype: 'button',
            text: '上传',
            handler: _preUploadFile
        }]
    });

    var gridPanel = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel',
        store: equFilesAttachStore,
        columnLines: true,
        frame: true,
        style: {
            border: 0
        },
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns: [{
            text: '附件名称',
            dataIndex: 'V_REPORTNAME',
            align: 'center;',
            flex: 1
        },{
            text: '附件类型',
            dataIndex: 'V_FILENAME',
            align: 'center;',
            flex: 1
        }, {
            text: '上传人',
            dataIndex: 'V_UPMAN',
            align: 'center;',
            width: 120
        }, {
            text: '上传时间',
            dataIndex: 'V_UPDATE',
            align: 'center;',
            width: 160,
            renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                return (value != null) ? value.substring(0,10) : '';
            }
        }, {
            text: '下载',
            dataIndex: 'HR_FEE_',
            align: 'center;',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                return '<a href="javascript:_downloadEquFilesAttach(\'' + record.data.I_ID + '\',\'' + record.data.V_REPORTNAME + '\')">' + '下载' + '</a>';
            }
        }, {
            text: '删除',
            dataIndex: 'UTIL_FEE_',
            align: 'center;',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                return '<a href="javascript:_deleteEquFilesAttach(\'' + record.data.I_ID + '\',\'' + rowIndex + '\')">' + '删除' + '</a>';
            }
        }],
        viewConfig: {
            emptyText: '<div style="text-align: center; padding-top: 50px; font: italic bold 20px Microsoft YaHei;">没有数据</div>'
        },
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            store: equFilesAttachStore,
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
        }]
    });

    var fileFormPanel = Ext.create('Ext.form.Panel', {
        id: 'fileFormPanel',
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
            xtype : 'textfield',
            name : 'V_V_ECODE',
            fieldLabel : 'V_V_ECODE',
            hidden: true
        }, {
            xtype : 'textfield',
            name : 'V_V_PERSONCODE',
            fieldLabel : ' V_V_PERSONCODE',
            hidden: true
        }, {
            xtype : 'textfield',
            name : 'V_V_ATTACH_TYPE',
            fieldLabel : 'V_V_ATTACH_TYPE',
            hidden: true
        }, {
            xtype : 'filefield',//上传文件录入
            name : 'B_B_CONTENT',
            fieldLabel : '附件',
            buttonText : '请选择',
            inputWidth : 340,
            style : 'clear: both'//换行显示
        } ]
    });

    var chooseFileWindow = Ext.create('Ext.window.Window', {
        id : 'chooseFileWindow',
        layout : 'column',
        modal : true,//弹出窗口时后面背景不可编辑
        title : '选择附件',
        closeAction : 'hide',
        closable : true,
        defaults : {
            labelAlign : 'right',
            labelWidth : 100,
            inputWidth : 140,
            margin : '4,0,0,0'
        },
        items : [ fileFormPanel ],
        buttons : [ {
            xtype : 'button',
            text : '确定',
            width : 40,
            handler : _uploadEquFilesAttach
        }, {
            xtype : 'button',
            text : '取消',
            width : 40,
            handler : function() {
                Ext.getCmp('chooseFileWindow').hide();
            }
        } ]
    });

    var equFileAttachComboPanel = Ext.create('Ext.Panel', {
        id: 'equFileAttachComboPanel',
        layout: 'border',
        defaults: {
            border: false
        },
        items: [{
            region: 'north',
            items: [formPanel]
        }, {
            region: 'center',
            layout: 'fit',
            items: [gridPanel]
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
            items: [infoFormPanel]
        }, {
            region: 'center',
            layout: 'fit',
            items: [equFileAttachComboPanel]
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

    Ext.getCmp('V_V_ATTACHNAME').select(Ext.data.StoreManager.lookup('attachDicStore').first());

    _selectEquFilesAttach();//查询加载主表数据
    Ext.getBody().unmask();

}

function _selectEquFilesAttach(){
    var equFilesAttachStore = Ext.data.StoreManager.lookup('equFilesAttachStore');
    equFilesAttachStore.proxy.extraParams = {
        V_V_ECODE: P_ID,
        V_V_ATTACH_TYPE: Ext.getCmp('V_V_ATTACHNAME').getValue()
    };
    equFilesAttachStore.currentPage = 1;
    equFilesAttachStore.load();
}

function _preUploadFile() {
    var fileForm = Ext.getCmp('fileFormPanel').getForm();
    fileForm.findField('V_V_ECODE').setValue(P_ID);
    fileForm.findField('V_V_PERSONCODE').setValue(Ext.util.Cookies.get('v_personcode'));
    fileForm.findField('V_V_ATTACH_TYPE').setValue(Ext.getCmp('V_V_ATTACHNAME').getValue());
    Ext.getCmp('chooseFileWindow').show();
}

function _uploadEquFilesAttach(){
    Ext.getCmp('fileFormPanel').getForm().submit({
        url : AppUrl + 'specEquip/uploadEquFilesAttach',
        submitEmptyText : false,
        waitMsg : '处理中',
        success : function(form, action) {
            var data = action.result;
            Ext.MessageBox.alert('提示', data.V_INFO );
            Ext.getCmp('chooseFileWindow').hide();
            _selectEquFilesAttach();
            //_select();
        },
        failure : function(form, action) {
            var data = action.result;
            Ext.MessageBox.alert('提示', data.V_INFO );
            return;
        }
    });
}

function _downloadEquFilesAttach(I_ID, V_REPORTNAME) {
    document.location.href = AppUrl + 'specEquip/downloadEquFilesAttach?I_I_ID=' + I_ID + '&V_V_REPORTNAME=' + V_REPORTNAME;
}

function _deleteEquFilesAttach(I_ID, rowIndex) {
    Ext.Ajax.request({
        url: AppUrl + 'specEquip/deleteEquFilesAttach',
        async: false,
        params: {
            I_I_ID: I_ID
        },
        callback: function (options, success, response) {
            if (success) {
                var data = Ext.decode(response.responseText);
                _selectEquFilesAttach();

                Ext.MessageBox.alert('提示', data.V_INFO );
            } else {
                Ext.MessageBox.alert('错误', '系统错误', Ext.MessageBox.ERROR);
            }
        }
    });
}


