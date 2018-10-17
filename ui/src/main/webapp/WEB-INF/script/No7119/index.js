var V_V_PLANTCODE = '';
var V_V_DEPTCODE = '';
var IN_EQUID = '';
var IN_STATUS = '';
var IN_BJCODE = '';
var IN_BJDESC = '';
var V_SITE_ID = '';
var V_BEGINDATE = '';
var V_ENDDATE = '';

var ckStoreLoad = false;
var deptStoreLoad = false;
var sbStoreLoad = false;

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
                //store.insert(0, {
                //    'V_DEPTCODE': '%',
                //    'V_DEPTNAME': '全部'
                //});
                Ext.getCmp('zyqName').select(store.first());
                deptStoreLoad = true;
                _init();
            }
        }

    });

    //设备Store
    var sbStore = Ext.create("Ext.data.Store", {
        id: 'sbStore',
        autoLoad: false,
        fields: ['EQU_ID', 'EQU_DESC'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_12/PRO_RUN7111_EQULIST',
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
                store.insert(0, {
                    'EQU_ID': '%',
                    'EQU_DESC': '全部'
                });
                Ext.getCmp('EQU_DESC').select(store.first());
                sbStoreLoad = true;
                _init()
            }
        }
    });

    //备件状态Store
    var bjStatusStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'bjStatusStore',
        fields: ['BJ_CODE', 'BJ_STATUS'],
        listeners: {
            load: function (store, records) {
                store.insert(0, {
                    'BJ_CODE': 'INUSE',
                    'BJ_STATUS': '在用'
                });
                store.insert(1, {
                    'BJ_CODE': 'NOT_INUSE',
                    'BJ_STATUS': '不在用'
                });
                Ext.getCmp('BJ_STATUS').select(store.first());
                bjStatusStoreLoad = true;
                _init()
            }
        }

    });

    //查找备件位置Store
    var bjSiteStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        pageSize: 100,
        storeId: 'bjSiteStore',
        fields: ['SITE_DESC', 'SITE_ID', 'BJ_UNIQUE_CODE', 'MATERIALCODE', 'MATERIALNAME', 'UNIT', 'CHANGEDATE', 'SUPPLY_NAME',
            'BJ_STATUS'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/PRO_RUN_SITE_BJ_ALL',
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

    //查询更换情况Store
    var changeConditionStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        pageSize: 100,
        storeId: 'changeConditionStore',
        fields: ['CHANGEDATE', 'BJ_UNIQUE_CODE', 'MATERIALNAME', 'UNIT', 'CHANGE_EQUNAME', 'CHANGE_SITE_DESC', 'SUPPLY_NAME', 'DIRECTION',
            'REMARK'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'mwd/PRO_RUN_SITE_BJ_CHANGE_LOG_ALL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'RET',
                totalProperty: 'total'
            },
            extraParams: {}
        }

    });

    //菜单面板
    var tablePanel = Ext.create('Ext.panel.Panel', {
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
                labelAlign: 'right',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectSBName();
                    }
                }
            }, {
                id: 'BJ_STATUS',
                xtype: 'combo',
                store: bjStatusStore,
                fieldLabel: '备件状态',
                labelWidth: 80,
                width: 250,
                displayField: 'BJ_STATUS',
                valueField: 'BJ_STATUS',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'EQU_DESC',
                xtype: 'combo',
                store: sbStore,
                fieldLabel: '当前设备',
                labelWidth: 80,
                width: 250,
                displayField: 'EQU_DESC',
                valueField: 'EQU_ID',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'BJ_CODE',
                queryMode: 'local',
                fieldLabel: '备件编码',
                emptyText: '请输入备件编码',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 0px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'BJ_DESC',
                queryMode: 'local',
                fieldLabel: '备件描述',
                emptyText: '请输入备件描述',
                labelWidth: 80,
                width: 250,
                style: ' margin: 5px 0px 0px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '查询',
                style: ' margin: 5px 0px 5px 20px',
                icon: imgpath + '/search.png',
                handler: _selectBJ
            }, {
                xtype: 'button',
                text: '导出到Excel',
                style: ' margin: 5px 0px 5px 5px',
                icon: imgpath + '/excel.gif',
                handler: _exportExcel
            }]
        }]
    });

    //显示面板
    var bjGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'bjGridPanel',
        store: bjSiteStore,
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
            text: '备件安装位置',
            dataIndex: 'SITE_DESC',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '备件唯一标识',
            dataIndex: 'BJ_UNIQUE_CODE',
            align: 'center',
            width: 240,
            renderer: atright
        }, {
            text: '物资编码',
            dataIndex: 'MATERIALCODE',
            align: 'center',
            width: 120,
            renderer: atright
        }, {
            text: '物资描述',
            dataIndex: 'MATERIALNAME',
            align: 'center',
            width: 220,
            renderer: atleft
        }, {
            text: '计量单位',
            dataIndex: 'UNIT',
            align: 'center',
            width: 80,
            renderer: atright
        }, {
            text: '最近更换时间',
            dataIndex: 'CHANGEDATE',
            align: 'center',
            width: 120,
            renderer: rendererTime
        }, {
            text: '供应商',
            dataIndex: 'SUPPLY_NAME',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '备件状态',
            dataIndex: 'BJ_STATUS',
            align: 'center',
            width: 80,
            renderer: atleft
        }, {
            text: '备件更换历史',
            align: 'center',
            width: 100,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href="#" onclick="_checkHistory(\'' + record.data.SITE_ID + '\' )">' + '查看' + '</a>';
            }
        }, {
            text: 'VG图',
            dataIndex: 'DEPARTNAME',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href="#" onclick="_checkVG(\'' + record.data.SITE_ID + '\')">' + '显示' + '</a>';
            }
        }],
        bbar: [{
            id: 'gpage',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            width: '100%',
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: bjSiteStore
        }]
    });

    //查看详细更换面板
    var checkHistoryPanel = Ext.create('Ext.form.Panel', {
        id: 'checkHistoryPanel',
        region: 'fit',
        width: '100%',
        frame: true,
        layout: 'column',
        items: [{
            id: 'A_BEGINDATE',
            xtype: 'datefield',
            editable: false,
            format: 'Y/m/d',
            submitFormat: 'Ymd',
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
            submitFormat: 'Ymd',
            value: Ext.util.Format.date(new Date()),
            fieldLabel: '结束日期',
            labelWidth: 80,
            width: 250,
            style: ' margin: 5px 0px 5px 0px',
            labelAlign: 'right'
        }, {
            xtype: 'button',
            text: '查询更换情况',
            handler: _checkChange,
            style: ' margin: 5px 0px 5px 10px',
            icon: imgpath + '/search.png'
        }]
    });

    //详细更换面板显示grid
    var checkHistoryGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'checkHistoryGridPanel',
        store: changeConditionStore,
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
            text: '更换日期',
            dataIndex: 'CHANGEDATE',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '备件唯一标识',
            dataIndex: 'BJ_UNIQUE_CODE',
            align: 'center',
            width: 240,
            renderer: atright
        }, {
            text: '物资描述',
            dataIndex: 'MATERIALNAME',
            align: 'center',
            width: 250,
            renderer: atleft
        }, {
            text: '计量单位',
            dataIndex: 'UNIT',
            align: 'center',
            width: 80,
            renderer: atright
        }, {
            text: '设备',
            dataIndex: 'CHANGE_EQUNAME',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '备件安装位置',
            dataIndex: 'CHANGE_SITE_DESC',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '供应商',
            dataIndex: 'SUPPLY_NAME',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '更换方向',
            dataIndex: 'DIRECTION',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '备注',
            dataIndex: 'REMARK',
            align: 'center',
            width: 120,
            renderer: atleft
        }],
        bbar: [{
            id: 'gpage1',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            width: '100%',
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: changeConditionStore
        }]
    });

    //弹出框容器
    var checkHistoryWindow = Ext.create('Ext.window.Window', {
        id: 'checkHistoryWindow',
        title: '<div align="center"> 备件更换历史</div>',
        width: 700,
        height: 400,
        modal: true,
        plain: true,
        closable: true,
        closeAction: 'close',
        model: true,
        layout: 'border',
        frame: true,
        items: [{
            region: 'north',
            border: false,
            items: [checkHistoryPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [checkHistoryGridPanel]
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
            items: [bjGridPanel]
        }]

    });

    _init();

});

