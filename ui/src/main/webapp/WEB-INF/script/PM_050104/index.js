/// <reference path="../Shared/ext-all-debug-w-comments.js" />
var I_ID = -1;
var V_ORDERGUID = null;
var flag = '';
var V_EQUCODE;
var KC_COUNT=0;
var setMatSign=0;
if (location.href.split('?')[1] != undefined) {
    V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
}

if (location.href.split('?')[1] != undefined) {
    flag = Ext.urlDecode(location.href.split('?')[1]).flag;
}
if (location.href.split('?')[1] != undefined) {
    V_EQUCODE = Ext.urlDecode(location.href.split('?')[1]).V_EQUCODE;
    STEP=Ext.urlDecode(location.href.split('?')[1]).STEP;
}
var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: true,
        fields: ['V_ACTIVITY', 'V_MATERIALCODE', 'V_MATERIALNAME',
            'V_UNIT', 'I_PLANAMOUNT', 'F_PLANMONEY', 'V_MEMO', 'I_ID',
            'F_UNITPRICE', 'V_SPEC', 'V_SUBTYPE', 'I_ACTUALAMOUNT',
            'V_TYPE', 'F_ACTUALMONEY'],
        proxy: {
            type: 'ajax',
            url: AppUrl + 'dxfile/PRO_PM_WORKORDER_SPARE_V_N',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                V_V_ORDERGUID: V_ORDERGUID,
                V_V_V_ACTIVITY:STEP
            }
        }
    });

var gridStore2 = Ext.create('Ext.data.Store', {
    id: 'gridStore2',
    autoLoad: true,
    fields: ['V_MATERIALCODE', 'V_MATERIALNAME', 'I_PLANAMOUNT',
        'I_ACTUALAMOUNT', 'I_WORKNUM'],
    proxy: {
        type: 'ajax',
        url: AppUrl + 'zdh/PRO_WORKORDER_SPARE_ZY',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            V_V_ORDERGUID: V_ORDERGUID
        }
    }
});
var gridPart1Panel= Ext.create('Ext.panel.Panel', {
//var gridPart1Panel = Ext.create('Ext.grid.Panel', {
    flex: 1,
    layout:'vbox',
    items:[ {
        xtype: 'panel',
        //height: 40,
        layout: 'column',
        width:'100%',
        frame:true,
        items: [{
            xtype: 'button',
            text: '删除',
            style: 'margin:5px 20px  5px 20px',
            icon: imgpath + '/delete.png',
            width: 80,
            listeners: {
                click: OnClickDeleteButton
            }
        }, {
            xtype: 'button',
            text: '添加完成',
            id: 'btnOK',
            icon: imgpath + '/saved.png',
            width: 100,
            style: 'margin:5px 20px 5px 20px',
            listeners: {
                click: OnClickAddFinishButton
            }
        }]
    },{
        xtype: 'grid',
        id: 'grid',
        flex: 1,
        // height : window.screen.height/2-50,
        height: 300,
        width:'100%',
        store: 'gridStore',
        columnLines: true,
        selType: 'checkboxmodel',
        multiSelect: true,
        autoScroll: true,
        //width: window.screen.width / 2 - 50,
        plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1,
            listeners: {
                validateedit:OnCompareElem,
                edit: OnChangePlanAmount
            }
        })],
        columns: [
            {
                text: '序号',
                xtype: 'rownumberer',
                align: 'center',
                width: 40
            },
            {
                text: '工序',
                width: 50,
                align: 'center',
                dataIndex: 'V_ACTIVITY',
                renderer: AddFloat
            },
            {
                text: '物料编码',
                flex: 2,
                align: 'center',
                dataIndex: 'V_MATERIALCODE',
                renderer: AddFloat
            },
            {
                text: '物料描述',
                flex: 4,
                align: 'center',
                dataIndex: 'V_MATERIALNAME',
                renderer: AddFloat
            },
            {
                text: '单位',
                width: 40,
                align: 'center',
                dataIndex: 'V_UNIT',
                renderer: AddFloat
            },
            {
                text: '计划数量',
                width: 60,
                align: 'center',
                dataIndex: 'I_PLANAMOUNT',
                field: {
                    id: 'jhsl',
                    xtype: 'numberfield',
                    minValue: 0.0001,
                    allowDecimals: true,
                    decimalPrecision: 8
                },
                renderer: IsEdit
            },
            {
                text: '计划总金额',
                width: 80,
                align: 'center',
                dataIndex: 'F_PLANMONEY',
                renderer: function (value, metaData, record, rowIdx, colIdx,
                                    store, view) {
                    return '<div style="text-align:right;">'
                        + Ext.util.Format.usMoney(record
                                .get('I_PLANAMOUNT')
                            * record.get('F_UNITPRICE')) + '</div>';
                }
            }, {
                text: '备注',
                width: 160,
                align: 'center',
                dataIndex: 'V_MEMO',
                field: {
                    id: 'mem',
                    xtype: 'textfield'
                },
                renderer: AddFloat
            }],
        features: [{
            ftype: 'summary'
        }]
    }
    ]
});

