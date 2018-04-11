var updCarGuid;//传给机具更新的编码
var updDriverGuid;//传给司机更新的编码
var insDriverGuid;//传给司机新增的编码
Ext.onReady(function () {
    //Ext.getBody().mask('<p>页面载入中...</p>');

    //厂矿
    var ckStore = Ext.create('Ext.data.Store', {
        id: 'ckStore',
        autoLoad: true,
        fields: ['V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
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
                'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '基层单位'
            }
        },
        listeners: {//给下拉框默认赋值
            load: function (store, records) {
                Ext.getCmp('ck').select(ckStore.getAt(0));
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

    //左上机具store
    var carStore = Ext.create('Ext.data.Store', {
        id: 'carStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_GUID', 'V_CARCODE', 'V_CARNAME', 'V_CARTYPE', 'V_CARGUISUO', 'V_CARINDATE', 'V_DE', 'V_FLAG'],
        proxy: {
            url: AppUrl + 'CarManage/BASE_EXAMINE_CAR_SEL',
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

    //左上表格store
    var zuoshangStore = Ext.create('Ext.data.Store', {
        storeId: 'zuoshangStore',
        autoLoad: false,
        pageSize: 2,
        fields: ['data_'],
        data: [['M'], ['S'], ['P'],
            [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '],
            [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '],
            [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '],
            [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']
        ]
    });

    //司机详情
    var driverStore = Ext.create('Ext.data.Store', {
        storeId: 'driverStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_GUID', 'V_CAR_GUID', 'V_DRIVER_NAME', 'V_WORK_DATE', 'V_DRIVER_DE'],
        proxy: {
            url: AppUrl + 'CarManage/BASE_DRIVER_SEL',
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

    var CCDetailStore = Ext.create('Ext.data.Store', {//出车明细数据集
        storeId: 'CCDetailStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_GUID', 'V_CAR_GUID', 'V_DRIVER_GUID', 'V_BEGIN_TIME', 'V_END_TIME', 'V_PLACE', 'V_USE', 'V_STATUS', 'V_USE_TIME'],
        proxy: {
            url: AppUrl + 'CarManage/BASE_DRIVEOUT_DETAIL_SEL',
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


    //机具使用明细
    var carUseDetailStore = Ext.create('Ext.data.Store', {
        storeId: 'carUseDetailStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_CARCODE', 'V_CARNAME', 'V_DE', 'V_BEGIN_TIME', 'V_PLACE', 'V_USE_TIME', 'V_USE', 'V_DRIVER_NAME'],
        proxy: {
            url: AppUrl + 'CarManage/BASE_CAR_USE_DETAIL_SEL',
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

    //维修信息
    var repairInfoStore = Ext.create('Ext.data.Store', {
        storeId: 'repairInfoStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['V_CARCODE', 'V_CARNAME', 'D_FACT_START_DATE', 'V_SHORT_TXT', 'V_ORDERID'],
        proxy: {
            url: AppUrl + 'CarManage/BASE_CAR_REP_DETAIL_SEL',
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

    //工种
    var gzStore = Ext.create('Ext.data.Store', {
        storeId: 'gzStore',
        autoLoad: false,
        pageSize: 2,
        fields: ['PRODUCT_ID_', 'PRODUCT_CODE_', 'PRODUCT_NAME_', 'FIXED_AMOUNT_', 'UNIT_FACTOR_', 'UNIT_', 'COM_CODE_', 'STATUS_'],
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

    //工具
    var gjStore = Ext.create('Ext.data.Store', {
        storeId: 'gjStore',
        autoLoad: false,
        pageSize: 2,
        fields: ['PRODUCT_ID_', 'PRODUCT_CODE_', 'PRODUCT_NAME_', 'FIXED_AMOUNT_', 'UNIT_FACTOR_', 'UNIT_', 'COM_CODE_', 'STATUS_'],
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

    //机具
    var jjStore = Ext.create('Ext.data.Store', {
        storeId: 'jjStore',
        autoLoad: false,
        pageSize: 2,
        fields: ['PRODUCT_ID_', 'PRODUCT_CODE_', 'PRODUCT_NAME_', 'FIXED_AMOUNT_', 'UNIT_FACTOR_', 'UNIT_', 'COM_CODE_', 'STATUS_'],
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

    //物料
    var wlStore = Ext.create('Ext.data.Store', {
        storeId: 'wlStore',
        autoLoad: false,
        pageSize: 2,
        fields: ['PRODUCT_ID_', 'PRODUCT_CODE_', 'PRODUCT_NAME_', 'FIXED_AMOUNT_', 'UNIT_FACTOR_', 'UNIT_', 'COM_CODE_', 'STATUS_'],
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

    //设备树
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

    //机具报废审批
    var jjbfspStore = Ext.create('Ext.data.Store', {
        storeId: 'jjbfspStore',
        autoLoad: false,
        pageSize: 2,
        fields: ['PRODUCT_ID_', 'PRODUCT_CODE_', 'PRODUCT_NAME_', 'FIXED_AMOUNT_', 'UNIT_FACTOR_', 'UNIT_', 'COM_CODE_', 'STATUS_'],
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

    //顶部查询面板
    var inputPanel = Ext.create('Ext.form.Panel', {
        id: 'inputPanel',
        title: '<div align="center">机具管理</div>',
        frame: true,
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:5px 0px 5px 10px'},
        items: [{
            xtype: 'textfield',
            id: 'CAR_CODE_',
            fieldLabel: '机具编码',
            labelWidth: 70,
            style: 'margin:5px 0px 5px 0px'
        },
            {
                xtype: 'textfield',
                id: 'CAR_NAME_',
                fieldLabel: '机具名称',
                labelWidth: 70,
                style: 'margin:5px 0px 5px 0px'
            },
            {
                xtype: 'button',
                text: '查询',
                icon: imgpath + '/search.png',
                style: 'margin:5px 0px 5px 20px',
                width: 60,
                handler: _preSelectCarStore
            },
            {xtype: 'button', text: '添加', icon: imgpath + '/add.png', width: 60, handler: _insertCar},
            {xtype: 'button', text: '修改', icon: imgpath + '/edit.png', width: 60, handler: _updateCar}]
    });


    //左上机具表格
    var carPanel = Ext.create('Ext.grid.Panel', {
        id: 'carPanel',
        store: carStore,
        frame: true,
        border: false,
        columnLines: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '机具编码', dataIndex: 'V_CARCODE', style: 'text-align: center;', flex: 1},
            {text: '机具名称', dataIndex: 'V_CARNAME', style: 'text-align: center;', flex: 1},
            {text: '机具类型', dataIndex: 'V_CARTYPE', style: 'text-align: center;', flex: 1},
            {text: '机具归属', dataIndex: 'V_CARGUISUO', style: 'text-align: center;', flex: 1},
            {text: '机具入厂时间', dataIndex: 'V_CARINDATE', style: 'text-align: center;', width: 100},
            {text: '机具定额', dataIndex: 'V_DE', style: 'text-align: center;', flex: 1},
            {text: '机具状态', dataIndex: 'V_FLAG', style: 'text-align: center;', flex: 1},
            {
                text: '删除', dataIndex: '', style: 'text-align: center;', width: 50,
                renderer: function (v) {
                    return "<span style='margin-right:10px'><a href='#' onclick='_deleteCar()'>删除</a></span>";
                }
            }, {
                text: '报废', dataIndex: '', style: 'text-align: center;', width: 50,
                renderer: function (v) {
                    return "<span style='margin-right:10px'><a href='#' onclick='_disableCar()'>报废</a></span>";
                }
            }],
        listeners: {//itemclick监听查询司机详情，机具使用明细，机具维修明细，关联设备，机具报废明细的操作
            itemclick: function (panel, record, item, index, e, eOpts) {
                _selectDriver(record.get('V_GUID'));
                _selectCarUseDetail(record.get('V_GUID'));
                _selectRepairInfo(record.get('V_GUID'));
                _selectCarDestroy(record.get('V_GUID'));
                _preViewImage(record.get('V_GUID'));
            }
        },
        bbar: [{//汽车数据集的分页
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'carStore'
        }]
    });

    var viewImagePanel = Ext.create("Ext.form.Panel", {
        id: 'viewImagePanel',
        editable: false,
        frame: true,
        border: false,
        region: 'center',
        title: '机具示意图',
        items: [{
            layout: 'column',
            defaults: {
                labelAlign: 'right'
            },
            items: [{
                xtype: 'box',
                id: 'browseImage',
                autoEl: {//
                    width: window.screen.width / 2 - 110,
                    height: window.screen.height / 2 + 38,
                    tag: 'input',
                    type: 'image',
                    src: Ext.BLANK_IMAGE_URL,
                    style: 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale); border:1px solid #bebebe; margin-left: 0px;margin-top: 0px;',
                    // complete: 'off',
                    id: 'imageBrowse',
                    name: 'imageBrowse'
                }
            }]
        }]
    });

    var button1 = Ext.create('Ext.Panel', {
        id: 'button1',
        layout: 'column',
        frame: true,
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:5px 0px 5px 10px'},
        items: [{
            xtype: 'button',
            text: '添加',
            icon: imgpath + '/add.png',
            width: 60,
            handler: _insertDriver
        },
            {xtype: 'button', text: '修改', icon: imgpath + '/edit.png', width: 60, handler: _updateDriver},
            {xtype: 'button', text: '删除', icon: imgpath + '/delete1.png', width: 60, handler: _deleteDriver}]
    });

    //司机详情
    var driverPanel = Ext.create("Ext.grid.Panel", {
        id: 'driverPanel',
        store: 'driverStore',
        columnLines: true,
        frame: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '司机姓名', dataIndex: 'V_DRIVER_NAME', style: 'text-align: center;', flex: 1},
            {text: '上岗时间', dataIndex: 'V_WORK_DATE', style: 'text-align: center;', flex: 1},
            {text: '司机定额', dataIndex: 'V_DRIVER_DE', style: 'text-align: center;', flex: 1},
            {
                text: '出车明细', dataIndex: '', style: 'text-align: center;', width: 60,
                renderer: function (v) {
                    return "<span style='margin-right:10px'><a href='#' onclick='_carUseDetail()'>查看</a></span>";
                }
            }],
        bbar: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'driverStore'
        }]
    });

    var sjxqPanel = Ext.create('Ext.panel.Panel', {
        title: '司机详情',
        region: 'center',
        layout: 'border',
        border: false,
        frame: true,
        width: 250,
        items: [{region: 'north', items: [button1]}, {region: 'center', layout: 'fit', items: [driverPanel]}]

    });

    var jjsymxPanel = Ext.create("Ext.grid.Panel", {
        id: 'jjsymxPanel',
        title: '机具使用明细',
        columnLines: true,
        region: 'center',
        store: 'carUseDetailStore',
        //baseCls: 'my-panel-no-border',
        border: false,
        frame: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '机具编码', dataIndex: 'V_CARCODE', style: 'text-align: center;', flex: 1},
            {text: '机具名称', dataIndex: 'V_CARNAME', style: 'text-align: center;', flex: 1},
            {text: '使用开始时间', dataIndex: 'V_BEGIN_TIME', style: 'text-align: center;', flex: 1},
            {text: '使用地点', dataIndex: 'V_PLACE', style: 'text-align: center;', flex: 1},
            {text: '使用台时', dataIndex: 'V_USE_TIME', style: 'text-align: center;', flex: 1},
            {text: '机具定额', dataIndex: 'V_DE', style: 'text-align: center;', flex: 1},
            {text: '司机姓名', dataIndex: 'V_DRIVER_NAME', style: 'text-align: center;', flex: 1},
            {text: '用途', dataIndex: 'V_USE', style: 'text-align: center;', flex: 1}],
        bbar: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'carUseDetailStore'
        }]
    });

    var repairInfoPanel = Ext.create('Ext.grid.Panel', {
        id: 'repairInfoPanel',
        title: '维修信息',
        region: 'center',
        columnLines: true,
        store: repairInfoStore,
        //selType: 'checkboxmodel',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '机具编码', dataIndex: 'V_CARCODE', align: 'center', flex: 1},
            {text: '机具名称', dataIndex: 'V_CARNAME', align: 'center', flex: 1},
            {text: '维修时间', dataIndex: 'D_FACT_START_DATE', align: 'center', flex: 1},
            {text: '维修明细', dataIndex: 'V_SHORT_TXT', align: 'center', flex: 1},
            {text: '维修工单号', dataIndex: 'V_ORDERID', align: 'center', flex: 1}],
        bbar: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'repairInfoStore'
        }]
    });

    var gzPanel = Ext.create('Ext.grid.Panel', {
        id: 'gzPanel',
        title: '工种',
        region: 'center',
        columnLines: true,
        store: zuoshangStore,
        //selType: 'checkboxmodel',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工种编码', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工种名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工种类型', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '台时', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid5page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
            //store: 'grid3Store'
        }]
    });

    var gjPanel = Ext.create('Ext.grid.Panel', {
        id: 'gjPanel',
        title: '工具',
        region: 'center',
        columnLines: true,
        store: zuoshangStore,
        //selType: 'checkboxmodel',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工具编码', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工具名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '使用时间', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '使用地点', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '使用台时', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '用途', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid6page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
            //store: 'grid3Store'
        }]
    });

    var jjPanel = Ext.create('Ext.grid.Panel', {
        id: 'jjPanel',
        title: '机具',
        region: 'center',
        columnLines: true,
        store: zuoshangStore,
        //selType: 'checkboxmodel',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '机具编码', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '机具名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '机具类型', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '台时', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid7page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
            //store: 'grid3Store'
        }]
    });

    var wlPanel = Ext.create('Ext.grid.Panel', {
        id: 'wlPanel',
        title: '物料',
        region: 'center',
        columnLines: true,
        store: zuoshangStore,
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '物料编码', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '物料描述', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '规格型号', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '计量单位', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '使用数量', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '单价', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid8page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
            //store: 'grid3Store'
        }]
    });

    var tab2 = Ext.create('Ext.tab.Panel', {
        id: 'tab2',
        title: '机具维修明细',
        frame: true,
        items: [repairInfoPanel, gzPanel, gjPanel, jjPanel, wlPanel]
    });

    //关联设备下拉框
    var Panel4 = Ext.create('Ext.Panel', {
        id: 'Panel4',
        frame: true,
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 50, inputWidth: 140, style: 'margin:5px 0px 5px 20px'},
        items: [{
            xtype: 'combo',
            id: 'ck',
            store: ckStore,//根节点数据集，厂矿数据集
            queryMode: 'local',
            valueField: 'V_DEPTCODE',
            displayField: 'V_DEPTNAME',
            //emptyText: '全部',
            labelWidth: 35,
            forceSelection: true,
            fieldLabel: '厂矿',
            listeners: {
                change: function (combo, records) {
                    _selectDept();
                }

            }
        }, {
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
        }]
    });

    //关联设备类型树
    var sblxTree = Ext.create('Ext.tree.Panel', {
        id: 'sblxTree',
        title: '设备类型树',
        region: 'west',
        width: '30%',
        rootVisible: false,
        autoScroll: true,
        store: treeStore,
        listeners: {
            itemclick: TreeChecked
        }
    });

    //关联设备信息
    var sbxxPanel = Ext.create('Ext.form.Panel', {
        id: 'sbxxPanel',
        frame: true,
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 200, style: 'margin:5px 0px 5px 0px'},
        items: [{
            xtype: 'textfield',
            id: 'rsbbm',
            style: 'margin:20px 0px 5px 0px',
            fieldLabel: '设备编码:',
            maxLength: 60,
            allowBlank: false
        },
            {xtype: 'textfield', id: 'rsbmc', fieldLabel: '设备名称:', maxLength: 60},
            {xtype: 'textfield', id: 'rsblxbm', fieldLabel: '设备类型编号:', maxLength: 60},
            {xtype: 'textfield', id: "rsblxwz", fieldLabel: '设备类型位置', maxLength: 60},
            {xtype: 'textfield', id: 'rwzbm', fieldLabel: '位置编码:', maxLength: 60},
            {xtype: 'textfield', id: 'rwzmc', fieldLabel: '位置名称:', maxLength: 60},
            {xtype: 'textfield', id: 'rsblx', fieldLabel: '设备类型:', maxLength: 60},
            {xtype: 'textfield', id: 'rsbzl', fieldLabel: '设备种类:', maxLength: 60},
            {xtype: 'textfield', id: 'rbs', fieldLabel: 'ABC标识:', maxLength: 60},
            {xtype: 'textfield', id: 'rksrq', fieldLabel: '开始日期:', maxLength: 60},
            {xtype: 'textfield', id: 'rjsrq', fieldLabel: '结束日期:', maxLength: 60},
            {xtype: 'textfield', id: 'rcbzx', fieldLabel: '成本中心:', maxLength: 60},
            {xtype: 'textfield', id: 'rggxh', fieldLabel: '规格型号:', maxLength: 60},
            {xtype: 'textfield', id: 'rdxcc', fieldLabel: '大小/尺寸:', maxLength: 60},
            {xtype: 'textfield', id: 'rzczzs', fieldLabel: '资产制造商:', maxLength: 60},
            {xtype: 'textfield', id: 'rgzjz', fieldLabel: '购置价值:', maxLength: 60},
            {xtype: 'textfield', id: 'rdxzl', fieldLabel: '对象重量:', maxLength: 60}]
    });

    //关联设备表格
    var sbbgPanel = Ext.create('Ext.grid.Panel', {
        id: 'sbbgPanel',
        //region: 'center',
        columnLines: true,
        store: sbbgStore,
        //autoScroll: false,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '设备编码', dataIndex: 'V_EQUCODE', align: 'center', flex: 1},
            {text: '设备名称', dataIndex: 'V_EQUNAME', align: 'center', flex: 1},
            {text: '功能位置', dataIndex: 'V_EQUSITE', align: 'center', flex: 1},
            {text: '关联时间', dataIndex: 'V_LINK_TIME', align: 'center', flex: 1},
            {text: '关联人', dataIndex: 'V_LINK_PERSON', align: 'center', flex: 1},
            {
                text: '取消关联', dataIndex: '', style: 'text-align: center;', width: 80,
                renderer: function (v) {
                    return "<span style='margin-right:10px'><a href='#' onclick='_deleteLink()'>取消关联</a></span>";
                }
            }],
        bbar: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'sbbgStore'
        }]
    });

    //关联设备
    var glsbPanel = Ext.create('Ext.Panel', {
        id: 'glsbPanel',
        title: '关联设备',
        //layout : 'border',
        layout: {
            type: 'border',
            regionWeights: {
                west: 2,
                north: 3,
                south: 1,
                east: 4
            }
        },
        items: [
            {
                region: 'east',
                width: '50%',
                layout: 'fit',
                items: [sbbgPanel]
            },
            {
                region: 'north',
                layout: 'fit',
                items: [Panel4]
            }, {
                region: 'west',
                width: '20%',
                layout: 'fit',
                items: [sblxTree]
            }, {
                region: 'center',
                layout: 'fit',
                items: [sbxxPanel]
            }]
    });

    //机具报废明细form
    var jjbfFormPanel = Ext.create('Ext.form.Panel', {
        id: 'jjbfFormPanel',
        frame: true,
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 300, style: 'margin:20px 0px 10px 40px'},
        items: [{xtype: 'textfield', id: 'jjbm_', fieldLabel: '机具编码:', maxLength: 60},
            {xtype: 'textfield', id: 'jjmc_', fieldLabel: '机具名称:', maxLength: 60},
            {xtype: 'textfield', id: 'jjcgsj_', fieldLabel: '机具采购时间:', maxLength: 60},
            {xtype: 'textfield', id: "jjcgfy_", fieldLabel: '机具采购费用', maxLength: 60},
            {xtype: 'textfield', id: 'jjssjg_', fieldLabel: '机具所属机构:', maxLength: 60},
            {xtype: 'textfield', id: 'jjsysc_', fieldLabel: '机具使用时长:', maxLength: 60},
            {xtype: 'textareafield', id: 'jjbfyy_', fieldLabel: '机具报废原因:', maxLength: 60}]
    });

    //机具报废审批
    var jjbfspPanel = Ext.create('Ext.grid.Panel', {
        id: 'jjbfspPanel',
        title: "机具报废审批流程",
        columnLines: true,
        store: zuoshangStore,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '审批步骤', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '审批时间', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '审批意见', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid10page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
            //store: 'grid3Store'
        }]
    });

    var chakancar = Ext.create('Ext.window.Window', {
        id: 'chakancar',
        width: 850,
        height: 500,
        title: '出车明细',
        modal: true,//弹出窗口时后面背景不可编辑
        closeAction: 'hide',
        layout: 'fit',
        closable: true,
        items: [Ext.create("Ext.grid.Panel", {
            store: 'CCDetailStore',
            columnLines: true,
            columns: [
                {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
                {text: '出车开始时间', dataIndex: 'V_BEGIN_TIME', style: 'text-align: center;', width: 160},
                {text: '出车结束时间', dataIndex: 'V_END_TIME', style: 'text-align: center;', width: 160},
                {text: '地点', dataIndex: 'V_PLACE', style: 'text-align: center;', flex: 1},
                {text: '用途', dataIndex: 'V_USE', style: 'text-align: center;', flex: 1},
                {text: '车辆状态', dataIndex: 'V_STATUS', style: 'text-align: center;', flex: 1},
                {text: '使用台时', dataIndex: 'V_USE_TIME', style: 'text-align: center;', flex: 1}
            ],
            bbar: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true,
                displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                emptyMsg: '没有记录',
                store: 'CCDetailStore',
                width: '100%'
            }]
        })]
    });


    //机具报废明细
    var jjbfmxPanel = Ext.create('Ext.Panel', {
        id: 'jjbfmxPanel',
        title: '机具报废明细',
        layout: 'border',
        items: [{
            region: 'west',
            width: '50%',
            layout: 'fit',
            items: [jjbfFormPanel]
        }, {
            region: 'center',
            layout: 'fit',
            items: [jjbfspPanel]
        }]
    });

    var tab1 = Ext.create('Ext.tab.Panel', {
        id: 'tab1',//相关司机详情，机具使用明细，机具维修明细，关联设备，机具报废明细
        frame: true,
        items: [sjxqPanel, jjsymxPanel, tab2, glsbPanel, jjbfmxPanel]
    });

    var leftPanel = Ext.create('Ext.Panel', {
        id: 'leftPanel',
        layout: 'border',
        border: false,
        items: [{
            region: 'north',
            layout: 'fit',
            height: '40%',
            border: false,
            items: [carPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [viewImagePanel]
        }]
    });

    Ext.create('Ext.container.Viewport', {
        layout: {
            type: 'border',
            regionWeights: {
                west: 1,
                north: 2,
                south: -1,
                east: -2
            }
        },
        items: [{
            region: 'north',
            border: false,
            items: [inputPanel]
        }, {
            region: 'west',
            width: '40%',
            layout: 'fit',
            border: false,
            items: [leftPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [tab1]
        }]
    });

    Ext.getCmp("sblxTree").on("beforeload", function (store, operation) {
        if (operation.node.data.parentid == -1) {
            Ext.apply(store.proxy.extraParams, {
                    V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                    V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                    V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue(),
                    V_V_EQUTYPECODE: operation.node.data.sid,
                    V_V_EQUCODE: '%'
                },
                store.proxy.url = AppUrl + 'CarManage/PRO_SAP_PM_EQU_TREE')
        }else if (operation.node.data.parentid == -2) {
            Ext.apply(store.proxy.extraParams, {
                    V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                    V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                    V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue(),
                    V_V_EQUTYPECODE: '%',
                    V_V_EQUCODE: operation.node.data.sid
                },
                store.proxy.url = AppUrl + 'CarManage/PRO_SAP_PM_CHILDEQU_TREE')
        }
    });
    _preSelectCarStore();
});

