var V_V_PERSONCODE=Ext.util.Cookies.get('v_personcode');
var defectguid;
Ext.onReady(function () {
    var ckStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        storeId: 'ckStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                'V_V_PERSONCODE': Ext.util.Cookies.get('v_personcode'),
                'V_V_DEPTCODE': Ext.util.Cookies.get('v_orgCode'),
                'V_V_DEPTCODENEXT': '%',
                'V_V_DEPTTYPE': '基层单位'
            }
        }
    });

    var panel=Ext.create('Ext.panel.Panel',{
        region:'center',
        layout:'vbox',
        frame:true,
        width:'100%',
        items:[{xtype: 'combo',id: 'ck',store:ckStore,fieldLabel: '计划厂矿',labelAlign: 'right',editable: false, margin: '5 0 5 5',labelWidth:75,width:255,displayField: 'V_DEPTNAME',valueField: 'V_DEPTCODE',queryMode: 'local'}
           ]
    });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [panel]
    })
})