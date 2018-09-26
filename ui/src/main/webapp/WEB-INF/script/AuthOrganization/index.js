var globalId = "";
var globalParentId = "";
var golbalTreeModel = ""
var globalModel = "";
Ext.onReady(function() {
    Ext.QuickTips.init();
    var editWindow = Ext.create('Ext.window.Window', {
        id: 'editWindow',
        title: '添加',
        frame: true,
        modal: true,
        width: 300,
        height: 400,
        layout: 'fit',
        resizable: false,
        closeAction: 'hide',
        items: [Ext.create('Ext.form.Panel', {
            id: 'editForm',
            layout: 'vbox',
            baseCls: 'my-panel-no-border',
            bodyStyle: 'padding:20px;',
            border: false,
            frame: true,
            items: [{
                id: 'edit_name',
                name: 'name',
                xtype: 'textfield',
                fieldLabel: '组织机构名',
                labelAlign: 'right',
                labelWidth: 80
            }, {
                id: 'edit_coding',
                name: 'coding',
                xtype: 'textfield',
                fieldLabel: '组织机构编码',
                labelAlign: 'right',
                labelWidth: 80,
                style: 'margin-top:15px;'
            }
            //    {
            //    id: 'edit_sequence',
            //    name: 'sequence',
            //    xtype: 'numberfield',
            //    fieldLabel: '排序',
            //    labelAlign: 'right',
            //    labelWidth: 80,
            //    style: 'margin-top:15px;'
            //}
            ]
        })],
        buttons: [
            {
                text: '确认', icon: imgpath + '/accept.png',
                id: 'addParentButton',
                handler: function () {
                    onAddParentSave();
                }
            },
            {
                text: '确认', icon: imgpath + '/accept.png',
                id: 'addNodeButton',
                handler: function () {
                    onAddNodeSave();
                }
            },
            {
                text: '确认', icon: imgpath + '/accept.png',
                id: 'editButton',
                handler: function () {
                    onEditSave();
                }
            },
            {
                text: '取消', icon: imgpath + '/cancel.png',
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
            icon: imgpath + '/refresh-disabled.gif',
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
            width: 150,
            align: 'center'
        }, {
            text: '排序',
            dataIndex: 'I_ORDERID',
            renderer: atleft,
            width: 130,
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
    Ext.getCmp('addParentButton').show();
    Ext.getCmp('addNodeButton').hide();
    Ext.getCmp('editButton').hide();

    Ext.getCmp('editForm').form.reset();
    Ext.getCmp('editWindow').show();
}

function addNode() {
    Ext.getCmp('edit_coding').setValue('');
    Ext.getCmp('edit_name').setValue('');
    Ext.getCmp('addParentButton').hide();
    Ext.getCmp('addNodeButton').show();
    Ext.getCmp('editButton').hide();

    Ext.getCmp('editForm').form.reset();
    Ext.getCmp('editWindow').show();
}

function edit(rowIndex) {
    globalModel = Ext.getStore('gridStore').data.items[rowIndex].raw;
    //Ext.getCmp('editForm').loadRecord(Ext.getStore('gridStore').getAt(rowIndex));
    Ext.getCmp('edit_coding').setValue(globalModel.V_DEPTCODE);
    Ext.getCmp('edit_name').setValue(globalModel.V_DEPTNAME);
    Ext.getCmp('addParentButton').hide();
    Ext.getCmp('addNodeButton').hide();
    Ext.getCmp('editButton').show();
    Ext.getCmp('editWindow').show();
}

function dels() {
    var ids = [];
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    for (var i = 0; i < seldata.length; i++) {
        ids.push(seldata[i].raw.I_DEPTID);
    }
    if (ids.length > 0) {
        Ext.Msg.confirm('提示', '您确定要删除该条记录?', function (button) {
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
        Ext.Msg.alert('提示', '未选中节点，请重新点击！');
        return false;
    }
    Ext.Ajax.request({
        method: 'POST',//请求类型
        async: false,
        url : AppUrl + 'drawingManage/PRO_BASE_DEPT_ADD',
        params: {
            V_V_DEPTCODE_UP: globalParentId,
            V_V_DEPTNAME: Ext.getCmp('edit_name').getValue(),
            V_V_DEPTCODE: Ext.getCmp('edit_coding').getValue()
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
        Ext.Msg.alert('提示', '未选中节点，请重新点击！');
        return false;
    }
    Ext.Ajax.request({
        method: 'POST',//请求类型
        async: false,
        url : AppUrl + 'drawingManage/PRO_BASE_DEPT_ADD',
        params: {
            V_V_DEPTCODE_UP: globalId,
            V_V_DEPTNAME: Ext.getCmp('edit_name').getValue(),
            V_V_DEPTCODE: Ext.getCmp('edit_coding').getValue()
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
            V_V_DEPTCODE: Ext.getCmp('edit_coding').getValue()
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
    Ext.Msg.confirm('提示', '您确定要删除该条记录?', function (button) {
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