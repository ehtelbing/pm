var V_PICGUID = '';
var sh = window.screen.height / 2 - 10;
var sw = window.screen.width / 4 + 100;

var ckStoreLoad = false;
var deptStoreLoad = false;
var sblxStoreLoad = false;
var sbmcStoreLoad = false;

Ext.define('Ext.ux.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    async: true,
    doRequest: function (operation, callback, scope) {
        var writer = this.getWriter(),
            request = this.buildRequest(operation);
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        Ext.apply(request, {
            async: this.async,
            binary: this.binary,
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, callback, scope),
            method: this.getMethod(request),
            disableCaching: false
        });
        Ext.Ajax.request(request);
        return request;
    }
});

Ext.onReady(function () {
    Ext.QuickTips.init();
    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果

    var ckStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'ckStore',
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
        },
        listeners: {
            load: function (store, records) {
                ckStoreLoad = true;
                Ext.getCmp('ck').select(store.first());
                _init();
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
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
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
                Ext.getCmp('zyq').select(store.first());
                _init();
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
            url: AppUrl + 'pm_19/PRO_GET_DEPTEQUTYPE_ADMIN',
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
                sblxStoreLoad = true;
                Ext.getCmp('sblx').select(store.first());
                _init();
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
            url: AppUrl + 'pm_19/PRO_GET_DEPTEQU_ADMIN',
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
                sbmcStoreLoad = true;
                Ext.getCmp('sbmc').select(store.first());
                _init();
            }
        }
    });

    var djDataCreateStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'djDataCreateStore',
        fields: ['V_PARTNAME', 'V_OILPLACE', 'V_OIL_SNAME', 'V_OIL_WNAME', 'V_OIL_SMODEL', 'V_OIL_WMODEL', 'V_COUNT', 'V_OIL_NUM',
            'V_OIL_CYC', 'V_GW_PER', 'V_ZY_PER', 'V_REPAIR_PER', 'V_CONTENT'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/PM_OIL_STANDARD_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var imageStore = Ext.create('Ext.data.Store', {
        id: 'imageStore',
        autoLoad: false,
        fields: ['V_EQUCODE', 'V_FILENAME', 'V_FILEURL', 'D_ALTERTIME', 'N_IS_MAINPHOTO', 'D_DATE_EDITTIME', 'V_EDIT_GUID'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'mwd/SAP_PM_EQU_FILE_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        })
    });


    var djDataCreatePanel = Ext.create('Ext.grid.Panel', {
        id: 'djDataCreatePanel',
        store: djDataCreateStore,
        width: '100%',
        region: 'west',
        border: false,
        columnLines: true,
        /*   selModel: {
         selType: 'checkboxmodel',
         mode: 'SIMPLE'
         },*/
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '部位名称',
            dataIndex: 'V_PARTNAME',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '给油脂场所',
            dataIndex: 'V_OILPLACE',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '油品名称',
            align: 'center',
            columns: [{
                text: '冬季',
                dataIndex: 'V_OIL_WNAME',
                align: 'center',
                renderer: atleft,
                width: 120
            }, {
                text: '夏季',
                dataIndex: 'V_OIL_SNAME',
                align: 'center',
                renderer: atleft,
                width: 120
            }]
        }, {
            text: '油品型号',
            align: 'center',
            columns: [{
                text: '冬季',
                dataIndex: 'V_OIL_WMODEL',
                align: 'center',
                renderer: atright,
                width: 80
            }, {
                text: '夏季',
                dataIndex: 'V_OIL_SMODEL',
                align: 'center',
                renderer: atright,
                width: 80
            }]
        }, {
            text: '润滑点数',
            dataIndex: 'V_COUNT',
            align: 'center',
            width: 80,
            renderer: atright
        }, {
            text: '补充油标准',
            align: 'center',
            columns: [{
                text: '油量（L或kg）',
                dataIndex: 'V_OIL_NUM',
                align: 'center',
                renderer: atright,
                width: 120
            }, {
                text: '周期',
                dataIndex: 'V_OIL_CYC',
                align: 'center',
                renderer: atleft,
                width: 180
            }]
        }, {
            text: '分工负责人',
            align: 'center',
            columns: [{
                text: '岗位人员',
                dataIndex: 'V_GW_PER',
                align: 'center',
                renderer: atleft,
                width: 80
            }, {
                text: '专业点检',
                dataIndex: 'V_ZY_PER',
                align: 'center',
                renderer: atleft,
                width: 80
            }, {
                text: '检修人员',
                dataIndex: 'V_REPAIR_PER',
                align: 'center',
                renderer: atleft,
                width: 80
            }]
        }, {
            text: '备注',
            dataIndex: 'V_CONTENT',
            align: 'center',
            renderer: atleft,
            width: 100
        }]

    });

    var northpanel = Ext.create('Ext.panel.Panel', {
        id: 'northpanel',
        region: 'north',
        width: '100%',
        frame: true,
        layout: 'column',
        items: [{
            xtype: 'combo',
            id: 'ck',
            store: ckStore,
            fieldLabel: '单位名称',
            style: ' margin: 5px 0px 5px 10px',
            labelWidth: 70,
            labelAlign: 'right',
            editable: false,
            queryMode: 'local',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            listeners: {
                change: function (field, newValue, oldValue) {
                    _selectDeptName();
                }
            }
        },
            {
                xtype: 'combo',
                id: 'zyq',
                store: zyqStore,
                fieldLabel: '作业区',
                style: ' margin: 5px 0px 5px 10px',
                labelWidth: 70,
                labelAlign: 'right',
                editable: false,
                queryMode: 'local',
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectSBLX();
                    }
                }
            },
            {
                xtype: 'combo',
                id: 'sblx',
                store: sblxStore,
                fieldLabel: '设备类型',
                style: ' margin: 5px 0px 5px 10px',
                labelWidth: 70,
                labelAlign: 'right',
                editable: false,
                queryMode: 'local',
                displayField: 'V_EQUTYPENAME',
                valueField: 'V_EQUTYPECODE',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectSBName();
                    }
                }
            },
            {
                xtype: 'combo',
                id: 'sbmc',
                store: sbmcStore,
                fieldLabel: '设备名称',
                style: ' margin: 5px 0px 5px 10px',
                labelWidth: 70,
                labelAlign: 'right',
                editable: false,
                queryMode: 'local',
                displayField: 'V_EQUNAME',
                valueField: 'V_EQUCODE'
            }, {
                xtype: 'textfield',
                emptyText: '润滑部位搜索',
                style: ' margin: 5px 0px 5px 85px'
            },
            {
                xtype: 'button',
                text: '查询',
                style: ' margin: 5px 0px 5px 10px',
                icon: imgpath + '/search.png',
                handler: _select
            }]

    });

    var viewImagePanel = Ext.create("Ext.panel.Panel", {
        id: 'viewImagePanel',
        title: '设备润滑点示意图',
        editable: false,
        region: 'center',
        html: "<div id = 'yulan'> <table border='0' width='100%' height='100%'><tr> <td> </td><td> <img src='" + imgpath + "/PM_010302.png' width= '" + sw + "px' height='" + sh + "px' /> </td> <td> </td> </tr> <tr> <td></td> <td align='center'></td> <td></td> </tr> </table> </div>",
        style: ' margin: 0px 0px 0px 0px',
        columnLines: true
    });


    Ext.create('Ext.container.Viewport', {
        layout: {
            type: 'border'
            /*  regionWeights: {
             west: -1,
             north: 1,
             south: 1,
             east: -1
             }*/
        },
        items: [{
            region: 'north',
            border: false,
            items: [northpanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [djDataCreatePanel]
        }, {
            region: 'east',
            border: false,
            items: [viewImagePanel]
        }]


    });

    _init();
});


