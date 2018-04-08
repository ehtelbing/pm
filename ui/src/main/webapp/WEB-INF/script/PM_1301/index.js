var thisYear = new Date().getFullYear();
var ckStoreLoad = false;
var V_V_ORGCODE = "";
var V_V_STATE = '';
var V_V_DATE = '';
var V_V_BEEXAMINED_TYPE = '';

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
    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果

    var years = [];
    for (var i = 2013; i <= thisYear + 1; i++) {
        years.push({
            displayField: i,
            valueField: i
        });
    }
    var month = [];
    for (var w = 1; w <= 12; w++) {
        month.push({
            displayField: w,
            valueField: w
        });
    }

    var ckstore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'ckstore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/plant_sel',
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
                Ext.getCmp('V_V_ORGCODE').select(store.first());
                ckStoreLoad = true;
                _init();
            }
        }
    });

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: false,
        pageSize: 15,
        fields: ['V_GUID', 'V_DATE', 'V_ORGCODE',
            'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME', 'V_TYPE', 'V_BEEXAMINED_ORG', 'V_BEEXAMINED_ORGNAME', 'V_BEEXAMINED_DEPT'
            , 'V_BEEXAMINED_DEPTNAME', 'V_BEEXAMINED_CLASS', 'V_BEEXAMINED_CLASSNAME', 'V_JCBW', 'V_CZWT', 'V_ZGCS', 'V_KHYJ'
            , 'V_KHFS', 'V_KKJE', 'V_BEEXAMINED_TYPE', 'V_YQZGSJ', 'V_TBSJ', 'V_TB_PER', 'V_TB_PERNAME'
            , 'V_STATE', 'V_FEEDBACK_GUID', 'V_FEEDBACK_FLAG', 'V_FEEDBACK_PER', 'V_FEEDBACK_PERNAME', 'V_FEEDBACK_DATA', 'V_YS_PER'
            , 'V_YS_PERNAME', 'V_FK_PER', 'V_FK_PERNAME', 'V_FK_DATE'],

        proxy: {
            type: 'ajax',
            url: AppUrl + 'hp/PM_13_EXAMINED_SEL',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            },
            extraParams: {}
        }
    });

    var classStore = Ext.create('Ext.data.Store', {
        storeId: 'classStore',
        autoLoad: false,
        fields: ['NAME', 'CODE'],
        data: [{
            NAME: '全部',
            CODE: '%'
        }, {
            NAME: '通报',
            CODE: '通报'
        }, {
            NAME: '自检',
            CODE: '自检'
        }]
    });

    var statusStore = Ext.create('Ext.data.Store', {
        storeId: 'statusStore',
        autoLoad: false,
        fields: ['NAME', 'STATUS'],
        data: [{
            NAME: '全部',
            STATUS: '%'
        }, {
            NAME: '已整改',
            STATUS: '已整改'
        }, {
            NAME: '未整改',
            STATUS: '未整改'
        }, {
            NAME: '未反馈',
            STATUS: '未反馈'
        }]
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        border: false,
        frame: true,
        region: 'north',
        //title: '<div align="center"></div>',
        width: '100%',
        //height: 50,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'combo',
                id: 'V_V_YEAR',
                store: Ext.create("Ext.data.Store", {
                    fields: ['displayField', 'valueField'],
                    data: years,
                    proxy: {
                        type: 'memory',
                        reader: {
                            type: 'json'
                        }
                    }
                }),
                editable: false,
                displayField: 'displayField',
                valueField: 'valueField',
                queryMode: 'local',
                fieldLabel: '查询时间',
                value: new Date().getFullYear(),
                labelWidth: 70,
                width: 150,
                style: ' margin: 5px 5px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'combo',
                id: 'V_V_MONTH',
                store: Ext.create("Ext.data.Store", {
                    fields: ['displayField', 'valueField'],
                    data: month,
                    proxy: {
                        type: 'memory',
                        reader: {
                            type: 'json'
                        }
                    }
                }),
                editable: false,
                displayField: 'displayField',
                valueField: 'valueField',
                queryMode: 'local',
                //fieldLabel: '选择月份',
                value: new Date().getMonth() + 1,
                labelWidth: 50,
                width: 60,
                style: ' margin: 5px 5px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'combo',
                id: 'V_V_ORGCODE',
                store: ckstore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '被检单位',
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                labelWidth: 70,
                width: 220,
                labelAlign: 'right',
                style: {
                    margin: '5px 5px 0px 5px'
                }
            }, {
                xtype: 'combo',
                id: 'V_V_BEEXAMINED_TYPE',
                store: classStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '分类',
                displayField: 'NAME',
                valueField: 'CODE',
                value: '%',
                labelWidth: 70,
                width: 220,
                labelAlign: 'right',
                style: {
                    margin: '5px 5px 0px 5px'
                }
            }, {
                xtype: 'combo',
                id: 'V_V_STATE',
                store: statusStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '状态',
                displayField: 'NAME',
                valueField: 'STATUS',
                value: '%',
                labelWidth: 70,
                width: 220,
                labelAlign: 'right',
                style: {
                    margin: '5px 5px 5px 5px'
                }
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'button',
                text: '查询',
                handler: _select,
                style: ' margin: 5px 5px 5px 20px',
                icon: imgpath + '/search.png'
            }, {
                xtype : 'button',
                text : '添加',
                icon: imgpath + '/add.png',
                style: ' margin: 5px 5px 5px 5px',
                handler : OnButtonAddClicked
            }, {
                xtype : 'button',
                text : '修改',
                icon: imgpath + '/edit.png',
                style: ' margin: 5px 5px 5px 5px',
                handler : function ()
                {
                    _preUpdateExamined()
                }
            },{
                xtype: 'button',
                text: '查看详细信息',
                handler: _chose,
                style: ' margin: 5px 5px 5px 5px',
                icon: imgpath + '/information.png'
            }, {
                xtype: 'button',
                text: '导出',
                handler: _exportExcel,
                style: ' margin: 5px 5px 5px 5px',
                icon: imgpath + '/311.gif'
            }]
        }]
    });

    var gridPanel = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel',
        store: gridStore,
        frame: true,
        columnLines: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '检查部门',
            dataIndex: 'V_DEPTNAME',
            align: 'center',
            width: 220
        }, {
            text: '检查时间',
            dataIndex: 'V_DATE',
            align: 'center',
            width: 120,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                return value.substring(0, 10);
            }
        }, {
            text: '被检单位',
            dataIndex: 'V_BEEXAMINED_DEPTNAME',
            align: 'center',
            width: 220
        }, {
            text: '检查部位',
            dataIndex: 'V_JCBW',
            align: 'center',
            width: 220
        }, {
            text: '考核分数',
            dataIndex: 'V_KHFS',
            align: 'center',
            width: 100
        }, {
            text: '扣款金额',
            dataIndex: 'V_KKJE',
            align: 'center',
            width: 100
        }, {
            text: '存在问题',
            dataIndex: 'V_CZWT',
            align: 'center',
            width: 300
        }],
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            width: '100%',
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

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
            items: [buttonPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [gridPanel]
        }]
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_V_ORGCODE: V_V_ORGCODE,
            V_V_STATE: V_V_STATE,
            V_V_DATE: V_V_DATE,
            V_V_BEEXAMINED_TYPE: V_V_BEEXAMINED_TYPE,
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    });

    _init()
});

