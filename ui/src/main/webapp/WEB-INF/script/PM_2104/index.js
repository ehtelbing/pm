var V_GUID = "";
var V_V_GUID_COPY = '';
var initLoad = true;

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
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 25,
        autoLoad: false,
        fields: ['originator', 'CreateTime', 'remark',
            'Name', 'flow_code', 'ProcessDefinitionName', 'ProcessInstanceId', 'TaskDefinitionKey', 'ProcessDefinitionKey', 'BusinessKey'
            , 'endTime', 'startName'],

        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'Activiti/QueryhistoryTaskList',
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

    var editPanel = Ext.create('Ext.form.Panel', {
        id: 'editPanel',
        // region: 'center',
        layout: 'column',
        frame: true,
        border: false,
        //baseCls: 'my-panel-no-border',
        defaults: {
            labelAlign: 'right',
            style: ' margin: 5px 0px 5px 0px'
        },
        items: [
            {
                id: 'beginTime',
                xtype: 'datefield',
                editable: false,
                format: 'Y/m/d',
                value: Ext.util.Format.date(new Date(), "Y-m-") + "01",
                fieldLabel: '起始日期',
                labelWidth: 70,
                width: 250,
                baseCls: 'margin-bottom'
            }, {
                id: 'endTime',
                xtype: 'datefield',
                editable: false,
                format: 'Y/m/d',
                value: Ext.util.Format.date(new Date(new Date(new Date().getUTCFullYear(), new Date().getMonth() + 1, 1) - 86400000), "Y-m-d"),
                fieldLabel: '结束日期',
                labelWidth: 100,
                width: 250,
                baseCls: 'margin-bottom'
            }, {
                xtype: 'button',
                text: '查询',
                style: ' margin: 5px 0px 5px 20px',
                icon: imgpath + '/search.png',
                handler: _select
            }
        ]
    });

    var overhaulApplyPanel = Ext.create('Ext.grid.Panel', {
        id: 'overhaulApplyPanel',
        store: gridStore,
        frame: true,
        columnLines: true,
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '操作',
            dataIndex: 'V_ORDERID',
            width: 100,
            align: 'center',
            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                return '<a href="#" onclick="_preViewProcess(\'' + record.data.ProcessInstanceId + '\')">' + '查看流程' + '</a>';
            }
        }, {
            text: '流程类型',
            dataIndex: 'ProcessDefinitionName',
            align: 'center',
            width: 150
        }, {
            text: '流程编号',
            dataIndex: 'flow_code',
            align: 'center',
            width: 200
        }, {
            text: '流程步骤',
            dataIndex: 'Name',
            align: 'center',
            width: 200
        }, {
            text: '摘要',
            dataIndex: 'remark',
            align: 'center',
            width: 300
        }, {
            text: '发起人',
            dataIndex: 'startName',
            align: 'center',
            width: 100
        }, {
            text: '办结时间',
            dataIndex: 'endTime',
            align: 'center',
            width: 200
        }
        ],
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            width: '100%',
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });


    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        baseCls: 'my-panel-no-border',
        items: [{
            region: 'north',
            items: [editPanel]
        }, {
            region: 'center',
            layout: 'fit',
            items: [overhaulApplyPanel]
        }]
    });

    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            PersonCode: Ext.util.Cookies.get('v_personcode'),
            beginTime: Ext.Date.format(Ext.getCmp('beginTime').getValue(),'Y-m-d'),
            endTime: Ext.Date.format(Ext.getCmp('endTime').getValue(),'Y-m-d')
        }
    });

    /* Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
     store.proxy.extraParams = {
     PersonCode:  Ext.util.Cookies.get('v_personcode'),
     beginTime:Ext.getCmp('beginTime').getSubmitValue(),
     endTime: Ext.getCmp('endTime').getSubmitValue()
     }
     });*/

    _init()
});

function _init() {

    if (initLoad) {
        initLoad = false;
        _select()
        Ext.getBody().unmask();//去除页面笼罩
    }


}


function _select() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        PersonCode: Ext.util.Cookies.get('v_personcode'),
        beginTime: Ext.Date.format(Ext.getCmp('beginTime').getValue(),'Y-m-d'),
        endTime: Ext.Date.format(Ext.getCmp('endTime').getValue(),'Y-m-d')
    };
    gridStore.currentPage = 1;
    gridStore.load();
}

function _preViewProcess(ProcessInstanceId) {
    var owidth = window.screen.availWidth;
    var oheight = window.screen.availHeight - 50;
    var ret = window.open(AppUrl + 'page/PM_210301/index.html?ProcessInstanceId='
    + ProcessInstanceId, '', 'height=' + oheight + 'px,width= ' + owidth + 'px,top=50px,left=100px,resizable=yes');

}