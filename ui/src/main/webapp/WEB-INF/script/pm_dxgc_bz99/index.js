/**
 * @author modify by STR 2017-12-15
 * content : To restore the ui of this page for showing grid & gantt chart view in beauty .
 *              Then will collect any functions into a Object with different idiom ,by the way,
 *              some functions in its function had no change in this new version(12-15),only
 *              change some functional coding style.
 */

//初始化参数信息
var guid = '';
var v_guid = "";//选择指定行的guid
var V_PROJECT_NAME = '';
var V_PROJECT_CODE = '';
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.guid == undefined) ? guid = '' : guid = parameters.guid;
    (parameters.V_PROJECT_NAME == undefined) ? V_PROJECT_NAME = '' : V_PROJECT_NAME = parameters.V_PROJECT_NAME;
    (parameters.V_PROJECT_CODE == undefined) ? V_PROJECT_CODE = '' : V_PROJECT_CODE = parameters.V_PROJECT_CODE;
}

//初始化定义主表格及甘特图参数
var cmItems = [];
var ganttdata = [];

var vStart = '';
var vEnd = '';
var zigener = "";

var insertData = [{
    'V_BUILD_DEPT': '', 'V_BULID_PERSON': '', 'V_CONTENT': '', 'V_DATE_B': '', 'V_DATE_E': '', 'V_GUID': '',
    'V_GUID_FXJH': '', 'V_PROJECT_CODE_FXJH': '', 'V_PROJECT_NAME': '', 'V_SPECIALTY': '', 'V_PLAN_MONEY': ''
}];


//初始化时间参数
var today = new Date(Ext.Date.format(new Date(), 'Y-m-d'));
var thisYear = new Date().getFullYear();
var years = [];
for (var i = 2014; i <= thisYear + 1; i++) years.push([i, i]);
var months = [];
for (var i = 1; i <= 12; i++) months.push({displayField: i, valueField: i});
var yearmr = new Date().getFullYear();
var lastmonth = new Date().getMonth();
if (new Date().getMonth() + 1 == 1) {
    yearmr = yearmr - 1;
    lastmonth = 12;
}

var jhygs = [];//计划用工
var jhwls = [];//计划物料
var jjpbs = [];//机具配备
var gdxqs = [];//工单详情

var jhygZ = [];//计划用工(总)
var jhwlZ = [];//计划物料(总)
var jjpbZ = [];//机具配备(总)
var aqdcZ = [];//安全对策(总)

