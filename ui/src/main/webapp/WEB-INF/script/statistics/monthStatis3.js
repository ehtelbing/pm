
var date=new Date();
var num="";
var ratedata1="" ;
var ratedata2="";
var ratedata3="";
var ratedata4="";
var storeDate= Ext.create('Ext.data.Store', {
    id: 'storeDate',
    autoLoad: true,
    fields: ['ID', 'V_GUID',
        'D_YEAR',"D_MONTH",
        'ORGCODE','ORGNAME',
        'INERTDATE','INSERT_PERCODE',
        'INSERT_PERNAME',
        'PRO_Q_PLAN',
        'PRO_Q_ACT',
        'RELACT_GUID',
        'RAMARK'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'dxfile/PM_MONTH_EQU_ORG_STATIS3_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list',
            total: 'total'
        },
        extraParams:{
            V_V_GUID:'',
            V_YEAR:(date.getFullYear()).toString(),
            V_MONTH:(date.getMonth()+1).toString(),
            V_ORGCODE:Ext.util.Cookies.get('v_orgCode'),
            V_ORGNAME:decodeURI(Ext.util.Cookies.get('v_orgname').substring()),
            V_INPERCODE:Ext.util.Cookies.get('v_personcode'),
            V_INPERNAME:decodeURI(Ext.util.Cookies.get('v_personname').substring())
        }
    }
});
var npanel=Ext.create('Ext.panel.Panel',{
    id:'npanel',
    height: 30,
    frame:true,
    border:false,
    width: 1920,
    layout:'column',
    region:'north',
    padding:'3px 0px 3px 30px',
    items:[
        {
            xtype:'label',
            id:'gssm',
            text:'定修计划完成率=（实际完成项目数/计划项目数）| 定修时间准确率=（1-未按计划时间完成/计划定修时间）',
            style:'color:red;'
        }
    ]
});
var gridpanel=Ext.create('Ext.grid.GridPanel',{
    id:'gridpanel',
    applyTo:'grid',
    region:'center',
    width:1920,
    height:820,
    frame:true,
    store:storeDate,
    columnLines: true,
    columns: [
        {header: '唯一码', width: 100, dataIndex: 'V_GUID', align: 'center',flex: 1, editor: 'textfield',hidden:true},
        {header: '单位', width: 120, dataIndex: 'ORGCODE', align: 'center',flex: 1,hidden:true},
        {header:'单位', width:200, dataIndex: 'ORGNAME', align: 'center',flex: 1},
        {header: '年份', width: 60, dataIndex: 'D_YEAR', align: 'center',flex: 1},
        {header: '月份', width: 60, dataIndex: 'D_MONTH', align: 'center',flex: 1},
        {header:'产品合格率（%）',width: 160,columns:[
                {text: '计划', width: 80, dataIndex: 'PRO_Q_PLAN', align: 'center',flex: 1,
                    editor: {xtype: "numberfield",minValue: '0', id: "a1",decimalPrecision:2

                    }
                },
                {text: '实际（%）', width: 80, dataIndex: 'PRO_Q_ACT', align: 'center',flex: 1,
                    editor: {xtype: "numberfield",minValue: '0', id: "a2",decimalPrecision:2

                    }}
            ]}
    ],
    plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 2,
        listeners: {
            beforeedit:function (editor, context, eOpts) {
                if(context.record.get('D_MONTH')!=date.getMonth()+1){
                    return alert("非本月数据无法修改");
                }
            },
            edit: OnChangeEleData
        }
    })]
});
Ext.onReady(function(){

    Ext.create('Ext.container.Viewport',{
        layout:'border',
        id:'main',
        items:[gridpanel]
    });
    Ext.data.StoreManager.lookup('storeDate').on('load',function(){
        num= Ext.data.StoreManager.get('storeDate').proxy.reader.rawData.V_NUM
    });
});

function OnChangeEleData(e){
    console.info(e.context.record);

    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PM_MONTH_EQU_ORG_STATIS3_IN',
        method: 'POST',
        params: {
            V_MAIN_GUID:e.context.record.data.V_GUID,
            V_YEAR:e.context.record.data.D_YEAR,
            V_MONTH:e.context.record.data.D_MONTH,
            V_ORGCODE:Ext.util.Cookies.get('v_orgCode'),
            V_ORGNAME:decodeURI(Ext.util.Cookies.get('v_orgname').substring()),
            V_INPERCODE:Ext.util.Cookies.get('v_personcode'),
            V_INPERNAME:decodeURI(Ext.util.Cookies.get('v_personname').substring()),
            V_PRO_Q_PLAN:e.context.record.data.PRO_Q_PLAN,
            V_PRO_Q_ACT:e.context.record.data.PRO_Q_ACT,
            V_RAMARK:""
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.RET == "SUCCESS") {
                // alert("添加成功");
            }
        }
    });
}