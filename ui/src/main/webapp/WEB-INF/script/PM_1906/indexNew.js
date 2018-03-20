Ext.onReady(function () {
    //Ext.getBody().mask('<p>页面载入中...</p>');

    //厂矿
    var plantStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'plantStore',
        fields: ['DEPT_CODE_', 'DEPT_NAME_'],
        proxy: {
            type: 'ajax',
            async: false,
            url: APP + '/YS/selectProBaseDeptView',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'I_DEPT_CODE_': '',
                'I_DEPT_TYPE_': '[基层单位]'
            }
        }
    });

    //作业区
    var deptStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'deptStore',
        fields: ['DEPT_CODE_', 'DEPT_NAME_'],
        proxy: {
            type: 'ajax',
            async: false,
            url: APP + '/YS/selectProBaseDeptView',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    //左上表格store
    var zuoshangStore = Ext.create('Ext.data.Store', {
        storeId: 'zuoshangStore',
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

    //司机
    var grid1Store = Ext.create('Ext.data.Store', {
        storeId: 'grid1Store',
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

    //机具使用明细
    var jjsymxStore = Ext.create('Ext.data.Store', {
        storeId: 'jjsymxStore',
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

    //维修信息
    var wxxxStore = Ext.create('Ext.data.Store', {
        storeId: 'wxxxStore',
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

    //关联设备表格
    var sbbgStore = Ext.create('Ext.data.Store', {
        storeId: 'sbbgStore',
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

    var buttonPanel = Ext.create('Ext.Panel', {
        id: 'buttonPanel',
        title: '<div align="center">机具管理</div>',
        frame: true,
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:5px 0px 5px 10px'},
        items: [{
            xtype: 'textfield',
            id: 'JJBM',
            fieldLabel: '机具编码',
            editable: false,
            labelWidth: 70,
            style: 'margin:5px 0px 5px 0px',
            labelAlign: 'right',
            queryMode: 'local'
        },
            {
                xtype: 'textfield',
                id: 'JJMC',
                fieldLabel: '机具名称',
                editable: false,
                labelWidth: 70,
                style: 'margin:5px 0px 5px 0px',
                labelAlign: 'right',
                queryMode: 'local'
            },
            {
                xtype: 'button',
                text: '查询',
                icon: imgpath + '/search.png',
                style: 'margin:5px 0px 5px 20px',
                width: 60,
                handler: _selectMatStorageLevel
            },
            {xtype: 'button', text: '添加', icon: imgpath + '/add.png', width: 60, handler: _preInsertMatStorageLevel},
            {xtype: 'button', text: '修改', icon: imgpath + '/edit.png', width: 60, handler: _preUpdateMatStorageLevel},
            {xtype: 'button', text: '删除', icon: imgpath + '/delete1.png', width: 60, handler: _deleteMatStorageLevel},
            {xtype: 'button', text: '报废', icon: imgpath + '/delete1.png', width: 60, handler: _deleteMatStorageLevel}]
    });


    //左上表格
    var Panel1 = Ext.create('Ext.grid.Panel', {
        id: 'Panel1',
        store: zuoshangStore,
        frame: true,
        //baseCls: 'my-panel-no-border',
        border: false,
        columnLines: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '机具编码', dataIndex: 'jjbm_', style: 'text-align: center;', flex: 1},
            {text: '机具名称', dataIndex: 'jjmc_', style: 'text-align: center;', flex: 1},
            {text: '机具类型', dataIndex: 'jjlx_', style: 'text-align: center;', flex: 1},
            {text: '机具归属', dataIndex: 'jjgs_', style: 'text-align: center;', flex: 1},
            {text: '机具入厂时间', dataIndex: 'jjrcsj_', style: 'text-align: center;', flex: 1},
            {text: '机具定额', dataIndex: 'jjde_', style: 'text-align: center;', flex: 1},
            {text: '机具状态', dataIndex: 'jjzt_', style: 'text-align: center;', flex: 1}],
        bbar: [{
            id: 'grid1page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
            //store: 'grid3Store'
        }]
    });

    //左下机具示意图
    var Panel2 = Ext.create("Ext.form.Panel", {
        id: 'Panel2',
        editable: false,
        frame: true,
        region: 'center',
        title: '机具示意图',
        items: [{
            layout: 'column',
            defaults: {labelAlign: 'right'},
            items: [{
                xtype: 'image',
                src: imgpath + '/111.jpg'
                /* id: 'browseImage',
                 fieldLabel: "预览图片",
                 autoEl: {width: window.screen.width / 2 - 110, height: window.screen.height / 2 + 38, tag: 'input', type: 'image', src: imgpath + '/111.jpg'
                 }*/
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
            handler: _preInsertMatStorageLevel
        },
            {xtype: 'button', text: '修改', icon: imgpath + '/edit.png', width: 60, handler: _preUpdateMatStorageLevel},
            {xtype: 'button', text: '删除', icon: imgpath + '/delete1.png', width: 60, handler: _deleteMatStorageLevel},]
    });

    var Panel3 = Ext.create("Ext.grid.Panel", {
        id: 'Panel3',
        store: 'grid1Store',
        columnLines: true,
        frame: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '司机姓名', dataIndex: 'PRODUCT_NAME_', style: 'text-align: center;', flex: 1},
            {text: '上岗时间', dataIndex: 'PRODUCT_NAME_', style: 'text-align: center;', flex: 1},
            {text: '司机定额', dataIndex: 'PRODUCT_NAME_', style: 'text-align: center;', flex: 1},
            {text: '出车明细', dataIndex: 'PRODUCT_NAME_', style: 'text-align: center;', flex: 1}],
        bbar: [{
            id: 'grid2page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
            //store: 'grid3Store'
        }]
    });

    var sjxqPanel = Ext.create('Ext.panel.Panel', {
        title: '司机详情',
        region: 'center',
        layout: 'border',
        border: false,
        frame: true,
        width: 250,
        items: [{region: 'north', items: [button1]}, {region: 'center', layout: 'fit', items: [Panel3]}]

    });

    var jjsymxPanel = Ext.create("Ext.grid.Panel", {
        id: 'jjsymxPanel',
        title: '机具使用明细',
        columnLines: true,
        region: 'center',
        store: 'jjsymxStore',
        //baseCls: 'my-panel-no-border',
        border: false,
        frame: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '机具编码', dataIndex: 'PRODUCT_NAME_', style: 'text-align: center;', flex: 1},
            {text: '机具名称', dataIndex: 'PRODUCT_NAME_', style: 'text-align: center;', flex: 1},
            {text: '使用开始时间', dataIndex: 'PRODUCT_NAME_', style: 'text-align: center;', flex: 1},
            {text: '使用地点', dataIndex: 'PRODUCT_NAME_', style: 'text-align: center;', flex: 1},
            {text: '使用台时', dataIndex: 'PRODUCT_NAME_', style: 'text-align: center;', flex: 1},
            {text: '机具定额', dataIndex: 'PRODUCT_NAME_', style: 'text-align: center;', flex: 1},
            {text: '司机姓名', dataIndex: 'PRODUCT_NAME_', style: 'text-align: center;', flex: 1},
            {text: '用途', dataIndex: 'PRODUCT_NAME_', style: 'text-align: center;', flex: 1}],
        bbar: [{
            id: 'grid3page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
            //store: 'grid3Store'
        }]
    });

    var wxxxPanel = Ext.create('Ext.grid.Panel', {
        id: 'wxxxPanel',
        title: '维修信息',
        region: 'center',
        columnLines: true,
        store: wxxxStore,
        //selType: 'checkboxmodel',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '机具编码', dataIndex: 'jjbm_', align: 'center', flex: 1},
            {text: '机具名称', dataIndex: 'jjmc_', align: 'center', flex: 1},
            {text: '维修时间', dataIndex: 'wxsj_', align: 'center', flex: 1},
            {text: '维修明细', dataIndex: 'wxmx_', align: 'center', flex: 1},
            {text: '维修工单号', dataIndex: 'wxgdh_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid4page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
            //store: 'grid3Store'
        }]
    });

    var gzPanel = Ext.create('Ext.grid.Panel', {
        id: 'gzPanel',
        title: '工种',
        region: 'center',
        columnLines: true,
        store: gzStore,
        //selType: 'checkboxmodel',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工种编码', dataIndex: 'gzbm_', align: 'center', flex: 1},
            {text: '工种名称', dataIndex: 'gzmc_', align: 'center', flex: 1},
            {text: '工种类型', dataIndex: 'gzlx_', align: 'center', flex: 1},
            {text: '台时', dataIndex: 'ts_', align: 'center', flex: 1}],
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
        store: gjStore,
        //selType: 'checkboxmodel',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工具编码', dataIndex: 'gjbm_', align: 'center', flex: 1},
            {text: '工具名称', dataIndex: 'gjmc_', align: 'center', flex: 1},
            {text: '使用时间', dataIndex: 'sysj_', align: 'center', flex: 1},
            {text: '使用地点', dataIndex: 'sydd_', align: 'center', flex: 1},
            {text: '使用台时', dataIndex: 'syts_', align: 'center', flex: 1},
            {text: '用途', dataIndex: 'yt_', align: 'center', flex: 1}],
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
        store: jjStore,
        //selType: 'checkboxmodel',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '机具编码', dataIndex: 'jjbm_', align: 'center', flex: 1},
            {text: '机具名称', dataIndex: 'jjmc_', align: 'center', flex: 1},
            {text: '机具类型', dataIndex: 'jjlx_', align: 'center', flex: 1},
            {text: '台时', dataIndex: 'ts_', align: 'center', flex: 1}],
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
        store: wlStore,
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '物料编码', dataIndex: 'wlbm_', align: 'center', flex: 1},
            {text: '物料描述', dataIndex: 'wlms_', align: 'center', flex: 1},
            {text: '规格型号', dataIndex: 'ggbh_', align: 'center', flex: 1},
            {text: '计量单位', dataIndex: 'jldw_', align: 'center', flex: 1},
            {text: '使用数量', dataIndex: 'sysl_', align: 'center', flex: 1},
            {text: '单价', dataIndex: 'dj_', align: 'center', flex: 1}],
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
        items: [wxxxPanel, gzPanel, gjPanel, jjPanel, wlPanel]
    });

    //关联设备下拉框
    var Panel4 = Ext.create('Ext.Panel', {
        id: 'Panel4',
        frame: true,
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 50, inputWidth: 140, style: 'margin:5px 0px 5px 20px'},
        items: [{
            xtype: 'combo',
            id: 'plant',
            store: plantStore,
            queryMode: 'local',
            valueField: 'DEPT_CODE_',
            displayField: 'DEPT_NAME_',
            emptyText: '全部',
            labelWidth: 35,
            forceSelection: true,
            fieldLabel: '厂矿'
        }, {
            xtype: 'combo',
            id: 'dept',
            store: deptStore,
            queryMode: 'local',
            valueField: 'DEPT_CODE_',
            displayField: 'DEPT_NAME_',
            emptyText: '全部',
            forceSelection: true,
            fieldLabel: '作业区'
        }]
    });

    //关联设备类型树
    var sblxTree = Ext.create('Ext.tree.Panel', {
        id: 'sblxTree',
        title: '设备类型树',
        region: 'west',
        width: '30%',
        rootVisible: false,
        autoLoad: false,
        border: false,
        autoScroll: true,
        store: Ext.create('Ext.data.TreeStore', {
            fields: ['id', 'text', 'parentid', 'sid']
        }),
        listeners: {
            itemclick: profesTreeitemclick
        }
    });

    //关联设备信息
    var sbxxPanel = Ext.create('Ext.form.Panel', {
        id: 'sbxxPanel',
        frame: true,
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 200, style: 'margin:5px 0px 5px 0px'},
        items: [{
            xtype: 'textfield',
            name: 'UP_CODE_',
            style: 'margin:20px 0px 5px 0px',
            fieldLabel: '设备编码:',
            maxLength: 60,
            allowBlank: false
        },
            {xtype: 'textfield', name: 'CAT_NAME_', fieldLabel: '设备名称:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', name: 'CAT_CODE_', fieldLabel: '设备类型编号:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', name: "CAT_CODE_", fieldLabel: '设备类型位置', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', name: 'CAT_CODE_', fieldLabel: '位置编码:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', name: 'CAT_CODE_', fieldLabel: '位置名称:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', name: 'CAT_CODE_', fieldLabel: '设备类型:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', name: 'CAT_CODE_', fieldLabel: '设备种类:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', name: 'CAT_CODE_', fieldLabel: 'ABC标识:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', name: 'CAT_CODE_', fieldLabel: '开始日期:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', name: 'CAT_CODE_', fieldLabel: '结束日期:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', name: 'CAT_CODE_', fieldLabel: '成本中心:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', name: 'CAT_CODE_', fieldLabel: '规格型号:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', name: 'CAT_CODE_', fieldLabel: '大小/尺寸:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', name: 'CAT_CODE_', fieldLabel: '资产制造商:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', name: 'CAT_CODE_', fieldLabel: '购置价值:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', name: 'CAT_CODE_', fieldLabel: '对象重量:', maxLength: 60, allowBlank: false},]
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
            {text: '设备编码', dataIndex: 'V_PERSONNAME', align: 'center', flex: 1},
            {text: '设备名称', dataIndex: 'V_WORKNAME', align: 'center', flex: 1},
            {text: '功能位置', dataIndex: 'V_DE', align: 'center', flex: 1},
            {text: '关联时间', dataIndex: 'V_WORKNAME', align: 'center', flex: 1},
            {text: '关联人', dataIndex: 'V_WORKNAME', align: 'center', flex: 1},
            {text: '取消关联', dataIndex: 'V_WORKNAME', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid9page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
            //store: 'grid3Store'
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
        items: [{xtype: 'textfield', name: 'UP_CODE_', fieldLabel: '机具编码:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', name: 'CAT_NAME_', fieldLabel: '机具名称:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', name: 'CAT_CODE_', fieldLabel: '机具采购时间:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', name: "CAT_CODE_", fieldLabel: '机具采购费用', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', name: 'CAT_CODE_', fieldLabel: '机具所属机构:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', name: 'CAT_CODE_', fieldLabel: '机具使用时长:', maxLength: 60, allowBlank: false},
            {xtype: 'textareafield', name: 'CAT_CODE_', fieldLabel: '机具报废原因:', maxLength: 60, allowBlank: false}]
    });

    //机具报废审批
    var jjbfspPanel = Ext.create('Ext.grid.Panel', {
        id: 'jjbfspPanel',
        title: "机具报废审批流程",
        columnLines: true,
        store: jjbfspStore,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '审批步骤', dataIndex: 'V_PERSONNAME', align: 'center', flex: 1},
            {text: '审批时间', dataIndex: 'V_WORKNAME', align: 'center', flex: 1},
            {text: '审批意见', dataIndex: 'V_DE', align: 'center', flex: 1}],
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
        id: 'tab1',
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
            items: [Panel1]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [Panel2]
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
            items: [buttonPanel]
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
    _selectMatStorageLevel();
});

function _init() {
    if (true) {
        _selectMatStorageLevel();
        //Ext.getBody().unmask();
    }
}

function _selectCOM_CODE_() {
}

function _selectMatStorageLevel() {
}

function _preInsertMatStorageLevel() {
}

function _preUpdateMatStorageLevel() {
}

function profesTreeitemclick() {
    alert(111111);
}

function _deleteMatStorageLevel() {
}
