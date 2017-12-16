Ext.onReady(function () {
    Ext.QuickTips.init();
    var ckStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'ckStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/dept_sel',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                V_V_PERSONCODE:   Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE:    Ext.util.Cookies.get('v_orgCode'),
                V_V_DEPTCODENEXT:    Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE:   '[基层单位]'
            }
        }
    });

    var zyqStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'zyqStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/dept_sel',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }

        }
    });

    var sbmcStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'sbmcStore',
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

    var sblxStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'sblxStore',
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

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['I_ID', 'V_DEFECTLIST', 'V_SOURCECODE',
            'V_SOURCENAME', 'V_SOURCETABLE', 'V_SOURCEREMARK',
            'V_SOURCEID', 'D_DEFECTDATE', 'D_INDATE', 'V_PERCODE',
            'V_PERNAME', 'V_ORGCODE', 'V_ORGNAME', 'V_DEPTCODE',
            'V_DEPTNAME', 'V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE',
            'V_EQUSITENAME', 'V_EQUTYPECODE', 'V_EQUTYPENAME',
            'V_IDEA', 'V_STATECODE', 'V_STATENAME', 'V_STATECOLOR',
            'V_GUID'],

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

    var panel = Ext.create('Ext.panel.Panel', {
        frame: true,
        region: 'north',
        layout: 'column',
        defaults : {
            style : 'margin:5px 0px 5px 5px',
            labelAlign : 'right'
        },
        items: [{
            id: 'begintime',
            xtype: 'datefield',
            editable: false,
            format: 'Y/m/d',
            value: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
            fieldLabel: '时间段选择',
            labelWidth: 100,
            labelAlign: 'right'
        }, {
            id: 'endtime',
            xtype: 'datefield',
            editable: false,
            format: 'Y/m/d',
            value: new Date(),
            fieldLabel: '至',
            labelWidth: 100,
            labelAlign: 'right'
        }, {
            id: 'ck',
            xtype: 'combo',
            store: ckStore,
            editable: false,
            fieldLabel: '厂矿',
            labelWidth: 100,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            labelAlign: 'right'
        }, {
            id: 'zyq',
            xtype: 'combo',
            store: zyqStore,
            editable: false,
            fieldLabel: '作业区',
            labelWidth: 100,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            labelAlign: 'right'
        }, {
            id: 'sblx',
            xtype: 'combo',
            store: sblxStore,
            editable: false,
            fieldLabel: '设备类型',
            labelWidth: 100,
            displayField: 'V_EQUTYPENAME',
            valueField: 'V_EQUTYPECODE',
            queryMode: 'local',
            labelAlign: 'right'
        }, {
            id: 'sbmc',
            xtype: 'combo',
            store: sbmcStore,
            editable: false,
            fieldLabel: '设备名称',
            labelWidth: 100,
            displayField: 'V_EQUNAME',
            valueField: 'V_EQUCODE',
            queryMode: 'local',
            labelAlign: 'right'
        }, {
            id: 'seltext',
            xtype: 'textfield',
            width: 158,
            emptyText: '缺陷明细模糊搜索',
            margin:'5px 0px 5px 110px'
        }, {
            xtype: 'button',
            icon: imgpath + '/search.png',
            text: '查询',
            handler: QueryGrid
        }, {
            xtype: 'button',
            text: '修改',
            icon: imgpath + '/edit.png',
            handler: EditClick
        }, {
            xtype: 'button',
            text: '消缺',
            icon: imgpath + '/delete.png',
            handler: SQClick
        }]
    });

    var grid = Ext.create("Ext.grid.Panel", {
        region: 'center',
        id: 'grid',
        columnLines: true,
        width: '100%',
        store: gridStore,
        autoScroll: true,
        selType: 'checkboxmodel',
        height: 400,
        columns: [{
            xtype: 'rownumberer',
            width: 30,
            sortable: false
        }, {
            text: '缺陷日期',
            dataIndex: 'D_DEFECTDATE',
            align: 'center',
            width: 160,
            renderer: CreateGridColumnTd
        }, {
            text: '缺陷明细',
            dataIndex: 'V_DEFECTLIST',
            align: 'center',
            width: 240,
            renderer: CreateGridColumnTd
        }, {
            text: '设备',
            dataIndex: 'V_EQUNAME',
            align: 'center',
            width: 150,
            renderer: CreateGridColumnTd
        }, {
            text: '设备位置',
            dataIndex: 'V_EQUSITE',
            align: 'center',
            width: 240,
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

    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel, grid]
    });

    Ext.data.StoreManager.lookup('ckStore').on(
        'load',
        function () {
            Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
            Ext.data.StoreManager.lookup('zyqStore').load(
                {
                    params: {
                        V_V_PERSONCODE :  Ext.util.Cookies.get('v_personcode'),
                        V_V_DEPTCODE  : Ext.getCmp("ck").getValue(),
                        V_V_DEPTCODENEXT:  Ext.util.Cookies.get('v_deptcode'),
                        V_V_DEPTTYPE :   '[主体作业区]'
                    }
                });
        });

    Ext.data.StoreManager.lookup('zyqStore').on(
        'load',
        function () {
            Ext.getCmp('zyq').select(
                Ext.data.StoreManager.lookup('zyqStore').getAt(
                    0));
            Ext.data.StoreManager.lookup('sblxStore').load(
                {
                    params: {
                        V_V_PERSONCODE  :  Ext.util.Cookies.get('v_personcode'),
                        V_V_DEPTCODENEXT :  Ext.getCmp("zyq").getValue()
                    }
                });
        });

    Ext.data.StoreManager
        .lookup('sblxStore')
        .on(
        'load',
        function () {
            Ext.getCmp('sblx').select(Ext.data.StoreManager.lookup( 'sblxStore').getAt(0));
            Ext.data.StoreManager.lookup('sbmcStore') .load( {
                    params: {
                        V_V_PERSONCODE  : Ext.util.Cookies.get('v_personcode'),
                        V_V_DEPTCODENEXT : Ext.getCmp( "zyq").getValue(),
                        V_V_EQUTYPECODE : Ext.getCmp("sblx").getValue()
                    }
                });
        });

    Ext.data.StoreManager.lookup('sbmcStore').on(
        'load',
        function () {
            Ext.getCmp('sbmc').select(
                Ext.data.StoreManager.lookup('sbmcStore')
                    .getAt(0));
            QueryGrid();
        });

    Ext.getCmp('ck').on(
        'select',
        function () {
            Ext.data.StoreManager.lookup('zyqStore').load(
                {
                    params: {
                        V_V_PERSONCODE :  Ext.util.Cookies.get('v_personcode'),
                        V_V_DEPTCODE  : Ext.getCmp("ck").getValue(),
                        V_V_DEPTCODENEXT:  Ext.util.Cookies.get('v_deptcode'),
                        V_V_DEPTTYPE :   '[主体作业区]'
                    }
                });
        });

    Ext.getCmp('zyq').on(
        'select',
        function () {
            Ext.data.StoreManager.lookup('sblxStore').load(
                {
                    params: {
                        V_V_PERSONCODE  :  Ext.util.Cookies.get('v_personcode'),
                        V_V_DEPTCODENEXT :  Ext.getCmp("zyq").getValue()
                    }
                });
        });

    Ext.getCmp('sblx').on('select', function () {
            Ext.data.StoreManager.lookup('sbmcStore').load(
                {
                    params: {
                        V_V_PERSONCODE  : Ext.util.Cookies.get('v_personcode'),
                        V_V_DEPTCODENEXT : Ext.getCmp( "zyq").getValue(),
                        V_V_EQUTYPECODE : Ext.getCmp("sblx").getValue()
                    }
                });
        });

    Ext.getCmp('sbmc').on('select', function () {
        QueryGrid();
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_D_DEFECTDATE_B:  Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(), 'Y/m/d'),
            V_D_DEFECTDATE_E:   Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y/m/d'),
            V_V_DEPTCODE  :Ext.getCmp('zyq').getValue(),
            V_V_EQUTYPECODE:    Ext.getCmp('sblx').getValue(),
            V_V_EQUCODE    :Ext.getCmp('sbmc').getValue(),
            V_V_STATECODE :'10',
            V_V_SOURCECODE :   'defct01',
            V_V_DEFECTLIST :  Ext.getCmp('seltext').getValue(),
            X_PERSONCODE   : Ext.util.Cookies.get('v_personcode'),
            V_V_PAGE:Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE:Ext.getCmp('page').store.pageSize

        }
    });
});

