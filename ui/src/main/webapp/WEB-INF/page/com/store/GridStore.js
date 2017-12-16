/*Model定义数据源(传参)并读取数据*/
Ext.define("com.store.GridStore", {

    extend: 'Ext.data.Store',
    storeId: 'gridStore',

    fields: ['ID','SUNDAY','MONDAY', 'RECORDTIME', 'RECORDPERSON',  'RECORDPROBLEM', 'HANDLEMEASURE',
              'HANDLEPERSON', 'ISCHECK', 'CHECKSTANDARD', 'CHECKPERSON', 'KAOHE'],

    pageSize:'15',
    proxy: {
        type: 'ajax',
        url: 'ModelSelect',
        actionMethods: { create: 'POST' }
        , 
        reader: {
            type: 'json',
            root: 'list',
            total: 'total'
        }
    }
});

