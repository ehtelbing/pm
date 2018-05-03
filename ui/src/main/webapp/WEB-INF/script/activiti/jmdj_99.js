var EQU_CODE;//选中树就提取设备编码
var V_NEXT_SETP = '';
var V_V_SPECIALTY = '';
var V_STEPCODE = '';
var V_V_ORGCODE = '';
var V_V_DEPTCODE = '';
var V_ORDERGUID = '';
var taskId='';
var ProcessInstanceId = '';//解析URL参数
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_ORDERGUID == undefined) ? V_ORDERGUID = '' : V_ORDERGUID = parameters.V_ORDERGUID;
    (parameters.ProcessInstanceId == undefined) ? ProcessInstanceId = "" : ProcessInstanceId = parameters.ProcessInstanceId;

}

Ext.onReady(function () {
    //panel用到的store，写后台的时候再加每个panel用到的对应正确store
    var gridStore = Ext.create('Ext.data.Store', {
        storeId: 'gridStore',
        autoLoad: false,
        pageSize: 2,
        fields: ['data_'],
        data: [[' '], [' '], [' '], [' '], [' ']],//添加五行空白数据
        proxy: {
            url: 'selectZZ.do',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'ZZlist',
                totalProperty: 'total'
            }
        }
    });

    var nextSprStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'nextSprStore',
        fields: ['V_PERSONCODE', 'V_PERSONNAME', 'V_V_NEXT_SETP', 'V_V_FLOW_STEPNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PM_ACTIVITI_PROCESS_PER_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                V_V_ORGCODE:  Ext.util.Cookies.get('v_orgCode'),
                V_V_DEPTCODE: Ext.util.Cookies.get('v_deptcode'),
                V_V_REPAIRCODE: Ext.util.Cookies.get('v_deptcode'),
                V_V_FLOWTYPE: 'JmDJ',
                V_V_FLOW_STEP: $.url().param("TaskDefinitionKey"),
                V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_SPECIALTY: V_V_SPECIALTY,
                V_V_WHERE: '通过'
            }
        },
        listeners: {
            load: function (store, records, success, eOpts) {
                processKey = store.getProxy().getReader().rawData.RET;
                V_STEPNAME = store.getAt(0).data.V_V_FLOW_STEPNAME;
                V_NEXT_SETP = store.getAt(0).data.V_V_NEXT_SETP;

                Ext.getCmp('nextPer').select(store.first());

            }

        }
    });

    //查询模板的数据集
    var hqmbStore = Ext.create('Ext.data.Store', {
        storeId: 'hqmbStore',
        autoLoad: false,
        fields: ['V_GUID', 'BUSINESSKEY', 'V_EQU_NAME', 'V_GNWZ', 'V_JCFS', 'V_JCZQ', 'V_ZD', 'V_DJ', 'V_TS',
            'V_DL', 'V_RX', 'V_CSWZSL', 'V_CSDSL', 'V_EQU_CODE'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'zs/PM_06_JMDJ_BY_EQUCODE_SEL',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    //获取录入的精密点检的数据集
    var lrjmdjStore = Ext.create('Ext.data.Store', {
        storeId: 'lrjmdjStore',
        autoLoad: false,
        fields: ['V_GUID', 'BUSINESSKEY', 'V_EQU_NAME', 'V_GNWZ', 'V_JCFS', 'V_JCZQ', 'V_ZD', 'V_DJ', 'V_TS',
            'V_DL', 'V_RX', 'V_CSWZSL', 'V_CSDSL', 'V_EQU_CODE'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'zs/PM_06_JMDJ_BY_KEY_ANDCODE_SEL',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    //厂矿精密点检的数据集
    var jmdjStore = Ext.create('Ext.data.Store', {
        storeId: 'jmdjStore',
        autoLoad: false,
        fields: ['V_GUID', 'BUSINESSKEY', 'V_EQU_NAME', 'V_GNWZ', 'V_JCFS', 'V_JCZQ', 'V_ZD', 'V_DJ', 'V_TS',
            'V_DL', 'V_RX', 'V_CSWZSL', 'V_CSDSL', 'V_EQU_CODE'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'zs/PM_06_JMDJ_BY_BUSINESSKEY_SEL',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    //作业区
    var zyqStore = Ext.create('Ext.data.Store', {
        id: 'zyqStore',
        autoLoad: false,
        fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        },
        listeners: {//给子集下拉框赋值
            load: function (store, records) {
                Ext.getCmp('zyq').select(zyqStore.getAt(0));
            }
        }
    });
    //页面西侧的菜单树
    var treeStore = Ext.create('Ext.data.TreeStore', {
        id: 'treeStore',
        autoLoad: false,
        fields: ['sid', 'text', 'parentid', 'V_EQUSITE']
    });
    //关联设备表格
    var sbbgStore = Ext.create('Ext.data.Store', {
        storeId: 'sbbgStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_LINK_TIME', 'V_LINK_PERSON'],
        proxy: {
            url: AppUrl + 'CarManage/BASE_EXAMINE_CAR_BYCODE_SEL',
            type: 'ajax',

            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });
    //页面上的保存，接收，获取模板，关闭的按钮
    var buttonPanel = Ext.create('Ext.Panel', {
        id: 'buttonPanel',
        title: '<div align="center">厂矿精密点检主管接收</div>',
        frame: true,
        border: false,
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:5px 0px 5px 10px'},
        items: [
            {
                xtype: 'combo',
                id: 'nextPer',
                labelAlign: 'right',
                fieldLabel: '下一步接收人',
                editable: false,
                margin: '5 0 5 5',
                labelWidth: 80,
                value: '',
                displayField: 'V_PERSONNAME',
                valueField: 'V_PERSONCODE',
                store: nextSprStore,
                queryMode: 'local'
            },
            {id: 'spyj', xtype: 'textfield', fieldLabel: '审批意见', labelWidth: 60, style: ' margin: 5px 0px 0px 5px', labelAlign: 'right'},
            {xtype: 'button', text: '同意', style: ' margin: 5px 0px 0px 5px', icon: imgpath + '/saved.png', handler: _agree},
            {xtype: 'button', text: '驳回', style: ' margin: 5px 0px 0px 5px', icon: imgpath + '/cross.png', handler: _reject}
            //{xtype: 'button', text: '获取模板', icon: imgpath + '/edit.png', width: 80, handler: _getTemplate}
        ]
    });


    //获取模板的表格
    var hqmbPanel = Ext.create('Ext.grid.Panel', {
        id: 'hqmbPanel',
        store: hqmbStore,
        columnLines: true,
        frame: true,
        autoScroll: true,
        layout: 'fit',
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [{xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '设备名称', dataIndex: 'V_EQU_NAME', width: 80},
            {text: '功能位置', dataIndex: 'V_GNWZ', width: 80},
            {text: '检测方式', dataIndex: 'V_JCFS', width: 80},
            {text: '检测周期', dataIndex: 'V_JCZQ', width: 80},
            {
                text: '检测内容', dataIndex: '', width: 400,
                columns: [
                    {
                        text: '振动', dataIndex: 'V_ZD', width: 80,
                        renderer: function isflage(value, metaData, record, rowIdx, colIdx, store, view) {
                            if (record.data.V_ZD == 1) {
                                return "<input type='checkbox'  checked='checked' />";
                            } else {
                                return "<input type='checkbox'  />";
                            }
                        }
                    }, {
                        text: '电机', dataIndex: 'V_DJ', width: 80,
                        renderer: function isflage(value, metaData, record, rowIdx, colIdx, store, view) {
                            if (record.data.V_DJ == 1) {
                                return "<input type='checkbox'  checked='checked' />";
                            } else {
                                return "<input type='checkbox'/>";
                            }
                        }
                    }, {
                        text: '探伤', dataIndex: 'V_TS', width: 80,
                        renderer: function isflage(value, metaData, record, rowIdx, colIdx, store, view) {
                            if (record.data.V_TS == 1) {
                                return "<input type='checkbox'  checked='checked' />";
                            } else {
                                return "<input type='checkbox'  />";
                            }
                        }
                    }, {
                        text: '电缆', dataIndex: 'V_DL', width: 80,
                        renderer: function isflage(value, metaData, record, rowIdx, colIdx, store, view) {
                            if (record.data.V_DL == 1) {
                                return "<input type='checkbox'  checked='checked' />";
                            } else {
                                return "<input type='checkbox'  />";
                            }
                        }
                    }, {
                        text: '热像', dataIndex: 'V_RX', width: 80,
                        renderer: function isflage(value, metaData, record, rowIdx, colIdx, store, view) {
                            if (record.data.V_RX == 1) {
                                return "<input type='checkbox'  checked='checked' />";
                            } else {
                                return "<input type='checkbox'  />";
                            }
                        }
                    }]
            }, {text: '测试位置数量', dataIndex: 'V_CSWZSL', width: 120},
            {text: '测试点数量', dataIndex: 'V_CSDSL', width: 120}]
    });

    //获取模板的弹窗
  /*  var _hqmbWindow = Ext.create('Ext.window.Window', {
        id: '_hqmbWindow',
        width: 830,
        height: 500,
        layout: 'border',
        title: '获取模板',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 160, style: 'margin:10px 0px 0px 0px'},
        items: [{region: 'center', layout: 'fit', items: [hqmbPanel]}],
        buttons: [{
            xtype: 'button',
            text: '确认',
            width: 40,
            handler: function () {
                _Affirm();//确认的方法
            }
        }, {
            xtype: 'button', text: '取消', width: 40, handler: function () {
                Ext.getCmp('_hqmbWindow').hide();
            }
        }]
    });*/

    var Panel = Ext.create('Ext.form.Panel', {
        id: 'Panel',
        frame: true,
        border: false,
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 45, inputWidth: 140, style: 'margin:5px 0px 5px 10px'},
        items: [
            {
                xtype: 'combo',
                id: 'zyq',
                store: zyqStore,//作业区数据集
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                //emptyText: '全部',
                forceSelection: true,
                fieldLabel: '作业区',
                listeners: {
                    change: function (combo, records) {
                        _queryTree();
                    }
                }
            }
        ]
    });
    //左上设备类型树
    var sblxTree = Ext.create('Ext.tree.Panel', {
        id: 'sblxTree',
        width: '20%',
        rootVisible: false,
        hideHeaders: true,
        rowLines: false,
        columnLines: false,
        frame: true,
        autoScroll: true,
        store: 'treeStore',
        listeners: {
            itemclick: TreeChecked
        }
    });

    var gridPanel5 = Ext.create('Ext.panel.Panel', {
        id: 'gridPanel5',
        layout: 'border',
        frame: true,
        baseCls: 'my-panel-no-border',
        border: false,
        items: [{region: 'north', items: [Panel]}, {region: 'center', layout: 'fit', items: [sblxTree]}]
    });
    //设备明细表
    var formPanel = Ext.create('Ext.form.Panel', {
        id: 'formPanel',
        title: '<div align="center">设备明细</div>',
        layout: 'column',
        frame: true,
        autoScroll: true,
        defaults: {
            labelAlign: 'right',//文本文字右对齐
            style: 'text-align: center;',
            labelWidth: 100,//文本文字的宽度
            inputWidth: 160,//输入框的宽度
            margin: '8,0,0,0'
        },
        items: [
            {xtype: 'textfield', id: 'rsbbm', fieldLabel: '设备编号'},
            {xtype: 'textfield', id: 'rsbmc', fieldLabel: '设备名称'},
            {xtype: 'textfield', id: "rsblxbm", fieldLabel: '设备类型编号'},
            {xtype: 'textfield', id: 'rsblxwz', fieldLabel: '设备类型位置'},
            {xtype: 'textfield', id: 'rwzbm', fieldLabel: '位置编码'},
            {xtype: 'textfield', id: 'rwzmc', fieldLabel: '位置名称'},
            {xtype: 'textfield', id: 'rsblx', fieldLabel: '设备类型'},
            {xtype: 'textfield', id: 'rsbzl', fieldLabel: '设备种类'},
            {xtype: 'textfield', id: 'rbs', fieldLabel: 'ABC标识'},
            {xtype: 'textfield', id: 'rksrq', fieldLabel: '开始日期'},
            {xtype: 'textfield', id: 'rjsrq', fieldLabel: '结束日期'},
            {xtype: 'textfield', id: 'rcbzx', fieldLabel: '成本中心'},
            {xtype: 'textfield', id: 'rggxh', fieldLabel: '规格型号'},
            {xtype: 'textfield', id: 'rdxcc', fieldLabel: '尺寸/大小'},
            {xtype: 'textfield', id: 'rzczzs', fieldLabel: '资产制造商'},
            {xtype: 'textfield', id: 'rgzjz', fieldLabel: '购置价格'},
            {xtype: 'textfield', id: 'rdxzl', fieldLabel: '对象重量'}]
    });
    //已录入信息表
    var gridPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel1',
        title: '已录入信息',
        store: jmdjStore,
        frame: true,
        autoScroll: true,
        layout: 'fit',
        rowLines: true,
        columnLines: true,
        columns: [{xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '设备名称', dataIndex: 'V_EQU_NAME', flex: 1},
            {text: '功能位置', dataIndex: 'V_GNWZ', flex: 1},
            {text: '检测方式', dataIndex: 'V_JCFS', flex: 1},
            {text: '检测周期', dataIndex: 'V_JCZQ', flex: 1},
            {
                text: '检测内容', dataIndex: '', flex: 5,
                columns: [
                    {
                        text: '振动', dataIndex: 'V_ZD', width: 80,
                        renderer: function isflage(value, metaData, record, rowIdx, colIdx, store, view) {
                            if (record.data.V_ZD == 1) {
                                return "<input type='checkbox'  checked='checked' />";
                            } else {
                                return "<input type='checkbox'  />";
                            }
                        }
                    }, {
                        text: '电机', dataIndex: 'V_DJ', width: 80,
                        renderer: function isflage(value, metaData, record, rowIdx, colIdx, store, view) {
                            if (record.data.V_DJ == 1) {
                                return "<input type='checkbox'  checked='checked' />";
                            } else {
                                return "<input type='checkbox'/>";
                            }
                        }
                    }, {
                        text: '探伤', dataIndex: 'V_TS', width: 80,
                        renderer: function isflage(value, metaData, record, rowIdx, colIdx, store, view) {
                            if (record.data.V_TS == 1) {
                                return "<input type='checkbox'  checked='checked' />";
                            } else {
                                return "<input type='checkbox'  />";
                            }
                        }
                    }, {
                        text: '电缆', dataIndex: 'V_DL', width: 80,
                        renderer: function isflage(value, metaData, record, rowIdx, colIdx, store, view) {
                            if (record.data.V_DL == 1) {
                                return "<input type='checkbox'  checked='checked' />";
                            } else {
                                return "<input type='checkbox'  />";
                            }
                        }
                    }, {
                        text: '热像', dataIndex: 'V_RX', width: 80,
                        renderer: function isflage(value, metaData, record, rowIdx, colIdx, store, view) {
                            if (record.data.V_RX == 1) {
                                return "<input type='checkbox'  checked='checked' />";
                            } else {
                                return "<input type='checkbox'/>";
                            }
                        }
                    }]
            },
            {text: '测试位置数量', dataIndex: 'V_CSWZSL', flex: 1},
            {text: '测试点数量', dataIndex: 'V_CSDSL', flex: 1},
            {
                text: '编辑', dataIndex: 'data_', flex: 1, columns: [
                {
                    text: '删除', dataIndex: 'data_', flex: 1,
                    renderer: function (v) {
                    return "<span style='margin-right:10px'><a href='#' onclick='_deleteJmdj()'>删除</a></span>"}
                }]
            }],
        bbar: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'jmdjStore'
        }]
    });

    //保存的按钮
  /*  var buttonPanel2 = Ext.create('Ext.Panel', {
        id: 'buttonPanel2',
        title: '录入信息',
        frame: true,
        layout: 'column',
        items: [{
            xtype: 'button',
            text: '新增',
            icon: imgpath + '/add.png',
            style: 'margin:5px 0px 5px 10px',
            handler: _insertKsj
        }]
    });*/
    //录入的信息表
   /* var gridPanel2 = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel2',
        store: lrjmdjStore,
        frame: true,
        autoScroll: true,
        rowLines: true,
        columnLines: true,
     *//*   plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1,//单元格编辑
            listeners: {
                edit: pageFunction.editorJmdj
            }
        })],*//*
        columns: [{xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '设备名称', dataIndex: 'V_EQU_NAME', flex: 1},
            {text: '功能位置', dataIndex: 'V_GNWZ', flex: 1},
            {text: '检测方式', dataIndex: 'V_JCFS', flex: 1},
            {text: '检测周期', dataIndex: 'V_JCZQ', flex: 1},
            {
                text: '检测内容', dataIndex: '', flex: 5,
                columns: [
                    {
                        text: '振动', dataIndex: 'V_ZD', id: 'V_ZD', flex: 1,
                        renderer: function isflage(value, metaData, record, rowIdx, colIdx, store, view) {
                            if (record.data.V_ZD == 1) {
                                return "<input type='checkbox'  checked='checked' />";
                            } else {
                                return "<input type='checkbox'  />";
                            }
                        }
                    },
                    {
                        text: '电机', dataIndex: 'V_DJ', id: 'V_DJ', flex: 1,
                        renderer: function isflage(value, metaData, record, rowIdx, colIdx, store, view) {
                            if (record.data.V_DJ == 1) {
                                return "<input type='checkbox'  checked='checked' />";
                            } else {
                                return "<input type='checkbox'  />";
                            }
                        }
                    },
                    {
                        text: '探伤', dataIndex: 'V_TS', id: 'V_TS', flex: 1,
                        renderer: function isflage(value, metaData, record, rowIdx, colIdx, store, view) {
                            if (record.data.V_TS == 1) {
                                return "<input type='checkbox'  checked='checked' />";
                            } else {
                                return "<input type='checkbox'  />";
                            }
                        }
                    },
                    {
                        text: '电缆', dataIndex: 'V_DL', id: 'V_DL', flex: 1,
                        renderer: function isflage(value, metaData, record, rowIdx, colIdx, store, view) {
                            if (record.data.V_DL == 1) {
                                return "<input type='checkbox'  checked='checked' />";
                            } else {
                                return "<input type='checkbox'  />";
                            }
                        }
                    },
                    {
                        text: '热像', dataIndex: 'V_RX', id: 'V_RX', flex: 1,
                        renderer: function isflage(value, metaData, record, rowIdx, colIdx, store, view) {
                            if (record.data.V_RX == 1) {
                                return "<input type='checkbox'  checked='checked' />";
                            } else {
                                return "<input type='checkbox'  />";
                            }
                        }
                    }]
            },
            {text: '测试位置数量', dataIndex: 'V_CSWZSL', flex: 1},
            {text: '测试点数量', dataIndex: 'V_CSDSL', flex: 1}],
        bbar: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'lrjmdjStore'
        }]
    });*/

/*    var gridPanel3 = Ext.create('Ext.panel.Panel', {
        id: 'gridPanel3',
        layout: 'border',
        frame: true,
        baseCls: 'my-panel-no-border',
        border: false,
        items: [{region: 'north', items: [buttonPanel2]}, {region: 'center', layout: 'fit', items: [gridPanel2]}]
    });*/

    var gridPanel4 = Ext.create('Ext.panel.Panel', {
        id: 'gridPanel4',
        layout: 'border',
        frame: true,
        baseCls: 'my-panel-no-border',
        border: false,
        items: [{region: 'north', height: '100%', layout: 'fit', items: [gridPanel1]}, {
            /*region: 'center',
            height: '40%',
            layout: 'fit',
            items: [gridPanel3]*/
        }]
    });

    Ext.create('Ext.container.Viewport', {
        layout: {
            type: 'border',
            regionWeights: {
                north: 4,
                east: 2,
                south: 1,
                west: 3
            }
        },
        defaults: {
            border: false
        },
        items: [
            {region: 'north', items: [buttonPanel]},
            {region: 'west', width: '15%', layout: 'fit', items: [gridPanel5]},
            {region: 'east', width: '65%', layout: 'fit', items: [gridPanel4]},
            {region: 'center', layout: 'fit', items: [formPanel]}]
    });

    Ext.getCmp("sblxTree").on("beforeload", function (store, operation) {
        if (operation.node.data.parentid == -1) {
            Ext.apply(store.proxy.extraParams, {
                    V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                    V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                    V_V_DEPTNEXTCODE: '%',
                    V_V_EQUTYPECODE: operation.node.data.sid,
                    V_V_EQUCODE: '%'
                },
                store.proxy.url = AppUrl + 'CarManage/PRO_SAP_PM_EQU_TREE')
        } else if (operation.node.data.parentid == -2) {
            Ext.apply(store.proxy.extraParams, {
                    V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                    V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                    V_V_DEPTNEXTCODE: '%',
                    V_V_EQUTYPECODE: '%',
                    V_V_EQUCODE: operation.node.data.sid
                },
                store.proxy.url = AppUrl + 'CarManage/PRO_SAP_PM_CHILDEQU_TREE')
        }
    });
    _selectDept();
    _selectJmdj();
    _selectTaskId();


});

function _selectTaskId() {
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/GetTaskIdFromBusinessId',
        type: 'ajax',
        method: 'POST',
        params: {
            businessKey: V_ORDERGUID,
            userCode: Ext.util.Cookies.get('v_personcode')

        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);//后台返回的值
            taskId = data.taskId;
            V_STEPCODE = data.TaskDefinitionKey;

        },
        failure: function (response) {
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    })
}

