var ORGCODE = null;
var DEPTCODE=null;
var EQUTYPE=null;
var EQUCODE=null;
if (location.href.split('?')[1] != undefined) {
    ORGCODE = Ext.urlDecode(location.href.split('?')[1]).V_V_ORGCODE;
    DEPTCODE = Ext.urlDecode(location.href.split('?')[1]).V_V_DEPTCODE;
    EQUTYPE = Ext.urlDecode(location.href.split('?')[1]).V_V_EQUTYPE;
    EQUCODE = Ext.urlDecode(location.href.split('?')[1]).V_V_EQUCODE;
}

var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var V_EQUTYPECODE;
var V_EQUTYPENAME;
var orgLoad = false;
var equTypeLoad = false;
var deptLoad = false;

Ext.onReady(function () {
    //Ext.getBody().mask('<p>页面载入中...</p>');
    var gridStore = Ext.create('Ext.data.Store', {
        storeId: 'gridStore',
        autoLoad: false,
        pageSize: 15,
        fields: ['I_ID',
            'V_MX_CODE',
            'V_MX_NAME',
            'V_GX_CODE',
            'V_ORGCODE',
            'V_DEPTCODE',
            'V_EQUTYPE',
            'V_EQUCODE',
            'V_EQUCODE_CHILD',
            'V_BZ',
            'V_IN_DATE',
            'V_IN_PER'],
        proxy: {
            url: AppUrl + 'basic/PM_1917_JXMX_DATA_SEL',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            async: false,
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        },
        listeners: {
            beforeload: beforeQuery
        }
    });

    var topPanel = Ext.create('Ext.form.Panel', {
        border: false,
        region: 'north',
        layout:'column',
        defaults : {
            style : 'margin:5px 0px 5px 5px',
            labelAlign : 'right'
        },
        frame:true,
        items: [
               {
                xtype:'button',
                text: '查询',
                icon: imgpath + '/search.png',
                handler: function () {
                    query();
                }
            },
            {
                xtype: 'button',
                text: '选择',
                handler: addbtn,
                icon: imgpath + '/add.png'
            }]
    });

    var gridPanel = Ext.create('Ext.grid.Panel', {
        id: 'gridPanel',
        store: gridStore,
        border: false,
        columnLines: true,
        titleAlign: 'center',
        region: 'center',
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, /*{
            text: '检修模型编码',
            dataIndex: 'V_MX_CODE',
            align: 'center',
            width: 150
        },*/ {
            text: '检修模型名称',
            dataIndex: 'V_MX_NAME',
            align: 'center',
            width: 150
        }, {
            text: '工序名称',
            align: 'center',
            width: 150,
            renderer: detail
        }, {
            text: '备注',
            dataIndex: 'V_BZ',
            align: 'center',
            width: 150
        }],
        bbar: ['->', {
            xtype: 'pagingtoolbar',
            id: 'gpage',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    var rightPanel = Ext.create('Ext.panel.Panel', {
        layout: 'border',
        region: 'center',
        items: [topPanel, gridPanel]
    });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [rightPanel]
    });

});

function addbtn(){
    var seldata = Ext.getCmp('gridPanel').getSelectionModel().getSelection();
    if (seldata.length != 1) {
        alert('请选择一条数据进行修改！');
        return false;
    }
    window.close();
    window.opener.getReturnValue(seldata[0].data.V_MX_CODE,seldata[0].data.V_MX_NAME);
}
function _init() {
    if (orgLoad && equTypeLoad && deptLoad) {

        Ext.getBody().unmask();
    }
}

function _selectDept(V_V_DEPTCODE) {
    var deptStore = Ext.data.StoreManager.lookup('deptStore');

    deptStore.proxy.extraParams = {
        'V_V_PERSONCODE': V_V_PERSONCODE,
        'V_V_DEPTCODE': V_V_DEPTCODE,
        'V_V_DEPTCODENEXT': '%',
        'V_V_DEPTTYPE': '主体作业区'
    };
    deptStore.currentPage = 1;
    deptStore.load();
}

function beforeQuery(store) {
    store.proxy.extraParams.V_V_ORGCODE = ORGCODE;
    store.proxy.extraParams.V_V_DEPTCODE = DEPTCODE;
    store.proxy.extraParams.V_V_EQUTYPE = EQUTYPE;
    store.proxy.extraParams.V_V_EQUCODE = EQUCODE;
    store.proxy.extraParams.V_V_EQUCHILD_CODE = '%';
    store.proxy.extraParams.V_V_JXMX_NAME = '%';
    store.proxy.extraParams.V_V_PAGE =  Ext.getCmp('gpage').store.currentPage;
    store.proxy.extraParams.V_V_PAGESIZE = Ext.getCmp('gpage').store.pageSize;
}
function query() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_ORGCODE: ORGCODE,
            V_V_DEPTCODE: DEPTCODE,
            V_V_EQUTYPE: EQUTYPE,
            V_V_EQUCODE: EQUCODE,
            V_V_EQUCHILD_CODE: '%',
            V_V_JXMX_NAME: '%',
            V_V_PAGE: Ext.getCmp('gpage').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('gpage').store.pageSize
        }
    });
}

function detail(a, value, metaData) {
    return '<a href="javascript:ondetail(\'' + metaData.data.V_MX_CODE + '\',\'' + metaData.data.V_EQUCODE + '\')">详情</a>';
}

function ondetail(a,b) {
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + 'page/PM_192102/index.html?V_MX_CODE=' + a+'&V_EQUCODE='+b+'&V_ORGCODE='+ORGCODE+'&V_DEPTCODE='+DEPTCODE, '', 'height=' + oheight + ',width=' + owidth + ',top=100px,left=100px,resizable=yes');
}