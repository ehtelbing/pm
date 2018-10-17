var V_V_PLANTCODE = '';
var V_V_DEPTCODE = '';
var A_EQUID = '';
var A_BEGINDATE = '';
var A_ENDDATE = '';
var ckStoreLoad = false;
var sbStoreLoad = false;
var deptStoreLoad = false;
var zyCycleStoreLoad = false;

Ext.onReady(function () {
    Ext.getBody().mask('<p>正在载入中...</p>');

    //厂矿
    var ckStore = Ext.create('Ext.data.Store', {
        id: 'ckStore',
        autoLoad: true,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_12/PRO_BASE_DEPT_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                IS_V_DEPTCODE: "",
                IS_V_DEPTTYPE: '[基层单位]'
            }
        },
        listeners: {
            load: function (store, records) {
                ckStoreLoad = true;
                Ext.getCmp('ckName').select(store.first());
                _init();
            }
        }

    });

    //作业区
    var deptStore = Ext.create('Ext.data.Store', {
        id: 'deptStore',
        autoLoad: false,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_12/PRO_BASE_DEPT_VIEW',
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
            load: function (store, records) {
                deptStoreLoad = true;
                Ext.getCmp('zyqName').select(store.first());
                _init();
            }
        }

    });

    //设备Store
    //var sbStore = Ext.create("Ext.data.Store", {
    //    id: 'sbStore',
    //    autoLoad: false,
    //    fields: ['EQU_ID', 'EQU_DESC'],
    //    proxy: {
    //        type: 'ajax',
    //        url: AppUrl + 'PM_12/PRO_RUN7111_EQULIST',
    //        actionMethods: {
    //            read: 'POST'
    //        },
    //        reader: {
    //            type: 'json',
    //            root: 'list'
    //        },
    //        extraParams: {}
    //    },
    //    listeners: {
    //        load: function (store, records) {
    //            sbStoreLoad = true;
    //            Ext.getCmp('EQU_DESC').select(store.first());
    //            _init();
    //        }
    //    }
    //});

    //作业周期类型
    var zyCycleStore = Ext.create("Ext.data.Store", {
        id: 'zyCycleStore',
        autoLoad: true,
        //pageSize: 100,
        fields: ['CYCLE_ID', 'CYCLE_DESC'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'ml/PRO_RUN_CYCLE_ABLE',
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
            load: function (store, records) {
                zyCycleStoreLoad = true;
                Ext.getCmp('CYCLE_TYPE').select(store.first());
                _init();
            }
        }

    });

    //作业量台账
    var yeildStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        pageSize: 100,
        storeId: 'yeildStore',
        fields: ['EQUNAME', 'CYCLE_DESC', 'CYCLE_UNIT', 'WORKDATE', 'INSERT_VALUE', 'INSERT_PERSON', 'INSERTDATE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/PRO_RUN_YEILD_SELECT',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            },
            extraParams: {}
        }

    });

    //菜单面板
    var tablePanel = Ext.create('Ext.panel.Panel', {
        //  title:'a',
        id: 'tablePanel',
        region: 'north',
        layout: 'vbox',
        frame: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'ckName',
                xtype: 'combo',
                store: ckStore,
                editable: false,
                fieldLabel: '厂矿',
                labelWidth: 80,
                width: 250,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectDeptName();
                    }
                }
            }, {
                id: 'zyqName',
                xtype: 'combo',
                store: deptStore,
                fieldLabel: '作业区',
                labelWidth: 80,
                width: 250,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
                //listeners: {
                //    change: function (field, newValue, oldValue) {
                //        _selectSBName();
                //    }
                //}
            }, {
                id:'sbName',
                xtype: 'combo',
                fieldLabel: '当前设备',
                readOnly: true,
                labelWidth: 80,
                width: 250,
                emptyText: '点击选择设备....',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right',
                listeners: {
                    click: {
                        element: 'el',
                        fn: function () {
                            var dept=Ext.getCmp("zyqName").getValue()=="%"?Ext.getCmp("ckName").getValue():Ext.getCmp("zyqName").getValue();
                            var returnValue = window.open(AppUrl + 'page/PM_090101/index.html?V_DEPTCODE=' + dept, '', 'height=' + '600px' + ',width=' + '1000px' + ',top=10px,left=10px,resizable=yes');
                        }
                    }
                }
            },
            {
                xtype: 'hidden',
                id: 'sbCode'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'CYCLE_TYPE',
                xtype: 'combo',
                store: zyCycleStore,
                fieldLabel: '作业周期类型',
                labelWidth: 80,
                width: 250,
                displayField: 'CYCLE_DESC',
                valueField: 'CYCLE_ID',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                id: 'A_BEGINDATE',
                xtype: 'datefield',
                editable: false,
                format: 'Y/m/d',
                submitFormat: 'Y-m-d',
                labelAlign: 'right',
                value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                fieldLabel: '起始日期',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                id: 'A_ENDDATE',
                xtype: 'datefield',
                editable: false,
                format: 'Y/m/d',
                submitFormat: 'Y-m-d',
                value: Ext.util.Format.date(new Date()),
                fieldLabel: '结束日期',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '查询',
                style: ' margin: 5px 0px 5px 20px',
                icon: imgpath + '/search.png',
                handler: _selectYield
            }, {
                xtype: 'button',
                text: '导出到Excel',
                handler: _exportExcel,
                style: ' margin: 5px 0px 5px 5px',
                icon: imgpath + '/excel.gif'
            }]
        }]
    });

    //显示面板
    var yeildGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'yeildGridPanel',
        store: yeildStore,
        width: '100%',
        region: 'sourth',
        border: false,
        columnLines: true,
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '周期类型',
            dataIndex: 'CYCLE_DESC',
            align: 'center',
            width: 180,
            flex: 1,
            renderer: atleft
        }, {
            text: '计算单位',
            dataIndex: 'CYCLE_UNIT',
            align: 'center',
            width: 180,
            flex: 1,
            renderer: atleft
        }, {
            text: '作业量',
            dataIndex: 'INSERT_VALUE',
            align: 'center',
            width: 180,
            flex: 1,
            renderer: atright
        }, {
            text: '作业日期',
            dataIndex: 'WORKDATE',
            align: 'center',
            width: 180,
            flex: 1,
            renderer: rendererDate
        }, {
            text: '录入人',
            dataIndex: 'INSERT_PERSON',
            align: 'center',
            width: 180,
            flex: 1,
            renderer: atleft
        }, {
            text: '录入时间',
            dataIndex: 'INSERTDATE',
            align: 'center',
            width: 180,
            flex: 1,
            renderer: rendererTime
        }],
        bbar: [{
            id: 'gpage',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: yeildStore
        }, {
            id: 'total',
            xtype: 'displayfield',
            fieldLabel: "<lable style='color:red; font-size:100px; font-weight:bold'>合计</lable>",
            value: 0,
            labelWidth: 80,
            width: 250,
            labelAlign: 'right',
            style: ' margin: 5px 0px 5px 5px'

        }]
    });


    //整体视图容器
    Ext.create('Ext.container.Viewport', {
        layout: {
            type: 'border',
            regionWeights: {
                west: -1,
                north: 1,
                south: 1,
                east: -1
            }
        },
        items: [{
            region: 'north',
            border: false,
            items: [tablePanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [yeildGridPanel]
        }]

    });

    _init();

});

