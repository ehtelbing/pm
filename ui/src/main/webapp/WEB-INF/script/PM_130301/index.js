//var V_YEARPLAN_GUID = Ext.urlDecode(location.href.split('?')[1]).V_YEARPLAN_GUID;
var V_V_PERSONCODE = Ext.util.Cookies.get('v_personcode');
var V_V_DEPTNAME2 = Ext.util.Cookies.get('v_deptname2');
var V_V_DEPTCODE = Ext.util.Cookies.get('v_deptcode');
var YEAR = Ext.urlDecode(location.href.split('?')[1]).YEAR;
var V_DEPTCODE = Ext.urlDecode(location.href.split('?')[1]).V_DEPTCODE;
var V_ORGCODE = Ext.urlDecode(location.href.split('?')[1]).V_ORGCODE;
var BZLOAD = false;
var initLoad = true
var zyqStoreload = false;
var months = [];
var hours = [];
var minutes = [];
var UPDATELOAD;
var BKHDWDATA = [{ displayField: '东烧破碎作业区', valueField: '99100201' },{ displayField: '东烧选矿作业区', valueField: '99100202' },{ displayField: '东烧烧结作业区', valueField: '99100203' }
    ,{ displayField: '东烧动力作业区', valueField: '99100207' },{ displayField: '东烧原料作业区', valueField: '99100209' },{ displayField: '东烧检修协力作业区', valueField: '99100206' }
    ,{ displayField: '东烧输送作业区', valueField: '99100204' },{ displayField: '东烧活性灰作业区', valueField: '99100205' },{ displayField: '党委工作室', valueField: '99170103' }
    ,{ displayField: '综合管理室', valueField: '99170101' },{ displayField: '生产技术室', valueField: '99170105' },{ displayField: '设备室', valueField: '99170104' },{ displayField: '工会', valueField: '99170102' }]
var KHLBDATA = [{ displayField: '基础工作', valueField: '基础工作' },{ displayField: '现场管理', valueField: '现场管理' },{ displayField: '工艺纪律', valueField: '工艺纪律' }
    ,{ displayField: '设备管理', valueField: '设备管理' },{ displayField: '违章违纪', valueField: '违章违纪' },{ displayField: '安全隐患', valueField: '安全隐患' }
    ,{ displayField: '相关方', valueField: '相关方' }]
