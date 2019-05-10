var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
Ext.onReady(function () {
    Ext.QuickTips.init();

    var ckstore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'ckstore',
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
                'V_V_PERSONCODE': V_V_PERSONCODE,
                'V_V_DEPTCODE': V_V_DEPTCODE,
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '基层单位'
            }
        }
    });

    var zyqstore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'zyqstore',
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


    var panel = Ext.create('Ext.form.Panel', {
        id: 'panellow',
        region: 'north',
        defaults: {
            style: 'margin:5px 0px 5px 5px',
            labelAlign: 'right'
        },
        layout: {
            type: 'column'
        },
        frame: true,
        items: [{
            id: 'begintime',
            xtype: 'datefield',
            editable: false,
            format: 'Y/m/d',
            value: new Date(new Date().getFullYear(), 0, 1),
            fieldLabel: '时间段选择',
            labelWidth: 100,
            baseCls: 'margin-bottom'
        }, {
            id: 'endtime',
            xtype: 'datefield',
            editable: false,
            format: 'Y/m/d',
            value: new Date(),
            fieldLabel: '至',
            labelWidth: 50
        }, {
            id: 'ck',
            xtype: 'combo',
            store: ckstore,
            editable: false,
            fieldLabel: '厂矿',
            labelWidth: 70,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            baseCls: 'margin-bottom'
        }, {
            id: 'zyq',
            xtype: 'combo',
            store: zyqstore,
            editable: false,
            fieldLabel: '作业区',
            labelWidth: 70,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            baseCls: 'margin-bottom'
        }, {
            id: 'seltext',
            xtype: 'textfield',
            width: 158,
            emptyText: '备件问题模糊搜索',
            margin: '5px 0px 5px 10px'
        }, {
            id: 'query',
            xtype: 'button',
            icon: imgpath + '/search.png',
            text: '查询',
            width: 80,
            handler: function () {
                // tabIndex = parseInt(Ext.getCmp('tabpanel').getActiveTab().id.substring(8));
                Ext.getCmp('page').store.currentPage = 1;
                addTab();
            }
        }, {
            xtype: 'hidden',
            id: 'tabid'
        }]
    });

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 50,
        autoLoad: false,
        fields: ['D_DEFECTDATE', 'V_DEFECTLIST', 'V_EQUNAME',
            'V_EQUSITE', 'V_DEPTNAME', 'V_PERNAME', 'V_IDEA',
            'V_STATENAME', 'V_SOURCENAME', 'V_SOURCEID',
            'D_INDATE', 'V_PERCODE', 'V_GUID', 'V_STATECODE',
            'V_STATECOLOR', 'V_ORDERID'],

        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'qx/PRO_PM_07_DEFECT_PART_PER',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        }
    });

    var gridPanel = Ext.create("Ext.grid.Panel", {
        region: 'center',
        id: 'grid',
        columnLines: true,
        width: '100%',
        store: gridStore,
        autoScroll: true,
        height: 400,
        columns: [{
            xtype: 'rownumberer',
            width: 30,
            sortable: false
        }, {
            text: '备件问题日期',
            dataIndex: 'D_DEFECTDATE',
            align: 'center',
            width: 160,
            renderer: CreateGridColumnTd
        },
            {
                text: '备件问题明细',
                dataIndex: 'V_DEFECTLIST',
                align: 'center',
                width: 300,
                renderer: CreateGridColumnTd
            }, {
                text: '作业区',
                dataIndex: 'V_DEPTNAME',
                align: 'center',
                width: 100,
                renderer: CreateGridColumnTd
            },
            {
                text: '负责人',
                dataIndex: 'V_PERNAME',
                align: 'center',
                width: 100,
                renderer: CreateGridColumnTd
            },
            {
                text: '处理意见',
                dataIndex: 'V_IDEA',
                align: 'center',
                renderer: CreateGridColumnTd
            }],
        listeners: {
            itemdblclick: itemclick
        },
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }, {
            xtype: 'label',
            text: '已计划',
            style: ' margin: 0px 0px 0px 10px;color:#FFCC00'
        }, {
            xtype: 'label',
            text: '已接收',
            style: ' margin: 0px 0px 0px 10px;color:#009933'
        }, {
            xtype: 'label',
            text: '已反馈',
            style: ' margin: 0px 0px 0px 10px;color:#6666FF'
        }, {
            xtype: 'label',
            text: '已验收',
            style: ' margin: 0px 0px 0px 10px;color:#333300'
        }, {
            xtype: 'label',
            text: '遗留问题',
            style: ' margin: 0px 0px 0px 10px;color:#000000'
        }, {
            xtype: 'label',
            text: '工单驳回',
            style: ' margin: 0px 0px 0px 10px;color:#000000'
        }, {
            xtype: 'label',
            text: '未处理',
            style: ' margin: 0px 0px 0px 10px;color:#FF0000'
        }, {
            xtype: 'label',
            text: '已下票',
            style: ' margin: 0px 0px 0px 10px;color:#FF33CC'
        }, {
            xtype: 'label',
            text: '已解决',
            style: ' margin: 0px 0px 0px 10px;color:#000000'
        }]
    });

    var tabpanel = Ext.create("Ext.tab.Panel", {
        id: 'tabpanel',
        region: 'center',
        listeners: {
            tabchange: function () {
                Ext.getCmp("tabid").setValue(Ext.getCmp('tabpanel').getActiveTab().id);
                Ext.getCmp('page').store.currentPage = 1;
                QueryGrid();
            }
        }
    });

    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel, {
            xtype: 'panel',
            region: 'center',
            id: 'testPanel',
            height: 40,
            frame: true,
            region: 'north',
            layout: 'border'
        }, gridPanel]
    });

    Ext.data.StoreManager.lookup('ckstore').on("load", function () {
        Ext.getCmp("ck").select(ckstore.getAt(0));
        Ext.data.StoreManager.lookup('zyqstore').load({
            params: {
                V_V_PERSONCODE: V_V_PERSONCODE,
                V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE: '[主体作业区]'
            }
        });
    });

    Ext.getCmp("ck").on("select", function () {
        Ext.data.StoreManager.lookup('zyqstore').load({
            params: {
                V_V_PERSONCODE: V_V_PERSONCODE,
                V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE: '[主体作业区]'
            }
        });
    });

    Ext.data.StoreManager.lookup('zyqstore').on("load", function () {
        Ext.getCmp("zyq").select(Ext.data.StoreManager.lookup('zyqstore').getAt(0));
        addTab();
    });


    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_D_DEFECTDATE_B: Ext.Date.format(Ext.getCmp("begintime").getValue(), 'Y/m/d'),
            V_D_DEFECTDATE_E: Ext.Date.format(Ext.getCmp("endtime").getValue(), 'Y/m/d'),
            V_V_DEPTCODE: Ext.getCmp("zyq").getValue(),
            V_V_SOURCECODE: Ext.getCmp("tabid").getValue(),
            V_V_DEFECTLIST: Ext.getCmp("seltext").getValue(),
            X_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize

        }
    });

});

