var CODE = null;
if (location.href.split('?')[1] != undefined) {
    CODE = Ext.urlDecode(location.href.split('?')[1]).CODE;
}

var asse;

Ext.onReady(function () {
    Ext.getBody().mask('<spring:message code="loading" />');

    Ext.Ajax.request({//加载被修改对象
        url : 'loadAsse.do',
        async : false,
        params : {
            'CODE' : CODE
        },
        callback : function(options, success, response) {
            if (success) {
                var data = Ext.decode(response.responseText);
                if (data.success) {
                    asse = data.asse;
                }
            }
        }
    });

    var orgStore = Ext.create('Ext.data.Store', {//厂矿Store
        storeId : 'orgStore',
        autoLoad : false,
        loading : false,
        pageSize : -1,
        fields : [  'V_DEPTCODE', 'V_DEPTNAME' ],
        proxy : {
            url : AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            type : 'ajax',
            async : true,
            actionMethods : {
                read : 'POST'
            },
            extraParams : {},
            reader : {
                type : 'json',
                root : 'list',
            }
        }
    });

    var deptStore = Ext.create('Ext.data.Store', {//作业区Store
        storeId : 'deptStore',
        autoLoad : false,
        loading : false,
        pageSize : -1,
        fields : [  'V_DEPTCODE', 'V_DEPTNAME' ],
        proxy : {
            url : AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            type : 'ajax',
            async : true,
            actionMethods : {
                read : 'POST'
            },
            extraParams : {},
            reader : {
                type : 'json',
                root : 'list',
            }
        }
    });

    var deptequTypeStore = Ext.create('Ext.data.Store', {//设备类型Store
        storeId : 'deptequTypeStore',
        autoLoad : false,
        loading : false,
        pageSize : -1,
        fields : [  'V_EQUTYPECODE', 'V_EQUTYPENAME' ],
        proxy : {
            url : AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
            type : 'ajax',
            async : true,
            actionMethods : {
                read : 'POST'
            },
            extraParams : {},
            reader : {
                type : 'json',
                root : 'list',
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
            xtype : 'combo',
            id : 'ORG_',
            name: 'ORG_',
            store : orgStore,
            queryMode : 'local',//获取本地数据
            valueField : 'V_DEPTCODE',
            displayField : 'V_DEPTNAME',
            emptyText : '全部',
            forceSelection : true,//输入错误，会显示一个最接近的值
            fieldLabel : '选择厂矿',
            allowBlank : false,
            listeners : {
                select : function(combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        deptStore.removeAll();
                        deptequTypeStore.removeAll();
                        formPanel.getForm().findField('DEPT_').setValue(null);
                        formPanel.getForm().findField('DEPTEQU_TYPE_').setValue(null);
                        selectDept();
                    }
                }
            }
        }, {
            xtype : 'combo',
            id : 'DEPT_',
            name: 'DEPT_',
            store : deptStore,
            queryMode : 'local',//获取本地数据
            valueField : 'V_DEPTCODE',
            displayField : 'V_DEPTNAME',
            emptyText : '全部',
            forceSelection : true,//输入错误，会显示一个最接近的值
            fieldLabel : '选择作业区',
            allowBlank : false,
            listeners : {
                select : function(combo, records) {
                    if (records.length != null) {//空选择不处理。(点击下拉框，然后点击页面其他位置)
                        deptequTypeStore.removeAll();
                        formPanel.getForm().findField('DEPTEQU_TYPE_').setValue(null);
                        selectDeptequType();
                    }
                }
            }
        }, {
            xtype : 'combo',
            id : 'DEPTEQU_TYPE_',
            name: 'DEPTEQU_TYPE_',
            store : deptequTypeStore,
            queryMode : 'local',//获取本地数据
            valueField : 'V_EQUTYPECODE',
            displayField : 'V_EQUTYPENAME',
            emptyText : '全部',
            forceSelection : true,//输入错误，会显示一个最接近的值
            fieldLabel : '设备类型',
            allowBlank : false
        }, {
            xtype : 'textfield',
            id: 'DEPTEQU_',
            name : 'DEPTEQU_',
            fieldLabel : '设备名称',
            maxLength : 20,
            allowBlank : false
        }, {
            xtype : 'datefield',
            id: 'TEST_OF_TIME_',
            name : 'TEST_OF_TIME_',
            format : 'Y-m-d H:i:s',
            submitFormat : 'Y-m-d H:i:s',
            fieldLabel : '检定时间'
        }, {
            xtype : 'textfield',
            id: 'CHECK_PARTS_',
            name : 'CHECK_PARTS_',
            fieldLabel : '检定部位',
            maxLength : 20,
            allowBlank : false
        }, {
            xtype : 'textfield',
            id: 'TEST_UNIT_',
            name : 'TEST_UNIT_',
            fieldLabel : '检定单位',
            maxLength : 20,
            allowBlank : false
        }, {
            xtype : 'numberfield',
            id: 'TEST_FEE_',
            name : 'TEST_FEE_',
            fieldLabel : '检测费用',
            decimalPrecision : 2,
            maxLength : 20,
            allowBlank : false
        } ]
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        id : 'buttonPanel',
        defaults : {
            style : 'margin: 2px;'
        },
        items : [ {
            xtype : 'button',
            text : '保存',
            handler : _insert
        }, {
            xtype : 'button',
            text : '提交',
            handler : _submit
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

    var orgStore = Ext.data.StoreManager.lookup('orgStore');
    orgStore.proxy.extraParams = {
        'V_V_PERSONCODE' : Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODE' : Ext.util.Cookies.get('v_orgCode'),
        'V_V_DEPTCODENEXT' : '%',
        'V_V_DEPTTYPE' : '基层单位'
    }
    orgStore.currentPage = 1;
    orgStore.load();

    if (asse == null) {
        Ext.MessageBox.alert('警告，加载数据失败', Ext.MessageBox.ERROR);
        return;
    }

    var form = Ext.getCmp('formPanel').getForm();
    for ( var key in asse) {//装载被修改数据到页面
        (form.findField(key) != null) ? form.findField(key).setValue(asse[key]) : 0;
    }
    form.isValid();//校验数据

    Ext.getBody().unmask();
}

//通过厂矿查询作业区
function selectDept() {
    var deptStore = Ext.data.StoreManager.lookup('deptStore');
    deptStore.proxy.extraParams = {
        'V_V_PERSONCODE' : Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODE' : Ext.getCmp("ORG_").getValue(), //选取的厂矿的值
        'V_V_DEPTCODENEXT' : '%',
        'V_V_DEPTTYPE' : '主体作业区'
    }
    deptStore.currentPage = 1;
    deptStore.load();
}

//通过作业区查询设备类型
function selectDeptequType() {
    var deptequTypeStore = Ext.data.StoreManager.lookup('deptequTypeStore');
    deptequTypeStore.proxy.extraParams = {
        'V_V_PERSONCODE' : Ext.getCmp("DEPT_").getValue(), //选取的作业区的值
        'V_V_DEPTCODENEXT' : '%',
    }
    deptequTypeStore.currentPage = 1;
    deptequTypeStore.load();
}

//点击保存按钮
function _insert() {

}

//点击提交按钮
function _submit() {

}