var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var tabIndex = 0;
Ext.onReady(function () {
    Ext.QuickTips.init();
    var ckstore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'ckstore',
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
            }
        }
    });
    var fzrper = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'fzrper',
        fields: ['V_PERCODE', 'V_PERNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PRO_DEFECT_PER_VIEW_SEL',
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
        layout: {
            type: 'column'
        },
        frame: true,
        items: [{
            id: 'begintime',
            xtype: 'datefield',
            editable: false,
            format: 'Y/m/d',
            value: Ext.Date.getFirstDateOfMonth(new Date()),
            fieldLabel: '　时间段选择　',
            labelWidth: 100,
            baseCls: 'margin-bottom',
            style: 'margin:5px 0px 5px 0px'
        }, {
            id: 'endtime',
            xtype: 'datefield',
            editable: false,
            format: 'Y/m/d',
            value: new Date(),
            fieldLabel: '至　',
            labelWidth: 100,
            style: 'margin:5px 0px 5px 5px'
        }, {
            id: 'seltext',
            xtype: 'textfield',
            width: 158,
            emptyText: '缺陷明细模糊搜索',
            margin: '5px 0px 5px 60px'
        }, {
            id: 'query',
            xtype: 'button',
            icon: imgpath + '/search.png',
            text: '查询',
            width: 80,
            listeners: {click: addTab}
        }, {
            xtype: 'button',
            text: '缺陷统计',
            width: 80,
            listeners: {
                click: GoToBad
            },
            hidden: true
        }, {
            xtype: 'button',
            text: '打印',
            width: 60,
            icon: imgpath + '/printer.png',
            listeners: {
                click: print_btn
            },
            hidden: true
        }, {
            xtype: 'button',
            text: '导出excel',
            icon: imgpath + '/excel.gif',
            width: 100,
            listeners: {
                click: OnClickExcelButton
            },
        }]
    });
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 50,
        autoLoad: false,
        fields: ['D_DEFECTDATE', 'V_DEFECTLIST', 'V_EQUNAME',
            'V_EQUSITE', 'V_DEPTNAME', 'V_PERNAME', 'V_IDEA',
            'V_STATENAME', 'V_SOURCENAME', 'V_SOURCEID',
            'D_INDATE', 'V_PERCODE', 'V_GUID', 'V_STATECODE',
            'V_STATECOLOR', 'V_ORDERID', 'WEBCODE', 'WBSNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'qx/PRO_PM_07_DEFECT_VIEW_QXGZSEL',
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
        autoScroll: true,
        height: 400,
        columns: [{
            xtype: 'rownumberer',
            width: 30,
            sortable: false
        },
            {
                text: '设备',
                dataIndex: 'V_EQUNAME',
                align: 'center',
                width: 160,
                renderer: CreateGridColumnTd
            }, {
                text: '缺陷明细',
                dataIndex: 'V_DEFECTLIST',
                align: 'center',
                width: 300,
                renderer: CreateGridColumnTd
            }, {
                text: '处理意见',
                dataIndex: 'V_IDEA',
                align: 'center',
                width: 200,
                renderer: CreateGridColumnTd
            },
            {
                text: '缺陷日期',
                dataIndex: 'D_DEFECTDATE',
                align: 'center',
                width: 160,
                renderer: CreateGridColumnTd
            },
            {
                text: '单位',
                dataIndex: 'V_DEPTNAME',
                align: 'center',
                width: 100,
                renderer: CreateGridColumnTd
            },
            {
                text: '负责人',
                dataIndex: 'V_PERNAME',
                align: 'center',
                width: 100,
                renderer: CreateGridColumnTd
            },
            {
                text: '缺陷详情',
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
        listeners: {
            itemdblclick: itemclick
        },
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
        region: 'north',
        frame: true,
        width: '100%',
        listeners: {
            tabchange: function () {
                Ext.getCmp('gdh').hide();
                tabIndex=Ext.getCmp('tabpanel').getActiveTab().id;
                OnButtonQuery();
            }
        }
    });

    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel,  gridPanel]
    });


    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_D_DEFECTDATE_B: Ext.Date.format(Ext.getCmp("begintime").getValue(), 'Y/m/d'),
            V_D_DEFECTDATE_E: Ext.Date.format(Ext.getCmp("endtime").getValue(), 'Y/m/d'),
            V_V_DEPTCODE: Ext.getCmp("zyq").getValue(),
            V_V_EQUTYPECODE: Ext.getCmp("sbtype").getValue(),
            V_V_EQUCODE: Ext.getCmp("sbname").getValue(),
            V_V_STATECODE: Ext.getCmp("qxzt").getValue(),
            V_V_SOURCECODE: tabIndex,
            V_V_DEFECTLIST: Ext.getCmp("seltext").getValue(),
            X_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_FZPERCODE: Ext.getCmp("fzrid").getDisplayValue() == null ? '%' : Ext.getCmp("fzrid").getDisplayValue(),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize

        }
    });

    Ext.data.StoreManager.lookup('ckstore').on("load", function () {
        Ext.getCmp("ck").select(Ext.data.StoreManager.lookup('ckstore').getAt(0));
        Ext.data.StoreManager.lookup('zyqstore').load({
            params: {
                V_V_PERSONCODE: V_V_PERSONCODE,
                V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE: '[主体作业区]'
            }
        });
    });

    Ext.getCmp("ck").on("select", function () {
        Ext.data.StoreManager.lookup('zyqstore').load({
            params: {
                V_V_PERSONCODE: V_V_PERSONCODE,
                V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE: '[主体作业区]'
            }
        });
    });


    Ext.data.StoreManager.lookup('zyqstore').on("load", function () {
        Ext.getCmp("zyq").select(Ext.data.StoreManager.lookup('zyqstore').getAt(0));
        Ext.data.StoreManager.lookup('ssbtype').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp("zyq").getValue()
            }
        });
    });

    Ext.getCmp("zyq").on("select", function () {
        Ext.data.StoreManager.lookup('ssbtype').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp("zyq").getValue()
            }
        });
    });

    Ext.data.StoreManager.lookup('ssbtype').on("load", function () {
        Ext.getCmp("sbtype").select(Ext.data.StoreManager.lookup('ssbtype').findRecord('V_EQUTYPECODE', '%'));
        Ext.data.StoreManager.lookup('ssbname').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp("zyq").getValue(),
                V_V_EQUTYPECODE: Ext.getCmp("sbtype").getValue()

            }
        });
    });

    Ext.getCmp("sbtype").on("select", function () {
        Ext.data.StoreManager.lookup('ssbname').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp("zyq").getValue(),
                V_V_EQUTYPECODE: Ext.getCmp("sbtype").getValue()
            }
        });
    });

    Ext.data.StoreManager.lookup('ssbname').on("load", function () {
        Ext.getCmp("sbname").select(Ext.data.StoreManager.lookup('ssbname').getAt(0));
        Ext.data.StoreManager.lookup('fzrper').load({
            params: {
                V_V_DEPT: Ext.getCmp("zyq").getValue(),
                V_V_EQUTYPE: Ext.getCmp("sbtype").getValue(),
                V_V_EQU: Ext.getCmp("sbname").getValue()
            }
        });
    });

    Ext.getCmp("sbname").on("select", function () {
        Ext.data.StoreManager.lookup('fzrper').load({
            params: {
                V_V_DEPT: Ext.getCmp("zyq").getValue(),
                V_V_EQUTYPE: Ext.getCmp("sbtype").getValue(),
                V_V_EQU: Ext.getCmp("sbname").getValue()
            }
        });
    });

    Ext.data.StoreManager.lookup('fzrper').on('load', function () {
        Ext.data.StoreManager.lookup('fzrper').insert(0, {V_PERCODE: '%', V_PERNAME: '全部'});
        Ext.getCmp("fzrid").select(Ext.data.StoreManager.lookup('fzrper').getAt(0));
        addTab();
    });

    Ext.data.StoreManager.lookup('sqxzt').on("load", function () {
        Ext.getCmp("qxzt").select(Ext.data.StoreManager.lookup('sqxzt').getAt(0));
    });

    Ext.getCmp('qxzt').on("select", function () {
        if (Ext.getCmp("qxzt").getValue() == '40') {
            Ext.getCmp('grid').columns[1].hidden = true;
        } else {
            Ext.getCmp('grid').columns[1].hidden = false;
        }
    });

});

