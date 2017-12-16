var initLoad = true;
var ckStoreLoad = false;
var V_GUID = "" ;
var V_V_GUID_COPY = '';
var dt = new Date();
var thisYear = dt.getFullYear();
var years = [];
for (var i = 2013; i <= thisYear + 1; i++) years.push({displayField: i, valueField: i});
var months = [];
for (var i = 1; i <= 12; i++) {
    if(i<10)
    {
        months.push({displayField: '0'+i, valueField: '0'+i});
    }else{
        months.push({displayField: i, valueField: i});
    }

}
var STATEDATA = [{ displayField: '全部', valueField: '%' },{ displayField: '已整改', valueField: '已整改' },{ displayField: '未整改', valueField: '未整改' }
    ,{ displayField: '未反馈', valueField: '未反馈' }];
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
    var dt = new Date();
    var thisYear = dt.getFullYear();
    var years = [];
    for (var i = 2013; i <= thisYear + 1; i++) years.push({displayField: i, valueField: i});

    var yearsStore = Ext.create("Ext.data.Store", {
        storeId: 'yearsStore',
        fields: ['displayField', 'valueField'],
        data: years,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });

    var monthsStore = Ext.create("Ext.data.Store", {
        storeId: 'monthsStore',
        fields: ['displayField', 'valueField'],
        data: months,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });

    var ckstore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'ckstore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy:{
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
                IS_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
                IS_V_DEPTTYPE: '[基层单位]'
            }
        },
        listeners: {
            load: function (store, records) {
               Ext.getCmp('ck').select(Ext.util.Cookies.get('v_orgCode'));
                ckStoreLoad = true;
                _init();
            }
        }
    });

    var zyqstore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'zyqstore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy:Ext.create("Ext.ux.data.proxy.Ajax",  {
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
            extraParams: {}
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('zyq').select(store.first());
            }
        }
    });

    var ssbtype = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'ssbtype',
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy:Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
            }
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('sbtype').select(store.last());
            }
        }
    });

    var ssbname = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'ssbname',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQU_PER_DROP',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('sbname').select(store.first());
                ssbnameStoreLoad = true;
                _init();
            }
        }
    });


    var gridStore = Ext.create('Ext.data.Store', {
        storeId: 'gridStore',
        autoLoad: false,
        pageSize: 15,
        fields: ['CONSUME_ID','BILLCODE', 'ORDERID', 'INST_EQUIP_CODE', 'INST_EQUIP_NAME', 'OIL_MAT_NO', 'OIL_MAT_DESC', 'OIL_UNIT', 'OIL_AMOUNT', 'OIL_PRICE', 'OIL_REMARK','OIL_MONEY','OIL_STATUS'],
        proxy: {
            url: AppUrl + 'hp/GET_OILCONSUMELIST',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'RET',
                total: 'total'
            }
        }
    });


    var editPanel = Ext.create('Ext.form.Panel', {
        id: 'editPanel',
        region: 'center',
        layout: 'column',
        frame: true,
        border: false,
        baseCls: 'my-panel-no-border',
        items: [{
            xtype: 'combo',
            id: 'ck',
            store: ckstore,
            editable: false,
            queryMode: 'local',
            fieldLabel: '厂矿名称',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            labelWidth: 70,
            width: 250,
            labelAlign: 'right',
            style: {
                margin: '5px 5px 5px 5px'
            }/*,
            listeners: {
                select: function () {
                    _selectSbtype();
                    _selectSbFourth();
                }

            }*/
        },{
            id: 'zyq',
            xtype: 'combo',
            store: zyqstore,
            fieldLabel: '作业区',
            editable: false,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            labelWidth: 70,
            width: 250,
            labelAlign: 'right',
            style: {
                margin: '5px 5px 5px 5px'
            },
            listeners: {
                select: function (field, newValue, oldValue) {
                    _selectSbtype();
                    _selectSbFourth();
                }

            }
        },{
            id: 'sbtype',
            xtype: 'combo',
            store: ssbtype,
            fieldLabel: '设备类型',
            editable: false,
            displayField: 'V_EQUTYPENAME',
            valueField: 'V_EQUTYPECODE',
            queryMode: 'local',
            labelWidth: 70,
            width: 250,
            labelAlign: 'right',
            style: {
                margin: '5px 5px 5px 5px'
            },
            listeners: {
                select: function (field, newValue, oldValue) {
                    _selectSbFourth();
                }

            }
        },{
            id: 'sbname',
            xtype: 'combo',
            store: ssbname,
            fieldLabel: '设备名称',
            editable: false,
            displayField: 'V_EQUNAME',
            valueField: 'V_EQUCODE',
            queryMode: 'local',
            labelWidth: 70,
            width: 250,
            labelAlign: 'right',
            style: {
                margin: '5px 5px 5px 5px'
            }
        },{
            id: 'ckd',
            xtype: 'textfield',
            fieldLabel: '出库单',
            editable: false,
            queryMode: 'local',
            labelWidth: 70,
            width: 250,
            labelAlign: 'right',
            style: {
                margin: '5px 5px 5px 5px'
            }
        },{
            id: 'wzmc',
            xtype: 'textfield',
            fieldLabel: '物料名称',
            editable: false,
            queryMode: 'local',
            labelWidth: 70,
            width: 250,
            labelAlign: 'right',
            style: {
                margin: '5px 5px 5px 5px'
            }
        },{
            id: 'wlh',
            xtype: 'textfield',
            fieldLabel: '物料号',
            editable: false,
            queryMode: 'local',
            labelWidth: 70,
            width: 250,
            labelAlign: 'right',
            style: {
                margin: '5px 5px 5px 5px'
            }
        },{
            id: 'jxgd',
            xtype: 'textfield',
            fieldLabel: '检修工单',
            editable: false,
            queryMode: 'local',
            labelWidth: 70,
            width: 250,
            labelAlign: 'right',
            style: {
                margin: '5px 5px 5px 5px'
            }
        },{
            id: 'beginTime',
            xtype: 'datefield',
            editable: false,
            format: 'Y/m/d',
            value:  Ext.util.Format.date(new Date(), "Y-m-") + "01",
            fieldLabel: '起始日期',
            baseCls: 'margin-bottom',
            labelWidth: 70,
            width: 250,
            labelAlign: 'right',
            style: {
                margin: '5px 5px 5px 5px'
            }
        },{
            id: 'endTime',
            xtype: 'datefield',
            editable: false,
            format: 'Y/m/d',
            value: Ext.util.Format.date(new Date(new Date(new Date().getUTCFullYear(), new Date().getMonth() + 1, 1) - 86400000), "Y-m-d"),
            fieldLabel: '结束日期',
            baseCls: 'margin-bottom',
            labelWidth: 70,
            width: 250,
            labelAlign: 'right',
            style: {
                margin: '5px 5px 5px 5px'
            }
        }
        ]
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        id : 'buttonPanel',
        defaults : {
            style : 'margin:2px',
            width : 70
        },
        items : [{
            xtype : 'button',
            text : '查询',
            icon: imgpath + '/search.png',
            handler : _selectWaitoilconsumelist
        },{
            xtype : 'button',
            text : '导出Excel',
            icon: imgpath + '/grid.png',
            width : 85,
            handler : _OnButtonExcelClicked
        }
        ]
    });

    var gridPanel = Ext.create('Ext.grid.Panel', {
        id : 'gridPanel',
        store : gridStore,
        frame : true,
        columnLines : true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns : [ {
            xtype : 'rownumberer',
            text : '序号',
            width : 40,
            align: 'center'
        }, {
            text: '工单号',
            dataIndex: 'ORDERID',
            align: 'center',
            width : 120/*,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
            return value.substring(0,10);
                  }*/
        }, {
            text : '出库单号',
            dataIndex : 'BILLCODE',
            align : 'center',
            width : 200
        },{
            text : '设备名称',
            dataIndex : 'INST_EQUIP_NAME',
            align : 'center',
            width : 200
        },{
            text : '物料编码',
            dataIndex : 'OIL_MAT_NO',
            align : 'center',
            width : 100
        },{
            text : '物料描述',
            dataIndex : 'OIL_MAT_DESC',
            align : 'center',
            width : 300
        },{
            text : '计量单位',
            dataIndex : 'OIL_UNIT',
            align : 'center',
            width : 100
        },{
            text : '单价',
            dataIndex : 'OIL_PRICE',
            align : 'center',
            width : 120/*,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                return value.substring(0,10);
            }*/
        },{
            text : '消耗数量',
            dataIndex : 'OIL_AMOUNT',
            align : 'center',
            width : 100
        },{
            text : '金额',
            dataIndex : 'OIL_MONEY',
            align : 'center',
            width : 100
        },{
            text : '写实状态',
            dataIndex : 'OIL_STATUS',
            align : 'center',
            width : 100
        },{
            text : '写实操作',
            //dataIndex : 'V_TB_PERNAME',
            align : 'center',
            width : 100,
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href="#" onclick="realistic(\'' + record.data.CONSUME_ID + '\',\'' + record.data.INST_EQUIP_CODE + '\')">' + '查看' + '</a>';
            }
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
        layout : {
            type : 'border',
            regionWeights : {
                west : -1,
                north : 1,
                south : 1,
                east : -1
            }
        },
        items : [ {
            region : 'north',
            border : false,
            items : [ editPanel ]
        }, {
            region : 'north',
            border : false,
            items : [ buttonPanel ]
        }, {
            region : 'center',
            layout : 'fit',
            border : false,
            items : [ gridPanel ]
        } ]
    });

    _init()
})

