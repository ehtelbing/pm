var monthguid="";
if(location.href.split('?')[1]!=undefined){
    monthguid=Ext.urlDecode(location.href.split('?')[1]).v_guid;
}

var gridStore=Ext.create('Ext.data.Store',{
   id:'gridStore',
    autoLoad:true,
    fields: ['I_ID',
        'V_GUID',
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
        'V_REPAIR_PER','V_SGWAY','V_SGWAYNAME','WORKORDERNUM'],
    proxy:{
        type:'ajax',
        url:AppUrl+'dxfile/PM_03_PLAN_MONTH_SEL_WEEKVIEW',
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            V_OTHERGRID: monthguid,
            V_TYPE:'MONTH'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }


});

var cp=Ext.create('Ext.grid.Panel',{
    id:'cp',
    region:'center',
    columnLines:true,
    autoScroll:true,
    store:gridStore,
    columns:[
        {text: '序号', align: 'center', width: 50, xtype: 'rownumberer'},
        {text: '计划状态', align: 'center', width: 100, dataIndex: 'V_STATE',hidden:true},
        {text: '计划状态', align: 'center', width: 100, dataIndex: 'V_STATENAME',renderer: left},
        // {
        //     text: '详细',
        //     dataIndex: 'V_ORDERID',
        //     width: 55,
        //     align: 'center',
        //     renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
        //         return '<a href="#" onclick="_preViewProcess(\'' + record.data.V_GUID + '\')">' + '详细' + '</a>';
        //     }
        // },
        {
            text: '关联工单数量',
            dataIndex: 'WORKORDERNUM',
            width: 150,
            align: 'center',
            renderer: left
        },
        {text: '厂矿', align: 'center', width: 100, dataIndex: 'V_ORGNAME',renderer: left},
        {text: '车间名称', align: 'center', width: 130, dataIndex: 'V_DEPTNAME',renderer: left},
        {text: '专业', align: 'center', width: 100, dataIndex: 'V_REPAIRMAJOR_CODE',renderer: left},
        {text: '设备名称', align: 'center', width: 150, dataIndex: 'V_EQUNAME',renderer: left},
        // {xtype: 'linebreakcolumn', text: '计划内容', align: 'center', width: 280, dataIndex: 'V_CONTENT'},
        {text: '检修模型', align: 'center', width: 100, dataIndex: 'V_EQUTYPENAME',renderer: left},
        {
            text: '计划停机日期',
            align: 'center',
            width: 120,
            dataIndex: 'V_STARTTIME',
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                metaData.style = "text-align:center;";
                return '<div data-qtip="' + value + '" >' + value + '</div>';
            }
            //renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')
        },
        {
            text: '计划竣工日期',
            align: 'center',
            width: 120,
            dataIndex: 'V_ENDTIME',
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                metaData.style = "text-align:center;";
                return '<div data-qtip="' + value + '" >' + value + '</div>';
            }
            //renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')
        },
        {text: '计划工期（小时）', align: 'center', width: 120, dataIndex: 'V_HOUR',renderer: left},
        {text: '录入人', align: 'center', width: 100, dataIndex: 'V_INPERNAME',renderer: left},

        {text: '主要缺陷', align: 'center', width: 100, dataIndex: 'V_MAIN_DEFECT',renderer: left},
        {text: '预计寿命', align: 'center', width: 100, dataIndex: 'V_EXPECT_AGE',renderer: left},
        {text: '维修人数', align: 'center', width: 100, dataIndex: 'V_REPAIR_PER',renderer: left},
        {text:'施工方式',align:'center',width:'70',dataIndex:'V_SGWAYNAME',renderer: left},
        {
            text: '录入时间',
            align: 'center',
            width: 120,
            dataIndex: 'V_INDATE',
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                metaData.style = "text-align:center;";
                return '<div data-qtip="' + value + '" >' + value + '</div>';
            }
            //renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')
        }
    ]

});
Ext.onReady(function(){

    Ext.QuickTips.init();
   Ext.create('Ext.container.Viewport',{
       id:'main',
       layout:'border',
       items:[cp]
   }) ;
});


function left(value, metaData) {
    metaData.style = "text-align:left";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}