//同意的函数
function _agree() {
    var spyj = '';
    if (Ext.getCmp('spyj').getValue() == '' || Ext.getCmp('spyj').getValue() == null) {
        spyj = '审批通过';
    } else {
        spyj = Ext.getCmp('spyj').getValue();
    }
    var records = Ext.getCmp('gridPanel1').getSelectionModel().getSelection();//获取选中的数据
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/TaskComplete',
        type: 'ajax',
        method: 'POST',
        params: {
            taskId: taskId,
            idea: '通过',
            parName: [V_NEXT_SETP, "flow_yj"],
            parVal: [Ext.getCmp('nextPer').getValue(), '通过'],
            processKey: processKey,
            businessKey: V_ORDERGUID,
            V_STEPCODE: V_STEPCODE,
            V_STEPNAME: V_STEPNAME,
            V_IDEA: '请审批！',
            V_NEXTPER: Ext.getCmp('nextPer').getValue(),
            V_INPER: Ext.util.Cookies.get('v_personcode')
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.ret == '任务提交成功') {
                Ext.Ajax.request({
                    url: AppUrl + 'hp/PRO_ACTIVITI_FLOW_AGREE',
                    method: 'POST',
                    async: false,
                    params: {
                        'V_V_ORDERID': V_ORDERGUID,
                        'V_V_PROCESS_NAMESPACE': 'JmDJ',
                        'V_V_PROCESS_CODE': processKey,
                        'V_V_STEPCODE': V_STEPCODE,
                        'V_V_STEPNEXT_CODE': V_NEXT_SETP
                    },
                    success: function (ret) {
                        var resp = Ext.JSON.decode(ret.responseText);
                        if (resp.V_INFO == 'success') {
                            window.opener.QueryTabY();
                            window.opener.QuerySum();
                            window.opener.QueryGrid();
                            window.close();
                            window.opener.OnPageLoad();
                        }
                    }
                });
            } else {
                Ext.MessageBox.alert('提示', '任务提交失败');
            }
        },
        failure: function (response) {//访问到后台时执行的方法。
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            })
        }

    })
}


