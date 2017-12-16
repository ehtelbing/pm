var orgStoreLoad = false;
var deptStoreLoad = false;
var sbTypeStoreLoad = false;
var sbNameStoreLoad = false;
var ProcessTypeStoreLoad =false;
var initLoad = true;
var V_V_EDIT_GUID = '';
var V_PICGUID = '';
var sh = window.screen.height / 2 - 10;
var sw = window.screen.width / 2 + 220;

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
    Ext.getBody().mask('<p>页面载入中...</p>');//页面笼罩效果

    var ProcessTypeStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'ProcessTypeStore',
        fields: ['V_FLOWTYPE_CODE', 'V_FLOWTYPE_NAME'],
        proxy:{
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PM_FLOW_TYPE_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
            }
        },
        listeners: {
            load: function (store, records) {
                store.insert(0, {
                    'V_FLOWTYPE_CODE': '%',
                    'V_FLOWTYPE_NAME': '全部'
                });
                Ext.getCmp('lclx').select(store.first());
                ProcessTypeStoreLoad = true;
                _init();
            }
        }
    });

    var addProcessTypeStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'addProcessTypeStore',
        fields: ['V_FLOWTYPE_CODE', 'V_FLOWTYPE_NAME'],
        proxy:{
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PM_FLOW_TYPE_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('addlclx').select(store.first());

            }
        }
    });

    var updateProcessTypeStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'updateProcessTypeStore',
        fields: ['V_FLOWTYPE_CODE', 'V_FLOWTYPE_NAME'],
        proxy:{
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PM_FLOW_TYPE_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('updatelclx').select(store.first());
            }
        }
    });

    var gridStore = Ext.create('Ext.data.Store', {
        storeId: 'gridStore',
        autoLoad: false,
        pageSize: 15,
        fields: ['V_ACTIVITI_CODE','V_ACTIVITI_NAME', 'V_FLOW_TYPE', 'V_FALG', 'V_INPER_CODE', 'V_INPER_NAME', 'V_INDATE', 'V_ACTIVITI_IMG', 'V_GUID'],
        proxy: {
            url: AppUrl + 'hp/PM_ACTIVITI_PROCESS_SEL',
            type: 'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams: {},
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        }
    });

    var inputPanel = Ext.create('Ext.form.Panel', {
        id: 'inputPanel',
        layout: 'column',
        frame: true,
        border: false,
        //baseCls: 'my-panel-no-border',
        items: [{
            xtype: 'panel',
            region: 'center',
            layout: 'column',
            border:false,
            frame: true,
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'lclx',
                xtype: 'combo',
                store: ProcessTypeStore,
                fieldLabel: '流程类型',
                editable: false,
                labelWidth: 100,
                displayField: 'V_FLOWTYPE_NAME',
                valueField: 'V_FLOWTYPE_CODE',
                queryMode: 'local',
                //baseCls: 'margin-bottom',
                style: ' margin: 5px 0px 5px 0px',
                labelAlign: 'right',
                width: 250
            } ]
        }
        ]
    });

    var gridPanel = Ext.create('Ext.grid.Panel', {
        id : 'gridPanel',
        store : gridStore,
        frame : true,
        columnLines : true,
        selModel: {
            selType: 'checkboxmodel',
            mode: 'SINGEL'
        },
        columns : [{
            xtype: 'rownumberer',
            text: '序号',
            width: 40,
            align: 'center'
        }, {
            text: '流程类型',
            dataIndex: 'V_FLOW_TYPE',
            align: 'center',
            width: 120,
            renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                var index = ProcessTypeStore.find('V_FLOWTYPE_CODE', value);
                if (index != -1) {
                    return ProcessTypeStore.getAt(index).get('V_FLOWTYPE_NAME');
                }
                return null;
            }
        }, {
            text: '流程编码',
            dataIndex: 'V_ACTIVITI_CODE',
            align: 'center',
            width: 150

        },{
            text: '流程名称',
            dataIndex: 'V_ACTIVITI_NAME',
            align: 'center',
            width: 150
        }, {
            text: '录入人',
            dataIndex: 'V_INPER_NAME',
            align: 'center',
            width: 80
        }, {
            text: '录入时间',
            dataIndex: 'V_INDATE',
            align: 'center',
            width: 150,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {//渲染
                return value.substring(0,10);
            }
        }],
        listeners: {
            // 当用户单击列表项时激发该函数
            itemclick: function(view, record, item, index, evt)  //①
            {
                _preViewImage(record.get('V_GUID'))

            }
        },
        bbar: [{
            id: 'page',
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            width: '100%',
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: 'gridStore'
        }]
    });

    var buttonPanel = Ext.create('Ext.Panel', {
        id : 'buttonPanel',
        defaults : {
            style : 'margin:2px',
            width : 70
        },
        items : [{
            xtype : 'button',
            text : '查询',
            icon: imgpath + '/search.png',
            handler : _select
        },{
            xtype : 'button',
            text : '添加',
            icon: imgpath + '/add.png',
            handler : _preAddView
        },{
            xtype : 'button',
            text : '修改',
            icon: imgpath + '/edit.png',
            handler : _preUpdateView
        },{
            xtype : 'button',
            text : '删除',
            icon: imgpath + '/delete.png',
            handler : _delete
        }
        ]
    });

    /*var viewImagePanel = Ext.create("Ext.panel.Panel", {
        id: 'viewImagePanel',
        editable: false,
        html: "<div id = 'yulan'> <table border='0' width='100%' height='100%'><tr> <td> </td><td> <img src='" + imgpath + "/sblj.jpg' width= '" + '100%' + "' height='" + '100%' + "' /> </td> <td> </td> </tr> <tr> <td></td> <td align='center'></td> <td></td> </tr> </table> </div>",
        style: ' margin: -1px 0px 0px 0px',
        columnLines: true
    });*/



    var viewImagePanel = Ext.create("Ext.form.Panel", {
        id: 'viewImagePanel',
        editable: false,
        region: 'center',
        items: [{
            layout: 'column',
            defaults: {
                labelAlign: 'right'
            },
            items: [{
                xtype: 'box',
                id: 'browseImage',
                fieldLabel: "预览图片",
                autoEl: {
                    width: window.screen.width / 2 - 110,
                    height: window.screen.height / 2 + 38,
                    tag: 'input',
                    type: 'image',
                    src: Ext.BLANK_IMAGE_URL,
                    style: 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale); border:1px solid #bebebe; margin-left: 0px;margin-top: 0px;',
                    // complete: 'off',
                    id: 'imageBrowse',
                    name: 'imageBrowse'
                }
            }]
        }]
    });

    var addInputPanel = Ext.create('Ext.form.Panel', {
        id: 'addInputPanel',
        region: 'center',
        layout: 'vbox',
        frame: true,
        border: false,
        //title : '流程管理',
        baseCls: 'my-panel-no-border',
        items: [
            {
                xtype: 'panel',
                region: 'center',
                layout: 'column',
                border:false,
                frame: true,
                baseCls: 'my-panel-no-border',
                items: [{
                    id: 'addlclx',
                    xtype: 'combo',
                    store: addProcessTypeStore,
                    fieldLabel: '流程类型',
                    editable: false,
                    labelWidth: 100,
                    displayField: 'V_FLOWTYPE_NAME',
                    valueField: 'V_FLOWTYPE_CODE',
                    queryMode: 'local',
                    //baseCls: 'margin-bottom',
                    style: ' margin: 5px 0px 0px 0px',
                    labelAlign: 'right',
                    width: 250
                } ]
            },{
                xtype: 'panel',
                region: 'center',
                layout: 'column',
                border:false,
                frame: true,
                baseCls: 'my-panel-no-border',
                items: [{
                    id: 'addlcbm',
                    xtype: 'textfield',
                    fieldLabel: '流程编码',
                    editable: false,
                    labelWidth: 100,
                    queryMode: 'local',
                    //baseCls: 'margin-bottom',
                    style: ' margin: 5px 0px 0px 0px',
                    labelAlign: 'right',
                    width: 250
                } ]
            },{
                xtype: 'panel',
                region: 'center',
                layout: 'column',
                border:false,
                frame: true,
                baseCls: 'my-panel-no-border',
                items: [{
                    id: 'addlcmc',
                    xtype: 'textfield',
                    fieldLabel: '流程名称',
                    editable: false,
                    labelWidth: 100,
                    queryMode: 'local',
                    //baseCls: 'margin-bottom',
                    style: ' margin: 5px 0px 0px 0px',
                    labelAlign: 'right',
                    width: 250
                } ]
            },{
                xtype: 'panel',
                region: 'center',
                layout: 'column',
                border:false,
                frame: true,
                baseCls: 'my-panel-no-border',
                items: [{
                    xtype: 'filefield',
                    id: 'V_V_FILEBLOB',
                    name: 'V_V_FILEBLOB',
                    enctype: "multipart/form-data",
                    fieldLabel: '上传图片',
                    labelWidth: 100,
                    labelAlign: 'right',
                    inputWidth: 245,
                    style: ' margin: 5px 0px 0px 0px',
                    buttonText: '浏览....',
                    allowBlank: false
                }, {
                    xtype: 'hidden',
                    name: 'V_V_ACTIVITI_CODE',
                    id: 'V_V_ACTIVITI_CODE'
                }, {
                    xtype: 'hidden',
                    name: 'V_V_ACTIVITI_NAME',
                    id: 'V_V_ACTIVITI_NAME'
                }, {
                    xtype: 'hidden',
                    name: 'V_V_FLOW_TYPE',
                    id: 'V_V_FLOW_TYPE'
                }, {
                    xtype: 'hidden',
                    name: 'V_V_INPER_CODE',
                    id: 'V_V_INPER_CODE'
                }, {
                    xtype: 'hidden',
                    name: 'V_V_INPER_NAME',
                    id: 'V_V_INPER_NAME'
                },  {
                    xtype: 'hidden',
                    name: 'V_V_GUID',
                    id: 'V_V_GUID'
                }  ]
            },{
                xtype: 'panel',
                region: 'center',
                layout: 'column',
                border:false,
                frame: true,
                style: ' margin: 5px 0px 0px 100px',
                baseCls: 'my-panel-no-border',
                items: [{
                    xtype : 'button',
                    text : '保存',
                    icon: imgpath + '/filesave.png',
                    style: ' margin: 5px 0px 0px 5px',
                    handler : _addSave
                },{
                    xtype : 'button',
                    text : '取消',
                    icon: imgpath + '/cross.png',
                    style: ' margin: 5px 0px 0px 10px',
                     handler : _addClose
                } ]
            }
        ]
    });

    var updateInputPanel = Ext.create('Ext.form.Panel', {
        id: 'updateInputPanel',
        region: 'center',
        layout: 'vbox',
        frame: true,
        border: false,
        //title : '流程管理',
        baseCls: 'my-panel-no-border',
        items: [
            {
                xtype: 'panel',
                region: 'center',
                layout: 'column',
                border:false,
                frame: true,
                baseCls: 'my-panel-no-border',
                items: [{
                    id: 'updatelclx',
                    xtype: 'combo',
                    store: updateProcessTypeStore,
                    fieldLabel: '流程类型',
                    editable: false,
                    labelWidth: 100,
                    displayField: 'V_FLOWTYPE_NAME',
                    valueField: 'V_FLOWTYPE_CODE',
                    queryMode: 'local',
                    //baseCls: 'margin-bottom',
                    style: ' margin: 5px 0px 0px 0px',
                    labelAlign: 'right',
                    width: 250
                } ]
            },{
                xtype: 'panel',
                region: 'center',
                layout: 'column',
                border:false,
                frame: true,
                baseCls: 'my-panel-no-border',
                items: [{
                    id: 'updatelcmc',
                    xtype: 'textfield',
                    fieldLabel: '流程名称',
                    editable: false,
                    labelWidth: 100,
                    queryMode: 'local',
                    //baseCls: 'margin-bottom',
                    style: ' margin: 5px 0px 0px 0px',
                    labelAlign: 'right',
                    width: 250
                } ]
            },{
                xtype: 'panel',
                region: 'center',
                layout: 'column',
                border:false,
                frame: true,
                style: ' margin: 5px 0px 0px 100px',
                baseCls: 'my-panel-no-border',
                items: [{
                    xtype : 'button',
                    text : '保存',
                    icon: imgpath + '/filesave.png',
                    style: ' margin: 5px 0px 0px 5px',
                    handler : _updateSave
                },{
                    xtype : 'button',
                    text : '取消',
                    icon: imgpath + '/cross.png',
                    style: ' margin: 5px 0px 0px 10px',
                     handler : _updateClose
                } ]
            }
        ]
    });

    var window1 = Ext.create('Ext.window.Window', {
        id: 'window1',
        width: 500,
        height: 300,
        bodyPadding: 15,
        layout: 'vbox',
        title: '添加',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        items: [addInputPanel]
    });

    var window2 = Ext.create('Ext.window.Window', {
        id: 'window2',
        width: 500,
        height: 250,
        bodyPadding: 15,
        layout: 'vbox',
        title: '修改',
        modal: true,//弹出窗口时后面背景不可编辑
        frame: true,
        closeAction: 'hide',
        closable: true,
        items: [updateInputPanel]
    });

    Ext.create('Ext.container.Viewport', {
        layout : {
            type : 'border',
            regionWeights : {
                west : -1,
                north : 1,
                south : 1,
                east : -1
            }
        },
        items : [ {
            region : 'north',
            border : false,
            items : [inputPanel, buttonPanel ]
        }, {
            region : 'west',
            layout : 'fit',
            width : '50%',
            border : false,
            items : [ gridPanel ]
        }, {
            region : 'center',
            layout : 'fit',
            border : false,
            items : [ viewImagePanel ]
        } ]
    });

    Ext.data.StoreManager.lookup('gridStore').on('beforeload', function (store) {
        store.proxy.extraParams = {
            V_V_FLOWTYPE:  Ext.getCmp('lclx').getValue(),
            V_V_PAGE: Ext.getCmp('page').store.currentPage,
            V_V_PAGESIZE: Ext.getCmp('page').store.pageSize
        }
    });

    _init();
});

