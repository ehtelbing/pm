var V_ORDERGUID = null;
var temp = 0;
var V_EQUCODE;
var STEP = null;
if (location.href.split('?')[1] != undefined) {
    V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
    V_EQUCODE = Ext.urlDecode(location.href.split('?')[1]).V_EQUCODE == null ? "" : Ext.urlDecode(location.href.split('?')[1]).V_EQUCODE;
    STEP = Ext.urlDecode(location.href.split('?')[1]).STEP == null ? "" : Ext.urlDecode(location.href.split('?')[1]).STEP;
}
var GridModel = Ext.create('Ext.selection.RowModel', {});
Ext.onReady(function () {
    Ext.QuickTips.init();
    var firstStore, secondStore, thirdStore;

    var activityStore = Ext.create('Ext.data.Store', {
        id: 'activityStore',
        autoLoad: true,
        fields: ['V_ACTIVITY'],
        proxy: {
            type: 'ajax',
            // url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_ACTIVITY',
            url: AppUrl + 'dxfile/PRO_PM_WORKORDER_ET_ACT_N',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                V_V_ORDERGUID: V_ORDERGUID,
                V_V_STEP: STEP
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var KCPlantStore = Ext.create('Ext.data.Store', {
        id: 'KCPlantStore',
        autoLoad: false,
        fields: ['V_DEPTNAME', 'V_DEPTCODE', 'V_SAP_DEPT', 'V_SAP_JHGC', 'V_SAP_WORK'],
        proxy: {
            type: 'ajax',
            // url: AppUrl + 'zdh/plant_sel',
            url: AppUrl + 'dxfile/PRO_PM_WORK_MAT_ORG_SEL',
            actionMethods: {
                read: 'POST'
            },
            /*extraParams: {
                IS_V_DEPTCODE: Ext.util.Cookies.get("v_orgCode"),
                IS_V_DEPTTYPE: "[基层单位]"
            },*/
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var KCSectionStore = Ext.create('Ext.data.Store', {
        id: 'KCSectionStore',
        autoLoad: false,
        fields: ['V_DEPTNAME', 'V_DEPTCODE', 'V_SAP_DEPT', 'V_SAP_JHGC', 'V_SAP_WORK'],
        proxy: {
            type: 'ajax',
            // url: AppUrl + 'lxm/PRO_BASE_DEPT_VIEW_PER',
            url: AppUrl + 'dxfile/PRO_PM_WORK_MAT_DEPT_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    var kfSectionStore = Ext.create('Ext.data.Store', {
        id: 'kfSectionStore',
        autoLoad: false,
        fields: ['store_id', 'store_desc'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'mm/GetStoreList',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: false,
        fields: ['MAT_NO', 'MAT_DESC', 'UNIT', 'PLAN_PRICE',
            'DICTNAME', 'BEIJIANPORPERTY', 'MAT_GROUP',
            'MAT_OLD_NO', 'DAYS', 'mat_no', 'mat_desc', 'unit', 'plan_price', 'ltext'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'mm/WS_MMToXLReadMaterailService',
            actionMethods: {
                read: 'POST'
            },

            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var bomStore = Ext.create('Ext.data.Store', {
        id: 'bomStore',
        autoLoad: true,
        fields: ['I_ID', 'V_EQUCODE', 'V_SPCODE', 'V_SPNAME', 'V_SPTYPE', 'V_SPCODE_OLD', 'V_NUMBER', 'V_MEMO'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'pm_19/PRO_SAP_EQU_BOM_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            },
            extraParams: {
                V_V_EQUCODE: V_EQUCODE
            }
        }
    });

    var YZJStore = Ext.create('Ext.data.Store',
        {
            id: 'YZJStore',
            autoLoad: false,
            fields: ['V_CODE', 'V_NAME', 'V_TYPE', 'V_UNIT',
                'V_SETSITE', 'V_MEMO', 'I_ID'],
            proxy: {
                type: 'ajax',
                async: false,
                url: 'GetYZJList',
                actionMethods: {
                    read: 'POST'
                },
                // extraParams: {
                //     V_V_EQUCODE: Ext.urlDecode(location.href
                //         .split('?')[1]).V_EQUIP_NO,
                //     V_V_DEPTCODE: Ext.urlDecode(location.href
                //         .split('?')[1]).V_DEPTCODE,
                //     /*Ext.getCmp('selKCSection').valueModels[0].data.V_SAP_DEPT,*/
                //     V_V_STATUS: '在备'
                // },
                reader: {
                    type: 'json',
                    root: 'list'
                }
            }
        });

    var JPStore = Ext.create('Ext.data.Store', {
        id: 'JPStore',
        autoLoad: false,
        fields: ['V_MATERIALCODE', 'V_MATERIALNAME',
            'V_UNIT', 'V_SPEC', 'I_NUMBER',
            'I_PRICE', 'I_MONEY', 'I_ID'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/PRO_PM_WORKORDER_JIP_VIEW',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                V_V_EQUIP_NO: Ext.urlDecode(location.href.split('?')[1]).V_EQUIP_NO,
                V_I_FLAG: '1'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var KCStore = Ext.create('Ext.data.Store', {
        id: 'KCStore',
        autoLoad: false,
        fields: ['VCH_SPAREPART_CODE', 'VCH_SPAREPART_NAME',
            'VCH_TYPE', 'VCH_UNIT', 'PRICE', 'ABLECOUNT',
            'VCH_FROMNAME', 'ID', 'INPUT_DATE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'mm/GetDepartKC_storeid',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var tab = Ext.create('Ext.tab.Panel', {
        id: 'tabpanel',
        // xtype: 'tabpanel',
        height: "50%",
        width: "70%",
        activeTab: 0,
        region: "west",
        listeners: {
            beforerender: addTab
        }
    });

    var bomgrid = Ext.create('Ext.grid.Panel', {
        id: 'bomgrid',
        title: 'BOM备件信息',
        height: "50%",
        width: "30%",
        // region:'center',
        region: "center",
        store: bomStore,
        columnLines: true,
        columns: [
            // Ext.create('Ext.grid.RowNumberer', {
            //     header: '序号',
            //     width: 50,
            //     align:'center'
            // }),
            {header: '设备编码', dataIndex: 'V_EQUCODE', align: 'center', width: 120, hidden: true},
            {header: '备件编码', dataIndex: 'V_SPCODE', align: 'center', width: 150},
            {header: '备件名称', dataIndex: 'V_SPNAME', align: 'center', width: 150},
            {header: '备件数量', dataIndex: 'V_NUMBER', align: 'center', width: 150}
        ]
    });
    var bomPanel = Ext.create('Ext.panel.Panel', {
        id: 'bomPanel',
        region: 'east',
        frame: true,
        border: false,
        layout: 'border',
        items: [bomgrid]
    });
    // Ext.create('Ext.container.Viewport',{
    //    id:'main',
    //    layout:'border',
    //    items:[tab,bomPanel]
    // });
    function addTab() {

        Ext.ComponentManager.get("tabpanel").add({
            title: '库存',
            items: [{
                xtype: 'hidden',
                value: 1
            }],
            dockedItems: [{
                xtype: 'gridpanel',
                id: 'gridKC',
                autoScroll: true,
                columnLines: true,
                width: 300,
                height: window.screen.height * 4 / 5 - 400,
                store: KCStore,
                listeners: {
                    itemclick: OnClickKCGrid
                },
                columns: [{
                    xtype: 'rownumberer',
                    text: '序号',
                    align: 'center',
                    width: 40
                }, {
                    text: '库房名称',
                    dataIndex: 'VCH_FROMNAME',
                    align: 'center',
                    renderer: AddFloat
                }, {
                    text: '物料编码',
                    dataIndex: 'VCH_SPAREPART_CODE',
                    align: 'center',
                    renderer: AddFloat
                }, {
                    text: '物料描述',
                    dataIndex: 'VCH_SPAREPART_NAME',
                    align: 'center',
                    renderer: AddFloat
                }, {
                    text: '规格型号',
                    dataIndex: 'VCH_TYPE',
                    align: 'center',
                    renderer: AddFloat
                }, {
                    text: '计量单位',
                    dataIndex: 'VCH_UNIT',
                    align: 'center'
                }, {
                    text: '单价',
                    dataIndex: 'PRICE',
                    align: 'center',
                    renderer: AddRight
                }, {
                    text: '库存数量',
                    dataIndex: 'ABLECOUNT',
                    align: 'center',
                    renderer: AddFloat
                }, {
                    text: '库存ID',
                    dataIndex: 'ID',
                    align: 'center',
                    renderer: AddFloat
                }, {
                    text: '到货时间',
                    dataIndex: 'INPUT_DATE',
                    align: 'center'
                }],
                dockedItems: [{
                    xtype: 'panel',
                    layout: 'column',
                    items: [{
                        xtype: 'combo',
                        id: 'selKCActi',
                        editable: false,
                        store: activityStore,
                        labelAlign: 'right',
                        labelWidth: 30,
                        queryMode: 'local',
                        displayField: 'V_ACTIVITY',
                        valueField: 'V_ACTIVITY',
                        style: 'margin:5px 0 0 10px'
                    }, {
                        xtype: 'combo',
                        id: 'selKCPlant',
                        fieldLabel: '厂矿',
                        editable: false,
                        store: KCPlantStore,
                        labelAlign: 'right',
                        labelWidth: 60, // queryMode: 'local',
                        displayField: 'V_DEPTNAME',
                        valueField: 'V_DEPTCODE',
                        style: 'margin:5px 0 0 10px',
                        queryMode: 'local',
                        width: 300
                    }, {
                        xtype: 'combo',
                        id: 'selKCSection',
                        fieldLabel: '作业区',
                        editable: false,
                        store: KCSectionStore,
                        labelAlign: 'right',
                        labelWidth: 60, // queryMode: 'local',
                        displayField: 'V_DEPTNAME',
                        valueField: 'V_DEPTCODE',
                        style: 'margin:5px 0 0 10px',
                        queryMode: 'local',
                        width: 300
                    }, {
                        xtype: 'combo',
                        id: 'kfSection',
                        fieldLabel: '库房',
                        editable: false,
                        store: kfSectionStore,
                        labelAlign: 'right',
                        labelWidth: 60, // queryMode: 'local',
                        displayField: 'store_desc',
                        valueField: 'store_id',
                        style: 'margin:5px 0 0 10px',
                        queryMode: 'local',
                        width: 300
                    }, {
                        xtype: 'textfield',
                        id: 'KCmatCode',
                        emptyText: '按物料编码搜索',
                        width: 100,
                        style: 'margin:5px 0 0 10px',
                        listeners: {
                            'specialkey': function ENTERHC(field, e) {
                                if (e.getKey() == Ext.EventObject.ENTER) {
                                    OnClickKCRefreshButton();
                                }
                            }
                        }
                    }, {
                        xtype: 'textfield',
                        id: 'KCmatName',
                        emptyText: '按物料名称搜索',
                        width: 100,
                        style: 'margin:5px 0 0 10px',
                        listeners: {
                            'specialkey': function (field, e) {
                                if (e.getKey() == Ext.EventObject.ENTER) {
                                    OnClickKCRefreshButton();
                                }
                            }
                        }
                    }, {
                        xtype: 'textfield',
                        id: 'KWMName',
                        emptyText: '按库位码搜索',
                        width: 100,
                        hidden: false,
                        style: 'margin:5px 0 0 10px'
                    }, {
                        xtype: 'textfield',
                        id: 'ggxh',
                        emptyText: '按规格型号搜索',
                        width: 100,
                        hidden: true,
                        style: 'margin:5px 0 0 10px'
                    }, {
                        xtype: 'button',
                        text: '查询',
                        icon: imgpath + '/search.png',
                        style: 'margin:5px 0 0 10px',
                        listeners: {
                            click: OnClickKCRefreshButton
                        }
                    }]
                }]
            }]
        });

        Ext.ComponentManager
            .get("tabpanel")
            .add(
                {
                    title: '预装件',
                    items: [{
                        xtype: 'hidden',
                        value: 2
                    }],
                    dockedItems: [{
                        xtype: 'panel',
                        items: [{
                            xtype: 'gridpanel',
                            id: 'gridYZJ',
                            //     store: YZJStore,
                            columnLines: true,
                            autoScroll: true,
                            width: 500,
                            height: window.screen.height * 4 / 5 - 400,
                            selModel: GridModel,
                            listeners: {
                                itemclick: OnClickYZJGrid
                            },
                            columns: [{
                                xtype: 'rownumberer',
                                text: '序号',
                                align: 'center',
                                width: 40
                            }, {
                                text: '预装件编码',
                                dataIndex: 'V_CODE',
                                align: 'center',
                                renderer: AddFloat,
                                width: 100
                            }, {
                                text: '预装件名称',
                                dataIndex: 'V_NAME',
                                align: 'center',
                                renderer: AddFloat
                            }, {
                                text: '预装件型号',
                                dataIndex: 'V_TYPE',
                                align: 'center',
                                renderer: AddFloat
                            }, {
                                text: '预装件单位',
                                dataIndex: 'V_UNIT',
                                align: 'center',
                                renderer: AddFloat
                            }, {
                                text: '安装位置',
                                dataIndex: 'V_SETSITE',
                                align: 'center',
                                renderer: AddFloat
                            }, {
                                text: '备注',
                                dataIndex: 'V_MEMO',
                                align: 'center',
                                renderer: AddFloat
                            }],
                            dockedItems: [{
                                xtype: 'panel',
                                layout: 'column',
                                height: 35,
                                items: [
                                    {
                                        xtype: 'combo',
                                        id: 'selYZJActi',
                                        editable: false,
                                        store: activityStore,
                                        labelAlign: 'right',
                                        labelWidth: 30, // queryMode:
                                        // 'local',
                                        displayField: 'V_ACTIVITY',
                                        valueField: 'V_ACTIVITY',
                                        style: 'margin:5px 0 0 10px'
                                    },
                                    {
                                        xtype: 'button',
                                        text: '刷新',
                                        icon: imgpath + '/table_refresh.png',
                                        style: 'margin:5px 0 0 10px',
                                        listeners: {
                                            click: OnClickZYJRefreshButton
                                        }
                                    }]
                            }]
                        }]
                    }]
                });
        Ext.ComponentManager.get("tabpanel").add({
            title: '机旁选择',
            items: [{
                xtype: 'hidden',
                value: 3
            }],
            dockedItems: [{
                xtype: 'gridpanel',
                autoScroll: true,
                width: 500,
                height: window.screen.height * 4 / 5 - 400,
                id: 'gridJP',
                store: JPStore,
                listeners: {
                    itemclick: OnClickJPGrid
                },
                columns: [{
                    xtype: 'rownumberer',
                    text: '序号',
                    align: 'center',
                    width: 40
                }, {
                    text: '物料编码',
                    dataIndex: 'V_MATERIALCODE',
                    align: 'center',
                    renderer: AddFloat
                }, {
                    text: '物料描述',
                    dataIndex: 'V_MATERIALNAME',
                    align: 'center',
                    renderer: AddFloat
                }, {
                    text: '单位',
                    dataIndex: 'V_UNIT',
                    align: 'center'
                }, {
                    text: '规格型号',
                    dataIndex: 'V_SPEC',
                    align: 'center',
                    renderer: AddFloat
                }, {
                    text: '机旁暂存数量',
                    dataIndex: 'I_NUMBER',
                    align: 'center',
                    renderer: AddFloat
                }, {
                    text: '单价',
                    dataIndex: 'I_PRICE',
                    align: 'center',
                    renderer: AddRight
                }, {
                    text: '金额',
                    dataIndex: 'I_MONEY',
                    align: 'center',
                    renderer: AddFloat
                }],
                dockedItems: [{
                    xtype: 'panel',
                    layout: 'column',
                    height: 35,
                    items: [{
                        xtype: 'combo',
                        id: 'selJPActi',
                        editable: false,
                        store: activityStore,
                        labelAlign: 'right',
                        labelWidth: 30, // queryMode: 'local',
                        displayField: 'V_ACTIVITY',
                        valueField: 'V_ACTIVITY',
                        style: 'margin:5px 0 0 10px'
                    }, {
                        xtype: 'button',
                        text: '刷新',
                        icon: imgpath + '/table_refresh.png',
                        style: 'margin:5px 0 0 10px',
                        listeners: {
                            click: OnClickRefreshButton
                        }
                    }]
                }]
            }]
        });

        Ext.ComponentManager.get("tabpanel").add({
            title: '物料主数据',
            items: [{
                xtype: 'hidden',
                value: 0
            }],
            dockedItems: [{
                xtype: 'panel',
                layout: 'column',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '物料编码',
                    id: 'matCode',
                    labelAlign: 'right',
                    labelWidth: 80
                }, {
                    xtype: 'textfield',
                    fieldLabel: '物料名称',
                    id: 'matDesc',
                    labelAlign: 'right',
                    labelWidth: 100
                },
                    {
                        xtype: 'combo',
                        fieldLabel: '物资类别',
                        id: 'selType',
                        editable: false,
                        hidden: true,
                        store: [['材料', '材料'], ['备件', '备件']],
                        labelAlign: 'right',
                        labelWidth: 80
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: '工序',
                        id: 'selActivity',
                        editable: false,
                        store: activityStore,
                        labelAlign: 'right',
                        labelWidth: 60, // queryMode: 'local',
                        displayField: 'V_ACTIVITY',
                        valueField: 'V_ACTIVITY'
                    }, {
                        xtype: 'button',
                        text: '查询',
                        icon: imgpath + '/search.png',
                        width: 60,
                        margin: '0px 0px 0px 10px',
                        listeners: {
                            click: loadQuery
                        }
                    }]
            }, {
                xtype: 'gridpanel',
                id: 'grid',
                store: gridStore,
                columnLines: true,
                autoScroll: true,
                width: 500,
                height: window.screen.height * 4 / 5 - 400,
                columns: [{
                    text: '物料编码',
                    id: 'codeClick',
                    dataIndex: 'mat_no',
                    //dataIndex: 'MAT_NO',
                    width: 180,
                    align: 'center',
                    renderer: AddFloat
                }, {
                    text: '物料描述',
                    dataIndex: 'mat_desc',
                    //dataIndex: 'MAT_DESC',
                    width: 240,
                    align: 'center',
                    renderer: AddFloat
                }, {
                    text: '单位',
                    dataIndex: 'unit',
                    //dataIndex: 'UNIT',
                    width: 100,
                    align: 'center'
                }, {
                    text: '计划价',
                    //dataIndex: 'PLAN_PRICE',
                    dataIndex: 'plan_price',
                    width: 100,
                    align: 'center',
                    renderer: AddRight
                }, {
                    text: '规格型号',
                    //dataIndex: 'MAT_OLD_NO',
                    dataIndex: 'ltext',
                    width: 200,
                    align: 'center',
                    renderer: AddFloat
                }],
                listeners: {
                    itemclick: BackItem
                }
            }]
        });

        Ext.ComponentManager.get("tabpanel").setActiveTab(0);
    }

    Ext.create('Ext.container.Viewport', {
        id: 'main',
        layout: 'border',
        items: [bomgrid, tab]
    });


    function loadQuery() {
        if (Ext.getCmp('matCode').getValue() == '') {
            Ext.MessageBox.alert('操作信息', '物料编码不能为空');
        } else {

            /*gridStore.proxy.extraParams.x_code = Ext.getCmp('matCode')
                .getValue();
            gridStore.proxy.extraParams.x_name = Ext.getCmp('matDesc')
                .getValue();
            gridStore.proxy.extraParams.x_type = Ext.getCmp('selType')
                .getValue();
            gridStore.proxy.extraParams.x_personcode = Ext.util.Cookies.get('v_personcode');*/
            //Ext.ComponentManager.get('grid').getStore().load();
            Ext.Ajax.request({
                url: AppUrl + 'mm/GetMatTable',
                async: false,
                method: 'post',
                params: {
                    code: Ext.getCmp('matCode').getValue() == "" ? "%" : Ext.getCmp('matCode').getValue(),
                    name: Ext.getCmp('matDesc').getValue() == "" ? "%" : Ext.getCmp('matDesc').getValue(),
                    x_personcode: Ext.util.Cookies.get('v_personcode')
                },
                success: function (response) {
                    var resp = Ext.decode(response.responseText);
                    gridStore.loadData(resp.list);
                }
            });

        }
    }

    function BackItem(aa, record, item, index, e, eOpts) {
        var matCode = record.data.MAT_NO;
        var matDesc = record.data.MAT_DESC;
        var unit = record.data.UNIT;
        var price = record.data.PLAN_PRICE;
        var matgon = record.data.MAT_OLD_NO;
        var acti = Ext.getCmp('selActivity').getValue();

        var threeParams = matCode + '^' + matDesc + '^' + unit + '^'
            + price + '^' + matgon + '^' + acti;
        window.parent.OnClickMatCodeText(threeParams);
    }

    function OnClickYZJGrid(pp, record, item, index, e, eOpts) {
        var acti = Ext.getCmp('selYZJActi').getValue();
        var matCode = record.data.V_CODE;
        var matDesc = record.data.V_NAME;
        var matgon = record.data.V_TYPE;
        var unit = record.data.V_UNIT;
        var typeID = record.data.I_ID;
        var memo = record.data.V_MEMO;

        var moreParams = acti + '^' + matCode + '^' + matDesc + '^'
            + matgon + '^' + unit + '^' + typeID + '^' + memo;
        window.parent.OnClickYZJText(moreParams);

        Ext.getCmp('gridYZJ').getStore().load();
    }

    function OnClickJPGrid(pp, record, item, index, e, eOpts) {
        var acti = Ext.getCmp('selJPActi').getValue();
        var matCode = record.data.V_MATERIALCODE;
        var matDesc = record.data.V_MATERIALNAME;
        var matgon = record.data.V_SPEC;
        var unit = record.data.V_UNIT;
        var price = record.data.I_PRICE;
        var numb = record.data.I_NUMBER;
        var money = record.data.I_MONEY;
        var typeID = record.data.I_ID;

        var moreParams = acti + '^' + matCode + '^' + matDesc + '^'
            + matgon + '^' + unit + '^' + price + '^' + numb + '^'
            + money + '^' + typeID;
        window.parent.OnClickJPText(moreParams);

        Ext.getCmp('gridJP').getStore().load();
    }

    function OnClickKCGrid(pp, record, item, index, e, eOpts) {
        var acti = Ext.getCmp('selKCActi').getValue();
        var matCode = record.data.VCH_SPAREPART_CODE;
        var matDesc = record.data.VCH_SPAREPART_NAME;
        var matgon = record.data.VCH_TYPE == "" ? " " : record.data.VCH_TYPE;
        var unit = record.data.VCH_UNIT;
        var price = record.data.PRICE;
        var typeID = record.data.ID;
        var kccount = record.data.ABLECOUNT;

        // var inputdate=record.data.INPUT_DATE;  ABLECOUNT
        var moreParams = Ext.String.trim(acti) + '^'
            + Ext.String.trim(matCode) + '^'
            + Ext.String.trim(matDesc) + '^'
            + Ext.String.trim(matgon) + '^' + Ext.String.trim(unit)
            + '^' + Ext.String.trim(price) + '^'
            + Ext.String.trim(typeID) + '^'
            + Ext.String.trim(kccount);
        window.parent.OnClickKCText(moreParams);

    }

    function OnClickRefreshButton() {
        Ext.getCmp('gridJP').getStore().load();
    }

    function OnClickZYJRefreshButton() {
        Ext.getCmp('gridYZJ').getStore().load();
    }

    var filter = function (record, id) {
        var ggxh = Ext.getCmp('ggxh').getValue();
        if (ggxh == '' || ggxh == null) {
            return true;
        } else {
            if (record.get("VCH_TYPE")
                && Ext.util.Format
                    .lowercase(record.get("VCH_TYPE")).indexOf(
                        Ext.util.Format.lowercase(ggxh)) >= 0)
                return true;
            else
                return false;
        }
    };
    var onStoreLoad = function (store, records, options) {
        store.filterBy(filter);
    };

    function OnClickKCRefreshButton() {
        Ext.data.StoreManager.get('KCStore').load({
            params: {
                number: '1000',
                code: Ext.getCmp('KCmatCode').getValue(),
                name: Ext.getCmp('KCmatName').getValue(),
                sap_plantcode: Ext.getCmp('selKCPlant').valueModels[0].data.V_SAP_JHGC,
                sap_departcode: Ext.getCmp('selKCSection').valueModels[0].data.V_SAP_DEPT,
                storeplace: Ext.getCmp('KWMName').getValue(),
                i_from_id: Ext.getCmp('kfSection').getValue(),
                x_personcode: Ext.util.Cookies.get('v_personcode')
            }
        });
        Ext.data.StoreManager.lookup('KCStore').on("load", onStoreLoad);
    }

    function AddFloat(value, metaData, record, rowIndex, colIndex,
                      store, view) {
        return '<div data-qtip="' + value + '" >' + value + '</div>';
    }

    function AddRight(value, metaData, record, rowIndex, colIndex,
                      store, view) {
        return '<div style="text-align:right;" data-qtip="' + value
            + '" >' + value + '</div>';
    }

    Ext.data.StoreManager.get('activityStore').on('load', function () {
        Ext.getCmp('selActivity').select(Ext.data.StoreManager.lookup('activityStore').getAt(0));
        Ext.getCmp('selYZJActi').select(Ext.data.StoreManager.lookup('activityStore').getAt(0));
        Ext.getCmp('selJPActi').select(Ext.data.StoreManager.lookup('activityStore').getAt(0));
        Ext.getCmp('selKCActi').select(Ext.data.StoreManager.lookup('activityStore').getAt(0));

        Ext.data.StoreManager.get('KCPlantStore').load({
            params: {
                V_V_ORDERGUID: V_ORDERGUID,
                V_V_GXID: Ext.getCmp('selActivity').getValue(),
                V_V_STEP: STEP
            }
        });

    });

    Ext.getCmp('selKCActi').on('select', function () {
        Ext.data.StoreManager.get('KCPlantStore').load({
            params: {
                V_V_ORDERGUID: V_ORDERGUID,
                V_V_GXID: Ext.getCmp('selKCActi').getValue(),
                V_V_STEP: STEP
            }
        });
    });

    Ext.data.StoreManager.get('KCPlantStore').on('load', function () {
        Ext.getCmp('selKCPlant').select(Ext.data.StoreManager.lookup('KCPlantStore').getAt(0));
        Ext.data.StoreManager.get('KCSectionStore').load({
            params: {
                V_V_ORDERGUID: V_ORDERGUID,
                V_V_GXID: Ext.getCmp('selKCActi').getValue(),
                V_V_STEP: STEP,
                V_V_ORG: Ext.getCmp('selKCPlant').getValue()
            }
        });
    });

    Ext.data.StoreManager.get('KCSectionStore').on('load', function () {
        Ext.getCmp('selKCSection').select(Ext.data.StoreManager.lookup('KCSectionStore').getAt(0));
        Ext.Ajax.request({
            url: AppUrl + 'zdh/PRO_WX_WORKORDER_GET',
            method: 'POST',
            async: false,
            params: {
                V_V_ORDERGUID: V_ORDERGUID
            },
            success: function (ret) {
                var resp = Ext.JSON.decode(ret.responseText);
                if (resp.list != "" && resp.list != null) {
                    if (resp.list[0].V_DEPTCODEREPARIR == null) {
                        Ext.data.StoreManager.get('kfSectionStore').load({
                            params: {
                                SAP_PLANTCODE: Ext.getCmp('selKCPlant').valueModels[0].data.V_SAP_JHGC,
                                SAP_DEPARTCODE: Ext.getCmp('selKCSection').valueModels[0].data.V_SAP_DEPT,
                                V_V_PERCODE: Ext.util.Cookies.get("v_personcode")
                            }
                        });
                    } else {
                        Ext.data.StoreManager.get('kfSectionStore').load({
                            params: {
                                SAP_PLANTCODE: Ext.getCmp('selKCPlant').valueModels[0].data.V_SAP_JHGC,
                                SAP_DEPARTCODE: Ext.getCmp('selKCSection').valueModels[0].data.V_SAP_DEPT,
                                V_V_PERCODE: Ext.util.Cookies.get("v_personcode")
                            }
                        });
                    }

                } else {
                    Ext.data.StoreManager.get('kfSectionStore').load({
                        params: {
                            SAP_PLANTCODE: Ext.getCmp('selKCPlant').valueModels[0].data.V_SAP_JHGC,
                            SAP_DEPARTCODE: Ext.getCmp('selKCSection').valueModels[0].data.V_SAP_DEPT,
                            V_V_PERCODE: Ext.util.Cookies.get("v_personcode")
                        }
                    });
                }
            }
        });
        Ext.data.StoreManager.get('YZJStore').load({
            params: {
                V_V_EQUCODE: V_EQUCODE,
                V_V_DEPTCODE: Ext.getCmp('selKCSection').valueModels[0].data.V_SAP_DEPT,
                V_V_STATUS: '在备'
            }
        });

    });

    Ext.data.StoreManager.get('kfSectionStore').on('load', function (store) {
        Ext.getStore('kfSectionStore').insert(0, {'store_id': '0', 'store_desc': '全部'});
        Ext.getCmp('kfSection').select(store.getAt(0));
    });

    Ext.ComponentManager.get('selType').select('材料');



});
