var V_V_GUID = '';
if (location.href.split('?')[1] != null) {
    V_V_GUID = Ext.urlDecode(location.href.split('?')[1]).V_V_GUID;
}
Ext.onReady(function () {

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: false,
        fields: ['D_DEFECTDATE', 'V_DEFECTLIST', 'V_EQUNAME',
            'V_EQUSITE', 'V_DEPTNAME', 'V_PERNAME', 'V_IDEA',
            'V_STATENAME', 'V_SOURCENAME', 'V_SOURCEID',
            'D_INDATE', 'V_PERCODE', 'V_GUID', 'V_STATECODE',
            'V_STATECOLOR', 'V_ORDERID'],

        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dx/PRO_MONTH_WEEK_DEFECT_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
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
        },
            {
                text: '缺陷日期',
                dataIndex: 'D_INDATE',
                align: 'center',
                width: 200,
                renderer: CreateGridColumnTd
            }, {
                text: '缺陷明细',
                dataIndex: 'V_DEFECTLIST',
                align: 'center',
                width: 300,
                renderer: CreateGridColumnTd
            }, {
                text: '设备',
                dataIndex: 'V_EQUNAME',
                align: 'center',
                width: 170,
                renderer: CreateGridColumnTd
            }, {
                text: '设备位置',
                dataIndex: 'V_EQUSITE',
                align: 'center',
                width: 250,
                renderer: CreateGridColumnTd
            }, {
                text: '单位',
                dataIndex: 'V_DEPTNAME',
                align: 'center',
                width: 100,
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
            }, {
                text: '缺陷状态',
                dataIndex: 'V_STATENAME',
                align: 'center',
                width: 100,
                renderer: CreateGridColumnTd
            }, {
                text: '缺陷来源',
                dataIndex: 'V_SOURCENAME',
                align: 'center',
                width: 100,
                renderer: CreateGridColumnTd
            }]
    });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [gridPanel]
    });

    OnPageLoad();

})

function OnPageLoad(){
    Ext.data.StoreManager.lookup('gridStore').load({
        params:{
            V_V_GUID:V_V_GUID
        }
    })
}

function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