var framePanel = Ext.create('Ext.panel.Panel', {

    id: 'framePanel',
    width: '100%',
    layout: 'fit',
    flex: 5,
    html: '<iframe frameborder="0" width="100%" height="100%"  src="' + AppUrl
        + 'page/PM_05010203/index.html?V_ORDERGUID=' + V_ORDERGUID +'&V_EQUCODE='+V_EQUCODE+'&STEP='+STEP
        + '"></iframe>'

});

var gridPart2Panel = Ext.create('Ext.grid.Panel', {
    flex: 1,
    title: '物料预留信息',
    id: 'grid2',
    height: 300,
    // height : window.screen.height/2-50,
    store: 'gridStore2',
    autoScroll: true,
    width: window.screen.width / 2 - 50,
    xtype: 'gridPanel',
    columns: [{
        text: '物料编码',
        flex: 2,
        align: 'center',
        dataIndex: 'V_MATERIALCODE',
        renderer: AddFloat
    }, {
        text: '物料名称',
        flex: 4,
        align: 'center',
        dataIndex: 'V_MATERIALNAME',
        renderer: AddFloat
    }, {
        text: '已计划',
        align: 'center',
        width: 60,
        dataIndex: 'I_PLANAMOUNT',
        renderer: AddRight
    }, {
        text: '已领用',
        align: 'center',
        width: 60,
        dataIndex: 'I_ACTUALAMOUNT',
        renderer: AddRight
    }, {
        text: '相关工单',
        align: 'center',
        width: 70,
        dataIndex: 'I_WORKNUM',
        renderer: function (value) {
            return '<a href="javascript:WatchOrder();">' + value + '</a>';
        }
    }]
});

var gridPanel = Ext.create('Ext.panel.Panel', {
    region: 'north',
    layout: 'hbox',
    width: '100%',
    items: [gridPart1Panel, gridPart2Panel]
});

var windowPanel = Ext.create('Ext.window.Window', {
    id: 'windowPanel',
    closeAction: 'hide',
    modal: true,
    width: '100%',
    height: 510,
    html: '<iframe frameborder="0" width="100%" height="100%"  src="' + AppUrl
        + '/PM_05010202/index.html' + '" scrolling="yes"></iframe>'
});

