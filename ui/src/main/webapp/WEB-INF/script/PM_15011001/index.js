var matTypeStoreLoad = false;
var matTypeRStoreLoad = false;
var kcid = '';
var rel_kcid = '';
var rel_mpid = '';
var dt = new Date();
var thisYear = dt.getFullYear();
var A_KCID_LIST = new Array();
var years = [];
for (var i = 2013; i <= thisYear + 2; i++)
    years.push({
        displayField: i,
        valueField: i
    });
var months = [];
for (var w = 1; w <= 12; w++)
    months.push({
        displayField: w,
        valueField: w
    });
var A_MATERIALCODE_LIST = new Array();
var A_MATERIALNAME_LIST = new Array();
var A_ETALON_LIST = new Array();
var A_UNIT_LIST = new Array();
var A_PRICE_LIST = new Array();
var A_AMOUNT_LIST = new Array();
var A_STOREDESC_LIST = new Array();
var A_LOCDESC_LIST = new Array();
var A_ITYPEE_LIST = new Array();
var A_MPID_LIST = new Array();


Ext.onReady(function () {
    Ext.getBody().mask('<p>正在载入中...</p>');

    //储备入库Store
    var inputStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'inputStore',
        pageSize: 100,
        fields: ['KCID', 'PLANTCODE', 'DEPARTCODE', 'DEPARTNAME', 'MATERIALCODE', 'MATERIALNAME', 'ETALON', 'UNIT', 'F_PRICE', 'AMOUNT',
            'KY_AMOUNT', 'F_MONEY', 'INSERTDATE', 'INSERT_USERID', 'INSERT_USERNAME', 'STOREID', 'STORE_DESC', 'LOC_DESC', 'USEFLAG', 'I_TYPE', 'MPID', 'REMARK'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/GETINPUT',//pg_dj1001.getinput
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            },
            extraParams: {}
        }
    });

    //物资分类Store
    var matTypeStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'matTypeStore',
        fields: ['CODE', 'NAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/PRO_MM_ITYPE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        },
        listeners: {
            load: function (store, records) {
                store.insert(0, {
                    'CODE': '%',
                    'NAME': '全部'
                });
                matTypeStoreLoad = true;
                Ext.getCmp('wzfl').select(store.first());
                _init();
            }
        }

    });

    //物资分类Store
    var matTypeRStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'matTypeStore',
        fields: ['CODE', 'NAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/PRO_MM_ITYPE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        },
        listeners: {
            load: function (store, records) {
                matTypeRStoreLoad = true;
                Ext.getCmp('Rkwzfl').select(store.first());
                _init();
            }
        }

    });

    //年份Store
    var yearStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'yearStore',
        fields: ['displayField', 'valueField'],
        data: years,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    });

    //月份Store
    var monthStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'monthStore',
        fields: ['displayField', 'valueField'],
        data: months,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    });

    //查询计划Store
    var mpStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'mpStore',
        fields: ['ID', 'ABLE_AMOUNT', 'MATERIALCODE', 'MATERIALNAME', 'MATERIALELATON', 'MATERIALUNIT', 'PLAN_PRICE', 'AMOUNT', 'I_TYPE', 'F_MONEY', 'LY_AMOUNT'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/GETMP',//pg_dj1001.getmp
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        }

    });

    //关联查询Store
    var gridInputStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'gridInputStore',
        fields: ['MATERIALCODE', 'KCID', 'MATERIALNAME', 'ETALON', 'UNIT',
            'F_PRICE', 'AMOUNT', 'F_MONEY', 'STORE_DESC', 'I_TYPE',
            'INSERTDATE', 'KCID'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/GETINPUTLIST',//pg_dj1004.getinputlist
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        }
    });

    //菜单面板
    var tablePanel = Ext.create("Ext.panel.Panel", {
        region: 'north',
        frame: true,
        //baseCls : 'my-panel-noborder',
        layout: 'vbox',
        width: '100%',
        items: [{
            xtype: 'panel',
            //frame: true,
            width: "100%",
            baseCls: 'my-panel-noborder',
            layout: 'hbox',
            items: [{
                xtype: 'combo',
                id: 'bm',
                fieldLabel: '部门',
                labelAlign: 'right',
                editable: false,
                style: 'margin:5px 0px 5px 5px',
                labelWidth: 70,
                queryMode: 'local',
                store: {
                    fields: ["code", "value"],
                    data: [{
                        code: Ext.util.Cookies.get("v_deptcode"),
                        value: Ext.util.Cookies.get("v_deptname2")
                    }]
                },
                valueField: 'code',
                displayField: 'value',
                value: Ext.util.Cookies.get("v_deptcode")
            }, {
                xtype: 'combo',
                id: 'wzfl',
                fieldLabel: '物资分类',
                labelAlign: 'right',
                editable: false,
                style: 'margin:5px 0px 5px 5px',
                labelWidth: 70,
                queryMode: 'local',
                valueField: 'CODE',
                displayField: 'NAME',
                store: matTypeStore
            }, {
                xtype: 'textfield',
                id: 'kfms',
                fieldLabel: '库房描述',
                labelWidth: 70,
                style: 'margin:5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            //frame: true,
            layout: 'hbox',
            width: "100%",
            baseCls: 'my-panel-noborder',
            items: [{
                xtype: 'textfield',
                id: 'wzbh',
                fieldLabel: '物资编号',
                labelWidth: 70,
                style: 'margin:5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'wzmc',
                fieldLabel: '物资名称',
                labelWidth: 70,
                style: 'margin:5px 0px 5px 3px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'gg',
                fieldLabel: '规格',
                labelWidth: 70,
                style: 'margin:5px 0px 5px 3px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            //frame: true,
            layout: 'hbox',
            width: "100%",
            baseCls: 'my-panel-noborder',
            items: [{
                xtype: 'textfield',
                id: 'cfwz',
                fieldLabel: '存放位置',
                labelWidth: 70,
                style: 'margin:5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '查询',
                labelWidth: 70,
                style: 'margin:5px 0px 5px 25px',
                icon: imgpath + '/search.png',
                handler: _select
            }, {
                xtype: 'button',
                text: '入库',
                labelWidth: 70,
                style: 'margin:5px 0px 5px 10px',
                handler: _insert,
                icon: imgpath + '/add.png'
            }, {
                xtype: 'button',
                text: '按计划入库',
                labelWidth: 70,
                style: 'margin:5px 0px 5px 10px',
                handler: OnPlanRuku,
                icon: imgpath + '/add.png'
            }, {
                xtype: 'button',
                text: '修改',
                labelWidth: 70,
                style: 'margin:5px 0px 5px 10px',
                handler: _update,
                icon: imgpath + '/edit.png'
            }, {
                xtype: 'button',
                text: '确认入库',
                labelWidth: 70,
                style: 'margin:5px 0px 5px 10px',
                icon: imgpath + '/saved.png',
                handler: onSure
            }]
        }]
    });

    //计划1面板
    var plan1Panel = Ext.create("Ext.panel.Panel", {
        id: 'plan1Panel',
        region: 'north',
        layout: 'vbox',
        frame: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'combo',
                id: 'year',
                store: yearStore,
                fieldLabel: '选择年份',
                labelAlign: 'right',
                value: new Date().getFullYear(),
                editable: false,
                style: 'margin: 4px 0px 4px 0px',
                labelWidth: 80,
                width: 180,
                queryMode: 'local',
                displayField: 'displayField',
                valueField: 'valueField'
            }, {
                xtype: 'combo',
                id: 'month',
                store: monthStore,
                fieldLabel: '选择月份',
                labelAlign: 'right',
                editable: false,
                style: 'margin: 4px 0px 4px 0px',
                labelWidth: 80,
                width: 180,
                queryMode: 'local',
                value: new Date().getMonth() + 1,
                labelSeparator: '',
                displayField: 'displayField',
                valueField: 'valueField'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                fieldLabel: '物资编号',
                style: 'margin: 4px 0px 4px 0px',
                id: 'mp_mat_no',
                labelAlign: 'right',
                labelWidth: 80,
                width: 180
            }, {
                xtype: 'textfield',
                fieldLabel: '物资名称',
                style: 'margin: 4px 0px 4px 0px',
                id: 'mp_mat_desc',
                labelAlign: 'right',
                labelWidth: 80,
                width: 180
            }, {
                xtype: 'button',
                text: '查询',
                style: 'margin: 4px 0px 4px 4px',
                icon: imgpath + '/search.png',
                handler: _onSearch
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                fieldLabel: '导入库房描述',
                style: 'margin: 4px 0px 4px 0px',
                id: 'mp_store_desc',
                labelAlign: 'right',
                labelWidth: 80,
                width: 180
            }, {
                xtype: 'textfield',
                fieldLabel: '导入位置描述',
                style: 'margin: 4px 0px 4px 0px',
                id: 'mp_loc_desc',
                labelAlign: 'right',
                labelWidth: 80,
                width: 180
            }, {
                xtype: 'button',
                text: '导入计划',
                style: 'margin: 4px 0px 4px 4px',
                handler: _onPlanImport,
                icon: imgpath + '/add.png'
            }]
        }]

    });

    //计划2面板
    var plan2Panel = Ext.create("Ext.panel.Panel", {
        id: 'plan2Panel',
        region: 'north',
        layout: 'vbox',
        frame: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'datefield',
                id: 'qsrq',
                fieldLabel: '起始日期',
                style: 'margin: 4px 0px 4px 0px',
                labelAlign: 'right',
                labelWidth: 70,
                width: 220,
                value: Ext.Date.getFirstDateOfMonth(new Date()),// 根据现在日期获取这个月的第一天是哪天
                format: 'Y/m/d',
                editable: false
            }, {
                xtype: 'datefield',
                id: 'jsrq',
                fieldLabel: '结束日期',
                style: 'margin: 4px 0px 4px 0px',
                labelAlign: 'right',
                labelWidth: 70,
                width: 220,
                queryMode: 'local',
                value: Ext.Date.getLastDateOfMonth(new Date()),
                format: 'Y/m/d',
                editable: false
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',

            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'kc_wzbh',
                labelWidth: 70,
                width: 220,
                fieldLabel: '物资编码',
                emptyText: '请输入物资编码',
                style: 'margin: 4px 0px 4px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'kc_wzmc',
                labelWidth: 70,
                width: 220,
                fieldLabel: '物资名称',
                emptyText: '请输入物资名称',
                style: 'margin: 4px 0px 4px 0px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '查询',
                style: 'margin: 4px 0px 4px 4px',
                icon: imgpath + '/search.png',
                handler: _onInputSearch
            }]

        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                fieldLabel: '关联备注',
                style: 'margin: 4px 0px 4px 0px',
                id: 'mp_remark',
                labelAlign: 'right',
                labelWidth: 70,
                width: 220
            }]
        }
        ]

    });

