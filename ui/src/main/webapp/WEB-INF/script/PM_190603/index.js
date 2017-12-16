
var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    fields: ['V_CARCODE', 'V_CARNAME', 'V_CARTYPE'],
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
            xtype : 'panel', border : false, region : 'north', layout : 'column', frame: true,
            defaults: { style: { margin: '5px 0px 5px 5px'}, labelAlign: 'right'},
            items: [
                {xtype: 'textfield', fieldLabel: '车辆名称', labelWidth: 60, id: 'carname' },
                { xtype: 'button', text: '查询', handler: queryGrid,  icon: imgpath + '/search.png'},
                { xtype: 'button', text: '选择', handler: select,  icon: imgpath + '/add.png'},
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
                }
            ]
        }
    ]
};

function select(){
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length != 1) {
        alert('请选择一条数据！');
    }
    else{
        window.opener.getReturnValue(seldata);
        window.close();
    }
}

var window = Ext.create('Ext.window.Window', {
    id : 'window',
    width : 320,
    height : 250,
    layout : 'vbox',
    title : '编辑',
    modal : true,//弹出窗口时后面背景不可编辑
    frame : true,
    closeAction : 'hide',
    closable : true,
    items : [{
        xtype : 'textfield',
        id : 'wincarcode',
        fieldLabel : '车辆编码',
        labelAlign : 'right',
        width : '300',
        margin : '30px 0 0 0px'
    },{
        xtype : 'textfield',
        id : 'wincarname',
        fieldLabel : '车辆名称',
        labelAlign : 'right',
        width : '300',
        margin : '20px 0 0 0px'
    },{
        xtype : 'textfield',
        id : 'wincartype',
        fieldLabel : '车辆类型',
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
    queryGrid();
}

function queryGrid(){
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_CARNAME : Ext.getCmp('carname').getValue()
        }
    });
}

function addbtn(){
    Ext.getCmp('wincarcode').setReadOnly(false);
    Ext.getCmp('wincarcode').setValue('');
    Ext.getCmp('wincarname').setValue('');
    Ext.getCmp('wincartype').setValue('');
    Ext.getCmp('window').show();
}

function editbtn(){
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length != 1) {
        alert('请选择一条数据进行修改！');
        return false;
    }
    Ext.getCmp('wincarcode').setReadOnly(true);
    Ext.getCmp('wincarcode').setValue(seldata[0].data.V_CARCODE);
    Ext.getCmp('wincarname').setValue(seldata[0].data.V_CARNAME);
    Ext.getCmp('wincartype').setValue(seldata[0].data.V_CARTYPE);
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
            url: AppUrl + 'pm_19/PRO_PM_19_CARTYPE_DEL',
            method: 'POST',
            async: false,
            params: {
                V_V_CARCODE : seldata[i].data.V_CARCODE
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
        url: AppUrl + 'pm_19/PRO_PM_19_CARTYPE_EDIT',
        method: 'POST',
        async: false,
        params: {
            V_V_CARCODE : Ext.getCmp('wincarcode').getValue(),
            V_V_CARNAME : Ext.getCmp('wincarname').getValue(),
            V_V_CARTYPE : Ext.getCmp('wincartype').getValue()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            Ext.getCmp('window').hide();
            queryGrid();
        }
    });
}

function renderFont(value, metaData){
    metaData.style = 'text-align: left';
    return value;
}
Ext.onReady(onPageLoaded);