function _init() {
    if (ckStoreLoad && deptStoreLoad && sblxStoreLoad && sbmcStoreLoad) {

        Ext.getBody().unmask();//去除页面笼罩
    }

};

//查询作业区
function _selectDeptName() {
    var zyqStore = Ext.data.StoreManager.lookup('zyqStore');
    zyqStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
        V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode'),
        V_V_DEPTTYPE: '[主体作业区]'

    };
    zyqStore.load();
};

//查询设备类型
function _selectSBLX() {
    var sblxStore = Ext.data.StoreManager.lookup('sblxStore');
    sblxStore.proxy.extraParams = {
        'V_V_DEPTCODENEXT': Ext.getCmp('zyq').getValue()

    };
    sblxStore.load();
};

//查询设备名称
function _selectSBName() {
    var sbmcStore = Ext.data.StoreManager.lookup('sbmcStore');
    sbmcStore.proxy.extraParams = {
        'V_V_DEPTCODENEXT': Ext.getCmp('zyq').getValue(),
        'V_V_EQUTYPECODE': Ext.getCmp('sblx').getValue()
    };
    sbmcStore.load();
};

function _select() {
    var djDataCreateStore = Ext.data.StoreManager.lookup('djDataCreateStore');
    djDataCreateStore.proxy.extraParams = {
        V_V_EQUCODE: Ext.getCmp('sbmc').getValue()
    };
    djDataCreateStore.load();
};


function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
};

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    //return value;
    return '<div data-qtip="' + value + '" >' + value + '</div>';
};
