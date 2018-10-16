var selPlantstore = Ext.create('Ext.data.Store',
    {
        autoLoad : true,
        storeId : 'selPlantstore',
        fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'No4120/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            },
            extraParams : {
                V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE:Ext.util.Cookies.get('v_orgCode'),
                V_V_DEPTCODENEXT:Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE:'[基层单位]'
            }
        }
    });

var selSectionstore = Ext.create('Ext.data.Store', {
    autoLoad : true,
    storeId : 'selSectionstore',
    fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
    proxy : {
        type : 'ajax',
        async : false,
        url : AppUrl + 'PM_12/PRO_BASE_DEPT_VIEW',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        },
        extraParams : {
            IS_V_DEPTCODE : Ext.util.Cookies.get('v_orgCode'),
            IS_V_DEPTTYPE:'[主体作业区]'
        }
    }
});

var sbxzStore = Ext.create('Ext.data.Store', {
    autoLoad : false,
    storeId : 'sbxzStore',
    fields : [ 'EQU_DESC', 'EQU_ID' ],
    proxy : {
        type : 'ajax',
        async : false,
        url: AppUrl + 'cjy/pro_run7111_equlist',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        }
    }
});

var gridStore = Ext.create('Ext.data.Store', {
    id : 'gridStore',
    autoLoad : false,
    pageSize :100,
    fields : [
        'KC_ID', 'MATERIALCODE', 'MATERIALNAME', 'UNIT',
        'ELATON', 'F_PRICE','KCAMOUNT', 'KC_MONEY', 'PLANTCODE','PLANTNAME','DEPARTCODE',
        'DEPARTNAME','STOREID','STORENAME','INSERTDATE'],
    proxy : {
        type : 'ajax',
        async : false,
        url : AppUrl + 'PM_12/PRO_RUN7127_SELECTKC',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list'
        }
    }
});
Ext.onReady(function(){


    var panel=Ext.create('Ext.panel.Panel',{
        id:'panel',
        style: 'background-color:#FFFFFF',
        baseCls: 'my-panel-no-border',
        width : '100%',
        region : 'north',
        frame : true,
        layout : 'column',
        items : [ {
                        xtype : 'combo',
                        id : "selPlant",
                        store : selPlantstore,
                        editable : false,
                        queryMode : 'local',
                        fieldLabel : '厂矿',
                        displayField : 'V_DEPTNAME',
                        valueField : 'V_DEPTCODE',
                        labelWidth : 70,
                        matchFieldWidth:false,
                        style : ' margin: 5px 0px 0px 10px',
                        labelAlign : 'right',
            listeners:{
                            select:function(){
                                Ext.data.StoreManager.lookup('selSectionstore').removeAll();
                                        Ext.data.StoreManager.lookup('selSectionstore').load(
                                            {
                                                params : {
                                                    V_REPAIRDEPTCODE:Ext.util.Cookies.get('v_deptcode'),
                                                    V_PERSONCODE:Ext.getCmp('selPlant').getValue()
                                                }
                                            });
                                    query();
                            }

            }
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
                        labelWidth : 60,
                        matchFieldWidth:false,
                        style : ' margin: 5px 0px 5px 10px',
                        labelAlign : 'right',
                        listeners:{
                            select:function(){
                                Ext.data.StoreManager.lookup('sbxzStore').removeAll();
                                    Ext.data.StoreManager.lookup('sbxzStore').load({
                                        params: {
                                            v_v_plantcode: Ext.util.Cookies.get('v_orgCode'),
                                            v_v_deptcode: Ext.getCmp('selSection').getValue()
                                        }
                                    });
                                query();
                            }
                        }
                    },
                    {
                        xtype : 'combo',
                        id : 'xzsb',
                        store : sbxzStore,
                        fieldLabel : '选择设备 ',
                        editable : false,
                        style : 'margin:5px 0px 5px 5px',
                        labelWidth : 70,
                        queryMode : 'local',
                        valueField : 'EQU_ID',
                        matchFieldWidth:false,
                        displayField : 'EQU_DESC',
                        listeners:{
                            select:function(){
                                query();
                            }

                        }

                    }, {
                        xtype : 'button',
                        text : '查询',
                        icon : imgpath + '/search.png',
                        width : 100,
                        handler : query,
                        style : {
                            margin : '5px 0 5px 30px'
                        }
                    } ]
            });
    var grid = Ext.create("Ext.grid.Panel", {
        xtype : 'gridpanel',
        id : 'grid',
        region : 'center',
        columnLines : true,
        width : '100%',
        store : gridStore,
        selType : 'checkboxmodel',
        selModel : {
            selType : 'checkboxmodel',
            mode : 'SINGLE'
        },
        autoScroll : true,
        height : 400,
        columns : [
            {
                text : '物料号',
                dataIndex : 'MATERIALCODE',
                align : 'center',
                width : 150,
                renderer : RenderFontLeft
            }, {
                text : '物料描述 ',
                dataIndex : 'MATERIALNAME',
                align : 'center',
                width : 150,
                renderer : RenderFontLeft
            }, {
                text : '规格型号 ',
                dataIndex : 'ELATON',
                align : 'center',
                width : 120,
                renderer : RenderFontLeft
            }, {
                text : '库存数量 ',
                dataIndex : 'KCAMOUNT',
                align : 'center',
                width : 80,
                renderer : RenderFontRight
            }, {
                text : '库存金额 ',
                dataIndex : 'KC_MONEY',
                align : 'center',
                width : 110,
                renderer : RenderFontRight
            }, {
                text : '厂矿 ',
                dataIndex : 'PLANTNAME',
                align : 'center',
                width : 150,
                renderer : RenderFontLeft
            }, {
                text : '作业区 ',
                dataIndex : 'DEPARTNAME',
                align : 'center',
                width : 150,
                renderer : RenderFontLeft
            }, {
                text : '库房名 ',
                dataIndex : 'STORENAME',
                align : 'center',
                width : 150,
                renderer : RenderFontLeft
            } ,
            {
                text : '统计时间 ',
                dataIndex : 'INSERTDATE',
                align : 'center',
                width : 110,
                renderer : RenderFontLeft
            } ],
        bbar: ['->',{ xtype: 'pagingtoolbar',
            id:'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'  }
        ]
    });
    Ext.create('Ext.container.Viewport', {
        id : "id",
        layout : 'border',
        items : [ panel, grid ]
    });

    Ext.data.StoreManager.lookup('selPlantstore').on(
        "load",
        function() {
            Ext.getCmp("selPlant").select(
                Ext.data.StoreManager.lookup('selPlantstore').getAt(0));

            Ext.data.StoreManager.lookup('selSectionstore').load(
                {
                    params : {
                        IS_V_DEPTCODE : Ext.util.Cookies.get('v_orgCode'),
                        IS_V_DEPTTYPE:'[主体作业区]'
                    }
                });
            query();
        });

    Ext.data.StoreManager.lookup('selSectionstore').on(
        "load",
        function() {
            Ext.getCmp("selSection").select(Ext.data.StoreManager.lookup('selSectionstore').getAt(0));
            Ext.data.StoreManager.lookup('sbxzStore').load({
                params: {
                    v_v_plantcode: Ext.util.Cookies.get('v_orgCode'),
                    v_v_deptcode: Ext.getCmp('selSection').getValue()
                }
            });
            query();
        });
    Ext.data.StoreManager.lookup('sbxzStore').on(
        'load',
        function() {
            sbxzStore.insert(0, {'EQU_ID' : '%', 'EQU_DESC' : '全部'});
            Ext.getCmp('xzsb').select(Ext.data.StoreManager.lookup('sbxzStore').getAt(0));

            query();
        });


    // Ext.getCmp('selPlant').on("change", function() {
    //         Ext.data.StoreManager.lookup('selSectionstore').removeAll();
    //         Ext.data.StoreManager.lookup('selSectionstore').load(
    //             {
    //                 params : {
    //                     V_REPAIRDEPTCODE:Ext.util.Cookies.get('v_deptcode'),
    //                     V_PERSONCODE:Ext.getCmp('selPlant').getValue()
    //                 }
    //             });
    //     query();
    //     });
    // Ext.getCmp('selSection').on("change",function() {
    //     Ext.data.StoreManager.lookup('sbxzStore').removeAll();
    //     Ext.data.StoreManager.lookup('sbxzStore').load({
    //         params: {
    //             v_v_plantcode: Ext.util.Cookies.get('v_orgCode'),
    //             v_v_deptcode: Ext.getCmp('selSection').getValue()
    //         }
    //     });
    // });
    // Ext.getCmp('xzsb').on('change',function(){
    //     query();
    // })
});

function query(){
    Ext.data.StoreManager.get('gridStore').load({
        params : {
            V_PLANTCODE: Ext.getCmp('selPlant').getValue(),
            V_DEPARTCODE:Ext.getCmp('selSection').getValue(),
            V_EQU_ID:Ext.getCmp('xzsb').getValue()
        }
    });
}

function RenderFontLeft(value, metaData) {
    metaData.style = 'text-align: left';
    value = value.split(' ')[0];
    return value;
}


function RenderFontRight(value, metaData) {
    metaData.style = 'text-align: right';
    return value;
}