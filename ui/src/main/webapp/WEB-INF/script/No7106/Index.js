var win;
var returnValue;
Ext.onReady(function () {

    var selPlantstore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'selPlantstore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'LL/PRO_BASE_DEPT_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                IS_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                IS_V_DEPTTYPE: '[基层单位]'
            }
        }
    });

    var selSectionstore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'selSectionstore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'LL/PRO_BASE_DEPT_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                IS_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                IS_V_DEPTTYPE: '[主体作业区]'
            }
        }
    });

    var workTypeStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'workTypeStore',
        fields: ['CYCLE_ID', 'CYCLE_DESC'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'LL/PRO_RUN_CYCLE_ABLE',
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
    var month = new Date().getMonth() + 1;

    var panel = Ext.create('Ext.panel.Panel', {
        id: 'panellow',
        width: '100%',
        region: 'north',
        frame: true,
        layout: 'vbox',
        items: [

            {
                xtype: 'panel',
                width: '100%',
                border: false,
                layout: 'column',
                frame: true,
                items: [{
                    xtype: 'combo',
                    id: "selPlant",
                    store: selPlantstore,
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '计划厂矿',
                    displayField: 'V_DEPTNAME',
                    valueField: 'V_DEPTCODE',
                    labelWidth: 70,
                    style: ' margin: 5px 0px 5px 10px',
                    labelAlign: 'right'
                }, {
                    xtype: 'combo',
                    id: "selSection",
                    readOnly: true,
                    store: selSectionstore,
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '作业区',
                    displayField: 'V_DEPTNAME',
                    valueField: 'V_DEPTCODE',
                    labelWidth: 60,
                    style: ' margin: 5px 0px 5px 10px',
                    labelAlign: 'right'
                }, {
                    xtype: 'textfield',
                    fieldLabel: '当前设备',
                    id: 'nowDevice',
                    labelAlign: 'right',
                    labelWidth: 70,
                    style: ' margin: 5px 0px 5px 10px',
                    listeners: {
                        click: {
                            element: 'el',
                            fn: function () {
                                returnValue = null;
                                win = Ext.create('Ext.window.Window', {
                                    title: '选择设备',
                                    modal: true,
                                    autoShow: true,
                                    maximized: false,
                                    maximizable: true,
                                    width: 800,
                                    height: 600,
                                    html: '<iframe src=' + AppUrl + 'page/No410601/Index.html?DEPTCODE=' + Ext.getCmp('selSection').getValue() + ' style="width: 100%; height: 100%;" frameborder="0"/ >',
                                    listeners: {
                                        close: function (panel, eOpts) {
                                            if (returnValue != null) {
                                                var dept = returnValue;
                                                Ext.getCmp('nowDevice').setValue(dept[0].data.V_EQUNAME);
                                                Ext.getCmp('nowDevice_Id').setValue(dept[0].data.V_EQUCODE);
                                                Ext.getCmp('nowDevice_Site').setValue(dept[0].data.V_EQUSITE);
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    }
                }, {
                    xtype: 'hidden',
                    id: 'nowDevice_Id'
                }, {
                    xtype: 'hidden',
                    id: 'nowDevice_Site'
                }, {
                    xtype: 'datefield',
                    fieldLabel: '作业日期',
                    id: 'workTime',
                    value: new Date(),
                    format: 'Y/m/d',
                    editable: false,
                    labelAlign: 'right',
                    labelWidth: 70,
                    style: ' margin: 5px 0px 5px 10px'
                }, {
                    xtype: 'combo',
                    id: 'workType',
                    fieldLabel: '作业周期类型',
                    store: workTypeStore,
                    editable: false,
                    labelAlign: 'right',
                    displayField: 'CYCLE_DESC',
                    valueField: 'CYCLE_ID',
                    labelWidth: 90,
                    style: ' margin: 5px 0px 5px 10px'
                }, {
                    xtype: 'textfield',
                    fieldLabel: '作业量',
                    id: 'workSize',
                    labelAlign: 'right',
                    labelWidth: 60,
                    style: ' margin: 5px 0px 5px 10px'
                }, {
                    xtype: 'button',
                    text: '查询',
                    icon: imgpath + '/search.png',
                    width: 80,
                    style: ' margin: 5px 0px 5px 10px',
                    handler: function () {
                        if (Ext.getCmp('selPlant').getValue() != '' && Ext.getCmp('selPlant').getValue() != null && Ext.getCmp('selSection').getValue() != '' && Ext.getCmp('selSection').getValue() != null && Ext.getCmp('nowDevice_Id').getValue() != '' && Ext.getCmp('nowDevice_Id').getValue() != null) {
                            Ext.data.StoreManager.lookup('gridStore').load({
                                params: {
                                    A_EQUID: Ext.getCmp('nowDevice_Id').getValue(),
                                    A_WORKDATE: Ext.util.Format.date(Ext.getCmp('workTime').getValue(), 'Y-m-d'),
                                    A_CYCLE_ID: Ext.getCmp('workType').getValue()
                                }
                            });
                        } else
                            Ext.example.msg('操作信息', '{0}', '请填写当前设备');
                    }
                }]

            }, {
                xtype: 'panel',
                layout: 'column',
                width: '100%',
                border: false,
                frame: true,
                items: [{
                    id: 'insert',
                    xtype: 'button',
                    text: '录入',
                    icon: imgpath + '/add.png',
                    width: 60,
                    style: ' margin: 5px 0px 5px 10px',
                    listeners: {
                        click: OnAddButtonClicked
                    }
                }, {
                    id: 'delete',
                    xtype: 'button',
                    text: '删除选中作业量',
                    icon: imgpath + '/delete1.png',
                    width: 150,
                    style: ' margin: 5px 0px 5px 10px',
                    listeners: {
                        click: OnButtonDeleteClicked
                    }
                }

                ]
            }]
    });
    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        region: 'center',
        columnLines: true,
        width: '100%',
        store: {
            id: 'gridStore',
            pageSize: 15,
            autoLoad: false,
            fields: ['ID', 'EQUNAME', 'CYCLE_DESC', 'WORKDATE', 'INSERT_VALUE', 'INSERT_PERSON', 'INSERTDATE', 'CYCLE_UNIT'],
            proxy: {
                type: 'ajax',
                async: false,
                url: AppUrl + 'LL/PRO_RUN_YEILD_SELECT_MANAGE',
                actionMethods: {
                    read: 'POST'
                },
                reader: {
                    type: 'json',
                    root: 'list',
                    total: 'total'
                }
            },
            listeners: {
                beforeload: beforeloadStore
            }
        },
        autoScroll: true,
        selType: 'checkboxmodel',
        height: 400,
        columns: [

            {
                xtype: 'rownumberer',
                text: '序号',
                width: 35,
                sortable: false
            }, {
                text: '当前设备',
                width: 130,
                dataIndex: 'EQUNAME',
                align: 'center',
                renderer: atleft
            }, {
                text: '周期类型',
                width: 110,
                dataIndex: 'CYCLE_DESC',
                align: 'center',
                renderer: atleft
            }, {
                text: '计算单位',
                width: 110,
                dataIndex: 'CYCLE_UNIT',
                align: 'center',
                renderer: atleft
            }, {
                text: '作业量',
                width: 110,
                dataIndex: 'INSERT_VALUE',
                type: 'date',
                renderer: atleft
            }, {
                text: '作业日期',
                width: 110,
                dataIndex: 'WORKDATE',
                renderer: atleft
            }, {
                text: '录入人',
                width: 80,
                dataIndex: 'INSERT_PERSON',
                align: 'center',
                renderer: atleft
            }, {
                text: '录入时间',
                width: 150,
                dataIndex: 'INSERTDATE',
                align: 'center',
                renderer: atleft
            }, {
                dataIndex: 'ID',
                hidden: true
            }],
        bbar: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    Ext.data.StoreManager.lookup('selPlantstore').on("load", function () {
        Ext.getCmp("selPlant").select(Ext.data.StoreManager.lookup('selPlantstore').getAt(0));

        Ext.data.StoreManager.lookup('selSectionstore').load({
            params: {
                'IS_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
                'IS_V_DEPTTYPE': '[主体作业区]'
            }
        });
    });
    Ext.data.StoreManager.lookup('selSectionstore').on("load", function () {
        Ext.getCmp("selSection").select(Ext.data.StoreManager.lookup('selSectionstore').getAt(0));

        // 默认当前登录用户工作区
        var storeLength = Ext.data.StoreManager.lookup('selSectionstore').data.length;
        for (var index = 0; index < storeLength; index++) {
            var storeItemData = Ext.data.StoreManager.lookup('selSectionstore').data.items[index].data;
            if (storeItemData.V_DEPTCODE == Ext.util.Cookies.get('v_deptcode')) {
                Ext.getCmp("selSection").setValue(Ext.util.Cookies.get('v_deptcode'));
                break;
            }
        }

        Ext.getCmp("workType").select(Ext.data.StoreManager.lookup('workTypeStore').getAt(0));
    });
    /* Ext.getCmp('selPlant').on("change", function () {
         Ext.data.StoreManager.lookup('selSectionstore').removeAll();
         Ext.data.StoreManager.lookup('selSectionstore').load({
             params: {
                 'IS_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
                 'IS_V_DEPTTYPE': '[主体作业区]'
             }
         });
     });*/

    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel, grid]
    });
});

function OnButtonDeleteClicked() {
    var selectModel = Ext.getCmp("grid").getSelectionModel();
    var id = Ext.getCmp('grid').getSelectionModel().getSelection().length;
    if (id == '0') {
        Ext.example.msg('操作信息', '请选择需要删除');
        return;
    } else {
        var selectedRecord = Ext.getCmp("grid").getSelectionModel().getSelection();
        var selectID = [];
        Ext.Array.each(selectedRecord, function (v_wpcode, index) {
            selectID.splice(index, 0, v_wpcode.data.v_wpcode);
        });
        var i_err = 0;
        for (i = 0; i < Ext.getCmp('grid').getSelectionModel().getSelection().length; i++) {
            Ext.Ajax.request({
                url: AppUrl + 'LL/PRO_RUN_TEILD_DELETE',
                async: false,
                method: 'POST',
                params: {
                    A_ID: selectModel.getSelection()[i].data.ID
                },
                success: function (response) {
                    var resp = Ext.JSON.decode(response.responseText);
                    if (resp.RET == "Fail") {
                        i_err++;
                    }
                }
            });
        }
        if (i_err == 0) {
            Ext.example.msg('操作信息', '删除成功');
        } else {
            Ext.example.msg('操作信息', '删除失败');
        }
        Ext.data.StoreManager.lookup('gridStore').load({
            params: {
                A_EQUID: Ext.getCmp('nowDevice_Id').getValue(),
                A_WORKDATE: Ext.util.Format.date(Ext.getCmp('workTime').getValue(), 'Y-m-d'),
                A_CYCLE_ID: Ext.getCmp('workType').getValue()
            }
        });
    }
}

function OnAddButtonClicked() {
    if (Ext.getCmp('nowDevice').getValue() == "") {
        Ext.example.msg('操作信息', '{0}', '请填写当前设备');
        return false;
    }
    Ext.Ajax.request({
        url: AppUrl + 'LL/PRO_RUN_YEILD_INPUT',
        async: false,
        method: 'POST',
        params: {
            A_EQU_ID: Ext.getCmp('nowDevice_Id').getValue(),
            A_CYCLE_ID: Ext.getCmp('workType').getValue(),
            A_WORKDATE: Ext.util.Format.date(Ext.getCmp('workTime').getValue(), 'Y-m-d'),
            A_INSERTVALUE: Ext.getCmp("workSize").getValue() == "" ? "0" : Ext.getCmp("workSize").getValue(),
            A_INSRTPERSON: Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText);
            if (resp.RET == "Success") {
                Ext.example.msg('操作信息', '录入成功');

                Ext.data.StoreManager.lookup('gridStore').load({
                    params: {
                        A_EQUID: Ext.getCmp('nowDevice_Id').getValue(),
                        A_WORKDATE: Ext.util.Format.date(Ext.getCmp('workTime').getValue(), 'Y-m-d'),
                        A_CYCLE_ID: Ext.getCmp('workType').getValue()
                    }
                });
            } else {
                Ext.Msg.alert('操作信息', '录入失败');
            }
        }
    });

}

function beforeloadStore(store) {
    store.proxy.extraParams.A_EQUID = Ext.getCmp('nowDevice_Id').getValue();
    store.proxy.extraParams.A_WORKDATE = Ext.util.Format.date(Ext.getCmp('workTime').getValue(), 'Y-m-d');
    store.proxy.extraParams.A_CYCLE_ID = Ext.getCmp('workType').getValue();
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}