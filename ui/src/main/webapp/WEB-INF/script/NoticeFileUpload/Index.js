Ext.onReady(function () {
    var displayStore = Ext.create('Ext.data.Store', {
        storeId: 'displayStore',
        autoLoad: false,
        fields: ['code', 'name'],
        data: [{
            code: '1',
            name: '显示'
        }, {
            code: '0',
            name: '不显示'
        }]
    });
    var noticeStore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'noticeStore',
        fields: ['ID', 'TITLE', 'CONTENT', 'PERSONNAME', 'UPLOADTIME', 'DISPLAY', 'FILENAME', 'FILETYPE'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'Wsy/PM_HOME_NOTICE_SEL',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {}
        },
        listeners: {
            load: function () {
            }
        }
    });
    var buttonPanel = Ext.create('Ext.Panel', {
        id: 'buttonPanel',
        frame: true,
        region: 'north',
        border: false,
        layout: 'column',
        items: [{
            xtype: 'button',
            text: '新增公告',
            width: 100,
            style: 'margin:5px 0px 5px 10px',
            icon: imgpath + '/add.png',
            handler: _openAddWindow
        }, {
            xtype: 'button',
            text: '删除公告',
            width: 100,
            style: 'margin:5px 0px 5px 10px',
            icon: imgpath + '/delete.png',
            handler: _deleteNotice
        }]
    });
    var imageUploadFormPanel = Ext.create('Ext.form.Panel', {
        id: 'imageUploadFormPanel',
        frame: true,
        border: false,
        baseCls: 'my-panel-no-border',
//        layout: 'column',
        region: 'north',
        items: [{
            layout: 'column',
            border: false,
            baseCls: 'my-panel-no-border',
            frame: true,
            defaults: {
                labelAlign: 'right',
                labelWidth: 90,
                margin: '15px 5px 5px 5px'
            },
            items: [{
                xtype: 'combo',
                id: 'V_DISPLAY',
                name: 'V_DISPLAY',
                store: displayStore,
                fieldLabel: '是否显示',
                displayField: 'name',
                valueField: 'code',
                queryMode: 'local',
                allowBlank: false,
                forceSelection: true,
                width: 170
            }, {
                xtype: 'textfield',
                id: 'V_TITLE',
                name: 'V_TITLE',
                fieldLabel: '公告标题',
                width: 400,
                allowBlank: false
            }]
        }, {
            layout: 'column',
            border: false,
            baseCls: 'my-panel-no-border',
            frame: true,
            defaults: {
                labelAlign: 'right',
                labelWidth: 90,
                width: 300,
                margin: '5px 5px 5px 5px'
            },
            items: [{
                xtype: 'textarea',
                id: 'V_CONTENT',
                name: 'V_CONTENT',
                fieldLabel: '公告内容',
                width: 580,
                allowBlank: false
            }, {
                xtype: 'hidden',
                id: 'FLAG',
                name: 'FLAG'
            }, {
                xtype: 'hidden',
                id: 'V_ID',
                name: 'V_ID'
            }, {
                xtype: 'hidden',
                id: 'V_PERSONNAME',
                name: 'V_PERSONNAME'
            }, {
                xtype: 'hidden',
                id: 'V_FILENAME',
                name: 'V_FILENAME'
            }, {
                xtype: 'hidden',
                id: 'V_FILETYPE',
                name: 'V_FILETYPE'
            }]
        }, {
            layout: 'column',
            border: false,
            baseCls: 'my-panel-no-border',
            frame: true,
            defaults: {
                labelAlign: 'right',
                labelWidth: 90,
                width: 300,
                margin: '5px 5px 5px 5px'
            },
            items: [{
                xtype: 'filefield', //附件框
                id: 'V_FILEBLOB',
                name: 'V_FILEBLOB',
                fieldLabel: '上传附件',
                width: 510,
//                allowBlank: false,
                buttonText: '浏览'
            }, {
                xtype: 'button',
                id: 'DELETEFILEBUTTON',
                text: '删除附件',
                width: 60,
                margin: '5px 5px 5px 0px',
                handler: _deleteFile
            }]
        }]
    });
    var imageUploadWindow = Ext.create('Ext.window.Window', {
        id: 'imageUploadWindow',
        width: 650,
        height: 250,
        layout: 'fit',
        title: '新增公告',
        modal: true,
        frame: true,
        closeAction: 'hide',
        closable: true,
        items: [imageUploadFormPanel],
        buttons: [{
            xtype: 'button',
            text: '保存',
            width: 40,
            handler: function () {
                _uploadImage();
            }
        }, {
            xtype: 'button',
            text: '关闭',
            width: 40,
            handler: function () {
                imageUploadWindow.close();
            }
        }]
    });
    var noticePanel = Ext.create('Ext.grid.Panel', {
        id: 'noticePanel',
        style: 'text-align: center;',
        region: 'center',
        title: '已上传公告',
        layout: 'fit',
        border: false,
//        height: 250,
        store: noticeStore,
        columnLines: true,
        defaults: {
            labelAlign: 'right',
            labelWidth: 80,
            width: 60,
            style: 'text-align: left;'
        },
        selModel: {
            selType: 'checkboxmodel'
//            mode: 'SIMPLE'
        },
        columns: [{
            text: '公告标题',
            dataIndex: 'TITLE',
            flex: 1
        }, {
            text: '公告内容',
            dataIndex: 'CONTENT',
            flex: 2
        }, {
            text: '上传人',
            dataIndex: 'PERSONNAME',
            flex: 1
        }, {
            text: '上传时间',
            dataIndex: 'UPLOADTIME',
            flex: 1
        }, {
            text: '是否显示',
            dataIndex: 'DISPLAY',
            renderer: state,
            flex: 0.3
        }, {
            text: '附件名',
            dataIndex: 'FILENAME',
            flex: 1
        }, {
            text: '下载附件',
            align: 'center',
            flex: 0.3,
            renderer: function (value, metaData, record) {
                if (record.data.FILENAME != '' && record.data.FILENAME != null) {
                    return '<a href=javascript:dealWith(\'</a><a href="#" onclick="_downloadFile(\'' + record.data.ID + '\')">' + '下载附件' + '</a>';
                }
            }
        }, {
            text: '编辑内容',
            align: 'center',
            flex: 0.3,
            renderer: function (value, metaData, record) {
                return '<a href=javascript:dealWith(\'</a><a href="#" onclick="_openEditWindow(\'' + record.data.ID + '\')">' + '编辑内容' + '</a>';
            }
        }],
        bbar: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: '显示第{0}条到第{1}条记录,一共{2}条',
            emptyMsg: '没有记录',
            store: noticeStore,
            width: '100%'
        }]
    });
    Ext.getCmp('V_DISPLAY').select(displayStore.getAt(0));
    noticeStore.load();
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [buttonPanel, noticePanel]
    });
});
var Hours = [];
for (var i = 0; i < 24; i++) {
    if (i < 10) {
        Hours.push({CODE: '0' + i, NAME: i});
    }
    else {
        Hours.push({CODE: i, NAME: i});
    }
}
var Minutes = [];
for (i = 0; i < 60; i++) {
    if (i < 10) {
        Minutes.push({CODE: '0' + i, NAME: i});
    }
    else {
        Minutes.push({CODE: i, NAME: i});
    }
}
var HourStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'HourStore',
    fields: ['CODE', 'NAME'],
    data: Hours,
    proxy: {
        type: 'memory',
        render: {
            type: 'json'
        }
    }
});
var MinuteStore = Ext.create("Ext.data.Store", {
    autoLoad: true,
    storeId: 'MinuteStore',
    fields: ['CODE', 'NAME'],
    data: Minutes,
    proxy: {
        type: 'memory',
        render: {
            type: 'json'
        }
    }
});

