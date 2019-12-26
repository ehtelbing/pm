//var P_ID = '000000003300001577';//主页面传入的V_V_ECODE
var P_ID = null;//解析URL参数
var P_DT = null;//解析URL参数
var P_DD = null;//解析URL参数
var P_ET = null;//解析URL参数
var P_EN = null;//解析URL参数
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.P_ID != undefined) ? P_ID = parameters.P_ID : "";
    (parameters.P_DT != undefined) ? P_DT = parameters.P_DT : "";
    (parameters.P_DD != undefined) ? P_DD = parameters.P_DD : "";
    (parameters.P_ET != undefined) ? P_ET = parameters.P_ET : "";
    (parameters.P_EN != undefined) ? P_EN = parameters.P_EN : "";
}
var attachDicRoot = {
    V_ATTACHNAME: '附件类型'
};

Ext.define('Ext.ux.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    async: true,
    doRequest: function (operation, callback, scope) {
        var writer = this.getWriter(),
            request = this.buildRequest(operation);
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        Ext.apply(request, {
            async: this.async,
            binary: this.binary,
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, callback, scope),
            method: this.getMethod(request),
            disableCaching: false
        });
        Ext.Ajax.request(request);
        return request;
    }
});
Ext.onReady(function () {
    Ext.getBody().mask('<p>页面载入中...</p>');

    //附件树图store
    var attachDicStore = Ext.create('Ext.data.TreeStore', {
        storeId: 'attachDicStore',
        autoLoad: false,
        loading: false,
        root: {},//保证autoload有效，自动加载或者不自动加载
        pageSize: 20,
        fields: ['I_ID','V_ATTACHNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            url: AppUrl + 'specEquip/selectAttachDic',
            type: 'ajax',
            async: false,//false=同步
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        })
    });

    //附件列表store
    var attachGetStore = Ext.create('Ext.data.Store', {
        storeId: 'attachGetStore',
        autoLoad: false,
        loading: false,
        pageSize: 20,
        fields: ['I_ID', 'V_FILENAME', 'V_UPMAN', 'V_UPDATE', 'V_ORGNAME', 'V_DEPTNAME', 'V_EQUTYPENAME', 'V_EQUNAME', 'V_REPORTNAME'],
        proxy: {
            url: AppUrl + 'specEquip/selectEquFilesAttach',
            type: 'ajax',
            async: true,
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
            },
            reader: {
                type: 'json',
                root: 'list',
                totalProperty: 'total'
            }
        }
    });

    // //附件列表store
    // var attachNodeStore = Ext.create('Ext.data.Store', {
    //     storeId: 'attachNodeStore',
    //     autoLoad: false,
    //     loading: false,
    //     pageSize: 20,
    //     fields: ['V_FILENAME', 'V_UPMAN', 'V_UPDATE'],
    //     proxy: {
    //         url: AppUrl + 'specEquip/selectAttachNode',
    //         type: 'ajax',
    //         async: true,
    //         actionMethods: {
    //             read: 'POST'
    //         },
    //         extraParams: {
    //         },
    //         reader: {
    //             type: 'json',
    //             root: 'list',
    //             totalProperty: 'total'
    //         }
    //     }
    // });

    //输入框panel
    var formPanel = Ext.create('Ext.form.Panel', {
        id: 'formPanel',
        layout: 'column',
        frame: true,
        autoScroll: true,
        defaults: {
            labelAlign: 'right',
            labelWidth: 100,
            inputWidth: 100 ,
            margin: '4,0,0,0'
        },
        items: [{
            xtype: 'displayfield',
            id: 'V_ORGNAME',
            name: 'V_ORGNAME',
            fieldLabel: '厂矿',
            maxLength: 20,
            value : P_DT
        }, {
            xtype: 'displayfield',
            id: 'V_DEPTNAME',
            name: 'V_DEPTNAME',
            fieldLabel: '作业区',
            maxLength: 20,
            value : P_DD
        }, {
            xtype: 'displayfield',
            id: 'V_EQUTYPENAME',
            name: 'V_EQUTYPENAME',
            fieldLabel: '设备类型',
            maxLength: 20,
            value : P_ET
        }, {
            xtype: 'displayfield',
            id: 'V_EQUNAME',
            name: 'V_EQUNAME',
            fieldLabel: '设备名称',
            maxLength: 20,
            value : P_EN
        }]
    });

    //附件树图panel
    var attachDicPanel = Ext.create('Ext.tree.Panel', {
        id: 'attachDicPanel',
        store: attachDicStore,
        title: '附件类型',
        rootVisible: true,
        hideHeaders: false,
        rowLines: false,
        columnLines: false,
        frame: true,
        animate: !Ext.isIE,
        // selModel: {
        //     selType: 'checkboxmodel',
        //     mode: 'SINGLE'
        // },
        columns: [{
            xtype: 'treecolumn',
            text: '附件类型名称',
            dataIndex: 'V_ATTACHNAME',
            style: 'text-align: center;',
            flex: 1
        }],
        viewConfig: {
            emptyText: '<div style="text-align: center; padding-top: 50px; font: italic bold 20px Microsoft YaHei;">没有数据</div>',
            enableTextSelection: true
        },
        listeners: {
            'itemclick': function (view, record, item, index, e, eOpts) {
                _selectAttachFile(record.data.V_ATTACHNAME);
            }
        }
    });


    //附件列表panel
    var attachNodePanel = Ext.create('Ext.grid.Panel', {
        id: 'attachNodePanel',
        store: attachGetStore,
        title : '附件',
        columnLines: true,
        frame: true,
        // selModel: {
        //     selType: 'checkboxmodel',
        //     mode: 'SINGLE'
        // },
        columns: [{
            text: '附件名称',
            dataIndex: 'V_REPORTNAME',
            style: 'text-align: center;',
            align: 'center;',
            flex : 1,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                //return (value != null) ? '<a href=javascript:_loadEnclosure('+ rowIndex + ')>' + value + '</a>' : '';//超链接导出
                return '<a href="javascript:_downloadEquFilesAttach(\'' + record.data.I_ID + '\',\'' + record.data.V_REPORTNAME + '\')">' + value + '</a>';
            }
        },{
            text: '上传人',
            dataIndex: 'V_UPMAN',
            style: 'text-align: center;',
            align: 'center;',
            width: 60
        }, {
            text: '上传时间',
            dataIndex: 'V_UPDATE',
            style: 'text-align: center;',
            align: 'center;',
            width: 140,
            renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                return (value != null) ? value.substring(0,10) : '';
            }
        }],
        viewConfig: {
            emptyText: '<div style="text-align: center; padding-top: 50px; font: italic bold 20px Microsoft YaHei;"><spring:message code="noData" /></div>',
            enableTextSelection: true
        },
        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: attachGetStore,
            dock: 'bottom',
            displayInfo: true
        }]
    });


    //页面布局
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
            region: 'west',
            layout: 'fit',
            width: 300,
            items: [attachDicPanel]
        }, {
            region: 'center',
            layout: 'fit',
            items: [attachNodePanel]
        }]
    });
    _init();

});

