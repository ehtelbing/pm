var globalId = "";
var globalParentId = "";
var golbalTreeModel = ""
var globalModel = "";
Ext.onReady(function() {
    Ext.QuickTips.init();
    var editWindow = Ext.create('Ext.window.Window', {
        id: 'editWindow',
        title: '编辑',
        frame: true,
        modal: true,
        width: 620,
        height: 330,
        layout: 'fit',
        resizable: false,
        closeAction: 'hide',
        items: [Ext.create('Ext.form.Panel', {
            id: 'editForm',
            //layout: 'vbox',
            layout:{
                type:'table',
                columns:2
            },
            baseCls: 'my-panel-no-border',
            bodyStyle: 'padding:20px;',
            border: false,
            frame: true,
            items: [{
                id: 'edit_name',
                name: 'V_DEPTNAME',
                xtype: 'textfield',
                fieldLabel: '组织机构名',
                labelAlign: 'right',
                labelWidth: 110,
                style: 'margin-top:15px;'
            }, {
                id: 'edit_coding',
                name: 'V_DEPTCODE',
                xtype: 'textfield',
                fieldLabel: '组织机构编码',
                labelAlign: 'right',
                labelWidth: 110,
                style: 'margin-top:15px;'
            }, {
                id: 'edit_coding_up',
                name: 'V_DEPTCODE_UP',
                xtype: 'textfield',
                fieldLabel: '上级组织机构编码',
                labelAlign: 'right',
                labelWidth: 110,
                style: 'margin-top:15px;'
            }, {
                id: 'edit_smallname',
                name: 'V_DEPTSMALLNAME',
                xtype: 'textfield',
                fieldLabel: '组织机构简称',
                labelAlign: 'right',
                labelWidth: 110,
                style: 'margin-top:15px;'
            }, {
                id: 'edit_fullname',
                name: 'V_DEPTFULLNAME',
                xtype: 'textfield',
                fieldLabel: '组织机构全称',
                labelAlign: 'right',
                labelWidth: 110,
                style: 'margin-top:15px;'
            }, {
                id: 'edit_type',
                name: 'V_DEPTTYPE',
                xtype: 'textfield',
                fieldLabel: '组织机构类型',
                labelAlign: 'right',
                labelWidth: 110,
                style: 'margin-top:15px;'
            }, {
                id: 'edit_sequence',
                name: 'I_ORDERID',
                xtype: 'numberfield',
                fieldLabel: '排序',
                labelAlign: 'right',
                labelWidth: 110,
                style: 'margin-top:15px;'
            }, {
                id: 'edit_sap_dept',
                name: 'V_SAP_DEPT',
                xtype: 'textfield',
                fieldLabel: 'SAP组织机构编码',
                labelAlign: 'right',
                labelWidth: 110,
                style: 'margin-top:15px;'
            }, {
                id: 'edit_sap_work',
                name: 'V_SAP_WORK',
                xtype: 'textfield',
                fieldLabel: 'SAP工作中心',
                labelAlign: 'right',
                labelWidth: 110,
                style: 'margin-top:15px;'
            }, {
                id: 'edit_sap_jhgc',
                name: 'V_SAP_JHGC',
                xtype: 'textfield',
                fieldLabel: 'SAP计划工厂',
                labelAlign: 'right',
                labelWidth: 110,
                style: 'margin-top:15px;'
            }, {
                id: 'edit_sap_ywfw',
                name: 'V_SAP_YWFW',
                xtype: 'textfield',
                fieldLabel: 'SAP业务范围',
                labelAlign: 'right',
                labelWidth: 110,
                style: 'margin-top:15px;'
            }
            ]
        })],
        buttons: [
            {
                text: '确认', icon: imgpath + '/saved.png',
                id: 'addParentButton',
                handler: function () {
                    onAddParentSave();
                }
            },
            {
                text: '确认', icon: imgpath + '/saved.png',
                id: 'addNodeButton',
                handler: function () {
                    onAddNodeSave();
                }
            },
            {
                text: '确认', icon: imgpath + '/saved.png',
                id: 'editButton',
                handler: function () {
                    onEditSave();
                }
            },
            {
                text: '取消', icon: imgpath + '/cross.png',
                handler: function () {
                    Ext.getCmp('editForm').form.reset();
                    Ext.getCmp('editWindow').hide();
                }
            }
        ]
    });

    // 树
    var treeStore = Ext.create('Ext.data.TreeStore', {
        autoLoad: false,
        root: {
            expanded: true,
            text: "My Root"
        },
        //fields: ['id','pid'
        //
        //],
        proxy: {
            type: 'ajax',
            async: false,
            url : AppUrl + 'drawingManage/orgTree',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json'
            },
            extraParams: {
                V_V_DEPTCODE:'%'
            }
        }
    });

    var tree = Ext.create('Ext.tree.Panel', {
        region: 'west',
        width: 270,
        minHeight: 500,
        Height: 500,
        id: 'tree',
        border: false,
        rootVisible: false,
        store: treeStore,
        listeners: {
            itemclick: function (view, node, element, index, e) {
                globalId = node.data.id;
                globalParentId = node.data.parentId== "root" ? "-1" : node.data.parentId;
                golbalTreeModel = node.raw;
                load(node.data.id);
            }
        }
    });
    var panel = Ext.create('Ext.panel.Panel', {
        frame: true,
        region: 'north',
        layout: 'column',
        title: '组织机构管理',
        items: [{
            xtype: 'button',
            text: '刷新',
            icon: imgpath + '/table_refresh.png',
            style: ' margin: 3px 0px 3px 20px',
            listeners: {
                click: function () {
                    location.reload();
                }
            }
        }, {
            xtype: 'button',
            text: '添加父节点',
            icon: imgpath + '/add.png',
            style: ' margin: 3px 0px 3px 20px',
            listeners: {
                click: addParent
            }
        }, {
            xtype: 'button',
            text: '添加子节点',
            icon: imgpath + '/add.png',
            style: ' margin: 3px 0px 3px 20px',
            listeners: {
                click: addNode
            }
        }, {
            xtype: 'button',
            text: '删除',
            icon: imgpath + '/delete.png',
            style: ' margin: 3px 0px 3px 20px',
            listeners: {
                click: dels
            }
        }]
    })

    var gridStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        pageSize:   20,
        storeId: 'gridStore',
        fields: ['I_DEPTID','V_DEPTCODE','V_DEPTNAME','V_DEPTCODE_UP', 'V_DEPTSMALLNAME', 'V_DEPTFULLNAME', 'V_DEPTTYPE',
            'I_ORDERID','I_FLAG','V_SAP_DEPT','V_SAP_WORK','V_SAP_JHGC','V_SAP_YWFW', 'D_DATE_EDITTIME','V_EDIT_GUID',
            'V_CLASS_FLAG'

        ],proxy:{
            type: 'ajax',
            async: false,
            url : AppUrl + 'drawingManage/getDeptByParentDeptcode',
            actionMethods: {
                read: 'POST'//请求方法
            },
            reader: {
                type : 'json',
                root : 'list',
                totalProperty : 'total'
            }
            //extraParams: {
            //    V_V_DEPT_PCODE: globalId
            //    //sort: '[{"property": "sequence", "direction": "ASC"}]'
            //}//请求参数
        }
    });
    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        region: 'center',
        columnLines: true,
        autoScroll: true,
        store: gridStore,
