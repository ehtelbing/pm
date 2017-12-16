var GridModel = Ext.create('Ext.selection.RowModel', {});

var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var tabIndex=0;

Ext.onReady(function () {
    Ext.QuickTips.init();

    var ckstore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'ckstore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl +'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'V_V_PERSONCODE': V_V_PERSONCODE,
                'V_V_DEPTCODE': V_V_DEPTCODE,
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '基层单位'
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
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    var ssbtype = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'ssbtype',
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'qx/PRO_PM_07_DEPTEQUTYPE_PER',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var ssbname = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'ssbname',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'qx/PRO_PM_07_DEPTEQU_PER_DROP',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var sqxzt = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'sqxzt',
        fields: ['V_STATECODE', 'V_STATENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'qx/PRO_PM_07_DEFECT_STATE_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {

            }
        }
    });

    var panel = Ext.create('Ext.form.Panel', {
        id: 'panellow',
        region: 'north',
        width: '100%',
        defaults: {
            style: 'margin:5px 0px 5px 5px',
            labelAlign: 'right'
        },
        layout: {
            type: 'vbox'
        },
        baseCls: 'my-panel-no-border',
        frame:true,
        items: [
            {
                xtype:'panel',
                width: '100%',
                defaults: {
                    style: 'margin:5px 0px 5px 5px',
                    labelAlign: 'right'
                },
                layout:'column',
            items:[{
                id: 'begintime',
                xtype: 'datefield',
                editable: false,
                format: 'Y/m/d',
                value: new Date(new Date().getFullYear(), 0, 1),
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
                baseCls: 'margin-bottom'
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
                baseCls: 'margin-bottom'
            }, {
                id: 'sbtype',
                xtype: 'combo',
                store: ssbtype,
                editable: false,
                fieldLabel: '设备类型',
                labelWidth: 100,
                displayField: 'V_EQUTYPENAME',
                valueField: 'V_EQUTYPECODE',
                queryMode: 'local',
                baseCls: 'margin-bottom'
            }, {
                id: 'sbname',
                xtype: 'combo',
                store: ssbname,
                editable: false,
                fieldLabel: '设备名称',
                labelWidth: 100,
                displayField: 'V_EQUNAME',
                valueField: 'V_EQUCODE',
                queryMode: 'local',
                baseCls: 'margin-bottom'
            }, {
                id: 'qxzt',
                xtype: 'combo',
                store: sqxzt,
                editable: false,
                fieldLabel: '缺陷状态',
                labelWidth: 100,
                displayField: 'V_STATENAME',
                valueField: 'V_STATECODE',
                queryMode: 'local',
                baseCls: 'margin-bottom'
            }, {
                id: 'seltext',
                xtype: 'textfield',
                width: 158,
                emptyText: '缺陷明细模糊搜索',
                margin:'5px 0px 5px 110px'
            }]},

            {
                xtype:'panel',
                width: '100%',
                defaults: {
                    style: 'margin:5px 0px 5px 5px',
                    labelAlign: 'right'
                },
                layout:'column',
                items:[{
            id: 'query',
            xtype: 'button',
            icon: imgpath + '/search.png',
            text: '查询',
            width: 80,
            handler: function () {
                if(Ext.ComponentManager.get("begintime").getValue()>Ext.ComponentManager.get("endtime").getValue()){
                    alert("开始时间不能晚于结束时间");
                    return;
                }
                tabIndex=parseInt(Ext.getCmp('tabpanel').getActiveTab().id.substring(8));

                Ext.getCmp('page').store.currentPage = 1;
                Ext.data.StoreManager.lookup('gridStore').load();
            }
        }, {
            xtype: 'hidden',
            id: 'tabid'
        }, {
            xtype: 'button',
            text: '缺陷统计',
            width: 80,
            listeners: {
                click: GoToBad
            },
            hidden : true
        }, {
            xtype: 'button',
            text: '打印',
            width: 60,
            icon: imgpath + '/printer.png',
            listeners: {
                click: print_btn
            }
        }, {
            xtype: 'button',
            text: '导出excel',
            icon: imgpath + '/excel.gif',
            width: 100,
            listeners: {
                click: OnClickExcelButton
            }
        }]}
            ]
    });
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 20,
        autoLoad: false,
        fields: ['D_DEFECTDATE', 'V_DEFECTLIST', 'V_EQUNAME',
            'V_EQUSITE', 'V_DEPTNAME', 'V_PERNAME', 'V_IDEA',
            'V_STATENAME', 'V_SOURCENAME', 'V_SOURCEID',
            'D_INDATE', 'V_PERCODE', 'V_GUID', 'V_STATECODE',
            'V_STATECOLOR', 'V_ORDERID'],

        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'qx/PRO_PM_07_DEFECT_VIEW_PER',
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

    var gridPanel = Ext.create("Ext.grid.Panel", {
        region: 'center',
        id: 'grid',
        columnLines: true,
        width: '100%',
        store: gridStore,
        selModel: GridModel,
        autoScroll: true,
        height: 400,
        columns: [{
            xtype: 'rownumberer',
            width: 30,
            sortable: false
        }, /*{
            text: '工单号',
            id: 'gdh',
            dataIndex: 'V_ORDERID',
            align: 'center',
            width: 150,
            renderer: ReadGD,
            hidden: true
        },*/ {
            text: '缺陷日期',
            dataIndex: 'D_DEFECTDATE',
            align: 'center',
            width: 200,
            renderer: CreateGridColumnTd
        }, {
            text: '缺陷明细',
            dataIndex: 'V_DEFECTLIST',
            align: 'center',
            width: 300,
            renderer: CreateGridColumnTd
        }, {
            text: '设备',
            dataIndex: 'V_EQUNAME',
            align: 'center',
            width: 170,
            renderer: CreateGridColumnTd
        }, {
            text: '设备位置',
            dataIndex: 'V_EQUSITE',
            align: 'center',
            width: 250,
            renderer: CreateGridColumnTd
        }, {
            text: '单位',
            dataIndex: 'V_DEPTNAME',
            align: 'center',
            width: 100,
            renderer: CreateGridColumnTd
        }, {
            text: '负责人',
            dataIndex: 'V_PERNAME',
            align: 'center',
            width: 100,
            renderer: CreateGridColumnTd
        }, {
            text: '处理意见',
            dataIndex: 'V_IDEA',
            align: 'center',
            renderer: CreateGridColumnTd
        }, {
            text: '缺陷状态',
            dataIndex: 'V_STATENAME',
            align: 'center',
            width: 100,
            renderer: CreateGridColumnTd
        }, {
            text: '缺陷来源',
            dataIndex: 'V_SOURCENAME',
            align: 'center',
            width: 100,
            renderer: CreateGridColumnTd
        }],
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }, {
            xtype: 'label',
            text: '已计划',
            style: ' margin: 0px 0px 0px 10px;color:#FFCC00'
        }, {
            xtype: 'label',
            text: '已接收',
            style: ' margin: 0px 0px 0px 10px;color:#009933'
        }, {
            xtype: 'label',
            text: '已反馈',
            style: ' margin: 0px 0px 0px 10px;color:#6666FF'
        }, {
            xtype: 'label',
            text: '已验收',
            style: ' margin: 0px 0px 0px 10px;color:#333300'
        }, {
            xtype: 'label',
            text: '遗留缺陷',
            style: ' margin: 0px 0px 0px 10px;color:#000000'
        }, {
            xtype: 'label',
            text: '工单驳回',
            style: ' margin: 0px 0px 0px 10px;color:#000000'
        }, {
            xtype: 'label',
            text: '未处理',
            style: ' margin: 0px 0px 0px 10px;color:#FF0000'
        }, {
            xtype: 'label',
            text: '已下票',
            style: ' margin: 0px 0px 0px 10px;color:#FF33CC'
        }, {
            xtype: 'label',
            text: '已消缺',
            style: ' margin: 0px 0px 0px 10px;color:#000000'
        }, {
            xtype: 'label',
            text: '手工消缺',
            style: ' margin: 0px 0px 0px 10px;color:#000000'
        }]
    });

    var tabpanel = Ext.create("Ext.tab.Panel", {
        id: 'tabpanel',
        region: 'center',
        activeTab: 0,
        listeners: {
            tabchange: function () {
                //Ext.getCmp('gdh').hide();
                Ext.ComponentManager.get("tabid").setValue(Ext
                    .getCmp('tabpanel').getActiveTab().down("hidden")
                    .getValue());
                Ext.getCmp('page').store.currentPage = 1;
                gridStore.load({
                    params: {
                        V_D_DEFECTDATE_B : Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(), 'Y/m/d'),
                        V_D_DEFECTDATE_E : Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y/m/d'),
                        V_V_DEPTCODE : Ext.ComponentManager.get("zyq").getValue(),
                        V_V_EQUTYPECODE :  Ext.ComponentManager.get("sbtype").getValue(),
                        V_V_EQUCODE :  Ext.ComponentManager.get("sbname").getValue(),
                        V_V_STATECODE : Ext.ComponentManager.get("qxzt").getValue(),
                        V_V_SOURCECODE : Ext.ComponentManager.get("tabid").getValue(),
                        V_V_DEFECTLIST : Ext.ComponentManager.get("seltext").getValue(),
                        X_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                        V_V_PAGE: Ext.getCmp('page').store.currentPage,
                        V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
                    }
                });
            }
        }
    });

    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel,
            {
                xtype: 'panel',
                region: 'center',
                id: 'testPanel',
                height: 40,
                frame: true,
                region: 'north',
                layout: 'border'
            },
            gridPanel
        ]
    });
    ckstore.on("load", function () {
        Ext.getCmp("ck").select(ckstore.getAt(0));


    });

    Ext.ComponentManager.get("ck").on("change", function () {
        Ext.ComponentManager.get('zyq').getStore().removeAll();
        zyqstore.load({
            params: {
                V_V_PERSONCODE: V_V_PERSONCODE,
                V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE: '[主体作业区]'
            }
        });
    });

    zyqstore.on("load", function () {
        Ext.getCmp("zyq").select(zyqstore.getAt(0));
    });

    Ext.ComponentManager.get("zyq").on("change", function () {
        Ext.ComponentManager.get('sbtype').getStore().removeAll();
        ssbtype.load({
            params: {
                V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT : Ext.getCmp("zyq").getValue()
                //parName: ['V_V_PERSONCODE', 'V_V_DEPTCODENEXT'],
                //parType: ['s', 's'],
                //parVal: [Ext.util.Cookies.get('v_personcode'),
                //    Ext.getCmp("zyq").getValue()],
                //proName: 'PRO_GET_DEPTEQUTYPE_PER',
                //cursorName: 'V_CURSOR'
            }
        });
    });

    ssbtype.on("load", function () {
        Ext.getCmp("sbtype").select(ssbtype.findRecord('V_EQUTYPENAME', '全部'));
        ssbname.load({
            params: {
                //parName: ['V_V_PERSONCODE',
                //    'V_V_DEPTCODENEXT', 'V_V_EQUTYPECODE'],
                //parType: ['s', 's', 's'],
                //parVal: [Ext.util.Cookies.get('v_personcode'),
                //    Ext.getCmp("zyq").getValue(),
                //    Ext.getCmp("sbtype").getValue()],
                //proName: 'pro_get_deptequ_per_drop',
                //cursorName: 'V_CURSOR'
                V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT : Ext.getCmp("zyq").getValue(),
                V_V_EQUTYPECODE : Ext.getCmp("sbtype").getValue()

            }
        });
    });

    Ext.getCmp("sbtype").on("change", function () {
        Ext.ComponentManager.get('sbname').getStore().removeAll();
        ssbname.load({
            params: {
                V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT : Ext.getCmp("zyq").getValue(),
                V_V_EQUTYPECODE : Ext.getCmp("sbtype").getValue()
                //parName: ['V_V_PERSONCODE', 'V_V_DEPTCODENEXT',
                //    'V_V_EQUTYPECODE'],
                //parType: ['s', 's', 's'],
                //parVal: [Ext.util.Cookies.get('v_personcode'),
                //    Ext.getCmp("zyq").getValue(),
                //    Ext.getCmp("sbtype").getValue()],
                //proName: 'PRO_GET_DEPTEQU_PER_DROP',
                //cursorName: 'V_CURSOR'
            }
        });
    });

    var flag = 1;
    ssbname.on("load", function () {
        Ext.getCmp("sbname").select(ssbname.getAt(0));
        if(flag == 1){
            addTab();
            flag++;
        }
    });

    sqxzt.on("load", function () {
        Ext.getCmp("qxzt").select(sqxzt.getAt(0));
        Ext.getCmp("testPanel").add(tabpanel);
    });

    Ext.getCmp('qxzt').on("change", function () {
        if (Ext.ComponentManager.get("qxzt").getValue() == '40') {
            Ext.ComponentManager.get('grid').columns[1].hidden = true;
        } else {
            Ext.ComponentManager.get('grid').columns[1].hidden = false;
        }
    });

});