function _init()
{
        if(ckStoreLoad && initLoad)
        {
            initLoad = false;
            if(Ext.util.Cookies.get('v_deptcode').substring(4,6) == '01'){
                var zyqstore = Ext.data.StoreManager.lookup('zyqstore');
                zyqstore.proxy.extraParams = {
                    IS_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                    IS_V_DEPTTYPE: '[主体作业区]'
                };
                //matGroupSecondStore.currentPage = 1;
                zyqstore.load();
            }else{
                var zyqstore = Ext.data.StoreManager.lookup('zyqstore');
                zyqstore.proxy.extraParams = {
                    IS_V_DEPTCODE:  Ext.util.Cookies.get('v_deptcode'),
                    IS_V_DEPTTYPE: '[主体作业区]'
                };
                //matGroupSecondStore.currentPage = 1;
                zyqstore.load();
            }
            _selectSbtype();
            _selectSbFourth();

            Ext.getBody().unmask();//去除页面笼罩
        }
}

function _selectSbtype() {
    var ssbtype = Ext.data.StoreManager.lookup('ssbtype');
    ssbtype.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT': Ext.getCmp('zyq').getValue()

    };
    ssbtype.load();
}


function _selectWaitoilconsumelist() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        A_PLANTCODE:  Ext.getCmp('ck').getValue(),
        A_DEPARTCODE: Ext.getCmp('zyq').getValue(),
        A_EQUTYPE:  Ext.getCmp('sbtype').getValue(),
        A_EQUIP_ID:Ext.getCmp('sbname').getValue(),
        A_ORDERID : Ext.getCmp('jxgd').getValue(),
        A_BILLCODE : Ext.getCmp('ckd').getValue(),
        A_BEGINDATE : Ext.Date.format(new Date(Ext.getCmp('beginTime').getSubmitValue().substring(0,10)), 'Y-m-d'),
        A_ENDDATE : Ext.Date.format(new Date(Ext.getCmp('endTime').getSubmitValue().substring(0,10)), 'Y-m-d'),
        A_MAT_NO : Ext.getCmp('wlh').getValue(),
        A_MAT_DESC : Ext.getCmp('wzmc').getValue(),
        V_V_PAGE: Ext.getCmp('page').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('page').store.pageSize

    };
    gridStore.currentPage = 1;
    gridStore.load();
}