// //删除
function OnClickDeleteButton() {
    var selectModel = Ext.getCmp('grid').getSelectionModel();
    if (!selectModel.hasSelection()) {
        Ext.MessageBox.alert('操作信息', '请选择要删除的信息.');
        return;
    }
    Ext.Msg
        .confirm(
            "警告",
            "确定要删除吗？",
            function (button) {
                if (button != "yes") {
                    return;
                }
                var i = Ext.getCmp('grid').getSelectionModel()
                    .getSelection().length;
                for (i = 0; i < Ext.getCmp('grid').getSelectionModel()
                    .getSelection().length; i++) {
                    Ext.Ajax
                        .request({
                            url: AppUrl + 'zdh/PRO_PM_WORKORDER_SPARE_DEL',
                            // url :
                            // '/No41070102/PRO_PM_WORKORDER_SPARE_DEL',
                            async: false,
                            params: {
                                V_I_ID: selectModel.getSelection()[i].data.I_ID
                            },
                            success: function (response) {
                                var resp = Ext.JSON
                                    .decode(response.responseText);
                                Ext.MessageBox.alert('操作信息',
                                    '删除成功', resp);
                                //物料删除--写入日志
                                Ext.Ajax.request({
                                    url:AppUrl+'dxfile/PM_WORKORDER_SPARE_SEL_INLOG',
                                    async:false,
                                    params:{
                                        V_I_ID:selectModel.getSelection()[i].data.I_ID,
                                        V_INPERCODE:Ext.util.Cookies.get("v_personcode"),
                                        V_INDEPT:Ext.util.Cookies.get("v_deptcode"),
                                        V_ORG:Ext.util.Cookies.get("v_orgCode")
                                    },
                                    success:function(response){
                                        var resp=Ext.decode(response.responseText);
                                        if(resp.RET=='SUCCESS'){

                                        }else{
                                            alert(resp.RET);
                                        }
                                    }
                                });
                            }
                        });
                }
                Ext.ComponentManager.get('grid').getStore().load();
                Ext.ComponentManager.get('grid2').getStore().load();
            });

    var selectModel = Ext.getCmp('grid').getSelectionModel();
    if (!selectModel.hasSelection()) {
        Ext.MessageBox.alert('操作信息', '请选择要删除的信息.');
        return;
    }
    Ext.Msg
        .confirm(
            "警告",
            "确定要删除吗？",
            function (button) {
                if (button != "yes") {
                    return;
                }
                var i = Ext.getCmp('grid').getSelectionModel()
                    .getSelection().length;
                for (i = 0; i < Ext.getCmp('grid').getSelectionModel()
                    .getSelection().length; i++) {

                    //物料删除--写入日志
                    Ext.Ajax.request({
                        url:AppUrl+'dxfile/PM_WORKORDER_SPARE_SEL_INLOG',
                        async:false,
                        params:{
                            V_I_ID:selectModel.getSelection()[i].data.I_ID,
                            V_INPERCODE:Ext.util.Cookies.get("v_personcode"),
                            V_INDEPT:Ext.util.Cookies.get("v_deptcode"),
                            V_ORG:Ext.util.Cookies.get("v_orgCode")
                        },
                        success:function(response){
                            var resp=Ext.decode(response.responseText);
                            if(resp.RET=='SUCCESS'){
                                // setMatSign=1;
                                // matSignChange();
                            }else{
                                alert(resp.RET);
                            }
                        }
                    });

                    Ext.Ajax
                        .request({
                            url: AppUrl + 'zdh/PRO_PM_WORKORDER_SPARE_DEL',
                            // url:
                            // '/No41070102/PRO_PM_WORKORDER_SPARE_DEL',
                            async: false,
                            params: {
                                V_I_ID: selectModel.getSelection()[i].data.I_ID
                            },
                            success: function (response) {
                                // var resp = Ext.JSON
                                // .decode(response.responseText);
                                // Ext.example
                                // .msg('操作信息', '{0}', resp);
                            }
                        });
                }
                setMatSign=1;
                matSignChange();
                Ext.ComponentManager.get('grid').getStore().load();
                Ext.ComponentManager.get('grid2').getStore().load();
            });
}

