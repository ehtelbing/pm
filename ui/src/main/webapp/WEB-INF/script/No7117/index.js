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

var bjStore = Ext.create('Ext.data.Store', {
    autoLoad : false,
    storeId : 'bjStore',
    fields : [ 'BJ_ID', 'BJ_DESC' ],
    proxy : {
        type : 'ajax',
        async : false,
        url : AppUrl + 'lx/pro_run7117_bjlist',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        }
    }
});

var panel = Ext.create('Ext.panel.Panel', {
    id : 'panellow',
    width : '100%',
    title : '备件运行统计',
    region : 'north',
    frame : true,
    layout : 'column',
    items : [

        {
            xtype : 'combo',
            id : "zyq",
            store : gzpalceStore,
            editable : false,
            queryMode : 'local',
            fieldLabel : '作业区',
            displayField : 'V_DEPTNAME',
            valueField : 'V_DEPTCODE',
            labelWidth : 60,
            style : ' margin: 5px 0px 0px 10px',
            labelAlign : 'right'
        }, {
            xtype : 'combo',
            id : "bjDesc",
            store : bjStore,
            editable : false,
            queryMode : 'local',
            fieldLabel : '备件描述',
            displayField : 'BJ_DESC',
            valueField : 'BJ_ID',
            labelWidth : 60,
            style : ' margin: 5px 0px 0px 10px',
            labelAlign : 'right'
        },

        {
            xtype : 'button',
            text : '查询',
            icon : imgpath + '/search.png',
            width : 80,
            style : ' margin: 5px 0px 0px 10px',
            handler : loadGridStore
        }, {
            xtype : 'button',
            text : '导出到Excel',
            width : 150,
            style : ' margin: 5px 0px 0px 10px',
            handler : OnButtonExportClicked

        }

    ]
});
var grid = Ext.create('Ext.grid.Panel', {
    id : 'grid',
    region : 'center',
    columnLines : true,
    width : '100%',
    pageSize : 100,
    store : {
        id : 'gridStore',
        autoLoad : false,
        fields : [ 'BJ_ID', 'BJ_UNIQUE_CODE', 'MATERIALCODE', 'MATERIALNAME',
            'EQU_DESC', 'SITE_ID', 'CHANGEDATE', 'ALERT_VALUE',
            'CYCLE_DESC', 'CYCLE_UNIT' ],
        proxy : {
            type : 'ajax',
            async : false,
            url : AppUrl + 'lx/PRO_RUN7117_BJWORKLIST',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list',
                total : 'total'
            }
        },
        listeners : {
            beforeload : beforeloadStore
        }
    },
    autoScroll : true,

    height : 400,
    columns : [ {
        xtype : 'rownumberer',
        text : '序号',
        width : 35,
        sortable : false
    }, {
        text : '备件编号',
        width : 150,
        dataIndex : 'BJ_ID',
        align : 'center',
        renderer : atleft
    }, {
        text : '备件唯一编码',
        width : 150,
        dataIndex : 'BJ_UNIQUE_CODE',
        align : 'center',
        renderer : atleft
    }, {
        text : '物料编码',
        width : 150,
        dataIndex : 'MATERIALCODE',
        align : 'center',
        renderer : atleft
    }, {
        text : '物资名称',
        width : 150,
        dataIndex : 'MATERIALNAME',
        align : 'center',
        renderer : atleft
    }, {
        text : '设备名称',
        width : 150,
        dataIndex : 'EQU_DESC',
        align : 'center',
        renderer : atleft
    }, {
        text : '备件安装位置',
        width : 150,
        dataIndex : 'SITE_ID',
        align : 'center',
        renderer : atleft
    }, {
        text : '作业时间',
        width : 150,
        dataIndex : 'CHANGEDATE',
        align : 'center',
        renderer : atleft
    }, {
        text : '报警值',
        width : 150,
        dataIndex : 'ALERT_VALUE',
        align : 'center',
        renderer : atleft
    }, {
        text : '预警值',
        width : 150,
        dataIndex : 'CYCLE_DESC',
        align : 'center',
        renderer : atleft
    }, {
        text : '周期计算单位',
        flex : 1,
        dataIndex : 'CYCLE_UNIT',
        align : 'center',
        renderer : atleft
    }

    ],
    bbar : [ {
        xtype : 'pagingtoolbar',
        dock : 'bottom',
        displayInfo : true,
        displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
        emptyMsg : '没有记录',
        store : 'gridStore'
    } ]
});

Ext.onReady(function() {

    Ext.data.StoreManager.lookup('gzpalceStore').on(
        'load',
        function() {
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

            Ext.data.StoreManager.lookup('bjStore').load(
                {
                    params : {
                        V_V_DEPARTCODE : Ext.getCmp('zyq').getValue(),
                        V_V_PLANTCODE : Ext.util.Cookies.get('v_orgCode')
                    }
                });
        });

    Ext.getCmp('zyq').on(
        'select',
        function() {
            Ext.getCmp('bjDesc').reset();
            Ext.data.StoreManager.lookup('bjStore').load(
                {
                    params : {
                        V_V_DEPARTCODE : Ext.getCmp('zyq').getValue(),
                        V_V_PLANTCODE : Ext.util.Cookies.get('v_orgCode')
                    }
                });
        });

    Ext.create('Ext.container.Viewport', {
        id : "id",
        layout : 'border',
        items : [ panel, grid ]
    });
});

// function OnClickDeleteLink() {
//     var data = Ext.getCmp('grid').getSelectionModel().getSelection()[0].data;
//     window.showModalDialog(AppUrl + '/' + data.url, null,
//         "dialogWidth=650px;dialogHeight=400px");
//
// }

function OnButtonExportClicked() {

    var V_V_DEPARTCODE = Ext.getCmp('zyq').getValue();
    var V_V_PLANTCODE = Ext.util.Cookies.get('v_orgCode');
    var V_V_BJ_ID = Ext.getCmp('bjDesc').getValue();

    document.location.href = AppUrl + 'lx/PRO_RUN7117_BJWORKLIST_EXCLE?V_V_DEPARTCODE='+ encodeURI(encodeURI(V_V_DEPARTCODE)) +
        '&V_V_PLANTCODE='+ encodeURI(encodeURI(V_V_PLANTCODE)) +
        '&V_V_BJ_ID=' + encodeURI(encodeURI(V_V_BJ_ID)) ;

}
function loadGridStore() {
    Ext.data.StoreManager.lookup('gridStore').load(
        {
            params : {
                V_V_DEPARTCODE : Ext.getCmp("zyq").getValue(),
                V_V_PLANTCODE : Ext.util.Cookies.get('v_orgCode'),
                V_V_BJ_ID : Ext.getCmp('bjDesc').getValue()
            }

        });
}

function beforeloadStore(store) {

}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}