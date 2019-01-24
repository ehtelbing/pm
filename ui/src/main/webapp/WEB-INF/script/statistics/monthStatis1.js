
var date=new Date();
var num="";
var ratedata1="" ;
var ratedata2="";
var ratedata3="";
var ratedata4="";
var storeDate= Ext.create('Ext.data.Store', {
    id: 'storeDate',
    autoLoad: true,
    fields: ['ID', 'EOS_GUID', 'D_YEAR',"D_MONTH",'ORGCODE','ORGNAME','E_FAULT_PLAN','E_FAULT_HOUR',
        'E_FAULT_ACTUAL',
        'C_EQU_GOOD_PLAN',
        'C_EQU_GOOD_SNUM',
        'C_EQU_GOOD_CNUM',
        'C_EQU_GOOD_ACT',
        'CUSE_OPENR_PLAN',
        'CUSE_OPENR_ACTUAL',
        'DXPFINISH_PRO_PLAN',
        'DXPFINISH_PRO_ACTUAL',
        'DXPFINISH_PRO_RATE',
        'DXT_EXACT_HOUR_PLAN',
        'DXT_EXACT_HOUR_ACT',
        'DXT_EXACT_HOUR_RATE',
        'COPT_CSENERGY_PLAN',
        'COPT_CSENERGY_ACT',
        'XKOPT_CSENERGY_PLAN',
        'XKOPT_CSENERGY_ACT',
        'SJSYNTH_CSENERGY_PLAN',
        'SJSYNTH_CSENERGY_ACT',
        'QTSYNTH_CSENERGY_PLAN',
        'QTSYNTH_CSENERGY_ACT',
        'INERTDATE',
        'INSERT_PERCODE',
        'INSERT_PERNAME',
        'RELATE_GUID',
        'REMENK'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'dxfile/PRO_MONTH_EQU_STATIS_IN_SEL',
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
        {header: '唯一码', width: 100, dataIndex: 'EOS_GUID', align: 'center',editor: 'textfield',hidden:true},
        {header: '单位', width: 120, dataIndex: 'ORGCODE', align: 'center',hidden:true},
        {header: '单位', width: 180, dataIndex: 'ORGNAME', align: 'center',renderer:dataCss},
        {header: '年份', width: 80, dataIndex: 'D_YEAR', align: 'center',renderer:dataCss},
        {header: '月份', width: 80, dataIndex: 'D_MONTH', align: 'center',renderer:dataCss},
        {header:'设备故障率',columns:[
                {text: '计划率（%）', width: 80, dataIndex: 'E_FAULT_PLAN', align: 'center',flex: 1,renderer:dataCss,
                    editor: {xtype: "numberfield",minValue: '0', id: "a1",decimalPrecision:2

                }
                },
                {text: '故障时间（h)', width: 90, dataIndex: 'E_FAULT_HOUR', align: 'center',flex: 1,renderer:dataCss,
                    editor: {xtype: "numberfield",minValue: '0', id: "a2",decimalPrecision:2

                }},
                {text: '实际（%）', width: 80, dataIndex: 'E_FAULT_ACTUAL', align: 'center',flex: 1,renderer:dataCss,
                    editor: {xtype: "numberfield",minValue: '0', id: "a3",decimalPrecision:2

                }}
            ]},
        {header:'采矿单体设备完好率',columns:[
                {text: '计划（%）', width: 80, dataIndex: 'C_EQU_GOOD_PLAN', align: 'center',flex: 1,renderer:dataCss,
                    editor: {xtype: "numberfield",minValue: '0', id: "b1",decimalPrecision:2

                }
                },
                {text: '在册设备数量', width: 100, dataIndex: 'C_EQU_GOOD_SNUM', align: 'center',flex: 1,renderer:dataCss,
                    editor: {xtype: "numberfield",minValue: '0', id: "b2",decimalPrecision:2
                        // ,listeners:{
                        //     blur:function(field){
                        //         rowEditing.context.record.set('C_EQU_GOOD_SNUM', Ext.getCmp('b2').getValue());
                        //     }
                        // }
                }
                },
                {text: '可开动设备数量', width: 100, dataIndex: 'C_EQU_GOOD_CNUM', align: 'center',flex: 1,renderer:dataCss,
                    editor: {xtype: "numberfield",minValue: '0', id: "b3",decimalPrecision:2

                }
                },
                {text: '实际（%）', width: 80, dataIndex: 'C_EQU_GOOD_ACT', align: 'center',flex: 1,renderer:dataCss,
                    editor: {xtype: "numberfield",minValue: '0', id: "b4",decimalPrecision:2

                }
                }
            ]},
        {header:'可开动率',columns:[
                {text: '计划（%）', width: 65, dataIndex: 'CUSE_OPENR_PLAN', align: 'center',flex: 1,renderer:dataCss,
                    editor: {xtype: "numberfield",minValue: '0', id: "c1",decimalPrecision:2

                }
                },
                {text: '实际（%）', width: 65, dataIndex: 'CUSE_OPENR_ACTUAL', align: 'center',flex: 1,renderer:dataCss,
                    editor: {xtype: "numberfield",minValue: '0', id: "c2",decimalPrecision:2

                }
                }
            ]},
        {header:'定修计划完成率',columns:[
                {text: '计划项目', width: 100, dataIndex: 'DXPFINISH_PRO_PLAN', align: 'center',flex: 1,renderer:dataCss,
                    editor:{xtype:'numberfield',minValue:'0',id:"text1",decimalPrecision:2
                    //     ,listeners:{ blur:function(record){
                    //             var rate1=(record.get('DXPFINISH_PRO_PLAN')/record.get('DXPFINISH_PRO_ACTUAL'))*100;
                    //             Ext.getCmp('gridpanel').plugins[rowIdx].context.record.set('DXPFINISH_PRO_RATE', Ext.util.Format.substr(rate1,0,5));}
                    // }
                }

                        },
                {text: '实际完成项目', width: 100, dataIndex: 'DXPFINISH_PRO_ACTUAL', align: 'center',flex: 1,renderer:dataCss,
                    editor: {xtype:'numberfield',minValue:'0',decimalPrecision:2,id:'text2'
                        // ,listeners:{ blur:function(record){
                        //         var rate1=(record.get('DXPFINISH_PRO_PLAN')/record.get('DXPFINISH_PRO_ACTUAL'))*100;
                        //         Ext.getCmp('gridpanel').plugins[rowIdx].context.record.set('DXPFINISH_PRO_RATE', Ext.util.Format.substr(rate1,0,5));}
                        // }

                }},
                {text: '定修计划完成率（%）', width: 100, dataIndex: 'DXPFINISH_PRO_RATE', align: 'center',flex: 1, //editor: {xtype:'textfield' ,id:'text3',style:'background-color:#FFF68F'},
                    renderer:function(value,metaData,record,rowIdx,colIncex,store,view){
                      // if(record.get('DXPFINISH_PRO_RATE')==""||record.get('DXPFINISH_PRO_RATE')==undefined){
                        if(record.get('D_MONTH')==date.getMonth()+1&&record.get('D_YEAR')==date.getFullYear()) {
                            if ((record.get('DXPFINISH_PRO_PLAN') != "" && record.get('DXPFINISH_PRO_ACTUAL') != "")) {

                                var rate1 = (record.get('DXPFINISH_PRO_ACTUAL') / record.get('DXPFINISH_PRO_PLAN')) * 100;
                                return '<div style="text-align:center;">' + Ext.util.Format.substr(rate1, 0, 5) + '</div>';
                            }
                            else {
                                return '<div style="text-align:center;">' + Ext.util.Format.substr(0, 0, 5) + '</div>';
                            }
                        }
                      // }
                      // else{
                      //     return '<div style="text-align:center;">'+Ext.util.Format.substr(record.get('DXPFINISH_PRO_RATE'),0,5)+'</div>';
                    //   }
                    //
                    }
                }
            ]},
        {header:'定修时间准确率',columns:[
                {text: '计划定修时间（h)', width: 100, dataIndex: 'DXT_EXACT_HOUR_PLAN', align: 'center',flex: 1,renderer:dataCss,
                       editor:{xtype:'numberfield',minValue:'0',id:"d1",decimalPrecision:2

                }
                },
                {text: '实际完成时间（h)', width: 100, dataIndex: 'DXT_EXACT_HOUR_ACT', align: 'center',flex: 1,renderer:dataCss,
                    editor:{xtype:'numberfield',minValue:'0',id:"d2",decimalPrecision:2

                }
                        },
                {text: '定修时间准确率（%）', width: 100, dataIndex: 'DXT_EXACT_HOUR_RATE', align: 'center',flex: 1
                    // ,editor:{xtype:'textfield',id:"d3"}
                    ,renderer:function(value,mateD,record,rowIndex,colIndex,store,view){
                        if(record.get('D_MONTH')==date.getMonth()+1&&record.get('D_YEAR')==date.getFullYear()) {
                            // if(record.get('DXT_EXACT_HOUR_RATE')==""||record.get('DXT_EXACT_HOUR_RATE')==undefined){
                            if (record.get('DXPFINISH_PRO_PLAN') != "" && record.get('DXPFINISH_PRO_ACTUAL') != "") {
                                var rate2 = (1 - record.get('DXT_EXACT_HOUR_PLAN') / record.get('DXT_EXACT_HOUR_ACT')) * 100;
                                return '<div style="text-align:center;">' + Ext.util.Format.substr(rate2, 0, 5) + '</div>';
                            } else {
                                return '<div style="text-align:center;">' + Ext.util.Format.substr(0, 0, 5) + '</div>';
                            }
                        }
                       // }
                       // else{
                       //     return '<div style="text-align:center;">'+Ext.util.Format.substr(record.get('DXT_EXACT_HOUR_RATE'),0,5)+'</div>';
                       // }

                        }

                }
            ]},
        {header:'开矿工序能耗',columns:[
                {text: '计划', width: 65, dataIndex: 'COPT_CSENERGY_PLAN', align: 'center',flex: 1,renderer:dataCss,
                    editor:{xtype:'numberfield',minValue:'0',id:"e1",decimalPrecision:2

                }
                        },
                {text: '实际', width: 65, dataIndex: 'COPT_CSENERGY_ACT', align: 'center',flex: 1,renderer:dataCss,
                    editor:{xtype:'numberfield',minValue:'0',id:"e2",decimalPrecision:2

                }
                }
            ]},
        {header:'选矿/精铁矿工序能耗',columns:[
                {text: '计划', width: 65, dataIndex: 'XKOPT_CSENERGY_PLAN', align: 'center',flex: 1,renderer:dataCss,
                    editor:{xtype:'numberfield',minValue:'0',id:"f1",decimalPrecision:2

                }
                },
                {text: '实际', width: 65, dataIndex: 'XKOPT_CSENERGY_ACT', align: 'center',flex: 1,renderer:dataCss,
                    editor:{xtype:'numberfield',minValue:'0',id:"f2",decimalPrecision:2

                }
                }
            ]},
        {header:'烧结综合能耗',columns:[
                {text: '计划', width: 65, dataIndex: 'SJSYNTH_CSENERGY_PLAN', align: 'center',flex: 1,renderer:dataCss,
                    editor:{xtype:'numberfield',minValue:'0',id:"g1",decimalPrecision:2

                }
                },
                {text: '实际', width: 65, dataIndex: 'SJSYNTH_CSENERGY_ACT', align: 'center',flex: 1,renderer:dataCss,
                    editor:{xtype:'numberfield',minValue:'0',id:"g2",decimalPrecision:2

                }
                }
            ]},
        {header:'球团综合能耗',columns:[
                {text: '计划', width: 65, dataIndex: 'QTSYNTH_CSENERGY_PLAN', align: 'center',flex: 1,renderer:dataCss,
                    editor:{xtype:'numberfield',minValue:'0',id:"h1",decimalPrecision:2

                }
                },
                {text: '实际', width: 65, dataIndex: 'QTSYNTH_CSENERGY_ACT', align: 'center',flex: 1,renderer:dataCss,
                    editor:{xtype:'numberfield',minValue:'0',id:"h2",decimalPrecision:2

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

    // if(e.context.record.data.DXPFINISH_PRO_RATE==""){
        rateD1=Ext.util.Format.substr((e.context.record.data.DXPFINISH_PRO_ACTUAL/e.context.record.data.DXPFINISH_PRO_PLAN)*100,0,5);
    // }
    // else{
    //     rateD1=e.context.record.data.DXPFINISH_PRO_RATE;
    // }
    // if(e.context.record.data.DXT_EXACT_HOUR_RATE==""){
        rateD2=Ext.util.Format.substr((1-e.context.record.data.DXT_EXACT_HOUR_ACT/e.context.record.data.DXT_EXACT_HOUR_PLAN)*100,0,5);
    // }else{
    //     rateD2=e.context.record.data.DXT_EXACT_HOUR_RATE;
    // }

    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PRO_MONTH_EQU_STATIS_IN_IN',
        method: 'POST',
        params: {
            V_EOS_GUID: e.context.record.data.EOS_GUID,
            V_YEAR: e.context.record.data.D_YEAR,
            V_MONTH: e.context.record.data.D_MONTH,
            V_ORGCODE: Ext.util.Cookies.get('v_orgCode'),
            V_ORGNAME: decodeURI(Ext.util.Cookies.get('v_orgname').substring()),
            V_EFPLAN: e.context.record.data.E_FAULT_PLAN,
            V_EFHOUR: e.context.record.data.E_FAULT_HOUR,
            V_EFACTUAL: e.context.record.data.E_FAULT_ACTUAL,
            V_CPLAN: e.context.record.data.C_EQU_GOOD_PLAN,
            V_CSNUM: e.context.record.data.C_EQU_GOOD_SNUM,
            V_CCNUM: e.context.record.data.C_EQU_GOOD_CNUM,
            V_CACT: e.context.record.data.C_EQU_GOOD_ACT,
            V_CUSEPLAN: e.context.record.data.CUSE_OPENR_PLAN,
            V_CUSEACTUAL: e.context.record.data.CUSE_OPENR_ACTUAL,
            V_DXPFPLAN: e.context.record.data.DXPFINISH_PRO_PLAN,
            V_DXPFACTUAL: e.context.record.data.DXPFINISH_PRO_ACTUAL,
            V_DXPFRATE: rateD1,//e.context.record.data.DXPFINISH_PRO_RATE==""?rateD1:e.context.record.data.DXPFINISH_PRO_RATE,
            V_DXTPLAN: e.context.record.data.DXT_EXACT_HOUR_PLAN,
            V_DXTACT: e.context.record.data.DXT_EXACT_HOUR_ACT,
            V_DXTRATE: rateD2,//e.context.record.data.DXT_EXACT_HOUR_RATE==""?rateD2:e.context.record.data.DXPFINISH_PRO_RATE,
            V_COPTPLAN: e.context.record.data.COPT_CSENERGY_PLAN,
            V_COPTACT: e.context.record.data.COPT_CSENERGY_ACT,
            V_XKOPTPLAN: e.context.record.data.XKOPT_CSENERGY_PLAN,
            V_XKOPTACT: e.context.record.data.XKOPT_CSENERGY_ACT,
            V_SJSPLAN: e.context.record.data.SJSYNTH_CSENERGY_PLAN,
            V_SJSACT: e.context.record.data.SJSYNTH_CSENERGY_ACT,
            V_QTSPLAN: e.context.record.data.QTSYNTH_CSENERGY_PLAN,
            V_QTSACT: e.context.record.data.QTSYNTH_CSENERGY_ACT,
            V_INERTDATE: '',
            V_INPERCODE: Ext.util.Cookies.get('v_personcode'),
            V_INPERNAME: decodeURI(Ext.util.Cookies.get('v_personname').substring())
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.RET == "SUCCESS") {
                // alert("添加成功");
            }
        }
    });
}


function changeRowClass(record, rowIndex, rowParams, store){
    if(record.get('D_MONTH')==date.getMonth()+1&&record.get('D_YEAR')==date.getFullYear()){
        return 'x-grid-td';
    }
}
function dataCss(value, metaData, record, rowIndex, colIndex, store){
    if(record.get('D_MONTH')==date.getMonth()+1&&record.get('D_YEAR')==date.getFullYear()) {
        metaData.style = "background-color: yellow";
        // return '<div  data-qtip="' + value + '" >' + value + '</div>';
        return value;
    } else{
        // return '<div  data-qtip="' + value + '" >' + value + '</div>';
        return value;
    }
}

function onBtnExcel(){
    document.location.href = AppUrl + 'dxfile/monthStatis1?V_EOS_GUID=' + '0'
        + '&V_YEAR=' + (date.getFullYear()).toString()
        + '&V_MONTH=' + (date.getMonth()+1).toString()
        + '&V_ORGCODE=' + Ext.util.Cookies.get('v_orgCode')
        + '&V_ORGNAME=' + decodeURI(Ext.util.Cookies.get('v_orgname').substring())
        + '&V_INPERCODE=' + Ext.util.Cookies.get('v_personcode')
        + '&V_INPERNAME=' + decodeURI(Ext.util.Cookies.get('v_personname').substring());
}