function itemclick(s, record, item, index, e, eOpts) {
    window.showModalDialog(AppUrl + "/No210302/Index.html?v_guid="
        + Ext.getStore("gridStore").getAt(index).get("V_GUID"), "",
        "dialogHeight:600px;dialogWidth:700px");
}

function addTab() {
    Ext.Ajax.request({
        url: AppUrl + 'qx/PRO_PM_07_DEFECT_SOURCE_COUNT',
        // url : '/NO2102/PRO_PM_DEFECT_SOURCE_COUNT',
        method: 'POST',
        async: false,
        params: {
            V_D_DEFECTDATE_B : Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(), 'Y/m/d'),
            V_D_DEFECTDATE_E : Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y/m/d'),
            V_V_DEPTCODE : Ext.ComponentManager.get("zyq").getValue(),
            V_V_EQUTYPECODE :  Ext.ComponentManager.get("sbtype").getValue(),
            V_V_EQUCODE :  Ext.ComponentManager.get("sbname").getValue(),
            V_V_STATECODE : Ext.ComponentManager.get("qxzt").getValue(),
            V_V_DEFECTLIST : Ext.ComponentManager.get("seltext").getValue(),
            X_PERSONCODE : Ext.util.Cookies.get('v_personcode')
            //parName: ['v_d_defectdate_b', 'v_d_defectdate_e',
            //    'v_v_deptcode', 'v_v_equtypecode', 'v_v_equcode',
            //    'v_v_statecode', 'v_v_defectlist', 'x_personcode'],
            //parType: ['da', 'da', 's', 's', 's', 's', 's', 's'],
            //parVal: [
            //    Ext.Date.format(Ext.ComponentManager
            //            .get("begintime").getValue(),
            //        'Y-m-d'),
            //    Ext.Date.format(Ext.ComponentManager.get("endtime")
            //        .getValue(), 'Y-m-d'),
            //    Ext.ComponentManager.get("zyq").getValue(),
            //    Ext.ComponentManager.get("sbtype").getValue(),
            //    Ext.ComponentManager.get("sbname").getValue(),
            //    Ext.ComponentManager.get("qxzt").getValue(),
            //    Ext.ComponentManager.get("seltext").getValue(),
            //    Ext.util.Cookies.get('v_personcode')],
            //proName: 'pro_pm_defect_source_count_per',
            //cursorName: 'V_CURSOR'
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);

            resp = resp.list;

            for (i = 0; i < resp.length; i++) {
                Ext.ComponentManager.get("tabpanel").add({
                    id : 'tabpanel'+i,
                    title: resp[i].V_SOURCENAME,
                    items: [{
                        xtype: 'hidden',
                        value: resp[i].V_SOURCECODE
                    }]
                });
            }
            Ext.ComponentManager.get("tabpanel").setActiveTab(0);
        }
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {

        store.proxy.extraParams = {
            V_D_DEFECTDATE_B : Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(), 'Y/m/d'),
            V_D_DEFECTDATE_E : Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y/m/d'),
            V_V_DEPTCODE : Ext.ComponentManager.get("zyq").getValue(),
            V_V_EQUTYPECODE :  Ext.ComponentManager.get("sbtype").getValue(),
            V_V_EQUCODE :  Ext.ComponentManager.get("sbname").getValue(),
            V_V_STATECODE : Ext.ComponentManager.get("qxzt").getValue(),
            V_V_SOURCECODE : Ext.ComponentManager.get("tabid").getValue(),
            V_V_DEFECTLIST : Ext.ComponentManager.get("seltext").getValue(),
            X_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize

        }
    });
}

