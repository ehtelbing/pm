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
var gridStore = Ext.create('Ext.data.Store', {
    pageSize: 15,
    id: 'gridStore',
    autoLoad: false,
    fields: ['ID', 'CONTENT'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'Wsy/PM_REALINFOTL_QUERY',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var gridPanel = Ext.create("Ext.grid.Panel", {
    xtype: 'gridpanel',
    id: 'gridPanel',
    region: 'north',
    columnLines: true,
    width: 565,
    store: gridStore,
    autoScroll: true,
    height: 150,
    selModel: {
        selType: 'checkboxmodel'
//		mode : 'SINGLE'
    },
    columns: [{
        text: '',
        dataIndex: 'ID',
        align: 'center',
        width: 200,
        hidden: true
    }, {
        text: '内容 ',
        dataIndex: 'CONTENT',
        align: 'center',
        flex: 1
    }]
});
var Hours = [];
for (var i = 0; i < 24; i++) {
    if (i < 10) {
        Hours.push({CODE: '0' + i, NAME: i});
    }
    else {
        Hours.push({CODE: i, NAME: i});
    }
}
var Minutes = [];
for (i = 0; i < 60; i++) {
    if (i < 10) {
        Minutes.push({CODE: '0' + i, NAME: i});
    }
    else {
        Minutes.push({CODE: i, NAME: i});
    }
}
var HourStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'HourStore',
    fields: ['CODE', 'NAME'],
    data: Hours,
    proxy: {
        type: 'memory',
        render: {
            type: 'json'
        }
    }
});
var MinuteStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'MinuteStore',
    fields: ['CODE', 'NAME'],
    data: Minutes,
    proxy: {
        type: 'memory',
        render: {
            type: 'json'
        }
    }
});
var Layout = {
    layout: 'border',
    items: [
        {
            xtype: 'panel', border: false, region: 'center', layout: 'border', title: '信息录入', frame: true,
            items: [
                {
                    xtype: 'panel', region: 'center', layout: 'border', baseCls: 'my-panel-no-border', autoScroll: true,
                    items: [
                        {
                            xtype: 'panel',
                            region: 'north',
                            border: false,
                            bodyBorder: false,
                            baseCls: 'my-panel-no-border',
                            layout: 'column',
                            items: [
                                {
                                    xtype: 'checkbox',
                                    fieldLabel: '重点通知',
                                    labelAlign: 'right',
                                    labelWidth: 60,
                                    style: {margin: '10px 10px 10px 10px'},
                                    id: 'zdtz'
                                },
                                {
                                    xtype: 'button',
                                    text: '保   存',
                                    width: 70,
                                    handler: zhuce,
                                    icon: imgpath + '/saved.png',
                                    style: {margin: '12px 10px 10px 10px'}
                                }
                            ]
                        },
                        {
                            xtype: 'panel', layout: 'column', region: 'north', baseCls: 'my-panel-no-border',
                            defaults: {labelAlign: 'right', labelWidth: 60, style: {margin: '10px 10px 10px 10px'}},
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: '发布日期',
                                    value: new Date(),
                                    format: 'Y年m月d日',
                                    editable: false,
                                    id: 'nowtime',
                                    minValue: new Date()
                                },
                                {
                                    xtype: 'combo',
                                    width: 70,
                                    editable: false,
                                    id: 'Hour',
                                    store: HourStore,
                                    displayField: 'NAME',
                                    valueField: 'CODE',
                                    value: new Date().getHours()
                                },
                                {xtype: 'label', text: '时', style: {margin: '14px 0 0 5px'}},
                                {
                                    xtype: 'combo',
                                    width: 70,
                                    id: 'Minute',
                                    editable: false,
                                    store: MinuteStore,
                                    displayField: 'NAME',
                                    valueField: 'CODE',
                                    value: new Date().getMinutes()
                                },
                                {xtype: 'label', text: '分', style: {margin: '14px 0 0 5px'}},
                                {
                                    xtype: 'combo',
                                    fieldLabel: '类型',
                                    id: 'lx',
                                    store: lxStore,
                                    editable: false,
                                    displayField: 'V_BASENAME',
                                    valueField: 'V_BASECODE',
                                    queryMode: 'local',
                                    style: {margin: '10px 10px 10px 12px'}
                                }
                            ]
                        },
                        {
                            xtype: 'panel', layout: 'column', region: 'north', baseCls: 'my-panel-no-border',
                            defaults: {labelAlign: 'right',  style: {margin: '10px 10px 10px 10px'}},//labelWidth: 60,
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '所属部门',
                                    value: Ext.util.Cookies.get('v_deptname2'),
                                    labelWidth: 60,
                                    readOnly: true,
                                    editable: false,
                                    id: 'ssbm'
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: '班型',
                                    id: 'bx',
                                    store: bxStore,
                                    labelWidth: 40,
                                    editable: false,
                                    displayField: 'V_BASENAME',
                                    valueField: 'V_BASECODE',
                                    queryMode: 'local'
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: '班组',
                                    id: 'bz',
                                    store: 'bzStore',
                                    editable: false,
                                    labelWidth: 60,
                                    displayField: 'V_BASENAME',
                                    valueField: 'V_BASECODE',
                                    queryMode: 'local'
                                }
                            ]
                        },
                        {
                            xtype: 'panel', layout: 'column', region: 'north', baseCls: 'my-panel-no-border',
                            defaults: {labelAlign: 'right', labelWidth: 60, style: {margin: '10px 10px 10px 10px'}},
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '录入人',
                                    value: Ext.util.Cookies.get('v_personname2'),
                                    readOnly: true,
                                    editable: false,
                                    id: 'llr'
                                }
                            ]
                        },
                        {
                            xtype: 'panel', region: 'north', baseCls: 'my-panel-no-border', items: [
                                {
                                    xtype: 'textarea',
                                    fieldLabel: '信息内容',
                                    labelAlign: 'right',
                                    labelWidth: 60,
                                    style: {margin: '10px 10px 10px 10px'},
                                    height: 150,
                                    width: 630,
                                    id: 'xxnr'
                                },
                                // {
                                //     xtype: 'panel',
                                //     region: 'north',
                                //     layout: {
                                //         type: 'hbox',
                                //         align: 'stretch'
                                //     }, baseCls: 'my-panel-no-border', items: [
                                // {xtype:'label',width: 630,margin: '10px 10px 5px 10px',text:'---------------------------------------------------------------------------------------------------------'},
                                //     ]
                                // },
                                {
                                    xtype: 'button', text: '添   加',width:70,icon: imgpath + '/add.png',style: {margin: '10px 5px 5px 105px'}, handler: addModel
                                },
                                {
                                    xtype: 'button',
                                    text: '选   择',
                                    width:70,
                                    icon: imgpath + '/add.png',
                                    style: {margin: '10px 5px 5px 10px'},
                                    handler: selectModel
                                },
                                {
                                    xtype: 'button',
                                    text: '删   除',
                                    width:70,
                                    icon: imgpath + '/delete1.png',
                                    style: {margin: '10px 5px 5px 10px'},
                                    handler: delModel
                                },
                                {
                                    xtype: 'panel',
                                    region: 'north',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    }, baseCls: 'my-panel-no-border', items: [
                                        {xtype: 'label', text: '信息模板:', style: {margin: '10px 8px 10px 10px'}},
                                        gridPanel]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel', region: 'west', autoScroll: true, baseCls: 'my-panel-no-border', items: [
                        {
                            xtype: 'panel', region: 'north', baseCls: 'my-panel-no-border',
                            items: [
                                {xtype: 'button', text: '全   选', width:60,style: {margin: '10px 0px 0px 10px'}, handler: checkAll},
                                {xtype: 'button', text: '反   选', width:60,style: {margin: '10px 0px 0px 10px'}, handler: unCheckAll}
                            ]
                        },
                        {xtype: 'panel', region: 'north', baseCls: 'my-panel-no-border', id: 'xgbmPanel'}
                    ]
                }
            ]
        }
    ]
};

