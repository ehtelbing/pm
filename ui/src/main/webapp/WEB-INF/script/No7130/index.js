var SITE_ID = '';
if (location.href.split('?')[1] != null) {
    SITE_ID = Ext.urlDecode(location.href.split('?')[1]).SITE_ID;
}
//厂矿数据集
var ckStore = Ext.create('Ext.data.Store', {
    autoLoad : false,
    storeId : 'ckStore',
    fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
    proxy : {
        type : 'ajax',
        async : false,
        url : AppUrl + 'zy/PRO_BASE_DEPT_VIEW',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        }
    }
});

//作业区数据集
var zyqStore = Ext.create('Ext.data.Store', {
    autoLoad : false,
    storeId : 'zyqStore',
    fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
    proxy : {
        type : 'ajax',
        async : false,
        url : AppUrl + 'zy/PRO_BASE_DEPT_VIEW',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        }
    }
});

//供应商数据集
var supplyStore = Ext.create('Ext.data.Store', {
    autoLoad : false,
    storeId : 'supplyStore',
    fields : [ 'SUPPLY_CODE', 'SUPPLY_NAME' ],
    proxy : {
        type : 'ajax',
        async : false,
        url : AppUrl + 'zy/PRO_RUN7110_SITESUPPLYLIST',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        }
    }
});

//周期类型
var cycletypeStore = Ext.create('Ext.data.Store', {
    autoLoad : true,
    storeId : 'cycletypeStore',
    fields : [ 'CYCLE_ID', 'CYCLE_DESC' ],
    proxy : {
        type : 'ajax',
        async : false,
        url : AppUrl + 'zy/PRO_RUN_CYCLE_ABLE',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        },
        extraParams : {}
    }
});

//备件寿命数据集
var gridStore = Ext.create("Ext.data.Store", {
    autoLoad : false,
    storeId : 'gridStore',
    pageSize : 100,
    fields : [ 'CHANGEDATE_S', 'CHANGEDATE_D', 'EQU_DESC', 'MATERIALCODE',
        'MATERIALNAME', 'REMARK', 'SITE_DESC', 'SUPPLY_NAME', 'S_DAY',
        'WORK_TIEM','BJ_UNQIUE_CODE','ORDERID_S','ORDERID_D','BJ_UNIQUE_CODE','CHANGE_AMOUNT' ],
    proxy : {
        type : 'ajax',
        async : false,
        url : AppUrl + 'zy/PRO_RUN7130_SELECTBJTIME',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        }
    },
    listeners: {
        beforeload:loadgridStore
        //beforeload:query()
    }
});

