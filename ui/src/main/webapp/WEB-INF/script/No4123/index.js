
Ext.define('Ext.ux.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    async: true,
    doRequest: function (operation, callback, scope) {
        var writer = this.getWriter(),
            request = this.buildRequest(operation);
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        Ext.apply(request, {
            async: this.async,
            binary: this.binary,
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, callback, scope),
            method: this.getMethod(request),
            disableCaching: false
        });
        Ext.Ajax.request(request);
        return request;
    }
});
Ext.define('Ext.grid.column.LineBreakColumn', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.linebreakcolumn',
    initComponent: function() {
        var me = this,
        // 定义customerRenderer变量，保存用户配置的renderer
            customerRenderer = me.renderer;
        if(customerRenderer) {
            // 如果用户配置了renderer，则限制性用户配置的renderer，然后执行默认的内容换行renderer
            me.renderer = function(value, metadata, record, rowIndex, columnIndex, store) {
                value = customerRenderer(value, metadata, record, rowIndex, columnIndex, store);
                value = me.defaultRenderer(value, metadata, record, rowIndex, columnIndex, store);
                return value;
            };
        }
        me.callParent(arguments);
    },
    defaultRenderer: function(value, metadata, record, rowIndex, columnIndex, store) {
        metadata.style = 'white-space: normal; overflow: visible; word-break: break-all;';
        return value;
    }
});
Ext.onReady(function () {
    Ext.QuickTips.init();

    var sblxStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'sblxStore',
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('sblx').select(store.first());
            }
        }
    });

    //表格信息加载
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['V_PERSONCODE',
            'V_PERSONNAME',
            'V_ORGCODE',
            'V_ORGNAME',
            'V_DEPTCODE',
            'V_DEPTNAME',
            'V_EQUCODE',
            'V_EQUNAME',
            'V_EQUSITE',
            'V_EQUSITENAME',
            'V_CBZX',
            'V_CASTNAME',
            'V_EQUTYPECODE',
            'V_EQUTYPENAME',
            'V_ZZS',
            'V_SIZE'
        ],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'No4120/SAP_PM_EQU_P_IMPORT_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        }
    });

    var panel = Ext.create('Ext.Panel', {
        id :'panel',
        region: 'north',
        width: '100%',
        frame: true,
        layout: 'column',
        defaults: { style : 'margin:5px 0px 5px 5px',labelAlign: 'right'},
        items: [{
            xtype: 'combo',
            id: "sblx",
            store: sblxStore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '设备类型',
            displayField: 'V_EQUTYPENAME',
            valueField: 'V_EQUTYPECODE',
            labelWidth: 70/*,
            listeners: {
                select: function (field, newValue, oldValue) {
                    _zyq_sbmc();
                }
            }*/
        },{
            xtype: 'button',
            text: '查询',
            icon: imgpath + '/search.png',
            listeners: {click: QueryGrid}
        }/*,{
            xtype: 'button',
            text: 'Excel导出',
            listeners: {click: OnButtonExcelClicked}
        }*/
        ]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        region: 'center',
        width: '100%',
        pageSize: 5,
        columnLines: true,
        store: gridStore,
        autoScroll: true,
        selType: 'checkboxmodel',
        style: 'text-align:center',
        height: 400,
        columns: [/*{xtype: 'rownumberer', text: '序号', width : 50,align:'center', renderer: renderFontLeft},*/
            {text: '设备编号', width : 150, dataIndex: 'V_EQUCODE', align: 'center', renderer: renderFontLeft},
            {text: '设备名称', width : 160, dataIndex: 'V_EQUNAME', align: 'center', renderer: renderFontLeft},
            {
                text: '台账',
                dataIndex: 'V_ORDERID',
                width: 80,
                align: 'center',
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return '<a href=javascript:dealWith(\'' + record.data.V_URL + '\',\'' + record.data.V_ORDERID + '\',\'' + record.data.V_DBGUID + '\',\'' + record.data.V_ORDERGUID + '\',\'' + record.data.V_FLOWSTEP + '\',\'' + record.data.V_FLOWTYPE + '\')>' + '办理' + '</a>';
                }
            },{
                text: '标准',
                dataIndex: 'V_ORDERID',
                width: 80,
                align: 'center',
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return '<a href=javascript:dealWith(\'' + record.data.V_URL + '\',\'' + record.data.V_ORDERID + '\',\'' + record.data.V_DBGUID + '\',\'' + record.data.V_ORDERGUID + '\',\'' + record.data.V_FLOWSTEP + '\',\'' + record.data.V_FLOWTYPE + '\')>' + '办理' + '</a>';
                }
            },{
                text: '费用',
                dataIndex: 'V_ORDERID',
                width: 80,
                align: 'center',
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return '<a href=javascript:dealWith(\'' + record.data.V_URL + '\',\'' + record.data.V_ORDERID + '\',\'' + record.data.V_DBGUID + '\',\'' + record.data.V_ORDERGUID + '\',\'' + record.data.V_FLOWSTEP + '\',\'' + record.data.V_FLOWTYPE + '\')>' + '办理' + '</a>';
                }
            },{
                text: '工作票',
                dataIndex: 'V_ORDERID',
                width: 80,
                align: 'center',
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return '<a href=javascript:dealWith(\'' + record.data.V_URL + '\',\'' + record.data.V_ORDERID + '\',\'' + record.data.V_DBGUID + '\',\'' + record.data.V_ORDERGUID + '\',\'' + record.data.V_FLOWSTEP + '\',\'' + record.data.V_FLOWTYPE + '\')>' + '办理' + '</a>';
                }
            },{
                text: '人工',
                dataIndex: 'V_ORDERID',
                width: 80,
                align: 'center',
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return '<a href=javascript:dealWith(\'' + record.data.V_URL + '\',\'' + record.data.V_ORDERID + '\',\'' + record.data.V_DBGUID + '\',\'' + record.data.V_ORDERGUID + '\',\'' + record.data.V_FLOWSTEP + '\',\'' + record.data.V_FLOWTYPE + '\')>' + '办理' + '</a>';
                }
            },{
                text: '机具',
                dataIndex: 'V_ORDERID',
                width: 80,
                align: 'center',
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return '<a href=javascript:dealWith(\'' + record.data.V_URL + '\',\'' + record.data.V_ORDERID + '\',\'' + record.data.V_DBGUID + '\',\'' + record.data.V_ORDERGUID + '\',\'' + record.data.V_FLOWSTEP + '\',\'' + record.data.V_FLOWTYPE + '\')>' + '办理' + '</a>';
                }
            }],
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
        items: [panel, grid]
    });
    _zyq_sblx();
});

