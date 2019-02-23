var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_GUID = '';

var deptStoreLoad = false;
var sbTypeStoreLoad = false;
var sbNameStoreLoad = false;
var V_V_EQUNAME = '';
var V_V_FILEGUID = '';
var V_WORK_CRAFT = '';
var V_V_ORGCODE = '';
var V_V_DEPTCODE = '';
var V_V_EQUTYPECODE = '';
var V_V_EQUCODE = '';
var V_V_REPAIR_NAME = '';
var V_V_WORKPER_NUM = '';
var V_V_TOOL = '';
var V_V_AQ = '';
var V_V_XZ_DEPT = '';
var V_V_INPER = '';
var V_V_INTIME = '';
var V_V_ORDER = '';
var V_V_JSYQ = '';
var V_V_REPAIR_CODE = V_V_GUID;

if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_V_ORGCODE == undefined) ? V_V_ORGCODE = '' : V_V_ORGCODE = parameters.V_V_ORGCODE;
    (parameters.V_V_DEPTCODE == undefined) ? V_V_DEPTCODE = '' : V_V_DEPTCODE = parameters.V_V_DEPTCODE;
    (parameters.V_V_EQUCODE == undefined) ? V_V_EQUCODE = '' : V_V_EQUCODE = parameters.V_V_EQUCODE;
    (parameters.V_V_EQUNAME == '%25') ? V_V_EQUNAME = '%' : V_V_EQUNAME = parameters.V_V_EQUNAME;
    (parameters.V_V_GUID == undefined) ? V_V_GUID = '' : V_V_GUID = parameters.V_V_GUID;
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
        layout:{type:'table',columns:2},
        items: [{
            id: 'V_V_GXCODE',
            xtype: 'textfield',
            fieldLabel: '程序编码',
            margin: '5 0 5 10',
            labelWidth: 100,
            labelAlign: 'right',
            width: 230
        },{
            id: 'V_V_GXNAME',
            xtype: 'textfield',
            fieldLabel: '程序',
            margin: '5 0 5 5',
            labelWidth: 100,
            labelAlign: 'right',
            width: 230
        }, {
            id: 'V_V_CONTENT',
            xtype: 'textfield',
            fieldLabel: '作业步骤',
            //readOnly: true,
            margin: '5 0 5 10',
            labelWidth: 100,
            labelAlign: 'right',
            width: 230
        },{
            id: 'V_V_TIEM',
            xtype: 'textfield',
            fieldLabel: '工时（小时）',
            //readOnly: true,
            margin: '5 0 5 5',
            labelWidth: 100,
            labelAlign: 'right',
            width: 230
        },{
            xtype: 'textfield',
            id: 'V_V_WORKTYPE',
            fieldLabel: '工种',
            margin: '5 0 5 10',
            labelAlign: 'right',
            labelWidth: 100,
            width: 230
        }, {
            xtype: 'textfield',
            id: 'V_V_WORKPER_NUM',
            fieldLabel: '人数',
            margin: '5 0 5 5',
            labelAlign: 'right',
            labelWidth: 100,
            width: 230
        },  {
            xtype: 'textfield',
            id: 'V_V_TOOL',
            fieldLabel: '工器具',
            margin: '5 0 5 10',
            labelWidth: 100,
            labelAlign: 'right',
            width: 230
        },  {
            xtype: 'textfield',
            id: 'V_V_AQ',
            fieldLabel: '安全措施',
            margin: '5 0 5 5',
            labelWidth: 100,
            labelAlign: 'right',
            width: 230
        }, {
            xtype: 'textfield',
            id: 'V_V_XZ_DEPT',
            fieldLabel: '协助单位',
            margin: '5 0 5 10',
            labelWidth: 100,
            labelAlign: 'right',
            width: 230
        },{
            xtype: 'textfield',
            id: 'V_V_INPER',
            fieldLabel: '录入人',
            margin: '5 0 5 5',
            labelWidth: 100,
            labelAlign: 'right',
            width: 230
        }, {
            xtype: 'textfield',
            id: 'V_V_INTIME',
            fieldLabel: '录入时间',
            margin: '5 0 5 10',
            labelWidth: 100,
            labelAlign: 'right',
            width: 230
        },{
            xtype: 'textfield',
            id: 'V_V_ORDER',
            fieldLabel: '排序',
            margin: '5 0 5 5',
            labelWidth: 100,
            labelAlign: 'right',
            width: 230
        },
            {
            xtype: 'textfield',
            id: 'V_V_WORKWAY',
            fieldLabel: '操作方法及要求',
            //readOnly: true,
            margin: '5 0 5 10',
            labelWidth: 100,
            labelAlign: 'right',
            width: 230
        },{
            xtype: 'textfield',
            id: 'V_V_JSYQ',
            fieldLabel: '技术要求',
            //readOnly: true,
            margin: '5 0 5 5',
            labelWidth: 100,
            labelAlign: 'right',
            width: 230
        },{
            xtype: 'textfield',
            id: 'V_V_REPAIR_CODE',
            fieldLabel: '维修作业标准编码',
            value:V_V_GUID,
            readOnly: true,
            margin: '5 0 26 10',
            labelWidth: 100,
            labelAlign: 'right',
            width: 230
        },{
            layout: 'column',
            defaults: {
                labelAlign: 'right'
            },
            items: [{
                xtype: 'button',
                text: '保存',
                icon: imgpath + '/filesave.png',
                style: 'margin: 5px 0px 26px 100px',
                handler: _save
            }, {
                xtype: 'button',
                text: '取消',
                style: ' margin: 5px 0px 26px 10px',
                icon: imgpath + '/error_16x16.gif',
                handler: _close
            }]
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
        items: [{
            region: 'north',
            border: false,
            items: [inputPanel]
        }]
    });

    _init();
});

