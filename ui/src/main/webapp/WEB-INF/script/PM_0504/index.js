var reasonwindow = Ext.create('Ext.window.Window', {
    id: 'reasonwindow',
    width: 400,
    height: 300,
    layout: 'border',
    title: '提交原因',
    modal: true,//弹出窗口时后面背景不可编辑
    frame: true,
    closeAction: 'hide',
    closable: true,
    items: [{
        xtype: 'textarea',
        region : 'center',
        id : 'reason'
    }],
    buttons: [{
        xtype: 'button',
        text: '确定',
        width: 40,
        handler: function () {
            sendToManager();
        }
    },{
        xtype: 'button',
        text: '取消',
        width: 40,
        handler: function () {
            Ext.getCmp('reasonwindow').hide();
        }
    }]
});


var gridStore = Ext.create('Ext.data.Store', {
    id: 'gridStore',
    pageSize: 100,
    autoLoad: false,
    fields: ['V_ORDERGUID', 'V_ORDERID', 'V_SHORT_TXT', 'V_EQUIP_NO',
        'V_EQUIP_NAME', 'V_EQUSITENAME', 'V_SPARE', 'V_ORGNAME','V_CHECKMANSIGN',
        'V_DEPTNAME', 'V_PERSONNAME', 'D_ENTER_DATE', 'V_STATECODE','V_DEPTCODEREPARIR',
        'V_DEPTNAMEREPARIR', 'V_ORDER_TYP_TXT', 'V_STATENAME', 'WX_STATENAME'],

    proxy: {
        type: 'ajax',
        async: false,
        //url: AppUrl + 'zdh/workorder_sel',
        url : AppUrl + 'WorkOrder/PRO_PM_WORKORDER_SELECT_ADMIN',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
var grid = Ext.create('Ext.grid.Panel', {
    xtype: 'gridpanel',
    id: 'grid',
    region: 'center',
    columnLines: true,
    width: '100%',
    store: gridStore,
    autoScroll: true,
    style: ' margin: 0px 0px 0px 0px',
    columns: [{
        xtype: 'rownumberer',
        width: 30,
        sortable: false
    }, {
        text: '工单GUID(隐藏)',
        dataIndex: 'V_ORDERGUID',
        align: 'center',
        hidden: true
    }, {
        text: '工单号',
        dataIndex: 'V_ORDERID',
        width: 150,
        align: 'center',
        renderer: left
    }, {
        text: '工单描述',
        dataIndex: 'V_SHORT_TXT',
        width: 300,
        align: 'center',
        renderer: left
    }, {
        text: '设备编号（隐藏）',
        dataIndex: 'V_EQUIP_NO',
        align: 'center',
        hidden: true
    }, {
        text: '设备名称',
        dataIndex: 'V_EQUIP_NAME',
        width: 130,
        align: 'center',
        renderer: left
    }, {
        text: '设备位置',
        dataIndex: 'V_EQUSITENAME',
        width: 220,
        align: 'center',
        renderer: left
    }, {
        text: '备件消耗',
        dataIndex: 'V_SPARE',
        width: 300,
        align: 'center',
        renderer: left
    }, {
        text: '委托单位',
        dataIndex: 'V_DEPTNAME',
        width: 65,
        align: 'center',
        renderer: left
    }, {
        text: '委托人',
        dataIndex: 'V_CHECKMANSIGN',
        width: 60,
        align: 'center',
        renderer: left
    }, {
        text: '委托时间',
        dataIndex: 'D_ENTER_DATE',
        width: 140,
        align: 'center',
        renderer: left
    }, {
        text: '检修单位',
        dataIndex: 'V_DEPTNAMEREPARIR',
        width: 150,
        align: 'center',
        renderer: left
    }, {
        text: '工单类型描述',
        dataIndex: 'V_ORDER_TYP_TXT',
        width: 100,
        align: 'center',
        renderer: left
    }, {
        text: '工单状态',
        dataIndex: 'WX_STATENAME',
        width: 100,
        align: 'center',
        renderer: left
    }],
    listeners: {
        itemdblclick: itemClick
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        id: 'page',
        displayInfo: true,
        displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
        emptyMsg: '没有记录',
        store: 'gridStore'
    }]
});

var wingridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'wingridStore',
    pageSize: 100,
    fields: ['V_CLASS_CODE', 'V_CLASS_NAME', 'V_DEPTNAME', 'V_SAP_WORKNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'zdh/team_sel',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var windowgrid = Ext.create("Ext.grid.Panel", {
    xtype: 'gridpanel',
    id: 'windowgrid',
    region: 'center',
    columnLines: true,
    width: '100%',
    store: wingridStore,
    autoScroll: true,
    selModel: {      //复选框
        selType: 'checkboxmodel'
    },
    columns: [{
        text: '班组编号 ',
        dataIndex: 'V_CLASS_CODE',
        align: 'center',
        width: 280,
        hidden : true
    }, {
        text: '班组名称',
        dataIndex: 'V_CLASS_NAME',
        align: 'center',
        labelAlign: 'right',
        width: 150
    }, {
        text: '作业区',
        dataIndex: 'V_DEPTNAME',
        align: 'center',
        width: 150
    }],
    bbar: ['->', {
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        displayInfo: true,
        displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
        emptyMsg: '没有记录',
        store: 'wingridStore'
    }]
});

var window = Ext.create('Ext.window.Window', {
    id: 'window',
    width: 600,
    height: 400,
    layout: 'border',
    title: '班组选择',
    modal: true,//弹出窗口时后面背景不可编辑
    frame: true,
    closeAction: 'hide',
    closable: true,
    items: [windowgrid],
    buttons: [{
        xtype: 'button',
        text: '确定',
        width: 40,
        handler: function () {
            teamconfirm();
        }
    }, {
        xtype: 'button',
        text: '取消',
        width: 40,
        handler: function () {
            Ext.getCmp('window').hide();
        }
    }]
});

var ckstore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'ckstore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'zdh/plant_sel',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            IS_V_DEPTCODE: "",
            IS_V_DEPTTYPE: '[基层单位]'
        }
    }
});