var insertCarWindow = Ext.create('Ext.window.Window', {
    id: 'insertCarWindow',
    width: 320,
    height: 380,
    layout: 'vbox',
    title: '编辑',
    modal: true,//弹出窗口时后面背景不可编辑
    frame: true,
    closeAction: 'hide',
    closable: true,
    defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:10px 0px 0px 0px'},
    items: [
        {xtype: 'textfield', id: 'WIN_CAR_CODE_', fieldLabel: '机具编码', width: '300'},
        {xtype: 'textfield', id: 'WIN_CAR_NAME_', fieldLabel: '机具名称', width: '300'},
        {xtype: 'textfield', id: 'WIN_CAR_TYPE_', fieldLabel: '机具类型', width: '300'},
        {xtype: 'textfield', id: 'WIN_GS_', fieldLabel: '机具归属', width: '300'},
        {
            xtype: 'combo',
            id: 'WIN_FLAG_',
            fieldLabel: '机具状态',
            displayField: 'displayField',
            valueField: 'valueField',
            store: [['在用', '在用'], ['停用', '停用']],
            queryMode: 'local',
            value: '在用',
            editable: false,
            width: '300'
        }, {
            xtype: 'datefield',//日期录入
            id: 'WIN_CAR_INDATE_',
            format: 'Y-m-d H:i:s',
            submitFormat: 'Y-m-d H:i:s',
            fieldLabel: '机具入厂时间'
        },
        {xtype: 'numberfield', id: 'WIN_DE_', fieldLabel: '机具定额', width: '300'}],
    buttons: [{
        xtype: 'button',
        text: '保存',
        width: 40,
        handler: function () {
            _insertCarSave();
        }
    }, {
        xtype: 'button', text: '取消', width: 40, handler: function () {
            Ext.getCmp('insertCarWindow').hide();
        }
    }]
});