function _init() {
        Ext.getBody().unmask();

}

function _save() {

    Ext.Ajax.request({
        url: AppUrl + 'mwd/PM_REAPIR_STANDARD_GX_SET',
        type: 'ajax',
        method: 'POST',
        params: {
            'V_V_GXCODE': Ext.getCmp('V_V_GXCODE').getSubmitValue(),
            'V_V_GXNAME': Ext.getCmp('V_V_GXNAME').getSubmitValue(),
            'V_V_CONTENT': Ext.getCmp('V_V_CONTENT').getSubmitValue(),
            'V_V_TIEM': Ext.getCmp('V_V_TIEM').getSubmitValue(),
            'V_V_WORKTYPE': Ext.getCmp('V_V_WORKTYPE').getSubmitValue(),
            'V_V_WORKPER_NUM': Ext.getCmp('V_V_WORKPER_NUM').getSubmitValue(),
            'V_V_TOOL':Ext.getCmp('V_V_TOOL').getSubmitValue(),
            'V_V_AQ':Ext.getCmp('V_V_AQ').getSubmitValue(),
            'V_V_XZ_DEPT': Ext.getCmp('V_V_XZ_DEPT').getSubmitValue(),
            'V_V_INPER': Ext.getCmp('V_V_INPER').getSubmitValue(),
            'V_V_INTIME': Ext.getCmp('V_V_INTIME').getSubmitValue(),
            'V_V_ORDER': Ext.getCmp('V_V_ORDER').getSubmitValue()==''?0:Ext.getCmp('V_V_ORDER').getSubmitValue(),
            'V_V_WORKWAY': Ext.getCmp('V_V_WORKWAY').getSubmitValue(),
            'V_V_JSYQ': Ext.getCmp('V_V_JSYQ').getSubmitValue(),
            'V_V_REPAIR_CODE': Ext.getCmp('V_V_REPAIR_CODE').getSubmitValue()
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                if (data.V_INFO == 'SUCCESS') {
                    window.close();
                    window.opener._selectGX(Ext.getCmp('V_V_REPAIR_CODE').getSubmitValue());
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

function _close() {
    window.close();
}
