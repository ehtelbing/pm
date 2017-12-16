var initLoad = true;
var V_ORDERGUID = null;
var V_DEPTCODEREPARIR = null;
if (location.href.split('?')[1] != undefined) {
    V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
    V_DEPTCODEREPARIR = Ext.urlDecode(location.href.split('?')[1]).V_DEPTCODEREPARIR;
}


var ProcessInstanceId = '';
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.ProcessInstanceId == ProcessInstanceId) ? V_GUID = "" : ProcessInstanceId = parameters.ProcessInstanceId;

}


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

    var activityStore = Ext.create('Ext.data.Store', {
        id: 'activityStore',
        autoLoad: false,
        fields: ['V_ACTIVITY'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_ACTIVITY',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list'
            }
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('selActi').select(store.first());
            }
        }
    });

    var treeStore = Ext.create('Ext.data.TreeStore', {
        storeId: 'treeStore',
        pageSize: -1,
        autoLoad: false,
        fields: ['sid', 'text', 'parentid', 'craftcode', 'craftname']
    });

    /*var treeStore=Ext.create('Ext.data.TreeStore', {
     id : 'treeStore',
     autoLoad : false,
     autoDestroy : true,
     fields : [ ],
     proxy : {
     type : 'ajax',
     async : false,
     url: AppUrl + 'tree/No41020101Tree',
     extraParams : {},
     actionMethods : {
     read : 'POST'
     }
     },
     reader : {
     type : 'json',
     root : 'children'
     },
     root : {
     text : 'root',
     expanded : true
     }
     });*/

    var leftTreePanel = Ext.create('Ext.tree.Panel', {
        id: 'leftTreePanel',
        store: treeStore,
        title: '检修单位树',
        //border: false,
        rootVisible: false,
        hideHeaders: true,//是否隐藏表头,默认为false
        columns: [{
            xtype: 'treecolumn',
            dataIndex: 'text',
            flex: 1
        }],
        listeners : {
            itemclick : OnClickTreeItem
        }
    });

    /*var gridStore = Ext.create('Ext.data.Store', {
     storeId: 'gridStore',
     autoLoad: false,
     pageSize: 15,
     fields : [ 'V_ACTIVITY', 'V_PERSONNAME', 'V_PERSONTYPENAME', 'I_WORKHOUR',
     'V_PERSONTYPECODE', 'V_PERSONCODE', 'I_ID' ],
     proxy: {
     url: AppUrl + 'hp/PRO_PM_WORKORDER_GX_VIEW',
     type: 'ajax',
     actionMethods: {
     read: 'POST'
     },
     extraParams: {},
     reader: {
     type: 'json',
     root: 'list'
     }
     }
     });*/

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['V_ACTIVITY', 'V_PERNAME_DE', 'V_PERCODE_DE', 'V_DE',
            'V_PERSONTYPECODE', 'V_PERSONCODE', 'I_ID', 'V_TS','V_GUID','V_PERTYPE_DE','V_PERCODE','V_PERNAME','V_JXGX_CODE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PRO_PM_WORKORDER_GX_VIEW',
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

    var buttonPanel = Ext.create('Ext.Panel', {
        id: 'buttonPanel',
        defaults: {
            style: ' margin: 5px 0px 0px 10px',
            width: 80
        },
        items: [{
            xtype: 'button',
            text: '完成返回',
            style: 'margin:5px 0px 5px 10px',
            //icon: imgpath + '/search.png'/*,
            handler : OnClickFiniBackButton
        }
        ]
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
                id: 'selActi',
                xtype: 'combo',
                store: activityStore,
                //fieldLabel: '作业区',
                editable: false,
                //labelWidth: 70,
                displayField: 'V_ACTIVITY',
                valueField: 'V_ACTIVITY',
                queryMode: 'local',
                margin: '5 5 5 5',
                width: 180,
                listeners: {
                    select: function (field, newValue, oldValue) {
                        _selectTree();
                        _select();
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
        plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })]/*,
        selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        }*/,
        columns: [{
            text: '工序',
            width: 100,
            dataIndex: 'V_ACTIVITY',
            align: 'center'
        }, {
            text: '人员名称',
            width: 100,
            dataIndex: 'V_PERNAME',
            align: 'center'
        }, {
            text: '工种',
            width: 200,
            dataIndex: 'V_PERNAME_DE',
            align: 'center'
        }, {
            text: '工时',
            width: 100,
            dataIndex: 'V_TS',
            align: 'center',
            field: {
                id: 'gs',
                xtype: 'numberfield',
                minValue: 1
            },
            renderer: AtEdit,
            editor: {
                xtype: 'numberfield',
                hideTrigger: true,
                minValue: 0
            }
        },{
            text: '定额',
            width: 200,
            dataIndex: 'V_DE',
            align: 'center'
        },{
            text: '工种等级',
            width: 200,
            dataIndex: 'V_PERTYPE_DE',
            align: 'center'
        }, {
            width: 100,
            text: '删除',
            align: 'center',
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href="#"  onclick="OnClickDeleteIcon(\'' + record.data.I_ID + '\')">' + '删除' + '</a>';
            }
        }]
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

    var viewImagePanel = Ext.create("Ext.form.Panel", {
        id: 'viewImagePanel',
        editable: false,
        region: 'center',
        items: [{
            layout: 'column',
            defaults: {
                labelAlign: 'right'
            },
            items: [{
                xtype: 'box',
                id: 'browseImage',
                fieldLabel: "预览图片",
                autoEl: {
                    width: '100%',
                    height: 500,
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
            items: [buttonPanel]
        }, {
            region: 'west',
            layout: 'fit',
            width: '20%',
            border: false,
            items: [leftTreePanel/*viewImagePanel*/]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [rightPanel]
        }]
    });

    _init();
});

function _init() {
    //Ext.getCmp('browseImage').setHeight(Ext.getCmp('gridPanel').getSize().height-20);
    if (initLoad) {
        initLoad = false;
        _selectGX();
        _selectTree();
        _select();
        /*_select();
         _preViewImage();*/

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

function _selectGX() {
    var activityStore = Ext.data.StoreManager.lookup('activityStore');
    activityStore.proxy.extraParams = {
        V_V_ORDERGUID: V_ORDERGUID
    };
    activityStore.currentPage = 1;
    activityStore.load();
}

function _selectTree() {
    var treeStore = Ext.data.StoreManager.lookup('treeStore');

    treeStore.setProxy({
        type: 'ajax',
        url: AppUrl + 'tree/No41020101Tree',
        actionMethods: {
            read: 'POST'
        },
        async: false,
        extraParams: {
            'ORDER_ID': V_ORDERGUID,
            'WORK_ID': Ext.getCmp('selActi').getValue(),
            'DEPARTCODE': V_DEPTCODEREPARIR
        },
        reader: {
            type: 'json',
            root: 'children'
        },
        root: {
            text: 'root',
            expanded: true
        }
    });

    treeStore.load();

}

function OnClickDeleteIcon(I_ID) {
    Ext.Msg.confirm('警告', '您确定要删除该信息?', function (button) {
        if (button != 'yes') {
            return;
        } else {
            Ext.Ajax.request({
                url: AppUrl + 'hp/PRO_PM_WORKORDER_GX_DEL',
                type: "post",
                async: false,
                params: {
                    I_I_ID: I_ID
                },
                success: function (response) {
                    var resp = Ext.JSON.decode(response.responseText);

                    Ext.Msg.alert('操作信息', resp.V_INFO);
                }
            });

            _select();
        }
    });
}

function OnClickFiniBackButton() {
    var ss = Ext.data.StoreManager.get('gridStore');
    if (ss.data.length > 0) {
        var records = Ext.data.StoreManager.get('gridStore')
            .getModifiedRecords();//获取修改数据的行
        if (records.length > 0) {
            for ( var i = 0; i < records.length; i++) {
                Ext.Ajax.request({
                    url: AppUrl + 'hp/PRO_PW_WORKORDER_GX_TS_SET',
                    type: "post",
                    async: false,
                    params: {
                        I_I_ID:records[i].data.I_ID,
                        V_V_TS:records[i].data.V_TS

                    },
                    success : function(response) {
                        var resp = Ext.JSON.decode(response.responseText);
                        window.close();
                    }
                });
            }
        }
    } else {
    }
   /* Ext.Ajax.request({
        url: AppUrl + 'WorkOrder/PRO_PM_WORKORDER_HOURS_RETURN',
        type: "post",
        async: false,
        params: {
            V_V_ORDERGUID:V_ORDERGUID
        },
        success : function(response) {
            var resp = Ext.JSON.decode(response.responseText);
            //Ext.example.msg('操作信息', '{0}', resp);
        }
    });

    window.close();*/
}

function OnClickTreeItem(aa, record, item, index, e, eOpts) {
    if (record.data.leaf == true && record.data.parentid != '-1') {
       /* var records = Ext.getCmp('gridPanel').getSelectionModel().getSelection();//获取选中的数据
        if (records.length == 0) {//判断是否选中数据
            Ext.MessageBox.alert('提示', '请选择一条工种数据');
            return false;
        }*/


        Ext.Ajax.request({
            url: AppUrl + 'hp/PRO_PM_WORKORDER_GX_SET',
            type: "post",
            async: false,
            params: {
                V_V_ORDERGUID:V_ORDERGUID,
                V_V_ACTIVITY:Ext.getCmp('selActi').getValue(),
                V_V_PERCODE:record.data.sid,
                V_V_PERNAME:record.data.text
            },
            success : function(response) {
                //Ext.example.msg('操作信息', '{0}', Ext.JSON
                //.decode(response.responseText));
                var resp = Ext.JSON.decode(response.responseText);
                    Ext.MessageBox.alert('提示',resp.RET, callBack);
                    function callBack(id) {
                        _select();
                    }


            }
        });
    }
}

function AtEdit(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = 'text-align: right;background-color:yellow';
    return value;
}






