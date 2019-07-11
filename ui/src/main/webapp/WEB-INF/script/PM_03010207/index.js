Ext.onReady(function () {
    Ext.QuickTips.init();
    var dt = new Date();
    var thisYear = dt.getFullYear();
    var years = [];
    for (var i = 2012; i <= thisYear + 1; i++)
        years.push({
            displayField: i,
            valueField: i
        });
    var months = [];
    for (var i = 1; i <= 12; i++)
        months.push({
            displayField: i,
            valueField: i
        });

    var ckStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'ckStore',
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
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE: '[基层单位]'
            }
        }
    });

    var zyqStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyqStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_03/PRO_BASE_DEPT_VIEW_ROLE_PLAN',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var gridStore = Ext.create('Ext.data.Store', {
        //pageSize : 15,
        id: 'gridStore',
        autoLoad: false,
        fields: [
            'V_STATE_LOCK',
            'D_DATE_LOCK',
            'V_GUID',
            'V_YEAR',
            'V_MONTH',
            'V_ORGCODE',
            'V_ORGNAME',
            'V_DEPTCODE',
            'V_DEPTNAME',
            'V_EQUTYPECODE',
            'V_EQUTYPENAME',
            'V_EQUCODE',
            'V_EQUNAME',
            'V_REPAIRMAJOR_CODE',
            'V_CONTENT',
            'V_STARTTIME',
            'V_ENDTIME',
            'V_HOUR',
            'V_INDATE',
            'V_INPER',
            'V_INPERNAME',
            'V_BZ',
            'V_FLOWCODE',
            'V_FLOWORDER',
            'V_OTHERPLAN_GUID',
            'V_JHMX_GUID',
            'V_OTHERPLAN_TYPE',
            'V_FLOWTYPE',
            'V_REPAIRDEPT_CODE',
            'V_REPAIRDEPT_NAME',
            'V_REPAIR_PERNAME',
            'V_MONTHID',
            'V_STATE'
        ],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_03/PRO_PM_PLAN_LOCKING_M_VIEW',
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
        id: 'panel',
        region: 'north',
        layout: 'column',
        frame: true,
        width: '100%',
        default:{labelAlign: 'right'},
        items: [{
            id: 'year',
            store: Ext.create("Ext.data.Store", {
                fields: ['displayField', 'valueField'],
                data: years,
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'json'
                    }
                }
            }),
            fieldLabel: '计划年份',
            labelAlign: 'right',
            labelWidth: 60,
            width: 210,
            xtype: 'combo',
            value: new Date().getFullYear(),
            style: ' margin: 5px 0px 5px 5px',
            editable: false,
            displayField: 'displayField',
            valueField: 'valueField'
        }, {
            id: 'month',
            store: Ext.create("Ext.data.Store", {
                fields: ['displayField', 'valueField'],
                data: months,
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'json'
                    }
                }
            }),
            xtype: 'combo',
            fieldLabel: '计划月份',
            labelAlign: 'left',
            labelWidth: 60,
            width: 210,
            style: ' margin: 5px 0px 5px 5px',
            value: (new Date().getMonth() + 2),
            editable: false,
            displayField: 'displayField',
            valueField: 'valueField'
        }, {
            xtype: 'combo',
            id: "ck",
            store: ckStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '计划厂矿',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            labelWidth: 60,
            width: 210,
            style: ' margin: 5px 0px 5px 5px',
            labelAlign: 'right'
        }, {
            xtype: 'combo',
            id: "zyq",
            store: zyqStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '作业区',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            labelWidth: 60,
            width: 210,
            style: ' margin: 5px 0px 5px 5px',
            labelAlign: 'right'
        }, {
            xtype: 'textfield',
            id: 'seltext',
            fieldLabel: '检修内容',
            style: ' margin: 5px 0px 5px 5px',
            labelAlign: 'right',
            labelWidth: 60,
            width: 210
        }, {
            xtype: 'button',
            text: '查询',
            icon: imgpath + '/search.png',
            width: 60,
            style: ' margin: 5px 0px 5px 5px',
            handler: function () {
                queryGrid();
            }
        }, {
            xtype: 'button',
            text: '导出Excel',
            icon: imgpath + '/excel.gif',
            style: ' margin: 5px 0px 5px 5px',
            listeners: {click: OnButtonExcelClicked}
        },{
            xtype: 'displayfield',
            fieldLabel: '截止时间',
            id: 'endtime',
            style: ' margin: 5px 0px 5px 5px',
            labelAlign: 'right',
            labelWidth: 60,
            width: 210
        }, {
            xtype: 'button',
            text: '设置',
            icon: imgpath + '/cog.png',
            style: ' margin: 5px 0px 5px 5px',
            listeners: {click: OnButtonSetupClicked}
        }]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        region: 'center',
        store: gridStore,
        columnLines: true,
        autoScroll: true,
        selType: 'checkboxmodel',
        height: 400,
        columns: [{xtype: 'rownumberer', width: 30, sortable: false},
            {text: '超时步骤', width: 110, dataIndex: 'V_STATE_LOCK', align: 'center', renderer: atleft},
            {
                text: '上报时间',
                width: 150,
                dataIndex: 'D_DATE_LOCK',
                align: 'center',
                renderer: atleft,
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
            },
            {text: '计划单位', width: 160, dataIndex: 'V_DEPTNAME', align: 'center', renderer: atleft},
            {text: '设备名称', width: 160, dataIndex: 'V_EQUNAME', align: 'center', renderer: atleft},
            {text: '检修内容', width: 300, dataIndex: 'V_CONTENT', align: 'center', renderer: atleft},
            {
                text: '计划开工时间',
                width: 150,
                dataIndex: 'V_STARTTIME',
                align: 'center',
                renderer: atleft,
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
            },
            {
                text: '计划竣工时间',
                width: 150,
                dataIndex: 'V_ENDTIME',
                align: 'center',
                renderer: atleft,
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
            },
            {text: '计划工时(小时)', width: 150, dataIndex: 'V_HOUR', align: 'center', renderer: atleft},
            {text: '施工单位', width: 170, dataIndex: 'V_REPAIRDEPT_NAME', align: 'center', renderer: atleft},
            {text: '检修负责人', width: 150, dataIndex: 'V_REPAIR_PERNAME', align: 'center', renderer: atleft}]
    });

    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel, grid]
    });

    Ext.data.StoreManager.lookup('ckStore').on('load', function () {
        Ext.getCmp("ck").select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE: '[主体作业区]'
            }
        });
    });

    Ext.data.StoreManager.lookup('zyqStore').on('load', function () {
        Ext.getCmp("zyq").select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
        queryGrid();
    });

    Ext.getCmp('ck').on('select', function () {
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE: '[主体作业区]'
            }
        });
    });

    Ext.getCmp('zyq').on('select', function () {
        queryGrid();
    });

    Ext.getCmp('year').on('select', function () {
        queryGrid();
    });
    Ext.getCmp('month').on('select', function () {
        queryGrid();
    });

    Ext.data.StoreManager.lookup('gridStore').on('load', function () {
        var time = Ext.data.StoreManager.get('gridStore').proxy.reader.rawData.V_D_DATE_E;
        Ext.getCmp('endtime').setValue(time);
    });

});

