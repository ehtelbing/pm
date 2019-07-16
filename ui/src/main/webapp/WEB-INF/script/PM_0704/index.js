var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
Ext.onReady(function() {
    Ext.QuickTips.init();
    var dt = new Date();
    var thisYear = dt.getFullYear();
    var years = [];
    for (var i = 2012; i <= thisYear; i++)
        years.push({
            displayField : i,
            valueField : i
        });
    var ckstore = Ext.create("Ext.data.Store", {
        autoLoad : true,

        storeId : 'ckstore',
        fields : ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl +'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            // url: 'PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            },
            extraParams : {
                'V_V_PERSONCODE': V_V_PERSONCODE,
                'V_V_DEPTCODE': V_V_DEPTCODE,
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '基层单位'
            }
        }
    });

    var zyqstore = Ext.create("Ext.data.Store", {
        autoLoad : false,
        storeId : 'zyqstore',
        fields : ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'PM_12/PRO_BASE_DEPT_VIEW',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            }

        }
    });

    var ssbtype = Ext.create("Ext.data.Store", {
        autoLoad : false,
        storeId : 'sbtype',
        fields : ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'qx/PRO_PM_07_DEPTEQUTYPE_PER',
            // url: 'PRO_GET_DEPTEQUTYPE_PER',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            }
        }
    });

    var ssbname = Ext.create("Ext.data.Store", {
        autoLoad : false,
        storeId : 'sbtype',
        fields : ['V_EQUCODE', 'V_EQUNAME'],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'qx/PRO_PM_07_DEPTEQU_PER_DROP',
            // url: 'PRO_GET_DEPTEQU_PER',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            }
        }
    });

    var panel = Ext.create('Ext.form.Panel', {
        id : 'panellow',
        region : 'north',
        defaults : {
            style : 'margin:5px 0px 5px 5px',
            labelAlign : 'right'
        },
        layout : {
            type : 'column'
        },
        frame:true,
        items : [{
            id : 'yeartime',
            store : Ext.create("Ext.data.Store", {
                fields : ['displayField', 'valueField'],
                data : years,
                proxy : {
                    type : 'memory',
                    reader : {
                        type : 'json'
                    }
                }
            }),
            xtype : 'combo',
            fieldLabel : '选择年份',
            value : new Date().getFullYear(),
            labelWidth : 100,
            editable : false,
            displayField : 'displayField',
            valueField : 'valueField',
            baseCls : 'margin-bottom'
        }, {
            id : 'ck',
            xtype : 'combo',
            store : ckstore,
            fieldLabel : '厂矿',
            editable : false,
            labelWidth : 100,
            displayField : 'V_DEPTNAME',
            valueField : 'V_DEPTCODE',
            queryMode : 'local',
            baseCls : 'margin-bottom'
        }, {
            id : 'zyq',
            xtype : 'combo',
            store : zyqstore,
            fieldLabel : '作业区',
            editable : false,
            labelWidth : 100,
            displayField : 'V_DEPTNAME',
            valueField : 'V_DEPTCODE',
            queryMode : 'local',
            baseCls : 'margin-bottom'
        }, {
            id : 'sbtype',
            xtype : 'combo',
            store : ssbtype,
            fieldLabel : '设备类型',
            editable : false,
            labelWidth : 100,
            displayField : 'V_EQUTYPENAME',
            valueField : 'V_EQUTYPECODE',
            queryMode : 'local',
            baseCls : 'margin-bottom'
        }, {
            id : 'sbname',
            xtype : 'combo',
            store : ssbname,
            fieldLabel : '设备名称',
            editable : false,
            labelWidth : 100,
            displayField : 'V_EQUNAME',
            valueField : 'V_EQUCODE',
            queryMode : 'local',
            baseCls : 'margin-bottom'
        }, {
            id : 'query',
            xtype : 'button',
            icon: imgpath + '/search.png',
            text : '查询',
            width : 80,
            handler : function() {
                gridStore.load({
                    params : {
                        V_V_SOURCECODE:
                        Ext.ComponentManager.get("tabid").getValue(),
                        V_V_DEPTCODE2:
                        Ext.ComponentManager.get("ck").getValue(),
                        V_D_DEFECTDATE_B:
                        Ext.ComponentManager.get("yeartime").getValue()
                        + "/1/1",
                        V_D_DEFECTDATE_E:
                        Ext.ComponentManager.get("yeartime").getValue()
                        + "/12/31",
                        V_V_DEPTCODENEXT:
                        Ext.ComponentManager.get("zyq").getValue(),
                        V_V_EQUTYPECODE:
                        Ext.ComponentManager.get("sbtype").getValue(),
                        V_V_EQUCODE:
                        Ext.ComponentManager.get("sbname").getValue()
                    }
                });
            }
        }, {
            xtype : 'button',
            text : '查看柱状图',
            icon: imgpath + '/search.png',
            id : 'looktu',
            width : 100,
            listeners : {
                click : OnTuButtonClicked
            }
        }, {
            xtype : 'button',
            text : '查看列表',
            id : 'lookgrid',
            width : 100,
            hidden : true,
            listeners : {
                click : OnGridButtonClicked
            }
        }, {
            xtype : 'hidden',
            id : 'tabid'
        }]
    });
    var gridStore = Ext.create('Ext.data.Store', {
        id : 'gridStore',
        autoLoad : false,
        fields : ["月份", "缺陷数量", "手工消缺数量", "下达工单数量", "已处理数量", '未处理数量', '处理率','消缺率'],
        proxy : {
            type : 'ajax',
            async : false,
            url : AppUrl + 'qx/PRO_PM_07_DEFECT_TJ_VIEW',
            // url: 'PRO_PM_DEFECT_TJ_VIEW',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            }
        }
    });

    var tabpanel = Ext.create("Ext.tab.Panel", {
        id : 'tabpanel',
        region : 'center',
        activeTab : 0,
        listeners : {
            beforerender : addTab,

            tabchange : function() {
                Ext.ComponentManager.get("tabid").setValue(Ext
                    .getCmp('tabpanel').getActiveTab().down("hidden")
                    .getValue());
                gridStore.load({
                    params : {
                        V_V_SOURCECODE:
                            Ext.ComponentManager.get("tabid").getValue(),
                        V_V_DEPTCODE2:
                            Ext.ComponentManager.get("ck").getValue(),
                        V_D_DEFECTDATE_B:
                        Ext.ComponentManager.get("yeartime").getValue()
                        + "/1/1",
                        V_D_DEFECTDATE_E:
                        Ext.ComponentManager.get("yeartime").getValue()
                        + "/12/31",
                        V_V_DEPTCODENEXT:
                            Ext.ComponentManager.get("zyq").getValue(),
                        V_V_EQUTYPECODE:
                            Ext.ComponentManager.get("sbtype").getValue(),
                        V_V_EQUCODE:
                            Ext.ComponentManager.get("sbname").getValue()
                    }
                });
            }
        },
        dockedItems : [{
            xtype : 'gridpanel',
            id : 'grid',
            columnLines : true,
            width : '100%',
            store : gridStore,
            autoScroll : true,
            height : 400,
            columns : [{
                text : '月份',
                align : 'center',
                width : 100,
                dataIndex : '月份',
                hidden : true,
                renderer : left
            }, {
                text : '缺陷数量',
                align : 'center',
                width : 100,
                dataIndex : '缺陷数量',
                renderer : left
            }, {
                text : '手工消缺数量',
                align : 'center',
                width : 180,
                dataIndex : '手工消缺数量',
                renderer : left
            }, {
                text : '下达工单数量',
                align : 'center',
                width : 180,
                dataIndex : '下达工单数量',
                renderer : left
            }, {
                text : '已处理数量',
                align : 'center',
                width : 180,
                dataIndex : '已处理数量',
                renderer : left
            }, {
                text : '未处理数量',
                align : 'center',
                width : 180,
                dataIndex : '未处理数量',
                renderer : left
            }, {
                text : '处理率',
                align : 'center',
                width : 180,
                dataIndex : '处理率',
                renderer : left
            }, {
                text : '消缺率',
                align : 'center',
                width : 180,
                dataIndex : '消缺率',
                renderer : left
            }]
        }, {
            xtype : 'chart',
            store : gridStore,
            id : 'chart',
            hidden : true,
            background : {
                fill : 'rgb(255, 255, 255)'
            },
            height : 400,
            axes : [{
                type : 'numeric',
                fields : '上报数量',
                position : 'left'//,
                //minimum : 0,
                //maximum : 50
            }, {
                type : 'category',
                fields : 'V_2',
                position : 'bottom'
            }],
            animate : {
                duration : 500
            },
            legend : {
                position : 'right'
            },
            series : [{
                type : 'column',
                highlight : true,
                xField : ['V_2'],
                yField : ['上报数量', '有效数量', '已处理数量'],

                axis : 'left',
                label : [{
                    display : 'outside',
                    field : '上报数量'
                }, {
                    display : 'outside',
                    field : '有效数量'
                }],
                tips : {
                    trackMouse : true,
                    width : 74,
                    height : 38,
                    renderer : function(storeItem, gridStore) {
                        this.setTitle(storeItem.get('V_2') + '：'
                        + gridStore.value[1]);
                    }
                }
            }]
        }]

    })
    Ext.create('Ext.container.Viewport', {
        id : "id",
        layout : 'border',
        items : [panel]
    });
    ckstore.on("load", function() {
        Ext.getCmp("ck").select(ckstore.getAt(0));
        Ext.ComponentManager.get('zyq').getStore().removeAll();
        zyqstore.load({
            params : {
                IS_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                IS_V_DEPTTYPE: '[主体作业区]'
            }
        });
    });
    Ext.ComponentManager.get("ck").on("change", function() {
        Ext.ComponentManager.get('zyq').getStore().removeAll();
        zyqstore.load({
            params : {
                IS_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                IS_V_DEPTTYPE: '[主体作业区]'
            }
        });
    });

    zyqstore.on("load", function() {
        Ext.getCmp("zyq").select(zyqstore.getAt(0));
    });

    Ext.ComponentManager.get("zyq").on("change", function() {
        Ext.ComponentManager.get('sbtype').getStore().removeAll();
        ssbtype.load({
            params : {
                V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT : Ext.getCmp("zyq").getValue()
            }
        });
    });

    ssbtype.on("load", function() {
        Ext.getCmp("sbtype").select(ssbtype.getAt(0));
        ssbname.load({
            params : {
                V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT : Ext.getCmp("zyq").getValue(),
                V_V_EQUTYPECODE : Ext.getCmp("sbtype").getValue()
            }
        });
    });

    Ext.getCmp("sbtype").on("change", function() {
        Ext.ComponentManager.get('sbname').getStore().removeAll();
        ssbname.load({
            params : {
                V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT : Ext.getCmp("zyq").getValue(),
                V_V_EQUTYPECODE : Ext.getCmp("sbtype").getValue()
            }
        });
    });

    ssbname.on("load", function() {
        Ext.getCmp("sbname").select(ssbname.getAt(0));
        Ext.getCmp("id").add(tabpanel);
        gridStore.load({
            params : {
                V_V_SOURCECODE :
                    Ext.ComponentManager.get("tabid").getValue(),
                V_V_DEPTCODE2 :
                    Ext.ComponentManager.get("ck").getValue(),
                V_D_DEFECTDATE_B :
                Ext.ComponentManager.get("yeartime")
                    .getValue()
                + "/1/1",
                V_D_DEFECTDATE_E :
                Ext.ComponentManager.get("yeartime")
                    .getValue()
                + "/12/31",
                V_V_DEPTCODENEXT :
                    Ext.ComponentManager.get("zyq").getValue(),
                V_V_EQUTYPECODE :
                    Ext.ComponentManager.get("sbtype").getValue(),
                V_V_EQUCODE :
                    Ext.ComponentManager.get("sbname").getValue()
            }
        });

    });
    Ext.getCmp('sbname').on("change", function() {
        gridStore.load({
            params : {
                V_V_SOURCECODE :
                    Ext.ComponentManager.get("tabid").getValue(),
                V_V_DEPTCODE2 :
                    Ext.ComponentManager.get("ck").getValue(),
                V_D_DEFECTDATE_B :
                Ext.ComponentManager.get("yeartime")
                    .getValue()
                + "/1/1",
                V_D_DEFECTDATE_E :
                Ext.ComponentManager.get("yeartime")
                    .getValue()
                + "/12/31",
                V_V_DEPTCODENEXT :
                    Ext.ComponentManager.get("zyq").getValue(),
                V_V_EQUTYPECODE :
                    Ext.ComponentManager.get("sbtype").getValue(),
                V_V_EQUCODE :
                    Ext.ComponentManager.get("sbname").getValue()
            }
        });
    })
})

