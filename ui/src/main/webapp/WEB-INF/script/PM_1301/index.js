var thisYear = new Date().getFullYear();
var ckStoreLoad = false;
var zyqStoreLoad  = false;
var initLoad   = false;

var V_V_ORGCODE = "";
var V_V_STATE = '';
var V_V_DATE = '';
var V_V_BEEXAMINED_TYPE = '';
var V_V_DEPTNAME2 = Ext.util.Cookies.get('v_deptname2');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var KHLBDATA = [{ displayField: '基础工作', valueField: '基础工作' },{ displayField: '现场管理', valueField: '现场管理' },{ displayField: '工艺纪律', valueField: '工艺纪律' }
    ,{ displayField: '设备管理', valueField: '设备管理' },{ displayField: '违章违纪', valueField: '违章违纪' },{ displayField: '安全隐患', valueField: '安全隐患' }
    ,{ displayField: '相关方', valueField: '相关方' }];

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
var V_V_GUID;
function OnButtonAddClicked() {
     V_V_GUID = Ext.data.IdGenerator.get('uuid').generate();
    var owidth = 593;
    var oheight = 796;
    // var ret = window.open(AppUrl + 'page/PM_130102/index.html?V_V_GUID='+V_V_GUID,
    //     '', 'height=450px,width=730px,top=50px,left=100px,resizable=yes');

    var ckstore1 = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'ckstore1',
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
        // listeners: {
        //     load: function (store, records) {
        //         Ext.getCmp('ck').select(store.first());
        //         ckStoreLoad = true;
        //         _init1();
        //     }
        // }
    });

    var bkhdwStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'bkhdwStore',
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
                IS_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                IS_V_DEPTTYPE: '[主体作业区]'
            }
        },
        // listeners: {
        //     load: function (store, records) {
        //         Ext.getCmp('bkhdw').select(store.first());
        //         zyqStoreLoad = true;
        //         _init1();
        //     }
        // }
    });

    var khlbStore = Ext.create("Ext.data.Store", {
        storeId: 'khlbStore',
        fields: ['displayField', 'valueField'],
        data: KHLBDATA,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });

    var windowEqu = Ext.create('Ext.window.Window', {
        id: 'windowEqu',
        width: 900,
        height: 500,
        title : '添加',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        region:'center',
        layout : 'vbox',
        items: [
            {
                layout: 'column',
                defaults: {labelAlign: 'right'},
                frame: true,
                border: false,
                baseCls: 'my-panel-no-border',
                items: [{
                    id: 'checkTime',
                    xtype: 'datefield',
                    editable: false,
                    format: 'Y/m/d',
                    value: new Date(),
                    fieldLabel: '检查日期',
                    labelWidth: 100,
                    width: 250,
                    style: ' margin: 5px 0px 0px 0px',
                    baseCls: 'margin-bottom'
                }, {
                    id: 'ck1',
                    xtype: 'combo',
                    store: ckstore1,
                    fieldLabel: '被考核单位',
                    style: ' margin: 5px 0px 0px 0px',
                    editable: false,
                    labelWidth: 100,
                    displayField: 'V_DEPTNAME',
                    valueField: 'V_DEPTCODE',
                    queryMode: 'local',
                    width: 250,
                    listeners: {
                        change: function (field, newValue, oldValue) {
                            _selectSbSecond();

                        }
                    }
                },{
                    xtype: 'combo',
                    id: "bkhdw",
                    store: bkhdwStore,
                    editable: false,
                    queryMode: 'local',
                    displayField: 'V_DEPTNAME',
                    valueField: 'V_DEPTCODE',
                    style: ' margin: 5px 0px 0px 3px',
                    labelAlign: 'right',
                    width: 150
                }]
            }, {
                layout: 'column',
                defaults: {labelAlign: 'right'},
                frame: true,
                border: false,
                baseCls: 'my-panel-no-border',
                items: [{
                    xtype: 'textfield',
                    id: "jcbw",
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '检查部位',
                    style: ' margin: 5px 0px 0px 0px',
                    labelAlign: 'right',
                    allowBlank: false,
                    width: 250
                },{
                    xtype: 'filefield',
                    id: 'V_V_FILEBLOB',
                    name: 'V_V_FILEBLOB',
                    enctype: "multipart/form-data",
                    fieldLabel: '上传图片',
                    labelWidth: 100,
                    labelAlign: 'right',
                    inputWidth: 243,
                    style: ' margin: 5px 0px 0px 0px',
                    buttonText: '浏览....',
                    allowBlank: false
                }, {
                    xtype: 'hidden',
                    name: 'V_V_GUID',
                    id: 'V_V_GUID'
                }, {
                    xtype: 'hidden',
                    name: 'V_V_FILENAME',
                    id: 'V_V_FILENAME'
                }, {
                    xtype: 'hidden',
                    name: 'V_V_FILETYPECODE',
                    id: 'V_V_FILETYPECODE'
                }, {
                    xtype: 'hidden',
                    name: 'V_V_PLANT',
                    id: 'V_V_PLANT'
                }, {
                    xtype: 'hidden',
                    name: 'V_V_DEPT',
                    id: 'V_V_DEPT'
                }, {
                    xtype: 'hidden',
                    name: 'V_V_PERSON',
                    id: 'V_V_PERSON'
                }, {
                    xtype: 'hidden',
                    name: 'V_V_REMARK',
                    id: 'V_V_REMARK'
                }]
            },  {
                layout: 'column',
                defaults: {labelAlign: 'right'},
                frame: true,
                border: false,
                baseCls: 'my-panel-no-border',
                items: [{
                    xtype: 'textfield',
                    id: "czwt",
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '存在问题',
                    allowBlank: false,
                    style: ' margin: 5px 0px 0px 0px',
                    labelAlign: 'right',
                    width: 655
                }]
            }, {
                id: 'zgcs',
                xtype: 'textarea',
                fieldLabel: '整改措施',
                //fieldStyle: 'background-color: #FFEBCD; background-image: none;',
                editable: false,
                labelWidth: 100,
                queryMode: 'local',
                allowBlank: false,
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 0px 0px',
                width: 655,
                labelAlign: 'right'
            }, {
                layout: 'column',
                defaults: {labelAlign: 'right'},
                frame: true,
                border: false,
                baseCls: 'my-panel-no-border',
                items: [{
                    xtype: 'textfield',
                    id: "khyj",
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '考核依据',
                    allowBlank: false,
                    style: ' margin: 5px 0px 0px 0px',
                    labelAlign: 'right',
                    width: 655
                }]
            }, {
                layout: 'column',
                defaults: {labelAlign: 'right'},
                frame: true,
                border: false,
                baseCls: 'my-panel-no-border',
                items: [{
                    xtype: 'textfield',
                    id: "khfs",
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '考核分数',
                    allowBlank: false,
                    style: ' margin: 5px 0px 0px 0px',
                    value : 0,
                    labelAlign: 'right',
                    width: 250
                },{
                    xtype: 'textfield',
                    id: "kkje",
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: '扣款金额',
                    allowBlank: false,
                    style: ' margin: 5px 0px 0px 0px',
                    value : 0,
                    labelAlign: 'right',
                    width: 250
                }]
            }, {
                layout: 'column',
                defaults: {labelAlign: 'right'},
                frame: true,
                border: false,
                baseCls: 'my-panel-no-border',
                items: [
                    {
                        id: 'khbm',
                        xtype: 'textfield',
                        editable: true,
                        fieldLabel: '考核部门',
                        labelWidth: 100,
                        style: ' margin: 5px 0px 0px 0px',
                        labelAlign: 'right',
                        value: V_V_DEPTNAME2,
                        readOnly : true,
                        width: 250,
                        baseCls: 'margin-bottom'
                    },{
                        xtype: 'combo',
                        id: "lb",
                        store: khlbStore,
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '类别',
                        displayField: 'displayField',
                        valueField: 'valueField',
                        value : '基础工作',
                        labelWidth: 100,
                        style: ' margin: 5px 0px 0px 0px',
                        labelAlign: 'right',
                        width: 250
                    }]
            }, {
                layout: 'column',
                defaults: {labelAlign: 'right'},
                frame: true,
                border: false,
                baseCls: 'my-panel-no-border',
                items: [{
                    id: 'yqzgsj',
                    xtype: 'datefield',
                    editable: false,
                    format: 'Y/m/d',
                    value: new Date(),
                    fieldLabel: '要求整改时间',
                    labelWidth: 100,
                    width: 250,
                    style: ' margin: 5px 0px 0px 0px',
                    baseCls: 'margin-bottom'
                }]
            }, {
                layout: 'hbox',
                defaults: {labelAlign: 'right'},
                frame: true,
                border: false,
                baseCls: 'my-panel-no-border',
                items: [
                    {
                        id: 'tbsj',
                        xtype: 'datefield',
                        editable: false,
                        format: 'Y/m/d',
                        value: new Date(),
                        fieldLabel: '通报时间',
                        labelWidth: 100,
                        width: 250,
                        style: ' margin: 5px 0px 0px 0px',
                        baseCls: 'margin-bottom'
                    },
                    {
                        id: 'tbr',
                        xtype: 'textfield',
                        readOnly : true,
                        fieldLabel: '通报人',
                        allowBlank: false,
                        labelWidth: 100,
                        style: ' margin: 5px 0px 0px 0px',
                        labelAlign: 'right',
                        width: 250,
                        baseCls: 'margin-bottom'
                    }]
            }
        ],
        buttons : [
            {
                xtype: 'button',
                text: '保存',
                icon: imgpath + '/filesave.png',
                style: 'margin: 20px 0px 20px 475px',
                handler: _save
            }, {
                xtype: 'button',
                text: '关闭',
                icon: imgpath + '/cross.png',
                handler: _close,
                style: 'margin: 5px 0px 10px 0px'
            }, {
                xtype: 'button',
                text: '重置',
                icon: imgpath + '/cross.png',
                style: 'margin: 20px 0px 20px 5px',
                handler: function () {
                    _reset();
                }
            }]
    });
    Ext.getCmp('windowEqu').show();
    _init1();
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

     V_V_GUID = records[0].get('V_GUID');
    var owidth = 730;
    var oheight = 700;
    var ret = window.open(AppUrl + 'page/PM_130103/index.html?V_V_GUID='+V_V_GUID, '', 'height=450px,width=730px,top=50px,left=100px,resizable=yes');

}
function _init1() {
    Ext.getCmp('tbr').setValue( Ext.util.Cookies.get('v_personname2'));
    Ext.getBody().unmask();

}

