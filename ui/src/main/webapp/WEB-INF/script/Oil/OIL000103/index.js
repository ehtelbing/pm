//用油方式
var oilWayList = [{
    WAY_NAME_: '补油',
    WAY_CODE_: '补油'
}, {
    WAY_NAME_: '换油',
    WAY_CODE_: '换油'
}];

//周期模式
var oilZqmsList = [{
    ZQMS_NAME_: '实际周期',
    ZQMS_CODE_: '实际周期'
}, {
    ZQMS_NAME_: '日历周期',
    ZQMS_CODE_: '日历周期'
}];

//周期单位
var oilZqunitList = [{
    ZQUNIT_NAME_: '运行时间（小时）',
    ZQUNIT_CODE_: '运行时间（小时）'
}, {
    ZQUNIT_NAME_: '里程（公里）',
    ZQUNIT_CODE_: '里程（公里）'
}, {
    ZQUNIT_NAME_: '产量（吨）',
    ZQUNIT_CODE_: '产量（吨）'
}, {
    ZQUNIT_NAME_: '天',
    ZQUNIT_CODE_: '天'
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

var staYy;

var P_ID = null;//解析URL参数
var P_GID = null;//解析URL参数
var P_YZID = null;//解析URL参数

if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.P_ID != undefined) ? P_ID = parameters.P_ID : "";
    (parameters.P_GID != undefined) ? P_GID = parameters.P_GID : "";
    (parameters.P_YZID != undefined) ? P_YZID = parameters.P_YZID : "";
}
// var P_ID = '3';
// var P_GID = '123';//解析URL参数
// var P_YZID = '11';

Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');

    if (P_ID != "") {

        Ext.Ajax.request({//加载被修改对象
            url: AppUrl + 'oil/loadStaYy',
            async: false,
            params: {
                'I_I_ID': P_ID
            },
            callback: function (options, success, response) {
                if (success) {
                    var resp = Ext.JSON.decode(response.responseText);
                    staYy = resp.staYy;
                }
            }
        });

    }

    //用油方式store
    var oilWayStore = Ext.create("Ext.data.Store", {//年份
        storeId: 'oilWayStore',
        fields: ['WAY_NAME_', 'WAY_CODE_'],
        data: oilWayList,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    });

    //周期模式
    var oilZqmsStore = Ext.create("Ext.data.Store", {//年份
        storeId: 'oilZqmsStore',
        fields: ['ZQMS_NAME_', 'ZQMS_CODE_'],
        data: oilZqmsList,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    });

    //周期单位
    var oilZqunitStore = Ext.create("Ext.data.Store", {//年份
        storeId: 'oilZqunitStore',
        fields: ['ZQUNIT_NAME_', 'ZQUNIT_CODE_'],
        data: oilZqunitList,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    });

    //选框panel
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
            name: 'V_OIL_WAY',
            id: 'V_OIL_WAY',
            store: oilWayStore,
            queryMode: 'local',
            valueField: 'WAY_CODE_',
            displayField: 'WAY_NAME_',
            editable: false,
            forceSelection: true,
            fieldLabel: '用油方式',
            //readOnly: true
        }, {
            xtype: 'numberfield',
            name: 'V_OIL_PD',
            id: 'V_OIL_PD',
            queryMode: 'local',
            forceSelection: true,
            fieldLabel: '频度',
            maxLength : 50,
            allowBlank : false,
            value : 0
           // readOnly: true
        },  {
            xtype: 'numberfield',
            name: 'V_OIL_NUM',
            id: 'V_OIL_NUM',
            queryMode: 'local',
            decimalPrecision : 4,//小数
            forceSelection: true,
            fieldLabel: '用油数量',
            maxLength : 50,
            allowBlank : false,
            value : 0
            //readOnly: true
        }, {
            xtype: 'combo',
            name: 'V_OIL_ZQMS',
            id: 'V_OIL_ZQMS',
            store: oilZqmsStore,
            queryMode: 'local',
            valueField: 'ZQMS_CODE_',
            displayField: 'ZQMS_NAME_',
            editable: false,
            forceSelection: true,
            fieldLabel: '周期模式',
            //readOnly: true
        }, {
            xtype: 'combo',
            name: 'V_OIL_ZQUNIT',
            id: 'V_OIL_ZQUNIT',
            store: oilZqunitStore,
            queryMode: 'local',
            valueField: 'ZQUNIT_CODE_',
            displayField: 'ZQUNIT_NAME_',
            editable: false,
            forceSelection: true,
            fieldLabel: '周期单位',
            //readOnly: true
        }, {
            xtype: 'numberfield',
            name: 'V_OIL_ZQSZ',
            id: 'V_OIL_ZQSZ',
            queryMode: 'local',
            forceSelection: true,
            fieldLabel: '周期设置',
            allowBlank : false,
            value : 0
            // readOnly: true
        }, {
            xtype: 'textfield',
            name: 'V_ZXR',
            id: 'V_ZXR',
            queryMode: 'local',
            forceSelection: true,
            fieldLabel: '执行人',
            maxLength : 20,
            allowBlank : false
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
            handler: _yyInfoSet
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
            items: [formPanel]
        }, {
            region: 'center',
            layout: 'fit',
            items: [buttonPanel]
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

    if (staYy != null) {

        var form = Ext.getCmp('formPanel').getForm();
        form.findField("V_OIL_WAY").setValue(staYy.V_OIL_WAY);
        form.findField("V_OIL_PD").setValue(staYy.V_OIL_PD);
        form.findField("V_OIL_NUM").setValue(staYy.V_OIL_NUM);
        form.findField("V_OIL_ZQMS").setValue(staYy.V_OIL_ZQMS);
        form.findField("V_OIL_ZQUNIT").setValue(staYy.V_OIL_ZQUNIT);
        form.findField("V_OIL_ZQSZ").setValue(staYy.V_OIL_ZQSZ);
        form.findField("V_ZXR").setValue(staYy.V_ZXR);

        form.isValid();//校验数据

        Ext.getBody().unmask();
    }

    Ext.getCmp('V_OIL_WAY').select(Ext.data.StoreManager.lookup('oilWayStore').first());
    Ext.getCmp('V_OIL_ZQMS').select(Ext.data.StoreManager.lookup('oilZqmsStore').first());
    Ext.getCmp('V_OIL_ZQUNIT').select(Ext.data.StoreManager.lookup('oilZqunitStore').first());

    Ext.getBody().unmask();

}