var dt = new Date();
var thisYear = dt.getFullYear();
var years = [];
for (var i = 2013; i <= thisYear + 1; i++) years.push({displayField: i, valueField: i});
var months = [];
for (var i = 1; i <= 12; i++) {
    months.push({displayField: i, valueField: i});
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


    var yearsStore = Ext.create("Ext.data.Store", {
        storeId: 'yearsStore',
        fields: ['displayField', 'valueField'],
        data: years,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
        }
    });

    var monthsStore = Ext.create("Ext.data.Store", {
        storeId: 'monthsStore',
        fields: ['displayField', 'valueField'],
        data: months,
        proxy: {
            type: 'memory',
            reader: {type: 'json'}
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

    var editPanel = Ext.create('Ext.form.Panel', {
        id: 'editPanel',
        region: 'center',
        title : '反馈信息',
        layout: 'column',
        frame: true,
        border: false,
        //baseCls: 'my-panel-no-border',
        items: [
            {
                xtype: 'panel',
                layout: 'vbox',
                width : '100%',
                region: 'center',
                defaults: {labelAlign: 'right'},
                frame: true,
                border: false,
                baseCls: 'my-panel-no-border',
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
                            xtype : 'radiogroup',
                            id:'sfyjzg',
                            fieldLabel : '是否已经整改',
                            labelWidth: 100,
                            width: 250,
                            columns : 2,
                            style: ' margin: 5px 0px 0px 0px',
                            name : "group",
                            vertical : true,
                            items : [{
                                boxLabel : '是',
                                name : 'rb',
                                inputValue : '1'
                            }, {
                                boxLabel : '否',
                                name : 'rb',
                                inputValue : '0',
                                checked : true
                            }]
                        }]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [{
                            xtype: 'textfield',
                            id: "zgfzr",
                            queryMode: 'local',
                            fieldLabel: '整改负责人',
                            labelWidth: 100,
                            style: ' margin: 5px 0px 0px 0px',
                            labelAlign: 'right',
                            allowBlank: false,
                            width: 250
                        },{
                            xtype: 'textfield',
                            id: "ysr",
                            editable: false,
                            queryMode: 'local',
                            fieldLabel: '验收人',
                            labelWidth: 100,
                            style: ' margin: 5px 0px 0px 0px',
                            labelAlign: 'right',
                            allowBlank: false,
                            width: 250
                        }]
                    }, {
                        layout: 'column',
                        defaults: {labelAlign: 'right'},
                        frame: true,
                        border: false,
                        baseCls: 'my-panel-no-border',
                        items: [{
                            id: 'zgsq',
                            xtype: 'datefield',
                            editable: false,
                            format: 'Y/m/d',
                            value: new Date(),
                            fieldLabel: '整改日期',
                            labelWidth: 100,
                            width: 250,
                            style: ' margin: 5px 0px 0px 0px',
                            baseCls: 'margin-bottom'
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
                            id: "fkr",
                            editable: false,
                            queryMode: 'local',
                            fieldLabel: '反馈人',
                            readOnly : true,
                            labelWidth: 100,
                            style: ' margin: 5px 0px 20px 0px',
                            labelAlign: 'right',
                            allowBlank: false,
                            width: 250
                        },{
                            id: 'fksj',
                            xtype: 'datefield',
                            editable: false,
                            format: 'Y/m/d',
                            value: new Date(),
                            fieldLabel: '反馈时间',
                            labelWidth: 100,
                            width: 250,
                            style: ' margin: 5px 0px 20px 0px',
                            baseCls: 'margin-bottom'
                        }]
                    }

                ]
            }


        ]
    });

    var editPanel2 = Ext.create('Ext.form.Panel', {
        id: 'editPanel2',
        region: 'center',
        title : '通报信息',
        layout: 'column',
        frame: true,
        border: false,
        //baseCls: 'my-panel-no-border',
        items: [
            {
                xtype: 'panel',
                layout: 'vbox',
                region: 'center',
                defaults: {labelAlign: 'right'},
                frame: true,
                width : '100%',
                border: false,
                baseCls: 'my-panel-no-border',
                margin: '0 0 0 0',
                //autoScroll : true,
                items: [ {
                    layout: 'column',
                    defaults: {labelAlign: 'right'},
                    frame: true,
                    border: false,
                    baseCls: 'my-panel-no-border',
                    items: [{
                        xtype: 'textfield',
                        id: "khyf",
                        queryMode: 'local',
                        fieldLabel: '考核月份',
                        readOnly: true,
                        labelWidth: 100,
                        style: ' margin: 5px 0px 0px 0px',
                        labelAlign: 'right',
                        width: 180
                    },{
                        xtype: 'textfield',
                        id: "khyf2",
                        queryMode: 'local',
                        displayField: 'displayField',
                        valueField: 'valueField',
                        style: ' margin: 5px 0px 0px 10px',
                        labelAlign: 'right',
                        readOnly: true,
                        width: 80
                    }]
                }, {
                    layout: 'column',
                    defaults: {labelAlign: 'right'},
                    frame: true,
                    border: false,
                    baseCls: 'my-panel-no-border',
                    items: [{
                        id: 'khrq',
                        xtype: 'datefield',
                        editable: false,
                        format: 'Y/m/d',
                        fieldLabel: '考核日期',
                        readOnly: true,
                        labelWidth: 100,
                        width: 250,
                        style: ' margin: 5px 0px 0px 0px',
                        baseCls: 'margin-bottom'
                    },{
                        xtype: 'textfield',
                        id: "bkhdw",
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '被考核单位',
                        readOnly: true,
                        labelWidth: 100,
                        style: ' margin: 5px 0px 0px 0px',
                        labelAlign: 'right',
                        width: 250
                    },{
                        xtype: 'textfield',
                        id: "selectbz",
                        readOnly: true,
                        editable: false,
                        queryMode: 'local',
                        style: ' margin: 5px 0px 0px 5px',
                        labelAlign: 'right',
                        width: 150
                    } ]
                },{
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
                        readOnly: true,
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
                        id: "czwt",
                        editable: false,
                        queryMode: 'local',
                        fieldLabel: '存在问题',
                        readOnly: true,
                        allowBlank: false,
                        style: ' margin: 5px 0px 0px 0px',
                        labelAlign: 'right',
                        width: 655
                    }]
                },{
                        id: 'zgcs',
                        xtype: 'textarea',
                        fieldLabel: '整改措施',
                        readOnly: true,
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
                            readOnly: true,
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
                            readOnly: true,
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
                            readOnly: true,
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
                                readOnly: true,
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
                            value: new Date(new Date().getFullYear(), 0, 1),
                            fieldLabel: '要求整改时间',
                            labelWidth: 100,
                            width: 250,
                            style: ' margin: 5px 0px 0px 0px',
                            readOnly: true,
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
                                value: new Date(new Date().getFullYear(), 0, 1),
                                fieldLabel: '通报时间',
                                labelWidth: 100,
                                width: 250,
                                readOnly: true,
                                style: ' margin: 5px 0px 0px 0px',
                                baseCls: 'margin-bottom'
                            },
                            {
                                id: 'tbr',
                                xtype: 'textfield',
                                fieldLabel: '通报人',
                                allowBlank: false,
                                labelWidth: 100,
                                style: ' margin: 5px 0px 0px 0px',
                                labelAlign: 'right',
                                width: 250,
                                readOnly: true,
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
                                style: 'margin: 20px 0px 20px 525px',
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
                                hidden :true,
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


   /* Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [editPanel]
    });*/

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
            items : [ editPanel ]
        }, {
            region : 'center',
            layout : 'fit',
            border : false,
            items : [ editPanel2 ]
        } ]
    });



    _init();
})

