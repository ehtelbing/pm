var V_V_PERSONNAME = Ext.util.Cookies.get('v_personname2');
var V_V_ORGCODE = Ext.util.Cookies.get('v_orgCode');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var thisYear = new Date().getFullYear();
var zgzrStoreLoad = false;
var V_V_GUID = Ext.data.IdGenerator.get('uuid').generate();

var KHLBDATA = [{displayField: '基础工作', valueField: '基础工作'}, {
    displayField: '现场管理',
    valueField: '现场管理'
}, {displayField: '工艺纪律', valueField: '工艺纪律'}, {displayField: '设备管理', valueField: '设备管理'}, {
    displayField: '违章违纪',
    valueField: '违章违纪'
}, {
    displayField: '安全隐患',
    valueField: '安全隐患'
}, {displayField: '相关方', valueField: '相关方'}];

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

    var years = [];
    for (var i = 2013; i <= thisYear + 1; i++) {
        years.push({
            displayField: i,
            valueField: i
        });
    }
    var month = [];
    for (var w = 1; w <= 12; w++) {
        month.push({
            displayField: w,
            valueField: w
        });
    }

    var zgzrStore = Ext.create("Ext.data.Store", {
        storeId: 'zgzrStore',
        autoLoad: true,
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: {
            type: 'ajax',
            async: false,
            url: AppUrl + 'zdh/plant_sel',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                IS_V_DEPTCODE: Ext.util.Cookies.get('v_orgCode'),
                IS_V_DEPTTYPE: '[主体作业区]'
            }
        },
        listeners: {
            load: function (store, records) {
                Ext.getCmp('V_BEEXAMINED_DEPT').select(store.first());
                zgzrStoreLoad = true;
                _init();
            }
        }
    });

    var classStore = Ext.create('Ext.data.Store', {
        storeId: 'classStore',
        autoLoad: false,
        fields: ['V_CLASS_CODE', 'V_CLASS_NAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PM_13_EXAMINED_CLASS',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('V_BEEXAMINED_CLASS').select(store.first());
            }
        }
    });

    var khlbStore = Ext.create("Ext.data.Store", {
        storeId: 'khlbStore',
        fields: ['displayField', 'valueField'],
        data: KHLBDATA,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });

    var inputPanel = Ext.create('Ext.form.Panel', {
        id: 'inputPanel',
        region: 'north',
        width: '100%',
        border: false,
        frame: true,
        layout: 'vbox',
        bodyPadding: 20,
        items: [{
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'combo',
                id: 'V_V_YEAR',
                store: Ext.create("Ext.data.Store", {
                    fields: ['displayField', 'valueField'],
                    data: years,
                    proxy: {
                        type: 'memory',
                        reader: {
                            type: 'json'
                        }
                    }
                }),
                editable: false,
                displayField: 'displayField',
                valueField: 'valueField',
                queryMode: 'local',
                fieldLabel: '检查月份',
                value: new Date().getFullYear(),
                labelWidth: 90,
                width: 170,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'combo',
                id: 'V_V_MONTH',
                store: Ext.create("Ext.data.Store", {
                    fields: ['displayField', 'valueField'],
                    data: month,
                    proxy: {
                        type: 'memory',
                        reader: {
                            type: 'json'
                        }
                    }
                }),
                editable: false,
                displayField: 'displayField',
                valueField: 'valueField',
                queryMode: 'local',
                //fieldLabel: '选择月份',
                value: new Date().getMonth() + 1,
                labelWidth: 60,
                width: 65,
                style: ' margin: 5px 5px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_JX_PER',
                editable: false,
                readOnly: true,
                fieldLabel: '检查人员',
                labelWidth: 90,
                width: 240,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'V_DATE',
                xtype: 'datefield',
                editable: false,
                format: 'Y/m/d',
                value: new Date(),
                fieldLabel: '检查日期',
                labelWidth: 90,
                width: 240,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'combo',
                id: "V_BEEXAMINED_DEPT",
                store: zgzrStore,
                editable: false,
                queryMode: 'local',
                fieldLabel: '整改责任单位',
                displayField: 'V_DEPTNAME',
                valueField: 'V_DEPTCODE',
                labelWidth: 90,
                width: 240,
                style: ' margin: 5px 0px 5px 10px',
                labelAlign: 'right',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        _selectClass();
                    }
                }
            }, {
                xtype: 'combo',
                id: "V_BEEXAMINED_CLASS",
                store: classStore,
                editable: false,
                queryMode: 'local',
                displayField: 'V_CLASS_NAME',
                valueField: 'V_CLASS_CODE',
                labelWidth: 60,
                width: 150,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            layout: 'column',
            defaults: {labelAlign: 'right'},
            //frame: true,
            border: false,
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: "V_JCBW",
                editable: false,
                queryMode: 'local',
                fieldLabel: '检查部位',
                allowBlank: false,
                labelWidth: 90,
                width: 240,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'filefield',
                id: 'V_V_FILEBLOB',
                name: 'V_V_FILEBLOB',
                enctype: "multipart/form-data",
                fieldLabel: '上传图片',
                labelWidth: 90,
                inputWidth: 245,
                style: ' margin: 5px 0px 5px 10px',
                buttonText: '浏览....',
                allowBlank: false,
                labelAlign: 'right'
            }, {
                xtype: 'hidden',
                name: 'V_V_GUID',
                id: 'V_V_GUID'
            }, {
                xtype: 'hidden',
                name: 'V_V_FILENAME',
                id: 'V_V_FILENAME'
            }, {
                xtype: 'hidden',
                name: 'V_V_FILETYPECODE',
                id: 'V_V_FILETYPECODE'
            }, {
                xtype: 'hidden',
                name: 'V_V_PLANT',
                id: 'V_V_PLANT'
            }, {
                xtype: 'hidden',
                name: 'V_V_DEPT',
                id: 'V_V_DEPT'
            }, {
                xtype: 'hidden',
                name: 'V_V_PERSON',
                id: 'V_V_PERSON'
            }, {
                xtype: 'hidden',
                name: 'V_V_REMARK',
                id: 'V_V_REMARK'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'V_CZWT',
                editable: false,
                fieldLabel: '存在问题',
                labelWidth: 90,
                width: 650,
                style: ' margin: 5px 0px 0px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'V_ZGCS',
                xtype: 'textarea',
                fieldLabel: '整改措施',
                labelWidth: 90,
                width: 650,
                height: 50,
                style: ' margin: 5px 0px 0px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            margin: '-35px 0px 0px 5px',
            items: [{
                xtype: 'textfield',
                id: 'V_KHYJ',
                editable: false,
                fieldLabel: '考核依据',
                labelWidth: 90,
                width: 650,
                style: ' margin: 5px 0px 0px 0px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'combo',
                id: "V_BEEXAMINED_TYPE",
                store: khlbStore,
                editable: false,
                queryMode: 'local',
                displayField: 'displayField',
                valueField: 'valueField',
                fieldLabel: '考核类别',
                labelWidth: 90,
                width: 240,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'textfield',
                id: 'V_KHFS',
                editable: false,
                fieldLabel: '考核分数',
                labelWidth: 90,
                width: 240,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                xtype: 'textfield',
                id: 'V_KKJE',
                editable: false,
                fieldLabel: '扣款金额',
                labelWidth: 90,
                width: 240,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                id: 'V_YQZGSJ',
                xtype: 'datefield',
                editable: false,
                format: 'Y/m/d',
                value: new Date(),
                fieldLabel: '要求整改时间',
                labelWidth: 90,
                width: 240,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }, {
                id: 'V_TBSJ',
                xtype: 'datefield',
                editable: false,
                format: 'Y/m/d',
                value: new Date(),
                fieldLabel: '通报时间',
                labelWidth: 90,
                width: 240,
                style: ' margin: 5px 0px 5px 5px',
                labelAlign: 'right'
            }]
        }, {
            xtype: 'panel',
            region: 'north',
            layout: 'column',
            baseCls: 'my-panel-no-border',
            items: [{
                xtype: 'button',
                text: '保存',
                icon: imgpath + '/filesave.png',
                style: 'margin: 20px 0px 20px 530px',
                handler: _save
            }, {
                xtype: 'button',
                text: '重置',
                icon: imgpath + '/table_refresh.png',
                style: 'margin: 20px 0px 20px 5px',
                handler: _reset
            }]
        }]
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
        items: [{
            region: 'center',
            layout: 'fit',
            border: false,
            items: [inputPanel]
        }]
    });

    _init();
});

