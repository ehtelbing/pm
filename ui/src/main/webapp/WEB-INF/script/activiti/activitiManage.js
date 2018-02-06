var sp, equCode, orgid, centerid, centervvrepaircode ,gridStore2;
Ext.onReady(function () {
    sp = '';
    equCode = '';
    centervvrepaircode = '';
    centerid = '';
    orgid = '';
    var westtreeStore = Ext.create("Ext.data.TreeStore", {
        autoLoad: false,
        storeId: 'westtreeStore'
    });
    var centertreeStore = Ext.create("Ext.data.TreeStore", {
        storeId: 'centertreeStore',
        autoLoad: false,
        autoScroll: true,
        rootVisible: false
    });
    var westtree = Ext.create("Ext.tree.Panel", {
        id: 'westtree',
        region: 'west',
        height: '100%',
        width: '20%',
        rootVisible: false,
        store: westtreeStore,
        listeners: {
            itemclick: WestTreeOnClick
        }
    });
    var centertree = Ext.create("Ext.tree.Panel", {
        id: 'centertree',
        region: 'center',
        height: '100%',
        width: '20%',
        rootVisible: false,
        store: centertreeStore,
        listeners: {
            itemclick: CenterTreeOnClick,
            checkchange: function () {
                var msg = '', selNodes = centertree.getChecked();
                Ext.each(selNodes, function (node) {
                    if (msg.length > 0) {
                        msg += ',';
                    }
                    msg += node.data.id;
                });
                centervvrepaircode=msg;
                gridStore2.proxy.extraParams.V_V_DEPTCODE = orgid;
                gridStore2.proxy.extraParams.V_V_REPAIRCODE = msg == '' ? "%" : msg;
                Ext.getCmp('eastgridpanel2').store.load();
            }
        }
    });
    var gridStore1 = Ext.create('Ext.data.Store', {
        id: 'gridStore1',
        autoLoad: false,

        fields: ['V_FLOWTYPE', 'V_FLOWTYPE_DESC', 'V_PROCESS_CODE', 'V_PROCESS_NAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'Flow/PRO_PM_ACTIVITI_DESC_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });
    gridStore1.load();
    var gridStore2 = Ext.create('Ext.data.Store', {
        id: 'gridStore2',
        autoLoad: false,
        fields: ['V_DEPTREPAIRNAME', 'V_FLOWTYPE_DESC', 'V_PROCESS_NAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'Flow/PRO_PM_ACTIVITI_DESC_REPAIRSEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                V_V_DEPTCODE:orgid,
                V_V_REPAIRCODE:centervvrepaircode == ''? "%" : centervvrepaircode
            },
        }
    });
    //gridStore2.load();
    var eastgridpanel1 = Ext.create("Ext.grid.Panel", {
        id: 'eastgridpanel1',
        region: 'north',
        height: '50%',
        columnLines: true,
        store: gridStore1,
        autoScroll: true,
        singleSelect: false,
        width: '60%',
        columns: [
            {
                text: "",
                width: 40,
                align: 'center',
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    metaData.style = "text-align:center";
                    return "<input class='checkbox' type='checkbox' name='" + record.data.PR_NUMBER + "' id='gird-checkbox-" + rowIndex + "' value='" + rowIndex + "' onchange='onGridCheckChange(" + rowIndex + ")'/>";
                }
            },
            {
                text: '流程类型编码',
                dataIndex: 'V_FLOWTYPE',
                width: 200,
                align: 'center',
                renderer: Left
            }, {
                text: '流程类型名称',
                dataIndex: 'V_FLOWTYPE_DESC',
                width: 250,
                align: 'center',
                renderer: Left
            }, {
                text: '流程编码',
                dataIndex: 'V_PROCESS_CODE',
                width: 200,
                align: 'center',
                renderer: Left
            }, {
                text: '流程描述',
                dataIndex: 'V_PROCESS_NAME',
                width: 400,
                align: 'center',
                renderer: Left
            }]
    });
    var eastgridpanel2 = Ext.create("Ext.grid.Panel", {
        id: 'eastgridpanel2',
        region: 'south',
        height: '50%',
        columnLines: true,
        store: gridStore2,
        autoScroll: true,
        width: '60%',
        columns: [{
            text: '检修单位',
            dataIndex: 'V_DEPTREPAIRNAME',
            width: 200,
            align: 'center',
            renderer: Left
        }, {
            text: '流程类型描述',
            dataIndex: 'V_FLOWTYPE_DESC',
            width: 250,
            align: 'center',
            renderer: Left
        }, {
            text: '流程描述',
            dataIndex: 'V_PROCESS_NAME',
            width: 200,
            align: 'center',
            renderer: Left
        }],

    });
    var eastgridpanel3 = Ext.create("Ext.panel.Panel", {
        id: 'eastgridpanel3',
        width: '60%',
        region: 'east',
        layout: 'border',
        items: [eastgridpanel1, eastgridpanel2]
    });

    Ext.create('Ext.container.Viewport', {
        split: true,
        autoScroll: true,
        layout: 'border',
        items: [westtree, centertree, eastgridpanel3]
    });
    Ext.getCmp('westtree').store.setProxy({
        type: 'ajax',
        actionMethods: {
            read: 'POST'
        },
        async: false,
        url: AppUrl + 'Flow/OrgTree',
        reader: {
            type: 'json'
        },
        expanded: true,
        extraParams: {
            V_V_DEPTCODE: "%"
        }
    });
    Ext.getCmp('westtree').store.load();
    //Ext.ComponentManager.get('eastgridpanel1').getSelectionModel().selectionMode = 'SINGLE';

    /* Ext.data.StoreManager.lookup('gridStore1').on('load', function () {
         var eastLength = Ext.data.StoreManager.get('gridStore1').data.length;
         Ext.ComponentManager.get('eastgridpanel1').getSelectionModel().selectionMode = 'MULTI';
         for (var i = 0; i < eastLength; i++) {
             Ext.Ajax.request({
                 url: AppUrl + 'pm_19/PRO_PM_PERSONTOEQU_VIEW',
                 async: false,
                 method: 'post',
                 params: {
                     V_V_PERSONCODE: personid,
                     V_V_EQUCODE: Ext.data.StoreManager.get('gridStore1').data.getAt(i).data.V_EQUCODE
                 },
                 success: function (resp) {
                     if (Ext.JSON.decode(resp.responseText).list.length > 0) {
                         Ext.ComponentManager.get('eastgridpanel2').getSelectionModel().select(i, true, true);
                     }
                 }
             });
         }
     });*/
    function CenterTreeOnClick(aa, record, item, index, e, eOpts) {
        centervvrepaircode = record.data.id;
        Ext.getCmp('eastgridpanel1').store.load();
        //Ext.getCmp('centertreeStore').getSelectionModel().getSelection();
        //gridStore2.getChecked();

    }

    function OnSelectionChanged(pp, record, index, eOpts) {
        for (var i = 0; i < Ext.getCmp('eastgridpanel1').getSelectionModel().getSelection().length; i++) {
            alert(Ext.getCmp('eastgridpanel1').getSelectionModel().getSelection().length);

        }
    }

    function WestTreeOnClick(aa, record, item, index, e, eOpts) {
        orgid = record.data.id;
        Ext.getCmp('centertree').store.setProxy({
            type: 'ajax',
            url: AppUrl + 'Flow/DepartAndEquTypeTree',
            extraParams: {
                V_V_DEPTCODE: record.data.id
            },
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json'
            },
            root: {
                expanded: true
            }
        });
        Ext.getCmp('centertree').store.load();
        gridStore2.proxy.extraParams.V_V_DEPTCODE = orgid;
        gridStore2.proxy.extraParams.V_V_REPAIRCODE = "%";
        Ext.getCmp('eastgridpanel2').store.load();
        Ext.getCmp('eastgridpanel1').store.load();
    }

    function Left(value, metaData, record, rowIndex, colIndex, store) {
        metaData.style = "text-align:left";
        return value;
    }
});