function itemclick(s, record, item, index, e, eOpts) {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    window.open(AppUrl + "page/PM_070301/index.html?v_guid="
        + Ext.getStore("gridStore").getAt(index).get("V_GUID"), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

}

function addTab() {
    Ext.getCmp('tabpanel').removeAll();
    Ext.Ajax.request({
        url: AppUrl + 'qx/PRO_PM_07_DEFECT_PART_COUNT',
        method: 'POST',
        async: false,
        params: {
            V_D_DEFECTDATE_B: Ext.Date.format(Ext.getCmp("begintime").getValue(), 'Y/m/d'),
            V_D_DEFECTDATE_E: Ext.Date.format(Ext.getCmp("endtime").getValue(), 'Y/m/d'),
            V_V_DEPTCODE: Ext.getCmp("zyq").getValue(),
            V_V_DEFECTLIST: Ext.getCmp("seltext").getValue(),
            X_PERSONCODE: Ext.util.Cookies.get('v_personcode')
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            resp = resp.list;
            for (i = 0; i < resp.length; i++) {
                Ext.getCmp("tabpanel").add({
                    id: resp[i].V_SOURCECODE,
                    title: resp[i].V_SOURCENAME
                });
            }
            Ext.getCmp("testPanel").add(Ext.getCmp('tabpanel'));
            Ext.getCmp("tabpanel").setActiveTab(0);
            QueryGrid();
        }
    });
}

function QueryGrid() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_D_DEFECTDATE_B: Ext.Date.format(Ext.getCmp("begintime").getValue(), 'Y/m/d'),
            V_D_DEFECTDATE_E: Ext.Date.format(Ext.getCmp("endtime").getValue(), 'Y/m/d'),
            V_V_DEPTCODE: Ext.getCmp("zyq").getValue(),
            V_V_SOURCECODE: Ext.getCmp("tabid").getValue(),
            V_V_DEFECTLIST: Ext.getCmp("seltext").getValue(),
            X_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    })
}

function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;color:" + store.getAt(rowIndex).get('V_STATECOLOR');
    if (value == null) {
        return '<div data-qtip="' + value + '" ></div>';
    }
    else {
        return '<div data-qtip="' + value + '" >' + value + '</div>';
    }
}
