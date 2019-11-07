var month = new Date().getMonth() + 1;
var asd = new Date().getFullYear() + '/' + month + '/' + '01';

Ext.onReady(function() {

    var selPlantstore = Ext.create('Ext.data.Store',
        {
            autoLoad : true,
            storeId : 'selPlantstore',
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
                    IS_V_DEPTTYPE : '[基层单位]'
                }
            }
        });

    var selSectionstore = Ext.create('Ext.data.Store', {
        autoLoad : false,
        storeId : 'selSectionstore',
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
            }
        }
    });

    var workTypeStore = Ext.create('Ext.data.Store', {
        autoLoad : true,
        storeId : 'workTypeStore',
        fields : [ 'CYCLE_ID', 'CYCLE_DESC' ],
        proxy : {
            type : 'ajax',
            async : false,
            url : AppUrl + 'lx/PRO_RUN_CYCLE_ABLE',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            },
            extraParams : {
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
    var panel = Ext.create(
        'Ext.panel.Panel',
        {
            id : 'panellow',
            width : '100%',
            title : '设备作业量台账',
            region : 'north',
            frame : true,
            layout : 'column',
            items : [
                {
                    xtype : 'combo',
                    id : "selPlant",
                    store : selPlantstore,
                    editable : false,
                    queryMode : 'local',
                    fieldLabel : '厂矿',
                    displayField : 'V_DEPTNAME',
                    valueField : 'V_DEPTCODE',
                    labelWidth : 80,
                    width:200,
                    style : 'margin: 5px 0px 5px 10px',
                    labelAlign : 'right'
                },
                {
                    xtype : 'combo',
                    id : "selSection",
                    store : selSectionstore,
                    editable : false,
                    queryMode : 'local',
                    fieldLabel : '作业区',
                    displayField : 'V_DEPTNAME',
                    valueField : 'V_DEPTCODE',
                    labelWidth : 80,
                    width:200,
                    style : 'margin: 5px 0px 5px 10px',
                    labelAlign : 'right'
                },
                {
                    id : 'newDevice',
                    xtype : 'combo',
                    store : sbxzStore,
                    editable : false,
                    fieldLabel : '选择设备',
                    labelWidth : 80,
                    width:200,
                    style : 'margin: 5px 0px 5px 10px',
                    labelAlign : 'right',
                    displayField : 'EQU_DESC',
                    valueField : 'EQU_ID',
                    queryMode : 'local',
                    baseCls : 'margin-bottom'
                },

                {
                    xtype : 'combo',
                    id : 'workType',
                    fieldLabel : '周期类型',
                    store : workTypeStore,
                    editable : false,
                    labelAlign : 'right',
                    displayField : 'CYCLE_DESC',
                    valueField : 'CYCLE_ID',
                    labelWidth : 80,
                    width:200,
                    style : 'margin: 5px 0px 5px 10px'
                },
                {
                    xtype : 'datefield',
                    fieldLabel : '起始日期',
                    id : 'start',
                    value : new Date(
                        new Date().getFullYear()
                        + "/"
                        + (new Date()
                            .getMonth() + 1)
                        + "/" + '01'),
                    format : 'Y/m/d',
                    editable : false,
                    labelAlign : 'right',
                    labelWidth : 80,
                    width:200,
                    style : 'margin: 5px 0px 5px 10px'
                },
                {
                    xtype : 'datefield',
                    fieldLabel : '结束日期',
                    id : 'end',
                    value : new Date(),
                    format : 'Y/m/d',
                    editable : false,
                    labelAlign : 'right',
                    labelWidth : 80,
                    width:200,
                    style : 'margin: 5px 0px 5px 10px'
                },
                {
                    xtype : 'button',
                    text : '查询',
                    icon : imgpath + '/search.png',
                    width : 80,
                    style : 'margin: 5px 0px 5px 10px',
                    handler : function() {
                        Ext.data.StoreManager.lookup('gridStore').load();
                    }
                },
                {
                    id : 'delete',
                    xtype : 'button',
                    text : '导出Excel',
                    style : 'margin: 5px 0px 5px 10px',
                    width : 80,
                    listeners : {
                        click : OnButtonExportClicked
                    }
                } ]
        });
    var grid = Ext.create('Ext.grid.Panel', {
        id : 'grid',
        region : 'center',
        columnLines : true,
        width : '100%',
        store : {
            id : 'gridStore',
            autoLoad : false,
            pageSize:100,
            fields : [ 'CYCLE_DESC', 'CYCLE_UNIT', 'INSERT_VALUE',
                'WORKDATE', 'EQUNAME' ],
            proxy : {
                type : 'ajax',
                async : false,
                url : AppUrl + 'lx/GET_WORK_YEILD_table',
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
        selType : 'checkboxmodel',
        height : 400,
        columns : [
            {
                xtype : 'rownumberer',
                text : '序号',
                width : 35,
                sortable : false
            },
            {
                text : '周期类型',
                width : 80,
                dataIndex : 'CYCLE_DESC',
                align : 'center',
                renderer : atleft
            }, {
                text : '计算单位',
                width : 80,
                dataIndex : 'CYCLE_UNIT',
                align : 'center',
                renderer : atleft
            },
            {
                text : '设备名称',
                width : 150,
                dataIndex : 'EQUNAME',
                align : 'center',
                renderer : atleft
            }, {
                text : '作业日期',
                width : 120,
                dataIndex : 'WORKDATE',
                align : 'center'
            }, {
                text : '作业量',
                width : 100,
                dataIndex : 'INSERT_VALUE',
                type : 'date',
                align : 'center'
            }
        ],
        bbar : [ {
            xtype : 'pagingtoolbar',
            dock : 'bottom',
            displayInfo : true,
            displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg : '没有记录',
            store : 'gridStore'
        }, {
            id : 'test',
            xtype : 'label',
            text : '合计：'
        } ]
    });

    Ext.data.StoreManager.lookup('selPlantstore').on(
        "load",
        function() {
            Ext.getCmp("selPlant").select(
                Ext.data.StoreManager.lookup('selPlantstore')
                    .getAt(0));

            Ext.data.StoreManager.lookup('selSectionstore').load(
                {
                    params : {
                        IS_V_DEPTCODE : Ext.util.Cookies
                            .get('v_orgCode'),
                        IS_V_DEPTTYPE :  '[主体作业区]'
                    }
                });
        });

    Ext.data.StoreManager.lookup('selSectionstore').on(
        "load",
        function() {
            Ext.getCmp("selSection").select(Ext.data.StoreManager.lookup('selSectionstore').getAt(0));
            // 默认当前登录用户工作区
            var storeLength = Ext.data.StoreManager.lookup('selSectionstore').data.length;
            for ( var index = 0; index < storeLength; index++) {
                var storeItemData = Ext.data.StoreManager
                    .lookup('selSectionstore').data.items[index].data;
                if (storeItemData.V_DEPTCODE == Ext.util.Cookies
                    .get('v_deptcode')) {
                    Ext.getCmp("selSection").setValue(
                        Ext.util.Cookies
                            .get('v_deptcode'));
                    break;
                }
            }

            Ext.getCmp("workType").select(
                Ext.data.StoreManager.lookup(
                    'workTypeStore').getAt(0));
        });
    Ext.getCmp('selSection').on('change',function(){
        sbxzStore.load({
            params : {
                v_v_plantcode : Ext.util.Cookies.get('v_orgCode'),
                v_v_deptcode : Ext.getCmp("selSection").getValue()
            }
        });
    });
    Ext.getCmp('selPlant').on(
        "change",
        function() {
            Ext.data.StoreManager.lookup('selSectionstore').removeAll();
            Ext.data.StoreManager.lookup('selSectionstore').load(
                {
                    params : {
                        IS_V_DEPTCODE : Ext.util.Cookies
                            .get('v_orgCode'),
                        IS_V_DEPTTYPE : '[主体作业区]'
                    }
                });
        });

    Ext.data.StoreManager.lookup('gridStore').on('load',function() {
        var RET_SUM = Ext.data.StoreManager.lookup('gridStore').getProxy().getReader().rawData.RET_SUM;
        if(RET_SUM == null){
            RET_SUM = 0;
        }
        Ext.getCmp('test').setText("合计："+ RET_SUM);
    });

    Ext.data.StoreManager.lookup('sbxzStore').on("load", function() {
        Ext.data.StoreManager.lookup('sbxzStore').insert(0, {
            'EQU_ID' : '%',
            'EQU_DESC' : '全部'
        });
        Ext.getCmp("newDevice").select('%');
    });

    Ext.create('Ext.container.Viewport', {
        id : "id",
        layout : 'border',
        items : [ panel, grid ],
    });

    //loadGridStore();
});
function beforeloadStore(store) {
    Ext.data.StoreManager.lookup('gridStore').proxy.extraParams.a_plantcode = Ext.getCmp('selPlant').getValue();
    Ext.data.StoreManager.lookup('gridStore').proxy.extraParams.a_departcode =  Ext.getCmp('selSection').getValue();
    Ext.data.StoreManager.lookup('gridStore').proxy.extraParams.A_EQUID = Ext.getCmp('newDevice').getValue();
    Ext.data.StoreManager.lookup('gridStore').proxy.extraParams.A_BEGINDATE = Ext.Date.format(Ext.getCmp('start').getValue(), 'Y-m-d');
    Ext.data.StoreManager.lookup('gridStore').proxy.extraParams.A_ENDDATE = Ext.Date.format(Ext.getCmp('end').getValue(), 'Y-m-d');
    Ext.data.StoreManager.lookup('gridStore').proxy.extraParams.A_CYCLE_ID = Ext.getCmp('workType').getValue();
}

function loadGridStore() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params : {
            a_plantcode: Ext.getCmp('selPlant').getValue(),
            a_departcode: Ext.getCmp('selSection').getValue(),
            A_EQUID: Ext.getCmp('newDevice').getValue(),
            A_BEGINDATE: Ext.Date.format(Ext.getCmp('start').getValue(), 'Y-m-d'),
            A_ENDDATE : Ext.Date.format(Ext.getCmp('end').getValue(), 'Y-m-d')  ,
            A_CYCLE_ID : Ext.getCmp('workType').getValue()
        }
    });
}

function OnButtonExportClicked() {
     var a_plantcode = Ext.getCmp('selPlant').getValue();
        var a_departcode =  Ext.getCmp('selSection').getValue();
        var A_EQUID = Ext.getCmp('newDevice').getValue();
        var A_BEGINDATE = Ext.Date.format(Ext.getCmp('start').getValue(), 'Y-m-d');
        var A_ENDDATE = Ext.Date.format(Ext.getCmp('end').getValue(), 'Y-m-d');
        var A_CYCLE_ID = Ext.getCmp('workType').getValue();
    document.location.href = AppUrl + 'lx/PG_RUN_YEILD_GET_WORK_YEILD_table?a_plantcode='+ a_plantcode +
        '&a_departcode='+ a_departcode +
        '&A_EQUID=' + encodeURI(encodeURI(A_EQUID)) +
        '&A_BEGINDATE=' + A_BEGINDATE +
        '&A_ENDDATE=' + A_ENDDATE +
        '&A_CYCLE_ID=' + encodeURI(encodeURI(A_CYCLE_ID));
}


function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}