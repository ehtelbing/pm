var flag='';

//厂矿
var ckStore = Ext.create('Ext.data.Store', {
    id: 'ckStore',
    autoLoad: true,
    fields: ['_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
    proxy: {
        type: 'ajax',
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
//作业区
var zyqStore = Ext.create('Ext.data.Store', {
    id: 'zyqStore',
    autoLoad: false,
    fields: ['V_SAP_WORK', 'V_SAP_JHGC', 'V_DEPTNAME', 'V_DEPTCODE_UP', 'V_DEPTCODE', 'V_SAP_YWFW', 'V_SAP_DEPT'],
    proxy: {
        type: 'ajax',
        url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        async: false
    }
});
//设备类型
var sblxStore = Ext.create('Ext.data.Store', {
    id: 'sblxStore',
    autoLoad: false,
    fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
    proxy: {
        type: 'ajax',
        url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});
//设备树
var treeStore=Ext.create('Ext.data.TreeStore', {
    id : 'treeStore',
    autoLoad : false,
    fields : ['sid', 'text', 'parentid','V_EQUSITE']
});
var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    fields: ['V_CARCODE', 'V_CARNAME', 'V_CARTYPE', 'V_CARGUISUO', 'V_FLAG', 'V_CARINFO','V_DE','I_ID','V_EQUCODE','V_EQUNAME','V_EQUSITE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'pm_19/PRO_PM_19_CARTYPE_SEL',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var Layout = {
    layout: 'border',
    items: [
        {
            xtype: 'panel',
            border: false,
            region: 'north',
            layout: 'column',
            defaults: {style: {margin: '5px 0px 5px 10px'}, labelAlign: 'right'},
            frame:true,
            items: [
                {xtype: 'combo', id: 'ck', store: ckStore, queryMode: 'local', valueField: 'V_DEPTCODE', displayField: 'V_DEPTNAME',
                    fieldLabel: '厂矿', editable: false, labelWidth: 80},
                {xtype: 'combo', id: 'zyq', store: zyqStore, queryMode: 'local', valueField: 'V_DEPTCODE', displayField: 'V_DEPTNAME',
                    fieldLabel: '作业区', editable: false, labelWidth: 80},
                {xtype: 'combo', id: 'sblx', store: sblxStore, queryMode: 'local', valueField: 'V_EQUTYPECODE', displayField: 'V_EQUTYPENAME',
                    fieldLabel: '设备类型', editable: false, labelWidth: 80},
                {xtype: 'textfield', fieldLabel: '车辆名称', labelWidth: 80, id: 'carname'},
                {
                    xtype: 'button',
                    text: '查询',
                    handler: queryGrid,
                    icon: imgpath + '/search.png',
                    style: {margin: ' 5px 0 5px 10px'}
                },
                {
                    xtype: 'button',
                    text: '添加',
                    handler: addbtn,
                    icon: imgpath + '/add.png',
                    style: {margin: ' 5px 0 5px 10px'}
                },
                {
                    xtype: 'button',
                    text: '修改',
                    handler: editbtn,
                    icon: imgpath + '/edit.png',
                    style: {margin: ' 5px 0 5px 10px'}
                },
                {
                    xtype: 'button',
                    text: '删除',
                    handler: delbtn,
                    icon: imgpath + '/delete.png',
                    style: {margin: ' 5px 0 5px 10px'}
                },
                { xtype: 'button', text: '通用', handler: addTYbtn,  icon: imgpath + '/add.png', style: { margin: ' 5px 0 5px 10px'}}
            ]
        },
        {
            xtype: 'gridpanel', region: 'center', columnLines: true, id: 'grid', store: 'gridStore',
            selType: 'checkboxmodel',
            columns: [
                {
                    xtype: 'rownumberer', text: '序号', width: 60, align: 'center'
                },
                {
                    text: '车辆编码', align: 'center', width: 150, dataIndex: 'V_CARCODE'
                },
                {
                    text: '车辆名称', align: 'center', width: 150, dataIndex: 'V_CARNAME'
                },
                {
                    text: '车辆类型', align: 'center', width: 150, dataIndex: 'V_CARTYPE'
                },
                {
                    text: '车辆归属', align: 'center', width: 150, dataIndex: 'V_CARGUISUO'
                },
                {
                    text: '车辆状态', align: 'center', width: 150, dataIndex: 'V_FLAG'
                },
                {
                    text: '车辆信息', align: 'center', width: 150, dataIndex: 'V_CARINFO'
                },
                {
                    text: '车辆定额', align: 'center', width: 150, dataIndex: 'V_DE'
                },
                {
                    text: '设备编码', align: 'center', width: 150, dataIndex: 'V_EQUCODE'
                },
                {
                    text: '设备名称', align: 'center', width: 150, dataIndex: 'V_EQUNAME'
                },
                {
                    text: '功能位置', align: 'center', width: 150, dataIndex: 'V_EQUSITE'
                }
            ]
        },
        {
            xtype : 'treepanel',
            id : 'tree',
            region : 'west',
            width : 200,
            store : treeStore,
            rootVisible : false,
            autoScroll: true,
            listeners:{
                itemclick:TreeChecked
            }
        }
    ]
};

var win = Ext.create('Ext.window.Window', {
    id: 'win',
    width: 320,
    height: 400,
    layout: 'vbox',
    title: '编辑',
    modal: true,//弹出窗口时后面背景不可编辑
    frame: true,
    closeAction: 'hide',
    closable: true,
    items: [{
        xtype: 'textfield',
        id: 'wincarcode',
        fieldLabel: '车辆编码',
        labelAlign: 'right',
        width: '300',
        margin: '30px 0 0 0px'
    }, {
        xtype: 'textfield',
        id: 'wincarname',
        fieldLabel: '车辆名称',
        labelAlign: 'right',
        width: '300',
        margin: '20px 0 0 0px'
    }, {
        xtype: 'textfield',
        id: 'wincartype',
        fieldLabel: '车辆类型',
        labelAlign: 'right',
        width: '300',
        margin: '20px 0 0 0px'
    }, {
        xtype: 'textfield',
        id: 'wings',
        fieldLabel: '车辆归属',
        labelAlign: 'right',
        width: '300',
        margin: '20px 0 0 0px'
    }, {
        xtype: 'combo',
        id: 'winfalg',
        fieldLabel: '车辆状态',
        labelAlign: 'right',
        displayField: 'displayField',
        valueField: 'valueField',
        store: [['在用', '在用'], ['停用', '停用']],
        queryMode: 'local',
        value: '在用',
        editable: false,
        width: '300',
        margin: '20px 0 0 0px'
    },{
        xtype: 'textfield',
        id: 'wininf',
        fieldLabel: '车辆信息',
        labelAlign: 'right',
        width: '300',
        margin: '20px 0 0 0px'
    },{
        xtype: 'numberfield',
        id: 'winde',
        fieldLabel: '车辆定额',
        labelAlign: 'right',
        width: '300',
        margin: '20px 0 0 0px'
    }],
    buttons: [{
        xtype: 'button',
        text: '保存',
        width: 40,
        handler: function () {
            save();
        }
    }, {
        xtype: 'button',
        text: '取消',
        width: 40,
        handler: function () {
            Ext.getCmp('win').hide();
        }
    }]
});


function onPageLoaded() {
    Ext.create('Ext.container.Viewport', Layout);
    //厂矿加载时
    Ext.data.StoreManager.lookup('ckStore').on('load', function () {
        Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });
    //作业区加载时
    Ext.data.StoreManager.lookup('zyqStore').on('load', function () {
        Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt(0));
        Ext.data.StoreManager.lookup('sblxStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
            }
        });
    });
    //设备类型加载时
    Ext.data.StoreManager.lookup('sblxStore').on('load', function () {
        Ext.getCmp('sblx').select(Ext.data.StoreManager.lookup('sblxStore').last());
        QueryTree();
    });
    //厂矿选择时
    Ext.getCmp('ck').on('select', function () {
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.getCmp('ck').getValue(),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '主体作业区'
            }
        });
    });
    //作业区选择时
    Ext.getCmp('zyq').on('select', function () {
        Ext.data.StoreManager.lookup('sblxStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
            }
        });
    });
    //设备选择时
    Ext.getCmp('sblx').on('select', function () {
        QueryTree();
    });
    //设备树点击加号加载
    Ext.getCmp("tree").on("beforeload",function(store,operation){
        if(operation.node.data.parentid==-1){
            Ext.apply(store.proxy.extraParams,{
                    V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
                    V_V_DEPTCODE:Ext.getCmp('ck').getValue(),
                    V_V_DEPTNEXTCODE:Ext.getCmp('zyq').getValue(),
                    V_V_EQUTYPECODE:Ext.getCmp('sblx').getValue(),
                    V_V_EQUCODE:operation.node.data.sid
                },
                store.proxy.url=AppUrl + 'pm_19/PRO_SAP_PM_CHILDEQU_TREE')
        }
    });
}
//树查询
function QueryTree(){
    Ext.getCmp('tree').store.setProxy({
        type : 'ajax',
        actionMethods : {
            read : 'POST'
        },
        async : false,
        url : AppUrl + 'pm_19/PRO_SAP_PM_EQU_TREE',
        reader : {
            type : 'json'
        },
        root : {
            expanded : true
        },
        extraParams : {
            V_V_PERSONCODE : Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODE:Ext.getCmp('ck').getValue(),
            V_V_DEPTNEXTCODE:Ext.getCmp('zyq').getValue(),
            V_V_EQUTYPECODE:Ext.getCmp('sblx').getValue(),
            V_V_EQUCODE:'%'
        }
    });
    Ext.getCmp('tree').store.load();
}
function TreeChecked(TreeChecked){
    queryGrid();
}
function queryGrid() {
    var seldata=Ext.getCmp('tree').getSelectionModel().getSelection();
    if(seldata.length!=1){
        if(flag=='TY'){}
        else{
            Ext.Msg.alert("操作信息","请选择一条数据");
            return false;
        }

    }
    if(seldata[0].data.sid!=''){
        Ext.data.StoreManager.lookup('gridStore').load({
            params: {
                V_V_CARNAME : Ext.getCmp('carname').getValue(),
                V_V_EQUCODE : seldata[0].data.sid
            }
        });
    }

}

