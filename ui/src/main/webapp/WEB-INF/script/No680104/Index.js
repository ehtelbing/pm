var stime = '';
var urlCode;
var bxStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'bxStore',
    fields: ['V_BASECODE', 'V_BASENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'Wsy/PRO_PM_BASEDIC_LIST',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            IS_V_BASETYPE: 'PM_DIARYDATA/V_CLASSTYPE'
        }
    }
});
var lxStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'lxStore',
    fields: ['V_BASECODE', 'V_BASENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        //        url: APP + '/ModelSelect',
        url: AppUrl + 'Wsy/PRO_PM_BASEDIC_LIST',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            IS_V_BASETYPE: 'PP_INFORMATION/V_TYPE'
        }
    }
});
var bzStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'bzStore',
    fields: ['V_BASECODE', 'V_BASENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'Wsy/PRO_PM_BASEDIC_LIST',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            IS_V_BASETYPE: 'PM_DIARYDATA/V_CLASS'
        }
    }
});
var wpanel = Ext.create('Ext.panel.Panel', {
    region: 'west',
    frame: true,
    width: 230,
    layout: 'border',
    autoScroll: true,
    baseCls: 'my-panel-no-border',
    items: [{
        xtype: 'panel',
        region: 'north',
        baseCls: 'my-panel-no-border',
        items: [{
            xtype: 'button',
            text: '全选',
            style: {
                margin: '10px 0px 0px 10px'
            },
            handler: checkAll
        }, {
            xtype: 'button',
            text: '反选',
            style: {
                margin: '10px 0px 0px 10px'
            },
            handler: unCheckAll
        }]
    }, {
        xtype: 'panel',
        region: 'center',
        baseCls: 'my-panel-no-border',
        id: 'xgbmPanel'
    }]
});
var cpanel = Ext.create('Ext.panel.Panel', {
    region: 'center',
    frame: true,
    width: '100%',
    layout: 'border',
    items: [{
        xtype: 'panel',
        layout: 'column',
        region: 'north',
        baseCls: 'my-panel-no-border',
        defaults: {
            labelAlign: 'right',
            labelWidth: 60,
            style: {
                margin: '10px 10px 10px 10px'
            }
        },
        items: [{
            xtype: 'textfield',
            fieldLabel: '发布日期',
            id: 'nowtime',
            readOnly: true
        }, {
            xtype: 'combo',
            fieldLabel: '班型',
            id: 'bx',
            store: 'bxStore',
            editable: false,
            displayField: 'V_BASENAME',
            valueField: 'V_BASECODE',
            queryMode: 'local'
        }, {
            xtype: 'combo',
            fieldLabel: '班组',
            id: 'bz',
            store: 'bzStore',
            editable: false,
            displayField: 'V_BASENAME',
            valueField: 'V_BASECODE',
            queryMode: 'local'
        }]
    }, {
        xtype: 'panel',
        layout: 'column',
        region: 'north',
        baseCls: 'my-panel-no-border',
        defaults: {
            labelAlign: 'right',
            labelWidth: 60,
            style: {
                margin: '10px 10px 10px 10px'
            }
        },
        items: [{
            xtype: 'textfield',
            fieldLabel: '所属部门',
            value: Ext.util.Cookies.get('v_deptname2'),
            readOnly: true,
            editable: false,
            id: 'ssbm'
        }, {
            xtype: 'textfield',
            fieldLabel: '录入人',
            value: Ext.util.Cookies.get('v_personname2'),
            readOnly: true,
            editable: false,
            id: 'llr'
        }, {
            xtype: 'combo',
            fieldLabel: '类型',
            id: 'lx',
            store: 'lxStore',
            editable: false,
            displayField: 'V_BASENAME',
            valueField: 'V_BASECODE',
            queryMode: 'local'
        }]
    }, {
        xtype: 'panel',
        region: 'north',
        baseCls: 'my-panel-no-border',
        items: [{
            xtype: 'textarea',
            fieldLabel: '信息内容',
            labelAlign: 'right',
            labelWidth: 60,
            style: {
                margin: '10px 10px 10px 10px'
            },
            height: 150,
            width: 630,
            id: 'xxnr'
        }]
    }, {
        xtype: 'panel',
        region: 'north',
        baseCls: 'my-panel-no-border',
        items: [{
            xtype: 'checkbox',
            fieldLabel: '重点通知',
            labelAlign: 'right',
            labelWidth: 60,
            style: {
                margin: '10px 10px 10px 10px'
            },
            id: 'zdtz'
        }]
    }],
    buttons: [{
        text: '修改',
        handler: zhuce,
        icon: imgpath + '/add.png',
        style: {
            margin: '10px 10px 10px 10px'
        }
    }, {
        text: '取消',
        handler: QX,
        icon: imgpath + '/tree_dnd_no.png',
        style: {
            margin: '10px 10px 10px 10px'
        }
    }]
});

function onPageLoaded() {
    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [wpanel, cpanel]
    });
    Ext.data.StoreManager.lookup('lxStore').on('load', function () {
    });
    getXgbm();
    if (location.href.split('?')[1] != undefined) {
        urlCode = Ext.urlDecode(location.href.split('?')[1]);
        getInformation();
    }
}