function OnButtonQuery() {
    Ext.getCmp('page').store.currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_D_DEFECTDATE_B: Ext.Date.format(Ext.getCmp("begintime").getValue(), 'Y/m/d'),
            V_D_DEFECTDATE_E: Ext.Date.format(Ext.getCmp("endtime").getValue(), 'Y/m/d'),
            V_V_DEPTCODE: Ext.getCmp("zyq").getValue(),
            V_V_EQUTYPECODE: Ext.getCmp("sbtype").getValue(),
            V_V_EQUCODE: Ext.getCmp("sbname").getValue(),
            V_V_STATECODE: Ext.getCmp("qxzt").getValue(),
            V_V_SOURCECODE: tabIndex,
            V_V_DEFECTLIST: Ext.getCmp("seltext").getValue(),
            X_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_FZPERCODE: Ext.getCmp("fzrid").getDisplayValue() == "" ? '%' : Ext.getCmp("fzrid").getDisplayValue(),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    });
}

function itemclick(s, record, item, index, e, eOpts) {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    window.open(AppUrl + "page/PM_070301/index.html?v_guid="
        + Ext.getStore("gridStore").getAt(index).get("V_GUID"), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');

}

function addTab() {
    Ext.getCmp('tabpanel').removeAll();
    Ext.Ajax.request({
        url: AppUrl + 'qx/PRO_DEFECT_SOURCE_COUNT_SEL',
        method: 'POST',
        async: false,
        params: {
            V_D_DEFECTDATE_B: Ext.Date.format(Ext.getCmp("begintime").getValue(), 'Y/m/d'),
            V_D_DEFECTDATE_E: Ext.Date.format(Ext.getCmp("endtime").getValue(), 'Y/m/d'),
            V_V_DEPTCODE: Ext.getCmp("zyq").getValue(),
            V_V_EQUTYPECODE: Ext.getCmp("sbtype").getValue(),
            V_V_EQUCODE: Ext.getCmp("sbname").getValue(),
            V_V_STATECODE: Ext.getCmp("qxzt").getValue(),
            V_V_DEFECTLIST: Ext.getCmp("seltext").getValue(),
            X_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_FZPERCODE: Ext.getCmp("fzrid").getDisplayValue() == null ? '%' : Ext.getCmp("fzrid").getDisplayValue()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);

            resp = resp.list;

            for (i = 0; i < resp.length; i++) {
                Ext.getCmp("tabpanel").add({
                    id: resp[i].V_SOURCECODE,
                    title: resp[i].V_SOURCENAME
                });
            }
            Ext.getCmp("tabpanel").setActiveTab(tabIndex);
            OnButtonQuery();
        }
    });


}