function onPageLoaded() {
    Ext.create('Ext.container.Viewport', Layout);
    Ext.data.StoreManager.lookup('bxStore').on('load', function () {
        Ext.getCmp('bx').select(Ext.data.StoreManager.lookup('bxStore').getAt(0));
    });
    Ext.data.StoreManager.lookup('lxStore').on('load', function () {
//        Ext.data.StoreManager.lookup('lxStore').removeAt((Ext.data.StoreManager.lookup('lxStore').data.items.length) - 1);
//        Ext.data.StoreManager.lookup('lxStore').removeAt((Ext.data.StoreManager.lookup('lxStore').data.items.length) - 1);
        Ext.getCmp('lx').select(Ext.data.StoreManager.lookup('lxStore').getAt(0));
    });
    Ext.data.StoreManager.lookup('bzStore').on('load', function () {
        Ext.getCmp('bz').select(Ext.data.StoreManager.lookup('bzStore').getAt(0));
    });
    getXgbm();
    query();
}

function getXgbm() {
    Ext.Ajax.request({
        url: AppUrl + 'Wsy/PRO_BASE_DEPT_VIEW',
        type: 'ajax',
        async: false,
        method: 'POST',
        params: {
            IS_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
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
                style: {margin: '10px 10px 10px 10px'}
            });
        }
    });
}

