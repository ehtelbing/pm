var V_MX_CODE = null;
var V_ORGCODE=null;
var V_DEPTCODE=null;
var V_EQUCODE=null;
if (location.href.split('?')[1] != undefined) {
    V_MX_CODE = Ext.urlDecode(location.href.split('?')[1]).V_MX_CODE;
    V_ORGCODE = Ext.urlDecode(location.href.split('?')[1]).V_ORGCODE;
    V_DEPTCODE = Ext.urlDecode(location.href.split('?')[1]).V_DEPTCODE;
    V_EQUCODE = Ext.urlDecode(location.href.split('?')[1]).V_EQUCODE;
}


var flag = "";


var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    fields: ['V_MX_CODE', 'V_MX_NAME', 'V_JXGX_NAME', 'V_JXGX_NR', 'V_WORK_NAME', 'V_GJ_NAME', 'V_JJ_NAME',
        'V_GZ_NAME',  'V_AQCS_NAME', 'V_JSYQ_NAME', 'V_JXGX_CODE', 'V_ORDER', 'V_GZZX_CODE','V_PERNUM','V_PERTIME',
    'V_WL_NAME'],
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
var WLQuerywin = Ext.create('Ext.window.Window', {
    id: 'WLQuerywin',
    width: 620,
    height: 300,
    layout: 'vbox',
    title: '',
    modal: true,//弹出窗口时后面背景不可编辑
    frame: true,
    closeAction: 'hide',
    closable: true,
    autoScroll : true,
    items: [{xtype:'gridpanel',id:'wlQueryGridPanel',
        width:'100%',columnLines: true,store:wlQueryGridStore,autoScroll: true,region:'center',
        columns:[{ xtype: 'rownumberer', width: 30, sortable: false},
            { text: '备件编码', width: 200, dataIndex: 'V_WLCODE', align: 'center', renderer: atleft },
            { text: '备件名称', width: 260, dataIndex: 'V_WLSM', align: 'center', renderer: atleft },
            { text: '数量', width: 80, dataIndex: 'V_USE_NUM', align: 'center', renderer: atleft }]
    }],
    buttons: [ {
        xtype: 'button',
        text: '关闭',
        width: 40,
        handler: function () {
            cancelWLQ_btn();
        }
    }]
});
var Layout = {
    layout: 'border',
    items: [
        {
            xtype: 'gridpanel', region: 'center', columnLines: true, id: 'grid', store: 'gridStore',
            columns: [
                {
                    xtype: 'rownumberer', text: '序号', width: 60, align: 'center'
                },
                /*{
                    text: '检修模型编码', align: 'center', width: 150, dataIndex: 'V_MX_CODE'
                },*/
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
                    text: '物料详情', align: 'center', width: 150, dataIndex: 'V_WL_NAME',
                    renderer: rendererWL
                },
                {
                    text: '技术要求', align: 'center', width: 150, dataIndex: 'V_JSYQ_NAME'
                },
                {
                    text: '安全措施', align: 'center', width: 150, dataIndex: 'V_AQCS_NAME'
                }
            ]
        }
    ]

};


function onPageLoaded() {
    Ext.QuickTips.init();

    Ext.create('Ext.container.Viewport', Layout);
    queryGrid();
}

function queryGrid() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_JXMX_CODE: V_MX_CODE
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
function renderFont(value, metaData) {
    metaData.style = 'text-align: left';
    return value;
}
Ext.onReady(onPageLoaded);

function detailcar(a, value, metaData) {
    return '<a href="javascript:ondetailcar(\'' + metaData.data.V_JXGX_CODE + '\')">' + a + '</a>';
}


function detailper(a, value, metaData) {
    return '<a href="javascript:ondetailper(\'' + metaData.data.V_JXGX_CODE + '\')">' + a + '</a>';
}

function ondetailper(a) {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_19170102/index.html?V_JXGX_CODE=' + a, '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}

function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function getReturnJXCAR(data) {
    var ss = "";
    for (var i = 0; i < data.length; i++) {
        ss += data[i];
    }
    Ext.getCmp('jxcar').setValue(ss);
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