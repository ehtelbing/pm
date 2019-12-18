/**
 * create by hrb 2019/6/24
 */
var WEEKGUID = "";
var MonthGuid = '';
var startUpTime = '';
var endUpTime = '';
var YEAR = '';
var MONTH = '';
var WEEK = '';
var V_ORGCODE = '';
var V_DEPTCODE = '';

/*新版的从月计划添加周计划*/
if (location.href.split('?')[1] != undefined) {
    WEEKGUID = Ext.urlDecode(location.href.split("?")[1]).WeekGuid == null ? '' : Ext.urlDecode(location.href.split("?")[1]).WeekGuid;
    YEAR = Ext.urlDecode(location.href.split("?")[1]).YEAR == null ? '' : Ext.urlDecode(location.href.split("?")[1]).YEAR;
    MONTH = Ext.urlDecode(location.href.split("?")[1]).MONTH == null ? '' : Ext.urlDecode(location.href.split("?")[1]).MONTH;
    WEEK = Ext.urlDecode(location.href.split("?")[1]).WEEK == null ? '' : Ext.urlDecode(location.href.split("?")[1]).WEEK;
    V_ORGCODE = Ext.urlDecode(location.href.split("?")[1]).V_ORGCODE == null ? '' : Ext.urlDecode(location.href.split("?")[1]).V_ORGCODE;
    V_DEPTCODE = Ext.urlDecode(location.href.split("?")[1]).V_DEPTCODE == null ? '' : Ext.urlDecode(location.href.split("?")[1]).V_DEPTCODE;
    startUpTime = Ext.urlDecode(location.href.split("?")[1]).startUpTime == null ? '' : Ext.urlDecode(location.href.split("?")[1]).startUpTime;
    endUpTime = Ext.urlDecode(location.href.split("?")[1]).endUpTime == null ? '' : Ext.urlDecode(location.href.split("?")[1]).endUpTime;
}
var defectType = '';

//年份
var date = new Date();
var yearList = [];

for (var i = 2017; i < date.getFullYear() + 2; i++) {
    yearList.push({displayField: i, valueField: i})
}

var yearStore = Ext.create('Ext.data.Store', {
    id: 'yearStore',
    fields: ['displayField', 'valueField'],
    data: yearList,
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});
//月份
var monthList = [];
for (var i = 1; i <= 12; i++) {
    monthList.push({displayField: i, valueField: i});
}

monthList.push({displayField: '全部', valueField: '%'});

var monthStore = Ext.create("Ext.data.Store", {
    storeId: 'monthStore',
    fields: ['displayField', 'valueField'],
    data: monthList,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});

