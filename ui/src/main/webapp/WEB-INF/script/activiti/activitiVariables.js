var processInstanceId = '';
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.processInstanceId == undefined) ? processInstanceId = '' : processInstanceId = parameters.processInstanceId;
}

Ext.onReady(function () {

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        autoLoad: false,
        fields: ['code', 'value'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'Activiti/GetVariables',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var grid = Ext.create("Ext.grid.Panel", {
        id: 'grid',
        region: 'center',
        width: '50%',
        columnLines: true,
        store: gridStore,
        autoScroll: true,
        singleSelect: false,
        plugins: [{
            ptype: 'cellediting',
            clicksToEdit: 1,
            listeners: {
                'edit': function (editor, e, eOpts) {
                    editSave(e.record.data.code, e.originalValue, e.record.data.value)
                }
            }
        }],
        columns: [{
            text: '流程变量名称',
            dataIndex: 'code',
            width: 200,
            align: 'center'
        }, {
            text: '流程变量值',
            dataIndex: 'value',
            width: 250,
            align: 'center',
            field: {
                xtype: 'textfield'
            },
        }]
    });


    Ext.create('Ext.container.Viewport', {
        split: true,
        autoScroll: true,
        layout: 'border',
        items: [grid]
    });

    QueryGrid()
})


function QueryGrid() {
    Ext.data.StoreManager.lookup('gridStore').load({
        params: {
            processInstanceId: processInstanceId
        }
    });
}

function editSave(code, oldValue, newValue) {

    Ext.Msg.confirm('提示', '是否确定修改?', function (button) {
        if (button == "yes") {
            Ext.Ajax.request({
                url: AppUrl + 'Activiti/ChangeVariables',
                type: 'ajax',
                method: 'POST',
                params: {
                    instanceId: processInstanceId,
                    code: code,
                    value:newValue
                }
            })
        }
    });

}




