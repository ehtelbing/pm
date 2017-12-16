Ext.define('com.store.TreeStore', {

    extend: 'Ext.data.TreeStore',

    storeId:'TreeStore',
    /*root: {

    expanded: true,

    children: [
    { text: '部门1', id: '1', leaf: true },
    { text: '部门2', id: '2',
    children: [
    { text: '部门2-1', leaf: true, id: '2.1' },
    { text: '部门2-1', leaf: true, id: '2.2' }
    ]
    },
    { text: '部门3', leaf: true, id: "3" },
    { text: '部门4', leaf: true, id: "4" },
    { text: '部门5', leaf: true, id: "5" }
    ]
    }*/
    proxy: {
        type: 'ajax',
        url: 'Tree', //必须要搭建个服务器才可以访问json，不然会报错。拒绝访问
        actionMethods: { create: 'POST' }
    },
    reader: {
        type: 'json'
    },
    root: {
        text: 'root',
        id: '0'
    }
})