var updateCarWindow = Ext.create('Ext.window.Window', {//修改机具的窗口
    id: 'updateCarWindow',
    width: 320,
    height: 380,
    layout: 'vbox',
    title: '编辑',
    modal: true,//弹出窗口时后面背景不可编辑
    frame: true,
    closeAction: 'hide',
    closable: true,
    defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:10px 0px 0px 0px'},
    items: [
        {xtype: 'textfield', id: 'WIN2_CAR_CODE_', fieldLabel: '机具编码', width: '300'},
        {xtype: 'textfield', id: 'WIN2_CAR_NAME_', fieldLabel: '机具名称', width: '300'},
        {xtype: 'textfield', id: 'WIN2_CAR_TYPE_', fieldLabel: '机具类型', width: '300'},
        {xtype: 'textfield', id: 'WIN2_GS_', fieldLabel: '机具归属', width: '300'},
        {
            xtype: 'combo',
            id: 'WIN2_FLAG_',
            fieldLabel: '机具状态',
            displayField: 'displayField',
            valueField: 'valueField',
            store: [['在用', '在用'], ['停用', '停用']],
            queryMode: 'local',
            value: '在用',
            editable: false,
            width: '300'
        }, {
            xtype: 'datefield',//日期录入
            id: 'WIN2_CAR_INDATE_',
            format: 'Y-m-d H:i:s',
            submitFormat: 'Y-m-d H:i:s',
            fieldLabel: '机具入厂时间'
        },
        {xtype: 'numberfield', id: 'WIN2_DE_', fieldLabel: '机具定额', width: '300'}],
    buttons: [{
        xtype: 'button',
        text: '保存',
        width: 40,
        handler: function () {
            _updateCarSave();
        }
    }, {
        xtype: 'button', text: '取消', width: 40, handler: function () {
            Ext.getCmp('updateCarWindow').hide();
        }
    }]
});