function _selectSbSecond() {
    var bkhdwStore = Ext.data.StoreManager.lookup('bkhdwStore');
    bkhdwStore.proxy.extraParams = {
        IS_V_DEPTCODE: Ext.getCmp('ck1').getValue(),
        IS_V_DEPTTYPE: '[主体作业区]'
    };
    //matGroupSecondStore.currentPage = 1;
    bkhdwStore.load();
}
function _close() {
    if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") !=-1) {
        window.location.href="http://localhost:8080/pm/app/pm/page/PM_1301/index.html";
        window.close();
    } else {
        window.opener = null;
        window.open("", "_self");
        window.close();
    }
}

function _reset()
{
    var ckstore1 = Ext.data.StoreManager.lookup('ckstore1');
    Ext.getCmp('checkTime').setValue(new Date());
    Ext.getCmp('ck1').setValue(ckstore1.getAt(0).get('V_DEPTCODE'));
    //Ext.getCmp('selectbz').setValue();
    Ext.getCmp('jcbw').setValue('');
    Ext.getCmp('V_V_FILEBLOB').reset();
    Ext.getCmp('czwt').setValue('');
    Ext.getCmp('zgcs').setValue('');
    Ext.getCmp('khyj').setValue('');
    Ext.getCmp('khfs').setValue(0);
    Ext.getCmp('kkje').setValue(0);
    Ext.getCmp('khbm').setValue(V_V_DEPTNAME2);
    Ext.getCmp('lb').setValue('基础工作');
    Ext.getCmp('yqzgsj').setValue(new Date());
    Ext.getCmp('tbsj').setValue(new Date());
    Ext.getCmp('tbr').setValue( Ext.util.Cookies.get('v_personname2'));

}

