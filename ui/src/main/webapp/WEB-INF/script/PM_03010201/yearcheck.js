var date = new Date();
var years = [];
var monthGuid = "";
if (location.href.split("?")[1] != undefined) {
    monthGuid = Ext.urlDecode(location.href.split('?')[1]).V_GUID;
}

for (var i = date.getFullYear(); i < date.getFullYear() + 2; i++) {
    years.push({id: i, value: i});
}

Ext.onReady(function () {
    Ext.QuickTips.init();

    var cxStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'cxStore',
        fields: ['V_ORGCODE', 'V_DEPTCODE', 'V_CXCODE', 'V_CXNAME', 'V_FLAG'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_PLAN_YEAR_CX_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var yearStore = Ext.create('Ext.data.Store', {
        id: 'yearStore',
        fields: ['id', 'value'],
        data: years,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });

    var ygridStore = Ext.create('Ext.data.Store', {
        id: 'ygridStore',
        pageSize: 50,
        autoLoad: false,
        fields: ['V_GUID', 'V_YEARID', 'V_YEAR', 'V_ORGCODE', 'V_ORGNAME',
            'V_DEPTCODE', 'V_DEPTNAME', 'V_CXCODE', 'V_CXNAME', 'V_ZY', 'V_ZYMC', 'V_STATE', 'V_DEL',
            'V_INPER', 'V_INPERNAME', 'V_INDATE', 'V_JHTJSJ', 'V_JHJGSJ',
            'V_JHGQ', 'V_COUNT', 'V_EQUCODE', 'V_EQUNAME', 'V_YEARNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PRO_03_PLAN_YEAR_GET',
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

    var panel = Ext.create('Ext.panel.Panel', {
        frame: true,
        width: '100%',
        layout: 'column',
        region: 'north',
        items: [{xtype: 'combo', id: 'year', fieldLabel: '年份', editable: false, margin: '5 0 0 5', labelWidth: 80, labelAlign: 'right', width: 150, displayField: 'value', valueField: 'id', value: date.getFullYear(), store: yearStore, queryMode: 'local'},
            {xtype: 'combo', id: 'cx', fieldLabel: '产线名称', editable: false, margin: '5 0 0 5', labelWidth: 80, labelAlign: 'right', displayField: 'V_CXNAME', valueField: 'V_CXCODE', store: cxStore, queryMode: 'local'},
            {xtype: 'textfield', id: 'yearName', fieldLabel: '年计划名称', labelAlign: 'right', labelWidth: 80, margin: '5 0 0 5'},
            {xtype: 'textfield', id: 'yearper', fieldLabel: '录入人', labelAlign: 'right', labelWidth: 80, margin: '5 0 0 5', value: Ext.util.Cookies.get("v_personname2")},
            {xtype: 'button', margin: '7 0 0 10', text: '查询', handler: selFinishYear},
            {xtype: 'button', margin: '7 0 0 10', text: '确定返回', handler: saveMonth}]
    })

    //年计划审批完成计划查找
    var yGridPanel = Ext.create('Ext.grid.Panel', {
        title: '年计划',
        id: 'yGridPanel',
        columnLines: true,
        region: 'center',
        border: true,
        store: ygridStore,
        selModel: {
            selType: 'checkboxmodel'
        },
        columns: [
            {text: '年份', align: 'center', width: 100, dataIndex: 'V_YEAR', renderer: atleft},
            {text: '计划厂矿', align: 'center', width: 140, dataIndex: 'V_ORGNAME', renderer: atleft},
            {text: '作业区', align: 'center', width: 140, dataIndex: 'V_DEPTNAME', renderer: atleft},
            {text: '专业', align: 'center', width: 100, dataIndex: 'V_ZYMC', renderer: atleft},
            {text: '产线名称', align: 'center', width: 160, dataIndex: 'V_CXNAME', renderer: atleft},
            {text: '检修内容', align: 'center', width: 200, dataIndex: 'V_COUNT', renderer: atleft},
            {text: '计划停机时间', align: 'center', width: 140, dataIndex: 'V_JHTJSJ', renderer: atleft},
            {text: '计划竣工时间', align: 'center', width: 140, dataIndex: 'V_JHJGSJ', renderer: atleft},
            {text: '计划工期', align: 'center', width: 100, dataIndex: 'V_JHGQ', renderer: atleft}
        ],
        bbar: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            id: 'page',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'ygridStore'
        }]
    });


    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [panel, yGridPanel]
    });


    Ext.data.StoreManager.lookup('cxStore').load({
        params: {
            'V_V_ORGCODE': Ext.util.Cookies.get('v_orgCode'),
            'V_V_DEPTCODE': Ext.util.Cookies.get('v_deptcode'),
            'V_V_CXNAME': '%'
        }
    });

    Ext.data.StoreManager.lookup('cxStore').on('load', function () {
        Ext.data.StoreManager.lookup('cxStore').insert(0, {
            V_CXNAME: '--全部--',
            V_CXCODE: '%'
        });
        Ext.getCmp('cx').select(Ext.data.StoreManager.lookup('cxStore').getAt(0));
        selFinishYear();
    })

    Ext.getCmp('year').on('select', function () {
        selFinishYear();
    });

    Ext.getCmp('cx').on('select', function () {
        selFinishYear();
    });

});


function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function timeTurn(value, metaData, recode, store) {
    metaData.style = "text-align:center";
    var val = value.toString().substring(0, 10);
    return '<div>' + val + '</div>';
}

function rendererTime(value, metaData) {
    metaData.style = "text-align:right";
    return value.split(".")[0];
}

function CreateGridColumnTime(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right";
    var time = value.split('.')[0];
    return time;
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

//年计划查询
function selFinishYear() {
    Ext.data.StoreManager.lookup('ygridStore').currentPage = 1;
    Ext.data.StoreManager.lookup("ygridStore").load({
        params: {
            V_V_YEAR: Ext.getCmp("year").getValue(),
            V_V_ORGCODE: Ext.util.Cookies.get('v_orgCode'),
            V_V_DEPTCODE: Ext.util.Cookies.get('v_deptcode'),
            V_V_ZYCODE: '%',
            V_V_CXCODE: Ext.getCmp('cx').getValue(),
            V_V_YEARNAME: Ext.getCmp('yearName').getValue(),
            V_V_PERNAME: Ext.getCmp('yearper').getValue(),
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    });
}

//年计划选择
function saveMonth() {
    var record = Ext.getCmp("yGridPanel").getSelectionModel().getSelection();
    if (record.length <= 0) {
        alert('请选择一条年计划');
        return false;
    }
    var snum = 0;
    for (var i = 0; i < record.length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'dxfile/YEAR_TO_MONTH_IN',
            method: 'POST',
            async: false,
            params: {
                V_YEARGUID: record[i].data.V_GUID,
                V_MONTHGUID: monthGuid,
                V_DEFECTGUID: "",
                V_PERCODE: Ext.util.Cookies.get('v_personcode')
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (resp.RET == "SUCCESS") {
                    snum++;
                }
            }
        });
    }
    if (snum == record.length) {
        window.close();
        window.opener.QueryCyGrid();
    }
}


/**
 *月计划缺陷直接添加写入 PM_DEFECTTOWORKORDER 表格
 * 月计划关联年计划写入表格 YEAR_TO_MONTH
 */