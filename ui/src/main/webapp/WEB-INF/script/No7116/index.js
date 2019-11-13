var imgid = '';
// 工作地点数据
var gzpalceStore = Ext.create('Ext.data.Store', {
    autoLoad : true,
    storeId : 'gzpalceStore',
    fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
    proxy : {
        type : 'ajax',
        async : false,
        url : AppUrl + 'lx/PRO_BASE_DEPT_VIEW',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        },
        extraParams : {
            IS_V_DEPTCODE : Ext.util.Cookies.get('v_orgCode'),
            IS_V_DEPTTYPE :  '[主体作业区]'
        }
    }
});
// 设备选择STORE
var sbxzStore = Ext.create('Ext.data.Store', {
    autoLoad : false,
    storeId : 'sbxzStore',
    fields : [ 'EQU_DESC', 'EQU_ID' ],
    proxy : {
        type : 'ajax',
        async : false,
        url : AppUrl + 'lx/PRO_RUN7111_EQULIST',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        }
    }
});

var gridStore = Ext.create("Ext.data.Store", {
    autoLoad : false,
    storeId : 'gridStore',
    pageSize : 100,
    fields : [ 'BJ_DESC', 'BJ_UNIQUECODE', 'ALERT_CONTEXT', 'ALERT_STATUS',
        'HANDLE_CONTEXT', 'ALERT_ID', 'HANDLE_USERNAME', 'HANDLE_DATE',
        'INSERTDATE', 'EQU_DESC', 'USERNAME', 'STATUS', 'SITE_DESC',
        'UPDATEPERSON', 'MEND_DEPART', 'MEND_PERSON', 'REMARK',
        'HANDLE_USERID', 'STATUS_VALUE' ],
    proxy : {
        type : 'ajax',
        async : false,
        url : AppUrl + 'lx/pro_run7116_select',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        }
    },
    listeners: {
        beforeload: beforeloadStore
    }
});