//驳回的函数
function _reject(){
    //审批意见文本框
    var spyj = '';
    if (Ext.getCmp('spyj').getValue() == '' || Ext.getCmp('spyj').getValue() == null) {
        spyj = '审批驳回';
    } else {
        spyj = Ext.getCmp('spyj').getValue();
    }
    var Assignee='';
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/InstanceState',
        method: 'POST',
        async: false,
        params: {
            instanceId: ProcessInstanceId
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            Assignee=resp.list[0].Assignee;
            alert(Assignee);
        }

    });

    if(Assignee!=''){
        Ext.Ajax.request({
            url: AppUrl + 'Activiti/TaskComplete',
            type: 'ajax',
            method: 'POST',
            params: {
                taskId: taskId,
                idea: '不通过',
                parName: ['ckjmdjzgxg', "flow_yj"],
                parVal: [Assignee, spyj],
                processKey: processKey,
                businessKey: V_ORDERGUID,
                V_STEPCODE: 'ckjmdjzgxg',
                V_STEPNAME: '厂矿精密点检主管修改',
                V_IDEA: '不通过',
                V_NEXTPER: Assignee,
                V_INPER: Ext.util.Cookies.get('v_personcode')
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (resp.ret == '任务提交成功') {
                    Ext.Ajax.request({
                        url: AppUrl + 'PM_06/PRO_PM_06_ACTIVITI_FLOW_AGREE',
                        method: 'POST',
                        async: false,
                        params: {
                            'V_V_ORDERID': V_ORDERGUID,
                            'V_V_PROCESS_NAMESPACE': 'JmDJ',
                            'V_V_PROCESS_CODE': processKey,
                            'V_V_STEPCODE': V_STEPCODE,
                            'V_V_STEPNEXT_CODE': V_NEXT_SETP
                        },
                        success: function (ret) {
                            var resp = Ext.JSON.decode(ret.responseText);
                            if (resp.V_INFO == 'success') {
                                /*window.opener.QueryTabY();
                                 window.opener.QuerySum();
                                 window.opener.QueryGrid();
                                 window.close();
                                 window.opener.OnPageLoad();*/
                            }
                        }
                    });
                } else {
                    Ext.MessageBox.alert('提示', '任务提交失败');
                }
            },
            failure: function (response) {//访问到后台时执行的方法。
                Ext.MessageBox.show({
                    title: '错误',
                    msg: response.responseText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                })
            }

        })
    }else{
        alert("发起人信息错误，无法驳回");
    }
}
//树查询
function _queryTree() {
    Ext.getCmp('sblxTree').store.setProxy({
        type: 'ajax',
        actionMethods: {
            read: 'POST'
        },
        async: false,
        url: AppUrl + 'CarManage/PRO_GET_DEPTEQUTYPE_PER',
        reader: {
            type: 'json'
        },
        root: {
            expanded: true
        },
        extraParams: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
        }
    });
    Ext.getCmp('sblxTree').store.load();
}

