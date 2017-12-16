var ckStoreLoad = false;
var zyqStoreLoad = false;
var sblxStoreLoad = false;
var sbmcStoreLoad = false;
var zsbmcStoreLoad = false;
var gzlxStoreLoad = false;
Ext.define('Ext.ux.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    async:true,
    doRequest: function(operation, callback, scope) {
        var writer  = this.getWriter(),
            request = this.buildRequest(operation);
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        Ext.apply(request, {
            async         : this.async,
            binary        : this.binary,
            headers       : this.headers,
            timeout       : this.timeout,
            scope         : this,
            callback      : this.createRequestCallback(request, operation, callback, scope),
            method        : this.getMethod(request),
            disableCaching: false
        });
        Ext.Ajax.request(request);
        return request;
    }
});
Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');

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
                Ext.getCmp('ck').select(store.first());
                ckStoreLoad = true;
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
            //url: AppUrl + 'zdh/plant_sel',
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
                Ext.getCmp('zyq').select(store.first());
                zyqStoreLoad = true;
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
                Ext.getCmp('sblx').select(store.last());
                sblxStoreLoad = true;
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
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQU_PER_DROP',
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
                Ext.getCmp('sbmc').select(store.first());
                sbmcStoreLoad = true;
                _init();
            }
        }
    });

    var zsbmcStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'zsbmcStore',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy:  Ext.create("Ext.ux.data.proxy.Ajax",{
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_14/PRO_SAP_EQU_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }),
        listeners: {
            load: function (store, records) {
                store.insert(0, {V_EQUNAME: '全部', V_EQUCODE: '%'});
                Ext.getCmp('zsbmc').select(store.first());
                zsbmcStoreLoad = true;
                _init();
            }
        }
    });

    var gzlxStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'gzlxStore',
        fields: ['V_TYPECODE', 'V_TYPENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_14/PM_14_FAULT_TYPE_ITEM_SEL',
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
                store.insert(0, {V_TYPENAME: '全部', V_TYPECODE: '%'});
                Ext.getCmp('gzlx').select(store.first());
                gzlxStoreLoad = true;
                _init();
            }
        }
    });

    var chaxunStore = Ext.create('Ext.data.Store', {
        id: 'chaxunStore',
        autoLoad: false,
        fields: ['I_ID', 'V_ORGCODE', 'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME', 'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_EQUCODE', 'V_EQUNAME', 'V_EQUCHILD_CODE', 'V_FAULT_GUID', 'V_EQUCHILD_NAME', 'V_TYPECODE', 'V_TYPENAME', 'V_FAULT_YY', 'V_FAULT_XX', 'V_FAULT_LEVEL', 'V_JJBF', 'V_PER_CLASS', 'V_JJ', 'V_WL', 'V_PART', 'V_MATERIAL', 'V_TIME', 'V_FILE_GUID', 'V_GUID', 'V_FZR', 'V_STATE', 'V_FEEDBACK,V_BZ', 'V_FINDTIME'],
        proxy: {
            type: 'ajax',
            //url: AppUrl + 'sg/SG_FAULT_ITEM_DATA_SEL',
            url: AppUrl + 'PM_14/PM_14_FAULT_ITEM_DATA_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var panel2 = Ext.create('Ext.panel.Panel', {
        region: 'north',
        border: false,
        layout: 'column',
        frame:true,
        defaults : {
            style : 'margin:5px 0px 5px 5px',
            labelAlign : 'right'
        },
        items: [
                {
                id: 'ck',
                xtype: 'combo',
                store: ckStore,
                editable: false,
                fieldLabel: '厂矿',
                labelWidth: 70,
                width: 250,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectTwo();
                    }
                }
            }, {
                id: 'zyq',
                xtype: 'combo',
                store: zyqStore,
                editable: false,
                fieldLabel: '作业区',
                labelWidth: 70,
                width: 250,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectThree();
                    }
                }
            }, {
                id: 'sblx',
                xtype: 'combo',
                store: sblxStore,
                editable: false,
                fieldLabel: '设备类型',
                labelWidth: 70,
                width: 250,
                displayField: 'V_EQUTYPENAME',
                valueField: 'V_EQUTYPECODE',
                queryMode: 'local',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectfour();
                    }
                }
            }, {
                id: 'sbmc',
                xtype: 'combo',
                store: sbmcStore,
                editable: false,
                fieldLabel: '设备名称',
                labelWidth: 70,
                width: 250,
                displayField: 'V_EQUNAME',
                valueField: 'V_EQUCODE',
                queryMode: 'local',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果
                        _selectfive();
                    }
                }
            },{
                xtype: 'combo',
                id: 'zsbmc',
                store: zsbmcStore,
                editable: false,
                fieldLabel: '子设备名称',
                labelWidth: 70,
                width: 280,
                displayField: 'V_EQUNAME',
                valueField: 'V_EQUCODE',
                queryMode: 'local'
            }, {
                xtype: 'combo',
                id: 'gzlx',
                store: gzlxStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '故障类型',
                labelWidth: 70,
                displayField: 'V_TYPENAME',
                valueField: 'V_TYPECODE',
                width: 250
            }, {
                id: 'begintime',
                xtype: 'datefield',
                editable: false,
                format: 'Y-m-d',
                value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                fieldLabel: '发现时间',
                labelWidth: 70,
                width: 250,
                baseCls: 'margin-bottom'
            }, {
                id: 'endtime',
                xtype: 'datefield',
                editable: false,
                format: 'Y-m-d',
                value: new Date(),
                fieldLabel: '至',
                labelWidth: 70,
                width: 250,
                baseCls: 'margin-bottom'
            },{
                xtype: 'textfield',
                id: 'gzyy',
                fieldLabel: '故障原因',
                displayField: 'BATCHNAME',
                valueField: 'ID',
                queryMode: 'local',
                editable: false,
                labelWidth: 70,
                width: 250
            },{
                xtype: 'button',
                text: '查询',
                handler: _selectList,
                icon: imgpath + '/search.png'
            }, {
                xtype: 'button',
                text: '故障指派',
                handler: _gzzp
            }]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        store: chaxunStore,
        height: "86%",
        border: false,
        columnLines: true,
        region: 'center',
        width: '100%',
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: '2.5%',
            align: 'center'
        }, {
            text: '设备类型',
            dataIndex: 'V_EQUTYPECODE',
            flex: 1,
            align: 'center',
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                var index = chaxunStore.find('V_EQUTYPECODE', value);
                if (index != -1) {
                    return chaxunStore.getAt(index).get('V_EQUTYPENAME');
                }
                return null;
            }
        }, {
            text: '设备名称',
            dataIndex: 'V_EQUCODE',
            flex: 1,
            align: 'center',
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                var index = chaxunStore.find('V_EQUCODE', value);
                if (index != -1) {
                    return chaxunStore.getAt(index).get('V_EQUNAME');
                }
                return null;
            }

        }, {
            text: '部件',
            dataIndex: 'V_EQUCHILD_NAME',
            flex: 1,
            align: 'center',
        }, {
            text: '故障类型',
            dataIndex: 'V_TYPECODE',
            flex: 1,
            align: 'center',
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                var index = chaxunStore.find('V_TYPECODE', value);
                if (index != -1) {
                    return chaxunStore.getAt(index).get('V_TYPENAME');
                }
                return null;
            }
        }, {
            text: '故障原因',
            dataIndex: 'V_FAULT_YY',
            flex: 1,
            align: 'center'
        }, {
            text: '故障现象',
            dataIndex: 'V_FAULT_XX',
            flex: 1,
            align: 'center'
        }, {
            text: '故障等级',
            dataIndex: 'V_FAULT_LEVEL',
            flex: 1,
            align: 'center'
        }, {
            text: '解决方法',
            dataIndex: 'V_JJBF',
            flex: 1,
            align: 'center'
        }]
    });

    Ext.create('Ext.Viewport', {
        layout: 'border',
        frame: true,
        title: 'Ext Layout Browser',
        renderTo: Ext.getBody(),
        items: [{
            layout: 'border',
            id: 'id',
            region: 'center',
            border: false,
            split: true,
            minSize: 100,
            maxSize: 500,
            items: [panel2, grid]
        }]
    });
    _init();
});

