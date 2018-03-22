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
        data:[['M'],['S'],['P'],[' '],[' ']]
    });

//顶部查询条件
    var inputPanel = Ext.create('Ext.Panel', {
        id: 'inputPanel',
        title: '<div align="center">安全措施管理</div>',
        frame: true,
        border: false,
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:5px 0px 5px 10px'},
        items: [
            {
                xtype: 'combo',
                id: 'ck',
                store: ckStore,
                queryMode: 'local',
                valueField: 'V_DEPTCODE',
                displayField: 'V_DEPTNAME',
                fieldLabel: '厂矿',
                emptyText: '全部',
                editable: false,
                labelWidth: 40
            },
            {
                xtype: 'textfield',
                id: 'JJMC',
                emptyText: '安全措施模糊查询',
                style: 'margin:5px 0px 5px 20px'

            },
            {
                xtype: 'button',
                text: '查询',
                icon: imgpath + '/search.png',
                style: 'margin:5px 0px 5px 30px',
                width: 60,
                handler: _query
            }]
    });

//左上button
    var buttonPanel1 = Ext.create('Ext.Panel', {
        id: 'buttonPanel1',
        frame: true,
        border: false,
        baseCls: 'my-panel-no-border',
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:5px 0px 5px 10px'},
        items: [
            {xtype: 'button', text: '添加', icon: imgpath + '/add.png', handler: _add},
            {xtype: 'button', text: '修改', icon: imgpath + '/edit.png', handler: _update},
            {xtype: 'button', text: '删除', icon: imgpath + '/delete1.png', handler: _delete}]
    });

//左上表格
    var gridPanel1 = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel1',
        store: gridStore,
        //baseCls: 'my-panel-no-border',
        columnLines: true,
        border: false,
        //frame: true,
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '安全措施编码', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '安全措施名称', dataIndex: 'data_', style: 'text-align: center;', flex: 1}],
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
        layout: 'border',
        frame: true,
        border: false,
        items: [{
            region: 'north',
            layout: 'fit',
            items: [buttonPanel1]
        }, {
            region: 'center',
            layout: 'fit',
            items: [gridPanel1]
        }]
    });


