Ext.define("com.store.ComboStore", {
    //storeId: 'comboStore',
    extend: 'Ext.data.Store',
   
    //autoLoad: true,

    //fields: ['Item1', 'Item2'],
    fields: ['EMPNAME', 'USERCODE'],
    proxy: {
        type: 'ajax',
        url: 'ModelSelect',
        actionMethods: { create: 'POST' }
         ,
        reader: {
            type: 'json',
            root: 'list',
            totalProperty: 'totalProperty'
        },
        extraParams: {
        /*
            parName: [],
            parType: [],
            parVal: [],
            proName: "EX_SCJS_GETQMLIST",
            cursorName: "P_CUR"      */

         
        }

    }

});