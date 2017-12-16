/// <reference path="../Shared/ext-all-debug-w-comments.js" />
var I_ID = -1;
var V_ORDERGUID = null;
if (location.href.split('?')[1] != undefined) {
    V_ORDERGUID = Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID;
}
var gridStore = Ext.create('Ext.data.Store', {
    id: 'gridStore',
    autoLoad: true,
    fields: ['V_ACTIVITY', 'V_WORK_CENTER', 'V_DESCRIPTION', 'I_WORK_ACTIVITY', 'I_DURATION_NORMAL', 'I_ID'],
    proxy: {
        type: 'ajax',
        url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_OPERATIONS',
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            V_V_ORDERGUID : V_ORDERGUID
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});

var workCenterStore = Ext.create('Ext.data.Store', {
    id: 'workCenterStore',
    autoLoad: true,
    fields: ['V_SAP_WORKNAME', 'V_SAP_WORK'],
    proxy: {
        type: 'ajax',
        url: AppUrl + 'zdh/workcenter_sel',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            V_V_DEPTREPAIRCODE : Ext.urlDecode(location.href.split('?')[1]).V_DEPTREPAIRCODE
        }
    }
});



var gridPanel = Ext.create('Ext.panel.Panel', {
    region: 'center',
    layout: 'border',
    items: [{
        xtype: 'gridpanel',
        id: 'grid',
        region: 'center',
        store: 'gridStore',
        columnLines: true,
        selType: 'checkboxmodel',
        multiSelect: true,
        autoScroll: true,
        columns: [
            { text: '工序', width: 80, align: 'center', dataIndex: 'V_ACTIVITY' },
            { text: '工作中心', width: 90, align: 'center', dataIndex: 'V_WORK_CENTER' },
            { text: '工序内容', width:350, align: 'center', dataIndex: 'V_DESCRIPTION' },
            { text: '额定时间', width: 80, align: 'center', dataIndex: 'I_WORK_ACTIVITY' },
            { text: '额定人数', width: 80, align: 'center', dataIndex: 'I_DURATION_NORMAL' }
        ]
        , dockedItems: [{
            xtype: 'panel', region: 'north', height: 30,frame:true, layout:'column',
            items: [{
                xtype: 'button', text: '添加', style: 'margin:0px 20px  0px 100px', icon : imgpath + '/add.png', width: 100, listeners: { click: OnclickAddButtonLoad }
            }, {
                xtype: 'button', text: '修改', style: 'margin:0px 20px  0px 20px', icon: imgpath + '/edit.png', width: 100, listeners: { click: OnclickUpdateButtonLoad }
            }, {
                xtype: 'button', text: '删除', style: 'margin:0px 20px  0px 20px', icon: imgpath + '/delete.png', width: 100, listeners: { click: OnClickDeleteButton }
            }, {
                xtype: 'button', text: '添加完成', style: 'margin:0px 20px  0px 20px',icon: imgpath + '/saved.png', width: 100, listeners: { click: OnClickFinishButton }
            }]
        }]
    }]
});

var windowLayout = {
    id: 'dialog',
    closeAction: 'hide',
    title: '编辑',
    xtype: 'vbox',
    height: 300,
    width: 500,
    frame:true,
    items: [{
        xtype: 'combo', id: 'selWorkCenter', fieldLabel: '工作中心:', labelAlign: 'right', style: 'margin:20px 0px 5px 0px', store: 'workCenterStore', queryModel: 'local', displayField: 'V_SAP_WORKNAME', valueField: 'V_SAP_WORK', width:400
    }, {
        xtype: 'textareafield', fieldLabel: '工序内容:', labelAlign: 'right', grow: true, id: 'workContent', allowBlank: false, width: 400, height: 100

    }, {
        xtype: 'numberfield', fieldLabel: '额定时间:', labelAlign: 'right', id: 'actualTime', value: 1, minValue: 1, width: 400
    }, {
        xtype: 'numberfield', fieldLabel: '额定人数:', labelAlign: 'right', id: 'actualPeople', value: 2, minValue: 1, width: 400
    }, {
        xtype: 'toolbar', border: 0, layout: 'column', items: [{ xtype: 'button', text: '保存', pressed: true, icon: imgpath + '/filesave.png', style: 'margin:20px 0px 5px 100px', width: 100, listeners: { click: OnClickSaveButton} },
            { xtype: 'button', text: '关闭', pressed: true, style: 'margin:20px 0px 0px 80px', width: 100, listeners: { click: OnClickCancerButton}}]
    }]
}


