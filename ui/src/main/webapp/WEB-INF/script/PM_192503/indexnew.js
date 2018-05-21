Ext.Loader.setConfig({
    enabled: true
});
Ext.Loader.setPath({
    "com.data": "../com/data",
    "com.store": "../com/store",
    "com.view": "../com/view",
    "com.util": "../com/util"
});
var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
Ext.require(['com.data.Manage', 'com.store.GridStore']);
var treepercode='';
Ext.onReady(function () {
    var dataManage = Ext.create('com.data.Manage');
    var splantname = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'splantname',
        // width:'50%',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',

            url: AppUrl +'PM_06/PRO_BASE_DEPT_VIEW_ROLE',

            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'V_V_PERSONCODE': V_V_PERSONCODE,
                'V_V_DEPTCODE': V_V_DEPTCODE,
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '基层单位'
            }
        }
    });
    var zyqstore = Ext.create("Ext.data.Store", {
        autoLoad : false,
        storeId : 'zyqstore',
        fields : [ 'V_DEPTCODE', 'V_DEPTNAME' ],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
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
    /*var tree1 = Ext.create('Ext.tree.Panel', {
        id: 'tree1',
        region: 'center',
        rootVisible: false,
        autoLoad: false,
        border: false,
        autoScroll: true,
        store: Ext.create('Ext.data.TreeStore', {
            fields: ['id', 'text', 'parentid']
        })
    });*/

    var treeStore = Ext.create('Ext.data.TreeStore', {
        storeId: 'treeStore',
        autoLoad: false,
        fields: ['sid', 'text', 'parentid', 'craftcode', 'craftname'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'cjy/selectPersonTreeFromDept',
            extraParams: {
                V_V_DEPTCODE : '',
                V_V_DEPTTYPE : '',
                V_V_FLAG : ''
            },
            reader: {
                type: 'json',
                root: 'children'
            },
            root: {
                text: 'root',
                expanded: true
            }
        },
        listeners: {
            'beforeexpand': function (node, eOpts) {
                //点击父亲节点的菜单会将节点的id通过ajax请求，将到后台
                this.proxy.extraParams.V_V_DEPTCODE = node.raw.id;
                this.proxy.extraParams.V_V_FLAG = 'false';
            }
        }
    });
    var tree1 = Ext.create('Ext.tree.Panel', {
        id: 'tree1',
        store: treeStore,
        region: 'center',
        animate: true,//开启动画效果
        rootVisible: false,
        hideHeaders: true,//是否隐藏表头,默认为false
        columns: [{
            xtype: 'treecolumn',
            dataIndex: 'text',
            flex: 1
        }],
        listeners: {
            //checkchange: OnClickMenuCheckTree
        }
    });
    var treePanel1= Ext.create('Ext.panel.Panel', {
        region: 'west',
        layout:'border',
        border:false,
        width: '16%',
        items:[
            {
                xtype: 'panel',
                //baseCls: 'my-panel-no-border',
                bodyPadding: 5,
                region:'north',
                layout: 'column',
                frame:true,
                items: [{
                    id: 'tree1hidden',
                    xtype: 'hidden'
                }, {
                    id: 'plantname',
                    xtype: 'combo',
                    store: splantname,
                    editable: false,
                    displayField: 'V_DEPTNAME',
                    valueField: 'V_DEPTCODE',
                    queryMode: 'local'
                }
                ]
            },tree1]

    });


    var window = Ext.create('Ext.window.Window', {
        id: 'dialog',
        title: '编辑',
        height: 300,
        closeAction: 'hide',
        width: 500,
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
            width: 250,
            x: 5,
            y: 20
        }, {
            xtype: 'textfield',
            id: 'rymc',
            fieldLabel: '人员名称',
            width: 250,
            x: 5,
            y: 60
        }, {
            xtype: 'textfield',
            id: 'login',
            fieldLabel: '登入名',
            width: 250,
            x: 5,
            y: 100
        }, {
            xtype: 'textfield',
            id: 'password',
            fieldLabel: ' 密码 ',
            width: 250,
            x: 5,
            y: 140
        }],
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

    var gridStore = Ext.create('Ext.data.Store', {
        fields: ['V_PERSONCODE', 'V_PERSONNAME', 'V_LOGINNAME',
            'V_PASSWORD', 'V_ROLENAME', 'V_POSTNAME', 'V_DEPTNAME','V_DEPTCODE',
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
            url: AppUrl + 'cjy/BASE_PERSON_SEL_BYDEPT'
        }
    });
    var gridPostStore=Ext.create('Ext.data.Store',{
        id : 'gridPostStore',
        autoLoad : false,
        fields: ['V_POSTCODE',
            'V_PERSONCODE',
            'D_DATE_EDITTIME',
            'V_EDIT_GUID',
            'I_PERSONID',
            'V_PERSONNAME',
            'V_LOGINNAME',
            'V_PASSWORD',
            'V_DEPTCODE',
            'V_ROLECODE',
            'I_ORDERID',
            'V_CLASSCODE',
            'V_PERSONCODE',
            'V_TELEPHONE',
            'D_DATE_EDITTIME',
            'V_EDIT_GUID',
            'V_CLASS_CODE',
            'I_POSTID',
            'V_POSTCODE',
            'V_POSTNAME',
            'V_POSTMEMO',
            'V_DEPTCODE',
            'V_POSTCODE_UP',
            'D_DATE_EDITTIME',
            'V_EDIT_GUID'],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'cjy/PRO_BASE_POST_GET_BYPER',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list',
                total : 'total'
            }
        }
    });

    var gridRoleStore=Ext.create('Ext.data.Store',{
        id : 'gridRoleStore',
        autoLoad : false,
        fields: ['I_ROLEID',
            'V_ROLECODE',
            'V_ROLENAME',
            'V_ROLETYPE',
            'V_DEPTCODE',
            'V_DEPTNAME'],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'basic/PRO_BASE_PERSONROLE_VIEW_NEW',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list',
                total : 'total'
            }
        }
    });

    var gridRoleSelStore=Ext.create('Ext.data.Store',{
        id : 'gridRoleSelStore',
        autoLoad : false,
        fields: ['I_PERSONID',
            'V_PERSONNAME',
            'V_LOGINNAME',
            'V_PASSWORD',
            'V_DEPTCODE',
            'V_ROLECODE',
            'V_ROLENAME',
            'I_ORDERID',
            'V_CLASSCODE',
            'V_PERSONCODE',
            'V_TELEPHONE',
            'D_DATE_EDITTIME',
            'V_EDIT_GUID',
            'V_CLASS_CODE'
        ],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'cjy/PRO_BASE_PERSON_GET_BYDEPT',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list',
                total : 'total'
            }
        }
    });

    var gridClassStore=Ext.create('Ext.data.Store',{
        id : 'gridClassStore',
        autoLoad : false,
        fields: ['I_ID',
            'V_DEPTCODE',
            'V_SAP_WORK',
            'V_SAP_WORKNAME'

        ],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'basic/PRO_BASE_DEPTTOSAPWORKCSAT',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list',
                total : 'total'
            }
        }
    });
    var gridClassSelStore=Ext.create('Ext.data.Store',{
        id : 'gridClassSelStore',
        autoLoad : false,
        fields: ['I_PERSONID',
            'V_PERSONNAME',
            'V_LOGINNAME',
            'V_PASSWORD',
            'V_DEPTCODE',
            'V_ROLECODE',
            'V_ROLENAME',
            'I_ORDERID',
            'V_CLASS_CODE',
            'V_PERSONCODE',
            'V_TELEPHONE',
            'D_DATE_EDITTIME',
            'V_EDIT_GUID',
            'V_SAP_WORKNAME'
        ],
        proxy : {
            type : 'ajax',
            async : false,
            url: AppUrl + 'cjy/PRO_BASE_PERSON_GET_BYDEPT',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list',
                total : 'total'
            }
        }
    });

    var gridEquStore = Ext.create('Ext.data.Store', {
        id : 'gridEquStore',
        autoLoad : false,
        fields : [ 'V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE', 'V_EQUSITENAME' ],
        proxy : {
            type : 'ajax',
            async : false,
            url : AppUrl + 'pm_19/PRO_GET_DEPTEQU_PER',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            }
        }
    });
    var gridProfesStore = Ext.create('Ext.data.Store', {
        id : 'gridProfesStore',
        autoLoad : false,
        fields : ['I_ID',
            'V_SPECIALTYCODE',
            'V_DEPTCODE',
            'V_PERSONCODE',
            'D_DATE_EDITTIME',
            'V_EDIT_GUID',
            'V_PERSONNAME'
        ],
        proxy : {
            type : 'ajax',
            async : false,
            url : AppUrl + 'cjy/PRO_BASE_SPECIALTY_TREE_CHECK',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            }
        }
    });
    var gridTypeStore = Ext.create('Ext.data.Store', {
        id: 'gridTypeStore',
        autoLoad: true,
        fields: ['V_WORKCODE', 'V_WORKNAME', 'V_TIME', 'V_DE',
            'V_WORKTYPE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PRO_BASE_PERSON_DE_SEL',
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

    var gridTypeSelStore = Ext.create('Ext.data.Store', {
        id : 'gridTypeSelStore',
        autoLoad : false,
        fields: ['V_CRAFTCODE',
            'V_PERSONCODE',
            'D_DATE_EDITTIME',
            'V_EDIT_GUID',
            'V_WORKNAME',
            'V_PERSONNAME',
            'V_DE'
        ],
        proxy : {
            type : 'ajax',
            async : false,
            url : AppUrl + 'cjy/PRO_BASE_CRAFTTOPER_GETBYPER',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            }
        }
    });
    /*var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        region: 'center',
        columnLines: true,
        width: '100%',
        store: gridStore,
        selType: 'checkboxmodel',
        autoScroll: true,
        columns: [// {xtype : 'rownumberer',text :
            // '序号',width : 50,align :
            // 'center'},
            {
                text: '姓名',
                dataIndex: 'V_PERSONNAME',
                align: 'center',
                flex: 1
            }, {
                text: '编码',
                dataIndex: 'V_PERSONCODE',
                align: 'center',
                flex: 1
            },{
                text: '即时通号',
                dataIndex: 'V_PASSWORD',
                align: 'center',
                flex: 1
            },  {
                text: '登录名',
                dataIndex: 'V_LOGINNAME',
                align: 'center',
                flex: 1
            }],
        listeners : {
            itemclick : itemclick
        }
    });*/

    var personPanel=Ext.create('Ext.panel.Panel',{
        id:'personPanel',
        region: 'center',
        width: '100%',
        //autoScroll: true,
        frame:true,
        items:[{xtype:'panel', region:'north',minWidth:330,layout:'hbox',height:'100%',frame:true,baseCls: 'my-panel-no-border',
            items:[{xtype:'panel', minWidth:330,  layout:'vbox',baseCls: 'my-panel-no-border',
                items:[
                    {xtype:'textfield',id:'percode',fieldLabel:'人员编码',labelAlign:'right',labelWidth:80,width:280,style: ' margin: 15px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'pername',fieldLabel:'人员名称',labelAlign:'right',labelWidth:80,width:280,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'perlogname',fieldLabel:'登录名',labelAlign:'right',labelWidth:80,width:280,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'perpassword',fieldLabel:'密码',labelAlign:'right',labelWidth:80,width:280,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'perdept',fieldLabel:'厂矿',labelAlign:'right',labelWidth:80,width:280,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'perrole',fieldLabel:'角色',labelAlign:'right',labelWidth:80,width:280,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'perclass',fieldLabel:'工作中心',labelAlign:'right',labelWidth:80,width:280,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'pertel',fieldLabel:'电话',labelAlign:'right',labelWidth:80,width:280,style: ' margin: 5px 0px 0px 10px',readOnly:true}
                    ]}]}]
    });
    var centerPanel1= Ext.create('Ext.panel.Panel', {
        region: 'center',
        layout: 'border',
        width:'19%',
        border: false,
        items: [{
            xtype: 'panel',
            bodyPadding: 5,
            region:'north',
            layout: 'column',
            frame: true,
            //baseCls: 'my-panel-no-border',
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
                            window.show();
                            Ext.getCmp('rybm')
                                .setReadOnly(
                                false);
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

                        /*var selectModel = Ext
                            .getCmp("grid")
                            .getSelectionModel();
                        var id = Ext
                            .getCmp('grid')
                            .getSelectionModel()
                            .getSelection().length;
*/
                        //if (id == '0' || id > 1) {
                        if (treepercode == '') {
                            Ext.Msg.alert('操作信息',
                                '只能选择一条数据修改');
                            return false;
                        } else {

                                Ext.Ajax
                                    .request({
                                        url: AppUrl
                                        + 'cjy/PRO_BASE_PERSON_GET_BYDEPT',
                                        method: 'POST',
                                        params: {
                                            V_V_PERSONCODE : treepercode
                                        },
                                        success: function (resp) {
                                            response = Ext.JSON.decode(resp.responseText);
                                            Ext.ComponentManager.get("rybm").setValue(response.list[0].V_PERSONCODE);

                                            Ext.ComponentManager.get("rymc").setValue(response.list[0].V_PERSONNAME);
                                                Ext.ComponentManager.get("login").setValue(response.list[0].V_LOGINNAME);
                                                Ext.ComponentManager.get("password").setValue(response.list[0].V_PASSWORD);

                                        }
                                    });

                            Ext.Ajax
                                .request({
                                    url: AppUrl
                                    + 'zdh/PRO_PERSON_QUERY_CRAFT',
                                    method: 'POST',
                                    params: {
                                        IN_PERSON : treepercode//Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.V_PERSONCODE
                                    },
                                    success: function (resp) {
                                        re = Ext.JSON
                                            .decode(resp.responseText);

                                    }
                                });
                            window.show();
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
                       /* var selectModel = Ext
                            .getCmp("grid")
                            .getSelectionModel();
                        var id = Ext
                            .getCmp('grid')
                            .getSelectionModel()
                            .getSelection().length;
                        if (id == '0') {*/
                        if (treepercode == '') {
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

                                        Ext.Ajax
                                            .request({
                                                url: AppUrl
                                                + 'zdh/PRO_BASE_PERSON_DEL',
                                                method: 'POST',
                                                params: {
                                                    V_V_PERSONCODE :treepercode//selectModel.getSelection()[i].data.V_PERSONCODE
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
                                                    IN_PERSONCODE : treepercode//Ext.getCmp('grid').getSelectionModel().getSelection()[i].data.V_PERSONCODE
                                                },
                                                success: function () {
                                                }
                                            });
                                    /*gridStore.load({
                                        params: {
                                            V_V_DEPTCODE : Ext.ComponentManager.get("tree1hidden").getValue()
                                        }
                                    });*/
                                    loadTree();
                                    loadPerson('del');

                                });

                        }

                    }
                }]
        },personPanel]
    });
    var postTree = Ext.create('Ext.tree.Panel', {
        id: 'postTree',
        title: '岗位树',
        region: 'west',
        width: '30%',
        rootVisible: false,
        autoLoad: false,
        border: false,
        autoScroll: true,
        store: Ext.create('Ext.data.TreeStore', {
            fields: ['id', 'text', 'parentid']
        }),
        listeners: {
            itemclick: postTreeitemclick
        }
    });
    var postGrid = Ext.create('Ext.grid.Panel', {
        id: 'postGrid',
        region: 'center',
        columnLines: true,
        width: '70%',
        store: gridPostStore,
        //selType: 'checkboxmodel',
        autoScroll: true,
        columns: [// {xtype : 'rownumberer',text :
            // '序号',width : 50,align :
            // 'center'},
            {
                text: '岗位编码',
                dataIndex: 'V_POSTCODE',
                align: 'center',
                flex: 1
            }, {
                text: '岗位名称',
                dataIndex: 'V_POSTNAME',
                align: 'center',
                flex: 1
            }, {
                text: '删除',
                align: 'center',
                flex: 1,
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return '<a href=javascript:_delPost(\'' + record.data.V_POSTCODE + '\')>' + '删除' + '</a>';
                }
            }]
    });
    var postPanel= Ext.create('Ext.panel.Panel', {
        title:'人员岗位',
        region: 'center',
        layout:'border',
        border:false,
        frame:true,
        width: 250,
        items:[
           postTree,postGrid]

    });

    var roleGrid = Ext.create('Ext.grid.Panel', {
        id: 'roleGrid',
        region: 'west',
        columnLines: true,
        width: '30%',
        store: gridRoleStore,
        //selType: 'checkboxmodel',
        autoScroll: true,
        columns: [// {xtype : 'rownumberer',text :
            // '序号',width : 50,align :
            // 'center'},
            {
                text: '角色编码',
                dataIndex: 'V_ROLECODE',
                align: 'center',
                flex: 1
            }, {
                text: '角色名称',
                dataIndex: 'V_ROLENAME',
                align: 'center',
                flex: 1
            }],
        listeners : {
            itemclick : roleitemclick
        }
    });

    var roleSelGrid = Ext.create('Ext.grid.Panel', {
        id: 'roleSelGrid',
        region: 'center',
        columnLines: true,
        width: '70%',
        store: gridRoleSelStore,
        //selType: 'checkboxmodel',
        autoScroll: true,
        columns: [// {xtype : 'rownumberer',text :
            // '序号',width : 50,align :
            // 'center'},
            {
                text: '角色编码',
                dataIndex: 'V_ROLECODE',
                align: 'center',
                flex: 1
            }, {
                text: '角色名称',
                dataIndex: 'V_ROLENAME',
                align: 'center',
                flex: 1
            },{
                text: '人员编码',
                dataIndex: 'V_PERSONCODE',
                align: 'center',
                flex: 1
            }, {
                text: '人员名称',
                dataIndex: 'V_PERSONNAME',
                align: 'center',
                flex: 1
            }, {
                text: '删除',
                align: 'center',
                flex: 1,
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return '<a href=javascript:_delRole(\'' + record.data.V_PERSONCODE + '\')>' + '删除' + '</a>';
                }
            }]
    });
    var rolePanel= Ext.create('Ext.panel.Panel', {
        title:'人员角色',
        region: 'center',
        layout:'border',
        border:false,
        frame:true,
        width: 250,
        items:[
            roleGrid,roleSelGrid]

    });

    var classGrid = Ext.create('Ext.grid.Panel', {
        id: 'classGrid',
        region: 'west',
        columnLines: true,
        width: '40%',
        store: gridClassStore,
        //selType: 'checkboxmodel',
        autoScroll: true,
        columns: [// {xtype : 'rownumberer',text :
            // '序号',width : 50,align :
            // 'center'},
            {
                text: '工作中心编码',
                dataIndex: 'V_SAP_WORK',
                align: 'center',
                flex: 1
            }, {
                text: '工作中心名称',
                dataIndex: 'V_SAP_WORKNAME',
                align: 'center',
                flex: 1
            }],
        listeners : {
            itemclick : classitemclick
        }
    });

    var classSelGrid = Ext.create('Ext.grid.Panel', {
        id: 'classSelGrid',
        region: 'center',
        columnLines: true,
        width: '60%',
        store: gridClassSelStore,
        //selType: 'checkboxmodel',
        autoScroll: true,
        columns: [// {xtype : 'rownumberer',text :
            // '序号',width : 50,align :
            // 'center'},
            {
                text: '所在工作中心编码',
                dataIndex: 'V_CLASS_CODE',
                align: 'center',
                flex: 1
            }, {
                text: '所在工作中心名称',
                dataIndex: 'V_SAP_WORKNAME',
                align: 'center',
                flex: 1
            }, {
                text: '人员编码',
                dataIndex: 'V_PERSONCODE',
                align: 'center',
                flex: 1
            }, {
                text: '人员名称',
                dataIndex: 'V_PERSONNAME',
                align: 'center',
                flex: 1
            },{
                text: '删除',
                align: 'center',
                flex: 1,
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return '<a href=javascript:_delClass(\'' + record.data.V_PERSONCODE + '\')>' + '删除' + '</a>';
                }
            }]
    });
    var classPanel= Ext.create('Ext.panel.Panel', {
        title:'工作中心信息',
        region: 'center',
        layout:'border',
        border:false,
        frame:true,
        width: 250,
        items:[
            classGrid,classSelGrid]

    });



    var equnorPanel= Ext.create('Ext.panel.Panel', {
        region: 'north',
        layout:'column',
        border:false,
        frame:true,
        width: '100%',
        items:[ {
            id: 'ck',
            xtype: 'combo',
            fieldLabel: '厂矿',
            labelWidth: 80,
            store: splantname,
            editable: false,
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE',
            queryMode: 'local',
            margin:'5 0 5 10'
        },
            {
                id: 'zyq',
                xtype: 'combo',
                fieldLabel: '作业区',
                labelWidth: 80,
                store: splantname,
                editable: false,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local',
                margin:'5 0 5 10'
            }]

    });
    var equTree = Ext.create('Ext.tree.Panel', {
        id: 'equTree',
        title:'设备类型树',
        region: 'west',
        width: '20%',
        rootVisible: false,
        autoLoad: false,
        border: false,
        autoScroll: true,
        store: Ext.create('Ext.data.TreeStore', {
            fields: ['id', 'text', 'parentid']
        }),
        listeners: {
            itemclick: equTreeitemclick
        }
    });

    var equGrid = Ext.create('Ext.grid.Panel', {
        id: 'equGrid',
        region: 'center',
        columnLines: true,
        width: '50%',
        store: gridEquStore,
        selType: 'checkboxmodel',
        autoScroll: true,
        columns: [// {xtype : 'rownumberer',text :
            // '序号',width : 50,align :
            // 'center'},
            {
                text: '设备编码',
                dataIndex: 'V_EQUCODE',
                align: 'center',
                flex: 1
            }, {
                text: '设备名称',
                dataIndex: 'V_EQUNAME',
                align: 'center',
                flex: 1
            },  {
                text : '设备位置编码',
                dataIndex : 'V_EQUSITE',
                flex: 1,
                align : 'center'
            }, {
                text : '设备位置',
                dataIndex : 'V_EQUSITENAME',
                flex: 1,
                align : 'center'
            }],
        listeners : {
            select : OnSelectionEquChanged,
            deselect : OnClickEquGridPanel
        }
    });
    var eastpanel=Ext.create('Ext.panel.Panel',{
        id:'eastpanel',
        region:'east',
        layout:'border',
        autoScroll : true,
        width: '30%',
        frame:true,
        items:[{xtype:'panel', region:'north',minWidth:330,height:'70%',layout:'hbox',frame:true,title:'设备明细',
            items:[{xtype:'panel', minWidth:330, layout:'vbox',baseCls: 'my-panel-no-border',
                items:[
                    {xtype:'textfield',id:'rsbbm',fieldLabel:'设备编码',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rsbmc',fieldLabel:'设备名称',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rsblxbm',fieldLabel:'设备类型编码',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rsblxwz',fieldLabel:'设备类型位置',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rwzbm',fieldLabel:'位置编码',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rwzmc',fieldLabel:'位置名称',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rsblx',fieldLabel:'设备类型',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rsbzl',fieldLabel:'设备种类',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rbs',fieldLabel:'ABC标识',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rksrq',fieldLabel:'开始日期',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rjsrq',fieldLabel:'结束日期',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rcbzx',fieldLabel:'成本中心',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rggxh',fieldLabel:'规格型号',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rdxcc',fieldLabel:'大小/尺寸',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rzczzs',fieldLabel:'资产制造商',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rgzjz',fieldLabel:'购置价值',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rdxzl',fieldLabel:'对象重量',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true}]}]},
            {xtype:'panel',region:'center',layout:'vbox',height:'30%',autoScroll: true,frame:true,/*baseCls: 'my-panel-no-border',*/title:'固定资产',
                items:[{xtype:'textfield',id:'rsbbmn',fieldLabel:'设备编码',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'rsbmcn',fieldLabel:'设备名称',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true},
                    {xtype:'textfield',id:'yz',fieldLabel:'原值',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true,value:0},
                    {xtype:'textfield',id:'zj',fieldLabel:'折旧',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true,value:0},
                    {xtype:'textfield',id:'jxfy',fieldLabel:'检修费用',labelAlign:'right',labelWidth:90,width:300,style: ' margin: 5px 0px 0px 10px',readOnly:true,value:0},
                ]}]
    });
    var equPanel= Ext.create('Ext.panel.Panel', {
        title:'人员设备管理',
        region: 'center',
        layout:'border',
        border:false,
        frame:true,
        width: 250,
        items:[equnorPanel,equTree,equGrid/*,eastpanel*/]

    });

    var profesTree = Ext.create('Ext.tree.Panel', {
        id: 'profesTree',
        title:'专业树',
        region: 'west',
        width: '30%',
        rootVisible: false,
        autoLoad: false,
        border: false,
        autoScroll: true,
        store: Ext.create('Ext.data.TreeStore', {
            fields: ['id', 'text', 'parentid','sid']
        }),
        listeners: {
            itemclick: profesTreeitemclick
        }
    });
    var profesGrid = Ext.create('Ext.grid.Panel', {
        id: 'profesGrid',
        region: 'center',
        columnLines: true,
        width: '70%',
        store: gridProfesStore,
        selType: 'checkboxmodel',
        autoScroll: true,
        columns: [// {xtype : 'rownumberer',text :
            // '序号',width : 50,align :
            // 'center'},
            {
                text: '人员名称',
                dataIndex: 'V_PERSONNAME',
                align: 'center',
                flex: 1
            }, {
                text: '专业名称',
                dataIndex: 'V_SPECIALTYCODE',
                align: 'center',
                flex: 1
            }]
    });

    var profesPanel= Ext.create('Ext.panel.Panel', {
        title:'人员对应专业',
        region: 'center',
        layout:'border',
        border:false,
        frame:true,
        width: 250,
        items:[profesTree,profesGrid]

    });

    var typeGrid = Ext.create('Ext.grid.Panel', {
        id: 'typeGrid',
        region: 'west',
        columnLines: true,
        width: '40%',
        store: gridTypeStore,
        //selType: 'checkboxmodel',
        autoScroll: true,
        columns: [// {xtype : 'rownumberer',text :
            // '序号',width : 50,align :
            // 'center'},
            {
                text: '工种编码',
                dataIndex: 'V_WORKCODE',
                align: 'center',
                flex: 1
            }, {
                text: '工种名称',
                dataIndex: 'V_WORKNAME',
                align: 'center',
                flex: 1
            }, {
                text: '工种类型',
                dataIndex: 'V_WORKTYPE',
                align: 'center',
                flex: 1
            }, {
                text: '工种定额',
                dataIndex: 'V_DE',
                align: 'center',
                flex: 1
            }],
        listeners : {
            itemclick : typeitemclick
        }
    });

    var typeSelGrid = Ext.create('Ext.grid.Panel', {
        id: 'typeSelGrid',
        region: 'center',
        columnLines: true,
        width: '60%',
        store: gridTypeSelStore,
        //selType: 'checkboxmodel',
        autoScroll: true,
        columns: [// {xtype : 'rownumberer',text :
            // '序号',width : 50,align :
            // 'center'},
            {
                text: '人员名称',
                dataIndex: 'V_PERSONNAME',
                align: 'center',
                flex: 1
            }, {
                text: '工种名称',
                dataIndex: 'V_WORKNAME',
                align: 'center',
                flex: 1
            }, {
                text: '工种定额',
                dataIndex: 'V_DE',
                align: 'center',
                flex: 1
            }, {
                text: '删除',
                align: 'center',
                flex: 1,
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return '<a href=javascript:_delType(\'' + record.data.V_PERSONCODE + '\',\'' + record.data.V_CRAFTCODE + '\')>' + '删除' + '</a>';
                }
            }]
    });
    var typePanel= Ext.create('Ext.panel.Panel', {
        title:'人员对应工种',
        region: 'center',
        layout:'border',
        border:false,
        frame:true,
        width: 250,
        items:[typeGrid,typeSelGrid]

    });
    var passwordPanel= Ext.create('Ext.panel.Panel', {
        title:'密码管理',
        region: 'center',
        layout:'vbox',
        border:false,
        frame:true,
        baseCls: 'my-panel-no-border',
        width: 250,
        items:[{xtype:'displayfield',id:'uname',fieldLabel: '用户名',labelAlign:'right',labelWidth:80, style: ' margin: 7px 0px 0px 10px'},
            {xtype:'textfield',id:'ymm', fieldLabel: '原密码',inputType:'password',labelAlign:'right',labelWidth:80, style: ' margin: 7px 0px 0px 10px'},
            {xtype:'textfield',id:'xmm', fieldLabel: '新密码',inputType:'password',labelAlign:'right',labelWidth:80, style: ' margin: 7px 0px 0px 10px'},
            {xtype:'textfield',id:'cfxma', fieldLabel: '重复新密码',inputType:'password',labelAlign:'right',labelWidth:80, style: ' margin: 7px 0px 0px 10px'},
            {xtype:'button',text:'确定', icon: imgpath+'/saved.png', style: ' margin: 7px 0px 0px 170px',listeners:{click:OnButtonSaveClicked}}]

    });

    var tab2 = Ext.create('Ext.tab.Panel', {
        id:'tab2',
        //title:'已选信息',
        frame:true,
        region : 'east',
        width: '65%',
        //layout : 'border',
        items: [postPanel,rolePanel,classPanel,equPanel,profesPanel,typePanel,passwordPanel]
    });
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [treePanel1, centerPanel1,tab2]
    });

    loadPostTree();

    splantname.on("load", function () {
        Ext.getCmp("plantname").select(splantname.getAt(0));
        Ext.getCmp("ck").select(splantname.getAt(0));
        Ext.data.StoreManager.lookup('zyqstore').load({
            params : {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE':   Ext.getCmp("ck").getValue(),
                'V_V_DEPTCODENEXT':  Ext.util.Cookies.get('v_deptcode'),
                'V_V_DEPTTYPE':'[主体作业区]'
            }
        });
    });
    Ext.data.StoreManager.lookup('zyqstore').on("load", function() {
        Ext.getCmp("zyq").select(Ext.data.StoreManager.lookup('zyqstore').getAt(0));
    });
    Ext.ComponentManager.get('zyq').on("change", function() {
        Ext.getCmp('equTree').store.setProxy({
            type : 'ajax',
            url : AppUrl + 'pm_19/DepartAndEquTypeTree',
            extraParams : {
                V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT : Ext.getCmp('zyq').getValue()
            },
            actionMethods : {
                read : 'POST'
            }
        });
        Ext.getCmp('equTree').store.load();
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
            /*Ext.getCmp('tree1').store.setProxy({
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
            Ext.getCmp('tree1').store.load();*/
            var treeStore = Ext.data.StoreManager.lookup('treeStore');
            treeStore.proxy.extraParams = {
                V_V_DEPTCODE: Ext.getCmp('plantname').getValue(),
                //V_V_DEPTTYPE:  '[主体作业区]',
                V_V_FLAG: 'true'
            };
            treeStore.currentPage = 1;
            treeStore.load();

            editzyqStore.load({
                params: {
                    V_V_DEPTCODE: Ext.getCmp('plantname').getValue()
                }
            });


        });


    Ext.getCmp("tree1").on('itemclick', function (view, node) {
        Ext.ComponentManager.get("tree1hidden").setValue(node.data.parentid);
        treepercode=node.data.sid;
        /*gridStore.load({
            params: {
                V_V_DEPTCODE : node.data.id
            }
        });*/
        Ext.Ajax
            .request({
                url: AppUrl
                + 'cjy/PRO_BASE_PERSON_GET_BYDEPT',
                method: 'POST',
                params: {
                    V_V_PERSONCODE : node.data.sid
                },
                success: function (resp) {
                    var response = Ext.JSON.decode(resp.responseText);
                    if(response.list.length>0){
                        Ext.ComponentManager.get("percode").setValue(response.list[0].V_PERSONCODE);
                        Ext.ComponentManager.get("pername").setValue(response.list[0].V_PERSONNAME);
                        Ext.ComponentManager.get("perlogname").setValue(response.list[0].V_LOGINNAME);
                        Ext.ComponentManager.get("perpassword").setValue(response.list[0].V_PASSWORD);
                        Ext.ComponentManager.get("perdept").setValue(response.list[0].V_DEPTNAME);
                        Ext.ComponentManager.get("perrole").setValue(response.list[0].V_ROLENAME);
                        Ext.ComponentManager.get("perclass").setValue(response.list[0].V_SAP_WORKNAME);
                        Ext.ComponentManager.get("pertel").setValue(response.list[0].V_TEL);

                        loadTab(response.list[0].V_PERSONCODE,response.list[0].V_DEPTCODE,response.list[0].V_PERSONNAME);
                    }



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
                        V_V_PERSONCODE:Ext.ComponentManager.get("rybm").getValue(),
                        V_V_PERSONNAME : Ext.ComponentManager.get("rymc").getValue(),
                        V_V_LOGINNAME :  Ext.ComponentManager.get("login").getValue(),
                        V_V_PASSWORD :  Ext.ComponentManager.get("password").getValue(),
                        V_V_DEPTCODE : Ext.ComponentManager.get("tree1hidden").getValue(),
                        V_V_ROLECODE :  '',
                        V_I_ORDERID : '0',
                        V_I_CLASS :''
                    },
                    success: function () {
                        /*for (var i = 0; i < Ext.data.StoreManager
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
                         */
                        /*gridStore
                            .load({
                                params: {
                                    V_V_DEPTCODE : Ext.ComponentManager.get("tree1hidden").getValue()
                                }
                            });*/
                        window.close();
                        loadPerson(Ext.ComponentManager.get("rybm").getValue());
                        loadTree();

                    }
                });

            }

        });
    Ext.data.StoreManager.lookup('gridEquStore').on('load', function() {
        var eastLength = Ext.data.StoreManager.get('gridEquStore').data.length;
        Ext.ComponentManager.get('equGrid').getSelectionModel().selectionMode = 'MULTI';
        for ( var i = 0; i < eastLength; i++) {
            Ext.Ajax.request({
                url : AppUrl + 'pm_19/PRO_PM_PERSONTOEQU_VIEW',
                async : false,
                method : 'post',
                params : {
                    V_V_PERSONCODE:treepercode,//Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.V_PERSONCODE,
                    V_V_EQUCODE:Ext.data.StoreManager.get('gridEquStore').data.getAt(i).data.V_EQUCODE
                },
                success : function(resp) {
                    if (Ext.JSON.decode(resp.responseText).list.length> 0) {
                        Ext.ComponentManager.get('equGrid').getSelectionModel().select(i, true, true);
                    }
                }
            });
        }
    });
});

