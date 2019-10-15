var ID_list = [];

Ext.onReady(function () {
    var bmmcstore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'bmmcstore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'Wsy/PRO_BASE_DEPT_VIEW_DEPTTYPE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                V_V_DEPTCODE: Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE: '[主体作业区]',
                V_V_PERSON: Ext.util.Cookies.get('v_personcode')
            }
        }
    });
    var sqxzt = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'sqxzt',
        fields: ['V_STATECODE', 'V_STATENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'Wsy/PRO_PM_DEFECT_STATE_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        }
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
    var Minutes = [];
    for (i = 0; i < 60; i++) {
        if (i < 10) {
            Minutes.push({CODE: '0' + i, NAME: i});
        }
        else {
            Minutes.push({CODE: i, NAME: i});
        }
    }
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
    var lxstore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'lxstore',
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
            }
        }
    });
    var bbstore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'bbstore',
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
            }
        }
    });
    var panel = Ext.create('Ext.panel.Panel', {
        defaults: {
            labelAlign: 'right',
            labelAlign: 'right',
            labelWidth: 40,
            style: {margin: '5px 0 0 5px'}
        },
        width: '100%',
        frame: true,
        layout: 'column',
        items: [{
            id: 'bmmc',
            xtype: 'combo',
            fieldLabel: '部门名称',
            store: bmmcstore,
            displayField: 'V_DEPTNAME',
            display: 'hidden',
            valueField: 'V_DEPTCODE',
            editable: false,
            queryMode: 'local',
            labelWidth: 60
        }, {
            id: 'lx',
            xtype: 'combo',
            fieldLabel: '类型',
            store: lxstore,
            displayField: 'V_BASENAME',
            valueField: 'V_BASECODE',
            editable: false,
            queryMode: 'local',
            labelWidth: 35
        }, {
            id: 'bb',
            xtype: 'combo',
            fieldLabel: '班型',
            store: bbstore,
            displayField: 'V_BASENAME',
            valueField: 'V_BASECODE',
            editable: false,
            queryMode: 'local',
            labelWidth: 35
        }, {
            id: 'qxstrue',
            xtype: 'combo',
            store: sqxzt,
            editable: false,
            fieldLabel: '缺陷状态',
            labelWidth: 65,
            hidden: true,
            displayField: 'V_STATENAME',
            valueField: 'V_STATECODE',
            queryMode: 'local'
        }, {
            id: 'begintime',
            xtype: 'datefield',
            format: 'Y-m-d',
            fieldLabel: '起始日期',
            labelWidth: 60,
            editable: false,
            value: new Date()
        }, {
            xtype: 'combo',
            width: 60,
            editable: false,
            id: 'sHour',
            store: HourStore,
            displayField: 'NAME',
            valueField: 'CODE',
            value: new Date().getHours()
        },
            {xtype: 'label', text: '时'},
            {
                xtype: 'combo',
                width: 60,
                id: 'sMinute',
                editable: false,
                store: MinuteStore,
                displayField: 'NAME',
                valueField: 'CODE',
                value: new Date().getMinutes()
            },
            {xtype: 'label', text: '分'}, {
                id: 'endtime',
                xtype: 'datefield',
                format: 'Y-m-d',
                fieldLabel: '终止日期',
                labelWidth: 60,
                editable: false,
                value: new Date()
            }, {
                xtype: 'combo',
                width: 60,
                editable: false,
                id: 'eHour',
                store: HourStore,
                displayField: 'NAME',
                valueField: 'CODE',
                value: new Date().getHours()
            },
            {xtype: 'label', text: '时'},
            {
                xtype: 'combo',
                width: 60,
                id: 'eMinute',
                editable: false,
                store: MinuteStore,
                displayField: 'NAME',
                valueField: 'CODE',
                value: new Date().getMinutes()
            },
            {xtype: 'label', text: '分'},
            {
                xtype: 'button',
                display: 'hidden',
                text: '查 询',
                style: ' margin-left: 10px',
                icon: imgpath + '/search.png',
                handler: function () {
                    queryStore();
                }
            }, {
                xtype: 'button',
                display: 'hidden',
                text: '导 出',
                style: ' margin-left: 10px',
                icon: imgpath + '/311.gif',
                handler: function () {
                    OnButtonExcelClicked();
                }
            }, {
                xtype: 'button',
                display: 'hidden',
                text: '打 印',
                style: ' margin-left: 10px',
                icon: imgpath + '/printer.png',
                handler: function () {
                    ID_list = [];
                    for (var i = 0; i < document.getElementsByName('GridPrint').length; i++) {
                        if (document.getElementsByName('GridPrint')[i].checked) {
                            ID_list.push(document.getElementsByName('GridPrint')[i].id);
                        }
                    }
                    if (ID_list.length > 0) {
                        window.open(AppUrl + "page/No680109/printNew2.html?bmmc=" + Ext.getCmp('bmmc').getRawValue() + "&lx=" + Ext.getCmp('lx').getRawValue() + "&bb=" + Ext.getCmp('bb').getRawValue() + "&begintime=" + Ext.getCmp('begintime').getRawValue() + "&endtime=" + Ext.getCmp('endtime').getRawValue(), ID_list, "dialogHeight:700px;dialogWidth:1100px");
                    } else {
                        Ext.MessageBox.show({
                            title: '提示',
                            msg: '没有要打印的内容',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.WARNING
                        });
                    }
                }
            }]
    });
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: false,
        fields: ['V_INFORMATION', 'MTYPE', 'V_STATE', 'I_ID', 'D_DATE', 'V_EQUIP', 'V_TYPE', 'V_CLASSTYPE', 'V_PERSON', 'YS'],
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    });
    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        columnLines: true,
        width: '100%',
        plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })],
        autoScroll: true,
        store: gridStore,
        columns: [{
            text: '序号',
            xtype: 'rownumberer',
            width: 50,
            sortable: false
        }, {
            text: 'ID',
            dataIndex: 'I_ID',
            width: 150,
            renderer: left
        }, {
            text: '日期时间',
            dataIndex: 'D_DATE',
            align: 'center',
            renderer: renderRQ,
            width: 150
        }, {
            text: '设备名称',
            dataIndex: 'V_EQUIP',
            width: 150,
            renderer: left
        }, {
            text: '内容',
            dataIndex: 'V_INFORMATION',
            flex: 1,
            renderer: renderBgColor
        }, {
            text: '上报人',
            dataIndex: 'V_PERSON',
            width: 70,
            renderer: renderBgColor,
            hidden: true
        }, {
            text: '状态',
            dataIndex: 'V_STATE',
            align: 'center',
            width: 100,
            renderer: renderBgColor
        }, {
            text: '类型',
            dataIndex: 'V_TYPE',
            align: 'center',
            width: 50,
            renderer: renderBgColor
        }, {
            text: '班型',
            dataIndex: 'V_CLASSTYPE',
            align: 'center',
            width: 50,
            renderer: renderBgColor
        }, {
            text: '打印',
            align: 'center',
            width: 50,
            renderer: check
        }],
        dockedItems: [panel],
        bbar: [{
            xtype: 'panel',
            width: '100%',
            frame: true,
            layout: 'column',
            items: [{
                xtype: 'label',
                text: '合计',
                style: 'margin-right:150px'
            }, {
                xtype: 'displayfield',
                value: '数量：',
                id: 'sum'
            }]
        }]
    });
    Ext.create('Ext.container.Viewport', {
        layout: 'fit',
        items: [grid]
    });
    Ext.getCmp('begintime').setMaxValue(Ext.getCmp('endtime').getValue());
    Ext.getCmp('endtime').setMinValue(Ext.getCmp('begintime').getValue());
    Ext.getCmp('begintime').on("change", function () {
        Ext.getCmp('begintime').setMaxValue(Ext.getCmp('endtime').getValue());
        Ext.getCmp('endtime').setMinValue(Ext.getCmp('begintime').getValue());
    });
    Ext.getCmp('endtime').on("change", function () {
        Ext.ComponentManager.get('endtime').setMinValue(Ext.ComponentManager.get('begintime').getValue());
        Ext.ComponentManager.get('begintime').setMaxValue(Ext.ComponentManager.get('endtime').getValue());
    });
    Ext.data.StoreManager.lookup('bmmcstore').on("load", function () {
        Ext.data.StoreManager.lookup('lxstore').load({
            params: {
                IS_V_BASETYPE: 'PP_INFORMATION/V_TYPE'
            }
        });
        Ext.data.StoreManager.lookup('bmmcstore').insert(0, {
            V_DEPTNAME: '--全部--',
            V_DEPTCODE: '%'
        });
        Ext.getCmp('bmmc').select(Ext.data.StoreManager.lookup('bmmcstore').getAt(0));
    });
    Ext.data.StoreManager.lookup('lxstore').on("load", function () {
        Ext.data.StoreManager.lookup('lxstore').insert(0, {
            V_BASENAME: '--全部--',
            V_BASECODE: '%'
        });
        Ext.getCmp('lx').select(Ext.data.StoreManager.lookup('lxstore').getAt(0));
        Ext.data.StoreManager.lookup('bbstore').load({
            params: {
                IS_V_BASETYPE: 'PM_DIARYDATA/V_CLASSTYPE'
            }
        });
        Ext.data.StoreManager.lookup('sqxzt').load();
    });
    Ext.data.StoreManager.lookup('sqxzt').on("load", function () {
        Ext.getCmp("qxstrue").select(Ext.data.StoreManager.lookup('sqxzt').getAt(0));
    });
    Ext.data.StoreManager.lookup('bbstore').on("load", function () {
        Ext.data.StoreManager.lookup('bbstore').insert(0, {
            V_BASENAME: '--全部--',
            V_BASECODE: '%'
        });
        Ext.getCmp('bb').select(Ext.data.StoreManager.lookup('bbstore').getAt(0));
    });
    Ext.data.StoreManager.lookup('gridStore').on("load", function () {
        Ext.getCmp('sum').setValue(
            '数量：' + Ext.getStore('gridStore').data.items.length);
    });
});

