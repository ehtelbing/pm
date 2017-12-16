var treeid = '';
var countSave = 0;
var V_V_EDIT_GUID = '';
var V_PICGUID = '';
var index = 0;
var picguidbegin;
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

    var ckStore = Ext.create("Ext.data.Store", {
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
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE: '[基层单位]'
            }
        }
    });

    var zyqStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'zyqStore',
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
            }
        }
    });

    var sblxStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'sblxStore',
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'pm_19/PRO_GET_DEPTEQUTYPE_ADMIN',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });


    var sbmcStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'sbmcStore',
        fields: ['V_EQUCODE', 'V_EQUNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'pm_19/PRO_GET_DEPTEQU_ADMIN',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    });

    var imageStore = Ext.create('Ext.data.Store', {
        id: 'imageStore',
        autoLoad: false,
        fields: ['V_EQUCODE', 'V_FILENAME', 'V_FILEURL', 'D_ALTERTIME', 'N_IS_MAINPHOTO', 'D_DATE_EDITTIME', 'V_EDIT_GUID'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'mwd/SAP_PM_EQU_FILE_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        })
    });

    var treeStore = Ext.create("Ext.data.TreeStore", {
        storeId: 'treeStore',
        autoLoad: false,
        fields: ['sid', 'text', 'parentid', 'V_EQUSITE']
    });

    var treepanel = Ext.create('Ext.tree.Panel', {
        id: 'tree',
        region: 'west',
        width: '20%',
        rootVisible: false,
        store: treeStore,
        autoScroll: true,
        listeners: {itemclick: TreeChecked}
    });

    var northpanel = Ext.create('Ext.panel.Panel', {
        id: 'northpanel',
        region: 'north',
        width: '100%',
        frame: true,
        layout: 'column',
        items: [{
            xtype: 'combo',
            id: 'ck',
            store: ckStore,
            fieldLabel: '厂矿',
            style: ' margin: 5px 0px 5px 10px',
            labelWidth: 70,
            labelAlign: 'right',
            editable: false,
            queryMode: 'local',
            displayField: 'V_DEPTNAME',
            valueField: 'V_DEPTCODE'
        },
            {
                xtype: 'combo',
                id: 'zyq',
                store: zyqStore,
                fieldLabel: '作业区',
                style: ' margin: 5px 0px 5px 10px',
                labelWidth: 70,
                labelAlign: 'right',
                editable: false,
                queryMode: 'local',
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE'
            },
            {
                xtype: 'combo',
                id: 'sblx',
                store: sblxStore,
                fieldLabel: '设备类型',
                style: ' margin: 5px 0px 5px 10px',
                labelWidth: 70,
                labelAlign: 'right',
                editable: false,
                queryMode: 'local',
                displayField: 'V_EQUTYPENAME',
                valueField: 'V_EQUTYPECODE'
            },
            {
                xtype: 'combo',
                id: 'sbmc',
                store: sbmcStore,
                fieldLabel: '设备名称',
                style: ' margin: 5px 0px 5px 10px',
                labelWidth: 70,
                labelAlign: 'right',
                editable: false,
                queryMode: 'local',
                displayField: 'V_EQUNAME',
                valueField: 'V_EQUCODE'
            },
            {
                xtype: 'button',
                text: '查询',
                style: ' margin: 5px 0px 5px 10px',
                icon: imgpath + '/search.png',
                handler: QueryTree
            }]

    });

    var viewImagePanel = Ext.create("Ext.panel.Panel", {
        id: 'viewImagePanel',
        editable: false,
        region: 'center',
        // height: 200,
        html: "<div id = 'yulan'> <table border='0' width='100%' height='100%'><tr> <td> </td><td> <img width='500px' height='300px' /> </td> <td> </td> </tr> <tr> <td></td> <td align='center'></td> <td></td> </tr> </table> </div>",
        style: ' margin: 5px 0px 0px 0px',
        columnLines: true
    });

    var centerpanel = Ext.create('Ext.panel.Panel', {
        id: 'panel',
        region: 'center',
        width: '80%',
        //frame:true,
        layout: 'border',
        border: false,
        items: [{
            xtype: 'panel', width: '100%', region: 'north', layout: 'border', height: '100%',
            items: [{
                xtype: 'panel', width: '100%', region: 'north', layout: 'column', border: false, frame: true,
                items: [{
                    xtype: 'button',
                    text: '添加',
                    style: ' margin: 5px 0px 5px 10px',
                    icon: imgpath + '/add.png',
                    handler: _show
                }, {
                    xtype: 'button',
                    text: '删除',
                    style: ' margin: 5px 0px 5px 10px',
                    icon: imgpath + '/delete.png',
                    handler: _delete
                }, {
                    xtype: 'button',
                    text: '上一页',
                    style: ' margin: 5px 0px 5px 10px',
                    icon: imgpath + '/accordion_collapse.png',
                    handler: _last
                }, {
                    xtype: 'button',
                    text: '下一页',
                    style: ' margin: 5px 0px 5px 10px',
                    icon: imgpath + '/accordion_expand.png',
                    handler: _next
                }]
            }, viewImagePanel]
        }]
    });


    Ext.create('Ext.container.Viewport', {
        id: "id",
        layout: 'border',
        items: [treepanel, northpanel, centerpanel]

    });

    var imagePanel = Ext.create('Ext.form.Panel', {
        id: 'imagePanel',
        frame: true,
        border: false,
        baseCls: 'my-panel-no-border',
        region: 'north',
        defaults: {baseCls: 'my-panel-no-border'},
        items: [
            {
                layout: 'column',
                border: false,
                frame: true,
                items: [
                    {
                        xtype: 'filefield',
                        id: 'V_V_FILEBLOB',
                        name: 'V_V_FILEBLOB',
                        enctype: "multipart/form-data",
                        fieldLabel: '图纸',
                        labelWidth: 100,
                        fieldStyle: 'background-color: #FFEBCD; background-image: none;',
                        labelAlign: 'right',
                        inputWidth: 317,
                        style: ' margin: 5px 0px 0px 0px',
                        buttonText: '选择',
                        allowBlank: false,
                        regex: /^.*\.(jpg|png)$/i,//正则表达式，用来检验文件格式
                        regexText: '请选择jgp/png图片格式！'
                    }, {
                        id: 'insertFilesFj',
                        xtype: 'button',
                        text: '上传',
                        style: ' margin: 5px 0px 0px 5px',
                        handler: _upLoad
                    }, {
                        xtype: 'hidden',
                        name: 'V_V_EQUCODE',
                        id: 'V_V_EQUCODE'
                    }, {
                        xtype: 'hidden',
                        name: 'V_V_EDIT_GUID',
                        id: 'V_V_EDIT_GUID'
                    }

                ]
            }
        ]

    });

    var addWindow = Ext.create('Ext.window.Window', {
        id: 'addWindow',
        closable: true,// 是否有关闭
        closeAction: 'show',
        width: 600,
        height: 140,
        bodyPadding: 20,
        title: '<div align="center">添加图纸</div>',
        modal: true,
        frame: true,
        layout: 'vbox',
        items: [imagePanel]
    });

    Ext.data.StoreManager.lookup('ckStore').on('load', function () {
        Ext.getCmp('ck').select(Ext.data.StoreManager.lookup('ckStore').getAt(0));
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE: '[主体作业区]'
            }
        });
    });

    Ext.data.StoreManager.lookup('zyqStore').on('load', function () {
        Ext.getCmp('zyq').select(Ext.data.StoreManager.lookup('zyqStore').getAt('0'));
        Ext.data.StoreManager.lookup('sblxStore').load({
            params: {
                V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
            }
        });
    });

    Ext.data.StoreManager.lookup('sblxStore').on('load', function () {
        Ext.getCmp('sblx').select(Ext.data.StoreManager.lookup('sblxStore').getAt('0'));
        Ext.data.StoreManager.lookup('sbmcStore').load({
            params: {
                V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue(),
                V_V_EQUTYPECODE: Ext.getCmp('sblx').getValue()
            }
        });
    });

    Ext.data.StoreManager.lookup('sbmcStore').on('load', function () {
        Ext.getCmp('sbmc').select(Ext.data.StoreManager.lookup('sbmcStore').getAt('0'));
        starSave();
        QueryTree();
    });

    Ext.getCmp('ck').on('select', function () {
        Ext.data.StoreManager.lookup('zyqStore').load({
            params: {
                V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                V_V_DEPTCODENEXT: Ext.util.Cookies.get('v_deptcode'),
                V_V_DEPTTYPE: '[主体作业区]'
            }
        });
    });

    Ext.getCmp('zyq').on('select', function () {
        Ext.data.StoreManager.lookup('sblxStore').load({
            params: {
                V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue()
            }
        });
    });

    Ext.getCmp('sblx').on('select', function () {
        Ext.data.StoreManager.lookup('sbmcStore').load({
            params: {
                V_V_DEPTCODENEXT: Ext.getCmp('zyq').getValue(),
                V_V_EQUTYPECODE: Ext.getCmp('sblx').getValue()
            }
        });
    });

    Ext.getCmp('sbmc').on('select', function () {
        QueryTree();
    });

    Ext.data.StoreManager.lookup('treeStore').on('load', function () {
        countSave = 1;
    });

    //设备树点击加号加载
    Ext.getCmp("tree").on("beforeload", function (store, operation) {
        if (operation.node.data.parentid == -1) {
            Ext.apply(store.proxy.extraParams, {
                    V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
                    V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
                    V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue(),
                    V_V_EQUTYPECODE: Ext.getCmp('sblx').getValue(),
                    V_V_EQUCODE: operation.node.data.sid
                },
                store.proxy.url = AppUrl + 'pm_19/PRO_SAP_PM_CHILDEQU_TREE')
        }
    });

});

