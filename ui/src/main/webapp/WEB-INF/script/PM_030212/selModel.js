var getck = null;
var getzyq=null;
if (location.href.split('?')[1] != undefined) {
    getck = Ext.urlDecode(location.href.split('?')[1]).CK;
    getzyq=Ext.urlDecode(location.href.split('?')[1]).ZYQ;
}
var date=new Date();
//--年
var years = [];
for (var i = date.getFullYear() - 4; i <= date.getFullYear() + 1; i++) {
    years.push({displayField: i, valueField: i});
}
var yearStore = Ext.create("Ext.data.Store", {
    storeId: 'yearStore',
    fields: ['displayField', 'valueField'],
    data: years,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});
//月份
var months = [];
for (var i = 1; i <= 12; i++) {
    months.push({displayField: i, valueField: i});
}
var monthStore = Ext.create("Ext.data.Store", {
    storeId: 'monthStore',
    fields: ['displayField', 'valueField'],
    data: months,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});
// 厂矿
var ckstore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'ckstore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
            'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
            'V_V_DEPTCODENEXT': '%',
            'V_V_DEPTTYPE': '基层单位'
        }
    }
});

//作业
var zyqstore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'zyqstore',
    fields: ['V_DEPTCODE', 'V_DEPTNAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
//专业
var zystore = Ext.create('Ext.data.Store', {
    autoLoad: true,
    storeId: 'zystore',
    fields: ['V_SPECIALTYCODE', 'V_BASENAME'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'basic/PRO_BASE_SPECIALTY_DEPT_SPECIN',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});



var panel2 = Ext.create('Ext.panel.Panel', {
    region: 'north',
    layout: 'column',
    title : '模型选择',
    titleAlign : 'center',
    border:false,
    defaults : {
        style : 'margin:5px 0px 5px 5px',
        labelAlign : 'right'
    },
    frame:true,
    items: [{
        id: 'ck',
        xtype: 'combo',
        store: ckstore,
        fieldLabel: '单位名称',
        editable: false,
        labelWidth: 70,
        displayField: 'V_DEPTNAME',
        valueField: 'V_DEPTCODE',
        queryMode: 'local'
    }, {
        id: 'zyq',
        xtype: 'combo',
        store: zyqstore,
        fieldLabel: '作业区',
        editable: false,
        labelWidth: 70,
        displayField: 'V_DEPTNAME',
        valueField: 'V_DEPTCODE',
        queryMode: 'local'
    }, {
        id: 'zy',
        xtype: 'combo',
        store: zystore,
        fieldLabel: '专业',
        editable: false,
        labelWidth: 70,
        displayField: 'V_BASENAME',
        valueField: 'V_SPECIALTYCODE',
        queryMode: 'local'
    }, {
        id: 'mxname',
        xtype: 'textfield',
        fieldLabel: '模型名称',
        editable: false,
        labelWidth: 70,
        queryMode: 'local'
    },{
        xtype: 'button',
        text: '查询',
        icon: imgpath + '/search.png',
        handler: queryGrid1
    }, {
        xtype: 'button',
        text: '选择',
        icon: imgpath + '/add.png',
        handler: addModel
    }
    ]
});
var gridStore = Ext.create('Ext.data.Store', {
    id: 'gridStore',
    autoLoad: false,
    pageSize: 5,
    /* fields: ['V_MX_CODE', 'V_MX_NAME', 'V_ORGCODE', 'V_ORGNAME',
     'V_DEPTCODE', 'V_DEPTNAME', 'V_SPECIALTY', 'V_MX_MENO', 'V_MX_FALG',
     'V_MX_INPERCODE', 'V_MX_INPERNAME', 'V_MX_INDATE', 'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_EQUCODE', 'V_EQUNAME',
     'V_EQU_MENO', 'V_EQU_FALG', 'V_EQU_INPERCODE', 'V_EQU_INPERNAME', 'V_EQU_INDATE', 'V_JXMX_CODE', 'V_GUID'],*/
    fields: ['I_ID', 'V_MX_CODE', 'V_MX_NAME', 'V_ORGCODE', 'V_DEPTCODE',
        'V_SPECIALTY', 'V_MENO', 'V_FALG', 'V_INPER', 'V_INDATE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'pm_1921/PM_1921_PLAN_MX_DATA_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list',
            total: 'total'
        },
        extraParams: {}
    }
});
var gridStore1 = Ext.create('Ext.data.Store', {
    id: 'gridStore1',
    autoLoad: false,
    pageSize: 5,
    fields: ['V_MX_CODE', 'V_MX_NAME', 'V_ORGCODE', 'V_ORGNAME',
        'V_DEPTCODE', 'V_DEPTNAME', 'V_SPECIALTY', 'V_MX_MENO', 'V_MX_FALG',
        'V_MX_INPERCODE', 'V_MX_INPERNAME', 'V_MX_INDATE', 'V_EQUTYPECODE', 'V_EQUTYPENAME', 'V_EQUCODE', 'V_EQUNAME',
        'V_EQU_MENO', 'V_EQU_FALG', 'V_EQU_INPERCODE', 'V_EQU_INPERNAME', 'V_EQU_INDATE', 'V_JXMX_CODE', 'V_GUID','V_PERNUM','V_LIFELONG'],
    proxy:{
        type: 'ajax',
        async: false,
        url: AppUrl + 'pm_1921/PM_1921_PLAN_EQU_DATA_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list',
            total: 'total'
        },
        extraParams: {}
    }
});
var grid = Ext.create('Ext.grid.Panel', {
    id: 'grid',
    store: gridStore,
    region: 'center',
    columnLines: true,
    bodyStyle: 'overflow-x:hidden; overflow-y:auto',
    title: '计划模型',
    height: '50%',
    width: '100%',
    autoScroll: true,
    selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
        selType: 'checkboxmodel',
        mode: 'SIMPLE'
    },
    columns: [{
        xtype: 'rownumberer',
        text: '序号',
        align: 'center',
        flex: 0.25
    }, {
        text: '单位',
        dataIndex: 'V_ORGCODE',
        align: 'center',
        flex: 2,
        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
            var index = ckstore.find('V_DEPTCODE', value);
            if (index != -1) {
                return ckstore.getAt(index).get('V_DEPTNAME');
            }
            return null;
        }
    }, {
        text: '作业区',
        dataIndex: 'V_ORGCODE',
        align: 'center',
        flex: 3,
        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
            var index = zyqstore.find('V_DEPTCODE', value);
            if (index != -1) {
                return zyqstore.getAt(index).get('V_DEPTNAME');
            }
            return null;
        }
    }, {
        text: '模型名称',
        dataIndex: 'V_MX_NAME',
        align: 'center',
        flex: 2
    }, {
        text: '备注',
        dataIndex: 'V_MENO',
        align: 'center',
        flex: 2
    }],
    bbar: ['->', {
        xtype: 'pagingtoolbar',
        id: 'gpage',
        dock: 'bottom',
        displayInfo: true,
        displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
        emptyMsg: '没有记录',
        store: 'gridStore'
    }],
    listeners: {
        itemclick: function (panel, record, item, index, e, eOpts) {
            //console.log(record.raw.V_MX_CODE);
            itemClick(record.raw.V_MX_CODE);
        }
    }
});