function _upLoadFile() {
    var editPanel = Ext.getCmp('editPanel');

    var V_V_FILEBLOB = Ext.getCmp('V_V_FILEBLOB').getSubmitValue();
    var V_V_FILENAME = V_V_FILEBLOB.substring(0, V_V_FILEBLOB.indexOf('.'));
    //alert(V_V_FILENAME);

    Ext.getCmp('V_V_GUID').setValue(V_V_GUID);
    Ext.getCmp('V_V_FILENAME').setValue(V_V_FILENAME);
    Ext.getCmp('V_V_FILEBLOB').setValue(V_V_FILEBLOB);
    Ext.getCmp('V_V_FILETYPECODE').setValue('SBJC');
    Ext.getCmp('V_V_PLANT').setValue(Ext.getCmp('bkhdw').getSubmitValue().substring(0,4));
    Ext.getCmp('V_V_DEPT').setValue(Ext.getCmp('bkhdw').getSubmitValue());
    Ext.getCmp('V_V_PERSON').setValue(V_V_PERSONCODE);
    Ext.getCmp('V_V_REMARK').setValue(Ext.getCmp('V_V_REMARK').getSubmitValue());


    if (Ext.getCmp('V_V_FILEBLOB').getValue() == '') {
        Ext.Msg.alert('错误', '请选择你要上传的文件');
        return;
    }

    Ext.MessageBox.show({
        title: '请等待',
        msg: '文件正在上传...',
        progressText: '',
        width: 300,
        progress: true,
        closable: false,
        animEl: 'loding'

    });

    editPanel.getForm().submit({
        url: AppUrl + 'PM_14/PRO_BASE_FILE_ADD',
        method: 'POST',
        async: false,
        waitMsg: '上传中...',
        success: function (ret) {
            Ext.MessageBox.alert('提示', '操作成功', callBack);
            function callBack(id) {
               _select();
                _close();
            }

        },
        failure: function (resp) {
            Ext.Msg.alert('错误', '上传失败');
        }

    })

}

