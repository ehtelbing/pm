var V_V_JXGX_CODE = null;
if (location.href.split('?')[1] != undefined) {
    V_V_JXGX_CODE = Ext.urlDecode(location.href.split('?')[1]).V_V_JXGX_CODE;
}

var selid = "";
var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    fields: ['V_WORKCODE', 'V_WORKNAME', 'V_WORKTYPE','V_TIME','V_DE','V_PERNUM'],
    proxy: {
        type: 'ajax',
        async: false,
        url: AppUrl + 'basic/PM_1917_JXGX_PER_DATA_SELALL',
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
                {xtype: 'textfield', fieldLabel: '工种名称', labelWidth: 60, id: 'workname' },
                { xtype: 'button', text: '查询', handler: queryGrid,  icon: imgpath + '/search.png', style: { margin: ' 5px 0 5px 10px'}},
                { xtype: 'button', text: '选择', handler: function () {
                    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
                    if (seldata.length == 0) {
                        alert('请选择一条数据！');
                    }else{
                        select();
                        /*Ext.Msg.confirm("提示", "确定要选择？", function (button) {
                            if(button == 'yes'){
                                select();
                            }
                        })*/
                    }
                },  icon: imgpath + '/add.png', style: { margin: ' 5px 0 5px 10px'}},
            ]
        },
        { xtype: 'gridpanel', region: 'center',  columnLines: true, id: 'grid', store: 'gridStore',
            selType : 'checkboxmodel',
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1})],
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
                    text: '工种定额', align: 'center', width: 150, dataIndex: 'V_DE'
                },
                {
                    text: '工时', align: 'center', width: 150, dataIndex: 'V_TIME', renderer: AtEdit, editor: {
                    xtype: 'numberfield'
                }},
                {
                    text: '人数', align: 'center', width: 150, dataIndex: 'V_PERNUM', renderer: AtNumEdit, editor: {
                        xtype: 'numberfield'
                    }
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
            url: AppUrl + 'basic/PM_1917_JXGX_PER_DATA_SET_N',
            params: {
                V_V_JXGX_CODE: V_V_JXGX_CODE,
                V_V_PERCODE_DE: seldata[i].data.V_WORKCODE,
                V_V_TS: seldata[i].data.V_TIME,
                V_V_PERNUM:seldata[i].data.V_PERNUM
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if(i ==  seldata.length-1){
                    retdata.push(seldata[i].data.V_WORKNAME);
                }
                else{
                    retdata.push(seldata[i].data.V_WORKNAME+',');
                }
            }
        });
    }
    window.opener.getReturnJXPER(retdata);
    window.close();

}

function onPageLoaded() {
    Ext.create('Ext.container.Viewport', Layout);
    queryGrid();
}

function queryGrid(){
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_JXGX_CODE:V_V_JXGX_CODE,
            V_V_WORKNAME : Ext.getCmp('workname').getValue()
        }
    });
}

function renderFont(value, metaData){
    metaData.style = 'text-align: left';
    return value;
}
Ext.onReady(onPageLoaded);

function AtEdit(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = 'text-align: right;background-color:yellow';
    return value;
}

function AtNumEdit(value, metaData) {
    metaData.style = 'text-align: right;background-color:yellow';
    return value;
}