function getInformation() {
    Ext.Ajax.request({
        url: AppUrl + 'Wsy/PRO_PP_INFORMATION_GET',
        type: 'ajax',
        async: false,
        method: 'POST',
        params: {
            V_I_ID: urlCode.planID
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            var resp = data.list[0];
            Ext.getCmp('nowtime').setValue(resp.D_DATE);
            Ext.getCmp('bx').select(resp.V_CLASSTYPE);
            Ext.getCmp('bz').select(resp.V_CLASS);
            Ext.getCmp('lx').select(resp.V_TYPE);
            Ext.getCmp('xxnr').setValue(resp.V_INFORMATION);
            Ext.getCmp('zdtz').setValue(resp.V_NOTIFICATION == 'Y' ? true : false);
            var vals = resp.V_DEPT.split('|');
            var objs = Ext.getCmp('xgbm').items.items;
            for (i = 0; i < vals.length; i++) {
                for (j = 0; j < objs.length; j++) {
                    if (objs[j].inputValue == vals[i]) {
                        objs[j].setValue(true);
                        break;
                    }
                }
            }
        }
    });
}

function getXgbm() {
    Ext.Ajax.request({
        url: AppUrl + 'Wsy/PRO_BASE_DEPT_VIEW',
        type: 'ajax',
        async: false,
        method: 'POST',
        params: {
            IS_V_DEPTCODE: '%',
            IS_V_DEPTTYPE: '[信息接收]'
        },
        success: function (response) {
            var list = Ext.decode(response.responseText).list;
            var asd = [];
            for (var i = 0; i < list.length; i++) {
                if (list[i].V_DEPTCODE != "%") {
                    if (list[i].V_DEPTCODE === Ext.util.Cookies.get('v_deptcode')) {
                        asd.push({
                            boxLabel: list[i].V_DEPTNAME,
                            name: 'xgbm',
                            checked: true,
                            inputValue: list[i].V_DEPTCODE,
                            width: 150
                        });
                    } else {
                        asd.push({
                            boxLabel: list[i].V_DEPTNAME,
                            name: 'xgbm',
                            inputValue: list[i].V_DEPTCODE,
                            width: 150
                        });
                    }
                }
            }
            Ext.getCmp('xgbmPanel').removeAll();
            Ext.getCmp('xgbmPanel').add({
                xtype: 'radiogroup',
                fieldLabel: '相关部门',
                labelAlign: 'top',
                labelWidth: 60,
                id: 'xgbm',
                singleSelect: true,
                columns: Math.round((list.length) / Math.round((list.length) / 1)),
                items: asd,
                change: function (ChkGrp) {
                    var asd = Ext.getCmp('xgbm').items.items;
                    for (var i = 0; i < asd.length; i++) {
                        if (asd[i].checked == false) {
                            asd[i].setValue(true);
                        } else {
                            asd[i].setValue(false);
                        }
                    }
                    if (ChkGrp.items.items[index].checked) {
                        for (var i = 0; i < ChkGrp.items.length; i++) {
                            if (i != index) {
                                if (ChkGrp.items.items[i].checked) {
                                    var id = ChkGrp.items.itemAt(i).id;
                                    ChkGrp.setValue(id, false);
                                }
                            }
                        }
                    }
                },
                /*listeners: {
                    beforeChange: function () {
                    }
                },*/
                style: {margin: '10px 10px 10px 20px'}
            });
        }
    });
}

function newGuid() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) {
            guid += "-";
        }
    }
    return guid;
}

function zhuce() {
    var asd = Ext.getCmp('xgbm').getChecked();
    var str = '';
    var deptList = [];
    if (asd.length != 0) {
        for (var i = 0; i < asd.length; i++) {
            str += asd[i].inputValue + '|';
            deptList.push(asd[i].inputValue);
        }
        str = str.substring(0, str.length - 1);
    }
    if (asd.length != 0) {
        Ext.Ajax.request({
            url: AppUrl + 'Wsy/PRO_PP_INFORMATION_SET',
            type: 'ajax',
            async: false,
            method: 'POST',
            params: {
                V_V_I_ID: urlCode.planID,
                V_V_DEPT: deptList,
                V_V_INFORMATION: Ext.getCmp('xxnr').getValue(),
                V_V_D_DATE: Ext.getCmp('nowtime').getValue(),
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_PERSONNAME: Ext.util.Cookies.get('v_personname2'),
                V_V_TYPE: Ext.getCmp('lx').getValue(),
                V_V_CLASS: Ext.getCmp('bz').getValue(),
                V_V_CLASSTYPE: Ext.getCmp('bx').getValue(),
                V_V_NOTIFICATION: Ext.getCmp('zdtz').getValue() ? 'Y' : 'N'
            },
            success: function (response) {
                //                resp = Ext.decode(resp.responseText);
                var data = Ext.decode(response.responseText);
                if (data.V_INFO == 'Success') {
                    Ext.Msg.alert('操作信息', '操作成功');
                    Ext.getCmp('xxnr').setValue('');
                    window.close();
                    window.opener.reLoad();
                }
            }
        });
    } else {
        Ext.Msg.alert('操作信息', '请选择一项相关部门');
    }
}

function QX() {
    window.close();
}

function checkAll() {
    var asd = Ext.getCmp('xgbm').items.items;
    for (var i = 0; i < asd.length; i++) {
        asd[i].setValue(true);
    }
}

function unCheckAll() {
    var asd = Ext.getCmp('xgbm').items.items;
    for (var i = 0; i < asd.length; i++) {
        if (asd[i].checked == false) {
            asd[i].setValue(true);
        } else {
            asd[i].setValue(false);
        }
    }
}

Ext.onReady(onPageLoaded);