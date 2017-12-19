var ORGCODE = Ext.util.Cookies.get('v_orgCode');
var ORGNAME = Ext.util.Cookies.get('v_orgname2');
var PRESONNAME = Ext.util.Cookies.get('v_personname2');
var PERSONCODE = Ext.util.Cookies.get('v_personcode');

var APPLYID_IN = '';
var PLANTCODE_IN = '';
var USERCODE_IN = '';


Ext.onReady(function () {
    Ext.getBody().mask('<p>正在载入中...</p>');

    //工单申请Store
    var applylistStore = Ext.create("Ext.data.Store", {

        autoLoad: false,
        pageSize: 200,
        storeId: 'applylistStore',
        fields: ['APPLY_ID', 'ORDERID', 'DJ_UQ_CODE', 'DJ_NAME', 'MEND_CONTEXT', 'INSERT_USERNAME', 'PLAN_BEGINDATE', 'PLAN_ENDDATE',
            'REMARK', 'INSERT_USERID'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'ml/GET_WAITAPPLYLIST',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            },
            extraParams: {}
        }

    });

    //菜单面板
    var tablePanel = Ext.create('Ext.panel.Panel', {
        id: 'tablePanel',
        region: 'north',
        layout: 'column',
        frame: true,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'ckname',
                fieldLabel: '厂矿',
                value: ORGNAME,
                readOnly: true,
                labelWidth: 70,
                width: 220,
                style: ' margin: 5px 5px 0px 0px',
                labelAlign: 'right'

            }, {
                xtype: 'textfield',
                id: 'personname',
                fieldLabel: '录入人',
                value: PRESONNAME,
                readOnly: true,
                labelWidth: 70,
                width: 220,
                style: ' margin: 5px 5px 0px 10px',
                labelAlign: 'right'

            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'button',
                text: '查询',
                style: ' margin: 5px 5px 0px 10px',
                icon: imgpath + '/search.png',
                handler: _selectList
            }, {
                xtype: 'button',
                text: '确认并送达检修单位',
                style: ' margin: 5px 5px 0px 10px',
                handler: _submitList
            }, {
                xtype: 'displayfield',
                value: "<lable style='color:red'>(*申请提交后将由部门负责人进行确认)</lable>",
                style: ' margin: 5px 0px 5px 10px'
            }, {
                xtype: 'button',
                text: '退回到申请部门',
                style: ' margin: 5px 5px 0px 10px',
                handler: _back
            }]
        }]

    });


//显示面板
    var supplyListGridPanel = Ext.create('Ext.grid.Panel', {
        id: 'supplyListGridPanel',
        store: applylistStore,
        width: '100%',
        region: 'sourth',
        border: false,
        columnLines: true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns: [{
            text: '工单号',
            dataIndex: 'ORDERID',
            align: 'center',
            width: 120,
            renderer: atright
        }, {
            text: '电机编号',
            dataIndex: 'DJ_UQ_CODE',
            align: 'center',
            width: 120,
            renderer: atright
        }, {
            text: '电机名称',
            dataIndex: 'DJ_NAME',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '检修内容',
            dataIndex: 'MEND_CONTEXT',
            align: 'center',
            width: 180,
            renderer: atleft
        }, {
            text: '录入人',
            dataIndex: 'INSERT_USERID',
            align: 'center',
            width: 120,
            renderer: atleft
        }, {
            text: '申请时间',
            dataIndex: 'PLAN_BEGINDATE',
            align: 'center',
            width: 120,
            renderer: rendererTime
        }, {
            text: '完成时间',
            dataIndex: 'PLAN_ENDDATE',
            align: 'center',
            width: 120,
            renderer: rendererTime
        }, {
            text: '备注',
            dataIndex: 'REMARK',
            align: 'center',
            width: 120,
            renderer: atleft
        }],
        bbar: [{
            id: 'gpage',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            width: '100%',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: applylistStore
        }]
    });


//整体视图容器
    Ext.create('Ext.container.Viewport', {
        layout: {
            type: 'border',
            regionWeights: {
                west: -1,
                north: 1,
                south: 1,
                east: -1
            }
        },
        items: [{
            region: 'north',
            border: false,
            items: [tablePanel]
        }, {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [supplyListGridPanel]
        }]

    });

    _init();

})
//初始化
function _init() {

    if (true) {
        Ext.getBody().unmask();//去除页面笼罩
    }
}

