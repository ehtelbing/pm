var imgid = '';

Ext.onReady(function() {
    // 作业区
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

    // 周期类型
    var fzrStore = Ext.create('Ext.data.Store', {
        autoLoad : false,
        storeId : 'fzrStore',
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
            }
        }
    });

    var creatpanel1 = Ext.create('Ext.form.Panel', {
        id : 'creatpanel1',
        style : 'margin:5px 0px 2px 2px',
        region : 'north',
        width : '100%',
        //baseCls : 'my-panel-no-border',
        defaults : {
            style : 'margin:5px 0px 5px 10px',
            labelAlign : 'right'
        },
        layout : {
            type : 'vbox'
        },
        items : [ {
            xtype : 'panel',
            region : 'center',
            layout : 'column',
            //baseCls : 'my-panel-no-border',
            defaults : {
                labelAlign : 'right',
                labelWidth : 50
            },
            items : [ {
                xtype : 'combo',
                id : 'zyq',
                store : gzpalceStore,
                fieldLabel : '作业区 ',
                editable : false,
                style : 'margin:5px 0px',
                queryMode : 'local',
                valueField : 'V_DEPTCODE',
                displayField : 'V_DEPTNAME'
            }, {
                xtype : 'combo',
                id : 'xzsb',
                store : sbxzStore,
                fieldLabel : '设备 ',
                editable : false,
                style : 'margin:5px 0px',
                queryMode : 'local',
                valueField : 'EQU_ID',
                displayField : 'EQU_DESC',
                labelWidth : 45
            }, {
                xtype : 'combo',
                id : 'fzr',
                store : 'fzrStore',
                fieldLabel : '周期类型 ',
                editable : false,
                style : 'margin:5px  0px 5px 5px',
                queryMode : 'local',
                valueField : 'CYCLE_ID',
                displayField : 'CYCLE_DESC',
                labelWidth : 65
            }, {
                xtype : 'button',
                text : '查询',
                icon : imgpath + '/search.png',
                width : 60,
                handler : query,
                style : {
                    margin : '5px 0px 10px 10px'
                }
            }

            ]
        } ]
    });

    var store1 = Ext.create('Ext.data.JsonStore', {
        fields : [ 'name', '报警值', '作业量' ]

    });

    var chart = Ext.create('Ext.chart.Chart', {
        style : 'background:#fff',
        animate : true,
        shadow : true,
        store : store1,
        region : 'center',
        legend : {
            position : 'right'
        },
        axes : [ {
            /** x轴 */
            type : 'Numeric',
            position : 'bottom',
            fields : [ '报警值', '作业量' ],
            minimum : 0,
            label : {
                renderer : Ext.util.Format.numberRenderer('0,0')
            },
            grid : true,
            title : '作业量'
        },

            {
                /** 左侧分类 - y轴 */
                type : 'Category',
                position : 'left',
                fields : [ 'name' ],
                title : ''
            } ],
        series : [ {
            type : 'bar',
            axis : 'bottom',
            xField : 'name',
            yField : [ '报警值', '作业量' ]
        } ]
    });

    query();

    function query() {

        Ext.Ajax.request({
            async : false,
            url : AppUrl + 'lx/PRO_RUN_EQU_BJ_ALERT_ALL',
            method : 'POST',
            params : {
                A_EQUID : Ext.getCmp('xzsb').getValue(),
                A_CYCLE_ID : Ext.getCmp('fzr').getValue()
            },
            success : function(response, options) {

                var resp = Ext.JSON.decode(response.responseText);

                var data = [];
                Ext.Array.each(resp.list,
                    function(name, index, countriesItSelf) {

                        data.push({
                            name : name.SITE_DESC,
                            报警值 : name.ALERT_VALUE,
                            作业量 : name.SUM_YEILD
                        })
                    });
                store1.loadData(data);
            }
        });
    }

    Ext.create('Ext.container.Viewport', {
        id : "id",
        layout : 'border',
        items : [ creatpanel1, chart ]
    });

    /** 作业区 - 事件 */
    gzpalceStore.on('load',
        function() {
            gzpalceStore.insert(0, {
                'V_DEPTCODE' : '%',
                'V_DEPTNAME' : '全部'
            });
            gzpalceStore.sort('V_DEPTCODE', 'ASC');
            Ext.getCmp('zyq').select(gzpalceStore.getAt(0));
            // 默认当前登录用户工作区
            var storeDataList = gzpalceStore.data;
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

            /** 设备加载 */
            Ext.data.StoreManager.lookup('sbxzStore').load(
                {
                    params : {
                        v_v_plantcode : Ext.util.Cookies.get('v_orgCode'),
                        v_v_deptcode :  Ext.getCmp("zyq").getValue()
                    }
                });
        });

    /** 设备 - 事件 */
    sbxzStore.on('load', function() {
        sbxzStore.sort('EQU_ID', 'ASC');
        Ext.getCmp('xzsb').select(sbxzStore.getAt(0));
    });

    /** 周期类型 - 加载 */
    Ext.data.StoreManager.lookup('fzrStore').load();
    /** 周期类型 - 事件 */
    Ext.data.StoreManager.lookup('fzrStore').on(
        'load',
        function() {
            Ext.getCmp('fzr').store.sort('CYCLE_ID', 'ASC');
            Ext.getCmp('fzr').select(
                Ext.data.StoreManager.lookup('fzrStore').getAt(0));
        });

    /** 作业区 -> 设备 联动 */
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

});

function RenderFontLeft(value, metaData) {
    metaData.style = 'text-align: left';
    value = value.split(' ')[0];
    return value;
}

function findcode(a, record, item, index, e, eOpts) {
    imgid = record.raw.LOGID;
}