//点击保存按钮
function _yyInfoSet() {
    Ext.Ajax.request({
        url: AppUrl + 'oil/yyInfoSet',
        method: 'POST',
        params: {
            I_I_ID: P_ID,
            V_V_GUID: P_GID,//getRawValue()取下拉框显示的值
            V_V_YZ_ID: P_YZID,//getValue()取下拉框选择的值
            v_v_oil_way: Ext.getCmp('V_OIL_WAY').getRawValue(),
            v_v_oil_num: Ext.getCmp('V_OIL_NUM').getValue(),
            v_v_oil_zqms: Ext.getCmp('V_OIL_ZQMS').getRawValue(),
            v_v_oil_pd: Ext.getCmp('V_OIL_PD').getValue(),
            v_v_oil_zqunit: Ext.getCmp('V_OIL_ZQUNIT').getRawValue(),
            v_v_oil_zqsz: Ext.getCmp('V_OIL_ZQSZ').getValue(),
            v_v_zxr: Ext.getCmp('V_ZXR').getValue(),
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode')

        },
        callback: function (options, success, response) {
            var resp = Ext.decode(response.responseText);
            if (resp.success) {
                var V_INFO = resp.V_INFO;
                if (V_INFO == '保存成功！') {
                    parent.returnValue = 'success';
                    //_close()
                } else {
                    Ext.Msg.alert('提示', '保存失败');
                }
            } else {
                Ext.Msg.alert('保存失败');
            }
        }
    });

}

function _close() {
    parent.win.close();
}