function OnClickMatCodeText(threeParams) {
    Ext.getCmp('grid').getPlugin().completeEdit();
    if (threeParams != '' && threeParams != null) {
        var str = threeParams;
        var strs = [];
        strs = threeParams.split('^');
        KC_COUNT=str[7];
        Ext.Ajax.request({
            url: AppUrl + 'zdh/PRO_PM_WORKORDER_SPARE_SET',
            // url : '/No41070102/PRO_PM_WORKORDER_SPARE_SET',
            method: 'POST',
            async: false,
            params: {
                V_I_ID: '-1',
                V_V_ORDERGUID: V_ORDERGUID,
                V_V_FETCHORDERGUID: '',
                V_V_ACTIVITY: strs[5],
                V_V_MATERIALCODE: strs[0],
                V_V_MATERIALNAME: strs[1],
                V_V_SPEC: strs[4],
                V_V_UNIT: strs[2],
                V_F_UNITPRICE: strs[3],
                V_I_PLANAMOUNT: '1',
                V_F_PLANMONEY: strs[3],
                V_I_ACTUALAMOUNT: '0',
                V_F_ACTUALMONEY: '0',
                V_V_TYPE: '',
                V_V_MEMO: '',
                V_V_SUBTYPE: '',
                V_V_STATUS: '',
                V_I_ABANDONEDAMOUNT: '0',
                V_I_RECLAIMEDAMOUNT: '0',
                V_I_FIXEDAMOUNT: '0',
                V_V_ID: ''
            },
            success: function (response) {
                setMatSign=1;
                Ext.getCmp('grid').getStore().load();
                Ext.getCmp('grid2').getStore().load();
            }
        });
    }

}

function OnClickYZJText(moreParams) {
    Ext.getCmp('grid').getPlugin().completeEdit();
    if (moreParams != '' && moreParams != null) {
        var str = moreParams;
        var strs = [];
        strs = moreParams.split('^');
        Ext.Ajax.request({
            url: AppUrl + 'zdh/PRO_PM_WORKORDER_SPARE_SET',
            // url : '/No41070102/PRO_PM_WORKORDER_SPARE_SET',
            method: 'POST',
            async: false,
            params: {
                V_I_ID: '-1',
                V_V_ORDERGUID: V_ORDERGUID,
                V_V_FETCHORDERGUID: '',
                V_V_ACTIVITY: strs[0],
                V_V_MATERIALCODE: strs[1],
                V_V_MATERIALNAME: strs[2],
                V_V_SPEC: strs[3],
                V_V_UNIT: strs[4],
                V_F_UNITPRICE: '0',
                V_I_PLANAMOUNT: '1',
                V_F_PLANMONEY: '0',
                V_I_ACTUALAMOUNT: '1',
                V_F_ACTUALMONEY: '0',
                V_V_TYPE: strs[5],
                V_V_MEMO: strs[6],
                V_V_SUBTYPE: 'yzj',
                V_V_STATUS: '',
                V_I_ABANDONEDAMOUNT: '0',
                V_I_RECLAIMEDAMOUNT: '0',
                V_I_FIXEDAMOUNT: '0',
                V_V_ID: ''
            },
            success: function (response) {

                Ext.Ajax.request({
                    url: AppUrl + 'zdh/PRO_PM_PRELOADWARE_SELECT_SET',
                    method: 'POST',
                    async: false,
                    params: {
                        V_I_ID : strs[5]
                    },
                    success: function (resp) {
                    }
                });

                Ext.getCmp('grid').getStore().load();
                Ext.getCmp('grid2').getStore().load();
            }
        });
    }

}