var creatpanel1 = Ext.create('Ext.form.Panel', {
    id : 'creatpanel1',
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
            region : 'center',
            layout : 'column',
            frame : true,
            width : '100%',
            items : [
                {
                    xtype : 'datefield',
                    format : 'Y/m/d',
                    labelAlign : 'right',
                    fieldLabel : '查询日期',
                    labelWidth : 80,
                    id : 'startTime',
                    value : new Date(new Date().getFullYear(),
                        new Date().getMonth(), 1),
                    style : 'margin: 5px 0px 5px 5px'
                }, {
                    xtype : 'datefield',
                    format : 'Y/m/d',
                    fieldLabel : '到',
                    labelAlign : 'left',
                    labelWidth : 20,
                    id : 'endTime',
                    value : Ext.Date.getLastDateOfMonth(new Date()),
                    style : 'margin: 5px 0px 5px 5px'
                },

                {
                    xtype : 'combo',
                    id : 'zyq',
                    store : 'gzpalceStore',
                    labelAlign : 'right',
                    fieldLabel : '作业区 ',
                    editable : false,
                    style : 'margin:5px 0px 5px 5px',
                    labelWidth : 80,
                    queryMode : 'local',
                    valueField : 'V_DEPTCODE',
                    displayField : 'V_DEPTNAME'
                }, {
                    xtype : 'combo',
                    id : 'xzsb',
                    store : 'sbxzStore',
                    labelAlign : 'right',
                    fieldLabel : '设备 ',
                    editable : false,
                    style : 'margin:5px 0px 5px 5px',
                    labelWidth : 80,
                    queryMode : 'local',
                    valueField : 'EQU_ID',
                    displayField : 'EQU_DESC'
                }, {
                    xtype : 'button',
                    text : '查询',
                    icon : imgpath + '/search.png',
                    width : 100,
                    handler : query,
                    style : {
                        margin : '5px 0px 10px 40px'
                    }
                }

            ]
        }, {
            xtype : 'panel',
            region : 'center',
            layout : 'column',
            frame : true,
            width : '100%',
            items : [ {
                xtype : 'button',
                text : '导出Excel',
                width : 100,
                handler : OnButtonExportClicked,
                style : {
                    margin : '5px 0px 5px 40px'
                }
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
    listeners : {
        itemclick : findcode
    },
    columns : [ {
        text : '状态',
        dataIndex : 'STATUS_VALUE',
        align : 'center',
        labelAlign : 'right',
        width : 80,
        renderer : RenderFontLeft
    }, {
        text : '设备名称',
        dataIndex : 'EQU_DESC',
        align : 'center',
        width : 100,
        renderer : RenderFontLeft
    }, {
        text : '备件安装位置 ',
        dataIndex : 'SITE_DESC',
        align : 'center',
        width : 100,
        renderer : RenderFontLeft
    }, {
        text : '备件唯一编码 ',
        dataIndex : 'BJ_UNIQUECODE',
        align : 'center',
        width : 150,
        renderer : RenderFontLeft
    }, {
        text : '备件描述 ',
        dataIndex : 'BJ_DESC',
        align : 'center',
        width : 150,
        renderer : RenderFontLeft
    }, {
        text : '报警内容 ',
        dataIndex : 'ALERT_CONTEXT',
        align : 'center',
        width : 150,
        renderer : RenderFontLeft
    }, {
        text : '报警时间 ',
        dataIndex : 'INSERTDATE',
        align : 'center',
        width : 125,
        renderer : RenderFontLeft
    }, {
        text : '设备负责人 ',
        dataIndex : 'USERNAME',
        align : 'center',
        width : 100,
        renderer : RenderFontLeft
    }, {
        text : '处理人 ',
        dataIndex : 'HANDLE_USERNAME',
        align : 'center',
        width : 100,
        renderer : RenderFontLeft
    }, {
        text : '处理结果 ',
        dataIndex : 'HANDLE_CONTEXT',
        align : 'center',
        width : 150,
        renderer : RenderFontLeft
    }, {
        text : '处理时间 ',
        dataIndex : 'HANDLE_DATE',
        align : 'center',
        width : 125,
        renderer : RenderFontLeft
    } ],
    bbar : ['->',{
        id : 'page',
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
        items : [ creatpanel1, grid ]
    });

    Ext.data.StoreManager.lookup('sbxzStore').on(
        'load',
        function() {
            Ext.getCmp('xzsb').store.insert(0, {
                'EQU_ID' : '%',
                'EQU_DESC' : '全部'
            });
            Ext.getCmp('xzsb').select(
                Ext.data.StoreManager.lookup('sbxzStore').getAt(0));
        });

    Ext.data.StoreManager.lookup('gzpalceStore').on(
        'load',
        function() {
            Ext.getCmp('zyq').store.insert(0, {
                'V_DEPTCODE' : '%',
                'V_DEPTNAME' : '全部'
            });
            Ext.getCmp('zyq').select(
                Ext.data.StoreManager.lookup('gzpalceStore').getAt(0));

            // 默认当前登录用户工作区
            var storeDataList = Ext.data.StoreManager
                .lookup('gzpalceStore').data;
            var storeLength = storeDataList.length;
            for ( var index = 0; index < storeLength; index++) {
                var storeItemData = storeDataList.items[index].data;
                if (storeItemData.V_DEPTCODE == Ext.util.Cookies
                    .get('v_deptcode')) {
                    Ext.getCmp("zyq").setValue(
                        Ext.util.Cookies.get('v_deptcode'));
                    break;
                }
            }

            Ext.data.StoreManager.lookup('sbxzStore').load(
                {
                    params : {
                        v_v_plantcode : Ext.util.Cookies.get('v_orgCode'),
                        v_v_deptcode :  Ext.getCmp("zyq").getValue()
                    }
                });
        });

    Ext.data.StoreManager.lookup('sbxzStore').on(
        'load',
        function() {
            Ext.getCmp('xzsb').select(
                Ext.data.StoreManager.lookup('sbxzStore').getAt(0));
        });

    Ext.getCmp('zyq').on(
        'select',
        function() {
            Ext.data.StoreManager.lookup('sbxzStore').load(
                {
                    params : {
                        v_v_plantcode : Ext.util.Cookies.get('v_orgCode'),
                        v_v_deptcode :  Ext.getCmp("zyq").getValue()
                    }
                });
        });
    query();
});
// 查询
function query() {
    Ext.data.StoreManager.lookup('gridStore').load(
        {
            params : {
                V_V_DEPARTCODE : Ext.getCmp('zyq').getValue(),
                V_V_PLANTCODE : Ext.util.Cookies.get('v_orgCode'),
                V_V_BJ_ID : Ext.getCmp('xzsb').getValue(),
                V_V_BEGIN_DATE : Ext.util.Format.date(Ext.getCmp('startTime').getValue(), 'Y-m-d'),
                V_V_END_DATE : Ext.util.Format.date(Ext.getCmp('endTime').getValue(), 'Y-m-d')
            }
        });
}

function RenderFontLeft(value, metaData) {
    metaData.style = 'text-align: left';
    value = value.split(' ')[0];
    return value;
}

function findcode(a, record, item, index, e, eOpts) {
    imgid = record.raw.LOGID;
}
function OnButtonExportClicked() {

    var V_V_DEPARTCODE = Ext.getCmp('zyq').getValue();
    var V_V_PLANTCODE = Ext.util.Cookies.get('v_orgCode');
    var V_V_BJ_ID = Ext.getCmp('xzsb').getValue();
    var V_V_BEGIN_DATE = Ext.util.Format.date(Ext.getCmp('startTime').getValue(), 'Y-m-d');
    var V_V_END_DATE = Ext.util.Format.date(Ext.getCmp('endTime').getValue(), 'Y-m-d');

    document.location.href = AppUrl + 'lx/PRO_RUN7116_SELECT_EXCLE?V_V_DEPARTCODE='+ encodeURI(encodeURI(V_V_DEPARTCODE)) +
        '&V_V_PLANTCODE='+ encodeURI(encodeURI(V_V_PLANTCODE)) +
        '&V_V_BJ_ID=' + encodeURI(encodeURI(V_V_BJ_ID)) +
        '&V_V_BEGIN_DATE=' + encodeURI(encodeURI(V_V_BEGIN_DATE)) +
        '&V_V_END_DATE=' + encodeURI(encodeURI(V_V_END_DATE)) ;
}

function beforeloadStore(store){
        store.proxy.extraParams.V_V_DEPARTCODE = Ext.getCmp('zyq').getValue();
        store.proxy.extraParams.V_V_PLANTCODE = Ext.util.Cookies.get('v_orgCode');
        store.proxy.extraParams.V_V_BJ_ID = Ext.getCmp('xzsb').getValue();
        store.proxy.extraParams.V_V_BEGIN_DATE = Ext.util.Format.date(Ext.getCmp('startTime').getValue(), 'Y-m-d');
        store.proxy.extraParams.V_V_END_DATE = Ext.util.Format.date(Ext.getCmp('endTime').getValue(), 'Y-m-d')

}
