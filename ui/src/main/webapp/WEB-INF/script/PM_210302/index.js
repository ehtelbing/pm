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
var BusinessKey = '';
var flowtype = '';
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.ProcessInstanceId == ProcessInstanceId) ? ProcessInstanceId = "" : ProcessInstanceId = parameters.ProcessInstanceId;
    (parameters.BusinessKey == BusinessKey) ? BusinessKey = "" : BusinessKey = parameters.BusinessKey;
    (parameters.flowtype == flowtype) ? flowtype = "" : flowtype = parameters.flowtype;

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
    //Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果

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
                //_init();
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
        width:'100%',
        frame : true,
        columnLines : true,
        columns : [ {
            text: '流程步骤',
            dataIndex: 'ActivityName',
            align: 'center'
        }, {
            text: '操作人',
            dataIndex: 'AssigneeName',
            align: 'center'
        }, {
            text: '审批意见',
            dataIndex: 'Idea',
            align: 'center'
        }, {
            text: '审批时间',
            width:150,
            dataIndex: 'EndTime',
            align: 'center'
        },
            {
                text: '操作',
                dataIndex: 'V_ORDERID',
                width: 155,
                align: 'center',
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return '<a href=javascript:_activiti(\'' + record.data.ActivityId + '\',\''
                        +  record.data.Assignee + '\')>' + '激活' + '</a>';
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
            width : '100%',
            border : false,
            items : [ gridPanel ]
        } ]
    });

    //_init();
    _select();
});


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


function _activiti(activityId,assignee){
    Ext.Ajax.request({
        url: AppUrl + 'Activiti/activateActivityCancelCurrent',
        type: 'ajax',
        method: 'POST',
        params: {
            businesskey:BusinessKey,
            flowtype:flowtype,
            instanceId: ProcessInstanceId,
            activityId: activityId,
            flowStep:activityId,
            assignees : assignee
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);

        },
        failure: function (response) {//
            Ext.MessageBox.show({
                title: '错误',
                msg: response.responseText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            })
        }

    })
}



