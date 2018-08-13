var test = '';
Ext.onReady(function () {

    var djlxStore = Ext.create('Ext.data.Store',
        {// 电机类型
            autoLoad: true,
            storeId: 'djlxStore',
            fields: ['SERIES_CLASS', 'SERIES_CLASS_DESC',
                'SERIES_CLASS_STATUS'],
            proxy: {
                type: 'ajax',
                async: false,
                url: AppUrl + 'zpf/pro_dj106_djseries_able',
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
    var sxdwStore = Ext.create('Ext.data.Store', {// 送修单位
        autoLoad: false,
        storeId: 'sxdwStore',
        fields: ['DEPARTCODE', 'DEPARTNAME', 'SAP_DEPARTCODE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zpf/PRO_MM_PLANT ',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var jxbmStore = Ext.create('Ext.data.Store', {// 检修部门
        autoLoad: false,
        storeId: 'jxbmStore',
        fields: ['MENDDEPT_CODE', 'MENDDEPT_NAME', 'MENDDATE_TYPE', 'USERID',
            'USERNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zpf/pro_dj501_menddept_dept',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    var jxbzStore = Ext.create('Ext.data.Store', {// 检修班组
        autoLoad: false,
        storeId: 'jxbzStore',
        fields: ['MENDDEPT_CODE', 'MENDDEPT_NAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zpf/pro_dj601_menddept_group',
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
        autoLoad: false,
        pageSize: 100,
        storeId: 'gridStore',
        fields: ['ORDERID', 'APPLY_PLANTNAME', 'DJ_VOL', 'DJ_V',
            'DJ_EQUPOSITION', 'MEND_CONTEXT', 'PLAN_BEGINDATE',
            'EXA_DATE', 'MENDDEPT_NAME', 'REMARK', 'MEND_USERNAME', 'OUT_DATE', 'EXA_TIME', 'OUT_TIME', 'MEND_TYPE'],
        proxy: {
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            url: AppUrl + 'zpf/PG_DJ604_GETDJMENDTABLE',
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        },
        listeners: {
            beforeload: beforeload_gridStore
        }
    });
    var northPanel = Ext.create("Ext.panel.Panel", {
        region: 'north',
        frame: true,
        //baseCls: 'my-panel-noborder',
        layout: 'vbox',
        width: '100%',
        style: 'margin:5px 0px 5px 5px',
        items: [{
            xtype: 'panel',
            frame: true,
            width: "100%",
            //baseCls : 'my-panel-noborder',
            layout: 'hbox',
            items: [{
                xtype: 'radio',
                style: ' margin: 5px 5px 0px 22px',
                id: 'test1',
                name: '1'
            }, {
                xtype: 'displayfield',
                value: '入厂时间',
                style: ' margin: 5px 5px 0px 0px'

            }, {
                xtype: 'radio',
                style: ' margin: 5px 5px 0px 22px',
                id: 'test2',
                name: '1'
            }, {
                xtype: 'displayfield',
                value: '出厂时间',
                style: ' margin: 5px 5px 0px 0px'

            }, {
                xtype: 'radio',
                style: ' margin: 5px 5px 0px 22px',
                id: 'test3',
                name: '1'
            }, {
                xtype: 'displayfield',
                value: '合格时间',
                style: ' margin: 5px 5px 0px 0px'

            }, {
                xtype: 'radio',
                style: ' margin: 5px 5px 0px 22px',
                id: 'test4',
                name: '1'
            }, {
                xtype: 'displayfield',
                value: '在修电机',
                style: ' margin: 5px 5px 0px 0px'

            }, {
                xtype: 'datefield',
                id: 'qsrq',
                fieldLabel: '起始日期',
                style: ' margin: 5px 0px 5px 10px',
                labelAlign: 'right',
                labelWidth: 70,
                value: Ext.Date.getFirstDateOfMonth(new Date()),// 根据现在日期获取这个月的第一天是哪天
                format: 'Y/m/d',
                editable: false
            }, {
                xtype: 'datefield',
                id: 'jsrq',
                fieldLabel: '结束日期',
                style: ' margin: 5px 0px 5px 10px',
                labelAlign: 'right',
                labelWidth: 70,
                queryMode: 'local',
                value: Ext.Date.getLastDateOfMonth(new Date()),
                format: 'Y/m/d',
                editable: false
            }]
        }, {
            xtype: 'panel',
            frame: true,
            layout: 'hbox',
            width: "100%",
            //baseCls : 'my-panel-noborder',
            items: [{
                xtype: 'combo',
                id: 'djlx',
                fieldLabel: '电机类型',
                labelAlign: 'right',
                editable: false,
                style: 'margin:5px 0px 5px 5px',
                labelWidth: 70,
                width:220,
                queryMode: 'local',
                valueField: 'SERIES_CLASS',
                displayField: 'SERIES_CLASS_DESC',
                store: djlxStore
            }, {
                xtype: 'textfield',
                id: 'zybh',
                fieldLabel: '作业编号',
                labelWidth: 70,
                width:220,
                style: 'margin:5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'combobox',
                id: 'sxdw',
                fieldLabel: '送修单位',
                labelAlign: 'right',
                editable: false,
                style: 'margin:5px 0px 5px 5px',
                labelWidth: 70,
                width:220,
                queryMode: 'local',
                valueField: 'DEPARTCODE',
                displayField: 'DEPARTNAME',
                store: sxdwStore
            }]
        }, {
            xtype: 'panel',
            frame: true,
            layout: 'hbox',
            width: "100%",
            //baseCls : 'my-panel-noborder',
            items: [{
                xtype: 'combo',
                id: 'jxdw',
                fieldLabel: '检修单位',
                labelAlign: 'right',
                editable: false,
                style: 'margin:5px 0px 5px 5px',
                labelWidth: 70,
                width:220,
                queryMode: 'local',
                store: {
                    storeId:"jsdwStore",
                    fields: ["code", "value"],
                    data: [{
                        code: Ext.util.Cookies.get("v_orgCode"),
                        value: Ext.util.Cookies.get("v_orgname2")
                    }]
                },
                valueField: 'code',
                displayField: 'value',
                //value: Ext.util.Cookies.get("v_orgname2"),
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectJXBM();
                        //_selectJXBZ();
                    }
                }
            }, {
                xtype: 'combo',
                id: 'jxbm',
                fieldLabel: '检修部门',
                labelAlign: 'right',
                editable: false,
                style: 'margin:5px 0px 5px 5px',
                labelWidth: 70,
                width:220,
                queryMode: 'local',
                store: jxbmStore,
                valueField: 'MENDDEPT_CODE',
                displayField: 'MENDDEPT_NAME',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectJXBZ();
                    }
                }
            }, {
                xtype: 'combo',
                id: 'jxbz',
                fieldLabel: '检修班组',
                labelAlign: 'right',
                editable: false,
                style: 'margin:5px 0px 5px 5px',
                labelWidth: 70,
                width:220,
                queryMode: 'local',
                valueField: 'MENDDEPT_CODE',
                displayField: 'MENDDEPT_NAME',
                store: jxbzStore
            }]
        }, {
            xtype: 'panel',
            frame: true,
            layout: 'hbox',
            width: "100%",
            //baseCls : 'my-panel-noborder',
            items: [{
                xtype: 'button',
                text: '查询',
                //labelWidth: 70,
                style: 'margin:5px 0px 5px 24px',
                icon: imgpath + '/search.png',
                handler: onSearch
            }, {
                xtype: 'button',
                text: '导出Excel',
                //labelWidth: 70,
                style: 'margin:5px 0px 5px 5px',
                handler: onExcel,
                icon: imgpath + '/excel.gif'
            }, {
                xtype: 'button',
                text: '打印表格',
                //labelWidth: 70,
                style: 'margin:5px 0px 5px 5px',
                handler: OnBtnPrint,
                icon: imgpath + '/printer.png'
            }]
        }]
    });
    var grid = Ext.create('Ext.grid.Panel', {
        region: 'center',
        id: 'grid',
        columnLines: true,
        style: 'margin: 5px 0px 0px 0px',
        autoScroll: true,
        store: gridStore,
        title: '电机检修台帐',
        titleAlign: 'center',
        columns: [{
            text: '序号',
            dataIndex: 'NUMBER',
            xtype: 'rownumberer',
            width: 40,
            align: 'center'
        }, {
            text: '作业编号',
            align: 'center',
            dataIndex: 'ORDERID',
            width: 100,
            renderer: function (value, meta) {
                meta.style = 'text-align:left;';
                return value;
            }
        }, {
            text: '单位',
            align: 'center',
            dataIndex: 'APPLY_PLANTNAME',
            width: 100,
            renderer: function (value, meta) {
                meta.style = 'text-align:left;';
                return value;
            }
        }, {
            text: '容量',
            align: 'center',
            dataIndex: 'DJ_VOL',
            width: 60,
            renderer: function (value, meta) {
                meta.style = 'text-align:left;';
                return value;
            }
        }, {
            text: '电压',
            align: 'center',
            dataIndex: 'DJ_V',
            width: 60,
            renderer: function (value, meta) {
                meta.style = 'text-align:left;';
                return value;
            }
        }, {
            text: '安装部位',
            align: 'center',
            dataIndex: 'DJ_EQUPOSITION',
            width: 100,
            renderer: function (value, meta) {
                meta.style = 'text-align:left;';
                return value;
            }
        }, {
            text: '维修类别',
            align: 'center',
            dataIndex: 'MEND_TYPE',
            width: 80,
            renderer: function (value, meta) {
                meta.style = 'text-align:left;';
                return value;
            }
        }, {
            text: '修制内容',
            align: 'center',
            dataIndex: 'MEND_CONTEXT',
            width: 200,
            renderer: function (value, meta) {
                meta.style = 'text-align:left;';
                return value;
            }
        }, {
            text: '入厂时间',
            align: 'center',
            dataIndex: 'PLAN_BEGINDATE',
            width: 100,
            renderer: function (value, meta) {
                meta.style = 'text-align:left;';
                return value;
            }
        }, {
            text: '合格时间',
            align: 'center',
            dataIndex: 'EXA_DATE',
            width: 100,
            renderer: function (value, meta) {
                meta.style = 'text-align:left;';
                return value;
            }
        }, {
            text: '出厂时间',
            align: 'center',
            dataIndex: 'OUT_DATE',
            width: 100,
            renderer: function (value, meta) {
                meta.style = 'text-align:left;';
                return value;
            }
        }, {
            text: '检修工期',
            align: 'center',
            dataIndex: 'EXA_TIME',
            width: 70,
            renderer: function (value, meta) {
                meta.style = 'text-align:right;';
                return value;
            }
        }, {
            text: '在厂时间',
            align: 'center',
            dataIndex: 'OUT_TIME',
            width: 70,
            renderer: function (value, meta) {
                meta.style = 'text-align:right;';
                return value;
            }
        }, {
            text: '检修班组',
            align: 'center',
            dataIndex: 'MENDDEPT_NAME',
            width: 100,
            renderer: function (value, meta) {
                meta.style = 'text-align:left;';
                return value;
            }
        }, {
            text: '负责人',
            align: 'center',
            dataIndex: 'MEND_USERNAME',
            width: 100,
            renderer: function (value, meta) {
                meta.style = 'text-align:left;';
                return value;
            }
        }, {
            text: '备注',
            align: 'center',
            dataIndex: 'REMARK',
            width: 100,
            renderer: function (value, meta) {
                meta.style = 'text-align:left;';
                return value;
            }
        }],
        bbar: ['->', {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: gridStore
        }]
    });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [northPanel, grid]
    });

    Ext.getCmp('test1').setValue(true);

    Ext.data.StoreManager.lookup('sxdwStore').load();

    Ext.data.StoreManager.lookup('sxdwStore').on('load', function (me) {// 送修单位
        me.insert(0, {
            'DEPARTCODE': '%',
            'DEPARTNAME': '全部'
        });
        Ext.getCmp('sxdw').select(me.first());// 默认显示第一个数据
    });
    Ext.data.StoreManager.lookup('djlxStore').on('load', function (me) {// 电机类型
        me.insert(0, {
            'SERIES_CLASS': '%',
            'SERIES_CLASS_DESC': '全部'
        });
        Ext.getCmp('djlx').select(me.first());// 默认显示第一个数据
    });

    Ext.getCmp("jxdw").select(Ext.data.StoreManager.lookup('jsdwStore').first());//检修单位默认选择第一个

    Ext.data.StoreManager.lookup('jxbmStore').on('load', function (me) {// 检修部门
        me.insert(0, {
            'MENDDEPT_CODE': '%',
            'MENDDEPT_NAME': '全部'
        });
        Ext.getCmp('jxbm').select(me.first());// 默认显示第一个数据
    });

    Ext.data.StoreManager.lookup('jxbzStore').on('load', function (me) {// 检修班组
        me.insert(0, {
            'MENDDEPT_CODE': '%',
            'MENDDEPT_NAME': '全部'
        });
        Ext.getCmp('jxbz').select(me.first());// 默认显示第一个数据
        onSearch();
    });
});

function _selectJXBM() {
    var jxbmStore = Ext.data.StoreManager.lookup('jxbmStore');
    jxbmStore.proxy.extraParams = {
        'jxplantcode_in': Ext.getCmp('jxdw').getValue(),
        'usercode_in': Ext.util.Cookies.get('v_personcode')
    };
    jxbmStore.load();
}

function _selectJXBZ() {
    var jxbzStore = Ext.data.StoreManager.lookup('jxbzStore');
    jxbzStore.proxy.extraParams = {
        //'plantcode_in': Ext.getCmp('jxdw').getValue(),
        'deptcode_in': Ext.getCmp('jxbm').getValue()
    };
    jxbzStore.load();
}

function pagelode() {
    Ext.getStore("gridStore").load();
}
function beforeload_gridStore(store) {
    test

    Ext.getCmp('grid').setTitle('电机维修（' + Ext.Date.format(Ext.getCmp('qsrq').getValue(), 'Y年m月d日') + '-' + Ext.Date.format(Ext.getCmp('jsrq').getValue(), 'Y年m月d日') + '）台帐');
    store.proxy.extraParams = {
        'A_DATETYPE': test,
        'A_BEGINDATE': Ext.Date.format(Ext.getCmp('qsrq').getValue(), 'Y-m-d'),
        'A_ENDDATE': Ext.Date.format(Ext.getCmp('jsrq').getValue(), 'Y-m-d'),
        'A_DJ_SERIES_CLASS': Ext.getCmp('djlx').getValue(),
        'A_ORDERID': Ext.getCmp('zybh').getValue(),
        'A_SENDPLANT': Ext.getCmp('sxdw').getValue(),
        'A_PLANT': Ext.getCmp('jxdw').getValue(),
        'A_DEPT': Ext.getCmp('jxbm').getValue(),
        'A_GROUP': Ext.getCmp('jxbz').getValue()
    };
}
function onSearch() {// 查询
    if (Ext.getCmp('test1').checked) {
        test = '入厂时间';
    }
    else if (Ext.getCmp('test2').checked) {
        test = '出厂时间';
    }
    else if (Ext.getCmp('test3').checked) {
        test = '合格时间';
    }
    else {
        test = '在修电机';
    }
    Ext.getStore('gridStore').load();
}
function onExcel() {
    document.location.href = AppUrl + 'zpf/DJWXTZ_EXCEL?A_DATETYPE=' + test +
    '&A_BEGINDATE=' + Ext.Date.format(Ext.ComponentManager.get('qsrq').getValue(), 'Y-m-d') +
    '&A_ENDDATE=' + Ext.Date.format(Ext.ComponentManager.get('jsrq').getValue(), 'Y-m-d') +
    '&A_DJ_SERIES_CLASS=' + encodeURI('%') +
    '&A_ORDERID=' + encodeURI('%') +
    '&A_SENDPLANT=' + encodeURI('%') +
    '&A_PLANT=' + Ext.ComponentManager.get('jxdw').getValue() +
    '&A_DEPT=' + encodeURI('%') +
    '&A_GROUP=' + encodeURI('%');
}

function IsNull(value) {
    if (value == "" || value == null) {
        return 'null'
    } else {
        return value;
    }
}

function OnBtnPrint() {
    Ext.util.Cookies.set('test', test)
    OnPrint();
}
function OnPrint() {

    window.open(AppUrl + "page/PM_15010604/DJ60401.html?begindate="
        +
        Ext.Date.format(Ext.getCmp('qsrq').getValue(), 'Y-m-d').toString()
        +
        '&enddate=' + Ext.Date.format(Ext.getCmp('jsrq').getValue(), 'Y-m-d').toString()
        +
        '&djlx='
        +
        Ext.getCmp('djlx').getValue().replace('%', '@')
        +
        '&zybh='
        +
        Ext.getCmp('zybh').getValue().replace('%', '@')
        +
        '&sxdw='
        +
        Ext.getCmp('sxdw').getValue().replace('%', '@')
        +
        '&jxdw='
        +
        Ext.getCmp('jxdw').getValue()
        +
        '&jxbm='
        +
        Ext.getCmp('jxbm').getValue().replace('%', '@')
        +
        '&jxbz='
        +
        Ext.getCmp('jxbz').getValue().replace('%', '@')
        ,
        "dialogHeight:470px;dialogWidth:800px;minimize:yes;maximize:yes;");


}