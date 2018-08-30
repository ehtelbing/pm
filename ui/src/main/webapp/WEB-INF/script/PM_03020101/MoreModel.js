var Guid="";
if(Ext.urlDecode(location.href.split('?')[1])!=null){
    Guid=Ext.urlDecode(location.href.split('?')[1]).guid==null?"":Ext.urlDecode(location.href.split('?')[1]).guid;
}

var gxStore=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'gxStore',
    fields: ['V_MX_CODE', 'V_MX_NAME', 'V_JXGX_CODE', 'V_JXGX_NAME', 'V_GZZX_CODE','V_JXGX_NR','V_ORDER',
        'V_PERNUM','V_PERTIME','V_JXBZ','V_JXBZ_VALUE_DOWN','V_JXBZ_VALUE_UP','V_JJ_NAME','V_GJ_NAME','V_GZ_NAME','V_WL_NAME',
        'V_WORK_NAME','V_AQCS_NAME','V_JSYQ_NAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'pm_19/PM_1917_JXGX_DATA_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var cgridStore= Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'cgridStore',
    fields: ['ID', 'V_PROJECT_GUID', 'V_MODEL_GUID', 'V_MODEL_NAME', 'V_MODEL_BBH','V_BZ'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_03/PM_03_PLAN_YEAR_MODEL_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var jxgzStore=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'jxgzStore',
    fields: ['V_JXGX_CODE', 'V_PERCODE_DE', 'V_PERNAME_DE', 'V_TS', 'V_DE','V_PERTYPE_DE','V_PERCODE',
        'V_PERNAME','I_ID','V_PERNUM'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'pm_19/PRO_PM_19_WORKDE_GXSEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var jxwlStore=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'jxwlStore',
    fields: ['V_JXGX_CODE', 'V_KFNAME', 'V_WLCODE', 'V_WLSM', 'V_GGXH','V_JLDW','V_PRICE',
        'V_USE_NUM'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'zdh/PM_1917_JXGX_WL_DATA_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
})

var jxjjStore=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'jxjjStore',
    fields: ['V_JXGX_CODE' ,'V_JJ_CODE' ,'V_JJ_NAME' ,'V_JJ_TYPE' , 'V_JJ_TS' ,'V_JJ_DE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'cjy/PRO_PM_1917_JXGX_JJ_DATA_VIEW',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
})

var jxgjStore=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'jxgjStore',
    fields: ['V_JXGX_CODE', 'V_GJ_CODE', 'V_GJ_NAME', 'V_GJ_TYPE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'cjy/PRO_PM_1917_JXGX_GJ_DATA_VIEW',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
})

var jxaqcsStore=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'jxaqcsStore',
    fields: ['V_JXGX_CODE', 'V_AQCS_CODE', 'V_AQCS_NAME', 'V_AQCS_BBH', 'V_AQ_ZYSX','V_AQCS_DETAIL','V_LINK_TIME',
        'V_LINK_PERSON'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'cjy/PRO_PM_1917_JXGX_AQCS_DATA_V',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
})

var jxjsyqStore=Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'jxjsyqStore',
    fields: ['V_JXGX_CODE', 'V_JSYQ_CODE', 'V_JSYQ_NAME', 'V_BJ_IMG', 'V_PART_NUMBER', 'V_PART_NAME', 'V_PART_CODE',
        'V_MATERIAL', 'V_IMGSIZE', 'V_IMGGAP', 'V_VALUE_DOWN', 'V_VALUE_UP', 'V_REPLACE_CYC', 'V_WEIGHT', 'V_IMGCODE', 'V_CONTENT'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'cjy/PRO_PM_1917_JXGX_JSYQ_DATA_V',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
})

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
        {text: '模型名称',width: 200, dataIndex: 'V_MODEL_NAME', align: 'center',renderer:atleft},
        {text: '版本号',width: 140, dataIndex: 'V_MODEL_BBH', align: 'center',renderer:atleft},
        {text: '备注',width: 300, dataIndex: 'V_BZ', align: 'center',renderer:atleft},
        {text: '查看明细',renderer:function(value,metaData,record){
                return '<a href="#" onclick="MXclick(\'' + record.data.V_MODEL_GUID + '\')">'+'查看详细'+'</a>'
            }},
        {text: '删除',width: 120,  align: 'center',renderer:DelModel}
    ]
});

