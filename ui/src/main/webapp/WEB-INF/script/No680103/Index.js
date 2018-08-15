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
var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    pageSize: 15,
    storeId: 'gridStore',
    fields: ['D_DATE', 'I_ID', 'V_CLASS', 'V_CLASSTYPE', 'V_DEPT', 'V_INFORMATION', 'V_PERSONNAME', 'V_TYPE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'Wsy/PRO_PP_INFORMATION_LIST_PER',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    },
    listeners: {}
});
var Layout = {
    layout: 'border',
    items: [{
        xtype: 'panel',
        title: '信息修改',
        region: 'north'
    }, {
        xtype: 'panel',
        border: false,
        region: 'north',
        layout: 'column',
        frame: true,
        baseCls: 'my-panel-no-border',
        defaults: {
            style: {
                margin: '5px 0px 5px 10px'
            },
            labelAlign: 'right'
        },
        items: [{
            xtype: 'datefield',
            fieldLabel: '日期',
            labelAlign: 'right',
            labelWidth: 40,
            id: 'adate',
            format: 'Y年m月d日',
            value: new Date()
        }, {
            xtype: 'combo',
            fieldLabel: '类型',
            labelWidth: 30,
            id: 'lx',
            store: lxStore,
            editable: false,
            displayField: 'V_BASENAME',
            valueField: 'V_BASECODE',
            queryMode: 'local'
        }, {
            xtype: 'combo',
            fieldLabel: '班型',
            labelWidth: 30,
            id: 'bx',
            store: 'bxStore',
            editable: false,
            displayField: 'V_BASENAME',
            valueField: 'V_BASECODE',
            queryMode: 'local'
        }, {
            xtype: 'button',
            text: '查询',
            handler: queryGrid,
            icon: imgpath + '/search.png',
            style: {
                margin: ' 5px 0 5px 10px'
            }
        }, {
            xtype: 'button',
            text: '导出Excel',
            handler: OnButtonExcelClicked,
            icon: imgpath + '/001.gif'
        }]
    }, {
        xtype: 'gridpanel',
        region: 'center',
        plugins: [{
            ptype: 'cellediting',
            clicksToEdit: 1
        }],
        columnLines: true,
        id: 'grid',
        store: 'gridStore',
        features: [{
            ftype: 'summary'
        }],
        columns: [{
            dataIndex: 'B_END',
            hidden: true
        }, {
            xtype: 'rownumberer',
            text: '序号',
            width: 35,
            align: 'center'
        }, {
            xtype: 'actioncolumn',
            width: 40,
            text: '修改',
            align: 'center',
            items: [{
                icon: imgpath + '/edit.png',
                handler: ModifyARecord
            }]
        }, {
            text: '日期',
            align: 'center',
            width: 110,
            dataIndex: 'D_DATE',
            renderer: renderDate,
            summaryType: 'count',
            summaryRenderer: function (value, metadata) {
                metadata.style = 'font-weight: bold;';
                return '合计'
            }
        }, {
            text: '班型',
            align: 'center',
            width: 110,
            dataIndex: 'V_CLASSTYPE',
            summaryType: 'count',
            summaryRenderer: function (value, metadata) {
                metadata.style = 'font-weight: bold;';
                return '数量  : ' + value + '条'
            }
        }, {
            text: '班组',
            align: 'center',
            width: 110,
            dataIndex: 'V_CLASS'
        }, {
            text: '录入人',
            align: 'center',
            width: 90,
            dataIndex: 'V_PERSONNAME',
            renderer: renderFont
        }, {
            text: '内容',
            align: 'center',
            width: 200,
            dataIndex: 'V_INFORMATION',
            renderer: renderFont
        }, {
            text: '信息类型',
            align: 'center',
            width: 100,
            dataIndex: 'V_TYPE'
        }, {
            text: '所属部门',
            align: 'center',
            width: 150,
            dataIndex: 'V_DEPT',
            renderer: renderFont
        }],
        bbar: ['->', {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    }]
};

function onPageLoaded() {
    Ext.create('Ext.container.Viewport', Layout);
    Ext.data.StoreManager.lookup('lxStore').on('load', function () {
//        Ext.data.StoreManager.lookup('lxStore').removeAt((Ext.data.StoreManager.lookup('lxStore').data.items.length) - 1);
//        Ext.data.StoreManager.lookup('lxStore').removeAt((Ext.data.StoreManager.lookup('lxStore').data.items.length) - 1);
        Ext.data.StoreManager.lookup('lxStore').insert(0, {
            V_BASENAME: '--全部--',
            V_BASECODE: '%'
        });
        Ext.getCmp('lx').select(Ext.data.StoreManager.lookup('lxStore').getAt(0));
    });
    Ext.data.StoreManager.lookup('bxStore').on('load', function () {
        Ext.data.StoreManager.lookup('bxStore').insert(0, {
            V_BASENAME: '--全部--',
            V_BASECODE: '%'
        });
        Ext.getCmp('bx').select(Ext.data.StoreManager.lookup('bxStore').getAt(0));
    });
    setTimeout('queryGrid()', 1000 * 1);
}

function ModifyARecord(grid, rowIndex, colIndex) {
    var aid = grid.getStore().getAt(rowIndex).data.I_ID;
    window.open(AppUrl + "page/No680104/Index.html?planID=" + aid, '', 'height=500px,width=700px,top=100px,left=100px,resizable=yes');
}

function reLoad() {
    queryGrid();
}

function queryGrid() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_D_DATE: Ext.Date.format(Ext.getCmp('adate').getValue(), 'Y-m-d'),
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_TYPE: Ext.getCmp('lx').getValue(),
            V_V_CLASSTYPE: Ext.getCmp('bx').getValue()
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

function renderFont(value, metaData) {
    metaData.style = 'text-align: left';
    return value;
}

function renderDate(value, metaData) {
    if (Ext.Date.format(value, 'Y-m-d') != '' && Ext.Date.format(value, 'Y-m-d') != null) {
        return Ext.Date.format(value, 'Y-m-d').substr(0, 10).split('-')[0] + '年' + Ext.Date.format(value, 'Y-m-d').substr(0, 10).split('-')[1] + '月' + Ext.Date.format(value, 'Y-m-d').substr(0, 10).split('-')[2] + '日';
    } else {
        if (value != '' && value != null && value != undefined) {
            return value.substr(0, 10).split('-')[0] + '年' + value.substr(0, 10).split('-')[1] + '月' + value.substr(0, 10).split('-')[2] + '日';
        } else {
            return value;
        }
    }
}

function renderMoney(value, metaData) {
    metaData.style = 'text-align: right';
    if (value != '' && value != null) {
        return Ext.util.Format.number(value, '0.00');
    } else {
        return value;
    }
}

function OnButtonExcelClicked() {
    document.location.href = AppUrl + 'Wsy/PRO_PP_INFORMATION_LIST_PER_EXCEL?V_D_DATE=' + encodeURI(Ext.Date.format(Ext.getCmp('adate').getValue(), 'Y-m-d')) + '&V_V_PERSONCODE=' + encodeURI(Ext.util.Cookies.get('v_personcode')) + '&V_V_TYPE=' + encodeURI(Ext.getCmp('lx').getValue()) + '&V_V_CLASSTYPE=' + encodeURI(Ext.getCmp('bx').getValue());
}

Ext.onReady(onPageLoaded);