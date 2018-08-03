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
    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['PLANTNAME', 'DEPARTNAME', 'PLANTCODE', 'D_ENTER_DATE', 'V_EQUIP_NO',
            'V_EQUIP_NAME', 'V_SUM_REPAIR', 'UNIT', 'KCID', 'STORENAME', 'UPDATEDATE', 'MATERILETALON'],

        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zpf/PRO_PM_WORKORDER_OLD_HI_SEL',
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

    var inputPanel = Ext.create('Ext.Panel', {
        id: 'inputPanel',
        header: false,
        frame: true,
        layout: 'column',
        defaults: {
            labelAlign: 'right',
            labelWidth: 60,
            inputWidth: 150,
            margin: '5 0 5 0'
        },
        items: [{
            id: 'begintime',
            xtype: 'datefield',
            editable: false,
            format: 'Y-m-d',
            value: new Date(new Date().getFullYear(), 0, 1),
            fieldLabel: '时间段选择',
            labelWidth: 80,
            baseCls: 'margin-bottom'
        }, {
            id: 'endtime',
            xtype: 'datefield',
            editable: false,
            format: 'Y-m-d',
            value: new Date(),
            fieldLabel: '至'
        }, {
            id: 'jjbm',
            xtype: 'textfield',
            fieldLabel: '旧件编码',
            margin: '5 0 5 20',
            queryMode: 'local',
            baseCls: 'margin-bottom'
        }, {
            id: 'jjms',
            xtype: 'textfield',
            fieldLabel: '旧件描述',
            margin: '5 0 5 20',
            queryMode: 'local',
            baseCls: 'margin-bottom'
        }]
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        id: 'buttonPanel',
        defaults: {
            margin: '5 0 5 15',
            width: 80
        },
        items: [{
            xtype: 'button',
            text: '查询',
            icon: imgpath + '/search.png',
            handler: _select
        }]
    });

    var gridPanel = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel',
        store: gridStore,
        frame: true,
        columnLines: true,
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '旧件编码',
            dataIndex: 'V_EQUIP_NO',
            align: 'center',
            flex: 1
        }, {
            text: '旧件名称',
            dataIndex: 'V_EQUIP_NAME',
            align: 'center',
            flex: 1
        }, {
            text: '修旧数量',
            dataIndex: 'V_SUM_REPAIR',
            align: 'center',
            flex: 1
        },
            {
                text: '创建日期',
                dataIndex: 'D_ENTER_DATE',
                align: 'center',
                flex: 1
            }],
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
            items: [inputPanel, buttonPanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [gridPanel]
        }]
    });

    /* Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
     store.proxy.extraParams = {
     v_sap_plantcode: Ext.getCmp('ck').getValue(),
     v_sap_departcode: Ext.getCmp('zyq').getValue(),
     v_storeid: Ext.getCmp('kf').getValue(),
     v_mat_no: Ext.getCmp('jjbm').getValue(),
     v_mat_desc: Ext.getCmp('jjms').getValue()
     }
     });
     */
    _select()
});

function _select() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        V_BEGINTIME: Ext.getCmp('begintime').getSubmitValue(),
        V_ENDTIME: Ext.getCmp('endtime').getSubmitValue(),
        V_MAT_NO: Ext.getCmp('jjbm').getValue(),
        V_MAT_DESC: Ext.getCmp('jjms').getValue(),
        V_V_SOURCECODE: 'defct11'
    };
    gridStore.currentPage = 1;
    gridStore.load();
}