//计划1显示面板
    var plan1Grid = Ext.create('Ext.grid.Panel', {
        id: 'plan1Grid',
        store: mpStore,
        width: '100%',
        region: 'sourth',
        border: false,
        columnLines: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [{
            text: '序号',
            dataIndex: 'NUMBER',
            xtype: 'rownumberer',
            width: 40,
            align: 'center'
        }, {
            text: '物资分类',
            align: 'center',
            dataIndex: 'I_TYPE',
            width: 120,
            renderer: atleft
        }, {
            text: '物资编号',
            dataIndex: 'MATERIALCODE',
            align: 'center',
            width: 120,
            renderer: atright
        }, {
            text: '物资名称',
            align: 'center',
            dataIndex: 'MATERIALNAME',
            width: 120
        }, {
            text: '规格',
            align: 'center',
            dataIndex: 'MATERIALELATON',
            width: 80,
            renderer: atleft
        }, {
            text: '单位',
            align: 'center',
            dataIndex: 'MATERIALUNIT',
            width: 40,
            renderer: atleft
        }, {
            text: '计划单价',
            align: 'center',
            dataIndex: 'PLAN_PRICE',
            width: 80,
            renderer: _summary
        }, {
            text: '可用数量',
            align: 'center',
            dataIndex: 'ABLE_AMOUNT',
            width: 80,
            renderer: atright
        }, {
            text: '关联',
            align: 'center',
            dataIndex: 'ID',
            width: 60,
            renderer: function (value, metadata, record) {
                return '<a href="javascript:relmpid(\'' + value + '\')">关联</a>';
            }
        }]/*, bbar: [{
         id: 'gpage',
         xtype: 'pagingtoolbar',
         dock: 'bottom',
         width: '100%',
         displayInfo: true,
         displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
         emptyMsg: '没有记录',
         store: typeStore
         }]*/
    });