function addbtn() {
    flag='add';
    var seldata=Ext.getCmp('tree').getSelectionModel().getSelection();
    if(seldata.length!=1){
        Ext.Msg.alert("操作信息","请选择一个设备进行添加");
        return false;
    }
    Ext.getCmp('wincarcode').setReadOnly(false);
    Ext.getCmp('wincarcode').setValue('');
    Ext.getCmp('wincarname').setValue('');
    Ext.getCmp('wincartype').setValue('')
    Ext.getCmp('wings').setValue('');
    Ext.getCmp('wininf').setValue('');
    Ext.getCmp('winde').setValue('');

    Ext.getCmp('win').show();
}
function addTYbtn(){
    flag='TY';
    Ext.getCmp('wincarcode').setReadOnly(false);
    Ext.getCmp('wincarcode').setValue(Ext.data.IdGenerator.get('uuid').generate());
    Ext.getCmp('wincarname').setValue('');
    Ext.getCmp('wincartype').setValue('');
    Ext.getCmp('wings').setValue('');
    Ext.getCmp('wininf').setValue('');
    Ext.getCmp('winde').setValue('');
    Ext.getCmp('win').show();
}
function editbtn() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if(seldata[0].raw.V_EQUCODE=='TY'){
        flag='TY';
    }else{
        flag='edit';
    }
    if (seldata.length != 1) {
        Ext.Msg.alert("操作信息",'请选择一条数据进行修改！');
        return false;
    }
    var seldataTree= Ext.getCmp('tree').getSelectionModel().getSelection();
    if(seldataTree.length!=1){
        Ext.Msg.alert("操作信息","请选择一个设备进行修改!");
        return false;
    }
    Ext.getCmp('wincarcode').setReadOnly(true);
    Ext.getCmp('wincarcode').setValue(seldata[0].data.V_CARCODE);
    Ext.getCmp('wincarname').setValue(seldata[0].data.V_CARNAME);
    Ext.getCmp('wincartype').setValue(seldata[0].data.V_CARTYPE);
    Ext.getCmp('wings').setValue(seldata[0].data.V_CARGUISUO);
    Ext.getCmp('winfalg').setValue(seldata[0].data.V_FLAG);
    Ext.getCmp('wininf').setValue(seldata[0].data.V_CARINFO);
    Ext.getCmp('winde').setValue(seldata[0].data.V_DE);
    Ext.getCmp('win').show();

}

