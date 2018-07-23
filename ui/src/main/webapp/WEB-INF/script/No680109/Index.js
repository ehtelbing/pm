Ext.onReady(function () {
    var bmmcstore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'bmmcstore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
//            url: APP + '/ModelSelect',
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
//                parName: ['v_v_deptcode', 'v_v_depttype', 'v_v_person'],
//                parType: ['s', 's', 's'],
//                parVal: [Ext.util.Cookies.get('v_deptcode'), '[主体作业区]', Ext.util.Cookies.get('v_personcode')],
//                proName: 'pro_base_dept_view_depttype',
//                cursorName: 'v_cursor'
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
//            url: APP + '/ModelSelect',
            url: AppUrl + 'Wsy/PRO_PM_DEFECT_STATE_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
//                proName: 'PRO_PM_DEFECT_STATE_VIEW',
//                cursorName: 'V_CURSOR'
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
//            url: APP + '/ModelSelect',
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
//            url: APP + '/ModelSelect',
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
            id: 'miao',
            display: 'hidden',
            xtype: 'displayfield',
            labelWidth: 60,
            value: '18:30:00'
        }, {
            id: 'endtime',
            display: 'hidden',
            xtype: 'datefield',
            format: 'Y-m-d',
            fieldLabel: '终止日期',
            labelWidth: 60,
            value: new Date()
        }, {
            id: 'miao2',
            display: 'hidden',
            xtype: 'displayfield',
            labelWidth: 60,
            value: '18:30:00'
        }, {
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
                var s = [], sum = [];
                for (var i = 0; i < Ext.getStore('gridStore').data.length; i++) {
                    s.push(Ext.getStore('gridStore').data.items[i].raw.I_ID);
                }
                for (j = 0; j < s.length; j++) {
                    if (document.getElementById(s[j]).checked == true) {
                        sum.push(s[j]);
                    }
                }
                if (sum.length == 0) {
                    return false;
                }
                var bmmc = Ext.ComponentManager.get('bmmc').getValue() == '%' ? 'ALL' : Ext.getCmp('bmmc').getValue();
                var lx = Ext.ComponentManager.get('lx').getValue() == '%' ? 'ALL' : Ext.getCmp('lx').getValue();
                var bb = Ext.ComponentManager.get('bb').getValue() == '%' ? 'ALL' : Ext.getCmp('bb').getValue();
                var begintime = Ext.ComponentManager.get('begintime').getRawValue();
                var endtime = Ext.ComponentManager.get('endtime').getRawValue();
                window.showModalDialog(AppUrl + "/No680109/printNew.html?bmmc=" + bmmc + "&lx=" + lx + "&bb=" + bb + "&begintime=" + begintime + "&endtime=" + endtime, sum, "dialogHeight:600px;dialogWidth:900px");
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


//                parName: ['IS_V_BASETYPE'],
//                parType: ['s'],
//                parVal: ['PP_INFORMATION/V_TYPE'],
//                proName: 'PRO_PM_BASEDIC_LIST',
//                cursorName: 'V_CURSOR'
            }
        });
        Ext.data.StoreManager.lookup('bmmcstore').insert(0, {
            V_DEPTNAME: '--全部--',
            V_DEPTCODE: '%'
        });
        Ext.ComponentManager.get('bmmc').select(Ext.util.Cookies.get('v_deptcode'));
    });
    lxstore.on("load", function () {
        Ext.data.StoreManager.lookup('lxstore').insert(0, {
            V_BASENAME: '--全部--',
            V_BASECODE: '%'
        });
        Ext.ComponentManager.get('lx').select('PP_INFORMATION|MESSAGE');
        bbstore.load({
            params: {
                IS_V_BASETYPE: 'PM_DIARYDATA/V_CLASSTYPE'

//                parName: ['IS_V_BASETYPE'],
//                parType: ['s'],
//                parVal: ['PM_DIARYDATA/V_CLASSTYPE'],
//                proName: 'PRO_PM_BASEDIC_LIST',
//                cursorName: 'V_CURSOR'
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
        // query();
    });
    /*	gridStore.on("load", function() {
            Ext.ComponentManager.get('sum').setValue(
                    '数量：' + Ext.getStore('gridStore').data.items.length);
        });*/
    Ext.getCmp('lx').on("change", function () {
        if (Ext.ComponentManager.get("lx").getRawValue() == '缺陷') {
            Ext.getCmp('qxstrue').show()
        } else {
            Ext.getCmp('qxstrue').hide();
        }
    });
});

function OnButtonExcelClicked() {
    if (Ext.ComponentManager.get("lx").getRawValue() == '缺陷') {
        document.location.href = AppUrl + 'Wsy/PRO_PP_INFORMATION_WITHD_LIST3_EXCEL?V_V_PERSONCODE=' + encodeURI(Ext.util.Cookies.get('v_personcode')) + '&V_V_DEPT=' + encodeURI(Ext.ComponentManager.get('bmmc').getValue()) + '&V_V_TYPE=' + encodeURI(Ext.ComponentManager.get('lx').getValue()) + '&V_V_CLASSTYPE=' + encodeURI(Ext.ComponentManager.get('bb').getValue()) + '&V_V_TYPE_STATE=' + encodeURI(Ext.ComponentManager.get('qxstrue').getValue()) + '&V_D_FROMDATE=' + encodeURI(Ext.Date.format(Ext.getCmp('begintime').getValue(), 'Y-m-d H:i:m')) + '&V_D_TODATE=' + encodeURI(Ext.Date.format(Ext.getCmp('endtime').getValue(), 'Y-m-d H:i:s'));
//        var tableName = ["日期时间", "设备名称", "内容", "上报人", "状态", "类型", "班型"];
//        var tableKey = ['D_DATE', 'V_EQUIP', 'V_INFORMATION', 'V_PERSON', 'V_STATE', 'V_TYPE', 'V_CLASSTYPE'];
//        var parName = ['V_V_PERSONCODE', 'V_V_DEPT', 'V_V_TYPE', 'V_V_CLASSTYPE', 'V_V_TYPE_STATE ', 'V_D_FROMDATE', 'V_D_TODATE'];
//        var parType = ['s', 's', 's', 's', 's', 'dt', 'dt'];
//        var parVal = [Ext.util.Cookies.get('v_personcode'), Ext.ComponentManager.get('bmmc').getValue(), Ext.ComponentManager.get('lx').getValue(), Ext.ComponentManager.get('bb').getValue(), Ext.ComponentManager.get('qxstrue').getValue(), Ext.Date.format(Ext.getCmp('begintime').getValue(), 'Y-m-d H:i:m'), Ext.Date.format(Ext.getCmp('endtime').getValue(), 'Y-m-d H:i:s')];
//        var proName = 'PRO_PP_INFORMATION_WITHD_LIST3';
//        var cursorName = 'v_cursor';
//        var returnStr = ['null'];
//        var returnStrName = ['null'];
//        var returnStrType = ['null'];
//        submitData("ModelExcelTotal", tableName, tableKey, parName, parType, parVal, proName, returnStr, returnStrType, returnStrName, cursorName, "title", "信息缺陷作业票查询");
    } else {
        document.location.href = AppUrl + 'Wsy/PRO_PP_INFORMATION_WITHD_LIST2_EXCEL?V_V_PERSONCODE=' + encodeURI(Ext.util.Cookies.get('v_personcode')) + '&V_V_DEPT=' + encodeURI(Ext.ComponentManager.get('bmmc').getValue()) + '&V_V_TYPE=' + encodeURI(Ext.ComponentManager.get('lx').getValue()) + '&V_V_CLASSTYPE=' + encodeURI(Ext.ComponentManager.get('bb').getValue()) + '&V_D_FROMDATE=' + encodeURI(Ext.Date.format(Ext.getCmp('begintime').getValue(), 'Y-m-d H:i:m')) + '&V_D_TODATE=' + encodeURI(Ext.Date.format(Ext.getCmp('endtime').getValue(), 'Y-m-d H:i:s'));
//        var tableName = ["日期时间", "设备名称", "内容", "上报人", "状态", "类型", "班型"];
//        var tableKey = ['D_DATE', 'V_EQUIP', 'V_INFORMATION', 'V_PERSON', 'V_STATE', 'V_TYPE', 'V_CLASSTYPE'];
//        var parName = ['V_V_PERSONCODE', 'v_v_dept', 'v_v_type', 'v_v_classtype', 'v_d_fromdate', 'v_d_todate'];
//        var parType = ['s', 's', 's', 's', 'dt', 'dt'];
//        var parVal = [Ext.util.Cookies.get('v_personcode'), Ext.ComponentManager.get('bmmc').getValue(), Ext.ComponentManager.get('lx').getValue(), Ext.ComponentManager.get('bb').getValue(), Ext.Date.format(Ext.getCmp('begintime').getValue(), 'Y-m-d H:i:m'), Ext.Date.format(Ext.getCmp('endtime').getValue(), 'Y-m-d H:i:s')];
//        var proName = 'PRO_PP_INFORMATION_WITHD_LIST2';
//        var cursorName = 'v_cursor';
//        var returnStr = ['null'];
//        var returnStrName = ['null'];
//        var returnStrType = ['null'];
//        submitData("ModelExcelTotal", tableName, tableKey, parName, parType, parVal, proName, returnStr, returnStrType, returnStrName, cursorName, "title", "信息缺陷作业票查询");
    }
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
//                parName: [],
//                parType: ['s', 's', 's', 's', 's', 'dt', 'dt'],
//                parVal: [],
//                proName: 'PRO_PP_INFORMATION_WITHD_LIST3',
//                cursorName: 'v_cursor'
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
                V_D_FROMDATE: Ext.Date.format(Ext.getCmp('begintime').getValue(), 'Y-m-d H:i:m'),
                V_D_TODATE: Ext.Date.format(Ext.getCmp('endtime').getValue(), 'Y-m-d H:i:s')
//                parName: ['V_V_PERSONCODE', 'v_v_dept', 'v_v_type', 'v_v_classtype', 'v_d_fromdate', 'v_d_todate'],
//                parType: ['s', 's', 's', 's', 'dt', 'dt'],
//                parVal: [Ext.util.Cookies.get('v_personcode'), Ext.ComponentManager.get('bmmc').getValue(), Ext.ComponentManager.get('lx').getValue(), Ext.ComponentManager.get('bb').getValue(), Ext.Date.format(Ext.getCmp('begintime').getValue(), 'Y-m-d H:i:m'), Ext.Date.format(Ext.getCmp('endtime').getValue(), 'Y-m-d H:i:s')],
//                proName: 'PRO_PP_INFORMATION_WITHD_LIST2',
//                cursorName: 'v_cursor'
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