Ext
    .onReady(function() {
        Ext.QuickTips.init();
        var selPlantstore = Ext.create('Ext.data.Store', {
            autoLoad : true,
            storeId : 'selPlantstore',
            fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
            proxy : {
                type : 'ajax',
                async : false,
                url : AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
                actionMethods : {
                    read : 'POST'
                },
                reader : {
                    type : 'json',
                    root : 'list'
                },
                extraParams : {
                    V_V_PERSONCODE:   Ext.util.Cookies.get('v_personcode'),
                    V_V_DEPTCODE:    Ext.util.Cookies.get('v_orgCode'),
                    V_V_DEPTCODENEXT:    Ext.util.Cookies.get('v_deptcode'),
                    V_V_DEPTTYPE:   '[基层单位]'
                }
            }
        });

        var selSectionstore = Ext.create('Ext.data.Store', {
            autoLoad : false,
            storeId : 'selSectionstore',
            fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
            proxy : {
                type : 'ajax',
                async : false,
                url : AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
                actionMethods : {
                    read : 'POST'
                },
                reader : {
                    type : 'json',
                    root : 'list'
                }
            }
        });

        var panel = Ext.create('Ext.panel.Panel', {
                id : 'panellow',
                width : '100%',
                region : 'north',
                layout : 'column',
                border:false,
                defaults : {
                    style : 'margin:5px 0px 5px 5px',
                    labelAlign : 'right'
                },
                frame:true,
                items : [
                    {
                        xtype : 'combo',
                        id : "selPlant",
                        store : selPlantstore,
                        editable : false,
                        queryMode : 'local',
                        fieldLabel : '单位名称',
                        displayField : 'V_DEPTNAME',
                        valueField : 'V_DEPTCODE',
                        labelWidth : 80,
                        labelAlign : 'right'
                    },
                    {
                        xtype : 'combo',
                        id : "selSection",
                        store : selSectionstore,
                        editable : false,
                        queryMode : 'local',
                        fieldLabel : '作业区名称',
                        displayField : 'V_DEPTNAME',
                        valueField : 'V_DEPTCODE',
                        labelWidth : 80,
                        labelAlign : 'right'
                    },
                    {
                        xtype : 'combo',
                        id : "selStatus",
                        fieldLabel : '状态类型',
                        editable : false,
                        labelWidth : 80,
                        labelAlign : 'right',
                        store : [ [ '-1', '已驳回' ] ]
                    },
                    {
                        xtype : 'textfield',
                        id : 'seltext',
                        emptyText : '工单描述模糊查询',
                        labelAlign : 'right',
                        width : 158,
                        margin:'5px 0px 5px 90px'
                    },
                    {
                        xtype : 'button',
                        text : '查询',
                        icon: imgpath + '/search.png',
                        width : 100,
                        handler : function() {
                            Ext.data.StoreManager
                                .lookup('gridStore')
                                .load(
                                {
                                    params : {

                                        'V_V_ORGCODE':Ext.ComponentManager.get('selPlant').getValue(),
                                        'V_V_DEPTCODE':Ext.ComponentManager.get('selSection').getValue(),
                                        'V_V_DEPTCODEREPARIR': Ext.util.Cookies.get('v_personcode'),//'',
                                        'V_V_STATECODE':Ext.ComponentManager.get('selStatus').getValue(),
                                        'V_V_SHORT_TXT':Ext.ComponentManager.get('seltext').getValue()
                                    }
                                })
                        }
                    },
                    {
                        xtype : 'button',
                        text : '修改工单',
                        width : 100,
                        listeners : {
                            click : OnButtonYesClicked
                        }
                    }]
            });
        var grid = Ext.create('Ext.grid.Panel',
            {
                id : 'grid',
                region : 'center',
                columnLines : true,
                width : '100%',
                store : {
                    id : 'gridStore',
                    autoLoad : false,
                    fields : [ 'ID', 'V_ORDERGUID', 'V_ORDERID',
                        'V_SHORT_TXT', 'V_EQUIP_NO',
                        'V_EQUIP_NAME', 'V_EQUSITENAME', 'V_SPARE',
                        'V_ORGNAME', 'V_DEPTNAME', 'V_PERSONNAME',
                        'D_ENTER_DATE', 'V_DEPTNAMEREPARIR','V_ORDER_TYP_TXT' ],
                    proxy : {
                        type : 'ajax',
                        async : false,
                        url : AppUrl + 'WorkOrder/PRO_PM_WORKORDER_LIST_VIEW',
                        actionMethods : {
                            read : 'POST'
                        },
                        reader : {
                            type : 'json',
                            root : 'list'
                        }
                    }
                },
                autoScroll : true,
                selType : 'checkboxmodel',
                height : 400,
                columns : [ {
                    xtype : 'rownumberer',
                    text : '序号',
                    width : 50,
                    align : 'center'
                }, {
                    text : '工单GUID',
                    dataIndex : 'V_ORDERGUID',
                    hidden : true,
                    renderer : CreateGridColumnTd
                }, {
                    text : '工单号',
                    dataIndex : 'V_ORDERID',
                    width : 150,
                    align : 'center',
                    renderer : CreateGridColumnTd
                }, {
                    text : '工单描述',
                    dataIndex : 'V_SHORT_TXT',
                    renderer : CreateGridColumnTd,
                    width : 300,
                    align : 'center'
                }, {
                    text : '设备编号',
                    dataIndex : 'V_EQUIP_NO',
                    hidden : true,
                    renderer : CreateGridColumnTd
                }, {
                    text : '设备名称',
                    dataIndex : 'V_EQUIP_NAME',
                    width : 150,
                    align : 'center',
                    renderer : CreateGridColumnTd
                }, {
                    text : '设备位置',
                    dataIndex : 'V_EQUSITENAME',
                    width : 250,
                    algin : 'center',
                    renderer : CreateGridColumnTd
                }, {
                    text : '备件消耗',
                    dataIndex : 'V_SPARE',
                    width : 300,
                    align : 'center',
                    renderer : CreateGridColumnTd
                }, {
                    text : '厂矿',
                    dataIndex : 'V_ORGNAME',
                    width : 150,
                    align : 'center',
                    renderer : CreateGridColumnTd
                }, {
                    text : '委托单位',
                    dataIndex : 'V_DEPTNAME',
                    width : 100,
                    algin : 'center',
                    renderer : CreateGridColumnTd
                }, {
                    text : '委托人',
                    dataIndex : 'V_PERSONNAME',
                    width : 100,
                    align : 'center',
                    renderer : CreateGridColumnTd
                }, {
                    text : '委托时间',
                    dataIndex : 'D_ENTER_DATE',
                    width : 150,
                    align : 'center',
                    renderer : CreateGridColumnTd
                }, {
                    text : '检修单位',
                    dataIndex : 'V_DEPTNAMEREPARIR',
                    width : 150,
                    align : 'center',
                    renderer : CreateGridColumnTd
                }, {
                    text : '工单类型描述',
                    dataIndex : 'V_ORDER_TYP_TXT',
                    width : 100,
                    align : 'center',
                    renderer : CreateGridColumnTd
                } ],
                listeners : {
                    itemdblclick : itemClick
                }
            });

        Ext.data.StoreManager.lookup('selPlantstore').on(
            "load",
            function() {
                Ext.getCmp('selStatus').select('-1');
                Ext.getCmp("selPlant").select(
                    Ext.data.StoreManager.lookup('selPlantstore')
                        .getAt(0));
                Ext.data.StoreManager.lookup('selSectionstore').load(
                    {
                        params: {
                            'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                            'V_V_DEPTCODE': Ext.getCmp('selPlant').getValue(),
                            'V_V_DEPTCODENEXT': '%',
                            'V_V_DEPTTYPE': '主体作业区'
                        }
                    });
            });
        Ext.data.StoreManager.lookup('selSectionstore').on(
            "load",
            function() {
//						Ext.ComponentManager.get('selSection').store.insert(0,
//								{
//									'V_DEPTCODE' : '%',
//									'V_DEPTNAME' : '全部'
//								});
                Ext.getCmp("selSection").select(
                    Ext.data.StoreManager.lookup('selSectionstore')
                        .getAt(0));

            });

        Ext.getCmp('selPlant').on(
            "change",
            function() {
                Ext.data.StoreManager.lookup('selSectionstore')
                    .removeAll();
                Ext.data.StoreManager.lookup('selSectionstore').load(
                    {
                        params : {
                            'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                            'V_V_DEPTCODE': Ext.getCmp('selPlant').getValue(),
                            'V_V_DEPTCODENEXT': '%',
                            'V_V_DEPTTYPE': '主体作业区'
                        }
                    });
            });



        Ext
            .getCmp('selSection')
            .on(
            "change",
            function() {
                Ext.data.StoreManager
                    .lookup('gridStore')
                    .load(
                    {
                        params : {

                            'V_V_ORGCODE':Ext.ComponentManager.get('selPlant').getValue(),
                            'V_V_DEPTCODE':Ext.ComponentManager.get('selSection').getValue(),
                            'V_V_DEPTCODEREPARIR': Ext.util.Cookies.get('v_personcode'),//'',
                            'V_V_STATECODE':Ext.ComponentManager.get('selStatus').getValue(),
                            'V_V_SHORT_TXT':Ext.ComponentManager.get('seltext').getValue()

                        }
                    });
            });

        Ext.create('Ext.container.Viewport', {
            id : "id",
            layout : 'border',
            items : [ panel, grid ]
        });
    });