//查询工单列表
function _selectList() {

    PLANTCODE_IN = ORGCODE;
    USERCODE_IN = PERSONCODE;

    var applylistStore = Ext.data.StoreManager.lookup('applylistStore');
    applylistStore.proxy.extraParams = {
        PLANTCODE_IN: PLANTCODE_IN,
        DEPARTCODE_IN: '%',
        USERCODE_IN: USERCODE_IN
    };
    applylistStore.load();
};

//提交工单列表
function _submitList() {
    var records = Ext.getCmp('supplyListGridPanel').getSelectionModel().getSelection();

    if (records != null && records != "") {
        Ext.Msg.buttonText.ok = "确定";
        Ext.Msg.buttonText.cancel = "取消";
        Ext.Msg.show({
            title: '提示',
            msg: '确定要送达检修单位吗?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.OKCANCEL,
            fn: function (button) {
                if (button == "ok") {
                    Ext.Array.each(records, function (name, index) {
                        APPLYID_IN = name.data.APPLY_ID;
                        Ext.Ajax.request({
                            url: AppUrl + 'ml/CONFIRM_APPLY',//pg_dj405.confirm_apply
                            type: 'ajax',
                            method: 'POST',
                            params: {
                                APPLYID_IN: APPLYID_IN,
                                A_USERID: PERSONCODE
                            },
                            success: function (response, options) {
                                var data = Ext.decode(response.responseText);
                                if (records.length - 1 == index) {
                                    if (data.RET_MSG =="Success") {
                                        Ext.Msg.alert('操作信息', '提交成功');
                                        _selectList();
                                    } else {
                                        Ext.Msg.alert('操作信息', '提交失败');
                                    }
                                }
                            }
                        });
                    });
                }
            }
        });

    } else {
        Ext.Msg.alert("提示", "至少选择一条记录");
    }
};

//退回申请单位
function _back() {
    var records = Ext.getCmp('supplyListGridPanel').getSelectionModel().getSelection();

    if (records != null && records != "") {
        Ext.Msg.buttonText.ok = "确定";
        Ext.Msg.buttonText.cancel = "取消";
        Ext.Msg.show({
            title: '提示',
            msg: '确定要退回到申请单位吗?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.OKCANCEL,
            fn: function (button) {
                if (button == "ok") {
                    Ext.Array.each(records, function (name, index) {
                        APPLYID_IN = name.data.APPLY_ID;
                        Ext.Ajax.request({
                            url: AppUrl + 'ml/BACK_APPLY',//pg_dj405.back_apply
                            type: 'ajax',
                            method: 'POST',
                            params: {
                                APPLYID_IN: APPLYID_IN,
                                A_USERID: PERSONCODE
                            },
                            success: function (response, options) {
                                var data = Ext.decode(response.responseText);
                                if (records.length - 1 == index) {
                                    if (data.RET_MSG == "Success") {
                                        Ext.Msg.alert('操作信息', '退回成功');
                                        _selectList();
                                    } else {
                                        Ext.Msg.alert('操作信息', '退回失败');
                                    }
                                }
                            }
                        });
                    });
                }
            }
        });

    } else {
        Ext.Msg.alert("提示", "至少选择一条记录");
    }
};

function rendererTime(value, metaData) {
    metaData.style = "text-align:left";
    // return '<div data-qtip="' + value.substring(0, 10) + '" >' + value.substring(0, 10) + '</div>';
    return '<div data-qtip="' + value.split('.0')[0] + '" >' + value.split('.0')[0] + '</div>';
};

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
};

function atright(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:right;";
    return value;
};

/*
 //导出Excel
 function _exportExcel() {
 document.location.href = AppUrl + 'ml/PRO_RUN_EQU_BJ_ALERT_ALL_EXCEL?A_EQUID=' + encodeURI(encodeURI(A_EQUID)) +
 '&A_CYCLE_ID=' + encodeURI(encodeURI(A_CYCLE_ID));
 }
 */
