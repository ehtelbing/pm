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
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE: '[基层单位]'
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
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE: '[主体作业区]'
            }
        }
    });

    var panel = Ext.create('Ext.panel.Panel', {
        id: 'panel',
        region: 'north',
        width: '100%',
        frame: true,
        layout: 'column',
        items: [{
            xtype: 'combo',
            id: "selPlant",
            store: selPlantstore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '计划厂矿',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            labelWidth: 60,
            style: ' margin: 5px 0px 0px 0px',
            labelAlign: 'right'
        }, {
            xtype: 'combo',
            id: "selSection",
            store: selSectionstore,
            editable: false,
            readOnly: true,
            queryMode: 'local',
            fieldLabel: '作业区',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            labelWidth: 60,
            style: ' margin: 5px 0px 0px 0px',
            labelAlign: 'right'
        }, {
            xtype: 'textfield',
            fieldLabel: '当前设备',
            id: 'equname',
            labelAlign: 'right',
            labelWidth: 70,
            style: ' margin: 5px 0px 0px 0px',
            readOnly: true,
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
                                        Ext.getCmp('equname').setValue(dept[0].data.V_EQUNAME);
                                        Ext.getCmp('equid').setText(dept[0].data.V_EQUCODE);
                                    }
                                }
                            }
                        });
                    }
                }
            }
        }, {
            xtype: 'label',
            hidden: true,
            id: 'equid'
        }, {
            xtype: 'button',
            text: '查 询',
            icon: imgpath + '/search.png',
            width: 65,
            style: ' margin: 5px 0px 0px 10px',
            handler: function () {
                if (Ext.getCmp('equname').getValue() == "") {
                    Ext.example.msg('操作信息', '{0}', '请点击选择设备进行查询');
                } else {
                    Ext.data.StoreManager.lookup('gridStore').load({
                        params: {
                            IN_EQUID: Ext.getCmp('equid').text,
                            IN_PLANT: '',
                            IN_DEPART: '',
                            IN_STATUS: '',
                            IN_BJCODE: '',
                            IN_BJDESC: ''
                        }
                    });
                }
            }
        }]
    });

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: false,
        fields: ['SITE_ID', 'SITE_DESC', 'BJ_ID', 'BJ_UNIQUE_CODE', 'MATERIALCODE', 'MATERIALNAME', 'UNIT', 'CHANGEDATE', 'BJ_STATUS'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'LL/PRO_RUN_SITE_BJ_ALL',
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
        id: 'grid',
        columnLines: true,
        region: 'center',
        width: '100%',
        store: gridStore,
        autoScroll: true,
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            sortable: false,
            align: 'center'
        }, {
            text: '备件安装位置',
            dataIndex: 'SITE_DESC',
            width: 200,
            align: 'center'
        }, {
            text: '当前备件唯一  标识',
            dataIndex: 'BJ_UNIQUE_CODE',
            width: 200,
            align: 'center'
        }, {
            text: '物资编码',
            dataIndex: 'MATERIALCODE',
            width: 300,
            align: 'center'
        }, {
            text: '物资描述',
            dataIndex: 'MATERIALNAME',
            width: 300,
            align: 'center'
        }, {
            text: '计量单位',
            dataIndex: 'UNIT',
            width: 100,
            align: 'center'
        }, {
            text: '最近更换时间',
            dataIndex: 'CHANGEDATE',
            width: 100,
            align: 'center'
        }, {
            text: '备件状态',
            dataIndex: 'BJ_STATUS',
            width: 100,
            align: 'center'
        }, {
            text: '备件更换',
            width: 100,
            align: 'center',
            renderer: function () {
                return "<img src='../../images/gif/application_go.png' style='cursor:pointer' onclick='BZGHClick()' />";
            }
        }, {
            text: '设置报警信息',
            width: 100,
            align: 'center',
            renderer: function () {
                return "<img src='../../images/gif/application_go.png' style='cursor:pointer' onclick='SZBJXXClick()' />";
            }
        }]

    });

    Ext.data.StoreManager.lookup('selPlantstore').on("load", function () {
        Ext.getCmp("selPlant").select(Ext.data.StoreManager.lookup('selPlantstore').getAt(0));

        Ext.data.StoreManager.lookup('selSectionstore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.data.StoreManager.lookup('selPlantstore').getAt(0).get('V_DEPTCODE'),
                'V_V_DEPTCODENEXT': Ext.util.Cookies.get('v_deptcode'),
                'V_V_DEPTTYPE': '[主体作业区]'
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
    });

    /* Ext.getCmp('selPlant').on("change", function() {
         Ext.data.StoreManager.lookup('selSectionstore').removeAll();

         Ext.data.StoreManager.lookup('selSectionstore').load({
             params: {
                 'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                 'V_V_DEPTCODE': Ext.getCmp("selPlant").getValue(),
                 'V_V_DEPTCODENEXT':Ext.util.Cookies.get('v_deptcode'),
                 'V_V_DEPTTYPE':'[主体作业区]'
             }
         });
     });*/

    Ext.create('Ext.container.Viewport', {
        split: true,
        layout: 'border',
        items: [panel, grid]
    });
});

