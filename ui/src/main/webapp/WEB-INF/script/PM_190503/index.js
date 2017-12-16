
var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    fields: ['V_TOOLCODE', 'V_TOOLNAME', 'V_TOOLTYPE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'pm_19/PRO_PM_19_TOOLTYPE_SEL',
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
                {xtype: 'textfield', fieldLabel: '工具名称', labelWidth: 60, id: 'toolname' },
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
                    text: '工具编码', align: 'center', width: 150, dataIndex: 'V_TOOLCODE'
                },
                {
                    text: '工具名称', align: 'center', width: 150, dataIndex: 'V_TOOLNAME'
                },
                {
                    text: '工具类型', align: 'center', width: 150, dataIndex: 'V_TOOLTYPE'
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
        id : 'wintoolcode',
        fieldLabel : '工具编码',
        labelAlign : 'right',
        width : '300',
        margin : '30px 0 0 0px'
    },{
        xtype : 'textfield',
        id : 'wintoolname',
        fieldLabel : '工具名称',
        labelAlign : 'right',
        width : '300',
        margin : '20px 0 0 0px'
    },{
        xtype : 'textfield',
        id : 'wintooltype',
        fieldLabel : '工具类型',
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
            V_V_TOOLNAME : Ext.getCmp('toolname').getValue()
        }
    });
}

function addbtn(){
    Ext.getCmp('wintoolcode').setReadOnly(false);
    Ext.getCmp('wintoolcode').setValue('');
    Ext.getCmp('wintoolname').setValue('');
    Ext.getCmp('wintooltype').setValue('');
    Ext.getCmp('window').show();
}

function editbtn(){
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length != 1) {
        alert('请选择一条数据进行修改！');
        return false;
    }
    Ext.getCmp('wintoolcode').setReadOnly(true);
    Ext.getCmp('wintoolcode').setValue(seldata[0].data.V_TOOLCODE);
    Ext.getCmp('wintoolname').setValue(seldata[0].data.V_TOOLNAME);
    Ext.getCmp('wintooltype').setValue(seldata[0].data.V_TOOLTYPE);
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
            url: AppUrl + 'pm_19/PRO_PM_19_TOOLTYPE_DEL',
            method: 'POST',
            async: false,
            params: {
                V_V_TOOLCODE : seldata[i].data.V_TOOLCODE
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
        url: AppUrl + 'pm_19/PRO_PM_19_TOOLTYPE_EDIT',
        method: 'POST',
        async: false,
        params: {
            V_V_TOOLCODE : Ext.getCmp('wintoolcode').getValue(),
            V_V_TOOLNAME : Ext.getCmp('wintoolname').getValue(),
            V_V_TOOLTYPE : Ext.getCmp('wintooltype').getValue()
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