var insertDriverWindow = Ext.create('Ext.window.Window', {
    id: 'insertDriverWindow',
    width: 320,
    height: 200,
    layout: 'vbox',
    title: '编辑',
    modal: true,//弹出窗口时后面背景不可编辑
    frame: true,
    closeAction: 'hide',
    closable: true,
    defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:10px 0px 0px 0px'},
    items: [
        {xtype: 'textfield', id: 'INS_DRIVER_GUID', fieldLabel: '司机编码'},
        {xtype: 'textfield', id: 'INS_CAR_GUID', fieldLabel: '机具编码'},
        {xtype: 'textfield', id: 'INS_DRIVER_NAME', fieldLabel: '司机姓名'},
        {
            xtype: 'datefield',
            id: 'INS_WORK_DATE',
            fieldLabel: '上岗时间',
            format: 'Y-m-d H:i:s',
            submitFormat: 'Y-m-d H:i:s'
        },
        {xtype: 'textfield', id: 'INS_DRIVER_DE', fieldLabel: '司机定额'}],
    buttons: [{
        xtype: 'button', text: '保存', width: 40, handler: function () {
            _insertDriverSave();
        }
    }, {
        xtype: 'button', text: '取消', width: 40, handler: function () {
            Ext.getCmp('insertDriverWindow').hide();
        }
    }]
});