function _init(){
    if(ckStoreLoad && zyqStoreLoad && sblxStoreLoad && sbmcStoreLoad && zsbmcStoreLoad && gzlxStoreLoad){
        ckStoreLoad = false;
        zyqStoreLoad = false;
        sblxStoreLoad = false;
        sbmcStoreLoad = false;
        zsbmcStoreLoad = false;
        gzlxStoreLoad = false;
        Ext.getBody().unmask();
    }
}

function _selectTwo() {
    var zyqStore = Ext.data.StoreManager.lookup('zyqStore');
    zyqStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode'),
        V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
        V_V_DEPTTYPE: '[主体作业区]'
    }
    zyqStore.load();
}

function _selectThree() {
    var sblxStore = Ext.data.StoreManager.lookup('sblxStore');
    sblxStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODENEXT: Ext.getCmp("zyq").getValue()
    }
    sblxStore.load();
}

function _selectfour() {
    var sbmcStore = Ext.data.StoreManager.lookup('sbmcStore');
    sbmcStore.proxy.extraParams = {
        V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
        V_V_DEPTCODENEXT: Ext.getCmp("zyq").getValue(),
        V_V_EQUTYPECODE: Ext.getCmp("sblx").getValue()
    }
    sbmcStore.load();
}

function _selectfive() {

    if(Ext.getCmp('sbmc').getValue() == '%')
    {

        var zsbmcStore = Ext.data.StoreManager.lookup('zsbmcStore');
        zsbmcStore.load();
        Ext.getBody().unmask();//去除页面笼罩
    }
    if(Ext.getCmp('sbmc').getValue() != '%')
    {

        Ext.data.StoreManager.lookup('zsbmcStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue(),
                V_V_EQUTYPECODE: Ext.getCmp('sblx').getValue(),
                V_V_EQUCODE: Ext.getCmp('sbmc').getValue()
            }
        });
        Ext.getBody().unmask();//去除页面笼罩
    }
}

function _gzzp() {
    var records = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_140701/index.html?IN_DEPARTCODE='+ Ext.getCmp("zyq").getValue() + '&V_V_GUID=' + records[0].get("V_GUID") + '&random=' + Math.random(), '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');}

function _selectList() {
    var chaxunStore = Ext.data.StoreManager.lookup('chaxunStore');
    chaxunStore.proxy.extraParams = {
        V_V_ORGCODE: Ext.getCmp("ck").getValue(),
        V_V_DEPTCODE: Ext.getCmp("zyq").getValue(),
        V_V_EQUTYPE: Ext.getCmp("sblx").getValue(),
        V_V_EQUCODE: Ext.getCmp("sbmc").getValue(),
        V_V_EQUCHILD_CODE: Ext.getCmp("zsbmc").getValue(),
        V_V_FAULT_TYPE: Ext.getCmp("gzlx").getValue(),
        V_V_FAULT_YY: Ext.getCmp("gzyy").getValue(),
        V_V_FINDTIME_B: Ext.getCmp("begintime").getSubmitValue(),
        V_V_FINDTIME_E: Ext.getCmp("endtime").getSubmitValue()
    }
    chaxunStore.load();
}