function _init() {
    for (var i = 0; i < Ext.data.StoreManager.getCount(); i++) {
        if (Ext.data.StoreManager.getAt(i).isLoading()) {
            return;
        }
    }

    var attachDicStore = Ext.data.StoreManager.lookup('attachDicStore');//设置树的根节点
    attachDicStore.setRootNode(attachDicRoot);
    attachDicStore.getRootNode().expand();

    //_clickTree();
    _selectAttachFile('');

    Ext.getBody().unmask();
}

//点击树,查询附件panel
function _selectAttachFile(V_ATTACHNAME){
    var attachGetStore = Ext.data.StoreManager.lookup('attachGetStore');
    var attachDicStore = Ext.data.StoreManager.lookup('attachDicStore');
    if (V_ATTACHNAME == '' || V_ATTACHNAME == 'undefined'){
        attachGetStore.proxy.extraParams = {
            V_V_ATTACH_TYPE: attachDicStore.tree.root.childNodes[0].data.V_ATTACHNAME,
            V_V_ECODE: P_ID
        };
    }else{
        attachGetStore.proxy.extraParams = {
            V_V_ATTACH_TYPE: V_ATTACHNAME,
            V_V_ECODE: P_ID
        };
    }

    attachGetStore.currentPage = 1;
    attachGetStore.load();
}

//附件导出
function _downloadEquFilesAttach(I_ID, V_REPORTNAME) {
    document.location.href = AppUrl + 'specEquip/downloadEquFilesAttach?I_I_ID=' + I_ID + '&V_V_REPORTNAME=' + V_REPORTNAME;
}