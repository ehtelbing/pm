Ext.onReady(function () {
    if (location.href.split('?')[1] != undefined) {
        var id = Ext.urlDecode(location.href.split('?')[1]).V_EQUCODE;
    } if (id != "") {
        Ext.Ajax.request({
            //url: '/No41070106/PRO_GET_SAP_PM_EQU_P',
        	url: APP + '/ModelSelect',
            method: 'POST',
            params: {
                parName : ['V_V_EQUCODE'],
            	parType : ['s'],
            	parVal : [id],
            	proName : 'PRO_GET_SAP_PM_EQU_P',
            	cursorName : 'V_CURSOR'
            },
            success: function (ret) {
                var resp = Ext.JSON.decode(ret.responseText).list;
                Ext.ComponentManager.get("sblxbm").setText(resp[0].V_EQUTYPECODE); //设备类型编码
                Ext.ComponentManager.get("sblxmc").setText(resp[0].V_EQUTYPENAME); //设备类型名称
                Ext.ComponentManager.get("sbbm").setText(resp[0].V_EQUCODE); //设备编码
                Ext.ComponentManager.get("sbmc").setText(resp[0].V_EQUNAME); //设备名称

                gridStore.load({
                    params: {
                        parName : ['V_V_EQUTYPECODE'],
            	     	parType : ['s'],
            	     	parVal : [Ext.getCmp('sblxbm').text],
            	     	proName : 'PM_14_FAULT_MODEL_SEL',
            	     	cursorName : 'V_CURSOR'
            	      
                    }
                });
            }
        });

    }
    var gzzxStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'gzzxStore',
        fields: ['V_SAP_WORK', 'V_SAP_WORKNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: APP + '/ModelSelect',
            //url: '/No41070106/PRO_BASE_DEPTTOSAPWORKCSAT',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    })


    var gridStore = Ext.create("Ext.data.Store", {
        id: 'gridStore',
        autoLoad: false,
        fields: [ 'I_ID','V_ID','I_VER','V_EQUTYPECODE','V_CODE','V_NAME','V_PROCESS','V_WORKING','V_CONTENT','V_SPARE',
                'V_VEHICLE','V_TOOL','V_SAFE','V_HOUR','I_FLAG','V_MEMO','D_DATE_EDITTIME','V_EDIT_GUID','V_JXCONTENT'],
        proxy: {
            type: 'ajax',
            async: false,
            //url: '/No41070106/P_MOD_MAIN_GET_LIST_byequid',
            url: APP + '/ModelSelect',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });


    var form = Ext.create("Ext.form.Panel", {
        id: 'panel',
        layout: 'vbox',
        region: 'north',
        border: false,
        title: '获取设备检修模型',
        titleAlign: 'center',
        items: [
          { xtype: 'panel', border: false, layout: 'hbox', margin: '0px 5px 0px 0px', items: [{ xtype: 'panel', width: 100, height: 30, baseCls: 'border_top5', border: false, layout: 'fit', items: [{ xtype: 'label', text: '设备类型编码：' }] }, { xtype: 'panel', width: 240, height: 30, baseCls: 'border_top6', border: false, layout: 'fit', items: [{ id: 'sblxbm', xtype: 'label' }] }, { xtype: 'panel', width: 100, height: 30, baseCls: 'border_top7', border: false, layout: 'fit', items: [{ xtype: 'label', text: '设备类型名称：' }] }, { xtype: 'panel', width: 240, height: 30, baseCls: 'border_top8', border: false, layout: 'fit', items: [{ xtype: 'label', id: 'sblxmc' }] }] },
         { xtype: 'panel', border: false, layout: 'hbox', margin: '0px 5px 0px 0px', items: [{ xtype: 'panel', width: 100, height: 30, baseCls: 'border_top5', border: false, layout: 'fit', items: [{ xtype: 'label', text: '设备编码：' }] }, { xtype: 'panel', width: 240, height: 30, baseCls: 'border_top6', border: false, layout: 'fit', items: [{ id: 'sbbm', xtype: 'label' }] }, { xtype: 'panel', width: 100, height: 30, baseCls: 'border_top7', border: false, layout: 'fit', items: [{ xtype: 'label', text: '设备名称：' }] }, { xtype: 'panel', width: 240, height: 30, baseCls: 'border_top8', border: false, layout: 'fit', items: [{ xtype: 'label', id: 'sbmc' }] }] },
         //{ xtype: 'panel', border: false, layout: 'hbox', margin: '0px 5px 0px 0px', items: [{ xtype: 'panel', width: 100, height: 30, baseCls: 'border_top5', border: false, layout: 'fit', items: [{ xtype: 'label', text: '工作中心' }] }, { xtype: 'panel', width: 580, height: 30, baseCls: 'border_top6', border: false, items: [{ xtype: 'combo', id: 'gzzx', store: gzzxStore, editable: false, width: 260, displayField: 'V_SAP_WORKNAME', valueField: 'V_SAP_WORK', style: 'margin:5px 0px 0px 0px', queryMode: 'local' }] }] }]
         { xtype: 'panel', border: false, layout: 'hbox', margin: '0px 5px 0px 0px', items: [] }]

    });

    var grid = Ext.create("Ext.grid.Panel", {
        id: 'grid',
        region: 'center',
        store: gridStore,
        autoScroll: true,
        height: 400,
        columns: [{ text: '序号', width: 50, align: 'center', sortable: false,xtype: 'rownumberer'},
                  {
                      text: '选择', align: 'center',hidden : true,
                        renderer: function () {
                             return "<input type='button' value='导入' onclick='importClick()'/>";
                        }
                  },
                  { text: '模型主表标识(隐藏)', dataIndex: 'V_ID', align: 'center', hidden: true },
                  { text: '模型编码(隐藏)', dataIndex: 'V_CODE', align: 'center', hidden: true },
                  { text: '模型名称', dataIndex: 'V_NAME', align: 'center' },
                  { text: '工序描述', dataIndex: 'V_PROCESS', align: 'center' },
                  { text: '备件描述', dataIndex: 'V_SPARE', align: 'center' },
                  { text: '工时描述', dataIndex: 'V_HOUR', align: 'center' },
                  { text: '工具描述', dataIndex: 'V_TOOL', align: 'center' },
                  { text: '车辆描述', dataIndex: 'V_VEHICLE', align: 'center' },
                  { text: '安全描述', dataIndex: 'V_SAFE', align: 'center' },
                  { text: '检修描述', dataIndex: 'V_JXCONTENT', align: 'center' },
                  { text: '版本号码', dataIndex: 'I_VER', align: 'center' },
                  { text: '模型唯一值', dataIndex: 'I_ID', hidden: true }]
    });



    gzzxStore.on("load", function () {
        Ext.getCmp("gzzx").select(gzzxStore.getAt(0));
    });

    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [form, grid]
    });
});