function TreeChecked(TreeChecked) {
    _queryEquDetail();
    _queryEquLink();
    _selectLrjmdj();

}

function _queryEquLink() {
    var records = Ext.getCmp('sblxTree').getSelectionModel().getSelection();
    var sbbgStore = Ext.data.StoreManager.lookup('sbbgStore');
    sbbgStore.proxy.extraParams.V_V_EQUCODE = records[0].data.sid;
    sbbgStore.currentPage = 1;
    sbbgStore.load();
}

function _queryEquDetail() {
    var records = Ext.getCmp('sblxTree').getSelectionModel().getSelection();
    Ext.Ajax.request({
        url: AppUrl + 'pm_19/PRO_SAP_PM_EQU_P_GET',
        method: 'POST',
        params: {
            V_V_EQUCODE: records[0].data.sid
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            if (resp.list.length != 0) {
                Ext.getCmp('rsbbm').setValue(resp.list[0].V_EQUCODE);//设备编码
                Ext.getCmp('rsbmc').setValue(resp.list[0].V_EQUNAME);//设备名称
                Ext.getCmp('rsblxbm').setValue(resp.list[0].V_EQUTYPECODE);//设备类型编码
                Ext.getCmp('rsblxwz').setValue(resp.list[0].V_EQUTYPENAME);//设备类型位置
                Ext.getCmp('rwzbm').setValue(resp.list[0].V_EQUSITE);//位置编码
                Ext.getCmp('rwzmc').setValue(resp.list[0].V_EQUSITENAME);//位置名称
                Ext.getCmp('rsblx').setValue(resp.list[0].V_EQUTYPENAME);//设备类型
                Ext.getCmp('rsbzl').setValue(resp.list[0].V_EQULEVNAME);//设备种类
                Ext.getCmp('rbs').setValue(resp.list[0].V_ABC);//ABC标识
                Ext.getCmp('rksrq').setValue(resp.list[0].V_DATE_B);//开始日期
                Ext.getCmp('rjsrq').setValue(resp.list[0].V_DATE_E);//结束日期
                Ext.getCmp('rcbzx').setValue(resp.list[0].V_CASTNAME);//成本中心
                Ext.getCmp('rggxh').setValue(resp.list[0].V_GGXH);//规格型号
                Ext.getCmp('rdxcc').setValue(resp.list[0].V_SIZE);//大小/尺寸
                Ext.getCmp('rzczzs').setValue(resp.list[0].V_ZZS);//资产制造商
                Ext.getCmp('rgzjz').setValue(resp.list[0].F_MONEY);//购置价值
                Ext.getCmp('rdxzl').setValue(resp.list[0].F_WEIGHT);//对象重量
            }
        }
    });
}