//初始化
function _init() {

    if (ckStoreLoad && sbStoreLoad && deptStoreLoad) {
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

//查找设备
function _selectSBName() {

    var sbStore = Ext.data.StoreManager.lookup('sbStore');

    V_V_PLANTCODE = Ext.getCmp('ckName').getValue();
    V_V_DEPTCODE = Ext.getCmp('zyqName').getValue();

    sbStore.proxy.extraParams = {
        V_V_PLANTCODE: V_V_PLANTCODE,
        V_V_DEPTCODE: V_V_DEPTCODE
    };
    sbStore.load();
};


//查询备件历史更换台账
function _selectBJ() {
    IN_EQUID = Ext.getCmp('EQU_DESC').getValue();
    IN_STATUS = Ext.getCmp('BJ_STATUS').getValue();
    IN_BJCODE = Ext.getCmp('BJ_CODE').getValue();
    IN_BJDESC = Ext.getCmp('BJ_DESC').getValue();
    V_V_PLANTCODE = Ext.getCmp('ckName').getValue();
    V_V_DEPTCODE = Ext.getCmp('zyqName').getValue();

    var bjSiteStore = Ext.data.StoreManager.lookup('bjSiteStore');

    bjSiteStore.proxy.extraParams = {
        IN_EQUID: IN_EQUID,
        IN_PLANT: V_V_PLANTCODE,
        IN_DEPART: V_V_DEPTCODE,
        IN_STATUS: IN_STATUS,
        IN_BJCODE: IN_BJCODE,
        IN_BJDESC: IN_BJDESC
    };
    bjSiteStore.load();

};

//时间显示
function rendererTime(value, metaData) {
    metaData.style = "text-align:right";
    return '<div data-qtip="' + value.substring(0, 10) + '" >' + value.substring(0, 10) + '</div>';
};

//查看详细更换历史
function _checkHistory(SITE_ID) {

    V_SITE_ID = SITE_ID;
    Ext.getCmp('checkHistoryWindow').show();
    _checkChange();
};

//查询更换情况
function _checkChange() {
    V_BEGINDATE = Ext.getCmp('A_BEGINDATE').getSubmitValue();
    V_ENDDATE = Ext.getCmp('A_ENDDATE').getSubmitValue();
    var changeConditionStore = Ext.data.StoreManager.lookup('changeConditionStore');

    changeConditionStore.proxy.extraParams = {
        V_SITE_ID: V_SITE_ID,
        V_BEGINDATE: V_BEGINDATE,
        V_ENDDATE: V_ENDDATE
    };
    changeConditionStore.load();
    Ext.getCmp('A_BEGINDATE').setValue(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    Ext.getCmp('A_ENDDATE').setValue(Ext.util.Format.date(new Date()));

};

//查看VG图
function _checkVG(SITE_ID) {

    V_SITE_ID = SITE_ID;
    Ext.Ajax.request({
        url: AppUrl + 'ml/PRO_RUN7119_SITEVGURL',
        type: 'ajax',
        method: 'POST',
        params: {
            V_SITE_ID: V_SITE_ID
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.success) {//成功，会传回true
                _showVG(data.RET);
            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: 'no',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        },
        failure: function (response) {//访问到后台时执行的方法。
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            })
        }

    })

};

function _showVG(url) {
    var owidth = window.document.body.offsetWidth - 700;
    var oheight = window.document.body.offsetHeight - 300;
    var ret = window.open(url, 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
};

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
};

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
};

//导出设备备件Excel
function _exportExcel() {
    document.location.href = AppUrl + 'ml/PRO_RUN_SITE_BJ_ALL_EXCEL?IN_EQUID=' + encodeURI(encodeURI(IN_EQUID)) + '&IN_DEPART=' + encodeURI(encodeURI(V_V_DEPTCODE)) +
    '&IN_PLANT=' + encodeURI(encodeURI(V_V_PLANTCODE)) + '&IN_STATUS=' + encodeURI(encodeURI(IN_STATUS)) + '&IN_BJCODE=' + encodeURI(encodeURI(IN_BJCODE)) +
    '&IN_BJDESC=' + encodeURI(encodeURI(IN_BJDESC));
}



