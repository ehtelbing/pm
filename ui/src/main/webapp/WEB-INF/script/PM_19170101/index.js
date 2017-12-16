var V_JXGX_CODE = null;
if (location.href.split('?')[1] != undefined) {
    V_JXGX_CODE = Ext.urlDecode(location.href.split('?')[1]).V_JXGX_CODE;
}

var selid = "";
var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    fields: ['V_JJ_CODE', 'V_JJ_NAME', 'V_JJ_TYPE', 'V_JJ_TS','V_JJ_DE'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'pm_19/PRO_PM_19_CARDE_GXSEL',
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
            frame: true,
            baseCls: 'my-panel-no-border',
            defaults: {style: {margin: '5px 0px 5px 10px'}, labelAlign: 'right'},
            items: [
            ]
        },
        {
            xtype: 'gridpanel', region: 'center', columnLines: true, id: 'grid', store: 'gridStore',
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1})],
            columns: [
                {
                    xtype: 'rownumberer', text: '序号', width: 60, align: 'center'
                },
                {
                    text: '机具编码', align: 'center', width: 150, dataIndex: 'V_JJ_CODE'
                },
                {
                    text: '机具名称', align: 'center', width: 150, dataIndex: 'V_JJ_NAME'
                },
                {
                    text: '机具类型', align: 'center', width: 150, dataIndex: 'V_JJ_TYPE'
                },
                {
                    text: '台时', align: 'center', width: 150, dataIndex: 'V_JJ_TS'
                },
                {
                    text: '定额', align: 'center', width: 150, dataIndex: 'V_JJ_DE'
                }
            ]
        }
    ]
};

function select() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (seldata.length == 0) {
        alert('请选择一条数据！');
        return false;
    }

    var retdata = [];

    for (var i = 0; i < seldata.length; i++) {
        Ext.Ajax.request({
            method: 'POST',
            async: false,
            url: AppUrl + 'basic/PM_1917_JXMX_JJ_CHANGE',
            params: {
                V_V_JXGX_CODE: V_V_JXGX_CODE,
                V_V_JJCODE: seldata[i].data.V_CARCODE,
                V_V_TS: seldata[i].data.V_TIME
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if(i ==  seldata.length-1){
                    retdata.push(seldata[i].data.V_CARNAME);
                }
                else{
                    retdata.push(seldata[i].data.V_CARNAME+',');
                }
            }
        });
    }
    window.opener.getReturnJXCAR(retdata);
    window.close();
}

var window = Ext.create('Ext.window.Window', {
    id: 'window',
    width: 330,
    height: 320,
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
            margin: '30px 0 0 0px',
            readOnly: true
        }, {
            xtype: 'button',
            text: '+',
            width: 20,
            handler: select,
            margin: '30px 0 0 10px'
        }]
    }, {
        xtype: 'textfield',
        id: 'wincarname',
        fieldLabel: '机具名称',
        labelAlign: 'right',
        width: '300',
        margin: '20px 0 0 0px',
        readOnly: true
    }, {
        xtype: 'textfield',
        id: 'wincartype',
        fieldLabel: '机具类型',
        labelAlign: 'right',
        width: '300',
        margin: '20px 0 0 0px',
        readOnly: true
    }, {
        xtype: 'textfield',
        id: 'wintime',
        fieldLabel: '台时',
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
            Ext.getCmp('window').hide();
        }
    }]
});

function onPageLoaded() {
    Ext.create('Ext.container.Viewport', Layout);
    queryGrid();
}

function queryGrid() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_JXGX_CODE: V_JXGX_CODE
        }
    });
}

function addbtn() {
    Ext.getCmp('wincarcode').setValue('');
    Ext.getCmp('wincarname').setValue('');
    Ext.getCmp('wincartype').setValue('');
    Ext.getCmp('wintime').setValue('');
    Ext.getCmp('winde').setValue('');
    selid = "";
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
    Ext.getCmp('wintime').setValue(seldata[0].data.V_TIME);
    Ext.getCmp('winde').setValue(seldata[0].data.V_DE);
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
            I_I_ID: selid,
            V_V_CARCODE: Ext.getCmp('wincarcode').getValue(),
            V_V_CARNAME: Ext.getCmp('wincarname').getValue(),
            V_V_CARTYPE: Ext.getCmp('wincartype').getValue(),
            V_V_TIME: Ext.getCmp('wintime').getValue(),
            V_V_DE: Ext.getCmp('winde').getValue()
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