var V_ID = null;
if (location.href.split('?')[1] != undefined) {
    V_ID = Ext.urlDecode(location.href.split('?')[1]).V_ID;
}
var V_ORGCODE = null;
if (location.href.split('?')[1] != undefined) {
    V_ORGCODE = Ext.urlDecode(location.href.split('?')[1]).V_ORGCODE;
}
var V_DEPTCODE = null;
if (location.href.split('?')[1] != undefined) {
    V_DEPTCODE = Ext.urlDecode(location.href.split('?')[1]).V_DEPTCODE;
}
var V_FLOWTYPE = null;
if (location.href.split('?')[1] != undefined) {
    V_FLOWTYPE = Ext.urlDecode(location.href.split('?')[1]).V_FLOWTYPE;
}
var V_POSTCODE = null;
//计划厂矿
var ckStore = Ext.create("Ext.data.Store", {
    storeId: 'ckStore',
    autoLoad: true,
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
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
            'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
            'V_V_DEPTCODENEXT': '%',
            'V_V_DEPTTYPE': '基层单位'
        }
    }
});
//作业区
var zyqStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'zyqStore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

//角色名称
var jsmcStore = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'jsmcStore',
    fields: ['V_ROLECODE', 'V_ROLENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'basic/PRO_BASE_PERSONROLE_VIEW_NEW',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});


var centerPanel = Ext.create('Ext.form.Panel', {
    region: 'center',
    layout: {
        type: 'table',
        columns: 2
    },
    frame: true,
    border: false,
    items: [{
        xtype: 'combo',
        id: 'ck',
        fieldLabel: '单位名称',
        editable: false,
        margin: '5 0 0 5',
        labelWidth: 120,
        labelAlign: 'right',
        displayField: 'V_DEPTNAME',
        valueField: 'V_DEPTCODE',
        store: ckStore,
        queryMode: 'local'
    },
        {
            xtype: 'combo',
            id: 'zyq',
            fieldLabel: '作业区',
            editable: false,
            margin: '5 0 0 5',
            labelWidth: 120,
            labelAlign: 'right',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            store: zyqStore,
            queryMode: 'local'
        },
        {
            xtype: 'combo',
            id: 'lclx',
            fieldLabel: '流程类型',
            editable: false,
            margin: '5 0 0 5',
            labelWidth: 120,
            labelAlign: 'right',
            value: V_FLOWTYPE,
            displayField: 'displayField',
            valueField: 'valueField',
            store: [['YEAR', '年计划'],
                ['MONTH', '月计划'],
                ['QUARTER', '季计划'],
                ['WEEK', '周计划']],
            queryMode: 'local'
        },
        {xtype: 'textfield', id: 'lcbz', fieldLabel: '流程步骤名称', margin: '5 0 0 5', labelAlign: 'right', labelWidth: 120},
        {
            xtype: 'textfield',
            id: 'nextlcbz',
            fieldLabel: '下一步流程步骤名称',
            margin: '5 0 0 5',
            labelAlign: 'right',
            labelWidth: 120
        },
        {
            xtype: 'textfield',
            id: 'px',
            fieldLabel: '排序',
            labelAlign: 'right',
            labelWidth: 120,
            labelAlign: 'right',
            margin: '5 0 0 5'
        },
        {xtype: 'textfield', id: 'sprycode', hidden: true},
        {xtype: 'textfield', id: 'dzbz', hidden: true},
        {
            xtype: 'combo',
            id: 'jsmc',
            fieldLabel: '角色名称',
            margin: '5 0 0 5',
            labelWidth: 120,
            labelAlign: 'right',
            editable: false,
            displayField: 'V_ROLENAME',
            valueField: 'V_ROLECODE',
            store: jsmcStore,
            queryMode: 'local'
        },
        {
            xtype: 'textfield',
            id: 'spry',
            fieldLabel: '审批人员',
            readOnly: true,
            margin: '5 0 0 5',
            labelWidth: 120,
            labelAlign: 'right',
            listeners: {
                click: {
                    element: 'el',
                    fn: function () {
                        var owidth = window.document.body.offsetWidth - 200;
                        var oheight = window.document.body.offsetHeight - 100;
                        var ret = window.open(AppUrl + 'page/PM_199903/index.html?rolecode=' +Ext.getCmp('jsmc').getValue()+'&orgcode='
                        	+Ext.getCmp('ck').getValue()+'&deptcode='+Ext.getCmp('zyq').getValue()+'&redeptcode='
                        	+'0', '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
                    }
                }
            }
        },
        {xtype: 'hidden', id: 'spcode'}],
    buttons: [
        {xtype: "button", text: "确定", handler: OnButtonSaveClicked},
        {xtype: "button", text: "取消", handler: OnButtonCancelClicked}
    ]
});


Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [centerPanel]
    });
    //计划厂矿加载时
    Ext.data.StoreManager.lookup('ckStore').on('load', function () {
        if (V_ORGCODE != '' && V_ORGCODE != null) {
            Ext.getCmp('ck').select(V_ORGCODE);
        } else {
            Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
        }
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
        Ext.data.StoreManager.lookup('jsmcStore').load({
            params: {
                V_V_DEPTCODE: Ext.getCmp('ck').getValue()
            }
        });
    });
    //计划厂矿更改时加载作业区
    Ext.getCmp('ck').on('select', function () {
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
        Ext.data.StoreManager.lookup('jsmcStore').load({
            params: {
                V_V_DEPTCODE: Ext.getCmp('ck').getValue()
            }
        });
    });
    //作业区
    Ext.data.StoreManager.lookup('zyqStore').on('load', function () {
        if (V_DEPTCODE != '' && V_DEPTCODE != null) {
            Ext.getCmp('zyq').select(V_DEPTCODE);
        } else {
            Ext.getCmp("zyq").select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
        }
    });

    Ext.data.StoreManager.lookup('jsmcStore').on('load', function () {
        if (V_POSTCODE != '' && V_POSTCODE != null) {
            Ext.getCmp('jsmc').select(V_POSTCODE);
        } else {
            Ext.getCmp("jsmc").select(Ext.data.StoreManager.lookup('jsmcStore').getAt(0));
        }
    });
    if (V_ID != -1) {
        Ext.Ajax.request({
            method: 'POST',
            async: false,
            url: AppUrl + 'pm_19/PM_03_FLOW_STATE_GET',
            params: {
                V_V_GUID: V_ID
            },
            success: function (ret) {
                var resp = Ext.decode(ret.responseText);
                if (resp.list.length == 1) {
                    V_ORGCODE = resp.list[0].V_ORGCODE;
                    V_DEPTCODE = resp.list[0].V_DEPTCODE;
                    V_FLOWTYPE = resp.list[0].V_FLOWTYPE;
                    V_POSTCODE = resp.list[0].V_POSTCODE;
                    V_FLOWCODE = resp.list[0].V_FLOWCODE;
                    V_FLOWNAME = resp.list[0].V_FLOWNAME;
                    V_FLOWSTEP = resp.list[0].V_FLOWSTEP;
                    V_ORDER = resp.list[0].V_ORDER;
                    V_BZ = resp.list[0].V_BZ;
                    V_NEXTSTEP = resp.list[0].V_NEXTSTEP;
                    V_URL = resp.list[0].V_URL;

                    //Ext.getCmp("ck").select(V_ORGCODE);
                    //Ext.getCmp("zyq").select(V_DEPTCODE);
                    //Ext.getCmp("jxdw").select(V_REPAIRCODE);
                    //Ext.getCmp("lclx").select(V_FLOWTYPE);
                    Ext.getCmp("lclx").select(resp.list[0].V_PLANTYPE);
                    Ext.getCmp("lcbz").setValue(resp.list[0].V_FLOWNAME);
                    Ext.getCmp("nextlcbz").setValue(resp.list[0].V_FLOWNAME_NEXT);
                    //Ext.getCmp("jsmc").select(V_POSTCODE);
                    Ext.getCmp("dzbz").setValue(V_BZ);
                    Ext.getCmp("px").setValue(V_ORDER);

                    Ext.getCmp('spcode').setValue(resp.list[0].V_PERCODE);
                    Ext.getCmp('spry').setValue(resp.list[0].V_PERNAME);
                }

            }
        });
    }
});
function getReturnPer(retdata) {
    Ext.getCmp('spry').setValue(retdata[1]);
    Ext.getCmp('spcode').setValue(retdata[0]);
}
function getReturnDZ(retdata) {
    Ext.getCmp('dz').setValue(retdata[0]);
    Ext.getCmp('dzbz').setValue(retdata[1]);
}
//保存
function OnButtonSaveClicked() {
    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: AppUrl + 'pm_19/PM_03_FLOW_STATE_SET',
        params: {
            V_V_GUID: V_ID,
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
            V_V_PLANTYPE: Ext.getCmp('lclx').getValue(),
            V_V_FLOWNAME: Ext.getCmp('lcbz').getValue(),
            V_V_FLOWNAME_NEXT: Ext.getCmp('nextlcbz').getValue(),
            V_V_ORDER: Ext.getCmp('px').getValue(),
            V_V_ROLECODE: Ext.getCmp('jsmc').getValue(),
            V_V_ROLENAME: Ext.getCmp('jsmc').getRawValue(),
            V_V_PERCODE: Ext.getCmp('spcode').getValue()
        },
        success: function (ret) {
            var resp = Ext.decode(ret.responseText);
            if (resp.V_INFO == 'success') {
                window.opener.queryGrid();
                window.close();
            } else {
                Ext.Msg.alert('操作信息', '保存失败');
            }
        }
    });

}


function OnButtonCancelClicked() {
    window.opener.queryGrid();
    window.close();
}