function queryGrid() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_I_YEAR: Ext.getCmp('year').getValue(),
            V_I_MONTH: Ext.getCmp('month').getValue(),
            V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
            V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue(),
            V_V_CONTENT: Ext.getCmp('seltext').getValue()
        }
    });
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
//导出Excel
function OnButtonExcelClicked() {
    document.location.href = AppUrl + 'excel/MSDGL_EXCEL?V_I_YEAR=' + Ext.getCmp('year').getValue() +
        '&V_I_MONTH=' + Ext.getCmp('month').getValue() +
        '&V_V_DEPTCODE=' + encodeURI(Ext.getCmp('ck').getValue()) +
        '&V_V_DEPTNEXTCODE=' + encodeURI(Ext.getCmp('zyq').getValue()) +
        '&V_V_CONTENT=' + Ext.getCmp('seltext').getValue();
}
//设置
function OnButtonSetupClicked() {
    var year = Ext.getCmp('year').getValue();
    var month = Ext.getCmp('month').getValue();
    window.open(AppUrl + 'page/PM_0301011001/index.html?V_YEAR=' + year + '&V_MONTH=' + month + '&V_WEEK=0' +
        '&V_TYPE=M'+'&V_ORGCODE='+Ext.getCmp('ck').getValue(), '', "dialogWidth=460px;dialogHeight=280px");
}