//计划2显示面板
    var plan2Grid = Ext.create('Ext.grid.Panel', {
        id: 'plan2Grid',
        store: gridInputStore,
        width: '100%',
        region: 'sourth',
        border: true,
        columnLines: true,
        /*features: [{
         ftype: 'summary'
         }],*/
        columns: [{
            text: '物资编号',
            align: 'center',
            dataIndex: 'MATERIALCODE',
            width: 120,
            renderer: atright
        }, {
            text: '物资名称',
            align: 'center',
            dataIndex: 'MATERIALNAME',
            width: 120,
            renderer: function (value, metadata, record) {
                if (record.data.MATERIALCODE == '') {
                    metadata.style = "text-align:left";
                    return '合计：';
                }
            }

        }, {
            text: '规格',
            align: 'center',
            dataIndex: 'ETALON',
            width: 80,
            renderer: atleft
        }, {
            text: '单位',
            align: 'center',
            dataIndex: 'UNIT',
            width: 40,
            renderer: atleft
        }, {
            text: '入库数量',
            align: 'center',
            dataIndex: 'AMOUNT',
            width: 80,
            renderer: _summary
        }, {
            text: '金额',
            align: 'center',
            dataIndex: 'F_MONEY',
            width: 120,
            renderer: _summary
        }, {
            text: '确认',
            align: 'center',
            dataIndex: 'KCID',
            width: 60,
            renderer: function (value, metadata, record) {
                if (record.data.MATERIALCODE == '') {
                    return '';
                } else {
                    return '<a href="javascript:relkcid(\'' + record.data.KCID + '\')">确认</a>';
                }

            }

        }
        ]
    });

