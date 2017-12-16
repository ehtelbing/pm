// JavaScript Document

//-----------------
var thisDate = new Date();
var thisYear = thisDate.getFullYear();
var thisMonth = thisDate.getMonth() + 1;

var ckstore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'ckstore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'zdh/plant_sel',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            IS_V_DEPTCODE: "",
            IS_V_DEPTTYPE: '[基层单位]'
        }
    }
});

var topP = Ext.create('Ext.form.Panel', {
    //title:'topP',
    region: 'north',
    height: 50,
    frame: true,
    items: [{
        id: 'ck',
        xtype: 'combo',
        store: ckstore,
        editable: false,
        fieldLabel: '厂矿',
        labelWidth: 60,
        displayField: 'V_DEPTNAME',
        valueField: 'V_DEPTCODE',
        queryMode: 'local',
        baseCls: 'margin-bottom',
        margin : '10px 0 0 10px',
        listeners: {
            change: function () {
                Ext.data.StoreManager.lookup('zyqstore').load({
                    params: {
                        IS_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                        IS_V_DEPTTYPE: '[主体作业区]'
                    }
                });
            }
        }
    }]
});

var centerPStore = Ext.create('Ext.data.Store', {

    id: 'centerPStore',
    pageSize: 100,
    autoLoad: false,
    fields: ['index1', 'index2', 'index3', 'index4'],

    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'zdh/',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var centerP = Ext.create('Ext.grid.Panel', {
    border: false,//
    //baseCls:'my-panel-no-border',
    //title:'详细信息',
    region: 'center',
    store: centerPStore,
    features: [{ftype: 'summary'}],
    columns: [
        {text: '作业区', align: 'center', dataIndex: 'index1'},
        {text: '人员', align: 'center', dataIndex: 'index2'},
        {text: '工种', align: 'center', dataIndex: 'index3'},
        {text: '联系方式', align: 'center', dataIndex: 'index4'}
    ]

});
//------------------
Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [topP, centerP]
    });
});