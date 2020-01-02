var P_ID = null;
var P_GID = null;
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.P_ID != undefined) ? P_ID = parameters.P_ID : 0;
    (parameters.P_GID != undefined) ? P_GID = parameters.P_GID : 0;
}

var win;//父窗口对象，由子窗口调用
var returnValue;//父窗口对象，由子窗口调用
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

var seasonList = [{
    CODE_: '夏季',
    NAME_: '夏季'
}, {
    CODE_: '冬季',
    NAME_: '冬季'
}];

var lubricationTypeList = [{
    CODE_: '自动集中',
    NAME_: '自动集中'
}, {
    CODE_: '手动',
    NAME_: '手动'
}];

var cycleList = [{
    CODE_: '实际周期',
    NAME_: '实际周期'
}, {
    CODE_: '日历周期',
    NAME_: '日历周期'
}];

var oilWayList = [{
    CODE_: '补油',
    NAME_: '补油'
}, {
    CODE_: '换油',
    NAME_: '换油'
}]

var standardInfo;
Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');

    Ext.Ajax.request({
        url: AppUrl + 'oil/loadOilStandardInfo',
        async: false,
        params: {
            'V_V_GUID': P_GID,
            'I_I_ID': P_ID
        },
        callback: function (options, success, response) {
            if (success) {
                var data = Ext.decode(response.responseText);
                standardInfo = data.list[0];
            }
        }
    });

    var seasonStore = Ext.create("Ext.data.Store", {
        storeId: 'seasonStore',
        fields: ['CODE_', 'NAME_'],
        data: seasonList,
        proxy: {
            async: true,//false=同步
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            }
        }
    });

    var lubricationTypeStore = Ext.create("Ext.data.Store", {
        storeId: 'lubricationTypeStore',
        fields: ['CODE_', 'NAME_'],
        data: lubricationTypeList,
        proxy: {
            async: true,//false=同步
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            }
        }
    });

    var oilWayStore = Ext.create("Ext.data.Store", {
        storeId: 'oilWayStore',
        fields: ['CODE_', 'NAME_'],
        data: oilWayList,
        proxy: {
            async: true,//false=同步
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            }
        }
    });

    var cycleStore = Ext.create("Ext.data.Store", {
        storeId: 'cycleStore',
        fields: ['CODE_', 'NAME_'],
        data: cycleList,
        proxy: {
            async: true,//false=同步
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            }
        }
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        id: 'buttonPanel',
        defaults: {
            style: 'margin: 2px;'
        },
        items: [{
            xtype: 'button',
            text: '保存',
            handler: _setStandardInfo
        }, {
            xtype: 'button',
            text: '关闭',
            handler: _close
        }]
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
            xtype: 'hiddenfield',
            name: 'V_V_GUID',
            value: P_GID
        }, {
            xtype: 'hiddenfield',
            name: 'I_I_ID',
            value: P_ID
        }, {
            xtype: 'displayfield',
            id: 'V_ORGNAME',
            name: 'V_ORGNAME',
            fieldLabel: '厂矿'
        }, {
            xtype: 'displayfield',
            id: 'V_DEPTNAME',
            name: 'V_DEPTNAME',
            fieldLabel: '作业区'
        }, {
            xtype: 'displayfield',
            id: 'V_EQUTYPENAME',
            name: 'V_EQUTYPENAME',
            fieldLabel: '当前设备',
            style: 'clear:both'
        }, {
            xtype: 'textfield',
            name: 'V_V_PARTNAME',
            fieldLabel: '部件名称',
            maxLength: 5,
            style: 'clear:both'
        }, {
            xtype: 'numberfield',
            name: 'N_V_OIL_NUM',
            fieldLabel: '润滑点数',
            value: 0
        }, {
            xtype: 'textfield',
            name: 'V_V_LOC_CODE',
            fieldLabel: '润滑部位编号',
            maxLength: 50,
            style: 'clear:both'
        }, {
            xtype: 'textfield',
            name: 'V_V_LOC_NAME',
            fieldLabel: '润滑部位名称',
            maxLength: 50
        }, {
            xtype: 'combo',
            id: 'V_V_OIL_SEASON',
            name: 'V_V_OIL_SEASON',
            store: seasonStore,
            queryMode: 'local',
            valueField: 'CODE_',
            displayField: 'NAME_',
            editable: false,
            forceSelection: true,
            fieldLabel: '季节',
            style: 'clear:both'
        }, {
            xtype: 'combo',
            id: 'V_V_OILTYPE',
            name: 'V_V_OILTYPE',
            store: lubricationTypeStore,
            queryMode: 'local',
            valueField: 'CODE_',
            displayField: 'NAME_',
            editable: false,
            forceSelection: true,
            fieldLabel: '润滑方式'
        }, {
            xtype: 'textfield',
            name: 'V_V_OIL_SIGN',
            fieldLabel: '油脂牌号',
            maxLength: 50,
            style: 'clear:both'
        }, {
            xtype: 'textfield',
            name: 'V_V_OIL_MAT_CODE',
            fieldLabel: '物料编码',
            maxLength: 50
        }, {
            xtype: 'textfield',
            name: 'V_V_OIL_MAT_NAME',
            fieldLabel: '物料描述',
            maxLength: 50,
            style: 'clear:both'
        }, {
            xtype: 'combo',
            id: 'V_V_OIL_WAY',
            name: 'V_V_OIL_WAY',
            store: oilWayStore,
            queryMode: 'local',
            valueField: 'CODE_',
            displayField: 'NAME_',
            editable: false,
            forceSelection: true,
            fieldLabel: '用油方式',
            style: 'clear:both'
        }, {
            xtype: 'textfield',
            name: 'V_V_OIL_PD',
            fieldLabel: '频度',
            maxLength: 50
        }, {
            xtype: 'textfield',
            name: 'V_V_OIL_NUM',
            fieldLabel: '用油数量',
            maxLength: 50,
            style: 'clear:both'
        }, {
            xtype: 'combo',
            id: 'V_V_OIL_ZQMS',
            name: 'V_V_OIL_ZQMS',
            store: cycleStore,
            queryMode: 'local',
            valueField: 'CODE_',
            displayField: 'NAME_',
            editable: false,
            forceSelection: true,
            fieldLabel: '周期模式'
        }, {
            xtype: 'textfield',
            name: 'V_V_OIL_ZQUNIT',
            fieldLabel: '周期单位',
            maxLength: 50,
            style: 'clear:both'
        }, {
            xtype: 'textfield',
            name: 'V_V_OIL_ZQSZ',
            fieldLabel: '周期设置',
            maxLength: 50
        }, {
            xtype: 'textfield',
            name: 'V_V_ZXR',
            fieldLabel: '执行人',
            maxLength: 50,
            style: 'clear:both'
        }, {
            xtype: 'hiddenfield',
            name: 'V_V_PERSONCODE',
            value: Ext.util.Cookies.get('v_personcode')
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

    if (standardInfo == null) {
        Ext.MessageBox.alert('错误', '加载数据失败', Ext.MessageBox.ERROR);
        return;
    }

    Ext.getCmp('V_ORGNAME').setValue(standardInfo.V_ORGNAME);
    Ext.getCmp('V_DEPTNAME').setValue(standardInfo.V_DEPTNAME);
    Ext.getCmp('V_EQUTYPENAME').setValue(standardInfo.V_EQUTYPENAME);

    if (P_ID == null || P_ID == '') {
        Ext.getCmp('V_V_OIL_SEASON').select(Ext.data.StoreManager.lookup('seasonStore').first());
        Ext.getCmp('V_V_OILTYPE').select(Ext.data.StoreManager.lookup('lubricationTypeStore').first());
        Ext.getCmp('V_V_OIL_WAY').select(Ext.data.StoreManager.lookup('oilWayStore').first());
        Ext.getCmp('V_V_OIL_ZQMS').select(Ext.data.StoreManager.lookup('cycleStore').first())
    } else {
        var form = Ext.getCmp('formPanel').getForm();
        form.findField('V_V_PARTNAME').setValue(standardInfo.V_PARTNAME);
        form.findField('N_V_OIL_NUM').setValue(standardInfo.V_OIL_COUNT);
        form.findField('V_V_LOC_CODE').setValue(standardInfo.V_LOC_CODE);
        form.findField('V_V_LOC_NAME').setValue(standardInfo.V_LOC_NAME);
        form.findField('V_V_OIL_SEASON').setValue(standardInfo.V_OIL_SEASON);
        form.findField('V_V_OILTYPE').setValue(standardInfo.V_OIL_TYPE);
        form.findField('V_V_OIL_SIGN').setValue(standardInfo.V_OIL_SIGN);
        form.findField('V_V_OIL_MAT_CODE').setValue(standardInfo.V_OIL_MAT_CODE);
        form.findField('V_V_OIL_MAT_NAME').setValue(standardInfo.V_OIL_MAT_NAME);
        form.findField('V_V_OIL_WAY').setValue(standardInfo.V_OIL_WAY);
        form.findField('V_V_OIL_PD').setValue(standardInfo.V_OIL_PD);
        form.findField('V_V_OIL_NUM').setValue(standardInfo.V_OIL_NUM);
        form.findField('V_V_OIL_ZQMS').setValue(standardInfo.V_OIL_ZQMS);
        form.findField('V_V_OIL_ZQUNIT').setValue(standardInfo.V_OIL_ZQUNIT);
        form.findField('V_V_OIL_ZQSZ').setValue(standardInfo.V_OIL_ZQSZ);
        form.findField('V_V_ZXR').setValue(standardInfo.V_ZXR);
    }

    Ext.getBody().unmask();

}

function _setStandardInfo(){
    var form = Ext.getCmp('formPanel').getForm();

    Ext.getCmp('formPanel').getForm().submit({
        url: AppUrl + 'oil/setOilStandardInfo',
        submitEmptyText : false,
        waitMsg : '进行中...',
        success : function(form, action) {
            var data = action.result;
            parent.returnValue = 'success';
            _close();
        },
        failure : function(form, action) {
            switch (action.failureType) {
                case Ext.form.action.Action.CLIENT_INVALID:
                    Ext.MessageBox.alert('错误', '请录入这些必填项', Ext.MessageBox.ERROR);
                    break;
                case Ext.form.action.Action.SERVER_INVALID:
                    Ext.MessageBox.alert('错误', action.result.message, Ext.MessageBox.ERROR);
                    break;
                case Ext.form.action.Action.CONNECT_FAILURE:
                    Ext.MessageBox.alert('错误', '系统错误', Ext.MessageBox.ERROR);
            }
        }
    });
}

function _close() {
    parent.win.close();
}