//计划总面板
    var leftPanel = Ext.create('Ext.Panel', {
        id: 'leftPanel',
        layout: 'border',
        border: false,
        items: [{
            region: 'north',
            border: false,
            items: [plan1Panel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [plan1Grid]
        }]
    });
    var rightPanel = Ext.create('Ext.Panel', {
        id: 'rightPanel',
        layout: 'border',
        border: false,
        items: [{
            region: 'north',
            border: false,
            items: [plan2Panel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [plan2Grid]
        }]
    });

//计划弹窗
    var planWindow = Ext.create('Ext.window.Window', {
        id: 'planWindow',
        title: '<div align="center">计划</div>',
        width: 1100,
        height: 450,
        modal: true,
        plain: true,
        closable: true,
        closeAction: 'hide',
        model: true,
        layout: 'border',
        frame: true,
        items: [{
            region: 'west',
            layout: 'fit',
            width: 550,
            border: false,
            items: [leftPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [rightPanel]
        }]
    });

//入库面板
    var rkPanel = Ext.create('Ext.form.Panel', {
        id: 'rkPanel',
        layout: {
            type: 'vbox'
        },
        autoScroll: true,
        border: false,
        frame: true,
        closable: false,
        items: [{// 子面板一
            xtype: 'panel',
            //frame: true,// 渲染
            width: '100%',
            baseCls: 'my-panel-no-border',
            layout: 'hbox',
            items: [{
                xtype: 'textfield',
                fieldLabel: '物资编号',
                style: 'margin: 10px 0px 4px 0px',
                id: 'Rkwzbh',
                labelAlign: 'right',
                labelWidth: 105,
                width: 250
            }, {
                xtype: 'textfield',
                fieldLabel: '物资名称',
                style: 'margin: 10px 0px 4px 0px',
                id: 'Rkwzmc',
                labelAlign: 'right',
                labelWidth: 105,
                width: 250
            }]
        }, {// 子面板二
            xtype: 'panel',
            //frame: true,// 渲染
            width: '100%',
            baseCls: 'my-panel-no-border',
            layout: 'hbox',
            items: [{
                xtype: 'textfield',
                fieldLabel: '规格',
                style: 'margin: 4px 0px 4px 0px',
                id: 'Rkgg',
                labelAlign: 'right',
                labelWidth: 105,
                width: 250
            }, {
                xtype: 'textfield',
                fieldLabel: '单位',
                style: 'margin: 4px 0px 4px 0px',
                id: 'Rkdw',
                labelAlign: 'right',
                labelWidth: 105,
                width: 250
            }]
        }, {// 子面板三
            xtype: 'panel',
            //frame: true,// 渲染
            width: '100%',
            baseCls: 'my-panel-no-border',
            layout: 'hbox',
            items: [{
                xtype: 'numberfield',
                fieldLabel: '单价',
                minValue: 0,
                style: 'margin: 4px 0px 4px 0px',
                id: 'Rkdj',
                labelAlign: 'right',
                labelWidth: 105,
                width: 250
            }, {
                xtype: 'numberfield',
                fieldLabel: '数量',
                minValue: 0,
                style: 'margin: 4px 0px 4px 0px',
                id: 'Rksl',
                labelAlign: 'right',
                labelWidth: 105,
                width: 250
            }]
        }, {// 子面板四
            xtype: 'panel',
            //frame: true,// 渲染
            width: '100%',
            baseCls: 'my-panel-no-border',
            layout: 'hbox',
            items: [{
                xtype: 'textfield',
                fieldLabel: '库房描述',
                style: 'margin: 4px 0px 4px 0px',
                id: 'Rkkfms',
                labelAlign: 'right',
                labelWidth: 105,
                width: 250
            }, {
                xtype: 'textfield',
                fieldLabel: '位置描述',
                style: 'margin: 4px 0px 4px 0px',
                id: 'Rkwzms',
                labelAlign: 'right',
                labelWidth: 105,
                width: 250
            }]
        }, {// 子面板五
            xtype: 'panel',
            //frame: true,// 渲染
            width: '100%',
            baseCls: 'my-panel-no-border',
            layout: 'hbox',
            items: [{
                xtype: 'combo',
                id: 'Rkwzfl',// 入库物资分类
                fieldLabel: '物资分类',
                style: 'margin: 4px 0px 4px 0px',
                labelAlign: 'right',
                labelWidth: 105,
                width: 250,
                queryMode: 'local',
                store: matTypeRStore,
                valueField: 'CODE',
                displayField: 'NAME',
                editable: false,
                listeners: {
                    change: function () {
                        _prefix();
                    }
                }
            }]
        }]
    });

//入库弹窗
    var rkDialog = Ext.create('Ext.window.Window', {// 入库
        id: 'rkDialog',
        height: 300,
        width: 600,
        title: '<div align="center"> 入库</div>',
        layout: 'fit',// 自动适应
        modal: true,
        closable: false,
        closeAction:'hide',
        shadow: false,
        items: [rkPanel],
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            items: [{
                icon: imgpath + '/saved.png',
                id: 'add',
                text: '保 存',
                style: 'margin: 4px 0px 4px 0px',
                handler: _insertMat
            }, {
                icon: imgpath + '/cross.png',
                id: 'cancel2',
                text: '取 消',
                style: 'margin: 4px 0px 4px 10px',
                handler: function () {
                    Ext.getCmp('rkDialog').hide();
                }
            }]
        }]
    });

// 显示面板
    var gridPanel = Ext.create('Ext.grid.Panel', {
        frame: true,
        id: 'gridPanel',
        columnLines: true,
        selType: 'checkboxmodel',
        autoScroll: true,
        store: inputStore,

        selModel: {
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [
            {
                text: '序号',
                xtype: 'rownumberer',
                width: 40,
                align: 'center'
            }, {
                text: '物资编号',
                align: 'center',
                dataIndex: 'MATERIALCODE',
                width: 120,
                renderer: atright
            },
            {
                text: '物资名称',
                dataIndex: 'MATERIALNAME',
                align: 'center',
                width: 120

            },
            {
                text: '规格',
                align: 'center',
                dataIndex: 'ETALON',
                width: 80,
                renderer: atleft
            },
            {
                text: '单位',
                align: 'center',
                dataIndex: 'UNIT',
                width: 40,
                renderer: atleft
            },
            {
                text: '单价',
                align: 'center',
                dataIndex: 'F_PRICE',
                width: 120,
                renderer: _summary
            }, {
                text: '入库数量',
                align: 'center',
                dataIndex: 'AMOUNT',
                width: 80,
                renderer: atright
            }, {
                text: '金额',
                align: 'center',
                dataIndex: 'F_MONEY',
                width: 120,
                renderer: _summary
            }, {
                text: '物资分类',
                align: 'center',
                dataIndex: 'I_TYPE',
                width: 120,
                renderer: atleft

            }, {
                text: '库房描述',
                align: 'center',
                dataIndex: 'STORE_DESC',
                width: 120,
                renderer: atleft
            }, {
                text: '删除',
                align: 'center',
                dataIndex: 'KCID',
                width: 100,
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return '<a href="#" onclick="_delete(\'' + record.data.KCID + '\')">' + '删除' + '</a>';
                }
            }
        ],
        bbar: [{
            id: 'gpage',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            width: '100%',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: inputStore
        }]
    });

//整体视图容器
    Ext.create('Ext.container.Viewport', {
        layout: {
            type: 'border',
            regionWeights: {
                west: -1,
                north: 1,
                south: 1,
                east: -1
            }
        },
        items: [{
            region: 'north',
            border: false,
            items: [tablePanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [gridPanel]
        }]

    });

    _init();

});

