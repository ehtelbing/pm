
var selid = "";
var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    fields: ['V_WORKCODE', 'V_WORKNAME', 'V_WORKTYPE','V_TIME','V_DE','I_ID'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'pm_19/PRO_PM_19_WORKDE_SEL',
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
                {xtype: 'textfield', fieldLabel: '工种名称', labelWidth: 60, id: 'workname' },
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
                    text: '工种编码', align: 'center', width: 150, dataIndex: 'V_WORKCODE'
                },
                {
                    text: '工种名称', align: 'center', width: 150, dataIndex: 'V_WORKNAME'
                },
                {
                    text: '工种类型', align: 'center', width: 150, dataIndex: 'V_WORKTYPE'
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
            id : 'winworkcode',
            fieldLabel : '工种编码',
            labelAlign : 'right',
            width : '300',
            margin : '30px 0 0 0px',
            readOnly : true
        },{
            xtype : 'button',
            id:'selectbtn',
            text : '+ ',
            width : 20,
            handler : select,
            margin : '30px 0 0 10px'
        }]
    },{
        xtype : 'textfield',
        id : 'winworkname',
        fieldLabel : '工种名称',
        labelAlign : 'right',
        width : '300',
        margin : '20px 0 0 0px',
        readOnly : true
    },{
        xtype : 'textfield',
        id : 'winworktype',
        fieldLabel : '工种类型',
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
            V_V_WORKNAME : Ext.getCmp('workname').getValue()
        }
    });
}

function addbtn(){
    Ext.getCmp('selectbtn').show();
    Ext.getCmp('winworkcode').setValue('');
    Ext.getCmp('winworkname').setValue('');
    Ext.getCmp('winworktype').setValue('');
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
    Ext.getCmp('selectbtn').hide();
    Ext.getCmp('winworkcode').setValue(seldata[0].data.V_WORKCODE);
    Ext.getCmp('winworkname').setValue(seldata[0].data.V_WORKNAME);
    Ext.getCmp('winworktype').setValue(seldata[0].data.V_WORKTYPE);
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
            url: AppUrl + 'hp/PRO_PM_19_WORKDE_DEL',
            method: 'POST',
            async: false,
            params: {
                I_I_ID : seldata[i].data.I_ID,
                V_V_CRAFTCODE :seldata[i].data.V_WORKCODE
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
        url: AppUrl + 'pm_19/PRO_PM_19_WORKDE_EDIT',
        method: 'POST',
        async: false,
        params: {
            I_I_ID : selid,
            V_V_WORKCODE : Ext.getCmp('winworkcode').getValue(),
            V_V_WORKNAME : Ext.getCmp('winworkname').getValue(),
            V_V_WORKTYPE : Ext.getCmp('winworktype').getValue(),
            V_V_TIME : Ext.getCmp('wintime').getValue(),
            V_V_DE : Ext.getCmp('winde').getValue()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if(resp.list[0].V_INFO == 'SUCCESS')
            {
                Ext.getCmp('window').hide();
                queryGrid();
            }else{
                Ext.MessageBox.alert('提示', resp.list[0].V_INFO);
            }

        }
    });
}

function select(){
    var owidth = window.document.body.offsetWidth - 200;
    var oheight = window.document.body.offsetHeight - 100;
    var ret = window.open(AppUrl + "page/PM_190403/index.html"  , '', 'height=' + oheight + ',width=' + owidth + ',top=10px,left=10px,resizable=yes');
}

function getReturnValue(seldata){
    Ext.getCmp('winworkcode').setValue(seldata[0].data.V_WORKCODE);
    Ext.getCmp('winworkname').setValue(seldata[0].data.V_WORKNAME);
    Ext.getCmp('winworktype').setValue(seldata[0].data.V_WORKTYPE);
}

function renderFont(value, metaData){
    metaData.style = 'text-align: left';
    return value;
}
Ext.onReady(onPageLoaded);