function importClick() {
    Ext.Ajax.request({
        //url: '/No41070106/PRO_PM_WORKORDER_MOD_INSERT',
        url: APP + '/ModelChange',
        method: 'POST',
        params: {
	    	parName : ['V_MOD_ID','V_MOD_GUID','V_I_VER','V_V_ORDERGUID','V_V_WORK_CENTER','V_V_PERSONCODE','V_V_PERSONNAME'],
	     	parType : ['s','s','s','s','s','s','s'],
	     	parVal : [
	     	          Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.I_ID,
	     	          Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.V_ID,
	     	          Ext.getCmp('grid').getSelectionModel().getSelection()[0].data.I_VER,
	     	          Ext.urlDecode(location.href.split('?')[1]).V_ORDERGUID,
	     	          Ext.ComponentManager.get("gzzx").getValue(),
	     	          Ext.util.Cookies.get('v_personcode'),
	     	          Ext.util.Cookies.get('v_personname2')
	     	],
	     	proName : 'PRO_PM_WORKORDER_MOD_INSERT',
	     	returnStr : 'V_CURSOR',
	     	returnStrType : 's'
    	
        }, success: function (resp) {
            if (resp.mes == 'Success') {
                Ext.example.msg('操作信息', '{0}', '导入失败');
            } else {
                Ext.example.msg('操作信息', '{0}', '导入成功');
                
                window.close();
            }
        }
    });
}