function OnButtonExcelClicked() {
    document.location.href = AppUrl + 'Wsy/PRO_PP_INFORMATION_WITHD_LIST2_EXCEL?V_V_PERSONCODE=' + encodeURI(Ext.util.Cookies.get('v_personcode')) + '&V_V_DEPT=' + encodeURI(Ext.getCmp('bmmc').getValue()) + '&V_V_TYPE=' + encodeURI(Ext.getCmp('lx').getValue()) + '&V_V_CLASSTYPE=' + encodeURI(Ext.getCmp('bb').getValue()) + '&V_D_FROMDATE=' + encodeURI(Ext.Date.format(Ext.getCmp('begintime').getValue(), 'Y-m-d')) + '&V_D_TODATE=' + encodeURI(Ext.Date.format(Ext.getCmp('endtime').getValue(), 'Y-m-d'));
}

function queryStore() {
    if (Ext.ComponentManager.get("lx").getRawValue() == '缺陷') {
        Ext.Ajax.request({
            url: AppUrl + 'Wsy/PRO_PP_INFORMATION_WITHD_LIST3',
            type: 'ajax',
            async: false,
            method: 'POST',
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPT: Ext.ComponentManager.get('bmmc').getValue(),
                V_V_TYPE: Ext.ComponentManager.get('lx').getValue(),
                V_V_CLASSTYPE: Ext.ComponentManager.get('bb').getValue(),
                V_V_TYPE_STATE: Ext.ComponentManager.get('qxstrue').getValue(),
                V_D_FROMDATE: Ext.Date.format(Ext.getCmp('begintime').getValue(), 'Y-m-d') + " " + Ext.getCmp('sHour').getValue() + ":" + Ext.getCmp('sMinute').getValue() + ":00",
                V_D_TODATE: Ext.Date.format(Ext.getCmp('endtime').getValue(), 'Y-m-d') + " " + Ext.getCmp('eHour').getValue() + ":" + Ext.getCmp('eMinute').getValue() + ":00"
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                Ext.data.StoreManager.lookup('gridStore').loadData(resp.list);
                Ext.ComponentManager.get('sum').setValue('数量：' + Ext.getStore('gridStore').data.items.length);
            }
        });
    } else {
        Ext.Ajax.request({
            url: AppUrl + 'Wsy/PRO_PP_INFORMATION_WITHD_LIST2',
            type: 'ajax',
            async: false,
            method: 'POST',
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPT: Ext.ComponentManager.get('bmmc').getValue(),
                V_V_TYPE: Ext.ComponentManager.get('lx').getValue(),
                V_V_CLASSTYPE: Ext.ComponentManager.get('bb').getValue(),
                V_D_FROMDATE: Ext.Date.format(Ext.getCmp('begintime').getValue(), 'Y-m-d') + " " + Ext.getCmp('sHour').getValue() + ":" + Ext.getCmp('sMinute').getValue() + ":00",
                V_D_TODATE: Ext.Date.format(Ext.getCmp('endtime').getValue(), 'Y-m-d') + " " + Ext.getCmp('eHour').getValue() + ":" + Ext.getCmp('eMinute').getValue() + ":00"
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                Ext.data.StoreManager.lookup('gridStore').loadData(resp.list);
                Ext.ComponentManager.get('sum').setValue('数量：' + Ext.getStore('gridStore').data.items.length);
            }
        });
    }
}

function query() {
    setTimeout("query()", 1000 * 60 * 5);
}

function check(value, metaData, record) {
    return '<input type="checkbox" checked="checked" name="GridPrint" id=' + record.raw.I_ID + '></input>'
}

function renderRQ(v, metaData, record) {
    metaData.style = "color: " + record.data.YS;
    return Ext.Date.format(Ext.Date.parse(v, "Y-m-d H:i:s"), 'Y-m-d H:i');
}

function left(value, metaData, record) {
    metaData.style = "text-align:left; color: " + record.data.YS;
    return value;
}

function renderBgColor(value, metaData, record) {
    metaData.style = "text-align:left; color: " + record.data.YS;
    return value;
}

function right(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}