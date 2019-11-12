var win;

Ext.onReady(function() {

    var gridStore = Ext.create('Ext.data.Store', {
        id : 'gridStore',
        autoLoad : false,
        pageSize : 100,
        fields : [ 'SUPPLY_CODE', 'SUPPLY_NAME', 'SUPPLY_DESC', 'SUPPLY_RENAGE', 'SUPPLY_MANAGER', 'LINK_PERSON', 'LINK_TYPE', 'LINK_PHONECODE', 'SUPPLY_STATUS' ],
        proxy : {
            type : 'ajax',
            async : false,
            url : AppUrl + 'Zyk/PRO_RUN7124_SUPPLYLIST',
            actionMethods : {
                read : 'POST'
            },
            reader : {
                type : 'json',
                root : 'list'
            }
        }
    });

    var grid = Ext.create('Ext.grid.Panel', {
        id : 'grid',
        region : 'center',
        columnLines : true,
        width : '100%',
        selType : 'checkboxmodel',
        columns : [ {
            xtype : 'rownumberer',
            text : '序号',
            width : 35,
            align : 'center'
        }, {
            text : '供应商编码',
            dataIndex : 'SUPPLY_CODE',
            align : 'center',
            flex : 1,
            renderer : left
        }, {
            text : '供应商名称',
            dataIndex : 'SUPPLY_NAME',
            align : 'center',
            width : 180,
            renderer : left
        }, {
            text : '简介',
            dataIndex : 'SUPPLY_DESC',
            align : 'center',
            width : 230,
            renderer : left
        }, {
            text : '主营业务',
            dataIndex : 'SUPPLY_RENAGE',
            align : 'center',
            flex : 1,
            renderer : left
        }, {
            text : '企业法人',
            dataIndex : 'SUPPLY_MANAGER',
            align : 'center',
            width : 80,
            renderer : left
        }, {
            text : '联系人',
            dataIndex : 'LINK_PERSON',
            align : 'center',
            width : 80,
            renderer : left
        }, {
            text : '联系方式',
            dataIndex : 'LINK_TYPE',
            align : 'center',
            flex : 1,
            renderer : left
        }, {
            text : '联系电话',
            dataIndex : 'LINK_PHONECODE',
            align : 'center',
            flex : 1,
            renderer : left
        }, {
            text : '状态',
            dataIndex : 'SUPPLY_STATUS',
            align : 'center',
            width : 70,
            style : 'text-align: left;',
            renderer: changeStatusRender
        }, {
            text : '供应物料明细',
            width : 90,
            align : 'center',
            xtype : 'templatecolumn',
            tpl : '<a style="cursor:pointer;text-decoration:underline; color:#00F">查看</a>',
            id : 'show'
        }

        ],
        store : gridStore,
        autoScroll : true,
        bbar : [ '->', {
            xtype : 'pagingtoolbar',
            id : 'pagingtoolbar',
            dock : 'bottom',
            displayInfo : true,
            displayMsg : '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg : '没有记录',
            store : 'gridStore'
        } ]
    });
    var queryPanel = Ext.create('Ext.panel.Panel', {
        id : 'queryPanel',
        width : '100%',
        region : 'north',
        defaults : {
            labelAlign : 'right',
            style : 'margin:3px 0px 2px 10px'
        },
        bodyPadding : 3,
        frame : true,
        layout : 'column',
        items : [ {
            id : 'supplierCode',
            xtype : 'textfield',
            fieldLabel : '供应商编码',
            labelWidth : 70,
            style : 'margin:3px 0px 2px 5px'
        }, {
            id : 'supplierName',
            xtype : 'textfield',
            fieldLabel : '供应商名',
            labelWidth : 60,
            style : 'margin:3px 0px 2px 5px'
        }, {
            id : 'status',
            width : 130,
            xtype : 'combo',
            fieldLabel : '状态',
            labelWidth : 30,
            store : [ [ '1', '使用' ], [ '0', '停用' ] ],
            editable : false,
            queryMode : 'local',
            displayField : 'V_DEPTNAME',
            valueField : 'V_DEPTCODE'
        }, {
            id : 'sel',
            xtype : 'button',
            text : '查 询',
            icon : imgpath + '/search.png',
            handler : function() {
                query();
            }
        }, {
            id : 'add',
            xtype : 'button',
            text : '新 增',
            icon : imgpath + '/add.png',
            handler : function() {

                Ext.getCmp('updateid').setValue('');

                Ext.getCmp('ADD_V_SUPPLY_CODE').setVisible(true);
                Ext.getCmp('ADD_V_SUPPLY_CODE_display').setVisible(false);

                Ext.getCmp('ADD_V_SUPPLY_CODE').setValue("");
                Ext.getCmp('ADD_V_SUPPLY_NAME').setValue("");
                Ext.getCmp('ADD_V_SUPPLY_DESC').setValue("");
                Ext.getCmp('ADD_V_SUPPLY_RENAGE').setValue("");
                Ext.getCmp('ADD_V_SUPPLY_MANAGER').setValue("");
                Ext.getCmp('ADD_V_LINK_PERSON').setValue("");
                Ext.getCmp('ADD_V_LINK_TYPE').setValue("");
                Ext.getCmp('ADD_V_LINK_PHONECODE').setValue("");
                Ext.getCmp('addWindow').show();
            }
        }, {
            id : 'update',
            xtype : 'button',
            text : '修 改',
            icon : imgpath + '/edit.png'

        }, {
            id : 'equcode',
            xtype : 'hidden'
        }, {
            id : 'updateid',
            xtype : 'hidden'
        } ]
    });

    var addWindow = Ext.create('Ext.window.Window', {
        id : 'addWindow',
        title : '新增供应商',
        height : 290,
        bodyPadding : 5,
        closeAction : 'hide',
        width : 280,
        modal : true,
        frame : true,
        defaults : {
            labelWidth : 90,
            labelAlign : 'right'
        },
        items : [ {
            id : 'ADD_V_SUPPLY_CODE',
            xtype : 'textfield',
            fieldLabel : '供应商编码'
        }, {
            id : 'ADD_V_SUPPLY_CODE_display',
            xtype : 'displayfield',
            fieldLabel : '供应商编码'
        }, {
            id : 'ADD_V_SUPPLY_NAME',
            xtype : 'textfield',
            fieldLabel : '供应商名称'
        }, {
            id : 'ADD_V_SUPPLY_DESC',
            xtype : 'textfield',
            fieldLabel : '简介'
        }, {
            id : 'ADD_V_SUPPLY_RENAGE',
            xtype : 'textfield',
            fieldLabel : '主营业务'
        }, {
            id : 'ADD_V_SUPPLY_MANAGER',
            xtype : 'textfield',
            fieldLabel : '企业法人'
        }, {
            id : 'ADD_V_LINK_PERSON',
            xtype : 'textfield',
            fieldLabel : '联系人'
        }, {
            id : 'ADD_V_LINK_TYPE',
            xtype : 'textfield',
            fieldLabel : '联系方式'
        }, {
            id : 'ADD_V_LINK_PHONECODE',
            xtype : 'textfield',
            fieldLabel : '联系电话'
        }],

        buttons : [ {
            text : '保存',
            handler : insert,
            icon : imgpath + '/saved.png'
        }, {
            text : '取消',
            icon : imgpath + '/cross.png',
            handler : function() {
                Ext.ComponentManager.get('addWindow').hide();

            }
        } ]
    });

    var updateWindow = Ext.create('Ext.window.Window', {
        id : 'updateWindow',
        title : '修改供应商',
        height : 290,
        bodyPadding : 5,
        closeAction : 'hide',
        width : 280,
        modal : true,
        frame : true,
        defaults : {
            labelWidth : 90,
            labelAlign : 'right'
        },
        items : [ {
            id : 'UPDATE_V_SUPPLY_CODE',
            xtype : 'textfield',
            fieldLabel : '供应商编码'
        }, {
            id : 'UPDATE_V_SUPPLY_CODE_display',
            xtype : 'displayfield',
            fieldLabel : '供应商编码'
        }, {
            id : 'UPDATE_V_SUPPLY_NAME',
            xtype : 'textfield',
            fieldLabel : '供应商名称'
        }, {
            id : 'UPDATE_V_SUPPLY_DESC',
            xtype : 'textfield',
            fieldLabel : '简介'
        }, {
            id : 'UPDATE_V_SUPPLY_RENAGE',
            xtype : 'textfield',
            fieldLabel : '主营业务'
        }, {
            id : 'UPDATE_V_SUPPLY_MANAGER',
            xtype : 'textfield',
            fieldLabel : '企业法人'
        }, {
            id : 'UPDATE_V_LINK_PERSON',
            xtype : 'textfield',
            fieldLabel : '联系人'
        }, {
            id : 'UPDATE_V_LINK_TYPE',
            xtype : 'textfield',
            fieldLabel : '联系方式'
        }, {
            id : 'UPDATE_V_LINK_PHONECODE',
            xtype : 'textfield',
            fieldLabel : '联系电话'
        }],

        buttons : [ {
            text : '保存',
            handler : update,
            icon : imgpath + '/saved.png'
        }, {
            text : '取消',
            icon : imgpath + '/cross.png',
            handler : function() {
                Ext.ComponentManager.get('updateWindow').hide();

            }
        } ]
    });

    Ext.create('Ext.container.Viewport', {
        layout : 'border',
        items : [ queryPanel, grid ]
    });

    Ext.getCmp('status').select(Ext.getCmp('status').getStore().getAt(0));

    query();

    Ext.getCmp('show').on('click', function(a, b, c, d, e) {

        //window.SUPPLY_CODE = gridStore.getAt(c).get("SUPPLY_CODE");
        //window.SUPPLY_NAME = gridStore.getAt(c).get("SUPPLY_NAME");

        win = Ext.create('Ext.window.Window', {
            title : '查看备件包含物料数据',
            modal : true,
            autoShow : true,
            maximized : false,
            maximizable : true,
            width : 1000,
            height : document.documentElement.clientHeight * 0.8,
            html : '<iframe src=' + AppUrl + 'page/No712401/Index.html?SUPPLY_CODE=' + gridStore.getAt(c).get("SUPPLY_CODE") + '&SUPPLY_NAME=' + gridStore.getAt(c).get("SUPPLY_NAME") + ' style="width: 100%; height: 100%;" frameborder="0"/ >'
        });

    });

    Ext.getCmp('update').on('click', function(a, b, c, d, e, f) {

        var selectedRecord = Ext.getCmp("grid").getSelectionModel().getSelection();
        if (selectedRecord != null && selectedRecord != "") {

            if (selectedRecord.length > 1) {

                Ext.Msg.alert("提示", "只能选择一条");
            } else {
                Ext.getCmp('UPDATE_V_SUPPLY_CODE').setVisible(false);
                Ext.getCmp('UPDATE_V_SUPPLY_CODE_display').setVisible(true);

                Ext.getCmp('updateid').setValue(selectedRecord[0].data.SUPPLY_CODE);
                Ext.getCmp('UPDATE_V_SUPPLY_CODE_display').setValue(selectedRecord[0].data.SUPPLY_CODE);

                Ext.getCmp('UPDATE_V_SUPPLY_CODE').setValue(selectedRecord[0].data.SUPPLY_CODE);
                Ext.getCmp('UPDATE_V_SUPPLY_NAME').setValue(selectedRecord[0].data.SUPPLY_NAME);
                Ext.getCmp('UPDATE_V_SUPPLY_DESC').setValue(selectedRecord[0].data.SUPPLY_DESC);
                Ext.getCmp('UPDATE_V_SUPPLY_RENAGE').setValue(selectedRecord[0].data.SUPPLY_RENAGE);
                Ext.getCmp('UPDATE_V_SUPPLY_MANAGER').setValue(selectedRecord[0].data.SUPPLY_MANAGER);
                Ext.getCmp('UPDATE_V_LINK_PERSON').setValue(selectedRecord[0].data.LINK_PERSON);
                Ext.getCmp('UPDATE_V_LINK_TYPE').setValue(selectedRecord[0].data.LINK_TYPE);
                Ext.getCmp('UPDATE_V_LINK_PHONECODE').setValue(selectedRecord[0].data.LINK_PHONECODE);

                Ext.getCmp('updateWindow').show();
            }
        } else {
            Ext.example.msg('操作信息', '{0}', '请选择一行数据');
        }

    });

})

