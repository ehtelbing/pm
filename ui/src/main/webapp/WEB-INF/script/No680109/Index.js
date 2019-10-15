var printStore = Ext.create('Ext.data.Store', {
    id: 'printStore',
    autoLoad: false,
    fields: ['V_INFORMATION', 'MTYPE', 'V_STATE', 'I_ID', 'D_DATE', 'V_EQUIP', 'V_TYPE', 'V_CLASSTYPE', 'V_PERSON', 'YS']
});
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
            style: 'margin-bottom:3px'
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
            queryMode: 'local'/*
				 * , baseCls :
				 * 'margin-bottom'
				 */
        }, {
            id: 'begintime',
            xtype: 'datefield',
            format: 'Y-m-d',
            fieldLabel: '起始日期',
            labelWidth: 60,
            value: new Date(new Date() - 1 * 24 * 60 * 60 * 1000)
        }, {
            xtype: 'combo',
            width: 60,
            editable: false,
            id: 'Hour',
            store: HourStore,
            displayField: 'NAME',
            valueField: 'CODE',
            value: new Date().getHours()
        },
            {xtype: 'label', text: '时', style: {margin: '5px 0 0 5px'}},
            {
                xtype: 'combo',
                width: 60,
                id: 'Minute',
                editable: false,
                store: MinuteStore,
                displayField: 'NAME',
                valueField: 'CODE',
                value: new Date().getMinutes()
            },
            {xtype: 'label', text: '分', style: {margin: '5px 0 0 5px'}}, {
            id: 'endtime',
            display: 'hidden',
            xtype: 'datefield',
            format: 'Y-m-d',
            fieldLabel: '终止日期',
            labelWidth: 60,
            value: new Date()
        },  {
            xtype: 'combo',
            width: 60,
            editable: false,
            id: 'Hour1',
            store: HourStore,
            displayField: 'NAME',
            valueField: 'CODE',
            value: new Date().getHours()
        },
            {xtype: 'label', text: '时', style: {margin: '5px 0 0 5px'}},
            {
                xtype: 'combo',
                width: 60,
                id: 'Minute1',
                editable: false,
                store: MinuteStore,
                displayField: 'NAME',
                valueField: 'CODE',
                value: new Date().getMinutes()
            },
            {xtype: 'label', text: '分', style: {margin: '5px 0 0 5px'}},
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
                var ID_list = [];
                printStore.removeAll();
                var gridStore = Ext.getStore('gridStore');
                for (var i = 0; i < gridStore.getCount(); i++) {
                    if (document.getElementById(gridStore.getAt(i).get('I_ID')).checked) {
                        ID_list.push(Ext.getStore('gridStore').getAt(i).get('I_ID'));
                        //printStore.add(gridStore.getAt(i).get('I_ID'));
                    }
                }
                if (printStore.getCount() > 0) {
                    window.open(AppUrl + "page/No680109/printNew2.html?bmmc=" + Ext.getCmp('bmmc').getRawValue() + "&lx=" + Ext.getCmp('lx').getRawValue() + "&bb=" + Ext.getCmp('bb').getRawValue() + "&begintime=" + Ext.getCmp('begintime').getRawValue() + "&endtime=" + Ext.getCmp('endtime').getRawValue(), "打印", "dialogHeight:700px;dialogWidth:1100px");
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
            width: 30,
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
            width: 120
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
    Ext.ComponentManager.get('begintime').setMaxValue(Ext.ComponentManager.get('endtime').getValue());
    Ext.ComponentManager.get('endtime').setMinValue(Ext.ComponentManager.get('begintime').getValue());
    Ext.ComponentManager.get('begintime').on("change", function () {
        Ext.ComponentManager.get('begintime').setMaxValue(Ext.ComponentManager.get('endtime').getValue());
        Ext.ComponentManager.get('endtime').setMinValue(Ext.ComponentManager.get('begintime').getValue());
    });
    Ext.ComponentManager.get('endtime').on("change", function () {
        Ext.ComponentManager.get('endtime').setMinValue(Ext.ComponentManager.get('begintime').getValue());
        Ext.ComponentManager.get('begintime').setMaxValue(Ext.ComponentManager.get('endtime').getValue());
    });
    bmmcstore.on("load", function () {
        lxstore.load({
            params: {
                IS_V_BASETYPE: 'PP_INFORMATION/V_TYPE'
            }
        });
        Ext.data.StoreManager.lookup('bmmcstore').insert(0, {
            V_DEPTNAME: '--全部--',
            V_DEPTCODE: '%'
        });
        // if (Ext.ComponentManager.get('bmmc').findRecordByValue(Ext.util.Cookies.get('v_deptcode')) == false) {
        //     Ext.ComponentManager.get('bmmc').select(bmmcstore.getAt(0));
        // } else {
        //     Ext.ComponentManager.get('bmmc').select(Ext.util.Cookies.get('v_deptcode'));
        // }
        Ext.ComponentManager.get('bmmc').select(bmmcstore.getAt(0));
    });
    lxstore.on("load", function () {
        Ext.data.StoreManager.lookup('lxstore').insert(0, {
            V_BASENAME: '--全部--',
            V_BASECODE: '%'
        });
        // if (Ext.ComponentManager.get('lx').findRecordByValue('PP_INFORMATION|MESSAGE') == false) {
        //     Ext.ComponentManager.get('lx').select(lxstore.getAt(0));
        // } else {
        //     Ext.ComponentManager.get('lx').select('PP_INFORMATION|MESSAGE');
        // }
        Ext.ComponentManager.get('lx').select(lxstore.getAt(0));
        bbstore.load({
            params: {
                IS_V_BASETYPE: 'PM_DIARYDATA/V_CLASSTYPE'
            }
        });
        sqxzt.load();
    });
    sqxzt.on("load", function () {
        Ext.getCmp("qxstrue").select(sqxzt.getAt(0));
    });
    bbstore.on("load", function () {
        Ext.data.StoreManager.lookup('bbstore').insert(0, {
            V_BASENAME: '--全部--',
            V_BASECODE: '%'
        });
        Ext.ComponentManager.get('bb').select(bbstore.getAt(0));
    });
    gridStore.on("load", function () {
        Ext.ComponentManager.get('sum').setValue(
                '数量：' + Ext.getStore('gridStore').data.items.length);
    });
//    Ext.getCmp('lx').on("change", function () {
//        if (Ext.ComponentManager.get("lx").getRawValue() == '缺陷') {
//            Ext.getCmp('qxstrue').show();
//            Ext.getCmp('bb').setHideTrigger(true);
//            Ext.getCmp('bb').setReadOnly(true);
//            Ext.getCmp('bb').setValue('%');
//        } else if (Ext.ComponentManager.get("lx").getRawValue() == '工单') {
//            Ext.getCmp('qxstrue').hide();
//            Ext.getCmp('bb').setHideTrigger(true);
//            Ext.getCmp('bb').setReadOnly(true);
//            Ext.getCmp('bb').setValue('%');
//        } else {
//            Ext.getCmp('qxstrue').hide();
//            Ext.getCmp('bb').setHideTrigger(false);
//            Ext.getCmp('bb').setReadOnly(false);
//            Ext.getCmp('bb').setValue('%');
//        }
//    });
});

