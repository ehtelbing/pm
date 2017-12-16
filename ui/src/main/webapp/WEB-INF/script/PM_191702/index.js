var V_V_JXGX_CODE = null;
if (location.href.split('?')[1] != undefined) {
    V_V_JXGX_CODE = Ext.urlDecode(location.href.split('?')[1]).V_V_JXGX_CODE;
}

var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    fields: ['V_MX_CODE', 'V_MX_NAME', 'V_JXGX_NAME','V_JXGX_NR','V_WORK_NAME','V_GJ_NAME','V_JJ_NAME',
        'V_PER_NUM','V_PER_DE','V_PER_TS','V_AQCS_NAME','V_JSYQ_NAME','V_JXGX_CODE','V_ORDER','V_GZZX_CODE'],
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

var Layout = {
    layout : 'border',
    items : [
        {
            xtype : 'panel', border : false, region : 'north', layout : 'column', frame: true, baseCls: 'my-panel-no-border',
            defaults: { style: { margin: '5px 0px 5px 10px'}, labelAlign: 'right'},
            items: [
                {xtype: 'textfield', fieldLabel: '', labelWidth: 60, id: 'process',emptyText :'工序名称' },
                { xtype: 'button', text: '查询', handler: queryGrid,  icon: imgpath + '/search.png', style: { margin: ' 5px 0 5px 10px'}},
                { xtype: 'button', text: '选择', handler: function () {
                        Ext.Msg.confirm("提示", "确定要选择？", function (button) {
                            select();
                        })
                },  icon: imgpath + '/add.png', style: { margin: ' 5px 0 5px 10px'}},
            ]
        },
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
                    text: '工作中心', align: 'center', width: 220, dataIndex: 'V_WORK_NAME',renderer :TipRender
                },
                {
                    text: '检修工序内容', align: 'center', width: 150, dataIndex: 'V_JXGX_NR'
                },
                {
                    text: '机具', align: 'center', width: 150, dataIndex: 'V_JJ_NAME',
                    renderer : detailcar
                },
                {
                    text: '工具', align: 'center', width: 150, dataIndex: 'V_GJ_NAME'
                },
                {
                    text: '定额人数', align: 'center', width: 80, dataIndex: 'V_PER_NUM',
                    renderer : detailper
                },
                {
                    text: '定额工时', align: 'center', width: 80, dataIndex: 'V_PER_TS'
                },
                {
                    text: '金额', align: 'center', width: 80, dataIndex: 'V_PER_DE'
                },
                {
                    text: '物料详情', align: 'center', width: 150, dataIndex: 'V_TOOLTYPE'
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

function select(){

}


function queryGrid(){
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_JXMX_CODE : V_MX_CODE
        }
    });
}

function renderFont(value, metaData){
    metaData.style = 'text-align: left';
    return value;
}
Ext.onReady(onPageLoaded);

function onPageLoaded() {
    Ext.create('Ext.container.Viewport', Layout);
}

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