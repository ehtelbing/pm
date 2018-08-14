/**
 * Created by LL on 2017/12/14.
 */
var userId = Ext.util.Cookies.get("v_personcode");
var userName = Ext.util.Cookies.get("v_personname2");
var deptCode = Ext.util.Cookies.get("v_deptcode");
var orgcode = Ext.util.Cookies.get("v_orgCode");

Ext.onReady(function () {
    var checkPlantStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'checkPlantStore',
        fields: ['MENDDEPT_CODE', 'MENDDEPT_NAME'],
        proxy: {
            type: 'ajax',
            async: true,
            url: AppUrl + 'LL/PRO_DJ603_MENDDEPT',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'USERCODE_IN': userId,
                'PLANTCODE_IN': orgcode
            }
        },
        listeners: {
            'load': function (store) {
                Ext.getCmp('plant').select(store.first());
            }
        }
    });

    var gridStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        pageSize: 200,
        storeId: 'gridStore',
        fields: ['ORDERID', 'DJ_NAME', 'BCSY_RESULT', 'CSY_RESULT', 'MEND_CONTEXT', 'MENDDEPT_NAME'],
        proxy: {
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            url: AppUrl + 'LL/GETORDERSY',
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        }
    });

    var inputPanel = Ext.create('Ext.panel.Panel', {
        titleAlign: 'left',
        region: 'north',
        layout: 'vbox',
        frame: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            //frame: true,
            baseCls: 'my-panel-noborder',
            layout: 'hbox',
            items: [{
                id: 'plant',
                xtype: 'combo',
                fieldLabel: '检修单位',
                align: 'left',
                store: checkPlantStore,
                editable: false,
                displayField: 'MENDDEPT_NAME',
                valueField: 'MENDDEPT_CODE',
                queryMode: 'local',
                style: ' margin: 10px 0px 0px 20px',
                labelAlign: 'right',
                labelWidth: 80
            }, {
                id: 'billcode',
                align: 'left',
                xtype: 'textfield',
                fieldLabel: '工单号',
                style: ' margin: 10px 0px 0px 20px',
                labelAlign: 'right',
                labelWidth: 80
            }]
        }, {
            xtype: 'panel',
            region: 'center',
            //frame: true,
            baseCls: 'my-panel-noborder',
            layout: 'hbox',
            items: [{
                id: 'begindate',
                xtype: 'datefield',
                align: 'left',
                fieldLabel: '送修日期',
                format: 'Y-m-d',
                value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                editable: false,
                style: ' margin: 10px 0px 0px 20px',
                labelAlign: 'right',
                labelWidth: 80
            }, {
                id: 'enddate',
                xtype: 'datefield',
                align: 'left',
                fieldLabel: '到',
                format: 'Y-m-d',
                value: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
                editable: false,
                style: ' margin: 10px 0px 0px 20px',
                labelAlign: 'right',
                labelWidth: 80
            }, {
                xtype: 'button',
                id: 'search',
                text: '查  询',
                width: '60',
                icon: imgpath + '/search.png',
                style: ' margin: 10px 0px 10px 45px',
                handler: OnClickSearch
            }]
        }]
    });

    var gridPanel = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel',
        region: 'center',
        columnLines: true,
        width: '100%',
        title: '试验信息查询',
        autoScroll: true,
        store: gridStore,
        dufaults: {
            width: 120
        },
        foreFit: true,
        columns: [{
            text: '试验',
            align: 'center',
            dataIndex: 'ORDERID',
            width: 100,
            renderer: lookMore
        }, {
            text: '工单号',
            dataIndex: 'ORDERID',
            align: 'center'
        }, {
            text: '电机名称',
            dataIndex: 'DJ_NAME',
            align: 'center',
            width: 130
        }, {
            text: '半成品试验结果',
            dataIndex: 'BCSY_RESULT',
            align: 'center',
            width: 130
        }, {
            text: '成品试验结果',
            dataIndex: 'CSY_RESULT',
            align: 'center',
            width: 130
        }, {
            text: '维修内容',
            dataIndex: 'MEND_CONTEXT',
            align: 'center',
            width: 130
        }, {
            text: '检修班组',
            dataIndex: 'MENDDEPT_NAME',
            align: 'center',
            width: 180
        }],
        dockedItems: [inputPanel],
        bbar: ['->', {
            xtype: 'pagingtoolbar',
            id: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: gridStore
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
            region: 'center',
            layout: 'fit',
            border: false,
            items: [gridPanel]
        }]
    });

});

function OnClickSearch(){
   var proxy= Ext.data.StoreManager.lookup('gridStore').getProxy();
    proxy.extraParams.A_PLANTCODE =orgcode;
    proxy.extraParams.A_MENDDEPT =Ext.getCmp('plant').getValue();
    proxy.extraParams.A_ORDERID =Ext.getCmp('billcode').getValue();
    proxy.extraParams.A_BEGINDATE =Ext.Date.format(Ext.getCmp('begindate').getValue(), 'Y-m-d');
    proxy.extraParams.A_ENDDATE =Ext.Date.format(Ext.getCmp('enddate').getValue(), 'Y-m-d');
    Ext.data.StoreManager.lookup('gridStore').currentPage=1;
    Ext.data.StoreManager.lookup('gridStore').load();
}

function lookMore(value, metaData, record, rowIdx, colIdx, store, view) {
    return "<a onclick='OnOpen(\"" + rowIdx + "\")' style='color:blue'>查看</a>";
}

function OnOpen(rowIdx) {
    var orderId = Ext.data.StoreManager.lookup('gridStore').getAt(rowIdx).data.ORDERID;
    window.open(AppUrl + "page/PM_1501060601/index" + '.html?ORDERID=' + orderId, "", "dialogHeight:700px;dialogWidth:1100px");
}