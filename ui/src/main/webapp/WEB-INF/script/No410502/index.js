Ext.Loader.setConfig({ enabled: true });
Ext.Loader.setPath({
    "com.store":"../../com/store",
    "com.view": "../../com/view",
    "com.util": "../../com/util"
});

/*
Ext.require([

    'com.view.Grid',
    'com.store.GridStore',
    'com.store.TreeStore',
    'com.store.ComboStore',
    'com.view.Viewport',
    'com.view.Form'
])
*/


Ext.onReady(function () {

    var x_modelnumberF = "";

    if (location.href.split('?')[1] != undefined) {
        x_modelnumberF = Ext.urlDecode(location.href.split('?')[1]).x_modelnumber;

    }

    //Store

    var gridStore = Ext.create("Ext.data.Store", {

        autoLoad: true,
        storeId: 'ckstore',
        fields: ['I_SEQUENCE', 'N_NUMBER', 'N_UNITPRICE', 'V_SIZE', 'V_SPCODE', 'V_SPNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + '/No4120/VIEW_PRELOADWARE',  //返回多游标
            //url:APP + "/ModelDoubleSelect",
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                X_MODELNUMBER: x_modelnumberF
            }
        }
    })



    var top = Ext.create("Ext.panel.Panel", {

        region: 'north',
        height:30,
        header: false,
        defaults: {
            margin: '5px 10px 5px 0'
        },
        items: [
            { xtype: 'label', html: '<font style="font-size:14px;font-weight:bold;display:block;padding:5px 0 0 5px">预装件信息</font>'}
        ]

    })



    var img = Ext.create('Ext.Img', {
        id:'img',
        autoEl: 'div'

    });

    var form = Ext.create('Ext.form.Panel', {
        id: 'forms',
        width: 450,
        title: '基本信息',
        region: 'west',
        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 70,
            margin: '0 0px 10px 0',
            width: 214
        },
        layout: 'column',
        bodyPadding: '15px 0 0 0 ',

        items: [

            { id: 'v_deptname', xtype: 'textfield', fieldLabel: '应用部门'},
            { id: 'v_equtypename', xtype: 'textfield', fieldLabel: '设备类型' },

            { id: 'x_modelname', xtype: 'textfield', fieldLabel: '型号名称' , width: 428},
            { xtype: "label", html: "<font style=\"color:red;font-size:19px\">*</font>", width: 0 },
            { id: 'x_memo', xtype: 'textarea', fieldLabel: '备注', width: 428 },
            { id: 'x_modelnumber', xtype: 'hidden', fieldLabel: '型号编码' },
            // { xtype: "label", html: "<font style=\"color:red;font-size:19px\">*</font>", width: 0 },
            { id: 'x_unit', xtype: 'hidden', fieldLabel: '计量单位'  },
            { id: 'x_size', xtype: 'hidden', fieldLabel: '规格型号' },
            { id: 'x_setsite', xtype: 'hidden', fieldLabel: '安装位置' }


            ,
            img

        ]
    });


    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        title: '备件信息',
        hieght: 600,
        columnWidth: 300,
        store: gridStore,
        region: 'center',
        plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })],
        columns: [Ext.create('Ext.grid.RowNumberer', { align: 'center' }),

            { header: "备件编码", dataIndex: 'V_SPCODE', align: 'center' ,width:100},
            { header: "备件名称", dataIndex: 'V_SPNAME', align: 'center',width:150},
            { header: "规格型号", dataIndex: 'V_SIZE', editor: { allowBlank: false }, align: 'center' ,width:100},


            { header: "单价", dataIndex: 'N_UNITPRICE', align: 'right', width:50},
            { header: "需求数量", dataIndex: 'N_NUMBER', align: 'right',width:100}

        ],
        selType: 'cellmodel'


    });


    Ext.create('Ext.container.Viewport', {

        layout: 'border',
        split: true,
        border: 0,
        items: [top, form, grid]
    });



    queryText(x_modelnumberF);

})




function queryText(x_modelnumberF) {

    if (x_modelnumberF != "") {

        Ext.Ajax.request({

            url: AppUrl + '/No4120/VIEW_PRELOADWARE',
            //url:APP + "/ModelDoubleSelect",
            mothod: 'POST',

            params: {
                X_MODELNUMBER: x_modelnumberF
            },
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText);


                if(resp.mainlist!=""){

                    Ext.getCmp("v_deptname").setValue(resp.mainlist[0].V_DEPTNAME);
                    Ext.getCmp("x_modelnumber").setValue(resp.mainlist[0].V_MODELNUMBER);
                    Ext.getCmp("x_modelname").setValue(resp.mainlist[0].V_MODELNAME);

                    Ext.getCmp("v_equtypename").setValue(resp.mainlist[0].V_TYPE);

                    Ext.getCmp("x_unit").setValue(resp.mainlist[0].V_UNIT);

                    Ext.getCmp("x_size").setValue(resp.mainlist[0].V_EQUTYPECODE);  //规格型号

                    Ext.getCmp("x_setsite").setValue(resp.mainlist[0].V_SETSITE);
                    Ext.getCmp("x_memo").setValue(resp.mainlist[0].V_MEMO);

                    Ext.getCmp("img").setSrc(resp.mainlist[0].V_DRAWING);
                }
            }

        })
    }
}