function OnClickJPText(moreParams) {
    Ext.getCmp('grid').getPlugin().completeEdit();
    if (moreParams != '' && moreParams != null) {
        var str = moreParams;
        var strs = [];
        strs = moreParams.split('^');
        Ext.Ajax.request({
            url: AppUrl + 'zdh/PRO_PM_WORKORDER_SPARE_SET',
            // url : '/No41070102/PRO_PM_WORKORDER_SPARE_SET',
            method: 'POST',
            async: false,
            params: {
                V_I_ID: '-1',
                V_V_ORDERGUID: V_ORDERGUID,
                V_V_FETCHORDERGUID: '',
                V_V_ACTIVITY: strs[0],
                V_V_MATERIALCODE: strs[1],
                V_V_MATERIALNAME: strs[2],
                V_V_SPEC: strs[3],
                V_V_UNIT: strs[4],
                V_F_UNITPRICE: strs[5],
                V_I_PLANAMOUNT: strs[6],
                V_F_PLANMONEY: strs[7],
                V_I_ACTUALAMOUNT: strs[6],
                V_F_ACTUALMONEY: strs[7],
                V_V_TYPE: strs[8],
                V_V_MEMO: '',
                V_V_SUBTYPE: 'jp',
                V_V_STATUS: '',
                V_I_ABANDONEDAMOUNT: '0',
                V_I_RECLAIMEDAMOUNT: '0',
                V_I_FIXEDAMOUNT: '0',
                V_V_ID: ''
            },
            success: function (response) {

                Ext.Ajax.request({
                    url: AppUrl + 'zdh/PRO_PM_WORKORDER_JIP_SELECT',
                    method: 'POST',
                    async: false,
                    params: {
                        V_I_ID : strs[8]
                    },
                    success: function (resp) {
                    }
                });

                Ext.getCmp('grid').getStore().load();
                Ext.getCmp('grid2').getStore().load();
            }
        });
    }

}

function OnClickKCText(moreParams) {
    Ext.getCmp('grid').getPlugin().completeEdit();
    if (moreParams != '' && moreParams != null) {
        var str = moreParams;
        var strs = [];
        strs = moreParams.split('^');
        KC_COUNT=strs[7];

        Ext.Ajax.request({
            url: AppUrl + 'zdh/PRO_PM_WORKORDER_SPARE_SET2',
            // url : '/No41070102/PRO_PM_WORKORDER_SPARE_SET',
            method: 'POST',
            async: false,
            params: {
                V_I_ID: '-1',
                V_V_ORDERGUID: V_ORDERGUID,
                V_V_FETCHORDERGUID: '',
                V_V_ACTIVITY: strs[0],
                V_V_MATERIALCODE: strs[1],
                V_V_MATERIALNAME: strs[2],
                V_V_SPEC: strs[3],
                V_V_UNIT: strs[4],
                V_F_UNITPRICE: strs[5],
                V_I_PLANAMOUNT:'1',
                V_F_PLANMONEY: '0',
                V_I_ACTUALAMOUNT:'0',
                V_F_ACTUALMONEY: '0',
                V_V_TYPE: strs[6],
                V_V_MEMO: ' ',
                V_V_SUBTYPE: 'kc',
                V_V_STATUS: '',
                V_I_ABANDONEDAMOUNT: '0',
                V_I_RECLAIMEDAMOUNT: '0',
                V_I_FIXEDAMOUNT: '0',
                V_V_ID: ''
                ,V_KFCOUNT:KC_COUNT
            },
            success: function (response) {
                var resp=Ext.decode(response.responseText);
                if(resp.list[0].V_INFO=='FALSE'){
                    // Ext.Msg.alert('提示','数量以已超出库存数量，不再添加')
                    Ext.Msg.alert('提示','数量以已超出库存数量');
                }else{
                    //写入缺陷日志
                    Ext.Ajax.request({
                        url: AppUrl + 'dxfile/PM_WORKORDER_SPARE_LOG_IN',
                        method: 'POST',
                        async: false,
                        params: {
                            ID: '-1',
                            ORDERGUID: V_ORDERGUID,
                            FETCHORDERGUID: '',
                            ACTIVITY: strs[0],
                            MATERIALCODE: strs[1],
                            MATERIALNAME: strs[2],
                            SPEC: strs[3],
                            UNIT: strs[4],
                            I_F_UNITPRICE: strs[5],
                            I_I_PLANAMOUNT: '1',
                            I_F_PLANMONEY: '0',
                            I_I_ACTUALAMOUNT: '0',
                            I_F_ACTUALMONEY: '0',
                            I_V_TYPE: strs[6],
                            I_V_MEMO: ' ',
                            I_V_SUBTYPE: 'kc',
                            I_V_STATUS: '',
                            I_I_ABANDONEDAMOUNT: '0',
                            I_I_RECLAIMEDAMOUNT: '0',
                            I_I_FIXEDAMOUNT: '0',
                            I_V_ID: '',
                            KC_ID: KC_COUNT,
                            MAT_STATE:'IN',
                            INPERCODE:Ext.util.Cookies.get("v_personcode"),
                            INDEPT:Ext.util.Cookies.get("v_deptcode"),
                            INORG:Ext.util.Cookies.get("v_orgCode")
                        },
                        success: function (response) {
                            var resp = Ext.decode(response.responseText);
                            setMatSign=1;
                            matSignChange();
                        }
                    });
                }
                Ext.getCmp('grid').getStore().load();
                Ext.getCmp('grid2').getStore().load();
            }
        });
    }

}