//            dufaults: {
//                width: 120
//            },
        selType: 'checkboxmodel',
        columns: [{
            xtype: 'rownumberer',
            width: 60,
            sortable: false,
            text: '序号',
            align: 'center'
        }, {
            text: '组织机构名',
            dataIndex: 'V_DEPTNAME',
            renderer: atleft,
            width: 130,
            align: 'center'
        }, {
            text: '组织机构编码',
            dataIndex: 'V_DEPTCODE',
            renderer: atleft,
            width: 100,
            align: 'center'
        }, {
            text: '上级组织机构编码',
            dataIndex: 'V_DEPTCODE_UP',
            renderer: atleft,
            width: 100,
            align: 'center'
        }, {
            text: '组织机构简称',
            dataIndex: 'V_DEPTSMALLNAME',
            renderer: atleft,
            width: 150,
            align: 'center'
        }, {
            text: '组织机构全称',
            dataIndex: 'V_DEPTFULLNAME',
            renderer: atleft,
            width: 150,
            align: 'center'
        }, {
            text: '组织机构类型',
            dataIndex: 'V_DEPTTYPE',
            renderer: atleft,
            width: 150,
            align: 'center'
        }, {
            text: '排序',
            dataIndex: 'I_ORDERID',
            renderer: atleft,
            width: 40,
            align: 'center'
        }, {
            text: 'SAP组织机构编码',
            dataIndex: 'V_SAP_DEPT',
            renderer: atleft,
            width: 100,
            align: 'center'
        }, {
            text: 'SAP工作中心',
            dataIndex: 'V_SAP_WORK',
            renderer: atleft,
            width: 100,
            align: 'center'
        }, {
            text: 'SAP计划工厂',
            dataIndex: 'V_SAP_JHGC',
            renderer: atleft,
            width: 100,
            align: 'center'
        }, {
            text: 'sap业务范围',
            dataIndex: 'V_SAP_YWFW',
            renderer: atleft,
            width: 100,
            align: 'center'
        }, {
            text: '修改',
            dataIndex: 'I_DEPTID',
            width: 70,
            align: 'center',
            xtype: 'actioncolumn',
            items: [{
                icon: imgpath + '/edit.png',
                handler: function (record, rowIndex) {
                    edit(rowIndex);
                }
            }]
        }, {
            text: '删除',
            width: 70,
            align: 'center',
            xtype: 'actioncolumn',
            items: [{
                icon: imgpath + '/delete.png',
                handler: function (record, rowIndex) {
                    remove(rowIndex);
                }
            }]
        }],
        bbar: ["->",
            {
                xtype: 'pagingtoolbar',
                store: "gridStore",
                width: '100%',
                dock: 'bottom',
                displayInfo: true,
                displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                emptyMsg: '没有记录'
            }]
    });

    var center = Ext.create('Ext.panel.Panel', {
        region: 'center',
        frame: true,
        layout: "border",
        items: [panel, grid]
    })
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [tree, center]
    });
    Ext.data.StoreManager.lookup('gridStore').on('beforeload',function(store){
        store.proxy.extraParams={
            V_V_DEPT_PCODE: globalId
        }
    });
});

