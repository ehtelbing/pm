/**
 * Created by Administrator on 17-4-3.
 */
var V_NEXT_SETP = '';
var V_STEPNAME = '';
var processKey = '';
//v_personcode:"admin"
//v_personname2:"超级管理员"
var PERSONCODE_ = Ext.util.Cookies.get('v_personcode');//发起人编码
var PERSONNAME_ = Ext.util.Cookies.get('v_personname2')     //发起人名字
Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');

    //从2013循环开始年到当前年的下一年
    var dt = new Date();
    var thisYear = dt.getFullYear();
    var years = [];
    for (var i = 2013; i <= thisYear + 1; i++) years.push({displayField: i, valueField: i});

    var comboStore = Ext.create('Ext.data.Store', {
        storeId: 'comboStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['year'],
        proxy: {
            url: 'selectAsse.do',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'asseList',
                totalProperty: 'total'
            }
        }
    });
    //表格信息加载
    var yearjmdjStore = Ext.create('Ext.data.Store', {
        id: 'yearjmdjStore',
        pageSize: 20,
        autoLoad: false,
        fields: ['I_ID', 'V_GUID', 'V_YEAR', 'V_ORGCODE', 'V_ORGNAME',
            'V_FLOWTYPECODE', 'V_FLOWTYPENAME', 'V_INPERCODE', 'V_INPERNAME',
            'V_INDATE', 'V_ORG_JSRCODE', 'V_ORG_JSRNAME', 'V_FLOW_STATUS', 'V_JMDJID'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PM_06_JMDJ_YEARPLAN_DATA_SEL',
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

    var nextSprStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'nextSprStore',
        fields: ['V_PERSONCODE', 'V_PERSONNAME', 'V_V_NEXT_SETP', 'V_V_FLOW_STEPNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PM_ACTIVITI_PROCESS_PER_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                V_V_ORGCODE: Ext.util.Cookies.get('v_orgCode'),
                V_V_DEPTCODE: Ext.util.Cookies.get('v_deptcode'),
                V_V_REPAIRCODE: '',
                V_V_FLOWTYPE: 'JmDJ',
                V_V_FLOW_STEP: 'start',
                V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_SPECIALTY: '',
                V_V_WHERE: ''
            }
        },
        listeners: {
            load: function (store, records, success, eOpts) {
                processKey = store.getProxy().getReader().rawData.RET;
                V_STEPNAME = store.getAt(0).data.V_V_FLOW_STEPNAME;
                V_NEXT_SETP = store.getAt(0).data.V_V_NEXT_SETP;
                console.log(processKey);
                console.log(V_STEPNAME);
                console.log(V_NEXT_SETP);
            }

        }
    });


    var zuoshangStore = Ext.create('Ext.data.Store', {
        storeId: 'zuoshangStore',
        autoLoad: false,
        pageSize: 2,
        fields: ['data_'],
        data: [['M'], ['S'], ['P'],
            [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '],
            [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '],
            [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '],
            [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']
        ]
    });


    var formPanel = Ext.create('Ext.form.Panel', {
        id: 'formPanel',
        title: '<div align="center">精密点检年计划发起</div>',
        layout: 'column',
        frame: true,
        autoScroll: true,
        defaults: {
            labelAlign: 'right',
            labelWidth: 80,
            inputWidth: 100,
            style: 'margin:5px 0px 5px 0px'
        },
        items: [{
            id: 'year',
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
            xtype: 'combo',
            id: 'year_',
            fieldLabel: '年份',
            labelWidth: 50,
            value: new Date().getFullYear(),
            labelAlign: 'right',
            editable: false,
            displayField: 'displayField',
            valueField: 'valueField'
        }, {
            xtype: 'button',
            icon: imgpath + '/search.png',
            width: 60,
            text: '查询',
            style: 'margin:5px 0px 5px 15px',
            handler: _query
        }, {
            xtype: 'button',
            width: 60,
            text: '发起',
            style: 'margin:5px 0px 5px 10px',
            handler: _start
        }]
    });

    var gridPanel = Ext.create('Ext.grid.Panel', {

        id: 'gridPanel',
        store: yearjmdjStore,
        columnLines: true,
        frame: true,
        selModel: {selType: 'checkboxmodel', mode: 'simple'},
        columns: [{xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '厂矿', dataIndex: 'V_ORGNAME', align: 'center', flex: 1},
            {text: '厂矿接收人', dataIndex: 'V_ORG_JSRNAME', align: 'center', flex: 1},
            {text: '发起人', dataIndex: 'V_INPERNAME', align: 'center', flex: 2},
            {
                text: '发起时间', dataIndex: 'V_INDATE', align: 'center', flex: 2,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                    var index = yearjmdjStore.find('V_INDATE', value);
                    if (index != -1) {
                        return yearjmdjStore.getAt(index).get('V_INDATE').substring(0, 19);
                    }
                    return null;
                }
            },
            {text: '流程状态', dataIndex: 'V_FLOW_STATUS', align: 'center', flex: 2}]
    });

    Ext.create('Ext.container.Viewport', {
        layout: {type: 'border', regionWeights: {west: -1, north: 1, south: 1, east: -1}},
        defaults: {border: false},
        items: [{region: 'north', items: [formPanel]},
            {region: 'center', layout: 'fit', items: [gridPanel]}]
    });
    _init();
});

function _init() {
    if (true) {
        Ext.getBody().unmask();
    }
}

function _query() {
    var yearjmdjStore = Ext.data.StoreManager.lookup('yearjmdjStore');
    yearjmdjStore.proxy.extraParams.V_V_YEAR = Ext.getCmp('year_').getValue();
    yearjmdjStore.proxy.extraParams.V_V_INPERCODE = PERSONCODE_;
    yearjmdjStore.proxy.extraParams.V_V_INPERNAME = PERSONNAME_;
    yearjmdjStore.currentPage = 1;
    yearjmdjStore.load();
}

function _start() {
    var records = Ext.getCmp('gridPanel').getSelectionModel().getSelection();//获取选中的数据
    if (records.length == 0) {//判断是否选中数据
        Ext.Msg.alert("提示", "请选择一条记录！");
        return false;
    }
    var i_err = 0;
    for (var i = 0; i < records.length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'Activiti/StratProcess',
            async: false,
            method: 'post',
            params: {
                parName: ["originator", "flow_businesskey", V_NEXT_SETP, "idea", "remark", "flow_code", "flow_yj", "flow_type"],
                parVal: [Ext.util.Cookies.get('v_personcode'), records[i].get('V_GUID'), records[i].data.V_ORG_JSRCODE, "请接收!", '', records[i].get('V_JMDJID'), "请接收！", "JmDJ"],
                processKey: processKey,
                businessKey: records[i].get('V_GUID'),
                V_STEPCODE: 'Start',
                V_STEPNAME: V_STEPNAME,
                V_IDEA: '请接收！',
                V_NEXTPER: records[i].data.V_ORG_JSRCODE,
                V_INPER: Ext.util.Cookies.get('v_personcode')
            },
            success: function (response) {
                if (Ext.decode(response.responseText).ret == 'OK') {

                } else if (Ext.decode(response.responseText).error == 'ERROR') {
                    Ext.Msg.alert('提示', '该流程发起失败！');
                }
            }
        });
        i_err++;
        if (i_err == records.length) {
            _query();
        }
    }
}



