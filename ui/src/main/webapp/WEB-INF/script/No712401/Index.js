var SUPPLY_CODE = null;
var SUPPLY_NAME = null;
if (location.href.split('?')[1] != undefined) {
    SUPPLY_CODE = Ext.urlDecode(location.href.split('?')[1]).SUPPLY_CODE;
    SUPPLY_NAME = Ext.urlDecode(location.href.split('?')[1]).SUPPLY_NAME;
}

Ext.onReady(function() {

    var gridStore = Ext.create('Ext.data.Store', {
        id : 'gridStore',
        autoLoad : false,
        pageSize : 100,
        fields : [ 'MATERIALCODE', 'MATERIALNAME', 'UNIT', 'MATERIALETALON', 'F_PRICE' ],
        proxy : {
            type : 'ajax',
            async : false,
            url : AppUrl + 'Zyk/PRO_RUN7124_SUPPLYMATLIST',
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
        columns : [ {
            text : '物料号',
            dataIndex : 'MATERIALCODE',
            align : 'center',
            width : 110,
            renderer : left
        }, {
            text : '物料描述',
            dataIndex : 'MATERIALNAME',
            align : 'center',
            flex : 1,
            renderer : left
        }, {
            text : '计量单位',
            dataIndex : 'UNIT',
            align : 'center',
            width : 110,
            renderer : left
        }, {
            text : '规格型号',
            dataIndex : 'MATERIALETALON',
            align : 'center',
            width : 110,
            renderer : left
        }, {
            text : '计划单价',
            dataIndex : 'F_PRICE',
            align : 'center',
            width : 110,
            renderer : right
        }, {
            text : '删除',
            align : 'center',
            xtype : 'templatecolumn',
            width : 80,
            tpl : '<a style="cursor:pointer;text-decoration:underline; color:#00F">删除</a>',
            id : 'delete'
        }

        ],
        store : gridStore,
        autoScroll : true
    });
    var queryPanel = Ext.create('Ext.panel.Panel', {
        id : 'queryPanel',
        width : '100%',
        region : 'north',
        defaults : {
            labelAlign : 'right',
            style : 'margin:3px 0px 2px 5px'
        },
        bodyPadding : 3,
        frame : true,
        layout : 'column',
        items : [ {
            id : 'supplierCode',
            xtype : 'displayfield',
            fieldLabel : '供应商编码',
            labelWidth : 70,
            style : 'margin:3px 20px 2px 5px'
        }, {
            id : 'supplierName',
            xtype : 'displayfield',
            fieldLabel : '供应商名',
            labelWidth : 60,
            style : 'margin:3px 20px 2px 5px'
        }, {
            id : 'add',
            xtype : 'button',
            text : '添加物料',
            icon : imgpath + '/add.png',
            handler : function() {
                Ext.getCmp('dialog').show();
            }
        }, {
            id : 'equcode',
            xtype : 'hidden'
        }, {
            id : 'updateid',
            xtype : 'hidden'
        } ]
    });

    var windows = Ext.create('Ext.window.Window', {
        id : 'dialog',
        title : '添加物料',
        height : 140,
        bodyPadding : 5,
        closeAction : 'hide',
        width : 280,
        modal : true,
        frame : true,
        defaults : {
            labelWidth : 60,
            labelAlign : 'right'
        },
        items : [ {
            style : 'margin:10px 0 0 0',
            id : 'V_MATERIALCODE',
            xtype : 'textfield',
            fieldLabel : '物料号'
        } ],

        buttons : [ {
            text : '保 存',
            handler : btnbc,
            icon : imgpath + '/saved.png'
        }, {
            text : '取 消',
            icon : imgpath + '/cross.png',
            handler : function() {
                Ext.ComponentManager.get('dialog').hide();
            }
        } ]
    });
    Ext.create('Ext.container.Viewport', {
        layout : 'border',
        items : [ queryPanel, grid ]
    });

    Ext.getCmp('supplierCode').setValue(SUPPLY_CODE);
    Ext.getCmp('supplierName').setValue(SUPPLY_NAME);

    query();

    Ext.getCmp('delete').on('click', function(a, b, c, d) {

        del(Ext.getCmp("supplierCode").getValue(), gridStore.getAt(c).get("MATERIALCODE"));
    });

    function del(V_SUPPLY_CODE, V_MATERIALCODE) {

        Ext.Ajax.request({
            url: AppUrl + 'Zyk/PRO_RUN7124_DELSUPPLYMAT',
            async: false,
            method: 'POST',
            params: {
                V_SUPPLY_CODE: V_SUPPLY_CODE,// 供应商编码
                V_MATERIALCODE: V_MATERIALCODE //物料号
            },
            success : function(response) {
                var resp = Ext.JSON.decode(response.responseText);

                if (resp.OUT_RESULT == "success") {
                    Ext.example.msg('操作信息', '{0}', '删除成功');
                    query();
                }
            }

        });

    }
})

function btnbc() {

    if (Ext.ComponentManager.get('V_MATERIALCODE').getValue() != null && Ext.ComponentManager.get('V_MATERIALCODE').getValue() != "" && Ext.ComponentManager.get('supplierCode').getValue() != null && Ext.ComponentManager.get('supplierCode').getValue() != "") {

        Ext.Ajax.request({
            url: AppUrl + 'Zyk/PRO_RUN7124_ADDSUPPLYMAT_NEW',
            method : 'POST',
            params : {
                V_SUPPLY_CODE: Ext.ComponentManager.get('supplierCode').getValue(),
                V_MATERIALCODE: Ext.ComponentManager.get('V_MATERIALCODE').getValue()
            },
            success : function(response) {
                var resp = Ext.JSON.decode(response.responseText);

                if(resp.RET =="没有相应的物料号"){
                    Ext.example.msg('操作信息','{0}','没有相应的物料号');
                }else if(resp.RET =="相应的物料号已存在"){
                    Ext.example.msg('操作信息','{0}','相应的物料号已存在');
                }else if(resp.RET =="Success"){
                    Ext.example.msg('操作信息','{0}','添加成功');
                    Ext.ComponentManager.get('dialog').hide();
                    query();
                }else {
                    Ext.example.msg('操作信息','{0}','发生未知异常');
                }

            }

        });
    } else {
        Ext.Msg.alert("提示", "《供应商编码》与《物料号》 - 不能为空");
    }
}

function query() {

    Ext.data.StoreManager.get('gridStore').load({
        params : {
            V_SUPPLY_CODE: Ext.ComponentManager.get('supplierCode').getValue()
        }
    });

}

function left(value, metaData) {
    metaData.style = "text-align:left";
    return value;
}

function right(value, metaData) {
    metaData.style = "text-align:right";
    return value;
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
