Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath({
    "com.store": "../../com/store",
    "com.view": "../../com/view",
    "com.util": "../../com/util"
});


Ext.onReady(function () {

    if (location.href.split('?')[1] != undefined) {
        var x_equtypenameF = Ext.urlDecode(location.href.split('?')[1]).x_equtypename;
        var x_equtypecodeF = Ext.urlDecode(location.href.split('?')[1]).x_equtypecode;
        var x_deptnameF = Ext.urlDecode(location.href.split('?')[1]).x_deptname;
        var x_deptcodeF = Ext.urlDecode(location.href.split('?')[1]).x_deptcode;


    }

    //Store
    var gridStore = Ext.create("Ext.data.Store", {
        storeId: 'gridStore',
        fields: ['nameA', 'nameB', 'nameC', 'nameD', 'nameE', 'nameF', 'nameG', 'nameH']
    });

    var upload = Ext.create('Ext.form.Panel', {

        header: false,
        border: 0,
        title: '图纸',
        width: 420,
        bodyPadding: 10,
        margin: '0px 0px 0px 10px',
        frame: true,
        items: [
            {id: 'x_drawing', xtype: 'textfield', fieldLabel: '图纸路径', labelWidth: 60, width: 390, disabled: true},   //图纸
            {
                xtype: 'filefield',
                name: 'upload',
                id: 'upload',
                fieldLabel: '上传图纸',
                labelWidth: 60,
                msgTarget: 'side',
                allowBlank: false,
                anchor: '100%',
                buttonText: '选择图纸...'
            }

        ],
        buttons: [{
            text: '上传',
            handler: function () {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        url: AppUrl + 'No4120/uploadImageFile',
                        waitMsg: '上传中...',
                        success: function (fp, o) {

                            Ext.Msg.alert('成功', '你的图纸上传成功.');

                            Ext.getCmp("x_drawing").setValue(o.result.path);
                        }
                    });
                }
            }
        }]
    });

    var top = Ext.create("Ext.panel.Panel", {

        region: 'north',
        header: false,
        defaults: {

            margin: '5px 10px 5px 0'
        },
        items: [
            {xtype: 'label', html: '<font style="font-size:14px;font-weight:bold;padding:0px 0 0 5px"">新增预装件</font>'},
            {id: 'save', xtype: 'button', text: '保存'},
            {id: 'cancel', xtype: 'button', text: '取消'}
        ]

    });

    /**
     * 创建Guid
     * @return
     */
    function newGuid() {

        var guid = "";
        for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if (i == 8 || i == 12 || i == 16 || i == 20)
                guid += "-";
        }

        return guid;
    }

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

            {id: 'v_deptname', xtype: 'textfield', fieldLabel: '应用部门', value: x_deptnameF},
            {id: 'v_equtypename', xtype: 'textfield', fieldLabel: '设备类型', value: x_equtypenameF},

            {id: 'x_modelname', xtype: 'textfield', fieldLabel: '预装件名称', width: 428},
            {xtype: "label", html: "<font style=\"color:red;font-size:19px\">*</font>", width: 0},
            {id: 'x_memo', xtype: 'textarea', fieldLabel: '备注', width: 428},
            {id: 'x_ybjcode', xtype: 'displayfield', fieldLabel: '预装件编码', width: 428},
            {id: 'x_modelnumber', xtype: 'hidden', fieldLabel: '型号编码', value: newGuid(), readOnly: true},
            {id: 'x_unit', xtype: 'hidden', fieldLabel: '计量单位'},
            {id: 'x_size', xtype: 'hidden', fieldLabel: '规格型号'},
            {id: 'x_setsite', xtype: 'hidden', fieldLabel: '安装位置'}


            , upload

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
        columns: [Ext.create('Ext.grid.RowNumberer', {align: 'center'}),

            {
                header: "备件编码<font style=\"color:red\">*</font>", dataIndex: 'nameA', align: 'center',
                editor: {
                    allowBlank: false
                }

            },
            {
                header: "备件名称", dataIndex: 'nameB', align: 'center',
                editor: {
                    allowBlank: false
                }
            },
            {
                header: "需求数量<font style=\"color:red\">*</font>", dataIndex: 'nameE', align: 'right',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: false,
                    minValue: 0,
                    maxValue: 100000
                }
            },
            {header: "规格型号", dataIndex: 'nameC', editor: {allowBlank: false}, align: 'center'},


            {
                header: "单价", dataIndex: 'nameD', align: 'right', editor: {
                    xtype: 'numberfield', width: 100,
                    allowBlank: false,
                    minValue: 0,
                    maxValue: 100000
                }
            },


            {
                xtype: 'actioncolumn', header: "删除", dataIndex: 'nameH', id: 'delete', width: 50, align: 'center',

                icon:imgpath + '/delete.png',
                handler: function (grid, rowIndex, colIndex) {

                    grid.getStore().removeAt(rowIndex);
                    Ext.getCmp("grid").getView().refresh();

                    if (grid.getStore().count() == 0) {
                        Ext.getCmp("addGrid").setVisible(true);
                    }
                }
            }
        ],
        selType: 'cellmodel',
        tbar: [
            {id: 'addGridWin', xtype: 'button', text: '添加', icon: imgpath + '/add.png'}
        ]

    });


    Ext.create('Ext.container.Viewport', {

        layout: 'border',
        split: true,
        border: 0,
        items: [top, form, grid]
    });

    Ext.Ajax.request({
        url: AppUrl + '/No4120/GEN_PRELOADWARECODEPRO',
        method: 'POST',
        async: false,
        params: {},
        success: function (response) {
            var resp = Ext.decode(response.responseText);
            Ext.getCmp('x_ybjcode').setValue(resp.list);

        }
    });

    store = grid.getStore();

    Ext.getCmp("save").on('click', function () {

        var store = grid.getStore();
        var data = "";

        for (var i = 0; i < store.getCount(); i++) {

            if (i == 0) {
                data += store.getAt(i).get('nameA');
            } else {
                data += ";" + store.getAt(i).get('nameA');
            }
            data += "," + store.getAt(i).get('nameB');
            data += "," + store.getAt(i).get('nameC');
            data += "," + store.getAt(i).get('nameD');
            data += "," + store.getAt(i).get('nameE');
        }

        save(data);
    });

    Ext.getCmp("cancel").on('click', function () {
        document.location.href = "../../page/No410502/Index.html";
    });


    Ext.getCmp("addGridWin").on("click", function () {

        Ext.create('Ext.window.Window', {

            title: '物料主数据',
            height: 600,
            width: 800,
            layout: 'fit',
            items: {
                html: '<iframe frameborder="0" width="100%" height="100%"  src="'
                + AppUrl
                + 'page/No410501/window.html?V_ORDERGUID=E3A2FE4E-8CB5-2E35-E040-007F01004429'
                + '" scrolling="yes"></iframe>'
            }
        }).show();

    });


    function save(data) {

        Ext.Ajax.request({
            url: AppUrl + '/No4120/ADD_PRELOADWARE',
            method: 'POST',
            async: false,
            params: {
                X_MODELNUMBER: Ext.getCmp("x_modelnumber").getValue(),
                X_MODELNAME: Ext.getCmp("x_modelname").getValue(),
                X_UNIT: Ext.getCmp("x_unit").getValue(),
                X_TYPE: Ext.getCmp("v_equtypename").getValue(),
                X_SETSITE: Ext.getCmp("x_setsite").getValue(),
                X_MEMO: Ext.getCmp("x_memo").getValue(),
                X_DRAWING: Ext.getCmp("x_drawing").getValue(),
                X_EQUTYPECODE: x_equtypecodeF,
                X_DEPTCODE: x_deptcodeF,
                X_SPAREPARTS: data,
                X_YBJCODE: Ext.getCmp('x_ybjcode').getValue()
            },
            success: function (form, action) {
                Ext.Msg.alert("消息", "保存成功");

                window.parent.location.href = AppUrl + "page/No4105/Index.html";

            }
        });

    }

});


function returnData(data, data2, data3, data4, data5) {

    //物料编码:MAT_NO  物料描述:MAT_DESC
    //单位:UNIT        计划价:PLAN_PRICE
    //规格型号:MAT_OLD_NO

    store = Ext.data.StoreManager.lookup('gridStore');

    var data = [{
        nameA: data,
        nameB: data2,
        nameC: data5,
        nameD: data4,
        nameE: 1,
        nameI: ''
    }];

    store.insert(store.count() + 1, data);


    Ext.ComponentMgr.get("grid").getView().refresh(); //刷新行号


}

