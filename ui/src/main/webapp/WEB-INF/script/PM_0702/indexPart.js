Ext.onReady(function () {

    var parttypeStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'parttypeStore',
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

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 50,
        autoLoad: false,
        fields: ['D_DEFECTDATE', 'V_DEFECTLIST', 'V_EQUNAME',
            'V_EQUSITE', 'V_DEPTNAME', 'V_PERNAME', 'V_IDEA',
            'V_STATENAME', 'V_SOURCENAME', 'V_SOURCEID',
            'D_INDATE', 'V_PERCODE', 'V_GUID', 'V_STATECODE',
            'V_STATECOLOR', 'V_ORDERID', 'V_EQUTYPECODE', 'V_SOURCECODE',
            'D_BE_SJ', 'D_EN_SJ', 'V_SOURCE_GRADE'],

        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'qx/PRO_DEFECT_PART_DATA_SEL',
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

    var inputPanel = Ext.create('Ext.Panel', {
        id: 'inputPanel',
        border: true,
        title: '待处理备件问题',
        titleAlign: 'center',
        frame: true,
        layout: 'column',
        defaults: {labelAlign: 'right', margin: '4,0,0,0'},
        items: [{
            id: 'parttype',
            xtype: 'combo',
            store: parttypeStore,
            editable: false,
            fieldLabel: '备件类型',
            labelWidth: 70,
            width: 180,
            displayField: 'V_SOURCENAME',
            valueField: 'V_SOURCECODE',
            queryMode: 'local',
            baseCls: 'margin-bottom'
        },
            {
                xtype: 'button',
                text: '查询',
                handler: _selectOverhaulApply
            }]
    });

    var overhaulApplyPanel = Ext.create('Ext.grid.Panel', {
        id: 'overhaulApplyPanel',
        store: gridStore,
        frame: true,
        border: false,
        columnLines: true,
        columns: [{
            text: '序号',
            xtype: 'rownumberer',
            width: 50,
            sortable: false
        },{
            text : '生成工单',
            xtype : 'templatecolumn',
            id : 'foundview',
            width : 100,
            align : 'center',
            tpl : '<a href="#" >生成工单</a>'
        }, {
            text: '单位',
            dataIndex: 'V_DEPTNAME',
            align: 'center',
            width: 100,
            renderer: CreateGridColumnTd
        }, {
            text: '备件状态',
            dataIndex: 'V_STATENAME',
            align: 'center',
            width: 100,
            renderer: CreateGridColumnTd
        }, {
            text: '备件类型',
            dataIndex: 'V_SOURCENAME',
            align: 'center',
            width: 100,
            renderer: CreateGridColumnTd
        }, {
            text: '创建时间',
            dataIndex: 'D_DEFECTDATE',
            align: 'center',
            width: 200,
            renderer: CreateGridColumnTime
        }, {
            text: '问题明细',
            dataIndex: 'V_DEFECTLIST',
            align: 'center',
            width: 700,
            renderer: CreateGridColumnTd
        }, {
            text: '负责人',
            dataIndex: 'V_PERNAME',
            align: 'center',
            width: 100,
            renderer: CreateGridColumnTd
        }, {
            text: '处理意见',
            dataIndex: 'V_IDEA',
            align: 'center',
            renderer: CreateGridColumnTd
        }],
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

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
            items: [inputPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [overhaulApplyPanel]
        }]
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_V_TYPE: Ext.getCmp("parttype").getValue(),
            V_V_INPER: Ext.util.Cookies.get('v_personcode'),
            V_V_STATE: '10',
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    });

    _init()

    Ext.StoreManager.lookup('parttypeStore').on('load', function () {
        Ext.getCmp('parttype').store.insert(0, {'V_SOURCECODE': '%', 'V_SOURCENAME': '全部'});
        Ext.getCmp('parttype').select(Ext.StoreManager.lookup('parttypeStore').getAt(0))
        _selectOverhaulApply();
    })

    Ext.getCmp('foundview').on('click',function(view, rowIndex, colIndex){
        var id = Ext.getCmp('overhaulApplyPanel').getStore().getAt(colIndex).data.V_GUID;
        var owidth = window.document.body.offsetWidth - 500;
        var oheight = window.document.body.offsetHeight - 500;
        window.open(AppUrl + 'page/No41050601/index_aq.html?V_GUID=' + id  , '备件问题工单创建', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
    });
});

function _init() {
    Ext.getBody().unmask();//去除页面笼罩
    Ext.StoreManager.lookup('parttypeStore').load();
}


function _selectOverhaulApply() {
    Ext.getCmp('page').store.currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore').proxy.extraParams = {
        V_V_TYPE: Ext.getCmp("parttype").getValue(),
        V_V_INPER: Ext.util.Cookies.get('v_personcode'),
        V_V_STATE: '10',
        V_V_PAGE: Ext.getCmp('page').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
    };
    Ext.data.StoreManager.lookup('gridStore').load();
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

function CreateGridColumnTime(value, metaData, record, rowIndex, colIndex, store) {
    var time = value.split('.')[0];
    return time;
}




