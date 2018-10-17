var V_V_PLANTCODE = Ext.util.Cookies.get('v_orgCode');//厂矿编码
var V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');//作业区编码
var V_DEPTNAME = Ext.util.Cookies.get('v_deptname2');//作业区名称

var V_V_DEPTCODE = '';
var A_EQUID = '';
var bjStoreLoad = false;
var deptStoreLoad = false;

Ext.onReady(function () {
    Ext.getBody().mask('<p>正在载入中...</p>');

    //作业区
    var deptStore = Ext.create('Ext.data.Store', {
        id: 'deptStore',
        autoLoad: true,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_12/PRO_BASE_DEPT_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'IS_V_DEPTCODE': V_V_PLANTCODE,
                'IS_V_DEPTTYPE': '[主体作业区]'
            }
        },
        listeners: {
            load: function (store, records) {

                Ext.getCmp('zyqName').setValue(V_DEPTCODE);
                deptStoreLoad = true;
                _init();
            }
        }

    });

    //备件描述Store
    var bjStore = Ext.create("Ext.data.Store", {
        id: 'bjStore',
        autoLoad: false,
        fields: ['BJ_ID', 'BJ_DESC'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'ml/PRO_RUN7117_BJLIST',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        },
        listeners: {
            load: function (store, records) {
                /* store.insert(0, {
                 'BJ_ID': '%',
                 'BJ_DESC': '全部'
                 });*/
                bjStoreLoad = true;
                Ext.getCmp('BJ_DESC').select(store.first());
                _init();
            }
        }
    });

    //备件运行Store
    var bjRunStore = Ext.create("Ext.data.Store", {
        id: 'bjRunStore',
        autoLoad: false,
        pageSize: 100,
        fields: ['BJ_ID', 'BJ_UNIQUE_CODE', 'MATERIALCODE', 'MATERIALNAME', 'EQU_DESC', 'SITE_DESC', 'CHANGEDATE',
            'ALERT_VALUE', 'CYCLE_DESC', 'CYCLE_UNIT','WARNING_VALUE'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'ml/PRO_RUN7117_BJWORKLIST',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            },
            extraParams: {}
        }
    });

    //菜单面板
    var tablePanel = Ext.create('Ext.panel.Panel', {
        id: 'tablePanel',
        region: 'north',
        layout: 'vbox',
        frame: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'zyqName',
                xtype: 'combo',
                store: deptStore,
                fieldLabel: '作业区',
                labelWidth: 80,
                width: 250,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectBJName();
                    }
                }
            }, {
                id: 'BJ_DESC',
                xtype: 'combo',
                store: bjStore,
                fieldLabel: '备件描述',
                labelWidth: 80,
                width: 750,
                displayField: 'BJ_DESC',
                valueField: 'BJ_ID',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '查询',
                style: ' margin: 5px 0px 5px 20px',
                icon: imgpath + '/search.png',
                handler: _selectInfo
            }, {
                xtype: 'button',
                text: '导出到Excel',
                handler: _exportExcel,
                style: ' margin: 5px 0px 5px 5px',
                icon: imgpath + '/excel.gif'

            }]
        }]

    });

    //显示面板
    var alertGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'alertGridPanel',
        store: bjRunStore,
        width: '100%',
        region: 'sourth',
        border: false,
        columnLines: true,
        columns: [/*{
         xtype: 'rownumberer',
         text: '序号',
         width: 40,
         align: 'center'
         }, */{
            text: '备件编号',
            dataIndex: 'BJ_ID',
            align: 'center',
            width: 80
        }, {
            text: '备件唯一编码',
            dataIndex: 'BJ_UNIQUE_CODE',
            align: 'center',
            width: 220,
            renderer: atleft
        }, {
            text: '物料编码',
            dataIndex: 'MATERIALCODE',
            align: 'center',
            width: 120,
            renderer: atright
        }, {
            text: '物资名称',
            dataIndex: 'MATERIALNAME',
            align: 'center',
            width: 220,
            renderer: atleft
        }, {
            text: '设备名称',
            dataIndex: 'EQU_DESC',
            align: 'center',
            width: 180,
            renderer: atleft
        }, {
            text: '设备位置',
            dataIndex: 'SITE_DESC',
            align: 'center',
            width: 120,
            renderer: atleft
            //  renderer:rendererTime
        }, {
            text: '作业时间',
            dataIndex: 'CHANGEDATE',
            align: 'center',
            width: 120,
            renderer: rendererTime
        }, {
            text: '报警值',
            dataIndex: 'ALERT_VALUE',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '预警值',
            dataIndex: 'WARNING_VALUE',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '周期计算单位',
            dataIndex: 'CYCLE_UNIT',
            align: 'center',
            width: 80,
            renderer: atright
        }],
        bbar: [{
            id: 'gpage',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            width: '100%',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: bjRunStore
        }]
    });


    //整体视图容器
    Ext.create('Ext.container.Viewport', {
        layout: {
            type: 'border',
            regionWeights: {
                west: -1,
                north: 1,
                south: 1,
                east: -1
            }
        },
        items: [{
            region: 'north',
            border: false,
            items: [tablePanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [alertGridPanel]
        }]

    });

    _init();

})
//初始化
function _init() {

    if (bjStoreLoad && deptStoreLoad) {
        Ext.getBody().unmask();//去除页面笼罩
    }
}

//查找设备
function _selectBJName() {

    var bjStore = Ext.data.StoreManager.lookup('bjStore');

    V_V_PLANTCODE = V_V_PLANTCODE;
    V_V_DEPTCODE = Ext.getCmp('zyqName').getValue();

    console.log(V_V_PLANTCODE + ';' + V_V_DEPTCODE);
    bjStore.proxy.extraParams = {
        V_V_PLANTCODE: V_V_PLANTCODE,
        V_V_DEPTCODE: V_V_DEPTCODE
    };
    bjStore.load();
};

//查询作业量列表
function _selectInfo() {

    V_V_PLANTCODE = V_V_PLANTCODE;
    V_V_DEPTCODE = Ext.getCmp('zyqName').getValue();
    V_V_BJ_ID = Ext.getCmp('BJ_DESC').getSubmitValue();

    var bjRunStore = Ext.data.StoreManager.lookup('bjRunStore');
    bjRunStore.proxy.extraParams = {
        V_V_DEPARTCODE: V_V_DEPTCODE,
        V_V_PLANTCODE: V_V_PLANTCODE,
        V_V_BJ_ID: V_V_BJ_ID
    };
    bjRunStore.load();

};

function rendererTime(value, metaData) {
    metaData.style = "text-align:left";
    return '<div data-qtip="' + value.substring(0, 10) + '" >' + value.substring(0, 10) + '</div>';
    // return '<div data-qtip="' + value.split('.0')[0] + '" >' + value.split('.0')[0] + '</div>';
};

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
};

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
};

//导出Excel
function _exportExcel() {
    document.location.href = AppUrl + 'ml/PRO_RUN7117_BJWORKLIST_EXCEL?V_V_DEPARTCODE=' + encodeURI(encodeURI(V_V_DEPTCODE)) +
    '&V_V_PLANTCODE=' + encodeURI(encodeURI(V_V_PLANTCODE)) + '&V_V_BJ_ID=' + encodeURI(encodeURI(V_V_BJ_ID));
}