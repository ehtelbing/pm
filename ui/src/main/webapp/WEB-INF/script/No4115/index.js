Ext.onReady(function() {
    var ckstore = Ext.create("Ext.data.Store", {
        autoLoad : true,
        storeId : 'ckstore',
        fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            },
            extraParams : {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE':  Ext.util.Cookies.get('v_orgCode'),
                'V_V_DEPTCODENEXT': Ext.util.Cookies.get('v_deptcode'),
                'V_V_DEPTTYPE': '基层单位'
            }
        }
    });

    var zyqstore = Ext.create("Ext.data.Store", {
        autoLoad : false,
        storeId : 'zyqstore',
        fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
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
            url : AppUrl + 'WorkOrder/PRO_PM_WORKORDER_STATE_VIEW',
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

    var panel = Ext.create('Ext.form.Panel', {
        id : 'panellow',
        style : 'margin:5px 0px 2px 2px',
        region : 'north',
        width : '100%',
        baseCls : 'my-panel-no-border',
        style: 'background-color:#FFFFFF',
        defaults : {
            style : 'margin:5px 0px 5px 10px',
            labelAlign : 'right'
        },
        layout : {
            type : 'column'
        },
        items : [
            {
                id : 'begintime',
                xtype : 'datefield',
                editable : false,
                format : 'Y/m/d',
                value : new Date(new Date().getFullYear() + '/'
                    + (new Date().getMonth() + 1) + '/' + 1),
                fieldLabel : '时间段选择',
                labelWidth : 70,
                baseCls : 'margin-bottom'
            },
            {
                id : 'endtime',
                xtype : 'datefield',
                editable : false,
                format : 'Y/m/d',
                value : new Date(),
                fieldLabel : '至',
                labelSeparator:"",
                labelWidth : '15px'
            },
            {
                id : 'ck',
                xtype : 'combo',
                store : ckstore,
                editable : false,
                fieldLabel : '厂矿',
                labelWidth : 65,
                displayField : 'V_DEPTNAME',
                valueField : 'V_DEPTCODE',
                queryMode : 'local',
                baseCls : 'margin-bottom'
            },
            {
                id : 'zyq',
                xtype : 'combo',
                store : zyqstore,
                editable : false,
                fieldLabel : '作业区',
                labelWidth : 65,
                displayField : 'V_DEPTNAME',
                valueField : 'V_DEPTCODE',
                queryMode : 'local',
                baseCls : 'margin-bottom'
            },
            {
                id : 'gdzt',
                xtype : 'combo',
                store : sgdzt,
                editable : false,
                fieldLabel : '工单状态',
                labelWidth : 65,
                displayField : 'V_STATENAME',
                valueField : 'V_STATECODE',
                queryMode : 'local',
                baseCls : 'margin-bottom'
            },
            {
                id : 'seltext',
                xtype : 'textfield',
                width : 150,
                emptyText : '缺陷明细模糊搜索'
            },
            {
                id : 'query',
                xtype : 'button',
                icon: imgpath + '/search.png',
                style : ' margin: 5px 0px 0px 10px',
                text : '查询',
                width : 80,
                handler : function() {
                    Ext.data.StoreManager.lookup('gridStore').load({
                        params : {
                            'V_D_ENTER_DATE_B': Ext.Date.format(Ext.ComponentManager
                                    .get("begintime").getValue(),
                                'Y-m-d'),
                            'V_D_ENTER_DATE_E':   Ext.Date.format(Ext.ComponentManager
                                    .get("endtime").getValue(),
                                'Y-m-d'),
                            'V_V_ORGCODE':   Ext.ComponentManager.get("ck")
                                .getValue(),
                            'V_V_DEPTCODE':Ext.ComponentManager.get("zyq")
                                .getValue(),
                            'V_V_DEPTCODEREPARIR':'',
                            'V_V_STATECODE':Ext.ComponentManager.get("gdzt")
                                .getValue(),
                            'V_V_ORDER_TYP':Ext.getCmp('tabpanel').getActiveTab()
                                .down("hidden").getValue(),
                            'V_V_SHORT_TXT': Ext.ComponentManager.get("seltext")
                                .getValue()
                        }
                    });
                    Ext.ComponentManager.get('tabpanel').removeAll();
                    addTab();
                }
            }, {
                xtype : 'label',
                text : '注：双击查看工单明细',
                style : ' margin: 5px 0px 0px 10px'
            }, {
                xtype : 'hidden',
                id : 'tabid'
            } ]
    });
    var gridStore = Ext.create('Ext.data.Store', {
        id : 'gridStore',
        pageSize : 15,
        autoLoad : false,
        fields : [ 'V_SEND_STATE','V_ORDERGUID', 'V_ORDERID', 'V_SHORT_TXT', 'V_EQUIP_NO',
            'V_EQUIP_NAME', 'V_EQUSITENAME', 'V_SPARE', 'V_ORGNAME',
            'V_DEPTNAME', 'V_ENTERED_BY', 'D_ENTER_DATE',
            'V_DEPTNAMEREPARIR', 'V_ORDER_TYP_TXT' ,'V_STATENAME'],

        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'cjy/PRO_PM_WORKORDER_SELECT_VIEW',
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

    var tabpanel = Ext.create("Ext.tab.Panel", {
        id : 'tabpanel',
        region : 'center',
        activeTab : 0,
        listeners : {
            //beforerender : addTab,

            tabchange : function() {
                Ext.ComponentManager.get("tabid").setValue(
                    Ext.getCmp('tabpanel').getActiveTab().down("hidden")
                        .getValue());
                Ext.getCmp('page').store.currentPage = 1;
                Ext.data.StoreManager.lookup('gridStore').load({
                    params : {
                        'V_D_ENTER_DATE_B': Ext.Date.format(Ext.ComponentManager
                                .get("begintime").getValue(),
                            'Y-m-d'),
                        'V_D_ENTER_DATE_E':   Ext.Date.format(Ext.ComponentManager
                                .get("endtime").getValue(),
                            'Y-m-d'),
                        'V_V_ORGCODE':   Ext.ComponentManager.get("ck")
                            .getValue(),
                        'V_V_DEPTCODE':Ext.ComponentManager.get("zyq")
                            .getValue(),
                        'V_V_DEPTCODEREPARIR':'',
                        'V_V_STATECODE':Ext.ComponentManager.get("gdzt")
                            .getValue(),
                        'V_V_ORDER_TYP':Ext.getCmp('tabpanel').getActiveTab()
                            .down("hidden").getValue(),
                        'V_V_SHORT_TXT': Ext.ComponentManager.get("seltext")
                            .getValue()
                    }
                });

            }
        },
        dockedItems : [ {
            xtype : 'gridpanel',
            id : 'grid',
            columnLines : true,
            width : '100%',
            store : gridStore,
            autoScroll : true,
            style: 'background-color:#FFFFFF',
            baseCls: 'my-panel-no-border',
            height : 400,
            columns : [ {
                xtype : 'rownumberer',
                width : 30,
                sortable : false
            }, {text:'重发',align: 'center', width: 45, renderer: function () { return '<a href="javascript:importClick()">重发</a>'; }},
                {text:'状态',dataIndex:'V_SEND_STATE',width:100,align:'center',render:left},
                {
                    text : '工单号',
                    dataIndex : 'V_ORDERID',
                    width:100,
                    align : 'center',
                    renderer : left
                }, {
                    text : '工单描述',
                    dataIndex : 'V_SHORT_TXT',
                    width:700	,
                    align : 'center',
                    renderer : left
                }, {
                    text : '设备名称',
                    dataIndex : 'V_EQUIP_NAME',
                    width:130,
                    align : 'center',
                    renderer : left
                }, {
                    text : '设备位置',
                    dataIndex : 'V_EQUSITENAME',
                    width:220,
                    align : 'center',
                    renderer : left
                }, {
                    text : '备件消耗',
                    dataIndex : 'V_SPARE',
                    width:750,
                    align : 'center',
                    renderer : left
                }, {
                    text : '委托单位',
                    dataIndex : 'V_DEPTNAME',
                    width:65,
                    align : 'center',
                    renderer : left
                }, {
                    text : '委托人',
                    dataIndex : 'V_ENTERED_BY',
                    width:50,
                    align : 'center',
                    renderer : left
                }, {
                    text : '委托时间',
                    dataIndex : 'D_ENTER_DATE',
                    width:140,
                    align : 'center',
                    renderer : left
                }, {
                    text : '检修单位',
                    dataIndex : 'V_DEPTNAMEREPARIR',
                    width:150,
                    align : 'center',
                    renderer : left
                }, {
                    text : '工单类型描述',
                    dataIndex : 'V_ORDER_TYP_TXT',
                    width:100,
                    align : 'center',
                    renderer : left
                }, {
                    text : '工单状态',
                    dataIndex : 'V_STATENAME',
                    width:65,
                    align : 'center',
                    renderer : left
                } ],
            listeners : {
                itemdblclick : itemClick
            },
            bbar : [ {
                xtype : 'pagingtoolbar',
                dock : 'bottom',
                id : 'page',
                displayInfo : true,
                displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
                emptyMsg : '没有记录',
                store : 'gridStore'
            } ]
        } ]
    })

    Ext.create('Ext.container.Viewport', {
        id : "id",
        layout : 'border',
        items : [ panel ]
    });
    Ext.data.StoreManager.lookup('ckstore').on("load", function() {
        Ext.getCmp("ck").select(Ext.data.StoreManager.lookup('ckstore').getAt(0));
        Ext.data.StoreManager.lookup('zyqstore').load({
            params : {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE':   Ext.getCmp("ck").getValue(),
                'V_V_DEPTCODENEXT':  Ext.util.Cookies.get('v_deptcode'),
                'V_V_DEPTTYPE':'[主体作业区]'
            }
        });
    });
    Ext.data.StoreManager.lookup('zyqstore').on("load", function() {
        Ext.getCmp("zyq").select(Ext.data.StoreManager.lookup('zyqstore').getAt(0));
    });

    Ext.getCmp("ck").on("select",function() {
        Ext.getCmp('zyq').getStore().removeAll();
        Ext.data.StoreManager.lookup('zyqstore').load({
            params : {
                V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE:Ext.getCmp("ck").getValue(),
                V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE:'[主体作业区]'
            }
        });
    });

    sgdzt.on("load", function () {
        Ext.ComponentManager.get('gdzt').store.insert(0, {
            'V_STATECODE': '%',
            'V_STATENAME': '全部'
        });
        Ext.getCmp("gdzt").select(sgdzt.getAt(0));
        addTab();
        Ext.getCmp("id").add(tabpanel);
    });
    /*sgdzt.on("load", function() {
        Ext.ComponentManager.get('gdzt').store.insert(0, {'V_STATECODE' : '%','V_STATENAME' : '全部'});
        Ext.getCmp("gdzt").select(sgdzt.getAt(0));

    })*/
})

function addTab() {
    Ext.Ajax.request({
        url: AppUrl + 'cjy/PRO_PM_WORKORDER_TYP_COUNT',
        async: false,
        method: 'post',
        params: {
            'V_D_ENTER_DATE_B': Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(),'Y-m-d'),
            'V_D_ENTER_DATE_E': Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(),'Y-m-d'),
            'V_V_ORGCODE':  Ext.ComponentManager.get("ck")
                .getValue(),
            'V_V_DEPTCODE':Ext.ComponentManager.get("zyq")
                .getValue(),
            'V_V_DEPTCODEREPARIR':'',
            'V_V_STATECODE':Ext.ComponentManager.get("gdzt")
                .getValue(),
            'V_V_SHORT_TXT': Ext.ComponentManager.get("seltext")
                .getValue()

        },
        success : function(ret) {
            var respRoot = Ext.JSON.decode(ret.responseText);

            var resp = respRoot.list;
            for (i = 0; i < resp.length; i++) {
                Ext.ComponentManager.get("tabpanel").add({
                    id : resp[i].ORDER_TYP,
                    title : resp[i].ORDER_TYP_TXT,
                    items : [ {
                        xtype : 'hidden',
                        value : resp[i].ORDER_TYP
                    } ]
                });
            }
            Ext.ComponentManager.get("tabpanel").setActiveTab(0);
        }
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            'V_D_ENTER_DATE_B': Ext.Date.format(Ext.ComponentManager
                    .get("begintime").getValue(),
                'Y-m-d'),
            'V_D_ENTER_DATE_E':   Ext.Date.format(Ext.ComponentManager
                    .get("endtime").getValue(),
                'Y-m-d'),
            'V_V_ORGCODE':   Ext.ComponentManager.get("ck")
                .getValue(),
            'V_V_DEPTCODE':Ext.ComponentManager.get("zyq")
                .getValue(),
            'V_V_DEPTCODEREPARIR':Ext.getCmp('gdzt').getValue(),
            'V_V_STATECODE':Ext.ComponentManager.get("gdzt")
                .getValue(),
            'V_V_ORDER_TYP':Ext.getCmp('tabpanel').getActiveTab()
                .down("hidden").getValue(),
            'V_V_SHORT_TXT': Ext.ComponentManager.get("seltext")
                .getValue()
        }
    });

}

