var Guid="";
if(Ext.urlDecode(location.href.split('?')[1])!=null){
    Guid=Ext.urlDecode(location.href.split('?')[1]).guid==null?"":Ext.urlDecode(location.href.split('?')[1]).guid;
}

var gridStore= Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'gridStore',
    fields: ['I_ID','V_DEFECTLIST','V_SOURCECODE', 'V_SOURCENAME', 'V_SOURCETABLE', 'V_SOURCEREMARK', 'V_SOURCEID',
        'D_DEFECTDATE', 'D_INDATE', 'V_PERCODE', 'V_PERNAME', 'V_ORGCODE', 'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME',
        'V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_EQUSITENAME', 'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_IDEA', 'V_STATECODE',
        'V_STATENAME', 'V_STATECOLOR', 'V_GUID', 'V_EQUSITE1', 'D_DATE_EDITTIME', 'V_EDIT_GUID', 'V_SOURCE_GRADE', 'V_EQUCHILDCODE',
        'V_INPERCODE', 'V_INPERNAME', 'V_BZ', 'V_REPAIRMAJOR_CODE', 'V_HOUR', 'V_FLAG'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'dxfile/PM_03_PROJECT_DEFECT_SEL_ALL',
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
        {text: '设备名称',width: 140, dataIndex: 'V_EQUNAME', align: 'center',renderer:atleft},
        {text: '缺陷类型',width: 120, dataIndex: 'V_SOURCENAME', align: 'center',renderer:atleft},
        {text: '缺陷内容',width: 300, dataIndex: 'V_DEFECTLIST', align: 'center',renderer:atleft},
        {text: '缺陷日期',width: 140, dataIndex: 'D_DEFECTDATE', align: 'center',renderer:atleft},
        {text: '删除',width: 120,  align: 'center',renderer:DelDefect}
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

    Ext.data.StoreManager.lookup('gridStore').load({
        params:{
            V_V_PROJECT_GUID:Guid
        }
    })

}


function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

//删除缺陷
function DelDefect(value, metaData, record){
    return '<a href="#" onclick="_deleteDefect(\'' + record.data.V_GUID + '\')">' + '删除' + '</a>';
}

function _deleteDefect(DefectGuid){
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_DEFECT_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_PROJECT_GUID:Guid,
            V_V_DEFECT_GUID:DefectGuid
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.V_INFO=='SUCCESS'){
                // QueryPageLoad();
                //写入缺陷-维修计划日志
                Ext.Ajax.request({
                    url:AppUrl+'dxfile/PROJECT_BY_DEFECT_LOG_IN',
                    method:'POST',
                    params:{
                        V_PROGUID:Guid,
                        V_DEFECTGUID:DefectGuid,
                        V_PERCODE:Ext.util.Cookies.get("v_personcode"),
                        V_DEPT:Ext.util.Cookies.get("v_deptcode"),
                        V_ORG:Ext.util.Cookies.get("v_orgCode"),
                        V_STATE:'DEL'
                    },
                    success:function (response){
                        var resp=Ext.decode(response.responseText);
                    }
                });
                //修改缺陷状态
                Ext.Ajax.request({
                    url: AppUrl + 'cjy/PRO_PM_DEFECT_STATE_SET',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_GUID: DefectGuid,
                        V_V_STATECODE: '10'//未处理

                    },
                    success: function (ret) {
                        var resp = Ext.decode(ret.responseText);
                        if(resp.V_INFO=='success'){
                            QueryPageLoad();
                        }else{
                            alert("修改缺陷状态失败");
                        }

                    }
                });
            }else{
                alert("删除失败");
            }
        }
    });
}