function loadPerson(percode){
    if(percode=='del'){
        Ext.ComponentManager.get("percode").setValue('');
        Ext.ComponentManager.get("pername").setValue('');;
        Ext.ComponentManager.get("perlogname").setValue('');
        Ext.ComponentManager.get("perpassword").setValue('');
        Ext.ComponentManager.get("perdept").setValue('');
        Ext.ComponentManager.get("perrole").setValue('');
        Ext.ComponentManager.get("perclass").setValue('');
        Ext.ComponentManager.get("pertel").setValue('');
    }else{
        Ext.Ajax
            .request({
                url: AppUrl
                + 'cjy/PRO_BASE_PERSON_GET_BYDEPT',
                method: 'POST',
                params: {
                    V_V_PERSONCODE : percode
                },
                success: function (resp) {
                    var response = Ext.JSON.decode(resp.responseText);
                    if(response.list.length>0){
                        Ext.ComponentManager.get("percode").setValue(response.list[0].V_PERSONCODE);
                        Ext.ComponentManager.get("pername").setValue(response.list[0].V_PERSONNAME);
                        Ext.ComponentManager.get("perlogname").setValue(response.list[0].V_LOGINNAME);
                        Ext.ComponentManager.get("perpassword").setValue(response.list[0].V_PASSWORD);
                        Ext.ComponentManager.get("perdept").setValue(response.list[0].V_DEPTNAME);
                        Ext.ComponentManager.get("perrole").setValue(response.list[0].V_ROLENAME);
                        Ext.ComponentManager.get("perclass").setValue(response.list[0].V_SAP_WORKNAME);
                        Ext.ComponentManager.get("pertel").setValue(response.list[0].V_TEL);
                    }



                }
            });
    }

}
function loadTree(){
    var treeStore = Ext.data.StoreManager.lookup('treeStore');
    treeStore.proxy.extraParams = {
        V_V_DEPTCODE: Ext.getCmp('plantname').getValue(),
        V_V_DEPTTYPE:  '[主体作业区]',
        V_V_FLAG: 'true'
    };
    treeStore.currentPage = 1;
    treeStore.load();
}