//初始化
function _init() {

    if (matTypeStoreLoad && matTypeRStoreLoad) {
        Ext.getBody().unmask();//去除页面笼罩
    }
    _select();
}

//查询储备物资
function _select() {

    var inputStore = Ext.data.StoreManager.lookup('inputStore');
    inputStore.proxy.extraParams = {
        'A_PLANTCODE': Ext.util.Cookies.get("v_orgCode"),
        'A_DEPARTCODE': Ext.util.Cookies.get("v_deptcode"),
        'A_ITYPE': Ext.getCmp('wzfl').getValue(),
        'A_STORE_DESC': Ext.getCmp('kfms').getValue(),
        'A_MATERIALCODE': Ext.getCmp('wzbh').getValue(),
        'A_MATERIALNAME': Ext.getCmp('wzmc').getValue(),
        'A_ETALON': Ext.getCmp('gg').getValue(),
        'A_LOC_DESC': Ext.getCmp('cfwz').getValue(),
        'A_USERID': Ext.util.Cookies.get("v_personcode")

    };
    inputStore.load();
}

//打开入库弹窗
function _insert() {
    kcid = '';
    Ext.getCmp('Rkwzbh').reset();
    Ext.getCmp('Rkwzmc').reset();
    Ext.getCmp('Rkgg').reset();
    Ext.getCmp('Rkdw').reset();
    Ext.getCmp('Rkdj').setValue('0');
    Ext.getCmp('Rksl').setValue('0');
    Ext.getCmp('Rkkfms').reset();
    Ext.getCmp('Rkwzms').reset();
    Ext.getCmp('rkDialog').show();
    _prefix();

}

