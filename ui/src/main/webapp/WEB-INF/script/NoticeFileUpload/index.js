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
    var imageUploadFormPanel = Ext.create('Ext.form.Panel', {
        id: 'imageUploadFormPanel',
        frame: true,
        border: false,
        baseCls: 'my-panel-no-border',
        layout: 'column',
        defaults: {
            labelAlign: 'right',
            labelWidth: 100,
            inputWidth: 140,
            style: 'margin:5px 0px 5px 10px'
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
            forceSelection: true
        }, {
            xtype: 'textfield',
            id: 'V_TITLE',
            name: 'V_TITLE',
            fieldLabel: '公告标题'
        }, {
            xtype: 'textarea',
            id: 'V_CONTENT',
            name: 'V_CONTENT',
            fieldLabel: '公告内容'
        }, {
            xtype: 'filefield', //附件框
            id: 'V_FILEBLOB',
            name: 'V_FILEBLOB',
            regex: /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/,
            fieldLabel: '上传图片',
            allowBlank: false,
            buttonText: '浏览',
            listeners: {
                renderer: function () {
                    var FILEBLOB = Ext.getCmp('V_FILEBLOB');
                    FILEBLOB.on('change', function (field, newValue, oldValue) {//图片预览
                        var url = 'file:///' + FILEBLOB.getValue();//得到选择的图片路径
                        var img_reg = /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
                        if (!img_reg.test(url)) {
                            Ext.Msg.alert('提示', '请选择图片类型的文件');
                            Ext.getCmp('V_FILEBLOB').setValue('');
                            return;
                        }
                    }, this);
                }
            }
        }, {
            xtype: 'button',
            text: '上传',
            icon: imgpath + '/edit.png',
            handler: _uploadImage
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
        } /*, {
                xtype: 'hidden',
                id: 'V_UPLOADTIME',
                name: 'V_UPLOADTIME'
            }*/]
    });
    Ext.getCmp('V_DISPLAY').select(displayStore.getAt(0));
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [imageUploadFormPanel]
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

function _uploadImage() {
    var FILEBLOB = Ext.getCmp('V_FILEBLOB').getSubmitValue();
    if ('' == FILEBLOB) {
        Ext.MessageBox.show({
            title: '提示',
            msg: '附件未选择!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
        return;
    }
    Ext.getCmp('V_ID').setValue(Ext.data.IdGenerator.get('uuid').generate());
    Ext.getCmp('V_FILENAME').setValue(FILEBLOB.substring(FILEBLOB.lastIndexOf('\\') + 1, FILEBLOB.length));
    Ext.getCmp('V_FILETYPE').setValue(FILEBLOB.substring(FILEBLOB.lastIndexOf('.') + 1, FILEBLOB.length));
    Ext.getCmp('V_PERSONNAME').setValue(Ext.util.Cookies.get('v_personname2'));
    Ext.getCmp('imageUploadFormPanel').submit({
        url: AppUrl + 'Wsy/PM_HOME_NOTICE_INS',
        async: false,
        waitMsg: '上传中...',
        method: 'POST',
        success: function (form, action) {
            if ('SUCCESS' == action.result.V_INFO) {
                Ext.Msg.alert('操作信息', '操作成功');
//                self.opener.location.reload();
                window.opener.reLoad();
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
                msg: '失败！',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
            Ext.getCmp('V_FILEBLOB').setValue('');
        }
    });
}