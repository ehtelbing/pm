Ext.Loader.setConfig({
    enabled: true
});
Ext.Loader.setPath({
    "com.data": "../com/data",
    "com.store": "../com/store",
    "com.view": "../com/view",
    "com.util": "../com/util"
});

Ext.require(['com.data.Manage', 'com.store.GridStore']);
Ext.onReady(function () {
    var dataManage = Ext.create('com.data.Manage');
    var splantname = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'splantname',
        // width:'50%',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',

            url: AppUrl + 'zdh/plant_sel',

            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                IS_V_DEPTCODE: "",
                IS_V_DEPTTYPE: '[基层单位]'
            }
        }
    });
    var editzyqStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'editzyqStore',
        // width:'50%',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'zdh/PRO_BASE_DEPT_TREE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var gzStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'gzStore',
        // width:'50%',
        fields: ['V_CRAFTCODE', 'V_CRAFTNAME'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'zdh/PRO_BASE_CRAFT_QUERY',
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

    var editgzzxStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'editgzzxStore',
        // width:'50%',
        fields: ['V_CLASS_NAME', 'V_CLASS_CODE'],
        proxy: {
            type: 'ajax',

            url: AppUrl + 'zdh/PRO_BASE_DEPTCLASS',

            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    var tree1 = Ext.create('Ext.tree.Panel', {
        id: 'tree1',
        height: 400,
        width: 250,
        rootVisible: false,
        autoLoad: false,
        region: 'west',
        border: false,
        autoScroll: true,
        dockedItems: [{
            xtype: 'panel',
            baseCls: 'my-panel-no-border',
            bodyPadding: 5,
            layout: 'column',
            items: [{
                id: 'tree1hidden',
                xtype: 'hidden'
            }, {
                id: 'plantname',
                xtype: 'combo',
                store: splantname,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local'
            }]
        }],
        store: Ext.create('Ext.data.TreeStore', {
            fields: ['id', 'text', 'parentid']
        })
    });
    // var gridStore = Ext.create('com.store.GridStore', {
    // fields:
    // ['V_PERSONCODE','V_PERSONNAME','V_LOGINNAME','V_PASSWORD','V_ROLENAME','V_POSTNAME','V_DEPTNAME']
    //
    // });
    var gridStore = Ext.create('Ext.data.Store', {
        fields: ['V_PERSONCODE', 'V_PERSONNAME', 'V_LOGINNAME',
            'V_PASSWORD', 'V_ROLENAME', 'V_POSTNAME', 'V_DEPTNAME',
            'V_CLASS_NAME'],
        autoLoad: false,
        id: 'gridStore',
        proxy: {
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            url: AppUrl + 'zdh/PRO_BASE_PERSON_VIEW'
        }
    });
    var rolelist = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'rolelist',
        fields: ['V_ROLECODE', 'V_ROLENAME'],
        proxy: {
            type: 'ajax',

            url: AppUrl + 'zdh/role_new_sel',

            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    var window = Ext.create('Ext.window.Window', {
        id: 'dialog',
        title: '编辑',
        height: 500,
        closeAction: 'hide',
        width: 650,
        modal: true,
        frame: true,
        layout: {
            type: 'absolute'
        },
        defaults: {
            labelAlign: 'right',
            labelWidth: 60,
            style: 'margin:12px 0px 0px 0px'
        },
        items: [{
            xtype: 'textfield',
            id: 'rybm',
            fieldLabel: '人员编码',
            x: 5,
            y: 20
        }, {
            xtype: 'textfield',
            id: 'rymc',
            fieldLabel: '人员名称',
            x: 5,
            y: 60
        }, {
            xtype: 'textfield',
            id: 'login',
            fieldLabel: '登入名',
            x: 5,
            y: 100
        }, {
            xtype: 'textfield',
            id: 'password',
            fieldLabel: ' 密码 ',
            x: 5,
            y: 140
        }, {
            xtype: 'combo',
            id: 'rolewin',
            store: rolelist,
            x: 5,
            y: 180,
            fieldLabel: '角色',
            displayField: 'V_ROLENAME',
            valueField: 'V_ROLECODE',
            queryMode: 'local'
        }, {
            xtype: 'combo',
            id: 'editgzzx',
            editable: false,
            store: editgzzxStore,
            x: 5,
            y: 260,
            fieldLabel: '班组',
            displayField: 'V_CLASS_NAME',
            valueField: 'V_CLASS_CODE',
            queryMode: 'local'
        }, {
            xtype: 'combo',
            id: 'editzyq',
            editable: false,
            store: editzyqStore,
            x: 5,
            y: 220,
            fieldLabel: '作业区',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local'
        }, {
            xtype: 'combo',
            id: 'gz',
            editable: false,
            store: gzStore,
            x: 5,
            y: 300,
            fieldLabel: '工种',
            displayField: 'V_CRAFTNAME',
            valueField: 'V_CRAFTCODE',
            queryMode: 'local'
        }, {
            xtype: 'label',
            id: 'gw',
            text: '岗位:',
            x: 220,
            y: 20
        }, {
            xtype: 'treepanel',
            x: 270,
            y: 20,
            id: 'tree2',
            rootVisible: false,
            height: 400,
            border: false,
            autoLoad: false,
            autoScroll: true,
            store: Ext.create('Ext.data.TreeStore', {
                id: 'store2',
                fields: ['id', 'text', 'parentid']
            })
        }]

        ,
        buttons: [{
            text: '保存',
            id: 'btnbc'
        }, {
            text: '取消',
            handler: function () {
                window.close();
            }
        }]
    });
    var grid = Ext
        .create(
        'Ext.grid.Panel',
        {
            id: 'grid',
            region: 'center',
            columnLines: true,
            width: '100%',
            store: gridStore,
            selType: 'checkboxmodel',
            columns: [// {xtype : 'rownumberer',text :
                // '序号',width : 50,align :
                // 'center'},
                {
                    text: '人员编码',
                    dataIndex: 'V_PERSONCODE',
                    align: 'center',
                    flex: 1
                }, {
                    text: '人员姓名',
                    dataIndex: 'V_PERSONNAME',
                    align: 'center',
                    flex: 1
                }, {
                    text: '登入名',
                    dataIndex: 'V_LOGINNAME',
                    align: 'center',
                    flex: 1
                }, {
                    text: '密码',
                    dataIndex: 'V_PASSWORD',
                    align: 'center',
                    flex: 1
                }, {
                    text: '角色',
                    dataIndex: 'V_ROLENAME',
                    align: 'center',
                    flex: 1
                }, {
                    text: '岗位',
                    dataIndex: 'V_POSTNAME',
                    align: 'center',
                    flex: 1
                }, {
                    text: '班组',
                    dataIndex: 'V_CLASS_NAME',
                    align: 'center',
                    flex: 1
                }, {
                    text: '作业区',
                    dataIndex: 'V_DEPTNAME',
                    align: 'center',
                    flex: 1
                }],
            autoScroll: true,
            dockedItems: [{
                xtype: 'panel',
                bodyPadding: 5,
                layout: 'column',
                frame: true,
                baseCls: 'my-panel-no-border',
                items: [
                    {
                        xtype: 'button',
                        text: '添加',
                        icon: imgpath + '/add.png',
                        width: 80,
                        handler: function () {
                            if (Ext.ComponentManager
                                    .get("tree1hidden")
                                    .getValue() == "") {
                                alert('请选择部门进行添加');
                            } else {
                                Ext.ComponentManager
                                    .get("rybm")
                                    .setValue('');
                                Ext.ComponentManager
                                    .get("rymc")
                                    .setValue('');
                                Ext.ComponentManager
                                    .get("login")
                                    .setValue('');
                                Ext.ComponentManager
                                    .get("password")
                                    .setValue('');
                                Ext.ComponentManager
                                    .get(
                                    "gz")
                                    .setValue(
                                    ''),
                                    Ext.ComponentManager
                                        .get(
                                        "editzyq")
                                        .setValue(
                                        Ext.ComponentManager
                                            .get(
                                            "tree1hidden")
                                            .getValue());
                                Ext.getCmp("editgzzx")
                                    .select('');
                                Ext.getCmp('tree2').store
                                    .setProxy({
                                        type: 'ajax',
                                        actionMethods: {
                                            read: 'POST'
                                        },
                                        url: AppUrl + 'tree/ModelTree',
                                        extraParams: {
                                            V_V_DEPTCODE: Ext.ComponentManager.get("plantname").getValue(),
                                            V_V_DEPTNAME: Ext.ComponentManager.get("plantname").getRawValue(),
                                            V_V_ID: "V_POSTCODE",
                                            V_V_TEXT: "V_POSTNAME",
                                            V_V_PARENTID: "-1",
                                            V_V_LEAF: true,
                                            V_V_CHECKED: true,
                                            V_V_DEPTVAL: Ext.ComponentManager.get("rybm").getValue(),
                                            V_V_CODEVAL: "PRO_BASE_POSTTOPERSON_GET",
                                            V_V_PRONAME : "PRO_BASE_POST_TREE"
                                        }
                                    });
                                window.show();
                                Ext.getCmp('editzyq').disabled = true;
                                Ext.getCmp('rybm')
                                    .setReadOnly(
                                    false);
                                Ext.getCmp('tree2').store
                                    .load();
                            }
                        }
                    },
                    {
                        xtype: 'button',
                        text: '修改',
                        icon: imgpath + '/edit.png',
                        style: 'margin:0px 10px 0px 10px',
                        width: 80,
                        handler: function () {

                            var selectModel = Ext
                                .getCmp("grid")
                                .getSelectionModel();
                            var id = Ext
                                .getCmp('grid')
                                .getSelectionModel()
                                .getSelection().length;

                            if (id == '0' || id > 1) {
                                Ext.Msg.alert('操作信息',
                                    '只能选择一条数据修改');
                                return false;
                            } else {

                                for (i = 0; i < Ext
                                    .getCmp('grid')
                                    .getSelectionModel()
                                    .getSelection().length; i++) {
                                    // alert(Ext.getCmp('tree2').store.tree.root.childNodes[i].data.checked);
                                    Ext.Ajax
                                        .request({
                                            url: AppUrl
                                            + 'zdh/PRO_BASE_PERSON_GET',
                                            method: 'POST',
                                            params: {
                                                V_V_PERSONCODE : selectModel
                                                    .getSelection()[i].data.V_PERSONCODE
                                            },
                                            success: function (resp) {
                                                response = Ext.JSON.decode(resp.responseText);
                                                Ext.ComponentManager.get("rybm").setValue(response.list[0].V_PERSONCODE),
                                                    Ext.getCmp('tree2').store.setProxy({
                                                            type: 'ajax',
                                                            actionMethods: {
                                                                read: 'POST'
                                                            },
                                                            url: AppUrl + 'tree/ModelTree',
                                                            extraParams: {
                                                                V_V_DEPTCODE: Ext.ComponentManager.get("plantname").getValue(),
                                                                V_V_DEPTNAME: Ext.ComponentManager.get("plantname").getRawValue(),
                                                                V_V_ID: "V_POSTCODE",
                                                                V_V_TEXT: "V_POSTNAME",
                                                                V_V_PARENTID: "-1",
                                                                V_V_LEAF: true,
                                                                V_V_CHECKED: true,
                                                                V_V_DEPTVAL: Ext.ComponentManager.get("rybm").getValue(),
                                                                V_V_CODEVAL: "PRO_BASE_POSTTOPERSON_GET",
                                                                V_V_PRONAME : "PRO_BASE_POST_TREE"
                                                            }
                                                        });

                                                Ext.getCmp('tree2').store.load();
                                                Ext.ComponentManager.get("rymc").setValue(response.list[0].V_PERSONNAME),
                                                    Ext.ComponentManager.get("login").setValue(response.list[0].V_LOGINNAME),
                                                    Ext.ComponentManager.get("password").setValue(response.list[0].V_PASSWORD),

                                                    Ext.ComponentManager
                                                        .get(
                                                        "rolewin")
                                                        .select(
                                                        response.list[0].V_ROLECODE),
                                                    Ext
                                                        .getCmp(
                                                        'editzyq')
                                                        .setValue(
                                                        response.list[0].V_DEPTCODE);
                                                Ext
                                                    .getCmp(
                                                    'editgzzx')
                                                    .setValue(
                                                    response.list[0].V_CLASS_CODE);

                                            }
                                        });
                                }
                                Ext.Ajax
                                    .request({
                                        url: AppUrl
                                        + 'zdh/PRO_PERSON_QUERY_CRAFT',
                                        method: 'POST',
                                        params: {
                                            IN_PERSON : Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.V_PERSONCODE
                                        },
                                        success: function (resp) {
                                            re = Ext.JSON
                                                .decode(resp.responseText);
                                            if (re.list != '') {
                                                Ext
                                                    .getCmp(
                                                    'gz')
                                                    .setValue(
                                                    re.list[0].V_CRAFTCODE);
                                            } else {
                                                Ext
                                                    .getCmp(
                                                    'gz')
                                                    .setValue(
                                                    '');
                                            }

                                        }
                                    });
                                window.show();
                                Ext.getCmp('editzyq').disabled = false;
                                Ext.getCmp('rybm')
                                    .setReadOnly(
                                    true);
                            }
                        }

                    },
                    {
                        xtype: 'button',
                        text: '删除',
                        icon: imgpath + '/delete1.png',
                        width: 80,
                        handler: function () {
                            var selectModel = Ext
                                .getCmp("grid")
                                .getSelectionModel();
                            var id = Ext
                                .getCmp('grid')
                                .getSelectionModel()
                                .getSelection().length;
                            if (id == '0') {
                                Ext.example.msg('操作信息',
                                    '{0}',
                                    '请选择数据进行删除');
                                return;
                            } else {
                                Ext.Msg
                                    .confirm(
                                    "警告",
                                    "确定要删除吗？",
                                    function (button) {
                                        if (button != "yes") {
                                            return;
                                        }
                                        for (i = 0; i < Ext
                                            .getCmp(
                                            'grid')
                                            .getSelectionModel()
                                            .getSelection().length; i++) {

                                            Ext.Ajax
                                                .request({
                                                    url: AppUrl
                                                    + 'zdh/PRO_BASE_PERSON_DEL',
                                                    method: 'POST',
                                                    params: {
                                                        V_V_PERSONCODE :selectModel.getSelection()[i].data.V_PERSONCODE
                                                    },
                                                    success: function () {

                                                    }
                                                });
                                            Ext.Ajax
                                                .request({
                                                    url: AppUrl
                                                    + 'zdh/PRO_PERSON_DELETE_CRAFT',
                                                    method: 'POST',
                                                    params: {
                                                        IN_PERSONCODE : Ext.getCmp('grid').getSelectionModel().getSelection()[i].data.V_PERSONCODE
                                                    },
                                                    success: function () {
                                                    }
                                                });
                                        }

                                        gridStore.load({
                                                params: {
                                                    V_V_DEPTCODE : Ext.ComponentManager.get("tree1hidden").getValue()
                                                }
                                            });
                                    });

                            }

                        }
                    }]
            }]
        });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [tree1, grid]
    });
    gzStore.on("load", function () {
        Ext.getCmp('gz').store.insert(0, {
            'V_CRAFTCODE': '',
            'V_CRAFTNAME': '无'
        });
        Ext.getCmp("gz").select(gzStore.getAt(0));
    });
    splantname.on("load", function () {
        Ext.getCmp("plantname").select(splantname.getAt(0));
    });
    rolelist.on("load", function () {
        Ext.getCmp("rolewin").select(rolelist.getAt(0));
    });
    gridStore.on("load", function () {
        gridStore.sort([{
            property: 'V_CLASS_NAME',
            direction: 'ASC'
        }]);
    });
    Ext.getCmp("plantname").on(
        "change",
        function () {
            Ext.getCmp('tree1').store.setProxy({
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: AppUrl + 'tree/ModelTree',
                extraParams: {
                    V_V_DEPTCODE: Ext.ComponentManager.get("plantname").getValue(),
                    V_V_DEPTNAME: Ext.ComponentManager.get("plantname").getRawValue(),
                    V_V_ID: "V_DEPTCODE",
                    V_V_TEXT: "V_DEPTNAME",
                    V_V_PARENTID: "-1",
                    V_V_LEAF: true,
                    V_V_CHECKED: "",
                    V_V_DEPTVAL: "",
                    V_V_CODEVAL: "",
                    V_V_PRONAME : "PRO_BASE_DEPT_TREE"
                }
            });
            Ext.getCmp('tree1').store.load();

            editzyqStore.load({
                params: {
                    V_V_DEPTCODE: Ext.ComponentManager.get("plantname").getValue()
                }
            });

            rolelist.load({
                params: {
                    V_V_DEPTCODE: Ext.ComponentManager.get("plantname").getValue()
                }
            });

        });

    Ext.getCmp("editzyq").on(
        "change",
        function () {
            editgzzxStore.load({
                params: {
                    V_V_DEPTREPAIRCODE: Ext.ComponentManager.get("editzyq").getValue()
                }
            });
            Ext.getCmp("editgzzx").select(editgzzxStore.getAt(0));
        });

    Ext.getCmp("tree1").on('itemclick', function (view, node) {
        Ext.ComponentManager.get("tree1hidden").setValue(node.data.id);
        gridStore.load({
            params: {
                V_V_DEPTCODE : node.data.id
            }
        });
    });
    Ext.ComponentManager
        .get('btnbc')
        .on(
        'click',
        function () {
            if (Ext.ComponentManager.get("rybm").getValue() == ""
                || Ext.ComponentManager.get("rymc")
                    .getValue() == ""
                || Ext.ComponentManager.get("login")
                    .getValue() == "") {
                alert('人员编码，人员名称，登入名不能为空');
            } else {
                Ext.Ajax.request({
                        url: AppUrl + 'zdh/PRO_BASE_PERSON_SET',
                        method: 'POST',
                        params: {
                            V_V_PERSONCODE:Ext.ComponentManager
                                .get("rybm")
                                .getValue(),
                            V_V_PERSONNAME : Ext.ComponentManager.get("rymc").getValue(),
                            V_V_LOGINNAME :  Ext.ComponentManager.get("login").getValue(),
                            V_V_PASSWORD :  Ext.ComponentManager.get("password").getValue(),
                            V_V_DEPTCODE : Ext.ComponentManager.get("editzyq").getValue(),
                            V_V_ROLECODE :  Ext.ComponentManager.get("rolewin").getValue(),
                            V_I_ORDERID : '0',
                            V_I_CLASS :Ext.ComponentManager.get("editgzzx").getValue()
                        },
                        success: function () {
                            for (var i = 0; i < Ext.data.StoreManager
                                .get('store2').tree.root.childNodes.length; i++) {
                                Ext.Ajax
                                    .request({
                                        url: AppUrl
                                        + 'zdh/PRO_BASE_POSTTOPERSON_SET',
                                        method: 'POST',
                                        params: {
                                            V_V_POSTCODE:Ext.data.StoreManager.get('store2').tree.root.childNodes[i].data.id,
                                            V_V_PERSONCODE: Ext.ComponentManager.get("rybm").getValue(),
                                            V_V_TYPE :  Ext.data.StoreManager.get('store2').tree.root.childNodes[i].data.checked
                                        },
                                        success: function () {
                                        }
                                    });
                            }
                            Ext.Ajax
                                .request({
                                    url: AppUrl
                                    + 'zdh/PRO_PERSON_ADD_CRAFT',
                                    method: 'POST',
                                    params: {
                                        IN_CRAFTCODE :Ext.ComponentManager.get("gz").getValue(),
                                        IN_PERSONCODE : Ext.ComponentManager.get("rybm").getValue()
                                    },
                                    success: function () {
                                    }
                                });

                            gridStore
                                .load({
                                    params: {
                                        V_V_DEPTCODE : Ext.ComponentManager.get("tree1hidden").getValue()
                                    }
                                });
                            window.close();

                        }
                    });

            }

        });
});