function _init() {
    if (ProcessTypeStoreLoad && initLoad) {
        initLoad = false;

        Ext.getBody().unmask();//去除页面笼罩
    }

}

function _select() {
    var gridStore = Ext.data.StoreManager.lookup('gridStore');
    gridStore.proxy.extraParams = {
        V_V_FLOWTYPE:  Ext.getCmp('lclx').getValue(),
        V_V_PAGE: Ext.getCmp('page').store.currentPage,
        V_V_PAGESIZE: Ext.getCmp('page').store.pageSize

    };
    gridStore.currentPage = 1;
    gridStore.load();

}

function _preAddView()
{
    Ext.getCmp('window1').show();
}

function _preUpdateView()
{
    var records = Ext.getCmp('gridPanel').getSelectionModel().getSelection();//获取选中的数据

    if (records.length != 1) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条要修改的数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    Ext.getCmp('updatelclx').setValue(records[0].get('V_FLOW_TYPE'));
    Ext.getCmp('updatelcmc').setValue(records[0].get('V_ACTIVITI_NAME'));

    Ext.getCmp('window2').show();
}


function _addSave(){
    if (Ext.getCmp('addlclx').getValue() =="" || Ext.getCmp('addlcbm').getValue() == '' || Ext.getCmp('addlcmc').getValue() == '' || Ext.getCmp('V_V_FILEBLOB').getValue() == '') {
        Ext.MessageBox.show({
            title : '提示',
            msg : '请输入这些必填项',
            buttons : Ext.MessageBox.OK,
            icon : Ext.MessageBox.ERROR
        });
        return;
    }

    var addInputPanel = Ext.getCmp('addInputPanel');

    var V_V_FILEBLOB = Ext.getCmp('V_V_FILEBLOB').getSubmitValue();

    Ext.getCmp('V_V_ACTIVITI_CODE').setValue( Ext.getCmp('addlcbm').getValue());
    Ext.getCmp('V_V_ACTIVITI_NAME').setValue(Ext.getCmp('addlcmc').getValue());
    Ext.getCmp('V_V_FLOW_TYPE').setValue(Ext.getCmp('addlclx').getValue());
    Ext.getCmp('V_V_INPER_CODE').setValue(Ext.util.Cookies.get('v_personcode'));
    Ext.getCmp('V_V_INPER_NAME').setValue(Ext.util.Cookies.get('v_personname2'));
    Ext.getCmp('V_V_FILEBLOB').setValue(V_V_FILEBLOB);
    Ext.getCmp('V_V_GUID').setValue('-1');


    Ext.MessageBox.show({
        title: '请等待',
        msg: '文件正在上传...',
        progressText: '',
        width: 300,
        progress: true,
        closable: false,
        animEl: 'loding'

    });

    addInputPanel.getForm().submit({
        url: AppUrl + 'hp/PM_ACTIVITI_PROCESS_SET',
        method: 'POST',
        async: false,
        waitMsg: '上传中...',
        success: function (RET) {
            Ext.MessageBox.alert('提示', '操作成功', callBack);
            function callBack(id) {
                _select();
                Ext.getCmp('window1').hide();
            }

        },
        failure: function (resp) {
            Ext.Msg.alert('错误', '操作失败');
        }

    })


}

