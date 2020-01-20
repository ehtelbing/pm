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

var StandardFactInfo;

var P_ID = null;//解析URL参数
var P_GID = null;//解析URL参数

if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.P_ID != undefined) ? P_ID = parameters.P_ID : "";
    (parameters.P_GID != undefined) ? P_GID = parameters.P_GID : "";
}

Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');

    if (P_GID != "") {
        Ext.Ajax.request({//加载被修改对象
            url: AppUrl + 'oil/loadStandardFactInfo',
            async: false,
            params: {
                'V_V_PERSONCODE':Ext.util.Cookies.get('v_personcode'),
                'I_I_ID': P_ID,
                'V_V_GUID':P_GID
            },
            callback: function (options, success, response) {
                if (success) {
                    var resp = Ext.JSON.decode(response.responseText);
                    StandardFactInfo = resp.list[0];
                }
            }
        });
    }

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
            name: 'I_I_ID',
            id: 'I_I_ID',
            queryMode: 'local',
            fieldLabel: 'I_I_ID：',
            hidden:true
        }, {
            xtype: 'textfield',
            name: 'V_V_P_GUID',
            id: 'V_V_P_GUID',
            queryMode: 'local',
            fieldLabel: 'V_V_P_GUID：',
            hidden:true
        }, {
            xtype: 'textfield',
            name: 'V_V_PERSONCODE',
            id: 'V_V_PERSONCODE',
            queryMode: 'local',
            fieldLabel: 'V_V_PERSONCODE：',
            hidden:true
        }, {
            xtype: 'displayfield',
            name: 'V_ORGNAME',
            id: 'V_ORGNAME',
            queryMode: 'local',
            fieldLabel: '矿场：',
        }, {
            xtype: 'displayfield',
            name: 'V_DEPTNAME',
            id: 'V_DEPTNAME',
            queryMode: 'local',
            fieldLabel: '部门：',
        },  {
            xtype: 'displayfield',
            name: 'V_EQUTYPENAME',
            id: 'V_EQUTYPENAME',
            queryMode: 'local',
            fieldLabel: '设备类型：',
        }, {
            xtype: 'displayfield',
            name: 'V_GGXH',
            id: 'V_GGXH',
            queryMode: 'local',
            fieldLabel: '设备规格：',
        }, {
            xtype: 'displayfield',
            name: 'V_EQUCODE',
            id: 'V_EQUCODE',
            queryMode: 'local',
            fieldLabel: '设备编码：',
        }, {
            xtype: 'displayfield',
            name: 'V_EQUNAME',
            id: 'V_EQUNAME',
            queryMode: 'local',
            fieldLabel: '设备名称：',
        }, {
            xtype: 'displayfield',
            name: 'V_GNWZ',
            id: 'V_GNWZ',
            queryMode: 'local',
            fieldLabel: '功能位置：',
        },{
            xtype: 'displayfield',
            name: 'V_LOC_NAME',
            id: 'V_LOC_NAME',
            queryMode: 'local',
            fieldLabel: '给油位置：',
        },{
            xtype: 'displayfield',
            name: 'V_PARTNAME',
            id: 'V_PARTNAME',
            queryMode: 'local',
            fieldLabel: '部件名称：',
        },{
            xtype: 'displayfield',
            name: 'V_OIL_TYPE',
            id: 'V_OIL_TYPE',
            queryMode: 'local',
            fieldLabel: '润滑方式：',
        },{
            xtype: 'displayfield',
            name: 'V_PLAN_TIME',
            id: 'V_PLAN_TIME',
            queryMode: 'local',
            fieldLabel: '计划润滑时间：',
        },{
            xtype: 'datefield',
            name: 'V_V_FACT_TIME',
            id: 'V_V_FACT_TIME',
            queryMode: 'local',
            format: 'Y-m-d',
            submitFormat: 'Y-m-d',
            fieldLabel: '实际润滑时间：',
            allowBlank:false,
            value: new Date()
        },{
            xtype: 'displayfield',
            name: 'V_OIL_SIGN',
            id: 'V_OIL_SIGN',
            queryMode: 'local',
            fieldLabel: '用油品牌：',
        },{
            xtype: 'textfield',
            name: 'V_V_FACT_OIL_SIGN',
            id: 'V_V_FACT_OIL_SIGN',
            queryMode: 'local',
            allowBlank:false,
            fieldLabel: '实际用油品牌：',
        },{
            xtype: 'displayfield',
            name: 'V_OIL_NUM',
            id: 'V_OIL_NUM',
            queryMode: 'local',
            fieldLabel: '用油量：',
        },{
            xtype: 'textfield',
            name: 'V_V_FACT_OIL_NUM',
            id: 'V_V_FACT_OIL_NUM',
            queryMode: 'local',
            allowBlank:false,
            fieldLabel: '实际用油量：',
        }, {
            xtype: 'textfield',
            name: 'V_V_ZXR',
            id: 'V_V_ZXR',
            queryMode: 'local',
            allowBlank:false,
            fieldLabel: '执行人：',
        }]
    });

    //按钮panel
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

    if (StandardFactInfo != null) {

        var form = Ext.getCmp('formPanel').getForm();
        form.findField("V_ORGNAME").setValue(StandardFactInfo.V_ORGNAME);
        form.findField("V_DEPTNAME").setValue(StandardFactInfo.V_DEPTNAME);
        form.findField("V_EQUTYPENAME").setValue(StandardFactInfo.V_EQUTYPENAME);
        form.findField("V_GGXH").setValue(StandardFactInfo.V_GGXH);
        form.findField("V_EQUCODE").setValue(StandardFactInfo.V_EQUCODE);
        form.findField("V_EQUNAME").setValue(StandardFactInfo.V_EQUNAME);
        form.findField("V_GNWZ").setValue(StandardFactInfo.V_GNWZ);
        form.findField("V_LOC_NAME").setValue(StandardFactInfo.V_LOC_NAME);
        form.findField("V_PARTNAME").setValue(StandardFactInfo.V_PARTNAME);
        form.findField("V_OIL_TYPE").setValue(StandardFactInfo.V_OIL_TYPE);
        form.findField("V_PLAN_TIME").setValue(StandardFactInfo.V_PLAN_TIME);
        form.findField("V_V_FACT_TIME").setValue(new Date());
        form.findField("V_OIL_SIGN").setValue(StandardFactInfo.V_OIL_SIGN);
        form.findField("V_V_FACT_OIL_SIGN").setValue(StandardFactInfo.V_FACT_OIL_SIGN);
        form.findField("V_OIL_NUM").setValue(StandardFactInfo.V_OIL_NUM);
        form.findField("V_V_FACT_OIL_NUM").setValue(StandardFactInfo.V_FACT_OIL_NUM);
        form.findField("V_V_ZXR").setValue(StandardFactInfo.V_ZXR);
        form.findField("I_I_ID").setValue(StandardFactInfo.I_ID);
        form.findField("V_V_P_GUID").setValue(StandardFactInfo.V_GUID);
        form.findField("V_V_PERSONCODE").setValue(Ext.util.Cookies.get('v_personcode'));

        form.isValid();//校验数据

        Ext.getBody().unmask();
    }
}

//点击保存按钮
function _insert() {

    Ext.getCmp('formPanel').getForm().submit({
        url: AppUrl + 'oil/setStandardFactInfo',
        submitEmptyText: false,
        waitMsg: '<spring:message code="processing" />',
        success: function (response,action) {
            var resp = action.result;
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

function _close() {
    parent.win.close();
}