function itemClick(s, record, item, index, e, eOpts) {
    var code=record.data.V_ORDERGUID;
    var orderid=record.data.V_ORDERID;
    GetBillMatByOrder(orderid,code);
    var returnValue=window.showModalDialog(AppUrl + "/No412301/Index_aq.html?V_GUID="+code, null,
        "dialogHeight:700px;dialogWidth:1100px");
    if(returnValue=='yes'){
        Ext.data.StoreManager.lookup('gridStore').load({
            params : {

                'V_V_ORGCODE':Ext.ComponentManager.get('selPlant').getValue(),
                'V_V_DEPTCODE':Ext.ComponentManager.get('selSection').getValue(),
                'V_V_DEPTCODEREPARIR': Ext.util.Cookies.get('v_personcode'),//'',
                'V_V_STATECODE':Ext.ComponentManager.get('selStatus').getValue(),
                'V_V_SHORT_TXT':Ext.ComponentManager.get('seltext').getValue()
            }
        });
    }
}

function GetBillMatByOrder( s_orderid,s_orderguid){

    Ext.Ajax.request({
        url:APP + '/WS_EquipGetBillMaterialByOrderService',
        async : false,
        method : 'POST',
        params : {
            parName : [ 'orderid','V_V_ORDERGUID' ],
            parType : [  's', 's' ],
            parVal : [s_orderid,s_orderguid
            ]
        },
        failure :function(){},
        success : function(ret) {

        }
    });
}
function OnButtonYesClicked() {
    var length=Ext.getCmp('grid').getSelectionModel().getSelection().length;
    if(length!='1'){
        Ext.example.msg('操作信息', '{0}', '请选择要修改的工单');
    }else{
        var code=Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.V_ORDERGUID;
        var orderid=Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.V_ORDERID;
        GetBillMatByOrder(orderid,code);
        var returnValue=window.showModalDialog(AppUrl + "/No412301/Index_aq.html?V_GUID="+code, null,
            "dialogHeight:700px;dialogWidth:1100px");
        if(returnValue=='yes'){
            Ext.data.StoreManager.lookup('gridStore').load({
                params : {

                    'V_V_ORGCODE':Ext.ComponentManager.get('selPlant').getValue(),
                    'V_V_DEPTCODE':Ext.ComponentManager.get('selSection').getValue(),
                    'V_V_DEPTCODEREPARIR': Ext.util.Cookies.get('v_personcode'),//'',
                    'V_V_STATECODE':Ext.ComponentManager.get('selStatus').getValue(),
                    'V_V_SHORT_TXT':Ext.ComponentManager.get('seltext').getValue()
                }
            });
        }
    }
}

function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}