var gdxqStore = Ext.create('Ext.data.Store', {
    id: 'gdxqStore',
    pageSize: 50,
    autoLoad: false,
    fields: ['V_ORDERGUID', 'V_ORDERID', 'V_SHORT_TXT', 'V_EQUIP_NO',
        'V_EQUIP_NAME', 'V_EQUSITENAME', 'V_SPARE', 'V_ORGNAME',
        'V_DEPTNAME', 'V_PERSONNAME', 'D_ENTER_DATE',
        'V_DEPTNAMEREPARIR', 'V_ORDER_TYP_TXT', 'V_STATENAME', 'WORKORDERNUM'],

    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'str/PRO_PM_WORKORDER_BY_ORDERGUID',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list',
            total: 'total'
        }
    }
});


Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');

    //主表格树形数据源
    var treeStore = Ext.create('Ext.data.TreeStore', {
        storeId: 'treeStore',
        autoLoad: false,
        root: {
            expanded: true,
            text: "My Root"
        },
        fields: ['V_BUILD_DEPT', 'V_BULID_PERSON', 'V_CONTENT', 'V_DATE_B', 'V_DATE_E', 'V_GUID',
            'V_GUID_FXJH', 'V_PROJECT_CODE_FXJH', 'V_PROJECT_NAME', 'V_SPECIALTY', 'V_PLAN_MONEY', 'V_GUID_P'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'gantt/PRO_PM_EQUREPAIRPLAN_TREE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json'
            },
            extraParams: {
                V_V_GUID_FXJH: guid,
                V_BY1: "",
                V_BY2: "",
                V_BY3: ""
            }
        },
        listeners: {
            load: function (store, records,success,eOpts) {
                    records.childNodes.pop();
            }
        }
    });
    //主表格 树类  grid
    var treegrid = Ext.create('Ext.tree.Panel', {
        id: 'treegrid',
        store: treeStore,
        region: 'west',
        width: '30%',
        height: '100%',
        useArrows: true,
        rootVisible: false,
        multiSelect: true,
        singleExpand: true,
        rowLines: true,
        columnLines: true,
        columns: [{xtype: 'rownumberer', width: 30, sortable: false},
            {
                xtype: 'treecolumn',
                text: '工程子项',
                dataIndex: 'V_PROJECT_NAME',
                width: 180,
                height: 60,
                field: {xtype: 'textfield'},
                align: 'center'
            },
            {
                text: '工程总费用',
                dataIndex: 'V_PLAN_MONEY',
                width: 120,
                height: 60,
                field: {xtype: 'numberfield'},
                align: 'center'
            },
            {text: '工程开始时间', dataIndex: 'V_DATE_B', width: 160, height: 60, align: 'center'},
            {text: '工程结束时间', dataIndex: 'V_DATE_E', width: 160, height: 60, align: 'center'}],
        listeners: {
            'itemclick': function (a, b, c) {
                jhygs = [];
                jhwls = [];
                jjpbs = [];
                v_guid = b.data.V_GUID ;
                Ext.Ajax.request({
                    url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_YG_VIEW',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_GUID: b.data.V_GUID
                    },
                    success: function (resp) {
                        var resp = Ext.decode(resp.responseText);
                        for (var i = 0; i < resp.list.length; i++) {
                            jhygs.push({
                                gz: resp.list[i].V_GZ,
                                rs: resp.list[i].V_NUM,
                                gs: resp.list[i].V_TIME,
                                sm: resp.list[i].V_MEMO,
                                id: resp.list[i].I_ID,
                                guid: resp.list[i].V_GUID
                            });
                        }
                        Ext.data.StoreManager.lookup('jhygStore').loadData(jhygs);
                    }
                });
                Ext.Ajax.request({
                    url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_WL_VIEW',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_GUID: b.data.V_GUID
                    },
                    success: function (resp) {
                        var resp = Ext.decode(resp.responseText);
                        for (var i = 0; i < resp.list.length; i++) {
                            jhwls.push({
                                wlbm: resp.list[i].V_WL_CODE,
                                wlmc: resp.list[i].V_WL_NAME,
                                jldw: resp.list[i].V_JLDW,
                                sl: resp.list[i].V_NUM,
                                gg: resp.list[i].V_GGXH,
                                dj: resp.list[i].V_DJ,
                                id: resp.list[i].I_ID,
                                guid: resp.list[i].V_GUID
                            });
                        }
                        Ext.data.StoreManager.lookup('jhwlStore').loadData(jhwls);
                    }
                });
                Ext.Ajax.request({
                    url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_JJ_VIEW',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_GUID: b.data.V_GUID
                    },
                    success: function (resp) {
                        var resp = Ext.decode(resp.responseText);
                        for (var i = 0; i < resp.list.length; i++) {
                            jjpbs.push({
                                jjbm: resp.list[i].V_JJ_CODE,
                                jjmc: resp.list[i].V_JJ_NAME,
                                jldw: resp.list[i].V_JLDW,
                                sl: resp.list[i].V_NUM,
                                id: resp.list[i].I_ID,
                                guid: resp.list[i].V_GUID
                            });
                        }
                        Ext.data.StoreManager.lookup('jjpbStore').loadData(jjpbs);
                    }
                });
                Ext.Ajax.request({
                    url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_TREE_GET',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_GUID: b.data.V_GUID,
                        V_BY1: "",
                        V_BY2: "",
                        V_BY3: ""
                    },
                    success: function (resp) {
                        var resp = Ext.decode(resp.responseText);
                        Ext.getCmp('sgyc').setValue(resp.list[0].V_SGYC);
                        Ext.getCmp('aqdc').setValue(resp.list[0].V_AQDC);

                        Ext.getCmp('sgycSJ').setValue(resp.list[0].V_SGYC);
                        Ext.getCmp('aqdcSJ').setValue(resp.list[0].V_AQDC);

                    }
                });
                //工单详情表格刷新
                Ext.data.StoreManager.lookup('gdxqStore').load();
                pageFunction.loadJbxqTab(b.data.V_GUID);
            }
        }
    });
    //甘特图 面板定义
    var ganttpanel = Ext.create('Ext.panel.Panel', {
        id: 'ganttpanel',
        width: "70%",
        height: "100%",
        region: 'center',
        frame: true,
        layout: 'border',
        baseCls: 'my-panel-noborder',
        items: []
    });

    var jhygStore = Ext.create("Ext.data.Store", {
        id: 'jhygStore',
        fields: ['gz', 'rs', 'gs', 'sm'],
        data: jhygs,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    });

    var jhwlStore = Ext.create("Ext.data.Store", {
        id: 'jhwlStore',
        fields: ['wlbm', 'wlmc', 'jldw', 'sl', 'gg', 'dj'],
        data: jhwls,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    });

    var jjpbStore = Ext.create("Ext.data.Store", {
        id: 'jjpbStore',
        fields: ['jjbm', 'jjmc', 'jldw', 'sl'],
        data: jjpbs,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    });

    var jhygZStore = Ext.create("Ext.data.Store", {
        id: 'jhygZStore',
        fields: ['V_GZ', 'V_NUM', 'V_TIME'],
        data: jhygZ,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    });

    var jhwlZStore = Ext.create("Ext.data.Store", {
        id: 'jhwlZStore',
        fields: ['V_WL_CODE','V_WL_NAME', 'V_JLDW', 'V_GGXH', 'V_DJ', 'V_NUM'],
        data: jhwlZ,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    });

    var jjpbZStore = Ext.create("Ext.data.Store", {
        id: 'jjpbZStore',
        fields: ['V_JJ_CODE','V_JJ_NAME', 'V_JLDW', 'V_V_JLDWNUM'],
        data: jjpbZ,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    });

    var aqdcZStore = Ext.create("Ext.data.Store", {
        id: 'aqdcZStore',
        fields: ['V_SGYC', 'V_AQDC', 'V_PLAN_MONEY'],
        data: aqdcZ,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    });



    var jhyggrid = Ext.create('Ext.grid.Panel', {
        width: '100%',
        id: 'jhyggrid',
        store: jhygStore,
        height: 300,
        style: 'margin:0px 0px 5px 0px',
        autoScroll: true,
        columnLines: true,
        columns: [
            {text: '工种', width: 80, dataIndex: 'gz', align: 'center', renderer: Atleft},
            {text: '人数', width: 80, dataIndex: 'rs', align: 'center', renderer: AtRight},
            {text: '工时', width: 80, dataIndex: 'gs', align: 'center', renderer: AtRight},
            {text: '说明', width: 200, dataIndex: 'sm', align: 'center', renderer: Atleft}
        ]
    });
    var jhwlgrid = Ext.create('Ext.grid.Panel', {
        width: '100%',
        id: 'jhwlgrid',
        store: jhwlStore,
        height: 300,
        style: 'margin:0px 0px 5px 0px',
        autoScroll: true,
        columnLines: true,
        columns: [
            {text: '物料编码', width: 150, dataIndex: 'wlbm', align: 'center', renderer: Atleft},
            {text: '物料名称', width: 150, dataIndex: 'wlmc', align: 'center', renderer: Atleft},
            {text: '规格', width: 120, dataIndex: 'gg', align: 'center', renderer: Atleft},
            {text: '计量单位', width: 120, dataIndex: 'jldw', align: 'center', renderer: Atleft},
            {text: '单价', width: 100, dataIndex: 'dj', align: 'center', renderer: AtRight},
            {text: '数量', width: 100, dataIndex: 'sl', align: 'center', renderer: AtRight}
        ]
    });
    var jjpbgrid = Ext.create('Ext.grid.Panel', {
        width: '100%',
        id: 'jjpbgrid',
        store: jjpbStore,
        height: 300,
        style: 'margin:0px 0px 5px 0px',
        autoScroll: true,
        columnLines: true,
        columns: [
            {text: '机具编码', width: 120, dataIndex: 'jjbm', align: 'center', renderer: Atleft},
            {text: '机具名称', width: 120, dataIndex: 'jjmc', align: 'center', renderer: Atleft},
            {text: '计量单位', width: 80, dataIndex: 'jldw', align: 'center', renderer: Atleft},
            {text: '数量', width: 80, dataIndex: 'sl', align: 'center', renderer: AtRight}
        ]
    });
    var gdxqgrid = Ext.create('Ext.grid.Panel', {
        width: '100%',
        height:250,
        id: 'gdxqgrid',
        store: gdxqStore,
        style: 'margin:0px 0px 5px 0px',
        autoScroll: true,
        columnLines: true,
        columns: [
            {
                xtype: 'rownumberer',
                width: 30,
                sortable: false
            }, {
                text: '工单GUID(隐藏)',
                dataIndex: 'V_ORDERGUID',
                align: 'center',
                hidden: true
            }, {
                text: '工单号',
                dataIndex: 'V_ORDERID',
                width: 100,
                align: 'center'
            }, {
                text: '子工单数量',
                dataIndex: 'WORKORDERNUM',
                width: 100,
                align: 'center'
            }, {
                text: '工单描述',
                dataIndex: 'V_SHORT_TXT',
                width: 300,
                align: 'center',
                renderer: pageFunction.CreateGridColumnTd
            }, {
                text: '设备编号（隐藏）',
                dataIndex: 'V_EQUIP_NO',
                align: 'center',
                hidden: true
            }, {
                text: '设备名称',
                dataIndex: 'V_EQUIP_NAME',
                width: 130,
                align: 'center',
                renderer: pageFunction.CreateGridColumnTd
            }, {
                text: '设备位置',
                dataIndex: 'V_EQUSITENAME',
                width: 220,
                align: 'center',
                renderer: pageFunction.CreateGridColumnTd
            }, {
                text: '备件消耗',
                dataIndex: 'V_SPARE',
                width: 300,
                align: 'center',
                renderer: pageFunction.CreateGridColumnTd
            }, {
                text: '委托单位',
                dataIndex: 'V_DEPTNAME',
                width: 150,
                align: 'center',
                renderer: pageFunction.CreateGridColumnTd
            }, {
                text: '委托人',
                dataIndex: 'V_PERSONNAME',
                width: 100,
                align: 'center'
            }, {
                text: '委托时间',
                dataIndex: 'D_ENTER_DATE',
                width: 140,
                align: 'center'
            }, {
                text: '检修单位',
                dataIndex: 'V_DEPTNAMEREPARIR',
                width: 150,
                align: 'center',
                renderer: pageFunction.CreateGridColumnTd
            }, {
                text: '工单类型描述',
                dataIndex: 'V_ORDER_TYP_TXT',
                width: 100,
                align: 'center',
                renderer: pageFunction.CreateGridColumnTd
            }, {
                text: '工单状态',
                dataIndex: 'V_STATENAME',
                width: 65,
                align: 'center',
                renderer: pageFunction.CreateGridColumnTd
            },
        ]
    });

    var jhyggridz = Ext.create('Ext.grid.Panel', {
        width: '100%',
        id: 'jhyggridz',
        store: jhygZStore,
        height: 300,
        style: 'margin:0px 0px 5px 0px',
        autoScroll: true,
        columnLines: true,
        columns: [
            {text: '工种', width: 80, dataIndex: 'V_GZ', align: 'center', renderer: Atleft},
            {text: '人数', width: 80, dataIndex: 'V_NUM', align: 'center', renderer: AtRight},
            {text: '工时', width: 80, dataIndex: 'V_TIME', align: 'center', renderer: AtRight}
        ]
    });
    var jhwlgridz = Ext.create('Ext.grid.Panel', {
        width: '100%',
        id: 'jhwlgridz',
        store: jhwlZStore,
        height: 300,
        style: 'margin:0px 0px 5px 0px',
        autoScroll: true,
        columnLines: true,
        columns: [
            {text: '物料编码', width: 150, dataIndex: 'V_WL_CODE', align: 'center', renderer: Atleft},
            {text: '物料名称', width: 150, dataIndex: 'V_WL_NAME', align: 'center', renderer: Atleft},
            {text: '规格', width: 120, dataIndex: 'V_GGXH', align: 'center', renderer: Atleft},
            {text: '计量单位', width: 120, dataIndex: 'V_JLDW', align: 'center', renderer: Atleft},
            {text: '单价', width: 100, dataIndex: 'V_DJ', align: 'center', renderer: AtRight},
            {text: '数量', width: 100, dataIndex: 'V_NUM', align: 'center', renderer: AtRight}
        ]
    });
    var jjpbgridz = Ext.create('Ext.grid.Panel', {
        width: '100%',
        id: 'jjpbgridz',
        store: jjpbZStore,
        height: 300,
        style: 'margin:0px 0px 5px 0px',
        autoScroll: true,
        columnLines: true,
        columns: [
            {text: '机具编码', width: 120, dataIndex: 'V_JJ_CODE', align: 'center', renderer: Atleft},
            {text: '机具名称', width: 120, dataIndex: 'V_JJ_NAME', align: 'center', renderer: Atleft},
            {text: '计量单位', width: 80, dataIndex: 'V_JLDW', align: 'center', renderer: Atleft},
            {text: '数量', width: 80, dataIndex: 'V_V_JLDWNUM', align: 'center', renderer: AtRight}
        ]
    });

    var aqdcgridz = Ext.create('Ext.grid.Panel', {
        width: '100%',
        id: 'aqdcgridz',
        store: aqdcZStore,
        height: 300,
        style: 'margin:0px 0px 5px 0px',
        autoScroll: true,
        columnLines: true,
        columns: [
            {text: '事故预测', width: 120, dataIndex: 'V_SGYC', align: 'center', renderer: Atleft},
            {text: '安全对策', width: 120, dataIndex: 'V_AQDC', align: 'center', renderer: Atleft},
            {text: '计划投资', width: 80, dataIndex: 'V_PLAN_MONEY', align: 'center', renderer: Atleft}
        ]
    });




    var panel1 = Ext.create('Ext.panel.Panel', {
        //title:'<html><span style="font-size:20px !important;">字体大小</span></html>',//V_PROJECT_NAME,
        title:'<h1 style="font-size:22px !important;">'+V_PROJECT_NAME+'</h1>',
        titleAlign:'center',
        frame: true,
        layout: 'column',
        bodyPadding: 5,
        id: 'panel1',
        width: '100%',
        //height: 35,
        //baseCls: 'my-panel-noborder',
        defaults: {
            labelWidth: 35,
            labelAlign: 'right'
        },
        items: [
            {
                xtype: 'button',
                text: '计划详情',
                style: {margin: '0px 0px 0px 10px'},
                icon: imgpath + '/edit.png',
                handler: OnBtnJH
            },{
                xtype: 'button',
                text: '实际详情',
                style: {margin: '0px 0px 0px 10px'},
                icon: imgpath + '/edit.png',
                handler: OnBtnSJ
            },
            {
                xtype: 'button',
                text: '结算',
                style: {margin: '0px 0px 0px 10px'},
                icon: imgpath + '/edit.png',
                handler: OnBtnUpdate
            }
        ]
    });

    var panelMain = Ext.create('Ext.panel.Panel', {
        frame: true,
        layout: 'border',
        bodyPadding: 5,
        id: 'panelMain',
        width: '100%',
        height: '50%',
        baseCls: 'my-panel-noborder',
        defaults: {
            labelWidth: 35,
            labelAlign: 'right'
        },
        items: [treegrid, ganttpanel]
    });

    var gcxxgrid = Ext.create('Ext.panel.Panel', {
        layout: 'column',
        id: 'gcxxgrid',
        autoScroll: true,
        region: 'center',
        baseCls: 'my-panel-noborder',
        items: [
            {
                xtype: 'textfield',
                id: 'fxjhbm_tab',
                fieldLabel: '放行计划编码',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'fxjhmc_tab',
                fieldLabel: '放行计划名称',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'sjgcbm_tab',
                fieldLabel: '上级工程编码',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'sjgcmc_tab',
                fieldLabel: '上级工程名称',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'wyear_tab',
                fieldLabel: '年份',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'wmonth_tab',
                fieldLabel: '月份',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'wck_tab',
                fieldLabel: '厂矿',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'wzyq_tab',
                fieldLabel: '作业区',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'wgcbm_tab',
                fieldLabel: '工程项目编码',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'wgcmc_tab',
                fieldLabel: '工程项目名称',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'wys_tab',
                fieldLabel: '预算(万元)',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'wzy_tab',
                fieldLabel: '专业',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'wsbbm_tab',
                fieldLabel: '设备编码',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'wsbmc_tab',
                fieldLabel: '设备名称',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'wjsdw_tab',
                fieldLabel: '施工单位',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'wgcfzr_tab',
                fieldLabel: '工程负责人',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'wkssj_tab',
                fieldLabel: '开始时间',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'wjssj_tab',
                fieldLabel: '结束时间',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textarea',
                readOnly: true,
                id: 'wgcnr_tab',
                style: 'margin:5px 5px 5px 5px',
                fieldLabel: '工程内容',
                labelAlign: 'right',
                labelWidth: 80,
                width: 530,
                height: 80
            }

        ]
    });


    var rtabpanel = Ext.create('Ext.tab.Panel', {
        id: 'rtabpanel',
        title:'总工程详情',
        region:'center',
        width: '50%',
        autoScroll: true,
        height: window.innerHeight / 2 - 35,
        items: [

            {
                title: '计划用工',
                layout: 'vbox',
                frame: true,
                border: false,
                items: [jhyggridz]
            }, {
                title: '计划物料',
                layout: 'vbox',
                frame: true,
                border: false,
                items: [jhwlgridz]
            }, {
                title: '机具配备',
                layout: 'vbox',
                frame: true,
                border: false,
                items: [jjpbgridz]
            }, {
                title: '安全对策',
                layout: 'vbox',
                frame: true,
                border: false,
                items: [aqdcgridz]
            },
            {
                title: '工程明细',
                layout: 'vbox',
                frame: true,
                border: false,
                items: [gdxqgrid]
            }

        ]
    });

    var ltabpanel = Ext.create('Ext.tab.Panel', {
        id: 'ltabpanel',
        title:'子工程详情',
        region:'west',
        width: '50%',
        autoScroll: true,
        height: window.innerHeight / 2 - 35,
        items: [
            {
                title: '基本信息',
                layout: 'fit',
                frame: true,
                border: false,
                items: [gcxxgrid]
            },
            {
                title: '计划用工',
                layout: 'vbox',
                frame: true,
                border: false,
                items: [jhyggrid]
            }, {
                title: '计划物料',
                layout: 'vbox',
                frame: true,
                border: false,
                items: [jhwlgrid]
            }, {
                title: '机具配备',
                layout: 'vbox',
                frame: true,
                border: false,
                items: [jjpbgrid]
            }, {
                title: '安全对策',
                layout: 'vbox',
                frame: true,
                border: false,
                items: [
                    {
                        xtype: 'textarea',
                        id: 'sgyc',
                        editable: false,
                        readOnly: true,
                        style: 'margin:5px 5px 5px 5px',
                        fieldLabel: '事故预测',
                        labelAlign: 'right',
                        labelWidth: 80,
                        width: 530,
                        height: 80
                    },
                    {
                        xtype: 'textarea',
                        id: 'aqdc',
                        editable: false,
                        readOnly: true,
                        style: 'margin:5px 5px 5px 5px',
                        fieldLabel: '安全对策',
                        labelAlign: 'right',
                        labelWidth: 80,
                        width: 530,
                        height: 80
                    }
                ]
            }

        ]
    });

    var tabpanel = Ext.create('Ext.panel.Panel', {
        frame: true,
        layout: 'border',
        region:'center',
        bodyPadding: 5,
        id: 'tabpanel',
        width: '100%',
        height: window.innerHeight / 2 - 35,
        baseCls: 'my-panel-noborder',
        items: [ltabpanel, rtabpanel]
    });


    //------------------------------------实际
    var jhyggridSJ = Ext.create('Ext.grid.Panel', {
        width: '100%',
        id: 'jhyggridSJ',
        store: jhygStore,
        height: 300,
        style: 'margin:0px 0px 5px 0px',
        autoScroll: true,
        columnLines: true,
        columns: [
            {text: '工种', width: 80, dataIndex: 'gz', align: 'center', renderer: Atleft},
            {text: '人数', width: 80, dataIndex: 'rs', align: 'center', renderer: AtRight},
            {text: '工时', width: 80, dataIndex: 'gs', align: 'center', renderer: AtRight},
            {text: '说明', width: 200, dataIndex: 'sm', align: 'center', renderer: Atleft}
        ]
    });
    var jhwlgridSJ = Ext.create('Ext.grid.Panel', {
        width: '100%',
        id: 'jhwlgridSJ',
        store: jhwlStore,
        height: 300,
        style: 'margin:0px 0px 5px 0px',
        autoScroll: true,
        columnLines: true,
        columns: [
            {text: '物料编码', width: 150, dataIndex: 'wlbm', align: 'center', renderer: Atleft},
            {text: '物料名称', width: 150, dataIndex: 'wlmc', align: 'center', renderer: Atleft},
            {text: '规格', width: 120, dataIndex: 'gg', align: 'center', renderer: Atleft},
            {text: '计量单位', width: 120, dataIndex: 'jldw', align: 'center', renderer: Atleft},
            {text: '单价', width: 100, dataIndex: 'dj', align: 'center', renderer: AtRight},
            {text: '数量', width: 100, dataIndex: 'sl', align: 'center', renderer: AtRight}
        ]
    });
    var jjpbgridSJ = Ext.create('Ext.grid.Panel', {
        width: '100%',
        id: 'jjpbgridSJ',
        store: jjpbStore,
        height: 300,
        style: 'margin:0px 0px 5px 0px',
        autoScroll: true,
        columnLines: true,
        columns: [
            {text: '机具编码', width: 120, dataIndex: 'jjbm', align: 'center', renderer: Atleft},
            {text: '机具名称', width: 120, dataIndex: 'jjmc', align: 'center', renderer: Atleft},
            {text: '计量单位', width: 80, dataIndex: 'jldw', align: 'center', renderer: Atleft},
            {text: '数量', width: 80, dataIndex: 'sl', align: 'center', renderer: AtRight}
        ]
    });
    var gdxqgridSJ = Ext.create('Ext.grid.Panel', {
        width: '100%',
        height:250,
        id: 'gdxqgridSJ',
        store: gdxqStore,
        style: 'margin:0px 0px 5px 0px',
        autoScroll: true,
        columnLines: true,
        columns: [
            {
                xtype: 'rownumberer',
                width: 30,
                sortable: false
            }, {
                text: '工单GUID(隐藏)',
                dataIndex: 'V_ORDERGUID',
                align: 'center',
                hidden: true
            }, {
                text: '工单号',
                dataIndex: 'V_ORDERID',
                width: 100,
                align: 'center'
            }, {
                text: '子工单数量',
                dataIndex: 'WORKORDERNUM',
                width: 100,
                align: 'center'
            }, {
                text: '工单描述',
                dataIndex: 'V_SHORT_TXT',
                width: 300,
                align: 'center',
                renderer: pageFunction.CreateGridColumnTd
            }, {
                text: '设备编号（隐藏）',
                dataIndex: 'V_EQUIP_NO',
                align: 'center',
                hidden: true
            }, {
                text: '设备名称',
                dataIndex: 'V_EQUIP_NAME',
                width: 130,
                align: 'center',
                renderer: pageFunction.CreateGridColumnTd
            }, {
                text: '设备位置',
                dataIndex: 'V_EQUSITENAME',
                width: 220,
                align: 'center',
                renderer: pageFunction.CreateGridColumnTd
            }, {
                text: '备件消耗',
                dataIndex: 'V_SPARE',
                width: 300,
                align: 'center',
                renderer: pageFunction.CreateGridColumnTd
            }, {
                text: '委托单位',
                dataIndex: 'V_DEPTNAME',
                width: 150,
                align: 'center',
                renderer: pageFunction.CreateGridColumnTd
            }, {
                text: '委托人',
                dataIndex: 'V_PERSONNAME',
                width: 100,
                align: 'center'
            }, {
                text: '委托时间',
                dataIndex: 'D_ENTER_DATE',
                width: 140,
                align: 'center'
            }, {
                text: '检修单位',
                dataIndex: 'V_DEPTNAMEREPARIR',
                width: 150,
                align: 'center',
                renderer: pageFunction.CreateGridColumnTd
            }, {
                text: '工单类型描述',
                dataIndex: 'V_ORDER_TYP_TXT',
                width: 100,
                align: 'center',
                renderer: pageFunction.CreateGridColumnTd
            }, {
                text: '工单状态',
                dataIndex: 'V_STATENAME',
                width: 65,
                align: 'center',
                renderer: pageFunction.CreateGridColumnTd
            },
        ]
    });

    var jhyggridzSJ = Ext.create('Ext.grid.Panel', {
        width: '100%',
        id: 'jhyggridzSJ',
        store: jhygZStore,
        height: 300,
        style: 'margin:0px 0px 5px 0px',
        autoScroll: true,
        columnLines: true,
        columns: [
            {text: '工种', width: 80, dataIndex: 'V_GZ', align: 'center', renderer: Atleft},
            {text: '人数', width: 80, dataIndex: 'V_NUM', align: 'center', renderer: AtRight},
            {text: '工时', width: 80, dataIndex: 'V_TIME', align: 'center', renderer: AtRight}
        ]
    });
    var jhwlgridzSJ = Ext.create('Ext.grid.Panel', {
        width: '100%',
        id: 'jhwlgridzSJ',
        store: jhwlZStore,
        height: 300,
        style: 'margin:0px 0px 5px 0px',
        autoScroll: true,
        columnLines: true,
        columns: [
            {text: '物料编码', width: 150, dataIndex: 'V_WL_CODE', align: 'center', renderer: Atleft},
            {text: '物料名称', width: 150, dataIndex: 'V_WL_NAME', align: 'center', renderer: Atleft},
            {text: '规格', width: 120, dataIndex: 'V_GGXH', align: 'center', renderer: Atleft},
            {text: '计量单位', width: 120, dataIndex: 'V_JLDW', align: 'center', renderer: Atleft},
            {text: '单价', width: 100, dataIndex: 'V_DJ', align: 'center', renderer: AtRight},
            {text: '数量', width: 100, dataIndex: 'V_NUM', align: 'center', renderer: AtRight}
        ]
    });
    var jjpbgridzSJ = Ext.create('Ext.grid.Panel', {
        width: '100%',
        id: 'jjpbgridzSJ',
        store: jjpbZStore,
        height: 300,
        style: 'margin:0px 0px 5px 0px',
        autoScroll: true,
        columnLines: true,
        columns: [
            {text: '机具编码', width: 120, dataIndex: 'V_JJ_CODE', align: 'center', renderer: Atleft},
            {text: '机具名称', width: 120, dataIndex: 'V_JJ_NAME', align: 'center', renderer: Atleft},
            {text: '计量单位', width: 80, dataIndex: 'V_JLDW', align: 'center', renderer: Atleft},
            {text: '数量', width: 80, dataIndex: 'V_V_JLDWNUM', align: 'center', renderer: AtRight}
        ]
    });

    var aqdcgridzSJ = Ext.create('Ext.grid.Panel', {
        width: '100%',
        id: 'aqdcgridzSJ',
        store: aqdcZStore,
        height: 300,
        style: 'margin:0px 0px 5px 0px',
        autoScroll: true,
        columnLines: true,
        columns: [
            {text: '事故预测', width: 120, dataIndex: 'V_SGYC', align: 'center', renderer: Atleft},
            {text: '安全对策', width: 120, dataIndex: 'V_AQDC', align: 'center', renderer: Atleft},
            {text: '计划投资', width: 80, dataIndex: 'V_PLAN_MONEY', align: 'center', renderer: Atleft}
        ]
    });

    var gcxxgridSJ = Ext.create('Ext.panel.Panel', {
        layout: 'column',
        id: 'gcxxgridSJ',
        autoScroll: true,
        region: 'center',
        baseCls: 'my-panel-noborder',
        items: [
            {
                xtype: 'textfield',
                id: 'fxjhbm_tabSJ',
                fieldLabel: '放行计划编码',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'fxjhmc_tabSJ',
                fieldLabel: '放行计划名称',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'sjgcbm_tabSJ',
                fieldLabel: '上级工程编码',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'sjgcmc_tabSJ',
                fieldLabel: '上级工程名称',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'wyear_tabSJ',
                fieldLabel: '年份',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'wmonth_tabSJ',
                fieldLabel: '月份',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'wck_tabSJ',
                fieldLabel: '厂矿',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'wzyq_tabSJ',
                fieldLabel: '作业区',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'wgcbm_tabSJ',
                fieldLabel: '工程项目编码',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'wgcmc_tabSJ',
                fieldLabel: '工程项目名称',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'wys_tabSJ',
                fieldLabel: '预算(万元)',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'wzy_tabSJ',
                fieldLabel: '专业',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'wsbbm_tabSJ',
                fieldLabel: '设备编码',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'wsbmc_tabSJ',
                fieldLabel: '设备名称',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'wjsdw_tabSJ',
                fieldLabel: '施工单位',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'wgcfzr_tabSJ',
                fieldLabel: '工程负责人',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'wkssj_tabSJ',
                fieldLabel: '开始时间',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textfield',
                id: 'wjssj_tabSJ',
                fieldLabel: '结束时间',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                fieldStyle: 'background-color:#e0e0e0;background-image:none;',
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            },
            {
                xtype: 'textarea',
                readOnly: true,
                id: 'wgcnr_tabSJ',
                style: 'margin:5px 5px 5px 5px',
                fieldLabel: '工程内容',
                labelAlign: 'right',
                labelWidth: 80,
                width: 530,
                height: 80
            }

        ]
    });


    var rtabpanelSJ = Ext.create('Ext.tab.Panel', {
        id: 'rtabpanelSJ',
        title:'总工程详情（实际）',
        region:'center',
        width: '50%',
        autoScroll: true,
        height: window.innerHeight / 2 - 35,
        items: [

            {
                title: '实际用工',
                layout: 'vbox',
                frame: true,
                border: false,
                items: [jhyggridzSJ]
            }, {
                title: '实际物料',
                layout: 'vbox',
                frame: true,
                border: false,
                items: [jhwlgridzSJ]
            }, {
                title: '机具配备',
                layout: 'vbox',
                frame: true,
                border: false,
                items: [jjpbgridzSJ]
            }, {
                title: '安全对策',
                layout: 'vbox',
                frame: true,
                border: false,
                items: [aqdcgridzSJ]
            },
            {
                title: '工程明细',
                layout: 'vbox',
                frame: true,
                border: false,
                items: [gdxqgridSJ]
            }

        ]
    });

    var ltabpanelSJ = Ext.create('Ext.tab.Panel', {
        id: 'ltabpanelSJ',
        title:'子工程详情(实际)',
        region:'west',
        width: '50%',
        autoScroll: true,
        height: window.innerHeight / 2 - 35,
        items: [
            {
                title: '基本信息',
                layout: 'fit',
                frame: true,
                border: false,
                items: [gcxxgridSJ]
            },
            {
                title: '实际用工',
                layout: 'vbox',
                frame: true,
                border: false,
                items: [jhyggridSJ]
            }, {
                title: '实际物料',
                layout: 'vbox',
                frame: true,
                border: false,
                items: [jhwlgridSJ]
            }, {
                title: '机具配备',
                layout: 'vbox',
                frame: true,
                border: false,
                items: [jjpbgridSJ]
            }, {
                title: '安全对策',
                layout: 'vbox',
                frame: true,
                border: false,
                items: [
                    {
                        xtype: 'textarea',
                        id: 'sgycSJ',
                        editable: false,
                        readOnly: true,
                        style: 'margin:5px 5px 5px 5px',
                        fieldLabel: '事故预测',
                        labelAlign: 'right',
                        labelWidth: 80,
                        width: 530,
                        height: 80
                    },
                    {
                        xtype: 'textarea',
                        id: 'aqdcSJ',
                        editable: false,
                        readOnly: true,
                        style: 'margin:5px 5px 5px 5px',
                        fieldLabel: '安全对策',
                        labelAlign: 'right',
                        labelWidth: 80,
                        width: 530,
                        height: 80
                    }
                ]
            }

        ]
    });

    var tabpanelSJ = Ext.create('Ext.panel.Panel', {
        frame: true,
        layout: 'border',
        region:'center',
        bodyPadding: 5,
        id: 'tabpanelSJ',
        width: '100%',
        height: window.innerHeight / 2 - 35,
        baseCls: 'my-panel-noborder',
        items: [ltabpanelSJ, rtabpanelSJ]
    });

    //------------------------------------实际
    var lrwindow = Ext.create('Ext.window.Window', {
        id: 'lrwindow',
        width: 700,
        height: 600,
        layout: 'vbox',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        items: [{
            xtype: 'panel', layout: 'hbox', baseCls: 'my-panel-noborder', frame: true, items: [{
                xtype: 'textfield',
                id: 'fxjhbm',
                fieldLabel: '放行计划编码',
                readOnly: true,
                labelAlign: 'right',
                labelWidth: 80,
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            }, {
                xtype: 'textfield',
                id: 'fxjhmc',
                fieldLabel: '放行计划名称',
                labelAlign: 'right',
                readOnly: true,
                labelWidth: 80,
                width: 260,
                style: 'margin:15px 5px 5px 5px'
            }, {
                xtype: 'textfield',
                hidden: true,
                id: 'fxjhguid',
                fieldLabel: '放行计划guid',
                labelAlign: 'right',
                labelWidth: 80,
                width: 260
            }]
        }, {
            xtype: 'panel', layout: 'hbox', baseCls: 'my-panel-noborder', frame: true, items: [{
                xtype: 'textfield',
                id: 'sjgcbm',
                fieldLabel: '上级工程编码',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                width: 260,
                style: 'margin:5px 5px 5px 5px'
            }, {
                xtype: 'textfield',
                id: 'sjgcmc',
                fieldLabel: '上级工程名称',
                labelAlign: 'right',
                labelWidth: 80,
                readOnly: true,
                width: 260,
                style: 'margin:5px 5px 5px 5px'
            }, {
                xtype: 'textfield',
                hidden: true,
                id: 'sjgcguid',
                fieldLabel: '上级工程guid',
                labelAlign: 'right',
                labelWidth: 80,
                width: 260
            }]
        }, {
            xtype: 'panel', layout: 'hbox', baseCls: 'my-panel-noborder', frame: true, items: [{
                id: 'wyear',
                xtype: 'combo',
                width: 260,
                fieldLabel: '年份',
                store: years,
                style: 'margin:5px 5px 5px 5px',
                displayField: 'Item1',
                valueField: 'Item2',
                readOnly: true,
                value: thisYear,
                editable: false,
                labelAlign: 'right',
                labelWidth: 80,
                queryMode: 'local'
            },
                {
                    id: 'wmonth',
                    xtype: 'combo',
                    width: 260,
                    fieldLabel: '月份',
                    store: months,
                    readOnly: true,
                    style: 'margin:5px 5px 5px 5px',
                    labelAlign: 'right',
                    labelWidth: 80,
                    displayField: 'Item1',
                    valueField: 'Item2',
                    value: new Date().getMonth() + 1,
                    editable: false,
                    queryMode: 'local'
                }, {
                    xtype: 'textfield',
                    hidden: true,
                    id: 'guid',
                    fieldLabel: 'guid',
                    labelAlign: 'right',
                    labelWidth: 80,
                    width: 260
                }]
        }, {
            xtype: 'panel', layout: 'hbox', baseCls: 'my-panel-noborder', frame: true, items: [
                {
                    xtype: 'textfield',
                    readOnly: true,
                    fieldLabel: '厂矿',
                    style: 'margin:5px 5px 5px 5px',
                    labelWidth: 80,
                    width: 260,
                    id: 'wck',
                    editable: false,
                    labelAlign: 'right',
                    queryMode: 'local'
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    fieldLabel: '作业区',
                    style: 'margin:5px 5px 5px 5px',
                    labelWidth: 80,
                    width: 260,
                    id: 'wzyq',
                    editable: false,
                    labelAlign: 'right',
                    queryMode: 'local'
                }
            ]
        },
            {
                xtype: 'panel', layout: 'hbox', baseCls: 'my-panel-noborder', frame: true, items: [
                {
                    xtype: 'textfield',
                    readOnly: true,
                    id: 'wgcbm',
                    style: 'margin:5px 5px 5px 5px',
                    fieldLabel: '工程项目编码',
                    labelAlign: 'right',
                    labelWidth: 80,
                    width: 260
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    id: 'wgcmc',
                    style: 'margin:5px 5px 5px 5px',
                    fieldLabel: '工程项目名称',
                    labelAlign: 'right',
                    labelWidth: 80,
                    width: 260
                }
            ]
            },
            {
                xtype: 'panel', layout: 'hbox', baseCls: 'my-panel-noborder', frame: true, items: [
                {
                    xtype: 'textfield',
                    readOnly: true,
                    id: 'wys',
                    style: 'margin:5px 5px 5px 5px',
                    fieldLabel: '预算（万元）',
                    labelAlign: 'right',
                    labelWidth: 80,
                    width: 260
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    fieldLabel: '专业',
                    style: 'margin:5px 5px 5px 5px',
                    labelWidth: 80,
                    width: 260,
                    id: 'wzy',
                    editable: false,
                    labelAlign: 'right',
                    queryMode: 'local'
                }
            ]
            },
            {
                xtype: 'panel', layout: 'hbox', baseCls: 'my-panel-noborder', frame: true, items: [
                {
                    xtype: 'textfield',
                    readOnly: true,
                    id: 'wsbbm',
                    style: 'margin:5px 0px 5px 5px',
                    fieldLabel: '设备编码',
                    labelAlign: 'right',
                    labelWidth: 80,
                    width: 240
                },
                {xtype: 'button', text: '..', hidden: true, style: 'margin:5px 0px 5px 0px'/*,handler:getEQU*/},
                {
                    xtype: 'textfield',
                    readOnly: true,
                    id: 'wsbmc',
                    style: 'margin:5px 5px 5px 30px',
                    fieldLabel: '设备名称',
                    labelAlign: 'right',
                    labelWidth: 80,
                    width: 260
                }
            ]
            },
            {
                xtype: 'panel', layout: 'hbox', baseCls: 'my-panel-noborder', frame: true, items: [
                {
                    xtype: 'textfield',
                    readOnly: true,
                    id: 'wjsdw',
                    style: 'margin:5px 5px 5px 5px',
                    fieldLabel: '施工单位',
                    labelAlign: 'right',
                    labelWidth: 80,
                    width: 260
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    id: 'wgcfzr',
                    style: 'margin:5px 5px 5px 5px',
                    fieldLabel: '工程负责人',
                    labelAlign: 'right',
                    labelWidth: 80,
                    width: 260
                }
            ]
            },
            {
                xtype: 'panel', layout: 'hbox', baseCls: 'my-panel-noborder', frame: true, items: [
                {
                    xtype: 'datefield',
                    readOnly: true,
                    id: 'wkssj',
                    format: 'Y-m-d h:i:s',
                    style: 'margin:5px 5px 5px 5px',
                    fieldLabel: '开始时间',
                    value: new Date(),
                    labelAlign: 'right',
                    labelWidth: 80,
                    width: 260
                },
                {
                    xtype: 'datefield',
                    readOnly: true,
                    id: 'wjssj',
                    format: 'Y-m-d h:i:s',
                    style: 'margin:5px 5px 5px 5px',
                    fieldLabel: '结束时间',
                    value: new Date(),
                    labelAlign: 'right',
                    labelWidth: 80,
                    width: 260
                }
            ]
            },
            {
                xtype: 'panel', layout: 'hbox', baseCls: 'my-panel-noborder', frame: true, items: [
                {
                    xtype: 'textarea',
                    readOnly: true,
                    id: 'wgcnr',
                    style: 'margin:5px 5px 5px 5px',
                    fieldLabel: '工程内容',
                    labelAlign: 'right',
                    labelWidth: 80,
                    width: 530,
                    height: 80
                }
            ]
            }
        ],
        buttons: [{
            text: '关闭',
            icon: imgpath + '/cross.png',
            handler: OnBtnClose
        }]
    });
    var southpanel = Ext.create('Ext.panel.Panel', {
        frame: true,
        layout: 'border',
        bodyPadding: 5,
        id: 'southpanel',
        width: '100%',
        height: window.innerHeight / 2 - 35,
        baseCls: 'my-panel-noborder',
        items: [tabpanelSJ,tabpanel]
    });

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
            items: [panel1]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [panelMain]
        }, {
            region: 'south',
            layout: 'fit',
            border: false,
            autoScroll: true,
            items: [southpanel]
        }]
    });

    Ext.data.StoreManager.lookup('gdxqStore').on('beforeload', function (store) {
        store.proxy.extraParams.V_V_ORDERGUID = v_guid;
    });

    pageFunction.QueryGanttData();
    _init();
    Ext.getBody().unmask();

});