var updateDriverWindow = Ext.create('Ext.window.Window', {
    id: 'updateDriverWindow',
    width: 320,
    height: 380,
    layout: 'vbox',
    title: '编辑',
    modal: true,//弹出窗口时后面背景不可编辑
    frame: true,
    closeAction: 'hide',
    closable: true,
    defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:10px 0px 0px 0px'},
    items: [
        {xtype: 'textfield', id: 'UPD_DRIVER_NAME', fieldLabel: '司机姓名'},
        {
            xtype: 'datefield',
            id: 'UPD_WORK_DATE',
            fieldLabel: '上岗时间',
            format: 'Y-m-d H:i:s',
            submitFormat: 'Y-m-d H:i:s'
        },
        {xtype: 'textfield', id: 'UPD_DRIVER_DE', fieldLabel: '司机定额'}],
    buttons: [{
        xtype: 'button', text: '保存', width: 40, handler: function () {
            _updateDriverSave();
        }
    }, {
        xtype: 'button', text: '取消', width: 40, handler: function () {
            Ext.getCmp('updateDriverWindow').hide();
        }
    }]
});

function _preSelectCarStore() {//查询机具的方法
    Ext.data.StoreManager.lookup('carStore').load({
        params: {
            V_V_CARCODE: Ext.getCmp('CAR_CODE_').getValue(),
            V_V_CARNAME: Ext.getCmp('CAR_NAME_').getValue()
        }
    });
}