function insert(){
    if (Ext.ComponentManager.get('ADD_V_SUPPLY_CODE').getValue() != null && Ext.ComponentManager.get('ADD_V_SUPPLY_CODE').getValue() != "" && Ext.ComponentManager.get('ADD_V_SUPPLY_NAME').getValue() != null && Ext.ComponentManager.get('ADD_V_SUPPLY_NAME').getValue() != "") {

        Ext.Ajax.request({
            url: AppUrl + 'Zyk/PRO_RUN7124_ADDSUPPLY',
            method : 'POST',
            params : {
                V_SUPPLY_CODE: Ext.ComponentManager.get('ADD_V_SUPPLY_CODE').getValue(),// 供应商编码
                V_SUPPLY_NAME: Ext.ComponentManager.get('ADD_V_SUPPLY_NAME').getValue(),// 供应商名称
                V_SUPPLY_DESC: Ext.ComponentManager.get('ADD_V_SUPPLY_DESC').getValue(),// 简介
                V_SUPPLY_RENAGE: Ext.ComponentManager.get('ADD_V_SUPPLY_RENAGE').getValue(),// 主营业务
                V_SUPPLY_MANAGER: Ext.ComponentManager.get('ADD_V_SUPPLY_MANAGER').getValue(),// 企业法人
                V_LINK_PERSON: Ext.ComponentManager.get('ADD_V_LINK_PERSON').getValue(),// 联系人
                V_LINK_TYPE: Ext.ComponentManager.get('ADD_V_LINK_TYPE').getValue(),// 联系方式
                V_LINK_PHONECODE: Ext.ComponentManager.get('ADD_V_LINK_PHONECODE').getValue(),// 联系电话
                V_SUPPLY_STATUS: Ext.ComponentManager.get('status').getValue() //状态
            },
            success : function(response) {
                var resp = Ext.JSON.decode(response.responseText);

                if (resp.OUT_RESULT == null) {
                    Ext.example.msg('操作信息', '{0}', '添加成功');
                    Ext.ComponentManager.get('addWindow').hide();
                    query();
                } else {
                    Ext.example.msg('操作信息', '{0}', '添加失败 - 已存在相应 - 供应商编码');
                }
            }

        });
    } else {
        Ext.example.msg('操作信息', '{0}', '《供应商编码》与《供应商名称》 - 不能为空');
    }
}