var grid1 = Ext.create('Ext.grid.Panel', {
    id: 'grid1',
    store: gridStore1,
    region: 'south',
    columnLines: true,
    height: '50%',
    width: '100%',
    style: ' margin: auto',
    bodyStyle: 'overflow-x:hidden; overflow-y:auto',
    title: '检修设备',
    autoScroll: true,
    /*selModel: { //指定单选还是多选,SINGLE为单选，SIMPLE为多选
     selType: 'checkboxmodel',
     mode: 'SIMPLE'
     },*/
    columns: [{
        xtype: 'rownumberer',
        text: '序号',
        align: 'center',
        flex: 0.25
    }, {
        text: '模型名称',
        dataIndex: 'V_MX_NAME',
        flex: 4,
        align: 'center'
    }, {
        text: '设备名称',
        dataIndex: 'V_EQUNAME',
        flex: 3,
        align: 'center'
    }, {
        text: '检修内容',
        dataIndex: 'V_EQU_MENO',
        flex: 2,
        align: 'center'
    }, {
        text: '维修人数',
        dataIndex: 'V_PERNUM',
        flex: 2,
        align: 'center'
    }, {
        text: '预期寿命',
        dataIndex: 'V_LIFELONG',
        flex: 2,
        align: 'center'
    }],
    bbar: ['->', {
        xtype: 'pagingtoolbar',
        id: 'gpage1',
        dock: 'bottom',
        displayInfo: true,
        displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
        emptyMsg: '没有记录',
        store: 'gridStore1'
    }]
});
Ext.onReady(function(){

//检修类别
    var jxtypestore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'jxtypestore',
        fields: ['V_BASECODE', 'V_BASENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'dxfile/PM_YEAR_REPARI_SELECT',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'RET'
            }
        }
    });
    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [panel2, grid, grid1]
    });

    Ext.data.StoreManager.lookup('ckstore').on('load', function () {
        Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckstore').getAt(0));
        Ext.data.StoreManager.lookup('zyqstore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });

    Ext.data.StoreManager.lookup('zyqstore').on('load', function () {
        Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqstore').getAt(0));
        Ext.data.StoreManager.lookup('zystore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue()
            }
        });
    });
    //计划厂矿更改时
    Ext.getCmp('ck').on('select', function () {
        Ext.data.StoreManager.lookup('zyqstore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });
    //作业区改变
    Ext.getCmp('zyq').on('select', function () {
        Ext.data.StoreManager.lookup('zystore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue()
            }
        });
    });
    Ext.data.StoreManager.lookup('zystore').on('load', function () {
        //Ext.data.StoreManager.lookup('zystore').insert(0, {V_BASENAME: '全部', V_SPECIALTYCODE: '%'});
        Ext.getCmp("zy").select(Ext.data.StoreManager.lookup('zystore').getAt(0));
        queryGrid1();
    });


    var window = Ext.create('Ext.window.Window', {
        id: 'window',
        width: 400,
        height: 400,
        layout: 'vbox',
        title: '时间编辑',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        defaults: {labelAlign: 'right'},
        items: [
                {
                    xtype: 'combo',
                    id: 'nf',
                    fieldLabel: '年份',
                    editable: false,
                    margin: '5 0 5 5',
                    labelWidth: 100,
                    width: 250,
                    displayField: 'displayField',
                    valueField: 'valueField',
                    value: '',
                    store: yearStore,
                    queryMode: 'local'
                }, {
                    xtype: 'combo',
                    id: 'yf',
                    fieldLabel: '月份',
                    editable: false,
                    margin: '5 0 5 5',
                    labelWidth: 100,
                    width: 250,
                    displayField: 'displayField',
                    valueField: 'valueField',
                    value: '',
                    store: monthStore,
                    queryMode: 'local'
                },
            {
                xtype: 'combo',
                id: 'jxtype',
                fieldLabel: '检修类别',
                editable: false,
                margin: '5 0 5 5',
                labelWidth: 100,
                width: 250,
                displayField: 'V_BASENAME',
                valueField: 'V_BASECODE',
                value: '',
                store: jxtypestore,
                queryMode: 'local'
            },
            {
                xtype: 'textfield',
                id: 'sumhour',
                fieldLabel: '计划工时(小时）',
                labelAlign: 'right',
                margin: '5 0 5 5',
                labelWidth: 100,
                width: 250,
                value: 0
            }],
        buttons: [{
            xtype: 'button',
            text: '确定选择',
            width: 40,
            handler: function () {
                addModelSave();
            }
        }, {
            xtype: 'button',
            text: '取消',
            width: 40,
            handler: function () {
                Ext.getCmp('window').hide();
            }
        }]
    });
});

