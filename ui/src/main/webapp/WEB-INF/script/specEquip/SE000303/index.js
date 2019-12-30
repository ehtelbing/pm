var P_ID = null;
if (location.href.split('?')[1] != undefined) {
    P_ID = Ext.urlDecode(location.href.split('?')[1]).P_ID;
}

var planApply;

Ext.onReady(function () {
    Ext.getBody().mask('<spring:message code="loading" />');

    Ext.Ajax.request({//加载被修改对象
        url : AppUrl + 'specEquip/loadPlanApply',
        async : false,
        params : {
            'I_I_ID' : P_ID
        },
        callback: function (options, success, response) {
            if (success) {
                var resp = Ext.JSON.decode(response.responseText);
                if(resp.list.length == 1){
                    planApply = resp.list[0];
                }
            }
        }
    });

    var formPanel = Ext.create('Ext.form.Panel', {
        id : 'formPanel',
        layout : 'column',
        frame : true,
        autoScroll : true,
        defaults : {
            labelAlign : 'right',
            labelWidth : 100,
            inputWidth : 140,
            margin : '4'
        },
        items : [ {
            xtype: 'textfield',
            id: 'FTY_CODE_',
            name: 'FTY_CODE_',
            fieldLabel : '厂矿',
            readOnly: true,
            maxLength : 20,
        }, {
            xtype: 'textfield',
            id: 'DEPT_CODE_',
            name: 'DEPT_CODE_',
            fieldLabel : '作业区',
            readOnly: true,
            maxLength : 20,
        }, {
            xtype: 'textfield',
            id: 'equipType',
            name: 'equipType',
            fieldLabel : '设备类型',
            readOnly: true,
            maxLength : 20,
        }, {
            xtype: 'textfield',
            id: 'equip',
            name: 'equip',
            fieldLabel : '设备名称',
            readOnly: true,
            maxLength : 20,
        }, {
            xtype : 'textfield',
            id: 'TEST_OF_TIME_',
            name : 'TEST_OF_TIME_',
            fieldLabel : '检定时间',
            readOnly: true,
            maxLength : 20,
        }, {
            xtype : 'textfield',
            id: 'CHECK_PARTS_',
            name : 'CHECK_PARTS_',
            fieldLabel : '检定部位',
            readOnly: true,
            maxLength : 20,
        }, {
            xtype : 'textfield',
            id: 'TEST_UNIT_',
            name : 'TEST_UNIT_',
            fieldLabel : '检定单位',
            readOnly: true,
            maxLength : 20,
        }, {
            xtype : 'textfield',
            id: 'TEST_FEE_',
            name : 'TEST_FEE_',
            fieldLabel : '检测费用',
            readOnly: true,
            maxLength : 20,
        } ]
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        id : 'buttonPanel',
        defaults : {
            style : 'margin: 2px;'
        },
        items : [ {
            xtype : 'button',
            text : '关闭',
            handler : _close
        }]
    });

    Ext.create('Ext.container.Viewport', {
        layout : {
            type : 'border',
            regionWeights : {
                west : -1,
                north : 1,
                south : 1,
                east : -1
            }
        },
        defaults : {
            border : false
        },
        items : [ {
            region : 'north',
            items : [ buttonPanel ]
        }, {
            region : 'center',
            layout : 'fit',
            items : [ formPanel ]
        } ]
    });

    _init();

})

function _init() {
    for (var i = 0; i < Ext.data.StoreManager.getCount(); i++) {
        if (Ext.data.StoreManager.getAt(i).isLoading()) {
            return;
        }
    }

    if (planApply == null) {
        Ext.MessageBox.alert('警告，加载数据失败', Ext.MessageBox.ERROR);
        return;
    }

    var form = Ext.getCmp('formPanel').getForm();
    form.findField("FTY_CODE_").setValue(planApply.V_ORGNAME);
    form.findField("DEPT_CODE_").setValue(planApply.V_DEPTNAME);
    form.findField("equipType").setValue(planApply.V_EQUTYPENAME);
    form.findField("equip").setValue(planApply.V_EQUNAME);
    form.findField("TEST_OF_TIME_").setValue(planApply.V_CHECKTIME);
    form.findField("CHECK_PARTS_").setValue(planApply.V_CHECKPART);
    form.findField("TEST_UNIT_").setValue(planApply.V_CHECKDEPT);
    form.findField("TEST_FEE_").setValue(planApply.V_COST);

    form.isValid();//校验数据

    Ext.getBody().unmask();
}

function _close() {
    parent.win.close();
}