function _OnButtonExcelClicked() {

    document.location.href = AppUrl + 'hp/PM_100302_EXCEL?A_PLANTCODE=' + Ext.ComponentManager.get("ck").getValue()
    + '&A_DEPARTCODE=' + Ext.ComponentManager.get("zyq").getValue()
    + '&A_EQUTYPE=' + encodeURI(Ext.ComponentManager.get("sbtype").getValue())
    + '&A_EQUIP_ID=' + encodeURI(Ext.ComponentManager.get("sbname").getValue())
    + '&A_ORDERID=' + Ext.ComponentManager.get("jxgd").getValue()
    + '&A_BILLCODE=' + Ext.ComponentManager.get("ckd").getValue()
    + '&A_BEGINDATE=' +  Ext.Date.format(new Date(Ext.getCmp('beginTime').getSubmitValue().substring(0,10)), 'Y-m-d')
    + '&A_ENDDATE=' + Ext.Date.format(new Date(Ext.getCmp('endTime').getSubmitValue().substring(0,10)), 'Y-m-d')
    + '&A_MAT_NO=' + Ext.ComponentManager.get("wlh").getValue()
    + '&A_MAT_DESC=' + Ext.ComponentManager.get("wzmc").getValue();



}

function _selectSbFourth() {
    var ssbname = Ext.data.StoreManager.lookup('ssbname');
    ssbname.proxy.extraParams = {
        'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
        'V_V_DEPTCODENEXT': Ext.getCmp('zyq').getValue(),
        'V_V_EQUTYPECODE': Ext.getCmp('sbtype').getValue()

    };
    //matGroupThirdStore.currentPage = 1;
    ssbname.load();
}

function realistic(CONSUME_ID,INST_EQUIP_CODE)
{
    var owidth = 593;
    var oheight = 796;
    var ret = window.open(AppUrl + 'page/PM_10030101/index.html?CONSUME_ID='+CONSUME_ID + '&INST_EQUIP_CODE='+ INST_EQUIP_CODE, '', 'height=450px,width=730px,top=50px,left=100px,resizable=yes');
}

function dailyRemarks(CONSUME_ID,INST_EQUIP_CODE)
{
    var owidth = 593;
    var oheight = 796;
    var ret = window.open(AppUrl + 'page/PM_10030102/index.html?CONSUME_ID='+CONSUME_ID+ '&INST_EQUIP_CODE='+ INST_EQUIP_CODE, '', 'height=450px,width=730px,top=50px,left=100px,resizable=yes');
}

