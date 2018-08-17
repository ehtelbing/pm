var V_ORDERGUID = null;

if (location.href.split('?')[1] != undefined) {
    V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
}

Ext.onReady(function () {

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: false,
        fields: ['mat_no', 'mat_desc',
            'unit', 'ltext', 'plan_price', 'days'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'mm/GetMatTable',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });


    var panel = Ext.create("Ext.panel.Panel", {
        region: 'north',
        layout: 'column',
        frame: true,
        wdith: '100%',
        items: [{
            xtype: 'textfield',
            fieldLabel: '物料编码',
            id: 'matCode',
            labelAlign: 'right',
            labelWidth: 60
        }, {
            xtype: 'textfield',
            fieldLabel: '物料名称',
            id: 'matDesc',
            labelAlign: 'right',
            labelWidth: 60
        }, {
            xtype: 'button',
            text: '查询',

            icon: imgpath + '/search.png',
            width: 60,
            margin: '0px 0px 0px 10px',
            listeners: {
                click: loadQuery
            }
        }]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        store: gridStore,
        columnLines: true,
        autoScroll: true,
        region: 'center',
        columns: [{
            text: '物料编码',
            id: 'codeClick',
            dataIndex: 'mat_no',
            width: 100,
            renderer: AddFloat
        },
            {
                text: '物料描述',
                dataIndex: 'mat_desc',
                width: 160,
                renderer: AddFloat
            }, {
                text: '单位',
                dataIndex: 'unit',
                width: 40,
                renderer: AddFloat
            }, {
                text: '计划价',
                dataIndex: 'plan_price',
                width: 60,
                renderer: AddFloat
            }, {
                text: '规格型号',
                dataIndex: 'ltext',
                width: 80,
                renderer: AddFloat
            }]
    })


    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [panel, grid]
    });

    QuerySap();

    Ext.getCmp("grid").on("itemclick", function (obj, record, item, index, e, eOpts) {

        //物料编码:MAT_NO  物料描述:MAT_DESC
        //单位:UNIT        计划价:PLAN_PRICE
        //规格型号:MAT_OLD_NO
        window.parent.returnData(
            record.data.mat_no,
            record.data.mat_desc,
            record.data.unit,
            record.data.plan_price,
            record.data.ltext
        );
        window.parent.closframe();
    });
   // Ext.getCmp("selType").select(Ext.getCmp("selType").getStore().getAt(0));
});

function QuerySap(){

}

function loadQuery() {

    Ext.data.StoreManager.lookup('gridStore').load({
        params:{
            code:Ext.getCmp('matCode') .getValue()==""?"%":Ext.getCmp('matCode') .getValue(),
            name:Ext.getCmp('matDesc') .getValue()==""?"%":Ext.getCmp('matDesc') .getValue(),
            x_personcode:Ext.util.Cookies.get("v_personcode")
        }
    })

}


function BackItem(aa, record, item, index, e, eOpts) {

    var matCode = record.data.mat_no;
    var matDesc = record.data.mat_desc;
    var unit = record.data.unit;
    var price = record.data.plan_price;
    var matgon = record.data.ltext;
    var acti = Ext.getCmp('selActivity').getValue();

    var threeParams = matCode + '^' + matDesc + '^' + unit + '^'
        + price + '^' + matgon + '^' + acti;
    window.parent.OnClickMatCodeText(threeParams);
}


function AddFloat(value, metaData, record, rowIndex, colIndex,
                  store, view) {
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}