function OnClickAddFinishButton() {
    if(setMatSign==1){
        window.opener.loadSetMat();

    }
    window.opener.loadMatList();
    window.close();
}

function IsEdit(value, metaData, record, rowIndex, colIndex, store, view) {
    /*if (record.raw.V_SUBTYPE == 'yzj') {
        store.data.getAt(rowIndex).data.I_PLANAMOUNT = '1';
        return '<div style="text-align:right;" data-qtip="' + '1' + '" >' + '1'
            + '</div>';
    } else if (record.raw.V_SUBTYPE == 'jp') {
        store.data.getAt(rowIndex).data.I_PLANAMOUNT = record.raw.I_PLANAMOUNT;
        return '<div style="text-align:right;" data-qtip="'
            + record.raw.I_PLANAMOUNT + '" >' + record.raw.I_PLANAMOUNT
            + '</div>';
    } else {*/
    return '<div style="text-align:right;" data-qtip="' + value + '" >'
        + value + '</div>';
    //}
}

function AddFloat(value, metaData, record, rowIndex, colIndex, store, view) {
    return '<div data-qtip="' + value + '" style="text-align:left;" >' + value
        + '</div>';
}

function AddRight(value, metaData, record, rowIndex, colIndex, store, view) {
    return '<div data-qtip="' + value + '" style="text-align:right;" >' + value
        + '</div>';
}

Ext.onReady(function () {
    if (flag == "delete") {
        Ext.create('Ext.container.Viewport', {
            xtype: 'panel',
            width: '100%',
            layout: 'vbox',
            items: [gridPanel]
        });

    } else {
        Ext.create('Ext.container.Viewport', {
            xtype: 'panel',
            width: '100%',
            layout: 'vbox',
            items: [gridPanel, framePanel]
        });
    }

    if (flag == "delete") {
        Ext.getCmp('btnOK').setVisible(false);
    } else {
        Ext.getCmp('btnOK').setVisible(true);
    }
});