var zyqstore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'zyqstore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'zdh/plant_sel',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var sgdzt = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'sgdzt',
    fields: ['V_STATECODE', 'V_STATENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'zdh/workorderstate_sel',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {}
    }
});

var ssblx = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'ssblx',
    fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'zdh/equiptype_sel',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var ssbmc = Ext.create('Ext.data.Store', {
    autoLoad: false,
    storeId: 'ssbmc',
    fields: ['V_EQUCODE', 'V_EQUNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'zdh/equipname_sel',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});


var panel = Ext.create('Ext.form.Panel', {
    id: 'panellow',
    region: 'north',
    defaults: {
        style: 'margin:5px 0px 5px 5px',
        labelAlign: 'right'
    },
    frame:true,
    layout: 'column',
    items: [{
        id: 'begintime',
        xtype: 'datefield',
        editable: false,
        format: 'Y/m/d',
        value: new Date(new Date().getFullYear() + '/'
        + (new Date().getMonth() + 1) + '/' + 1),
        fieldLabel: '时间段选择',
        labelWidth: 100,
        baseCls: 'margin-bottom'
    }, {
        id: 'endtime',
        xtype: 'datefield',
        editable: false,
        format: 'Y/m/d',
        value: new Date(),
        fieldLabel: '至',
        labelWidth: 100
    }, {
        id: 'ck',
        xtype: 'combo',
        store: ckstore,
        editable: false,
        fieldLabel: '厂矿',
        labelWidth: 100,
        displayField: 'V_DEPTNAME',
        valueField: 'V_DEPTCODE',
        queryMode: 'local',
        baseCls: 'margin-bottom',
        listeners: {
            change: function () {
                Ext.data.StoreManager.lookup('zyqstore').load({
                    params: {
                        IS_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                        IS_V_DEPTTYPE: '[主体作业区]'
                    }
                });
            }
        }
    }, {
        id: 'zyq',
        xtype: 'combo',
        store: zyqstore,
        editable: false,
        fieldLabel: '作业区',
        labelWidth: 100,
        displayField: 'V_DEPTNAME',
        valueField: 'V_DEPTCODE',
        queryMode: 'local',
        baseCls: 'margin-bottom',
        listeners: {
            change: function () {
                Ext.data.StoreManager.lookup('ssblx').load({
                    params: {
                        V_V_DEPTCODENEXT: Ext.getCmp("zyq").getValue()
                    }
                });
            }
        }
    }, {
        id: 'gdzt',
        xtype: 'combo',
        store: sgdzt,
        editable: false,
        fieldLabel: '工单状态',
        labelWidth: 100,
        displayField: 'V_STATENAME',
        valueField: 'V_STATECODE',
        queryMode: 'local',
        baseCls: 'margin-bottom'
    }, {
        id: 'sblx',
        xtype: 'combo',
        store: ssblx,
        editable: false,
        fieldLabel: '设备类型',
        labelWidth: 100,
        displayField: 'V_EQUTYPENAME',
        valueField: 'V_EQUTYPECODE',
        queryMode: 'local',
        baseCls: 'margin-bottom',
        listeners: {
            change: function () {
                Ext.data.StoreManager.lookup('ssbmc').load({
                    params: {
                        V_V_DEPTCODENEXT: Ext.getCmp("zyq").getValue(),
                        V_V_EQUTYPECODE: Ext.getCmp("sblx").getValue()
                    }
                });
            }
        }
    }, {
        id: 'sbmc',
        xtype: 'combo',
        store: ssbmc,
        editable: false,
        fieldLabel: '设备名称',
        labelWidth: 100,
        displayField: 'V_EQUNAME',
        valueField: 'V_EQUCODE',
        queryMode: 'local',
        baseCls: 'margin-bottom'
    }, {
        id: 'selshortTxt',
        xtype: 'textfield',
        width: 158,
        emptyText: '工单描述模糊搜索',
        margin:'5px 0px 5px 110px'
    }, {
        id: 'query',
        xtype: 'button',
        icon: imgpath + '/search.png',
        text: '查询',
        width: 80,
        handler: function () {
            //Ext.ComponentManager.get('tabpanel').removeAll();
            // TAB Select
            gridquery();
        }
    }, {
        xtype: 'hidden',
        id: 'tabid'
    }, {
        xtype: 'button',
        text: '提交至主任',
        icon: imgpath + '/arrow.gif',
        width: 100,
        listeners: {
            click: senToManagerWindow
        }
    }, {
        xtype: 'button',
        text: '选择班组',
        icon: imgpath + '/group.png',
        width: 85,
        listeners: {
            click: selecteam
        }
    }]
});
Ext.onReady(function () {

    Ext.QuickTips.init();
    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel, grid]
    });

    sgdzt.on("load", function () {
        Ext.ComponentManager.get('gdzt').store.insert(0, {
            'V_STATECODE': '%',
            'V_STATENAME': '全部'
        });
        Ext.getCmp("gdzt").select(sgdzt.getAt(0));
    });

    Ext.data.StoreManager.lookup('ckstore').on('load', function () {
        Ext.getCmp('ck').select(Ext.data.StoreManager.
            lookup('ckstore').getAt(0));
    });

    Ext.data.StoreManager.lookup('zyqstore').on('load', function () {
        zyqstore.insert(0, {V_DEPTNAME: '全部', V_DEPTCODE: '%'});
        Ext.getCmp('zyq').select(Ext.data.StoreManager.
            lookup('zyqstore').getAt(0));
    });

    Ext.data.StoreManager.lookup('ssblx').on('load', function () {
        Ext.getCmp('sblx').select(Ext.data.StoreManager.
            lookup('ssblx').getAt(0));
    });

    Ext.data.StoreManager.lookup('ssbmc').on('load', function () {
        Ext.getCmp('sbmc').select(Ext.data.StoreManager.
            lookup('ssbmc').getAt(0));
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload',function(store) {
        store.proxy.extraParams.V_D_ENTER_DATE_B = Ext.Date.format(Ext.getCmp( "begintime").getValue(), 'Y-m-d');
        store.proxy.extraParams.V_D_ENTER_DATE_E = Ext.Date.format(Ext.getCmp( "endtime").getValue(), 'Y-m-d');
        store.proxy.extraParams.V_V_ORGCODE = Ext.getCmp( "ck").getValue();
        store.proxy.extraParams.V_V_DEPTCODE = Ext.getCmp( "zyq").getValue();
        store.proxy.extraParams.V_V_DEPTCODEREPARIR ='';
        store.proxy.extraParams.V_V_STATECODE = Ext.getCmp( "gdzt").getValue();
        store.proxy.extraParams.V_EQUTYPE_CODE = Ext.getCmp( "sblx").getValue();
        store.proxy.extraParams.V_EQU_CODE = Ext.getCmp( "sbmc").getValue();
        store.proxy.extraParams.V_DJ_PERCODE ='%';
        store.proxy.extraParams.V_V_SHORT_TXT = Ext.getCmp( "selshortTxt").getValue();
        store.proxy.extraParams.V_V_BJ_TXT = "";
        store.proxy.extraParams.V_V_ORDER_TYP = "AK04";
        store.proxy.extraParams.V_V_PAGE= Ext.getCmp('page').store.currentPage;
        store.proxy.extraParams.V_V_PAGESIZE= Ext.getCmp('page').store.pageSize;
    });
});