//左下
    var formPanel = Ext.create('Ext.form.Panel', {
        id: 'formPanel',
        border: false,
        //layout:'vbox',
        frame: true,
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 300, style: 'margin:20px 0px 10px 50px'},
        //defaults: {labelAlign: 'right', autoWidth: true},
        items: [{xtype: 'textfield', name: 'UP_CODE_', fieldLabel: '安全措施编码:', maxLength: 60, allowBlank: false},
            {xtype: 'textfield', name: 'CAT_NAME_', fieldLabel: '安全措施名称:', maxLength: 60, allowBlank: false},
            {xtype: 'textareafield', name: 'CAT_CODE_', fieldLabel: '安全措施明细:', maxLength: 60, allowBlank: false},
            {xtype: 'textareafield', name: "CAT_CODE_", fieldLabel: '安全措施注意事项', maxLength: 60, allowBlank: false},
            {
                xtype: 'button',
                text: '保存',
                icon: imgpath + '/saved.png',
                style: 'margin:20px 0px 10px 397px',
                handler: _save
            }]
    });

    //安全措施预案button1
    var buttonPanel2 = Ext.create('Ext.Panel', {
        id: 'buttonPanel2',
        frame: true,
        border: false,
        baseCls: 'my-panel-no-border',
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:5px 0px 5px 10px'},
        items: [
            {xtype: 'button', text: '添加', icon: imgpath + '/add.png', handler: _add},
            {xtype: 'button', text: '修改', icon: imgpath + '/edit.png', handler: _update},
            {xtype: 'button', text: '删除', icon: imgpath + '/delete1.png', handler: _delete}]
    });

    //安全措施预案表格1
    var gridPanel2 = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel2',
        store: 'gridStore',
        columnLines: true,
        border: 'false',
        //baseCls: 'my-panel-no-border',
        //frame:'true',
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '预案编码', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '预案名称', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '预案详情', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '附件', dataIndex: 'data_', style: 'text-align: center;', flex: 1}],
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

    //安全措施预案button2
    var buttonPanel3 = Ext.create('Ext.Panel', {
        id: 'buttonPanel3',
        frame: true,
        border: false,
        baseCls: 'my-panel-no-border',
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:5px 0px 5px 10px'},
        items: [
            {xtype: 'textfield', id: 'id1', emptyText: '模糊查询'},
            {xtype: 'button', style: 'margin:5px 0px 5px 20px', text: '浏览', icon: imgpath + '/add.png', handler: _add},
            {xtype: 'button', text: '上传', icon: imgpath + '/edit.png', handler: _update},
            {xtype: 'button', text: '删除', icon: imgpath + '/delete1.png', handler: _delete}]
    });

    //安全措施预案表格2
    var gridPanel3 = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel3',
        store: 'gridStore',
        columnLines: true,
        border: 'false',
        //baseCls: 'my-panel-no-border',
        //frame:'true',
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '附件名称', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '下载', dataIndex: 'data_', style: 'text-align: center;', flex: 1}],
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

    //安全措施预案左边
    var aqcsyaPanel1 = Ext.create('Ext.panel.Panel', {
        id: 'aqcsyaPanel1',
        layout: 'border',
        frame: true,
        baseCls: 'my-panel-no-border',
        border: false,
        // items: [buttonPanel2,gridPanel2],
        items: [{region: 'north', items: [buttonPanel2]}, {region: 'center', layout: 'fit', items: [gridPanel2]}]
    });

    //安全措施预案右边
    var aqcsyaPanel2 = Ext.create('Ext.panel.Panel', {
        id: 'aqcsyaPanel2',
        layout: 'border',
        frame: true,
        baseCls: 'my-panel-no-border',
        border: false,
        // items: [buttonPanel2,gridPanel2],
        items: [{region: 'north', items: [buttonPanel3]}, {region: 'center', layout: 'fit', items: [gridPanel3]}]
    });

    //安全措施预案
    var aqcsyaPanel = Ext.create('Ext.panel.Panel', {
        id: 'aqcsyaPanel',
        title: '安全措施预案',
        layout: 'border',
        frame: true,
        baseCls: 'my-panel-no-border',
        border: false,
        //items: [aqcsyaPanel1,aqcsyaPanel2]
        items: [{region: 'west', width: '50%', layout: 'fit', items: [aqcsyaPanel1]}, {
            region: 'center',
            layout: 'fit',
            items: [aqcsyaPanel2]
        }]
    });

    //安全事故案例
    var aqsgalPanel = Ext.create('Ext.grid.Panel', {
        id: 'aqsgalPanel',
        store: 'gridStore',
        title: '安全事故案例',
        columnLines: true,
        border: 'false',
        //baseCls: 'my-panel-no-border',
        frame: 'true',
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '事故发生时间', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '事故发生地点', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '事故影响', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '事故详情', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '附件', dataIndex: 'data_', style: 'text-align: center;', flex: 1}],
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

    //安全措施整改button1
    var buttonPanel4 = Ext.create('Ext.Panel', {
        id: 'buttonPanel4',
        frame: true,
        border: false,
        baseCls: 'my-panel-no-border',
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:5px 0px 5px 10px'},
        items: [
            {xtype: 'button', text: '添加', icon: imgpath + '/add.png', handler: _add},
            {xtype: 'button', text: '修改', icon: imgpath + '/edit.png', handler: _update},
            {xtype: 'button', text: '删除', icon: imgpath + '/delete1.png', handler: _delete}]
    });

    //整改信息
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
            id: 'grid5page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    //整改审批流程
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
            {text: '审批人', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '审批时间', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '审批意见', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '附件', dataIndex: 'data_', style: 'text-align: center;', flex: 1}],
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

    //整改进度
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
            {text: '整改进度', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '计划时间', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '完成时间', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '附件', dataIndex: 'data_', style: 'text-align: center;', flex: 1}],
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

    //人工
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
            id: 'grid8page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
            //store: 'grid3Store'
        }]
    });

    //工具
    var gjPanel = Ext.create('Ext.grid.Panel', {
        id: 'gjPanel',
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
            id: 'grid9page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
            //store: 'grid3Store'
        }]
    });

    //机具
    var jjPanel = Ext.create('Ext.grid.Panel', {
        id: 'jjPanel',
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
            id: 'grid10page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
            //store: 'grid3Store'
        }]
    });

    //整改工单
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
            {text: '整改进度', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '计划时间', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '完成时间', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '附件', dataIndex: 'data_', style: 'text-align: center;', flex: 1}],
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

    //安全措施整改tab
    var tab1 = Ext.create('Ext.tab.Panel', {
        id: 'tab1',
        //border:'false',
        frame: true,
        items: [zgxxPanel, zgsplcPanel, zgjdPanel, rgPanel, gjPanel, jjPanel, zggdPanel]
    });

    //安全措施整改
    var aqcszgPanel = Ext.create('Ext.panel.Panel', {
        id: 'aqcszgPanel',
        title: '安全措施整改',
        layout: 'border',
        frame: true,
        baseCls: 'my-panel-no-border',
        border: false,
        //items: [aqcsyaPanel1,aqcsyaPanel2]
        items: [{region: 'north', layout: 'fit', items: [buttonPanel4]}, {
            region: 'center',
            layout: 'fit',
            items: [tab1]
        }]
    });

    //安全措施附件button
    var buttonPanel5 = Ext.create('Ext.Panel', {
        id: 'buttonPanel5',
        frame: true,
        border: false,
        baseCls: 'my-panel-no-border',
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 100, inputWidth: 140, style: 'margin:5px 0px 5px 10px'},
        items: [
            {xtype: 'textfield', id: 'id2', emptyText: '模糊查询'},
            {xtype: 'button', style: 'margin:5px 0px 5px 20px', text: '浏览', icon: imgpath + '/add.png', handler: _add},
            {xtype: 'button', text: '上传', icon: imgpath + '/edit.png', handler: _update},
            {xtype: 'button', text: '删除', icon: imgpath + '/delete1.png', handler: _delete}]
    });

    //安全措施附件表格
    var gridPanel5 = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel5',
        store: 'gridStore',
        columnLines: true,
        border: 'false',
        //baseCls: 'my-panel-no-border',
        //frame:'true',
        selModel: {selType: 'checkboxmodel', mode: 'SIMPLE'},
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '附件名称', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '上传时间', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '上传人', dataIndex: 'data_', style: 'text-align: center;', flex: 1},
            {text: '下载', dataIndex: 'data_', style: 'text-align: center;', flex: 1}],
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

    //安全措施附件
    var aqcsfjPanel = Ext.create('Ext.panel.Panel', {
        id: 'aqcsfjPanel',
        title: '安全措施附件',
        layout: 'border',
        frame: true,
        baseCls: 'my-panel-no-border',
        border: false,
        // items: [buttonPanel2,gridPanel2],
        items: [{region: 'north', items: [buttonPanel5]}, {region: 'center', layout: 'fit', items: [gridPanel5]}]
    });

    //关联设备下拉框
    var Panel4 = Ext.create('Ext.Panel', {
        id: 'Panel4',
        frame: true,
        layout: 'column',
        defaults: {labelAlign: 'right', labelWidth: 50, inputWidth: 140, style: 'margin:5px 0px 5px 20px'},
        items: [{
            xtype: 'combo',
            id: 'dept',
            store: gridStore,
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
            itemclick: _profesTreeitemclick
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
        store: gridStore,
        //autoScroll: false,
        columns: [
            {xtype: 'rownumberer', text: '序号', width: 40, sortable: false},
            {text: '设备编码', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '设备名称', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '功能位置', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '关联时间', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '关联人', dataIndex: 'data_', align: 'center', flex: 1},
            {text: '取消关联', dataIndex: 'data_', align: 'center', flex: 1}],
        bbar: [{
            id: 'grid13page',
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

//右边大tab
    var tab = Ext.create('Ext.tab.Panel', {
        id: 'tab',
        //border:'false',
        frame: true,
        items: [aqcsyaPanel, aqsgalPanel, aqcszgPanel, aqcsfjPanel, glsbPanel]
    });

    Ext.create('Ext.container.Viewport', {
        layout: {type: 'border', regionWeights: {north: 4, east: 3, south: 2, west: -1}},
        defaults: {border: false},
        items: [
            {region: 'north', items: [inputPanel]},
            {region: 'east', layout: 'fit', width: '70%', items: [tab]},
            {region: 'south', layout: 'fit', height: '40%', items: [formPanel]},
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
function _save() {
}
function _profesTreeitemclick() {
}




