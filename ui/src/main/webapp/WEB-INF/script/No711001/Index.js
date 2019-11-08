var BJ_ID = '';
var SITE_DESC = '';
var BJ_UNIQUE_CODE = '';
var A_EQUID = '';
var A_PLANTCODE = '';
var A_DEPARTCODE = '';
var SITE_ID = '';
if (location.href.split('?')[1] != null) {
    BJ_ID = Ext.urlDecode(location.href.split('?')[1]).BJ_ID;
    SITE_DESC = Ext.urlDecode(location.href.split('?')[1]).SITE_DESC;
    BJ_UNIQUE_CODE = Ext.urlDecode(location.href.split('?')[1]).BJ_UNIQUE_CODE;
    A_EQUID = Ext.urlDecode(location.href.split('?')[1]).A_EQUID;
    A_PLANTCODE = Ext.urlDecode(location.href.split('?')[1]).A_PLANTCODE;
    A_DEPARTCODE = Ext.urlDecode(location.href.split('?')[1]).A_DEPARTCODE;
    SITE_ID = Ext.urlDecode(location.href.split('?')[1]).SITE_ID;
}
var win;
var returnValue;
Ext.onReady(function () {

    var supplyStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'supplyStore',
        fields: ['SUPPLY_CODE', 'SUPPLY_NAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'LL/PRO_RUN7110_SITESUPPLYLIST',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                A_ID: SITE_ID,
                A_MATERIALCODE: '',
                A_ORDERID: ''
            }
        }
    });

    var panel = Ext.create('Ext.panel.Panel', {
        id: 'panel',
        layout: 'column',
        frame: true,
        width: '100%',
        region: 'north',
        items: [{
            xtype: 'textfield',
            id: 'bjwybs',
            fieldLabel: '备件唯一标识',
            labelAlign: 'right',
            labelWidth: 76,
            style: 'margin:5px 0px 0px 10px'
            // readOnly : true
        }, {
            xtype: 'textfield',
            id: 'gd',
            fieldLabel: '工单',
            labelAlign: 'right',
            labelWidth: 40,
            style: 'margin:5px 0px 0px 0px'
        }, {
            xtype: 'datefield',
            id: 'ghrq',
            fieldLabel: '更换日期',
            labelAlign: 'right',
            labelWidth: 55,
            editable: false,
            format: 'Y/m/d',
            value: new Date(),
            style: 'margin:5px 0px 0px 10px'
        }, {
            style: 'margin:5px 0px 0px 10px',
            id: 'supply',
            xtype: 'combo',
            fieldLabel: '供应商',
            labelWidth: 45,
            store: supplyStore,
            editable: false,
            queryMode: 'local',
            displayField: 'SUPPLY_NAME',
            valueField: 'SUPPLY_CODE'
        }, {
            xtype: 'textfield',
            id: 'bz',
            fieldLabel: '备注',
            labelAlign: 'right',
            labelWidth: 40,
            width: 330,
            style: 'margin:5px 0px 0px 0px'
        }, {
            xtype: 'button',
            text: '关 闭',
            icon: imgpath + '/application_go.png',
            width: 65,
            style: 'margin:5px 0px 0px 10px',
            handler: function () {
                _close();
            }
        }]
    });

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: true,
        fields: ['BJ_ID', 'MATERIALCODE', 'MATERIALNAME', 'MATERIALETALON', 'UNIT', 'F_PRICE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'LL/PRO_RUN_BJ_MAT_ALL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                A_BJ_ID: BJ_ID
            }
        }
    });

    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        columnLines: true,
        region: 'center',
        width: '100%',
        store: gridStore,
        autoScroll: true,
        columns: [{
            xtype: 'rownumberer',
            text: '序号',
            width: 35,
            sortable: false,
            align: 'center'
        }, {
            text: '更换选中备件',
            width: 100,
            align: 'center',
            renderer: function () {
                return "<img src='../../images/gif/application_go.png' style='cursor:pointer' onclick='OnButtonGHXZBJClicked()' />";
            }
        }, {
            text: '备件标识',
            dataIndex: 'BJ_ID',
            width: 200,
            align: 'center'
        }, {
            text: '物资编码',
            dataIndex: 'MATERIALCODE',
            width: 300,
            align: 'center'
        }, {
            text: '物资名称',
            dataIndex: 'MATERIALNAME',
            width: 300,
            align: 'center'
        }, {
            text: '规格型号',
            dataIndex: 'MATERIALETALON',
            width: 100,
            align: 'center'
        }, {
            text: '计量单位',
            dataIndex: 'UNIT',
            width: 100,
            align: 'center'
        }, {
            text: '计划单价',
            dataIndex: 'F_PRICE',
            width: 100,
            align: 'center'
        }]
    });

    Ext.create('Ext.container.Viewport', {
        split: true,
        layout: 'border',
        items: [panel, grid]
    });

    supplyStore.on('load', function () {

        Ext.getCmp('supply').select(supplyStore.getAt(0));
    })

});

function OnButtonGHXZBJClicked() {
    var selectModel = Ext.getCmp("grid").getSelectionModel();
    var MATERIALCODE = selectModel.getSelection()[0].data.MATERIALCODE;

    Ext.Ajax.request({
        url: AppUrl + 'LL/PRO_RUN_BJ_CHANGE',
        method: 'POST',
        params: {
            A_BJ_UNIQUE_CODE: Ext.getCmp('bjwybs').getValue() == '' ? newGuid() : Ext.getCmp('bjwybs').getValue(),
            A_BJ_ID: BJ_ID,
            A_MATERIALCODE: MATERIALCODE,
            A_SITE_ID: SITE_ID,
            A_EQUID: A_EQUID,
            A_PERSON: Ext.util.Cookies.get('v_personcode'),
            A_ORDERID: Ext.getCmp('gd').getValue(),
            A_REMARK: Ext.getCmp('bz').getValue(),
            A_CHANGEDATE: Ext.util.Format.date(Ext.getCmp('ghrq').getValue(), 'Y-m-d'),
            A_PLANTCODE: A_PLANTCODE,
            A_DEPARTCODE: A_DEPARTCODE,
            A_SUPPLY_CODE: Ext.getCmp('supply').getValue(),
            A_SUPPLY_NAME: Ext.getCmp('supply').getRawValue()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if (resp.RET == "Success") {
                Ext.example.msg('操作信息', '更换成功');
                parent.returnValue = 'yes';
                _close();
                Ext.data.StoreManager.lookup('gridStore').load({
                    params: {
                        A_BJ_ID: BJ_ID
                    }
                });
            } else {
                Ext.example.msg('操作信息', '更换失败');
            }
        }
    });
}

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


function _close() {
    parent.win.close();
}