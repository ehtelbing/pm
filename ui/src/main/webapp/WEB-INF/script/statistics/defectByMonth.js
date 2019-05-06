Ext.onReady(function () {
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: true,
        fields: ['V_YEAR', 'V_ORGCODE', 'V_ORGNAME', 'M1_SNUM', 'M1_SGNUM', 'M1_QTNUM', 'M2_SNUM',
            'M2_SGNUM', 'M2_QTNUM', 'M3_SNUM', 'M3_SGNUM', 'M3_QTNUM', 'M4_SNUM', 'M4_SGNUM', 'M4_QTNUM', 'M5_SNUM', 'M5_SGNUM', 'M5_QTNUM',
            'M6_SNUM', 'M6_SGNUM', 'M6_QTNUM', 'M7_SNUM', 'M7_SGNUM', 'M7_QTNUM', 'M8_SNUM', 'M8_SGNUM', 'M8_QTNUM', 'M9_SNUM', 'M9_SGNUM',
            'M9_QTNUM', 'M10_SNUM', 'M10_SGNUM', 'M10_QTNUM', 'M11_SNUM', 'M11_SGNUM', 'M11_QTNUM', 'M12_SNUM', 'M12_SGNUM', 'M12_QTNUM'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PM_07_DEFECT_STAT_N',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },extraParams:{
                V_V_YEAR:new Date().getFullYear(),
                V_V_PERCODE:Ext.util.Cookies.get('v_personcode')
            }
        }
    });


    var grid = Ext.create('Ext.grid.Panel', {
        store: gridStore,
        id: 'grid',
        frame: true,
        region: 'center',
        columnLines: true,
        autoScroll: true,
        columns: [{xtype: 'rownumberer', text: '序号', width: 40, align: 'center'},
            {text: '单位名称', dataIndex: 'V_ORGNAME', align: 'center', width: 150, renderer: Atleft},
            {
                header: '1月', align: 'center', width: 300,
                columns: [{text: '缺陷总数', dataIndex: 'M1_SNUM', align: 'center', width: 100, renderer: AtRight},
                    {text: '手工缺陷', dataIndex: 'M1_SGNUM', align: 'center', width: 100, renderer: AtRight},
                    {text: '其它缺陷', dataIndex: 'M1_QTNUM', align: 'center', width: 100, renderer: AtRight}]
            },
            {
                header: '2月', align: 'center', width: 300,
                columns: [{text: '缺陷总数', dataIndex: 'M2_SNUM', align: 'center', width: 100, renderer: AtRight},
                    {text: '手工缺陷', dataIndex: 'M2_SGNUM', align: 'center', width: 100, renderer: AtRight},
                    {text: '其它缺陷', dataIndex: 'M2_QTNUM', align: 'center', width: 100, renderer: AtRight}]
            },
            {
                header: '3月', align: 'center', width: 300,
                columns: [{text: '缺陷总数', dataIndex: 'M3_SNUM', align: 'center', width: 100, renderer: AtRight},
                    {text: '手工缺陷', dataIndex: 'M3_SGNUM', align: 'center', width: 100, renderer: AtRight},
                    {text: '其它缺陷', dataIndex: 'M3_QTNUM', align: 'center', width: 100, renderer: AtRight}]
            },
            {
                header: '4月', align: 'center', width: 300,
                columns: [{text: '缺陷总数', dataIndex: 'M4_SNUM', align: 'center', width: 100, renderer: AtRight},
                    {text: '手工缺陷', dataIndex: 'M4_SGNUM', align: 'center', width: 100, renderer: AtRight},
                    {text: '其它缺陷', dataIndex: 'M4_QTNUM', align: 'center', width: 100, renderer: AtRight}]
            },
            {
                header: '5月', align: 'center', width: 300,
                columns: [{text: '缺陷总数', dataIndex: 'M5_SNUM', align: 'center', width: 100, renderer: AtRight},
                    {text: '手工缺陷', dataIndex: 'M5_SGNUM', align: 'center', width: 100, renderer: AtRight},
                    {text: '其它缺陷', dataIndex: 'M5_QTNUM', align: 'center', width: 100, renderer: AtRight}]
            },
            {
                header: '6月', align: 'center', width: 300,
                columns: [{text: '缺陷总数', dataIndex: 'M6_SNUM', align: 'center', width: 100, renderer: AtRight},
                    {text: '手工缺陷', dataIndex: 'M6_SGNUM', align: 'center', width: 100, renderer: AtRight},
                    {text: '其它缺陷', dataIndex: 'M6_QTNUM', align: 'center', width: 100, renderer: AtRight}]
            },
            {
                header: '7月', align: 'center', width: 300,
                columns: [{text: '缺陷总数', dataIndex: 'M7_SNUM', align: 'center', width: 100, renderer: AtRight},
                    {text: '手工缺陷', dataIndex: 'M7_SGNUM', align: 'center', width: 100, renderer: AtRight},
                    {text: '其它缺陷', dataIndex: 'M7_QTNUM', align: 'center', width: 100, renderer: AtRight}]
            },
            {
                header: '8月', align: 'center', width: 300,
                columns: [{text: '缺陷总数', dataIndex: 'M8_SNUM', align: 'center', width: 100, renderer: AtRight},
                    {text: '手工缺陷', dataIndex: 'M8_SGNUM', align: 'center', width: 100, renderer: AtRight},
                    {text: '其它缺陷', dataIndex: 'M8_QTNUM', align: 'center', width: 100, renderer: AtRight}]
            },
            {
                header: '9月', align: 'center', width: 300,
                columns: [{text: '缺陷总数', dataIndex: 'M9_SNUM', align: 'center', width: 100, renderer: AtRight},
                    {text: '手工缺陷', dataIndex: 'M9_SGNUM', align: 'center', width: 100, renderer: AtRight},
                    {text: '其它缺陷', dataIndex: 'M9_QTNUM', align: 'center', width: 100, renderer: AtRight}]
            },
            {
                header: '10月', align: 'center', width: 300,
                columns: [{text: '缺陷总数', dataIndex: 'M10_SNUM', align: 'center', width: 100, renderer: AtRight},
                    {text: '手工缺陷', dataIndex: 'M10_SGNUM', align: 'center', width: 100, renderer: AtRight},
                    {text: '其它缺陷', dataIndex: 'M10_QTNUM', align: 'center', width: 100, renderer: AtRight}]
            },
            {
                header: '11月', align: 'center', width: 300,
                columns: [{text: '缺陷总数', dataIndex: 'M11_SNUM', align: 'center', width: 100, renderer: AtRight},
                    {text: '手工缺陷', dataIndex: 'M11_SGNUM', align: 'center', width: 100, renderer: AtRight},
                    {text: '其它缺陷', dataIndex: 'M11_QTNUM', align: 'center', width: 100, renderer: AtRight}]
            },
            {
                header: '12月', align: 'center', width: 300,
                columns: [{text: '缺陷总数', dataIndex: 'M12_SNUM', align: 'center', width: 100, renderer: AtRight},
                    {text: '手工缺陷', dataIndex: 'M12_SGNUM', align: 'center', width: 100, renderer: AtRight},
                    {text: '其它缺陷', dataIndex: 'M12_QTNUM', align: 'center', width: 100, renderer: AtRight}]
            }]
    });


    Ext.create('Ext.container.Viewport', {
        id: 'main',
        layout: 'border',
        items: [ grid]
    });

});

function Atleft(value, metaData) {
    metaData.style = "text-align:left;";
    return value;
}

function AtRight(value, metaData) {
    metaData.style = "text-align:right;";
    return value;
}