// function OnButtonExcelClicked() {
//     if (Ext.ComponentManager.get("lx").getRawValue() == '缺陷') {
//         document.location.href = AppUrl + 'Wsy/PRO_PP_INFORMATION_WITHD_LIST3_EXCEL?V_V_PERSONCODE=' + encodeURI(Ext.util.Cookies.get('v_personcode')) + '&V_V_DEPT=' + encodeURI(Ext.ComponentManager.get('bmmc').getValue()) + '&V_V_TYPE=' + encodeURI(Ext.ComponentManager.get('lx').getValue()) + '&V_V_CLASSTYPE=' + encodeURI(Ext.ComponentManager.get('bb').getValue()) + '&V_V_TYPE_STATE=' + encodeURI(Ext.ComponentManager.get('qxstrue').getValue()) + '&V_D_FROMDATE=' + encodeURI(Ext.Date.format(Ext.getCmp('begintime').getValue(), 'Y-m-d H:i:m')) + '&V_D_TODATE=' + encodeURI(Ext.Date.format(Ext.getCmp('endtime').getValue(), 'Y-m-d H:i:s'));
//     } else {
//         document.location.href = AppUrl + 'Wsy/PRO_PP_INFORMATION_WITHD_LIST2_EXCEL?V_V_PERSONCODE=' + encodeURI(Ext.util.Cookies.get('v_personcode')) + '&V_V_DEPT=' + encodeURI(Ext.ComponentManager.get('bmmc').getValue()) + '&V_V_TYPE=' + encodeURI(Ext.ComponentManager.get('lx').getValue()) + '&V_V_CLASSTYPE=' + encodeURI(Ext.ComponentManager.get('bb').getValue()) + '&V_D_FROMDATE=' + encodeURI(Ext.Date.format(Ext.getCmp('begintime').getValue(), 'Y-m-d H:i:m')) + '&V_D_TODATE=' + encodeURI(Ext.Date.format(Ext.getCmp('endtime').getValue(), 'Y-m-d H:i:s'));
//     }
// }

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
                V_D_FROMDATE: Ext.Date.format(Ext.getCmp('begintime').getValue(), 'Y-m-d H:i:m'),
                V_D_TODATE: Ext.Date.format(Ext.getCmp('endtime').getValue(), 'Y-m-d H:i:s')
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
                // V_D_FROMDATE: Ext.Date.format(Ext.getCmp('begintime').getValue(), 'Y/m/d H:i:m'),
                // V_D_TODATE: Ext.Date.format(Ext.getCmp('endtime').getValue(), 'Y/m/d H:i:s')
                V_D_FROMDATE: Ext.Date.format(Ext.getCmp('begintime').getValue(), 'Y/m/d'),
                V_D_TODATE: Ext.Date.format(Ext.getCmp('endtime').getValue(), 'Y/m/d')
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                Ext.data.StoreManager.lookup('gridStore').loadData(resp.list);
                Ext.ComponentManager.get('sum').setValue('数量：' + Ext.getStore('gridStore').data.items.length);
            }
        });
    }
}