function update(){
    Ext.Ajax.request({
        url: AppUrl + 'Zyk/PRO_RUN7124_UPDATESUPPLY',
        method : 'POST',
        params : {
            V_SUPPLY_CODE: Ext.ComponentManager.get('UPDATE_V_SUPPLY_CODE').getValue(),// 供应商编码
            V_SUPPLY_NAME: Ext.ComponentManager.get('UPDATE_V_SUPPLY_NAME').getValue(),// 供应商名称
            V_SUPPLY_DESC: Ext.ComponentManager.get('UPDATE_V_SUPPLY_DESC').getValue(),// 简介
            V_SUPPLY_RENAGE: Ext.ComponentManager.get('UPDATE_V_SUPPLY_RENAGE').getValue(),// 主营业务
            V_SUPPLY_MANAGER: Ext.ComponentManager.get('UPDATE_V_SUPPLY_MANAGER').getValue(),// 企业法人
            V_LINK_PERSON: Ext.ComponentManager.get('UPDATE_V_LINK_PERSON').getValue(),// 联系人
            V_LINK_TYPE: Ext.ComponentManager.get('UPDATE_V_LINK_TYPE').getValue(),// 联系方式
            V_LINK_PHONECODE: Ext.ComponentManager.get('UPDATE_V_LINK_PHONECODE').getValue(),// 联系电话
            V_SUPPLY_STATUS: Ext.ComponentManager.get('status').getValue() //状态
        },
        success : function(response) {
            var resp = Ext.JSON.decode(response.responseText);

            if (resp.OUT_RESULT == null) {
                Ext.example.msg('操作信息', '{0}', '修改成功');
                Ext.ComponentManager.get('updateWindow').hide();
                query();
            } else {
                Ext.example.msg('操作信息', '{0}', '添加失败 - 已存在相应 - 供应商编码');
            }
        }

    });
}

