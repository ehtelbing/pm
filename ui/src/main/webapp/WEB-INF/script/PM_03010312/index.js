var V_ORGCODE = null;
if (location.href.split('?')[1] != undefined) {
    V_ORGCODE = Ext.urlDecode(location.href.split('?')[1]).V_ORGCODE;
}
var V_DEPTCODE = null;
if (location.href.split('?')[1] != undefined) {
    V_DEPTCODE = Ext.urlDecode(location.href.split('?')[1]).V_DEPTCODE;
}
var V_EQUTYPE = null;
if (location.href.split('?')[1] != undefined) {
    V_EQUTYPE = Ext.urlDecode(location.href.split('?')[1]).V_EQUTYPE;
}
var V_EQUCODE = null;
if (location.href.split('?')[1] != undefined) {
    V_EQUCODE = Ext.urlDecode(location.href.split('?')[1]).V_EQUCODE;
}
//页面表格信息加载
var gridStore = Ext.create('Ext.data.Store', {
    id : 'gridStore',
    pageSize : 15,
    autoLoad : false,
    fields :['V_MX_CODE', 'V_MX_NAME',  'V_EQUCODE','V_EQUNAME', 'V_JXGX_NR'],
    proxy : {
        type : 'ajax',
        async : false,
        url: AppUrl + 'PM_03/PM_03_JXMX_DATA_SEL',
        actionMethods : {
            read : 'POST'
        },
        reader : {
            type : 'json',
            root : 'list',
            total : 'total'
        }
    }
});
//grid显示
function query() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_ORGCODE: V_ORGCODE,
            V_V_DEPTCODE: V_DEPTCODE,
            V_V_EQUTYPE: V_EQUTYPE,
            V_V_EQUCODE: V_EQUCODE,
            V_V_EQUCHILD_CODE: '%',
            V_V_JXMX_NAME: Ext.getCmp('mxmc').getValue()
        }
    });
}

var northPanel = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: true,
    border: false,
    //baseCls: 'my-panel-no-border',
    margin: '0 0 5 0',
    items: [
        {layout: 'column', defaults: {labelAlign: 'right'},frame:true,border: false,baseCls: 'my-panel-no-border',
            items: [
                {xtype: 'textfield',id:'mxmc',fieldLabel: '模型名称',editable: false, margin: '10 0 0 5',labelWidth:55,width:155,value:'',store:''},
                {xtype: 'button', text: '查询', margin: '10 0 5 10',icon:imgpath + '/search.png',handler:query},
                {xtype: 'button', text: '选择', margin: '10 0 5 10',icon: imgpath +'/add.png', handler:select}
            ]
        }
    ]
});

var gridPanel = Ext.create('Ext.grid.Panel', {
    id:'gridPanel',
    region: 'center',
    border: false,
    store:'gridStore',
    selType:'checkboxmodel',
    columns:[
        {text: '序号', align: 'center', width: 50,xtype: 'rownumberer'},
        {text: '模型名称', align: 'center', width:300,dataIndex: 'V_MX_NAME'},
        {text: '设备名称', align: 'center', width:300,dataIndex: 'V_EQUNAME'},
        {text: '检修内容', align: 'center', width:300,dataIndex: 'V_JXGX_NR'}
    ],
    bbar:["->",
        {
            xtype: 'pagingtoolbar',
            store:gridStore,
            width:'100%',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录'
        }
    ]
});
Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [northPanel,gridPanel]
    });
});
function select(){
    var seldata = Ext.getCmp('gridPanel').getSelectionModel().getSelection();
    if (seldata.length!=1) {
        Ext.Msg.alert('操作提示','请选择一条数据！');
        return false;
    }
    var retdata=seldata[0].data.V_MX_CODE;
    window.opener.getReturnMXXZ(retdata);
    window.close();
}