function loadTab(percode,deptcode,pername){
    loadPostGrid(percode);
    loadRoleGrid(deptcode);
    loadRoleSelGrid(percode);
    loadClassGrid(deptcode);
    loadClassSelGrid(percode);
    loadProfesTree(percode,deptcode);
    loadProfesGrid(percode,deptcode);
    loadTypeSelGrid(percode);
    Ext.getCmp('uname').setValue(pername);
}
function itemclick(s, record, item, index, e, eOpts) {
    loadPostGrid(Ext.getStore("gridStore").getAt(index).get("V_PERSONCODE"));
    loadRoleGrid(Ext.getStore("gridStore").getAt(index).get("V_DEPTCODE"));
    loadRoleSelGrid(Ext.getStore("gridStore").getAt(index).get("V_PERSONCODE"));
    loadClassGrid(Ext.getStore("gridStore").getAt(index).get("V_DEPTCODE"));
    loadClassSelGrid(Ext.getStore("gridStore").getAt(index).get("V_PERSONCODE"));
    loadProfesTree(Ext.getStore("gridStore").getAt(index).get("V_PERSONCODE"),Ext.getStore("gridStore").getAt(index).get("V_DEPTCODE"));
    loadProfesGrid(Ext.getStore("gridStore").getAt(index).get("V_PERSONCODE"),Ext.getStore("gridStore").getAt(index).get("V_DEPTCODE"));
    loadTypeSelGrid(Ext.getStore("gridStore").getAt(index).get("V_PERSONCODE"));
    Ext.getCmp('uname').setValue(Ext.getStore("gridStore").getAt(index).get("V_PERSONNAME"));
}
//-----------------------------------------------------------------------------post
function loadPostTree(){
    Ext.getCmp('postTree').store
        .setProxy({
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            url: AppUrl + 'cjy/PostTree',
            extraParams: {
            }
        });
    Ext.getCmp('postTree').store
        .load();
}