//初始化
function _init() {

    if (ckStoreLoad  && deptStoreLoad && zyCycleStoreLoad) {//&& sbStoreLoad
        Ext.getBody().unmask();//去除页面笼罩
    }
};


//查询作业区
function _selectDeptName() {
    var deptStore = Ext.data.StoreManager.lookup('deptStore');
    deptStore.proxy.extraParams = {
        'IS_V_DEPTCODE': Ext.getCmp('ckName').getValue(),
        'IS_V_DEPTTYPE': '[主体作业区]'

    };
    deptStore.currentPage = 1;
    deptStore.load();
};
//返回的设备
function getEquipReturnValue(ret) {
    var str = ret.split('^');
    Ext.getCmp('sbCode').setValue(str[0]);
    Ext.getCmp('sbName').setValue(str[1]);
}

//查找设备
//function _selectSBName() {
//
//    var sbStore = Ext.data.StoreManager.lookup('sbStore');
//
//    V_V_PLANTCODE = Ext.getCmp('ckName').getValue();
//    V_V_DEPTCODE = Ext.getCmp('zyqName').getValue();
//
//    sbStore.proxy.extraParams = {
//        V_V_PLANTCODE: V_V_PLANTCODE,
//        V_V_DEPTCODE: V_V_DEPTCODE
//    };
//    sbStore.load();
//};


//查询作业量列表
function _selectYield() {
    A_EQUID = Ext.getCmp('sbCode').getValue();
    A_BEGINDATE = Ext.getCmp('A_BEGINDATE').getSubmitValue();
    A_ENDDATE = Ext.getCmp('A_ENDDATE').getSubmitValue();
    A_CYCLE_ID = Ext.getCmp('CYCLE_TYPE').getValue();

    var yeildStore = Ext.data.StoreManager.lookup('yeildStore');
    yeildStore.proxy.extraParams = {
        A_EQUID: A_EQUID,
        A_BEGINDATE: A_BEGINDATE,
        A_ENDDATE: A_ENDDATE,
        A_CYCLE_ID: A_CYCLE_ID
    };
    yeildStore.load();

    _sum();
};

function _sum() {

    Ext.Ajax.request({
        url: AppUrl + 'ml/PRO_RUN_YEILD_SELECT',
        type: 'ajax',
        method: 'POST',
        params: {
            A_EQUID: A_EQUID,
            A_BEGINDATE: A_BEGINDATE,
            A_ENDDATE: A_ENDDATE,
            A_CYCLE_ID: A_CYCLE_ID
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            //alert(data.RET_SUM);
            Ext.getCmp('total').setValue(data.RET_SUM);

        },
        failure: function (response) {//访问到后台时执行的方法。
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            })
        }

    });
};

function rendererTime(value, metaData) {
    metaData.style = "text-align:center";
    return '<div data-qtip="' + value.substring(0, 10) + '" >' + value.substring(0, 10) + '</div>';
};

function rendererDate(value, metaData) {
    metaData.style = "text-align:center";
    var d = value.substring(0, 4);
    var c = value.substring(4, 6);
    var e = value.substring(6, 8);
    return d + '-' + c + '-' + e;
};

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
};

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
};

//导出Excel
function _exportExcel() {
    document.location.href = AppUrl + 'ml/YEILD_SELECT_EXCEL?A_EQUID=' + encodeURI(encodeURI(A_EQUID)) +
    '&A_BEGINDATE=' + A_BEGINDATE + '&A_ENDDATE=' + A_ENDDATE +
    '&A_CYCLE_ID=' + encodeURI(encodeURI(A_CYCLE_ID));
}
