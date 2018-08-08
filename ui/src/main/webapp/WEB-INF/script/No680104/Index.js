var stime = '';
var urlCode;
var bxStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'bxStore',
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
            IS_V_BASETYPE: 'PM_DIARYDATA/V_CLASSTYPE'
        }
        //        extraParams: {
        //            parName: ['IS_V_BASETYPE'],
        //            parType: ['s'],
        //            parVal: [
        //                'PM_DIARYDATA/V_CLASSTYPE'
        //            ],
        //            proName: 'PRO_PM_BASEDIC_LIST',
        //            cursorName: 'V_CURSOR'
        //        }
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
        //        extraParams: {
        //            parName: ['IS_V_BASETYPE'],
        //            parType: ['s'],
        //            parVal: [
        //                'PP_INFORMATION/V_TYPE'
        //            ],
        //            proName: 'PRO_PM_BASEDIC_LIST',
        //            cursorName: 'V_CURSOR'
        //        }
    }
});
var bzStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'bzStore',
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
            IS_V_BASETYPE: 'PM_DIARYDATA/V_CLASS'
        }
        //        extraParams: {
        //            parName: ['IS_V_BASETYPE'],
        //            parType: ['s'],
        //            parVal: [
        //                'PM_DIARYDATA/V_CLASS'
        //            ],
        //            proName: 'PRO_PM_BASEDIC_LIST',
        //            cursorName: 'V_CURSOR'
        //        }
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
        Ext.data.StoreManager.lookup('lxStore').removeAt((Ext.data.StoreManager.lookup('lxStore').data.items.length) - 1);
        Ext.data.StoreManager.lookup('lxStore').removeAt((Ext.data.StoreManager.lookup('lxStore').data.items.length) - 1);
    });
    getXgbm();
    if (location.href.split('?')[1] != undefined) {
        urlCode = Ext.urlDecode(location.href.split('?')[1]);
        getInformation();
    }
}

function getInformation() {
    Ext.Ajax.request({
//        url: APP + '/ModelSelect',
        url: AppUrl + 'Wsy/PRO_PP_INFORMATION_GET',
        type: 'ajax',
        async: false,
        method: 'POST',
        params: {
            V_I_ID: urlCode.planID
//            V_I_ID: '1231234444'
//            parName: ['v_i_id'],
//            parType: ['i'],
//            parVal: [urlCode.planID],
//            proName: 'pro_pp_information_get',
//            cursorName: 'v_cursor'
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            var resp = data.list[0];
//            alert(resp.D_DATE);
//            var dates = resp.D_DATE.split(' ');
//            stime = dates[1];
//            Ext.getCmp('nowtime').setValue(dates[0]);
            Ext.getCmp('nowtime').setValue(resp.D_DATE);
            Ext.getCmp('bx').select(resp.V_CLASS);
            Ext.getCmp('bz').select(resp.V_CLASSTYPE);
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
//        url: APP + '/ModelSelect',
        url: AppUrl + 'Wsy/PRO_BASE_DEPT_VIEW',
        type: 'ajax',
        async: false,
        method: 'POST',
        params: {
//            parName: ['v_v_deptcode', 'v_v_depttype', 'v_v_person'],
//            parType: ['s', 's', 's'],
//            parVal: [
//                Ext.util.Cookies.get('v_deptcode'),
//                '[信息接收]',
//                Ext.util.Cookies.get('v_personcode')
//            ],
//            proName: 'pro_base_dept_view_depttype',
//            proName: 'pro_base_dept_view',
//            cursorName: 'v_cursor'
            IS_V_DEPTCODE: '%',
            IS_V_DEPTTYPE: '[信息接收]'
//            parName: ['IS_V_DEPTCODE', 'S_V_DEPTTYPE'],
//            parType: ['s', 's'],
//            parVal: ['%', '[信息接收]'],
//            proName: 'pro_base_dept_view',
//            cursorName: 'v_cursor'
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
                    }
                    else {
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
                xtype: 'checkboxgroup',
                fieldLabel: '相关部门',
                labelAlign: 'top',
                labelWidth: 60,
                id: 'xgbm',
                columns: Math.round((list.length) / Math.round((list.length) / 1)),
                items: asd,
                style: {margin: '10px 10px 10px 20px'}
            });
//            var data = Ext.decode(response.responseText);
//            var resp = data.list;
//            var asd = [];
//            for (var i = 0; i < resp.length; i++) {
//                asd.push({
//                    boxLabel: resp[i].V_DEPTNAME,
//                    name: 'xgbm',
//                    inputValue: resp[i].V_DEPTCODE,
//                    width: 95
//                });
//            }
//            Ext.getCmp('xgbmPanel').removeAll();
//            Ext.getCmp('xgbmPanel').add({
//                xtype: 'checkboxgroup',
//                fieldLabel: '相关部门',
//                labelAlign: 'top',
//                labelWidth: 60,
//                id: 'xgbm',
//                columns: 2,
//                items: asd,
//                style: {
//                    margin: '10px 10px 10px 10px'
//                }
//            });
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
//            url: APP + '/ModelChange',
            url: AppUrl + 'Wsy/PRO_PP_INFORMATION_SET',
            type: 'ajax',
            async: false,
            method: 'POST',
            params: {
                V_I_ID: urlCode.planID,
//                V_I_ID: '123123',
                V_V_DEPT: deptList,
                V_V_INFORMATION: Ext.getCmp('xxnr').getValue(),
                V_D_DATE: Ext.getCmp('nowtime').getValue(),
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_PERSONNAME: Ext.util.Cookies.get('v_personname2'),
                V_V_TYPE: Ext.getCmp('lx').getValue(),
                V_V_CLASS: Ext.getCmp('bz').getValue(),
                V_V_CLASSTYPE: Ext.getCmp('bx').getValue(),
                V_V_NOTIFICATION: Ext.getCmp('zdtz').getValue() ? 'Y' : 'N'
            },
//            params: {
//                parName: ['v_i_id', 'v_v_dept', 'v_v_information', 'v_d_date', 'v_v_personcode', 'v_v_personname', 'v_v_type', 'v_v_class', 'v_v_classtype', 'v_v_notification'],
//                parType: ['i', 's', 's', 'dt', 's', 's', 's', 's', 's', 's'],
//                parVal: [urlCode.planID, str, Ext.getCmp('xxnr').getValue(), Ext.getCmp('nowtime').getValue() + ' ' + stime, Ext.util.Cookies.get('v_personcode'), Ext.util.Cookies.get('v_personname2'), Ext.getCmp('lx').getValue(), Ext.getCmp('bx').getValue(), Ext.getCmp('bz').getValue(), Ext.getCmp('zdtz').getValue() ? 'Y' : 'N'],
//                proName: 'pro_pp_information_set'
//            },
            success: function (response) {
                //                resp = Ext.decode(resp.responseText);
                var data = Ext.decode(response.responseText);
                if (data.V_INFO == 'Success') {
                    Ext.Msg.alert('操作信息', '操作成功');
                    Ext.getCmp('xxnr').setValue('');
                    window.returnValue = 'Success';
                    window.close();
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