
var YEARGUID="";
var date=new Date();
var years=[];
for(var i=0;i<date.getFullYear()+3;i++){
    years.push({id:i,value:i});
}
var yearStore=Ext.create('Ext.data.Store',{
    id:'yearStore',
    fields:['id','value'],
    data: years,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});

Ext.onReady(function(){
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['ID_GUID','V_YEAR','V_MONTH','ORGCODE','ORGNAME','DEPTCODE','DEPTNAME',
            'ZYCODE','ZYNAME','EQUCODE','EQUTYPE','V_EQUNAME','V_EQUTYPENAME','SGTYPECODE','SGTYPENAME'
            ,'REPAIRCONTENT','QXCONTEXT','REMARK','PLANTJMONTH','PLANJGMONTH','PLANHOUR'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PM_PLAN_YEAR_BASIC_TO_MON_SEL',
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
    var npanel=Ext.create('Ext.panel.Panel',{
        id:'npanel',
        layout:'column',
        region:'north',
        height:50,
        frame:true,
        border:false,
        items:[
            {xtype:'combo',
                id: 'year',
                fieldLabel:'年份',
                editable: false,
                margin: '5 0 0 5',
                labelWidth: 80,
                labelAlign:'right',
                width: 150,
                displayField: 'value',
                valueField: 'id',
                value: date.getFullYear(),
                store: yearStore,
                queryMode: 'local',
                listeners:{
                change:function(){
                    selFinishYear();
                },
                    select:function(){
                        selFinishYear();
                    }
                }
            },
            {
                xtype:'button',
                id:'selBtn',
                margin: '7 0 0 10',
                text:'查询',
                handler:selFinishYear
            },
            {
                xtype:'button',
                id:'saveBtn',
                margin: '7 0 0 10',
                text:'确定返回',
                handler:saveMonth
            }
        ]
    });

    var cpanel=Ext.create('Ext.grid.Panel',{
        id:'cpanel',
        columnLines:true,
        region: 'center',
        border: true,
        store:gridStore,
        selModel:{
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns:[
            {text: '年份', align: 'center', width: 100, dataIndex: 'V_YEAR'},
            {text: '月份', align: 'center', width: 150, dataIndex: 'V_MONTH'},
            {text: '计划厂矿', align: 'center', width: 100, dataIndex: 'ORGNAME'},
            {text: '作业区', align: 'center', width: 90, dataIndex: 'DEPTNAME'},
            {text: '专业', align: 'center', width: 60, dataIndex: 'ZYNAME'},
            {text: '设备类型', align: 'center', width: 100, dataIndex: 'V_EQUTYPENAME'},
            {text: '设备名称', align: 'center', width: 150, dataIndex: 'V_EQUNAME'},
            {text: '主要缺陷', align: 'center', width: 200, dataIndex: 'QXCONTEXT'},
            {text: '施工方式', align: 'center', width: 100, dataIndex: 'SGTYPENAME'},
            {text: '检修内容', align: 'center', width: 100, dataIndex: 'REPAIRCONTENT'},
            {text: '设备名称', align: 'center', width: 100, dataIndex: 'V_EQUNAME'},
            {text: '计划停工时间', align: 'center', width: 100, dataIndex: 'PLANTJMONTH',renderer:timeTurn},
            {text: '计划竣工时间', align: 'center', width: 150, dataIndex: 'PLANJGMONTH',renderer:timeTurn},
            {text: '合计时间', align: 'center', width: 100, dataIndex: 'PLANHOUR'},
            {text: '备注', align: 'center', width: 280, dataIndex: 'REMARK'}
            // {text: '预计寿命', align: 'center', width: 100, dataIndex: ''},
            // {text: '维修人数', align: 'center', width: 100, dataIndex: ''},
            // {text: '施工是否落实', align: 'center', width: 150, dataIndex: ''},
            // {text: '工序', align: 'center', width: 100, dataIndex: ''},
        ]
        ,listeners:{
            itemclick:function(store,record){
               YEARGUID= record.get('ID_GUID');
            }
        }
    });
    var monthPanel=Ext.create('Ext.panel.Panel',{
        id:'monthPanel',
        layout:'column',
        border:false,
        frame:'true',
        items:[]
    });
    var monthDate=Ext.create('Ext.window.Window',{
        id:'monthDate',
        closeAction:'hide',
        title: '月计划必填数据添加',
        width:750,
        height:500,
        items:[monthPanel]
    });
    Ext.create('Ext.container.Viewport',{
        id:'main',
        layout:'border',
        items:[npanel,cpanel]
    });
    selFinishYear();
});

function selFinishYear(){
    Ext.data.StoreManager.lookup("gridStore").load({
        params:{
            V_V_YEAR:Ext.getCmp("year").getValue()
        }
    });
}
function timeTurn(value,metaData,recode,store){
    metaData.style="text-align:center";
    var val=value.toString().substring(0,10);
    return '<div>'+val+'</div>';
}
function saveMonth(){
    var record=Ext.getCmp("cpanel").getSelectionModel().getSelection();
    if(record.length<=0){
        alert('请选择一条年计划');
        return false;
    }
    Ext.getCmp("monthDate").show();

}
function confirmBtn(){
    var record=Ext.getCmp("cpanel").getSelectionModel().getSelection();
    if(record.length<=0){
        alert('请选择一条年计划');
        return false;
    }
}