Ext.onReady(function () {
    var splantname = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'splantname',
        width:'50%',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            
            url:AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
         
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                 V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                 V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                 V_V_DEPTCODENEXT: '%',
                 V_V_DEPTTYPE: '[基层单位]'
            }
        }
    });

    var tree1 = Ext.create('Ext.tree.Panel', {
        id: 'tree1',
        region:'center',
        height: 400,
        rootVisible: false,
        autoLoad: false,
        columnWidth: 0.5,
        border:false,
        autoScroll: true,
        store: Ext.create('Ext.data.TreeStore', {
            fields: ['id', 'text', 'parentid']
        })
    });
    var panel1= Ext.create('Ext.panel.Panel', {
        border: false,
        region:'west',
        width:'50%',
        layout:'border',
        items:[{ xtype: 'panel',region:'north', bodyPadding: 5, layout: 'column',frame:true,
            items: [
                {id:'tree1hidden',xtype:'hidden'},
                { id: 'plantname', xtype: 'combo', store: splantname, fieldLabel: '选择厂矿', labelAlign:'right', labelWidth: 65, displayField: 'V_DEPTNAME', valueField: 'V_DEPTCODE', queryMode: 'local'}
            ]
        },tree1]
    });

    var tree2 = Ext.create('Ext.tree.Panel', {
        id: 'tree2',
        region:'center',
        rootVisible: false,
        height: 400,
        border: false,
        autoLoad: false,
        autoScroll: true,
        store: Ext.create('Ext.data.TreeStore', {
            fields: ['id', 'text', 'parentid']
        }),
        listeners: {
            checkchange: function (node, isCheck, eOpts) {
                if (isCheck == true) {
                    Ext.Ajax.request({
                        url:AppUrl + 'pm_19/PRO_BASE_DEPTTOSAPCSAT_SET',
                        method: 'POST',
                        params: {
                            V_V_DEPTCODE:Ext.ComponentManager.get("tree1hidden").getValue(),
                            V_V_CBZX:node.data.id
                        },
                        success: function () {}
                    });
                } else {
                    Ext.Ajax.request({
                        url:AppUrl + 'pm_19/PRO_BASE_DEPTTOSAPCSAT_DEL',
                        method: 'POST',
                        params: {
                            V_V_DEPTCODE:Ext.ComponentManager.get("tree1hidden").getValue(),
                            V_V_CBZX:node.data.id
                        },
                        success: function () {}
                    });
                }
            }
        }
    });
    var panel2= Ext.create('Ext.panel.Panel', {
        border: false,
        region:'center',
        layout:'border',
        items:[{ xtype: 'panel',region:'north', layout: 'column',frame:true,
            items: [
                {xtype: 'textfield', id: 'ywfw',fieldLabel:'业务范围编码',labelAlign:'right', readOnly: 'true',margin:'5px 0px 5px 5px'}
            ]
        },tree2]
    });
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        border:false,
        items: [panel1,panel2]
    });

    splantname.on("load", function () {
        Ext.getCmp("plantname").select(splantname.getAt(0));
    });


    Ext.getCmp("plantname").on("change", function () {
        Ext.getCmp('tree1').store.setProxy({
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            url: AppUrl+'pm_19/PRO_BASE_DEPT_VIEW_ROLE',
            extraParams: {
                V_V_PERSONCODE:Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE:Ext.ComponentManager.get("plantname").getValue(),
                V_V_DEPTCODENEXT:Ext.util.Cookies.get('v_orgCode'),
                V_V_DEPTTYPE: '[主体作业区]'
            }
        });
        Ext.getCmp('tree1').store.load();
        setlabel();
    });
    Ext.getCmp("tree1").on('itemclick', function (view, node) {
        Ext.ComponentManager.get("tree1hidden").setValue(node.data.id);
        if (Ext.ComponentManager.get("ywfw").getValue() != "") {
        	Ext.getCmp('tree2').store.setProxy({
                type: 'ajax',
                actionMethods: { read: 'POST' },
                url: AppUrl+'pm_19/PRO_SAP_PM_CSAT_VIEW',
                extraParams: {
                    V_V_DEPTCODE:node.data.id,
                    V_V_YWFW:Ext.ComponentManager.get("ywfw").getValue()
                }
            });
            Ext.getCmp('tree2').store.load();
        } else {
            Ext.getCmp('tree2').store.setProxy({
                type: 'ajax',
                actionMethods: { read: 'POST' },
                url: AppUrl+'pm_19/PRO_SAP_PM_CSAT_VIEW',
                extraParams: {
                    V_V_DEPTCODE:-1,
                    V_V_YWFW: -1
                }
            });
            Ext.getCmp('tree2').store.load();
        }
    });
     
})

function setlabel() {
    Ext.ComponentManager.get("ywfw").setValue("");
    Ext.Ajax.request({
        url:AppUrl + 'pm_19/PRO_SAP_PM_YWFW_VIEW',
        method: 'POST',
        params: {
            V_V_DEPTCODE:Ext.ComponentManager.get("plantname").getValue()
        },
        success: function (ret) {
            var resp = Ext.JSON.decode(ret.responseText);
            if (resp.list != "") {
                Ext.ComponentManager.get("ywfw").setValue(resp.list[0].V_YWFW);
            }
            Ext.getCmp('tree2').store.setProxy({
                type: 'ajax',
                actionMethods: { read: 'POST' },
                url: AppUrl+'pm_19/PRO_SAP_PM_CSAT_VIEW',
                extraParams: {
                    V_V_DEPTCODE:Ext.ComponentManager.get("plantname").getValue(),
                    V_V_YWFW:Ext.ComponentManager.get("ywfw").getValue()
                }
            });
            Ext.getCmp('tree2').store.load();
        }
    });
}