var V_GUID = "" ;
var V_YEAR = "" ;
var V_MONTH = "" ;
var V_DEPTCODE = "" ;
var V_ZY = "" ;

if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_YEAR == undefined) ? V_YEAR = '' : V_YEAR = parameters.V_YEAR;
    (parameters.V_MONTH == undefined) ? V_MONTH = '' : V_MONTH = parameters.V_MONTH;
    (parameters.V_DEPTCODE == undefined) ? V_DEPTCODE = '' : V_DEPTCODE = parameters.V_DEPTCODE;
    (parameters.V_ZY == undefined) ? V_ZY = '' : V_ZY = parameters.V_ZY;
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


    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: false,
        fields: ['I_ID', 'V_ORGCODE','V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME',
            'V_TYPE_CODE', 'V_TYPE_NAME', 'V_MAJOR_NAME', 'V_MAJOR_CODE', 'V_PROJECT_CODE',
            'V_PROJECT_NAME', 'V_WBS_CODE','V_WBS_NAME', 'V_CONTENT', 'V_BUDGET_MONEY',
            'V_REPAIR_DEPTCODE', 'V_REPAIR_DEPTNAME', 'V_FZR', 'V_DATE_B', 'V_DATE_E',
            'V_BZ', 'V_FLOW_STATE','V_INPERCODE', 'V_INPERNAME', 'V_INTIEM',
            'V_FALG', 'V_YEAR', 'V_MONTH', 'V_GUID','V_BUILD_DEPT'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_22/PRO_PM_04_PROJECT_DATA_ITEM_N',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        })
    });

    var panel2 = Ext.create('Ext.Panel', {
        region: 'north',
        // height:70,
        width: '100%',
        //title: '查询条件',
        frame: true,
        layout: 'column',
        items: [ {
            id: 'gcbm',
            xtype: 'textfield',
            fieldLabel: '放行工程编码:',
            fieldStyle:'background-color: #FFEBCD; background-image: none;',
            editable: false,
            labelWidth: 80,
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px 2px',
            width: 200,
            labelAlign: 'right'
        }, {
            id: 'gcmc',
            xtype: 'textfield',
            fieldLabel: '放行工程名称:',
            editable: false,
            labelWidth: 80,
            queryMode: 'local',
            fieldStyle:'background-color: #FFEBCD; background-image: none;',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px 2px',
            width: 200,
            labelAlign: 'right'
        }, {
            id: 'gcnr',
            xtype: 'textfield',
            fieldLabel: '放行工程内容',
            fieldStyle:'background-color: #FFEBCD; background-image: none;',
            editable: false,
            labelWidth: 80,
            queryMode: 'local',
            //baseCls: 'margin-bottom',
            style: ' margin: 5px 0px 0px 2px',
            width: 200,
            labelAlign: 'right'
        }, {
            xtype: 'button',
            text: '查询',
            icon: imgpath + '/search.png',
            handler: queryGrid,
            style: 'margin: 5px 0px 0px 2px'
        }
        ]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        store: gridStore,
        region: 'center',
        columnLines: true,
        bodyStyle: 'overflow-x:hidden; overflow-y:auto',
        height: '50%',
        width: '100%',
        autoScroll: true,
        selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns: [ {
            text: '专业',
            dataIndex: 'V_MAJOR_NAME',
            align: 'center',
            flex: 1
        }, {
            text: '工程项目编码',
            dataIndex: 'V_PROJECT_CODE',
            align: 'center',
            flex: 1
        }, {
            text: '工程项目名称',
            dataIndex: 'V_PROJECT_NAME',
            align: 'center',
            flex: 1
        }, {
            text: '年度投资（万元）',
            dataIndex: 'V_BUDGET_MONEY',
            align: 'center',
            flex: 1
        },{
            text: '工程主要内容',
            dataIndex: 'V_CONTENT',
            align: 'center',
            flex: 1
        },{
            text: 'WBS',
            dataIndex: 'V_WBS_CODE',
            align: 'center',
            flex: 1
        },{
            text: '开工时间',
            dataIndex: 'V_DATE_B',
            align: 'center',
            flex: 1
        },{
            text: '竣工时间',
            dataIndex: 'V_DATE_E',
            align: 'center',
            flex: 0.5
        },{
            text: '建设单位',
            dataIndex: 'V_REPAIR_DEPTCODE',
            align: 'center',
            flex: 1
        },{
            text: '建设单位工程负责人',
            dataIndex: 'V_FZR',
            align: 'center',
            flex: 1
        }] ,
        listeners: {
            itemdblclick: function (store, records) {

                window.opener.chuanzhi(records.data.V_PROJECT_CODE,records.data.V_PROJECT_NAME);
                window.close();
            }
        }
    });

    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel2, grid]
    });

    _init();

})

function _init() {
    Ext.getBody().unmask();
}

function queryGrid() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        V_V_YEAR :V_YEAR,
        V_V_MONTH :V_MONTH,
        V_V_ORGCODE :V_DEPTCODE,
        V_V_SPECIALTY : V_ZY,
        V_V_PROJECT_CODE  : Ext.getCmp('gcbm').getValue(),
        V_V_PROJECT_NAME  : Ext.getCmp("gcmc").getValue(),
        V_V_CONTENT  : Ext.getCmp("gcnr").getValue(),
        V_V_BY1 :'大修',
        V_V_BY2 : "已分解"

    };
    //flowDicListStore.currentPage = 1;
    gridStore.load();
}



