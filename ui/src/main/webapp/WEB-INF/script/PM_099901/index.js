var pageSize = 20;
var currentPage = 1;
var PM_220103URL = '/PM_220103/index.html';
var checktabid = 0;
var querytool=true;
Ext.onReady(function () {
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 20,
        autoLoad: false,
        fields: [
            'V_ORDERGUID',
            'V_DBGUID',
            'V_FLOWSTEP',
            'I_STATUS',
            'V_PERCODE',
            'V_IDEA',
            'V_DATE',
            'V_TS',
            'V_FLOWTYPE',
            'V_FLOWCODE',
            'V_FLOWNAME',
            '',
            'V_DEPTNAME',
            'REPAIRDEPT',
            'V_CREATEUSER',
            'V_EQUIP_NO',
            'V_EQUIP_NAME',
            'V_SHORT_TXT',
            'V_URL',
            'D_START_DATE',
            'RN',
            'V_ORDERID'

        ],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'basic/PRO_WO_FLOW_DATA_SEL',
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

    var gridWinStore = Ext.create('Ext.data.Store', {
        id: 'gridWinStore',
        pageSize: 20,
        autoLoad: false,
        fields: [
            'V_PERSONNAME',
            'I_ID',
            'V_ORDERID',
            'V_DBGUID',
            'V_FLOWSTEP',
            'I_STATUS',
            'V_PERCODE',
            'V_IDEA',
            'V_DATE',
            'V_TS',
            'V_FLOWTYPE',
            'V_FLOWCODE',
            'V_FLOWNAME',
            'V_URL',
            'V_FLOWSTEPCODE',
            'D_ENTER_DATE'
        ],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'basic/PRO_WO_FLOW_DATA_DETAIL_SEL',
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
    var fieldpanel = Ext.create('Ext.panel.Panel', {
        id: 'fieldpanel',
        width: '100%',
        //height: 50,
        region: 'north',
        frame: true,
        layout: 'hbox',
        items: [
            {
                xtype: "datefield",
                editable: false,
                id: "begintime",
                fieldLabel: '时间',
                value: Ext.Date.getFirstDateOfMonth(new Date()),
                queryMode: "local",
                labelAlign: 'right',
                labelWidth: 60,
                format: 'Y-m-d',
                style: ' margin: 5px 0px 0px 10px'
            },
            {
                xtype: "datefield",
                editable: false,
                fieldLabel: '至',
                id: "endtime",
                value: new Date(),
                queryMode: "local",
                labelAlign: 'left',
                labelWidth: 18,
                format: 'Y-m-d',
                style: ' margin: 5px 0px 0px 10px'
            },
            {
                xtype: "textfield",
                emptyText: "按工单编号查询",
                id: 'orderid',
                queryMode: "local",
                labelAlign: 'left',
                labelWidth: 56,
                style: ' margin: 5px 0px 0px 10px'
            },
            {
                xtype: 'button',
                icon: imgpath + '/search.png',
                text: '查询',
                style: ' margin: 5px 0px 5px 10px',
                listeners: {click: QueryGrid}
            }, {
                xtype: 'hidden',
                id: 'tabid'
            }]
    });
    var tabpanel = Ext.create("Ext.tab.Panel", {
        id: 'tabpanel',
        //height: 100,
        frame: true,
        width: '100%',
        region: 'center',
        activeTab: 0,
        listeners: {
            tabchange: function () {
                /*Ext.getCmp('gdh').hide();*/
                if (querytool) {
                    Ext.ComponentManager.get("tabid").setValue(Ext
                        .getCmp('tabpanel').getActiveTab().down("hidden")
                        .getValue());
                    Ext.getCmp('page').store.currentPage = 1;
                    Ext.data.StoreManager.lookup('gridStore').load();
                } else {
                    /*if(Ext.getCmp('tabpanel').getActiveTab().id.substring(8)==0){
                        Ext.ComponentManager.get("tabid").setValue(Ext
                            .getCmp('tabpanel').getActiveTab().down("hidden")
                            .getValue());
                        Ext.getCmp('page').store.currentPage = 1;
                        Ext.data.StoreManager.lookup('gridStore').load();
                    }else{*/
                        Ext.ComponentManager.get("tabid").setValue(Ext
                            .getCmp('tabpanel').getActiveTab().down("hidden")
                            .getValue());
                    /*}*/

                }

            }
           }
        });

    var northPanel = Ext.create('Ext.form.Panel', {
        id: 'northPanel',
        region: 'north',
        frame: true,
        height: 90,
        width: '100%',
        layout: 'border',
        baseCls: 'my-panel-no-border',
        items: [fieldpanel, tabpanel
        ]
    });


    var gridPanel = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel',
        width: '100%',
        //height:300,
        region: 'center',
        frame: true,
        border: true,
        columnLines: true,
        store: 'gridStore',
        columns: [
            {
                xtype: 'rownumberer',
                width: 35,
                text: '序号',
                sortable: false
            }, {
                text: '操作',
                dataIndex: 'V_ORDERID',
                width: 155,
                align: 'center',
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return '<a href=javascript:dealWith(\'' + record.data.V_URL + '\',\'' + record.data.V_ORDERID + '\',\'' + record.data.V_DBGUID + '\',\'' + record.data.V_ORDERGUID + '\',\'' + record.data.V_FLOWSTEP + '\',\'' + record.data.V_FLOWTYPE + '\')>' + '办理' + '</a>&nbsp;&nbsp;&nbsp;<a href="#" onclick="addEdit(\'' + record.data.V_ORDERGUID + '\')">' + '查看流程' + '</a>';
                }
            }, {
                text: '工单编号',
                width: 190,
                dataIndex: 'V_ORDERID',
                align: 'center'
            }, {
                text: '流程步骤',
                width: 250,
                dataIndex: 'V_FLOWSTEP',
                align: 'center'
            }, {
                text: '摘要',
                width: 190,
                dataIndex: 'V_SHORT_TXT',
                align: 'center'
            }, {
                text: '作业区',
                width: 150,
                dataIndex: 'V_DEPTNAME',
                align: 'center'
            }, {
                text: '检修作业区',
                width: 150,
                dataIndex: 'REPAIRDEPT',
                align: 'center'
            }, {
                text: '发起人',
                width: 150,
                dataIndex: 'V_CREATEUSER',
                align: 'center'
            }, {
                text: '发起时间',
                width: 200,
                dataIndex: 'D_START_DATE',
                align: 'center',
                renderer: rendererTime
            }
        ],
        bbar: ["->",
            {
                id: 'page',
                xtype: 'pagingtoolbar',
                store: gridStore,
                width: '100%',
                dock: 'bottom',
                displayInfo: true,
                displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                emptyMsg: '没有记录'
            }
        ]
    });


    var win = Ext.create('Ext.window.Window', {
        closeAction: 'show',
        closable: true,// 是否有关闭
        id: 'win',
        height: 300,
        width: 800,
        modal: true,
        frame: true,
        region: 'center',
        title: '查看流程',
        layout: 'fit',
        items: [
            {
                xtype: 'grid',
                id: 'grid1',
                store: gridWinStore,
                height: "100%",
                border: true,
                columnLines: true,
                region: 'center',
                width: '100%',
                columns: [

                    {
                        xtype: 'rownumberer',
                        width: 35,
                        text: '序号',
                        sortable: false
                    }, {
                        text: '流程步骤',
                        width: '23%',
                        dataIndex: 'V_FLOWSTEP',
                        align: 'center'
                    }, {
                        text: '操作人',
                        width: '23%',
                        dataIndex: 'V_PERSONNAME',
                        align: 'center'
                    }, {
                        text: '审批意见',
                        width: '23%',
                        dataIndex: 'V_IDEA',
                        align: 'center'
                    }, {
                        text: '审批时间',
                        width: '24%',
                        dataIndex: 'V_DATE',
                        align: 'center'
                    }

                ]
            }

        ]

    });


    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [northPanel,
            gridPanel]
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_D_BEGINTIME: Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(), 'Y/m/d'),
            V_D_ENDTIME: Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y/m/d'),
            V_V_GDH: Ext.ComponentManager.get("orderid").getValue(),
            V_V_FLOWTYPE: Ext.ComponentManager.get("tabid").getValue(),
            V_I_PAGE: Ext.getCmp('page').store.currentPage,
            V_I_PAGENUMBER: Ext.getCmp('page').store.pageSize

        }
    });

    OnPageLoad();
});
function OnPageLoad(){
    Ext.ComponentManager.get('tabpanel').removeAll();

    Ext.Ajax.request({
        url: AppUrl + 'basic/PRO_FLOW_TYPE_PERNUM_SEL',
        method: 'POST',
        async: false,
        params: {
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_D_BEGINTIME: Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(), 'Y-m-d'),
            V_D_ENDTIME: Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y-m-d')
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);

            resp = resp.list;

            for (i = 0; i < resp.length; i++) {
                Ext.ComponentManager.get("tabpanel").add({
                    id: 'tabpanel' + i,
                    title: resp[i].V_FLOWTYPE_NAMENUM,
                    items: [{
                        xtype: 'hidden',
                        value: resp[i].V_FLOWTYPE_CODE
                    }]
                });
            }
            Ext.ComponentManager.get("tabpanel")
                .setActiveTab(checktabid);
        }
    });

}