var creatpanel = Ext.create('Ext.form.Panel', {
    id : 'creatpanel',
    style : 'margin:5px 0px 2px 2px',
    region : 'north',
    width : '100%',
    baseCls : 'my-panel-no-border',
    defaults : {
        // style : 'margin:5px 0px 5px 10px',
        labelAlign : 'right'
    },
    layout : {
        type : 'vbox'
    },
    items : [
        {
            xtype : 'panel',
            layout : 'column',
            frame : true,
            //baseCls : 'my-panel-noborder',
            width : '100%',
            items : [ {
                xtype : 'combo',
                id : 'ck',
                store : 'ckStore',
                labelAlign : 'right',
                fieldLabel : '厂矿 ',
                editable : false,
                style : 'margin:5px 0px 5px 5px',
                labelWidth : 80,
                queryMode : 'local',
                valueField : 'V_DEPTCODE',
                displayField : 'V_DEPTNAME'
            }, {
                xtype : 'combo',
                id : 'zyq',
                store : 'zyqStore',
                labelAlign : 'right',
                fieldLabel : '作业区 ',
                editable : false,
                style : 'margin:5px 0px 5px 5px',
                labelWidth : 60,
                queryMode : 'local',
                valueField : 'V_DEPTCODE',
                displayField : 'V_DEPTNAME'
            }, {
                xtype : 'combo',
                labelWidth : 80,
                id : 'supply',
                store : supplyStore,
                editable : false,
                queryMode : 'local',
                fieldLabel : '供应商',
                displayField : 'SUPPLY_NAME',
                valueField : 'SUPPLY_CODE',
                style : ' margin: 5px 0px 0px 5px',
                labelAlign : 'right'
            }, {
                xtype : 'textfield',
                fieldLabel : '物料描述',
                id : 'wlms',
                emptyText : '请输入物料描述',
                labelAlign : 'right',
                labelWidth : 90,
                style : ' margin: 5px 0px 0px 5px'
            } ]
        },
        {
            xtype : 'panel',
            layout : 'column',
            frame : true,
            //baseCls : 'my-panel-noborder',
            width : '100%',
            items : [
                {
                    xtype : 'datefield',
                    format : 'Y/m/d',
                    labelAlign : 'right',
                    fieldLabel : '起始日期',
                    labelWidth : 80,
                    id : 'startTime',
                    value : new Date(new Date().getFullYear(),
                        new Date().getMonth(), 1),
                    style : 'margin: 5px 0px 5px 5px'


                }, {
                    xtype : 'datefield',
                    format : 'Y/m/d',
                    fieldLabel : '结束日期',
                    labelAlign : 'left',
                    labelWidth : 60,
                    id : 'endTime',
                    value : Ext.Date.getLastDateOfMonth(new Date()),
                    style : 'margin: 5px 0px 5px 5px'
                }, {
                    xtype : 'combo',
                    labelWidth : 80,
                    id : 'cycletype',
                    store : cycletypeStore,
                    editable : false,
                    queryMode : 'local',
                    fieldLabel : '周期类型',
                    displayField : 'CYCLE_DESC',
                    valueField : 'CYCLE_ID',
                    style : ' margin: 5px 0px 0px 5px',
                    labelAlign : 'right'
                }, {
                    xtype : 'button',
                    text : '查询',
                    icon : imgpath + '/search.png',
                    width : 80,
                    handler : query,
                    style : ' margin: 5px 0px 0px 30px'
                }, {
                    xtype : 'button',
                    text : '导出Excel',
                    width : 100,
                    handler : OnButtonExportClicked,
                    style : ' margin: 5px 0px 0px 30px'
                } ]
        } ]
});
var grid = Ext.create("Ext.grid.Panel", {
    xtype : 'gridpanel',
    id : 'grid',
    region : 'center',
    columnLines : true,
    width : '100%',
    store : gridStore,
    autoScroll : true,
    height : 400,
    columns : [ {
        text : '安装工单 ',
        dataIndex : 'ORDERID_S',
        align : 'center',
        width : 80,
        renderer : RenderFontLeft
    }, {
        text : '换下工单',
        dataIndex : 'ORDERID_D',
        align : 'center',
        labelAlign : 'right',
        width : 80,
        renderer : RenderFontLeft
    },{
        text : '安装日期 ',
        dataIndex : 'CHANGEDATE_S',
        align : 'center',
        width : 100,
        renderer : RenderFontLeft
    },{
        text : '更换数量 ',
        dataIndex : 'CHANGE_AMOUNT',
        align : 'center',
        width : 80
    }, {
        text : '换下日期',
        dataIndex : 'CHANGEDATE_D',
        align : 'center',
        labelAlign : 'right',
        width : 100,
        renderer : RenderFontLeft
    }, {
        text : '安装天数',
        dataIndex : 'S_DAY',
        align : 'center',
        width : 80
    }, {
        text : '备件安装位置 ',
        dataIndex : 'SITE_DESC',
        align : 'center',
        width : 100,
        renderer : RenderFontLeft
    }, {
        text : '设备 ',
        dataIndex : 'EQU_DESC',
        align : 'center',
        width : 100,
        renderer : RenderFontLeft
    }, {
        text : '供应商 ',
        dataIndex : 'SUPPLY_NAME',
        align : 'center',
        width : 80,
        renderer : RenderFontLeft
    }, {
        text : '物资编码 ',
        dataIndex : 'MATERIALCODE',
        align : 'center',
        width : 80,
        renderer : RenderFontLeft
    }, {
        text : '物资描述 ',
        dataIndex : 'MATERIALNAME',
        align : 'center',
        width : 100,
        renderer : RenderFontLeft
    }, {
        text : '累计作业量 ',
        dataIndex : 'WORK_TIEM',
        align : 'center',
        width : 80
    }, {
        text : '备注 ',
        dataIndex : 'REMARK',
        align : 'center',
        width : 150,
        renderer : RenderFontLeft
    }, {
        text : '唯一码',
        dataIndex : 'BJ_UNIQUE_CODE',
        align : 'center',
        width : 150,
        renderer : RenderFontLeft
    } ],
    bbar : [ '->', {
        xtype : 'pagingtoolbar',
        dock : 'bottom',
        displayInfo : true,
        displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
        emptyMsg : '没有记录',
        store : 'gridStore'
    } ]
});
Ext.onReady(function() {
    Ext.create('Ext.container.Viewport', {
        id : "id",
        layout : 'border',
        items : [ creatpanel, grid ]
    });

    Ext.data.StoreManager.lookup('supplyStore').on('load',
        function() {
            Ext.getCmp('supply').store.insert(0, {
                'SUPPLY_CODE' : '%',
                'SUPPLY_NAME' : '全部'
            });
            Ext.getCmp('supply').select(Ext.data.StoreManager.lookup('supplyStore').getAt(0));
            Ext.data.StoreManager.lookup('cycletypeStore').load();
        });
    Ext.data.StoreManager.lookup('ckStore').load({
        params : {
            IS_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
            IS_V_DEPTTYPE: '[基层单位]'
        }
    });


    Ext.data.StoreManager.lookup('ckStore').on('load',function() {
        Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
        Ext.data.StoreManager.lookup('zyqStore').load({
            params : {
                IS_V_DEPTCODE : Ext.util.Cookies.get('v_orgCode'),
                IS_V_DEPTTYPE : '[主体作业区]'
            }
        });
    });
    Ext.data.StoreManager.lookup('zyqStore').on('load',function() {
        Ext.getCmp('zyq').store.insert(0, {
            'V_DEPTCODE' : '%',
            'V_DEPTNAME' : '全部'
        });
        Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
        Ext.data.StoreManager.lookup('supplyStore').load({
            params : {
                A_ID : SITE_ID ,
                A_MATERIALCODE : '%',
                A_ORDERID : '%'
              //  parVal : [ SITE_ID ]
            }
        });
    });
    Ext.data.StoreManager.lookup('cycletypeStore').on('load',function() {
        Ext.getCmp('cycletype').select(Ext.data.StoreManager.lookup('cycletypeStore').getAt(0));
        query();
    });
});
// 查询
function query() {
    Ext.data.StoreManager.lookup('gridStore').load(
        {
            params : {
                V_PLANTCODE : Ext.getCmp('ck').getValue(),
                V_DEPARTCODE :  Ext.getCmp('zyq').getValue(),
                V_SUPPLY_CODE : Ext.getCmp('supply').getValue(),
                V_MATERIALNAME : Ext.getCmp('wlms').getValue(),
                //D_BEGIN_DATE : Ext.util.Format.date(Ext.getCmp('startTime').getValue(), 'Y-m-d'),
                D_BEGIN_DATE : Ext.Date.format(Ext.getCmp('startTime').getValue(),'Y-m-d'),
               // D_END_DATE :  Ext.util.Format.date(Ext.getCmp('endTime') .getValue(), 'Y-m-d'),
                D_END_DATE : Ext.Date.format(Ext.getCmp('endTime').getValue(),'Y-m-d'),
                V_CYCLE_ID : Ext.getCmp('cycletype').getValue()
            }
        });
}
function RenderFontLeft(value, metaData) {
    metaData.style = 'text-align: left';
    //value = value.split(' ')[0];
    return value;
}
function OnButtonExportClicked() {
    var V_PLANTCODE = Ext.getCmp('ck').getValue();
    var V_DEPARTCODE =  Ext.getCmp('zyq').getValue();
    var V_SUPPLY_CODE = Ext.getCmp('supply').getValue();
    var V_MATERIALNAME = Ext.getCmp('wlms').getValue();
        //D_BEGIN_DATE : Ext.util.Format.date(Ext.getCmp('startTime').getValue(), 'Y-m-d'),
    var D_BEGIN_DATE = Ext.Date.format(Ext.getCmp('startTime').getValue(),'Y-m-d');
        // D_END_DATE :  Ext.util.Format.date(Ext.getCmp('endTime') .getValue(), 'Y-m-d'),
    var D_END_DATE = Ext.Date.format(Ext.getCmp('endTime').getValue(),'Y-m-d');
    var V_CYCLE_ID = Ext.getCmp('cycletype').getValue();

    document.location.href = AppUrl + 'zy/PRO_RUN7130_SELECTBJTIME_excel?' +
        'V_PLANTCODE='+ encodeURI(encodeURI(V_PLANTCODE)) +
        '&V_DEPARTCODE='+ encodeURI(encodeURI(V_DEPARTCODE)) +
        '&V_SUPPLY_CODE=' + encodeURI(encodeURI(V_SUPPLY_CODE)) +
        '&V_MATERIALNAME='+ encodeURI(encodeURI(V_MATERIALNAME)) +
        '&D_BEGIN_DATE=' + encodeURI(encodeURI(D_BEGIN_DATE)) +
        '&D_END_DATE='+ encodeURI(encodeURI(D_END_DATE)) +
        '&V_CYCLE_ID=' + encodeURI(encodeURI(V_CYCLE_ID));
            //'&A_EQUID=' + encodeURI(encodeURI(A_EQUID)) +
    // var tableName = [ "安装工单", "换下工单","安装日期", "更换数量", "换下日期", "安装天数", "备件安装位置", "设备", "供应商", "物资编码",
    //     "物资描述", "累计作业量", "备注","唯一码" ];
    // var tableKey = [ 'ORDERID_S', 'ORDERID_D','CHANGEDATE_S', 'CHANGE_AMOUNT','CHANGEDATE_D', 'S_DAY', 'SITE_DESC',
    //     'EQU_DESC', 'SUPPLY_NAME', 'MATERIALCODE', 'MATERIALNAME',
    //     'WORK_TIEM', 'REMARK','BJ_UNIQUE_CODE' ];
    // var parName = ['V_PLANTCODE','V_DEPARTCODE','V_SUPPLY_CODE','V_MATERIALNAME','D_BEGIN_DATE','D_END_DATE','V_CYCLE_ID'];
    // var parType = ['s', 's', 's', 's','da','da', 's'];
    // var parVal = [
    //     excelCS(Ext.getCmp('ck').getValue()),
    //     excelCS(Ext.getCmp('zyq').getValue()),
    //     excelCS(Ext.getCmp('supply').getValue()),
    //     excelCS(Ext.getCmp('wlms').getValue()),
    //     excelCS(Ext.util.Format.date(Ext.getCmp('startTime')
    //         .getValue(), 'Y-m-d')),
    //     excelCS(Ext.util.Format.date(Ext.getCmp('endTime')
    //         .getValue(), 'Y-m-d')),
    //     excelCS(Ext.getCmp('cycletype').getValue())];
    // var proName = 'pro_run7130_selectbjtime';
    // var ExcelName = '备件寿命统计';
    // var cursorName = 'OUT_RESULT';
    // var returnStr = [ 'null' ];
    // var returnStrName = [ 'null' ];
    // var returnStrType = [ 'null' ];
    //
    //
    // submitData("ModelExcelTotal", tableName, tableKey, parName, parType,
    //     parVal, proName, returnStr, returnStrType, returnStrName,
    //     cursorName, "title", "备件寿命统计");
}
function excelCS(str) {
    if(str==undefined) return 'null';
    if(str==null) return 'null';
    if(str=='') return 'null';
    return str;
}
function loadgridStore(store){
    // store.proxy.extraParams.parVal = [Ext.getCmp('ck').getValue(),
    //     Ext.getCmp('zyq').getValue(),
    //     Ext.getCmp('supply').getValue(),
    //     Ext.getCmp('wlms').getValue(),
    //     Ext.util.Format.date(Ext.getCmp('startTime')
    //         .getValue(), 'Y-m-d'),
    //     Ext.util.Format.date(Ext.getCmp('endTime')
    //         .getValue(), 'Y-m-d'),
    //     Ext.getCmp('cycletype').getValue()];

    store.proxy.extraParams, {
        V_PLANTCODE : Ext.getCmp('ck').getValue(),
        V_DEPARTCODE :  Ext.getCmp('zyq').getValue(),
        V_SUPPLY_CODE : Ext.getCmp('supply').getValue(),
        V_MATERIALNAME : Ext.getCmp('wlms').getValue(),
        //D_BEGIN_DATE : Ext.util.Format.date(Ext.getCmp('startTime').getValue(), 'Y-m-d'),
        D_BEGIN_DATE : Ext.Date.format(Ext.getCmp('startTime').getValue(),'Y-m-d'),
        // D_END_DATE :  Ext.util.Format.date(Ext.getCmp('endTime') .getValue(), 'Y-m-d'),
        D_END_DATE : Ext.Date.format(Ext.getCmp('endTime').getValue(),'Y-m-d'),
        V_CYCLE_ID : Ext.getCmp('cycletype').getValue()

    }


}
