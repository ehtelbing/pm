var orgStoreLoad = false;
var deptStoreLoad = false;
var sbTypeStoreLoad = false;
var sbNameStoreLoad = false;
var ProcessTypeStoreLoad =false;
var initLoad = true;
var V_V_EDIT_GUID = '';
var V_PICGUID = '';
var sh = window.screen.height / 2 - 10;
var sw = window.screen.width / 2 + 220;

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

    var ProcessTypeStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'ProcessTypeStore',
        fields: ['V_FLOWTYPE_CODE', 'V_FLOWTYPE_NAME'],
        proxy:{
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PM_FLOW_TYPE_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
            }
        },
        listeners: {
            load: function (store, records) {
                store.insert(0, {
                    'V_FLOWTYPE_CODE': '%',
                    'V_FLOWTYPE_NAME': '全部'
                });
                Ext.getCmp('lclx').select(store.first());
                ProcessTypeStoreLoad = true;
                _init();
            }
        }
    });



    var gridStore = Ext.create('Ext.data.Store', {
        storeId: 'gridStore',
        autoLoad: false,
        pageSize: 15,
        fields: ['AssigneeName','Assignee', 'ActivityName', 'EndTime', 'Idea', 'ActivityId', 'ActivityType', 'StartTime', 'Id'],
        proxy: {
            url: AppUrl + 'Activiti/InstanceState',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        }
    });

    var inputPanel = Ext.create('Ext.form.Panel', {
        id: 'inputPanel',
        layout: 'column',
        frame: true,
        border: false,
        //baseCls: 'my-panel-no-border',
        items: [{
            xtype: 'panel',
            region: 'center',
            layout: 'column',
            border:false,
            frame: true,
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'lclx',
                xtype: 'combo',
                store: ProcessTypeStore,
                fieldLabel: '流程类型',
                editable: false,
                labelWidth: 100,
                displayField: 'V_FLOWTYPE_NAME',
                valueField: 'V_FLOWTYPE_CODE',
                queryMode: 'local',
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right',
                width: 250
            } ]
        }
        ]
    });

    var gridPanel = Ext.create('Ext.grid.Panel', {
        id : 'gridPanel',
        store : gridStore,
        frame : true,
        columnLines : true,
        columns : [ {
            text: '流程步骤',
            width: '23%',
            dataIndex: 'ActivityName',
            align: 'center'
        }, {
            text: '操作人',
            width: '23%',
            dataIndex: 'AssigneeName',
            align: 'center'
        }, {
            text: '审批意见',
            width: '24%',
            dataIndex: 'Idea',
            align: 'center'
        }, {
            text: '审批时间',
            width: '30%',
            dataIndex: 'EndTime',
            align: 'center'
        }]
    });

    var viewImagePanel = Ext.create("Ext.form.Panel", {
        id: 'viewImagePanel',
        editable: false,
        autoScroll: true,
        region: 'center',
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

    });

    Ext.create('Ext.container.Viewport', {
        layout : {
            type : 'border',
            regionWeights : {
                west : -1,
                north : 1,
                south : 1,
                east : -1
            }
        },
        items : [ {
            region : 'west',
            layout : 'fit',
            width : '40%',
            border : false,
            items : [ gridPanel ]
        }, {
            region : 'center',
            layout : 'border',
            border : false,
            autoScroll: true,
            items : [ viewImagePanel ]
        } ]
    });

    _init();
});

function _init() {
    Ext.getCmp('browseImage').setHeight(Ext.getCmp('gridPanel').getSize().height-20);
    if (ProcessTypeStoreLoad && initLoad) {
        initLoad = false;
        _select();
        _preViewImage();

        Ext.getBody().unmask();//去除页面笼罩
    }

}

function _select() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        instanceId: ProcessInstanceId
    };
    gridStore.currentPage = 1;
    gridStore.load();

}

function _preViewImage() {
    var url = AppUrl + 'Activiti/DisplayChart?InstanceId=' + ProcessInstanceId ;

    Ext.getCmp("browseImage").getEl().dom.src = url;
}






