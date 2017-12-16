var V_V_YEAR = '';
var V_V_ORGCODE = '';
var V_V_DEPTCODE = '';
var V_V_EQUTYPE = '';
var V_V_EQUCODE = '';
var V_V_ZY = '';
var V_V_JXNR = '';
if (location.href.split('?')[1] != undefined) {
    V_V_YEAR = Ext.urlDecode(location.href.split('?')[1]).V_V_YEAR;
    V_V_ORGCODE = Ext.urlDecode(location.href.split('?')[1]).V_V_ORGCODE;
    V_V_DEPTCODE = Ext.urlDecode(location.href.split('?')[1]).V_V_DEPTCODE;
    V_V_EQUTYPE = Ext.urlDecode(location.href.split('?')[1]).V_V_EQUTYPE;
    V_V_EQUCODE = Ext.urlDecode(location.href.split('?')[1]).V_V_EQUCODE;
    V_V_ZY = Ext.urlDecode(location.href.split('?')[1]).V_V_ZY;
    V_V_JXNR = Ext.urlDecode(location.href.split('?')[1]).V_V_JXNR;
}

//计划类型
var jhlxData = [{'displayField': '年计划', 'valueField': 'YEAR'}, {'displayField': '季度计划', 'valueField': 'QUARTER'},{'displayField': '月计划', 'valueField': 'MONTH'}];
var jhlxStore = Ext.create("Ext.data.Store", {
    storeId: 'planTypeStore',
    fields: ['displayField', 'valueField'],
    data: jhlxData,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});
//页面表格信息加载
var gridStore = Ext.create('Ext.data.Store', {
    id : 'gridStore',
    pageSize : 15,
    autoLoad : false,
    fields :['I_ID',
        'V_GUID',
        'V_YEAR',
        'V_ORGCODE',
        'V_ORGNAME',
        'V_DEPTCODE',
        'V_DEPTNAME',
        'V_EQUTYPECODE',
        'V_EQUTYPENAME',
        'V_EQUCODE',
        'V_EQUNAME',
        'V_REPAIRMAJOR_CODE',
        'V_CONTENT',
        'V_STARTTIME',
        'V_ENDTIME',
        'V_HOUR',
        'V_REPAIRDEPT_CODE',
        'V_REPAIRDEPT_NAME',
        'V_INDATE',
        'V_INPER',
        'INPERNAME',
        'V_FLOWCODE',
        'V_FLOWORDER',
        'V_FLOWTYPE',
        'V_JHMX_GUID',
        'V_BZ'],
    proxy : {
        type : 'ajax',
        async : false,
        url: AppUrl + 'PM_03/PM_03_PLAN_SEL',
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
            V_V_YEAR: V_V_YEAR,
            V_V_QUARTER: '%',
            V_V_MONTH: '%',
            V_V_PLANTYPE: Ext.getCmp('jhlx').getValue(),
            V_V_ORGCODE: V_V_ORGCODE,

            V_V_DEPTCODE: V_V_DEPTCODE,
            V_V_EQUTYPE: V_V_EQUTYPE,
            V_V_EQUCODE: V_V_EQUCODE,
            V_V_ZY: V_V_ZY,
            V_V_CONTENT: V_V_JXNR,
            V_V_PEROCDE: Ext.util.Cookies.get('v_personcode'),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    });
}

var northPanel = Ext.create('Ext.form.Panel', {
    region: 'north',
    frame: true,
    border: false,
   // baseCls: 'my-panel-no-border',
    margin: '0 0 5 0',
    items: [
        {layout: 'column', defaults: {labelAlign: 'right'},frame:true,border: false,baseCls: 'my-panel-no-border',
            items: [
                {
                    xtype: 'combo',
                    id: 'jhlx',
                    fieldLabel: '计划类型',
                    editable: false,
                    margin: '10 0 0 5',
                    labelWidth: 75,
                    width: 165,
                    displayField: 'displayField',
                    valueField: 'valueField',
                    value: '',
                    store: jhlxStore,
                    queryMode: 'local'
                },
                {xtype: 'textfield',id:'jhmc',fieldLabel: '计划名称',editable: false, margin: '10 0 0 5',labelWidth:55,width:205,value:''},
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

        {text: '序号', align: 'center', width: 50, xtype: 'rownumberer'},
        {text: '厂矿', align: 'center', width: 100, dataIndex: 'V_ORGNAME'},
        {text: '车间名称', align: 'center', width: 100, dataIndex: 'V_DEPTNAME'},
        {text: '专业', align: 'center', width: 100, dataIndex: 'V_REPAIRMAJOR_CODE'},
        {text: '设备名称', align: 'center', width: 100, dataIndex: 'V_EQUNAME'},
        {text: '检修内容', align: 'center', width: 100, dataIndex: 'V_CONTENT'},
        {text: '计划停机日期', align: 'center', width: 100, dataIndex: 'V_STARTTIME',
            renderer: rendererTime},
        {text: '计划竣工日期', align: 'center', width: 100, dataIndex: 'V_ENDTIME',
            renderer: rendererTime},
        {text: '计划工期（小时）', align: 'center', width: 100, dataIndex: 'V_HOUR'}
    ],
    bbar:["->",
        {
            id:'page',
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
    Ext.getCmp('jhlx').select('YEAR');
});
function select(){
    var seldata = Ext.getCmp('gridPanel').getSelectionModel().getSelection();
    if (seldata.length!=1) {
        Ext.Msg.alert('操作提示','请选择一条数据！');
        return false;
    }

    var retdata = seldata[0].data.V_GUID;
    var type = Ext.getCmp('jhlx').getValue();;
    window.opener.getReturnJHXZ(retdata,type);
    window.close();
}

function rendererTime(value, metaData){

    return value.split(".")[0];
}