function OnSearch() {
    querytool = false;
    Ext.ComponentManager.get('tabpanel').removeAll();

    Ext.Ajax.request({
        url: AppUrl + 'basic/PRO_FLOW_TYPE_PERNUM_SEL',
        method: 'POST',
        async: false,
        params: {
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_D_BEGINTIME: Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(), 'Y-m-d'),
            V_D_ENDTIME: Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y-m-d')
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);

            resp = resp.list;

            for (i = 0; i < resp.length; i++) {
                Ext.ComponentManager.get("tabpanel").add({
                    id: 'tabpanel' + i,
                    title: resp[i].V_FLOWTYPE_NAMENUM,
                    items: [{
                        xtype: 'hidden',
                        value: resp[i].V_FLOWTYPE_CODE
                    }]
                });
            }
            Ext.ComponentManager.get("tabpanel")
                .setActiveTab(checktabid);
            querytool = true;
        }
    });


}
function dealWith(URL, V_ORDERID, V_DBGUID, V_ORDERGUID, V_FLOWSTEP, V_FLOWTYPE) {
    checktabid = parseInt(Ext.getCmp('tabpanel').getActiveTab().id.substring(8));
    var owidth = window.document.body.offsetWidth - 800;
    var oheight = window.document.body.offsetHeight - 200;
    if (V_FLOWTYPE == 'WORK') {
        window.open(AppUrl + "page" + URL + "?V_ORDERID=" + V_ORDERID + "&V_DBGUID=" + V_DBGUID + "&V_ORDERGUID=" + V_ORDERGUID + "&V_FLOWSTEP=" + V_FLOWSTEP,
            "", 'height=' + 600 + ',width=' + 1000 + ',top=10px,left=10px,resizable=yes');
    } else {
        window.open(AppUrl + "page" + URL + "?V_GUID=" + V_ORDERGUID + '&random=' + Math.random(),
            "", 'height=' + 600 + ',width=' + 1000 + ',top=10px,left=10px,resizable=yes');
    }


}
function addEdit(id) {

    Ext.data.StoreManager.lookup('gridWinStore').load({
        params: {
            V_V_ORDERID: id,
            V_V_DEPTCODE: Ext.util.Cookies.get('v_deptcode')
        }
    });
    Ext.getCmp('win').show();
}

function QueryGrid() {

    tabIndex = parseInt(Ext.getCmp('tabpanel').getActiveTab().id.substring(8));
    OnSearch();

    //Ext.getCmp('page').store.currentPage = 1;
    //Ext.data.StoreManager.lookup('gridStore').load();
    Ext.ComponentManager.get("tabpanel").setActiveTab(tabIndex);

    if(Ext.getCmp('tabpanel').getActiveTab().id.substring(8)==0){
        Ext.getCmp('page').store.currentPage = 1;
        Ext.data.StoreManager.lookup('gridStore').load();
    }
}
function rendererTime(value, metaData) {
    //return Ext.Date.format(value, 'Y-m-d');
    return value.split('.0')[0];
}