function renderFontLeft(value, metaData) {
    metaData.style = 'text-align: left';
    var qtip="<span style='font-size: 50px;'>台&nbsp;账<br><br>标&nbsp;准<br><br>费&nbsp;用<br><br>工作票<br><br>人&nbsp;工<br><br>机&nbsp;具</span>";

    return '<div data-qtip="'+qtip+'" >' + (value==null?"":value) + '</div>';

   // return '<div data-qtip="<span>台账<br>标准<br>费用<br>工作票<br>人工<br>机具</span>" >' + (value==null?"":value) + '</div>';

    //return '<a href="javascript:goToCF(\''+rowIndex+'\',\''+record.get('I_ID_ZJ')+'\',\''+record.get('I_ID_HX')+'\',\''+record.get('V_GROUPGUID')+'\')">重新发送</a>';
}

function QueryGrid() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_EQUTYPE: Ext.getCmp('sblx').getValue()
        }
    });
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function dealWith(URL, V_ORDERID, V_DBGUID, V_ORDERGUID, V_FLOWSTEP, V_FLOWTYPE) {
    alert("办理");
    /*checktabid = parseInt(Ext.getCmp('tabpanel').getActiveTab().id.substring(8));
    var owidth = window.document.body.offsetWidth - 800;
    var oheight = window.document.body.offsetHeight - 200;
    if (V_FLOWTYPE == 'WORK') {
        window.open(AppUrl + "page" + URL + "?V_ORDERID=" + V_ORDERID + "&V_DBGUID=" + V_DBGUID + "&V_ORDERGUID=" + V_ORDERGUID + "&V_FLOWSTEP=" + V_FLOWSTEP,
            "", 'height=' + 600 + ',width=' + 1000 + ',top=10px,left=10px,resizable=no');
    } else {
        window.open(AppUrl + "page" + URL + "?V_GUID=" + V_ORDERGUID + '&random=' + Math.random(),
            "", 'height=' + 600 + ',width=' + 1000 + ',top=10px,left=10px,resizable=no');
    }*/


}