function _init() {
    if (zgzrStoreLoad) {
        var khlbStore = Ext.data.StoreManager.lookup('khlbStore');

        Ext.getCmp('V_KHFS').setValue(0);
        Ext.getCmp('V_KKJE').setValue(0);
        Ext.getCmp('V_BEEXAMINED_TYPE').setValue(khlbStore.getAt(0).get('valueField'));
        Ext.getCmp('V_JX_PER').setValue(V_V_PERSONNAME);
        Ext.getBody().unmask();
    }
}

function _selectClass() {
    var classStore = Ext.data.StoreManager.lookup('classStore');
    classStore.proxy.extraParams = {
        V_V_DEPTCODE: Ext.getCmp('V_BEEXAMINED_DEPT').getValue()
    };
    classStore.load();
}

function _save() {
    if (Ext.getCmp('V_JX_PER').getValue() == "" || Ext.getCmp('V_DATE').getValue() == '' || Ext.getCmp('V_JCBW').getValue() == '' || Ext.getCmp('V_CZWT').getValue() == '' || Ext.getCmp('V_ZGCS').getValue() == '' || Ext.getCmp('V_KHYJ').getValue() == '' || Ext.getCmp('V_KHFS').getValue() == '' || Ext.getCmp('V_KKJE').getValue() == '') {
        Ext.MessageBox.show({
            title: '提示',
            msg: '请输入这些必填项',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return;
    }

    Ext.Ajax.request({
        url: AppUrl + 'hp/PM_13_EXAMINED_SET',
        type: 'ajax',
        method: 'POST',
        params: {
            V_V_GUID: V_V_GUID,
            V_V_DATE: Ext.getCmp('V_DATE').getSubmitValue(),
            V_V_BEEXAMINED_DEPT: Ext.getCmp('V_BEEXAMINED_DEPT').getValue(),
            V_V_BEEXAMINED_CLASS: Ext.getCmp('V_BEEXAMINED_CLASS').getValue(),
            V_V_JCBW: Ext.getCmp('V_JCBW').getValue(),
            V_V_CZWT: Ext.getCmp('V_CZWT').getValue(),
            V_V_ZGCS: Ext.getCmp('V_ZGCS').getValue(),
            V_V_KHYJ: Ext.getCmp('V_KHYJ').getValue(),
            V_V_KHFS: Ext.getCmp('V_KHFS').getValue(),
            V_V_KKJE: Ext.getCmp('V_KKJE').getValue(),
            V_V_DEPTCODE: V_V_DEPTCODE,
            V_V_TYPE: 'dept',
            V_V_BEEXAMINED_TYPE: Ext.getCmp('V_BEEXAMINED_TYPE').getValue(),
            V_V_YQZGSJ: Ext.getCmp('V_YQZGSJ').getSubmitValue(),
            V_V_TBSJ: Ext.getCmp('V_TBSJ').getSubmitValue(),
            V_V_TB_PER: Ext.util.Cookies.get('v_personcode'),
            V_V_STATE: '未反馈',
            V_V_JX_PER: Ext.util.Cookies.get('v_personcode')

        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET == '成功') {//成功，会传回true
                if (Ext.getCmp('V_V_FILEBLOB').getValue() != '') {
                    _upLoadFile();
                } else {
                    Ext.MessageBox.alert('提示', '操作成功');
                }
                history.go(0);
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
    Ext.getCmp('V_V_DEPT').setValue(Ext.getCmp('V_BEEXAMINED_DEPT').getSubmitValue());
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

function _reset() {
    var zgzrStore = Ext.data.StoreManager.lookup('zgzrStore');
    Ext.getCmp('V_V_YEAR').setValue(new Date().getFullYear());
    Ext.getCmp('V_V_MONTH').setValue(new Date().getMonth() + 1);
    Ext.getCmp('V_DATE').setValue(new Date());
    Ext.getCmp('V_BEEXAMINED_DEPT').setValue(zgzrStore.getAt(0).get('V_DEPTCODE'));
    Ext.getCmp('V_JCBW').reset();
    Ext.getCmp('V_V_FILEBLOB').reset();
    Ext.getCmp('V_CZWT').reset();
    Ext.getCmp('V_ZGCS').reset();
    Ext.getCmp('V_KHYJ').reset();
    Ext.getCmp('V_BEEXAMINED_TYPE').setValue('基础工作');
    Ext.getCmp('V_KHFS').setValue(0);
    Ext.getCmp('V_KKJE').setValue(0);
    Ext.getCmp('V_YQZGSJ').setValue(new Date());
    Ext.getCmp('V_TBSJ').setValue(new Date());

}