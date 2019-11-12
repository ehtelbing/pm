QuerySelSectionsMsg = "请选择作业区";
Ext.onReady(function() {

        var selPlantstore = Ext.create('Ext.data.Store',
            {
                autoLoad : true,
                storeId : 'selPlantstore',
                fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
                proxy : {
                    type : 'ajax',
                    async : false,
                    url : AppUrl + 'lx/PRO_BASE_DEPT_VIEW',
                    actionMethods : {
                        read : 'POST'
                    },
                    reader : {
                        type : 'json',
                        root : 'list'
                    },
                    extraParams : {
                        IS_V_DEPTCODE : Ext.util.Cookies.get('v_orgCode'),
                        IS_V_DEPTTYPE : '[基层单位]'
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
                url : AppUrl + 'lx/PRO_BASE_DEPT_VIEW',
                actionMethods : {
                    read : 'POST'
                },
                reader : {
                    type : 'json',
                    root : 'list'
                }
            }
        });

        var workTypeStore = Ext.create('Ext.data.Store', {
            autoLoad : true,
            storeId : 'workTypeStore',
            fields : [ 'CYCLE_ID', 'CYCLE_DESC' ],
            proxy : {
                type : 'ajax',
                async : false,
                url : AppUrl + 'lx/PRO_RUN_CYCLE_ABLE',
                actionMethods : {
                    read : 'POST'
                },
                reader : {
                    type : 'json',
                    root : 'list'
                },
                extraParams : {
                }

            }
        });
        var month = new Date().getMonth() + 1;

        var panel = Ext
            .create(
                'Ext.panel.Panel',
                {
                    id : 'panellow',
                    width : '100%',
                    title : '设备运行台账',
                    region : 'north',
                    frame : true,
                    layout : 'column',
                    items : [
                        {
                            xtype : 'combo',
                            id : "selPlant",
                            store : selPlantstore,
                            editable : false,
                            queryMode : 'local',
                            fieldLabel : '厂矿',
                            displayField : 'V_DEPTNAME',
                            valueField : 'V_DEPTCODE',
                            labelWidth : 70,
                            style : ' margin: 5px 0px 0px 10px',
                            labelAlign : 'right'
                        },
                        {
                            xtype : 'combo',
                            id : "selSection",
                            store : selSectionstore,
                            editable : false,
                            queryMode : 'local',
                            fieldLabel : '作业区',
                            displayField : 'V_DEPTNAME',
                            valueField : 'V_DEPTCODE',
                            labelWidth : 60,
                            style : ' margin: 5px 0px 0px 10px',
                            labelAlign : 'right'
                        },
                        {
                            xtype : 'textfield',
                            fieldLabel : '当前设备',
                            id : 'nowDevice',
                            emptyText  : '点击选择设备...',
                            labelAlign : 'right',
                            labelWidth : 70,
                            style : ' margin: 5px 0px 0px 10px',
                            listeners : {
                                click: {
                                    element: 'el',
                                    fn: function () {
                                        var DEPTCODE = null;

                                        if(Ext.getCmp('selSection').getValue() == "%"){
                                            Ext.Msg.alert('操作信息', QuerySelSectionsMsg);
                                            return;
                                        }else{
                                            DEPTCODE = Ext.getCmp('selSection').getValue();
                                        }
                                        returnValue = null;
                                        win = Ext.create('Ext.window.Window', {
                                            title : '搜索设备',
                                            modal : true,
                                            autoShow : true,
                                            maximized : false,
                                            maximizable : true,
                                            width : 1000,
                                            height : document.documentElement.clientHeight * 0.8,
                                            html : '<iframe src=' + AppUrl + 'page/No410601/Index.html?DEPTCODE=' + DEPTCODE + ' style="width: 100%; height: 100%;" frameborder="0"/ >',
                                            listeners : {
                                                close : function(panel, eOpts) {
                                                    if (returnValue != "" && returnValue != null) {
                                                        Ext.getCmp('nowDevice').setValue(returnValue[0].data.V_EQUNAME);
                                                        Ext.getCmp('nowDevice_Id').setValue(returnValue[0].data.V_EQUCODE);
                                                        Ext.getCmp('nowDevice_Site').setValue(returnValue[0].data.V_EQUSITE);
                                                    }
                                                }
                                            }
                                        });
                                    }
                                }
                            }
                        },
                        {
                            xtype : 'hidden',
                            id : 'nowDevice_Id'
                        },
                        {
                            xtype : 'hidden',
                            id : 'nowDevice_Site'
                        },
                        {
                            xtype : 'combo',
                            id : 'workType',
                            fieldLabel : '周期类型',
                            store : workTypeStore,
                            editable : false,
                            labelAlign : 'right',
                            displayField : 'CYCLE_DESC',
                            valueField : 'CYCLE_ID',
                            labelWidth : 90,
                            style : ' margin: 5px 0px 0px 10px'
                        },
                        {
                            xtype : 'button',
                            text : '查询',
                            icon : imgpath + '/search.png',
                            width : 80,
                            style : ' margin: 5px 0px 0px 10px',
                            handler : function() {
                                Ext.data.StoreManager
                                    .lookup('gridStore')
                                    .load(
                                        {
                                            params : {
                                                A_EQUID : Ext.getCmp('nowDevice_Id').getValue(),
                                                A_CYCLE_ID : Ext.getCmp('workType').getValue()
                                            }

                                        })
                            }
                        },
                        {
                            id : 'delete',
                            xtype : 'button',
                            text : '导出Excel',
                            style : ' margin: 5px 0px 0px 10px',
                            width : 80,
                            listeners : {
                                click : OnButtonExportClicked
                            }
                        } ]
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
                    fields : [ 'SITE_DESC', 'BJ_UNIQUE_CODE',
                        'MATERIALCODE', 'MATERIALNAME', 'UNIT',
                        'CHANGEDATE', 'SUM_YEILD', 'CYCLE_DESC',
                        'ALERT_VALUE', 'OFFSET', 'BJ_STATUS' ],
                    proxy : {
                        type : 'ajax',
                        async : false,
                        url : AppUrl + 'lx/PRO_RUN_EQU_BJ_ALERT_ALL',
                        actionMethods : {
                            read : 'POST'
                        },
                        reader : {
                            type : 'json',
                            root : 'list',
                            total : 'total'
                        }
                    },
                    listeners : {
                        beforeload : beforeloadStore
                    }
                },
                autoScroll : true,
                selType : 'checkboxmodel',
                height : 400,
                columns : [

                    {
                        xtype : 'rownumberer',
                        text : '序号',
                        width : 35,
                        sortable : false
                    }, {
                        text : '备件安装位置',
                        width : 110,
                        dataIndex : 'SITE_DESC',
                        align : 'center',
                        renderer : atleft
                    }, {
                        text : '备件唯一标识',
                        width : 110,
                        dataIndex : 'BJ_UNIQUE_CODE',
                        align : 'center',
                        renderer : atleft
                    }, {
                        text : '物资编码',
                        width : 100,
                        dataIndex : 'MATERIALCODE',
                        align : 'center',
                        renderer : atleft
                    }, {
                        text : '物资描述',
                        width : 300,
                        dataIndex : 'MATERIALNAME',
                        align : 'center',
                        renderer : atleft
                    }, {
                        text : '计量单位',
                        width : 90,
                        dataIndex : 'UNIT',
                        align : 'center',
                        renderer : atleft
                    }, {
                        text : '更换时间',
                        width : 150,
                        dataIndex : 'CHANGEDATE',
                        align : 'center'
                    }, {
                        text : '作业量',
                        width : 50,
                        dataIndex : 'SUM_YEILD',

                        align : 'center',
                        renderer : function(a, b, c, d, e, f) {
                            if (a > c.data.ALERT_VALUE) {
                                b.style = "color: #f00";

                            }
                            return a;
                        }
                    }, {
                        text : '周期类型',
                        width : 100,
                        dataIndex : 'CYCLE_DESC',
                        align : 'center'
                    }, {
                        text : '报警值',
                        width : 50,
                        dataIndex : 'ALERT_VALUE',
                        align : 'center',
                        renderer : atleft
                    }, {
                        text : '预警偏移量',
                        width : 100,
                        dataIndex : 'OFFSET',
                        align : 'center',
                        renderer : atleft
                    }, {
                        text : '备件状态',
                        width : 100,
                        dataIndex : 'BJ_STATUS',
                        align : 'center',
                        renderer : atleft
                    }
                ]
            });

        Ext.data.StoreManager.lookup('selPlantstore').on(
            "load",
            function() {
                Ext.getCmp("selPlant").select(
                    Ext.data.StoreManager.lookup('selPlantstore')
                        .getAt(0));

                Ext.data.StoreManager.lookup('selSectionstore').load(
                    {
                        params : {
                            IS_V_DEPTCODE : Ext.util.Cookies
                                .get('v_orgCode'),
                            IS_V_DEPTTYPE :  '[主体作业区]'
                        }

                    });
            });
        Ext.data.StoreManager
            .lookup('selSectionstore')
            .on(
                "load",
                function() {
                    Ext.getCmp("selSection").select(
                        Ext.data.StoreManager.lookup(
                            'selSectionstore').getAt(0));
                    // 默认当前登录用户工作区
                    var storeLength = Ext.data.StoreManager
                        .lookup('selSectionstore').data.length;
                    for ( var index = 0; index < storeLength; index++) {
                        var storeItemData = Ext.data.StoreManager
                            .lookup('selSectionstore').data.items[index].data;
                        if (storeItemData.V_DEPTCODE == Ext.util.Cookies
                            .get('v_deptcode')) {
                            Ext.getCmp("selSection").setValue(
                                Ext.util.Cookies
                                    .get('v_deptcode'));
                            break;
                        }
                    }

                    Ext.getCmp("workType").select(
                        Ext.data.StoreManager.lookup(
                            'workTypeStore').getAt(0));
                });
        Ext.getCmp('selPlant').on(
            "change",
            function() {
                Ext.data.StoreManager.lookup('selSectionstore')
                    .removeAll();
                Ext.data.StoreManager.lookup('selSectionstore').load(
                    {
                        params : {
                            IS_V_DEPTCODE : Ext.util.Cookies
                                .get('v_orgCode'),
                            IS_V_DEPTTYPE : '[主体作业区]'
                        }

                    });
            });

        Ext.create('Ext.container.Viewport', {
            id : "id",
            layout : 'border',
            items : [ panel, grid ]
        });
    });

function OnButtonExportClicked() {

    // 设备位置
    // 当前备件唯一 标识
    // 物资编码
    // 物资描述
    // 计量单位
    // 更换时间
    // 作业量
    // 周期类型
    // 报警值
    // 预警偏移量
    // 备件状态
    var A_EQUID = Ext.getCmp('nowDevice_Id').getValue();
    var A_CYCLE_ID = Ext.getCmp('workType').getValue();
    document.location.href = AppUrl + 'lx/PRO_RUN_EQU_BJ_ALERT_ALL_EXCEL?A_EQUID='+ encodeURI(encodeURI(A_EQUID)) +
        '&A_CYCLE_ID=' + encodeURI(encodeURI(A_CYCLE_ID));

}
function beforeloadStore(store) {

}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}