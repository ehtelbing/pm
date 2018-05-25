Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');
    var deptStore = Ext.create('Ext.data.Store', {
        id: 'deptStore',
        autoLoad: true,
        fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
        proxy: {
            type: 'ajax',
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
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        },
        listeners: {
            load: function (store, records) {
                deptLoad = true;
                store.insert(0, {V_DEPTNAME: '全部', V_DEPTCODE: '%'});
                Ext.getCmp('V_V_DEPTCODE').select(store.first());
                _init();
            }
        }
    });


    var eTypeStore = Ext.create('Ext.data.Store', {
        id: 'eTypeStore',
        autoLoad: false,
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME', 'I_ORDER', 'I_ID'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        listeners: {
            load: function (store, records) {
                deptLoad = true;
                Ext.getCmp('equtype').select(store.first());
                _init();
            }
        }
    });

    var equNameStore = Ext.create('Ext.data.Store', {
        id: 'equNameStore',
        autoLoad: false,
        fields: ['V_EQUCODE', 'V_EQUNAME', 'I_ORDER', 'I_ID'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_06/pro_get_deptequ_per',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        listeners: {
            load: function (store, records) {
                deptLoad = true;
                Ext.getCmp('equname').select(store.first());
                _init();
            }
        }
    });

    var subequNameStore = Ext.create('Ext.data.Store', {
        id: 'subequNameStore',
        autoLoad: false,
        fields: ['sid', 'text'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'pm_19/PRO_SAP_PM_CHILDEQU_TREE',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            reader: {
                type: 'json',
                root: 'list'
            }
        },
        listeners: {
            load: function (store, records) {
                deptLoad = true;
                store.insert(0, {text: '全部', sid: '%'});
                Ext.getCmp('subequname').select(store.first());
                _init();
            }
        }
    });

    var date = new Date();
    var month;
    if (date.getMonth() + 1 < 10) {
        month = '0' + (date.getMonth() + 1);
    } else {
        month = date.getMonth() + 1;
    }

    var nextDate = new Date(date.getTime() + 24*60*60*1000);
    var sdate = date.getFullYear() + "-" + month + "-01";

    var panel = Ext.create('Ext.form.Panel', {
        id: 'panellow',
        region: 'north',
        width: '100%',
        align: 'center',
        frame: true,
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 70, inputWidth: 140, style: 'margin:5px 0px 5px 0px'},
        items: [
            {id: 'x_timelowerlimit', xtype: 'datefield', format: 'Y-m-d', value: sdate, fieldLabel: '起始日期'},
            {id: 'x_timeupperlimit', xtype: 'datefield', format: 'Y-m-d', value: nextDate, fieldLabel: '终止日期'}, {
                xtype: 'combo',
                id: 'V_V_DEPTCODE',
                store: deptStore,
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                forceSelection: true,
                labelWidth: 80,
                fieldLabel: '作业区',
                editable: false,
                listeners: {
                    change: function (combo, records) {
                        Ext.data.StoreManager.lookup('eTypeStore').load({
                            params: {
                                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                                V_V_DEPTCODENEXT: Ext.getCmp('V_V_DEPTCODE').getValue()
                            }
                        });
                    }
                }
            }, {
                xtype: 'combo',
                id: 'equtype',
                store: eTypeStore,
                queryMode: 'local',
                valueField: 'V_EQUTYPECODE',
                displayField: 'V_EQUTYPENAME',
                labelWidth: 80,
                forceSelection: true,
                fieldLabel: '设备类型',
                editable: false,
                listeners: {
                    change: function () {
                        Ext.data.StoreManager.lookup('equNameStore').load({
                            params: {
                                v_v_personcode: Ext.util.Cookies.get('v_personcode'),
                                v_v_deptcodenext: Ext.getCmp('V_V_DEPTCODE').getValue(),
                                v_v_equtypecode: Ext.getCmp('equtype').getValue()
                            }
                        });
                    }
                }
            }, {
                xtype: 'combo',
                id: 'equname',
                store: equNameStore,
                queryMode: 'local',
                valueField: 'V_EQUCODE',
                displayField: 'V_EQUNAME',
                labelWidth: 80,
                forceSelection: true,
                fieldLabel: '设备名称',
                editable: false,
                listeners: {
                    change: function () {
                        Ext.data.StoreManager.lookup('subequNameStore').load({
                            params: {
                                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                                V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                                V_V_DEPTNEXTCODE: Ext.getCmp('V_V_DEPTCODE').getValue(),
                                V_V_EQUTYPECODE: Ext.getCmp('equtype').getValue(),
                                V_V_EQUCODE: Ext.getCmp('equname').getValue()
                            }
                        });
                    }
                }
            }
            , {
                xtype: 'combo',
                id: 'subequname',
                store: subequNameStore,
                queryMode: 'local',
                valueField: 'sid',
                displayField: 'text',
                labelWidth: 80,
                forceSelection: true,
                fieldLabel: '子设备名称',
                labelAlign: 'right',
                editable: false
            },
            // { id: 'x_deptcode', xtype: 'combo', store: GetPlantname, fieldLabel: '单位名称', labelWidth: 72, displayField: 'V_DEPTNAME', valueField: 'V_DEPTCODE', queryMode: 'local', baseCls: 'margin-bottom' },
            // { id: 'x_equtypecode', xtype: 'combo', store: GetEqutype, fieldLabel: '设备类型', labelWidth: 70, displayField: 'V_EQUTYPENAME', valueField: 'V_EQUTYPECODE', queryMode: 'local', baseCls: 'margin-bottom' },
            //  { id: 'x_equcode', xtype: 'combo', store: GetEqucode, fieldLabel: '设备名称', labelWidth: 65, displayField: 'V_EQUNAME', valueField: 'V_EQUCODE', queryMode: 'local', baseCls: 'margin-bottom' },
            {
                xtype: 'button', text: '查询', width: 60, style: 'margin:5px 0px 5px 20px', icon: imgpath + '/search.png',
                listeners: {
                    click: OnGridQueryButtonClicked
                }
            },
            {
                xtype: 'button', text: '导出Excel', width: 100, style: 'margin:5px 0px 5px 20px', icon: imgpath + '/search.png',
                listeners: {
                    click: OnExcelButtonClicked
                }
            }
        ]
    });
    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        columnLines: true,
        region: 'center',
        width: '100%',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', width: 30, sortable: false},
            {text: '部门名称', dataIndex: 'V_DEPTNAME', width: 100, align: 'center', width: 100},
            {text: '设备名称', dataIndex: 'V_EQUNAME', width: 100, align: 'center', width: 100},
            {text: '装置名称', dataIndex: 'V_SETNAME', width: 100, align: 'center', width: 100},
            {text: '给油脂场所', dataIndex: 'V_LUBADDRESS', width: 100, align: 'center', width: 150},
            {text: '润滑方式', dataIndex: 'V_LUBMODE', width: 100, align: 'center', width: 100},
            {text: '润滑牌号', dataIndex: 'V_LUBTRADEMARK', width: 100, align: 'center', width: 100},
            {text: '润滑点数', dataIndex: 'F_LUBCOUNT', width: 100, align: 'center', width: 100},
            {text: '加油量', dataIndex: 'F_OILAMOUNT', width: 100, align: 'center', width: 100},
            {text: '单位', dataIndex: 'I_UNIT', width: 50, align: 'center', width: 100},
            {
                text: '加油时间', width: 160, dataIndex: 'D_OPERATEDATE', align: 'center',
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                    var index = store.find('D_OPERATEDATE', value);
                    if (index != -1) {
                        return store.getAt(index).get('D_OPERATEDATE').substring(0, 19);
                    }
                    return null;
                }
            },
            {text: '加油人员', dataIndex: 'V_OPERATEPERSON', width: 100, align: 'center', width: 100},
            {text: '加油原因', dataIndex: 'V_OPERATEREASON', width: 200, align: 'center', width: 300},
            {text: '类型', align: 'center', width: 100}


        ],
        store: {
            autoLoad: true,
            storeId: 'gridStore',
            pageSize: 10,
            fields: ['I_ID', 'V_LUBRICATIONCODE','V_SETNAME' ,'V_DEPTCODE', 'V_DEPTNAME', 'V_EQUTYPECODE',
                'V_EQUTYPENAME', 'V_EQUCODE', 'V_EQUNAME', 'V_LUBADDRESS', 'V_LUBMODE',
                'V_LUBTRADEMARK', 'F_LUBCOUNT', 'F_OILAMOUNT', 'V_ADDORCHANGE', 'D_OPERATEDATE',
                'V_OPERATEPERSON', 'V_OPERATEREASON', 'I_UNIT'],
            proxy: {
                type: 'ajax',
                url: AppUrl + 'zpf/PRO_QUERYLUBRECORD', // 'PRO_QUERYLUBRECORD',
                async: true,
                actionMethods: {
                    read: 'POST'
                },
                reader: {
                    type: 'json',
                    root: 'list'
                },
                extraParams: {}
            },
            listeners: {
                beforeload: BeforeGridStoreLoad
            }
        }
    });

    Ext.create('Ext.container.Viewport', {
        split: true,
        layout: 'border',
        items: [panel, grid]
    });
});