function _init() {
    Ext.getCmp('tabpanelSJ').hide();
    Ext.getCmp('tabpanel').show();
    /*if (true) {
        // Ext.getCmp('panelpic').setHeight(window.screen.height / 2);


        Ext.getCmp('panelpic').setTitle('工程分解-' + V_PROJECT_NAME + '(' + V_PROJECT_CODE + ')');
        Ext.data.StoreManager.lookup('ganttStore').load({
            params: {
                V_V_GUID_FXJH: guid,
                V_BY1: "",
                V_BY2: "",
                V_BY3: ""
            }
        });*/
        jhygZ = [];
        jhwlZ = [];
        jjpbZ = [];
        aqdcZ = [];
        Ext.Ajax.request({
            url: AppUrl + 'cjy/PRO_PM_EQUREPAIRPLAN_YG_VIEW_Z',
            method: 'POST',
            async: false,
            params: {
                V_V_GUID_FXJH: guid
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                for (var i = 0; i < resp.list.length; i++) {
                    jhygZ.push({
                        V_GZ: resp.list[i].V_GZ,
                        V_NUM: resp.list[i].V_NUM,
                        V_TIME: resp.list[i].V_TIME
                    });
                }
                Ext.data.StoreManager.lookup('jhygZStore').loadData(jhygZ);
            }
        });
        Ext.Ajax.request({
            url: AppUrl + 'cjy/PRO_PM_EQUREPAIRPLAN_WL_VIEW_Z',
            method: 'POST',
            async: false,
            params: {
                V_V_GUID_FXJH: guid
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                for (var i = 0; i < resp.list.length; i++) {
                    jhwlZ.push({
                        V_WL_CODE: resp.list[i].V_WL_CODE,
                        V_WL_NAME: resp.list[i].V_WL_NAME,
                        V_JLDW: resp.list[i].V_JLDW,
                        V_NUM: resp.list[i].V_NUM,
                        V_GGXH: resp.list[i].V_GGXH,
                        V_DJ: resp.list[i].V_DJ
                    });
                }
                Ext.data.StoreManager.lookup('jhwlZStore').loadData(jhwlZ);
            }
        });
        Ext.Ajax.request({
            url: AppUrl + 'cjy/PRO_PM_EQUREPAIRPLAN_JJ_VIEW_Z',
            method: 'POST',
            async: false,
            params: {
                V_V_GUID_FXJH: guid
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                for (var i = 0; i < resp.list.length; i++) {
                    jjpbZ.push({
                        V_JJ_CODE: resp.list[i].V_JJ_CODE,
                        V_JJ_NAME: resp.list[i].V_JJ_NAME,
                        V_V_JLDW: resp.list[i].V_V_JLDW,
                        V_V_JLDWNUM: resp.list[i].V_V_JLDWNUM
                    });
                }
                Ext.data.StoreManager.lookup('jjpbZStore').loadData(jjpbZ);
            }
        });

    Ext.Ajax.request({
        url: AppUrl + 'cjy/PRO_PM_EQUREPAIRPLAN_TRE_GET_Z',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID_FXJH: guid,
            V_BY1: "",
            V_BY2: "",
            V_BY3: ""
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            for (var i = 0; i < resp.list.length; i++) {
                aqdcZ.push({
                    jjbm: resp.list[i].V_JJ_CODE,
                    jjmc: resp.list[i].V_JJ_NAME,
                    jldw: resp.list[i].V_JLDW,
                    sl: resp.list[i].V_NUM,
                    id: resp.list[i].I_ID,
                    guid: resp.list[i].V_GUID
                });
            }
            Ext.data.StoreManager.lookup('aqdcZStore').loadData(aqdcZ);
        }
    });

        /*Ext.getBody().unmask();
    }*/
}

