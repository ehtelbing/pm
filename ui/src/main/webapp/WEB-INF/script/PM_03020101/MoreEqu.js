var Guid="";
if(Ext.urlDecode(location.href.split('?')[1])!=null){
    Guid=Ext.urlDecode(location.href.split('?')[1]).guid==null?"":Ext.urlDecode(location.href.split('?')[1]).guid;
}

var cgridStore= Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'cgridStore',
    fields: ['V_PLANGUID','V_EQUTYPECODE','V_EQUTYPENAME','V_EQUCODE',
        'V_EQUNAME','V_EQUSITECODE','V_EQUSITE','V_SAP_EQUCODE','V_SIZE','V_EQUSITENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PM_03_PLAN_YEAR_EQU_SEL',
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
    id:'cgrid',
    store:cgridStore,
    split: true,
    width:'100%',
    margin:'0px',
    height:150,
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '设备编码',width: 140, dataIndex: 'V_EQUCODE', align: 'center',renderer:atleft},
        {text: '设备名称',width: 140, dataIndex: 'V_EQUNAME', align: 'center',renderer:atleft},
        {text: '功能位置',width: 300, dataIndex: 'V_EQUSITENAME', align: 'center',renderer:atleft},
        {text: '删除',width: 120, dataIndex: 'V_EQUCODE', align: 'center',renderer:DelEqu}
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
        items: [centerPanel]
    });

    QueryPageLoad();

});

//加载添加页面
function QueryPageLoad(){

    Ext.data.StoreManager.lookup('cgridStore').load({
        params:{
            V_V_PLANGUID:Guid
        }
    })

}


function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

//删除选中设备
function DelEqu(value, metaData, record) {
    return '<a href="#" onclick="_deleteEqu(\'' + record.data.V_EQUCODE + '\')">' + '删除' + '</a>';

}
window.parent.QueryCGrid();
function _deleteEqu(equcode){

    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_EQU_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_PLANGUID:Guid,
            V_V_EQUCODE:equcode
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.V_INFO=='成功'){
                QueryPageLoad();
            }else{
                alert("删除失败");
            }
        }
    });
    window.opener.QueryCGrid();
}

// window.onbeforeunload=clseWin;
// function clseWin(){
//     QueryCGrid();
// }