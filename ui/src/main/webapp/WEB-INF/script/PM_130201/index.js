//var V_YEARPLAN_GUID = Ext.urlDecode(location.href.split('?')[1]).V_YEARPLAN_GUID;
var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTNAME2 = Ext.util.Cookies.get('v_deptname2');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var YEAR = Ext.urlDecode(location.href.split('?')[1]).YEAR;
var V_DEPTCODE = Ext.urlDecode(location.href.split('?')[1]).V_DEPTCODE;
var V_ORGCODE = Ext.urlDecode(location.href.split('?')[1]).V_ORGCODE;
var months = [];
var hours = [];
var minutes = [];
var zyqStoreLoad = false;
var initLoad = true;
var KHLBDATA = [{ displayField: '基础工作', valueField: '基础工作' },{ displayField: '现场管理', valueField: '现场管理' },{ displayField: '工艺纪律', valueField: '工艺纪律' }
    ,{ displayField: '设备管理', valueField: '设备管理' },{ displayField: '违章违纪', valueField: '违章违纪' },{ displayField: '安全隐患', valueField: '安全隐患' }
    ,{ displayField: '相关方', valueField: '相关方' }];


for (var i = 1; i <= 12; i++) {
    if (i < 10) {
        months.push({displayField: ("0" + "" + i), valueField: i});
    } else {
        months.push({displayField: i, valueField: i});
    }

}

for (var j = 0; j <= 23; j++) {
    if (j< 10) {
        j = '0' + j;
    } else {
        j = '' + j;
    }
    hours.push({displayField: j, valueField: j});
}
for (var k = 0; k <= 59; k++) {
    if (k< 10) {
        k = '0' + k;
    } else {
        k = '' + k;
    }
    minutes.push({displayField: k, valueField: k});
}

//var V_V_GUID = Ext.data.IdGenerator.get('uuid').generate();

var today = new Date();