function loadPostGrid(personcode){
    Ext.data.StoreManager.lookup('gridPostStore').load({
            params: {
                V_V_PERSONCODE : personcode
            }
        });
}

function postTreeitemclick(view, node){
    //if(Ext.getCmp('grid').getSelectionModel().getSelection().length!=1){
     if(treepercode==''){
        alert("请选择一条人员进行操作");
        return;
    }
    Ext.Ajax
        .request({
            url: AppUrl
            + 'zdh/PRO_BASE_POSTTOPERSON_SET',
            method: 'POST',
            params: {
                V_V_POSTCODE:node.data.id,
                V_V_PERSONCODE: treepercode,//Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.V_PERSONCODE,
                V_V_TYPE :  true
            },
            success: function () {
                loadPostGrid(treepercode);
            }
        });

}

function _delPost(V_V_POSTCODE){
    Ext.Ajax
        .request({
            url: AppUrl
            + 'zdh/PRO_BASE_POSTTOPERSON_SET',
            method: 'POST',
            params: {
                V_V_POSTCODE:V_V_POSTCODE,
                V_V_PERSONCODE: treepercode,//Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.V_PERSONCODE,
                V_V_TYPE :  false
            },
            success: function () {
                loadPostGrid(treepercode);
            }
        });
}
//-----------------------------------------------------------------------------role
function loadRoleGrid(deptcode){
    Ext.data.StoreManager.lookup('gridRoleStore').load({
            params: {
                V_V_DEPTCODE:Ext.getCmp('plantname').getValue()
            }
        });
}
function roleitemclick(s, record, item, index, e, eOpts) {
    //if(Ext.getCmp('grid').getSelectionModel().getSelection().length!=1){
    if(treepercode==''){
        alert("请选择一条人员进行操作");
        return;
    }
    Ext.Ajax.request({
            url: AppUrl+ 'cjy/PRO_BASE_PERSON_GET_BYDEPT',
            method: 'POST',
            params: {
                V_V_PERSONCODE: treepercode,//Ext.getCmp('grid').getSelectionModel().getSelection()[0].raw.V_PERSONCODE,
            },
            success: function (resp) {
                var response = Ext.JSON.decode(resp.responseText);
                Ext.Ajax.request({
                        url: AppUrl + 'zdh/PRO_BASE_PERSON_SET',
                        method: 'POST',
                        params: {
                            V_V_PERSONCODE: response.list[0].V_PERSONCODE,
                            V_V_PERSONNAME: response.list[0].V_PERSONNAME,
                            V_V_LOGINNAME: response.list[0].V_LOGINNAME,
                            V_V_PASSWORD: response.list[0].V_PASSWORD,
                            V_V_DEPTCODE: response.list[0].V_DEPTCODE,
                            V_V_ROLECODE: record.data.V_ROLECODE,
                            V_I_ORDERID: '0',
                            V_I_CLASS: response.list[0].V_CLASS_CODE
                        },
                        success: function () {
                            loadRoleSelGrid(treepercode);
                        }
                    });
            }
        });


}
function loadRoleSelGrid(personcode){
    Ext.data.StoreManager.lookup('gridRoleSelStore').load({
            params: {
                V_V_PERSONCODE : personcode
            }
        });
}
function _delRole(V_V_PERSONCODE){
    //if (Ext.getCmp('grid').getSelectionModel().getSelection()[0].raw.V_PERSONCODE == V_V_PERSONCODE) {
    if (treepercode == V_V_PERSONCODE) {
        Ext.Ajax.request({
            url: AppUrl+ 'cjy/PRO_BASE_PERSON_GET_BYDEPT',
            method: 'POST',
            params: {
                V_V_PERSONCODE: treepercode,//Ext.getCmp('grid').getSelectionModel().getSelection()[0].raw.V_PERSONCODE,
            },
            success: function (resp) {
                var response = Ext.JSON.decode(resp.responseText);
                Ext.Ajax
                    .request({
                        url: AppUrl + 'zdh/PRO_BASE_PERSON_SET',
                        method: 'POST',
                        params: {
                            V_V_PERSONCODE: response.list[0].V_PERSONCODE,
                            V_V_PERSONNAME: response.list[0].V_PERSONNAME,
                            V_V_LOGINNAME: response.list[0].V_LOGINNAME,
                            V_V_PASSWORD: response.list[0].V_PASSWORD,
                            V_V_DEPTCODE: response.list[0].V_DEPTCODE,
                            V_V_ROLECODE: '',
                            V_I_ORDERID: '0',
                            V_I_CLASS: response.list[0].V_CLASS_CODE
                        },
                        success: function () {
                            loadRoleSelGrid(treepercode);
                        }
                    });
            }
        });

    } else {
        alert("删除失败，请选择正确人员");
    }


}
//-----------------------------------------------------------------------------class
function loadClassGrid(deptcode){
    Ext.data.StoreManager.lookup('gridClassStore').load({
            params: {
                V_V_DEPTREPAIRCODE : deptcode
            }
        });
}

