Ext.onReady(function () {
//厂矿
    var ckStore = Ext.create('Ext.data.Store', {
        id: 'ckStore',
        autoLoad: true,
        fields: ['_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
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
        }
    });

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

    //技术要求右边tab—缺陷明细
    var qxmxStore = Ext.create('Ext.data.Store', {
        storeId: 'qxmxStore',
        autoLoad: false,
        pageSize: 2,
        fields: ['data_'],
        data: [['查看'], ['查看'], ['查看'], ['查看'], ['查看']],
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

//顶部查询条件
    var inputPanel = Ext.create('Ext.Panel', {
        id: 'inputPanel',
        title: '<div align="center">检修模型管理</div>',
        frame: true,
        border: false,
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:5px 0px 5px 10px'},
        items: [
            {
                xtype: 'combo',
                id: 'plant',
                store: ckStore,
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                fieldLabel: '厂矿',
                emptyText: '全部',
                editable: false,
                labelWidth: 40
            }, {
                xtype: 'combo',
                id: 'dept',
                store: ckStore,
                style: 'margin:5px 0px 5px 20px',
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                fieldLabel: '作业区',
                emptyText: '全部',
                editable: false,
                labelWidth: 40
            },
            {
                xtype: 'button',
                text: '查询',
                icon: imgpath + '/search.png',
                style: 'margin:5px 0px 5px 30px',
                width: 60,
                handler: _query
            },
            {
                xtype: 'button',
                text: '添加',
                icon: imgpath + '/add.png',
                width: 60,
                handler: _add
            },
            {
                xtype: 'button',
                text: '修改',
                icon: imgpath + '/edit.png',
                width: 60,
                handler: _update
            },
            {
                xtype: 'button',
                text: '删除',
                icon: imgpath + '/delete1.png',
                width: 60,
                handler: _delete
            }]
    });

    var treeStore = Ext.create('Ext.data.TreeStore', {
        id: 'treeStore',
        root: {
            expanded: true,
            children: [{
                text: '设备类型',
                expanded: true,
                children: [{
                    text: '设备类型1',
                    expanded: true,
                    children: [{
                        text: '设备名称',
                        leaf: true
                    }]
                }, {
                    text: '设备类型2',
                    leaf: true
                }, {
                    text: '设备类型3',
                    leaf: true
                }]
            }]
        }
    });

    //左上设备类型树
    var sblxTree = Ext.create('Ext.tree.Panel', {
        id: 'sblxTree',
        //title: '设备类型树',
        region: 'west',
        width: '20%',
        rootVisible: false,
        hideHeaders: true,
        rowLines: false,
        columnLines: false,
        frame: true,
        autoScroll: true,
        store: 'treeStore'
    });

//左上表格1
    var gridPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel1',
        store: gridStore,
        frame: true,
        columnLines: true,
        border: false,
        region: 'north',
        height: '50%',
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '检修模型编码', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '检修模型名称', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '模型版本号', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '网络施工图', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '备注', dataIndex: 'data_', style: 'text-align: center;', flex: 1}],
        bbar: [{
            id: 'grid1page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //左上表格2
    var gridPanel2 = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel2',
        store: gridStore,
        //baseCls: 'my-panel-no-border',
        columnLines: true,
        border: false,
        frame: true,
        region: 'center',
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '检修模型名称', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '工序名称', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '工序内容', dataIndex: 'data_', style: 'text-align: center;', flex: 1}],
        bbar: [{
            id: 'grid2page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //左上
    var zuoshangPanel = Ext.create('Ext.Panel', {
        id: 'zuoshangPanel',
        frame: true,
        border: false,
        layout: {type: 'border', regionWeights: {north: 3, east: 1, south: 1, west: 4}},
        items: [sblxTree, gridPanel1, gridPanel2]
    });

    //左下检修模型网络施工图
    var jxmxsgtPanel = Ext.create("Ext.form.Panel", {
        id: 'jxmxsgtPanel',
        editable: false,
        frame: true,
        region: 'center',
        title: '检修模型网络施工图',
        items: [{
            layout: 'column',
            defaults: {labelAlign: 'right'},
            items: [{
                xtype: 'image',
                src: imgpath + '/111.jpg'
            }]
        }]
    });

    //工种
    var gzPanel = Ext.create('Ext.grid.Panel', {
        id: 'gzPanel',
        title: '工种',
        columnLines: true,
        store: gridStore,
        //selType: 'checkboxmodel',
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工种编码', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工种名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工种类型', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工种类型', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工种定额', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工种台时', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid3page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //机具表格1
    var jjPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'jjPanel1',
        columnLines: true,
        store: gridStore,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '机具名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '机具类型', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '机具定额', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '机具台时', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid4page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //机具信息1
    var jjxxPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'jjxxPanel1',
        title: '机具信息',
        columnLines: true,
        store: gridStore,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '机具名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '机具类型', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '机具定额', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '机具台时', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid5page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //机具panel
    var jjPanel = Ext.create('Ext.Panel', {
        id: 'jjPanel',
        title: '机具',
        frame: true,
        baseCls: 'my-panel-no-border',
        border: false,
        layout: {type: 'border', regionWeights: {north: 3, east: 1, south: 1, west: 4}},
        items: [{
            region: 'north',
            height: '50%',
            layout: 'fit',
            items: [jjPanel1]
        }, {
            region: 'center',
            layout: 'fit',
            items: [jjxxPanel1]
        }]
    });

    //工具表格1
    var gjPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'gjPanel1',
        columnLines: true,
        store: gridStore,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '机具名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '机具类型', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '机具定额', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '机具台时', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid6page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //机具信息2
    var jjxxPanel2 = Ext.create('Ext.grid.Panel', {
        id: 'jjxxPanel2',
        title: '机具信息',
        columnLines: true,
        store: gridStore,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工具编码', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工具名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工具存在地', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工具入厂时间', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工具状态', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid7page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //工具panel
    var gjPanel = Ext.create('Ext.Panel', {
        id: 'gjPanel',
        title: '工具',
        frame: true,
        baseCls: 'my-panel-no-border',
        border: false,
        layout: {type: 'border', regionWeights: {north: 3, east: 1, south: 1, west: 4}},
        items: [{
            region: 'north',
            height: '50%',
            layout: 'fit',
            items: [gjPanel1]
        }, {
            region: 'center',
            layout: 'fit',
            items: [jjxxPanel2]
        }]
    });

    //物料表格1
    var wlPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'wlPanel1',
        columnLines: true,
        region: 'north',
        height: '40%',
        store: gridStore,
        autoScroll: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '物料编码', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '物料名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '数量', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '删除', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid8page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //物料库房信息
    var wlkfxxPanel = Ext.create('Ext.grid.Panel', {
        id: 'wlkfxxPanel',
        title: '物料库房信息',
        columnLines: true,
        region: 'center',
        store: gridStore,
        autoScroll: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '库房编码', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '库房名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '物料编码', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '物料名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '库存量', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '采购单价', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '距上次采购时间', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '是否提醒库管员生成采购单', dataIndex: 'data_', align: 'center', flex: 2}],
        bbar: [{
            id: 'grid9page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //物料panel
    var wlPanel = Ext.create('Ext.Panel', {
        id: 'wlPanel',
        title: '物料',
        baseCls: 'my-panel-no-border',
        frame: true,
        layout: 'border',
        items: [wlPanel1, wlkfxxPanel]
    });

    //安全措施左上表格
    var aqcsPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'aqcsPanel1',
        columnLines: true,
        region: 'north',
        height: '53%',
        store: gridStore,
        autoScroll: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '安全措施编码', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '安全措施名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '安全措施版本号', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '删除', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid10page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //安全措施左下表单
    var aqcsPanel2 = Ext.create('Ext.form.Panel', {
        id: 'aqcsPanel2',
        border: false,
        region: 'center',
        frame: true,
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 300, style: 'margin:20px 0px 10px 50px'},
        items: [{xtype: 'textfield', name: 'UP_CODE_', fieldLabel: '安全措施编码:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', name: 'CAT_NAME_', fieldLabel: '安全措施名称:', maxLength: 60, allowBlank: false},
            {xtype: 'textareafield', name: 'CAT_CODE_', fieldLabel: '安全措施明细:', maxLength: 60, allowBlank: false},
            {xtype: 'textareafield', name: "CAT_CODE_", fieldLabel: '安全措施注意事项', maxLength: 60, allowBlank: false}]
    });

    //安全措施—安全措施预案表格
    var aqcsyaPanel = Ext.create('Ext.grid.Panel', {
        id: 'aqcsyaPanel',
        columnLines: true,
        title: '安全措施预案',
        store: gridStore,
        autoScroll: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '预案编码', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '预案名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '预案详情', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '附件', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid11page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //安全措施—安全事故案例表格
    var aqsgalPanel = Ext.create('Ext.grid.Panel', {
        id: 'aqsgalPanel',
        columnLines: true,
        title: '安全事故案例',
        store: gridStore,
        autoScroll: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '事故发生时间', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '事故发生地点', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '事故影响', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '事故详情', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '附件', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid12page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //安全措施整改—整改信息
    var zgxxPanel = Ext.create('Ext.grid.Panel', {
        id: 'zgxxPanel',
        store: 'gridStore',
        title: '整改信息',
        columnLines: true,
        //baseCls: 'my-panel-no-border',
        //frame:'true',
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '整改时间', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '整改地点', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '整改负责人', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '整改方案明细', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '整改费用', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '附件', dataIndex: 'data_', style: 'text-align: center;', flex: 1}],
        bbar: [{
            id: 'grid13page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //安全措施整改—整改审批流程
    var zgsplcPanel = Ext.create('Ext.grid.Panel', {
        id: 'zgsplcPanel',
        store: 'gridStore',
        title: '整改审批流程',
        columnLines: true,
        //baseCls: 'my-panel-no-border',
        //frame:'true',
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: ' ', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: ' ', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: ' ', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: ' ', dataIndex: 'data_', style: 'text-align: center;', flex: 1}],
        bbar: [{
            id: 'grid14page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //安全措施整改—整改进度
    var zgjdPanel = Ext.create('Ext.grid.Panel', {
        id: 'zgjdPanel',
        store: 'gridStore',
        title: '整改进度',
        columnLines: true,
        //baseCls: 'my-panel-no-border',
        //frame:'true',
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: ' ', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: ' ', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: ' ', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: ' ', dataIndex: 'data_', style: 'text-align: center;', flex: 1}],
        bbar: [{
            id: 'grid15page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //安全措施整改—人工
    var rgPanel = Ext.create('Ext.grid.Panel', {
        id: 'rgPanel',
        title: '人工',
        columnLines: true,
        store: gridStore,
        //selType: 'checkboxmodel',
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工种编码', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工种名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工种类型', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '台时', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid16page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
            //store: 'grid3Store'
        }]
    });

    //安全措施整改—工具
    var aq_gjPanel = Ext.create('Ext.grid.Panel', {
        id: 'aq_gjPanel',
        title: '工具',
        columnLines: true,
        store: gridStore,
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
            id: 'grid17page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
            //store: 'grid3Store'
        }]
    });

    //安全措施整改—机具
    var aq_jjPanel = Ext.create('Ext.grid.Panel', {
        id: 'aq_jjPanel',
        title: '机具',
        columnLines: true,
        store: gridStore,
        //selType: 'checkboxmodel',
        autoScroll: true,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '机具编码', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '机具名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '机具类型', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '台时', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid18page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
            //store: 'grid3Store'
        }]
    });

    //安全措施整改—整改工单
    var zggdPanel = Ext.create('Ext.grid.Panel', {
        id: 'zggdPanel',
        store: 'gridStore',
        title: '整改工单',
        columnLines: true,
        //baseCls: 'my-panel-no-border',
        //frame:'true',
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: ' ', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: ' ', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: ' ', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: ' ', dataIndex: 'data_', style: 'text-align: center;', flex: 1}],
        bbar: [{
            id: 'grid19page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //安全措施—安全措施整改tab
    var tab2 = Ext.create('Ext.tab.Panel', {
        id: 'tab2',
        title: '安全措施整改',
        frame: true,
        items: [zgxxPanel, zgsplcPanel, zgjdPanel, rgPanel, aq_gjPanel, aq_jjPanel, zggdPanel]
    });

    //安全措施—安全措施附件
    var aqcsfjPanel = Ext.create('Ext.grid.Panel', {
        id: 'aqcsfjPanel',
        columnLines: true,
        title: '安全措施附件',
        store: gridStore,
        autoScroll: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '附件名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '上传时间', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '上传人', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '下载', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid20page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //安全措施右边tab
    var tab1 = Ext.create('Ext.tab.Panel', {
        id: 'tab1',
        region: 'east',
        width: '53%',
        //border:'false',
        frame: true,
        items: [aqcsyaPanel, aqsgalPanel, tab2, aqcsfjPanel]
    });

    //安全措施panel
    var aqcsPanel = Ext.create('Ext.Panel', {
        id: 'aqcsPanel',
        title: '安全措施',
        baseCls: 'my-panel-no-border',
        frame: true,
        layout: {type: 'border', regionWeights: {north: 3, east: 4, south: 1, west: 1}},
        items: [aqcsPanel1, aqcsPanel2, tab1]
    });

    //已选检修技术标准按钮
    var jxjsbzButton = Ext.create('Ext.Panel', {
        id: 'jxjsbzButton',
        frame: true,
        title: '已选检修技术标准',
        region: 'north',
        border: false,
        layout: 'column',
        items: [{
            xtype: 'button', text: '删除', width: 60, style: 'margin:5px 0px 5px 10px',
            icon: imgpath + '/delete1.png', handler: _delete
        }]
    });

    //已选检修技术标准表格
    var jxjsbzPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'jxjsbzPanel1',
        columnLines: true,
        region: 'center',
        frame: true,
        store: gridStore,
        autoScroll: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '零件编号', dataIndex: 'data_', align: 'center', width: 80},
            {text: '零件名称', dataIndex: 'data_', align: 'center', width: 80},
            {text: '零件编码', dataIndex: 'data_', align: 'center', width: 80},
            {text: '材料', dataIndex: 'data_', align: 'center', width: 80},
            {
                text: '维修技术标准', dataIndex: 'data_', align: 'center', flex: 4,
                columns: [
                    {text: '图面尺寸', dataIndex: 'data_', align: 'center', flex: 1},
                    {text: '图面间隙', dataIndex: 'data_', align: 'center', flex: 1},
                    {text: '允许值(上限)', dataIndex: 'data_', align: 'center', flex: 1},
                    {text: '允许值(下限)', dataIndex: 'data_', align: 'center', flex: 1}]
            },
            {text: '更换周期', dataIndex: 'data_', align: 'center', width: 80},
            {text: '重量', dataIndex: 'data_', align: 'center', width: 80},
            {text: '图号', dataIndex: 'data_', align: 'center', width: 80},
            {text: '备注', dataIndex: 'data_', align: 'center', width: 80}],
        bbar: [{
            id: 'grid21page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //已选检修技术标准panel(技术要求左上)
    var jxjsbzPanel = Ext.create('Ext.Panel', {
        id: 'jxjsbzPanel',
        baseCls: 'my-panel-no-border',
        region: 'north',
        height: '50%',
        frame: true,
        layout: 'border',
        items: [jxjsbzButton, jxjsbzPanel1]
    });

    //子设备检修技术标准按钮
    var zsbjxButton = Ext.create('Ext.Panel', {
        id: 'zsbjxButton',
        frame: true,
        //baseCls: 'my-panel-no-border',
        region: 'north',
        border: false,
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 80, inputWidth: 140, style: 'margin:5px 0px 5px 10px'},
        items: [
            {xtype: 'textfield', name: 'zsbmc_', fieldLabel: '子设备名称:', maxLength: 60, allowBlank: false},
            {
                xtype: 'button',
                text: '查询',
                icon: imgpath + '/search.png',
                style: 'margin:5px 0px 5px 20px',
                width: 60,
                handler: _query
            },
            {xtype: 'button', text: '选择', icon: imgpath + '/add.png', width: 60, handler: _add}]
    });

    //子设备检修技术标准表格
    var zsbjxPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'zsbjxPanel1',
        columnLines: true,
        region: 'center',
        frame: true,
        store: gridStore,
        autoScroll: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '零件编号', dataIndex: 'data_', align: 'center', width: 80},
            {text: '零件名称', dataIndex: 'data_', align: 'center', width: 80},
            {text: '零件编码', dataIndex: 'data_', align: 'center', width: 80},
            {text: '材料', dataIndex: 'data_', align: 'center', width: 80},
            {
                text: '维修技术标准', dataIndex: 'data_', align: 'center', flex: 4,
                columns: [
                    {text: '图面尺寸', dataIndex: 'data_', align: 'center', flex: 1},
                    {text: '图面间隙', dataIndex: 'data_', align: 'center', flex: 1},
                    {text: '允许值(上限)', dataIndex: 'data_', align: 'center', flex: 1},
                    {text: '允许值(下限)', dataIndex: 'data_', align: 'center', flex: 1}]
            },
            {text: '更换周期', dataIndex: 'data_', align: 'center', width: 80},
            {text: '重量', dataIndex: 'data_', align: 'center', width: 80},
            {text: '图号', dataIndex: 'data_', align: 'center', width: 80},
            {text: '备注', dataIndex: 'data_', align: 'center', width: 80}],
        bbar: [{
            id: 'grid22page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //子设备检修技术标准panel（技术要求左下）
    var zsbjxPanel = Ext.create('Ext.Panel', {
        id: 'zsbjxPanel',
        baseCls: 'my-panel-no-border',
        region: 'center',
        frame: true,
        layout: 'border',
        items: [zsbjxButton, zsbjxPanel1]
    });

    //技术要求右边tab—工单明细
    var gdmxPanel = Ext.create('Ext.grid.Panel', {
        id: 'gdmxPanel',
        columnLines: true,
        title: '工单明细',
        //baseCls: 'my-panel-no-border',
        //frame: true,
        store: gridStore,
        autoScroll: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工单编号', dataIndex: 'data_', align: 'center', width: 80},
            {text: '工单创建日期', dataIndex: 'data_', align: 'center', width: 100},
            {text: '工单检修描述', dataIndex: 'data_', align: 'center', width: 100},
            {text: '工单类型', dataIndex: 'data_', align: 'center', width: 80},
            {text: '检修单位', dataIndex: 'data_', align: 'center', width: 80},
            {text: '检修标准值', dataIndex: 'data_', align: 'center', width: 80},
            {text: '工单状态', dataIndex: 'data_', align: 'center', width: 80}],
        bbar: [{
            id: 'grid23page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //技术要求右边tab—缺陷明细
    var qxmxPanel = Ext.create('Ext.grid.Panel', {
        id: 'qxmxPanel',
        columnLines: true,
        title: '缺陷明细',
        //baseCls: 'my-panel-no-border',
        //frame: true,
        store: qxmxStore,
        autoScroll: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '缺陷发现日期', dataIndex: 'data', align: 'center', flex: 1},
            {text: '缺陷明细', dataIndex: 'data', align: 'center', flex: 1},
            {text: '处理意见', dataIndex: 'data', align: 'center', flex: 1},
            {text: '缺陷状态', dataIndex: 'data', align: 'center', flex: 1},
            {
                text: '缺陷来源', dataIndex: 'data_', align: 'center', flex: 1,
                renderer: function (v) {
                    return "<span style='margin-right:10px'><a href='#' onclick='_open()'  >" + v + "</a></span>";
                }
            }],
        bbar: [{
            id: 'grid24page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //技术要求右边tab—更换历史
    var ghlsPanel = Ext.create('Ext.grid.Panel', {
        id: 'ghlsPanel',
        columnLines: true,
        title: '更换历史',
        //baseCls: 'my-panel-no-border',
        //frame: true,
        store: gridStore,
        autoScroll: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '更换时间', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '距上次更换周期', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '更换原因', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid25page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //技术要求右边tab—检修工种上面表格
    var jxgzPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'jxgzPanel1',
        columnLines: true,
        region: 'north',
        height: '50%',
        store: gridStore,
        autoScroll: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工种名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工种类型', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工种定额', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工种总台时', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid26page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //技术要求右边tab—检修工种下面表格
    var jxgzPanel2 = Ext.create('Ext.grid.Panel', {
        id: 'jxgzPanel2',
        columnLines: true,
        region: 'center',
        store: gridStore,
        autoScroll: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工种编码', dataIndex: 'data_', align: 'center', width: 80},
            {text: '工种名称', dataIndex: 'data_', align: 'center', width: 100},
            {text: '工种类型', dataIndex: 'data_', align: 'center', width: 100},
            {text: '工种等级', dataIndex: 'data_', align: 'center', width: 80},
            {text: '工种定额', dataIndex: 'data_', align: 'center', width: 80},
            {text: '工种台时', dataIndex: 'data_', align: 'center', width: 80},
            {text: '人员姓名', dataIndex: 'data_', align: 'center', width: 80},
            {text: '所在工作中心', dataIndex: 'data_', align: 'center', width: 100}],
        bbar: [{
            id: 'grid27page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    ////技术要求右边tab—检修工种
    var jxgzPanel = Ext.create('Ext.Panel', {
        id: 'jxgzPanel',
        title: '检修工种',
        baseCls: 'my-panel-no-border',
        frame: true,
        layout: {type: 'border', regionWeights: {north: 3, east: 4, south: 1, west: 1}},
        items: [jxgzPanel1, jxgzPanel2]
    });

    //技术要求右边tab—检修机具上面表格
    var jxjjPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'jxjjPanel1',
        columnLines: true,
        region: 'north',
        height: '50%',
        store: gridStore,
        autoScroll: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '机具名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '机具类型', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '机具定额', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '机具总台时', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid28page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //技术要求右边tab—检修机具下面表格
    var jxjjPanel2 = Ext.create('Ext.grid.Panel', {
        id: 'jxjjPanel2',
        columnLines: true,
        region: 'center',
        store: gridStore,
        autoScroll: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '机具编码', dataIndex: 'data_', align: 'center', width: 80},
            {text: '机具名称', dataIndex: 'data_', align: 'center', width: 80},
            {text: '机具定额', dataIndex: 'data_', align: 'center', width: 80},
            {text: '机具台时', dataIndex: 'data_', align: 'center', width: 80},
            {text: '机具所属单位', dataIndex: 'data_', align: 'center', width: 100},
            {text: '机具用途', dataIndex: 'data_', align: 'center', width: 80},
            {text: '司机姓名', dataIndex: 'data_', align: 'center', width: 80}],
        bbar: [{
            id: 'grid29page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //技术要求右边tab—检修机具
    var jxjjPanel = Ext.create('Ext.Panel', {
        id: 'jxjjPanel',
        title: '检修机具',
        baseCls: 'my-panel-no-border',
        frame: true,
        layout: {type: 'border', regionWeights: {north: 3, east: 4, south: 1, west: 1}},
        items: [jxjjPanel1, jxjjPanel2]
    });

    //技术要求右边tab—检修工具上面表格
    var jxgjPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'jxgjPanel1',
        columnLines: true,
        region: 'north',
        height: '50%',
        store: gridStore,
        autoScroll: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工具名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工具类型', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工具使用总时长', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid30page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //技术要求右边tab—检修工具下面表格
    var jxgjPanel2 = Ext.create('Ext.grid.Panel', {
        id: 'jxgjPanel2',
        columnLines: true,
        region: 'center',
        store: gridStore,
        autoScroll: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工具编码', dataIndex: 'data_', align: 'center', width: 80},
            {text: '工具名称', dataIndex: 'data_', align: 'center', width: 80},
            {text: '工具存在地', dataIndex: 'data_', align: 'center', width: 100},
            {text: '工具入厂时间', dataIndex: 'data_', align: 'center', width: 100},
            {text: '工具状态', dataIndex: 'data_', align: 'center', width: 80}],
        bbar: [{
            id: 'grid31page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //技术要求右边tab—检修工具
    var jxgjPanel = Ext.create('Ext.Panel', {
        id: 'jxgjPanel',
        title: '检修工具',
        baseCls: 'my-panel-no-border',
        frame: true,
        layout: {type: 'border', regionWeights: {north: 3, east: 4, south: 1, west: 1}},
        items: [jxgjPanel1, jxgjPanel2]
    });

    //技术要求右边tab
    var tab3 = Ext.create('Ext.tab.Panel', {
        id: 'tab3',
        title: '检修详情',
        region: 'east',
        width: '50%',
        frame: true,
        items: [gdmxPanel, qxmxPanel, ghlsPanel, jxgzPanel, jxjjPanel, jxgjPanel]
    });

    //技术要求
    var jsyqPanel = Ext.create('Ext.Panel', {
        id: 'jsyqPanel',
        title: '技术要求',
        baseCls: 'my-panel-no-border',
        frame: true,
        layout: {type: 'border', regionWeights: {north: 3, east: 4, south: 1, west: 1}},
        items: [jxjsbzPanel, zsbjxPanel, tab3]
    });

    //历史工单—维修信息
    var wxxxPanel = Ext.create('Ext.grid.Panel', {
        id: 'wxxxPanel',
        title: '维修信息',
        columnLines: true,
        store: gridStore,
        autoScroll: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工单号', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工单类型', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '检修内容', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工单创建时间', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '检修单位', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid32page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //历史工单—工种
    var gdgzPanel = Ext.create('Ext.grid.Panel', {
        id: 'gdgzPanel',
        title: '工种',
        columnLines: true,
        store: gridStore,
        autoScroll: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工种编码', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工种名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工种类型', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工种类型', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工种定额', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工种台时', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid33page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //历史工单—工具
    var gdgjPanel = Ext.create('Ext.grid.Panel', {
        id: 'gdgjPanel',
        title: '工具',
        columnLines: true,
        store: gridStore,
        autoScroll: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工具编码', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工具名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '使用时间', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '使用地点', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '使用台时', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '用途', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid34page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //历史工单—机具
    var gdjjPanel = Ext.create('Ext.grid.Panel', {
        id: 'gdjjPanel',
        title: '机具',
        columnLines: true,
        store: gridStore,
        autoScroll: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '机具编码', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '机具名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '机具类型', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '台时', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid35page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //历史工单—物料
    var gdwlPanel = Ext.create('Ext.grid.Panel', {
        id: 'gdwlPanel',
        title: '物料',
        columnLines: true,
        store: gridStore,
        autoScroll: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '物料编码', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '物料名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '数量', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '删除', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid36page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //历史工单tab
    var tab4 = Ext.create('Ext.tab.Panel', {
        id: 'tab4',
        title: '历史工单',
        frame: true,
        items: [wxxxPanel, gdgzPanel, gdgjPanel, gdjjPanel, gdwlPanel]
    });

    //右边大tab
    var tab = Ext.create('Ext.tab.Panel', {
        id: 'tab',
        //border:'false',
        frame: true,
        items: [gzPanel, jjPanel, gjPanel, wlPanel, aqcsPanel, jsyqPanel, tab4]
    });

    //缺陷生命周期弹窗
    var window = Ext.create('Ext.window.Window', {
        id: 'window',
        title: '缺陷生命周期',
        height: 300,
        closeAction: 'hide',
        width: 500,
        modal: true,
        frame: true
    });

    Ext.create('Ext.container.Viewport', {
        layout: {type: 'border', regionWeights: {north: 4, east: 3, south: 2, west: -1}},
        defaults: {border: false},
        items: [
            {region: 'north', items: [inputPanel]},
            {region: 'east', layout: 'fit', width: '60%', items: [tab]},
            {region: 'south', layout: 'fit', height: '40%', items: [jxmxsgtPanel]},
            {region: 'center', layout: 'fit', items: [zuoshangPanel]}]
    });
});

function _query() {
}
function _add() {
}
function _update() {
}
function _delete() {
}
function _open() {
    Ext.getCmp('window').show();
}
function _save() {
}
function _expand() {
    Ext.getCmp('sblxTree').expandAll();
}