function QueryTree() {
    Ext.getCmp('tree').store.setProxy({
        type: 'ajax',
        actionMethods: {
            read: 'POST'
        },
        async: false,
        url: AppUrl + 'pm_19/PRO_SAP_PM_EQU_TREE',
        reader: {
            type: 'json'
        },
        root: {
            expanded: true
        },
        extraParams: {
            V_V_PERSONCODE: Ext.util.Cookies.get('v_personcode'),
            V_V_DEPTCODE: Ext.getCmp('ck').getValue(),
            V_V_DEPTNEXTCODE: Ext.getCmp('zyq').getValue(),
            V_V_EQUTYPECODE: Ext.getCmp('sblx').getValue(),
            V_V_EQUCODE: Ext.getCmp('sbmc').getValue()
        }
    });
    Ext.getCmp('tree').store.load();
}

function TreeChecked(aa, record, item, index, e, eOpts) {
    treeid = record.raw.sid;
    _preViewImage();

}

function _upLoad() {

    V_V_EDIT_GUID = Ext.data.IdGenerator.get('uuid').generate();

    var imagePanel = Ext.getCmp('imagePanel');
    Ext.getCmp('V_V_EQUCODE').setValue(treeid);
    Ext.getCmp('V_V_EDIT_GUID').setValue(V_V_EDIT_GUID);

    imagePanel.getForm().submit({
        url: AppUrl + 'mwd/SAP_PM_EQU_FILE_SET',
        async: false,
        waitMsg: '上传中...',
        method: 'POST',
        success: function (ret) {
            Ext.Msg.alert('成功', '上传成功');
            _preViewImage();
        },
        failure: function (resp) {
            Ext.Msg.alert('提示信息', '上传失败');
        }
    });

}