function delbtn() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length == 0) {
        Ext.Msg.alert("操作信息","请至少选择一条数据进行删除!");
        return false;
    }//对所选进行排查，至少选择一个
    for (var i = 0; i < seldata.length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'pm_19/PRO_PM_19_CARTYPE_DEL',
            method: 'POST',
            async: false,
            params: {
                V_V_CARCODE: seldata[i].data.V_CARCODE
            },
            success: function (ret) {
                var resp = Ext.JSON.decode(ret.responseText);

            }
        });
    }
    queryGrid();

}

function save() {
    if (flag == 'TY') {
        Ext.Ajax.request({
            url: AppUrl + 'pm_19/PRO_PM_19_CARTYPE_EDIT',
            method: 'POST',
            async: false,
            params: {
                V_V_CARCODE: Ext.getCmp('wincarcode').getValue(),
                V_V_CARNAME: Ext.getCmp('wincarname').getValue(),
                V_V_CARTYPE: Ext.getCmp('wincartype').getValue(),
                V_V_CARGUISUO: Ext.getCmp('wings').getValue(),
                V_V_FLAG: Ext.getCmp('winfalg').getValue(),
                V_V_CARINFO: Ext.getCmp('wininf').getValue(),
                V_V_DE: Ext.getCmp('winde').getValue(),
                V_V_EQUCODE: 'TY',
                V_V_EQUNAME: 'TY',
                V_V_EQUSITE: 'TY'
            },
            success: function (ret) {
                var resp = Ext.JSON.decode(ret.responseText);
                Ext.getCmp('win').hide();
                queryGrid();
            }
        });
    } else {
        var seldata = Ext.getCmp('tree').getSelectionModel().getSelection();
        if (seldata[0].data.sid != '') {
            Ext.Ajax.request({
                url: AppUrl + 'pm_19/PRO_PM_19_CARTYPE_EDIT',
                method: 'POST',
                async: false,
                params: {
                    V_V_CARCODE: Ext.getCmp('wincarcode').getValue(),
                    V_V_CARNAME: Ext.getCmp('wincarname').getValue(),
                    V_V_CARTYPE: Ext.getCmp('wincartype').getValue(),
                    V_V_CARGUISUO: Ext.getCmp('wings').getValue(),
                    V_V_FLAG: Ext.getCmp('winfalg').getValue(),
                    V_V_CARINFO: Ext.getCmp('wininf').getValue(),
                    V_V_DE: Ext.getCmp('winde').getValue(),
                    V_V_EQUCODE: seldata[0].data.sid,
                    V_V_EQUNAME: seldata[0].data.text,
                    V_V_EQUSITE: seldata[0].data.V_EQUSITE
                },
                success: function (ret) {
                    var resp = Ext.JSON.decode(ret.responseText);
                    Ext.getCmp('win').hide();
                    queryGrid();
                }
            });
        }
    }
}
function renderFont(value, metaData) {
    metaData.style = 'text-align: left';
    return value;
}
Ext.onReady(onPageLoaded);