function _downloadFile(ID) {
    document.location.href = AppUrl + 'Wsy/PM_HOME_NOTICE_DOWNLOAD?V_ID=' + encodeURI(ID);
}

function _openAddWindow() {
    Ext.getCmp('imageUploadFormPanel').getForm().reset();
    Ext.getCmp('V_DISPLAY').select(Ext.getStore('displayStore').getAt(0));
    Ext.getCmp('V_ID').setValue(Ext.data.IdGenerator.get('uuid').generate());
    Ext.getCmp('FLAG').setValue('INSERT');
    Ext.getCmp("DELETEFILEBUTTON").setVisible(false);
    Ext.getCmp('imageUploadWindow').show();
}

function _openEditWindow(ID) {
    var record = Ext.getStore('noticeStore').getAt(Ext.getStore('noticeStore').find('ID', ID));
    Ext.getCmp('imageUploadFormPanel').getForm().reset();
    Ext.getCmp('FLAG').setValue('EDIT');
    Ext.getCmp("DELETEFILEBUTTON").setVisible(true);
    Ext.getCmp('V_ID').setValue(ID);
    Ext.getCmp('V_TITLE').setValue(record.get('TITLE'));
    Ext.getCmp('V_CONTENT').setValue(record.get('CONTENT'));
    Ext.getCmp('V_DISPLAY').setValue(record.get('DISPLAY'));
    Ext.getCmp('V_FILEBLOB').setRawValue(record.get('FILENAME'));
    Ext.getCmp('imageUploadWindow').show();
//    Ext.getCmp('formPanel').getForm().findField('V_FILEBLOB').applyEmptyText(record.CONTENT_NAME_);
//    Ext.getCmp('V_FILEBLOB').applyEmptyText(record.get('FILENAME'));
//    alert(record.get('FILENAME'));
}

