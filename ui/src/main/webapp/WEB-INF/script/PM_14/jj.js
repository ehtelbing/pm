
var V_GUID = null;
var flag = '';
if (location.href.split('?')[1] != undefined) {
    V_GUID = Ext.urlDecode(location.href.split('?')[1]).V_GUID;
}

var selid = "";
var gridStore = Ext.create("Ext.data.Store", {
    autoLoad: false,
    storeId: 'gridStore',
    fields: ['V_CARCODE', 'V_CARNAME', 'V_CARTYPE', 'V_TIME', 'V_DE', 'I_ID'],
    proxy: {
        type: 'ajax',
        async: false,
        url: APP + '/ModelSelect',//PRO_PM_19_CARDE_SEL
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
                {xtype: 'textfield', fieldLabel: '机具名称', labelWidth: 60, id: 'carname'},
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
                                select();
                    }
                }, icon: imgpath + '/add.png', style: {margin: ' 5px 0 5px 10px'}
                },
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
                    text: '机具编码', align: 'center', width: 150, dataIndex: 'V_CARCODE'
                },
                {
                    text: '机具名称', align: 'center', width: 150, dataIndex: 'V_CARNAME'
                },
                {
                    text: '机具类型', align: 'center', width: 150, dataIndex: 'V_CARTYPE'
                },
                {
                    text: '台时', align: 'center', width: 150, dataIndex: 'V_TIME', renderer: AtEdit, editor: {
                    xtype: 'numberfield'
                }
                }
            ]
        }
    ]
};

function select() {
    var seldata = Ext.getCmp('grid').getSelectionModel().getSelection();
    var code = [];
    var retdata = [];

    for (var i = 0; i < seldata.length; i++) {
        retdata.push(seldata[i].data.V_CARCODE);
        retdata.push(seldata[i].data.V_CARNAME);
        code.push(seldata[i].data.V_CARCODE);
    }

    Ext.Ajax.request({
        url: APP + '/ModelChange',
        params: {
            parName: ['V_V_GUID',
                'V_V_CARCODE'
            ],
            parType: ['s', 's'],
            parVal: [
                V_GUID,
                code.toString()
            ],
            proName: ['PM_14_FAULT_JJ_SET'],
            returnStr: ["V_INFO"],
            returnStrType: ["s"]
        }, success: function (resp) {
        }
    });

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
            parName: ['V_V_CARNAME'],
            parType: ['s' ],
            parVal: [Ext.getCmp('carname').getValue()],
            proName: 'PRO_PM_19_CARTYPE_SEL',
            cursorName: 'V_CURSOR'

        }
    });
}

Ext.onReady(onPageLoaded);

function AtEdit(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = 'text-align: right;background-color:yellow';
    return value;
}