if (location.href.split('?')[1] != undefined) {
    var parameters = Ext.urlDecode(location.href.split('?')[1]);
    (parameters.V_V_GUID == undefined) ? V_V_GUID = '' : V_V_GUID = parameters.V_V_GUID;
    (parameters.UPDATE == undefined) ? UPDATE = 'NOT' : UPDATE = parameters.UPDATE;
    (parameters.YEAR == undefined) ? YEAR = '' : YEAR = parameters.YEAR;
}


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

    var dt = new Date();
    var thisYear = dt.getFullYear();
    var years = [];
    for (var i = 2013; i <= thisYear + 1; i++) years.push({displayField: i, valueField: i});

    var bkhdwStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        storeId: 'bkhdwStore',
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
                Ext.getCmp('bkhdw').select(store.first());
                zyqStoreLoad = true;
                _init();
            }
        }
    });

    /*var bkhdwStore = Ext.create("Ext.data.Store", {
     storeId: 'bkhdwStore',
     fields: ['displayField', 'valueField'],
     data: BKHDWDATA,
     proxy: {
     type: 'memory',
     reader: {type: 'json'}
     }
     });*/

    var khlbStore = Ext.create("Ext.data.Store", {
        storeId: 'khlbStore',
        fields: ['displayField', 'valueField'],
        data: KHLBDATA,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });
    var sblxStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'sblxStore',
        fields: ['V_EQUTYPECODE', 'V_EQUTYPENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_06/PRO_GET_DEPTEQUTYPE_PER',
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
                Ext.getCmp('sblx').select(store.first());
            }
        }
    });

    var gridStore = Ext.create('Ext.data.Store', {
        id: 'gridStore',
        pageSize: 15,
        autoLoad: false,
        fields: ['I_ID',
            'V_GUID',
            'V_YEAR',
            'V_ORGCODE',                          //厂矿
            'V_ORGNAME',
            'V_DEPTCODE',                         //作业区
            'V_DEPTNAME',
            'V_EQUTYPECODE',                     //设备类型
            'V_EQUTYPENAME',
            'V_EQUCODE',
            'V_EQUNAME',
            'V_REPAIRMAJOR_CODE',
            'V_CONTENT',
            'V_STARTTIME',
            'V_ENDTIME',
            'V_HOUR',
            'V_REPAIRDEPT_CODE',
            'V_REPAIRDEPT_NAME',
            'V_INDATE',
            'V_INPER',
            'INPERNAME',
            'V_FLOWCODE',
            'V_FLOWORDER',
            'V_FLOWTYPE',
            'V_JHMX_GUID',
            'V_BZ',
            'V_REPAIR_PERNAME',
            'V_YEARID',
            'V_STATE',
            'V_STATENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'hp/PRO_PM_03_PLAN_YEAR_GET',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list',
                total: 'total'
            }
        })
    });

    var zyStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyStore',
        fields: ['V_SPECIALTYCODE', 'V_BASENAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'basic/PRO_BASE_SPECIALTY_DEPT_SPECIN',
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
                Ext.getCmp('zy').select(store.first());
            }
        }
    });

    var jxdwStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'jxdwStore',
        fields: ['V_DEPTREPAIRCODE', 'V_DEPTREPAIRNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'basic/PRO_PM_REPAIRDEPT_VIEW',
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
                Ext.getCmp('jxdw').select(store.first());
            }
        }
    });


    var zyqStore = Ext.create('Ext.data.Store', {
        autoLoad: false,
        storeId: 'zyqStore',
        fields: ['V_DEPTCODE', 'V_DEPTNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
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
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('zyq').select(store.first());
            }
        }
    });


    var jxdwstore = Ext.create("Ext.data.Store", {
        autoLoad: false,
        storeId: 'jxdwstore',
        fields: ['V_DEPTREPAIRCODE', 'V_DEPTREPAIRNAME'],
        proxy: Ext.create("Ext.ux.data.proxy.Ajax", {
            type: 'ajax',
            async: false,
            url: AppUrl + 'PM_22/PM_REPAIRDEPT_SEL',
            // url: 'PRO_BASE_DEPT_VIEW_ROLE',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                /* V_V_DEPTCODE : Ext.getCmp('zyq').getValue()*/
            }
        }),
        listeners: {
            load: function (store, records) {
                Ext.getCmp('jxdw').select(store.first());
            }
        }
    });


    var monthStore = Ext.create("Ext.data.Store", {
        storeId: 'monthStore',
        autoLoad: true,
        fields: ['displayField', 'valueField'],
        data: months,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });

    var hourStore = Ext.create("Ext.data.Store", {
        storeId: 'hourStore',
        autoLoad: true,
        fields: ['displayField', 'valueField'],
        data: hours,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });

    var minuteStore = Ext.create("Ext.data.Store", {
        storeId: 'minuteStore',
        autoLoad: true,
        fields: ['displayField', 'valueField'],
        data: minutes,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });


    var editPanel = Ext.create('Ext.form.Panel', {
        id: 'editPanel',
        region: 'center',
        layout: 'border',
        frame: true,
        border: false,
        baseCls: 'my-panel-no-border',
        items: [
            {
                xtype: 'panel',
                layout: 'vbox',
                region: 'center',
                defaults: {labelAlign: 'right'},
                frame: true,
                border: false,
                //baseCls: 'my-panel-no-border',
                margin: '0 0 0 0',
                //autoScroll : true,
                items: [
                    {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [{
                            id: 'checkTime',
                            xtype: 'datefield',
                            editable: false,
                            format: 'Y/m/d',
                            value: new Date(),
                            fieldLabel: '检查日期',
                            labelWidth: 100,
                            width: 250,
                            style: ' margin: 5px 0px 0px 0px',
                            baseCls: 'margin-bottom'
                        }, {
                            xtype: 'combo',
                            id: "bkhdw",
                            store: bkhdwStore,
                            editable: false,
                            queryMode: 'local',
                            fieldLabel: '被考核单位',
                            displayField: 'V_DEPTNAME',
                            valueField: 'V_DEPTCODE',
                            labelWidth: 100,
                            style: ' margin: 5px 0px 0px 0px',
                            labelAlign: 'right',
                            width: 250
                        }]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [{
                            xtype: 'textfield',
                            id: "jcbw",
                            editable: false,
                            queryMode: 'local',
                            fieldLabel: '检查部位',
                            style: ' margin: 5px 0px 0px 0px',
                            labelAlign: 'right',
                            allowBlank: false,
                            width: 250
                        },{
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
                        } /*,{
                            id: 'insertFilesFj',
                            xtype: 'button',
                            text: '上传',
                            style: ' margin: 5px 0px 0px 5px',
                            handler: _upLoadFile
                        }*/]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [{
                            xtype: 'textfield',
                            id: "czwt",
                            editable: false,
                            queryMode: 'local',
                            fieldLabel: '存在问题',
                            allowBlank: false,
                            style: ' margin: 5px 0px 0px 0px',
                            labelAlign: 'right',
                            width: 655
                        }]
                    }, {
                        id: 'zgcs',
                        xtype: 'textarea',
                        fieldLabel: '整改措施',
                        //fieldStyle: 'background-color: #FFEBCD; background-image: none;',
                        editable: false,
                        labelWidth: 100,
                        queryMode: 'local',
                        allowBlank: false,
                        //baseCls: 'margin-bottom',
                        style: ' margin: 5px 0px 0px 0px',
                        width: 655,
                        labelAlign: 'right'
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [{
                            xtype: 'textfield',
                            id: "khyj",
                            editable: false,
                            queryMode: 'local',
                            fieldLabel: '考核依据',
                            allowBlank: false,
                            style: ' margin: 5px 0px 0px 0px',
                            labelAlign: 'right',
                            width: 655
                        }]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [{
                            xtype: 'textfield',
                            id: "khfs",
                            editable: false,
                            queryMode: 'local',
                            fieldLabel: '考核分数',
                            allowBlank: false,
                            style: ' margin: 5px 0px 0px 0px',
                            value : 0,
                            labelAlign: 'right',
                            width: 250
                        },{
                            xtype: 'textfield',
                            id: "kkje",
                            editable: false,
                            queryMode: 'local',
                            fieldLabel: '扣款金额',
                            allowBlank: false,
                            style: ' margin: 5px 0px 0px 0px',
                            value : 0,
                            labelAlign: 'right',
                            width: 250
                        }]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                id: 'khbm',
                                xtype: 'textfield',
                                editable: true,
                                fieldLabel: '考核部门',
                                labelWidth: 100,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                value: V_V_DEPTNAME2,
                                readOnly : true,
                                width: 250,
                                baseCls: 'margin-bottom'
                            },{
                                xtype: 'combo',
                                id: "lb",
                                store: khlbStore,
                                editable: false,
                                queryMode: 'local',
                                fieldLabel: '类别',
                                displayField: 'displayField',
                                valueField: 'valueField',
                                value : '基础工作',
                                labelWidth: 100,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                width: 250
                            }]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [{
                            id: 'yqzgsj',
                            xtype: 'datefield',
                            editable: false,
                            format: 'Y/m/d',
                            value: new Date(),
                            fieldLabel: '要求整改时间',
                            labelWidth: 100,
                            width: 250,
                            style: ' margin: 5px 0px 0px 0px',
                            baseCls: 'margin-bottom'
                        }]
                    }, {
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                id: 'tbsj',
                                xtype: 'datefield',
                                editable: false,
                                format: 'Y/m/d',
                                value: new Date(),
                                fieldLabel: '通报时间',
                                labelWidth: 100,
                                width: 250,
                                style: ' margin: 5px 0px 0px 0px',
                                baseCls: 'margin-bottom'
                            },
                            {
                                id: 'tbr',
                                xtype: 'textfield',
                                readOnly : true,
                                fieldLabel: '通报人',
                                allowBlank: false,
                                labelWidth: 100,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                width: 250,
                                baseCls: 'margin-bottom'
                            }]
                    },{
                        layout: 'hbox',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [
                            {
                                xtype: 'button',
                                text: '保存',
                                icon: imgpath + '/filesave.png',
                                style: 'margin: 20px 0px 20px 475px',
                                handler: _save
                                //style: 'margin: 5px 0px 10px 0px'
                            }, {
                                xtype: 'button',
                                text: '关闭',
                                icon: imgpath + '/cross.png',
                                style: 'margin: 20px 0px 20px 5px',
                                handler: _close
                                //style: 'margin: 5px 0px 10px 0px'
                            }, {
                                xtype: 'button',
                                text: '重置',
                                icon: imgpath + '/cross.png',
                                style: 'margin: 20px 0px 20px 5px',
                                handler: function () {
                                     _reset();
                                      }
                                //style: 'margin: 5px 0px 10px 0px'
                            }]
                    }

                ]
            }


        ]
    });




    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [editPanel]
    });


    _init();
})

