/**
 * Created by Administrator on 17-4-3.
 */
//-----西面板及其组件


Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');

    //var codeStore = Ext.create('Ext.data.Store', {
    //    storeId: 'codeStore',
    //    autoLoad: true,//true为自动加载
    //    loading: true,//自动加载时必须为true
    //    pageSize: 20,
    //    fields: ['CODE_ID_', 'PARENT_CODE_ID_', 'CATEGORY_', 'CODE_', 'NAME_', 'EXT_ATTR_1_', 'EXT_ATTR_2_', 'EXT_ATTR_3_', 'ORDER_'],
    //    proxy: {
    //        url: 'selectCode.do',
    //        type: 'ajax',
    //        async: true,//false=同步
    //        actionMethods: {
    //            read: 'POST'
    //        },
    //        extraParams: {},
    //        reader: {
    //            type: 'json',
    //            root: 'codeList',
    //            totalProperty: 'total'
    //        }
    //    },
    //    listeners: {
    //        load: function (store, records, successful, eOpts) {
    //            _init();//自动加载时必须调用
    //        }
    //    }
    //});

    //var STATUS_CodeStore = Ext.create('Ext.data.Store', {
    //    storeId: 'STATUS_CodeStore',
    //    autoLoad: false,
    //    fields: ['CODE_ID_', 'PARENT_CODE_ID_', 'CATEGORY_', 'CODE_', 'NAME_', 'EXT_ATTR_1_', 'EXT_ATTR_2_', 'EXT_ATTR_3_', 'ORDER_']
    //});
    var comboStore = Ext.create('Ext.data.Store', {
        storeId: 'comboStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['year'],
        proxy: {
            url: 'selectAsse.do',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'asseList',
                totalProperty: 'total'
            }
        }
    });
    var gridStore = Ext.create('Ext.data.Store', {
        storeId: 'gridStore',
        autoLoad: true,//true为自动加载
        loading: true,//自动加载时必须为true
        pageSize: 20,
        fields: ['ASSET0', 'ASSET1', 'ASSET2', 'ASSET3', 'ASSET4'],
        data: [[' '], [' '], [' '], [' '], [' ']
        ]
        //proxy: {
        //    url: 'selectAssetType.do',
        //    type: 'ajax',
        //    async: true,//false=同步
        //    actionMethods: {
        //        read: 'POST'
        //    },
        //    extraParams: {},
        //    reader: {
        //        type: 'json',
        //        root: 'assetTypeList',
        //        totalProperty: 'total'
        //    }
        //}
    });


    var zuoshangStore = Ext.create('Ext.data.Store', {
        storeId: 'zuoshangStore',
        autoLoad: false,
        pageSize: 2,
        fields: ['data_'],
        data: [['M'], ['S'], ['P'],
            [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '],
            [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '],
            [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '],
            [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']
        ]
    });


    var formPanel = Ext.create('Ext.form.Panel', {
        id: 'formPanel',
        title: '<div align="center">精密点检年计划发起</div>',
        layout: 'column',
        frame: true,
        autoScroll: true,
        defaults: {
            labelAlign: 'right',
            labelWidth: 40,
            inputWidth: 140,
            style: 'margin:5px 0px 5px 10px'
        },
        items: [{
            xtype: 'combo',
            name: 'year',
            store: comboStore,
            queryMode: 'local',
            valueField: '',
            displayField: '',
            emptyText: '全部',
            forceSelection: true,
            fieldLabel: '年份',
            style: 'margin:5px 0px 5px 20px'
        }, {
            xtype: 'button',
            style: 'margin:5px',
            // icon: imgpath + '/search.png',
            width: 60,
            text: '查询',
            style: 'margin:5px 0px 5px 20px'

            //handler: _selectAsse
        }, {
            xtype: 'button',
            width: 60,
            text: '发起'
            //handler: _preInsertAsse
        }]
    });


    //var buttonPanel = Ext.create('Ext.Panel', {
    //    id: 'buttonPanel',
    //    defaults: {
    //        style: 'margin: 2px;'
    //    },
    //    items: [{
    //        xtype: 'button',
    //        text: '查询'
    //        //handler: _selectAsse
    //    }, {
    //        xtype: 'button',
    //        text: '发起'
    //        //handler: _preInsertAsse
    //    }]
    //});


    var assePanel = Ext.create('Ext.grid.Panel', {

        id: 'assePanel',
        store: gridStore,
        //title: '厂矿',
        columnLines: true,
        frame: true,
        // selModel: {
        //     selType: 'checkboxmodel',
        //     mode: 'simple'
        // },
        columns: [{
            text: '厂矿',
            dataIndex: 'ASSET0',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '厂矿接收人',
            dataIndex: 'ASSET1',
            style: 'text-align: center;',
            flex: 1
        }, {
            text: '发起人',
            dataIndex: 'ASSET2',
            style: 'text-align: center;',
            flex: 2
        }, {
            text: '发起时间',
            dataIndex: 'ASSET3',
            style: 'text-align: center;',
            flex: 2
        }, {
            text: '流程状态',
            dataIndex: 'ASSET4',
            style: 'text-align: center;',
            flex: 2
        }],
        viewConfig: {
            emptyText: '<div style="text-align: center; padding-top: 50px; font: italic bold 20px Microsoft YaHei;"><spring:message code="noData" /></div>',
            enableTextSelection: true
        }

    });

    Ext.create('Ext.container.Viewport', {
        layout: {
            type: 'border',
            regionWeights: {
                west: -1,
                north: 1,
                south: 1,
                east: -1
            }
        },
        defaults: {
            border: false
        },
        items: [{
            region: 'north',
            items: [formPanel]
        }, {
            region: 'center',
            layout: 'fit',
            items: [assePanel]
        }]
    });

    _init();
});

function _init() {
    if (true) {

        Ext.getBody().unmask();
    }
}

//function _init() {
//    for (var i = 0; i < Ext.data.StoreManager.getCount(); i++) {//检查是否所有自动加载数据全部加载完毕
//        if (Ext.data.StoreManager.getAt(i).isLoading()) {
//            return;
//        }
//    }

//var codeStore = Ext.data.StoreManager.lookup('codeStore');//组装子代码数据
//var STATUS_CodeStore = Ext.data.StoreManager.lookup('STATUS_CodeStore');
//codeStore.filter('CATEGORY_', new RegExp('^STATUS$'));
//STATUS_CodeStore.add(codeStore.getRange());
//STATUS_CodeStore.insert(0, {});
//codeStore.clearFilter();

//_selectAsse();//查询加载主表数据


//function _selectAsse() {//查询主表数据
//    var asseStore = Ext.data.StoreManager.lookup('asseStore');
//    var item;
//    /*  for (var i = 0; i < Ext.getCmp('formPanel').items.length; i++) {
//     item = Ext.getCmp('formPanel').items.get(i);
//     asseStore.proxy.extraParams[item.getName()] = item.getSubmitValue();
//     }*/
//    asseStore.proxy.extraParams.ASSET_TYPE_ = ASSET_TYPE_;
//
//
//    asseStore.currentPage = 1;
//    asseStore.load();
//}

//function _preInsertAsse() {//新增
//    returnValue = null;
//    win = Ext.create('Ext.window.Window', {
//        title: '<spring:message code="insert" /><spring:message code="ASSE" />',
//        modal: true,
//        autoShow: true,
//        maximized: false,
//        maximizable: true,
//        width: 560,
//        height: 420,
//        html: '<iframe src="preInsertAsse.do" style="width: 100%; height: 100%;" frameborder="0"></iframe>',
//        listeners: {
//            close: function (panel, eOpts) {
//                if (returnValue != null) {
//                    var asse = returnValue;
//                    Ext.data.StoreManager.lookup('asseStore').add(asse);//前台新增数据
//
//                    top.banner.Toast.alert('<spring:message code="info" />', '<spring:message code="success" />', 1000);
//                }
//            }
//        }
//    });
//}