function load(code) {
    //默认查询数据库第一页
    Ext.getStore('gridStore').currentPage = 1;
    //设置查询方式与条件
    //Ext.getStore('gridStore').setProxy({
    //    type: 'ajax',
    //    async: false,
    //    url : AppUrl + 'drawingManage/getDeptByParentDeptcode',
    //    actionMethods: {
    //        read: 'POST'//请求方法
    //    },
    //    reader: {
    //        type : 'json',
    //        root : 'list',
    //        totalProperty : 'total'
    //    },
    //    extraParams: {
    //        V_V_DEPT_PCODE: code
    //        //sort: '[{"property": "sequence", "direction": "ASC"}]'
    //    }//请求参数
    //});

    Ext.data.StoreManager.lookup('gridStore').load();//发出请求
}

function addParent() {
    if(globalParentId==''){
        Ext.Msg.alert('提示', '未选中父节点，请重新点击！');
        return false;
    }
    Ext.getCmp('addParentButton').show();
    Ext.getCmp('addNodeButton').hide();
    Ext.getCmp('editButton').hide();

    Ext.getCmp('edit_coding_up').hide();
    Ext.getCmp('editForm').form.reset();
    Ext.getCmp('editWindow').show();
}

function addNode() {
    if(globalId==''){
        Ext.Msg.alert('提示', '未选中子节点，请重新点击！');
        return false;
    }
    Ext.getCmp('edit_coding').setValue('');
    Ext.getCmp('edit_name').setValue('');
    Ext.getCmp('addParentButton').hide();
    Ext.getCmp('addNodeButton').show();
    Ext.getCmp('editButton').hide();
    Ext.getCmp('edit_coding_up').hide();
    Ext.getCmp('editForm').form.reset();
    Ext.getCmp('editWindow').show();
}