function OnChangePlanAmount(editor, e, eOpts) {
    var str = e.record.data.F_UNITPRICE * e.record.data.I_PLANAMOUNT;

    if(KC_COUNT=='0'){
        alert('无法识别库存数量，请从新选择该物料');
        return false;
    }
    if(e.record.data.I_PLANAMOUNT>KC_COUNT){
        // alert('计划数量已超出库存数量，请从新输入');
        alert('计划数量已超出库存数量');
        // Ext.getCmp('grid').store.load();
        // return false;
    }
    Ext.Ajax
        .request({
            type: 'ajax',
            url: AppUrl + 'zdh/PRO_PM_WORKORDER_SPARE_SET',
            method: 'POST',
            async: false,
            params: {
                V_I_ID: e.record.data.I_ID,
                V_V_ORDERGUID: V_ORDERGUID,
                V_V_FETCHORDERGUID: '',
                V_V_ACTIVITY: e.record.data.V_ACTIVITY,
                V_V_MATERIALCODE: e.record.data.V_MATERIALCODE,
                V_V_MATERIALNAME: e.record.data.V_MATERIALNAME,
                V_V_SPEC: e.record.data.I_ID,
                V_V_UNIT: e.record.data.V_UNIT,
                V_F_UNITPRICE: e.record.data.F_UNITPRICE,
                V_I_PLANAMOUNT:e.record.data.I_PLANAMOUNT,
                V_F_PLANMONEY: str,
                V_I_ACTUALAMOUNT:'0',
                V_F_ACTUALMONEY: '0',
                V_V_TYPE: '',
                V_V_MEMO: e.record.data.V_MEMO,
                V_V_SUBTYPE: '',
                V_V_STATUS: '',
                V_I_ABANDONEDAMOUNT: '0',
                V_I_RECLAIMEDAMOUNT: '0',
                V_I_FIXEDAMOUNT: '0',
                V_V_ID: ''
            },
            success: function (response) {
            }
        });
    //写入修改数据日志
    Ext.Ajax.request({
        url: AppUrl + 'dxfile/PM_WORKORDER_SPARE_LOG_IN',
        method: 'POST',
        async: false,
        params: {
            ID: e.record.data.I_ID,
            ORDERGUID: V_ORDERGUID,
            FETCHORDERGUID: '',
            ACTIVITY: e.record.data.V_ACTIVITY,
            MATERIALCODE: e.record.data.V_MATERIALCODE,
            MATERIALNAME: e.record.data.V_MATERIALNAME,
            SPEC: e.record.data.I_ID,
            UNIT: e.record.data.V_UNIT,
            I_F_UNITPRICE: e.record.data.F_UNITPRICE,
            I_I_PLANAMOUNT: e.record.data.I_PLANAMOUNT,
            I_F_PLANMONEY:  str,
            I_I_ACTUALAMOUNT: '0',
            I_F_ACTUALMONEY: '0',
            I_V_TYPE: '',
            I_V_MEMO: e.record.data.V_MEMO,
            I_V_SUBTYPE: '',
            I_V_STATUS: '',
            I_I_ABANDONEDAMOUNT: '0',
            I_I_RECLAIMEDAMOUNT: '0',
            I_I_FIXEDAMOUNT: '0',
            I_V_ID: '',
            KC_ID: KC_COUNT,
            MAT_STATE:'UPDATE',
            INPERCODE:Ext.util.Cookies.get("v_personcode"),
            INDEPT:Ext.util.Cookies.get("v_deptcode"),
            INORG:Ext.util.Cookies.get("v_orgCode")
        },
        success: function (response) {
            var resp = Ext.decode(response.responseText);
        }
    });
    // Ext.getCmp('grid').store.load();
    Ext.getCmp('grid2').getStore().load();
}

function WatchOrder() {

    var urlOrder = AppUrl
        + 'page/PM_05010203/index.html?V_ORDERGUID='
        + V_ORDERGUID
        + '&V_MATERIALCODE='
        + Ext.getCmp("grid2").getSelectionModel().getSelection()[0].data.V_MATERIALCODE
        +'&STEP='+STEP
        + '';

    Ext.getCmp('windowPanel').html = '<iframe frameborder="0" width="100%" height="100%" id="OrderDescFrame"  src="'
        + urlOrder + '" scrolling="yes"></iframe>';
    Ext.getCmp('windowPanel').show();
}
function OnCompareElem ( editor, context, eOpts ){

    if((context.originalValue==context.value&&setMatSign==0)&&(STEP!="检修工单创建（调度）"||STEP!='创建工单')){
        setMatSign=0;
    }else{
        setMatSign=1;
    }
    Ext.Ajax.request({
        url:AppUrl+'dxfile/PRO_WORKORDER_MAT_CHANGE_IN',
        type:'POST',
        async:false,
        params:{
            V_WORKGUID:V_ORDERGUID,
            V_SIGN:setMatSign
        },
        success:function(ret){
            var resp=Ext.decode(ret.responseText);
        }
    });

}

function matSignChange(){
    if(STEP!="检修工单创建（调度）"||STEP!='创建工单'){
        Ext.Ajax.request({
            url:AppUrl+'dxfile/PRO_WORKORDER_MAT_CHANGE_IN',
            type:'POST',
            async:false,
            params:{
                V_WORKGUID:V_ORDERGUID,
                V_SIGN:setMatSign
            },
            success:function(ret){
                var resp=Ext.decode(ret.responseText);
            }
        });
    }
}