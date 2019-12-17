var date = new Date();
var years = [];
var monthGuid = "";
if (location.href.split("?")[1] != undefined) {
    monthGuid = Ext.urlDecode(location.href.split('?')[1]).V_GUID;
}

for (var i = date.getFullYear(); i < date.getFullYear() + 2; i++) {
    years.push({id: i, value: i});
}

var months = [];
for (var i = 1; i <= 12; i++) {
    months.push({displayField: i, valueField: i});
}

var monthStore = Ext.create("Ext.data.Store", {
    storeId: 'monthStore',
    fields: ['displayField', 'valueField'],
    data: months,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});

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

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
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
            {xtype: 'combo', id: 'month', fieldLabel: '月份', editable: false, margin: '5 0 5 5', labelWidth: 80, width: 230, displayField: 'displayField', valueField: 'valueField', store: monthStore, queryMode: 'local'},
            {xtype: 'textfield', id: 'jxnr', fieldLabel: '检修内容', labelAlign: 'right', labelWidth: 80, margin: '5 0 0 5'},
            {xtype: 'textfield', id: 'inper', fieldLabel: '录入人', labelAlign: 'right', labelWidth: 80, margin: '5 0 0 5', value: Ext.util.Cookies.get("v_personname2")},
            {xtype: 'button', margin: '7 0 0 10', text: '查询', handler: selFinishYear},
            {xtype: 'button', margin: '7 0 0 10', text: '确定返回', handler: saveMonth}]
    })

    //年计划审批完成计划查找
    var GridPanel = Ext.create('Ext.grid.Panel', {
        title: '月计划',
        id: 'GridPanel',
        columnLines: true,
        region: 'center',
        border: true,
        store: gridStore,
        selModel: {
            selType: 'checkboxmodel'
        },
        columns: [
            {text: '厂矿', align: 'left', width: 150, dataIndex: 'V_ORGNAME',renderer : atleft},
            {text: '车间名称', align: 'left', width: 120, dataIndex: 'V_DEPTNAME',renderer : atleft},
            {text: '专业', align: 'left', width: 120, dataIndex: 'V_REPAIRMAJOR_CODE',renderer : atleft},
            {text: '设备名称', align: 'left', width: 200, dataIndex: 'V_EQUNAME',renderer : atleft},
            {text: '检修内容', align: 'left', width: 300, dataIndex: 'V_CONTENT',renderer : atleft},
            {text: '计划停机日期', align: 'right', width: 160, dataIndex: 'V_STARTTIME',
                renderer: atleft},
            {text: '计划竣工日期', align: 'right', width: 160, dataIndex: 'V_ENDTIME',
                renderer: atleft},
            {text: '计划工期（小时）', align: 'right', width:100, dataIndex: 'V_HOUR',renderer : atleft}
        ],
        bbar: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            id: 'page',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });


    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [panel, GridPanel]
    });
    Ext.getCmp('year').on('select', function () {
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