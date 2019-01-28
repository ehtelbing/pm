var V_OTHERPLAN_GUID = '';
if (location.href.split('?')[1] != undefined) {
    V_OTHERPLAN_GUID = Ext.urlDecode(location.href.split('?')[1]).monthGuid;
}
//页面表格信息加载
var gridStore = Ext.create('Ext.data.Store', {
    id: 'gridStore',
    pageSize: 25,
    autoLoad: false,
    fields: ['I_ID',
        'V_WEEKPLAN_GUID',
        'V_YEAR',
        'V_MONTH',
        'V_WEEK',
        'V_ORGCODE',                          //厂矿
        'V_ORGNAME',
        'V_DEPTCODE',                         //作业区
        'V_DEPTNAME',
        'V_EQUTYPECODE',                     //设备类型
        'V_EQUTYPENAME',
        'V_EQUCODE',
        'V_EQUNAME',
        'V_REPAIRMAJOR_CODE',
        'V_CONTENT',
        'V_STARTTIME',
        'V_ENDTIME',
        'V_HOUR',
        'V_REPAIRDEPT_CODE',
        'V_MANNAME',
        'V_TEL',
        'V_INDATE',
        'V_INPER',
        'V_PERSONNAME',
        'V_FLOWCODE',
        'V_JXMX_CODE',
        'V_JXGX_CODE',
        'V_MONTHPLAN_CODE',
        'V_WEEKID',
        'V_STATUSNAME', 'V_GUID','V_STATE','V_STATENAME', 'V_INPERNAME', 'V_FLOWNAME',
        'V_MAIN_DEFECT',
        'V_EXPECT_AGE',
        'V_REPAIR_PER','V_SGWAY','V_SGWAYNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'cxy/PRO_PM_03_PLAN_WEEK_BY_MONTHGUID',//PRO_PM_03_PLAN_WEEK_VIEW
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

var gridPanel = Ext.create('Ext.grid.Panel', {
    id: 'gridPanel',
    region: 'center',
    border: false,
    store: 'gridStore',
    columnLines: true,
    selType: 'checkboxmodel',
    columns: [
        {text: '序号', align: 'center', width: 50, xtype: 'rownumberer'},
        {text: '计划状态', align: 'center', width: 100, dataIndex: 'V_STATE',hidden:true},
        {text: '计划状态', align: 'center', width: 100, dataIndex: 'V_STATENAME'},
        // {
        //         //     text: '详细',
        //         //     dataIndex: 'V_ORDERID',
        //         //     width: 55,
        //         //     align: 'center',
        //         //     renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
        //         //         return '<a href="#" onclick="_preViewProcess(\'' + record.data.V_GUID + '\')">' + '详细' + '</a>';
        //         //     }
        //         // },
        {text: '厂矿', align: 'center', width: 120, dataIndex: 'V_ORGNAME'},
        {text: '车间名称', align: 'center', width: 150, dataIndex: 'V_DEPTNAME'},
        {text: '专业', align: 'center', width: 100, dataIndex: 'V_REPAIRMAJOR_CODE'},
        {text: '设备名称', align: 'center', width: 180, dataIndex: 'V_EQUNAME'},
        {text: '计划内容', align: 'center', width: 280, dataIndex: 'V_CONTENT'},
        {text: '检修模型', align: 'center', width: 100, dataIndex: 'V_EQUTYPENAME'},
        {
            text: '计划停机日期',
            align: 'center',
            width: 150,
            dataIndex: 'V_STARTTIME',
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                metaData.style = "text-align:center;";
                return value;
            }
            //renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')
        },
        {
            text: '计划竣工日期',
            align: 'center',
            width: 150,
            dataIndex: 'V_ENDTIME',
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                metaData.style = "text-align:center;";
                return value;
            }
            //renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')
        },
        {text: '计划工期（小时）', align: 'center', width: 150, dataIndex: 'V_HOUR'},
        {text: '录入人', align: 'center', width: 100, dataIndex: 'V_INPERNAME'},

        {text: '主要缺陷', align: 'center', width: 100, dataIndex: 'V_MAIN_DEFECT'},
        {text: '预计寿命', align: 'center', width: 100, dataIndex: 'V_EXPECT_AGE'},
        {text: '维修人数', align: 'center', width: 100, dataIndex: 'V_REPAIR_PER'},
        {text:'施工方式',align:'center',width:'70',dataIndex:'V_SGWAYNAME'},
        {
            text: '录入时间',
            align: 'center',
            width: 150,
            dataIndex: 'V_INDATE',
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                metaData.style = "text-align:center;";
                return value;
            }
            //renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')
        }/*,
        {text: '流程步骤', align: 'center', width: 150, dataIndex: 'V_FLOWNAME'},*/
    ]
    // ,
    // bbar: ["->",
    //     {
    //         id: 'page',
    //         xtype: 'pagingtoolbar',
    //         store: gridStore,
    //         width: '100%',
    //         dock: 'bottom',
    //         displayInfo: true,
    //         displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
    //         emptyMsg: '没有记录'
    //     }
    // ]
});
Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [gridPanel]
    });
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_OTHERPLAN_GUID:V_OTHERPLAN_GUID

        }
    });

});