function _insertCar() {
    Ext.getCmp('WIN_CAR_CODE_').setValue('');
    Ext.getCmp('WIN_CAR_NAME_').setValue('');
    Ext.getCmp('WIN_CAR_TYPE_').setValue('');
    Ext.getCmp('WIN_GS_').setValue('');
    Ext.getCmp('WIN_CAR_INDATE_').setValue('');
    Ext.getCmp('WIN_DE_').setValue('');
    Ext.getCmp('insertCarWindow').show();
}

function _updateCar() {
    var records = Ext.getCmp('carPanel').getSelectionModel().getSelection();
    if (records.length != 1) {
        Ext.Msg.alert("操作信息", '请选择一条数据进行修改！');
        return false;
    }
    updCarGuid = records[0].data.V_GUID;
    Ext.getCmp('WIN2_CAR_CODE_').setValue(records[0].data.V_CARCODE);
    Ext.getCmp('WIN2_CAR_NAME_').setValue(records[0].data.V_CARNAME);
    Ext.getCmp('WIN2_CAR_TYPE_').setValue(records[0].data.V_CARTYPE);
    Ext.getCmp('WIN2_GS_').setValue(records[0].data.V_CARGUISUO);
    Ext.getCmp('WIN2_FLAG_').setValue(records[0].data.V_FLAG);
    //将时间截取
    Ext.getCmp('WIN2_CAR_INDATE_').setValue((records[0].data.V_CARINDATE).substring(0, 19));
    Ext.getCmp('WIN2_DE_').setValue(records[0].data.V_DE);
    Ext.getCmp('updateCarWindow').show();

}

function _insertCarSave() {
    Ext.Ajax.request({
        url: AppUrl + 'CarManage/BASE_EXAMINE_CAR_INS',
        method: 'POST',
        async: false,
        params: {
            V_V_CARCODE: Ext.getCmp('WIN_CAR_CODE_').getValue(),
            V_V_CARNAME: Ext.getCmp('WIN_CAR_NAME_').getValue(),
            V_V_CARTYPE: Ext.getCmp('WIN_CAR_TYPE_').getValue(),
            V_V_CARGUISUO: Ext.getCmp('WIN_GS_').getValue(),
            V_V_CARINDATE: Ext.Date.format(Ext.getCmp('WIN_CAR_INDATE_').getValue(), 'Y-m-d'),
            V_V_FLAG: Ext.getCmp('WIN_FLAG_').getValue(),
            V_V_CARINFO: '',
            V_V_DE: Ext.getCmp('WIN_DE_').getValue()
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);
            if (data.INFO == 'SUCCESS') {
                Ext.getCmp('insertCarWindow').hide();
                Ext.Msg.alert("信息", "成功！");
                _preSelectCarStore();
            } else {
                Ext.Msg.alert("信息", "失败！");
            }
        }
    });
}