function OnclickAddButtonLoad() {
    I_ID = '-1';
    Ext.getCmp('workContent').setValue('');
    Ext.getCmp('actualTime').setValue('1');
    Ext.getCmp('actualPeople').setValue('2');

    Ext.getCmp('dialog').show();
}

function OnClickSaveButton() {
    Ext.Ajax.request({
        url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_SET',
        method: 'POST',
        params: {
            V_I_ID :  I_ID,
            V_V_ORDERGUID:V_ORDERGUID,
            V_V_DESCRIPTION:Ext.getCmp('workContent').getValue(),
            V_I_WORK_ACTIVITY:Ext.getCmp('actualTime').getValue(),
            V_I_DURATION_NORMAL:Ext.getCmp('actualPeople').getValue(),
            V_V_WORK_CENTER:Ext.getCmp('selWorkCenter').getValue(),
            V_I_ACTUAL_TIME:'0',
            V_I_NUMBER_OF_PEOPLE: '0',
            V_V_ID:''
        }, success: function (response) {
            Ext.ComponentManager.get('grid').getStore().load();
        }
    });

    if (I_ID == '-1') {
        I_ID = -1;
        OnclickAddButtonLoad();
    } else {
        Ext.getCmp('dialog').hide();
        I_ID = -1;
    }
}

function OnclickUpdateButtonLoad() {
    var selectModel = Ext.getCmp('grid').getSelectionModel();
    if (!selectModel.hasSelection()) { Ext.MessageBox.alert('操作信息', '请选择要修改的信息.'); return; }
    var i = Ext.getCmp('grid').getSelectionModel().getSelection().length;
    if (i > 1) {
        Ext.MessageBox.alert('操作信息', '请选择一条数据进行修改.'); return;
    } else {
        for (i = 0; i < Ext.getCmp('grid').getSelectionModel().getSelection().length; i++) {
            I_ID = selectModel.getSelection()[i].data.I_ID;
            Ext.Ajax.request({
                url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_GET',
                method: 'POST',
                params: {
                    V_I_ID : selectModel.getSelection()[i].data.I_ID
                }, success: function (response) {
                    Ext.getCmp('selWorkCenter').select(Ext.JSON.decode(response.responseText).list[0].V_WORK_CENTER);
                    Ext.getCmp('workContent').setValue(Ext.JSON.decode(response.responseText).list[0].V_DESCRIPTION);
                    Ext.getCmp('actualTime').setValue(Ext.JSON.decode(response.responseText).list[0].I_WORK_ACTIVITY);
                    Ext.getCmp('actualPeople').setValue(Ext.JSON.decode(response.responseText).list[0].I_DURATION_NORMAL);
                }
            });
            Ext.getCmp('dialog').show();
        }
    };
}

//删除
function OnClickDeleteButton() {
    var selectModel = Ext.getCmp('grid').getSelectionModel();
    if (!selectModel.hasSelection()) { Ext.MessageBox.alert('操作信息', '请选择要删除的信息.'); return; }
    Ext.Msg.confirm("警告", "确定要删除吗？", function (button) {
        if (button != "yes") { return; }
        var i = Ext.getCmp('grid').getSelectionModel().getSelection().length;
        for (i = 0; i < Ext.getCmp('grid').getSelectionModel().getSelection().length; i++) {
            Ext.Ajax.request({
                url: AppUrl + 'zdh/PRO_PM_WORKORDER_ET_DEL',
                async:false,
                params: {
                    V_I_ID : selectModel.getSelection()[i].data.I_ID,
                    V_V_ORDERGUID : V_ORDERGUID
                },
                success: function (response) {
                }
            });
        }
        Ext.ComponentManager.get('grid').getStore().load();
    });

}

function OnClickCancerButton() {
    Ext.getCmp('dialog').hide();
    I_ID = -1;
}

function OnClickFinishButton() {
    window.opener.loadTaskGrid();
    window.close();
}

Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', gridPanel);
    Ext.create('Ext.window.Window', windowLayout);

    workCenterStore.on('load', function () {
        Ext.getCmp('selWorkCenter').select(Ext.data.StoreManager.get('workCenterStore').getAt(0));
    });
});