function _addClose()
{
    Ext.getCmp('window1').hide();
}

function _updateClose()
{
    Ext.getCmp('window2').hide();
}

function _updateSave(){
    if (Ext.getCmp('updatelclx').getValue() ==""  || Ext.getCmp('updatelcmc').getValue() == '' ) {
        Ext.MessageBox.show({
            title : '提示',
            msg : '请输入这些必填项',
            buttons : Ext.MessageBox.OK,
            icon : Ext.MessageBox.ERROR
        });
        return;
    }





        var records = Ext.getCmp('gridPanel').getSelectionModel().getSelection();//获取选中的数据

        Ext.Ajax.request({
            url: AppUrl + 'hp/PM_ACTIVITI_PROCESS_UPDATE',
            type: 'ajax',
            method: 'POST',
            params: {
                V_V_ACTIVITI_CODE: records[0].get('V_ACTIVITI_CODE'),
                V_V_ACTIVITI_NAME: Ext.getCmp('updatelcmc').getValue(),
                V_V_FLOW_TYPE: Ext.getCmp('updatelclx').getValue(),
                V_V_INPER_CODE: Ext.util.Cookies.get('v_personcode'),
                V_V_INPER_NAME: Ext.util.Cookies.get('v_personname2'),
                V_V_GUID: records[0].get('V_GUID')

            },
            success: function (response) {
                var data = Ext.decode(response.responseText);//后台返回的值
                if (data.RET == 'success') {//成功，会传回true
                    Ext.MessageBox.alert('提示', '操作成功', callBack);
                    function callBack(id) {
                        _select();
                        Ext.getCmp('window2').hide();
                    }

                } else {
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: data.RET,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            },
            failure: function (response) {//访问到后台时执行的方法。
                Ext.MessageBox.show({
                    title: '错误',
                    msg: response.responseText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                })
            }

        })






    /**/
}

function _delete() {
    /*Ext.getCmp('winworkcode').setReadOnly(false);
     Ext.getCmp('winworkcode').setValue('');
     Ext.getCmp('winworkname').setValue('');
     Ext.getCmp('winworktype').setValue('');*/

    var records = Ext.getCmp('gridPanel').getSelectionModel().getSelection();//获取选中的数据

    if (records.length != 1) {//判断是否选中数据
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条要删除的数据',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    };

    Ext.MessageBox.show({
        title: '确认',
        msg: '您确定要删除吗？',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESION,
        fn: function (btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    url: AppUrl + 'hp/PM_ACTIVITI_PROCESS_DEL',
                    type: 'ajax',
                    method: 'POST',
                    params: {
                        V_V_GUID: records[0].get('V_GUID')
                    },
                    success: function (response) {
                        var data = Ext.decode(response.responseText);//后台返回的值
                        if (data.RET == 'success') {//成功，会传回true
                            for (var i = 0; i < records.length; i++) {
                                Ext.data.StoreManager.lookup('gridStore').remove(records[i]);//把这条数据，从页面数据集中移除，现实动态更新页面
                            }
                            //top.banner.Ext.example.msg('操作信息', '操作成功');//提示信息
                        } else {
                            Ext.MessageBox.show({
                                title: '错误',
                                msg: data.message,
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                        }
                    },
                    failure: function (response) {//访问到后台时执行的方法。
                        Ext.MessageBox.show({
                            title: '错误',
                            msg: response.responseText,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        })
                    }

                })
            }
        }
    });


}

function _upLoadFile() {
    var inputPanel = Ext.getCmp('inputPanel');

    var V_V_FILEBLOB = Ext.getCmp('V_V_FILEBLOB').getSubmitValue();
    var V_V_FILENAME = V_V_FILEBLOB.substring(0, V_V_FILEBLOB.indexOf('.'));

    Ext.getCmp('V_V_GUID').setValue(V_V_GUID);
    Ext.getCmp('V_V_FILENAME').setValue(V_V_FILENAME);
    Ext.getCmp('V_V_FILEBLOB').setValue(V_V_FILEBLOB);
    Ext.getCmp('V_V_FILETYPECODE').setValue('SBJC');
    Ext.getCmp('V_V_PLANT').setValue(V_V_ORGCODE);
    Ext.getCmp('V_V_DEPT').setValue(V_V_DEPTCODE);
    Ext.getCmp('V_V_PERSON').setValue(Ext.util.Cookies.get('v_personcode'));
    Ext.getCmp('V_V_REMARK').setValue(Ext.getCmp('V_V_REMARK').getSubmitValue());


    if (Ext.getCmp('V_V_FILEBLOB').getValue() == '') {
        Ext.Msg.alert('错误', '请选择你要上传的文件');
        return;
    }

    Ext.MessageBox.show({
        title: '请等待',
        msg: '文件正在上传...',
        progressText: '',
        width: 300,
        progress: true,
        closable: false,
        animEl: 'loding'

    });

    inputPanel.getForm().submit({
        url: AppUrl + 'PM_14/PRO_BASE_FILE_ADD',
        method: 'POST',
        async: false,
        waitMsg: '上传中...',
        success: function (ret) {
            Ext.MessageBox.alert('提示', '操作成功');

        },
        failure: function (resp) {
            Ext.Msg.alert('错误', '上传失败');
        }

    })

}


function _preViewImage(V_V_GUID) {
    var url = AppUrl + 'hp/PM_ACTIVITI_PROCESS_GET?V_V_GUID=' + V_V_GUID ;

    Ext.getCmp("browseImage").getEl().dom.src = url;
}