Ext.onReady(function () {
    Ext.QuickTips.init();

    //月计划gridStore
    var mgridStore = Ext.create('Ext.data.Store', {
        id: 'mgridStore',
        autoLoad: false,
        fields: ['I_ID', 'V_GUID', 'V_YEAR', 'V_MONTH', 'V_ORGCODE', 'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME', 'V_EQUTYPECODE',
            'V_EQUTYPENAME', 'V_EQUCODE', 'V_EQUNAME', 'V_REPAIRMAJOR_CODE', 'V_CONTENT', 'V_STARTTIME',
            'V_ENDTIME', 'V_HOUR', 'V_INDATE', 'V_INPER', 'V_INPERNAME', 'V_BZ', 'V_FLOWCODE',
            'V_FLOWORDER', 'V_OTHERPLAN_GUID', 'V_JHMX_GUID', 'V_OTHERPLAN_TYPE', 'V_FLOWTYPE',
            'V_REPAIRDEPT_CODE', 'V_REPAIRDEPT_NAME', 'V_REPAIR_PERNAME', 'V_MONTHID', 'V_STATE',
            'V_MAIN_DEFECT', 'V_EXPECT_AGE', 'V_REPAIR_PER', 'V_SGWAY', 'V_SGWAYNAME',
            'V_FLAG', 'V_SBB_GUID', 'V_ADJUST', 'V_OPERANAME', 'V_WEEKNUM'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'cjy/PM_03_PLAN_MONTH_FINISH_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    //缺陷类型
    var qxlxStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        id: 'qxlxStore',
        fields: ['V_SOURCECODE', 'V_SOURCENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_07/PRO_PM_07_DEFECT_SOURCE_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var bjqxlxStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'bjqxlxStore',
        fields: ['I_ID', 'V_SOURCECODE', 'V_SOURCENAME', 'V_SOURCETABLE', 'V_SOURCEREMARK', 'I_ORDER'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'qx/PRO_DEFECT_PART_TYPE_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var wxqxGridStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'wxqxGridStore',
        fields: ['D_DATE_EDITTIME', 'D_DEFECTDATE', 'D_INDATE', 'I_ID', 'V_BZ', 'V_DEFECTLIST', 'V_DEPTCODE', 'V_DEPTNAME', 'V_EDIT_GUID',
            'V_EQUCHILDCODE', 'V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_EQUSITENAME', 'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_FLAG', 'V_GUID',
            'V_HOUR', 'V_IDEA', 'V_INPERCODE', 'V_ORGCODE', 'V_ORGNAME', 'V_PERNAME', 'V_PROC_WAY', 'V_REPAIRMAJOR_CODE', 'V_SOURCECODE', 'V_SOURCEID',
            'V_SOURCENAME', 'V_SOURCEREMARK', 'V_SOURCETABLE', 'V_SOURCE_GRADE', 'V_STATECODE', 'V_STATECOLOR', 'V_STATENAME', 'V_SYSTEM', 'WBSCODE', 'WBSNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PM_PLAN_YEAR_RE_DEFECT_SEL2',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var mdgridStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'mdgridStore',
        fields: ['D_DEFECTDATE', 'V_DEFECTLIST', 'V_EQUCODE', 'V_EQUNAME',
            'V_EQUSITE', 'V_DEPTNAME', 'V_PERNAME', 'V_IDEA',
            'V_STATENAME', 'V_SOURCENAME', 'V_SOURCEID',
            'D_INDATE', 'V_PERCODE', 'V_GUID', 'V_STATECODE',
            'V_STATECOLOR', 'V_ORDERID', 'V_EQUTYPECODE', 'V_SOURCECODE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SM',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    //周计划已关联缺陷
    var hChoGridStore = Ext.create('Ext.data.Store', {
        id: 'hChoGridStore',
        autoLoad: false,
        fields: ['D_DEFECTDATE', 'V_DEFECTLIST', 'V_EQUCODE', 'V_EQUNAME',
            'V_EQUSITE', 'V_DEPTNAME', 'V_PERNAME', 'V_IDEA',
            'V_STATENAME', 'V_SOURCENAME', 'V_SOURCEID',
            'D_INDATE', 'V_PERCODE', 'V_GUID', 'V_STATECODE',
            'V_STATECOLOR', 'V_ORDERID', 'V_EQUTYPECODE', 'V_SOURCECODE', 'V_EQUTYPENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'cjy/PM_DEFECTTOWORKORDER_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var hChoGrid = Ext.create('Ext.grid.Panel', {
        id: 'hChoGrid',
        store: hChoGridStore,
        region: 'center',
        border: true,
        split: true,
        columnLines: true,
        autoScroll: true,
        columns: [
            {text: '序号', xtype: 'rownumberer', width: 50, sortable: false},
            {text: '删除', dataIndex: 'V_GUID', align: 'center', width: 70, renderer: delCorDef},
            {text: '单位', dataIndex: 'V_DEPTNAME', align: 'center', width: 100, renderer: CreateGridColumnTd},
            {text: '缺陷状态', dataIndex: 'V_STATENAME', align: 'center', width: 100, renderer: CreateGridColumnTd},
            {text: '缺陷类型', dataIndex: 'V_SOURCENAME', align: 'center', width: 100, renderer: CreateGridColumnTd},
            {text: '设备', dataIndex: 'V_EQUNAME', align: 'center', width: 160, renderer: CreateGridColumnTd},
            {text: '缺陷日期', dataIndex: 'D_DEFECTDATE', align: 'center', width: 160, renderer: CreateGridColumnTime},
            {text: '缺陷明细', dataIndex: 'V_DEFECTLIST', align: 'center', width: 300, renderer: CreateGridColumnTd},
            {text: '设备位置', dataIndex: 'V_EQUSITE', align: 'center', width: 200, renderer: CreateGridColumnTd},
            {text: '负责人', dataIndex: 'V_PERNAME', align: 'center', width: 100, renderer: CreateGridColumnTd},
            {text: '处理意见', dataIndex: 'V_IDEA', align: 'center', width: 300, renderer: CreateGridColumnTd}]
        , tbar: [
            {
                xtype: 'button',
                text: '确定选择',
                handler: turnPage
            }
        ]

    });

    //已选择模块
    var haveChoDef = Ext.create('Ext.panel.Panel', {
        id: 'haveChoDef',
        layout: 'border',
        region: 'center',
        split: true,
        width: '45%',
        //frame:true,
        border: false,
        title: '已选择缺陷',
        items: [hChoGrid]
    });

    var tab = Ext.create('Ext.tab.Panel', {
        frame: true,
        width: '100%',
        region: 'north',
        items: [{title: '缺陷选择', id: 'qxxz'}, {title: '备件选择', id: 'bjxz'}],
        listeners: {
            tabchange: function (tabPanel, newCard, oldCard, eOpts) {
                if (newCard.id == "bjxz") {
                    defectType = "bjxz";
                    Ext.getCmp('qxlx').hide();
                    Ext.getCmp('bjqxlx').show();
                    wxqxLoad();
                } else {
                    defectType = "qxxz";
                    Ext.getCmp('qxlx').show();
                    Ext.getCmp('bjqxlx').hide();
                    wxqxLoad();
                }
            }
        }
    });

    var wxqxpanel = Ext.create("Ext.toolbar.Toolbar", {
        id: 'wxqxpanel',
        frame: true,
        border: false,
        width: '100%',
        bodyCls: 'border_wid',
        items: [{
            id: 'qxlx',
            xtype: 'combo',
            store: qxlxStore,
            editable: false,
            fieldLabel: '缺陷类型',
            labelWidth: 70,
            labelAlign: 'right',
            displayField: 'V_SOURCENAME',
            valueField: 'V_SOURCECODE',
            queryMode: 'local'
        }, {
            id: 'bjqxlx',
            xtype: 'combo',
            hidden: true,
            store: bjqxlxStore,
            editable: false,
            fieldLabel: '问题备件类型',
            labelWidth: 100,
            labelAlign: 'right',
            displayField: 'V_SOURCENAME',
            valueField: 'V_SOURCECODE',
            queryMode: 'local'
        }, {
            xtype: 'button',
            text: '查询',
            icon: imgpath + '/search.png',
            listeners: {click: wxqxLoad}
        }, {
            xtype: 'button',
            text: '确认返回',
            icon: dxImgPath + '/back.png',
            listeners: {click: SaveWxQx}
        }]
    });

    //年获维修计划关联缺陷guid
    var ydefGPanel = Ext.create('Ext.grid.Panel', {
        region: "center",
        id: 'qxAdd',
        store: wxqxGridStore,
        width: '100%',
        columnLines: true,
        selType: 'checkboxmodel',
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text: 'WBS编码', width: 140, dataIndex: 'WBSCODE', align: 'center'},
            {text: 'WBS名称', width: 140, dataIndex: 'WBSNAME', align: 'center'},
            {text: '设备名称', width: 140, dataIndex: 'V_EQUNAME', align: 'center'},
            {text: '缺陷类型', width: 120, dataIndex: 'V_SOURCENAME', align: 'center'},
            {text: '缺陷内容', width: 300, dataIndex: 'V_DEFECTLIST', align: 'center'},
            {text: '缺陷日期', width: 140, dataIndex: 'D_DEFECTDATE', align: 'center'}
        ],
        tbar: [wxqxpanel]
    });

    var mfGridPanel = Ext.create('Ext.panel.Panel', {
        id: 'mfGridPanel',
        layout: 'border',
        region: 'east',
        width: '45%',
        split: true,
        border: false,
        title: '问题选择',
        items: [tab, ydefGPanel]
    });
    var topPanel = Ext.create('Ext.panel.Panel', {
        id: 'topPanel',
        layout: 'border',
        region: 'north',
        frame: true,
        split: true,
        height: '45%',
        border: false,
        items: [haveChoDef, mfGridPanel]
    });

    var wnpanel=Ext.create('Ext.panel.Panel',{
        region:'north',
        layout:'column',
        width:'100%',
        frame:true,
        items:[{
            xtype: 'combo',
            id: 'year',
            fieldLabel: '年份',
            editable: false,
            margin: '5 0 0 5',
            labelWidth: 80,
            labelAlign: 'right',
            width: 150,
            displayField: 'displayField',
            valueField: 'valueField',
            value: date.getFullYear(),
            store: yearStore,
            queryMode: 'local'
        },
            {
                xtype: 'combo',
                id: 'month',
                fieldLabel: '月份',
                editable: false,
                margin: '5 0 5 5',
                labelAlign: 'right',
                labelWidth: 80,
                width: 150,
                displayField: 'displayField',
                valueField: 'valueField',
                store: monthStore,
                value: date.getMonth() + 1,
                queryMode: 'local'
            },
            {
                xtype: 'textfield',
                id: 'jxnr',
                fieldLabel: '检修内容',
                labelAlign: 'right',
                labelWidth: 80,
                margin: '5 0 0 5'
            },
            {
                xtype: 'textfield',
                id: 'inper',
                fieldLabel: '录入人',
                labelAlign: 'right',
                labelWidth: 80,
                margin: '5 0 0 5',
                value: Ext.util.Cookies.get("v_personname2")
            },
            {xtype: 'button', text: '查询', margin: '10 0 5 10', icon: imgpath + '/search.png', handler: QueryMonth}]
    })

    //月计划审批完成查找
    var mGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'mGridPanel',
        region: 'center',
        frame: true,
        store: mgridStore,
        autoScroll: true,
        columnLines: true,
        columns: [
            {text: '序号', align: 'right', width: 50, xtype: 'rownumberer'},
            {text: '厂矿', align: 'left', width: 150, dataIndex: 'V_ORGNAME', renderer: CreateGridColumnTd},
            {text: '车间名称', align: 'left', width: 120, dataIndex: 'V_DEPTNAME', renderer: CreateGridColumnTd},
            {text: '专业', align: 'left', width: 120, dataIndex: 'V_REPAIRMAJOR_CODE', renderer: CreateGridColumnTd},
            {text: '设备名称', align: 'left', width: 200, dataIndex: 'V_EQUNAME', renderer: CreateGridColumnTd},
            {text: '检修内容', align: 'left', width: 300, dataIndex: 'V_CONTENT', renderer: CreateGridColumnTd},
            {
                text: '计划停机日期', align: 'right', width: 160, dataIndex: 'V_STARTTIME',
                renderer: rendererTime
            },
            {
                text: '计划竣工日期', align: 'right', width: 160, dataIndex: 'V_ENDTIME',
                renderer: rendererTime
            },
            {text: '计划工期（小时）', align: 'right', width: 100, dataIndex: 'V_HOUR', renderer: CreateGridColumnTd}],
        listeners: {
            itemClick: OnGridClick
        }
    });

    var wwpanel=Ext.create('Ext.panel.Panel',{
        title: '月计划',
        layout:'border',
        region:'west',
        width: '55%',
        height: '100%',
        frame:true,
        items:[wnpanel,mGridPanel]
    })

    var ccgrid = Ext.create('Ext.grid.Panel', {
        title: '月计划缺陷',
        id: 'ccgrid',
        region: 'center',
        store: mdgridStore,
        autoScroll: true,
        columnLines: true,
        selType: 'checkboxmodel',
        tbar: [{xtype: 'button', text: '选择', margin: '10 0 5 10', icon: imgpath + '/edit.png', handler: AddMonth}],
        columns: [{text: 'WBS编码', width: 140, dataIndex: 'WBSCODE', align: 'center'},
            {text: 'WBS名称', width: 140, dataIndex: 'WBSNAME', align: 'center'},
            {text: '设备名称', width: 140, dataIndex: 'V_EQUNAME', align: 'center'},
            {text: '缺陷类型', width: 120, dataIndex: 'V_SOURCENAME', align: 'center'},
            {text: '缺陷内容', width: 300, dataIndex: 'V_DEFECTLIST', align: 'center'},
            {text: '缺陷日期', width: 140, dataIndex: 'D_DEFECTDATE', align: 'center'}]
    });

    var cpanel = Ext.create('Ext.panel.Panel', {
        region: 'center',
        layout: 'border',
        frame: true,
        width: '100%',
        items: [ccgrid, wwpanel]
    })

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [topPanel, cpanel]
    });

    Ext.data.StoreManager.lookup('qxlxStore').on('load', function () {
        Ext.getCmp('qxlx').select(Ext.data.StoreManager.lookup('qxlxStore').getAt(0))
        wxqxLoad();
    });

    Ext.data.StoreManager.lookup('bjqxlxStore').on('load', function () {
        Ext.getCmp('bjqxlx').select(Ext.data.StoreManager.lookup('bjqxlxStore').getAt(0))
    })

    Ext.getCmp('qxlx').on('select', function () {
        wxqxLoad();
    })

    PageLoad();

});

//页面加载
function PageLoad() {
    //查询审批完成月计划
    QueryMonth();
    //查询已选择的缺陷
    QueryCDefect();
    //查询未处理缺陷
    wxqxLoad();
}

function QueryMonth() {
    Ext.data.StoreManager.lookup('mgridStore').load({
        params: {
            V_V_YEAR: Ext.getCmp('year').getValue(),
            V_V_MONTH: Ext.getCmp('month').getValue(),
            V_V_JXNR: Ext.getCmp('jxnr').getValue(),
            V_V_PERCODE: Ext.util.Cookies.get("v_personcode"),
            V_V_PERNAME: Ext.getCmp('inper').getValue()
        }
    })
}

function QueryCDefect() {
    Ext.data.StoreManager.lookup('hChoGridStore').load({
        params: {
            V_V_WEEK_GUID: WEEKGUID
        }
    });
}

function wxqxLoad() {
    if (defectType == 'bjxz') {
        Ext.data.StoreManager.lookup('wxqxGridStore').load({
            params: {
                V_V_QXLX: Ext.getCmp('bjqxlx').getValue(),
                V_V_PERCODE: Ext.util.Cookies.get('v_personcode')
            }
        });
    } else {
        Ext.data.StoreManager.lookup('wxqxGridStore').load({
            params: {
                V_V_QXLX: Ext.getCmp('qxlx').getValue(),
                V_V_PERCODE: Ext.util.Cookies.get('v_personcode')
            }
        });
    }
}

function OnGridClick(s, record) {
    MonthGuid = record.data.V_GUID;
    QueryMonthDefect();
}

function QueryMonthDefect() {
    Ext.data.StoreManager.lookup('mdgridStore').load({
        params: {
            V_V_MONTHGUID: MonthGuid,
            V_V_WEEK_GUID: WEEKGUID
        }
    });
}

function AddMonth() {
    var defitem = Ext.getCmp("ccgrid").getSelectionModel().getSelection();
    if (defitem.length <= 0) {
        alert("请选择至少一条缺陷");
        return false;
    }
    var num = 0;
    for (var i = 0; i < defitem.length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'dxfile/PM_DEFECTTOWORKORDER_SETMW',
            type: 'ajax',
            method: 'POST',
            async: false,
            params: {
                V_V_DEFECTGUID: defitem[i].data.V_GUID,
                V_V_MONTHGUID: MonthGuid,
                V_V_WEEKGUID: WEEKGUID,
                V_V_PERCODE: Ext.util.Cookies.get('v_personcode')
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);//后台返回的值
                num++;
                if (resp.V_INFO != 'SUCCESS') {
                    alert(resp.V_INFO);
                }
            }
        });
        if (num == defitem.length) {
            QueryCDefect();
            QueryMonthDefect();
        }
    }
}

//已选中关联周计划缺陷删除
function delCorDefect(defGuid) {
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PM_DEFECTTOWEEK_DEL',
        type: 'ajax',
        method: 'POST',
        async: false,
        params: {
            V_V_WEEKGUID: WEEKGUID,
            DEF_GUID: defGuid,
            V_V_PERCODE: Ext.util.Cookies.get("v_personcode")
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);//后台返回的值
            if (data.RET == 'SUCCESS') {
                QueryCDefect();
            }
        }
    });

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