function itemClick(V_MX_CODE) {
    V_MX_CODETEST = V_MX_CODE;
    var gridStore1 = Ext.data.StoreManager.lookup('gridStore1');
    gridStore1.proxy.extraParams = {
        V_V_MXCODE: V_MX_CODETEST
    };
    gridStore1.load();
}

function queryGrid1() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        V_V_ORGCODE: Ext.getCmp('ck').getValue(),
        V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
        V_V_ZYCODE: Ext.getCmp('zy').getValue(),
        V_V_MXNAME: Ext.getCmp('mxname').getValue()
    };

    gridStore.load();
}

function addModel() {
    var data = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (data.length != 1) {
        alert("请选择一条数据操作");
        return false;
    } else {
            Ext.getCmp('nf').select(date.getFullYear());
            Ext.getCmp('yf').select(date.getMonth()+1);
        Ext.data.StoreManager.lookup('jxtypestore').load();
        Ext.data.StoreManager.lookup('jxtypestore').on('load', function () {
            Ext.getCmp("jxtype").select(Ext.data.StoreManager.lookup('jxtypestore').getAt(0));
        });
        Ext.getCmp('window').show();
    }
}

function addModelSave(){
    if(Ext.getCmp('sumhour').getValue()==""||Ext.getCmp('sumhour').getValue()=="0"){
        alert('请填写计划工期'); return;
    }
    var data = Ext.getCmp('grid').getSelectionModel().getSelection();
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PM_PLAN_YEAR_GETMX_INSERT',
        method: 'POST',
        async: false,
        params: {
            V_V_GUID: data[0].get('V_MX_CODE'),
            V_V_ORGCODE: Ext.getCmp('ck').getValue(),
            V_V_DEPTCODE: Ext.getCmp('zyq').getValue(),
            V_V_REPAIRTYPE: Ext.getCmp('jxtype').getValue(),
            V_V_PLANTYPE: 'YEAR',
            V_V_PERCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_YEAR: Ext.getCmp('nf').getValue(),
            V_V_MONTH: Ext.getCmp('yf').getValue(),
            V_V_SUNTIME: Ext.getCmp('sumhour').getValue()

        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            Ext.MessageBox.alert('提示', '添加成功');

            window.close();
            window.opener.OnButtonQuery();
        }
    });

}