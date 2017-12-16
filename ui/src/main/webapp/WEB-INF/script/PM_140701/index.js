var IN_DEPARTCODE = "";
var V_V_GUID = "";
if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.IN_DEPARTCODE == undefined) ? IN_DEPARTCODE = '' : IN_DEPARTCODE = parameters.IN_DEPARTCODE;
    (parameters.V_V_GUID == undefined) ? V_V_GUID = '' : V_V_GUID = parameters.V_V_GUID;
}
Ext.onReady(function () {
    //这里是解决同步，异步问题的一段代码
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

    var chaxunStore = Ext.create('Ext.data.Store', {
        storeId: 'chaxunStore',
        autoLoad: true,
        fields: ['V_CLASS_CODE', 'V_CLASS_NAME', 'V_SAP_WORK', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_14/PRO_CLASS_M_QUERY',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {
                IN_DEPARTCODE: IN_DEPARTCODE,
                IN_CLASSNAME: ""
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }, listeners: {
            load: function (store, records) {

            }
        }
    });

    var windowchaxunStore = Ext.create('Ext.data.Store', {
        id: 'windowchaxunStore',
        autoLoad: false,
        pageSize: 25,
        fields: ['V_PERSONCODE', 'V_PERSONNAME', 'V_CLASS_NAME', 'V_ROLECODE'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            async: false,
            type: 'ajax',
            url: AppUrl + 'PM_14/PRO_CLASS_M_QUERY_P',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        })
    });

    var panel2 = Ext.create('Ext.panel.Panel', {
        region: 'north',
        width: '100%',
        border: false,
        frame: true,
        layout: 'column',
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: "bzxz",
                editable: false,
                queryMode: 'local',
                fieldLabel: '班组选择',
                labelWidth: 83,
                width: 212,
                style: ' margin: 10px 5px 10px 10px',
                labelAlign: 'right'
            }, {
                xtype: 'button',
                text: '查询',
                width: 70,
                handler: _selectdataList,
                style: ' margin: 10px 5px 10px 10px',
                icon: imgpath + '/search.png'
            }, {
                xtype: 'button',
                text: '选择',
                width: 70,
                handler: _xuanze,
                style: ' margin: 10px 5px 10px 10px',
            }]
        }]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        id: 'grid',
        store: chaxunStore,
        width: "100%",
        height: "86%",
        border: false,
        columnLines: true,
        region: 'center',
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGLE'
        },
        columns: [{
            text: '班组编号',
            dataIndex: 'V_CLASS_CODE',
            flex: 1,
            align: 'center'
        }, {
            text: '班组名称',
            dataIndex: 'V_CLASS_NAME',
            flex: 1,
            align: 'center'
        }, {
            text: '工作中心',
            dataIndex: 'V_SAP_WORK',
            flex: 1,
            align: 'center'
        }, {
            text: '作业区',
            dataIndex: 'V_DEPTNAME',
            flex: 1,
            align: 'center'
        }, {
            text: '人员',
            flex: 1,
            align: 'center',
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                return '<a href="javascript:;" onclick="_show(\'' + store.getAt(rowIndex).data.ID + '\')">查看</a>';
            }
        }]
    });

    var gridWindow = Ext.create('Ext.window.Window', {
        id: 'gridWindow',
        closeAction: 'show',
        closable: true,
        height: 400,
        width: 500,
        layout: {
            type: 'hbox',
            align: 'middle ',
            pack: 'center'
        },
        modal: true,
        frame: true,
        layout: 'vbox',
        items: [{
            id: "windowGridPlane",
            xtype: 'grid',
            border: false,
            columnLines: true,
            region: 'center',
            height: 400,
            width: '100%',
            store: windowchaxunStore,
            columns: [{
                xtype: 'rownumberer',
                text: '序号',
                align: 'center',
                flex: 1
            }, {
                text: '人员编号',
                dataIndex: 'V_PERSONCODE',
                align: 'center',
                flex: 1
            }, {
                text: '人员名称',
                dataIndex: 'V_PERSONNAME',
                align: 'center',
                flex: 1
            }, {
                text: '是否组长',
                dataIndex: 'V_ROLECODE',
                align: 'center',
                flex: 1,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                    if (value != '11') {
                        return '否';
                    }
                    return '是';
                }
            }, {
                text: '所在班组',
                dataIndex: 'V_CLASS_NAME',
                align: 'center',
                flex: 1
            }]
        }],
        bbar: ["->",
            {
                xtype: 'pagingtoolbar',
                store: windowchaxunStore,
                dock: 'bottom',
                displayInfo: true,
                displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
                emptyMsg: '没有记录'
            }, {
                xtype: 'button',
                text: '关闭',
                handler: _close,
                icon: imgpath + '/delete.png'
            }]
    });

    Ext.create('Ext.Viewport', {
        layout: 'border',
        frame: true,
        title: 'Ext Layout Browser',
        items: [{
            layout: 'border',
            id: 'id',
            region: 'center',
            border: false,
            split: true,
            margins: '2 0 0 0',
            width: "90%",
            minSize: 100,
            maxSize: 500,
            items: [panel2, grid]
        }],
        renderTo: Ext.getBody()
    });
});

