Ext
    .onReady(function() {
        Ext.QuickTips.init();
        var ckstore = Ext.create("Ext.data.Store", {
            autoLoad : true,
            storeId : 'ckstore',
            fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
            proxy : {
                type : 'ajax',
                async : false,
                url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
                actionMethods : {
                    read : 'POST'
                },
                reader : {
                    type : 'json',
                    root : 'list'
                },
                extraParams : {
                    'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                    'V_V_DEPTCODE':  Ext.util.Cookies.get('v_orgCode'),
                    'V_V_DEPTCODENEXT': Ext.util.Cookies.get('v_deptcode'),
                    'V_V_DEPTTYPE': '基层单位'
                }
            }
        });

        var zyqstore = Ext.create("Ext.data.Store", {
            autoLoad : false,
            storeId : 'zyqstore',
            fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
            proxy : {
                type : 'ajax',
                async : false,
                url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
                actionMethods : {
                    read : 'POST'
                },
                reader : {
                    type : 'json',
                    root : 'list'
                }
            }
        });

        var ssblx = Ext.create('Ext.data.Store', {
            autoLoad : false,
            storeId : 'ssblx',
            fields : [ 'V_EQUTYPECODE', 'V_EQUTYPENAME' ],
            proxy : {
                type : 'ajax',
                async : false,
                url : AppUrl + 'WorkOrder/PRO_GET_DEPTEQUTYPE_ADMIN',
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
            // pageSize: 15,
            autoLoad : false,
            fields : [ 'V_MODELNUMBER', 'V_MODELNAME', 'V_TYPE', 'V_UNIT',
                'V_SETSITE', 'V_MEMO' ],

            proxy : {
                type : 'ajax',
                async : false,
                url: AppUrl + 'No4120/RRO_BASE_PRELOADWAREMODEL_VIEW',
                actionMethods : {
                    read : 'POST'
                },
                reader : {
                    type : 'json',
                    root : 'list'
                    // total: 'total'
                }
            }
        });
        var panel = Ext.create('Ext.panel.Panel', {
            id : 'panellow',
            //style : 'margin:5px 0px 2px 2px',
            region : 'north',
            width : '100%',
            style: 'background-color:#FFFFFF',
            baseCls : 'my-panel-no-border',
            defaults : {
                style : 'margin:5px 0px 5px 10px',
                labelAlign : 'right'
            },
            layout : {
                type : 'column'
            },
            items : [
                {
                    id : 'ck',
                    xtype : 'combo',
                    store : ckstore,
                    editable : false,
                    fieldLabel : '厂矿',
                    labelWidth : 65,
                    displayField : 'V_DEPTNAME',
                    valueField : 'V_DEPTCODE',
                    queryMode : 'local',
                    baseCls : 'margin-bottom'
                },
                {
                    id : 'zyq',
                    xtype : 'combo',
                    store : zyqstore,
                    editable : false,
                    fieldLabel : '作业区',
                    labelWidth : 65,
                    displayField : 'V_DEPTNAME',
                    valueField : 'V_DEPTCODE',
                    queryMode : 'local',
                    baseCls : 'margin-bottom'
                },
                {
                    id : 'sblx',
                    xtype : 'combo',
                    store : ssblx,
                    editable : false,
                    fieldLabel : '设备类型',
                    labelWidth : 65,
                    width:250,
                    displayField : 'V_EQUTYPENAME',
                    valueField : 'V_EQUTYPECODE',
                    queryMode : 'local',
                    baseCls : 'margin-bottom'
                },
                {
                    id : 'query',
                    xtype : 'button',
                    icon : '../../images/gif/search.png',
                    style : ' margin: 5px 0px 0px 10px',
                    text : '查询',
                    width : 80,
                    handler : function() {

                        Ext.data.StoreManager.lookup('gridStore').load({
                            params: {
                                V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
                                V_V_EQUTYPECODE: Ext.getCmp('sblx').getValue()
                            }
                        });
                        /*gridStore.load({
                            params : {
                                parName : [ 'V_V_DEPTCODE', 'V_V_EQUTYPECODE' ],
                                parType : [ 's', 's'],
                                parVal : [Ext.getCmp('zyq').getValue(),
                                    Ext.getCmp('sbtype').getValue()],
                                proName : 'RRO_BASE_PRELOADWAREMODEL_VIEW',
                                cursorName : 'V_CURSOR'
                            }
                        });*/
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
            autoScroll : true,
            height : 400,

            columns : [ {
                xtype : 'rownumberer',

                align : 'center',
                width : 50,
                sortable : false
            }, {
                text : '生成工单',
                xtype : 'templatecolumn',
                id : 'foundview',
                width : 100,
                align : 'center',
                tpl : '<a href="#">生成工单</a>'
            }, {
                text : '预装件编码',
                dataIndex : 'V_MODELNUMBER',

                width : 100,
                align : 'center',
                renderer : left
            }, {
                text : '预装件名称',
                dataIndex : 'V_MODELNAME',
                width : 200,
                align : 'center',
                renderer : left
            }, {
                text : '预装件型号',
                dataIndex : 'V_TYPE',
                width : 150,
                align : 'center',
                renderer : left
            }, {
                text : '预装件单位',
                dataIndex : 'V_UNIT',
                width : 150,
                align : 'center',
                renderer : left
            }, {
                text : '安装位置',
                dataIndex : 'V_SETSITE',
                width : 150,
                align : 'center',
                renderer : left
            }, {
                text : '备注',
                dataIndex : 'V_MEMO',
                width : 150,
                align : 'center',
                renderer : left
            }, {
                text : '详细',
                xtype : 'templatecolumn',
                id : 'detaile',
                width : 100,
                align : 'center',
                tpl : '<a href="">详细</a>'
            } ]
        });

        Ext.create('Ext.container.Viewport', {
            id : "id",
            layout : 'border',
            items : [ panel, grid ]
        });

        Ext.data.StoreManager.lookup('ckstore').on("load", function() {
            Ext.getCmp("ck").select(Ext.data.StoreManager.lookup('ckstore').getAt(0));
            Ext.data.StoreManager.lookup('zyqstore').load({
                params : {
                    'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                    'V_V_DEPTCODE':   Ext.getCmp("ck").getValue(),
                    'V_V_DEPTCODENEXT':  Ext.util.Cookies.get('v_deptcode'),
                    'V_V_DEPTTYPE':'[主体作业区]'
                }
            });
        });

        Ext.data.StoreManager.lookup('zyqstore').on("load", function() {
            Ext.getCmp("zyq").select(Ext.data.StoreManager.lookup('zyqstore').getAt(0));
            Ext.data.StoreManager.lookup('ssblx').load({
                params : {
                    V_V_DEPTCODENEXT:Ext.getCmp("zyq").getValue()
                }
            });
        });

        Ext.data.StoreManager.lookup('ssblx').on('load', function() {
            Ext.getCmp("sblx").select(Ext.data.StoreManager.lookup('ssblx').getAt(0));

        });


        Ext.getCmp("ck").on("select",function() {
            Ext.getCmp('zyq').getStore().removeAll();
            Ext.data.StoreManager.lookup('zyqstore').load({
                params : {
                    V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                    V_V_DEPTCODE:Ext.getCmp("ck").getValue(),
                    V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode'),
                    V_V_DEPTTYPE:'[主体作业区]'
                }
            });
        });

        Ext.getCmp('zyq').on('select', function() {
            Ext.getCmp('sblx').getStore().removeAll();
            Ext.data.StoreManager.lookup('ssblx').load({
                params : {
                    V_V_DEPTCODENEXT : Ext.getCmp("zyq").getValue()
                }
            });

        });

        Ext.ComponentManager.get('foundview')
            .on(
            "click",
            function(view, rowIndex, colIndex, item, e) {
                var id = Ext.getCmp('grid').getStore().getAt(
                    colIndex).data.V_MODELNUMBER;

                window.open(AppUrl + "page/No41050601/index"+Ext.util.Cookies.get('v_workcss')+'.html?V_MODELNUMBER=' + id ,
                    "", "dialogHeight:700px;dialogWidth:1100px");
            });

        Ext.ComponentManager.get('detaile').on("click",
            function(view, rowIndex, colIndex, item, e) {
                var id = Ext.getCmp('grid').getStore().getAt(
                    colIndex).data.V_MODELNUMBER;

                window.open(AppUrl + "page/No410502/Index.html?x_modelnumber="+ id ,
                    "", "dialogHeight:700px;dialogWidth:1100px");
            });

    });

function left(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}