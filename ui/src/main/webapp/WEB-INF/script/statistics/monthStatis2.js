
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
        'DQ_EGOOD_PLAN',
        'DQ_EGOOD_HNUM',
        'DQ_EGOOD_CNUM',
        'DQ_EGOOD_ACT',
        'DL_PLAN',
        'DL_ACTUAL',
        'GD_LOSS_PLAN',
        'GD_LOSS_ACT',
        'DX_FINISH_PLAN',
        'DX_FINISH_ACT',
        'DX_FINISH_RATE',
        'DX_TIME_PLAN',
        'DX_TIME_ACT',
        'DX_TIME_RATE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'dxfile/PM_MONTH_EQU_ORG_STATIS2_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list',
            total: 'total'
        },
        extraParams:{
            V_EOS_GUID:'',
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
    height: 40,
    frame:true,
    border:false,
    width: 1920,
    layout:'column',
    region:'north',
    padding:'7px 0px 3px 30px',
    items:[{
        xtype:'button',
        id:'exportEx',
        text:'导出',
        width:50,
        style:'margin:0px 20px 0px 30px',
        handler:onBtnExcel
    },
        {
            xtype:'label',
            id:'gssm',
            text:'定修计划完成率=（实际完成项目数/计划项目数）| 定修时间准确率=（1-未按计划时间完成/计划定修时间）',
            style:'color:red;padding:7px 0px 7px 0px'
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
        {header:'单位', width:180, dataIndex: 'ORGNAME', align: 'center',renderer:dataCss},
        {header: '年份', width: 60, dataIndex: 'D_YEAR', align: 'center',renderer:dataCss},
        {header: '月份', width: 60, dataIndex: 'D_MONTH', align: 'center',renderer:dataCss},
        {header:'电气单体设备完好率',columns:[
                {text: '计划（%）', width: 80, dataIndex: 'DQ_EGOOD_PLAN', align: 'center',flex: 1,renderer:dataCss,
                    editor: {xtype: "numberfield",minValue: '0', id: "a1",decimalPrecision:2

                    }
                },
                {text: '在册设备数量', width: 90, dataIndex: 'DQ_EGOOD_HNUM', align: 'center',flex: 1,renderer:dataCss,
                    editor: {xtype: "numberfield",minValue: '0', id: "a2",decimalPrecision:2

                    }},
                {text: '可开动设备数量', width: 90, dataIndex: 'DQ_EGOOD_CNUM', align: 'center',flex: 1,renderer:dataCss,
                    editor: {xtype: "numberfield",minValue: '0', id: "a3",decimalPrecision:2

                    }},
                {text: '实际（%）', width: 80, dataIndex: 'DQ_EGOOD_ACT', align: 'center',flex: 1,renderer:dataCss,
                    editor: {xtype: "numberfield",minValue: '0', id: "a4",decimalPrecision:2

                    }}
            ]},
        {header:'电网力率',columns:[
                {text: '计划（%）', width: 80, dataIndex: 'DL_PLAN', align: 'center',flex: 1,renderer:dataCss,
                    editor: {xtype: "numberfield",minValue: '0', id: "b1",decimalPrecision:2

                    }
                },
                {text: '实际（%）', width: 100, dataIndex: 'DL_ACTUAL', align: 'center',flex: 1,renderer:dataCss,
                    editor: {xtype: "numberfield",minValue: '0', id: "b2",decimalPrecision:2

                    }
                }
            ]},
        {header:'供电损失率（%）',columns:[
                {text: '计划', width: 65, dataIndex: 'GD_LOSS_PLAN', align: 'center',flex: 1,renderer:dataCss,
                    editor: {xtype: "numberfield",minValue: '0', id: "c1",decimalPrecision:2

                    }
                },
                {text: '实际', width: 65, dataIndex: 'GD_LOSS_ACT', align: 'center',flex: 1,renderer:dataCss,
                    editor: {xtype: "numberfield",minValue: '0', id: "c2",decimalPrecision:2

                    }
                }
            ]},
        {header:'定修计划完成率',columns:[
                {text: '计划项目', width: 100, dataIndex: 'DX_FINISH_PLAN', align: 'center',flex: 1,renderer:dataCss,
                    editor:{xtype:'numberfield',minValue:'0',id:"text1",decimalPrecision:2

                    }

                },
                {text: '实际完成项目', width: 100, dataIndex: 'DX_FINISH_ACT', align: 'center',flex: 1,renderer:dataCss,
                    editor: {xtype:'numberfield',minValue:'0',decimalPrecision:2,id:'text2'
                    }},
                {text: '定修计划完成率（%）', width: 100, dataIndex: 'DX_FINISH_RATE', align: 'center',flex: 1,renderer:dataCss,//editor: {xtype:'textfield' ,id:'text3',style:'background-color:#FFF68F'},
                    renderer:function(value,metaData,record,rowIdx,colIncex,store,view){
                    if(record.get('DX_FINISH_ACT')!=""&&record.get('DX_FINISH_PLAN')!=""){
                        var rate1 = (record.get('DX_FINISH_ACT') / record.get('DX_FINISH_PLAN')) * 100;
                        return '<div style="text-align:center;">' + Ext.util.Format.substr(rate1, 0, 5) + '</div>';
                    }else{
                        return '<div style="text-align:center;">' + Ext.util.Format.substr(0, 0, 5) + '</div>';
                    }

                    }
                }
            ]},
        {header:'定修时间准确率',columns:[
                {text: '计划定修时间（h)', width: 100, dataIndex: 'DX_TIME_PLAN', align: 'center',flex: 1,renderer:dataCss,
                    editor:{xtype:'numberfield',minValue:'0',id:"d1",decimalPrecision:2

                    }
                },
                {text: '实际完成时间（h)', width: 100, dataIndex: 'DX_TIME_ACT', align: 'center',flex: 1,renderer:dataCss,
                    editor:{xtype:'numberfield',minValue:'0',id:"d2",decimalPrecision:2

                    }
                },
                {text: '定修时间准确率（%）', width: 100, dataIndex: 'DX_TIME_RATE', align: 'center',flex: 1,renderer:dataCss
                    ,renderer:function(value,mateD,record,rowIndex,colIndex,store,view){
                    if(record.get('DX_TIME_ACT')!=""&&record.get('DX_TIME_PLAN')!=""){
                        var rate2=(1-record.get('DX_TIME_ACT')/record.get('DX_TIME_PLAN'))*100;
                        return '<div style="text-align:center;">'+Ext.util.Format.substr(rate2,0,5)+'</div>';
                    }else{
                        return '<div style="text-align:center;">'+Ext.util.Format.substr(0,0,5)+'</div>';
                    }

                    }

                }
            ]}
    ],
    plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1,
        listeners: {
            beforeedit:function (editor, context, eOpts) {
                if(context.record.get('D_MONTH')!=date.getMonth()+1&&context.record.get('D_YEAR')==date.getFullYear()){
                    alert("非本月数据无法修改");return false;
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
        items:[npanel,gridpanel]
    });
    Ext.data.StoreManager.lookup('storeDate').on('load',function(){
        num= Ext.data.StoreManager.get('storeDate').proxy.reader.rawData.V_NUM
    });
});

function OnChangeEleData(e){
    console.info(e.context.record);
    var rateD1= "";
    var rateD2= "";

    if(e.context.record.data.DX_FINISH_ACT!=""&&e.context.record.data.DX_FINISH_PLAN!=""){
        rateD1=Ext.util.Format.substr((e.context.record.data.DX_FINISH_ACT/e.context.record.data.DX_FINISH_PLAN)*100,0,5);
    }else{
        rateD1=0;
    }

    if(e.context.record.data.DX_TIME_ACT!=""&&e.context.record.data.DX_TIME_PLAN!=""){
        rateD2=Ext.util.Format.substr((1-e.context.record.data.DX_TIME_ACT/e.context.record.data.DX_TIME_PLAN)*100,0,5);
    }else{
        rateD2=0;
    }

    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PM_MONTH_EQU_ORG_STATIS2_IN',
        method: 'POST',
        params: {
            V_MAIN_GUID:e.context.record.data.V_GUID,
            V_YEAR:e.context.record.data.D_YEAR,
            V_MONTH:e.context.record.data.D_MONTH,
            V_ORGCODE:Ext.util.Cookies.get('v_orgCode'),
            V_ORGNAME:decodeURI(Ext.util.Cookies.get('v_orgname').substring()),
            V_PERCODE:Ext.util.Cookies.get('v_personcode'),
            V_PERNAME:decodeURI(Ext.util.Cookies.get('v_personname').substring()),
            V_DQ_PLAN:e.context.record.data.DQ_EGOOD_PLAN,
            V_DQ_HNUM:e.context.record.data.DQ_EGOOD_HNUM,
            V_DQ_CNUM:e.context.record.data.DQ_EGOOD_CNUM,
            V_DQ_ACT:e.context.record.data.DQ_EGOOD_ACT,
            V_DL_PLAN:e.context.record.data.DL_PLAN,
            V_DL_ACTUAL:e.context.record.data.DL_ACTUAL,
            V_GD_PLAN:e.context.record.data.GD_LOSS_PLAN,
            V_GD_ACT:e.context.record.data.GD_LOSS_ACT,
            V_DX_FPLAN:e.context.record.data.DX_FINISH_PLAN,
            V_DX_FACT:e.context.record.data.DX_FINISH_ACT,
            V_DX_FRATE:rateD1,
            V_DX_TPLAN:e.context.record.data.DX_TIME_PLAN,
            V_DX_TACT:e.context.record.data.DX_TIME_ACT,
            V_DX_TRATE:rateD2,
            V_REMARK:""
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.RET == "SUCCESS") {
                // alert("添加成功");
            }
        }
    });
}

function dataCss(value, metaData, record, rowIndex, colIndex, store){
    if(record.get('D_MONTH')==date.getMonth()+1&&record.get('D_YEAR')==date.getFullYear()) {
        metaData.style = "background: yellow";
        //return '<div  data-qtip="' + value + '" >' + value + '</div>';
        return value;
    } else{
       // return '<div  data-qtip="' + value + '" >' + value + '</div>';
        return value;
    }
}
function onBtnExcel(){

    document.location.href = AppUrl + 'dxfile/monthStatis2?V_EOS_GUID=' + '0'
        + '&V_YEAR=' + (date.getFullYear()).toString()
        + '&V_MONTH=' + (date.getMonth()+1).toString()
        + '&V_ORGCODE=' + Ext.util.Cookies.get('v_orgCode')
        + '&V_ORGNAME=' + decodeURI(Ext.util.Cookies.get('v_orgname').substring())
        + '&V_INPERCODE=' + Ext.util.Cookies.get('v_personcode')
        + '&V_INPERNAME=' + decodeURI(Ext.util.Cookies.get('v_personname').substring());
}