function zhuce() {
    var asd = Ext.getCmp('xgbm').getChecked();
    var str = '';
    var bmList = [];
    if (asd.length != 0) {
        for (var i = 0; i < asd.length; i++) {
            str += asd[i].inputValue + '|';
            bmList.push(asd[i].inputValue);
        }
        str = str.substring(0, str.length - 1);
    }
    if (str != '' && str != null) {
        var aHour;
        var aMinute;
        if (Ext.getCmp('Hour').getValue() < 10) {
            aHour = '0' + Ext.getCmp('Hour').getValue();
        }
        else {
            aHour = Ext.getCmp('Hour').getValue();
        }
        if (Ext.getCmp('Minute').getValue() < 10) {
            aMinute = '0' + Ext.getCmp('Minute').getValue();
        }
        else {
            aMinute = Ext.getCmp('Minute').getValue();
        }
        Ext.Ajax.request({
            url: AppUrl + 'Wsy/PRO_PP_INFORMATION_SET',
            type: 'ajax',
            async: false,
            method: 'POST',
            params: {
                V_V_I_ID: '',
                V_V_DEPT: bmList,
                V_V_INFORMATION: Ext.getCmp('xxnr').getValue(),
                V_V_D_DATE: Ext.Date.format(Ext.getCmp('nowtime').getValue(), 'Y-m-d') + ' ' + aHour + ':' + aMinute + ':' + '01',
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_PERSONNAME: Ext.util.Cookies.get('v_personname2'),
                V_V_TYPE: Ext.getCmp('lx').getValue(),
                V_V_CLASS: Ext.getCmp('bz').getValue(),
                V_V_CLASSTYPE: Ext.getCmp('bx').getValue(),
                V_V_NOTIFICATION: Ext.getCmp('zdtz').getValue() ? 'Y' : 'N'
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);
                if (data.V_INFO == 'Success') {
                    Ext.Msg.alert('操作信息', '操作成功');
                    getXgbm();
                    Ext.getCmp('xxnr').setValue('');
                }
            }
        });
    }
    else {
        Ext.Msg.alert('操作信息', '请选择一项相关部门');
    }
}

function QX() {
    window.close();
}

function checkAll() {
    var asd = Ext.getCmp('xgbm').items.items;
    for (i = 0; i < asd.length; i++) {
        asd[i].setValue(true);
    }
}

function unCheckAll() {
    var asd = Ext.getCmp('xgbm').items.items;
    for (i = 0; i < asd.length; i++) {
        if (asd[i].checked == false) {
            asd[i].setValue(true);
        }
        else {
            asd[i].setValue(false);
        }
    }
}

Ext.onReady(onPageLoaded);

function query() {
    Ext.data.StoreManager.lookup('gridStore').load(
            {
                params: {
                    parVal: []
                }
            });
}

function selectModel() {
    var selLength = Ext.getCmp('gridPanel').getSelectionModel().getSelection().length;
    if (selLength != 1) {
        Ext.Msg.alert('操作信息', '请选择一条数据进行操作!');
        return false;
    }
    var selection = Ext.getCmp('gridPanel').getSelectionModel().getSelection()[0].data;
    Ext.getCmp('xxnr').setValue(selection.CONTENT);
}

function addModel() {
    Ext.getCmp('xxnr').getValue();
    Ext.Ajax.request({
//        url: AppUrl + '/FRH002',
        url: AppUrl + 'Wsy/PM_REALINFOTL_EDIT',
        type: 'ajax',
        async: false,
        method: 'POST',
        params: {
            V_V_CODE: '-1',
            V_V_CONTENT: Ext.getCmp('xxnr').getValue()
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.V_INFO == 'success') {
                Ext.Msg.alert('操作信息', '添加成功!');
                query();
            }
            else {
                Ext.Msg.alert('操作信息', '添加失败!');
            }
        }
    });
}

function delModel() {
    var selLength = Ext.getCmp('gridPanel').getSelectionModel().getSelection().length;
    var selID = "";
    for (i = 0; i < selLength; i++) {
        selID = selID + Ext.getCmp('gridPanel').getSelectionModel().getSelection()[i].data.ID + ",";
    }
    Ext.Ajax.request({
        url: AppUrl + 'Wsy/PM_REALINFOTL_DEL',
        type: 'ajax',
        async: false,
        method: 'POST',
        params: {
            V_ID: selID
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.V_CURSOR == '成功') {
                Ext.Msg.alert('操作信息', '删除成功!');
                query();
            }
            else {
                Ext.Msg.alert('操作信息', '删除失败!');
            }
        }
    });
}

