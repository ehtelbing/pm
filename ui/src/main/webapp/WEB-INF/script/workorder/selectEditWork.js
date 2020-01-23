var tabtool = true;
var querytool = true;
var selectID = [];

var usercode = '';

if (location.href.split('?')[1] != undefined) {
    usercode = Ext.urlDecode(location.href.split('?')[1]).usercode;
}

if (usercode != '') {
    OnPageMMLogin();
}

Ext.onReady(function(){
    var gridStore=Ext.create('Ext.data.Store',{
        id:'gridStore',
        pageSize: 50,
        autoLoad: false,
        fields: ['V_ORDERGUID', 'V_ORDERID', 'V_SHORT_TXT', 'V_EQUIP_NO',
            'V_EQUIP_NAME', 'V_EQUSITENAME', 'V_SPARE', 'V_ORGNAME',
            'V_DEPTNAME', 'V_PERSONNAME', 'D_ENTER_DATE',
            'V_DEPTNAMEREPARIR', 'V_ORDER_TYP_TXT', 'V_STATENAME', 'WORKORDERNUM', 'PLANTIME', 'FACTTIME'],

        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_SELECT_EDIT',
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
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
                'V_V_DEPTCODENEXT': Ext.util.Cookies.get('v_deptcode'),
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

    //检修作业区
    var jxZyqStore = Ext.create("Ext.data.Store", {
        id: 'jxZyqStore',
        autoLoad: false,
        fields: ['V_DEPTREPAIRCODE', 'V_DEPTREPAIRNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/fixdept_sel',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var ssblx = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'ssblx',
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'WorkOrder/PRO_GET_DEPTEQUTYPE_ADMIN',
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
            url: AppUrl + 'WorkOrder/PRO_GET_DEPTEQU_ADMIN',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var sdjy = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'sdjy',
        fields: ['V_PERSONCODE', 'V_PERSONNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'No4120/PRO_BASE_PERSON_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    var northpanel = Ext.create('Ext.panel.Panel',{
        id:'northpanel',
        region:'north',
        layout:'column',
        frame:true,
        defaults:{
            sytle:'margin:5ps 0px 5px 5px',
            labelAlign:'right'
        },
        items:[{
            id:'begintime',
            xtype:'datefield',
            editable:false,
            format:'Y/m/d',
            value:new Date(new Date().getFullYear() + '/' + (new Date().getMonth() + 1)+'/' +1),
            fieldLabel:'时间段选择',
            labelWidth: 80,
            baseCls:'margin-botton'
        },
            {
                id: 'endtime',
                xtype: 'datefield',
                editable: false,
                format: 'Y/m/d',
                value: new Date(),
                fieldLabel: '至',
                labelWidth: 80
            },{
                id: 'ck',
                xtype: 'combo',
                store: ckstore,
                editable: false,
                fieldLabel: '厂矿',
                labelWidth: 80,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local',
                baseCls: 'margin-bottom'
            },
            {
                id: 'zyq',
                xtype: 'combo',
                store: zyqstore,
                editable: false,
                fieldLabel: '作业区',
                labelWidth: 80,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local',
                baseCls: 'margin-bottom'
            },
            {
                id: 'jxzyq',
                xtype: 'combo',
                store: jxZyqStore,
                editable: false,
                fieldLabel: '检修作业区',
                labelWidth: 80,
                displayField: 'V_DEPTREPAIRNAME',
                valueField: 'V_DEPTREPAIRCODE',
                queryMode: 'local',
                baseCls: 'margin-bottom'
            },{
                id: 'sblx',
                xtype: 'combo',
                store: ssblx,
                editable: false,
                fieldLabel: '设备类型',
                labelWidth: 80,
                displayField: 'V_EQUTYPENAME',
                valueField: 'V_EQUTYPECODE',
                queryMode: 'local',
                baseCls: 'margin-bottom'
            },
            {
                id: 'sbmc',
                xtype: 'combo',
                store: ssbmc,
                editable: false,
                fieldLabel: '设备名称',
                labelWidth: 80,
                displayField: 'V_EQUNAME',
                valueField: 'V_EQUCODE',
                queryMode: 'local',
                listConfig: {
                    minWidth: 400
                },
                baseCls: 'margin-bottom'
            },
            {
                id: 'djy',
                xtype: 'combo',
                store: sdjy,
                editable: false,
                fieldLabel: '点检员',
                labelWidth: 80,
                displayField: 'V_PERSONNAME',
                valueField: 'V_PERSONCODE',
                queryMode: 'local',
                baseCls: 'margin-bottom'
            },{id: 'selshortTxt', xtype: 'textfield', width: 158, emptyText: '按工单描述模糊搜索', margin: '5px 0px 5px 90px'},
            {id: 'selmatDesc', xtype: 'textfield', width: 158, emptyText: '按使用物料模糊搜索', margin: '5px 0px 5px 90px'},
            {id: 'workid', xtype: 'textfield', width: 158, emptyText: '按工单号搜索', margin: '5px 0px 5px 90px'},
            {
                id: 'query',
                xtype: 'button',
                margin: '5px 0px 5px 90px',
                icon: '../../images/gif/search.png',
                text: '查询',
                width: 80,
                listeners: {click: QueryGrid}
            },
            {
                xtype: 'button',
                text: '删除',
                margin: '5px 0px 5px 90px',
                icon: imgpath + '/delete1.png',
                width: 80,
                listeners: {click: OnClickDelectWorkEdit }
            },
            {xtype: 'hidden', id: 'tabid'}
        ]
    });
    var gridPanel=Ext.create('Ext.grid.Panel',{
        id:'gridPanel',
        xtype:'gridPanel',
        region:'center',
        columnLines:true,
        width:'100%',
        store:gridStore,
        autoScroll:true,
        selType:'checkboxmodel',
        style: ' margin: 5px 0px 5px 5px',
        columns: [{
            xtype: 'rownumberer',
            width: 30,
            sortable: false
        }, {
            text: '工单号',
            dataIndex: 'V_ORDERID',
            width: 100,
            align: 'center',
            renderer: left
        },
            {
                text: '缺陷详情',
                dataIndex: 'V_ORDERGUID',
                width: 100,
                align: 'center',
                renderer: _defDetail
            },
            {
                text: '附件详情',
                dataIndex: 'V_ORDERGUID',
                width: 100,
                align: 'center',
                renderer: _fjDetail1
            },
            {
                text: '流程明细',
                dataIndex: 'V_ORDERGUID',
                width: 100,
                align: 'center',
                renderer: left,
                renderer: rendererFlow
            },
            // {
            //     text: '子工单数量',
            //     dataIndex: 'WORKORDERNUM',
            //     width: 100,
            //     align: 'center',
            //     renderer: left,
            //     renderer: rendererZGD
            // },
            {
                text: '工单描述',
                dataIndex: 'V_SHORT_TXT',
                width: 300,
                align: 'center',
                renderer: left,
                renderer: CreateGridColumnTd
            }, {
                text: '设备名称',
                dataIndex: 'V_EQUIP_NAME',
                width: 130,
                align: 'center',
                renderer: left,
                renderer: CreateGridColumnTd
            }, {
                text: '设备位置',
                dataIndex: 'V_EQUSITENAME',
                width: 220,
                align: 'center',
                renderer: left,
                renderer: CreateGridColumnTd
            }, {
                text: '备件消耗',
                dataIndex: 'V_SPARE',
                width: 300,
                align: 'center',
                renderer: left,
                renderer: CreateGridColumnTd
            }, {
                text: '委托单位',
                dataIndex: 'V_DEPTNAME',
                width: 150,
                align: 'center',
                renderer: left,
                renderer: CreateGridColumnTd
            }, {
                text: '委托人',
                dataIndex: 'V_PERSONNAME',
                width: 100,
                align: 'center',
                renderer: left
            }, {
                text: '委托时间',
                dataIndex: 'D_ENTER_DATE',
                width: 140,
                align: 'center',
                renderer: left,
                renderer: rendererTime
            }, {
                text: '检修单位',
                dataIndex: 'V_DEPTNAMEREPARIR',
                width: 150,
                align: 'center',
                renderer: left,
                renderer: CreateGridColumnTd
            }, {
                text: '工单类型描述',
                dataIndex: 'V_ORDER_TYP_TXT',
                width: 100,
                align: 'center',
                renderer: left,
                renderer: CreateGridColumnTd
            }, {
                text: '工单状态',
                dataIndex: 'V_STATENAME',
                width: 65,
                align: 'center',
                renderer: left,
                renderer: CreateGridColumnTd
            }, {
                text: '计划工时',
                dataIndex: 'PLANTIME',
                width: 100,
                align: 'center',
                renderer: left
            }, {
                text: '实际工时',
                dataIndex: 'FACTTIME',
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
    var tabpanel = Ext.create("Ext.tab.Panel", {
        id: 'tabpanel',
        region: 'center',
        activeTab: 0,
        listeners: {
            tabchange: function () {
                /*Ext.getCmp('page').store.currentPage = 1;
                gridStore.load();*/
                if (querytool) {
                    Ext.getCmp("tabid").setValue(Ext
                        .getCmp('tabpanel').getActiveTab().down("hidden")
                        .getValue());
                    Ext.getCmp('page').store.currentPage = 1;
                    Ext.data.StoreManager.lookup('gridStore').load();
                } else {
                    Ext.getCmp("tabid").setValue(Ext
                        .getCmp('tabpanel').getActiveTab().down("hidden")
                        .getValue());

                }
            }
        }
    });
    Ext.create('Ext.container.Viewport',{
        id:'id',
        layout:'border',
        items:[northpanel,{xtype: 'panel', id: 'testPanel', region: 'north', height: 40},gridPanel]
    });
    Ext.data.StoreManager.lookup('ckstore').on("load", function () {
        Ext.getCmp("ck").select(Ext.data.StoreManager.lookup('ckstore').getAt(0));
        Ext.data.StoreManager.lookup('zyqstore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp("ck").getValue(),
                'V_V_DEPTCODENEXT': Ext.util.Cookies.get('v_deptcode'),
                'V_V_DEPTTYPE': '[主体作业区]'
            }
        });
    });

    Ext.data.StoreManager.lookup('zyqstore').on("load", function () {

        /*Ext.ComponentManager.get('zyq').store.insert(0, {
            'V_DEPTCODE' : '%',
            'V_DEPTNAME' : '全部'
        });*/
        Ext.getCmp("zyq").select(Ext.data.StoreManager.lookup('zyqstore').getAt(0));
        Ext.data.StoreManager.lookup('ssblx').load({
            params: {
                V_V_DEPTCODENEXT: Ext.getCmp("zyq").getValue()
            }
        });
        Ext.data.StoreManager.lookup('jxZyqStore').load({
            params: {
                V_V_DEPTCODE: Ext.getCmp("zyq").getValue()
            }
        });
    });

    Ext.data.StoreManager.lookup('ssblx').on('load', function () {
        Ext.getCmp("sblx").select(Ext.data.StoreManager.lookup('ssblx').getAt(0));
        Ext.data.StoreManager.lookup('ssbmc').load({
            params: {
                V_V_DEPTCODENEXT: Ext.getCmp("zyq").getValue(),
                V_V_EQUTYPECODE: Ext.getCmp("sblx").getValue()
            }
        });

    });
    Ext.data.StoreManager.lookup('jxZyqStore').on('load', function () {
        Ext.getCmp('jxzyq').store.insert(0, {'V_DEPTREPAIRCODE': '%', 'V_DEPTREPAIRNAME': '全部'});
        Ext.getCmp("jxzyq").select(Ext.data.StoreManager.lookup('jxZyqStore').getAt(0));
    });

    Ext.data.StoreManager.lookup('ssbmc').on('load', function () {
        Ext.getCmp("sbmc").select(Ext.data.StoreManager.lookup('ssbmc').getAt(0));
        Ext.data.StoreManager.lookup('sdjy').load({
            params: {
                V_V_DEPTCODE: Ext.getCmp("zyq").getValue(),
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_ROLE: '01'
            }
        });
    });

    Ext.data.StoreManager.lookup('sdjy').on('load', function () {
        // Ext.getCmp("sdjy").store.insert(0,{
        //     'V_PERSONCODE':'%',
        //     'V_PERSONNAME':'全部'
        // });
        var lan = Ext.getStore('sdjy').data.length - 1;
        Ext.getCmp('djy').select(Ext.data.StoreManager.lookup('sdjy').getAt(lan));
        Ext.getCmp("testPanel").add(tabpanel);
        if (tabtool) {
            addTab();
        }
    });
    function addTab() {
        Ext.getCmp('tabpanel').removeAll();
        Ext.Ajax.request({
            url: AppUrl + 'WorkOrder/PRO_PM_WORKEDITCOUNT_N',
            async: false,
            method: 'POST',
            params: {
                V_D_ENTER_DATE_B: Ext.Date.format(Ext.getCmp("begintime").getValue(), 'Y-m-d'),
                V_D_ENTER_DATE_E: Ext.Date.format(Ext.getCmp("endtime").getValue(), 'Y-m-d'),
                V_V_ORGCODE: Ext.getCmp("ck").getValue(),
                V_V_DEPTCODE: Ext.getCmp("zyq").getValue(),
                V_V_DEPTCODEREPARIR: Ext.getCmp("jxzyq").getValue(),
                V_EQUTYPE_CODE: Ext.getCmp("sblx").getValue(),
                V_EQU_CODE: Ext.getCmp("sbmc").getValue(),
                V_DJ_PERCODE: Ext.getCmp("djy").getValue(),
                V_V_SHORT_TXT: Ext.getCmp("selshortTxt").getValue(),
                V_V_BJ_TXT: Ext.getCmp("selmatDesc").getValue(),
                V_V_WORKID: Ext.util.Format.trim(Ext.getCmp('workid').getValue())
            },
            success: function (ret) {
                var respRoot = Ext.JSON.decode(ret.responseText);
                var resp = respRoot.list;
                var tabdata = [];
                for (var i = 0; i < resp.length; i++) {
                    Ext.getCmp('tabpanel').add({
                        id: resp[i].ORDER_TYP,
                        title: resp[i].ORDER_TYP_TXT,
                        items: [{
                            xtype: 'hidden',
                            value: resp[i].ORDER_TYP
                        }]
                    });
                }
                Ext.getCmp('tabpanel').setActiveTab(0);
            }
        });
    }

    Ext.getCmp("ck").on("select", function () {
        tabtool = false;
        Ext.getCmp('zyq').getStore().removeAll();
        Ext.data.StoreManager.lookup('zyqstore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE: Ext.getCmp("ck").getValue(),
                V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE: '[主体作业区]'
            }
        });
    });

    Ext.getCmp('zyq').on('select', function () {
        tabtool = false;
        Ext.getCmp('sblx').getStore().removeAll();
        Ext.getCmp('djy').getStore().removeAll();
        Ext.data.StoreManager.lookup('ssblx').load({
            params: {
                V_V_DEPTCODENEXT: Ext.getCmp("zyq").getValue()
            }
        });

        Ext.data.StoreManager.lookup('sdjy').load({
            params: {
                V_V_DEPTCODE: Ext.getCmp("zyq").getValue(),
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_ROLE: '01'
            }
        });
    });

    Ext.getCmp('sblx').on('select', function () {
        tabtool = false;
        Ext.getCmp('sbmc').getStore().removeAll();
        Ext.data.StoreManager.lookup('ssbmc').load({
            params: {
                V_V_DEPTCODENEXT: Ext.getCmp("zyq").getValue(),
                V_V_EQUTYPECODE: Ext.getCmp("sblx").getValue()
            }
        });
    });


    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams.V_D_ENTER_DATE_B = Ext.Date.format(Ext.getCmp("begintime").getValue(), 'Y-m-d');
        store.proxy.extraParams.V_D_ENTER_DATE_E = Ext.Date.format(Ext.getCmp("endtime").getValue(), 'Y-m-d');
        store.proxy.extraParams.V_V_ORGCODE = Ext.getCmp("ck").getValue();
        store.proxy.extraParams.V_V_DEPTCODE = Ext.getCmp("zyq").getValue();
        store.proxy.extraParams.V_V_DEPTCODEREPARIR = Ext.getCmp("jxzyq").getValue();
        store.proxy.extraParams.V_EQUTYPE_CODE = Ext.getCmp("sblx").getValue();
        store.proxy.extraParams.V_EQU_CODE = Ext.getCmp("sbmc").getValue();
        store.proxy.extraParams.V_DJ_PERCODE = Ext.getCmp("djy").getValue();
        store.proxy.extraParams.V_V_SHORT_TXT = Ext.getCmp("selshortTxt").getValue();
        store.proxy.extraParams.V_V_BJ_TXT = Ext.getCmp("selmatDesc").getValue();
        store.proxy.extraParams.V_V_ORDER_TYP = Ext.getCmp('tabpanel').getActiveTab().id;
        store.proxy.extraParams.V_V_WORKID = Ext.util.Format.trim(Ext.getCmp('workid').getValue());
        store.proxy.extraParams.V_V_PAGE = Ext.getCmp('page').store.currentPage;
        store.proxy.extraParams.V_V_PAGESIZE = Ext.getCmp('page').store.pageSize;
    });
});
function rendererFlow(a, value, metaData) {
    return '<a href="javascript:goToFlow(\'' + metaData.data.V_ORDERGUID + '\')">查看</a>';
}
function itemClick(s, record, item, index, e, eOpts) {

    Ext.Ajax.request({
        url: AppUrl + 'mm/GetBillMaterialByOrder',
        type: 'post',
        async: false,
        params: {
            V_V_ORDERID: Ext.getStore("gridStore").getAt(index).get("V_ORDERID"),
            V_V_ORDERGUID: Ext.getStore("gridStore").getAt(index).get("V_ORDERGUID"),
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.ret == 'Success') {
                //alert("工单创建成功");
            } else {
                //alert("接口调用失败");
            }
        }
    });
    try {
        window.parent.append('090901', '检修工单验收明细', AppUrl + 'page/PM_090901/index.html?V_GUID='
            + Ext.getStore("gridStore").getAt(index).get("V_ORDERGUID")
            + '');
    } catch (e) {
        window.open(AppUrl + "page/PM_090901/index.html?V_GUID="
            + Ext.getStore("gridStore").getAt(index).get("V_ORDERGUID"),
            "", "dialogHeight:700px;dialogWidth:1100px");
    }

}

function left(value, metaData) {
    metaData.style = "text-align:left";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function rendererTime(value, metaData) {
    metaData.style = "text-align:left";
    return '<div data-qtip="' + value.split('.0')[0] + '" >' + value.split('.0')[0] + '</div>';
}

function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    var val = value == null ? '' : value;
    return '<div data-qtip="' + val + '" >' + val + '</div>';
}
//缺陷明细
function _defDetail(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:center";
    return '<a href="#" onclick="onClickDef(\'' + value + '\')">' + "缺陷详情" + '</a>';
}

function _fjDetail1(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:center";
    return '<a href="#" onclick="onClickfj(\'' + value + '\')">' + "附件详情" + '</a>';
}
function onClickDef(workguid) {
    window.open(AppUrl + "page/No4116/defView.html?V_GUID=" + workguid +
        // + Ext.getStore("gridStore").getAt(index).get("V_ORDERGUID"),
        "", "dialogHeight:600px;dialogWidth:800px");
}

function onClickfj(workguid) {
    window.open(AppUrl + "page/No4116/accessory.html?V_GUID=" + workguid +
        // + Ext.getStore("gridStore").getAt(index).get("V_ORDERGUID"),
        "", "dialogHeight:600px;dialogWidth:800px");
}
function rendererFlow(a, value, metaData) {
    return '<a href="javascript:goToFlow(\'' + metaData.data.V_ORDERGUID + '\')">查看</a>';
}
function goToFlow(V_ORDERGUID) {
    var InstanceId = '';
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/GetActivitiStepFromBusinessId',
        async: false,
        method: 'POST',
        params: {
            businessKey: V_ORDERGUID
        },
        success: function (ret) {
            var respRoot = Ext.JSON.decode(ret.responseText);
            InstanceId = respRoot.InstanceId;
        }
    });
    var owidth = window.screen.availWidth;
    var oheight = window.screen.availHeight - 50;
    window.open(AppUrl + 'page/PM_210301/index.html?ProcessInstanceId=' + InstanceId, '', 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes');

}
function OnSearch() {
    querytool = false;
    Ext.getCmp('tabpanel').removeAll();

    Ext.getCmp('tabpanel').removeAll();
    Ext.Ajax.request({
        // url : AppUrl + 'WorkOrder/PRO_PM_WORKTYPCOUNT_ADMIN',
        url: AppUrl + 'WorkOrder/PRO_PM_WORKEDITCOUNT_N',
        async: false,
        method: 'POST',
        params: {
            V_D_ENTER_DATE_B: Ext.Date.format(Ext.getCmp("begintime").getValue(), 'Y-m-d'),
            V_D_ENTER_DATE_E: Ext.Date.format(Ext.getCmp("endtime").getValue(), 'Y-m-d'),
            V_V_ORGCODE: Ext.getCmp("ck").getValue(),
            V_V_DEPTCODE: Ext.getCmp("zyq").getValue(),
            V_V_DEPTCODEREPARIR: '',
            V_EQUTYPE_CODE: Ext.getCmp("sblx").getValue(),
            V_EQU_CODE: Ext.getCmp("sbmc").getValue(),
            V_DJ_PERCODE: Ext.getCmp("djy").getValue(),
            V_V_SHORT_TXT: Ext.getCmp("selshortTxt").getValue(),
            V_V_BJ_TXT: Ext.getCmp("selmatDesc").getValue(),
            V_V_WORKID: Ext.util.Format.trim(Ext.getCmp('workid').getValue())
        },
        success: function (ret) {
            var respRoot = Ext.JSON.decode(ret.responseText);
            var resp = respRoot.list;
            var tabdata = [];
            for (var i = 0; i < resp.length; i++) {
                Ext.getCmp('tabpanel').add({
                    id: resp[i].ORDER_TYP,
                    title: resp[i].ORDER_TYP_TXT,
                    items: [{
                        xtype: 'hidden',
                        value: resp[i].ORDER_TYP
                    }]
                });
            }
            Ext.getCmp('tabpanel').setActiveTab(0);
            querytool = true;
        }
    });
}
//工单编辑状态查询
function QueryGrid(){
    tabIndex = parseInt(Ext.getCmp('tabpanel').getActiveTab().id.substring(8));
    OnSearch();

    Ext.getCmp("tabpanel").setActiveTab(tabIndex);

    if (Ext.getCmp('tabpanel').getActiveTab().id.substring(8) == 0) {
        Ext.getCmp('page').store.currentPage = 1;
        Ext.data.StoreManager.lookup('gridStore').load();
    }
    // var gridStoreSel = Ext.data.StoreManager.lookup('gridStore');
    // gridStoreSel.proxy.extraParams = {
    //     V_D_ENTER_DATE_B: Ext.Date.format(Ext.getCmp("begintime").getValue(), 'Y-m-d'),
    //     V_D_ENTER_DATE_E: Ext.Date.format(Ext.getCmp("endtime").getValue(), 'Y-m-d'),
    //     V_V_ORGCODE: Ext.getCmp("ck").getValue(),
    //     V_V_DEPTCODE:  Ext.getCmp("zyq").getValue(),
    //     V_V_DEPTCODEREPARIR: Ext.getCmp("jxzyq").getValue(),
    //     V_EQUTYPE_CODE: Ext.getCmp("sblx").getValue(),
    //     V_EQU_CODE: Ext.getCmp("sbmc").getValue(),
    //     V_DJ_PERCODE: Ext.getCmp("djy").getValue(),
    //     V_V_SHORT_TXT: Ext.getCmp("selshortTxt").getValue(),
    //     V_V_BJ_TXT: Ext.getCmp("selmatDesc").getValue(),
    //     V_V_ORDER_TYP: Ext.getCmp('tabpanel').getActiveTab().id,
    //     V_V_WORKID: Ext.util.Format.trim(Ext.getCmp('workid').getValue()),
    //     V_V_PAGE: Ext.getCmp('page').store.currentPage,
    //     V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
    // };
}

//编辑状态工单删除
function OnClickDelectWorkEdit(){

    var seldata = Ext.getCmp('gridPanel').getSelectionModel().getSelection();
    if(seldata.length==0){
        Ext.Msg.alert('操作信息', '请选择至少一条工单进行删除！');
        return;
    }
    else{
        for(var i=0 ;i<seldata.length;i++){
            Ext.Ajax.request({
                // url : AppUrl + 'WorkOrder/PRO_PM_WORKTYPCOUNT_ADMIN',
                url: AppUrl + 'WorkOrder/PRO_DELETE_WORKEDIT_DEFECT',
                async: false,
                method: 'POST',
                params: {
                    IV_WORKORDER_GUID: seldata[i].V_ORDERGUID,
                    v_usercode: Ext.util.Cookies.get('v_personcode')
                },
                success: function (ret) {
                    var respRoot = Ext.JSON.decode(ret.responseText);
                    var resp = respRoot.ret;
                    if(resp == 'success'){
                        Ext.Msg.alert('删除提示','删除成功！');
                    }
                    }
                });
        }
    }

}
