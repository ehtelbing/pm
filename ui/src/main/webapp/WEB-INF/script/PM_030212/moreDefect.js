var Guid="";
if(Ext.urlDecode(location.href.split('?')[1])!=null){
    Guid=Ext.urlDecode(location.href.split('?')[1]).guid==null?"":Ext.urlDecode(location.href.split('?')[1]).guid;
}

var gridStore= Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'gridStore',
    fields: ['YEAR_GUID', 'DEFECT_GUID','EQUCODE', 'EQUNAME', 'DEFECT_TYPE', 'DEFECT_CONTENT','DEFECT_DATE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'dxfile/PM_PLAN_YEAR_RE_DEFECT_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

/*左上tab下面布局*/
var centerPanel = Ext.create('Ext.grid.Panel', {
    region: "center",
    id:'grid',
    store:gridStore,
    split: true,
    width:'100%',
    margin:'0px',
    height:150,
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text:'缺陷guid',width:100,dataIndex:'DEFECT_GUID',align:'center',hidden:true},
        {text: '设备名称',width: 140, dataIndex: 'EQUNAME', align: 'center',renderer:atleft},
        {text: '缺陷类型',width: 120, dataIndex: 'DEFECT_TYPE', align: 'center',renderer:atleft},
        {text: '缺陷内容',width: 300, dataIndex: 'DEFECT_CONTENT', align: 'center',renderer:atleft},
        {text: '缺陷日期',width: 140, dataIndex: 'DEFECT_DATE', align: 'center',renderer:atleft}
    ]
});


Ext.onReady(function () {
    Ext.QuickTips.init();
    //border布局 最多可将页面划分为5个区域
    //使用Viewport容器 可自适应页面窗口大小
    //一个页面只可有一个viewport
    new Ext.Viewport({
        title: "border layout",
        layout: "border",
        border:"false",
        defaults: {
            bodyStyle: "background-color: #FFFFFF;",
            frame: true
        },
        baseCls:'x-window-body x-window-body-default x-plain x-window-body-plain x-window-body-default-plain x-border-layout-ct x-closable x-window-body-closable x-window-body-default-closable x-window-body-default x-window-body-default-plain x-window-body-default-closable x-docked-noborder-top x-docked-noborder-right x-docked-noborder-bottom x-docked-noborder-left x-resizable x-window-body-resizable x-window-body-default-resizable',
        items: [centerPanel]
    });

    QueryPageLoad();
});

//加载添加页面
function QueryPageLoad(){

    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_GUID: Guid
        }
    })

}


function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