function _selectDept() {//动态加载子数据集（作业区的数据集）
    var zyqStore = Ext.data.StoreManager.lookup('zyqStore');
    zyqStore.proxy.extraParams.V_V_DEPTCODE = Ext.util.Cookies.get('v_orgCode');
    zyqStore.load();
}
//查询厂矿精密点检
function _selectJmdj() {
    var jmdjStore = Ext.data.StoreManager.lookup('jmdjStore');
    jmdjStore.proxy.extraParams.V_V_BUSINESSKEY = V_ORDERGUID;
    jmdjStore.currentPage = 1;
    jmdjStore.load();
}


function _selectLrjmdj() {
    //选中树
    var records = Ext.getCmp('sblxTree').getSelectionModel().getSelection();
    EQU_CODE = records[0].data.sid;
    var lrjmdjStore = Ext.data.StoreManager.lookup('lrjmdjStore');
    lrjmdjStore.proxy.extraParams.V_V_BUSINESSKEY =V_ORDERGUID;
    lrjmdjStore.proxy.extraParams.V_V_EQU_CODE = records[0].data.sid;
    lrjmdjStore.currentPage = 1;
    lrjmdjStore.load();
}
//插入空数据，应该在保存数据的时候调还是在加载树的时候调用
/*function _insertKsj() {
    var lrjmdjStore = Ext.data.StoreManager.lookup('lrjmdjStore');
    lrjmdjStore.insert(lrjmdjStore.getCount(), {
        //'V_EQU_NAME':'258'
        'V_GUID': Ext.data.IdGenerator.get('uuid').generate()
    });
}*/