function _init() {
    if (ckStoreLoad) {

        _select();
        Ext.getBody().unmask();//去除页面笼罩
    }

}

function _select() {
    V_V_ORGCODE = Ext.getCmp('V_V_ORGCODE').getValue();
    V_V_STATE = Ext.getCmp('V_V_STATE').getValue();
    if (Ext.getCmp('V_V_MONTH').getValue() < 10) {
        V_V_DATE = Ext.getCmp('V_V_YEAR').getValue() + '0' + Ext.getCmp('V_V_MONTH').getValue()
    } else {
        V_V_DATE = Ext.getCmp('V_V_YEAR').getValue().toString() + Ext.getCmp('V_V_MONTH').getValue();
    }
    V_V_BEEXAMINED_TYPE = Ext.getCmp('V_V_BEEXAMINED_TYPE').getValue();

    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        V_V_ORGCODE: Ext.getCmp('V_V_ORGCODE').getValue(),
        V_V_STATE: V_V_STATE,
        V_V_DATE: V_V_DATE,
        V_V_BEEXAMINED_TYPE: V_V_BEEXAMINED_TYPE,
        V_V_PAGE: Ext.getCmp('page').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('page').store.pageSize

    };
    gridStore.currentPage = 1;
    gridStore.load();
}

function _chose() {
    var records = Ext.getCmp('gridPanel').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }
    window.open(AppUrl + 'page/PM_130101/index.html?V_V_GUID='+records[0].get('V_GUID'), '', 'height=450px,width=730px,top=50px,left=100px,resizable=yes');
}

function _exportExcel() {
    document.location.href = AppUrl + 'mwd/PM_13_EXAMINED_SEL_COM_EXCEL?V_V_ORGCODE=' + V_V_ORGCODE + '&V_V_STATE=' +
    encodeURI(V_V_STATE) + '&V_V_DATE=' + V_V_DATE + '&V_V_BEEXAMINED_TYPE=' + encodeURI(V_V_BEEXAMINED_TYPE);
}

function OnButtonAddClicked() {
    var V_V_GUID = Ext.data.IdGenerator.get('uuid').generate();
    var owidth = 593;
    var oheight = 796;
    var ret = window.open(AppUrl + 'page/PM_130102/index.html?V_V_GUID='+V_V_GUID, '', 'height=450px,width=730px,top=50px,left=100px,resizable=yes');

}

function _preUpdateExamined() {
    var records = Ext.getCmp('gridPanel').getSelectionModel().getSelection();//获取选中的数据

    if (records.length != 1) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条要修改的数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

    var V_V_GUID = records[0].get('V_GUID');
    var owidth = 730;
    var oheight = 700;
    var ret = window.open(AppUrl + 'page/PM_130103/index.html?V_V_GUID='+V_V_GUID, '', 'height=450px,width=730px,top=50px,left=100px,resizable=yes');

}