var gengxin = "";
var mingtian = new Date();
mingtian.setDate(mingtian.getDate()+1);
var V_GUID = "" ;

if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_ORGCODE == undefined) ? V_ORGCODE = '' : V_ORGCODE = parameters.V_ORGCODE;
    (parameters.v_equtypecode == undefined) ? v_equtypecode = '' : v_equtypecode = parameters.v_equtypecode;
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


    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: false,
        pageSize: 5,
        fields: ['V_DEFECTLIST', 'V_IDEA'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_22/PRO_PM_DEFECT_DESCRIPTION_SEL',
            // url: 'PRO_PM_EQUREPAIRPLAN_VIEW',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            },
            extraParams: {}
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
            id: 'jykycxx',
            xtype: 'textfield',
            fieldLabel: '按异常现象',
            editable: false,
            fieldStyle:'background-color: #FFEBCD; background-image: none;',
            labelWidth: 70,
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
            style: 'margin: 5px 0px 10px 2px'
        }
        ]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        store: gridStore,
        region: 'center',
        columnLines: true,
        bodyStyle: 'overflow-x:hidden; overflow-y:auto',
        //title: '计划模型',
        height: '50%',
        width: '100%',
        autoScroll: true,
        /*selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },*/
        columns: [ {
            text: '异常现象',
            dataIndex: 'V_DEFECTLIST',
            align: 'center',
            flex: 1
        }, {
            text: '处理建议',
            dataIndex: 'V_IDEA',
            align: 'center',
            flex: 1
        }],
        listeners: {
            itemdblclick: function (store, records) {

                window.opener.querySet(records.data.V_DEFECTLIST, records.data.V_IDEA);
                window.close();
            }
        }/*,
         bbar: ['->', {
         xtype: 'pagingtoolbar',
         id: 'gpage',
         dock: 'bottom',
         displayInfo: true,
         displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
         emptyMsg: '没有记录',
         store: 'gridStore'
         }],*/
    });

    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel2, grid]
    });
    queryGrid();
});

function queryGrid() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        V_V_ORGCODE : V_ORGCODE,
        V_V_EQUTYPECODE : v_equtypecode,
        V_V_DEFECTLIST : Ext.getCmp("jykycxx").getValue()

    };
    //flowDicListStore.currentPage = 1;
    gridStore.load();
}