//新增入库
function _insertMat() {

    Ext.Ajax.request({
        url: AppUrl + 'ml/SAVEINPUT',//pg_dj1001.saveinput
        type: 'ajax',
        method: 'POST',
        params: {
            'A_KCID': kcid,
            'A_MATERIALCODE': Ext.getCmp('Rkwzbh').getValue(),
            'A_MATERIALNAME': Ext.getCmp('Rkwzmc').getValue(),
            'A_ETALON': Ext.getCmp('Rkgg').getValue(),
            'A_UNIT': Ext.getCmp('Rkdw').getValue(),
            'A_PRICE': Ext.getCmp('Rkdj').getValue(),
            'A_AMOUNT': Ext.getCmp('Rksl').getValue(),
            'A_STOREDESC': Ext.getCmp('Rkkfms').getValue(),
            'A_LOCDESC': Ext.getCmp('Rkwzms').getValue(),
            'A_ITYPE': Ext.getCmp('Rkwzfl').getValue(),
            'A_PLANTCODE': Ext.util.Cookies.get("v_orgCode"),
            'A_DEPARTCODE': Ext.util.Cookies.get("v_deptcode"),
            'A_DEPARTNAME': Ext.util.Cookies.get("v_deptname2"),
            'A_USERID': Ext.util.Cookies.get("v_personcode"),
            'A_USERNAME': Ext.util.Cookies.get("v_personname2"),
            'A_MPID': ''

        },

        success: function (response, options) {
            var data = Ext.decode(response.responseText);

            if (data.RET_MSG == "Success") {
                Ext.Msg.alert('操作信息', '操作成功');

                Ext.getCmp('rkDialog').hide();
                _select();
            } else {
                Ext.Msg.alert('操作信息', '操作失败');
            }
        }

    });
}

//删除
function _delete(KCID) {

    Ext.Ajax.request({
        url: AppUrl + 'ml/DELETEINPUT',//pg_dj1001.deleteinput
        type: 'ajax',
        method: 'POST',
        params: {
            'A_KCID': KCID
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET == "Success") {
                //  Ext.Msg.alert('操作信息', '删除成功');
                //   Ext.data.StoreManager.lookup('mendDeptStore').remove();
                _select();
            } else {
                Ext.Msg.alert('操作信息', '操作失败');
            }
        }
    })
}

//打开计划查询
function OnPlanRuku() {
    Ext.getCmp('qsrq').reset();
    Ext.getCmp('jsrq').reset();
    Ext.getCmp('kc_wzbh').reset();
    Ext.getCmp('kc_wzmc').reset();
    Ext.getCmp('mp_remark').reset();
    Ext.getCmp('year').reset();
    Ext.getCmp('month').reset();
    Ext.getCmp('mp_mat_no').reset();
    Ext.getCmp('mp_mat_desc').reset();
    Ext.getCmp('mp_store_desc').reset();
    Ext.getCmp('mp_loc_desc').reset();
    Ext.getCmp('planWindow').show();
}