function gridquery() {
    Ext.getCmp('page').store.currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore').load();
    /*Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_D_ENTER_DATE_B: Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(), 'Y/m/d'),
            V_D_ENTER_DATE_E: Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y/m/d'),
            V_V_ORGCODE: Ext.ComponentManager.get("ck").getValue(),
            V_V_DEPTCODE: Ext.ComponentManager.get("zyq").getValue(),
            V_V_DEPTCODEREPARIR: "",
            V_V_STATECODE: Ext.ComponentManager.get("gdzt").getValue(),
            V_EQUTYPE_CODE: Ext.ComponentManager.get("sblx").getValue(),
            V_EQU_CODE: Ext.ComponentManager.get("sbmc").getValue(),
            V_DJ_PERCODE: '%',
            V_V_SHORT_TXT: Ext.ComponentManager.get("selshortTxt").getValue(),
            V_V_BJ_TXT: "",
            V_V_ORDER_TYP: "AK04",
            V_V_USERCODE: Ext.util.Cookies.get('v_personcode')
        }
    });*/
}

function senToManagerWindow(){
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if(seldata.length !=1){
        alert("请选择一条工单进行提交");
    }
    else{
        Ext.getCmp('reason').setValue('');
        Ext.getCmp('reasonwindow').show();
    }
}
function sendToManager() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();

    Ext.Ajax.request({
        url: AppUrl + 'zdh/send_manager',
        method: 'POST',
        async: false,
        params: {
            V_V_DEPTREPAIRCODE: '99170208',
            V_V_ORDERGUID: seldata[0].data.V_ORDERGUID,
            V_V_REASON: Ext.getCmp('reason').getValue()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);

            Ext.Ajax.request({
                url: AppUrl + 'zdh/MessageSend',
                method: 'POST',
                async: false,
                params: {
                    V_V_ORDERGUID: seldata[0].data.V_ORDERGUID
                },
                success: function (ret) {
                    var resp = Ext.JSON.decode(ret.responseText);

                }
            });
        }
    });
    Ext.getCmp('reasonwindow').hide();
    gridquery();
}

