var V_V_JXGX_CODE = null;
if (location.href.split('?')[1] != undefined) {
    V_V_JXGX_CODE = Ext.urlDecode(location.href.split('?')[1]).V_V_JXGX_CODE;
}

var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    fields: ['V_CARCODE', 'V_CARNAME', 'V_CARTYPE', 'V_CARGUISUO', 'V_FLAG', 'V_CARINFO'],
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
            frame: true,
            defaults: {style: {margin: '5px 0px 5px 10px'}, labelAlign: 'right'},
            items: [
                {xtype: 'textfield', fieldLabel: '车辆名称', labelWidth: 60, id: 'carname'},
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
                    }else{
                        Ext.Msg.confirm("提示", "确定要选择？", function (button) {
                            if(button == 'yes'){
                                select();
                            }
                        })
                    }
                }, icon: imgpath + '/add.png', style: {margin: ' 5px 0 5px 10px'}
                }
            ]
        },
        {
            xtype: 'gridpanel', region: 'center', columnLines: true, id: 'grid', store: 'gridStore',
            selType: 'checkboxmodel',
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1})],
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
                }
            ]
        }
    ]
};

function select() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
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
Ext.onReady(onPageLoaded);