function BZGHClick() {
    var selectModel = Ext.getCmp("grid").getSelectionModel();
    var BJ_ID = selectModel.getSelection()[0].data.BJ_ID;// 备件ID
    var SITE_DESC = selectModel.getSelection()[0].data.SITE_DESC;// 设备位置
    var BJ_UNIQUE_CODE = selectModel.getSelection()[0].data.BJ_UNIQUE_CODE;// 当前备件唯一标识
    var A_EQUID = Ext.getCmp('equid').text;// 更换设备ID
    var A_PLANTCODE = Ext.getCmp('selPlant').getValue();// 厂矿编码
    var A_DEPARTCODE = Ext.getCmp('selSection').getValue();// 作业区编码
    var SITE_ID = selectModel.getSelection()[0].data.SITE_ID;// 更换位置ID

    returnValue = null;
    win = Ext.create('Ext.window.Window', {
        title: '备件更换',
        modal: true,
        autoShow: true,
        maximized: false,
        maximizable: true,
        width: 960,
        height: 600,
        html: '<iframe src=' + AppUrl + 'page/No711001/Index.html?BJ_ID=' + BJ_ID + '&SITE_DESC=' + SITE_DESC + '&BJ_UNIQUE_CODE=' + BJ_UNIQUE_CODE + '&A_EQUID=' + (A_EQUID == '%' ? '%25' : A_EQUID) + '&A_PLANTCODE=' + A_PLANTCODE + '&A_DEPARTCODE=' + A_DEPARTCODE + '&SITE_ID=' + SITE_ID + ' style="width: 100%; height: 100%;" frameborder="0"/ >',
        listeners: {
            close: function (panel, eOpts) {
                if (returnValue != null) {
                    Ext.example.msg('操作信息', '操作成功');
                    Ext.data.StoreManager.lookup('gridStore').load({
                        params: {
                            IN_EQUID: Ext.getCmp('equid').text,
                            IN_PLANT: '',
                            IN_DEPART: '',
                            IN_STATUS: '',
                            IN_BJCODE: '',
                            IN_BJDESC: ''
                        }
                    });
                }
            }
        }
    });
}

function SZBJXXClick() {
    var selectModel = Ext.getCmp("grid").getSelectionModel();
    var BJ_UNIQUE_CODE = selectModel.getSelection()[0].data.BJ_UNIQUE_CODE;// 当前备件唯一标识

    returnValue = null;
    win = Ext.create('Ext.window.Window', {
        title: '设置报警信息',
        modal: true,
        autoShow: true,
        maximized: false,
        maximizable: true,
        width: 960,
        height: 600,
        html: '<iframe src=' + AppUrl + 'page/No711002/Index.html?BJ_UNIQUE_CODE=' + BJ_UNIQUE_CODE + ' style="width: 100%; height: 100%;" frameborder="0"/ >',
        listeners: {
            close: function (panel, eOpts) {
                if (returnValue != null) {

                }
            }
        }
    });
}