function OnBtnJH(){
    var treenode = Ext.getCmp('treegrid').getSelectionModel().getSelection();
    if (treenode.length == 0) {
        alert('请选择工程');
        return;
    }

    Ext.getCmp('tabpanelSJ').hide();
    Ext.getCmp('tabpanel').show();
}
function OnBtnSJ(){
    var treenode = Ext.getCmp('treegrid').getSelectionModel().getSelection();
    if (treenode.length == 0) {
        alert('请选择工程');
        return;
    }

    Ext.getCmp('tabpanelSJ').show();
    Ext.getCmp('tabpanel').hide();
}

function OnBtnUpdate() {

    var treenode = Ext.getCmp('treegrid').getSelectionModel().getSelection();
    if (treenode.length == 0) {
        alert('请选择工程');
        return;
    }
    Ext.Ajax.request({
        url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_TREE_GET',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID: treenode[0].data.id,
            V_BY1: "",
            V_BY2: "",
            V_BY3: ""
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if(resp.list.length==0){
                alert("无数据");
            }else{
                Ext.getCmp('fxjhbm').setValue(resp.list[0].V_PROJECT_CODE_FXJH);
                Ext.getCmp('fxjhmc').setValue(resp.list[0].V_PROJECT_NAME_FXJH);
                Ext.getCmp('fxjhguid').setValue(resp.list[0].V_GUID_FXJH);
                Ext.getCmp('sjgcbm').setValue(resp.list[0].V_PROJECT_CODE_P);
                Ext.getCmp('sjgcmc').setValue(resp.list[0].V_PROJECT_NAME_P);
                Ext.getCmp('sjgcguid').setValue(resp.list[0].V_GUID_P);
                Ext.getCmp('wyear').setValue(resp.list[0].V_YEAR);
                Ext.getCmp('wmonth').setValue(resp.list[0].V_MONTH);
                Ext.getCmp('guid').setValue(resp.list[0].V_GUID);
                Ext.getCmp('wck').setValue(resp.list[0].V_ORGNAME);
                Ext.getCmp('wzyq').setValue(resp.list[0].V_DEPTNAME);
                Ext.getCmp('wgcbm').setValue(resp.list[0].V_PROJECT_CODE);
                Ext.getCmp('wgcmc').setValue(resp.list[0].V_PROJECT_NAME);
                Ext.getCmp('wys').setValue(resp.list[0].V_PLAN_MONEY);
                Ext.getCmp('wzy').setValue(resp.list[0].V_SPECIALTY);
                Ext.getCmp('wsbbm').setValue(resp.list[0].V_EQUCODE);
                Ext.getCmp('wsbmc').setValue(resp.list[0].V_EQUNAME);
                Ext.getCmp('wjsdw').setValue(resp.list[0].V_BUILD_DEPT);
                Ext.getCmp('wgcfzr').setValue(resp.list[0].V_BULID_PERSON);
                Ext.getCmp('wkssj').setValue(new Date(resp.list[0].V_DATE_B));
                Ext.getCmp('wjssj').setValue(resp.list[0].V_DATE_E);
                Ext.getCmp('wgcnr').setValue(resp.list[0].V_CONTENT);
            }

        }
    });
    Ext.getCmp('lrwindow').show();
}

