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
        title: '<div align="center">检修技术标准管理</div>',
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
            }, {
                xtype: 'textfield',
                id: 'zsbmc_',
                fieldLabel: '子设备名称',
                labelWidth: 70
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

    //左上表格
    var gridPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel1',
        columnLines: true,
        frame: true,
        store: gridStore,
        region: 'center',
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
            id: 'grid1page',
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
        items: [sblxTree, gridPanel1]
    });

    //部件简图
    var bjjtPanel = Ext.create("Ext.form.Panel", {
        id: 'bjjtPanel',
        editable: false,
        frame: true,
        region: 'center',
        title: '部件简图',
        items: [{
            layout: 'column',
            defaults: {labelAlign: 'right'},
            items: [{
                xtype: 'image',
                src: imgpath + '/111.jpg'
            }]
        }]
    });

    //工单明细
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
            id: 'grid2page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //缺陷明细
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
            id: 'grid3page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //更换历史
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
            id: 'grid4page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //检修工种上面表格
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
            id: 'grid5page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //检修工种下面表格
    var jxgzPanel2 = Ext.create('Ext.grid.Panel', {
        id: 'jxgzPanel2',
        columnLines: true,
        region: 'center',
        store: gridStore,
        autoScroll: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工种编码', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工种名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工种类型', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工种等级', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工种定额', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工种台时', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '人员姓名', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '所在工作中心', dataIndex: 'data_', align: 'center', flex: 1}],
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

    //检修工种
    var jxgzPanel = Ext.create('Ext.Panel', {
        id: 'jxgzPanel',
        title: '检修工种',
        baseCls: 'my-panel-no-border',
        frame: true,
        layout: {type: 'border', regionWeights: {north: 3, east: 4, south: 1, west: 1}},
        items: [jxgzPanel1, jxgzPanel2]
    });

    //检修机具上面表格
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
            id: 'grid7page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //检修机具下面表格
    var jxjjPanel2 = Ext.create('Ext.grid.Panel', {
        id: 'jxjjPanel2',
        columnLines: true,
        region: 'center',
        store: gridStore,
        autoScroll: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '机具编码', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '机具名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '机具定额', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '机具台时', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '机具所属单位', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '机具用途', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '司机姓名', dataIndex: 'data_', align: 'center', flex: 1}],
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

    //检修机具
    var jxjjPanel = Ext.create('Ext.Panel', {
        id: 'jxjjPanel',
        title: '检修机具',
        baseCls: 'my-panel-no-border',
        frame: true,
        layout: {type: 'border', regionWeights: {north: 3, east: 4, south: 1, west: 1}},
        items: [jxjjPanel1, jxjjPanel2]
    });

    //检修工具上面表格
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
            id: 'grid9page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //检修工具下面表格
    var jxgjPanel2 = Ext.create('Ext.grid.Panel', {
        id: 'jxgjPanel2',
        columnLines: true,
        region: 'center',
        store: gridStore,
        autoScroll: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '工具编码', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工具名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工具存在地', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工具入厂时间', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '工具状态', dataIndex: 'data_', align: 'center', flex: 1}],
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

    //检修工具
    var jxgjPanel = Ext.create('Ext.Panel', {
        id: 'jxgjPanel',
        title: '检修工具',
        baseCls: 'my-panel-no-border',
        frame: true,
        layout: {type: 'border', regionWeights: {north: 3, east: 4, south: 1, west: 1}},
        items: [jxgjPanel1, jxgjPanel2]
    });

    //右边大tab
    var tab = Ext.create('Ext.tab.Panel', {
        id: 'tab',
        title:'检修详情',
        frame: true,
        items: [gdmxPanel, qxmxPanel, ghlsPanel, jxgzPanel, jxjjPanel, jxgjPanel]
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
            {region: 'south', layout: 'fit', height: '40%', items: [bjjtPanel]},
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




