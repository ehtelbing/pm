var bmmcStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'bmmcStore',
    fields: ['V_DEPTNAME', 'V_DEPTCODE'],
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
    storeId: 'gridStore',
    pageSize: 15,
    fields: ['D_DATE', 'I_ID', 'V_CLASS', 'V_CLASSTYPE', 'V_DEPT', 'V_INFORMATION', 'V_PERSONNAME', 'V_TYPE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'Wsy/PRO_PP_INFORMATION_LIST',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    },
    listeners: {
    }
});
var Layout = {
    layout: 'border',
    items: [ {
        xtype: 'panel',
        border: false,
        title: '信息查询',
        titleAlign:'center',
        region: 'north',
        layout: 'column',
        frame: true,
        defaults: {
            style: {
                margin: '5px 0px 5px 10px'
            },
            labelAlign: 'right'
        },
        items: [{
            xtype: 'combo',
            fieldLabel: '部门名称',
            labelWidth: 60,
            id: 'bmmc',
            store: bmmcStore,
            editable: false,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local'
        }, {
            xtype: 'combo',
            fieldLabel: '类型',
            labelWidth: 60,
            id: 'lx',
            store: lxStore,
            editable: false,
            displayField: 'V_BASENAME',
            valueField: 'V_BASECODE',
            queryMode: 'local'
        }, {
            xtype: 'combo',
            fieldLabel: '班型',
            labelWidth: 60,
            id: 'bx',
            store: 'bxStore',
            editable: false,
            displayField: 'V_BASENAME',
            valueField: 'V_BASECODE',
            queryMode: 'local'
        }]
    }, {
        xtype: 'panel',
        border: false,
        region: 'north',
        layout: 'column',
        frame: true,
        defaults: {
            style: {
                margin: '5px 0px 5px 10px'
            },
            labelAlign: 'right'
        },
        items: [{
            xtype: 'datefield',
            fieldLabel: '起始日期',
            labelAlign: 'right',
            labelWidth: 60,
            id: 'stardate',
            format: 'Y年m月d日',
            value: new Date()
        }, {
            xtype: 'datefield',
            fieldLabel: '终止日期',
            labelAlign: 'right',
            labelWidth: 60,
            id: 'enddate',
            format: 'Y年m月d日',
            value: new Date()
        }, {
            xtype: 'button',
            text: '查询',
            handler: queryGrid,
            icon: imgpath + '/search.png',
            style: {
                margin: ' 5px 0 5px 40px'
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
            width: 230,
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
    Ext.data.StoreManager.lookup('bmmcStore').on('load', function () {
        Ext.data.StoreManager.lookup('bmmcStore').insert(0, {
            V_DEPTNAME: '--全部--',
            V_DEPTCODE: '%'
        });
        Ext.getCmp('bmmc').select(Ext.data.StoreManager.lookup('bmmcStore').getAt(0));
    });
    Ext.data.StoreManager.lookup('lxStore').on('load', function () {
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

function queryGrid() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPT: Ext.getCmp('bmmc').getValue(),
            V_V_TYPE: Ext.getCmp('lx').getValue(),
            V_V_CLASSTYPE: Ext.getCmp('bx').getValue(),
            V_D_FROMDATE: Ext.Date.format(Ext.getCmp('stardate').getValue(), 'Y/m/d'),
            V_D_TODATE: Ext.Date.format(Ext.getCmp('enddate').getValue(), 'Y/m/d')
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
    document.location.href = AppUrl + 'Wsy/PRO_PP_INFORMATION_LIST_EXCEL?V_V_PERSONCODE=' + encodeURI(Ext.util.Cookies.get('v_personcode')) + '&V_V_DEPT=' + encodeURI(Ext.getCmp('bmmc').getValue()) + '&V_V_TYPE=' + encodeURI(Ext.getCmp('lx').getValue()) + '&V_V_CLASSTYPE=' + encodeURI(Ext.getCmp('bx').getValue()) + '&V_D_FROMDATE=' + encodeURI(Ext.Date.format(Ext.getCmp('stardate').getValue(), 'Y-m-d')) + '&V_D_TODATE=' + encodeURI(Ext.Date.format(Ext.getCmp('enddate').getValue(), 'Y-m-d'));
}

Ext.onReady(onPageLoaded);