
var yearlist=[];
var monthlist=[];
var date=new Date();
//年
for(var i=date.getFullYear()-5;i<date.getFullYear()+2;i++){
    yearlist.push({id:i,name:i});
}
//月
for (var j=1;j<=12;j++){
    monthlist.push({id:j,name:j});
}
var yearStore=Ext.create('Ext.data.Store',{
    id:'yearStore',
    fields:['id','name'],
    data:yearlist,
    proxy:{
        type:'memory',
        reader:{
            type:'json'
        }
    }
});
var monthStore=Ext.create('Ext.data.Store',{
    id:'',
    fields:['id','name'],
    data:monthlist,
    proxy:{
        type:'memory',
        reader:{
            type:'json'
        }
    }
});
Ext.onReady(function () {
    // gridstore
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: false,
        fields: ['V_ORGCODE','V_ORGNAME','V_V_SUMNUM','V_V_XDGX_NUM','V_V_YS_NUM','V_V_WCL_NUM','V_V_YXQ_NUM','V_V_YCL_NUM','V_V_CLL_NUM','V_V_XQL_NUM'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PRO_PM_07_DEF_SBBTJ_VIEW',
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

    var toolPanel=Ext.create('Ext.panel.Panel',{
        id:'',
        layout:'column',
        region:'north',
        items:[
            {
                xtype:'combo',
                id:'year',
                fieldLabel: '年份',
                margin: '5 0 0 5',
                labelWidth: 80,
                width: 250,
                store:yearStore,
                labelAlign: 'right',
                displayField:'name',
                value:'id',
                // readOnly:true,
                queryMode:'local',
                editable:false
            },{
                xtype:'combo',
                id:'month',
                fieldLabel: '月份',
                labelAlign: 'right',
                margin: '5 0 0 5',
                labelWidth: 80,
                width: 250,
                store:monthStore,
                displayField:'name',
                value:'id',
                // readOnly:true,
                queryMode:'local',
                editable:false
            },
            {
                xtype:'button',
                id:'selQuery',
                text:'查询',
                margin: '5 0 5 5',
                icon: imgpath + '/search.png',
                handler: function () {
                    Query();
                }
            }
            /*, {
                xtype: 'button',
                text: '导出excel',
                style: ' margin: 5px 0px 5px 5px',
                icon: imgpath + '/excel.gif',
                width: 100,
                listeners: {
                    click: OnClickExcelButton
                }
            }*/
            ,{xtype:'label', style: ' margin: 8px 0px 5px 5px;color:red',
                text:'*注：1.消缺率=已下达工单缺陷数量（并且工单验收）/缺陷总数\n' +
                          '2.处理率=已下达工单缺陷数量/缺陷总数'}
        ]
    });
    var girdPanel=Ext.create('Ext.grid.Panel',{
        id:'gridPanel',
        store:gridStore,
        columnLines:true,
        columns:[
            // fields: ['V_ORGCODE','V_ORGNAME','V_V_SUMNUM','V_V_XDGX_NUM','V_V_YS_NUM','V_V_WCL_NUM','V_V_YXQ_NUM','V_V_YCL_NUM','V_V_CLL_NUM','V_V_XQL_NUM'],
            {text: '序号', align: 'center', width: 50, xtype: 'rownumberer'},
            {text: '厂矿编码', align: 'center', width: 100, dataIndex: 'V_ORGCODE',hidden:true},
            {text: '厂矿名称', align: 'center', width: 150, dataIndex: 'V_ORGNAME',renderer:leftStyle},
            {text: '下工单数量', align: 'center', width: 100, dataIndex: 'V_V_XDGX_NUM',renderer:leftStyle},
            {text: '处理率(%)', align: 'center', width: 100, dataIndex: 'V_V_CLL_NUM',renderer:leftStyle},
            {text: '消缺率（%)', align: 'center', width: 100, dataIndex: 'V_V_XQL_NUM',renderer:leftStyle}
            // {text:'查看详情',align:'center',width:100,dataIndex:'V_ORGCODE',renderer:turnTo}
        ]

    });
    Ext.QuickTips.init();
   Ext.create('Ext.container.Viewport',{
       layout:'border',
       items:[toolPanel,girdPanel]
   });
    Ext.getCmp('year').on('select', function () {
        Query();
    });
    Ext.getCmp('month').on('select', function () {
        Query();
    });
    if(new Date().getMonth()==0){
        Ext.getCmp('year').select(new Date().getFullYear()-1);
        Ext.getCmp('month').select(12);
    }else{
        Ext.getCmp('year').select(new Date().getFullYear());
        Ext.getCmp('month').select(new Date().getMonth());
    }
    Query();

});
function leftStyle(value,metaDate,record,colIndex,store){
    metaDate.style="text-align:right;";
    return '<div data-qtip="'+value+'">'+value+'</div>';
}
function turnTo(value, metaData, record, rowIdx, colIdx, store, view){
    return '<a href="javascript:viewZyqState(\'' + value + '\')">' + "详情查看" + '</a>';
}
function viewZyqState(ckval){
    window.open(AppUrl + 'page/PM_0704/ckDetailDefect.html?V_V_YEAR=' + Ext.getCmp('nf').getValue()
        + '&V_V_MONTH=' + Ext.getCmp('yf').getValue()
        + '&V_V_ORGCODE=' + ckval);
}
function Query(){
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_NF: Ext.getCmp('year').getValue(),
            V_YF: Ext.getCmp('month').getValue()
        }
    });
}