function _updateCarSave() {
    Ext.Ajax.request({
        url: AppUrl + 'CarManage/BASE_EXAMINE_CAR_UPD',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID: updCarGuid,
            V_V_CARCODE: Ext.getCmp('WIN2_CAR_CODE_').getValue(),
            V_V_CARNAME: Ext.getCmp('WIN2_CAR_NAME_').getValue(),
            V_V_CARTYPE: Ext.getCmp('WIN2_CAR_TYPE_').getValue(),
            V_V_CARGUISUO: Ext.getCmp('WIN2_GS_').getValue(),
            V_V_CARINDATE: Ext.Date.format(Ext.getCmp('WIN_CAR_INDATE_').getValue(), 'Y-m-d'),
            V_V_FLAG: Ext.getCmp('WIN2_FLAG_').getValue(),
            V_V_CARINFO: '',
            V_V_DE: Ext.getCmp('WIN2_DE_').getValue()
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);
            if (data.INFO == 'SUCCESS') {
                Ext.getCmp('updateCarWindow').hide();
                Ext.Msg.alert("信息", "成功！");
                _preSelectCarStore();
            } else {
                Ext.Msg.alert("信息", "失败！");
            }
        }
    });
}

function _deleteCar() {
    var records = Ext.getCmp('carPanel').getSelectionModel().getSelection();
    Ext.Ajax.request({
        url: AppUrl + 'CarManage/BASE_EXAMINE_CAR_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID: records[0].data.V_GUID
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);
            if (data.INFO == 'success') {
                Ext.Msg.alert("信息", "成功！");
                _preSelectCarStore();
            } else {
                Ext.Msg.alert("信息", "失败！");
            }
        }
    });
}

function _disableCar() {
    var records = Ext.getCmp('carPanel').getSelectionModel().getSelection();
    Ext.Ajax.request({
        url: AppUrl + 'CarManage/BASE_EXAMINE_CAR_DIS',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID: records[0].data.V_GUID
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);
            if (data.INFO == 'success') {
                Ext.Msg.alert("信息", "成功！");
                _preSelectCarStore();
            } else {
                Ext.Msg.alert("信息", "失败！");
            }
        }
    });
}

function _selectDriver(V_GUID) {
    insDriverGuid = V_GUID;
    var driverStore = Ext.data.StoreManager.lookup('driverStore');
    driverStore.proxy.extraParams.V_V_GUID = V_GUID;
    driverStore.currentPage = 1;
    driverStore.load();
}

function _insertDriver() {
    Ext.getCmp('INS_DRIVER_GUID').setValue(Ext.data.IdGenerator.get('uuid').generate()).hide();
    Ext.getCmp('INS_CAR_GUID').setValue(insDriverGuid).hide();
    Ext.getCmp('INS_DRIVER_NAME').setValue('');
    Ext.getCmp('INS_WORK_DATE').setValue('');
    Ext.getCmp('INS_DRIVER_DE').setValue('');

    Ext.getCmp('insertDriverWindow').show();
}

function _insertDriverSave() {
    Ext.Ajax.request({
        url: AppUrl + 'CarManage/BASE_DRIVER_INS',
        method: 'POST',
        async: false,
        params: {
            V_V_DRIVER_GUID: Ext.getCmp('INS_DRIVER_GUID').getValue(),
            V_V_CAR_GUID: Ext.getCmp('INS_CAR_GUID').getValue(),
            V_V_DRIVER_NAME: Ext.getCmp('INS_DRIVER_NAME').getValue(),
            V_V_WORK_DATE: Ext.Date.format(Ext.getCmp('INS_WORK_DATE').getValue(), 'Y-m-d'),
            V_V_DRIVER_DE: Ext.getCmp('INS_DRIVER_DE').getValue()
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);
            if (data.INFO == 'SUCCESS') {
                Ext.getCmp('insertDriverWindow').hide();
                Ext.Msg.alert("信息", "成功！");
                var driverStore = Ext.data.StoreManager.lookup('driverStore');
                driverStore.currentPage = 1;
                driverStore.load();
            } else {
                Ext.Msg.alert("信息", "失败！");
            }
        }
    });
}

function _updateDriver() {//修改司机详情
    var records = Ext.getCmp('driverPanel').getSelectionModel().getSelection();
    if (records.length != 1) {
        Ext.Msg.alert("操作信息", '请选择一条数据进行修改！');
        return false;
    }
    updDriverGuid = records[0].data.V_GUID;
    Ext.getCmp('UPD_DRIVER_NAME').setValue(records[0].data.V_DRIVER_NAME);
    Ext.getCmp('UPD_WORK_DATE').setValue((records[0].data.V_WORK_DATE).substring(0, 19));
    Ext.getCmp('UPD_DRIVER_DE').setValue(records[0].data.V_DRIVER_DE);
    Ext.getCmp('updateDriverWindow').show();
}