function _preViewImage() {
    var imageStore = Ext.data.StoreManager.lookup('imageStore');
    imageStore.proxy.extraParams = {
        V_V_EQUCODE: treeid
    };
    imageStore.load();

    index = 0;
    console.log(imageStore.getCount());
    if (imageStore.getCount() != 0) {
        V_PICGUID = imageStore.getAt(0).get('V_EDIT_GUID');
        Ext.getCmp('viewImagePanel').body.update("<div id = 'yulan'> <table border='0' width='100%' height='100%'><tr> <td> </td><td> <img src='../../images/pm_dxgc_wwjx/" + treeid + "/" + V_PICGUID + ".jpg' width= '" + sw + "px' height='" + sh + "px' /> </td> <td> </td> </tr> <tr> <td></td> <td align='center'></td> <td></td> </tr> </table> </div>"
        );

        picguidbegin = V_PICGUID;
    } else {
        Ext.getCmp('viewImagePanel').body.update("<div id = 'yulan'> <table border='0' width='100%' height='100%'><tr> <td> </td><td> <img width='800px' height='400px' /> </td> <td> </td> </tr> <tr> <td></td> <td align='center'></td> <td></td> </tr> </table> </div>"
        );
    }
}


function _last() {
    if (treeid == '') {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请先选择设备树',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }

    var imageStore = Ext.data.StoreManager.lookup('imageStore');
    if (V_PICGUID == picguidbegin) {
        Ext.Msg.alert('提示信息', '已经是第一张');
        return;

    } else {
        console.log(index);
        if (index == 0) {
            Ext.Msg.alert('提示信息', '已经到第一张');
            return;
        }
        index--;
        V_PICGUID = imageStore.getAt(index).get('V_EDIT_GUID');
        Ext.getCmp('viewImagePanel').body.update("<div id = 'yulan'> <table border='0' width='100%' height='100%'><tr> <td> </td><td> <img src='../../images/pm_dxgc_wwjx/" + treeid + "/" + V_PICGUID + ".jpg' width='" + sw + "px' height='" + sh + "px' /> </td> <td> </td> </tr> <tr> <td></td> <td align='center'></td> <td></td> </tr> </table> </div>"
        );

    }

}

function _next() {
    if (treeid == '') {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请先选择设备树',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }

    var imageStore = Ext.data.StoreManager.lookup('imageStore');

    if (imageStore.getCount() <= 1) {
        Ext.Msg.alert('提示信息', '已经是最后一张');
        return;
    } else {
        if (index == imageStore.getCount() - 1) {
            Ext.Msg.alert('提示信息', '已经到最后一张');
            return;
        }
        index++;
        console.log(index);
        V_PICGUID = imageStore.getAt(index).get('V_EDIT_GUID');

        Ext.getCmp('viewImagePanel').body.update("<div id = 'yulan'> <table border='0' width='100%' height='100%'><tr> <td> </td><td> <img src='../../images/pm_dxgc_wwjx/" + treeid + "/" + V_PICGUID + ".jpg' width='" + sw + "px' height='" + sh + "px' /> </td> <td> </td> </tr> <tr> <td></td> <td align='center'></td> <td></td> </tr> </table> </div>"
        );

    }
}

function _delete() {
    if (treeid == '') {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请先选择设备树',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }

    if (V_PICGUID == "") {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一张图片',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }

    Ext.MessageBox.show({
        title: '确认',
        msg: '是否删除？',
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.QUESION,
        fn: function (btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    url: AppUrl + 'mwd/SAP_PM_EQU_FILE_DEL',
                    type: 'ajax',
                    method: 'POST',
                    params: {
                        V_V_EDIT_GUID: V_PICGUID
                    },
                    success: function (response) {
                        var data = Ext.decode(response.responseText);//后台返回的值
                        if (data.v_info == 'Success') {
                            Ext.Msg.alert('提示信息', '删除成功');
                            V_PICGUID = "";
                            _preViewImage();
                        } else {
                            Ext.MessageBox.show({
                                title: '错误',
                                msg: '失败',
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

function starSave() {
    if (countSave == 0) {
        Ext.MessageBox.show({
            title: '正在刷新...',
            progressText: '加载中...',
            width: 300,
            progress: true,
            closable: false
        });

        var f = function (v) {
            return function () {
                if (v == 10) {
                    Ext.MessageBox.hide();
                    starSave();
                } else {
                    var i = v / (10);
                    Ext.MessageBox.updateProgress(i, Math.round(100 * i) + '%');
                }
            };
        };
        for (var i = 1; i <= 10; i++) {
            setTimeout(f(i), i * 50);
        }
        ;
    }
}

function _show() {

    if (treeid == '') {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请先选择设备树',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }
    Ext.getCmp('addWindow').show();
}

function atleft(value, metaData, record, rowIndex, colIndex, store) {
    metaData.style = "text-align:left;";
    return '<div data-qtip="' + value + '" >' + value + '</div>';
}