function _save() {
    if (Ext.getCmp('jcbw').getValue() =="" || Ext.getCmp('czwt').getValue() == '' || Ext.getCmp('zgcs').getValue() == '' || Ext.getCmp('khyj').getValue() == ''|| Ext.getCmp('khfs').getValue() == ''|| Ext.getCmp('kkje').getValue() == ''|| Ext.getCmp('khbm').getValue() == '') {
        Ext.MessageBox.show({
            title : '提示',
            msg : '请输入这些必填项',
            buttons : Ext.MessageBox.OK,
            icon : Ext.MessageBox.ERROR
        });
        return;
    }




    Ext.Ajax.request({
        url: AppUrl + 'hp/PM_13_EXAMINED_COMPANY_SET',
        type: 'ajax',
        method: 'POST',
        params: {
            V_V_GUID: V_V_GUID,
            V_V_DATE: Ext.getCmp('checkTime').getSubmitValue(),
            V_V_BEEXAMINED_ORG: Ext.getCmp('ck1').getValue(),
            V_V_BEEXAMINED_DEPT: Ext.getCmp('bkhdw').getValue(),
            V_V_JCBW: Ext.getCmp('jcbw').getValue(),
            V_V_CZWT: Ext.getCmp('czwt').getValue(),
            V_V_ZGCS: Ext.getCmp('zgcs').getValue(),
            V_V_KHYJ: Ext.getCmp('khyj').getValue(),
            V_V_KHFS: Ext.getCmp('khfs').getValue(),
            V_V_KKJE: Ext.getCmp('kkje').getValue(),
            V_V_DEPTCODE: V_V_DEPTCODE,
            V_V_TYPE : 'org',
            V_V_BEEXAMINED_TYPE: Ext.getCmp('lb').getValue(),
            V_V_YQZGSJ: Ext.getCmp('yqzgsj').getSubmitValue(),
            V_V_TBSJ: Ext.getCmp('tbsj').getSubmitValue(),
            V_V_TB_PER:  Ext.util.Cookies.get('v_personcode'),
            V_V_STATE: '未反馈',
            V_V_JX_PER:''

        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET=='成功') {//成功，会传回true
                if(Ext.getCmp('V_V_FILEBLOB').getValue() != '')
                {
                    _upLoadFile();
                }else{
                    Ext.MessageBox.alert('提示', '操作成功', callBack);
                    function callBack(id) {
                        _select();
                        _close();
                    }
                }

                //_close();


            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: data.RET,
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
}