//季节
var oilSeasonList = [{
    SEASON_NAME_: '夏季',
    SEASON_CODE_: '夏季'
}, {
    SEASON_NAME_: '冬季',
    SEASON_CODE_: '冬季'
}];

//加油方式
var oilTypeList = [{
    TYPE_NAME_: '自动集中',
    TYPE_CODE_: '自动集中'
}, {
    TYPE_NAME_: '手动',
    TYPE_CODE_: '手动'
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

var staYz;

var P_ID = null;//解析URL参数
var P_GID = null;//解析URL参数

if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.P_ID != undefined) ? P_ID = parameters.P_ID : "";
    (parameters.P_GID != undefined) ? P_GID = parameters.P_GID : "";
}

// var P_ID = '';
// var P_GID = '123';//解析URL参数

Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');

    if (P_ID != "") {

        Ext.Ajax.request({//加载被修改对象
            url: AppUrl + 'oil/loadStaYz',
            async: false,
            params: {
                'I_I_ID': P_ID
            },
            callback: function (options, success, response) {
                if (success) {
                    var resp = Ext.JSON.decode(response.responseText);
                    staYz = resp.staYz;
                }
            }
        });

    }

    //季节store
    var oilSeasonStore = Ext.create("Ext.data.Store", {
        storeId: 'oilSeasonStore',
        fields: ['SEASON_NAME_', 'SEASON_CODE_'],
        data: oilSeasonList,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    });

    //加油方式
    var oilTypeStore = Ext.create("Ext.data.Store", {
        storeId: 'oilTypeStore',
        fields: ['TYPE_NAME_', 'TYPE_CODE_'],
        data: oilTypeList,
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
            xtype: 'textfield',
            name: 'V_PARTNAME',
            id: 'V_PARTNAME',
            queryMode: 'local',
            forceSelection: true,
            fieldLabel: '部件名称',
            maxLength : 10,
            allowBlank : false
        }, {
            xtype: 'numberfield',
            name: 'V_OIL_NUM',
            id: 'V_OIL_NUM',
            queryMode: 'local',
            decimalPrecision : 4,//小数
            forceSelection: true,
            fieldLabel: '润滑点数',
            allowBlank : false,
            value : 0
        }, {
            xtype: 'numberfield',
            name: 'V_LOC_CODE',
            id: 'V_LOC_CODE',
            queryMode: 'local',
            forceSelection: true,
            fieldLabel: '润滑位置编码',
            maxLength : 50,
            allowBlank : false,
            value : 0
        }, {
            xtype: 'textfield',
            name: 'V_LOC_NAME',
            id: 'V_LOC_NAME',
            queryMode: 'local',
            forceSelection: true,
            fieldLabel: '润滑位置名称',
            maxLength : 50,
            allowBlank : false
        }, {
            xtype: 'combo',
            name: 'V_OIL_SEASON',
            id: 'V_OIL_SEASON',
            store: oilSeasonStore,
            queryMode: 'local',
            valueField: 'SEASON_CODE_',
            displayField: 'SEASON_NAME_',
            editable: false,
            forceSelection: true,
            fieldLabel: '季节'
            //readOnly: true
        }, {
            xtype: 'combo',
            name: 'V_OILTYPE',
            id: 'V_OILTYPE',
            store: oilTypeStore,
            queryMode: 'local',
            valueField: 'TYPE_CODE_',
            displayField: 'TYPE_NAME_',
            editable: false,
            forceSelection: true,
            fieldLabel: '加油方式',
            //readOnly: true
        }, {
            xtype: 'textfield',
            name: 'V_OIL_SIGN',
            id: 'V_OIL_SIGN',
            queryMode: 'local',
            forceSelection: true,
            fieldLabel: '油脂牌号',
            maxLength : 50,
           // allowBlank : false
        }, {
            xtype: 'numberfield',
            name: 'V_OIL_MAT_CODE',
            id: 'V_OIL_MAT_CODE',
            queryMode: 'local',
            forceSelection: true,
            fieldLabel: '物料编码',
            maxLength : 50,
            allowBlank : false,
            value : 0
        }, {
            xtype: 'textareafield',
            name: 'V_OIL_MAT_NAME',
            id: 'V_OIL_MAT_NAME',
            //store: equipStore,
            queryMode: 'local',
            //editable: false,
            maxLength : 50,
            inputWidth : 393,
            forceSelection: true,
            fieldLabel: '物料描述'
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
            handler: _yzInfoSet
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

    if (staYz != null) {
        var form = Ext.getCmp('formPanel').getForm();
        form.findField("V_PARTNAME").setValue(staYz.V_PARTNAME);
        form.findField("V_OIL_NUM").setValue(staYz.V_OIL_NUM);
        form.findField("V_LOC_CODE").setValue(staYz.V_LOC_CODE);
        form.findField("V_LOC_NAME").setValue(staYz.V_LOC_NAME);
        form.findField("V_OIL_SEASON").setValue(staYz.V_OIL_SEASON);
        form.findField("V_OILTYPE").setValue(staYz.V_OILTYPE);
        form.findField("V_OIL_SIGN").setValue(staYz.V_OIL_SIGN);
        form.findField("V_OIL_MAT_CODE").setValue(staYz.V_OIL_MAT_CODE);
        form.findField("V_OIL_MAT_NAME").setValue(staYz.V_OIL_MAT_NAME);
        form.isValid();//校验数据
    }

    Ext.getCmp('V_OIL_SEASON').select(Ext.data.StoreManager.lookup('oilSeasonStore').first());
    Ext.getCmp('V_OILTYPE').select(Ext.data.StoreManager.lookup('oilTypeStore').first());

    Ext.getBody().unmask();

}

//点击保存按钮
function _yzInfoSet() {
    Ext.Ajax.request({
        url: AppUrl + 'oil/yzInfoSet',
        method: 'POST',
        params: {
            I_I_ID: P_ID,
            V_V_GUID: P_GID,//getRawValue()取下拉框显示的值
            V_V_PARTNAME: Ext.getCmp('V_PARTNAME').getValue(),
            N_V_OIL_NUM: Ext.getCmp('V_OIL_NUM').getValue(),
            V_V_LOC_CODE: Ext.getCmp('V_LOC_CODE').getValue(),
            V_V_LOC_NAME: Ext.getCmp('V_LOC_NAME').getValue(),
            v_v_oil_season: Ext.getCmp('V_OIL_SEASON').getRawValue(),
            v_v_oiltype: Ext.getCmp('V_OILTYPE').getRawValue(),
            v_v_oil_sign: Ext.getCmp('V_OIL_SIGN').getValue(),
            v_v_oil_mat_code: Ext.getCmp('V_OIL_MAT_CODE').getValue(),
            v_v_oil_mat_name: Ext.getCmp('V_OIL_MAT_NAME').getValue(),
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