function GoToBad() {
    window.parent.append('No2105', '缺陷统计', AppUrl + '/No2105/Index.html');
}

function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;color:" + store.getAt(rowIndex).get('V_STATECOLOR');
    if(value == null){
        return '<div data-qtip="' + value + '" ></div>';
    }
    else{
        return '<div data-qtip="' + value + '" >' + value + '</div>';
    }

}

function ReadGD(value, metaData) {
    if (Ext.getCmp('tabid').getValue() == 'defct01') {
        Ext.getCmp('gdh').show();
        return '<div><a href="javascript:OnClickGD(\'' + value + '\')">' + value + '</a></div>';
    } else {
        Ext.getCmp('gdh').hide();
    }
}

function OnClickGD(value) {
    try {
        window.parent.append('411001', '检修工单验收明细', APP
            + '/page/No411001/Index.html?V_GUID='
            + value
            + '');
    } catch (e) {
        var ret = window.showModalDialog(APP
            + "/page/No411001/Index.html?V_GUID="
            + value,
            "", "dialogHeight:700px;dialogWidth:1100px");
    }
}

function OnClickExcelButton() {
    var V_V_EQUTYPECODE=Ext.ComponentManager.get("sbtype").getValue()=='%'?'':Ext.ComponentManager.get("sbtype").getValue();
    var V_V_EQUCODE=Ext.ComponentManager.get("sbname").getValue()=='%'?'':Ext.ComponentManager.get("sbname").getValue();
    var V_V_STATECODE=Ext.ComponentManager.get("qxzt").getValue()=='%'?'':Ext.ComponentManager.get("qxzt").getValue();
    document.location.href=AppUrl + 'excel/QX_EXCEL?V_D_DEFECTDATE_B='+Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(), 'Y/m/d')+
        '&V_D_DEFECTDATE_E='+Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y/m/d')+
        '&V_V_DEPTCODE='+Ext.ComponentManager.get("zyq").getValue()+
        '&V_V_EQUTYPECODE='+V_V_EQUTYPECODE+
        '&V_V_EQUCODE='+ V_V_EQUCODE+
        '&V_V_STATECODE='+ V_V_STATECODE+
        '&V_V_SOURCECODE='+Ext.ComponentManager.get("tabid").getValue()+
        '&V_V_DEFECTLIST='+ Ext.ComponentManager.get("seltext").getValue()+
        '&X_PERSONCODE='+Ext.util.Cookies.get('v_personcode')+
        '&V_V_PAGE='+Ext.getCmp('page').store.currentPage+
        '&V_V_PAGESIZE='+Ext.getCmp('page').store.pageSize;
}
function print_btn() {

    /*var V_D_DEFECTDATE_B = Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(), 'Y/m/d');
    var V_D_DEFECTDATE_E = Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y/m/d');
    var V_V_DEPTCODE = Ext.ComponentManager.get("zyq").getValue();
    var V_V_EQUTYPECODE = Ext.ComponentManager.get("sbtype").getValue();
    var V_V_EQUCODE = Ext.ComponentManager.get("sbname").getValue();
    var V_V_STATECODE = Ext.ComponentManager.get("qxzt").getValue();
    var V_V_SOURCECODE = Ext.ComponentManager.get("tabid").getValue();
    var V_V_DEFECTLIST = Ext.ComponentManager.get("seltext").getValue();
    var X_PERSONCODE = Ext.util.Cookies.get('v_personcode');
    var V_V_PAGE = Ext.getCmp('page').store.currentPage;
    var V_V_PAGESIZE = Ext.getCmp('page').store.pageSize;

    window.open(AppUrl + "page/No210101/Index.html?V_D_DEFECTDATE_B=" + V_D_DEFECTDATE_B
        + "&V_D_DEFECTDATE_E=" + V_D_DEFECTDATE_E
        + "&V_V_DEPTCODE=" + V_V_DEPTCODE
        + "&V_V_EQUTYPECODE=" + V_V_EQUTYPECODE
        + "&V_V_EQUCODE=" + V_V_EQUCODE
        + "&V_V_STATECODE=" + V_V_STATECODE
        + "&V_V_SOURCECODE=" + V_V_SOURCECODE
        + "&V_V_DEFECTLIST=" + V_V_DEFECTLIST
        + "&X_PERSONCODE=" + X_PERSONCODE
        + "&V_V_PAGE=" + V_V_PAGE
        + "&V_V_PAGESIZE=" + V_V_PAGESIZE,
        "", 'height=' + 600 + ',width=' + 1000 + ',top=10px,left=10px,resizable=no');*/
   var arr = [];
    arr.push(Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(), 'Y-m-d'));
    arr.push(Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y-m-d'));
    arr.push(Ext.ComponentManager.get("zyq").getValue());
    arr.push(Ext.ComponentManager.get("sbtype").getValue());
    arr.push(Ext.ComponentManager.get("sbname").getValue());
    arr.push(Ext.ComponentManager.get("qxzt").getValue());
    arr.push(Ext.ComponentManager.get("tabid").getValue());
    arr.push(Ext.ComponentManager.get("seltext").getValue());
    arr.push(Ext.util.Cookies.get('v_personcode'));
    arr.push(Ext.getCmp('page').store.currentPage);
    arr.push(Ext.getCmp('page').store.pageSize);


    window.open(AppUrl + "page/No210101/Index.html?retarr=" + arr.toString().replace(/%/g, '@'),
        "", "dialogHeight:700px;dialogWidth:1100px");
}
