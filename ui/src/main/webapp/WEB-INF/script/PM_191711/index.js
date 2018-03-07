
var V_MX_CODE = null;
if (location.href.split('?')[1] != undefined) {
    V_MX_CODE = Ext.urlDecode(location.href.split('?')[1]).V_MX_CODE;
}

var flag = "";

var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    fields: ['V_MX_CODE', 'V_MX_NAME', 'V_JXGX_NAME', 'V_JXGX_NR', 'V_WORK_NAME', 'V_GJ_NAME', 'V_JJ_NAME',
        'V_GZ_NAME',  'V_AQCS_NAME', 'V_JSYQ_NAME', 'V_JXGX_CODE', 'V_ORDER', 'V_GZZX_CODE','V_PERNUM','V_PERTIME',
        'V_WL_NAME','V_JXBZ','V_JXBZ_VALUE_DOWN','V_JXBZ_VALUE_UP'],
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


var wlQueryGridStore=Ext.create('Ext.data.Store',{
    id : 'wlQueryGridStore',
    pageSize : 15,
    autoLoad : false,
    fields : [ 'V_JXGX_CODE',
        'V_KFNAME',
        'V_WLCODE',
        'V_WLSM',
        'V_GGXH',
        'V_JLDW',
        'V_PRICE',
        'V_USE_NUM'
    ],
    proxy : {
        type : 'ajax',
        async : false,
        url: AppUrl + 'zdh/PM_1917_JXGX_WL_DATA_SEL',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list',
            total : 'total'
        }
    }
});
var Layout = {
    layout : 'border',
    items : [
        { xtype: 'gridpanel', region: 'center',  columnLines: true, id: 'grid', store: 'gridStore',
            selType : 'checkboxmodel',
            columns: [
                { xtype: 'rownumberer', text: '序号', width: 60, align: 'center'
                },
                {
                    text: '检修模型编码', align: 'center', width: 150, dataIndex: 'V_MX_CODE'
                },
                {
                    text: '检修模型名称', align: 'center', width: 150, dataIndex: 'V_MX_NAME'
                },
                {
                    text: '检修工序名称', align: 'center', width: 150, dataIndex: 'V_JXGX_NAME'
                },
                {
                    text: '工作中心', align: 'center', width: 220, dataIndex: 'V_WORK_NAME', renderer: TipRender
                },
                {
                    text: '检修额定人数', align: 'center', width: 120, dataIndex: 'V_PERNUM'
                },
                {
                    text: '检修额定时间', align: 'center', width: 120, dataIndex: 'V_PERTIME'
                },
                {
                    text: '检修工序内容', align: 'center', width: 150, dataIndex: 'V_JXGX_NR'
                },
                {
                    text: '检修车辆', align: 'center', width: 150, dataIndex: 'V_JJ_NAME',
                    renderer: detailcar
                },
                {
                    text: '检修工具', align: 'center', width: 150, dataIndex: 'V_GJ_NAME'
                },
                {
                    text: '检修工种', align: 'center', width: 80, dataIndex: 'V_GZ_NAME',
                    renderer: detailper
                },

                {
                    text: '物料详情', align: 'center', width: 250, dataIndex: 'V_WL_NAME',
                    renderer: rendererWL
                },
                {
                    text: '技术要求', align: 'center', width: 150, dataIndex: 'V_JSYQ_NAME',hidden:true
                },
                {
                    text: '安全措施', align: 'center', width: 150, dataIndex: 'V_AQCS_NAME'
                },
                {
                    text: ' 允许值(下限)', align: 'center', width: 150, dataIndex: 'V_JXBZ_VALUE_DOWN'
                },
                {
                    text: ' 允许值（上限）', align: 'center', width: 150, dataIndex: 'V_JXBZ_VALUE_UP'
                }
            ]
        }
    ]

};
var wlQueryGridPanel = Ext.create('Ext.grid.Panel', {
    id: 'wlQueryGridPanel',
    //title:'物料详细',
    store: wlQueryGridStore,
    //border: false,
    width:'100%',
    frame:true,
    //baseCls: 'my-panel-no-border',
    height:200,
    columnLines: true,
    region: 'north',
    columns: [{ xtype: 'rownumberer', width: 30},
        { text: '备件编码', width: 200, dataIndex: 'V_WLCODE' },
        { text: '备件名称', width: 260, dataIndex: 'V_WLSM' },
        { text: '数量', width: 80, dataIndex: 'V_USE_NUM'}
    ]

});
var WLQuerywin = Ext.create('Ext.window.Window', {
    id: 'WLQuerywin',
    width: 750,
    height: 500,
    layout: 'border',
    title: '',
    modal: true,//弹出窗口时后面背景不可编辑
    frame: true,
    closeAction: 'hide',
    closable: true,
    autoScroll : true,
    items: [wlQueryGridPanel],
    buttons: [ {
        xtype: 'button',
        text: '关闭',
        width: 40,
        handler: function () {
            cancelWLQ_btn();
        }
    }]
});

function onPageLoaded() {
    Ext.QuickTips.init();

    Ext.create('Ext.container.Viewport', Layout);
    queryGrid();
}

function queryGrid(){
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_JXMX_CODE : V_MX_CODE
        }
    });
}

function loadWLQgrid(V_JXGX_CODE){
    Ext.data.StoreManager.lookup('wlQueryGridStore').load({
        params:{
            V_V_JXGX_CODE:V_JXGX_CODE
        }
    });
}
function renderFont(value, metaData){
    metaData.style = 'text-align: left';
    return value;
}
Ext.onReady(onPageLoaded);

function detailcar(a,value,metaData){
    return '<a href="javascript:ondetailcar(\'' + metaData.data.V_JXGX_CODE + '\')">'+a+'</a>';
}

function ondetailcar(a){
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_19170101/index.html?V_JXGX_CODE=' + a , '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,channelmode=yes,resizable=yes');
}

function detailper(a,value,metaData){
    return '<a href="javascript:ondetailper(\'' + metaData.data.V_JXGX_CODE + '\')">'+a+'</a>';
}

function ondetailper(a){
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_19170102/index.html?V_JXGX_CODE=' + a , '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}


function TipRender(value, metaData, record, rowIndex, colIndex, store) {
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
function rendererWL(a,value, metaData, record, rowIndex, colIndex, store){
    return '<a href="javascript:goToWL(\'' + metaData.data.V_JXGX_CODE + '\')">'+a/*record.raw.V_WL_NAME*/+'</a>';
}
function goToWL(V_JXGX_CODE){
    loadWLQgrid(V_JXGX_CODE);
    Ext.getCmp('WLQuerywin').show();
}
function cancelWLQ_btn() {
    Ext.getCmp('WLQuerywin').hide();
}
function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>' ;
}