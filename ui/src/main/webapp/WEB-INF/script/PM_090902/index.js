/// <reference path="../Shared/ext-all-debug-w-comments.js" />
var I_ID = -1;
var flag = "";
var V_ORDERGUID = null;
if (location.href.split('?')[1] != undefined) {
    V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
}
var jhygZ = [];//计划用工(总)
var jhwlZ = [];//计划物料(总)
var jjpbZ = [];//机具配备(总)
var aqdcZ = [];//安全对策(总)
var gridStore = Ext.create('Ext.data.Store', {
    id: 'gridStore',
    autoLoad: true,
    fields: ['V_ACTIVITY', 'V_WORK_CENTER', 'V_DESCRIPTION', 'I_WORK_ACTIVITY', 'I_DURATION_NORMAL', 'I_ID',
        'V_JJ_NAME','V_GJ_NAME','V_JSQY_NAME','V_AQSC_NAME','V_GUID'],
    proxy: {
        type: 'ajax',
        url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_OPERATIONS',
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            V_V_ORDERGUID : V_ORDERGUID
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});


var jxgzStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'jxgzStore',
    fields: ['D_DATE_EDITTIME',
        'I_ACTUAL_TIME',
        'I_DURATION_NORMAL',
        'I_ID',
        'I_NUMBER_OF_CAPACITIES',
        'I_NUMBER_OF_PEOPLE',
        'I_WORK_ACTIVITY',
        'V_ACTIVITY',
        'V_CLASS_CODE',
        'V_CLDTYPE',
        'V_CONTENT',
        'V_CONTROL_KEY',
        'V_DE',
        'V_DESCRIPTION',
        'V_DURATION_NORMAL_UNIT',
        'V_EDIT_GUID',
        'V_FACT_VALUE',
        'V_GUID',
        'V_ID',
        'V_JXBZ',
        'V_JXBZ_VALUE_DOWN',
        'V_JXBZ_VALUE_UP',
        'V_JXGX_CODE',
        'V_ORDERGUID',
        'V_PERCODE',
        'V_PERCODE_DE',
        'V_PERNAME',
        'V_PERNAME_DE',
        'V_PERNUM',
        'V_PERTYPE_DE',
        'V_STATE',
        'V_SUB_ACTIVITY',
        'V_TS',
        'V_UN_WORK',
        'V_WORK_CENTER'
],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'cjy/PRO_PM_1917_JXGX_PER_DATA_VIEW',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var jxjjStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'jxjjStore',
    fields: ['V_JJ_CODE',
        'V_JJ_DE',
        'V_JJ_NAME',
        'V_JJ_TS',
        'V_JJ_TYPE',
        'V_JXGX_CODE'],
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
});

var jxgjStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'jxgjStore',
    fields: ['V_JXGX_CODE',
        'V_GJ_CODE',
        'V_GJ_NAME',
        'V_GJ_TYPE'
    ],
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
});

var aqcsStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'aqcsStore',
    fields: ['V_AQCS_CODE', 'V_AQCS_NAME','V_EQUCODE','V_EQUNAME','V_EQUSITE'],
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
});
var gridPanel = Ext.create('Ext.panel.Panel', {
    region: 'north',
    layout: 'border',
    height:'50%',
    width:'100%',
    items: [
        {
            xtype: 'gridpanel',
            id: 'grid',
            title:'人员与工时',
            region: 'center',
            store: 'gridStore',
            columnLines: true,
            //selType: 'checkboxmodel',
            multiSelect: true,
            autoScroll: true,
            columns: [
                { text: '工序', width: 80, align: 'center', dataIndex: 'V_ACTIVITY' },
                { text: '工作中心', width: 90, align: 'center', dataIndex: 'V_WORK_CENTER' },
                { text: '工序内容', width:365, align: 'center', dataIndex: 'V_DESCRIPTION' },
                { text: '额定时间', width: 80, align: 'center', dataIndex: 'I_WORK_ACTIVITY' },
                { text: '额定人数', width: 80, align: 'center', dataIndex: 'I_DURATION_NORMAL' },
                { text: '机具', width: 80, align: 'center', dataIndex: 'V_JJ_NAME' },
                { text: '工具', width: 80, align: 'center', dataIndex: 'V_GJ_NAME' },
                { text: '技术要求', width: 80, align: 'center', dataIndex: 'V_JSQY_NAME'},
                { text: '安全措施', width: 80, align: 'center', dataIndex: 'V_AQSC_NAME'},
                { text: '检修班组', width: 80, align: 'center', dataIndex: 'CLASSNAME'},
                { text: '检修人员', width: 80, align: 'center', dataIndex: 'V_PER_LIST'}
            ],
            listeners: {
                'itemclick': function (a, b, c) {
                    queryjxgzGrid(b.data.V_GUID);
                    queryjxjjGrid(b.data.V_GUID);
                    queryjxgjGrid(b.data.V_GUID);
                    queryaqcsGrid(b.data.V_GUID);

                }
            }
        }
    ]});