function BeforeGridStoreLoad(store) {

    store.proxy.extraParams.parName = ['V_D_DEFECTDATE_B', 'V_D_DEFECTDATE_E',
        'V_V_DEPTCODE2', 'V_V_DEPTCODENEXT', 'V_V_EQUTYPECODE',
        'V_V_EQUCODE','V_V_PERSONCODE', 'V_V_SOURCECODE'];
    store.proxy.extraParams.parType = ['s', 's', 's', 's', 's', 's','s', 's'];
    store.proxy.extraParams.parVal = [
        Ext.ComponentManager.get("yeartime").getValue() + "/1/1",
        Ext.ComponentManager.get("yeartime").getValue() + "/12/31",
        Ext.ComponentManager.get("ck").getValue(),
        Ext.ComponentManager.get("zyq").getValue(),
        Ext.ComponentManager.get("sbtype").getValue(),
        Ext.ComponentManager.get("sbname").getValue(),
        Ext.util.Cookies.get('v_personcode'),
        Ext.ComponentManager.get("tabid").getValue()];
    store.proxy.extraParams.proName = 'PRO_PM_DEFECT_TJ_VIEW_PER';
    store.proxy.extraParams.cursorName = 'V_CURSOR';

    // store.proxy.extraParams.V_V_SOURCECODE =
    // Ext.ComponentManager.get("tabid")
    // .getValue();
    // store.proxy.extraParams.V_V_DEPTCODE2 = Ext.ComponentManager.get("ck")
    // .getValue();
    // store.proxy.extraParams.V_D_DEFECTDATE_B = Ext.ComponentManager
    // .get("yeartime").getValue()
    // + "/1/1";
    // store.proxy.extraParams.V_D_DEFECTDATE_E = Ext.ComponentManager
    // .get("yeartime").getValue()
    // + "/12/31";
    // store.proxy.extraParams.V_V_DEPTCODENEXT =
    // Ext.ComponentManager.get("zyq")
    // .getValue();
    // store.proxy.extraParams.V_V_EQUTYPECODE = Ext.ComponentManager
    // .get("sbtype").getValue();
    // store.proxy.extraParams.V_V_EQUCODE = Ext.ComponentManager.get("sbname")
    // .getValue();
}