function _updateDriverSave() {
    Ext.Ajax.request({
        url: AppUrl + 'CarManage/BASE_DRIVER_UPD',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID: updDriverGuid,
            V_V_DRIVER_NAME: Ext.getCmp('UPD_DRIVER_NAME').getValue(),
            V_V_WORK_DATE: Ext.Date.format(Ext.getCmp('INS_WORK_DATE').getValue(), 'Y-m-d'),
            V_V_DRIVER_DE: Ext.getCmp('UPD_DRIVER_DE').getValue()
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);
            if (data.INFO == 'SUCCESS') {
                Ext.getCmp('updateDriverWindow').hide();
                Ext.Msg.alert("信息", "成功！");
                var driverStore = Ext.data.StoreManager.lookup('driverStore');
                driverStore.currentPage = 1;
                driverStore.load();
            } else {
                Ext.Msg.alert("信息", "失败！");
            }
        }
    });
}

function _deleteDriver() {
    var records = Ext.getCmp('driverPanel').getSelectionModel().getSelection();
    Ext.Ajax.request({
        url: AppUrl + 'CarManage/BASE_DRIVER_DEL',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID: records[0].data.V_GUID
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);
            if (data.INFO == 'success') {
                Ext.Msg.alert("信息", "成功！");
                var driverStore = Ext.data.StoreManager.lookup('driverStore');
                driverStore.currentPage = 1;
                driverStore.load();
            } else {
                Ext.Msg.alert("信息", "失败！");
            }
        }
    });
}

function _selectCarUseDetail(V_GUID) {
    var carUseDetailStore = Ext.data.StoreManager.lookup('carUseDetailStore');
    carUseDetailStore.proxy.extraParams.V_V_GUID = V_GUID;
    carUseDetailStore.currentPage = 1;
    carUseDetailStore.load();
}

function _selectRepairInfo(V_GUID) {
    var repairInfoStore = Ext.data.StoreManager.lookup('repairInfoStore');
    repairInfoStore.proxy.extraParams.V_V_CAR_GUID = V_GUID;
    repairInfoStore.currentPage = 1;
    repairInfoStore.load();
}

function TreeChecked(TreeChecked) {
    _queryEquDetail();
    _queryEquLink();
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

function _selectCarDestroy(V_GUID) {
    Ext.Ajax.request({
        url: AppUrl + 'CarManage/BASE_EXAMINE_CAR_BYGUID_SEL',
        method: 'POST',
        params: {
            V_V_GUID: V_GUID
        },
        success: function (resp) {
            var resp = Ext.decode(resp.responseText);
            var sub_date = Ext.util.Format.number(resp.list[0].SUB_DATE,'0.00');
            if (resp.list.length != 0) {
                Ext.getCmp('jjbm_').setValue(resp.list[0].V_CARCODE);//机具编码
                Ext.getCmp('jjmc_').setValue(resp.list[0].V_CARNAME);//机具名称
                Ext.getCmp('jjcgsj_').setValue(resp.list[0].V_CARINDATE);//机具采购时间
                Ext.getCmp('jjcgfy_').setValue(resp.list[0].V_PRICE);//机具采购费用
                Ext.getCmp('jjssjg_').setValue(resp.list[0].V_CARGUISUO);//机具所属机构
                Ext.getCmp('jjsysc_').setValue(sub_date);//机具使用时长
                Ext.getCmp('jjbfyy_').setValue(resp.list[0].V_REASON);//机具报废原因
            }
        }
    });
}

function _queryEquLink() {
    var records = Ext.getCmp('sblxTree').getSelectionModel().getSelection();
        var sbbgStore = Ext.data.StoreManager.lookup('sbbgStore');
        sbbgStore.proxy.extraParams.V_V_EQUCODE = records[0].data.sid;
        sbbgStore.currentPage = 1;
        sbbgStore.load();
}

function _selectDept() {//动态加载子数据集（作业区的数据集）
    var zyqStore = Ext.data.StoreManager.lookup('zyqStore');
    zyqStore.proxy.extraParams.V_V_DEPTCODE = Ext.getCmp('ck').getValue();
    zyqStore.load();
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

function _deleteLink() {
    var records = Ext.getCmp('sbbgPanel').getSelectionModel().getSelection();
    Ext.Ajax.request({
        url: AppUrl + 'CarManage/BASE_EXAMINE_CAR_LINKDEL',
        method: 'POST',
        async: false,
        params: {
            V_V_EQUCODE: records[0].data.V_EQUCODE
        },
        success: function (resp) {
            var data = Ext.decode(resp.responseText);
            if (data.INFO == 'SUCCESS') {
                Ext.Msg.alert("信息", "成功！");
                var driverStore = Ext.data.StoreManager.lookup('driverStore');
                driverStore.currentPage = 1;
                driverStore.load();
            } else {
                Ext.Msg.alert("信息", "失败！");
            }
        }
    });
}

function _preViewImage(V_GUID) {
    var url = AppUrl + 'CarManage/BASE_FILE_IMAGE_SEL?V_V_GUID=' + V_GUID;
    Ext.getCmp("browseImage").getEl().dom.src = url;
}

function _carUseDetail() {//查看的弹出窗口
    var records = Ext.getCmp('driverPanel').getSelectionModel().getSelection();
    var CCDetailStore = Ext.data.StoreManager.lookup('CCDetailStore');
    CCDetailStore.proxy.extraParams.V_V_GUID = records[0].data.V_GUID;
    CCDetailStore.currentPage = 1;
    CCDetailStore.load();
    Ext.getCmp('chakancar').show();

}