function _init() {
    if(zyqStoreLoad && initLoad)
    {
        initLoad = false;
        Ext.getCmp('tbr').setValue( Ext.util.Cookies.get('v_personname2'));
        Ext.getBody().unmask();
    }
}

function _reset()
{
    var bkhdwStore = Ext.data.StoreManager.lookup('bkhdwStore');
    Ext.getCmp('checkTime').setValue(new Date());
    Ext.getCmp('bkhdw').setValue(bkhdwStore.getAt(0).get('V_DEPTCODE'));
    //Ext.getCmp('selectbz').setValue();
    Ext.getCmp('jcbw').setValue('');
    Ext.getCmp('V_V_FILEBLOB').reset();
    Ext.getCmp('czwt').setValue('');
    Ext.getCmp('zgcs').setValue('');
    Ext.getCmp('khyj').setValue('');
    Ext.getCmp('khfs').setValue(0);
    Ext.getCmp('kkje').setValue(0);
    Ext.getCmp('khbm').setValue(V_V_DEPTNAME2);
    Ext.getCmp('lb').setValue('基础工作');
    Ext.getCmp('yqzgsj').setValue(new Date());
    Ext.getCmp('tbsj').setValue(new Date());
    Ext.getCmp('tbr').setValue( Ext.util.Cookies.get('v_personname2'));

}

