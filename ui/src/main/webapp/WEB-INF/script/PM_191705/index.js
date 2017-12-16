var V_V_JXGX_CODE = null;
var V_EQUCODE=null;
if (location.href.split('?')[1] != undefined) {
    V_V_JXGX_CODE = Ext.urlDecode(location.href.split('?')[1]).V_V_JXGX_CODE;
    V_EQUCODE = Ext.urlDecode(location.href.split('?')[1]).V_EQUCODE;
}

var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    fields: ['V_TOOLCODE', 'V_TOOLNAME', 'V_TOOLTYPE','V_EQUCODE','V_EQUNAME','V_EQUSITE'],
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
            defaults: { style: { margin: '5px 0px 5px 10px'}, labelAlign: 'right'},
            items: [
                {xtype: 'textfield', fieldLabel: '工具名称', labelWidth: 60, id: 'toolname' },
                { xtype: 'button', text: '查询', handler: queryGrid,  icon: imgpath + '/search.png', style: { margin: ' 5px 0 5px 10px'}},
                { xtype: 'button', text: '选择', handler: function () {
                    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
                    if (seldata.length == 0) {
                        alert('请选择一条数据！');
                    }else{
                        /*Ext.Msg.confirm("提示", "确定要选择？", function (button) {
                            if(button == 'yes'){*/
                                select();
                            /*}
                        })*/
                    }
                },  icon: imgpath + '/add.png', style: { margin: ' 5px 0 5px 10px'}},
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
};

function select(){
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();

    var retdata = [];

    for (var i = 0; i < seldata.length; i++) {
        Ext.Ajax.request({
            method: 'POST',
            async: false,
            url: AppUrl + 'basic/PM_1917_JXGX_GJ_DATA_SET',
            params: {
                V_V_JXGX_CODE: V_V_JXGX_CODE,
                V_V_GJ_CODE: seldata[i].data.V_TOOLCODE
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if(i ==  seldata.length-1){
                    retdata.push(seldata[i].data.V_TOOLNAME);
                }
                else{
                    retdata.push(seldata[i].data.V_TOOLNAME+',');
                }
            }
        });
    }
    window.opener.getReturnJXTOOL(retdata);
    window.close();
}


function onPageLoaded() {
    Ext.create('Ext.container.Viewport', Layout);
    queryGrid();
}

function queryGrid(){
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_TOOLNAME : Ext.getCmp('toolname').getValue(),
            V_V_EQUCODE:V_EQUCODE
        }
    });
}


function renderFont(value, metaData){
    metaData.style = 'text-align: left';
    return value;
}
Ext.onReady(onPageLoaded);