var jxgzgrid = Ext.create('Ext.grid.Panel', {
    width: '100%',
    id: 'jxgzgrid',
    store: jxgzStore,
    height: 300,
    style: 'margin:0px 0px 5px 0px',
    autoScroll: true,
    columnLines: true,
    columns: [
        { xtype: 'rownumberer', text: '序号', width: 60, align: 'center'
        },
        {
            text: '工种编码', align: 'center', width: 150, dataIndex: 'V_PERCODE_DE'
        },
        {
            text: '工种名称', align: 'center', width: 150, dataIndex: 'V_PERNAME_DE'
        },
        {
            text: '工种类型', align: 'center', width: 150, dataIndex: 'V_PERTYPE_DE'
        },
        {
            text: '工种定额', align: 'center', width: 150, dataIndex: 'V_DE'
        },
        {
            text: '工时', align: 'center', width: 150, dataIndex: 'V_TS'},
        {
            text: '人数', align: 'center', width: 150, dataIndex: 'V_PERNUM'
        }
    ]
});
var jxjjgrid = Ext.create('Ext.grid.Panel', {
    width: '100%',
    id: 'jxjjgrid',
    store: jxjjStore,
    height: 300,
    style: 'margin:0px 0px 5px 0px',
    autoScroll: true,
    columnLines: true,
    columns: [
        {
            xtype: 'rownumberer', text: '序号', width: 60, align: 'center'
        },
        {
            text: '车辆编码', align: 'center', width: 150, dataIndex: 'V_JJ_CODE'
        },
        {
            text: '车辆名称', align: 'center', width: 150, dataIndex: 'V_JJ_NAME'
        },
        {
            text: '车辆类型', align: 'center', width: 150, dataIndex: 'V_JJ_TYPE'
        },
        {
            text: '车辆定额', align: 'center', width: 150, dataIndex: 'V_JJ_DE'
        },
        {
            text: '车辆台时', align: 'center', width: 150, dataIndex: 'V_JJ_TS'
        }
    ]
});
var jxgjgrid = Ext.create('Ext.grid.Panel', {
    width: '100%',
    id: 'jxgjgrid',
    store: jxgjStore,
    height: 300,
    style: 'margin:0px 0px 5px 0px',
    autoScroll: true,
    columnLines: true,
    columns: [
        { xtype: 'rownumberer', text: '序号', width: 60, align: 'center'
        },
        {
            text: '工具名称', align: 'center', width: 150, dataIndex: 'V_GJ_NAME',renderer:Atleft
        },
        {
            text: '工具类型', align: 'center', width: 150, dataIndex: 'V_GJ_TYPE',renderer:Atleft
        }
    ]
});

var aqcsgrid = Ext.create('Ext.grid.Panel', {
    width: '100%',
    id: 'aqcsgrid',
    store: aqcsStore,
    height: 300,
    style: 'margin:0px 0px 5px 0px',
    autoScroll: true,
    columnLines: true,
    columns: [
        { xtype: 'rownumberer', text: '序号', width: 60, align: 'center'
        },
        {
            text: '安全措施编码', align: 'center', width: 150, dataIndex: 'V_AQCS_CODE'
        },
        {
            text: '安全措施名称', align: 'center', width: 150, dataIndex: 'V_AQCS_NAME'
        }
    ]
});
var panel=Ext.create('Ext.tab.Panel',{
    id:'panel',
    region:'south',
    width:'100%',
    height:'50%',
    //frame:true,
    layout:'border',
    border:false,
    items:[ {
        title: '检修工种',
        layout: 'vbox',
        frame: true,
        border: false,
        items: [jxgzgrid]
    }, {
        title: '检修机具',
        layout: 'vbox',
        frame: true,
        border: false,
        items: [jxjjgrid]
    }, {
        title: '检修工具',
        layout: 'vbox',
        frame: true,
        border: false,
        items: [jxgjgrid]
    }, {
        title: '安全措施',
        layout: 'vbox',
        frame: true,
        border: false,
        items: [aqcsgrid]
    }]
});

function Atleft(value, metaData) {
    metaData.style = 'text-align: left';
    return value;
}
function AtRight(value, metaData) {
    metaData.style = 'text-align: right';
    return value;
}

Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        layout:  'border',
        items: [
            gridPanel,panel]
    });


});
function queryjxgzGrid(gxcode){
    Ext.data.StoreManager.lookup('jxgzStore').load({
        params: {
            V_V_JXGX_CODE:gxcode
        }
    });
}
function queryjxjjGrid(gxcode){
    Ext.data.StoreManager.lookup('jxjjStore').load({
        params: {
            V_V_JXGX_CODE:gxcode
        }
    });
}
function queryjxgjGrid(gxcode){
    Ext.data.StoreManager.lookup('jxgjStore').load({
        params: {
            V_V_JXGX_CODE:gxcode
        }
    });
}
function queryaqcsGrid(gxcode){
    Ext.data.StoreManager.lookup('aqcsStore').load({
        params: {
            V_V_JXGX_CODE:gxcode
        }
    });
}
function guid() {
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