function ondetail(a) {
    var V_JXGX_CODE = Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.V_JXGX_CODE;
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_030211/index.html?V_JXMX_CODE=' + a + '&V_JXGX_CODE=' + V_JXGX_CODE, '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,channelmode=yes,resizable=yes');
}
function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}


function OnButtonQueryClicked()
{
    var string ='2017-08-01 05:00:00.0';
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        //V_V_ORGCODE :Ext.util.Cookies.get('v_orgCode'),
        V_V_YEAR :Ext.getCmp('year').getValue(),
        V_V_PLANTYPE :'YEAR',
        V_V_ORGCODE:Ext.getCmp('ck').getValue(),
        V_V_DEPTCODE :Ext.getCmp('zyq').getValue(),
        V_V_EQUTYPE :Ext.getCmp('sblx').getValue(),
        V_V_EQUCODE : Ext.getCmp('sbmc').getValue(),
        V_V_ZY :Ext.getCmp('zy').getValue(),
        V_V_CONTENT :Ext.getCmp('jxnr').getValue(),
        V_V_STATECODE :"%",
        V_V_PEROCDE :Ext.util.Cookies.get('v_personcode')
        /* V_V_PAGE: Ext.getCmp('page').store.currentPage,
         V_V_PAGESIZE: Ext.getCmp('page').store.pageSize,*/

    };
    //flowDicListStore.currentPage = 1;
    gridStore.load();
}

function _ck_zyqload() {
    var zyqStore = Ext.data.StoreManager.lookup('zyqStore');
    zyqStore.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
        'V_V_DEPTCODENEXT': '%',
        'V_V_DEPTTYPE': '主体作业区'
    };
    //matGroupSecondStore.currentPage = 1;
    zyqStore.load();

}

function _zyq_sblx() {
    var sblxStore = Ext.data.StoreManager.lookup('sblxStore');
    sblxStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode')
    };
    //matGroupSecondStore.currentPage = 1;
    sblxStore.load();
}

function _zyq_sbmc() {
    var sbmcStore = Ext.data.StoreManager.lookup('sbmcStore');
    sbmcStore.proxy.extraParams = {
        v_v_personcode: Ext.util.Cookies.get('v_personcode'),
        v_v_deptcodenext: Ext.getCmp('zyq').getValue(),
        v_v_equtypecode: Ext.getCmp('sblx').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    sbmcStore.load();
}

function OnButtonExcelClicked() {

    var ss = '%';
    document.location.href = AppUrl + 'hp/PM_03_EXCEL?V_V_YEAR=' + Ext.ComponentManager.get("year").getValue()
        + '&V_V_PLANTYPE=' + 'YEAR'
        + '&V_V_ORGCODE=' + Ext.ComponentManager.get("ck").getValue()
        + '&V_V_DEPTCODE=' + Ext.ComponentManager.get("zyq").getValue()
        + '&V_V_EQUTYPE=' + Ext.ComponentManager.get("sblx").getValue()
        + '&V_V_EQUCODE=' + Ext.ComponentManager.get("sbmc").getValue()
        + '&V_V_ZY=' + Ext.ComponentManager.get("zy").getValue()
        + '&V_V_CONTENT=' + Ext.ComponentManager.get("jxnr").getValue()
        + '&V_V_STATECODE=' + encodeURI('%')
        + '&V_V_PEROCDE=' + Ext.util.Cookies.get('v_personcode');



}