function _upLoadFile() {
    var editPanel = Ext.getCmp('editPanel');

    var V_V_FILEBLOB = Ext.getCmp('V_V_FILEBLOB').getSubmitValue();
    var V_V_FILENAME = V_V_FILEBLOB.substring(0, V_V_FILEBLOB.indexOf('.'));
    //alert(V_V_FILENAME);

    Ext.getCmp('V_V_GUID').setValue(V_V_GUID);
    Ext.getCmp('V_V_FILENAME').setValue(V_V_FILENAME);
    Ext.getCmp('V_V_FILEBLOB').setValue(V_V_FILEBLOB);
    Ext.getCmp('V_V_FILETYPECODE').setValue('SBJC');
    Ext.getCmp('V_V_PLANT').setValue(Ext.getCmp('bkhdw').getSubmitValue().substring(0,4));
    Ext.getCmp('V_V_DEPT').setValue(Ext.getCmp('bkhdw').getSubmitValue());
    Ext.getCmp('V_V_PERSON').setValue(V_V_PERSONCODE);
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

        editPanel.getForm().submit({
            url: AppUrl + 'PM_14/PRO_BASE_FILE_ADD',
            method: 'POST',
            async: false,
            waitMsg: '上传中...',
            success: function (ret) {
                Ext.MessageBox.alert('提示', '操作成功', callBack);
                function callBack(id) {
                    window.opener._selectExamined();
                    _close();
                }

            },
            failure: function (resp) {
                Ext.Msg.alert('错误', '上传失败');
            }

        })

}

function _dw_bz() {
    var selectbzStore = Ext.data.StoreManager.lookup('selectbzStore');
    selectbzStore.proxy.extraParams = {
        V_V_DEPTCODE: Ext.getCmp('bkhdw').getValue()
    };
    //matGroupSecondStore.currentPage = 1;
    selectbzStore.load();
}

function _validate(obj) {
    var valid = true;
    for (var i = 0; i < obj.items.length; i++) {
        if (obj.items.getAt(i).xtype != 'button' && obj.items.getAt(i).xtype != 'panel' && !obj.items.getAt(i).validate()) {
            valid = false;
        }
    }
    return valid;
}


function _close() {
    window.close();
}




function _save() {
    if (Ext.getCmp('jcbw').getValue() =="" || Ext.getCmp('czwt').getValue() == '' || Ext.getCmp('zgcs').getValue() == '' || Ext.getCmp('khyj').getValue() == ''|| Ext.getCmp('khfs').getValue() == ''|| Ext.getCmp('kkje').getValue() == ''|| Ext.getCmp('khbm').getValue() == '') {
        Ext.MessageBox.show({
            title : '提示',
            msg : '请输入这些必填项',
            buttons : Ext.MessageBox.OK,
            icon : Ext.MessageBox.ERROR
        });
        return;
    }




    Ext.Ajax.request({
        url: AppUrl + 'hp/PM_13_EXAMINED_SET',
        type: 'ajax',
        method: 'POST',
        params: {
            V_V_GUID: V_V_GUID,
            V_V_DATE: Ext.getCmp('checkTime').getSubmitValue(),
            V_V_BEEXAMINED_DEPT: Ext.getCmp('bkhdw').getValue(),
            V_V_JCBW: Ext.getCmp('jcbw').getValue(),
            V_V_CZWT: Ext.getCmp('czwt').getValue(),
            V_V_ZGCS: Ext.getCmp('zgcs').getValue(),
            V_V_KHYJ: Ext.getCmp('khyj').getValue(),
            V_V_KHFS: Ext.getCmp('khfs').getValue(),
            V_V_KKJE: Ext.getCmp('kkje').getValue(),
            V_V_DEPTCODE: V_V_DEPTCODE,
            V_V_TYPE : 'dept',
            V_V_BEEXAMINED_TYPE: Ext.getCmp('lb').getValue(),
            V_V_YQZGSJ: Ext.getCmp('yqzgsj').getSubmitValue(),
            V_V_TBSJ: Ext.getCmp('tbsj').getSubmitValue(),
            V_V_TB_PER:  Ext.util.Cookies.get('v_personcode'),
            V_V_STATE: '未反馈',
            V_V_JX_PER:''

        },
        success: function (response) {
            var data = Ext.decode(response.responseText);//后台返回的值
            if (data.RET=='成功') {//成功，会传回true
                if(Ext.getCmp('V_V_FILEBLOB').getValue() != '')
                {
                    _upLoadFile();
                }else{
                    Ext.MessageBox.alert('提示', '操作成功', callBack);
                    function callBack(id) {
                        window.opener._selectExamined();
                        _close();
                    }
                }

                //_close();


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