function turnPage() {
    if (Ext.data.StoreManager.lookup('hChoGridStore').data.items.length == 0) {
        alert('请添加周计划缺陷！');
        return;
    }
    var EquCode = Ext.data.StoreManager.lookup('hChoGridStore').data.items[0].data.V_EQUCODE;
    var EquName = Ext.data.StoreManager.lookup('hChoGridStore').data.items[0].data.V_EQUNAME;
    var EquTypeCode = Ext.data.StoreManager.lookup('hChoGridStore').data.items[0].data.V_EQUTYPECODE;
    var EquTypeName = Ext.data.StoreManager.lookup('hChoGridStore').data.items[0].data.V_EQUTYPENAME;
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PM_WEEK_PLAN_CHECK_M',
        type: 'ajax',
        method: 'POST',
        async: false,
        params: {
            V_V_WEEKGUID: WEEKGUID
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);//后台返回的值
            if (resp.V_INFO == 'SUCCESS') {
                var owidth = window.document.body.offsetWidth - 200;
                var oheight = window.document.body.offsetHeight - 100;
                window.open(AppUrl + "page/PM_03010315/index.html?V_WEEKPLAN_GUID=" + WEEKGUID + '&startUpTime=' + startUpTime
                    + '&endUpTime=' + endUpTime + "&YEAR=" + YEAR + '&MONTH=' + MONTH + '&WEEK=' + WEEK + '&V_EQUCODE=' + EquCode
                    + '&V_EQUNAME=' + EquName + '&V_EQUTYPECODE=' + EquTypeCode + '&V_EQUTYPENAME=' + EquTypeName, '', '_blank', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

            } else {
                Ext.MessageBox.show({
                    title: '提示',
                    msg: resp.V_INFO,
                    buttons: Ext.MessageBox.YESNO,
                    fn: function (btn) {
                        if (btn == "yes") {
                            var owidth = window.document.body.offsetWidth - 200;
                            var oheight = window.document.body.offsetHeight - 100;
                            window.open(AppUrl + "page/PM_03010315/index.html?V_WEEKPLAN_GUID=" + WEEKGUID + '&startUpTime=' + startUpTime
                                + '&endUpTime=' + endUpTime + "&YEAR=" + YEAR + '&MONTH=' + MONTH + '&WEEK=' + WEEK + '&V_EQUCODE=' + EquCode
                                + '&V_EQUNAME=' + EquName + '&V_EQUTYPECODE=' + EquTypeCode + '&V_EQUTYPENAME=' + EquTypeName, '', '_blank', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

                        }
                        if (btn == "no") {
                            return;
                        }
                    }
                });
            }
        }
    });

}

//保存选中缺陷加入月计划关联
function SaveWxQx() {
    var snum = 0;
    var qxDdefect = Ext.getCmp('qxAdd').getSelectionModel().getSelection();
    for (var i = 0; i < qxDdefect.length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'dxfile/PM_DEFECTTOWORKORDER_SETDW',
            method: 'POST',
            async: false,
            params: {
                V_V_DEFECTGUID: qxDdefect[i].data.V_GUID,
                V_V_WEEKGUID: WEEKGUID,
                V_V_PERCODE: Ext.util.Cookies.get('v_personcode')
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                snum++;
                if (resp.V_INFO != "SUCCESS") {
                    alert(resp.V_INFO)
                }
            }
        });
    }
    if (snum == qxDdefect.length) {
        wxqxLoad();
        QueryCDefect();
    }
}

function retClose() {
    window.close();
    window.opener.query();
}

function delCorDef(value, metaDate, record) {
    return '<a onclick="delCorDefect(\'' + record.data.V_GUID + '\')">' + '删除' + '</a>';
}