//修改
function _update() {
    var record = Ext.getCmp("gridPanel").getSelectionModel().getSelection();

    if (record.length != 1) {
        Ext.Msg.alert('提示', '请选择一条数据！');// 提示
        return;
    } else {
        kcid = record[0].data.KCID;
        Ext.getCmp('Rkwzmc').setValue(record[0].data.MATERIALNAME);
        Ext.getCmp('Rkwzbh').setValue(record[0].data.MATERIALCODE);
        Ext.getCmp('Rkgg').setValue(record[0].data.ETALON);
        Ext.getCmp('Rkdw').setValue(record[0].data.UNIT);
        Ext.getCmp('Rkdw').setValue(record[0].data.UNIT);
        Ext.getCmp('Rkdj').setValue(record[0].data.F_PRICE);
        Ext.getCmp('Rksl').setValue(record[0].data.AMOUNT);
        Ext.getCmp('Rkkfms').setValue(record[0].data.STORE_DESC);
        Ext.getCmp('Rkwzms').setValue(record[0].data.LOC_DESC);
        Ext.getCmp('Rkwzfl').setValue(record[0].data.I_TYPE);

        Ext.getCmp('rkDialog').show();
    }
}

//查询计划
function _onSearch() {
    var mpStore = Ext.data.StoreManager.lookup('mpStore');

    mpStore.proxy.extraParams = {
        'A_YEAR': Ext.getCmp('year').getValue(),
        'A_MONTH': Ext.getCmp('month').getValue(),
        'A_PLANTCODE': '6006',//Ext.util.Cookies.get('v_orgCode'),//'6006'
        'A_DEPARTCODE': '60060011',//Ext.util.Cookies.get('v_deptcode'),// '60060011'
        'A_CODE': Ext.util.Cookies.get('mp_mat_no'),
        'A_NAME': Ext.getCmp('mp_mat_desc').getValue()
    };
    mpStore.load();
}

//关联
function relmpid(value) {
    rel_mpid = value;

    _onInputSearch();
    Ext.Msg.alert('提示', '请确认库存记录');
}

//关联查询
function _onInputSearch() {
    var gridInputStore = Ext.data.StoreManager.lookup('gridInputStore');

    gridInputStore.proxy.extraParams = {
        'A_BEGINDATE': Ext.Date.format(Ext.getCmp('qsrq').getValue(), 'Y-m-d'),
        'A_ENDDATE': Ext.Date.format(Ext.getCmp('jsrq').getValue(), 'Y-m-d'),
        'A_PLANTCODE': Ext.util.Cookies.get("v_orgCode"),
        'A_DEPARTCODE': Ext.util.Cookies.get("v_deptcode"),
        'A_ITYPE': '%',
        'A_STORE_DESC': '%',
        'A_MATERIALCODE': Ext.getCmp('kc_wzbh').getValue(),
        'A_MATERIALNAME': Ext.getCmp('kc_wzmc').getValue(),
        'A_ETALON': '%',
        'A_LOC_DESC': '%',
        'A_USERID': Ext.util.Cookies.get('v_personcode')
    };
    gridInputStore.load();
}

//确认关联
function relkcid(value) {
    rel_kcid = value;
    if (rel_mpid == '') {
        Ext.Msg.alert('提示', '请先选择要关联的计划');
        return;
    }
    var remark = Ext.getCmp('mp_remark').getValue();
    if (remark == '') {
        Ext.Msg.alert('提示', '请输入关联备注信息');
        return;
    }

    Ext.Ajax.request({
        url: AppUrl + 'ml/MPTOKC',//pg_dj1001.mptokc
        type: 'ajax',
        method: 'POST',
        params: {
            'A_MPID': rel_mpid,
            'A_KCID': rel_kcid,
            'A_REMARK': remark
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET_MSG == "Success") {
                Ext.Msg.alert('操作信息', '关联成功');
                //   Ext.data.StoreManager.lookup('mendDeptStore').remove();
                _onSearch();
            } else {
                Ext.Msg.alert('操作信息', '关联失败');
            }
        }
    })
}

