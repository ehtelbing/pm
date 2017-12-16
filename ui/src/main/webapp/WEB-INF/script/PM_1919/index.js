var V_V_JXGX_CODE = null;
var V_ORDERGUID = null;
if (location.href.split('?')[1] != undefined) {
    V_V_JXGX_CODE = Ext.urlDecode(location.href.split('?')[1]).V_V_JXGX_CODE;
    V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
}

var selid ="";
var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    fields: ['I_ID','V_CARCODE', 'V_CARNAME', 'V_CARTYPE', 'V_CARGUISUO', 'V_FLAG', 'V_CARINFO'],
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
var window = Ext.create('Ext.window.Window', {
    id: 'window',
    width: 330,
    height: 280,
    layout: 'vbox',
    title: '编辑',
    modal: true,//弹出窗口时后面背景不可编辑
    frame: true,
    closeAction: 'hide',
    closable: true,
    items: [{
        xtype: 'panel',
        layout: 'column',
        frame: true,
        baseCls: 'mu-panel-no-border',
        items: [{
            xtype: 'textfield',
            id: 'wincarcode',
            fieldLabel: '机具编码',
            labelAlign: 'right',
            width: '300',
            margin: '20px 0 0 0px',
            //readOnly: true
        }, {
            xtype: 'button',
            text: '+',
            width: 20,
    //        handler: select,
            margin: '20px 0 0 10px',
            hidden:true
        }]
    }, {
        xtype: 'textfield',
        id: 'wincarname',
        fieldLabel: '机具名称',
        labelAlign: 'right',
        width: '300',
        margin: '10px 0 0 0px'
    }, {
        xtype: 'textfield',
        id: 'wincartype',
        fieldLabel: '机具类型',
        labelAlign: 'right',
        width: '300',
        margin: '10px 0 0 0px'
    }, {
        xtype: 'textfield',
        id: 'wincarguisuo',
        fieldLabel: '机具归属',
        labelAlign: 'right',
        width: '300',
        margin: '10px 0 0 0px'
    }, {
        xtype: 'textfield',
        id: 'wincarflag',
        fieldLabel: '机具状态',
        labelAlign: 'right',
        width: '300',
        margin: '10px 0 0 0px'
    }, {
        xtype: 'textfield',
        id: 'wincarinfo',
        fieldLabel: '机具信息',
        labelAlign: 'right',
        width: '300',
        margin: '10px 0 0 0px'
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
            Ext.getCmp('window').hide();
        }
    }]
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
                {xtype: 'textfield',
                    id: 'carname',
                    fieldLabel: '车辆名称',
                    labelWidth: 80
                },{
                    xtype: 'button',
                    text: '查询',
                    handler: queryGrid,
                    icon: imgpath + '/search.png'
                }, {
                    xtype: 'button',
                    text: '添加',
                    icon: imgpath + '/add.png',
                    handler: function () {
                        addbtn();
                    }
                }, {
                    xtype: 'button',
                    text: '修改',
                    icon: imgpath + '/edit.png',
                    handler: function () {
                        editbtn()
                    }
                }, {
                    xtype: 'button',
                    text: '删除',
                    icon: imgpath + '/delete.png',
                    handler: function () {
                        delbtn();
                    }
                }
            ]
        },
        {
            xtype: 'gridpanel', region: 'center', columnLines: true, id: 'grid', store: 'gridStore',
            selType: 'checkboxmodel',
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1})],
            listeners: {
                //itemclick: OnClickGrid
                //itemdblclick: OnClickGrid
            },
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
                    text: '台时', align: 'center', width: 150, dataIndex: 'V_TIME', renderer: AtEdit,
                    editor:{xtype: 'numberfield'},hidden:true
                }
            ]
        }
    ]
};

function onPageLoaded() {
    Ext.create('Ext.container.Viewport', Layout);
    queryGrid();
}

function queryGrid() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_CARNAME: Ext.getCmp('carname').getValue()
        }
    });
}

function addbtn() {
    selid='0';
    Ext.getCmp('wincarcode').setValue();
    Ext.getCmp('wincarname').setValue();
    Ext.getCmp('wincartype').setValue();
    Ext.getCmp('wincarguisuo').setValue();
    Ext.getCmp('wincarflag').setValue();
    Ext.getCmp('wincarinfo').setValue();
    Ext.getCmp('window').show();
}
function editbtn() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length != 1) {
        alert('请选择一条数据进行修改！');
        return false;
    }
    selid = seldata[0].data.I_ID;
    Ext.getCmp('wincarcode').setValue(seldata[0].data.V_CARCODE);
    Ext.getCmp('wincarname').setValue(seldata[0].data.V_CARNAME);
    Ext.getCmp('wincartype').setValue(seldata[0].data.V_CARTYPE);
    Ext.getCmp('wincarguisuo').setValue(seldata[0].data.V_CARGUISUO);
    Ext.getCmp('wincarflag').setValue(seldata[0].data.V_FLAG);
    Ext.getCmp('wincarinfo').setValue(seldata[0].data.V_CARINFO);
    Ext.getCmp('window').show();

}

