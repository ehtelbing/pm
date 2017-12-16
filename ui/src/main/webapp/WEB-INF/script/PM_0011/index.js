// JavaScript Document

//-----------------
var thisDate = new Date();
var thisYear = thisDate.getFullYear();
var thisMonth = thisDate.getMonth() + 1;
var topP = Ext.create('Ext.form.Panel', {
    //title:'topP',
    region: 'north',
    height: 50,
    frame: true,
    items: []
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
        {text: '厂矿', align: 'center', dataIndex: 'index1'},
        {text: '电机维修', align: 'center', dataIndex: 'index2'},
        {text: '自动化维修', align: 'center', dataIndex: 'index3'}
    ]

});
//------------------
Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [topP, centerP]
    });
});