function edit(rowIndex) {
    globalModel = Ext.getStore('gridStore').data.items[rowIndex].raw;
    Ext.getCmp('editForm').loadRecord(Ext.getStore('gridStore').getAt(rowIndex));
    Ext.getCmp('edit_coding_up').hide();
    Ext.getCmp('addParentButton').hide();
    Ext.getCmp('addNodeButton').hide();
    Ext.getCmp('editButton').show();
    Ext.getCmp('editWindow').show();
}

function dels() {
    var ids = [];
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if(seldata.length==0){
        Ext.Msg.alert('提示', '请选择要删除的记录');
        return false;
    }
    for (var i = 0; i < seldata.length; i++) {
        ids.push(seldata[i].raw.I_DEPTID);
    }
    if (ids.length > 0) {
        Ext.Msg.confirm('提示', '您确定要删除该条记录及其子项?', function (button) {
            if (button == "yes") {
                Ext.Ajax.request({
                    url : AppUrl + 'drawingManage/PRO_BASE_DEPT_DEL',
                    method: 'POST',
                    params: {
                        V_V_DEPTIDS: ids
                    },
                    success: function (response) {
                        var resp = Ext.decode(response.responseText);
                        Ext.getStore('gridStore').load();
                        Ext.Msg.alert('操作信息', '操作成功');
                    },
                    failure: function (response) {
                        var resp = Ext.decode(response.responseText);//异常处理
                        Ext.Msg.alert('提示', resp["message"]);
                    }
                });
            }
        });
    }
}

function onAddParentSave() {
    if(globalParentId==''){
        Ext.Msg.alert('提示', '未选中父节点，请重新点击！');
        return false;
    }
    Ext.Ajax.request({
        method: 'POST',//请求类型
        async: false,
        url : AppUrl + 'drawingManage/PRO_BASE_DEPT_ADD',
        params: {
            V_V_DEPTNAME: Ext.getCmp('edit_name').getValue(),
            V_V_DEPTCODE: Ext.getCmp('edit_coding').getValue(),
            V_V_DEPTCODE_UP: globalParentId,
            V_V_DEPTSMALLNAME: Ext.getCmp('edit_smallname').getValue(),
            V_V_DEPTFULLNAME: Ext.getCmp('edit_fullname').getValue(),
            V_V_DEPTTYPE: Ext.getCmp('edit_type').getValue(),
            V_I_ORDERID: Ext.getCmp('edit_sequence').getValue(),
            V_V_SAP_DEPT: Ext.getCmp('edit_sap_dept').getValue(),
            V_V_SAP_WORK: Ext.getCmp('edit_sap_work').getValue(),
            V_V_SAP_JHGC: Ext.getCmp('edit_sap_jhgc').getValue(),
            V_V_SAP_YWFW: Ext.getCmp('edit_sap_ywfw').getValue()
        },
            //JSON.stringify(params),//请求参数

        //headers: {'Content-Type': "application/json;charset=UTF-8"},
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            Ext.getStore('gridStore').load();
            Ext.Msg.alert('操作信息', '操作成功');
            Ext.getCmp('editWindow').hide();
        },
        failure: function (response) {
            var resp = Ext.decode(response.responseText);//异常处理
            Ext.Msg.alert('提示', resp["message"]);
        }
    });

}