function GoToBad() {
    window.parent.append('No2105', '缺陷统计', AppUrl + '/No2105/Index.html');
}

function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;color:" + store.getAt(rowIndex).get('V_STATECOLOR');
    if (value == null) {
        return '<div data-qtip="' + value + '" ></div>';
    }
    else {
        return '<div data-qtip="' + value + '" >' + value + '</div>';
    }
}

function ReadGD(value, metaData) {
    if (tabIndex == 'defct01') {
        Ext.getCmp('gdh').show();
        return '<div><a href="javascript:OnClickGD(\'' + value + '\')">' + value + '</a></div>';
    } else {
        Ext.getCmp('gdh').hide();
    }
}

function OnClickGD(value) {
    try {
        window.parent.append('411001', '检修工单验收明细', APP + '/page/No411001/Index.html?V_GUID=' + value + '');
    } catch (e) {
        window.showModalDialog(APP + "/page/No411001/Index.html?V_GUID=" + value, "", "dialogHeight:700px;dialogWidth:1100px");
    }
}

function OnClickExcelButton() {

    var tableName = ["缺陷日期", "缺陷明细", "设备", "设备位置", "单位", "负责人", "处理意见", "缺陷状态", "缺陷来源"];
    var tableKey = ['D_DEFECTDATE', 'V_DEFECTLIST', 'V_EQUNAME', 'V_EQUSITE', 'V_DEPTNAME', 'V_PERNAME', 'V_IDEA', 'V_STATENAME', 'V_SOURCENAME'];

    if (tabIndex == "defct01") {
        tableName = ["工单号", "缺陷日期", "缺陷明细", "设备", "设备位置", "单位", "负责人", "处理意见", "缺陷状态", "缺陷来源"];
        tableKey = ['V_ORDERID', 'D_DEFECTDATE', 'V_DEFECTLIST', 'V_EQUNAME', 'V_EQUSITE', 'V_DEPTNAME', 'V_PERNAME', 'V_IDEA', 'V_STATENAME', 'V_SOURCENAME']
    }
    var parName = ['V_D_DEFECTDATE_B', 'V_D_DEFECTDATE_E', 'V_V_DEPTCODE', 'V_V_EQUTYPECODE', 'V_V_EQUCODE', 'V_V_STATECODE', 'V_V_SOURCECODE', 'V_V_DEFECTLIST', 'x_personcode'];
    var parType = ['da', 'da', 's', 's', 's', 's', 's', 's', 's'];
    var parVal = [
        Ext.Date.format(Ext.getCmp("begintime").getValue(), 'Y-m-d'),
        Ext.Date.format(EExt.getCmp("endtime").getValue(), 'Y-m-d'),
        Ext.getCmp("zyq").getValue(),
        Ext.getCmp("sbtype").getValue(),
        Ext.getCmp("sbname").getValue(),
        Ext.getCmp("qxzt").getValue(),
        tabIndex,
        Ext.getCmp("seltext").getValue(),
        Ext.util.Cookies.get('v_personcode')];

    var proName = 'PRO_PM_07_DEFECT_VIEW_PER';
    var ExcelName = '缺陷浏览';
    var cursorName = 'V_CURSOR';
    var returnStr = ['null'];
    var returnStrName = ['null'];
    var returnStrType = ['null'];

    submitData("ModelExcelTotal", tableName, tableKey, parName, parType,
        parVal, proName, returnStr, returnStrType, returnStrName,
        cursorName, "title", "缺陷浏览");
}

function print_btn() {
    var arr = [];
    arr.push(Ext.Date.format(Ext.getCmp("begintime").getValue(), 'Y-m-d'));
    arr.push(Ext.Date.format(Ext.getCmp("endtime").getValue(), 'Y-m-d'));
    arr.push(Ext.getCmp("zyq").getValue());
    arr.push(Ext.getCmp("sbtype").getValue());
    arr.push(Ext.getCmp("sbname").getValue());
    arr.push(Ext.getCmp("qxzt").getValue());
    arr.push(tabIndex);
    arr.push(Ext.getCmp("seltext").getValue());
    arr.push(Ext.util.Cookies.get('v_personcode'));


    window.showModalDialog(APP + "/page/No210101/Index.html?retarr=" + arr.toString().replace(/%/g, '@'),
        "", "dialogHeight:700px;dialogWidth:1100px");
}