//删除精密点检
function _deleteJmdj() {
    var records = Ext.getCmp('gridPanel1').getSelectionModel().getSelection();
    if (records.length == 0) {
        Ext.MessageBox.alert("操作信息", '请选择至少一条数据进行删除！', Ext.MessageBox.WARNING);
        return false;
    }
    Ext.MessageBox.show({
        title: '请确认',
        msg: '是否删除',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESTION,
        fn: function (btn) {
            if (btn == 'yes') {
                for (var i = 0; i < records.length; i++) {
                    Ext.Ajax.request({
                        url: AppUrl + 'zs/PM_06_JMDJ_DEL ',
                        method: 'POST',
                        async: false,
                        params: {
                            V_V_GUID: records[i].data.V_GUID
                        },
                        success: function (resp) {
                            var data = Ext.decode(resp.responseText);
                            if (data.INFO == 'SUCCESS') {
                                Ext.Msg.alert("信息", "成功！");
                            } else {
                                Ext.Msg.alert("信息", "失败！");
                            }
                        }
                    });
                }
                _selectJmdj();//参数是需要调用工作流查找的
                _selectLrjmdj();
            } else {
                Ext.MessageBox.hide();

            }
        }
    });
}

//获取模板的函数
/*function _getTemplate() {
    Ext.getCmp('_hqmbWindow').show();
    _selectHqmb();
}*/
/*
function _selectHqmb() {
    var hqmbStore = Ext.data.StoreManager.lookup('hqmbStore');
    hqmbStore.proxy.extraParams.V_V_EQU_CODE = EQU_CODE;
    hqmbStore.currentPage = 1;
    hqmbStore.load();
}*/
/*function _Affirm() {
    var records = Ext.getCmp('hqmbPanel').getSelectionModel().getSelection();
    Ext.Ajax.request({
        url: AppUrl + 'zs/PM_06_JMDJ_INS',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID: Ext.data.IdGenerator.get('uuid').generate(),
            V_V_BUSINESSKEY: '1',
            V_V_EQU_CODE: EQU_CODE,
            V_V_EQU_NAME: records[0].data.V_EQU_NAME,
            V_V_GNWZ: records[0].data.V_GNWZ,
            V_V_JCFS: records[0].data.V_JCFS,
            V_V_JCZQ: records[0].data.V_JCZQ,
            V_V_ZD: records[0].data.V_ZD,
            V_V_DJ: records[0].data.V_DJ,
            V_V_TS: records[0].data.V_TS,
            V_V_DL: records[0].data.V_DL,
            V_V_RX: records[0].data.V_RX,
            V_V_CSWZSL: records[0].data.V_CSWZSL,
            V_V_CSDSL: records[0].data.V_CSDSL
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);
            //if (data.INFO == 'SUCCESS') {
           // Ext.getCmp('_hqmbWindow').hide();
            Ext.Msg.alert("信息", data.INFO);
            _selectLrjmdj();
            _selectJmdj();
        }
    });
}*/