function classitemclick(s, record, item, index, e, eOpts) {
    //if(Ext.getCmp('grid').getSelectionModel().getSelection().length!=1){
    if(treepercode==''){
        alert("请选择一条人员进行操作");
        return;
    }
    Ext.Ajax.request({
        url: AppUrl + 'cjy/PRO_BASE_PERSON_GET_BYDEPT',
        method: 'POST',
        params: {
            V_V_PERSONCODE: treepercode,//Ext.getCmp('grid').getSelectionModel().getSelection()[0].raw.V_PERSONCODE,
        },
        success: function (resp) {
            var response = Ext.JSON.decode(resp.responseText);
            Ext.Ajax.request({
                url: AppUrl + 'zdh/PRO_BASE_PERSON_SET',
                method: 'POST',
                params: {
                    V_V_PERSONCODE: response.list[0].V_PERSONCODE,
                    V_V_PERSONNAME: response.list[0].V_PERSONNAME,
                    V_V_LOGINNAME: response.list[0].V_LOGINNAME,
                    V_V_PASSWORD: response.list[0].V_PASSWORD,
                    V_V_DEPTCODE: response.list[0].V_DEPTCODE,
                    V_V_ROLECODE: response.list[0].V_ROLECODE,
                    V_I_ORDERID: '0',
                    V_I_CLASS: record.data.V_SAP_WORK
                },
                success: function () {
                    loadClassSelGrid(treepercode);
                }
            });
        }
    });

}
function loadClassSelGrid(personcode){
    Ext.data.StoreManager.lookup('gridClassSelStore').load({
        params: {
            V_V_PERSONCODE : personcode
        }
    });
}
function _delClass(V_V_PERSONCODE){
    //if (Ext.getCmp('grid').getSelectionModel().getSelection()[0].raw.V_PERSONCODE == V_V_PERSONCODE) {
    if (treepercode == V_V_PERSONCODE) {
        Ext.Ajax.request({
            url: AppUrl + 'cjy/PRO_BASE_PERSON_GET_BYDEPT',
            method: 'POST',
            params: {
                V_V_PERSONCODE: treepercode,//Ext.getCmp('grid').getSelectionModel().getSelection()[0].raw.V_PERSONCODE,
            },
            success: function (resp) {
                var response = Ext.JSON.decode(resp.responseText);
                Ext.Ajax
                    .request({
                        url: AppUrl + 'zdh/PRO_BASE_PERSON_SET',
                        method: 'POST',
                        params: {
                            V_V_PERSONCODE: response.list[0].V_PERSONCODE,
                            V_V_PERSONNAME: response.list[0].V_PERSONNAME,
                            V_V_LOGINNAME: response.list[0].V_LOGINNAME,
                            V_V_PASSWORD: response.list[0].V_PASSWORD,
                            V_V_DEPTCODE: response.list[0].V_DEPTCODE,
                            V_V_ROLECODE: response.list[0].V_ROLECODE,
                            V_I_ORDERID: '0',
                            V_I_CLASS: ''
                        },
                        success: function () {
                            loadClassSelGrid(treepercode);
                        }
                    });
            }
        });
    } else {
        alert("删除失败，请选择正确人员");
    }
}
//-----------------------------------------------------------------------------equ
function equTreeitemclick(aa, record, item, index, e, eOpts){
    //if(Ext.getCmp('grid').getSelectionModel().getSelection().length!=1){
    if(treepercode==''){
        alert("请选择一条人员进行操作");
        return;
    }
    if (record.data.leaf == true) {
        var equCode = record.data.id;
        Ext.data.StoreManager.lookup('gridEquStore').load({
            params : {
                V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT:Ext.getCmp('zyq').getValue(),
                V_V_EQUTYPECODE:equCode
            }
        });
    }

}
// 添加
function OnSelectionEquChanged(pp, record, index, eOpts) {
    for ( var i = 0; i < Ext.getCmp('equGrid').getSelectionModel().getSelection().length; i++) {
        Ext.Ajax.request({
            url : AppUrl + 'pm_19/PRO_PM_PERSONTOEQU_SET',
            method : 'POST',
            async : false,
            params : {
                V_V_PERSONCODE:treepercode,//Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.V_PERSONCODE,
                V_V_EQUCODE: record.data.V_EQUCODE
            }
        });
    }
}
// 删除
function OnClickEquGridPanel(pp, record, index, eOpts) {
    for ( var i = 0; i <= Ext.getCmp('equGrid').getSelectionModel().getSelection().length; i++) {
        Ext.Ajax.request({
            url : AppUrl + 'pm_19/PRO_PM_PERSONTOEQU_DEL',
            method : 'POST',
            async : false,
            params : {
                V_V_PERSONCODE:treepercode,//Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.V_PERSONCODE,
                V_V_EQUCODE:record.data.V_EQUCODE
            }
        });
    }
}
//-----------------------------------------------------------------------------profes
function loadProfesTree(personcode,deptcode){
    Ext.getCmp('profesTree').store.setProxy({
        type : 'ajax',
        url : AppUrl + 'pm_19/PersonTree',
        extraParams : {
            V_V_PERSONCODE : personcode,
            V_V_DEPTCODE : deptcode
        },
        actionMethods : {
            read : 'POST'
        }
    });
    Ext.getCmp('profesTree').store.load();
}
function loadProfesGrid(personcode,deptcode){
    Ext.data.StoreManager.lookup('gridProfesStore').load({
        params: {
            V_V_PERSONCODE : personcode,
            V_V_DEPTCODE : deptcode
        }
    });
}