function _selectdataList() {
    var chaxunStore = Ext.data.StoreManager.lookup('chaxunStore');
    chaxunStore.proxy.extraParams = {
        IN_DEPARTCODE: IN_DEPARTCODE,
        IN_CLASSNAME: Ext.getCmp("bzxz").getValue()
    }
    chaxunStore.load();
}

function _show() {
    var records = Ext.getCmp('grid').getSelectionModel().getSelection();
    var windowchaxunStore = Ext.data.StoreManager.lookup('windowchaxunStore');
    windowchaxunStore.proxy.extraParams = {
        IN_CLASSCODE: records[0].get('V_CLASS_CODE')
    }
    windowchaxunStore.load();
    Ext.getCmp('gridWindow').show();
}

function _close() {
    Ext.getCmp('gridWindow').close();
}

function _xuanze() {
    var records = Ext.getCmp('grid').getSelectionModel().getSelection();
    if (records.length == 0) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择班组',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

    //想获得人员编码的集合需要先加载查看人员的数据集，这里加载数据集
    var windowchaxunStore = Ext.data.StoreManager.lookup('windowchaxunStore');
    windowchaxunStore.proxy.extraParams = {
        IN_CLASSCODE: records[0].get('V_CLASS_CODE')
    }
    windowchaxunStore.load();

    //获取上面数据集中的所有人员的V_PERSONCODE字段的集合作为下面需要传递的参数
    var V_PERSONCODE_LIST = new Array();
    for (var i = 0; i < windowchaxunStore.getCount(); i++) {
        V_PERSONCODE_LIST.push(windowchaxunStore.getAt(i).get('V_PERSONCODE'));
    }

    Ext.MessageBox.show({
        title: '确认',
        msg: '请确认是否指派',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESTION,
        fn: function (btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    url: AppUrl + 'PM_14/PM_14_FAULT_PER_CLASS_SET',
                    type: 'ajax',
                    method: 'POST',
                    async: false,
                    params: {
                        V_V_CLASSCODE: records[0].get('V_CLASS_CODE'),
                        V_V_GUID: V_V_GUID,
                        V_PERSONCODE_LIST: V_PERSONCODE_LIST
                    },
                    success: function (response) {
                        var data = Ext.decode(response.responseText);
                        if (data.success) {
                            if (data.RET == 'Success') {
                                window.opener._selectList();
                                window.close();
                            } else {
                                Ext.MessageBox.show({
                                    title: '错误',
                                    msg: data.message,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                            }
                        } else {
                            Ext.MessageBox.show({
                                title: '错误',
                                msg: data.message,
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                        }
                    },
                    failure: function (response) {
                        Ext.MessageBox.show({
                            title: '错误',
                            msg: response.responseText,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                    //123123123

                });
            }
        }
    });
}