function _init() {
    if (deptLoad) {

        Ext.getBody().unmask();
    }
}

function OnGridQueryButtonClicked() {
    Ext.ComponentManager.get('grid').getStore().load();
}
function OnExcelButtonClicked(){

    var X_DEPTCODE='0';
    var X_EQUTYPECODE='0';
    var X_EQUCODE='0';
    if(Ext.getCmp('V_V_DEPTCODE').getValue()!='%'){
        X_DEPTCODE=Ext.getCmp('V_V_DEPTCODE').getValue();
    }
    if(Ext.getCmp('equtype').getValue()!='%'){
        X_EQUTYPECODE=Ext.getCmp('equtype').getValue();
    }
    if(Ext.getCmp('subequname').getValue()!='%'){
        X_EQUCODE=Ext.getCmp('subequname').getValue();
    }



    document.location.href = AppUrl + 'excel/RHQuery_EXCEL?X_TIMELOWERLIMIT=' +Ext.util.Format.date(Ext.getCmp("x_timelowerlimit").getValue(), "Y-m-d")+
        '&X_TIMEUPPERLIMIT=' +Ext.util.Format.date(Ext.getCmp("x_timelowerlimit").getValue(), "Y-m-d")+
        '&X_DEPTCODE=' +X_DEPTCODE+//Ext.getCmp('V_V_DEPTCODE').getValue()=='%'?'0':Ext.getCmp("V_V_DEPTCODE").getValue()+
        '&X_EQUTYPECODE=' +X_EQUTYPECODE+//Ext.getCmp('equtype').getValue()=='%'?'0':Ext.getCmp("equtype").getValue()+
        '&X_EQUCODE=' +X_EQUTYPECODE+//Ext.getCmp('subequname').getValue()=='%'?'0':Ext.getCmp("subequname").getValue()+
        '&X_LUBRICATIONCODE= ';

    /*document.location.href=AppUrl + 'excel/RHQuery_EXCEL?X_TIMELOWERLIMIT='+'2018-05-01'+//Ext.util.Format.date(Ext.getCmp("x_timelowerlimit").getValue(), "Y-m-d")+
        '&X_TIMEUPPERLIMIT='+'2018-05-26'+//Ext.util.Format.date(Ext.getCmp("x_timeupperlimit").getValue(), "Y-m-d")+
        '&X_DEPTCODE='+Ext.getCmp('V_V_DEPTCODE').getValue()=='%'?'0':Ext.getCmp("V_V_DEPTCODE").getValue()+
        '&X_EQUTYPECODE='+Ext.getCmp('equtype').getValue()=='%'?'0':Ext.getCmp("equtype").getValue()+
        '&X_EQUCODE='+Ext.getCmp('subequname').getValue()=='%'?'0':Ext.getCmp("subequname").getValue()+
        '&X_LUBRICATIONCODE='+'';*/

}

// 查询
function BeforeGridStoreLoad(store) {
    store.proxy.extraParams.X_TIMELOWERLIMIT = Ext.util.Format.date(Ext.getCmp("x_timelowerlimit").getValue(), "Y-m-d");
    store.proxy.extraParams.X_TIMEUPPERLIMIT = Ext.util.Format.date(Ext.getCmp("x_timeupperlimit").getValue(), "Y-m-d");
    store.proxy.extraParams.X_DEPTCODE = Ext.getCmp("V_V_DEPTCODE").getValue();
    store.proxy.extraParams.X_EQUTYPECODE = Ext.getCmp("equtype").getValue();
    store.proxy.extraParams.X_EQUCODE = Ext.getCmp("subequname").getValue();
store.proxy.extraParams.X_LUBRICATIONCODE = '';
}
