var V_DEPTCODE_UP = null;

var deptTypeList = [{
    CODE_: '[公司]',
    NAME_: '[公司]'
},{
    CODE_: '[基层单位]',
    NAME_: '[基层单位]'
}, {
    CODE_: '[检修作业区]',
    NAME_: '[检修作业区]'
}, {
    CODE_: '[信息接收]',
    NAME_: '[信息接收]'
}, {
    CODE_: '[主体作业区]',
    NAME_: '[主体作业区]'
}];

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

if (location.href.split('?')[1] != undefined) {
    V_DEPTCODE_UP = Ext.urlDecode(location.href.split('?')[1]).V_DEPTCODE;
}

Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');
    var deptTypeStore = Ext.create('Ext.data.Store', {
        storeId: 'deptTypeStore',
        fields: ['CODE_', 'NAME_'],
        data: deptTypeList
    });

    var baseDeptStore = Ext.create('Ext.data.TreeStore',{
        storeId : 'baseDeptStore',
        autoLoad : false,
        loading : false,
        root : {},//保证autoLoad有效
        pageSize : 20,
        fields : ['I_DEPTID','V_DEPTCODE','V_DEPTNAME','V_DEPTCODE_UP','V_DEPTSMALLNAME','V_DEPTFULLNAME','V_DEPTTYPE','I_ORDERID','I_FLAG','V_SAP_DEPT','V_SAP_WORK','V_SAP_JHGC','V_SAP_YWFW','D_DATE_EDITTIME','V_DEPT_WBS','V_WBS_NUM','V_WXJH_REPAIRGUID'],
        proxy : {
            url : AppUrl+'Ydj/selectBaseDept',
            type : 'ajax',
            async : false,
            actionMethods : {
                read : 'POST'
            },
            extraParams : {},
            reader : {
                type : 'json',
                root : 'list',
                totalProperty : 'total'
            }
        }
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        id: 'buttonPanel',
        defaults: {
            style: 'margin : 2px;'
        },
        items: [{
            xtype: 'button',
            text: '保存',
            handler: _insertBaseDept
        }, {
            xtype: 'button',
            text: '关闭',
            handler: _close
        }]
    });

    var formPanel = Ext.create('Ext.form.Panel', {
        id: 'formPanel',
        layout: 'column',
        columnLines: true,
        defaults: {
            labelAlign: 'right',
            labelWidth: 100,
            inputWidth: 140,
            margin: '4'
        },
        frame: true,
        autoScroll: true,
        items: [{
            xtype: 'textfield',
            name: 'V_DEPTNAME',
            fieldLabel: '部门名称',
            maxLength: 50,
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'V_DEPTCODE',
            fieldLabel: '部门编码',
            maxLength: 50,
            allowBlank: false
        }, {
            multiSelect: true,
            xtype: 'combo',
            name: 'V_DEPTTYPE',
            store: deptTypeStore,
            queryMode: 'local',
            valueField: 'CODE_',
            displayField: 'NAME_',
            emptyText: '请选择',
            forceSelection: true,
            inputWidth: 390,
            fieldLabel: '部门类型',
            allowBlank: false
        }, {
            xtype: 'hiddenfield',
            name: 'V_DEPTCODE_UP',
        }, {
            xtype: 'textfield',
            name: 'V_DEPTSMALLNAME',
            fieldLabel: '部门简称',
            maxLength: 50,
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'V_DEPTFULLNAME',
            fieldLabel: '部门全称',
            maxLength: 50,
            allowBlank: false
        }, {
            xtype: 'numberfield',
            name: 'I_ORDERID',
            fieldLabel: '部门排序',
            allowDecimals: false
        }, {
            xtype: 'numberfield',
            name: 'I_FLAG',
            fieldLabel: '启用标识',
            allowDecimals: false
        }, {
            xtype: 'textfield',
            name: 'V_SAP_DEPT',
            fieldLabel: 'sap部门编码',
            maxLength: 50
        }, {
            xtype: 'textfield',
            name: 'V_SAP_WORK',
            fieldLabel: 'sap维护工厂',
            maxLength: 50
        }, {
            xtype: 'textfield',
            name: 'V_SAP_JHGC',
            fieldLabel: 'SAP计划工厂',
            maxLength: 50
        }, {
            xtype: 'textfield',
            name: 'V_SAP_YWFW',
            fieldLabel: 'SAP业务范围',
            maxLength: 50
        }, {
            xtype: 'datefield',
            name: 'D_DATE_EDITTIME',
            fieldLabel: '数据生成时间',
            format: 'Y-m-d',
            value: new Date(),
            submitFormat: 'Y-m-d H:i:s',
        }, {
            xtype: 'textfield',
            name: 'V_DEPT_WBS',
            fieldLabel: 'wbs生成码',
            maxLength: 50
        }, {
            xtype: 'textfield',
            name: 'V_WBS_NUM',
            fieldLabel: 'wbs单位序号',
            maxLength: 50
        }, {
            xtype: 'textfield',
            name: 'V_WXJH_REPAIRGUID',
            fieldLabel: '维修计划检修单位guid',
            maxLength: 50
        }]
    });
    Ext.create('Ext.container.Viewport', {
        layout: {
            type: 'border',
            regionWeights: {
                west: -1,
                east: -1,
                south: 1,
                north: 1
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
    for (var i = 0; i < Ext.data.StoreManager.getCount(); i++) {
        if (Ext.data.StoreManager.getAt(i).isLoading()) {
            return;
        }
    }
    var form = Ext.getCmp('formPanel').getForm();
    form.findField("V_DEPTCODE_UP").setValue(V_DEPTCODE_UP);
    var baseDeptStore = Ext.data.StoreManager.lookup('baseDeptStore');
    baseDeptStore.load();
    form.isValid();
    Ext.getBody().unmask();
}

function _insertBaseDept() {
    var baseDeptStore = Ext.data.StoreManager.lookup('baseDeptStore');
    var form = Ext.getCmp('formPanel').getForm();
    Ext.getCmp('formPanel').getForm().submit({
        url: AppUrl + 'Ydj/insertBaseDept',
        submitEmptyText: false,
        waitMsg: '请稍候...',
        success: function (form, action) {
            var data = action.result;
            parent.returnValue = data.baseDept;
            _close();
        },
        failure: function (form, action) {
            switch (action.failureType) {
                case Ext.form.action.Action.CLIENT_INVALID:
                    Ext.MessageBox.alert('错误', '请填写相关项');
                    break;
                case Ext.form.action.Action.SERVER_INVALID:
                    Ext.MessageBox.alert('错误',  action.result.message);
                    break;
                case Ext.form.action.Action.CONNECT_FAILURE:
                    Ext.MessageBox.alert('错误', '参数异常');
                    break;
            }
        }
    });
}

function _close() {
    parent.win.close();
}