function QueryGrid() {
    Ext.getCmp('page').store.currentPage = 1;
    Ext.data.StoreManager.lookup('gridStore').load(
        {
            params: {
                V_D_DEFECTDATE_B:  Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(), 'Y/m/d'),
                V_D_DEFECTDATE_E:   Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(), 'Y/m/d'),
                V_V_DEPTCODE  :Ext.getCmp('zyq').getValue(),
                V_V_EQUTYPECODE:    Ext.getCmp('sblx').getValue(),
                V_V_EQUCODE    :Ext.getCmp('sbmc').getValue(),
                V_V_STATECODE :'10',
                V_V_SOURCECODE :   'defct01',
                V_V_DEFECTLIST :  Ext.getCmp('seltext').getValue(),
                X_PERSONCODE   : Ext.util.Cookies.get('v_personcode'),
                V_V_PAGE:Ext.getCmp('page').store.currentPage,
                V_V_PAGESIZE:Ext.getCmp('page').store.pageSize
            }
        });
}

function EditClick() {
    var length = Ext.getCmp('grid').getSelectionModel().getSelection().length;
    if (length != 1) {
        alert( '请选择一条数据进行修改');
    } else if(Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.V_STATECODE!='10') {
        alert('该数据不在未处理状态，不能修改');
    }else{
        var GUID = Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.V_GUID;
        var owidth = window.document.body.offsetWidth - 200;
        var oheight = window.document.body.offsetHeight - 100;
        var ret = window.open(AppUrl + "page/PM_070601/index.html?V_GUID=" + GUID  , '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
    }
}

function getReturnValue(ret){
    if (ret == 'yes') {
        QueryGrid();
    }
}

function SQClick(store) {
    var length = Ext.getCmp('grid').getSelectionModel().getSelection().length;
    if (length != 1) {
       alert('请选择一条数据进行修改');
    } else {
        var GUID = Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.V_GUID;
        var owidth = window.document.body.offsetWidth - 200;
        var oheight = window.document.body.offsetHeight - 100;
        var ret = window.open(AppUrl + "page/PM_070201/index.html?V_GUID=" + GUID  , '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
    }
}

//function beforeloadStore(store) {
//    store.proxy.extraParams.parName = ['V_D_DEFECTDATE_B', 'V_D_DEFECTDATE_E',
//        'V_V_DEPTCODE', 'V_V_EQUTYPECODE', 'V_V_EQUCODE', 'V_V_STATECODE',
//        'V_V_SOURCECODE', 'V_V_DEFECTLIST', 'X_PERSONCODE'];
//    store.proxy.extraParams.parType = ['da', 'da', 's', 's', 's', 's', 's',
//        's', 's'];
//    store.proxy.extraParams.parVal = [
//        Ext.Date.format(Ext.ComponentManager.get("begintime").getValue(),
//            'Y-m-d'),
//        Ext.Date.format(Ext.ComponentManager.get("endtime").getValue(),
//            'Y-m-d'), Ext.getCmp('zyq').getValue(),
//        Ext.getCmp('sblx').getValue(), Ext.getCmp('sbmc').getValue(), '10',
//        'defct01', Ext.getCmp('seltext').getValue(),
//        Ext.util.Cookies.get('v_personcode')];
//    store.proxy.extraParams.proName = 'PRO_PM_DEFECT_VIEW_PER';
//    store.proxy.extraParams.cursorName = 'V_CURSOR';
//}

function CreateGridColumnTd(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;color:"
    + store.getAt(rowIndex).get('V_STATECOLOR');
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}