function Bind() {
    Ext.getStore('gridStore').load({
        params: {
            parName: ['V_V_PERSONCODE', 'v_v_dept', 'v_v_type', 'v_v_classtype', 'v_d_fromdate', 'v_d_todate'],
            parType: ['s', 's', 's', 's', 'dt', 'da'],
            parVal: [Ext.util.Cookies.get('v_personcode'), Ext.ComponentManager.get('bmmc').getValue(), Ext.ComponentManager.get('lx').getValue(), Ext.ComponentManager.get('bb').getValue(), Ext.Date.format(Ext.getCmp('begintime').getValue(), 'Y-m-d') + " 16:00:00", Ext.Date.format(Ext.getCmp('endtime').getValue(), 'Y-m-d')],
            proName: 'PRO_PP_INFORMATION_WITHD_LIST2',
            cursorName: 'v_cursor'
        }
    });
    Ext.Ajax.request({
        url: APP + '/ModelSelect',
        method: 'POST',
        async: false,
        params: {
            parName: ['V_V_PERSONCODE', 'v_v_dept', 'v_v_type', 'v_v_classtype', 'v_d_fromdate', 'v_d_todate'],
            parType: ['s', 's', 's', 's', 'dt', 'dt'],
            parVal: [Ext.util.Cookies.get('v_personcode'), Ext.ComponentManager.get('bmmc').getValue(), Ext.ComponentManager.get('lx').getValue(), Ext.ComponentManager.get('bb').getValue(), Ext.Date.format(Ext.getCmp('begintime').getValue(), 'Y-m-d H:i:m'), Ext.Date.format(Ext.getCmp('endtime').getValue(), 'Y-m-d H:i:s')],
            proName: 'PRO_PP_INFORMATION_WITHD_LIST2',
            cursorName: 'v_cursor'
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText).list;
            if (resp == '') {
                Ext.getCmp('miao').setValue('未设置');
            } else {
                Ext.getCmp('miao').setValue(resp[0].D_DATE);
            }
        }
    });
}

function query() {
    setTimeout("query()", 1000 * 60 * 5);
    // Bind();
}

function check(value, metaData, record, rowIndex, colIndex, store) {
    return '<input type="checkbox" checked="checked" id=' + record.raw.I_ID
            + '></input>'
}

function renderRQ(v, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "color: " + record.data.YS;
    return Ext.Date.format(Ext.Date.parse(v, "Y-m-d H:i:s"), 'Y-m-d H:i');
}

function left(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left; color: " + record.data.YS;
    return value;
}

function renderBgColor(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left; color: " + record.data.YS;
    return value;
}

function right(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}