function _init() {
    if( initLoad)
    {

        initLoad = false;
        Ext.getCmp('zgfzr').setValue(Ext.util.Cookies.get('v_personname2'));
        Ext.getCmp('fkr').setValue(Ext.util.Cookies.get('v_personname2'));
        //_dw_bz();
        Ext.Ajax.request({
            url: AppUrl + 'hp/PM_13_EXAMINED_GET',
            type: 'ajax',
            method: 'POST',
            params: {
                V_V_GUID: V_V_GUID
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);//后台返回的值
                if (data.RET=='success') {//成功，会传回true
                    Ext.getCmp('khyf').setValue(data.list[0].V_DATE.substring(0,4));
                    Ext.getCmp('khyf2').setValue(data.list[0].V_DATE.substring(5,7));

                    Ext.getCmp('khrq').setValue(data.list[0].V_DATE.substring(0,10));
                    Ext.getCmp('bkhdw').setValue(data.list[0].V_BEEXAMINED_DEPTNAME);
                    /*var selectbzStore = Ext.data.StoreManager.lookup('selectbzStore');
                    selectbzStore.proxy.extraParams = {
                        V_V_DEPTCODE: Ext.getCmp('bkhdw').getValue()
                    };
                    selectbzStore.load();*/
                    Ext.getCmp('selectbz').setValue(data.list[0].V_BEEXAMINED_CLASSNAME);
                    Ext.getCmp('jcbw').setValue(data.list[0].V_JCBW);
                    Ext.getCmp('V_V_FILEBLOB').reset();
                    Ext.getCmp('czwt').setValue(data.list[0].V_CZWT);
                    Ext.getCmp('zgcs').setValue(data.list[0].V_ZGCS);
                    Ext.getCmp('khyj').setValue(data.list[0].V_KHYJ);
                    Ext.getCmp('khfs').setValue(data.list[0].V_KHFS);
                    Ext.getCmp('kkje').setValue(data.list[0].V_KKJE);
                    Ext.getCmp('khbm').setValue(data.list[0].V_DEPTNAME);
                    Ext.getCmp('lb').setValue(data.list[0].V_BEEXAMINED_TYPE);
                    Ext.getCmp('yqzgsj').setValue(data.list[0].V_YQZGSJ.substring(0,10));
                    Ext.getCmp('tbsj').setValue(data.list[0].V_TBSJ.substring(0,10));
                    Ext.getCmp('tbr').setValue(data.list[0].V_TB_PERNAME);
                    Ext.getBody().unmask();//去除页面笼罩
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




    /*if(BZLOAD && INITLOAD)
    {
        INITLOAD = false;
        Ext.Ajax.request({
            url: AppUrl + 'hp/PM_13_EXAMINED_GET',
            type: 'ajax',
            method: 'POST',
            params: {
                V_V_GUID: V_V_GUID
            },
            success: function (response) {
                var data = Ext.decode(response.responseText);//后台返回的值
                if (data.RET=='success') {//成功，会传回true
                    Ext.getCmp('checkTime').setValue(data.list[0].V_DATE.substring(0,10));
                    Ext.getCmp('bkhdw').setValue(data.list[0].V_BEEXAMINED_DEPT);
                    var selectbzStore = Ext.data.StoreManager.lookup('selectbzStore');
                    selectbzStore.proxy.extraParams = {
                        V_V_DEPTCODE: Ext.getCmp('bkhdw').getValue()
                    };
                    selectbzStore.load();
                    Ext.getCmp('selectbz').setValue(data.list[0].V_BEEXAMINED_CLASS);
                    Ext.getCmp('jcbw').setValue(data.list[0].V_JCBW);
                    Ext.getCmp('V_V_FILEBLOB').reset();
                    Ext.getCmp('czwt').setValue(data.list[0].V_CZWT);
                    Ext.getCmp('zgcs').setValue(data.list[0].V_ZGCS);
                    Ext.getCmp('khyj').setValue(data.list[0].V_KHYJ);
                    Ext.getCmp('khfs').setValue(data.list[0].V_KHFS);
                    Ext.getCmp('kkje').setValue(data.list[0].V_KKJE);
                    Ext.getCmp('khbm').setValue(data.list[0].V_DEPTNAME);
                    Ext.getCmp('lb').setValue(data.list[0].V_BEEXAMINED_TYPE);
                    Ext.getCmp('yqzgsj').setValue(data.list[0].V_YQZGSJ.substring(0,10));
                    Ext.getCmp('tbsj').setValue(data.list[0].V_TBSJ.substring(0,10));
                    Ext.getCmp('tbr').setValue(data.list[0].V_TB_PER);
                    Ext.getBody().unmask();//去除页面笼罩
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

    }*/





}

function _reset()
{
    var bkhdwStore = Ext.data.StoreManager.lookup('bkhdwStore');
    Ext.getCmp('checkTime').setValue(new Date(new Date().getFullYear(), 0, 1));
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
    Ext.getCmp('yqzgsj').setValue(new Date(new Date().getFullYear(), 0, 1));
    Ext.getCmp('tbsj').setValue(new Date(new Date().getFullYear(), 0, 1));
    Ext.getCmp('tbr').setValue(Ext.util.Cookies.get('v_personname2'));

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
    if (Ext.getCmp('jcbw').getValue() =="" || Ext.getCmp('czwt').getValue() == '' || Ext.getCmp('zgcs').getValue() == '' || Ext.getCmp('khyj').getValue() == ''|| Ext.getCmp('khfs').getValue() == ''|| Ext.getCmp('kkje').getValue() == ''|| Ext.getCmp('khbm').getValue() == ''|| Ext.getCmp('tbr').getValue() == '') {
        Ext.MessageBox.show({
            title : '提示',
            msg : '请输入这些必填项',
            buttons : Ext.MessageBox.OK,
            icon : Ext.MessageBox.ERROR
        });
        return;
    }


    var ss = Ext.data.IdGenerator.get('uuid').generate();
    Ext.Ajax.request({
        url: AppUrl + 'hp/PM_13_EXAMINED_FK_SET',
        type: 'ajax',
        method: 'POST',
        params: {
            V_V_GUID: V_V_GUID,
            V_V_FEEDBACK_GUID: ss,
            V_V_FEEDBACK_FLAG: Ext.getCmp('sfyjzg').getValue(),
            V_V_FEEDBACK_PER: Ext.getCmp('zgfzr').getValue(),
            V_V_YS_PER: Ext.getCmp('ysr').getValue(),
            V_V_FEEDBACK_DATA: Ext.getCmp('zgsq').getSubmitValue(),
            V_V_FK_PER: Ext.getCmp('fkr').getValue(),
            V_V_FK_DATE: Ext.getCmp('fksj').getSubmitValue()

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