function onAddNodeSave() {
    if(globalId==''){
        Ext.Msg.alert('提示', '未选中子节点，请重新点击！');
        return false;
    }
    Ext.Ajax.request({
        method: 'POST',//请求类型
        async: false,
        url : AppUrl + 'drawingManage/PRO_BASE_DEPT_ADD',
        params: {
            V_V_DEPTNAME: Ext.getCmp('edit_name').getValue(),
            V_V_DEPTCODE: Ext.getCmp('edit_coding').getValue(),
            V_V_DEPTCODE_UP: globalId,
            V_V_DEPTSMALLNAME: Ext.getCmp('edit_smallname').getValue(),
            V_V_DEPTFULLNAME: Ext.getCmp('edit_fullname').getValue(),
            V_V_DEPTTYPE: Ext.getCmp('edit_type').getValue(),
            V_I_ORDERID: Ext.getCmp('edit_sequence').getValue(),
            V_V_SAP_DEPT: Ext.getCmp('edit_sap_dept').getValue(),
            V_V_SAP_WORK: Ext.getCmp('edit_sap_work').getValue(),
            V_V_SAP_JHGC: Ext.getCmp('edit_sap_jhgc').getValue(),
            V_V_SAP_YWFW: Ext.getCmp('edit_sap_ywfw').getValue()
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            Ext.Msg.alert('操作信息', '操作成功');
            Ext.getStore('gridStore').load();
            Ext.getCmp('editWindow').hide();
        },
        failure: function (response) {
            var resp = Ext.decode(response.responseText);//异常处理
            Ext.Msg.alert('提示', resp["message"]);
        }
    });
}

function onEditSave() {
    Ext.Ajax.request({
        method: 'POST',//请求类型
        async: false,
        url : AppUrl + 'drawingManage/PRO_BASE_DEPT_UPD',
        params: {
            V_V_DEPTID:globalModel.I_DEPTID,
            V_V_DEPTNAME: Ext.getCmp('edit_name').getValue(),
            V_V_DEPTCODE: Ext.getCmp('edit_coding').getValue(),
            V_V_DEPTCODE_UP: globalId,//不保存此字段
            V_V_DEPTSMALLNAME: Ext.getCmp('edit_smallname').getValue(),
            V_V_DEPTFULLNAME: Ext.getCmp('edit_fullname').getValue(),
            V_V_DEPTTYPE: Ext.getCmp('edit_type').getValue(),
            V_I_ORDERID: Ext.getCmp('edit_sequence').getValue(),
            V_V_SAP_DEPT: Ext.getCmp('edit_sap_dept').getValue(),
            V_V_SAP_WORK: Ext.getCmp('edit_sap_work').getValue(),
            V_V_SAP_JHGC: Ext.getCmp('edit_sap_jhgc').getValue(),
            V_V_SAP_YWFW: Ext.getCmp('edit_sap_ywfw').getValue()
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            Ext.Msg.alert('操作信息', '操作成功');
            Ext.getStore('gridStore').load();
            Ext.getCmp('editWindow').hide();
        },
        failure: function (response) {
            var resp = Ext.decode(response.responseText);//异常处理
            Ext.Msg.alert('提示', resp["message"]);
        }
    });

}

function remove(rowIndex) {
    Ext.Msg.confirm('提示', '您确定要删除该条记录及其子项?', function (button) {
        if (button == "yes") {
            var id = Ext.getStore('gridStore').data.items[rowIndex].data.I_DEPTID;
            Ext.Ajax.request({
                url : AppUrl + 'drawingManage/PRO_BASE_DEPT_DEL',
                method: 'POST',
                params: {
                    V_V_DEPTIDS: id
                },
                success: function (response) {
                    var resp = Ext.decode(response.responseText);
                    Ext.getStore('gridStore').load();
                    Ext.Msg.alert('操作信息', '操作成功');
                },
                failure: function (response) {
                    var resp = Ext.decode(response.responseText);//异常处理
                    Ext.Msg.alert('提示', resp["message"]);
                }
            });
        }
    });
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return value;
}