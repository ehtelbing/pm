
var selid = "";
var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    fields: ['V_CARCODE', 'V_CARNAME', 'V_CARTYPE','V_TIME','V_DE','I_ID'],
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
    layout : 'border',
    items : [
        {
            xtype : 'panel', border : false, region : 'north', layout : 'column', defaults: { style: { margin: '5px 0px 5px 5px'}, labelAlign: 'right'},frame:true,
            items: [
                {xtype: 'textfield', fieldLabel: '车辆名称', labelWidth: 60, id: 'carname' },
                { xtype: 'button', text: '查询', handler: queryGrid,  icon: imgpath + '/search.png'},
                { xtype: 'button', text: '添加', handler: addbtn,  icon: imgpath + '/add.png'},
                { xtype: 'button', text: '修改', handler: editbtn,  icon: imgpath + '/edit.png'},
                { xtype: 'button', text: '删除', handler: delbtn,  icon: imgpath + '/delete.png'},
            ]
        },
        { xtype: 'gridpanel', region: 'center',  columnLines: true, id: 'grid', store: 'gridStore',
            selType : 'checkboxmodel',
            columns: [
                { xtype: 'rownumberer', text: '序号', width: 60, align: 'center'
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
                    text: '台时', align: 'center', width: 150, dataIndex: 'V_TIME'
                },
                {
                    text: '定额', align: 'center', width: 150, dataIndex: 'V_DE'
                }
            ]
        }
    ]
};

var window = Ext.create('Ext.window.Window', {
    id : 'window',
    width : 330,
    height : 320,
    layout : 'vbox',
    title : '编辑',
    modal : true,//弹出窗口时后面背景不可编辑
    frame : true,
    closeAction : 'hide',
    closable : true,
    items : [{
        xtype : 'panel',
        layout : 'column',
        frame : true,
        baseCls : 'mu-panel-no-border',
        items : [{
            xtype : 'textfield',
            id : 'wincarcode',
            fieldLabel : '车辆编码',
            labelAlign : 'right',
            width : '300',
            margin : '30px 0 0 0px',
            readOnly : true
        },{
            xtype : 'button',
            text : '+',
            width : 20,
            handler : select,
            margin : '30px 0 0 10px'
        }]
    },{
        xtype : 'textfield',
        id : 'wincarname',
        fieldLabel : '车辆名称',
        labelAlign : 'right',
        width : '300',
        margin : '20px 0 0 0px',
        readOnly : true
    },{
        xtype : 'textfield',
        id : 'wincartype',
        fieldLabel : '车辆类型',
        labelAlign : 'right',
        width : '300',
        margin : '20px 0 0 0px',
        readOnly : true
    },{
        xtype : 'textfield',
        id : 'wintime',
        fieldLabel : '台时',
        labelAlign : 'right',
        width : '300',
        value : '1',
        readOnly : true,
        margin : '20px 0 0 0px'
    },{
        xtype : 'textfield',
        id : 'winde',
        fieldLabel : '定额',
        labelAlign : 'right',
        width : '300',
        margin : '20px 0 0 0px'
    }],
    buttons : [{
        xtype : 'button',
        text : '保存',
        width : 40,
        handler : function() {
            save();
        }},{
        xtype : 'button',
        text : '取消',
        width : 40,
        handler : function() {
            Ext.getCmp('window').hide();
        }}]
});

function onPageLoaded() {
    Ext.create('Ext.container.Viewport', Layout);

}

function queryGrid(){
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_CARNAME : Ext.getCmp('carname').getValue()
        }
    });
}

function addbtn(){
    Ext.getCmp('wincarcode').setValue('');
    Ext.getCmp('wincarname').setValue('');
    Ext.getCmp('wincartype').setValue('');
    Ext.getCmp('winde').setValue('');
    selid = "";
    Ext.getCmp('window').show();
}

function editbtn(){
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length != 1) {
        alert('请选择一条数据进行修改！');
        return false;
    }
    selid = seldata[0].data.I_ID;
    Ext.getCmp('wincarcode').setValue(seldata[0].data.V_CARCODE);
    Ext.getCmp('wincarname').setValue(seldata[0].data.V_CARNAME);
    Ext.getCmp('wincartype').setValue(seldata[0].data.V_CARTYPE);
    Ext.getCmp('wintime').setValue(seldata[0].data.V_TIME);
    Ext.getCmp('winde').setValue(seldata[0].data.V_DE);
    Ext.getCmp('window').show();

}

function delbtn(){
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length == 0) {
        alert('请至少选择一条数据进行删除！');
        return false;
    }//对所选进行排查，至少选择一个
    for ( var i = 0; i < seldata.length; i++) {
        Ext.Ajax.request({
            url: AppUrl + 'pm_19/PRO_PM_19_CARDE_DEL',
            method: 'POST',
            async: false,
            params: {
                I_I_ID : seldata[i].data.I_ID
            },
            success: function (ret) {
                var resp = Ext.JSON.decode(ret.responseText);

            }
        });
    }
    queryGrid();

}

function save(){
    Ext.Ajax.request({
        url: AppUrl + 'pm_19/PRO_PM_19_CARDE_EDIT',
        method: 'POST',
        async: false,
        params: {
            I_I_ID : selid,
            V_V_CARCODE : Ext.getCmp('wincarcode').getValue(),
            V_V_CARNAME : Ext.getCmp('wincarname').getValue(),
            V_V_CARTYPE : Ext.getCmp('wincartype').getValue(),
            V_V_TIME : Ext.getCmp('wintime').getValue(),
            V_V_DE : Ext.getCmp('winde').getValue()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            Ext.getCmp('window').hide();
            queryGrid();
        }
    });
}

function select(){
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + "page/PM_190603/index.html"  , '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}

function getReturnValue(seldata){
    Ext.getCmp('wincarcode').setValue(seldata[0].data.V_CARCODE);
    Ext.getCmp('wincarname').setValue(seldata[0].data.V_CARNAME);
    Ext.getCmp('wincartype').setValue(seldata[0].data.V_CARTYPE);
}

function renderFont(value, metaData){
    metaData.style = 'text-align: left';
    return value;
}
Ext.onReady(onPageLoaded);