//大修计划检修模型明细
var gxgrid = Ext.create('Ext.grid.Panel', {
    region: 'west',
    id:'gxgrid',
    store:gxStore,
    split: true,
    width:600,
    height:200,
    margin:'0px',
    columnLines: true,
    border: true,
    layout: 'column',
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '工序名称',width: 200, dataIndex: 'V_JXGX_NAME', align: 'center',renderer:atleft},
        {text: '工序内容',width: 300, dataIndex: 'V_JXGX_NR', align: 'center',renderer:atleft}
    ],listeners:{itemclick:QueryGxMx}
});

//检修人员表单
var jxrytool1 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    height:32,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '检修人员',
        { xtype: 'tbfill' },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'}/*,
        {
            xtype: 'button',
            text: '更 多',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Magnifierzoomin'
        }*/
    ]
});
//检修人员表格
var jxgzgrid = Ext.create('Ext.grid.Panel', {
    id:'jxgzgrid',
    store:jxgzStore,
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    height:90,
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '人员编码',width: 160, dataIndex: 'V_PERCODE', align: 'center',renderer:atleft},
        {text: '人员姓名',width: 160, dataIndex: 'V_PERNAME', align: 'center',renderer:atleft},
        {text: '工种名称',width: 160, dataIndex: 'V_PERNAME_DE', align: 'center',renderer:atleft},
        {text: '工种类型',width: 160, dataIndex: 'V_PERTYPE_DE', align: 'center',renderer:atleft},
        {text: '定额',width: 160, dataIndex: 'V_DE', align: 'center',renderer:atleft},
        {text: '台时',width: 160, dataIndex: 'V_TS', align: 'center',renderer:atleft}
    ]
});
//检修工种
var jxgz = Ext.create('Ext.panel.Panel', {
    region:'north',
    border:false,
    frame: false,
    width:'100%',
    renderTo: Ext.getBody(),
    items: [jxrytool1,jxgzgrid]
});
//检修机具表单
var jxjjtool1 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    height:32,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '检修机具',
        { xtype: 'tbfill' },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'}/*,
        {
            xtype: 'button',
            text: '更 多',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Magnifierzoomin'
        },*/
    ]
});
//检修机具表格
var jxjjgrid = Ext.create('Ext.grid.Panel', {
    id:'jxjjgrid',
    store:jxjjStore,
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    height:90,
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '机具名称',width: 160, dataIndex: 'V_JJ_NAME', align: 'center',renderer:atleft},
        {text: '机具类型',width: 160, dataIndex: 'V_JJ_TYPE', align: 'center',renderer:atleft},
        {text: '使用台时',width: 160, dataIndex: 'V_JJ_TS', align: 'center',renderer:atright},
        {text: '定额',width: 160, dataIndex: 'V_JJ_DE', align: 'center',renderer:atright}
    ]
});
//检修机具
var jxjj = Ext.create('Ext.panel.Panel', {
    region:'north',
    border:false,
    frame: false,
    width:'100%',
    renderTo: Ext.getBody(),
    items: [jxjjtool1,jxjjgrid]//
});
//检修工具表单
var jxgjtool1 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    height:32,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '检修工具',
        { xtype: 'tbfill' },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'}/*,
        {
            xtype: 'button',
            text: '更 多',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Magnifierzoomin'
        },*/
    ]
});
//检修工具表格
var jxgjgrid = Ext.create('Ext.grid.Panel', {
    id:'jxgjgrid',
    store:jxgjStore,
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    height:90,
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '工具名称',width: 160, dataIndex: 'V_GJ_NAME', align: 'center',renderer:atleft},
        {text: '工具类型',width: 160, dataIndex: 'V_GJ_TYPE', align: 'center',renderer:atleft}
    ]
});
//检修工具
var jxjj1 = Ext.create('Ext.panel.Panel', {
    region:'north',
    border:false,
    frame: false,
    width:'100%',
    renderTo: Ext.getBody(),
    items: [jxgjtool1,jxgjgrid]//
});
//检修物料表单
var jxwl1tool1 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    //baseCls: 'my-panel-no-border',
    layout: 'column',
    height:32,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '检修物料',
        { xtype: 'tbfill' },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'}/*,
        {
            xtype: 'button',
            text: '更 多',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Magnifierzoomin'
        },*/
    ]
});
//检修物料表格
var jxwlgrid = Ext.create('Ext.grid.Panel', {
    id:'jxwlgrid',
    store:jxwlStore,
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    height:90,
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '物料编码',width: 200, dataIndex: 'V_WLCODE', align: 'center',renderer:atleft},
        {text: '物料名称',width: 200, dataIndex: 'V_WLSM', align: 'center',renderer:atleft},
        {text: '规格型号',width: 200, dataIndex: 'V_GGXH', align: 'center',renderer:atleft},
        {text: '单价',width: 200, dataIndex: 'V_PRICE', align: 'center',renderer:atright},
        {text: '数量',width: 200, dataIndex: 'V_USE_NUM', align: 'center',renderer:atright}
    ]
});
//检修物料
var jxwl = Ext.create('Ext.panel.Panel', {
    region:'north',
    border:false,
    frame: false,
    width:'100%',
    renderTo: Ext.getBody(),
    items: [jxwl1tool1,jxwlgrid]//
});
//检修安全措施表单
var jxaqcstool1 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    layout: 'column',
    height:32,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '检修安全措施',
        { xtype: 'tbfill' },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'}/*,
        {
            xtype: 'button',
            text: '更 多',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Magnifierzoomin'
        },*/
    ]
});
//检修安全措施表格
var jxaqcsgrid = Ext.create('Ext.grid.Panel', {
    id:'jxaqcsgrid',
    store:jxaqcsStore,
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    height:90,
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '安全措施名称',width: 200, dataIndex: 'V_AQCS_NAME', align: 'center',renderer:atleft},
        {text: '安全措施版本号',width: 200, dataIndex: 'V_AQCS_BBH', align: 'center',renderer:atleft}
    ]
});
//检修安全措施
var jxaqcs = Ext.create('Ext.panel.Panel', {
    region:'north',
    border:false,
    frame: false,
    width:'100%',
    renderTo: Ext.getBody(),
    items: [jxaqcstool1,jxaqcsgrid]//
});
//检修技术要求表单
var jxjsyqtool1 = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: false,
    border: false,
    //baseCls: 'my-panel-no-border',
    layout: 'column',
    height:32,
    width:'100%',
    margin:'0',
    bodyStyle:'background:#f2f2f2; border-top:1px solid #d4d4d4 !important; border-left:1px solid #d4d4d4 !important',
    defaults: {labelAlign: 'right'},
    collapsible: false,
    tbar: [
        '检修技术要求',
        { xtype: 'tbfill' },
        { xtype: 'tbseparator',baseCls:'x-toolbar-separator-horizontal', margin:'8 8 5 8'}/*,
        {
            xtype: 'button',
            text: '更 多',
            margin: '5 0 5 0',
            bodyStyle:'float:right;',
            iconCls:'Magnifierzoomin'
        },*/
    ]
});
//检修技术要求表格
var jxjsyqgrid = Ext.create('Ext.grid.Panel', {
    id:'jxjsyqgrid',
    store:jxjsyqStore,
    region: "center",
    split: true,
    width:'100%',
    margin:'0px',
    height:170,
    columnLines: true,
    border: true,
    columns: [
        {xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
        {text: '技术要求名称',width: 200, dataIndex: 'V_JSYQ_NAME', align: 'center',renderer:atleft},
        {text: '零件编号',width: 200, dataIndex: 'V_PART_NUMBER', align: 'center',renderer:atleft},
        {text: '零件名称',width: 200, dataIndex: 'V_PART_NAME', align: 'center',renderer:atleft},
        {text: '零件编码',width: 200, dataIndex: 'V_PART_CODE', align: 'center',renderer:atleft},
        {text: '允许值（上限）',width: 200, dataIndex: 'V_VALUE_UP', align: 'center',renderer:atleft},
        {text: '允许值（下限）',width: 200, dataIndex: 'V_VALUE_DOWN', align: 'center',renderer:atleft},
        {text: '备注',width: 200, dataIndex: 'V_CONTENT', align: 'center',renderer:atleft}
    ]
});
//检修技术要求
var jxjsyq = Ext.create('Ext.panel.Panel', {
    region:'north',
    border:false,
    frame: false,
    width:'100%',
    renderTo: Ext.getBody(),
    items: [jxjsyqtool1,jxjsyqgrid]//
});

//大修计划右边布局
var dxjhsbright = Ext.create('Ext.panel.Panel', {
    region:'east',
    border:false,
    frame: false,
    width:1100,
    renderTo: Ext.getBody(),
    items: [jxgz,jxwl,jxjj,jxjj1,jxaqcs,jxjsyq]
});

//大修计划检修模型明细
var MXclickW = Ext.create('Ext.window.Window', {
    id: 'MXclickW',
    width: 1700,
    height: 800,
    title: '大修计划检修模型明细',
    modal: true,
    frame: true,
    closeAction: 'hide',
    closable: true,
    layout: 'border',
    items: [gxgrid,dxjhsbright]
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
            V_V_PROJECT_GUID:Guid
        }
    })

}
function QueryJxgx(mxguid){
    Ext.data.StoreManager.lookup('gxStore').load({
        params:{
            V_V_JXMX_CODE:mxguid
        }
    })
}
//查看检修模型明细
function MXclick(mxguid){
    QueryJxgx(mxguid);
    Ext.getCmp("MXclickW").show();
}
//查询工序明细
function QueryGxMx(a, record){
    QueryJxgz(record.data.V_JXGX_CODE);
    QueryJxwl(record.data.V_JXGX_CODE);
    QueryJxaqcs(record.data.V_JXGX_CODE);
    QueryJxjj(record.data.V_JXGX_CODE)
    QueryJxgj(record.data.V_JXGX_CODE)
    QueryJxjsyq(record.data.V_JXGX_CODE)
}
//查询工种
function QueryJxgz(mxguid){
    Ext.data.StoreManager.lookup('jxgzStore').load({
        params:{
            V_V_JXGX_CODE:mxguid
        }
    })
}
//查询物料
function QueryJxwl(mxguid){
    Ext.data.StoreManager.lookup('jxwlStore').load({
        params:{
            V_V_JXGX_CODE:mxguid
        }
    })
}
//查询机具
function QueryJxjj(mxguid){
    Ext.data.StoreManager.lookup('jxjjStore').load({
        params:{
            V_V_JXGX_CODE:mxguid
        }
    })
}
//查询工具
function QueryJxgj(mxguid){
    Ext.data.StoreManager.lookup('jxgjStore').load({
        params:{
            V_V_JXGX_CODE:mxguid
        }
    })
}
//查询安全措施
function QueryJxaqcs(mxguid){
    Ext.data.StoreManager.lookup('jxaqcsStore').load({
        params:{
            V_V_JXGX_CODE:mxguid
        }
    })
}
//查询技术要求
function QueryJxjsyq(mxguid){
    Ext.data.StoreManager.lookup('jxjsyqStore').load({
        params:{
            V_V_JXGX_CODE:mxguid
        }
    })
}
//删除检修模型
function DelModel(value, metaData, record){
    return '<a href="#" onclick="_deleteModel(\'' + record.data.V_MODEL_GUID + '\')">' + '删除' + '</a>';
}
function _deleteModel(ModelGuid){
    Ext.Ajax.request({
        url: AppUrl + '/PM_03/PM_03_PLAN_YEAR_MODEL_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_PROJECT_GUID:Guid,
            V_V_MODEL_GUID:ModelGuid
        },
        success: function (resp) {
            var resp=Ext.decode(resp.responseText);
            if(resp.V_INFO=='SUCCESS'){
                QueryModel();
            }else{
                alert("删除失败");
            }
        }
    });
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}