function selecteam() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length != '1') {
        alert("请选择一条工单进行班组分配");
    }
    else {
        windowquery(seldata[0].data.V_DEPTCODEREPARIR);
        Ext.getCmp('window').show();
    }
}

function teamconfirm() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    var winseldata = Ext.getCmp('windowgrid').getSelectionModel().getSelection();

    Ext.Ajax.request({
        url: AppUrl + 'zdh/send_team',
        method: 'POST',
        async: false,
        params: {
            V_V_TEAMCODE: winseldata[0].data.V_CLASS_CODE,
            V_V_ORDERGUID: seldata[0].data.V_ORDERGUID
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);

            Ext.Ajax.request({
                url: AppUrl + 'zdh/MessageSend',
                method: 'POST',
                async: false,
                params: {
                    V_V_ORDERGUID: seldata[0].data.V_ORDERGUID
                },
                success: function (ret) {
                    var resp = Ext.JSON.decode(ret.responseText);

                }
            });
        }
    });
    Ext.getCmp('window').hide();
    gridquery();
}
function windowquery(teamcode) {
    Ext.data.StoreManager.lookup('wingridStore').load(
        {
            params: {
                IN_DEPARTCODE: teamcode,
                IN_CLASSNAME: ""
            }
        });
}
function itemClick(s, record, item, index, e, eOpts) {
    var owidth = window.document.body.offsetWidth-200;
    var oheight = window.document.body.offsetHeight-100 ;
    var ret = window.open(AppUrl+'page/PM_0501/detail.html?V_ORDERGUID=' + record.data.V_ORDERGUID +  '', '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}

function left(value, metaData) {
    metaData.style = "text-align:left";
    if(value == null){
        return '<div data-qtip="" ></div>';
    }
    else{
        return '<div data-qtip="' + value + '" >' + value + '</div>';
    }
}

function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