function Atleft(value, metaData) {
    metaData.style = 'text-align: left';
    return value;
}
function AtRight(value, metaData) {
    metaData.style = 'text-align: right';
    return value;
}

function OnBtnClose() {
    Ext.getCmp('lrwindow').hide();
}

function a1(id) {
    var oson = document.getElementById(id);
    with (oson) {
        oson.style.display = "block";
        oson.style.left = (window.event.clientX - 450) + 'px';
        oson.style.top = (window.event.clientY - 138) + 'px';
        oson.style.background = 'white';
    }
}
function a2(id) {
    document.getElementById(id).style.display = 'none';

}


/**
 * 用于页面动态加载渲染组件的方法及绑定事件 集合对象.
 * Create a Object that use for rendering the page with data in dynamic
 * It has many properties which edited within function entity.
 */
var pageFunction = {
    /**
     * 甘特图动态渲染
     */
    CreateGantt: function () {
        cmItems = [];
        var starttime = '';
        var endtime = '';
        for (var i = 0; i < ganttdata.length; i++) {
            if (i == 0) {
                starttime = ganttdata[0].V_DATE_B;
                endtime = ganttdata[0].V_DATE_E;
            } else {
                if (ganttdata[i].V_DATE_B < starttime) {
                    starttime = ganttdata[i].V_DATE_B;
                }
                if (ganttdata[i].V_DATE_E > endtime) {
                    endtime = ganttdata[i].V_DATE_E;
                }
            }
        }
        vStart = new Date(starttime);
        vEnd = new Date(endtime);
        var vTmpDate = new Date(vStart.getFullYear(), vStart.getMonth(), vStart.getDate());
        var dateItems = [];
        var vmonth = vTmpDate.getMonth();
        var vTmpMonth;

        while (vTmpDate < vEnd) {
            vTmpMonth = vTmpDate.getMonth();
            var vzm = '';
            if (vTmpDate.getDay() == 0 || vTmpDate.getDay() == 6) vzm = 'color:#CCCCCC';

            if (vTmpMonth == vmonth) {
                dateItems.push({text: vTmpDate.getDate().toString(), style: vzm, width: 40});
            } else {
                var vyear = vTmpDate.getFullYear();
                if (vmonth == 11) vyear -= 1;
                cmItems.push({text: vyear.toString() + '年' + (vmonth + 1).toString() + '月', columns: dateItems});
                vmonth = vTmpMonth;
                dateItems = [];
                dateItems.push({text: vTmpDate.getDate().toString(), style: vzm, width: 40});
            }
            vTmpDate = new Date((vTmpDate / 1000 + 86400) * 1000);
        }
        if (vTmpMonth == vmonth) {
            cmItems.push({
                text: vTmpDate.getFullYear().toString() + '年' + (vmonth + 1).toString() + '月',
                columns: dateItems
            });
        }

        cmItems.push({
            text: '',
            width: 0, dataIndex: 'mycolor',
            renderer: pageFunction.IndexShow
        });

        var ganttStore = Ext.create("Ext.data.Store", {
            storeId: 'ganttStore',
            fields: ['I_ID', 'V_ORGCODE', 'V_DEPTCODE', 'V_YEAR', 'V_MONTH', 'V_GUID',
                'V_PROJECT_CODE', 'V_PROJECT_NAME', 'V_PLAN_MONEY', 'V_CONTENT', 'V_DATE_DESIGN',
                'V_DATE_INVITE', 'V_DATE_B', 'V_DATE_E', 'V_BUDGET_MONEY', 'V_PROGRESS', 'V_BUILD_NAMAGER',
                'V_BULID_PERSON', 'V_DIRECT_PERSON', 'V_EQUTYPECODE', 'V_EQUCODE', 'V_EQUNAME',
                'V_SPECIALTY', 'V_BUILD_DEPT', 'V_GUID_P', 'V_PROJECT_CODE_P',
                'V_PROJECT_NAME_P', 'V_GUID_FXJH', 'V_PROJECT_CODE_FXJH', 'V_PROJECT_NAME_FXJH',
                'D_DATE_INPUT', 'V_PERCODE_INPUT', 'V_PERNAME_INPUT'],
            data: ganttdata,
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            }
        });

        var ganttgrid = Ext.create('Ext.grid.Panel', {
            id: 'ganttgrid',
            store: ganttStore,
            region: 'center',
            columnLines: true,
            columns: cmItems,
            renderTo: Ext.getBody()
        });
        Ext.getCmp('ganttpanel').add(ganttgrid);
    },

    QueryGanttData: function () {
        ganttdata = [];
        Ext.Ajax.request({
            url: AppUrl + 'gantt/PRO_PM_EQUREPAIRPLAN_TREE_GANTT',
            method: 'POST',
            async: false,
            params: {
                V_V_GUID_FXJH: guid,
                V_BY1: "",
                V_BY2: "",
                V_BY3: ""
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                ganttdata = resp.list;
                pageFunction.CreateGantt();
            }
        });
    },


    IndexShow: function (value, metaData, record) {
        var startd = new Date(record.data.V_DATE_B);
        var endd = new Date(record.data.V_DATE_E);
        if (startd < vStart) {
            startd = new Date(vStart);
        }
        if (startd > vEnd) {
            startd = new Date(vEnd);
        }
        if (endd < vStart) {
            endd = new Date(vStart);
        }
        if (endd > vEnd) {
            endd = new Date(vEnd);
        }
        if (endd < startd) {
            endd = new Date(startd);
        }
        if (endd <= today) {

            var dif = startd.getTime() - vStart.getTime();
            var vleft = (dif / (86400 * 1000)) * 40;
            dif = endd.getTime() - startd.getTime();
            var vwidth = (dif / (86400 * 1000)) * 40;
            var gtt = '<div style="left:' + vleft.toString() + 'px;height:21px;width:' + vwidth.toString() + 'px;background-color:A6FFA6;" class="sch-event" onmouseover="a1(\'' + record.data.V_GUID + '\')" onmouseout="a2(\'' + record.data.V_GUID + '\')"><div class="sch-event-inner" >' + record.data.V_PROJECT_NAME + '</div></div><div class="lxm"  id="' + record.data.V_GUID + '" style="display:none; position:absolute; z-index:9999; border:1px solid #666;">开始时间：' + record.data.V_DATE_B + '<br>' +
                '结束时间：' + record.data.V_DATE_E + '<br>';
            var cont = record.data.V_CONTENT.split(',');
            var contt = '内容：';
            for (var i = 0; i < cont.length; i++) {
                if (i == 0) {
                    contt = contt + cont[i] + '<br>';
                } else {
                    contt = contt + cont[i] + '<br>';
                }
            }
            gtt = gtt + contt + '</div>';
            return gtt;
        }
        if (today <= startd) {

            var dif = startd.getTime() - vStart.getTime();
            var vleft = (dif / (86400 * 1000)) * 40;
            dif = endd.getTime() - startd.getTime();
            var vwidth = (dif / (86400 * 1000)) * 40;
            var gtt = '<div style="left:' + vleft.toString() + 'px;height:21px;width:' + vwidth.toString() + 'px;background-color: #CC3333;" class="sch-event" onmouseover="a1(\'' + record.data.V_GUID + '\')" onmouseout="a2(\'' + record.data.V_GUID + '\')"><div  class="sch-event-inner">' + record.data.V_PROJECT_NAME + '</div></div><div class="lxm"  id="' + record.data.V_GUID + '" style="display:none; position:absolute; z-index:9999; border:1px solid #666;">开始时间：' + record.data.V_DATE_B + '<br>' +
                '结束时间：' + record.data.V_DATE_E + '<br>';
            var cont = record.data.V_CONTENT.split(',');
            var contt = '内容：';
            for (var i = 0; i < cont.length; i++) {
                if (i == 0) {
                    contt = contt + cont[i] + '<br>';
                } else {
                    contt = contt + cont[i] + '<br>';
                }
            }
            gtt = gtt + contt + '</div>';
            return gtt;
        }

        if (startd < today && today < endd) {
            var nowtime2 = Ext.Date.format(new Date(), 'Y-m-d 00:00:00')
            var dif = startd.getTime() - vStart.getTime();
            var vleft = (dif / (86400 * 1000)) * 40;
            dif = today.getTime() - startd.getTime();
            var vwidth1 = (dif / (86400 * 1000)) * 40;
            dif = endd.getTime() - today.getTime();
            var vwidth2 = (dif / (86400 * 1000)) * 40;
            dif = endd.getTime() - startd.getTime();
            var vwidth = (dif / (86400 * 1000)) * 40;

            var bfb = Math.round(((vwidth1 / vwidth) * 100), 0);
            var gtt = '<div style="left:' + vleft.toString() + 'px;height:21px;width:' + vwidth.toString() + 'px;" class = "sch-event" onmouseover="a1(\'' + record.data.V_GUID + '\')" onmouseout="a2(\'' + record.data.V_GUID + '\')"><div style="width:' + vwidth1.toString() + 'px;border:0px;height:21px;margin:0px;background-color:#99CC66;" class = "sch-event">' + ' 完成度' + bfb + '%</div><div class="sch-event-inner" style="float:right;width:' + vwidth2.toString() + 'px;height:21px;border:0px;margin:0px;background-color: #CC3333;">' + record.data.V_PROJECT_NAME + '</div></div><div class="lxm"  id="' + record.data.V_GUID + '" style="display:none; position:absolute; z-index:9999; border:1px solid #666;">开始时间：' + record.data.V_DATE_B + '<br>' +
                '结束时间：' + record.data.V_DATE_E + '<br>';
            var cont = record.data.V_CONTENT.split(',');
            var contt = '内容：';
            for (var i = 0; i < cont.length; i++) {
                if (i == 0) {
                    contt = contt + cont[i] + '<br>';
                } else {
                    contt = contt + cont[i] + '<br>';
                }
            }
            gtt = gtt + contt + '</div>';
            return gtt;
        }
    },

    /** 基本信息
     * 点击win grid 中指定行，底部 渲染 工单详情 数据tab
     * @param guid
     */
    loadJbxqTab: function (guid) {
        Ext.Ajax.request({
            url: AppUrl + 'lxm/PRO_PM_EQUREPAIRPLAN_TREE_GET',
            method: 'POST',
            async: false,
            params: {
                V_V_GUID: guid,
                V_BY1: "",
                V_BY2: "",
                V_BY3: ""
            },
            success: function (resp) {
                var resp = Ext.decode(resp.responseText);
                Ext.getCmp('fxjhbm_tab').setValue(resp.list[0].V_PROJECT_CODE_FXJH);
                Ext.getCmp('fxjhmc_tab').setValue(resp.list[0].V_PROJECT_NAME_FXJH);
                Ext.getCmp('sjgcbm_tab').setValue(resp.list[0].V_PROJECT_CODE_P);
                Ext.getCmp('sjgcmc_tab').setValue(resp.list[0].V_PROJECT_NAME_P);
                Ext.getCmp('wyear_tab').setValue(resp.list[0].V_YEAR);
                Ext.getCmp('wmonth_tab').setValue(resp.list[0].V_MONTH);
                Ext.getCmp('wck_tab').setValue(resp.list[0].V_ORGCODE);
                Ext.getCmp('wzyq_tab').setValue(resp.list[0].V_DEPTCODE);
                Ext.getCmp('wgcbm_tab').setValue(resp.list[0].V_PROJECT_CODE);
                Ext.getCmp('wgcmc_tab').setValue(resp.list[0].V_PROJECT_NAME);
                Ext.getCmp('wys_tab').setValue(resp.list[0].V_PLAN_MONEY);
                Ext.getCmp('wzy_tab').setValue(resp.list[0].V_SPECIALTY);
                Ext.getCmp('wsbbm_tab').setValue(resp.list[0].V_EQUCODE);
                Ext.getCmp('wsbmc_tab').setValue(resp.list[0].V_EQUNAME);
                Ext.getCmp('wjsdw_tab').setValue(resp.list[0].V_BUILD_DEPT);
                Ext.getCmp('wgcfzr_tab').setValue(resp.list[0].V_BULID_PERSON);
                Ext.getCmp('wkssj_tab').setValue(resp.list[0].V_DATE_B);
                Ext.getCmp('wjssj_tab').setValue(resp.list[0].V_DATE_E);
                Ext.getCmp('wgcnr_tab').setValue(resp.list[0].V_CONTENT);


                Ext.getCmp('fxjhbm_tabSJ').setValue(resp.list[0].V_PROJECT_CODE_FXJH);
                Ext.getCmp('fxjhmc_tabSJ').setValue(resp.list[0].V_PROJECT_NAME_FXJH);
                Ext.getCmp('sjgcbm_tabSJ').setValue(resp.list[0].V_PROJECT_CODE_P);
                Ext.getCmp('sjgcmc_tabSJ').setValue(resp.list[0].V_PROJECT_NAME_P);
                Ext.getCmp('wyear_tabSJ').setValue(resp.list[0].V_YEAR);
                Ext.getCmp('wmonth_tabSJ').setValue(resp.list[0].V_MONTH);
                Ext.getCmp('wck_tabSJ').setValue(resp.list[0].V_ORGCODE);
                Ext.getCmp('wzyq_tabSJ').setValue(resp.list[0].V_DEPTCODE);
                Ext.getCmp('wgcbm_tabSJ').setValue(resp.list[0].V_PROJECT_CODE);
                Ext.getCmp('wgcmc_tabSJ').setValue(resp.list[0].V_PROJECT_NAME);
                Ext.getCmp('wys_tabSJ').setValue(resp.list[0].V_PLAN_MONEY);
                Ext.getCmp('wzy_tabSJ').setValue(resp.list[0].V_SPECIALTY);
                Ext.getCmp('wsbbm_tabSJ').setValue(resp.list[0].V_EQUCODE);
                Ext.getCmp('wsbmc_tabSJ').setValue(resp.list[0].V_EQUNAME);
                Ext.getCmp('wjsdw_tabSJ').setValue(resp.list[0].V_BUILD_DEPT);
                Ext.getCmp('wgcfzr_tabSJ').setValue(resp.list[0].V_BULID_PERSON);
                Ext.getCmp('wkssj_tabSJ').setValue(resp.list[0].V_DATE_B);
                Ext.getCmp('wjssj_tabSJ').setValue(resp.list[0].V_DATE_E);
                Ext.getCmp('wgcnr_tabSJ').setValue(resp.list[0].V_CONTENT);
            }
        });
    },

    //工单详情表格  样式调整
    CreateGridColumnTd: function (value, metaData, record, rowIndex, colIndex, store) {
        metaData.style = "text-align:left;";
        var val = value == null ? '' : value;
        return '<div data-qtip="' + val + '" >' + val + '</div>';
    }
};