Ext.onReady(function () {

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: false,
        fields: ['I_ID', 'V_ORDERGUID', 'V_ORDERID', 'V_ORDER_TYP', 'V_ORDER_TYP_TXT', 'V_FUNC_LOC',
            'V_EQUSITENAME', 'V_EQUIP_NO', 'V_EQUIP_NAME', 'V_PLANT', 'V_IWERK', 'D_START_DATE', 'D_FINISH_DATE',
            'D_FACT_START_DATE', 'D_FACT_FINISH_DATE', 'V_ACT_TYPE', 'V_PLANNER', 'V_WORK_CTR', 'V_SHORT_TXT', 'V_GSBER',
            'V_GSBER_TXT', 'V_WORK_AREA', 'V_WBS', 'V_WBS_TXT', 'V_PROJECT_NAME', 'V_PERSONNAME', 'V_ENTERED_BY', 'D_ENTER_DATE',
            'SYSTEM_STATUS', 'V_SYSNAME', 'V_ORGCODE', 'V_ORGNAME', 'V_DEPTCODE', 'V_DEPTNAME', 'V_DEPTCODEREPARIR', 'V_DEPTNAMEREPARIR',
            'V_DEFECTGUID', 'V_STATECODE', 'V_STATENAME', 'V_TOOL', 'V_TECHNOLOGY', 'V_SAFE', 'D_DATE_FK', 'D_DATE_ACP',
            'I_OTHERHOUR', 'V_OTHERREASON', 'V_REPAIRCONTENT', 'V_REPAIRSIGN', 'V_REPAIRPERSON', 'V_POSTMANSIGN', 'V_CHECKMANCONTENT',
            'V_CHECKMANSIGN', 'V_WORKSHOPCONTENT', 'V_WORKSHOPSIGN', 'V_DEPTSIGN'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'basic/PRO_PM_WORKORDER_GETBYID',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var panel = Ext.create('Ext.panel.Panel', {
        region: 'north',
        layout: 'column',
        width: '100%',
        frame: true,
        items: [{
            xtype: 'textfield',
            fieldLabel: '工单号',
            id: 'orderid',
            labelWidth: 70,
            style: ' margin: 5px 0px 0px 10px',
            labelAlign: 'right'
        },
            {xtype: 'button', text: '查询', style: ' margin: 5px 0px 0px 10px', listeners: {click: QueryGrid}}]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        region: 'center',
        columnLines: true,
        width: '100%',
        store: gridStore,
        autoScroll: true,
        height: 400,
        columns: [{xtype: 'rownumberer', text: '序号', width: 35, sortable: false},
            {text: '接口传递', width: 100, dataIndex: 'V_ORDERID', align: 'center', renderer: goSetMat},
            {text: '工单号', width: 200, dataIndex: 'V_ORDERID', align: 'center', renderer: Atleft},
            {text: '工单描述', width: 200, dataIndex: 'V_SHORT_TXT', align: 'center', renderer: Atleft},
            {text: '工单类型', width: 200, dataIndex: 'V_ORDER_TYP_TXT', align: 'center', renderer: Atleft},
            {text: '设备名称', width: 200, dataIndex: 'V_EQUIP_NAME', align: 'center', renderer: Atleft},
            {text: '委托人', width: 200, dataIndex: 'V_ENTERED_BY', align: 'center', renderer: Atleft},
            {text: '委托时间', width: 200, dataIndex: 'D_ENTER_DATE', align: 'center', renderer: Atleft},
            {text: '检修单位', width: 200, dataIndex: 'V_DEPTNAMEREPARIR', align: 'center', renderer: Atleft}],
        listeners: {
            itemdblclick: itemClick
        }
    });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [panel, grid]
    });
});

function Atleft(value, metaData) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}


function itemClick(s, record, item, index, e, eOpts) {
    window.parent.append('090901', '检修工单明细', AppUrl + 'page/PM_090901/index.html?V_GUID='
        + Ext.getStore("gridStore").getAt(index).get("V_ORDERGUID")
        + '');
}

function goSetMat(value, metaData, record, rowIdx) {
    return '<a href="javascript:setmat(\'' + value + '\',\'' + record.data.V_PERSONNAME + '\')"><img src= "' + imgpath + '/saved.png"></a>';
}

function setmat(orderid, percode) {
    Ext.Ajax.request({
        url: AppUrl + 'mm/SetMat',
        type: 'ajax',
        method: 'POST',
        async: false,
        params: {
            V_V_ORDERGUID: orderid,
            x_personcode: percode
        }, success: function (response) {
            var resp = Ext.decode(response.responseText);
            if (resp.V_CURSOR == '1') {
                alert('发送成功');
            } else {
                alert('发送失败');
            }
        }
    })
}

function QueryGrid() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            V_V_ORDERID: Ext.getCmp('orderid').getValue()
        }
    });
}