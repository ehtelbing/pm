var ckStoreLoad = false;
var initLoad = true;
var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
Ext.define('Ext.ux.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    async: true,
    doRequest: function (operation, callback, scope) {
        var writer = this.getWriter(),
            request = this.buildRequest(operation);
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        Ext.apply(request, {
            async: this.async,
            binary: this.binary,
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, callback, scope),
            method: this.getMethod(request),
            disableCaching: false
        });
        Ext.Ajax.request(request);
        return request;
    }
});

Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果

    var ckstore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'ckstore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
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
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('ck').select(store.first());
                ckStoreLoad = true;
                _init();
            }
        }
    });
    var treeStore = Ext.create('Ext.data.TreeStore', {
        storeId: 'treeStore',
        autoLoad: false,
        fields: ['sid', 'text', 'parentid', 'craftcode', 'craftname'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'hp/selectPersonFromDept',
            extraParams: {
                V_V_DEPTCODE : '',
                V_V_DEPTTYPE : '',
                V_V_WORKCODE : '',
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
                this.proxy.extraParams.V_V_DEPTCODE = node.raw.sid;
                this.proxy.extraParams.V_V_FLAG = 'false';
            }
        }
    });

    var leftTreePanel = Ext.create('Ext.tree.Panel', {
        id: 'leftTreePanel',
        store: treeStore,
        animate: true,//开启动画效果
        //title: '检修单位树',
        //border: false,
        rootVisible: false,
        hideHeaders: true,//是否隐藏表头,默认为false
        columns: [{
            xtype: 'treecolumn',
            dataIndex: 'text',
            flex: 1
        }],
        listeners: {
            checkchange: OnClickMenuCheckTree
        }
    });

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 15,
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

    var inputPanel = Ext.create('Ext.panel.Panel', {
        id: 'inputPanel',
        layout: 'column',
        frame: true,
        border: false,
        baseCls: 'my-panel-no-border',
        items: [{
            xtype: 'panel',
            region: 'center',
            layout: 'column',
            border: false,
            frame: true,
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'ck',
                xtype: 'combo',
                store: ckstore,
                labelAlign: 'right',
                fieldLabel: '单位',
                editable: false,
                labelWidth: 70,
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                queryMode: 'local',
                margin: '5 5 5 5',
                width: 250,
                listeners: {
                    select: function (field, newValue, oldValue) {
                        _removeAllTree();
                    }

                }

            }]
        }
        ]
    });

    var gridPanel = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel',
        store: gridStore,
        frame: true,
        columnLines: true,
        selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns: [{
            text: '工种编码',
            width: 200,
            dataIndex: 'V_WORKCODE',
            align: 'center'
        }, {
            text: '工种名称',
            width: 100,
            dataIndex: 'V_WORKNAME',
            align: 'center'
        }, {
            text: '工时',
            width: 100,
            dataIndex: 'V_TIME',
            align: 'center'
        }, {
            text: '定额',
            width: 200,
            dataIndex: 'V_DE',
            align: 'center'
        }, {
            text: '工种类型',
            width: 200,
            dataIndex: 'V_WORKTYPE',
            align: 'center'
        }],
        listeners: {
            itemclick: OnClickGridPanel
        }
    });

    var rightPanel = Ext.create('Ext.Panel', {
        id: 'rightPanel',
        layout: 'border',
        border: false,
        items: [{
            region: 'north',
            //layout : 'fit',
            //height : '40%',
            border: false,
            items: [inputPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [gridPanel]
        }]
    });


    Ext.create('Ext.container.Viewport', {
        layout: {
            type: 'border',
            regionWeights: {
                west: -1,
                north: 1,
                south: 1,
                east: -1
            }
        },
        items: [{
            region: 'north',
            border: false,
            items: [inputPanel]
        }, {
            region: 'west',
            layout: 'fit',
            width: '60%',
            border: false,
            items: [gridPanel/*viewImagePanel*/]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [leftTreePanel]
        }]
    });

    _init();
});

function _init() {
    if (ckStoreLoad && initLoad) {
        initLoad = false;
        Ext.getBody().unmask();//去除页面笼罩
    }

}

function _select() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        V_V_ORDERGUID: V_ORDERGUID,
        V_V_ACTIVITY: Ext.getCmp('selActi').getValue()
    };
    gridStore.currentPage = 1;
    gridStore.load();

}

function _selectTree(V_WORKCODE) {
    var treeStore = Ext.data.StoreManager.lookup('treeStore');
    treeStore.proxy.extraParams = {
        V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
        V_V_DEPTTYPE:  '[主体作业区]',
        V_V_WORKCODE: V_WORKCODE,
        V_V_FLAG: 'true'
    };
    treeStore.currentPage = 1;
    treeStore.load();
}

function OnClickGridPanel(pp, record, item, index, e, eOpts) {
    _selectTree(record.data.V_WORKCODE);
    //_selectTreeMultipleLoading();
}

function OnClickMenuCheckTree(node, checked, eOpts) {
    var records = Ext.getCmp('gridPanel').getSelectionModel().getSelection();//获取选中的数据

    if (checked == true) {
        Ext.Ajax.request({
            url: AppUrl + 'hp/PRO_BASE_CRAFTTOPERSON_SET',
            type: 'ajax',
            async: false,
            method: 'POST',
            params: {
                V_V_FLAG: 1,
                V_V_WORKCODE: records[0].get('V_WORKCODE'),
                V_V_PERSONCODE: node.raw.sid

            },
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.RET != 'success') {
                    Ext.MessageBox.alert('提示', '操作失败');
                }
            }
        });

    } else {
        Ext.Ajax.request({
            url: AppUrl + 'hp/PRO_BASE_CRAFTTOPERSON_SET',
            type: 'ajax',
            async: false,
            method: 'POST',
            params: {
                V_V_FLAG: 0,
                V_V_WORKCODE: records[0].get('V_WORKCODE'),
                V_V_PERSONCODE: node.raw.sid
            },
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.RET != 'success') {
                    Ext.MessageBox.alert('提示', '操作失败');
                }
            }
        });
    }
}

function _removeAllTree() {
    Ext.data.StoreManager.lookup('treeStore').getRootNode().removeAll();
}
