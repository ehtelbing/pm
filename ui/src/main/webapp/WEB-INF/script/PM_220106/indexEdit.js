//年份
var years = [];
for (var i = date.getFullYear() - 4; i <= date.getFullYear() + 1; i++) {
    years.push({displayField: i, valueField: i});
}
var yearStore = Ext.create("Ext.data.Store", {
    storeId: 'yearStore',
    fields: ['displayField', 'valueField'],
    data: years,
    proxy: {
        type: 'memory',
        reader: {type: 'json'}
    }
});
Ext.onReady(function(){

    var gridStore = Ext.create('Ext.data.TreeStore', {
        id: 'gridStore',
        autoLoad: false,
        fields: ['ID_GUID', 'ORGCODE', 'ORGNAME', 'DEPTCODE', 'DEPTNAME', 'ZYCODE', 'ZYNAME', 'EQUCODE', 'V_EQUNAME', 'EQUTYPE', '',
            'V_EQUTYPENAME', 'REPAIRCONTENT', 'PLANHOUR', 'REPAIRTYPE', 'REPAIRTYPENAME', 'INPERCODE', 'INPERNAME', 'INDATE',
            'STATE', 'V_BASENAME', 'REMARK', 'V_FLOWCODE', 'V_FLOWTYPE', 'MXCODE', 'PLANTYPE', 'V_YEAR', 'V_MONTH',
            'PLANTJMONTH', 'PLANJGMONTH', 'WXTYPECODE', 'WXTYPENAME', 'PTYPECODE', 'PTYPENAME', 'PLANDAY', 'REDEPTCODE', 'REDEPTNAME',
            'FZPERCODE', 'FZPERNAME', 'SGTYPECODE', 'SGTYPENAME', 'SCLBCODE', 'SCLBNAME', 'PRO_NAME', 'YEARID'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'tree/PM_PLAN_YEAR_SEL_FJ',
            actionMethods: {
                read: 'POST'
            }
        },
        reader: {
            type: 'json',
            root: 'list'
        }
        , root: {
            text: 'root',
            expanded: true
        }
    });
    var panel=Ext.create('Ext.panel.Panel',{
        id:'panel',
        region:'north',
        layout:'column',
        items:[
            {
                xtype: 'combo',
                id: 'nf',
                fieldLabel: '年份',
                editable: false,
                margin: '5 0 5 5',
                labelWidth: 80,
                width: 250,
                displayField: 'displayField',
                valueField: 'valueField',
                value: new Date().getFullYear(),
                store: yearStore,
                labelAlign: 'right',
                queryMode: 'local'
            }
            ,{
                xtype: 'button',
                text: '查询',
                icon: imgpath + '/search.png',
                handler: queryGrid
            // ,style: 'margin: 12px 0px 0px 10px'

            }
        ]
    });
    var grid=Ext.create('Ext.tree.Panel',{

    });
    Ext.create('Ext.container.Viewport',{
        id: "id",
        layout: 'border',
        items: [panel, grid]
    });
});