function _deleteFile() {
    Ext.getCmp('FLAG').setValue('UPDATE');
    Ext.getCmp('V_FILEBLOB').reset();
}

function _deleteNotice() {
    var record = Ext.getCmp('noticePanel').getSelectionModel().getSelection();
//    alert(noticePanel);
//    record[i].data.V_DEPTCODE
    if (record.length < 1) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请选择一条数据!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }
    var idList = [];
    for (var i = 0; i < record.length; i++) {
        idList.push(record[i].data.ID);
    }
    Ext.Ajax.request({
        url: AppUrl + 'Wsy/PM_HOME_NOTICE_DEL',
        type: 'ajax',
        method: 'POST',
        async: false,
        params: {
            idList: idList
        },
        success: function (response) {
            var data = Ext.decode(response.responseText);
            if (data.V_INFO == 'SUCCESS') {
                Ext.Msg.alert('操作信息', '操作成功');
                Ext.getStore('noticeStore').load();
                window.opener.location.reload();
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
    });
}

function state(a) {
    if (a == '1') {
        return '是';
    }
    else {
        return '否';
    }
}

function _uploadImage() {
    var FILEBLOB = Ext.getCmp('V_FILEBLOB').getSubmitValue();
//    if ('' == FILEBLOB) {
//        Ext.MessageBox.show({
//            title: '提示',
//            msg: '附件未选择!',
//            buttons: Ext.MessageBox.OK,
//            icon: Ext.MessageBox.WARNING
//        });
//        return;
//    }
    Ext.getCmp('V_FILENAME').setValue(FILEBLOB.substring(FILEBLOB.lastIndexOf('\\') + 1, FILEBLOB.length));
    Ext.getCmp('V_FILETYPE').setValue(FILEBLOB.substring(FILEBLOB.lastIndexOf('.') + 1, FILEBLOB.length));
    Ext.getCmp('V_PERSONNAME').setValue(Ext.util.Cookies.get('v_personname2'));
    Ext.getCmp('imageUploadFormPanel').submit({
        url: AppUrl + 'Wsy/PM_HOME_NOTICE_INS_UPDATE',
        async: false,
        waitMsg: '上传中...',
        method: 'POST',
        success: function (form, action) {
            if ('SUCCESS' == action.result.V_INFO) {
                Ext.Msg.alert('操作信息', '操作成功');
//                self.opener.location.reload();
//                window.opener.reLoad();
                Ext.getStore('noticeStore').load();
                Ext.getCmp('imageUploadWindow').close();
                window.opener.location.reload();
//                alert('123123');
//                window.opener.location.href = window.opener.location.href;
            } else {
                Ext.MessageBox.show({
                    title: '错误',
                    msg: action.result.V_INFO,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
                Ext.getCmp('V_FILEBLOB').setValue('');
            }
        },
        failure: function (form, action) {
            Ext.MessageBox.show({
                title: '操作信息',
                msg: '错误！',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
            Ext.getCmp('V_FILEBLOB').setValue('');
        }
    });
}