function query() {

    Ext.data.StoreManager.get('gridStore').load({
        params : {
            V_SUPPLY_CODE: Ext.ComponentManager.get('supplierCode').getValue(),
            V_SUPPLY_NAME: Ext.ComponentManager.get('supplierName').getValue(),
            V_SUPPLY_STATUS: Ext.ComponentManager.get('status').getValue()
        }
    });

}

function left(value, metaData) {
    metaData.style = "text-align:left";
    return value;
}

function changeStatusRender(value, metaData, record, rowIndex, colIndex, store) {
    return '<a href="javascript:changeStatus(\'' + record.data.SUPPLY_CODE + '\',\''
        + record.data.SUPPLY_STATUS + '\')">' + (value == '0' ? "停用" : "使用")
        + '</a>';
}

function changeStatus(code, status) {
    var url = '';
    if (status == '1') {
        url = AppUrl + 'Zyk/PRO_RUN7124_STOPST';
    } else if (status == '0') {
        url = AppUrl + 'Zyk/PRO_RUN7124_STARTST';
    }

    Ext.Ajax.request({
        url: url,
        async: false,
        method: 'POST',
        params: {
            SUPPLY_CODE: code
        },
        success: function (resp) {
            resp = Ext.decode(resp.responseText);
            if (resp.OUT_RESULT == 'success') {
                query();
            }
        }
    });
}

function OnButtonExportClicked() {
    var tableName = [ "位置描述", "录入（修改）人", "检修负责单位", "检修负责人", "负责人ID", "可使用备件编号", "可使用备件描述", "备注" ];
    var tableKey = [ 'SITE_DESC', 'UPDATEPERSON', 'MEND_DEPART', 'MEND_PERSON', 'MEND_PERSONID', 'BJ_ID', 'BJ_DESC', 'REMARK' ]; //

    var parName = [ 'A_EQU_ID' ];
    var parType = [ 's' ];
    var parVal = [ excelProtect(Ext.ComponentManager.get('equcode').getValue()) ];
    var proName = 'PRO_RUN_SITE_ALL';
    var ExcelName = '设备备件位置表';

    var cursorName = 'RET';

    location.href = "ModelExcelTool?" +

        "tableName=" + tableName.join(",") + "&tableKey=" + tableKey.join(",") + "&parName=" + parName.join(",") + "&parType=" + parType.join(",") + "&parVal=" + parVal.join(",") + "&proName=" + proName + "&ExcelName=" + ExcelName;

}
