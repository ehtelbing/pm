
Ext.onReady(function() {
    Ext.QuickTips.init();

    var gridStore=Ext.create('Ext.data.Store', {
        id : 'gridStore',
        pageSize : 20,
        autoLoad : false,
        fields : ['V_ID','V_ORG_CODE', 'V_ORG_NAME','V_ASSETS_CODE','V_ASSETS_NAME',
            'V_OTHER_NAME','V_TYPE','V_ORIGIAL_VALUE','V_WEIGHT','V_NET_WORTH','V_FINAL_DATE',
            'V_STATE','V_INSTALL_SITE','V_MAKER','V_NATION','V_MAIN_APPENDIX','V_MAIN_ASSET',
            'V_CHANGE_DATE','V_DISCARDED_DATE','V_SIT','V_POLICE_NUMBER','V_NEW_RATE','V_IMPAIRMENT_AMOUNT'
        ],
        proxy : {
            type : 'ajax',
            async : false,
            url : AppUrl + 'drawingManage/FIXED_ASSETS_SEL',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list',
                total : 'total'
            }
        },

    });

    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        region: 'center',
        width: '100%',
        columnLines: true,
        store: gridStore,
        autoScroll: true,
        selType: 'checkboxmodel',
        style: 'text-align:center',
        height: '100%',
        columns: [{xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text: '单位名称', width: 140, dataIndex: 'V_ORG_NAME', align: 'center', renderer: atleft},
            {text: '资产编码', width: 140, dataIndex: 'V_ASSETS_CODE', align: 'center', renderer: atleft},
            {text: '资产名称', width: 140, dataIndex: 'V_ASSETS_NAME', align: 'center', renderer: atleft},
            {text: '别名', width: 140, dataIndex: 'V_OTHER_NAME', align: 'center', renderer: atleft},
            {text: '规格型号', width: 100, dataIndex: 'V_TYPE', align: 'center', renderer: atleft},
            {text: '原值', width: 100, dataIndex: 'V_ORIGIAL_VALUE', align: 'center', renderer: atleft},
            {text: '重量', width: 100, dataIndex: 'V_WEIGHT', align: 'center', renderer: atleft},
            {text: '净值', width: 100, dataIndex: 'V_NET_WORTH', align: 'center', renderer: atleft},
            {text: '决算日期', width: 80, dataIndex: 'V_FINAL_DATE', align: 'center', renderer: atleft},
            {text: '状态', width: 40, dataIndex: 'V_STATE', align: 'center', renderer: atleft},
            {text: '安装地点', width: 100, dataIndex: 'V_INSTALL_SITE', align: 'center', renderer: atleft},
            {text: '制造厂', width: 100, dataIndex: 'V_MAKER', align: 'center', renderer: atleft},
            {text: '国别', width: 40, dataIndex: 'V_NATION', align: 'center', renderer: atleft},
            {text: '主附配', width: 100, dataIndex: 'V_MAIN_APPENDIX', align: 'center', renderer: atleft},
            {text: '主体资产', width: 100, dataIndex: 'V_MAIN_ASSET', align: 'center', renderer: atleft},
            {text: '变动日期', width: 80, dataIndex: 'V_CHANGE_DATE', align: 'center', renderer: atleft},
            {text: '报废日期', width: 80, dataIndex: 'V_DISCARDED_DATE', align: 'center', renderer: atleft},
            {text: '坐落地', width: 100, dataIndex: 'V_SIT', align: 'center', renderer: atleft},
            {text: '公安编号', width: 100, dataIndex: 'V_POLICE_NUMBER', align: 'center', renderer: atleft},
            {text: '成新率', width: 40, dataIndex: 'V_NEW_RATE', align: 'center', renderer: atleft},
            {text: '减值准备金额', width: 100, dataIndex: 'V_IMPAIRMENT_AMOUNT', align: 'center', renderer: atleft}
        ],
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    var panel=Ext.create('Ext.panel.Panel',{
        id:'panel',
        region:'center',
        width:'40',
        layout:'border',
        border:false,
        items:[{xtype:'panel',frame:true,width:'100%',region:'north',layout:'column',
            items:[{ xtype: 'textfield', id: 'dwmc',  fieldLabel: '单位名称', labelWidth: 60, labelAlign: 'right',style: ' margin: 5px 0px 5px 5px'},
                { xtype: 'textfield', id: 'zcbm',  fieldLabel: '资产编码', labelWidth: 60, labelAlign: 'right',style: ' margin: 5px 0px 5px 5px'},
                { xtype: 'textfield', id: 'zcmc',  fieldLabel: '资产名称', labelWidth: 60, labelAlign: 'right',style: ' margin: 5px 10px 5px 5px'},
                //{xtype : 'textfield',id :'eququery',emptyText : '输入设备名称',width:158,style: ' margin: 5px 0px 5px 70px'},
                {xtype:'button',text:'查询', style: ' margin: 5px 0px 5px 5px',icon: imgpath +'/search.png',handler:Query}

            ]},
            grid]
    });


    Ext.create('Ext.container.Viewport', {
        id : "id",
        layout : 'border',
        items : [panel]
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_V_ORG_CODE:Ext.getCmp('dwmc').getValue(),
            V_V_ASSETS_CODE:Ext.getCmp('zcbm').getValue(),
            V_V_ASSETS_NAME:Ext.getCmp('zcmc').getValue(),
            V_V_PAGE : Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE : Ext.getCmp('page').store.pageSize
        }
    });
    Query();
});

function Query(){

    Ext.getCmp('page').store.currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore').load({
        params:{
            V_V_ORG_CODE:Ext.getCmp('dwmc').getValue(),
            V_V_ASSETS_CODE:Ext.getCmp('zcbm').getValue(),
            V_V_ASSETS_NAME:Ext.getCmp('zcmc').getValue(),
            V_V_PAGE : Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE : Ext.getCmp('page').store.pageSize
        }
    });
}
function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
