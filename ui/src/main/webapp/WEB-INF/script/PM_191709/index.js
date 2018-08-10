var V_V_JXGX_CODE = null;
var V_EQUCODE=null;
if (location.href.split('?')[1] != undefined) {
    V_V_JXGX_CODE = Ext.urlDecode(location.href.split('?')[1]).V_V_JXGX_CODE;
    V_EQUCODE = Ext.urlDecode(location.href.split('?')[1]).V_EQUCODE;
}
Ext.onReady(function() {
    var gridStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'gridStore',
        fields: ['V_AQCS_CODE', 'V_AQCS_NAME', 'V_EQUCODE', 'V_EQUNAME', 'V_EQUSITE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'pm_19/PRO_PM_19_AQCS_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var editPanel = Ext.create('Ext.form.Panel', {
        id: 'editPanel',
        region: 'center',
        layout: 'border',
        baseCls: 'my-panel-no-border',
        items: [
            {
                xtype: 'panel',
                border: false,
                region: 'north',
                layout: 'column',
                frame: true,
                defaults: {style: {margin: '5px 0px 5px 10px'}, labelAlign: 'right'},
                items: [
                    {xtype: 'textfield', fieldLabel: '安全措施名称', labelWidth: 100, id: 'aqcsname'},
                    {
                        xtype: 'button',
                        text: '查询',
                        handler: queryGrid,
                        icon: imgpath + '/search.png',
                        style: {margin: ' 5px 0 5px 10px'}
                    },
                    {
                        xtype: 'button', text: '选择', handler: function () {
                        var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
                        if (seldata.length == 0) {
                            alert('请选择一条数据！');
                        } else {
                            /*Ext.Msg.confirm("提示", "确定要选择？", function (button) {
                             if(button == 'yes'){*/
                            select();
                            /*}
                             })*/
                        }
                    }, icon: imgpath + '/add.png', style: {margin: ' 5px 0 5px 10px'}
                    },
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
                        text: '安全措施编码', align: 'center', width: 150, dataIndex: 'V_AQCS_CODE'
                    },
                    {
                        text: '安全措施名称', align: 'center', width: 150, dataIndex: 'V_AQCS_NAME'
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
            }
        ]
    });


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

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [editPanel]
    });

    queryGrid();
})
;
function select(){
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();

    var retdata = [];

    for (var i = 0; i < seldata.length; i++) {
        Ext.Ajax.request({
            method: 'POST',
            async: false,
            url: AppUrl + 'basic/PM_1917_JXGX_AQCS_DATA_SET',
            params: {
                V_V_JXGX_CODE: V_V_JXGX_CODE,
                V_V_AQCS_CODE: seldata[i].data.V_AQCS_CODE
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if(i ==  seldata.length-1){
                    retdata.push(seldata[i].data.V_AQCS_NAME);
                }
                else{
                    retdata.push(seldata[i].data.V_AQCS_NAME+',');
                }
            }
        });
    }
    window.opener.getReturnJXSAFE(retdata);
    window.close();
}



function queryGrid(){
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_AQCS_NAME : Ext.getCmp('aqcsname').getValue(),
            V_V_EQUCODE:V_EQUCODE
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