//选框点击事件 index是行号
function onGridCheckChange(index) {
    // var alldata = Ext.data.StoreManager.lookup('gridStore').data.items;
    // var selectdata = alldata[index].data.PR_NUMBER;
    var check = '';
    var selected = [];
    var chacked = [];
    tolselvalue = 0;
    var selectClass = document.getElementsByClassName("checkbox");
    var selectC = document.getElementById('gird-checkbox-' + index).checked;
    var selectdata= Ext.getCmp('eastgridpanel1').getSelectionModel().getSelection();
    var vvflowtype=selectdata[0].data.V_FLOWTYPE;
    var vvprocesscode=selectdata[0].data.V_PROCESS_CODE ;
    for (var j = 0; j < selectClass.length; j++) {
        selectClass[j].checked = false;
    }

if(orgid==''){
    Ext.Msg.alert('提示', '请选择组织机构');
}else if(centervvrepaircode==''){
    Ext.Msg.alert('提示', '请选择检修单位');
    }else{
    if (selectC == true) {
        document.getElementById('gird-checkbox-' + index).checked = true;
        check = '1';
    } else {
        document.getElementById('gird-checkbox-' + index).checked = false;
        check = '0';
    }
    Ext.Ajax.request({
        url: AppUrl + 'Flow/PM_ACTIVITI_ORG_PROCESS_SET',
        method: 'POST',
        async: false,
        params: {
            V_V_DEPTCODE: orgid,
            V_V_REPAIRCODE: centervvrepaircode,
            V_V_FLOWTYPE:vvflowtype,
            V_V_PROCESS_CODE:vvprocesscode,
            V_V_CHECK:check
        },
        success: function (resp) {
            var data = resp.responseText;//后台返回的值
            if(data.indexOf("success")) {
                Ext.Msg.alert('提示', "操作成功");
            }else{
                Ext.Msg.alert('提示', "操作失败");

            }
        }
    })
    Ext.getCmp('eastgridpanel2').store.load();
}
   /* gridStore2.proxy.extraParams.V_V_DEPTCODE = orgid;
    gridStore2.proxy.extraParams.V_V_REPAIRCODE = centervvrepaircode;
    Ext.getCmp('eastgridpanel2').store.load();*/
    /*   if(selectC==false){
           for(var i=0;i<alldata.length;i++){
               alldata[i].checked=false;
           }
       }else{
           for(var i=0;i<alldata.length;i++){
               alldata[i].checked=true;
           }
       }*/

    /* for (var i = 0; i < alldata.length; i++) {
        if (selectdata == alldata[i].data.PR_NUMBER) {
            selected.push(i);
            chacked.push(document.getElementById('gird-checkbox-' + i).checked);
            //tolselvalue = tolselvalue - (-alldata[i].data.TOTAL_VALUE);
        }
        //document.getElementById('gird-checkbox-' + i).checked = false
    }


    for (var i = 0; i < selected.length; i++) {
        if(chacked[i]==false){
            document.getElementById('gird-checkbox-' + selected[i]).checked = true
            document.getElementById('gird-checkbox-' + selected[i]).checked = true
        }else{
            document.getElementById('gird-checkbox-' + selected[i]).checked = false
            document.getElementById('gird-checkbox-' + selected[i]).checked = false
        }

        //  Ext.fly('gird-checkbox-' + selected[i]).dom.checked = true;
    }*/
}