function profesTreeitemclick(aa, record, item, index, e, eOpts){
    //if(Ext.getCmp('grid').getSelectionModel().getSelection().length!=1){
    if(treepercode==''){
        alert("请选择一条人员进行操作");
        return;
    }
    var parentid='';
    var SPECIALTYCODE=record.raw.sid;
    if(record.raw.parentid==null){
        parentid="99";
    }else{
        parentid=record.raw.parentid;
    }

    if(record.data.checked==true){
        Ext.Ajax.request({
            url: AppUrl + 'pm_19/PRO_BASE_SPECIALTYTOPERSON_DEL',
            async: false,
            method: 'post',
            params:{
                V_V_SPECIALTYCODE:SPECIALTYCODE,
                V_V_DEPTCODE:parentid,
                V_V_PERSONCODE:treepercode,//Ext.getCmp('grid').getSelectionModel().getSelection()[0].raw.V_PERSONCODE
            },
            success:function (resp){
                var resp=Ext.JSON.decode(resp.responseText);
                if(resp.V_CURSOR=='成功'){
                    Ext.getCmp('profesTree').store.setProxy({
                        type : 'ajax',
                        url : AppUrl + 'pm_19/PersonTree',
                        extraParams : {
                            V_V_PERSONCODE : treepercode,//Ext.getCmp('grid').getSelectionModel().getSelection()[0].raw.V_PERSONCODE,
                            V_V_DEPTCODE : Ext.ComponentManager.get("tree1hidden").getValue()//Ext.getCmp('grid').getSelectionModel().getSelection()[0].raw.V_DEPTCODE
                        },
                        actionMethods : {
                            read : 'POST'
                        }
                    });
                    Ext.getCmp('profesTree').store.load();
                    loadProfesGrid(treepercode,Ext.getCmp('plantname').getValue());
                }else{
                    Ext.Msg.alert('操作信息',  '操作失败');
                }
            }
        });
    }else{
        Ext.Ajax.request({
            url: AppUrl + 'pm_19/PRO_BASE_SPECIALTYTOPERSON_SET',
            async: false,
            method: 'post',
            params:{
                V_V_SPECIALTYCODE:SPECIALTYCODE,
                V_V_DEPTCODE:parentid,
                V_V_PERSONCODE:treepercode//Ext.getCmp('grid').getSelectionModel().getSelection()[0].raw.V_PERSONCODE
            },
            success:function (resp){
                var resp=Ext.JSON.decode(resp.responseText);
                if(resp.V_CURSOR=='成功'){
                    Ext.getCmp('profesTree').store.setProxy({
                        type : 'ajax',
                        url : AppUrl + 'pm_19/PersonTree',
                        extraParams : {
                            V_V_PERSONCODE : treepercode,//Ext.getCmp('grid').getSelectionModel().getSelection()[0].raw.V_PERSONCODE,
                            V_V_DEPTCODE : Ext.ComponentManager.get("tree1hidden").getValue()//Ext.getCmp('grid').getSelectionModel().getSelection()[0].raw.V_DEPTCODE
                        },
                        actionMethods : {
                            read : 'POST'
                        }
                    });
                    Ext.getCmp('profesTree').store.load();
                    loadProfesGrid(treepercode,Ext.getCmp('plantname').getValue());
                }else{
                    Ext.Msg.alert('操作信息',  '操作失败');
                }
            }
        });
    }
}
//-----------------------------------------------------------------------------type
function typeitemclick(s, record, item, index, e, eOpts) {
    //if(Ext.getCmp('grid').getSelectionModel().getSelection().length!=1){
    if(treepercode==''){
        alert("请选择一条人员进行操作");
        return;
    }
    Ext.Ajax.request({
        url: AppUrl + 'hp/PRO_BASE_CRAFTTOPERSON_SET',
        type: 'ajax',
        async: false,
        method: 'POST',
        params: {
            V_V_FLAG: 1,
            V_V_WORKCODE: record.data.V_WORKCODE,
            V_V_PERSONCODE: treepercode//Ext.getCmp('grid').getSelectionModel().getSelection()[0].raw.V_PERSONCODE

        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText);
            if (resp.RET != 'success') {
                Ext.MessageBox.alert('提示', '操作失败');
            }else{
                loadTypeSelGrid(treepercode);
            }
        }
    });

}
function loadTypeSelGrid(personcode){
    Ext.data.StoreManager.lookup('gridTypeSelStore').load({
        params: {
            V_V_PERSONCODE : personcode
        }
    });
}
function _delType(personcode,workcode){
    Ext.Ajax.request({
        url: AppUrl + 'hp/PRO_BASE_CRAFTTOPERSON_SET',
        type: 'ajax',
        async: false,
        method: 'POST',
        params: {
            V_V_FLAG: 0,
            V_V_WORKCODE: workcode,
            V_V_PERSONCODE: personcode

        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText);
            if (resp.RET != 'success') {
                Ext.MessageBox.alert('提示', '操作失败');
            }else{
                loadTypeSelGrid(treepercode);
            }
        }
    });
}
//-----------------------------------------------------------------------------password
function OnButtonSaveClicked(){
    //if(Ext.getCmp('grid').getSelectionModel().getSelection().length!=1){
    if(treepercode==''){
        alert("请选择一条人员进行操作");
        return;
    }
    var ypassword=Ext.getCmp('ymm').getValue();
    var npassword=Ext.getCmp('xmm').getValue();
    var dpassword=Ext.getCmp('cfxma').getValue();

    if(ypassword==''){
        Ext.Msg.alert('操作信息', '原密码不能为空');
    }else{
        if(npassword==''){
            Ext.Msg.alert('操作信息', '新密码不能为空');
        }else{
            if(dpassword==''){
                Ext.Msg.alert('操作信息', '重复密码不能为空');
            }else if(npassword!=dpassword){
                Ext.Msg.alert('操作信息', '两次密码必须一致');
            }else{
                Ext.Ajax.request({
                    url : AppUrl + 'pm_19/PRO_BASE_PERSON_PASS_EDIT',
                    method : 'POST',
                    async : false,
                    params : {
                        V_V_PERSONCODE:treepercode,//Ext.getCmp('grid').getSelectionModel().getSelection()[0].raw.V_PERSONCODE,
                        V_V_PASSWORD:ypassword,
                        V_V_PASSWORD_NEW:npassword
                    },
                    success:function (resp){
                        var resp = Ext.decode(resp.responseText);
                        Ext.Msg.alert('操作信息',resp.V_CURSOR);
                        Ext.getCmp('ymm').setValue('');
                        Ext.getCmp('xmm').setValue('');
                        Ext.getCmp('cfxma').setValue('');
                        loadPerson(treepercode);
                    }
                });
            }
        }
    }
}