//导入计划
function _onPlanImport() {
    kc_id = '';
    var store_desc = Ext.getCmp('mp_store_desc').getValue();
    var loc_desc = Ext.getCmp('mp_loc_desc').getValue();
    if (store_desc == '') {
        Ext.Msg.alert('提示', '库房描述不能为空！');// 提示
        return;
    }

    var records = Ext.getCmp('plan1Grid').getSelectionModel().getSelection();

    if (records.length == 0) {
        Ext.Msg.alert('提示', '请选择一条数据！');// 提示
        return;
    }

    for (var i = 0; i < records.length; i++) {
        A_MATERIALCODE_LIST.push(records[i].get('MATERIALCODE'));
        A_MATERIALNAME_LIST.push(records[i].get('MATERIALNAME'));
        A_ETALON_LIST.push(records[i].get('MATERIALELATON'));
        A_UNIT_LIST.push(records[i].get('MATERIALUNIT'));
        A_PRICE_LIST.push(records[i].get('PLAN_PRICE'));
        A_AMOUNT_LIST.push(records[i].get('ABLE_AMOUNT'));
        A_ITYPEE_LIST.push(records[i].get('I_TYPE'));
        A_MPID_LIST.push(records[i].get('ID'));
    }

    Ext.Ajax.request({
        url: AppUrl + 'ml/DRSAVEINPUT',//pg_dj1001.saveinput
        type: 'ajax',
        method: 'POST',
        params: {
            'A_KCID': kcid,
            'A_MATERIALCODE': A_MATERIALCODE_LIST,
            'A_MATERIALNAME': A_MATERIALNAME_LIST,
            'A_ETALON': A_ETALON_LIST,
            'A_UNIT': A_UNIT_LIST,
            'A_PRICE': A_PRICE_LIST,
            'A_AMOUNT': A_AMOUNT_LIST,
            'A_STOREDESC': store_desc,
            'A_LOCDESC': loc_desc,
            'A_ITYPE': A_ITYPEE_LIST,
            'A_PLANTCODE': Ext.util.Cookies.get("v_orgCode"),
            'A_DEPARTCODE': Ext.util.Cookies.get("v_deptcode"),
            'A_DEPARTNAME': Ext.util.Cookies.get("v_deptname2"),
            'A_USERID': Ext.util.Cookies.get("v_personcode"),
            'A_USERNAME': Ext.util.Cookies.get("v_personname2"),
            'A_MPID': A_MPID_LIST
        },

        success: function (response, options) {
            var data = Ext.decode(response.responseText);
            if (data.RET_MSG == "Success") {
                Ext.Msg.alert('操作信息', '操作成功');

                _onSearch();
                _select();
            } else {
                Ext.Msg.alert('操作信息', '操作失败');
            }
        }
    });
}

//确认入库
function onSure() {
    var records = Ext.getCmp('gridPanel').getSelectionModel().getSelection();
    if ((records.length == 0)) {
        Ext.Msg.alert('提示', '请至少选择一条数据！');// 提示
        return;
    }

    if (records.length > 0) {
        for (var i = 0; i < records.length; i++) {
            A_KCID_LIST.push(records[i].get('KCID'));
        }
        Ext.Ajax.request({
            url: AppUrl + 'ml/CONFIRMINPUT',//pg_dj1001.confirminput
            type: 'ajax',
            //async: false,
            method: 'POST',
            params: {
                'A_KCID': A_KCID_LIST
            },

            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if (data.RET == 'Success') {
                    for (var i = 0; i < records.length; i++) {
                        Ext.data.StoreManager.lookup('inputStore').remove(records[i]);//把这条数据，从页面数据集中移除，现实动态更新页面
                    }
                    _select();

                } else {
                    Ext.Msg.alert('操作信息', '操作失败');
                }
            }
        });
    }
}

//增加前缀
function _prefix() {

    Ext.Ajax.request({
        url: AppUrl + 'ml/MATTYPE_UNITANDPREFIX',//pg_dj1001.mattype_unitandprefix
        type: 'ajax',
        method: 'POST',
        params: {
            'A_ITYPE': Ext.getCmp('Rkwzfl').getValue()
        },

        success: function (response, options) {
            var data = Ext.decode(response.responseText);
            Ext.getCmp('Rkwzbh').setValue(data.RET_PREFIX);
            Ext.getCmp('Rkdw').setValue(data.RET_UNIT);
        }
    });
}

//数字格式
function _summary(value, metadata) {
    metadata.style = "text-align:right";
    return Ext.util.Format.number(value, '0,000.00');// 把数字value转换成‘o,ooo.oo’格式
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
}