function itemClick(s, record, item, index, e, eOpts) {
    try {
        window.parent.append('411001', '检修工单验收明细', AppUrl
            + 'page/No411001/Index.html?V_GUID='
            + Ext.getStore("gridStore").getAt(index).get("V_ORDERGUID")
            + '');
    } catch (e) {
        var ret = window.open(AppUrl
            + "page/No411001/Index.html?V_GUID="
            + Ext.getStore("gridStore").getAt(index).get("V_ORDERGUID"),
            "", "dialogHeight:700px;dialogWidth:1100px");
    }

}


function importClick(){
    var selectModel = Ext.getCmp("grid").getSelectionModel();
    var guid = selectModel.getSelection()[0].data.V_ORDERGUID;
    Ext.Ajax.request({
        method: 'POST',
        async: false,
        url: AppUrl + 'mm/SetMat',
        params: {
            V_V_ORDERGUID: guid,
            x_personcode: Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.V_CURSOR == '1') {
                Ext.Ajax.request({
                    method: 'POST',
                    async: false,
                    url: AppUrl + 'zdh/PRO_PM_WORKORDER_SEND_UPDATE',
                    params: {
                        V_V_ORDERGUID: guid,
                        V_V_SEND_STATE: "成功"
                    },
                    success: function (response) {
                        alert("工单创建失败：" + $("#V_ORDERID").html());
                        history.go(0);
                    }
                });
            }
            else {
                Ext.Ajax.request({
                    method: 'POST',
                    async: false,
                    url: AppUrl + 'zdh/PRO_PM_WORKORDER_SEND_UPDATE',
                    params: {
                        V_V_ORDERGUID: guid,
                        V_V_SEND_STATE: "失败"
                    },
                    success: function (response) {
                        alert("工单创建失败：" + $("#V_ORDERID").html());
                        history.go(0);
                    }
                });
            }
        }
    });
}

function left(value, metaData) {
    metaData.style = "text-align:left";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}