function delbtn() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length == 0) {
        alert('请至少选择一条数据进行删除！');
        return false;
    }//对所选进行排查，至少选择一个
    for (var i = 0; i < seldata.length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'pm_19/PRO_PM_19_CARDE_DEL',
            method: 'POST',
            async: false,
            params: {
                I_I_ID: seldata[i].data.I_ID
            },
            success: function (ret) {
                var resp = Ext.JSON.decode(ret.responseText);
            }
        });
    }
    queryGrid();

}

function save() {
    Ext.Ajax.request({
        url: AppUrl + 'pm_19/PRO_PM_19_CARDE_EDIT',
        method: 'POST',
        async: false,
        params: {
            I_I_ID:selid,
            V_V_CARCODE: Ext.getCmp('wincarcode').getValue(),
            V_V_CARNAME: Ext.getCmp('wincarname').getValue(),
            V_V_CARTYPE: Ext.getCmp('wincartype').getValue(),
            V_V_CARGUISUO: Ext.getCmp('wincarguisuo').getValue(),
            V_V_FLAG: Ext.getCmp('wincarflag').getValue(),
            V_V_CARINFO: Ext.getCmp('wincarinfo').getValue()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            Ext.getCmp('window').hide();
            queryGrid();
        }
    });
}


function getReturnValue(seldata) {
    Ext.getCmp('wincarcode').setValue(seldata[0].data.V_CARCODE);
    Ext.getCmp('wincarname').setValue(seldata[0].data.V_CARNAME);
    Ext.getCmp('wincartype').setValue(seldata[0].data.V_CARTYPE);
}

function renderFont(value, metaData) {
    metaData.style = 'text-align: left';
    return value;
}
Ext.onReady(onPageLoaded);

function AtEdit(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = 'text-align: right;background-color:yellow';
    return value;
}
function addDetailInfo() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length ==0) {
        alert('请至少选择一条数据进行添加！');
        return false;
    }
    Ext.getCmp('dhtime').setValue(new Date());
    Ext.getCmp('shi').setValue(new Date().getHours());
    Ext.getCmp('fen').setValue(new Date().getMinutes());
    Ext.getCmp('dhdd').setValue();
    Ext.getCmp('yswp').setValue();
    Ext.getCmp('bz').setValue();
    Ext.getCmp('lxrdh').setValue();
    Ext.getCmp('window').show();
}
function getIP(){
    var redata='';
    Ext.Ajax.request({
        method : 'POST',
        async : false,
        url : AppUrl + 'PM_14/GetIP',
        params : {},
        success : function(response){
            var resp = Ext.decode(response.responseText);
            redata=resp.IP.split("/")[1];
        }
    });
    return redata;
}

function detailInfoSave(){
    if(Ext.ComponentManager.get('dhdd').getValue()==''||Ext.ComponentManager.get('dhdd').getValue()==null){
        Ext.Msg.alert("操作信息","等候地点不能为空");
        return false;
    }
    if(Ext.ComponentManager.get('yswp').getValue()==''||Ext.ComponentManager.get('yswp').getValue()==null){
        Ext.Msg.alert("操作信息","运输物品不能为空");
        return false;
    }
    if(Ext.ComponentManager.get('lxrdh').getValue()==''||Ext.ComponentManager.get('lxrdh').getValue()==null){
        Ext.Msg.alert("操作信息","联系人和电话不能为空");
        return false;
    }
    var shi = Ext.ComponentManager.get("shi").getValue();
    if (shi < 10) {
        shi = '0' + shi;
    }
    var fen = Ext.ComponentManager.get("fen").getValue();
    if (fen < 10) {
        fen = '0' + fen;
    }
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    var V_CARCODE='';
    for(var i=0;i< seldata.length;i++){
        V_CARCODE=V_CARCODE+seldata[i].data.V_CARCODE+',';
    }
    V_CARCODE=V_CARCODE.substring(0,V_CARCODE.length-1);
    Ext.Ajax.request({
        url : AppUrl + 'PM_14/PM_14_CL_WORKORDER_DATA_SET',
        method: 'POST',
        async: false,
        params: {
            V_V_IP:getIP(),
            V_V_PERCODE:Ext.util.Cookies.get('v_personcode'),
            V_V_ORDERID:V_ORDERGUID,
            V_V_CARCODE:V_CARCODE,//Ext.ComponentManager.get('cl').getValue(),
            V_D_DATETIME_WITE:Ext.Date.format(Ext.ComponentManager.get("dhtime").getValue(), 'Y-m-d')+ " " + shi + ":" + fen + ':' + "00",
            V_V_DD_WITE: Ext.ComponentManager.get('dhdd').getValue(),
            V_V_WP_WITE:Ext.ComponentManager.get('yswp').getValue(),
            V_V_MEMO:Ext.ComponentManager.get('bz').getValue(),
            V_V_LXRDH:Ext.ComponentManager.get('lxrdh').getValue()
        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText);
            // Ext.example.msg('操作信息', '{0}', resp);
            if(resp.RET=='success'){
                Ext.Msg.alert("操作信息","添加成功");
                Ext.getCmp('window').hide();
            }
        }
    });

}