function addTab() {
    Ext.Ajax.request({
        url : AppUrl + 'qx/PRO_PM_07_DEFECT_SOURCE_VIEW',
        // url : 'PRO_PM_DEFECT_SOURCE_VIEW',
        params : {
        },
        method : 'POST',
        success : function(ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            resp = resp.list;
            Ext.ComponentManager.get("tabpanel").add(0, {
                title : '全部',
                items : [{
                    xtype : 'hidden',
                    value : '%'
                }]
            });
            for (i = 0; i < resp.length; i++) {
                Ext.ComponentManager.get("tabpanel").add({
                    title : resp[i].V_SOURCENAME,
                    items : [{
                        xtype : 'hidden',
                        value : resp[i].V_SOURCECODE
                    }]
                });
            }
            Ext.ComponentManager.get("tabpanel").setActiveTab(0);
        }
    });
}
function left(value, metaData) {
    metaData.style = "text-align:left";
    if(value == null){
        return '<div data-qtip="' + 0 + '" >' + 0 + '</div>';
    }
    else{
        return '<div data-qtip="' + value + '" >' + value + '</div>';
    }

}

function OnTuButtonClicked() {
    Ext.ComponentManager.get('looktu').hide();
    Ext.ComponentManager.get('lookgrid').show();
    Ext.ComponentManager.get('grid').hide();
    Ext.ComponentManager.get('chart').show();
}

function OnGridButtonClicked() {
    Ext.ComponentManager.get('looktu').show();
    Ext.ComponentManager.get('lookgrid').hide();
    Ext.ComponentManager.get('grid').show();
    Ext.ComponentManager.get('chart').hide();
}