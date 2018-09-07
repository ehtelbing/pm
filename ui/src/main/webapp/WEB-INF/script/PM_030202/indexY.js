
var Guid='';
var Year='';
var Orgcode='';
var type='';
if(Ext.urlDecode(location.href.split('?')[1])!=null){
    Guid=Ext.urlDecode(location.href.split('?')[1]).guid==null?"":Ext.urlDecode(location.href.split('?')[1]).guid;
    Year=Ext.urlDecode(location.href.split('?')[1]).Year==null?"":Ext.urlDecode(location.href.split('?')[1]).Year;
    Orgcode=Ext.urlDecode(location.href.split('?')[1]).Orgcode==null?"":Ext.urlDecode(location.href.split('?')[1]).Orgcode;
    type=Ext.urlDecode(location.href.split('?')[1]).type==null?"":Ext.urlDecode(location.href.split('?')[1]).type;
}
Ext.onReady(function () {
    Ext.QuickTips.init();
    //表格信息加载
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 50,
        autoLoad: false,
        fields: ['I_ID', 'V_GUID', 'V_GUID_UP', 'V_YEAR', 'V_MONTH', 'V_ORGCODE', 'V_ORGNAME', 'V_SPECIALTY_ZX', 'V_SPECIALTY_ZXNAME',
            'V_DEPTCODE', 'V_DEPTNAME', 'V_PORJECT_CODE', 'V_PORJECT_NAME', 'V_SPECIALTY', 'V_SPECIALTYNAME', 'V_WBS', 'V_WBS_TXT',
            'V_SPECIALTYMANCODE', 'V_SPECIALTYMAN', 'V_WXTYPECODE', 'V_WXTYPENAME', 'V_CONTENT', 'V_MONEYBUDGET', 'V_JHLB', 'V_SCLB',
            'V_BDATE', 'V_EDATE', 'V_STATE', 'V_FLAG', 'V_INMAN', 'V_INMANCODE', 'V_INDATE', 'V_STATENAME', 'V_LEVEL', 'V_SUMTIME', 'V_SUMDATE',
            'V_CPZL', 'V_CPGX', 'V_SGFS', 'V_ZBFS', 'V_SZ', 'V_SFXJ'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_03/PRO_PM_03_PLAN_PROJECT_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        },
        listeners: {
            beforeload: beforeloadStore
        }
    });

    var panel=Ext.create('Ext.panel.Panel',{
        id: 'panel',
        region: 'north',
        width: '100%',
        frame: true,
        layout: 'column',
        defaults: {
            style: 'margin:5px 0px 5px 5px',
            labelAlign: 'right'
        },
        items: [
            {
                xtype: 'button',
                text: '选择并返回',
                icon: imgpath + '/edit.png',
                listeners: {click: OnButtonSave}
            },
            {
                xtype: 'button',
                text: '关闭',
                icon: imgpath + '/delete.png',
                listeners: {click: OnButtonClose}
            }
        ]
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
        height: 400,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns: [{xtype: 'rownumberer', text: '序号', width: 50, align: 'center'},
            {text: '年份', width: 140, dataIndex: 'V_YEAR', align: 'center', renderer: atleft},
            {text: '工程状态', width: 140, dataIndex: 'V_STATENAME', align: 'center', renderer: atleft},
            {text: '工程编码', width: 200, dataIndex: 'V_PORJECT_CODE', align: 'center', renderer: atleft},
            {text: '工程名称', width: 200, dataIndex: 'V_PORJECT_NAME', align: 'center', renderer: atleft},
            {text: '维修类型', width: 100, dataIndex: 'V_WXTYPENAME', align: 'center', renderer: atleft},
            {text: '专业', width: 100, dataIndex: 'V_SPECIALTYNAME', align: 'center', renderer: atleft},
            {text: '维修内容', width: 300, dataIndex: 'V_CONTENT', align: 'center', renderer: atleft},
            {text: '维修费用', width: 100, dataIndex: 'V_MONEYBUDGET', align: 'center', renderer: atright},
            {text: '开工时间', width: 140, dataIndex: 'V_BDATE', align: 'center', renderer: atleft},
            {text: '竣工时间', width: 140, dataIndex: 'V_EDATE', align: 'center', renderer: atleft}],
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

    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel,grid]
    });
    OnButtonQuery();
});

function beforeloadStore(store) {
    store.proxy.extraParams.V_V_YEAR =Year;
    store.proxy.extraParams.V_V_MONTH = '';
    store.proxy.extraParams.V_V_ORGCODE = Orgcode;
    store.proxy.extraParams.V_V_DEPTCODE = '';
    store.proxy.extraParams.V_V_ZY = '';
    store.proxy.extraParams.V_V_WXLX ='';
    store.proxy.extraParams.V_V_CONTENT ='';
    store.proxy.extraParams.V_V_FLAG = type;
    store.proxy.extraParams.V_V_PAGE = Ext.getCmp('page').store.currentPage;
    store.proxy.extraParams.V_V_PAGESIZE = Ext.getCmp('page').store.pageSize
}

function OnButtonQuery() {
    Ext.data.StoreManager.lookup('gridStore').currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_YEAR: Year,
            V_V_MONTH: '',
            V_V_ORGCODE: Orgcode,
            V_V_DEPTCODE: '',
            V_V_ZY: '',
            V_V_WXLX: '',
            V_V_CONTENT:'',
            V_V_FLAG:type,
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    })
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function OnButtonClose(){
    window.close();
}

function OnButtonSave(){
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length != 1) {
        alert('请选择一条数据');
        return;
    } else {
        Ext.Ajax.request({
            url: AppUrl + '/PM_03/PRO_PM_03_PROJECT_COPY_BYGUID',
            method: 'POST',
            async: false,
            params: {
                V_V_UPGUID: seldata[0].data.V_GUID,
                V_V_GUID: Guid,
                V_V_INPER:Ext.util.Cookies.get('v_personcode')
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                if (resp.V_INFO == 'SUCCESS') {
                     window.opener.QueryPageLoad();
                     window.close();
                } else {
                    alert("添加失败");
                }
            }
        });
    }
}
